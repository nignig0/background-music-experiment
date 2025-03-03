import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { v4 } from 'uuid';
import axios from 'axios';

dotenv.config()
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID! as string;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET! as string;
const login = async (req: Request, res: Response)=>{
    try{
        
        const scope = "streaming";
        const state = v4();
        const auth_query_params = new URLSearchParams({
            response_type: "code",
            client_id: spotifyClientId,
            scope: scope,
            redirect_uri: 'http://127.0.0.1:5000/auth/callback',
            state: state
        });

        //everything we have done here is to redirect the user to the spotify login screen
        //so they can give us permission
        res.redirect('https://accounts.spotify.com/authorize?' +auth_query_params.toString());

    }catch(err: any){
        console.log('There was an error logging in to spotify...');
        res.status(500).send({
            message: 'There was an error logging in to spotify'
        });
        return;
    }
}

const authCallback = async (req: Request, res: Response)=>{
    //after the user has loggen in, this is called

    const { code } = req.query;
    console.log('We are at the call back!')

    await axios.post('https://accounts.spotify.com/api/token', 
        {
            code: code, 
            redirect_uri: 'http://127.0.0.1:5000/auth/callback',
            grant_type: 'authorization_code'
        }, 
        {
            headers: {
                Authorization: 'Basic '+ (Buffer.from(spotifyClientId + ':'+spotifyClientSecret).toString('base64')),
                "Content-Type" : 'application/x-www-form-urlencoded'
            }
        }
    ).then((response)=>{
        console.log('The response -> ', response.data);
        if(response.status === 200){
           req.access_token = response.data.access_token;
            res.status(200).send({
                message: 'All good here!'
            });
        }
    }).catch((e)=>{
        console.log('There was an error in the callback');
        res.status(500).send({
            message: 'There was an error in the callback'
        });
    });

    return;

}

export const SpotifyController = {
    login, 
    authCallback
};