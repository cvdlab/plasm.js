!(function (exports){

var fs = require('fs');
var numeric = require('numeric');

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
/////////////////////////////////////////////
var domain1 = INTERVALS(1)(30);
var domain2 = DOMAIN([[0,1],[0,1]])([20,30]);
var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([20,10,5]);

//parte frontale
var p0 = [[0, -0.2, 0], [-0.2, -0.2, 1], [-0.2, -0.2, 1], [-0.2, -0.2, 1],[-0.19, -0.2, 1], [-0.17, -0.2, 1], [-0.15, -0.2, 1], [-0.1, -0.2, 1], [-0.05, -0.2, 1], [-0.01, -0.2, 1],[0, -0.2, 1], [0, -0.2, 1], [0, -0.2, 1], [0, -0.2, 1], [0, -0.2, 0], [0, -0.2, 0]];
var p1 = [[0, 0.2, 0], [-0.2, 0.2, 1], [-0.2, 0.2, 1], [-0.2, 0.2, 1],[-0.19, 0.2, 1], [-0.17, 0.2, 1], [-0.15, 0.2, 1], [-0.1, 0.2, 1], [-0.05, 0.2, 1], [-0.01, 0.2, 1],[0, 0.2, 1], [0, 0.2, 1], [0, 0.2, 1], [0, 0.2, 1], [0, 0.2, 0], [0, 0.2, 0]];

var c0 = BEZIER(S0)(p0);
var c1 = BEZIER(S0)(p1);

var p2 = [[0,-0.2,0]];
var c2 = BEZIER(S0)(p2);
var curve1 = BEZIER(S1)([c0,c2]);
var surface1 = MAP(curve1)(domain2);
var surfaceA = COLOR([0, 127/255, 255/255])(surface1);
//DRAW(COLOR([0, 0, 1])(surface1));

var p3 = [[0,0.2,0]];
var c3 = BEZIER(S0)(p3);
var curve2 = BEZIER(S1)([c1,c3]);
var surface2 = MAP(curve2)(domain2);
var surfaceB = COLOR([0, 127/255, 255/255])(surface2);
//DRAW(COLOR([0, 0, 1])(surface2));

var lateral = BEZIER(S1)([c0,c1]);
var parteFrontale = MAP(lateral)(domain2);
var surfaceC = COLOR([0, 127/255, 255/255])(parteFrontale);

//DRAW(COLOR([0, 0, 1])(insert));

//struttura portante

var controlpoints1 = [[0,0, 0],[-0.75,0, 0],[0, -1.6, 0],[0,1.6, 0]]; 
var c1= CUBIC_HERMITE(S0)(controlpoints1); 
var curve1 = MAP(c1)(domain1); 
//DRAW(COLOR([1, 0, 0])(curve1)); 

var controlpoints1s = [[0,0, 0],[-0.75,0, 0],[0, 1.6, 0],[0,-1.6, 0]]; 
var c1s= CUBIC_HERMITE(S0)(controlpoints1s); 
var curve1s = MAP(c1s)(domain1); 
//DRAW(COLOR([1, 0, 0])(curve1s)); 

var s11s = BEZIER(S1)([c1, c1s])
var surfL = MAP(s11s)(domain2);
var surfaceL = COLOR([153/255, 17/255, 153/255])(surfL);


var controlpoints2 = [[-0.15,0, 1],[-0.6,0, 1],[0, -0.9, 0],[0,0.9, 0]]; 
var c2 = CUBIC_HERMITE(S0)(controlpoints2); 
var curve2 = MAP(c2)(domain1); 
//DRAW(COLOR([1, 0, 0])(curve2)); 

var controlpoints2s = [[-0.15,0, 1],[-0.6,0, 1],[0, 0.9, 0],[0,-0.9, 0]]; 
var c2s = CUBIC_HERMITE(S0)(controlpoints2s); 
var curve2s = MAP(c2s)(domain1); 
//DRAW(COLOR([1, 0, 0])(curve2s)); 

var s12 = BEZIER(S1)([c1, c2])
var surfD = MAP(s12)(domain2);
var surfaceD = COLOR([153/255, 17/255, 153/255])(surfD);

//DRAW(COLOR([1, 0, 0])(surf1));

var s12s = BEZIER(S1)([c1s, c2s])
var surfE = MAP(s12s)(domain2);
var surfaceE = COLOR([153/255, 17/255, 153/255])(surfE);
//DRAW(COLOR([1, 0, 0])(surf2));


var controlpoints3 = [[-0.05,0, 1.2],[-0.7,0, 1.2],[0, -1.3, 0],[0,1.3, 0]]; 
var c3 = CUBIC_HERMITE(S0)(controlpoints3); 
var curve3 = MAP(c3)(domain1); 
//DRAW(curve3); 

var controlpoints3s = [[-0.05,0, 1.2],[-0.7,0, 1.2],[0, 1.3, 0],[0,-1.3, 0]]; 
var c3s = CUBIC_HERMITE(S0)(controlpoints3s); 
var curve3s = MAP(c3s)(domain1); 
//DRAW(curve3s);

var s12 = BEZIER(S1)([c2, c3])
var surf3 = MAP(s12)(domain2);
//DRAW(surf3);

var s12s = BEZIER(S1)([c2s, c3s])
var surf4 = MAP(s12s)(domain2);
//DRAW(surf4);

var SemiSphere = function (r, n){
  var d = DOMAIN ([[0, 2*PI], [0, PI]])([n, n]);
  var mapping = function(p){
    var beta = p[0];
    var alfa = p[1];
    return [r*COS(alfa)*COS(beta), r*COS(alfa)*SIN(beta), r*SIN(alfa)];
  }
  var mapped = MAP (mapping)(d);
  var mapped1 = T([0, 2])([-0.38, 1.2])(mapped);
  return mapped1;
}

var sSfera = SemiSphere(0.325, 100);
var cont = (STRUCT([surf3, surf4, sSfera]));
var contenitore = COLOR([0, 1, 1, 0.4])(cont);

//Manopola

var controlpoints1M = [[0,0, 0],[0,0, 0.08],[0, -0.14, 0],[0,0.154, 0]]; 
var c1M = CUBIC_HERMITE(S0)(controlpoints1M); 
var curve1M = MAP(c1)(domain1); 
//DRAW(curve1); 

var controlpoints1sM = [[0.035,0, 0],[0.05,0, 0.08],[0, -0.14, 0],[0,0.14, 0]]; 
var c1sM = CUBIC_HERMITE(S0)(controlpoints1sM); 
var curve1sM = MAP(c1sM)(domain1); 
//DRAW(curve1s); 

var controlpoints2M = [[0,0, 0],[0,0, 0.08],[0, 0.14, 0],[0,-0.14, 0]]; 
var c2M = CUBIC_HERMITE(S0)(controlpoints2M); 
var curve2M = MAP(c2M)(domain1); 
//DRAW(curve2);

var controlpoints2sM = [[0.035,0, 0],[0.05,0, 0.08],[0, 0.14, 0],[0,-0.14, 0]]; 
var c2sM = CUBIC_HERMITE(S0)(controlpoints2sM); 
var curve2sM = MAP(c2sM)(domain1); 
//DRAW(curve2s);

var s1M = BEZIER(S1)([c1M, c1sM])
var surf1M = MAP(s1M)(domain2);
//DRAW(surf1);
var s2M = BEZIER(S1)([c2M, c2sM])
var surf2M = MAP(s2M)(domain2);
//DRAW(surf2);
var s3M = BEZIER(S1)([c1sM, c2sM])
var surf3M = MAP(s3M)(domain2);
//DRAW(surf3);
var appoggio = STRUCT([surf1M, surf2M, surf3M]);
//DRAW(appoggio);


var p0G = [[0.13, 0, 0], [0.13, 0.04, 0], [0.1, 0.07, 0], [0.08, 0.05, 0], [0.06, 0.005, 0],[0.04, 0.005, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],[0.13, 0, 0]];
var p0bG = [[-0.13, 0, 0], [-0.13, 0.04, 0], [-0.1, 0.07, 0], [-0.08, 0.05, 0], [-0.06, 0.005, 0],[-0.04, 0.005, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],[-0.13, 0, 0]];
var p1G = [[0.13, 0, 0.04], [0.13, 0.04, 0.04], [0.1, 0.07, 0.04], [0.08, 0.05, 0.04], [0.06, 0.005, 0.04],[0.04, 0.005, 0.04], [0, 0, 0.04], [0, 0,0.04], [0, 0, 0.04],[0.13, 0, 0.04]];
var p1bG = [[-0.13, 0, 0.04], [-0.13, 0.04, 0.04], [-0.1, 0.07, 0.04], [-0.08, 0.05, 0.04], [-0.06, 0.005, 0.04],[-0.04, 0.005, 0.04], [0, 0, 0.04], [0, 0,0.04], [0, 0, 0.04],[-0.13, 0, 0.04]];

var c0G = BEZIER(S0)(p0G);
var c0bG = BEZIER(S0)(p0bG);
var c1G = BEZIER(S0)(p1G);
var c1bG = BEZIER(S0)(p1bG);
var p2G = [[0.08, 0, 0]];
var p3G = [[-0.08, 0, 0]];
var p4G = [[0.08, 0, 0.04]];
var p5G = [[-0.08, 0, 0.04]];


var c2G = BEZIER(S0)(p2G);
var c2bG = BEZIER (S0)(p3G);
var c3G = BEZIER(S0)(p4G);
var c3bG = BEZIER (S0)(p5G);
var curve1G = BEZIER(S1)([c0G,c2G]);
var surface1G = MAP(curve1G)(domain2);
var curve1bG = BEZIER(S1)([c0bG,c2bG]);
var surface1bG = MAP(curve1bG)(domain2);
var curve3bG = BEZIER(S1)([c3G,c1G]);
var surface3bG = MAP(curve3bG)(domain2);
var curve4bG = BEZIER(S1)([c1bG,c3bG]);
var surface4bG = MAP(curve4bG)(domain2);
//DRAW(COLOR([1, 1, 1])(surface1));
//DRAW(COLOR([1, 1, 1])(surface1b));
//DRAW(COLOR([1, 1, 1])(surface3b));
//DRAW(COLOR([1, 1, 1])(surface4b));

var lateral1G = BEZIER(S1)([c0G,c1G]);
var insert1G = MAP(lateral1G)(domain2);
//DRAW(COLOR([1, 1, 1])(insert1));

var lateral2G = BEZIER(S1)([c0bG,c1bG]);
var insert2G = MAP(lateral2G)(domain2);
//DRAW(COLOR([1, 1, 1])(insert2));

var gir = STRUCT([surface1G, surface1bG, surface3bG, surface4bG, insert1G, insert2G]);
var girevo = R([0, 1, 2])([3*PI/2])(gir);
var girevol = R([1, 2])([PI/4])(girevo);
var girevole = T([0, 1, 2])([0.042, 0.02, 0.03])(girevol);

var whole = STRUCT([girevole, appoggio]);
var whole1 = T([2])([0.5])(whole);

var manopolaGirevole = COLOR([139/255, 0, 1])(whole1);

//DRAW(COLOR([1, 0, 0])(whole1));

//Insert coins

var controlpointsFronte = [[0,0.05, 0],[0,-0.05, 0],[0, 0.4, -0.5],[0,0.4, 0.5]]; 
var cFronte = CUBIC_HERMITE(S0)(controlpointsFronte); 
//var curveFronte = MAP(cFronte)(domain1); 
//var curveFronte1 = T([2])([0.8])(curveFronte);
var controlpointsFronteS = [[0,0.05, 0],[0,-0.05, 0],[0, 0.2, -0.25],[0,0.2, 0.25]]; 
var cFronteS = CUBIC_HERMITE(S0)(controlpointsFronteS); 
//var curveFronteS = MAP(cFronteS)(domain1); 
//var curveFronteS1 = T([2])([0.8])(curveFronteS);
var controlpointsRetro = [[0.03,0.05, 0],[0.03,-0.05, 0],[0, 0.4, -0.5],[0,0.4, 0.5]]; 
var cRetro = CUBIC_HERMITE(S0)(controlpointsRetro); 
//var curveRetro = MAP(cRetro)(domain1); 
//var curveRetro1 = T([2])([0.8])(curveRetro);
var s1F = BEZIER(S1)([cFronte, cRetro])
var surf1F = MAP(s1F)(domain2);
//DRAW(surf1F);
var controlpointsRetroS = [[0.03,0.05, 0],[0.03,-0.05, 0],[0, 0.2, -0.25],[0,0.2, 0.25]]; 
var cRetroS = CUBIC_HERMITE(S0)(controlpointsRetroS); 
//var curveRetroS = MAP(cRetroS)(domain1); 
//var curveRetroS1 = T([2])([0.8])(curveRetroS);
var s1R = BEZIER(S1)([cRetro, cRetroS])
var surf1R = MAP(s1R)(domain2);
//DRAW(surf1R);
var insertCoinsAlfa = STRUCT([surf1F, surf1R]);
var insertCoinsBeta = T([2])([0.8])(insertCoinsAlfa);
var insertCoins = COLOR([139/255, 0, 1])(insertCoinsBeta);
//DRAW(T([2])([0.8])(COLOR([1, 0, 0])(insertCoins)));


// uscita caramelle

var controlpointsX = [[0,0.08, 0],[0,-0.08, 0],[0.6, 0, 0],[-0.6,0, 0]]; 
var cX = CUBIC_HERMITE(S0)(controlpointsX); 
var curveX = MAP(cX)(domain1); 
//DRAW(curveX);

var controlpointsY = [[0, 0.08, 0],[0, -0.08, 0],[0, -0.08, 0],[0,0.08, 0]]; 
var cY = CUBIC_HERMITE(S0)(controlpointsY); 
var curveY = MAP(cY)(domain1); 
//DRAW(curveY);

var controlpointsZ = [[0,0.08, 0.03],[0,-0.08, 0.03],[0.6, 0, 0],[-0.6,0, 0]]; 
var cZ = CUBIC_HERMITE(S0)(controlpointsZ); 
var curveZ = MAP(cZ)(domain1); 
//DRAW(curveZ);

var s1U = BEZIER(S1)([cX, cY])
var surf1U = MAP(s1U)(domain2);
var surfaceF = COLOR([139/255, 0, 1])(surf1U);
//DRAW(COLOR([1, 0, 0])(surf1));
var s2U = BEZIER(S1)([cX, cZ])
var surf2U = MAP(s2U)(domain2);
var surfaceG = COLOR([139/255, 0, 1])(surf2U);
//DRAW(COLOR([1, 0, 0])(surf2));

var controlpointsA = [[0,0.08, 0],[0,-0.08, 0],[0, 0, 0.45],[0,0, -0.45]]; 
var cA = CUBIC_HERMITE(S0)(controlpointsA); 
var curveA = MAP(cA)(domain1); 
//DRAW(curveA);

var controlpointsB = [[0.06, 0.08, 0],[0.06, -0.08, 0],[0, 0, 0.45],[0,0, -0.45]]; 
var cB = CUBIC_HERMITE(S0)(controlpointsB); 
var curveB = MAP(cB)(domain1); 
//DRAW(curveB);

var sAB = BEZIER(S1)([cA, cB])
var surfAB = MAP(sAB)(domain2);
var surfaceH = COLOR([139/255, 0, 1])(surfAB);
//DRAW(COLOR([1, 0, 0])(surfAB));

var sYB = BEZIER(S1)([cY, cB])
var surfYB = MAP(sYB)(domain2);
var surfaceM = COLOR([153/255, 17/255, 153/255])(surfYB);



//caramelle
var SphereRosa = function (r, n){
  var d = DOMAIN ([[0, 2*PI], [0, 2*PI]])([n, n]);
  var mapping = function(p){
    var beta = p[0];
    var alfa = p[1];
    return [r*COS(alfa)*COS(beta), r*COS(alfa)*SIN(beta), r*SIN(alfa)];
  }
  var mapped = MAP (mapping)(d);
  return (COLOR([0.5, 0, 0.5])(mapped));
  
}
var SphereCiano = function (r, n){
  var d = DOMAIN ([[0, 2*PI], [0, 2*PI]])([n, n]);
  var mapping = function(p){
    var beta = p[0];
    var alfa = p[1];
    return [r*COS(alfa)*COS(beta), r*COS(alfa)*SIN(beta), r*SIN(alfa)];
  }
  var mapped = MAP (mapping)(d);
  return (COLOR([1, 1, 0.4])(mapped));
  
}

var SphereVerde = function (r, n){
  var d = DOMAIN ([[0, 2*PI], [0, 2*PI]])([n, n]);
  var mapping = function(p){
    var beta = p[0];
    var alfa = p[1];
    return [r*COS(alfa)*COS(beta), r*COS(alfa)*SIN(beta), r*SIN(alfa)];
  }
  var mapped = MAP (mapping)(d);
  return (COLOR([0, 1, 0])(mapped));
  
}

var SphereGialla = function (r, n){
  var d = DOMAIN ([[0, 2*PI], [0, 2*PI]])([n, n]);
  var mapping = function(p){
    var beta = p[0];
    var alfa = p[1];
    return [r*COS(alfa)*COS(beta), r*COS(alfa)*SIN(beta), r*SIN(alfa)];
  }
  var mapped = MAP (mapping)(d);
  return (COLOR([0, 0.5, 0.5])(mapped));
  
}
var SphereArancione = function (r, n){
  var d = DOMAIN ([[0, 2*PI], [0, 2*PI]])([n, n]);
  var mapping = function(p){
    var beta = p[0];
    var alfa = p[1];
    return [r*COS(alfa)*COS(beta), r*COS(alfa)*SIN(beta), r*SIN(alfa)];
  }
  var mapped = MAP (mapping)(d);
  return (COLOR([1, 0.6, 0])(mapped));
  
}
var SphereIndaco = function (r, n){
  var d = DOMAIN ([[0, 2*PI], [0, 2*PI]])([n, n]);
  var mapping = function(p){
    var beta = p[0];
    var alfa = p[1];
    return [r*COS(alfa)*COS(beta), r*COS(alfa)*SIN(beta), r*SIN(alfa)];
  }
  var mapped = MAP (mapping)(d);
  return (COLOR([49/255, 0, 98/255])(mapped));
  
}
var SphereForesta = function (r, n){
  var d = DOMAIN ([[0, 2*PI], [0, 2*PI]])([n, n]);
  var mapping = function(p){
    var beta = p[0];
    var alfa = p[1];
    return [r*COS(alfa)*COS(beta), r*COS(alfa)*SIN(beta), r*SIN(alfa)];
  }
  var mapped = MAP (mapping)(d);
  return (COLOR([34/255, 139/255, 34/255])(mapped));
  
}

var SphereAzzurra = function (r, n){
  var d = DOMAIN ([[0, 2*PI], [0, 2*PI]])([n, n]);
  var mapping = function(p){
    var beta = p[0];
    var alfa = p[1];
    return [r*COS(alfa)*COS(beta), r*COS(alfa)*SIN(beta), r*SIN(alfa)];
  }
  var mapped = MAP (mapping)(d);
  return (COLOR([0, 127/255, 255/255])(mapped));
  
}
var SphereFragola = function (r, n){
  var d = DOMAIN ([[0, 2*PI], [0, 2*PI]])([n, n]);
  var mapping = function(p){
    var beta = p[0];
    var alfa = p[1];
    return [r*COS(alfa)*COS(beta), r*COS(alfa)*SIN(beta), r*SIN(alfa)];
  }
  var mapped = MAP (mapping)(d);
  return (COLOR([206/255, 48/255, 24/255])(mapped));
  
}
var cm1 = T([0, 2])([0.1, 0.05])(SphereCiano (0.05, 50));
var cm2 = T([0, 2])([-0.5, 1])(SphereRosa (0.05, 50));
var cm3 = T([0, 2])([-0.3, 1])(SphereRosa (0.05, 50));
var cm3 = T([0, 2])([-0.3, 1])(SphereRosa (0.05, 50));
var cm4 = T([0,1, 2])([-0.4,0.15, 1])(SphereCiano (0.05, 50));
var cm5 = T([0,1, 2])([-0.4,-0.15, 1])(SphereCiano (0.05, 50));
var cm6 = T([0,1, 2])([-0.4,-0, 1])(SphereGialla (0.05, 50));
var cm7 = T([0,1, 2])([-0.25,-0.1, 1])(SphereVerde (0.05, 50));
var cm8 = T([0,1, 2])([-0.25,0.1, 1])(SphereCiano (0.05, 50));
var cm9 = T([0,1, 2])([-0.5,0.1, 1])(SphereGialla (0.05, 50));
var cm10 = T([0,1, 2])([-0.5,-0.1, 1])(SphereGialla (0.05, 50));
var cm11 = T([0,1, 2])([-0.18,-0.1, 1.08])(SphereArancione (0.05, 50));
var cm12 = T([0,1, 2])([-0.3,-0.1, 1.08])(SphereArancione (0.05, 50));
var cm13 = T([0,1, 2])([-0.3,-0.2, 1.08])(SphereGialla (0.05, 50));
var cm14 = T([0,1, 2])([-0.4,-0.15, 1.08])(SphereVerde (0.05, 50));
var cm15 = T([0,1, 2])([-0.4,-0.05, 1.08])(SphereRosa (0.05, 50));
var cm16 = T([0,1, 2])([-0.3,0.05, 1.08])(SphereIndaco(0.05, 50));
var cm17 = T([0,1, 2])([-0.19,0.1, 1.08])(SphereIndaco(0.05, 50));
var cm18 = T([0,1, 2])([-0.19,0, 1.08])(SphereCiano(0.05, 50));
var cm19 = T([0,1, 2])([-0.5,-0.1, 1.08])(SphereIndaco(0.05, 50));
var cm20 = T([0,1, 2])([-0.3,0.15, 1.08])(SphereRosa(0.05, 50));
var cm21 = T([0,1, 2])([-0.5,0.14, 1.08])(SphereForesta(0.05, 50));
var cm22 = T([0,1, 2])([-0.4,0.11, 1.08])(SphereGialla(0.05, 50));
var cm23 = T([0,1, 2])([-0.41,0.2, 1.08])(SphereAzzurra(0.05, 50));
var cm24 = T([0,1, 2])([-0.55,0.03, 1.08])(SphereAzzurra(0.05, 50));
var cm25 = T([0,1, 2])([-0.228,0.02, 1.17])(SphereAzzurra(0.05, 50));
var cm26 = T([0,1, 2])([-0.15,-0.02, 1.17])(SphereForesta(0.05, 50));
var cm27 = T([0,1, 2])([-0.15,-0.12, 1.16])(SphereRosa(0.05, 50));
var cm28 = T([0,1, 2])([-0.23,-0.19, 1.15])(SphereCiano(0.05, 50));
var cm29 = T([0,1, 2])([-0.25,-0.09, 1.17])(SphereVerde(0.05, 50));
var cm30 = T([0,1, 2])([-0.4,-0.2, 1.17])(SphereAzzurra(0.05, 50));
var cm31 = T([0,1, 2])([-0.31,-0.23, 1.17])(SphereFragola(0.05, 50));
var cm32 = T([0,1, 2])([-0.5,-0.22, 1.17])(SphereGialla(0.05, 50));
var cm33 = T([0,1, 2])([-0.58,-0.13, 1.17])(SphereArancione(0.05, 50));
var cm34 = T([0,1, 2])([-0.58,-0.05, 1.08])(SphereFragola(0.05, 50));
var cm35 = T([0,1, 2])([-0.4,-0.05, 1.17])(SphereFragola(0.05, 50));
var cm36 = T([0,1, 2])([-0.53,-0.05, 1.17])(SphereRosa(0.05, 50));
var cm37 = T([0,1, 2])([-0.6, 0.05, 1.17])(SphereVerde(0.05, 50));
var cm38 = T([0,1, 2])([-0.625, -0.04, 1.17])(SphereCiano(0.05, 50));
var cm39 = T([0,1, 2])([-0.47, -0.12, 1.17])(SphereCiano(0.05, 50));
var cm40 = T([0,1, 2])([-0.4, 0.05, 1.17])(SphereForesta(0.05, 50));
var cm41 = T([0,1, 2])([-0.15, 0.075, 1.17])(SphereFragola(0.05, 50));
var cm42 = T([0,1, 2])([-0.21, 0.18, 1.15])(SphereArancione(0.05, 50));
var cm43 = T([0,1, 2])([-0.31, 0.22, 1.15])(SphereRosa(0.05, 50));
var cm44 = T([0,1, 2])([-0.4, 0.25, 1.16])(SphereVerde(0.05, 50));
var cm45 = T([0,1, 2])([-0.5, 0.218, 1.16])(SphereIndaco(0.05, 50));
var cm46 = T([0,1, 2])([-0.58, 0.14, 1.16])(SphereFragola(0.05, 50));
var cm47 = T([0,1, 2])([-0.5,-0.176, 1.08])(SphereIndaco(0.05, 50));

var caramelle = STRUCT([cm1,cm2, cm3, cm4, cm5, cm6, cm7, cm8, cm9, cm10, cm11, cm12, cm13, cm14, cm15, cm16, cm17, cm18, cm19, cm20, cm21, cm22, cm23, cm24, cm25, cm26, cm27, cm28,
 cm29, cm30, cm31, cm32, cm33, cm34, cm35, cm36, cm37, cm38, cm39, cm40,
 cm41, cm42, cm43, cm44, cm45, cm46, cm47]);

var scmodel = STRUCT([surfaceA, surfaceB, surfaceC, surfaceD, surfaceE, contenitore, manopolaGirevole, insertCoins, surfaceF, surfaceG, surfaceH, caramelle, surfaceL, surfaceM]);

/////////////////////////////////////////////
return scmodel;
})();

exports.author = 'furio';
exports.category = 'villas';
exports.scmodel = scmodel;

if (!module.parent) {
  fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
}

}(this));