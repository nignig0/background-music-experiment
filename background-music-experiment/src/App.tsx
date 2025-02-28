import { useEffect, useRef, useState } from 'react'
import './styles/App.css'
import { SongPage } from './Components/SongPage';
import { Wait, DanceNow, TakeMeAway } from './songs';
import { SilentPlayer } from './Components/SilentPlayer';
import { StartPage } from './Components/StartPage';
function App() {

  const songArr = [Wait, TakeMeAway, DanceNow];
  const [song, setSong] = useState(songArr[0].youTubeSongId);
  const [play, setPlay] = useState(false);

  

  const setLimits = ()=>{
    const limits = [];
    for(let i = 0; i<songArr.length; ++i){
      let start;
      if(i == 0) start = 0;
      else
        start = (i+1)*window.innerHeight;
      const end = ((i+2)*window.innerHeight);
      limits.push([start, end, i]);
    }

    return limits;
  }
  const limits = setLimits();

  console.log('the limits -> ', limits);
  
  useEffect(()=>{
    const handleScroll = ()=>{
      console.log('play ->', play)
      const scrollPosition = window.scrollY;
      console.log(scrollPosition);
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

  const startMessage  = "All of this was inspired by you!"
  const name = "Generic Name";
  const bottonCallBack = ()=>{
    setPlay(true);
  }
  return (

    //I think in the long run its best to have the silent player here
    //and to use a useRef or something to control it with the scrolls
    <>
    <SilentPlayer song =  {song} play = {play}/>
    <div style = {{
      scrollSnapType: "y mandatory"
    }}>
    <StartPage startMessage = {startMessage} name = {name} buttonCallBack = {bottonCallBack} />
    
    <SongPage {...Wait} />
    <SongPage {...TakeMeAway} /> 
    <SongPage {...DanceNow} /> 
    </div>
    </>
  )
}

export default App;
