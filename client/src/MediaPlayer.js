import React, { useEffect, useState } from 'react';
import './MediaPlayer.css';
import PlayListPlayer from "./PlayListPlayer";
import Player from "./Player";

function MediaPlayer(props) {
  const noMoreSongs={
    title:"No song to be played",artist: "Tune in",album: "Keep it simple",length:"00:00:00",link:""
}
  
  const [currentSong, setCurrentSong]=useState()
  const [songs, setSongs]=useState()
  const [minimized,setMinimized]=useState()
  useEffect(()=>{
    fetch("/top_songs").then(res=>res.json()).then(res=>setSongs(res))
},[])
useEffect(()=>{if(songs) setCurrentSong(songs[0])},[songs])
  function play(key){
    let current=songs[key]||noMoreSongs
    current.index=key
    setCurrentSong(current)
  }
  function next(){
    let ind=songs.findIndex(song=>song.title===currentSong.title)
    console.log(ind)
    play(ind+1)
  }
  function previous(){
    let ind=songs.findIndex(song=>song.title===currentSong.title)
    console.log(ind)
    play(ind-1)
  }
  let topBar=<div id="playerTop"><button>x</button><button onClick={()=>setMinimized(true)}>-</button></div>
  return (
    <div className={minimized?"minimized":"MediaPlayer"}>
      {minimized?"":topBar}
      {currentSong?<Player opener={()=>setMinimized(false)} minimized={minimized} previous={previous} song={currentSong} next={next}/>:""}
      {minimized?"":<PlayListPlayer songs={songs} play={play}/>}
    </div>
  );
}

export default MediaPlayer;
