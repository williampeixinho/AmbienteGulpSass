const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css'
  },
  html: {
    src: './*.html'
  }
};

function styles() {
  return src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  watch(paths.styles.src, styles);
  watch(paths.html.src).on('change', browserSync.reload);
}

const build = series(styles);
const dev = series(build, serve);

exports.styles = styles;
exports.build = build;
exports.default = dev;
