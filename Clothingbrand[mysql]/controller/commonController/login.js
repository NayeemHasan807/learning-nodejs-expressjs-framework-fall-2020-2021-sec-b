const express 	= require('express');
const router 	= express.Router();
const bodyParser 	= require('body-parser');
const userModel	= require.main.require('./models/userModel');

router.get('/', (req, res)=>{
	res.render('common/login')
})

router.post('/', (req, res)=>{
	var data = {
		userid 		: req.body.userid, 
		password 	: req.body.password
	};
	console.log(data);
	userModel.validate(data,function(result,status){
		if(status){
			if(result[0].usertype == "Admin"){
				console.log(result);
				res.cookie('userid', result[0].userid);
				res.cookie('usertype', result[0].usertype);
				res.redirect('/adminController/adminHome');
			}else if(result[0].usertype == "Customer"){
				res.cookie('userid', result[0].userid);
				res.cookie('usertype', result[0].usertype);
				res.redirect('/userController/userHome');
			}	
		}else{
			res.redirect('/login');
		}
	});
})


module.exports = router;