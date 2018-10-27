/////////////////////////////////////////
var knight = [];
var viruspred=[];

var socket;
var matrix;

var side = 7;

////////////////////////////////////////
function setup() {
	frameRate(0);

	socket = io.connect('http://localhost:3000');

	window.addEventListener('click', function(){
		socket.emit('stop-draw');
	});
	
	socket.on('recieve matrix', function (mtx){
		matrix = mtx;
		
		console.log(matrix);
		createCanvas(matrix[0].length * side, matrix.length * side);
		background('#acacac');
		socket.on('redraw', redrawMatrix);
		noLoop();
	});

	function redrawMatrix(mtx)
	{
		matrix = mtx;
		redraw();
		console.log("I work");
	}
	//-------------------------------------------------
	socket.on('grassArr transform',function(grassArr){
		console.log(grassArr);
		socket.on('grassmethod',function(){});
		
	});
	//--------------------------------------------------
	socket.on('grassEaterArr transform',function(grassEater){
		console.log(grassEater);
		socket.on('Eater method',function(){});
		
	});
	//--------------------------------------------------	
	socket.on('predators transform',function(predator){
		console.log(predator);
		socket.on('preds method',function(){});
		
	});
	//--------------------------------------------------	
	socket.on('muttrans',function(mutant){
		console.log(mutant);
		socket.on('muts method',function(){});
		
	});
	//--------------------------------------------------	
	
	/*
	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {
			//aspet
			else if (matrix[y][x] == 5) {
				knight.push(new Knight(x, y, 5));
			}
			//darac gishatich
			else if (matrix[y][x] == 6) {
				viruspred.push(new VirusPred(x, y, 6));
			}
		}
	}*/

}


function draw() {
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
	/*
	//aspeti metodi kanch
	for (var i in knight) {
		knight[i].eat();
		
	}
	
	for (var i in viruspred) {
		viruspred[i].eat();
		
	}
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

	frameRate(5);*/
}

/* manual framerate
var x = 7;
var _time = 1000/x;
var dr = setInterval(draw, _time);
*/