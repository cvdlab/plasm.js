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
//Showcase - Code.js - Federico Violante - 281308

//****FUNZIONI DI SUPPORTO****//

//scala tutte le dims del valore scale
Sk = function(scale) {
	return function (object) {
		return object.clone().scale([0,1,2], [scale,scale,scale]);
	};
};

//colori in RGB da 1 a 255
COLOR255 = function(args){
	return COLOR([args[0]/255.0, args[1]/255.0, args[2]/255.0, args[3]]);
};

//sfera
var SPHERE = function (arg){
	var a = arg[0];
	var b = arg[1];
	var u = SIN(a) * COS(b);
	var v = SIN(a) * SIN(b);
	var w = COS(a);
	return [u,v,w];
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

//settori dei domini 
var sect = 36;
var framesect = 12;
var doorsect = 36;

//Colori
var BLACK = [0,0,0,1];
var WHITE = [2,2,2,1];

//****MODELLO****//

//Scena

universe = function(){
	var universeDom = DOMAIN([[0,PI],[0,2*PI]])([3,4]);
	var universe = Sk(10000)(MAP(SPHERE)(universeDom));
	return COLOR(BLACK)(universe);
};
//DRAW(universe());

earth = function(){
	var earthDom = DOMAIN([[0,PI/2.0],[0,2*PI]])([72,172]);
	var earth = T([2])([-12000])(Sk(10000)(MAP(SPHERE)(earthDom)));
	return COLOR255([10,110,200,1])(earth);
};
//DRAW(earth());

atmosphere = function(){
	var atmosphereDom = DOMAIN([[0,PI/2.0],[0,2*PI]])([72,172]);
	var atmosphere = T([2])([-12000])(Sk(11000)(MAP(SPHERE)(atmosphereDom)));
	return COLOR255([200, 240, 255,0.65])(atmosphere);
};
//DRAW(atmosphere());


//****Bubbleship****//

tetrahedralCore = function(){

	var p1 = [1,0,0];
	var p2 = [2.5,0,SQRT(2.5)];
	var p3 = [-0.5,0,SQRT(2.5)];
	var p4 = [1,SQRT(3),SQRT(2.5)];

	var core_faceX =  TRIANGLE_DOMAIN(1, [p1, p2, p3]);
	var core_faceYL = TRIANGLE_DOMAIN(1, [p1, p4, p2]);
	var core_faceYR = TRIANGLE_DOMAIN(1, [p1, p4, p3]);
	var core_faceZ =  TRIANGLE_DOMAIN(1, [p2 ,p4, p3]);
	var core = T([1])([0.75])(STRUCT([core_faceX, core_faceYL, core_faceYR, core_faceZ]));
	return COLOR(WHITE)(core);
};
//DRAW(tetrahedralCore());

cockpit = function(){

	//Glass
	var cockpitBubbleDom = DOMAIN([[0,3*PI/4.0],[0,2*PI]])([sect,2*sect]);
	var cockpitBubble = MAP(SPHERE)(cockpitBubbleDom);

	var cockpitDoorDom = DOMAIN([[3*PI/4.0,PI],[0,2*PI]])([doorsect,sect]);
	var cockpitDoor = T([0,1,2])([-0.3,0,-PI/4.5])(R([0,2])(-PI/4.0)(MAP(SPHERE)(cockpitDoorDom)));

	var cockpitGlass = COLOR255([160,210,255,0.5])(STRUCT([cockpitBubble, cockpitDoor]));

	// //Frame
	var cockpitDoorFrameDom = DOMAIN([[3*PI/4.0,(3*PI+0.4)/4.0],[0,2*PI]])([framesect,sect]);
	var cockpitDoorFrame = T([0,1,2])([-0.3,0,-PI/4.5])(R([0,2])(-PI/4.0)(MAP(SPHERE)(cockpitDoorFrameDom)));

	var cockpitClosedDoorFrameDom = DOMAIN([[(PI-0.4)/4.0, PI/4.0],[0,2*PI]])([framesect,sect]);
	var cockpitClosedDoorFrame = MAP(SPHERE)(cockpitClosedDoorFrameDom);

	var cockpitFrames = COLOR([1,1,1,1])(STRUCT([cockpitDoorFrame, cockpitClosedDoorFrame]));

	var IncockpitDoorFrameDom = DOMAIN([[(3*PI-0.1)/4.0,(3*PI+0.5)/4.0],[0,2*PI]])([framesect,sect]);
	var IncockpitDoorFrame = MAP(SPHERE)(IncockpitDoorFrameDom);

	var IncockpitClosedDoorFrameDom = DOMAIN([[(PI-0.5)/4.0, (PI+0.1)/4.0],[0,2*PI]])([framesect,sect]);
	var IncockpitClosedDoorFrame = MAP(SPHERE)(IncockpitClosedDoorFrameDom);

	var IncockpitBackDom = DOMAIN([[3*PI/4.0,PI],[0,2*PI]])([doorsect,sect]);
	var IncockpitBack = R([0,2])(-PI/2.0)(MAP(SPHERE)(IncockpitBackDom));

	var IncockpitFloorDom = DOMAIN([[3*PI/4.0,PI],[0,2*PI]])([doorsect,sect]);
	var IncockpitFloor = R([1,2])(-PI/2.0)(MAP(SPHERE)(IncockpitFloorDom));

	var IncockpitUpDom = DOMAIN([[(PI-0.25)/2.0,(PI+0.25)/2.0],[PI/4,3*PI/4.0]])([framesect,sect]);
	var IncockpitUp = R([0,2])(-PI/2.0)(MAP(SPHERE)(IncockpitUpDom));

	var IncockpitUpBackDom = DOMAIN([[(PI-0.5)/2.0,(PI+0.5)/2.0],[0,PI]])([framesect,sect]);
	var IncockpitUpBack = R([0,1])(-PI/2.0)(MAP(SPHERE)(IncockpitUpBackDom));

	var IncockpitCircleUpDom = DOMAIN([[(PI-0.4),PI],[0,2*PI]])([framesect,sect]);
	var IncockpitCircleUp = R([1,2])(PI/2.0)(MAP(SPHERE)(IncockpitCircleUpDom));

	var IncockpitTop = STRUCT([IncockpitUp, IncockpitUpBack, IncockpitCircleUp]);

	var IncockpitFrames = COLOR(BLACK)(Sk(0.999)(STRUCT([IncockpitDoorFrame, IncockpitClosedDoorFrame, IncockpitBack, IncockpitFloor, IncockpitTop])));

	var allCockpitFrames = STRUCT([cockpitFrames, IncockpitFrames]);

	var cockpitObj = T([0,1,2])([1,-1,1])(R([0,2])(PI/2.0)(R([0,1])(PI/2.0)(STRUCT([cockpitGlass, allCockpitFrames]))));
	//var cockpitObj = T([0,1,2])([1,-1,1])(R([0,2])(PI/2.0)(R([0,1])(PI/2.0)(STRUCT([cockpitGlass]))));

	return cockpitObj;
};
//DRAW(cockpit());

//Neck
neck = function(){
	var neckDom = DOMAIN([[0,1],[0,2*PI]])([sect,2*sect]);
	var neckProfile = BEZIER(S0)([[3,3,0],[3,3,0.2],[3,3,0.2],[3,3,0.2], [1.5,1.5,0.8],[1.5,1.5,0.8], [2,2,2.5],[2,2,2.5], [2,2,3],[2,2,3],[2,2,3],[2,2,3], [3,3,4],[3,3,4],[3,3,4], [3,3,4.5],[3,3,4.5],[3,3,4.5]]);
	var neckMap = ROTATIONAL_SURFACE(neckProfile);
	var neckObj = MAP(neckMap)(neckDom);
	return Sk(1/4.5)(T([0,1,2])([4.5,-1.15,4.5])(R([1,2])(-PI/2.0)(neckObj)));
};
//DRAW(neck());

//Neck cover
neckCover = function(){
	var p1 = [1,0,0];
	var p2 = [2.5,SQRT(2.5),0];
	var p3 = [-0.5,SQRT(2.5),0];

	var out =  TRIANGLE_DOMAIN(1, [p1, p2, [1,0.3,1]]);
	var out2 = TRIANGLE_DOMAIN(1, [p1, p2, [1,SQRT(2.5)+0.04,1]]);
	var out3 = TRIANGLE_DOMAIN(1, [p1, p3, [1,0.3,1]]);
	var out4 =  TRIANGLE_DOMAIN(1, [p1 ,p3, [1,SQRT(2.5)+0.04,1]]);
	var out5 =  TRIANGLE_DOMAIN(1, [p2 ,p3, [1,SQRT(2.5)+0.04,1]]);

	var neckCover = STRUCT([out, out2, out3, out4, out5]);

	return T([1])([0.75])(S([1])([0.5])(R([1,2])(PI/2.0)(neckCover)));
};
//DRAW(neckCover());

//baseBall = function(){
//};
//DRAW(baseBall);

arm = function(){
	var armDom = PROD1x1([INTERVALS(1)(40),INTERVALS(1)(6)]);
	var h = 35;
	var armNcpVector = [0,0,h];
	var armProfile = BEZIER(S0)([[0,0,0],[1,0,0],[1,0,0],[1,0,0],[1,0,0], [3,2,0],[3,2,0],[3,2,0],[3,2,0],[3,2,0],[3,2,0], [1,3,0],[1,3,0],[1,3,0], [0,3,0]]);
	var armHalf = MAP(CYLINDRICAL_SURFACE(armProfile)(armNcpVector))(armDom);
	var armObj = STRUCT([armHalf, T([2])([h])(R([0,2])(PI)(armHalf))]);
	return COLOR(WHITE)(T([0,1,2])([-0.75,0.75,SQRT(2)])(R([1,2])(PI/2.0)(R([0,2])(PI/2.0)(Sk(0.1)(armObj)))));
};
//DRAW(arm());

engines = function(){
	var engineMainDom = DOMAIN([[0.8,2.1],[0,2*PI]])([sect,2*sect]);
	var engineMain = MAP(SPHERE)(engineMainDom);

	var innerEngineDom = DOMAIN([[0,PI],[0,PI]])([2*sect,sect]);
	var innerEngine = T([2])([0.641])(S([0,1,2])([0.6,0.6,0.40])(R([1,2])(PI/2.0)(MAP(SPHERE)(innerEngineDom))));

	var flapDom = DOMAIN([[2.7,PI],[0,PI-0.5]])([framesect,doorsect]);
	var flap =  R([1,2])(-PI/3.3)(R([1,2])(PI)(MAP(SPHERE)(flapDom)) );
	var flaps = STRUCT( REPLICA(6)([R([0,1])([PI/3.0]), flap]));

	var innerDisk = COLOR(BLACK)(T([2])([0.6])(DISK(0.8)([10,1])));
	var innerBlueDisk = COLOR(BLACK)(T([2])([-0.4])(DISK(0.9)([10,1])));

	var centralSeamDom = DOMAIN([[(PI-0.02)/2.0,(PI+0.02)/2.0],[0,2*PI]])([1,sect]);
	var centralSeam =  Sk(1.001)(MAP(SPHERE)(centralSeamDom));

	var exhaustChromeDom = DOMAIN([[2.1,2.2],[0,2*PI]])([1,sect]);
	var exhaustChrome = MAP(SPHERE)(exhaustChromeDom);

	var blueBeamDom = DOMAIN([[2.19,2.5],[0,2*PI]])([6,sect]);
	var blueBeam = COLOR255([30,180,255,0.7])(MAP(SPHERE)(blueBeamDom));
	var blueBeam2Dom = DOMAIN([[1,PI-0.75],[0,2*PI]])([1,sect]);
	var blueBeam2 = T([2])([-0.1])( Sk(0.99)(COLOR255([30,180,255,0.7])(MAP(SPHERE)(blueBeam2Dom))));
	blueBeam = Sk(0.995)(STRUCT([blueBeam, blueBeam2]));

	var exhaustShieldDom = DOMAIN([[2.53,PI],[0,2*PI]])([doorsect,sect]);
	var exhaustShield = MAP(SPHERE)(exhaustShieldDom);

	var exhaustHoleDom = DOMAIN([[PI-0.025,PI],[0,2*PI]])([1,12]);
	var exhaustHole = COLOR(BLACK)(T([2])([-0.001])(R([0,2])([-0.45])(MAP(SPHERE)(exhaustHoleDom))));
	var exhaustHole8 = R([1,2])([0.14])(STRUCT(REPLICA(8)([R([0,2])([0.09]), exhaustHole])));
	var exhaustHole9line = R([1,2])([0.07])(R([0,2])([-0.045])(STRUCT(REPLICA(9)([R([0,2])([0.09]), exhaustHole]))));
	var exhaustHole9 = STRUCT(REPLICA(5)([R([1,2])([0.14]), exhaustHole9line]));
	var exhaustHole10line = R([1,2])([0.14])(R([0,2])([-0.09])(STRUCT(REPLICA(10)([R([0,2])([0.09]), exhaustHole]))));
	var exhaustHole10 = STRUCT(REPLICA(4)([R([1,2])([0.14]), exhaustHole10line]));
	var exhaustHole8b = R([1,2])([0.7])(exhaustHole8);
	var exhaustHoles = R([0,2])([0.045])(R([1,2])([-0.07*7])(STRUCT([exhaustHole8, exhaustHole9, exhaustHole10,  exhaustHole8b])));

	var exhaustFlapDom = DOMAIN([ [2.2,PI-0.75 ], [2,2.5]])([6,6]);
	var exhaustFlap = COLOR([0.5,0.5,0.5,1])(MAP(SPHERE)(exhaustFlapDom));
	var exhaustFlaps = R([0,1])(PI)(STRUCT( REPLICA(12)([R([0,1])([PI/6.0]), exhaustFlap])));

	var exhaustBodyDom = DOMAIN([[0,1],[0,2*PI]])([2*sect,sect]);
	var exhaustBodyProfile = BEZIER(S0)([ [2.8,2.8,0],[2.8,2.8,0],[2.8,2.8,0],   [3,3,0],[3,3,0],[3,3,0],
		[3,3,0.6],[3,3,0.6],[3,3,0.6],[3,3,0.6],[3,3,0.6],[3,3,0.6],
		[3.3,3.3,1.2],[3.3,3.3,1.2],[3.3,3.3,1.2],[3.3,3.3,1.2],[3.3,3.3,1.2],
		[3.3,3.3,2],[3.3,3.3,2],[3.3,3.3,2] ]);
	var exhaustBodyMap = ROTATIONAL_SURFACE(exhaustBodyProfile);
	var exhaustBody = Sk(1/5)(T([2])([-4.1])(MAP(exhaustBodyMap)(exhaustBodyDom) ));

	var whiteEngine = COLOR([1.5,1.5,1.5,1])(STRUCT([engineMain, innerEngine, flaps]));
	var engine1 = T([0,1,2])([-1.75,0.85,1.95])(R([1,2])(PI/2.0)(STRUCT([whiteEngine, innerDisk, innerBlueDisk, centralSeam, exhaustChrome, exhaustHoles, exhaustShield, exhaustBody, exhaustFlaps, blueBeam, exhaustHoles])));

	// var whiteEngine = COLOR([1.5,1.5,1.5,1])(STRUCT([engineMain ]));
	// var engine1 = T([0,1,2])([-1.75,0.85,1.95])(R([1,2])(PI/2.0)(STRUCT([whiteEngine])));
	return Sk(0.8)(STRUCT([engine1, T([0])([6])(engine1)]));
};
//DRAW(engines());

tail = function(){
	var tailDom = PROD1x1([INTERVALS(1)(40),INTERVALS(1)(6)]);
	var h = 28;
	var tailNcpVector = [0,0,h];
	var tailProfile = BEZIER(S0)([[0,-1,0],[0.3,-1,0],[0.3,-1,0],[0.3,-1,0],[0.3,-1,0], [3,2,0],[3,2,0],[3,2,0],[3,2,0],[3,2,0],[3,2,0], [1,3,0],[1,3,0],[1,3,0], [0,3,0]]);
	var tailHalf = MAP(CYLINDRICAL_SURFACE(tailProfile)(tailNcpVector))(tailDom);
	var tailObj = STRUCT([tailHalf, T([2])([h])(R([0,2])(PI)(tailHalf))]);
	return COLOR(WHITE)(T([0,1,2])([1,2,1.4])(R([1,2])(-PI/2.0)(R([0,1])(-PI)(Sk(0.1)(tailObj)))));
};
//DRAW(tail());

tailRotor = function(){
	var tailRotorExtDom = DOMAIN([[-1, 1],[0,2*PI]])([framesect,sect]);
	var tailRotorExt = COLOR(WHITE)(Sk(0.844)(MAP(TORUS(3,1))(tailRotorExtDom)));

	var tailRotorInnDom = DOMAIN([[0,1],[0,2*PI]])([2*12,24]);
	var tailRotorInnProfile = BEZIER(S0)([ [2.2,0,0.1],[2.2,0,0.1],[2.2,0,0.3],[2.2,0,0.3],[2.2,0,0.3], [2.5,0,0.3], [3,0,0.7]]);
	var tailRotorInnMap = ROTATIONAL_SURFACE(tailRotorInnProfile);
	var tailRotorInnObj = MAP(tailRotorInnMap)(tailRotorInnDom);
	var tailRotorInnBandProfile = BEZIER(S0)([ [2.2,0,-0.1],[2.2,0,0.1] ]);
	var tailRotorInnBandMap = ROTATIONAL_SURFACE(tailRotorInnBandProfile);
	var tailRotorInnBandObj = COLOR(BLACK)(MAP(tailRotorInnBandMap)(tailRotorInnDom));

	var tailRotorCenterDom = DOMAIN([[0,1],[0,2*PI]])([2*12,24]);
	var tailRotorCenterProfile = BEZIER(S0)([ [1.3,0,0.1],[1.3,0,0.1],[1.3,0,0.3],[1.3,0,0.3], [0.3,0,0.5],[0.3,0,0.5],[0.3,0,0.5], [0,0,1.5]]);
	var tailRotorCenterMap = ROTATIONAL_SURFACE(tailRotorCenterProfile);
	var tailRotorCenterObj = COLOR(WHITE)(MAP(tailRotorCenterMap)(tailRotorCenterDom));

	var tailBlade1 = COLOR(WHITE)(T([0,1,2])([-5,-0.5,-0.1])(CUBOID([10,1,0.2])));
	var tailBladeBand1 = T([0,1,2])([-4.3,-0.5,-0.101])(CUBOID([0.2,1.01,0.202]));
	var tailBladeBand2 = T([0,1,2])([4,-0.5,-0.101])(CUBOID([0.2,1.01,0.202]));
	var tailBladeBand1in = T([0,1,2])([-1.43,-0.5,-0.101])(CUBOID([0.2,1.01,0.202]));
	var tailBladeBand2in = T([0,1,2])([1.3,-0.5,-0.101])(CUBOID([0.2,1.01,0.202]));
	var tailBlade = STRUCT([tailBlade1, tailBladeBand1, tailBladeBand2, tailBladeBand1in, tailBladeBand2in ]);

	var centralDiskBandProfile = BEZIER(S0)([ [1.401,0,-0.1],[1.401,0,0.1] ]);
	var centralDiskBandMap = ROTATIONAL_SURFACE(centralDiskBandProfile);
	var centralDiskBandObj = MAP(centralDiskBandMap)(tailRotorInnDom);
	var centralDisk = STRUCT([centralDiskBandObj, T([2])([-0.101])(DISK(1.4)([sect,1])) , T([2])([0.101])(DISK(1.4)([sect,1])) ]);

	return T([0,1,2])([1,5.4,1.5])(R([0,2])(PI/2.0)(Sk(0.2)(STRUCT([centralDisk, tailBlade, tailRotorExt, tailRotorCenterObj, R([0,2])(PI)(tailRotorCenterObj), tailRotorInnObj, R([0,2])(PI)(tailRotorInnObj), tailRotorInnBandObj]))));
};
//DRAW(tailRotor());

//****Tet - draft****//
tet = function(){
var points = [[0,0,0],[1,SQRT(3),0],[2,0,0],[3,SQRT(3),0],[4,0,0],[5,SQRT(3),0],[6,0,0],[7,SQRT(3),0],[8,0,0],[9,SQRT(3),0],[10,0,0],[11,SQRT(3),0],[12,0,0]];
triStrip1 = TRIANGLE_STRIP(points);
points = [[0,0,0],[1,-SQRT(3),0],[2,0,0],[3,-SQRT(3),0],[4,0,0],[5,-SQRT(3),0],[6,0,0],[7,-SQRT(3),0],[8,0,0],[9,-SQRT(3),0],[10,0,0],[11,-SQRT(3),0],[12,0,0]];
triStrip2 = TRIANGLE_STRIP(points);
points = [[1,-SQRT(3),0],[2,-2*SQRT(3),0],[3,-SQRT(3),0],[4,-2*SQRT(3),0],[5,-SQRT(3),0],[6,-2*SQRT(3),0],[7,-SQRT(3),0],[8,-2*SQRT(3),0],[9,-SQRT(3),0],[10,-2*SQRT(3),0],[11,-SQRT(3),0] ];
triStrip3 = TRIANGLE_STRIP(points);
points = [[2,-2*SQRT(3),0],[3,-3*SQRT(3),0],[4,-2*SQRT(3),0],[5,-3*SQRT(3),0],[6,-2*SQRT(3),0],[7,-3*SQRT(3),0],[8,-2*SQRT(3),0],[9,-3*SQRT(3),0],[10,-2*SQRT(3),0] ];
triStrip4 = TRIANGLE_STRIP(points);
points = [ [3,-3*SQRT(3),0],[4,-4*SQRT(3),0],[5,-3*SQRT(3),0],[6,-4*SQRT(3),0],[7,-3*SQRT(3),0],[8,-4*SQRT(3),0],[9,-3*SQRT(3),0]];
triStrip5 = TRIANGLE_STRIP(points);
points = [  [4,-4*SQRT(3),0],[5,-5*SQRT(3),0],[6,-4*SQRT(3),0],[7,-5*SQRT(3),0],[8,-4*SQRT(3),0] ];
triStrip6 = TRIANGLE_STRIP(points);

var tetFace1 =  T([0,1])([-6*SQRT(3),-1])(R([0,1])([PI/6.0])(STRUCT([ triStrip1, triStrip2, triStrip3, triStrip4, triStrip5, triStrip6])));
var tetFace2 = R([0,2])([Math.acos(1/3)])(tetFace1);
tetFace1 = T([0])([2.331*SQRT(3)]) (tetFace1);
tetFace2 = T([0])([2.331*SQRT(3)]) (tetFace2);
tetFace3 = R([0,1])([4*PI/3.0])(tetFace2);
tetFace4 = R([0,1])([-4*PI/3.0])(tetFace2);

return COLOR255([5,30,35,1])(R([0,2])(PI)(T([0,1,2])([500,-1500,-200])(Sk(100)(STRUCT([tetFace1, tetFace2, tetFace3, tetFace4])))));
};
//DRAW(tet());

model = STRUCT([universe(), earth(), atmosphere(), tetrahedralCore(), cockpit(), neck(), neckCover(), arm(),
engines(), tail(), tailRotor(), tet()]);

  return model
  })();

  exports.author = 'vfede';
  exports.category = 'vehicles';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));
