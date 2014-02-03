/**
Model of a Moka pot:
http://en.wikipedia.org/wiki/Moka_pot
**/

/**
 * Util functions:
 */

var AAPOINTS = function(func){
	/*
	Apply a function to all points
	usage:
	AAPOINTS(func)(parameters)(points)
	e.g.: AAPOINTS(SUM)([1,.3,10])([[0,0,0],[1,0,3],[2,0,9]])
	*/
	return function(operands){ return function(args){ return AA(function(list){
		var res = [];
		for (var i = 0; i < list.length; i++)
			res.push(func([operands[i],list[i]]));
		return res;
	})(args);}}
};

var MIRROR = function(axis){
	/*
	reflect long an axis points, useful to create simmetric curves.
	*/
	var MIRROR0 = function(points){
		var op = [];
		for (var i = 0; i < points[0].length; i++)
			op.push(n === axis ? -1 : 1);
		var mirrored = AAPOINTS(MUL)(op)(points);
		mirrored.reverse();
		mirrored.push.apply(mirrored, mirrored.reverse());
		return mirrored;
	}
	return MIRROR0
};

var DUPLIROT = function(axis){
	/*
	Rotate end create n copies of an hpc object.
	Usage: DUPLIROT([axis, axis])(angle)(object)(number)
	e.g.: DRAW(STRUCT(AA(POLYLINE)(DUPLIROT([1,3])(PI/6)(obj)(3))))
	*/
	// In python it was a oneliner... :(
	return function(alpha){ return function(obj){ return function(n){
		var res = [];
		for (var i = 0; i < n; i++)
			res.push(R(axis)(alpha*i)(obj));
		console.log(res);
		return STRUCT(res);
	} } }
};

var ROTATIONAL_SOLID = function(points){
	/*
	Similar to ROTATIONAL_SURFACE but takes points, not curves.
	*/
	return function(angle){ return function(divs){
		var domain = PROD1x1([INTERVALS(points.length-1)(points.length-1), INTERVALS(angle)(divs)]);
		var profile = function(x) { return points[x[0]];}
		return MAP(ROTATIONAL_SURFACE(profile))(domain);
	}}
}

var dom2D = PROD1x1([INTERVALS(1)(12), INTERVALS(1)(12)]);
// Bottom chamber (bc):
// bccp stands for 'Bottom Chamber Control Points'...
var bccp11 = [[-SIN(PI/8)*3.6,6.4,COS(PI/8)*3.6],[0,7,COS(PI/8)*3.6],[SIN(PI/8)*3.6,6.4,COS(PI/8)*3.6]];
var bccp12 = [[-SIN(PI/8)*4.7,0,COS(PI/8)*4.7],[0,-.6,COS(PI/8)*4.7],[SIN(PI/8)*4.7,0,COS(PI/8)*4.7]];

var bccp21 = [[-SIN(PI/8)*3,7.2,COS(PI/8)*3],[-SIN(PI/8)*3,6.5,COS(PI/8)*3],[-SIN(PI/8)*3.6,7,COS(PI/8)*3.6],[-SIN(PI/8)*3.6,6.4,COS(PI/8)*3.6]];
var bccp22 = [[0,7.2,3.3],[0,6.5,3.3],[0,7,COS(PI/8)*3.6],[0,7,COS(PI/8)*3.6]];
var bccp23 = AAPOINTS(MUL)([-1,1,1])(bccp21);

var bccp31 = [[SIN(PI/8)*4.3,-.4,COS(PI/8)*4.3],[SIN(PI/8)*4.7,-.4,COS(PI/8)*4.7],[SIN(PI/8)*4.7,0,COS(PI/8)*4.7]];
var bccp32 = [[0,-.4,4.6],[0,-.6,COS(PI/8)*4.7],[0,-.6,COS(PI/8)*4.7]];
var bccp33 = AAPOINTS(MUL)([-1,1,1])(bccp31);

var bc1 = DUPLIROT([0,2])(PI/4)(MAP(BEZIER(S1)([BEZIER(S0)(bccp11),BEZIER(S0)(bccp12)]))(dom2D))(8);
var bc2 = DUPLIROT([0,2])(PI/4)(MAP(BEZIER(S1)([BEZIER(S0)(bccp21),BEZIER(S0)(bccp22),BEZIER(S0)(bccp23)]))(dom2D))(8);
var bc3 = DUPLIROT([0,2])(PI/4)(MAP(BEZIER(S1)([BEZIER(S0)(bccp31),BEZIER(S0)(bccp32),BEZIER(S0)(bccp33)]))(dom2D))(8);
var bc4 = R([0,2])(PI/8)(R([1,2])(PI/2)(T([2])([.4])(DISK(4.3)([12*8,1]))));
var bcBolt = STRUCT([DISK(.5)([6,1]), R([0,1])(PI/6)(CYL_SURFACE([.5,.3])([6,1])), T([2])([-.2]), COLOR([.3,.3,.3]),DISK(.1)(12,1),R([0,1])(PI/6)(CYL_SURFACE([.1,.2])([12,1]))]);
var bcBolt = T([0,1])([3.8,5.5])(R([0,1])(PI/15)(R([0,2])(-PI/2)(bcBolt)));

// total bottom chamber:
var bc = STRUCT([bc1,bc2,bc3,bc4,bcBolt]);

// Collecting chamber:
var cc1 = R([1,2])(-PI/2)(ROTATIONAL_SOLID([[3,0,7.1],[3.5,0,7.1],[3.5,0,8.5]])(2*PI)(12*8));
var cccp21 = [[SIN(PI/8)*3.5,8.5,COS(PI/8)*3.5],[SIN(PI/8)*3.9,8.7,COS(PI/8)*3.9]];
var cccp22 = [[0,8.5,3.75],[0,8.3,COS(PI/8)*3.9]];
var cccp23 = AAPOINTS(MUL)([-1,1,1])(cccp21);

var cccp31 = [[-SIN(PI/8)*3.9,8.7,COS(PI/8)*3.9],[0,8.3,COS(PI/8)*3.9],[SIN(PI/8)*3.9,8.7,COS(PI/8)*3.9]];
var cccp32 = [[-SIN(PI/8)*4.8,14.4,COS(PI/8)*4.8],[SIN(PI/8)*4.8,14.4,COS(PI/8)*4.8]];

var cccp41 = cccp31;
var cccp42 = [[-SIN(PI/8)*4.8,14.4,COS(PI/8)*4.8],[SIN(PI/9)*4.8,14.4,COS(PI/9)*4.8],[SIN(PI/8)*4.2,12,COS(PI/8)*4.2]];
var cccp43 = AAPOINTS(MUL)([-1,1,1])(cccp42);

var cccp51 = [[-SIN(PI/8)*4.8,14.4,COS(PI/8)*4.8],[SIN(PI/9)*4.8,14.4,COS(PI/9)*4.8],[SIN(PI/8)*4.2,12,COS(PI/8)*4.2]];
var cccp52 = [[SIN(PI/32)*0,14.5,4.4],[SIN(PI/9)*6,14.4,COS(PI/9)*6],[SIN(PI/8)*6,13.8,COS(PI/8)*6]];

var cc2 = DUPLIROT([0,2])(PI/4)(MAP(BEZIER(S1)([BEZIER(S0)(cccp21),BEZIER(S0)(cccp22),BEZIER(S0)(cccp23)]))(dom2D))(8);
var cc3 = DUPLIROT([0,2])(PI/4)(MAP(BEZIER(S1)([BEZIER(S0)(cccp31),BEZIER(S0)(cccp32)]))(dom2D))(6);
var cc4 = STRUCT([
	R([0,2])(6*PI/4)(MAP(BEZIER(S1)([BEZIER(S0)(cccp41),BEZIER(S0)(cccp42)]))(dom2D)),
	R([0,2])(7*PI/4)(MAP(BEZIER(S1)([BEZIER(S0)(AAPOINTS(MUL)([-1,1,1])(cccp41)),BEZIER(S0)(cccp43)]))(dom2D))
]);
var cc5 = STRUCT([
	R([0,2])(3*PI/2)(MAP(BEZIER(S1)([BEZIER(S0)(cccp51),BEZIER(S0)(cccp52)]))(dom2D)),
	R([0,2])(7*PI/4)(MAP(BEZIER(S1)([BEZIER(S0)(AAPOINTS(MUL)([-1,1,1])(cccp51)),BEZIER(S0)(AAPOINTS(MUL)([-1,1,1])(cccp52))]))(dom2D))
]);

// total collecting chamber:
var cc = STRUCT([cc1,cc2,cc3,cc4,cc5]);

// Lid:
var lid1 = R([0,2])(PI/8)(R([1,2])(-PI/2)(ROTATIONAL_SOLID([[4.8,0,14.4],[4.8,0,14.5],[.5,0,15.5]])(2*PI)(8)));
var lid2 = COLOR([.1,.1,.1])(R([1,2])(-PI/2)(MAP(ROTATIONAL_SURFACE(BEZIER(S0)([[0,0,17.5],[2,0,17.5],[.5,0,17.4],[.75,0,15]])))(PROD1x1([INTERVALS(1)(12),INTERVALS(2*PI)(32)]))));
var lidcp31 = [[SIN(PI/32)*0,14.5,4.4],[SIN(PI/8)*3,14.9,COS(PI/8)*3]];
var lidcp32 = [[SIN(PI/11)*5.5,14.3,COS(PI/11)*5.5],[SIN(PI/8)*5,14.5,COS(PI/8)*5]];
var lid3 = STRUCT([
	R([0,2])(3*PI/2)(MAP(BEZIER(S1)([BEZIER(S0)(lidcp31),BEZIER(S0)(lidcp32)]))(dom2D)),
	R([0,2])(7*PI/4)(MAP(BEZIER(S1)([BEZIER(S0)(AAPOINTS(MUL)([-1,1,1])(lidcp31)),BEZIER(S0)(AAPOINTS(MUL)([-1,1,1])(lidcp32))]))(dom2D))
]);

// total lid:
var lid = STRUCT([lid1, lid2, lid3]);

// Joint:
var joint1 = EXTRUDE([.6])(MAP(BEZIER(S1)([
	BEZIER(S0)([[0,0],[1,.9]]),
	BEZIER(S0)([[0,0],[1,-.9]])
]))(PROD1x1([INTERVALS(1)(1),INTERVALS(1)(1)])));
var joint2 = STRUCT([T([0])([1]),T([1])([.4])(CUBOID([1.5,.5,.6])),T([1])([-.9])(CUBOID([1.5,.5,.6]))]);
var joint3 = STRUCT([T([0,1])([1.1,-.35]),CUBOID([1.5,.7,1.5])]);
var joint4 = ROTATIONAL_SOLID([[0,0,0],[0,0,.5],[.5,0,.5],[.5,0,0],[0,0,0]])(PI)(12);
var joint4 = STRUCT([
	T([0,2])([2,.6]),
	R([1,2])(PI/2),
	T([2])([.4])(joint4),
	T([2])([-.9])(joint4)
]);
var joint5 = COLOR([0,0,0])(T([0,2])([2,.6])(R([1,2])(PI/2)(ROTATIONAL_SOLID([[0,0,-1.1],[.1,0,-1.1],[.1,0,1.1],[0,0,1.1]])(2*PI)(12))));

// total joint:
var joint = R([0,2])(PI/8)(T([0,1])([3.7,14.8])(R([1,2])(PI/2)(STRUCT([joint1,joint2,joint3,joint4,joint5]))));

// Handle:
var hcp10 = [[0,0,0],[-.4,.2,0],[-.4,1.2,0],[.4,1.2,0],[.4,.2,0],[0,0,0]];
var hcp11 = [[0,1.2,0]];
var hcp12 = AAPOINTS(SUM)([0,1,0])(AAPOINTS(MUL)([4.8,4.8,4.8])(hcp10));
var hcp13 = AAPOINTS(SUM)([0,.7,1])(AAPOINTS(MUL)([.2,.2,.2])(hcp10));
var hcp14 = AAPOINTS(SUM)([0,.3,2])(AAPOINTS(MUL)([2.4,2.4,2.4])(hcp10));
var hcp15 = AAPOINTS(SUM)([0,0,3])(AAPOINTS(MUL)([1.6,1.6,1.6])(hcp10));
var hcp16 = AAPOINTS(SUM)([0,0,4])(AAPOINTS(MUL)([1.8,1.8,1.8])(hcp10));

var hcp21 = [[0,2,6.2],[-.4,2,6],[-.4,2,4.5],[.4,2,4.5],[.4,2,6],[0,2,6.2]];
var hcp22 = [[0,1,6.2],[-.4,1.1,6],[-.4,1.5,4.5],[.4,1.5,4.5],[.4,1.1,6],[0,1,6.2]];
var hcp23 = AAPOINTS(SUM)([0,0,1])(hcp16);
var hcp24 = hcp16;

var handle1 = MAP(BEZIER(S1)([BEZIER(S0)(hcp11),BEZIER(S0)(hcp12),BEZIER(S0)(hcp13),BEZIER(S0)(hcp14),BEZIER(S0)(hcp15),BEZIER(S0)(hcp16),BEZIER(S0)(hcp16)]))(PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)]));
var handle2 = MAP(BEZIER(S1)([BEZIER(S0)(hcp21),BEZIER(S0)(hcp22),BEZIER(S0)(hcp23),BEZIER(S0)(hcp24)]))(PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)]));

// total handle:
var handle = R([0,2])(5*PI/8)(T([1,2])([8.5,8.3])(R([1,2])(-PI/2)(STRUCT([COLOR([.1,.1,.1]),handle1, handle2]))));

// TOTAL:
var model = STRUCT([bc, cc, lid, joint, handle]);

// Time for a coffe :)
// DRAW(model);

