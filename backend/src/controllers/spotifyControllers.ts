import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { v4 } from 'uuid';
import axios from 'axios';

dotenv.config()

let access_token: any;
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID! as string;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET! as string;
const frontendUrl = process.env.FRONTEND_URL! as string;
const environment = process.env.ENVIRONMENT! as string;

const login = async (req: Request, res: Response)=>{
    try{
        const { return_address } = req.query; //need some_way to return
        console.log('return address -> ', return_address);

        const scope = "streaming \ user-modify-playback-state";
        const state = return_address;
        const auth_query_params = new URLSearchParams({
            response_type: "code",
            client_id: spotifyClientId,
            scope: scope,
            redirect_uri: (environment == 'LOCAL') ? 'http://127.0.0.1:5000/auth/callback' : '',
            state: state as string
        });

        //everything we have done here is to redirect the user to the spotify login screen
        //so they can give us permission
        res.redirect('https://accounts.spotify.com/authorize?' +auth_query_params.toString());

    }catch(err: any){
        console.log('There was an error logging in to spotify... -> ', err);
        res.status(500).send({
            message: 'There was an error logging in to spotify'
        });
        return;
    }
}

const authCallback = async (req: Request, res: Response)=>{
    //after the user has loggen in, this is called

    const { code, state } = req.query;
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
        console.log(response.status);
        if(response.status === 200){
            console.log('we are in the then!')
            access_token = response.data.access_token;
            console.log('req access token -> ', req.access_token);
            res.redirect(`${frontendUrl}/${state}`);

        }
    }).catch((e)=>{
        console.log('There was an error in the callback -> ', e);
        res.status(500).send({
            message: 'There was an error in the callback'
        });
    });

    return;

}

const getToken = async(req: Request, res: Response)=>{
    console.log(access_token);
    res.status(200).send({
        token: access_token
    });
    return;
}

export const SpotifyController = {
    login, 
    authCallback,
    getToken
};