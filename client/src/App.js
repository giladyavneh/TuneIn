import React, { useEffect, useState } from "react";
import Home from "./Home"
import MediaPlayer from "./MediaPlayer";
function App(){
    const [playingNow,setPlayingNow]=useState()
    const [mediaPlays,setMediaPlays]=useState()
    useEffect(async ()=>{let songs=await fetch("/top_songs").then(res=>res.json())
setPlayingNow(songs)},[])
    useEffect(()=>setMediaPlays(true),[playingNow])
    return(
        <div>
            <Home/>
            {mediaPlays?<MediaPlayer songs={playingNow} closePlayer={()=>setMediaPlays(false)}/>:""}
        </div>
    )
}

export default App;