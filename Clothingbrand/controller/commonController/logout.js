const express 	= require('express');
const router 	= express.Router();
const userModel	= require.main.require('./models/commonModel/userModel');

router.get('/', (req, res)=>{
	console.log("logout");
})


module.exports = router;