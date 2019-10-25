// need to require connection.js so that the ORM can communicate/talk with the database.
var connection = require("./connection");

//helper function for sql syntax.
//lets say we want to pass 3 values into the mysql query.
// in order to write the query , we need 3 question marks.
//the above helper function loops through  and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++){
        arr.push("?");
    }

    return arr.toString();
}

//helper function to convert object key/value to sql syntax
function objToSql(ob) {
    var arr = [];

    //loop through the keys and push the key value as a string int arr.
    for (var key in ob) {
        var value = ob[key];
        //check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            //if string with spaces, add quotations (lana del grey => 'lana del grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
                 // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
                arr.push(key + "=" + value);
            }
        }
    }
    return arr.toString();
}

//Object for all our SQL statement functions.
//Create the methods that will execute the necessary MySQL commands in the controllers.
//These are the methods you will need to use in order to retrieve and store data in your database.
var orm = {
    //select all function/query
    create: function (table, cols, vals, cd) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);
        
        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });

    },

    //update function/query.
    // An example of objColVals would be {name: panther, sleepy: true}
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      },
  
      //Delete function/query
      delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;
    
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      }
    
    };
  
  //Export the orm object.
  module.exports = orm;
