const { src, dest, watch, parallel } = require("gulp");

// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


const imagenes = ( done ) => {
    const opciones = {
        optimizationLevel: 3
    };

    src('src/img/**/*.{jpg,png}')
        .pipe( cache(imagemin(opciones)) )
        .pipe( dest('build/img') );

    done();
}

const versionWebp = ( done ) => {

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{jpg,png}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') );

    done();
}

const versionAvif = ( done ) => {

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{jpg,png}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') );

    done();
}

const css = ( done ) => {
    src('src/scss/**/*.scss')  // Identificar el archivo de sass
        .pipe( sourcemaps.init() )
        .pipe( plumber() )
        .pipe( sass() )  // Compilar
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( sourcemaps.write('.') ) 
        .pipe( dest('build/css') );  // Almacenarla en disco

    done();  // Callback que avisa a gulp cuando se termina de ejecutar la función
}


const dev = ( done ) => {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);

    done();
}

const javascript = ( done ) => {
    src('src/js/**/*.js')
        .pipe( dest('build/js') );
    
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev );