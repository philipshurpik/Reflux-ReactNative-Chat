var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var concatCss = require('gulp-concat-css');

gulp.task('scripts', function() {
    browserify({
        entries: './index.web.js',
        extensions: ['.js'],
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.web.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('css', function() {
    return gulp.src('./assets/css/**/*.css')
        .pipe(concatCss("css/bundle.web.css", { rebaseUrls: false }))
        .pipe(gulp.dest('build'));
});

gulp.task('icons', function() {
    return gulp.src('./assets/fonts/**.*')
        .pipe(gulp.dest('build/fonts/'));
});

gulp.task('server', function() {
    connect.server({
        port: 1906
    });
});

gulp.task('watch', function() {
    gulp.watch('src/**', ['scripts']);
    gulp.watch('./assets/css/**/*.css', ['css']);
});

gulp.task('src', ['scripts', 'css', 'icons']);

gulp.task('build', ['src', 'server']);
gulp.task('default', ['src', 'watch', 'server']);
