import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ArtistPage.css";
import Avatar from "./Avatar";
import DisplayCarusel from "./DisplayCarusel"
import SongListItem from "./SongListItem";

function ArtistPage({id,quickAdd,quickPlay}) {
    const [data,setData]=useState()
    const [artistsSongs,setArtistsSongs]=useState()
    useEffect( ()=> {
        let getData=async()=>{
            console.log(id)
        let data=await fetch(`/song?artist=${id}`).then(res=>res.json())
        console.log(data)
        setArtistsSongs(data)
        }
        getData()
    },[])
    useEffect( ()=> {
        let getData=async()=>{
        let data=await fetch(`/artist/${id}`).then(res=>res.json())
        console.log(data)
        setData(data)
        }
        getData()
    },[])
    function addToPlaylist(id){
        console.log("need to add functionality")
    }
  return (
    <div className="ArtistPage" style={{minHeight: "100vh", backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.5) 1%, black), url('${data?data[0].artist_image:""}')` }}>
      <div
        className="coverImage">
          <h1>{data?data[0].title:""}</h1>
      </div>
      <DisplayCarusel>
          {data?data.map(song=><Avatar title={song.album}
            id={song.album_id}
            artist={song.title}
            image={song.album_image}
            type="album"
            quickAdd={quickAdd}
            quickPlay={quickPlay}/>):""}
      </DisplayCarusel>
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

export default ArtistPage;
