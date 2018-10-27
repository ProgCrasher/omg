var LivingCreature = require("./class.Parent.js");

module.exports = class Predator extends LivingCreature {
	constructor(x, y, index) {
		super(x, y, index);
		this.energy = 11;

	}
	getNewCoor() {
		this.directions = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1]
		]
	}

	chooseCell(character, cd) {
		this.getNewCoor();
		return super.chooseCell(character, cd);
	}

	move() {
		var matrix = require('./matrix');
		var newCell = this.chooseCell(0, 1);
		var card = newCell[Math.floor(Math.random() * newCell.length)];
		if (card) {
			var x = card[0];
			var y = card[1];
			if (matrix[y][x] == 0) {
				matrix[this.y][this.x] = 0;
			}
			else if (matrix[y][x] == 1) {
				matrix[this.y][this.x] = 1;
			}
			else if (matrix[y][x] == 4) {
				matrix[y][x] = 0;
			}
			else if (matrix[y][x] == 6) {
				matrix[y][x] = 0;
			}
			matrix[y][x] = 3;


			this.x = x;
			this.y = y;
			this.energy--;

		}
		if (this.energy < 1) {
			this.die();
		}
	}



	eat() {
		var matrix = require('./matrix');
		var grassEater = require('./array/grassEaterArr');
		var newCell = this.chooseCell(2);
		var card = newCell[Math.floor(Math.random() * newCell.length)];
		if (card) {
			var x = card[0];
			var y = card[1];
			matrix[y][x] = 3;
			matrix[this.y][this.x] = 0;

			this.x = x;
			this.y = y;

			this.multiply++;
			this.multiply++;
			this.energy += 5

			for (var i in grassEater) {
				if (x == grassEater[i].x && y == grassEater[i].y) {
					grassEater.splice(i, 1);
				}
			}

			if (this.multiply == 25) {
				this.mul();
				this.multiply = 0;
			}


		}

		else {

			this.move();

		}
	}

	
	mul() {
		var matrix = require('./matrix');
		var predator = require('./array/predatorArr');
		var newCel = this.chooseCell(0);
		var newCell = newCel[Math.floor(Math.random() * newCell.length)];
		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = this.index;
			var pred = new Predator(newX, newY, this.index);
			predator.push(pred);
			this.multiply = 0;
		}
	}

	die() {
		var matrix = require('./matrix');
		var predator = require('./array/predatorArr');
		matrix[this.y][this.x] = 0;
		for (var i in predator) {
			if (this.x == predator[i].x && this.y == predator[i].y) {
				predator.splice(i, 1);
			}
		}
	}
}
