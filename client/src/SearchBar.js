import React, { useState } from "react";
import "./SearchBar.css"
import SearchResult from "./searchResult";

function SearchBar({style,type,onChoose}){
    const [searchResults, setSearchResults]=useState({})
    const [focused, setFocused]=useState(false)
    function showResults(query,types){
        let searchObj={}
        console.log(types)
        types.forEach(element => searchObj[element+'s']=query);
        let urlQuery=new URLSearchParams(searchObj)
        console.log(urlQuery.toString())
        fetch(`/search?${urlQuery}`).then(res=>res.json()).then(res=>setSearchResults(res))
    }
    let resultsDiv=<div className="resultsTab">
        {Object.keys(searchResults).length===0?
        'no results found':
        (()=>{
            let arr=[];
            for(let catagory in searchResults){
                arr.push(catagory)
            }
            return arr.map(x=><div>
                <div>{`${x}s`}</div>
                {
                searchResults[x].map(title=>
                    <SearchResult title={title.title}
                    image={title.image||title.artist_image||""}
                    artist={title.artist||""}
                    album={title.album||""}
                    id={title.id}
                    type={x}
                    clicked={onChoose}/>
                )}</div>);
        })()}
    </div>
    return(
    <div className="SearchBar" style={style}>
        <input onBlur={()=>Object.keys(searchResults).length===0?setFocused(false):""} onFocus={()=>setFocused(true)} onChange={e=>showResults(e.target.value,type)}/>
        {focused?resultsDiv:""}
    </div>
    )
}

export default SearchBar;