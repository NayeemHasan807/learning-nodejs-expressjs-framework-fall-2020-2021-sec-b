const mongoose = require('mongoose');

var signupSchema = new mongoose.Schema({
	customerid:{
		type : String
	},
	password:{
		type : String
	},
	name:{
		type : String
	},
	email:{
		type : String
	},
	gender:{
		type : String
	},
	dob:{
		type : String
	},
	phonenumber:{
		type : String
	},
	address:{
		type : String
	},
	profilepicture:{
		type : String
	}
});

mongoose.model("signup" , signupSchema);