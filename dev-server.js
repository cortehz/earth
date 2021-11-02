/**
 * dev-server - serves static resources for developing "earth" locally
 */

"use strict";

console.log("============================================================");
console.log(new Date().toISOString() + " - Starting");

var util = require("util");
var logger = require("morgan");
const fs = require("fs");

/**
 * Returns true if the response should be compressed.
 */
function compressionFilter(req, res) {
  return /json|text|javascript|font/.test(res.getHeader("Content-Type"));
}

/**
 * Adds headers to a response to enable caching.
 */
function cacheControl() {
  return function (req, res, next) {
    res.setHeader("Cache-Control", "public, max-age=300");
    return next();
  };
}

function appLogger() {
  logger.token("date", function () {
    return new Date().toISOString();
  });

  logger.token("response-all", function (req, res) {
    return (res._header ? res._header : "").trim();
  });

  logger.token("request-all", function (req, res) {
    return util.inspect(req.headers);
  });
  return logger(
    ":date - info: :remote-addr :req[cf-connecting-ip] :req[cf-ipcountry] :method :url HTTP/:http-version " +
      '":user-agent" :referrer :req[cf-ray] :req[accept-encoding]\\n:request-all\\n\\n:response-all\\n'
  );
}

// var port = process.argv[2];

const PORT = process.env.PORT || 3001;
var express = require("express");
var compression = require("compression");
var app = express();

// directory path
const dir = "./public/data/weather/current/years";
const dataYears = [];
// list all files in the directory
fs.readdir(dir, (err, files) => {
  if (err) {
    throw err;
  }
  // files object contains all files names
  // log them on console
  files.forEach((file) => {
    console.log(file);
    dataYears.push(file);
  });
});

app.get("/getyears", function (req, res) {
  res.send({
    dataYears: dataYears,
  });
});

app.use(cacheControl());

app.use(compression({ filter: compressionFilter }));
app.use(appLogger());
app.use(express.static("public"));

app.listen(PORT);
console.log(`Listening on port ${PORT} ...`);
