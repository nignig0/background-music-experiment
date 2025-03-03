import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { SpotifyController } from '../controllers/spotifyControllers';

dotenv.config();
const spotifyRoutes = express();

spotifyRoutes.get('/login', SpotifyController.login);
spotifyRoutes.get('/callback', SpotifyController.authCallback);



export default spotifyRoutes;