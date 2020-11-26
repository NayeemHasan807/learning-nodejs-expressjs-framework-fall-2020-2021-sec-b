const express 	= require('express');
const adminModel = require.main.require('./models/adminModel/adminModel');
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

module.exports = router;