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

//===============================================================================
// FUNCTIONS
//===============================================================================  
function domainRotational(){
  return DOMAIN([[0,1],[0,2*PI]])([36,36]); 
}

function curveFunction(controlPoints){
  return CUBIC_HERMITE(S0)(controlPoints);
}

function curveHermite(controlPoints){
    var domainCurve=INTERVALS(1)(12);
    var curva = CUBIC_HERMITE(S0)(controlPoints)
    return MAP(curva)(domainCurve)
  }

function supHermite(controlPoints1,controlPoints2,t1,t2){
    var domainSurface=DOMAIN([[0,1],[0,1]])([12,12]); 
    var curva1 = CUBIC_HERMITE(S0)(controlPoints1)
    var curva2 = CUBIC_HERMITE(S0)(controlPoints2)
    var funCur = CUBIC_HERMITE(S1)([curva1,curva2,t1,t2])
    return MAP(funCur)(domainSurface)
  }

function creaToro(R,r){
  var domain = DOMAIN([[0,2*PI],[0,2*PI]])([36,72])
  function torus(R,r){
    return function(v){
        var a = v[0];
        var b = v[1];
        var u = (r * COS(a) + R) * COS(b);
        var v = (r * COS(a) + R) * SIN(b);
        var w = (r * SIN(a));
        return [u,v,w];
    }
  }
  var mapping = torus(R,r);
  return MAP(mapping)(domain);
}

function cylinder(r,h,dom) {
    var cyl = EXTRUDE([h])(DISK([r])(dom))
    return cyl;
  };

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

function supHermiteFun(curve1,curve2,t1,t2){
    var domainSurface=DOMAIN([[0,1],[0,1]])([12,12]); 
    var funCur = CUBIC_HERMITE(S1)([curve1,curve2,t1,t2])
    return MAP(funCur)(domainSurface)
  }

function rotationalSurface(funCurve){
  var sup = MAP(ROTATIONAL_SURFACE(funCurve))(domainRotational())
  return sup;
}

function rgb(r,g,b){
  return COLOR([r/255, g/255, b/255]);
}

function rgba(r,g,b,a){
  return COLOR([r/255, g/255, b/255, a]);
}

function curves_union( curves ){
  function isin( u, a, b ){
    return (u >= a && u < b) ;}
      function aux0( domains ){
          function aux1(u){
              n = curves.length
              i = 0
              j = 0
              k = 0
              while ( i < n ){
                  k += domains[i][1] - domains[i][0]
                  i += 1}
              i = 0;
              while ( i < n && !(isin(u[0] * k, j, j + domains[i][1] - domains[i][0])) ){
              j += domains[i][1] - domains[i][0]
              i += 1}

              if ( i < n ){
                return curves[i]([ domains[i][0] + u[0] * k - j ])}
              else{
          return curves[n-1]([ domains[n-1][1] ])}}
      return aux1;}
return aux0;
}

function coonsPatch(controlPointsCurve1,controlPointsCurve2,controlPointsSup1,controlPointsSup2){
  var dom2D = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);
  var cP1a=CUBIC_HERMITE(S0)(controlPointsCurve1)
  var cP1b=CUBIC_HERMITE(S0)(controlPointsCurve2)
  var cP1c=CUBIC_HERMITE(S1)(controlPointsSup1)
  var cP1d=CUBIC_HERMITE(S1)(controlPointsSup2)
  return MAP(COONS_PATCH([cP1a,cP1b,cP1c,cP1d]))(dom2D);
}

function triangolarCoonsPatch(controlPointsCurve1,controlPointsSup1,controlPointsCurve2){
  var dom2DTri = TRIANGLE_DOMAIN(32, [[1,0,0],[0,1,0],[0,0,1]]);
  var curve1=curveFunction(controlPointsCurve1);
  var curve2=curveFunction(controlPointsSup1);
  var sup1=CUBIC_HERMITE(S1)(controlPointsCurve2);
  return  MAP(TRIANGULAR_COONS_PATCH([curve1,sup1,curve2]))(dom2DTri);
}

function triangolarCoonsPatchv2(curveFun1,controlPointsSup1,controlPointsCurve2){
  var dom2DTri = TRIANGLE_DOMAIN(32, [[1,0,0],[0,1,0],[0,0,1]]);
  var curve2=curveFunction(controlPointsSup1);
  var sup1=CUBIC_HERMITE(S1)(controlPointsCurve2);
  return  MAP(TRIANGULAR_COONS_PATCH([curveFun1,sup1,curve2]))(dom2DTri);
}

//===============================================================================
//================================== SIDE A =====================================
//=============================================================================== 

//points of side A
aA=[[-24.5,6,11.5],[-19,10.5,12],[2,8,0],[8,0,0]]
bA=[[-19,10.5,12],[-14,4.5,12.5],[12,0,0],[2,-2,0]]
cA=[[-14,4.5,12.5],[9,4,12.5],[1,-1,0],[0,0,0]]
dA=[[9,4,12.5],[16,10,12.5],[10,0,0],[20,0,0]]
eA=[[16,10,12.5],[21,4.5,12],[10,0,0],[3,-3,0]]
fA=[[25,5,8],[21,4.5,12],[0,0,0],[-3,2,0]]
gA=[[22.5,12,8],[25,5,8],[2,0,0],[0,-8,0]]
hA=[[22.5,12,8],[4.5,13,12],[0,0,11],[-5,0,0]]
iA=[[3.5,5.5,12.5],[4.5,13,12],[3,0,0],[0,20,0]]
lA=[[-12,5.5,12.5],[3.5,5.5,12.5],[0,0,0],[0,0,0]]
mA=[[-13,13,11.5],[-12,5.5,12.5],[0,0,0],[8,2,0]]
nA=[[-24.5,6,11.5],[-25,5,10],[-1,-1,0],[0,0,-1]]
oA=[[-25,5,10],[-23,13,8],[0,6,0],[0,0,-6]]
pA=[[-13,13,11.5],[-23,13,8],[0,0,0],[-2,0,-4]]
col1A=[[-19,10.5,12],[-23,13,8],[0,0,0],[-3,0,-6]]
col2A=[[-13,13,11.5],[-19,10.5,12],[0,0,2],[0,0,0]]
col3A=[[16,10,12.5],[4.5,13,12],[0,0,0],[0,0,-2]]
col4A=[[22.5,12,8],[16,10,12.5],[0,0,4],[0,0,0]]
qA=[[22.5,12,8],[19.5,15,8],[0,0,0],[0,0,0]]
rA=[[19.5,15,8],[17.5,15,10],[0,0,2],[-2,0,0]]
sA=[[17.5,15,10],[4.5,15.5,11],[-4,0,1],[0,0,0]]
curvaUnitaA=curves_union([curveFunction(rA),curveFunction(sA)])([[0,1],[0,1]])
tA=[[4.5,13,12],[4.5,15.5,11],[0,0,0],[0,0,0]]
uA=[[17.5,15,10],[4,23,9],[-2,20,-2],[0,0,0]]
vA=[[4,23,9],[4.5,15.5,11],[0,0,0],[0,0,0]]
zA=[[4,23,9],[-8,22,9],[-15,2,0],[-1,-1,0]]
curvaUnita2A=curves_union([curveFunction(uA),curveFunction(zA)])([[0,1],[0,1]])
xA=[[-8,22,9],[-12.5,15.5,10],[-2,-1,0],[0,0,0]]
yA=[[-12.5,15.5,10],[-13,13,11.5],[0,0,0],[0,0,0]]
kA=[[-12.5,15.5,10],[-23,13,8],[-13,0,-5],[-2,-4,0]]

//curve of side A
curva1A=curveHermite(aA);
curva2A=curveHermite(bA);
curva3A=curveHermite(cA);
curva4A=curveHermite(dA);
curva5A=curveHermite(eA);
curva6A=curveHermite(fA);
curva7A=curveHermite(gA);
curva8A=curveHermite(hA);
curva9A=curveHermite(iA);
curva10A=curveHermite(lA);
curva11A=curveHermite(mA);
curva12A=curveHermite(nA);
curva13A=curveHermite(oA);
curva14A=curveHermite(pA);
curva15A=curveHermite(qA);
curva16A=curveHermite(rA);
curva17A=curveHermite(sA);
curva18A=curveHermite(tA);
curva19A=curveHermite(uA);
curva20A=curveHermite(vA);
curva21A=curveHermite(zA);
curva22A=curveHermite(xA);
curva23A=curveHermite(yA);
curva24A=curveHermite(kA);

//surface of side A
var surfaceSHA=supHermiteFun(curvaUnitaA,curveFunction(hA),[0,0,0],[0,0,0])
var coonsPatch1A = coonsPatch(aA,oA,nA,col1A);
var surfaceBMA=supHermite(bA,mA,[0,0,0],[0,0,-2])
var surfaceLCA=supHermite(lA,cA,[0,0,2],[0,0,0])
var surfaceIDA=supHermite(iA,dA,[0,0,2],[0,0,0])
var surfacePCol1Col2A = triangolarCoonsPatch(pA,col1A,col2A);
var surfaceHCol3Col4A = triangolarCoonsPatch(hA,col3A,col4A);
var coonsPatch2A = coonsPatch(gA,eA,col4A,fA);
var cofanoLateraleA=triangolarCoonsPatch(kA,pA,yA);

//curve struct
structCurveA=STRUCT([curva1A,curva2A,curva3A,curva4A,curva5A,curva6A,curva7A,curva9A,curva10A,curva11A,curva12A,curva13A,curva14A,
                      curva15A,curva16A,curva17A,curva18A,curva19A,curva20A,curva21A,curva22A,curva23A,curva24A])
//surface struct
structSurfaceA=STRUCT([coonsPatch1A,surfaceBMA,surfacePCol1Col2A,surfaceLCA,surfaceIDA,surfaceHCol3Col4A,coonsPatch2A,surfaceSHA,cofanoLateraleA])
//side A
sideA=rgb(106,18,30)(STRUCT([structSurfaceA]))

//===============================================================================
//================================== SIDE B =====================================
//=============================================================================== 

// points of side B
aB=[[-24.5,6,-11.5],[-19,10.5,-12],[2,8,0],[8,0,0]]
bB=[[-19,10.5,-12],[-14,4.5,-12.5],[12,0,0],[2,-2,0]]
cB=[[-14,4.5,-12.5],[9,4,-12.5],[1,-1,0],[0,0,0]]
dB=[[9,4,-12.5],[16,10,-12.5],[10,0,0],[20,0,0]]
eB=[[16,10,-12.5],[21,4.5,-12],[10,0,0],[3,-3,0]]
fB=[[25,5,-8],[21,4.5,-12],[0,0,0],[-3,2,0]]
gB=[[22.5,12,-8],[25,5,-8],[2,0,0],[0,-8,0]]
hB=[[22.5,12,-8],[4.5,13,-12],[0,0,-11],[-5,0,0]]
iB=[[3.5,5.5,-12.5],[4.5,13,-12],[3,0,0],[0,20,0]]
lB=[[-12,5.5,-12.5],[3.5,5.5,-12.5],[0,0,0],[0,0,0]]
mB=[[-13,13,-11.5],[-12,5.5,-12.5],[0,0,0],[8,2,0]]
nB=[[-24.5,6,-11.5],[-25,5,-10],[-1,-1,0],[0,0,1]]
oB=[[-25,5,-10],[-23,13,-8],[0,6,0],[0,0,6]]
pB=[[-13,13,-11.5],[-23,13,-8],[0,0,0],[-2,0,4]]
col1B=[[-19,10.5,-12],[-23,13,-8],[0,0,0],[-3,0,6]]
col2B=[[-13,13,-11.5],[-19,10.5,-12],[0,0,-2],[0,0,0]]
col3B=[[16,10,-12.5],[4.5,13,-12],[0,0,0],[0,0,2]]
col4B=[[22.5,12,-8],[16,10,-12.5],[0,0,-4],[0,0,0]]
qB=[[22.5,12,-8],[19.5,15,-8],[0,0,0],[0,0,0]]
rB=[[19.5,15,-8],[17.5,15,-10],[0,0,-2],[-2,0,0]]
sB=[[17.5,15,-10],[4.5,15.5,-11],[-4,0,-1],[0,0,0]]
curvaUnitaB=curves_union([curveFunction(rB),curveFunction(sB)])([[0,1],[0,1]])
tB=[[4.5,13,-12],[4.5,15.5,-11],[0,0,0],[0,0,0]]
uB=[[17.5,15,-10],[4,23,-9],[-2,20,2],[0,0,0]]
vB=[[4,23,-9],[4.5,15.5,-11],[0,0,0],[0,0,0]]
zB=[[4,23,-9],[-8,22,-9],[-15,2,0],[-1,-1,0]]
curvaUnita2B=curves_union([curveFunction(uB),curveFunction(zB)])([[0,1],[0,1]])
xB=[[-8,22,-9],[-12.5,15.5,-10],[-2,-1,0],[0,0,0]]
yB=[[-12.5,15.5,-10],[-13,13,-11.5],[0,0,0],[0,0,0]]
kB=[[-12.5,15.5,-10],[-23,13,-8],[-13,0,5],[-2,-4,0]]

//curve of side B
curva1B=curveHermite(aB);
curva2B=curveHermite(bB);
curva3B=curveHermite(cB);
curva4B=curveHermite(dB);
curva5B=curveHermite(eB);
curva6B=curveHermite(fB);
curva7B=curveHermite(gB);
curva8B=curveHermite(hB);
curva9B=curveHermite(iB);
curva10B=curveHermite(lB);
curva11B=curveHermite(mB);
curva12B=curveHermite(nB);
curva13B=curveHermite(oB);
curva14B=curveHermite(pB);
curva15B=curveHermite(qB);
curva16B=curveHermite(rB);
curva17B=curveHermite(sB);
curva18B=curveHermite(tB);
curva19B=curveHermite(uB);
curva20B=curveHermite(vB);
curva21B=curveHermite(zB);
curva22B=curveHermite(xB);
curva23B=curveHermite(yB);
curva24B=curveHermite(kB);

//surfaces of side B
var surfaceSHB=supHermiteFun(curvaUnitaB,curveFunction(hB),[0,0,0],[0,0,0])
var coonsPatch1B = coonsPatch(aB,oB,nB,col1B);
var surfaceBMB=supHermite(bB,mB,[0,0,0],[0,0,2])
var surfaceLCB=supHermite(lB,cB,[0,0,-2],[0,0,0])
var surfaceIDB=supHermite(iB,dB,[0,0,-2],[0,0,0])
var surfacePCol1Col2B = triangolarCoonsPatch(pB,col1B,col2B);
var surfaceHCol3Col4B = triangolarCoonsPatch(hB,col3B,col4B);
var coonsPatch2B = coonsPatch(gB,eB,col4B,fB);
var cofanoLateraleB=triangolarCoonsPatch(kB,pB,yB);

//curve struct
structCurveB=STRUCT([curva1B,curva2B,curva3B,curva4B,curva5B,curva6B,curva7B,curva9B,curva10B,curva11B,curva12B,curva13B,curva14B,
                      curva15B,curva16B,curva17B,curva18B,curva19B,curva20B,curva21B,curva22B,curva23B,curva24B])

//surface struct
structSurfaceB=STRUCT([coonsPatch1B,surfaceBMB,surfacePCol1Col2B,surfaceLCB,surfaceIDB,surfaceHCol3Col4B,coonsPatch2B,surfaceSHB,
                        cofanoLateraleB])
// side B
sideB=rgb(106,18,30)(STRUCT([structSurfaceB]))

//===============================================================================
//================================== RETRO ======================================
//===============================================================================

//retro
aR=[[19.5,15,8],[19.5,15,-8],[4,4,-4],[-4,-4,-4]]
bR=[[22.5,12,8],[22.5,12,-8],[4,4,-4],[-4,-4,-4]]
cR=[[25,5,8],[25,5,-8],[5,0,-6],[-5,0,-6]]
//cofano
dR=[[-25,5,-10],[-25,5,10],[-6,-2,6],[6,2,6]]
eR=[[-23,13,-8],[-23,13,8],[-4,0,2],[4,0,2]]
fR=[[21,4.5,12],[21,4.5,-12],[0,0,0],[0,0,0]]
xR=[[-12.5,15.5,10],[-12.5,15.5,-10],[-3,3,-3],[3,-3,-3]]

curva1R=curveHermite(aR);
curva2R=curveHermite(bR);
curva3R=curveHermite(cR);
curva4R=curveHermite(dR);
curva5R=curveHermite(eR);
curva6R=curveHermite(fR);


var coonsPatch3Retro = coonsPatch(bR,cR,gA,gB);
var coonsPatch4Retro = coonsPatch(dR,eR,oB,oA);
var surfaceCC=supHermite(cA,cB,[0,0,0],[0,0,0])
var surfaceABR=supHermite(aR,bR,[0,0,0],[0,0,0])
var surfaceRetro = coonsPatch(fA,fB,cR,fR);

retroCurve=STRUCT([curva1R,curva3R,curva4R,curva5R])
retroSurface=STRUCT([coonsPatch3Retro,coonsPatch4Retro,surfaceABR])

retro=rgb(106,18,30)(STRUCT([retroSurface]))

//===============================================================================
//================================== ROOF ======================================
//===============================================================================

//points of roof
aTB=[[19.5,15,-8],[13,21.5,-8],[-1,5,0],[-7,3,0]];
aTA=[[19.5,15,8],[13,21.5,8],[-1,5,0],[-7,3,0]];
bTB=[[13,21.5,-8],[-7,23,-8],[-10,7,0],[-10,-6,0]];
bTA=[[13,21.5,8],[-7,23,8],[-10,7,0],[-10,-6,0]];
bT=[[13,21.5,-8],[13,21.5,8],[0,2,0],[0,-2,0]]
cT=[[-7,23,-8],[-7,23,8],[0,2,0],[0,-2,0]]
dT=[[-8,22,-9],[-8,22,9],[0,2,0],[0,-2,0]]

//central axis roof
eT=[[4,23.5,-8],[4,23.5,8],[0,2,0],[0,-2,0]]

//roof holes
//   B
gt1=[[-8,22,-9],[-7,23,-8],[2,0,0],[0,0,2]]
gt2=[[-8,22,-9],[-7,23,-8],[0,1,0],[1,0,0]]
//   A
ht1=[[-8,22,9],[-7,23,8],[2,0,0],[0,0,-2]]
ht2=[[-8,22,9],[-7,23,8],[0,1,0],[1,0,0]]

// roof surfaces
var surfaceTbuco1=supHermite(gt1,gt2,[0,0,0],[0,0,0])
var surfaceTbuco2=supHermite(ht1,ht2,[0,0,0],[0,0,0])
var curvaUnitaABTB=curves_union([curveFunction(aTB),curveFunction(bTB)])([[0,1],[0,1]])
var curvaUnitaABTA=curves_union([curveFunction(aTA),curveFunction(bTA)])([[0,1],[0,1]])

// roof curves
curva1T=curveHermite(aTA);
curva2T=curveHermite(aTB);
curva3T=curveHermite(bT);
curva4T=curveHermite(bTA);
curva5T=curveHermite(bTB);
curva6T=curveHermite(cT);
curva7T=curveHermite(dT);
curva8T=curveHermite(eT);

//lateral axis roof
var surfaceT1=supHermiteFun(curvaUnitaABTA,curvaUnita2A,[0,0,2],[-2,0,0])
var surfaceT2=supHermiteFun(curvaUnitaABTB,curvaUnita2B,[0,0,-2],[-2,0,0])

//behind axis roof
surfaceT3=supHermite(cT,dT,[-1,0,0],[0,-1,0])
surfaceTX=supHermite(bTB,bTA,[0,2,0],[0,-2,0])

//roof curves
curveTetto=STRUCT([curva1T,curva2T,curva3T,curva4T,curva5T,curva6T,curva7T,curva8T])

//roof surfaces
surfaceTetto=STRUCT([surfaceT1,surfaceT2,surfaceTbuco1,surfaceTbuco2,surfaceTX,surfaceT3])

//roof
roof=rgb(106,18,30)(STRUCT([surfaceTetto]))

//===============================================================================
//================================== FRONT =====================================
//===============================================================================

//points of front side
xR=[[-12.5,15.5,10],[-12.5,15.5,-10],[-6,1,-3],[6,-1,-3]]

//surfaces of front side
var coonsPatchCofano = coonsPatch(xR,eR,kB,kA);
fronteSurface=STRUCT([coonsPatchCofano])

//curve of front
curva1F=curveHermite(xR);
fronteCurve=STRUCT([curva1F])

fronte=rgb(106,18,30)(STRUCT([fronteSurface]))


//===============================================================================
//================================== WHEELS =====================================
//=============================================================================== 

p1W=[[3.5,0,0],[4.5,0,0],[0,0,0],[0,0,0]]
p2W=[[3.5,0,2.5],[4.5,0,2.5],[0,0,0],[0,0,0]]
p3W=[[4.5,0,0],[4.5,0,2.5],[2,0,0],[-2,0,0]]

p4W=[[3.5,0,0],[3,0,0.5],[0,0,0],[0,0,0]]
p5W=[[3,0,0.5],[2.5,0,1],[0,0,1],[-1,0,0]]
p6W=[[2.5,0,1],[0,0,0],[0,0,-3],[-5,0,0]]

var tireProfile=curves_union([curveFunction(p4W),curveFunction(p5W),curveFunction(p6W)])([[0,1],[0,1],[0,1]])

var wheel1=rgb(0,0,0)(rotationalSurface(curveFunction(p1W)))
var wheel2=rgb(0,0,0)(rotationalSurface(curveFunction(p2W)))
var wheel3=rgb(0,0,0)(rotationalSurface(curveFunction(p3W)))
var tire=rgb(105,105,105)(rotationalSurface(tireProfile))

pneumatic1=T([0,1,2])([-19.5,5.3,-12])(S([0,1,2])([0.9,0.9,0.9])(STRUCT([wheel1,wheel2,wheel3,tire])))
pneumatic2=T([0])([35])(pneumatic1)

pneumaticsDx=STRUCT([pneumatic1,pneumatic2])
pneumaticsSx=T([1])([10.3])(R([1,2])([PI])(pneumaticsDx))

pneumatics=STRUCT([pneumaticsDx,pneumaticsSx])

//===============================================================================
//================================== INTERNS ====================================
//=============================================================================== 

aI=[[-14,4.5,12.5],[-14,4.5,-12.5],[0,0,0],[0,0,0]]
bI=[[-13,13,11.5],[-13,13,-11.5],[0,0,0],[0,0,0]]
cI=[[-12.5,15.5,10],[-12.5,15.5,-10],[-4,1.5,-15],[4,-1.5,-15]]

//over pneumatics front
gIA=[[-19,10.5,8],[-14,4.5,8],[12,0,0],[2,-2,0]]
gIB=[[-19,10.5,-8],[-14,4.5,-8],[12,0,0],[2,-2,0]]
aaIA=[[-25,5,10],[-19,10.5,8],[2,8,0],[8,0,0]]
aaIB=[[-25,5,-10],[-19,10.5,-8],[2,8,0],[8,0,0]]

//over pneumatics behind
fIA1=[[9,4,8],[16,10,8],[10,0,0],[20,0,0]]
fIA1b=[[9,5,8],[16,5,8],[0,0,0],[0,0,0]]
fIA2=[[16,10,8],[21,4.5,8],[10,0,0],[3,-3,0]]
fIB1=[[9,4,-8],[16,10,-8],[10,0,0],[20,0,0]]
fIB1b=[[9,5,-8],[16,5,-8],[0,0,0],[0,0,0]]
fIB2=[[16,10,-8],[21,4.5,-8],[10,0,0],[3,-3,0]]

//side pneumatics
hIA=[[-19,4.5,8],[-14,4.5,8],[0,0,0],[0,0,0]]
hIB=[[-19,4.5,-8],[-14,4.5,-8],[0,0,0],[0,0,0]]

//pedals zone
hI=[[-19,4.5,8],[-19,4.5,-8],[0,0,0],[0,0,0]]
k1I=[[-19,10.5,8],[-19,10.5,-8],[0,0,0],[0,0,0]]
k2I=[[-19,10.5,11],[-19,10.5,-11],[0,0,0],[0,0,0]]

//central tunnel
sI1sotto=[[-19,4.5,1.5],[5,4.5,1.5],[0,0,0],[0,0,0]]
sI2sotto=[[-19,4.5,-1.5],[5,4.5,-1.5],[0,0,0],[0,0,0]]
sI1sopra=[[-19,9,1.5],[7,7,1.5],[0,-10,0],[0,0,0]]
sI2sopra=[[-19,9,-1.5],[7,7,-1.5],[0,-10,0],[0,0,0]]
var surfaceSepSopra=supHermite(sI1sopra,sI2sopra,[0,1,0],[0,-1,0])
var surfaceSepSotto=supHermite(sI1sotto,sI2sotto,[0,0,0],[0,0,0])
var surfaceSepA=supHermite(sI1sotto,sI1sopra,[0,0,0],[0,0,0])
var surfaceSepB=supHermite(sI2sotto,sI2sopra,[0,0,0],[0,0,0])

//lean seat behind
pI1=[[5,4.5,8],[5,4.5,-8],[0,0,0],[0,0,0]]
pI2=[[6.5,7.5,8],[6.5,7.5,-8],[0,0,0],[0,0,0]]
pI3=[[22,4.5,8],[22,4.5,-8],[0,0,0],[0,0,0]]
pI4=[[22,7.5,8],[22,7.5,-8],[0,0,0],[0,0,0]]
pI5=[[6.5,7.5,8],[22,7.5,8],[0,0,0],[0,0,0]]
pI6=[[5,4.5,8],[22,4.5,8],[0,0,0],[0,0,0]]
pI7=[[6.5,7.5,-8],[22,7.5,-8],[0,0,0],[0,0,0]]
pI8=[[5,4.5,-8],[22,4.5,-8],[0,0,0],[0,0,0]]

// lean seat surfaces
var surfacePog1=supHermite(pI1,pI2,[0,0,0],[0,0,0])
var surfacePog2=supHermite(pI3,pI4,[0,0,0],[0,0,0])
var surfacePog3=supHermite(pI1,pI3,[0,0,0],[0,0,0])
var surfacePog4=supHermite(pI2,pI4,[0,0,0],[0,0,0])
var surfacePog5=supHermite(pI5,pI6,[0,0,0],[0,0,0])
var surfacePog6=supHermite(pI7,pI8,[0,0,0],[0,0,0])

// under front
lI=[[-25.3,5,8],[-25.3,5,-8],[-4,-1,4],[4,1,4]]

var surfaceI2=supHermite(bI,cI,[2,0,0],[-2,0,0])
var surfaceI3=supHermite(hIA,hIB,[0,0,0],[0,0,0])
var surfaceI4=supHermite(hI,k1I,[-5,0,0],[0,0,0])
var surfaceI5=supHermite(k2I,bI,[-2,2,0],[2,0,0])
var surfaceIA1=supHermite(gIA,bA,[0,0,0],[0,0,0])
var surfaceIB1=supHermite(gIB,bB,[0,0,0],[0,0,0])
var surfaceIA2=supHermite(gIA,hIA,[0,0,0],[5,0,0])
var surfaceIB2=supHermite(gIB,hIB,[0,0,0],[5,0,0])
var surfaceIL2=supHermite(hI,lI,[0,0,0],[0,0,0])

//over pneumatics front
var surfaceAA1d=supHermite(aaIA,aA,[0,0,0],[0,0,0])
var surfaceAB1d=supHermite(aaIB,aB,[0,0,0],[0,0,0])

//over pneumatics retro
var surfaceAA1r=supHermite(fIA1,dA,[0,0,0],[0,0,0])
var surfaceAA2r=supHermite(fIA2,eA,[0,0,0],[0,0,0])
var surfaceAB1r=supHermite(fIB1,dB,[0,0,0],[0,0,0])
var surfaceAB2r=supHermite(fIB2,eB,[0,0,0],[0,0,0])

var surfaceA1sed=supHermite(fIA1b,fIA1,[0,0,0],[0,0,0])
var surfaceB1sed=supHermite(fIB1b,fIB1,[0,0,0],[0,0,0])

//================================== SEATS ====================================

//FRONT SEATS
//under seat front
sed1=[[-6,4.5,11],[0,4.5,11],[0,0,0],[0,0,0]]
sed2=[[0,4.5,11],[0.5,6,11],[2,2,0],[0,0,0]]
sed3a=[[0.5,6,11],[-7.5,6.5,11],[0,0,0],[0,0,0]]
sed3b=[[0.5,6,2],[-7.5,6.5,2],[0,0,0],[0,0,0]]
sed4=[[-6,4.5,11],[-7.5,6.5,11],[0,0,0],[0,0,0]]

var surfaceSed1=supHermite(sed3a,sed3b,[0,0,0],[0,0,0])
var coonsPatchSed1=coonsPatch(sed1,sed3a,sed2,sed4);
var coonsPatchSed2=T([2])([-9])(coonsPatchSed1)

//seat
sed5=[[-7,9,11],[-7.5,6.5,11],[-2,-2,0],[1,-2,0]]
sed6=[[-7,9,11],[0.5,6,11],[3,1,0],[0,-5,0]]
sed7=[[-7,9,2],[-7.5,6.5,2],[-2,-2,0],[1,-2,0]]
sed8=[[-7,9,2],[0.5,6,2],[3,1,0],[0,-5,0]]

surfaceSed2=triangolarCoonsPatch(sed5,sed3a,sed6)
surfaceSed3=T([2])([-9])(surfaceSed2)
surfaceSed4=supHermite(sed5,sed7,[0,0,0],[0,0,0])
surfaceSed5=supHermite(sed6,sed8,[0,0,0],[0,0,0])

//backrest
sed9=[[0.5,6,11],[4,15,11],[3,0,0],[0,0,0]]
sed10=[[0.5,6,11],[4,15,11],[-5,0,0],[3,-3,0]]
sed11=[[0.5,6,2],[4,15,2],[3,0,0],[0,0,0]]
sed12=[[0.5,6,2],[4,15,2],[-5,0,0],[3,-3,0]]

surfaceSed6=supHermite(sed9,sed10,[0,0,0],[0,0,0])
surfaceSed7=T([2])([-9])(surfaceSed6)
surfaceSed8=supHermite(sed9,sed11,[0,0,0],[0,0,0])
surfaceSed9=supHermite(sed10,sed12,[0,0,0],[0,0,0])


internsSup=rgb(189,183,107)(STRUCT([surfaceIA1,surfaceIB1,surfaceI2,surfaceIA2,surfaceIB2,surfaceI3,surfaceI5,surfaceI4,surfaceIL2,
                                  surfaceAA1d,surfaceAB1d,surfaceAA1r,surfaceAA2r,surfaceAB1r,surfaceAB2r,surfaceSepSopra,
                                  surfaceSepSotto,surfaceSepA,surfaceSepB,surfacePog1,surfacePog2,surfacePog3,surfacePog4,
                                  surfacePog5,surfacePog6,surfaceA1sed,surfaceB1sed]))

sottoSedileA=rgb(189,183,107)(STRUCT([coonsPatchSed1,surfaceSed1,coonsPatchSed2]))
sottoSedileB=T([2])([-13])(sottoSedileA)
sedileCuscinoA=rgb(139,69,19)(STRUCT([surfaceSed2,surfaceSed3,surfaceSed4,surfaceSed5,surfaceSed6,surfaceSed7,surfaceSed8,surfaceSed9]))
sedileCuscinoB=T([2])([-13])(sedileCuscinoA)

// BACK SEATS
sedileDietro=rgb(139,69,19)(T([0,1,2])([14,1.5,-14])(S([0,1,2])([1,0.9,2.15])(sedileCuscinoA)))

sedili=STRUCT([sottoSedileA,sottoSedileB,sedileCuscinoA,sedileCuscinoB,sedileDietro])





//===============================================================================
//================================== WINDOWS =================================
//=============================================================================== 

/////////////// WINDOWS DIETRO /////////////////
//SIDE A
aWA=[[14,16,10.3],[7,16.5,10.8],[0,0,0],[0,0,0]]
bWA=[[7,16.5,10.8],[6,17.5,10.6],[-2,0,0],[0,2,0]]
cWA=[[6.5,21.5,9.3],[6,17.5,10.6],[-5,0,0],[0,-5,0]]
cWAbis=[[6,17.5,10.6],[6.5,21.5,9.3],[0,5,0],[5,0,0]]
dWA=[[14,16,10.3],[6.5,21.5,9.3],[8,3,0],[-15,-1,0]]
//punto appoggio
appA1=[[4.5,15.5,11],[4.5,15.5,11],[0,0,0],[0,0,0]]
appA2=curves_union([curveFunction(bWA),curveFunction(cWAbis)])([[0,1],[0,1]])
//contours
finCurve1A=curveHermite(aWA)
finCurve2A=curveHermite(bWA)
finCurve3A=curveHermite(cWA)
finCurve4A=curveHermite(dWA)
curveFinDietroA=STRUCT([finCurve1A,finCurve2A,finCurve3A,finCurve4A])
//superfici
supFin1A=supHermite(aWA,sA,[0,0,0],[0,0,0])
supFin2A=supHermite(bWA,appA1,[0,0,0],[0,0,0])
supFin3A=supHermite(cWA,vA,[0,0,0],[0,0,0])
supFin4A=supHermite(dWA,uA,[0,0,0],[0,0,0])
//superfice vetro
vetroFinDietroA=triangolarCoonsPatchv2(appA2,dWA,aWA)

finestrinoSupA=STRUCT([supFin1A,supFin2A,supFin3A,supFin4A])

//SIDE B
aWB=[[14,16,-10.3],[7,16.5,-10.8],[0,0,0],[0,0,0]]
bWB=[[7,16.5,-10.8],[6,17.5,-10.6],[-2,0,0],[0,2,0]]
cWB=[[6.5,21.5,-9.3],[6,17.5,-10.6],[-5,0,0],[0,-5,0]]
cWBbis=[[6,17.5,-10.6],[6.5,21.5,-9.3],[0,5,0],[5,0,0]]
dWB=[[14,16,-10.3],[6.5,21.5,-9.3],[8,3,0],[-15,-1,0]]
//punto appoggio
appB1=[[4.5,15.5,-11],[4.5,15.5,-11],[0,0,0],[0,0,0]]
appB2=curves_union([curveFunction(bWB),curveFunction(cWBbis)])([[0,1],[0,1]])
//contours
finCurve1B=curveHermite(aWB)
finCurve2B=curveHermite(bWB)
finCurve3B=curveHermite(cWB)
finCurve4B=curveHermite(dWB)
curveFinDietroB=STRUCT([finCurve1B,finCurve2B,finCurve3B,finCurve4B])
//superfici
supFin1B=supHermite(aWB,sB,[0,0,0],[0,0,0])
supFin2B=supHermite(bWB,appB1,[0,0,0],[0,0,0])
supFin3B=supHermite(cWB,vB,[0,0,0],[0,0,0])
supFin4B=supHermite(dWB,uB,[0,0,0],[0,0,0])
//supeficie vetro
vetroFinDietroB=triangolarCoonsPatchv2(appB2,dWB,aWB)
finestrinoSupB=STRUCT([supFin1B,supFin2B,supFin3B,supFin4B])

//windows dietro
windowsDietro=STRUCT([finestrinoSupB,finestrinoSupA])

/////////////// WINDOWS FRONT /////////////////

//SIDE A
aFDA=[[2,16,10.8],[-8,16,10.3],[0,0,0],[0,0,0]]
bFDA=[[-8,16,10.3],[-7,21,9.7],[-10,0,0],[3,3,0]]
bFDAbis=[[-7,21,9.7],[-8,16,10.3],[-3,-3,0],[10,0,0]]
cFDA=[[2,22,9.3],[-7,21,9.7],[-5,1,0],[-3,-3,0]]
dFDA=[[2,16,10.8],[2,22,9.3],[3,0,0],[-3,0,0]]
dFDAbis=[[2,22,9.3],[2,16,10.8],[3,0,0],[-3,0,0]]
sp2Abis=[[4.5,15.5,11],[-12.5,15.5,10],[0,0,0],[0,0,0]]

aFDACurve=curveHermite(aFDA)
bFDACurve=curveHermite(bFDA)
cFDACurve=curveHermite(cFDA)
dFDACurve=curveHermite(dFDA)
finFDAcurve=STRUCT([aFDACurve,bFDACurve,cFDACurve,dFDACurve])

supFinFDA1=supHermite(aFDA,sp2Abis,[0,0,0],[0,0,0])
supFinFDA2=supHermite(bFDAbis,xA,[0,0,0],[0,0,0])
supFinFDA3=supHermite(cFDA,zA,[0,0,0],[0,0,0])
supFinFDA4=supHermite(dFDAbis,vA,[0,0,0],[0,0,0])

vetroFDA=coonsPatch(aFDA,cFDA,dFDA,bFDA)
finFDAsup=STRUCT([supFinFDA1,supFinFDA2,supFinFDA3,supFinFDA4])

//SIDE B
aFDB=[[2,16,-10.8],[-8,16,-10.3],[0,0,0],[0,0,0]]
bFDB=[[-8,16,-10.3],[-7,21,-9.7],[-10,0,0],[3,3,0]]
bFDBbis=[[-7,21,-9.7],[-8,16,-10.3],[-3,-3,0],[10,0,0]]
cFDB=[[2,22,-9.3],[-7,21,-9.7],[-5,1,0],[-3,-3,0]]
dFDB=[[2,16,-10.8],[2,22,-9.3],[3,0,0],[-3,0,0]]
dFDBbis=[[2,22,-9.3],[2,16,-10.8],[3,0,0],[-3,0,0]]
sp2Bbis=[[4.5,15.5,-11],[-12.5,15.5,-10],[0,0,0],[0,0,0]]

aFDBCurve=curveHermite(aFDB)
bFDBCurve=curveHermite(bFDB)
cFDBCurve=curveHermite(cFDB)
dFDBCurve=curveHermite(dFDB)
finFDBcurve=STRUCT([aFDBCurve,bFDBCurve,cFDBCurve,dFDBCurve])

supFinFDB1=supHermite(aFDB,sp2Bbis,[0,0,0],[0,0,0])
supFinFDB2=supHermite(bFDBbis,xB,[0,0,0],[0,0,0])
supFinFDB3=supHermite(cFDB,zB,[0,0,0],[0,0,0])
supFinFDB4=supHermite(dFDBbis,vB,[0,0,0],[0,0,0])

vetroFDB=coonsPatch(aFDB,cFDB,dFDB,bFDB)
finFDBsup=STRUCT([supFinFDB1,supFinFDB2,supFinFDB3,supFinFDB4])

/////////////// LUNOTTO /////////////////
aL1=[[18,18,6],[14,21,5],[0,0,2],[0,0,-2]]
aL2=[[18,18,-6],[14,21,-5],[0,0,-2],[0,0,2]]
aL3=[[18,18,6],[18,18,-6],[0,0,0],[0,0,0]]
aL4=[[14,21,-5],[14,21,5],[0,0,0],[0,0,0]]
aL4bis=[[14,21,5],[14,21,-5],[0,0,0],[0,0,0]]
//contours
alCurve1=curveHermite(aL1)
alCurve2=curveHermite(aL2)
alCurve3=curveHermite(aL3)
alCurve4=curveHermite(aL4)
finCurveLunotto=STRUCT([alCurve1,alCurve2,alCurve3,alCurve4])
//superfice lunotto
alSup1=supHermite(aL1,aTA,[0,0,0],[0,0,0])
alSup2=supHermite(aL2,aTB,[0,0,0],[0,0,0])
alSup3=supHermite(aL3,aR,[0,0,0],[0,0,0])
alSup4=supHermite(aL4,bT,[0,0,0],[0,0,0])
//superfice vetro
vetroLunotto=coonsPatch(aL1,aL2,aL3,aL4bis)

lunotto=STRUCT([alSup1,alSup2,alSup3,alSup4])

/////////////// PARABREZZA /////////////////

pa1=[[-12,17,8.5],[-12,17,-8.5],[-3,-3,0],[3,3,0]]
pa2=[[-8.5,21.5,8],[-8.5,21.5,-8],[-1,1,0],[1,-1,0]]
pa2bis=[[-8.5,21.5,-8],[-8.5,21.5,8],[-1,1,0],[1,-1,0]]
pa3=[[-8.5,21.5,8],[-12,17,8.5],[-2,-2,1],[0,-2,-1]]
pa4=[[-8.5,21.5,-8],[-12,17,-8.5],[-2,-2,-1],[0,-2,1]]

//contours
paCurve1=curveHermite(pa1)
paCurve2=curveHermite(pa2)
paCurve3=curveHermite(pa3)
paCurve4=curveHermite(pa4)
parabrezzaCurve=STRUCT([paCurve1,paCurve2,paCurve3,paCurve4])

//superfice
paSup1=supHermite(pa1,xR,[0,0,0],[0,0,0])
paSup2=supHermite(pa2bis,dT,[0,0,0],[0,0,0])
paSup3=supHermite(pa3,xA,[0,0,0],[0,0,0])
paSup4=supHermite(pa4,xB,[0,0,0],[0,0,0])
parabrezzaSup=STRUCT([paSup1,paSup2,paSup3,paSup4])
//superfice vetro
vetroDavanti=coonsPatch(pa2,pa1,pa3,pa4)

parabrezza=STRUCT([parabrezzaSup])

/////////////// SPORTELLI /////////////////
//SIDE A
iAbis=[[4.5,13,12],[3.5,5.5,12.5],[0,-20,0],[-3,0,0]]
yAbis=[[-13,13,11.5],[-12.5,15.5,10],[0,0,0],[0,0,0]]
sp1A=[[-13,13,11.5],[4.5,13,12],[0,0,0],[0,0,0]]
sp2A=[[-12.5,15.5,10],[4.5,15.5,11],[0,0,0],[0,0,0]]

//superfice sportello
fiancata1A=coonsPatch(mA,iAbis,sp1A,lA)
fiancata2A=coonsPatch(yAbis,tA,sp1A,sp2A)
sportelloA=STRUCT([fiancata1A,fiancata2A])

//SIDE B
iBbis=[[4.5,13,-12],[3.5,5.5,-12.5],[0,-20,0],[-3,0,0]]
yBbis=[[-13,13,-11.5],[-12.5,15.5,-10],[0,0,0],[0,0,0]]
sp1B=[[-13,13,-11.5],[4.5,13,-12],[0,0,0],[0,0,0]]
sp2B=[[-12.5,15.5,-10],[4.5,15.5,-11],[0,0,0],[0,0,0]]

//superfice sportello
fiancata1B=coonsPatch(mB,iBbis,sp1B,lB)
fiancata2B=coonsPatch(yBbis,tB,sp1B,sp2B)
sportelloB=STRUCT([fiancata1B,fiancata2B])

//===============================================================================
//================================== PARTICOLARI ================================
//=============================================================================== 

//fari
function faro(s){
  faro1=[[3,0,0],[3,0,1.2],[0,0,0],[0,0,0]]
  faro2=[[3,0,1.2],[2.5,0,1.2],[0,0,0],[0,0,0]]
  faro3=[[2.5,0,1.2],[2.5,0,0],[0,0,0],[0,0,0]]
  faro4=[[2.5,0,0.5],[0,0,1.3],[0,0,4],[0,0,0]]
  profiloContornoFaro=curves_union([curveFunction(faro1),curveFunction(faro2),curveFunction(faro3)])([[0,1],[0,1],[0,1]])
  contornoFaro=rgb(220,220,220)(rotationalSurface(profiloContornoFaro))
  luce=rgba(255,255,0,0.7)(rotationalSurface(curveFunction(faro4)))
  return R([0,1])([-PI/12])(R([0,2])(-PI/2)(S([0,1,2])([s,s,s])(STRUCT([contornoFaro,luce]))))
}

faroA=T([0,1,2])([-24,11,6.7])(faro(0.5))
faroA2=T([0,1,2])([-25,8.7,7.8])(faro(0.3))
faroB=T([0,1,2])([-24,11,-6.7])(faro(0.5))
faroB2=T([0,1,2])([-25,8.7,-7.8])(faro(0.3))
fari=STRUCT([faroA,faroB,faroA2,faroB2])

//maniglie
function maniglia(){
  mm1=[[1,0,0],[3,0,0],[0,0,2],[0,0,-2]]
  mm2=[[1,0.5,0],[3,0.5,0],[0,0,2],[0,0,-2]]
  mm3=[[2.7,0,0],[3.5,0,0],[0,-1,0],[0,1,0]]
  mm4=[[2.7,0.5,0],[3.5,0.5,0],[0,1,0],[0,-1,0]]
  supmm1=supHermite(mm1,mm2,[0,0,1],[0,0,-1])
  supmm2=supHermite(mm3,mm4,[0,0,1.5],[0,0,-0.5])
  return STRUCT([supmm1,supmm2])
}
manigliaA=T([0,1,2])([0,14,11.4])(maniglia())
manigliaB=T([0,1,2])([0,14.3,-11.4])(R([1,2])([PI])(maniglia()))
maniglie=STRUCT([manigliaA,manigliaB])

//paratarga
function paraTarga(){
  mm1=[[5,0,0],[1,0,0],[0,4,-2],[0,-4,2]]
  mm2=[[3,0,1],[1,0,0],[-2,0,0],[0,0,-2]]
  mm3=[[3,0,1],[5,0,0],[2,0,0],[0,0,-2]]
  supmm1=triangolarCoonsPatch(mm2,mm1,mm3)
  return R([0,2])([PI/2])(T([0])([-3])(STRUCT([supmm1])))
}
paratargaRetro=T([0,1])([24.5,11])(paraTarga())

//paraurti
function paraurti(side){
  if (side==="dietro"){  
    pp1=[[22,5,11],[22,5,-11],[20,0,-5],[-15,0,5]]
    pp2=[[22,7,11],[22,7,-11],[20,0,-5],[-15,0,5]]
    paraUrti=supHermite(pp1,pp2,[2,0,0],[-2,0,0])
  }
  else{
    pp1=[[-25,6.5,11],[-25,6.5,-11],[-5,-3,0],[5,3,0]]
    pp2=[[-25,8,11],[-25,8,-11],[-4,-1,0],[4,1,0]]
    paraUrti=supHermite(pp1,pp2,[-2,0,0],[2,0,0])
  }
  return paraUrti;
}
paraurtiFront=paraurti("davanti");
paraurtiRetro=paraurti("dietro");
paraurtiS=STRUCT([paraurtiFront,paraurtiRetro])

//steering wheel
function steeringWheel(){
    internalDisk=T([2])([1.5])(cylinder(1.1,3.5,12))
    overInternalDisk=DISK([0.9])(12)
    externalTorus=creaToro(5,0.5)
    logoDisk=annulus_sector(2*PI, 0.9, 1)

    p1=[[5,1,-0.3],[0.5,0.5,1.8],[0,-2,0],[-1,1,0]]
    p2=[[5,1,0.3],[0.8,0.5,2.4],[0,-2,0],[-1,1,0]]
    p3=[[5,-1,-0.3],[0.5,-0.5,1.8],[0,2,0],[-1,-1,0]]
    p4=[[5,-1,0.3],[0.8,-0.5,2.4],[0,2,0],[-1,-1,0]]

    p5=[[-5,1,-0.3],[-0.5,0.5,1.8],[0,-2,0],[1,1,0]]
    p6=[[-5,1,0.3],[-0.8,0.5,2.4],[0,-2,0],[1,1,0]]
    p7=[[-5,-1,-0.3],[-0.5,-0.5,1.8],[0,2,0],[1,-1,0]]
    p8=[[-5,-1,0.3],[-0.8,-0.5,2.4],[0,2,0],[1,-1,0]]

    sup1=supHermite(p1,p2,[0,0,0],[0,0,0])
    sup2=supHermite(p3,p4,[0,0,0],[0,0,0])
    sup3=supHermite(p1,p3,[0,0,0],[0,0,0])
    sup4=supHermite(p2,p4,[0,0,0],[0,0,0])

    sup5=supHermite(p5,p6,[0,0,0],[0,0,0])
    sup6=supHermite(p7,p8,[0,0,0],[0,0,0])
    sup7=supHermite(p5,p7,[0,0,0],[0,0,0])
    sup8=supHermite(p6,p8,[0,0,0],[0,0,0])

    model=rgb(210,180,140)(STRUCT([externalTorus,internalDisk,sup1,sup2,sup3,sup4,sup5,sup6,sup7,sup8]))
    logo=T([2])([1.49])(STRUCT([rgb(0,0,0)(overInternalDisk),rgb(192,192,192)(logoDisk)]))
   return R([0,1])([PI/10])(R([0,2])([-PI/2])(STRUCT([model,logo])))
}

steeringW=T([0,1,2])([-10.3,14.5,5])(S([0,1,2])([0.6,0.6,0.6])(steeringWheel()))

//assemblaggio
sportelli=STRUCT([sportelloA,sportelloB])
windows=rgb(106,18,30)(STRUCT([windowsDietro,lunotto,parabrezza,sportelli,finFDAsup,finFDBsup]))
vetri=rgba(200,200,200,0.5)(STRUCT([vetroFDA,vetroFDB,vetroLunotto,vetroFinDietroB,vetroFinDietroA,vetroDavanti]))
contours=rgb(220,220,220)(STRUCT([curva19A,curva21A,curva22A,curva19B,curva21B,curva22B,curveFinDietroA,curveFinDietroB,parabrezzaCurve,finCurveLunotto,finFDAcurve,finFDBcurve]))
sotto=rgb(189,183,107)(STRUCT([surfaceRetro,surfaceCC]))
externs=STRUCT([windows,vetri,contours])
interns=STRUCT([sedili,internsSup,steeringW])
particulars=STRUCT([fari,maniglie,paratargaRetro,paraurtiS])

//================================== MODEL =====================================
model=STRUCT([sideA,sideB,retro,fronte,sotto,pneumatics,roof,interns,externs,particulars])

//================================== MODEL =====================================

  return model
  })();

  exports.author = 'miccia4';
  exports.category = 'vehicles';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));