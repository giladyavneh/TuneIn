const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const bcrypt=require("bcrypt")

app.use(express.json());
app.use(cors());


const DataBase = mysql.createConnection(
  JSON.parse(process.env.SQL_CREDENTIALS)
);
DataBase.connect((err, res) => {
  if (err) throw err;
  console.log("DataBase connected...");
});

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
    if (err) throw err;
    response.send(res);
  });
});

app.get("/song", (req, response) => {
  let field = Object.keys(req.query)[0];
  let id = Object.values(req.query)[0];
  let sql = `SELECT songs.title AS title,
  songs.id as id,
  albums.cover_image as album_image,
  artists.cover_image as artist_image,
  artists.name AS artist,
  albums.name AS album,
  songs.length AS length,
  songs.youtube_link AS link,
  user_song_interaction.is_liked AS liked
  FROM songs
  JOIN artists ON artists.id=songs.artist_id
  JOIN albums ON songs.album_id=albums.id
  ${
    field === "playlist"
      ? `JOIN songs_in_playlist ON songs.id=songs_in_playlist.song_id
  JOIN playlists ON songs_in_playlist.playlist_id=playlists.id`
      : ""
  }
  LEFT JOIN user_song_interaction ON user_song_interaction.user_id=${req.headers['x-custom-header']}
  AND user_song_interaction.song_id=songs.id
  WHERE ${field}s.id = '${id}'
  ${field === "album" ? "ORDER BY songs.track_number" : ""}`;
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(
      res.length > 0 ? res : "We couldn't find the song you were looking for"
    );
  });
});

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
      res.length > 0
        ? res
        : { res: "We couldn't find the artist you were looking for" }
    );
  });
});

app.get("/playlist/:id", (req, response) => {
  let sql = `SELECT playlists.name AS title,
  playlists.id as id,
  playlists.cover_image as image,
  users.username as artist
  FROM playlists
  LEFT JOIN users_playlist
  ON playlists.id=users_playlist.playlist_id
  LEFT JOIN users
  ON users.id=users_playlist.user_id
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

app.get("/playlist", (req,response)=>{
  let sql=`SELECT playlists.name as name,
  playlists.id as id
  FROM playlists
  JOIN users_playlist
  ON playlists.id=users_playlist.playlist_id
  WHERE users_playlist.user_id='${req.query.user_id}'`
  DataBase.query(sql, (err,res)=>{
    if (err) throw err;
    console.log(res)
    response.send(res)
  })
})

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

app.post("/artist", (req, response) => {
  let sql = "INSERT INTO artists SET ?";
  DataBase.query(sql, req.body, (err, res) => {
    if (err) throw err;
    response.send(res);
  });
});

app.post("/album", (req, response) => {
  let sql = "INSERT INTO albums SET ?";
  DataBase.query(sql, req.body, (err, res) => {
    if (err) throw err;
    response.send(res);
  });
});

app.post("/song", (req, response) => {
  let sql = "INSERT INTO songs SET ?";
  DataBase.query(sql, req.body, (err, res) => {
    if (err) throw err;
    response.send(res);
  });
});

app.post("/playlist", (req, response) => {
  let sql = `INSERT INTO playlists SET name='${req.body.name}',
  cover_image='${req.body.cover_image}'`;
  DataBase.query(sql, req.body, (err, res) => {
    if (err) throw err;
    DataBase.query(`INSERT INTO users_playlist SET
    user_id='${req.body.user_id}',
    playlist_id='${res.insertId}'`)
    if (req.body.songs.length>0){
      let sql=`INSERT INTO songs_in_playlist
      (song_id,playlist_id) VALUES `
      let values=req.body.songs.map(song=>`(${song.id},${res.insertId})`)
      DataBase.query(sql+values.join(),(err,res)=>{
        if (err) throw err;
      })
    }
    response.send(res);
  });
});

app.post("/playlist/:playlist_id/:song_id",(req,response)=>{
  let sql=`INSERT INTO songs_in_playlist SET ?`
  DataBase.query(sql,req.params,(err,res)=>{
    if (err) throw err;
    response.send(res)
  })
})

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
    if (err) throw err;
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
    if (err) throw err;
    
    if (res.affectedRows === 0) {
      let initial_values={}
      Object.keys(req.body).forEach(key=>initial_values[key]=1)
      
      DataBase.query(insertSql,{...req.params,...initial_values},(err,re)=>{
        if (err) throw err;
        response.send(re)
      })
    }
    else response.send(res)
  });
});

app.put("/album/:id", (req, response) => {
  let sql = `UPDATE albums SET ? WHERE id=${req.params.id}`;
  DataBase.query(sql, req.body, (err, res) => {
    if (err) throw err;
    response.send(
      res.affectedRows > 0
        ? res
        : "We couldn't find the album you were looking for"
    );
  });
});

app.put("/song/:id", (req, response) => {
  let sql = `UPDATE songs SET ? WHERE id=${req.params.id}`;
  DataBase.query(sql, req.body, (err, res) => {
    if (err) throw err;
    response.send(
      res.affectedRows > 0
        ? res
        : "We couldn't find the song you were looking for"
    );
  });
});

app.put("/artist/:id", (req, response) => {
  let sql = `UPDATE artists SET ? WHERE id=${req.params.id}`;
  DataBase.query(sql, req.body, (err, res) => {
    if (err) throw err;
    response.send(
      res.affectedRows > 0
        ? res
        : "We couldn't find the artist you were looking for"
    );
  });
});

app.put("/playlist/:id", (req, response) => {
  let sql = `UPDATE playlists SET ? WHERE id=${req.params.id}`;
  DataBase.query(sql, req.body, (err, res) => {
    if (err) throw err;
    response.send(
      res.affectedRows > 0
        ? res
        : "We couldn't find the playlist you were looking for"
    );
  });
});

app.delete("/artist/:id", (req, response) => {
  let sql = `DELETE FROM artists WHERE id=${req.params.id}`;
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(
      res.affectedRows > 0
        ? res
        : "We couldn't find the artist you were looking for"
    );
  });
});

app.delete("/playlist/:id", (req, response) => {
  let sql = `DELETE FROM playlists WHERE id=${req.params.id}`;
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(
      res.affectedRows > 0
        ? res
        : "We couldn't find the playlist you were looking for"
    );
  });
});

app.delete("/song/:id", (req, response) => {
  let sql = `DELETE FROM songs WHERE id=${req.params.id}`;
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(
      res.affectedRows > 0
        ? res
        : "We couldn't find the song you were looking for"
    );
  });
});

app.delete("/album/:id", (req, response) => {
  let sql = `DELETE FROM albums WHERE id=${req.params.id}`;
  DataBase.query(sql, (err, res) => {
    if (err) throw err;
    response.send(
      res.affectedRows > 0
        ? res
        : "We couldn't find the album you were looking for"
    );
  });
});

module.exports = app;
