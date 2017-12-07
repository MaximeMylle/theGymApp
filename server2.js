var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser');
var async = require('async');


var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP");
} catch (e) { }


var Cloudant = require('cloudant');
var me = vcapLocal.cloudantNoSQLDB[0].credentials.username; // Set this to your own account
var password =  vcapLocal.cloudantNoSQLDB[0].credentials.password;
// Initialize the library with my account.
var cloudant = Cloudant({account:me, password:password});
var db = null;
var doc = null;
var dbname = "chest";

cloudant.db.list(function(err, allDbs) {
  console.log('All my databases: %s', allDbs.join(', '))
});

var createDatabase = function(/*callback*/) {
  console.log("Creating database '" + dbname + "'");
  cloudant.db.create(dbname, function(err, data) {
    console.log('Error:', err);
    console.log('Data:', data);
    db = cloudant.db.use(dbname);
    //callback(err, data);
  });
};
//createDatabase(null);

var createDocument = function(/*callback*/) {
  console.log("Creating document 'mydoc'");
  // we are specifying the id of the document so we can update and delete it later
  db.insert({a: 2, b: 'two' }, function(err, data) {
    console.log('Error:', err);
    console.log('Data:', data);
    //callback(err, data);
  });
};

db = cloudant.db.use("chest");
createDocument();



var readDocument = function(/*callback*/) {
  console.log("Reading document 'mydoc'");
  db.get('mydoc', function(err, data) {
    console.log('Error:', err);
    console.log('Data:', data);
    // keep a copy of the doc so we know its revision token
    doc = data;
    //callback(err, data);
  });
};

readDocument();

app.post("/api/posttest", function (request, response) {
  var userName = request.body.name;
});


app.use(express.static(__dirname + '/views'));

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
