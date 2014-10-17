"use strict";

module.exports = function sass(grunt) {
	grunt.loadNpmTasks("grunt-sass");

	return {
        dist: {
            options: {
                outputStyle: "compressed"
            },
            files: {
                "public/css/style.css": "public/css/style.scss"
            }
        },
        dev: {
            options: {
                sourceMap: true,
                outputStyle: "expanded",
                //set to true to show compass debug info
                debugInfo: false
            },
            files: {
                "public/css/style.css": "public/css/style.scss"
            }
        }
	};
};
