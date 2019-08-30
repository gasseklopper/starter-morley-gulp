//initialize Modules
const { src, dest, series, parallel, watch} = require('gulp')
// Scss Modules
const autoprefixer = require('gulp-autoprefixer')
const babelify = require('babelify')
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const cleancss = require('gulp-clean-css')
const csscomb = require('gulp-csscomb')
const cssnano = require('gulp-cssnano')
const pug = require('gulp-pug')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const sourcemaps = require('gulp-sourcemaps')
const source = require('vinyl-source-stream')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')

//brsowser-sync Modules
const browserSync = require('browser-sync').create()

// File Path variables
const paths = {
  _js: './assets/js/**/*.js',
  doc: './docs/src/scss/*.scss',
  jsSRC: './assets/js/script.js',
  jsDIST: './dist',
  styleWatch:  './assets/scss/**/*.scss',
  styleDist:  './dist/assets/css',
  styleSrc:  './assets/scss/**/*.scss',
}
// Javascript source array
const jsFILES = [paths.jsSRC]

//Sass Task
function scssTask(done){
	return src(paths.styleWatch)
		.pipe(sourcemaps.init() )
		.pipe(sass({outputStyle: 'compact', precision: 10}).on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(csscomb())
		.pipe(sourcemaps.write( './'))
		.pipe(dest(paths.styleDist))
		.pipe(cleancss())
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write( './'))
		.pipe(dest(paths.styleDist))
		done()
}

function jsTask(done){
	jsFILES.map(function( entry ){
		return browserify({
			entries: [entry]
		})
		.transform( babelify, {presets: ['env']})
		.bundle()
		.pipe( source( entry ))
		.pipe( rename( {extname: '.min.js'} ))
		.pipe( buffer())
		.pipe( sourcemaps.init({ loadMaps: true }))
		.pipe( uglify())
		.pipe( sourcemaps.write( './'))
		.pipe(dest(paths.jsDIST))
	})
	done()
}

function start(done) {
	browserSync.init({
		server: {
			baseDir: './'
		}
	})
	watch(paths.styleWatch, scssTask)
	watch('./*.html').on('change', browserSync.reload)
	watch('./assets/js/**/*.js').on('change', browserSync.reload)
	done()
}

exports.default = series(
	parallel(scssTask, jsTask)
)

exports.scssTask = scssTask
exports.jsTask = jsTask
exports.start = start
