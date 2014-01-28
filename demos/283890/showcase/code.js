/* Lampada IKEA */

/* Definizione della base della lampada */
var base1 = EXTRUDE([0.015])(DISK(0.102)(50));
var base2 = T([2])([0.015])(EXTRUDE([0.03])(DISK(0.1)(50)));
var base = COLOR([0.84,0.84,0.84])(STRUCT([base1,base2]));
var button = R([0,1])([-PI/24])(T([1,2])([0.101,0.002])(COLOR([0.95,0.95,0.95])(SIMPLEX_GRID([[0.01],[0.005],[0.007]]))));


/* Definizione della lampadina*/

var domain = DOMAIN([[0,1],[0,2*PI]])([80,80]);
var controlpoints1 = [[0.002,0,0],[0,0,0.01],[0.006,0,0.01],[-0.01,0,0.006]];
var c1 = CUBIC_HERMITE(S0)(controlpoints1);
var cc = ROTATIONAL_SURFACE(c1);
var light = COLOR([1,1,0,0.8])(MAP(cc)(domain));



/* Definizione dei rami della lampada */

var buildBranch = function (branchbase, branchtop, h, branchbaseColor) {
	return STRUCT([COLOR([0.74,0.74,0.74])(EXTRUDE([h])(branchbase)),T([2])([h])(branchtop)]);
}

var branchbase = DISK(0.003)(50);
var branchtop = STRUCT([EXTRUDE([0.02])(DISK(0.0035)(50)),T([2])([0.02])(light)]);
var b = [];
b.push(T([0,1])([0.02,0.02])(buildBranch(branchbase,branchtop,0.33)));
b.push(R([0,1])([2*PI/5])(T([0,1])([0.02,0.02])(buildBranch(branchbase,branchtop,0.32))));
b.push(R([0,1])([-2*PI/5])(T([0,1])([0.02,0.02])(buildBranch(branchbase,branchtop,0.30))));
b.push(R([0,1])([4*PI/5])(T([0,1])([0.02,0.02])(buildBranch(branchbase,branchtop,0.32))));
b.push(R([0,1])([-4*PI/5])(T([0,1])([0.02,0.02])(buildBranch(branchbase,branchtop,0.30))));
b.push(R([0,1])([PI/5])(T([0,1])([0.045,0.045])(buildBranch(branchbase,branchtop,0.26)))); 
b.push(R([0,1])([3*PI/5])(T([0,1])([0.045,0.045])(buildBranch(branchbase,branchtop,0.24))));
b.push(R([0,1])([5*PI/5])(T([0,1])([0.045,0.045])(buildBranch(branchbase,branchtop,0.25))));
b.push(R([0,1])([7*PI/5])(T([0,1])([0.045,0.045])(buildBranch(branchbase,branchtop,0.23))));
b.push(R([0,1])([9*PI/5])(T([0,1])([0.045,0.045])(buildBranch(branchbase,branchtop,0.30))));
var branches = T([2])([0.045])(STRUCT(b));



/* Definizione dei vetro della lampada */

var getCylinder = function (r,h,n,m) {
	var piano = DOMAIN([[0,2*PI],[0,h]])([n,m]);
	var mapping = function(p) {
		var u = p[0];
		var v = p[1];
		return [r*SIN(u),r*COS(u),v];
	}
	return MAP(mapping)(piano);
}

var c = [];
c.push(getCylinder(0.1,0.5,50,50));
c.push(T([2])([0.1])(getCylinder(0.12,0.3,50,50)));
c.push(T([2])([0.15])(getCylinder(0.14,0.2,50,50)));
var glasses = T([2])([0.015])(COLOR([0.75,0.93,1,0.3])(STRUCT(c)));



/* Definizione delle viti che fissano i vetri della lampada*/

var getPinHead = function (r,n,color) {
	var domain = DOMAIN([[0,PI/2],[0,2*PI]])([n,2*n]);
	var mapping = function(p) {
		var u = p[0];
		var v = p[1];
		return [r*COS(u)*COS(v),r*COS(u)*SIN(v),r*SIN(u)];
	}
	var mapped = MAP(mapping)(domain);
	return COLOR(color)(mapped);
}


var pinbase = DISK(0.002)(50);
var ps = [];
var pinHead = T([2])([0.04])(getPinHead(0.004,50,[0.84,0.84,0.84]));
var pinBody = EXTRUDE([0.04])(pinbase);
var pin = T([1])([0.1])(R([1,2])([-PI/2])(STRUCT([pinHead,pinBody])));
ps.push(pin);
ps.push(R([0,1])([2*PI/3])(pin));
ps.push(R([0,1])([-2*PI/3])(pin));
var pins = T([2])([0.25])(STRUCT(ps));


/* Lampada completa */
var scmodel = STRUCT([base,button,branches,glasses,pins]);