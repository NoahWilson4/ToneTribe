var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');

////// jade?

var paths = {
	scripts: 'public/scripts/lib/**/*.js',
	scriptsDest: 'public/scripts',
	styles: 'public/styles/lib/**/*.css',
	stylesDest: 'public/styles',
};

gulp.task('scripts', function(){
	gulp.src(paths.scripts)
	 .pipe(concat('main.js'))
	 .pipe(uglify())
	 .pipe(gulp.dest(paths.scriptsDest))
	 .pipe(livereload({ auto: false }))
});

gulp.task('styles', function(){
	gulp.src(paths.styles)
	 .pipe(concat('main.css'))
	 .pipe(minifyCSS())
	 .pipe(gulp.dest(paths.stylesDest))
	 .pipe(livereload({ auto: false }))
});


// type gulp watch in the command line
gulp.task('watch', function(){
	livereload.listen();
	gulp.watch(paths.scripts, ['scripts']).on('change', livereload.changed);
	gulp.watch(paths.styles, ['styles']).on('change', livereload.changed);
})

//the task 'default' can be run with just 'gulp' on the command line.  this will run all the scripts in the array
//keep it running in the background
gulp.task('default', ['scripts', 'styles']);
