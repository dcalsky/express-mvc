import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import browserSync from 'browser-sync'
const $ = gulpLoadPlugins()

gulp.task('lint', () => {
  gulp.src('app/**/*.js')
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failOnError()))
})

gulp.task('script', () => {
    gulp.src('app/static/scripts/**/*.js')
      .pipe($.newer('dist/scripts'))
      .pipe($.sourcemaps.init())
      .pipe($.babel())
      .pipe($.uglify({preserveComments: 'license'}))
      .pipe($.size({title: 'scripts'}))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest('dist/scripts'))
})