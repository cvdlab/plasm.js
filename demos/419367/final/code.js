//Domains
var rot_domain = DOMAIN([[0,1],[0,2*PI]])([30,30]);
var domainTorus = DOMAIN([[-PI/2,PI/2],[0,2*PI]])([30,30]);
var dom2D = DOMAIN([[0,1],[0,1]])([72,72]);

//Function torus
var torus = function (R, r){
	return mapping = function (v) {
		var a = v[0]
		var b = v[1]

		var u = (r * COS(a) + R) * COS(b);
		var v = (r * COS(a) + R) * SIN(b);
		var w = (r * SIN(a));
		return [u,v,w];
	};
};

//Top parts
var t_p01 = BEZIER(S0)([[1.47,0,0.14],[1.57,0,0.82],[1.58,0,1.51],[1.52,0,2.25],[1.54,0,2.3],[1.49,0,2.33],[1.61,0,2.39]]);
var t_p02 = BEZIER(S0)([[1.47,0,0.14],[1.5,0,0.82],[1.51,0,1.51],[1.45,0,2.25],[1.47,0,2.3],[1.42,0,2.33],[1.61,0,2.49]]);
var t_map01 = ROTATIONAL_SURFACE(t_p01);
var t_map02 = ROTATIONAL_SURFACE(t_p02);
var t_surf01 = COLOR([1,0,0])(MAP(t_map01)(rot_domain));
var t_surf02 = COLOR([1,0.843,0])(MAP(t_map02)(rot_domain));
var t_tor1 = COLOR([1,0.843,0])(T([2])([2.44])(MAP(torus(1.61,0.05))(domainTorus)));
var top_part_01 = S([0,1])([1.7,1.7])(T([2])([-1.5])(STRUCT([t_surf01,t_surf02,t_tor1])));

var t_p03 = BEZIER(S0)([[1.6,0,0.37], [2.06,0,1.04], [2.67,0,2.19], [2.9,0,2.99],[2.94,0,3.07], [2.97,0,3.1], [3.1,0,3.14]]);
var t_p04 = BEZIER(S0)([[1.6,0,0.37], [2,0,1.04], [2.61,0,2.19], [2.84,0,2.99],[2.88,0,3.07], [2.91,0,3.1], [3.1,0,3.24]]);
var t_map03 = ROTATIONAL_SURFACE(t_p03);
var t_map04 = ROTATIONAL_SURFACE(t_p04);
var t_surf03 = COLOR([1,0,0])(EXTRUDE([3])(MAP(t_map03)(rot_domain)));
var t_surf04 = COLOR([1,0.843,0])(MAP(t_map04)(rot_domain));
var t_tor2 = COLOR([1,0.843,0])(T([2])([3.18])(MAP(torus(3.09,0.05))(domainTorus)));
var top_part_02 = S([0,1,2])([1.9,1.9,1.2])(T([2])([-4])(STRUCT([t_surf03,t_surf04,t_tor2])));

var t_p05 = BEZIER(S0)([[1.6,0,0.37], [2.06,0,1.04], [2.67,0,2.19], [2.9,0,2.99],[2.94,0,3.07], [2.97,0,3.1], [3.1,0,3.14]]);
var t_p06 = BEZIER(S0)([[1.54,0,0.37], [2,0,1.04], [2.61,0,2.19], [2.84,0,2.99],[2.88,0,3.07], [2.91,0,3.1], [3.1,0,3.24]]);
var t_p07 = BEZIER(S0)([[0,0,-0.5],[1.01,0,-0.5],[1.25,0,-0.01],[1.6,0,0.37]]);
var t_p08 = BEZIER(S0)([[-0.01,0,-0.5],[1,0,-0.5],[1.24,0,-0.01],[1.54,0,0.37]]);
var t_map05 = ROTATIONAL_SURFACE(t_p05);
var t_map06 = ROTATIONAL_SURFACE(t_p06);
var t_map07 = ROTATIONAL_SURFACE(t_p07);
var t_map08 = ROTATIONAL_SURFACE(t_p08);
var t_surf05 = COLOR([1,0,0])(EXTRUDE([3])(MAP(t_map05)(rot_domain)));
var t_surf07 = COLOR([1,0,0])(EXTRUDE([3])(MAP(t_map07)(rot_domain)));
var t_surf06 = COLOR([1,0.843,0])(MAP(t_map06)(rot_domain));
var t_surf08 = COLOR([1,0.843,0])(MAP(t_map08)(rot_domain));
var t_tor3 = COLOR([1,0.843,0])(T([2])([3.18])(MAP(torus(3.09,0.05))(domainTorus)));
var top_part_03 = S([0,1,2])([3.7,3.7,1.2])(T([2])([-5])(STRUCT([t_surf05,t_surf06,t_surf07,t_surf08,t_tor3])));
var top_part_04 = COLOR([1,0.843,0])(T([2])([-6.8])(EXTRUDE([0.3])(DISK(3.1)([50,1]))));

var t_p09 = BEZIER(S0)([[0.16,0,0.1],[0.16,0,-0.18],[0.14,0,-0.41],[0.27,0,-0.44]]);
var t_p10 = COLOR([1,0.843,0])(T([2])([-1.24])(EXTRUDE([0.1])(DISK(0.269)([50,1]))));
var t_p11 = BEZIER(S0)([[0.23,0,0.56],[0.24,0,0.67],[0.20,0,0.79],[0,0,0.85]]);
var t_map09 = ROTATIONAL_SURFACE(t_p09);
var t_map11 = ROTATIONAL_SURFACE(t_p11);
var t_surf09 = COLOR([1,0.843,0])(T([2])([-0.7])(MAP(t_map09)(rot_domain)));
var t_surf11 = COLOR([1,0.843,0])(T([2])([-0.68])(R([0,2])(PI)(MAP(t_map11)(rot_domain))));
var top_part_05 = S([0,1,2])([3.7,3.7,1.2])(T([2])([-5])(STRUCT([t_surf09,t_surf11,t_p10])));

var top_lamp = STRUCT([top_part_01,top_part_02,top_part_03,top_part_04,top_part_05]);

//Bottom parts
var p03 = BEZIER(S0)([[0,0,-0.3],[0.72,0,-0.3],[0.61,0,-0.3],[1.33,0,-0.3]]);
var p04 = BEZIER(S0)([[1.33,0,-0.3],[1.33,0,1.19],[1.33,0,2.7],[1.36,0, 2.79],[1.38,0,2.81],[1.47,0,2.82]]);
var map03 = ROTATIONAL_SURFACE(p03);
var map04 = ROTATIONAL_SURFACE(p04);
var surf03 = MAP(map03)(rot_domain);
var surf04 = MAP(map04)(rot_domain);
var surf05 = T([2])([2.82])(EXTRUDE([0.1])(DISK(1.5)([50,1])));
var t_tor4 = COLOR([1,0.843,0])(T([2])([2.869])(MAP(torus(1.5,0.051))(domainTorus)));
var part_02 = T([2])([0.6])(STRUCT([surf03,surf04,surf05,t_tor4]));
var part_03 = T([2])([1.3])(S([0,1,2])([0.65,0.65,1])(part_02));

var p05 = BEZIER(S0)([[0,0,4.1],[0.33,0,4.1],[0.66,0,4.1],[0.77,0,4.1]]);
var p06 = BEZIER(S0)([[1.33,0, 3.36], [1.33,0,3.76], [1.33,0,3.75], [0.77,0,4.1]]);
var map05 = ROTATIONAL_SURFACE(p05);
var map06 = ROTATIONAL_SURFACE(p06);
var surf06 = MAP(map05)(rot_domain);
var surf07 = MAP(map06)(rot_domain);
var surf08 = T([2])([1.8])(EXTRUDE([1.6])(DISK(1.33)([50,1])));
var part_04 = T([2])([2.8])(S([0,1,2])([0.58,0.58,0.9])(STRUCT([surf06,surf07,surf08])));
var cylinder = T([2])([6.3])(CYL_SURFACE([0.5,15])([50,1]));

var p10 = BEZIER(S0)([[0.49,0,0.15],[0.8,0,0.35],[0.52,0,0.51],[1.04,0,0.52]]);
var p11 = BEZIER(S0)([[1.2,0,0.09],[1.71,0,0.36],[1.63,0,0.34],[1.7,0,0.78]]);
var map10 = ROTATIONAL_SURFACE(p10);
var map11 = ROTATIONAL_SURFACE(p11);
var surf10 = T([2])([21.13])(MAP(map10)(rot_domain));
var surf11 = T([2])([24.4])(MAP(map11)(rot_domain));
var cylinder2 = T([2])([21.65])(EXTRUDE([2.85])(DISK(1.2)([50,1])))
var base = T([2])([25.12])(EXTRUDE([0.38])(DISK(5.7)([50,1])))
var part_05 = STRUCT([surf10,cylinder2]);
var part_06 = STRUCT([surf11,base]);
var bottom_lamp = COLOR([1,0.843,0])(STRUCT([part_02,part_03,part_04,cylinder,part_05,part_06]));

//LightBulb
var bulb_p = BEZIER(S0)([[1.6,2,3.5],[2,2,4.5],[1.6,2,4.5],[1.6,2,4.5],[3,3,4.5],[3,3,5.5],[3,3,5.5],[3.5,3.5,7.5],[3.5,3.5,7.5],[3.5,3.5,7.5],
	[3,3,9],[3,3,9],[3,3,9],[1,1,9.5],[1,1,9.5],[0,0,9.5],[0,0,9.5]]);
var socket_p = BEZIER(S0)([[0,0,0],[2.5,2.5,0.1],[2.5,2.5,0.1],[2.5,2.5,0.1],[2.5,2.5,0.1],[2.5,2.5,2.5],[2.5,2.5,2.5],[2.5,2.5,2.5],[2.5,2.5,2.5],[2.5,2.5,4],[2.5,2.5,4],[2.5,2.5,4],[1,1,3.5]]);
var map_s = ROTATIONAL_SURFACE(socket_p);
var map_b = ROTATIONAL_SURFACE(bulb_p);
var bulb_socket = COLOR([0,0,0])(T([2])([1])(R([0,2])(PI)(S([0,1,2])([0.3,0.3,0.3])(MAP(map_s)(rot_domain)))));
var bulb = COLOR([1,1,1])(T([2])([2])(R([0,2])(PI)(S([0,1,2])([0.4,0.4,0.5])(MAP(map_b)(rot_domain)))));
var lightBulb = T([2])([-0.3])(STRUCT([bulb_socket,bulb]));

//Pillars
var pillar1 = T([0,2])([-2.5,0.6])(R([0,2])(PI/2)(CYL_SURFACE([0.1,5])([50,1])));
var pillar2 = T([0,2])([-1.7,-6.8])(CYL_SURFACE([0.1,7.4])([50,1]));
var pillar3 = T([0,2])([1.7,-6.8])(CYL_SURFACE([0.1,7.4])([50,1]));
var pillar4 = T([0,2])([-3.3,-4])(R([0,2])(PI/2)(CYL_SURFACE([0.1,6.6])([50,1])));
var pillars = COLOR([1,0.843,0])(STRUCT([pillar1,pillar2,pillar3,pillar4]));

//Lamp
var model = STRUCT([top_lamp,bottom_lamp,lightBulb,pillars]);

