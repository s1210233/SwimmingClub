var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Swimming Club',msg: 'Login or Create Screen'});
});

/* POST login page. */
router.post('/login', function(req, res, next) {
  res.render('login',{
    title: 'Login Screen',
    msg: '名前とパスワードを入力してください。'
  });
});

router.post('/create', function(req, res, next) {
  res.render('before_login/create',{
    title: 'Create New Account',
    msg: '名前、メール、電話番号を記入してください。'
  });
});


module.exports = router;
