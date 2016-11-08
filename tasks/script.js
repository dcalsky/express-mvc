import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import gutil from 'gulp-util'
import sync from './watch'

const $ = gulpLoadPlugins()

gulp.task('lint', () => {
  gulp.src(['app/static/**/scripts/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!sync.active, $.eslint.failOnError()))
})

gulp.task('script', (cb) => {
  gulp.src(['app/static/**/scripts/*.js'])
    .pipe($.newer('dist'))
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .on('error', gutil.log)
    .on('error', cb)
    .pipe($.uglify({ preserveComments: 'license' }))
    .pipe($.size({ title: 'scripts' }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
})
