const mysql = require("mysql");

const DataBase = mysql.createConnection(
    JSON.parse(process.env.SQL_CREDENTIALS)
  );
  DataBase.connect((err, res) => {
    if (err) return response.status(500);
    console.log("DataBase connected...");
  });

  module.exports=DataBase;