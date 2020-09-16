import React, { useEffect, useState } from "react";
import TopBanner from "./TopBanner";
import DisplayCarusel from "./DisplayCarusel";
import Avatar from "./Avatar";
function Home() {
  const [topSongs, setTopSongs] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topAlbums, setTopAlbums]= useState([])
  const [topPlaylists, setTopPlaylists]=useState([])
  useEffect(
    () =>
      fetch("/top_songs")
        .then((res) => res.json())
        .then((res) => setTopSongs(res)),
    []
  );
  useEffect(
    () =>
      fetch("/top_artists")
        .then((res) => res.json())
        .then((res) => setTopArtists(res)),
    []
  );
  useEffect(
    () =>
      fetch("/top_albums")
        .then((res) => res.json())
        .then((res) => setTopAlbums(res)),
    []
  );
  useEffect(
    () =>
      fetch("/top_playlists")
        .then((res) => res.json())
        .then((res) => setTopPlaylists(res)),
    []
  );

  return (
    <div style={{ background: "rgb(100,100,100)", minHeight: "100vh" }}>
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
          />
        ))}
      </DisplayCarusel>
      <h1>Top Playlists</h1>
      <DisplayCarusel>
      {topPlaylists.map((song) => (
          <Avatar
            title={song.name}
            id={song.id}
            image={song.cover_image}
            type="playlist"
          />
        ))}
      </DisplayCarusel>
    </div>
  );
}

export default Home;
