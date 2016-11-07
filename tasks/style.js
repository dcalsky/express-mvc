import gulp from 'gulp'
import gutil from 'gulp-util'
import sugarss from 'sugarss'
import gulpLoadPlugins from 'gulp-load-plugins'
import autoprefixer from 'autoprefixer'

const $ = gulpLoadPlugins()
const AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.3',
  'bb >= 10',
]

gulp.task('style', (cb) => {
  return gulp.src(['app/static/**/styles/*.styl'])
    .pipe($.newer('dist'))
    .pipe($.sourcemaps.init())
    .pipe($.postcss([autoprefixer(AUTOPREFIXER_BROWSERS)], { parser: sugarss }))
    .on('error', gutil.log)
    .on('error', cb)
    .pipe($.rename({ extname: '.css' }))
    .pipe($.cssnano())
    .pipe($.size({ title: 'styles' }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
})

gulp.task('copy', () => {
  return gulp.src('app/static/**/styles/*.css')
    .pipe($.newer('dist'))
    .pipe($.cssnano())
    .pipe(gulp.dest('dist'))
})