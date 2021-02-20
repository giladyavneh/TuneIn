import React, { useEffect, useState } from "react";
import "./Player.css";
import YouTube from "react-youtube";
import Controller from "./Controller";
function urlQuery(url){
  try{
    let uri=new URL(url);
    return uri.searchParams.get('v')
  }
  catch{
    return url
  }
}

function Player({ song,next,minimized, previous, opener, count}) {
  const [player,setPlayer]=useState()
  const [isPlaying,setPlaying]=useState()

  useEffect(()=>{
    count(song.id)
  },[song])

  useEffect(()=>{
    if(player){
      minimized?
      player.setSize(0, 0):
      player.setSize(200, 115)
    }
  },[minimized])
  function pausePlay(){
    player.getPlayerState()===1?
    player.pauseVideo()
    :player.playVideo()
  }
  function backward(){
    let now=player.getCurrentTime()
    player.seekTo(now-10)
  }
  function forward(){
    let now=player.getCurrentTime()
    player.seekTo(now+10)
  }
  
  return (
    <div id="Player" className={minimized?"minimized":""} style={{padding:minimized?"0px":"10px"}}>
      <div className="songInfo">
        <h1 className="songTitle">{song?song.title:"title"}</h1>
        <h4 className="songMeta">
          {song?song.artist:"artist"} | {song?song.album:"album"}
        </h4>
      </div>
      <div>
        <YouTube
          videoId={song?urlQuery(song.link):"link"}
          opts={{width:"200", height:"115", playerVars:{autoplay:1}}}
          onReady={(e)=>{setPlayer(e.target)}}
          onStateChange={(e)=>e.target.getPlayerState()===1?setPlaying(true):setPlaying(false)}
          onEnd={next}
        />
        {minimized?
        <Controller opener={opener} playing={isPlaying} previous={previous} stop={()=>player.stopVideo()} backward={backward} forward={forward} pausePlay={pausePlay} next={next}/>
        :""}
      </div>
    </div>
  );
}

export {Player as default, urlQuery};
