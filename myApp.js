const bodyParser = require("body-parser");
require("dotenv").config();
var express = require("express");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/json", function(req, res) {
  const message =
    process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json";
  res.json({ message: message });
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({ time: req.time });
});


app.get('/:word/echo', function(req, res, next) {
  next();
}, function(req, res) {
  res.json({ echo: req.params.word });
});


app.get('/name', function(req, res, next) {
  next();
}, function(req, res) {
  res.json({ name: `${req.query.first} ${req.query.last}` });
});

app.post('/name', function(req, res, next) {
  next();
}, function(req, res) {
  res.json({ name: `${req.body.first} ${req.body.last}` });
});

module.exports = app;

