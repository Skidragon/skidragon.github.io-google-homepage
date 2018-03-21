const gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    spriteSmith = require('gulp.spritesmith')
    gulpIf = require('gulp-if');

function customPlumber(errTitle) {
    return plumber({
        errorHandler: notify.onError({
            title: errTitle || 'Error running Gulp',
            message: 'Error: <%= error.message %>',
            sound: true
        })

    });
}

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'app',
        },
    })
});

gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(customPlumber('Error Running Sass'))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'nested',
            precision: 2
        }))
        .pipe(autoprefixer( {
            browsers: ['ie 9', 'last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true,
        }))
});

gulp.task('css-modules', function() {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', ['watch'], function() {
    console.log('everything is good to go!');
});