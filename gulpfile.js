const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

function sassCompiler(){
	return gulp.src('./css/sass/*.scss')
	.pipe(sass())
	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
	.pipe(gulp.dest('./css/'))
	.pipe(browserSync.stream())
}
gulp.task('sass', sassCompiler);

function gulpJS(){
	return gulp.src('./js/scripts/*.js')
	.pipe(concat('main.js'))
    .pipe(babel({
            presets: ['env']
    }))
    .pipe(uglify())
	.pipe(gulp.dest('./js/'))
	.pipe(browserSync.stream())
}

gulp.task('mainjs', gulpJS);

function pluginJS(){
	return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js'])
	.pipe(gulp.dest('./js/scripts/'))
}

gulp.task('pluginjs', pluginJS)

function pluginCSS(){
	return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css'])
	.pipe(gulp.dest('./css/'))
}

gulp.task('plugincss', pluginCSS)

function imageMin(){
	return gulp.src('./img/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./img/'))
}

gulp.task('imagemin', imageMin)

function browser() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	})
}

gulp.task('browser-sync', browser)

function watch(){
	gulp.watch('./css/**/*.scss', sassCompiler);
	gulp.watch('./js/*.js', gulpJS);
	gulp.watch('./*.html').on('change', browserSync.reload);
}

gulp.task('watch', watch)


gulp.task('default', gulp.parallel('watch', 'browser-sync', 'pluginjs', 'plugincss','imagemin' ))
