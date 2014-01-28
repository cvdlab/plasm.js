//Final Project - armchair Sgarsul.js - Federico Violante - 281308

//****FUNZIONI DI SUPPORTO****//

x=0;
y=1;
z=2;

//scala tutte le dims del valore scale
Sk = function(scale) {
	return function (object) {
		return object.clone().scale([0,1,2], [scale,scale,scale]);
	};
};

//toro
var TORUS = function (R,r){
	return function (arg){
		var a = arg[0];
		var b = arg[1];
		var u = (r*COS(a)+R) * COS(b);
		var v = (r*COS(a)+R) * SIN(b);
		var w = r*SIN(a);
		return [u,v,w];
	};
};

//consts
dom = 24;
dom1D = INTERVALS(1)(dom);
_3dBoxDomain = DOMAIN([[0,1],[0,1]])([dom,dom]); //for testing
//_3dBoxDomain = DOMAIN([[0,1],[0,1]])([2*dom,dom]);

function _3dBoxFromBezierBorders(borders){
	var resultBox = null;
	borders.forEach(function(item){
		var bezierCurve = BEZIER(S1)(item);
		var surface3d = MAP(bezierCurve)(_3dBoxDomain);
		if(resultBox !== null)
			resultBox = STRUCT([resultBox,surface3d]);
		else
			resultBox = surface3d;
	});
	return resultBox;
}

function translatePointsEqually(pts){
	return function (dx, dy, dz){
		var result = [];
		pts.forEach(
			function(coord){
				xcoord = coord[0] + dx;
				ycoord = coord[1] + dy;
				zcoord = coord[2] + dz;
				result.push([xcoord,ycoord,zcoord]);
			});
		return result;
	};
}

//translate points for a specific type of bezier curve
function translatePoints(pts){
	return function (dx, dy, dz){
		var result = [];
		for (var i=0; i<4; i++){
			var coord = pts[i];
			if(i===0){
				xcoord = coord[0];
				ycoord = coord[1] + dy;
				zcoord = coord[2] + dz;
			}
			else if(i===1){
				xcoord = coord[0] + dx;
				ycoord = coord[1] + dy;
				zcoord = coord[2] + dz;
			}else if(i===2){
				xcoord = coord[0] + dx;
				ycoord = coord[1] - dy;
				zcoord = coord[2] + dz;
			}else if(i===3){
				xcoord = coord[0];
				ycoord = coord[1] - dy;
				zcoord = coord[2] + dz;
			}
			result.push([xcoord,ycoord,zcoord]);
		}
		return result;
	};
}


/* drawable back skeleton
backProfileCurve = MAP(BEZIER(S0)(backProfile))(dom1D);
backProfileTXcurve = MAP(BEZIER(S0)(backProfileTX))(dom1D);
backProfileTXcurve = T([y])([-0.009])(backProfileTXcurve);

backCurve = STRUCT([backProfileCurve, backProfileTXcurve]);
backCurveIn = T([z])([0.15])(backCurve);

backCurve = STRUCT([backCurve, backCurveIn]);s
DRAW(COLOR([1,0,0])(backCurve));
*/
backProfile = [[1.83, 3.64, 0], [3.73, 4.88, 0], [3.18, 1.75, 0.1], [1.46, 4.47, 0.18]];
backProfileTX = translatePoints(backProfile)(0.05,0.05,0);

backProfileCurve = BEZIER(S0)(backProfile);
backProfileCurveZ = BEZIER(S0)(translatePoints(backProfile)(0,0,0.15));

backProfileTXcurve = BEZIER(S0)(translatePointsEqually(backProfileTX)(0,-0.009,0)) ;
backProfileTXcurveZ = BEZIER(S0)(translatePoints(translatePointsEqually(backProfileTX)(0,-0.009,0))(0,0,0.15));

backLeft = _3dBoxFromBezierBorders([ [backProfileCurve,backProfileTXcurve], [backProfileTXcurve,backProfileTXcurveZ], [backProfileTXcurveZ,backProfileCurveZ], [backProfileCurveZ,backProfileCurve] ]);
//DRAW(backLeft);

/* drawable leg skeleton
footProfileCurve = MAP(BEZIER(S0)(footProfile))(dom1D);
footProfileTXcurve = MAP(BEZIER(S0)(footProfileTX))(dom1D);

footProfileCurveZ = MAP(BEZIER(S0)(translatePoints(footProfile)(0,0,0.15)))(dom1D);
footProfileTXcurveZ = MAP(BEZIER(S0)(translatePoints(footProfileTX)(0,0,0.15)))(dom1D);
footCurveZ = STRUCT([footProfileCurveZ, footProfileTXcurveZ ]);
footCurve = STRUCT([ footProfileCurve, footProfileTXcurve]);

legSkeleton = STRUCT([footCurve, footCurveZ]);
DRAW(COLOR([0,0,1])(legSkeleton));
*/

footProfile = [[1.83, 3.68, 0], [3.50, 4.97, 0], [3.57, 2.23, 0], [1.46, 3.38, 0]];
footProfileTX = translatePoints(footProfile)(0.05,0.05,0);

footProfileCurve = BEZIER(S0)(footProfile);
footProfileCurveZ = BEZIER(S0)(translatePoints(footProfile)(0,0,0.15));

footProfileTXcurve = BEZIER(S0)(footProfileTX);
footProfileTXcurveZ = BEZIER(S0)(translatePoints(footProfileTX)(0,0,0.15));

leg = _3dBoxFromBezierBorders([ [footProfileCurve,footProfileTXcurve], [footProfileTXcurve,footProfileTXcurveZ], [footProfileTXcurveZ,footProfileCurveZ], [footProfileCurveZ,footProfileCurve] ]);
//DRAW(leg);

//foot end
footEndProfile = [[1.47, 3.33, 0], [1.75, 3.64, 0], [1.83, 3.68, 0], [1.83, 3.68, 0] ];
footEndProfileTX = [[1.47-0.01, 3.33+0.04, 0], [1.75, 3.64+0.05, 0], [1.83, 3.68+0.05, 0], [1.83, 3.68+0.05, 0] ];

footEndProfileCurve = BEZIER(S0)(footEndProfile);
footEndProfileCurveZ = BEZIER(S0)(translatePoints(footEndProfile)(0,0,0.15));

//footEndProfileTXcurve = BEZIER(S0)(translatePointsEqually(footEndProfileTX)(0,0,0)) ;
//footEndProfileTXcurveZ = BEZIER(S0)(translatePoints(translatePointsEqually(footEndProfileTX)(0,0,0))(0,0,0.15));

footEndProfileTXcurve = BEZIER(S0)( footEndProfileTX ) ;
footEndProfileTXcurveZ = BEZIER(S0)(translatePoints( footEndProfileTX )(0,0,0.15));

footEnd = _3dBoxFromBezierBorders([ [footEndProfileCurve,footEndProfileTXcurve], [footEndProfileTXcurve,footEndProfileTXcurveZ], [footEndProfileTXcurveZ,footEndProfileCurveZ], [footEndProfileCurveZ,footEndProfileCurve] ]);
//DRAW(footEnd);

//Right Back//
backProfileRight = [[1.83, 3.64, 0], [3.73, 4.88, 0], [3.18, 1.75, -0.1], [1.46, 4.47, -0.18]];

backProfileTX = translatePoints(backProfileRight)(0.05,0.05,0);

backProfileCurve = BEZIER(S0)(backProfileRight);
backProfileCurveZ = BEZIER(S0)(translatePoints(backProfileRight)(0,0,0.15));

backProfileTXcurve = BEZIER(S0)(translatePointsEqually(backProfileTX)(0,-0.009,0)) ;
backProfileTXcurveZ = BEZIER(S0)(translatePoints(translatePointsEqually(backProfileTX)(0,-0.009,0))(0,0,0.15));

backRight = _3dBoxFromBezierBorders([ [backProfileCurve,backProfileTXcurve], [backProfileTXcurve,backProfileTXcurveZ], [backProfileTXcurveZ,backProfileCurveZ], [backProfileCurveZ,backProfileCurve] ]);

rightPLanks = T([z])([1.3])(STRUCT([backRight, leg, footEnd] ));
//DRAW(rightPLanks);

footBar = T([x,y])([-0.17,-0.043])(CUBOID([0.2,0.045,1.45]));
footBar = R([x,y])(-PI/6.0)(footBar);
footBar = T([x,y])([1.46, 3.38])(footBar);
//DRAW(footBar);

footBar2 = T([x,y])([-0.17,-0.0288])(CUBOID([0.2,0.03,1.45]));
footBar2 = R([x,y])(-PI/4 - PI/2.0)(footBar2);
footBar2 = T([x,y])([1.50, 3.38])(footBar2);
//DRAW(footBar2);

headBar = T([x,y,z])([-0.5,-0.04, 0.18])(CUBOID([0.5,0.033,1.09]));
headBar = R([x,y])(-PI/3.1)(headBar);
headBar = T([x,y])([1.495, 4.43])(headBar);
//DRAW(headBar);

//Pillows
cylPillowBarCyl = T([x,y])([3-0.084,4-0.084])(CYL_SURFACE([0.02, 1.45])([dom]));
cylPillowBarDisk = T([x,y])([3-0.084,4-0.084])(DISK(0.02)(dom));
cylPillowBarDiskTop = T([x,y,z])([3-0.084,4-0.084, 1.45])(DISK(0.02)(dom));
cylPillowBar = STRUCT([cylPillowBarCyl, cylPillowBarDisk, cylPillowBarDiskTop]);
//DRAW(cylPillowBar);

cylPillowCyl = T([x,y,z])([3-0.084,4-0.084, 0.25])(CYL_SURFACE([0.2, 0.95])([dom*2]));
cylPillowTorusDom = DOMAIN([[PI, 2*PI],[0,2*PI]])([dom,2*dom]);
cylPillowTorus = T([x,y,z])([3-0.084,4-0.084, 0.25])( MAP(TORUS(0.1,0.1))(cylPillowTorusDom) );
cylPillowTorusDom = DOMAIN([[0, PI],[0,2*PI]])([dom,2*dom]);
cylPillowTorusTop = T([x,y,z])([3-0.084,4-0.084, 1.20])( MAP(TORUS(0.1,0.1))(cylPillowTorusDom) );
cylPillow = STRUCT([cylPillowCyl, cylPillowTorus, cylPillowTorusTop ]);
//DRAW(cylPillow);

pillowInnerProfile = BEZIER(S0)([[1.53, 4.54, 0.24], [1.12, 4.92, 0.28], [1.18, 4.96, 0.28], [1.29, 4.43, 0.24] ] );
pillowOuterProfile = BEZIER(S0)([[1.29, 4.43, 0.24], [0.87, 5.03, 0.24], [1.24, 5.24, 0.24], [1.53, 4.54, 0.24]] );
pillowInnerProfileL = BEZIER(S0)([[1.53, 4.54, 1.23], [1.12, 4.92, 1.19], [1.18, 4.96, 1.19], [1.29, 4.43, 1.23]] );
pillowOuterProfileL = BEZIER(S0)([[1.29, 4.43, 1.23], [0.87, 5.03, 1.23], [1.24, 5.24, 1.23], [1.53, 4.54, 1.23]] );
pillow = _3dBoxFromBezierBorders([ [pillowInnerProfile,pillowOuterProfile], [pillowInnerProfileL,pillowOuterProfileL], [pillowOuterProfile,pillowOuterProfileL] ]);
//DRAW(pillow);

/*
curve = COLOR([1,0,0])(MAP( pillowInnerProfile)(dom1D) );
DRAW(curve);
curve = COLOR([1,0,0])( MAP(pillowOuterProfile)(dom1D) );
DRAW(curve);
curve = COLOR([1,0,0])(MAP( pillowInnerProfileL)(dom1D) );
DRAW(curve);
curve = COLOR([1,0,0])( MAP(pillowOuterProfileL)(dom1D) );
DRAW(curve);
*/

//Pillow Base

pillowBaseProfile = BEZIER(S0)([[1.29, 4.43, 0.24],  [1.53, 4.54, 0.24] ] );
pillowBaseOuterProfile = BEZIER(S0)([[1.29, 4.43, 0.24], [1.55, 4.43, 0.24],   [1.48, 4.50, 0.24],  [1.53, 4.54, 0.24] ] );
pillowBaseProfileL = BEZIER(S0)([[1.29, 4.43, 1.23],  [1.53, 4.54, 1.23] ] );
pillowBaseOuterProfileL = BEZIER(S0)([[1.29, 4.43, 1.23], [1.55, 4.43, 1.23],   [1.48, 4.50, 1.23],  [1.53, 4.54, 1.23] ] );
pillowBase = _3dBoxFromBezierBorders([ [pillowBaseProfile, pillowBaseOuterProfile], [pillowBaseProfileL, pillowBaseOuterProfileL], [pillowBaseOuterProfile,pillowBaseOuterProfileL] ]);
//DRAW(pillowBase);

//seat padding tubes
seatPaddingProfile = BEZIER(S0)([[1, 0, 0], [0.87, 0, 0], [0.12, 0, 0.77], [0.61, 0, 1.62]]);
seatPaddingSection = BEZIER(S1)([[0.51, 0.83], [0.19, 1.22], [0.19, 0.45], [0.51 , 0.83]]);

seatPaddingProfileCurve = MAP(seatPaddingProfile)(dom1D);
/*
DRAW(COLOR([0,0,1])(seatPaddingProfileCurve));
seatPaddingSectionDraw = BEZIER(S0)([[0.51, 0.83], [0.19, 1.22], [0.19, 0.45], [0.51 , 0.83]]);
curve1 = MAP(seatPaddingSectionDraw)(dom1D);
DRAW(COLOR([1,0,1])(curve1));
*/

dom2D = PROD1x1([INTERVALS(1)(dom),INTERVALS(1)(dom)]);
paddingTube = MAP(PROFILEPROD_SURFACE([seatPaddingProfile,seatPaddingSection]))(dom2D);

tubeR = T([x,y,z])([1.2,3.8,1.47])( R([x,y])(-PI/11.0)(R([x,z])(PI/1.92)( paddingTube ) ));
//DRAW(tubeR);


seatPaddingSectionL = BEZIER(S1)([[-0.51, 0.83], [-0.19, 1.22], [-0.19, 0.45], [-0.51 , 0.83]]);

/*
seatPaddingSectionDraw = BEZIER(S0)([[-0.51, 0.83], [-0.19, 1.22], [-0.19, 0.45], [-0.51 , 0.83]]);
curve1 = MAP(seatPaddingSectionDraw)(dom1D);
DRAW(COLOR([1,0,1])(curve1));
*/

paddingTubeL = MAP(PROFILEPROD_SURFACE([seatPaddingProfile,seatPaddingSectionL]))(dom2D);

tubeL = T([x,y,z])([1.2,3.8,0])( R([x,y])(-PI/11.0)(R([x,z])(PI/2.08)( paddingTubeL ) ));
//DRAW(tubeL);


//seat
seatPaddingProfile = [[0.51, 0.83, -0.021], [0.51, 0.68, -0.021], [0.51, -0.09, 0.77], [0.51, 0.44, 1.62]];
seatPaddingProfileCurve = BEZIER(S0)(seatPaddingProfile);

seatPaddingProfileR = [[0.61, 0.83, -0.1], [0.61, 0.68, -0.1], [0.61, -0.09, 0.67], [1, 0.44, 1.5]];
seatPaddingProfileCurveR = BEZIER(S0)(seatPaddingProfileR);
curve1R =  MAP(seatPaddingProfileCurveR)(dom1D);

//right part of seat
seatPaddingProfile2 = translatePointsEqually(seatPaddingProfile)(0.96,0,0);
seatPaddingProfileCurve2 = BEZIER(S0)(seatPaddingProfile2);
seatPaddingProfile2R = [[0.41, 0.83, -0.1], [0.41, 0.68, -0.1], [0.41, -0.09, 0.67], [0, 0.44, 1.5]];
seatPaddingProfile2R = translatePointsEqually(seatPaddingProfile2R)(0.96,0,0);
seatPaddingProfileCurve2R = BEZIER(S0)(seatPaddingProfile2R);
curve2R =  MAP(seatPaddingProfileCurve2R)(dom1D);

seatBase = _3dBoxFromBezierBorders([ [seatPaddingProfileCurve, seatPaddingProfileCurveR], [seatPaddingProfileCurveR, seatPaddingProfileCurve2R],  [seatPaddingProfileCurve2R, seatPaddingProfileCurve2]]);
/*
var curve1 =  MAP(seatPaddingProfileCurve)(dom1D);
DRAW(COLOR([1,0,0])(curve1));
var curve2 =  MAP(seatPaddingProfileCurve2)(dom1D);
DRAW(COLOR([0,0,1])(curve1));
DRAW(COLOR([1,1,1])(curve1R));
DRAW(COLOR([1,1,1])(curve2R));
DRAW(seat);
*/
seat = STRUCT([seatBase, COLOR([1,1,1])(curve1R), COLOR([1,1,1])(curve2R) ]);

seatTR = T([x,y,z])([1.24,3.9,1.73])( R([x,y])(-PI/11.0)(R([x,z])(PI/2.0)( seat ) ) );


seat = COLOR([0.5,0.5,0.5])(STRUCT([pillow, pillowBase, cylPillowBar, cylPillow, tubeR, tubeL, seatTR]));
planks = COLOR([1,0,0])(STRUCT([backLeft, leg, footEnd, rightPLanks, footBar, footBar2, headBar]));

armchair = T([x,y,z])([-1,2,-4])(R([y,z])(PI*0.5)(STRUCT([seat, planks])));

DRAW(armchair);
