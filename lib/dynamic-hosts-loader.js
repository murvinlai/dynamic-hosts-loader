/*
*/

var express = require('express');

var require_loader = require('require_loader');

var appsPath = argv.appsPath;

/*
* Must pass an asbolute path. e.g __dirname + aPath , /home/ubuntu/server/apps
*/
module.exports.setAppsPath = function(aPath) {
    appsPath = aPath;
}

/*
* a function to take the express server.. and append apps to it later
*/
var server = false;
module.exports.load = function(inputServer) {
    server = inputServer;
}