"use strict";

var path        = require("path");
var express     = require("express");
var flash       = require("connect-flash");
var bodyParser  = require("body-parser");

var auth        = require("./authentication");
var config      = require("./../shared/config");
var routes      = require("./routes");
var middleware  = require("./middleware");
var app         = express();

require("node-jsx").install({ extension: ".jsx" });

app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.set("views", path.resolve(config.get("html:views")));
app.set("host", config.get("express:host"));
app.set("port", config.get("express:port"));
app.set("name", config.get("express:name"));

app.use(middleware.session);
app.use(middleware.noCache);
app.use(express.static(path.resolve(config.get("html:docroot"))));
app.use("/views", express.static(path.resolve(config.get("html:templates")+"/"+config.get("template"))));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(auth.passport.initialize());
app.use(auth.passport.session());

//app.param("forumSlug", middleware.forumSlug);

for (var route in routes) {
    if (route === "forum") { continue; }
    app.use("/"+route, routes[route].router);
}
app.use("/", routes.forum.router);
app.use(middleware.error);

app.listen(app.get("port"));
console.info(app.get("name")+" server running in port #"+app.get("port"));