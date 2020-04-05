//initialize task Modules
const { src, dest, series, parallel, watch} = require('gulp')
// initialize  Modules
const autoprefixer 		= require('gulp-autoprefixer')
const babelify 			= require('babelify')
const browserify 		= require('browserify')
const buffer 			= require('vinyl-buffer')
const cleancss 			= require('gulp-clean-css')
const csscomb 			= require('gulp-csscomb')
const cssnano 			= require('gulp-cssnano')
const data 				= require('gulp-data')
const fs 				= require('fs')
const malvid 			= require('malvid')
const nunjucksRender 	= require('gulp-nunjucks-render')
const pAll 				= require('p-all')
const pug 				= require('gulp-pug')
const postcss 			= require('gulp-postcss')
const rename 			= require('gulp-rename')
const replace 			= require('gulp-replace')
const sourcemaps 		= require('gulp-sourcemaps')
const source 			= require('vinyl-source-stream')
const sass 				= require('gulp-sass')
const uglify 			= require('gulp-uglify')
const util 				= require('util')
const del 				= require('del')

//browser-sync Modules
const browserSync = require('browser-sync').create()

// File Path variables
const paths = {
	jsSRC: './assets/js/script.js',
	jsSRC_folder: './assets/js/**/*.js',
	jsDIST: './dist',
	styleWatch:  './assets/scss/**/*.scss',
	styleDist:  './dist/assets/css',
	nunjucksWatch: './app/**/*',
}
// Javascript source array
const jsFILES = [paths.jsSRC]
const clean_assets = () => del(['dist/assets']);
//Sass Task
function scssTask(done){
	console.log('Rendering scss files..')
	return src(paths.styleWatch)
		.pipe(sourcemaps.init() )
		.pipe(sass({outputStyle: 'compact', precision: 10}).on('error',sass.logError))
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

//Js Task
function jsTask(done){
	console.log('Rendering javaScript files..')
	jsFILES.map(function( entry ){
		return browserify({
			entries: [entry]
		})
			.transform( babelify,
				{
					presets: ['env'],
					sourceMaps: true,
					global: true,
					ignore: /\/node_modules/
				})
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

// Renders Nunjucks
function nunjucksTask(done){
	console.log('Rendering nunjucks files..')
	return src("./app/pages/**/*.+(html|njk)")
		.pipe(
			data(() => {
				return require("./app/data.json")
			})
		)
		.pipe(nunjucksRender({
			path: ['./app/templates'] // String or Array
		}))
		.pipe(dest('dist'))
		done()

}

// Callback when ready reload browsersync
function reload(done) {
	console.log('browserSync reloading files..')
	browserSync.reload()
	done()
}

// SERVE Tasks
function serve(done) {
	console.log('Start watching...')
	browserSync.init({
		server: {baseDir: './dist'}
	})
	done()
}

// Watch Tasks
const watch_nunjucks = () => watch(paths.nunjucksWatch, series(nunjucksTask, reload))
const watch_scss = () => watch(paths.styleWatch, series(scssTask, reload))
const watch_js =   () => watch(paths.jsSRC_folder, series(jsTask, reload));

// Run default Task 'gulp'
exports.default = series(
	clean_assets,
	parallel(scssTask, jsTask, nunjucksTask),
	serve,
	parallel(watch_scss, watch_js, watch_nunjucks),
)

// Run Tasks 'gulp scssTask', 'gulp jsTask'...
exports.scssTask = scssTask
exports.jsTask = jsTask
exports.nunjucksTask = nunjucksTask
exports.serve = serve
