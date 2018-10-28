var knight = [];
var Knight = require('../class.illPred');
var matrix = require('../matrix');
var y;
var x;
for (y = 0; y < matrix.length; y++) {
    for (x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 5) {
            knight.push(new Knight(x, y, 5));
        }
    }
}
module.exports = knight;