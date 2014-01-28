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
// dichiarazione dei domini utili per la creazione delle linee, delle superfici e dei volumi
var domain = INTERVALS(1)(30);
var domain2 = DOMAIN([[0,1],[0,1]])([30,30]);
var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([15,15,15]);

/*
* funzione che calcola la parte inferiore della schermata frontale del dispositivo
*/
var frontInf = function(){

  var controlPoint1 = [[0,5.8,0],[1.2,5.8,0],[0,0,0],[0,0,0]];
  var c1 = CUBIC_HERMITE(S0)(controlPoint1); 
  var controlPoint2 = [[0,2.9,0],[1.2,2.9,0],[0,0,0],[0,0,0]];
  var c2 = CUBIC_HERMITE(S0)(controlPoint2); 
  var blocco1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
  var disBlocco1 = MAP(blocco1)(domain2);

  var controlPoint3 = [[4.8,5.8,0],[6,5.8,0],[0,0,0],[0,0,0]];
  var c3 = CUBIC_HERMITE(S0)(controlPoint3); 
  var controlPoint4 = [[4.8,2.9,0],[6,2.9,0],[0,0,0],[0,0,0]];
  var c4 = CUBIC_HERMITE(S0)(controlPoint4); 
  var blocco2 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
  var disBlocco2 = MAP(blocco2)(domain2);

  var controlPoint5 = [[1.2,5.8,0],[4.8,5.8,0],[0,0,0],[0,0,0]];
  var c5 = CUBIC_HERMITE(S0)(controlPoint5); 
  var controlPoint6 = [[1.2,2.9,0],[4.8,2.9,0],[0,7.1,0],[0,-7.1,0]];
  var c6 = CUBIC_HERMITE(S0)(controlPoint6); 
  var blocco3 = CUBIC_HERMITE(S1)([c5,c6,[0,0,0],[0,0,0]]);
  var disBlocco3 = MAP(blocco3)(domain2);

  var bloccoSup = STRUCT([ disBlocco1, disBlocco2, disBlocco3 ]);


  var controlPoint7 = [[0,2.9,0],[1.2,2.9,0],[0,0,0],[0,0,0]];
  var c7 = CUBIC_HERMITE(S0)(controlPoint7); 
  var controlPoint8 = [[0,0.4,0],[1.2,0.4,0],[0,0,0],[0,0,0]];
  var c8 = CUBIC_HERMITE(S0)(controlPoint8); 
  var blocco4 = CUBIC_HERMITE(S1)([c7,c8,[0,0,0],[0,0,0]]);
  var disBlocco4 = MAP(blocco4)(domain2);

  var controlPoint9 = [[4.8,2.9,0],[6,2.9,0],[0,0,0],[0,0,0]];
  var c9 = CUBIC_HERMITE(S0)(controlPoint9); 
  var controlPoint10 = [[4.8,0.4,0],[6,0.4,0],[0,0,0],[0,0,0]];
  var c10 = CUBIC_HERMITE(S0)(controlPoint10); 
  var blocco5 = CUBIC_HERMITE(S1)([c9,c10,[0,0,0],[0,0,0]]);
  var disBlocco5 = MAP(blocco5)(domain2);

  var controlPoint11 = [[1.2,2.9,0],[4.8,2.9,0],[0,-7.1,0],[0,7.1,0]];
  var c11 = CUBIC_HERMITE(S0)(controlPoint11); 
  var controlPoint12 = [[1.2,0.4,0],[4.8,0.4,0],[0,0,0],[0,0,0]];
  var c12 = CUBIC_HERMITE(S0)(controlPoint12); 
  var blocco6 = CUBIC_HERMITE(S1)([c11,c12,[0,0,0],[0,0,0]]);
  var disBlocco6 = MAP(blocco6)(domain2);


  var controlPoint13 = [[0,0.4,0],[3.5,0.4,0],[0,0,0],[0,0,0]];
  var c13 = CUBIC_HERMITE(S0)(controlPoint13); 
  var controlPoint14 = [[0.4,0,0],[3.5,0,0],[0,0,0],[0,0,0]];
  var c14 = CUBIC_HERMITE(S0)(controlPoint14); 
  var blocco7 = CUBIC_HERMITE(S1)([c13,c14,[0,-0.7,0],[0.7,0,0]]);
  var disBlocco7 = MAP(blocco7)(domain2);
  var disBlocco8 = R([0,2])([PI])(disBlocco7);
  disBlocco8 = T([0])([6])(disBlocco8);



  var bloccoSup = STRUCT([ disBlocco1, disBlocco2, disBlocco3 ]);
  var bloccoInf = STRUCT([ disBlocco4, disBlocco5, disBlocco6]);

  var frontInf = STRUCT([bloccoSup, bloccoInf, disBlocco7, disBlocco8]);
  frontInf = COLOR([0,0,0,1])(frontInf);

  return frontInf;
}

var frontSup = function() {

  var controlPoint1 = [[0,5.8,0],[0.4,5.8,0],[0,0,0],[0,0,0]];
  var c1 = CUBIC_HERMITE(S0)(controlPoint1); 
  var controlPoint2 = [[0,9.9,0],[0.4,9.9,0],[0,0,0],[0,0,0]];
  var c2 = CUBIC_HERMITE(S0)(controlPoint2); 
  var blocco1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
  var disBlocco1 = MAP(blocco1)(domain2);

  var controlPoint3 = [[5.6,5.8,0],[6,5.8,0],[0,0,0],[0,0,0]];
  var c3 = CUBIC_HERMITE(S0)(controlPoint3); 
  var controlPoint4 = [[5.6,9.9,0],[6,9.9,0],[0,0,0],[0,0,0]];
  var c4 = CUBIC_HERMITE(S0)(controlPoint4); 
  var blocco2 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
  var disBlocco2 = MAP(blocco2)(domain2);

  var bloccoInf = STRUCT([disBlocco1, disBlocco2]);

  var controlPoint4 = [[0,9.9,0],[3.5,9.9,0],[0,0,0],[0,0,0]];
  var c4 = CUBIC_HERMITE(S0)(controlPoint4); 
  var controlPoint5 = [[0.4,10.3,0],[3.5,10.3,0],[0,0,0],[0,0,0]];
  var c5 = CUBIC_HERMITE(S0)(controlPoint5); 
  var blocco3 = CUBIC_HERMITE(S1)([c4,c5,[0,0.7,0],[0.7,0,0]]);
  var disBlocco3 = MAP(blocco3)(domain2);
  var disBlocco4 = R([0,2])([PI])(disBlocco3);
  disBlocco4 = T([0])([6])(disBlocco4);

  var bloccoSup = STRUCT([disBlocco3, disBlocco4]);

  var frontSup = STRUCT([bloccoSup, bloccoInf]);
  frontSup = COLOR([0,0,0,1])(frontSup);

  return frontSup;
}

var tastiera = function() {

  var controlPoint1 = [[1.2,2.9,0],[4.8,2.9,0],[0,7.1,0],[0,-7.1,0]];
  var c1 = CUBIC_HERMITE(S0)(controlPoint1); 
  var controlPoint2 = [[2.2,2.9,0],[3.8,2.9,0],[0,3,0],[0,-3,0]];
  var c2 = CUBIC_HERMITE(S0)(controlPoint2); 
  var blocco1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
  var disBlocco1 = MAP(blocco1)(domain2);
  disBlocco1 = COLOR([1,1,1,1])(disBlocco1);

  var disBlocco2 = R([1,2])([PI])(disBlocco1);
  disBlocco2 = T([1])([5.8])(disBlocco2);

  var controlPoint3 = [[2.2,2.9,0],[3.8,2.9,0],[0,0,0],[0,0,0]];
  var c3 = CUBIC_HERMITE(S0)(controlPoint3); 
  var blocco3 = CUBIC_HERMITE(S1)([c2,c3,[0,0,0],[0,0,0]]);
  var disBlocco3 = MAP(blocco3)(domain2);
  disBlocco3 = COLOR([0,0,0,1])(disBlocco3);

  var disBlocco4 = R([1,2])([PI])(disBlocco3),
  disBlocco4 = T([1])([5.8])(disBlocco4);

  var tastiera = STRUCT([disBlocco1, disBlocco2, disBlocco3, disBlocco4]);

  return tastiera;
}

var retro = function() {

  var controlPoint1 = [[0,0.4,-1],[6,0.4,-1],[0,0,0],[0,0,0]];
  var c1 = CUBIC_HERMITE(S0)(controlPoint1); 
  var controlPoint2 = [[0,9.9,-1],[6,9.9,-1],[0,0,0],[0,0,0]];
  var c2 = CUBIC_HERMITE(S0)(controlPoint2); 
  var blocco1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
  var disBlocco1 = MAP(blocco1)(domain2);
  
  var controlPoint3 = [[0,0.4,-1],[3.5,0.4,-1],[0,0,0],[0,0,0]];
  var c3 = CUBIC_HERMITE(S0)(controlPoint3); 
  var controlPoint4 = [[0.4,0,-1],[3.5,0,-1],[0,0,0],[0,0,0]];
  var c4 = CUBIC_HERMITE(S0)(controlPoint4); 
  var blocco2 = CUBIC_HERMITE(S1)([c3,c4,[0,-0.7,0],[0.7,0,0]]);
  var disBlocco2 = MAP(blocco2)(domain2);
  var disBlocco3 = R([0,2])([PI])(disBlocco2);
  disBlocco3 = T([0,2])([6,-2])(disBlocco3);

  var spoiler = STRUCT([disBlocco2, disBlocco3]);

  spoiler =T([1,2])([10.3,-2])( R([1,2])(PI)(spoiler) );

  var retro = STRUCT([disBlocco1, disBlocco2, disBlocco3, spoiler]);
  retro = COLOR([1,1,1,1])(retro);
  return retro;
}

var lato = function() {

  var controlPoint1 = [[0,0.4,0],[0,9.9,0],[0,0,0],[0,0,0]];
  var c1 = CUBIC_HERMITE(S0)(controlPoint1); 
  var controlPoint2 = [[0,0.4,-1],[0,9.9,-1],[0,0,0],[0,0,0]];
  var c2 = CUBIC_HERMITE(S0)(controlPoint2); 
  var blocco1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
  var disBlocco1 = MAP(blocco1)(domain2);
  disBlocco1 = COLOR([1,1,1,1])(disBlocco1);

  var disBlocco2 = T([0])([6])(disBlocco1);

  var lato = STRUCT([disBlocco1, disBlocco2]);

  return lato;
}

var fondo = function() {

  var controlPoint1 = [[0.4,0,0],[2,0,0],[0,0,0],[0,0,0]];
  var c1 = CUBIC_HERMITE(S0)(controlPoint1); 
  var controlPoint2 = [[0.4,0,-1],[2,0,-1],[0,0,0],[0,0,0]];
  var c2 = CUBIC_HERMITE(S0)(controlPoint2); 
  var blocco1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
  var disBlocco1 = MAP(blocco1)(domain2);
  disBlocco1 = COLOR([1,1,1,1])(disBlocco1);

  var disBlocco2 = T([0])([3.6])(disBlocco1);
  disBlocco2 = COLOR([1,1,1,1])(disBlocco2);

  var controlPoint3 = [[2,0,0],[4,0,0],[0,0,0],[0,0,0]];
  var c3 = CUBIC_HERMITE(S0)(controlPoint3); 
  var controlPoint4 = [[2,0,-0.3],[4,0,-0.3],[0,0,0],[0,0,0]];
  var c4 = CUBIC_HERMITE(S0)(controlPoint4); 
  var blocco3 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
  var disBlocco3 = MAP(blocco3)(domain2);
  disBlocco3 = COLOR([1,1,1,1])(disBlocco3);

  var controlPoint5 = [[2,0,-0.7],[4,0,-0.7],[0,0,0],[0,0,0]];
  var c5 = CUBIC_HERMITE(S0)(controlPoint5); 
  var blocco5 = CUBIC_HERMITE(S1)([c4,c5,[0,5,0],[0,-5,0]]);
  var disBlocco5 = MAP(blocco5)(domain2);
  disBlocco5 = COLOR([1,1,1,1])(disBlocco5);

  var controlPoint6 = [[2,0,-0.3],[2,0,-0.7],[0,0,0],[0,0,0]];
  var c6 = CUBIC_HERMITE(S0)(controlPoint6); 
  var controlPoint7 = [[4,0,-0.3],[4,0,-0.7],[0,0,0],[0,0,0]];
  var c7 = CUBIC_HERMITE(S0)(controlPoint7); 
  var blocco6 = CUBIC_HERMITE(S1)([c6,c7,[0,5,0],[0,-5,0]]);
  var disBlocco6 = MAP(blocco6)(domain2);
  disBlocco6 = COLOR([1,1,1,1])(disBlocco6);

  var linguetta = CUBOID([1.6,2.5, 0.15]);
  linguetta = T([0,1,2])([2.2,0.2,-0.6])(linguetta);
  linguetta = COLOR([0,0,0,1])(linguetta);


  var disBlocco4 = T([2])([-0.7])(disBlocco3);
  disBlocco4 = COLOR([1,1,1,1])(disBlocco4);

  var fondo = STRUCT([disBlocco1, disBlocco2, disBlocco3, disBlocco4, disBlocco5, disBlocco6, linguetta]);

  return fondo;

}

var latoSuperiore = function() {

  var controlPoint1 = [[0.4,10.3,0],[1.6,10.3,0],[0,0,0],[0,0,0]];
  var c1 = CUBIC_HERMITE(S0)(controlPoint1); 
  var controlPoint2 = [[0.4,10.3,-0.4],[1.6,10.3,-0.4],[0,0,1],[0,0,-1]];
  var c2 = CUBIC_HERMITE(S0)(controlPoint2); 
  var blocco1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
  var disBlocco1 = MAP(blocco1)(domain2);

  var controlPoint3 = [[1.6,10.3,0],[5.2,10.3,0],[0,0,0],[0,0,0]];
  var c3 = CUBIC_HERMITE(S0)(controlPoint3); 
  var controlPoint4 = [[1.6,10.3,-1],[5.2,10.3,-1],[0,0,0],[0,0,0]];
  var c4 = CUBIC_HERMITE(S0)(controlPoint4); 
  var blocco2 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
  var disBlocco2 = MAP(blocco2)(domain2);

  var controlPoint5 = [[0.4,10.3,-0.4],[1.6,10.3,-0.4],[0,0,-1],[0,0,1]];
  var c5 = CUBIC_HERMITE(S0)(controlPoint5); 
  var controlPoint6 = [[0.4,10.3,-1],[1.6,10.3,-1],[0,0,0,],[0,0,0,]];
  var c6 = CUBIC_HERMITE(S0)(controlPoint6); 
  var blocco3 = CUBIC_HERMITE(S1)([c5,c6,[0,0,0],[0,0,0]]);
  var disBlocco3 = MAP(blocco3)(domain2);

  var controlPoint7 = [[5.2,10.3,0],[5.6,10.3,0],[0,0,0],[0,0,0]];
  var c7 = CUBIC_HERMITE(S0)(controlPoint7); 
  var controlPoint8 = [[5.2,10.3,-0.5],[5.6,10.3,-0.5],[0,0,0.8],[0,0,-0.8]];
  var c8 = CUBIC_HERMITE(S0)(controlPoint8); 
  var blocco4 = CUBIC_HERMITE(S1)([c7,c8,[0,0,0],[0,0,0]]);
  var disBlocco4 = MAP(blocco4)(domain2);

  var disBlocco5 = R([1,2])([PI])(disBlocco4);
  disBlocco5 = T([1,2])([20.6, -1])(disBlocco5);

  var controlPoint9 = [[0.4,10.4,-0.4],[1.6,10.4,-0.4],[0,0,1],[0,0,-1]];
  var c9 = CUBIC_HERMITE(S0)(controlPoint9); 
  var controlPoint10 = [[0.4,10.4,-0.4],[1.6,10.4,-0.4],[0,0,-1],[0,0,1]];
  var c10 = CUBIC_HERMITE(S0)(controlPoint10); 
  var blocco6 = CUBIC_HERMITE(S1)([c9,c10,[0,0,0],[0,0,0]]);
  var disBlocco6 = MAP(blocco6)(domain2);

  var blocco7 = CUBIC_HERMITE(S1)([c9,c2,[0,0,0],[0,0,0]]);
  var disBlocco7 = MAP(blocco7)(domain2);

  var blocco8 = CUBIC_HERMITE(S1)([c10,c5,[0,0,0],[0,0,0]]);
  var disBlocco8 = MAP(blocco8)(domain2);

  var latoSuperiore = STRUCT([disBlocco1, disBlocco2, disBlocco3, disBlocco4, disBlocco5, disBlocco6, disBlocco7, disBlocco8]);
  latoSuperiore = COLOR([1,1,1,1])(latoSuperiore);

  return latoSuperiore;
}

var angolo = function() {

  var controlPoint1 = [[0.4,0,0],[0.4,0,-1],[0,0,0],[0,0,0]];
  var c1 = CUBIC_HERMITE(S0)(controlPoint1); 
  var controlPoint2 = [[0,0.4,0],[0,0.4,-1],[0,0,0],[0,0,0]];
  var c2 = CUBIC_HERMITE(S0)(controlPoint2); 
  var blocco1 = CUBIC_HERMITE(S1)([c1,c2,[-0.7,0,0],[0,0.7,0]]);
  var disBlocco1 = MAP(blocco1)(domain2);

  var disBlocco2 =T([0])([6])( R([0,1])(PI/2)(disBlocco1) );

  var disBlocco3 =T([0,1])([6,10.3])( R([0,1])(PI)(disBlocco1) );

  var disBlocco4 =T([1])([10.3])( R([0,1])(PI*3/2)(disBlocco1) );

  var angolo = STRUCT([disBlocco1, disBlocco2, disBlocco3, disBlocco4]);
  angolo = COLOR([1,1,1,1])(angolo);

  return angolo;

}

var schermo = function(){

  var controlPoint1 = [[0.4,5.8,0],[5.6,5.8,0],[0,0,0],[0,0,0]];
  var c1 = CUBIC_HERMITE(S0)(controlPoint1); 
  var controlPoint2 = [[0.4,9.9,0],[5.6,9.9,0],[0,0,0],[0,0,0]];
  var c2 = CUBIC_HERMITE(S0)(controlPoint2); 
  var blocco1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
  var disBlocco1 = MAP(blocco1)(domain2);

  var schermo = STRUCT([disBlocco1]);
  schermo = COLOR([0.6,0.8,1,0.8])(schermo);
  return schermo;
}

var mela = function() {

  var spicchioSx = BEZIER(S0)([[0.75,1.2,0],[-0.4,1.7,0],[0.50,-0.2,0],[0.55,0.6,0],[0.75,0.50,0]]);
  

  var centro = BEZIER(S0)([[0.75,1.2,0],[0.75,0.50,0]]);

  var sinistra = CUBIC_HERMITE(S1)([spicchioSx, centro, [0,0,0],[0,0,0]]); 
  var dSin = MAP(sinistra)(domain2);

  var fogliaSx = CUBIC_HERMITE(S0)([[0.75, 1.35,0],[1, 1.6,0], [0,0.4,0],[0.4,0,0]]); 
  var fogliaDx = CUBIC_HERMITE(S0)([[0.75, 1.35,0],[1, 1.6,0], [0.4,0,0],[0,0.4,0]]);
  var foglia = CUBIC_HERMITE(S1)([fogliaSx, fogliaDx,[0,0,0],[0,0,0]]);
  var disFoglia = MAP(foglia)(domain2);

  var dx1 = BEZIER(S0)([[0.75,1.2,0],[1.15,1.4,0],[1.25,1.1,0]]); 
    

    var d1 = CUBIC_HERMITE(S1)([dx1, centro, [-0.8,0,0],[0,0,0]]); 
  var dd1 = MAP(d1)(domain2);



    var dx2 = CUBIC_HERMITE(S0)([[1.25,1.1,0],[1.25,0.7,0],[-0.8,0,0],[0.8,0,0]]); 
    var disegno2 = MAP(dx2)(domain);

    var d2 = CUBIC_HERMITE(S1)([dx2, centro, [-1,0,0],[0,0,0]]); 
  var dd2 = MAP(d2)(domain2);

    var dx3 = BEZIER(S0)([[1.25,0.7,0],[1,0.25,0],[0.95,0.6,0],[0.75,0.5,0]]);
    var disegno3 = MAP(dx3)(domain);


    var dx4 = CUBIC_HERMITE(S0)([[1.25,0.7,0],[0.8,0.7,0],[0,0,0],[0,0,0]]);
    var d3 = CUBIC_HERMITE(S1)([dx4, dx3, [0,0,0],[0,0,0]]); 
  var dd3 = MAP(d3)(domain2);
  

  var mela = STRUCT([dSin, disFoglia, dd1, dd2, dd3]);
  mela =T([0,1,2])([3.9,5,-1.01])( R([0,2])([PI])(mela) );

  return(mela);

}


var frontInf = frontInf();
var frontSup = frontSup();
var tastiera = tastiera();
var frontale = STRUCT([frontInf, frontSup, tastiera]);

var retro = retro();
var lato = lato();
var fondo = fondo();
var latoSuperiore = latoSuperiore();
var angolo = angolo();
var schermo = schermo();
var mela = mela();


var linea = CUBOID([0.05,0.3,0]);
var triangolo  = TRIANGLE_FAN([[0,0,0],[0,0.3,0],[0.3,0.15,0]]);

t1 = T([0,1,2])([2.8,1.5,0.05])(triangolo);
l1 = T([0,1,2])([3.2,1.5,0.05])(linea);
l2 = T([0,1,2])([3.35,1.5,0.05])(linea);

var play= STRUCT([t1, l1, l2]);

t2 = T([0,1,2])([4,2.7,0.05])(triangolo);
t3 = T([0,1,2])([4.3,2.7,0.05])(triangolo);
l3 = T([0,1,2])([4.6,2.7,0.05])(linea);

var avanti = STRUCT([ t2,t3,l3 ]);

var dietro =  R([0,2])([PI])(avanti);
dietro = T([0,2])([6,0.1])( dietro);

var scmodel = STRUCT([ frontale, lato, fondo, latoSuperiore, angolo, retro,  schermo, play, avanti, dietro, mela ]);

/////////////////////////////////////////////
return scmodel;
})();

exports.author = 'SimoneCas';
exports.category = 'villas';
exports.scmodel = scmodel;

if (!module.parent) {
  fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
}

}(this));