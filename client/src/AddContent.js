import React, { useState } from "react";
import AddAlbum from "./AddAlbum";
import AddArtist from "./AddArtist";
import "./AddContent.css";
import AddSong from "./AddSong";

function AddContent(){
    const [current, setCurrent]=useState("song")
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
    }
    return(
        <div className="AddContent">
            <div className="main">
                <div className="tabs">
                    <button onClick={()=>setCurrent("song")}>song</button>
                    <button onClick={()=>setCurrent("artist")}>artist</button>
                    <button onClick={()=>setCurrent("album")}>album</button>
                    <button onClick={()=>{}}>playlist</button>
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