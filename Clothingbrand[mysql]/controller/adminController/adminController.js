const express 	= require('express');
const router 	= express.Router();
const bodyParser 	= require('body-parser');
const{ check , validationResult } = require('express-validator');
var exUpload 	= require('express-fileupload');

const adminModel 	 = require.main.require('./models/adminModel/adminModel');
const customerModel	 = require.main.require('./models/adminModel/customerModel');
const signupModel	 = require.main.require('./models/adminModel/signupModel');
const userModel		 = require.main.require('./models/userModel');


//Admin Home

router.get('/adminHome', (req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Admin"){
		var data={
			adminid : req.cookies['userid']  
		};
		adminModel.getMyProfile(data , function(results){
			res.render('admin/adminHome', {user: results});
		});
	}else{
		res.redirect('/login');
	}
})

//Signup List, Approve & Decline

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

router.get('/signupRequestApprove/:id', (req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Admin"){
		console.log('/signupRequestApprove');
		var data = {
			id : req.params.id
		};
		signupModel.getByIdSignUpRequest(data , function(results){
			if(results.length >0)
			{
				res.render('admin/signupRequestApprove', {list: results});
			}
			else
			{
				var errormassage = `Cant find singup request!!`;
				res.status(200).send({ status : errormassage });
			}
		});
	}else{
		res.redirect('/login');
	}

})

router.post('/signupRequestApprove/:id', (req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Admin"){
		console.log('/signupRequestApprove');
		var data = {
			id : req.params.id
		};
		signupModel.getByIdSignUpRequest(data , function(results){
			if(results.length > 0)
			{
				var customer = {
					customerid : results[0].customerid,
					name : results[0].name,
					email : results[0].email,
					gender : results[0].gender,
					dob : results[0].dob,
					phonenumber : results[0].phonenumber,
					address : results[0].address,
					profilepicture : results[0].profilepicture
				};
				var user = {
					userid : results[0].customerid,
					password : results[0].password,
					usertype : "Customer" 
				};
				customerModel.createCustomer(customer , function(status){
					if(status)
					{
						userModel.createUser(user , function(status){
							if(status)
							{
								signupModel.deleteSignUpRequest(data , function(status){
									if(status)
									{
										res.redirect('/adminController/verifySignupRequest');
									}
									else
									{
										var errormassage = `Failed to insert delete data from signuo!!`;
										res.status(200).send({ status : errormassage });
									}
								});								
							}
							else
							{
								var errormassage = `Failed to insert data in customer table!!`;
								res.status(200).send({ status : errormassage });
							}
						});
					}
					else
					{
						var errormassage = `Failed to insert data in customer table!!`;
						res.status(200).send({ status : errormassage });
					}
				});
			}
			else
			{
				var errormassage = `Cant Approve singup request!!`;
				res.status(200).send({ status : errormassage });
			}
		});
	}else{
		res.redirect('/login');
	}

})

router.get('/signupRequestDecline/:id', (req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Admin"){
		console.log('/signupRequestDecline');
		var data = {
			id : req.params.id
		};
		signupModel.getByIdSignUpRequest(data , function(results){
			if(results.length >0)
			{
				res.render('admin/signupRequestDecline', {list: results});
			}
			else
			{
				var errormassage = `Cant find singup request!!`;
				res.status(200).send({ status : errormassage });
			}
		});
	}else{
		res.redirect('/login');
	}

})

router.post('/signupRequestDecline/:id', (req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Admin"){
		console.log('/signupRequestDecline');
		var data = {
			id : req.params.id
		};
		signupModel.deleteSignUpRequest(data , function(status){
			if(status)
			{
				res.redirect('/adminController/verifySignupRequest');
			}
			else
			{
				var errormassage = `Cant decline singup request!!`;
				res.status(200).send({ status : errormassage });
			}
		});
	}else{
		res.redirect('/login');
	}

})

//Customer List & Delete

router.get('/customerList', (req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Admin"){
		console.log('/customerList');
		customerModel.getAllCustomerList(function(results){
			res.render('admin/customerList', {customerlist: results});
		});
	}else{
		res.redirect('/login');
	}

})

router.get('/deleteCustomer/:customerid', (req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Admin"){
		console.log('/deleteCustomerpost/:customerid');
		var data = {
			customerid : req.params.customerid
		};
		customerModel.getByIdCustomer(data , function(results){
			if(results.length >0)
			{
				res.render('admin/deleteCustomer', {list: results});
			}
			else
			{
				var errormassage = `Cant find customer!!`;
				res.status(200).send({ status : errormassage });
			}
		});
	}else{
		res.redirect('/login');
	}

})

router.post('/deleteCustomer/:customerid', (req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Admin"){
		console.log('/deleteCustomer');
		var data = {
			customerid : req.params.customerid
		};
		customerModel.deleteCustomer(data , function(status){
			if(status)
			{
				userModel.deleteUser({ userid : req.params.customerid} , function(status) {
					if(status)
					{
						res.redirect('/adminController/customerList');
					}
					else
					{
						var errormassage = `Cant delete this user!!`;
						res.status(200).send({ status : errormassage });
					}
				});
			}
			else
			{
				var errormassage = `Cant delete this customer!!`;
				res.status(200).send({ status : errormassage });
			}
		});
	}else{
		res.redirect('/login');
	}

})

//profile View & update profile

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


//Product

router.get('/addProduct', (req, res)=>{
	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Admin"){
		console.log('/addProduct');
			res.render('admin/addProduct');
	}else{
		res.redirect('/login');
	}

})

router.post('/addProduct', [
	check('productid')
		.notEmpty().withMessage('productid field can not be empty')
		.isLength({ min: 4 }).withMessage('Minimumm length must need to be 4')
	,
	check('target')
		.notEmpty().withMessage('target must need to be selected')
	,
	check('producttitle')
		.notEmpty().withMessage('producttitle field can not be empty')
		.isLength({ min: 4 }).withMessage('Minimumm length must need to be 4')
	,
	check('description')
		.notEmpty().withMessage('description field can not be empty')
		.isLength({ min: 30 }).withMessage('Minimumm length must need to be 30')
	,
	check('sizechart')
		.notEmpty().withMessage('sizechart field can not be empty')
	,
	check('catagory')
		.notEmpty().withMessage('catagory field can not be empty')
	,
	check('available')
		.notEmpty().withMessage('available field can not be empty')
		.isLength({ min: 1 }).withMessage('Minimumm length must need to be 1')

	] , (req, res)=>{

	if(req.cookies['userid'] != null && req.cookies['usertype'] == "Admin"){
		const errors = validationResult(req);
		if(errors.isEmpty())
		{
			console.log(req.body);
			if(req.files != null)
			{
				file = req.files.image;
				console.log(file);
				date = new Date();
				file.mv('./assets/common/products/'+date.getTime()+file.name, function(error){

					if(error == null){
						var data = {
							productid : req.body.productid,
							target : req.body.target,
							catagory : req.body.catagory,
							producttitle : req.body.producttitle,
							description: req.body.description,
							sizechart : req.body.sizechart,
							productpicture : "/assets/common/products/"+date.getTime()+file.name,
							available : req.body.available
						};
						console.log(data);
						productModel.createProduct(data , function(status){
							if(status)
							{
								res.status(200).send({ result : 'Product Added!' });
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
	}else{
		res.redirect('/login');
	}
})

module.exports = router;