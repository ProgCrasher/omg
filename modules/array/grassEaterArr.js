var GrassEater = require('../class.Grass_Eater');
var grassEater = [];
var matrix = require('../matrix');
var y;
var x;
for (y = 0; y < matrix.length; y++) {
    for (x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 2) {
            grassEater.push(new GrassEater(x, y, 2));
        }
    }
}
module.exports = grassEater;