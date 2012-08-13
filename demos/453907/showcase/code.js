var domain = INTERVALS(1)(30)
var domain2 = DOMAIN([[0,1],[0,1]])([30,20]);
var domain2resolution = DOMAIN([[0,1],[0,1]])([50,50]);

function generateKnot(controlPoints){
  lun = controlPoints.length + 2 + 1;
  //var nodeSeq =  new Array(lun);
  var nodeSeq = []
  nodeSeq[0] = 0;
  nodeSeq[1] = 0;
  nodeSeq[2] = 0;
  for (i = 3; i <= lun - 4 ; i++) {
    nodeSeq[i] = i-2;
  };
  nodeSeq[lun-1] = i-2
  nodeSeq[lun-2] = i-2
  nodeSeq[lun-3] = i-2
  return nodeSeq
}

function genNUBS (controlPoints){
//var domain = INTERVALS(1)(50)
  var domain = INTERVALS(1)(30)
  var knots = generateKnot(controlPoints)
  var nubs = NUBS(S0)(2)(knots)(controlPoints)
  var curve = MAP(nubs)(domain)
  return [curve,nubs]
}

function genNUBS2d (arrayNUBS){
  //var domain2 = DOMAIN([[0,1],[0,1]])([200,50]);
  var domain2 = DOMAIN([[0,1],[0,1]])([30,20]);
  var s12 = BEZIER(S1)(arrayNUBS)
  var surf = MAP(s12)(domain2)
  return surf
}

function translatePoints (arrayOfPoints,dx,dy,dz) {
  var result = [];
  var dx = dx || 0;
  var dy = dy || 0;
  var dz = dz || 0;
  for (i=0; i < arrayOfPoints.length; i++) {
    p = arrayOfPoints[i].concat([1])
    AffineTransformation = [[1,0,0,dx],[0,1,0,dy],[0,0,1,dz],[0,0,0,1]]
    var mul = numeric.dot(AffineTransformation,p)
    mul.pop()
    result=result.concat([mul])
  }
  return result
}

function scalePoints (arrayOfPoints,sx,sy,sz) {
  var result = [];
  var sx = sx || 1;
  var sy = sy || 1;
  var sz = sz || 1;
  for (i=0; i < arrayOfPoints.length; i++) {
    p = arrayOfPoints[i].concat([1])
    AffineTransformation = [[sx,0,0,0],[0,sy,0,0],[0,0,sz,0],[0,0,0,1]]
    var mul = numeric.dot(AffineTransformation,p)
    mul.pop()
    result=result.concat([mul])
  }
  return result
}

//########SLICE1
var pointsCurve = [[0,0,0],[-27,0,0],[-27,0,0],[-27,4,0],[-27,4,0],
                   [0,4,0],[0,4,0],[3,3,0],[4,0,0],[4,0,0],[4,-51.5+4,0],[4,-51.5+4,0],[0,-51.5+4,0],[0,-51.5+4,0],[0,0,0]]

var bordoNero1 = genNUBS(pointsCurve);
var bordoNero2 = genNUBS(translatePoints(pointsCurve,0,0,-2));
var bordoNeroSolido1 = genNUBS2d([bordoNero1[1],bordoNero2[1]])
var bordoNeroSolido2 = genNUBS2d([bordoNero1[1],[0,0,0]])
var bordoNeroSolido3 = genNUBS2d([bordoNero2[1],[0,0,-2]])
var bordoNeroUnQuarto = STRUCT([COLOR([0,0,0]),bordoNeroSolido1,bordoNeroSolido2,bordoNeroSolido3])
var bordoNeroUnQuartoTrasl = T([0,1])([27,51.5-4])(bordoNeroUnQuarto)
var bordoNero = STRUCT([STRUCT([bordoNeroUnQuartoTrasl,S([1])([-1])(bordoNeroUnQuartoTrasl)]),
                S([0])([-1])(STRUCT([bordoNeroUnQuartoTrasl,S([1])([-1])(bordoNeroUnQuartoTrasl)]))])
var schermo = COLOR([10,10,10])(T([0,1,2])([-27,7.5,-2])(CUBOID([54,40,2])))
var supporto = COLOR([0,0,0])(T([0,1,2])([-27,-51.5,-2])(CUBOID([54,40+11.5+7.5,2])))
var slice1 = STRUCT([bordoNero,schermo,supporto])

//########SLICE2
var pointsCurve1 = translatePoints(pointsCurve,0,0,-2)
var pointsCurve1bis = translatePoints(pointsCurve,0,0,-10)
var pointsCurve2 = translatePoints(scalePoints(pointsCurve,27/31,(51.5-4)/51.5,1),-4,-4,-10)
var bordoGrigio1 = genNUBS(pointsCurve1);
var bordoGrigio1bis = genNUBS(pointsCurve1bis);
var bordoGrigio2 = genNUBS(pointsCurve2);

var bordoGrigioSolido1 = COLOR([0.8,0.8,0.8])(genNUBS2d([bordoGrigio1[1],bordoGrigio1bis[1],bordoGrigio2[1]]))
var bordoGrigioSolido2 = COLOR([0.8,0.8,0.8])(genNUBS2d([bordoGrigio2[1],[-4,-4,-10]]))
var supporto2 = COLOR([0.8,0.8,0.8])(T([0,1,2])([-27,-47.5,-10])(CUBOID([27-4,47.5-4,.5])))
var slice2UnQuarto = T([0,1])([27,47.5])(STRUCT([bordoGrigioSolido1,bordoGrigioSolido2,supporto2]))


var slice2 = STRUCT([STRUCT([slice2UnQuarto,S([1])([-1])(slice2UnQuarto)]),
                S([0])([-1])(STRUCT([slice2UnQuarto,S([1])([-1])(slice2UnQuarto)]))])

//########ROTELLA
  function circonferenzaxy1(r,dx,dy,dz){
  var r = r || 0.2;
  var m = 12;
  var n = 12;
  var dx = dx || 0;
  var dy = dy || 0;
  var dz = dz || 0;
  var domain = DOMAIN([[0,PI],[0,2*PI]])([m,n]);
    var mapping = function (v) {
      var u = v[0];
      return [ r * COS(u*2*PI)+dx , r * SIN(u*2*PI)+dy , dz];
    };
    return mapping;
  }


var circle0 = circonferenzaxy1(38/2,0,-24.5,-.2)
var circle1 = circonferenzaxy1(40/2,0,-24.5,0)

var circle2 = circonferenzaxy1(38/2,0,-24.5,.2)
var circle3 = circonferenzaxy1(14/2,0,-24.5,.2)
var circle4 = circonferenzaxy1(13/2,0,-24.5,0)
var circle5 = circonferenzaxy1(14/2,0,-24.5,-.2)

var seqCirc = [circle0,circle1,circle2,circle2,circle3,circle3,circle4,circle5]

var funRotella = NUBS(S1)(2)(generateKnot(seqCirc))(seqCirc);
var rotella = MAP(funRotella)(domain2resolution);


//##############JACK
function circonferenzaxz1(r,dx,dy,dz){
  var r = r || 0.2;
  var m = 12;
  var n = 12;
  var dx = dx || 0;
  var dy = dy || 0;
  var dz = dz || 0;
  
  var domain = DOMAIN([[0,PI],[0,2*PI]])([m,n]);
    var mapping = function (v) {
      var u = v[0];
      return [r * COS(u*2*PI)+dx , dy, r * SIN(u*2*PI)+dz];
    };
    return mapping;
  }

var circJ0 = circonferenzaxz1(2.5/2,23,47.5,-5)
//var circJ0bis = circonferenzaxz1(2.5/2+0.05,23,47.5,-5)
var circJ1 = circonferenzaxz1(2.5/2,23,51.5,-5)

var circJ2 = circonferenzaxz1(1.35,23,47.5,-5)
var circJ3 = circonferenzaxz1(1.35,23,51.5,-5)

var seqCircJ1 = [[23,51.5,-5],circJ1,circJ1,circJ0]
//var seqCircJ2 = [circJ3,circJ1,circJ1,circJ0bis]
var seqCircJ2 = [circJ1,circJ3,circJ3,circJ2]

var funJack1 = NUBS(S1)(2)(generateKnot(seqCircJ1))(seqCircJ1)
var funJack2 = NUBS(S1)(2)(generateKnot(seqCircJ2))(seqCircJ2)

var jackBlk = COLOR([0,0,0])(MAP(funJack1)(domain2))
var jackWht = COLOR([10,10,10])(MAP(funJack2)(domain2))
var jack = STRUCT([jackBlk,jackWht])

//##############ORPELLI############
var trianglePoints = [[0,0,0],[0,2,0],[0,2,0],[2,1,0],[2,1,0],[0,0,0]]
var trianglePoints1 = translatePoints(trianglePoints,0,0,0,-3)

var triangleCurve = genNUBS(trianglePoints);
var triangleCurve1 = genNUBS(trianglePoints1);

var triangolo = COLOR([10,10,10])(genNUBS2d([triangleCurve1[1],triangleCurve[1],triangleCurve[1],[1,1,0]]))
 
var play = T([0,1,2])([-2.4,(-24.5-19+2.5),0.35])(triangolo)

var barretta = CUBOID([0.45,2,2])
var pause = STRUCT([COLOR([10,10,10]),T([0,1,2])([0.4,(-24.5-19+2.5),-1.7])(barretta),
                    T([0,1,2])([(0.3+0.45+0.65),(-24.5-19+2.5),-1.7])(barretta)])

var playPause = STRUCT([play,pause])
DRAW(playPause)

var next = STRUCT([COLOR([10,10,10]),T([0,1,2])([13.5,(-2-24.5),-1.7]),T([2])([2])(triangolo),
                  T([0,2])([2,2])(triangolo),T([0,2])([4,0])(barretta)])
var prev = S([0])([-1])(next)
DRAW(next)
DRAW(COLOR([10,10,10])(prev))

//##############LETTEREMENU############
//M
var pointsHalfM=[[0,0,0],[0.7,1.9,0],[0.7,1.9,0],
                //[0.7,2.05,0],[0.7,2.05,0],
                [0.7,0,0],[0.7,0,0],
                [1.15,0,0],[1.15,0,0],[1.15,2.5,0],[1.15,2.5,0],
                [0.7,2.5,0],[0.7,2.5,0],[-.45,0,0],[-.45,0,0],[0,0,0]]


var halfMcurve = genNUBS(pointsHalfM);
var halfMcurve1 = genNUBS(translatePoints(pointsHalfM,0,0,-3))

var halfMbordo = genNUBS2d([halfMcurve1[1],halfMcurve[1],halfMcurve[1],[1.1,2.5,0]])
var halfMsup = genNUBS2d([halfMcurve[1],[1.1,2.5,0]])
var halfM = STRUCT([T([0])([0.45/2]),halfMbordo,halfMsup])

var otherHalfM = S([0])([-1])(halfM)

var m = STRUCT([COLOR([10,10,10]),halfM,otherHalfM])
var m = T([0,1,2])([(-0.45/2-1.35-0.5-1.9),-11,0.3])(m)

//E
var e1 = CUBOID([0.45,2.5,3])
var e2 = T([1])([0])(CUBOID([1.4,0.45,3]))
var e3 = T([1])([1])(CUBOID([1.4,0.45,3]))
var e4 = T([1])([2.05])(CUBOID([1.4,0.45,3]))
var e = T([0,1,2])([-1.9,-11,-2.7])(STRUCT([COLOR([10,10,10]),e1,e2,e3,e4]))

//N
var n1 = T([2])([-2.7])(CUBOID([0.45,2.5,3]))
var n2 = S([0])([-1])(STRUCT([T([2])([0.3]),halfMbordo,halfMsup]))
var n = STRUCT([T([0,1])([1.45,-11]),COLOR([10,10,10]),n1,n2])

//U
/*
var pointsHalfU = [[.45,1,0],[0,1,0],[0,1,0],[0,0,0],[1.9,0,0],[1.9,1,0],[1.9,1,0],
                [(1.9-0.45),1,0],[(1.9-0.45),1,0],
                [(1.9-0.45),.45,0],[.45,.45,0],[.45,1,0]]
*/
var pointsHalfU=[[0,0.45,0],[0,0,0],[0,0,0],[0.95,0,0],[0.95,1,0],[0.95,1,0],
                 [0.45,1,0],[0.45,1,0],
                 [0.45,0.45,0],[0,0.45,0]]


var halfUcurve = genNUBS(pointsHalfU);
var halfUcurve1 = genNUBS(translatePoints(pointsHalfU,0,0,-3))
var halfUbordo = genNUBS2d([halfUcurve1[1],halfUcurve[1],halfUcurve[1]])
var halfUsup = genNUBS2d([halfUcurve[1],[0,0,0]])
var halfU = STRUCT([halfUbordo,halfUsup])
var otherHalfU = T([0])([1.9/2])(S([0])([-1])(halfU))
var halfU = T([0])([1.9/2])(halfU)

var bottomU = STRUCT([T([2])([0.3]),halfU,otherHalfU])
var cubU1 = T([0,1,2])([0,1,-2.7])(CUBOID([0.45,1.5,3]))
var cubU2 = T([0,1,2])([(1.9-0.45),1,-2.7])(CUBOID([0.45,1.5,3]))

var u = STRUCT([T([0,1])([2.4+0.2,-11]),COLOR([10,10,10]),bottomU,cubU1,cubU2])


//##############logoMela############
var pointsMela1 = [[0,4.8,0.3],[1*2,5.4,0.3],[2*2,2.8*2,0.3],[3*2,5,0.3],
                   [3.7*2,1.9*2,0.3],[3.7*2,1.9*2,0.3],
                   [6,1.3*2,0.3],[2.68*2,0,0.3],[6,-2,0.3],[8,-1.8*2,0.3],[8,-1.8*2,0.3],
                   [3.3*2,-6,0.3],[2.4*2,-4*2,0.3],[1.7*2,-4.3*2,0.3],[2,-8,0.3],
                   [0,-3.86*2,0.3],
                   [-2+0.4,-8,0.3],
                   [-1.7*2+0.4,-4.3*2,0.3],
                   [-2.4*2+0.4,-4*2,0.3],
                   [-3.3*2+0.4,-6,0.3],
                   [-8+0.4,-1.8*2,0.3],

                   [-3.9*2,-2,0.3],
                   [-8,0,0.3],
                   [-3.9*2,2,0.3],

                   [-3.7*2+0.4,1.9*2,0.3],
                   [-3*2+0.4,5,0.3],
                   [-2*2+0.4,2.8*2,0.3],
                   [-1*2+0.4,5.4,0.3],
                   [0,4.8,0.3],
                   ]
var pointsMela1 = translatePoints(pointsMela1,0,24.5,0)
var pointsMela2 = translatePoints(pointsMela1,0,0,-3)
var centromela = [0,24.5,0.3]

var melaCurve1 = genNUBS(pointsMela1);
var melaCurve2 = genNUBS(pointsMela2);
var melaBordo = genNUBS2d([melaCurve1[1],melaCurve2[1]])
var melaSup = genNUBS2d([melaCurve1[1],centromela])
var mela = STRUCT([COLOR([0,0,0]),melaBordo,melaSup])

//##############logoFoglia############

var pointsfoglia1 = [[-.4,2.7*2,0.3],
                    [1.6,6,0.3],[2.8,3.6*2,0.3],[1.6*2,8,0.3],
                    [1.8*2,10,0.3],[1.8*2,10,0.3],
                    [2,4.7*2,0.3],[0.2,8,0.3],
                    [-0.3*2,3.2*2,0.3],
                    [-.4,2.7*2,0.3]]
var pointsfoglia1 = translatePoints(pointsfoglia1,0,24.5,0)
var pointsfoglia2 = translatePoints(pointsfoglia1,0,0,-3)
var centrofoglia = [0,24.5+6,0.3]

var fogliaCurve1 = genNUBS(pointsfoglia1);
var fogliaCurve2 = genNUBS(pointsfoglia2);
var fogliaBordo = genNUBS2d([fogliaCurve1[1],fogliaCurve2[1]])
var fogliaSup = genNUBS2d([fogliaCurve1[1],centrofoglia])
var foglia = STRUCT([COLOR([0,0,0]),fogliaBordo,fogliaSup])

var logo = STRUCT([T([1])([4])(STRUCT([mela,foglia]))])
var logo2 = STRUCT([R([0,2])(PI),T([1,2])([-15,10]),COLOR([10,10,10]),logo])


scmodel = STRUCT([slice1 ,slice2, COLOR([0.15,0.15,0.15])(rotella),jack , playPause ,next ,COLOR([10,10,10])(prev), m,e,n,u, logo ,logo2 ])
DRAW(scmodel)