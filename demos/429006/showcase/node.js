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

  //Players
dom1D = INTERVALS(1)(12)
dom2D = PROD1x1([dom1D,dom1D])

var c0 = BEZIER(S0)([[3,2,2],[3,2,7.5],[6,2.5,5.5],[3.25,1,9]]);
var c1 = BEZIER(S0)([[1,2,2],[1,2,7.5],[-2,2.5,5.5],[0.75,1,9]]);
var c01 = BEZIER(S1)([c0,c1])

face0 = MAP(c01)(dom2D)

var c00 = BEZIER(S0)([[3,0,2],[3,-1,7.5],[6,-1.5,5.5],[3.25,0,9]]);
var c11 = BEZIER(S0)([[1,0,2],[1,-1,7.5],[-2,-1.5,5.5],[0.75,0,9]]);
var c10 = BEZIER(S1)([c00,c11])

face1 = MAP(c10)(dom2D)

var c000 = BEZIER(S1)([c0,c00])
var c111 = BEZIER(S1)([c1,c11])

face2 = MAP(c000)(dom2D)
face3 = MAP(c111)(dom2D)

face4 = CUBOID([2,1,0])
face4_t = T([0,2])([0.75,9])(face4)

basis = CUBOID([3,2.5,2])
basis_t = T([0,1])([0.5,-0.25])(basis)

var dom_sphere = DOMAIN([[-PI/2,PI/2],[-PI,PI]])([12,18]);
var sphere = function(r){
  return function(v){
  return [r*SIN(v[1])*COS(v[0]),r*SIN(v[1])*SIN(v[0]),r*COS(v[1])]
  }
}
var mapping = sphere(1.5);
var head = MAP(mapping)(dom_sphere);
head_t = T([0,1,2])([2,0.5,10.3])(head)

player = STRUCT([face0,face1,face2,face3,face4_t,basis_t,head_t])
player = R([0,1])([PI/2])(player)
player = S([0,1,2])([1.0/4,1.0/4,1.0/4])(player)
blue_player = COLOR([0,0,1])(player)
red_player = COLOR([1,0,0])(player)
players = STRUCT([blue_player, T([0])([6])(red_player)])

function cylinder(r,h){
  d = DISK(r)(36)
  c = EXTRUDE([h])(d)
  return c
}

function stick(n_object,extent,thickness,player){
  c_length = (extent - n_object*thickness)/(n_object+1);
  c1 = cylinder(0.25,c_length)
  c1 = R([1,2])(-PI/2)(c1)
  c2 = T([0,2])([-0.1,1.7])(c1)
  p = T([1])([c_length])(player)
  s = STRUCT([p,c2])
  for (i=0;i<n_object-1;i++){
    s = STRUCT([s,T([1])([c_length+thickness])(s)])
  }
  c3 = T([0,1,2])([-0.1,n_object*(thickness+c_length),1.7])(c1)
  s = STRUCT([c3,s])
  return s;
}

//red players
st2 = T([0,1,2])([4.75,0.5,4])(stick(2,9.8,1.1,red_player))
st1 = T([0,1,2])([2.85,0.5,4])(stick(1,9.8,1.1,red_player))
st3 = T([0,1,2])([8.55,0.5,4])(stick(5,9.8,1.1,red_player))
st4 = T([0,1,2])([12.35,0.5,4])(stick(3,9.8,1.1,red_player))

//blue players
st11 = T([0,1,2])([16.15,0.5,4])(stick(1,9.8,1.1,blue_player))
st22 = T([0,1,2])([14.25,0.5,4])(stick(2,9.8,1.1,blue_player))
st33 = T([0,1,2])([10.45,0.5,4])(stick(5,9.8,1.1,blue_player))
st44 = T([0,1,2])([6.65,0.5,4])(stick(3,9.8,1.1,blue_player))
sticks = STRUCT([st1,st2,st3,st4,st11,st22,st33,st44])

//goal
g0 = [[0,0,2],[0,2,0],[0,5,0],[0,0,-5]]
g1 = [[0,0,3],[0,2,3]]
g_c0 = CUBIC_HERMITE(S0)(g0)
g_c1 = BEZIER(S0)(g1)

g2 = [[0,2,0],[0,5,0]]
g3 = [[0,2,3],[0,5,3]]
g_c2 = BEZIER(S0)(g2)
g_c3 = BEZIER(S0)(g3)
curva0 = MAP(BEZIER(S1)([g_c0,g_c1]))(dom2D)
curva1 = MAP(BEZIER(S1)([g_c2,g_c3]))(dom2D)
goal00 = STRUCT([curva0,curva1])
goal01 = R([0,1])(PI)(goal00)
goal0 = T([0,1])([2,5])(STRUCT([goal00,goal01]))
goal1 = T([0])([15])(goal0)
goal = T([1])([0.2])(STRUCT([goal0,goal1]))

wall0 = T([0,1])([2,0.1])(CUBOID([15,0.1,3]))
wall1 = T([1])([10])(wall0)
wall = COLOR([1,1,1])(T([1,2])([0.2,4])(STRUCT([wall0,wall1,goal])))

//handles
Su0 = BEZIER(S0)([[0,0,0],[1,1,0],[0,1,4],[0.5,0,5]]);
Su1 = BEZIER(S1)([[0,-2,0],[3,-1.5,0],[3,1.5,0],[0,2,0]]);
out = MAP(PROFILEPROD_SURFACE([Su0,Su1]))(dom2D);
out1 = R([0,1])(PI)(out)
out2 = COLOR([0,0,0])(STRUCT([out1,out]))
out3 = S([0,1,2])([0.4,0.4,0.4])(out2)


c = cylinder(0.2,5)
c = T([2])([0.2])(c)
d = DISK(0.5)(24)
d = COLOR([0,0,0])(T([2])([5.2])(EXTRUDE([0.1])(DISK(0.5)(24))))
d1 = T([2])([0.5])(d)
disk = STRUCT([d,d1])

handle = STRUCT([out3,c,disk])
handle0 = R([1,2])(-PI/2)(handle)
handle1 = R([1,2])(PI/2)(handle)

h1 = T([0,1,2])([2.75,-5.3,5.7])(handle0)
h2 = T([0,1,2])([4.65,-5.3,5.7])(handle0)
h3 = T([0,1,2])([8.45,-5.3,5.7])(handle0)
h4 = T([0,1,2])([12.25,-5.3,5.7])(handle0)

h11 = T([0,1,2])([6.55,16,5.7])(handle1)
h22 = T([0,1,2])([10.35,16,5.7])(handle1)
h33 = T([0,1,2])([14.15,16,5.7])(handle1)
h44 = T([0,1,2])([16.05,16,5.7])(handle1)

disk0 = R([1,2])(-PI/2)(disk)
l_w0 = T([0,1,2])([2.75,5,5.7])(disk0)
l_w1 = T([0,1,2])([4.65,5,5.7])(disk0)
l_w2 = T([0,1,2])([8.45,5,5.7])(disk0)
l_w3 = T([0,1,2])([12.25,5,5.7])(disk0)

l_w00 = T([0,1,2])([6.55,-5.3,5.7])(disk0)
l_w11 = T([0,1,2])([10.35,-5.3,5.7])(disk0)
l_w22 = T([0,1,2])([14.15,-5.3,5.7])(disk0)
l_w33 = T([0,1,2])([16.05,-5.3,5.7])(disk0)

lock_wass = STRUCT([l_w0,l_w1,l_w2,l_w3])
lock_wasd = STRUCT([l_w00,l_w11,l_w22,l_w33])
lock_washer = STRUCT([lock_wasd,lock_wass])

handles = STRUCT([h1,h2,h3,h4,h11,h22,h33,h44,lock_washer])


//struct
//balls hole and sides
b0 = CUBIC_HERMITE(S0)([[12.7,0,1.3],[13,0,1],[0.6,0,0],[0,0,-0.6]])
b00 = BEZIER(S0)([[12.7,0,4],[13,0,4]])
b_c0 = BEZIER(S1)([b0,b00])
b_i0 = MAP(b_c0)(dom2D)
b1 = CUBIC_HERMITE(S0)([[12.7,0,0.7],[13,0,1],[0.6,0,0],[0,0,0.6]])
b11 = BEZIER(S0)([[12.7,0,0],[13,0,0]])
b_c1 = BEZIER(S1)([b1,b11])
b_i1 = MAP(b_c1)(dom2D)
var ncpVector = [0,0.3,0];

//drawer
var ncpVector1 = [0,-0.8,0];
b_hole = BEZIER(S1)([b0,b1])
b_hmap = MAP(b_hole)(dom2D)
b_hole1 = T([0,1])([19,-0.8])(R([0,1])(PI)(b_hmap))
b_hole2 = T([1])([-0.8])(b_hmap)
b_hole3 = STRUCT([b_hole1,b_hole2])

bh1 = MAP(CYLINDRICAL_SURFACE(b0)(ncpVector1))(dom2D);
bh2 = MAP(CYLINDRICAL_SURFACE(b1)(ncpVector1))(dom2D);
bh = STRUCT([bh1,bh2])
bh3 = T([0,1])([19,-0.8])(R([0,1])(PI)(bh))

b2 = BEZIER(S0)([[6.3,-0.8,0.7],[12.7,-0.8,0.7]])
b3 = BEZIER(S0)([[6.3,-0.8,1.3],[12.7,-0.8,1.3]])
b23 = MAP(BEZIER(S1)([b2,b3]))(dom2D)
bh4 = MAP(CYLINDRICAL_SURFACE(b2)([0,0.8,0]))(dom2D);

var s = sphere(0.4);
var ball = COLOR([1,1,1])(MAP(s)(dom_sphere));
balls = T([0,1,2])([6.7,-0.3,1.3])(ball)

for(i=1; i<10; i++){
balls = STRUCT([T([0,1,2])([6.7+i*0.6,-0.3,1.3])(ball),balls])
}

drawer = COLOR([0,0,0])(STRUCT([bh,bh3,bh4,b_hole3,b23]))

b2 = MAP(CYLINDRICAL_SURFACE(b00)(ncpVector))(dom2D);
b3 = MAP(CYLINDRICAL_SURFACE(b11)(ncpVector))(dom2D);
b4 = MAP(CYLINDRICAL_SURFACE(b0)(ncpVector))(dom2D);
b5 = MAP(CYLINDRICAL_SURFACE(b1)(ncpVector))(dom2D);

balls_hole0 = STRUCT([b_i0,b_i1])
balls_hole1 = T([1])([0.3])(balls_hole0)
balls_hole2 = STRUCT([balls_hole0,balls_hole1,b2,b3,b4,b5])
balls_hole3 = T([0,1])([19,0.3])(R([0,1])(PI)(balls_hole2))
balls_hole = STRUCT([balls_hole2,balls_hole3,drawer])

side = T([0,1,2])([6,0.2,0.7])(CUBOID([7,0.2,1]))
money_g = T([0,1,2])([14,-0.1,2.5])(R([1,2])([PI/2])(EXTRUDE([0.1])(DISK([0.8])(24))))
money_b = COLOR([0,0,0])(T([0,1,2])([14,-0.15,2.3])(R([1,2])([PI/2])(EXTRUDE([0.3])(DISK([0.3])(24)))))
money_b1 = T([0,1,2])([14,-0.45,2.3])(R([1,2])([PI/2])(EXTRUDE([0.1])(DISK([0.1])(24))))
money_b2 = COLOR([0.1,0.1,0.1])(T([0,1,2])([14,-0.15,2.95])(R([1,2])([PI/2])(EXTRUDE([0.1])(DISK([0.25])(24)))))
money_b3 = (T([0,1,2])([13.95,-0.27,2.85])(CUBOID([0.1,0.02,0.25])))
money = STRUCT([money_g,money_b,money_b1,money_b2,money_b3])

c0 = CUBOID([6,0.3,4])
c1 = T([0])([6.3])(CUBOID([6.4,0.3,0.7]))
c2 = T([0,2])([6.3,1.3])(CUBOID([6.4,0.3,2.7]))
c3 = T([0])([13])(c0)
c4 = COLOR([1,0,0])(T([2])([4])(CUBOID([19,0.3,3.5])))
c = COLOR([0,0,0])(STRUCT([c0,c1,c2,c3,balls_hole]))
side0 = STRUCT([c,c4,side,money,balls])

side1_black = COLOR([0,0,0])(CUBOID([19,0.3,4]))
side1_red = COLOR([1,0,0])(T([2])([4])(CUBOID([19,0.3,3.5])))
side1 = T([1])([10.4])(STRUCT([side1_red,side1_black]))

side2_black = COLOR([0,0,0])(T([1])([0.3])(CUBOID([2,10.2,4])))
s2_red = BEZIER(S0)([[2,0.3,7],[2,10.4,7]])
side2_top = MAP(CYLINDRICAL_SURFACE(s2_red)([-2,0,0]))(dom2D);
side2_bottom = (T([2])([4])(CUBOID([0.1,10.4,3])))
side2_red = COLOR([1,0,0])(STRUCT([side2_top,side2_bottom]))

//scoreboard
function scoreboard(c,c1){
    var c2 = T([0,1,2])([0.225,5,0.225])(CUBOID([0.1,1,0.1]))
    s = STRUCT([c,T([1])([6])(c),c2])
  for(i=1;i<10;i++){
      s = STRUCT([T([1])([i*0.5])(c1),s])
  }
  return s;
}
var c = CUBOID([0.48,0.48,0.48])
var c1 = COLOR([150/255,0,24/255])(c)
var c2 = COLOR([0,0,1])(c)
sp_red = T([0,1,2])([0.755,2.25,7])(scoreboard(c2,c1))
sp_blue = T([0,1,2])([17.8,2.25,7])(scoreboard(c1,c2))

side2 = STRUCT([side2_black,side2_red,sp_red])

side3_black = T([0])([17])(side2_black)
side3_red = COLOR([1,0,0])(STRUCT([T([0])([16.9])(side2_top),T([0])([18.9])(side2_bottom)]))
side3 = STRUCT( [side3_red,side3_black,sp_blue])
side4 = COLOR([0,0,0])(T([2])([0.01])(CUBOID([19,10.4,0.01])))

sides = STRUCT([side0,side1,side2,side3,side4])

//soccer field and lines
field = COLOR([0,1,0])(T([0,1,2])([2,0.3,3.7])(CUBOID([15,10.2,0.1])))

var dom_circle = DOMAIN([[0,2*PI],[0,2*PI]])([24,36])
var torus = function(R,r){
  return function(v){
    var a = v[0];
    var b = v[1];

    var u = (r*COS(a) + R)*(COS(b))
    var v = (r*COS(a) + R)*(SIN(b))
    var w = (0.1)
    return [u,v,w];
  }
}
var mappings = torus(1.5,0.1);
var model = MAP(mappings)(dom_circle)
center = T([0,1,2])([9.5,5.4,3.8])(model)

line0 = SIMPLEX_GRID([[-2,2,-11,2,-2],[-2.3,0.2,-5.8,0.2],[-3.8,0.05]])
line1 = SIMPLEX_GRID([[-3.8,0.2,-11,0.2],[-2.3,5.8,0.2],[-3.8,0.05]])
line00 = SIMPLEX_GRID([[-2,0.5,-14,0.5,-2],[-3.8,0.2,-2.8,0.2],[-3.8,0.05]])
line11 = SIMPLEX_GRID([[-2.5,0.2,-13.6,0.2],[-3.8,3.2],[-3.8,0.05]])
line2 = SIMPLEX_GRID([[-9.4,0.2],[-0.3,10.2],[-3.8,0.05]])

var dom_semic1 = DOMAIN([[0,2*PI],[-PI/2,PI/2]])([24,36])
var dom_semic2 = DOMAIN([[0,2*PI],[PI/2,3*PI/2]])([24,36])
var line3 = T([0,1,2])([4,5.4,3.8])(MAP(mappings)(dom_semic1))
var line4 = T([0,1,2])([15,5.4,3.8])(MAP(mappings)(dom_semic2))

lines = COLOR([1,1,1])(STRUCT([center,line0,line1,line2,line00,line11,line3,line4]))
soccer_field = STRUCT([field,lines])

//legs
var profile = BEZIER(S0)([[0,0,-8],[3,0,0]]);
var lg1 = MAP(CYLINDRICAL_SURFACE(profile)([2,0,0]))(dom2D);
var lg2 = MAP(CYLINDRICAL_SURFACE(profile)([0,1,0]))(dom2D);
lg3 = T([1])([1])(lg1)
lg4 = T([0])([2])(lg2)
leg0 = COLOR([0,0,0])(STRUCT([lg1,lg2,lg3,lg4]))
leg1 = T([1])([9.4])(leg0)
lg5 = COLOR([0,0,0])(T([0,1,2])([3,1,-3.5])(CUBOID([0.5,8.4,1])))
leg_r = STRUCT([leg0,leg1,lg5])
leg_l = T([0,1])([19,10.4])(R([0,1])([PI])(leg_r))

legs = STRUCT([leg_r,leg_l])

//model
var model = STRUCT([sticks, wall, handles,sides,soccer_field,legs])

return model
})();

  exports.author = 'stederob';
  exports.category = 'others';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));
