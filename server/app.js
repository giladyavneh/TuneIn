const mysql=require("mysql")
const express=require("express")
const app=express()

const DataBase=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"giladyavneh",
    database:"tunein"
})
DataBase.connect((err,res)=>{
    if (err) throw err;
    console.log("DataBase connected...")
})

app.get("/top_songs",(req,response)=>{
    let sql="SELECT * FROM songs LIMIT 20"
    DataBase.query(sql,(err,res)=>{
        if (err) throw err;
        response.send(res)
    })
})

module.exports=app