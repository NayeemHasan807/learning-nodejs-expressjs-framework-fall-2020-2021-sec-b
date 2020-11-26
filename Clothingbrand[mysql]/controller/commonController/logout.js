const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{

	res.clearCookie('uname');
	res.clearCookie('usertype');
	res.redirect('/login');
})

module.exports = router;