const mysql=require("mysql")
const express=require("express")
const app=express()

const DataBase=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"giladyavneh",
    database:"tunein"
})
DataBase.connect((err,res)=>{
    if (err) throw err;
    console.log("DataBase connected...")
})

app.get("/top_songs",(req,response)=>{
    let sql="SELECT * FROM songs LIMIT 20"
    DataBase.query(sql,(err,res)=>{
        if (err) throw err;
        response.send(res)
    })
})

app.get("/top_artists",(req,response)=>{
    let sql="SELECT * FROM artists LIMIT 20"
    DataBase.query(sql,(err,res)=>{
        if (err) throw err;
        response.send(res)
    })
})

app.get("/top_albums",(req,response)=>{
    let sql="SELECT * FROM albums LIMIT 20"
    DataBase.query(sql,(err,res)=>{
        if (err) throw err;
        response.send(res)
    })
})

app.get("/top_playlists",(req,response)=>{
    let sql="SELECT * FROM playlists LIMIT 20"
    DataBase.query(sql,(err,res)=>{
        if (err) throw err;
        response.send(res)
    })
})

app.get("/song/:title",(req,response)=>{
    let sql=`SELECT * FROM songs WHERE title LIKE '${req.params.title}'`
    DataBase.query(sql,(err,res)=>{
        if (err) throw err;
        response.send(res.length>0?res:"We couldn't find the song you were looking for")
    })
})

module.exports=app