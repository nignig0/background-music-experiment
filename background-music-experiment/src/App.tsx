import { useEffect, useRef, useState } from 'react'
import './styles/App.css'
import { SongPage } from './Components/SongPage';
import { AwayPark, DanceNow, Lauren, TakeMeAway } from './songs';
import { SilentPlayer } from './Components/SilentPlayer';
function App() {

  const songArr = [AwayPark, TakeMeAway];
  const [song, setSong] = useState(songArr[0].youTubeSongId);
  const [play, setPlay] = useState(false);

  

  const setLimits = ()=>{
    const limits = [];
    for(let i = 0; i<songArr.length; ++i){
      const start = i*window.innerHeight;
      const end = i+1*window.innerHeight;
      limits.push([start, end, i]);
    }

    return limits;
  }
  const limits = setLimits();

  useEffect(()=>{
    const handleScroll = ()=>{
      const scrollPosition = window.scrollY;
      console.log(scrollPosition);
      console.log('inner Height-> ', window.innerHeight);
      for(let i = 0; i < limits.length; ++i){
        const [start, end, index] = limits[i];

        if(scrollPosition >= start && scrollPosition < end){
          setSong(songArr[index].youTubeSongId);
          break;
        }
      }
    }
    window.addEventListener('scroll', handleScroll);

    return ()=>{
      window.removeEventListener('scroll', handleScroll);
    }

  }, []);
  return (

    //I think in the long run its best to have the silent player here
    //and to use a useRef or something to control it with the scrolls
    <>
    <div>
    <button onClick = {()=>{
      setPlay(!play);
    }}> Click here to play!</button>
    <SilentPlayer song =  {song} play = {play}/>
    <SongPage {...AwayPark} />
    <SongPage {...TakeMeAway} /> 
    <SongPage {...DanceNow} /> 
    </div>
    </>
  )
}

export default App;
