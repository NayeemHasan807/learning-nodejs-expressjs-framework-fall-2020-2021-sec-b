const db = require('../db-secure');

module.exports ={
	
	createProduct: function(data , callback){
		var sql = "INSERT INTO `product` VALUES (?,?,?,?,?,?,?,?,?)";
		db.execute(sql, ['', data.productid , data.target , data.catagory , data.producttitle, data.description , data.sizechart , data.productpicture , data.available ] ,function(status){
			console.log(status);
			callback(status);
		});
	}
}