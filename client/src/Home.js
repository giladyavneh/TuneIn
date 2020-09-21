import React, { useEffect, useState } from "react";
import TopBanner from "./TopBanner";
import DisplayCarusel from "./DisplayCarusel";
import Avatar from "./Avatar";
function Home({quickPlay,quickAdd}) {
  const [topSongs, setTopSongs] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topAlbums, setTopAlbums]= useState([])
  const [topPlaylists, setTopPlaylists]=useState([])
  useEffect(
    () =>{
    async function getData(){
      let topsongs= await fetch("/top_songs")
        .then((res) => res.json())
      setTopSongs(topsongs)}
      getData()
    },
    []
  );
  useEffect(
    () =>{
    async function getData(){
     let topartists=await fetch("/top_artists")
        .then((res) => res.json())
      setTopArtists(topartists)}
      getData()
    },
    []
  );
  useEffect(
    () =>{
    async function getData(){
      let topalbums= await fetch("/top_albums")
        .then((res) => res.json())
      setTopAlbums(topalbums)}
      getData()
    },
    []
  );
  useEffect(
    () =>{
    async function getData(){
     let topplaylists=await fetch("/top_playlists")
        .then((res) => res.json())
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
            artist={song.artist}
            image={song.album_image || song.artist_image}
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
            image={song.cover_image}
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
            artist={song.artist}
            image={song.album_image}
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
            artist={song.artist}
            image={song.cover_image}
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
