import React, { useEffect, useReducer, useState } from "react";
import "./App.css"
import Home from "./Home";
import MediaPlayer from "./MediaPlayer";
import ArtistPage from "./ArtistPage";
import PlayListPage from "./PlayListPage";
import {BrowserRouter, Switch, Route, Link, match, useHistory} from "react-router-dom";
import NavBar from "./NavBar";
import AddContent from "./AddContent";
import NotFound from "./NotFound";
import Auth from "./AuthApi";
import LoginPage from "./LoginPage";
import SignIn from "./SignIn";
import SearchPage from "./SearchPage";


function App() {
  const [loggedIn,setLoggedIn]=useState()
  const [loading,setLoading]=useState(true)
  const [user,setUser]=useState({  })
  const History=useHistory()
  useEffect(()=>{
    if(loading){
      if(sessionStorage.getItem('idKey')!==null){
        console.log("session")
      autoConnect(sessionStorage.getItem('idKey'),sessionStorage.getItem('username'))
      }
      else if(localStorage.getItem('idKey')){
        console.log("loacl")
      autoConnect(localStorage.getItem('idKey'),localStorage.getItem('username'))
      }
      else setLoading(false)
    }
    
  },[])
  const [playingNow, setPlayingNow] = useState();
  const [mediaPlays, setMediaPlays] = useState(false);
  useEffect(() => {if(playingNow)setMediaPlays(true)}, [playingNow]);

  
  async function quickAdd(id,type){
    let data=await fetch(`/song?${type}=${id}`,{"headers":{'X-Custom-Header': String(user.id)}}).then(res=>res.json())
    let newSongs;
    if (playingNow){
      let titles=playingNow.map(song=>song.id)
      newSongs=data.filter(song=>!titles.includes(song.id))
    }
    setPlayingNow(playlist=>playlist?playlist.concat(newSongs):data)
  }
  
  async function quickPlay(id,type){
    let data=await fetch(`/song?${type}=${id}`,{"headers":{'X-Custom-Header': String(user.id)}}).then(res=>res.json())
    setPlayingNow(data)
  }
  
  function likeIt(song_id,type){
    console.log(song_id)
    let options={
      method:"PUT",
      body:JSON.stringify({isLiked:true}),
      headers:{
          'Content-Type':'application/json'
      }
  }
  fetch(`/interaction/${user.id}/${song_id}`, options)
  }

  async function autoConnect(idKey,username){
    let content = { username,idKey };
    let options = {
      method: "POST",
      body: JSON.stringify(content),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch("/connect",options).then(res=>res.json()).then(res=>{
      console.log(res)
      if(res.length===0){
        setLoggedIn(false)
        setUser({})
      }
      else{
        console.log('imlogged')
        setLoggedIn(true);
        setUser({id:res[0].id,email:res[0].email,username:res[0].username,is_admin:res[0].is_admin})
      }
    })
    setLoading(false)
  }

  function logout(){
    setUser({});
    setLoggedIn(false)
    sessionStorage.removeItem('idKey')
    sessionStorage.removeItem('username')
    localStorage.removeItem('idKey')
    localStorage.removeItem('username')
  }

  return (
    <BrowserRouter>
    <Auth.Provider value={{user,setUser}}>
      {loading?
      <div style={{ background: "rgb(60,60,60)", minHeight: "100vh"}}></div>:
      !loggedIn?
      <Switch>
        <Route path="/login">
          <LoginPage autoConnect={autoConnect}/>
        </Route>
        <Route path="/signup">
          <SignIn autoConnect={autoConnect}/>
        </Route>
        <Route path="/">
          <LoginPage autoConnect={autoConnect}/>
        </Route>
        </Switch>
      :<>
      <Switch>
      <Route exact path="/search">
          <SearchPage/>
      </Route>
      <Route path="/">
      <NavBar user={user} logout={logout}/>
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
      </Route>
      </Switch>
      </>
      }
    
      </Auth.Provider>
    </BrowserRouter>
  );
}

export default App;
