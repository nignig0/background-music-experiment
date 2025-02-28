type silentPlayerProps = {
    song: string,
    play: boolean
}

export function SilentPlayer({song, play} : silentPlayerProps){
    
    return (
        <>
            <iframe
             style = {{
                display: "none"
             }}
             width="0" height="0"
                src= {`https://www.youtube.com/embed/${song}?autoplay=${(play)?1:0}&controls=0&loop=1&playlist=${song}`}
                frameBorder="0"
                allow="autoplay; encrypted-media">
            </iframe>
        </>
    );
    
}