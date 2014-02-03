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
 /* CARLO FORCOLINI: SIGNORINA CHAN */

var dom2D = DOMAIN([[0,1],[0,1]])([30,30])
var dom1D = INTERVALS(1)(32)

function bezierMappata_1D(controlpoints){
  return BEZIER(S0)(controlpoints)
}
function bezierMappata_2D(functions){
  var x = BEZIER(S1)(functions)
  return MAP(x)(dom2D)
}

// struttura curva
var sc1 = [[1.72, 2.72,2.25], [3.27, 1.38,2.25], [5.27, 2.44,2.25], [5.66, 4.43,2.25]]
var sc1 = BEZIER(S0)(sc1);

var sc2 = [[1.86, 2.76,2.25], [3.31, 1.57,2.25], [5.14, 2.51,2.25], [5.56, 4.45,2.25]];
var sc2 = BEZIER(S0)(sc2);

var sc1d = [[1.72, 2.72,2.75], [3.27, 1.38,2.75], [5.27, 2.44,2.75], [5.66, 4.43,2.75]]
var sc1d = BEZIER(S0)(sc1d);

var sc2d = [[1.86, 2.76,2.75], [3.31, 1.57,2.75], [5.14, 2.51,2.75], [5.56, 4.45,2.75]];
var sc2d = BEZIER(S0)(sc2d);

var scc1 = [[1.72, 2.72,2.25],[1.86, 2.76,2.25]];
var scc1 = BEZIER(S0)(scc1);

var scc2 = [[1.72, 2.72,2.75],[1.86, 2.76,2.75]];
var scc2 = BEZIER(S0)(scc2);

var scc3 = [[5.66, 4.43,2.25],[5.56, 4.45,2.25]];
var scc3 = BEZIER(S0)(scc3);

var scc4 = [[5.66, 4.43,2.75],[5.56, 4.45,2.75]];
var scc4 = BEZIER(S0)(scc4);

var ssc1 = bezierMappata_2D([sc1,sc2]);
var ssc2 = bezierMappata_2D([sc1d,sc2d]);
var ssc3 = bezierMappata_2D([sc1,sc1d]);
var ssc4 = bezierMappata_2D([sc2,sc2d]);
var sscc1 = bezierMappata_2D([scc1,scc2]);
var sscc2 = bezierMappata_2D([scc3,scc4]);

var strutturaCurva = COLOR([0,0,0])(STRUCT([ssc1,ssc2,ssc3,ssc4,sscc1,sscc2]));

// gambe struttura curva
var g1 = [[3.93, 2.3,2.25], [4.09, 1.9,2.25], [4.32, 2.27,2.25], [5.4, 1.46,2.25]];
var g1 = BEZIER(S0)(g1);

var g2 = [[3.99, 2.26,2.25], [4.15, 2.21,2.25], [5.05, 2.01,2.25], [5.48, 1.5,2.25]];
var g2 = BEZIER(S0)(g2);

var g1d = [[3.93, 2.3,2.75], [4.09, 1.9,2.75], [4.32, 2.27,2.75], [5.4, 1.46,2.75]];
var g1d = BEZIER(S0)(g1d);

var g2d = [[3.99, 2.26,2.75], [4.15, 2.21,2.75], [5.05, 2.01,2.75], [5.48, 1.5,2.75]];
var g2d = BEZIER(S0)(g2d);

var gs1 = bezierMappata_2D([g1,g2]);
var gs2 = bezierMappata_2D([g1d,g2d]);
var gs3 = bezierMappata_2D([g1,g1d]);
var gs4 = bezierMappata_2D([g2,g2d]);

var g3 = [[2.95, 2.23,2.25], [2.87, 1.83,2.25], [2.48, 1.96,2.25], [2.02, 1.51,2.25]];
var g3 = BEZIER(S0)(g3);

var g4 = [[2.84, 2.16,2.25], [2.5, 1.99,2.25], [2.2, 1.9,2.25], [1.89, 1.54,2.25]];
var g4 = BEZIER(S0)(g4);

var g3d = [[2.95, 2.23,2.75], [2.87, 1.83,2.75], [2.48, 1.96,2.75], [2.02, 1.51,2.75]];
var g3d = BEZIER(S0)(g3d);

var g4d = [[2.84, 2.16,2.75], [2.5, 1.99,2.75], [2.2, 1.9,2.75], [1.89, 1.54,2.75]];
var g4d = BEZIER(S0)(g4d);

var gs5 = bezierMappata_2D([g3,g4]);
var gs6 = bezierMappata_2D([g3d,g4d]);
var gs7 = bezierMappata_2D([g3,g3d]);
var gs8 = bezierMappata_2D([g4,g4d]);

var gambe = COLOR([0,0,0])(STRUCT([gs1,gs2,gs3,gs4,gs5,gs6,gs7,gs8]));

// basi struttura
function base(){

  var b1 = [[5.66, 4.44,0], [6.69, 3.64,0], [6.69, 2.08,0], [5.59, 1.45,0]];
  var b1 = BEZIER(S0)(b1);

  var b2 = [[5.44, 4.46,0], [6.49, 3.64,0], [6.43, 2.08,0], [5.29, 1.46,0]];
  var b2 = BEZIER(S0)(b2);

  var b1d = [[5.66, 4.44,0.03], [6.69, 3.64,0.03], [6.69, 2.08,0.03], [5.59, 1.45,0.03]];
  var b1d = BEZIER(S0)(b1d);

  var b2d = [[5.44, 4.46,0.03], [6.49, 3.64,0.03], [6.43, 2.08,0.03], [5.29, 1.46,0.03]];
  var b2d = BEZIER(S0)(b2d);

  var bc1 = [[5.66, 4.44,0], [5.44, 4.46,0]];
  var bc1 = BEZIER(S0)(bc1);

  var bc2 = [[5.66, 4.44,0.03], [5.44, 4.46,0.03]];
  var bc2 = BEZIER(S0)(bc2);

  var bc3 = [[5.59, 1.45,0], [5.29, 1.46,0]];
  var bc3 = BEZIER(S0)(bc3);

  var bc4 = [[5.59, 1.45,0.03], [5.29, 1.46,0.03]];
  var bc4 = BEZIER(S0)(bc4);


  var bs1 = bezierMappata_2D([b1,b2]);
  var bs2 = bezierMappata_2D([b1d,b2d]);
  var bs3 = bezierMappata_2D([b1,b1d]);
  var bs4 = bezierMappata_2D([b2,b2d]);

  var bbc1 = bezierMappata_2D([bc1,bc2]);
  var bbc2 = bezierMappata_2D([bc3,bc4]);

  var base = STRUCT([bs1,bs2,bs3,bs4,bbc1,bbc2]);

  base = R([1,2])([PI/2])(base);
  base = T([0,1,2])([-0.82,1.5,-0.5])(base);

  var base2 = base;

  base2 = R([0,2])(PI)(base2);
  base2 = T([0,1,2])([7.4,0.035,5])(base2);

  return COLOR([92/255,92/255,92/255])(STRUCT([base, base2]));
}
var basi = base();


// cuscino alto

  // struttura
var c1 = [[5.04, 3.21,1], [4.41, 4.05,1], [5.31, 4.55,1], [5.57, 4.44,1]];
var c1 = BEZIER(S0)(c1);

var c2 = [[5, 3.21,1], [4.38, 3.94,1], [5.12, 4.57,1], [5.59, 4.47,1]]; // da riusare
var c2 = BEZIER(S0)(c2);

var c1d = [[5.04, 3.21,4], [4.41, 4.05,4], [5.31, 4.55,4], [5.57, 4.44,4]];
var c1d = BEZIER(S0)(c1d);

var c2d = [[5, 3.21,4], [4.38, 3.94,4], [5.12, 4.57,4], [5.59, 4.47,4]];
var c2d = BEZIER(S0)(c2d);

var cc1 = [[5.04, 3.21,1],[5, 3.21,1]];
var cc1 = BEZIER(S0)(cc1);

var cc2 = [[5.04, 3.21,4],[5, 3.21,4]];
var cc2 = BEZIER(S0)(cc2);

var cc3 = [[5.57, 4.44,1], [5.59, 4.47,1]];
var cc3 = BEZIER(S0)(cc3);

var cc4 = [[5.57, 4.44,4], [5.59, 4.47,4]];
var cc4 = BEZIER(S0)(cc4);

var cs1 = bezierMappata_2D([c1,c2]);
var cs2 = bezierMappata_2D([c1d,c2d]);
var cs3 = bezierMappata_2D([c1,c1d]);
var cs4 = bezierMappata_2D([c2,c2d]);

var ccc1 = bezierMappata_2D([cc1,cc2]);
var ccc2 = bezierMappata_2D([cc3,cc4]);

  // cuscino
var cuscinoInizio = [[5, 3.21,1.05], [4.38, 3.94,1.05], [5.12, 4.57,1.05], [5.59, 4.47,1.05]];
var cuscinoInizio = BEZIER(S0)(cuscinoInizio);

var cuscinoFine = [[5, 3.21,3.95], [4.38, 3.954,3.95], [5.12, 4.57,3.95], [5.59, 4.47,3.95]];
var cuscinoFine = BEZIER(S0)(cuscinoFine);

var cuscinoPicco = [[5, 3.21,1.1], [3.78, 3.77,1.1], [4.99, 4.91,1.1], [5.57, 4.47,1.1]];
var cuscinoPicco = BEZIER(S0)(cuscinoPicco);

var cuscinoPiccoD = [[5, 3.21,3.9], [3.78, 3.77,3.9], [4.99, 4.91,3.9], [5.57, 4.47,3.9]];
var cuscinoPiccoD = BEZIER(S0)(cuscinoPiccoD);

var p1 = COLOR([92/255,92/255,92/255])(bezierMappata_2D([cuscinoInizio, cuscinoPicco, cuscinoPiccoD, cuscinoFine]));

var strutturaAlta = COLOR([0,0,0])(STRUCT([cs1,cs2,cs3,cs4,ccc1,ccc2]));
var cuscinoAlto = STRUCT([strutturaAlta, p1]);


// cuscino medio
  // struttura
var c3 = [[4.98, 3.17,1], [4.27, 3.57,1], [3.55, 2.8,1], [3.77, 2.3,1]];
var c3 = BEZIER(S0)(c3);

var c4 = [[5, 3.21,1], [4.18, 3.59,1], [3.55, 2.93,1], [3.7, 2.29,1]];
var c4 = BEZIER(S0)(c4);

var c3d = [[4.98, 3.17,4], [4.27, 3.57,4], [3.55, 2.8,4], [3.77, 2.3,4]];
var c3d = BEZIER(S0)(c3d);

var c4d = [[5, 3.21,4], [4.18, 3.59,4], [3.55, 2.93,4], [3.7, 2.29,4]];
var c4d = BEZIER(S0)(c4d);

var cc5 = [[4.98, 3.17,1],[5, 3.21,1]];
var cc5 = BEZIER(S0)(cc5);

var cc6 = [[4.98, 3.17,4],[5, 3.21,4]];
var cc6 = BEZIER(S0)(cc6);

var cc7 = [[3.77, 2.3,1], [3.7, 2.29,1]];
var cc7 = BEZIER(S0)(cc7);

var cc8 = [[3.77, 2.3,4], [3.7, 2.29,4]];
var cc8 = BEZIER(S0)(cc8);

var cs5 = bezierMappata_2D([c3,c4]);
var cs6 = bezierMappata_2D([c3d,c4d]);
var cs7 = bezierMappata_2D([c3,c3d]);
var cs8 = bezierMappata_2D([c4,c4d]);

var ccc3 = bezierMappata_2D([cc5,cc6]);
var ccc4 = bezierMappata_2D([cc7,cc8]);

  // cuscino
var cuscinoInizio = [[5, 3.21,1.05], [4.18, 3.59,1.05], [3.55, 2.93,1.05], [3.7, 2.29,1.05]];
var cuscinoInizio = BEZIER(S0)(cuscinoInizio);

var cuscinoFine = [[5, 3.21,3.95], [4.18, 3.59,3.95], [3.55, 2.93,3.95], [3.7, 2.29,3.95]];
var cuscinoFine = BEZIER(S0)(cuscinoFine);

var cuscinoPicco = [[5, 3.21,1.1], [4.15, 3.85,1.1], [3.26, 3.18,1.1], [3.7, 2.29,1.1]];
var cuscinoPicco = BEZIER(S0)(cuscinoPicco);

var cuscinoPiccoD = [[5, 3.21,3.9], [4.15, 3.85,3.9], [3.26, 3.18,3.9], [3.7, 2.29,3.9]];
var cuscinoPiccoD = BEZIER(S0)(cuscinoPiccoD);

var p2 = COLOR([92/255,92/255,92/255])(bezierMappata_2D([cuscinoInizio, cuscinoPicco, cuscinoPiccoD, cuscinoFine]));
var strutturaMedia = COLOR([0,0,0])(STRUCT([cs5,cs6,cs7,cs8,ccc3,ccc4]));

var cuscinoMedio = STRUCT([strutturaMedia, p2]);

// cuscino basso
  // struttura
var c5 = [[1.6, 2.68,1], [1.96, 2.94,1], [3.04, 3.08,1], [3.7, 2.29,1]];
var c5 = BEZIER(S0)(c5);

var c6 = [[1.6, 2.59,1], [1.96, 2.86,1], [3.02, 3.03,1], [3.64, 2.25,1]];
var c6 = BEZIER(S0)(c6);

var c5d = [[1.6, 2.68,4], [1.96, 2.94,4], [3.04, 3.08,4], [3.7, 2.29,4]];
var c5d = BEZIER(S0)(c5d);

var c6d = [[1.6, 2.59,4], [1.96, 2.86,4], [3.02, 3.03,4], [3.64, 2.25,4]];
var c6d = BEZIER(S0)(c6d);

var cc9 = [[1.6, 2.68,1],[1.6, 2.59,1]];
var cc9 = BEZIER(S0)(cc9);

var cc10 = [[1.6, 2.68,4],[1.6, 2.59,4]];
var cc10 = BEZIER(S0)(cc10);

var cc11 = [[3.77, 2.3,1], [3.64, 2.25,1]];
var cc11 = BEZIER(S0)(cc11);

var cc12 = [[3.77, 2.3,4], [3.64, 2.25,4]];
var cc12 = BEZIER(S0)(cc12);

var cs9 = bezierMappata_2D([c5,c6]);
var cs10 = bezierMappata_2D([c5d,c6d]);
var cs11 = bezierMappata_2D([c5,c5d]);
var cs12 = bezierMappata_2D([c6,c6d]);

var ccc5 = bezierMappata_2D([cc9, cc10]);
var ccc6 = bezierMappata_2D([cc11,cc12]);

  // cuscino
var cuscinoInizio = [[1.6, 2.68,1.05], [1.96, 2.94,1.05], [3.04, 3.08,1.05], [3.7, 2.29,1.05]];
var cuscinoInizio = BEZIER(S0)(cuscinoInizio);

var cuscinoFine = [[1.6, 2.68,3.95], [1.96, 2.94,3.95], [3.04, 3.08,3.95], [3.7, 2.29,3.95]];
var cuscinoFine = BEZIER(S0)(cuscinoFine);

var cuscinoPicco = [[1.6, 2.68,1.1], [2.18, 3.47,1.1], [3.56, 3.19,1.1], [3.7, 2.29,1.1]];
var cuscinoPicco = BEZIER(S0)(cuscinoPicco);

var cuscinoPiccoD = [[1.6, 2.68,3.9], [2.18, 3.47,3.9], [3.56, 3.19,3.9], [3.7, 2.29,3.9]];
var cuscinoPiccoD = BEZIER(S0)(cuscinoPiccoD);

var p3 = COLOR([92/255,92/255,92/255])(bezierMappata_2D([cuscinoInizio, cuscinoPicco, cuscinoPiccoD, cuscinoFine]));
var strutturaBassa = COLOR([0,0,0])(STRUCT([cs9,cs10,cs11,cs12,ccc5,ccc6]));


var cuscinoBasso = STRUCT([strutturaBassa, p3]);


var sedia = STRUCT([strutturaCurva, gambe, basi,cuscinoAlto, cuscinoMedio, cuscinoBasso]);
sedia = T([0,1,2])([-4,-1.4,-2.3])(sedia);

var model = sedia;


  return model
  })();

  exports.author = 'Pausa90';
  exports.category = 'furnitures';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));