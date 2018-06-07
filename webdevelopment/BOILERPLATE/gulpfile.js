/* =============================================================================
    @author: Kishan Nirghin
    @date:  22th june 2017
    @description: gulpfile that covers the basic needs for webdevelopment

    @folders: The expected folder structure of a project looks like this
        /src
            /scss
            /ts
            /media
        /dist
            /css
            /js
            /media
============================================================================= */
var gulp  = require("gulp"),
    gutil = require("gulp-util"),
    sass   = require("gulp-sass"),
    ts = require("gulp-typescript"),
    autoprefixer = require("gulp-autoprefixer"),

    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');


/* spawn a browsersync object (needed for automatic refreshing) */
var browserSync = require("browser-sync").create();


/*  Watches scss folder for changes in scss files
*    -> Recompiles scss into the corresponding folder
*/
gulp.task("build-css", function() {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest("./dist/css"));
});


/* Moves over the html files to the right folder */
gulp.task("build-html", function(){
    return gulp.src("./src/**/*.html")
        .pipe(gulp.dest("./dist"));
});


/*  Watches ts folder for changes in ts files
*    -> Recompiles ts into the corresponding folder
*/
gulp.task("build-ts", function(){
    gulp.src("./src/ts/**/*.ts")
        .pipe(ts({
            noImplicitAny: true,
            out: "script.js"
        }))
        .pipe(gulp.dest("./dist/js"));
});

gulp.task('minify-css', function () {
    return gulp.src('./dist/css/style.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('minify-js', function () {
    return gulp.src('./dist/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js'));
});
gulp.task('minify-images', function () {
    gulp.src('./src/media/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/media/'))
});


/* Creates a browsersync browser instance */
gulp.task("browserSync", function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        browser: "google chrome"
    });
});


/* Start watching all
*   - First compiles everything
*   - Then sets up watchers for css
*/
gulp.task("watch", ["browserSync", "build-html", "build-css", "build-ts", "minify-images"], function(){
    gulp.watch("./src/**/*.html", ["build-html"]);
    gulp.watch("./dist/**/*.html", browserSync.reload);
    gulp.watch("./src/scss/**/*.scss", ["build-css"]);
    gulp.watch("./dist/css/**/*.css", browserSync.reload);
    gulp.watch("./src/ts/**/*.ts", ["build-ts"]);
    gulp.watch("./dist/js/**/*.js", browserSync.reload);
    gulp.watch("./src/media/**/*.*", ["minify-images"]);
    gulp.watch("./dist/media/**/*.*", browserSync.reload);
});

gulp.task("publish", ["build-html", "build-css", "build-ts", "minify-css", "minify-js", "minify-images"])
