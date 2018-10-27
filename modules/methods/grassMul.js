require('../class.Grass');
var grassArr =  require('../array/grassArr');
function method(grassArr){
    for (var i in grassArr) {
        grassArr[i].mul();
    }
}
module.exports = method(grassArr);