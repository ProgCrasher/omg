var LivingCreature = require("./class.Parent");

module.exports = class VirusPred extends LivingCreature {
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


	chooseCell(matrix,character, cd) {
		this.getNewCoor();
		return super.chooseCell(matrix,character, cd);
	}


	die(matrix,viruspred) {

		matrix[this.y][this.x] = 0;

		for (var i in viruspred) {
			if (this.x == viruspred[i].x && this.y == viruspred[i].y) {
				viruspred.splice(i, 1);
			}
		}
	}



	move(matrix,viruspred) {
		var newCell = this.chooseCell(matrix,0,1);
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

			matrix[y][x] = 6;


			this.x = x;
			this.y = y;
			this.energy--;

		}
		if (this.energy < 1) {
			this.die(matrix,viruspred);
		}
	}


	mul(matrix,viruspred) {
		var newCel = this.chooseCell(matrix,0);
		var newCell = newCel[Math.floor(Math.random() * newCel.length)];
		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = this.index;
			var predik = new VirusPred(newX, newY, this.index);
			viruspred.push(predik);
			this.multiply = 0;
		}
	}




	eat(matrix,predator,viruspred) {
		var newCell = this.chooseCell(matrix,3);
		var card = newCell[Math.floor(Math.random() * newCell.length)];
		if (card) {
			var x = card[0];
			var y = card[1];
			matrix[y][x] = 6;
			matrix[this.y][this.x] = 0;

			this.x = x;
			this.y = y;

			this.multiply++;
			this.multiply++;
			if (predator.length < 50) {
				this.energy += 5
			}
			else {
				this.energy += 3;
			}

			for (var i in predator) {
				if (x == predator[i].x && y == predator[i].y) {
					predator.splice(i, 1);
				}
			}

			if (this.multiply == 25) {
				this.mul(matrix,viruspred);
				this.multiply = 0;
			}


		}

		else {
			this.move(matrix,predator,viruspred);

		}
	}
}