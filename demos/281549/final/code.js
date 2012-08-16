var domain1 = INTERVALS(1)(10);
var domain2 = DOMAIN([[0,1],[0,1]])([10,10]);

var sphere = function(radialAngle,verticalAngle,interval) {
  var domain = DOMAIN([[0,radialAngle * 2 * PI],[0,verticalAngle * PI]])([interval,interval]);
  var curve = MAP(function (v) {
    return [Math.sin(v[1])*Math.cos(v[0]),Math.sin(v[1])*Math.sin(v[0]),Math.cos(v[1])];
  })(domain);
  return curve;
}

var model = [];

// Cylindrical Base Platform
function base() {
  var components = [];

  var p0 = [[1,0],[0,1],[0,1.66],[-1.66,0]];
  var p1 = [[0,0],[0,0],[0,0],[0,0]];
  
  var p2 = [[0,.89],[.34,.89],[0,0],[0,0]];
  var p3 = [[0,1.11],[.34,1.11],[0,0],[0,0]];

  var c0 = CUBIC_HERMITE(S0)(p0);
  var c1 = CUBIC_HERMITE(S0)(p1);

  var c2 = CUBIC_HERMITE(S0)(p2);
  var c3 = CUBIC_HERMITE(S0)(p3);

  var s0 = MAP(BEZIER(S1)([c0,c1]))(domain2);
  var s1 = MAP(BEZIER(S1)([c2,c3]))(domain2);
  var s2 = T([0,1])([.34,1.11])(S([0,1])([.22,-.22])(s0));

  var t0 = STRUCT([s1,s2]);
  var t1 = T([1])([2.22])(S([1])([-1])(t0));
  var t2 = STRUCT([t0,t1]);
  var t3 = S([0])([-1])(t2);
  var t4 = R([0,1])([-PI/2 - PI/8])(T([1])([-.005])(STRUCT([t2,t3])));
  
  components.push(s0);
  components.push(R([0,1])([PI/2])(s0));
  components.push(R([0,1])([PI])(s0));
  components.push(R([0,1])([PI*3/2])(s0));

  var base = S([0,1])([1.1,1.1])(STRUCT(components));
  var baseComplete = STRUCT([base,t4]);
  
  EXTRUDE([.01])(baseComplete);

  return baseComplete;
}

// Lower Border Half Section of the Octagonal Structure
function baseBorderElement() {

  // Bordo Esterno
  var p00 = [[1,0],[Math.cos(PI/24),Math.sin(PI/24)],[0,.23],[-.031,.25]];
  var p0 = [[Math.cos(PI/24),Math.sin(PI/24)],[Math.cos(PI*3/32),Math.sin(PI*3/32)],[-.031,.25],[-.015,.07]];
  var p1 = [[1,0],[Math.cos(PI/2 + PI/37)*3/5,Math.sin(PI/2 + PI/37)*3/5],[.01,.9],[-Math.cos(PI/37)*1.66,-Math.sin(PI/37)*1.66]];
  
  // Bordo Intermedio
  var p2 = [[0,0],[-.055,0],[0,0],[0,0]];
  var p3 = [[-.055,0],[-.055,.1],[0,0],[0,0]];
  var p4 = [[1,0],[0,1],[0,1.66],[-1.66,0]];
  var p6 = [[-.055,.25],[-.055,.35],[0,0],[0,0]];
  var p7 = [[-.055,.35],[-.155,.35],[0,0],[0,0]];

  // Colonna interna
  var p9 = [[1,0],[0,1],[0,1.66],[-1.66,0]];

  // Bordo Interno
  var p11 = [[0,0],[-.155,0],[0,0],[0,0]];
  var p12 = [[-.155,0],[-.155,-.02],[0,0],[0,0]];
  var p13 = [[-.155,-.02],[-.06,-.02],[0,0],[0,0]];
  var p14 = [[-.06,-.02],[-.06,-.03],[0,0],[0,0]];
  var p15 = [[-.06,-.03],[-0.016,-.04],[.03,0],[0,-.005]];

  var c00 = MAP(CUBIC_HERMITE(S0)(p00))(domain1);

  var c0 = MAP(CUBIC_HERMITE(S0)(p0))(domain1);
  var c1 = MAP(CUBIC_HERMITE(S0)(p1))(domain1);

  var c2 = MAP(CUBIC_HERMITE(S0)(p2))(domain1);
  var c3 = MAP(CUBIC_HERMITE(S0)(p3))(domain1);

  var c4 = MAP(CUBIC_HERMITE(S0)(p4))(domain1);

  var c6 = MAP(CUBIC_HERMITE(S0)(p6))(domain1);
  var c7 = MAP(CUBIC_HERMITE(S0)(p7))(domain1);

  var c9 = MAP(CUBIC_HERMITE(S0)(p9))(domain1);

  var c11 = MAP(CUBIC_HERMITE(S0)(p11))(domain1);
  var c12 = MAP(CUBIC_HERMITE(S0)(p12))(domain1);
  var c13 = MAP(CUBIC_HERMITE(S0)(p13))(domain1);
  var c14 = MAP(CUBIC_HERMITE(S0)(p14))(domain1);
  var c15 = MAP(CUBIC_HERMITE(S0)(p15))(domain1);

  var t4 = T([0,1])([-.055,.175])(R([0,1])([-PI/2])(S([0,1])([.075,.075])(c4)));
  var t5 = T([1])([.35])(S([1])([-1])(t4));

  var t8 = T([0,1])([-.055,.405])(R([0,1])([PI/2])(t4));

  var t9 = T([0,1])([-.155,.1])(S([0,1])([.02,.02])(STRUCT(REPLICA(4)([c9,R([0,1])([PI/2])]))));
  var t10 = T([1])([.15])(t9);

  var t16 = T([1])([-.12])(S([0,1])([.8,.8])(t9));

  var e1 = T([0,1])([Math.cos(PI*3/32),Math.sin(PI*3/32)])(R([0,1])([PI*3/32])(T([1])([1/10])(R([0,1])([-PI/2])(S([0,1])([1/10,1/10])(c1)))));
  var e2 = T([0])([.6])(R([0,1])([-(PI/2 - PI/8)])(STRUCT([c2,c3,t4,t5,c6,c7,t8,t9,t10,c11,c12,c13,c14,c15,t16])));
  var e3 = S([0,1])([.95,.95])(STRUCT([c00,c0,e1]));

  //DRAW(STRUCT([e3,e2]));

  return STRUCT([e3,e2]);
}

// Lower Border of Propylaeum
function baseBorderPropylaeum() {

  // Bordo Intermedio
  var p2 = [[0,0],[-.055,0],[0,0],[0,0]];
  var p3 = [[-.055,0],[-.055,.1],[0,0],[0,0]];
  var p4 = [[1,0],[0,1],[0,1.66],[-1.66,0]];
  var p6 = [[-.055,.25],[-.055,.35],[0,0],[0,0]];
  var p7 = [[-.055,.35],[-.155,.35],[0,0],[0,0]];
  var p8 = [[-.155,.35],[-.155,.4],[0,0],[0,0]];

  // Colonna interna
  var p9 = [[1,0],[0,1],[0,1.66],[-1.66,0]];

  // Bordo Interno
  var p11 = [[0,0],[-.155,0],[0,0],[0,0]];
  var p12 = [[-.155,0],[-.155,-.02],[0,0],[0,0]];
  var p13 = [[-.155,-.02],[-.06,-.02],[0,0],[0,0]];
  var p14 = [[-.06,-.02],[-.06,-.03],[0,0],[0,0]];
  var p15 = [[-.06,-.03],[-0.016,-.04],[.03,0],[0,-.005]];

  // Propileo
  var p20 = [[-.155,.4],[-.055,.4],[0,0],[0,0]];
  var p21 = [[-.055,.4],[-.055,.5],[0,0],[0,0]];
  var p22 = [[-.055,.5],[-.035,.5],[0,0],[0,0]];
  var p23 = [[-.035,.5],[-.035,.4],[0,0],[0,0]];
  var p24 = [[-.035,.4],[.115,.4],[0,0],[0,0]];
  var p25 = [[1,0],[0,1],[0,1.66],[-1.66,0]];

  // Bordo Esterno
  var p30 = [[-.155,.7],[-.155,.72],[0,0],[0,0]];
  var p31 = [[-.155,.72],[.115,.72],[0,0],[0,0]];
  var p32 = [[1,0],[0,1],[0,1.66],[-1.66,0]];
  var p34 = [[.115,.38],[.134,.3232],[0,0],[0,0]];

  var c2 = MAP(CUBIC_HERMITE(S0)(p2))(domain1);
  var c3 = MAP(CUBIC_HERMITE(S0)(p3))(domain1);

  var c4 = MAP(CUBIC_HERMITE(S0)(p4))(domain1);

  var c6 = MAP(CUBIC_HERMITE(S0)(p6))(domain1);
  var c7 = MAP(CUBIC_HERMITE(S0)(p7))(domain1);

  var c8 = MAP(CUBIC_HERMITE(S0)(p8))(domain1);

  var c20 = MAP(CUBIC_HERMITE(S0)(p20))(domain1);
  var c21 = MAP(CUBIC_HERMITE(S0)(p21))(domain1);
  var c22 = MAP(CUBIC_HERMITE(S0)(p22))(domain1);
  var c23 = MAP(CUBIC_HERMITE(S0)(p23))(domain1);
  var c24 = MAP(CUBIC_HERMITE(S0)(p24))(domain1);
  var c25 = MAP(CUBIC_HERMITE(S0)(p25))(domain1);

  var c9 = MAP(CUBIC_HERMITE(S0)(p9))(domain1);

  var c11 = MAP(CUBIC_HERMITE(S0)(p11))(domain1);
  var c12 = MAP(CUBIC_HERMITE(S0)(p12))(domain1);
  var c13 = MAP(CUBIC_HERMITE(S0)(p13))(domain1);
  var c14 = MAP(CUBIC_HERMITE(S0)(p14))(domain1);
  var c15 = MAP(CUBIC_HERMITE(S0)(p15))(domain1);

  var c30 = MAP(CUBIC_HERMITE(S0)(p30))(domain1);
  var c31 = MAP(CUBIC_HERMITE(S0)(p31))(domain1);
  var c32 = MAP(CUBIC_HERMITE(S0)(p32))(domain1);
  var c34 = MAP(CUBIC_HERMITE(S0)(p34))(domain1);

  var t4 = T([0,1])([-.055,.175])(R([0,1])([-PI/2])(S([0,1])([.075,.075])(c4)));
  var t5 = T([1])([.35])(S([1])([-1])(t4));

  var t8 = T([0,1])([-.055,.405])(R([0,1])([PI/2])(t4));

  var t9 = T([0,1])([-.155,.1])(S([0,1])([.02,.02])(STRUCT(REPLICA(4)([c9,R([0,1])([PI/2])]))));
  var t10 = T([1])([.15])(t9);

  var t16 = T([1])([-.12])(S([0,1])([.8,.8])(t9));

  var t25 = T([0,1])([.115,.55])(R([0,1])([-PI/2])(S([0,1])([.15,.15])(c25)));

  var t32 = S([0,1])([.17,.17])(c32);
  var t33 = S([1])([-1])(t32);

  var e4 = STRUCT([c20,c21,c22,c23,c24,t25]);
  var e5 = T([1])([1.1])(S([1])([-1])(e4));
  var e6 = T([0,1])([.115,.55])(STRUCT([t32,t33]));

  var ammassoMortale = STRUCT([c2,c3,t4,t5,c6,c7,c8,e4,e5,t9,t10,c11,c12,c13,c14,c15,t16,c30,c31,e6,c34]);
  var e2 = T([0])([.6])(R([0,1])([-(PI/2 - PI/8)])(ammassoMortale));
  
  //DRAW(ammassoMortale);

  //DRAW(STRUCT([e2]));

  return e2;
}

// Lower Border
function baseBorder() {

  // Border
  var halfBorder1 = baseBorderElement();
  var halfBorder2 = R([0,1])([-PI*6/8])(S([0])([-1])(halfBorder1));
  var border = STRUCT([halfBorder1, halfBorder2]);
  var halfPropylaeum1 = baseBorderPropylaeum();
  var halfPropylaeum2 = R([0,1])([-PI*6/8])(S([0])([-1])(halfPropylaeum1));
  var propylaeum = R([0,1])([-PI/4])(STRUCT([halfPropylaeum1,halfPropylaeum2]));
  var borderTemp = STRUCT(REPLICA(7)([border,R([0,1])([PI/4])]));
  var borderComplete = STRUCT([propylaeum,borderTemp]);

  //DRAW(borderComplete);

  EXTRUDE([.1])(borderComplete);
  
  var lowerBorder = TRANSLATE([2])([.01])(borderComplete);

  return lowerBorder;
}


function statueCap() {

  var smallRadius = Math.sqrt( Math.pow(1 - Math.cos(PI/24),2 ) + Math.pow(0 - Math.sin(PI/24),2 ) );

  var p0 = [[1,0,.1],[Math.cos(PI/24),Math.sin(PI/24),.1],[0,.23,0],[-.031,.25,0]];
  var p1 = [[1 - smallRadius,0,.1],[Math.cos(PI/24),Math.sin(PI/24),.1],[0,1.66*smallRadius,0],[Math.cos(PI/24)*1.66*smallRadius,Math.sin(PI/24)*1.66*smallRadius,0]];

  var c0 = CUBIC_HERMITE(S0)(p0);
  var c1 = CUBIC_HERMITE(S0)(p1);

  var s0 = MAP(BEZIER(S1)([c0,c1]))(domain2);

  return s0;
}

// Upper Border Half Section of the Octagonal Structure
function upperBorderElement() {

  var smallRadius = Math.sqrt( Math.pow(1 - Math.cos(PI/24),2 ) + Math.pow(0 - Math.sin(PI/24),2 ) );

  // Bordo Esterno
  var p00 = [[1 - smallRadius,0,.1],[Math.cos(PI/24),Math.sin(PI/24),.1],[0,1.66*smallRadius,0],[Math.cos(PI/24)*1.66*smallRadius,Math.sin(PI/24)*1.66*smallRadius,0]];
  var p0 = [[Math.cos(PI/24),Math.sin(PI/24),.1],[Math.cos(PI*3/32),Math.sin(PI*3/32),.1],[-.031,.25,0],[-.015,.07,0]];
  var p1 = [[1,0,.1],[Math.cos(PI/2 + PI/37)*3/5,Math.sin(PI/2 + PI/37)*3/5,.1],[.01,.9,0],[-Math.cos(PI/37)*1.66,-Math.sin(PI/37)*1.66,0]];
  
  // Bordo Intermedio
  var p2 = [[0,0,.1],[-.055,0,.1],[0,0,0],[0,0,0]];
  var p3 = [[-.055,0,.1],[-.055,.1,.1],[0,0,0],[0,0,0]];
  var p4 = [[1,0,.1],[0,1,.1],[0,1.66,0],[-1.66,0,0]];
  var p6 = [[-.055,.25,.1],[-.055,.35,.1],[0,0,0],[0,0,0]];
  var p7 = [[-.055,.35,.1],[-.155,.35,.1],[0,0,0],[0,0,0]];

  // Colonna interna
  var p9 = [[1,0,.1],[0,1,.1],[0,1.66,0],[-1.66,0,0]];

  // Bordo Interno
  var p11 = [[0,0,.1],[-.155,0,.1],[0,0,0],[0,0,0]];
  var p12 = [[-.155,0,.1],[-.155,-.02,.1],[0,0,0],[0,0,0]];
  var p13 = [[-.155,-.02,.1],[-.06,-.02,.1],[0,0,0],[0,0,0]];
  var p14 = [[-.06,-.02,.1],[-.06,-.03,.1],[0,0,0],[0,0,0]];
  var p15 = [[-.06,-.03,.1],[-0.016,-.04,.1],[.03,0,0],[0,-.005,0]];

  var c00 = CUBIC_HERMITE(S0)(p00);

  var c0 = CUBIC_HERMITE(S0)(p0);
  var c1 = CUBIC_HERMITE(S0)(p1);

  var c2 = CUBIC_HERMITE(S0)(p2);
  var c3 = CUBIC_HERMITE(S0)(p3);

  var c4 = CUBIC_HERMITE(S0)(p4);

  var c6 = CUBIC_HERMITE(S0)(p6);
  var c7 = CUBIC_HERMITE(S0)(p7);

  var c9 = CUBIC_HERMITE(S0)(p9);

  var c11 = CUBIC_HERMITE(S0)(p11);
  var c12 = CUBIC_HERMITE(S0)(p12);
  var c13 = CUBIC_HERMITE(S0)(p13);
  var c14 = CUBIC_HERMITE(S0)(p14);
  var c15 = CUBIC_HERMITE(S0)(p15);

  // Bordo Esterno
  var p00u = [[1 - smallRadius,0,.3],[Math.cos(PI/24),Math.sin(PI/24),.3],[0,1.66 * smallRadius,0],[Math.cos(PI/24)*1.66 * smallRadius,Math.sin(PI/24)*1.66*smallRadius,0]];
  var p0u = [[Math.cos(PI/24),Math.sin(PI/24),.3],[Math.cos(PI*3/32),Math.sin(PI*3/32),.3],[-.031,.25,0],[-.015,.07,0]];
  var p1u = [[1,0,.3],[Math.cos(PI/2 + PI/37)*3/5,Math.sin(PI/2 + PI/37)*3/5,.3],[.01,.9,0],[-Math.cos(PI/37)*1.66,-Math.sin(PI/37)*1.66,0]];
  
  // Bordo Intermedio
  var p2u = [[0,0,.3],[-.055,0,.3],[0,0,0],[0,0,0]];
  var p3u = [[-.055,0,.3],[-.055,.1,.3],[0,0,0],[0,0,0]];
  var p4u = [[1,0,.3],[0,1,.3],[0,1.66,0],[-1.66,0,0]];
  var p6u = [[-.055,.25,.3],[-.055,.35,.3],[0,0,0],[0,0,0]];
  var p7u = [[-.055,.35,.3],[-.155,.35,.3],[0,0,0],[0,0,0]];

  // Colonna interna
  var p9u = [[1,0,.3],[0,1,.3],[0,1.66,0],[-1.66,0,0]];

  // Bordo Interno
  var p11u = [[0,0,.3],[-.155,0,.3],[0,0,0],[0,0,0]];
  var p12u = [[-.155,0,.3],[-.155,-.02,.3],[0,0,0],[0,0,0]];
  var p13u = [[-.155,-.02,.3],[-.06,-.02,.3],[0,0,0],[0,0,0]];
  var p14u = [[-.06,-.02,.3],[-.06,-.03,.3],[0,0,0],[0,0,0]];
  var p15u = [[-.06,-.03,.3],[-0.016,-.04,.3],[.03,0,0],[0,-.005,0]];

  var c00u = CUBIC_HERMITE(S0)(p00u);

  var c0u = CUBIC_HERMITE(S0)(p0u);
  var c1u = CUBIC_HERMITE(S0)(p1u);

  var c2u = CUBIC_HERMITE(S0)(p2u);
  var c3u = CUBIC_HERMITE(S0)(p3u);

  var c4u = CUBIC_HERMITE(S0)(p4u);

  var c6u = CUBIC_HERMITE(S0)(p6u);
  var c7u = CUBIC_HERMITE(S0)(p7u);

  var c9u = CUBIC_HERMITE(S0)(p9u);

  var c11u = CUBIC_HERMITE(S0)(p11u);
  var c12u = CUBIC_HERMITE(S0)(p12u);
  var c13u = CUBIC_HERMITE(S0)(p13u);
  var c14u = CUBIC_HERMITE(S0)(p14u);
  var c15u = CUBIC_HERMITE(S0)(p15u);

  var cc00 = MAP(BEZIER(S1)([c00,c00u]))(domain2);

  var cc0 = MAP(BEZIER(S1)([c0,c0u]))(domain2);
  var cc1 = MAP(BEZIER(S1)([c1,c1u]))(domain2);
  var cc2 = MAP(BEZIER(S1)([c2,c2u]))(domain2);
  var cc3 = MAP(BEZIER(S1)([c3,c3u]))(domain2);
  var cc4 = MAP(BEZIER(S1)([c4,c4u]))(domain2);
  
  var cc6 = MAP(BEZIER(S1)([c6,c6u]))(domain2);
  var cc7 = MAP(BEZIER(S1)([c7,c7u]))(domain2);
  
  var cc9 = MAP(BEZIER(S1)([c9,c9u]))(domain2);
  
  var cc11 = MAP(BEZIER(S1)([c11,c11u]))(domain2);
  var cc12 = MAP(BEZIER(S1)([c12,c12u]))(domain2);
  var cc13 = MAP(BEZIER(S1)([c13,c13u]))(domain2);
  var cc14 = MAP(BEZIER(S1)([c14,c14u]))(domain2);
  var cc15 = MAP(BEZIER(S1)([c15,c15u]))(domain2);

  var t4u = T([0,1])([-.055,.175])(R([0,1])([-PI/2])(S([0,1])([.075,.075])(cc4)));
  var t5u = T([1])([.35])(S([1])([-1])(t4u));

  var t8u = T([0,1])([-.055,.405])(R([0,1])([PI/2])(t4u));

  var t9u = T([0,1])([-.155,.1])(S([0,1])([.02,.02])(STRUCT(REPLICA(4)([cc9,R([0,1])([PI/2])]))));
  var t10u = T([1])([.15])(t9u);

  var t16u = T([1])([-.12])(S([0,1])([.8,.8])(t9u));

  var e1u = T([0,1])([Math.cos(PI*3/32),Math.sin(PI*3/32)])(R([0,1])([PI*3/32])(T([1])([1/10])(R([0,1])([-PI/2])(S([0,1])([1/10,1/10])(cc1)))));
  var e2u = T([0])([.6])(R([0,1])([-(PI/2 - PI/8)])(STRUCT([cc2,cc3,t4u,t5u,cc6,cc7,t8u,t9u,t10u,cc11,cc12,cc13,cc14,cc15,t16u])));
  var e3u = S([0,1])([.95,.95])(STRUCT([cc00,cc0,e1u,statueCap()]));

  //DRAW(STRUCT([e3u,e2u]));

  return STRUCT([e3u,e2u]);
}

// Upper Border Half Section of the Octagonal Structure
function upperBorderLastElement() {

  var smallRadius = Math.sqrt( Math.pow(1 - Math.cos(PI/24),2 ) + Math.pow(0 - Math.sin(PI/24),2 ) );

  // Bordo Esterno
  var p00 = [[1,0,.1],[Math.cos(PI/24),Math.sin(PI/24),.1],[0,.23,0],[-.031,.25,0]];
  var p0 = [[Math.cos(PI/24),Math.sin(PI/24),.1],[Math.cos(PI*3/32),Math.sin(PI*3/32),.1],[-.031,.25,0],[-.015,.07,0]];
  
  //var p0 = [[1,0,.1],[Math.cos(PI*3/32),Math.sin(PI*3/32),.1],[0,.3,0],[-.01,.1,0]];
  var p1 = [[1,0,.1],[Math.cos(PI/2 + PI/37)*3/5,Math.sin(PI/2 + PI/37)*3/5,.1],[.01,.9,0],[-Math.cos(PI/37)*1.66,-Math.sin(PI/37)*1.66,0]];
  
  // Bordo Intermedio
  var p2 = [[0,0,.1],[-.055,0,.1],[0,0,0],[0,0,0]];
  var p3 = [[-.055,0,.1],[-.055,.1,.1],[0,0,0],[0,0,0]];
  var p4 = [[1,0,.1],[0,1,.1],[0,1.66,0],[-1.66,0,0]];
  var p6 = [[-.055,.25,.1],[-.055,.35,.1],[0,0,0],[0,0,0]];
  var p7 = [[-.055,.35,.1],[-.155,.35,.1],[0,0,0],[0,0,0]];

  // Colonna interna
  var p9 = [[1,0,.1],[0,1,.1],[0,1.66,0],[-1.66,0,0]];

  // Bordo Interno
  var p11 = [[0,0,.1],[-.155,0,.1],[0,0,0],[0,0,0]];
  var p12 = [[-.155,0,.1],[-.155,-.02,.1],[0,0,0],[0,0,0]];
  var p13 = [[-.155,-.02,.1],[-.06,-.02,.1],[0,0,0],[0,0,0]];
  var p14 = [[-.06,-.02,.1],[-.06,-.03,.1],[0,0,0],[0,0,0]];
  var p15 = [[-.06,-.03,.1],[-0.016,-.04,.1],[.03,0,0],[0,-.005,0]];

  var c00 = CUBIC_HERMITE(S0)(p00);
  
  var c0 = CUBIC_HERMITE(S0)(p0);
  var c1 = CUBIC_HERMITE(S0)(p1);

  var c2 = CUBIC_HERMITE(S0)(p2);
  var c3 = CUBIC_HERMITE(S0)(p3);

  var c4 = CUBIC_HERMITE(S0)(p4);

  var c6 = CUBIC_HERMITE(S0)(p6);
  var c7 = CUBIC_HERMITE(S0)(p7);

  var c9 = CUBIC_HERMITE(S0)(p9);

  var c11 = CUBIC_HERMITE(S0)(p11);
  var c12 = CUBIC_HERMITE(S0)(p12);
  var c13 = CUBIC_HERMITE(S0)(p13);
  var c14 = CUBIC_HERMITE(S0)(p14);
  var c15 = CUBIC_HERMITE(S0)(p15);

  // Bordo Esterno
  var p00u = [[1,0,.3],[Math.cos(PI/24),Math.sin(PI/24),.3],[0,.23,0],[-.031,.25,0]];
  var p0u = [[Math.cos(PI/24),Math.sin(PI/24),.3],[Math.cos(PI*3/32),Math.sin(PI*3/32),.3],[-.031,.25,0],[-.015,.07,0]];
  
  //var p0u = [[1,0,.3],[Math.cos(PI*3/32),Math.sin(PI*3/32),.3],[0,.3,0],[-.01,.1,0]];
  var p1u = [[1,0,.3],[Math.cos(PI/2 + PI/37)*3/5,Math.sin(PI/2 + PI/37)*3/5,.3],[.01,.9,0],[-Math.cos(PI/37)*1.66,-Math.sin(PI/37)*1.66,0]];
  
  // Bordo Intermedio
  var p2u = [[0,0,.3],[-.055,0,.3],[0,0,0],[0,0,0]];
  var p3u = [[-.055,0,.3],[-.055,.1,.3],[0,0,0],[0,0,0]];
  var p4u = [[1,0,.3],[0,1,.3],[0,1.66,0],[-1.66,0,0]];
  var p6u = [[-.055,.25,.3],[-.055,.35,.3],[0,0,0],[0,0,0]];
  var p7u = [[-.055,.35,.3],[-.155,.35,.3],[0,0,0],[0,0,0]];

  // Colonna interna
  var p9u = [[1,0,.3],[0,1,.3],[0,1.66,0],[-1.66,0,0]];

  // Bordo Interno
  var p11u = [[0,0,.3],[-.155,0,.3],[0,0,0],[0,0,0]];
  var p12u = [[-.155,0,.3],[-.155,-.02,.3],[0,0,0],[0,0,0]];
  var p13u = [[-.155,-.02,.3],[-.06,-.02,.3],[0,0,0],[0,0,0]];
  var p14u = [[-.06,-.02,.3],[-.06,-.03,.3],[0,0,0],[0,0,0]];
  var p15u = [[-.06,-.03,.3],[-0.016,-.04,.3],[.03,0,0],[0,-.005,0]];

  var c00u = CUBIC_HERMITE(S0)(p00u);

  var c0u = CUBIC_HERMITE(S0)(p0u);
  var c1u = CUBIC_HERMITE(S0)(p1u);

  var c2u = CUBIC_HERMITE(S0)(p2u);
  var c3u = CUBIC_HERMITE(S0)(p3u);

  var c4u = CUBIC_HERMITE(S0)(p4u);

  var c6u = CUBIC_HERMITE(S0)(p6u);
  var c7u = CUBIC_HERMITE(S0)(p7u);

  var c9u = CUBIC_HERMITE(S0)(p9u);

  var c11u = CUBIC_HERMITE(S0)(p11u);
  var c12u = CUBIC_HERMITE(S0)(p12u);
  var c13u = CUBIC_HERMITE(S0)(p13u);
  var c14u = CUBIC_HERMITE(S0)(p14u);
  var c15u = CUBIC_HERMITE(S0)(p15u);

  var cc00 = MAP(BEZIER(S1)([c00,c00u]))(domain2);

  var cc0 = MAP(BEZIER(S1)([c0,c0u]))(domain2);
  var cc1 = MAP(BEZIER(S1)([c1,c1u]))(domain2);
  var cc2 = MAP(BEZIER(S1)([c2,c2u]))(domain2);
  var cc3 = MAP(BEZIER(S1)([c3,c3u]))(domain2);
  var cc4 = MAP(BEZIER(S1)([c4,c4u]))(domain2);
  
  var cc6 = MAP(BEZIER(S1)([c6,c6u]))(domain2);
  var cc7 = MAP(BEZIER(S1)([c7,c7u]))(domain2);
  
  var cc9 = MAP(BEZIER(S1)([c9,c9u]))(domain2);
  
  var cc11 = MAP(BEZIER(S1)([c11,c11u]))(domain2);
  var cc12 = MAP(BEZIER(S1)([c12,c12u]))(domain2);
  var cc13 = MAP(BEZIER(S1)([c13,c13u]))(domain2);
  var cc14 = MAP(BEZIER(S1)([c14,c14u]))(domain2);
  var cc15 = MAP(BEZIER(S1)([c15,c15u]))(domain2);

  var t4u = T([0,1])([-.055,.175])(R([0,1])([-PI/2])(S([0,1])([.075,.075])(cc4)));
  var t5u = T([1])([.35])(S([1])([-1])(t4u));

  var t8u = T([0,1])([-.055,.405])(R([0,1])([PI/2])(t4u));

  var t9u = T([0,1])([-.155,.1])(S([0,1])([.02,.02])(STRUCT(REPLICA(4)([cc9,R([0,1])([PI/2])]))));
  var t10u = T([1])([.15])(t9u);

  var t16u = T([1])([-.12])(S([0,1])([.8,.8])(t9u));

  var e1u = T([0,1])([Math.cos(PI*3/32),Math.sin(PI*3/32)])(R([0,1])([PI*3/32])(T([1])([1/10])(R([0,1])([-PI/2])(S([0,1])([1/10,1/10])(cc1)))));
  var e2u = T([0])([.6])(R([0,1])([-(PI/2 - PI/8)])(STRUCT([cc2,cc3,t4u,t5u,cc6,cc7,t8u,t9u,t10u,cc11,cc12,cc13,cc14,cc15,t16u])));
  var e3u = S([0,1])([.95,.95])(STRUCT([cc00,cc0,e1u]));

  //DRAW(STRUCT([e3u,e2u]));

  return STRUCT([e3u,e2u]);
}

function upperBorderPropylaeum() {

  // Bordo Intermedio
  var p2 = [[0,0,.1],[-.055,0,.1],[0,0,0],[0,0,0]];
  var p3 = [[-.055,0,.1],[-.055,.1,.1],[0,0,0],[0,0,0]];
  var p4 = [[1,0,.1],[0,1,.1],[0,1.66,0],[-1.66,0,0]];
  var p6 = [[-.055,.25,.1],[-.055,.35,.1],[0,0,0],[0,0,0]];
  var p7 = [[-.055,.35,.1],[-.155,.35,.1],[0,0,0],[0,0,0]];
  var p8 = [[-.155,.35,.1],[-.155,.4,.1],[0,0,0],[0,0,0]];

  // Colonna interna
  var p9 = [[1,0,.1],[0,1,.1],[0,1.66,0],[-1.66,0,0]];

  // Bordo Interno
  var p11 = [[0,0,.1],[-.155,0,.1],[0,0,0],[0,0,0]];
  var p12 = [[-.155,0,.1],[-.155,-.02,.1],[0,0,0],[0,0,0]];
  var p13 = [[-.155,-.02,.1],[-.06,-.02,.1],[0,0,0],[0,0,0]];
  var p14 = [[-.06,-.02,.1],[-.06,-.03,.1],[0,0,0],[0,0,0]];
  var p15 = [[-.06,-.03,.1],[-0.016,-.04,.1],[.03,0,0],[0,-.005,0]];

  // Propileo
  var p20 = [[-.155,.4,.1],[-.055,.4,.1],[0,0,0],[0,0,0]];
  var p21 = [[-.055,.4,.1],[-.055,.5,.1],[0,0,0],[0,0,0]];
  var p22 = [[-.055,.5,.1],[-.035,.5,.1],[0,0,0],[0,0,0]];
  var p23 = [[-.035,.5,.1],[-.035,.4,.1],[0,0,0],[0,0,0]];
  var p24 = [[-.035,.4,.1],[.115,.4,.1],[0,0,0],[0,0,0]];
  var p25 = [[1,0,.1],[0,1,.1],[0,1.66,0],[-1.66,0,0]];

  // Bordo Esterno
  var p30 = [[-.155,.7,.1],[-.155,.72,.1],[0,0,0],[0,0,0]];
  var p31 = [[-.155,.72,.1],[.115,.72,.1],[0,0,0],[0,0,0]];
  var p32 = [[1,0,.1],[0,1,.1],[0,1.66,0],[-1.66,0,0]];
  var p34 = [[.115,.38,.1],[.134,.3232,.1],[0,0,0],[0,0,0]];

  var c2 = CUBIC_HERMITE(S0)(p2);
  var c3 = CUBIC_HERMITE(S0)(p3);

  var c4 = CUBIC_HERMITE(S0)(p4);

  var c6 = CUBIC_HERMITE(S0)(p6);
  var c7 = CUBIC_HERMITE(S0)(p7);

  var c8 = CUBIC_HERMITE(S0)(p8);

  var c20 = CUBIC_HERMITE(S0)(p20);
  var c21 = CUBIC_HERMITE(S0)(p21);
  var c22 = CUBIC_HERMITE(S0)(p22);
  var c23 = CUBIC_HERMITE(S0)(p23);
  var c24 = CUBIC_HERMITE(S0)(p24);
  var c25 = CUBIC_HERMITE(S0)(p25);

  var c9 = CUBIC_HERMITE(S0)(p9);

  var c11 = CUBIC_HERMITE(S0)(p11);
  var c12 = CUBIC_HERMITE(S0)(p12);
  var c13 = CUBIC_HERMITE(S0)(p13);
  var c14 = CUBIC_HERMITE(S0)(p14);
  var c15 = CUBIC_HERMITE(S0)(p15);

  var c30 = CUBIC_HERMITE(S0)(p30);
  var c31 = CUBIC_HERMITE(S0)(p31);
  var c32 = CUBIC_HERMITE(S0)(p32);
  var c34 = CUBIC_HERMITE(S0)(p34);

  // Bordo Intermedio
  var p2u = [[0,0,.3],[-.055,0,.3],[0,0,0],[0,0,0]];
  var p3u = [[-.055,0,.3],[-.055,.1,.3],[0,0,0],[0,0,0]];
  var p4u = [[1,0,.3],[0,1,.3],[0,1.66,0],[-1.66,0,0]];
  var p6u = [[-.055,.25,.3],[-.055,.35,.3],[0,0,0],[0,0,0]];
  var p7u = [[-.055,.35,.3],[-.155,.35,.3],[0,0,0],[0,0,0]];
  var p8u = [[-.155,.35,.3],[-.155,.4,.3],[0,0,0],[0,0,0]];

  // Colonna interna
  var p9u = [[1,0,.3],[0,1,.3],[0,1.66,0],[-1.66,0,0]];

  // Bordo Interno
  var p11u = [[0,0,.3],[-.155,0,.3],[0,0,0],[0,0,0]];
  var p12u = [[-.155,0,.3],[-.155,-.02,.3],[0,0,0],[0,0,0]];
  var p13u = [[-.155,-.02,.3],[-.06,-.02,.3],[0,0,0],[0,0,0]];
  var p14u = [[-.06,-.02,.3],[-.06,-.03,.3],[0,0,0],[0,0,0]];
  var p15u = [[-.06,-.03,.3],[-0.016,-.04,.3],[.03,0,0],[0,-.005,0]];

  // Propileo
  var p20u = [[-.155,.4,.3],[-.055,.4,.3],[0,0,0],[0,0,0]];
  var p21u = [[-.055,.4,.3],[-.055,.5,.3],[0,0,0],[0,0,0]];
  var p22u = [[-.055,.5,.3],[-.035,.5,.3],[0,0,0],[0,0,0]];
  var p23u = [[-.035,.5,.3],[-.035,.4,.3],[0,0,0],[0,0,0]];
  var p24u = [[-.035,.4,.3],[.115,.4,.3],[0,0,0],[0,0,0]];
  var p25u = [[1,0,.3],[0,1,.3],[0,1.66,0],[-1.66,0,0]];

  // Bordo Esterno
  var p30u = [[-.155,.7,.3],[-.155,.72,.3],[0,0,0],[0,0,0]];
  var p31u = [[-.155,.72,.3],[.115,.72,.3],[0,0,0],[0,0,0]];
  var p32u = [[1,0,.3],[0,1,.3],[0,1.66,0],[-1.66,0,0]];
  var p34u = [[.115,.38,.3],[.134,.3232,.3],[0,0,0],[0,0,0]];

  var c2u = CUBIC_HERMITE(S0)(p2u);
  var c3u = CUBIC_HERMITE(S0)(p3u);

  var c4u = CUBIC_HERMITE(S0)(p4u);

  var c6u = CUBIC_HERMITE(S0)(p6u);
  var c7u = CUBIC_HERMITE(S0)(p7u);

  var c8u = CUBIC_HERMITE(S0)(p8u);

  var c20u = CUBIC_HERMITE(S0)(p20u);
  var c21u = CUBIC_HERMITE(S0)(p21u);
  var c22u = CUBIC_HERMITE(S0)(p22u);
  var c23u = CUBIC_HERMITE(S0)(p23u);
  var c24u = CUBIC_HERMITE(S0)(p24u);
  var c25u = CUBIC_HERMITE(S0)(p25u);

  var c9u = CUBIC_HERMITE(S0)(p9u);

  var c11u = CUBIC_HERMITE(S0)(p11u);
  var c12u = CUBIC_HERMITE(S0)(p12u);
  var c13u = CUBIC_HERMITE(S0)(p13u);
  var c14u = CUBIC_HERMITE(S0)(p14u);
  var c15u = CUBIC_HERMITE(S0)(p15u);

  var c30u = CUBIC_HERMITE(S0)(p30u);
  var c31u = CUBIC_HERMITE(S0)(p31u);
  var c32u = CUBIC_HERMITE(S0)(p32u);
  var c34u = CUBIC_HERMITE(S0)(p34u);

  // Final Surfaces
  var cc2 = MAP(BEZIER(S1)([c2,c2u]))(domain2);
  var cc3 = MAP(BEZIER(S1)([c3,c3u]))(domain2);

  var cc4 = MAP(BEZIER(S1)([c4,c4u]))(domain2);

  var cc6 = MAP(BEZIER(S1)([c6,c6u]))(domain2);
  var cc7 = MAP(BEZIER(S1)([c7,c7u]))(domain2);

  var cc8 = MAP(BEZIER(S1)([c8,c8u]))(domain2);

  var cc20 = MAP(BEZIER(S1)([c20,c20u]))(domain2);
  var cc21 = MAP(BEZIER(S1)([c21,c21u]))(domain2);
  var cc22 = MAP(BEZIER(S1)([c22,c22u]))(domain2);
  var cc23 = MAP(BEZIER(S1)([c23,c23u]))(domain2);
  var cc24 = MAP(BEZIER(S1)([c24,c24u]))(domain2);
  var cc25 = MAP(BEZIER(S1)([c25,c25u]))(domain2);

  var cc9 = MAP(BEZIER(S1)([c9,c9u]))(domain2);

  var cc11 = MAP(BEZIER(S1)([c11,c11u]))(domain2);
  var cc12 = MAP(BEZIER(S1)([c12,c12u]))(domain2);
  var cc13 = MAP(BEZIER(S1)([c13,c13u]))(domain2);
  var cc14 = MAP(BEZIER(S1)([c14,c14u]))(domain2);
  var cc15 = MAP(BEZIER(S1)([c15,c15u]))(domain2);

  var cc30 = MAP(BEZIER(S1)([c30,c30u]))(domain2);
  var cc31 = MAP(BEZIER(S1)([c31,c31u]))(domain2);
  var cc32 = MAP(BEZIER(S1)([c32,c32u]))(domain2);
  var cc34 = MAP(BEZIER(S1)([c34,c34u]))(domain2);

  var t4 = T([0,1])([-.055,.175])(R([0,1])([-PI/2])(S([0,1])([.075,.075])(cc4)));
  var t5 = T([1])([.35])(S([1])([-1])(t4));

  var t8 = T([0,1])([-.055,.405])(R([0,1])([PI/2])(t4));

  var t9 = T([0,1])([-.155,.1])(S([0,1])([.02,.02])(STRUCT(REPLICA(4)([cc9,R([0,1])([PI/2])]))));
  var t10 = T([1])([.15])(t9);

  var t16 = T([1])([-.12])(S([0,1])([.8,.8])(t9));

  var t25 = T([0,1])([.115,.55])(R([0,1])([-PI/2])(S([0,1])([.15,.15])(cc25)));

  var t32 = S([0,1])([.17,.17])(cc32);
  var t33 = S([1])([-1])(t32);

  var e4 = STRUCT([cc20,cc21,cc22,cc23,cc24,t25]);
  var e5 = T([1])([1.1])(S([1])([-1])(e4));
  var e6 = T([0,1])([.115,.55])(STRUCT([t32,t33]));

  var ammassoMortale = STRUCT([cc2,cc3,t4,t5,cc6,cc7,cc8,e4,e5,t9,t10,cc11,cc12,cc13,cc14,cc15,t16,cc30,cc31,e6,cc34]);
  var e2 = T([0])([.6])(R([0,1])([-(PI/2 - PI/8)])(ammassoMortale));
  
  //DRAW(ammassoMortale);

  //DRAW(STRUCT([e2]));

  return e2;
}

function upperBorder() {

  // Border
  var halfBorder1 = upperBorderElement();
  var halfBorder2 = R([0,1])([-PI])(S([0])([-1])(halfBorder1));
  var border = R([0,1])([PI/4])(STRUCT([halfBorder1, halfBorder2]));

  var halfBorderRight = R([0,1])([-PI*6/16])(upperBorderLastElement());
  var halfBorderLeft = S([0])([-1])(halfBorderRight);
  var lastBorder = R([0,1])([PI*3/8])(STRUCT([halfBorderRight,halfBorderLeft]));
  
  var halfPropylaeum1 = upperBorderPropylaeum();
  var halfPropylaeum2 = R([0,1])([-PI*6/8])(S([0])([-1])(halfPropylaeum1));
  var propylaeum = R([0,1])([-PI/4])(STRUCT([halfPropylaeum1,halfPropylaeum2]));

  var borderTemp = STRUCT(REPLICA(6)([border,R([0,1])([PI/4])]));
  var borderComplete = STRUCT([propylaeum,borderTemp,lastBorder]);
  
  //DRAW(borderComplete);

  var upperBorder = T([2])([.01])(borderComplete);

  //DRAW(upperBorder);
  
  return upperBorder;
}

function topBorderElement() {

  var smallRadius = Math.sqrt( Math.pow(1 - Math.cos(PI/24),2 ) + Math.pow(0 - Math.sin(PI/24),2 ) );

  // Bordo Esterno
  var p0 = [[Math.cos(PI/24),Math.sin(PI/24),.3],[Math.cos(PI*3/32),Math.sin(PI*3/32),.3],[-.031,.25,0],[-.015,.07,0]];

  // Bordo Intermedio
  var p2 = [[0,0,.3],[-.055,0,.3],[0,0,0],[0,0,0]];
  var p3 = [[-.055,0,.3],[-.055,.1,.3],[0,0,0],[0,0,0]];
  var p6 = [[-.055,.25,.3],[-.055,.35,.3],[0,0,0],[0,0,0]];
  var p7 = [[-.055,.35,.3],[-.155,.35,.3],[0,0,0],[0,0,0]];

  // Colonna interna
  var p9 = [[1,0,.3],[0,1,.3],[0,1.66,0],[-1.66,0,0]];

  // Bordo Interno
  var p11 = [[0,0,.3],[-.155,0,.3],[0,0,0],[0,0,0]];
  var p12 = [[-.155,0,.3],[-.155,-.02,.3],[0,0,0],[0,0,0]];
  var p13 = [[-.155,-.02,.3],[-.06,-.02,.3],[0,0,0],[0,0,0]];
  var p14 = [[-.06,-.02,.3],[-.06,-.03,.3],[0,0,0],[0,0,0]];
  var p15 = [[-.06,-.03,.3],[-0.016,-.04,.3],[.03,0,0],[0,-.005,0]];

  var c0 = CUBIC_HERMITE(S0)(p0);

  var c2 = CUBIC_HERMITE(S0)(p2);
  var c3 = CUBIC_HERMITE(S0)(p3);

  var c6 = CUBIC_HERMITE(S0)(p6);
  var c7 = CUBIC_HERMITE(S0)(p7);

  var c9 = CUBIC_HERMITE(S0)(p9);

  var c11 = CUBIC_HERMITE(S0)(p11);
  var c12 = CUBIC_HERMITE(S0)(p12);
  var c13 = CUBIC_HERMITE(S0)(p13);
  var c14 = CUBIC_HERMITE(S0)(p14);
  var c15 = CUBIC_HERMITE(S0)(p15);

  // Bordo Esterno
  var p0u = [[Math.cos(PI/24),Math.sin(PI/24),.4],[Math.cos(PI*3/32),Math.sin(PI*3/32),.4],[-.031,.25,0],[-.015,.07,0]];
  
  // Bordo Intermedio
  var p2u = [[0,0,.4],[-.055,0,.4],[0,0,0],[0,0,0]];
  var p3u = [[-.055,0,.4],[-.055,.1,.4],[0,0,0],[0,0,0]];
  var p6u = [[-.055,.25,.4],[-.055,.35,.4],[0,0,0],[0,0,0]];
  var p7u = [[-.055,.35,.4],[-.155,.35,.4],[0,0,0],[0,0,0]];

  // Colonna interna
  var p9u = [[1,0,.4],[0,1,.4],[0,1.66,0],[-1.66,0,0]];

  // Bordo Interno
  var p11u = [[0,0,.4],[-.155,0,.4],[0,0,0],[0,0,0]];
  var p12u = [[-.155,0,.4],[-.155,-.02,.4],[0,0,0],[0,0,0]];
  var p13u = [[-.155,-.02,.4],[-.06,-.02,.4],[0,0,0],[0,0,0]];
  var p14u = [[-.06,-.02,.4],[-.06,-.03,.4],[0,0,0],[0,0,0]];
  var p15u = [[-.06,-.03,.4],[-0.016,-.04,.4],[.03,0,0],[0,-.005,0]];

  var c0u = CUBIC_HERMITE(S0)(p0u);

  var c2u = CUBIC_HERMITE(S0)(p2u);
  var c3u = CUBIC_HERMITE(S0)(p3u);

  var c6u = CUBIC_HERMITE(S0)(p6u);
  var c7u = CUBIC_HERMITE(S0)(p7u);

  var c9u = CUBIC_HERMITE(S0)(p9u);

  var c11u = CUBIC_HERMITE(S0)(p11u);
  var c12u = CUBIC_HERMITE(S0)(p12u);
  var c13u = CUBIC_HERMITE(S0)(p13u);
  var c14u = CUBIC_HERMITE(S0)(p14u);
  var c15u = CUBIC_HERMITE(S0)(p15u);

  // Archi
  var pp0 = [[-.055,.1,.3],[-.055,.1,.4],[0,0,0],[0,0,0]];
  var pp1 = [[-.055,.1,.3],[-.055,.175,.4],[0,0,.15],[0,.135,0]];
  var pp2 = [[-.055,.25,.3],[-.055,.25,.4],[0,0,0],[0,0,0]];
  var pp3 = [[-.055,.25,.3],[-.055,.175,.4],[0,0,.15],[0,-.135,0]];
  
  var pp4 = [[-.155,.35,.3],[-.155,.35,.4],[0,0,0],[0,0,0]];
  var pp5 = [[-.155,.35,.3],[-.23,.35,.4],[0,0,.15],[-.135,0,0]];

  var pp6 = [[1,0,.4],[Math.cos(PI/24),Math.sin(PI/24),.4],[0,.166,0],[-.01,.1,0]];
  var pp7 = [[1,0,.4],[Math.cos(PI/24),Math.sin(PI/24),.3],[0,.166,0],[0,0,-.166]];

  var pp8 = [[Math.cos(PI*3/32),Math.sin(PI*3/32),.4],[Math.cos(PI/8),Math.sin(PI/8),.4],[-.015,.07,0],[-.033,.1,0]];
  var pp9 = [[Math.cos(PI*3/32),Math.sin(PI*3/32),.3],[Math.cos(PI/8),Math.sin(PI/8),.4],[-.015,.07,.18],[-.033,.1,0]];

  var d0 = CUBIC_HERMITE(S0)(pp0);
  var d1 = CUBIC_HERMITE(S0)(pp1);
  var d2 = CUBIC_HERMITE(S0)(pp2);
  var d3 = CUBIC_HERMITE(S0)(pp3);

  var d4 = CUBIC_HERMITE(S0)(pp4);
  var d5 = CUBIC_HERMITE(S0)(pp5);

  var d6 = CUBIC_HERMITE(S0)(pp6);
  var d7 = CUBIC_HERMITE(S0)(pp7);
  var d8 = CUBIC_HERMITE(S0)(pp8);
  var d9 = CUBIC_HERMITE(S0)(pp9);

  var dd0 = MAP(BEZIER(S1)([d0,d1]))(domain2);
  var dd1 = MAP(BEZIER(S1)([d2,d3]))(domain2);
  
  var dd2 = MAP(BEZIER(S1)([d4,d5]))(domain2);

  var dd3 = MAP(BEZIER(S1)([d6,d7]))(domain2);
  var dd4 = MAP(BEZIER(S1)([d8,d9]))(domain2);

  var cc00 = sphere(.25 * (23/24),.5,10);

  var cc0 = MAP(BEZIER(S1)([c0,c0u]))(domain2);
  var cc1 = sphere(.25 * (33/32),.5,10);

  var cc2 = MAP(BEZIER(S1)([c2,c2u]))(domain2);
  var cc3 = MAP(BEZIER(S1)([c3,c3u]))(domain2);
  
  var cc4 = sphere(.5,.5,20);

  var cc6 = MAP(BEZIER(S1)([c6,c6u]))(domain2);
  var cc7 = MAP(BEZIER(S1)([c7,c7u]))(domain2);
  
  var cc8 = sphere(.25 * (63/64),.5,10);

  var cc9 = MAP(BEZIER(S1)([c9,c9u]))(domain2);
  
  var cc11 = MAP(BEZIER(S1)([c11,c11u]))(domain2);
  var cc12 = MAP(BEZIER(S1)([c12,c12u]))(domain2);
  var cc13 = MAP(BEZIER(S1)([c13,c13u]))(domain2);
  var cc14 = MAP(BEZIER(S1)([c14,c14u]))(domain2);
  var cc15 = MAP(BEZIER(S1)([c15,c15u]))(domain2);

  var t00u = T([0,2])([1,.3])(R([0,1])([PI/2 * (24/23)])(S([0,1,2])([.13,.131,.1])(cc00)));
  var t1u = R([0,1])([PI/8])( T([0,2])([1,.3])(R([0,1])([-PI/2 * (33/32)])(S([0,1,2])([.098,.065,.1])(cc1))));

  var t4u = T([0,1,2])([-.055,.175,.3])(R([0,1])([-PI/2])(S([0,1,2])([.075,.075,.1])(cc4)));

  var t8u = R([0,1])([PI/8])( T([0,2])([.95,.3])(R([0,1])([-PI/2 * (63/64)])(S([0,1,2])([.07875,.081125,.1])(cc8))));

  var t9u = T([0,1])([-.155,.1])(S([0,1])([.02,.02])(STRUCT(REPLICA(4)([cc9,R([0,1])([PI/2])]))));
  var t10u = T([1])([.15])(t9u);

  var t16u = T([1])([-.12])(S([0,1])([.8,.8])(t9u));

  var e2u = T([0])([.6])(R([0,1])([-(PI/2 - PI/8)])(STRUCT([dd0,dd1,dd2,cc2,cc3,t4u,cc6,cc7,t9u,t10u,cc11,cc12,cc13,cc14,cc15,t16u])));
  var e3u = S([0,1])([.95,.95])(STRUCT([t00u,t1u,t8u,cc0,dd3,dd4]));
  
  //DRAW(STRUCT([e3u,e2u]));

  return STRUCT([e3u,e2u]);
}

function topBorderLastElement() {

  var smallRadius = Math.sqrt( Math.pow(1 - Math.cos(PI/24),2 ) + Math.pow(0 - Math.sin(PI/24),2 ) );

  // Bordo Esterno
  var p00 = [[1,0,.3],[Math.cos(PI/24),Math.sin(PI/24),.3],[0,.23,0],[-.031,.25,0]];
  var p0 = [[Math.cos(PI/24),Math.sin(PI/24),.3],[Math.cos(PI*3/32),Math.sin(PI*3/32),.3],[-.031,.25,0],[-.015,.07,0]];
  
  // Bordo Intermedio
  var p2 = [[0,0,.3],[-.055,0,.3],[0,0,0],[0,0,0]];
  var p3 = [[-.055,0,.3],[-.055,.1,.3],[0,0,0],[0,0,0]];
  var p6 = [[-.055,.25,.3],[-.055,.35,.3],[0,0,0],[0,0,0]];
  var p7 = [[-.055,.35,.3],[-.155,.35,.3],[0,0,0],[0,0,0]];

  // Colonna interna
  var p9 = [[1,0,.3],[0,1,.3],[0,1.66,0],[-1.66,0,0]];

  // Bordo Interno
  var p11 = [[0,0,.3],[-.155,0,.3],[0,0,0],[0,0,0]];
  var p12 = [[-.155,0,.3],[-.155,-.02,.3],[0,0,0],[0,0,0]];
  var p13 = [[-.155,-.02,.3],[-.06,-.02,.3],[0,0,0],[0,0,0]];
  var p14 = [[-.06,-.02,.3],[-.06,-.03,.3],[0,0,0],[0,0,0]];
  var p15 = [[-.06,-.03,.3],[-0.016,-.04,.3],[.03,0,0],[0,-.005,0]];

  var c00 = CUBIC_HERMITE(S0)(p00);
  
  var c0 = CUBIC_HERMITE(S0)(p0);
  
  var c2 = CUBIC_HERMITE(S0)(p2);
  var c3 = CUBIC_HERMITE(S0)(p3);

  var c6 = CUBIC_HERMITE(S0)(p6);
  var c7 = CUBIC_HERMITE(S0)(p7);

  var c9 = CUBIC_HERMITE(S0)(p9);

  var c11 = CUBIC_HERMITE(S0)(p11);
  var c12 = CUBIC_HERMITE(S0)(p12);
  var c13 = CUBIC_HERMITE(S0)(p13);
  var c14 = CUBIC_HERMITE(S0)(p14);
  var c15 = CUBIC_HERMITE(S0)(p15);

  // Bordo Esterno
  var p00u = [[1,0,.4],[Math.cos(PI/24),Math.sin(PI/24),.4],[0,.23,0],[-.031,.25,0]];
  var p0u = [[Math.cos(PI/24),Math.sin(PI/24),.4],[Math.cos(PI*3/32),Math.sin(PI*3/32),.4],[-.031,.25,0],[-.015,.07,0]];
  
  // Bordo Intermedio
  var p2u = [[0,0,.4],[-.055,0,.4],[0,0,0],[0,0,0]];
  var p3u = [[-.055,0,.4],[-.055,.1,.4],[0,0,0],[0,0,0]];
  var p6u = [[-.055,.25,.4],[-.055,.35,.4],[0,0,0],[0,0,0]];
  var p7u = [[-.055,.35,.4],[-.155,.35,.4],[0,0,0],[0,0,0]];

  // Colonna interna
  var p9u = [[1,0,.4],[0,1,.4],[0,1.66,0],[-1.66,0,0]];

  // Bordo Interno
  var p11u = [[0,0,.4],[-.155,0,.4],[0,0,0],[0,0,0]];
  var p12u = [[-.155,0,.4],[-.155,-.02,.4],[0,0,0],[0,0,0]];
  var p13u = [[-.155,-.02,.4],[-.06,-.02,.4],[0,0,0],[0,0,0]];
  var p14u = [[-.06,-.02,.4],[-.06,-.03,.4],[0,0,0],[0,0,0]];
  var p15u = [[-.06,-.03,.4],[-0.016,-.04,.4],[.03,0,0],[0,-.005,0]];

  var c00u = CUBIC_HERMITE(S0)(p00u);

  var c0u = CUBIC_HERMITE(S0)(p0u);
  
  var c2u = CUBIC_HERMITE(S0)(p2u);
  var c3u = CUBIC_HERMITE(S0)(p3u);

  var c6u = CUBIC_HERMITE(S0)(p6u);
  var c7u = CUBIC_HERMITE(S0)(p7u);

  var c9u = CUBIC_HERMITE(S0)(p9u);

  var c11u = CUBIC_HERMITE(S0)(p11u);
  var c12u = CUBIC_HERMITE(S0)(p12u);
  var c13u = CUBIC_HERMITE(S0)(p13u);
  var c14u = CUBIC_HERMITE(S0)(p14u);
  var c15u = CUBIC_HERMITE(S0)(p15u);

  // Archi
  var pp0 = [[-.055,.1,.3],[-.055,.1,.4],[0,0,0],[0,0,0]];
  var pp1 = [[-.055,.1,.3],[-.055,.175,.4],[0,0,.15],[0,.135,0]];
  var pp2 = [[-.055,.25,.3],[-.055,.25,.4],[0,0,0],[0,0,0]];
  var pp3 = [[-.055,.25,.3],[-.055,.175,.4],[0,0,.15],[0,-.135,0]];
  
  var pp4 = [[-.155,.35,.3],[-.155,.35,.4],[0,0,0],[0,0,0]];
  var pp5 = [[-.155,.35,.3],[-.23,.35,.4],[0,0,.15],[-.135,0,0]];

  var pp6 = [[1,0,.4],[Math.cos(PI/24),Math.sin(PI/24),.4],[0,.166,0],[-.01,.1,0]];
  var pp7 = [[1,0,.4],[Math.cos(PI/24),Math.sin(PI/24),.3],[0,.166,0],[0,0,-.166]];

  var pp8 = [[Math.cos(PI*3/32),Math.sin(PI*3/32),.4],[Math.cos(PI/8),Math.sin(PI/8),.4],[-.015,.07,0],[-.033,.1,0]];
  var pp9 = [[Math.cos(PI*3/32),Math.sin(PI*3/32),.3],[Math.cos(PI/8),Math.sin(PI/8),.4],[-.015,.07,.18],[-.033,.1,0]];

  var d0 = CUBIC_HERMITE(S0)(pp0);
  var d1 = CUBIC_HERMITE(S0)(pp1);
  var d2 = CUBIC_HERMITE(S0)(pp2);
  var d3 = CUBIC_HERMITE(S0)(pp3);

  var d4 = CUBIC_HERMITE(S0)(pp4);
  var d5 = CUBIC_HERMITE(S0)(pp5);

  var d6 = CUBIC_HERMITE(S0)(pp6);
  var d7 = CUBIC_HERMITE(S0)(pp7);
  var d8 = CUBIC_HERMITE(S0)(pp8);
  var d9 = CUBIC_HERMITE(S0)(pp9);

  var dd0 = MAP(BEZIER(S1)([d0,d1]))(domain2);
  var dd1 = MAP(BEZIER(S1)([d2,d3]))(domain2);
  
  var dd2 = MAP(BEZIER(S1)([d4,d5]))(domain2);

  var dd3 = MAP(BEZIER(S1)([d6,d7]))(domain2);
  var dd4 = MAP(BEZIER(S1)([d8,d9]))(domain2);

  var cc00 = MAP(BEZIER(S1)([c00,c00u]))(domain2);

  var cc0 = MAP(BEZIER(S1)([c0,c0u]))(domain2);
  var cc1 = sphere(.25 * (33/32),.5,10);
  var cc2 = MAP(BEZIER(S1)([c2,c2u]))(domain2);
  var cc3 = MAP(BEZIER(S1)([c3,c3u]))(domain2);

  var cc4 = sphere(.5,.5,20);
  
  var cc6 = MAP(BEZIER(S1)([c6,c6u]))(domain2);
  var cc7 = MAP(BEZIER(S1)([c7,c7u]))(domain2);

  var cc8 = sphere(.25 * (63/64),.5,10);

  var cc9 = MAP(BEZIER(S1)([c9,c9u]))(domain2);
  
  var cc11 = MAP(BEZIER(S1)([c11,c11u]))(domain2);
  var cc12 = MAP(BEZIER(S1)([c12,c12u]))(domain2);
  var cc13 = MAP(BEZIER(S1)([c13,c13u]))(domain2);
  var cc14 = MAP(BEZIER(S1)([c14,c14u]))(domain2);
  var cc15 = MAP(BEZIER(S1)([c15,c15u]))(domain2);

  var t1u = R([0,1])([PI/8])( T([0,2])([1,.3])(R([0,1])([-PI/2 * (33/32)])(S([0,1,2])([.098,.065,.1])(cc1))));

  var t4u = T([0,1,2])([-.055,.175,.3])(R([0,1])([-PI/2])(S([0,1,2])([.075,.075,.1])(cc4)));

  var t8u = R([0,1])([PI/8])( T([0,2])([.95,.3])(R([0,1])([-PI/2 * (63/64)])(S([0,1,2])([.07875,.081125,.1])(cc8))));

  var t9u = T([0,1])([-.155,.1])(S([0,1])([.02,.02])(STRUCT(REPLICA(4)([cc9,R([0,1])([PI/2])]))));
  var t10u = T([1])([.15])(t9u);

  var t16u = T([1])([-.12])(S([0,1])([.8,.8])(t9u));

  
  var e2u = T([0])([.6])(R([0,1])([-(PI/2 - PI/8)])(STRUCT([dd0,dd1,dd2,cc2,cc3,t4u,cc6,cc7,t9u,t10u,cc11,cc12,cc13,cc14,cc15,t16u])));
  var e3u = S([0,1])([.95,.95])(STRUCT([cc00,cc0,t1u,t8u,dd3,dd4]));

  //DRAW(STRUCT([e3u,e2u]));

  return STRUCT([e3u,e2u]);
}

function topBorderPropylaeum() {

  // Bordo Intermedio
  var p2 = [[0,0,.3],[-.055,0,.3],[0,0,0],[0,0,0]];
  var p3 = [[-.055,0,.3],[-.055,.1,.3],[0,0,0],[0,0,0]];
  var p6 = [[-.055,.25,.3],[-.055,.35,.3],[0,0,0],[0,0,0]];
  var p7 = [[-.055,.35,.3],[-.155,.35,.3],[0,0,0],[0,0,0]];
  var p8 = [[-.155,.35,.3],[-.155,.4,.3],[0,0,0],[0,0,0]];

  // Colonna interna
  var p9 = [[1,0,.3],[0,1,.3],[0,1.66,0],[-1.66,0,0]];

  // Bordo Interno
  var p11 = [[0,0,.3],[-.155,0,.3],[0,0,0],[0,0,0]];
  var p12 = [[-.155,0,.3],[-.155,-.02,.3],[0,0,0],[0,0,0]];
  var p13 = [[-.155,-.02,.3],[-.06,-.02,.3],[0,0,0],[0,0,0]];
  var p14 = [[-.06,-.02,.3],[-.06,-.03,.3],[0,0,0],[0,0,0]];
  var p15 = [[-.06,-.03,.3],[-0.016,-.04,.3],[.03,0,0],[0,-.005,0]];

  // Propileo
  var p20 = [[-.155,.4,.3],[-.055,.4,.3],[0,0,0],[0,0,0]];
  var p21 = [[-.055,.4,.3],[-.055,.5,.3],[0,0,0],[0,0,0]];
  var p22 = [[-.055,.5,.3],[-.035,.5,.3],[0,0,0],[0,0,0]];
  var p23 = [[-.035,.5,.3],[-.035,.4,.3],[0,0,0],[0,0,0]];
  var p24 = [[-.035,.4,.3],[.115,.4,.3],[0,0,0],[0,0,0]];
  var p25 = [[1,0,.3],[0,1,.3],[0,1.66,0],[-1.66,0,0]];

  // Bordo Esterno
  var p30 = [[-.155,.7,.3],[-.155,.72,.3],[0,0,0],[0,0,0]];
  var p31 = [[-.155,.72,.3],[.115,.72,.3],[0,0,0],[0,0,0]];
  var p32 = [[1,0,.3],[0,1,.3],[0,1.66,0],[-1.66,0,0]];
  var p34 = [[.115,.38,.3],[.134,.3232,.3],[0,0,0],[0,0,0]];

  var c2 = CUBIC_HERMITE(S0)(p2);
  var c3 = CUBIC_HERMITE(S0)(p3);

  var c6 = CUBIC_HERMITE(S0)(p6);
  var c7 = CUBIC_HERMITE(S0)(p7);

  var c8 = CUBIC_HERMITE(S0)(p8);

  var c20 = CUBIC_HERMITE(S0)(p20);
  var c21 = CUBIC_HERMITE(S0)(p21);
  var c22 = CUBIC_HERMITE(S0)(p22);
  var c23 = CUBIC_HERMITE(S0)(p23);
  var c24 = CUBIC_HERMITE(S0)(p24);
  var c25 = CUBIC_HERMITE(S0)(p25);

  var c9 = CUBIC_HERMITE(S0)(p9);

  var c11 = CUBIC_HERMITE(S0)(p11);
  var c12 = CUBIC_HERMITE(S0)(p12);
  var c13 = CUBIC_HERMITE(S0)(p13);
  var c14 = CUBIC_HERMITE(S0)(p14);
  var c15 = CUBIC_HERMITE(S0)(p15);

  var c30 = CUBIC_HERMITE(S0)(p30);
  var c31 = CUBIC_HERMITE(S0)(p31);
  var c32 = CUBIC_HERMITE(S0)(p32);
  var c34 = CUBIC_HERMITE(S0)(p34);

  // Bordo Intermedio
  var p2u = [[0,0,.4],[-.055,0,.4],[0,0,0],[0,0,0]];
  var p3u = [[-.055,0,.4],[-.055,.1,.4],[0,0,0],[0,0,0]];
  var p6u = [[-.055,.25,.4],[-.055,.35,.4],[0,0,0],[0,0,0]];
  var p7u = [[-.055,.35,.4],[-.155,.35,.4],[0,0,0],[0,0,0]];
  var p8u = [[-.155,.35,.4],[-.155,.4,.4],[0,0,0],[0,0,0]];

  // Colonna interna
  var p9u = [[1,0,.4],[0,1,.4],[0,1.66,0],[-1.66,0,0]];

  // Bordo Interno
  var p11u = [[0,0,.4],[-.155,0,.4],[0,0,0],[0,0,0]];
  var p12u = [[-.155,0,.4],[-.155,-.02,.4],[0,0,0],[0,0,0]];
  var p13u = [[-.155,-.02,.4],[-.06,-.02,.4],[0,0,0],[0,0,0]];
  var p14u = [[-.06,-.02,.4],[-.06,-.03,.4],[0,0,0],[0,0,0]];
  var p15u = [[-.06,-.03,.4],[-0.016,-.04,.4],[.03,0,0],[0,-.005,0]];

  // Propileo
  var p20u = [[-.155,.4,.4],[-.055,.4,.4],[0,0,0],[0,0,0]];
  var p21u = [[-.055,.4,.4],[-.055,.5,.4],[0,0,0],[0,0,0]];
  var p22u = [[-.055,.5,.4],[-.035,.5,.4],[0,0,0],[0,0,0]];
  var p23u = [[-.035,.5,.4],[-.035,.4,.4],[0,0,0],[0,0,0]];
  var p24u = [[-.035,.4,.4],[.115,.4,.4],[0,0,0],[0,0,0]];
  var p25u = [[1,0,.4],[0,1,.4],[0,1.66,0],[-1.66,0,0]];

  // Bordo Esterno
  var p30u = [[-.155,.7,.4],[-.155,.72,.4],[0,0,0],[0,0,0]];
  var p31u = [[-.155,.72,.4],[.115,.72,.4],[0,0,0],[0,0,0]];
  var p32u = [[1,0,.4],[0,1,.4],[0,1.66,0],[-1.66,0,0]];
  var p34u = [[.115,.38,.4],[.134,.3232,.4],[0,0,0],[0,0,0]];

  var c2u = CUBIC_HERMITE(S0)(p2u);
  var c3u = CUBIC_HERMITE(S0)(p3u);

  var c6u = CUBIC_HERMITE(S0)(p6u);
  var c7u = CUBIC_HERMITE(S0)(p7u);

  var c8u = CUBIC_HERMITE(S0)(p8u);

  var c20u = CUBIC_HERMITE(S0)(p20u);
  var c21u = CUBIC_HERMITE(S0)(p21u);
  var c22u = CUBIC_HERMITE(S0)(p22u);
  var c23u = CUBIC_HERMITE(S0)(p23u);
  var c24u = CUBIC_HERMITE(S0)(p24u);
  var c25u = CUBIC_HERMITE(S0)(p25u);

  var c9u = CUBIC_HERMITE(S0)(p9u);

  var c11u = CUBIC_HERMITE(S0)(p11u);
  var c12u = CUBIC_HERMITE(S0)(p12u);
  var c13u = CUBIC_HERMITE(S0)(p13u);
  var c14u = CUBIC_HERMITE(S0)(p14u);
  var c15u = CUBIC_HERMITE(S0)(p15u);

  var c30u = CUBIC_HERMITE(S0)(p30u);
  var c31u = CUBIC_HERMITE(S0)(p31u);
  var c32u = CUBIC_HERMITE(S0)(p32u);
  var c34u = CUBIC_HERMITE(S0)(p34u);

  // Archi
  var pp0 = [[-.055,.1,.3],[-.055,.1,.4],[0,0,0],[0,0,0]];
  var pp1 = [[-.055,.1,.3],[-.055,.175,.4],[0,0,.15],[0,.135,0]];
  var pp2 = [[-.055,.25,.3],[-.055,.25,.4],[0,0,0],[0,0,0]];
  var pp3 = [[-.055,.25,.3],[-.055,.175,.4],[0,0,.15],[0,-.135,0]];
  
  var d0 = CUBIC_HERMITE(S0)(pp0);
  var d1 = CUBIC_HERMITE(S0)(pp1);
  var d2 = CUBIC_HERMITE(S0)(pp2);
  var d3 = CUBIC_HERMITE(S0)(pp3);

  var dd0 = MAP(BEZIER(S1)([d0,d1]))(domain2);
  var dd1 = MAP(BEZIER(S1)([d2,d3]))(domain2);
  
  // Final Surfaces
  var cc2 = MAP(BEZIER(S1)([c2,c2u]))(domain2);
  var cc3 = MAP(BEZIER(S1)([c3,c3u]))(domain2);

  var cc4 = sphere(.5,.5,20);

  var cc6 = MAP(BEZIER(S1)([c6,c6u]))(domain2);
  var cc7 = MAP(BEZIER(S1)([c7,c7u]))(domain2);

  var cc8 = MAP(BEZIER(S1)([c8,c8u]))(domain2);

  var cc20 = MAP(BEZIER(S1)([c20,c20u]))(domain2);
  var cc21 = MAP(BEZIER(S1)([c21,c21u]))(domain2);
  var cc22 = MAP(BEZIER(S1)([c22,c22u]))(domain2);
  var cc23 = MAP(BEZIER(S1)([c23,c23u]))(domain2);
  var cc24 = MAP(BEZIER(S1)([c24,c24u]))(domain2);
  var cc25 = MAP(BEZIER(S1)([c25,c25u]))(domain2);

  var cc9 = MAP(BEZIER(S1)([c9,c9u]))(domain2);

  var cc11 = MAP(BEZIER(S1)([c11,c11u]))(domain2);
  var cc12 = MAP(BEZIER(S1)([c12,c12u]))(domain2);
  var cc13 = MAP(BEZIER(S1)([c13,c13u]))(domain2);
  var cc14 = MAP(BEZIER(S1)([c14,c14u]))(domain2);
  var cc15 = MAP(BEZIER(S1)([c15,c15u]))(domain2);

  var cc30 = MAP(BEZIER(S1)([c30,c30u]))(domain2);
  var cc31 = MAP(BEZIER(S1)([c31,c31u]))(domain2);
  var cc32 = MAP(BEZIER(S1)([c32,c32u]))(domain2);
  var cc34 = MAP(BEZIER(S1)([c34,c34u]))(domain2);

  var t4 = T([0,1,2])([-.055,.175,.3])(R([0,1])([-PI/2])(S([0,1,2])([.075,.075,.1])(cc4)));

  var t9 = T([0,1])([-.155,.1])(S([0,1])([.02,.02])(STRUCT(REPLICA(4)([cc9,R([0,1])([PI/2])]))));
  var t10 = T([1])([.15])(t9);

  var t16 = T([1])([-.12])(S([0,1])([.8,.8])(t9));

  var t25 = T([0,1])([.115,.55])(R([0,1])([-PI/2])(S([0,1])([.15,.15])(cc25)));

  var t32 = S([0,1])([.17,.17])(cc32);
  var t33 = S([1])([-1])(t32);

  var e4 = STRUCT([cc20,cc21,cc22,cc23,cc24,t25]);
  var e5 = T([1])([1.1])(S([1])([-1])(e4));
  var e6 = T([0,1])([.115,.55])(STRUCT([t32,t33]));

  var ammassoMortale = STRUCT([dd0,dd1,cc2,cc3,t4,cc6,cc7,cc8,e4,e5,t9,t10,cc11,cc12,cc13,cc14,cc15,t16,cc30,cc31,e6,cc34]);
  var e2 = T([0])([.6])(R([0,1])([-(PI/2 - PI/8)])(ammassoMortale));
  
  //DRAW(ammassoMortale);

  //DRAW(STRUCT([e2]));

  return e2;
}

function topBorder() {

  // Border
  var halfBorder1 = topBorderElement();
  var halfBorder2 = R([0,1])([-PI])(S([0])([-1])(halfBorder1));
  var border = R([0,1])([PI/4])(STRUCT([halfBorder1, halfBorder2]));

  var halfBorderRight = R([0,1])([-PI*6/16])(topBorderLastElement());
  var halfBorderLeft = S([0])([-1])(halfBorderRight);
  var lastBorder = R([0,1])([PI*3/8])(STRUCT([halfBorderRight,halfBorderLeft]));
  
  var halfPropylaeum1 = topBorderPropylaeum();
  var halfPropylaeum2 = R([0,1])([-PI*6/8])(S([0])([-1])(halfPropylaeum1));
  var propylaeum = R([0,1])([-PI/4])(STRUCT([halfPropylaeum1,halfPropylaeum2]));

  var borderTemp = STRUCT(REPLICA(6)([border,R([0,1])([PI/4])]));
  var borderComplete = STRUCT([propylaeum,borderTemp,lastBorder]);
  
  //DRAW(borderComplete);

  var topBorder = T([2])([.01])(borderComplete);

  //DRAW(topBorder);
  
  return topBorder;
}

function roofElement() {

  var p0 = [[Math.cos(PI/8) * .4,Math.sin(PI/8) * .4,.4],[.4,0,.4],[.05,-.1,0],[0,-1.66 / 16,0]];
  var p2 = [[Math.cos(PI/8),Math.sin(PI/8),.4],[1,0,.4],[.04,-.08,0],[0,-.6,0]];
  
  var c0 = CUBIC_HERMITE(S0)(p0);
  var c2 = CUBIC_HERMITE(S0)(p2);
  
  var cc0 = MAP(BEZIER(S1)([c0,c2]))(domain2);
  
  var p0u = [[Math.cos(PI/8) * .4,Math.sin(PI/8) * .4,.41],[.4,0,.41],[.05,-.1,0],[0,-1.66 / 16,0]];
  var p2u = [[Math.cos(PI/8),Math.sin(PI/8),.41],[1,0,.41],[.04,-.08,0],[0,-.6,0]];
  
  var c0u = CUBIC_HERMITE(S0)(p0u);
  var c2u = CUBIC_HERMITE(S0)(p2u);
  
  var cc0u = MAP(BEZIER(S1)([c0u,c2u]))(domain2);

  var ct0 = MAP(BEZIER(S1)([c0,c0u]))(domain2);
  var ct2 = MAP(BEZIER(S1)([c2,c2u]))(domain2);
  
  var finalTop = STRUCT([cc0,cc0u,ct0,ct2]);
  
  //DRAW(finalTop);

  return finalTop;
}

function roofFrontElement() {

  var p0e = [[1,0,.4],[0,1,.4],[0,1.66,0],[-1.66,0,0]];
  var p1e = [[0,0,.4],[0,0,.4],[0,0,0],[0,0,0]];
  
  var p2e = [[0,.89,.4],[.34,.89,.4],[0,0,0],[0,0,0]];
  var p3e = [[0,1.11,.4],[.34,1.11,.4],[0,0,0],[0,0,0]];

  var c0e = CUBIC_HERMITE(S0)(p0e);
  var c1e = CUBIC_HERMITE(S0)(p1e);

  var c2e = CUBIC_HERMITE(S0)(p2e);
  var c3e = CUBIC_HERMITE(S0)(p3e);

  var s0e = MAP(BEZIER(S1)([c0e,c1e]))(domain2);
  var s1e = MAP(BEZIER(S1)([c2e,c3e]))(domain2);
  var s2e = T([0,1])([.34,1.11])(S([0,1])([.22,-.22])(s0e));

  var t0e = STRUCT([s1e,s2e]);
  var t1e = T([1])([2.22])(S([1])([-1])(t0e));
  var t2e = STRUCT([t0e,t1e]);
  var t3e = S([0])([-1])(t2e);
  var t4e = R([0,1])([-PI/2 - PI/8])(T([1])([-.005])(STRUCT([t2e,t3e])));

  var p0eu = [[1,0,.41],[0,1,.41],[0,1.66,0],[-1.66,0,0]];
  var p1eu = [[0,0,.41],[0,0,.41],[0,0,0],[0,0,0]];
  
  var p2eu = [[0,.89,.41],[.34,.89,.41],[0,0,0],[0,0,0]];
  var p3eu = [[0,1.11,.41],[.34,1.11,.41],[0,0,0],[0,0,0]];

  var c0eu = CUBIC_HERMITE(S0)(p0eu);
  var c1eu = CUBIC_HERMITE(S0)(p1eu);

  var c2eu = CUBIC_HERMITE(S0)(p2eu);
  var c3eu = CUBIC_HERMITE(S0)(p3eu);

  var s0eu = MAP(BEZIER(S1)([c0eu,c1eu]))(domain2);
  var s1eu = MAP(BEZIER(S1)([c2eu,c3eu]))(domain2);
  var s2eu = T([0,1])([.34,1.11])(S([0,1])([.22,-.22])(s0eu));

  var t0eu = STRUCT([s1eu,s2eu]);
  var t1eu = T([1])([2.22])(S([1])([-1])(t0eu));
  var t2eu = STRUCT([t0eu,t1eu]);
  var t3eu = S([0])([-1])(t2eu);
  var t4eu = R([0,1])([-PI/2 - PI/8])(T([1])([-.005])(STRUCT([t2eu,t3eu])));

  var cc0eu = T([0,1])([.34,1.11])(S([0,1])([.22,-.22])(MAP(BEZIER(S1)([c0e,c0eu]))(domain2)));
  var cc2eu = MAP(BEZIER(S1)([c2e,c2eu]))(domain2);

  var tt0eu = STRUCT([cc0eu,cc2eu]);
  var tt1eu = S([0])([-1])(tt0eu);
  var tt2eu = T([1])([2.22])(S([1])([-1])(STRUCT([tt0eu,tt1eu])));
  var tt3eu = R([0,1])([-PI/2 - PI/8])(T([1])([-.005])(STRUCT([tt0eu,tt1eu,tt2eu])));

  var roofFront = STRUCT([t4e,t4eu,tt3eu]);

  //DRAW(roofFront);

  return roofFront;
}


function roof()Â {
  
  var halfSegment1 = roofElement();
  var halfSegment2 = S([1])([-1])(halfSegment1);
  var segment = STRUCT([halfSegment1,halfSegment2]);
  var roofFront = roofFrontElement();
  var roof = STRUCT(REPLICA(8)([segment,R([0,1])([PI/4])]));

  var roofFinal = T([2])([.01])(STRUCT([roof,roofFront]));

  return roofFinal;
}

function sideDome() {
  
  // Lower Circle
  var p0 = [[1,0,0],[0,1,0],[0,1.66,0],[-1.66,0,0]];
  var p1 = [[.25,0,0],[0,.25,0],[0,.415,0],[-.415,0,0]];

  var c0 = CUBIC_HERMITE(S0)(p0);
  var c1 = CUBIC_HERMITE(S0)(p1);

  var p0u = [[1,0,.05],[0,1,.05],[0,1.66,0],[-1.66,0,0]];
  var p1u = [[.25,0,.05],[0,.25,.05],[0,.415,0],[-.415,0,0]];

  var c0u = CUBIC_HERMITE(S0)(p0u);
  var c1u = CUBIC_HERMITE(S0)(p1u);

  var cc0 = MAP(BEZIER(S1)([c0,c1]))(domain2);
  var cc1 = MAP(BEZIER(S1)([c0u,c1u]))(domain2);
  var cc2 = MAP(BEZIER(S1)([c0,c0u]))(domain2);
  var cc3 = MAP(BEZIER(S1)([c1,c1u]))(domain2);

  var lowerSection = STRUCT([cc0,cc1,cc2,cc3]);

  var lowerCircle = STRUCT(REPLICA(4)([lowerSection,R([0,1])([PI/2])]));

  // Mid Circle
  var p2 = [[.5,0,.4],[0,.5,.4],[0,.83,0],[-.83,0,0]];
  var p3 = [[.25,0,.4],[0,.25,.4],[0,.415,0],[-.415,0,0]];

  var c2 = CUBIC_HERMITE(S0)(p2);
  var c3 = CUBIC_HERMITE(S0)(p3);

  var p2u = [[.5,0,.45],[0,.5,.45],[0,.83,0],[-.83,0,0]];
  var p3u = [[.25,0,.45],[0,.25,.45],[0,.415,0],[-.415,0,0]];

  var c2u = CUBIC_HERMITE(S0)(p2u);
  var c3u = CUBIC_HERMITE(S0)(p3u);

  var cc4 = MAP(BEZIER(S1)([c2,c3]))(domain2);
  var cc5 = MAP(BEZIER(S1)([c2u,c3u]))(domain2);
  var cc6 = MAP(BEZIER(S1)([c2,c2u]))(domain2);
  var cc7 = MAP(BEZIER(S1)([c3,c3u]))(domain2);

  var midSection = STRUCT([cc4,cc5,cc6,cc7]);

  var midCircle = STRUCT(REPLICA(4)([midSection,R([0,1])([PI/2])]));

  // Upper Circle
  var upperCircle = T([2])([.25])(midCircle);

  // Lower Border
  var domain = DOMAIN([[0, 2 * PI],[PI/6,PI/2]])([40,20]);
  var lowerBorder = MAP(function (v) {
    return [Math.sin(v[1])*Math.cos(v[0]),Math.sin(v[1])*Math.sin(v[0]),Math.cos(v[1])];
  })(domain);
  lowerBorder = S([2])([.462])(lowerBorder);

  // Mid Border
  var p4 = [[.45,0,.45],[0,.45,.45],[0,1.66 * .45,0],[-1.66 * .45,0,0]];
  var p5 = [[.4,0,.45],[0,.4,.45],[0,1.66 * .4,0],[-1.66 * .4,0,0]];

  var c4 = CUBIC_HERMITE(S0)(p4);
  var c5 = CUBIC_HERMITE(S0)(p5);

  var p4u = [[.45,0,.7],[0,.45,.7],[0,1.66 * .45,0],[-1.66 * .45,0,0]];
  var p5u = [[.4,0,.7],[0,.4,.7],[0,1.66 * .4,0],[-1.66 * .4,0,0]];

  var c4u = CUBIC_HERMITE(S0)(p4u);
  var c5u = CUBIC_HERMITE(S0)(p5u);

  var cc8 = MAP(BEZIER(S1)([c4,c5]))(domain2);
  var cc9 = MAP(BEZIER(S1)([c4u,c5u]))(domain2);
  var cc10 = MAP(BEZIER(S1)([c4,c4u]))(domain2);
  var cc11 = MAP(BEZIER(S1)([c5,c5u]))(domain2);

  var midBorderSection = STRUCT([cc8,cc9,cc10,cc11]);

  var midBorder = STRUCT(REPLICA(4)([midBorderSection,R([0,1])([PI/2])]));

  // Upper Border
  var p6 = [[.45,0,.7],[0,.45,.7],[0,1.66 * .45,0],[-1.66 * .45,0,0]];
  var p7 = [[.4,0,.7],[0,.4,.7],[0,1.66 * .4,0],[-1.66 * .4,0,0]];

  var c6 = CUBIC_HERMITE(S0)(p6);
  var c7 = CUBIC_HERMITE(S0)(p7);

  var p6u = [[0,0,1],[0,0,1],[0,0,0],[0,0,0]];
  var p7u = [[0,0,.95],[0,0,.95],[0,0,0],[0,0,0]];

  var c6u = CUBIC_HERMITE(S0)(p6u);
  var c7u = CUBIC_HERMITE(S0)(p7u);

  var cc12 = MAP(BEZIER(S1)([c6,c7]))(domain2);
  var cc13 = MAP(BEZIER(S1)([c6u,c7u]))(domain2);
  var cc14 = MAP(BEZIER(S1)([c6,c6u]))(domain2);
  var cc15 = MAP(BEZIER(S1)([c7,c7u]))(domain2);

  var upperBorderSection = STRUCT([cc12,cc13,cc14,cc15]);

  var upperBorder = STRUCT(REPLICA(4)([upperBorderSection,R([0,1])([PI/2])]));

  // Final Side Dome
  var dome = STRUCT([lowerCircle,lowerBorder,midCircle,midBorder,upperCircle,upperBorder]);

  //DRAW(dome);

  return dome;
}

function sideDomes() {
  var dome = sideDome();
  dome = S([0,1,2])([.23,.23,.3])(dome);
  dome = T([0,2])([.75,.42])(dome);

  var domeComplete = STRUCT(REPLICA(8)([dome,R([0,1])([PI/4])]));

  return domeComplete;
}

function centralDomeElement() {

  // Border Exterior
  var p0 = [[Math.cos(PI/8) * .5,0,.42],[Math.cos(PI/8) * .5,0,.57],[0,0,0],[0,0,0]];
  var p1 = [[Math.cos(PI/8) * .5,Math.sin(PI/8) * .48,.42],[Math.cos(PI/8) * .5,Math.sin(PI/8) * .48,.57],[0,0,0],[0,0,0]];
  var p2 = [[Math.cos(PI/8) * .5,.05,.57],[Math.cos(PI/8) * .5,.05,.67],[0,0,0],[0,0,0]];
  var p3 = [[Math.cos(PI/8) * .5,Math.sin(PI/8) * .48,.57],[Math.cos(PI/8) * .5,Math.sin(PI/8) * .48,.67],[0,0,0],[0,0,0]];
  var p4 = [[Math.cos(PI/8) * .5,0,.67],[Math.cos(PI/8) * .5,0,.72],[0,0,0],[0,0,0]];
  var p5 = [[Math.cos(PI/8) * .5,Math.sin(PI/8) * .48,.67],[Math.cos(PI/8) * .5,Math.sin(PI/8) * .48,.72],[0,0,0],[0,0,0]];

  var p6 = [[Math.cos(PI/8) * .5,0,.57],[Math.cos(PI/8) * .5,.05,.62],[0,.083,0],[0,0,.083]];
  var p7 = [[Math.cos(PI/8) * .5,.05,.57],[Math.cos(PI/8) * .5,.05,.57],[0,0,0],[0,0,0]];
  var p8 = [[Math.cos(PI/8) * .5,.05,.62],[Math.cos(PI/8) * .5,0,.67],[0,0,.083],[0,-.083,0]];
  var p9 = [[Math.cos(PI/8) * .5,.05,.67],[Math.cos(PI/8) * .5,.05,.67],[0,0,0],[0,0,0]];

  var p10 = [[Math.cos(PI/8) * .51,Math.sin(PI/8) * .48,.42],[Math.cos(PI/8) * .51,Math.sin(PI/8) * .48,.72],[0,0,0],[0,0,0]];
  var p11 = [[Math.cos(PI/8) * .51,Math.sin(PI/8) * .51,.42],[Math.cos(PI/8) * .51,Math.sin(PI/8) * .51,.72],[0,0,0],[0,0,0]];

  var p12 = [[Math.cos(PI/8) * .51,0,.72],[Math.cos(PI/8) * .51,Math.sin(PI/8) * .51,.72],[0,0,0],[0,0,0]];
  var p13 = [[Math.cos(PI/8) * .51,0,.74],[Math.cos(PI/8) * .51,Math.sin(PI/8) * .51,.74],[0,0,0],[0,0,0]];

  // Eaves
  var p14 = [[Math.cos(PI/8) * .51,Math.sin(PI/8) * .51,.72],[Math.cos(PI/8) * .53,Math.sin(PI/8) * .53,.74],[0,0,0],[0,0,0]];
  var p15 = [[Math.cos(PI/8) * .51,Math.sin(PI/8) * .48,.72],[Math.cos(PI/8) * .53,Math.sin(PI/8) * .48,.74],[0,0,0],[0,0,0]];
  var p16 = [[Math.cos(PI/8) * .48,Math.sin(PI/8) * .48,.72],[Math.cos(PI/8) * .48,Math.sin(PI/8) * .48,.74],[0,0,0],[0,0,0]];

  var p17 = [[Math.cos(PI/8) * .53,0,.74],[Math.cos(PI/8) * .53,Math.sin(PI/8) * .53,.74],[0,0,0],[0,0,0]];
  var p18 = [[Math.cos(PI/8) * .53,0,.75],[Math.cos(PI/8) * .53,Math.sin(PI/8) * .53,.75],[0,0,0],[0,0,0]];
  
  var p19 = [[Math.cos(PI/8) * .51,0,.72],[Math.cos(PI/8) * .53,0,.74],[0,0,0],[0,0,0]];
  var p20 = [[Math.cos(PI/8) * .51,.02,.72],[Math.cos(PI/8) * .53,.02,.74],[0,0,0],[0,0,0]];
  var p21 = [[Math.cos(PI/8) * .51,0,.72],[Math.cos(PI/8) * .51,0,.74],[0,0,0],[0,0,0]];
  var p22 = [[Math.cos(PI/8) * .51,.02,.72],[Math.cos(PI/8) * .51,.02,.74],[0,0,0],[0,0,0]];

  var p23 = [[Math.cos(PI/8) * .52,Math.sin(PI/8) * .48,.75],[Math.cos(PI/8) * .52,Math.sin(PI/8) * .48,.77],[0,0,0],[0,0,0]];
  var p24 = [[Math.cos(PI/8) * .53,Math.sin(PI/8) * .48,.75],[Math.cos(PI/8) * .53,Math.sin(PI/8) * .48,.77],[0,0,0],[0,0,0]];
  var p25 = [[Math.cos(PI/8) * .53,Math.sin(PI/8) * .53,.75],[Math.cos(PI/8) * .53,Math.sin(PI/8) * .53,.77],[0,0,0],[0,0,0]];
  
  var p26 = [[Math.cos(PI/8) * .52,Math.sin(PI/8) * .48,.77],[Math.cos(PI/8) * .52,Math.sin(PI/8) * .52,.77],[0,0,0],[0,0,0]];
  var p27 = [[Math.cos(PI/8) * .53,Math.sin(PI/8) * .48,.77],[Math.cos(PI/8) * .53,Math.sin(PI/8) * .53,.77],[0,0,0],[0,0,0]];
  var p28 = [[Math.cos(PI/8) * .52,Math.sin(PI/8) * .48,.75],[Math.cos(PI/8) * .52,Math.sin(PI/8) * .52,.75],[0,0,0],[0,0,0]];
  
  var p29 = [[Math.cos(PI/8) * .52,0,.77],[Math.cos(PI/8) * .52,Math.sin(PI/8) * .52,.77],[0,0,0],[0,0,0]];
  var p30 = [[Math.cos(PI/8) * .52,0,.78],[Math.cos(PI/8) * .52,Math.sin(PI/8) * .52,.78],[0,0,0],[0,0,0]];
  var p31 = [[Math.cos(PI/8) * .53,0,.77],[Math.cos(PI/8) * .53,Math.sin(PI/8) * .53,.77],[0,0,0],[0,0,0]];
  var p32 = [[Math.cos(PI/8) * .53,0,.78],[Math.cos(PI/8) * .53,Math.sin(PI/8) * .53,.78],[0,0,0],[0,0,0]];

  var p33 = [[Math.cos(PI/8) * .51,0,.75],[0,0,1.25],[0,0,.7],[-.2,0,0]];
  var p34 = [[Math.cos(PI/8) * .50,Math.sin(PI/8) * .48,.75],[Math.sin(PI/8) * .05,0,1.25],[0,0,.8],[-.025,-.015,0]];
  var p35 = [[Math.cos(PI/8) * .51,Math.sin(PI/8) * .48,.75],[Math.sin(PI/8) * .05,0,1.255],[0,0,.8],[-.025,-.015,0]];
  var p36 = [[Math.cos(PI/8) * .51,Math.sin(PI/8) * .51,.75],[0,0,1.26],[0,0,.85],[-.05,-.02,0]];

  var c0 = CUBIC_HERMITE(S0)(p0);
  var c1 = CUBIC_HERMITE(S0)(p1);
  var c2 = CUBIC_HERMITE(S0)(p2);
  var c3 = CUBIC_HERMITE(S0)(p3);
  var c4 = CUBIC_HERMITE(S0)(p4);
  var c5 = CUBIC_HERMITE(S0)(p5);
  
  var c6 = CUBIC_HERMITE(S0)(p6);
  var c7 = CUBIC_HERMITE(S0)(p7);
  var c8 = CUBIC_HERMITE(S0)(p8);
  var c9 = CUBIC_HERMITE(S0)(p9);

  var c10 = CUBIC_HERMITE(S0)(p10);
  var c11 = CUBIC_HERMITE(S0)(p11);

  var c12 = CUBIC_HERMITE(S0)(p12);
  var c13 = CUBIC_HERMITE(S0)(p13);

  var c14 = CUBIC_HERMITE(S0)(p14);
  var c15 = CUBIC_HERMITE(S0)(p15);
  var c16 = CUBIC_HERMITE(S0)(p16);

  var c17 = CUBIC_HERMITE(S0)(p17);
  var c18 = CUBIC_HERMITE(S0)(p18);

  var c19 = CUBIC_HERMITE(S0)(p19);
  var c20 = CUBIC_HERMITE(S0)(p20);
  var c21 = CUBIC_HERMITE(S0)(p21);
  var c22 = CUBIC_HERMITE(S0)(p22);

  var c23 = CUBIC_HERMITE(S0)(p23);
  var c24 = CUBIC_HERMITE(S0)(p24);
  var c25 = CUBIC_HERMITE(S0)(p25);

  var c26 = CUBIC_HERMITE(S0)(p26);
  var c27 = CUBIC_HERMITE(S0)(p27);
  var c28 = CUBIC_HERMITE(S0)(p28);

  var c29 = CUBIC_HERMITE(S0)(p29);
  var c30 = CUBIC_HERMITE(S0)(p30);
  var c31 = CUBIC_HERMITE(S0)(p31);
  var c32 = CUBIC_HERMITE(S0)(p32);

  var c33 = CUBIC_HERMITE(S0)(p33);
  var c34 = CUBIC_HERMITE(S0)(p34);
  var c35 = CUBIC_HERMITE(S0)(p35);
  var c36 = CUBIC_HERMITE(S0)(p36);
  
  // Border Interior
  var p0u = [[Math.cos(PI/8) * .48,0,.42],[Math.cos(PI/8) * .48,0,.57],[0,0,0],[0,0,0]];
  var p1u = [[Math.cos(PI/8) * .48,Math.sin(PI/8) * .48,.42],[Math.cos(PI/8) * .48,Math.sin(PI/8) * .48,.57],[0,0,0],[0,0,0]];
  var p2u = [[Math.cos(PI/8) * .48,.05,.57],[Math.cos(PI/8) * .48,.05,.67],[0,0,0],[0,0,0]];
  var p3u = [[Math.cos(PI/8) * .48,Math.sin(PI/8) * .48,.57],[Math.cos(PI/8) * .48,Math.sin(PI/8) * .48,.67],[0,0,0],[0,0,0]];
  var p4u = [[Math.cos(PI/8) * .48,0,.67],[Math.cos(PI/8) * .48,0,.75],[0,0,0],[0,0,0]];
  var p5u = [[Math.cos(PI/8) * .48,Math.sin(PI/8) * .48,.67],[Math.cos(PI/8) * .48,Math.sin(PI/8) * .48,.75],[0,0,0],[0,0,0]];

  var p6u = [[Math.cos(PI/8) * .48,0,.57],[Math.cos(PI/8) * .48,.05,.62],[0,.083,0],[0,0,.083]];
  var p7u = [[Math.cos(PI/8) * .48,.05,.57],[Math.cos(PI/8) * .48,.05,.57],[0,0,0],[0,0,0]];
  var p8u = [[Math.cos(PI/8) * .48,.05,.62],[Math.cos(PI/8) * .48,0,.67],[0,0,.083],[0,-.083,0]];
  var p9u = [[Math.cos(PI/8) * .48,.05,.67],[Math.cos(PI/8) * .48,.05,.67],[0,0,0],[0,0,0]];

  var p10u = [[Math.cos(PI/8) * .48,Math.sin(PI/8) * .48,.42],[Math.cos(PI/8) * .48,Math.sin(PI/8) * .48,.72],[0,0,0],[0,0,0]];

  var p12u = [[Math.cos(PI/8) * .48,0,.72],[Math.cos(PI/8) * .48,Math.sin(PI/8) * .48,.72],[0,0,0],[0,0,0]];
  var p13u = [[Math.cos(PI/8) * .51,0,.72],[Math.cos(PI/8) * .51,Math.sin(PI/8) * .48,.72],[0,0,0],[0,0,0]];

  var p14u = [[Math.cos(PI/8) * .51,0,.74],[Math.cos(PI/8) * .51,Math.sin(PI/8) * .48,.74],[0,0,0],[0,0,0]];
  var p15u = [[Math.cos(PI/8) * .53,0,.74],[Math.cos(PI/8) * .53,Math.sin(PI/8) * .48,.74],[0,0,0],[0,0,0]];

  var p16u = [[Math.cos(PI/8) * .48,0,.75],[Math.cos(PI/8) * .48,Math.sin(PI/8) * .48,.75],[0,0,0],[0,0,0]];
  var p17u = [[Math.cos(PI/8) * .53,0,.75],[Math.cos(PI/8) * .53,Math.sin(PI/8) * .53,.75],[0,0,0],[0,0,0]];

  var p18u = [[Math.cos(PI/8) * .52,0,.75],[Math.cos(PI/8) * .52,0,.77],[0,0,0],[0,0,0]];
  var p19u = [[Math.cos(PI/8) * .52,.02,.75],[Math.cos(PI/8) * .52,.02,.77],[0,0,0],[0,0,0]];
  var p20u = [[Math.cos(PI/8) * .53,0,.75],[Math.cos(PI/8) * .53,0,.77],[0,0,0],[0,0,0]];
  var p21u = [[Math.cos(PI/8) * .53,.02,.75],[Math.cos(PI/8) * .53,.02,.77],[0,0,0],[0,0,0]];
  var p22u = [[Math.cos(PI/8) * .52,0,.77],[Math.cos(PI/8) * .53,0,.77],[0,0,0],[0,0,0]];
  var p23u = [[Math.cos(PI/8) * .52,.02,.77],[Math.cos(PI/8) * .53,.02,.77],[0,0,0],[0,0,0]];

  var p24u = [[Math.cos(PI/8) * .48,0,.75],[0,0,1.22],[0,0,.7],[-.2,0,0]];
  var p25u = [[Math.cos(PI/8) * .48,Math.sin(PI/8) * .48,.75],[0,0,1.22],[0,0,.7],[0,-.02,0]];
  
  var c0u = CUBIC_HERMITE(S0)(p0u);
  var c1u = CUBIC_HERMITE(S0)(p1u);
  var c2u = CUBIC_HERMITE(S0)(p2u);
  var c3u = CUBIC_HERMITE(S0)(p3u);
  var c4u = CUBIC_HERMITE(S0)(p4u);
  var c5u = CUBIC_HERMITE(S0)(p5u);
  
  var c6u = CUBIC_HERMITE(S0)(p6u);
  var c7u = CUBIC_HERMITE(S0)(p7u);
  var c8u = CUBIC_HERMITE(S0)(p8u);
  var c9u = CUBIC_HERMITE(S0)(p9u);
  
  var c10u = CUBIC_HERMITE(S0)(p10u);

  var c12u = CUBIC_HERMITE(S0)(p12u);
  var c13u = CUBIC_HERMITE(S0)(p13u);

  var c14u = CUBIC_HERMITE(S0)(p14u);
  var c15u = CUBIC_HERMITE(S0)(p15u);

  var c16u = CUBIC_HERMITE(S0)(p16u);
  var c17u = CUBIC_HERMITE(S0)(p17u);

  var c18u = CUBIC_HERMITE(S0)(p18u);
  var c19u = CUBIC_HERMITE(S0)(p19u);
  var c20u = CUBIC_HERMITE(S0)(p20u);
  var c21u = CUBIC_HERMITE(S0)(p21u);
  var c22u = CUBIC_HERMITE(S0)(p22u);
  var c23u = CUBIC_HERMITE(S0)(p23u);

  var c24u = CUBIC_HERMITE(S0)(p24u);
  var c25u = CUBIC_HERMITE(S0)(p25u);

  var cc0 = MAP(BEZIER(S1)([c0,c1]))(domain2);
  var cc1 = MAP(BEZIER(S1)([c2,c3]))(domain2);
  var cc2 = MAP(BEZIER(S1)([c4,c5]))(domain2);
  var cc3 = MAP(BEZIER(S1)([c6,c7]))(domain2);
  var cc4 = MAP(BEZIER(S1)([c8,c9]))(domain2);
  var cc5 = MAP(BEZIER(S1)([c10,c11]))(domain2);
  var cc6 = MAP(BEZIER(S1)([c12,c13]))(domain2);
  var cc7 = MAP(BEZIER(S1)([c14,c15]))(domain2);
  var cc8 = MAP(BEZIER(S1)([c17,c18]))(domain2);

  var cc9 = MAP(BEZIER(S1)([c23,c24]))(domain2);
  var cc10 = MAP(BEZIER(S1)([c24,c25]))(domain2);

  var cc11 = MAP(BEZIER(S1)([c29,c30]))(domain2);
  var cc12 = MAP(BEZIER(S1)([c29,c31]))(domain2);
  var cc13 = MAP(BEZIER(S1)([c30,c32]))(domain2);
  var cc14 = MAP(BEZIER(S1)([c31,c32]))(domain2);

  var cc15 = MAP(BEZIER(S1)([c33,c34]))(domain2);
  var cc16 = MAP(BEZIER(S1)([c34,c35]))(domain2);
  var cc17 = MAP(BEZIER(S1)([c35,c36]))(domain2);

  var cc0u = MAP(BEZIER(S1)([c0u,c1u]))(domain2);
  var cc1u = MAP(BEZIER(S1)([c2u,c3u]))(domain2);
  var cc2u = MAP(BEZIER(S1)([c4u,c5u]))(domain2);
  var cc3u = MAP(BEZIER(S1)([c6u,c7u]))(domain2);
  var cc4u = MAP(BEZIER(S1)([c8u,c9u]))(domain2);
  var cc5u = MAP(BEZIER(S1)([c16u,c17u]))(domain2);

  // Eaves Foot
  var cc6u = MAP(BEZIER(S1)([c19,c20]))(domain2);
  var cc7u = MAP(BEZIER(S1)([c21,c19]))(domain2);
  var cc8u = MAP(BEZIER(S1)([c22,c20]))(domain2);
  var eavesFoot = T([1])([.14])(STRUCT([cc6u,cc7u,cc8u]));
  var eavesFoots = STRUCT(REPLICA(4)([eavesFoot,T([1])([-.04275])]));

  var cc9u = MAP(BEZIER(S1)([c26,c27]))(domain2);

  // Eaves Pales
  var cc10u = MAP(BEZIER(S1)([c18u,c19u]))(domain2);
  var cc11u = MAP(BEZIER(S1)([c18u,c20u]))(domain2);
  var cc12u = MAP(BEZIER(S1)([c19u,c21u]))(domain2);
  var cc13u = MAP(BEZIER(S1)([c20u,c21u]))(domain2);
  var cc14u = MAP(BEZIER(S1)([c22u,c23u]))(domain2);

  var cc15u = MAP(BEZIER(S1)([c24u,c25u]))(domain2);

  var eavesPale = T([1])([.14])(STRUCT([cc10u,cc11u,cc12u,cc13u,cc14u]));
  var eavesPales = STRUCT(REPLICA(4)([eavesPale,T([1])([-.04275])]));

  var dd0 = MAP(BEZIER(S1)([c6,c6u]))(domain2);
  var dd1 = MAP(BEZIER(S1)([c8,c8u]))(domain2);
  var dd2 = MAP(BEZIER(S1)([c10,c10u]))(domain2);
  var dd3 = MAP(BEZIER(S1)([c12u,c13u]))(domain2);
  var dd4 = MAP(BEZIER(S1)([c14u,c15u]))(domain2);
  var dd5 = MAP(BEZIER(S1)([c15,c16]))(domain2);
  var dd6 = MAP(BEZIER(S1)([c26,c28]))(domain2);

  centralDomeElement = STRUCT([cc0,cc1,cc2,cc3,cc4,cc5,cc6,cc7,cc8,cc9,cc10,cc11,cc12,cc13,cc14,cc15,cc16,cc17,eavesFoots,eavesPales,cc0u,cc1u,cc2u,cc3u,cc4u,cc5u,cc9u,cc15u,dd0,dd1,dd2,dd3,dd4,dd5,dd6]);

  return STRUCT([centralDomeElement,S([1])([-1])(centralDomeElement)]);
}

function centralDome() {
  var border = centralDomeElement();
  var centralDomeComplete = STRUCT(REPLICA(8)([border,R([0,1])([PI/4])]));

  //DRAW(centralDomeComplete);

  return centralDomeComplete;
}

model.push(base());
model.push(baseBorder());
model.push(upperBorder());
model.push(topBorder());
model.push(roof());

var finalModel = R([0,1])([-PI/2 + PI/8])(STRUCT(model));

finalModel = STRUCT([finalModel,sideDomes(),centralDome()]);

DRAW(COLOR([1,1,1,1])(finalModel));