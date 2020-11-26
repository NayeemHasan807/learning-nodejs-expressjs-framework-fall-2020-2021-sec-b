const db = require('../db-secure');

module.exports ={
	
	getAllSignUpRequest: function(callback){
		var sql = "select * from `signup`";
		db.getResults(sql, null, function(results){
			console.log(results);
			callback(results);
		});
	},
	getByIdSignUpRequest: function(data , callback){
		var sql = "select * from signup where id=?";
		db.getResults(sql, [data.id], function(results){
			console.log(results);
			callback(results);
		});
	}
}