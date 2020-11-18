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
  const [minimenu, setMinimenu] = useState(null);
  const [miniPosition, setMiniPosition] = useState();
  let { user } = useContext(Auth);
  
  useEffect(() => {
    let getData = async () => {
      let data = await fetch(`/artist/${id}`,{headers:{"X-Custom-Header":user.id}}).then((res) => res.json());
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
          data ? data.coverImage : ""
        }')`,
      }}
    >
      <div className="coverImage">
        <h1>{data ? data.name : ""}</h1>
      </div>
      <DisplayCarusel>
        {data
          ? data.Albums.map((song) => (
              <Avatar
                title={song.name}
                id={song.id}
                artist={data.name}
                image={song.coverImage}
                type="album"
                quickAdd={quickAdd}
                quickPlay={quickPlay}
              />
            ))
          : ""}
      </DisplayCarusel>
      {data
        ? data.Songs.map((x) => (
            <SongListItem
              title={x.title}
              artist={data.name}
              album={x.Album.name}
              length={x.length}
              id={x.id}
              play={quickPlay}
              addToLine={quickAdd}
              addToPlaylist={addToPlaylist}
              liked={x.Interactions[0]?x.Interactions[0].isLiked:false}
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
