import React from "react";
import "./SearchResult.css"

function SearchResult({title,image,artist,album,id,clicked,type}){
    return(
        <div className="SearchResult" onClick={()=>clicked({title,image,artist,album,id,clicked,type})}>
            <div className="littleImage">
                <img src={image}/>
            </div>
            <div className="info">
                <div className="title">
                    {title}
                </div>
                <div className="info">
                    {artist}{album!==""?`|${album}`:""}
                </div>
            </div>
        </div>
    )
}

export default SearchResult;