import { useEffect, useRef, useState } from 'react'
import '.././styles/App.css';
import { SongPage } from '.././Components/SongPage';
import { message } from '.././songs';
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
  const player = useRef<any>(null);
  const [play, setPlay] = useState(false);
  let limits: number[][];
  const [currentIndex, setCurrentIndex] = useState(-1);
  
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; 
  
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
    //probably need to refactor this in the future

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

          //get all the songs in the playlist
          for(const item of items){
            const backgroundUrl = new CloudinaryImage(
              item.track.album.images[0].url, {cloudName: cloudName})
              .setDeliveryType("fetch")
              .effect(blur().strength(400))
            
            console.log(backgroundUrl.toURL());
            const song: Track = {
              songName: item.track.name,
              songPictureUrl: item.track.album.images[0].url,
              message: message, //testing please!!!
              artists: item.track.artists.map((a: any)=> a.name),
              songBackground: backgroundUrl.toURL(),
              songId: item.track.id,
            }
            songs.push(song);
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
    

    // return ()=>{
    //   window.removeEventListener('scroll', handleScroll);
    // }

  }, []);

  const startMessage  = "All of this was inspired by you!"
  const name = "Generic Name";
  const callBack = ()=>{
    setCurrentIndex(currentIndex+1);
    
  }
  return (

    //I think in the long run its best to have the silent player here
    //and to use a useRef or something to control it with the scrolls
    <>
    <SilentPlayer playListId = {playlistId} songChangeCallBack={callBack}/>
    <div style = {{
      scrollSnapType: "y mandatory" //check this out 
    }}>
    {songArr.length > 0 && currentIndex != -1 ?
    (
      <SongPage {...songArr[currentIndex]}/>
      
    ): 
    <StartPage startMessage = {startMessage} name = {name} playlistId = {playlistId!}/>
    }
    
    </div>
    </>
  )
}
