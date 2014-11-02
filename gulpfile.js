var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var minifycss = require('gulp-minify-css');
var jade = require('gulp-jade');

////// jade?

var paths = {
	scripts: 'public/scripts/lib/**/*.js',
	scriptsDest: 'public/scripts',
	styles: 'public/styles/lib/**/*.css',
	stylesDest: 'public/styles',
	templates: '/views/**/*.jade',
	templatesDest: '/views'
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
	 .pipe(minifycss())
	 .pipe(gulp.dest(paths.stylesDest))
	 .pipe(livereload({ auto: false }))
});

gulp.task('templates', function(){
	gulp.src(paths.templates)
	 .pipe(jade(paths.templates))
	 .pipe(gulp.dest(paths.templatesDest))
	 .pipe(livereload({ auto: false }))
})


// type gulp watch in the command line
gulp.task('watch', function(){
	livereload.listen();
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.styles, ['styles']);
	gulp.watch(paths.templates, ['templates']);
})

//the task 'default' can be run with just 'gulp' on the command line.  this will run all the scripts in the array
//keep it running in the background
gulp.task('default', ['scripts', 'styles', 'templates']);
