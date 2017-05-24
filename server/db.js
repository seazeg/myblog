const mongoose = require('mongoose')
const init = require('./init.json')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  password: String
})

const articleSchema = new Schema({
  title: String,
  category: String,
  createDate: Date,
  updateDate: Date,
  content: String
})


const Models = {
  User: mongoose.model('User', userSchema),
  Article: mongoose.model('Article', articleSchema)
}

const initialize = function () {
  Models.Article.find(null, function (err, doc) {
    if (err) {
      console.log(err)
    } else if (doc.length <= 0) {
      console.log('Database opens for the first time...')
      Promise.all(init.map(item => new Models[item.type](item).save()))
        .then(() => console.log('Initialize successfully.'))
        .catch(() => console.log('Something went wrong during initializing.'))
    }
  })
}


mongoose.connect('mongodb://127.0.0.1/gblog')
// mongoose.set('debug', true)

const db = mongoose.connection

db.on('error', function () {
  console.log('Database connection error.')
})

db.once('open', function () {
  console.log('The database has connected.')
  initialize()
})

module.exports = Models