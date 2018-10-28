var LivingCreature = require("./class.Parent");
var Predator = require('./class.Predator');

module.exports = class Knight extends LivingCreature {
	constructor(x, y, index) {
		super(x, y, index);
		this.energy = 36;
	}
	largeCoo() {
		this.directions = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1],
			[this.x - 2, this.y - 2],
			[this.x, this.y - 2],
			[this.x + 2, this.y - 2],
			[this.x - 2, this.y],
			[this.x + 2, this.y],
			[this.x - 2, this.y + 2],
			[this.x, this.y + 2],
			[this.x + 2, this.y + 2],
			[this.x - 3, this.y - 3],
			[this.x, this.y - 3],
			[this.x + 3, this.y - 3],
			[this.x - 3, this.y],
			[this.x + 3, this.y],
			[this.x - 3, this.y + 3],
			[this.x, this.y + 3],
			[this.x + 3, this.y + 3],
		];
	}

	chooseCell(matrix,character, cd, cd2, cd3, cd4) {
		this.largeCoo();
		return super.chooseCell(matrix,character, cd, cd2, cd3, cd4);
	}

	move(matrix,knight) {
		var newCell = this.chooseCell(matrix,0,1,4,6);
		var card = newCell[Math.floor(Math.random() * newCell.length)];
		if (card) {
			var x = card[0];
			var y = card[1];
			if (matrix[y][x] == 1) {
				matrix[this.y][this.x] = 1;
			}
			else if (matrix[y][x] == 3) {
				matrix[this.y][this.x] = 3;
			}
			else {
				matrix[this.y][this.x] = 0;
			}

			matrix[y][x] = 5;
			this.x = x;
			this.y = y;
			this.energy--;
		}
		if (this.energy < 3) {
			this.die(matrix,knight);
		}
	}

	eat(matrix,predator,mutant,knight,viruspred) {
		var newCell = this.chooseCell(matrix,4,6);
		var card = newCell[Math.floor(Math.random() * newCell.length)];
		if (card) {

			var x = card[0];
			var y = card[1];

			matrix[y][x] = 5;
			matrix[this.y][this.x] = 0;

			this.x = x;
			this.y = y;


			this.multiply++;
			this.energy += 7;

			for (var i in mutant) {
				if (x == mutant[i].x && y == mutant[i].y) {
					mutant.splice(i, 1);
				}
			}
			for (var i in viruspred) {
				if (x == viruspred[i].x && y == viruspred[i].y) {

					viruspred.splice(i, 1);
					this.health(matrix,predator);
				}
			}

			if (this.multiply == 25) {
				this.mul(matrix,knight);
				this.multiply = 0;
			}

		}
		else {
			this.move(matrix,knight);

		}
	}

	mul(matrix,knight) {
		var newCell = this.chooseCell(matrix,0);
		var card = newCell[Math.floor(Math.random() * newCell.length)];
		if (card) {
			var x = card[0];
			var y = card[1];


			this.multiply++;

			var tufto = new Knight(x, y, this.index);
			knight.push(tufto);

			matrix[y][x] = 5;
			this.multiply = 3;
		}


	}

	health(matrix,predator) {
		var newCell = this.chooseCell(matrix,6);
		var card = newCell[Math.floor(Math.random() * newCell.length)];
		if (card) {
			var x = card[0];
			var y = card[1];


			var frick = new Predator(x, y, this.index);
			predator.push(frick);

			matrix[y][x] = 3;
		}

	}

	die(matrix,knight) {
		this.largeCoo();
		matrix[this.y][this.x] = 0;

		for (var i in knight) {
			if (this.x == knight[i].x && this.y == knight[i].y) {
				knight.splice(i, 1);
			}
		}
	}

}