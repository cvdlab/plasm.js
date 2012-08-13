/* VILLA PALLADIANA */

var baseCentrale = SIMPLEX_GRID([ [25], [18], [0.5] ]);
var baseFront = SIMPLEX_GRID([[-8,9],[3],[0.5] ]);
baseFront = STRUCT([T([1])([-3]), baseFront]);
var baseScala = SIMPLEX_GRID([[-11, 3], [10], [0.5] ]);
baseScala = STRUCT([T([1])([-13]), baseScala ]);

var base = STRUCT([baseCentrale, baseFront, baseScala]);

var baseFrontLiv1 = SIMPLEX_GRID([[-8.25,8.50],[-0.25,3-0.25],[-3.27,0.25] ]);
baseFrontLiv1 = STRUCT([T([1])([-3]), baseFrontLiv1]);
var baseScalaLiv1 = SIMPLEX_GRID([[-11.25, 2.5], [3], [-3.27,0.25] ]);
baseScalaLiv1 = STRUCT([T([1])([-6]), baseScalaLiv1 ]);
var listarella = SIMPLEX_GRID([[-11,3],[0.25],[-3.27,0.25] ]);
listarella = STRUCT([T([1])([-3]) ,listarella]);

var baseLiv1 = STRUCT([baseFrontLiv1, baseScalaLiv1, listarella]);

var frontInf1 = SIMPLEX_GRID([
  [3],
  [0.25],
  [-0.5,3.30]
  ]);

var frontInf2 = SIMPLEX_GRID([
  [-3, 2],
  [0.25],
  [-0.5,1.10, -2, 0.2]
  ]);

var frontInf3 = SIMPLEX_GRID([
  [-3, 0.25],
  [3],
  [-0.5,3.30]
  ]);

var frontInf4 = SIMPLEX_GRID([
  [-8,1.5],
  [0.25],
  [-0.5,3.3]
  ]);

var frontInf5 = SIMPLEX_GRID([
  [-9.5,1.5],
  [0.25],
  [-0.5,1.83,-0.95,0.52]
  ]);

var frontInf6 = SIMPLEX_GRID([
  [-11,0.25],
  [3],
  [-0.5,1.47+3.3]
  ]);

var latoPort = STRUCT([T([1])([-6]), frontInf6, T([0])([3-0.25]), frontInf6 ]);
var frontInfLatoScala = STRUCT([T([1])([-3]), frontInf4, frontInf5, R([0,1])([PI]),T([0,1])([-25,-0.25]), frontInf4, frontInf5]);
var frontInfSx = STRUCT([frontInf1, frontInf2,  T([0])([5]), frontInf1, T([1])([-3]), frontInf3, T([0])([9-0.25]), frontInf3 ]);
var frontInfDx = STRUCT([T([0])([17]), frontInf1, frontInf2,  T([0])([5]), frontInf1 ]);

var domain = PROD1x1([INTERVALS(1)(10),INTERVALS(1)(10)]);
var c1 = CUBIC_HERMITE(S0)([[0.25,0,0],[0.25,-7,0],[0,0,0],[0,0,0]]);
var c2 = CUBIC_HERMITE(S0)([[0,0,0],[0,-7,0],[0,0,0],[0,0,0]]);
var c3 = CUBIC_HERMITE(S0)([[0.25,0,3.3+1.47],[0.25,-7,1.47],[0,0,0],[0,0,0]]);
var c4 = CUBIC_HERMITE(S0)([[0,0,3.3+1.47],[0,-7,1.47],[0,0,0],[0,0,0]]);
var sur1 = CUBIC_HERMITE(S1)([c1,c3,[0,0,0],[0,0,0]]);
var sur2 = CUBIC_HERMITE(S1)([c2,c4,[0,0,0],[0,0,0]]);
var sur3 = CUBIC_HERMITE(S1)([c4,c3,[0,0,0],[0,0,0]]);
var outSur1 = MAP(sur1)(domain);
var outSur2 = MAP(sur2)(domain);
var outSur3 = MAP(sur3)(domain);
var scorrimano = STRUCT([T([0,1,2])([11, -6, 0.5]), outSur1, outSur2, outSur3, T([0])([3-0.25]), outSur1, outSur2, outSur3 ]);

var tappoScale = SIMPLEX_GRID([[0.25],[0.10],[1.47]]);
var tappoScale = STRUCT([T([0,1,2])([11, -13, 0.5]), tappoScale, T([0])([3-0.25]), tappoScale ]);



var creaScalini = function(num){
  var i = 0;
  var j= 0;
  var k=0;
  for (i=0; i<num; i++){
    var scalino = SIMPLEX_GRID([[-11.25,2.50],[0.46],[0.22] ]);
    scalino = STRUCT([ T([1,2])([-6-k,3.3-j]) ,scalino ]);
    k=k+0.46;
    j=j+0.22;
    DRAW(scalino);
  }
}

creaScalini(15);

tappoScale = COLOR([1,0.98,0.803,1])(tappoScale);
scorrimano = COLOR([1,0.98,0.803,1])(scorrimano);
latoPort = COLOR([1,0.98,0.803,1])(latoPort);
frontInfSx = COLOR([1,0.827,0.607,1])(frontInfSx);
frontInfDx = COLOR([1,0.827,0.607,1])(frontInfDx);
frontInfLatoScala = COLOR([1,0.827,0.607,1])(frontInfLatoScala);

DRAW(base);
DRAW(frontInfSx);
DRAW(frontInfDx);
DRAW(frontInfLatoScala);
DRAW(latoPort);
DRAW(scorrimano);
DRAW(tappoScale);
DRAW(baseLiv1);


/* lato sinistro inferiore */
var latoSxInf = SIMPLEX_GRID([[0.25],[18],[-0.5,3.3] ]);
latoSxInf = COLOR([1,0.827,0.607,1])(latoSxInf);
latoInf = STRUCT([latoSxInf,T([0])([25-0.25]), latoSxInf]);

DRAW(latoInf);

/*lato posteriore inferiore */
var latoPostInfCentr = SIMPLEX_GRID([[-8,9],[-17.75,0.25],[-0.5,3.3]]);
latoPostInfCentr = COLOR([1,0.827,0.607,1])(latoPostInfCentr);
var latoPostInf = STRUCT([latoPostInfCentr, T([1])([18-0.25]) ,frontInfSx, frontInfDx]);
DRAW(latoPostInf);

/* persiana inferiore */
var steccaPicc = SIMPLEX_GRID([[-3,0.45],[0.25],[-0.5,-1.1,2] ]);
var steccaGrande = SIMPLEX_GRID([[-3,0.5],[0.25],[-0.5,-1.1,2] ]);
var ferroVert = SIMPLEX_GRID([[-3,-0.45,0.05],[0.25],[-0.5,-1.1,2]]);

steccaGrande = COLOR([0.545,0.27,0,1])(steccaGrande);
steccaPicc = COLOR([0.545,0.27,0,1])(steccaPicc);
ferroVert = COLOR([0,0,0,1])(ferroVert);

var persiana = STRUCT([steccaPicc, ferroVert, T([0])([0.5]), steccaPicc, ferroVert, T([0])([0.5]), steccaPicc, ferroVert, T([0])([0.5]), steccaGrande ]);
var persiana2 = STRUCT([T([0])([17]), persiana ]);
var persiana3 = STRUCT([T([1])([18-0.25]), persiana]);
var persiana4 = STRUCT([T([1])([18-0.25]), persiana2]);

DRAW(persiana);
DRAW(persiana2);
DRAW(persiana3);
DRAW(persiana4);

/*vetro inferiore */
var vetroInf = SIMPLEX_GRID([[-8,-1.5,1.5],[0.25],[-0.5,-1.83,0.95]]);
vetroInf = COLOR([0.117,0.5647,1,0.7])(vetroInf);
vetroInf = BOUNDARY(vetroInf);
vetrataInf = STRUCT([T([1])([-3]), vetroInf, T([0])([4.5]), vetroInf]);

DRAW(vetrataInf);

/* bordo */
var bordoInfSx = SIMPLEX_GRID([[8],[0.5],[-0.5,-3.3,0.25]]);
bordoInfSx = STRUCT([T([1])([-0.25]), bordoInfSx]);
bordoInfSx = COLOR([1,0.98,0.803,1])(bordoInfSx);

var bordoInfDx = STRUCT([T([0])([17]), bordoInfSx]);

DRAW(bordoInfSx);
DRAW(bordoInfDx);

var bordoFrontInf = SIMPLEX_GRID([[-8,3],[0.5],[-0.5,-3.3,0.25]]);
bordoFrontInf = COLOR([1,0.98,0.803,1])(bordoFrontInf);
var bordoFrontInfSx = STRUCT([T([1])([-3.25]), bordoFrontInf ]);

var bordoFrontInfDx = STRUCT([T([0])([6]), bordoFrontInfSx]);

DRAW(bordoFrontInfDx);
DRAW(bordoFrontInfSx);

var bordoLatInf = SIMPLEX_GRID([[-7.75,0.5],[3.25],[-0.5,-3.3,0.25]]);
bordoLatInf = COLOR([1,0.98,0.803,1])(bordoLatInf);
var bordoLatInfSx = STRUCT([T([1])([-3.25]), bordoLatInf]);
var bordoLatInfDx = STRUCT([T([0])([9]), bordoLatInfSx]);

DRAW(bordoLatInfSx);
DRAW(bordoLatInfDx);

var bordoSupSx = STRUCT([T([2])([1.10]) ,bordoFrontInfSx]);
var bordoSupDx = STRUCT([T([2])([1.10]) ,bordoFrontInfDx]);
var bordoSupLatSx = STRUCT([T([2])([1.10]) ,bordoInfSx]);
var bordoSupLatDx = STRUCT([T([2])([1.10]) ,bordoInfDx]);
var bordoSupLateralSx = STRUCT([T([2])([1.10]) ,bordoLatInfSx]);
var bordoSupLateralDx = STRUCT([T([2])([1.10]) ,bordoLatInfDx]);

DRAW(bordoSupSx);
DRAW(bordoSupDx);
DRAW(bordoSupLatSx);
DRAW(bordoSupLatDx);
DRAW(bordoSupLateralSx);
DRAW(bordoSupLateralDx);

/* muro tra i due cornicioni */
var muretto = SIMPLEX_GRID([[8],[0.25],[-0.5,-3.3,-0.25,1.1]]);
muretto = COLOR([1,0.827,0.607,1])(muretto);
var muretto2  = STRUCT([T([0])([17]), muretto]);

var murettoLat = SIMPLEX_GRID([[0.25],[18],[-0.5,-3.3,1.35]]);
murettoLat = COLOR([1,0.827,0.607,1])(murettoLat);
var murettiLat = STRUCT([murettoLat, T([0])([25-0.25]), murettoLat]);

var murettoPost = SIMPLEX_GRID([[25],[-17.75,0.25],[-0.5,-3.3,1.35]]);
murettoPost = COLOR([1,0.827,0.607,1])(murettoPost);

DRAW(murettoPost);
DRAW(murettiLat);
DRAW(muretto);
DRAW(muretto2);

/* colonne */
var colonna = SIMPLEX_GRID([[-8,0.735],[0.735],[-0.5,-3.3,4.96]]);
colonna = COLOR([1,0.98,0.803,1])(colonna);
var colonnato = STRUCT([T([1])([-3]), colonna, T([0])([3]), colonna,T([0])([3-0.735]), colonna, T([0])([3]), colonna ]);

DRAW(colonnato);

var colonnatoPorta = STRUCT([T([0,1])([3,-0.2]), colonna,T([0])([3-0.735]), colonna]);

DRAW(colonnatoPorta);

/* pomello */


var domain = INTERVALS(1)(32);
var controlpoints = [[0.09,0,0],[0.4,0,0.4],[-0.2,0,0.5],[0.4,0,0.6],[0.09,0,0.9]];
var curveMapping = BEZIER(S0)(controlpoints);
var curve = MAP(curveMapping)(domain);

var domain2 = DOMAIN([[0,1],[0,2*PI]])([20,20]);
var pomello = ROTATIONAL_SURFACE(curveMapping);
var surface = MAP(pomello)(domain2);
var surface3 = surface;
surface3 = COLOR([1,0.98,0.803,1])(surface3);

surface = STRUCT([T([0,1,2])([8,-0.5,0.5+3.3+0.2]), surface, T([1])([-0.75]), surface , T([1])([-0.75]), surface]);
surface = COLOR([1,0.98,0.803,1])(surface);

var surface2 = STRUCT([T([0])([9]), surface]);

surface3 = STRUCT([T([0,1,2])([9, -3, 0.5+3.3+0.2]), surface3 ,T([0])([ 0.75]), surface3 , T([0])([0.75]), surface3 ]);

var surface4 = STRUCT([T([0])([5.5]), surface3]);

DRAW(surface4);
DRAW(surface2);
DRAW(surface); 
DRAW(surface3);



/* muro interno */
var muroInt = SIMPLEX_GRID([[-8,3],[0.25],[-3.3,1.85]]);  
muroInt = COLOR([1,0.827,0.607,1])(muroInt);

var muroInt2 = STRUCT([T([0])([6]), muroInt]);

DRAW(muroInt2);
DRAW(muroInt);

var muroInt3 = SIMPLEX_GRID([[-8,3],[0.25],[-3.3,-1.85, 3.67]]);  
muroInt3 = COLOR([1,0.827,0.607,1])(muroInt3);

var muroInt4 = STRUCT([T([0])([6]), muroInt3]);

DRAW(muroInt3);
DRAW(muroInt4);

/* muro medio */
var muroMed = SIMPLEX_GRID([[3],[0.25],[-3.3,-1.85,3.67]]);  
muroMed = COLOR([1,0.827,0.607,1])(muroMed);

var muroMed2 = STRUCT([T([0])([5]), muroMed]);
var muroMed3 = STRUCT([T([0])([17]), muroMed]);
var muroMed4 = STRUCT([T([0])([22]), muroMed]);

var muroMedCentMed = SIMPLEX_GRID([[-8,9],[-17.75,0.25],[-3.3,-1.85,3.67]]);  
muroMedCentMed = COLOR([1,0.827,0.607,1])(muroMedCentMed);

var muroPostMedio = STRUCT([muroMedCentMed, T([1])([18-0.25]), muroMed, muroMed2, muroMed3, muroMed4]);

DRAW(muroPostMedio);
DRAW(muroMed2);
DRAW(muroMed);
DRAW(muroMed3);
DRAW(muroMed4);

var muroMedLat = SIMPLEX_GRID([[0.25],[1,-2,4,-2,5,-2,2],[-3.3,-1.85,3.67]]);  
muroMedLat = COLOR([1,0.827,0.607,1])(muroMedLat);
muroMedLat = STRUCT([muroMedLat, T([0])([24.75]), muroMedLat]);

DRAW(muroMedLat); 
/* rifinitura finestra */
var colonnina = SIMPLEX_GRID([[0.15],[0.35],[-0.5,-3.3,-0.25,-1.1,3.87]]);
colonnina = COLOR([1,0.98,0.803,1])(colonnina);
var colonnine = STRUCT([T([0,1])([3,-0.15]), colonnina, T([0])([5-3-0.15]), colonnina, T([0])([20-3-5+3.15]), colonnina, T([0])([22-0.15-3-5+3.15-20+3+5-3.15]), colonnina]);
var colonninePost = STRUCT([T([1])([18-0.1]), colonnine]);

DRAW(colonninePost);
DRAW(colonnine);

var coloLat = SIMPLEX_GRID([[0.40],[0.15],[-0.5,-3.3,-0.25,-1.1,3.87]]);  
coloLat = COLOR([1,0.98,0.803,1])(coloLat);
var colonnatoLat= STRUCT([T([0,1])([-0.15,1]), coloLat, T([1])([3-0.15-1]), coloLat, T([1])([7-1-3+1.15]), coloLat, T([1])([9-0.15-1-3+1.15-7+1+3-1.15]), coloLat ]);
var colonnatoLat2 = STRUCT([T([0,1])([-0.15,14]), coloLat, T([1])([16-0.15-14]), coloLat]);

DRAW(colonnatoLat);
DRAW(colonnatoLat2);

var colonnatoLatSx = STRUCT([T([0])([0.15+25-0.25]), colonnatoLat, colonnatoLat2]);

DRAW(colonnatoLatSx);

var sopraFin = SIMPLEX_GRID([[2],[0.4],[0.2]]);
sopraFin = COLOR([1,0.98,0.803,1])(sopraFin);

var domain = PROD1x1([INTERVALS(1)(10),INTERVALS(1)(10)]);
var c1 = CUBIC_HERMITE(S0)([[0,0,0.2],[2,0,0.2],[0,0,0],[0,0,0]]);
var c2 = CUBIC_HERMITE(S0)([[0,0.4,0.2],[2,0.4,0.2],[0,0,0],[0,0,0]]);
var c3 = CUBIC_HERMITE(S0)([[-0.2,0,0.4],[2.2,0,0.4],[0,0,0],[0,0,0]]);
var c4 = CUBIC_HERMITE(S0)([[-0.2,0.4,0.4],[2.2,0.4,0.4],[0,0,0],[0,0,0]]);
var c5 = CUBIC_HERMITE(S0)([[0,0,0.2],[0,0.4,0.2],[0,0,0],[0,0,0]]);
var c6 = CUBIC_HERMITE(S0)([[-0.2,0,0.4],[-0.2,0.4,0.4],[0,0,0],[0,0,0]]);
var c7 = CUBIC_HERMITE(S0)([[2,0,0.2],[2,0.4,0.2],[0,0,0],[0,0,0]]);
var c8 = CUBIC_HERMITE(S0)([[2.2,0,0.4],[2.2,0.4,0.4],[0,0,0],[0,0,0]]);
var sur1 = CUBIC_HERMITE(S1)([c1,c3,[0,0,0],[0,0,0]]);
var sur2 = CUBIC_HERMITE(S1)([c2,c4,[0,0,0],[0,0,0]]);
var sur3 = CUBIC_HERMITE(S1)([c4,c3,[0,0,0],[0,0,0]]);
var sur4 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
var sur5 = CUBIC_HERMITE(S1)([c5,c6,[0,0,0],[0,0,0]]);
var sur6 = CUBIC_HERMITE(S1)([c7,c8,[0,0,0],[0,0,0]]);
var outSur1 = MAP(sur1)(domain);
var outSur2 = MAP(sur2)(domain);
var outSur3 = MAP(sur3)(domain);
var outSur4 = MAP(sur4)(domain);
var outSur5 = MAP(sur5)(domain);
var outSur6 = MAP(sur6)(domain);
var trapFin = STRUCT([ outSur1, outSur2, outSur3, outSur4, outSur5, outSur6 ]);

var sopraFinestre = STRUCT([T([0,1,2])([3,-0.15,0.5+3.3+0.25+1.1+3.67]), sopraFin, trapFin]);
sopraFinestre = COLOR([1,0.98,0.803,1])(sopraFinestre);

DRAW(sopraFinestre);

var sopraFinestre2 = STRUCT([T([0])([17]) ,sopraFinestre]);

DRAW(sopraFinestre2);

var sopraFinestrePost = STRUCT([T([1])([18-0.1]) ,sopraFinestre,T([0])([17]) ,sopraFinestre]);

DRAW(sopraFinestrePost);

var sopraFinestreLat = STRUCT([T([0,1,2])([1,-0.25,0.5+3.3+0.25+1.1+3.67 ]), sopraFin, trapFin, T([0])([6]), sopraFin, trapFin , T([0])([7]), sopraFin, trapFin ]);
sopraFinestreLat = R([0,1])([PI/2])(sopraFinestreLat);
sopraFinestreLat = COLOR([1,0.98,0.803,1])(sopraFinestreLat);

DRAW(sopraFinestreLat);

var sopraFinestreLat2 = STRUCT([T([0])([25-0.1]), sopraFinestreLat]);

DRAW(sopraFinestreLat2);

var sopraPor = SIMPLEX_GRID([[3],[0.5],[0.5]]);
sopraPor = COLOR([1,0.98,0.803,1])(sopraPor);

var domain = PROD1x1([INTERVALS(1)(10),INTERVALS(1)(10)]);
var c1 = CUBIC_HERMITE(S0)([[0,0,0.5],[3,0,0.5],[0,0,0],[0,0,0]]);
var c2 = CUBIC_HERMITE(S0)([[0,0.5,0.5],[3,0.5,0.5],[0,0,0],[0,0,0]]);
var c3 = CUBIC_HERMITE(S0)([[-0.5,0,1],[3.5,0,1],[0,0,0],[0,0,0]]);
var c4 = CUBIC_HERMITE(S0)([[-0.5,0.5,1],[3.5,0.5,1],[0,0,0],[0,0,0]]);
var c5 = CUBIC_HERMITE(S0)([[0,0,0.5],[0,0.5,0.5],[0,0,0],[0,0,0]]);
var c6 = CUBIC_HERMITE(S0)([[-0.5,0,1],[-0.5,0.5,1],[0,0,0],[0,0,0]]);
var c7 = CUBIC_HERMITE(S0)([[3,0,0.5],[3,0.5,0.5],[0,0,0],[0,0,0]]);
var c8 = CUBIC_HERMITE(S0)([[3.5,0,1],[3.5,0.5,1],[0,0,0],[0,0,0]]);

var c9 = CUBIC_HERMITE(S0)([[0,0,1],[1.5,0,2],[0,0,0],[0,0,0]]);
var c10 = CUBIC_HERMITE(S0)([[0,0.5,1],[1.5,0.5,2],[0,0,0],[0,0,0]]);
var c11= CUBIC_HERMITE(S0)([[-0.5,0,1],[1.5,0,2.5],[0,0,0],[0,0,0]]);
var c12= CUBIC_HERMITE(S0)([[-0.5,0.5,1],[1.5,0.5,2.5],[0,0,0],[0,0,0]]);

var sur1 = CUBIC_HERMITE(S1)([c1,c3,[0,0,0],[0,0,0]]);
var sur2 = CUBIC_HERMITE(S1)([c2,c4,[0,0,0],[0,0,0]]);
var sur3 = CUBIC_HERMITE(S1)([c4,c3,[0,0,0],[0,0,0]]);
var sur4 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
var sur5 = CUBIC_HERMITE(S1)([c5,c6,[0,0,0],[0,0,0]]);
var sur6 = CUBIC_HERMITE(S1)([c7,c8,[0,0,0],[0,0,0]]);

var sur7 = CUBIC_HERMITE(S1)([c9,c10,[0,0,0],[0,0,0]]);
var sur8 = CUBIC_HERMITE(S1)([c11,c12,[0,0,0],[0,0,0]]);
var sur9 = CUBIC_HERMITE(S1)([c9,c11,[0,0,0],[0,0,0]]);
var sur10 = CUBIC_HERMITE(S1)([c10,c12,[0,0,0],[0,0,0]]);
var outSur1 = MAP(sur1)(domain);
var outSur2 = MAP(sur2)(domain);
var outSur3 = MAP(sur3)(domain);
var outSur4 = MAP(sur4)(domain);
var outSur5 = MAP(sur5)(domain);
var outSur6 = MAP(sur6)(domain);

var outSur7 = MAP(sur7)(domain);
var outSur8 = MAP(sur8)(domain);
var outSur9 = MAP(sur9)(domain);
var outSur10 = MAP(sur10)(domain);

var triangPort = STRUCT([outSur7, outSur8,outSur9,outSur10]);
var trapFin = STRUCT([ outSur1, outSur2, outSur3, outSur4, outSur5, outSur6,triangPort, R([0,1])([PI]), T([0,1])([-1.3-1.7,-0.5]), triangPort ]);
trapFin = COLOR([1,0.98,0.803,1])(trapFin);

var sopraPorta = STRUCT([T([0,1,2])([11, -0.2, 0.5+3.23+1.1+3.67]) ,sopraPor, trapFin]);

DRAW(sopraPorta);

/* sopra colonna */
var sopraCol = SIMPLEX_GRID([[-7.85,3.9],[1],[-0.25,-3.3,-4.96,0.25]]);
sopraCol = COLOR([1,0.98,0.803,1])(sopraCol);

sopraCol = STRUCT([T([1])([-3.15]), sopraCol,T([0])([6.15-0.75]), sopraCol]);

DRAW(sopraCol);

var sopraColLat = SIMPLEX_GRID([[-7.85,0.5],[3-0.35],[-0.25,-3.3,-4.96,0.25]]);
sopraColLat = COLOR([1,0.98,0.803,1])(sopraColLat);

sopraColLat = STRUCT([T([1])([-2.65]), sopraColLat,T([0])([9-0.2]), sopraColLat]);

DRAW(sopraColLat);

/* muro alto tra finestre */
var muroAlto = SIMPLEX_GRID([[25],[0.25],[-3.3,-1.85,-3.67,2.72]]);
muroAlto = COLOR([1,0.827,0.607,1])(muroAlto);
var muroAltoLat = SIMPLEX_GRID([[0.25],[18],[-3.3,-1.85,-3.67,2.72,1.838]]);
muroAltoLat = COLOR([1,0.827,0.607,1])(muroAltoLat);

var muriAlti = STRUCT([muroAlto, T([1])([18-0.25]), muroAlto, T([1])([-17.75]), muroAltoLat, T([0])([25-0.25]), muroAltoLat ]);
DRAW(muriAlti);

/* muro  piu alto */
var muroSottoTetto = SIMPLEX_GRID([[3,-2,3,9,3,-2,3],[0.25],[-3.3,-1.85,-3.67,-2.72,1.838]]);
muroSottoTetto = COLOR([1,0.827,0.607,1])(muroSottoTetto);
muroSottoTetto = STRUCT([muroSottoTetto, T([1])([18-0.25]), muroSottoTetto]);

DRAW(muroSottoTetto);

var muroSottoCornicione = SIMPLEX_GRID([[25],[0.25],[-3.3,-1.85,-3.67,-2.72,-1.838,0.45]]);
muroSottoCornicione = COLOR([1,0.827,0.607,1])(muroSottoCornicione);
muroSottoCornicione = STRUCT([muroSottoCornicione, T([1])([18-0.25]), muroSottoCornicione]);

var muroSottoCornicione2 = SIMPLEX_GRID([[0.25],[18],[-3.3,-1.85,-3.67,-2.72,-1.838,0.45]]);
muroSottoCornicione2 = COLOR([1,0.827,0.607,1])(muroSottoCornicione2);
muroSottoCornicione2 = STRUCT([muroSottoCornicione2, T([0])([25-0.25]), muroSottoCornicione2]);

DRAW(muroSottoCornicione2);
DRAW(muroSottoCornicione);

/* muro alto porticato */
var muroPortLat = SIMPLEX_GRID([[-8, 0.25,],[3],[-8.76,5.068]]);
muroPortLat = COLOR([1,0.827,0.607,1])(muroPortLat);
muroPortLat = STRUCT([T([1])([-3]), muroPortLat, T([0])([9-0.25]), muroPortLat]);

DRAW(muroPortLat);

var muroPortFront = SIMPLEX_GRID([[-8.25,3-0.25],[0.25],[-8.76,2.78]]);
muroPortFront = COLOR([1,0.827,0.607,1])(muroPortFront);
muroPortFront = STRUCT([T([1])([-3]), muroPortFront, T([0])([6-0.25]), muroPortFront]);

DRAW(muroPortFront);

var muroBordoFin = SIMPLEX_GRID([[-8,1],[0.25],[-11.54,1.838]]);
muroBordoFin = COLOR([1,0.827,0.607,1])(muroBordoFin);
muroBordoFin = STRUCT([T([1])([-3]), muroBordoFin, T([0])([8]), muroBordoFin]);

DRAW(muroBordoFin);

var muroUnderCorn = SIMPLEX_GRID([[-8,3],[0.25],[-11.54,-1.838,0.45]]);
muroUnderCorn = COLOR([1,0.827,0.607,1])(muroUnderCorn);
muroUnderCorn = STRUCT([T([1])([-3]), muroUnderCorn, T([0])([6]), muroUnderCorn]);

DRAW(muroUnderCorn);

/* sopra arco */
var c1 = CUBIC_HERMITE(S0)([[11,-3,8.76],[14,-3,8.76],[0,0,6],[0,0,-6]]);
var c2 = CUBIC_HERMITE(S0)([[11,-3,13.828],[14,-3,13.828],[0,0,0],[0,0,0]]);
var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
var outSur1 = MAP(sur1)(domain);
outSur1 = COLOR([1,0.827,0.607,1])(outSur1);

DRAW(outSur1);

/* gradino sotto tetto */
var gradTetto = SIMPLEX_GRID([[25.5],[18.5],[-13.828,0.25]]);
gradTetto = COLOR([1,0.98,0.803,1])(gradTetto);
gradTetto = STRUCT([T([0,1])([-0.25, -0.25]), gradTetto]);
DRAW(gradTetto);

var gradTetto2 = SIMPLEX_GRID([[-7.75, 9.5],[3],[-13.828,0.25]]);
gradTetto2 = COLOR([1,0.98,0.803,1])(gradTetto2);
gradTetto2 = STRUCT([T([1])([-3.25]), gradTetto2]);
DRAW(gradTetto2);

/* finestre alte */
var finAlta = SIMPLEX_GRID([[2],[0.25],[-11.54,1.838]]);
finAlta = COLOR([0.117,0.5647,1,0.7])(finAlta);
finAlta = BOUNDARY(finAlta);
finAlta = STRUCT([T([0])([3]), finAlta, T([1])([18-0.25]), finAlta, T([0])([17]), finAlta, T([1])([-17.75]), finAlta, T([0,1])([-6, -3]), finAlta, T([0])([-5]), finAlta ]);

DRAW(finAlta);

/* persiana superiore */
var ferro = SIMPLEX_GRID([[0.05],[0.25],[3.67]]);
ferro = COLOR([0,0,0,1])(ferro);
var persLat = SIMPLEX_GRID([[0.5],[0.25],[3.67]]);
persLat = COLOR([0.545,0.27,0,1])(persLat);
var persCent = SIMPLEX_GRID([[0.6],[0.25],[3.67]]);
persCent = COLOR([0.545,0.27,0,1])(persCent);

var persiana = STRUCT([persLat, T([0])([0.5]), ferro, T([0])([0.05]), persCent, T([0])([0.6]), ferro, T([0])([0.05]), persLat]);

var persianeFront = STRUCT([T([0,2])([3.15,5.15]), persiana, T([0])([17]), persiana]);
var persianePost = STRUCT([T([1])([18-0.25]), persianeFront]);

var ferroLat = SIMPLEX_GRID([[0.25],[0.05],[3.67]]);
ferroLat = COLOR([0,0,0,1])(ferroLat);
var persLatLat = SIMPLEX_GRID([[0.25],[0.5],[3.67]]);
persLatLat = COLOR([0.545,0.27,0,1])(persLatLat);
var persCentLat = SIMPLEX_GRID([[0.25],[0.6],[3.67]]);
persCentLat = COLOR([0.545,0.27,0,1])(persCentLat);

var persianaLat = STRUCT([persLatLat, T([1])([0.5]), ferroLat, T([1])([0.05]), persCentLat, T([1])([0.6]), ferroLat, T([1])([0.05]), persLatLat ]);
var persianeLat = STRUCT([T([1,2])([1.15,5.15]), persianaLat, T([1])([6]), persianaLat , T([1])([7]), persianaLat]);

var persianeLat2 = STRUCT([T([0])([25-0.25]), persianeLat]);

DRAW(persianeLat2);
DRAW(persianePost);
DRAW(persianeFront);
DRAW(persianeLat);

/* portone */
var portone = SIMPLEX_GRID([[-11,3],[0.10],[-3.55,5]]);
portone = COLOR([0.557,0.137,0.137,1])(portone);

DRAW(portone);

/* mattoncino sotto al tetto */
var mattoncino = SIMPLEX_GRID([[0.1],[0.5],[0.25]]);
mattoncino = COLOR([1,0.98,0.803,1])(mattoncino);

mattoni = STRUCT([T([1,2])([-0.5, 14.078]), mattoncino, T([0])([0.4]), mattoncino, T([0])([0.4]), mattoncino, T([0])([0.4]), mattoncino
  , T([0])([0.4]), mattoncino, T([0])([0.4]), mattoncino, T([0])([0.4]), mattoncino, T([0])([0.4]), mattoncino, T([0])([0.4]), mattoncino,
  , T([0])([0.4]), mattoncino , T([0])([0.4]), mattoncino, T([0])([0.4]), mattoncino, T([0])([0.4]), mattoncino, T([0])([0.4]), mattoncino
  , T([0])([0.4]), mattoncino, T([0])([0.4]), mattoncino, T([0])([0.4]), mattoncino, T([0])([0.4]), mattoncino, T([0])([0.4]), mattoncino
  , T([0])([0.4]), mattoncino ]);

var mattoni2 = STRUCT([T([0])([17.30]), mattoni]);
var mattoni3 = STRUCT([T([0,1])([8,-3]), mattoni, T([0,1,2])([8,-0.5,14.078]), mattoncino, T([0])([0.4]), mattoncino, T([0])([0.4]), mattoncino]);

DRAW(mattoni3);
DRAW(mattoni2);
DRAW(mattoni);

var gradTetto3 = STRUCT([T([2])([0.25]), gradTetto]);
var gradTetto4 = STRUCT([T([2])([0.25]), gradTetto2]);

DRAW(gradTetto3);
DRAW(gradTetto4);

var tettoInf = SIMPLEX_GRID([[25.50],[18.75],[0.25]]);
tettoInf = STRUCT([T([0,1,2])([-0.25, -0.5,14.328]), tettoInf]);
tettoInf = COLOR([1,0.98,0.803,1])(tettoInf);


var tettoInf2 = SIMPLEX_GRID([[9.50],[3],[0.25]]);
tettoInf2 = STRUCT([T([0,1,2])([8-0.25, -3.5,14.328]), tettoInf2]);
tettoInf2 = COLOR([1,0.98,0.803,1])(tettoInf2);


DRAW(tettoInf);
DRAW(tettoInf2);

/* tetto */
var c1 = CUBIC_HERMITE(S0)([[7.75,-3.25,14.578],[17.25,-3.25,14.578],[0,0,0],[0,0,0]]);
var c2 = CUBIC_HERMITE(S0)([[7.75,-3.25,14.578],[12.5,-3.25,17.578],[0,0,0],[0,0,0]]);

var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
var outSur1 = MAP(sur1)(domain);
outSur1 = COLOR([1,0.98,0.803,1])(outSur1);

var c3 = CUBIC_HERMITE(S0)([[7.75,-3.5,14.578],[12.5,-3.5,17.578],[0,0,0],[0,0,0]]);
var c4 = CUBIC_HERMITE(S0)([[7.75,-3.5,14.578+0.25],[12.5,-3.5,17.578+0.25],[0,0,0],[0,0,0]]);
var c5 = CUBIC_HERMITE(S0)([[7.75,-3.25,14.578],[12.5,-3.25,17.578],[0,0,0],[0,0,0]]);

var sur2 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
var outSur2 = MAP(sur2)(domain);
outSur2 = COLOR([1,0.98,0.803,1])(outSur2);

var sur3 = CUBIC_HERMITE(S1)([c3,c5,[0,0,0],[0,0,0]]);
var outSur3 = MAP(sur3)(domain);
outSur3 = COLOR([1,0.98,0.803,1])(outSur3);


var c6 = CUBIC_HERMITE(S0)([[7.75,-3.5,14.578],[7.75,8,14.578],[0,0,0],[0,0,0]]);
var c7 = CUBIC_HERMITE(S0)([[7.75,-3.5,14.578+0.25],[7.75,8,14.578+0.25],[0,0,0],[0,0,0]]);

var sur4 = CUBIC_HERMITE(S1)([c6,c7,[0,0,0],[0,0,0]]);
var outSur4 = MAP(sur4)(domain);
outSur4 = COLOR([1,0.98,0.803,1])(outSur4);

var c8 = CUBIC_HERMITE(S0)([[12.5,-3.5,17.578+0.25],[12.5,8,17.578+0.25],[0,0,0],[0,0,0]]);
var sur5 = CUBIC_HERMITE(S1)([c7,c8,[0,0,0],[0,0,0]]);
var outSur5 = MAP(sur5)(domain);
outSur5 = COLOR([0.804,0.31,0.223,1])(outSur5);

DRAW(outSur1);

var tettoFront = STRUCT([outSur2,outSur3,outSur4,outSur5]);

var tettoFront2 = STRUCT([R([0,1])(PI), T([0,1])([-25,-4.5]) ,tettoFront]);

DRAW(tettoFront);
DRAW(tettoFront2);

var c3 = CUBIC_HERMITE(S0)([[17.25,-3.5,14.578],[12.5,-3.5,17.578],[0,0,0],[0,0,0]]);
var c4 = CUBIC_HERMITE(S0)([[17.25,-3.5,14.578+0.25],[12.5,-3.5,17.578+0.25],[0,0,0],[0,0,0]]);
var c5 = CUBIC_HERMITE(S0)([[17.25,-3.25,14.578],[12.5,-3.25,17.578],[0,0,0],[0,0,0]]);

var sur2 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
var outSur2 = MAP(sur2)(domain);
outSur2 = COLOR([1,0.98,0.803,1])(outSur2);

var sur3 = CUBIC_HERMITE(S1)([c3,c5,[0,0,0],[0,0,0]]);
var outSur3 = MAP(sur3)(domain);
outSur3 = COLOR([1,0.98,0.803,1])(outSur3);

DRAW(outSur2);
DRAW(outSur3);

var c1 = CUBIC_HERMITE(S0)([[-0.25,-0.5,14.578],[25.25,-0.5,14.578],[0,0,0],[0,0,0]]);
var c2 = CUBIC_HERMITE(S0)([[11.1215,8.15,14.578+4.411],[11.1215+2.757,8.15,14.578+4.411],[0,0,0],[0,0,0]]);
var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
var outSur1 = MAP(sur1)(domain);
outSur1 = COLOR([0.804,0.31,0.223,1])(outSur1);

DRAW(outSur1);

var c1 = CUBIC_HERMITE(S0)([[-0.25,-0.5,14.578],[-0.25,18.25,14.578],[0,0,0],[0,0,0]]);
var c2 = CUBIC_HERMITE(S0)([[11.1215,8.15,14.578+4.411],[11.1215,8.15+1.7,14.578+4.411],[0,0,0],[0,0,0]]);
var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
var outSur1 = MAP(sur1)(domain);
outSur1 = COLOR([0.804,0.31,0.223,1])(outSur1);

DRAW(outSur1);

var c1 = CUBIC_HERMITE(S0)([[-0.25,18.25,14.578],[25.25,18.25,14.578],[0,0,0],[0,0,0]]);
var c2 = CUBIC_HERMITE(S0)([[11.1215,8.15+1.7,14.578+4.411],[11.1215+2.757,8.15+1.7,14.578+4.411],[0,0,0],[0,0,0]]);
var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
var outSur1 = MAP(sur1)(domain);
outSur1 = COLOR([0.804,0.31,0.223,1])(outSur1);

DRAW(outSur1);

var c1 = CUBIC_HERMITE(S0)([[25.25,18.25,14.578],[25.25,-0.50,14.578],[0,0,0],[0,0,0]]);
var c2 = CUBIC_HERMITE(S0)([[11.1215+2.757,8.15+1.7,14.578+4.411],[11.1215+2.757,8.15,14.578+4.411],[0,0,0],[0,0,0]]);
var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
var outSur1 = MAP(sur1)(domain);
outSur1 = COLOR([0.804,0.31,0.223,1])(outSur1);

DRAW(outSur1);

var c1 = CUBIC_HERMITE(S0)([[11.1215,8.15,14.578+4.411],[11.1215,8.15+1.7,14.578+4.411],[0,0,0],[0,0,0]]);
var c2 = CUBIC_HERMITE(S0)([[11.1215+2.757,8.15,14.578+4.411],[11.1215+2.757,8.15+1.7,14.578+4.411],[0,0,0],[0,0,0]]);
var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
var outSur1 = MAP(sur1)(domain);
outSur1 = COLOR([0.804,0.31,0.223,1])(outSur1);

DRAW(outSur1);

/* prato */
var prato = SIMPLEX_GRID([[75],[80],[0.01]]);
prato = T([0,1,2])([-25,-30,-0.01])(prato);
prato = COLOR([0,0.545,0,1])(prato);

DRAW(prato);

/* comignolo */ 
var comInf = SIMPLEX_GRID([[-0.05, 0.845],[-0.05, 0.845],[1.286]]);
comInf = COLOR([1,0.827,0.607,1])(comInf);
var comMed = SIMPLEX_GRID([[0.945],[0.945],[-1.286, 0.367]]);
comMed = COLOR([1,0.827,0.607,1])(comMed);
var comSup = SIMPLEX_GRID([[-0.05, 0.845],[-0.05,0.845],[-1.286, -0.367, 1.47]]);
comSup = COLOR([1,0.827,0.607,1])(comSup);

var c1 = CUBIC_HERMITE(S0)([[-0.1,0.4725,3.8],[1.045,0.4725,3.8],[0,0,0],[0,0,0]]);
var c2 = CUBIC_HERMITE(S0)([[-0.1,-0.15,2.85],[1.045,-0.15,2.85],[0,0,0],[0,0,0]]);
var c3 = CUBIC_HERMITE(S0)([[-0.1,1.095,2.85],[1.045,1.095,2.85],[0,0,0],[0,0,0]]);
var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
var tettoCom = MAP(sur1)(domain);
tettoCom = COLOR([0.804,0.31,0.223,1])(tettoCom);

var sur2 = CUBIC_HERMITE(S1)([c1,c3,[0,0,0],[0,0,0]]);
var tettoCom2 = MAP(sur2)(domain);
tettoCom2 = COLOR([0.804,0.31,0.223,1])(tettoCom2);

var comignolo = STRUCT([comInf, comMed, comSup, tettoCom, tettoCom2]);

var comignolo1 = STRUCT([T([0,1,2])([0.25,8.5775,14.578]), comignolo]);
var comignolo2 = STRUCT([T([0,1,2])([25-0.25-0.845,8.5775,14.578]), comignolo]);
var comignolo3 = STRUCT([T([0,1,2])([11,11,17]), R([0,1])([PI/2]), comignolo, ])

DRAW(comignolo1);
DRAW(comignolo2);
DRAW(comignolo3);

