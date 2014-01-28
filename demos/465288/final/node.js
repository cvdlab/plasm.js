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
 //ASSI
var X=0;
var Y=1;
var Z=2;

//COLORS
var brownWood = [207/255, 137/255, 87/255];

/******************UTILS******************/
/*Function that translates all the points of an array of the amount indicated along the respective axis.*/
function pointTranslation(points, dx, dy, dz){
  var result = [];
  points.forEach(function(item){
    xpos = item[0]+dx;
    ypos = item[1]+dy;
    zpos = item[2]+dz
    result.push([xpos,ypos,zpos]);
  });
  return result;
}

/*Function that takes an array of bezier curves and interpolate them with a surface*/
function bezierSurfaceInterpolator(curve){
  var result = null;
  curve.forEach(function(item){
      var mappingFunc = BEZIER(S1)(item);
      var surface = MAP(mappingFunc)(domain2D);
      if(result === null)
        result = surface;
      else
        result = STRUCT([result,surface]);
    });
  return result;
}

/*Function that rotates all points of an array, the angle indicated on the axis indicated.*/
function pointRotation(points, degree, axis){
  var rm;
  if(axis===X)
    rm = [[1,0,0],[0,COS(degree),-SIN(degree)],[0,SIN(degree),COS(degree)]];
  if(axis===Y)
    rm = [[COS(degree),0,SIN(degree)],[0,1,0],[-SIN(degree),0,COS(degree)]];
  if(axis===Z)
    rm = [[COS(degree),-SIN(degree),0],[SIN(degree),COS(degree),0],[0,0,1]];
  return points.map(function(item){
      return prodottoMatVect(rm,item);
    });
}

/*Function that perform the product of a matrix and a vector.*/
function prodottoMatVect(mat, vect){
  var result = [];
  mat.forEach(function(item){
    result.push(item[0]*vect[0]+item[1]*vect[1]+item[2]*vect[2])
  });
  return result;
}

/*Function to create a cylinder*/
function CYLINDER(dim){
  function CYLINDER0(intervals){
    var cylinder = DISK(dim[0])(intervals);
    cylinder = EXTRUDE([dim[1]])(cylinder);
    return cylinder;
  }
  return CYLINDER0;
}

function controlPointsAdjusterXY(controls){
    var result = [];
    controls.forEach(function(item){
        item[0]=item[0]/100;
        item[1]=item[1]/100;
        item[1]=-item[1];
        result.push(item);
    });
    return result;
}

function annulus_sector (alpha, r, R) {
  var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  return model;
}

function curveShifter(curve,dh,dv){
  var result = [];
  result.push(curve);
  curveh = pointTranslation(curve, 0, 0, -dh);
  result.push(curveh);
  curvevh  = pointTranslation(curve, 0, dv, -dh);
  result.push(curvevh);
  curvev = pointTranslation(curve, 0, dv, 0);
  result.push(curvev);
  return result;
}

function rectangularSurfaceFromCP(cp,dh,dv){
  var result = null;
  cp.forEach(function(item){
    var cp0 = [];
    var mappings = [];
    cp0 = curveShifter(item,dh,dv);
    cp0.forEach(function(item0){
      var mapc = BEZIER(S0)(item0);
      mappings.push(mapc);
    });
    if(result === null){
      result = bezierSurfaceInterpolator([[mappings[0],mappings[1]],[mappings[1],mappings[2]],[mappings[2],mappings[3]],[mappings[3],mappings[0]]]);  
    } else{
      result = STRUCT([result, bezierSurfaceInterpolator([[mappings[0],mappings[1]],[mappings[1],mappings[2]],[mappings[2],mappings[3]],[mappings[3],mappings[0]]])]);
    }
  });
  return result;
}

/******************UTILS******************/

//DOMAINS
var domain1D = INTERVALS(1)(36);
var domain2D = DOMAIN([[0,1],[0,1]])([36,36]);

/******************FRAME******************/
/******************BOTTOM******************/
var controls0 = [[96,505,0],[358,753,0],[682,802,0],[1008,556,0],[1008,555,0],[1028,541,0],[1047,550,0],[1104,563,0]];
controls0 = controlPointsAdjusterXY(controls0);
var mapc0 = BEZIER(S0)(controls0);
var curve0 = MAP(mapc0)(domain1D);

var cradle1 = rectangularSurfaceFromCP([controls0],0.4,0.2);
cradle1 = T([X])([-0.96])(cradle1);
var cradle2 = R([X,Z])(-PI/36)(cradle1);
cradle1 = R([X,Z])(PI/36)(cradle1);
cradle2 = T([Z])([-4.4])(cradle2);

var closingComponent1 = CUBOID([0.6,0.17,4.8]);
closingComponent1 = T([X,Z])([-0.6,-4.8])(closingComponent1);
closingComponent1 = R([X,Y])(-PI/4.5)(closingComponent1);

var closingComponent2 = CUBOID([0.6,0.18,3.05]);
var closingComponent21 = T([Y])([0.18+0.6])(CUBOID([0.15,0.18,3.05]));
var closingComponent22 = T([Y])([0.18])(CUBOID([0.15,0.6,0.2]));
var closingComponent23 = T([Z])([2.85])(closingComponent22);
closingComponent2 = STRUCT([closingComponent2,closingComponent21,closingComponent22,closingComponent23])
closingComponent2 = R([X,Y])(-PI/12.85)(closingComponent2);
closingComponent2 = T([X,Y,Z])([9.9,-0.535,-3.925])(closingComponent2);

var closingComponents = STRUCT([closingComponent1,closingComponent2]);

var cradle = STRUCT([cradle1, cradle2]);
cradle = T([Y])([5.05])(cradle);
cradle = STRUCT([cradle,closingComponents]);
cradle = COLOR(brownWood)(cradle);

/******************BOTTOM******************/

/******************TOP******************/
var controls1 = [[168,399,0],[311,487,0],[233,448,0],[541,570,0]];
controls1 = controlPointsAdjusterXY(controls1);
var mapc1 = BEZIER(S0)(controls1);
var curve1 = MAP(mapc1)(domain1D);

var controls2 = [[541,570,0],[642,609,0],[597,631,0],[832,510,0],[940,450,0],[932,435,0],[1235,488,0]];
controls2 = controlPointsAdjusterXY(controls2);
var mapc2 = BEZIER(S0)(controls2);
var curve2 = MAP(mapc2)(domain1D);

var part0 = rectangularSurfaceFromCP([controls1,controls2],0.2,0.05);
part0 = T([X,Y])([-1.68,3.93])(part0);

var part1 = annulus_sector(PI, 0.6,0.65);
part1 = EXTRUDE([0.2])(part1);
part1 = R([X,Y])([PI/3.2])(part1);
part1 = T([X,Y,Z])([-0.275,-0.6,-0.2])(part1);

var part2 = annulus_sector(PI, 0.6,0.65);
part2 = EXTRUDE([0.2])(part2);
part2 = R([X,Y])([-PI/1.63])(part2);
part2 = T([X,Y,Z])([10.4,-1.5,-0.2])(part2);

var backrest = STRUCT([part1,part2,part0]);
backrest = T([X,Y])([0.3,1.55])(backrest);

var rotationLeft = R([X,Z])(PI/180);
var traslationLeft = T([Z])([0.45]);
var tranfLeft = COMP([rotationLeft,traslationLeft]);
var backrestLeft = STRUCT(REPLICA(6)([backrest,tranfLeft]));
var rotationRight = R([X,Z])(-PI/180);
var traslationRight = T([Z])([-0.45]);
var tranfRight = COMP([rotationRight,traslationRight]);
var backrestRight = STRUCT(REPLICA(6)([backrest,tranfRight]));

var backrestDetail1 = CUBOID([0.2,0.1,4.7]);
backrestDetail1 = R([X,Y])(PI/6)(backrestDetail1);
backrestDetail1 = T([X,Y,Z])([-0.25,1.3,-2.4])(backrestDetail1);
var backrestDetail2 = CUBOID([0.2,0.1,4.35]);
backrestDetail2 = R([X,Y])(-PI/6)(backrestDetail2);
backrestDetail2 = T([X,Y,Z])([1.5,0.72,-2.3])(backrestDetail2);
var backrestDetail3 = CUBOID([0.2,0.1,3.85]);
backrestDetail3 = R([X,Y])(-PI/18)(backrestDetail3);
backrestDetail3 = T([X,Y,Z])([4.5,-0.5,-2])(backrestDetail3);
var backrestDetail4 = CUBOID([0.2,0.1,3.3]);
backrestDetail4 = R([X,Y])(PI/7)(backrestDetail4);
backrestDetail4 = T([X,Y,Z])([7.8,0.57,-1.75])(backrestDetail4);
var backrestDetail5 = CUBOID([0.2,0.1,2.8]);
backrestDetail5 = R([X,Y])(-PI/18)(backrestDetail5);
backrestDetail5 = T([X,Y,Z])([10.7,0.55,-1.5])(backrestDetail5);

var backrestDetails = STRUCT([backrestDetail1,backrestDetail2,backrestDetail3,backrestDetail4,backrestDetail5]);

backrest = STRUCT([backrestRight,backrestLeft,backrestDetails]);
backrest = T([X,Y,Z])([-0.1,0,-2.3])(backrest);
backrest = COLOR(brownWood)(backrest);

/******************TOP******************/
/******************FRAME******************/

/******************BASEMENT******************/
var leg1 = CYLINDER([0.2,2.2])(36);
leg1 = R([Y,Z])(PI/2)(leg1);
var leg2 = T([Z])([-5])(leg1);
var leg3 = T([X])([7.7])(leg1);
var leg4 = T([X])([7.7])(leg2);
var feet = STRUCT([leg1,leg2,leg3,leg4]);

var support1 = CYLINDER([0.1,5])(36);
support1 = T([Z])([-5])(support1);
var support2 = T([X])([7.7])(support1);
var supports = STRUCT([support1,support2]);
supports = T([Y])([-0.4])(supports);

var trasversalComponent1 = CUBOID([9.25,0.5,0.1]);
var trasversalComponent2 = R([X,Z])([-PI/5.45])(trasversalComponent1);
trasversalComponent2 = T([Z])([-5.1])(trasversalComponent2);
trasversalComponent1 = R([X,Z])([PI/5.45])(trasversalComponent1);
var trasversalComponents = STRUCT([trasversalComponent1,trasversalComponent2]);
trasversalComponents = T([Y])([-1.7])(trasversalComponents)

var base = STRUCT([feet,trasversalComponents,supports]);
base = T([X,Y,Z])([0.9,-0.5,0.1])(base);

base = COLOR(brownWood)(base);

/******************BASEMENT******************/

var model = STRUCT([base,cradle,backrest]);
  
return model
  })();

  exports.author = 'rfenarol';
  exports.category = 'furnitures';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));
