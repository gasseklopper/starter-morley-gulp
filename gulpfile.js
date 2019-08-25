const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const browserify = require('browserify')
const babelify = require('babelify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const uglify = require('gulp-uglify')

const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const cleancss = require('gulp-clean-css')
const csscomb = require('gulp-csscomb')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const pug = require('gulp-pug')

const paths = {
  _js: './assets/js/**/*.js',
  doc: './docs/src/scss/*.scss',
  jsSRC: './assets/js/script.js',
  jsDIST: './dist',
  styleWatch:  './assets/scss/**/*.scss',
  styleDist:  './dist/assets/css',
  styleSrc:  './assets/scss/**/*.scss',
}

const jsFILES = [paths.jsSRC]


// compile scss into css for browsersync workflow
function style() {
	// 1. wheree is my scss file
	return gulp.src(paths.styleWatch)
	.pipe( sourcemaps.init() )
	// 2. pass that file trogh my sass compiler
	.pipe(sass({outputStyle: 'compact', precision: 10}).on('error', sass.logError))
	.pipe(autoprefixer({
			cascade: false
		}))
	.pipe(csscomb())
	.pipe( sourcemaps.write( './'))
	// 3. where do I save the compiled CSS?
	.pipe(gulp.dest(paths.styleDist))
	// 4. stream changes to all browsers
	.pipe(browserSync.stream())

}

function js() {
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
		.pipe(gulp.dest(paths.jsDIST))

	})
}

// compile scss into css and minified for production
function build() {
	// 1. wheree is my scss file
	return gulp.src(paths.styleSrc)
	// 2. Init sourcemap
	.pipe( sourcemaps.init() )
	// 3. pass that file trough my sass compiler
	.pipe(sass({outputStyle: 'compact', precision: 10}).on('error', sass.logError))
	// 3a. use Prefixer
	.pipe(autoprefixer({
			cascade: false
		}))
	.pipe(csscomb())
	// 3. where do I save the compiled CSS?
	.pipe( sourcemaps.write( './'))
	.pipe(gulp.dest(paths.styleDist))
	.pipe(cleancss())
	.pipe(rename({
		suffix: '.min'
	}))
	// 4. where do I save the minified CSS?
	.pipe( sourcemaps.write( './'))
	.pipe(gulp.dest(paths.styleDist))

}

function watch() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	})
	gulp.watch(paths.styleWatch, style)
	gulp.watch('./*.html').on('change', browserSync.reload)
	gulp.watch('./assets/js/**/*.js').on('change', browserSync.reload)
}

exports.build = build
exports.js = js
exports.style = style
exports.watch = watch