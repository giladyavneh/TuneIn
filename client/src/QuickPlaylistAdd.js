import React, { useContext, useEffect, useState } from "react";
import Auth from "./AuthApi";
import "./QuickPlaylistAdd.css";

function QuickPlaylistAdd({x,y,song_id}){
    const [playlists, setPlaylists]=useState()
    let {user}=useContext(Auth)
    useEffect(()=>{
        fetch(`playlist?user_id=${user.id}`).then(res=>res.json()).then(res=>setPlaylists(res))
    },[])
    return(
        <div className="QuickPlaylistAdd" style={{top:`${y}`,right:`${x}`}}>
            {playlists}
        </div>
    )
}

export default QuickPlaylistAdd;