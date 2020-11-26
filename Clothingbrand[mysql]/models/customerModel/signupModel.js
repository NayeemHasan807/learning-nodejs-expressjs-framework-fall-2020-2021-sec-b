const db = require('../db-secure');

module.exports ={
	
	signUpRequest: function(data , callback){
		var sql = "INSERT INTO `signup` VALUES (?,?,?,?,?,?,?,?,?,?)";
		db.execute(sql, ['', data.customerid , data.password , data.name , data.email, data.gender , data.dob , data.phonenumber , data.address , data.profilepicture] ,function(status){
			console.log(status);
			callback(status);
		});
	}
}