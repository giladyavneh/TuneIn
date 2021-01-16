import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./AddSong.css";
import httpClient from "../services/httpClient";

function AddAlbum() {
    const [name,setName]=useState()
    const [cover_image,setCoverImage]=useState()
    const [artist,SetArtist]=useState()
    const [artist_id,setArtistId]=useState()
    const History=useHistory()
    const [massage,setMassage]=useState()
    function submit(e){
        e.stopPropagation()
        if(name&&artist){
            let content={name, artist_id, cover_image}
            let options={
                method:"POST",
                data:content,
                headers:{
                  'Content-Type':'application/json'
                  }
            }
            httpClient('/album', options).then(res=>History.push('/'))
        }
        else{
            setMassage("A Name and an Artist must be submitted!")
        }
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
            <h2>{artist}</h2>
          </div>
        </div>
      </div>
      <div className="form">
        <div className="fields">
          <div className="songTitle">
            <h4>Cover Image: </h4>
            <input onChange={e=>setCoverImage(e.target.value)} className="plain"/>
          </div>
          <div className="songTitle">
          <h4>Artist:</h4>
          <SearchBar
            style={{ width: "100%", height: "20px" }}
            type={["artist"]}
            onChoose={({title,id})=>{SetArtist(title);setArtistId(id)}}
          />
        </div>
          <div className="songTitle">
            <h4>Name: </h4>
            <input onChange={e=>setName(e.target.value)} className="plain"/>
          </div>
        </div>
        <div className="submitArea">
            <div className="massageBoard">
                {massage}
            </div>
            <div className="submitButton">
                <button onClick={submit}>SUBMIT</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default AddAlbum;