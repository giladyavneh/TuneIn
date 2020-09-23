const express=require("express")
const app=express.Router()
const DataBase=require("../DataBase")

app.get("/:id", (req, response) => {
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
      if (err) return response.status(500);
      response.send(
        res.length > 0
          ? res
          : { res: "We couldn't find the artist you were looking for" }
      );
    });
  });

  app.post("/", (req, response) => {
    let sql = "INSERT INTO artists SET ?";
    DataBase.query(sql, req.body, (err, res) => {
      if (err) return response.status(500);
      response.send(res);
    });
  });

  app.put("/:id", (req, response) => {
    let sql = `UPDATE artists SET ? WHERE id=${req.params.id}`;
    DataBase.query(sql, req.body, (err, res) => {
      if (err) return response.status(500);
      response.send(
        res.affectedRows > 0
          ? res
          : "We couldn't find the artist you were looking for"
      );
    });
  });

  app.delete("/:id", (req, response) => {
    let sql = `DELETE FROM artists WHERE id=${req.params.id}`;
    DataBase.query(sql, (err, res) => {
      if (err) return response.status(500);
      response.send(
        res.affectedRows > 0
          ? res
          : "We couldn't find the artist you were looking for"
      );
    });
  });

module.exports=app;