"use strict";

module.exports = function nodemon(grunt) {
	grunt.loadNpmTasks("grunt-nodemon");

	return {
	    dev: {
	        script: "index.js",
	        options: {
	            callback: function (nodemon) {
	                nodemon.on("log", function (event) {
	                    console.log(event.colour);
	                });
	            },
	            ignore: [
	                "node_modules/**/*.js",
	                "public/js/**"
	            ]
	        }
	    }
	};	
};