let app=require("./app")

let PORT=process.env.port||3001
app.listen(PORT, ()=>console.log("Listening on "+PORT))