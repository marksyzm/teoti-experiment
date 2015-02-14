/*jshint unused:false*/

"use strict";

var middleware = {
    error: function(err, req, res, next){
        res.status(400).json(err);
    }
};

module.exports = middleware;
