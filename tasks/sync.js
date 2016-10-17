import browserSync from 'browser-sync'
import gulp from 'gulp'
import nodemon from 'gulp-nodemon'

const reload = browserSync.reload

gulp.task('sync', ['nodemon'], () => {
  browserSync({
    proxy: "localhost:3000",  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  });
  gulp.watch(['app/**/*'], reload)
})

gulp.task('nodemon', cb => {
  var called = false;
  return nodemon({
    script: './app/main.js',
    ignore: [
      'gulpfile.babel.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
})