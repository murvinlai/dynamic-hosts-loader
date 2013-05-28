/*
*/

var express = require('express');

var argv = require('optimist')
            .default('appsPath', '')
            .argv;

var require_loader = require('require_loader');

var appsPath = argv.appsPath;

/*
* Must pass an asbolute path. e.g __dirname + aPath , /home/ubuntu/server/apps
*/
module.exports.setAppsPath = function(aPath) {
    appsPath = aPath;
}

