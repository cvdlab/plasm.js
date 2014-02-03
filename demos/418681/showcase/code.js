//Funzione che disegna una circonferenza di raggio a piacere

var domainSphere = DOMAIN([[0,PI],[0,2*PI]])([50,50]);
var spheref = function(r) {
	     return function(v){
		    var a = v[0];
		    var b = v[1];
		    return [r*SIN(a)*COS(b), r*SIN(a)*SIN(b), r*COS(a)];
	            };
	     };
//Kinect base

var hbase = 0.35
var hbasetop = 0.4
var hsphereconnection = 0.4

var diffbase = 0.10
var d = 0.90
var e = 0.01
var domain = PROD1x1([INTERVALS(1)(50),INTERVALS(1)(50)]);
var domain2 = DOMAIN([[0,1],[0,1]])([50,50]);

var c0d = BEZIER(S0)([[3.31, 0.52, 0], [2.83, 0.48, 0], [2.84, 2.39, 0], [3.35, 2.35, 0]]);
var c1d = BEZIER(S0)([[3.47, 0.47, 0], [3.47, 1.01, 0], [3.45, 1.81, 0], [3.45, 2.38, 0]]);
var c2d = BEZIER(S0)([[3.74, 0.43, 0], [3.74, 0.96, 0], [3.73, 1.87, 0], [3.73, 2.41, 0]]);
var c3d = BEZIER(S0)([[4.23, 0.41, 0], [4.24, 1.07, 0], [4.26, 1.85, 0], [4.28, 2.42, 0]]);
var c4d = BEZIER(S0)([[4.71, 0.42, 0], [4.71, 0.97, 0], [4.68, 1.86, 0], [4.69, 2.40, 0]]);
var c5d = BEZIER(S0)([[5.01, 0.46, 0], [5.01, 0.95, 0], [5.00, 1.80, 0], [5.00, 2.35, 0]]);
var c6d = BEZIER(S0)([[5.18, 0.52, 0], [5.57, 0.48, 0], [5.60, 2.39, 0], [5.20, 2.35, 0]]);
var based = MAP(BEZIER(S1)([c0d,c1d,c2d,c3d,c4d,c5d,c6d]))(domain);

var c0u = BEZIER(S0)([[3.31-diffbase, 0.52, hbase], [2.83-diffbase, 0.48, hbase], [2.84-diffbase, 2.39, hbase], [3.35-diffbase, 2.35, hbase]]);
var c1u = BEZIER(S0)([[3.47-diffbase, 0.47, hbase], [3.47-diffbase, 1.01, hbase], [3.45-diffbase, 1.81, hbase], [3.45-diffbase, 2.38, hbase]]);
var c2u = BEZIER(S0)([[3.74, 0.43, hbase], [3.74, 0.96, hbase], [3.73, 1.87, hbase], [3.73, 2.41, hbase]]);
var c3u = BEZIER(S0)([[4.23, 0.41, hbase], [4.24, 1.07, hbase], [4.26, 1.85, hbase], [4.28, 2.42, hbase]]);
var c4u = BEZIER(S0)([[4.71, 0.42, hbase], [4.71, 0.97, hbase], [4.68, 1.86, hbase], [4.69, 2.40, hbase]]);
var c5u = BEZIER(S0)([[5.01+diffbase, 0.46, hbase], [5.01+diffbase, 0.95, hbase], [5.00+diffbase, 1.80, hbase], [5.00+diffbase, 2.35, hbase]]);
var c6u = BEZIER(S0)([[5.18+diffbase, 0.52, hbase], [5.57+diffbase, 0.48, hbase], [5.60+diffbase, 2.39, hbase], [5.20+diffbase, 2.35, hbase]]);
var baseu = MAP(BEZIER(S1)([c0u,c1u,c2u,c3u,c4u,c5u,c6u]))(domain);
var base = STRUCT([based, baseu]);

var c7d = BEZIER(S0)([[3.31, 0.52, 0], [3.47, 0.47, 0], [3.74, 0.43, 0], [4.23, 0.41, 0], [4.71, 0.42, 0], [5.01, 0.46, 0], [5.18, 0.52, 0]]);
var c7u = BEZIER(S0)([[3.31-diffbase, 0.52, hbase], [3.47-diffbase, 0.47, hbase], [3.74, 0.43, hbase], [4.23, 0.41, hbase], [4.71, 0.42, hbase], [5.01+diffbase, 0.46, hbase], [5.18+diffbase, 0.52, hbase]]);
var c8d = BEZIER(S0)([[3.35, 2.35, 0], [3.45, 2.38, 0], [3.73, 2.41, 0], [4.28, 2.42, 0], [4.69, 2.40, 0], [5.00, 2.35, 0], [5.20, 2.35, 0]]);
var c8u = BEZIER(S0)([[3.35-diffbase, 2.35, hbase], [3.45-diffbase, 2.38, hbase], [3.73, 2.41, hbase], [4.28, 2.42, hbase], [4.69, 2.40, hbase], [5.00+diffbase, 2.35, hbase],[5.20+diffbase, 2.35, hbase]]);

var lateral0 = BEZIER(S1)([c0d,c0u]);
var lateral6 = BEZIER(S1)([c6d,c6u]);
var lateral7 = BEZIER(S1)([c7d,c7u]);
var lateral8 = BEZIER(S1)([c8d,c8u]);

var fuse0 = MAP(lateral0)(domain2);
var fuse6 = MAP(lateral6)(domain2);
var fuse7 = MAP(lateral7)(domain2);
var fuse8 = MAP(lateral8)(domain2);

var c9 = BEZIER(S0)([[4.25, 1.05, hbase+hbasetop],[4.69, 1.11, hbase+hbasetop],[4.68, 1.68, hbase+hbasetop],[4.25, 1.75, hbase+hbasetop]]);
var c10 = BEZIER(S0)([[4.25, 1.05, hbase+hbasetop],[4.69-d, 1.11, hbase+hbasetop],[4.68-d, 1.68, hbase+hbasetop],[4.25, 1.75, hbase+hbasetop]]);

var c11 = [4.25, 1.05, hbase+hbasetop];
var c12 = [4.25, 1.75, hbase+hbasetop];

var lateral9 = BEZIER(S1)([c6u,c9]);
var lateral10 = BEZIER(S1)([c0u,c10]);
var lateral11 = BEZIER(S1)([c7u,c11]);
var lateral12 = BEZIER(S1)([c8u,c12]);

var fuse9 = MAP(lateral9)(domain2);
var fuse10 = MAP(lateral10)(domain2);
var fuse11 = MAP(lateral11)(domain2);
var fuse12 = MAP(lateral12)(domain2);

var base1 = STRUCT([base,fuse0,fuse6,fuse7,fuse8]);
var base2 = STRUCT([baseu,fuse9,fuse10,fuse11,fuse12]);

var kinectbase = COLOR([0.2,0.2,0.2,1])(STRUCT([base1,base2]));

//Attacco base Kinect

rSphere = 0.40;
var sphere = T([0,1,2])([4.24, 1.39,hbase+hbasetop-0.3])(MAP(spheref(rSphere))(domainSphere));

var c13d = BEZIER(S0)([[4, 1.36,hbase+hbasetop-0.2],[4.12, 1.56,hbase+hbasetop-0.2],[4.34, 1.56,hbase+hbasetop-0.2],[4.46, 1.36,hbase+hbasetop-0.2]])
var c13u = BEZIER(S0)([[4, 1.36,hbase+hbasetop+hsphereconnection],[4.12, 1.56,hbase+hbasetop+hsphereconnection],
			[4.34, 1.56,hbase+hbasetop+hsphereconnection],[4.46, 1.36,hbase+hbasetop+hsphereconnection]])
var c14d = BEZIER(S0)([[4, 1.36,hbase+hbasetop-0.2],[4.13, 1.2,hbase+hbasetop],[4.35, 1.21,hbase+hbasetop-0.2],[4.46, 1.36,hbase+hbasetop-0.2]])
var c14u = BEZIER(S0)([[4, 1.36,hbase+hbasetop+hsphereconnection],[4.11, 1.19,hbase+hbasetop+hsphereconnection],
			[4.35, 1.19,hbase+hbasetop+hsphereconnection],[4.46, 1.36,hbase+hbasetop+hsphereconnection]])

var lateral13 = BEZIER(S1)([c13d,c13u]);
var lateral14 = BEZIER(S1)([c14d,c14u]);

var fuse13 = MAP(lateral13)(domain2);
var fuse14 = MAP(lateral14)(domain2);

var kinectbaseconnection = COLOR([0.5,0.5,0.5,1])(STRUCT([sphere,fuse13,fuse14]));

//Logo base kinect

function arc(alphaIn, alphaEnd, r, R) {
  var domain = DOMAIN([[alphaIn,alphaEnd],[r,R]])([36,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    
    return [r*COS(a), r*SIN(a)];
  }
  var arco = MAP(mapping)(domain);
  return arco;
}
var larghezzalettera = 4 

//K

var k1 = CUBOID([1,4,2])
var k2 = T([0,1])([2.25,-0.1])(R([0,1])([PI/6])(CUBOID([1,2.5,2])))
var k3 = T([0,1])([1,2.1])(R([0,1])([-PI/6])(CUBOID([1,2.25,2])))
var k  = STRUCT([k1,k2,k3]);

//I

var i = T([0])([3.5])(CUBOID([1,4,2]))

//N

var n1 = T([0])([0.6])(CUBOID([1,4,2]))
var n2 = T([0])([3])(CUBOID([1,4,2]))
var n3 = T([0])([3])(R([0,1])([PI/6])(CUBOID([0.8,4.15,2])))
var n = T([0])([5])(STRUCT([n1,n2,n3]))

//E

var e1 = CUBOID([1,4,2])
var e2 = T([0])([1])(CUBOID([1.5,0.8,2]))
var e3 = T([0,1])([1,1.6])(CUBOID([1.5,0.7,2]))
var e4 = T([0,1])([1,3.2])(CUBOID([1.5,0.8,2]))
var e = T([0])([10])(STRUCT([e1,e2,e3,e4]))

//C

var c1 = arc(PI/3,(5/3)*PI,1.5,3)
var c2 = T([0,1])([20.5,2.5])(EXTRUDE([2.5])(c1))
var c = S([0,1,2])([0.75,0.75,0.75])(c2)

//T

var t1 = T([0])([1])(CUBOID([1,4,2]))
var t2 = T([1])([3.2])(CUBOID([3,0.8,2]))
var t = T([0])([17])(STRUCT([t1,t2]))

var logokinect1 = STRUCT([k,i,n,e,c,t])
var logokinect2 = S([0,1,2])([0.05,0.05,0.05])(logokinect1);
var logokinect3 = S([0,1,2])([0.5,0.5,0.5])(logokinect2);
var logokinect4 = R([1,2])([PI/6])(logokinect3);
var logokinect = COLOR([0.5,0.5,0.5,1])(T([0,1,2])([3.95, 0.6, hbase+0.075])(logokinect4));

var base = STRUCT([kinectbase, kinectbaseconnection, logokinect])


//Kinectcamera

var domain = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(50)]);
var domain2 = DOMAIN([[0,1],[0,1]])([50,50]);

var d = 0.3
var l = 1.6
var rientro = 1.4


var dsmussamento = 1.5
var rientrosmussamento = 0.5
var dpresearia = 7.8 

//PRESA D'ARIA DESTRA

var c15dl = BEZIER(S0)([[6.7, 2.82, -0.4], [6.4, 2.87, -0.2], [6.41, 3.79, -0.2], [6.69, 3.83, -0.4]]);
var c16d = BEZIER(S0)([[6.7, 2.82, -(rientro*1/3)], [6.7, 3.21, -rientrosmussamento-(rientro*1/3)], [6.7, 3.43, -rientrosmussamento-(rientro*1/3)], [6.7, 3.83, -(rientro*1/3)]]);
var c17d = BEZIER(S0)([[6.7+dsmussamento, 2.82, -(rientro*2/3)], [6.7+dsmussamento, 3.21, -rientrosmussamento-(rientro*2/3)],
		      [6.7+dsmussamento, 3.43, -rientrosmussamento-(rientro*2/3)], [6.7+dsmussamento, 3.83, -(rientro*2/3)]]);
var c15dr = BEZIER(S0)([[6.7+l, 2.82, -rientro+0.4], [6.4+l+d+d, 2.87, -rientro+0.4], [6.41+l+d+d, 3.79, -rientro+0.4], [6.69+l, 3.83, -rientro+0.4]]);

var presariadestra = MAP(BEZIER(S1)([c15dl,c16d,c17d,c15dr]))(domain);

//PRESA D'ARIA SINISTRA

var c15sl = BEZIER(S0)([[6.7, 2.82, -dpresearia+0.4], [6.4, 2.87, -dpresearia+0.2], [6.41, 3.79, -dpresearia+0.2], [6.69, 3.83, -dpresearia+0.4]]);
var c16s = BEZIER(S0)([[6.7, 2.82, -dpresearia+(rientro*1/3)], [6.7, 3.21, rientrosmussamento-dpresearia+(rientro*1/3)], [6.7, 3.43, rientrosmussamento-dpresearia+(rientro*1/3)], [6.7, 3.83, -dpresearia+(rientro*1/3)]]);
var c17s = BEZIER(S0)([[6.7+dsmussamento, 2.82, -dpresearia+(rientro*2/3)], [6.7+dsmussamento, 3.21, rientrosmussamento-dpresearia+(rientro*2/3)],
		      [6.7+dsmussamento, 3.43, rientrosmussamento-dpresearia+(rientro*2/3)], [6.7+dsmussamento, 3.83, -dpresearia+(rientro*2/3)]]);
var c15sr = BEZIER(S0)([[6.7+l, 2.82, -dpresearia+rientro-0.4], [6.4+l+d+d, 2.87, -dpresearia+rientro-0.4], [6.41+l+d+d, 3.79, -dpresearia+rientro-0.4], [6.69+l, 3.83, -dpresearia+rientro-0.4]]);

var presariasinistra = MAP(BEZIER(S1)([c15sl,c16s,c17s,c15sr]))(domain);

//PRESE D'ARIA

var presaria = STRUCT([presariadestra, presariasinistra])

//Rivestimento kinect camera

var c18r = BEZIER(S0)([[6.69, 3.83, -0.4],[6.7, 3.83, -(rientro*1/3)],[6.7+dsmussamento, 3.83, -(rientro*2/3)],[6.69+l, 3.83, -rientro+0.4]]);
var c19r = BEZIER(S0)([[6.7, 2.82, -0.4],[6.7, 2.82, -(rientro*1/3)],[6.7+dsmussamento, 2.82, -(rientro*2/3)],[6.7+l, 2.82, -rientro+0.4]]);

var c18l = BEZIER(S0)([[6.69, 3.83, -dpresearia+0.4],[6.7, 3.83, -dpresearia+(rientro*1/3)],[6.7+dsmussamento, 3.83, -dpresearia+(rientro*2/3)],[6.69+l, 3.83, -dpresearia+rientro-0.4]]);
var c19l = BEZIER(S0)([[6.7, 2.82, -dpresearia+0.4],[6.7, 2.82, -dpresearia+(rientro*1/3)],[6.7+dsmussamento, 2.82, -dpresearia+(rientro*2/3)],[6.7+l, 2.82, -dpresearia+rientro-0.4]]);

var lateralcam1 = BEZIER(S1)([c15dl,c15sl]);
var lateralcam2 = BEZIER(S1)([c15dr,c15sr]);
var lateralcam3 = BEZIER(S1)([c18r,c18l]);
var lateralcam4 = BEZIER(S1)([c19r,c19l]);

var fusecam1 = MAP(lateralcam1)(domain2);
var fusecam2 = MAP(lateralcam2)(domain2);
var fusecam3 = MAP(lateralcam3)(domain2);
var fusecam4 = MAP(lateralcam4)(domain2);


var rivestimento = STRUCT([fusecam1, fusecam2, fusecam3, fusecam4])

var kinectcamera = COLOR([0.2,0.2,0.2,1])(T([0,1,2])([8.25,-6.2,-1.75])(R([0,1])([PI/2])(R([1,2])([PI/2])(STRUCT([presaria, rivestimento])))));

//Vetrino
rvetrino = 2.43
dcam = 0.7
var domainv = DOMAIN([[0,1],[0,2*PI]])([60,60]);
var domainc = DOMAIN([[0,1],[0,2*PI]])([60,60]);

diffxvetrino = -2.43
var profilev = BEZIER(S0)([[0+diffxvetrino, 0, 0], [0.28+diffxvetrino, 0, 0.23], [0.96+diffxvetrino, 0, 0.37], [2.43+diffxvetrino, 0, 0.35]]);
var mappingv = ROTATIONAL_SURFACE(profilev);
var surfacev = MAP(mappingv)(domainv);
var vetrinov = COLOR([0,0,1,0.5])(surfacev)

//Base cam
var discocam = DISK(rvetrino)(60)

//Cam destra
diffcam1 = -0.48
var profilec1 = BEZIER(S0)([[0+diffcam1, 0, 0], [0.14+diffcam1, 0, 0.1], [0.31+diffcam1, 0, 0.15], [0.48+diffcam1, 0, 0.15]]);
var mappingc1 = ROTATIONAL_SURFACE(profilec1);
var surfacec1 = MAP(mappingc1)(domainc);
var cam1 = COLOR([0,1,0,1])(surfacec1)
var camd = T([0])([dcam*4])(S([0,1,2])([0.097,0.097,0.097])(STRUCT([cam1, vetrinov, discocam])));

//Led
diffcaml = -0.22
var profilecl = BEZIER(S0)([[0+diffcaml, 0, 0], [0.06+diffcaml, 0, 0.05], [0.14+diffcaml, 0, 0.08], [0.22+diffcaml, 0, 0.09]]);
var mappingcl = ROTATIONAL_SURFACE(profilecl);
var surfacecl = MAP(mappingcl)(domainc);
var led1 = COLOR([0,1,0,1])(surfacecl)
var led = T([0])([dcam*2])(S([0,1,2])([0.097,0.097,0.097])(led1));

//Cam centrale
diffcam2 = -0.22
var profilec2 = BEZIER(S0)([[0+diffcam2, 0, 0], [0.06+diffcam2, 0, 0.05], [0.14+diffcam2, 0, 0.08], [0.22+diffcam2, 0, 0.09]]);
var mappingc2 = ROTATIONAL_SURFACE(profilec2);
var surfacec2 = MAP(mappingc2)(domainc);
var cam2 = COLOR([1,0.078,0.57,1])(surfacec2)
var camc = T([0])([dcam*3])(S([0,1,2])([0.097,0.097,0.097])(STRUCT([cam2, vetrinov, discocam])));

//Cam sinistra
diffcam3 = -0.48
var profilec3 = BEZIER(S0)([[0+diffcam3, 0, 0], [0.14+diffcam3, 0, 0.1], [0.31+diffcam3, 0, 0.15], [0.48+diffcam3, 0, 0.15]]);
var mappingc3 = ROTATIONAL_SURFACE(profilec3);
var surfacec3 = MAP(mappingc3)(domainc);
var cams = T([0])([dcam])(S([0,1,2])([0.097,0.097,0.097])(STRUCT([surfacec3, vetrinov, discocam])));

var kcam1 = T([0,1,2])([1.8,0.275,1.55])(R([1,2])([PI/2])(STRUCT([camd, camc, cams, led])));

//Logo kinect cam
function arc(alphaIn, alphaEnd, r, R) {
  var domain = DOMAIN([[alphaIn,alphaEnd],[r,R]])([36,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    
    return [r*COS(a), r*SIN(a)];
  }
  var arco = MAP(mapping)(domain);
  return arco;
}

//Xprima
var x1 = T([0,1])([0,0])(R([0,1])([-PI/4])(CUBOID([1,6,2])))
var x2 = T([0,1])([4,-0.75])(R([0,1])([PI/4])(CUBOID([1,6,2])))
var xprima  = T([0,1])([0,0.55])(S([0,1,2])([0.75,1,1])(STRUCT([x1,x2])));

//B
var b1 = CUBOID([1,4,2.3])
var b2 = T([1])([-1])(CUBOID([2,1,2.3]))
var b3 = T([0,1])([-0.5,1.5])(CUBOID([2.5,1,2.3]))
var b4 = T([1])([4])(CUBOID([2,1,2.3]))
var b51 = arc(-PI/2,PI/2,0.875,2.0125)
var b52 = EXTRUDE([3.07])(b51)
var b5u = T([0,1])([2,0.75])(S([0,1,2])([1,1.15,1])(S([0,1,2])([0.75,0.75,0.75])(b52)))
var b5d = T([1])([2.5])(b5u)
var b1 = T([0,1])([4.75,0.55])(S([0,1,2])([1.2,1,1])(STRUCT([b1,b2,b3,b4,b5u,b5d])));
var b = S([0,1,2])([0.85,0.85,0.85])(b1)

//O
var o1 = arc(0,2*PI,2,3)
var o2 = EXTRUDE([2.5])(o1)
var o = T([0,1])([10.5,2])(S([0,1,2])([0.85,0.85,0.85])(o2));

//Xseconda
var x1 = T([0,1])([0,0])(R([0,1])([-PI/4])(CUBOID([1,6,2])))
var x2 = T([0,1])([4,-0.75])(R([0,1])([PI/4])(CUBOID([1,6,2])))
var xseconda  = T([0,1])([13,0.55])(S([0,1,2])([0.75,1,1])(STRUCT([x1,x2])));

//3

var tre1 = arc(-PI/2,PI,2,3)
var tre2 = EXTRUDE([4])(tre1)
var treu = S([0,1,2])([0.75,0.75,0.75])(tre2)
var tred = T([1,2])([-3.75,3])(R([1,2])([PI,PI])(treu))
var tre1 = T([0,1])([31,5.2])(S([0,1,2])([1.1,1,1])(STRUCT([treu,tred])));
var tre = S([0,1,2])([0.65,0.65,0.65])(tre1);

//6
var seiBase1 = arc(0,2*PI,1,1.5)
var seiBase2 = EXTRUDE([2.5])(seiBase1)
var seiBase = S([0,1,2])([0.75,0.75,0.75])(seiBase2);
var seiSopra1 = arc(PI/12,PI,1,1.5)
var seiSopra2 = EXTRUDE([2.5])(seiSopra1)
var seiSopra = T([1])([1.25])(S([0,1,2])([0.75,0.75,0.75])(seiSopra2));
var lat6 = T([0])([-1.125])(CUBOID([0.3725,1.25,1.875]))
var sei1 = T([0,1])([16,0.8])(STRUCT([seiSopra, seiBase, lat6]));
var sei = S([0,1,2])([1.5,1.5,1])(sei1)

//Zero
var z1 = arc(0,2*PI,2.2,3)
var z2 = EXTRUDE([2])(z1)
var zero1 = T([0,1])([23.5,1.875])(R([0,1])([PI/2,PI/2])(S([0,1,2])([1,0.75,1])(S([0,1,2])([0.75,0.75,0.75])(z2))));
var zero = S([0,1,2])([1.2,1.2,1.2])(zero1)
var logokinectcam1 = STRUCT([xprima,b,o,xseconda,tre, sei, zero])
var logokinectcam2 = S([0,1,2])([0.05,0.05,0.05])(logokinectcam1)
var logokinectcam3 = S([0,1,2])([0.7,0.7,0.7])(logokinectcam2)
var logokinectcam4 = R([1,2])([PI/2,PI/2])(logokinectcam3)
var logokinectcam = COLOR([0.5,0.5,0.5,1])(T([0,1,2])([5.75, 0.34, 1.475])(logokinectcam4))

kcam = STRUCT([kcam1, logokinectcam]);

//Prese d'aria laterali

//Funzione per disegnare la presa d'aria

var fpresa = function(presa, nprese) {
	var prese = [presa];
	for(var i=0; i<nprese; i++) {
		spazio = 0.05
		prese.push(T([0])([0.1+spazio])(presa));
		presa = prese[i+1];
	}

	if(nprese===0) return undefined;
	return STRUCT(prese);
};

var presasingola = R([0,2])([PI/4,PI/4])(CUBOID([0.05,0.8,0.3]))
var presasinistra1 = R([0,1])([-PI/5,-PI/5])(R([0,2])([PI,PI])(R([0,1])([PI/2.5,PI/2.5])(R([1,2])([PI/2,PI/2])(fpresa(presasingola, 11)))));
var presasinistra = T([0,1,2])([1.05,0.375,1.9725])(presasinistra1)

var presadestra = T([0,2])([8.725,3.125])(R([0,2])([PI,PI])(presasinistra));

var prese = COLOR([0.2,0.2,0.2,1])(STRUCT([presasinistra, presadestra]))

//Part of wire

var wire1 = EXTRUDE([0.1])(DISK(0.125)(50))
var wire2 = EXTRUDE([3])(DISK(0.1)(50))
var wire3 = T([2])([0.75])(EXTRUDE([1])(DISK(0.25)(50)))
var wire4 = COLOR([0,0,0,1])(STRUCT([wire1,wire2,wire3]))

var wire = T([0,1,2])([4.2,  2.375, 0.2])(R([1,2])([-PI/2,-PI/2])(wire4));

//DRAWKINECT

var model = STRUCT([base, kinectbaseconnection, kinectcamera, kcam, prese, wire]);