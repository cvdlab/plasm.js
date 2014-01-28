/*--------------------------------------------------------------
Model taken from TEAM FORTRESS 2, Sentry Gun
Level 1, PACE GIOVANNI
--------------------------------------------------------------*/

/*--------------------------------------------------------------
Declaration of Domain functions and util functions
like annulus sector.
--------------------------------------------------------------*/
var domain2D = INTERVALS(1)(32);
var domain3D = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(20)]);
var domain_1 = DOMAIN([[0,1],[0,2*PI]])([50,50]);

function annulus_sector (alpha, r, R) {
  var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  return model;
}

/*--------------------------------------------------------------
Shell holder in Red
--------------------------------------------------------------*/
function draw_shell_container(x,y,z){
	var shell_cont_1 = [[0,0,0],[7,0,0],[7,0,0.2],[7,0,0],[7,0,1],[5.5,0,5]];
	var shell_cont_2 = [[0,0,5.5],[5.3,0,5.2],[5.5,0,5.1],[5.5,0,5]];
	var shell_p_1 = BEZIER(S0)(shell_cont_1);
	var shell_p_2 = BEZIER(S0)(shell_cont_2);
	var mapping_1 = ROTATIONAL_SURFACE(shell_p_1);
	var mapping_2 = ROTATIONAL_SURFACE(shell_p_2);
	var surface_1 = MAP(mapping_1)(domain_1);
	var surface_2 = MAP(mapping_2)(domain_1);
	surface_shell = COLOR([1,0,0])(STRUCT([surface_1,surface_2]))
	
	black_ann = annulus_sector(2*PI,0.1,3.5);
	black_ann = EXTRUDE([0.4])(black_ann);
	black_ann = COLOR([0.2,0.2,0.2])(T([2])([5.0])(black_ann))
	body = STRUCT([surface_shell,black_ann]);
	body = T([0,1,2])([x,y,z])(body)
	return body;
}

/*--------------------------------------------------------------
Junction of shell holder and the gun fire
--------------------------------------------------------------*/
function jun_shell(x,y,z,s,color,length){
	//d is the distance of the junction.
	var d = length; 
	//Declaring the control points of only one side, the left.
	var racc_p1 = [[0,0,0],[-2.9,0,0],[-3,0,0],[-3,0,0.1],[-3,0,3.6],[-3,0,1.6],[-3,0,3.7],[-2.9,0,3.7],[0,0,3.7]];
	var racc_p2 = [[0,d,0],[-2.9,d,0],[-3,d,0],[-3,d,0.1],[-3,d,3.6],[-3,d,1.6],[-3,d,3.7],[-2.9,d,3.7],[0,d,3.7]];	
	var racc_p1_int = [[0,0,0.5],[-2.5,0,0.5],[-2.6,0,0.5],[-2.6,0,0.6],[-2.6,0,3.4],[-2.6,0,1.4],[-2.6,0,3.2],[-2.5,0,3.2],[0,0,3.2]];
	var racc_p2_int = [[0,d,0.5],[-2.5,d,0.5],[-2.6,d,0.5],[-2.6,d,0.6],[-2.6,d,3.4],[-2.6,d,1.4],[-2.6,d,3.2],[-2.5,d,3.2],[0,d,3.2]];
	
	
	var racc_mapping_1 = BEZIER(S0)(racc_p1);
	var racc_mapping_2 = BEZIER(S0)(racc_p2);
	var racc_mapping_1_int = BEZIER(S0)(racc_p1_int);
	var racc_mapping_2_int = BEZIER(S0)(racc_p2_int);
	
	var curve_1 = MAP(racc_mapping_1)(domain2D);
	var curve_2 = MAP(racc_mapping_2)(domain2D);		
	var curve_1_int = MAP(racc_mapping_1_int)(domain2D);
	var curve_1_int = MAP(racc_mapping_1_int)(domain2D);
	
	//Modelling only the left part of the junction.
	var model_left =  MAP(BEZIER(S1)([racc_mapping_1,racc_mapping_2]))(domain3D);
	var model_left_1 =  MAP(BEZIER(S1)([racc_mapping_1,racc_mapping_1_int]))(domain3D);
	var model_left_2 =  MAP(BEZIER(S1)([racc_mapping_2,racc_mapping_2_int]))(domain3D);
	
	model_left = STRUCT([model_left,model_left_1,model_left_2])
	
	//Refactoring of the dimensions and creation of the model.
	var model_right = ROTATE([0,1])(PI)(model_left);
	var model_right = T([1])([d])(model_right);
	
	//Union of two sides
	model = STRUCT([model_left,model_right])	
	
	//Scaling the model for reuse this original function
	var model = SCALE([0,1,2])([s,s,s])(model);
	model = COLOR(color)(model);
	
	model = T([0,1,2])([x,y,z])(model)
	return model;
}

/*--------------------------------------------------------------
Covering plate in front of the gun fire with the red LED
--------------------------------------------------------------*/
function covering(x,y,z,s,color){
	var racc_p1 = [[0,0,0],[-2.9,0,0],[-3,0,0],[-3,0,0.1],[-3,0,3.6],[-3,0,1.6],[-3,0,3.7],[-2.9,0,3.7],[0,0,3.7]];
	var racc_p1_int = [[0,0,0]];
	
	var racc_mapping_1 = BEZIER(S0)(racc_p1);
	var racc_mapping_1_int = BEZIER(S0)(racc_p1_int);	
	var curve_1 = MAP(racc_mapping_1)(domain2D);	
	var curve_1_int = MAP(racc_mapping_1_int)(domain2D);	
	var model_left_1 =  MAP(BEZIER(S1)([racc_mapping_1,racc_mapping_1_int]))(domain3D);	
	model_left = STRUCT([model_left_1])	
	//Refactoring of the dimensions and creation of the model.
	var model_right = ROTATE([0,1])(PI)(model_left);
	var model_right = T([1])([0])(model_right);	
	//Union of two sides
	cover = STRUCT([model_left,model_right])		
	//Scaling the model for reuse this original function
	var cover = SCALE([0,1,2])([s,s,s])(cover);
	cover = COLOR(color)(cover);	
	cover = T([0,1,2])([x,y,z])(cover)	
		
	hole_1 = annulus_sector(2*PI,0.7,1);
	hole_1 = EXTRUDE([1.5])(hole_1);
	hole_1 = COLOR([0.2,0.2,0.2])(T([2,1,0])([0,2.5,1])(hole_1))
	hole_1 = ROTATE([1,2])(PI/2)(hole_1);
	
	hole_2 = annulus_sector(2*PI,0.2,0.3);
	hole_2 = EXTRUDE([1])(hole_2);
	hole_2 = COLOR([0.2,0.2,0.2])(T([2,1,0])([0,2,-2])(hole_2))
	hole_2 = ROTATE([1,2])(PI/2)(hole_2);
	
	led = annulus_sector(2*PI,0,0.2);
	led = EXTRUDE([0.5])(led);
	led = COLOR([1,0,0])(T([2,1,0])([0,2.9,-2])(led))
	led = ROTATE([1,2])(PI/2)(led);
	
	cover_total = STRUCT([cover,hole_1,hole_2,led])
	
	return cover_total;
}


/*--------------------------------------------------------------
Declaration of one single object, HEAD
--------------------------------------------------------------*/
function head(x,y,z){
	var s1 = draw_shell_container(0,15,0);
	var s2 = jun_shell(0,7,0.55,1.1,[1,0,0],2.5);
	var s3 = jun_shell(0,0,0.75,1,[0.2,0.2,0.2],7);
	var s4 = covering(0,0,0.75,1,[0.2,0.2,0.2]);
	
	total = STRUCT([s1,s2,s3,s4]);
	total = T([0,1,2])([x,y,z])(total);
	return total;
}

/*--------------------------------------------------------------
Main holder of the Head and the junction bars, as you 
can see it's not so difficult read and associate the name
to the objects for the name form.
--------------------------------------------------------------*/
function holder(x,y,z){
	var hor = CUBOID([3.3,2,0.2]);
	var ver = CUBOID([0.2,2,3.4]);
	ver = T([0])([3.1])(ver);
	
	structure = COLOR([0.25,0.25,0.25])(STRUCT([hor,ver]));
	
	pern_1 = annulus_sector(2*PI,0,0.7);
	pern_1 = EXTRUDE([0.5])(pern_1);
	pern_1 = ROTATE([0,2])(PI/2)(pern_1);
	pern_1 = T([0,1,2])([2.9,1,2.4])(pern_1);
	
	pern_2 = annulus_sector(2*PI,0,0.2);
	pern_2 = EXTRUDE([1])(pern_2);
	pern_2 = ROTATE([0,2])(PI/2)(pern_2);
	pern_2 = T([0,1,2])([2.9,1,2.4])(pern_2);
	
	perns =  COLOR([0.2,0.2,0.2])(STRUCT([pern_1, pern_2]));
	
	var total_left = STRUCT([structure,perns]);
	
	var total_right = ROTATE([0,1])(PI)(total_left);
	total_right = T([1])([2])(total_right)
	
	arc = COLOR([0.3,0.3,0.3])(annulus_sector(PI,0,1));
	arc = EXTRUDE([0.2])(arc);
	arc = ROTATE([0,1])(PI/2)(arc);	
	arc = ROTATE([0,2])(3/2*PI)(arc);
	arc_1 = T([0,1,2])([1,1,0])(arc);
	arc_2 = T([0,1,2])([-1,1,0])(arc);
	arc = STRUCT([arc_1,arc_2]);
	
	pern_main = annulus_sector(2*PI,0,0.2);
	pern_main = EXTRUDE([3])(pern_main);
	pern_main = ROTATE([0,2])(PI/2)(pern_main);
	pern_main = T([0,1,2])([-1.5,1,-0.5])(pern_main);
	
	arc_shell = STRUCT([arc_1,arc_2]);	
	arc_shell = T([0,1,2])([0,12.5,0])(arc_shell);	
	pern_shell = T([0,1,2])([0,12.5,0])(pern_main);
	
	jun_shell = annulus_sector(2*PI,0,0.5);
	jun_shell = EXTRUDE([1.5])(jun_shell);
	jun_shell = ROTATE([0,2])(PI/2)(jun_shell);
	jun_shell = T([0,1,2])([-0.85,13.4,-0.4])(jun_shell);
	
	total = STRUCT([total_left,total_right, arc,pern_main,arc_shell,pern_shell,jun_shell]);
	total = T([0,1,2])([x,y,z])(total);
	return total;
}

/*--------------------------------------------------------------
Declaration of rotating basement for the sentry
--------------------------------------------------------------*/
function rotating_basement(x,y,z){
	bar_1 = annulus_sector(2*PI,0,1.1);
	bar_1 = COLOR([0.3,0.3,0.3])(EXTRUDE([3])(bar_1));
	bar_1 = T([2])([9])(bar_1);
	
	bar_2 = annulus_sector(2*PI,0,0.9);
	bar_2 = COLOR([0.5,0.5,0.5])(EXTRUDE([9])(bar_2));
	bar_2 = T([2])([5])(bar_2)
	
	bar_3 = annulus_sector(2*PI,0,3);
	bar_3 = COLOR([0.3,0.3,0.3])(EXTRUDE([0.2])(bar_3));
	bar_3 = T([2])([12])(bar_3);
	
	arc = COLOR([0.3,0.3,0.3])(annulus_sector(PI,0,1));
	arc = EXTRUDE([0.2])(arc);
	arc = ROTATE([0,1])(PI/2)(arc);	
	arc = ROTATE([0,2])(3/2*PI)(arc);	
	arc = ROTATE([1,2])(PI)(arc);	
	arc_1 = T([0,1,2])([1,1.8,12])(arc);
	arc_2 = T([0,1,2])([-1,1.7,12])(arc);
	arc = STRUCT([arc_1,arc_2]);
	
	pern_main = annulus_sector(2*PI,0,0.2);
	pern_main = EXTRUDE([3])(pern_main);
	pern_main = ROTATE([0,2])(PI/2)(pern_main);
	pern_main = T([0,1,2])([-1.5,1.6,12.5])(pern_main);
	
	jun_1 = annulus_sector(2*PI,0,0.5);
	jun_1 = EXTRUDE([1.5])(jun_1);
	jun_1 = ROTATE([0,2])(PI/2)(jun_1);
	jun_1 = T([0,1,2])([-0.85,1.6,12.5])(jun_1);
	
	bar_jun_1 = CUBOID([1.2,0.2,5])
	bar_jun_1 = ROTATE([1,2])(PI*1.4)(bar_jun_1);
	bar_jun_1 = T([0,1,2])([-0.7,1.7,13])(bar_jun_1);
	
	jun_2 = annulus_sector(2*PI,0,0.5);
	jun_2 = EXTRUDE([1.5])(jun_2);
	jun_2 = ROTATE([0,2])(PI/2)(jun_2);
	jun_2 = T([0,1,2])([-0.85,6.6,11.2])(jun_2);
	
	pern_jun = annulus_sector(2*PI,0,0.2);
	pern_jun = EXTRUDE([2])(pern_jun);
	pern_jun = ROTATE([0,2])(PI/2)(pern_jun);
	pern_jun = T([0,1,2])([-1.1,6.6,11.2])(pern_jun);
	
	bar_jun_2 = CUBOID([1.2,0.2,6.4])
	bar_jun_2 = ROTATE([1,2])(PI*1.65)(bar_jun_2);
	bar_jun_2 = T([0,1,2])([-0.7,6.3,11])(bar_jun_2);
	
	total = STRUCT([bar_1,bar_2,bar_3,arc,pern_main,jun_1,bar_jun_1,jun_2,pern_jun,bar_jun_2])
	total = T([0,1,2])([x,y,z])(total);
	return total;
}

/*--------------------------------------------------------------
Rear legs surface made by extruding simplicial complex
--------------------------------------------------------------*/
function legs(x,y,z){
	var points = [[0,0],[1,0],[1,1],[3.5,1],[4,2],[5.4,1],[5.6,2],[9.5,3],[9,4.5],[13,3],[10,5],[12.5,8],[6,7],[6.5,6.5]];
	var cells = [[0,1,2],[1,2,3],[3,4,2],[3,4,5],[4,5,6],[5,6,7],[6,7,8],[7,8,9],[8,9,10],[9,10,11],[10,11,12]];
	var lateral_sur = SIMPLICIAL_COMPLEX(points)(cells);
	
	arc = annulus_sector(PI,0,1.5);
	arc = EXTRUDE([0.4])(arc);
	arc = ROTATE([0,1])(PI/2)(arc);	
	arc = ROTATE([0,2])(3/2*PI)(arc);	
	arc = ROTATE([1,2])(PI*1.45)(arc);	
	arc_1 = T([0,1,2])([0,-12.5,5.47])(arc);
	
	arc_2 = annulus_sector(PI,1.8,2.5);
	arc_2 = EXTRUDE([0.4])(arc_2);
	arc_2 = ROTATE([0,1])(PI/2)(arc_2);	
	arc_2 = ROTATE([0,2])(3/2*PI)(arc_2);	
	arc_2 = ROTATE([1,2])(PI*1.45)(arc_2);	
	arc_2 = T([0,1,2])([0,-12.5,5.47])(arc_2);
	arc = STRUCT([arc_1,arc_2]);
	
	lateral_sur = EXTRUDE([0.4])(lateral_sur);	
	lateral_sur = ROTATE([1,2])(PI/2)(lateral_sur);
	lateral_sur = ROTATE([0,1])(PI*3/2)(lateral_sur);
	
	var total = COLOR([0.5,0.5,0.5])(STRUCT([lateral_sur,arc]))
	total = T([0,1,2])([x,y,z])(total);
	return total;
}


function piston_1(x,y,z){
	var container_1 = annulus_sector(2*PI,0,0.6);
	container_1 = COLOR([0.2,0.2,0.2])(EXTRUDE([0.2])(container_1));
	var container_2 = annulus_sector(2*PI,0.4,0.5);
	container_2 = EXTRUDE([0.4])(container_2);
	var container_stelus = annulus_sector(2*PI,0,0.1);
	container_stelus = EXTRUDE([4])(container_stelus);
	container_stelus = ROTATE([1,2])(PI*1.7)(container_stelus);
	container_stelus = T([2])([0.5])(container_stelus);
	var container_external = annulus_sector(2*PI,0,0.25);
	container_external = COLOR([0.2,0.2,0.2])(EXTRUDE([2])(container_external));
	container_external = T([2])([4])(container_external);
	container_external = ROTATE([1,2])(PI*1.7)(container_external);
	container_external = T([2])([0.5])(container_external);
	
	var sph_1 = [[0,0,0.5],[0.3,0,1.2],[0.5,0,0.1],[0.5,0,0]];
	var sph_p_1 = BEZIER(S0)(sph_1);
	var mapping_1 = ROTATIONAL_SURFACE(sph_p_1);
	var surface_1 = MAP(mapping_1)(domain_1);
	
	var total = STRUCT([container_1, container_2,surface_1,container_stelus,container_external])
	total = T([0,1,2])([x,y,z])(total);
	return total;
}

/*--------------------------------------------------------------
Main holding structure
--------------------------------------------------------------*/
function holding_structure (x,y,z){
	var struc_1 = legs(-4,0,0);
	var struc_2 = legs(4.4,0,0);
	
	var jun_bar_1 = CUBOID([8,0.4,0.4])
	jun_bar_1 = T([0,1,2])([-4,-1.5,0.5])(jun_bar_1);
	jun_bar_2 = T([0,1,2])([0,-2.3,0.75])(jun_bar_1);
	jun_bar_3 = T([0,1,2])([0,-3.5,0.75])(jun_bar_1);
	jun_bar_4 = T([0,1,2])([0,-7.5,2.75])(jun_bar_1);
	
	var jun_bar_main = CUBOID([8,3,0.4])
	jun_bar_main = T([0,1,2])([-4,-10,6.5])(jun_bar_main);

	var jun_bar = COLOR([0.2,0.2,0.2])(STRUCT([jun_bar_1,jun_bar_2,jun_bar_3,jun_bar_4,jun_bar_main]));
	
	var jun_1 = annulus_sector(2*PI,0,0.5);
	jun_1 = EXTRUDE([8])(jun_1);
	jun_1 = ROTATE([0,2])(PI/2)(jun_1);
	jun_1 = T([0,1,2])([-4,-10,6.7])(jun_1);
	
	var jun_2 = COLOR([0.5,0.5,0.5])(annulus_sector(2*PI,0,1.3));
	jun_2 = EXTRUDE([10])(jun_2);
	jun_2 = ROTATE([0,2])(PI/2)(jun_2);
	jun_2 = T([0,1,2])([-5,-12.5,5.5])(jun_2);
	
	var jun_3 = annulus_sector(2*PI,0.3,0.7);
	jun_3 = EXTRUDE([11])(jun_3);
	jun_3 = ROTATE([0,2])(PI/2)(jun_3);
	jun_3 = T([0,1,2])([-5.5,-12.5,5.5])(jun_3);
	var jun = STRUCT([jun_1,jun_2,jun_3])
	
	var main = COLOR([0.5,0.5,0.5])(CUBOID([3,3,3]));
	main = T([0,1,2])([-1.5,-14,4])(main);
	var main_jun = annulus_sector(2*PI,0,0.5);
	main_jun = EXTRUDE([8])(main_jun);
	main_jun = ROTATE([0,2])(PI/2)(main_jun);
	main_jun = T([0,1,2])([-4,-10,6.7])(main_jun);
	
	var bar_left =  CUBOID([0.3,3,0.3]);	
	bar_left = ROTATE([1,2])(PI*1.2)(bar_left);
	bar_left = T([0,1,2])([-5.5,-13,5.35])(bar_left);
	var bar_right =  CUBOID([0.3,3,0.3]);	
	bar_right = ROTATE([1,2])(PI*1.2)(bar_right);
	bar_right = T([0,1,2])([+5.2,-13,5.35])(bar_right);
	
	var jun_left = annulus_sector(2*PI,0,0.15);
	jun_left = EXTRUDE([1.5])(jun_left);
	jun_left = ROTATE([0,2])(PI/2)(jun_left);
	jun_left = T([0,1,2])([-5.3,-13.8,4.5])(jun_left);
	var jun_right = annulus_sector(2*PI,0,0.15);
	jun_right = EXTRUDE([1.5])(jun_right);
	jun_right = ROTATE([0,2])(PI/2)(jun_right);
	jun_right = T([0,1,2])([+3.8,-13.8,4.5])(jun_right);
	
	var piston_right = piston_1(5.35,-19.5,0)
	var piston_left = piston_1(-5.35,-19.5,0)
	var pistons = STRUCT([piston_right,piston_left])
	
	var total = STRUCT([struc_1,struc_2, jun_bar,jun,main,bar_left, bar_right, jun_left, jun_right,pistons]);
	total = T([0,1,2])([x,y,z])(total);
	return total;
}

/*--------------------------------------------------------------
Main call to the functions.
--------------------------------------------------------------*/
var head = head(0,5,0);
var holder = holder(0,7,0);
var rotate = rotating_basement(0,8,-14.3);
var basement = holding_structure(0,20.5,-13);
sentry_gun = STRUCT([head,holder,rotate,basement]);
sentry_gun = T([0,1,2])([-1,-10,5])(sentry_gun);

model = sentry_gun;

