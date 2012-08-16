/*
@Authors:
- Luca Menichetti
- Francesco Furiani
- Dario Pasquantonio
- Marco Ungania
- Andrea Somma
- Fabrizio Rebecca
- Alessio Conte
- Luca Nardini
*/

!(function (exports){
	var king = [];	
	var domain2 = DOMAIN([[0,1],[0,2*PI]])([20,35]);

	var r = -1.3;
	var p0 = [[5+r,0,0], [5.2+r,0,0], [5.2+r,0,0.5], [4.4+r,0,0.6]];
	var k0 = [0,0,0,1,2,2,2];
	var c0 = NUBS(S0)(2)(k0)(p0);
	var m0 = ROTATIONAL_SURFACE(c0);
	var s0 = MAP(m0)(domain2);	
	king.push(s0);

	var d1 = 0.5;
	var p1 = [[4.4+r,0,0.6],[4.7+r,0,0.6],[4.8+r,0,1],
		[4.7+r,0,1.2],[4.5+r,0,1.3],[3.3+d1+r,0,1.7],[3.25+d1+r,0,1.71],[3.25+d1+r,0,2]];
	var k1 = [0,0,0,1,2,3,4,5,6,6,6];
	var c1 = NUBS(S0)(2)(k1)(p1);
	var m1 = ROTATIONAL_SURFACE(c1);
	var s1 = MAP(m1)(domain2);	
	king.push(s1);

	var p2 = [[3.25+d1+r,0,2],[2.9+d1+r,0,2]];
	var c2 = BEZIER(S0)(p2);
	var m2 = ROTATIONAL_SURFACE(c2);
	var s2 = MAP(m2)(domain2);	
	king.push(s2);

	// corpo del pezzo
	var p3 = [[2.9+d1+r,0,2],[2.1+d1+r,0,4],[1.8+d1+r,0,8],[2+d1+r,0,10]];
	var k3 = [0,0,0,1,2,2,2];
	var c3 = NUBS(S0)(2)(k3)(p3);
	var m3 = ROTATIONAL_SURFACE(c3);
	var s3 = MAP(m3)(domain2);	
	s3 =  T([2])([-0.4])( S([2])([1.2])(s3) );
	king.push(s3);

	var p4 = [[2+d1+r,0,10],[2.9+d1+r,0,10],
		[3+r+d1,0,10.2], [2.9+r+d1,0,10.4], [2.3+r+d1,0,10.45]];
	var k4 = [0,0,0,1,2,3,3,3];
	var c4 = NUBS(S0)(2)(k4)(p4);
	var m4 = ROTATIONAL_SURFACE(c4);
	var s4 = MAP(m4)(domain2);	

	var p5 = [[2.3+d1+r,0,10.45],[2.4+d1+r,0,10.45],
		[2.45+r+d1,0,10.65], [2.4+r+d1,0,10.86], [1.8+r+d1,0,10.85]];
	var k5 = [0,0,0,1,2,3,3,3];
	var c5 = NUBS(S0)(2)(k5)(p5);
	var m5 = ROTATIONAL_SURFACE(c5);
	var s5 = MAP(m5)(domain2);	

	var p6 = [[1.8+d1+r,0,10.85],[1.8+d1+r,0,11.15]];
	var c6 = BEZIER(S0)(p6);
	var m6 = ROTATIONAL_SURFACE(c6);
	var s6 = MAP(m6)(domain2);	

	var p7 = [[1.8+d1+r,0,11.15],[1.9+d1+r,0,11.15],
		[1.95+r+d1,0,11.25], [1.9+r+d1,0,11.35], [1.8+r+d1,0,11.35]];
	var k7 = [0,0,0,1,2,3,3,3];
	var c7 = NUBS(S0)(2)(k7)(p7);
	var m7 = ROTATIONAL_SURFACE(c7);
	var s7 = MAP(m7)(domain2);	

	var x = 0.2;	
	var d2 = -0.4;
	var p8 = [[1,0,11.35],[1,0,11.6], 
		[1.8,0,12.8], [2,0,13.3]];
	var k8 = [0,0,0,1,2,2,2];
	var c8 = NUBS(S0)(2)(k8)(p8);
	var m8 = ROTATIONAL_SURFACE(c8);
	var s8 = MAP(m8)(domain2);	

	var p9 = [[2,0,13.3], [1.8,0,13.35+x], 
		[1.5,0,13.4+x], [1,0,13.45+x], [0.5,0,13.5+x]];
	var k9 = [0,0,0,1,2,3,3,3];
	var c9 = NUBS(S0)(2)(k9)(p9);
	var m9 = ROTATIONAL_SURFACE(c9);
	var s9 = MAP(m9)(domain2);	


	var p10 = [[0.5,0,13.5+x], [0.6,0,13.5+x], [0.6,0,14+x], [0.4,0,14+x], [0,0,14+x]];
	var k10 = [0,0,0,1,2,3,3,3];
	var c10 = NUBS(S0)(2)(k10)(p10);
	var m10 = ROTATIONAL_SURFACE(c10);
	var s10 = MAP(m10)(domain2);


	var width = 0.5; 	// thickness = width
	var depth = width*3;
	var half_crown1 = CUBOID([width,width,depth]);
	var half_crown2 = TRANSLATE([0,2])([-width,depth-width])( ROTATE([0,2])([PI/2])(half_crown1) );
	var cross = STRUCT([half_crown1, half_crown2]);
	cross = T([0,1,2])([-width/2,-width/2,15.6])(cross);
	king.push(cross);

	var sTrans = T([2])([1.4])(STRUCT([s4,s5,s6,s7,s8,s9,s10]));
	king.push(sTrans);


	var sphereSurface = function (r, n) {  
	  var domain = DOMAIN([[0,PI], [0,2*PI]])([n,n*2]);
	  var mapping = function (p) {
	    var u = p[0];
	    var v = p[1];
	    return [
	      r * SIN(u) * COS(v),
	      r * SIN(u) * SIN(v),
	      r * COS(u)
	    ];
	  };
	  return MAP(mapping)(domain);
	};

	var sphere = sphereSurface(0.2,20);
	king.push(T([2])([17.3])(sphere));

	var b = [[5+r,0,0],[0+r,0,0]];
	var cb = BEZIER(S0)(b);
	var mb = ROTATIONAL_SURFACE(cb);
	var sb = MAP(mb)(domain2);	
	king.push(sb);

	// EXPORT THE MODEL
	var struct1 = STRUCT(king,cross);
	struct1 = S([0,1,2])([0.15,0.15,0.15])(struct1);
	exports.king = T([2])([1])(struct1);

}(this));


!(function (exports){
var sphereSurface = function (r) {  
	  var domain = DOMAIN([[0,PI], [0,2*PI]])([r*25,r*25*2]);
	  var mapping = function (p) {
		var u = p[0];
		var v = p[1];

		return [r * SIN(u) * COS(v), r * SIN(u) * SIN(v), r * COS(u)];
	  };

	  return MAP(mapping)(domain);
	};

	var ruotaPunti = function(pointList, angolo, asse) {
	    if (asse === 0) {
	      var alfa = angolo;
	      return pointList.map( function(pt) { 
		return [ pt[0], pt[1]*COS(alfa) + (-1)*pt[2]*SIN(alfa), pt[1]*SIN(alfa) + pt[2]*COS(alfa) ];
	      });
	    } else if (asse === 1) {
	      var beta = angolo;
	      return pointList.map( function(pt) { 
		return [ pt[0]*COS(beta) + pt[2]*SIN(beta), pt[1], (-1)*pt[0]*SIN(beta) + pt[2]*COS(beta) ];
	      });
	    } else if (asse === 2) {
	      var gamma = angolo;
	      return pointList.map( function(pt) { 
		return [ pt[0]*COS(gamma) + (-1)*pt[1]*SIN(gamma), pt[0]*SIN(gamma) + pt[1]*COS(gamma), pt[2] ];
	      });
	    }

	    return pointList;
	};

	var basicControlPoints = [];
	// Pre Base I
	basicControlPoints.push([[0,0.1,0],[2,0.1,0],[0,0,0],[0,0,0]]);
	// Pre Base II
	basicControlPoints.push([[2,0.1,0],[2.5,0,0],[0,-0.3,0],[1.7,0,0]]);
	// Base
	basicControlPoints.push([[2.5,0,0],[1.3,1,0],[0,3.8,0],[1,0,0]]);
	// Rigonfiamento sopra base I
	basicControlPoints.push([[1.3,1,0],[1.8,1.5,0],[1,0,0],[0,0.75,0]]);
	// Rigonfiamento sopra base II
	basicControlPoints.push([[1.8,1.5,0],[1.3,2,0],[0,0.75,0],[-1,0,0]]);
	// Salita su primo anello I
	basicControlPoints.push([[1.3,2,0],[0.9,2.3,0],[-1,0,0],[0,0.1,0]]);
	// Salita su primo anello II
	basicControlPoints.push([[0.9,2.3,0],[1.1,2.5,0],[0,0.1,0],[0.7,0,0]]);
	// primo anello
	basicControlPoints.push([[1.1,2.5,0],[1.1,2.6,0],[0.15,-0.05,0],[-0.15,-0.05,0]]);
	// Salita lunga I
	basicControlPoints.push([[1.1,2.6,0],[0.5,4,0],[-2,1,0],[0,0.5,0]]);
	// Salita lunga II
	basicControlPoints.push([[0.5,4,0],[1.5,5.4,0],[0,3,0],[1,0,0]]);
	// secondo anello
	basicControlPoints.push([[1.5,5.4,0],[1.5,5.55,0],[0.1,0,0],[-0.1,0,0]]);
	// Salita prima di sfera
	basicControlPoints.push([[1.5,5.55,0],[0.5,6.55,0],[-3,0,0],[0,0.1,0]]);

	// Funzione curva (o debug o la CUBIC)
	var HER0 = CUBIC_HERMITE(S0); // drawHermiteS0Curve;
	// Marrone pastello 152,118,84
	var COLMP = COLOR([152/255,118/255,84/255]);
	// Risoluzione di rotazione
	var resRot = 25;

	// muoviamo punti asse X
	var puntiAsseXZ = basicControlPoints.map(function(ptlist) {return ruotaPunti(ptlist,PI/2,0);});
	AA(HER0)(puntiAsseXZ);

	// Dominio
	// var domainSurface = DOMAIN([[0,1],[0,2*PI],[0,1]])([resRot,resRot,1]);
	var domainSurface = DOMAIN([[0,1],[0,2*PI]])([resRot,resRot]);

	// Generate hermits rotational surfaces
	var generatedHermitFunctions = AA(HER0)(puntiAsseXZ);
	var generatedRotationalSurfaces = AA(ROTATIONAL_SURFACE)(generatedHermitFunctions);
	var generatedSurfaces = CONS( AA(MAP)(generatedRotationalSurfaces) )(domainSurface);

	// Colora e genera superfici
	var structSuperfici = STRUCT(generatedSurfaces);
	// DRAW(COLMP(structSuperfici));

	// Sfera sopra
	var sphereTop = T([2])([6.55+0.5])(sphereSurface(1,10));
	// DRAW(COLMP(sphereTop));
	var pawn = STRUCT([structSuperfici,sphereTop] );
	pawn = S([0,1,2])([0.2,0.2,0.2])(pawn);
	pawn = T([2])([1])(pawn);
	exports.pawn = pawn;
	
}(this));




!(function (exports,circleSegments,heightHRSegments,heightLRSegments){ //i parametri servono per impostare manualmente il numero di segmenti, altrimenti vengono presi valori di default

		circleSegments = circleSegments || 60;
		heightLRSegments = heightLRSegments || 10;
		heightHRSegments = heightHRSegments || 40;

		var cilinderDomain = DOMAIN([[0,1],[0,2*PI],[0,1]])([1,circleSegments,1]);
		var domainHRes = DOMAIN([[0,1],[0,2*PI]])([heightHRSegments,circleSegments]);
		var domainLRes = DOMAIN([[0,1],[0,2*PI]])([heightLRSegments,circleSegments]);


		var altezza = 1.5;
		var raggio = 0.4;



		var mkCilinder = function(r,h){


			var mapping = function(p){
				var dr = p[0];
				var alfa = p[1];
				var dh = p[2];

				return [r*dr*COS(alfa),r*dr*SIN(alfa),h*dh];
			}

			return MAP(mapping)(cilinderDomain);

		}


		var traslaPunti = function (arr,x,y,z){
			return arr.map(function(el){return [el[0]+x,el[1]+y,el[2]+z];});
		}
		var scalaPunti = function (arr,x,y,z){
			return arr.map(function(el){return [el[0]*x,el[1]*y,el[2]*z];});
		}

		var scalaPerTorre = function(arr){
			return scalaPunti(arr,(raggio/2),(raggio/2),(altezza/5.3));
		}

		var scaleAll = function (model,factor){
			return S([0,1,2])([factor,factor,factor])(model);
		}



		var mkPartOfCoronaCircolare = function(r1,r2,h,alfa1,alfa2,n){
			var domain = DOMAIN([[r1,r2],[alfa1,alfa2],[0,1]])([1,n,1]);

			var mapping = function(p){
				var r = p[0];
				var alfa = p[1];
				var dh = p[2];

				return [r*COS(alfa),r*SIN(alfa),h*dh];
			}

			return MAP(mapping)(domain);
		}


		var baseTorre = mkCilinder(raggio,0.3*(altezza/5.3));

		var rigonfiamentoBasso = CUBIC_HERMITE(S0)(scalaPerTorre( [[1.9,0,0.3],[1.8,0,1],[0.5,0,0.5],[-0.8,0,0.5]] ) ); //p0 p1 t0 t1
		var raccordoRigonfiamento = CUBIC_HERMITE(S0)(scalaPerTorre( [[1.8,0,1],[1.5,0,1.5],[-0.8,0,0.5],[0,0,0.3]] ) ); //p0 p1 t0 t1
		var scalino = CUBIC_HERMITE(S0)(scalaPerTorre( [[1.5,0,1.5],[1.4,0,1.6],[0,0,0.3],[-0.15,0,0.3]] ) ); //p0 p1 t0 t1
		var corpo = CUBIC_HERMITE(S0)(scalaPerTorre( [[1.4,0,1.6],[1.2,0,3.8],[-0.3,0,0.5],[0,0,2.5]],40 ) ); //p0 p1 t0 t1
		var scalinoAlto = CUBIC_HERMITE(S0)(scalaPerTorre( [[1.2,0,3.8],[1.4,0,3.9],[0,0,0.3],[0.1,0,0.3]] ) ); //p0 p1 t0 t1
		var collo = CUBIC_HERMITE(S0)(scalaPerTorre( [[1.4,0,3.9],[1.65,0,4.25],[0.1,0,0.3],[0.4,0,0.1]] ) ); //p0 p1 t0 t1
		var coronaBassa = CUBIC_HERMITE(S0)(scalaPerTorre( [[1.65,0,4.25],[1.65,0,4.37],[0.2,0,0],[-0.2,0,0]] ) ); //p0 p1 t0 t1
		var scanalatura = CUBIC_HERMITE(S0)(scalaPerTorre( [[1.65,0,4.37],[1.65,0,4.4],[-0.2,0,0],[0.2,0,0]] ) ); //p0 p1 t0 t1
		var coronaMedia = CUBIC_HERMITE(S0)(scalaPerTorre( [[1.65,0,4.4],[1.7,0,4.7],[0.2,0,0],[0,0,0.5]] ) ); //p0 p1 t0 t1


		var profiloLOWRes = [scalino,scalinoAlto,collo,coronaBassa,scanalatura,coronaMedia];

		var profiloHIGHRes = [rigonfiamentoBasso,raccordoRigonfiamento,corpo];



		var getSurf = function(curva,domain){
			var mapping = ROTATIONAL_SURFACE(curva);
			return MAP(mapping)(domain);
		}

		var getSurfLR = function(curva){
			return getSurf(curva,domainLRes);
		}
		var getSurfHR = function(curva){
			return getSurf(curva,domainHRes);
		}


		var torreLR = STRUCT(AA(getSurfLR)(profiloLOWRes));
		var torreHR = STRUCT(AA(getSurfHR)(profiloHIGHRes));

		var tappo = mkCilinder(1.7*(raggio/2),0.1*(altezza/5.3));
		tappo.translate([2],[4.7*(altezza/5.3)]);

		var coronaAlta = [];

		var numDenti = 6;
		var percVuoto = 0.2;

		for(var i = 0; i<numDenti; i++){
			var alfa1 = i*(2*PI/numDenti);
			var alfa2 = alfa1+(((1-percVuoto)*2*PI)/numDenti);

			var dente = mkPartOfCoronaCircolare(1.35*(raggio/2),1.7*(raggio/2),0.5*(altezza/5.3),alfa1,alfa2,Math.round( (circleSegments*(1-percVuoto))/numDenti ) );
			dente.translate([2],[4.8*(altezza/5.3)]);

			coronaAlta.push(dente);
		}


		var TORRE = STRUCT([torreHR,torreLR,baseTorre,tappo,STRUCT(coronaAlta)]);

		TORRE = T([2])([1])(TORRE);
		exports.rook = TORRE;

	}(this));

!(function (exports){
var points = [[10,0,0],[6,2,0],[4.2,5,0],[4,8,0],[5,11,0],[7,14,0],[9,16,0],[11,17,0],[12,18,0],[13,19,0],[12,20,0],[9,21,0],[6,23,0],[5,25,0],[5,28,0],[7,29,0],[9,29.5,0],[13,29.5,0],[17,29.5,0],[18,32,0],[21,30,0],[23,27,0],[23,22,0],[22,18,0],[20.5,12,0],[21,8,0],[22,4,0],[23,1,0],[21,0,0],[10,0,0]];
var knots = [0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,28,28];
var profileBody = NUBS(S0)(2)(knots)(points);
var dom = DOMAIN([[0,1],[0,1],[0,1]])([50,1,1]);
var fakeBody = BEZIER(S0)([[18,25,0]]);
var bodySurface = BEZIER(S1)([profileBody, fakeBody]);

var prof2Points = points.map(function(p){return [p[0], p[1], p[2] + 5.5]});
var fakeBody2 = BEZIER(S0)([[18,25,5.5]]);
var profileBody2 = NUBS(S0)(2)(knots)(prof2Points);
var bodySurface2 = BEZIER(S1)([profileBody2, fakeBody2]);
var horse = BEZIER(S2)([bodySurface, bodySurface2]);
var d = MAP(horse)(dom);

var x = 3.5
var crestaPoints = [[18,32,0],[21,30,0],[23,27,0],[23,22,0],[22,18,0],[20.5,12,0],[21,8,0],[22,4,0],[23,3,0],[21,2,0],[21+x,2,0],[23+x,3,0],[22+x,4,0],[21+x,8,0],[20.5+x,15,0],[22+x,18,0],[23+x,22,0],[23+x,27 + 1,0],[21+x,30 + x,0],[16,32 + 3/2*x,0],[18,32,0]]
var knots2 = [0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,19,19];
var cres = NUBS(S0)(2)(knots2)(crestaPoints);
var fakeCRES = BEZIER(S0)([[23,27 + 1,0]]);
var cresta = BEZIER(S1)([cres,fakeCRES]);

var dom2d = DOMAIN([[0,1],[0,1]])([50,1]);
var fakeCRES2 = BEZIER(S0)([[23,27 + 1,3]]);
var crestaPoints2 = crestaPoints.map(function(n){return [n[0],n[1],n[2]+3]});
var cres2 = NUBS(S0)(2)(knots2)(crestaPoints2);
var cresta2 = BEZIER(S1)([cres2,fakeCRES2]);
var crestaSolid = BEZIER(S2)([cresta,cresta2]);

var dis = T([2])([1])(MAP(crestaSolid)(dom));
var finalHorseScaled = S([0,1,2])([0.5,0.5,0.5])(STRUCT([dis, d]));
var finalHorse = T([0,1,2])([-8,13.9,-1.5])(finalHorseScaled);
var basedom = DOMAIN([[0,1],[0,2*PI]])([40,30]);
var basePoints = [[1,0,0],[8,0,0],[7,-4,0],[4,-6,0],[3.5,-7.5,0],[7,-9,0],[3.5,-11,0],[5,-12,0],[4,-14,0],[-2,-14,0]];
var basePoints = basePoints.map(function(p){return [-p[0],p[2],p[1]]});
var knotsBase = [0,0,0,1,2,3,4,5,6,7,8,8,8];
var baseProfile = NUBS(S0)(2)(knotsBase)(basePoints);
var base = ROTATIONAL_SURFACE(baseProfile);
var baseDis = R([1,2])([PI/2])(MAP(base)(basedom));
var chessHorse = STRUCT([baseDis, finalHorse]);
var scmodel = R([1,2])([PI/2])(chessHorse);
var scmodel = S([0,1,2])([0.06,0.06,0.06])(scmodel);
scmodel = T([2])([1])(scmodel);
exports.knight = scmodel;
}(this));

!(function (exports){
	var queen = [];	
	var domain2 = DOMAIN([[0,1],[0,2*PI]])([20,35]);

	var r = -1.3;
	var p0 = [[5+r,0,0], [5.2+r,0,0], [5.2+r,0,0.5], [4.4+r,0,0.6]];
	var k0 = [0,0,0,1,2,2,2];
	var c0 = NUBS(S0)(2)(k0)(p0);
	var m0 = ROTATIONAL_SURFACE(c0);
	var s0 = MAP(m0)(domain2);	
	queen.push(s0);

	var d1 = 0.5;
	var p1 = [[4.4+r,0,0.6],[4.7+r,0,0.6],[4.8+r,0,1],
		[4.7+r,0,1.2],[4.5+r,0,1.3],[3.3+d1+r,0,1.7],[3.25+d1+r,0,1.71],[3.25+d1+r,0,2]];
	var k1 = [0,0,0,1,2,3,4,5,6,6,6];
	var c1 = NUBS(S0)(2)(k1)(p1);
	var m1 = ROTATIONAL_SURFACE(c1);
	var s1 = MAP(m1)(domain2);	
	queen.push(s1);

	var p2 = [[3.25+d1+r,0,2],[2.9+d1+r,0,2]];
	var c2 = BEZIER(S0)(p2);
	var m2 = ROTATIONAL_SURFACE(c2);
	var s2 = MAP(m2)(domain2);	
	queen.push(s2);

	var p3 = [[2.9+d1+r,0,2],[2.1+d1+r,0,4],[1.8+d1+r,0,8],[2+d1+r,0,10]];
	var k3 = [0,0,0,1,2,2,2];
	var c3 = NUBS(S0)(2)(k3)(p3);
	var m3 = ROTATIONAL_SURFACE(c3);
	var s3 = MAP(m3)(domain2);	
	queen.push(s3);

	var p4 = [[2+d1+r,0,10],[2.9+d1+r,0,10],
		[3+r+d1,0,10.2], [2.9+r+d1,0,10.4], [2.3+r+d1,0,10.45]];
	var k4 = [0,0,0,1,2,3,3,3];
	var c4 = NUBS(S0)(2)(k4)(p4);
	var m4 = ROTATIONAL_SURFACE(c4);
	var s4 = MAP(m4)(domain2);	
	queen.push(s4);	

	var p5 = [[2.3+d1+r,0,10.45],[2.4+d1+r,0,10.45],
		[2.45+r+d1,0,10.65], [2.4+r+d1,0,10.86], [1.8+r+d1,0,10.85]];
	var k5 = [0,0,0,1,2,3,3,3];
	var c5 = NUBS(S0)(2)(k5)(p5);
	var m5 = ROTATIONAL_SURFACE(c5);
	var s5 = MAP(m5)(domain2);	
	queen.push(s5);	

	var p6 = [[1.8+d1+r,0,10.85],[1.8+d1+r,0,11.15]];
	var c6 = BEZIER(S0)(p6);
	var m6 = ROTATIONAL_SURFACE(c6);
	var s6 = MAP(m6)(domain2);	
	queen.push(s6);

	var p7 = [[1.8+d1+r,0,11.15],[1.9+d1+r,0,11.15],
		[1.95+r+d1,0,11.25], [1.9+r+d1,0,11.35], [1.8+r+d1,0,11.35]];
	var k7 = [0,0,0,1,2,3,3,3];
	var c7 = NUBS(S0)(2)(k7)(p7);
	var m7 = ROTATIONAL_SURFACE(c7);
	var s7 = MAP(m7)(domain2);	
	queen.push(s7);	

	var d2 = -0.4;
	var p8 = [[1.8+d1+r,0,11.35],[1.8+d1+r,0,12+d2],
		[2.2+r+d1,0,13+d2], [3.2+r+d1,0,13.7+d2]];
	var k8 = [0,0,0,1,2,2,2];
	var c8 = NUBS(S0)(2)(k8)(p8);
	var m8 = ROTATIONAL_SURFACE(c8);
	var s8 = MAP(m8)(domain2);	
	queen.push(s8);	

	var p9 = [[3.2+r+d1,0,13.7+d2], [3.3+d1+r,0,13.8+d2], 
		[3.25+d1+r,0,13.85+d2], [3.1+d1+r,0,13.8+d2], [1.8+d1+r,0,13.4+d2]];
	var k9 = [0,0,0,1,2,3,3,3];
	var c9 = NUBS(S0)(2)(k9)(p9);
	var m9 = ROTATIONAL_SURFACE(c9);
	var s9 = MAP(m9)(domain2);	
	queen.push(s9);	

	var sphereSurface = function (r, n) {  
	  var domain = DOMAIN([[0,PI], [0,2*PI]])([n,n*2]);
	  var mapping = function (p) {
	    var u = p[0];
	    var v = p[1];
	    return [
	      r * SIN(u) * COS(v),
	      r * SIN(u) * SIN(v),
	      r * COS(u)
	    ];
	  };
	  return MAP(mapping)(domain);
	};

	var dome = sphereSurface(1.4,40);
	queen.push(T([2])([13.4+d2])(dome));

	var sphere = sphereSurface(0.4,20);
	queen.push(T([2])([15.1+d2])(sphere));

	var b = [[5+r,0,0],[0+r,0,0]];
	var cb = BEZIER(S0)(b);
	var mb = ROTATIONAL_SURFACE(cb);
	var sb = MAP(mb)(domain2);	
	queen.push(sb);

	// EXPORT THE MODEL
	var struct1 = STRUCT(queen);
	struct1 = S([0,1,2])([0.15,0.15,0.15])(struct1);
	struct1 = T([2])([1])(struct1);
	exports.queenPiece = struct1;

}(this));

 !(function (exports){
var domain = DOMAIN([[0,1],[0,2*PI]])([40,40]);
var littleDomain = DOMAIN([[0,1],[0,2*PI]])([1,40]);
var detailedDomain = DOMAIN([[0,1],[0,2*PI]])([50,50]);

// base
var ctrlPoints = [[1.15,0,0],[1.15,0,0.2]];
var profile = BEZIER(S0)(ctrlPoints);
var mapping = ROTATIONAL_SURFACE(profile);
var base = MAP(mapping)(domain);

// part01
ctrlPoints = [[1.15,0,0.2],[1.05,0,0.3]];
profile = BEZIER(S0)(ctrlPoints);
mapping = ROTATIONAL_SURFACE(profile);
var part01 = MAP(mapping)(littleDomain);

// part02
ctrlPoints = [[1.05,0,0.3],[1.35,0,0.5],[0.75,0,0.7],[0.75,0,1.2]];
profile = BEZIER(S0)(ctrlPoints);
mapping = ROTATIONAL_SURFACE(profile);
var part02 = MAP(mapping)(domain);

// part03
ctrlPoints = [[0.75,0,1.2],[0.65,0,1.3]];
profile = BEZIER(S0)(ctrlPoints);
mapping = ROTATIONAL_SURFACE(profile);
var part03 = MAP(mapping)(littleDomain);

// part04
ctrlPoints = [[0.65,0,1.3],[0.45,0,1.75],[0.4,0,2.6]];
profile = BEZIER(S0)(ctrlPoints);
mapping = ROTATIONAL_SURFACE(profile);
var part04 = MAP(mapping)(domain);

// part05
ctrlPoints = [[0.4,0,2.6],[0.75,0,2.6],[0.75,0,2.6],[0.85,0,3],[0.55,0,3]];
profile = BEZIER(S0)(ctrlPoints);
mapping = ROTATIONAL_SURFACE(profile);
var part05 = MAP(mapping)(domain);

// part06
ctrlPoints = [[0.55,0,3],[0.55,0,3.125],[0.55,0,3.125],[0.45,0,3.2],[0.3,0,3.2],[0.675,0,3.2],[0.5,0,3.35]];
profile = BEZIER(S0)(ctrlPoints);
mapping = ROTATIONAL_SURFACE(profile);
var part06 = MAP(mapping)(domain);

// part07 con "taglio"
ctrlPoints = [[0.5,0,3.35],[0.95,0,3.85],[0.25,0,4.35],[0.2,0,4.75]];
profile = BEZIER(S0)(ctrlPoints);
mapping = ROTATIONAL_SURFACE(profile);
var part07 = MAP(mapping)(detailedDomain);

var cut = function (p) {

	var x = p[0];
	var y = p[1];
	var z = p[2];

	if ( x>0 && x<0.425 && z>(3.95) && z<(4.55)){
		if (z<=(4.05-x))
			return p;
		else if ((x+3.85)>=z)
			return p;
		else if ((x+4.05)<=z)
			return p;
		else if ((x+3.95)>=z && x>=0.1)
			return [0.1,y,3.95];
		else if ((x+3.95)<z && z>=4.05)
			return [0,y,4.05];
		else
			return [z-4.05,y,x+3.85];
	}

	return p;

}

part07 = MAP(cut)(part07);

// part08
ctrlPoints = [[0.2,0,4.75],[0.35,0,4.75],[0.325,0,5.075],[0,0,5.09]];
profile = BEZIER(S0)(ctrlPoints);
mapping = ROTATIONAL_SURFACE(profile);
var part08 = MAP(mapping)(domain);

var scmodel = STRUCT([base,part01,part02,part03,part04,part05,part06,part07,part08]);
//scmodel = COLOR([128/255,128/255,128/255])(scmodel);
scmodel = S([0,1,2])([0.4,0.4,0.4])(scmodel);
scmodel = T([2])([1])(scmodel);
exports.bishop = scmodel;
}(this));

!(function (exports) {

	function lightBrown(model){
		return COLOR([238/255,232/255,170/255,1])(model);
	}

	function darkBrown(model){
		return COLOR([139/255,69/255,19/255,1])(model);
	}

	function borderBrown(model){
		return COLOR([92/255,51/255,23/255,1])(model);
	}

	function ivory(model){
		return COLOR([231/255,214/255,185/255,1])(model);
	}


	function drawSquares() {
		var square = CUBOID([1,1,1]);
		var lightSquare = lightBrown(square);
		var darkSquare = darkBrown(square);

		var x_T = T([0])([1]);
		var y_T = T([1])([1]);

		var oddRow = STRUCT([darkSquare,x_T,lightSquare,x_T,darkSquare,x_T,lightSquare,x_T,
			darkSquare,x_T,lightSquare,x_T,darkSquare,x_T,lightSquare]);

		var evenRow = STRUCT([lightSquare,x_T,darkSquare,x_T,lightSquare,x_T,darkSquare,x_T,
			lightSquare,x_T,darkSquare,x_T,lightSquare,x_T,darkSquare]);

		var matrix = [];
		for(i=0; i<8; i++){
			if(i%2===0){
				matrix.push(evenRow,y_T);
			}
			else matrix.push(oddRow,y_T);
		}
		return STRUCT(matrix);
	}


	function drawSquareBorder() {
		var bottom = T([0,1])([-0.2,-0.2])(CUBOID([8.4,0.2,1]));
		var top = T([0,1])([-0.2,8])(CUBOID([8.4,0.2,1]));
		var left = T([0,1])([-0.2,0])(CUBOID([0.2,8,1]));
		var right = T([0,1])([8,0])(CUBOID([0.2,8,1]));
		var base = T([0,1,2])([-0.2,-0.2,-0.2])(CUBOID([8.4,8.4,0.2]));
		var border = STRUCT([borderBrown(bottom),borderBrown(top),borderBrown(left),borderBrown(right),
			ivory(base)]);
		return border;
	}


	function createIvoryBorder() {
		var domain = DOMAIN([[0,1],[0,1]])([70,1]);

  	var knots = [0,0,0,1,2,3,4,5,6,7,8,9,10,11,11,11];

  	var points1 = [[-0.2,-0.2,1],[-0.3,-0.3,1.1],[-0.2,-0.2,1.2],
  		[-0.4,-0.4,1.3],[-0.5,-0.5,0.9],[-0.3,-0.3,0.8],[-0.6,-0.6,0.8],[-0.4,-0.4,0.6],
  		[-0.7,-0.7,0.6],[-0.3,-0.3,0.1],[-0.9,-0.9,-0.2],[-0.5,-0.5,-0.2],[-0.2,-0.2,-0.2]];

		var points2 = [[8.2,-0.2,1],[8.3,-0.3,1.1],[8.2,-0.2,1.2],
			[8.4,-0.4,1.3],[8.5,-0.5,0.9],[8.3,-0.3,0.8],[8.6,-0.6,0.8],[8.4,-0.4,0.6],
			[8.7,-0.7,0.6],[8.3,-0.3,0.1],[8.9,-0.9,-0.2],[8.5,-0.5,-0.2],[8.2,-0.2,-0.2]];

  	var curve1 = NUBS(S0)(2)(knots)(points1);
		var curve2 = NUBS(S0)(2)(knots)(points2);

 	 	var sup = BEZIER(S1)([curve1,curve2]);
  	sup = MAP(sup)(domain);
  	return sup;
	}

	function drawIvory() {
		var sBottom = createIvoryBorder();
		var sTop = T([0,1])([8,8])(R([0,1])([PI])(sBottom));
		var sLeft = T([1])([8])(R([0,1])([-PI/2])(sBottom));
		var sRight = T([0])([8])(R([0,1])([PI/2])(sBottom));

		var sIvory = STRUCT([sBottom,sTop,sLeft,sRight]);
		return ivory(sIvory);
	}

		function insertPiecein(row,column,model){
			if(row>8||row<0) return movedPiece = T([0,1,2])([row,column,-1])(model);
			else return movedPiece = T([0,1])([row,column])(model);
		

	}

	var black = [];
		black.push(insertPiecein(6.5,5.5,pawn));
		/*black.push(insertPiecein(6.5,6.5,pawn));
		black.push(insertPiecein(5.5,6.5,pawn));
		black.push(insertPiecein(1.5,6.5,pawn));
		black.push(insertPiecein(0.5,6.5,pawn));
		black.push(insertPiecein(-3.5,1.5,pawn));
		black.push(insertPiecein(-3.5,2.5,pawn));
		black.push(insertPiecein(-3.5,3.5,pawn));*/
		black.push(insertPiecein(0.5,7.5,rook));
		//black.push(insertPiecein(2.5,6.5,rook));
		black.push(insertPiecein(4.5,4.5,knight));
		//black.push(insertPiecein(-3.5,4.5,knight));
		//black.push(insertPiecein(7.5,2.5,bishop));
		black.push(insertPiecein(1.5,3.5,bishop));
		black.push(insertPiecein(4.5,6.5,king));
		black.push(insertPiecein(2.5,4.5,queenPiece));
		var blackPieces = COLOR([0.1,0.1,0.1])(STRUCT(black));

		var white = [];
		white.push(insertPiecein(0.5,0.5,pawn));

		/*white.push(insertPiecein(2.5,1.5,pawn));
		white.push(insertPiecein(7.5,1.5,pawn));
		white.push(insertPiecein(-2.5,1.5,pawn));
		white.push(insertPiecein(-2.5,2.5,pawn));
		white.push(insertPiecein(-2.5,3.5,pawn));
		white.push(insertPiecein(-2.5,4.5,pawn));*/
		white.push(insertPiecein(-2.5,5.5,pawn));
		//white.push(insertPiecein(0.5,0.5,rook));
		white.push(insertPiecein(4.5,0.5,rook));
		//white.push(insertPiecein(4.5,1.5,knight));
		white.push(insertPiecein(-2.5,6.5,knight));
		white.push(insertPiecein(3.5,2.5,bishop));
		//white.push(insertPiecein(4.5,4.5,bishop));
		white.push(insertPiecein(5.5,0.5,king));
		//white.push(insertPiecein(0.5,2.5,queenPiece));

	var whitePieces = COLOR([0.99,0.99,0.99])(STRUCT(white));


	var squares = drawSquares();
	var int_borders = drawSquareBorder();
	var ext_borders = drawIvory();
	exports.scmodel = STRUCT([squares,int_borders,ext_borders,blackPieces,whitePieces]);
}(this));