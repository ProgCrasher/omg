var predator = [];
var Predator = require('../class.Predator');
var matrix = require('../matrix');
var y;
var x;
for (y = 0; y < matrix.length; y++) {
    for (x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 3) {
            predator.push(new Predator(x, y, 3));
        }
    }
}
module.exports = predator;