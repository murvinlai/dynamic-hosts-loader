/*
*/

var express = require('express');

var require_loader = require('require_loader');

var settings = {};
var normalizedDomainList = [];
module.exports.normalizedDomainList = normalizedDomainList;

/*
* Add subodmain function
*/
var addFullDomain = function(fullDomainName, fullName, app)  {
    var canAdd = true;
    for (var i=0; i<normalizedDomainList.length;i++) {
            if (normalizedDomainList[i].name == fullDomainName) {
                    canAdd = false;
                    break;
            }
    }
    if (canAdd) {
            server.use(express.vhost(fullDomainName, app));
            normalizedDomainList.push({name:fullDomainName, fullName:fullName});
    }
}

/*
* a function to take the express server.. and append apps to it later
*/
var server = false;
module.exports.load = function(options) {
    settings = {
        appsPath    :   options.appsPath || false,  /* the folder path where it is beign watch */
        server      :   options.server  || false,   /* the express server / app object */
    }
    
    if (settings.appsPath !== false && settings.server !== false) {
        // bind util function to the server object first
        settings.server.addFullDomain = addFullDomain;
    } else {
        // error.    
    }
}