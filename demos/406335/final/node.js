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
var domain1 = INTERVALS(1)(30);
var domain2 = DOMAIN([[0,1],[0,1]])([30,30]);

function translaPuntiControllo(punti,asse,valore){
  var newItem;
  var mapresult = punti.map(function(item, index, array){
    
    newItem = [item[0],item[1],item[2]];
    newItem[asse]+=valore;
    
   return newItem;
  });
return mapresult; 

}
function scalaPuntiControllo(punti,asse,valore){
  var newItem;
  var mapresult = punti.map(function(item, index, array){
    
    newItem = [item[0],item[1],item[2]];
    newItem[asse]= valore * newItem[asse];
    
   return newItem;
  });
return mapresult; 
}

//STRUTTURA VERTEBRA

//base inferiore
var controlsBaseInf = [[0,0,0],[3,0,0],[4.5,1.7,0],[5.69,3.52,0],[5.94,4.94,0],[6,7.74,0],[4.3,10.25,0],[3.31,10.51,0],[2.31,10,0],[0.2,10,0],[0,10,0]];
var nubsBaseInf = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(controlsBaseInf);
var PuntiCongiunzioneInf = [[0,0,0],[0,10,0]];
var congiunzioneInf = BEZIER(S0)(PuntiCongiunzioneInf);

var baseInferiore = BEZIER(S1)([nubsBaseInf,congiunzioneInf]);

var baseInferioreMAP = MAP(baseInferiore)(domain2);


//base superiore
var controlsBaseSup = translaPuntiControllo(controlsBaseInf,2,5);

var nubsBaseSup = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(controlsBaseSup);
var PuntiCongiunzioneSup = translaPuntiControllo(PuntiCongiunzioneInf,2,5);
var congiunzioneSup = BEZIER(S0)(PuntiCongiunzioneSup);
var baseSuperiore = BEZIER(S1)([nubsBaseSup,congiunzioneSup]);

var baseSuperioreMAP = MAP(baseSuperiore)(domain2);



//rientranza
var controlsRientranza = [[0,2,0],[3,2,0],[3.8,3.5,0],[4.69,3.52,0],[4.94,4.94,0],[5.2,7.74,0],[4.3,10.25,0],[3.31,10.51,0],[2.31,10,0],[0.2,10,0],[0,10,0]];


var cRientranza1 = translaPuntiControllo(controlsRientranza,2,1.4);
var cRientranza2 = translaPuntiControllo(controlsRientranza,2,3.8);
var nubsRientranza1 = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(cRientranza1);
var nubsRientranza2 = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(cRientranza2);


//prolungamento basi
var controlsProlungamentoInf = translaPuntiControllo(controlsBaseInf,2,1);
var controlsProlungamentoSup = translaPuntiControllo(controlsBaseInf,2,4);
var nubsProlungamentoInf = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(controlsProlungamentoInf);
var nubsProlungamentoSup = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(controlsProlungamentoSup);


//mezza vertebra
var mezzaVertebra = BEZIER(S1)([nubsBaseInf,nubsProlungamentoInf,nubsRientranza1,nubsRientranza2,nubsProlungamentoSup,nubsBaseSup]);

var mezzaVertebraMap = MAP(mezzaVertebra)(domain2);

var mezzaVertebraSX = STRUCT([mezzaVertebraMap,baseInferioreMAP,baseSuperioreMAP]);

var mezzaVertebraDX = SCALE([0])([-1])(mezzaVertebraSX);


var strutturaVertebra = COLOR([1, 0.98, 0.69])(STRUCT([mezzaVertebraSX,mezzaVertebraDX]));



//curve retro vertebra

var controlsCurvaV1 = [[0,13.53,4.5],[0,14.5,4.4],[0,20.25,-1.77],[0,20.25,-2.5],[0,19.5,-3.5],[0,16.76,-2.45],[0,14.57,0],  [0,14,2], [0,13,3.5],[0,12.5,4.7], [0,13.53,4.5]];
var nubsCurvaV1 = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(controlsCurvaV1);



var controlsCurvaV1_2 = [[0.5,13.53,4.5],[0.5,14.5,4.4],[0.5,20.25,-1.77],[0.5,20.25,-2.5],[0.5,19.5,-3.5],[0.5,16.76,-2.45],[0.5,14.57,0],  [0.5,14,2], [0.5,13,3.5],[0.5,12.5,4.7], [0.5,13.53,4.5]];
var nubsCurvaV1_2 = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(controlsCurvaV1_2);



var controlsCurvaV2 = [[1,13,4.5],[1,14.5,4.3],[1,18,0],[1,19,-1.77],[1,19.5,-3.5],[1,16.76,-2.45],[1,14.57,0],  [1,14,2], [1,13,3.5],[1,12.5,4.7], [1,13,4.5]];
var nubsCurvaV2 = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(controlsCurvaV2);




var controlsCurvaV3 = [[2,12.8,4.5],[2,14.5,4.3],[2,15.17,2.41],[2,16.03,1.08],[2,16.51,-0.64],[2,16.55,-2.41],  [2,14.57,0],[2,14,2], [2,13,3.5],  [2,12.5,4.7],[2,12.8,4.5]];
var nubsCurvaV3 = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(controlsCurvaV3);






var controlsCurvaV4 = [[3,10,5],[3,11.5,5.7],[3,15,2.41],[3,15.5,1.08],[3,16.2,-0.64],[3,16,-2.41], [3,14.57,0],[3,13,2], [3,11,3],  [3,10,3.5],[3,10,5]];
var nubsCurvaV4 = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(controlsCurvaV4);






var retroVertebra1 = BEZIER(S1)([nubsCurvaV1,nubsCurvaV1_2,nubsCurvaV2,nubsCurvaV3,nubsCurvaV3,nubsCurvaV4]);
var retroVertebraMAP1 = MAP(retroVertebra1)(domain2);




var controlsCurvaV5 = [[4,10,5],[4,11.5,5.7],[4,15,2.41],[4,15.5,1.08],[4,16.2,-0.64],[4,16,-2.41], [4,14.57,0],[4,13,2], [4,11,3],  [4,10,3.5],[4,10,5]];
var nubsCurvaV5 = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(controlsCurvaV5);



var controlsCurvaV5_2 = [[4.5,10,5],[4.5,11.5,5.7],[4.5,15,2.41],[4.5,15.5,1.08],[4.5,16.2,-0.64],[4.5,16,-2.41], [4.5,14.57,0],[4.5,13,2], [4.5,11,3],  [4.5,10,3.5],[4.5,10,5]];
var nubsCurvaV5_2 = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(controlsCurvaV5_2);



var controlsCurvaV6 = [[5,8,5],[5,11.5,5.7],[5,13,3.41],[5,13.5,2.08],[5,13.6,1.64],[5,13.88,0], [5,12.9,0],[5,12.5,1], [5,11,3],  [5,8,3.5],[5,8,5]];
var nubsCurvaV6 = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(controlsCurvaV6);



//spuntone esterno
var controlsCurvaV7 = [[6,10,5],[6,10.2,5.3],[6,11,5.5],[6,11.5,5.6],[6,12,5.5],[6,12.46,4.5], [6,12,4],[6,11,3.5], [6,10.5,4],  [6,10,4.8],[6,10,5]];
var nubsCurvaV7 = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(controlsCurvaV7);



var controlsCurvaV8 = [[7,10.99,5],[7,11.5,5.2],[7,12,5.3],[7,12.5,5.4],[7,13.02,5.3],[7,12.5,4.2], [7,12,3.8],[7,11.8,3.5], [7,11.3,4],  [7,10.8,4.4],[7,10.99,5]];
var nubsCurvaV8 = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(controlsCurvaV8);



var retroVertebra2 = BEZIER(S1)([nubsCurvaV4,nubsCurvaV5,nubsCurvaV5,nubsCurvaV5_2,nubsCurvaV6,nubsCurvaV7,nubsCurvaV8]);
var retroVertebraMAP2 = MAP(retroVertebra2)(domain2);



var controlsSpuntone1 = [[7,10.99,5],[7,11.5,5.2],[7,12,5.3],[7,12.5,5.4],[7,13.02,5.3],[7,12.5,4.2], [7,12,3.8],[7,11.8,3.5], [7,11.3,4],  [7,10.8,4.4],[7,10.99,5]];
var nubsSpuntone1 = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(controlsSpuntone1);



var controlsFakeChiusura = [[7,10.99,5],[7,10.8,4.4],[7,11.3,4],[7,11.8,3.5],[7,12,3.8],[7,12.5,4.2],[7,13.02,5.3],[7,12.5,5.4],[7,12,5.3],[7,11.5,5.2],[7,10.99,5]];
var FakeChiusura = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,6,7,7,7,7])(controlsFakeChiusura);

var controlsSporgenzaSpuntone = [[7,10.99,5],[10,12.5,4.8],[10,12.9,4.6],[7,13.02,4.5]];
var SporgenzaSpuntone = BEZIER(S0)(controlsSporgenzaSpuntone);

var spuntone = BEZIER(S1)([nubsSpuntone1,SporgenzaSpuntone,FakeChiusura]);
var spuntoneMAP = MAP(spuntone)(domain2);



var strutturaRetroVertebraSX = STRUCT([retroVertebraMAP1,retroVertebraMAP2,spuntoneMAP]);


var strutturaRetroVertebraDX = SCALE([0])([-1])(strutturaRetroVertebraSX);

var strutturaRetroVertebra = COLOR([1, 0.98, 0.69])(STRUCT([strutturaRetroVertebraSX,strutturaRetroVertebraDX]));



var vertebra = STRUCT([strutturaVertebra,strutturaRetroVertebra])

var vertebra11 = T([1,2])([1,6])(vertebra);
var vertebra10 = T([1,2])([2.5,12])(vertebra);
var vertebra9 = T([1,2])([4,18])(vertebra);
var vertebra8 = T([1,2])([5.5,24])(vertebra);
var vertebra7 = T([1,2])([6.9,30])(vertebra);
var vertebra6 = T([1,2])([7,36])(vertebra);
var vertebra5 = T([1,2])([6.9,42])(vertebra);
var vertebra4 = T([1,2])([6.2,48])(vertebra);
var vertebra3 = T([1,2])([5.5,54])(vertebra);
var vertebra2 = T([1,2])([4.8,60])(vertebra);
var vertebra1 = T([1,2])([4.1,66])(vertebra);


var vertebre = STRUCT([vertebra,vertebra11,vertebra10,vertebra9,vertebra8,vertebra7,vertebra6,vertebra5,vertebra4,vertebra3,vertebra2,vertebra1]);


// COSTOLE

//costola 12

var controlsC12_1 = [[6,9.5,3],[6,10,3],[6,10,4.8],[6,9.5,5],[6,9,4.8],[6,9,3], [6,9.5,3]];
var nubsC12_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC12_1);

var controlsC12_2 = [[13,11.5,0],[13,12,0],[13,12,1.8],[13,11.5,2],[13,11,1.8],[13,11,0], [13,11.5,0]];
var nubsC12_2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC12_2);


var controlsC12_E = [[20,6.5,-5],[20,7,-5],[20,7,-4.2],[20,6.5,-4],[20,6,-4.2],[20,6,-5], [20,6.5,-5]];
var nubsC12_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC12_E);


var controlsC12_E2 = [[24,2,-7.4],[24.2,2,-7.4],[24.2,2,-6.7],[24,2,-6.6],[23.8,2,-6.7],[23.8,2,-7.4], [24,2,-7.4]];
var nubsC12_E2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC12_E2);


var costola12 = BEZIER(S1)([nubsC12_1,nubsC12_2,nubsC12_E,nubsC12_E,nubsC12_E,nubsC12_E2]);
var costola12MAP = MAP(costola12)(domain2);









//costola 11
var controlsC11_1 = [[6,10.5,9],[6,11,9],[6,11,10.8],[6,10.5,11],[6,10,10.8],[6,10,9], [6,10.5,9]];
var nubsC11_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC11_1);

var controlsC11_2 = [[12,11.5,9],[12.2,12,9],[12.2,12,10.8],[12,11.5,11],[11.8,11,10.8],[11.8,11,9], [12,11.5,9]];
var nubsC11_2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC11_2);


var controlsC11_3 = [[28,8,9],[28.5,8.5,9],[28.5,8.5,10.8],[28,8,11],[27.5,7.5,10.8],[27.5,7.5,9],[28,8,9]];
var nubsC11_3 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC11_3);


var controlsC11_E = [[26,-8,2],[26.5,-8.5,2],[26.5,-8.5,3.8],[26,-8,4],[25.5,-7.5,3.8],[25.5,-7.5,2], [26,-8,2]];
var nubsC11_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC11_E);



var costola11 = BEZIER(S1)([nubsC11_1,nubsC11_2,nubsC11_3,nubsC11_E]);



var controlsChiusuraCostola11_E =  [[26,-8,2],[26,-8.5,2],[26,-8.5,3.8],[26,-8,4],[26,-8.5,3.8],[26,-8.5,2], [26,-8,2]];
var nubsChiusuraCostola11_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola11_E);

var chiusuraCostola11 = BEZIER(S1)([nubsC11_E,nubsChiusuraCostola11_E]);





var costola11MAP = STRUCT([MAP(costola11)(domain2),MAP(chiusuraCostola11 )(domain2)]);


//costola 10
var controlsC10_1 = [[6,12,15],[6,12.5,15],[6,12.5,16.8],[6,12,17],[6,11.5,16.8],[6,11.5,15], [6,12,15]];
var nubsC10_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC10_1);

var controlsC10_2 = [[12,13,15],[12.2,13.5,15],[12.2,13.5,16.8],[12,13,17],[11.8,12.5,16.8],[11.8,12.5,15], [12,13,15]];
var nubsC10_2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC10_2);

var controlsC10_3 = [[28,8,15],[28.5,8.5,15],[28.5,8.5,16.8],[28,8,17],[27.5,7.5,16.8],[27.5,7.5,15],[28,8,15]];
var nubsC10_3 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC10_3);

var controlsC10_4 = [[30,-8,8],[30.5,-8.5,8],[30.5,-8.5,9.8],[30,-8,10],[29.5,-7.5,9.8],[29.5,-7.5,8], [30,-8,8]];
var nubsC10_4 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC10_4);

var controlsC10_E = [[23,-15,4],[23,-15.5,4],[23,-15.5,5.8],[23,-15,6],[23,-14.5,5.8],[23,-14.5,4], [23,-15,4]];
var nubsC10_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC10_E);


var costola10 = BEZIER(S1)([nubsC10_1,nubsC10_2,nubsC10_3,nubsC10_4,nubsC10_E]);

var controlsChiusuraCostola10_1_1 = [[23,-15,4],[23,-15.5,4],[23,-15.5,5.8],[23,-15,6],[23,-15.5,5.8],[23,-15.5,4], [23,-15,4]];
var nubsChiusuraCostola10_1_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola10_1_1);

var controlsChiusuraCostola10_E = [[23,-15,4],[22.8,-15,4],[22.8,-15,5.8],[23,-15,6],[22.8,-15,5.8],[22.8,-15,4], [23,-15,4]];
var nubsChiusuraCostola10_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola10_E);


var controlsChiusuraCostola10_2_1 = [[23,-15,4],[23,-14.5,4],[23,-14.5,5.8],[23,-15,6],[23,-14.5,5.8],[23,-14.5,4], [23,-15,4]];
var nubsChiusuraCostola10_2_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola10_2_1);

var chiusuraCostola10_1 = BEZIER(S1)([nubsChiusuraCostola10_1_1,nubsChiusuraCostola10_E]);
var chiusuraCostola10_2 = BEZIER(S1)([nubsChiusuraCostola10_2_1,nubsChiusuraCostola10_E]);



var costola10MAP = STRUCT([MAP(costola10)(domain2),MAP(chiusuraCostola10_1)(domain2),MAP(chiusuraCostola10_2)(domain2)]);






//costola 9
var controlsC9_1 = [[6,13.5,21],[6,14,21],[6,14,22.8],[6,13.5,23],[6,13,22.8],[6,13,21], [6,13.5,21]];
var nubsC9_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC9_1);

var controlsC9_2 = [[12,14.5,21],[12.2,15,21],[12.2,15,22.8],[12,14.5,23],[11.8,14,22.8],[11.8,14,21], [12,14.5,21]];
var nubsC9_2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC9_2);

var controlsC9_3 = [[28,8,19],[28.5,8.5,19],[28.5,8.5,20.8],[28,8,21],[27.5,7.5,20.8],[27.5,7.5,19],[28,8,19]];
var nubsC9_3 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC9_3);

var controlsC9_4 = [[30,-8,13],[30.5,-8.5,13],[30.5,-8.5,14.8],[30,-8,15],[29.5,-7.5,14.8],[29.5,-7.5,13], [30,-8,13]];
var nubsC9_4 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC9_4);

var controlsC9_E = [[23,-17,8],[23,-17.5,8],[23,-17.5,9.8],[23,-17,10],[23,-16.5,9.8],[23,-16.5,8], [23,-17,8]];
var nubsC9_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC9_E);



var costola9 = BEZIER(S1)([nubsC9_1,nubsC9_2,nubsC9_3,nubsC9_4,nubsC9_E]);


var controlsChiusuraCostola9_1_1 = [[23,-17,8],[23,-17.5,8],[23,-17.5,9.8],[23,-17,10],[23,-17.5,9.8],[23,-17.5,8], [23,-17,8]];
var nubsChiusuraCostola9_1_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola9_1_1);

var controlsChiusuraCostola9_E = [[23,-17,8],[22.8,-17,8],[22.8,-17,9.8],[23,-17,10],[22.8,-17,9.8],[22.8,-17,8], [23,-17,8]];
var nubsChiusuraCostola9_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola9_E);


var controlsChiusuraCostola9_2_1 = [[23,-17,8],[23,-16.5,8],[23,-16.5,9.8],[23,-17,10],[23,-16.5,9.8],[23,-16.5,8], [23,-17,8]];
var nubsChiusuraCostola9_2_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola9_2_1);

var chiusuraCostola9_1 = BEZIER(S1)([nubsChiusuraCostola9_1_1,nubsChiusuraCostola9_E]);
var chiusuraCostola9_2 = BEZIER(S1)([nubsChiusuraCostola9_2_1,nubsChiusuraCostola9_E]);

var costola9MAP = STRUCT([MAP(costola9)(domain2),MAP(chiusuraCostola9_1)(domain2),MAP(chiusuraCostola9_2)(domain2)]);




//costola 8
var controlsC8_1 = [[6,15,27],[6,15.5,27],[6,15.5,28.8],[6,15,29],[6,14.5,28.8],[6,14.5,27], [6,15,27]];
var nubsC8_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC8_1);

var controlsC8_2 = [[12,16,27],[12.2,16.5,27],[12.2,16.5,28.8],[12,16,29],[11.8,15.5,28.8],[11.8,15.5,27], [12,16,27]];
var nubsC8_2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC8_2);

var controlsC8_3 = [[28,8,25],[28.5,8.5,25],[28.5,8.5,26.8],[28,8,27],[27.5,7.5,26.8],[27.5,7.5,25],[28,8,25]];
var nubsC8_3 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC8_3);

var controlsC8_4 = [[30,-13,17],[30.5,-13.5,17],[30.5,-13.5,18.8],[30,-13,19],[29.5,-12.5,18.8],[29.5,-12.5,17], [30,-13,17]];
var nubsC8_4 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC8_4);

var controlsC8_E = [[20,-19,13],[20,-19.5,13],[20,-19.5,14.8],[20,-19,15],[20,-18.5,14.8],[20,-18.5,13], [20,-19,13]];
var nubsC8_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC8_E);



var costola8 = BEZIER(S1)([nubsC8_1,nubsC8_2,nubsC8_3,nubsC8_4,nubsC8_E]);



var controlsChiusuraCostola8_1_1 = [[20,-19,13],[20,-19.5,13],[20,-19.5,14.8],[20,-19,15],[20,-19.5,14.8],[20,-19.5,13], [20,-19,13]];
var nubsChiusuraCostola8_1_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola8_1_1);

var controlsChiusuraCostola8_E = [[20,-19,13],[19.8,-19,13],[19.8,-19,14.8],[20,-19,15],[19.8,-19,14.8],[19.8,-19,13], [20,-19,13]];
var nubsChiusuraCostola8_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola8_E);


var controlsChiusuraCostola8_2_1 = [[20,-19,13],[20,-18.5,13],[20,-18.5,14.8],[20,-19,15],[20,-18.5,14.8],[20,-18.5,13], [20,-19,13]];
var nubsChiusuraCostola8_2_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola8_2_1);

var chiusuraCostola8_1 = BEZIER(S1)([nubsChiusuraCostola8_1_1,nubsChiusuraCostola8_E]);
var chiusuraCostola8_2 = BEZIER(S1)([nubsChiusuraCostola8_2_1,nubsChiusuraCostola8_E]);

var costola8MAP = STRUCT([MAP(costola8)(domain2),MAP(chiusuraCostola8_1)(domain2),MAP(chiusuraCostola8_2)(domain2)]);


//costola 7
var controlsC7_1 = [[6,16.4,33],[6,16.9,33],[6,16.9,34.8],[6,16.4,35],[6,15.9,34.8],[6,15.9,33], [6,16.4,33]];
var nubsC7_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC7_1);

var controlsC7_2 = [[12,17.4,33],[12.2,17.9,33],[12.2,17.9,34.8],[12,17.4,35],[11.8,16.9,34.8],[11.8,16.9,33], [12,17.4,33]];
var nubsC7_2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC7_2);

var controlsC7_3 = [[28,8,31],[28.5,8.5,31],[28.5,8.5,32.8],[28,8,33],[27.5,7.5,32.8],[27.5,7.5,31],[28,8,31]];
var nubsC7_3 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC7_3);

var controlsC7_4 = [[30,-13,23],[30.5,-13.5,23],[30.5,-13.5,24.8],[30,-13,25],[29.5,-12.5,24.8],[29.5,-12.5,23], [30,-13,23]];
var nubsC7_4 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC7_4);

var controlsC7_E = [[18,-20,18],[18,-20.5,18],[18,-20.5,19.8],[18,-20,20],[18,-19.5,19.8],[18,-19.5,18], [18,-20,18]];
var nubsC7_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC7_E);



var costola7 = BEZIER(S1)([nubsC7_1,nubsC7_2,nubsC7_3,nubsC7_4,nubsC7_E]);

var controlsChiusuraCostola7_1_1 = [[18,-20,18],[18,-20.5,18],[18,-20.5,19.8],[18,-20,20],[18,-20.5,19.8],[18,-20.5,18], [18,-20,18]];
var nubsChiusuraCostola7_1_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola7_1_1);

var controlsChiusuraCostola7_E = [[18,-20,18],[17.8,-20,18],[17.8,-20,19.8],[18,-20,20],[17.8,-20,19.8],[17.8,-20,18], [18,-20,18]];
var nubsChiusuraCostola7_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola7_E);


var controlsChiusuraCostola7_2_1 = [[18,-20,18],[18,-19.5,18],[18,-19.5,19.8],[18,-20,20],[18,-19.5,19.8],[18,-19.5,18], [18,-20,18]];
var nubsChiusuraCostola7_2_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola7_2_1);

var chiusuraCostola7_1 = BEZIER(S1)([nubsChiusuraCostola7_1_1,nubsChiusuraCostola7_E]);
var chiusuraCostola7_2 = BEZIER(S1)([nubsChiusuraCostola7_2_1,nubsChiusuraCostola7_E]);

var costola7MAP = STRUCT([MAP(costola7)(domain2),MAP(chiusuraCostola7_1)(domain2),MAP(chiusuraCostola7_2)(domain2)]);


//costola 6
var controlsC6_1 = [[6,16.5,39],[6,17,39],[6,17,40.8],[6,16.5,41],[6,16,40.8],[6,16,39], [6,16.5,39]];
var nubsC6_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC6_1);

var controlsC6_2 = [[12,17.5,39],[12.2,18,39],[12.2,18,40.8],[12,17.5,41],[11.8,17,40.8],[11.8,17,39], [12,17.5,39]];
var nubsC6_2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC6_2);

var controlsC6_3 = [[28,8,37],[28.5,8.5,37],[28.5,8.5,38.8],[28,8,39],[27.5,7.5,38.8],[27.5,7.5,37],[28,8,37]];
var nubsC6_3 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC6_3);

var controlsC6_4 = [[30,-13,29],[30.5,-13.5,29],[30.5,-13.5,30.8],[30,-13,31],[29.5,-12.5,30.8],[29.5,-12.5,29], [30,-13,29]];
var nubsC6_4 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC6_4);


var controlsC6_E = [[16,-20,24],[16,-20.5,24],[16,-20.5,25.8],[16,-20,26],[16,-19.5,25.8],[16,-19.5,24], [16,-20,24]];
var nubsC6_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC6_E);



var costola6 = BEZIER(S1)([nubsC6_1,nubsC6_2,nubsC6_3,nubsC6_4,nubsC6_E]);


var controlsChiusuraCostola6_1_1 = [[16,-20,24],[16,-20.5,24],[16,-20.5,25.8],[16,-20,26],[16,-20.5,25.8],[16,-20.5,24], [16,-20,24]];
var nubsChiusuraCostola6_1_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola6_1_1);

var controlsChiusuraCostola6_E = [[16,-20,24],[15.8,-20,24],[15.8,-20,25.8],[16,-20,26],[15.8,-20,25.8],[15.8,-20,24], [16,-20,24]];
var nubsChiusuraCostola6_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola6_E);


var controlsChiusuraCostola6_2_1 = [[16,-20,24],[16,-19.5,24],[16,-19.5,25.8],[16,-20,26],[16,-19.5,25.8],[16,-19.5,24], [16,-20,24]];
var nubsChiusuraCostola6_2_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola6_2_1);

var chiusuraCostola6_1 = BEZIER(S1)([nubsChiusuraCostola6_1_1,nubsChiusuraCostola6_E]);
var chiusuraCostola6_2 = BEZIER(S1)([nubsChiusuraCostola6_2_1,nubsChiusuraCostola6_E]);

var costola6MAP = STRUCT([MAP(costola6)(domain2),MAP(chiusuraCostola6_1)(domain2),MAP(chiusuraCostola6_2)(domain2)]);


//costola 5
var controlsC5_1 = [[6,16.4,45],[6,16.9,45],[6,16.9,46.8],[6,16.4,47],[6,15.9,46.8],[6,15.9,45], [6,16.4,45]];
var nubsC5_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC5_1);

var controlsC5_2 = [[12,17.4,45],[12.2,17.9,45],[12.2,17.9,46.8],[12,17.4,47],[11.8,16.9,46.8],[11.8,16.9,45], [12,17.4,45]];
var nubsC5_2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC5_2);

var controlsC5_3 = [[28,8,43],[28.5,8.5,43],[28.5,8.5,44.8],[28,8,45],[27.5,7.5,44.8],[27.5,7.5,43],[28,8,43]];
var nubsC5_3 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC5_3);

var controlsC5_4 = [[30,-13,35],[30.5,-13.5,35],[30.5,-13.5,36.8],[30,-13,37],[29.5,-12.5,36.8],[29.5,-12.5,35], [30,-13,35]];
var nubsC5_4 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC5_4);

var controlsC5_E = [[14,-19,31],[14,-19.5,31],[14,-19.5,32.8],[14,-19,33],[14,-18.5,32.8],[14,-18.5,31], [14,-19,31]];
var nubsC5_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC5_E);



var costola5 = BEZIER(S1)([nubsC5_1,nubsC5_2,nubsC5_3,nubsC5_4,nubsC5_E]);


//CONTROLLARE DA QUI

var controlsChiusuraCostola5_1_1 = [[14,-19,31],[14,-19.5,31],[14,-19.5,32.8],[14,-19,33],[14,-19.5,32.8],[14,-19.5,31], [14,-19,31]];
var nubsChiusuraCostola5_1_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola5_1_1);

var controlsChiusuraCostola5_E = [[14,-19,31],[13.8,-19,31],[13.8,-19,32.8],[14,-19,33],[13.8,-19,32.8],[13.8,-19,31], [14,-19,31]];
var nubsChiusuraCostola5_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola5_E);


var controlsChiusuraCostola5_2_1 = [[14,-19,31],[14,-18.5,31],[14,-18.5,32.8],[14,-19,33],[14,-18.5,32.8],[14,-18.5,31], [14,-19,31]];
var nubsChiusuraCostola5_2_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola5_2_1);

var chiusuraCostola5_1 = BEZIER(S1)([nubsChiusuraCostola5_1_1,nubsChiusuraCostola5_E]);
var chiusuraCostola5_2 = BEZIER(S1)([nubsChiusuraCostola5_2_1,nubsChiusuraCostola5_E]);

var costola5MAP = STRUCT([MAP(costola5)(domain2),MAP(chiusuraCostola5_1)(domain2),MAP(chiusuraCostola5_2)(domain2)]);



//costola 4
var controlsC4_1 = [[6,15.7,51],[6,16.2,51],[6,16.2,52.8],[6,15.7,53],[6,15.2,52.8],[6,15.2,51], [6,15.7,51]];
var nubsC4_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC4_1);

var controlsC4_2 = [[12,16.7,51],[12.2,17.2,51],[12.2,17.2,52.8],[12,16.7,53],[11.8,16.2,52.8],[11.8,16.2,51], [12,16.7,51]];
var nubsC4_2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC4_2);

var controlsC4_3 = [[26,8,49],[26.5,8.5,49],[26.5,8.5,50.8],[26,8,51],[26.5,7.5,50.8],[26.5,7.5,49],[26,8,49]];
var nubsC4_3 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC4_3);

var controlsC4_4 = [[28,-13,41],[28.5,-13.5,41],[28.5,-13.5,42.8],[28,-13,43],[27.5,-12.5,42.8],[27.5,-12.5,41], [28,-13,41]];
var nubsC4_4 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC4_4);


var controlsC4_E = [[12,-17,39],[12,-17.5,39],[12,-17.5,40.8],[12,-17,41],[12,-16.5,40.8],[12,-16.5,39], [12,-17,39]];
var nubsC4_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC4_E);



var costola4 = BEZIER(S1)([nubsC4_1,nubsC4_2,nubsC4_3,nubsC4_4,nubsC4_E]);



var controlsChiusuraCostola4_1_1 = [[12,-17,39],[12,-17.5,39],[12,-17.5,40.8],[12,-17,41],[12,-17.5,40.8],[12,-17.5,39], [12,-17,39]];
var nubsChiusuraCostola4_1_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola4_1_1);

var controlsChiusuraCostola4_E = [[12,-17,39],[11.8,-17,39],[11.8,-17,40.8],[12,-17,41],[11.8,-17,40.8],[11.8,-17,39], [12,-17,39]];
var nubsChiusuraCostola4_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola4_E);


var controlsChiusuraCostola4_2_1 = [[12,-17,39],[12,-16.5,39],[12,-16.5,40.8],[12,-17,41],[12,-16.5,40.8],[12,-16.5,39], [12,-17,39]];
var nubsChiusuraCostola4_2_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola4_2_1);

var chiusuraCostola4_1 = BEZIER(S1)([nubsChiusuraCostola4_1_1,nubsChiusuraCostola4_E]);
var chiusuraCostola4_2 = BEZIER(S1)([nubsChiusuraCostola4_2_1,nubsChiusuraCostola4_E]);

var costola4MAP = STRUCT([MAP(costola4)(domain2),MAP(chiusuraCostola4_1)(domain2),MAP(chiusuraCostola4_2)(domain2)]);



//costola 3
var controlsC3_1 = [[6,15,57],[6,15.5,57],[6,15.5,58.8],[6,15,59],[6,14.5,58.8],[6,14.5,57], [6,15,57]];
var nubsC3_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC3_1);

var controlsC3_2 = [[12,15.3,57],[12.2,15.8,57],[12.2,15.8,58.8],[12,15.3,59],[11.8,14.8,58.8],[11.8,14.8,57], [12,15.3,57]];
var nubsC3_2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC3_2);

var controlsC3_3 = [[23,8,55],[23.5,8.5,55],[23.5,8.5,56.8],[23,8,57],[22.5,7.5,56.8],[22.5,7.5,55],[22,8,55]];
var nubsC3_3 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC3_3);

var controlsC3_4 = [[25,-13,47],[25.5,-13.5,47],[25.5,-13.5,48.8],[25,-13,49],[24.5,-12.5,48.8],[24.5,-12.5,47], [25,-13,47]];
var nubsC3_4 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC3_4);


var controlsC3_E = [[10,-15,45],[10,-15.5,45],[10,-15.5,46.8],[10,-15,47],[10,-14.5,46.8],[10,-14.5,45], [10,-15,45]];
var nubsC3_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC3_E);



var costola3 = BEZIER(S1)([nubsC3_1,nubsC3_2,nubsC3_3,nubsC3_4,nubsC3_E]);


var controlsChiusuraCostola3_1_1 = [[10,-15,45],[10,-15.5,45],[10,-15.5,46.8],[10,-15,47],[10,-15.5,46.8],[10,-15.5,45], [10,-15,45]];
var nubsChiusuraCostola3_1_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola3_1_1);

var controlsChiusuraCostola3_E = [[10,-15,45],[9.8,-15,45],[9.8,-15,46.8],[10,-15,47],[9.8,-15,46.8],[9.8,-15,45], [10,-15,45]];
var nubsChiusuraCostola3_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola3_E);


var controlsChiusuraCostola3_2_1 = [[10,-15,45],[10,-14.5,45],[10,-14.5,46.8],[10,-15,47],[10,-14.5,46.8],[10,-14.5,45], [10,-15,45]];
var nubsChiusuraCostola3_2_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola3_2_1);

var chiusuraCostola3_1 = BEZIER(S1)([nubsChiusuraCostola3_1_1,nubsChiusuraCostola3_E]);
var chiusuraCostola3_2 = BEZIER(S1)([nubsChiusuraCostola3_2_1,nubsChiusuraCostola3_E]);

var costola3MAP = STRUCT([MAP(costola3)(domain2),MAP(chiusuraCostola3_1)(domain2),MAP(chiusuraCostola3_2)(domain2)]);

//costola 2
var controlsC2_1 = [[6,14.3,63],[6,14.8,63],[6,14.8,64.8],[6,14.3,65],[6,13.8,64.8],[6,13.8,63], [6,14.3,63]];
var nubsC2_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC2_1);

var controlsC2_2 = [[12,14.6,63],[12.2,15.1,63],[12.2,15.1,64.8],[12,14.6,65],[11.8,14.1,64.8],[11.8,14.1,63], [12,14.6,63]];
var nubsC2_2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC2_2);

var controlsC2_3 = [[20,8,61],[20.5,8.5,61],[20.5,8.5,62.8],[20,8,63],[19.5,7.5,62.8],[19.5,7.5,61],[20,8,61]];
var nubsC2_3 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC2_3);

var controlsC2_4 = [[22,-13,53],[22.5,-13.5,53],[22.5,-13.5,54.8],[22,-13,55],[21.5,-12.5,54.8],[21.5,-12.5,53], [22,-13,53]];
var nubsC2_4 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC2_4);


var controlsC2_E = [[9,-13,52],[9,-13.5,52],[9,-13.5,53.8],[9,-13,54],[9,-12.5,53.8],[9,-12.5,52], [9,-13,52]];
var nubsC2_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC2_E);



var costola2 = BEZIER(S1)([nubsC2_1,nubsC2_2,nubsC2_3,nubsC2_4,nubsC2_E]);

var controlsChiusuraCostola2_1_1 = [[9,-13,52],[9,-13.5,52],[9,-13.5,53.8],[9,-13,54],[9,-13.5,53.8],[9,-13.5,52], [9,-13,52]];
var nubsChiusuraCostola2_1_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola2_1_1);

var controlsChiusuraCostola2_E = [[9,-13,52],[8.8,-13,52],[8.8,-13,53.8],[9,-13,54],[8.8,-13,53.8],[8.8,-13,52], [9,-13,52]];
var nubsChiusuraCostola2_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola2_E);


var controlsChiusuraCostola2_2_1 = [[9,-13,52],[9,-12.5,52],[9,-12.5,53.8],[9,-13,54],[9,-12.5,53.8],[9,-12.5,52], [9,-13,52]];
var nubsChiusuraCostola2_2_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola2_2_1);

var chiusuraCostola2_1 = BEZIER(S1)([nubsChiusuraCostola2_1_1,nubsChiusuraCostola2_E]);
var chiusuraCostola2_2 = BEZIER(S1)([nubsChiusuraCostola2_2_1,nubsChiusuraCostola2_E]);

var costola2MAP = STRUCT([MAP(costola2)(domain2),MAP(chiusuraCostola2_1)(domain2),MAP(chiusuraCostola2_2)(domain2)]);


//costola 1
var controlsC1_1 = [[6,12.9,69],[6,14.1,69],[6,14.1,70.8],[6,13.6,71],[6,13.1,70.8],[6,13.1,69], [6,12.9,69]];
var nubsC1_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC1_1);

var controlsC1_2 = [[12,13.9,69],[12.2,14.4,69],[12.2,14.4,70.8],[12,13.9,71],[11.8,13.4,70.8],[11.8,13.4,69], [12,13.9,69]];
var nubsC1_2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC1_2);

var controlsC1_3 = [[16,8,67],[16.5,8.5,67],[16.5,8.5,68.8],[16,8,69],[15.5,7.5,68.8],[15.5,7.5,67],[16,8,67]];
var nubsC1_3 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC1_3);

var controlsC1_4 = [[20,-11,59],[20.5,-11.5,59],[20.5,-11.5,60.8],[20,-11,61],[19.5,-10.5,60.8],[19.5,-10.5,59], [20,-11,59]];
var nubsC1_4 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC1_4);


var controlsC1_E = [[10,-12,59],[10,-12.5,59],[10,-12.5,60.8],[10,-12,61],[10,-11.5,60.8],[10,-11.5,59], [10,-12,59]];
var nubsC1_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsC1_E);

var costola1 = BEZIER(S1)([nubsC1_1,nubsC1_2,nubsC1_3,nubsC1_4,nubsC1_E]);


var controlsChiusuraCostola1_E = [[10,-12,59],[9.8,-12,59],[9.8,-12,60.8],[10,-12,61],[9.8,-12,60.8],[9.8,-12,59], [10,-12,59]];
var nubsChiusuraCostola1_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraCostola1_E);

var chiusuraCostola1 = BEZIER(S1)([nubsC1_E,nubsChiusuraCostola1_E]);




var costola1MAP = STRUCT([MAP(costola1)(domain2),MAP(chiusuraCostola1)(domain2)]);


var costoleSX = STRUCT([costola1MAP,costola2MAP,costola3MAP,costola4MAP,costola5MAP,costola6MAP,costola7MAP,costola8MAP,costola9MAP,costola10MAP,costola11MAP,costola12MAP]);

var costoleDX = SCALE([0])([-1])(costoleSX);


var costole = COLOR([1, 0.98, 0.69])(STRUCT([costoleSX,costoleDX]));





//STERNO

var controlsS_1 = [[0,-12.5,51],[0,-12.5,51],[2.6,-12.5,51],[2.6,-12,51],[2.6,-11.5,51],[0,-11.5,51],[0,-11.5,51]];
var nubsS_1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsS_1);


var controlsS_2 = [[0,-12.5,49],[0,-12.5,49],[3.5,-12.5,49],[3.5,-12,49],[3.5,-11.5,49],[0,-11.5,49],[0,-11.5,49]];
var nubsS_2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsS_2);



var controlsS_3 = [[0,-12.5,39],[0,-12.5,39],[4,-12.5,39],[4,-12,39],[4,-11.5,39],[0,-11.5,39],[0,-11.5,39]];
var nubsS_3 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsS_3);


var controlsS_4 = [[0,-12.5,28],[0,-12.5,28],[4,-12.5,28],[4,-12,28],[4,-11.5,28],[0,-11.5,28],[0,-11.5,28]];
var nubsS_4 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsS_4);


var controlsS_5 = [[0,-10.3,21.8],[0,-10.3,21.8],[2.6,-10.3,21.8],[2.6,-10,22],[2.6,-9.7,22.2],[0,-9.7,22.2],[0,-9.7,22.2]];
var nubsS_5 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsS_5);






var mezzoSternoSX = BEZIER(S1)([nubsS_1,nubsS_1,nubsS_2,nubsS_3,nubsS_4,nubsS_4,nubsS_5]);
var mezzoSternoSXMAP = MAP(mezzoSternoSX)(domain2);



var mezzoSternoDXMAP = SCALE([0])([-1])(mezzoSternoSXMAP);

var Controls_chiusuraSopraSterno2 = [[0,-12.5,51],[0,-12.5,51],[1.6,-12.5,51.15],[1.7,-12,51.2],[1.6,-11.5,51.15],[0,-11.5,51],[0,-11.5,51]];
var nubs_chiusuraSopraSterno2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(Controls_chiusuraSopraSterno2);

var Controls_chiusuraSopraSternoE = [[0,-12.5,51],[0,-12.5,51],[0,-12.5,51.1],[0,-12,51.3],[0,-11.5,51.1],[0,-11.5,51],[0,-11.5,51]];
var nubs_chiusuraSopraSternoE = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(Controls_chiusuraSopraSternoE);



var chiusuraSternoSopraSX = BEZIER(S1)([nubsS_1,nubs_chiusuraSopraSterno2,nubs_chiusuraSopraSternoE]);

var chiusuraSternoSopraSXMap = MAP(chiusuraSternoSopraSX)(domain2);

var chiusuraSternoSopraDXMap = SCALE([0])([-1])(chiusuraSternoSopraSXMap);



//chiusura sotto sterno

var controls_chiusuraSottoSterno1 = [[0,-10.3,21.8],[0,-10.3,21.8],[2.6,-10.3,21.8],[2.6,-10,22],[2.6,-9.7,22.2],[0,-9.7,22.2],[0,-9.7,22.2]];
var nubsS_chiusuraSottoSterno1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controls_chiusuraSottoSterno1);

var controls_chiusuraSottoSterno2 = [[0,-10.1,21.3],[0,-10.1,21.3],[2.6,-10.1,21.3],[2.6,-9.8,21.5],[2.6,-9.5,21.7],[0,-9.5,21.7],[0,-9.5,21.7]];
var nubsS_chiusuraSottoSterno2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controls_chiusuraSottoSterno2);

var controls_chiusuraSottoSterno3 = [[0,-9.8,20.8],[0,-9.8,20.8],[1,-9.8,20.8],[1,-9.5,21],[1,-9.2,21.2],[0,-9.2,21.2],[0,-9.2,21.2]];
var nubsS_chiusuraSottoSterno3 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controls_chiusuraSottoSterno3);

var controls_chiusuraSottoSterno4 = [[0,-9.8,20.8],[0,-9.8,20.8],[1,-8.3,17.8],[1,-8,18],[0,-7.7,18.2],[0,-9.2,21.2],[0,-9.2,21.2]];
var nubsS_chiusuraSottoSterno4 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controls_chiusuraSottoSterno4);

var controls_chiusuraSottoSternoE = [[0,-9.8,20.8],[0,-9.8,20.8],[0,-8.3,17.8],[0,-8,18],[0,-7.7,18.2],[0,-9.2,21.2],[0,-9.2,21.2]];
var nubsS_chiusuraSottoSternoE = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controls_chiusuraSottoSternoE);

var chiusuraSternoSottoSX = BEZIER(S1)([nubsS_chiusuraSottoSterno1,nubsS_chiusuraSottoSterno2,nubsS_chiusuraSottoSterno3,nubsS_chiusuraSottoSterno3,nubsS_chiusuraSottoSterno3,nubsS_chiusuraSottoSterno4,nubsS_chiusuraSottoSternoE]);

var chiusuraSternoSottoSXMap = MAP(chiusuraSternoSottoSX)(domain2);

var chiusuraSternoSottoDXMap = SCALE([0])([-1])(chiusuraSternoSottoSXMap);

var sterno = STRUCT([mezzoSternoSXMAP,mezzoSternoDXMAP,chiusuraSternoSopraSXMap,chiusuraSternoSopraDXMap,chiusuraSternoSottoSXMap,chiusuraSternoSottoDXMap]);


//MANUBRIO
var controlsManubrio1 = [[0,-12.5,51.1],[0,-12.5,51.1],[2.6,-12.5,51.1],[2.6,-12,51.1],[2.6,-11.5,51.1],[0,-11.5,51.1],[0,-11.5,51.1]];
var nubsManubrio1 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsManubrio1);

var controlsManubrio2 = [[0,-12.5,52.1],[0,-12.5,52.1],[3.6,-12.5,52.1],[3.6,-12,52.1],[3.6,-11.5,52.1],[0,-11.5,52.1],[0,-11.5,52.1]];
var nubsManubrio2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsManubrio2);

var controlsManubrio3 = [[0,-12.5,57.1],[0,-12.5,56.1],[3.6,-12.5,56.1],[3.6,-12,56.1],[3.6,-11.5,56.1],[0,-11.5,56.1],[0,-11.5,56.1]];
var nubsManubrio3 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsManubrio3);

var controlsManubrio4 = [[0,-12.5,56.6],[0,-12.5,56.6],[2.2,-12.5,56.6],[2.2,-12,56.6],[2.2,-11.5,56.6],[0,-11.5,56.6],[0,-11.5,56.6]];
var nubsManubrio4 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsManubrio4);

var controlsManubrio5 = [[0,-12.5,57.1],[0,-12.5,57.1],[2.2,-12.5,57.1],[2.2,-12,57.1],[2.2,-11.5,57.1],[0,-11.5,57.1],[0,-11.5,57.1]];
var nubsManubrio5 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsManubrio5);

var mezzoManubrioSX = BEZIER(S1)([nubsManubrio1,nubsManubrio2,nubsManubrio2,nubsManubrio2,nubsManubrio2,nubsManubrio3,nubsManubrio3,nubsManubrio3,nubsManubrio3,nubsManubrio4,nubsManubrio4,nubsManubrio5]);

var mezzoManubrioSXMap = MAP(mezzoManubrioSX)(domain2);

//l'inizio della chiusura è uguale alla fine del manubrio
var controlsChiusuraManubrioSX_2 = [[0,-12.5,57.1],[0,-12.5,57.1],[2.2,-12.5,58],[2.2,-12,58.1],[2.2,-11.5,58],[0,-11.5,57.1],[0,-11.5,57.1]];
var nubsChiusuraManubrioSX_2 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraManubrioSX_2);

var controlsChiusuraManubrioSX_3 = [[0,-12.5,57.1],[0,-12.5,57.1],[1.6,-12.5,57.8],[1.7,-12,57.9],[1.6,-11.5,57.8],[0,-11.5,57.1],[0,-11.5,57.1]];
var nubsChiusuraManubrioSX_3 = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraManubrioSX_3);

var controlsChiusuraManubrioSX_E = [[0,-12.5,57.1],[0,-12.5,57.1],[0,-12.5,57.7],[0,-12,57.8],[0,-11.5,57.7],[0,-11.5,57.1],[0,-11.5,57.1]];
var nubsChiusuraManubrioSX_E = NUBS(S0)(3)([0,0,0,0,2,3,4,5,5,5,5])(controlsChiusuraManubrioSX_E);

var chiusuraManubrioSX = BEZIER(S1)([nubsManubrio5,nubsChiusuraManubrioSX_2,nubsChiusuraManubrioSX_2,nubsChiusuraManubrioSX_3,nubsChiusuraManubrioSX_E]);

var chiusuraManubrioSXMap = MAP(chiusuraManubrioSX)(domain2);

mezzoManubrioSXMap = STRUCT([mezzoManubrioSXMap,chiusuraManubrioSXMap]);

var mezzoManubrioDXMap = SCALE([0])([-1])(mezzoManubrioSXMap);

var manubrio = STRUCT([mezzoManubrioSXMap,mezzoManubrioDXMap]);


var sternoEmanubrio = COLOR([1, 0.98, 0.69])(STRUCT([sterno,manubrio]));
sternoEmanubrio = T([1,2])([-15.5, 4.5])(ROTATE([1,2])(-PI/12)(sternoEmanubrio));

// DRAW(vertebre);
// DRAW(costole);
// DRAW(sternoEmanubrio);
var scmodel = STRUCT([vertebre, costole, sternoEmanubrio]);
/////////////////////////////////////////////
return scmodel;
})();

exports.author = 'Newsid';
exports.category = 'biologics';
exports.scmodel = scmodel;

if (!module.parent) {
  fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
}

}(this));