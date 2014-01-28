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
var scmodel = (function() {
  var domain1 = INTERVALS(1)(15);
  var domain2 = DOMAIN([
    [0, 1],
    [0, 1]
  ])([15, 15]);
  var domain22 = DOMAIN([
    [0, 1],
    [0, 1]
  ])([40, 40]);

  // Width: 52.5
  // Height: 38.5


  function FRONT() {
    var p00 = [
      [52.5, 5.4, 0],
      [52.5, 1.8, 0],
      [0, -3.6, 0],
      [0, -3.6, 0]
    ];
    var p01 = [
      [52.5, 1.8, 0],
      [50.7, 0, 0],
      [0, -3.6, 0],
      [-3.6, 0, 0]
    ];
    var p02 = [
      [50.7, 0, 0],
      [1.8, 0, 0],
      [-3.6, 0, 0],
      [-3.6, 0, 0]
    ];
    var p03 = [
      [1.8, 0, 0],
      [0, 1.8, 0],
      [-3.6, 0, 0],
      [0, 3.6, 0]
    ];
    var p04 = [
      [0, 1.8, 0],
      [0, 5.4, 0],
      [0, 3.6, 0],
      [0, 3.6, 0]
    ];

    var p05 = [
      [0, 5.4, 0],
      [0, 36.7, 0],
      [0, 3.6, 0],
      [0, 3.6, 0]
    ];
    var p06 = [
      [0, 36.7, 0],
      [1.8, 38.5, 0],
      [0, 3.6, 0],
      [3.6, 0, 0]
    ];
    var p07 = [
      [1.8, 38.5, 0],
      [50.7, 38.5, 0],
      [3.6, 0, 0],
      [3.6, 0, 0]
    ];
    var p08 = [
      [50.7, 38.5, 0],
      [52.5, 36.7, 0],
      [3.6, 0, 0],
      [0, -3.6, 0]
    ];
    var p09 = [
      [52.5, 36.7, 0],
      [52.5, 5.4, 0],
      [0, -3.6, 0],
      [0, -3.6, 0]
    ];

    var p100 = [
      [50.7, 5.4, 0],
      [50.7, 1.8, 0],
      [0, -3.6, 0],
      [0, -3.6, 0]
    ];
    var p101 = [
      [50.7, 1.8, 0]
    ];
    var p102 = [
      [50.7, 5.4, 0],
      [1.8, 5.4, 0],
      [-3.6, 0, 0],
      [-3.6, 0, 0]
    ];
    var p103 = [
      [1.8, 1.8, 0]
    ];
    var p104 = [
      [1.8, 1.8, 0],
      [1.8, 5.4, 0],
      [0, 1.8, 0],
      [0, 1.8, 0]
    ];

    var p105 = [
      [1.8, 5.4, 0],
      [1.8, 36.7, 0],
      [0, 1.8, 0],
      [0, 1.8, 0]
    ];
    var p106 = [
      [1.8, 36.7, 0]
    ];
    var p107 = [
      [1.8, 36.7, 0],
      [50.7, 36.7, 0],
      [1.8, 0, 0],
      [1.8, 0, 0]
    ];
    var p108 = [
      [50.7, 36.7, 0]
    ];
    var p109 = [
      [50.7, 36.7, 0],
      [50.7, 5.4, 0],
      [0, -3.6, 0],
      [0, -3.6, 0]
    ];

    var c00 = CUBIC_HERMITE(S0)(p00);
    var c01 = CUBIC_HERMITE(S0)(p01);
    var c02 = CUBIC_HERMITE(S0)(p02);
    var c03 = CUBIC_HERMITE(S0)(p03);
    var c04 = CUBIC_HERMITE(S0)(p04);
    var c05 = CUBIC_HERMITE(S0)(p05);
    var c06 = CUBIC_HERMITE(S0)(p06);
    var c07 = CUBIC_HERMITE(S0)(p07);
    var c08 = CUBIC_HERMITE(S0)(p08);
    var c09 = CUBIC_HERMITE(S0)(p09);

    var c100 = CUBIC_HERMITE(S0)(p100);
    var c101 = BEZIER(S0)(p101);
    var c102 = CUBIC_HERMITE(S0)(p102);
    var c103 = BEZIER(S0)(p103);
    var c104 = CUBIC_HERMITE(S0)(p104);

    var c105 = CUBIC_HERMITE(S0)(p105);
    var c106 = BEZIER(S0)(p106);
    var c107 = CUBIC_HERMITE(S0)(p107);
    var c108 = BEZIER(S0)(p108);
    var c109 = CUBIC_HERMITE(S0)(p109);

    var s0 = BEZIER(S1)([c00, c100]);
    var s1 = BEZIER(S1)([c01, c101]);
    var s2 = BEZIER(S1)([c02, c102]);
    var s3 = BEZIER(S1)([c03, c103]);
    var s4 = BEZIER(S1)([c04, c104]);
    var s5 = BEZIER(S1)([c05, c105]);
    var s6 = BEZIER(S1)([c06, c106]);
    var s7 = BEZIER(S1)([c07, c107]);
    var s8 = BEZIER(S1)([c08, c108]);
    var s9 = BEZIER(S1)([c09, c109]);

    var surf0 = MAP(s0)(domain2);
    var surf1 = MAP(s1)(domain2);
    var surf2 = MAP(s2)(domain2);
    var surf3 = MAP(s3)(domain2);
    var surf4 = MAP(s4)(domain2);
    var surf5 = MAP(s5)(domain2);
    var surf6 = MAP(s6)(domain2);
    var surf7 = MAP(s7)(domain2);
    var surf8 = MAP(s8)(domain2);
    var surf9 = MAP(s9)(domain2);

    var bottomSurface = COLOR([1, 1, 1, 1])(STRUCT([surf0, surf1, surf2, surf3, surf4]));

    var topFrame = T([0, 1])([1.8, 5.4])(SIMPLEX_GRID([
      [48.9],
      [1.8]
    ]));
    var topSurface = COLOR([0, 0, 0, 1])(STRUCT([surf5, surf6, surf7, surf8, surf9, topFrame]));

    var display = COLOR([0, .5, 1, 1])(T([0, 1])([1.8, 7.2])(SIMPLEX_GRID([
      [48.9],
      [29.5]
    ])));

    return STRUCT([bottomSurface, topSurface, display]);
  }

  function BODY() {
    var p00 = [
      [52.5, 36.7, 0],
      [52.5, 1.8, 0],
      [0, -3.6, 0],
      [0, -3.6, 0]
    ];
    var p01 = [
      [52.5, 1.8, 0],
      [50.7, 0, 0],
      [0, -3.6, 0],
      [-3.6, 0, 0]
    ];
    var p02 = [
      [50.7, 0, 0],
      [1.8, 0, 0],
      [-3.6, 0, 0],
      [-3.6, 0, 0]
    ];
    var p03 = [
      [1.8, 0, 0],
      [0, 1.8, 0],
      [-3.6, 0, 0],
      [0, 3.6, 0]
    ];
    var p04 = [
      [0, 1.8, 0],
      [0, 36.7, 0],
      [0, 3.6, 0],
      [0, 3.6, 0]
    ];
    var p05 = [
      [0, 36.7, 0],
      [1.8, 38.5, 0],
      [0, 3.6, 0],
      [3.6, 0, 0]
    ];
    var p06 = [
      [1.8, 38.5, 0],
      [50.7, 38.5, 0],
      [3.6, 0, 0],
      [3.6, 0, 0]
    ];
    var p07 = [
      [50.7, 38.5, 0],
      [52.5, 36.7, 0],
      [3.6, 0, 0],
      [0, -3.6, 0]
    ];

    var p10 = [
      [52.5, 36.7, -1.8],
      [52.5, 1.8, -1.8],
      [0, -3.6, 0],
      [0, -3.6, 0]
    ];
    var p11 = [
      [52.5, 1.8, -1.8],
      [50.7, 0, -1.8],
      [0, -3.6, 0],
      [-3.6, 0, 0]
    ];
    var p12 = [
      [50.7, 0, -1.8],
      [1.8, 0, -1.8],
      [-3.6, 0, 0],
      [-3.6, 0, 0]
    ];
    var p13 = [
      [1.8, 0, -1.8],
      [0, 1.8, -1.8],
      [-3.6, 0, 0],
      [0, 3.6, 0]
    ];
    var p14 = [
      [0, 1.8, -1.8],
      [0, 36.7, -1.8],
      [0, 3.6, 0],
      [0, 3.6, 0]
    ];
    var p15 = [
      [0, 36.7, -1.8],
      [1.8, 38.5, -1.8],
      [0, 3.6, 0],
      [3.6, 0, 0]
    ];
    var p16 = [
      [1.8, 38.5, -1.8],
      [50.7, 38.5, -1.8],
      [3.6, 0, 0],
      [3.6, 0, 0]
    ];
    var p17 = [
      [50.7, 38.5, -1.8],
      [52.5, 36.7, -1.8],
      [3.6, 0, 0],
      [0, -3.6, 0]
    ];

    var c00 = CUBIC_HERMITE(S0)(p00);
    var c01 = CUBIC_HERMITE(S0)(p01);
    var c02 = CUBIC_HERMITE(S0)(p02);
    var c03 = CUBIC_HERMITE(S0)(p03);
    var c04 = CUBIC_HERMITE(S0)(p04);
    var c05 = CUBIC_HERMITE(S0)(p05);
    var c06 = CUBIC_HERMITE(S0)(p06);
    var c07 = CUBIC_HERMITE(S0)(p07);

    var c10 = CUBIC_HERMITE(S0)(p10);
    var c11 = CUBIC_HERMITE(S0)(p11);
    var c12 = CUBIC_HERMITE(S0)(p12);
    var c13 = CUBIC_HERMITE(S0)(p13);
    var c14 = CUBIC_HERMITE(S0)(p14);
    var c15 = CUBIC_HERMITE(S0)(p15);
    var c16 = CUBIC_HERMITE(S0)(p16);
    var c17 = CUBIC_HERMITE(S0)(p17);

    var s0 = BEZIER(S1)([c00, c10]);
    var s1 = BEZIER(S1)([c01, c11]);
    var s2 = BEZIER(S1)([c02, c12]);
    var s3 = BEZIER(S1)([c03, c13]);
    var s4 = BEZIER(S1)([c04, c14]);
    var s5 = BEZIER(S1)([c05, c15]);
    var s6 = BEZIER(S1)([c06, c16]);
    var s7 = BEZIER(S1)([c07, c17]);

    var surf0 = MAP(s0)(domain2);
    var surf1 = MAP(s1)(domain2);
    var surf2 = MAP(s2)(domain2);
    var surf3 = MAP(s3)(domain2);
    var surf4 = MAP(s4)(domain2);
    var surf5 = MAP(s5)(domain2);
    var surf6 = MAP(s6)(domain2);
    var surf7 = MAP(s7)(domain2);

    return COLOR([1, 1, 1, 1])(STRUCT([surf0, surf1, surf2, surf3, surf4, surf5, surf6, surf7]));
  }

  function BACK() {
    var p00 = [
      [52.5, 36.7, -1.8],
      [52.5, 1.8, -1.8],
      [0, -3.6, 0],
      [0, -3.6, 0]
    ];
    var p01 = [
      [52.5, 1.8, -1.8],
      [50.7, 0, -1.8],
      [0, -3.6, 0],
      [-3.6, 0, 0]
    ];
    var p02 = [
      [50.7, 0, -1.8],
      [1.8, 0, -1.8],
      [-3.6, 0, 0],
      [-3.6, 0, 0]
    ];
    var p03 = [
      [1.8, 0, -1.8],
      [0, 1.8, -1.8],
      [-3.6, 0, 0],
      [0, 3.6, 0]
    ];
    var p04 = [
      [0, 1.8, -1.8],
      [0, 36.7, -1.8],
      [0, 3.6, 0],
      [0, 3.6, 0]
    ];
    var p05 = [
      [0, 36.7, -1.8],
      [1.8, 38.5, -1.8],
      [0, 3.6, 0],
      [3.6, 0, 0]
    ];
    var p06 = [
      [1.8, 38.5, -1.8],
      [50.7, 38.5, -1.8],
      [3.6, 0, 0],
      [3.6, 0, 0]
    ];
    var p07 = [
      [50.7, 38.5, -1.8],
      [52.5, 36.7, -1.8],
      [3.6, 0, 0],
      [0, -3.6, 0]
    ];

    var p20 = [
      [30.5, 19.5, -3.6],
      [30.5, 19, -3.6],
      [0, 0, 0],
      [0, 0, 0]
    ];
    var p21 = [
      [30.5, 19, -3.6]
    ];
    var p22 = [
      [30.5, 19, -3.6],
      [22, 19, -3.6],
      [0, 0, 0],
      [0, 0, 0]
    ];
    var p23 = [
      [22, 19, -3.6]
    ];
    var p24 = [
      [22, 19, -3.6],
      [22, 19.5, -3.6],
      [0, 0, 0],
      [0, 0, 0]
    ];
    var p25 = [
      [22, 19.5, -3.6]
    ];
    var p26 = [
      [22, 19.5, -3.6],
      [30.5, 19.5, -3.6],
      [0, 0, 0],
      [0, 0, 0]
    ];
    var p27 = [
      [30.5, 19.5, -3.6]
    ];

    var c00 = CUBIC_HERMITE(S0)(p00);
    var c01 = CUBIC_HERMITE(S0)(p01);
    var c02 = CUBIC_HERMITE(S0)(p02);
    var c03 = CUBIC_HERMITE(S0)(p03);
    var c04 = CUBIC_HERMITE(S0)(p04);
    var c05 = CUBIC_HERMITE(S0)(p05);
    var c06 = CUBIC_HERMITE(S0)(p06);
    var c07 = CUBIC_HERMITE(S0)(p07);

    var c10 = CUBIC_HERMITE(S0)(p20);
    var c11 = BEZIER(S0)(p21);
    var c12 = CUBIC_HERMITE(S0)(p22);
    var c13 = BEZIER(S0)(p23);
    var c14 = CUBIC_HERMITE(S0)(p24);
    var c15 = BEZIER(S0)(p25);
    var c16 = CUBIC_HERMITE(S0)(p26);
    var c17 = BEZIER(S0)(p27);

    var s0 = BEZIER(S1)([c00, c10]);
    var s1 = BEZIER(S1)([c01, c11]);
    var s2 = BEZIER(S1)([c02, c12]);
    var s3 = BEZIER(S1)([c03, c13]);
    var s4 = BEZIER(S1)([c04, c14]);
    var s5 = BEZIER(S1)([c05, c15]);
    var s6 = BEZIER(S1)([c06, c16]);
    var s7 = BEZIER(S1)([c07, c17]);

    var surf0 = MAP(s0)(domain2);
    var surf1 = MAP(s1)(domain2);
    var surf2 = MAP(s2)(domain2);
    var surf3 = MAP(s3)(domain2);
    var surf4 = MAP(s4)(domain2);
    var surf5 = MAP(s5)(domain2);
    var surf6 = MAP(s6)(domain2);
    var surf7 = MAP(s7)(domain2);

    var cap = COLOR([0, 0, 0, 1])(T([0, 1, 2])([22, 19, -3.6])(SIMPLEX_GRID([
      [8.5],
      [.5],
      [0]
    ])));
    var back = COLOR([1, 1, 1, 1])(STRUCT([surf0, surf1, surf2, surf3, surf4, surf5, surf6, surf7]));

    return STRUCT([back, cap]);
  }

  function STAND() {
    var p0 = [
      [7, 0, 0],
      [7, 0, 0],
      [7, 0, 0],
      [7, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [.2, 0, -1],
      [.2, 0, -1],
      [.2, 0, -1],
      [.2, 0, -1],
      [2, 0, -14.5],
      [2, 0, -14.5],
      [2, 0, -14.5],
      [2, 0, -14.5],
      [2.4, 0, -15],
      [2.4, 0, -15],
      [2.4, 0, -15],
      [2.4, 0, -15],
      [2.8, 23, -7.5],
      [2.8, 23, -7.5],
      [2.8, 23, -7.5],
      [2.8, 23, -7.5],
      [3, 24, -7],
      [3, 24, -7],
      [3, 24, -7],
      [3, 24, -7],
      [3, 24, -6],
      [3, 24, -6],
      [3, 24, -6],
      [3, 24, -6],
      [7, 24, -6],
      [7, 24, -6],
      [7, 24, -6],
      [7, 24, -6]
    ];

    var p1 = [
      [7, 0, 0],
      [7, 0, 0],
      [7, 0, 0],
      [7, 0, 0],
      [13, 0, 0],
      [13, 0, 0],
      [13, 0, 0],
      [13, 0, 0],
      [13.8, 0, -1],
      [13.8, 0, -1],
      [13.8, 0, -1],
      [13.8, 0, -1],
      [12, 0, -14.5],
      [12, 0, -14.5],
      [12, 0, -14.5],
      [12, 0, -14.5],
      [11.6, 0, -15],
      [11.6, 0, -15],
      [11.6, 0, -15],
      [11.6, 0, -15],
      [11.2, 23, -7.5],
      [11.2, 23, -7.5],
      [11.2, 23, -7.5],
      [11.2, 23, -7.5],
      [11, 24, -7],
      [11, 24, -7],
      [11, 24, -7],
      [11, 24, -7],
      [11, 24, -6],
      [11, 24, -6],
      [11, 24, -6],
      [11, 24, -6],
      [7, 24, -6],
      [7, 24, -6],
      [7, 24, -6],
      [7, 24, -6]
    ];

    var p2 = [
      [7, -.2, 0],
      [7, -.2, 0],
      [7, -.2, 0],
      [7, -.2, 0],
      [1, -.2, 0],
      [1, -.2, 0],
      [1, -.2, 0],
      [1, -.2, 0],
      [.2, -.2, -1],
      [.2, -.2, -1],
      [.2, -.2, -1],
      [.2, -.2, -1],
      [2, -.2, -14],
      [2, -.2, -14],
      [2, -.2, -14],
      [2, -.2, -14],
      [2.4, 1, -15.2],
      [2.4, 1, -15.2],
      [2.4, 1, -15.2],
      [2.4, 1, -15.2],
      [2.8, 23.15, -7.55],
      [2.8, 23.15, -7.55],
      [2.8, 23.15, -7.55],
      [2.8, 23.15, -7.55],
      [3, 24.15, -7.15],
      [3, 24.15, -7.15],
      [3, 24.15, -7.15],
      [3, 24.15, -7.15],
      [3, 24.15, -6.15],
      [3, 24.15, -6.15],
      [3, 24.15, -6.15],
      [3, 24.15, -6.15],
      [7, 24.15, -6.15],
      [7, 24.15, -6.15],
      [7, 24.15, -6.15],
      [7, 24.15, -6.15]
    ];

    var p3 = [
      [7, -.2, 0],
      [7, -.2, 0],
      [7, -.2, 0],
      [7, -.2, 0],
      [13, -.2, 0],
      [13, -.2, 0],
      [13, -.2, 0],
      [13, -.2, 0],
      [13.8, -.2, -1],
      [13.8, -.2, -1],
      [13.8, -.2, -1],
      [13.8, -.2, -1],
      [12, -.2, -14],
      [12, -.2, -14],
      [12, -.2, -14],
      [12, -.2, -14],
      [11.6, 1, -15.2],
      [11.6, 1, -15.2],
      [11.6, 1, -15.2],
      [11.6, 1, -15.2],
      [11.2, 23.15, -7.55],
      [11.2, 23.15, -7.55],
      [11.2, 23.15, -7.55],
      [11.2, 23.15, -7.55],
      [11, 24.15, -7.15],
      [11, 24.15, -7.15],
      [11, 24.15, -7.15],
      [11, 24.15, -7.15],
      [11, 24.15, -6.15],
      [11, 24.15, -6.15],
      [11, 24.15, -6.15],
      [11, 24.15, -6.15],
      [7, 24.15, -6.15],
      [7, 24.15, -6.15],
      [7, 24.15, -6.15],
      [7, 24.15, -6.15]
    ];

    var c0 = BEZIER(S0)(p0);
    var c1 = BEZIER(S0)(p1);

    var c2 = BEZIER(S0)(p2);
    var c3 = BEZIER(S0)(p3);

    var s0 = BEZIER(S1)([c0, c1]);
    var s1 = BEZIER(S1)([c2, c3]);
    var s2 = BEZIER(S1)([c0, c2]);
    var s3 = BEZIER(S1)([c1, c3]);

    var surf0 = MAP(s0)(domain22);
    var surf1 = MAP(s1)(domain22);
    var surf2 = MAP(s2)(domain22);
    var surf3 = MAP(s3)(domain22);

    var stand = STRUCT([surf0, surf1, surf2, surf3]);

    stand = T([0, 1, 2])([19.25, -4, 3.6])(stand);

    return stand;
  }

  function LOGO() {
    var p0 = [
      [0, 0, 0],
      [1, 1.2, 0],
      [1.5, 0, 0],
      [0, 2, 0]
    ];
    var p1 = [
      [0, 0, 0],
      [1, 1.2, 0],
      [0, 2, 0],
      [1.5, 0, 0]
    ];

    var c0 = CUBIC_HERMITE(S0)(p0);
    var c1 = CUBIC_HERMITE(S0)(p1);

    var s0 = BEZIER(S1)([c0, c1]);

    var appleLeaf = MAP(s0)(domain2);

    var p2 = [
      [5, 4, 0],
      [3.5, 5, 0],
      [-.5, 1.5, 0],
      [-2, 0, 0]
    ];
    var p3 = [
      [3.5, 5, 0],
      [2.5, 4.75, 0],
      [-1.5, 0, 0],
      [-.5, 0, 0]
    ];
    var p4 = [
      [2.5, 4.75, 0],
      [1.5, 5, 0],
      [-.5, 0, 0],
      [-1.5, 0, 0]
    ];
    var p5 = [
      [1.5, 5, 0],
      [0, 3.3, 0],
      [-3.7, 0, 0],
      [0, -1.5, 0]
    ];
    var p6 = [
      [0, 3.3, 0],
      [1.3, .25, 0],
      [0, -4.2, 0],
      [1.7, 0, 0]
    ];
    var p7 = [
      [1.3, .25, 0],
      [2.5, .5, 0],
      [1, 0, 0],
      [1, 0, 0]
    ];
    var p8 = [
      [2.5, .5, 0],
      [3.7, .25, 0],
      [1, 0, 0],
      [1, 0, 0]
    ];
    var p9 = [
      [3.7, .25, 0],
      [5, 2, 0],
      [2, 0, 0],
      [0, 1, 0]
    ];
    var p10 = [
      [5, 2, 0],
      [5, 4, 0],
      [-2.5, 1.5, 0],
      [2.5, 1.5, 0]
    ];
    var p11 = [
      [2.5, 2.6, 0]
    ];

    var c2 = CUBIC_HERMITE(S0)(p2);
    var c3 = CUBIC_HERMITE(S0)(p3);
    var c4 = CUBIC_HERMITE(S0)(p4);
    var c5 = CUBIC_HERMITE(S0)(p5);
    var c6 = CUBIC_HERMITE(S0)(p6);
    var c7 = CUBIC_HERMITE(S0)(p7);
    var c8 = CUBIC_HERMITE(S0)(p8);
    var c9 = CUBIC_HERMITE(S0)(p9);
    var c10 = CUBIC_HERMITE(S0)(p10);
    var c11 = BEZIER(S0)(p11);

    var c22 = BEZIER(S1)([c2, c11]);
    var c23 = BEZIER(S1)([c3, c11]);
    var c24 = BEZIER(S1)([c4, c11]);
    var c25 = BEZIER(S1)([c5, c11]);
    var c26 = BEZIER(S1)([c6, c11]);
    var c27 = BEZIER(S1)([c7, c11]);
    var c28 = BEZIER(S1)([c8, c11]);
    var c29 = BEZIER(S1)([c9, c11]);
    var c210 = BEZIER(S1)([c10, c11]);

    var s2 = MAP(c22)(domain2);
    var s3 = MAP(c23)(domain2);
    var s4 = MAP(c24)(domain2);
    var s5 = MAP(c25)(domain2);
    var s6 = MAP(c26)(domain2);
    var s7 = MAP(c27)(domain2);
    var s8 = MAP(c28)(domain2);
    var s9 = MAP(c29)(domain2);
    var s10 = MAP(c210)(domain2);

    var appleBody = STRUCT([s2, s3, s4, s5, s6, s7, s8, s9, s10]);

    appleLeaf = T([0, 1])([2.5, 5])(appleLeaf);

    var apple = COLOR([0, 0, 0, 1])(T([0, 1, 2])([25, 1.5, .05])(S([0, 1])([.5, .5])(STRUCT([appleLeaf, appleBody]))));

    return apple;
  }

  var iMac = [];

  iMac.push(FRONT());
  iMac.push(BODY());
  iMac.push(BACK());
  iMac.push(STAND());
  iMac.push(LOGO());

  var iMacFinal = STRUCT(iMac);
  iMacFinal = T([0])([-26.25])(iMacFinal);

  return iMacFinal;
})();

/////////////////////////////////////////////
return scmodel;
})();

exports.author = 'shade87';
exports.category = 'devices';
exports.scmodel = scmodel;

if (!module.parent) {
  fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
}

}(this));