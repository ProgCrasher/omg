/////////////////////////////////////////

var socket;
var matrix;

var side = 7;

var stats;

////////////////////////////////////////
function setup() {
	frameRate(0);

	socket = io.connect('http://localhost:3000');

	window.addEventListener('click', function () {
		socket.emit('stop-draw');
	});

	socket.on('recieve matrix', function (mtx) {
		matrix = mtx;
		createCanvas(matrix[0].length * side + 600, matrix.length * side);
		background('#acacac');
		socket.on('redraw', redrawMatrix);
		noLoop();
		socket.on("stats", function (st) {
			stats = st;
		});
	});

	function redrawMatrix(mtx) {
		matrix = mtx;
		redraw();
	}
}

function draw() {
	background("#acacac");
	//matrix colors
	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] == 1) {
				fill('green');
				rect(x * side, y * side, side, side);

			}
			else if (matrix[y][x] == 0) {
				fill('#acacac');
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 2) {
				fill('red');
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 3) {
				fill('#00cccc');
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 4) {
				fill('#4C00FF');
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 5) {
				fill('white');
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 6) {
				fill('black');
				rect(x * side, y * side, side, side);
			}
		}
	}

	//Statics
	textSize(49);
	textStyle(BOLD);
	fill(10, 255, 189)
	var hj = 0;
	var refresh = 0;
	for (var i in stats) {
		refresh++;
		text(i + ": " + stats[i], 570, 60 + hj);
		hj += 60;
		if (refresh == 1) {

			fill(10, 255, 189)
		}
		else if (refresh == 2) {

			fill(10, 255, 189)
		}
		else if (refresh == 3) {

			fill(10, 255, 189)
		}
		else if (refresh == 4) {

			fill(10, 255, 189)
		}
		else if (refresh == 5) {

			fill(10, 255, 189)
		}
		else if (refresh == 6) {

			fill(10, 255, 189)
		}
	}


	/*
////////////////////////////////////////

	if (mutant.length==0 && viruspred.length==0) {
		textStyle(BOLD);
		textSize(64);
		fill(10, 255, 189);
		text('Knights are wins', 10, 60);
	}
	else if (knight.length==0 && predator.length==0) {
		textStyle(BOLD);
		textSize(74);
		fill(10, 255, 189);
		text('Mutants are wins', 10, 60);
	}
	else if (mutant.length==0 && viruspred.length==0 && knight.length==0 && predator.length==0) {
		textStyle(BOLD);
		textSize(64);
		fill(10, 255, 189);
		text('Survival has over', 10, 60);
	}
*/
}
