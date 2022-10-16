const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber');

const css = ( done ) => {
    src('src/scss/**/*.scss')  // Identificar el archivo de sass
        .pipe( plumber() )
        .pipe( sass() )  // Compilar
        .pipe( dest('build/css') );  // Almacenarla en disco

    done();  // Callback que avisa a gulp cuando se termina de ejecutar la función
}


const dev = ( done ) => {
    watch('src/scss/**/*.scss', css);

    done();
}

exports.css = css;
exports.dev = dev;