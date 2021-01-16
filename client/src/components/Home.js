import React, { useEffect, useState } from "react";
import TopBanner from "./TopBanner";
import DisplayCarusel from "./DisplayCarusel";
import Avatar from "./Avatar";
import httpClient from "../services/httpClient";
function Home({quickPlay,quickAdd}) {
  const [topSongs, setTopSongs] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topAlbums, setTopAlbums]= useState([])
  const [topPlaylists, setTopPlaylists]=useState([])
  useEffect(
    () =>{
    async function getData(){
      let topsongs= await httpClient.get("/top_songs")
        .then((res) => res.data)
      setTopSongs(topsongs)}
      getData()
    },
    []
  );
  useEffect(
    () =>{
    async function getData(){
     let topartists=await httpClient.get("/top_artists")
        .then((res) => res.data)
      setTopArtists(topartists)}
      getData()
    },
    []
  );
  useEffect(
    () =>{
    async function getData(){
      let topalbums= await httpClient.get("/top_albums")
        .then((res) => res.data)
      setTopAlbums(topalbums)}
      getData()
    },
    []
  );
  useEffect(
    () =>{
    async function getData(){
     let topplaylists=await httpClient.get("/top_playlists")
        .then((res) => res.data)
      setTopPlaylists(topplaylists)}
      getData()
    },
    []
  );

  return (
    <div style={{ background: "rgb(60,60,60)", minHeight: "100vh"}}>
      <TopBanner />
      <h1>Top Songs</h1>
      <DisplayCarusel>
        {topSongs.map((song) => (
          <Avatar
            title={song.title}
            id={song.id}
            artist={song.Artist?song.Artist.name:""}
            image={song.Album.coverImage || song.Artist.coverImage}
            type="song"
            quickAdd={quickAdd}
            quickPlay={quickPlay}
          />
        ))}
      </DisplayCarusel>
      <h1>Top Artists</h1>
      <DisplayCarusel>
      {topArtists.map((song) => (
          <Avatar
            title={song.name}
            id={song.id}
            image={song.coverImage}
            type="artist"
            quickAdd={quickAdd}
            quickPlay={quickPlay}
          />
        ))}
      </DisplayCarusel>
      <h1>Top Albums</h1>
      <DisplayCarusel>
        {topAlbums.map((song) => (
          <Avatar
            title={song.name}
            id={song.id}
            artist={song.Artist.name}
            image={song.coverImage}
            type="album"
            quickAdd={quickAdd}
            quickPlay={quickPlay}
          />
        ))}
      </DisplayCarusel>
      <h1>Top Playlists</h1>
      <DisplayCarusel>
      {topPlaylists.map((song) => {
        console.log(song);
        return(
          <Avatar
            title={song.name}
            id={song.id}
            artist={song.Artist.name}
            image={song.coverImage}
            type="playlist"
            quickAdd={quickAdd}
            quickPlay={quickPlay}
          />
        )}
        )}
      </DisplayCarusel>
      <div id="filler"></div>
    </div>
  );
}

export default Home;
