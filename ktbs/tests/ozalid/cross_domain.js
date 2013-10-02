var http = require('http');
 
http.createServer(
  function (request, response) {
    
    	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","http://localhost:8001/", true);
	xmlhttp.send();
	
	string = xmlhttp.responseText;
	console.log(string);
  }
).listen(8000);
 
console.log('Server running at http://localhost:8000/');
