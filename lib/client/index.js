"use strict";

var path        = require("path"),
    express     = require("express"),
    session     = require("express-session"),
    //validate    = require("express-validation"),
    bodyParser  = require("body-parser");

var auth        = require("./authentication");

var config      = require("./config"),
    routes      = require("./routes"),
    publicDir   = path.resolve("../" + config.get("html:path")),
    views       = path.resolve("../" + config.get("html:views")),
    app         = express();

app.set("view engine", "ejs");
app.set("views", views);
app.set("view options", { layout: views + "/layout.ejs", root: views });
app.set("host", config.get("express:host"));
app.set("port", config.get("express:port"));
app.set("name", config.get("express:name"));

app.use( session({
    secret: config.get("express:session:secret"),
    resave: config.get("express:session:resave"),
    saveUninitialized : config.get("express:session:saveUninitialized")
}));

app.use(express.static(views));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth.passport.initialize());
app.use(auth.passport.session());

for (var route in routes) {
    app.use(route === "/feed" ? "/" : "/"+route, routes[route].router);
}

// note: this returns the http server that can be used with socket.io
//var server = app.listen(app.get("port"));
app.listen(app.get("port"));