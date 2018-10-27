var mutant = [];
var Mutant = require('../class.Mutant');
var matrix = require('../matrix');
var y;
var x;
for (y = 0; y < matrix.length; y++) {
    for (x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 4) {
            mutant.push(new Mutant(x, y, 4));
        }
    }
}
module.exports = mutant;