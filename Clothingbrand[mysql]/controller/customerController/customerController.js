const express 						= require('express');
const router 						= express.Router();
const bodyParser 					= require('body-parser');
const exUpload 						= require('express-fileupload');
const{ check , validationResult }	= require('express-validator');
const signupModel					= require.main.require('./models/customerModel/signupModel');
const customerModel					= require.main.require('./models/customerModel/customerModel');


//Signup Request

router.get('/signup', (req, res)=>{
	res.render('customer/signup');
})

router.post('/signup',[
	check('customerid')
		.notEmpty().withMessage('Name field can not be empty')
		.isLength({ min: 4 }).withMessage('Minimumm length must need to be 4')
	,
	check('password')
		.notEmpty().withMessage('Name field can not be empty')
		.isLength({ min: 4 }).withMessage('Minimumm length must need to be 4')
	,
	check('name')
		.notEmpty().withMessage('Name field can not be empty')
		.isLength({ min: 4 }).withMessage('Minimumm length must need to be 4')
	,
	check('email')
		.notEmpty().withMessage('Email field can not be empty')
		.isEmail().withMessage('Must need to be a valid email example@example.com')
	,
	check('gender')
		.notEmpty().withMessage('Gender must need to be selected')
	,
	check('dob')
		.notEmpty().withMessage('DOB field can not be empty')
		.isDate().withMessage('Must need to be YYYY-MM-DD')
	,
	check('address')
		.notEmpty().withMessage('Address field can not be empty')
		.isLength({ min: 7 }).withMessage('Minimumm length must need to be 7')
	,
	check('phonenumber')
		.notEmpty().withMessage('UserStatus must need to be selected')
	] , (req, res)=>{

		const errors = validationResult(req);
		if(errors.isEmpty())
		{
			console.log(req.body);
			if(req.files != null)
			{
				file = req.files.image;
				console.log(file);
				date = new Date();
				file.mv('./assets/customer/profilepicture/'+date.getTime()+file.name, function(error){

					if(error == null){
						var data = {
							customerid : req.body.customerid,
							password : req.body.password,
							name : req.body.name,
							email : req.body.email,
							gender: req.body.gender,
							dob : req.body.dob,
							phonenumber : req.body.phonenumber,
							address : req.body.address,
							profilepicture : "/assets/customer/profilepicture/"+date.getTime()+file.name
						};
						console.log(data);
						signupModel.signUpRequest(data , function(status){
							if(status)
							{
								res.redirect('/login');
							}
							else
							{
								res.status(200).send({ result : 'Failed to submit registration request!' });	
							}
						})
						
					}else{
						res.status(200).send({ result : 'error!' });
					}
				});
			}
			else
			{
				var errorstrign = `Must need to upload profile picture`;
				res.status(200).send({ result : errorstrign });
			}
		}
		else
		{
			console.log(errors.array());
			var earray = errors.array();
			var errorstrign = ``;

			for(i=0 ; i<earray.length ; i++)
			{
				errorstrign=errorstrign+ earray[i].param + " : " + earray[i].msg +"<br/>"
			}

			res.status(200).send({ result : earray });
		}
})

//Home

router.get('/customerHome', (req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Customer"){
		var data={
			customerid : req.cookies['userid']  
		};
		customerModel.getMyProfile(data , function(results){
			res.render('customer/customerHome', {user: results});
		});
	}else{
		res.redirect('/login');
	}
})

//Profile

router.get('/profile', (req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Customer"){
		var data={
			customerid : req.cookies['userid']  
		};
		customerModel.getMyProfile(data , function(results){
			res.render('customer/profile', {user: results});
		});
	}else{
		res.redirect('/login');
	}
})

router.get('/updateProfile', (req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Customer"){
		var data={
			customerid : req.cookies['userid']  
		};
		customerModel.getMyProfile(data , function(results){
			res.render('customer/updateProfile', {user: results});
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
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Customer"){
		
		const errors = validationResult(req);
		if(errors.isEmpty())
		{
			console.log(req.files);
			if(req.files != null)
			{
				file = req.files.profilepicture;
				console.log(file);
				date = new Date();
				file.mv('./assets/customer/profilepicture/'+date.getTime()+file.name, function(error)
				{
					if(error == null)
					{	
						var data = {
							customerid : req.body.customerid,
							name : req.body.name,
							email : req.body.email,
							dob : req.body.dob,
							phonenumber : req.body.phonenumber,
							address : req.body.address,
							profilepicture : "/assets/customer/profilepicture/"+date.getTime()+file.name
						};
						console.log(data);
						customerModel.updateMyProfile(data, function(status){
							if(status)
							{
								res.redirect('/customerController/profile');
							}
							else
							{
								res.redirect('/customerController/updateProfile')
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
					customerid : req.body.customerid,
					name : req.body.name,
					email : req.body.email,
					dob : req.body.dob,
					phonenumber : req.body.phonenumber,
					address : req.body.address,
					profilepicture: null
				};
				console.log(data);
				customerModel.updateMyProfile(data, function(status){
					if(status)
					{
						res.redirect('/customerController/profile');
					}
					else
					{
						res.redirect('/customerController/updateProfile')
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