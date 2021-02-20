import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./ArtistPage.css";
import Avatar from "./Avatar";
import DisplayCarusel from "./DisplayCarusel";
import SongListItem from "./SongListItem";
import { match, useLocation, useParams } from "react-router-dom";
import Auth from "./AuthApi";
import QuickPlaylistAdd from "./QuickPlaylistAdd";

function ArtistPage({ quickAdd, quickPlay, likeIt }) {
  const id = useParams().id;
  const [data, setData] = useState();
  const [artistsSongs, setArtistsSongs] = useState();
  const [minimenu, setMinimenu] = useState(null);
  const [miniPosition, setMiniPosition] = useState();
  let { user } = useContext(Auth);
  useEffect(() => {
    let getData = async () => {
      let data = await fetch(`/song?artist=${id}`, {
        headers: { "X-Custom-Header": String(user.id) },
      }).then((res) => res.json());
      setArtistsSongs(data);
    };
    getData();
  }, [id]);
  useEffect(() => {
    let getData = async () => {
      let data = await fetch(`/artist/${id}`).then((res) => res.json());
      setData(data);
    };
    getData();
  }, [id]);
  function addToPlaylist(e, x, y, id) {
    e.stopPropagation();
    setMiniPosition({ x, y });
    setMinimenu(id);
  }
  return (
    <div
      className="ArtistPage"
      onClick={() => setMinimenu(null)}
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.5) 1%, black), url('${
          data ? data[0].artist_image : ""
        }')`,
      }}
    >
      <div className="coverImage">
        <h1>{data ? data[0].title : ""}</h1>
      </div>
      <DisplayCarusel>
        {data
          ? data.map((song) => (
              <Avatar
                title={song.album}
                id={song.album_id}
                artist={song.title}
                image={song.album_image}
                type="album"
                quickAdd={quickAdd}
                quickPlay={quickPlay}
              />
            ))
          : ""}
      </DisplayCarusel>
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

export default ArtistPage;
