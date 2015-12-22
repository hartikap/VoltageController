var express = require('express');
var app = express();
var path = require("path");
var http = require('http').Server(app);
//var used_port = 8081;

// Environmet variables for OpenShift
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


app.use('/',express.static(path.join(__dirname, 'Views')));
app.use('/css',express.static(path.join(__dirname, 'css')));
app.use('/controllers',express.static(path.join(__dirname, 'controllers')));
app.use('/node_modules',express.static(path.join(__dirname, 'node_modules')));
app.use('/lib',express.static(path.join(__dirname, 'lib')));
app.use('/Modules',express.static(path.join(__dirname, 'Modules')));
app.use('/factories',express.static(path.join(__dirname, 'factories')));


// ROUTERS---------------------------------------------

app.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});