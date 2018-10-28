var LivingCreature = require("./class.Parent");
var VirusPred = require('./class.illPred');

module.exports = class Mutant extends LivingCreature {
	constructor(x, y, index) {
		super(x, y, index);
		this.energy = 17;
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
			[this.x + 2, this.y + 2]
		];
	}

	chooseCell(matrix,character, cd, cd2, cd3, cd4) {
		this.largeCoo();
		return super.chooseCell(matrix,character, cd, cd2, cd3, cd4);
	}

	move(matrix,mutant) {
		var newCell = this.chooseCell(matrix,0, 1, 2, 3, 5);
		var card = newCell[Math.floor(Math.random() * newCell.length)];
		if (card) {
			var x = card[0];
			var y = card[1];


			matrix[y][x] = 4;

			matrix[this.y][this.x] = 0;

			this.x = x;
			this.y = y;
			this.energy--;
		}

		if (this.energy < 3) {
			this.die(matrix,mutant);
		}
	}

	eat(matrix,grassArr,grassEater,predator,mutant,knight,viruspred) {

		var newCell = this.chooseCell(matrix,1, 2, 3, 5);
		var card = newCell[Math.floor(Math.random() * newCell.length)];
		if (card) {

			var x = card[0];
			var y = card[1];
			matrix[this.y][this.x] = 0;
			matrix[y][x] = 4;


			this.x = x;
			this.y = y;


			this.multiply++;
			this.energy += 5;
			var z = this.x;
			var b = this.y;

			for (var i in predator) {
				if (x == predator[i].x && y == predator[i].y) {
					predator.splice(i, 1);
					this.poison(matrix,viruspred);

				}
			}
			for (var i in grassEater) {
				if (x == grassEater[i].x && y == grassEater[i].y) {
					grassEater.splice(i, 1);
				}
			}
			for (var i in grassArr) {
				if (x == grassArr[i].x && y == grassArr[i].y) {
					grassArr.splice(i, 1);
				}
			}
			//random boolean
			var randomBool = Math.random() >= 0.5;
			//////////////////////////////////////
			if (randomBool) {
				for (var i in knight) {
					if (x == knight[i].x && y == knight[i].y) {
						knight.splice(i, 1);
					}
				}
			}


			if (this.multiply == 34) {
				this.mul(matrix,mutant);
				this.multiply = 0;
			}

		}

		else {
			this.move(matrix,mutant);
		}
	}

	poison(matrix,viruspred) {

		for (var i = 0; i <= 50; i++) {

			var newCell = this.chooseCell(matrix,3);
			var card = newCell[Math.floor(Math.random() * newCell.length)];
			if (card) {
				var x = card[0];
				var y = card[1];

				this.multiply++;

				var mutag = new VirusPred(x, y, this.index);
				viruspred.push(mutag);

				matrix[y][x] = 6;
				this.multiply = 3;
			}

		}
	}

	mul(matrix,mutant) {
		var newCell = this.chooseCell(matrix,0);
		var card = newCell[Math.floor(Math.random() * newCell.length)];
		if (card) {
			var x = card[0];
			var y = card[1];


			this.multiply++;

			var mutagen = new Mutant(x, y, this.index);
			mutant.push(mutagen);

			matrix[y][x] = 4;
			this.multiply = 3;
		}


	}

	die(matrix,mutant) {

		this.largeCoo();
		matrix[this.y][this.x] = 0;
		for (var i in mutant) {
			if (this.x == mutant[i].x && this.y == mutant[i].y) {
				mutant.splice(i, 1);
			}
		}
	}

}