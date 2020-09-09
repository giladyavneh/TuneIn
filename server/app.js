const mysql=require("mysql")
const express=require("express")
const app=express()

const DataBase=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"giladyavneh"
})
DataBase.connect(err=>{
    if (err) throw err;
    console.log("DataBase connected...")
})

module.exports=app