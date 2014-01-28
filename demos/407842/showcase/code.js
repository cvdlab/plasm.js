var dom2 = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(30)]);
var dom1 = INTERVALS(1)(20)
var domSphere = DOMAIN([[0,PI],[0,2*PI]])([36,36]);
var domHalfSphere = DOMAIN([[0,PI],[0,PI]])([36,36]);

var mapping = function (v) {
		var a = v[0];
		var b = v[1];

		var u = SIN(a)*COS(b);
		var v = SIN(a)*SIN(b);
		var w = COS(a);

	return[u,v,w];
}

function curveHermite(c1){
    
    return MAP(CUBIC_HERMITE(S0)(c1))(dom1);
};

function supHermite(p1,p2,t1,t2){
    
    curva1 = CUBIC_HERMITE(S0)(p1);
    curva2 = CUBIC_HERMITE(S0)(p2);
    return MAP(CUBIC_HERMITE(S1)([curva1,curva2,t1,t2]))(dom2);
};

function annulus_sector (alpha, r, R) {
  var domain = DOMAIN([[0,alpha],[r,R]])([60,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    
    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  return model;
}

function rotate(numRotation,objectToRotate){
    angle = (2*PI)/numRotation;
    r = R([0,1])(angle);
    return STRUCT(REPLICA(numRotation)([r,objectToRotate]));
}

function cylinder(raggio,altezza,dominio){
	var cilindro = CYL_SURFACE([raggio, altezza])([dominio, 1])
	var tappo = DISK(raggio)([dominio+1, 1]);
	var tappoTraslato = T([2])([altezza])(tappo); 
	return STRUCT([cilindro,tappo,tappoTraslato]);
}



var transparent = [1,1,1,0.1];
var gold = [0.854901961,0.647058824,0.125490196];
var ceruleo = [0,0.482352941,0.654901961];
var ceruleoScuro = [0.031372549,0.270588235,0.494117647];
var lampone = [0.890196078,0.043137255,0.360784314];
var pettirosso = [0,0.8,0.8];
var terra = [0.325490196,0.105882353,0];
var spring = [0,1,0.498039216];

var extCrown = EXTRUDE([9])(COLOR(ceruleo)(annulus_sector(2*PI,10,11)));
var intCrown = T([2])([0.5])(EXTRUDE([8])(COLOR(ceruleoScuro)(annulus_sector(2*PI,9.5,10))));
var crown = STRUCT([extCrown,intCrown]);

var dial = T([2])([0.5])(COLOR(lampone)(cylinder(9.5,8,60)));
var closeDisk = COLOR(ceruleo)(DISK(10)([60, 1]));
var glass = T([2])([9])(COLOR(transparent)(DISK(10)([60, 1])));
var pointerBolt = COLOR(gold)(T([2])([7.95])(cylinder(0.3,1,60)));

var hourPointerBaseLine1 = [[-0.3,0,0],[-0.35,2.5,0],[0,0,0],[0,0,0]];
var hourPointerBaseLine2 = [[0.3,0,0],[0.35,2.5,0],[0,0,0],[0,0,0]];
var hourPointerBase = COLOR(ceruleoScuro)(supHermite(hourPointerBaseLine1,hourPointerBaseLine2,[0,0,0],[0,0,0]));
var hourPointerFinalLine1 = [[-0.35,2.5,0],[0,6,0],[-3,2,0],[0,5,0]];
var hourPointerFinalLine2 = [[0.35,2.5,0],[0,6,0],[3,2,0],[0,5,0]];
var hourPointerFinal = COLOR(ceruleoScuro)(supHermite(hourPointerFinalLine1,hourPointerFinalLine2,[0,0,0],[0,0,0]));
var hourCircle = T([2])([8.6])(COLOR(ceruleoScuro)(annulus_sector(2*PI,0.3,0.7)));
var hourPointerDownLine1 = [[-0.3,0,0],[-0.1,-1.5,0],[0,0,0],[0,0,0]];
var hourPointerDownLine2 = [[0.3,0,0],[0.1,-1.5,0],[0,0,0],[0,0,0]];
var hourPointerDown = T([1,2])([-0.6,8.6])(COLOR(ceruleoScuro)(supHermite(hourPointerDownLine1,hourPointerDownLine2,[0,0,0],[0,0,0])));
var hourPointerUp = T([1,2])([0.6,8.6])(STRUCT([hourPointerBase,hourPointerFinal]));
var hourPointer = R([0,1])([-PI/2])(STRUCT([hourPointerUp,hourCircle,hourPointerDown]));


var minutePointerBaseLine1 = [[-0.3,0,0],[-0.35,5,0],[0,0,0],[0,0,0]];
var minutePointerBaseLine2 = [[0.3,0,0],[0.35,5,0],[0,0,0],[0,0,0]];
var minutePointerBase = COLOR(ceruleoScuro)(supHermite(minutePointerBaseLine1,minutePointerBaseLine2,[0,0,0],[0,0,0]));
var minutePointerFinalLine1 = [[-0.35,4.5,0],[0,8.5,0],[-3,2,0],[0,5,0]];
var minutePointerFinalLine2 = [[0.35,4.5,0],[0,8.5,0],[3,2,0],[0,5,0]];
var minutePointerFinal = COLOR(ceruleoScuro)(supHermite(minutePointerFinalLine1,minutePointerFinalLine2,[0,0,0],[0,0,0]));
var minuteCircle = T([2])([8.9])(COLOR(ceruleoScuro)(annulus_sector(2*PI,0.3,0.7)));
var minutePointerDownLine1 = [[-0.3,0,0],[-0.1,-1.5,0],[0,0,0],[0,0,0]];
var minutePointerDownLine2 = [[0.3,0,0],[0.1,-1.5,0],[0,0,0],[0,0,0]];
var minutePointerDown = T([1,2])([-0.6,8.9])(COLOR(ceruleoScuro)(supHermite(minutePointerDownLine1,minutePointerDownLine2,[0,0,0],[0,0,0])));
var minutePointerUp = T([1,2])([0.6,8.9])(STRUCT([minutePointerBase,minutePointerFinal]));
var minutePointer = R([0,1])([-PI])(STRUCT([minutePointerUp,minuteCircle,minutePointerDown]));


var secondPointerBaseLine1 = [[-0.1,0,0],[-0.08,6.5,0],[0,0,0],[0,0,0]];
var secondPointerBaseLine2 = [[0.1,0,0],[0.08,6.5,0],[0,0,0],[0,0,0]];
var minutePointerBase = COLOR(spring)(supHermite(secondPointerBaseLine1,secondPointerBaseLine2,[0,0,0],[0,0,0]));
var secondPointerFinalLine1 = [[-0.05,6.7,0],[0,8.5,0],[-1,0,0],[0,3,0]];
var secondPointerFinalLine2 = [[0.05,6.7,0],[0,8.5,0],[1,0,0],[0,3,0]];
var secondPointerFinal = COLOR(spring)(supHermite(secondPointerFinalLine1,secondPointerFinalLine2,[0,0,0],[0,0,0]));
var secondSmallCircle = T([1,2])([7.2,8.8])(COLOR(spring)(annulus_sector(2*PI,0.1,0.2)));
var secondCircle = T([2])([8.8])(COLOR(spring)(annulus_sector(2*PI,0.3,0.7)));
var secondPointerDownLine1 = [[-0.1,0,0],[-0.025,-1.5,0],[0,0,0],[0,0,0]];
var secondPointerDownLine2 = [[0.1,0,0],[0.025,-1.5,0],[0,0,0],[0,0,0]];
var secondPointerDown = T([1,2])([-0.6,8.8])(COLOR(spring)(supHermite(secondPointerDownLine1,secondPointerDownLine2,[0,0,0],[0,0,0])));
var secondPointerUp = T([1,2])([0.6,8.8])(STRUCT([minutePointerBase,secondPointerFinal]));
var secondPointer = R([0,1])([2*PI])(STRUCT([secondPointerUp,secondCircle,secondPointerDown,secondSmallCircle]));


var alarmPointerLine1 = [[-0.1,0,0],[-0.1,7,0],[0,0,0],[0,0,0]];
var alarmPointerLine2 = [[0.1,0,0],[0.1,7,0],[0,0,0],[0,0,0]];
var alarmPointerUp = T([1,2])([-0.6,8.7])(COLOR(pettirosso)(supHermite(alarmPointerLine1,alarmPointerLine2,[0,0,0],[0,0,0])));
var alarmCircle = T([2])([8.7])(COLOR(pettirosso)(annulus_sector(2*PI,0.3,0.7)));
var alarmPointerDownLine1 = [[-0.1,0,0],[-0.1,-1.5,0],[0,0,0],[0,0,0]];
var alarmPointerDownLine2 = [[0.1,0,0],[0.1,-1.5,0],[0,0,0],[0,0,0]];
var alarmPointerDown = T([1,2])([-0.6,8.7])(COLOR(pettirosso)(supHermite(alarmPointerDownLine1,alarmPointerDownLine2,[0,0,0],[0,0,0])));
var alarmPointer = R([0,1])([0.75*PI])(STRUCT([alarmPointerUp,alarmCircle,alarmPointerDown]));

var primarySign = rotate(4,COLOR(gold)(T([0,1,2])([-0.5,7.8,8.15])(CUBOID([1,1.5,0.5]))));
var secondarySign = rotate(12,COLOR(gold)(T([0,1,2])([-0.5,7.8,8.1])(CUBOID([0.5,0.75,0.5]))));
var sign = STRUCT([primarySign,secondarySign]);


var sphereLmap = MAP(mapping)(domSphere);
var sphereLeft = COLOR(ceruleo)(T([0,1,2])([-7,-10,4.5])(S([0,1,2])([2,2,2])(sphereLmap)));
var sphereRight = COLOR(ceruleo)(T([0,1,2])([7,-10,4.5])(S([0,1,2])([2,2,2])(sphereLmap)));
var sphereUp = COLOR(ceruleo)(T([0,1,2])([0,12.5,4.5])(S([0,1,2])([2,2,2])(sphereLmap)));
var sphere = STRUCT([sphereLeft,sphereRight,sphereUp]);


var screwLeft = T([0,1,2])([7.5,14.5,4.5])(R([0,1])(-PI/7)(R([1,2])(PI/2)(cylinder(0.8,7,7))));
var screwRight = T([0,1,2])([-7.5,14.5,4.5])(R([0,1])(PI/7)(R([1,2])(PI/2)(cylinder(0.8,7,7))));
var capLeftMap = MAP(mapping)(domHalfSphere);
var capRightMap = MAP(mapping)(domHalfSphere);
var capLeft = T([0,1,2])([7.5,14.5,4.5])(R([0,1])(-PI/7)(S([0,1,2])([0.6,0.4,0.6])((capLeftMap))));
var capRight =T([0,1,2])([-7.5,14.5,4.5])(R([0,1])(PI/7)(S([0,1,2])([0.6,0.4,0.6])((capRightMap))));
var screw = COLOR(gold)(STRUCT([screwLeft,screwRight,capLeft,capRight]));


var bellLeftMap = MAP(mapping)(domHalfSphere);
var bellRightMap = MAP(mapping)(domHalfSphere);
var bellLeft = T([0,1,2])([5.5,10,4.5])(R([0,1])(-PI/7)(S([0,1,2])([4,4,4])((bellLeftMap))));
var bellRight = T([0,1,2])([-5.5,10,4.5])(R([0,1])(PI/7)(S([0,1,2])([4,4,4])((bellRightMap))));
var bell = COLOR(ceruleo)(STRUCT([bellLeft,bellRight])); 

var table = COLOR(terra)(T([0,1,2])([-12,-11.8,-1])(R([1,2])(PI/2)(CUBOID([25,12,3]))));

function moveSecond() {
setInterval(function () {  
  secondPointer.rotate([0,1], -PI/32) 
     

       }, 1000)

DRAW(secondPointer);

 
}
moveSecond();

function moveMinute() {
setInterval(function () {  
  minutePointer.rotate([0,1], -PI/1920) 
     

       }, 1000)

DRAW(minutePointer);

 
}
moveMinute();

function moveHour() {
setInterval(function () {  
  hourPointer.rotate([0,1], -PI/115200) 
     

       }, 1000)

DRAW(hourPointer);

}

moveHour();

var model = STRUCT([table,crown,dial,closeDisk,glass,pointerBolt,alarmPointer,sign,sphere,screw,bell]);
DRAW(model);