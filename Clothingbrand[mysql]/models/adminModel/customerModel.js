const db = require('../db-secure');

module.exports ={

	getAllCustomerList: function(callback){
		var sql = "select * from `customer`";
		db.getResults(sql, null, function(results){
			console.log(results);
			callback(results);
		});
	},

	getByIdCustomer: function(data , callback){
		var sql = "select * from customer where customerid=?";
		db.getResults(sql, [data.customerid], function(results){
			console.log(results);
			callback(results);
		});
	},

	createCustomer: function(data , callback){
		var sql = "insert into customer VALUES (?,?,?,?,?,?,?,?,?,?)";
		db.execute(sql, ['',data.customerid,data.name,data.email,data.gender,data.dob,data.phonenumber,data.address,data.profilepicture,"Valid"], function(status){
			console.log(status);
			callback(status);
		});
	},

	deleteCustomer: function(data , callback){
		var sql = "DELETE FROM `customer` WHERE customerid=?";
		db.execute(sql, [data.customerid], function(status){
			console.log(status);
			callback(status);
		});
	}
	
}