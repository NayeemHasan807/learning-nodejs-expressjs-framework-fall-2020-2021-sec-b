const express 	= require('express');
const adminModel = require.main.require('./models/adminModel/adminModel');
const signupModel = require.main.require('./models/adminModel/signupModel');
const router 	= express.Router();

router.get('/adminHome', (req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Admin"){
		var data={
			adminid : req.cookies['userid']  
		};
		adminModel.getMyInfo(data , function(results){
			res.render('admin/adminHome', {user: results});
		});
	}else{
		res.redirect('/login');
	}
})


router.get('/verifySignupRequest', (req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Admin"){
		console.log('/verifySignupRequest');
		signupModel.getAllSignUpRequest(function(results){
			res.render('admin/verifySignupRequest', {userlist: results});
		});
	}else{
		res.redirect('/login');
	}

})

router.get('/profile', (req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Admin"){
		var data={
			adminid : req.cookies['userid']  
		};
		adminModel.getMyInfo(data , function(results){
			res.render('admin/profile', {user: results});
		});
	}else{
		res.redirect('/login');
	}
})



module.exports = router;