import { useEffect, useRef, useState } from 'react'
import '.././styles/App.css';
import { SongPage } from '.././Components/SongPage';
import { Wait, DanceNow, TakeMeAway, message } from '.././songs';
import { SilentPlayer } from '.././Components/SilentPlayer';
import { StartPage } from '.././Components/StartPage';
import axios from 'axios';
import { backendUrl, spotifyBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';
import { Track } from '../types';

export function MainPage() {

  const [songArr, setSongArr] = useState<Track[]>([]);
  const player = useRef(null);
  const [play, setPlay] = useState(false);
  
  let { playlistId } = useParams();
  if(playlistId) localStorage.setItem('playlistId', playlistId) ?? '';
  else playlistId = localStorage.getItem('playlistId')!;

  //there needs to be a better way to do UP


  // const setLimits = ()=>{
  //   const limits = [];
  //   for(let i = 0; i<songArr.length; ++i){
  //     let start;
  //     if(i == 0) start = 0;
  //     else
  //       start = (i+1)*window.innerHeight;
  //     const end = ((i+2)*window.innerHeight);
  //     limits.push([start, end, i]);
  //   }

  //   return limits;
  // }
  // const limits = setLimits();

  // console.log('the limits -> ', limits);
  
  useEffect(()=>{
    // const handleScroll = ()=>{
    //   console.log('play ->', play)
    //   const scrollPosition = window.scrollY;
    //   console.log(scrollPosition);
    //   for(let i = 0; i < limits.length; ++i){
    //     const [start, end, index] = limits[i];

    //     if(scrollPosition >= start && scrollPosition < end){
          
    //       break;
    //     }
    //   }
    // }
    // window.addEventListener('scroll', handleScroll);

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
            const song: Track ={
              songName: item.track.name,
              songPictureUrl: item.track.album.images[0],
              message: message, //testing please!!!
              artists: item.track.artists.map((a: any)=> a.name)
            }
            songs.push(song);
          }
          console.log('Songs -> ', songs);
          setSongArr(songs);
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
    <SilentPlayer song =  {''} play = {play} ref = {player}/>
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
