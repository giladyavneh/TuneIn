const express=require("express")
const app=express.Router()
const DataBase=require("../DataBase")
const {Song, Artist, Album}=require("../models")

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

app.get("/:id", async (req, response, next) => {
  try{
    let res=await Song.findByPk(req.params.id,{
      include:[{model:Artist, attributes:["name", "coverImage"]},{model:Album, attributes:["name", "coverImage"]}]
    })
    response.send(res!=null?res:"We couldn't find the song you were looking for")
  } catch(e){
    next(e)
  }
  });

  app.post("/", async (req, response,next) => {
    try{
      let res=await Song.create(req.body)
      response.send(res)
    } catch(e){
      next(e)
    }
  });

  app.put("/:id", async (req, response, next) => {
    try{
      let res=await Song.update(req.body,{where:{id:req.params.id}})
        response.send(
          res[0] > 0
            ? res
            : "We couldn't find the song you were looking for"
        );
    }catch (e){
      ;next(e)
    }
  });

  app.delete("/:id", async (req, response, next) => {
    try{
      await Song.destroy({where:{id:req.params.id}})
      response.send(
        res > 0
          ? res
          : "We couldn't find the song you were looking for"
      );
    } catch (e){
      next(e)
    }
  });

module.exports=app