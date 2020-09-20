const mysql = require("mysql");
const express = require("express");
const cors=require("cors")
const app = express();
require('dotenv').config()

app.use(express.json())
app.use(cors())

const DataBase = mysql.createConnection(JSON.parse(process.env.SQL_CREDENTIALS))
DataBase.connect((err, res) => {
  if (err) throw err;
  console.log("DataBase connected...");
});

const sqlPromise=(sqlQuery)=>{
  return new Promise((resolve,reject)=>{
    DataBase.query(sqlQuery,(err,res)=>{
      if (err) reject(err)
      resolve(res)
    })
  })
}

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
  let sql = `SELECT albums.name as name,
  albums.cover_image as album_image,
  albums.id as id,
  artists.name as artist
  FROM albums
  JOIN artists ON artists.id=albums.artist_id
  LIMIT 20`;
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

app.get("/song",(req,response)=>{
  let field=Object.keys(req.query)[0]
  let id=Object.values(req.query)[0];
  let sql=`SELECT songs.title AS title,
  songs.id as id,
  albums.cover_image as album_image,
  artists.cover_image as artist_image,
  artists.name AS artist,
  albums.name AS album,
  songs.length AS length,
  songs.youtube_link AS link
  FROM songs
  JOIN artists ON artists.id=songs.artist_id
  JOIN albums ON songs.album_id=albums.id
  ${field==="playlist"?
  `JOIN songs_in_playlist ON songs.id=songs_in_playlist.song_id
  JOIN playlists ON songs_in_playlist.playlist_id=playlists.id`:""}
  WHERE ${field}s.id = '${id}'
  ${field==='album'?'ORDER BY songs.track_number':""}`;
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(
      res.length > 0 ? res : "We couldn't find the song you were looking for"
    );
  });
})

app.get("/song/:id", (req, response) => {
  let sql = `SELECT songs.title AS title,
  songs.id as id,
  albums.cover_image as album_image,
  artists.cover_image as artist_image,
  artists.name AS artist,
  albums.name AS album,
  songs.length AS length,
  songs.youtube_link AS link
  FROM songs
  JOIN artists ON artists.id=songs.artist_id
  JOIN albums ON songs.album_id=albums.id
  WHERE songs.id = '${req.params.id}'`;
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(
      res.length > 0 ? res : "We couldn't find the song you were looking for"
    );
  });
});

app.get("/album/:id", (req, response) => {
  let sql = `SELECT albums.name AS title,
  albums.id as id,
  albums.cover_image as image,
  artists.cover_image as artist_image,
  artists.name AS artist
  FROM albums
  JOIN artists ON artists.id=albums.artist_id
  WHERE albums.id = '${req.params.id}'`;
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(
      res.length > 0 ? res : "We couldn't find the album you were looking for"
    );
  });
});

app.get("/artist/:id", (req, response) => {
  let sql = `SELECT artists.name AS title,
  artists.id as id,
  albums.id as album_id,
  albums.cover_image as album_image,
  artists.cover_image as artist_image,
  albums.name AS album
  FROM artists
  LEFT JOIN albums ON artists.id=albums.artist_id
  WHERE artists.id = '${req.params.id}'`;
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(
      res.length > 0 ? res : {"res":"We couldn't find the artist you were looking for"}
    );
  });
});

app.get("/playlist/:id", (req, response) => {
  let sql = `SELECT playlists.name AS title,
  playlists.id as id,
  playlists.cover_image as image
  FROM playlists
  WHERE playlists.id = '${req.params.id}'`;
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(
      res.length > 0
        ? res
        : "We couldn't find the playlist you were looking for"
    );
  });
});

app.get(`/search`,(req, response)=>{
   let {songs,artists,albums,playlists}=req.query;
   let promises=[]
     if (songs){
       promises.push(sqlPromise(`SELECT songs.title as title,
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
      )
     }
  if (artists){
    promises.push(sqlPromise(`SELECT artists.name as title,
    'artist' as type,
    artists.id as id,
    artists.cover_image as image
    FROM artists
    WHERE artists.name LIKE '${artists}%%'`)
    )
  }
  if (albums){
    promises.push(sqlPromise(`SELECT albums.name as title,
    'album' as type,
    albums.id as id,
    albums.cover_image as image,
    artists.name as artist,
    artists.cover_image as artist_image
    FROM albums
    JOIN artists ON albums.artist_id=artists.id
    WHERE albums.name LIKE '${albums}%%'`)
    )
  }
  if (playlists){
    promises.push(sqlPromise(`SELECT playlists.name as title,
    'playlist' as type,
    playlists.id as id,
    playlists.cover_image as image
    FROM playlists
    WHERE playlists.name LIKE '${playlists}%%'`)
    )
  }
Promise.all(promises).then(resolved=>{
  let result={};
  resolved.forEach(arr=>{
    if (arr.length>0){
      result[arr[0].type]=arr
    }
  })
  response.send(result)
})

})

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
  let sql="INSERT INTO songs SET ?"
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

app.post("/interaction/:user_id/:song_id",async (req,response)=>{
  DataBase.query(`UPDATE user_song_interaction
  SET is_liked=true
  WHERE user_id=1
  AND song_id=1`,(err,res)=>{
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
