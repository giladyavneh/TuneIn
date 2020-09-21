import React from "react";
import "./Avatar.css";
import {BrowserRouter, Route, Link, Switch, useHistory} from "react-router-dom";

function Avatar(props) {
  const History=useHistory()
  let idImage;
  switch (props.type) {
    case "song":
      idImage = "https://www.flaticon.com/svg/static/icons/svg/727/727218.svg";
      break;
    case "album":
      idImage =
        "https://www.flaticon.com/svg/static/icons/svg/3004/3004548.svg";
      break;
    case "playlist":
      idImage = "https://www.flaticon.com/svg/static/icons/svg/565/565267.svg";
      break;
    case "artist":
      idImage = "https://www.flaticon.com/svg/static/icons/svg/929/929493.svg";
      break;
  }
  function quickPlay(e){
    e.preventDefault()
    e.stopPropagation()
    props.quickPlay(props.id,props.type)
  }
  function quickAdd(e){
    e.preventDefault()
    e.stopPropagation()
    props.quickAdd(props.id,props.type)
  }
  return (
  <Link onClick={()=>History.location.pathname='/'} to={`${props.type==="artist"?`artistpage/${props.id}`:`playlistpage/${props.type}/${props.id}`}`}>
    <div
      className="Avatar"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0), black),
            url("${props.image}")
          `,
      }}
    >
      {props.title}
      {props.type === "artist"
        ? ""
        : props.type === "playlist"
        ? `|${props.artist}`
        : ` | ${props.artist}`}
      <div className="identifier">
        <img src={idImage} />
        {props.type==="artist"?"":<div className="quickActions">
          <div className="quickAdd" onClick={quickAdd}>
            <img src="https://www.flaticon.com/svg/static/icons/svg/1417/1417434.svg"/>
          </div>
          <div className="quickPlay" onClick={quickPlay}>
            <img src="https://www.flaticon.com/svg/static/icons/svg/727/727245.svg"/>
          </div>
        </div>}
      </div>
    </div>
  </Link>
  );
}

export default Avatar;
