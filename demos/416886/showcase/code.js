/**
 * @author Alessio Pasquini
 * 
 * @model Dragon Radar & Dragon Balls
 *
**/



// DRAGON BALLS

// star
var points = [[0,0],[0.4, 0.4], [0,1]];
var cells = [[0,1,2]];
var triangle = SIMPLICIAL_COMPLEX(points)(cells);

var tip = R([1,2])([-PI/7.1])(STRUCT([R([0,2])([PI/4])(triangle), R([0,2])([-PI-PI/4])(triangle)]));

var semistar = STRUCT(REPLICA(5)([tip, R([0,1])([2*PI/5])]));

var star = T([2])([-0.4275])(COLOR([1,0,0])(STRUCT([T([2])([0.855])(semistar), R([0,2])([PI])(semistar)])));


// ball
var sphere = function(r) {
	var domain = DOMAIN([[0, PI], [0, 2*PI]])([50,50]);

	var mapping = function(v) {
		var a = v[0];
		var b = v[1];

		var u = r*SIN(a)*COS(b);
		var v = r*SIN(a)*SIN(b);
		var w = r*COS(a);

		return [u,v,w];
	}
	return MAP(mapping)(domain)
}

r = 5;

var ball = COLOR([1,0.5,0,0.7])(sphere(r));

// Isshinchu (1-star ball)
var isshinchu = STRUCT([ball, star]);
// DRAW(isshinchu);


// Ryanshinchu (2-star ball)
var ryanshinchu = STRUCT([ball, T([0,1])([1,-1])(star), 
						T([0,1])([-1,1])(star)]);
// DRAW(ryanshinchu);


// Sanshinchu (3-star ball)
var sanshinchu = STRUCT([ball, T([0,1])([0,1.25])(star), 
						T([0,1])([1.25,-1])(star), 
						T([0,1])([-1.25,-1])(star)]);
// DRAW(sanshinchu);


// Sushinchu (4-star ball)
var sushinchu = STRUCT([ball, T([0,1])([-1.5,1.25])(star), 
						T([0,1])([-0.75,-1.25])(star), 
						T([0,1])([0.75,1.25])(star), 
						T([0,1])([1.5,-1.25])(star)]);
// DRAW(sushinchu);


// Vushinchu (5-star ball)
var vushinchu = STRUCT([ball, T([0,1])([0,2.25])(star), 
						T([0,1])([2,0.75])(star), 
						T([0,1])([-2,0.75])(star), 
						T([0,1])([1.25,-1.75])(star), 
						T([0,1])([-1.25,-1.75])(star)]);
// DRAW(vushinchu);


// Ryushinchu (6-star ball)
var ryushinchu = STRUCT([ball, star, 
						T([0,1])([0,2.25])(star), 
						T([0,1])([2,0.75])(star), 
						T([0,1])([-2,0.75])(star), 
						T([0,1])([1.25,-1.75])(star), 
						T([0,1])([-1.25,-1.75])(star)]);
// DRAW(ryushinchu);


// Chishinchu (7-star ball)
var chishinchu = STRUCT([ball, star, 
						T([0,1])([1.25,1.75])(star), 
						T([0,1])([-1.25,1.75])(star), 
						T([0,1])([2.5,0])(star),
						T([0,1])([-2.5,0])(star),  
						T([0,1])([1.25,-1.75])(star), 
						T([0,1])([-1.25,-1.75])(star)]);
// DRAW(chishinchu);


var dragonBalls = STRUCT([T([0,1])([-6,12])(isshinchu), T([0,1])([6,12])(ryanshinchu), T([0,1])([12,0])(sanshinchu), 
	T([0,1])([6,-12])(sushinchu), T([0,1])([-6,-12])(vushinchu), T([0,1])([-12,0])(ryushinchu), chishinchu]);


/**************************************************************************************************/


// DRAGON RADAR


var dom1D = INTERVALS(2*PI)(50);

var dom2D = DOMAIN([[0,2*PI],[0,1]])([50,50]);


var circumference = function (r,h) {
	return function (v) {
		return [r*COS(v[0]), r*SIN(v[0]), h];
	};
};

function circle(r, h) {
	var domain = DOMAIN([[0, 2*PI],[0,r]])([50,1]);
	var mapping = function(v) {
		var a = v[0];
		var r = v[1];

		return [r*COS(a), r*SIN(a), h];
	}

	model = MAP(mapping)(domain);

	return model;
} 


function curve(circumference) {
	return MAP(circumference)(dom1D);
}

function surface(curves){
	return MAP(BEZIER(S1)(curves))(dom2D);
}

// back
cb = circumference(5,0);
c1 = circumference(6, 0)
c2 = circumference(6.5,-0.5);
c3 = circumference(6, -1.3)
c4 = circumference(5.5, -1.7)
c5 = circumference(3,-2);
cf = BEZIER(S0)([[0,0,-2]]);

c6 = circumference(5,0.1);
c7 = circumference(5.2,0.1);
c8 = circumference(5.2, -0.2);

var back = STRUCT([surface([cb, c1, c2, c3, c4, c5, cf]), 
					surface([c6, c7]), 
					surface([cb, c6]), 
					surface([c7,c8])]);

// DRAW(STRUCT([curve(c1), curve(c2), curve(c3), curve(c4) ]))

// display
r = 5;
hlines = 0.0001;
hcursor = 0.02;

var halfcolumns = STRUCT([POLYLINE([[0,r,hlines],[0,-r,hlines]]), 
					POLYLINE([[1,r-0.1,hlines],[1,-r+0.1,hlines]]), 
					POLYLINE([[2,r-0.42,hlines],[2,-r+0.42,hlines]]), 
					POLYLINE([[3,r-1,hlines],[3,-r+1,hlines]]), 
					POLYLINE([[4,r-2,hlines],[4,-r+2,hlines]])]);

var columns = STRUCT([halfcolumns, R([0,1])([PI])(halfcolumns)]);
var rows = STRUCT([R([0,1])([PI/2])(columns)]);

points = [[0,0.4,hcursor], [0.3, -0.2,hcursor], [-0.3, -0.2,hcursor]];
cells = [[0,1,2]];
var cursor = COLOR([1,0,0])(SIMPLICIAL_COMPLEX(points)(cells));

rball = 0.2;
var ball = COLOR([1,1,0])(T([1])([2])(circle(rball, hcursor)));
var balls = STRUCT([ball, 
					T([0])([2*rball+0.01])(ball), 
					T([0])([-2*rball-0.01])(ball), 
					T([0,1])([rball+0.01, 2*rball])(ball), 
					T([0,1])([-rball-0.01, 2*rball])(ball), 
					T([0,1])([rball+0.01, -2*rball])(ball), 
					T([0,1])([-rball-0.01, -2*rball])(ball)]);

var display = STRUCT([balls, cursor, columns, rows, COLOR([0,1,0])(circle(r,0))]);


// button
c1 = circumference(0.58,0);
c2 = circumference(0.5, 0.8);
c3 = circumference(0.3, 0.8);
var base = STRUCT([surface([c1,c2]), surface([c2,c3])]);

c1 = circumference(0.3, 0.7);
c2 = circumference(0.3, 1);

c3 = circumference(0.5, 1);
c4 = circumference(0.5, 1.2);
c5 = circumference(0.5, 1.5);
cf = BEZIER(S0)([[0,0,1.5]]);

var touch = STRUCT([surface([c1,c2]), surface([c2, c3]), surface([c3, c4, c5, cf])]);


var button = T([1,2])([r+0.4, -0.65])(R([1,2])([-PI/2])(STRUCT([base, touch])));

var dragonRadar = STRUCT([back, display, button]);
// DRAW(dragonRadar);


/*************************************************************************************************/


// PEDESTAL


// base
r = 20;
c1 = circumference(r,0);
c2 = circumference(22,2.5);
c3 = circumference(20,5);

c4 = circumference(19.5,5);
c5 = circumference(19.5,6);
c6 = circumference(19,6);

c7 = circumference(12,8.5);
c8 = circumference(15,11);

c9 = circumference(15,11.5);
c10 = circumference(17,13);
c11 = circumference(15,14.5);

c12 = circumference(14.5,14.5);
c13 = circumference(14.5,15);

c14 = circumference(14,15);
c15 = circumference(14,15.5);

var base = STRUCT([circle(r,0), surface([c1,c2,c3]), 
					surface([c3,c4]), 
					surface([c4,c5]), 
					surface([c5,c6]), 
					surface([c6,c7,c8]), 
					surface([c8,c9]), 
					surface([c9,c10,c11]), 
					surface([c11,c12]), 
					surface([c12,c13]), 
					surface([c13,c14]), 
					surface([c14,c15]), 
					circle(14,15.5)]);

// center
verts = [[-1,13],[1,13],[5,0],[-5,0],[-1,13]];
var trapeze = POLYLINE(verts);
var trapezoid = T([2])([15.5])(EXTRUDE([60])(trapeze));

var center = STRUCT([STRUCT(REPLICA(18)([trapezoid, R([0,1])([2*PI/18])])), 
					T([2])([15.5])(CYL_SURFACE([11,60])([50,50]))]);

var pedestal = COLOR([1,1,1])(STRUCT([base, center, T([2])([15.5+60+15.5])(R([1,2])([PI])(base))]));
// DRAW(pedestal);

/*************************************************************************************************/


// MODEL

var model = STRUCT([T([1,2])([34, -(15.5+60+15.5+5)])(pedestal), T([1])([34])(dragonBalls), T([1,2])([4,10])(R([1,2])([PI/2])(dragonRadar))]);