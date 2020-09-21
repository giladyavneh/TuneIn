import React from "react";
import "./NavBar.css";
import {Link, Redirect, useHistory} from "react-router-dom";
import SearchBar from "./SearchBar";

function NavBar({user,logout}){
    const History=useHistory()
    function redirecting({id,type}){
        History.location.pathname='/'
        History.push(`${type==='artist'?'artistpage':`playlistpage/${type}`}/${id}`)
    }
    return(
        <div className="NavBar">
            <div className="login">
                Hello {`${user.username}`||`guest`}<br/>
                <button className="logoutButton" onClick={logout}>Logout</button>
                
            </div>
            <Link to="/">
            <div className="navButton homePage">
                <img src="https://www.flaticon.com/svg/static/icons/svg/846/846551.svg"/>
            </div>
            </Link>
            <div className="navButton librarys">
                <img src="https://www.flaticon.com/svg/static/icons/svg/1262/1262120.svg"/>
            </div>
            <Link to="/addContent">
            <div className="navButton add">
            <img src="https://www.flaticon.com/svg/static/icons/svg/565/565264.svg"/>
            </div>
            </Link>
            <SearchBar clean={true} onChoose={redirecting} type={["song","artist","album","playlist"]} style={{height:"15px", width:"180px", margin:"0px 10px"}}/>
        </div>
    )
}

export default NavBar;