const express 	= require('express');
const adminModel = require.main.require('./models/adminModel/adminModel');
const signupModel = require.main.require('./models/adminModel/signupModel');
const router 	= express.Router();
const bodyParser 	= require('body-parser');
const{ check , validationResult } = require('express-validator');
var exUpload 	= require('express-fileupload');

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


//profile

router.get('/profile', (req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Admin"){
		var data={
			adminid : req.cookies['userid']  
		};
		adminModel.getMyProfile(data , function(results){
			res.render('admin/profile', {user: results});
		});
	}else{
		res.redirect('/login');
	}
})

router.get('/updateProfile', (req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Admin"){
		var data={
			adminid : req.cookies['userid']  
		};
		adminModel.getMyProfile(data , function(results){
			res.render('admin/updateProfile', {user: results});
		});
	}else{
		res.redirect('/login');
	}
})

router.post('/updateProfile', [

		check('name')
			.notEmpty().withMessage('Can not be empty')
			.isLength({ min: 5 }).withMessage('Minimumm length must need to be 5')
		,
		check('email')
			.notEmpty().withMessage('Can not be empty')
			.isEmail().withMessage('Must need to be a valid email example@example.com')
		,
		check('dob')
			.notEmpty().withMessage('Can not be empty')
			.isDate().withMessage('Must need to be YYYY-MM-DD')
		,
		check('phonenumber')
			.notEmpty().withMessage('Can not be empty')
			.isLength({ min: 9 }).withMessage('Minimumm length must need to be 9')
		,
		check('address')
			.notEmpty().withMessage('Can not be empty')
			.isLength({ min: 5 }).withMessage('Minimumm length must need to be 5')

	] ,(req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Admin"){
		
		const errors = validationResult(req);
		if(errors.isEmpty())
		{
			console.log(req.files);
			if(req.files != null)
			{
				file = req.files.profilepicture;
				console.log(file);
				date = new Date();
				file.mv('./assets/admin/profilepicture/'+date.getTime()+file.name, function(error)
				{
					if(error == null)
					{	
						var data = {
							adminid : req.body.adminid,
							name : req.body.name,
							email : req.body.email,
							dob : req.body.dob,
							phonenumber : req.body.phonenumber,
							address : req.body.address,
							profilepicture : "/assets/admin/profilepicture/"+date.getTime()+file.name
						};
						console.log(data);
						adminModel.updateMyProfile(data, function(status){
							if(status)
							{
								res.redirect('/adminController/profile');
							}
							else
							{
								res.redirect('/adminController/updateProfile')
							}
						});
					}
					else
					{
						res.status(200).send({ result : 'error!' });
					}
				});
			}
			else
			{
				var data = {
					adminid : req.body.adminid,
					name : req.body.name,
					email : req.body.email,
					dob : req.body.dob,
					phonenumber : req.body.phonenumber,
					address : req.body.address,
					profilepicture: null
				};
				console.log(data);
				adminModel.updateMyProfile(data, function(status){
					if(status)
					{
						res.redirect('/adminController/profile');
					}
					else
					{
						res.redirect('/adminController/updateProfile')
					}
				});
			}
		}
		else
		{
			console.log(errors.array());
			var em = errors.array();
			var errormassage = ``;

			for(i=0 ; i<em.length ; i++)
			{
				errormassage=errormassage+ em[i].param + " : " + em[i].msg +"<br/>"
			}

			res.status(200).send({ status : errormassage });
		}
	}else{
		res.redirect('/login');
	}

})

module.exports = router;