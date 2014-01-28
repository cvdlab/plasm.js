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
 

/* Costruisce una cerchio di raggio r. */

var CIRCLE_PLANE = function (r) {

	var mapping = function (v) {
		alpha = v[0];
		r = v[1];
		return [r*COS(alpha), r*SIN(alpha)];
	}
	dom2D = PROD1x1([INTERVALS(2*PI)(36), INTERVALS(r)(1)]);

	return MAP(mapping)(dom2D);
}


/* Costruisce un cilindro di raggio r, altezza h, e con dominio di divs parti. */

var CYLINDER = function (r,h,divs) {

	var surface = CIRCLE_PLANE(r);
	var cylinder = EXTRUDE([h])(surface);
	return cylinder;
}

/* Costruisce un toro di raggio minore r e raggio maggiore R. */

var TORUS = function (r,R) {

  var mapping = function (v) {
    var a = v[0];
    var b = v[1];
    var u = (r * COS(a) + R) * COS(b);
    var v = (r * COS(a) + R) * SIN(b);
    var w = (r * SIN(a));
    return [u,v,w];
  }

var domain = DOMAIN([[0,2*PI],[0,2*PI]])([36,36]);
var torus = MAP(mapping)(domain);

return torus;
}




/* Costruisce una ruota da moto con raggio interno ed esterno della gomma rispettivamente di r_tire e R_tire,
 disco di raggio r_disk e altezza h_disk, cilindro orizzontale di raggio r_cyl, n_spokes raggi, ammortizzatori 
 con inclinazione absorberInclination e parafango.
*/

var wheelWithAbsorbers = function (r_tire,R_tire,r_disk,h_disk,r_cyl, n_spokes, absorberInclination) {

	var dom2D = PROD1x1([INTERVALS(1)(26),INTERVALS(1)(26)]);
	var h_cyl = 2.3*(R_tire-r_tire)+((R_tire-r_tire));

	// Costruisce una ruota con raggio interno ed esterno della gomma rispettivamente di r_tire e R_tire,
	// disco di raggio r_disk e altezza h_disk, cilindro orizzontale di raggio r_cyl e n_spokes raggi.
	
	var wheel = function (r_tire,R_tire,r_disk,h_disk,r_cyl, n_spokes) {
		
		var torus = TORUS(R_tire-r_tire,R_tire);
		torus = COLOR([0.25,0.25,0.25,1.0])(torus);
		var disk = CYLINDER(r_disk,h_disk,20);
		disk = COLOR([0.75,0.75,0.75,1.0])(disk);
		disk = T([2])([-h_disk/2])(disk);

		var cyl = CYLINDER(r_disk/3,h_cyl,20);
		cyl = T([2])([-h_cyl/2])(cyl);
		cyl = COLOR([0.5,0.5,0.5,1.0])(cyl);
			
		var spokeLength = r_tire;
		var maxSpokeHigh = 3*h_disk;
		var curve1 = BEZIER(S0)([ [0,maxSpokeHigh/3],[spokeLength/10,maxSpokeHigh/6],[spokeLength/2,maxSpokeHigh/6],
							[9*spokeLength/10,maxSpokeHigh/6],[spokeLength,maxSpokeHigh] ]);
		var curve2 = BEZIER(S0)([ [0,0],[spokeLength,0] ]);
		var spokeSurface = BEZIER(S1)([curve1,curve2]);
		var spoke = MAP(spokeSurface)(PROD1x1([INTERVALS(1)(36),INTERVALS(1)(36)]));
		spoke = EXTRUDE([h_disk])(spoke);
		spoke = STRUCT([spoke, S([1])([-1])(spoke)]);
		spoke = T([2])([-h_disk/2])(spoke);
		var spokes = STRUCT(REPLICA(n_spokes)([spoke,R([0,1])(2*PI/(n_spokes))]));
		spokes = COLOR([0.75,0.75,0.75,1.0])(spokes);

		var r_brakeDisk = 1.4*r_disk;
		var brakeDisk = CYLINDER(r_brakeDisk,0.01,20);
		brakeDisk = T([2])([h_cyl/4])(brakeDisk);
				
		var wheel = STRUCT([torus,disk,cyl,spokes,brakeDisk]);
		wheel = R([1,2])(-PI/2)(wheel);

		return wheel;
	}

	var wheel = wheel(r_tire,R_tire,r_disk,h_disk,r_cyl, n_spokes);
	
	var h_higherAbsorber = R_tire ;
	var h_lowerAbsorber = 0.9*R_tire;
	var lowerAbsorber = CYLINDER(h_disk/1.5,h_lowerAbsorber,20);
	
	// lowerAbsorber = COLOR()(lowerAbsorber);
	var higherAbsorber = CYLINDER((2*h_disk),h_higherAbsorber,20);
	higherAbsorber = COLOR([0.8,0.5,0.2,1.0])(higherAbsorber);
	higherAbsorber = T([2])([h_lowerAbsorber])(higherAbsorber);
	
	var absorber1 = STRUCT([lowerAbsorber,higherAbsorber]);
	var absorber2 = T([0])([h_cyl])(absorber1);
	var absorbers = STRUCT([absorber1, absorber2]);
	absorbers = T([0])([-h_cyl/2])(absorbers);
	absorbers = R([1,2])(absorberInclination)(absorbers);
	absorbers = R([0,1])(PI/2)(absorbers);

	var wheel = STRUCT([absorbers, wheel]);

	// Costruisce un parafango per la ruota largo wide, lungo length e alto high
	

	var fender = function (wide, length, high) {
		var controlPoints4 = [ [0,-wide/2,0], [length/2,-wide/2,0], [length, -wide/4,0], [length,0,0] ];
		var controlPoints2 = [ [0,-wide/4,0], [length/2,wide/4,1.5*high], [length,0,0] ];
		var controlPoints3 = [ [0,-3*wide/8,0], [length/2,-3*wide/8,1.2*high], [length,0,0] ];
		var controlPoints1 = [ [0,0,0], [length/2,0,1.8*high], [length,0,0] ];

		var curve1 = BEZIER(S0)(controlPoints1);
		var curve2 = BEZIER(S0)(controlPoints2);
		var curve3 = BEZIER(S0)(controlPoints3);
		var curve4 = BEZIER(S0)(controlPoints4);

		var fender = MAP ( BEZIER(S1)([curve1,curve2,curve3,curve4]) ) (dom2D);
		fender = STRUCT([fender, S([1])([-1])(fender)]);
		fender = T([0])([-length/2])(fender);
		fender = COLOR([1,0,0,1.0])(fender);
		//DRAW(fender)

		return fender;
	}

	var fender = fender(h_cyl-(3*h_disk), 1.7*R_tire, R_tire-r_tire);
	fender = T([2])([1.1*R_tire])(fender);
	fender = R([0,2])(-PI/24)(fender);

	wheel = STRUCT([wheel,fender]);
	wheel = R([0,1])(PI)(wheel);

	return wheel;
}




/* Costruisce una ruota da moto con raggio interno ed esterno della gomma rispettivamente di r_tire e R_tire,
 disco di raggio r_disk e altezza h_disk, cilindro orizzontale di raggio r_cyl, n_spokes raggi e copricatena.
*/

var wheelWithChainGuard = function (r_tire,R_tire,r_disk,h_disk,r_cyl, n_spokes) {

	var dom2D = PROD1x1([INTERVALS(1)(26),INTERVALS(1)(26)]);
	var h_cyl = 2.3*(R_tire-r_tire)+((R_tire-r_tire));


	// Costruisce una ruota con raggio interno ed esterno della gomma rispettivamente di r_tire e R_tire,
	// disco di raggio r_disk e altezza h_disk, cilindro orizzontale di raggio r_cyl e n_spokes raggi.
	
	var wheel = function (r_tire,R_tire,r_disk,h_disk,r_cyl, n_spokes) {
		
		var torus = TORUS(R_tire-r_tire,R_tire);
		torus = COLOR([0.25,0.25,0.25,1.0])(torus);
		var disk = CYLINDER(r_disk,h_disk,20);
		disk = COLOR([0.75,0.75,0.75,1.0])(disk);
		disk = T([2])([-h_disk/2])(disk);

		var cyl = CYLINDER(r_disk/3,h_cyl,20);
		cyl = T([2])([-h_cyl/2])(cyl);
		cyl = COLOR([0.5,0.5,0.5,1.0])(cyl);
			
		var spokeLength = r_tire;
		var maxSpokeHigh = 3*h_disk;
		var curve1 = BEZIER(S0)([ [0,maxSpokeHigh/3],[spokeLength/10,maxSpokeHigh/6],[spokeLength/2,maxSpokeHigh/6],
							[9*spokeLength/10,maxSpokeHigh/6],[spokeLength,maxSpokeHigh] ]);
		var curve2 = BEZIER(S0)([ [0,0],[spokeLength,0] ]);
		var spokeSurface = BEZIER(S1)([curve1,curve2]);
		var spoke = MAP(spokeSurface)(PROD1x1([INTERVALS(1)(20),INTERVALS(1)(20)]));
		spoke = EXTRUDE([h_disk])(spoke);
		spoke = STRUCT([spoke, S([1])([-1])(spoke)]);
		spoke = T([2])([-h_disk/2])(spoke);
		var spokes = STRUCT(REPLICA(n_spokes)([spoke,R([0,1])(2*PI/(n_spokes))]));
		spokes = COLOR([0.75,0.75,0.75,1.0])(spokes);

		var r_brakeDisk = 1.4*r_disk;
		var brakeDisk = CYLINDER(r_brakeDisk,0.01,20);
		brakeDisk1 = T([2])([h_cyl/4])(brakeDisk);
				
		var wheel = STRUCT([torus,disk,cyl,spokes,brakeDisk1]);
		wheel = R([1,2])(PI/2)(wheel);

		return wheel;
	}

	var chainGuard = function (length,high,thickness) {
		var hHalf = high/2;
		var controlPoints1 = [ [0,0], [0,hHalf/3], [length/4,hHalf/2], [3*length/8,hHalf/3],
						 [length/2,2*hHalf/3], [7*length/8,hHalf], [0.9*length,5*hHalf/6], [length,hHalf/6], [length,0]];
		var controlPoints2 = [ [0,0], [0,-hHalf/3], [length/4,-hHalf/2], [3*length/8,-hHalf/3],
						 [length/2,-2*hHalf/3], [7*length/8,-hHalf], [0.9*length,-5*hHalf/6], [length,-hHalf/6], [length,0]];

		var curve1 = BEZIER(S0)(controlPoints1);
		var curve2 = BEZIER(S0)(controlPoints2);

		var chainGuard = MAP (BEZIER(S1)([curve1,curve2]) ) (dom2D);
		chainGuard = R([0,1])(PI)(chainGuard);
		chainGuard = EXTRUDE([thickness])(chainGuard);
		chainGuard = COLOR([0.5,0.5,0.5,1.0])(chainGuard);
		chainGuard = R([1,2])(PI/2)(chainGuard);
		
		return chainGuard;
	}

	var wheel = wheel(r_tire,R_tire,r_disk,h_disk,r_cyl, n_spokes);

	var thickness = r_cyl/2;
	var chainGuard = chainGuard(2*R_tire,1.5*r_tire,thickness);
	chainGuard = T([0,1])([1.1*r_cyl,-h_cyl/2])(chainGuard);
	chainGuard = R([0,2])(PI/12)(chainGuard);
	
	wheel = STRUCT([wheel,chainGuard]);
	return wheel;
}

wheel = wheelWithChainGuard(0.3,0.4,0.15,0.03,0.075,3);






/* Costruisce una marmitta da moto lunga length, con raggio r e manici posizionati a 1/10,3/10,6/10 e 10/10 di length. */

var muffler = function (length) {

	var dom2Dcircle = PROD1x1([INTERVALS(1)(36),INTERVALS(2*PI)(36)]);
	var controlPoints = [[length/15,0,0],[length/15,0,length/10],[length/15,0,3*length/10],[length/12,0,3*length/5],[length/10,0,length]];
	var mufflerFunction = BEZIER(S0)(controlPoints);
	var lowerBase = CIRCLE_PLANE(length/20);
	var higherBase = STRUCT( [CIRCLE_PLANE(length/10), CYLINDER(length/30,length/15,20)] );
	var muffler = MAP(ROTATIONAL_SURFACE(mufflerFunction))(dom2Dcircle);
	muffler = STRUCT([lowerBase,muffler,T([2])([length])(higherBase)]);
	muffler = COLOR([0.78,0.78,0.78,1.0])(muffler);
	muffler = R([0,2])(PI/2.5)(muffler);
	
	return muffler;

}




/* Costruisce uno specchietto scalato di dim. */

var mirror = function (dim) {
	var dom2D = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(20)]);
	var dom1D = INTERVALS(1)(20);


	var controlPoints1 = [[0,0.5,0],[0.1,0.7,0],[0.6,0.75,0],[0.9,0.7,0],[1,0.5,0]];
	var controlPoints2 = [[0,0.5,0],[-0.12,-0.12,0],[+0.12,0.15,0],[0.6,-0.12,0],[1,0,0],[1,0.5,0]];

	var curve1 = BEZIER(S0)(controlPoints1);
	var curve2 = BEZIER(S0)(controlPoints2);

	var mapping = BEZIER(S1)([curve1,curve2]);
	var mirrorBase = MAP(mapping)(dom2D);
	mirrorBase = COLOR([0.45,0.67,0.66,1.0])(mirrorBase);
	mirrorBase = T([0,1])([0.03,-0.02])(mirrorBase);
	
	var controlPoints1z = [[0,0.5,0],[0.25,0.5,0.25],[0.5,0.5,0.5],[0.75,0.5,0.25],[1,0.5,0]];
	var controlPoints2z = [[0,0.5,0],[0.25,0.42,0.25],[0.5,0.35,0.5],[0.75,0.42,0.25],[1,0.5,0]];

	var curve1z = BEZIER(S0)(controlPoints1z);
	var curve2z = BEZIER(S0)(controlPoints2z);

	var mappingz = BEZIER(S1)([curve1,curve1z,curve2z,curve2]);
	var mirrorShell = MAP(mappingz)(dom2D);
	mirrorShell = COLOR([0.2,0.2,0.2,1])(mirrorShell);
	mirrorShell = T([0,1])([0.03,-0.02])(mirrorShell);
	
	var totalMirror = STRUCT([mirrorBase,mirrorShell]);
	totalMirror = R([1,2])(PI/2)(totalMirror);

	
	//braccio specchietto

	var semicircle = function (r) {

		var mapping = function (v) {
			alpha = v[0];
			r = v[1];
			return [r*COS(alpha), r*SIN(alpha)];
		}

		dom2D = PROD1x1([INTERVALS(PI)(20), INTERVALS(r)(1)]);
		return MAP(mapping)(dom2D);
	}

	var rCylinder = 0.04;
	var hCylinder = 0.7;
	var semicircle = semicircle(rCylinder);
	var semicircle = S([1])([-1])(semicircle);
	var mirrorArm = EXTRUDE([hCylinder])(semicircle);
	mirrorArm = COLOR([0.2,0.2,0.2,1])(mirrorArm);
	

	mirrorArm = T([0])([-2*rCylinder])(mirrorArm);
	mirrorArm = R([0,2])(PI/3)(mirrorArm);
	mirrorArm = T([0,2])([-hCylinder*COS(PI/6)+0.1,(-hCylinder*SIN(PI/6) + 0.1)])(mirrorArm);
	
	
	totalMirror = STRUCT([totalMirror, mirrorArm]);
	totalMirror = R([0,1])(-PI/2)(totalMirror);
	totalMirror = S([0,1,2])([dim,dim,dim])(totalMirror);

	totalMirror = R([0,1])(PI/9)(totalMirror);
	
	//DRAW(totalMirror);

	return totalMirror;
}

		



/* Costruisce un manubrio lungo totalLength. */

var handlebar = function (totalLength) {

	var n = totalLength/2;
	var radius = n/18;
	
	var part1 = R([0,2]) (PI/2) (CYLINDER(radius,n/3,20));
	part1 = T([2])([radius])(part1);
	var part2 = T([0])([-radius])(CYLINDER(radius,n/6,20));
	part2 = R([0,2])(PI/3)(part2);
	part2 = T([0]) ([n/3]) (part2);
	var part12 = STRUCT([part1,part2]);
	part12 = COLOR([0.5,0.5,0.5,1.0])(part12);
	

	cylinder = CYLINDER(1.5*radius,3*radius,20);
	cylinder = COLOR([0,0,0,1.0])(cylinder);
	var part3 = STRUCT([cylinder, COLOR([0.5,0.5,0.5,1.0]) (CYLINDER(radius,n-(n/3)-(n/6)*COS(PI/6),20) )]);
	part3 = R([0,2]) (PI/2) (part3);
	part3 = T([2])([radius])(part3);
	part3 = T([0,2]) ([(n/3) + (n/6)*COS(PI/6) - radius*COS(PI/6), (n/6)*SIN(PI/6)]) (part3);
	

	var handlebar_sx = STRUCT([part12,part3]);
	var handlebar_dx = S([0,1,2])([-1,1,1])(handlebar_sx);
	var handlebar = STRUCT([handlebar_sx, handlebar_dx]);
	

	return handlebar;
}





/* Costruisce la scocca della moto. */

wide1 = 1.6;
wide2 = 5;

var dom1D = INTERVALS(1)(26);
var dom2D = PROD1x1([dom1D,dom1D]);

var ctrlP1 = [ [0.8,-wide1,1.5],[3,-wide1,-1.3], [1,0,-1], [1,0,-0.75] ];
var curve1M = CUBIC_HERMITE(S0)(ctrlP1);
var curve1 = MAP(curve1M)(dom1D);
//DRAW(curve1);


var ctrlP1x = [ [0.8,-wide1,1.5],[2.7,-wide1,4] ];
var curve1xM = BEZIER(S0)(ctrlP1x);
var curve1x = MAP(curve1xM)(dom1D);
//DRAW(curve1x);


var ctrlP2_1 = [ [0.8,-wide1,1.5],[6.3,-wide1,2.5], [1,0,0.5],[1,0,2] ];
var curve2_1M = CUBIC_HERMITE(S0)(ctrlP2_1);
var curve2_1 = MAP(curve2_1M)(dom1D);
//DRAW(curve2_1);


var ctrlP2_2 = [ [2.7,-wide1,4],[6.3,-wide1,2.5], [1,0,0],[-1,0,-2] ];
var curve2_2M = CUBIC_HERMITE(S0)(ctrlP2_2);
var curve2_2 = MAP(curve2_2M)(dom1D);
//DRAW(curve2_2);


var ctrlP3_1Rear = [ [2.7,0,4],[3,0,4.8], [1,0,1],[1,0,1] ];
var curve3_1RearM = CUBIC_HERMITE(S0)(ctrlP3_1Rear);
var curve3_1Rear = MAP(curve3_1RearM)(dom1D);
//DRAW(curve3_1Rear);

var ctrlP3_1 = [ [2.7,-wide1,4],[3,-wide1,4.8], [1,0,1],[1,0,1] ];
var curve3_1M = CUBIC_HERMITE(S0)(ctrlP3_1);
var curve3_1 = MAP(curve3_1M)(dom1D);
//DRAW(curve3_1);

var ctrlP3_2 = [ [3,-wide1,4.8],[5.6,-wide1,4]];
var curve3_2M = BEZIER(S0)(ctrlP3_2);
var curve3_2 = MAP(curve3_2M)(dom1D);
//DRAW(curve3_2);


var ctrlP4_1 = [ [5.6,-wide1,4],[8,-wide1,2], [1,0,-0.5], [0.25,0,-1] ];
var curve4_1M = CUBIC_HERMITE(S0)(ctrlP4_1);
var curve4_1 = MAP(curve4_1M)(dom1D);
//DRAW(curve4_1);

var ctrlP4_2 = [ [7.5,-wide1,-0.1], [8,-wide1,2],[0.25,0,1], [-0.25,0,1], ];
var curve4_2M = CUBIC_HERMITE(S0)(ctrlP4_2);
var curve4_2 = MAP(curve4_2M)(dom1D);
//DRAW(curve4_2);

var ctrlP5 = [ [7.5,-wide1,-0.1],[9.4,-wide1,-1.3], [1,0,-0.5],[-1,0,-2] ];
var curve5M = CUBIC_HERMITE(S0)(ctrlP5);
var curve5 = MAP(curve5M)(dom1D);
//DRAW(curve5);


var ctrlP6 = [ [3,-wide1,-1.3],[9.4,-wide1,-1.3], [-1,0,-0.5],[1,0,0] ];
var curve6M = CUBIC_HERMITE(S0)(ctrlP6);
var curve6 = MAP(curve6M)(dom1D);
//DRAW(curve6);


var ctrlP6x = [ [3,-wide1,-1.3],[7.5,-wide1,-0.1]];
var curve6xM = BEZIER(S0)(ctrlP6x);
var curve6x = MAP(curve6xM)(dom1D);
//DRAW(curve6x);


var ctrlP7Rear = [ [-0.4,0,3],[0.8,-wide1,1.5], [-1,1,2], [-1,1,1] ];
var curve7RearM = CUBIC_HERMITE(S0)(ctrlP7Rear);
var curve7Rear = MAP(curve7RearM)(dom1D);
//DRAW(curve7Rear);


var ctrlP7 = [ [-0.4,-wide1,3],[0.8,-wide1,1.5],[-1,0,2], [-1,0,1] ];
var curve7M = CUBIC_HERMITE(S0)(ctrlP7);
var curve7 = MAP(curve7M)(dom1D);
//DRAW(curve7);


var ctrlP8Rear = [ [-1.2,0,3.8],[0.25,0,3.3],[-0.4,0,3] ];
var curve8RearM = BEZIER(S0)(ctrlP8Rear);
var curve8Rear = MAP(curve8RearM)(dom1D);
//DRAW(curve8Rear);


var ctrlP8 = [ [-1.2,0,3.8],[0.25,-wide1/2,3.3],[-0.4,-wide1,3] ];
var curve8M = BEZIER(S0)(ctrlP8);
var curve8 = MAP(curve8M)(dom1D);
//DRAW(curve8);

var ctrlP9 = [ [-1.2,0,3.8],[0.2,0,5.6], [1,0,2],[1.5,0,1] ];
var curve9M = CUBIC_HERMITE(S0)(ctrlP9);
var curve9 = MAP(curve9M)(dom1D);
//DRAW(curve9);


var ctrlP10 = [ [0.2,0,5.6],[2.3,-1,6.5] ,[0,-2,1],[1.5,0,1] ];
var curve10M = CUBIC_HERMITE(S0)(ctrlP10);
var curve10 = MAP(curve10M)(dom1D);
//DRAW(curve10);

var ctrlP10x = [ [0.2,0,5.6],[1.7,0,7] ];
var curve10xM = BEZIER(S0)(ctrlP10x);
var curve10x = MAP(curve10xM)(dom1D);
//DRAW(curve10x);


var ctrlP11 = [ [1,-2,5.5],[2.3,-1,6.5], [1,2,2],[1,3,1] ];
var curve11M = CUBIC_HERMITE(S0)(ctrlP11);
var curve11 = MAP(curve11M)(dom1D);
//DRAW(curve11);

var ctrlP12 = [ [0.2,-2,4],[1,-2,5.5], [1,-2,2],[1,3,2] ];
var curve12M = CUBIC_HERMITE(S0)(ctrlP12);
var curve12 = MAP(curve12M)(dom1D);
//DRAW(curve12);


var ctrlP13 = [ [-1.2,0,3.8],[0.2,-2,4], [1,-2,0.25],[2,-1,1] ];
var curve13M = CUBIC_HERMITE(S0)(ctrlP13);
var curve13 = MAP(curve13M)(dom1D);
//DRAW(curve13);


var ctrlP14Rear = [ [-1.1,0,4],[2.7,0,4], [1,0,0],[1,0,0], ];
var curve14RearM = CUBIC_HERMITE(S0)(ctrlP14Rear);
var curve14Rear = MAP(curve14RearM)(dom1D);
//DRAW(curve14Rear);


var ctrlP14 = [ [-0.8,0,4],[2.7,-wide1,4], [1,-1,0],[1,0,0] ];
var curve14M = CUBIC_HERMITE(S0)(ctrlP14);
var curve14 = MAP(curve14M)(dom1D);
//DRAW(curve14);


var ctrlP15_1 = [ [3,0,4.8],[5.7,0,5.5],  [0,0,1],[3,0,0] ];
var curve15_1M = CUBIC_HERMITE(S0)(ctrlP15_1);
var curve15_1 = MAP(curve15_1M)(dom1D);
//DRAW(curve15_1);


var ctrlP15_2 = [ [5.7,0,5.5],[7.5,0,4.5],[1,0,0],[0,0,-1] ];
var curve15_2M = CUBIC_HERMITE(S0)(ctrlP15_2);
var curve15_2 = MAP(curve15_2M)(dom1D);
//DRAW(curve15_2);


var ctrlP16 = [ [5.6,-wide1,4],[7.5,-wide1,4.5], [2,0,0], [0,0,1] ];
var curve16M = CUBIC_HERMITE(S0)(ctrlP16);
var curve16 = MAP(curve16M)(dom1D);
//DRAW(curve16);


var ctrlP17Rear = [ [7.5,0,4.5], [10.3,0,4.8], [2,0,0], [1,0,0.5] ];
var curve17RearM = CUBIC_HERMITE(S0)(ctrlP17Rear);
var curve17Rear = MAP(curve17RearM)(dom1D);
//DRAW(curve17Rear);

var ctrlP17 = [ [7.5,-wide1,4.5], [10.3,-wide1,4.8], [2,0,0], [1,0,0.5] ];
var curve17M = CUBIC_HERMITE(S0)(ctrlP17);
var curve17 = MAP(curve17M)(dom1D);
//DRAW(curve17);


var ctrlP18Rear = [ [10.3,0,4.8], [10.5,0,6], [0.5,0,1], [0,0,1] ];
var curve18RearM = CUBIC_HERMITE(S0)(ctrlP18Rear);
var curve18Rear = MAP(curve18RearM)(dom1D);
//DRAW(curve18Rear);

var ctrlP18 = [ [10.3,-wide1,4.8], [10.5,-wide1,6], [0.5,0,1], [0,0,1] ];
var curve18M = CUBIC_HERMITE(S0)(ctrlP18);
var curve18 = MAP(curve18M)(dom1D);
//DRAW(curve18);

var ctrlP19Rear = [ [10.5,0,6], [14.5,0,6.5], [3,0,0], [2,0,1] ];
var curve19RearM = CUBIC_HERMITE(S0)(ctrlP19Rear);
var curve19Rear = MAP(curve19RearM)(dom1D);
//DRAW(curve19Rear);

var ctrlP19 = [ [10.5,-wide1,6], [14.5,0,6.5], [3,0,0], [2,1,1] ];
var curve19M = CUBIC_HERMITE(S0)(ctrlP19);
var curve19 = MAP(curve19M)(dom1D);
//DRAW(curve19);

var ctrlP20 = [ [11,-wide1,4], [14.5,0,6.5], [1,0,1], [0.5,1,0.5] ];
var curve20M = CUBIC_HERMITE(S0)(ctrlP20);
var curve20 = MAP(curve20M)(dom1D);
//DRAW(curve20);


var ctrlP21 = [ [8.4,-wide1,2.2], [11,-wide1,4], [0.5,0,1], [1,0,1] ];
var curve21M = CUBIC_HERMITE(S0)(ctrlP21);
var curve21 = MAP(curve21M)(dom1D);
//DRAW(curve21);

var ctrlP21x = [ [8,-wide1,2], [8.4,-wide1,2.2] ];
var curve21xM = BEZIER(S0)(ctrlP21x);
var curve21x = MAP(curve21xM)(dom1D);
//DRAW(curve21x);



var ctrlP22 = [ [9,-wide1,-0.68], [8.4,-wide1,2.2], [-0.5,0,2], [0,0,1] ];
var curve22M = CUBIC_HERMITE(S0)(ctrlP22);
var curve22 = MAP(curve22M)(dom1D);
//DRAW(curve22);


var ctrlP20Rear = [ [11,0,4], [14.5,0,6.5], [1,0,1], [0.5,0,0.5] ];
var curve20RearM = CUBIC_HERMITE(S0)(ctrlP20Rear);
var curve20Rear = MAP(curve20RearM)(dom1D);
//DRAW(curve20Rear);


var ctrlP21Rear = [ [8.4,0,2.2], [11,0,4], [0.5,0,1], [1,0,1] ];
var curve21RearM = CUBIC_HERMITE(S0)(ctrlP21Rear);
var curve21Rear = MAP(curve21RearM)(dom1D);
//DRAW(curve21Rear);


var ctrlP22Rear = [ [9,0,-0.68], [8.4,0,2.2], [-0.5,0,2], [0,0,1] ];
var curve22RearM = CUBIC_HERMITE(S0)(ctrlP22Rear);
var curve22Rear = MAP(curve22RearM)(dom1D);
//DRAW(curve22Rear);



var f1Surface = MAP(BEZIER(S1)([curve3_1RearM,curve3_1M]))(dom2D);
f1Surface = COLOR([0.2,0.2,0.2,1])(f1Surface);
//DRAW(f1Surface);

var f2Surface = MAP(BEZIER(S1)([curve14RearM,curve14M]))(dom2D);
f2Surface = COLOR([0.2,0.2,0.2,1])(f2Surface);
//DRAW(f2Surface);

var hump1Surface = MAP(CUBIC_HERMITE(S1)([curve15_1M,curve3_2M, [0,-3,0], [0,0,-0.1] ]))(dom2D);
hump1Surface = COLOR([1,0,0,1])(hump1Surface);
//DRAW(hump1Surface);

var hump2Surface = MAP(CUBIC_HERMITE(S1)([curve15_2M,curve16M, [0,-3,0], [0,0,-0.1] ]))(dom2D);
hump2Surface = COLOR([1,0,0,1])(hump2Surface);
//DRAW(hump2Surface);

var f3Surface = MAP(BEZIER(S1)([curve17RearM,curve17M]))(dom2D);
f3Surface = COLOR([0.2,0.2,0.2,11])(f3Surface);
//DRAW(f3Surface);

var f4Surface = MAP(BEZIER(S1)([curve18RearM,curve18M]))(dom2D);
f4Surface = COLOR([0.2,0.2,0.2,1])(f4Surface);
//DRAW(f4Surface);

var f5Surface = MAP(CUBIC_HERMITE(S1)([curve19RearM,curve19M, [0,-1,0], [0,0,-0.1] ]))(dom2D);
f5Surface = COLOR([1,0,0,1])(f5Surface);
//DRAW(f5Surface);

var hump3Surface = MAP(CUBIC_HERMITE(S1)([curve2_2M,curve2_1M, [0,-3,0], [0,0,-0.1] ]))(dom2D);
hump3Surface = COLOR([1,0,0,1])(hump3Surface);
//DRAW(hump3Surface);


var hump4_1Surface = MAP(CUBIC_HERMITE(S1)([curve14M,curve7M, [0,-3,0], [0,0,-0.1] ]))(dom2D);
var hump4_2Surface = MAP(CUBIC_HERMITE(S1)([curve14M,curve8M, [0,-0.25,0], [0,0,-0.1] ]))(dom2D);
hump4_1Surface = COLOR([1,0,0,1])(hump4_1Surface);
hump4_2Surface = COLOR([1,0,0,1])(hump4_2Surface);
//DRAW(hump4_1Surface);
//DRAW(hump4_2Surface);


var f6Surface = MAP(BEZIER(S1)([curve8RearM,curve8M ]))(dom2D);
f6Surface = COLOR([1,0,0,1])(f6Surface);
//DRAW(f6Surface);

var f7Surface = MAP(BEZIER(S1)([curve7RearM,curve7M ]))(dom2D);
f7Surface = COLOR([1,0,0,1])(f7Surface);
//DRAW(f7Surface);

var f8Surface = MAP(BEZIER(S1)([curve20RearM,curve20M ]))(dom2D);
f8Surface = COLOR([0.2,0.2,0.2,1])(f8Surface);
//DRAW(f8Surface);

var f9Surface = MAP(BEZIER(S1)([curve21RearM,curve21M ]))(dom2D);
f9Surface = COLOR([0.2,0.2,0.2,1])(f9Surface);
//DRAW(f9Surface);


var f10Surface = MAP(BEZIER(S1)([curve22RearM,curve22M ]))(dom2D);
f10Surface = COLOR([0.2,0.2,0.2,1])(f10Surface);
//DRAW(f10Surface);

var f11Surface = MAP(CUBIC_HERMITE(S1)([curve3_2M,curve6xM, [0,-2,0],[0,0,-0.1] ]))(dom2D);
f11Surface = COLOR([0.2,0.2,0.2,1])(f11Surface);
//DRAW(f11Surface);


var f12Surface = MAP(CUBIC_HERMITE(S1)([curve3_1M,curve1M, [0,-2,0],[0,0,-0.1] ]))(dom2D);
f12Surface = COLOR([0.2,0.2,0.2,1])(f12Surface);
//DRAW(f12Surface);

var f13Surface = MAP(BEZIER(S1)([curve5M,curve6M]))(dom2D);
f13Surface = COLOR([0.2,0.2,0.2,1])(f13Surface);
//DRAW(f13Surface);

var f14Surface = MAP(BEZIER(S1)([curve4_2M,curve1xM]))(dom2D);
f14Surface = COLOR([0.2,0.2,0.2,1])(f14Surface);
//DRAW(f14Surface);

var f15Surface = MAP(CUBIC_HERMITE(S1)([curve4_1M,curve6xM, [0,-1,0],[0,0,-0.1]]))(dom2D);
f15Surface = COLOR([0.2,0.2,0.2,1])(f15Surface);
//DRAW(f15Surface);

var f16Surface = MAP(CUBIC_HERMITE(S1)([curve16M,curve21xM, [0,-0.5,0],[0,0,-0.1]]))(dom2D);
f16Surface = COLOR([1,0.2,0.2,1])(f16Surface); //camcia rosso
//DRAW(f16Surface);

var f17Surface = MAP(CUBIC_HERMITE(S1)([curve17M,curve21xM, [0,-0.75,0],[0,0,-0.1]]))(dom2D);
f17Surface = COLOR([1,0.2,0.2,1])(f17Surface); //camcia rosso
//DRAW(f17Surface);


var f18Surface = MAP(CUBIC_HERMITE(S1)([curve18M,curve21M, [0,-0.75,0],[0,0,-0.1]]))(dom2D);
f18Surface = COLOR([1,0.2,0.2,1])(f18Surface); //camcia rosso
//DRAW(f18Surface);


var f19Surface = MAP(CUBIC_HERMITE(S1)([curve19M,curve20M, [0,-0.75,0],[0,0,-0.1]]))(dom2D);
f19Surface = COLOR([1,0.2,0.2,1])(f19Surface); //camcia rosso
//DRAW(f19Surface);

var f20Surface = MAP(CUBIC_HERMITE(S1)([curve19M,curve20M, [0,-0.75,0],[0,0,-0.1]]))(dom2D);
f20Surface = COLOR([1,0.2,0.2,1])(f20Surface); //camcia rosso
//DRAW(f20Surface);

var f21Surface = MAP(BEZIER(S1)([curve22M,curve4_2M]))(dom2D);
f21Surface = COLOR([1,0.2,0.2,1])(f21Surface); //camcia rosso
//DRAW(f21Surface);


var f22Surface = MAP(BEZIER(S1)([curve9M,curve12M]))(dom2D);
f22Surface = COLOR([1,0,0,1])(f22Surface); 
//DRAW(f22Surface);

var f23Surface = MAP(BEZIER(S1)([curve9M,curve13M]))(dom2D);
f23Surface = COLOR([1,0,0,1])(f23Surface); 
//DRAW(f23Surface);

var f24Surface = MAP(BEZIER(S1)([curve10M,curve11M]))(dom2D);
f24Surface = COLOR([1,0,0,1])(f24Surface); 
//DRAW(f24Surface);



//parabrezza
var f25Surface = MAP(CUBIC_HERMITE(S1)([curve10xM,curve10M, [0,-1,0],[0.0001,0,0]]))(dom2D);
f25Surface = COLOR([0.67,0.8,0.94,0.4])(f25Surface); 


var halfShell = STRUCT([f1Surface,f2Surface,f3Surface,f4Surface,f5Surface,f6Surface,f7Surface,f8Surface,f9Surface,f10Surface,
					f11Surface,f12Surface,f13Surface,f14Surface,f15Surface,f16Surface,f17Surface,f18Surface,f19Surface,f20Surface,
					f21Surface,f22Surface,f23Surface,f24Surface,f25Surface,hump1Surface,hump2Surface,hump3Surface,hump4_1Surface,hump4_2Surface]);


var mirror = mirror(1);
mirror = T([0,1,2])([1.2,-2,5.93])(mirror);

var halfShell = STRUCT([halfShell,mirror]);
var shell = STRUCT([halfShell, S([1])([-1])(halfShell)]);

var handlebar = handlebar(6.5);
handlebar = R([0,1])(PI/2)(handlebar);
handlebar = R([0,2])(PI/4)(handlebar);
handlebar = T([0,2])([0.3,4])(handlebar);

var wheelFrontal = wheelWithAbsorbers(1.5,2,0.75,0.15,0.375,3,-PI/12); //X5

var wheelRear = wheelWithChainGuard(1.5,2,0.75,0.15,0.375,3);
wheelRear = T([0])([12])(wheelRear);

var muff = muffler(4.0);
muff = T([0,1])([8.8,0.8])(muff);
muff = S([1,2])([1.5,1.5])(muff);


model = STRUCT([shell,handlebar,wheelFrontal,wheelRear,muff]);



 
  return model
  })();

  exports.author = 'G4br13l3';
  exports.category = 'vehicles';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));
