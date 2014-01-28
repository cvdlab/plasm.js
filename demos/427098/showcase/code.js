//Author: Andrea Iuliano

/** Funzioni Ausiliari **/

function addYValue(points, y){
	return points.map(function(item){
		return [item[0],y,item[1]];
	});
}

function rgb(color){
	return [color[0]/255, color[1]/255, color[2]/255];
}

function rgba(color){
	return [color[0]/255, color[1]/255, color[2]/255, color[3]/100];
}

function degree(alpha){
	return alpha*PI/180
}

var scalePoints = function(points,values) {
	return points.map(function(item){
		return item.map(function(elem){
			return elem*values;
		});
	});
}

function traslaPointsX(points,value){
	return points.map(function(item){
		return [item[0]+value,item[1],item[2]];
	});
}


function traslaPointsY(points,value){
	return points.map(function(item){
		return [item[0],item[1]+value,item[2]];
	});
}

function traslaPointsZ(points,value){
	return points.map(function(item){
		return [item[0],item[1],item[2]+value];
	});
}

function traslateToOrigin(points){
	var minX = minValueCoordinate(points,0);
	var minY = minValueCoordinate(points,1);
	var minZ = minValueCoordinate(points,2);
	if (minX !== 0)
		points = traslaPointsX(points,-minX);
	if (minY !== 0)
		points = traslaPointsY(points,-minY);
	if (minZ !== 0)
		points = traslaPointsZ(points,-minZ);
	return points
}

function points_distance(vertex1,vertex2){
    var l_x = vertex1[0] - vertex2[0]; 
    var l_y = vertex1[1] - vertex2[1]; 
    var l_z = vertex1[2] - vertex2[2]; 
    return Math.sqrt( (Math.pow(l_x, 2)) + (Math.pow(l_y, 2)) + (Math.pow(l_z, 2)) );
}

var minValueCoordinate = function(points,axis){
	minVal = points[0][axis]
	for (i=1; i<points.length; i++)
		if (points[i][axis]<minVal)
			minVal = points[i][axis]
	return minVal
}

var maxValueCoordinate = function(points,axis){
	maxVal = points[0][axis]
	for (i=1; i<points.length; i++)
		if (points[i][axis]>maxVal)
			maxVal = points[i][axis]
	return maxVal
}


function T(dims) {
	return function (values) {
	  return function (object) {
	   return object.translate(dims, values);
	  };
	};
}

function R(dims) {
    return function (values) {
      return function (object) {
       return object.rotate(dims, values);
      };
    };
  }

function S(dims) {
    return function (values) {
      return function (object) {
       return object.scale(dims, values);
      };
    };
  }

function TC(dims) {
    return function (values) {
      return function (object) {
       return object.clone().translate(dims, values);
      };
    };
  }

function RC(dims) {
    return function (values) {
      return function (object) {
       return object.clone().rotate(dims, values);
      };
    };
  }

function SC(dims) {
    return function (values) {
      return function (object) {
       return object.clone().scale(dims, values);
      };
    };
  }

function rotateProfile(points){
	points = traslateToOrigin(points);
	var area_domain = PROD1x1([INTERVALS(1)(60),INTERVALS(1)(60)]);
	var curve_map = BEZIER(S0)(points);
	return MAP(PROFILEPROD_SURFACE([curve_map,bezier_circle_map(1,S1)]))(area_domain);
}

function rotateProfileNoTraslate(points){
	var area_domain = PROD1x1([INTERVALS(1)(60),INTERVALS(1)(60)]);
	var curve_map = BEZIER(S0)(points);
	return MAP(PROFILEPROD_SURFACE([curve_map,bezier_circle_map(1,S1)]))(area_domain);
}


function bezier_circle_map(r,selector){

	if (selector === undefined)
		selector = S0

	var base_points = [[-1,0,0],[-1,1.6,0],[1.6,1.6,0],[1.6,0,0],[1.6,-1.6,0],[-1,-1.6,0],[-1,0,0]];

	var circle_points = scalePoints(base_points,r);

	return BEZIER(selector)(circle_points)
}

function bezier_circle_not_centered_map(r,x_value,y_value,z_value,selector){

	if (selector === undefined)
		selector = S0

	var base_points = [[-1,0,0],[-1,1.6,0],[1.6,1.6,0],[1.6,0,0],[1.6,-1.6,0],[-1,-1.6,0],[-1,0,0]];

	var circle_points = scalePoints(base_points,r);

	if (x_value !== 0)
		circle_points = traslaPointsX(circle_points,x_value)
	if (y_value !== 0)
		circle_points = traslaPointsY(circle_points,y_value)
	if (z_value !== 0)
		circle_points = traslaPointsZ(circle_points,z_value)

	return BEZIER(selector)(circle_points)
}

function unifyBezierCurves(map_curve_1,map_curve_2){
	return MAP(BEZIER(S1)([map_curve_1,map_curve_2]))(PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)]));
}

function unifyAllBezierCurvers(curves){

	output = STRUCT([unifyBezierCurves(curves[0],curves[1])])
	
	for (i=1; i<curves.length; i++)
		output = STRUCT([output,unifyBezierCurves(curves[i],curves[(i+1)%curves.length]) ])

	return output
}

function cilynder(r,h){
	return EXTRUDE([h])(DISK(r)([64, 2]))
}

function sphere(r){
	var domain = DOMAIN([[0,PI],[0,2*PI]])([50,70]);
	var mapping = function (v) {
	  var a = v[0];
	  var b = v[1];

	  var u = r * SIN(a) * COS(b);
	  var v = r * SIN(a) * SIN(b);
	  var w = r * COS(a);

	  return [u,v,w];
	};

	return MAP(mapping)(domain);
}

/** Fine Funzioni Ausiliari **/

/** Inizio Modello **/

line_domain = INTERVALS(1)(32)
area_domain = PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)])

// /**    Eyes Background    **/
eyes_container_background_point1 = addYValue([[0.87, 2.75], [0.85, 2.87], [1.36, 2.88], [1.35, 2.74]],0);
eyes_container_background_point2 = addYValue([[0.87, 2.75], [0.82, 2.59], [1.4, 2.55], [1.35, 2.74]] ,0);

eyes_container_background_curve1 = BEZIER(S0)(eyes_container_background_point1) 
eyes_container_background_curve2 = BEZIER(S0)(eyes_container_background_point2) 

eyes_container_background = BEZIER(S1)([eyes_container_background_curve1,eyes_container_background_curve2])
eyes_container_background = MAP(eyes_container_background)(area_domain)
eyes_container_background = COLOR([0,0,0])(eyes_container_background)
eyes_container_background = T([1])([0.03])(eyes_container_background)

/**    Eyes Container    **/
increase_eyes_container = 1.1
eyes_container_point1 = scalePoints(eyes_container_background_point1,increase_eyes_container)
eyes_container_point2 = scalePoints(eyes_container_background_point2,increase_eyes_container)

/* Traslo i punti in seguito all'operazione di scalatura
Scalando i punti si traslano in quanto vengono moltiplicati per un fattore alfa.
Riporto l'inizio della descrizione della nuova figura alla propria posizione originale di partenza, 
suddividendo successivamente lo scarto alla fine.
es: 3 * (2,3) -> (6,9), traslo prima di -4, poi considero che la fine dista 2 dalla posizione originale (9-4 - 3)
traslo ancora di -1 sulle x così da suddividere la distanza tra inizio e fine */

trasl_x_1 = -(eyes_container_point1[0][0] - (eyes_container_point1[0][0]/increase_eyes_container)) 
trasl_x_2 = -(eyes_container_point2[0][0] - (eyes_container_point2[0][0]/increase_eyes_container)) 
trasl_z_1 = -(eyes_container_point1[0][2] - (eyes_container_point1[0][2]/increase_eyes_container))
trasl_z_2 = -(eyes_container_point2[0][2] - (eyes_container_point2[0][2]/increase_eyes_container))

eyes_container_point1 = traslaPointsZ( traslaPointsX(eyes_container_point1, trasl_x_1), trasl_z_1)
eyes_container_point2 = traslaPointsZ( traslaPointsX(eyes_container_point2, trasl_x_2), trasl_z_2)
diff_x_1 = -(eyes_container_point1[eyes_container_point1.length-1][0] - eyes_container_background_point1[eyes_container_background_point1.length-1][0] )/2  //con diff calcolo il punto medio, così da poter centrare
diff_x_2 = -(eyes_container_point2[eyes_container_point2.length-1][0] - eyes_container_background_point2[eyes_container_background_point2.length-1][0] )/2  //con diff calcolo il punto medio, così da poter centrare
eyes_container_point1 = traslaPointsX(eyes_container_point1, diff_x_1)
eyes_container_point2 = traslaPointsX(eyes_container_point2, diff_x_2)
//Fine traslazione
eyes_container_depth = 0.25
eyes_container_point3 = traslaPointsY(eyes_container_point1, eyes_container_depth)
eyes_container_point4 = traslaPointsY(eyes_container_point2, eyes_container_depth)

eyes_container_curve1 = BEZIER(S0)(eyes_container_point1)
eyes_container_curve2 = BEZIER(S0)(eyes_container_point2)
eyes_container_curve3 = BEZIER(S0)(eyes_container_point3)
eyes_container_curve4 = BEZIER(S0)(eyes_container_point4)
eyes_container_closePoint = [1.1,0.4,2.7]

eyes_container_1 = unifyAllBezierCurvers([eyes_container_background_curve1,eyes_container_curve1,eyes_container_curve3,eyes_container_closePoint])
eyes_container_2 = unifyAllBezierCurvers([eyes_container_background_curve2,eyes_container_curve2,eyes_container_curve4,eyes_container_closePoint])
eyes_container = STRUCT([ eyes_container_1,eyes_container_2 ])
eyes_container = STRUCT([eyes_container, eyes_container_background])

/**    Eyes    **/
eye_r = 0.1
eye_1 = R([1,2])(-PI/2)(cilynder(eye_r,eyes_container_depth-0.1))
eye_2 = sphere(eye_r)
eye_iris =COLOR([0,0,0])(CUBOID([0.02,0.02,0.02]))

eye_part = STRUCT([eye_1,eye_2])
eye_color = rgb([255,255,150])
eye_part = COLOR(eye_color)(eye_part)
eye_part = T([1])([eye_r/2])(eye_part)
eye = STRUCT([eye_part,TC([1])([-eye_r/2])(eye_iris)])
eyes = STRUCT([eye,TC([0])([2*eye_r])(eye)])
eyes = T([0,2])([1,2.73])(eyes)

/**    Head    **/
head_profile = scalePoints( addYValue([[1.3, 2.26], [1.29, 2.7], [1.36, 3.06], [1.09, 3.05]],0), 1.1)
head = rotateProfile(head_profile)

antenna_h = 0.2
antenna_r = 0.025
antenna_p0 = bezier_circle_map(antenna_r)
antenna_p1 = bezier_circle_not_centered_map(antenna_r * 0.7,0,0,antenna_h/2)
antenna_p2 = bezier_circle_not_centered_map(antenna_r * 0.4,0,0,antenna_h)
antenna = MAP( BEZIER(S1)([antenna_p0,antenna_p1,antenna_p2]) )(area_domain)
antenna_p3 = T([2])([antenna_h])(sphere(antenna_r))
antenna = STRUCT([antenna,antenna_p3])

head_h = maxValueCoordinate(head_profile,2)-minValueCoordinate(head_profile,2)-0.01
head_with_antenna = STRUCT([head, TC([2])([head_h])(antenna)])
head_with_antenna = T([0,1,2])([1.1, eyes_container_depth+0.1,2.27])(head_with_antenna)

/**    Mouth    **/
mouth_point1 = [[0.92,0.19,2.35], [1.085,0.05,2.34], [1.25,0.16,2.35]]
mouth_point2 = [[0.92,0.19,2.47], [1.085,0.05,2.48], [1.25,0.16,2.47]]
mouth_point3 = [[0.92,0.19,2.35], [0.9,0.2,2.41], [0.92,0.19,2.47]]
mouth_point4 = [[1.25,0.16,2.35], [1.27,0.17,2.41], [1.25,0.16,2.47]]

mouth_curve1 = BEZIER(S0)(mouth_point1)
mouth_curve2 = BEZIER(S0)(mouth_point2)
mouth_curve3 = BEZIER(S0)(mouth_point3)
mouth_curve3_coons = BEZIER(S1)(mouth_point3)
mouth_curve4 = BEZIER(S0)(mouth_point4)
mouth_curve4_coons = BEZIER(S1)(mouth_point4)

mouth_theet1_p = [[0.95,0.165,2.348],[0.95,0.16,2.41],[0.95,0.165,2.47]]
mouth_theet2_p = [[1.02,0.128,2.347],[1.02,0.12,2.41],[1.02,0.128,2.4725]]
mouth_theet3_p = [[1.08,0.1135,2.348],[1.08,0.11,2.41],[1.08,0.1135,2.472]]
mouth_theet4_p = [[1.16,0.115,2.345],[1.16,0.115,2.41],[1.16,0.115,2.471]]
mouth_theet5_p = [[1.22,0.14,2.348],[1.22,0.13,2.41],[1.22,0.14,2.47]]

mouth_theet6_p = [[0.915,0.19,2.43],[1.085,0.05,2.43],[1.255,0.16,2.43]]
mouth_theet7_p = [[0.915,0.19,2.39],[1.085,0.05,2.39],[1.255,0.16,2.39]]

mouth_theet1_c = BEZIER(S0)(mouth_theet1_p)
mouth_theet2_c = BEZIER(S0)(mouth_theet2_p)
mouth_theet3_c = BEZIER(S0)(mouth_theet3_p)
mouth_theet4_c = BEZIER(S0)(mouth_theet4_p)
mouth_theet5_c = BEZIER(S0)(mouth_theet5_p)
mouth_theet6_c = BEZIER(S0)(mouth_theet6_p)
mouth_theet7_c = BEZIER(S0)(mouth_theet7_p)

mouth_theet = STRUCT([MAP(mouth_theet1_c)(line_domain),MAP(mouth_theet2_c)(line_domain),MAP(mouth_theet3_c)(line_domain),MAP(mouth_theet4_c)(line_domain),MAP(mouth_theet5_c)(line_domain)])
mouth_theet = STRUCT([mouth_theet, MAP(mouth_theet6_c)(line_domain),MAP(mouth_theet7_c)(line_domain)])

mouth_color = rgb([255,255,150])
mouth_background = MAP(COONS_PATCH([mouth_curve1,mouth_curve2,mouth_curve3_coons,mouth_curve4_coons]))(area_domain)
mouth_background = COLOR(mouth_color)(mouth_background)
mouth_edge = STRUCT([ MAP(mouth_curve1)(line_domain),MAP(mouth_curve2)(line_domain),MAP(mouth_curve3)(line_domain),MAP(mouth_curve4)(line_domain) ])

mouth = STRUCT([mouth_edge,mouth_theet,mouth_background])
head_complete = STRUCT([mouth,head_with_antenna,eyes,eyes_container])


/**    Body    **/
body_up_profile = addYValue([[1.43, 2.12], [1.37, 2.19], [1.34, 2.22], [1.25, 2.26]],0)
body_up_profile_t = traslaPointsX(body_up_profile,-1.035)
body_up = rotateProfileNoTraslate(body_up_profile_t)
body_up = T([0,1,2])([1.1,0.35,0.01])(body_up)

body_down_c = BEZIER(S1)([bezier_circle_map(0.3),bezier_circle_not_centered_map(0.395,0,0,0.85)])
body_dom = PROD1x1([INTERVALS(1)(100),INTERVALS(1)(32)])
body_down = MAP(body_down_c)(body_dom)
body_down = T([0,1,2])([1.1,0.35,1.28])(body_down)

body = STRUCT([body_up,body_down,TC([0,1,2])([1.1,0.35,1.28])(DISK(0.305)([32,1]))])

/**    body_door (sportello)    **/
body_door_p1 = traslaPointsZ( [[0.9, 0.089, 1.36], [0.87, 0.035, 1.97]] ,0.05)
body_door_p2 = traslaPointsZ( [[0.9, 0.089, 1.36], [1.1, -0.02, 1.36] ,[1.3, 0.0885,1.36]], 0.05)
body_door_p3 = traslaPointsZ( [[1.36, 0.045, 1.97], [1.3, 0.0885, 1.36]] ,0.05)
body_door_p4 = traslaPointsZ( [[1.36, 0.045, 1.97], [1.115, -0.109, 1.97], [0.87, 0.035, 1.97]] ,0.05)

body_door_c1 = BEZIER(S0)(body_door_p1)
body_door_c2 = BEZIER(S0)(body_door_p2)
body_door_c3 = BEZIER(S0)(body_door_p3)
body_door_c4 = BEZIER(S0)(body_door_p4)

body_door = STRUCT([MAP(body_door_c1)(line_domain),MAP(body_door_c2)(line_domain),MAP(body_door_c3)(line_domain),MAP(body_door_c4)(line_domain)])
body_door_color = rgb([80,80,80])
body_door = COLOR(body_door_color)(body_door)

//Knob
body_door_knob_part1 = sphere(0.025)
body_door_knob_part2 = R([1,2])(-PI/2)(T([2])([0.025])(cilynder(0.01,0.03)))

body_door_knob = STRUCT([body_door_knob_part1,body_door_knob_part2])
body_door_knob = T([0,1,2])([1.24,-0.02,1.6])(body_door_knob)

//Shoulder
shoulder_part1 = bezier_circle_map(0.15)
shoulder_part2 = bezier_circle_not_centered_map(0.1,0,0,0.065)
shoulder_part3 = bezier_circle_not_centered_map(0.1,0,0,-0.065)

shoulder_c = BEZIER(S1)([shoulder_part3,shoulder_part1,shoulder_part2])
shoulder = MAP(shoulder_c)(area_domain)
shoulder = R([0,2])(-PI/2)(shoulder)

shoulders = STRUCT([TC([0,1,2])([0.7,0.4,2])(R([0,2])(degree(-10))(shoulder)),TC([0,1,2])([1.5,0.4,2])(R([0,2])(degree(10))(shoulder))])

body_complete = STRUCT([shoulders,body_door_knob,body,body_door])


/**    Arms    **/ 
arm_left_profile = addYValue([[0.24, 1.21], [0.33, 1.6], [0.46, 1.83], [0.69, 1.99]],0)
arm_r = 0.085
arm_block_number = 6

//Genero la forma cilindrica del braccio
profile_p1 = traslaPointsX(arm_left_profile,-arm_r)
profile_p2 = traslaPointsY( traslaPointsX(arm_left_profile,-arm_r) ,1.6*arm_r)
profile_p3 = traslaPointsY( traslaPointsX(arm_left_profile,1.6*arm_r) ,1.6*arm_r)
profile_p4 = traslaPointsX(arm_left_profile,1.6*arm_r)
profile_p5 = traslaPointsY( traslaPointsX(arm_left_profile,1.6*arm_r) ,-1.6*arm_r)
profile_p6 = traslaPointsY( traslaPointsX(arm_left_profile,-arm_r) ,-1.6*arm_r)

profile_c1 = BEZIER(S0)(profile_p1)
profile_c2 = BEZIER(S0)(profile_p2)
profile_c3 = BEZIER(S0)(profile_p3)
profile_c4 = BEZIER(S0)(profile_p4)
profile_c5 = BEZIER(S0)(profile_p5)
profile_c6 = BEZIER(S0)(profile_p6)

arm_skeleton = MAP(BEZIER(S1)([profile_c1,profile_c2,profile_c3,profile_c4,profile_c5,profile_c6,profile_c1]))(area_domain)

arm_color = rgb([128,128,128])
arm_skeleton = COLOR(arm_color)(arm_skeleton)

arm_blocks_distance = 0.0001
arm_block_distance = points_distance(arm_left_profile[0],arm_left_profile[arm_left_profile.length-1])
arm_block_dim = arm_blocks_distance/(arm_block_number*(arm_blocks_distance-1))

arm_skeleton = STRUCT([arm_skeleton])
arm_skeleton = T([0,1,2])([0.1,0.4,0.11])(arm_skeleton)

hand_r = 0.1
hand_h = 0.13
hand_without_fingers_c = BEZIER(S1)([ bezier_circle_map(hand_r),bezier_circle_not_centered_map(arm_r,0,0,hand_h) ])
hand_without_fingers = MAP(hand_without_fingers_c)(area_domain)
hand_without_fingers = STRUCT([hand_without_fingers,DISK(hand_r+0.001)()])

finger_h = 0.14
finger_p = addYValue([[0, 0.67], [0.23, 0.58], [0.15, 0.04], [0.16, 0.01]],0)
finger_h_real = maxValueCoordinate(finger_p,2) - minValueCoordinate(finger_p,2)
decrease = finger_h/finger_h_real
finger_p = scalePoints(finger_p,decrease)

finger = rotateProfile(finger_p)
finger = R([0,2])(PI)(finger)

finger_distance = 0.045
fingers = STRUCT([TC([0])([finger_distance])(finger),TC([0,1])([-finger_distance,finger_distance])(finger),TC([0,1])([-finger_distance,-finger_distance])(finger)])

hand = STRUCT([hand_without_fingers,fingers])
hand = T([0,1,2])([0.341,0.4,1.2])(hand)

arm = STRUCT([arm_skeleton,hand])
right_arm = RC([0,1])(PI)(arm)
right_arm = T([0,1])([2.2,0.8])(right_arm)

//Apro le dita per la birra
new_fingers = STRUCT([R([0,2])(degree(-30))(TC([0])([finger_distance])(finger)),R([0,2])(degree(30))(TC([0,1])([-finger_distance,finger_distance])(finger)),R([0,2])(degree(30))(TC([0,1])([-finger_distance,-finger_distance])(finger))])
left_hand = STRUCT([hand_without_fingers,new_fingers])
left_hand = T([0,1,2])([0.341,0.4,1.2])(left_hand)
left_arm = STRUCT([arm_skeleton,left_hand])

/**    Legs    **/
leg_profile = addYValue([[0.74, 0.39], [0.77, 0.52], [0.87, 1.05], [0.9, 1.26]],0)
leg_r = 0.085

//Genero la forma cilindrica del braccio
profile_p1 = traslaPointsX(leg_profile,-leg_r)
profile_p2 = traslaPointsY( traslaPointsX(leg_profile,-leg_r) ,1.6*leg_r)
profile_p3 = traslaPointsY( traslaPointsX(leg_profile,1.6*leg_r) ,1.6*leg_r)
profile_p4 = traslaPointsX(leg_profile,1.6*leg_r)
profile_p5 = traslaPointsY( traslaPointsX(leg_profile,1.6*leg_r) ,-1.6*leg_r)
profile_p6 = traslaPointsY( traslaPointsX(leg_profile,-leg_r) ,-1.6*leg_r)

profile_c1 = BEZIER(S0)(profile_p1)
profile_c2 = BEZIER(S0)(profile_p2)
profile_c3 = BEZIER(S0)(profile_p3)
profile_c4 = BEZIER(S0)(profile_p4)
profile_c5 = BEZIER(S0)(profile_p5)
profile_c6 = BEZIER(S0)(profile_p6)

leg_skeleton = MAP(BEZIER(S1)([profile_c1,profile_c2,profile_c3,profile_c4,profile_c5,profile_c6,profile_c1]))(area_domain)

leg_color = arm_color
leg = COLOR(leg_color)(leg_skeleton)

foot_h = 0.2
foot_r = 0.25
foot_c = BEZIER(S1)([ bezier_circle_map(foot_r),bezier_circle_not_centered_map(leg_r,0,0,foot_h) ])

foot = STRUCT([ MAP(foot_c)(area_domain),DISK(foot_r+0.001)([32,1])])
foot = T([0,2])([0.74,0.2])(foot)

leg = STRUCT([leg,foot])

left_leg = TC([1,2])([0.35,0.05])(leg)
right_leg = T([0,1])([2.2,0.65])(RC([0,1])(PI)(left_leg))

bender = STRUCT([head_complete,body_complete,left_arm,right_arm,left_leg,right_leg])


/**    Beer    **/
beer_profile_p1 = addYValue([[6.09, 6.67], [6.21, 5.46], [6.4, 1.75], [5.83, 1.22]],0)
beer_profile_p2 = addYValue([[6.09, 6.67], [5.85, 9.42], [5.39, 7.8], [4.74, 11.01]],0)
beer_profile_p3 = addYValue([[4.59, 11.8], [4.92, 11.7], [4.96, 10.75], [4.74, 11.01]],0)

beer_profile_p1 = addYValue([[5.83, 1.22], [6.4, 1.75], [6.21, 5.46], [6.09, 6.67]],0)
beer_profile_p2 = addYValue([[6.09, 6.67], [5.85, 9.42], [5.39, 7.8], [4.74, 11.01]],0)
beer_profile_p3 = addYValue([[4.74, 11.01], [4.96, 10.75], [4.92, 11.7], [4.59, 11.8]],0)

traslate_value = -4.1
beer_profile_p1 = traslaPointsX(beer_profile_p1, traslate_value)
beer_profile_1 = rotateProfileNoTraslate(beer_profile_p1)

beer_profile_p2 = traslaPointsX(beer_profile_p2, traslate_value)
beer_profile_2 = rotateProfileNoTraslate(beer_profile_p2)

beer_profile_p3 = traslaPointsX(beer_profile_p3, traslate_value)
beer_profile_3 = rotateProfileNoTraslate(beer_profile_p3)

beer_profile_4_r = minValueCoordinate(beer_profile_p1,0) + 0.04
beer_profile_4_down = bezier_circle_map(beer_profile_4_r)
beer_profile_4_up_h = 0.4
beer_profile_4_up_r = beer_profile_4_r * 0.7 
beer_profile_4_up = bezier_circle_not_centered_map(beer_profile_4_up_r,0,0,beer_profile_4_up_h)
beer_profile_4 = unifyBezierCurves(beer_profile_4_up,beer_profile_4_down)
beer_profile_4_close = T([2])([beer_profile_4_up_h])(DISK(beer_profile_4_up_r+ 0.1)([32,1]))

beer_profile_4 = STRUCT([beer_profile_4,beer_profile_4_close])

beer = STRUCT([beer_profile_1,beer_profile_2,beer_profile_3,TC([2])([minValueCoordinate(beer_profile_p1,2)])(beer_profile_4)])
beer_color = [148,59,0]
beer = COLOR(rgb(beer_color))(beer)
beer = STRUCT([beer, T([2])([6])( COLOR(rgb([148/2,59/2,0]))(DISK(beer_profile_4_r)())) ])
beer_scale = 0.2
beer = S([0,1,2])([beer_scale,beer_scale,beer_scale])(beer)

beer_factor = 0.18
beer = S([0,1,2])([beer_factor,beer_factor,beer_factor])(beer)
beer = R([1,2])(PI/2)(beer)
beer = T([0,1,2])([0.35,0.6,1.1])(beer)

/**    Cigar    **/
cigar_profile = addYValue([[1.75, 0.38], [1.8, 0.51], [1.85, 1.37], [1.66, 1.36]], 0)
cigar = rotateProfile(cigar_profile)

cigar_r = 0.09
cigar_ash_h = 0.02
cigar_red_h = 0.03
cigar_red = unifyBezierCurves(bezier_circle_map(cigar_r*0.9), bezier_circle_not_centered_map(cigar_r,0,0,cigar_red_h))
cigar_ash = unifyBezierCurves(bezier_circle_map(cigar_r*0.8), bezier_circle_not_centered_map(cigar_r*0.9,0,0,cigar_ash_h))
cigar_ash = STRUCT([cigar_ash,DISK(cigar_r*0.8)()])

cigar = COLOR(rgb([150,75,0]))(cigar)
cigar_red = COLOR(rgb([166,16,34]))(cigar_red)
cigar_ash = COLOR(rgb([228,229,224]))(cigar_ash)
cigar_ash = COLOR(rgb([100,100,100]))(cigar_ash)

cigar = STRUCT([cigar,TC([2])([-cigar_red_h]),cigar_red,TC([2])([-cigar_ash_h]),cigar_ash])
cigar_factor = 0.3
cigar = S([0,1,2])([cigar_factor,cigar_factor,cigar_factor])(cigar)
cigar = R([1,2])(-PI/2)(cigar)
cigar = T([0,1,2])([1.1,-0.17,2.4])(cigar)

//End Model's Parts

model = STRUCT([bender,cigar,beer])


