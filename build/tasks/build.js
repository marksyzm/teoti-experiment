'use strict';

var gulp = require('gulp');

gulp.task('build', ['webpack:build']);
gulp.task('default', ['build']);
