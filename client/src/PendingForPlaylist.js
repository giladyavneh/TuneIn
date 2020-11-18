import React, { useState } from "react";
import "./SongListItem.css";

function PendingForPlaylist({
  title,
  artist,
  album,
  length,
  id,
  remove
}) {
  
  return (
    <div className="SongListItem" style={{position:"relative"}}>
        <button style={{position:"absolute", top:0, right:0}} onClick={remove}>X</button>
      <div className="info">
        <div>{title}</div>
        <div className="metadata">
          {artist} | {album}
        </div>
      </div>
    </div>
  );
}

export default PendingForPlaylist;
