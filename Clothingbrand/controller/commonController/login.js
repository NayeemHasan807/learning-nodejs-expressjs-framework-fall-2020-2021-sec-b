const express 	= require('express');
const router 	= express.Router();
const bodyParser 	= require('body-parser');
const userModel	= require.main.require('./models/commonModel/userModel');

router.get('/', (req, res)=>{
	res.render('common/login')
})

router.post('/', (req, res)=>{
	var data = {
		userid 		: req.body.userid, 
		password 	: req.body.password
	};
	console.log(data);
	/*userModel.validate(user, function(result,status){
		if(status){
			if((result[0].accountstatus == "Active") && (result[0].usertype == "Admin")){
				req.session.type = result[0].usertype;
				res.cookie('uname', req.body.username);
				res.redirect('/Adminhome');
			}else if((result[0].accountstatus == "Active") && (result[0].usertype == "Content Control Manager")){
				req.session.type = result[0].usertype;
				res.cookie('uname', req.body.username);
				res.redirect('/contentcontroller');
			}	
		}else{
			res.redirect('/login');
		}
	});*/
})


module.exports = router;