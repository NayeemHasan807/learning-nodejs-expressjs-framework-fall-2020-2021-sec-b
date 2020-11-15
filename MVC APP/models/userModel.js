const db = require('./db');

module.exports ={

	validate: function(user, callback){
		var sql = "select * from user where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getById: function(user, callback){
		var sql = "select * from user where id='"+user.id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	getAll: function(callback){
		var sql = "select * from user";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	insert: function(user, callback){
		var sql = "insert into user VALUES ('', '"+user.username+"' , '"+user.password+"' , '"+user.type+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		console.log(user);
		var sql = "UPDATE `user` SET `username`='"+user.username+"',`password`= '"+user.password+"' ,`type`='"+user.type+"' WHERE id='"+user.id+"'";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(user, callback){
		var sql = "DELETE FROM `user` WHERE id='"+user.id+"'";
		db.execute(sql, function(status){
			callback(status);
		});

	}
}