const db = require('../db-secure');

module.exports ={

	getMyProfile: function(data , callback){
		var sql = "select * from `admin` WHERE adminid=?";
		db.getResults(sql, [data.adminid], function(results){
			console.log(results);
			callback(results);
		});
	},

	updateMyProfile: function(data , callback){
		if(data.profilepicture==null)
		{
			console.log("------------------------------------------");
			var sql = "UPDATE `admin` SET `name`=?,`email`=?,`dob`=?,`phonenumber`=?,`address`=? WHERE adminid=?";
			db.execute(sql, [data.name,data.email,data.dob,data.phonenumber,data.address,data.adminid] ,function(status){
				console.log(status);
				callback(status);
			});
		}
		else
		{
			var sql = "UPDATE `admin` SET `name`=?,`email`=?,`dob`=?,`phonenumber`=?,`address`=?,`profilepicture`=? WHERE adminid=?";
			db.execute(sql, [data.name,data.email,data.dob,data.phonenumber,data.address,data.profilepicture,data.adminid] ,function(status){
				console.log(status);
				callback(status);
			});
		}
			
	}
}