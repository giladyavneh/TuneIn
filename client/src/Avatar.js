import React from "react";
import "./Avatar.css";

function Avatar(props) {
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
  return (
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
        ? `|${props.user}`
        : ` | ${props.artist}`}
      <div className="identifier">
        <img src={idImage} />
      </div>
    </div>
  );
}

export default Avatar;
