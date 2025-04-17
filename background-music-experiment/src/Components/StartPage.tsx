import { backendUrl } from '../constants';
import './../styles/App.css'

//The hard coding here is amateurish
//need to up the backend

export type StartPageProps = {
    startMessage: string, 
    name: string,
    playlistId: string,
    loading: boolean
}

export function StartPage({
    playlistId}: StartPageProps){

    return (
        <>
        <div style = {{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            height: "100vh", width: "100vw",
            overflowX: "hidden"
        }}>
            <h3 className= 'poppins-regular'
            style={{
                color: 'white',
                fontSize: "40px"
            }}>
               {playlistId == '44fKkD2g3CY5TetqnNGYUb'? 'Elizabeth' : 'Hello Siri'} 
            </h3>
            <h1 className= 'poppins-regular-glow'
            style={{
                color: 'white',
                fontSize: "80px",
            }}>
               {playlistId == 'Elizabeth' ?"I'm so in love with you!": "I do hope you enjoy this!" } </h1>


            <h1 
            //onClick = {buttonCallBack}
            
            className = 'poppins-regular-glow'
            style = {{
                fontSize: "32px"
            }}><a href = {`${backendUrl}/auth/login?return_address=${playlistId}`}>Click to start!</a></h1>
        </div>
        </>

    );

}