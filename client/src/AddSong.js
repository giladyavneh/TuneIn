import React, { useState } from "react";
import "./AddSong.css";
import SearchBar from "./SearchBar";
import { urlQuery } from "./Player";
import YouTube from "react-youtube" ;
import { useHistory } from "react-router-dom";

let toHHMMSS = function (secs) {
    var sec_num = secs;
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

function AddSong() {
    const [youtube_link, setVideoId]=useState()
    const [length, setDuration]=useState()
    const [title,SetTitle]=useState()
    const [artist,SetArtist]=useState()
    const [album,SetAlbum]=useState()
    const [artist_id,setArtistId]=useState()
    const [album_id,setAlbumId]=useState()
    const [track_number,setTrackNumber]=useState()
    const [massage,setMassage]=useState()
    let History=useHistory()

    function submit(e){
        e.stopPropagation()
        if(youtube_link&&title&&length){
            let content={title,artist_id,album_id,length,youtube_link,track_number}
            let options={
                method:"POST",
                body:JSON.stringify(content),
                headers:{
                    'Content-Type':'application/json'
                }
            }
            fetch('/song', options).then(res=>History.push('/'))
        }
        else if(!length){
            setMassage("Please wait for the video to load")
        }
        else{
            setMassage("You must insert a title and a Youtube link!")
        }
    }
  return (
    <div onClick={()=>setMassage("")}>
      <div className="preview">
        <div className="video">
          <YouTube
          videoId={urlQuery(youtube_link)}
          opts={{width:"240px", height:'150px',playerVars:{autoplay:1}}}
          onPlay={(e)=>setDuration(toHHMMSS(Math.floor(e.target.getDuration())))}/>
        </div>
        <div className="info">
          <h1 className="title"> {title} </h1>
          <div className="meta">
            <h2>{artist}</h2> <h2>|</h2> <h2>{album}</h2>
            <h4>{length}</h4>
          </div>
        </div>
      </div>
      <div className="form">
          <div className="fields">
      <div className="songTitle">
      <h4>YouTube Link:</h4>
          <input className="plain" onChange={(e)=>(setVideoId(e.target.value))}/>
        </div>
      <div className="songTitle">
      <h4>Album:</h4>
          <SearchBar
            style={{ width: "100%", height: "20px" }}
            type={["album"]}
            onChoose={({title,id})=>{SetAlbum(title);setAlbumId(id)}}
          />
        </div>
      <div className="songTitle">
          <h4>Artist:</h4>
          <SearchBar
            style={{ width: "100%", height: "20px" }}
            type={["artist"]}
            onChoose={({title,id})=>{SetArtist(title);setArtistId(id)}}
          />
        </div>
        <div className="songTitle divided">
          <div><h4>Song Title:</h4> <input className="plain" onChange={e=>SetTitle(e.target.value)} /></div>
          <div className="trackNumber">
              <h4>Track No.</h4>
              <input type="number" onChange={e=>setTrackNumber(e.target.value)}/>
              </div>
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

export default AddSong;
