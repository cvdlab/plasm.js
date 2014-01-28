var draw_rockingChair = function (colorC, colorSeat){
	var c = [];
	var thick = 0.2;
	var wide = 0.4;
	var wide_chair = 4;
	var domain2 = DOMAIN([[0,1],[0,1]])([100,10]);

	var c11_controls = [[0,1.5],[2,-1],[4,-1],[9,1.5],[5,1],[4,5],[3.5,2],[-1,1],[3,3],[0.5,5.5],[0,4]];
	var c11_bezier = BEZIER(S0)(c11_controls);
	var c12_controls = [[0,(1.5+thick)],[2,(-1+thick)],[4,(-1+thick)],[(9-3*thick),1.5],[5,(1-thick)],[4,(5-thick)],[3.5,(2-thick)],[-1,(1-thick)],[3,(3-thick)],[0.5,(5.5-thick)],[0,(4-thick)]];
	var c12_bezier = BEZIER(S0)(c12_controls);
	var s1_bezier = BEZIER(S1)([c11_bezier, c12_bezier]);
	var s1_surf = MAP(s1_bezier)(domain2);
	var s1_extrude = EXTRUDE([wide])(s1_surf);

	var c21_controls = [[0,6],[1,8],[-0.5,-1],[3,4],[4,5],[5,1.2]];
	var c21_bezier = BEZIER(S0)(c21_controls);
	var c22_controls = [[0,(6+thick)],[1,(8+thick)],[(-0.5+thick),(-1+thick)],[3,(4+thick)],[4,(5+thick)],[(5+thick),1.2]]
	var c22_bezier = BEZIER(S0)(c22_controls);
	var s2_bezier = BEZIER(S1)([c21_bezier, c22_bezier]);
	var s2_surf = MAP(s2_bezier)(domain2);
	var s2_extrude = EXTRUDE([wide])(s2_surf);

	var l = POLYLINE([[0],[thick]]);
	l = EXTRUDE([wide_chair+wide]) (EXTRUDE([thick])(l));

	c.push(s1_extrude);
	c.push(T([0,1,2])([0,0,wide_chair])(s1_extrude));
	c.push(s2_extrude);
	c.push(T([0,1,2])([0,0,wide_chair])(s2_extrude));
	c.push(T([0,1,2])([1,0.4,0])(l));
	c.push(T([0,1,2])([5,0.7,0])(l));
	c.push(T([0,1,2])([0.7,3.9,0])(l));
	c.push(T([0,1,2])([0.2,6,0])(l));
	c.push(T([0,1,2])([(1.4),(2+0.7),0])(l));
	c.push(T([0,1,2])([4.4,1.95,0])(l));

	var drawSeat = function (startX, startZ, endX, endZ, seat_backrest){
	  var grigliaSeat = [];
	  for (z=startZ; z<endZ; z+=0.5){
		  for (x=startX; x<endX; x+=0.5){
		  	grigliaSeat.push(POLYLINE([[x,0,z],[x+0.5,0,z],[x+0.5,0,z+0.5],[x,0,z+0.5],[x,0,z]]));
		  	grigliaSeat.push(POLYLINE([[(x+0.1),0,(z+0.1)],[(x+0.5+0.1),0,(z+0.1)],[(x+0.5+0.1),0,(z+0.5+0.1)],[(x+0.1),0,(z+0.5+0.1)],[(x+0.1),0,(z+0.1)]]));
		  	grigliaSeat.push(POLYLINE([[(x-0.1),0,(z-0.1)],[(x+0.5-0.1),0,(z+-0.1)],[(x+0.5-0.1),0,(z+0.5-0.1)],[(x-0.1),0,(z+0.5-0.1)],[(x-0.1),0,(z-0.1)]]));
		    }
		  }  
	  if (seat_backrest==0){	  
	  	grigliaSeat = T([0,1,2])([1.5,(2+0.7),(wide/2)]) (R([0,1,2])([-0.22]) (STRUCT (grigliaSeat)));
	  }else{	
	  	grigliaSeat = T([0,1,2])([(1-0.2),4,(wide/2)]) (R([0,1,2])([-4.5]) (STRUCT (grigliaSeat)));
	  	}
	  DRAW (COLOR (colorSeat) (grigliaSeat));	
	  }

	drawSeat(0,0,3,wide_chair,0);
	drawSeat(0,0,2,wide_chair,1);

	DRAW (COLOR (colorC) (STRUCT (c)));
}


var colorC = [92/255, 51/255, 23/255];
var colorSeat = [238/255, 154/255, 0];

draw_rockingChair (colorC, colorSeat);