import gulp from 'gulp'
const runSequence = require('run-sequence').use(gulp)

gulp.task('server', ['clean', 'watch'], cb => {
    runSequence('style',
     ['lint', 'script'],
     'sync',
      cb)
})

gulp.task('server:dist', ['clean'], cb => {
    runSequence('style',
     ['lint', 'script'],
     'nodemon',
      cb)
})
