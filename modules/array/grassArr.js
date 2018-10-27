var grass = require('../class.Grass');
var grassArr = [];
var matrix = require('../matrix');
var y;
var x;
for (y = 0; y < matrix.length; y++) {
    for (x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            grassArr.push(new grass(x, y, 1));
        }
    }
}
module.exports = grassArr;