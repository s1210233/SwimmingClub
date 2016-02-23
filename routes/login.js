var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var username = req.param('username');
    var passward = req.param('password');
    req.session.login = true;
    req.session.username = username;
    if((username === "kazawa") && (passward === "s121")){
        res.render('after_login/login_success',{title: 'Login Success', msg: 'Welcome to Swimming Club', name: username});
    } else{
        req.session.login = false;
        var err = '入力が正しくありません。再度入力してください。';
        var rem = 'お忘れですか？';
        res.render('login',{
          title: 'Login Screen',
          msg: '名前とパスワードを入力してください。',
          error: err,
          remember: rem
        });
    }
});

module.exports = router;
