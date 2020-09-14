import React, { useState } from "react";
import "./Player.css";
import YouTube from "react-youtube"

function Player({ song,next }) {
  const [player,setPlayer]=useState()
  
  return (
    <div id="Player" style={{padding: "10px"}}>
      <div className="songInfo">
        <h1 className="songTitle">{song.title}</h1>
        <h4 className="songMeta">
          {song.artist} | {song.album}
        </h4>
      </div>
      <YouTube
        videoId={song.link}
        opts={{width:"200", height:"115", playerVars:{autoplay:1}}}
        onReady={(e)=>setPlayer(e.target)}
        onEnd={next}
      />
    </div>
  );
}

export default Player;
