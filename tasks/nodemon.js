"use strict";

module.exports = function nodemon(grunt) {
    grunt.loadNpmTasks("grunt-nodemon");

    return {
        client: {
            script: "client.js",
            options: {
                callback: function (nodemon) {
                    nodemon.on("log", function (event) {
                        console.log(event.colour);
                    });
                },
                ignore: [
                    "node_modules/**/*.js",
                    "public/js/**",
                    "lib/api/**"
                ]
            }
        },
        api: {
            script: "api.js",
            options: {
                callback: function (nodemon) {
                    nodemon.on("log", function (event) {
                        console.log(event.colour);
                    });
                },
                ignore: [
                    "node_modules/**/*.js",
                    "public/js/**",
                    "lib/client/**"
                ]
            }
        }
    };
};