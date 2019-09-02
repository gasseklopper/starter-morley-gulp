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

//browser-sync Modules
const browserSync = require('browser-sync').create()

// File Path variables
const paths = {
	jsSRC: './assets/js/script.js',
	jsDIST: './dist',
	styleWatch:  './assets/scss/**/*.scss',
	styleDist:  './dist/assets/css',
	nunjucksWatch: './app/**/*',
}
// Javascript source array
const jsFILES = [paths.jsSRC]

//Sass Task
function scssTask(done){
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

// Async Malvid UI Task
async function malvidTask(done){
	const results = await malvid({
		src: './app'
	})
	const html = await results.html()
	const json = await results.json()
	await pAll([
		() => util.promisify(fs.writeFile)('dist/index.html', html),
		() => util.promisify(fs.writeFile)('dist/index.html.json',  JSON.stringify(json))
	])
	done()
}

// Renders Nunjucks
function nunjucksTask(){
	console.log('Rendering nunjucks files..')
	return src("./app/**/**/*.+(html|njk)")
		.pipe(
			data(() => {
				return require("./app/pages/data.json");
			})
		)
		.pipe(nunjucksRender({
			path: ['./app/templates'] // String or Array
		}))
		.pipe(dest('dist'))
}

// Watch Tasks
function start(done) {
	console.log('Start watching...')
	browserSync.init({
		server: {baseDir: './dist'}
	})
	watch(paths.styleWatch, scssTask)
	watch(paths.nunjucksWatch, malvidTask)
	watch(paths.nunjucksWatch, nunjucksTask)
	watch('./assets/js/**/*.js').on('change', browserSync.reload)
	watch('./dist/index.html').on('change', browserSync.reload)
	watch('./dist/index.html.json').on('change', browserSync.reload)
	watch('./app//**/*.+(html|njk)').on('change', browserSync.reload)
	watch('./app/pages/**/*.+(html|njk)').on('change', browserSync.reload)
	watch('./app/templates/**/*.+(html|njk)').on('change', browserSync.reload)
	done()
}

// Run default Task 'gulp'
exports.default = series(
	parallel(scssTask, jsTask),
	malvidTask,
	start
)

// Run Tasks 'gulp scssTask', 'gulp jsTask'...
exports.scssTask = scssTask
exports.jsTask = jsTask
exports.malvidTask = malvidTask
exports.nunjucksTask = nunjucksTask
exports.start = start
