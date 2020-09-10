const mysql = require("mysql");
const express = require("express");
const cors=require("cors")
const app = express();
require('dotenv').config()

app.use(express.json())
app.use(cors())

console.log(process.env.SQL_CREDENTIALS)
const DataBase = mysql.createConnection(JSON.parse(process.env.SQL_CREDENTIALS))
DataBase.connect((err, res) => {
  if (err) throw err;
  console.log("DataBase connected...");
});

app.get("/top_songs", (req, response) => {
  let sql = `SELECT songs.title AS title,
  artists.name AS artist,
  albums.name AS album,
  songs.length AS length,
  songs.youtube_link AS link
  FROM songs
  JOIN artists ON artists.id=songs.artist_id
  JOIN albums ON songs.album_id=albums.id
  LIMIT 20`;
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(res);
  });
});

app.get("/top_artists", (req, response) => {
  let sql = "SELECT * FROM artists LIMIT 20";
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(res);
  });
});

app.get("/top_albums", (req, response) => {
  let sql = "SELECT * FROM albums LIMIT 20";
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(res);
  });
});

app.get("/top_playlists", (req, response) => {
  let sql = "SELECT * FROM playlists LIMIT 20";
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(res);
  });
});

app.get("/song/:title", (req, response) => {
  let sql = `SELECT * FROM songs WHERE title LIKE '${req.params.title}'`;
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(
      res.length > 0 ? res : "We couldn't find the song you were looking for"
    );
  });
});

app.get("/album/:name", (req, response) => {
  let sql = `SELECT * FROM albums WHERE name LIKE '${req.params.name}'`;
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(
      res.length > 0 ? res : "We couldn't find the album you were looking for"
    );
  });
});

app.get("/artist/:name", (req, response) => {
  let sql = `SELECT * FROM artists WHERE name LIKE '${req.params.name}'`;
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(
      res.length > 0 ? res : "We couldn't find the artist you were looking for"
    );
  });
});

app.get("/playlist/:name", (req, response) => {
  let sql = `SELECT * FROM playlists WHERE title LIKE '${req.params.name}'`;
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(
      res.length > 0
        ? res
        : "We couldn't find the playlist you were looking for"
    );
  });
});

app.post("/artist", (req,response)=>{
    let sql="INSERT INTO artists SET ?"
    DataBase.query(sql,req.body,(err,res)=>{
        if (err) throw err;
        response.send(res)
    })
})

app.post("/album", (req,response)=>{
  let sql="INSERT INTO albums SET ?"
  DataBase.query(sql,req.body,(err,res)=>{
      if (err) throw err;
      response.send(res)
  })
})

app.post("/song", (req,response)=>{
  let sql="INSERT INTO albums SET ?"
  DataBase.query(sql,req.body,(err,res)=>{
      if (err) throw err;
      response.send(res)
  })
})

app.post("/playlist", (req,response)=>{
  let sql="INSERT INTO playlists SET ?"
  DataBase.query(sql,req.body,(err,res)=>{
      if (err) throw err;
      response.send(res)
  })
})

app.put("/album/:id",(req,response)=>{
  let sql=`UPDATE albums SET ? WHERE id=${req.params.id}`
  DataBase.query(sql,req.body,(err,res)=>{
    if (err) throw err;
    response.send(res.affectedRows>0?res:"We couldn't find the album you were looking for")
  })
})

app.put("/song/:id",(req,response)=>{
  let sql=`UPDATE songs SET ? WHERE id=${req.params.id}`
  DataBase.query(sql,req.body,(err,res)=>{
    if (err) throw err;
    response.send(res.affectedRows>0?res:"We couldn't find the song you were looking for")
  })
})

app.put("/artist/:id",(req,response)=>{
  let sql=`UPDATE artists SET ? WHERE id=${req.params.id}`
  DataBase.query(sql,req.body,(err,res)=>{
    if (err) throw err;
    response.send(res.affectedRows>0?res:"We couldn't find the artist you were looking for")
  })
})

app.put("/playlist/:id",(req,response)=>{
  let sql=`UPDATE playlists SET ? WHERE id=${req.params.id}`
  DataBase.query(sql,req.body,(err,res)=>{
    if (err) throw err;
    response.send(res.affectedRows>0?res:"We couldn't find the playlist you were looking for")
  })
})

app.delete("/artist/:id",(req,response)=>{
  let sql=`DELETE FROM artists WHERE id=${req.params.id}`
  DataBase.query(sql,(err,res)=>{
    if (err) throw err;
    response.send(res.affectedRows>0?res:"We couldn't find the artist you were looking for")
  })
})

app.delete("/playlist/:id",(req,response)=>{
  let sql=`DELETE FROM playlists WHERE id=${req.params.id}`
  DataBase.query(sql,(err,res)=>{
    if (err) throw err;
    response.send(res.affectedRows>0?res:"We couldn't find the playlist you were looking for")
  })
})

app.delete("/song/:id",(req,response)=>{
  let sql=`DELETE FROM songs WHERE id=${req.params.id}`
  DataBase.query(sql,(err,res)=>{
    if (err) throw err;
    response.send(res.affectedRows>0?res:"We couldn't find the song you were looking for")
  })
})

app.delete("/album/:id",(req,response)=>{
  let sql=`DELETE FROM albums WHERE id=${req.params.id}`
  DataBase.query(sql,(err,res)=>{
    if (err) throw err;
    response.send(res.affectedRows>0?res:"We couldn't find the album you were looking for")
  })
})

module.exports = app;
