const mysql = require("mysql");
const express = require("express");
const app = express();

app.use(express.json())

const DataBase = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "giladyavneh",
  database: "tunein",
});
DataBase.connect((err, res) => {
  if (err) throw err;
  console.log("DataBase connected...");
});

app.get("/top_songs", (req, response) => {
  let sql = "SELECT * FROM songs LIMIT 20";
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

module.exports = app;
