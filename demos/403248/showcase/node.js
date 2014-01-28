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

function dom(n){
    return SIMPLEX_GRID([INTERVALS(2*PI*n)(24*n), INTERVALS(0.5)(1)])
   }

function domainTorus(simpl1,simpl2){
  var domain = DOMAIN([[0,2*PI],[0,2*PI]])([simpl1,simpl2]);
  return domain;
}

function circle(r){
    function circle0(p){
        var a=p[0]
        return [r*SIN(a), r*COS(a)]
      }
    return circle0;
  }

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


function spiral(pitch ,n,r){
    function spiral0(p){
        var alpha = p[0]
        return [r*COS(alpha), r*SIN(alpha), alpha*pitch*n/(2*PI*n)]
      }
    return spiral0
  }

var torus = function (R, r) {
  return function (v) {
    var a = v[0];
    var b = v[1];

    var u = (r * COS(a) + R) * COS(b);
    var v = (r * COS(a) + R) * SIN(b);
    var w = (r * SIN(a));

    return [u,v,w];
  }
}
      
function supHermite(p1,p2,t1,t2){
    var domain = DOMAIN([[0,1],[0,1]])([36,36]);
    var curva1 = CUBIC_HERMITE(S0)(p1)
    var curva2 = CUBIC_HERMITE(S0)(p2)
    var funCur = CUBIC_HERMITE(S1)([curva1,curva2,t1,t2])
    return MAP(funCur)(domain)
  }

function curveHermite(p1,p2,t1,t2){
    var domain = DOMAIN([0,1])([36]);
    var curva = CUBIC_HERMITE(S0)([p1,p2,t1,t2])
    return MAP(curva)(domain)
  }

function rotationalSurface(funCurve){
  var domain = DOMAIN([[0,1],[0,2*PI]])([20,20]);
  var sup = MAP(ROTATIONAL_SURFACE(funCurve))(domain)
  return sup;
}
    

function cylinder(r,h,dom) {
    var cyl = EXTRUDE([h])(DISK([r])(dom))
    return cyl;
  };

function rgb(r,g,b){
  return COLOR([r/255, g/255, b/255]);
}
 
//===============================================================================
// WHEEL BACK
//===============================================================================   

rimIntern1=annulus_sector(2*PI, 0.3, 0.7)
rimBigIntern1=T([2])([-1])(EXTRUDE([4])(rimIntern1))


radiusBase1=R([1,2])([PI/2])(cylinder(0.08,3.5,36))
radiusPos1=T([2])([0.9])(radiusBase1)
radius11=T([0])([-0.7])(radiusPos1)
rays1=STRUCT([radius11,R([0,1])(PI/8),radius11,R([0,1])(PI/8),radius11,R([0,1])(PI/8),
              radius11,R([0,1])(PI/8),radius11,R([0,1])(PI/8),radius11,R([0,1])(PI/8),radius11,
              R([0,1])(PI/8),radius11,R([0,1])(PI/8),radius11,R([0,1])(PI/8),radius11,R([0,1])(PI/8),radius11,
              R([0,1])(PI/8),radius11,R([0,1])(PI/8),radius11,R([0,1])(PI/8),radius11,R([0,1])(PI/8),radius11,R([0,1])(PI/8),radius11])

rimExtern1=annulus_sector(2*PI, 3.6, 3.9)
rimBigExtern1=T([2])([0.4])(EXTRUDE([1])(rimExtern1))


tireBase=MAP(torus(4.8,1))(domainTorus(36,72))
tire1=rgb(0,0,0)(T([2])([0.9])(tireBase))
discChainBig1 = annulus_sector(2*PI, 0.7, 2)
discChainBig = rgb(128,128,128)(T([2])([2])(EXTRUDE([0.3])(discChainBig1)))

wheelBack=T([0,2])([21,-0.5])(STRUCT([rimBigIntern1,rays1,rimBigExtern1,tire1,discChainBig]))

//===============================================================================
// WHEEL FRONT
//===============================================================================

rimIntern=annulus_sector(2*PI, 0.3, 0.7)
rimBigIntern=EXTRUDE([1])(rimIntern)


radiusBase=R([0,2])(PI/2)(cylinder(0.08,4,36))
radius1=T([1,2])([0.7,0.5])(radiusBase)
rays=STRUCT([radius1,R([0,1])(PI/8),radius1,R([0,1])(PI/8),radius1,R([0,1])(PI/8),
              radius1,R([0,1])(PI/8),radius1,R([0,1])(PI/8),radius1,R([0,1])(PI/8),radius1,
              R([0,1])(PI/8),radius1,R([0,1])(PI/8),radius1,R([0,1])(PI/8),radius1,R([0,1])(PI/8),radius1,
              R([0,1])(PI/8),radius1,R([0,1])(PI/8),radius1,R([0,1])(PI/8),radius1,R([0,1])(PI/8),radius1,R([0,1])(PI/8),radius1])

rimExtern=annulus_sector(2*PI, 4, 4.3)
rimBigExtern=EXTRUDE([1])(rimExtern)

tire=rgb(0,0,0)(T([2])([0.5])(MAP(torus(4.8,0.7))(domainTorus(36, 72))))

discBrake = rgb(128,128,128)(T([2])([1])(annulus_sector(2*PI, 0.7, 1.3)))

wheelFront=STRUCT([rimBigIntern,rays,rimBigExtern,tire,discBrake]);

//===============================================================================
// FORKS
//===============================================================================

axisBase=annulus_sector(2*PI,0, 0.3)
axis=T([2])([-1.5])(EXTRUDE([4])(axisBase))
axisRed=rgb(220,20,60)(axis)

forkBase=annulus_sector(2*PI,0.3,0.7)
fork1=T([2])([1.2])(EXTRUDE([1.3])(forkBase))
fork2=T([2])([-1.5])(EXTRUDE([1.3])(forkBase))

absorberBase=R([0,2])([PI/2])(cylinder(0.5,5.5,36))
absorber1=R([0,1])([-7*PI/12])(T([0,2])([-5.5,-0.8])(absorberBase))
absorber2=R([0,1])([-7*PI/12])(T([0,2])([-5.5,1.8])(absorberBase))

shockAbsBase=R([0,2])([PI/2])(cylinder(0.4,6,36))
shockAbs1=rgb(0,0,0)(R([0,1])([-7*PI/12])(T([0,2])([-11,-0.8])(shockAbsBase)))
shockAbs2=rgb(0,0,0)(R([0,1])([-7*PI/12])(T([0,2])([-11,1.8])(shockAbsBase)))

forks=STRUCT([axisRed,fork1,fork2,absorber1,absorber2,shockAbs1,shockAbs2])

//===============================================================================
// FENDER
//===============================================================================

p1=[[0,0,0],[9,-2,0],[3,-10,0],[9,8,0]]
p2=[[0,0,2],[9,-2,2],[3,-10,0],[9,8,0]]
fender1 = T([0,1,2])([5,2,-0.5])(R([0,2])([PI])(R([1,2])([PI])(supHermite(p1,p2,[0,-2,0],[0,2,0]))))
fender=EXTRUDE([0.4])(rgb(220,20,60)(R([0,1])(-PI/12)(fender1)))

//===============================================================================
// LIGHT
//===============================================================================

braceletLightBase=annulus_sector(2*PI,0.4,0.5)
braceletLightBas1=R([1,2])([PI/2])(EXTRUDE([0.6])(braceletLightBase))
braceletLight1=T([0,1,2])([2.3,8.6,-0.8])(R([0,1])([-PI/12])(braceletLightBas1))
braceletLight2=T([2])([2.6])(braceletLight1)
pivotBase=R([0,2])([-PI/2])(CUBOID([2.1,0.3,0.65]))
  
pivot1=T([0,1,2])([2.7,8,-0.5])(R([0,1])([-PI/12])(pivotBase))

pivot=STRUCT([pivot1,braceletLight1,braceletLight2])
pivot2=T([0,1])([0.5,2])(pivot)

p1=[[-0.25,0,0],[3.25,0,0],[0,2,2.5],[0,-2,-2.5]]
p2=[[0,-1.5,0],[3,-1.5,0],[0,2,2],[0,-2,-2]]
p3=[[0,-2.2,0],[3,-2.2,0],[0,-2,1],[0,2,-1]]
f1=[[0,0,0],[2.5,0,0],[0,4,1],[0,-4,-1]]
f2=[[0,0,0],[2.5,0,0],[0,-4,-1],[0,4,1]]
//p2=[[0,0,0],[1.5,-2,0],[0,-2,0],[2,0,0]]
//p3=[[1.5,-2,0],[3,0,0],[2,0,0],[0,2,0]]

light1 = supHermite(p1,p2,[0,0,0],[0,0,0])
light2 = supHermite(p2,p3,[0,0,0],[0,0,0])
lamp = rgb(255,255,224) (R([0,2])([-PI/2])(supHermite(f1,f2,[0,0,1],[0,0,-1])))
//light2 = supHermite(p2,p3,[0,0,1],[0,0,-1])
//light3 = supHermite(p1,p3,[0,0,1],[0,0,-1])

lightFront=rgb(220,20,60)(STRUCT([light1,light2]))
lightFrontBase=R([0,2])([-PI/2])(lightFront)
lampFrontBase = T([0,1,2])([1.8,9,-0.8])(R([0,1])([-PI/12])(lamp))
lightFrontTotal=T([0,1,2])([2.5,10.5,-1])(R([0,1])([-PI/12])(lightFrontBase))

lightTotal=STRUCT([lampFrontBase,lightFrontTotal])


//===============================================================================
// BODY
//===============================================================================
 
s1=[[0,4,0.2],[8,0,-1],[5,0,0],[0,0,0]]
s2=[[0,4,1.8],[8,0,3],[5,0,0],[0,0,0]]
 
s3=[[8,0,-1],[14,0,-0.5],[5,-5,0],[5,2,0]]
s4=[[8,0,3],[14,0,2.5],[5,-5,0],[5,2,0]]
 
s5=[[14,0,-0.5],[21,4,0.5],[0,0,0],[0,0,0]]
s6=[[14,0,2.5],[21,4,1.5],[0,0,0],[0,0,0]]
 
s7=[[21,3,0.8],[15,-6,-1.5],[0,0,0],[0,0,0]]
s8=[[21,3,0.8],[15,-6,-1],[0,0,0],[0,0,0]]

s27=[[21,3,1.2],[15,-6,3],[0,0,0],[0,0,0]]
s28=[[21,3,1.2],[15,-6,3.5],[0,0,0],[0,0,0]]
 
s9=[[15,-6,-1.5],[9,-7,-1.5],[0,-5,0],[0,0,0]]
s10=[[15,-6,3.5],[9,-7,3.5],[0,-5,0],[0,0,0]]
 
s11=[[21,4,1.5],[12,-2,3.4],[0,0,0],[4,2,0]]
s12=[[21.7,3.5,1],[12,-3.5,3.4],[0,0,0],[0,0,0]]
 
s13=[[12,-2,3.4],[9,-7,3.3],[-4,-2,0],[0,0,0]]
s14=[[12,-3.5,3.4],[10.5,-7.1,3.3],[-1,0,0],[0,0,0]]
 
s15=[[21,4,0.5],[12,-2,-1.4],[0,0,0],[4,2,0]]
s16=[[21.7,3.5,1],[12,-3.5,-1.4],[0,0,0],[0,0,0]]
 
s17=[[12,-2,-1.4],[9,-7,-1.3],[-4,-2,0],[0,0,0]]
s18=[[12,-3.5,-1.4],[10.5,-7.1,-1.3],[-1,0,0],[0,0,0]]
 
s19=[[8,0,-1],[14,0,-0.5],[5,-5,0],[5,2,0]]
s20=[[11,-3,-1.4],[12,-2,-1.4],[0,0,0],[-4,-2,0]]
 
s21=[[21,4,0.5],[12,-2,-1.4],[0,0,0],[0,0,0]]
s22=[[21,4,0.5],[14,0,-0.5],[0,0,0],[0,0,0]]
 
s23=[[8,0,3],[14,0,2.5],[5,-5,0],[5,2,0]]
s24=[[11,-3,3.4],[12,-2,3.4],[0,0,0],[-4,-2,0]]
 
s25=[[21,4,1.5],[12,-2,3.4],[0,0,0],[0,0,0]]
s26=[[21,4,1.5],[14,0,2.5],[0,0,0],[0,0,0]]
  
body1 = rgb(220,20,60)(supHermite(s1,s2,[0,1,0],[0,-1,0]))
body2 = rgb(220,20,60)(supHermite(s3,s4,[0,1,0],[0,-1,0]))
body3 = rgb(128,128,128)(supHermite(s5,s6,[0,1,0],[0,-1,0]))
body4 = rgb(128,128,128)(supHermite(s7,s8,[0,0,0],[0,0,0]))
body5 = rgb(128,128,128)(supHermite(s9,s10,[0,0,0],[0,0,0]))
body6 = rgb(128,128,128)(supHermite(s11,s12,[0,0,1],[0,0,-1]))
body7 = rgb(128,128,128)(supHermite(s13,s14,[0,0,1],[0,0,-1]))
body8 = rgb(128,128,128)(supHermite(s15,s16,[0,0,-1],[0,0,1]))
body9 = rgb(128,128,128)(supHermite(s17,s18,[0,0,-1],[0,0,1]))
body10 = rgb(0,0,0)(supHermite(s19,s20,[0,0,0],[0,0,0]))
body11 = rgb(220,20,60)(supHermite(s21,s22,[0,0,0],[0,0,0]))
body12 = rgb(0,0,0)(supHermite(s23,s24,[0,0,0],[0,0,0]))
body13 = rgb(220,20,60)(supHermite(s25,s26,[0,0,0],[0,0,0]))
body14 = rgb(128,128,128)(supHermite(s27,s28,[0,0,0],[0,0,0]))
 
cylinderPivot=T([0,1,2])([21,4.4,1])(R([0,1])(PI/12)(R([1,2])(PI/2)(cylinder(0.5,2.35,64))))
plierHandlebar1=T([0,1,2])([21,4.75,-0.3])(R([0,1])(PI/12)(EXTRUDE([0.5])(annulus_sector(2*PI, 0.2, 0.4))))
plierHandlebar2=T([0,1,2])([21,4.75,1.7])(R([0,1])(PI/12)(EXTRUDE([0.5])(annulus_sector(2*PI, 0.2, 0.4))))
body=T([0,1,2])([24,6,1.5])(R([0,2])(PI)(STRUCT([plierHandlebar2,plierHandlebar1,cylinderPivot,body1,body2,body3,body4,
  body5,body6,body7,body8,body9,body10,body11,body12,body13,body14])))

//===============================================================================
// HANDLEBAR
//===============================================================================

x1=[[0,2,0],[3,2,0],[0,0,0],[0,0,0]]
x2=[[0,2,0.5],[3,2,0.5],[0,0,0],[0,0,0]]

x3=[[3,2,0],[5,0,0],[3,0,0],[3,0,0]]
x4=[[3,2,0.5],[5,0,0.5],[3,0,0],[3,0,0]]

x5=[[5,0,0],[8,0,0],[0,0,0],[0,0,0]]
x6=[[5,0,0.5],[8,0,0.5],[0,0,0],[0,0,0]]

x7=[[8,0,0],[10,2,0],[3,0,0],[3,0,0]]
x8=[[8,0,0.5],[10,2,0.5],[3,0,0],[3,0,0]]

x9=[[10,2,0],[13,2,0],[0,0,0],[0,0,0]]
x10=[[10,2,0.5],[13,2,0.5],[0,0,0],[0,0,0]]

handlebar1 = supHermite(x1,x2,[0,-1,0],[0,1,0])
handlebar2 = supHermite(x3,x4,[0,-1,0],[0,1,0])
handlebar3 = supHermite(x5,x6,[0,-1,0],[0,1,0])
handlebar4 = supHermite(x7,x8,[0,-1,0],[0,1,0])
handlebar5 = supHermite(x9,x10,[0,-1,0],[0,1,0])
handlebar6 = supHermite(x1,x2,[0,1,0],[0,-1,0])
handlebar7 = supHermite(x3,x4,[0,1,0],[0,-1,0])
handlebar8 = supHermite(x5,x6,[0,1,0],[0,-1,0])
handlebar9 = supHermite(x7,x8,[0,1,0],[0,-1,0])
handlebar10 = supHermite(x9,x10,[0,1,0],[0,-1,0])

knob1=annulus_sector(2*PI, 0.2, 0.3)
knobDx=R([0,2])([-PI/2])(EXTRUDE([2])(knob1))
discKnob=R([0,2])([-PI/2])(annulus_sector(2*PI, 0.3, 0.5))
balancer=T([0])([-2])(R([0,2])([PI/2])(rgb(128,128,128)(cylinder(0.2,0.3,64))))
knob1=STRUCT([balancer, rgb(0,0,0)(STRUCT([knobDx,discKnob]))])
knob2=T([0])([9])(R([0,2])(PI)(knob1))
knobs=T([0,1,2])([2,2,0.25])(STRUCT([knob1,knob2]))
onBar=rgb(220,20,60)(T([0,1,2])([9.2,1.5,0.3])(R([0,2])([-PI/2])(cylinder(0.2,5.5,64))))
downBar=rgb(220,20,60)(STRUCT([handlebar1,handlebar2,handlebar3,handlebar4,handlebar5,handlebar6,handlebar7,handlebar8,handlebar9,handlebar10]))
handlebar=T([0,1,2])([2.7,10.8,7])(R([0,1])([-PI/12])(R([0,2])([PI/2])(STRUCT([onBar,downBar,knobs]))))

//===============================================================================
// ENGINE
//===============================================================================

discChainSmall1 = annulus_sector(2*PI, 0.1, 0.5)
discChainSmall = T([0,2])([13,1.5])(rgb(128,128,128)(EXTRUDE([0.3])(discChainSmall1)))

p1=[[23,0,2],[20,2,2],[0,4,0],[-5,-1.5,0]]
p2=[[23,0,2.3],[20,2,2.3],[0,4,0],[-5,-1.5,0]]

p3=[[23,0,2],[20,-2,2],[0,-4,0],[-5,1.5,0]]
p4=[[23,0,2.3],[20,-2,2.3],[0,-4,0],[-5,1.5,0]]

p5=[[20,-2,2],[13,-0.5,2],[0,0,0],[0,0,0]]
p6=[[20,-2,2.3],[13,-0.5,2.3],[0,0,0],[0,0,0]]

p7=[[20,2,2],[13,0.5,2],[0,0,0],[0,0,0]]
p8=[[20,2,2.3],[13,0.5,2.3],[0,0,0],[0,0,0]]

p9=[[13,0.5,2],[12.5,0,2],[-0.9,0,0],[0,-0.9,0]]
p10=[[13,0.5,2.3],[12.5,0,2.3],[-0.9,0,0],[0,-0.9,0]]

p11=[[13,-0.5,2],[12.5,0,2],[-0.9,0,0],[0,0.9,0]]
p12=[[13,-0.5,2.3],[12.5,0,2.3],[-0.9,0,0],[0,0.9,0]]

chain1=SKELETON(0)(supHermite(p1,p2,[0,0,0],[0,0,0]))
chain2=SKELETON(0)(supHermite(p3,p4,[0,0,0],[0,0,0]))
chain3=SKELETON(0)(supHermite(p5,p6,[0,0,0],[0,0,0]))
chain4=SKELETON(0)(supHermite(p7,p8,[0,0,0],[0,0,0]))
chain5=SKELETON(0)(supHermite(p9,p10,[0,0,0],[0,0,0]))
chain6=SKELETON(0)(supHermite(p11,p12,[0,0,0],[0,0,0]))
chainStr=rgb(47,79,79)(T([2])([-0.5])(STRUCT([chain1,chain2,chain3,chain4,chain5,chain6])))

forc1=T([0,1,2])([14,-0.25,2])(CUBOID([6.5,0.6,0.3]))
forc2=T([0,1,2])([14,-0.25,-1.4])(CUBOID([6.5,0.6,0.3]))
bigForc=T([0,1,2])([14,-0.25,-1.4])(CUBOID([1,0.6,3.4]))

f1=[[21,8,-0.5],[12,3,-0.5],[0,0,0],[-3,0,-1]]
f2=[[21,8,-2],[12,3,-1.5],[0,0,0],[-4,2,-1]]

f3=[[12,3,-0.5],[7.5,4,-1],[-3,0,-1],[-3,0,0]]
f4=[[12,3,-1.5],[7.5,4,-1.5],[-4,2,-1],[-3,0,0]]

f5=[[7.5,4,-1],[6.5,2.5,-0.5],[-3,-1,0],[0,-2,3]]
f6=[[7.5,4,-1.5],[6.5,2.5,-1],[-3,-1,0],[0,-2,3]]

f7=[[6.5,2.5,-0.5],[10,1,1],[0,-2,3],[0,0,0]]
f8=[[6.5,2.5,-1],[10,1,2],[0,-2,3],[0,0,0]]

muffler1 = rgb(220,220,220)(supHermite(f1,f2,[0,3,0],[0,-3,0]))
muffler2 = rgb(220,220,220)(supHermite(f1,f2,[0,-3,0],[0,3,0]))
muffler3 = rgb(220,220,220)(supHermite(f3,f4,[0,3,0],[0,-3,0]))
muffler4 = rgb(220,220,220)(supHermite(f3,f4,[0,-3,0],[0,3,0]))
muffler5 = rgb(220,220,220)(supHermite(f5,f6,[0,3,0],[0,-3,0]))
muffler6 = rgb(220,220,220)(supHermite(f5,f6,[0,-3,0],[0,3,0]))
muffler7 = rgb(220,220,220)(supHermite(f7,f8,[0,3,0],[0,-3,0]))
muffler8 = rgb(220,220,220)(supHermite(f7,f8,[0,-3,0],[0,3,0]))

muffler=STRUCT([muffler1,muffler2,muffler3,muffler4,muffler5,muffler6,muffler7,muffler8])
engineCylinder=rgb(105,105,105)(T([0,1,2])([11,0.5,-1.5])(cylinder(1.35,4,32)))
carburetor=T([0,1,2])([9.5,3,1])(R([0,1])([PI/10])(R([1,2])([PI/2])(cylinder(1.20,2.5,32))))
radiator1=T([0,1,2])([6.4,4,-0.1])(rgb(0,0,0)(R([0,1])(PI/5.5)(CUBOID([0.8,4,1.3]))))
radiator2=T([0,1,2])([6.4,4,0.2])(SKELETON(1)(R([0,1])(PI/5.5)(CUBOID([0.2,4,0.2]))))
radiator3=T([0,1,2])([6.4,4,0.4])(SKELETON(1)(R([0,1])(PI/5.5)(CUBOID([0.2,4,0.2]))))
radiator4=T([0,1,2])([6.4,4,0.6])(SKELETON(1)(R([0,1])(PI/5.5)(CUBOID([0.2,4,0.2]))))
radiator5=T([0,1,2])([6.4,4,0.8])(SKELETON(1)(R([0,1])(PI/5.5)(CUBOID([0.2,4,0.2]))))
radiator=STRUCT([radiator1,radiator2,radiator3,radiator4,radiator5])
engine=STRUCT([discChainSmall,chainStr,forc1,forc2,bigForc,muffler,engineCylinder,carburetor,radiator])
 

model=STRUCT([wheelFront,wheelBack,forks,pivot2,pivot,lightTotal,fender,handlebar,body,engine])



  return model
  })();

  exports.author = 'miccia4';
  exports.category = 'vehicles';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));