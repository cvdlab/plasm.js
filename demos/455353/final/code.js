//Occhio

var domain1 = INTERVALS(1)(150);
var domain2 = DOMAIN([[0,1],[0,1]])([50,50]);
var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([25,25,1]);

function knots (point) {

  var k = 2;  
  var m =point.length;
  var n = (m + k + 1);
  var first = 1;
  var last = n - 3;

  var knots = [];

  for (var i = 0; i < 3; i++) {
      knots[i] = 0;
      };

  for (var i = 3; i < last; i++,first++) {
      knots[i] = first;
      };

  for (var i = last; i < n; i++) {
      knots[i] = first;
      };
  return knots;
};

//Optic Nerve

var opticNerveIntBegin = [[0,4.5,0],[-0.25,4.5,-0.2],[0,4.5,-0.4]]
 var knots1 = knots(opticNerveIntBegin);
  var CopticNerveIntBegin = NUBS(S0)(2)(knots1)(opticNerveIntBegin);
   //var mapCopticNerveIntBegin = MAP(CopticNerveIntBegin)(domain1)

var opticNerveIntEnd = [[0,4,0.2],[-0.25,4,0],[0,4,-0.2]]
 var knots2 = knots(opticNerveIntEnd);
  var CopticNerveIntEnd = NUBS(S0)(2)(knots2)(opticNerveIntEnd);
   //var mapCopticNerveIntEnd = MAP(CopticNerveIntEnd)(domain1)

var opticNerveExtBegin = [[0,4.5,0.15],[-0.5,4.5,-0.2],[0,4.5,-0.55]]
 var knots3 = knots(opticNerveExtBegin);
  var CopticNerveExtBegin = NUBS(S0)(2)(knots3)(opticNerveExtBegin);
   //var mapCopticNerveExtBegin = MAP(CopticNerveExtBegin)(domain1)

var opticNerveExtEnd = [[0,4,0.35],[-0.5,4,0],[0,4,-0.35]]
 var knots4 = knots(opticNerveExtEnd);
  var CopticNerveExtEnd = NUBS(S0)(2)(knots4)(opticNerveExtEnd);
   //var mapCopticNerveExtEnd = MAP(CopticNerveExtEnd)(domain1)

var opticNerveIntConstriction = [[0,3.8,0.15],[-0.2,3.8,0],[0,3.8,-0.15]]
 var knots5 = knots(opticNerveIntConstriction);
  var CopticNerveIntConstriction = NUBS(S0)(2)(knots5)(opticNerveIntConstriction);
   //var mapCopticNerveIntConstriction = MAP(CopticNerveIntConstriction)(domain1)

var opticNerveExtConstriction = [[0,3.8,0.3],[-0.4,3.8,0],[0,3.8,-0.3]]
 var knots6 = knots(opticNerveExtConstriction);
  var CopticNerveExtConstriction = NUBS(S0)(2)(knots6)(opticNerveExtConstriction);
   //var mapCopticNerveExtConstriction = MAP(CopticNerveExtConstriction)(domain1)


//Surface Ext nervo ottico/sclera

var curveSurfaceopticNerveExt = [CopticNerveExtBegin,CopticNerveExtEnd,CopticNerveExtConstriction]
 var opticNerveExt = BEZIER(S1)(curveSurfaceopticNerveExt);
  var opticNerveExtMap = COLOR([1, 0.941176, 0.960784])(MAP(opticNerveExt)(domain2))
   DRAW(opticNerveExtMap)

//Surface Int opticNerve/sclera

var curveSurfaceopticNerveInt = [CopticNerveIntBegin,CopticNerveIntEnd,CopticNerveIntConstriction]
 var opticNerveInt = BEZIER(S1)(curveSurfaceopticNerveInt);
  //var opticNerveIntMap = COLOR([1,0.89,0.76])(MAP(opticNerveInt)(domain2))
   //DRAW(opticNerveIntMap)

var opticNerve3d = BEZIER(S2)([opticNerveExt,opticNerveInt]);
 var opticNerve3dMap = COLOR([1, 0.941176, 0.960784])(MAP(opticNerve3d)(domain3));
  DRAW(opticNerve3dMap)

//True Optic nerve

var TrueopticNerveIntBegin = [[0,4.5,-0.1],[-0.15,4.5,-0.2],[0,4.5,-0.3]]
 var knots1p = knots(TrueopticNerveIntBegin);
  var CTrueopticNerveIntBegin = NUBS(S0)(2)(knots1p)(TrueopticNerveIntBegin);

var TrueopticNerveIntEnd = [[0,4,0.1],[-0.15,4,0],[0,4,-0.1]]
 var knots2p = knots(TrueopticNerveIntEnd);
  var CTrueopticNerveIntEnd = NUBS(S0)(2)(knots2p)(TrueopticNerveIntEnd);

var TrueopticNerveIntConstriction = [[0,3.8,0.05],[-0.1,3.8,0],[0,3.8,-0.05]]
 var knots5p = knots(TrueopticNerveIntConstriction);
  var CTrueopticNerveIntConstriction = NUBS(S0)(2)(knots5p)(TrueopticNerveIntConstriction);

var curveSurfaceTrueopticNerveInt = [CTrueopticNerveIntBegin,CTrueopticNerveIntEnd,CTrueopticNerveIntConstriction]
 var TrueopticNerveInt = BEZIER(S1)(curveSurfaceTrueopticNerveInt);

var TrueopticNerve3d = BEZIER(S2)([opticNerveInt,TrueopticNerveInt]);
 var TrueopticNerve3dMap = COLOR([1, 0.84, 0])(MAP(TrueopticNerve3d)(domain3));
  DRAW(TrueopticNerve3dMap)


//Sclera

var scleraExtBegin = [[0,3.6,1.1],[-0.5,3.6,1.1],[-1.4,3.6,0],[-0.5,3.6,-1.1],[0,3.6,-1.1]]
 var knots7 = knots(scleraExtBegin);
  var CscleraExtBegin = NUBS(S0)(2)(knots7)(scleraExtBegin);
   //var mapCscleraExtBegin = MAP(CscleraExtBegin)(domain1)

var scleraIntBegin = [[0,3.6,0.95],[-0.4,3.6,0],[0,3.6,-0.95]]
 var knots8 = knots(scleraIntBegin);
  var CscleraIntBegin = NUBS(S0)(2)(knots8)(scleraIntBegin);
   //var mapCscleraIntBegin = MAP(CscleraIntBegin)(domain1)

var scleraExtMiddle1 = [[0,3.4,1.4],[-0.9,3.4,1.4],[-2,3.4,0],[-0.9,3.4,-1.4],[0,3.4,-1.4]]
 var knots9 = knots(scleraExtMiddle1);
  var CscleraExtMiddle1 = NUBS(S0)(2)(knots9)(scleraExtMiddle1);
   //var mapCscleraExtMiddle1 = MAP(CscleraExtMiddle1)(domain1)

var scleraIntMiddle1 = [[0,3.4,1.05],[-1.4,3.4,0],[0,3.4,-1.05]]
 var knots10 = knots(scleraIntMiddle1);
  var CscleraIntMiddle1 = NUBS(S0)(2)(knots10)(scleraIntMiddle1);
   //var mapCscleraIntMiddle1 = MAP(CscleraIntMiddle1)(domain1)

var scleraExtMiddle2 = [[0,3.2,1.5],[-0.9,3.2,1.5],[-2,3.2,0],[-0.9,3.2,-1.5],[0,3.2,-1.5]]
 var knots11 = knots(scleraExtMiddle2);
  var CscleraExtMiddle2 = NUBS(S0)(2)(knots11)(scleraExtMiddle2);
   //var mapCscleraExtMiddle2 = MAP(CscleraExtMiddle2)(domain1)

var scleraIntMiddle2 = [[0,3.2,1.35],[-1.65,3.2,0],[0,3.2,-1.35]]
 var knots12 = knots(scleraIntMiddle2);
  var CscleraIntMiddle2 = NUBS(S0)(2)(knots12)(scleraIntMiddle2);
   //var mapCscleraIntMiddle2 = MAP(CscleraIntMiddle2)(domain1)

var scleraExtMiddle3 = [[0,3,1.5],[-1,3,1.5],[-2,3,0],[-1,3,-1.5],[0,3,-1.5]]
 var knots13 = knots(scleraExtMiddle3);
  var CscleraExtMiddle3 = NUBS(S0)(2)(knots13)(scleraExtMiddle3);
   //var mapCscleraExtMiddle3 = MAP(CscleraExtMiddle3)(domain1)

var scleraIntMiddle3 = [[0,3,1.45],[-1.75,3,0],[0,3,-1.45]]
 var knots14 = knots(scleraIntMiddle3);
  var CscleraIntMiddle3 = NUBS(S0)(2)(knots14)(scleraIntMiddle3);
   //var mapCscleraIntMiddle3 = MAP(CscleraIntMiddle3)(domain1)

var scleraExtMiddle4 = [[0,2.8,1.6],[-1,2.8,1.6],[-2,2.8,0],[-1,2.8,-1.6],[0,2.8,-1.6]]
 var knots15 = knots(scleraExtMiddle4);
  var CscleraExtMiddle4 = NUBS(S0)(2)(knots15)(scleraExtMiddle4);
   //var mapCscleraExtMiddle4 = MAP(CscleraExtMiddle4)(domain1)

var scleraIntMiddle4 = [[0,2.8,1.45],[-1.85,2.8,0],[0,2.8,-1.45]]
 var knots16 = knots(scleraIntMiddle4);
  var CscleraIntMiddle4 = NUBS(S0)(2)(knots16)(scleraIntMiddle4);
   //var mapCscleraIntMiddle4 = MAP(CscleraIntMiddle4)(domain1)

var scleraExtMiddle5 = [[0,2.5,1.6],[-1.1,2.5,1.6],[-2,2.5,0],[-1.1,2.5,-1.6],[0,2.5,-1.6]]
 var knots17 = knots(scleraExtMiddle5);
  var CscleraExtMiddle5 = NUBS(S0)(2)(knots17)(scleraExtMiddle5);
   //var mapCscleraExtMiddle5 = MAP(CscleraExtMiddle5)(domain1)

var scleraIntMiddle5 = [[0,2.2,1.45],[-1.95,2.2,0],[0,2.2,-1.45]]
 var knots18 = knots(scleraIntMiddle5);
  var CscleraIntMiddle5 = NUBS(S0)(2)(knots18)(scleraIntMiddle5);
   //var mapCscleraIntMiddle5 = MAP(CscleraIntMiddle5)(domain1)

var scleraExtMiddle6 = [[0,2.1,1.5],[-1,2.1,1.5],[-2,2.1,0],[-1,2.1,-1.5],[0,2.1,-1.5]]
 var knots19 = knots(scleraExtMiddle6);
  var CscleraExtMiddle6 = NUBS(S0)(2)(knots19)(scleraExtMiddle6);
   //var mapCscleraExtMiddle6 = MAP(CscleraExtMiddle6)(domain1)

var scleraIntMiddle6 = [[0,2.1,1.45],[-2.15,2.1,0],[0,2.1,-1.45]]
 var knots20 = knots(scleraIntMiddle6);
  var CscleraIntMiddle6 = NUBS(S0)(2)(knots20)(scleraIntMiddle6);
   //var mapCscleraIntMiddle6 = MAP(CscleraIntMiddle6)(domain1)

var scleraExtMiddle7 = [[0,1.9,1.5],[-0.9,1.9,1.5],[-1.8,1.9,0],[-0.9,1.9,-1.5],[0,1.9,-1.5]]
 var knots21 = knots(scleraExtMiddle7);
  var CscleraExtMiddle7 = NUBS(S0)(2)(knots21)(scleraExtMiddle7);
   //var mapCscleraExtMiddle7 = MAP(CscleraExtMiddle7)(domain1)

var scleraIntMiddle7 = [[0,1.9,1.35],[-1.95,1.9,0],[0,1.9,-1.35]]
 var knots22 = knots(scleraIntMiddle7);
  var CscleraIntMiddle7 = NUBS(S0)(2)(knots22)(scleraIntMiddle7);
   //var mapCscleraIntMiddle7 = MAP(CscleraIntMiddle7)(domain1)


var scleraExtMiddle8 = [[0,1.7,1.4],[-0.8,1.7,1.4],[-1.7,1.7,0],[-0.8,1.7,-1.4],[0,1.7,-1.4]]
 var knots23 = knots(scleraExtMiddle8);
  var CscleraExtMiddle8 = NUBS(S0)(2)(knots23)(scleraExtMiddle8);
   //var mapCscleraExtMiddle8 = MAP(CscleraExtMiddle8)(domain1)


var scleraIntMiddle8 = [[0,1.7,1.25],[-1.75,1.7,0],[0,1.7,-1.25]]
 var knots24 = knots(scleraIntMiddle8);
  var CscleraIntMiddle8 = NUBS(S0)(2)(knots24)(scleraIntMiddle8);
   //var mapCscleraIntMiddle8 = MAP(CscleraIntMiddle8)(domain1)

var scleraExtMiddle9 = [[0,1.5,1.3],[-0.7,1.5,1.3],[-1.5,1.5,0],[-0.7,1.5,-1.3],[0,1.5,-1.3]]
 var knots25 = knots(scleraExtMiddle9);
  var CscleraExtMiddle9 = NUBS(S0)(2)(knots25)(scleraExtMiddle9);
   //var mapCscleraExtMiddle9 = MAP(CscleraExtMiddle9)(domain1)

var scleraIntMiddle9 = [[0,1.5,1.15],[-1.45,1.5,0],[0,1.5,-1.15]]
 var knots26 = knots(scleraIntMiddle9);
  var CscleraIntMiddle9 = NUBS(S0)(2)(knots26)(scleraIntMiddle9);
   //var mapCscleraIntMiddle9 = MAP(CscleraIntMiddle9)(domain1)

var scleraExtMiddle10 = [[0,1.3,1.1],[-0.5,1.3,1.1],[-1.3,1.3,0],[-0.5,1.3,-1.1],[0,1.3,-1.1]]
 var knots27 = knots(scleraExtMiddle10);
  var CscleraExtMiddle10 = NUBS(S0)(2)(knots27)(scleraExtMiddle10);
   //var mapCscleraExtMiddle10 = MAP(CscleraExtMiddle10)(domain1)

var scleraIntMiddle10 = [[0,1.3,0.85],[-1.05,1.3,0],[0,1.3,-0.85]]
 var knots28 = knots(scleraIntMiddle10);
  var CscleraIntMiddle10 = NUBS(S0)(2)(knots28)(scleraIntMiddle10);
   //var mapCscleraIntMiddle10 = MAP(CscleraIntMiddle10)(domain1)

var scleraExtMiddle11 = [[0,1.15,0.5],[-0.25,1.15,0.4],[-0.4,1.15,0],[-0.25,1.15,-0.4],[0,1.15,-0.5]]
 var knots29 = knots(scleraExtMiddle11);
  var CscleraExtMiddle11 = NUBS(S0)(2)(knots29)(scleraExtMiddle11);
   //var mapCscleraExtMiddle11 = MAP(CscleraExtMiddle11)(domain1)

var scleraIntMiddle11 = [[0,1.2,0.52],[-0.65,1.2,0],[0,1.2,-0.52]]
 var knots30 = knots(scleraIntMiddle11);
  var CscleraIntMiddle11 = NUBS(S0)(2)(knots30)(scleraIntMiddle11);
   //var mapCscleraIntMiddle11 = MAP(CscleraIntMiddle11)(domain1)


/*curve aggregation of Ext/Int sclera*/

var curveScleraExt = [CopticNerveExtConstriction,CscleraExtBegin,CscleraExtMiddle1,CscleraIntMiddle2,
              CscleraExtMiddle3,CscleraExtMiddle4,CscleraExtMiddle5,CscleraExtMiddle6,
              CscleraExtMiddle7,CscleraExtMiddle8,CscleraExtMiddle9,CscleraExtMiddle10,
              CscleraExtMiddle11]
var scleraExt = BEZIER(S1)(curveScleraExt);
var scleraExtMap = COLOR([1, 0.941176, 0.960784])(MAP(scleraExt)(domain2))
DRAW(scleraExtMap)

var curveScleraInt = [CopticNerveIntConstriction,CscleraIntBegin,CscleraIntMiddle1,CscleraIntMiddle2,
              CscleraIntMiddle3,CscleraIntMiddle4,CscleraIntMiddle5,CscleraIntMiddle6,
              CscleraIntMiddle7,CscleraIntMiddle8,CscleraIntMiddle9,CscleraIntMiddle10,
              CscleraIntMiddle11]
var scleraInt = BEZIER(S1)(curveScleraInt);

var sclera = BEZIER(S2)([scleraExt,scleraInt]);
var scleraMap = COLOR([ 1, 0.941176, 0.960784])(MAP(sclera)(domain3));
DRAW(scleraMap)


// IRIS

var profileIrisRadiusExtFrontRight = [[0,1.2,0.5],[-0.25,1.2,0.4],[-0.4,1.2,0],[-0.25,1.2,-0.4],[0,1.2,-0.5]]
 var knots31 = knots(profileIrisRadiusExtFrontRight);
  var CprofileIrisRadiusExtFrontRight = NUBS(S0)(2)(knots31)(profileIrisRadiusExtFrontRight);
   //var mapCprofileIrisRadiusExtFrontRight = COLOR([0,0,1])(MAP(CprofileIrisRadiusExtFrontRight)(domain1))

var profileIrisRadiusExtPosterioreRight = [[0,1.3,0.5],[-0.25,1.3,0.4],[-0.4,1.3,0],[-0.25,1.3,-0.4],[0,1.3,-0.5]]
 var knots32 = knots(profileIrisRadiusExtPosterioreRight);
  var CprofileIrisRadiusExtPosterioreRight = NUBS(S0)(2)(knots32)(profileIrisRadiusExtPosterioreRight);
   //var mapCprofileIrisRadiusExtPosterioreRight = COLOR([0,0,1])(MAP(CprofileIrisRadiusExtPosterioreRight)(domain1))

var profileIrisRadiusIntFrontRight = [[0,1.2,0.2],[-0.1,1.2,0.2],[-0.2,1.2,0],[-0.1,1.2,-0.2],[0,1.2,-0.2]]
 var knots33 = knots(profileIrisRadiusIntFrontRight);
  var CprofileIrisRadiusIntFrontRight = NUBS(S0)(2)(knots33)(profileIrisRadiusIntFrontRight);
   //var mapCprofileIrisRadiusIntFrontRight = COLOR([0,0,1])(MAP(CprofileIrisRadiusIntFrontRight)(domain1))

var profileIrisRadiusIntPosterioreRight = [[0,1.3,0.2],[-0.1,1.3,0.2],[-0.2,1.3,0],[-0.1,1.3,-0.2],[0,1.3,-0.2]]
 var knots34 = knots(profileIrisRadiusIntPosterioreRight);
  var CprofileIrisRadiusIntPosterioreRight = NUBS(S0)(2)(knots34)(profileIrisRadiusIntPosterioreRight);
   //var mapCprofileIrisRadiusIntPosterioreRight = COLOR([0,0,1])(MAP(CprofileIrisRadiusIntPosterioreRight)(domain1))

var curveIrisPosterioreRight = [CprofileIrisRadiusExtPosterioreRight,CprofileIrisRadiusIntPosterioreRight]
 var CcurveIrisPosterioreRight = BEZIER(S1)(curveIrisPosterioreRight);
  //var curveIrisPosterioreRightMap = COLOR([0.545098, 0.270588, 0.0745098])(MAP(CcurveIrisPosterioreRight)(domain2))
   //DRAW(curveIrisPosterioreRightMap)

var curveIrisFrontRight = [CprofileIrisRadiusExtFrontRight,CprofileIrisRadiusIntFrontRight]
 var CcurveIrisFrontRight = BEZIER(S1)(curveIrisFrontRight);
  //var curveIrisFrontRightMap = COLOR([0.545098, 0.270588, 0.0745098])(MAP(CcurveIrisFrontRight)(domain2))
   //DRAW(curveIrisFrontRightMap)

var IrisRight = BEZIER(S2)([CcurveIrisFrontRight,CcurveIrisPosterioreRight]);
 var IrisRightMap = COLOR([0.133333, 0.545098, 0.133333])(MAP(IrisRight)(domain3));
  DRAW(IrisRightMap)

// Left Iris side

var profileIrisRadiusExtFrontLeft = [[0,1.2,0.5],[0.25,1.2,0.4],[0.4,1.2,0],[0.25,1.2,-0.4],[0,1.2,-0.5]]
 var knots35 = knots(profileIrisRadiusExtFrontLeft);
  var CprofileIrisRadiusExtFrontLeft = NUBS(S0)(2)(knots35)(profileIrisRadiusExtFrontLeft);

var profileIrisRadiusExtPosterioreLeft = [[0,1.3,0.5],[0.25,1.3,0.4],[0.4,1.3,0],[0.25,1.3,-0.4],[0,1.3,-0.5]]
 var knots36 = knots(profileIrisRadiusExtPosterioreLeft);
  var CprofileIrisRadiusExtPosterioreLeft = NUBS(S0)(2)(knots36)(profileIrisRadiusExtPosterioreLeft);

var profileIrisRadiusIntFrontLeft = [[0,1.2,0.2],[0.1,1.2,0.2],[0.2,1.2,0],[0.1,1.2,-0.2],[0,1.2,-0.2]]
 var knots37 = knots(profileIrisRadiusIntFrontLeft);
  var CprofileIrisRadiusIntFrontLeft = NUBS(S0)(2)(knots37)(profileIrisRadiusIntFrontLeft);

var profileIrisRadiusIntPosterioreLeft = [[0,1.3,0.2],[0.1,1.3,0.2],[0.2,1.3,0],[0.1,1.3,-0.2],[0,1.3,-0.2]]
 var knots38 = knots(profileIrisRadiusIntPosterioreLeft);
  var CprofileIrisRadiusIntPosterioreLeft = NUBS(S0)(2)(knots38)(profileIrisRadiusIntPosterioreLeft);

var curveIrisPosterioreLeft = [CprofileIrisRadiusExtPosterioreLeft,CprofileIrisRadiusIntPosterioreLeft]
 var CcurveIrisPosterioreLeft = BEZIER(S1)(curveIrisPosterioreLeft);

var curveIrisFrontLeft = [CprofileIrisRadiusExtFrontLeft,CprofileIrisRadiusIntFrontLeft]
 var CcurveIrisFrontLeft = BEZIER(S1)(curveIrisFrontLeft);

var IrisLeft = BEZIER(S2)([CcurveIrisFrontLeft,CcurveIrisPosterioreLeft]);
 var IrisLeftMap = COLOR([0.133333, 0.545098, 0.133333])(MAP(IrisLeft)(domain3));
  DRAW(IrisLeftMap)

//Cornea


//Before Right SIDE.

var corneaExtRightBegin = [[0,1.16,0.5],[-0.15,1.15,0.5],[-0.45,1.17,0],[-0.15,1.15,-0.5],[0,1.16,-0.5]]
 var knots39 = knots(corneaExtRightBegin);
  var CcorneaExtRightBegin = NUBS(S0)(2)(knots39)(corneaExtRightBegin);
   //var mapCcorneaExtRightBegin = MAP(CcorneaExtRightBegin)(domain1)

var corneaIntRightBegin = [[0,1.15,0.4],[-0.15,1.15,0.4],[-0.4,1.15,0],[-0.15,1.15,-0.4],[0,1.15,-0.4]]
 var knots40 = knots(corneaIntRightBegin);
  var CcorneaIntRightBegin = NUBS(S0)(2)(knots40)(corneaIntRightBegin);
   //var mapCcorneaIntRightBegin = MAP(CcorneaIntRightBegin)(domain1)

var corneaExtRightMiddle = [[0,1.1,0.3],[-0.1,1.1,0.3],[-0.3,1.1,0],[-0.1,1.1,-0.3],[0,1.1,-0.3]]
 var knots41 = knots(corneaExtRightMiddle);
  var CcorneaExtRightMiddle = NUBS(S0)(2)(knots41)(corneaExtRightMiddle);
   //var mapCcorneaExtRightMiddle = MAP(CcorneaExtRightMiddle)(domain1)

var corneaIntRightMiddle = [[0,1.1,0.25],[-0.1,1.1,0.25],[-0.25,1.1,0],[-0.1,1.1,-0.25],[0,1.1,-0.25]]
 var knots42 = knots(corneaIntRightMiddle);
  var CcorneaIntRightMiddle = NUBS(S0)(2)(knots42)(corneaIntRightMiddle);
   //var mapCcorneaIntRightMiddle = MAP(CcorneaIntRightMiddle)(domain1)

var corneaExtRightEnd = [[0,1.05,0.25],[-0.1,1.05,0.25],[-0.25,1.05,0],[-0.1,1.05,-0.25],[0,1.05,-0.25]]
 var knots43 = knots(corneaExtRightEnd);
  var CcorneaExtRightEnd = NUBS(S0)(2)(knots43)(corneaExtRightEnd);
   //var mapCcorneaExtRightEnd = MAP(CcorneaExtRightEnd)(domain1)

var corneaIntRightEnd = [[0,1.05,0.2],[-0.1,1.05,0.2],[-0.2,1.05,0],[-0.1,1.05,-0.2],[0,1.05,-0.2]]
 var knots44 = knots(corneaIntRightEnd);
  var CcorneaIntRightEnd = NUBS(S0)(2)(knots44)(corneaIntRightEnd);
   //var mapCcorneaIntRightEnd = MAP(CcorneaIntRightEnd)(domain1)


var curveCorneaExtRight = [CcorneaExtRightBegin,CcorneaExtRightMiddle,CcorneaExtRightEnd,[0,1.1,0]]
 var CcurveCorneaExtRight = BEZIER(S1)(curveCorneaExtRight);
  var curveCorneaExtRightMap = COLOR([0.498039, 1, 0.831373,0.7])(MAP(CcurveCorneaExtRight)(domain2))
   DRAW(curveCorneaExtRightMap)

var curveCorneaIntRight = [CcorneaIntRightBegin,CcorneaIntRightMiddle,CcorneaIntRightEnd,[0,1,0]]
 var CcurveCorneaIntRight = BEZIER(S1)(curveCorneaIntRight);
  //var curveCorneaIntRightMap = COLOR([0.498039, 1, 0.831373,0.7])(MAP(CcurveCorneaIntRight)(domain2))

var  corneaRight = BEZIER(S2)([CcurveCorneaExtRight,CcurveCorneaIntRight]);
 var  corneaRightMap = COLOR([1, 0.941176, 0.960784,0.25])(MAP( corneaRight)(domain3));
  //DRAW( corneaRightMap)

var corneaLeft = R([0,2])([PI])(curveCorneaExtRightMap)
 DRAW(corneaLeft)

//Lens

var  LensBegin = [[0,1.35,0.25],[-0.1,1.35,0.25],[-0.25,1.35,0],[-0.1,1.35,-0.25],[0,1.35,-0.25],[0.1,1.35,-0.25],[0.25,1.35,0],
            [0.1,1.35,0.25],[0,1.35,0.25]]
 var knots45 = knots(LensBegin);
  var CLensBegin = NUBS(S0)(2)(knots45)(LensBegin);

var  LensMiddle = [[0,1.5,0.4],[-0.15,1.5,0.4],[-0.3,1.5,0],[-0.15,1.5,-0.4],[0,1.5,-0.4],[0.15,1.5,-0.4],[0.3,1.5,0],
            [0.15,1.5,0.4],[0,1.5,0.4]]
 var knots46 = knots(LensMiddle);
  var CLensMiddle = NUBS(S0)(2)(knots46)(LensMiddle);

var  LensEnd = [[0,1.6,0.25],[-0.1,1.6,0.25],[-0.25,1.6,0],[-0.1,1.6,-0.25],[0,1.6,-0.25],[0.1,1.6,-0.25],[0.25,1.6,0],
            [0.1,1.6,0.25],[0,1.6,0.25]]
 var knots47 = knots(LensEnd);
  var CLensEnd = NUBS(S0)(2)(knots47)(LensEnd);

var curveLens = [[0,1.3,0],CLensBegin,CLensMiddle,CLensEnd,[0,1.65,0]]
 var CcurveLens = BEZIER(S1)(curveLens)
  var curveLensMap = COLOR([1, 1, 0.941176, 0.9])(MAP(CcurveLens)(domain2))
   DRAW(curveLensMap)

var curveLens = [[0,1.3,0],CLensBegin,CLensMiddle,CLensEnd,[0,1.65,0]]
 var CcurveLens = BEZIER(S1)(curveLens)
  var curveLensMap = COLOR([1, 1, 0.941176, 0.7])(MAP(CcurveLens)(domain2))
   DRAW(curveLensMap)


//(Zinn)

var curveSuspensoryLegament = [CscleraExtMiddle11,CprofileIrisRadiusExtFrontRight]
 var CcurveSuspensoryLegament = BEZIER(S1)(curveSuspensoryLegament)
  var curveSuspensoryLegamentMap = COLOR([1, 1, 0.941176])(MAP(CcurveSuspensoryLegament)(domain2))
   DRAW(curveSuspensoryLegamentMap)

var  LensMiddleHalf = [[-0.2,1.5,0],[-0.15,1.5,0.4],[0,1.5,0.4],[0.15,1.5,0.4],[0.2,1.5,0]]
 var knots48 = knots(LensMiddleHalf);
  var CLensMiddleHalf = NUBS(S0)(2)(knots48)(LensMiddleHalf);

var  LensMiddleHalfDown = [[-0.2,1.5,0],[-0.15,1.5,-0.4],[0,1.5,-0.4],[0.15,1.5,-0.4],[0.2,1.5,0]]
 var CLensMiddleHalfDown = NUBS(S0)(2)(knots48)(LensMiddleHalfDown);

var curveSuspensoryLens1 = [CLensMiddleHalf,[0,1.5,0.5],[0,1.6,1]]
 var CcurveSuspensoryLens1 = BEZIER(S1)(curveSuspensoryLens1)
  var curveSuspensoryLens1Map = COLOR([1, 1, 0.941176,0.9])(MAP(CcurveSuspensoryLens1)(domain2))
   DRAW(curveSuspensoryLens1Map)

var curveSuspensoryLens2 = [CLensMiddleHalf,[0,1.5,-0.5],[0,1.6,-1]]
 var CcurveSuspensoryLens2 = BEZIER(S1)(curveSuspensoryLens2)
  var curveSuspensoryLens2Map = COLOR([1, 1, 0.941176,0.9])(MAP(CcurveSuspensoryLens2)(domain2))
   DRAW(curveSuspensoryLens2Map)


//choroid...until the begin of the iris

var choroidBegin = [[0,3.6,0.5],[-0.6,3.6,0],[0,3.6,-0.5]]
 var knots49 = knots(choroidBegin);
  var CchoroidBegin = NUBS(S0)(2)(knots49)(choroidBegin);

var choroidMiddle1 = [[0,3.4,1.1],[-1,3.4,0],[0,3.4,-1.1]]
 var CchoroidMiddle1 = NUBS(S0)(2)(knots49)(choroidMiddle1);

var choroidMiddle2 = [[0,3.2,1.2],[-1.2,3.2,0],[0,3.2,-1.2]]
 var CchoroidMiddle2 = NUBS(S0)(2)(knots49)(choroidMiddle2);

var choroidMiddle3 = [[0,3,1.3],[-1.3,3,0],[0,3,-1.3]]
 var CchoroidMiddle3 = NUBS(S0)(2)(knots49)(choroidMiddle3);

var choroidMiddle4 = [[0,2.8,1.4],[-1.3,2.8,0],[0,2.8,-1.4]]
 var CchoroidMiddle4 = NUBS(S0)(2)(knots49)(choroidMiddle4);

var choroidMiddle5 = [[0,2.2,1.4],[-1.3,2.2,0],[0,2.2,-1.4]]
 var CchoroidMiddle5 = NUBS(S0)(2)(knots49)(choroidMiddle5);

var choroidMiddle6 = [[0,2,1.3],[-1.3,2,0],[0,2,-1.3]]
 var CchoroidMiddle6 = NUBS(S0)(2)(knots49)(choroidMiddle6);

var choroidMiddle7 = [[0,1.8,1.1],[-1.2,1.8,0],[0,1.8,-1.1]]
 var CchoroidMiddle7 = NUBS(S0)(2)(knots49)(choroidMiddle7);

var choroidMiddle8 = [[0,1.5,1],[-1,1.5,0],[0,1.5,-1]]
 var CchoroidMiddle8 = NUBS(S0)(2)(knots24)(choroidMiddle8);

var curvechoroid = [CopticNerveExtConstriction,CchoroidBegin,CchoroidMiddle1,CchoroidMiddle2,
              CchoroidMiddle3,CchoroidMiddle4,CchoroidMiddle5,CchoroidMiddle6,
              CchoroidMiddle7,CchoroidMiddle8]
 var choroid = BEZIER(S1)(curvechoroid);

var choroidStratus = BEZIER(S2)([choroid,scleraInt]);
 var choroidStratusMap = COLOR([ 0.576471, 0.439216, 0.858824])(MAP(choroidStratus)(domain3));
  DRAW(choroidStratusMap)

//Parte optic della retina

var opticRetinaBegin = [[0,3.6,0.4],[-0.5,3.6,0],[0,3.6,-0.4]]
 var knots49 = knots(opticRetinaBegin);
  var CopticRetinaBegin = NUBS(S0)(2)(knots49)(opticRetinaBegin);

var opticRetinaMiddle1 = [[0,3.4,1],[-0.9,3.4,0],[0,3.4,-1]]
 var CopticRetinaMiddle1 = NUBS(S0)(2)(knots49)(opticRetinaMiddle1);

var opticRetinaMiddle2 = [[0,3.2,1.1],[-1.1,3.2,0],[0,3.2,-1.1]]
 var CopticRetinaMiddle2 = NUBS(S0)(2)(knots49)(opticRetinaMiddle2);

var opticRetinaMiddle3 = [[0,3,1.2],[-1.2,3,0],[0,3,-1.2]]
 var CopticRetinaMiddle3 = NUBS(S0)(2)(knots49)(opticRetinaMiddle3);

var opticRetinaMiddle4 = [[0,2.8,1.3],[-1.2,2.8,0],[0,2.8,-1.3]]
 var CopticRetinaMiddle4 = NUBS(S0)(2)(knots49)(opticRetinaMiddle4);

var opticRetinaMiddle5 = [[0,2.2,1.3],[-1.2,2.2,0],[0,2.2,-1.3]]
 var CopticRetinaMiddle5 = NUBS(S0)(2)(knots49)(opticRetinaMiddle5);

var opticRetinaMiddle6 = [[0,2,1.2],[-1.2,2,0],[0,2,-1.2]]
 var CopticRetinaMiddle6 = NUBS(S0)(2)(knots49)(opticRetinaMiddle6);

var opticRetinaMiddle7 = [[0,1.8,1],[-1.1,1.8,0],[0,1.8,-1]]
 var CopticRetinaMiddle7 = NUBS(S0)(2)(knots49)(opticRetinaMiddle7);

var opticRetinaMiddle8 = [[0,1.5,0.9],[-0.9,1.5,0],[0,1.5,-0.9]]
 var CopticRetinaMiddle8 = NUBS(S0)(2)(knots24)(opticRetinaMiddle8);

var curveopticRetina = [CopticNerveIntConstriction,CopticRetinaBegin,CopticRetinaMiddle1,CopticRetinaMiddle2,
              CopticRetinaMiddle3,CopticRetinaMiddle4,CopticRetinaMiddle5,CopticRetinaMiddle6,
              CopticRetinaMiddle7,CopticRetinaMiddle8]
 var opticRetina = BEZIER(S1)(curveopticRetina);

var opticRetinaStratus = BEZIER(S2)([opticRetina,choroid]);
 var opticRetinaStratusMap = COLOR([1, 0.84, 0])(MAP(opticRetinaStratus)(domain3));
  DRAW(opticRetinaStratusMap)

//Retina

var RetinaBegin = [[0,3.6,0.3],[-0.4,3.6,0],[0,3.6,-0.3]]
 var knots49 = knots(RetinaBegin);
  var CRetinaBegin = NUBS(S0)(2)(knots49)(RetinaBegin);

var RetinaMiddle1 = [[0,3.4,0.9],[-0.8,3.4,0],[0,3.4,-0.9]]
 var CRetinaMiddle1 = NUBS(S0)(2)(knots49)(RetinaMiddle1);

var RetinaMiddle2 = [[0,3.2,1],[-1,3.2,0],[0,3.2,-1]]
 var CRetinaMiddle2 = NUBS(S0)(2)(knots49)(RetinaMiddle2);

var RetinaMiddle3 = [[0,3,1.1],[-1.1,3,0],[0,3,-1.1]]
 var CRetinaMiddle3 = NUBS(S0)(2)(knots49)(RetinaMiddle3);

var RetinaMiddle4 = [[0,2.8,1.2],[-1.1,2.8,0],[0,2.8,-1.2]]
 var CRetinaMiddle4 = NUBS(S0)(2)(knots49)(RetinaMiddle4);

var RetinaMiddle5 = [[0,2.2,1.2],[-1.1,2.2,0],[0,2.2,-1.2]]
 var CRetinaMiddle5 = NUBS(S0)(2)(knots49)(RetinaMiddle5);

var RetinaMiddle6 = [[0,2,1.1],[-1.1,2,0],[0,2,-1.1]]
 var CRetinaMiddle6 = NUBS(S0)(2)(knots49)(RetinaMiddle6);

var RetinaMiddle7 = [[0,1.8,0.9],[-1,1.8,0],[0,1.8,-0.9]]
 var CRetinaMiddle7 = NUBS(S0)(2)(knots49)(RetinaMiddle7);

var RetinaMiddle8 = [[0,1.5,0.8],[-0.8,1.5,0],[0,1.5,-0.8]]
 var CRetinaMiddle8 = NUBS(S0)(2)(knots49)(RetinaMiddle8);

var curveRetina = [CopticNerveIntConstriction,CRetinaBegin,CRetinaMiddle1,CRetinaMiddle2,
              CRetinaMiddle3,CRetinaMiddle4,CRetinaMiddle5,CRetinaMiddle6,
              CRetinaMiddle7,CRetinaMiddle8]
 var Retina = BEZIER(S1)(curveRetina);

var RetinaStratus = BEZIER(S2)([Retina,choroid]);
 var RetinaStratusMap = COLOR([0.803922, 0.521569, 0.247059])(MAP(RetinaStratus)(domain3));
  DRAW(RetinaStratusMap)

//Giunzione2

var giunzione2 = [CRetinaMiddle8,CprofileIrisRadiusExtPosterioreRight]
 var Cgiunzione2 = BEZIER(S1)(giunzione2);
  var giunzione2Map = COLOR([0.803922, 0.521569, 0.247059])(MAP(Cgiunzione2)(domain2));
   DRAW(giunzione2Map)

//Hyaloid canal...build by the 2 vitrous Humor

var  canalBeginTop = [[0,1.7,0.1],[0,1,0.9],[0,1.7,1.4],[-0.3,1.7,0],[0,1.7,0.1]]
 var knots511 = knots(canalBeginTop);
  var CcanalBeginTop = NUBS(S0)(2)(knots511)(canalBeginTop);
   //var CcanalBeginTopMap = MAP(CcanalBeginTop)(domain1)

var  canalMiddleTop = [[0,2.6,0.2],[0,2.6,1.6],[-0.6,2.6,0],[0,2.6,0.2]]
 var knots51 = knots(canalMiddleTop);
  var CcanalMiddleTop = NUBS(S0)(2)(knots51)(canalMiddleTop);
   //var CcanalMiddleTopMap = MAP(CcanalMiddleTop)(domain1)

var  canalEndTop = [[0,3.2,0.1],[0,3.2,1.9],[-0.5,3.2,0],[0,3.2,0.1]]
 var CcanalEndTop = NUBS(S0)(2)(knots51)(canalEndTop);
  //var CcanalEndTopMap = MAP(CcanalEndTop)(domain1)

var VitreousHumorTop = [[-0.05,1.65,0.05],CcanalBeginTop,CcanalMiddleTop,CcanalEndTop,[-0.05,3.7,0.05]]
 var CVitreousHumorTop = BEZIER(S1)(VitreousHumorTop);
  var VitreousHumorTopMap = COLOR([ 0.686275, 0.933333, 0.933333,0.7])(MAP(CVitreousHumorTop)(domain2));
   DRAW(VitreousHumorTopMap)


var  canalBeginLower = [[0,1.7,-0.1],[0,1,-0.9],[0,1.7,-1.4],[-0.3,1.7,0],[0,1.7,-0.1]]
 var CcanalBeginLower = NUBS(S0)(2)(knots511)(canalBeginLower);
  //var CcanalBeginLowerMap = MAP(CcanalBeginLower)(domain1)

var  canalMiddleLower = [[0,2.6,0.1],[0,2.6,-1.6],[-0.6,2.6,0],[0,2.6,0.1]]
 var CcanalMiddleLower = NUBS(S0)(2)(knots51)(canalMiddleLower);
  //var CcanalMiddleLowerMap = MAP(CcanalMiddleLower)(domain1)

var  canalEndLower = [[0,3.2,-0.1],[0,3.2,-1.9],[-0.5,3.2,0],[0,3.2,-0.1]]
 var CcanalEndLower = NUBS(S0)(2)(knots51)(canalEndLower);
  //var CcanalEndLowerMap = MAP(CcanalEndLower)(domain1)

var VitreousHumorLower = [[-0.05,1.65,-0.05],CcanalBeginLower,CcanalMiddleLower,CcanalEndLower,[-0.05,3.7,-0.05]]
 var CVitreousHumorLower = BEZIER(S1)(VitreousHumorLower);
  var VitreousHumorLowerMap = COLOR([ 0.686275, 0.933333, 0.933333,0.7])(MAP(CVitreousHumorLower)(domain2));
   DRAW(VitreousHumorLowerMap)

//retina blood vessels
 //Riprendiamo le curve iniziali

var vesselsIntBegin = [[0,4.5,-0.1],[0.15,4.5,-0.2],[0,4.5,-0.3]]
 var knots1p = knots(vesselsIntBegin);
  var CvesselsIntBegin = NUBS(S0)(2)(knots1p)(vesselsIntBegin);

var vesselsIntEnd = [[0,4,0.1],[0.15,4,0],[0,4,-0.1]]
 var CvesselsIntEnd = NUBS(S0)(2)(knots1p)(vesselsIntEnd);

var vesselsIntConstriction = [[0,3.8,0.05],[0.1,3.8,0],[0,3.8,-0.05]]
 var CvesselsIntConstriction = NUBS(S0)(2)(knots1p)(vesselsIntConstriction);

var curveSurfacevesselsInt = [CvesselsIntBegin,CvesselsIntEnd,CvesselsIntConstriction]
 var vesselsInt = BEZIER(S1)(curveSurfacevesselsInt);

var vessels3d = BEZIER(S2)([vesselsInt,TrueopticNerveInt]);
 var vessels3dMap = COLOR([1, 0, 0])(MAP(vessels3d)(domain3));
  DRAW(vessels3dMap)

//Vessels
var vessel1 = [[0,3.8,0],[-0.15,3.7,0.05],[-0.15,3.6,0.1],[-0.1,3.5,0.11]]
 var knots1p = knots(vessel1);
  var Cvessel1 = NUBS(S0)(2)(knots1p)(vessel1);
   var Cvessel1Map = COLOR([1,0,0])(MAP(Cvessel1)(domain1))

var vessel2 = [[-0.15,3.7,0.05],[-0.1,3.6,0.15],[-0.05,3.4,0.2]]
 var knots1p = knots(vessel2);
  var Cvessel2 = NUBS(S0)(2)(knots1p)(vessel2);
   var Cvessel2Map = COLOR([0,0,1])(MAP(Cvessel2)(domain1))

var vessel3 = [[-0.1,3.6,0.15],[-0.1,3.4,0.2],[-0.1,3.3,0.5]]
 var knots1p = knots(vessel3);
  var Cvessel3 = NUBS(S0)(2)(knots1p)(vessel3);
   var Cvessel3Map = COLOR([1,0,0])(MAP(Cvessel3)(domain1))

var vessel4 = [[0,3.8,0],[-0.15,3.7,-0.05],[-0.15,3.6,-0.1],[-0.1,3.5,-0.11]]
 var knots1p = knots(vessel4);
  var Cvessel4 = NUBS(S0)(2)(knots1p)(vessel4);
   var Cvessel4Map = COLOR([0,0,1])(MAP(Cvessel4)(domain1))

var vessel5 = [[-0.15,3.7,-0.05],[-0.1,3.6,-0.15],[-0.05,3.4,-0.2]]
 var knots1p = knots(vessel5);
  var Cvessel5 = NUBS(S0)(2)(knots1p)(vessel5);
   var Cvessel5Map = COLOR([1,0,0])(MAP(Cvessel5)(domain1))

var vesselss = STRUCT([Cvessel1Map,Cvessel2Map,Cvessel3Map,Cvessel4Map,Cvessel5Map])
 DRAW(vesselss)

//Animation

var opticNerveExtMapRibaltato = COLOR([1, 0.941176, 0.960784])(SCALE([0])([-1])(opticNerveExtMap))
var scleraLeftAppoggio = COLOR([1, 0.941176, 0.960784])(SCALE([0])([-1])(scleraExtMap))
var choroidLeft = COLOR([0.576471, 0.439216, 0.858824])(SCALE([0])([-1])(choroidStratusMap))
var opticRetinaLeft = COLOR([1, 0.84, 0])(SCALE([0])([-1])(opticRetinaStratusMap))

var scleraLeft =STRUCT([scleraLeftAppoggio,opticNerveExtMapRibaltato])


var scleraLeft1 = COLOR([1, 0.941176, 0.960784,0.8])(scleraLeft)
 var scleraLeft2 = COLOR([1, 0.941176, 0.960784,0.7])(scleraLeft)
  var scleraLeft3 = COLOR([1, 0.941176, 0.960784,0.6])(scleraLeft)
   var scleraLeft4 = COLOR([1, 0.941176, 0.960784,0.5])(scleraLeft)

var choroidLeft1 = COLOR([0.576471, 0.439216, 0.858824,0.8])(choroidLeft)
 var choroidLeft2 = COLOR([0.576471, 0.439216, 0.858824,0.7])(choroidLeft)
  var choroidLeft3 = COLOR([0.576471, 0.439216, 0.858824,0.6])(choroidLeft)
   var choroidLeft4 = COLOR([0.576471, 0.439216, 0.858824,0.5])(choroidLeft)

var opticRetinaLeft1 = COLOR([1, 0.84, 0,0.8])(opticRetinaLeft)
 var opticRetinaLeft2 = COLOR([1, 0.84, 0,0.7])(opticRetinaLeft)
  var opticRetinaLeft3 = COLOR([1, 0.84, 0,0.6])(opticRetinaLeft)
   var opticRetinaLeft4 = COLOR([1, 0.84, 0,0.5])(opticRetinaLeft)
 
DRAW(scleraLeft)
 DRAW(scleraLeft1)
 DRAW(scleraLeft2)
 DRAW(scleraLeft3)
 DRAW(scleraLeft4)
  DRAW(choroidLeft)
  DRAW(choroidLeft1)
  DRAW(choroidLeft2)
  DRAW(choroidLeft3)
  DRAW(choroidLeft4)
   DRAW(opticRetinaLeft)
   DRAW(opticRetinaLeft1)
   DRAW(opticRetinaLeft2)
   DRAW(opticRetinaLeft3)
   DRAW(opticRetinaLeft4)


//function for the animation
function time()
{
  setTimeout("HIDE(scleraLeft)",7010);
  setTimeout("HIDE(scleraLeft1)",7310);
  setTimeout("HIDE(scleraLeft2)",7610);
  setTimeout("HIDE(scleraLeft3)",7910);
  setTimeout("HIDE(scleraLeft4)",8210);
  setTimeout("HIDE(choroidLeft)",9510);
  setTimeout("HIDE(choroidLeft1)",9810);
  setTimeout("HIDE(choroidLeft2)",10110);
  setTimeout("HIDE(choroidLeft3)",10410);
  setTimeout("HIDE(choroidLeft4)",10710);
  setTimeout("HIDE(opticRetinaLeft)",11710);
  setTimeout("HIDE(opticRetinaLeft1)",12010);
  setTimeout("HIDE(opticRetinaLeft2)",12310);
  setTimeout("HIDE(opticRetinaLeft3)",12610);
  setTimeout("HIDE(opticRetinaLeft4)",12910);
}
time();