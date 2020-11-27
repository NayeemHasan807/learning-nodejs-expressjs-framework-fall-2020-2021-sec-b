const db = require('./db-secure');

module.exports = {

    validate: function(user, callback){
		var sql = "select * from user where userid=? and password=?";
		db.getResults(sql , [user.userid , user.password] , function(results){
			if(results.length > 0){
				callback(results,true);
			}else{
				callback(results,false);
			}
		});
	},

	createUser: function(data , callback){
		var sql = "insert into user VALUES (?,?,?,?)";
		db.execute(sql, ['',data.userid,data.password,data.usertype], function(status){
			console.log(status);
			callback(status);
		});
	},

	deleteUser: function(data , callback){
		var sql = "DELETE FROM `user` WHERE userid=?";
		db.execute(sql, [data.userid], function(status){
			console.log(status);
			callback(status);
		});
	}
}