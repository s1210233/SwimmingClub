var express = require('express');
var router = express.Router();
var pg = require('pg');

router.post('/add',function(req,res,next){
	var conf = "tcp://mynavi:nodejs@localhost:5432/mynavi_db";
	pg.connect(conf, function(err, client){
		if(err) {
			console.log(err);
			res.redirect('/');
		} else {
			var sql = "insert into mydata (name,mail,tel) values ('";
			sql += req.body.name + "','" + req.body.mail + "','" + req.body.tel + "')";
			client.query(sql, function(err, result){
				console.log(err);
				var select = "SELECT * from mydata order by id desc limit 1";
				client.query(select, function(err, result) {
					console.log(err);
					res.render('before_login/register_success',{
						title: 'Register Success!',
						datas: result.rows
					});
				});
			});
		}
	});
});

module.exports = router;