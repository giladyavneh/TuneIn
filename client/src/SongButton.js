import React from "react";
import "./SongButton.css"


      

function SongButton({title,artist,album,length,index,play,key}){
        console.log(index)
        return(
        <div className="SongButton">
            <div className="info">
                <div>{title}</div>
                <div className="metadata">{artist} | {album}</div>
            </div>
            <div className="player">
                {length} <button onClick={()=>play(index)}>PLAY</button> 
            </div>
        </div>
    )
}

export default SongButton;