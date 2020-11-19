var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant');


gulp.task('sass', function() {
	return gulp.src('sass/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('css'))
});


gulp.task('scripts', function() {
	return gulp.src([
		'js/jquery.min.js',
		'js/jcarousel.min.js',
		'js/jquery.validate.min.js',
		'js/hammer.min.js',
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('js'));
});


gulp.task('img', function() {
	return gulp.src('img/**')
	.pipe(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		une: [pngquant()]
	}))
	.pipe(gulp.dest('img_two'));
});


gulp.task('watch', function() {
	gulp.watch('sass/*.sass', ['sass']);
});