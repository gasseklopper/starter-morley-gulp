# Gulp starter-morley-gulp

Basic structure for HTML templating with Nunjucks. Including a gulp-sass-workflow, gulp-js-workflow, gulp-browsersync-workflow.

## Basic Setup

1.  Clone / Download

2.  Install dependencies

```
$ npm install
```

3.  Run on `http://localhost:3000/`

```
$ gulp
```

## Gulp tasks

```
$ gulp start (default task)
```

Watches for changes to scss, js and nunjucks (njk) files. Compiles and reloads browser on save.

```
$ gulp scssTask
```

Compiles sass to css.

```

$ gulp jsTask
```

Compiles js to babelify, browserify js


```
$ gulp build
```

Runs any compiling tasks.