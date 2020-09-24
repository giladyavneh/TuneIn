const express=require("express")
const router=express.Router()
const {Artist}=require("../models")

router.post("/",async (req,res,next)=>{
    try{
        res.send(await Artist.create(req.body))
    } catch(e) {
        
        next(e)
    }
})

router.get("/:id", async (req,res, next)=>{
    try{
        res.send(await Artist.findByPk(req.params.id))
    } catch (e){
        next(e)
    }
})

router.put("/:id", async (req,res, next)=>{
    try{
        res.send(await Artist.update(req.body,{where:{id:req.params.id}}))
    } catch (e){
        next(e)
    }
})

router.delete("/:id",async (req,res, next)=>{
    try{
        res.send(await Artist.delete(req.params.id))
    } catch (e){
        next(e)
    }
})

module.exports=router;