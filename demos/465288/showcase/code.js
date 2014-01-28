//ASSI
var X=0;
var Y=1;
var Z=2;

//COLORI
var nero = [0,0,0];
var neroChiaro = [0.2,0.2,0.2];
var grigioChiaro = [0.85,0.85,0.85];
var azzurroVetro = [0,0.8,1,0.8];
var azzurroVetroContachilometri = [0,0.8,1,0.4];
var rosso = [1,0,0];
var bianco = [1,1,1];
var arancio = [1,0.6,0];
var rossoScuro = [0.8,0,0];

/******************CODICE UTILE******************/
/*Funzione che trasla tutti i punti di un array della quantità indicata lungo il rispettivo asse. */
function pointTranslation(points, dx, dy, dz){
  var result = [];
  points.forEach(function(item){
    xpos = item[0]+dx;
    ypos = item[1]+dy;
    zpos = item[2]+dz
    result.push([xpos,ypos,zpos]);
  });
  return result;
}

/*Funzione che accetta un array di curve di bezier e le interpola con una superficie*/
function bezierSurfaceInterpolator(curve){
  var result = null;
  curve.forEach(function(item){
      var mappingFunc = BEZIER(S1)(item);
      var surface = MAP(mappingFunc)(domain2);
      if(result === null)
        result = surface;
      else
        result = STRUCT([result,surface]);
    });
  return result;
}

/*Funzione che accetta come fattori di scala solo valori positivi, maggiori di 1 per ingrandire
e minori di 1 per rimpicciolire. Con valori negativi ribalta la figura sul quadrante opposto*/
function getScaledObject(scaleFactor, obj){
  obj = S([X,Y,Z])([scaleFactor,scaleFactor,scaleFactor])(obj);
  return obj;
}


/*Funzione che crea una mezza sfera. Prende come parametri il raggio, il numero di "paralleli", e il colore.*/
function drawCup(r,color,domainCup) {
    var domain = domainCup;
    var mapping = function(p) {
        var u = p[0];
        var v = p[1];
        return [r*COS(u)*COS(v),r*COS(u)*SIN(v),r*SIN(u)];
    }
    var cup = MAP(mapping)(domain);
    return COLOR(color)(cup);
}

/*Funzione che dato un punto avvicina tutti i punti di controllo dell'array controlPoints al punto dato*/
function controlPointsReducer(point, controlPoints){
  var result = [];
  controlPoints.forEach(function(item){
    xpos = (point[0]+item[0])/2;
    ypos = (point[1]+item[1])/2;
    result.push([xpos,ypos,0]);
  });
  return result;
}

/*Funzione che dato un array di punti li moltiplica tutti per un fattore di scala*/
function pointScale(controlPoints,scaleFactor){
  var result = [];
  controlPoints.forEach(function(item){
    xpos = item[0]*scaleFactor;
    ypos = item[1]*scaleFactor;
    zpos = item[2]*scaleFactor;
    result.push([xpos,ypos,zpos]);
  });
  return result;
}


/*Funzione che ruota tutti i punti di un array, dell'angolo indicato, sull'asse indicato.*/
function pointRotation(points, degree, axis){
  var rm;
  if(axis===X)
    rm = [[1,0,0],[0,COS(degree),-SIN(degree)],[0,SIN(degree),COS(degree)]];
  if(axis===Y)
    rm = [[COS(degree),0,SIN(degree)],[0,1,0],[-SIN(degree),0,COS(degree)]];
  if(axis===Z)
    rm = [[COS(degree),-SIN(degree),0],[SIN(degree),COS(degree),0],[0,0,1]];
  return points.map(function(item){
      return prodottoMatVect(rm,item);
    });
}

/*Funzione che fa il prodotto tra una matrice e un vettore.*/
function prodottoMatVect(mat, vect){
  var result = [];
  mat.forEach(function(item){
    result.push(item[0]*vect[0]+item[1]*vect[1]+item[2]*vect[2])
  });
  return result;
}

function CYLINDER(dim){
  function CYLINDER0(intervals){
    var cylinder = DISK(dim[0])(intervals);
    cylinder = EXTRUDE([dim[1]])(cylinder);
    return cylinder;
  }
  return CYLINDER0;
}

function controlPointsAdjusterXY(controls){
    var result = [];
    controls.forEach(function(item){
        item[0]=item[0]/100;
        item[1]=item[1]/100;
        item[1]=-item[1];
        result.push(item);
    });
    return result;
}
/******************CODICE UTILE******************/

//DOMINI
var domain1 = INTERVALS(1)(36);
var domain2 = DOMAIN([[0,1],[0,1]])([36,36]);

/*********MISURE*********/
//MISURE RUOTA E RACCORDO
var raggioCopertone = 3;
var spessoreCopertone = 0.7;
var raggioCerchione = 2.6;
var spessoreCerchione = 1.15;
var larghezzaCerchione = 0.2;
var raggioCentroRuota = 0.5;
var spessoreCentroRuota = spessoreCerchione;
var raggioRaggio = 0.05;
var lunghezzaRaggio = (raggioCerchione-larghezzaCerchione);
var numRaggi = 24;
var raggioForcella = 0.3;
var lunghezzaForcella = 8;
var raggioPerno = 0.15;
var spessorePerno =  spessoreCerchione + raggioForcella*2+0.1 + raggioForcella*2+0.1;
var lunghezzaRaccordo = 3;
var altezzaRaccordo = 0.3;
var profonditàRaccordo = 1;
var raggioParafanghiAnteriore = 3.2

//MISURE RUOTA POSTERIORE
var distanzaTraRuote = 16;
var raggioSospensione = raggioForcella;
var lunghezzaSospensione = 4.2;
var larghezzaForcellaPos = raggioCentroRuota;
var lunghezzaForcellaPos = 4.8;
var spessoreForcellaPos = raggioSospensione*2;
var raggioParafanghi = 3.8
var spessoreParafanghi = 0.9


//MISURE MANUBRIO
var raggioCmd = 1.5;
var raggioManopola = 0.6;
var lunghezzaCmd = 1.8;
var lunghezzaManopola = lunghezzaCmd + 3.5;
var lunghezzaManubrio = 14

//MISURE FARO
var raggioFaro = 2;
var raggioVetro = 1.8

//MISURE CONTACHILOMETRI
var raggioContachilometri = 0.8;
var raggioQuadrante = raggioContachilometri-0.1
var altezzaContachilometri = 1.2;
var numTicks = 17;

//MISURE SERBATOIO
var raggioBocchettone = 0.2;
var spessoreBocchettone = 0.03;
/*********MISURE*********/




/*********RUOTA ANTERIORE*********/

/*********COPERTONE*********/
var domainCopertone = DOMAIN([[(1.3)*PI, (2.7)*PI],[0,2*PI]])([36,36]);
var mapping = function(v){
  var alfa = v[0];
  var beta = v[1];
  return [(spessoreCopertone*COS(alfa)+raggioCopertone)*COS(beta), (spessoreCopertone*COS(alfa)+raggioCopertone)*SIN(beta),spessoreCopertone*SIN(alfa)];
}
var copertone = MAP(mapping)(domainCopertone);
copertone = COLOR(nero)(T([Z])([spessoreCopertone-0.1])(copertone))
//DRAW(copertone);
/*********COPERTONE*********/


/*********CERCHIONE*********/
function draw_arc(r1, r2, alpha){
  var domain = DOMAIN([[0,alpha], [r1,r2]])([36,1])
  var mapping = function(v){
    var angle = v[0];
    var radius = v[1];
    return [radius*COS(angle), radius*SIN(angle)];
  }
  return MAP(mapping)(domain);
}

var arc = draw_arc(raggioCerchione-larghezzaCerchione,raggioCerchione,2*PI);
var cerchione = EXTRUDE([spessoreCerchione])(arc);

/*********RAGGI*********/
var centroRuota = CYLINDER([raggioCentroRuota, spessoreCentroRuota])(36);

var raggio = CYLINDER([raggioRaggio, lunghezzaRaggio])(36);
raggio = R([X,Z])([PI/2])(raggio);
raggio = T([Z])([0.05])(raggio);
var raggi = raggio;
raggi = STRUCT(REPLICA(numRaggi)([raggi, R([X,Y])([PI/12])]));
raggi1 = T([Z])([spessoreCentroRuota-0.1])(raggi);
raggi = STRUCT([raggi, raggi1]);

/*********RAGGI*********/

cerchione = STRUCT([cerchione, centroRuota, raggi]);
//DRAW(cerchione);
/*********CERCHIONE*********/

var pernoForcella = CYLINDER([raggioPerno, spessorePerno])(36);
pernoForcella = T([Z])([-0.7])(pernoForcella);

/*********PARAFANGHI ANTERIORE*********/
var domainParafanghiAnteriore = DOMAIN([[1.7*PI, (2.3)*PI],[-0.1*PI,0.7*PI]])([36,36]);
var mappingParafanghiAnteriore = function(v){
    var alfa = v[0];
    var beta = v[1];
    return [(spessoreParafanghi*COS(alfa)+raggioParafanghiAnteriore)*COS(beta), (spessoreParafanghi*COS(alfa)+raggioParafanghiAnteriore)*SIN(beta),spessoreParafanghi*SIN(alfa)]
}
    
var parafanghiAnteriore = MAP(mappingParafanghiAnteriore)(domainParafanghiAnteriore);
parafanghiAnteriore = COLOR(bianco)(parafanghiAnteriore);
parafanghiAnteriore = T([Z])([spessoreParafanghi-0.3])(parafanghiAnteriore);
/*********PARAFANGHI ANTERIORE*********/

ruota = STRUCT([copertone, cerchione, pernoForcella]);
//DRAW(ruota)
/*********RUOTA ANTERIORE*********/

/*********FORCELLA E RACCORDO FRONTALE*********/
var forcellaSx = CYLINDER([raggioForcella, lunghezzaForcella])(36);
forcellaSx = R([Y,Z])([1.5*PI])(forcellaSx);
forcellaSx = T([Y,Z])([-0.2,spessoreCerchione+raggioForcella+0.15])(forcellaSx);
var forcellaDx = T([Z])([-raggioForcella*2-spessoreCerchione-0.30])(forcellaSx);

var raccordoFrontale = CUBOID([profonditàRaccordo, altezzaRaccordo, lunghezzaRaccordo]);
raccordoFrontale = T([X,Y,Z])([-0.5,lunghezzaForcella-0.6,-1])(raccordoFrontale);
/*********FORCELLA E RACCORDO FRONTALE*********/

var componentiFrontali = STRUCT([forcellaSx,forcellaDx, raccordoFrontale]);
componentiFrontali = R([X,Y])([-PI/6])(componentiFrontali);
//DRAW(componentiFrontali);

/*********FORCELLE E SOSPENSIONI POSTERIORI*********/
var sospensionePosterioreSx = CYLINDER([raggioSospensione, lunghezzaSospensione])(36);
sospensionePosterioreSx = R([Y,Z])([1.5*PI])(sospensionePosterioreSx);
sospensionePosterioreSx = T([Z])([spessoreCerchione+raggioSospensione+0.15])(sospensionePosterioreSx);
var sospensionePosterioreDx = T([Z])([-raggioSospensione*2-spessoreCerchione-0.30])(sospensionePosterioreSx);
var sospensioniPosteriori = STRUCT([sospensionePosterioreSx,sospensionePosterioreDx]);
sospensioniPosteriori = R([X,Y])([PI/6])(sospensioniPosteriori);
sospensioniPosteriori = T([X])([distanzaTraRuote])(sospensioniPosteriori);


var forcellaPosterioreDx = COLOR(neroChiaro)(CUBOID([larghezzaForcellaPos,lunghezzaForcellaPos,spessoreForcellaPos]));
forcellaPosterioreDx = T([X,Y,Z])([-0.25,-0.25,-spessoreForcellaPos-0.15])(forcellaPosterioreDx);
var forcellaPosterioreSx = T([Z])([spessoreForcellaPos + spessoreCentroRuota + 0.30])(forcellaPosterioreDx);
var forcellaPosteriore = STRUCT([forcellaPosterioreSx,forcellaPosterioreDx]);
forcellaPosteriore = R([X,Y])([PI/2.25])(forcellaPosteriore);
forcellaPosteriore = T([X])([distanzaTraRuote])(forcellaPosteriore);
/*********FORCELLE E SOSPENSIONI POSTERIORI*********/

/*********PARAFANGHI POSTERIORE*********/
var domainParafanghi = DOMAIN([[1.5*PI, (2.5)*PI],[0.1*PI,0.9*PI]])([36,36]);
var mappingParafanghi = function(v){
    var alfa = v[0];
    var beta = v[1];
    return [(spessoreParafanghi*COS(alfa)+raggioParafanghi)*COS(beta), (spessoreParafanghi*COS(alfa)+raggioParafanghi)*SIN(beta),spessoreParafanghi*SIN(alfa)]
}
    
var parafanghi = MAP(mappingParafanghi)(domainParafanghi);
parafanghi = COLOR(bianco)(parafanghi);
parafanghi = T([X,Z])([distanzaTraRuote,spessoreParafanghi-0.3])(parafanghi);
/*********PARAFANGHI POSTERIORE*********/

var componentiPosteriori = STRUCT([forcellaPosteriore, sospensioniPosteriori, parafanghi]);
//DRAW(componentiPosteriori);

/*********RUOTA POSTERIORE*********/
var ruotaPosteriore = T([X])([distanzaTraRuote])(ruota);
ruota = STRUCT([ruota, parafanghiAnteriore]);
//DRAW(ruotaPosteriore)
/*********RUOTA POSTERIORE*********/


/*********MANUBRIO*********/

var controls0 = [[0,0,0],[0,0,-1],[0,1,-1],[0,2,-1],[0,2,0],[0,2,1],[0,1,1],[0,0,1],[0,0,0]];
var c0 = BEZIER(S0)(controls0);
var curve0 = MAP(c0)(domain1);

var controls1 = pointTranslation(controls0,2.5,0,0);
var c1 = BEZIER(S0)(controls1);
var curve1 = MAP(c1)(domain1);

var controls2 = pointTranslation(controls1, 2,-2.25,0)
var c2 = BEZIER(S0)(controls2);
var curve2 = MAP(c2)(domain1);

var controls3 = pointTranslation(controls2,2.5,0,0);
var c3 = BEZIER(S0)(controls3);
var curve3 = MAP(c3)(domain1);

var controls4 = pointTranslation(controls3,2.5,0,0);
var c4 = BEZIER(S0)(controls4);
var curve4 = MAP(c4)(domain1);

var controls5 = pointTranslation(controls4,2,2.25,0);
var c5 = BEZIER(S0)(controls5);
var curve5 = MAP(c5)(domain1);

var controls6 = pointTranslation(controls5,2.5,0,0);
var c6 = BEZIER(S0)(controls6);
var curve6 = MAP(c6)(domain1);


var manubrio = bezierSurfaceInterpolator([[c0,c1],[c1,c2],[c2,c3],[c3,c4],[c4,c5],[c5,c6]]);


//comandi a sinistra e manopola accelleratore
var comandiSx = COLOR(nero)(CYLINDER([raggioCmd, lunghezzaCmd])(36));
var manopola = COLOR(neroChiaro)(CYLINDER([raggioManopola, lunghezzaManopola])(36));
comandiSx = STRUCT([manopola, comandiSx]);
comandiSx = T([Y])([0.8])(comandiSx);
comandiSx = R([X,Z])([(3/2)*PI])(comandiSx);
//comandi a destra e manopola accelleratore
var comandiDx = R([X,Z])([PI])(comandiSx);
comandiDx = T([X])([lunghezzaManubrio])(comandiDx);

manubrio = STRUCT([manubrio, comandiSx, comandiDx]);
manubrio = getScaledObject(0.4,manubrio);
manubrio = R([X,Z])(PI/2)(manubrio);
manubrio = T([Y,Z])([lunghezzaForcella+0.7, 3.3])(manubrio);

//DRAW(manubrio)
/*********MANUBRIO*********/



/*********FARO*********/

var domainFaro = DOMAIN([[0,1.1*PI],[0,2*PI]])([30,2*30]);
var faro = drawCup(raggioFaro, grigioChiaro,domainFaro);
var vetroFrontale = COLOR(azzurroVetro)(DISK(raggioVetro)(36));
vetroFrontale = T([Z])([-0.5])(vetroFrontale); 
faro = STRUCT([faro, vetroFrontale]);


faro = getScaledObject(0.5,faro);
faro = R([X,Z])(PI/2)(faro);
faro = R([X,Y])(PI/9)(faro);
faro = T([X,Y,Z])([-1.4,lunghezzaForcella-1, 0.5])(faro);

//DRAW(faro);

/*********FARO*********/


/*********CONTACHILOMETRI*********/
var base = COLOR(nero)(DISK(raggioContachilometri)(36));
var quadrante = DISK(raggioQuadrante)(36);
quadrante = T([Z])([0.01])(quadrante);
quadrante = COLOR(bianco)(quadrante);

var lancetta = T([Z])([0.03])(CUBOID([raggioQuadrante-0.1,0.01]));
lancetta = R([X,Y])([1.25*PI])(lancetta);
lancetta = COLOR(rosso)(lancetta);

var tick = T([X,Y,Z])([-0.025, raggioQuadrante-0.1, 0.02])(CUBOID([0.01,0.05]));
tick = R([X,Y])([1.40*PI])(tick);
tick = COLOR(rosso)(tick);
var ticks = STRUCT(REPLICA(numTicks)([tick, R([X,Y])(PI/12)]))

var vetro = DISK(raggioContachilometri-0.05)(36);
vetro = T([Z])([0.04])(vetro);
vetro = COLOR(azzurroVetroContachilometri)(vetro);

var contorno = COLOR(nero)(CIRCLE(raggioContachilometri)(36));
contorno = EXTRUDE([0.08])(contorno);

var contachilometri = STRUCT([quadrante, lancetta, ticks, vetro,contorno]);
contachilometri = T([Z])([altezzaContachilometri+0.001])(contachilometri);
base = EXTRUDE([altezzaContachilometri])(base);
contachilometri = STRUCT([contachilometri,base])


contachilometri = getScaledObject(0.5,contachilometri);
contachilometri = R([Y,Z])(-PI/2)(contachilometri);
contachilometri = R([X,Z])(PI/2)(contachilometri);
contachilometri = R([X,Y])(-PI/3)(contachilometri);
contachilometri = T([X,Y,Z])([-0.4,lunghezzaForcella+0.4, 0.5])(contachilometri);
/*********CONTACHILOMETRI*********/

var componentiFrontali = STRUCT([forcellaSx,forcellaDx, raccordoFrontale, manubrio, faro, contachilometri]);
componentiFrontali = R([X,Y])([-PI/6])(componentiFrontali);


/*********SERBATOIO*********/
var controls0 = [[3,1,0],[1.5,1,0],[1,1.5,0],[1,3,0],[3,3,0],[5,3,0],[5,1.5,0],[4.5,1,0],[3,1,0]];
var c0 = BEZIER(S0)(controls0);
//var curve0 = MAP(c0)(domain1);

var controls1 = controlPointsReducer([3,1], controls0);
controls1 = pointTranslation(controls1,0,0,2);
var c1 = BEZIER(S0)(controls1);
//var curve1 = MAP(c1)(domain1);

var controls2 = controls0;
controls2 = pointTranslation(controls2,0,0,-1.2);
var c2 = BEZIER(S0)(controls2);
//var curve2 = MAP(c2)(domain1);

var controlsf1 = [[3,1,2]];
var cf1 = BEZIER(S0)(controlsf1);

var controlsf2 = [[3,2,-1.2]];
var cf2 = BEZIER(S0)(controlsf2);

//var c = STRUCT([curve0,curve1,curve2]);
//DRAW(c);


var serbatoio = bezierSurfaceInterpolator([[cf2,c2,c0],[c0,c1,cf1]]);
serbatoio = COLOR(rossoScuro)(serbatoio);

var bocchettone = COLOR(neroChiaro)(CYLINDER([raggioBocchettone, spessoreBocchettone])(36));
bocchettone = R([Y,Z])([PI/2])(bocchettone);
bocchettone = T([X,Y,Z])([3,2.53,-0.2])(bocchettone);


serbatoio = STRUCT([serbatoio,bocchettone]);

serbatoio = getScaledObject(1.8,serbatoio);
serbatoio = R([X,Z])([PI/2])(serbatoio);
serbatoio = T([X,Y,Z])([6.25,2.25,6])(serbatoio);

//DRAW(serbatoio);
/*********SERBATOIO*********/

/*********SELLA*********/

var controlsf0 = [[4.5,2,-0.5]];
var cf0 = BEZIER(S0)(controlsf0);

var controls0 = [[1,2,0],[1,4,0],[2,4,0],[4,5,0],[8,4,0],[9,4,0],[8,2,0],[8,2,0],[8,2,0],[8,2,0],[8,2,0],[8,2,0],[8,2,0],[4.5,1,0],[1,2,0]];
var c0 = BEZIER(S0)(controls0);
var curve0 = MAP(c0)(domain1);

var controls1 = controls0;
controls1 = pointTranslation(controls1,0,0,14);
var c1 = BEZIER(S0)(controls1);
var curve1 = MAP(c1)(domain1);

var controls2 = controlPointsReducer([4.5,2], controls1);
controls2 = pointTranslation(controls2,0,0,16);
var c2 = BEZIER(S0)(controls2);
var curve2 = MAP(c2)(domain1);

var controlsf2 = [[4.5,2,16]];
var cf2 = BEZIER(S0)(controlsf2);

var sella = bezierSurfaceInterpolator([[cf0,c0],[c0,c1],[c1,c2,cf2]]);
sella = COLOR(neroChiaro)(sella);

sella = getScaledObject(0.5,sella);
sella = R([X,Z])([PI/2])(sella);
sella = R([X,Y])([PI/36])(sella);
sella = T([X,Y,Z])([10,3.25,2.7])(sella);


//DRAW(sella);
/*********SELLA*********/

/*********SCARICHI*********/

var controls0 = [[0,1,3],[0,1,1],[0,3,1],[0,5,1],[0,5,3],[0,5,5],[0,3,5],[0,1,5],[0,1,3]];
var c0 = BEZIER(S0)(controls0);
var curve0 = MAP(c0)(domain1);

var controls1 = pointTranslation(controls0,-3,0,0);
var c1 = BEZIER(S0)(controls1);
var curve1 = MAP(c1)(domain1);

var controls2 = pointTranslation(pointRotation(controls1, PI/4, Z),-3,2.5,0);
var c2 = BEZIER(S0)(controls2);
var curve2 = MAP(c2)(domain1);

var controls3 = pointTranslation(pointRotation(controls1, 0.55*PI, Z),-5,0,0);
var c3 = BEZIER(S0)(controls3);
var curve3 = MAP(c3)(domain1);

var controls4 = pointTranslation(controls3,6,-15,0);
var c4 = BEZIER(S0)(controls4);
var curve4 = MAP(c4)(domain1);

var controls5 = pointTranslation(pointRotation(controls4, PI/4, Z),-10,-8,0);
var c5 = BEZIER(S0)(controls5);
var curve5 = MAP(c5)(domain1);

var controls6 = pointTranslation(pointRotation(controls4, 0.5*PI, Z),-11,-20,0);
var c6 = BEZIER(S0)(controls6);
var curve6 = MAP(c6)(domain1);

var controls7 = pointTranslation(controls6,25,3,0);
var c7 = BEZIER(S0)(controls7);
var curve7 = MAP(c7)(domain1);

var controls8 = pointTranslation(controls7,4,3,0);
var c8 = BEZIER(S0)(controls8);
var curve8 = MAP(c8)(domain1);

var controls9 = pointTranslation(pointScale(controls7,1.5),-10,12.5,-1.5);
var c9 = BEZIER(S0)(controls9);
var curve9 = MAP(c9)(domain1);

var controls10 = pointTranslation(controls9,20,1,0);
var c10 = BEZIER(S0)(controls10);
var curve10 = MAP(c10)(domain1);

var controls11 = pointTranslation(controls8,25,1.5,0);
var c11 = BEZIER(S0)(controls11);
var curve11 = MAP(c11)(domain1);

var controls12 = pointTranslation(controls11,9,0.5,0);
var c12 = BEZIER(S0)(controls12);
var curve12 = MAP(c12)(domain1);


var scaricoSx1 = bezierSurfaceInterpolator([[c0,c1,c2,c3,c4]]);
var scaricoSx2 = bezierSurfaceInterpolator([[c4,c5,c6,c7]]);
var scaricoSx3 = bezierSurfaceInterpolator([[c7,c8],[c8,c9],[c9,c10],[c10,c11],[c11,c12]]);

var scaricoSx = STRUCT([scaricoSx1,scaricoSx2,scaricoSx3]);

var scaricoDx = T([Z])([-15])(scaricoSx);
var scarichi = STRUCT([scaricoSx,scaricoDx]);

scarichi = getScaledObject(0.2,scarichi);
scarichi = T([X,Y,Z])([6,2,1.5])(scarichi)

/*********SCARICHI*********/

/*********MOTORE*********/

/*********SCHELETRO*********/
var front = COLOR(nero)(CUBOID([0.2,8.6,2.6]));
var back = COLOR(nero)(CUBOID([0.2,7,2.6]));
var backPartPoints = [[0.2,4.75],[0.2,7],[2.5,7.2]];
var backPartCells = [[0,1,2]];
var backPart1 = COLOR(nero)(SIMPLICIAL_COMPLEX(backPartPoints)(backPartCells));
var backPart2 = T([Z])([2.6])(backPart1);
back = STRUCT([back,backPart1,backPart2]);
back = R([X,Y])([-0.06*PI])(back);
back = T([X])([4.9])(back);
front = R([X,Y])([0.08*PI])(front);
var bottom = COLOR(nero)(CUBOID([5,0.2,2.6]));
var scheletro = STRUCT([front,bottom,back]);
/*********SCHELETRO*********/


/*********PARTE1*********/
var pointsP1 = [[2,1.5],[1,4],[1,5],[2,5.5],[4,5.5],[5,5],[5,4],[4,1.5],[2,1.5]];
var cells = [[1,0,6],[0,7,6],[1,4,2],[1,4,3],[1,3,2],[1,6,4],[4,6,5]];
var part1 = SIMPLICIAL_COMPLEX(pointsP1)(cells);
part1 = EXTRUDE([5.5])(part1);
part1 = COLOR(grigioChiaro)(part1);
part1 = getScaledObject(0.7, part1);
part1 = T([Y,Z])([1.5,-0.5])(part1);
/*********PARTE1*********/


/*********PARTE2*********/
var controls0 = [[1.23, 0.33, 0], [0.38, 0.48, 0], [0.51, 1.58, 0], [1.14, 1.63, 0], [1.89, 1.94, 0], [3.87, 2.82, 0], [3.75, 1.0, 0], [3.51, 0.07, 0], [1.78, 0.22, 0], [1.23, 0.33, 0]];
var c0 = BEZIER(S0)(controls0);
var curve0 = MAP(c0)(domain1);

var controls1 = pointTranslation(controls0,0,0,1.3);
var c1 = BEZIER(S0)(controls1);
var curve1 = MAP(c1)(domain1);

var controls2 = pointTranslation(controls0,0,0,-1.25);
var c2 = BEZIER(S0)(controls2);
var curve2 = MAP(c2)(domain1);

var controls15 = controlPointsReducer([2,1],controls0);
controls15 = pointTranslation(controls15,0,0,1.3);
var c15 = BEZIER(S0)(controls15);
var curve15 = MAP(c15)(domain1);

var controls25 = controlPointsReducer([2,1],controls0);
controls25 = pointTranslation(controls25,0,0,-1.3);
var c25 = BEZIER(S0)(controls25);
var curve25 = MAP(c25)(domain1);

var controls3 = [[2,1,1.3]];
var cf3 = BEZIER(S0)(controls3);

var controls4 = [[2,1,-1.3]];
var cf4 = BEZIER(S0)(controls4);

// c = STRUCT([curve0,curve1,curve2,curve15,curve25]);
// DRAW(c);

var part2 = bezierSurfaceInterpolator([[cf4,c25],[c25,c2,c0,c1,c15],[c15,cf3]]);
part2 = getScaledObject(1.9, part2);
part2 = R([X,Y])(-0.05*PI)(part2);
part2 = T([X,Y,Z])([-1.1,0.1,1.5])(part2);

/*********PARTE2*********/

/*********PARTE3*********/
var controls0 = [[1031, 527, 0], [930, 519, 0], [928, 532, 0], [952, 616, 0]];
controls0 = controlPointsAdjusterXY(controls0);
var c0 = BEZIER(S0)(controls0);
var curve0 = MAP(c0)(domain1);

var controls1 = [[1009, 688, 0],[959, 696, 0],[968, 690, 0],[952, 616, 0]];
controls1 = controlPointsAdjusterXY(controls1);
var c1 = BEZIER(S0)(controls1);
var curve1 = MAP(c1)(domain1);

var controls2 = [[1009, 688, 0], [1067, 677, 0], [1056, 687, 0], [1091, 612, 0]];
controls2 = controlPointsAdjusterXY(controls2);
var c2 = BEZIER(S0)(controls2);
var curve2 = MAP(c2)(domain1);

var controls3 = [[1031, 527, 0],[1128, 533, 0],[1122, 525, 0],[1091, 612, 0]];
controls3 = controlPointsAdjusterXY(controls3);
var c3 = BEZIER(S0)(controls3);
var curve3 = MAP(c3)(domain1);

// c_1 = STRUCT([curve0,curve1,curve2,curve3]);
// DRAW(c_1);

var controls4 = pointTranslation(controls0,0,0,2);
var c4 = BEZIER(S0)(controls4);
var curve4 = MAP(c4)(domain1);

var controls5 = pointTranslation(controls1,0,0,2);
var c5 = BEZIER(S0)(controls5);
var curve5 = MAP(c5)(domain1);

var controls6 = pointTranslation(controls2,0,0,2);
var c6 = BEZIER(S0)(controls6);
var curve6 = MAP(c6)(domain1);

var controls7 = pointTranslation(controls3,0,0,2);
var c7 = BEZIER(S0)(controls7);
var curve7 = MAP(c7)(domain1);

// c_2 = STRUCT([curve4,curve5,curve6,curve7]);
// DRAW(c_2);
var s1 = bezierSurfaceInterpolator([[c0,c3],[c1,c2]]);
var s2 = bezierSurfaceInterpolator([[c4,c7],[c5,c6]]);
var s3 = bezierSurfaceInterpolator([[c0,c4],[c1,c5],[c2,c6],[c3,c7]]);

var part3 = STRUCT([s1,s2,s3]);
part3 = R([X,Y])(PI/45)(part3);
part3 = T([X,Y])([-7.3,8.1])(part3);
part3 = getScaledObject(1.5, part3);
part3 = COLOR(neroChiaro)(part3);

/*********PARTE3*********/

/*********CONNETTORE*********/
var connettore = CYLINDER([0.5,1.5])(36);
connettore = R([X,Z])(-PI/2)(connettore);
connettore = T([X,Y,Z])([4.2,3.8,1.5])(connettore);

/*********CONNETTORE*********/

/*********PEDALI*********/
var base = COLOR(nero)(CUBOID([1,1,2.6]));
var pedali = COLOR(neroChiaro)(CYLINDER([0.3,6.5])(36));
pedali = T([X,Y,Z])([0.5,0.5,-1.95])(pedali);
var blocco_pedali = STRUCT([pedali,base]);
blocco_pedali = T([X,Z])([4.5,0.1])(blocco_pedali);
/*********PEDALI*********/

var parts = STRUCT([part1,part2,part3,connettore,blocco_pedali]);
parts = getScaledObject(1.1, parts);
parts = T([X,Y,Z])([-0.9,0.1,-0.275])(parts);
var motore = STRUCT([scheletro,parts]);
motore = T([X,Y,Z])([6,-2,-0.7])(motore);

//DRAW(motore);

/*********MOTORE*********/


var model = STRUCT([ruota,componentiFrontali,componentiPosteriori,serbatoio,sella, scarichi,ruotaPosteriore,motore]);
//DRAW(model);