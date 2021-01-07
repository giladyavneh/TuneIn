import React from "react";
import "./Controller.css";

function Controller({backward, stop, pausePlay, forward, next, playing, previous, opener}){
    return(
        <div className="Controller">
            <button className="previous" onClick={previous}><img src="https://www.flaticon.com/svg/static/icons/svg/157/157910.svg"></img></button>
            <button className="backward" onClick={backward}><img  src="https://www.flaticon.com/svg/static/icons/svg/39/39400.svg"></img></button>
            <button className="stop" onClick={stop}><img src="https://www.flaticon.com/premium-icon/icons/svg/2920/2920709.svg"></img></button>
            <button className="play" onClick={pausePlay}><img src={playing?"https://www.flaticon.com/svg/static/icons/svg/1214/1214679.svg":"https://www.flaticon.com/svg/static/icons/svg/727/727245.svg"}></img></button>
            <button className="forward" onClick={forward}><img src="https://www.flaticon.com/svg/static/icons/svg/860/860754.svg"></img></button>
            <button className="next" onClick={next}><img src="https://www.flaticon.com/svg/static/icons/svg/157/157924.svg"></img></button>
            <span id="opener" onClick={opener}>^</span>
        </div>
    )
}

export default Controller;