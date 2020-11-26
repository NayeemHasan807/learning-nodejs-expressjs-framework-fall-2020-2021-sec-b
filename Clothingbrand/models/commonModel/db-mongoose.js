const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Clothingbrand', {useNewUrlParser:true}, (err)=>{
	if(!err)
	{
		console.log('MongoDB connection succeeded.');
	}
	else
	{
		console.log('Error in MongoDB connection : '+err)
	}
});

require('../customerModel/signupModel');