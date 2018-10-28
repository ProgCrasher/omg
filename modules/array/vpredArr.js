var viruspred = [];
var VirusPred = require('../class.illPred');
var matrix = require('../matrix');
var y;
var x;
for (y = 0; y < matrix.length; y++) {
    for (x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 6) {
            viruspred.push(new VirusPred(x, y, 6));
        }
    }
}
module.exports = viruspred;