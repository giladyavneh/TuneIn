import React, { useState } from "react";
import "./SongListItem.css";

function SongListItem({
  title,
  artist,
  album,
  length,
  addToLine,
  play,
  id,
  liked,
  likeIt,
  addToPlaylist,
}) {
  const [likeButton, setLikeButton] = useState(liked);
  function like() {
    setLikeButton((current) => !current);
    likeIt(id, "song");
  }
  return (
    <div className="SongListItem">
      <div className="info">
        <div>{title}</div>
        <div className="metadata">
          {artist} | {album}
        </div>
      </div>
      <div className="player">
        {length}
        <button className="addToLine" onClick={() => addToLine(id, "song")}>
          <img
            alt="addToLine"
            src="https://www.flaticon.com/svg/static/icons/svg/1417/1417434.svg"
          />
        </button>
        <button className="addToPlaylist" onClick={(e) => addToPlaylist(e, e.pageX, e.pageY, id)}>
          <img
            alt="addToPlayList"
            src="https://www.flaticon.com/svg/static/icons/svg/565/565264.svg"
          />
        </button>
        <button className="play" onClick={() => play(id, "song")}>
          <img
            alt="play"
            src="https://www.flaticon.com/svg/static/icons/svg/727/727245.svg"
          ></img>
        </button>
        <button className="like" onClick={like}>
          <img
            alt="like"
            src={
              likeButton
                ? "https://www.flaticon.com/svg/static/icons/svg/833/833386.svg"
                : "https://www.flaticon.com/svg/static/icons/svg/833/833300.svg"
            }
          ></img>
        </button>
      </div>
    </div>
  );
}

export default SongListItem;
