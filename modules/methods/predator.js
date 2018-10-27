require('../class.Predator');
var predator =  require('../array/predatorArr');
function method(predator){
    for (var i in predator) {
        predator[i].eat();
    }
}
module.exports = method(predator);