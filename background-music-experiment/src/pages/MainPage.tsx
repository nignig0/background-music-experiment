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
  const currentIndex = useRef<number>(-1);
  
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; 
  
  let { playlistId } = useParams();
  if(playlistId) localStorage.setItem('playlistId', playlistId) ?? '';
  else playlistId = localStorage.getItem('playlistId')!;

  //there needs to be a better way to do UP


  const setLimits = (arr: any[])=>{
    const limits = [];
    for(let i = 0; i<arr.length; ++i){
      let start;
      if(i == 0) start = 0;
      else
        start = (i+1)*window.innerHeight;
      const end = ((i+2)*window.innerHeight);
      limits.push([start, end, i]);
    }

    return limits;
  }
  
  
  useEffect(()=>{
    const handleScroll = ()=>{
      console.log('play ->', play)
      const scrollPosition = window.scrollY;
      console.log(scrollPosition);
      for(let i = 0; i < limits.length; ++i){
        const [start, end, index] = limits[i];

        if(scrollPosition >= start && scrollPosition < end){
          if(player.current) {
            console.log('handling scroll... song Arr -> ', songArrRef.current);
            if(i!= currentIndex.current)
              currentIndex.current = i;
              player.current.playSong(songArrRef.current[index].songId);
            //too many fucking requests
          }
            
          else console.log('the player has not been set?')
          break;
        }
      }
    }
    window.addEventListener('scroll', handleScroll);

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
          limits = setLimits(songs);
          console.log('the limits -> ', limits);
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
  const bottonCallBack = ()=>{
    setPlay(true);
  }
  return (

    //I think in the long run its best to have the silent player here
    //and to use a useRef or something to control it with the scrolls
    <>
    <SilentPlayer ref={player} />
    <div style = {{
      scrollSnapType: "y mandatory" //check this out 
    }}>
    <StartPage startMessage = {startMessage} name = {name} buttonCallBack = {bottonCallBack} playlistId = {playlistId!}/>
    {songArr.length != 0 ?
        (
          songArr.map((track)=>(
            <>
            <SongPage {...track}/>
            </>
          ))
        ):
        <div></div>
    }
    </div>
    </>
  )
}
