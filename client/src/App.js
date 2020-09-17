import React, { useEffect, useState } from "react";
import Home from "./Home";
import MediaPlayer from "./MediaPlayer";
function App() {
  const [playingNow, setPlayingNow] = useState();
  const [mediaPlays, setMediaPlays] = useState(false);
  useEffect(() => {if(playingNow)setMediaPlays(true)}, [playingNow]);

  async function quickAdd(id,type){
    let data=await fetch(`/${type}/${id}`).then(res=>res.json())
    setPlayingNow(playlist=>playlist?playlist.concat(data):data)
  }
  async function quickPlay(id,type){
    let data=await fetch(`/${type}/${id}`).then(res=>res.json())
    setPlayingNow(data)
  }

  return (
    <div>
      <Home quickAdd={quickAdd} quickPlay={quickPlay}/>
      {mediaPlays ? (
        <MediaPlayer
          songs={playingNow}
          closePlayer={() => setMediaPlays(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
