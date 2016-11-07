import gulp from 'gulp'
const runSequence = require('run-sequence').use(gulp)

gulp.task('default', ['clean', 'watch'], cb => {
  runSequence(['style', 'copy'],
    ['lint', 'script'],
    'sync',
    cb)
})
