const express=require("express")
const app=express.Router()
const DataBase=require("../DataBase")

app.get("/", (req, response) => {
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
      if (err) return response.status(500);
      response.send(
        res.length > 0 ? res : "We couldn't find the song you were looking for"
      );
    });
  });

app.get("/:id", (req, response) => {
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
      if (err) return response.status(500);
      response.send(
        res.length > 0 ? res : "We couldn't find the song you were looking for"
      );
    });
  });

  app.post("/", (req, response) => {
    let sql = "INSERT INTO songs SET ?";
    DataBase.query(sql, req.body, (err, res) => {
      if (err) return response.status(500);
      response.send(res);
    });
  });

  app.put("/:id", (req, response) => {
    let sql = `UPDATE songs SET ? WHERE id=${req.params.id}`;
    DataBase.query(sql, req.body, (err, res) => {
      if (err) return response.status(500);
      response.send(
        res.affectedRows > 0
          ? res
          : "We couldn't find the song you were looking for"
      );
    });
  });

  app.delete("/:id", (req, response) => {
    let sql = `DELETE FROM songs WHERE id=${req.params.id}`;
    DataBase.query(sql, (err, res) => {
      if (err) return response.status(500);
      response.send(
        res.affectedRows > 0
          ? res
          : "We couldn't find the song you were looking for"
      );
    });
  });

module.exports=app