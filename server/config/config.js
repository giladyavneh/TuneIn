require("dotenv").config()
module.exports={
  "development": {
    "username": process.env.SQL_USER,
    "password": process.env.SQL_PASSWORD,
    "database": "tuneinorm",
    "host": process.env.SQL_HOST,
    "dialect": "mysql",
    "define":{"underscored":true}
  },
  "test": {
    "username": process.env.SQL_USER,
    "password": process.env.SQL_PASSWORD,
    "database": "tuneinormtesting",
    "host": process.env.SQL_HOST,
    "dialect": "mysql",
    "define":{"underscored":true}
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
