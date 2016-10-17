import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
const $ = gulpLoadPlugins()

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