const express = require('express')
const router = express.Router()
const db = require('./db')
const fn = () => {}

router.get('/api/getArticle', (req, res) => {
  const _id = req.query.id;
  db.Article.findOne({
    _id
  }, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(doc)
    }
  })
})

router.get('/api/getArticles', (req, res) => {
  db.Article.find(null, 'title date content', (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(JSON.stringify(doc))
    }
  })
})

router.post('/api/saveArticle', (req, res) => {
  const id = req.body._id
  const article = {
    title: req.body.title,
    date: req.body.date,
    content: req.body.content
  }
  if (id) {
    db.Article.findByIdAndUpdate(id, article, fn)
  } else {
    new db.Article(article).save()
  }
  res.status(200).end()
})

router.post('/api/deleteArticle', (req, res) => {
  db.Article.findByIdAndRemove(req.body.id, fn)
  res.status(200).end()
})




module.exports = router