//todo connect the the databse

// Require mysql npm package to create a connection to the mysql database.
var mysql = require("mysql");

// Read and set any enviroment variables with the dot env package.
require('dotenv').config();

//define database connection properties (host, user, password, and database name)
//use prodoction database when daployed.

if (process.env.JAWSDB_URL) {
    //This is Heroku deployment
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}

else {
    //else use local host database for local development.
    //Mysql password passed into connection.js from  the .env file using the dotenv package.
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "asdfghj89",
        database: "burger_db"
    });
};

connection.connect(function (err) {
    //if ther is an error connecting to the database, log the error to the console.
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    //if database connection is established, log the database thread number.
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;