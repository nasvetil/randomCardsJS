const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const server = require('browser-sync').create();
const del = require('del');

// Plugins for css and less
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');

// Plugins for html
const posthtml = require('gulp-posthtml');
const minifier = require('posthtml-minifier');

// Plugins for js
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('html', () => {
  const plugins = [
    minifier({
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeComments: true
    })
  ];
  const options = {};

  return gulp.src('src/html/*.html')
    .pipe(
      posthtml(plugins, options)
    )
    .pipe(gulp.dest('build'));
});

gulp.task('less', () => {
  return gulp.src('src/less/style.less')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss(
      [
        autoprefixer()
      ]
    ))
    .pipe(csso())
    .pipe(rename(
      {
        suffix: '.min'
      }
    ))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('normalize', () => {
  return gulp.src('src/css/normalize.min.css')
    .pipe(gulp.dest('build/css'));
});

gulp.task('js', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename(
      {
        suffix: '.min'
      }
    ))
    .pipe(gulp.dest('build/js'));
});

gulp.task('server', () => {
  server.init({
    server: 'build/'
  });

  gulp.watch('src/html/*.html', gulp.series('html'));
  gulp.watch('src/html/*.html').on('change', server.reload);

  gulp.watch('src/less/**/*.less', gulp.series('less'));
  gulp.watch('src/less/**/*.less').on('change', server.reload);

  gulp.watch('src/js/**/*.js', gulp.series('js'));
  gulp.watch('src/js/**/*.js').on('change', server.reload);
});

gulp.task('clean', () => {
  return del('build');
});

gulp.task('build', gulp.parallel('html', 'less', 'normalize', 'js'));
gulp.task('re', gulp.series('clean', 'build'));
gulp.task('start', gulp.series('build', 'server'));
