require('../class.Mutant');
var mutant =  require('../array/mutantArr');
function method(mutant){
    for (var i in mutant) {
        mutant[i].eat();
    }
}
module.exports = method(mutant);