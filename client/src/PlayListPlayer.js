import React, { useEffect, useState } from "react"
import SongButton from "./SongButton"

function PlayListPlayer(props){
    const [songs, SetSongs]=useState([])
    useEffect(()=>{
        fetch("/top_songs").then(res=>res.json()).then(res=>SetSongs(res))
    },[])
    let songsInPlaylist=songs.map(({title,artist,album,length,link})=><SongButton
    title={title}
    artist={artist}
    album={album}
    length={length}
    link={link}/>)
    return(
        <div>
            {songsInPlaylist}
        </div>
    )
}

export default PlayListPlayer;