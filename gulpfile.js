'use strict';

var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var del = require('del');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var pug = require('gulp-pug');
var reload = browserSync.reload;
var stylus = require('gulp-stylus');

// Develop
// _______

gulp.task('develop', ['pug', 'stylus'], function() {
  var files = [
    'css/main.css',
    'index.html'
  ];

  browserSync.init(files, {
    server: {
      baseDir: 'src'
    },
  });

  gulp.watch('src/**/*.pug', ['pug', reload]);
  gulp.watch('src/**/*.styl', ['stylus', reload]);
});

gulp.task('pug', function() {
  return gulp.src('src/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('src'));
});

gulp.task('stylus', function () {
  return gulp.src('src/main.styl')
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest('src/css'));
});

// Build
// _____

gulp.task('clean:build', function() {
  return del.sync('build');
});

gulp.task('minify:css', function() {
  return gulp.src('src/css/*.css')
  .pipe(cssnano())
  .pipe(gulp.dest('build/css'));
});

gulp.task('minify:html', function() {
  return gulp.src('src/*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('build'));
});

gulp.task('images', function(){
  return gulp.src('src/img/*.+(png|jpg)')
  .pipe(gulp.dest('build/img'));
});

gulp.task('build', [
  'clean:build',
  'minify:css',
  'minify:html',
  'images'
  ], function () {
  console.log('Done');
});