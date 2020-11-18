# TuneIn
Music player app, supplying music through youtube using mySQL as the database.

## Prerequisite 

* npm
* access to a mySQL server

## Get Started

Before you do anything you should navigate to the server directory and create a `.env` file, where you can write your mySQL server details. As mentioned above, the app uses a mySQL database, but because it is still just a private project it does not use a public storage, but instead relies on each user personal database.

So, for this to work you going to need to write your mySQL username (usually "root"), your password, and your host (which, if you are running your mySQL server locally is "127.0.0.1"). No need to worry, this file is local, and on `.gitignore`, so those credentials are going to stay sfaely on your private machine.

Copy those lines to your new `.env` file, and replace the relevant fields with your on data (remeber to *NOT* wrap your inputs with quotes (*""*), as this is a env file):

`SQL_USER=<your_user-name, most likely root>`\n
`SQL_PASSWORD=giladyavneh`
`SQL_HOST=127.0.0.1`
