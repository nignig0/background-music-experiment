import { useEffect, useRef } from "react";
import axios from "axios";

type SilentPlayerProps = {
    playListId: string,
    songChangeCallBack: ()=> void
}

export function SilentPlayer({ playListId, songChangeCallBack }: SilentPlayerProps){
    
    const token = localStorage.getItem('token');
    const deviceIdRef = useRef<string>('');
    const lastSongId = useRef<string>('');
    console.log('token player token -> ', token);

    const transferPlayBack = async()=>{
        if(deviceIdRef.current == ''){
            console.log('Error!... no current ID');
            return;
        }
        await axios.put('https://api.spotify.com/v1/me/player',{
            device_ids: [deviceIdRef.current],
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
                
            }
        })
        .catch((e)=>{
            //alert('There was an error!');
            console.log('Error transferring playback -> ', e);
        });
    }

    const turnOffShuffle = async ()=>{
        if(deviceIdRef.current == ''){
            console.log('Error toggling shuffle ... no device Id')
            //alert('Error!');
            return;
        }
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

    const playSong = async ()=>{
        if(deviceIdRef.current == ''){
            console.log('Error playing song... no device Id')
            //alert('Error!');
            return;
        }
        await axios.put('https://api.spotify.com/v1/me/player/play',{
            device_id: deviceIdRef.current,
            constext_uri: [`spotify:playlist:${playListId}`]
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


            player.addListener("ready", async (device_id: any)=>{
                deviceIdRef.current = device_id;
                await transferPlayBack();
                await turnOffShuffle();
                await playSong();
                console.log('Ready with device Id -> ', device_id);
                
            });

            player.addListener('player_state_changed', (state: any)=>{
                if(!state || !state.track_window.current_track) return;

                const currentTrackId = state.track_window.current_track.id;

                //if the song has changed
                if(lastSongId.current != '' && lastSongId.current != currentTrackId) songChangeCallBack(); 

                lastSongId.current = currentTrackId;
            })

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