"use strict";


module.exports = function jshint(grunt) {
    grunt.loadNpmTasks("grunt-contrib-jshint");

    return {
        options : {
            "node"          : true,
            "browser"       : true,
            "bitwise"       : true,
            "camelcase"     : true,
            "curly"         : true,
            "eqeqeq"        : true,
            "immed"         : true,
            "indent"        : 2,
            "latedef"       : "nofunc",
            "newcap"        : true,
            "noarg"         : true,
            "noempty"       : true,
            "nonew"         : true,
            "quotmark"      : "double",
            "undef"         : true,
            "unused"        : true,
            "strict"        : true,
            "trailing"      : true,
            "maxdepth"      : 3,
            "maxstatements" : 100,
            "maxcomplexity" : 20,
            "boss"          : true,
            "proto"         : false,
            "laxcomma"      : true,
            "validthis"     : true,
            "expr"          : true,
            "globals"       : {
                "beforeEach"  : true,
                "afterEach"   : true,
                "before"      : true,
                "after"       : true,
                "describe"    : true,
                "it"          : true,
                "angular"     : true,
                "Notification": true,
                "jQuery"      : false,
                "d3"          : false,
                "define"      : false,
                "google"      : false
            }
        },
        uses_defaults: [
            "lib/**/*.js",
            "index.js",
            "public/js/src/**/*.js",
            "public/js/test/**/*.js",
        ]
    };
};
