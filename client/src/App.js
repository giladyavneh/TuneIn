import React, { useEffect, useReducer, useState } from "react";
import "./App.css"
import Home from "./components/Home";
import MediaPlayer from "./components/MediaPlayer";
import ArtistPage from "./components/ArtistPage";
import PlayListPage from "./components/PlayListPage";
import {BrowserRouter, Switch, Route, Link, match, useHistory} from "react-router-dom";
import NavBar from "./components/NavBar";
import AddContent from "./components/AddContent";
import NotFound from "./components/NotFound";
import Auth from "./AuthApi";
import LoginPage from "./components/LoginPage";
import SignIn from "./components/SignIn";
import jwt from "jsonwebtoken";
import httpClient from "./services/httpClient";


function App() {
  const [loggedIn,setLoggedIn]=useState()
  const [loading,setLoading]=useState(true)
  const [user,setUser]=useState({  })
  useEffect(()=>{
    if(loading){
      if(sessionStorage.getItem('access_token')!==null){
        console.log("session")
        autoConnect(sessionStorage.getItem('access_token'))
      }
      else if(localStorage.getItem('access_token')){
        console.log("loacl")
      sessionStorage.setItem('access_token', localStorage.getItem('access_token'))
      sessionStorage.setItem('refresh_token', localStorage.getItem('refresh_token'))
      autoConnect(localStorage.getItem('access_token'))
      }
      else setLoading(false)
    }
    
  },[])
  useEffect(()=>console.log(user),[user])
  const [playingNow, setPlayingNow] = useState();
  const [mediaPlays, setMediaPlays] = useState(false);
  useEffect(() => {if(playingNow)setMediaPlays(true)}, [playingNow]);

  
  async function quickAdd(id,type){
    let {data}=await httpClient.get(`/song?${type}=${id}`)
    let newSongs;
    if (playingNow){
      let titles=playingNow.map(song=>song.id)
      newSongs=data.filter(song=>!titles.includes(song.id))
    }
    setPlayingNow(playlist=>playlist?playlist.concat(newSongs):data)
  }
  
  async function quickPlay(id,type){
    let {data}=await httpClient.get(`/song?${type}=${id}`)
    setPlayingNow(data)
  }
  
  function likeIt(song_id,type){
    console.log(song_id)
    let options={
      // method:"PUT",
      
      headers:{
          'Content-Type':'application/json'
      }
  }
  httpClient.put(`/interaction/${user.id}/${song_id}`,{isLiked:true}, options)
  }

async function autoConnect(token){
    try{
      const res = jwt.decode(token)
      console.log('imlogged')
      setLoggedIn(true);
      setUser({id:res.id,email:res.email,username:res.username,is_admin:res.is_admin})
    }
    catch{
      setLoggedIn(false)
      setUser({})
    }
    setLoading(false)
  }

  function logout(){
    setUser({});
    setLoggedIn(false)
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('refresh_token')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
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
      </>
      }
    
      </Auth.Provider>
    </BrowserRouter>
  );
}

export default App;
