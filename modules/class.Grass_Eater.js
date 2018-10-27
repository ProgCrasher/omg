var LivingCreature = require("./class.Parent.js");

module.exports =  class GrassEater extends LivingCreature {
	constructor(x, y, index) {
		super(x, y, index);
		this.energy = 13;
	}
	getNewCoordinates() {
		this.directions = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1]
		];
	}


	chooseCell(character, cd) {
		this.getNewCoordinates();
		return super.chooseCell(character, cd);
	}
	move() {
		var matrix = require('./matrix');
		var newCell = this.chooseCell(0,1);
		var card = newCell[Math.floor(Math.random() * newCell.length)];
		if (card) {
			var x = card[0];
			var y = card[1];
			if (matrix[y][x] == 0) {
				matrix[this.y][this.x] = 0;
			}
			else if (matrix[y][x] == 1) {
				matrix[this.y][this.x] = 0;
			}
			else if (matrix[y][x] == 4) {
				matrix[y][x] = 0;
			}
			else if (matrix[y][x] == 6) {
				matrix[y][x] = 0;
			}
			matrix[y][x] = 2;


			this.x = x;
			this.y = y;
			this.energy--;

		}
		if (this.energy < 3) {
			this.die();
		}
	}



	eat() {
		var matrix = require('./matrix');
		var grassArr = require('./array/grassArr');
		var newCell = this.chooseCell(1);
		var card = newCell[Math.floor(Math.random() * newCell.length)];
		if (card) {

			var x = card[0];
			var y = card[1];

			matrix[y][x] = 2;
			matrix[this.y][this.x] = 0;

			this.x = x;
			this.y = y;
			this.energy += 3;

			for (var i in grassArr) {
				if (x == grassArr[i].x && y == grassArr[i].y) {
					grassArr.splice(i, 1);
				}
			}

			if (this.multiply == 26) {
				this.mulik();
				this.multiply = 0;
			}


		}
		else {
			this.move();

		}
	}


	mul() {
		var matrix = require('./matrix');
		var grassEater = require('./array/grassEaterArr');
		var newCell = this.chooseCell(0,1);
		var card = newCell[Math.floor(Math.random() * newCell.length)];
		if (card) {
			var x = card[0];
			var y = card[1];
			this.multiply += 6;
			var norXotaker = new GrassEater(x, y, this.index);
			grassEater.push(norXotaker);

			matrix[y][x] = 2;
			this.multiply = 0;
		}


	}

	die() {
		var matrix = require('./matrix');
		var grassEater = require('./array/grassEaterArr');
		matrix[this.y][this.x] = 0;
		for (var i in grassEater) {
			if (this.x == grassEater[i].x && this.y == grassEater[i].y) {
				grassEater.splice(i, 1);
			}
		}
	}
}