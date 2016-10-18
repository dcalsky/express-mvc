import sync from './watch.js'
import gulp from 'gulp'
import nodemon from 'gulp-nodemon'

const reload = sync.reload

gulp.task('sync', ['nodemon'], () => {
  sync.init({
    proxy: "localhost:4000",
    port: 5000,
    notify: false
  })
})

gulp.task('nodemon', cb => {
  var called = false;
  return nodemon({
    script: './app/bin/www',
    ext: 'js njk css less',
    ignore: [
      'gulpfile.babel.js',
      'node_modules/'
    ],
    env: { 'NODE_ENV': process.env.NODE_ENV }
  })
    .on('start', () => {
      // Ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    // Browser sync is begining in 500ms
    .on('restart', () => {
      setTimeout(() => {
        reload({
          stream: false
        });
      }, 1500);
    });
})
