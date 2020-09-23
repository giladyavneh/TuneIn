const express=require("express")
const app=express.Router()
const DataBase=require("../DataBase")

app.get("/:id", (req, response) => {
    let sql = `SELECT albums.name AS title,
    albums.id as id,
    albums.cover_image as image,
    artists.cover_image as artist_image,
    artists.name AS artist
    FROM albums
    JOIN artists ON artists.id=albums.artist_id
    WHERE albums.id = '${req.params.id}'`;
    DataBase.query(sql, (err, res) => {
      if (err) return response.status(500);
      response.send(
        res.length > 0 ? res : "We couldn't find the album you were looking for"
      );
    });
  });

  app.post("/", (req, response) => {
    let sql = "INSERT INTO albums SET ?";
    DataBase.query(sql, req.body, (err, res) => {
      if (err) return response.status(500);
      response.send(res);
    });
  });

  app.put("/:id", (req, response) => {
    let sql = `UPDATE albums SET ? WHERE id=${req.params.id}`;
    DataBase.query(sql, req.body, (err, res) => {
      if (err) return response.status(500);
      response.send(
        res.affectedRows > 0
          ? res
          : "We couldn't find the album you were looking for"
      );
    });
  });

  app.delete("/:id", (req, response) => {
    let sql = `DELETE FROM albums WHERE id=${req.params.id}`;
    DataBase.query(sql, (err, res) => {
      if (err) return response.status(500);
      response.send(
        res.affectedRows > 0
          ? res
          : "We couldn't find the album you were looking for"
      );
    });
  });

module.exports=app;