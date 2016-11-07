import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import sync from './watch'
const $ = gulpLoadPlugins()

gulp.task('lint', () => {
  gulp.src(['app/static/**/scripts/*.js', '!app/static/vendors'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!sync.active, $.eslint.failOnError()))
})

gulp.task('script', () => {
  gulp.src(['app/static/**/scripts/*.js', '!app/static/vendors'])
    .pipe($.newer('dist'))
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.uglify({preserveComments: 'license'}))
    .pipe($.size({title: 'scripts'}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
})
