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
  const _curpage = +req.query.curPage || 1,
    _pagesize = +req.query.pageSize || 9999,
    field = req.query.field || ""
  const query = db.Article.find({});
  query.skip((_curpage - 1) * _pagesize);
  query.limit(_pagesize);
  query.sort({
    _id: -1
  });
  query.select(field);
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
            pageTotal: rs.length,
          },
          id: field == '_id' ? true : false
        };
        res.json(result)
      });
    }
  });

})

router.get('/api/createArticle', (req, res) => {
  const article = {
    title: "req.body.title",
    date: "2012-1-1",
    content: " req.body.content"
    // title: req.body.title,
    // date: req.body.date,
    // content: req.body.content
  }
  db.Article.create(article, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('保存成功：' + docs);
      res.json(docs);
    }
  });
})

//保存文章
router.post('/api/saveArticle', (req, res) => {
  const id = req.query.id
  const article = {
    title: req.query.title,
    date: req.query.date,
    content: req.query.content
  }
  if (!!id) {
    db.Article.findByIdAndUpdate(id, article, fn)
  } else {
    db.Article.create(article, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log('保存成功：' + docs);
        res.json(docs);
      }
    });
  }

})

//删除文章
router.post('/api/deleteArticle', (req, res) => {
  db.Article.findByIdAndRemove(req.body.id, fn)
  res.status(200).end()
})




module.exports = router