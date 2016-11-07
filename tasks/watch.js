import browserSync from 'browser-sync'
import gulp from 'gulp'

const sync = browserSync.create()
gulp.task('watch', () => {
  gulp.watch(['app/static/**/styles/**/*.{styl,css}'], ['style', 'copy'])
  gulp.watch(['app/static/scripts/**/*.js'], ['lint', 'script']);
})

export default sync
