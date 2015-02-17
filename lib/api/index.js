"use strict";

var Hapi = require("hapi"),
    routes = require("./routes");

var config = require("./config");

var host = config.get("api:host"),
    port = config.get("api:port");

var server = new Hapi.Server();
server.connection({
    host: host,
    port: port,
    routes: {
        validate: {
            options: { stripUnknown: true }
        }
    }
});

// Add all the routes within the routes folder
for (var route in routes) {
    server.route(routes[route]);
}

server.register([
    { register: require("./plugins/user"), options: {} },
    { register: require("./plugins/permissions"), options: {} }
], function (err) {
    if (err) { console.error("Failed to load a plugin:", err); }
});

module.exports = server;

if (process.env.NODE_ENV !== "test") {
    server.start();
    console.info("Server running in port #"+port);
}