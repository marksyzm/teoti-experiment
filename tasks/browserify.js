'use strict';

// ** Core Modules **
var path = require('path');

// ** 3rd Party Modules **
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var _ = require('lodash');

var browserifyOptions = {
    delay: 1000,
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true,
    watch: true,
    entries: [ './public/js/src/app.js' ]
};

function handleErrors() {
    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, arguments);
    this.emit('end'); // Keep gulp from hanging on this task
}

function bundle(bundler, targetFileName) {
    gutil.log('Rebundle...');
    return bundler.bundle()
        .on('error', handleErrors)
        .on('end', function () {
            gutil.log('Bundlified.');
        })
        .pipe(source(path.join('./', targetFileName)))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./public/js/'));
}

gulp.task('browserify-watch', function() {
    var bundler = watchify(browserify(browserifyOptions));
    bundler.on('update', function () {
        bundle(bundler, 'app.js');
        gutil.log('Bundlifying...');
    });
    return bundle(bundler, 'app.js');
});

gulp.task('browserify', function () {
    return bundle(browserify(browserifyOptions), 'app.js');
});