const express = require('express')
const router = express.Router()
const db = require('./db')
const fn = () => {}


//校验是否登录
router.get('/api/g', (req, res) => {
  if (req.session.user) {
    res.json({
      logind: true
    })
  } else {
    res.json({
      logind: false
    })
  }
})


//管理员登录
router.get('/api/login', (req, res) => {
  if (!req.session.user) {
    const username = req.query.username,
      password = req.query.password;
    db.User.findOne({
      username
    }, (err, doc) => {
      if (err) {
        console.log(err)
      } else if (doc) {
        if (password === doc.password && username === doc.username) {
          req.session.user = username;
          console.log("登录成功!");
          res.json("登录成功!")
        } else {
          console.log("登录成功!");
        }
      }
    })
  } else {
    console.log("已经登录过!");
    res.json("已经登录过!")
  }
})

//获取文章
router.get('/api/getArticle', (req, res) => {
  const _id = req.query.id;
  db.Article.findOne({
    _id
  }, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      var json = {
        logind: false,
        data: doc
      }
      if (req.session.user) {
        json.logind = true
      }
      res.json(json)
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
    archive: "_id title createDate category"
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
        var lg = false
        if (req.session.user) {
          lg = true
        }
        result = {
          logind: lg,
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
  if (req.session.user) {
    const id = req.query.id
    let article = {
      title: req.query.title,
      content: req.query.content,
      category: req.query.category
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
  } else {
    res.json({
      logind: false
    });
  }

})

//删除文章
router.post('/api/deleteArticle', (req, res) => {
  db.Article.findByIdAndRemove(req.body.id, fn)
  res.status(200).end()
})


//浏览量
router.post('/api/saveViews', (req, res) => {
    const id = req.query.id
    var article = {
      views: +req.query.views + 1
    }
    if (!!id) {
      console.log(article.views);
      db.Article.findByIdAndUpdate(id, article, function (err, rs) {
        console.log("浏览量更新结束");
        res.json("完成");
      })
    }else{
      console.log("未传id")
    }

})

module.exports = router