import React from "react";
import "./SearchBar.css"

function SearchBar(style){
    console.log(style)
    return(
    <div className="SearchBar" style={style.style}>
        <input/>
    </div>
    )
}

export default SearchBar;