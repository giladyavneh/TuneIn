import React, { useContext, useEffect, useState } from "react";
import Auth from "../AuthApi";
import "./QuickPlaylistAdd.css";

function QuickPlaylistAdd({x,y,song_id,closeMe}){
    const [playlists, setPlaylists]=useState([])
    let {user}=useContext(Auth)
    useEffect(()=>{
        fetch(`/playlist?user_id=${user.id}`).then(res=>res.json()).then(res=>setPlaylists(res))
    },[song_id])
    function addToPlaylist(playlist_id){
        fetch(`/playlist/${playlist_id}/${song_id}`,{method:"POST"}).then(res=>res.json()).then(res=>console.log(res))
        closeMe()
    }

    return(
        <div className="QuickPlaylistAdd" style={{top:`${y}px`,right:`${window.innerWidth- x}px`}}>
            <div className="toptab"><span onClick={closeMe}>X</span></div>
          {playlists.map(playlist=><><div className="playlistName" onClick={()=>addToPlaylist(playlist.id)}>{playlist.name}</div><hr/></>)}
        </div>
    )
}

export default QuickPlaylistAdd;