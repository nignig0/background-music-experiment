import { useState } from 'react';
import './../styles/App.css';
import { SilentPlayer } from './SilentPlayer';

export type SongPageProps = {
    taniMessage: string,
    songName: string,
    songPictureUrl: string,
    songBackground: string, 
    youTubeSongId: string, 

}

export function SongPage(
    {
        taniMessage,
        songName,
        songPictureUrl,
        songBackground,
        youTubeSongId, 
    }: SongPageProps){

    return(
        <>
        <div className = 'songDiv'
        style = {{
            backgroundImage:  `url(${songBackground})`
        }}
        >
            <div className = 'songDivSection'
            style = {{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
                <h1 className = 'knewave-regular'>{taniMessage}</h1>
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
                <h1 className='knewave-regular'>{songName}</h1>
            </div>

        </div>
        </>
    );
}