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
//modello di un diffusore acustico con altoparlante monovia (Fountek FE85)
//realizzato per decidere la disposizione del fonoassorbente interno, costituito da poliuretano espanso a celle aperte di forma piramidale e colore verde, più alcune parti di colore giallo
//il modello è in scala, come unità di misura è stato usato il centimetro

//funzione per il calcolo dei nodi a partire da un array di punti
function nodi (points) {
  var m = points.length;
  var k = 2;
  var n = (m + k + 1);
  var l = n - 3;
  var j = 1;
  var knots = [];
  for (var i = 0; i < 3; i++) {
    knots[i] = 0;
  };
  for (var i = 3; i < l; i++, j++) {
    knots[i] = j;
  };
  for (var i = l; i < n; i++) {
    knots[i] = j;
  };

  return knots;
};

//funzione per generare archi di circonferenza ruotati e traslati lungo l'asse z
function circle (r,tz,alpha,gradi) { 
  var funzione = function (p) { 
  var u = alpha + p[0] * gradi;

  return [r * SIN(u), r * COS(u), tz];
  };

  return funzione;
};

//domini usati per la generazione delle superfici
var domain1 = DOMAIN([[0,1],[0,1]])([50,12]);
var domain2 = DOMAIN([[0,1],[0,1]])([12,6]);
var domain3 = DOMAIN([[0,1],[0,1]])([50,20]);

//pannelli di legno che compongono la struttura esterna, spessi 18mm
//Il pannello frontale e quello destro sono stati resi semitrasparenti, così da poter osservare più agevolmente l'interno del diffusore
var pannelloLungo = SIMPLEX_GRID([[10],[20],[1.8]]);
var pannelloCorto = SIMPLEX_GRID([[13.6],[10],[1.8]]);
var pannelloBasso = T([0,1,2])([-1.8,-1.8,-1.8])(pannelloCorto);
var pannelloAlto = T([0,1,2])([-1.8,-1.8,20])(pannelloCorto);
var pannelloSinistro = T([0,1])([-1.8,-1.8])(R([0,1])([PI/2])(R([1,2])([PI/2])(pannelloLungo)));

var puntiPD1 = [[-5,-15,0],[-5,-15,1.8],[-5,-15,1.8],[-3.5,-15,1.8],[-3.5,-15,1.8],[-3.4,-15,1.8],[-1.45,-15,1.8],[1.45,-15,1.8],[3.4,-15,1.8],[3.5,-15,1.8],[3.5,-15,1.8],[5,-15,1.8],
                [5,-15,1.8],[5,-15,0],[5,-15,0],[3.5,-15,0],[3.5,-15,0],[3.4,-15,0],[1.45,-15,0],[-1.45,-15,0],[-3.4,-15,0],[-3.5,-15,0],[-3.5,-15,0],[-5,-15,0],[-5,-15,0],[-5,-15,0]];
var puntiPD2 = [[-5,0,0],[-5,0,1.8],[-5,0,1.8],[-3.5,0,1.8],[-3.5,0,1.8],[-3.4,-1.55,1.8],[-1.45,-3.5,1.8],[1.45,-3.5,1.8],[3.4,-1.55,1.8],[3.5,0,1.8],[3.5,0,1.8],[5,0,1.8],
                [5,0,1.8],[5,0,0],[5,0,0],[3.5,0,0],[3.5,0,0],[3.4,-1.55,0],[1.45,-3.5,0],[-1.45,-3.5,0],[-3.4,-1.55,0],[-3.5,0,0],[-3.5,0,0],[-5,0,0],[-5,0,0],[-5,0,0]];
var puntiPD3 = [[-5,0,0],[-5,0,1.8],[-5,0,1.8],[-3.5,0,1.8],[-3.5,0,1.8],[-3.4,1.55,1.8],[-1.45,3.5,1.8],[1.45,3.5,1.8],[3.4,1.55,1.8],[3.5,0,1.8],[3.5,0,1.8],[5,0,1.8],
                [5,0,1.8],[5,0,0],[5,0,0],[3.5,0,0],[3.5,0,0],[3.4,1.55,0],[1.45,3.5,0],[-1.45,3.5,0],[-3.4,1.55,0],[-3.5,0,0],[-3.5,0,0],[-5,0,0],[-5,0,0],[-5,0,0]];
var puntiPD4 = [[-5,5,0],[-5,5,1.8],[-5,5,1.8],[-3.5,5,1.8],[-3.5,5,1.8],[-3.4,5,1.8],[-1.45,5,1.8],[1.45,5,1.8],[3.4,5,1.8],[3.5,5,1.8],[3.5,5,1.8],[5,5,1.8],
                [5,5,1.8],[5,5,0],[5,5,0],[3.5,5,0],[3.5,5,0],[3.4,5,0],[1.45,5,0],[-1.45,5,0],[-3.4,5,0],[-3.5,5,0],[-3.5,5,0],[-5,5,0],[-5,5,0],[-5,5,0]];

var knotsPD1 = nodi(puntiPD1);
var curvaPD1 = NUBS(S0)(2)(knotsPD1)(puntiPD1);
var knotsPD2 = nodi(puntiPD2);
var curvaPD2 = NUBS(S0)(2)(knotsPD2)(puntiPD2);
var knotsPD3 = nodi(puntiPD3);
var curvaPD3 = NUBS(S0)(2)(knotsPD3)(puntiPD3);
var knotsPD4 = nodi(puntiPD4);
var curvaPD4 = NUBS(S0)(2)(knotsPD4)(puntiPD4);

var curvePD1 = [[0,-15,0.9],curvaPD1,curvaPD1,curvaPD2];
var knotsCPD1 = nodi(curvePD1);
var NpannelloD1 = NUBS(S1)(2)(knotsCPD1)(curvePD1);
var pannelloD1 = MAP(NpannelloD1)(domain1);

var curvePD2 = [curvaPD3,curvaPD4,curvaPD4,[0,5,0.9]];
var knotsCPD2 = nodi(curvePD2);
var NpannelloD2 = NUBS(S1)(2)(knotsCPD2)(curvePD2);
var pannelloD2 = MAP(NpannelloD2)(domain1);

var curvePD3 = [[0,-15,0.9],curvaPD1,curvaPD1,curvaPD4,curvaPD4,[0,5,0.9]];
var knotsCPD3 = nodi(curvePD3);
var NpannelloD3 = NUBS(S1)(2)(knotsCPD3)(curvePD3);
var pannelloD3 = MAP(NpannelloD3)(domain1);

var pannelloDavanti = STRUCT([COLOR([198/255,167/255,112/255,0.7]),T([0,2])([5,15]),R([1,2])([PI/2]),pannelloD1,pannelloD2]);
var pannelloDestro = STRUCT([COLOR([198/255,167/255,112/255,0.7]),T([0,1,2])([10,3.2,15]),R([0,1])([PI/2]),R([1,2])([PI/2]),pannelloD3]);
var pannelloDietro = T([1])([10-1.8])(R([1,2])([PI/2])(pannelloLungo));

var pannelli = STRUCT([pannelloDavanti,pannelloDestro,COLOR([198/255,167/255,112/255]),pannelloBasso,pannelloAlto,pannelloSinistro,pannelloDietro]);

//parti di poliuretano giallo
var basetta = COLOR([1,1,0.4])(SIMPLEX_GRID([[1.4],[2.5],[5]]));
var basettaDietro1 = COLOR([1,1,0.4])(SIMPLEX_GRID([[2.5,-5,2.5],[-5,1.4],[-2.5,15]]));
var basettaDietro2 = COLOR([1,1,0.4])(SIMPLEX_GRID([[10],[-5,1.4],[2.5,-15,2.5]]));
var basettaSopra = COLOR([1,1,0.4])(SIMPLEX_GRID([[-2.5,5],[2.5],[-18.6,1.4]]));

//parti di poliuretano a forma piramidale
var puntiBasePiramide = [[0,0,0],[0,2.5,0],[0,2.5,0],[2.5,2.5,0],[2.5,2.5,0],[2.5,0,0],[2.5,0,0],[0,0,0]];
var puntiTopPiramide = [[0,0,1.5],[0,2.5,1.5],[0,2.5,1.5],[2.5,2.5,1.5],[2.5,2.5,1.5],[2.5,0,1.5],[2.5,0,1.5],[0,0,1.5]];

var knotsBP = nodi(puntiBasePiramide);
var basePiramide = NUBS(S0)(2)(knotsBP)(puntiBasePiramide);

var knotsTP = nodi(puntiTopPiramide);
var topPiramide = NUBS(S0)(2)(knotsTP)(puntiTopPiramide);

var curvePiramide = [basePiramide,basePiramide,topPiramide,topPiramide,[1.25,1.25,3],[1.25,1.25,3]];
var knotsPiramide = nodi(curvePiramide);
var piramide = NUBS(S1)(2)(knotsPiramide)(curvePiramide);
var mappaPiramide = COLOR([0.4,1,0.4])(MAP(piramide)(domain2));

var curvePunta = [topPiramide,topPiramide,[1.25,1.25,3],[1.25,1.25,3]];
var knotsPunta = nodi(curvePunta);
var punta = NUBS(S1)(2)(knotsPunta)(curvePunta);
var mappaPunta = COLOR([0.4,1,0.4])(MAP(punta)(domain2));

var basePunte = COLOR([0.4,1,0.4])(SIMPLEX_GRID([[-1.25,7.5],[0.1],[-1.25,10]]));

//poliuretano sui vari pannelli
//il poliuretano sul pannello destro è stato reso semitrasparente, così da poter osservare più agevolmente l'interno del diffusore
var piramideBasso = STRUCT([mappaPiramide,T([0])([2.5])(mappaPiramide),T([1])([2.5])(mappaPiramide),T([0,1])([2.5,2.5])(mappaPiramide)]);
var piramidiBasso = STRUCT([piramideBasso,T([0])([5]),piramideBasso]);
var piramidiSx = STRUCT([T([2])([12.5]),basetta,R([0,2])([PI/2]),piramidiBasso,T([0,1])([-2.5,2.5]),mappaPiramide,T([0])([-2.5]),mappaPiramide]);
var piramidiDx = STRUCT([T([0])([10]),R([0,1])([PI]),S([1])([-1]),T([2])([12.5]),COLOR([1,1,0.4,0.8])(basetta),COLOR([0.4,1,0.4,0.8]),R([0,2])([PI/2]),piramidiBasso,T([0,1])([-2.5,2.5]),mappaPiramide,T([0])([-2.5]),mappaPiramide]);
var piramideDietro = T([0,1,2])([2.5,6.4,2.5])(R([1,2])([PI/2])(piramideBasso));
var piramidiDietro = STRUCT([basettaDietro1,basettaDietro2,piramideDietro,T([2])([5]),piramideDietro,T([2])([5]),piramideDietro]);
var piramideSopra = STRUCT([T([1,2])([5,20]),R([1,2])([PI]),mappaPiramide]);
var piramidiSopra = STRUCT([basettaSopra,T([0,1])([7.5,-2.5])(piramideSopra),T([1])([-2.5])(piramideSopra),piramideSopra,T([0])([2.5]),piramideSopra,T([0])([2.5]),piramideSopra,T([0])([2.5]),piramideSopra]);
var piramideAvanti = T([0,1])([2.5,-1.5])(R([1,2])([-PI/2])(mappaPunta));
var filaPiramidiAvanti = STRUCT([T([2])([3.75]),piramideAvanti,T([2])([2.5]),piramideAvanti,T([2])([2.5]),piramideAvanti,T([2])([2.5]),piramideAvanti]);
var piramidiAvanti = STRUCT([basePunte,T([1])([0.1]),T([0])([-1.25]),filaPiramidiAvanti,T([0])([2.5]),filaPiramidiAvanti,T([0])([2.5]),filaPiramidiAvanti]);

var piramidi = STRUCT([piramidiBasso,piramidiSx,piramidiDx,piramidiDietro,piramidiSopra,piramidiAvanti]);


//ALTOPARLANTE

//cestello
var a = 0.5/1.5; //coefficiente angolare delle lamiere del cestello
var circle1 = circle(3 + a*0.5,3,0,PI/8);
var circle2 = circle(3 + a*0.5,3,PI/2,PI/8);
var circle3 = circle(3 + a*0.5,3,PI,PI/8);
var circle4 = circle(3 + a*0.5,3,3*PI/2,PI/8);
var circle1a = circle(3 + a*1.5,4,0,PI/8);
var circle2a = circle(3 + a*1.5,4,PI/2,PI/8);
var circle3a = circle(3 + a*1.5,4,PI,PI/8);
var circle4a = circle(3 + a*1.5,4,3*PI/2,PI/8);

var curveCestello1 = [circle1,circle1,circle1a,circle1a];
var knotsC1 = nodi(curveCestello1);
var cestello1 = NUBS(S1)(2)(knotsC1)(curveCestello1);
var mappaCestello1 = MAP(cestello1)(domain2);

var curveCestello2 = [circle2,circle2,circle2a,circle2a];
var knotsC2 = nodi(curveCestello2);
var cestello2 = NUBS(S1)(2)(knotsC2)(curveCestello2);
var mappaCestello2 = MAP(cestello2)(domain2);

var curveCestello3 = [circle3,circle3,circle3a,circle3a];
var knotsC3 = nodi(curveCestello3);
var cestello3 = NUBS(S1)(2)(knotsC3)(curveCestello3);
var mappaCestello3 = MAP(cestello3)(domain2);

var curveCestello4 = [circle4,circle4,circle4a,circle4a];
var knotsC4 = nodi(curveCestello4);
var cestello4 = NUBS(S1)(2)(knotsC4)(curveCestello4);
var mappaCestello4 = MAP(cestello4)(domain2);

var cerchioC1 = circle(2.5,2,0,2*PI);
var cerchioC2 = circle(2.6,2.5,0,2*PI);
var cerchioC3 = circle(3,2.5,0,2*PI);
var cerchioC4 = circle(3 + a*0.5,3,0,2*PI);

var curveCestello5 = [cerchioC1,cerchioC2,cerchioC2,cerchioC3,cerchioC3,cerchioC4];
var knotsC5 = nodi(curveCestello5);
var cestello5 = NUBS(S1)(2)(knotsC5)(curveCestello5);
var mappaCestello5 = MAP(cestello5)(domain3);

var cerchioC5 = circle(3.5,4,0,2*PI);
var cerchioC6 = circle(4.5,4,0,2*PI);
var cerchioC7 = circle(4.5,4.2,0,2*PI);
var cerchioC8 = circle(4.45,4.3,0,2*PI);
var cerchioC9 = circle(3.75,4.3,0,2*PI);
var cerchioC10 = circle(3.8,4.2,0,2*PI);
var cerchioC11 = circle(3.8,4,0,2*PI);
var cerchioC12 = circle(3.3,4,0,2*PI);

var curveCestello6 = [cerchioC5,cerchioC6,cerchioC6,cerchioC7,cerchioC8,cerchioC8,cerchioC9,cerchioC9,cerchioC10,cerchioC11,cerchioC11,cerchioC12];
var knotsC6 = nodi(curveCestello6);
var cestello6 = NUBS(S1)(2)(knotsC6)(curveCestello6);
var mappaCestello6 = MAP(cestello6)(domain3);

var cestello = STRUCT([COLOR([0.5,0.5,0.5]),R([0,1])([PI/16]),mappaCestello1,mappaCestello2,mappaCestello3,mappaCestello4,mappaCestello5,mappaCestello6]);

//magnete
var cerchioM1 = circle(3,0,0,2*PI);
var cerchioM12 = circle(3.2,0.2,0,2*PI);
var cerchioM2 = circle(3.2,0.4,0,2*PI);
var cerchioM3 = circle(3.2,1.6,0,2*PI);
var cerchioM34 = circle(3.2,1.8,0,2*PI);
var cerchioM4 = circle(3,2,0,2*PI);

var curveMagnete = [[0,0,0],cerchioM1,cerchioM1,cerchioM12,cerchioM2,cerchioM2,cerchioM3,cerchioM3,cerchioM34,cerchioM4,cerchioM4,[0,0,2]];
var knotsM = nodi(curveMagnete);
var Smagnete = NUBS(S1)(2)(knotsM)(curveMagnete);
var mappaMagnete = COLOR([0.1,0.1,0.1])(MAP(Smagnete)(domain3));

var cerchioA1 = circle(3.5,0.4,0,2*PI);
var cerchioA2 = circle(3.5,1.6,0,2*PI);

var curveAnello = [[0,0,0.4],cerchioA1,cerchioA1,cerchioA2,cerchioA2,[0,0,1.6]];
var knotsA = nodi(curveAnello);
var anello = NUBS(S1)(2)(knotsA)(curveAnello);
var mappaAnello = COLOR([0.5,0.5,0.5])(MAP(anello)(domain3));

var magnete = STRUCT([mappaMagnete,mappaAnello]);

//cono
var cerchioN1 = circle(1.25,2,0,2*PI);
var cerchioN2 = circle(1.25,3.3,0,2*PI);
var cerchioN3 = circle(1.5,3.5,0,2*PI);

var curveConoNero = [cerchioN1,cerchioN2,cerchioN2,cerchioN3];
var knotsN = nodi(curveConoNero);
var conoNero = NUBS(S1)(2)(knotsN)(curveConoNero);
var mappaConoNero = COLOR([0.1,0.1,0.1])(MAP(conoNero)(domain3));

var cerchioB1 = circle(1.5,3.5,0,2*PI);
var cerchioB2 = circle(2.6,4,0,2*PI);

var curveConoBianco = [cerchioB1,cerchioB1,cerchioB2,cerchioB2];
var knotsB = nodi(curveConoBianco);
var conoBianco = NUBS(S1)(2)(knotsB)(curveConoBianco);
var mappaConoBianco = COLOR([0.9,0.9,0.9])(MAP(conoBianco)(domain3));

var cono = STRUCT([mappaConoNero,mappaConoBianco]);

//cupolino
function semisfera (r,n,m,color) {
  var domain = DOMAIN([[0,PI/2],[0,2*PI]])([n,m]);
  var sphere = function (p) {
    var a = p[0];
    var b = p[1];

    return [r * COS(a) * SIN(b), r * COS(a) * COS(b), r * SIN(a)];
  }
  var mapped = MAP(sphere)(domain);

  return COLOR(color)(mapped);
};
var cupolino = semisfera(1.3,10,20,[0.9,0.9,0.9]);

//sospensione di gomma
//toro ri raggio interno, re raggio esterno, r1 raggio del tubo, r2 raggio dal centro del toro al centro del tubo
function semiToroide (ri,re,n,m,color) {
  var r1=(re-ri)/2;
  var r2=re-r1;
  var domain = DOMAIN([[0,PI],[0,2*PI]])([n,m]);
  var toro = function (p) {
    var a = p[0];
    var b = p[1];

    return [(r2 + (r1 * COS(a))) * SIN(b),(r2 + (r1 * COS(a))) * COS(b),r1 * SIN(a)];
  }
  var mapped = MAP(toro)(domain);

  return COLOR(color)(mapped);
};
var sospensione = semiToroide(2.6,3.3,10,50,[0.1,0.1,0.1]);

var altoparlante = STRUCT([T([0,1,2])([5,2.19,15]),R([1,2])([PI/2]),cestello,magnete,cono,T([2])([3.35])(S([2])([0.5])(cupolino)),T([2])([4]),sospensione]);


//assemblo il diffusore acustico
var scmodel = STRUCT([altoparlante,pannelli,piramidi]);
/////////////////////////////////////////////
return scmodel;
})();

exports.author = 'chemako';
exports.category = 'others';
exports.scmodel = scmodel;

if (!module.parent) {
  fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
}

}(this));