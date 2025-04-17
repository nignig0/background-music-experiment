import { useEffect, useRef, useState } from 'react'
import '.././styles/App.css';
import { SongPage } from '.././Components/SongPage';
import { messages } from '.././songs';
import { SilentPlayer } from '.././Components/SilentPlayer';
import { StartPage } from '.././Components/StartPage';
import axios from 'axios';
import { backendUrl, spotifyBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';
import { Track } from '../types';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { blur } from "@cloudinary/url-gen/actions/effect";

export function MainPage() {

  const [songArr, setSongArr] = useState<Track[]>([]);
  const songArrRef = useRef<Track[]>([]);
  const [prevBackground, setPrevBackground] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const currentIndexRef = useRef(-1);

  const [name, setName] = useState('loading...');
  const [loading, setLoading] = useState(true);
  
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; 
  
  const songIndexMap = new Map<string, number>();

  let { playlistId } = useParams();
  if(playlistId) localStorage.setItem('playlistId', playlistId) ?? '';
  else playlistId = localStorage.getItem('playlistId')!;

  //there needs to be a better way to do UP
  
  
  useEffect(()=>{
    //also add whether we already have the token
    const getToken = async ()=>{
      const request = await axios.get(`${backendUrl}/auth/token`);
      console.log(request.data)
      if(request.status === 200){
        if(request.data.token){
          localStorage.setItem('token', request.data.token);
          await getSongsFromPlaylist(request.data.token);
        } 
      }
    }

    const getSongsFromPlaylist = async (token: string)=>{
      await axios.get(`${spotifyBaseUrl}/${playlistId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response)=>{
        if(response.status != 200){
          alert('There was an error getting the playlist. Try again!');
          console.log(response.data);
        }else{

          

          const { tracks } = response.data;
          const { items } = tracks;
          const songs: Track[] = [];

          setName(name=> name);
          setLoading(false);

          //get all the songs in the playlist
          let index = 0;
          for(const item of items){
            const backgroundUrl = new CloudinaryImage(
              item.track.album.images[0].url, {cloudName: cloudName})
              .setDeliveryType("fetch")
              .effect(blur().strength(400))
            
            console.log(backgroundUrl.toURL());
            const song: Track = {
              songName: item.track.name,
              songPictureUrl: item.track.album.images[0].url,
              message: messages[index], //testing please!!!
              artists: item.track.artists.map((a: any)=> a.name),
              songBackground: backgroundUrl.toURL(),
              songId: item.track.id,
            }
            songs.push(song);
            songIndexMap.set(item.track.id, index);
            index++;
          }
          console.log('Songs -> ', songs);
          setSongArr(songs);
          songArrRef.current = songs;
        }
      }).catch((e)=>{
        alert('There was an error getting songs from the playlist');
        console.log('Error getting songs from the playlist ->', e);
      })  
    }

    getToken();

  }, []);
  

  const startMessage  = "All of this was inspired by you!"
  const callBack = (current_track:any)=>{
    
      console.log('call back hit!');
    if(!current_track) return;

    const currentId = current_track.id;
    if(!currentId) return;
    const  newIndex = songIndexMap.get(currentId as string)!;
    
    const newSong = songArrRef.current[newIndex];
      console.log(newSong);
      const img = new Image();
      img.src = newSong.songBackground;
      img.onload = ()=>{
        setPrevBackground(_prev => (currentIndex >= 0 ) ? songArrRef.current[currentIndex].songBackground : songArrRef.current[0].songBackground);
        setCurrentIndex(_currentIndex => newIndex)
        currentIndexRef.current = newIndex; //look at this
      }
    
    
  }
  return (

    //I think in the long run its best to have the silent player here
    <>
    <SilentPlayer playListId = {playlistId} songChangeCallBack={callBack}/>
    <div>
    {songArr.length > 0 && currentIndex != -1 ?
    (
      <SongPage {...songArr[currentIndex]} prevBackground={prevBackground} />
      
    ): 
    <StartPage startMessage = {startMessage} name = {name} playlistId = {playlistId!} loading = {loading} />
    }
    
    </div>
    </>
  )
}
