import { useEffect, useState } from 'react';
import './../styles/App.css';

export type SongPageProps = {
    message: string[],
    songName: string,
    songPictureUrl: string,
    songBackground: string, 
    prevBackground?: string

}


export function SongPage(
    {
        message,
        songName,
        songPictureUrl,
        songBackground,
        prevBackground
    }: SongPageProps){

    const [change, setChange] = useState(false);
    useEffect(()=>{
        const timeout = setTimeout(()=> setChange(true), 1000);

        return () => clearTimeout(timeout); 
    }, []);


    return(
        <>
        <div className = 'songDiv'
        style = {{
            backgroundImage: (!change) ? (prevBackground)?  `url(${prevBackground})` : 'rgb(0,0,0,0)' : `url(${songBackground})`,
        }}
        >
            <div className = 'songDivSection'
            style = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'hidden',
            }}
           
            >
                <div className='message'>
                {message.map((m)=><><h1
                    className = 'poppins-scroll'
                    >{m}</h1> <br/></>)}
                </div>
                
                
            </div>

            <div className = 'songDivSection'
                style = {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <img src = {songPictureUrl} height='50%' width = '50%' 
                style = {{
                    objectFit: 'cover'
                }}
                />
                <h1 className='poppins-regular'>{songName}</h1>
            </div>

        </div>
        </>
    );
}