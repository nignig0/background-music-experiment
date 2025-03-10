import React, { forwardRef, RefObject, useEffect, useImperativeHandle, useRef, useState } from "react";
import axios from "axios";

export const SilentPlayer = forwardRef((_, ref : React.ForwardedRef<any>) => {

    const token = localStorage.getItem('token');
    const deviceIdRef = useRef<string>('');
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
        .then((response)=>{
            if(response.status!= 204){
                console.log('Error Transferring playback -> ', response.data);
                //alert('Refresh... there was an error. oops!');
            }
        })
        .catch((e)=>{
            //alert('There was an error!');
            console.log('Error transferring playback -> ', e);
        });
    }

    const playSong = async (songId: string)=>{
        if(deviceIdRef.current == ''){
            console.log('Error playing song... no device Id')
            //alert('Error!');
            return;
        }
        await axios.put('https://api.spotify.com/v1/me/player/play',{
            device_id: deviceIdRef.current,
            uris: [`spotify:track:${songId}`]
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            
        })
        .then((response)=>{
            if(response.status!= 204){
                console.log('Error when beginning playback -> ', response.data);
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

            (ref as RefObject<any>).current = player;

            player.addListener("ready", async (device_id: any)=>{
                deviceIdRef.current = device_id;
                await transferPlayBack();
                console.log('Ready with device Id -> ', device_id);
                
            });

            player.addListener("not_ready", (device_id: any)=>{
                console.log('Device id has gone offline -> ', device_id);
                deviceIdRef.current = '';
            });

            player.connect();
        };
    }, []);

    useImperativeHandle(ref, () => ({
        playSong,

        player: (ref as RefObject<any>).current
      }), [playSong]);
    return (
        <>
            <div></div>
        </>
    );
    
});