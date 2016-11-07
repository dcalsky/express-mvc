import sync from './watch.js'
import gulp from 'gulp'
import nodemon from 'gulp-nodemon'

const reload = sync.reload
const WAITING_TIME = 1500

gulp.task('sync', ['nodemon'], () => {
  sync.init({
    proxy: 'localhost:4000', // Express port: 4000
    port: 5000,
    notify: false,
  })
})

gulp.task('nodemon', cb => {
  let called = false;
  return nodemon({
    script: './app/bin/www',
    ext: 'js njk css styl',
    ignore: [
      'gulpfile.babel.js',
      'node_modules/',
    ],
    execMap: {
      js: 'node --harmony --use_strict',
    },
    env: { NODE_ENV: process.env.NODE_ENV }
  })
    .on('start', () => {
      // Ensure start only got called once
      if (!called) {
        cb();
      }
      called = true;
    })
    // Browser sync is begining in 500ms
    .on('restart', () => {
      setTimeout(() => {
        reload({
          stream: false,
        })
      }, WAITING_TIME)
    })
})
