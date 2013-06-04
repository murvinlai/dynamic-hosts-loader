/*
* Example of the app config file
* Only support one domain per config file
* For testing this with localhost, dont forget to change the hosts file and point
* localhost to www.dynamic-hosts-loader-test.com
*/
var middleware1 = function(req, res, next) {
    console.log("Call Middleware1");
    next();
}

var middleware2 = function(req, res, next) {
    console.log("Call Middleware2");
    next();
}

var endFunction = function(req, res) {
    res.send("Done");
}

exports.module.config = {
    domain: "www.dynamic-hosts-loader-test.com",     // Full Domain Name
    routes: [
            // list of routes
            {
                url: "/test1",
                method: "GET",      // e.g. GET, POST, PUT, DELETE, 
                middlewares:    [], // array of middlewares
                end:    endFunction     // the last output function.
            },
            {
                url: "/test2",
                method: "GET",      // e.g. GET, POST, PUT, DELETE, 
                middlewares:    [middleware1, middleware2], // array of middlewares
                end:    endFunction     // the last output function.
            },
    ]
}