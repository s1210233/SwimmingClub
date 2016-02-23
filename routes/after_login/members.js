var express = require('express');
var router = express.Router();
var pg = require('pg');

router.post('/', function(req,res){
	var conf = "tcp://mynavi:nodejs@localhost:5432/mynavi_db";
	pg.connect(conf, function(err,client){
		if(err) {
			console.log(err);
		} else {
			client.query("SELECT * from mydata", function(err, result) {
				console.log(result);
				res.render('after_login/members',{
					title : '部員一覧',
					datas : result.rows
				});
			});
		}
	});
});

router.post('/update', function(req,res){
	var id = req.params.id;
	var conf = "tcp://mynavi:nodejs@localhost:5432/mynavi_db";
	pg.connect(conf, function(err, client){
		if(err){
			console.log(err);
			res.redirect('/');
		} else {
			var sql = "select * from mydata where id = " + id;
			client.query(sql,function(err,result){
				if(err){
					console.log(err);
					res.redirect('/');
				} else {
					res.render('edit',{
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