var express = require('express');
var router = express.Router();
var pg = require('pg');

router.get('/:id',function(req, res, next){
	var id = req.params.id;
	console.log(id);
	var conf = "tcp://mynavi:nodejs@localhost:5432/mynavi_db";
	pg.connect(conf, function(err, client){
		if(err){
			console.log(err);
			res.redirect('/');
		} else {
			var sql = "select * from mydata where id = " + id;
			client.query(sql,function(err,result){
				if(err){
					console.log('else err');
					console.log(err);
					res.redirect('/');
				} else {
					res.render('after_login/edit',{
						title : '部員一覧',
						msg : '送信してください',
						data : result.rows[0]
					});
				}
			});
		}
	});
});

module.exports = router;