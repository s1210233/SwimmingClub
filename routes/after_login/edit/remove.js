var express = require('express');
var router = express.Router();
var pg = require('pg');

router.post('/',function(req, res, next){
    var conf = "tcp://mynavi:nodejs@localhost:5432/mynavi_db";
    pg.connect(conf, function(err, client){
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            var sql = "delete from mydata where id = $1";
            client.query(sql,[req.body.id],function(err, result){
                console.log(err);
                res.redirect('/members');
            });
        }
    });
});
module.exports = router;