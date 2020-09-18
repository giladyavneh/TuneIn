import React from "react";
import "./NavBar.css";
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar";

function NavBar(){
    function serchResults(e){
        console.log(e.target.value)
    }
    return(
        <div className="NavBar">
            <div className="login">
                hello user
            </div>
            <Link to="/">
            <div className="navButton homePage">
                <img src="https://www.flaticon.com/svg/static/icons/svg/846/846551.svg"/>
            </div>
            </Link>
            <div className="navButton librarys">
                <img src="https://www.flaticon.com/svg/static/icons/svg/1262/1262120.svg"/>
            </div>
            <div className="navButton add">
            <img src="https://www.flaticon.com/svg/static/icons/svg/565/565264.svg"/>
            </div>
            <SearchBar style={{height:"10px"}}/>
        </div>
    )
}

export default NavBar;