'use strict';

module.exports = function mochacli(grunt) {
	grunt.loadNpmTasks('grunt-mongoimport');

	return {
        options: {
        db : 'rps',
        collections : [
          {
            name : 'csvmaps', 
            type : 'json', 
            file : 'test/fixtures/csvmap.json', 
            jsonArray : true,  
            upsert : true, 
            drop : true  
          }
        ]
      }
  };
};