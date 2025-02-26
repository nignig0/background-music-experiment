import { useState } from 'react';
import './../styles/App.css';
import { SilentPlayer } from './SilentPlayer';

export type SongPageProps = {
    taniMessage: string,
    songName: string,
    songPictureUrl: string,
    youTubeSongId: string, 

}

export function SongPage(
    {
        taniMessage,
        songName,
        songPictureUrl,
        youTubeSongId, 
    }: SongPageProps){

    return(
        <>
        <div className = 'songDiv'
        style = {{
            backgroundImage:  `url(${songPictureUrl})`
        }}
        >
            <div className = 'songDivSection'
            style = {{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
                <h1>{taniMessage}</h1>
            </div>

            <div className = 'songDivSection'
                style = {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <img src = {songPictureUrl} height='50%' width = '50%'/>
                <h1>{songName}</h1>
            </div>

        </div>
        </>
    );
}