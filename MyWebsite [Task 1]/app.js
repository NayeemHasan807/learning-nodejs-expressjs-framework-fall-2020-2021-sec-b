const http 	= 	require('http');
const fs	=	require('fs');

const server = http.createServer((request, response)=>{
	
	if( request.url == '/home'){
		fs.createReadStream('home.html').pipe(response);
	
	}
	else if( request.url == '/about'){
		fs.createReadStream('about.html').pipe(response);
	
	}
	else if( request.url == '/contact'){
		fs.createReadStream('contact.html').pipe(response);
	
	}else{
		response.write("404 not found!");
		response.end();
	}
});

server.listen(3000);
console.log('server started at 3000...');