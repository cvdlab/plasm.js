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
/***********************************************************************************
*
*                 Giorgetto Giugiaro - Telefono SIP
*
*
*   FEDERICO MIONE   matr.266392
************************************************************************************/

/* dichiarazione dei domini */
var domain = INTERVALS(1)(16);
var domain2d = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);
var domain2dcorn = PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)]);


/* definizione colori */
var carbon = [5/255,4/255,2/255];
var grigio10 = [239/255,239/255,239/255];
var grigio30 = [178/255,178/255,178/255];
var realblue = [65/255,105/255,225/255];
var beige = [245/255,245/255,220/255];
var white = [50,50,50];


/* Arco di circonferenza bidimensionale parametrico rispetto a due raggi 
  r = raggio minore, R = raggio maggiore, alpha = arco di circonferenza */
function arc (alpha, r, R){
  var domainArc = DOMAIN([[0,alpha],[r,R]])([16,1]);
  var mapping = function(v) {
  var a = v[0];
  var r = v[1];

  return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domainArc);

  return model;
}

var sphere = function(r) {
  var domain = DOMAIN([[0, PI], [0, 2*PI]])([16,16]);

  var mapping = function(v) {
    var a = v[0];
    var b = v[1];

    var u = r*SIN(a)*COS(b);
    var v = r*SIN(a)*SIN(b);
    var w = r*COS(a);

    return [u,v,w];
  }
  return MAP(mapping)(domain)
}

var linea = function(spess,lungh) {
  //0.195
  var cerchio1 = DISK(spess/2)(32);
  var cerchio2 = TRANSLATE([0])([lungh-spess])(DISK(spess/2)(32));
  var linea_1 = TRANSLATE([1])([-spess/2])(CUBOID([lungh-spess,spess,0.001]));
  var lineaTot = TRANSLATE([0])([spess/2])(STRUCT([linea_1,cerchio1,cerchio2]));
  return lineaTot;

}

var pulsante_num = function(h) {
  var pulsante_num =  COLOR(carbon)(TRANSLATE([0,1])([-h/2, -h/2])(CUBOID([h,h,h])));
  return pulsante_num;
}

var pulsante_special = function(h) {

  var line1 = BEZIER(S0)([[3.193, 4.739,0], [4.258, 4.764,0],[4.196, 3.281,0],[3.214, 3.284,0]]);
  var line2 = BEZIER(S0)([[2.314, 4.729,0], [3.193, 4.739,0]]);
  var line3 = BEZIER(S0)([[2.314, 4.728,0], [1.266, 4.741,0], [1.278, 3.304,0], [2.328, 3.309,0]]);
  var line4 = BEZIER(S0)([[3.214, 3.284,0], [2.328, 3.309,0]]);

  var line1s = BEZIER(S0)([[3.193, 4.739,h], [4.258, 4.764,h],[4.196, 3.281,h],[3.214, 3.284,h]]);
  var line2s = BEZIER(S0)([[2.314, 4.729,h], [3.193, 4.739,h]]);
  var line3s = BEZIER(S0)([[2.314, 4.728,h], [1.266, 4.741,h], [1.278, 3.304,h], [2.328, 3.309,h]]);
  var line4s = BEZIER(S0)([[3.214, 3.284,h], [2.328, 3.309,h]]);

  var sup1 = MAP(BEZIER(S1)([line1,line3]))(domain2d);
  var sup2 = MAP(BEZIER(S1)([line1s,line3s]))(domain2d);
  var sup3 = MAP(BEZIER(S1)([line1s,line1]))(domain2d);
  var sup4 = MAP(BEZIER(S1)([line3s,line3]))(domain2d);
  var sup5 = MAP(BEZIER(S1)([line2s,line2]))(domain2d);
  var sup6 = MAP(BEZIER(S1)([line4s,line4]))(domain2d);
  var pulsante_special =  COLOR(grigio30)(TRANSLATE([0,1])([-2.736,-4.059])(STRUCT([sup1,sup2,sup3,sup4,sup5,sup6])));
  return pulsante_special;
}

var zero = function(h) {

  var line1 = BEZIER(S0)([[2.027, 4.55,0], [1.453, 4.537,0], [1.447, 3.283,0], [2.04, 3.263,0]]);
  var line2 = BEZIER(S0)([[2.027, 4.55,0], [2.58, 4.557,0], [2.62, 3.27,0], [2.04, 3.263,0]]);
  var line3 = BEZIER(S0)([[2.021, 4.367,0], [1.706, 4.362,0], [1.694, 3.448,0], [2.018, 3.44,0]]);
  var line4 = BEZIER(S0)([[2.021, 4.367,0], [2.372, 4.369,0], [2.381, 3.440,0], [2.018, 3.44,0]]);

  var sup1 = MAP(BEZIER(S1)([line1,line3]))(domain2d);
  var sup2 = MAP(BEZIER(S1)([line2,line4]))(domain2d);

  var zero = COLOR(grigio10)(TRANSLATE([0,1,2])([-2.041,-3.91,h+0.01])(STRUCT([sup1,sup2])));
  var tot = STRUCT([zero,pulsante_num(h)]);
  return tot;
}

var uno = function(h) {

  var line1 = linea(0.195,1.266);
  var line2 = TRANSLATE([0,1])([0.195/2,0.195/2])(ROTATE([0,1])(-PI/2)(linea(0.195,0.433)));

  var uno = COLOR(grigio10)(TRANSLATE([0,2])([-1.266/2+0.195/2,h+0.01])(STRUCT([line1,line2])));
  var tot = STRUCT([uno,pulsante_num(h)]);
  return tot;
}

var due = function(h) {

  var line1 = linea(0.195,0.744);
  var line2 = BEZIER(S0)([[1.769, 3.539,0],[2.28, 4.292,0]]);
  var line3 = BEZIER(S0)([[1.881, 4.475,0], [2.083, 4.480,0], [2.387, 4.51,0], [2.28, 4.292,0]]);
  var line4 = BEZIER(S0)([[1.881, 4.475,0], [1.772, 4.466,0], [1.767, 4.655,0], [1.875, 4.651,0]]);
  var line5 = BEZIER(S0)([[1.881, 4.475,0], [1.875, 4.651,0]]);
  var line6 = BEZIER(S0)([[2.246, 4.658,0],[1.875, 4.651,0]]);
  var line7 = BEZIER(S0)([[2.246, 4.658,0], [2.444, 4.671,0], [2.585, 4.362,0], [2.454, 4.192,0]]);
  var line8 = BEZIER(S0)([[2.011, 3.558,0], [2.454, 4.192,0]]);

  var sup1 = MAP(BEZIER(S1)([line4,line5]))(domain2d);
  var sup2 = MAP(BEZIER(S1)([line2,line8]))(domain2d);
  var sup3 = MAP(BEZIER(S1)([line3,line7]))(domain2d);
  var sup4 = MAP(BEZIER(S1)([line6,line5]))(domain2d);
  var sup = TRANSLATE([0,1])([-1.769,-3.5])(STRUCT([sup1,sup2,sup3,sup4]));

  var due = COLOR(grigio10)(TRANSLATE([0,1,2])([-0.744/2,-0.5,h+0.01])(STRUCT([sup,line1])));
  var tot = STRUCT([due,pulsante_num(h)]);
  return tot;
}

var tre = function(h) {

  var line1 = BEZIER(S0)([[2.728, 3.914,0],[2.214, 3.914,0]]);
  var line2 = BEZIER(S0)([[2.728, 3.914,0], [2.93, 4.15,0], [2.738, 4.504,0],[2.537, 4.491,0]]);
  var line3 = BEZIER(S0)([[2.199, 4.498,0],[2.537, 4.491,0]]);
  var line4 = BEZIER(S0)([[2.2, 4.329,0], [2.1, 4.336,0], [2.103, 4.496,0], [2.199, 4.498,0]]);
  var line5 = BEZIER(S0)([[2.2, 4.329,0],[2.199, 4.498,0]]);
  var line6 = BEZIER(S0)([[2.2, 4.329,0],[2.486, 4.315,0]]);
  var line7 = BEZIER(S0)([[2.45, 4.019,0], [2.667, 4.016,0], [2.674, 4.316,0], [2.486, 4.315,0]]);
  var line8 = BEZIER(S0)([[2.45, 4.019,0], [2.323, 4.013,0], [2.213, 4.025,0], [2.214, 3.914,0]]);

  var sup1 = MAP(BEZIER(S1)([line4,line5]))(domain2d);
  var sup2 = MAP(BEZIER(S1)([line8,line1]))(domain2d);
  var sup3 = MAP(BEZIER(S1)([line2,line7]))(domain2d);
  var sup4 = MAP(BEZIER(S1)([line3,line6]))(domain2d);
  var sup = TRANSLATE([0,1])([-2.48,-3.914])(STRUCT([sup1,sup2,sup3,sup4]));
  var sup1 = ROTATE([1,2])(PI)(sup);

  var tre = COLOR(grigio10)(TRANSLATE([2])([h+0.01])(STRUCT([sup,sup1])));
  var tot = STRUCT([tre,pulsante_num(h)]);
  return tot;
}


var quattro = function(h) {

  var line1 = linea(0.195,1);
  var line2 = TRANSLATE([0,1])([0.7,0.827+0.1])(ROTATE([0,1])(-PI/2)(linea(0.195,1.25)));
  var line3 = TRANSLATE([0,1])([0,-0.09])(ROTATE([0,1])(PI/3.3)(linea(0.195,1.2)));

  var quattro = COLOR(grigio10)(TRANSLATE([0,1,2])([-0.5,-0.2,h+0.01])(STRUCT([line1,line2,line3])));
  var tot = STRUCT([quattro,pulsante_num(h)]);
  return tot;
}

var cinque = function(h) {

  var line1 = linea(0.195,0.762);
  var line2 = TRANSLATE([0,1])([0.195/2,0.195/2])(ROTATE([0,1])(-PI/2)(linea(0.195,0.672)));
  var line3 = TRANSLATE([1])([-0.5])(linea(0.195,0.45));
  var line6 = TRANSLATE([1])([-0.63])(line3);

  var line4 = BEZIER(S0)([[1.959, 4.103,0], [2.552, 4.113,0], [2.537, 3.276,0], [1.975, 3.268,0]]);
  var line5 = BEZIER(S0)([[1.95, 3.903,0], [2.265, 3.904,0], [2.267, 3.476,0], [1.958, 3.468,0]]);
  var sup1 = TRANSLATE([0,1])([-1.7,-4.5])(MAP(BEZIER(S1)([line4,line5]))(domain2d));

  var cinque = COLOR(grigio10)(TRANSLATE([0,1,2])([-0.762/2,0.5,h+0.01])(STRUCT([line1,line2,line3,sup1,line6])));
  var tot = STRUCT([cinque,pulsante_num(h)]);
  return tot;
}

var sei = function(h) {

  var circ = arc(2*PI,0.2,0.4);

  var line1 = BEZIER(S0)([[1.903, 3.419,0], [1.816, 3.923,0], [2.157, 4.392,0], [2.664, 4.204,0]]);
  var line2 = BEZIER(S0)([[2.576, 4.047,0], [2.689, 3.977,0], [2.794, 4.156,0], [2.664, 4.204,0]]);
  var line3 = BEZIER(S0)([[2.576, 4.047,0], [2.664, 4.204,0]]);
  var line4 = BEZIER(S0)([[2.093, 3.404,0],[1.994, 4.175,0],[2.566, 4.044,0],[2.576, 4.047,0]]);

  var sup1 = MAP(BEZIER(S1)([line2,line3]))(domain2d);
  var sup2 = MAP(BEZIER(S1)([line1,line4]))(domain2d);
  var sup = TRANSLATE([0,1])([-1.903-0.4,-3.419])(STRUCT([sup1,sup2]));

  var sei =  TRANSLATE([1,2])([-0.25,h+0.01])(COLOR(grigio10)(STRUCT([circ,sup])));
  var tot = STRUCT([sei,pulsante_num(h)]);
  return tot;
}


var sette = function(h) {

  var line1 = linea(0.195,0.787);
  var line2 = TRANSLATE([0,1])([0,-1.2])(ROTATE([0,1])(PI/3)(linea(0.195,1.39)));

  var sette = COLOR(grigio10)(TRANSLATE([0,1,2])([-0.393,0.5,h+0.01])(STRUCT([line1,line2])));
  var tot = STRUCT([sette,pulsante_num(h)]);
  return tot;
}

var otto = function(h) {
  var line8a = BEZIER(S0)([[2.055, 3.898,0], [1.486, 4.687,0], [3.127, 4.722,0], [2.593, 3.912,0]]);
  var line8b = BEZIER(S0)([[2.773, 3.574,0], [2.782, 4.159,0], [1.874, 4.126,0], [1.853, 3.617,0]]);
  var line8c = BEZIER(S0)([[2.773, 3.574,0],[2.771, 3.059,0], [1.843, 3.057,0],[1.853, 3.617,0]]);

  var line8d = BEZIER(S0)([[2.055, 3.898,0], [2.593, 3.912,0]]);
  var line8e = BEZIER(S0)([[2.585, 3.566,0], [2.571, 3.321,0], [2.055, 3.345,0], [2.06, 3.572,0]]);
  var line8f = BEZIER(S0)([[2.585, 3.566,0], [2.579, 3.845,0],[2.068, 3.846,0],[2.06, 3.572,0]]);
  var line8g = BEZIER(S0)([[2.11, 4.164,0], [2.118, 3.980,0], [2.537, 3.979,0], [2.527, 4.175,0]]);
  var line8h = BEZIER(S0)([[2.11, 4.164,0],[2.108, 4.375,0], [2.527, 4.394,0],[2.527, 4.175,0]]);

  var sup8a = MAP(BEZIER(S1)([line8a,line8h]))(domain2d);
  var sup8b = MAP(BEZIER(S1)([line8d,line8g]))(domain2d);
  var sup8c = MAP(BEZIER(S1)([line8b,line8f]))(domain2d);
  var sup8d = MAP(BEZIER(S1)([line8c,line8e]))(domain2d);
  var sup_otto = COLOR(grigio10)(TRANSLATE([0,1,2])([-2.325, -3.899,h+0.01])(STRUCT([sup8a,sup8b,sup8c,sup8d])));
  var tot = STRUCT([sup_otto,pulsante_num(h)]);
  return tot;

}

var nove = function(h) {

  var nove =  ROTATE([0,1])(PI)(sei(h));
  return nove;
}

var asterisco = function(h) {

  var line1 = TRANSLATE([0,2])([-1.114/2,h+0.01])(linea(0.195,1.114));
  var aste = COLOR(grigio10)(STRUCT(REPLICA(3)([line1,ROTATE([0,1])(2*PI/3)])));

  var tot = STRUCT([aste,pulsante_num(h)]);
  return tot;
}

var cancelletto = function(h) {

  var line1 = TRANSLATE([0])([-0.307])(linea(0.195,1.227));
  var line2 = ROTATE([0,1])(PI/2)(line1);
  var half_lines_a = TRANSLATE([0,1])([-0.3065,-0.3065])(STRUCT([line1,line2]));
  var half_lines_b = ROTATE([0,1])(PI)(half_lines_a);

  var cance = COLOR(grigio10)(TRANSLATE([2])([h+0.01])(STRUCT([half_lines_a,half_lines_b])));
  var tot = STRUCT([cance,pulsante_num(h)]);
  return tot;
}

var pii = function(h) {

  var line1pi = ROTATE([0,1])(PI/2)(linea(0.127,0.747));
  var line2pi = TRANSLATE([1])([0.351])(linea(0.127,0.35));
  var line3pi = TRANSLATE([1])([0.747-0.127/2])(linea(0.127,0.35));
  var line4pi = BEZIER(S0)([[2.487, 4.249,0], [2.638, 4.265,0], [2.638, 4.05,0], [2.481, 4.047,0]]);
  var line5pi = BEZIER(S0)([[2.482, 4.375,0], [2.793, 4.368,0], [2.821, 3.941,0], [2.492, 3.933,0]]);
  var sup1pi = TRANSLATE([0,1])([-2.22,-3.635])(MAP(BEZIER(S1)([line4pi,line5pi]))(domain2d));

  var totPii = COLOR(grigio10)(TRANSLATE([0,1,2])([-0.22,-0.747/2,h+0.01])(STRUCT([line1pi,line2pi,line3pi,sup1pi])));
  var tot = STRUCT([totPii]);
  return tot;
}

var pii_but = function(h) {

  var tot = STRUCT([pii(h),pulsante_special(h)]);
  return tot;
}

var rp = function(h) {

  var line1erre = COLOR(grigio10)(ROTATE([0,1])(-PI/3)(linea(0.127,0.447)));
  var erre = TRANSLATE([0])([-0.25])(pii(h));
  var ppii = TRANSLATE([0])([0.665])(erre);

  var totRp = TRANSLATE([0,2])([-0.3,h+0.01])(STRUCT([line1erre]));
  var tot = STRUCT([totRp,erre,ppii,pulsante_special(h)]);
  return tot;
}

var logo_sip = function(h) {

  var riga1a_inf = BEZIER(S0)([[0.175, 0.582, 0], [5.226, 0.599, 0]]);
  var riga1b_inf = BEZIER(S0)([[5.226, 0.599, 0], [8.042, 1.712, 0]]);
  var riga1c_inf = BEZIER(S0)([[8.695, 0.596, 0],[8.358, 0.757, 0],[8.149, 1.453, 0],[8.042, 1.712, 0]]);
  var riga1d_inf = BEZIER(S0)([[8.695, 0.596, 0], [9.895, 0.596, 0]]);
  var riga1e_inf = BEZIER(S0)([[10.157, 1.709, 0], [9.895, 0.596, 0]]);
  var riga1f_inf = BEZIER(S0)([[10.157, 1.709, 0],[8.132, 1.721, 0]]);
  var riga1g_inf = BEZIER(S0)([[7.732, 2.571, 0],[8.132, 1.709, 0]]);
  var riga1h_inf = BEZIER(S0)([[7.732, 2.571, 0], [5.507, 1.709, 0]]);
  var riga1i_inf = BEZIER(S0)([[0.432, 1.709, 0], [5.507, 1.709, 0]]);
  var riga1l_inf = BEZIER(S0)([[0.175, 0.582, 0],[0.432, 1.709, 0]]);

  var riga1a = BEZIER(S0)([[0.175, 0.582, h], [5.226, 0.599, h]]);
  var riga1b = BEZIER(S0)([[5.226, 0.599, h], [8.042, 1.712, h]]);
  var riga1c = BEZIER(S0)([[8.695, 0.596, h],[8.358, 0.757, h],[8.149, 1.453, h],[8.042, 1.712, h]]);
  var riga1d = BEZIER(S0)([[8.695, 0.596, h], [9.895, 0.596, h]]);
  var riga1e = BEZIER(S0)([[10.157, 1.709, h], [9.895, 0.596, h]]);
  var riga1f = BEZIER(S0)([[10.157, 1.709, h],[8.132, 1.721, h]]);
  var riga1g = BEZIER(S0)([[7.732, 2.571, h],[8.132, 1.709, h]]);
  var riga1h = BEZIER(S0)([[7.732, 2.571, h], [5.507, 1.709, h]]);
  var riga1i = BEZIER(S0)([[0.432, 1.709, h], [5.507, 1.709, h]]);
  var riga1l = BEZIER(S0)([[0.175, 0.582, h],[0.432, 1.709, h]]);

  var sup_riga_1a_inf = MAP(BEZIER(S1)([riga1a_inf,riga1l_inf]))(domain2d);
  var sup_riga_1b_inf = MAP(BEZIER(S1)([riga1b_inf,riga1i_inf]))(domain2d); 
  var sup_riga_1c_inf = MAP(BEZIER(S1)([riga1g_inf,riga1h_inf]))(domain2d); 
  var sup_riga_1d_inf = MAP(BEZIER(S1)([riga1c_inf,riga1f_inf]))(domain2d); 
  var sup_riga_1e_inf = MAP(BEZIER(S1)([riga1d_inf,riga1e_inf]))(domain2d); 
  var sup_riga1_inf = STRUCT([sup_riga_1a_inf,sup_riga_1b_inf,sup_riga_1c_inf,sup_riga_1d_inf,sup_riga_1e_inf]);

  var sup_riga_1a = MAP(BEZIER(S1)([riga1a,riga1l]))(domain2d); 
  var sup_riga_1b = MAP(BEZIER(S1)([riga1b,riga1i]))(domain2d); 
  var sup_riga_1c = MAP(BEZIER(S1)([riga1g,riga1h]))(domain2d); 
  var sup_riga_1d = MAP(BEZIER(S1)([riga1c,riga1f]))(domain2d); 
  var sup_riga_1e = MAP(BEZIER(S1)([riga1d,riga1e]))(domain2d);
  var sup_riga1 = STRUCT([sup_riga_1a,sup_riga_1b,sup_riga_1c,sup_riga_1d,sup_riga_1e]);

    var sup_riga_1a_c1 = MAP(BEZIER(S1)([riga1a,riga1a_inf]))(domain2d); 
    var sup_riga_1a_c2 = MAP(BEZIER(S1)([riga1b,riga1b_inf]))(domain2d); 
    var sup_riga_1a_c3 = MAP(BEZIER(S1)([riga1c,riga1c_inf]))(domain2d); 
    var sup_riga_1a_c4 = MAP(BEZIER(S1)([riga1d,riga1d_inf]))(domain2d); 
    var sup_riga_1a_c5 = MAP(BEZIER(S1)([riga1e,riga1e_inf]))(domain2d); 
    var sup_riga_1a_c6 = MAP(BEZIER(S1)([riga1f,riga1f_inf]))(domain2d); 
    var sup_riga_1a_c7 = MAP(BEZIER(S1)([riga1g,riga1g_inf]))(domain2d); 
    var sup_riga_1a_c8 = MAP(BEZIER(S1)([riga1h,riga1h_inf]))(domain2d); 
    var sup_riga_1a_c9 = MAP(BEZIER(S1)([riga1i,riga1i_inf]))(domain2d); 
    var sup_riga_1a_c10 = MAP(BEZIER(S1)([riga1l,riga1l_inf]))(domain2d); 
  var sup_riga1_contorno = STRUCT([sup_riga_1a_c1,sup_riga_1a_c2,sup_riga_1a_c3,sup_riga_1a_c4,sup_riga_1a_c5,sup_riga_1a_c6,sup_riga_1a_c7,sup_riga_1a_c8,sup_riga_1a_c9,sup_riga_1a_c10]);
  
  var riga1 = COLOR([1,0,0])(STRUCT([sup_riga1_inf,sup_riga1,sup_riga1_contorno]));


  var riga2a_inf = BEZIER(S0)([[0.511, 1.961, 0], [5.6, 1.950, 0]]);
  var riga2b_inf = BEZIER(S0)([[5.6, 1.950, 0],[8.252, 2.951,0]]);
  var riga2c_inf = BEZIER(S0)([[8.252, 2.951,0],[8.4, 2.618,0], [8.538, 2.166,0], [8.931, 1.951,0]]);
  var riga2d_inf = BEZIER(S0)([[8.931, 1.951,0],[10.214, 1.955,0]]);
  var riga2e_inf = BEZIER(S0)([[10.446, 2.939,0],[10.214, 1.955,0]]);
  var riga2f_inf = BEZIER(S0)([[8.446, 2.939,0],[10.446, 2.939,0]]);
  var riga2g_inf = BEZIER(S0)([[8.446, 2.939,0],[8.101, 3.739,0]]);
  var riga2h_inf = BEZIER(S0)([[5.868, 2.939,0],[8.101, 3.739,0]]);
  var riga2i_inf = BEZIER(S0)([[0.742, 2.949,0],[5.868, 2.939,0]]);
  var riga2l_inf = BEZIER(S0)([[0.511, 1.961, 0],[0.742, 2.949,0]]);

  var riga2a = BEZIER(S0)([[0.511, 1.961, h], [5.6, 1.950, h]]);
  var riga2b = BEZIER(S0)([[5.6, 1.950, h],[8.252, 2.951,h]]);
  var riga2c = BEZIER(S0)([[8.252, 2.951,h],[8.4, 2.618,h], [8.538, 2.166,h], [8.931, 1.951,h]]);
  var riga2d = BEZIER(S0)([[8.931, 1.951,h],[10.214, 1.955,h]]);
  var riga2e = BEZIER(S0)([[10.446, 2.939,h],[10.214, 1.955,h]]);
  var riga2f = BEZIER(S0)([[8.446, 2.939,h],[10.446, 2.939,h]]);
  var riga2g = BEZIER(S0)([[8.446, 2.939,h],[8.101, 3.739,h]]);
  var riga2h = BEZIER(S0)([[5.868, 2.939,h],[8.101, 3.739,h]]);
  var riga2i = BEZIER(S0)([[0.742, 2.949,h],[5.868, 2.939,h]]);
  var riga2l = BEZIER(S0)([[0.511, 1.961, h],[0.742, 2.949,h]]);

  var sup_riga_2a_inf = MAP(BEZIER(S1)([riga2a_inf,riga2l_inf]))(domain2d);
  var sup_riga_2b_inf = MAP(BEZIER(S1)([riga2b_inf,riga2i_inf]))(domain2d); 
  var sup_riga_2c_inf = MAP(BEZIER(S1)([riga2g_inf,riga2h_inf]))(domain2d); 
  var sup_riga_2d_inf = MAP(BEZIER(S1)([riga2c_inf,riga2f_inf]))(domain2d); 
  var sup_riga_2e_inf = MAP(BEZIER(S1)([riga2d_inf,riga2e_inf]))(domain2d); 
  var sup_riga2_inf = STRUCT([sup_riga_2a_inf,sup_riga_2b_inf,sup_riga_2c_inf,sup_riga_2d_inf,sup_riga_2e_inf]);

  var sup_riga_2a = MAP(BEZIER(S1)([riga2a,riga2l]))(domain2d);
  var sup_riga_2b = MAP(BEZIER(S1)([riga2b,riga2i]))(domain2d); 
  var sup_riga_2c = MAP(BEZIER(S1)([riga2g,riga2h]))(domain2d); 
  var sup_riga_2d = MAP(BEZIER(S1)([riga2c,riga2f]))(domain2d); 
  var sup_riga_2e = MAP(BEZIER(S1)([riga2d,riga2e]))(domain2d); 
  var sup_riga2 = STRUCT([sup_riga_2a,sup_riga_2b,sup_riga_2c,sup_riga_2d,sup_riga_2e]);

  var sup_riga_2a_c1 = MAP(BEZIER(S1)([riga2a,riga2a_inf]))(domain2d); 
    var sup_riga_2a_c2 = MAP(BEZIER(S1)([riga2b,riga2b_inf]))(domain2d); 
    var sup_riga_2a_c3 = MAP(BEZIER(S1)([riga2c,riga2c_inf]))(domain2d); 
    var sup_riga_2a_c4 = MAP(BEZIER(S1)([riga2d,riga2d_inf]))(domain2d); 
    var sup_riga_2a_c5 = MAP(BEZIER(S1)([riga2e,riga2e_inf]))(domain2d); 
    var sup_riga_2a_c6 = MAP(BEZIER(S1)([riga2f,riga2f_inf]))(domain2d); 
    var sup_riga_2a_c7 = MAP(BEZIER(S1)([riga2g,riga2g_inf]))(domain2d); 
    var sup_riga_2a_c8 = MAP(BEZIER(S1)([riga2h,riga2h_inf]))(domain2d); 
    var sup_riga_2a_c9 = MAP(BEZIER(S1)([riga2i,riga2i_inf]))(domain2d); 
    var sup_riga_2a_c10 = MAP(BEZIER(S1)([riga2l,riga2l_inf]))(domain2d); 
  var sup_riga2_contorno = STRUCT([sup_riga_2a_c1,sup_riga_2a_c2,sup_riga_2a_c3,sup_riga_2a_c4,sup_riga_2a_c5,sup_riga_2a_c6,sup_riga_2a_c7,sup_riga_2a_c8,sup_riga_2a_c9,sup_riga_2a_c10]);

  var riga2 = COLOR([1,0,0])(STRUCT([sup_riga2_inf,sup_riga2,sup_riga2_contorno]));

  var riga3a_inf = BEZIER(S0)([[0.785, 3.132,0],[5.988, 3.148,0]]);
  var riga3b_inf = BEZIER(S0)([[5.988, 3.148,0],[8.362, 3.988,0]]);
  var riga3c_inf = BEZIER(S0)([[8.466, 3.979,0],[8.362, 3.988,0]]);
  var riga3d_inf = BEZIER(S0)([[8.466, 3.979,0], [8.626, 3.498,0], [8.894, 3.257,0], [9.106, 3.152,0]]);
  var riga3e_inf = BEZIER(S0)([[9.106, 3.152,0],[10.493, 3.150,0]]);
  var riga3f_inf = BEZIER(S0)([[10.681, 3.962,0],[10.493, 3.150,0]]);
  var riga3g_inf = BEZIER(S0)([[8.667, 4,0],[10.681, 3.962,0]]);
  var riga3h_inf = BEZIER(S0)([[8.667, 4,0],[8.347, 4.725,0]]);
  var riga3i_inf = BEZIER(S0)([[6.116, 4.002,0],[8.347, 4.725,0]]);
  var riga3l_inf = BEZIER(S0)([[0.975, 3.99,0],[6.116, 4.002,0]]);
  var riga3m_inf = BEZIER(S0)([[0.975, 3.99,0],[0.785, 3.132,0]]);

  var riga3a = BEZIER(S0)([[0.785, 3.132,h],[5.988, 3.148,h]]);
  var riga3b = BEZIER(S0)([[5.988, 3.148,h],[8.362, 3.988,h]]);
  var riga3c = BEZIER(S0)([[8.466, 3.979,h],[8.362, 3.988,h]]);
  var riga3d = BEZIER(S0)([[8.466, 3.979,h], [8.626, 3.498,h], [8.894, 3.257,h], [9.106, 3.152,h]]);
  var riga3e = BEZIER(S0)([[9.106, 3.152,h],[10.493, 3.150,h]]);
  var riga3f = BEZIER(S0)([[10.681, 3.962,h],[10.493, 3.150,h]]);
  var riga3g = BEZIER(S0)([[8.667, 4,h],[10.681, 3.962,h]]);
  var riga3h = BEZIER(S0)([[8.667, 4,h],[8.347, 4.725,h]]);
  var riga3i = BEZIER(S0)([[6.116, 4.002,h],[8.347, 4.725,h]]);
  var riga3l = BEZIER(S0)([[0.975, 3.99,h],[6.116, 4.002,h]]);
  var riga3m = BEZIER(S0)([[0.975, 3.99,h],[0.785, 3.132,h]]);

  var sup_riga_3a_inf = MAP(BEZIER(S1)([riga3a_inf,riga3l_inf]))(domain2d);
  var sup_riga_3b_inf = MAP(BEZIER(S1)([riga3b_inf,riga3i_inf]))(domain2d); 
  var sup_riga_3c_inf = MAP(BEZIER(S1)([riga3g_inf,riga3d_inf]))(domain2d); 
  var sup_riga_3d_inf = MAP(BEZIER(S1)([riga3c_inf,riga3h_inf]))(domain2d); 
  var sup_riga_3e_inf = MAP(BEZIER(S1)([riga3f_inf,riga3e_inf]))(domain2d); 
  var sup_riga3_inf = STRUCT([sup_riga_3a_inf,sup_riga_3b_inf,sup_riga_3c_inf,sup_riga_3d_inf,sup_riga_3e_inf]);

  var sup_riga_3a = MAP(BEZIER(S1)([riga3a,riga3l]))(domain2d);
  var sup_riga_3b = MAP(BEZIER(S1)([riga3b,riga3i]))(domain2d); 
  var sup_riga_3c = MAP(BEZIER(S1)([riga3g,riga3d]))(domain2d); 
  var sup_riga_3d = MAP(BEZIER(S1)([riga3c,riga3h]))(domain2d); 
  var sup_riga_3e = MAP(BEZIER(S1)([riga3f,riga3e]))(domain2d); 
  var sup_riga3 = STRUCT([sup_riga_3a,sup_riga_3b,sup_riga_3c,sup_riga_3d,sup_riga_3e]);

  var sup_riga_3a_c1 = MAP(BEZIER(S1)([riga3a,riga3a_inf]))(domain2d); 
    var sup_riga_3a_c2 = MAP(BEZIER(S1)([riga3b,riga3b_inf]))(domain2d); 
    var sup_riga_3a_c3 = MAP(BEZIER(S1)([riga3c,riga3c_inf]))(domain2d); 
    var sup_riga_3a_c4 = MAP(BEZIER(S1)([riga3d,riga3d_inf]))(domain2d); 
    var sup_riga_3a_c5 = MAP(BEZIER(S1)([riga3e,riga3e_inf]))(domain2d); 
    var sup_riga_3a_c6 = MAP(BEZIER(S1)([riga3f,riga3f_inf]))(domain2d); 
    var sup_riga_3a_c7 = MAP(BEZIER(S1)([riga3g,riga3g_inf]))(domain2d); 
    var sup_riga_3a_c8 = MAP(BEZIER(S1)([riga3h,riga3h_inf]))(domain2d); 
    var sup_riga_3a_c9 = MAP(BEZIER(S1)([riga3i,riga3i_inf]))(domain2d); 
    var sup_riga_3a_c10 = MAP(BEZIER(S1)([riga3l,riga3l_inf]))(domain2d); 
    var sup_riga_3a_c11 = MAP(BEZIER(S1)([riga3m,riga3m_inf]))(domain2d);
  var sup_riga3_contorno = STRUCT([sup_riga_3a_c1,sup_riga_3a_c2,sup_riga_3a_c3,sup_riga_3a_c4,sup_riga_3a_c5,sup_riga_3a_c6,sup_riga_3a_c7,sup_riga_3a_c8,sup_riga_3a_c9,sup_riga_3a_c10,sup_riga_3a_c11]);

  var riga3 = COLOR([1,0,0])(STRUCT([sup_riga3_inf,sup_riga3,sup_riga3_contorno]));

  var riga4a_inf = BEZIER(S0)([[1.036, 4.2,0],[6.175, 4.204,0]]);
  var riga4b_inf = BEZIER(S0)([[6.175, 4.204,0],[8.56, 4.989,0]]);
  var riga4c_inf = BEZIER(S0)([[8.652, 4.974,0],[8.56, 4.989,0]]);
  var riga4d_inf = BEZIER(S0)([[8.652, 4.974,0], [8.811, 4.591,0], [8.909, 4.38,0], [9.206, 4.189,0]]);
  var riga4e_inf = BEZIER(S0)([[9.206, 4.189,0],[10.756, 4.214,0]]);
  var riga4f_inf = BEZIER(S0)([[10.943, 4.976,0],[10.756, 4.214,0]]);
  var riga4g_inf = BEZIER(S0)([[8.881, 4.989,0],[10.943, 4.976,0]]);
  var riga4h_inf = BEZIER(S0)([[8.881, 4.989,0],[8.568, 5.601,0]]);
  var riga4i_inf = BEZIER(S0)([[6.818, 4.976,0],[8.568, 5.601,0]]);
  var riga4l_inf = BEZIER(S0)([[1.218, 4.964,0],[6.818, 4.976,0]]);
  var riga4m_inf = BEZIER(S0)([[1.218, 4.964,0],[1.036, 4.2,0]]);

  var riga4a = BEZIER(S0)([[1.036, 4.2,h],[6.175, 4.204,h]]);
  var riga4b = BEZIER(S0)([[6.175, 4.204,h],[8.56, 4.989,h]]);
  var riga4c = BEZIER(S0)([[8.652, 4.974,h],[8.56, 4.989,h]]);
  var riga4d = BEZIER(S0)([[8.652, 4.974,h], [8.811, 4.591,h], [8.909, 4.38,h], [9.206, 4.189,h]]);
  var riga4e = BEZIER(S0)([[9.206, 4.189,h],[10.756, 4.214,h]]);
  var riga4f = BEZIER(S0)([[10.943, 4.976,h],[10.756, 4.214,h]]);
  var riga4g = BEZIER(S0)([[8.881, 4.989,h],[10.943, 4.976,h]]);
  var riga4h = BEZIER(S0)([[8.881, 4.989,h],[8.568, 5.601,h]]);
  var riga4i = BEZIER(S0)([[6.818, 4.976,h],[8.568, 5.601,h]]);
  var riga4l = BEZIER(S0)([[1.218, 4.964,h],[6.818, 4.976,h]]);
  var riga4m = BEZIER(S0)([[1.218, 4.964,h],[1.036, 4.2,h]]);

  var sup_riga_4a_inf = MAP(BEZIER(S1)([riga4a_inf,riga4l_inf]))(domain2d);
  var sup_riga_4b_inf = MAP(BEZIER(S1)([riga4b_inf,riga4i_inf]))(domain2d); 
  var sup_riga_4c_inf = MAP(BEZIER(S1)([riga4g_inf,riga4d_inf]))(domain2d); 
  var sup_riga_4d_inf = MAP(BEZIER(S1)([riga4c_inf,riga4h_inf]))(domain2d); 
  var sup_riga_4e_inf = MAP(BEZIER(S1)([riga4f_inf,riga4e_inf]))(domain2d); 
  var sup_riga4_inf = STRUCT([sup_riga_4a_inf,sup_riga_4b_inf,sup_riga_4c_inf,sup_riga_4d_inf,sup_riga_4e_inf]);

  var sup_riga_4a = MAP(BEZIER(S1)([riga4a,riga4l]))(domain2d);
  var sup_riga_4b = MAP(BEZIER(S1)([riga4b,riga4i]))(domain2d); 
  var sup_riga_4c = MAP(BEZIER(S1)([riga4g,riga4d]))(domain2d); 
  var sup_riga_4d = MAP(BEZIER(S1)([riga4c,riga4h]))(domain2d); 
  var sup_riga_4e = MAP(BEZIER(S1)([riga4f,riga4e]))(domain2d); 
  var sup_riga4 = STRUCT([sup_riga_4a,sup_riga_4b,sup_riga_4c,sup_riga_4d,sup_riga_4e]);

  var sup_riga_4a_c1 = MAP(BEZIER(S1)([riga4a,riga4a_inf]))(domain2d); 
    var sup_riga_4a_c2 = MAP(BEZIER(S1)([riga4b,riga4b_inf]))(domain2d); 
    var sup_riga_4a_c3 = MAP(BEZIER(S1)([riga4c,riga4c_inf]))(domain2d); 
    var sup_riga_4a_c4 = MAP(BEZIER(S1)([riga4d,riga4d_inf]))(domain2d); 
    var sup_riga_4a_c5 = MAP(BEZIER(S1)([riga4e,riga4e_inf]))(domain2d); 
    var sup_riga_4a_c6 = MAP(BEZIER(S1)([riga4f,riga4f_inf]))(domain2d); 
    var sup_riga_4a_c7 = MAP(BEZIER(S1)([riga4g,riga4g_inf]))(domain2d); 
    var sup_riga_4a_c8 = MAP(BEZIER(S1)([riga4h,riga4h_inf]))(domain2d); 
    var sup_riga_4a_c9 = MAP(BEZIER(S1)([riga4i,riga4i_inf]))(domain2d); 
    var sup_riga_4a_c10 = MAP(BEZIER(S1)([riga4l,riga4l_inf]))(domain2d); 
    var sup_riga_4a_c11 = MAP(BEZIER(S1)([riga4m,riga4m_inf]))(domain2d);
  var sup_riga4_contorno = STRUCT([sup_riga_4a_c1,sup_riga_4a_c2,sup_riga_4a_c3,sup_riga_4a_c4,sup_riga_4a_c5,sup_riga_4a_c6,sup_riga_4a_c7,sup_riga_4a_c8,sup_riga_4a_c9,sup_riga_4a_c10,sup_riga_4a_c11]);

  var riga4 = COLOR([1,0,0])(STRUCT([sup_riga4_inf,sup_riga4,sup_riga4_contorno]));
 
  var logo = STRUCT([riga1,riga2,riga3,riga4]);


  var i_a_inf = BEZIER(S0)([[3.907, 0.588,0],[4.938, 0.557,0]]);
  var i_b_inf = BEZIER(S0)([[6.276, 4.988,0],[4.938, 0.557,0]]);
  var i_c_inf = BEZIER(S0)([[6.276, 4.988,0],[5.230, 4.988,0]]);
  var i_d_inf = BEZIER(S0)([[3.907, 0.588,0],[5.230, 4.988,0]]);
  var i_inf_a = MAP(BEZIER(S1)([i_a_inf,i_b_inf]))(domain2d);
  var i_inf_b = MAP(BEZIER(S1)([i_c_inf,i_d_inf]))(domain2d);
  var i_inf = STRUCT([i_inf_a,i_inf_b]);

  var i_a = BEZIER(S0)([[3.907, 0.588,h],[4.938, 0.557,h]]);
  var i_b = BEZIER(S0)([[6.276, 4.988,h],[4.938, 0.557,h]]);
  var i_c = BEZIER(S0)([[6.276, 4.988,h],[5.230, 4.988,h]]);
  var i_d = BEZIER(S0)([[3.907, 0.588,h],[5.230, 4.988,h]]);
  var i_a_sup = MAP(BEZIER(S1)([i_a,i_b]))(domain2d);
  var i_b_sup = MAP(BEZIER(S1)([i_c,i_d]))(domain2d);
  var i_sup = STRUCT([i_a_sup,i_b_sup]);

  var i_c1 = MAP(BEZIER(S1)([i_a,i_a_inf]))(domain2d);
  var i_c2 = MAP(BEZIER(S1)([i_b,i_b_inf]))(domain2d);
  var i_c3 = MAP(BEZIER(S1)([i_c,i_c_inf]))(domain2d);
  var i_c4 = MAP(BEZIER(S1)([i_d,i_d_inf]))(domain2d);
  var i_contorno = STRUCT([i_c1,i_c2,i_c3,i_c4]);

    var i = COLOR([64/255,64/255,64/255])(STRUCT([i_inf,i_sup,i_contorno]));

    var s_a_inf = BEZIER(S0)([[0.494, 2.186,0],[1.578, 2.176,0]]);
  var s_b_inf = BEZIER(S0)([[1.578, 2.176,0], [1.063, 0.843,0], [2.457, 1.216,0], [2.486, 1.73,0]]);
  var s_c_inf = BEZIER(S0)([[1.076, 3.919,0], [1.383, 2.595,0], [2.947, 2.78,0],[2.4866, 1.73,0]]);
  var s_d_inf = BEZIER(S0)([[1.076, 3.919,0], [0.909, 4.658,0], [1.887, 5.747,0], [2.464, 5.769,0],[3.043, 5.933,0], [4.962, 5.847,0], [4.254, 4.101,0]]);
  var s_f_inf = BEZIER(S0)([[3.163, 4.119,0],[4.254, 4.101,0]]);
  var s_g_inf = BEZIER(S0)([[2.417, 3.964,0], [1.971, 4.947,0],[3.588, 5.588,0],[3.163, 4.119,0]]);
  var s_h_inf = BEZIER(S0)([[2.417, 3.964,0], [2.618, 3.268,0], [4.101, 3.717,0], [3.707, 1.814,0]]);
  var s_i_inf = BEZIER(S0)([[0.967, 0.514,0],[3.111, -0.062,0],[3.548, 1.418,0],[3.707, 1.814,0]]);
  var s_l_inf = BEZIER(S0)([[0.494, 2.186,0], [0.034, 1.015,0],[0.637, 0.54,0],[0.967, 0.514,0]]);
  var s_inf_a = MAP(BEZIER(S1)([s_a_inf,s_l_inf]))(domain2d);
  var s_inf_b = MAP(BEZIER(S1)([s_b_inf,s_i_inf]))(domain2d);
  var s_inf_c = MAP(BEZIER(S1)([s_c_inf,s_h_inf]))(domain2d);
  var s_inf_d = MAP(BEZIER(S1)([s_d_inf,s_g_inf]))(domain2d);
  var s_inf = STRUCT([s_inf_a,s_inf_b,s_inf_c,s_inf_d]);

  var s_a = BEZIER(S0)([[0.494, 2.186,h],[1.578, 2.176,h]]);
  var s_b = BEZIER(S0)([[1.578, 2.176,h], [1.063, 0.843,h], [2.457, 1.216,h], [2.486, 1.73,h]]);
  var s_c = BEZIER(S0)([[1.076, 3.919,h], [1.383, 2.595,h], [2.947, 2.78,h],[2.4866, 1.73,h]]);
  var s_d = BEZIER(S0)([[1.076, 3.919,h], [0.909, 4.658,h], [1.887, 5.747,h], [2.464, 5.769,h],[3.043, 5.933,h], [4.962, 5.847,h], [4.254, 4.101,h]]);
  var s_f = BEZIER(S0)([[3.163, 4.119,h],[4.254, 4.101,h]]);
  var s_g = BEZIER(S0)([[2.417, 3.964,h], [1.971, 4.947,h],[3.588, 5.588,h],[3.163, 4.119,h]]);
  var s_h = BEZIER(S0)([[2.417, 3.964,h], [2.618, 3.268,h], [4.101, 3.717,h], [3.707, 1.814,h]]);
  var s_i = BEZIER(S0)([[0.967, 0.514,h],[3.111, -0.062,h],[3.548, 1.418,h],[3.707, 1.814,h]]);
  var s_l = BEZIER(S0)([[0.494, 2.186,h], [0.034, 1.015,h],[0.637, 0.54,h],[0.967, 0.514,h]]);
  var s_sup_a = MAP(BEZIER(S1)([s_a,s_l]))(domain2d);
  var s_sup_b = MAP(BEZIER(S1)([s_b,s_i]))(domain2d);
  var s_sup_c = MAP(BEZIER(S1)([s_c,s_h]))(domain2d);
  var s_sup_d = MAP(BEZIER(S1)([s_d,s_g]))(domain2d);
  var s_sup = STRUCT([s_sup_a,s_sup_b,s_sup_c,s_sup_d]);

  var s_c1 = MAP(BEZIER(S1)([s_a,s_a_inf]))(domain2d);
  var s_c2 = MAP(BEZIER(S1)([s_b,s_b_inf]))(domain2d);
  var s_c3 = MAP(BEZIER(S1)([s_c,s_c_inf]))(domain2d);
  var s_c4 = MAP(BEZIER(S1)([s_d,s_d_inf]))(domain2d);
  var s_c5 = MAP(BEZIER(S1)([s_f,s_f_inf]))(domain2d);
  var s_c6 = MAP(BEZIER(S1)([s_g,s_g_inf]))(domain2d);
  var s_c7 = MAP(BEZIER(S1)([s_h,s_h_inf]))(domain2d);
  var s_c8 = MAP(BEZIER(S1)([s_i,s_i_inf]))(domain2d);
  var s_c9 = MAP(BEZIER(S1)([s_l,s_l_inf]))(domain2d);
  var s_contorno = STRUCT([s_c1,s_c2,s_c3,s_c4,s_c5,s_c6,s_c7,s_c8,s_c9]);

  var s = COLOR([64/255,64/255,64/255])(STRUCT([s_inf,s_sup,s_contorno]));

  var p_a_inf = BEZIER(S0)([[5.795, 0.58,0],[6.801, 0.57,0]]);
  var p_b_inf = BEZIER(S0)([[6.801, 0.57,0],[7.083, 1.535,0]]);
  var p_c_inf = BEZIER(S0)([[7.083, 1.535,0],[8.51, 1.522,0]]);
  var p_d_inf = BEZIER(S0)([[8.51, 1.522,0], [9.304, 1.727,0], [10.353, 4.855,0], [9.136, 4.975,0]]);
  var p_f_inf = BEZIER(S0)([[9.136, 4.975,0],[7.1213, 5.005,0]]);
  var p_g_inf = BEZIER(S0)([[5.795, 0.58,0],[7.1213, 5.005,0]]);

  var p_h_inf = BEZIER(S0)([[7.362, 2.377,0],[7.952, 2.375,0]]);
  var p_i_inf = BEZIER(S0)([[7.952, 2.375,0], [8.437, 2.493,0], [8.77, 4.271,0], [8.452, 4.225,0]]);
  var p_l_inf = BEZIER(S0)([[8.452, 4.225,0],[7.952, 4.211,0]]);
  var p_m_inf = BEZIER(S0)([[7.362, 2.377,0],[7.952, 4.211,0]]);
  var p_inf_a = MAP(BEZIER(S1)([p_d_inf,p_i_inf]))(domain2d);
  var p_inf_b = MAP(BEZIER(S1)([p_c_inf,p_h_inf]))(domain2d);
  var p_inf_c = MAP(BEZIER(S1)([p_f_inf,p_l_inf]))(domain2d);
  var p_inf_d = MAP(BEZIER(S1)([p_b_inf,p_g_inf]))(domain2d);
  var p_inf_e = MAP(BEZIER(S1)([p_m_inf,p_g_inf]))(domain2d);
  var p_inf_f = MAP(BEZIER(S1)([p_a_inf,p_m_inf]))(domain2d);
  var p_inf = STRUCT([p_inf_a,p_inf_b,p_inf_c,p_inf_d,p_inf_e,p_inf_f]);

  var p_a_sup = BEZIER(S0)([[5.795, 0.58,h],[6.801, 0.57,h]]);
  var p_b_sup = BEZIER(S0)([[6.801, 0.57,h],[7.083, 1.535,h]]);
  var p_c_sup = BEZIER(S0)([[7.083, 1.535,h],[8.51, 1.522,h]]);
  var p_d_sup = BEZIER(S0)([[8.51, 1.522,h], [9.304, 1.727,h], [10.353, 4.855,h], [9.136, 4.975,h]]);
  var p_f_sup = BEZIER(S0)([[9.136, 4.975,h],[7.1213, 5.005,h]]);
  var p_g_sup = BEZIER(S0)([[5.795, 0.58,h],[7.1213, 5.005,h]]);

  var p_h_sup = BEZIER(S0)([[7.362, 2.377,h],[7.952, 2.375,h]]);
  var p_i_sup = BEZIER(S0)([[7.952, 2.375,h], [8.437, 2.493,h], [8.77, 4.271,h], [8.452, 4.225,h]]);
  var p_l_sup = BEZIER(S0)([[8.452, 4.225,h],[7.952, 4.211,h]]);
  var p_m_sup = BEZIER(S0)([[7.362, 2.377,h],[7.952, 4.211,h]]);
  var p_sup_a = MAP(BEZIER(S1)([p_d_sup,p_i_sup]))(domain2d);
  var p_sup_b = MAP(BEZIER(S1)([p_c_sup,p_h_sup]))(domain2d);
  var p_sup_c = MAP(BEZIER(S1)([p_f_sup,p_l_sup]))(domain2d);
  var p_sup_d = MAP(BEZIER(S1)([p_b_sup,p_g_sup]))(domain2d);
  var p_sup_e = MAP(BEZIER(S1)([p_m_sup,p_g_sup]))(domain2d);
  var p_sup_f = MAP(BEZIER(S1)([p_a_sup,p_m_sup]))(domain2d);
  var p_sup = STRUCT([p_sup_a,p_sup_b,p_sup_c,p_sup_d,p_sup_e,p_sup_f]);

  var p_c1 = MAP(BEZIER(S1)([p_a_sup,p_a_inf]))(domain2d);
  var p_c2 = MAP(BEZIER(S1)([p_b_sup,p_b_inf]))(domain2d);
  var p_c3 = MAP(BEZIER(S1)([p_c_sup,p_c_inf]))(domain2d);
  var p_c4 = MAP(BEZIER(S1)([p_d_sup,p_d_inf]))(domain2d);
  var p_c5 = MAP(BEZIER(S1)([p_f_sup,p_f_inf]))(domain2d);
  var p_c6 = MAP(BEZIER(S1)([p_g_sup,p_g_inf]))(domain2d);
  var p_c7 = MAP(BEZIER(S1)([p_h_sup,p_h_inf]))(domain2d);
  var p_c8 = MAP(BEZIER(S1)([p_i_sup,p_i_inf]))(domain2d);
  var p_c9 = MAP(BEZIER(S1)([p_l_sup,p_l_inf]))(domain2d);
  var p_c10 = MAP(BEZIER(S1)([p_m_sup,p_m_inf]))(domain2d);
  var p_contorno = STRUCT([p_c1,p_c2,p_c3,p_c4,p_c5,p_c6,p_c7,p_c8,p_c9,p_c10]);

  var p = COLOR([64/255,64/255,64/255])(STRUCT([p_inf,p_sup,p_contorno]));

  var sip = TRANSLATE([0])([10.943])(STRUCT([i,s,p]));
  var logo_sip=TRANSLATE([0,1])([-0.175,-0.582])(STRUCT([sip,logo]));

  return logo_sip;
}

var pannel = function(l,h,r,s) {
  var lung = TRANSLATE([0,1])([-l/2,-(h-2*r)/2])(CUBOID([l,h-2*r,s]));
  var alt = TRANSLATE([0,1])([-(l-(2*r))/2,-h/2])(CUBOID([l-(2*r),h,s]));
  var cerchio = EXTRUDE([s])(arc(2*PI,0,r));
  var circ1 = TRANSLATE([0,1])([-l/2+r,h/2-r])(EXTRUDE([s])(cerchio));
  var circ2 = TRANSLATE([0,1])([+l/2-r,h/2-r])(EXTRUDE([s])(cerchio));
  var circ3 = TRANSLATE([0,1])([-l/2+r,-h/2+r])(EXTRUDE([s])(cerchio));
  var circ4 = TRANSLATE([0,1])([+l/2-r,-h/2+r])(EXTRUDE([s])(cerchio));
  var bluePannel = COLOR(realblue)(TRANSLATE([2])([1])(STRUCT([lung,alt,circ1,circ2,circ3,circ4])));
  return bluePannel;

}

var console = function(h,a,b) {
  var un = TRANSLATE([0,1])([-h-a,h/2+b/2+h+b])(ROTATE([0,1])(-PI/2)(uno(h)));
  var du = TRANSLATE([1])([h/2+b/2+h+b])(due(h));
  var tr = TRANSLATE([0,1])([h+a,h/2+b/2+h+b])(tre(h));
  var quatt = TRANSLATE([0,1])([-h-a,h/2+b/2])(quattro(h));
  var cin = TRANSLATE([1])([h/2+b/2])(cinque(h));
  var se = TRANSLATE([0,1])([h+a,h/2+b/2])(sei(h));
  var sett = TRANSLATE([0,1])([-h-a,-h/2-b/2])(sette(h));
  var ott = TRANSLATE([1])([-h/2-b/2])(otto(h));
  var nov = TRANSLATE([0,1])([h+a,-h/2-b/2])(nove(h));
  var zer = TRANSLATE([1])([-h/2-b/2-h-b])(zero(h));
  var ast = TRANSLATE([0,1])([-h-a,-h/2-b/2-h-b])(asterisco(h));
  var canc = TRANSLATE([0,1])([h+a,-h/2-b/2-h-b])(cancelletto(h));

  var tast_spec_rp = TRANSLATE([0,1])([h+a+8,-h/2-b/2])(rp(h));
  var tast_spec_p =  TRANSLATE([0,1])([h+a+8,-h/2-b/2-h-b])(pii_but(h));
  var logo = TRANSLATE([0,1,2])([-14,h/2+b/2+b+h/2,0.9])(SCALE([0,1])([0.25,0.25])(logo_sip(0.5)));
  var tastiera = TRANSLATE([2])([-0.2])(STRUCT([cin,ott,du,zer,un,tr,quatt,se,sett,nov,ast,canc,tast_spec_rp,tast_spec_p]));
  
  var tot = STRUCT([tastiera,pannel(35,15,0.5,0.3),logo])
  return tot;

}

var body = function() {

  var frontSx = BEZIER(S0)([[-17.5+0.5,-7,1.2],[-17.5+0.5,-12,1.7],[-17.5+0.5,-12,-4.7],[-17.5+0.5,-7,-4.2]]);
  var frontDx = BEZIER(S0)([[17.5-0.5,-7,1.2],[17,-12,1.7],[17,-12,-4.7],[17.5-0.5,-7,-4.2]]);
  var latSxDown = BEZIER(S0)([[-17,-7,1.2],[-22,-7,1.7],[-22,-7,-4.7],[-17,-7,-4.2]]);
  var latSxUp = BEZIER(S0)([[-17,7,1.2],[-22,7,1.7],[-22,7,-4.7],[-17,7,-4.2]]);
  var latDxDown = BEZIER(S0)([[17,-7,1.2],[22,-7,1.7],[22,-7,-4.7],[17,-7,-4.2]]);
  var latDxUp = BEZIER(S0)([[17,7,1.2],[22,7,1.7],[22,7,-4.7],[17,7,-4.2]]);

  var angSxDown = BEZIER(S0)([[-17+17,-7+7,1.2],[-22+17,-7+7,1.7],[-22+17,-7+7,-4.7],[-17+17,-7+7,-4.2]]);
  var dom_quarto = DOMAIN([[0,1],[0,PI/2]])([16,16]);
  var angSxDownMap = ROTATIONAL_SURFACE(angSxDown);
  var angSxDownSup = TRANSLATE([0,1])([-17,-7])(MAP(angSxDownMap)(dom_quarto));
  var angDxDownSup = TRANSLATE([0,1])([+17,-7])(ROTATE([0,1])(PI/2)(MAP(angSxDownMap)(dom_quarto)));

  var rearSx = BEZIER(S0)([[-17.5+0.5,7,1.2],[-17.5+0.5,10.5,1.7],[-17.5+0.5,10.5,-4.7],[-17.5+0.5,7,-4.2]]);
  var rearDx = BEZIER(S0)([[17.5-0.5,7,1.2],[17,10.5,1.7],[17,10.5,-4.7],[17.5-0.5,7,-4.2]]);
  var surRear = MAP(BEZIER(S1)([rearSx,rearDx]))(domain2d);

  var lineRearDx1 = BEZIER(S0)([[17-17,7-7,1.2],[17-17,10.5-7,1.7],[17-17,10.5-7,-4.7],[17-17,7-7,-4.2]]);
  var lineRearDx2 = BEZIER(S0)([[17-17,7-7,1.2],[(10.625-7)*SIN((PI)/24),(10.625-7)*COS(-(PI)/24),1.7],[(10.625-7)*SIN((PI)/24),(10.625-7)*COS(-(PI)/24),-4.7],[17-17,7-7,-4.2]]);
  var lineRearDx3 = BEZIER(S0)([[17-17,7-7,1.2],[(10.75-7)*SIN((PI*2)/24),(10.75-7)*COS(-(PI*2)/24),1.7],[(10.75-7)*SIN((PI*2)/24),(10.75-7)*COS(-(PI*2)/24),-4.7],[17-17,7-7,-4.2]]);
  var lineRearDx4 = BEZIER(S0)([[17-17,7-7,1.2],[(10.875-7)*SIN((PI*3)/24),(10.875-7)*COS(-(PI*3)/24),1.7],[(10.875-7)*SIN((PI*3)/24),(10.875-7)*COS(-(PI*3)/24),-4.7],[17-17,7-7,-4.2]]);
  var lineRearDx5 = BEZIER(S0)([[17-17,7-7,1.2],[(11-7)*SIN((PI*4)/24),(11-7)*COS(-(PI*4)/24),1.7],[(11-7)*SIN((PI*4)/24),(11-7)*COS(-(PI*4)/24),-4.7],[17-17,7-7,-4.2]]);
  var lineRearDx6 = BEZIER(S0)([[17-17,7-7,1.2],[(11.125-7)*SIN((PI*5)/24),(11.125-7)*COS(-(PI*5)/24),1.7],[(11.125-7)*SIN((PI*5)/24),(11.125-7)*COS(-(PI*5)/24),-4.7],[17-17,7-7,-4.2]]);
  
  var lineRearDx7 = BEZIER(S0)([[17-17,7-7,1.2],[(11.25-7)*SIN((PI*6)/24),(11.25-7)*COS(-(PI*6)/24),1.7],[(11.25-7)*SIN((PI*6)/24),(11.25-7)*COS(-(PI*6)/24),-4.7],[17-17,7-7,-4.2]]);
  var lineRearDx8 = BEZIER(S0)([[17-17,7-7,1.2],[(11.375-7)*SIN((PI*7)/24),(11.375-7)*COS(-(PI*7)/24),1.7],[(11.375-7)*SIN((PI*7)/24),(11.375-7)*COS(-(PI*7)/24),-4.7],[17-17,7-7,-4.2]]);
  var lineRearDx9 = BEZIER(S0)([[17-17,7-7,1.2],[(11.5-7)*SIN((PI*8)/24),(11.5-7)*COS(-(PI*8)/24),1.7],[(11.5-7)*SIN((PI*8)/24),(11.5-7)*COS(-(PI*8)/24),-4.7],[17-17,7-7,-4.2]]);
  var lineRearDx10 = BEZIER(S0)([[17-17,7-7,1.2],[(11.625-7)*SIN((PI*9)/24),(11.625-7)*COS(-(PI*9)/24),1.7],[(11.625-7)*SIN((PI*9)/24),(11.625-7)*COS(-(PI*9)/24),-4.7],[17-17,7-7,-4.2]]);
  var lineRearDx11 = BEZIER(S0)([[17-17,7-7,1.2],[(11.75-7)*SIN((PI*10)/24),(11.75-7)*COS(-(PI*10)/24),1.7],[(11.75-7)*SIN((PI*10)/24),(11.75-7)*COS(-(PI*10)/24),-4.7],[17-17,7-7,-4.2]]);
  var lineRearDx12 = BEZIER(S0)([[17-17,7-7,1.2],[(11.875-7)*SIN((PI*11)/24),(11.875-7)*COS(-(PI*11)/24),1.7],[(11.875-7)*SIN((PI*11)/24),(11.875-7)*COS(-(PI*11)/24),-4.7],[17-17,7-7,-4.2]]);
  var lineRearDx13 = BEZIER(S0)([[17-17,7-7,1.2],[(12-7)*SIN((PI*12)/24),(12-7)*COS(-(PI*12)/24),1.7],[(12-7)*SIN((PI*12)/24),(12-7)*COS(-(PI*12)/24),-4.7],[17-17,7-7,-4.2]]);

  var angDxUpSup1 = MAP(BEZIER(S1)([lineRearDx1,lineRearDx2]))(domain2d);
  var angDxUpSup2 = MAP(BEZIER(S1)([lineRearDx2,lineRearDx3]))(domain2d);
  var angDxUpSup3 = MAP(BEZIER(S1)([lineRearDx3,lineRearDx4]))(domain2d);
  var angDxUpSup4 = MAP(BEZIER(S1)([lineRearDx4,lineRearDx5]))(domain2d);
  var angDxUpSup5 = MAP(BEZIER(S1)([lineRearDx5,lineRearDx6]))(domain2d);
  var angDxUpSup6 = MAP(BEZIER(S1)([lineRearDx6,lineRearDx7]))(domain2d);
  var angDxUpSup7 = MAP(BEZIER(S1)([lineRearDx7,lineRearDx8]))(domain2d);
  var angDxUpSup8 = MAP(BEZIER(S1)([lineRearDx8,lineRearDx9]))(domain2d);
  var angDxUpSup9 = MAP(BEZIER(S1)([lineRearDx9,lineRearDx10]))(domain2d);
  var angDxUpSup10 = MAP(BEZIER(S1)([lineRearDx10,lineRearDx11]))(domain2d);
  var angDxUpSup11 = MAP(BEZIER(S1)([lineRearDx11,lineRearDx12]))(domain2d);
  var angDxUpSup12 = MAP(BEZIER(S1)([lineRearDx12,lineRearDx13]))(domain2d);
  var angDxUpSup = TRANSLATE([0,1])([+17,7])(STRUCT([angDxUpSup1,angDxUpSup2,angDxUpSup3,angDxUpSup4,angDxUpSup5,angDxUpSup6,angDxUpSup7,angDxUpSup8,angDxUpSup9,angDxUpSup10,angDxUpSup11,angDxUpSup12]));
  var angSxUpSup = TRANSLATE([0,1,2])([-17,+7,-3])(ROTATE([0,2])(-PI)(TRANSLATE([0,1])([-17,-7])(angDxUpSup)));

  var fondo = TRANSLATE([2])([-1-4.2])(pannel(35,15,0.5,0.3));

  var surFront = MAP(BEZIER(S1)([frontSx,frontDx]))(domain2d);
  var surSx = MAP(BEZIER(S1)([latSxDown,latSxUp]))(domain2d);
  var surDx = MAP(BEZIER(S1)([latDxDown,latDxUp]))(domain2d);
  var bod = COLOR(beige)(STRUCT([surFront,surSx,surDx,angSxDownSup,angDxDownSup,surRear,fondo,angDxUpSup,angSxUpSup]));
  var consol = console(2,1.5,1.5);
  var mainBody = TRANSLATE([2])([-1])(ROTATE([1,2])(PI/34)(STRUCT([bod,consol])));
  return mainBody;

}

var base = function() {

  var base = TRANSLATE([2])([-1])(pannel(35,15,0.5,5)); 
  var tondino = EXTRUDE([30])(arc(2*PI,0,0.5));
  var tondinoPicc = EXTRUDE([30])(arc(2*PI,0,0.3));
  var tondinoPiccVert = EXTRUDE([3.3])(arc(2*PI,0,0.3));
  var tondinoPiccBis = EXTRUDE([34.4])(arc(2*PI,0,0.3));
  var tondinoBis = EXTRUDE([34])(arc(2*PI,0,0.5));
  var tondino1 = TRANSLATE([0,1])([17,-7])(ROTATE([1,2])(-PI/2)(tondino));
  var tondino2 = TRANSLATE([0])([-34])(tondino1);
  var tondino3 = TRANSLATE([0,1])([-17,-7])(ROTATE([0,2])(PI/2)(tondinoBis));
  var tondino4 = TRANSLATE([1])([30])(tondino3);

  var tondino5 = ROTATE([1,2])(-PI/2)(tondinoPicc);

  var ball1 = TRANSLATE([0,1])([-17,-7])(sphere(0.5));
  var ball2 = TRANSLATE([0])([34])(ball1);
  var ball3 = TRANSLATE([1])([30])(ball1);
  var ball4 = TRANSLATE([1])([30])(ball2);
  var ball5 = TRANSLATE([1])([30])(sphere(0.3));
  var tond5 = TRANSLATE([0,1,2])([17.2,-7,0.55])(ROTATE([1,2])(PI/34)(STRUCT([tondino5,ball5])));
  var tond6 = TRANSLATE([0,1,2])([-17.2,-7,0.55])(ROTATE([1,2])(PI/34)(STRUCT([tondino5,ball5])));
  var tond7 = TRANSLATE([1,2])([-0.23,1.19])(ROTATE([1,2])(PI/34)(TRANSLATE([0,1])([-17.2,23.2])(ROTATE([0,2])(PI/2)(tondinoPiccBis))));
  var tond8 =  TRANSLATE([0,1])([-17.15,23.142])(ROTATE([0,2])(-PI/178)(ROTATE([1,2])(PI/38)(tondinoPiccVert)));
  var tond9 =  TRANSLATE([0,1])([17.15,23.142])(ROTATE([0,2])(PI/178)(ROTATE([1,2])(PI/38)(tondinoPiccVert)));
  var bas = TRANSLATE([0,1,2])([-17,-7,-0.5])(CUBOID([34,30,0.5]));

  var lineRearSxa = BEZIER(S0)([[-17.15,0,0],[-17.19,0,3.365]]);
  var lineRearDxb = BEZIER(S0)([[17.15,0,0],[17.19,0,3.365]]);
  var supRear = MAP(BEZIER(S1)([lineRearSxa,lineRearDxb]))(domain2d);
  var supRearT = TRANSLATE([1])([23.443])(ROTATE([1,2])(PI/38)(supRear));

  var lineSupDx = BEZIER(S0)([[17.2,0,0],[17.2,0,30]]);
  var lineSupSx = BEZIER(S0)([[-17.2,0,0],[-17.2,0,30]]);
  var supSup = MAP(BEZIER(S1)([lineSupDx,lineSupSx]))(domain2d);
  var supSupT = TRANSLATE([1,2])([-7,0.85])(ROTATE([1,2])(PI/34)(ROTATE([1,2])(-PI/2)(supSup)));

  var lineSxa = BEZIER(S0)([[-17.45,23.143,0],[-17.53,22.9,3.365]]);
  var lineSxb = BEZIER(S0)([[-17.45,5,0],[-17.42,5,1.455]]);
  var supSx = MAP(BEZIER(S1)([lineSxa,lineSxb]))(domain2d);

  var lineDxa = BEZIER(S0)([[+17.45,23.143,0],[+17.53,22.9,3.365]]);
  var lineDxb = BEZIER(S0)([[+17.45,5,0],[+17.42,5,1.455]]);
  var supDx = MAP(BEZIER(S1)([lineDxa,lineDxb]))(domain2d);

  var piede = COLOR(beige)(EXTRUDE([0.6])(arc(2*PI,0,0.8)));
  var gommino = COLOR(carbon)(EXTRUDE([0.7])(arc(2*PI,0,0.6)));
  var piedino1 = TRANSLATE([0,1])([-15.5,-5.5])(ROTATE([0,2])(PI)(STRUCT([piede,gommino])));
  var piedino2 = TRANSLATE([0])([31])(piedino1);
  var piedino3 = TRANSLATE([0,1])([4,27])(piedino1);
  var piedino4 = TRANSLATE([0,1])([-4,27])(piedino2);

  var foroCic1= COLOR(carbon)(ROTATE([0,2])(PI)(EXTRUDE([0.501])(arc(2*PI,0,0.15))));
  var foroCic2 = TRANSLATE([0])([0.6])(foroCic1);
  var foroCic3 = TRANSLATE([0])([0.6])(foroCic2);
  var foriCic2 = STRUCT(REPLICA(6)([foroCic2,ROTATE([0,1])(2*PI/6)]));
  var foriCic3 = STRUCT(REPLICA(12)([foroCic3,ROTATE([0,1])(2*PI/12)]));

  var attacco =  COLOR(carbon)(TRANSLATE([0,1,2])([8.7,22.4,0.7])(ROTATE([1,2])(PI/40)(pulsante_num(2))));
  var attacco2 =  COLOR(carbon)(TRANSLATE([0,1,2])([-9.7,21.4,0.7])(ROTATE([1,2])(PI/40)(CUBOID([1.5,2,2]))));

  var foriCicalino = TRANSLATE([0])([-10])(STRUCT([foroCic1,foriCic2,foriCic3]));0
  var chassy = COLOR(beige)(STRUCT([base,tondino1,tondino2,tondino3,tondino4,tond5,tond6,tond7,tond8,tond9,ball1,ball2,ball3,ball4,bas,supRearT,supSupT,supSx,supDx]));
  var piedini = STRUCT([piedino1,piedino2,piedino3,piedino4]);
  var tot = TRANSLATE([2])([-5.2-1])(STRUCT([piedini,chassy,foriCicalino,attacco,attacco2]));
  return tot;
}

var cornetta = function() {

  var cLongFront = BEZIER(S0)([[-21.5,10.5,-3.5],[-24.8,9,7],[24.8,9,7],[21.5,10.5,-3.5]]); 
  var cShortFront = BEZIER(S0)([[-12,10.5,-3.5],[-12,9.7,1.6],[-14,9.7,1.6],[14,9.7,1.6],[12.5,9.7,1.6],[12,10.5,-3.5]]); 
  var supFront = MAP(CUBIC_HERMITE(S1)([cLongFront,cShortFront,[0,-3.5,0],[0,3.5,0]]))(domain2dcorn); 
  var cLongRear = BEZIER(S0)([[-21.5,20,-2.7],[-24.8,18.5,7.8],[24.8,18.5,7.8],[21.5,20,-2.7]]); 
  var cShortRear = BEZIER(S0)([[-12,20,-2.7],[-12,19.2,2.4],[-14,19.2,2.4],[14,19.2,2.4],[12.5,19.2,2.4],[12,20,-2.7]]); 

  var supSup = MAP(CUBIC_HERMITE(S1)([cLongRear,cLongFront,[0,0,0.4],[0,0,0.4]]))(domain2dcorn);
  var supDow = MAP(CUBIC_HERMITE(S1)([cShortRear,cShortFront,[0,0,-0.3],[0,0,-0.3]]))(domain2dcorn);
  var supRear = MAP(CUBIC_HERMITE(S1)([cLongRear,cShortRear,[0,3.5,0],[0,-3.5,0]]))(domain2dcorn); 

  var lineFrontSx = CUBIC_HERMITE(S0)([[-21.5,10.5,-3.5],[-12,10.5,-3.5],[0,-3.5,0],[0,3.5,0]]);
  var lineRearSx = CUBIC_HERMITE(S0)([[-21.5,20,-2.7],[-12,20,-2.7],[0,3.5,0],[0,-3.5,0]]);  
  var supTappoSx = MAP(CUBIC_HERMITE(S1)([lineFrontSx,lineRearSx,[0,0,0],[0,0,0]]))(domain2dcorn); 

  var lineFrontDx = CUBIC_HERMITE(S0)([[21.5,10.5,-3.5],[12,10.5,-3.5],[0,-3.5,0],[0,3.5,0]]);
  var lineRearDx = CUBIC_HERMITE(S0)([[21.5,20,-2.7],[12,20,-2.7],[0,3.5,0],[0,-3.5,0]]);  
  var supTappoDx = MAP(CUBIC_HERMITE(S1)([lineFrontDx,lineRearDx,[0,0,0],[0,0,0]]))(domain2dcorn);

  var attacco =  COLOR(carbon)(TRANSLATE([0,1,2])([-21.68,15.25,-2.9])(ROTATE([1,2])(PI/36)(CUBOID([2,1.5,2]))));

  var cornetta = COLOR(beige)(TRANSLATE([1])([0.9])(STRUCT([supFront,supSup,supDow,supRear,supTappoSx,supTappoDx])));
  var cornettaTot = STRUCT([cornetta,attacco]);
  return cornettaTot;
}

var sottoCornetta = function() {
  var spess = -0.4;
  var lineSottCornSxA = BEZIER(S0)([[-10,8,-0.5],[-10,22.5,0.6]]);
  var lineSottCornSxDownA = BEZIER(S0)([[-10,8,-4],[-10,22.5,-4]]);
  var lineSottCornDxDownA = BEZIER(S0)([[10,8,-4],[10,22.5,-4]]);
  var lineSottCornDxA = BEZIER(S0)([[10,8,-0.5],[10,22.5,0.6]]);
  var lineSottoCornA = BEZIER(S0)([[-10,8,-0.5],[10,8,-0.5]]);
  var lineSottoCornB = BEZIER(S0)([[-10,8,-0.5-spess],[10,8,-0.5-spess]]);
  var lineSottCornCurvA= BEZIER(S0)([[-10,22.5,0.6],[-5,17,0.3],[5,17,0.3],[10,22.5,0.6]]);

  var lineCurvSottCornSx = BEZIER(S0)([[-12,9,-4.2],[-12,22.5,-2.7]]);
  var lineCurvSottCornDx = BEZIER(S0)([[12,9,-4.2],[12,22.5,-2.7]]);

  var lineSottCornSxB = BEZIER(S0)([[-10,8,-0.5-spess],[-10,22.5,0.6-spess]]);
  var lineSottCornDxB = BEZIER(S0)([[10,8,-0.5-spess],[10,22.5,0.6-spess]]);
  var lineSottCornCurvB= BEZIER(S0)([[-10,22.5,0.6-spess],[-5,17,0.3-spess],[5,17,0.3-spess],[10,22.5,0.6-spess]]);

  var supCurvSottCornSx = MAP(CUBIC_HERMITE(S1)([lineSottCornSxB,lineCurvSottCornSx,[-5,0,0],[-5,0,0]]))(domain2dcorn);
  var supCurvSottCornDx = MAP(CUBIC_HERMITE(S1)([lineSottCornDxB,lineCurvSottCornDx,[5,0,0],[5,0,0]]))(domain2dcorn);

  var supCurvSxA = CUBIC_HERMITE(S0)([[-10,22.5,1],[-17.4,22.5,-2.65],[-15,0,0],[0,0,0]]);
  var supCurvSxAa = CUBIC_HERMITE(S0)([[-10,22.5,1],[-10,22.5,-2.65],[0,0,0],[0,0,0]]);

  var supCurvSxB = CUBIC_HERMITE(S0)([[-10,22.5-spess,1],[-17.4,22.5-spess,-2.65],[-15,0,0],[0,0,0]]);
  var supCurvSxBb = CUBIC_HERMITE(S0)([[-10,22.5-spess,1],[-10,22.5-spess,-2.65],[0,0,0],[0,0,0]]);

  var supCurvDxB = CUBIC_HERMITE(S0)([[10,22.5-spess,1],[17.4,22.5-spess,-2.65],[15,0,0],[0,0,0]]);
  var supCurvDxBb = CUBIC_HERMITE(S0)([[10,22.5-spess,1],[10,22.5-spess,-2.65],[0,0,0],[0,0,0]]);

  var supChiCurvaSxa = MAP(CUBIC_HERMITE(S1)([supCurvSxA,supCurvSxAa,[0,0,0],[0,0,0]]))(domain2dcorn);
  var supChiCurvaSxb = MAP(CUBIC_HERMITE(S1)([supCurvSxB,supCurvSxBb,[0,0,0],[0,0,0]]))(domain2dcorn);

  var supCurvDxA = CUBIC_HERMITE(S0)([[10,22.5,1],[17.4,22.5,-2.65],[15,0,0],[0,0,0]]);
  var supCurvDxAa = CUBIC_HERMITE(S0)([[10,22.5,1],[10,22.5,-2.65],[0,0,0],[0,0,0]]);

  var lineSxA = CUBIC_HERMITE(S0)([[-10,22.5,1],[-10,22.5-spess,1],[0,0,0],[0,0,0]]);
  var lineSxB = CUBIC_HERMITE(S0)([[-10,22.5,-2.65],[-10,22.5-spess,-2.65],[0,0,0],[0,0,0]]);
  var lineDxA = CUBIC_HERMITE(S0)([[10,22.5,1],[10,22.5-spess,1],[0,0,0],[0,0,0]]);
  var lineDxB = CUBIC_HERMITE(S0)([[10,22.5,-2.65],[10,22.5-spess,-2.65],[0,0,0],[0,0,0]]);

  var supChiCurvaDxt= MAP(CUBIC_HERMITE(S1)([lineDxA,lineDxB,[0,0,0],[0,0,0]]))(domain2dcorn);
  var supChiCurvaSxt= MAP(CUBIC_HERMITE(S1)([lineSxA,lineSxB,[0,0,0],[0,0,0]]))(domain2dcorn);

  var supChiCurvaDxa = MAP(CUBIC_HERMITE(S1)([supCurvDxA,supCurvDxAa,[0,0,0],[0,0,0]]))(domain2dcorn);
  var supChiCurvaDxb = MAP(CUBIC_HERMITE(S1)([supCurvDxB,supCurvDxBb,[0,0,0],[0,0,0]]))(domain2dcorn);
  var supChiCurvaSx = MAP(CUBIC_HERMITE(S1)([supCurvSxA,supCurvSxB,[0,0,0],[0,0,0]]))(domain2dcorn);
  var supChiCurvaDx = MAP(CUBIC_HERMITE(S1)([supCurvDxA,supCurvDxB,[0,0,0],[0,0,0]]))(domain2dcorn);

  var supChisuraCurvaDx = MAP(CUBIC_HERMITE(S1)([lineSottCornDxA,lineSottCornDxDownA,[0,0,0],[0,0,0]]))(domain2dcorn);
  var supChisuraCurvaSx = MAP(CUBIC_HERMITE(S1)([lineSottCornSxA,lineSottCornSxDownA,[0,0,0],[0,0,0]]))(domain2dcorn);
  var supSottCornA = MAP(CUBIC_HERMITE(S1)([lineSottCornCurvA,lineSottoCornA,[0,0,0],[0,0,0]]))(domain2dcorn);
  var supSottCornB = MAP(CUBIC_HERMITE(S1)([lineSottCornCurvB,lineSottoCornB,[0,0,0],[0,0,0]]))(domain2dcorn);
  var supSpessSottCornA = MAP(CUBIC_HERMITE(S1)([lineSottCornCurvA,lineSottCornCurvB,[0,0.5,0],[0,-0.5,0]]))(domain2dcorn);

  var sottoCor = COLOR(beige)(STRUCT([supChiCurvaDxt,supChiCurvaSxt,supChiCurvaDx,supChiCurvaSx,supChiCurvaDxa,supChiCurvaDxb,supChiCurvaSxa,supChiCurvaSxb,supSottCornA,supSottCornB,supSpessSottCornA,supCurvSottCornSx,supCurvSottCornDx,supChisuraCurvaSx,supChisuraCurvaDx]));
  var name = COLOR(white)(TRANSLATE([0,1,2])([-2.9,12,0.1])(CUBOID([6,2.5,0.2])));

  var sottoCor = STRUCT([sottoCor,name]);

  return sottoCor;
}

var model_f = function(i) {

  var result = STRUCT([base(),body(),sottoCornetta(),cornetta()]);

  if(i==0) {
    result = STRUCT([base(),body(),sottoCornetta()]);
  }
  
  return result;
}

var model = model_f();

  return model
  })();

  exports.author = 'm4v3r1ck';
  exports.category = 'others';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));