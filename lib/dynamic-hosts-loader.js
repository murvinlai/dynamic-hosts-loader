/*
*/

var express = require('express');
var fs = require('fs');
var _ = require('underscore');

var REQUIRE_LOADER = require('require_loader');

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
            this.use(express.vhost(fullDomainName, app));   // this refer to the Server object
            normalizedDomainList.push({name:fullDomainName, fullName:fullName});
    }
}

var buildApp = function(appConfig) {
    // read the config. 
    var app = express();
    
    _.map(appConfig.routes, function(route) {
        var protocol = route.method.toLowerCase();
        
        // push the middleware
        var middlewares = route.middlewares;
        middlewares.push(route.endFunction);
        
        if (protocol == 'get' || protocol == 'post' || protocol == 'put' || protocol == 'delete') {
            app[protocol](route.url, middlewares);
        }        
    });
    
    return app;
}

/*
*
*/
var onAppsFolderChange = function(err, data) {
    if (data.action == "add") {
        // Look into the file name and if it match the configSuffix
        var app = false;
        var domains = [];
        
        if (data.filename.indexOf(settings.configSuffix) > 0) {
            // It matches and look into the content of the config file, build the apps from it.
            // must exports the module.exports.config
            var appConfig = data.ref.config;
            
            // build the app
            app = buildApp(appConfig);
            
            domains = _.isArray(appConfig.domain)?appConfig.domain : [appConfig.domain];
            
        } else {
            // It doesn't match and  consider it is already a file with module.exports.app
            app = data.ref.app;
            
            domains = _.isArray(app.domain)?app.domain : [app.domain];
            
        }
        
        // now loop and apply the 
        for (var i=0; i<domains.length; i++ ) {
			settings.server.use(express.vhost(domains[i], app));
		}
        
    } else if (data.action == "remove") {
        
    }
}
/*
* a function to take the express server.. and append apps to it later
*/
var require_loader = false;
module.exports.load = function(options) {
    settings = {
        appsPath    :   options.appsPath        || false,  /* the folder path where it is beign watch */
        server      :   options.server          || false,   /* the express server / app object */
        configSuffix:   options.configSuffix    || '.cfg.js',
        error       :   options.error           || function () {}
    }
    
    if (settings.appsPath !== false && settings.server !== false) {
        // bind util function to the server object first
        settings.server.addFullDomain = addFullDomain;
        //settings.server.removeFullDomain = removeFullDomain;
        
        // now load and watch the require folder.
        require_loader = REQUIRE_LOADER.create({path:settings.appsPath, init:true, isWatch:true, onChange:onAppsFolderChange});
        
    } else {
        // error.    
        settings.error("Apps Path or the Server is undefined.");
    }
}