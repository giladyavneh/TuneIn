const express=require("express")
const app=express.Router()
const DataBase=require("../DataBase")

app.get("/:id", (req, response) => {
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
      if (err) return response.status(500);
      response.send(
        res.length > 0
          ? res
          : "We couldn't find the playlist you were looking for"
      );
    });
  });
  
  app.get("/", (req,response)=>{
    let sql=`SELECT playlists.name as name,
    playlists.id as id
    FROM playlists
    JOIN users_playlist
    ON playlists.id=users_playlist.playlist_id
    WHERE users_playlist.user_id='${req.query.user_id}'`
    DataBase.query(sql, (err,res)=>{
      if (err) return response.status(500);
      response.send(res)
    })
  })

  app.post("/", (req, response) => {
    let sql = `INSERT INTO playlists SET name='${req.body.name}',
    cover_image='${req.body.cover_image}'`;
    DataBase.query(sql, req.body, (err, res) => {
      if (err) return response.status(500);
      DataBase.query(`INSERT INTO users_playlist SET
      user_id='${req.body.user_id}',
      playlist_id='${res.insertId}'`)
      if (req.body.songs.length>0){
        let sql=`INSERT INTO songs_in_playlist
        (song_id,playlist_id) VALUES `
        let values=req.body.songs.map(song=>`(${song.id},${res.insertId})`)
        DataBase.query(sql+values.join(),(err,res)=>{
          if (err) return response.status(500);
        })
      }
      response.send(res);
    });
  });
  
  app.post("/:playlist_id/:song_id",(req,response)=>{
    let sql=`INSERT INTO songs_in_playlist SET ?`
    DataBase.query(sql,req.params,(err,res)=>{
      if (err) return response.status(500);
      response.send(res)
    })
  })

  app.put("/:id", (req, response) => {
    let sql = `UPDATE playlists SET ? WHERE id=${req.params.id}`;
    DataBase.query(sql, req.body, (err, res) => {
      if (err) return response.status(500);
      response.send(
        res.affectedRows > 0
          ? res
          : "We couldn't find the playlist you were looking for"
      );
    });
  });
  
  app.delete("/:id", (req, response) => {
    let sql = `DELETE FROM playlists WHERE id=${req.params.id}`;
    DataBase.query(sql, (err, res) => {
      if (err) return response.status(500);
      response.send(
        res.affectedRows > 0
          ? res
          : "We couldn't find the playlist you were looking for"
      );
    });
  });

module.exports=app;