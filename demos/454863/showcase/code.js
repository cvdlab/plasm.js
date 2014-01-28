/*CUBO DI RUBIK RANDOM SU BASE TRASPARENTE. 
CAMBIA OGNI VOLTA CONFIGURAZIONE DI PARTENZA*/


//Cubetto base nero, senza colori

var c1 = COLOR([0.1,0.1,0.1])(CUBOID([10,10,10]))

//Centrato negli assi per semplificare le rotazioni

var cube = T([0,1,2])([-5,-5,-5])(c1)


//Piastra colorata posizionata sul cubo.

var piastra = SIMPLEX_GRID ([
	[9],  
	[9],              
	[0.1]     
]);

//Colori piastre: rosso, giallo, blu, verde, bianco, arancione

var rpiastra = COLOR([1,0,0])(piastra)
var ypiastra = COLOR([1,1,0])(piastra)
var bpiastra = COLOR([0,0,1])(piastra)
var gpiastra = COLOR([0,1,0])(piastra)
var wpiastra = COLOR([1,1,1])(piastra)
var opiastra = COLOR([1,135/255,6/255])(piastra)

//Posizionamento piastre colorate sul cubetto base

var face1 = T([0,1,2])([-4.5,-4.5,5])(rpiastra)
var face2 = T([0,1,2])([-4.5,-4.5,-5.1])(ypiastra)
var face3 = T([0,1,2])([-4.5,-5,-4.5])(R([1,2])([PI/2])(bpiastra))
var face4 = T([0,1,2])([-4.5,5.1,-4.5])(R([1,2])([PI/2])(gpiastra))
var face5 = T([0,1,2])([-5,-4.5,-4.5])(R([0,2])([-PI/2])(wpiastra))
var face6 = T([0,1,2])([5.1,-4.5,-4.5])(R([0,2])([-PI/2])(opiastra))

//Cubetto base colorato

var ccube = STRUCT([cube,face1,face2,face3,face4,face5,face6])
//DRAW(ccube)


//Funzione che ruota casualmente il cubetto base

function rotationCube() {
	var rCube
	n = Math.random();
	if(n >= 0.1 && n <= 0.3) {
		rCube = R([0,2])([-PI/2])(ccube)
		rCube = R([1,2])([-PI])(rCube)
	}
	else if(n >= 0.4 && n <= 0.5) {
		rCube = R([1,2])([-PI])(ccube)
		rCube = R([0,1])([-PI/2])(rCube)
	}
	else if(n>= 0.6 && n <= 0.7)
		rCube = R([0,1])([-PI])(ccube)
	else if(n>= 0.8 && n <= 0.9)
		rCube = R([1,2])([-PI/2])(ccube)
	else
		rCube = ccube;
return rCube


}

//Array per memorizzare diversi cubetti

var arraycubes = [];

// Funzione che crea n cubetti (magari per implementazioni future con cubi di rubik più grandi)
// ruotati in modo random e salvati all'interno dell'array

function createCubes (n) {
	for (var i = 0; i < n; i++) {
		arraycubes.push(rotationCube())
	};


}

//Chiamata alla funzione per creare 27 cubi.

createCubes(27);

//Traslazioni per la creazione del cubo

var orT = T([0])([10])
var verT = T([1])([10])
var prT = T([2])([10]) 


//Creazione delle diverse righe del cubo utilizzando l'array di cubetti

var row1 = STRUCT([arraycubes.pop(),orT,arraycubes.pop(),orT,arraycubes.pop()])

var row2 = STRUCT([verT,arraycubes.pop(),orT,arraycubes.pop(),orT,arraycubes.pop()])

var row3 = STRUCT([verT,verT,arraycubes.pop(),orT,arraycubes.pop(),orT,arraycubes.pop()])

var row4 = STRUCT([arraycubes.pop(),orT,arraycubes.pop(),orT,arraycubes.pop()])

var row5 = STRUCT([verT,arraycubes.pop(),orT,arraycubes.pop(),orT,arraycubes.pop()])

var row6 = STRUCT([verT,verT,arraycubes.pop(),orT,arraycubes.pop(),orT,arraycubes.pop()])

var row7 = STRUCT([arraycubes.pop(),orT,arraycubes.pop(),orT,arraycubes.pop()])

var row8 = STRUCT([verT,arraycubes.pop(),orT,arraycubes.pop(),orT,arraycubes.pop()])

var row9 = STRUCT([verT,verT,arraycubes.pop(),orT,arraycubes.pop(),orT,arraycubes.pop()])


//Strutture per le righe

var rows1 = STRUCT([row1,row2,row3])

var rows2 = STRUCT([row4,row5,row6])

var rows3 = STRUCT([row7,row8,row9])


//Cubo di rubik

var baserubik = STRUCT([rows1, prT,rows2, prT,rows3])






//BASE CIRCOLARE IN VETRO TRASPARENTE PER IL CUBO

var domain = INTERVALS(1)(50);

//Circonferenze della base

var f1cp = [[0,8.5,0],[-2,8.4,0],[-2,11,0],[0,11,0]];
var f1c1 = BEZIER(S0)(f1cp);

var f2cp = [[0,8.5,0],[2,8.4,0],[2,11,0],[0,11,0]]
var f2c2 = BEZIER(S0)(f2cp);

var f3cp = f1cp.map(function (p) {return [p[0], p[1], p[2]+0.1]})
var f3c3 = BEZIER(S0)(f3cp);

var f4cp = f2cp.map(function (p) {return [p[0], p[1], p[2]+0.1]})
var f4c4 = BEZIER(S0)(f4cp);



//Superfici

var domain2 = DOMAIN([[0,1],[0,1]])([20,40]);
var base1 = BEZIER(S1)([f1c1, f3c3]);
var base2 = BEZIER(S1)([f2c2, f4c4]);

var baseSurf1 = MAP(base1)(domain2);
var baseSurf2 = MAP(base2)(domain2)



//Volume interno

var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([10,1,10]);
var baseIntc = BEZIER(S2)([base1, base2]);
var baseInt = MAP(baseIntc)(domain3);


//base
var baseTable1 = STRUCT([baseSurf1,baseSurf2,baseInt])

//base posizionata
var baseTable = S([0,1,2])([40,40,40])(T([0,1,2])([0.2,-9.5,-0.23])(COLOR([0,0.6,0.6,0.6])(baseTable1)))


//Variabile globale

var scmodel = STRUCT([baseTable, baserubik])