const fs = require('fs')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const db = require('./db')
const fn = () => {}

//***上传功能****start
var createFolder = function(folder){
  try{
      fs.accessSync(folder); 
  }catch(e){
      fs.mkdirSync(folder);
  }  
};

var uploadFolder = 'upload/';
createFolder(uploadFolder);
// 通过 filename 属性定制
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
      // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
      cb(null, file.originalname);  
  }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

router.post('/api/upload', upload.single('upload'), function (req, res, next) {

  var file = req.file;
  console.log(file)
  console.log('文件类型：%s', file.mimetype);
  console.log('原始文件名：%s', file.originalname);
  console.log('文件大小：%s', file.size);
  console.log('文件保存路径：%s', file.path);

  res.json({
    src: file.path
  })
});
//***上传功能****end



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
    archive: "_id title createDate category views"
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
    const id = req.body.id
    let article = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category
    }
    if (!!id) {
      article.updateDate = req.body.date;
      db.Article.findByIdAndUpdate(id, article, function (err, rs) {
        console.log("更新结束");
        res.json(rs);
      })
    } else {
      article.createDate = req.body.date;
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


//获取相册列表
router.get('/api/getAlbum', (req, res) => {
  const _curpage = +req.query.curPage || 1,
    _pagesize = +req.query.pageSize || 9999;
  const fieldArr = "albumId title createDate"

  const query = db.Album.find({});
  query.skip((_curpage - 1) * _pagesize);
  query.limit(_pagesize);
  query.sort({
    createDate: -1
  });
  query.select(fieldArr);
  query.exec(function (err, doc) { //回调
    if (err) {
      res.send(err);
    } else {
      //计算数据总数
      db.Album.find(function (err, rs) {
        result = {
          data: doc,
          pageInfo: {
            curPage: _curpage,
            pageSize: _pagesize,
            pageCount: Math.ceil(rs.length / _pagesize),
            pageTotal: rs.length,
          },
        };
        res.json(result)
      });
    }
  });
})

//获取照片列表
router.get('/api/getPhotos', (req, res) => {
  const _curpage = +req.query.curPage || 1,
    _pagesize = +req.query.pageSize || 9999;
  const fieldArr = "albumId name src width height createDate show";

  const query = db.Photos.find({});
  query.skip((_curpage - 1) * _pagesize);
  query.limit(_pagesize);
  query.sort({
    createDate: -1
  });
  query.select(fieldArr);
  query.exec(function (err, doc) { //回调
    if (err) {
      res.send(err);
    } else {
      //计算数据总数
      db.Photos.find(function (err, rs) {
        result = {
          data: doc,
        };
        res.json(result)
      });
    }
  });
})


//保存相册
router.post('/api/saveAlbum', (req, res) => {
  if (req.session.user) {

    let album = {
      albumId: req.body.albumId,
      title: req.body.title,
      albumPic: req.body.albumPic,
      createDate: req.body.date,
    }
    db.Album.create(album, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log('创建相册成功：' + docs);
        res.json(docs);
      }
    });
  } else {
    res.json({
      logind: false
    });
  }
})

//保存图片
router.post('/api/savePhotos', (req, res) => {
  if (req.session.user) {
    console.log(req.body)
    let photos = {
      albumId: req.body.albumId,
      name: req.body.name,
      src: req.body.src,
      width: req.body.width,
      height: req.body.height,
      createDate: req.body.date,
      show: false
    }
    db.Photos.create(photos, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log('保存照片成功：' + docs);
        res.json(docs);
      }
    });
  } else {
    res.json({
      logind: false
    });
  }
})


//文章浏览量
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
  } else {
    console.log("未传id")
  }

})

module.exports = router