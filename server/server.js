const express = require('express');
const app = express();

let msg = null;

process.on('message',(m) => {
	msg = m;
})


app.use(express.static('./source'));

app.get('/hello', function(req, res){
	res.send('Hello World!');
})

app.get('/user', function(req, res){
	res.send(`${req.query.callback}(${JSON.stringify(msg)})`);
})


let server = app.listen(3000, function(){
	let host = server.address().address;
	let port = server.address().port;
	if(host == ':'){
		host = 'localhost';
	}
	console.log('server run to: http://%s:%s', host, port);
})

// export default server;