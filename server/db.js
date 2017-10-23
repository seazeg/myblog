const mongoose = require('mongoose')
const init = require('./init.json')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  role: String
})

const articleSchema = new Schema({
  title: String,
  category: String,
  createDate: Date,
  updateDate: Date,
  content: String,
  views: Number
})

const albumSchema = new Schema({
  albumId: String,
  title: String,
  albumPic: String,
  createDate: Date
})

const photosSchema = new Schema({
  albumId: String,
  name: String,
  src: String,
  width: String,
  height: String,
  createDate: Date,
  show: Boolean
})


const Models = {
  User: mongoose.model('User', userSchema),
  Article: mongoose.model('Article', articleSchema),
  Album: mongoose.model('Album', albumSchema),
  Photos: mongoose.model('Photos', photosSchema)
}

const initialize = function () {
  Models.Article.find(null, function (err, doc) {
    if (err) {
      console.log(err)
    } else if (doc.length <= 0) {
      console.log('Article opens for the first time...')
      Promise.all(init.map(item => new Models[item.type](item).save()))
        .then(() => console.log('Article Initialize successfully.'))
        .catch(() => console.log('Something went wrong during initializing.'))
    }
  });
  Models.Album.find(null, function (err, doc) {
    if (err) {
      console.log(err)
    } else if (doc.length <= 0) {
      console.log('Album opens for the first time...')
      Promise.all(init.map(item => new Models[item.type](item).save()))
        .then(() => console.log('Album Initialize successfully.'))
        .catch(() => console.log('Something went wrong during initializing.'))
    }
  });
  Models.Photos.find(null, function (err, doc) {
    if (err) {
      console.log(err)
    } else if (doc.length <= 0) {
      console.log('Photos opens for the first time...')
      Promise.all(init.map(item => new Models[item.type](item).save()))
        .then(() => console.log('Photos Initialize successfully.'))
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