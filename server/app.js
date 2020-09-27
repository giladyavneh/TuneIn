const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const bcrypt = require("bcrypt");
const songs = require("./routes/songs");
const artists = require("./routes/artists");
const albums = require("./routes/albums");
const playlists = require("./routes/playlists");
const {
  User,
  Song,
  Interaction,
  Sequelize,
  sequelize,
  Artist,
  Album,
  Playlist,
} = require("./models");
const { Op } = require("sequelize");

app.use(express.json());
app.use(cors());

app.use("/song", songs);
app.use("/artist", artists);
app.use("/album", albums);
app.use("/playlist", playlists);

app.get("/top_songs", async (req, response, next) => {
  try {
    let res = await Song.findAll({
      include: [{ model: Interaction, attributes: [] }, Artist, Album],
      group: "Song.id",
      order: [
        [sequelize.fn("sum", sequelize.col(`Interactions.is_liked`)), "DESC"],
        [sequelize.fn("sum", sequelize.col(`Interactions.play_count`)), "DESC"],
      ],
    });
    response.send(res);
  } catch (e) {
    next(e);
  }
});

app.get("/top_artists", async (req, response, next) => {
  try {
    let res = await Artist.findAll({
      include: [
        {
          model: Song,
          attributes: [],
          include: { model: Interaction, attributes: [] },
        },
      ],
      group: "Artist.id",
      order: [
        [
          sequelize.fn("sum", sequelize.col(`Songs.Interactions.is_liked`)),
          "DESC",
        ],
        [
          sequelize.fn("sum", sequelize.col(`Songs.Interactions.play_count`)),
          "DESC",
        ],
      ],
    });
    response.send(res);
  } catch (e) {
    next(e);
  }
});

app.get("/top_albums", async (req, response, next) => {
  try {
    let res = await Album.findAll({
      include: [
        Artist,
        {
          model: Song,
          attributes: [],
          include: { model: Interaction, attributes: [] },
        },
      ],
      group: "Album.id",
      order: [
        [
          sequelize.fn("sum", sequelize.col(`Songs.Interactions.is_liked`)),
          "DESC",
        ],
        [
          sequelize.fn("sum", sequelize.col(`Songs.Interactions.play_count`)),
          "DESC",
        ],
      ],
    });
    response.send(res);
  } catch (e) {
    next(e);
  }
});

app.get("/top_playlists", async (req, response, next) => {
  try {
    let res = await Playlist.findAll({
      include: [
        {
          model: Song,
          attributes: [],
          include: { model: Interaction, attributes: [] },
        },
      ],
      group: "Playlist.id",
      order: [
        [
          sequelize.fn("sum", sequelize.col(`Songs.Interactions.is_liked`)),
          "DESC",
        ],
        [
          sequelize.fn("sum", sequelize.col(`Songs.Interactions.play_count`)),
          "DESC",
        ],
      ],
    });
    let pendings = [];
    for (let playlist of res) {
      pendings.push(
        playlist
          .getUser({ attributes: [["username", "name"]] })
          .then((res) => (playlist.dataValues.Artist = res))
      );
    }
    await Promise.all(pendings);
    response.send(res);
  } catch (e) {
    next(e);
  }
});

app.get(`/search`, async (req, response) => {
  try{
    let { songs, artists, albums, playlists } = req.query;
    let promises = [];
    if (songs) {
      promises.push(
        Song.findAll({
          include: [Artist, Album],
          attributes:['title','id'],
          where: { title: { [Op.like]: `${songs}%` } },
        }).then((res) => {
          res.forEach((x) => (x.dataValues.type = "song"));
          return res;
        })
      );
    }
    if (artists) {
      promises.push(
        Artist.findAll({
          attributes:[["name",'title'],'coverImage','id'],
          where: { name: { [Op.like]: `${artists}%` } },
        }).then((res) => {
          res.forEach((x) => (x.dataValues.type = "artist"));
          return res;
        })
      );
    }
    if (albums) {
      promises.push(
        Album.findAll({
          include: Artist,
          attributes:[["name",'title'],'coverImage','id'],
          where:{name:{[Op.like]:`${albums}%`}},
        }).then((res) => {
          res.forEach((x) => (x.dataValues.type = "artist"));
          return res;
        })
      );
    }
    if (playlists) {
      promises.push(
        Playlist.findAll({
          attributes:[["name",'title'],'coverImage','id'],
          where:{name:{[Op.like]:`${playlists}%`}},
        })
      );
    }
    Promise.all(promises).then((resolved) => {
      let result = {};
      resolved.forEach((arr) => {
        if (arr.length > 0) {
          result[arr[0].dataValues.type] = arr;
        }
      });
      response.send(result);
    });
  } catch(e){
    next(e)
  }
});

app.post("/signin", async (req, response, next) => {
  try {
    await User.create(req.body);
    response.send({
      idKey: bcrypt.hashSync(req.body.password, 10),
      username: req.body.username,
    });
  } catch (e) {
    next(e);
  }
});

app.post("/login", async (req, response, next) => {
  try {
    let res = await User.findOne({ where: { username: req.body.username } });
    if (res == null)
      return response.status(400).send({ massage: "Wrong user name" });
    return !bcrypt.compareSync(req.body.password, res.password)
      ? response.status(401).send({ massage: "Wrong password" })
      : response.send({
          idKey: bcrypt.hashSync(res.password, 10),
          username: res.username,
        });
  } catch (e) {
    next(e);
  }
});

app.post("/connect", async (req, response, next) => {
  try {
    let res = await User.findAll({ where: { username: req.body.username } });
    if (res.length === 0) return response.status(500).send([]);
    return response.send(
      bcrypt.compareSync(res[0].password, req.body.idKey) ? res : []
    );
  } catch (e) {
    next(e);
  }
});

app.put("/interaction/:user_id/:song_id", async (req, response, next) => {
  try {
    let exist = await Interaction.findOne({
      where: { songId: req.params.song_id, userId: req.params.user_id },
    });
    if (exist) {
      if (req.body.isLiked)
        exist.update({ isLiked: Sequelize.literal("NOT is_liked") });
      if (req.body.playCount) exist.increment("playCount");
    } else {
      console.log(req.params.song_id, req.params.user_id);
      Interaction.create({
        userId: req.params.user_id,
        songId: req.params.song_id,
        isLiked: Boolean(req.body.isLiked),
        playCount: Boolean(req.body.playCount) ? 1 : 0,
      });
    }
  } catch (e) {
    next(e);
  }
});

app.use((error, req, res, next) => {
  console.log(error);
  return res
    .status(500)
    .send({ massage: "A server error has occured...", error });
  next();
});

module.exports = app;
