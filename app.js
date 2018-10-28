var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var matrix = require('./modules/matrix');

//arrays
var grassArr = require('./modules/array/grassArr');
var grassEater = require('./modules/array/grassEaterArr');
var predator = require('./modules/array/predatorArr');
var mutant = require('./modules/array/mutantArr');
var viruspred = require('./modules/array/vpredArr');
var knight = require('./modules/array/knightArr');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect('public/index.html');
});

server.listen(3000);

var frameCount = 0;

io.on('connection', function (socket) {

  socket.emit('recieve matrix', matrix);

  var interval = setInterval(function () {
    frameCount++;
    for (var i in grassArr) { grassArr[i].mul(matrix, grassArr); };
    for (var i in grassEater) {
      grassEater[i].eat(matrix, grassArr, grassEater);
    };
    for (var i in predator) { predator[i].eat(matrix, grassEater, predator); };
    for (var i in mutant) { mutant[i].eat(matrix, grassArr, grassEater, predator, mutant, knight, viruspred); };
    for (var i in viruspred) { viruspred[i].eat(matrix, predator, viruspred); };
    for (var i in knight) { knight[i].eat(matrix, predator, mutant, knight, viruspred); };

    if (frameCount % 25 == 0) {
      socket.emit("stats", main());
    }

    socket.emit("redraw", matrix)
  }, 200);

  socket.on('stop-draw', function () { clearInterval(interval); })

});

function main() {

  var stat = {
    "Grass": grassArr.length,
    "GrassEater": grassEater.length
  };

  var jsonText = JSON.stringify(stat);
  fs.writeFileSync("obj.json", jsonText);

  return stat;
}