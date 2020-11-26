const express 						= require('express');
const router 						= express.Router();
const bodyParser 					= require('body-parser');
const exUpload 						= require('express-fileupload');
const{ check , validationResult }	= require('express-validator');
const signupModel					= require.main.require('./models/customerModel/signupModel');
const mongoose						= require('mongoose');
const signup 						= mongoose.model('signup');

router.get('/', (req, res)=>{
	res.render('customer/signup');
})

router.post('/',[
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
		.isLength({ min: 9 }).withMessage('Minimumm length must need to be 9')
	] , (req, res)=>{

		//console.log(req.body);
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
						
						signup.customerid 	= req.body.customerid;
						signup.password		= req.body.password;
						signup.name 		= req.body.name;
						signup.email 		= req.body.email;
						signup.Gender 		= req.body.gender;
						signup.dob 			= req.body.dob;
						signup.phonenumber 	= req.body.phonenumber;
						signup.address 		= req.body.address;
						signup.profilepicture = "/assets/customer/profilepicture/"+date.getTime()+file.name;
						
						signup.save((err,doc) => {
							if(!err)
							{
								req.redirect('/login');
							}
							else
							{
								console.log('Error during record insertion : '+err);
							}
						});
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




module.exports = router;