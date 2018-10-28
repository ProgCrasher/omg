var n = 80;
var m = 80;

var matrix = [];

/////////////////////////////////////////
var matrix1 = randomMatrix(n / 4, m, 0, 2);
var matrix2 = randomMatrix(n / 2, m, 0, 3);
var matrix3 = randomMatrix(n / 4, m, 0, 2);
function mutik() {
    for (var i = 50; i < n; i++) {
        for (var z = 0; z <= m - 50; z++) {
            matrix[i][z] = 4;
        }
    }
}
function knight() {
    for (var i = 0; i < n / 2; i++) {
        for (var z = m - 30; z <= m; z++) {
            matrix[i][z] = 5;
        }
    }
}
//random matrix function
function randomMatrix(m, n, z, k) {
    var matrix = [];
    for (var y = 0; y < m; y++) {
        matrix[y] = []
        for (var x = 0; x < n; x++) {
            matrix[y][x] = getRandomBetween(z, k);
        }
    }

    return matrix;
}

//random integer function
function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

matrix = matrix1.concat(matrix2).concat(matrix3);
mutik();
knight();
module.exports = matrix;