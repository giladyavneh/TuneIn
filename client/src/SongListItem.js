import React from "react";
import "./SongListItem.css"

function SongListItem({title,artist,album,length,addToLine,play,id, addToPlaylist}){
        return(
        <div className="SongListItem">
            <div className="info">
                <div>{title}</div>
                <div className="metadata">{artist} | {album}</div>
            </div>
            <div className="player">
                {length}
                <button className="addToLine" onClick={()=>addToLine(id,"song")}><img alt="addToLine" src="https://www.flaticon.com/svg/static/icons/svg/1417/1417434.svg"/></button>
                <button className="addToPlaylist" onClick={()=>addToPlaylist(id)}><img alt="addToPlayList" src="https://www.flaticon.com/svg/static/icons/svg/565/565264.svg"/></button>
                <button className="play" onClick={()=>play(id,"song")}><img alt="play" src="https://www.flaticon.com/svg/static/icons/svg/727/727245.svg"></img></button>
                
            </div>
        </div>
    )
}

export default SongListItem;