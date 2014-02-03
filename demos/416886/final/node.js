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

    var white = [1.5,1.5,1.5];
var light_brown = [1,133/255,63/255];

var dom2D = DOMAIN([[0,1],[0,1]])([10,10]);

function surface(curves){
  return MAP(BEZIER(S1)(curves))(dom2D);
}

/****************************** OUTSIDE ******************************/

var dx = 14;
var dy = 4;
var dz = 6;

var bottom_side = CUBOID([dx,dy]);
var upper_side = T([2])([dz])(CUBOID([dx,dy]));
var left_side = R([0,2])([-PI/2])(CUBOID([dz,dy]));
var right_side = T([0])([dx])(left_side);
var back_side = T([1])([dy])(R([1,2])([PI/2])(CUBOID([dx,dz])));

var exterior = COLOR(white)(STRUCT([bottom_side, upper_side, left_side, right_side, back_side]));

var dx_recess = 0.2;
var dy_recess = 0.1;
var dz_recess = 0.2;

p1 = [0,0,0];
p2 = [dx,0,0];
p3 = [dx,0,dz];
p4 = [0,0,dz];

p5 = [dx_recess,dy_recess,dz_recess];
p6 = [dx-dx_recess,dy_recess,dz_recess];
p7 = [dx-dx_recess,dy_recess,dz-dz_recess];
p8 = [dx_recess,dy_recess,dz-dz_recess];

var c1 = BEZIER(S0)([p4,p3]);
var c2 = BEZIER(S0)([p8,p7]);

var c3 = BEZIER(S0)([p1,p4]);
var c4 = BEZIER(S0)([p5,p8]);

var c5 = BEZIER(S0)([p1,p2]);
var c6 = BEZIER(S0)([p5,p6]);

var c7 = BEZIER(S0)([p2,p3]);
var c8 = BEZIER(S0)([p6,p7]);

p9 = [dx_recess,dy-0.01,dz_recess];
p10 = [dx-dx_recess,dy-0.01,dz_recess];
p11 = [dx-dx_recess,dy-0.01,dz-dz_recess];
p12 = [dx_recess,dy-0.01,dz-dz_recess];

var c9 = BEZIER(S0)([p12,p11]);
var c10 = BEZIER(S0)([p9,p12]);
var c11 = BEZIER(S0)([p9,p10]);
var c12 = BEZIER(S0)([p10,p11]);


var interior = COLOR(light_brown)(
        STRUCT([surface([c1,c2]), surface([c3,c4]), surface([c5,c6]), surface([c7,c8]), 
            surface([c2,c9]), surface([c4,c10]), surface([c6,c11]), surface([c8,c12])]));


var outside = STRUCT([exterior, interior]);



/****************************** DRAWERS ******************************/

var distance = 0.02;

var dx_drs = dx-(dx_recess*2)-(distance*2);
var dy_drs = dy-dy_recess-(distance);
var dz_drs = dz-(dz_recess*2)-(distance*2);

var dx_dr123 = (2*(dx_drs-distance))/3;
var dy_dr123 = dy_drs;
var dz_dr123 = (dz_drs-distance-distance)/3;

var dx_dr4 = dx_dr123/2;
var dy_dr4 = dy_drs;
var dz_dr4 = dz_drs;

var case123 = COLOR(light_brown)(STRUCT([CUBOID([dx_dr123, dy_dr123, 0.1]), 
                    CUBOID([dx_dr123, 0.1, dz_dr123]), 
                    CUBOID([0.1, dy_dr123, dz_dr123]), 
                    T([0])([dx_dr123-0.1])(CUBOID([0.1, dy_dr123, dz_dr123])), 
                    T([1])([dy_dr123-0.1])(CUBOID([dx_dr123, 0.1, dz_dr123]))]));


var case4 = COLOR(light_brown)(STRUCT([CUBOID([dx_dr4, dy_dr4, 0.1]), 
                    CUBOID([dx_dr4, 0.1, dz_dr4]), 
                    CUBOID([0.1, dy_dr4, dz_dr4]), 
                    T([0])([dx_dr4-0.1])(CUBOID([0.1, dy_dr4, dz_dr4])), 
                    T([1])([dy_dr4-0.1])(CUBOID([dx_dr4, 0.1, dz_dr4]))]));

var space = 0.2;
var dz_figure123 = dz_dr123-(space);
var dz_figure4 = dz_dr4-(space);
var depht = 0.1;

// drawer1

verts11 = [[space,space],[space,dz_figure123],[3.3,dz_figure123],[4.5,1.1],[5,dz_figure123],[5.3,dz_figure123],[5.7,space]];
cells11 = [[6,0,1],[6,2,1],[6,2,3],[6,3,4],[6,4,5]];
figure11 = STRUCT([T([2])([depht])(EXTRUDE([depht])(SIMPLICIAL_COMPLEX(verts11)(cells11))), 
          T([0,1])([2.1,0.5])(CUBOID([1,1,depht]))]);

verts21 = [[5.9,space],[5.5,dz_figure123],[dx_dr123-space,dz_figure123],[dx_dr123-space,space]];
cells21 = [[0,1,3],[1,2,3]];
figure21 = STRUCT([T([2])([depht])(EXTRUDE([depht])(SIMPLICIAL_COMPLEX(verts21)(cells21))), 
          T([0,1])([6.8,0.5])(CUBOID([1,1,depht]))]);

var figures1 = COLOR(white)(STRUCT([figure11, figure21]));

var drawer1 = STRUCT([case123, R([1,2])([PI/2])(figures1)]);


// drawer2

verts12 = [[space,space],[space,dz_figure123],[4.7,dz_figure123],[5,1.1],[4,space]];
cells12 = [[0,1,2],[0,2,3],[3,1,0],[3,4,0]];
figure12 = STRUCT([T([2])([depht])(EXTRUDE([depht])(SIMPLICIAL_COMPLEX(verts12)(cells12))), 
          T([0,1])([2.1,0.5])(CUBOID([1,1,depht]))]);

verts22 = [[5.4,space],[5.8,dz_figure123],[dx_dr123-space,dz_figure123],[dx_dr123-space,space]];
cells22 = [[0,1,3],[1,2,3]];
figure22 = STRUCT([T([2])([depht])(EXTRUDE([depht])(SIMPLICIAL_COMPLEX(verts22)(cells22))), 
          T([0,1])([6.8,0.5])(CUBOID([1,1,depht]))]);

var figures2 = COLOR(white)(STRUCT([figure12, figure22]));

var drawer2 = STRUCT([case123, R([1,2])([PI/2])(figures2)]);


// drawer3

verts13 = [[space,space],[space,dz_figure123],[2.8,dz_figure123],[2.3,space]];
cells13 = [[0,1,3],[1,2,3]];
figure13 = STRUCT([T([2])([depht])(EXTRUDE([depht])(SIMPLICIAL_COMPLEX(verts13)(cells13))), 
          T([0,1])([0.6,0.5])(CUBOID([1,1,depht]))]);

verts23 = [[3,space],[2.7,dz_figure123/2],[3,dz_figure123],[5.6,dz_figure123],[5.6,space]];
cells23 = [[1,2,3],[1,3,4],[1,4,0]];
figure23 = STRUCT([T([2])([depht])(EXTRUDE([depht])(SIMPLICIAL_COMPLEX(verts23)(cells23))), 
          T([0,1])([3.8,0.5])(CUBOID([1,1,depht]))]);

verts33 = [[5.8,space],[5.8,dz_figure123],[dx_dr123-space,dz_figure123],[dx_dr123-space,space]];
cells33 = [[0,1,3],[1,2,3]];
figure33 = STRUCT([T([2])([depht])(EXTRUDE([depht])(SIMPLICIAL_COMPLEX(verts33)(cells33))), 
          T([0,1])([6.8,0.5])(CUBOID([1,1,depht]))]);

var figures3 = COLOR(white)(STRUCT([figure13, figure23, figure33]));

var drawer3 = STRUCT([case123, R([1,2])([PI/2])(figures3)]);


// drawer4

verts14 = [[space,dz_recess+(distance*3)+(dz_dr123*2)],[space,dz_figure4],[2.3,dz_figure4],[2,dz_recess+(distance*3)+(dz_dr123*2)]];
cells14 = [[0,1,3],[1,2,3]];
figure14 = STRUCT([T([2])([depht])(EXTRUDE([depht])(SIMPLICIAL_COMPLEX(verts14)(cells14))), 
          T([0,1])([0.6,dz_figure4-1.2])(CUBOID([1,1,depht]))]);

verts24 = [[space,space],[space,-dz_recess+(distance)+(dz_dr123*2)],[2.3,-dz_recess+(distance)+(dz_dr123*2)],[2.7,dz_figure4],
      [dx_dr4-space,dz_figure4],[dx_dr4-space,dz_recess+(distance*2)+(dz_dr123)], 
      [dx_dr4-2.5,dz_recess+(distance*2)+(dz_dr123)],[1.4,space]];
cells24 = [[0,6,7],[0,6,1],[1,6,2],[2,6,5],[2,5,4],[2,3,4]];
figure24 = STRUCT([T([2])([depht])(EXTRUDE([depht])(SIMPLICIAL_COMPLEX(verts24)(cells24))), 
          T([0,1])([2.8,3.5])(CUBOID([1,1,depht])), T([0,1])([0.8,2])(CUBOID([1,1,depht]))]);

verts34 = [[dx_dr4-2,space],[dx_dr4-2.3,dz_figure123],[dx_dr4-space,dz_figure123],[dx_dr4-space,space]];
cells34 = [[0,1,3],[1,2,3]];
figure34 = STRUCT([T([2])([depht])(EXTRUDE([depht])(SIMPLICIAL_COMPLEX(verts34)(cells34))), 
          T([0,1])([2.8,0.5])(CUBOID([1,1,depht]))]);

var figures4 = COLOR(white)(STRUCT([figure14, figure24, figure34]));

var drawer4 = STRUCT([case4, R([1,2])([PI/2])(figures4)]);


var drawers = STRUCT([T([0,1,2])([dx_recess+distance, dy_recess, dz_recess+distance])(drawer1), 
          T([0,1,2])([dx_recess+distance, dy_recess, dz_recess+(distance*2)+dz_dr123])(drawer2), 
          T([0,1,2])([dx_recess+distance, dy_recess, dz_recess+(distance*3)+(dz_dr123*2)])(drawer3), 
          T([0,1,2])([dx_recess+(distance*2)+dx_dr123, dy_recess, dz_recess+distance])(drawer4)]);


/****************************** FEET ******************************/

base = CUBOID([0.3,0.3,0.01]);

side_left = T([0,1])([0.05,0.05])(R([0,2])([-PI/45])(CUBOID([0.01,0.2,1.8])));
side_right = T([0,1])([0.24,0.05])(R([0,2])([PI/45])(CUBOID([0.01,0.2,1.8])));

verts = [[0,0],[-0.028,0.5],[0.2+0.028,0.5],[0.2,0]];
cells = [[0,1,2],[0,2,3]];
trapeze = R([1,2])([PI/2])(EXTRUDE([0.01])(SIMPLICIAL_COMPLEX(verts)(cells)));

front = T([0,1])([0.051,0.06])(trapeze);
back = T([0,1])([0.051,0.25])(trapeze);

function circle(r, h) {
  var domain = DOMAIN([[0, 2*PI],[0,r]])([30,30]);
  var mapping = function(v) {
    var a = v[0];
    var r = v[1];

    return [r*COS(a), r*SIN(a), h];
  }

  model = MAP(mapping)(domain);

  return model;
} 

top_side = T([0,1,2])([0.15,0.15,1.77])(STRUCT([CYL_SURFACE([0.5,0.1])([30,30]), circle(0.5,0), circle(0.5,0.1)]));

var foot = COLOR([184/255, 134/255, 11/255])(STRUCT([base, side_left, side_right, front, back, top_side]));

var feet = STRUCT([T([0,1,2])([-0.15+2,-0.15+0.8, -1.87])(foot), T([0,1,2])([-0.15-2+dx,-0.15+0.8, -1.87])(foot), 
          T([0,1,2])([-0.15-2+dx,-0.15-0.8+dy, -1.87])(foot), T([0,1,2])([-0.15+2,-0.15-0.8+dy, -1.87])(foot)])


/****************************** COMMODE ******************************/

var model = STRUCT([outside, drawers, feet]);



  return model
  })();

  exports.author = 'Phoenyx89';
  exports.category = 'furnitures';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));