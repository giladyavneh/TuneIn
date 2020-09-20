import React, { useEffect, useState } from "react";
import "./App.css"
import Home from "./Home";
import MediaPlayer from "./MediaPlayer";
import ArtistPage from "./ArtistPage";
import PlayListPage from "./PlayListPage";
import {BrowserRouter, Switch, Route, Link, match} from "react-router-dom";
import NavBar from "./NavBar";
import AddContent from "./AddContent";
import NotFound from "./NotFound";
function App() {
  const [user,setUser]=useState({
    username:"gilad",
    id:"1",
    is_admin:"1"
  })
  const [playingNow, setPlayingNow] = useState();
  const [mediaPlays, setMediaPlays] = useState(false);
  useEffect(() => {if(playingNow)setMediaPlays(true)}, [playingNow]);

  async function quickAdd(id,type){
    let data=await fetch(`/song?${type}=${id}`).then(res=>res.json())
    let newSongs;
    if (playingNow){
      let titles=playingNow.map(song=>song.id)
      newSongs=data.filter(song=>!titles.includes(song.id))
    }
    setPlayingNow(playlist=>playlist?playlist.concat(newSongs):data)
  }
  async function quickPlay(id,type){
    let data=await fetch(`/song?${type}=${id}`).then(res=>res.json())
    setPlayingNow(data)
  }
  function likeIt(song_id){
    console.log(song_id)
  }

  return (
    <BrowserRouter>
    <NavBar user={user}/>
      <div>
        <Switch>
        <Route exact path="/">
          <Home quickAdd={quickAdd} quickPlay={quickPlay}/>
        </Route>
        <Route exact path="/artistpage/:id">
          <ArtistPage likeIt={likeIt} quickAdd={quickAdd} quickPlay={quickPlay}/>
        </Route>
        <Route exact path="/playlistpage/:type/:id">
          <PlayListPage likeIt={likeIt} quickAdd={quickAdd} quickPlay={quickPlay}/>
        </Route>
        <Route path="/addcontent" component={AddContent}/>
        <Route path="*" component={NotFound}/>
        </Switch>
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
