import React, { useEffect, useRef, useState } from "react";
import "./DisplayCarusel.css";

function DisplayCarusel(props){
    const [items, setItems]=useState()
    const kids=useRef([])
    useEffect(()=>{
        setItems(Array.isArray(props.children)?props.children.map(
            (x,i)=><div ref={el=>kids.current[i]=el}>{x}</div>):<div ref={el=>kids.current[0]=el}>{props.children}</div>)
        },[])
    function left(e){
        for(let i=0;i<props.children.length;i++){
            let papa=e.target.parentElement;
            let kido=kids.current[i];
            if(papa.scrollLeft-kido.offsetLeft<0){
                papa.scrollTo(kids.current[i-1]?kids.current[i-1].offsetLeft-10:0,0)
                return
            }
        }
    }
    function right(e){
        let papa=e.target.parentElement;
        for(let i=0;i<props.children.length;i++){
            let kido=kids.current[i];
            if(papa.scrollLeft+papa.clientWidth<kido.offsetLeft+kido.clientWidth){
                papa.scrollTo(kids.current[i].offsetLeft+kido.clientWidth-papa.clientWidth,0)
                return
            }
        }
        papa.scrollTo(papa.scrollWidth,0)
    }
    return(
        <div className="DisplayCarusel">
            <img src="https://www.flaticon.com/svg/static/icons/svg/271/271220.svg"
            onClick={left} className="left"/>
            {items}
            <img src="https://www.flaticon.com/svg/static/icons/svg/32/32213.svg" onClick={right} className="right"/>
        </div>
    )
}

export default DisplayCarusel;