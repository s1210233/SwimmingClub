var express = require('express');
var router = express.Router();
var pg = require('pg');

router.post('/', function(req, res, next){
  var conf = "tcp://mynavi:nodejs@localhost:5432/mynavi_db";
  pg.connect(conf, function(err, client){
    if(err){
        console.log(err);
        res.redirect('/');
    } else {
        var sql = "update mydata set name = $1, mail = $2, tel = $3 where id = $4";
        client.query(sql, [req.body.name, req.body.mail, req.body.tel, req.body.id], function(err, result1) {
          console.log(err);
          console.log(req.body.id);
          var select = "select * from mydata where id = '" + req.body.id + "' order by id";
              client.query(select, function(err, result) {
                console.log(err);
                    res.render('after_login/edit/update_success',{
                      title: 'Update Success!',
                      datas: result.rows
                    });
              });
        });
      }
  });
});

module.exports = router;