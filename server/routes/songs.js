const express = require("express");
const app = express.Router();
const { Song, Artist, Album, Interaction } = require("../models");


app.get("/", async (req, response, next) => {
  try {
    let field = Object.keys(req.query)[0];
    let id = Object.values(req.query)[0];
    let list;
    switch (field) {
      case "artist":
        list = await Artist.findByPk(id);
        break;
      case "album":
        list = await Album.findByPk(id);
        break;
    }
    let res =
      field === "song"
        ? await Song.findAll({ where: { id }, include: [Artist, Album] })
        : await list.getSongs({ include: [Artist, Album] });
    response.send(res);
  } catch (e) {
    next(e);
  }
});

app.get("/:id", async (req, response, next) => {
  try {
    let res = await Song.findByPk(req.params.id, {
      include: [
        { model: Artist, attributes: ["name", "coverImage"] },
        { model: Album, attributes: ["name", "coverImage"] },
        {
          model: Interaction,
          where: { user_id: req.headers["x-custom-header"] },
          required: false,
        },
      ],
    });
    response.send(
      res != null ? res : "We couldn't find the song you were looking for"
    );
  } catch (e) {
    next(e);
  }
});

app.post("/", async (req, response, next) => {
  try {
    let res = await Song.create(req.body);
    response.send(res);
  } catch (e) {
    next(e);
  }
});

app.put("/:id", async (req, response, next) => {
  try {
    let res = await Song.update(req.body, { where: { id: req.params.id } });
    response.send(
      res[0] > 0 ? res : "We couldn't find the song you were looking for"
    );
  } catch (e) {
    next(e);
  }
});

app.delete("/:id", async (req, response, next) => {
  try {
    let res=await Song.destroy({ where: { id: req.params.id } });
    response.send(
      res > 0 ? res : "We couldn't find the song you were looking for"
    );
  } catch (e) {
    next(e);
  }
});

module.exports = app;
