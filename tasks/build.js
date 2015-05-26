'use strict';

// ** 3rd Party Modules **
var gulp = require('gulp');

gulp.task('build', ['sass', 'browserify']);
gulp.task('default', ['build']);
