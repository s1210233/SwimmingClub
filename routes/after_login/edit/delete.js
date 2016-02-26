var express = require('express');
var router = express.Router();
var pg = require('pg');

router.get('/:id',function(req, res, next){
  var id = req.params.id;
  var conf = "tcp://mynavi:nodejs@localhost:5432/mynavi_db";
  pg.connect(conf, function(err, client){
    if (err) {
      res.redirect('/');
    } else {
      var sql = "select * from mydata where id = " + id;
      client.query(sql, function(err, result){
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
             res.render('after_login/edit/delete',{
              title : '削除しますか？',
              data : result.rows[0]
            });
        }
      });
    }
  });
});

module.exports = router;