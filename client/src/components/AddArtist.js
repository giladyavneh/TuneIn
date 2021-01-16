import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import httpClient from "../services/httpClient";
import "./AddSong.css";

function AddArtist() {
    const [name,setName]=useState()
    const [coverImage,setCoverImage]=useState()
    const History=useHistory()
    const [massage,setMassage]=useState()
    function submit(e){
        e.stopPropagation()
        if(name){
            let content={name, coverImage}
            let options={
                method:"POST",
                data:content,
                headers:{
                    'Content-Type':'application/json',
                }
            }
            httpClient('/artist', options).then(res=>History.push('/'))
        }
        else{
            setMassage("A Name must be submitted!")
        }
    }
  return (
    <div onClick={()=>setMassage("")}>
      <div className="preview">
        <div className="coverImage">
          <img src={coverImage} />
        </div>
        <div className="info">
          <h1 className="title"> {name} </h1>
        </div>
      </div>
      <div className="form">
        <div className="fields">
          <div className="songTitle">
            <h4>Cover Image: </h4>
            <input onChange={e=>setCoverImage(e.target.value)} className="plain"/>
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

export default AddArtist;
