var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');

gulp.task('scripts', function() {
    browserify({
        entries: './index.web.js',
        extensions: ['.js'],
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('server', function() {
    connect.server({
        port: 1906
    });
});

gulp.task('watch', function() {
    gulp.watch('src/**', ['scripts']);
});

gulp.task('build', ['scripts', 'server']);
gulp.task('default', ['scripts', 'watch', 'server']);
