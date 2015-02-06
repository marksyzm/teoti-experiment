"use strict";

module.exports = function env(grunt) {
    grunt.loadNpmTasks("grunt-browserify");

    return {
        dev: {
            src: ["public/js/src/app.js"],
            dest: "public/js/app.js",
            options: {
                browserifyOptions: {
                    debug: true
                }
            }
        },
        dist: {
            src: ["public/js/src/app.js"],
            dest: "public/js/app.js",
            options: {
                browserifyOptions: {
                    debug: false
                }
            }
        }
    };
};