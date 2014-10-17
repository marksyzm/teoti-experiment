"use strict";

module.exports = function html_validation(grunt) {
	grunt.loadNpmTasks("grunt-html-validation");

	return {
	    options: {
	        reset: true,
	        wrapfile: "public/views/layout.ejs",
	        reportpath: false,
	        relaxerror: [

	            "Section lacks heading. Consider using h2-h6 elements to add identifying headings to all sections.",
	            //not supporting IE7
	            "Attribute href without an explicit value seen. The attribute may be dropped by IE7.",
	            //not really working well for partials
	            "Consider using the h1 element as a top-level heading only (all h1 elements are treated as top-level headings by many screen readers and other tools).",
	            //ignore EJS stuff
	            "Bad character % after <. Probable cause: Unescaped <. Try escaping it as &lt;."
	        ]
	    },
	    files: {
	        src: [
	            "public/views/partials/**/*.html",
	            "public/views/partials/**/*.ejs"
	        ]
	    }
	};
};
