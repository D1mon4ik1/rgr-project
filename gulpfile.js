"use strict";

const {src, dest} = require("gulp");
const gulp = require("gulp");
const concat = require("gulp-concat");
const cssnano = require("gulp-cssnano");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const del = require("del");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const beautify = require("gulp-cssbeautify");
const browseSync = require("browser-sync");

const srcPath = "src/";
const distPath = "dist/";

const path = {
    build: {
        html:   distPath,
        pages:  distPath + "assets/pages/",
        css:    distPath + "assets/css/",
        js:     distPath + "assets/js/",
        images: distPath + "assets/images/",
        jQuery_ui: distPath + "assets/jQuery_ui",
    },
    src: {
        html:   srcPath + "*.html",
        pages:  srcPath + "assets/pages/*.html",
        css:    srcPath + "assets/scss/*.scss",
        js:     srcPath + "assets/js/*.js",
        images: srcPath + "assets/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,xml,json}",
        jQuery_ui: srcPath + "assets/jQuery_ui/**/*.{min.css,min.js,png,js}",
    },
    watch: {
        html:   srcPath + "**/*.html",
        pages:  srcPath + "assets/pages/**/*.html",
        css:    srcPath + "assets/scss/**/*.scss",
        js:     srcPath + "assets/js/**/*.js",
        images: srcPath + "assets/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,xml,json}",
        jQuery_ui: srcPath + "assets/jQuery_ui/**/*.{min.css,min.js,png,js}",
    },
    clean: "./" + distPath
}

function serve() {
    browseSync.init({
        server: {
            baseDir: "./" + distPath
        }
    })
}

function html() {
    return src(path.src.html, {base: srcPath})
        .pipe(plumber())
        .pipe(dest(path.build.html))
        .pipe(browseSync.reload({stream: true}))
}
function pages() {
    return src(path.src.pages, {base: srcPath + "assets/pages/"})
        .pipe(plumber())
        .pipe(dest(path.build.pages))
        .pipe(browseSync.reload({stream: true}))
}
function css() {
    return src(path.src.css, {base: srcPath + "assets/scss/"})
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "SCSS Error",
                    message: "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(concat('main.css'))
        .pipe(sass({
            includePaths: './node_modules'
        }))
        .pipe(beautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zIndex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browseSync.reload({stream: true}))
}
function js() {
    return src(path.src.js, {base: srcPath + "assets/js/"})
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "JS Error",
                    message: "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(concat('main.js'))
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browseSync.reload({stream: true}))
}
function images() {
    return src(path.src.images, {base: srcPath + "assets/images/"})
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest(path.build.images))
        .pipe(browseSync.reload({stream: true}))
}
function jQuery_ui(){
    return src(path.src.jQuery_ui, {base: srcPath + "assets/jQuery_ui/"})
        .pipe(dest(path.build.jQuery_ui))
        .pipe(browseSync.reload({stream: true}))
}
function clean() {
    return del(path.clean)
}
function watchFiles() {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.images], images)
    gulp.watch([path.watch.jQuery_ui], jQuery_ui)
}

const build = gulp.series(clean, gulp.parallel(html, pages, css, js, images, jQuery_ui))
const watch = gulp.parallel(build, watchFiles, serve)

exports.html = html
exports.pages = pages
exports.css = css
exports.js = js
exports.images = images
exports.jQuery_ui = jQuery_ui
exports.clean = clean
exports.build = build
exports.watch = watch
exports.default = watch