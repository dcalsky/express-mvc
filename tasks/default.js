import gulp from 'gulp'
const runSequence = require('run-sequence').use(gulp)

gulp.task('default', ['clean'], cb => {
    runSequence('style',
     'script',
      cb)
})