/* =============================================================================
    @author: Kishan Nirghin
    @date:  22th june 2017
    @description: A gulp file that should cover the basics of webdevelopment

    @folders: The expected folder structure of a project looks like this
        /source
            /scss
            /js
        /public
            /css
            /js
            /media
============================================================================= */
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass   = require('gulp-sass');


/* spawn a browsersync object (needed for automatic refreshing) */
var browserSync = require('browser-sync').create();


/*  Watches scss folder for changes in scss files
*    -> Recompiles scss into the corresponding folder
*/
gulp.task('build-css', function() {
    return gulp.src('./source/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'));
});


/* Moves over the html files to the right folder */
gulp.task('build-html', function(){
    return gulp.src('./source/**/*.html')
        .pipe(gulp.dest('./public'));
});

/* Creates a browsersync browser instance */
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './public'
        },
    });
});


/* Start watching all
*   - First compiles everything
*   - Then sets up watchers for css
*/
gulp.task('watch', ['browserSync', 'build-html', 'build-css'], function(){
    gulp.watch('./source/**/*.html', ['build-html']);
    gulp.watch('./public/**/*.html', browserSync.reload);
    gulp.watch('./source/scss/**/*.scss', ['build-css']);
    gulp.watch('./public/css/**/*.css', browserSync.reload);
});
