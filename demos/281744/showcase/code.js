//modello joypad console WIIu

function generateKnot(controlPoints){
  lun = controlPoints.length + 2 + 1;
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

var domain = INTERVALS(1)(30)
var dom2d = DOMAIN([[0,1],[0,1]])([30,30]);

//corpo
var points11= [[0,0,0],[0,1,0],[3,1,0],[6,1,0],[6,0,0]]
var knots11 = generateKnot(points11)
var nubs11 = NUBS(S0)(2)(knots11)(points11);
var curve11 = MAP(nubs11)(domain);
var sur11 = BEZIER(S1)([nubs11,[3,0,0]])
var surface11 = MAP(sur11)(dom2d)

var points12=[[6,0,0],[6,-1,0],[3,-1,0],[0,-1,0],[0,0,0]]
var knots12 = generateKnot(points12)
var nubs12 = NUBS(S0)(2)(knots12)(points12);
var curve12 = MAP(nubs12)(domain);
var sur12 = BEZIER(S1)([nubs12,[3,0,0]])
var surface12 = MAP(sur12)(dom2d)

var points21 = [[0,0,1],[0,1,1],[3,1,1],[6,1,1],[6,0,1]]
var knots21 = generateKnot(points21)
var nubs21 = NUBS(S0)(2)(knots21)(points21);
var curve21 = MAP(nubs21)(domain);
var sur21 = BEZIER(S1)([nubs11,nubs21])
var surface21 = MAP(sur21)(dom2d)

var points22 = [[6,0,1],[6,-1,1],[3,-1,1],[0,-1,1],[0,0,1]]
var knots22 = generateKnot(points22)
var nubs22 = NUBS(S0)(2)(knots22)(points22);
var curve22 = MAP(nubs22)(domain);
var sur22 = BEZIER(S1)([nubs12,nubs22])
var surface22 = MAP(sur22)(dom2d)

var points31 = [[1,-0.5,1.5],[3,-0.5,2],[5,-0.5,1.5]]
var knots31 = generateKnot(points31)
var nubs31 = NUBS(S0)(2)(knots31)(points31);
var curve31 = MAP(nubs31)(domain);
var sur31 = BEZIER(S1)([nubs21,nubs31])
var surface31 = MAP(sur31)(dom2d)
var sur32 = BEZIER(S1)([nubs22,nubs31])
var surface32 = MAP(sur32)(dom2d)

contorno_avanti = STRUCT([surface11,surface12,surface22,surface21,COLOR([0.8,0.8,0.8])(surface31),COLOR([0.8,0.8,0.8])(surface32)])
var schermo = T([0,1,2])([1.25,-0.7,-0.05])(COLOR([10,10,10])(CUBOID([2.25,1.4,0.2])))
var contorno_avanti_compl =STRUCT([COLOR([0,0,0])(S([0,1,2])([0.8,1.2,0.5])(contorno_avanti)),schermo])

//freccette
barretta = CUBOID([0.5,1,0.2])
freccetta = STRUCT([COLOR([0.4,0.4,0.4])(barretta),COLOR([10,10,10])(T([0,1,2])([0.25,0.6,0.01])(S([0,1])([0.1,0.3])(barretta)))])
freccette = T([0,1,2])([0.6,-0.1,0.05])(S([0,1,2])([0.2,0.2,0.5])(R([1,2])([PI])(STRUCT([freccetta,T([0,1])([0.25,-0.25])(R([0,1])([PI/2])(freccetta)),T([0])([0.5])(R([0,1])([PI])(freccetta)),T([0,1])([0.25,0.25])(R([0,1])([-PI/2])(freccetta))]))))

//pulsante x
pulsante = COLOR([0.4,0.4,0.4])(EXTRUDE([1])(DISK()()))
pulsanteScuro = COLOR([0.2,0.2,0.2])(EXTRUDE([1])(DISK()()))
barrettaX = CUBOID([0.5,0.1,0.15])
x = STRUCT([R([0,1])(-PI/2)(barrettaX),barrettaX,T([0,1])([0.1,0.1]),R([0,1])(PI/2)(barrettaX),R([0,1])(PI)(barrettaX)])
pulsanteX=STRUCT([T([2])([0.9])(R([0,1])([PI/4])(x)),pulsante])
pulsantex = T([0,1])([4,-0.25])(S([0,1,2])([0.06,0.06,0.06])(R([1,2])(PI)(pulsanteX)))
//pulsante y
var y = STRUCT([R([0,1])(-PI/4)(barrettaX),R([0,1])(PI/4)(barrettaX),T([0])([-0.5])(barrettaX)])
pulsanteY = STRUCT([T([2])([0.9])(R([0,1])(PI/2)(S([0,1])([1.2,0.8])(y))),pulsante])
pulsantey = T([0])([3.8])(S([0,1,2])([0.06,0.06,0.06])(R([1,2])(PI)(pulsanteY)))
//pulsante start
var pulsanteStart=STRUCT([T([2])([0.9])(x),pulsanteScuro])
var pulsantestart = T([0,1])([3.8,0.45])(S([0,1,2])([0.05,0.05,0.05])(R([1,2])(PI)(pulsanteStart)))
//pulsante select
var select = STRUCT([R([0,1])(-PI/2)(barrettaX),T([0,1])([0.1,-0.1])(R([0,1])(PI/2)(barrettaX))]);
var pulsanteSelect = STRUCT([T([2])([0.9])(R([0,1])([PI/2])(select)),pulsanteScuro])
var pulsanteselect = T([0,1])([3.8,0.65])(S([0,1,2])([0.05,0.05,0.05])(R([1,2])(PI)(pulsanteSelect)))
//pulsante a
var a = STRUCT([T([0,1])([-0.07,0.07])(R([0,1])(-PI/4)(barrettaX)),R([0,1])(PI/4)(barrettaX),T([0,1])([0.3,-0.2])(R([0,1])([PI/2])(barrettaX))])
var pulsanteA = STRUCT([T([1,2])([0.2,0.9])(R([0,1])([-PI/2])(S([0])([2])(a))),pulsante])
var pulsantea = T([0])([4.2])(S([0,1,2])([0.06,0.06,0.06])(R([1,2])(PI)(pulsanteA)))

//pulsante b
function annulus_sector (alpha, r, R) {
  var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    
    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  return model;
}

curve02 = R([0,1])(PI)(annulus_sector(PI, 1, 2));
var barrettaB = S([1])([4])(barrettaX);
var halfB = STRUCT([S([0,1])([0.5,0.9])(EXTRUDE([0.15])(curve02)),barrettaB,T([0])([0.5])(barrettaB),T([0])([-0.5])(barrettaB),T([0])([-1])(barrettaB)]);
var b = STRUCT([halfB,T([0])([-2])(halfB)]);
var pulsanteB = STRUCT([T([1,2])([0.2,0.9])(R([0,1])([PI/2])(S([0,1])([0.25,0.2])(b))),pulsante]);
var pulsanteb = T([0,1])([4,0.25])(S([0,1,2])([0.06,0.06,0.06])(R([1,2])(PI)(pulsanteB)));
var barraR = STRUCT([T([0])([1.5])(barrettaB),T([0])([1])(barrettaB)]);
var barraR2 = STRUCT([T([0])([1.5])(barrettaB),T([0])([1])(barrettaB),T([0])([2])(barrettaB)]);
var r = T([0,1,2])([3.66,-1.15,0.25])(R([1,2])([-PI/2])(R([0,1])([PI/2])(S([0,1,2])([0.03,0.03,0.03])(STRUCT([halfB,barraR,R([0,1])([-PI/4])(barraR2)])))));

//tasto superiore
var punti_sup1 = [[1,0,0],[1,0.5,0],[0.5,1,0]]
var punti_sup2 = [[0.5,0,0],[0.5,0.5,0],[0,1,0]]
var punti_sup3 = [[1,0,0.5],[1,0.5,0.5],[0.5,1,0.5]]
var punti_sup4 = [[0.5,0,0.5],[0.5,0.5,0.5],[0,1,0.5]]

var knotsup1 = generateKnot(punti_sup1)
var nubssup1 = NUBS(S0)(2)(knotsup1)(punti_sup1);
var curvesup1 = MAP(nubssup1)(domain);

var knotsup2 = generateKnot(punti_sup2)
var nubssup2 = NUBS(S0)(2)(knotsup2)(punti_sup2);
var curvesup2 = MAP(nubssup2)(domain);

var knotsup3 = generateKnot(punti_sup3)
var nubssup3 = NUBS(S0)(2)(knotsup3)(punti_sup3);
var curvesup3 = MAP(nubssup3)(domain);

var knotsup4 = generateKnot(punti_sup4)
var nubssup4 = NUBS(S0)(2)(knotsup4)(punti_sup4);
var curvesup4 = MAP(nubssup4)(domain);



var surSup1 = BEZIER(S1)([nubssup1,nubssup2]);
var surSup2 = BEZIER(S1)([nubssup3,nubssup4]);
var surSup3 = BEZIER(S1)([nubssup3,nubssup1]);
var surSup4 = BEZIER(S1)([nubssup4,nubssup2]);

var surfaceSup1 = MAP(surSup1)(dom2d);
var surfaceSup2 = MAP(surSup2)(dom2d);
var surfaceSup3 = MAP(surSup3)(dom2d);
var surfaceSup4 = MAP(surSup4)(dom2d);
//lettera l
var cubo = CUBOID([0.2,0.05,1])
l = STRUCT([cubo,R([0,2])([PI/2])(cubo)])

var tasto_sup1 = COLOR([0.3,0.3,0.3])(T([0,1,2])([0.7,-0.75,0.25])(R([0,1])([PI*1.22])(S([0,1,2])([0.4,0.4,0.4])(STRUCT([surfaceSup1,surfaceSup2,surfaceSup3,surfaceSup4,T([1])([1])(CUBOID([0.5,0,0.5])),T([0])([0.5])(CUBOID([0.5,0,0.5]))])))));
var tasto_sup2 = COLOR([0.3,0.3,0.3])(T([0,1,2])([4.1,-0.75,0.25])(R([0,1])([-PI/2])(S([0,1,2])([0.4,0.4,0.4])(STRUCT([surfaceSup1,surfaceSup2,surfaceSup3,surfaceSup4,T([1])([1])(CUBOID([0.5,0,0.5])),T([0])([0.5])(CUBOID([0.5,0,0.5]))])))));

//levetta
var domRotational = DOMAIN([[0,1],[0,2*PI]])([35,35]);
var puntiLevetta = [[0.5,0,0],[0.5,0,0.2],[0.25,0,0.7],[1,0,0.8],[0.5,0,1],[0,0,0.9]]
var knotsLevetta = generateKnot(puntiLevetta);
var levetta = NUBS(S0)(2)(knotsLevetta)(puntiLevetta)

var surLevetta = ROTATIONAL_SURFACE(levetta)
var levettaJoypad = COLOR([0.4,0.4,0.4])(R([1,2])([PI])(S([0,1,2])([0.2,0.2,0.2])(MAP(surLevetta)(domRotational))));
var levettaJoypad1 = T([0,1])([0.5,-0.6])(levettaJoypad)
var levettaJoypad2 = T([0,1])([4.2,-0.6])(levettaJoypad)

//logo
//lettera i
var i = STRUCT([S([0])([0.5])(T([0,1])([-0.1,-0.3])(barrettaX)),T([0,1,2])([0.3,-0.25,0.1])(S([0,1,2])([0.5,0.5,0.5])(EXTRUDE([0.1])(DISK(0.1)(20))))])
//lettera w
var v = STRUCT([T([0,1])([-0.07,0.07])(R([0,1])(-PI/4)(barrettaX)),R([0,1])(PI/4)(barrettaX)])
var w = S([1])([0.5])(STRUCT([v,T([1])([0.6])(v)]))
var logo = R([0,1])([PI/2])(STRUCT([w,i,T([1])([-0.25])(i)]))
//lettera u
var u1 = [[0,1,0],[0,0,0],[0.5,0,0],[1,0,0],[1,1,0]]
var u2 = [[0.1,1,0],[0.1,0.1,0],[0.5,0.1,0],[0.9,0.1,0],[0.9,1,0]]
var nubsU1 = NUBS(S0)(2)(generateKnot(u1))(u1)
var nubsU2 = NUBS(S0)(2)(generateKnot(u2))(u2)

var u = BEZIER(S1)([nubsU1,nubsU2])
var surfaceU = T([0])([0.2])(S([0])([0.6])(MAP(u)(dom2d)))
var letterau = STRUCT([T([2])([0.11])(surfaceU),COLOR([0,0,10])(CUBOID([1,1,0.1]))])
var letterauSmall = STRUCT([COLOR([0,0,0])(T([2])([0.11])(surfaceU)),CUBOID([1,1,0.1])])
var logo_completo = R([0,1])([PI])(R([0,2])([PI])(T([0,1,2])([2.2,-0.1,-0.09])(STRUCT([logo,T([0,1])([0.7,0.15])(S([0,1,2])([0.2,0.2,1.5])(letterau))]))))
var logo_completo2 = S([0,1])([0.3,0.3])(R([0,1])([PI])(R([0,2])([PI])(T([0,1,2])([4.7,-3.25,-0.13])(STRUCT([logo,T([0,1])([0.7,0.15])(S([0,1,2])([0.2,0.2,1.5])(letterauSmall))])))))

//pulsante TV

var t = S([1])([0.5])(STRUCT([barrettaX,R([0,1])([PI/2])(barrettaX),T([0])([-0.1])(R([0,1])([-PI/2])(barrettaX))]))
var tv = COLOR([0,0.7,1])(R([0,1])([-PI/2])(STRUCT([t,T([0,1,2])([0.4,0.5,0.15])(R([0,2])([PI])(S([0,1])([1.5,0.5])(v)))])))
var pulsantetv = STRUCT([T([0,1,2])([-0.2,0.1,0.9])(tv),pulsanteScuro])
var pulsanteTV = T([0,1,2])([3.25,0.9,0])(R([1,2])([PI])(S([0,1,2])([0.07,0.07,0.07])(pulsantetv)))

// pulsante spegni
var circle = CIRCLE(0.1)(32)
var barrettaRossa = CUBOID([0.01,0.2])
var pulsantespegni = T([0,1,2])([3.5,0.9,-0.05])(S([0,1,2])([0.3,0.3,0.3])(STRUCT([COLOR([10,0,0])(STRUCT([circle,T([0,1,2])([-0.02,-0.2,-0.05])(barrettaRossa)])),S([0,1,2])([0.2,0.2,0.1])(pulsanteScuro)])))

// fotocamera
var fotocamera = COLOR([0,0,0])(annulus_sector(2*PI, 1, 2));
var fotocamera_int = annulus_sector(2*PI, 0.5, 1);
var internal = COLOR([0,0,1])(DISK(0.5)(30))
var fotocamera_compl = EXTRUDE([1])(S([0,1,2])([0.02,0.02,0.02])(STRUCT([fotocamera,fotocamera_int,internal])))
var alloggiamento_fotocamera = COLOR([0.15,0.15,0.15])(T([0,1,2])([1.8,-0.95,-0.05])(S([0,1,2])([0.2,0.08,0.1])(STRUCT([surface11,surface12,surface22,surface21]))))
var foto_all = T([2])([-0.01])(STRUCT([T([0,1,2])([1.9,-0.95,-0.16])(fotocamera_compl),alloggiamento_fotocamera]))


//pulsante home
var pulsanteBluEsterno = COLOR([0,0.5,1])(annulus_sector(2*PI, 0.8, 1));
var pulsanteBluInterno = COLOR([0.2,0.2,0.2])(DISK(0.8)(30));
var pulsanteBlu2d = STRUCT([pulsanteBluInterno,pulsanteBluEsterno]);
var pulsanteBlu3d = EXTRUDE([1])(pulsanteBlu2d);
var tetto = SIMPLEX(2);
var wall = R([0,1])([-PI/4])(CUBOID([0.2,0.5]))
var house = COLOR([10,10,10])(STRUCT([tetto,T([0,1])([0.73,0.27])(wall),T([0,1])([0.2,0.8])(wall),T([0,1])([1,0.98])(R([0,1])([-PI/2])(wall)),T([0,1])([0.9,0.8])(R([0,1])([PI/2])(wall))]))
var pulsante_home = STRUCT([pulsanteBlu3d,T([0,2])([-0.8,-0.01])(R([0,1])([-PI/4])(house))])
var pulsante_home_compl = T([0,1,2])([2.44,0.9,-0.03])(R([0,1])([PI/2])(S([0,1,2])([0.09,0.09,0.09])(pulsante_home)))

var model = T([0,2])([-0.5,-0.1])(STRUCT([T([0,2])([0.5,0.1])(r),T([0,1,2])([0.7,-1.18,0.3])(S([0,1,2])([0.07,0.07,0.07])(l)),contorno_avanti_compl,pulsantex,pulsantey,pulsantea,pulsanteb,pulsantestart,pulsanteselect,freccette,levettaJoypad1,levettaJoypad2,logo_completo,logo_completo2,pulsanteTV,pulsantespegni,foto_all,pulsante_home_compl,tasto_sup1,tasto_sup2]));


