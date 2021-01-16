const express=require("express");
const { adminAuth } = require("../helpers/middleware");
const app=express.Router()
const {Album,Artist,Song,Interaction}=require("../models");

app.get("/:id", async (req, response,next) => {
  try{
    const user_id = req.auth.id
    let res = await Album.findByPk(req.params.id,{
      include: [
        Artist,
        {
          model: Song,
          include: [
            Album,
            Artist,
            {
              model: Interaction,
              where: { user_id },
              required: false,
            },
          ],
        },
      ],
    })
    response.send(res != null ? res : "We couldn't find the album you were looking for")
  } catch(e){
    next(e)
  }
  });

  app.post("/", adminAuth, async (req, response, next) => {
    try{
      let res=await Album.create(req.body)
      response.send(res);
    } catch (e){
      next(e)
    }
  });

  app.put("/:id", adminAuth, async (req, response,next) => {
    try{
      let res= await Album.update(req.body,{where:{id:req.params.id}})
      response.send(
        res[0]>0
          ? res
          : "We couldn't find the album you were looking for"
      );
    }catch(e){
      next(e)
    }
  });

  app.delete("/:id", adminAuth, async (req, response,next) => {
    try{
      let res= await Album.destroy({where:{id:req.params.id}})
        response.send(
          res > 0
            ? res
            : "We couldn't find the album you were looking for"
        )}catch(e){
          next(e)
        }
  });

module.exports=app;