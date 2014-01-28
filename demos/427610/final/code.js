NN = REPLICA

var dom1D = INTERVALS([1])([32])
var dom2D = DOMAIN([[0,1],[0,1]])([30,30])

function bezierS0(controlpoints){
	return BEZIER(S0)(controlpoints)
}

function bezierS1(f){
	return BEZIER(S1)(f)
}

function bezierMappata_1D(controlpoints){
	return MAP(bezierS0(controlpoints))(INTERVALS(1)(32))
}

function bezierMappata_2D(functions){
	var x = BEZIER(S1)(functions)
	return MAP(x)(dom2D) 
}

function addDepth(z){
	function atPoint(punto){
		return [punto[0],punto[1],z];
	}
	return atPoint;
}

function traslaY(y){
	function atPoint(punto){
		return [punto[0],punto[1]+y,punto[2]];
	}
	return atPoint;
}

function color(arrayColor){
	return [arrayColor[0]/255,arrayColor[1]/255,arrayColor[2]/255]
}


function cercMapped(r,z){
  var points = [[1,0,0],[1,1,0],[0,1.7,0],[-1.7,1,0],[-1.7,0,0],[-1,-1.4,0],[0,-1.6,0],[1,-0.9,0],[1,0,0]];
  var c = points.map(function(point){return [point[0]*r,point[1]*r,point[2]+z]})
  var cerchio = bezierMappata_1D(c);
  return cerchio;
}

function cercS0(r,z){
  var points = [[1,0,0],[1,1,0],[0,1.7,0],[-1.7,1,0],[-1.7,0,0],[-1,-1.4,0],[0,-1.6,0],[1,-0.9,0],[1,0,0]];
  var c = points.map(function(point){return [point[0]*r,point[1]*r,point[2]+z]})
  var cerchio = bezierS0(c);
  return cerchio;
}

function cercS1(r,z){
  var points = [[1,0,0],[1,1,0],[0,1.7,0],[-1.7,1,0],[-1.7,0,0],[-1,-1.4,0],[0,-1.6,0],[1,-0.9,0],[1,0,0]];
  var c = points.map(function(point){return [point[0]*r,point[1]*r,point[2]+z]})
  var cerchio = bezierS1(c);
  return cerchio;
}
//------------- Oscar Niemeyer Rio Rocking Chair  ---------------------------------
var x1_p = [[5.21, -0.88], [5.7, -0.7], [7.02, 0.33], [9.22, 0.21]].map(addDepth(0));
var x1_2d = bezierMappata_1D(x1_p);
var x1_s0 = bezierS0(x1_p);
DRAW(x1_2d)

var x1_dietro_p = [[5.21, -0.88], [5.7, -0.7], [7.02, 0.33], [9.22, 0.21]].map(addDepth(-3));
var x1_dietro_2d = bezierMappata_1D(x1_dietro_p);
var x1_dietro_s0 = bezierS0(x1_dietro_p);
DRAW(x1_dietro_2d)

var x2_p = [[5.21, -0.88], [4.79, -1.13], [3.62, 0.21], [2.49, 1.82]].map(addDepth(0));
var x2_2d = bezierMappata_1D(x2_p);
var x2_s0 = bezierS0(x2_p);
DRAW(x2_2d)

var x2_dietro_p = [[5.21, -0.88], [4.79, -1.13], [3.62, 0.21], [2.49, 1.82]].map(addDepth(-3));
var x2_dietro_2d = bezierMappata_1D(x2_dietro_p);
var x2_dietro_s0 = bezierS0(x2_dietro_p);
DRAW(x2_dietro_2d)

var x3_p = x1_p.map(traslaY(-0.1));
var x3_2d = bezierMappata_1D(x3_p);
var x3_s0 = bezierS0(x3_p);
DRAW(x3_2d)

var x3_dietro_p = x3_p.map(addDepth(-3));
var x3_dietro_2d = bezierMappata_1D(x3_dietro_p);
var x3_dietro_s0 = bezierS0(x3_dietro_p);
DRAW(x3_dietro_2d)

var x4_p = x2_p.map(traslaY(-0.1));
var x4_2d = bezierMappata_1D(x4_p);
var x4_s0 = bezierS0(x4_p);
DRAW(x4_2d)

var x4_dietro_p = x4_p.map(addDepth(-3));
var x4_dietro_2d = bezierMappata_1D(x4_dietro_p);
var x4_dietro_s0 = bezierS0(x4_dietro_p);
DRAW(x4_dietro_2d)

var x5_p = [ [2.49, 1.82,0], [2.49, 1.82,-3]];
var x5_2d = bezierMappata_1D(x5_p);
var x5_s0 = bezierS0(x5_p);
DRAW(x5_2d);

var x5_dietro_p = x5_p.map(traslaY(-0.1));
var x5_dietro_2d = bezierMappata_1D(x5_dietro_p);
var x5_dietro_s0 = bezierS0(x5_dietro_p);
DRAW(x5_dietro_2d);

var x6_p = [ [9.22, 0.21,0], [9.22, 0.21,-3]];
var x6_2d = bezierMappata_1D(x6_p);
var x6_s0 = bezierS0(x6_p);
DRAW(x6_2d);

var x6_dietro_p = x6_p.map(traslaY(-0.1));
var x6_dietro_2d = bezierMappata_1D(x6_dietro_p);
var x6_dietro_s0 = bezierS0(x6_dietro_p);
DRAW(x6_dietro_2d);

//Chiusura lato superiore
var sedia_parte1 = bezierMappata_2D([x1_s0,x1_dietro_s0])
var sedia_parte2 = bezierMappata_2D([x2_s0,x2_dietro_s0])
//var sedia_parte3 = STRUCT([sedia_parte1,sedia_parte2])
//DRAW(sedia_parte3)
//Chiusura lato inferiore
var sedia_parte8 = bezierMappata_2D([x3_dietro_s0,x3_s0])
//DRAW(sedia_parte8)
var sedia_parte9 = bezierMappata_2D([x4_dietro_s0,x4_s0])
//DRAW(sedia_parte9)
//Chiusura lato sx
var sedia_parte4 = bezierMappata_2D([x1_s0,x3_s0])
var sedia_parte5 = bezierMappata_2D([x2_s0,x4_s0])
//Chiusura altro lato dx
var sedia_parte6 = bezierMappata_2D([x1_dietro_s0,x3_dietro_s0])
var sedia_parte7 = bezierMappata_2D([x2_dietro_s0,x4_dietro_s0])
//DRAW(sedia_parte4)
//DRAW(sedia_parte5)
//DRAW(sedia_parte6)
//DRAW(sedia_parte7)
//Chiusura sopra
var sedia_parte10 = bezierMappata_2D([x5_s0,x5_dietro_s0])
//DRAW(sedia_parte8);
//Chiusura sotto
var sedia_parte11 = bezierMappata_2D([x6_s0,x6_dietro_s0])
//DRAW(sedia_parte9);
var chairUp = STRUCT([sedia_parte1,sedia_parte2,sedia_parte4,sedia_parte5,sedia_parte6,sedia_parte7,sedia_parte8,sedia_parte9,sedia_parte10,sedia_parte11]);
DRAW(COLOR([0.29,0.29,0.29])(chairUp));

var chairSmall = S([0,1,2])([0.9,0.9,0.9])(chairUp)
chairSmall = R([0,1])([PI/100])(chairSmall)
chairSmall = T([0,1,2])([0.52,-0.12,-0.15])(chairSmall)
DRAW(COLOR([0.49,0.49,0.49])(chairSmall))

//Arco ai piedi
var x7_p = [[9.22, 0.21,0], [9.57, 0.21,0]].map(traslaY(-0.1));
var x7_2d  = bezierMappata_1D(x7_p);
var x7_s0 = bezierS0(x7_p);
//DRAW(x7_2d);

var x7_dietro_p = x7_p.map(addDepth(-3));
var x7_dietro_2d  = bezierMappata_1D(x7_dietro_p);
var x7_dietro_s0 = bezierS0(x7_dietro_p);
//DRAW(x7_dietro_2d);

var sedia_parte10 = bezierMappata_2D([x7_s0,x7_dietro_s0])
//DRAW(sedia_parte10);

var x8_p = [[9.57, 0.11], [9.57, -0.04]].map(addDepth(0));
var x8_2d  = bezierMappata_1D(x8_p);
var x8_s0 = bezierS0(x8_p);
//DRAW(x8_2d);

var x8_dietro_p = [[9.57, 0.11], [9.57, -0.04]].map(addDepth(-3));
var x8_dietro_2d  = bezierMappata_1D(x8_dietro_p);
var x8_dietro_s0 = bezierS0(x8_dietro_p);
//DRAW(x8_dietro_2d);

var sedia_parte11 = bezierMappata_2D([x8_s0,x8_dietro_s0])
//DRAW(sedia_parte11);

var x9_p = [[9.57, -0.19], [7.76, -0.32], [7.33, -1.99], [6.92, -0.34]].map(addDepth(0)).map(traslaY(0.15))
var x9_2d  = bezierMappata_1D(x9_p);
var x9_s0 = bezierS0(x9_p);
//DRAW(x9_2d);

var x9_dietro_p = [[9.57, -0.19], [7.76, -0.32], [7.33, -1.99], [6.92, -0.34]].map(addDepth(-3)).map(traslaY(0.15))
var x9_dietro_2d  = bezierMappata_1D(x9_dietro_p);
var x9_dietro_s0 = bezierS0(x9_dietro_p);
//DRAW(x9_dietro_2d);

var x10_p = [[9.57, -0.19], [7.76, -0.32], [7.33, -1.99], [7.02, -0.46]].map(addDepth(0)).map(traslaY(0.30))
var x10_2d  = bezierMappata_1D(x10_p);
var x10_s0 = bezierS0(x10_p);
//DRAW(x10_2d);

var x10_dietro_p = [[9.57, -0.19], [7.76, -0.32], [7.33, -1.99], [7.02, -0.46]].map(addDepth(-3)).map(traslaY(0.30))
var x10_dietro_2d  = bezierMappata_1D(x10_dietro_p);
var x10_dietro_s0 = bezierS0(x10_dietro_p);
//DRAW(x10_dietro_2d);

var sedia_parte12 = bezierMappata_2D([x10_s0,x10_dietro_s0])
//DRAW(sedia_parte12);

var sedia_parte13 = bezierMappata_2D([x9_s0,x9_dietro_s0])
//DRAW(sedia_parte13);

var sedia_parte14 = bezierMappata_2D([x10_s0,x9_s0])
//DRAW(sedia_parte14);

var sedia_parte15 = bezierMappata_2D([x10_dietro_s0,x9_dietro_s0])
//DRAW(sedia_parte15);

var arco_piedi = STRUCT([sedia_parte10,sedia_parte11,sedia_parte12,sedia_parte13,sedia_parte14,sedia_parte15])
arco_piedi = COLOR([0.49,0.49,0.49])(arco_piedi)
DRAW(arco_piedi)

//Arco centrale
var x11_p = [[3.48, -1.57], [4.4, -2.33], [7.85, -2.32], [6.85, -0.53]].map(addDepth(0)).map(traslaY(0.30))
var x11_2d  = bezierMappata_1D(x11_p);
var x11_s0 = bezierS0(x11_p);
DRAW(x11_2d);

var x11_dietro_p = [[3.48, -1.57], [4.4, -2.33], [7.85, -2.32], [6.85, -0.53]].map(addDepth(-3)).map(traslaY(0.30))
var x11_dietro_2d  = bezierMappata_1D(x11_dietro_p);
var x11_dietro_s0 = bezierS0(x11_dietro_p);
DRAW(x11_dietro_2d);

var x12_p = [[3.48, -1.57], [3.22, -1.36], [2.62, -0.58], [3.67, -0.13]].map(addDepth(0)).map(traslaY(0.30))
var x12_2d  = bezierMappata_1D(x12_p);
var x12_s0 = bezierS0(x12_p);
DRAW(x12_2d);

var x12_dietro_p = [[3.48, -1.57], [3.22, -1.36], [2.62, -0.58], [3.67, -0.13]].map(addDepth(-3)).map(traslaY(0.30))
var x12_dietro_2d  = bezierMappata_1D(x12_dietro_p);
var x12_dietro_s0 = bezierS0(x12_dietro_p);
DRAW(x12_dietro_2d);
/*
var x13_p = [[3.48, -1.47], [4.4, -2.33], [7.85, -2.32], [6.70, -0.73]].map(addDepth(0)).map(traslaY(0.45))
var x13_2d  = bezierMappata_1D(x13_p);
var x13_s0 = bezierS0(x13_p);
DRAW(x13_2d);
*/
var x13_p = [[3.48, -1.47], [4, -2.12], [7.85, -2.32], [6.70, -0.73]].map(addDepth(0)).map(traslaY(0.45))
var x13_2d  = bezierMappata_1D(x13_p);
var x13_s0 = bezierS0(x13_p);
DRAW(x13_2d);
//var x13_p = [[3.48, -1.47], [4, -2.33], [7.85, -2.32], [6.70, -0.73]].map(addDepth(0)).map(traslaY(0.45))

var x13_dietro_p = [[3.48, -1.47], [4, -2.12], [7.85, -2.22], [6.70, -0.73]].map(addDepth(-3)).map(traslaY(0.45))
var x13_dietro_2d  = bezierMappata_1D(x13_dietro_p);
var x13_dietro_s0 = bezierS0(x13_dietro_p);
DRAW(x13_dietro_2d);
//var x13_dietro_p = [[3.48, -1.47], [4, -2.33], [7.85, -2.32], [6.70, -0.73]].map(addDepth(-3)).map(traslaY(0.45))

var x14_p = [[3.48, -1.47], [3.32, -1.36], [3.15, -0.68], [3.77, -0.40]].map(addDepth(0)).map(traslaY(0.45))
var x14_2d  = bezierMappata_1D(x14_p);
var x14_s0 = bezierS0(x14_p);
DRAW(x14_2d);

var x14_dietro_p = [[3.48, -1.47], [3.32, -1.36], [3.15, -0.68], [3.77, -0.40]].map(addDepth(-3)).map(traslaY(0.45))
var x14_dietro_2d  = bezierMappata_1D(x14_dietro_p);
var x14_dietro_s0 = bezierS0(x14_dietro_p);
DRAW(x14_2d);

var sedia_parte16 = bezierMappata_2D([x11_s0,x13_s0])
var sedia_parte17 = bezierMappata_2D([x12_s0,x14_s0])
var sedia_parte18 = bezierMappata_2D([x11_dietro_s0,x11_s0])
var sedia_parte19 = bezierMappata_2D([x12_dietro_s0,x12_s0])
var sedia_parte20 = bezierMappata_2D([x13_dietro_s0,x13_s0])
var sedia_parte21 = bezierMappata_2D([x14_dietro_s0,x14_s0])
var sedia_parte22 = bezierMappata_2D([x14_s0,x14_dietro_s0])
var sedia_parte23 = bezierMappata_2D([x13_dietro_s0,x11_dietro_s0])
var sedia_parte24 = bezierMappata_2D([x14_dietro_s0,x12_dietro_s0])

var arco_centrale = STRUCT([sedia_parte16,sedia_parte17,sedia_parte18,sedia_parte19,sedia_parte20,sedia_parte21,sedia_parte22,sedia_parte23,sedia_parte24])
arco_centrale = COLOR([0.49,0.49,0.49])(arco_centrale)
DRAW(arco_centrale)

//Arco superiore
var x15_p = [[3.58, -0.03], [2.39, -1.14], [2.49, 0.11], [2.42, 0.58],[2.47,0.90],[2.51, 1.40]].map(addDepth(0)).map(traslaY(0.30))
var x15_2d  = bezierMappata_1D(x15_p);
var x15_s0 = bezierS0(x15_p);
DRAW(x15_2d);

var x15_dietro_p = [[3.58, -0.03], [2.39, -1.14], [2.49, 0.11], [2.42, 0.58],[2.47,0.90],[2.51, 1.40]].map(addDepth(-3)).map(traslaY(0.30))
var x15_dietro_2d  = bezierMappata_1D(x15_dietro_p);
var x15_dietro_s0 = bezierS0(x15_dietro_p);
DRAW(x15_dietro_2d);

var x16_p = [[3.54, -0.13], [2.43, -1.14], [2.54, 0.11], [2.50, 0.58],[2.58,0.90],[2.62, 1.10]].map(addDepth(0)).map(traslaY(0.45))
var x16_2d  = bezierMappata_1D(x16_p);
var x16_s0 = bezierS0(x16_p);
DRAW(x16_2d);

var x16_dietro_p = [[3.54, -0.13], [2.43, -1.14], [2.54, 0.11], [2.50, 0.58],[2.58,0.90],[2.62, 1.10]].map(addDepth(-3)).map(traslaY(0.45))
var x16_dietro_2d  = bezierMappata_1D(x16_dietro_p);
var x16_dietro_s0 = bezierS0(x16_dietro_p);
DRAW(x16_dietro_2d);


var sedia_parte25 = bezierMappata_2D([x15_dietro_s0,x16_dietro_s0])
var sedia_parte26 = bezierMappata_2D([x15_s0,x16_s0])
var sedia_parte27 = bezierMappata_2D([x15_s0,x15_dietro_s0])
var sedia_parte28 = bezierMappata_2D([x16_s0,x16_dietro_s0])

var arco_superiore = STRUCT([sedia_parte25,sedia_parte26,sedia_parte27,sedia_parte28])
arco_superiore = COLOR([0.49,0.49,0.49])(arco_superiore)
DRAW(arco_superiore);

//Poggiatesta
var raggioPoggiatesta = 0.3;
var c1_2d = cercMapped(raggioPoggiatesta,0);
var c1_s0 = cercS0(raggioPoggiatesta,0);
var disk1 = DISK(raggioPoggiatesta)(30)
//DRAW(c1_2d);

var c2_2d = cercMapped(raggioPoggiatesta,-3);
var c2_s0 = cercS0(raggioPoggiatesta,-3);
var disk2 = T([2])([-3])(DISK(raggioPoggiatesta)(30))
//DRAW(c2_2d);

//-------------------------------------------
var dom1D = INTERVALS(1)(32);
var Su0 = BEZIER(S0)([[0.55,0,0],[0,0,-0.3],[-0.55,0,0]]);
var curve0 = MAP(Su0)(dom1D);
//DRAW(COLOR([0,0,1])(curve0));

var Su1 = cercS1(0.55,0);
var curve1 =cercMapped(0.55,0);
//DRAW(COLOR([1,0,1])(curve1));

var c = MAP(PROFILEPROD_SURFACE([Su0,Su1]))(dom2D);
c = T([0,1,2])([3.2,1.4,-3])(c)
c = COLOR([0.29,0.29,0.29])(c)
DRAW(c);

var Su0 = BEZIER(S0)([[0.55,0,0],[0,0,0.3],[-0.55,0,0]]);
var curve0 = MAP(Su0)(dom1D);
var c2 = MAP(PROFILEPROD_SURFACE([Su0,Su1]))(dom2D);
c2 = COLOR([0.29,0.29,0.29])(c2)
c2 = T([0,1,2])([3.2,1.4,0])(c2)
DRAW(c2)
//--------------------------------------------
var cilindro = bezierMappata_2D([c1_s0,c2_s0])
var poggiaTesta = STRUCT([cilindro,disk1,disk2]);
poggiaTesta = T([0,1])([3.2,1.4])(poggiaTesta)
poggiaTesta = COLOR([0.29,0.29,0.29])(poggiaTesta)
DRAW(poggiaTesta);
 
//Filo poggiatesta
var dom1D = INTERVALS(1)(32);

var x17_p = [[2.02, -0.48], [1.99, 1.86], [2.11, 2.5], [2.78, 1.72]].map(addDepth(0))
var x17_2d  = bezierMappata_1D(x17_p);
var x17_s0 = bezierS0(x17_p);
//DRAW(x17_2d);

var x17_dietro_p = [[2.02, -0.48], [1.99, 1.86], [2.11, 2.5], [2.78, 1.72]].map(addDepth(-0.3))
var x17_dietro_2d  = bezierMappata_1D(x17_dietro_p);
var x17_dietro_s0 = bezierS0(x17_dietro_p);
//DRAW(x17_dietro_2d);

var x18_p = [[2.12, -0.48], [2.09, 1.86], [2.21, 2.5], [2.88, 1.72]].map(addDepth(-0.15))
var x18_2d  = bezierMappata_1D(x18_p);
var x18_s0 = bezierS0(x18_p);
//DRAW(x18_2d);

var x19_p = [[1.92, -0.48], [1.89, 1.86], [2.01, 2.5], [2.88, 1.72]].map(addDepth(-0.15))
var x19_2d  = bezierMappata_1D(x19_p);
var x19_s0 = bezierS0(x19_p);
//DRAW(x19_2d);

var davanti = bezierMappata_2D([x17_s0,x18_s0,x17_dietro_s0]);
var dietro = bezierMappata_2D([x17_s0,x19_s0,x17_dietro_s0]);

var filo = STRUCT([davanti,dietro]);
filo = COLOR([0.29,0.29,0.29])(filo)
filo = S([1])([0.85])(filo)
filo = T([0,1,2])([0.2,0.1,-0.5])(filo)
filo2 = T([2])([-1.5])(filo)
DRAW(filo)
DRAW(filo2)

//Goccia alla fine del filo
var dom1D = INTERVALS(1)(32);
var Su0 = BEZIER(S0)([[0.8,0,0],[2,2,2],[0.8,0,3]]);
var curve0 = MAP(Su0)(dom1D);
//DRAW(COLOR([0,0,1])(curve0));

var Su1 = cercS1(1,0);
var curve1 =cercMapped(1,0);
//DRAW(COLOR([1,0,1])(curve1));

var dom2D = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]); // DOMAIN([[0,1],[0,1]])([20,20]);
var out = MAP(PROFILEPROD_SURFACE([Su0,Su1]))(dom2D);
//DRAW(out);

var Su0 = BEZIER(S0)([[0.8,0,0],[0,0,-0.5],[-0.8,0,0]]);
var curve0 = MAP(Su0)(dom1D);
//DRAW(COLOR([0,0,1])(curve0));
var tappoSotto = MAP(PROFILEPROD_SURFACE([Su0,Su1]))(dom2D);
//DRAW(tappoSotto);

var Su0 = BEZIER(S0)([[0.8,0,0],[0,0,0.5],[-0.8,0,0]]);
var curve0 = MAP(Su0)(dom1D);
var tappoSopra = MAP(PROFILEPROD_SURFACE([Su0,Su1]))(dom2D);
tappoSopra = T([2])([3])(tappoSopra)
//DRAW(tappoSopra);


goccia = STRUCT([tappoSopra,tappoSotto,out])
goccia = R([1,2])([PI/2])(goccia)
goccia = S([0,1,2])([0.13,0.1,0.2])(goccia)
goccia = T([0,1,2])([2.2,0,-0.65])(goccia)
goccia =  COLOR([0.29,0.29,0.29])(goccia)


goccia2 = T([2])([-1.5])(goccia)

var model = STRUCT([goccia,goccia2]);
DRAW(model);


