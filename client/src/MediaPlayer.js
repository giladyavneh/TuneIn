import React, { useEffect, useState } from 'react';
import './MediaPlayer.css';
import PlayListPlayer from "./PlayListPlayer";
import Player from "./Player";

function MediaPlayer() {
  const noMoreSongs={
    title:"No song to be played",artist: "Tune in",album: "Keep it simple",length:"00:00:00",link:""
}
  const [currentSong, setCurrentSong]=useState()
  const [songs, setSongs]=useState()
  useEffect(()=>{
    fetch("/top_songs").then(res=>res.json()).then(res=>setSongs(res))
},[])
  function play(key){
    let current=songs[key]||noMoreSongs
    current.index=key
    setCurrentSong(current)
  }
  function next(){
    let ind=songs.findIndex(song=>song.title===currentSong.title)
    play(songs[ind+1])
  }
  return (
    <div style={{background:"rgb(100,100,100)", borderRadius:"10px"}}>
      <div id="playerTop"><button>x</button><button>-</button></div>
      {currentSong?<Player song={currentSong} next={next}/>:""}
      <PlayListPlayer songs={songs} play={play}/>
    </div>
  );
}

export default MediaPlayer;
