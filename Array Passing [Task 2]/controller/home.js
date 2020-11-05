const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
	
	//req.session.uname != null
	if(req.cookies['uname'] != null){
		
		var student = [
						['Nayeem','18-36492-1','3.90','CSE'],
						['Eva','18-36531-1','3.89','CSE'],
						['Sumaiya','18-36546-1','3.84','CSE'],
						['Sanin','17-88888-2','4.00','EEE']
					] ;
		
		res.render('home/index', {userlist: student});
	}else{
		res.redirect('/login');
	}
})

module.exports = router;