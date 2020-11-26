const db = require('../db-secure');

module.exports ={

	getMyInfo: function(data , callback){
		var sql = "select * from `admin` WHERE adminid=?";
		db.getResults(sql, [data.adminid], function(results){
			console.log(results);
			callback(results);
		});
	}
}