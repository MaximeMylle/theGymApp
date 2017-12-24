var express = require("express");
var session = require('express-session');


//HOWTO USERNAME
// req.session.views = 1 etcetc
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser');
var async = require('async');
var bcrypt = require('bcryptjs');
var session = require('express-session');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());
app.use(session({
  secret: "123123123",
  resave: false,
  saveUninitialized: true
}));


var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP");
} catch (e) {}

var Cloudant = require('cloudant');
var me = vcapLocal.cloudantNoSQLDB[0].credentials.username; // Set this to your own account
var password = vcapLocal.cloudantNoSQLDB[0].credentials.password;
// Initialize the library with my account.
var cloudant = Cloudant({
  account: me,
  password: password
});
var db = null;
var doc = null;
var dbname = "";

// cloudant.db.list(function(err, allDbs) {
//   console.log('All my databases: %s', allDbs.join(', '))
// });

var createDatabase = function( /*callback*/ ) {
  console.log("Creating database '" + dbname + "'");
  cloudant.db.create(dbname, function(err, data) {
    console.log('Error:', err);
    console.log('Data:', data);
    db = cloudant.db.use(dbname);
    //callback(err, data);
  });
};

var createDocument = function( /*callback*/ ) {
  console.log("Creating document 'mydoc'");
  // we are specifying the id of the document so we can update and delete it later
  db.insert({
    a: 2,
    b: 'two'
  }, function(err, data) {
    console.log('Error:', err);
    console.log('Data:', data);
    //callback(err, data);
  });
};

//db = cloudant.db.use("chest");

var readDocument = function( /*callback*/ ) {
  console.log("Reading document 'mydoc'");
  db.get('', function(err, data) {
    console.log('Error:', err);
    console.log('Data:', data);
    // keep a copy of the doc so we know its revision token
    doc = data;
    //callback(err, data);
  });
};

//readDocument();

var readAllTest = function() {
  db.list({
    include_docs: true
  }, function(err, data) {
    //console.log(err, data);
    var datarows = data.rows;
    //console.log("datarows:\n");
    datarows.forEach((row) => {
      //console.log("a: " + row.doc.a);
    });
    //console.log(datarows);
  });
}

app.post("/login", function(request, response) {
  var username = request.body.username;
  console.log("USERNAME POSTED: " + username);
  var password = request.body.password;
  console.log("PASSWORD POSTED: " + password);
  db = cloudant.db.use("login");
  //make key = username
  db.get(username, function(err, data) {
    console.log('Error:', err);
    if (err) {
      response.redirect("back");
    } else {
      console.log('Data:', data);
      // keep a copy of the doc so we know its revision token
      doc = data;
      hash = data.password

      bcrypt.compare(password, hash, function(err, res) {
        if (res) {
          request.session.username = username;
          response.redirect("/protected/home.html");
        } else {
          response.redirect("unsuccesfull.html");
        }
      });
    }
  });
});

app.post("/register", function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  db = cloudant.db.use("login");

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  db.insert({
    _id: username,
    username: username,
    password: hash
  }, function(err, data) {
    console.log('Error:', err);
    console.log('Data:', data);
  });

  var dbname = username + "_data";

  cloudant.db.create(dbname, function(err, data) {
    console.log('Error:', err);
    console.log('Data:', data);
  });
  response.redirect("login.html");

});


app.post("/postdata", function(request, response) {
  var username = request.session.username;
  var exercise = request.body.exercise;
  var category = request.body.category;
  var set1 = request.body.set1;
  var set2 = request.body.set2;
  var set3 = request.body.set3;


  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getYear();
  //console.log("test post");
  console.log("postdata: " + exercise + " " + category + " " + set1 + " " + set2 + " " + set3);

  var dbname = username + "_data";
  db = cloudant.db.use(dbname);
  db.insert({
    category:category,
    exercise:exercise,
    set1:set1,
    set2:set2,
    set3:set3,
    day:day,
    month:month,
    year:year
  }, function(err, data) {
    console.log('Error:', err);
    console.log('Data:', data);
    //callback(err, data);
  });

  console.log("\n\ntime: " +day+"/"+month+"/"+year );


  response.redirect("back");
});



app.post("/api/getdata", function(request, response) {
  var username = request.body.username;



    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }));
});

app.get('/protected/*', function(request, response, next) {
  if (!request.session.username) {
    response.redirect('/login.html');
  } else {
    next();
  }
});


app.get('/', function(request, response) {
  if (request.session.username) {
    response.redirect('/protected/home.html');
  } else {
    response.redirect('/login.html');
  }
});


app.use(express.static(__dirname + '/views'));

var port = process.env.PORT || 3000
app.listen(port, function() {
  console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
