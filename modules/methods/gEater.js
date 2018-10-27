require('../class.Grass_Eater');
var grassEater =  require('../array/grassEaterArr');
function method(grassEater){
    for (var i in grassEater) {
        grassEater[i].eat();
    }
}
module.exports = method(grassEater);