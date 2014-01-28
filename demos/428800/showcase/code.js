//invaders
// ----------------------invader A------------------------------------
var c = CUBOID([1,1,1])
var b = CUBOID([8,1,1])
var d = CUBOID([4,1,1])
var invaderAsb = STRUCT([c,T([0])([7])(c),T([0,1])([1,-1])(c),T([0,1])([6,-1])(c),T([1])([-2])(b),T([1])([-3])(c),T([0,1])([2,-3])(d),T([0,1])([7,-3])(c),
	T([1])([-4])(b),T([1])([-5])(b)])

var bracciadownSX = STRUCT([T([0,1])([-1,-3])(c),T([0,1])([-1,-4])(c),T([0,1])([-2,-4])(c),T([0,1])([-2,-5])(c),T([0,1])([-2,-6])(c)])
var bracciadownDX = STRUCT([T([0,1])([8,-3])(c),T([0,1])([8,-4])(c),T([0,1])([9,-4])(c),T([0,1])([9,-5])(c),T([0,1])([9,-6])(c)])

var bracciadown = STRUCT([bracciadownSX,bracciadownDX])

var gambedownSX = STRUCT([T([1])([-6])(c),T([0,1])([1,-7])(c),T([0,1])([2,-7])(c)])
var gambedownDX = STRUCT([T([0,1])([7,-6])(c),T([0,1])([6,-7])(c),T([0,1])([5,-7])(c)])

var gambedown = STRUCT([gambedownSX,gambedownDX])

var invaderAdown=STRUCT([invaderAsb,bracciadown,gambedown])

var invaderAdown = COLOR([0,0,0])(invaderAdown)

var bracciaupSX = STRUCT([T([0,1])([-1,-3])(c),T([0,1])([-1,-4])(c),T([0,1])([-2,-3])(c),T([0,1])([-2,-2])(c),T([0,1])([-2,-1])(c)])

var bracciaupDX = STRUCT([T([0,1])([8,-3])(c),T([0,1])([8,-4])(c),T([0,1])([9,-3])(c),T([0,1])([9,-2])(c),T([0,1])([9,-1])(c)])

var bracciaup = STRUCT([bracciaupSX,bracciaupDX])

var gambeupSX = STRUCT([T([1])([-6])(c),T([0,1])([-1,-7])(c)])
var gambeupDX = STRUCT([T([0,1])([7,-6])(c),T([0,1])([8,-7])(c)])

var gambeup = STRUCT([gambeupSX,gambeupDX])


var invaderAup = STRUCT([invaderAsb,bracciaup,gambeup])

var invaderAup = COLOR([0,0,0])(invaderAup)


// -----------------------invader B--------------------------
var e = CUBOID([4,1,1])
var f = CUBOID([12,1,1])
var g = CUBOID([14,1,1])
var h = CUBOID([2,1,1])

var invaderBsg = STRUCT([e,T([0,1])([-4,-1])(f),T([0,1])([-5,-2])(g),T([0,1])([-5,-3])(e),T([0,1])([1,-3])(h),T([0,1])([5,-3])(e),T([0,1])([-5,-4])(g),
	T([0,1])([-1,-5])(h),T([0,1])([3,-5])(h),T([0,1])([-2,-6])(h),T([0,1])([1,-6])(h),T([0,1])([4,-6])(h)])

var gambeBdown = STRUCT([T([0,1])([-4,-7])(h),T([0,1])([6,-7])(h)])

var invaderBdown = STRUCT([invaderBsg,gambeBdown])

var invaderBdown = COLOR([0,0,0])(invaderBdown)

var gambeBup = STRUCT([T([1])([-7])(h),T([0,1])([2,-7])(h)])

var invaderBup = STRUCT([invaderBsg,gambeBup])

var invaderBup = COLOR([0,0,0])(invaderBup)

// --------------------------invader C---------------------------
var i = CUBOID([6,1,1])

var invaderCsg = STRUCT([T([0,1])([1,1])(h),e,T([0,1])([-1,-1])(i),T([0,1])([-2,-2])(h),T([0,1])([1,-2])(h),T([0,1])([4,-2])(h),
	T([0,1])([-2,-3])(b),T([1])([-4])(c),T([0,1])([3,-4])(c),T([0,1])([-1,-5])(c),T([0,1])([4,-5])(c)])

var gambeCdown = STRUCT([T([0,1])([1,-5])(h),T([0,1])([-2,-6])(c),T([1])([-6])(c),T([0,1])([3,-6])(c),T([0,1])([5,-6])(c)])

var invaderCdown = STRUCT([invaderCsg,gambeCdown])

var invaderCdown = COLOR([0,0,0])(invaderCdown)

var gambeCup = STRUCT([T([0,1])([1,-4])(h),T([1])([-6])(c),T([0,1])([3,-6])(c)])

var invaderCup = STRUCT([invaderCsg,gambeCup])

var invaderCup = COLOR([0,0,0])(invaderCup)

// ------------------------casa-------------------------
var j = CUBOID([12,2,1])
var k = CUBOID([16,2,1])
var l = CUBOID([7,2,1])
var m = CUBOID([4,4,1])

var casa = STRUCT([j,T([0,1])([-2,-2])(k),T([0,1])([-2,-4])(k),T([0,1])([-2,-6])(l),T([0,1])([7,-6])(l),
	T([0,1])([-2,-10])(m),T([0,1])([10,-10])(m)])
var casa = COLOR([0,1,0])(casa)

// ------------------navicella--------------------------
var n = CUBOID([2,2,1])
var o = CUBOID([12,6,1])

var navicella = STRUCT([n,T([0,1])([-5,-6])(o)])
var navicella = T([0,1])([10,-140])(navicella)
var navicella = COLOR([0,1,0])(navicella)

// ------------------------serie invader A e case-------------------
var matA = CONS(AA(T([0,1]))([[0,0],[18,0],[36,0],[54,0],[72,0],[90,0],[108,0],[126,0],[144,0],[162,0],[180,0],
	[0,-14],[18,-14],[36,-14],[54,-14],[72,-14],[90,-14],[108,-14],[126,-14],[144,-14],[162,-14],[180,-14]]))

var invadersAdown = STRUCT(matA(invaderAdown))

var invadersBdown = STRUCT(matA(invaderBdown))

var matB = CONS(AA(T([0,1]))([[0,0],[18,0],[36,0],[54,0],[72,0],[90,0],[108,0],[126,0],[144,0],[162,0],[180,0]]))

var invadersCdown = STRUCT(matB(invaderCdown))

var matA = CONS(AA(T([0,1]))([[0,0],[18,0],[36,0],[54,0],[72,0],[90,0],[108,0],[126,0],[144,0],[162,0],[180,0],
	[0,-14],[18,-14],[36,-14],[54,-14],[72,-14],[90,-14],[108,-14],[126,-14],[144,-14],[162,-14],[180,-14]]))

var invadersAup = STRUCT(matA(invaderAup))

var invadersBup = STRUCT(matA(invaderBup))

var matB = CONS(AA(T([0,1]))([[0,0],[18,0],[36,0],[54,0],[72,0],[90,0],[108,0],[126,0],[144,0],[162,0],[180,0]]))

var invadersCup = STRUCT(matB(invaderCup))

var matC = CONS(AA(T([0,1]))([[45-45,-112],[90-45,-112],[135-45,-112],[180-45,-112]]))

var casette = STRUCT(matC(casa))

var allinvadersdown = STRUCT([invadersCdown,T([1])([-14])(invadersBdown),T([1])([-42])(invadersAdown)])

var allinvadersup = STRUCT([invadersCup,T([1])([-14])(invadersBup),T([1])([-42])(invadersAup)])

// -----------------------center proj---------------------
var centerProject = function() {
	var cameraControls = p.controls.controls;
	var boundingRadius = p.scene.getBoundingRadius();

	cameraControls.placeCamera(new THREE.Vector3(0*boundingRadius, 0*boundingRadius, 2*boundingRadius), new THREE.Vector3(), new THREE.Vector3(0,1,0));
	};

// ----------------------animazioni invaders-----------------------
function AnimRightDownUp(time,p,w) {	
	setTimeout(function () {
		allinvadersup.hide();
		allinvadersdown.hide();
		allinvadersup = T([0,1])([18*p,-14*w])(allinvadersup);
		allinvadersup.draw();
		}, time);    	
}

function AnimRightUpDown(time,p,w) {	
	setTimeout(function () {
		allinvadersup.hide();
		allinvadersdown.hide();
		allinvadersdown = T([0,1])([18*p,-14*w])(allinvadersdown);
		allinvadersdown.draw();
		}, time);    	
}

function AnimDownUpDown(time,p,w) {	
	setTimeout(function () {
		allinvadersup.hide();
		allinvadersdown.hide();
		allinvadersdown = T([0,1])([18*p,-14*w])(allinvadersdown);
		allinvadersdown.draw();
		}, time);    	
}

function AnimDownDownUp(time,p,w) {	
	setTimeout(function () {
		allinvadersup.hide();
		allinvadersdown.hide();
		allinvadersup = T([0,1])([18*p,-14*w])(allinvadersup);
		allinvadersup.draw();
		}, time);    	
}

function AnimLeftUpDown(time,p,w) {	
	setTimeout(function () {
		allinvadersup.hide();
		allinvadersdown.hide();
		allinvadersdown = T([0,1])([-18*p,-14*w])(allinvadersdown);
		allinvadersdown.draw();
		}, time);    	
}

function AnimLeftDownUp(time,p,w) {	
	setTimeout(function () {
		allinvadersup.hide();
		allinvadersdown.hide();
		allinvadersup = T([0,1])([-18*p,-14*w])(allinvadersup);
		allinvadersup.draw();
		}, time);    	
}

// ---------------------------animazioni navicella-----------------
function AnimNavi(time,p){
	setTimeout(function () {
		navicella.hide();
		navicella = T([0])([p])(navicella);
		navicella.draw();
		}, time);    	
}

function movNavi(n,ms,sp,r)
{
	for(z = 0; z<n;z++)
	{
		AnimNavi(n*ms*r+ms*z,sp*z)
	}
}


for(i=0 ; i < 10;i++)
{
	movNavi(20,100,Math.pow(-1,i)*0.4,i)
}

function closeall(){
	setTimeout(function () {
		HIDE(allinvadersdown);
		HIDE(allinvadersup);
		HIDE(navicella);
		HIDE(casette);
		}, 24000);    	
}

// ------------------ GAME OVER ----------------------
var G1 = CUBOID([7,1,1])
var G2 = CUBOID([8,1,1])
var G3 = CUBOID([2,6,1])
var G4 = CUBOID([5,2,1])
var G5 = CUBOID([2,2,1])

var G = STRUCT([G1,T([0,1])([-1,-1])(G2),T([0,1])([-1,-7])(G3),T([0,1])([2,-5])(G4),T([0,1])([5,-7])(G5),
	T([0,1])([-1,-8])(G2),T([0,1])([0,-9])(G1)])

var A1 = CUBOID([6,1,1])
var A2 = G2
var A3 = CUBOID([2,8,1])
var A4 = CUBOID([4,2,1])

var A = STRUCT([A1,T([0,1])([-1,-1])(A2),T([0,1])([-1,-9])(A3),T([0,1])([5,-9])(A3),T([0,1])([1,-5])(A4)])

var M = STRUCT([A1,T([0,1])([-1,-1])(A2),T([0,1])([-1,-9])(A3),T([0,1])([5,-9])(A3),T([0,1])([2,-9])(A3)])

var E = STRUCT([G1,T([0,1])([-1,-1])(G2),T([0,1])([-1,-7])(G3),T([0,1])([1,-5])(G4),T([0,1])([-1,-8])(G2),T([0,1])([0,-9])(G1)])

var O = STRUCT([A1,T([0,1])([-1,-1])(A2),T([0,1])([-1,-7])(G3),T([0,1])([5,-7])(G3),T([0,1])([-1,-8])(A2),T([0,1])([0,-9])(A1)])

var V1 = CUBOID([2,7,1])
var V2 = CUBOID([2,2,1])
var V3 = CUBOID([5,2,1])

var V = STRUCT([V1,T([0])([7])(V1),T([0,1])([1,-1])(V2),T([0,1])([6,-1])(V2),T([0,1])([2,-2])(V3),T([0,1])([3.5,-3])(V2)])

var R1 = CUBOID([2,3.5,1])
var R2 = CUBOID([2,4,1])

var R = STRUCT([A1,T([1])([-1])(G1),T([1])([-9])(A3),T([0,1])([2,-5])(A4),T([0,1])([5,-3.5])(R1),T([0,1])([5,-9])(R2)])

var GAMEOVER = STRUCT([G,T([0])([9])(A),T([0])([18])(M),T([0])([27])(E),T([0])([45])(O),T([0,1])([52.5,-6])(V),T([0])([63])(E),T([0])([72])(R)])

var GAMEOVER = T([0,1])([20,-40])(COLOR([1,0,0])(GAMEOVER))

function gameover(){
	setTimeout(function () {
		DRAW(GAMEOVER);
		}, 24000);    	
}

//  --------------- start ------------------
DRAW(allinvadersdown)
DRAW(casette)
DRAW(navicella)

centerProject()

AnimRightDownUp(1000,1,0)
AnimRightUpDown(2000,1,0)
AnimDownDownUp(3000,0,1)
AnimLeftUpDown(4000,2,1)
AnimLeftDownUp(5000,3,0)
AnimLeftUpDown(6000,3,0)
AnimDownDownUp(7000,-2,1)
AnimRightUpDown(8000,1,1)
AnimRightDownUp(9000,2,0)
AnimRightUpDown(10000,2,0)
AnimRightDownUp(11000,2,0)
AnimRightUpDown(12000,3,0)
AnimDownDownUp(13000,2,1)
AnimLeftUpDown(14000,2,1)
AnimLeftDownUp(15000,3,0)
AnimLeftUpDown(16000,2,0)
AnimLeftDownUp(17000,2,0)
AnimLeftUpDown(18000,2,0)
AnimDownDownUp(19000,-1,1)

for(i=0 ; i < 10;i++)
{
	movNavi(20,100,Math.pow(-1,i)*0.4,i)
}


var model = STRUCT([allinvadersdown, casette, navicella]);
DRAW(model)