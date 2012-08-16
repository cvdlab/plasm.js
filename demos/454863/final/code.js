//Sail

var turns = 1.5;
var angle = turns * 2 * PI;
var radius_max = 16;
var radius_min = 1;
var height = 15;
var domain2 = DOMAIN([[0, angle], [radius_min, radius_max]])([120, 4])
var mapping = function (p) {
  var a = p[0];
  var r = p[1] * (1 + a / angle);
  var h = height - (a / angle * height);
  return [r * -COS(a), r * SIN(a), h];
};
var sail = MAP(mapping)(domain2);

var possail = T([2])([22])(sail)

var csail = COLOR([1,1,1])(possail);



//Central base

var b = CYL_SURFACE([16,1])([100,1])
var angle = 2 * PI;
var radius = 16;
var domain3 = DOMAIN([[0, angle], [0, radius]])([120, 4])

var mapping3 = function (p) {
  var a = p[0];
  var r = p[1];
  return [r * COS(a), r * SIN(a),0];
};
var d = MAP(mapping3)(domain3);

var dPos = T([2])([1])(d)

var base1 = STRUCT([b,dPos]) 


//External base

var b2 = CYL_SURFACE([20,0.5])([100,1])
var radius = 20;
var domain3 = DOMAIN([[0, angle], [0, radius]])([120, 4])

var mapping3 = function (p) {
  var a = p[0];
  var r = p[1];
  return [r * COS(a), r * SIN(a),0];
};
var d3 = MAP(mapping3)(domain3);

var d4 = T([2])([0.5])(d3)

var base2 = STRUCT([b2,d3,d4])



//Internal box

var box = T([0,1,2])([-2.5,-2.5,1])(CUBOID([5,5,5]))
DRAW(COLOR([230/255,190/255,135/255])(box))


//The mast

var p = CYL_SURFACE([1,32])([100,1])
var posMast = T([2])([6])(p)


//Mast's tip

var angle = 2 * PI;
var radius = 0.5; 
var altezza = 2; 
var domain3 = DOMAIN([[0, angle], [0, radius], [0, altezza]])([30, 4, 4]); 
var mapping3 = function (p) { 
  var a = p[0];  
  var r = p[1];  
  var z = p[2]; 
  return [z * r * COS(a), z * r * SIN(a), altezza - z]; 
}; 
var tip = MAP(mapping3)(domain3); 

var posTip = T([2])([38])(tip)
 
var mast = STRUCT([posMast, posTip])





//Spars

var surfSp = T([2])([1])(CYL_SURFACE([0.5, 6])([100,1]))

//The circumference for the cap

var angle = 2 * PI;
var radius = 0.5;
var domain3 = DOMAIN([[0, angle], [0, radius]])([120, 4])

var mapping3 = function (p) {
  var a = p[0];
  var r = p[1];
  return [r * COS(a), r * SIN(a),0];
};

var cap = MAP(mapping3)(domain3);
var posCap = T([2])([7])(cap)

var rotSpar = R([1,2])([PI/2])

var spar = STRUCT([rotSpar, posCap, surfSp])





var rotSpars = R([0,1])([PI/2])

var spars = T([2])([7])(STRUCT([spar, rotSpars, spar, rotSpars, spar, rotSpars, spar]))






//Sail's spars


var sailSp = SCALE([0,1,2])([0.5,2.52,0.5])(spar)

var posSailSp = T([0,2])([1.5, 37])(R([0,1])([-PI/2])(sailSp))

var sailSp2 = SCALE([0,1,2])([2.05,1.1,1.1])(posSailSp)

var posSailSp2 = T([0,2])([-1.2,-18.7])(R([0,1])([PI])(sailSp2))

var Sspars = STRUCT([posSailSp, posSailSp2])


//Beams for the external base


var domain = INTERVALS(1)(50);
var domain2 = DOMAIN([[0,1],[0,1]])([30,50])
var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([30,50])


var sezMcp1 = [[0,0,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],
[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[0.5,0,0]]
var sezMc1 = BEZIER(S0)(sezMcp1);

var sezMcp2 = [[0,0,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],
[6,7,0.5],[6,7,0.5],[6,7,0.5],
[6,6.5,0.5],[6,6.5,0.5],[6,6.5,0.5],[6,6.5,0.5],[6,6.5,0.5],[6,6.5,0.5],[0.5,0,0.5]]
var sezMc2 = BEZIER(S0)(sezMcp2);

//Surface 1
var sur = BEZIER(S1)([sezMc1,sezMc2])
var rSur = MAP(sur)(domain2)



var bordP1 = [[0,0,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],
[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[0,0,0.5]]
var bordC1 = BEZIER(S0)(bordP1);


var bordP2 = [[0.5,0,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],
[6,6.5,0.5],[6,6.5,0.5],[6,6.5,0.5],
[6,6.5,0.5],[6,6.5,0.5],[6,6.5,0.5],[6,6.5,0.5],[6,6.5,0.5],[0.5,0,0.5]]
var bordC2 = BEZIER(S0)(bordP2);


//Surface 2
var sur2 = BEZIER(S1)([bordC1,bordC2])
var rSur2 = MAP(sur2)(domain2)


//Beams structure

var support = STRUCT([rSur,rSur2])

var supportPos = T([0,1,2])([-19,0.2,0.5])(S([0,2])([3,3])(R([1,2])([PI/2])(support)))


var supportStruct = STRUCT([supportPos, rotSpars, supportPos, rotSpars, supportPos, rotSpars, supportPos])





//Contact module for the beams

var modBeam = CYL_SURFACE([2.5,1.5])([100,1])
var posMod = T([2])([20])(modBeam)

var capMod = T([2])([20])(DISK(2.5)([100,1]))
var capMod2 = T([2])([21.5])(DISK(2.5)([100,1]))


DRAW(COLOR([230/255,190/255,135/255])(posMod))
DRAW(capMod)
DRAW(capMod2)



//Tie rods

var tir1 = POLYLINE([[8.8,18,0],[11,13,33.4]])
var tir2 = POLYLINE([[17.9,8,0],[19,7,32.5]])
var tir3 = POLYLINE([[-12,16,0],[-11,13,35.6]])
var tir4 = POLYLINE([[-17.8,8,0],[-21,3,26.5]])
var tir5 = POLYLINE([[-8.8,-18,0],[-11,-13,28.3]])
var tir6 = POLYLINE([[-17.9,-8,0],[-22,-10,27.7]])
var tir7 = POLYLINE([[8.8,-18,0],[11,-13,30.6]])
var tir8 = POLYLINE([[17.9,-8,0],[20,-5,31.6]])


var tirs = STRUCT([tir1,tir2,tir3,tir4,tir5,tir6,tir7,tir8])
var cTirs = COLOR([0.5,0.5,0.5])(tirs)


var wooden = STRUCT([base1,base2,mast,spars,Sspars,supportStruct])
var woodenFrame = COLOR([237/255,180/255,100/255])(wooden)


var vite = STRUCT([csail,woodenFrame,cTirs])

DRAW(vite)



//Function that implements the animation for the Vite Aerea with confirm button


function Fly() {
  var message = 'Do you want to activate the movement of the Vite Aerea?'

  var choice = confirm(message)

  if (choice == true) {
    setInterval(function () {
    vite.rotate([0,1], PI/45);
    }, 60);
  }

}

Fly()

  
