const express = require("express");
const router = express.Router();
const { Song } = require("../models");

router.post("/", async (req, res, next) => {
  try {
    res.send(await Album.create(req.body));
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    //need to add fields
    res.send(
      await Album.findByPk(req.params.id,
        { include: [{ model: Artist , attributes:['name']}], raw:true })
    );
  } catch (e) {
    next(e);
  }
});

module.exports = router;