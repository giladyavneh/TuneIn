import React, { useRef, useState } from "react";
import "./SearchBar.css"
import SearchResult from "./searchResult";

function SearchBar({style,type,onChoose,clean}){
    const [searchResults, setSearchResults]=useState({})
    const [focused, setFocused]=useState(false)
    const inputRef=useRef()
    function showResults(query,types){
        let searchObj={}
        console.log(types)
        types.forEach(element => searchObj[element+'s']=query);
        let urlQuery=new URLSearchParams(searchObj)
        console.log(urlQuery.toString())
        fetch(`/search?${urlQuery}`).then(res=>res.json()).then(res=>setSearchResults(res))
    }
    function choose({title,image,artist,album,id,clicked,type}){
        clean?inputRef.current.value="":inputRef.current.value=title
        inputRef.current.blur()
        setFocused(false)
        onChoose({title,image,artist,album,id,clicked,type})
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
                    clicked={choose}/>
                )}</div>);
        })()}
    </div>
    return(
    <div className="SearchBar" style={style}>
        <input ref={inputRef} onBlur={()=>Object.keys(searchResults).length===0?setFocused(false):""} onFocus={()=>setFocused(true)} onChange={e=>showResults(e.target.value,type)}/>
        {focused?resultsDiv:""}
    </div>
    )
}

export default SearchBar;