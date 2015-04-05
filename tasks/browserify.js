"use strict";

module.exports = function env(grunt) {
    grunt.loadNpmTasks("grunt-browserify");

    return {
        dev: {
            src: ["public/js/src/app.js"],
            dest: "public/js/app.js",
            options: {
                watch: true,
                browserifyOptions: {
                    debug: true
                },
                postBundleCB: function(err, src, cb) {
                    var through = require("through");
                    var stream = through().pause().queue(src).end();
                    var buffer = "";
                    stream.pipe(require("mold-source-map").transformSourcesRelativeTo(process.cwd()+"/public/js")).pipe(through(function(chunk) {
                        buffer += chunk.toString();
                    }, function() {
                        cb(err, buffer);
                    }));
                    stream.resume();
                }
            }
        },
        dist: {
            src: ["public/js/src/app.js"],
            dest: "public/js/app.js",
            options: {
                transform: ["uglifyify"],
                browserifyOptions: {
                    debug: false
                }
            }
        }
    };
};