var express = require('express');
var router = express.Router();
var pg = require('pg');

router.get('/', function(req,res){
  var conf = "tcp://mynavi:nodejs@localhost:5432/mynavi_db";
  pg.connect(conf, function(err,client){
    if(err) {
      console.log(err);
    } else {
      client.query("SELECT * from mydata order by id", function(err, result) {
        console.log(result);
        res.render('after_login/members',{
          title : '部員一覧',
          datas : result.rows
        });
      });
    }
  });
});


module.exports = router;