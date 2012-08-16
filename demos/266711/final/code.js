/*********************************************************

*********************  Final Project  ********************

	subject : Villa Capra "La Rotonda" by Andrea Palladio

	author: Roberto Marinai

	project stored in a local variable "model"   

*********************************************************/


/*** function that normalizes between 0 and 1 rgb values ***/
var normalize = function(rgb){
	return [rgb[0]/255,rgb[1]/255,rgb[2]/255];
};

/******* color groups  *******/
var grey = [105,105,105];
var lightblue = [173,216,230];
var darkGrey = [50,50,50];
var cadetblue = [95,158,160];
var white = [255,245,235];
var ivory = [255,255,240];
var antiqueWhite = [250-20,235-15,215-10];
var darkRed = [139,0,0];
var green = [0,115,0];

var wallColor = normalize(white);
var borderColor = normalize(antiqueWhite);
var windowBorderColor = normalize(grey);
var doorBorderColor = normalize(darkGrey);
var glassColor = normalize(lightblue).concat(0.4);
var glassDoorColor = normalize(cadetblue).concat(0.6);
var roofColor = normalize(darkRed);
var columnCapitalColor = normalize(ivory);
var grassColor = normalize(green);
/************************************/

/*** functions that return windows and door glass ***/

var getSmallInternalWindowAlpha = function(){
	var s1 = SIMPLEX_GRID([[0.6],[0.15],[0.025]]);
	var s2 = T([2])([0.575])(s1);
	var s3 = T([2])([0.025])(SIMPLEX_GRID([[0.025],[0.15],[0.575]]));
	var s4 = T([0])([0.3-0.025])(s3);
	var s5 = T([0])([0.3])(s3);
	var s6 = T([0])([0.3-0.025])(s5);
	var glass1 = T([0,1,2])([0.025,0.1,0.025])(SIMPLEX_GRID([[0.25],[0],[0.575]]));
	var glass2 = T([0])([0.3])(glass1);
	var glasses = COLOR(glassColor)(STRUCT([glass1,glass2]));
	var smallInternalWindow = COLOR(windowBorderColor)(STRUCT([s1,s2,s3,s4,s5,s6]));
	return T([1])([0.075])(STRUCT([smallInternalWindow,glasses]));
};

var getSmallInternalWindowBeta = function(){
	var s1 = SIMPLEX_GRID([[0.6],[0.15],[0.025]]);
	var s2 = T([2])([0.575])(s1);
	var s3 = T([2])([0.025])(SIMPLEX_GRID([[0.025],[0.15],[0.55]]));
	var s4 = T([0])([0.6-0.025])(s3);
	var glass = T([0,1,2])([0.025,0.1,0.025])(COLOR(glassColor)(SIMPLEX_GRID([[0.55],[0],[0.55]])));
	var smallInternalWindow = COLOR(windowBorderColor)(STRUCT([s1,s2,s3,s4]));
	return STRUCT([smallInternalWindow,glass]);
};

var getBigInternalWindow = function(){
	var s1 = SIMPLEX_GRID([[0.6],[0.15],[0.025]]);
	var s2 = T([0,2])([0.025,0.85-0.025])(SIMPLEX_GRID([[0.55],[0.15],[0.025]]));
	var s3 = T([2])([1.3-0.025])(s1);
	var s4 = T([2])([0.025])(SIMPLEX_GRID([[0.025],[0.15],[1.25]]));
	var s5 = T([0])([0.6-0.025])(s4);
	var s6 = T([0,2])([0.3-0.025,0.025])(SIMPLEX_GRID([[0.05],[0.15],[0.8]]));
	var glass1 = T([0,1,2])([0.025,0.1,0.025])(SIMPLEX_GRID([[0.55/2-0.025],[0],[0.8]]));
	var glass2 = T([0,1,2])([0.025,0.1,0.85])(SIMPLEX_GRID([[0.55],[0],[0.45-0.025]]));
	var glass3 = T([0])([0.55/2+0.025])(glass1);
	var glasses = COLOR(glassColor)(STRUCT([glass1,glass2,glass3]));
	var bigInternalWindw = COLOR(windowBorderColor)(STRUCT([s1,s2,s3,s4,s5,s6]));
	return T([1])([0.075])(STRUCT([bigInternalWindw,glasses]));
};

var getDoorInternalWindow = function(){
	var s1 = SIMPLEX_GRID([[0.5],[0.15],[0.025]]);
	var s2 = T([2])([2.6-0.025])(s1);
	var s3 = T([2])([0.025])(SIMPLEX_GRID([[0.025],[0.15],[2.55]]));
	var s4 = T([0])([0.5-0.025])(s3);
	var s5 = T([0,2])([0.025,0.866])(SIMPLEX_GRID([[0.45],[0.15],[0.025]]));
	var s6 = T([2])([0.866])(s5);
	var g1 = T([0,1,2])([0.025,0.1,0.025])(SIMPLEX_GRID([[0.45],[0],[0.866-0.025]]));
	var g2 = T([2])([0.866])(g1);
	var g3 = T([2])([0.866])(g2);
	var glasses = COLOR(glassDoorColor)(STRUCT([g1,g2,g3]));
	var doorInternalWindow = COLOR(doorBorderColor)(STRUCT([s1,s2,s3,s4,s5,s6]));
	return T([1])([0.075])(STRUCT([doorInternalWindow,glasses]));
};
/************************************/

/******* functions that build the external perimeter *******/

var getSurface1 = function() {
	var domain = DOMAIN([[0,1],[0,1]])([10,1]);

	var sx1 = SIMPLEX_GRID([[0.3],[0.6],[5.8]]);
	var sx2 = T([1])([0.6+1.2])(sx1);
	var sx3 = T([1])([0.6+1.2+0.6])(SIMPLEX_GRID([[0.3],[0.6],[1.8]]));
	var sx4_1 = T([1])([0.6+1.2+0.6+0.6])(SIMPLEX_GRID([[0.3],[0.6],[0.9]]));
	var sx4_2 = T([1,2])([0.6+1.2+0.6+0.6, 1.5])(SIMPLEX_GRID([[0.3],[0.6],[0.3]]));
	var sx5 = T([1])([0.6+1.2+0.6+0.6+0.6])(SIMPLEX_GRID([[0.3],[2.4],[1.8]]));
	var sx6 = T([0,2])([0.3,5.5])(SIMPLEX_GRID([[3],[2.8],[0.3]]));
	var sx7 = T([0,1,2])([0,2.8-0.4,5.3])(SIMPLEX_GRID([[3.3],[0.4],[0.2]]));

	var p1 = [[0,0.6,1.4],[0,1.2,1.8],[0,1.8,1.4]];

	var c1 = BEZIER(S0)(p1);

	var p2 = [[0,0.6,2.4],[0,1.8,2.4]];

	var c2 = BEZIER(S0)(p2);

	var s1 = MAP(BEZIER(S1)([c1,c2]))(domain);

	var p1_1 = [[0.3,0.6,1.4],[0.3,1.2,1.8],[0.3,1.8,1.4]];

	var c1_1 = BEZIER(S0)(p1_1);

	var p2_1 = [[0.3,0.6,2.4],[0.3,1.8,2.4]];

	var c2_1 = BEZIER(S0)(p2_1);

	var s2 = MAP(BEZIER(S1)([c1_1,c2_1]))(domain);
	var s1_1 = MAP(BEZIER(S1)([c1,c1_1]))(domain);
	var s2_1 = MAP(BEZIER(S1)([c2,c2_1]))(domain);

	var p3 = [[0,0.6,4.2],[0,1.2,5],[0,1.8,4.2]];

	var c3 = BEZIER(S0)(p3);

	var p4 = [[0,0.6,5.8],[0,1.8,5.8]];

	var c4 = BEZIER(S0)(p4);

	var s3 = MAP(BEZIER(S1)([c3,c4]))(domain);

	var p3_1 = [[0.3,0.6,4.2],[0.3,1.2,5],[0.3,1.8,4.2]];

	var c3_1 = BEZIER(S0)(p3_1);

	var p4_1 = [[0.3,0.6,5.8],[0.3,1.8,5.8]];

	var c4_1 = BEZIER(S0)(p4_1);

	var s4 = MAP(BEZIER(S1)([c3_1,c4_1]))(domain);
	var s3_1 = MAP(BEZIER(S1)([c3,c3_1]))(domain);
	var s4_1 = MAP(BEZIER(S1)([c4,c4_1]))(domain);

	var fix = SIMPLEX_GRID([[0.3],[0.3],[7.4]]);
	var fix2 = T([1,2])([2.7,5.5])(SIMPLEX_GRID([[0.3],[0.4],[0.3]]));

	var surface = COLOR(wallColor)(STRUCT([sx1,sx2,sx3,sx4_1,sx4_2,sx5,sx6,sx7,s1,s2,s1_1,s2_1,s3,s4,s3_1,s4_1]));

	var window1 = T([0,1,2])([0.3,0.6+1.2+0.6+0.6,0.9])(R([0,1])(PI/2)(getSmallInternalWindowBeta()));

	surface = T([1])([0.3])(STRUCT([surface,window1]));
	surface = STRUCT([surface, COLOR(wallColor)(fix), COLOR(wallColor)(fix2)]);

	return surface;
};

var getSurface2 = function(){
	var s1 = SIMPLEX_GRID([[1.2],[0.3],[7.4]]);
	var s2 = T([0])([1.8])(s1);
	var s3_1 = T([0])([1.2])(SIMPLEX_GRID([[0.6],[0.3],[0.9]]));
	var s3_2 = T([0,2])([1.2,1.5])(SIMPLEX_GRID([[0.6],[0.3],[0.8]]));
	var s3_3 = T([0,2])([1.2,3.6])(SIMPLEX_GRID([[0.6],[0.3],[2.7]]));
	var s3_4 = T([0,2])([1.2,6.9])(SIMPLEX_GRID([[0.6],[0.3],[0.5]]));

	var surface = COLOR(wallColor)(STRUCT([s1,s2,s3_1,s3_2,s3_3,s3_4]));

	var window1 = T([0,2])([1.2,6.3])(getSmallInternalWindowAlpha());
	var window2 = T([0,2])([1.2,0.9])(getSmallInternalWindowBeta());
	var window3 = T([0,2])([1.2,2.3])(getBigInternalWindow());

	var surface = STRUCT([surface,window1,window2,window3]);

	return surface;
};

var getSurface3 = function(){
	var s1 = SIMPLEX_GRID([[0.2],[0.3],[5.6]]);
	var s2_1 = T([0])([0.2])(SIMPLEX_GRID([[0.6],[0.3],[0.5]]));
	var s2_2 = T([0,2])([0.2,1.8])(SIMPLEX_GRID([[0.6],[0.3],[2.8]]));
	var s2_3 = T([0,2])([0.2,5.1])(SIMPLEX_GRID([[0.6],[0.3],[0.5]]));
	var s3 = T([0])([0.2+0.6])(SIMPLEX_GRID([[1.7],[0.3],[5.6]]));
	var s4 = T([0,2])([0.2+0.6+1.7,2.6])(SIMPLEX_GRID([[0.5],[0.3],[3]]));

	var surface = COLOR(wallColor)(STRUCT([s1,s2_1,s2_2,s2_3,s3,s4]));

	var window1 = T([0,2])([0.2,4.6])(S([2])([0.835])(getSmallInternalWindowAlpha()));
	var window2 = T([0,2])([0.2,0.5])(getBigInternalWindow());
	var window3 = T([0])([0.2+0.6+1.7])(getDoorInternalWindow());

	surface = STRUCT([surface,window1,window2,window3]);

	return surface;
};
/************************************/

/******* function that returns external steps *******/
var getSteps = function(){
	var i = 2;
	var x = 3;
	var y = 0.15;
	var z = -0.09;
	var h = 1.8
	var d = 3.3;

	var step = T([2])([h+z])(SIMPLEX_GRID([[x],[d+y],[0.09]]));
	var steps= STRUCT([step]);

	while(i < 21){
		step = T([1,2])([d, h + i*z])(SIMPLEX_GRID([[x],[i*y],[0.09]]));
		steps = STRUCT([steps, step]);
		i++;
	}
	return COLOR(wallColor)(steps);
};
/************************************/

/******* function that returns colonnade roof *******/
var getExternalRoof = function(){
	var domain = DOMAIN([[0,1],[0,1]])([5,5]);

	var additional = T([0])([0.105])(SIMPLEX_GRID([[0.105],[0.105],[0.105]]));
	var additional2 = T([1])([0.0625])(SIMPLEX_GRID([[0.105],[0.105],[0.105]]));


	var i = 0;
	while(i < 16){
		Hadditionals = STRUCT([additional, Hadditionals]);
		additional = T([0])([0.21])(additional);
		i++;
		if(i>1){
			Radditionals = STRUCT([additional, Radditionals]);
		};
	};

	i = 0;
	while(i<14){
		Hadditionals2 = STRUCT([additional2, Hadditionals2]);
		additional2 = T([1])([0.21])(additional2);
		i++;
	};

	var Hadditionals = T([0,1,2])([0.0525,2.8,-0.1])(Hadditionals);
	var Hadditionals2 = T([0,2])([-0.07,-0.1])(Hadditionals2);
	var Radditionals = T([1,2])([2.8,-0.1])(Radditionals);

	var Hpart = STRUCT([Hadditionals, Hadditionals2, T([0])([-0.2])(SIMPLEX_GRID([[3.6],[2.98],[0.1]]))]);
	var Rpart = R([0,2])(-PI/8)(STRUCT([Radditionals, T([1])([-0.0001])(SIMPLEX_GRID([[3.68],[2.98],[0.1]]))]));

	var Rpart2 = R([0,2])(-PI/8)(T([0,2])([-0.25,0.1])(SIMPLEX_GRID([[3.94],[3.02],[0.05]])));
	var Rpart3 = R([0,2])(-PI/8)(T([0,2])([-0.35,0.15])(SIMPLEX_GRID([[4.06],[3.08],[0.05]])));

	var Hline1 = BEZIER(S0)([[0,0,0.1],[1.7,0,0.1]]);
	var Hline2 = BEZIER(S0)([[1.7,0,0.1],[3.4,0,0.1]]);
	var Rline1 = BEZIER(S0)([[0,0,0.1],[1.7,0,0.7]]);
	var Rline2 = BEZIER(S0)([[1.7,0,0.7],[3.4,0,1.4]]);
	var c1 = BEZIER(S0)([[1.7,0,0.35],[1.72,0,0.2],[1.9,0,0.2]]);
	var c2 = BEZIER(S0)([[1.9,0,0.2],[2.08,0,0.2],[2.1,0,0.35]]);
	var c3 = BEZIER(S0)([[1.9,0,0.5],[2.08,0,0.5],[2.1,0,0.35]]);
	var c4 = BEZIER(S0)([[1.7,0,0.35],[1.72,0,0.5],[1.9,0,0.5]]);
	var cNull1 = BEZIER(S0)([[3.4,0,0.1],[3.4,0,0.7]]);
	var cNull2 = BEZIER(S0)([[3.4,0,1.4],[3.4,0,0.7]]);

	var s1 = MAP(CUBIC_HERMITE(S1)([Hline1,c1,[0,0,0],[0,0,0]]))(domain);
	var s2 = MAP(CUBIC_HERMITE(S1)([Hline2,c2,[0,0,0],[0,0,0]]))(domain);
	var s3 = MAP(CUBIC_HERMITE(S1)([Rline2,c3,[0,0,0],[0,0,0]]))(domain);
	var s4 = MAP(CUBIC_HERMITE(S1)([Rline1,c4,[0,0,0],[0,0,0]]))(domain);
	var sNull1 = MAP(CUBIC_HERMITE(S1)([c2,cNull1,[0,0,0],[0,0,0]]))(domain);
	var sNull2 = MAP(CUBIC_HERMITE(S1)([c3,cNull2,[0,0,0],[0,0,0]]))(domain);

	var c1_1 = BEZIER(S0)([[1.7,-0.1,0.35],[1.72,-0.1,0.2],[1.9,-0.1,0.2]]);
	var c2_1 = BEZIER(S0)([[1.9,-0.1,0.2],[2.08,-0.1,0.2],[2.1,-0.1,0.35]]);
	var c3_1 = BEZIER(S0)([[1.9,-0.1,0.5],[2.08,-0.1,0.5],[2.1,-0.1,0.35]]);
	var c4_1 = BEZIER(S0)([[1.7,-0.1,0.35],[1.72,-0.1,0.5],[1.9,-0.1,0.5]]);

	var s1_1 = MAP(CUBIC_HERMITE(S1)([c1_1,c1,[0,0,0],[0,0,0]]))(domain);
	var s2_1 = MAP(CUBIC_HERMITE(S1)([c2_1,c2,[0,0,0],[0,0,0]]))(domain);
	var s3_1 = MAP(CUBIC_HERMITE(S1)([c3_1,c3,[0,0,0],[0,0,0]]))(domain);
	var s4_1 = MAP(CUBIC_HERMITE(S1)([c4_1,c4,[0,0,0],[0,0,0]]))(domain);

	var cSpecial1 = BEZIER(S0)([[1.65,0,0.35],[1.662,0.025,0.35],[1.675,0,0.35]]);
	var cSpecial2 = BEZIER(S0)([[1.9,0,0.55],[1.9,0.025,0.537],[1.9,0,0.525]]);
	var cSpecial3 = BEZIER(S0)([[2.15,0,0.35],[2.138,0.025,0.35],[2.125,0,0.35]]);
	var cSpecial4 = BEZIER(S0)([[1.9,0,0.15],[1.9,0.025,0.163],[1.9,0,0.175]]);

	var special1 = MAP(CUBIC_HERMITE(S1)([cSpecial1,cSpecial2,[0,0,0.3],[0.3,0,0]]))(domain);
	var special2 = MAP(CUBIC_HERMITE(S1)([cSpecial2,cSpecial3,[0.3,0,0],[0,0,-0.3]]))(domain);
	var special3 = MAP(CUBIC_HERMITE(S1)([cSpecial3,cSpecial4,[0,0,-0.3],[-0.3,0,0]]))(domain);
	var special4 = MAP(CUBIC_HERMITE(S1)([cSpecial4,cSpecial1,[-0.3,0,0],[0,0,0.3]]))(domain);

	var special = T([1])([2.75])(COLOR(borderColor)(STRUCT([special1,special2,special3,special4])));

	Hpart = COLOR(columnCapitalColor)(Hpart);
	Rpart = COLOR(columnCapitalColor)(Rpart);
	Rpart2 = COLOR(borderColor)(Rpart2);
	Rpart3 = COLOR(roofColor)(Rpart3);

	var wall = T([1])([2.75])(COLOR(wallColor)(STRUCT([s1,s2,s3,s4,sNull2,sNull1,s1_1,s2_1,s3_1,s4_1])));
	var internalWall = COLOR([0,0,0])(T([1])([2.7])(STRUCT([MAP(CUBIC_HERMITE(S1)([c1,c4,[0,0,0],[0,0,0]]))(domain), MAP(CUBIC_HERMITE(S1)([c2,c3,[0,0,0],[0,0,0]]))(domain)])));
	var externalRoof = STRUCT([Hpart, Rpart, Rpart2, Rpart3,wall,internalWall,special]);

	return externalRoof;
};
/************************************/

/******* function that creates a column *******/
var getColumn = function(){
	var domain = DOMAIN([[0,1],[0,2*PI]])([15,15]);
	var domain2 = DOMAIN([[0,1],[0,1]])([10,10]);

	var base = T([0,1])([-0.225,-0.225])(COLOR(borderColor)(SIMPLEX_GRID([[0.45],[0.45],[0.1]])));

	var profile = BEZIER(S0)([[0.2,0,0.2],[0.18,0,3.4]]);
	var mapping = ROTATIONAL_SURFACE(profile);
	var mainPart = COLOR(wallColor)(MAP(mapping)(domain));
	var profile2 = BEZIER(S0)([[0.22,0,0.1],[0.25,0,0.12],[0.16,0,0.14],[0.26,0,0.16],[0.2,0,0.2]]);
	var mapping2 = ROTATIONAL_SURFACE(profile2);

	var lowerPart = COLOR(columnCapitalColor)(MAP(mapping2)(domain));
	
	var upperBase = COLOR(columnCapitalColor)(SIMPLEX_GRID([[0.4],[0.45],[0.1]]));

	var c1 = BEZIER(S0)([[0.4,0,0.1],[0.525,0,0.085],[0.7,0,-0.05],[0.33,0,-0.2],[0.4,0,0]]);
	var cNull1 = BEZIER(S0)([[0.4,0,0],[0.4,0,0.1]]);
	var cNull = BEZIER(S0)([[0.45,0,0]]);

	var s1 = MAP(BEZIER(S1)([c1,cNull]))(domain2);
	var sNull = MAP(BEZIER(S1)([cNull1,cNull]))(domain2);

	var c2 = BEZIER(S0)([[0.4-0.1,0.225,0.1],[0.525-0.1,0.225,0.085],[0.7-0.1,0.225,-0.05],[0.33-0.1,0.225,-0.2],[0.4-0.1,0.225,0]]);
	var c1_1 = BEZIER(S0)([[0.4,0.45,0.1],[0.525,0.45,0.085],[0.7,0.45,-0.05],[0.33,0.45,-0.2],[0.4,0.45,0]]);
	var cNull1_1 = BEZIER(S0)([[0.4,0.45,0],[0.4,0.45,0.1]]);
	var cNull_1 = BEZIER(S0)([[0.45,0.45,0]]);

	var s1_1 = MAP(BEZIER(S1)([c1_1,cNull_1]))(domain2);
	var sNull_1 = MAP(BEZIER(S1)([cNull1_1,cNull_1]))(domain2);
	var s2 = MAP(BEZIER(S1)([c1_1,c2,c1]))(domain2);

/* *** CAUSES COMPLEXITY ISSUES *** */
/*
	domain2 = DOMAIN([[0,1],[0,1]])([10,1]);
	var d = 0.01875;
	var c3;
	var c4;
	var c5;
	var c6;

	var p0 = [-0.2,0.3];
	var p1 = [0,0.3];
	var p2 = [0.125,0.285];
	var p3 = [0.3,0.15];
	var p4 = [-0.07,0];
	var p5 = [0,0.2];
	var p6 = [0.125-3.5*d,0.285];
	var p7 = [0.2-d,0.15+d];
	var p8 = [-0.07+2*d,0.1];
	var p9 = [2*d,0.15+d/2];

	c1 = BEZIER(S0)([p1,p2,p3,p4,p5]);
	c2 = BEZIER(S0)([p5,p6,p7,p9]);
	c3 = BEZIER(S0)([p0,p1]);

	p0 = [-0.2,0.3-d];
	p1 = [0,0.3-d];
	p2 = [0.125-d/2,0.285-d/2];
	p3 = [0.3-d,0.15];
	p4 = [-0.0675,0+d+d/4];
	p5 = [0+d/2,0.2];
	p6 = [0.125-3*d-d/2,0.285-d];
	p7 = [0.2-d-d,0.15+d];
	p8 = [-0.07+2*d-d/2,0.1+d/2];
	p9 = [2*d,0.15+d/2];

	c4 = BEZIER(S0)([p1,p2,p3,p4,p5]);
	c5 = BEZIER(S0)([p5,p6,p7,p9]);
	c6 = BEZIER(S0)([p0,p1]);

	var special1 = MAP(BEZIER(S1)([c1,c4]))(domain2);
	var special2 = MAP(BEZIER(S1)([c2,c5]))(domain2);
	var special3 = MAP(BEZIER(S1)([c3,c6]))(domain2);
	var special = T([0,1,2])([0.4,0,-0.2])(R([1,2])(PI/2)(EXTRUDE([0.01])(STRUCT([special1,special2,special3]))));
	var special_1 = T([1])([0.45+0.01])(special);
*/
	var roundPart1 = COLOR(columnCapitalColor)(STRUCT([s1,s2,s1_1,sNull,sNull_1]));
	var roundPart2 = T([0])([0.4])(S([0])([-1])(roundPart1));

	var upperPart = T([0,1,2])([-0.2,-0.225,3.4])(STRUCT([upperBase,roundPart1,roundPart2]));
	
	var column = STRUCT([base, mainPart, lowerPart, upperPart]);

	return T([0,1])([0.225,0.225])(column);
};
/************************************/

/******* function that returns window external detailed border *******/
var getWindowBorder = function(){
	var domain = DOMAIN([[0,1],[0,1]])([10,1]);

	var lowerPart = T([0])([-0.025])(SIMPLEX_GRID([[0.85],[0.08],[0.15]]));
	var lowerPartAddon = T([0,2])([-0.05,0.135])(SIMPLEX_GRID([[0.9],[0.09],[0.0225]]));

	var c1 = BEZIER(S0)([[0,0,0],[0.02,0.03,0],[0.04,0,0]]);
	var c2 = BEZIER(S0)([[0,0,1.45],[0.02,0.03,1.425],[0.04,0,1.4]]);
	var c3 = BEZIER(S0)([[0.8,0,1.45],[0.78,0.03,1.425],[0.76,0,1.4]]);
	var c4 = BEZIER(S0)([[0.8,0,0],[0.78,0.03,0],[0.76,0,0]]);
	var lateral1 = MAP(BEZIER(S1)([c1,c2]))(domain);
	var lateral2 = MAP(BEZIER(S1)([c2,c3]))(domain);
	var lateral3 = MAP(BEZIER(S1)([c3,c4]))(domain);
	var lateral = T([2])([0.15])(STRUCT([lateral1,lateral2,lateral3]));

	var Hpart = SIMPLEX_GRID([[1],[0.07],[0.05]]);
	var Rpart1 = R([0,2])(-PI/8)(SIMPLEX_GRID([[0.565],[0.07],[0.05]]));
	var Rpart2 = T([0,2])([1.02,0.05])(R([0,2])(PI+PI/8)(SIMPLEX_GRID([[0.5575],[0.07],[0.05]])));
	var Hpart2 = T([0,2])([-0.0139,0.025])(SIMPLEX_GRID([[1.038],[0.09],[0.0225]]));
	var Rpart3 = R([0,2])(-PI/8)(SIMPLEX_GRID([[0.578],[0.09],[0.025]]));
	var Rpart4 = T([0,2])([1.03,0.025])(S([0])([-1])(Rpart3));
	Rpart3 = T([0,2])([-0.02,0.025])(Rpart3);
	var upperPartAddon1 = T([0,2])([0.1,-0.05])(SIMPLEX_GRID([[0.8],[0.02],[0.05]]));
	var upperPartAddon2 = T([0,2])([0.1,-0.09])(SIMPLEX_GRID([[0.8],[0.01],[0.04]]));

	var c5_1 = BEZIER(S0)([[0,0.07,0.526],[0,0.11,0.526],[0,0.11,0.25],[0,0,0.22]]);
	var c6_1 = BEZIER(S0)([[0,0,0.22],[0,0.065,0.135],[0,0,0.06]]);
	var cNull5_1 = BEZIER(S0)([[0,0,0.526]]);
	var cNull6_1 = BEZIER(S0)([[0,0,0.065]]);
	var c5_2 = BEZIER(S0)([[-0.04,0.07,0.526],[-0.04,0.11,0.526],[-0.04,0.11,0.25],[-0.04,0,0.22]]);
	var c6_2 = BEZIER(S0)([[-0.04,0,0.22],[-0.04,0.065,0.135],[-0.04,0,0.06]]);
	var cNull5_2 = BEZIER(S0)([[-0.04,0,0.526]]);
	var cNull6_2 = BEZIER(S0)([[-0.04,0,0.065]]);

	var s1 = MAP(BEZIER(S1)([c5_1,cNull5_1]))(domain);
	var s2 = MAP(BEZIER(S1)([c6_1,cNull6_1]))(domain);
	var s3 = MAP(BEZIER(S1)([c5_2,cNull5_2]))(domain);
	var s4 = MAP(BEZIER(S1)([c6_2,cNull6_2]))(domain);
	var s5 = MAP(BEZIER(S1)([c5_1,c5_2]))(domain);
	var s6 = MAP(BEZIER(S1)([c6_1,c6_2]))(domain);

	var special1 = T([2])([1.775-0.526])(STRUCT([s1,s2,s3,s4,s5,s6]));
	var special2 = T([0])([0.84])(special1);

	var roof = T([0,2])([-0.1,1.775])(STRUCT([Hpart,Rpart1,Rpart2,Hpart2,Rpart3,Rpart4,upperPartAddon1,upperPartAddon2]));

	var windowBorder = STRUCT([lowerPart,lateral,roof,lowerPartAddon,special1,special2]);
	return windowBorder;
};
/************************************/

/******* function that returns door external detailed border *******/
var getDoorBorder = function(){
	var domain = DOMAIN([[0,1],[0,1]])([10,1]);

	var lateral = SIMPLEX_GRID([[0.1],[0.02],[2.6]]);

	var Hpart = SIMPLEX_GRID([[0.8],[0.1],[0.08]]);

	var additional = T([0,2])([0.2,-0.08])(SIMPLEX_GRID([[0.08],[0.07],[0.08]]));
	var additionals;
	var additionals2;
	var i = 0;
	while(i < 4){
		additionals = STRUCT([additional, additionals]);
		if(i>0){
			additionals2 = STRUCT([additional, additionals2]);
		};
		additional = T([0])([0.16])(additional);
		i++;
	};
	Hpart = STRUCT([additionals,Hpart]);

	var Rpart = R([0,2])(-PI/8)(SIMPLEX_GRID([[0.9],[0.1],[0.08]]));
	var Radditionals = R([0,2])(-PI/8)(T([0])([0.05])(additionals2));
	Rpart = STRUCT([Rpart, Radditionals]);
	var Rpart2 = R([0,2])(-PI/8)(T([0,2])([-0.025,0.08])(SIMPLEX_GRID([[0.9375],[0.15],[0.03]])));

	var addon1 = T([0,2])([0.1,-0.15])(SIMPLEX_GRID([[0.7],[0.02],[0.15]]));
	var addon2 = T([0,2])([0.1,-0.225])(SIMPLEX_GRID([[0.7],[0.01],[0.075]]));
	var addon3 = T([0])([-0.02])(SIMPLEX_GRID([[0.82],[0.125],[0.025]]));

	var c1 = BEZIER(S0)([[0,0.02,0],[0,0.02,0.2],[0,0.14,0.3],[0,0.1,0.4]]);
	var cNull1 = BEZIER(S0)([[0,0,0],[0,0,0.4]]);
	var c2 = BEZIER(S0)([[0.1,0.02,0],[0.1,0.02,0.2],[0.1,0.14,0.3],[0.1,0.1,0.4]]);
	var cNull2 = BEZIER(S0)([[0.1,0,0],[0.1,0,0.4]]);

	var special1_1 = MAP(BEZIER(S1)([c1,cNull1]))(domain);
	var special1_2 = MAP(BEZIER(S1)([c2,cNull2]))(domain);
	var special1_3 = MAP(BEZIER(S1)([c1,c2]))(domain);
	var special1 = T([2])([-0.4])(STRUCT([special1_1,special1_2,special1_3])); 


	var roof = T([2])([3])(STRUCT([Hpart,Rpart,Rpart2,addon1,addon2,addon3,special1]));
	var doorBorder = STRUCT([lateral,roof]);
	return doorBorder;
};
/************************************/

/******* function that build external perimeter borders *******/
var getBorders = function(){
	var domain = DOMAIN([[0,1],[0,1]])([5,5]);	

	var d = 0.075-0.038;

	var alpha1_1 = T([0,1])([2.925,1.725])(SIMPLEX_GRID([[0.45],[4.35],[0.45]]));
	var alpha1_2 = T([0,1])([2.925,0.075])(SIMPLEX_GRID([[0.45],[0.6],[0.45]]));
	var alpha1_3 = T([0])([-0.3])(SIMPLEX_GRID([[3.3+0.075],[0.075],[0.45]]));

	var beta1_1 = T([0,1])([2.925+d,1.725+d])(SIMPLEX_GRID([[0.3+2*0.038],[4.35-2*d],[0.275]]));
	var beta1_2 = T([0,1])([2.925+d,0.038])(SIMPLEX_GRID([[0.3+2*0.038],[0.6],[0.275]]));
	var beta1_3 = T([0])([-0.3])(SIMPLEX_GRID([[3.3+0.038],[0.038],[0.275]]));

	var alpha2_1 = T([0,1])([2.925,0.075])(SIMPLEX_GRID([[0.45],[6-0.075/2],[0.175]]));
	var alpha2_3 = T([0])([-0.3])(SIMPLEX_GRID([[3.3+0.075],[0.075],[0.175]]));
	var alpha2Addon = T([0,2])([1.1,0.175])(SIMPLEX_GRID([[0.8],[0.075],[0.175]]));

	var beta2_1 = T([0,1])([2.925+d,0.038])(SIMPLEX_GRID([[0.3+2*0.038],[2.4],[0.175]]));
	var beta2_2 = T([0])([-0.3])(SIMPLEX_GRID([[3.3+0.075-1.9],[0.038],[0.175]]));
	var beta2_3 = T([0])([1.9])(SIMPLEX_GRID([[1.1],[0.038],[0.175]]));
	var beta2Addon = T([0,2])([1.1,0.175])(SIMPLEX_GRID([[0.8],[0.038],[0.175]]));

	var beta3_1 = T([0])([2.925+d])(SIMPLEX_GRID([[0.3+2*0.038],[0.6+0.038],[0.275]]));
	var beta3_2 = T([0,1])([2.925+d,2.4-0.6-0.038])(SIMPLEX_GRID([[0.3+2*0.038],[0.6+0.038*2],[0.275]]));

	var special1_1 = T([2])([0.025])(SIMPLEX_GRID([[0.025],[0.025],[0.3-0.025]]));
	var special1_2 = T([0])([0.025])(SIMPLEX_GRID([[(1.35/2)-0.025],[0.025],[0.025]]));
	var special1_3 = T([2])([0.3-0.025])(special1_2);
	var special1_4 = T([0,2])([0.025,0.025])(COLOR(columnCapitalColor)(SIMPLEX_GRID([[(1.35/2)-0.025],[0.01],[0.3-0.025]])));

	var special2_1 = T([0,1])([3,2.8])(SIMPLEX_GRID([[(1.35/2)+2.4+0.45/2],[0.025],[0.025]]));
	var special2_2 = T([0,1])([3-0.025,0.025])(SIMPLEX_GRID([[0.025],[2.4+0.4],[0.025]]));
	var special2_3 = T([0])([-0.3])(SIMPLEX_GRID([[3.3+0.025],[0.025],[0.025]]));

	var special5_1 = T([0,1])([3,2.8])(SIMPLEX_GRID([[2.4+0.45/2+0.01],[0.01],[0.15]]));
	var special5_2 = T([0,1])([3-0.01,0.01])(SIMPLEX_GRID([[0.01],[2.4+0.4],[0.15]]));
	var special5_3 = T([0])([-0.3])(SIMPLEX_GRID([[3.3+0.01],[0.01],[0.15]]));

	var c1 = BEZIER(S0)([[0,1.2-0.1,0],[0,1.2+0.1,0]]);
	var c2 = BEZIER(S0)([[0,1.2-0.2,0.8],[0,1.2+0.2,0.8]]);
	var c3 = BEZIER(S0)([[0,1.2-0.1,0],[0,1.2-0.2,0.8]]);
	var c4 = BEZIER(S0)([[0,1.2+0.1,0],[0,1.2+0.2,0.8]]);
	var c1_1 = BEZIER(S0)([[0.35,1.2-0.1,0],[0.35,1.2+0.1,0]]);
	var c2_1 = BEZIER(S0)([[0.35+0.05,1.2-0.2,0.8],[0.35,1.2+0.2,0.8]]);
	var c3_1 = BEZIER(S0)([[0.35,1.2-0.1,0],[0.35,1.2-0.2,0.8]]);
	var c4_1 = BEZIER(S0)([[0.35,1.2+0.1,0],[0.35,1.2+0.2,0.8]]);
	var special3_1 = MAP(BEZIER(S1)([c1,c2]))(domain);
	var special3_2 = MAP(BEZIER(S1)([c1,c1_1]))(domain);
	var special3_3 = MAP(BEZIER(S1)([c2,c2_1]))(domain);
	var special3_4 = MAP(BEZIER(S1)([c1_1,c2_1]))(domain);
	var special3_5 = MAP(BEZIER(S1)([c3,c3_1]))(domain);
	var special3_6 = MAP(BEZIER(S1)([c4,c4_1]))(domain);

	var special4_1 = T([0,1])([3,2.8])(SIMPLEX_GRID([[(1.35/2)+2.4+0.45/2],[0.02],[5.8-5.3+0.025-0.3-0.025]]));
	var special4_2 = T([0,1])([3-0.02,0.02])(SIMPLEX_GRID([[0.02],[2.4+0.4],[5.8-5.3+0.025-0.3-0.025]]));
	var special4_3 = T([0])([-0.3])(SIMPLEX_GRID([[3.3+0.02],[0.02],[5.8-5.3+0.025-0.3-0.025]]));

	var c5 = BEZIER(S0)([[3,2.8,0],[3-0.05,2.8+0.05,0.075],[3,2.8,0.14]]);
	var c6 = BEZIER(S0)([[3+2.4+0.45/2,2.8,0],[3+2.4+0.45/2,2.8+0.05,0.07],[3+2.4+0.45/2,2.8,0.14]]);
	var c7 = BEZIER(S0)([[3,0,0],[3-0.05,0.05,0.07],[3,0,0.14]]);
	var c8 = BEZIER(S0)([[-0.3,0,0],[-0.3-0.05,0.05,0.07],[-0.3,0,0.14]]);
	var special6_1 = MAP(BEZIER(S1)([c6,c5]))(domain);
	var special6_2 = MAP(BEZIER(S1)([c5,c7]))(domain);
	var special6_3 = MAP(BEZIER(S1)([c7,c8]))(domain);

	var alpha1 = STRUCT([alpha1_1,alpha1_2,alpha1_3]);
	var beta1 = T([2])([0.45])(STRUCT([beta1_1,beta1_2,beta1_3]));
	var alpha2 = T([2])([0.45+0.9+0.3])(STRUCT([alpha2_1,alpha2_3,alpha2Addon]));
	var beta2 = T([2])([0.45+0.9+0.3+0.175])(STRUCT([beta2_1,beta2_2,beta2_3,beta2Addon]));
	var beta3 = T([2])([4.2-0.275])(STRUCT([beta3_1,beta3_2]));
	var beta4 = T([0,2])([-0.3,7.4-0.2])(SIMPLEX_GRID([[6.6],[0.038],[0.2]]));
	var special1 = T([0,1,2])([2.4+0.45/2+3,2.8,5.3])(STRUCT([special1_1,special1_3]));
	var special2 = T([2])([5.3])(STRUCT([special2_1,special2_2,special2_3]));
	var special3 = T([0,2])([3-0.035,4.53])(STRUCT([special3_1,special3_2,special3_3,special3_4,special3_5,special3_6]));
	var special4 = T([2])([5.8-(5.8-5.3+0.025-0.3-0.025)])(STRUCT([special4_1,special4_2,special4_3]));
	var special5 = T([2])([5.3+0.025])(STRUCT([special5_1,special5_2,special5_3]));
	var special6 = T([2])([5.45+0.025])(COLOR(columnCapitalColor)(STRUCT([special6_1,special6_2,special6_3])));
	var windowBorder = T([0,2])([1.1,2.15])(getWindowBorder());
	var doorBorder = T([0,2])([5.5,1.8])(getDoorBorder());
	special1_4 = T([0,1,2])([2.4+0.45/2+3,2.8,5.3])(special1_4);

	var borders = COLOR(borderColor)(STRUCT([alpha1,beta1,alpha2,beta2,beta3,beta4,special1,special2,special3,special4,special5,windowBorder,doorBorder]));
	return T([1])([0.3])(STRUCT([borders,special6,special1_4]));
};
/************************************/

/******* function that returns fixes needed to handle corners *******/
var getFixes = function(){
	var fixWall = T([0])([-0.3])(COLOR(wallColor)(SIMPLEX_GRID([[0.3],[0.3],[7.4]])));
	var fixAlphaBorder1 = T([0,1])([-0.375,0.3])(SIMPLEX_GRID([[0.075],[0.075],[0.45]]));
	var fixBetaBorder1 = T([0,1,2])([-0.338,0.3,0.45])(SIMPLEX_GRID([[0.038],[0.038],[0.275]]));
	var fixAlphaBorder2 = T([0,1,2])([-0.375,0.3,0.45+0.9+0.3])(SIMPLEX_GRID([[0.075],[0.075],[0.175]]));
	var fixBetaBorder2 = T([0,1,2])([-0.338,0.3,0.45+0.9+0.3+0.175])(SIMPLEX_GRID([[0.038],[0.038],[0.175]]));
	var fixSpecial2 = T([0,1,2])([-0.325,0.3,5.3])(SIMPLEX_GRID([[0.025],[0.025],[0.025]]));
	var fixSpecial4 = T([0,1,2])([-0.32,0.3,5.8-(5.8-5.3+0.025-0.3-0.025)])(SIMPLEX_GRID([[0.02],[0.02],[5.8-5.3+0.025-0.3-0.025]]));
	var fixSpecial5 = T([0,1,2])([-0.31,0.3,5.3+0.025])(SIMPLEX_GRID([[0.01],[0.01],[0.15]]));
	var fixBetaBorder4 = T([0,1,2])([-0.338,0.3,7.4-0.2])(SIMPLEX_GRID([[0.038],[0.038],[0.2]]));

	var fixes = COLOR(borderColor)(STRUCT([fixAlphaBorder1,fixBetaBorder1,fixAlphaBorder2,fixBetaBorder2,fixSpecial2,fixSpecial4,fixSpecial5,fixBetaBorder4]));
	return STRUCT([fixWall,fixes]);
};
/************************************/

/******* function that returns the roof and the dome *******/
/* 	most complicate function, the composition and aspect of 
	dome levels is handled with several parameters allowing 
	for easy modeling and fixing            			   */

var getRoof = function(){
	var domain1 = DOMAIN([[0,1],[0,2*PI/8]])([5,10]);
	var domain2 = DOMAIN([[0,1],[0,1]])([1,1]);

	var part1c1 = BEZIER(S0)([[-6-0.8,6.8,7.2],[0,6.8,7.2]]);
	var part1c1_1 = BEZIER(S0)([[-6-0.6,6.6,7.2],[0,6.6,7.2]]);
	var part1c2 = BEZIER(S0)([[-2.26,6.3-(2.8575*1.414),7.2+2],[0,3.2,7.2+1.55]]);

	var part1 = COLOR(roofColor)(MAP(BEZIER(S1)([part1c1,part1c2]))(domain2));
	var part1_1 = COLOR(roofColor)(MAP(BEZIER(S1)([part1c1,part1c1_1]))(domain2));


	var d = 3.75;

	var c0 = BEZIER(S0)([[d-0.05,0,7.2+0.55],[d-0.05,0,7.1+2]]);
	var c0_1 = BEZIER(S0)([[d,0,7.1+2],[d-0.05,0,7.2+2]]);
	var l0 = R([0,1])(PI/2)(COLOR(columnCapitalColor)(MAP(ROTATIONAL_SURFACE(c0))(domain1)));
	var l0_1 = R([0,1])(PI/2)(COLOR(borderColor)(MAP(ROTATIONAL_SURFACE(c0_1))(domain1)));

	var h = 0;
	var c1 = BEZIER(S0)([[d,0,0],[d,0,0.25]]);
	var c2 = BEZIER(S0)([[d+0.1,0,0.25],[d,0,0.25]]);
	var c3 = BEZIER(S0)([[d+0.1,0,0.25],[d-0.5,0,0.6]]);

	var p1 = COLOR(borderColor)(MAP(ROTATIONAL_SURFACE(c1))(domain1));
	var p2 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c2))(domain1));
	var p3 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c3))(domain1));

	var l1 = STRUCT([p1,p2,p3]);

	d = d-0.5;
	var x = 0.45; //x dimension of further levels
	h = 0.6;

	c1 = BEZIER(S0)([[d,0,0],[d,0,0.25/3]]);
	c2 = BEZIER(S0)([[d+0.1/2,0,0.25/3],[d,0,0.25/3]]);
	c3 = BEZIER(S0)([[d+0.1/2,0,0.25/3],[d-x,0,0.28]]);

	p1 = COLOR(borderColor)(MAP(ROTATIONAL_SURFACE(c1))(domain1));
	p2 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c2))(domain1));
	p3 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c3))(domain1));

	var l2 = T([2])([h])(STRUCT([p1,p2,p3]));

	var z = 0.2; //z dimension of further levels
	var z2 = z/3;
	var a = 0.9; //multiplier factor of x value
	var b = 0.9; //multiplier factor of z2 value
	var c = 1.9; //multiplier factor of z value

	d = d-x;
	h = h+0.28;
	z = z*c
	z2 = z2*b;

	c1 = BEZIER(S0)([[d,0,0],[d,0,0.25/3]]);
	c2 = BEZIER(S0)([[d+0.1/2,0,0.25/3],[d,0,0.25/3]]);
	c3 = BEZIER(S0)([[d+0.1/2,0,0.25/3],[d-x,0,z]]);

	p1 = COLOR(borderColor)(MAP(ROTATIONAL_SURFACE(c1))(domain1));
	p2 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c2))(domain1));
	p3 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c3))(domain1));

	var l3 = T([2])([h])(STRUCT([p1,p2,p3]));

	d = d-x;
	h = h+z;
	x = x*a;
	c = 0.8;
	z = z*c;
	z2 = z2*b;

	c1 = BEZIER(S0)([[d,0,0],[d,0,z2]]);
	c2 = BEZIER(S0)([[d+0.1/2,0,z2],[d,0,z2]]);
	c3 = BEZIER(S0)([[d+0.1/2,0,z2],[d-x,0,z]]);

	p1 = COLOR(borderColor)(MAP(ROTATIONAL_SURFACE(c1))(domain1));
	p2 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c2))(domain1));
	p3 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c3))(domain1));

	var l4 = T([2])([h])(STRUCT([p1,p2,p3]));

	d = d-x;
	h = h+z;
	x = x*a;
	c = 0.7;
	z = z*c;
	b = 0.6;
	z2 = z2*b;

	c1 = BEZIER(S0)([[d,0,0],[d,0,z2]]);
	c2 = BEZIER(S0)([[d+0.1/2,0,z2],[d,0,z2]]);
	c3 = BEZIER(S0)([[d+0.1/2,0,z2],[d-x,0,z]]);

	p1 = COLOR(borderColor)(MAP(ROTATIONAL_SURFACE(c1))(domain1));
	p2 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c2))(domain1));
	p3 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c3))(domain1));

	var l5 = T([2])([h])(STRUCT([p1,p2,p3]));

	d = d-x;
	h = h+z;
	x = x*a;
	z = z*c;

	c1 = BEZIER(S0)([[d,0,0],[d,0,z2]]);
	c2 = BEZIER(S0)([[d+0.1/2,0,z2],[d,0,z2]]);
	c3 = BEZIER(S0)([[d+0.1/2,0,z2],[d-x,0,z]]);

	p1 = COLOR(borderColor)(MAP(ROTATIONAL_SURFACE(c1))(domain1));
	p2 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c2))(domain1));
	p3 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c3))(domain1));

	var l6 = T([2])([h])(STRUCT([p1,p2,p3]));

	d = d-x;
	h = h+z;
	x = x*a;
	c = 0.7;
	z = z*c;
	z2 = z2*b;

	c1 = BEZIER(S0)([[d,0,0],[d,0,z2]]);
	c2 = BEZIER(S0)([[d+0.1/2,0,z2],[d,0,z2]]);
	c3 = BEZIER(S0)([[d+0.1/2,0,z2],[d-x,0,z]]);

	p1 = COLOR(borderColor)(MAP(ROTATIONAL_SURFACE(c1))(domain1));
	p2 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c2))(domain1));
	p3 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c3))(domain1));

	var l7 = T([2])([h])(STRUCT([p1,p2,p3]));

	d = d-x;
	h = h+z;
	x = x*a;

	c1 = BEZIER(S0)([[d,0,0],[d,0,z2]]);
	c2 = BEZIER(S0)([[d+0.1/2,0,z2],[d,0,z2]]);
	c3 = BEZIER(S0)([[d+0.1/2,0,z2],[d-x,0,z]]);

	p1 = COLOR(borderColor)(MAP(ROTATIONAL_SURFACE(c1))(domain1));
	p2 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c2))(domain1));
	p3 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c3))(domain1));

	var l8 = T([2])([h])(STRUCT([p1,p2,p3]));

	d = d-x;
	h = h+z;
	z2 = 0.075;
	z = z2 + 0.275;
	x = 0.35;

	c1 = BEZIER(S0)([[d,0,0],[d,0,z2-0.025]]);
	c2 = BEZIER(S0)([[d+0.1/2,0,z2],[d,0,z2-0.025]]);
	c4 = BEZIER(S0)([[d+0.1/2,0,z2],[d-0.1,0,z2]]);
	c3 = BEZIER(S0)([[d-0.1,0,z2],[d-x,0,z]]);

	p1 = COLOR(borderColor)(MAP(ROTATIONAL_SURFACE(c1))(domain1));
	p2 = COLOR(borderColor)(MAP(ROTATIONAL_SURFACE(c2))(domain1));
	p3 = COLOR(borderColor)(MAP(ROTATIONAL_SURFACE(c3))(domain1));
	var p4 = COLOR(borderColor)(MAP(ROTATIONAL_SURFACE(c4))(domain1));

	var l9 = T([2])([h])(STRUCT([p1,p2,p3,p4]));

	h = h+z;
	d = d-x;
	z2 = 0.05;
	z = z2 + 0.15;
	x = d;

	c1 = BEZIER(S0)([[d,0,0],[d,0,z2-0.025]]);
	c2 = BEZIER(S0)([[d+0.025,0,z2],[d,0,z2-0.025]]);
	c3 = BEZIER(S0)([[d+0.025,0,z2],[d-x,0,z]]);

	p1 = COLOR(borderColor)(MAP(ROTATIONAL_SURFACE(c1))(domain1));
	p2 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c2))(domain1));
	p3 = COLOR(roofColor)(MAP(ROTATIONAL_SURFACE(c3))(domain1));

	var l10 = T([2])([h])(STRUCT([p1,p2,p3]));

	h = h+z;

	c1 = BEZIER(S0)([[0,0,0],[0.15,0,0.15],[0,0,0.3]]);

	var l11 = T([2])([h-0.05])(COLOR(doorBorderColor)(MAP(ROTATIONAL_SURFACE(c1))(domain1)));

	var dome = T([2])([9.05])(R([0,1])(PI/2)(STRUCT([l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11])));


	var s1 = COLOR(columnCapitalColor)(SIMPLEX_GRID([[0.3],[0.15],[0.475]]));
	var s2 = T([0,1,2])([-0.025,-0.025,0.475])(SIMPLEX_GRID([[0.35],[0.2],[0.025]]));
	var s3 = T([2])([0.1])(s2);
	var s4 = T([2])([0.5])(SIMPLEX_GRID([[0.05],[0.05],[0.075]]));
	var s5 = T([0])([0.25])(s4);
	var s6 = T([0,1])([0.25,0.1])(s4);
	var s7 = T([1])([0.1])(s4);

	var chimney = COLOR(roofColor)(STRUCT([s2,s3,s4,s5,s6,s7]));
	chimney = T([0,1,2])([-3.55,6.4,7.2])(S([0,1,2])([1.2,1.2,1.1])(STRUCT([s1,chimney])));

	var roof = STRUCT([dome,part1,part1_1,l0,l0_1,chimney]);
	return roof;
};
/************************************/

/******* function that puts everything togheter *******/

/* 	every function returns only a 1/8 of the model,
	the other 7/8 is obtained with rotation and turnover */

var getFacades = function(){
	var column1 = T([0,1,2])([3,2.7,1.8])(getColumn());
	var column2 = T([0])([1.2])(column1);
	var column3 = T([0])([1.2*2])(column1);
	var columns = STRUCT([column1, column2, column3]);

	var surface1 = T([0])([3])(getSurface1());
	var surface2 = getSurface2();
	var surface3 = T([0,2])([3+0.3,1.8])(getSurface3());
	var steps = T([0])([3+0.3])(getSteps());
	var externalRoof = T([0,1,2])([2.95,0.3,5.8])(getExternalRoof());
	var borders = getBorders();
	var fixes = getFixes();
	var roof = T([0,1,2])([6.3,-6.3,0.2])(getRoof());

	var facadePart1 = STRUCT([surface1,surface2,surface3,steps, externalRoof, columns, borders,roof]);
	var facadePart2 = T([0])([12+0.6])(S([0])([-1])(facadePart1));
	facadePart1 = STRUCT([facadePart1,fixes]);

	var alpha = PI/2;
	var facade1 = T([0,1])([-6.3,6.3])(STRUCT([facadePart1,facadePart2]));
	var facade2 = R([0,1])(alpha)(facade1);
	var facade3 = R([0,1])(2*alpha)(facade1);
	var facade4 = R([0,1])(3*alpha)(facade1);

	return STRUCT([facade1,facade2,facade3,facade4]);
};
/************************************/

/******* function returns villa's exteriors like the garden *******/
var getExteriors = function(){
	var d = 16;
	var s1 = T([1])([12.6])(COLOR(grassColor)(SIMPLEX_GRID([[3.3+0.075],[d-12.6],[0]])));
	var s2 = T([1])([3.3+0.075])(R([0,1])(-PI/2)(s1));
	var s3 = T([0,1])([3.375,6.6])(COLOR(columnCapitalColor)(SIMPLEX_GRID([[1.5],[d-6.6],[0.05]])));
	var s4 = T([1])([3.375*2+1.5])(R([0,1])(-PI/2)(s3));
	var s5 = T([0,1])([3.375+1.5,6.6])(COLOR(columnCapitalColor)(SIMPLEX_GRID([[3.225],[1.5],[0.05]])));
	var s6 = T([0,1])([6.6,3.375+1.5])(COLOR(columnCapitalColor)(SIMPLEX_GRID([[1.5],[3.225/2+0.115],[0.05]])));
	var s7 = T([0,1])([3.375+1.5,6.6+1.5])(COLOR(grassColor)(SIMPLEX_GRID([[3.225],[d-8.1],[0]])));
	var s8 = T([0,1])([3.375+1.5+3.225,3.375+1.5])(COLOR(grassColor)(SIMPLEX_GRID([[d-3.375-1.5-3.225],[d-3.375-1.5],[0]])));

	var base = T([0,1,2])([-d,-d,-0.205])(COLOR(columnCapitalColor)(SIMPLEX_GRID([[2*d],[2*d],[0.2]])));
	var exteriorsPart1 = STRUCT([s1,s2,s3,s4,s5,s6,s7,s8]);
	var exteriorsPart2 = R([0,1])(PI/2)(exteriorsPart1);
	var exteriorsPart3 = R([0,1])(PI/2)(exteriorsPart2);
	var exteriorsPart4 = R([0,1])(PI/2)(exteriorsPart3);
	return STRUCT([base,exteriorsPart1,exteriorsPart2,exteriorsPart3,exteriorsPart4]);	
};
/************************************/

/******* returns the internal perimeter *******/
var getInteriors = function(){
	var alpha = PI/2.475;
	var domain = DOMAIN([[0,1],[0,alpha]])([1,10]);
	var domain2 = DOMAIN([[0,1],[0,PI/2]])([10,10]);

	var floor = T([2])([-0.15])(SIMPLEX_GRID([[6.3],[6.3],[0.15]]));

	var s1 = T([0,1])([0.5,6.3-0.7875])(SIMPLEX_GRID([[0.15],[0.7875],[1.8]]));
	var s2 = T([0,1])([0.5,6.3-(0.7875*4)])(SIMPLEX_GRID([[0.15],[0.7875*2],[1.8]]));
	var s3 = T([0])([2.5])(s1);
	var s4 = T([0,1])([3,0.5])(SIMPLEX_GRID([[0.15],[4.225],[1.8]]));
	var s5 = T([0,1])([0.5+0.15,3.15])(SIMPLEX_GRID([[3-(0.5+0.15)],[0.15],[6.1-1.8-0.15]]));
	var s6 = T([0,1])([3+0.15,0.5+0.7875])(SIMPLEX_GRID([[0.7875],[0.15],[1.8]]));
	var s7 = T([0,1])([3+0.15+0.7875*2,0.5+0.7875])(SIMPLEX_GRID([[0.7875*2],[0.15],[1.8]]));
	var s8 = T([0,1,2])([0.5,6.3-0.7875*4,1.8])(SIMPLEX_GRID([[0.15],[0.7875*4],[6.1-1.8-0.15-1.8]]));
	var s9 = T([0,1,2])([3+0.15,0.5+0.7875,1.8])(SIMPLEX_GRID([[0.7875*4],[0.15],[6.1-1.8-0.15-1.8]]));
	var s10 = T([0,1,2])([3,0.5,1.8])(SIMPLEX_GRID([[0.15],[4.225+0.7875*2],[6.1-1.8-0.15-1.8]]));
	var floor1 = T([2])([1.8])(STRUCT([floor,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10]));

	var floorPart1 = T([1])([6.3-(0.7875*4)])(SIMPLEX_GRID([[3.15],[3.15],[0.15]]));
	var floorPart2 = T([0])([3])(SIMPLEX_GRID([[3.3],[6.3],[0.15]]));
	floor = T([2])([-0.15])(STRUCT([floorPart1,floorPart2]));

	s5 = T([0,1])([0.5+0.15,3.15])(SIMPLEX_GRID([[3-(0.5+0.15)],[0.15],[1.8]]));
	var s11 = T([0,1])([0.4,6.35])(SIMPLEX_GRID([[3-0.4],[0.3],[1.8]]));
	var s12 = T([0,1])([6.35,0.4])(SIMPLEX_GRID([[0.3],[3-0.4],[1.8]]));
	var floor0 = STRUCT([s1,s2,s3,s4,s5,s6,s7,s11,s12]);

	s1 = T([0,1])([0.5,6.3-0.7875])(SIMPLEX_GRID([[0.15],[0.7875],[1.4]]));
	s2 = T([0,1])([0.5,6.3-(0.7875*4)])(SIMPLEX_GRID([[0.15],[0.7875*2],[1.4]]));
	s3 = T([0])([2.5])(s1);
	s4 = T([0,1])([3,0.5])(SIMPLEX_GRID([[0.15],[4.225],[1.4]]));
	s5 = T([0,1])([0.5+0.15,3.15])(SIMPLEX_GRID([[3-(0.5+0.15)],[0.15],[1.4]]));
	s6 = T([0,1])([3+0.15,0.5+0.7875])(SIMPLEX_GRID([[0.7875],[0.15],[1.4]]));
	s7 = T([0,1])([3+0.15+0.7875*2,0.5+0.7875])(SIMPLEX_GRID([[0.7875*2],[0.15],[1.4]]));
	s8 = T([1])([3.15])(SIMPLEX_GRID([[0.5],[0.01],[1.4]]));
	s9 = T([0])([3])(SIMPLEX_GRID([[0.01],[0.5],[1.4]]));
	var floor2 = T([2])([6])(STRUCT([floor,s1,s2,s3,s4,s5,s6,s7,s8,s9]));

	var roof = T([2])([7.55])(floor);

	var c1 = BEZIER(S0)([[3.025,0,0],[3.025,0,7.4]]);
	var p1 = T([1])([0.175])(R([0,1])([(PI/2-alpha)/2.3])(MAP(ROTATIONAL_SURFACE(c1))(domain)));
	c1 = BEZIER(S0)([[0,0,11],[3.025+0.15,0,11],[3.025+0.15,0,7.3]]);
	var p2 = MAP(ROTATIONAL_SURFACE(c1))(domain2);

	var interiorsPart1 = STRUCT([roof,floor0,floor1,floor2,p1,p2]);
	var interiorsPart2 = R([0,1])(PI)(interiorsPart1);
	var interiorsPart3 = S([0])([-1])(interiorsPart1);
	var interiorsPart4 = S([0])([-1])(interiorsPart2);
	return COLOR(wallColor)(STRUCT([interiorsPart1,interiorsPart2,interiorsPart3,interiorsPart4]));
};
/************************************/

/**************************************************************/
/**************** Villa Capra "La Rotonda" ********************/
/**************************************************************/
var model = STRUCT([getFacades(),getExteriors(),getInteriors()]);
DRAW(model);