const db = require('../db-secure');

module.exports ={

	getMyProfile: function(data , callback){
		var sql = "select * from `customer` WHERE customerid=?";
		db.getResults(sql, [data.customerid], function(results){
			console.log(results);
			callback(results);
		});
	},

	updateMyProfile: function(data , callback){
		if(data.profilepicture==null)
		{
			var sql = "UPDATE `customer` SET `name`=?,`email`=?,`dob`=?,`phonenumber`=?,`address`=? WHERE customerid=?";
			db.execute(sql, [data.name,data.email,data.dob,data.phonenumber,data.address,data.customerid] ,function(status){
				console.log(status);
				callback(status);
			});
		}
		else
		{
			var sql = "UPDATE `customer` SET `name`=?,`email`=?,`dob`=?,`phonenumber`=?,`address`=?,`profilepicture`=? WHERE customerid=?";
			db.execute(sql, [data.name,data.email,data.dob,data.phonenumber,data.address,data.profilepicture,data.customerid] ,function(status){
				console.log(status);
				callback(status);
			});
		}
			
	}
}