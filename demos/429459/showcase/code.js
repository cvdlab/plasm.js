//////////CHOICE
var definition = 6
var DEF=prompt("Please enter the definition that you want; Pay attention! An high definition means much time to load the model! (Middle = 1min ca)","low-middle-high");

if(DEF === "low"){
  definition = 6;
  var definitionDisks = [32, 2];
}
else if(DEF === "middle"){
  definition = 16;
  var definitionDisks = [64, 2];
}
else if(DEF === "high"){
  definition = 42;
  var definitionDisks = [100, 2];
}
else{
  alert("incorrect value");
  return false;
}
var joyColorConfirm = confirm("Click OK to view a black Joypad, or Cancel, to view a white joypad!");
var baseColor = [];
var buttonsColor = [];
if(joyColorConfirm){
  baseColor = [0.35,0.35,0.35];
  buttonsColor = [1,1,1];
}
else{
  baseColor = [1,1,1];
  buttonsColor = [0,0,0];
}

//DOMAINS//
var dom1D = INTERVALS(1)(definition);
var dom2D = PROD1x1([INTERVALS(1)(definition), INTERVALS(1)(definition)]);


/////////////UTILITIES////////////////////////////UTILITIES////////////////////////////UTILITIES///////////////
/////////////UTILITIES////////////////////////////UTILITIES////////////////////////////UTILITIES///////////////
/////////////UTILITIES////////////////////////////UTILITIES////////////////////////////UTILITIES///////////////
/////////////UTILITIES////////////////////////////UTILITIES////////////////////////////UTILITIES///////////////

function addACoordinate(coordinate, value, arrayOfArrays){
  if(coordinate === 0)
    return arrayOfArrays.map( function(item){
      return [value,item[0],item[1]];
    });
  
  if(coordinate === 1)
    return arrayOfArrays.map( function(item){
      return [item[0],value,item[1]];
    });
      
  if(coordinate === 2)
    return arrayOfArrays.map( function(item){
      return [item[0],item[1],value];
    });
    
}

function addOnACoordinate(coordinate, value, arrayOfArrays){
    
    if(coordinate === 0)
      return arrayOfArrays.map( function(item){
        return [value+item[0],item[1],item[2]];
      });
  
    if(coordinate === 1)
      return arrayOfArrays.map( function(item){
        return [item[0],value+item[1],item[2]];
      });
      
    if(coordinate === 2)
      return arrayOfArrays.map( function(item){
        return [item[0],item[1],value+item[2]];
      });
    
}

function addOnMooreCoordinates(coordinates, values, arrayOfArrays){
  for (var i=0; i<coordinates.length; i++){
      arrayOfArrays = addOnACoordinate(coordinates[i], values[i], arrayOfArrays);
    }
  return arrayOfArrays;
}

///////////   get Min-Max X-Y     ///////////

function getMinX(array){
  var minX = array[0][0];
  array.forEach(function(a){
    if(a[0]<minX)
      minX = a[0];  
  });
  return minX;
}

function getMaxX(array){
  var maxX = array[0][0];
  array.forEach(function(a){
    if(a[0]>maxX)
      maxX = a[0];  
  });
  return maxX;
}

function getMinY(array){
  var minY = array[0][1];
  array.forEach(function(a){
    if(a[1]<minY)
      minY = a[1];  
  });
  return minY;
}

function getMaxY(array){
  //console.log(JSON.stringify(array))
  var maxY = array[0][1];
  array.forEach(function(a){
    if(a[1]>maxY)
      maxY = a[1];  
  });
  return maxY;
}


function centerPoint(array){
  if (array[0][2] === null)
    var zz = 0;
  else
    var zz = array[0][2];

  var top, bottom, left, right;
  top = getMaxY(array);
  bottom = getMinY(array);
  left = getMinX(array);
  right = getMaxX(array);

  center = [(top+bottom)/2.0, (left+right)/2.0, zz];
  return center;
}

function collapseArrays(arrayOfarrays){
  var totalArray=[];
  arrayOfarrays.forEach(
      function(a){
        a.forEach(
          function(aa){
            totalArray.push(aa);
          });
      });
  return totalArray;
}


function fillClosedCurveBySegments(curves){
  var centerP = centerPoint(collapseArrays(curves));
  var surface_pieces = [];

  for (var i=0; i<curves.length; i++){
    var curve_i = BEZIER(S0)(curves[i]);
    surface_pieces.push(MAP(BEZIER(S1)([curve_i, centerP]))(dom2D));
  }
  return STRUCT(surface_pieces);
}


function mirrorOnX(points, pointOfMirroring){
  var pointsToReturn = [];
  points.map(
    function(item){
      pointsToReturn.push([(item[0] + (pointOfMirroring - item[0])*2), item[1], item[2]]);
    });
  return pointsToReturn;
}


function sphere(r, definition){
    if(r === undefined || r === null)
      var rr = 1;
    else
      var rr = r;

    if(definition === undefined || definition === null)
      var definitionx = 1;
    else
      var definitionx = r;

    var domain = DOMAIN([[0,2*PI],[0,2*PI]])([definitionx*36,definitionx*36]);
    var mapping = function (v) {
        var a = v[0];
        var b = v[1];

        var u = rr*SIN(a)*COS(b);
        var v = rr*SIN(a)*SIN(b);
        var w = rr*COS(a);

        return[u,v,w];
    }
  var model = MAP(mapping)(domain);
  DRAW(model);
}



function semisphere(r, definition){
    if(r === undefined || r === null)
      var rr = 1;
    else
      var rr = r;

    if(definition === undefined || definition === null)
      var definitionx = 1;
    else
      var definitionx = r;

    var domain = DOMAIN([[0,PI],[0,PI]])([definitionx*36,definitionx*36]);
    var mapping = function (v) {
        var a = v[0];
        var b = v[1];

        var u = rr*SIN(a)*COS(b);
        var v = rr*SIN(a)*SIN(b);
        var w = rr*COS(a);

        return[u,v,w];
    }
  var model = MAP(mapping)(domain);
  DRAW(model);
}



function circonference(r) {
  return function (v) {
    return [r*COS(v[0]), r*SIN(v[0])];
  }
}

function circonference(r){
  var domain = DOMAIN([[0,2*PI]])([36]);
  var mapping = circonference(r);

  return (MAP(mapping)(domain));
}

function emptyCilynder(r,h){
  return extrude(circonference(r),h);
}

function bezier_circle_map(r,selector){ 
  if (selector === undefined) 
    selector = S0 
    var base_points = [[-1,0,0],[-1,1.6,0],[1.6,1.6,0],[1.6,0,0],[1.6,-1.6,0],[-1,-1.6,0],[-1,0,0]];
    var circle_points = scalePoints(base_points,r);
    return BEZIER(selector)(circle_points);
}

function bezier_circle(r){
return MAP(bezier_circle_map(r))(INTERVALS(1)(64));
}

var scalePoints = function(points,values) {
  return points.map(function(item){
    return item.map(function(elem){
      return elem*values;
    });
  });
}

var drawable_objects = [];

function draw(obj){
drawable_objects.push(obj);
DRAW(obj);
}

function drawMultiple(array){
    array.map(
          function(a){
            draw(a);
          }
      );
}

function hide(obj){
drawable_objects = drawable_objects.filter( function(item){
return item !== obj;
});
HIDE(obj);
}

function hideAll(){
while(drawable_objects.length>0)
HIDE(drawable_objects.pop()); 
}

//Funzione che mi permette di inserire i colori in rgb con range [0,255]
function rgb(color){
return [color[0]/255, color[1]/255, color[2]/255];
}

//Funzione che mi permette di inserire i colori in rgba con range [0,255]
function rgba(color){
return [color[0]/255, color[1]/255, color[2]/255, color[3]/100];
}

//Funzioni utili per la misurazione
function grid2D(dimens,axis1,axis2){

    alfa = 30

    function semi_grid(ax1,ax2){
        var grid_object = function(point){
            if (point===-1)
            return ;

            start = [0,0,0];
            end = [0,0,0];
            start[ax2] = point;
            end[ax2] = point;
            end[ax1] = dimens;


    return STRUCT([POLYLINE([start,end]), grid_object(point-1)]);
};
return COLOR(rgba([200,200,200,alfa]))(grid_object(dimens));
};

return STRUCT([semi_grid(axis1,axis2),semi_grid(axis2,axis1)]);

}

function grid3D(dimens){

var grid_xy = grid2D(dimens,0,1);
var grid_xz = grid2D(dimens,0,2);

grid_xy = STRUCT(REPLICA(dimens+1)([grid_xy,T([2])([1])]));
grid_xz = STRUCT(REPLICA(dimens+1)([grid_xz,T([1])([1])]));

return STRUCT([grid_xy,grid_xz]);
}


//isInt
function isInt(val){
  if (val - parseInt(val) < 0.01){
    return true;
  }
  return false;
}

//grid3DLightDetailed
function grid3DLightDetailed(dimens){
  return STRUCT([grid2Ddetailed(dimens,0,1),grid2Ddetailed(dimens,0,2),grid2Ddetailed(dimens,1,2)]);
}

//grid2Ddetailed
function grid2Ddetailed(dimens,axis1,axis2){
  var semi_grid = function (ax1,ax2){
    var grid_object = function(point){
      
      start = [0,0,0];
      end = [0,0,0];
      start[ax2] = point;
      end[ax2] = point;
      end[ax1] = dimens;
      
      if (point < 0.01){
       return COLOR([1,0,0,0.5])(POLYLINE([start,end]));
      }
      if (isInt(point)){
        return STRUCT([COLOR([1,0,0,0.5])(POLYLINE([start,end])), grid_object(point-0.1)]);
      }
        return STRUCT([COLOR(rgb([200,200,200,0.5]))(POLYLINE([start,end])), grid_object(point-0.1)]);
    } 
          return grid_object(dimens);
  }
          return STRUCT([semi_grid(axis1,axis2),semi_grid(axis2,axis1)]);
}


/////////////END UTILITIES////////////////////////////END UTILITIES////////////////////////////END UTILITIES///////////////
/////////////END UTILITIES////////////////////////////END UTILITIES////////////////////////////END UTILITIES///////////////
/////////////END UTILITIES////////////////////////////END UTILITIES////////////////////////////END UTILITIES///////////////
/////////////END UTILITIES////////////////////////////END UTILITIES////////////////////////////END UTILITIES///////////////
/////////////END UTILITIES////////////////////////////END UTILITIES////////////////////////////END UTILITIES///////////////

/////////////////////////////////////



///////PS3 JOYSTICk///////

var bigDiskSx = DISK(0.8)(definitionDisks);
bigDiskSx = EXTRUDE([0,0,1])(bigDiskSx);

var littleDiskSx = DISK(0.5)(definitionDisks);
littleDiskSx = T([0,1])([0.72, -0.68])(littleDiskSx);
littleDiskSx = EXTRUDE([0,0,1])(littleDiskSx);

var firstPieceSx = STRUCT([bigDiskSx, littleDiskSx]);

///
var bigDiskDx = DISK(0.8)(definitionDisks);
bigDiskDx = EXTRUDE([0,0,1])(bigDiskDx);

var littleDiskDx = DISK(0.5)(definitionDisks);
littleDiskDx = T([0,1])([-0.72, -0.68])(littleDiskDx);
littleDiskDx = EXTRUDE([0,0,1])(littleDiskDx);

var firstPieceDx = STRUCT([bigDiskDx, littleDiskDx]);
firstPieceDx = T([0])([3])(firstPieceDx);

//TRANSLATIONS
firstPieceDx = T([0,1])([1.03, 2.03])(firstPieceDx)
firstPieceSx = T([0,1])([1.03, 2.03])(firstPieceSx)

///DA RIFARE CON CURVE////
///Central Body
var central_body_block1 = DOMAIN([[1.3, 3.69], [1.21, 2.64], [0.1, 0.9]])([1,1,1]);

var ccurv1 = BEZIER(S0)([[1.4, 1.21, 0.1], [3.69, 1.21, 0.1]]);
var ccurv2 = BEZIER(S0)([[1.4, 1, 0.1], [3.69, 1, 0.1]]);
var ccurv3 = BEZIER(S0)([[1.4, 1, 0.9], [3.69, 1, 0.9]]);
var ccurv4 = BEZIER(S0)([[1.4, 1.21, 0.9], [3.69, 1.21, 0.9]]);
var csurf1 = BEZIER(S1)([ccurv1, ccurv2, ccurv3, ccurv4]);
csurf1 = MAP(csurf1)(dom2D);

var ccurv5 = BEZIER(S0)([[1.25, 2.64, 0.1], [3.8, 2.64, 0.1]]);
var ccurv6 = BEZIER(S0)([[1.25, 2.85, 0.1], [3.8, 2.85, 0.1]]);
var ccurv7 = BEZIER(S0)([[1.25, 2.85, 0.9], [3.8, 2.85, 0.9]]);
var ccurv8 = BEZIER(S0)([[1.25, 2.64, 0.9], [3.8, 2.64, 0.9]]);
var csurf2 = BEZIER(S1)([ccurv5, ccurv6, ccurv7, ccurv8]);
csurf2 = MAP(csurf2)(dom2D);

var central_body = STRUCT([csurf1, csurf2, central_body_block1]);

////


////Buttons-Quadrants////
var quarter1_1 = [[0.3, 2.26], [0.33, 2.48], [0.57, 2.69], [0.8, 2.78]];
quarter1_1 = BEZIER(S0)(quarter1_1);
var quarter1surf_1 = BEZIER(S1)([quarter1_1, [0.8, 2.26]]);
quarter1surf_1 = MAP(quarter1surf_1)(dom2D);

var quarter1_2 = [[1.25, 2.8], [1.12, 2.84], [0.9, 2.82], [0.8, 2.78]];
quarter1_2 = BEZIER(S0)(quarter1_2);
quarter1_2_1 = BEZIER(S0)([[1.25, 2.61], [0.8, 2.61]]);
var quarter1surf_2 = BEZIER(S1)([quarter1_2, quarter1_2_1]);
quarter1surf_2 = MAP(quarter1surf_2)(dom2D);

var quarter1_tot = STRUCT([quarter1surf_1, quarter1surf_2]);

var quarter2_tot = T([0,1])([3.1, 1.02])(R([0,1])(PI/2)(quarter1_tot));
var quarter1_2_tot = STRUCT([quarter1_tot, quarter2_tot]);
var quarter3_4_tot = T([0,1])([2.09,4.12])(R([0,1])(PI)(quarter1_2_tot));

var quadrantSx = STRUCT([quarter1_2_tot, quarter3_4_tot]);

quadrantSx = EXTRUDE([0,0,0.06])(quadrantSx);
quadrantSx = T([0,1,2])([-0.02, -0.02, 0.95])(quadrantSx);

quadrantDx = T([0])([3])(quadrantSx);

// buttons //
var bcurve1 = addACoordinate(1,0,[[0.18, 0], [0.18, 0.18], [0.12, 0.18], [0, 0.18]]);
bcurve1 = BEZIER(S1)(bcurve1);

var circ = bezier_circle_map(1, S0)

var circle_button1 = PROFILEPROD_SURFACE([bcurve1,circ]);
circle_button1 = MAP(circle_button1)(dom2D);
circle_button1 = T([0,1,2])([4.03, 1.7, 0.95])(circle_button1);
var circle_button2 = T([0,1])([-0.36, 0.32])(circle_button1);
var circle_button3 = T([0,1])([-0.04, 0.7])(circle_button1);
var circle_button4 = T([0,1])([0.32, 0.36])(circle_button1);

///Symbols on buttons
// var cross = STRUCT([ POLYLINE([[4, 1.6, 1.2], [4.07, 1.7, 1.2]]), POLYLINE([[4.07, 1.6, 1.2], [4, 1.7, 1.2]]) ]);
// cross = COLOR([100/255.0, 149/255.0, 237/255.0])(cross);
// draw(cross)
// var triangle = 
// var circle =
// var square = 


///penta-Buttons
var ncpVector = [0,0,-0.2];

var penta_button1_part1 = BEZIER(S0)([[0,0.15,0], [-0.1, 0.25, 0.1]]);
var penta_button1_part2 = BEZIER(S0)([[0,0.15,0], [0.1, 0.25, 0.1]]);
var penta_button1_surf1lat = CYLINDRICAL_SURFACE(penta_button1_part1)(ncpVector);
var penta_button1_surf2lat = CYLINDRICAL_SURFACE(penta_button1_part2)(ncpVector);

var penta_button1_part3 = BEZIER(S0)([[-0.1, 0.25, 0.1], [-0.1, 0.4, 0.14]]);
var penta_button1_part4 = BEZIER(S0)([[0.1, 0.25, 0.1], [0.1, 0.4, 0.14]]);
var penta_button1_surf3lat = CYLINDRICAL_SURFACE(penta_button1_part3)(ncpVector);
var penta_button1_surf4lat = CYLINDRICAL_SURFACE(penta_button1_part4)(ncpVector);
var penta_button1_surf5lat = CYLINDRICAL_SURFACE(BEZIER(S0)([[-0.1, 0.4, 0.14], [0.1, 0.4, 0.14]]))(ncpVector);

var penta_button1_surf1 = BEZIER(S1)([penta_button1_part1, penta_button1_part2]);
var penta_button1_surf2 = BEZIER(S1)([penta_button1_part3, penta_button1_part4]);

penta_button1_surf1lat = MAP(penta_button1_surf1lat)(dom2D);
penta_button1_surf2lat = MAP(penta_button1_surf2lat)(dom2D);
penta_button1_surf3lat = MAP(penta_button1_surf3lat)(dom2D);
penta_button1_surf4lat = MAP(penta_button1_surf4lat)(dom2D);
penta_button1_surf5lat = MAP(penta_button1_surf5lat)(dom2D);

penta_button1_surf1 = MAP(penta_button1_surf1)(dom2D);
penta_button1_surf2 = MAP(penta_button1_surf2)(dom2D);

var penta_button1 = STRUCT([penta_button1_surf1, penta_button1_surf2, penta_button1_surf1lat,
                            penta_button1_surf2lat, penta_button1_surf3lat, penta_button1_surf4lat,
                            penta_button1_surf5lat]);
/////////////
var penta_button2 = R([0,1])([PI/2])(penta_button1);
var penta_button3 = R([0,1])([PI/2])(penta_button2);
var penta_button4 = R([0,1])([PI/2])(penta_button3);

var penta_buttons = STRUCT([penta_button1, penta_button2, penta_button3, penta_button4]);
penta_buttons = T([0,1,2])([1, 2.05, 1])(penta_buttons);
////////////////////////



////////////////////////

///////Grips
var gripSx_1 = BEZIER(S0)([[0.25, 1.91, 0.5], [0.2, 1.04, -0.122580645], [-0.1, 0.3, -0.819354839], [0.5, 0, -0.4]]);
var gripControlSx_12 = BEZIER(S0)([[0.1, 1.6, 0.7], [0, 1, 1.6], [-0.3, 0, 0.7], [0.5, 0, -0.4]]);
var gripSx_2 = BEZIER(S0)([[0.89, 1.31, 1.5], [0.5, 0.76, 2], [0.47, 0, 1.6], [0.5, 0, -0.4]]);
var gripSx_3 = BEZIER(S0)([[0.89, 1.31, 0], [0.7, 0.76, -1], [0.67, 0, -1.4], [0.5, 0, -0.4]]);
var gripSx_4 = BEZIER(S0)([[2.8, 1.63, 0.5], [2.18, 0.76, -0.122580645], [2.8, -0.5, -0.819354839], [0.5, 0, -0.4]]);


var gripSx = BEZIER(S1)([gripSx_1, gripControlSx_12, gripSx_2, gripSx_4, gripSx_3, gripSx_1]);
gripSx = MAP(gripSx)(dom2D);

var gripDx_1 = BEZIER(S0)(mirrorOnX([[0.25, 1.91, 0.5], [0.2, 1.04, -0.122580645], [-0.1, 0.3, -0.819354839], [0.5, 0, -0.4]], 2.8));
var gripControlDx_12 = BEZIER(S0)(mirrorOnX([[0.1, 1.6, 0.7], [0, 1, 1.6], [-0.3, 0, 0.7], [0.5, 0, -0.4]], 2.8));
var gripDx_2 = BEZIER(S0)(mirrorOnX([[0.89, 1.31, 1.5], [0.5, 0.76, 2], [0.47, 0, 1.6], [0.5, 0, -0.4]], 2.8));
var gripDx_3 = BEZIER(S0)(mirrorOnX([[0.89, 1.31, 0], [0.7, 0.76, -1], [0.67, 0, -1.4], [0.5, 0, -0.4]], 2.8));
var gripDx_4 = BEZIER(S0)(mirrorOnX([[2.8, 1.63, 0.5], [2.18, 0.76, -0.122580645], [2.8, -0.5, -0.819354839], [0.5, 0, -0.4]], 2.8));

var gripDx = BEZIER(S1)([gripDx_1, gripControlDx_12, gripDx_2, gripDx_4, gripDx_3, gripDx_1]);

gripDx = MAP(gripDx)(dom2D);
gripDx = T([0])([-0.6])(gripDx);

///////// L1 L2 R1 R2 ////////////
var buttonTopLeft_part1 = BEZIER(S0)([[0.66, 2.74, 1], [0.68, 3.12, 1], [0.76, 3.03, 1], [0.97, 3.08, 1], [1.34, 3.02, 1], [1.36, 3.03, 1], [1.31, 2.74, 1]]);
var buttonTopLeft_part2 = BEZIER(S0)([[0.66, 2.74, 1], [1.31, 2.74, 1]]);

var buttonTopLeft_part1_surf = BEZIER(S1)([buttonTopLeft_part1, buttonTopLeft_part2]);
buttonTopLeft_part1_surf = MAP(buttonTopLeft_part1_surf)(dom2D);

var buttonTopLeft_part3 = BEZIER(S0)([[0.66, 2.74, 0.3], [0.68, 3.12, 0.3], [0.76, 3.03, 0.3], [0.97, 3.08, 0.3], [1.34, 3.02, 0.3], [1.36, 3.03, 0.3], [1.31, 2.74, 0.3]]);
var buttonTopLeft_part4 = BEZIER(S0)([[0.66, 2.74, 0.3], [1.31, 2.74, 0.3]]);

var buttonTopLeft_part2_surf = BEZIER(S1)([buttonTopLeft_part3, buttonTopLeft_part4]);
buttonTopLeft_part2_surf = MAP(buttonTopLeft_part2_surf)(dom2D);


var buttonTopLeft_surfLat = BEZIER(S1)([buttonTopLeft_part1, buttonTopLeft_part3]);
buttonTopLeft_surfLat = MAP(buttonTopLeft_surfLat)(dom2D);


var l1l2_base = STRUCT([buttonTopLeft_surfLat, buttonTopLeft_part1_surf, buttonTopLeft_part2_surf]);

var l1 = S([0,1,2])([0.8,0.3,0.3])(l1l2_base);
l1 = T([0,1,2])([0.205, 2.18, 0.65])(l1);

var l2 = S([0,1,2])([0.8,0.3,0.5])(l1l2_base);
l2 = T([0,1,2])([0.205, 2.18, 0.2])(l2);

var l1l2 = STRUCT([l1, l2]);

//////R
var r1r2_base = T([0])([3.1])(l1l2_base);
var r1r2 = T([0])([3.1])(l1l2);


//ANALOG

var analog1_part1 = BEZIER(S1)([[0.34, 0, 0.14], [0.27, 0, 0.35], [0.14, 0, 0.37], [0.06, 0, 0.44]]);
var analog1_part2 = BEZIER(S1)([[0.06, 0, 0.44], [-0.11, 0, 0.73], [0.73, 0, 0.79], [0, 0, 0.8]]);

analog1_part1 = PROFILEPROD_SURFACE([analog1_part1, circ]);
analog1_part2 = PROFILEPROD_SURFACE([analog1_part2, circ]);

analog1_part1 = MAP(analog1_part1)(dom2D);
analog1_part2 = MAP(analog1_part2)(dom2D);

var analog1 = STRUCT([analog1_part1, analog1_part2]);
analog1 = S([0,1,2])([1.2, 1.2, 0.7])(analog1);
analog1 = T([0,1,2])([1.75, 1.35, 0.86])(analog1);

var analog2 = T([0])([1.55])(analog1);


//Start select
//start
var start_h = 0.2
var start_line = BEZIER(S0)([[0, 0, start_h], [0, 0.2, start_h]]);
start_surf = CONICAL_SURFACE([0.25, 0.1, start_h])(start_line);
start_surf = MAP(start_surf)(dom2D);
var start_surf_border_1 = BEZIER(S0)([[0, 0, 0], [0, 0.2, 0]]);
var start_surf_border_2 = BEZIER(S0)([[0, 0.2, 0], [0.25, 0.1, 0]]);
var start_surf_border_3 = BEZIER(S0)([[0.25, 0.1, 0], [0, 0, 0]]);

var start_surf_border_4 = BEZIER(S0)([[0, 0, start_h], [0, 0.2, start_h]]);
var start_surf_border_5 = BEZIER(S0)([[0, 0.2, start_h], [0.25, 0.1, start_h]]);
var start_surf_border_6 = BEZIER(S0)([[0.25, 0.1, start_h], [0, 0, start_h]]);

start_surf_border_1 = BEZIER(S1)([start_surf_border_1, start_surf_border_4]);
start_surf_border_2 = BEZIER(S1)([start_surf_border_2, start_surf_border_5]);
start_surf_border_3 = BEZIER(S1)([start_surf_border_3, start_surf_border_6]);
start_surf_border_1 = MAP(start_surf_border_1)(dom2D);
start_surf_border_2 = MAP(start_surf_border_2)(dom2D);
start_surf_border_3 = MAP(start_surf_border_3)(dom2D);


var start_button = STRUCT([start_surf_border_1, start_surf_border_2, start_surf_border_3, start_surf]);
start_button = T([0,1,2])([2.8,1.9,0.8])(start_button);

var select_button = DOMAIN([[1.92, 2.17], [1.92, 2.08], [0.85, 1]])([1,1,1]);

//central button
var central_button = T([0,1,2])([-1.52, 0, -0.1])(circle_button1);
central_button = COLOR([0.94, 0.97, 1, 0.53])(central_button);

//////LAST OPERATIONS////
var joystick_ps3 = STRUCT([firstPieceDx, firstPieceSx, central_body, quadrantSx, quadrantDx, gripSx, gripDx, l1l2_base, r1r2_base]);
joystick_ps3 = COLOR(baseColor)(joystick_ps3);
var buttons = STRUCT([circle_button1, circle_button2, circle_button3, circle_button4,
                      penta_buttons, r1r2, l1l2, analog1, analog2, start_button, select_button]);
buttons = COLOR(buttonsColor)(buttons);

// draw(central_button);
// draw(buttons);
// draw(joystick_ps3);

model = STRUCT([joystick_ps3, buttons, central_button]);
