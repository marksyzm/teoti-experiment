"use strict";

var Hapi = require("hapi"),
    routes = require("routes");

var config = require("./config");

var host = config.get("api:host"),
    port = config.get("api:port"),
    server = Hapi.createServer(host, port, {});

// Add all the routes within the routes folder
for (var route in routes) {
    server.route(routes[route]);
}

module.exports = server;

if (process.env.NODE_ENV !== "test") {
    server.start();
    console.log("Server running in port #"+port);
}