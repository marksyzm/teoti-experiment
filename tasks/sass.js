var gulp = require('gulp');
var sass = require('gulp-sass');
var sourceMaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp.src('./public/sass/style.scss')
        .pipe(sourceMaps.init())
        .pipe(sass())
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest('./public/css/'));
});