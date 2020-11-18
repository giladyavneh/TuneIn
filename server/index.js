let app=require("./app.js")

let PORT=process.env.port||3001
app.listen(PORT, ()=>console.log("Listening on "+PORT))