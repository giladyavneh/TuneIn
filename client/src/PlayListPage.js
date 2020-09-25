import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./ArtistPage.css";
import Auth from "./AuthApi";
import SongListItem from "./SongListItem";
import QuickPlaylistAdd from "./QuickPlaylistAdd";

function PlayListPage({ quickAdd, quickPlay, likeIt }) {
  const type = useParams().type;
  const id = useParams().id;
  const [data, setData] = useState();
  const [artistsSongs, setArtistsSongs] = useState();
  const [minimenu, setMinimenu] = useState(null);
  const [miniPosition, setMiniPosition] = useState();
  let { user } = useContext(Auth);
  useEffect(() => {
    let getData = async () => {
      let data = await fetch(`/song?${type}=${id}`, {
        headers: { "X-Custom-Header": String(user.id) },
      }).then((res) => res.json());
      setArtistsSongs(data);
    };
    getData();
  }, [id, type]);
  useEffect(() => {
    let getData = async () => {
      console.log(type, id)
      let data = await fetch(`/${type}/${id}`).then((res) => res.json());
      console.log(data)
      setData(data);
    };
    getData();
  }, [id, type]);
  function addToPlaylist(id) {
    console.log("need to add functionality");
  }
  function addToPlaylist(e, x, y, id) {
    e.stopPropagation();
    setMiniPosition({ x, y });
    setMinimenu(id);
  }
  return (
    <div
      className="ArtistPage"
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.5) 1%, black), url('${
          data ? data.coverImage||data.Artist.coverImage||""  : ""
        }')`,
      }}
    >
      <div className="coverImage" style={{ minHeight: "40vh" }}>
        <h1>{data ? data.name||data.title : ""}</h1>
        <h2>{data ? data.Artist.name : ""}</h2>
      </div>
      {artistsSongs
        ? artistsSongs.map((x) => (
            <SongListItem
              title={x.title}
              artist={x.artist}
              album={x.album}
              length={x.length}
              id={x.id}
              play={quickPlay}
              addToLine={quickAdd}
              addToPlaylist={addToPlaylist}
              liked={x.liked}
              likeIt={likeIt}
            />
          ))
        : ""}
      <div id="filler"></div>
      {minimenu != null ? (
        <QuickPlaylistAdd
          closeMe={() => setMinimenu(null)}
          song_id={minimenu}
          x={miniPosition.x}
          y={miniPosition.y}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default PlayListPage;
