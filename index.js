var express = require('express');
var app = express();
var path = require("path");
var http = require('http').Server(app);
//var io = require('socket.io')(http);

var used_port = 8081;

/*app.get('/', function (req, res) {
    
    res.send('Hello get');
})*/


app.use('/',express.static(path.join(__dirname, 'Views')));
app.use('/css',express.static(path.join(__dirname, 'css')));
app.use('/controllers',express.static(path.join(__dirname, 'controllers')));
app.use('/node_modules',express.static(path.join(__dirname, 'node_modules')));
app.use('/lib',express.static(path.join(__dirname, 'lib')));
app.use('/Modules',express.static(path.join(__dirname, 'Modules')));
app.use('/factories',express.static(path.join(__dirname, 'factories')));

/*io.on('connection', function(socket){
  socket.on('event', function() {
      
      console.log('a user connected');
      
  }); //server side code
});*/

// ROUTERS---------------------------------------------

var server = app.listen(used_port, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);

})