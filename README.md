# TuneIn
Music player app, supplying music through youtube using mySQL as the database.

## Prerequisite 

* npm
* access to a mySQL server

## Get Started

### Taking care for ENV variables
Before you do anything you should navigate to the server directory and create a `.env` file, where you can write your mySQL server details. As mentioned above, the app uses a mySQL database, but because it is still just a private project it does not use a public storage, but instead relies on each user personal database.

So, for this to work you going to need to write your mySQL username (usually "root"), your password, and your host (which, if you are running your mySQL server locally is "127.0.0.1"). No need to worry, this file is local, and on `.gitignore`, so those credentials are going to stay sfaely on your private machine.

Copy those lines to your new `.env` file, and replace the relevant fields with your on data (remeber to *NOT* wrap your inputs with quotes (*""*), as this is a env file):

`SQL_USER=<your_user_name>`

`SQL_PASSWORD=<your_password>`

`SQL_HOST=<your_mysql_server_endpoint_or_127.0.0.1_if_local>`

### Setting up the database
We are going to start off by runing `npm install` in our server directory.
Now that we have a mySQL server to host us we can populate it. All we need to do is to nevigate to the server directory and type `npm run init`.
This will create a 'tuneinorm' database, fill it with the relevant tables and populate it with some ready in advance songs (hope you're into Coldplay).

### Setting up the server

In the server directory, run the command `npm start`.
The server should be runing on port 3001 now, and log saying 'Listening on 3001' should come up on your console.

### Setting up the client

Keep the the server runing, and in a new terminal navigate to the client directory. There, run the `npm install` command. this might take a while.
When everything has finished download, just hit `npm start` in the client directory and the app should be up and running on [http://localhost:3000](http://localhost:3000).
You are free to explore the app and good music in general. Have fun and happy Hacking!
