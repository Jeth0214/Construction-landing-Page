const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

//Sass tasks
function scssTask() {
    return src('app/scss/style.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('dist', { sourcemaps: '.' }));
}

// Javascript Task
function jsTask() {
    return src(['app/js/script.js', 'app/js/form.js'], { sourcemaps: true })
        .pipe(babel({ presets: ["@babel/preset-env"] }))
        .pipe(terser())
        .pipe(dest('dist', { sourcemaps: '.' }));
}

// Browsersync

function browserSyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: '.',
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0'
            },
        }
    });

    cb();
}

function browserSyncReload(cb) {
    browsersync.reload();
    cb();
}

// Watch Task Progress
function watchTask() {
    watch('*.html', browserSyncReload);
    watch(
        ['app/scss/**/*', '*.html', 'app/**/*.js'],
        series(scssTask, jsTask, browserSyncReload)
    );
}

// Deafault Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);