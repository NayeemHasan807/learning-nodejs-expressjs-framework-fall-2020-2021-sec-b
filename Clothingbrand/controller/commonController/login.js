const express 	= require('express');
const router 	= express.Router();
const userModel	= require.main.require('./models/commonModel/userModel');

router.get('/', (req, res)=>{
	res.render('common/login')
})


module.exports = router;