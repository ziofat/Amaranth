var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babel = require('babelify');

function compile(watch) {
	var bundler = browserify('./index.js', { debug: true, standalone: 'amaranth' })
		.transform(babel.configure({
			presets: ['es2015']
		}));

	function rebundle() {
		bundler.bundle()
			.on('error', function(err) { console.error(err); this.emit('end'); })
			.pipe(source('amaranth.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./dist'));
	}

	rebundle();
}

gulp.task('build', function() { return compile(); });

gulp.task('default', ['build']);
