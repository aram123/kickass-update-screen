// Include gulp
var gulp = require('gulp');
// Include plugins
var concat = require('gulp-concat');
// Concatenate JS Files
gulp.task('scripts', function() {
    return gulp.src(['public/javascripts/jquery.js','public/javascripts/dat.gui.js','public/javascripts/perlin.js','public/javascripts/index.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/build/js'));
});
// Default Task
gulp.task('default', ['scripts']);
