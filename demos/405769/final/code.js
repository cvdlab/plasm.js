// Stefano Calcaterra, 405769
// Final Project - Tavolino da pranzo Noguchi

//porzione di arco pieno
function arc (alpha, r, R) {

	var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
	
	var mapping = function (v) {
		var a = v[0];
		var r = v[1];

		return [r*COS(a), r*SIN(a)];
	}

	var model = MAP(mapping)(domain);
	return model;
} 

var dom1 = PROD1x1([INTERVALS(1)(36),INTERVALS(1)(36)]);

/////////////////////////// piano superiore ///////////////////////////
var piano_superiore_struct = EXTRUDE([0.2])(arc(2*PI, 0, 6));
var piano_superiore = T([2])([7.25])(piano_superiore_struct);

/////////////////////////// base ///////////////////////////
var alpha = BEZIER(S0)([[1,0,0.4],[1.1,0,0.4],[1.2,0,0.4],[1.3,0,0.4],[1.4,0,0.4],[1.5,0,0.4],[1.5,0,0.4],[1.8,0,0.2],[2.4,0,0.2],[2.5,0,0]]);
var alpha2 = BEZIER(S0)([[1,0,0],[1,0,0.4]]);
var alpha3= BEZIER(S0)([[1,0,0],[2.5,0,0]]);
var beta = BEZIER(S1)([[2.4,0,0],[2.4,3.05,0],[-2.4,3.05,0],[-2.4,0,0]]);


var surface1 = MAP(PROFILEPROD_SURFACE([alpha,beta]))(dom1);
var surface1_scaled = SCALE([0,1])([0.5,0.5])(surface1);

var surface2 = MAP(PROFILEPROD_SURFACE([alpha2,beta]))(dom1);
var surface2_scaled = SCALE([0,1])([0.5,0.5])(surface2);

var surface3 = MAP(PROFILEPROD_SURFACE([alpha3,beta]))(dom1);
var surface3_scaled = SCALE([0,1])([0.5,0.5])(surface3);

var base1 = STRUCT(REPLICA(2)([surface1_scaled,R([0,1])(PI)]));
var base2 = STRUCT(REPLICA(2)([surface2_scaled,R([0,1])(PI)]));
var base3 = STRUCT(REPLICA(2)([surface3_scaled,R([0,1])(PI)]));

//DRAW(STRUCT([MAP(alpha)(dom1),MAP(beta)(dom1), base1, base2]))
var base = STRUCT([base1, base2, base3]);

/////////////////////////// corpo ///////////////////////////
var elemento_corpo_d_struct = EXTRUDE([7.8])(arc(2*PI, 0, 0.03));
var elemento_corpo_ds1 = STRUCT(REPLICA(2)([elemento_corpo_d_struct,R([0,2])(PI/6)]));
var elemento_corpo_ds2 = R([0,2])(-PI/12)(elemento_corpo_ds1);
var elemento_corpo_ds = T([1,2])([-1.4,0.4])(R([1,2])(-PI/8)(elemento_corpo_ds2)); //15°

var elementi_corpo_tot = STRUCT(REPLICA(7)([elemento_corpo_ds,R([0,1])(PI/3.5)]));

var anello_struct = EXTRUDE([0.05])(arc(2*PI, 2.4, 2.5));
var anello = T([2])([7.20])(anello_struct);

var corpo = STRUCT([elementi_corpo_tot, anello]);
//DRAW(STRUCT([piano_superiore, base, elementi_corpo_tot]))

/////////////////////////// TOTALE ///////////////////////////

var model = STRUCT([COLOR([2,2,2])(piano_superiore), COLOR([0.2,0.2,0.2])(base), COLOR([0,0,0])(corpo)]);
