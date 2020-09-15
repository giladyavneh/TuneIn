import React, { useEffect, useState } from "react";
import "./App.css";
import TopBanner from "./TopBanner";
import DisplayCarusel from "./DisplayCarusel";
import MediaPlayer from "./MediaPlayer";
import Avatar from "./Avatar";
function App(){
    const [topSongs,setTopSongs]=useState()
    useEffect(()=>fetch("/top_songs").then(res=>res.json()).then(res=>setTopSongs(res)),[])
    console.log(topSongs)

    
    
    return (
        <div style={{background:"rgb(100,100,100)", minHeight:"100vh"}}>
            <TopBanner/>
            <h1>Top Songs</h1>
            <DisplayCarusel>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
            </DisplayCarusel>
            <h1>Top Artists</h1>
            <DisplayCarusel>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
                <Avatar image="https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg" 
                type="song" title="Viva La Vida" artist="Coldplay"/>
            </DisplayCarusel>
        </div>
    )
}

export default App;