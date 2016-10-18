import browserSync from 'browser-sync'
import gulp from 'gulp'
import runSequence from 'run-sequence'

let sync = browserSync.create()
const reload = sync.reload

gulp.task('watch', () => {
  gulp.watch(['app/static/styles/**/*.{less,css}'], (e) => {
    if(e.type === 'changed') {
      runSequence('style')
    }
  })
  gulp.watch(['app/static/scripts/**/*.js'], ['lint', 'script']);
})

export default sync