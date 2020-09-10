import React from "react";
import "./SongButton.css"

function SongButton({title,artist,album,length,link}){
    return(
        <div className="SongButton">
            <div className="info">
                <div>{title}</div>
                <div className="metadata">{artist} | {album}</div>
            </div>
            <div className="player">
                {length} PLAY {link}
            </div>
        </div>
    )
}

export default SongButton;