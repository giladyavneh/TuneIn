const express = require("express");
const router = express.Router();
const { updateElasticData, getElasticIndex } = require("../elasticSearch");
const { Song, Artist, Album, Interaction } = require("../models");

router.post("/", async (req, res, next) => {
  try {
    const indices = ["songs", "artists", "albums"];
    indices.forEach((index) => {
      let tabel = eval(
        index[0].toUpperCase() + index.slice(1, index.length - 1)
      );
      tabel
        .findAll()
        .then((res) => updateElasticData(index, res))
        .catch((err) =>
          console.log("Table " + index + " already exists, operation skipped")
        );
    });
  } catch (e) {
    next(e);
  }
});

router.get("/songs", async (req, res, next) => {
  try {
    let { body } = await getElasticIndex("songs",req.query.size);
    res.send(body);
  } catch (e) {
    next(e);
  }
});

router.get("/artists", async (req, res, next) => {
    try {
      let { body } = await getElasticIndex("artists",req.query.size);
      res.send(body);
    } catch (e) {
      next(e);
    }
  });

  router.get("/albums", async (req, res, next) => {
    try {
      let { body } = await getElasticIndex("albums",req.query.size);
      res.send(body);
    } catch (e) {
      next(e);
    }
  });

router.get("/playlists", async (req, res, next) => {
try {
    let { body } = await getElasticIndex("playlists",req.query.size);
    res.send(body);
} catch (e) {
    next(e);
}
});

module.exports = router;
