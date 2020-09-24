const express=require("express")
const app=express()
const artists=require("./routes/route.artist")
const albums=require("./routes/route.album")

app.use(express.json())

app.use("/artist",artists)
app.use("/album",albums)

app.use((error,req,res,next)=>{
    console.log(error);
    return res.status(500).send({massage:"A server error has occured...",error})
    next()
})


module.exports=app;