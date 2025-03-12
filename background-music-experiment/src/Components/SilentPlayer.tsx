import { useEffect, useRef } from "react";
import axios from "axios";

type SilentPlayerProps = {
    playListId: string,
    songChangeCallBack: ()=> void
}

export function SilentPlayer({ playListId, songChangeCallBack }: SilentPlayerProps){
    
    const token = localStorage.getItem('token');
    const deviceIdRef = useRef<string>('');
    const lastSongId = useRef<string>(null);
    console.log('token player token -> ', token);

    const transferPlayBack = async(device_id: string)=>{
        await axios.put('https://api.spotify.com/v1/me/player',{
            device_ids: [device_id],
            play: true
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            
        })
        .then(async (response)=>{
            if(response.status!= 204){
                console.log('Error Transferring playback -> ', response.data);
                //alert('Refresh... there was an error. oops!');
            }else{
                await turnOffShuffle();
                await playSong(device_id);
            }
        })
        .catch((e)=>{
            //alert('There was an error!');
            console.log('Error transferring playback -> ', e);
        });
    }

    const turnOffShuffle = async ()=>{
        await axios.put('https://api.spotify.com/v1/me/player/shuffle?state=false',{
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            
        })
        .then((response)=>{
            if(response.status!= 204){
                console.log('Error when toggling shuffle-> ', response);
                //alert('Refresh... there was an error. oops!');
            }
        })
        .catch((e)=>{
            //alert('There was an error!');
            console.log('Error toggling shuffle -> ', e);
        });
    }

    const playSong = async (device_id: string)=>{
        await axios.put('https://api.spotify.com/v1/me/player/play',{
            device_id: device_id,
            context_uri: `spotify:playlist:${playListId}`
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            
        })
        .then((response)=>{
            if(response.status!= 204){
                console.log('Error when beginning playback -> ', response);
                //alert('Refresh... there was an error. oops!');
            }
        })
        .catch((e)=>{
            //alert('There was an error!');
            console.log('Error beginning playback -> ', e);
        });
    }



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


            player.addListener("ready", async ({ device_id }: any)=>{
                await transferPlayBack(device_id);
                console.log('Ready with device Id -> ', device_id);
                
            });

            player.addListener('player_state_changed', (state: any)=>{

                console.log('in the state changed listener');
                if(!state || !state.track_window.current_track) return;

                console.log('skipped the return');
                const currentTrackId = state.track_window.current_track.id;

                //if the song has changed
                if(lastSongId.current && lastSongId.current != currentTrackId){
                    console.log('change the song')
                    songChangeCallBack(); 
                }
                    

                lastSongId.current = currentTrackId;
            });

            player.addListener("not_ready", (device_id: any)=>{
                console.log('Device id has gone offline -> ', device_id);
                deviceIdRef.current = '';
            });

            player.connect();
        };
    }, []);


    return (
        <>
            <div></div>
        </>
    );
}