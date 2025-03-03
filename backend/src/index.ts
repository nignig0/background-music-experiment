import express, { Response, Request} from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

const app = express(); 
const port = 5000;

const corsOptions = {
    origin: ['*'],  // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT'],        // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  };
  
  // Use the CORS middleware
app.use(cors(corsOptions)); //temp removal for testing

app.get('/', (req: Request, res: Response)=>{
    res.send('Working!')
});


app.listen(port, ()=>{
    console.log(`Listening on port ${port}. Let's go playLiz`)
});
