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
      res.json(doc)
    }
  })
})

//获取文章列表
router.get('/api/getArticles', (req, res) => {
  const _curpage = +req.query.curPage || 1,
    _pagesize = +req.query.pageSize || 9999,
    field = req.query.field || ""
  const fieldArr = {
    article: "_id",
    archive: "_id title createDate"
  }

  const query = db.Article.find({});
  query.skip((_curpage - 1) * _pagesize);
  query.limit(_pagesize);
  query.sort({
    createDate: -1
  });
  query.select(fieldArr[field]);
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
          article: field == 'article' ? true : false,
          archive: field == 'archive' ? true : false
        };
        res.json(result)
      });
    }
  });

})

//保存文章
router.post('/api/saveArticle', (req, res) => {
  const id = req.query.id
  let article = {
    title: req.query.title,
    content: req.query.content
  }
  if (!!id) {
    article.updateDate = req.query.date;
    db.Article.findByIdAndUpdate(id, article, function (err, rs) {
      console.log("更新结束");
      res.json(rs);
    })
  } else {
    article.createDate = req.query.date;
    db.Article.create(article, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log('创建成功：' + docs);
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