import { useEffect, useRef, useState } from 'react';
import './../styles/App.css';
import { SilentPlayer } from './SilentPlayer';

export type SongPageProps = {
    message: string[],
    songName: string,
    songPictureUrl: string,
    songBackground?: string, 

}


export function SongPage(
    {
        message,
        songName,
        songPictureUrl,
        songBackground,
    }: SongPageProps){


    return(
        <>
        <div className = 'songDiv'
        style = {{
            backgroundImage: (songBackground != undefined) ?  `url(${songBackground})` : 'none',
            backgroundColor: (songBackground != undefined) ? 'rgba(0,0,0,0)' : 'rgba(0,0,0, 0.9)'
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