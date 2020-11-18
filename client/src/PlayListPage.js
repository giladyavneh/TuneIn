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
      let data = await fetch(`/${type}/${id}`,{
        headers: { "X-Custom-Header": String(user.id) },
      }).then((res) => res.json());
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
          data ? data.coverImage?data.coverImage:data.Artist?data.Artist.coverImage:"":""
        }')`,
      }}
    >
      <div className="coverImage" style={{ minHeight: "40vh" }}>
        <h1>{data ? data.name? data.name: data.title?data.title : "":""}</h1>
        <h2>{data ? data.Artist?data.Artist.name||data.Artist.username : "":""}</h2>
      </div>
      {data
        ? data.Songs?data.Songs.map((x) => (
            <SongListItem
              title={x.title}
              artist={x.Artist.name}
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
        : 
          <SongListItem
            title={data.title}
            artist={data.Artist.name}
            album={data.Album.name}
            length={data.length}
            id={data.id}
            play={quickPlay}
            addToLine={quickAdd}
            addToPlaylist={addToPlaylist}
            liked={data.Interactions[0]?data.Interactions[0].isLiked:false}
            likeIt={likeIt}
          />
        :""}
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
