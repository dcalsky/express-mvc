const Sequelize = require('sequelize')
const path = require('path')
const fs = require('fs')
const config = require('../config')

const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
  dialect: 'postgres',
  timezone: '+08:00',
  native: true,
  define: {
    timestamps: false
  }
})

const db = Object.create()
fs.readdir(__dirname, (err, files) => {
  if (err) throw err
  files.forEach((file) => {
    if (path.extname(file) === '.js' && file !== 'index.js') {
      const modelName = path.basename(file, 'js')
      db[modelName] = sequelize.import(path.join(__dirname, file))
    }
  })
})

Object.keys(db).forEach((modelName) => {
  const model = db[modelName]
  if ('associate' in model) {
    model.associate(db)
  }
})

// Check whether table of role is empty. If it is empty, adding two roles automatically.
if ('roles' in db) {
  // noinspection JSUnresolvedVariable
  db.roles.findAll()
    .then((results) => {
      if (results.length === 0) {
        db.roles.create({ name: 'admin' })
        db.roles.create({ name: 'normal' })
      }
    })
}

db.sequelize = sequelize
module.exports = db