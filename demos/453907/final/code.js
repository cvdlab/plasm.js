//############################FUNZIONI UTILI##############################
var c1 = [249/255,245/255,191/255]  //giallino chiaro
var c2 = [230/255,223/255,140/255]  //giallino più scuro
var c3 = [102/255,255/255,0/255]    //verde interno
var c4 = [90/255,186/255,18/255]    //verde montagna
var domain = INTERVALS(1)(30)
var domain2 = DOMAIN([[0,1],[0,1]])([30,20]);
var domain2resolution = DOMAIN([[0,1],[0,1]])([50,50]);
var domainRotation1 = DOMAIN([[0,1],[0,2*PI]])([40,80]);
var domainRotation2 = DOMAIN([[0,1],[0,2*PI]])([4,80]);
var cubetto = COLOR(c2)(CUBOID([1.5,1,1]))

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
  var domain = INTERVALS(1)(20)
  var knots = generateKnot(controlPoints)
  var nubs = NUBS(S0)(2)(knots)(controlPoints)
  var curve = MAP(nubs)(domain)
  return [curve,nubs]
}

function genNUBS2d (arrayNUBS){
  //var domain2 = DOMAIN([[0,1],[0,1]])([200,50]);
  var domain2 = DOMAIN([[0,1],[0,1]])([20,10]);
  var s15 = BEZIER(S1)(arrayNUBS)
  var surf = MAP(s15)(domain2)
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

function rotZ (arrayOfPoints,angle) {
  var a = angle
  var result = [];
  for (i=0; i < arrayOfPoints.length; i++) {
    p = arrayOfPoints[i]
    AffineTransformation = [[COS(a),-SIN(a),0],[SIN(a),COS(a),0],[0,0,1]]
    var mul = numeric.dot(AffineTransformation,p)
    result=result.concat([mul])
  }
  return result
}


function replicaRotation (sezione,numRepliche,dutyCicle){

  var domain = DOMAIN([[0,1],[0,2*PI*dutyCicle/numRepliche]])([20,20]);

  var profile = genNUBS(sezione);
  
  var mapping = ROTATIONAL_SURFACE(profile[1]);
  var object = MAP(mapping)(domain)
  var surface = genNUBS2d([profile[1],sezione[0]])
  var top1 = surface
  var top2 = R([0,1])([2*PI*dutyCicle/numRepliche])(surface)
  var struc = COLOR(c2)(STRUCT([object,top1,top2]))
  var rotation = R([0,1])([2*PI/numRepliche])
  
  var result = STRUCT(REPLICA(numRepliche)([struc, rotation]))
  return result

}

function genNUBS2ddomain (arrayNUBS,domain){
  var domain2 = domain
  var knots = generateKnot(arrayNUBS)
  var s15 = NUBS(S1)(2)(knots)(arrayNUBS)
  var surf = MAP(s15)(domain2)
  return surf
}

function genNUBSdomain (controlPoints,domain1){
  var domain = domain1
  var knots = generateKnot(controlPoints)
  var nubs = NUBS(S0)(2)(knots)(controlPoints)
  var curve = MAP(nubs)(domain)
  return [curve,nubs]
}
//############################TORRE##############################

var profiloTorrePoints = [[0,0,0],[26,0,0],[26,0,0],[14,0,45],[14,0,45],[14,0,65],[14,0,65],
          [15.3,0,65],[15.3,0,65],[15.3,0,70],[15.3,0,70],[14-3,0,70],[14-3,0,70],[14-3,0,67.5],[14-3,0,67.5],[0,0,67.5]];
var profiloTorre = genNUBS(profiloTorrePoints);
var mappingTorre = ROTATIONAL_SURFACE(profiloTorre[1]);
var torre = COLOR(c1)(MAP(mappingTorre)(domainRotation1));

var quadratoPoints = translatePoints([[0,0,0],[1,0,0],[1,0,0],[1,0,1],[1,0,1],[0,0,1],[0,0,1],[0,0,0]],14,0,45)
var quadrato = genNUBS(quadratoPoints);
var mappingbordinoTorre = ROTATIONAL_SURFACE(quadrato[1]);
var bordinoTorre = COLOR(c2)(MAP(mappingbordinoTorre)(domainRotation2));


var cubetto = COLOR(c2)(CUBOID([1.5,1,1]))
var rotation1 = R([0,1])([2*PI/44])
var rotation2 = R([0,1])([2*PI/48])
var fregiTorre1 = STRUCT(REPLICA(44)([T([0,2])([14-0.5,59])(cubetto), rotation1]))

var fregiTorre2 = STRUCT(REPLICA(48)([T([0,2])([15.3-0.5,65])(cubetto), rotation2]))

//#####################---MERLI---################################

var merliPoints = translatePoints([[0,0,0],[1.3,0,0],[1.3,0,0],[-3,0,2],[-3,0,2],[-3,0,0],[-3,0,0],[0,0,0]],14,0,70)
var merli = replicaRotation(merliPoints,6,0.85)

//################### DECORAZIONI TORRE ###############

function arcoxy (r,radianti,scostamento,tx,ty,tz) { 
  var fun = function (p) { 
    var u = scostamento + p[0] * radianti;

    return [r * COS(u) + tx, r * SIN(u) + ty, tz];
  };

  return fun;
};
var arco1 = arcoxy(14.8,PI/3,0,0,0,45);
var arco2 = arcoxy(14.8,PI/3,PI,0,0,45);
var curveDec1 = [arco1,arco2]
var superficieDec1 = genNUBS2d(curveDec1)
var superficieDec2 = genNUBS2d([arco1, [22.5*COS(PI/6),22.5*SIN(PI/6), 16] ])
var superficieDec3 = genNUBS2d([arco2, [22.5*COS(PI+PI/6),22.5*SIN(PI+PI/6), 16] ])

var pointsTop11 = [[14.8*COS(0),14.8*SIN(0),45],[14.8*COS(0),14.8*SIN(0),45],[22.5*COS(PI/6),22.5*SIN(PI/6),16],[22.5*COS(PI/6),22.5*SIN(PI/6),16]]
var pointsTop12 = [[14.8*COS(PI),14.8*SIN(PI),45],[14.8*COS(PI),14.8*SIN(PI),45],[22.5*COS(PI+PI/6),22.5*SIN(PI+PI/6),16],[22.5*COS(PI+PI/6),22.5*SIN(PI+PI/6),16]]

var pointsTop21 = [[14.8*COS(PI/3),14.8*SIN(PI/3),45],[14.8*COS(PI/3),14.8*SIN(PI/3),45],[22.5*COS(PI/6),22.5*SIN(PI/6),16],[22.5*COS(PI/6),22.5*SIN(PI/6),16]]
var pointsTop22 = [[14.8*COS(PI+PI/3),14.8*SIN(PI+PI/3),45],[14.8*COS(PI+PI/3),14.8*SIN(PI+PI/3),45],[22.5*COS(PI+PI/6),22.5*SIN(PI+PI/6),16],[22.5*COS(PI+PI/6),22.5*SIN(PI+PI/6),16]]

var mapTop11 = genNUBS(pointsTop11)
var mapTop12= genNUBS(pointsTop12)

var mapTop21 = genNUBS(pointsTop21)
var mapTop22= genNUBS(pointsTop22)

var Top1 = genNUBS2d([mapTop11[1] ,mapTop12[1] ])
var Top2 = genNUBS2d([mapTop21[1] ,mapTop22[1] ])

var decTetraedroidal = COLOR(c2)(STRUCT([Top1,Top2,superficieDec1,superficieDec2,superficieDec3]))
var decTetraedroidal = STRUCT([R([0,1])([-PI/12]),decTetraedroidal,R([0,1])([PI/3])(decTetraedroidal),
                               R([0,1])([2*PI/3])(decTetraedroidal)])

//##################### ASSEMBLAGGIO TORRE ######################
var torre = STRUCT([torre,bordinoTorre,fregiTorre1,fregiTorre2,merli,decTetraedroidal])

//############################    MURO   ##############################
var profiloMuroPoints1 = [[0,0,0],[25,0,0],[25,0,0],[10,0,45],[10,0,45],[10,0,60],[10,0,60],[0,0,60],[0,0,60],[0,0,0]]
var profiloMuroPoints2 = translatePoints(profiloMuroPoints1,0,60,0)
var profiloMuro1 = genNUBS(profiloMuroPoints1);
var profiloMuro2 = genNUBS(profiloMuroPoints2);
var muroRaw = COLOR(c1)(genNUBS2d([profiloMuro1[1],profiloMuro2[1]]))
var bordinoMuro = COLOR(c2)(T([0,2])([10-1,45])(CUBOID([2,60,1])))
var basamento = COLOR(c3)(T([0])([-60])(CUBOID([60,60,46])))
var parapetto = COLOR(c2)(T([0,2])([10-4.3,60])(CUBOID([4.3,60,1])))

var merliMuroPoints1 = translatePoints([[0,0,0],[1.3,0,0],[1.3,0,0],[-3,0,2],[-3,0,2],[-3,0,0],[-3,0,0],[0,0,0]],10-1.7,1,61)
var merliMuroPoints2 = translatePoints([[0,0,0],[1.3,0,0],[1.3,0,0],[-3,0,2],[-3,0,2],[-3,0,0],[-3,0,0],[0,0,0]],10-1.7,19,61)
var profiloMerloMuro1 = genNUBS(merliMuroPoints1);
var profiloMerloMuro2 = genNUBS(merliMuroPoints2);
var topMerloMuro1 = genNUBS2d([profiloMerloMuro1[1],merliMuroPoints1[0]])
var topMerloMuro2 = genNUBS2d([profiloMerloMuro2[1],merliMuroPoints2[0]])
var superficieMerloMuro = genNUBS2d([profiloMerloMuro1[1],profiloMerloMuro2[1]]);
var merloMuro = STRUCT([COLOR(c2),T([0])([0.4]),topMerloMuro1,topMerloMuro2,superficieMerloMuro])
var merliMuro = STRUCT(REPLICA(3)([merloMuro,T([1])([20])]))


var muro = STRUCT([muroRaw,bordinoMuro,basamento,parapetto,merliMuro])

//##############---PORTE---################
h=6;  
l=4;  
r=2; //raggio arco
div = 16;
ArcoPointsExt = [[0,0,0],[0,0,4]]
for (var i = 0; i <= div; i++) {
  ArcoPointsExt.push([0,2+r*COS(PI-PI*i/div),4+r*SIN(PI-PI*i/div)])
};

ArcoPointsExt.push([0,4,4],[0,4,0])
ArcoPointsInt = translatePoints( scalePoints(ArcoPointsExt,1,3/4,5.5/6) , 0 , 0.5)
ArcoPointsExt2 = translatePoints(ArcoPointsExt,10)
ArcoPointsInt2 = translatePoints(ArcoPointsInt,10)
nubsArcoExt = genNUBS(ArcoPointsExt)
nubsArcoInt = genNUBS(ArcoPointsInt)
nubsArcoExt2 = genNUBS(ArcoPointsExt2)
nubsArcoInt2 = genNUBS(ArcoPointsInt2)



arcoExt = genNUBS2ddomain([nubsArcoInt[1],nubsArcoExt[1],nubsArcoExt[1],nubsArcoExt2[1],nubsArcoExt2[1],nubsArcoInt2[1]], 
                          DOMAIN([[0,1],[0,1]])([25,12]))
blkTop1 = COLOR([0,0,0])(genNUBS2d([[0,2,0],nubsArcoInt[1]]))
blkTop2 = COLOR([0,0,0])(genNUBS2d([[10,2,0],nubsArcoInt2[1]]))
arcoyz = STRUCT([COLOR(c2)(arcoExt),blkTop1,blkTop2])
archetti = STRUCT([T([0,1,2])([59,2,46]),arcoyz,STRUCT(REPLICA(6)([T([1])([8]),arcoyz]))])

arcoxz = R([0,1])([PI/2])(arcoyz)

arco1ext= T([0,1])([4,-86])(S([0,2])([2,1.5])(arcoxz))

arco1int = T([0,1,2])([85*0.575-9,-2,46])(arcoyz)
arco2int = T([0,1,2])([2,85*0.575-9,46])(arcoxz)
arco3int = T([0,1,2])([-85*0.575-1,-2,46])(arcoyz)
arco4int = T([0,1,2])([2,-85*0.575-1,46])(arcoxz)

arco1Maschio = T([0,1,2])([16-9,-2,46+46*0.5])(arcoyz)
arco2Maschio = T([0,1,2])([2,16-9,46+46*0.5])(arcoxz)
arco3Maschio = T([0,1,2])([-16-1,-2,46+46*0.5])(arcoyz)
arco4Maschio = T([0,1,2])([2,-16-1,46+46*0.5])(arcoxz)

arcoRivellino1 = T([0,1,2])([-73+6+8,-92+5,25])(arcoxz)
arcoRivellino2 = T([0,1,2])([14.5-9,-92-22-3,10])(S([1,2])([0.75,0.75])(arcoyz))
arcoRivellino3 = T([0,1,2])([-15.5,-92-22-3,10])(S([1,2])([0.75,0.75])(arcoyz))
arcoRivellino4 = T([0,1,2])([94+30+72*COS(PI/3)-10-5+0.5,-50-18+1,10])(R([0,1])([PI/3+PI/32])(S([1,2])([0.75,0.75])(arcoyz)))




porte = STRUCT([arco1ext,arco1int,arco2int,arco3int,arco4int,arco1Maschio,arco2Maschio,arco3Maschio,arco4Maschio,
                arcoRivellino1,arcoRivellino2,arcoRivellino3,arcoRivellino4])
DRAW(porte)


var UNquarto = STRUCT([T([0])([60])(muro),T([0,1])([60,60])(R([0,1])([PI/2])(muro)),T([0,1])([68,68])(torre),
              archetti,T([0,1])([-12+68,0])(R([0,1])([PI/2])(archetti))])

var livelloEsterno = STRUCT([UNquarto,R([0,1])([PI/2])(UNquarto),R([0,1])([PI])(UNquarto),R([0,1])([3*PI/2])(UNquarto)])
DRAW(livelloEsterno)


var livelloInterno = T([2])([46])(S([0,1,2])([0.575,0.575,0.5])(livelloEsterno))
DRAW(livelloInterno)



//##############---TORRE DEL MASCHIO---##############
  function genTorreMaschio (altezza,raggio,numMerli){
    rm = raggio || 16;
    h = altezza || 15;
    n = numMerli || 4;
    var profiloMaschioPoints = [[rm,0,0],[rm,0,h],[rm,0,h],[rm+1.3,0,h],[rm+1.3,0,h],[rm+1.3,0,h+5],
                        [rm+1.3,0,h+5],[rm-3,0,h+5],[rm-3,0,h+5],[rm-3,0,h+2.5],[rm-3,0,h+2.5],[0,0,h+2.5]]
    var profiloMaschio = genNUBS(profiloMaschioPoints);
    var mappingMaschio = ROTATIONAL_SURFACE(profiloMaschio[1]);
    var base = COLOR(c1)(MAP(mappingMaschio)(domainRotation1))

    var merliMaschioPoints = translatePoints([[0,0,0],[1.3,0,0],[1.3,0,0],[-3,0,2],[-3,0,2],[-3,0,0],[-3,0,0],[0,0,0]],rm,0,h+5)
    var merli = replicaRotation(merliMaschioPoints,n,0.85)
    

    var k = ROUND(PI*rm)
    var rot = R([0,1])([2*PI/k])
    var fregi = STRUCT(REPLICA(k)([T([0,2])([rm+1.3-0.5,h])(cubetto), rot]))
   
    return STRUCT([base,merli,fregi])
}

var maschio = T([2])([69])(genTorreMaschio())
DRAW(maschio)

//##############---RIVELLINO---##############

qbr = -15 //quota base rivellino
hr = 25 //altezza rivellino
sr = 10 // spessore rivellino

sezRivellinoPoints = [[0,0,0],[sr,0,0],[sr,0,0],
                      [sr,0,hr+1],[sr,0,hr+1],[sr-1,0,hr+1],[sr-1,0,hr+1],[sr-1,0,hr],[sr-1,0,hr],
                      [sr-7,0,hr],[sr-7,0,hr],[sr-7,0,hr+4.5],[sr-7,0,hr+4.5],
                      [0,0,hr+1],[0,0,hr+1],[0,0,hr-1],[0,0,hr-1],
                      [-0.8,0,hr-1],[-0.8,0,hr-1],
                      [-0.8,0,hr-1.8],[-0.8,0,hr-1.8],
                      [0,0,hr-1.8],[0,0,hr-1.8],[0,0,hr-5],[0,0,hr-5],
                      [-3,0,0],[-3,0,0],[0,0,0]]

function TR (ArrayPoints,angolo,punto){
  var result =  translatePoints( rotZ (ArrayPoints,angolo),punto[0],punto[1],punto[2])
  //DRAW(POLYLINE(result))
  return result;
}

var sections = new Array()
sections.push(TR (sezRivellinoPoints,0,[-73+6,-92+15,0]))
sections.push(TR (sezRivellinoPoints,0,[-73+6,-92,0]))
sections.push(TR (sezRivellinoPoints,0,[-73+6,-92,0]))
sections.push(TR (scalePoints(sezRivellinoPoints,SQRT(2)),PI/4,[-73+6,-92-30,qbr]))
sections.push(TR (scalePoints(sezRivellinoPoints,SQRT(2)),PI/4,[-73+6,-92-30,qbr]))

sections.push(TR(scalePoints(sezRivellinoPoints,SQRT(2)),PI/4,[23.5*COS(PI+(PI*0/6)),(-92-30+23.5*SIN(PI+(PI*0/6))),qbr]))
sections.push(TR(scalePoints(sezRivellinoPoints,SQRT(2)),PI/4,[23.5*COS(PI+(PI*0/6)),(-92-30+23.5*SIN(PI+(PI*0/6))),qbr]))

for (var k = 1; k <= 5; k++) {
  a=PI*k/6
  sections.push(TR(sezRivellinoPoints,a,[23.5*COS(PI+a),(-92-22+23.5*SIN(PI+a)),qbr]))
};

sections.push(TR(scalePoints(sezRivellinoPoints,SQRT(2)),PI-PI/4,[23.5*COS(PI+(PI*6/6)),(-92-30+23.5*SIN(PI+(PI*6/6))),qbr]))
sections.push(TR(scalePoints(sezRivellinoPoints,SQRT(2)),PI-PI/4,[23.5*COS(PI+(PI*6/6)),(-92-30+23.5*SIN(PI+(PI*6/6))),qbr]))

sections.push(TR(scalePoints(sezRivellinoPoints,SIN(PI-PI/3)+ABS(COS(PI-PI/3))),PI-PI/3,[94+30,-92-30,qbr]))
sections.push(TR(scalePoints(sezRivellinoPoints,SIN(PI-PI/3)+ABS(COS(PI-PI/3))),PI-PI/3,[94+30,-92-30,qbr]))

sections.push(TR(scalePoints(sezRivellinoPoints,SIN(PI-PI/3)+ABS(COS(PI-PI/3))),PI-PI/3,[94+30+72*COS(PI/3),-50,qbr]))



var sectionsNubs = new Array()
for (var j = 0; j < sections.length; j++) {
  sectionsNubs.push(genNUBS(sections[j])[1])
};
var rivellino = COLOR(c1)(genNUBS2ddomain (sectionsNubs, DOMAIN([[0,1],[0,1]])([30,100])) )
DRAW(rivellino)

var torre1Riv = T([1,2])([-92-22,qbr])(genTorreMaschio(15+17.5,14.5,10))
DRAW(torre1Riv)

//---Torre Rivellino2---
    rm = 16;
    h = 27;
    n = 10;
    var profiloTorreRiv2Points = [[rm,0,0],[rm-5,0,18],[rm-5,0,18],[rm-3.5,0,18],[rm-3.5,0,18],[rm-3.5,0,21],[rm-3.5,0,21],[rm-7.5,0,25],[rm-7.5,0,25],
                                  [rm-7.5,0,h],[rm-7.5,0,h],[rm-5.5,0,h],[rm-5.5,0,h],[rm-5.5,0,h+3],[rm-5.5,0,h+3],[rm-9.8,0,h+3],[rm-9.8,0,h+3],
                                  [rm-9.8,0,h+1.5],[rm-9.8,0,h+1.5],[0,0,h+1.5]]
    
    
    var profiloTorreRiv2 = genNUBS(profiloTorreRiv2Points);
    var mappingTorreRiv2 = ROTATIONAL_SURFACE(profiloTorreRiv2[1]);
    var base = COLOR(c1)(MAP(mappingTorreRiv2)(domainRotation1))

    var merliMaschioPoints = translatePoints([[0,0,0],[1.3,0,0],[1.3,0,0],[-3,0,2],[-3,0,2],[-3,0,0],[-3,0,0],[0,0,0]],rm-9.8+3,0,h+3)
    var merli = replicaRotation(merliMaschioPoints,n,0.85)
    

    var k1 = ROUND(PI*14.5)
    var k2 = ROUND(PI*16.5)
    var rot1 = R([0,1])([2*PI/k1])
    var rot2 = R([0,1])([2*PI/k2])
    var fregi1 = STRUCT(REPLICA(k1)([T([0,2])([rm-5.5-0.5,h])(cubetto), rot1]))
    var fregi2 = STRUCT(REPLICA(k2)([T([0,2])([rm-3.5-0.5,18])(cubetto), rot2]))
    var TorreRiv2 = T([0,1,2])([94+30+72*COS(PI/3)-10,-50,qbr])(S([0,1,2])([1.3,1.3,1.25])(STRUCT([base,merli,fregi1,fregi2])))
    DRAW(TorreRiv2)

//####################---MONTAGNA---####################################
z=0;
r=26; //raggio torre
div = 16;
profBaseCastelloPoints = [[0,85,z],[-SQRT(387)+65,85,z],[-SQRT(387)+65,85,z]]
for (var i = 0; i <= div; i++) {
  profBaseCastelloPoints.push([68+r*COS(3*PI/4-PI*i/div),68+r*SIN(3*PI/4-PI*i/div),z])
};

profBaseCastelloPoints.push([85,-SQRT(387)+65,z],[85,-SQRT(387)+65,z],[85,0,z])
profBaseCastelloPoints = CAT([profBaseCastelloPoints, rotZ(profBaseCastelloPoints,-PI/2), rotZ(profBaseCastelloPoints,-PI), rotZ(profBaseCastelloPoints,-3*PI/2)])

// Basamento BASE
//Primo Quadrante
basamentoBasePoints = new Array();
for (var n = 0; n < 11; n++) {
  basamentoBasePoints.push([94*n/10,94,0])
};
for (var n = 0; n < 4; n++) {
  basamentoBasePoints.push([94+82*n/4,94,0])
};
for (var n = 0; n < 5; n++) {
  basamentoBasePoints.push([176,94*(5-n)/5,0])
};
//Quarto Quadrante
for (var n = 0; n < 11; n++) {
  basamentoBasePoints.push([176,-145.5*n/10,0])
};
for (var n = 0; n < 11; n++) {
  basamentoBasePoints.push([176*(10-n)/10,-145.5,0])
};
//Terzo Quadrante
for (var n = 0; n < 11; n++) {
  basamentoBasePoints.push([-94*n/10,-145.5,0])
};
for (var n = 0; n < 11; n++) {
  basamentoBasePoints.push([-94,-145.5*(10-n)/10,0])
};
//Secondo Quadrante
for (var n = 0; n < 11; n++) {
  basamentoBasePoints.push([-94,94*n/10,0])
};
for (var n = 0; n < 11; n++) {
  basamentoBasePoints.push([-94*(10-n)/10,94,0])
};

basamentoBasePoints1 = translatePoints(basamentoBasePoints,0,0,-13)
basamentoBasePoints2 = translatePoints(scalePoints(basamentoBasePoints,2,2,1),0,0,-60)

var profiloCastello = genNUBSdomain(profBaseCastelloPoints,INTERVALS(1)(88));
var profiloBasamento1 = genNUBSdomain(basamentoBasePoints1,INTERVALS(1)(88));
var profiloBasamento2 = genNUBSdomain(basamentoBasePoints2,INTERVALS(1)(88));

var mountain = COLOR(c4)(genNUBS2ddomain([[0,0,0], profiloCastello[1],profiloCastello[1],profiloBasamento1[1],
                                  profiloBasamento2[1]], DOMAIN([[0,1],[0,1]])([50,100])))
DRAW(mountain)

//var model = STRUCT([livelloEsterno,livelloInterno,porte,maschio,rivellino,torre1Riv,TorreRiv2,mountain])
//DRAW(model)