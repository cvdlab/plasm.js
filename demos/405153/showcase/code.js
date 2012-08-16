var dd = PROD1x1([INTERVALS(1)(10),INTERVALS(1)(10)]);
var dom = INTERVALS(1)(10);

var H = function(points){
	return CUBIC_HERMITE(S0)(points);
}

var B = function(points){
	return BEZIER(S0)(points);
}


/*tangente cerchio 

r=1 t = 1.6568
r=5 t = 8.284271
r=6 t = 9.9411252

*/

var C = function(nn,hh,dd,color){
var n = nn;
var h = hh;
var d = dd;
var c = color || [1,0,0,1];

var dd = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(20)]);

var sopraVetro1 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
var sopraVetro2 = H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
var sopraVetro3 = H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
var sopraVetro4 = H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

var sopraVetro5 = H([[0,n,h+d],[n,0,h+d],[n*1.6568,0,0],[0,-n*1.6568,0]]);
var sopraVetro6 = H([[n,0,h+d],[0,-n,h+d],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
var sopraVetro7 = H([[0,-n,h+d],[-n,0,h+d],[-n*1.6568,0,0],[0,n*1.6568,0]]);
var sopraVetro8 = H([[-n,0,h+d],[0,n,h+d],[0,n*1.6568,0],[n*1.6568,0,0]]);

var punto1 = B([[0,0,h]]);


var sopraVetroSotto1 = COLOR(c)(MAP(BEZIER(S1)([sopraVetro1,punto1]))(dd));
var sopraVetroSotto2 = COLOR(c)(MAP(BEZIER(S1)([sopraVetro2,punto1]))(dd));
var sopraVetroSotto3 = COLOR(c)(MAP(BEZIER(S1)([sopraVetro3,punto1]))(dd));
var sopraVetroSotto4 = COLOR(c)(MAP(BEZIER(S1)([sopraVetro4,punto1]))(dd));

var sopraVetroSotto = STRUCT([sopraVetroSotto1,sopraVetroSotto2,sopraVetroSotto3,sopraVetroSotto4]);

var punto2 = B([[0,0,h+d]]);

var sopraVetroSopra1 = COLOR(c)(MAP(BEZIER(S1)([sopraVetro5,punto2]))(dd));
var sopraVetroSopra2 = COLOR(c)(MAP(BEZIER(S1)([sopraVetro6,punto2]))(dd));
var sopraVetroSopra3 = COLOR(c)(MAP(BEZIER(S1)([sopraVetro7,punto2]))(dd));
var sopraVetroSopra4 = COLOR(c)(MAP(BEZIER(S1)([sopraVetro8,punto2]))(dd));

var sopraVetroSopra = STRUCT([sopraVetroSopra1,sopraVetroSopra2,sopraVetroSopra3,sopraVetroSopra4]);


var sopraVetroLato1 = COLOR(c)(MAP(BEZIER(S1)([sopraVetro1,sopraVetro5]))(dd));
var sopraVetroLato2 = COLOR(c)(MAP(BEZIER(S1)([sopraVetro2,sopraVetro6]))(dd));
var sopraVetroLato3 = COLOR(c)(MAP(BEZIER(S1)([sopraVetro3,sopraVetro7]))(dd));
var sopraVetroLato4 = COLOR(c)(MAP(BEZIER(S1)([sopraVetro4,sopraVetro8]))(dd));

var sopraVetroLato = STRUCT([sopraVetroLato1,sopraVetroLato2,sopraVetroLato3,sopraVetroLato4]);

return STRUCT([sopraVetroSotto,sopraVetroSopra,sopraVetroLato]);
}


var C1 = function(nn,hh,dd){
var n = nn;
var h = hh;
var d = dd;

var dd = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(20)]);

var sopraVetro1 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
var sopraVetro2 = H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
var sopraVetro3 = H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
var sopraVetro4 = H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

var sopraVetro5 = H([[0,n,h+d],[n,0,h+d],[n*1.6568,0,0],[0,-n*1.6568,0]]);
var sopraVetro6 = H([[n,0,h+d],[0,-n,h+d],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
var sopraVetro7 = H([[0,-n,h+d],[-n,0,h+d],[-n*1.6568,0,0],[0,n*1.6568,0]]);
var sopraVetro8 = H([[-n,0,h+d],[0,n,h+d],[0,n*1.6568,0],[n*1.6568,0,0]]);

var punto1 = B([[0,0,h]]);


var sopraVetroSotto1 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sopraVetro1,punto1]))(dd));
var sopraVetroSotto2 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sopraVetro2,punto1]))(dd));
var sopraVetroSotto3 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sopraVetro3,punto1]))(dd));
var sopraVetroSotto4 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sopraVetro4,punto1]))(dd));

var sopraVetroSotto = STRUCT([sopraVetroSotto1,sopraVetroSotto2,sopraVetroSotto3,sopraVetroSotto4]);

var punto2 = B([[0,0,h+d]]);

var sopraVetroSopra1 = COLOR([0,0,0,0.9])(MAP(BEZIER(S1)([sopraVetro5,punto2]))(dd));
var sopraVetroSopra2 = COLOR([0,0,0,0.9])(MAP(BEZIER(S1)([sopraVetro6,punto2]))(dd));
var sopraVetroSopra3 = COLOR([0,0,0,0.9])(MAP(BEZIER(S1)([sopraVetro7,punto2]))(dd));
var sopraVetroSopra4 = COLOR([0,0,0,0.9])(MAP(BEZIER(S1)([sopraVetro8,punto2]))(dd));

var sopraVetroSopra = STRUCT([sopraVetroSopra1,sopraVetroSopra2,sopraVetroSopra3,sopraVetroSopra4]);


var sopraVetroLato1 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sopraVetro1,sopraVetro5]))(dd));
var sopraVetroLato2 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sopraVetro2,sopraVetro6]))(dd));
var sopraVetroLato3 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sopraVetro3,sopraVetro7]))(dd));
var sopraVetroLato4 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sopraVetro4,sopraVetro8]))(dd));

var sopraVetroLato = STRUCT([sopraVetroLato1,sopraVetroLato2,sopraVetroLato3,sopraVetroLato4]);

return STRUCT([sopraVetroSotto,sopraVetroSopra,sopraVetroLato]);
}

//cerchi di base
var cerchiobase1 = H([[0,6,0],[6,0,0],[9.9411252,0,0],[0,-9.9411252,0]]);
var cerchiobase2 = H([[6,0,0],[0,-6,0],[0,-9.9411252,0],[-9.9411252,0,0]]);
var cerchiobase3 = H([[0,-6,0],[-6,0,0],[-9.9411252,0,0],[0,9.9411252,0]]);
var cerchiobase4 = H([[-6,0,0],[0,6,0],[0,9.9411252,0],[9.9411252,0,0]]);

var cerchiobase5 = H([[0,5,1],[5,0,1],[8.284271,0,0],[0,-8.284271,0]]);
var cerchiobase6 = H([[5,0,1],[0,-5,1],[0,-8.284271,0],[-8.284271,0,0]]);
var cerchiobase7 = H([[0,-5,1],[-5,0,1],[-8.284271,0,0],[0,8.284271,0]]);
var cerchiobase8 = H([[-5,0,1],[0,5,1],[0,8.284271,0],[8.284271,0,0]]);

var cerchiobase9  = H([[0,6,1],[6,0,1],[9.9411252,0,0],[0,-9.9411252,0]]);
var cerchiobase10 = H([[6,0,1],[0,-6,1],[0,-9.9411252,0],[-9.9411252,0,0]]);
var cerchiobase11 = H([[0,-6,1],[-6,0,1],[-9.9411252,0,0],[0,9.9411252,0]]);
var cerchiobase12 = H([[-6,0,1],[0,6,1],[0,9.9411252,0],[9.9411252,0,0]]);



var base1 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([cerchiobase1,cerchiobase9,cerchiobase5]))(dd));
var base2 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([cerchiobase2,cerchiobase10,cerchiobase6]))(dd));
var base3 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([cerchiobase3,cerchiobase11,cerchiobase7]))(dd));
var base4 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([cerchiobase4,cerchiobase12,cerchiobase8]))(dd));

var punto = B([[0,0,0]]);
var fondo1 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([cerchiobase1,punto]))(dd));
var fondo2 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([cerchiobase2,punto]))(dd));
var fondo3 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([cerchiobase3,punto]))(dd));
var fondo4 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([cerchiobase4,punto]))(dd));




//BASE

var base = STRUCT([base1,base2,base3,base4,fondo1,fondo2,fondo3,fondo4]);



var olio1 = H([[0,4.5,3],[4.5,0,3],[7.4556,0,0],[0,-7.4556,0]]);
var olio2 = H([[4.5,0,3],[0,-4.5,3],[0,-7.4556,0],[-7.4556,0,0]]);
var olio3 = H([[0,-4.5,3],[-4.5,0,3],[-7.4556,0,0],[0,7.4556,0]]);
var olio4 = H([[-4.5,0,3],[0,4.5,3],[0,7.4556,0],[7.4556,0,0]]);

var olio5 = H([[0,5,2],[5,0,2],[8.284271,0,0],[0,-8.284271,0]]);
var olio6 = H([[5,0,2],[0,-5,2],[0,-8.284271,0],[-8.284271,0,0]]);
var olio7 = H([[0,-5,2],[-5,0,2],[-8.284271,0,0],[0,8.284271,0]]);
var olio8 = H([[-5,0,2],[0,5,2],[0,8.284271,0],[8.284271,0,0]]);


var oliera1 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([cerchiobase5,olio5,olio1]))(dd));
var oliera2 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([cerchiobase6,olio6,olio2]))(dd));
var oliera3 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([cerchiobase7,olio7,olio3]))(dd));
var oliera4 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([cerchiobase8,olio8,olio4]))(dd));
var oliera5 = COLOR([1,0,0,1])(T([2])([3])(S([0,1,2])([4.5/6,4.5/6,1/3])(base)));


var n = (5/6)*4.5;
var oliera6 = H([[0,n,1+2+1/3],[n,0,3+1/3],[n*1.6568,0,0],[0,-n*1.6568,0]]);
var oliera7 = H([[n,0,3+1/3],[0,-n,3+1/3],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
var oliera8 = H([[0,-n,3+1/3],[-n,0,3+1/3],[-n*1.6568,0,0],[0,n*1.6568,0]]);
var oliera9 = H([[-n,0,3+1/3],[0,n,3+1/3],[0,n*1.6568,0],[n*1.6568,0,0]]);


var n = (5/6)*3.5;
var oliera10 = H([[0,n,3+1/3],[n,0,3+1/3],[n*1.6568,0,0],[0,-n*1.6568,0]]);
var oliera11 = H([[n,0,3+1/3],[0,-n,3+1/3],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
var oliera12 = H([[0,-n,3+1/3],[-n,0,3+1/3],[-n*1.6568,0,0],[0,n*1.6568,0]]);
var oliera13 = H([[-n,0,3+1/3],[0,n,3+1/3],[0,n*1.6568,0],[n*1.6568,0,0]]);



var olieraSopra1 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([oliera6,oliera10]))(dd));
var olieraSopra2 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([oliera7,oliera11]))(dd));
var olieraSopra3 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([oliera8,oliera12]))(dd));
var olieraSopra4 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([oliera9,oliera13]))(dd));

var olieraSopra = STRUCT([olieraSopra1,olieraSopra2,olieraSopra3,olieraSopra4]);





//STRUTTURA SOTTO IL VETRO

var punto = B([[0,0,5+1/3]]);

var cupola1 = H([[0,n,4.5+1/3],[n,0,4.5+1/3],[n*1.6568,0,0],[0,-n*1.6568,0]]);
var cupola2 = H([[n,0,4.5+1/3],[0,-n,4.5+1/3],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
var cupola3 = H([[0,-n,4.5+1/3],[-n,0,4.5+1/3],[-n*1.6568,0,0],[0,n*1.6568,0]]);
var cupola4 = H([[-n,0,4.5+1/3],[0,n,4.5+1/3],[0,n*1.6568,0],[n*1.6568,0,0]]);


var cupola5 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([oliera10,cupola1,punto]))(dd));
var cupola6 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([oliera11,cupola2,punto]))(dd));
var cupola7 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([oliera12,cupola3,punto]))(dd));
var cupola8 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([oliera13,cupola4,punto]))(dd));

var cupola = STRUCT([cupola5,cupola6,cupola7,cupola8]);

var n = 2.5;
var baseVetro1 = H([[0,n,4.6],[n,0,4.6],[n*1.6568,0,0],[0,-n*1.6568,0]]);
var baseVetro2 = H([[n,0,4.6],[0,-n,4.6],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
var baseVetro3 = H([[0,-n,4.6],[-n,0,4.6],[-n*1.6568,0,0],[0,n*1.6568,0]]);
var baseVetro4 = H([[-n,0,4.6],[0,n,4.6],[0,n*1.6568,0],[n*1.6568,0,0]]);


var baseVetro5 = H([[0,n,4.9],[n,0,4.9],[n*1.6568,0,0],[0,-n*1.6568,0]]);
var baseVetro6 = H([[n,0,4.9],[0,-n,4.9],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
var baseVetro7 = H([[0,-n,4.9],[-n,0,4.9],[-n*1.6568,0,0],[0,n*1.6568,0]]);
var baseVetro8 = H([[-n,0,4.9],[0,n,4.9],[0,n*1.6568,0],[n*1.6568,0,0]]);

var punto1 = B([[0,0,4.6]]);


var baseVetroSotto1 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([baseVetro1,punto1]))(dd));
var baseVetroSotto2 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([baseVetro2,punto1]))(dd));
var baseVetroSotto3 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([baseVetro3,punto1]))(dd));
var baseVetroSotto4 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([baseVetro4,punto1]))(dd));

var baseVetroSotto = STRUCT([baseVetroSotto1,baseVetroSotto2,baseVetroSotto3,baseVetroSotto4]);

var punto2 = B([[0,0,4.9]]);

var baseVetroSopra1 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([baseVetro5,punto2]))(dd));
var baseVetroSopra2 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([baseVetro6,punto2]))(dd));
var baseVetroSopra3 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([baseVetro7,punto2]))(dd));
var baseVetroSopra4 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([baseVetro8,punto2]))(dd));

var baseVetroSopra = STRUCT([baseVetroSopra1,baseVetroSopra2,baseVetroSopra3,baseVetroSopra4]);


var baseVetroLato1 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([baseVetro1,baseVetro5]))(dd));
var baseVetroLato2 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([baseVetro2,baseVetro6]))(dd));
var baseVetroLato3 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([baseVetro3,baseVetro7]))(dd));
var baseVetroLato4 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([baseVetro4,baseVetro8]))(dd));

var baseVetroLato = STRUCT([baseVetroLato1,baseVetroLato2,baseVetroLato3,baseVetroLato4]);





var baseVetro = STRUCT([baseVetroSotto,baseVetroSopra,baseVetroLato]);




//VETRO

var vetroSotto1 = H([[0,2.5,4.9],[2.5,0,4.9],[2.5*1.6568,0,0],[0,-2.5*1.6568,0]]);
var vetroSotto2 = H([[2.5,0,4.9],[0,-2.5,4.9],[0,-2.5*1.6568,0],[-2.5*1.6568,0,0]]);
var vetroSotto3 = H([[0,-2.5,4.9],[-2.5,0,4.9],[-2.5*1.6568,0,0],[0,2.5*1.6568,0]]);
var vetroSotto4 = H([[-2.5,0,4.9],[0,2.5,4.9],[0,2.5*1.6568,0],[2.5*1.6568,0,0]]);

var vetroSotto5 = H([[0,3.5,4.9],[3.5,0,4.9],[3.5*1.6568,0,0],[0,-3.5*1.6568,0]]);
var vetroSotto6 = H([[3.5,0,4.9],[0,-3.5,4.9],[0,-3.5*1.6568,0],[-3.5*1.6568,0,0]]);
var vetroSotto7 = H([[0,-3.5,4.9],[-3.5,0,4.9],[-3.5*1.6568,0,0],[0,3.5*1.6568,0]]);
var vetroSotto8 = H([[-3.5,0,4.9],[0,3.5,4.9],[0,3.5*1.6568,0],[3.5*1.6568,0,0]]);

var vetroSotto9 = H([[0,3.5,5.9],[3.5,0,5.9],[3.5*1.6568,0,0],[0,-3.5*1.6568,0]]);
var vetroSotto10= H([[3.5,0,5.9],[0,-3.5,5.9],[0,-3.5*1.6568,0],[-3.5*1.6568,0,0]]);
var vetroSotto11= H([[0,-3.5,5.9],[-3.5,0,5.9],[-3.5*1.6568,0,0],[0,3.5*1.6568,0]]);
var vetroSotto12= H([[-3.5,0,5.9],[0,3.5,5.9],[0,3.5*1.6568,0],[3.5*1.6568,0,0]]);


var VetroSotto1 = COLOR([1,1,1,0.4])(MAP(BEZIER(S1)([vetroSotto1,vetroSotto5,vetroSotto9]))(dd));
var VetroSotto2 = COLOR([1,1,1,0.4])(MAP(BEZIER(S1)([vetroSotto2,vetroSotto6,vetroSotto10]))(dd));
var VetroSotto3 = COLOR([1,1,1,0.4])(MAP(BEZIER(S1)([vetroSotto3,vetroSotto7,vetroSotto11]))(dd));
var VetroSotto4 = COLOR([1,1,1,0.4])(MAP(BEZIER(S1)([vetroSotto4,vetroSotto8,vetroSotto12]))(dd));

var VetroSotto = STRUCT([VetroSotto1,VetroSotto2,VetroSotto3,VetroSotto4]);




var vetroSopra1 = H([[0,3,10],[3,0,10],[3*1.6568,0,0],[0,-2.5*1.6568,0]]);
var vetroSopra2 = H([[3,0,10],[0,-3,10],[0,-3*1.6568,0],[-3*1.6568,0,0]]);
var vetroSopra3 = H([[0,-3,10],[-3,0,10],[-3*1.6568,0,0],[0,3*1.6568,0]]);
var vetroSopra4 = H([[-3,0,10],[0,3,10],[0,3*1.6568,0],[3*1.6568,0,0]]);

var vetroSopra5 = H([[0,3,11],[3,0,11],[3*1.6568,0,0],[0,-3*1.6568,0]]);
var vetroSopra6 = H([[3,0,11],[0,-3,11],[0,-3*1.6568,0],[-3*1.6568,0,0]]);
var vetroSopra7 = H([[0,-3,11],[-3,0,11],[-3*1.6568,0,0],[0,3*1.6568,0]]);
var vetroSopra8 = H([[-3,0,11],[0,3,11],[0,3*1.6568,0],[3*1.6568,0,0]]);

var vetroSopra9 = H([[0,2.5,11],[2.5,0,11],[2.5*1.6568,0,0],[0,-2.5*1.6568,0]]);
var vetroSopra10= H([[2.5,0,11],[0,-2.5,11],[0,-2.5*1.6568,0],[-2.5*1.6568,0,0]]);
var vetroSopra11= H([[0,-2.5,11],[-2.5,0,11],[-2.5*1.6568,0,0],[0,2.5*1.6568,0]]);
var vetroSopra12= H([[-2.5,0,11],[0,2.5,11],[0,2.5*1.6568,0],[2.5*1.6568,0,0]]);


var vetroLato1 = COLOR([1,1,1,0.4])(MAP(BEZIER(S1)([vetroSopra1,vetroSotto9]))(dd));
var vetroLato2 = COLOR([1,1,1,0.4])(MAP(BEZIER(S1)([vetroSopra2,vetroSotto10]))(dd));
var vetroLato3 = COLOR([1,1,1,0.4])(MAP(BEZIER(S1)([vetroSopra3,vetroSotto11]))(dd));
var vetroLato4 = COLOR([1,1,1,0.4])(MAP(BEZIER(S1)([vetroSopra4,vetroSotto12]))(dd));




var vetroLato = STRUCT([vetroLato1,vetroLato2,vetroLato3,vetroLato4]);


var vetroSopraS1 = COLOR([1,1,1,0.4])(MAP(BEZIER(S1)([vetroSopra1,vetroSopra5,vetroSopra9]))(dd));
var vetroSopraS2 = COLOR([1,1,1,0.4])(MAP(BEZIER(S1)([vetroSopra2,vetroSopra6,vetroSopra10]))(dd));
var vetroSopraS3 = COLOR([1,1,1,0.4])(MAP(BEZIER(S1)([vetroSopra3,vetroSopra7,vetroSopra11]))(dd));
var vetroSopraS4 = COLOR([1,1,1,0.4])(MAP(BEZIER(S1)([vetroSopra4,vetroSopra8,vetroSopra12]))(dd));

var vetroSopra = STRUCT([vetroSopraS1,vetroSopraS2,vetroSopraS3,vetroSopraS4]);

var vetro = STRUCT([VetroSotto,vetroLato,vetroSopra]);




var sopraVetro1 = C(2.5,11,1);
var sopraVetro2 = C(1.5,12,0.3);
var sopraVetro3 = C(2,12.3,0.3);
var sopraVetro4 = C(1.5,12.6,0.3);







var n = 3;
var h = 12.9;
var d = 1.5;


var sv1 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
var sv2 = H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
var sv3 = H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
var sv4 = H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

var n = 2.5;

var sv5 = H([[0,n,h+d],[n,0,h+d],[n*1.6568,0,0],[0,-n*1.6568,0]]);
var sv6 = H([[n,0,h+d],[0,-n,h+d],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
var sv7 = H([[0,-n,h+d],[-n,0,h+d],[-n*1.6568,0,0],[0,n*1.6568,0]]);
var sv8 = H([[-n,0,h+d],[0,n,h+d],[0,n*1.6568,0],[n*1.6568,0,0]]);

var punto1 = B([[0,0,h]]);


var svs1 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sv1,punto1]))(dd));
var svs2 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sv2,punto1]))(dd));
var svs3 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sv3,punto1]))(dd));
var svs4 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sv4,punto1]))(dd));

var svs = STRUCT([svs1,svs2,svs3,svs4]);

var punto2 = B([[0,0,h+d]]);

var svss1 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sv5,punto2]))(dd));
var svss2 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sv6,punto2]))(dd));
var svss3 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sv7,punto2]))(dd));
var svss4 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sv8,punto2]))(dd));

var svss = STRUCT([svss1,svss2,svss3,svss4]);


var svl1 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sv1,sv5]))(dd));
var svl2 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sv2,sv6]))(dd));
var svl3 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sv3,sv7]))(dd));
var svl4 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([sv4,sv8]))(dd));

var svl = STRUCT([svl1,svl2,svl3,svl4]);

var  sopraVetro5 = STRUCT([svss,svs,svl]);

var sopraVetro6 = C(2,14.4,1);

var sopraVetro7 = C1(3.5,15.4,0.2);

//Struttura sopra il vetro

var sopraVetro = STRUCT([sopraVetro1,sopraVetro2,sopraVetro3,sopraVetro4,sopraVetro5,sopraVetro6,sopraVetro7]);



//OLIERA

var oliera = STRUCT([oliera1,oliera2,oliera3,oliera4,oliera5,olieraSopra]);

//qui
var dd = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(20)]);
var dom = INTERVALS(1)(20);



var x = 0.3;

var m1 = BEZIER(S0)([[1+x,0,0+x],[0+x,0,0+x],[-3,0,0+x],[-3+x,0,3+x],[-1+x,0,3+x],[-1+x,0,4+x],[-1+x,0,5+x],[-1+x,0,7+x],[-1.5+x,0,8-x],[-1.5,0,9-x],[-1.5+x,0,10-x],[0+x,0,10-x],[1+x,0,10-x]]);
var m2 = BEZIER(S0)([[1,-x,0],[0,-x,0],[-3,-x,0],[-3,-x,3],[-1,-x,3],[-1,-x,4],[-1,-x,5],[-1,-x,7],[-1.5,-x,8],[-1.5,-x,9],[-1.5,-x,10],[0,-x,10],[1,-x,10]]);
var m3 = BEZIER(S0)([[1-x,0,0-x],[0-x,0,0-x],[-3-x,0,0-x],[-3-x,0,3-x],[-1-x,0,3-x],[-1-x,0,4-x],[-1-x,0,5-x],[-1-x,0,7-x],[-1.5-x,0,8+x],[-1.5-x,0,9+x],[-1.5-x,0,10+x],[0-x,0,10+x],[1-x,0,10+x]]);
var m4 = BEZIER(S0)([[1,x,0],[0,x,0],[-3,x,0],[-3,x,3],[-1,x,3],[-1,x,4],[-1,x,5],[-1,x,7],[-1.5,x,8],[-1.5,x,9],[-1.5,x,10],[0,x,10],[1,x,10]]);
var manicol1 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([m1,m2]))(dd));
var manicol2 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([m2,m3]))(dd));
var manicol3 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([m3,m4]))(dd));
var manicol4 = COLOR([1,0,0,1])(MAP(BEZIER(S1)([m4,m1]))(dd));

var manico1 = STRUCT([manicol1,manicol2,manicol3,manicol4]);
var manico1 = T([0,2])([-3,4])(manico1);
var manico2 = S([0])([-1])(manico1);


var maniciLaterali = STRUCT([manico1,manico2]);



var dd = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(20)]);
var dom = INTERVALS(1)(20);
var x = 0.05;
var ms1 = BEZIER(S0)([[0,0,0+x],[-1+x,0,0+x],[-1.25+x,0,0+x],[-1.25+x,0,0.25+x],[-1+x,0,0.5+x],[4,0,10-x]]);
var ms2 = BEZIER(S0)([[0,0-x,0],[-1,0-x,0],[-1.25,0-x,0],[-1.25,0-x,0.25],[-1,0-x,0.5],[4,0-x,10]]);
var ms3 = BEZIER(S0)([[0,0,0-x],[-1-x,0,0-x],[-1.25-x,0,0-x],[-1.25-x,0,0.25-x],[-1-x,0,0.5-x],[4,0,10+x]]);
var ms4 = BEZIER(S0)([[0,0+x,0],[-1,0+x,0],[-1.25,0+x,0],[-1.25,0+x,0.25],[-1,0+x,0.5],[4,0+x,10]]);


var manicos1 = COLOR([0.6,0.6,0.6,1])(MAP(BEZIER(S1)([ms1,ms2]))(dd));
var manicos2 = COLOR([0.6,0.6,0.6,1])(MAP(BEZIER(S1)([ms2,ms3]))(dd));
var manicos3 = COLOR([0.6,0.6,0.6,1])(MAP(BEZIER(S1)([ms3,ms4]))(dd));
var manicos4 = COLOR([0.6,0.6,0.6,1])(MAP(BEZIER(S1)([ms4,ms1]))(dd));

var manicosdx = STRUCT([manicos1,manicos2,manicos3,manicos4]);
manicosdx = T([0,2])([-3.992,13.5])(manicosdx);
var manicossx = S([0])([-1])(manicosdx);

var manicoSopra = STRUCT([manicossx,manicosdx]);


var st1 = H([[0,1,0],[1,0,0],[1.6568,0,0],[0,-1.6568,0]]);
var st2 = H([[1,0,0],[0,-1,0],[0,-1.6568,0],[-1.6568,0,0]]);
var st3 = H([[0,-1,0],[-1,0,0],[-1.6568,0,0],[0,1.6568,0]]);
var st4 = H([[-1,0,0],[0,1,0],[0,1.6568,0],[1.6568,0,0]]);

var st5 = H([[0,1,1],[1,0,1],[1.6568,0,0],[0,-1.6568,0]]);
var st6 = H([[1,0,1],[0,-1,1],[0,-1.6568,0],[-1.6568,0,0]]);
var st7 = H([[0,-1,1],[-1,0,1],[-1.6568,0,0],[0,1.6568,0]]);
var st8 = H([[-1,0,1],[0,1,1],[0,1.6568,0],[1.6568,0,0]]);

var st9 = H([[1,1,2],[2,0,2],[1.6568,0,0],[0,-1.6568,0]]);
var st10= H([[2,0,2],[1,-1,2],[0,-1.6568,0],[-1.6568,0,0]]);
var st11= H([[1,-1,2],[0,0,2],[-1.6568,0,0],[0,1.6568,0]]);
var st12= H([[0,0,2],[1,1,2],[0,1.6568,0],[1.6568,0,0]]);


var punto = B([[0,0,0]]);
var punto1 = B([[1,0,2]]);


var sts1 = COLOR([0,0,0,1])(MAP(BEZIER(S1)([st1,punto]))(dd));
var sts2 = COLOR([0,0,0,1])(MAP(BEZIER(S1)([st2,punto]))(dd));
var sts3 = COLOR([0,0,0,1])(MAP(BEZIER(S1)([st3,punto]))(dd));
var sts4 = COLOR([0,0,0,1])(MAP(BEZIER(S1)([st4,punto]))(dd));

var sts5 = COLOR([0,0,0,1])(MAP(BEZIER(S1)([st9 ,punto1]))(dd));
var sts6 = COLOR([0,0,0,1])(MAP(BEZIER(S1)([st10,punto1]))(dd));
var sts7 = COLOR([0,0,0,1])(MAP(BEZIER(S1)([st11,punto1]))(dd));
var sts8 = COLOR([0,0,0,1])(MAP(BEZIER(S1)([st12,punto1]))(dd));




var stoppino1 = COLOR([0,0,0,1])(MAP(BEZIER(S1)([st1,st5,st9]))(dd));
var stoppino2 = COLOR([0,0,0,1])(MAP(BEZIER(S1)([st2,st6,st10]))(dd));
var stoppino3 = COLOR([0,0,0,1])(MAP(BEZIER(S1)([st3,st7,st11]))(dd));
var stoppino4 = COLOR([0,0,0,1])(MAP(BEZIER(S1)([st4,st8,st12]))(dd));

var stoppino = STRUCT([stoppino1,stoppino2,stoppino3,stoppino4,sts1,sts2,sts3,sts4,sts5,sts6,sts7,sts8]);
stoppino = T([2])([5])(stoppino);
stoppino = S([0,1,2])([1/5,1/5,0.9])(stoppino);


var gas1 = C(0.15,0,1.5,[0.7,0.7,0.7,1]);
gas1 = R([1,2])(PI/2)(gas1);
gas1 = T([1,2])([5.5,2])(gas1);

var gas2 = C(0.5,0,0.1,[0.7,0.7,0.7,1]);
gas2 = R([1,2])(PI/2)(gas2);
gas2 = T([1,2])([5.5,2])(gas2);

var regolatoreGas = STRUCT([gas1,gas2]);

var scmodel = STRUCT([base,oliera,cupola,baseVetro,vetro,sopraVetro,maniciLaterali,manicoSopra,stoppino,regolatoreGas]);
