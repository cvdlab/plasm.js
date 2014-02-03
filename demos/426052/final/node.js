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

function vertical_back(f,n){
  var fig = f;
      for(i=0; i<n; i++){
        f1 = R([0,1])(Math.PI/22.5)(fig);
        fig = STRUCT([fig,f1]);
    }
  return fig;
};

function horizontal_back(h){  //considerando metà schienale, h è il # di barre verticali da non prendere con l'arco
  var d = PI-(2*h*PI/22.5)
  var domain = DOMAIN([[0,d], [4.11,4.21]])([36,1]);
  var mapping = function(v){
    var a = v[0];
    var r = v[1];
    return [r*COS(a), r*SIN(a)];
  };
  var m = MAP(mapping)(domain);
  var m1 = EXTRUDE([0.286])(m);
  var model = R([0,1])([h*(PI/22.5)])(m1);
  return model;
};

function hor_back(){  
  var domain = DOMAIN([[0,(PI/22.5)], [4.11,4.21]])([36,1]);
  var mapping = function(v){
    var a = v[0];
    var r = v[1];
    return [r*COS(a), r*SIN(a)];
  };
  var m = MAP(mapping)(domain);
  var model1 = EXTRUDE([0.286])(m);
  var model2 = R([0,1])([21.5*PI/22.5])(model1);
  var model = STRUCT([model1,model2]);
  return model;
};

function figure2d(p0,p1){
  c0 = BEZIER(S0)(p0);
  c1 = BEZIER(S0)(p1);
  c = BEZIER(S1)([c0,c1]);
  return c;
};

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

function repeat_hor(f){
  var fig = f;
      for(i=1; i<14; i++){
        f1 = T([2])([i*(-0.555)])(f);
        fig = STRUCT([fig,f1]);
    }
  return fig;
};

////////// COLORS ////////////////////////////////////////////////////////////////////////////////////////////////

c_black = [0,0,0,1]
c_gray = [0.1,0.1,0.1,1]
c_pillow_f = [0.87,0.1921,0.3882,1]
c_pillow_v = [0.18,0.545,0.34,1]
c_pillow_c = [0,0.5,1,1]


////////////// BACK ///////////////////////////////////////////////////////////////////////////////////////////////

///// Vertical Back

v0 = T([0])([4.1])(CUBOID([0.1,0.286,11.9]))

half_vertical0 = vertical_back(v0,11)
half_vertical1 = T([2])([11.9])(R([0,2])([PI])(half_vertical0))

v1 = T([1])([-0.286])(v0)
v2 = T([0])([-8.3])(v1)


vertical = STRUCT([half_vertical0,half_vertical1,v1,v2])

///// Horizontal Back

h_0 = horizontal_back(0)
h0 = T([2])([11.614])(h_0)
h1 = T([2])([11.059])(h_0)
h2 = T([2])([10.504])(horizontal_back(2))
h3 = T([2])([9.949])(horizontal_back(3))
h4 = T([2])([9.394])(horizontal_back(4))
h5 = T([2])([8.839])(horizontal_back(5))
h6 = T([2])([8.284])(horizontal_back(6))
h7 = T([2])([7.729])(horizontal_back(7))
h8 = T([2])([7.174])(horizontal_back(8))
h9 = T([2])([6.619])(horizontal_back(9))
h_1 = horizontal_back(10)
h10 = T([2])([6.064])(h_1)
h11 = T([2])([5.509])(h_1)
h12 = T([2])([4.954])(h_1)
h13 = T([2])([4.399])(h_1)
h14 = T([2])([3.844])(h_1)

horizontal_0 = STRUCT([h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,h10,h11,h12,h13,h14])

h_2 = T([2])([10.504])(hor_back())

horizontal_1 = repeat_hor(h_2) 

horizontal = STRUCT([horizontal_0,horizontal_1])

////////////////////////////


back = COLOR(c_black)(STRUCT([vertical,horizontal]))


/////////////// BASE ///////////////////////////////////////////////////////////////////////////////////////////////

b0 = [[-4.1,-0.286,0],[-3.5,0,0]]
b1 = [[-4.1,-0.286,0.2],[-3.5,0,0.2]]
b2 = [[-4.1,0,0.2],[-3.5,0,0.2]]

b_0 = MAP(figure2d(b0,b1))(dom2D)
b_1 = MAP(figure2d(b1,b2))(dom2D)

b3 = [[4.1,-0.286,0],[3.5,0,0]]
b4 = [[4.1,-0.286,0.2],[3.5,0,0.2]]
b5 = [[4.1,0,0.2],[3.5,0,0.2]]

b_2 = MAP(figure2d(b3,b4))(dom2D)
b_3 = MAP(figure2d(b4,b5))(dom2D)

base_0 = STRUCT([b_0,b_1,b_2,b_3])

base_1 = EXTRUDE([0.2])(arc(PI,0,4.1))


base = COLOR(c_black)(STRUCT([base_0,base_1]))


///////////// SITTING /////////////////////////////////////////////////////////////////////////////////

s0 = [[-4,0.1,0.2],[4,0.1,0.2]]
s1 = [[-4,-0.5,3.6],[4,-0.5,3.6]]

s_0 = MAP(figure2d(s0,s1))(dom2D)

s2 = [[-4,0.1,0.2],[-4,-0.5,3.6]]
s3 = [[-4,0.1,0.2],[-4,0.1,3.6]]

s_1 = MAP(figure2d(s2,s3))(dom2D)
s_2 = T([0])([8])(s_1) 

s_3 = T([1,2])([0.1,0.2])(EXTRUDE([3.4])(arc(PI,0,4)))

s4 = [[-4,0.1,3.6],[4,0.1,3.6]]
s5 = [[-4,-0.5,3.6],[4,-0.5,3.6]]

s_4 = MAP(figure2d(s4,s5))(dom2D)

sitting = COLOR(c_gray)(STRUCT([s_0,s_1,s_2,s_3,s_4]))


///////////// PILLOW //////////////////////////////////////////////////////////////////////////////////

p0 = [[-4,0.1,3.6],[-4,-0.7,3.5],[-4,-0.7,3.844],[-4,0.1,3.844]]
p1 = [[4,0.1,3.6],[4,-0.7,3.5],[4,-0.7,3.844],[4,0.1,3.844]]
p2 = [[-4,0.1,3.6],[-4,0.1,3.844]]

pillow_0 = MAP(figure2d(p0,p1))(dom2D)
pillow_1 = MAP(figure2d(p0,p2))(dom2D)
pillow_2 = T([0])([8])(pillow_1)

pillow_3 = T([1,2])([0.1,3.6])(EXTRUDE([0.244])(arc(PI,0,4)))

pillow = COLOR(c_pillow_c)(STRUCT([pillow_0,pillow_1,pillow_2,pillow_3]))


////////// WILLOW CHAIR /////////////////////////////////////////////////////////////////////////////

willow = STRUCT([back,base,sitting,pillow])
willow_chair = S([0])([1.146341463])(willow)

//DRAW(willow_chair)


var model = willow_chair;




  return model
  })();

  exports.author = 'Fuskia';
  exports.category = 'furnitures';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));