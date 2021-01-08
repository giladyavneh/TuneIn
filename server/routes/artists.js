const express = require("express");
const { adminAuth } = require("../helpers/middleware");
const app = express.Router();
const { Artist, Song, Album, Interaction } = require("../models");

app.get("/:id", async (req, response, next) => {
  console.log(req.headers);
  try {
    let res = await Artist.findByPk(req.params.id, {
      include: [
        Album,
        {
          model: Song,
          include: [
            Album,
            {
              model: Interaction,
              where: { user_id: req.headers["x-custom-header"] },
              required: false,
            },
          ],
        },
      ],
    });
    response.send(
      res != null
        ? res
        : ''
    );
  } catch (e) {
    next(e);
  }
});

app.post("/", adminAuth, async (req, response, next) => {
  try {
    response.send(await Artist.create(req.body));
  } catch (e) {
    next(e);
  }
});

app.put("/:id", adminAuth, async (req, response, next) => {
  try {
    let res = await Artist.update(req.body, { where: { id: req.params.id } });
    response.send(
      res[0] > 0 ? res : "We couldn't find the artist you were looking for"
    );
  } catch (e) {
    next(e);
  }
});

app.delete("/:id", adminAuth, async (req, response, next) => {
  try {
    let res = await Artist.destroy({ where: { id: req.params.id } });
    response.send(
      res > 0 ? res : "We couldn't find the artist you were looking for"
    );
  } catch (e) {
    next(e);
  }
});

module.exports = app;
