import React, { useRef, useState } from "react";
import "./SearchPage.css"
import SearchResult from "./searchResult";
function SearchPage(){
    const [searchResults, setSearchResults]=useState({songs:[],albums:[],artists:[]})
    const searchInput=useRef()

    function search({value}){
        fetch("/elastic/all?q="+value).then(res=>res.json()).then(res=>setSearchResults(res))
    }

    function renderResults(){
        let options=["songs", "artists", "albums"]
        let results=[]
        for (let index of options){
            console.log(index)
            results.push(<h1>{index}</h1>)
            results=results.concat(searchResults[index].map(result=><SearchResult title={index==="songs"?result.title:result.name} image="" artist="" album="" id={result.index} clicked={()=>{}} type={index}/>))
        }
        return results
    }

    return(
        <div className="SearchPage">
            <input className="searchBar" onChange={({target})=>search(target)} ref={searchInput}/>
            {renderResults()}
        </div>
    )
}

export default SearchPage;