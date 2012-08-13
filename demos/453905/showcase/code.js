var domain = INTERVALS(1)(50);
var domain1 = DOMAIN([[0,1],[0,1]])([50,50]);

function knots (points) {
  var m = points.length;
  var k = 2; //grado della curva, per ora pari a 2 (sempre)
  var n = (m + k + 1);
  var l = n - 3; //numeo da cui si parte per terminare la sequenza
  var j = 1; // primo elemento della sequenza
  var knots = [];
  for (var i = 0; i < 3; i++) {
    knots[i] = 0;
  };
  for (var i = 3; i < l; i++, j++) {
    knots[i] = j;
  };
  for (var i = l; i < n; i++) {
    knots[i] = j;
};
 return knots;
};

//Frontale, lato sinistro
var controlpoints1 = [[30,0,0],[10,0,0],[2,0,0],[0,0,0],[0,2,0]];
var controlpoints2 = [[0,10.5,0],[10,10.5,0],[30,10.5,0]];
var controlpoints3 = [[0,2,0],[0,4,0],[0,10.5,0]];
var controlpoints4 = [[30,10.5,0],[30,5.5,0],[30,0,0]];

var knots1 = knots(controlpoints1);
var knots2 = knots(controlpoints2);
var knots3 = knots(controlpoints3);
var knots4 = knots(controlpoints4);

var curva_spline1 = NUBS(S0)(2)(knots1)(controlpoints1);
var curva_spline2 = NUBS(S0)(2)(knots2)(controlpoints2);
var curva_spline3 = NUBS(S0)(2)(knots3)(controlpoints3);
var curva_spline4 = NUBS(S0)(2)(knots4)(controlpoints4);

var points_surf1 = [curva_spline1, curva_spline2, [0,0,0], [0,0,0]];
var block1 = CUBIC_HERMITE(S1)(points_surf1);
var block1a = MAP(block1)(domain1);

var points_surf2 = [curva_spline3, curva_spline4, [0,0,0], [0,0,0]];
var block2 = CUBIC_HERMITE(S1)(points_surf2);
var block2a = MAP(block2)(domain1);

var frontale_sx = STRUCT([block1a,block2a]);

//Centrale
var controlpoints5 = [[30,10.5,0],[33,10.5,0],[35,10.5,0]];
/*var controlpoints6 = [[30,7.5,0],[33,7.5,0],[35,7.5,0]];
var controlpoints7 = [[30,2.5,0],[33,2.5,0],[35,2.5,0]];*/
var controlpoints8 = [[30,0,0],[33,0,0],[35,0,0]];

var knots5 = knots(controlpoints5);
/*var knots6 = knots(controlpoints6);
var knots7 = knots(controlpoints7);*/
var knots8 = knots(controlpoints8);

var curva_spline5 = NUBS(S0)(2)(knots5)(controlpoints5);
/*var curva_spline6 = NUBS(S0)(2)(knots6)(controlpoints6);
var curva_spline7 = NUBS(S0)(2)(knots7)(controlpoints7);*/
var curva_spline8 = NUBS(S0)(2)(knots8)(controlpoints8);

var points_surf3 = [curva_spline5, curva_spline8, [0,0,0], [0,0,0]];
var block3 = CUBIC_HERMITE(S1)(points_surf3);
var block3a = MAP(block3)(domain1);

/*var points_surf4 = [curva_spline7, curva_spline8, [0,0,0], [0,0,0]];
var block4 = CUBIC_HERMITE(S1)(points_surf4);
var block4a = MAP(block4)(domain1);*/

var frontale_centro = STRUCT([block3a]);

//frontale destro
var controlpoints9 = [[35,0,0],[50,0,0],[63,0,0],[65,0,0],[65,2,0]];
var controlpoints10 = [[35,10.5,0],[50,10.5,0],[65,10.5,0]];
var controlpoints11 = [[65,2,0],[65,4,0],[65,10.5,0]];
var controlpoints12 = [[35,10.5,0],[35,5.5,0],[35,0,0]];

var knots9 = knots(controlpoints9);
var knots10 = knots(controlpoints10);
var knots11 = knots(controlpoints11);
var knots12 = knots(controlpoints12);

var curva_spline9 = NUBS(S0)(2)(knots9)(controlpoints9);
var curva_spline10 = NUBS(S0)(2)(knots10)(controlpoints10);
var curva_spline11 = NUBS(S0)(2)(knots11)(controlpoints11);
var curva_spline12 = NUBS(S0)(2)(knots12)(controlpoints12);

var points_surf5 = [curva_spline9, curva_spline10, [0,0,0], [0,0,0]];
var block5 = CUBIC_HERMITE(S1)(points_surf5);
var block5a = MAP(block5)(domain1);

var points_surf6 = [curva_spline11, curva_spline12, [0,0,0], [0,0,0]];
var block6 = CUBIC_HERMITE(S1)(points_surf6);
var block6a = MAP(block6)(domain1);

var frontale_dx = STRUCT([block5a,block6a]);

//frontale cornice sup inf
var controlpoints13 = [[0,44.5,0],[10,44.5,0],[50,44.5,0],[65,44.5,0]];
var controlpoints14 = [[0,45,0],[0,47,0],[2,47,0],[10,47,0],[50,47,0],[63,47,0],[65,47,0],[65,45,0]];
var controlpoints19 = [[0,12,0],[30,12,0],[65,12,0]];
var controlpoints20 = [[0,10.5,0],[30,10.5,0],[65,10.5,0]];

var knots13 = knots(controlpoints13);
var knots14 = knots(controlpoints14);
var knots19 = knots(controlpoints19);
var knots20 = knots(controlpoints20);

var curva_spline13 = NUBS(S0)(2)(knots13)(controlpoints13);
var curva_spline14 = NUBS(S0)(2)(knots14)(controlpoints14);
var curva_spline19 = NUBS(S0)(2)(knots19)(controlpoints19);
var curva_spline20 = NUBS(S0)(2)(knots20)(controlpoints20);

var points_surf7 = [curva_spline13, curva_spline14, [0,0,0], [0,0,0]];
var block7 = CUBIC_HERMITE(S1)(points_surf7);
var block7a = MAP(block7)(domain1);

var points_surf10 = [curva_spline19, curva_spline20, [0,0,0], [0,0,0]];
var block10 = CUBIC_HERMITE(S1)(points_surf10);
var block10a = MAP(block10)(domain1);

var frontale_sup = COLOR([0,0,0])(STRUCT([block7a, block10a]));

//frontale cornice sx e dx
var controlpoints15 = [[0,10.5,0],[0,25,0],[0,44.5,0]];
var controlpoints16 = [[2.5,10.5,0],[2.5,25,0],[2.5,44.5,0]];
var controlpoints17 = [[62.5,10.5,0],[62.5,25,0],[62.5,44.5,0]];
var controlpoints18 = [[65,10.5,0],[65,25,0],[65,44.5,0]];

var knots15 = knots(controlpoints15);
var knots16 = knots(controlpoints16);
var knots17 = knots(controlpoints17);
var knots18 = knots(controlpoints18);

var curva_spline15 = NUBS(S0)(2)(knots15)(controlpoints15);
var curva_spline16 = NUBS(S0)(2)(knots16)(controlpoints16);
var curva_spline17 = NUBS(S0)(2)(knots17)(controlpoints17);
var curva_spline18 = NUBS(S0)(2)(knots18)(controlpoints18);

var points_surf8 = [curva_spline15, curva_spline16, [0,0,0], [0,0,0]];
var block8 = CUBIC_HERMITE(S1)(points_surf8);
var block8a = MAP(block8)(domain1);

var points_surf9 = [curva_spline17, curva_spline18, [0,0,0], [0,0,0]];
var block9 = CUBIC_HERMITE(S1)(points_surf9);
var block9a = MAP(block9)(domain1);

var frontale_side = COLOR([0,0,0])(STRUCT([block8a, block9a]));

var frontale = STRUCT([frontale_sx, frontale_centro, frontale_dx, frontale_sup, frontale_side]);

//spessore sup
var controlpoints21 = [[0,45,0],[0,47,0],[2,47,0],[10,47,0],[50,47,0],[63,47,0],[65,47,0],[65,45,0]];
var controlpoints22 = [[0,45,-4],[0,47,-4],[2,47,-4],[10,47,-4],[50,47,-4],[63,47,-4],[65,47,-4],[65,45,-4]];

var knots21 = knots(controlpoints21);
var knots22 = knots(controlpoints22);

var curva_spline21 = NUBS(S0)(2)(knots21)(controlpoints21);
var curva_spline22 = NUBS(S0)(2)(knots22)(controlpoints22);

var points_surf11 = [curva_spline21, curva_spline22, [0,0,0], [0,0,0]];
var block11 = CUBIC_HERMITE(S1)(points_surf11);
var block11a = MAP(block11)(domain1);

//spessore sx
var controlpoints23 = [[0,45,0],[0,30,0],[0,10,0],[0,2,0]];
var controlpoints24 = [[0,45,-4],[0,30,-4],[0,10,-4],[0,2,-4]];

var knots23 = knots(controlpoints23);
var knots24 = knots(controlpoints24);

var curva_spline23 = NUBS(S0)(2)(knots23)(controlpoints23);
var curva_spline24 = NUBS(S0)(2)(knots24)(controlpoints24);

var points_surf12 = [curva_spline23, curva_spline24, [0,0,0], [0,0,0]];
var block12 = CUBIC_HERMITE(S1)(points_surf12);
var block12a = MAP(block12)(domain1);

//spessore inf
var controlpoints25 = [[0,2,0],[0,0,0],[2,0,0],[30,0,0],[50,0,0],[63,0,0],[65,0,0],[65,2,0]];
var controlpoints26 = [[0,2,-4],[0,0,-4],[2,0,-4],[30,0,-4],[50,0,-4],[63,0,-4],[65,0,-4],[65,2,-4]];

var knots25 = knots(controlpoints25);
var knots26 = knots(controlpoints26);

var curva_spline25 = NUBS(S0)(2)(knots25)(controlpoints25);
var curva_spline26 = NUBS(S0)(2)(knots26)(controlpoints26);

var points_surf13 = [curva_spline25, curva_spline26, [0,0,0], [0,0,0]];
var block13 = CUBIC_HERMITE(S1)(points_surf13);
var block13a = MAP(block13)(domain1);

//spessore dx
var controlpoints27 = [[65,45,0],[65,30,0],[65,10,0],[65,2,0]];
var controlpoints28 = [[65,45,-4],[65,30,-4],[65,10,-4],[65,2,-4]];

var knots27 = knots(controlpoints27);
var knots28 = knots(controlpoints28);

var curva_spline27 = NUBS(S0)(2)(knots27)(controlpoints27);
var curva_spline28 = NUBS(S0)(2)(knots28)(controlpoints28);

var points_surf14 = [curva_spline27, curva_spline28, [0,0,0], [0,0,0]];
var block14 = CUBIC_HERMITE(S1)(points_surf14);
var block14a = MAP(block14)(domain1);

var spessore = STRUCT([block11a, block12a, block13a, block14a]);

//dvd_bay
var controlpoints29 = [[0.5,0.25,0],[0.5,0,0],[5,0,0],[11.5,0,0],[11.5,0.25,0]];
var controlpoints30 = [[0.5,0.25,0],[0.5,0.5,0],[5,0.5,0],[11.5,0.5,0],[11.5,0.25,0]];

var knots29 = knots(controlpoints29);
var knots30 = knots(controlpoints30);

var curva_spline29 = NUBS(S0)(2)(knots29)(controlpoints29);
var curva_spline30 = NUBS(S0)(2)(knots30)(controlpoints30);

var points_surf15 = [curva_spline29, curva_spline30, [0,0,0], [0,0,0]];
var block15 = CUBIC_HERMITE(S1)(points_surf15);
var block15a = MAP(block15)(domain1);
var dvd_bay = COLOR([0,0,0])(T([0,1,2])([65.02,27,-3.3])(R([0,2])(PI/2)(R([0,1])(PI/2)(block15a))));

var spessore = STRUCT([block11a, block12a, block13a, block14a, dvd_bay]);

//retro
var controlpoints31 = [[0,45,-4],[0,47,-4],[2,47,-4],[10,47,-4],[50,47,-4],[63,47,-4],[65,47,-4],[65,45,-4]];
var controlpoints32 = [[0,2,-4],[0,0,-4],[2,0,-4],[30,0,-4],[50,0,-4],[63,0,-4],[65,0,-4],[65,2,-4]];

var knots31 = knots(controlpoints31);
var knots32 = knots(controlpoints32);

var curva_spline31 = NUBS(S0)(2)(knots31)(controlpoints31);
var curva_spline32 = NUBS(S0)(2)(knots32)(controlpoints32);

var points_surf16 = [curva_spline31, curva_spline32,[0,0,0], [0,0,0]];
var block16 = CUBIC_HERMITE(S1)(points_surf16);
var retro = MAP(block16)(domain1);

//schermo
var controlpoints33 = [[2.5,12,0],[2.5,30,0],[2.5,44.5,0]];
var controlpoints34 = [[62.5,12,0],[62.5,30,0],[62.5,44.5,0]];

var knots33 = knots(controlpoints33);
var knots34 = knots(controlpoints34);

var curva_spline33 = NUBS(S0)(2)(knots33)(controlpoints33);
var curva_spline34 = NUBS(S0)(2)(knots34)(controlpoints34);

var points_surf17 = [curva_spline33, curva_spline34, [0,0,0], [0,0,0]];
var block17 = CUBIC_HERMITE(S1)(points_surf17);
var schermo = COLOR([0.54, 0.17,0.87,1])(MAP(block17)(domain1));

//monitor
var monitor = STRUCT([frontale, spessore, retro, schermo]);


//logo apple
var logo = function (s,t,x,y,z,alpha) {
var domain = INTERVALS(1)(40);
var domain1 = DOMAIN([[0,1],[0,1]])([50,50]);

var pointsApple = [[0,4.8,0],[2,5.4,0],[4,5.6,0],[6,5,0],[7.4,3.8,0],[7.4,3.8,0],[6,2.6,0],[5.4,0,0],[6,-2,0],[8,-3.6,0],[8,-3.6,0],
[6.6,-6,0],[4.8,-8,0],[3.4,-8.6,0],[2,-8,0],[0,-7.7,0],[-1.6,-8,0],[-3,-8.6,0],[-4.4,-8,0],
[-6.2,-6,0],[-7.6,-3.6,0],[-7.8,-2,0],[-8,0,0],[-7.8,2,0],[-7,3.8,0],[-5.6,5,0],
[-3.6,5.6,0],[-1.6,5.4,0],[0,4.8,0]];

var pointsApple1 = pointsApple.map(function (p){ return [p[0]*s,p[1]*s,p[2]+0.3]});
var pointsApple2 = pointsApple.map(function (p){ return [p[0]*s,p[1]*s,p[2]+0.3]});

var knotsApple1 = knots(pointsApple1);
var knotsApple2 = knots(pointsApple2);

var curva_Apple1 = NUBS(S0)(2)(knotsApple1)(pointsApple1);
var curva_Apple2 = NUBS(S0)(2)(knotsApple2)(pointsApple2);

var punti = [curva_Apple1, curva_Apple2];
var knpti = knots(punti);
var bordoLogo = NUBS(S1)(2)(knpti)(punti);

var centrologo = [bordoLogo,[0,0,0]];
var knotslogo = knots(centrologo);
var logo = NUBS(S1)(2)(knotslogo)(centrologo);

var apple = MAP(logo)(domain1);

//foglia

var pLeaf1 = [[0,0,0],[0,2.5,0],[2,3,0.3]];
var pLeaf2 = [[0,0,0],[2.25,0.25,0],[2,3,0.3]];

var pLeaf_S1 = pLeaf1.map(function (p){ return [p[0]*s,p[1]*s,p[2]]});
var pLeaf_S2 = pLeaf2.map(function (p){ return [p[0]*s,p[1]*s,p[2]]});

var knotsLeaf1 = knots(pLeaf_S1);
var knotsLeaf2 = knots(pLeaf_S2);

var curva_Apple1 = NUBS(S0)(2)(knotsLeaf1)(pLeaf_S1);
var curva_Apple2 = NUBS(S0)(2)(knotsLeaf2)(pLeaf_S2);

var profile = [curva_Apple1,curva_Apple2,[0,0,0], [0,0,0]];
var leaf_curve = CUBIC_HERMITE(S1)(profile);

var leaf = T([1])([t])(MAP(leaf_curve)(domain1));

var logoApple = STRUCT([apple, leaf]);

var logo1 = T([0,1,2])([x,y,z])(R([0,2])([alpha])(COLOR([0,0,0])(logoApple)));

return logo1
}

var logo1 = logo(0.6,1.4,32,4,0,0);
var logo2 = logo(1.5, 3.1, 32.5,35,-4,PI);

//USB
var usb = function (x,y,z) {
var domain = INTERVALS(1)(40);
var domain1 = DOMAIN([[0,1],[0,1]])([50,50]);
var controlpoints1 = [[0.55,0.05,0],[0.55,0,0],[0.5,0,0],[0.3,0,0],[0.05,0,0],[0,0,0],[0,0.05,0],[0,0.75,0],[0,1.25,0],[0,1.3,0],[0.05,1.3,0],[0.3,1.3,0],[0.5,1.3,0],[0.55,1.3,0],[0.55,1.25,0]];
var controlpoints2 = [[0.55,0.05,0],[0.55,0.5,0],[0.55,1.25,0]];

var knots1 = knots(controlpoints1);
var knots2 = knots(controlpoints2);

var curva_spline1 = NUBS(S0)(2)(knots1)(controlpoints1);
var curva_spline2 = NUBS(S0)(2)(knots2)(controlpoints2);

var points_surf = [curva_spline1, curva_spline2, [0,0,0], [0,0,0]];
var block = CUBIC_HERMITE(S1)(points_surf);
var usb = COLOR([0,0,0])(MAP(block)(domain1));
var usb_t = T([0,1,2])([x,y,z])(usb);
return usb_t
}

var firewire = function (x,y,z) {
var domain = INTERVALS(1)(40);
var domain1 = DOMAIN([[0,1],[0,1]])([50,50]);
var controlpoints1 = [[0.55,0.05,0],[0.55,0,0],[0.5,0,0],[0.3,0,0],[0.05,0,0],[0,0,0],[0,0.05,0],[0,0.75,0],[0,0.7,0],[0,0.75,0],[0.05,0.75,0],[0.3,1.2,0],[0.5,0.75,0],[0.55,0.75,0],[0.55,0.7,0]];
var controlpoints2 = [[0.55,0.05,0],[0.55,0.5,0],[0.55,0.7,0]];

var knots1 = knots(controlpoints1);
var knots2 = knots(controlpoints2);

var curva_spline1 = NUBS(S0)(2)(knots1)(controlpoints1);
var curva_spline2 = NUBS(S0)(2)(knots2)(controlpoints2);

var points_surf = [curva_spline1, curva_spline2, [0,0,0], [0,0,0]];
var block = CUBIC_HERMITE(S1)(points_surf);
var firewire = COLOR([0,0,0])(MAP(block)(domain1));
var firewire_t = T([0,1,2])([x,y,z])(firewire);
return firewire_t
}

var minidisplay = function (x,y,z) {
var domain = INTERVALS(1)(40);
var domain1 = DOMAIN([[0,1],[0,1]])([50,50]);
var controlpoints1 = [[0.55,0.05,0],[0.55,0,0],[0.5,0,0],[0.3,0,0],[0.05,0,0],[0,0,0],[0,0.05,0],[0,0.75,0],[0,0.7,0],[0,0.75,0],[0.05,0.75,0],[0.3,0.75,0],[0.5,0.75,0],[0.55,0.75,0],[0.55,0.7,0]];
var controlpoints2 = [[0.55,0.05,0],[0.55,0.5,0],[0.55,0.7,0]];

var knots1 = knots(controlpoints1);
var knots2 = knots(controlpoints2);

var curva_spline1 = NUBS(S0)(2)(knots1)(controlpoints1);
var curva_spline2 = NUBS(S0)(2)(knots2)(controlpoints2);

var points_surf = [curva_spline1, curva_spline2, [0,0,0], [0,0,0]];
var block = CUBIC_HERMITE(S1)(points_surf);
var minidisplay = COLOR([0,0,0])(MAP(block)(domain1));
var minidisplay_t = T([0,1,2])([x,y,z])(minidisplay);
return minidisplay_t
}

var usb1 = usb(60,4,-4.1);
var usb2 = usb(58.7,4,-4.1);
var usb3 = usb(57.2,4,-4.1);
var usb4 = usb(55.7,4,-4.1);
var usb_ports = STRUCT([usb1, usb2, usb3, usb4]);

var firewire1 = firewire(54,4.1,-4.1);
var firewire2 = firewire(53,4.1,-4.1);
var firewire_ports = STRUCT([firewire1, firewire2]) 

var minidisplay1 = minidisplay(51.7, 4.1, -4.1)
 
var monitor = STRUCT([monitor, logo1, logo2, usb_ports, firewire_ports, minidisplay1]);
var monitor_r = R([1,2])([-PI/10])(monitor);



//Base

var point_base_profile1 = [[-3,0,0],[0,0,0],[20,0,0],[26,0,0],[30,0,0],[30,4,0],[13,37,0],[10,40,0],[9,40,0],[8,40,0]];
var point_base_profile2 = [[-3,0,0],[0,0,0],[20,1,0],[25,1,0],[29,1,0],[29,3,0],[12,37,0],[10,39,0],[9,39,0],[8,39,0]];

var knots_base_profile1 = knots(point_base_profile1);
var knots_base_profile2 = knots(point_base_profile2);

var curva_spline_base1 = NUBS(S0)(2)(knots_base_profile1)(point_base_profile1);
var curva_spline_base2 = NUBS(S0)(2)(knots_base_profile2)(point_base_profile2);

var point_surf_base_profile = [curva_spline_base1, curva_spline_base2, [0,0,0], [0,0,0]];
var base_profile_curve = CUBIC_HERMITE(S1)(point_surf_base_profile);

var base_profile = MAP(base_profile_curve)(domain1);
var base_profile_2 = T([2])([18])(base_profile);

//base up
var points_base_up = [[-3,0,0],[0,0,0],[20,1,0],[25,1,0],[29,1,0],[29,3,0],[12,37,0],[10,39,0],[9,39,0],[8,39,0]];
var points_base_up_t = points_base_up.map(function (p){ return [p[0],p[1],p[2]+18]});
var knots_base_base_up1 = knots(points_base_up);
var knots_base_base_up2 = knots(points_base_up_t);

var curva_spline_base_up1 = NUBS(S0)(2)(knots_base_base_up1)(points_base_up);
var curva_spline_base_up2 = NUBS(S0)(2)(knots_base_base_up2)(points_base_up_t);

var point_surf_base_profile = [curva_spline_base_up1, curva_spline_base_up2, [0,0,0], [0,0,0]];
var base_up_profile_curve = CUBIC_HERMITE(S1)(point_surf_base_profile);

var base_profile_up = MAP(base_up_profile_curve)(domain1);

//base down
var points_base_down = [[-3,0,0],[0,0,0],[20,0,0],[26,0,0],[30,0,0],[30,4,0],[13,37,0],[10,40,0],[9,40,0],[8,40,0]];
var points_base_down_t = points_base_down.map(function (p){ return [p[0],p[1],p[2]+18]});
var knots_base_base_down1 = knots(points_base_down);
var knots_base_base_down2 = knots(points_base_down_t);

var curva_spline_base_down1 = NUBS(S0)(2)(knots_base_base_down1)(points_base_down);
var curva_spline_base_down2 = NUBS(S0)(2)(knots_base_base_down2)(points_base_down_t);

var point_surf_base_profile_down = [curva_spline_base_down1, curva_spline_base_down2, [0,0,0], [0,0,0]];
var base_down_profile_curve = CUBIC_HERMITE(S1)(point_surf_base_profile_down);
var base_profile_down = MAP(base_down_profile_curve)(domain1);
var base = STRUCT([base_profile, base_profile_up,base_profile_down, base_profile_2])
var base_trasl = T([0,1,2])([24,-16,-3.5])(R([0,2])([PI/2])(base));

var scmodel = STRUCT([monitor_r, base_trasl]);
