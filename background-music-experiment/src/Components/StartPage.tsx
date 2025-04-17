import { backendUrl } from '../constants';
import './../styles/App.css'

export type StartPageProps = {
    startMessage: string, 
    name: string,
    playlistId: string,
    loading: boolean
}

export function StartPage({
    startMessage,
    name,
    playlistId,
    loading
}: StartPageProps){

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
                Elizabeth
            </h3>
            <h1 className= 'poppins-regular-glow'
            style={{
                color: 'white',
                fontSize: "80px",
            }}>I'm so in love with you!</h1>


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