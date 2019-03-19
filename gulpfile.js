// Adiciona os modulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Funçao para compilar o SASS e adicionar os prefixos
function compilaSass() {
  return gulp
  .src('css/scss/**/*.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream());
}

// Tarefa de gulp para a função de SASS
gulp.task('sass', function(done){
  compilaSass();
  done();
});

// Função para juntar o JS
function gulpJS() {
  return gulp
  .src('js/main/*.js')
  .pipe(concat('main.js'))
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream())
}

gulp.task('mainjs', gulpJS);

// JS Plugins
function pluginJS() {
  return gulp
  .src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/owl-carousel/dist/owl.carousel.js',
	'node_modules/bootstrap/dist/js/bootstrap.min.js',
	'node_modules/scrollreveal/dist/scrollreveal.min.js',
	'node_modules/slick-carousel/slick/slick.min.js',
	'node_modules/instafeed.js/instafeed.min.js'
  ])
  .pipe(concat('plugins.js'))
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream())
}

gulp.task('pluginjs', pluginJS);

// JS Plugins
function pluginCSS() {
	return gulp
	.src([
		'node_modules/bootstrap/dist/css/bootstrap.min.css',
		'node_modules/owl-carousel/dist/assets/owl.carousel.css',
		'node_modules/owl-carousel/dist/assets/owl.theme.default.css',
		'node_modules/slick-carousel/slick/slick.css'
	])
	.pipe(concat('_plugins.scss'))
	.pipe(gulp.dest('css/scss/'))
	.pipe(browserSync.stream())
  }
  
  gulp.task('plugincss', pluginCSS);

// Função para iniciar o browser
function browser() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}

// Tarefa para iniciar o browser-sync
gulp.task('browser-sync', browser);

// Função de watch do Gulp
function watch() {
  gulp.watch('css/scss/**/*.scss', compilaSass);
  gulp.watch('js/main/*.js', gulpJS);
  gulp.watch('js/plugins/*.js', gulpJS);
  gulp.watch(['*.html']).on('change', browserSync.reload);
}

// Inicia a tarefa de watch
gulp.task('watch', watch);

// Tarefa padrão do Gulp, que inicia o watch e o browser-sync
gulp.task('default', gulp.parallel('sass', 'mainjs','plugincss', 'pluginjs', 'watch', 'browser-sync'));