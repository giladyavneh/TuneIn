import React, { useEffect, useState } from "react"
import SongButton from "./SongButton"

function PlayListPlayer({songs,play}){
    
    let songsInPlaylist=songs?songs.map(({title,artist,album,length,link},i,all)=><SongButton
    key={i}
    index={i}
    play={play}
    title={title}
    artist={artist}
    album={album}
    length={length}
    link={link}/>)
    :""
    return(
        <div>
            {songsInPlaylist}
        </div>
    )
}

export default PlayListPlayer;