import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import less from 'postcss-less-engine'
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
    'bb >= 10'
]

gulp.task('style', () => {
    return gulp.src([
        'app/static/styles/**/*.less',
        'app/static/styles/**/*.css'
    ])
      .pipe($.newer('dist/styles'))
      .pipe($.sourcemaps.init())
      .pipe($.postcss([
          less(),
          autoprefixer(AUTOPREFIXER_BROWSERS)
      ], {parser: less.parser}))
      .pipe($.rename({extname: '.css'}))
      .pipe($.cssnano())
      .pipe($.size({title: 'styles'}))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest('dist/styles'))
})
