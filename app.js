var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var matrix = require('./modules/matrix');

//arrays
var grassArr = require('./modules/array/grassArr');
var grassEater = require('./modules/array/grassEaterArr');
var predator = require('./modules/array/predatorArr');
var mutant = require('./modules/array/mutantArr');


//methods
var grassMeth = require('./modules/methods/grassMul');
var grassEaterMeth = require('./modules/methods/gEater');
var predatorMeth = require('./modules/methods/predator');
var mutantMeth = require('./modules/methods/mutant');


app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect('public/index.html');
});

server.listen(3000);

io.on('connection', function (socket) {
  
  socket.emit('recieve matrix', matrix);

  var interval = setInterval( function(){socket.emit("redraw", matrix)}, 200);

  socket.on('stop-draw', function(){clearInterval(interval);})
  
  //array recieve
  socket.emit('grassArr transform',grassArr);
  socket.emit('grassEaterArr transform',grassEater);
  socket.emit('predators transform',predator);
  socket.emit('muttrans',mutant);


  //method recieve
  socket.emit('grassmethod',grassMeth);
  socket.emit('Eater method',grassEaterMeth);
  socket.emit('preds method',predatorMeth);
  socket.emit('muts method',mutantMeth);

});




//Artaki metod@
/*
const express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', process.env.PORT || 3000);
*/