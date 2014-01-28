var domain = INTERVALS(1)(50)
var domain2 = DOMAIN([[0,1],[0,1]])([50,50]);
var domain2resolution = DOMAIN([[0,1],[0,1]])([70,70]);
/*
//Alias traslazione con clone
TC = T
//Traslazione senza clone
function T(dims) {
    return function (values) {
      return function (object) {
       return object.translate(dims, values);
      };
    };
  }
//Alias rotazione con clone
RC = R
//Rotazione senza clone
function R(dims) {
    return function (angle) {
      return function (object) {
        return object.rotate(dims, angle);
      };
    };
  }
*/
NN = REPLICA;

var INTERP_P2P = function (sel) {
    return function (args) { 
        var P1 = args[0];
        var P2 = args[1];

        return function (point) {
            u = sel(point);

      var mapped = new Array(3);
      var i;
      for (i = 0; i < 3; i += 1) { mapped[i] = P1[i] + u * (P2[i] - P1[i]);}
      return mapped;
        };
    };
};

var INTERP_P2C = function (sel) {
    return function (args) { 
        var P1 = args[0];
        var C1 = args[1];

        return function (point) {
            v = sel(point);
            var C1u = C1(point);

      var mapped = new Array(3);
      var i;
      for (i = 0; i < 3; i += 1) { mapped[i] = P1[i] + v * (C1u[i] - P1[i]);}
      return mapped;
        };
    };
};

var INTERP_C2C = function (sel) {
    return function (args) { 
        var C1 = args[0];
        var C2 = args[1];

        return function (point) {
            v = sel(point);
            var C1u = C1(point);
            var C2u = C2(point);

      var mapped = new Array(3);
      var i;
      for (i = 0; i < 3; i += 1) { mapped[i] = C2u[i] + v * (C1u[i] - C2u[i]);}
      return mapped;
        };
    };
};
//----------------------------------------------------------------------------------
function bezierS0(controlpoints){
  return BEZIER(S0)(controlpoints)
}

function bezierS1(f){
  return BEZIER(S1)(f)
}

function bezierMappata_1D(controlpoints){
  return MAP(bezierS0(controlpoints))(INTERVALS(1)(32))
}

function bezierMappata_2D(functions){
  var x = BEZIER(S1)(functions)
  return MAP(x)(domain2resolution) 
}


function cerc(r,z){
  var points = [[1,0,0],[1,1,0],[0,1.7,0],[-1.7,1,0],[-1.7,0,0],[-1,-1.4,0],[0,-1.6,0],[1,-0.9,0],[1,0,0]];
  var c = points.map(function(point){return [point[0]*r,point[1]*r,point[2]+z]})
  var cerchio = bezierS0(c);
  return cerchio;
}

function cercS1(r,z){
  var points = [[1,0,0],[1,1,0],[0,1.7,0],[-1.7,1,0],[-1.7,0,0],[-1,-1.4,0],[0,-1.6,0],[1,-0.9,0],[1,0,0]];
  var c = points.map(function(point){return [point[0]*r,point[1]*r,point[2]+z]})
  //var cerchio = bezierMappata_1D(c);
  var cerchio = bezierS1(c);
  return cerchio;
}
//------------------------------------------------------------------
function melaApple () {
  //Contorno Mela 2d 
  var controlpoints = [[6.82, 1.43], [5.59, 1.9], [5.35, 4.98], [7.19, 4.42]];
  parteSx = bezierMappata_1D(controlpoints)
  controlpoints = [[6.82, 1.43], [7.06, 1.35], [7.25, 1.59], [7.53, 1.59]]
  sotto1 = bezierMappata_1D(controlpoints)
  sotto1_s0 = bezierS0(controlpoints)
  controlpoints = [[8.28, 1.41], [7.84, 1.42], [8, 1.61], [7.53, 1.59]]
  sotto2_s0 = bezierS0(controlpoints)
  sotto2 = bezierMappata_1D(controlpoints)
  controlpoints = [[8.28, 1.41], [8.45, 1.29], [9.2, 2.28], [9.14, 2.52]]
  parteDxUno = bezierMappata_1D(controlpoints)
  controlpoints = [[9.05, 4.08], [8.17, 3.46], [8.8, 2.62], [9.14, 2.52]]
  parteDxDue = bezierMappata_1D(controlpoints)
  controlpoints = [[9.05, 4.08], [8.41, 4.99], [7.48, 4.15], [7.19, 4.42]]
  parteDxTre = bezierMappata_1D(controlpoints)
//Foglia Mela
//Semi foglia
  controlpoints = [[8.32, 5.46,0], [7.72, 5.56,0], [7.41, 4.66,0], [7.48, 4.5,0]]
  mezzoSopra = bezierMappata_1D(controlpoints)
  //Semi foglia
  controlpoints = [[8.32, 5.46,0], [8.37, 5.19,0], [8.06, 4.54,0], [7.48, 4.5,0]]
  mezzoSopra2 = bezierMappata_1D(controlpoints)
  
  
  foglia = STRUCT([mezzoSopra,mezzoSopra2])
  foglia = T([0])([-0.1])(foglia)
  mela = STRUCT([parteSx,sotto1,sotto2,parteDxUno,parteDxDue,parteDxTre,foglia])
  
  return mela;
}

//Parte sopra
var x1_p = [[2.13, 3.68,0], [2.08, 4.57,0], [2.66, 4.60,0], [3.22, 4.62,0]];
var x1_s0 = bezierS0(x1_p);
var x1_s1 = bezierS1(x1_p);
var x1_2d = bezierMappata_1D(x1_p);

var x2_p = [[6.08, 4.62,0], [3.22, 4.62,0]]
var x2_s0 = bezierS0(x2_p);
var x2_s1 = bezierS1(x2_p);
var x2_2d = bezierMappata_1D(x2_p);

var x3_p = [[7.27,3.68,0], [7.22, 4.57,0],[6.64, 4.61,0],[6.08, 4.62,0]]
var x3_s0 = bezierS0(x3_p);
var x3_s1 = bezierS1(x3_p);
var x3_2d = bezierMappata_1D(x3_p);

var x4_p = [[2.13, 0.66,0], [2.13, 3.68,0]]
var x4_s0 = bezierS0(x4_p);
var x4_s1 = bezierS1(x4_p);
var x4_2d = bezierMappata_1D(x4_p);

var x5_p = [[7.27, 0.66,0], [7.27, 3.68,0]]
var x5_s0 = bezierS0(x5_p);
var x5_s1 = bezierS1(x5_p);
var x5_2d = bezierMappata_1D(x5_p);

var x6_p = [[2.13, 0.66,0], [2.08, -0.23 ,0], [2.66, -0.26,0], [3.22, -0.28,0]];
var x6_s0 = bezierS0(x6_p);
var x6_s1 = bezierS1(x6_p);
var x6_2d = bezierMappata_1D(x6_p);

var x7_p = [[6.08, -0.28,0], [3.22, -0.28,0]]
var x7_s0 = bezierS0(x7_p);
var x7_s1 = bezierS1(x7_p);
var x7_2d = bezierMappata_1D(x7_p);

var x8_p = [[7.27,0.66,0], [7.22, -0.23,0], [6.64, -0.27,0],[6.08, -0.28,0] ]
var x8_s0 = bezierS0(x8_p);
var x8_s1 = bezierS1(x8_p);
var x8_2d = bezierMappata_1D(x8_p);

p1_sopra = INTERP_C2C(S1)([x1_s0,x3_s0]);
p1_sopra = (MAP(p1_sopra)(domain2));

p2_sopra = INTERP_C2C(S1)([x6_s0,x8_s0]);
p2_sopra = (MAP(p2_sopra)(domain2));

p3_sopra = INTERP_C2C(S1)([x4_s0,x5_s0]);
p3_sopra = (MAP(p3_sopra)(domain2));

//****************************************************************************
parteSopraS1 = STRUCT([p1_sopra,p2_sopra,p3_sopra])
parteSopraS1Bianco = parteSopraS1;
parteSopraS1Bianco = COLOR([1,1,1])(parteSopraS1Bianco)
parteSopraS1Bianco = S([0,1])([0.9,0.9])(parteSopraS1Bianco)
parteSopraS1Bianco = T([0,1,2])([0.5,0.25,0.01])(parteSopraS1Bianco)
//****************************************************************************
//Mela
mela = melaApple();
mela = S([0,1])([0.4,0.4])(mela)
mela = T([0,1,2])([1.8,1,0.01])(mela)
//*******
//Parte sotto
z=-1
x1_p_sotto = x1_p.map(function(point){return [point[0],point[1],point[2]+z]})
x2_p_sotto = x2_p.map(function(point){return [point[0],point[1],point[2]+z]})
x3_p_sotto = x3_p.map(function(point){return [point[0],point[1],point[2]+z]})
x4_p_sotto = x4_p.map(function(point){return [point[0],point[1],point[2]+z]})
x5_p_sotto = x5_p.map(function(point){return [point[0],point[1],point[2]+z]})
x6_p_sotto = x6_p.map(function(point){return [point[0],point[1],point[2]+z]})
x7_p_sotto = x7_p.map(function(point){return [point[0],point[1],point[2]+z]})
x8_p_sotto = x8_p.map(function(point){return [point[0],point[1],point[2]+z]})

var x1_s0_sotto = bezierS0(x1_p_sotto);
var x1_s1_sotto = bezierS1(x1_p_sotto);
var x1_2d_sotto = bezierMappata_1D(x1_p_sotto);

var x2_s0_sotto = bezierS0(x2_p_sotto);
var x2_s1_sotto = bezierS1(x2_p_sotto);
var x2_2d_sotto = bezierMappata_1D(x2_p_sotto);

var x3_s0_sotto = bezierS0(x3_p_sotto);
var x3_s1_sotto = bezierS1(x3_p_sotto);
var x3_2d_sotto = bezierMappata_1D(x3_p_sotto);

var x4_s0_sotto = bezierS0(x4_p_sotto);
var x4_s1_sotto = bezierS1(x4_p_sotto);
var x4_2d_sotto = bezierMappata_1D(x4_p_sotto);

var x5_s0_sotto = bezierS0(x5_p_sotto);
var x5_s1_sotto = bezierS1(x5_p_sotto);
var x5_2d_sotto = bezierMappata_1D(x5_p_sotto);

var x6_s0_sotto = bezierS0(x6_p_sotto);
var x6_s1_sotto = bezierS1(x6_p_sotto);
var x6_2d_sotto = bezierMappata_1D(x6_p_sotto);

var x7_s0_sotto = bezierS0(x7_p_sotto);
var x7_s1_sotto = bezierS1(x7_p_sotto);
var x7_2d_sotto = bezierMappata_1D(x7_p_sotto);

var x8_s0_sotto = bezierS0(x8_p_sotto);
var x8_s1_sotto = bezierS1(x8_p_sotto);
var x8_2d_sotto = bezierMappata_1D(x8_p_sotto);

p1_sotto = INTERP_C2C(S1)([x1_s0_sotto,x3_s0_sotto]);
p1_sotto = (MAP(p1_sotto)(domain2));

p2_sotto = INTERP_C2C(S1)([x6_s0_sotto,x8_s0_sotto]);
p2_sotto = (MAP(p2_sotto)(domain2));

p3_sotto = INTERP_C2C(S1)([x4_s0_sotto,x5_s0_sotto]);
p3_sotto = (MAP(p3_sotto)(domain2));
//****************************************************************************
parteSottoS1 = STRUCT([p1_sotto,p2_sotto,p3_sotto])
//****************************************************************************

//Chiusura scatoletta
p1_lato = INTERP_C2C(S1)([x1_s0,x1_s0_sotto]);
p1_lato = (MAP(p1_lato)(domain2));

p2_lato = INTERP_C2C(S1)([x2_s0,x2_s0_sotto]);
p2_lato = (MAP(p2_lato)(domain2));

p3_lato = INTERP_C2C(S1)([x3_s0,x3_s0_sotto]);
p3_lato = (MAP(p3_lato)(domain2));

p4_lato = INTERP_C2C(S1)([x4_s0,x4_s0_sotto]);
p4_lato = (MAP(p4_lato)(domain2));

p5_lato = INTERP_C2C(S1)([x5_s0,x5_s0_sotto]);
p5_lato = (MAP(p5_lato)(domain2));

p6_lato = INTERP_C2C(S1)([x6_s0,x6_s0_sotto]);
p6_lato = (MAP(p6_lato)(domain2));

p7_lato = INTERP_C2C(S1)([x7_s0,x7_s0_sotto]);
p7_lato = (MAP(p7_lato)(domain2));

p8_lato = INTERP_C2C(S1)([x8_s0,x8_s0_sotto]);
p8_lato = (MAP(p8_lato)(domain2));

//****************************************************************************
parteLatoS1 = STRUCT([p1_lato,p2_lato,p3_lato,p4_lato,p5_lato,p6_lato,,p7_lato,p8_lato])
//****************************************************************************
//Lettore CD
lettoreCD = CUBOID([3.85, 2.05, 0.1])
lettoreCD = COLOR([0,0,0])(lettoreCD)
lettoreCD = T([0,1,2])([2.8,-0.29,-0.5])(lettoreCD)

//-------------------------------------------------------------
//Pannello posteriore
var x9_p = [[6.77, -2.35,0], [6.77, -0.41,0]]
var x9_s0 = bezierS0(x9_p);
var x9_s1 = bezierS1(x9_p);
var x9_2d = bezierMappata_1D(x9_p);

var x10_p = [[6.77, -0.41,0], [6.73, -0.05,0], [6.88, 0.23,0], [7.37, 0.12,0]]
var x10_s0 = bezierS0(x10_p);
var x10_s1 = bezierS1(x10_p);
var x10_2d = bezierMappata_1D(x10_p);

var x11_p = [[14.17, 0.13,0], [7.37, 0.12,0]]
var x11_s0 = bezierS0(x11_p);
var x11_s1 = bezierS1(x11_p);
var x11_2d = bezierMappata_1D(x11_p);

var x12_p = [  [14.84, -0.48,0],[14.77, -0.29,0],[15.06, 0.21,0],[14.17, 0.13,0]]
var x12_s0 = bezierS0(x12_p);
var x12_s1 = bezierS1(x12_p);
var x12_2d = bezierMappata_1D(x12_p);

var x13_p =  [[14.84, -2.35,0],[14.84, -0.48,0]]
var x13_s0 = bezierS0(x13_p);
var x13_s1 = bezierS1(x13_p);
var x13_2d = bezierMappata_1D(x13_p);

p1_posteriore = INTERP_C2C(S1)([x10_s0,x12_s0]);
p1_posteriore = (MAP(p1_posteriore)(domain2));

p2_posteriore = INTERP_C2C(S1)([x9_s0,x13_s0]);
p2_posteriore = (MAP(p2_posteriore)(domain2));

var bordoNero = STRUCT([x13_2d,x9_2d,x10_2d,x11_2d,x12_2d])
bordoNero = COLOR([0,0,0])(bordoNero)
var pannelloPosteriore = STRUCT([p1_posteriore,p2_posteriore])
pannelloPosteriore = COLOR([1,1,1])(pannelloPosteriore)

pan_posteriore_completo = STRUCT([bordoNero,pannelloPosteriore])
pan_posteriore_completo = R([1,2])(PI/2)(pan_posteriore_completo)
pan_posteriore_completo = T([0,1,2])([-0.6,4.63,-0.9])(pan_posteriore_completo)
pan_posteriore_completo = S([0,2])([0.46,0.3])(pan_posteriore_completo)

//Alette raffreddamento
var aletta = CUBOID([0.05,0.01,0.3])
aletta = COLOR([0.8,0.8,0.8])(aletta)
alette = STRUCT(NN(20)([aletta,T([0])([0.15])]));
alette = T([0,1,2])([3.1,4.68,-0.65])(alette)
//Porte usb
var porteUsb = SIMPLEX_GRID([[1, -1, 1,-1,1, -1, 3,-1,1,-1,1,-1,1], [1], [0,1]])
porteUsb = COLOR([0,0,0])(porteUsb)
porteUsb = S([0,1,2])([0.2,0.1,0.1])(porteUsb)
porteUsb = T([0,1,2])([3.2,4.56,-0.87])(porteUsb)
//Cuffiette
cuffia = DISK([0.07])([32])
cuffia = COLOR([0,0,0])(cuffia)
cuffia = R([1,2])(PI/2)(cuffia)
//cuffia = S([0,1,2])([0.2,0.1,0.1])(cuffia)
cuffia = T([0,1,2])([3,4.635,-0.841])(cuffia)

//Tasto accensione
cerchio = cerc(1,0);
var apex = [0,0,0.15];
var cerchio = MAP(CONICAL_SURFACE(apex)(cerchio))(domain2);

var z = 0.076
//spegnimento_p = [[1,0.7,z],[0.8,-1.2,z],[0,-1.7,z],[-1.7,-1,z],[-1.7,0.8,z]]
spegnimento_p = [[1.3,0.1,z+0.1],[1.1,-0.2,z+0.1],[1.6,-0.2,z+0.1],[1.4,0.1,z+0.1]]
var spegnimento_s0 = bezierS0(spegnimento_p);
var spegnimento_s1 = bezierS1(spegnimento_p);
var spegnimento_2d = bezierMappata_1D(spegnimento_p);
spegnimento_2d = S([0,1])([4,4])(spegnimento_2d)
spegnimento_2d = T([0])([-5.4])(spegnimento_2d)

var spegnimento_dritto_p = [[0, -0.3,z+0.1], [0, 0.6,z+0.1]]
var spegnimento_dritto_s0 = bezierS0(spegnimento_dritto_p);
var spegnimento_dritto_s1 = bezierS1(spegnimento_dritto_p);
var spegnimento_dritto_2d = bezierMappata_1D(spegnimento_dritto_p);

accensione = STRUCT([cerchio,spegnimento_2d,spegnimento_dritto_2d])
accensione = R([1,2])(-PI/2)(accensione)
accensione = R([0,2])(PI)(accensione)
accensione = S([0,1,2])([0.18,0.18,0.18])(accensione)
accensione = T([0,1,2])([6.3,4.65,-0.50])(accensione)

var model = STRUCT([parteSopraS1,parteSopraS1Bianco,mela,parteSottoS1,parteLatoS1,lettoreCD,pan_posteriore_completo,accensione,alette,porteUsb,cuffia,alette]);