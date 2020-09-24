console.log("start app")
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const bcrypt=require("bcrypt")

const DataBase=require("./DataBase")
console.log("finish impoorts")
const songs=require("./routes/songs")
const artists=require("./routes/artists.js")
const albums=require("./routes/albums")
const playlists=require("./routes/playlists")

app.use(express.json());
app.use(cors());
app.use("/song",songs);
app.use("/artist", artists);
app.use("/album", albums);
app.use("/playlist", playlists)

const sqlPromise = (sqlQuery) => {
  return new Promise((resolve, reject) => {
    DataBase.query(sqlQuery, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

app.get("/top_songs", (req, response) => {
  let sql = `SELECT songs.title AS title,
  songs.id as id,
  albums.cover_image as album_image,
  artists.cover_image as artist_image,
  artists.name AS artist,
  albums.name AS album,
  songs.length AS length,
  songs.youtube_link AS link
  FROM songs
  LEFT JOIN artists ON artists.id=songs.artist_id
  LEFT JOIN albums ON songs.album_id=albums.id
  LEFT JOIN (SELECT song_id, SUM(is_liked) AS likes, SUM(play_count) AS plays
  FROM user_song_interaction GROUP BY song_id) AS interactions
  ON interactions.song_id=songs.id
  ORDER BY interactions.likes DESC, interactions.plays DESC
  LIMIT 20`;
  DataBase.query(sql, (err, res) => {
    if (err) return response.status(500);
    response.send(res);
  });
});

app.get("/top_artists", (req, response) => {
  let sql = "SELECT * FROM artists LIMIT 20";
  DataBase.query(sql, (err, res) => {
    if (err) return response.status(500);
    response.send(res);
  });
});

app.get("/top_albums", (req, response) => {
  let sql = `SELECT albums.name as name,
  albums.cover_image as album_image,
  albums.id as id,
  artists.name as artist
  FROM albums
  JOIN artists ON artists.id=albums.artist_id
  LIMIT 20`;
  DataBase.query(sql, (err, res) => {
    if (err) return response.status(500);
    response.send(res);
  });
});

app.get("/top_playlists", (req, response) => {
  let sql = `SELECT playlists.name AS name,
  playlists.id as id,
  playlists.cover_image as cover_image,
  users.username as artist
  FROM playlists
  LEFT JOIN users_playlist
  ON playlists.id=users_playlist.playlist_id
  LEFT JOIN users
  ON users.id=users_playlist.user_id
  LIMIT 20`;
  DataBase.query(sql, (err, res) => {
    if (err) return response.status(500);
    response.send(res);
  });
});

app.get(`/search`, (req, response) => {
  let { songs, artists, albums, playlists } = req.query;
  let promises = [];
  if (songs) {
    promises.push(
      sqlPromise(`SELECT songs.title as title,
            songs.id as id,
            'song' as type,
            artists.name as artist,
            albums.name as album,
            albums.cover_image as image,
            artists.cover_image as artist_image
            FROM songs
            JOIN artists ON songs.artist_id=artists.id
            JOIN albums ON songs.album_id=albums.id
            WHERE songs.title LIKE '${songs}%%'`)
    );
  }
  if (artists) {
    promises.push(
      sqlPromise(`SELECT artists.name as title,
    'artist' as type,
    artists.id as id,
    artists.cover_image as image
    FROM artists
    WHERE artists.name LIKE '${artists}%%'`)
    );
  }
  if (albums) {
    promises.push(
      sqlPromise(`SELECT albums.name as title,
    'album' as type,
    albums.id as id,
    albums.cover_image as image,
    artists.name as artist,
    artists.cover_image as artist_image
    FROM albums
    JOIN artists ON albums.artist_id=artists.id
    WHERE albums.name LIKE '${albums}%%'`)
    );
  }
  if (playlists) {
    promises.push(
      sqlPromise(`SELECT playlists.name as title,
    'playlist' as type,
    playlists.id as id,
    playlists.cover_image as image
    FROM playlists
    WHERE playlists.name LIKE '${playlists}%%'`)
    );
  }
  Promise.all(promises).then((resolved) => {
    let result = {};
    resolved.forEach((arr) => {
      if (arr.length > 0) {
        result[arr[0].type] = arr;
      }
    });
    response.send(result);
  });
});

app.post("/signin", (req, response)=>{
  req.body.password=bcrypt.hashSync(req.body.password,10)
  let sql="INSERT INTO users SET ?";
  DataBase.query(sql,req.body, (err,res)=>{
    if (err) return response.status(400).send(err);
    response.send({idKey:bcrypt.hashSync(req.body.password,10),username:req.body.username})
  })
})

app.post("/login",(req,response)=>{
  let sql=`SELECT * FROM users WHERE username='${req.body.username}'`
  DataBase.query(sql,(err,res)=>{
    if (err) return response.status(500);
    if (res.length===0) return response.status(400).send({massage:"Wrong user name"})
    return !bcrypt.compareSync(req.body.password,res[0].password)?
    response.status(401).send({massage:"Wrong password"}):
    response.send({idKey:bcrypt.hashSync(res[0].password,10),username:res[0].username})
  })
})

app.post("/connect",(req,response)=>{
  let sql=`SELECT * FROM users WHERE username='${req.body.username}'`
  DataBase.query(sql,(err,res)=>{
    if (err||res.length===0) return response.status(500).send([]);
    return response.send(bcrypt.compareSync(res[0].password,req.body.idKey)?
    res:[])
  })
})

app.put("/interaction/:user_id/:song_id", async (req, response) => {
  let updateSql = `UPDATE user_song_interaction
  SET ${req.body.is_liked?`is_liked=NOT is_liked`:req.body.play_count?`play_count=play_count+1`:""}
  WHERE user_id=${req.params.user_id}
  AND song_id=${req.params.song_id}`;
  let insertSql=`INSERT INTO user_song_interaction SET ?`
  DataBase.query(updateSql, (err, res) => {
    if (err) return response.status(500);
    
    if (res.affectedRows === 0) {
      let initial_values={}
      Object.keys(req.body).forEach(key=>initial_values[key]=1)
      
      DataBase.query(insertSql,{...req.params,...initial_values},(err,re)=>{
        if (err) return response.status(500);
        response.send(re)
      })
    }
    else response.send(res)
  });
});
console.log("finish app")
module.exports = app;
