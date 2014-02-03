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
  ///////////////////////////////////////////

  // Stefano Calcaterra, 405769
/////////////////////////// SHOWCASE ///////////////////////////

var dom1D = INTERVALS(1)(32);
var domain = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);


//porzione di arco pieno
function arc (alpha, r, R) {

  var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
  
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];

    return [r*COS(a), r*SIN(a)];
  }

  var model = MAP(mapping)(domain);
  return model;
} 

//funzione specchio 
function specchio (punto, coordinata) {
          
  var x = punto[0];
  var y = punto[1];
  var z = punto[2];
      
  var array_new = new Array();

  if(coordinata == 0)
    array_new.push(-x, y, z);
  if(coordinata == 1)
    array_new.push(x, -y, z);
  if(coordinata == 2)
    array_new.push(x, y, -z);

  return array_new
}

//fa una superficie di Bezièr dati 4 punti
function surface (punto1, punto2, punto3, punto4, domain) {

  var c1 = BEZIER(S0)([punto1, punto2]);
  var c2 = BEZIER(S0)([punto3, punto4]);

  var surf = MAP(BEZIER(S1)([c1,c2]))(domain);

  return surf;

}

///////////////////////// FUSOLIERA /////////////////////////

var punti_fusoliera = new Array();
punti_fusoliera.push(new Array(0,0,0)); //0
punti_fusoliera.push(new Array(5.5,1.25,0.25)); //1
punti_fusoliera.push(new Array(4.75,0.5,1.25)); //2
punti_fusoliera.push(new Array(16.5,1,2)); //3
punti_fusoliera.push(new Array(16.5,2,0.25)); //4
punti_fusoliera.push(new Array(4.75,0,1.25)); //5
punti_fusoliera.push(new Array(16.5,0,2)); //6
punti_fusoliera.push(new Array(5.5,0.75,-0.75)); //7
punti_fusoliera.push(new Array(16.5,1.5,-1)); //8
punti_fusoliera.push(new Array(5.5,0,-0.75)); //9
punti_fusoliera.push(new Array(16.5,0,-1)); //10
punti_fusoliera.push(new Array(20.5,1.75,1.5)); //11
punti_fusoliera.push(new Array(20.5,2.25,0.25)); //12
punti_fusoliera.push(new Array(20.5,1.75,-1)); //13
punti_fusoliera.push(new Array(20.5,0,-1)); //14
punti_fusoliera.push(new Array(22,0,2.25)); //15
punti_fusoliera.push(new Array(32.5,0,2.25)); //16
punti_fusoliera.push(new Array(22,1,2.25)); //17
punti_fusoliera.push(new Array(32.5,1.5,2.25)); //18
punti_fusoliera.push(new Array(32.5,1.75,1.5)); //19
punti_fusoliera.push(new Array(32.5,2.25,0.25)); //20
punti_fusoliera.push(new Array(32.5,1.75,-2.25)); //21
punti_fusoliera.push(new Array(32.5,0,-2.5)); //22
punti_fusoliera.push(new Array(25.25,1.75,-2.25)); //23
punti_fusoliera.push(new Array(25.25,0,-2.5)); //24
punti_fusoliera.push(new Array(25.25,2.25,0.25)); //25


var s0_d = surface(punti_fusoliera[5], punti_fusoliera[6], punti_fusoliera[2], punti_fusoliera[3], domain);
var s1_d = surface(punti_fusoliera[2], punti_fusoliera[3], punti_fusoliera[1], punti_fusoliera[4], domain);
var s2_d = surface(punti_fusoliera[1], punti_fusoliera[4], punti_fusoliera[7], punti_fusoliera[8], domain);
var s3_d = surface(punti_fusoliera[7], punti_fusoliera[8], punti_fusoliera[9], punti_fusoliera[10], domain);

var s4_d = surface(punti_fusoliera[3], punti_fusoliera[11], punti_fusoliera[4], punti_fusoliera[12], domain);
var s5_d = surface(punti_fusoliera[4], punti_fusoliera[12], punti_fusoliera[8], punti_fusoliera[13], domain);
var s6_d = surface(punti_fusoliera[8], punti_fusoliera[13], punti_fusoliera[10], punti_fusoliera[14], domain);

var s7_d = surface(punti_fusoliera[15], punti_fusoliera[16], punti_fusoliera[17], punti_fusoliera[18], domain);
var s8_d = surface(punti_fusoliera[17], punti_fusoliera[18], punti_fusoliera[11], punti_fusoliera[19], domain);
var s9_d = surface(punti_fusoliera[11], punti_fusoliera[19], punti_fusoliera[12], punti_fusoliera[20], domain);
var s10_d = surface(punti_fusoliera[12], punti_fusoliera[25], punti_fusoliera[13], punti_fusoliera[23], domain);
var s11_d = surface(punti_fusoliera[25], punti_fusoliera[20], punti_fusoliera[23], punti_fusoliera[21], domain);
var s12_d = surface(punti_fusoliera[13], punti_fusoliera[23], punti_fusoliera[14], punti_fusoliera[24], domain);
var s13_d = surface(punti_fusoliera[23], punti_fusoliera[21], punti_fusoliera[24], punti_fusoliera[22], domain);

//parte specchiata
var s0_s = surface(specchio(punti_fusoliera[5],1), specchio(punti_fusoliera[6],1), specchio(punti_fusoliera[2],1), specchio(punti_fusoliera[3],1), domain);
var s1_s = surface(specchio(punti_fusoliera[2],1), specchio(punti_fusoliera[3],1), specchio(punti_fusoliera[1],1), specchio(punti_fusoliera[4],1), domain);
var s2_s = surface(specchio(punti_fusoliera[1],1), specchio(punti_fusoliera[4],1), specchio(punti_fusoliera[7],1), specchio(punti_fusoliera[8],1), domain);
var s3_s = surface(specchio(punti_fusoliera[7],1), specchio(punti_fusoliera[8],1), specchio(punti_fusoliera[9],1), specchio(punti_fusoliera[10],1), domain);

var s4_s = surface(specchio(punti_fusoliera[3],1), specchio(punti_fusoliera[11],1), specchio(punti_fusoliera[4],1), specchio(punti_fusoliera[12],1), domain);
var s5_s = surface(specchio(punti_fusoliera[4],1), specchio(punti_fusoliera[12],1), specchio(punti_fusoliera[8],1), specchio(punti_fusoliera[13],1), domain);
var s6_s = surface(specchio(punti_fusoliera[8],1), specchio(punti_fusoliera[13],1), specchio(punti_fusoliera[10],1), specchio(punti_fusoliera[14],1), domain);

var s7_s = surface(specchio(punti_fusoliera[15],1), specchio(punti_fusoliera[16],1), specchio(punti_fusoliera[17],1), specchio(punti_fusoliera[18],1), domain);
var s8_s = surface(specchio(punti_fusoliera[17],1), specchio(punti_fusoliera[18],1), specchio(punti_fusoliera[11],1), specchio(punti_fusoliera[19],1), domain);
var s9_s = surface(specchio(punti_fusoliera[11],1), specchio(punti_fusoliera[19],1), specchio(punti_fusoliera[12],1), specchio(punti_fusoliera[20],1), domain);
var s10_s = surface(specchio(punti_fusoliera[12],1), specchio(punti_fusoliera[25],1), specchio(punti_fusoliera[13],1), specchio(punti_fusoliera[23],1), domain);
var s11_s = surface(specchio(punti_fusoliera[25],1), specchio(punti_fusoliera[20],1), specchio(punti_fusoliera[23],1), specchio(punti_fusoliera[21],1), domain);
var s12_s = surface(specchio(punti_fusoliera[13],1), specchio(punti_fusoliera[23],1), specchio(punti_fusoliera[14],1), specchio(punti_fusoliera[24],1), domain);
var s13_s = surface(specchio(punti_fusoliera[23],1), specchio(punti_fusoliera[21],1), specchio(punti_fusoliera[24],1), specchio(punti_fusoliera[22],1), domain);

//console.log(specchio(punti[5],1));

var fusoliera_d = STRUCT([s0_d, s1_d, s2_d, s3_d, s4_d, s5_d, s6_d, s7_d ,s8_d, s9_d, s10_d, s11_d, s12_d, s13_d]);
var fusoliera_s = STRUCT([s0_s, s1_s, s2_s, s3_s, s4_s, s5_s, s6_s, s7_s, s8_s, s9_s, s10_s, s11_s, s12_s, s13_s]);

var fusoliera = STRUCT([COLOR([1.5,1.5,1.5])(fusoliera_d), COLOR([1.5,1.5,1.5])(fusoliera_s)]);

///////////////////////// BACK ////////////////////////
var punti_back = new Array();
punti_back.push(new Array(32.25,0,2.25)); //0
punti_back.push(new Array(32.25,1.5,2.25)); //1
punti_back.push(new Array(32.25,2.25,0.25)); //2
punti_back.push(new Array(32.25,1.75,-2.25)); //3
punti_back.push(new Array(32.25,0,-2.5)); //4
punti_back.push(new Array(32.25,0,0.25)); //5


var s0_b_d = surface(punti_back[0], punti_back[5], punti_back[1], punti_back[2], domain);
var s1_b_d = surface(punti_back[5], punti_back[4], punti_back[2], punti_back[3], domain);

var s0_b_s = surface(specchio(punti_back[0],1), specchio(punti_back[5],1), specchio(punti_back[1],1), specchio(punti_back[2],1), domain);
var s1_b_s = surface(specchio(punti_back[5],1), specchio(punti_back[4],1), specchio(punti_back[2],1), specchio(punti_back[3],1), domain);

var back_d = STRUCT([s0_b_d, s1_b_d]);
var back_s = STRUCT([s0_b_s, s1_b_s]);

var back = STRUCT([COLOR([1.5,1.5,1.5])(back_d), COLOR([1.5,1.5,1.5])(back_s)]);
//DRAW(back);

///////////////////////// ALA /////////////////////////

//funzione che restituisce solo i valori x,y
function only_xy (punto) {
          
  var x = punto[0];
  var y = punto[1];
  var z = punto[2];
      
  var array_new = new Array(x, y);

  return array_new
}

var punti_ala = new Array();
punti_ala.push(new Array(0,0,0)); //0
punti_ala.push(new Array(25.25,14,0.25)); //1
punti_ala.push(new Array(30,14,0.25)); //2
punti_ala.push(new Array(31.5,5,0.25)); //3
punti_ala.push(new Array(25.25,5,0.25)); //4
punti_ala.push(new Array(25.25,2,0.25)); //5
punti_ala.push(new Array(31,2,0.25)); //6
punti_ala.push(new Array(31,5,0.25)); //7
punti_ala.push(new Array(31,7.25,0.25)); //8



var ala_s_surf = SIMPLICIAL_COMPLEX([only_xy(specchio(punti_ala[1],1)), only_xy(specchio(punti_ala[2],1)), only_xy(specchio(punti_ala[3],1)), only_xy(specchio(punti_ala[4],1)), only_xy(specchio(punti_ala[5],1)), only_xy(specchio(punti_ala[6],1)), only_xy(specchio(punti_ala[7],1))])([[0,1,2],[0,2,6],[0,6,3],[3,4,5],[3,5,6]]);
var ala_d_surf = SIMPLICIAL_COMPLEX([only_xy(punti_ala[1]), only_xy(punti_ala[2]), only_xy(punti_ala[3]), only_xy(punti_ala[4]), only_xy(punti_ala[5]), only_xy(punti_ala[6]), only_xy(punti_ala[7])])([[0,1,2],[0,2,6],[0,6,3],[3,4,5],[3,5,6]]);

var ala_d_extr = EXTRUDE([0.25])(ala_d_surf);
var ala_s_extr = EXTRUDE([0.25])(ala_s_surf);

//pezzettino arreggi-motore
var punti_pezzettino = new Array();
punti_pezzettino.push(new Array(0,0,0)); //0
punti_pezzettino.push(new Array(0,5,0)); //1
punti_pezzettino.push(new Array(0.25,5,0)); //2
punti_pezzettino.push(new Array(0.5,3,0)); //3
punti_pezzettino.push(new Array(0.5,0,0)); //4

var pezzettino_ala_s_surf = SIMPLICIAL_COMPLEX([only_xy(specchio(punti_pezzettino[0],1)), only_xy(specchio(punti_pezzettino[1],1)), only_xy(specchio(punti_pezzettino[2],1)), only_xy(specchio(punti_pezzettino[3],1)), only_xy(specchio(punti_pezzettino[4],1))])([[0,1,2],[0,2,3],[0,3,4]]);
var pezzettino_ala_d_surf = SIMPLICIAL_COMPLEX([only_xy(punti_pezzettino[0]), only_xy(punti_pezzettino[1]), only_xy(punti_pezzettino[2]), only_xy(punti_pezzettino[3]), only_xy(punti_pezzettino[4])])([[0,1,2],[0,2,3],[0,3,4]]);

var pezzettino_ala_d_extr = EXTRUDE([5.75])(pezzettino_ala_d_surf);
var pezzettino_ala_d_rot = R([0,2])(-PI/2)(pezzettino_ala_d_extr);
var pezzettino_ala_d = T([0,1,2])([31,2,0.25])(pezzettino_ala_d_rot);

var pezzettino_ala_s_extr = EXTRUDE([5.75])(pezzettino_ala_s_surf);
var pezzettino_ala_s_rot = R([0,2])(-PI/2)(pezzettino_ala_s_extr);
var pezzettino_ala_s = T([0,1,2])([31,-2,0.25])(pezzettino_ala_s_rot);

//motore 1
var motore1_extr = EXTRUDE([5.75 + 1])(arc(2*PI, 1.15, 1.25));
var motore1_base_extr = EXTRUDE([0.1])(arc(2*PI, 0, 1.25));
var motore1_interno_extr = EXTRUDE([5.75])(arc(2*PI, 0, 0.5));
var motore1_interno2_extr = EXTRUDE([5.75 + 1])(arc(2*PI, 0, 0.25));

var motore1_orizzontale = SIMPLICIAL_COMPLEX([[-0.1,1.25],[0.1,1.25],[0.1,-1.25],[-0.1,-1.25]])([[0,1,2],[0,2,3]]);
var motore1_orizzontale_extr = EXTRUDE([5.75 + 1])(motore1_orizzontale);

var motore1_verticale = SIMPLICIAL_COMPLEX([[0,0.1],[1.25,0.1],[1.25,-0.1],[0,-0.1]])([[0,1,2],[0,2,3]]);
var motore1_verticale_extr = EXTRUDE([5.75 + 1])(motore1_verticale);

var motore1_turbina_superf = SIMPLICIAL_COMPLEX([[0,0.1],[0.5,0.1],[0.5,-0.1],[0,-0.1]])([[0,1,2],[0,2,3]]);
var motore1_turbina_extr = R([1,2])(PI/6)(EXTRUDE([0.025])(motore1_turbina_superf));
var motore1_turbina_trasl = T([0,2])([0.5,5.5])(motore1_turbina_extr);
var motore1_turbina = STRUCT(REPLICA(18)([motore1_turbina_trasl ,R([0,1])(PI/9)]))

var motore1 = STRUCT([COLOR([1.5,1.5,1.5])(motore1_extr), COLOR([1.5,1.5,1.5])(motore1_base_extr), COLOR([1.5,1.5,1.5])(motore1_interno_extr), COLOR([1.5,1.5,1.5])(motore1_orizzontale_extr),  COLOR([1.5,1.5,1.5])(motore1_verticale_extr), COLOR([1.5,1.5,1.5])(motore1_interno2_extr), COLOR([0.3,0.3,0.3])(motore1_turbina)]);

//motore 2
var motore2_extr = EXTRUDE([3])(arc(2*PI, 0, 0.7));

//finale motore2
var Su0 = BEZIER(S0)([[0.75,0,0],[0.9,0,-0.4],[0.6,0,-1.25]]);
var curve0 = MAP(Su0)(dom1D);
//DRAW(COLOR([0,0,1])(curve0));

var Su1 = BEZIER(S1)([[0.75,0,0],[0.75,1,0],[-0.75,1,0],[-0.75,0,0]]);
var Su1Draw = BEZIER(S0)([[0.75,0,0],[0.75,1,0],[-0.75,1,0],[-0.75,0,0]]);
var curve1 = MAP(Su1Draw)(dom1D);
//DRAW(COLOR([1,0,1])(curve1));

var out = MAP(PROFILEPROD_SURFACE([Su0,Su1]))(domain);

//striature interne

var striatura1 = BEZIER(S0)([[0,0,0],[0.75,0,0]]);
var striatura2 = BEZIER(S0)([[0.5,0,-1.25],[0.4,0,-1.25]]);
var striatura3 = BEZIER(S1)([[0.6,0,0],[0.8,0,-0.4],[0.3,0,-1.25]]);
var striatura4 = BEZIER(S1)([[0,0,0], [0.4,0,-0.5], [0.2,0,-1.25]]);

/*
var curve0 = MAP(striatura1)(dom1D);
var curve1 = MAP(striatura2)(dom1D);
var curve2 = MAP(BEZIER(S0)([[0.75,0,0],[0.9,0,-0.4],[0.6,0,-1.25]]))(dom1D);
var curve3 = MAP(BEZIER(S0)([[0,0,0], [0.4,0,-0.5], [0.5,0,-1.25]]))(dom1D);
*/

var surf_striatura = MAP(COONS_PATCH([striatura1,striatura2,striatura3,striatura4]))(domain);
var striature = STRUCT( REPLICA(16)([surf_striatura, R([0,1])(PI/8)]) );
//DRAW(striature);

var motore2_finale_esterno = STRUCT(REPLICA(2)([out, R([0,1])(PI)]));
var motore2_finale = STRUCT([COLOR([0,0,0])(motore2_finale_esterno), striature]);

//DRAW(motore2_finale);

var motore2 = T([0,2])([0.6,-3])(STRUCT([COLOR([1.5,1.5,1.5])(motore2_extr), motore2_finale]));

//motore tot
var motore = R([0,2])(-PI/2)(STRUCT([motore1, motore2]));
//DRAW(motore);

//laser
var laser1_extr = EXTRUDE([5.75 + 0.5])(arc(2*PI, 0, 0.5));
var laser2_extr = T([2])([5.75 + 0.3])(EXTRUDE([0.3])(arc(2*PI, 0, 0.75)));
var laser3_extr = T([2])([-0.65])(EXTRUDE([0.3])(arc(2*PI, 0, 0.6)));
var laser4_extr = T([2])([-0.5])(EXTRUDE([13])(arc(2*PI, 0, 0.3)));
var laser5_extr = T([2])([-0.5])(EXTRUDE([17])(arc(2*PI, 0, 0.2)));
var laser6_extr = T([2])([-0.5])(EXTRUDE([19])(arc(2*PI, 0, 0.1)));
var laser7_extr = T([2])([5.75 + 0.5 + 10])(EXTRUDE([0.4])(arc(2*PI, 0, 0.3)));
var laser8_extr = T([1,2])([-0.2,5.75 + 0.5 + 10 +1])(R([1,2])(-PI/2)(EXTRUDE([0.4])(arc(PI, 0.6, 0.7))));


var laser = R([0,2])(-PI/2)(STRUCT([COLOR([1.5,1.5,1.5])(laser1_extr), COLOR([1,0,0])(laser2_extr), COLOR([1,0,0])(laser3_extr), COLOR([1.5,1.5,1.5])(laser4_extr), COLOR([1.5,1.5,1.5])(laser5_extr), COLOR([1.5,1.5,1.5])(laser6_extr), COLOR([1,0,0])(laser7_extr), COLOR([1.5,1.5,1.5])(laser8_extr)]));


var ala_d = STRUCT([COLOR([1.5,1.5,1.5])(ala_d_extr), COLOR([1,0,0])(pezzettino_ala_d), T([0,1,2])([30.75,2 + 1.75,1.3])(motore), T([0,1,2])([30.5,14,0.75])(laser)]);
var ala_s = STRUCT([COLOR([1.5,1.5,1.5])(ala_s_extr), COLOR([1,0,0])(pezzettino_ala_s), T([0,1,2])([30.75,-2 - 1.75,1.3])(motore), T([0,1,2])([30.5,-14,0.75])(laser)]);

//DRAW(ala_d);


var ali_d = STRUCT(REPLICA(2)([ala_d,R([1,2])(PI)]))
var ali_s = STRUCT(REPLICA(2)([ala_s,R([1,2])(PI)]))

var ali = STRUCT([R([1,2])(PI/12)(ali_d), R([1,2])(-PI/12)(ali_s)])

///////////////////////// FRONT /////////////////////////

var punti_front = new Array();
punti_front.push(new Array(5.5,1.25,0.25)); //0
punti_front.push(new Array(5.5,0.75,-0.75)); //1
punti_front.push(new Array(5.5,-0.75,-0.75)); //2
punti_front.push(new Array(5.5,-1.25,0.25)); //3
punti_front.push(new Array(4.75,0.5,1.25)); //4
punti_front.push(new Array(4.75,-0.5,1.25)); //5
punti_front.push(new Array(0.25,0.75,0.25)); //6
punti_front.push(new Array(3,1.2,0.25)); //7
punti_front.push(new Array(3,1.2,1.75)); //8
punti_front.push(new Array(0.5,0.75,0.5)); //9
punti_front.push(new Array(3,1.2,-0.5)); //10
punti_front.push(new Array(0.35,0.75,0.15)); //11


//var c1 = BEZIER(S0)([punti_front[0], punti_front[1], [5.6,0,0], punti_front[2], punti_front[3]]);
var c2 = BEZIER(S0)([punti_front[6], specchio(punti_front[6],1)]); //lineare davanti
var c3 = BEZIER(S1)([punti_front[0], punti_front[7], punti_front[6]]); //laterali
var c4 = BEZIER(S1)([punti_front[3], specchio(punti_front[7],1), specchio(punti_front[6],1)]); //laterali
var c5 = BEZIER(S0)([punti_front[0], punti_front[3]]);

var c6 = BEZIER(S0)([punti_front[0], punti_front[4]]);
var c7 = BEZIER(S0)([punti_front[4], punti_front[5]]);
var c8 = BEZIER(S0)([punti_front[5], punti_front[3]]);

var c9 = BEZIER(S1)([punti_front[4], punti_front[8],  punti_front[9]]);
var c10 = BEZIER(S1)([punti_front[5], specchio(punti_front[8],1), specchio(punti_front[9],1)]);

var c11 = BEZIER(S0)([punti_front[6], punti_front[9]]);
var c12 = BEZIER(S0)([specchio(punti_front[9],1), specchio(punti_front[6],1)]);
var c13 = BEZIER(S0)([punti_front[9], specchio(punti_front[9],1)]);

var c14 = BEZIER(S0)([punti_front[0], punti_front[1]]);
var c15 = BEZIER(S0)([punti_front[1], punti_front[2]]);
var c16 = BEZIER(S0)([punti_front[2], punti_front[3]]);

var c17 = BEZIER(S1)([punti_front[1],punti_front[10], punti_front[11]]);
var c18 = BEZIER(S1)([punti_front[2],specchio(punti_front[10],1), specchio(punti_front[11],1)]);

var c19 = BEZIER(S0)([punti_front[6], punti_front[11]]);
var c20 = BEZIER(S0)([specchio(punti_front[6],1), specchio(punti_front[11],1)]);
var c21 = BEZIER(S0)([punti_front[11], specchio(punti_front[11],1)]);

/*
//var curve1 = MAP(c1)(dom1D);
var curve2 = MAP(c2)(dom1D);
var curve3 = MAP(BEZIER(S0)([punti_front[0], [3,1.2,0.25], [0.25,0.75,0.25]]))(dom1D);
var curve4 = MAP(BEZIER(S0)([punti_front[3], [3,-1.2,0.25], [0.25,-0.75,0.25]]))(dom1D);
var curve5 = MAP(c5)(dom1D);
var curve6 = MAP(c6)(dom1D);
var curve7 = MAP(c7)(dom1D);
var curve8 = MAP(c8)(dom1D);
var curve9 = MAP(BEZIER(S0)([punti_front[4], [3,1.2,1.75], [0.5,0.75,0.5]]))(dom1D);
var curve10 = MAP(BEZIER(S0)([punti_front[5], [3,-1.2,1.75], [0.5,-0.75,0.5]]))(dom1D);
var curve11 = MAP(c11)(dom1D);
var curve12 = MAP(c12)(dom1D);
var curve13 = MAP(c13)(dom1D);
var curve14 = MAP(c14)(dom1D);
var curve15 = MAP(c15)(dom1D);
var curve16 = MAP(c16)(dom1D);
var curve17 = MAP(BEZIER(S0)([punti_front[1],[3,1.2,-0.5], [0.35,0.75,0.15]]))(dom1D);
var curve18 = MAP(BEZIER(S0)([punti_front[2],[3,-1.2,-0.5], [0.35,-0.75,0.15]]))(dom1D);
var curve19 = MAP(c19)(dom1D);
var curve20 = MAP(c20)(dom1D);
var curve21 = MAP(c21)(dom1D);
DRAW(COLOR([1,0,0])(STRUCT([curve2, curve3, curve4, curve5, curve6, curve7, curve8, curve9, curve10, curve11, curve12, curve13, curve14, curve15, curve16, curve17, curve18, curve19, curve20, curve21])));
*/

var surf1 = MAP(COONS_PATCH([c14,c19,c3,c17]))(domain);
var surf2 = MAP(COONS_PATCH([c16,c20,c4,c18]))(domain);
var surf3 = MAP(COONS_PATCH([c15,c21,c17,c18]))(domain);
var surf4 = surface(punti_front[6], specchio(punti_front[6],1), punti_front[11], specchio(punti_front[11],1), domain);

var surf5 = MAP(COONS_PATCH([c6,c11,c3,c9]))(domain);
var surf6 = MAP(COONS_PATCH([c7,c13,c9,c10]))(domain);
var surf7 = MAP(COONS_PATCH([c8,c12,c10,c4]))(domain);
var surf8 = surface(punti_front[6], specchio(punti_front[6],1), punti_front[9], specchio(punti_front[9],1), domain);

var front_grey = STRUCT([surf1, surf2, surf3, surf4, surf5, surf6, surf7, surf8]);
var front = COLOR([1.5,1.5,1.5])(front_grey);
//DRAW(front);

///////////////////////// CUPOLOTTO /////////////////////////

var punti_cupolotto = new Array();
punti_cupolotto.push(new Array(16.5,1,2)); //0
punti_cupolotto.push(new Array(20.5,1.75,1.5)); //1
punti_cupolotto.push(new Array(20.5,1,2.5)); //2
punti_cupolotto.push(new Array(22,1,2.25)); //3

var cupolotto1 = COLOR([0,0,0,0.7])(SIMPLICIAL_COMPLEX([punti_cupolotto[0],punti_cupolotto[1],punti_cupolotto[2]])([[0,1,2]]));
var cupolotto2 = COLOR([0,0,0,0.7])(SIMPLICIAL_COMPLEX([punti_cupolotto[1],punti_cupolotto[3],punti_cupolotto[2]])([[0,1,2]]));
var cupolotto3 = COLOR([0,0,0,0.7])(SIMPLICIAL_COMPLEX([specchio(punti_cupolotto[0],1),specchio(punti_cupolotto[1],1),specchio(punti_cupolotto[2],1)])([[0,1,2]]));
var cupolotto4 = COLOR([0,0,0,0.7])(SIMPLICIAL_COMPLEX([specchio(punti_cupolotto[1],1),specchio(punti_cupolotto[3],1),specchio(punti_cupolotto[2],1)])([[0,1,2]]));
var cupolotto5 = COLOR([0,0,0,0.7])(SIMPLICIAL_COMPLEX([punti_cupolotto[0],punti_cupolotto[2],specchio(punti_cupolotto[2],1),specchio(punti_cupolotto[0],1)])([[0,1,2],[0,2,3]]));
var cupolotto6 = COLOR([0,0,0,0.7])(SIMPLICIAL_COMPLEX([punti_cupolotto[2],punti_cupolotto[3],specchio(punti_cupolotto[3],1),specchio(punti_cupolotto[2],1)])([[0,1,2],[0,2,3]]));


var cupolotto = STRUCT([cupolotto1, cupolotto2, cupolotto3, cupolotto4, cupolotto5, cupolotto6]);

///////////////////////// TOTALE /////////////////////////
var model = STRUCT([fusoliera, ali, front, cupolotto, back]);
//DRAW(model);


  ///////////////////////////////////////////
  return model
  })();

  exports.author = 'sjcalcky';
  exports.category = 'others';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));