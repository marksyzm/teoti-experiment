"use strict";

var path        = require("path");
var express     = require("express");
var flash       = require("connect-flash");
var bodyParser  = require("body-parser");
var ejsLayouts  = require("express-ejs-layouts");
var auth        = require("./authentication");
var config      = require("./../shared/config");
var routes      = require("./routes");
var middleware  = require("./middleware");
var templateUrl = config.get("html:templates")+"/"+config.get("template");
var app         = express();

app.engine("html", require("ejs").__express);
app.set("view engine", "html");
app.set("views", templateUrl);
app.set("layout", "layouts/default.html");
app.set("host", config.get("express:host"));
app.set("port", config.get("express:port"));
app.set("name", config.get("express:name"));

app.use(ejsLayouts);
app.use(middleware.session);
app.use(middleware.noCache);
app.use(express.static(config.get("html:docroot")));
app.use("/views", express.static(templateUrl));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(auth.passport.initialize());
app.use(auth.passport.session());
Object.keys(routes)
    .filter(function (route) { return route !== 'app'; })
    .forEach(function (route) { app.use('/' + route, routes[route].router); });
app.use("/", routes.app.router);
app.use(middleware.error);

app.listen(app.get("port"));
console.info(app.get("name")+" server running in port #"+app.get("port"));