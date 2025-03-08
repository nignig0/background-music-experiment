import { useEffect, useState } from "react";

type silentPlayerProps = {
    song: string,
    play: boolean,

}

export function SilentPlayer({song, play} : silentPlayerProps){
    console.log(song);

    const token = localStorage.getItem('token');
    console.log('token player token -> ', token);
    const [player, setPlayer] = useState(undefined);

    useEffect(()=>{
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;

        document.body.append(script);

        window.onSpotifyWebPlaybackSDKReady = ()=>{
            const player = new window.Spotify.Player({
                name: 'BME player',
                getOAuthToken: (cb: (arg0: string) => void) => { console.log('getting the player ready-> ',token); cb(token ?? ''); },
                volume: 1
            });

            setPlayer(player);

            player.addListener("ready", (device_id: any)=>{
                console.log('Ready with devide Id -> ', device_id);
            });

            player.addListener("not_ready", (device_id: any)=>{
                console.log('Device id has gone offline -> ', device_id);
            });

            player.connect();
        }
    }, []);

    return (
        <>
            <div></div>
        </>
    );
    
}