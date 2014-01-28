 /**
 * George Nelson Furniture:
 * Platform Bench
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

var MIRROR = function (axis){
	/**
	 * reflect an object along an axis
	 */
	return function (obj) {return STRUCT([obj, S([axis])([-1])(obj)])}
};

var DUPLIROT = function(axis){
	/*
	Rotate end create n copies of an hpc object.
	Usage: DUPLIROT([axis, axis])(angle)(object)(number)
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
};

var MKRECT = function (points) {
	/**
	 * given four verts, create a rect
	 **/
	return MAP(BEZIER(S1)([BEZIER(S0)([points[0],points[1]]),BEZIER(S0)([points[2],points[3]])]))(PROD1x1([INTERVALS(1)(1), INTERVALS(1)(1)]));
};

/* ***Sunflower Clock*** */
// Measurements: Diameter 29.5" D 3"

// There are 24 petals...
var petalCP1 = [[14.75,0] ,[13,0],[COS(PI/24)*12.6,SIN(PI/24)*12.6-.1],[COS(PI/24)*10.75, SIN(PI/24)*10.75-.1]];
var petalCP2 = [[COS(PI/24)*10.75, SIN(PI/24)*10.75-.1],[COS(PI/24)*9.5, SIN(PI/24)*9.5-.1],[8.5,0],[7.75, 0]];
var petalCP3 = [[7.75, 0],[6.5,0],[COS(PI/24)*6, SIN(PI/24)*6-.1],[COS(PI/24)*5.25, SIN(PI/24)*5.25-.1]];
var petalCP4 = [[COS(PI/24)*5.25, SIN(PI/24)*5.25-.1],[COS(PI/24)*4.25, SIN(PI/24)*4.25-.1],[3.5,0],[2, 0]];

var petalCPs = [petalCP1, petalCP2, petalCP3, petalCP4];

var petals = R([1,2])(-PI/2)(COLOR([238/255,118/255,0])(DUPLIROT([0,1])(PI/12)(MIRROR(1)(EXTRUDE([1])(STRUCT(AA(function (points){return MAP(BEZIER(S1)([BEZIER(S0)(points), BEZIER(S0)(AAPOINTS(SUM)([0,.1])(points))]))(PROD1x1([INTERVALS(1)(24), INTERVALS(1)(1)]))})(petalCPs)))))(24)));

var cyls = R([1,2])(-PI/2)(DUPLIROT([0,1])(PI/6)(T([0,2])([7.75,.5])(EXTRUDE([.8])(DISK(.15)(32))))(12));

var clockCenter = COLOR([.1,.1,.1])(R([1,2])(-PI/2)(STRUCT([
	ROTATIONAL_SOLID([[0,0,.1],[2.5,0,.1],[2.5,0,.7]])(2*PI)(64),
	MAP(ROTATIONAL_SURFACE(BEZIER(S0)([[2.5,0,.7],[2.5,0,.8],[2.4,0,.8]])))(PROD1x1([INTERVALS(1)(6), INTERVALS(2*PI)(64)])),
	ROTATIONAL_SOLID([[2.4,0,.8],[1.8,0,.8],[1.8,0,1]])(2*PI)(64),
	MAP(ROTATIONAL_SURFACE(BEZIER(S0)([[1.8,0,1],[1.8,0,1.1],[1.7,0,1.1]])))(PROD1x1([INTERVALS(1)(6), INTERVALS(2*PI)(64)])),
	ROTATIONAL_SOLID([[1.7,0,1.1],[0,0,1.1]])(2*PI)(64)
])));

var WHITE = COLOR([2,2,2]);

var clockPin = WHITE(R([1,2])(-PI/2)(ROTATIONAL_SOLID([[.1,0,1],[.1,0,1.3],[.2,0,1.3],[.1,0,1.4],[0,0,1.4]])(2*PI)(32)));

// EXTRUDE doesn't work...
var minuteHand = WHITE(T([1])([1.25])(MIRROR(1)(STRUCT([
	MKRECT([[-.1,0,7.5],[-.1,.05,7.5],[.1,0,7.5],[.1,.05,7.5]]),
	MIRROR(0)(MKRECT([[.1,0,7.5],[.1,.05,7.5],[.2,0,5],[.2,.05,5]])),
	MIRROR(0)(MKRECT([[.2,0,5],[.2,.05,5],[.2,0,-1.2],[.2,.05,-1.2]])),
	MIRROR(0)(MAP(BEZIER(S1)([BEZIER(S0)([[.2,0,-1.2],[1,0,-1.2],[1,0,-2.4],[0,0,-2.4]]), BEZIER(S0)([[.2,.05,-1.2],[1,.05,-1.2],[1,.05,-2.4],[0,.05,-2.4]])]))(PROD1x1([INTERVALS(1)(32), INTERVALS(1)(1)]))),
	T([1])([.05]),
	ROTATIONAL_SOLID([[.1,0,7.5],[.2,0,5],[.2,0,-1.2]])(2*PI)(2),
	MAP(ROTATIONAL_SURFACE(BEZIER(S0)([[.2,0,-1.2],[1,0,-1.2],[1,0,-2.4],[0,0,-2.4]])))(PROD1x1([INTERVALS(1)(32), INTERVALS(2*PI)(2)]))
]))));
var hourHand = WHITE(T([1])([1.15])(MIRROR(1)(STRUCT([
	MKRECT([[-.25,0,-1],[-.25,.05,-1],[.25,0,-1],[.25,.05,-1]]),
	MIRROR(0)(MKRECT([[.25,0,-1],[.25,.05,-1],[.15,0,4],[.15,.05,4]])),
	MIRROR(0)(MAP(BEZIER(S1)([BEZIER(S0)([[0,0,3.9],[1.5,0,3.9],[.2,0,5.3],[0,0,5.3]]), BEZIER(S0)([[0,.05,3.9],[1.5,.05,3.9],[.2,.05,5.3],[0,.05,5.3]])]))(PROD1x1([INTERVALS(1)(32), INTERVALS(1)(1)]))),
	MIRROR(0)(MAP(BEZIER(S1)([BEZIER(S0)([[0,0,4.1],[.6,0,4.1],[.6,0,4.8],[0,0,4.8]]), BEZIER(S0)([[0,.05,4.1],[.6,.05,4.1],[.6,.05,4.8],[0,.05,4.8]])]))(PROD1x1([INTERVALS(1)(32), INTERVALS(1)(1)]))),
	T([1])([.05]),
	ROTATIONAL_SOLID([[.25,0,-1],[.15,0,4]])(2*PI)(2),
	MIRROR(0),
	MAP(BEZIER(S1)([BEZIER(S0)([[0,0,3.9],[1.5,0,3.9],[.2,0,5.3],[0,0,5.3]]), BEZIER(S0)([[0,0,4.1],[.6,0,4.1],[.6,0,4.8],[0,0,4.8]])]))(PROD1x1([INTERVALS(1)(32), INTERVALS(1)(1)]))
]))));

/**
 * update the clock hand's rotation
 **/
var update_hands = function (coord){
	coord = typeof coord !== 'undefined' ? coord : [0,0,0];
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	hHand = T([0,1,2])(coord)(R([0,2])(-PI*(h%12)/6 + -PI*m/360)(hourHand));
	mHand = T([0,1,2])(coord)(R([0,2])(-PI*m/30)(minuteHand));
	DRAW(hHand); DRAW(mHand);
	console.log("Updating time: "+h+":"+m);
};

var hHand = hourHand;
var mHand = minuteHand;

var clock = STRUCT([petals, cyls, clockCenter, clockPin, hHand,mHand]);

var model = clock;
DRAW(model);

