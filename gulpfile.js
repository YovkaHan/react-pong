/**
 * Created by Oakley Hall on 6/16/15.
 */
'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var del = require('del');

gulp.task('build', ['clean', 'app', 'styles']);

gulp.task('clean', function (cb) {
  del([ 'dist/**/*/*'], cb);
});

gulp.task('styles', function () {
  return gulp.src('src/styles/**/*.*')
  .pipe(gulp.dest('dist'));
});


gulp.task('app', function () {
  browserify({
    entries: 'src/index.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.*', ['build']);
});

gulp.task('default', ['build', 'assets']);
