import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./AddSong.css";
import Auth from "./AuthApi";
import PendingForPlaylist from "./PendingForPlaylist"

function AddPlaylist() {
    const [name,setName]=useState()
    const [cover_image,setCoverImage]=useState()
    const [songs,setSongs]=useState([])
    const History=useHistory()
    const [massage,setMassage]=useState()
    let {user}=useContext(Auth)
    let user_id=user.id
    function submit(e){
        e.stopPropagation()
        if(name){
            let content={name, user_id, cover_image, songs}
            let options={
                method:"POST",
                body:JSON.stringify(content),
                headers:{
                    'Content-Type':'application/json'
                }
            }
            fetch('/playlist', options).then(res=>History.push('/'))
        }
        else{
            setMassage("A Name must be submitted!")
        }
    }

    function initiateToPlaylist(title,artist,album,length,id){
        if (!songs.some(song=>id==song.id)) setSongs(list=>list.concat({title,artist,album,length,id}))
    }

    function removeSong(id){
        let ind=songs.findIndex(song=>song.id==id)
        let list=songs
        list.splice(ind,1)
        let newList=list
        setSongs(newList)
    }
    

  return (
    <div onClick={()=>setMassage("")}>
      <div className="preview">
        <div className="coverImage">
          <img src={cover_image} />
        </div>
        <div className="info">
          <h1 className="title"> {name} </h1>
          <div className="meta">
            <h2>by {user.username}</h2>
          </div>
        </div>
      </div>
      <div className="form">
        <div className="fields">
        <div className="songTitle">
          <h4>Songs:</h4>
          <SearchBar
            style={{ width: "100%", height: "20px" }}
            type={["song"]}
            onChoose={({title,artist,album,length,id})=>{initiateToPlaylist(title,artist,album,length,id)}}
          />
        </div>
          <div className="songTitle">
            <h4>Cover Image: </h4>
            <input onChange={e=>setCoverImage(e.target.value)} className="plain"/>
          </div>
          <div className="songTitle">
            <h4>Name: </h4>
            <input onChange={e=>setName(e.target.value)} className="plain"/>
          </div>
        </div>
        <div className="submitAreaP">
            <div className="submitButton">
                <button onClick={submit}>SUBMIT</button>
            </div>
            {songs.map(({title,artist,album,length,id})=><PendingForPlaylist title={title} artist={artist} album={album} length={length} id={id} remove={()=>removeSong(id)}/>)}
        </div>
      </div>
    </div>
  );
}

export default AddPlaylist;