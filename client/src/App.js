import React, { useEffect, useState } from "react";
import "./App.css"
import Home from "./Home";
import MediaPlayer from "./MediaPlayer";
import ArtistPage from "./ArtistPage";
import PlayListPage from "./PlayListPage";
import {BrowserRouter, Switch, Route, Link, match} from "react-router-dom";
import NavBar from "./NavBar";
function App() {
  const [playingNow, setPlayingNow] = useState();
  const [mediaPlays, setMediaPlays] = useState(false);
  useEffect(() => {if(playingNow)setMediaPlays(true)}, [playingNow]);

  async function quickAdd(id,type){
    let data=await fetch(`/song?${type}=${id}`).then(res=>res.json())
    setPlayingNow(playlist=>playlist?playlist.concat(data):data)
  }
  async function quickPlay(id,type){
    let data=await fetch(`/song?${type}=${id}`).then(res=>res.json())
    setPlayingNow(data)
  }

  return (
    <BrowserRouter>
    <NavBar/>
      <div>
        <Route exact path="/">
          <Home quickAdd={quickAdd} quickPlay={quickPlay}/>
        </Route>
        <Route path="/artistpage/:id">
          <ArtistPage quickAdd={quickAdd} quickPlay={quickPlay}/>
        </Route>
        <Route path="/playlistpage/:type/:id">
          <PlayListPage quickAdd={quickAdd} quickPlay={quickPlay}/>
        </Route>
        {mediaPlays ? (
          <MediaPlayer
            songs={playingNow}
            closePlayer={() => setMediaPlays(false)}
          />
        ) : (
          ""
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
