"use strict";

// NB: This gulp file is intended to be used with Gulp 4.x and won't
// work with Gulp 3.x or below.
var _ = require("lodash"),
    browserify = require("browserify"),
    buffer = require("vinyl-buffer"),
    del = require("del"),
    ecstatic = require("ecstatic"),
    gulp = require("gulp"),
    gutil = require("gulp-util"),
    http = require("http"),
    less = require("gulp-less"),
    path = require("path"),
    source = require("vinyl-source-stream"),
    sourcemaps = require("gulp-sourcemaps"),
    ts = require('gulp-typescript'),
    typescript = require('typescript');


/* LESS */

gulp.task("build-less", function() {
  return gulp.src("./less/**/*.less")
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./pub/css"));
});

gulp.task("watch-less",function() {
  return gulp.watch("./less/**/*.less", gulp.series("build-less"));
});


/* TypeScript */

var tsProject = ts.createProject('./ts/tsconfig.json', {
  sortOutput: true,
  typescript: typescript
});

gulp.task("build-ts", function() {
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./pub/js"));
});

gulp.task("watch-ts", function() {
  return gulp.watch("./ts/**/*.{ts,tsx}", gulp.series("build-ts"));
});


/* Browserify bundle (for vendor files) */

gulp.task("build-vendor", function() {
  var opts = {
    entries: ['./vendor.js'],

    // Debug => true, get sourceMaps
    debug: true,

    // Full Paths => easier to debug
    fullPaths: true
  };

  var bundler = browserify(opts);
  return bundler.bundle()
    .on('error', gutil.log)
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./pub/js'));
});


/* Our uncompiled assets */

gulp.task("build-assets", function() {
  return gulp.src("assets/**/*.*")
    .pipe(gulp.dest("./pub"));
});

gulp.task("watch-assets", function() {
  return gulp.watch("assets/**/*.*", gulp.series("build-assets"));
});


/* Bootstrap fonts */

gulp.task("build-fonts", function() {
  return gulp.src([
    "./node_modules/bootstrap/fonts/**/*.*"
  ]).pipe(gulp.dest("./pub/fonts"));
});


/* Misc stuff for Jasmine test runner */

var JASMINE_ROOT = "./node_modules/jasmine-core/lib/jasmine-core";
gulp.task("build-jasmine-js", function() {
  var jasmineJs = _.map([
    "jasmine.js",
    "jasmine-html.js",
    "boot.js"
  ], function(fn) {
    return path.join(JASMINE_ROOT, fn);
  });
  return gulp.src(jasmineJs).pipe(gulp.dest("./pub/js"));
});

gulp.task("build-jasmine-css", function() {
  var jasmineCss = _.map([
    "jasmine.css"
  ], function(fn) {
    return path.join(JASMINE_ROOT, fn);
  });
  return gulp.src(jasmineCss).pipe(gulp.dest("./pub/css"));
});

gulp.task("build-jasmine",
  gulp.parallel("build-jasmine-js", "build-jasmine-css"));


/* Dev server */

gulp.task("dev-server", function(cb) {
  var port = 5000;
  http.createServer(
    ecstatic({ root: path.resolve("./pub"),
               contentType: 'text/html' })
  ).listen(port);
  console.log("Dev server listening at http://localhost:" + port);
  cb();
});

gulp.task("api-server", function(cb) {
  require("./server");
  cb();
});


////

gulp.task("clean", function() {
  return del(["./pub"]);
});

gulp.task("build", gulp.series("clean",
  gulp.parallel("build-assets",
                "build-fonts",
                "build-jasmine",
                "build-vendor",
                "build-ts",
                "build-less")));

gulp.task("watch", gulp.series("build",
  gulp.parallel(
    "api-server",
    "dev-server",
    "watch-ts",
    "watch-less",
    "watch-assets"
  )
));

gulp.task("default", gulp.series("build"));
