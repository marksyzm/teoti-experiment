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