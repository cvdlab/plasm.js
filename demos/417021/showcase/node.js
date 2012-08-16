!(function (exports){

var fs = require('fs');

var plasm_lib = require('plasm.js');
var obj = plasm_lib.plasm;
var fun = plasm_lib.plasm_fun;
var plasm = obj.plasm;
var Plasm = obj.Plasm;

var root = this;

Object.keys(fun).forEach(function (k) { 
  root[k] = fun[k];
});

var p = new Plasm();
fun.PLASM(p);


var scmodel = (function () {
/////////////////////////////////////////////
/**
 * @author Alessio De Angelis
 * 
 * SUPER MARIO PIXEL ART FUN
 * Inspired by this render: http://art.ngfiles.com/images/130/petelavadigger_super-mario-pixel.png
 */

var red = [209/255, 35/255, 26/255, 1];
var pink = [238/255, 191/255, 139/255, 1];
var black = [0, 0, 0, 1];
var blue = [71/255, 78/255, 208/255, 1];
var yellow = [1, 237/255, 31/255, 1];
var brown = [130/255, 66/255, 38/255, 1];

var face = [];
face.push(COLOR(pink)(SIMPLEX_GRID([[-5, 7], [-7, 1], [1]]))); //row7
face.push(COLOR(red)(SIMPLEX_GRID([[-12, 2], [-7, 1], [1]])));
face.push(COLOR(brown)(SIMPLEX_GRID([[-3, 2], [-8, 1], [1]])));//row8
face.push(COLOR(pink)(SIMPLEX_GRID([[-5, 4], [-8, 1], [1]])));
face.push(COLOR(black)(SIMPLEX_GRID([[-9, 4], [-8, 1], [1]])));
face.push(COLOR(red)(SIMPLEX_GRID([[-13, 1], [-8, 1], [1]])));
face.push(COLOR(brown)(SIMPLEX_GRID([[-3, 1, -1, 2], [-9, 1], [1]])));//row9
face.push(COLOR(pink)(SIMPLEX_GRID([[-4, 1, -2, 3, -1, 3], [-9, 1], [1]])));
face.push(COLOR(black)(SIMPLEX_GRID([[-10, 1], [-9, 1], [1]])));
face.push(COLOR(red)(SIMPLEX_GRID([[-14, 1], [-9, 1], [1]])));
face.push(COLOR(brown)(SIMPLEX_GRID([[-3, 1, -1, 1], [-10, 1], [1]])));//row10
face.push(COLOR(pink)(SIMPLEX_GRID([[-4, 1, -1, 3, -1, 3], [-10, 1], [1]])));
face.push(COLOR(red)(SIMPLEX_GRID([[-13, 2], [-10, 1], [1]])));
face.push(COLOR(black)(SIMPLEX_GRID([[-9, 1], [-10, 2], [1]])));
face.push(COLOR(brown)(SIMPLEX_GRID([[-4, 3], [-11, 1], [1]])));//row11
face.push(COLOR(pink)(SIMPLEX_GRID([[-7, 2, -1, 1], [-11, 1], [1]])));
face.push(COLOR(red)(SIMPLEX_GRID([[-12, 3], [-11, 1], [1]])));
face.push(COLOR(red)(SIMPLEX_GRID([[-4, 9], [-12, 1], [1]])));//row12
face.push(COLOR(pink)(SIMPLEX_GRID([[-13, 2], [-12, 1], [1]])));
face.push(COLOR(red)(SIMPLEX_GRID([[-5, 5], [-13, 1], [1]])));//row13
face.push(COLOR(pink)(SIMPLEX_GRID([[-12, 3], [-13, 1], [1]])));

var body = [];
body.push(COLOR(brown)(SIMPLEX_GRID([[-1, 2], [1], [1]]))); //row0
body.push(COLOR(brown)(SIMPLEX_GRID([[-1, 3], [-1, 1], [1]]))); //row1
body.push(COLOR(blue)(SIMPLEX_GRID([[-4, 6], [-1, 1], [1]]))); 
body.push(COLOR(brown)(SIMPLEX_GRID([[-2, 3], [-2, 1], [1]]))); //row2
body.push(COLOR(brown)(SIMPLEX_GRID([[-14, 2], [-2, 4], [1]]))); 
body.push(COLOR(blue)(SIMPLEX_GRID([[-5, 9], [-2, 1], [1]]))); 
body.push(COLOR(blue)(SIMPLEX_GRID([[-4, 1, -1, 2, -1, 5], [-3, 1], [1]]))); //row3
body.push(COLOR(pink)(SIMPLEX_GRID([[-1, 1], [-3, 1], [1]])));
body.push(COLOR(yellow)(SIMPLEX_GRID([[-8, 1], [-3, 1], [1]])));
body.push(COLOR(red)(SIMPLEX_GRID([[-5, 1], [-3, 1], [1]])));
body.push(COLOR(pink)(SIMPLEX_GRID([[3], [-4, 1], [1]])));//row4
body.push(COLOR(red)(SIMPLEX_GRID([[-3, 4], [-4, 1], [1]])));
body.push(COLOR(blue)(SIMPLEX_GRID([[-7, 4, -1, 2], [-4, 1], [1]])));
body.push(COLOR(yellow)(SIMPLEX_GRID([[-11, 1], [-4, 1], [1]])));
body.push(COLOR(pink)(SIMPLEX_GRID([[2], [-5, 1], [1]])));//row5
body.push(COLOR(red)(SIMPLEX_GRID([[-2, 5, -1 , 3], [-5, 1], [1]])));
body.push(COLOR(blue)(SIMPLEX_GRID([[-7, 1, -3, 1], [-5, 1], [1]])));
body.push(COLOR(red)(SIMPLEX_GRID([[-2, 4, -1 , 3, -1, 2], [-6, 1], [1]])));//row6
body.push(COLOR(blue)(SIMPLEX_GRID([[-6, 1, -3, 1], [-6, 1], [1]])));
body.push(COLOR(brown)(SIMPLEX_GRID([[-15, 1], [-6, 1], [1]])));

scmodel = STRUCT(face.concat(body));
/////////////////////////////////////////////
return scmodel;
})();

exports.author = 'AlessioDeAngelis';
exports.category = 'others';
exports.scmodel = scmodel;

if (!module.parent) {
  fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
}

}(this));