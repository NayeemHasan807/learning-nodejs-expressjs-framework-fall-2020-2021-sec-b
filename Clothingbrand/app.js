//declaration
const express 					= require('express');
const app 						= express();
const bodyParser 				= require('body-parser');
const path 						= require('path');
const cookieParser 				= require('cookie-parser');
const login						= require('./controller/commonController/login');
const logout					= require('./controller/commonController/logout');
const signup					= require('./controller/customerController/signup');
const{check,validationResult }	= require('express-validator');
const exUpload 					= require('express-fileupload');
require('./models/commonModel/db-mongoose');

//config
app.use(exUpload());
app.set('view engine', 'ejs');
app.use('/assets',express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/login', login);
//app.use('/logout', logout);
app.use('/signup', signup);

//route
app.get('/', (req, res)=>{
	res.send('Hello from express server');	
});

//server startup
app.listen(3000, (error)=>{
	console.log('express server started at 3000...');
});