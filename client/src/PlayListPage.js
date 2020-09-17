import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ArtistPage.css";
import Avatar from "./Avatar";
import SongListItem from "./SongListItem";

function PlayListPage({id,quickAdd,quickPlay,type}) {
    const [data,setData]=useState()
    const [artistsSongs,setArtistsSongs]=useState()
    useEffect( ()=> {
        let getData=async()=>{
            console.log(id)
        let data=await fetch(`/song?${type}=${id}`).then(res=>res.json())
        console.log(data)
        setArtistsSongs(data)
        }
        getData()
    },[])
    useEffect( ()=> {
        let getData=async()=>{
        let data=await fetch(`/${type}/${id}`).then(res=>res.json())
        console.log(data)
        setData(data)
        }
        getData()
    },[])
    function addToPlaylist(id){
        console.log("need to add functionality")
    }
  return (
    <div className="ArtistPage" style={{minHeight: "100vh", backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.5) 1%, black), url('${data?data[0].image||data[0].artist_image:""}')` }}>
      <div
        className="coverImage" style={{minHeight:"40vh"}}>
          <h1>{data?data[0].title:""}</h1>
          <h2>{data?data[0].artist:""}</h2>
      </div>
      {artistsSongs?artistsSongs.map(x=><SongListItem title={x.title}
      artist={x.artist}
      album={x.album}
      length={x.length}
      id={x.id}
      play={quickPlay}
      addToLine={quickAdd}
      addToPlaylist={addToPlaylist}
      />):""}
    </div>
  );
}

export default PlayListPage;