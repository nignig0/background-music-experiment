import { backendUrl } from '../constants';
import './../styles/App.css'

export type StartPageProps = {
    startMessage: string, 
    name: string,
    buttonCallBack: () => void
}

export function StartPage({
    startMessage,
    name,
    buttonCallBack
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
                Welcome to 
            </h3>
            <h1 className= 'poppins-regular-glow'
            style={{
                color: 'white',
                fontSize: "80px",
            }}>{name}</h1>


            <h1 
            //onClick = {buttonCallBack}
            
            className = 'poppins-regular-glow'
            style = {{
                fontSize: "32px"
            }}><a href = {`${backendUrl}/auth/login?return_address=http://127.0.0.1:5173`}>Click to start!</a></h1>
        </div>
        </>

    );

}