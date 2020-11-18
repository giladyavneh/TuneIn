const express = require("express");
const app = express.Router();
const { Song, Playlist, User, Artist, Album, Interaction } = require("../models");

app.get("/:id", async (req, response, next) => {
  try {
    let res = await Playlist.findByPk(req.params.id, {
      include: {
        model: Song,
        include: [
          Artist,
          Album,
          {
            model: Interaction,
            where: { user_id: req.headers["x-custom-header"] },
            required: false,
          },
        ],
      },
    });
    let users = await res.getUser();

    res.dataValues.Artist = users;

    response.send(res);
  } catch (e) {
    next(e);
  }
});

app.get("/", async (req, response, next) => {
  try {
    let res = await Playlist.findAll({
      where: { authorId: req.query.user_id },
    });
    response.send(res);
  } catch (e) {
    next(e);
  }
});

app.post("/", async (req, response, next) => {
  try {
    let { authorId, coverImage, name, songs } = req.body;
    let res = await Playlist.create({ authorId, name, coverImage });
    console.log(songs[0].id);
    await res.addSongsById(
      songs.map((song) => song.id),
      Song
    );
    console.log(songs[0].id);
    response.send(res);
  } catch (e) {
    next(e);
  }
});

app.post("/:playlist_id/:song_id", async (req, response) => {
  try{
    let res=await Playlist.findByPk(req.params.playlist_id)
    res.addSong(req.params.song_id)
    response.send(res);
  } catch (e){
    next(e)
  }
});

app.put("/:id", async (req, response, next) => {
  try {
    let res = await Playlist.update({ where: { id: req.params.id } });
    response.send(res);
  } catch (e) {
    next(e);
  }
});

app.delete("/:id", async (req, response, next) => {
  try {
    let res = await Playlist.destroy({ where: { id: req.params.id } });
    response.send(res);
  } catch (e) {
    next(e);
  }
});

module.exports = app;
