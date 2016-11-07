import gulp from 'gulp'
const runSequence = require('run-sequence').use(gulp)

gulp.task('default', ['clean', 'watch'], cb => {
  runSequence('style',
    ['lint', 'script'],
    'sync',
    cb)
})
