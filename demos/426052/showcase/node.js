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
  

var dom1D = INTERVALS(1)(32)
var dom2D = PROD1x1([dom1D,dom1D])

function translate(points,s){
  points = points.map(function(p){return [p[0]+s[0],p[1]+s[1],p[2]+s[2]]});
  return points;
}

function figure2d(p0,p1){
  c0 = BEZIER(S0)(p0);
  c1 = BEZIER(S0)(p1);
  c = BEZIER(S1)([c0,c1]);
  return c;
}

function camera_depth(p0,p1){
  c0 = BEZIER(S0)(p0);
  p00 = translate(p0,[0,1.1,0]);
  c00 = BEZIER(S0)(p00);
  c1 = BEZIER(S0)(p1);
  p11 = translate(p1,[0,1.6,0]);
  c11 = BEZIER(S0)(p11);
  c = BEZIER(S1)([c1,c0,c00,c11]);
  return c;
}


function repeat_obj_N(f,n){
var fig = f;
      for(i=0; i<n; i++){
        f1 = T([0])([0.14])(fig);
        fig = STRUCT([fig,f1]);
    }
return fig;
}

function cylinder(r,h){
  d = DISK(r)(48)
  c = EXTRUDE([h])(d)
  return c
}


function arc(alpha,r,R){
  var domain = DOMAIN([[0,alpha], [r,R]])([36,1]);
  var mapping = function(v){
    var a = v[0];
    var r = v[1];
    return [r*COS(a), r*SIN(a)];
  };
  var model = MAP(mapping)(domain);
  return model;
};


///////////// COLORS ////////////////////////////////////////////////////////////////////////////////////////////


c_camera = [0.87,0.1921,0.3882,1]
c_details = [1,1,0.94,1]
c_flash = [0.6745,0.882352,0.68627,0.8]
c_black = [0,0,0,1]
c_obj = [0.184,0.184,0.184,1]
c_play = [0.38823,0.5921,0.8157]
c_silver = [0.75294,0.75294,0.75294,1]


///////////// CANON ////////////////////////////////////////////////////////////////////////////////////////////


l_c0 = [[4.54,0,2.9],[3.31,0,2.22],[3.39,0,4.12],[4.54,0,3.38]]
l_c1 = [[4.54,0,2.98],[3.76,0,2.44],[3.72,0,3.87],[4.54,0,3.33]]

l_c = MAP(figure2d(l_c0,l_c1))(dom2D)

l_a0 = [[4.75,0,3.3],[5.36,0,3.7],[5.21,0,2.97],[5.38,0,2.76]]
l_a1 = [[4.75,0,3.3],[5.12,0,3.4],[5.07,0,3],[5.15,0,2.78]]

l_a_0 = MAP(figure2d(l_a0,l_a1))(dom2D)

l_a2 = [[5.13,0,3.13],[4.29,0,3.35],[4.6,0,2.39],[5.21,0,2.91]]
l_a3 = [[5.14,0,3.08],[4.77,0,3.2],[4.74,0,2.68],[5.21,0,2.91]]

l_a_1 = MAP(figure2d(l_a2,l_a3))(dom2D)

l_a = STRUCT([l_a_0,l_a_1])

l_n0 = [[5.35,0,3.33],[5.61,0,3.38],[5.71,0,3.7],[5.67,0,2.8]]
l_n1 = [[5.35,0,3.33],[5.37,0,3.15],[5.49,0,3.6],[5.46,0,2.8]]

l_n_0 = MAP(figure2d(l_n0,l_n1))(dom2D)
l_n_1 = T([0])([0.3])(l_n_0)

l_n = STRUCT([l_n_0,l_n_1])

l_o0 = [[6.44,0,2.77],[5.93,0,2.82],[6.05,0,3.43],[6.44,0,3.4]]
l_o1 = [[6.44,0,2.83],[6.35,0,2.92],[6.35,0,3.25],[6.44,0,3.34]]

l_o_0 = MAP(figure2d(l_o0,l_o1))(dom2D)
l_o_1 = T([0])([12.88])(R([0,1])([PI])(l_o_0))

l_o = T([0,2])([1.65,-2.22])(R([0,2])([-PI/8])(STRUCT([l_o_0,l_o_1])))

l_n1 = T([0])([1.4])(l_n)

canon_0 = SCALE([0,1,2])([0.65,0.65,0.65])(STRUCT([l_c,l_a,l_n,l_o,l_n1]))
canon = T([0,1,2])([-0.5,-0.01,1.3])(canon_0)

canon_1 = R([0,1])([PI])(SCALE([0,1,2])([0.5,0.5,0.5])(canon_0))
canon1 = T([0,1,2])([9.3,1.61,-0.13])(canon_1)


//////// ON/OFF ///////////////////////////////////////////////////////////////////////////////////////////////


p_o0 = [[0.1,0,0],[0,0,0.05],[0,0,0.25],[0.1,0,0.3]]
p_o1 = MAP(BEZIER(S0)(p_o0))(dom1D)
p_o2 = [[0.1,0,0],[0.2,0,0.05],[0.2,0,0.25],[0.1,0,0.3]]
p_o3 = MAP(BEZIER(S0)(p_o2))(dom1D)

p_o = STRUCT([p_o1,p_o3])
p_n = POLYLINE([[0.21,0,0],[0.21,0,0.3],[0.37,0,0],[0.37,0,0.3]])
p_b = POLYLINE([[0.4,0,0],[0.49,0,0.3]])
p_o1 = T([0])([0.5])(p_o)
p_f = POLYLINE([[0.7,0,0],[0.7,0,0.17],[0.8,0,0.17],[0.7,0,0.17],[0.7,0,0.3],[0.83,0,0.3]])
p_f1 = T([0])([0.15])(p_f)

on_off0 = COLOR(c_silver)(R([0,1])([PI])(STRUCT([p_o,p_n,p_b,p_o1,p_f,p_f1])))

on_off = T([0,1,2])([4.8,1.61,5.3])(SCALE([0,1,2])([0.75,0.75,0.75])(on_off0))


////////// FLASH //////////////////////////////////////////////////////////////////////////////////////////////////


f_0 = COLOR(c_details)(T([0,1,2])([8,1.3,6])(R([1,2])(PI/8)(CUBOID([2.6,0.15,1.1]))))

f1 = CUBOID([2.55,0.4,0.5])
f2 = T([2])([0.4])(CUBOID([0.4,0.4,0.4]))
f3 = T([0])([2.15])(f2)
f4 = T([2])([0.8])(CUBOID([2.55,0.4,0.1]))

f_1 = COLOR([0,0,0,1])(STRUCT([f1,f2,f3,f4]))
f_2 = T([0,1,2])([8,0.9,6])(R([1,2])(PI/8)(f_1))

f_3 = COLOR(c_flash)(T([0,1,2])([8.4,0.8,6.4])(R([1,2])(PI/8)(CUBOID([1.75,0.4,0.4]))))

flash = STRUCT([f_0,f_2,f_3])


////// BOTTOM ///////////////////////////////////////////////////////////////////////////////////////////////////


i0 = [[0.9,0,0.6],[0.6,0.2,0.6],[0.6,1.4,0.6],[0.9,1.6,0.6]]
i1 = [[11.1,0,0.6],[11.4,0.2,0.6],[11.4,1.4,0.6],[11.1,1.6,0.6]]

bottom_camera = COLOR(c_camera)(MAP(figure2d(i1,i0))(dom2D))


/////// TOP //////////////////////////////////////////////////////////////////////////////////////////////////////


c0 = [[5.8,0.1,6.39],[9,0.1,6.39]]
c1 = [[5.8,0,5.9],[9,0,5.9]]

c_0 = MAP(camera_depth(c0,c1))(dom2D)

c2 = [[3.2,0.1,6.4],[3.5,0.1,6.8],[5.7,0.1,6.8],[6,0.1,6.4]]
c3 = [[3.2,0,5.9],[6,0,5.9]]

c_1 = MAP(camera_depth(c2,c3))(dom2D)

c4 = [[3.2,0.1,6.4],[0.2,0.1,6.4],[0.6,0.1,6.8],[0.6,0.1,0.8]]
c5 = [[3.2,0,5.9],[0,0,5.9],[0.9,0,6.7],[0.9,0,0.6]]

c_2 = MAP(camera_depth(c4,c5))(dom2D)

c_3 = T([0,1])([12,1.6])(R([0,1])(PI)(c_2))

c6 = [[0.9,0,0.6],[0.6,0.2,0.9],[0.6,1.4,0.9],[0.9,1.6,0.6]]
c7 = [[11.1,0,0.6],[11.4,0.2,0.9],[11.4,1.4,0.9],[11.1,1.6,0.6]]

c_4 = MAP(figure2d(c6,i0))(dom2D)

c_5 = MAP(figure2d(c7,i1))(dom2D)

top_0 = COLOR(c_details)(STRUCT([c_0,c_1,c_2,c_3,c_4,c_5]))

hole = T([0,1,2])([6.4,0.9,6.268])(DISK(0.05)(36))

holes1 = repeat_obj_N(hole,4)
holes2 = repeat_obj_N(T([1])([-0.3])(hole),4)
holes3 = repeat_obj_N(T([0,1])([-0.08,-0.15])(hole),5)

holes = COLOR(c_black)(STRUCT([holes1,holes2,holes3]))

click0 = COLOR(c_details)(cylinder(0.7,0.15))
click1 = COLOR(c_silver)(T([2])([0.15])(cylinder(0.55,0.1)))
click2 = COLOR(c_silver)(T([0,1,2])([-0.125,-0.74,0.15])(CUBOID([0.25,0.15,0.06])))

button_click = T([0,1,2])([2.5,0.8,6.15])(STRUCT([click0,click1,click2]))

top_camera = STRUCT([top_0,holes,button_click])


//////// FRONT ////////////////////////////////////////////////////////////////////////////////////////////////////


b0 = [[3.2,0,0.6],[0.9,0,0.6]]
b1 = [[3.2,0,5.9],[8.8,0,5.9]]
b2 = [[3.2,0,0.6],[8.8,0,0.6]]

b_0 = MAP(figure2d(c5,b0))(dom2D)
b_1 = T([0])([12])(R([0,1])([PI])(b_0))
b_2 = MAP(figure2d(b1,b2))(dom2D)

front_0 = COLOR(c_camera)(STRUCT([b_0,b_1,b_2]))

focus0 = COLOR(c_black)(arc(2*PI,0.19,0.25))
focus1 = COLOR(c_flash)(T([2])([0.01])(DISK(0.19)(32)))

focus = T([0,1,2])([4.9,-0.01,5])(R([1,2])([PI/2])(STRUCT([focus0,focus1])))

front_camera = STRUCT([front_0,focus,canon])


/////// BACK //////////////////////////////////////////////////////////////////////////////////////////////////////


display = COLOR(c_black)(T([0,1,2])([3.6,1.6,1.1])(CUBOID([7.3,0.01,3.9])))

back_0 = T([1])([1.6])(front_0)

/// buttons 

p_oo0 = COLOR(c_camera)(R([1,2])([PI/2])(cylinder(0.25,0.1)))
p_oo1 = COLOR(c_black)(T([1])([-0.027])(R([1,2])([PI/2])(CIRCLE(0.252)(32))))

p_on_off = T([0,1,2])([3.6,1.63,5.5])(STRUCT([p_oo0,p_oo1]))

but0 = COLOR(c_camera)(R([1,2])([PI/2])(cylinder(0.35,0.1)))
but1 = COLOR(c_black)(T([1])([-0.027])(R([1,2])([PI/2])(CIRCLE(0.352)(32))))
but2 = COLOR(c_details)(T([1])([0.01])(R([1,2])([PI/2])(DISK(0.15)(32))))

button = STRUCT([but0,but1])
button1 = STRUCT([button,but2])

p_disp = T([0,1,2])([2.8,1.63,1.3])(button1)
p_menu = T([0,1,2])([1.6,1.63,1.3])(button1)

p_r0 = T([0,1,2])([2.8,1.63,3.7])(button)
p_r1 = COLOR([1,0,0,1])(T([0,1,2])([2.8,1.64,3.7])(R([1,2])([PI/2])(DISK(0.1)(32))))

p_rec = STRUCT([p_r0,p_r1]) 

p_p0 = T([0,1,2])([1.6,1.63,3.7])(button)

t0 = [[1.7,1.635,3.8],[1.4,1.635,3.7]]
t1 = [[1.7,1.635,3.6],[1.4,1.635,3.7]]

p_p1 = COLOR(c_play)(MAP(figure2d(t0,t1))(dom2D))

p_play = STRUCT([p_p0,p_p1])

p_rot0 = COLOR(c_camera)(R([1,2])([PI/2])(cylinder(0.75,0.2)))
p_rot1 = COLOR(c_black)(T([1])([-0.19])(R([1,2])([PI/2])(CIRCLE(0.752)(32))))
p_rot2 = COLOR(c_details)(T([1])([0.011])(R([1,2])([PI/2])(arc(2*PI,0.5,0.58))))

p_rot = T([0,1,2])([2.2,1.8,5])(STRUCT([p_rot0,p_rot1,p_rot2]))

p_f0 = COLOR(c_camera)(R([1,2])([PI/2])(cylinder(0.65,0.2)))
p_f1 = COLOR(c_black)(T([1])([-0.19])(R([1,2])([PI/2])(CIRCLE(0.652)(32))))
p_f2 = COLOR(c_details)(T([1])([0.01])(R([1,2])([PI/2])(DISK(0.25)(32))))

p_func = T([0,1,2])([2.2,1.8,2.5])(STRUCT([p_f0,p_f1,p_f2]))

buttons = STRUCT([p_on_off,p_disp,p_menu,p_rot,p_func,p_play,p_rec])

back_camera = STRUCT([display,buttons,back_0,on_off,canon1])


////// OBJECTIVE ////////////////////////////////////////////////////////////////////////////////////////////////////


o_0 = COLOR(c_camera)(cylinder(2.55,0.9))

o1 = T([2])([0.9])(cylinder(2,0.7)) 
o2 = T([2])([1.6])(cylinder(1.8,1.2))
o3 = T([2])([2.8])(EXTRUDE([0.4])(arc(2*PI,0.9,1.6)))

o_1 = COLOR(c_obj)(STRUCT([o1,o2,o3]))
o_2 = COLOR(c_details)(T([2])([0.65])(EXTRUDE([0.1])(CIRCLE(2.57)(32))))

o4 = COLOR(c_flash)(T([2])([2.8])(cylinder(0.9,0.1)))
o5 = COLOR([0,0,0,1])(T([2])([2.9])(CIRCLE(0.5)(32)))
o6 = COLOR([0,0,0,1])(T([2])([2.9])(CIRCLE(0.7)(32)))
o7 = COLOR(c_obj)(T([2])([2.92])(DISK(0.25)(32)))

o_3 = STRUCT([o4,o5,o6,o7])
o_4 = R([1,2])([PI/2])(STRUCT([o_0,o_1,o_2,o_3]))

camera_obj = T([0,2])([7.5,3.19])(o_4)


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


model = STRUCT([bottom_camera,top_camera,back_camera,front_camera,flash,camera_obj])

 
  return model
  })();

  exports.author = 'Fuskia';
  exports.category = 'others';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));