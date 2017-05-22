const express = require('express')
const router = express.Router()
const db = require('./db')
const fn = () => {}

//获取文章
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

//获取文章列表
router.get('/api/getArticles', (req, res) => {
  const _curpage = +req.query.curPage,
    _pagesize = +req.query.pageSize;

  const query = db.Article.find({});
  query.skip((_curpage - 1) * _pagesize);
  query.limit(_pagesize);
  query.exec(function (err, doc) { //回调
    if (err) {
      res.send(err);
    } else {
      //计算数据总数
      db.Article.find(function (err, rs) {
        result = {
          data: doc,
          pageInfo: {
            curPage: _curpage,
            pageSize: _pagesize,
            pageCount: Math.ceil(rs.length / _pagesize),
            pageTotal: rs.length
          }
        };
        res.json(result)
      });
    }
  });

})

//保存文章
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

//删除文章
router.post('/api/deleteArticle', (req, res) => {
  db.Article.findByIdAndRemove(req.body.id, fn)
  res.status(200).end()
})




module.exports = router