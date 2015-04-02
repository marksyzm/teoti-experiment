"use strict";

module.exports = function watch(grunt) {
	grunt.loadNpmTasks("grunt-contrib-watch");

	return {
        sass: {
            files: ["public/css/**/*.scss", "public/sass/**/*.scss"],
            tasks: ["sass:dev"]
        },
        //validation: {
        //    files: ["public/views/**/*.html"],
        //    tasks: ["validation"]
        //},
        jshint: {
            files: [
                "public/js/src/**/*.js",
                "public/js/test/**/*.js",
                "lib/**/*.js",
                "index.js",
                "views/**/*.jsx",
                "public/views/**/*.jsx",
            ],
            tasks: ["jshint"]
        },
        server: {
            files: [
                "index.js",
                "lib/**/*.js",
                "views/**",
                "public/views/**",
            ],
            options: {
                autoreload: true,
                ignore: [
                    "node_modules/**/*.js",
                    "public/js/src/**/*.js",
                    "public/js/app.js"
                ]
            }
        }
    };
};