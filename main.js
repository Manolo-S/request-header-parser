"use strict";

var express = require('express');
var app = express();
var server;
var port = process.env.PORT || 3000;

function reqHeaderParser(req, res){
	var ip = (req.ip).slice(7);
	var languageArr = (req.get('Accept-Language')).split(',');
	var language = languageArr[0];
	var softwareArr = (req.get('User-Agent')).split(';');
	softwareArr.shift();
	var software = (softwareArr.toString().split(')'))[0];
	var whoami = JSON.stringify({"ipaddress": ip, "language": language, "software": software});
	res.setHeader('Content-Type', 'text/html');
	res.send('<h1>Request Header Parser Service</h1><p>' + whoami + '</p>');
}

app.get('/api/whoami', reqHeaderParser);

app.get('*', function(req, res){res.status(404).send('not found')});

app.listen(port);

console.log('Server listening on localhost port: ' + port + '/');

