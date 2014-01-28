
//Domains
var domain2D = DOMAIN([[0,1],[0,1]])([10,10]);
var domain3D = DOMAIN([[0,1],[0,1],[0,1]])([10,10,1]);
var domainUnderSaddle = DOMAIN([[0,2*PI],[0,PI/2]])([18,36]);
var domainPneumatic = DOMAIN([[0,2*PI],[0,2*PI]])([18,36]);
var domainHandleBars = DOMAIN([[0,2*PI],[0,PI/2]])([18,36]);
var domainKnob= DOMAIN([[0,1],[0,2*PI]])([20,20]);

//Functions
var torus = function (R, r){
return function (v) {
var a = v[0]
var b = v[1]

var u = (r * COS(a) + R) * COS(b);
var v = (r * COS(a) + R) * SIN(b);
var w = (r * SIN(a));
return [u,v,w];
};
};

function arc (alpha, r, R) {
	var domain = DOMAIN([[0,alpha],[r,R]])([40,1]);
	var mapping = function (v) {
		var a = v[0];
		var r = v[1];
		return [r*COS(a), r*SIN(a)];
	}
	var model = MAP(mapping)(domain);
	return model;
}

var pneumatic = function (R, r){
return function (v) {
var a = v[0]
var b = v[1]

var u = (r * COS(a)*COS(a) + R) * COS(b);
var v = (r * COS(a)*COS(a) + R) * SIN(b);
var w = (r * SIN(a));
return [u,v,w];
};
};

//Front wheel
var pneumatic_back = pneumatic(4.6,0.18);
var pneumatic_back_mapped = T([2])([0.17])(MAP(pneumatic_back)(domainPneumatic));
var outer_rim_2D_back = arc(2*PI,4.4,4.6);
var outer_rim_back = EXTRUDE([0.3])(outer_rim_2D_back);
var inner_rim_2D_back = arc(2*PI,0.2,0.3);
var inner_rim_back = T([2])([-0.1])(EXTRUDE([0.5])(inner_rim_2D_back));
var inner_cylinder = T([2])([-0.28608])(EXTRUDE([0.9312])(DISK(0.2)(10)));
var rim_back = STRUCT([inner_rim_back,outer_rim_back,inner_cylinder])
var rotation = R([0,1])([PI/12]);
var ray = T([0,2])([0.3,0.15])(R([0,2])(PI/2)(EXTRUDE([4.1])(DISK(0.02)(10))));
var rays = STRUCT(REPLICA(24)([ray,rotation]));
var front_pneumatic = R([0,2])(PI/2)(COLOR([0,0,0])(pneumatic_back_mapped));
var wheel = STRUCT([rim_back,rays]);


/********* TELAIO ***********/

var c1 = [[3.37, 2.16,0], [3.09, 2.56,0], [2.96, 2.57,0], [2.62, 2.16,0]];
var c2 = [[3.25, 2.16,0], [3.09, 2.20,0], [2.99, 2.21,0], [2.74, 2.16,0]];
var c1_b = c1.map(function (p) {return [p[0],p[1],p[2]-0.2] });
var c2_b = c2.map(function (p) {return [p[0],p[1],p[2]-0.2] });
var curve0 = BEZIER(S0)(c1);
var curve1 = BEZIER(S0)(c2);
var curve2 = BEZIER(S0)(c1_b);
var curve3 = BEZIER(S0)(c2_b);

var hub1 = BEZIER(S1)([curve0,curve1]);
var hub2 = BEZIER(S1)([curve2,curve3]);
var surf_hub = BEZIER(S2)([hub1,hub2]);
var hub = MAP(surf_hub)(domain3D);
var r1_hub = R([0,1])(PI/2)(hub);
var r2_hub = S([2])([1.24])(T([0,1,2])([-3,-0.1,-2.85])(R([1,2])(PI/2)(r1_hub)));
var forkL = T([0,1,2])([-0.1,-0.1,0.496])(R([0,2])(-PI/2)(CUBOID([0.1488,0.2,5.06])));
var forkR = T([0,1,2])([-0.1,-0.1,-0.286])(R([0,2])(-PI/2)(CUBOID([0.1490,0.2,5.06])));
var front_wheel = COLOR([0.647,0.443,0.392])(R([0,2])(PI/2)(STRUCT([wheel,r2_hub,forkL,forkR])));

//Back wheel
var pneumatic_posteriore = pneumatic(1.5,0.08);
var pneumatic_posteriore_mapped = T([2])([0.17])(MAP(pneumatic_posteriore)(domainPneumatic));
var rim_posteriore_2D = arc(2*PI,1.3,1.5);
var rim_posteriore = EXTRUDE([0.12])(rim_posteriore_2D);
var ray_p = T([0,2])([0.3,0.15])(R([0,2])(PI/2)(EXTRUDE([1.1])(DISK(0.01)(10))));
var rays_p = STRUCT(REPLICA(24)([ray_p,rotation]));
var back_wheel = STRUCT([T([2])([0.1])(rim_posteriore),inner_rim_back,inner_cylinder,rays_p]);
var r2_hub_b = S([2])([1.24])(T([0,1,2])([0.5,-0.1,-2.85])(R([1,2])(PI/2)(r1_hub)));
var forkL_b = T([0,1,2])([-0.1,-0.1,0.496])(R([0,2])(-PI/2)(CUBOID([0.1488,0.2,1.56])));
var forkR_b = T([0,1,2])([-0.1,-0.1,-0.286])(R([0,2])(-PI/2)(CUBOID([0.1490,0.2,1.56])));
var R_forks_b = R([0,1])(PI/4.27)(STRUCT([r2_hub_b,forkL_b,forkR_b]));
var Tr_back_wheel = COLOR([0.647,0.443,0.392])(T([1,2])([8,-2.8])(R([0,2])(PI/2)(STRUCT([back_wheel,R_forks_b]))));
var back_pneumatic = T([1,2])([8,-2.8])(R([0,2])(PI/2)(COLOR([0,0,0])(pneumatic_posteriore_mapped)));

/************HandleBars***********/

var m1 = T([0,2])([0.2,5.7])(EXTRUDE([1])(DISK(0.07)(10)));
var m2 = T([0,2])([0.2,5.4])(EXTRUDE([0.3])(DISK(0.1)(10)));
var m3 = T([0,2])([-1.125,6.7])(R([0,2])(PI/2)(EXTRUDE([2.5])(DISK(0.07)(10))));
var m4 = torus(1,0.0704);
var m4_mapped = T([0,1,2])([1.374,1,6.7])(R([0,1])(-PI/2)(MAP(m4)(domainHandleBars)));
var m5 = T([0])([0.25])(S([0])([-1])(m4_mapped));
var m_0_5 = COLOR([0.647,0.443,0.392])(STRUCT([m1,m2,m3,m4_mapped,m5]));

//Knobs
var profile = BEZIER(S0)([[0,0,0], [0.1,0,0], [0.2,0,0],[0.44,0,0], [0.44,0,0.21], [0.44,0,0.29], [0.07,0,0.26], [0.07,0,0.41], [0.07,0,0.6], [0.07,0,0.95], 
[0.44,0,0.92], [0.44,0,0.9], [0.44,0,1.08],[0.3,0,1.08], [0.15,0,1.08], [0,0,1.08]]);
var mapping_knob = ROTATIONAL_SURFACE(profile);
var r_knob = R([0,1])(PI/2)(R([0,2])(PI/2)(MAP(mapping_knob)(domainKnob)));
var t1_knob = COLOR([0.545,0.27,0.0745])(T([0,1,2])([2.37,1,6.7])(r_knob));
var t2_knob = COLOR([0.545,0.27,0.0745])(T([0])([0.25])(S([0])([-1])(t1_knob)));
var HandleBars = STRUCT([m_0_5,t1_knob,t2_knob]);

//Under saddle
var underSaddle = torus(6,0.09);
var underSaddle_mapped = COLOR([0.647,0.443,0.392])(T([0,2])([0.2,-0.42])(R([0,2])([-PI/2])(MAP(underSaddle)(domainUnderSaddle))));
var t1 = R([0,2])(PI/2)(EXTRUDE([1.22])(DISK(0.093)(10)));
var r_t1 = COLOR([0.647,0.443,0.392])(T([0,1,2])([0.2,5.982,-0.375])(R([0,2])(PI/2)(R([0,1])(PI/5)(t1))));
var t2 = BEZIER(S0)([[4.17, 3.75,0], [5.29, 2.96,0], [3.08, 2.87,0], [4.17, 1.97,0]]);
var t3 = BEZIER(S0)([[4.17, 3.75,0.1], [5.29, 2.96,0.1], [3.08, 2.87,0.1], [4.17, 1.97,0.1]]);
var s_t2_3 = BEZIER(S1)([t2,t3]);
var mapping_s = MAP(s_t2_3)(domain2D);
var link = COLOR([0.647,0.443,0.392])(T([0,1,2])([0.15,-0.9,3.81])(S([2])([0.45])(R([1,2])(PI/2)(R([0,2])([PI/2])(mapping_s)))));


/*****SADDLE********/

var domainSaddle= DOMAIN([[0,1],[0,PI]])([20,20]);
var profileSaddle = BEZIER(S0)([[0.09,0,0], [0.10,0,0], [0.11,0,0],[0.21,0,0],[0.23,0,0.1],[0.04,0,0.2],
	[0.04,0,0.45],[0.03,0,0.6],[0.02,0,0.49],[0,0,0.516]]);
var mapping_saddle = ROTATIONAL_SURFACE(profileSaddle);
var saddle = COLOR([0.545,0.27,0.0745])(T([0,1,2])([0.2,3.6,5.2])(S([0,1,2])([3,2.5,2.5])(R([1,2])(PI/2)(MAP(mapping_saddle)(domainSaddle)))));

//Pedals
var p1 = T([0,1,2])([-0.1,-0.3,0.1])(R([1,2])(PI)(CUBOID([0.1,1.5,0.1])));
var p2 = T([0,1,2])([-0.10,-1.7,0.1])(R([0,1])(-PI/2)(R([1,2])(PI)(CUBOID([0.1,0.75,0.1]))));
var grid = EXTRUDE([0.1])(SIMPLEX_GRID([[0.2,0.2,0.2],[0.2,-0.2,0.2]]));
var cub1 = T([0,1,2])([-0.1,0,0])(CUBOID([0.1,0.6,0.1]));
var cub2 = T([0,1,2])([0.6,0,0])(CUBOID([0.1,0.6,0.1]));
var cyl = T([1,2])([0.3,0.05])(R([0,2])(PI/2)(EXTRUDE([0.6])(DISK(0.02)(10))));
var p3 = T([0,1])([-1.55,-2.05])(STRUCT([grid,cub1,cub2,cyl]));
var pedal_1 = STRUCT([p1,p2,p3]);
var pedal_2 = T([0,2])([0.3,0.1])(S([0])([-1])(R([1,2])(PI)(pedal_1)));
var pedals = COLOR([0.647,0.443,0.392])(STRUCT([pedal_1,pedal_2]));


/******************BIKE***************/
var model = STRUCT([front_pneumatic,front_wheel,HandleBars,r_t1,underSaddle_mapped,Tr_back_wheel,pedals,saddle,link,back_pneumatic]);


