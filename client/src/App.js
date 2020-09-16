import React, { useEffect, useState } from "react";
import Home from "./Home"
import MediaPlayer from "./MediaPlayer";
function App(){
    const [playingNow,setPlayingNow]=useState()
    const [mediaPlays,setMediaPlays]=useState()
    useEffect(()=>fetch("/top_songs").then(res=>res.json()).then(res=>setPlayingNow(res)),[])
    useEffect(()=>setMediaPlays(true),[playingNow])
    return(
        <div>
            {mediaPlays?<MediaPlayer songs={playingNow} closePlayer={()=>setMediaPlays(false)}/>:""}
        </div>
    )
}

export default App;