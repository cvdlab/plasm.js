//improve domains intervals for a better quality

var domain1D = DOMAIN([[0, 1]])([16]);
var domain2D = DOMAIN([[0, 1],[0, 1]])([16, 16]);
var detailed_domain2D = DOMAIN([[0, 1], [0, 1]])([32, 32]);
var domcir0 = PROD1x1([INTERVALS(2*PI)(30), INTERVALS(1)(12)]);

var CYLINDER = function(r,h){
  function C0(l){
  var s = CYL_SURFACE([r,h])(l);
  var b1 = DISK(r)(l);
  var b2 = T([2])([h])(b1);
  return STRUCT([s,b1,b2]);
  }
  return C0;
}

//2-curves bezier surface

var bs2 = function(l){
	var p1 = l[0];
	var p2 = l[1];
	var c1 = BEZIER(S0)(p1);
	var c2 = BEZIER(S0)(p2);
	//DRAW(STRUCT([MAP(c1)(domain1D),MAP(c2)(domain1D),MAP(c3)(domain1D)]));
	return MAP(BEZIER(S1)([c1, c2]))(domain2D);
}

var Circum = function(h, r){
	var Circum0 = function(v){
		return [r*COS(v[0]), r*SIN(v[0]), h];
	}
	return Circum0;
}

//generateNUBS() support function
var generateKnots = function(controlPoints){
	lun = controlPoints.length + 2 + 1;
	var nodeSeq = [];
	nodeSeq[0] = 0;
	nodeSeq[1] = 0;
	nodeSeq[2] = 0;
	for (i = 3; i <= lun - 4 ; i++) {
		nodeSeq[i] = i-2;
	};
	nodeSeq[lun-1] = i-2;
	nodeSeq[lun-2] = i-2;
	nodeSeq[lun-3] = i-2;
	return nodeSeq;
}

//the function create an array tha contains a mapped curve, defined by nubs
//curve = [0], nubs = [1]
var generateNUBS = function(controlPoints){
	var domain = INTERVALS(1)(50);
	var knots = generateKnots(controlPoints);
	var nubs = NUBS(S0)(2)(knots)(controlPoints);
	var curve = MAP(nubs)(domain);
	return [curve, nubs];
}

var height = 2.85; //ipod height


var BLACK = [25/255, 25/255, 25/255];
var LIGHTGRAY = [150/225, 150/225, 150/225];
var CYAN = [21/255, 189/255, 255/255];
var GREEN = [0/255, 192/255, 77/255];
var WHITE = [255/255, 255/255, 255/255];
var YELLOW = [219/255, 233/255, 29/255];
var LIGHTRED = [255/255, 92/255, 106/255];
var LILLA = [208/255, 153/255, 193/255];
var DARKGRAY = [50/255, 50/255, 50/255];

//body surfaces

var points00 = [[1.87, 3.35, 0], [1.45, 3.35, 0], [1.45, 3.77, 0], [1.87, 3.77, 0]];
var points01 = [[4.15, 3.35, 0], [4.57, 3.35, 0], [4.57, 3.77, 0], [4.15, 3.77, 0]];

var lower_base = bs2([points00, points01]);

var points02 = [[1.87, 3.35, height], [1.45, 3.35, height], [1.45, 3.77, height], [1.87, 3.77, height]];
var side_surface00 = bs2([points00, points02]);

var points03 = [[4.15, 3.35, height], [4.57, 3.35, height], [4.57, 3.77, height], [4.15, 3.77, height]];
var side_surface01 = bs2([points01, points03]);

var points04 = [[1.87, 3.35, 0],[1.87, 3.35, height]];
var points05 = [[4.15, 3.35, 0],[4.15, 3.35, height]];
var side_surface02 = bs2([points04, points05]);

var points06 = [[1.87, 3.77, 0],[1.87, 3.77, height]];
var points07 = [[4.15, 3.77, 0],[4.15, 3.77, height]];
var side_surface03 = bs2([points06, points07]);

var surfaces = STRUCT([lower_base, side_surface00, side_surface01, side_surface02, side_surface03]);

//play-stop buttons

var circum00 = Circum(0, 1.19);
var circum01 = Circum(0.15, 0.89); //-0.3
var circum02 = Circum(-0.1, 0.54); //-0.4

var play_buttons = MAP(BEZIER(S1)([circum00, circum01, circum02]))(domcir0);
var placed_pbtns = T([0, 1, 2])([(4.15+1.87)/2, 3.35, height/2])(R([1, 2])([PI/2])(play_buttons));

//prints

var points14 = [[0, 0], [0.4, 0.2], [0, 0.4], [0.5, 0], [0.6, 0], [0.5, 0.4], [0.6, 0.4], [0.7, 0], [0.8, 0], [0.7, 0.4], [0.8, 0.4]];
var play_pause = COLOR(LIGHTGRAY)(SIMPLICIAL_COMPLEX(points14)([[0, 1, 2], [3, 4, 5], [4, 5, 6], [7, 8, 9], [8, 9, 10]]));
var placed_play_pause = T([0, 1, 2])([(1.87+4.15)/2-0.2, 3.35-0.01, height/2-0.1])(R([1, 2])([PI/2])(S([0, 1])([0.5, 0.5])(play_pause)));

var points15 = [[0.16, 0], [0.24, 0], [0.24, 0.16], [0.4, 0.16], [0.4, 0.24], [0.24, 0.24], [0.24, 0.4], [0.16, 0.4], [0.16, 0.24], [0, 0.24], [0, 0.16], [0.16, 0.16]];
var plus = COLOR(LIGHTGRAY)(SIMPLICIAL_COMPLEX(points15)([[0, 1, 2], [2, 3, 4], [2, 4, 5], [8, 5, 6], [8, 6, 7], [9, 10, 8], [10, 11, 8], [11, 5, 8], [11, 2, 5], [11, 2, 0]]));
var placed_plus = T([0, 1, 2])([(1.87+4.15)/2-0.1, 3.35-0.0565, height-0.6])(R([1, 2])([PI/2])(S([0, 1])([0.5, 0.5])(plus)));

var points16 = [[0.4, 0.16], [0.4, 0.24], [0, 0.24], [0, 0.16]];
var minus = COLOR(LIGHTGRAY)(SIMPLICIAL_COMPLEX(points16)([[0, 1, 2], [0, 2, 3]]));
var placed_minus = T([0, 1, 2])([(1.87+4.15)/2-0.1, 3.35-0.0565, height/2-1.04])(R([1, 2])([PI/2])(S([0, 1])([0.5, 0.5])(minus)));

var points17 = [[0, 0], [0.24, 0.2], [0.24, 0], [0.48, 0.2], [0.48, 0], [0.56, 0], [0.56, 0.4], [0.48, 0.4], [0.24, 0.4], [0, 0.4]];
var forward = COLOR(LIGHTGRAY)(SIMPLICIAL_COMPLEX(points17)([[0, 1, 9], [2, 3, 8], [4, 5, 6], [4, 6, 7]]));
var placed_forward = T([0, 1, 2])([(1.87+4.15)/2+1-0.2, 3.35-0.0565, height/2-0.1])(R([1, 2])([PI/2])(S([0, 1])([0.5, 0.35])(forward)));

var backward = R([0, 2])([PI])(forward);
var placed_backward = T([0, 1, 2])([(1.87+4.15)/2-1+0.2, 3.35-0.0565, height/2-0.1])(R([1, 2])([PI/2])(S([0, 1])([0.5, 0.35])(backward)));

var prints = STRUCT([placed_play_pause, placed_plus, placed_minus, placed_forward, placed_backward]);

//back

//back pivot

var points08 = [[2.52, 0, 0.31], [2.52, 0.2, 0.31], [2.06, 0.2, 0.31], [2.06, 0, 0.31]];
var points09 = [[2.52, 0, 2.54], [2.52, 0.2, 2.54], [2.06, 0.2, 2.54], [2.06, 0, 2.54]];

var points10 = [[2.52, 0, 0.31], [2.06, 0, 0.31]];
var points11 = [[2.52, 0, 2.54], [2.06, 0, 2.54]];

var pivot0 = bs2([points08, points09]);
var pivot1 = bs2([points08, points10]);
var pivot2 = bs2([points09, points11]);
var pivot3 = COLOR(LIGHTGRAY)(T([0, 1, 2])([2.2, 3.77, 0.22])(CUBOID([0.2, 0.1, 2.2])));
var pivot4 = T([0, 2])([3.795, 0.325])(CUBOID([0.2, 0.18, 2.2])); //TODO restyle

var pivot = STRUCT([pivot0, pivot1, pivot2, pivot4]);

//back_square

var points12 = [[1.87, 0, 2.54], [1.87, 0, 2.695], [2.025, 0, 2.695],
	[3.995, 0, 2.695], [4.15, 0, 2.695], [4.15, 0, 2.54],
	[4.15, 0, 0.31], [4.15, 0, 0.155], [3.995, 0, 0.155],
	[2.025, 0, 0.155], [1.87, 0, 0.155], [1.87, 0, 0.31], [1.87, 0, 2.54]];
var bsnub00 = generateNUBS(points12)[1];
var back_center_point0 = [(4.15+1.87)/2, 0, height/2];
var backsquaresurf0 = MAP(BEZIER(S1)([bsnub00, back_center_point0]))(detailed_domain2D);

var points13 = [[1.87, -0.1, 2.54], [1.87, -0.1, 2.695], [2.025, -0.1, 2.695],
	[3.995, -0.1, 2.695], [4.15, -0.1, 2.695], [4.15, -0.1, 2.54],
	[4.15, -0.1, 0.31], [4.15, -0.1, 0.155], [3.995, -0.1, 0.155],
	[2.025, -0.1, 0.155], [1.87, -0.1, 0.155], [1.87, -0.1, 0.31], [1.87, -0.1, 2.54]];

var bsnub01 = generateNUBS(points13)[1];
var back_center_point1 = [(4.15+1.87)/2, -0.1, height/2];
var backsquaresurf1 = MAP(BEZIER(S1)([bsnub01, back_center_point1]))(detailed_domain2D);

var backsquaresurf2 = MAP(BEZIER(S1)([bsnub00, bsnub01]))(detailed_domain2D);

var backsquare_surface = STRUCT([backsquaresurf0, backsquaresurf1, backsquaresurf2]);

var back = STRUCT([T([1, 2])([3.77+0.2, 2.75]), R([0, 1])([-PI]), R([0,2])(PI), pivot, backsquare_surface]);

//upper surface + buttons

//left hole (jack)

var points18 = [[1.87, 3.4, 0], [1.55, 3.4, 0], [1.55, 3.72, 0], [1.87, 3.72, 0]];
var uppersurf0 = bs2([points00, points18]);

var points19 = [[1.73, 3.4, 0], [2, 3.4, 0], [2, 3.72, 0], [1.73, 3.72, 0]];
var uppersurf1 = bs2([[[2.1, 3.35, 0], [2.1, 3.77, 0]], points19]);

var uppersurf2 = SIMPLICIAL_COMPLEX([[1.87, 3.35, 0], [1.87, 3.43, 0], [2.1, 3.35, 0], [1.87, 3.77, 0], [1.87, 3.69, 0], [2.1, 3.77, 0]])([[0, 1, 2],[3, 4, 5]]);
	
//right hole (on/off button)

var points20 = [[4.15, 3.4, 0], [4.47, 3.4, 0], [4.47, 3.72, 0], [4.15, 3.72, 0]];
var uppersurf3 = bs2([points01, points20]);

var points21 = [[4.15, 3.4, 0], [3.83, 3.4, 0], [3.83, 3.72, 0], [4.15, 3.72, 0]];
var uppersurf4 = bs2([[[3.83, 3.35, 0], [3.83, 3.77, 0]], points21]);

var uppersurf5 = SIMPLICIAL_COMPLEX([[3.83, 3.35, 0], [4.15, 3.4, 0], [4.15, 3.35, 0], [3.83, 3.77, 0], [4.15, 3.72, 0], [4.15, 3.77, 0]])([[0, 1, 2],[3, 4, 5]]);
var uppersurf6 = SIMPLICIAL_COMPLEX([[3.83, 3.35, 0], [3.83, 3.77, 0], [2.1, 3.35, 0], [2.1, 3.77, 0]])([[0, 1, 2], [1, 2, 3]]);

var uppersurface = STRUCT([T([2])([height]), uppersurf0, uppersurf1, uppersurf2, uppersurf3, uppersurf4, uppersurf5, uppersurf6]);

//jack hole

var circum03 = Circum(0.2, 0.15);
var circum04 = Circum(0.2, 0.14);

var cyl0 = CYL_SURFACE([0.15, 0.2])([16, 1]);
var cyl1 = CYL_SURFACE([0.14, 0.2])([16, 1]);

var jdisk0 = MAP(BEZIER(S1)([circum03, circum04]))(domcir0);
var jdisk1 = DISK(0.15)([16,1]);

var jack = STRUCT([T([0, 1, 2])([1.87-0.09, 3.56, height-0.19]), COLOR(WHITE), cyl0, cyl1, jdisk0, jdisk1]);

//on.off button

var cyl2 = T([0, 1])([4.15-0.1, 3.56])(CYLINDER(0.13, 0.13)([24, 1]));

var ofdisk = bs2([points20, points21]);
var cyl3 = MAP(CYLINDRICAL_SURFACE(BEZIER(S0)(points20))([0, 0, 0.1]))(domain2D);
var cyl4 = MAP(CYLINDRICAL_SURFACE(BEZIER(S0)(points21))([0, 0, 0.1]))(domain2D);

var ofbutton = STRUCT([T([2])([height-0.1]), cyl2, COLOR([135/255, 255/255, 35/255]), cyl3, cyl4, ofdisk]);

//voiceover button

var voiceover = T([0, 1, 2])([3.5, 3.56, height-0.1])(CYLINDER(0.13, 0.13)([24, 1]));

//battery led

var led = COLOR([255/255, 81/255, 0/255])(T([0, 1, 2])([2.25, 3.56, height+0.01])(DISK(0.02)([8, 1])));

var upper_holes = STRUCT([jack, ofbutton, voiceover, led]);

//apple logo

var points22 = [[4.88, 3.21, 0], [4.75, 3.24, 0], [4.67, 3.46, 0], [4.85, 3.55, 0]];
var points23 = [[4.52, 3.61, 0], [4.72, 3.72, 0], [4.76, 3.65, 0], [4.85, 3.55, 0]];
var apple00 = bs2([points22, [[4.48, 3.37, 0]]]);
var apple03 = bs2([points23, [[4.48, 3.37, 0]]]);
var points24 = [[4.52, 3.61, 0], [4.33, 3.7, 0], [4.08, 3.67, 0], [4.13, 3.29, 0]];
var points25 = [[4.48, 2.98, 0], [4.31, 2.92, 0], [4.24, 2.93, 0], [4.13, 3.29, 0]];
var apple01 = bs2([points24, points25]);
var points26 = [[4.48, 2.98, 0], [4.62, 3.05, 0], [4.67, 2.78, 0], [4.88, 3.21, 0]];
var apple02 = bs2([points26, [[4.48, 3.37, 0]]]);
var points27 = [[4.49, 3.67], [4.59, 3.69], [4.66, 3.75], [4.68, 3.88]];
var points28 = [[4.49, 3.67], [4.52, 3.8], [4.58, 3.85], [4.68, 3.88]];
var apple04 = bs2([points27, points28]);

var apple = STRUCT([T([0, 1, 2])([7.5, 3.7+0.4, -1.85]), R([1, 2])([PI/2]), R([0, 2])([PI]), COLOR(WHITE), apple00, apple01, apple02, apple03, apple04]);

var ipod0 = function (color1, color2) {
	if (color2[0]<=150/255 && color2[1]<=150/255 && color2[1]<=150/255)
		return STRUCT([R([0, 1])([-PI/4]), COLOR(color2)(placed_pbtns), COLOR(WHITE)(prints), upper_holes, pivot3, apple, COLOR(color1), back, surfaces, uppersurface]);
	else return STRUCT([R([0, 1])([-PI/4]), COLOR(color2)(placed_pbtns), prints, upper_holes, pivot3, apple, COLOR(color1), back, surfaces, uppersurface]);
}

var ipod1 = ipod0(CYAN, WHITE);
var ipod2 = ipod0(GREEN, WHITE);
var ipod3 = ipod0(YELLOW, WHITE);
var ipod4 = ipod0(LIGHTRED, WHITE);
var ipod5 = ipod0(LIGHTGRAY, BLACK);
var ipod6 = ipod0(DARKGRAY, BLACK);

var model = STRUCT([T([0])([-3]), ipod1, T([0])([2]), ipod2, T([0])([2]), ipod3, 
	T([0])([2]), ipod4, T([0])([2]), ipod5, T([0])([2]), ipod6]);

