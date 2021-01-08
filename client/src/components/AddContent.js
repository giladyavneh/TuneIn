import React, { useContext, useState } from "react";
import Auth from "../AuthApi";
import AddAlbum from "./AddAlbum";
import AddArtist from "./AddArtist";
import "./AddContent.css";
import AddPlaylist from "./AddPlaylist";
import AddSong from "./AddSong";

function AddContent(){
    const [current, setCurrent]=useState("playlist")
    const {user} = useContext(Auth)
    let currentCard;
    switch(current){
        case "song":
            currentCard=<AddSong/>
            break;
        case "artist":
            currentCard=<AddArtist/>
            break;
        case "album":
            currentCard=<AddAlbum/>
            break;
        case "playlist":
            currentCard=<AddPlaylist/>
            break;
    }
    return(
        <div className="AddContent">
            <div className="main">
                <div className="tabs">
                    {true?
                    <>
                    <button onClick={()=>setCurrent("song")}>song</button>
                    <button onClick={()=>setCurrent("artist")}>artist</button>
                    <button onClick={()=>setCurrent("album")}>album</button>
                    </>:""}
                    <button onClick={()=>setCurrent("playlist")}>playlist</button>
                </div>
                <div className="content">
                    {currentCard}
                </div>
            </div>
            <div className="filler"></div>
        </div>
    )
}

export default AddContent;