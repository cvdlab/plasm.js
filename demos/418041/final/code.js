/**
 * @author Rebecca Fabrizio
 * 
 * Drawing Villa Almerico Capra - La Rotonda
 */

 !(function (){

 	/*
	 * Definition of local variables and utility functions
	 */

	//Colors
	var baseColor1 = [255/255,248/255,220/255];
	var baseColor = [255/255,248/255,220/255];
	var columnsColor = [253/255,245/255,230/255];
	var groundColor = [240/255,240/255,240/255];

	var windowsColor = [164/255,211/255,238/255,0.9];
	var grassColor = [84/255,139/255,84/255];
	var roofColor = [165/255,42/255,42/255];

	//Domains
	var domain2 = DOMAIN([[0,1],[0,1]])([40,1]);
	var domain2pi = DOMAIN([[0,1],[0,2*PI]])([20,80]);
	var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([30,1,1]);


	var makeKnots = function(points,grade){
		var g = grade || 2;
	 	var knots = [];
	 	knots.push(0); knots.push(0); knots.push(0);

	 	for (var i = 1; i < points.length-6+grade+1+1; i++) {
	 		knots.push(i);
	 	};

	 	knots.push(i); knots.push(i); knots.push(i);

	 	return knots;
	}

	var scalePoints = function(pointList, scale) {
		return pointList.map( function(pt) { 
			return [pt[0]*scale[0], 
				pt[1]*scale[1], 
				pt[2]*scale[2]]; 
		});
	};

	var rotatePoints = function(pointList, angle, axis) {
		if (axis === 0) {
		  var alfa = angle;
		 	return pointList.map( function(pt) { 
		  return [ pt[0], pt[1]*COS(alfa) + (-1)*pt[2]*SIN(alfa), pt[1]*SIN(alfa) + pt[2]*COS(alfa) ];
		    });
		  } else if (axis === 1) {
		    	var beta = angle;
		      return pointList.map( function(pt) { 
		  		return [ pt[0]*COS(beta) + pt[2]*SIN(beta), pt[1], (-1)*pt[0]*SIN(beta) + pt[2]*COS(beta) ];
		      	});
		    } else if (axis === 2) {
		      	var gamma = angle;
		      	return pointList.map( function(pt) { 
		  			return [ pt[0]*COS(gamma) + (-1)*pt[1]*SIN(gamma), pt[0]*SIN(gamma) + pt[1]*COS(gamma), pt[2] ];
		      		});
		    	}     
   		return pointList;
	};

	var movesPoints = function(pointList, axis, qty) {
	  if (axis === 0) {
	    return pointList.map( function(pt) { 
	  	return [ pt[0]+qty, pt[1], pt[2] ];
	      });
	  } else if (axis === 1) {
	      return pointList.map( function(pt) { 
	  		return [ pt[0], pt[1]+qty, pt[2] ];
	     	 });
	  	} else if (axis === 2) {
	      return pointList.map( function(pt) { 
	  		return [ pt[0], pt[1], pt[2]+qty ];
	      	});
	    }
	};


 	/* 
	 * Base of the structure
	 */

	var drawBaseOfStructure = function() {

		var base = [];

		//Stairs			
		var stairsHeight = 3/23;
		var stairsDepth = 6/22;
		var stairsLength = 7;
		var numberOfStairs = 22; //22+1

		var drawStairs = function(){
			var stairs = [];
			for (var i = 0; i < numberOfStairs; i++) {
				stairs.push(SIMPLEX_GRID([
					[0,stairsLength],
					[-i*(stairsDepth),stairsDepth],
					[-i*stairsHeight,stairsHeight]
				]));
				};
				return COLOR(columnsColor)(STRUCT(stairs));
		}

		base.push(T([0])([0.86])(drawStairs()));

		var lengthLast = stairsLength-0.07;
		var last = T([0,1,2])([0.43+0.465,6,3-stairsHeight])(
				SIMPLEX_GRID([[0,lengthLast],[0,
				0.3+1.3+2.1+0.7],[0,stairsHeight]]));
			base.push(COLOR(baseColor)(last));

		var makewallBase = function(l){				
			var wall = [];
			var l = l || 6;

			var wall1 = T([0])([-0.5])(
				SIMPLEX_GRID([[0,1],[0,l],[0,0.8]]));
			wall.push(wall1);
			var wall2 = T([0])([-0.465])(
				SIMPLEX_GRID([[0,0.93],[-0.07,l-0.07],[-0.8,0.4]]));
			wall.push(wall2);
			var wall3 = T([0])([-0.43])(
				SIMPLEX_GRID([[0,0.86],[-0.14,l-0.14],[-1.2,1.5]]));
			wall.push(wall3);
			var wall4 = T([0])([-0.93/2])(
				SIMPLEX_GRID([[0,0.93],[-0.07,l-0.07],[-2.7,0.3]]));
			wall.push(wall4);

			return COLOR(baseColor)(T([0,1])([0.43,-0.14])(STRUCT(wall)));
		};

		var wallLength = 4.8;
		// wall Edge stairs sx
		var wallBaseL = makewallBase(wallLength);
		base.push(wallBaseL);
		// wall Edge stairs dx
		var wallBaseR = makewallBase(wallLength);
		base.push(T([0])([0.43+0.43+stairsLength])(wallBaseL));
		var base1 = COLOR(baseColor1)(
			SIMPLEX_GRID([[0,0.6],[0,0.6],[0,0.05]]));
		base1 = T([0,1,2])([0.13,0.2,3])(base1);
		base.push(base1);
		base.push(T([0])([0.43+0.43+stairsLength])(base1));


		var drawWallWithWindow = function(distanceFromBorder,wallLength){
		
			var walls = [];

			//Barrier
			var orizontalBarrier = COLOR([0,0,0])(
				SIMPLEX_GRID([[0,1],[0,0.02],[0,0.02]]));
			var verticalBarrier = COLOR([0,0,0])(
				SIMPLEX_GRID([[0,0.02],[0,0.02],[0,1]]));
			
			walls.push(
				T([0,1,2])([distanceFromBorder,0.3,1.4])(
				R([0,1])(PI/2)(
				STRUCT([
				STRUCT(REPLICA(9)([T([2])([0.1]),orizontalBarrier])),
				STRUCT(REPLICA(9)([T([0])([0.1]),verticalBarrier]))]
			))));

			//dark wall
			var darkWindow = COLOR([0,0,0,0.8])(BOUNDARY(
				SIMPLEX_GRID([[0,0.05],[0,1],[0,1]])));
			if(distanceFromBorder>0)
				walls.push(T([0,1,2])([distanceFromBorder-0.2,0.3,1.4])(darkWindow));
			else
				walls.push(T([0,1,2])([distanceFromBorder+0.2,0.3,1.4])(darkWindow));

			var wall = T([0])([-0.43])(
					SIMPLEX_GRID([[0,0.86],[0,0.3],[-1.2,1.5]]));
			walls.push(COLOR(baseColor)(wall));
			wall = T([0])([-0.43])(
					SIMPLEX_GRID([[0,0.86],[-(1+0.3),wallLength],[-1.2,1.5]]));

			walls.push(COLOR(baseColor)(wall));
			wall = T([0])([-0.43])(
				SIMPLEX_GRID([[0,0.86],[-0.3,1],[-1.2,0.2]]));
			walls.push(COLOR(baseColor)(wall));
			wall = T([0])([-0.43])(
				SIMPLEX_GRID([[0,0.86],[-0.3,1],[-2.4,0.3]]));
			walls.push(COLOR(baseColor)(wall));

			var wall1 = T([0])([-0.5])(
				SIMPLEX_GRID([[0,1],[0,wallLength+1.3],[0,0.8]]));
			walls.push(COLOR(baseColor)(wall1));
			var wall2 = T([0])([-0.93/2])(
				SIMPLEX_GRID([[0,0.93],[0,wallLength+1.3],[-0.8,0.4]]));
			walls.push(COLOR(baseColor)(wall2));

			var wall4 = T([0])([-0.93/2])(
				SIMPLEX_GRID([[0,0.93],[0,wallLength+1.3],[-2.7,0.3]]));
			walls.push(COLOR(baseColor)(wall4));


			return T([0])([0.43])(STRUCT(walls));
		}

		var wall = drawWallWithWindow(-0.3,1.5+0.14);
		wall = T([1])([4.8-0.14])(wall);
		base.push(wall);
		var wallR = drawWallWithWindow(0.3,1.5+0.14);
		wallR = T([0,1])([0.43+stairsLength+0.43,4.8-0.14])(wallR);
		base.push(wallR);

		var drawWallWithWindow1 = function(distanceFromBorder,wallLength){
		
			var walls = [];

			//Barriers
			var orizontalBarrier = COLOR([0,0,0])(
				SIMPLEX_GRID([[0,1],[0,0.02],[0,0.02]]));
			var verticalBarrier = COLOR([0,0,0])(
				SIMPLEX_GRID([[0,0.02],[0,0.02],[0,1]]));
			
			walls.push(
				T([0,1,2])([distanceFromBorder,0.3,1.4])(
				R([0,1])(PI/2)(
				STRUCT([
				STRUCT(REPLICA(9)([T([2])([0.1]),orizontalBarrier])),
				STRUCT(REPLICA(9)([T([0])([0.1]),verticalBarrier]))]
			))));

			//dark wall
			var darkWindow = COLOR([0,0,0,0.8])(BOUNDARY(SIMPLEX_GRID([[0,0.05],[0,1],[0,1]])));
			if(distanceFromBorder>0)
				walls.push(T([0,1,2])([distanceFromBorder-0.2,0.3,1.4])(darkWindow));
			else
				walls.push(T([0,1,2])([distanceFromBorder+0.2,0.3,1.4])(darkWindow));

			var wall = T([0])([-0.43])(
					SIMPLEX_GRID([[0,0.86-0.4],[0,0.3],[-1.2,1.5]]));
			walls.push(COLOR(baseColor)(wall));
			wall = T([0])([-0.43])(
					SIMPLEX_GRID([[0,0.86-0.4],[-(1+0.3),wallLength],[-1.2,1.5]]));

			walls.push(COLOR(baseColor)(wall));
			wall = T([0])([-0.43])(
				SIMPLEX_GRID([[0,0.86-0.4],[-0.3,1],[-1.2,0.2]]));
			walls.push(COLOR(baseColor)(wall));
			wall = T([0])([-0.43])(
				SIMPLEX_GRID([[0,0.86-0.4],[-0.3,1],[-2.4,0.3]]));
			walls.push(COLOR(baseColor)(wall));

			var wall1 = T([0])([-0.5])(
				SIMPLEX_GRID([[0,1-0.9],[0,wallLength+1.3],[0,0.8]]));
			walls.push(COLOR(baseColor)(wall1));
			var wall2 = T([0])([-0.93/2])(
				SIMPLEX_GRID([[0,0.93-0.85],[0,wallLength+1.3],[-0.8,0.4]]));
			walls.push(COLOR(baseColor)(wall2));

			var wall4 = T([0])([-0.93/2])(
				SIMPLEX_GRID([[0,0.93-0.85],[0,wallLength+1.3],[-2.7,0.3]]));
			walls.push(COLOR(baseColor)(wall4));


			return T([0])([0.43])(STRUCT(walls));
		}

		//wall with gate 
		var makeWallWithGate = function(){
				
			var wall = [];

			//wall intorno
			var wall1 = T([0])([-0.5])(
				SIMPLEX_GRID([[0,1],[0,0.1],[0,0.8]]));
			wall.push(wall1);
			wall.push(T([0,1])([-0.5,2])(
				SIMPLEX_GRID([[0,1],[0,0.8],[0,0.8]])));

			var wall2 = T([0])([-0.93/2])(
				SIMPLEX_GRID([[0,0.93],[0,0.1],[-0.8,0.4]]));
			wall.push(wall2);
			wall.push(T([0,1])([-0.93/2,2])(
				SIMPLEX_GRID([[0,0.93],[0,0.8],[-0.8,0.4]])));

			var wall3 = T([0])([-0.43])(
				SIMPLEX_GRID([[0,0.86],[0,0.1],[-1.2,1.5]]));
			wall.push(wall3);
			wall.push(T([0,1])([-0.43,2])(
				SIMPLEX_GRID([[0,0.86],[0,0.8],[-1.2,1.5]])));

			var wall4 = T([0])([-0.93/2])(
				SIMPLEX_GRID([[0,0.93],[0,2.8],[-2.7,0.3]]));
			wall.push(wall4);

			//Gate
			var p0 = [[-0.43,0.1,2.7],[-0.43,2,2.7],[-0.43,2,2.7]];
			var k0 = [0,0,0,1,1,1];
			var c0 = NUBS(S0)(2)(k0)(p0);
			var p1 = [[-0.43,0.1,2.2],[-0.43,1.05,2.6],
				[-0.43,2,2.2]];
			var k1 = [0,0,0,1,1,1];
			var c1 = NUBS(S0)(2)(k1)(p1);

			var surf0 = BEZIER(S1)([c0,c1]);
			wall.push(MAP(surf0)(domain2));

			var p2 = [[0.43,0.1,2.7],[0.43,2,2.7],[0.43,2,2.7]];
			var k2 = [0,0,0,1,1,1];
			var c2 = NUBS(S0)(2)(k2)(p2);

			var p3 = [[0.43,0.1,2.2],[0.43,1.05,2.6],
				[0.43,2,2.2]];
			var k3 = [0,0,0,1,1,1];
			var c3 = NUBS(S0)(2)(k3)(p3);

			var surf1 = BEZIER(S1)([c2,c3]);
			wall.push(MAP(surf1)(domain2));

			var surf3 = BEZIER(S1)([c1,c3]);
			wall.push(MAP(surf3)(domain2));


			return 	COLOR(baseColor)(T([0])([0.43])(STRUCT(wall)));
		}

		var wallPorta = T([1])([4.8+0.9+0.6+1.3])(makeWallWithGate());
		var wallPorta1 = T([0,1])([stairsLength+2*0.43,
			4.8+0.9+0.6+1.3])(makeWallWithGate());
		base.push(wallPorta);
		base.push(wallPorta1);

		var parstairs = COLOR(baseColor)(
			SIMPLEX_GRID([[0,stairsLength],[0,0.05],[0,2.9]]));
		base.push(T([0,1])([0.86,6.3])(parstairs));
		base.push(T([0,1])([0.86,4.8+1.5+1+0.3+2.8-0.05])(parstairs));

			
		//wall sx 
		var makeWallSxFromStairs = function(){		

			var makesimpleWall = function(l){
				var wall = [];
				var l = l || 2;

				var wall1 = T([1])([-0.10])(
					SIMPLEX_GRID([[0,l],[0,0.10],[0,0.8]]));
				wall.push(wall1);
				var wall2 = T([1])([-0.065])(
					SIMPLEX_GRID([[0,l],[0,0.065],[-0.8,0.4]]));
				wall.push(wall2);
				var wall3 = T([1])([-0.03])(
					SIMPLEX_GRID([[0,l],[0,0.03],[-1.2,1.5]]));
				wall.push(wall3);
				var wall4 = T([1])([-0.065])(
					SIMPLEX_GRID([[0,l],[0,0.065],[-2.7,0.3]]));
				wall.push(wall4);
				return 	COLOR(baseColor)(T([1])([0.03])(STRUCT(wall)));
			}

			var wallLength = 2.5;
			var wallBaseSx = makesimpleWall(wallLength);
			base.push(T([0,1])([-wallLength,
				10.4])(
				wallBaseSx));

			
			var wallSemp = drawWallWithWindow1(-0.3,1.5);
			wallSemp = T([0,1])([
				-wallLength,
				10.4])(
				R([0,1])([PI/2])(
				wallSemp));
			base.push(wallSemp);

			
			var wall = [];
			var wall1 = T([0])([-0.07])(
				SIMPLEX_GRID([[0,0.07],[0,1+0.07],[0,0.8]]));
			wall.push(COLOR(baseColor)(wall1));
			var wall2 = T([0])([-0.035])(
				SIMPLEX_GRID([[0,0.035],[-0.035,1+0.035],[-0.8,0.4]]));
			wall.push(COLOR(baseColor)(wall2));
			var wall4 = T([0])([-0.035])(
				SIMPLEX_GRID([[0,0.035],[-0.035,1+0.035],[-2.7,0.3]]));
			wall.push(COLOR(baseColor)(wall4));

			var wall5 = T([1])([1-0.07-0.4])(
				SIMPLEX_GRID([[0,0.03],[0,0.14+0.4],[0,3]]));
			wall.push(COLOR(baseColor)(wall5));
			wall = STRUCT(wall);

			base.push(T([0,1])([
				-5.3,
				10.4-0.07])(
				wall));

			var wallLength3 = 0.27; //1.5-0.93-0.3
			var wallBaseSx1 = R([0,1])([-PI/2])(
				makesimpleWall(wallLength3));
			base.push(T([0,1])([
				-5.3,
				10.4+1+0.27])(
				wallBaseSx1));

			var wallSemp1 = drawWallWithWindow1(-0.3,0.3);	
			wallSemp1 = T([0,1])([-5.3,10.4+1+0.27])(
					wallSemp1);
			base.push(wallSemp1);

			var wallLength3 = 2.5;	
			var wallBaseSx1 = R([0,1])([-PI/2])(
				makesimpleWall(wallLength3));
			base.push(T([0,1])([-5.3,10.4+1+0.27+0.3+1+0.3+2.5])(
				wallBaseSx1));
		}

		makeWallSxFromStairs();

					
		baseToRotate = T([0,1])([5.3-9.695,-10.4-9.695])(STRUCT(base));
		
		//Reproduction for the other sides
		var r = R([0,1])([-PI/2]);
		base = STRUCT([baseToRotate,r,baseToRotate,r,baseToRotate,r,baseToRotate]);	

		var firstFloor = COLOR(baseColor)(
			T([0,1,2])([-9.695,-9.695,3-0.02])(
				SIMPLEX_GRID([[0,19.39],[0,19.39],[0,0.02]])));

		var drawGround = function(){

			//Ground
			var ground = [];
			var ground1 = T([0,1,2])([-21,-23-30,-1.5])(
				SIMPLEX_GRID([[0,46],[0,50+30],[0,1.5]]));
			ground.push(ground1);
			var ground3 = T([0,1,2])([-21-14,-23-30,-1.5])(
				SIMPLEX_GRID([[0,14],[0,23+20+30],[0,1.5]]));
			ground.push(ground3);
			var ground4 = T([0,1,2])([25,-23-30,-1.5])(
				SIMPLEX_GRID([[0,8],[0,30],[0,1.5]]));
			ground.push(ground4);

			var goundBorder = T([0,1,2])([33,-23-30,-1.5])(
				SIMPLEX_GRID([[0,0.6],[0,30],[0,1.5+0.6]]));
			ground.push(goundBorder);		
			var goundBorder1 = T([0,1,2])([25,-23,-1.5])(
				SIMPLEX_GRID([[0,8+0.6],[0,0.6],[0,1.5+0.6]]));
			ground.push(goundBorder1);		
			var goundBorder2 = T([0,1,2])([25,-23+0.6,-1.5])(
				SIMPLEX_GRID([[0,0.6],[0,50],[0,1.5+0.6]]));
			ground.push(goundBorder2);		
			var goundBorder3 = T([0,1,2])([-21-0.6,27,-1.5])(
				SIMPLEX_GRID([[0,46+0.6+0.6],[0,0.6],[0,1.5+0.6]]));
			ground.push(goundBorder3);		
			var goundBorder4 = T([0,1,2])([-21-0.6,20,-1.5])(
				SIMPLEX_GRID([[0,0.6],[0,7],[0,1.5+0.6]]));
			ground.push(goundBorder4);		
			var goundBorder5 = T([0,1,2])([-21-0.6-14,20,-1.5])(
				SIMPLEX_GRID([[0,14],[0,0.6],[0,1.5+0.6]]));
			ground.push(goundBorder5);
			var goundBorder6 = T([0,1,2])([-21-14-0.6,-23-30,-1.5])(
				SIMPLEX_GRID([[0,0.6],[0,43+30],[0,1.5+0.6]]));
			ground.push(goundBorder6);

			ground = COLOR(groundColor)(STRUCT(ground));


			//Grass
			var grass = [];

			var grass1 = COLOR(grassColor)(
				SIMPLEX_GRID([[0,5.5],[0,10],[0,0.05]]));
			grass.push(T([0,1])([-18,-19])(grass1));
			grass.push(T([0,1])([18-5.5,-19])(grass1));
			var grass2 = COLOR(grassColor)(
				SIMPLEX_GRID([[0,11],[0,20],[0,0.05]]));
			grass.push(T([0,1])([-5.5,-20-26])(grass2));
			var grass3 = COLOR(grassColor)(
				SIMPLEX_GRID([[0,10],[0,9],[0,0.05]]));
			grass.push(T([0,1])([-21-10-3,20-9-1])(grass3));
			var grass4 = COLOR(grassColor)(
				SIMPLEX_GRID([[0,10],[0,12],[0,0.05]]));
			grass.push(T([0,1])([-21-10-3,-6])(grass4));
			var grass5 = COLOR(grassColor)(
				SIMPLEX_GRID([[0,10],[0,30+9+4],[0,0.05]]));
			grass.push(T([0,1])([-21-10-3,-30-9-14])(grass5));


			var p0 = [[-12-0.5,-26,0],[-11-0.5,-26,0],
				[-11-0.5,-30,0],[-11-0.5,-45,0],
				[-10-0.5,-50,0],[-9-0.5,-52,0],
				[-6-0.5,-53,0]];
			var k0 = makeKnots(p0,2);
			var c0 = NUBS(S0)(2)(k0)(p0);
			var p1 = [[-24,-26,0],[-24,-53,0]];
			var c1 = BEZIER(S0)(p1);	
			var vert0 = BEZIER(S1)([c0,c1]);

			p0 = movesPoints(p0,2,0.05);
			k0 = makeKnots(p0,2);
			c0 = NUBS(S0)(2)(k0)(p0);
			p1 = movesPoints(p1,2,0.05);
			c1 = BEZIER(S0)(p1);	
			var vert1 = BEZIER(S1)([c0,c1]);

			var s0 = BEZIER(S2)([vert0,vert1]);
			var grass6 = MAP(s0)(domain3);
			grass.push(grass6);
			grass.push(S([0])([-1])(grass6));


			grass = COLOR(grassColor)(STRUCT(grass));

			return STRUCT([ground,grass]);
		}
			
		return STRUCT([base,firstFloor,drawGround()]);
	}

	DRAW(drawBaseOfStructure());


	/*
	 * Facade of the villa
	 */

	var drawFacade = function(){

		var drawGrate = function(hDistance, vDistance) {

			var endLine = hDistance >= vDistance ? hDistance : vDistance;
			var grateIntervals = 0.5;

			var polyStruct = [];
			for (var i = 0; i <= endLine; i += grateIntervals) {
				polyStruct.push( POLYLINE([[0,0,i],[i,0,0]]) );
			}

			var quartercolumns = T([0,2])([-(hDistance/2),-(vDistance/2)])( STRUCT(polyStruct) );
			var fullcolumns = STRUCT([quartercolumns,
				S([2])([-1]), quartercolumns,
				S([0])([-1]), quartercolumns,
				S([2])([-1]), quartercolumns
			]);

			return COLOR([0,0,0])( T([0,2])([(hDistance/2),(vDistance/2)])( fullcolumns ) );
		};

		var drawSquareGrate = function(hDistance, vDistance) {
			var grateIntervals = 0.2;

			var polyStruct = [];
			for (var i = 0; i <= hDistance; i += grateIntervals) {
				polyStruct.push( POLYLINE([[i,0,0],[i,0,vDistance]]) );
			}
			for (var i = 0; i <= vDistance; i += grateIntervals) {
				polyStruct.push( POLYLINE([[0,0,i],[hDistance,0,i]]) );
			}

		 	return COLOR([0,0,0])(STRUCT(polyStruct));
		};

		var drawVerticalGrate = function(hDistance, vDistance) {
			var grateIntervals = 0.15;
			var color = [0,0,0];

			var polyStruct = [];
			for (var i = 0; i <= hDistance; i += grateIntervals) {
			  polyStruct.push( POLYLINE([[i,0,0],[i,0,vDistance]]) );
			}

		 	return COLOR([0,0,0])(STRUCT(polyStruct));
		};

		var drawWindowEmbroidery = function(d){

			var d = d || 0.05;

			//Surface sx
			var p0 = [[0,0,0],[0,-0.025,0.03],[0,-0.03,0.05],
				[0,-0.02,0.07],[0,-0.02,0.09],
				[0,-0.06,0.11],[0,-0.06,0.18],[0,-0,0.2]];
			var k0 = [0,0,0,1,2,3,4,5,6,6,6];
			var c0 = NUBS(S0)(2)(k0)(p0);
			var p1 = [p0[0],p0[7]];
			var c1 = BEZIER(S0)(p1);	
			var vert1 = BEZIER(S1)([c0,c1]);

				
			//Surface dx
			p0 = [[0+d,-0,0],[0+d,-0.025,0.03],[0+d,-0.03,0.05],
				[0+d,-0.02,0.07],[0+d,-0.02,0.09],
				[0+d,-0.06,0.11],[0+d,-0.06,0.18],[0+d,-0,0.2]];
			k0 = [0,0,0,1,2,3,4,5,6,6,6];
			c0 = NUBS(S0)(2)(k0)(p0);
			p1 = [p0[0],p0[7]];
			c1 = BEZIER(S0)(p1);
			var vert2 = BEZIER(S1)([c0,c1]);

			var vert = BEZIER(S2)([vert1,vert2]);
			return S([0,1,2])([2,2,2])(MAP(vert)(domain3));
		};

		var drawEdgewall0 = function (d){

			var d = d || 2;

			//Surface sx
			var p0 = [[0,0,0],[0,0,0],
				[0,-0.03,0],[0,-0.03,0.06],[0,-0.06,0.06],
				[0,-0.06,0.12],[0,-0.09,0.12],[0,-0.09,0.20],
				[0,-0.13,0.22],[0,-0.09,0.24],[0,-0.09,0.26],
				[0,-0.13,0.27],[0,-0.13,0.48],[0,-0.09,0.49],[0,-0.09,0.49],
				[0,-0.09,0.5],[0,-0.09,0.5],[0,-0.13,0.5],[0,-0.13,0.5],
				[0,-0.13,0.9],[0,-0.2,1],[0,-0.2,1],[0,0,1],
				[0,0,1]
				];
			var k0 = makeKnots(p0,1)
			var c0 = NUBS(S0)(1)(k0)(p0);
			var p1 = [p0[0],p0[p0.length-1]];
			var c1 = BEZIER(S0)(p1);	
			var vert1 = BEZIER(S1)([c0,c1]);

			//Surface dx
			p0 = movesPoints(p0,0,d)
			k0 = makeKnots(p0,1)
			c0 = NUBS(S0)(1)(k0)(p0);
			p1 = [p0[0],p0[p0.length-1]];
			c1 = BEZIER(S0)(p1);	
			var vert2 = BEZIER(S1)([c0,c1]);

			var wall1 = 
				SIMPLEX_GRID([[0,d],[0,0.3],[0,1]]);

			//Product surfaces
			var vert = BEZIER(S2)([vert1,vert2]);		

			return COLOR(baseColor)(
				STRUCT([MAP(vert)(domain3),wall1]));
		};

		var drawEdgewall1 = function (d){

			var d = d || 2;

			//Surface sx
			var p0 = [[0,0,0],[0,-0.04,0.10],[0,-0.13,0.15],
				[0,-0.24,0.19],[0,-0.24,0.19],
				[0,-0.22,0.24],[0,-0.3,0.315],
				[0,-0.335,0.3],[0,-0.335,0.3],
				[0,-0.5,0.6],[0,-0.5,0.6],
				[0,0,0.6]];
			var k0 = makeKnots(p0,2);
			var c0 = NUBS(S0)(2)(k0)(p0);
			var p1 = [p0[0],p0[11]];
			var c1 = BEZIER(S0)(p1);	
			var vert1 = BEZIER(S1)([c0,c1]);

			//Surface dx
			p0 = [[0+d,0,0],[0+d,-0.04,0.10],[0+d,-0.13,0.15],
				[0+d,-0.24,0.19],[0+d,-0.24,0.19],
				[0+d,-0.22,0.24],[0+d,-0.3,0.315],
				[0+d,-0.335,0.3],[0+d,-0.335,0.3],
				[0+d,-0.5,0.6],[0+d,-0.5,0.6],
				[0+d,0,0.6]];
			k0 = makeKnots(p0,2);
			c0 = NUBS(S0)(2)(k0)(p0);
			p1 = [p0[0],p0[11]];
			c1 = BEZIER(S0)(p1);	
			var vert2 = BEZIER(S1)([c0,c1]);
			var wall1 = SIMPLEX_GRID([[0,d],[0,0.3],[0,0.6]]);

			var vert = BEZIER(S2)([vert1,vert2]);

			return COLOR(baseColor)(STRUCT([MAP(vert)(domain3),wall1]));
		};
		
		var drawWindow1 = function(l){
			var l = l || 5; 
			var walls = [];
			var capwall = drawWindowEmbroidery();
				
			var wall1 = 
				SIMPLEX_GRID([[0,0.1],[0,0.4],[0,2.1+0.34-0.22]]);

			walls.push(T([0,1,2])([0.5,-0.03,-0.34+0.22])(wall1));
			walls.push(T([0,1,2])([-0.5-0.1,-0.03,-0.34+0.22])(wall1));

			var wall3 = SIMPLEX_GRID([[0,1],[0,0.4],[0,0.1]]);

			walls.push(T([0,1,2])([-0.5,-0.03,-0.1])(wall3));
			walls.push(T([0,1,2])([-0.5,-0.03,2])(wall3));

			var wall2 =	SIMPLEX_GRID([[0,1.4],[0,0.09],[0,0.03]]);

			walls.push(T([0,1,2])([-0.7,-0.03-0.09,-0.03])(wall2));

			var wall4 = SIMPLEX_GRID([[0,1.3],[0,0.07],[0,0.09]]);

			walls.push(T([0,1,2])([-0.65,-0.03-0.07,-0.09-0.03])(wall4));

			var wall5 = SIMPLEX_GRID([[0,1.2],[0,0.43],[0,0.2]]);

			walls.push(T([0,1,2])([-0.6,-0.03-0.03,-0.09-0.03-0.2])(wall5));

			var wall7 = SIMPLEX_GRID([[0,1.2],[0,0.3],[0,5-0.34-0.34-2.1+0.06+1]]);

			walls.push(T([0,2])([-0.6,2.1])(wall7));

			var wall6 = SIMPLEX_GRID([[0,0.4],[0,0.3],[0,4.68+0.02+1]]);

			walls.push(T([0,2])([0.5+0.1,-0.32])(wall6));
			walls.push(T([0,2])([-0.5-0.1-0.4,-0.32])(wall6));

			var wall8 =	SIMPLEX_GRID([[0,1.5],[0,0.15],[0,0.1]]);

			walls.push(T([0,1,2])([-0.75,-0.09,2.1+0.05])(wall8));

			walls.push(T([0,2])([0.75-0.1,2.1+0.05-0.4])(capwall));
			walls.push(T([0,2])([-0.75,2.1+0.05-0.4])(capwall));

			var wall9 = SIMPLEX_GRID([[0,0.866],[0,0.15],[0,0.1]]);

			walls.push(
				T([0,1,2])([+0.7,-0.09,2.1+0.05+0.01])(
				R([0,2])([PI/6 + PI])(
					T([2])([-0.1])(wall9))));
			walls.push(
				T([0,1,2])([-0.7,-0.09,2.1+0.05+0.01])(
				R([0,2])([-PI/6])(wall9)));

			var wall10 = SIMPLEX_GRID([[0,1+0.2+0.4+0.4],[0,0.1+0.3],[0,0.3]]);

			walls.push(T([0,1,2])([-1,-0.035,-0.32-0.3])(wall10));

			var wall = COLOR(baseColor)(STRUCT(walls));

			var windows = [];

			var verticalBarrier = COLOR([0,0,0])(
				SIMPLEX_GRID([[0,0.1],[0,0.05],[0,1.25]]));
			var orizontalBarrier = COLOR([0,0,0])(
				SIMPLEX_GRID([[0,1-0.08],[0,0.05],[0,0.1]]));
			var glass = COLOR(windowsColor)(BOUNDARY(
				SIMPLEX_GRID([[0,1],[0,0.01],[0,2]])));
			var stripe = COLOR([0,0,0])(
				SIMPLEX_GRID([[0,0.04],[0,0.05],[0,2]]));

			windows.push(T([0,1])([-0.5,0.01+0.2])(glass));
			//windows.push(T([0,1])([-0.5,0.01+0.2+0.1])(COLOR([0.9999999,0.9999999,0.99999,1])(SIMPLEX_GRID([[0,1],[0,0.01],[0,2]]))));
			windows.push(T([0,1])([-0.5,0.01+0.2])(drawSquareGrate(1,2)));
			windows.push(T([0,1])([0.46,0.2-0.04])(stripe));
			windows.push(T([0,1])([-0.46-0.04,0.2-0.04])(stripe));
			windows.push(T([0,1,2])([-0.05,0.2-0.04,0.05])(verticalBarrier));
			windows.push(T([0,1,2])([-0.5+0.04,0.2-0.04,1.3])(orizontalBarrier));
			windows.push(T([0,1,2])([-0.5+0.04,0.2-0.04,1.9])(orizontalBarrier));
			windows.push(T([0,1])([-0.5+0.04,0.2-0.04])(orizontalBarrier));

			windows.push(wall);

			return STRUCT([T([2])([6])(drawEdgewall0()),
				T([2])([7])(drawWindow2()),
				T([0,2])([1,0.32+0.3])(STRUCT(windows)),
				T([2])([7+2.1])(drawEdgewall1())]);
		};

		var simpleWall = function(l){

			var walls = [];
			var l = l || 2;

			var wall = SIMPLEX_GRID(
				[[0,l],[0,0.3],[0,0.3]]);

			walls.push(T([1])([-0.035])(wall));

			var wall1 = SIMPLEX_GRID(
				[[0,l],[0,0.3],[0,6-0.3]]);

			walls.push(T([2])([0.3])(wall1));

			var wall2 = SIMPLEX_GRID(
				[[0,l],[0,0.3],[0,2.1]]);

			return COLOR(baseColor)(STRUCT([T([2])([6])(drawEdgewall0(l)),
				T([2])([6+1])(wall2),
				STRUCT(walls),
				T([2])([7+2.1])(drawEdgewall1(l))]));
		};

		var simpleWall1 = function(l){

			var walls = [];
			var l = l || 2;			

			var wall1 = SIMPLEX_GRID(
				[[0,l],[0,0.3],[0,6]]);

			walls.push(wall1);

			var wall2 = SIMPLEX_GRID(
				[[0,l],[0,0.3],[0,2.1]]);

			return COLOR(baseColor)(STRUCT([T([2])([6])(drawEdgewall0(l)),
				T([2])([6+1])(wall2),
				STRUCT(walls),
				T([2])([7+2.1])(drawEdgewall1(l))]));
		};
		
		var drawWindow2 = function (h){
			var h = h || 5
			var walls = [];
				
			var wall1 = SIMPLEX_GRID([[0,0.5],[0,0.3],[0,2.1]]);

			walls.push(T([0,1,2])([0.5,-0.03,-0.7])(wall1));
			walls.push(T([0,1,2])([-0.5-0.5,-0.03,-0.7])(wall1));

			var wall3 = SIMPLEX_GRID([[0,1],[0,0.3],[0,0.3]]);
			walls.push(T([0,1,2])([-0.5,-0.03,1.1])(wall3));

			var wall4 = SIMPLEX_GRID([[0,1],[0,0.3],[0,0.7]]);
			walls.push(T([0,1,2])([-0.5,-0.03,-0.7])(wall4));

			var wall = COLOR(baseColor)(STRUCT(walls));

			var windows = [];

			var verticalBarrier = COLOR([0,0,0])(
				SIMPLEX_GRID([[0,0.08],[0,0.05],[0,1.1-0.08]]));
			var glass = COLOR(windowsColor)(BOUNDARY(
				SIMPLEX_GRID([[0,1],[0,0.01],[0,1.1]])));
			var stripe = COLOR([0,0,0])(
				SIMPLEX_GRID([[0,0.04],[0,0.05],[0,1.1-0.04-0.04]]));
			var stripeOriz = COLOR([0,0,0])(
				SIMPLEX_GRID([[0,1],[0,0.05],[0,0.04]]));

			windows.push(T([0,1,2])([-0.04,0.2-0.04,0.04])(verticalBarrier));
			windows.push(T([0,1])([-0.5,0.01+0.2])(glass));
			//windows.push(T([0,1])([-0.5,0.01+0.2+0.1])(COLOR([0.9999999,0.9999999,0.99999,1])(SIMPLEX_GRID([[0,1],[0,0.01],[0,1.1]]))));
			windows.push(T([0,1,2])([0.46,0.2-0.04,0.04])(stripe));
			windows.push(T([0,1,2])([-0.46-0.04,0.2-0.04,0.04])(stripe));
				
			windows.push(T([0,1,2])([-0.5,0.2-0.04,1.06])(stripeOriz));
			windows.push(T([0,1])([-0.5,0.2-0.04])(stripeOriz));

			windows.push(wall);


			return T([0,1,2])([1,0.03,0.7])(STRUCT(windows));
		};

		var drawWindow3 = function(h){
			var h = h || 5
			var walls = [];
				
			var wall1 = SIMPLEX_GRID([[0,0.5],[0,0.3],[0,1.7+0.5+0.7+1]]);

			walls.push(T([0,1,2])([0.5,-0.03,-0.62])(wall1));
			walls.push(T([0,1,2])([-0.5-0.5,-0.03,-0.62])(wall1));

			var wall3 = SIMPLEX_GRID([[0,1],[0,0.3],[0,0.5+1+0.08]]);
			walls.push(T([0,1,2])([-0.5,-0.03,1.7])(wall3));

			var wall4 = SIMPLEX_GRID([[0,1],[0,0.3],[0,0.62]]);
			walls.push(T([0,1,2])([-0.5,-0.03,-0.62])(wall4));

			var wall = COLOR(baseColor)(STRUCT(walls));

			var windows = [];

			var verticalBarrier = COLOR([0,0,0])(
				SIMPLEX_GRID([[0,0.1],[0,0.05],[0,1.7-0.08]]));
			var glass = COLOR(windowsColor)(BOUNDARY(
				SIMPLEX_GRID([[0,1],[0,0.01],[0,1.7]])));
			var stripe = COLOR([0,0,0])(
				SIMPLEX_GRID([[0,0.04],[0,0.05],[0,1.7-0.04-0.04]]));
			var stripeOriz = COLOR([0,0,0])(
				SIMPLEX_GRID([[0,1],[0,0.05],[0,0.04]]));

			windows.push(T([0,1,2])([-0.05,0.2-0.04,0.04])(verticalBarrier));
			windows.push(T([0,1])([-0.5,0.01+0.2])(glass));
			//windows.push(T([0,1])([-0.5,0.01+0.2+0.1])(COLOR([0.9999999,0.9999999,0.99999,1])(SIMPLEX_GRID([[0,1],[0,0.01],[0,1.7]]))));
			windows.push(T([0,1])([-0.5,0.01+0.2])(drawGrate(1,1.7)));
			windows.push(T([0,1,2])([0.46,0.2-0.04,0.04])(stripe));
			windows.push(T([0,1,2])([-0.46-0.04,0.2-0.04,0.04])(stripe));
			windows.push(T([0,1,2])([-0.5,0.2-0.04,1.66])(stripeOriz));
			windows.push(T([0,1])([-0.5,0.2-0.04])(stripeOriz));
			windows.push(wall);


			return STRUCT([T([2])([6])(drawEdgewall0()),
				T([2])([7])(drawWindow2()),
				T([2])([3.9])(drawWindow2()),
				T([0,1,2])([1,0.03,0.62])(STRUCT(windows)),
				T([2])([7+2.1])(drawEdgewall1())]);
		};
		
		var drawAngleStruttura = function(){
			var Edge = [];

			var EdgeTriangolare = SIMPLICIAL_COMPLEX([[0,0],[0,0.3],[0.3,0]])([[0,1,2]]);
			var extrude1 = EXTRUDE([7+2.1+0.6])(EdgeTriangolare);
			Edge.push(extrude1);

			//1 Edge
			var wall = SIMPLEX_GRID([[0,0.3+0.035],[0,0.035],[0,0.3]]);
			Edge.push(T([1])([-0.035])(wall));

			//2 Edge 0 - 0.3
			var wall1 = SIMPLEX_GRID([[0,0.3],[0,0.035],[0,0.3]]);
			Edge.push(T([1])([-0.035])(wall));

			//3 Edge at 6 (1)
			//Surface sx
			var p0 = [[0,0,0],[0,0,0],
				[0,-0.03,0],[0,-0.03,0.06],[0,-0.06,0.06],
				[0,-0.06,0.12],[0,-0.09,0.12],[0,-0.09,0.20],
				[0,-0.13,0.22],[0,-0.09,0.24],[0,-0.09,0.26],
				[0,-0.13,0.27],[0,-0.13,0.48],[0,-0.09,0.49],[0,-0.09,0.49],
				[0,-0.09,0.5],[0,-0.09,0.5],[0,-0.13,0.5],[0,-0.13,0.5],
				[0,-0.13,0.9],[0,-0.2,1],[0,-0.2,1],[0,0,1],
				[0,0,1]];
			var p1 = p0;
			p0 = movesPoints(p0,2,6);
			var k0 = makeKnots(p0,1);
			var c0 = NUBS(S0)(1)(k0)(p0);
			var p3 = [p0[0],p0[p0.length-1]];
			var c3 = BEZIER(S0)(p3);	
			var vert1 = BEZIER(S1)([c0,c3]);
				
			p1 = scalePoints(p1,[1,SQRT(2),1]);
			p1 = rotatePoints(p1,PI/4,2);
			p1 = movesPoints(p1,2,6);
			p1 = movesPoints(p1,0,0.3);
				
			k1 = makeKnots(p1,1);
			c1 = NUBS(S0)(1)(k1)(p1);
			p2 = [p0[0],p0[p0.length-1]];
			c2 = BEZIER(S0)(p2);	
			var vert2 = BEZIER(S1)([c1,c2]);

			var vert = BEZIER(S2)([vert1,vert2]);
			Edge.push(MAP(vert)(domain3));

			//4 Edge at 7 +2.1 (0.6)
			//Surface sx
			p0 = [[0,0,0],[0,-0.04,0.10],[0,-0.13,0.15],
				[0,-0.24,0.19],[0,-0.24,0.19],
				[0,-0.22,0.24],[0,-0.3,0.315],
				[0,-0.335,0.3],[0,-0.335,0.3],
				[0,-0.5,0.6],[0,-0.5,0.6],
				[0,0,0.6]];
			p1 = p0;
			p0 = movesPoints(p0,2,7+2.1);
			k0 = [0,0,0,1,2,3,4,5,6,7,8,9,10,10,10];
			c0 = NUBS(S0)(2)(k0)(p0);
			p3 = [p0[0],p0[11]];
			c3 = BEZIER(S0)(p3);	
			vert1 = BEZIER(S1)([c0,c3]);

				
			p1 = scalePoints(p1,[1,SQRT(2),1]);
			p1 = rotatePoints(p1,PI/4,2);
			p1 = movesPoints(p1,2,7+2.1);
			p1 = movesPoints(p1,0,0.3);
				
			k1 = [0,0,0,1,2,3,4,5,6,7,8,9,10,10,10];
			c1 = NUBS(S0)(2)(k1)(p1);
			p2 = [p1[0],p1[11]];
			c2 = BEZIER(S0)(p2);	
			var vert2 = BEZIER(S1)([c1,c2]);

			var vert = BEZIER(S2)([vert1,vert2]);
			Edge.push(MAP(vert)(domain3));


			return COLOR(baseColor)(STRUCT(Edge));
		};

		var drawTympanumPorta = function(){
			var Tympanum = [];

			var drawEmbroidery = function(l,d,trasl,x,y,z,n,f){
				var cubes = [];			
				var p = l - (d + f + 2*x);
				var i = p/n;
				var cube = SIMPLEX_GRID([[0,x],[0,y],[0,z]]);

				cubes.push(T([0,2])([d-(i/2-x/2),trasl])(cube));
				cubes.push(T([0,2])([l-f-x+(i/2-x/2),trasl])(cube));

				var j = 0;
				while (j < n) {
					cubes.push(T([0,2])([
						(d+x)+(i/2-x/2)+(j*i),
						trasl])(cube));
					j += 1;
				}
					
				return COLOR(columnsColor)(STRUCT(cubes));
			}


			var wall8 = STRUCT([
				SIMPLEX_GRID([[0,2.5],[0,0.11],[0,0.15]]),
				drawEmbroidery(2.5,0.15+0.1,-0.07,0.06,0.11,0.07,10,0.15+0.1)
			]);

			Tympanum.push(T([0,1,2])([-0.25,-0.11,3.5+0.15+0.05+0.05])(wall8));

			var wall9 = STRUCT([
				SIMPLEX_GRID([[0,1.5285],[0,0.11],[0,0.15]]),
				drawEmbroidery(1.5285,0.4+0.1,-0.07,0.06,0.11,0.07,5,0.2)
			]);
			var wall10 = STRUCT([
				SIMPLEX_GRID([[0,1.5285],[0,0.11],[0,0.15]]),
				drawEmbroidery(1.5285,0.4+0.1,+0.15,0.06,0.11,0.07,5,0.2)
			]);

			//dx
			Tympanum.push(
				T([0,1,2])([+2.25,-0.11,3.5+0.15+0.05+0.05])(
				R([0,2])([PI/6 + PI])(
					T([2])([-0.15])(wall10))));

			//sx
			Tympanum.push(
				T([0,1,2])([-0.25,-0.11,3.5+0.15+0.05+0.05])(
				R([0,2])([-PI/6])(wall9)));

			return COLOR(baseColor)(STRUCT(Tympanum));
		};
		
		var drawMainGate = function(){
			var l = 6; 
			var walls = [];
			var capwall = S([0,1,2])([2,1.2,2])(drawWindowEmbroidery());
			
			var wall1 = SIMPLEX_GRID([[0,0.15],[0,0.4],[0,3.5+0.15]]);
			walls.push(T([1])([-0.03])(wall1));
			walls.push(T([0,1])([0.15+1.7,-0.03])(wall1));

			var wall3 = SIMPLEX_GRID([[0,1.7],[0,0.4],[0,0.15]]);
			walls.push(T([0,1,2])([0.15,-0.03,3.5])(wall3));
				
			var wall7 =	SIMPLEX_GRID([[0,1],[0,0.3],[0,6]]);
			walls.push(T([0])([-1])(wall7));
			walls.push(T([0])([1.7+0.15+0.15])(wall7));

			var wall6 = SIMPLEX_GRID([[0,1.7+0.15+0.15],[0,0.3],[0,6-3.5-0.15]]);
			walls.push(T([2])([3.5+0.15])(wall6));

			var wall4 = SIMPLEX_GRID([[0,4],[0,0.3],[0,2.1]]);
			walls.push(T([0,2])([-1,7])(wall4));	


			walls.push(T([0,2])([-0.25,3.5-0.6+0.05])(capwall));
			walls.push(T([0,2])([2+0.05,3.5-0.6+0.05])(capwall));
			walls.push(drawTympanumPorta());

			var wall = COLOR(baseColor)(STRUCT(walls));
			var windows = [];

			//Barriers with glass
			var glass = COLOR(windowsColor)(BOUNDARY(
				SIMPLEX_GRID([[0,1.7],[0,0.01],[0,3.5]])));

			var verticalBarrier = COLOR([0,0,0])(
				SIMPLEX_GRID([[0,0.08],[0,0.04],[0,3.5]]));

			var orizontalBarrier = COLOR([0,0,0])(
				SIMPLEX_GRID([[0,1.7-0.08],[0,0.04],[0,0.08]]));
				
			var stripeVert = COLOR([0,0,0])(
				SIMPLEX_GRID([[0,0.04],[0,0.04],[0,3.5]]));

			windows.push(T([0,1])([0.15,0.2])(glass));
			windows.push(T([0,1])([0.15,0.2-0.04])(drawVerticalGrate(1.7,3.5)));
			windows.push(T([0,1])([0.15+0.85,0.2-0.04])(verticalBarrier));
			windows.push(T([0,1])([0.15,0.2-0.04])(stripeVert));
			windows.push(T([0,1])([0.15+1.7-0.04,0.2-0.04])(stripeVert));
			windows.push(T([0,1,2])([0.15+0.04,0.2-0.04,2.33])(orizontalBarrier));
			windows.push(T([0,1,2])([0.15+0.04,0.2-0.04,1.16])(orizontalBarrier));
			windows.push(T([0,1])([0.15+0.04,0.2-0.04])(orizontalBarrier));
			windows.push(T([0,1,2])([0.15+0.04,0.2-0.04,3.5-0.08])(orizontalBarrier));
			windows.push(wall);

			return STRUCT([T([2])([6])(drawEdgewall0(4)),
				T([0])([1])(STRUCT(windows)),
				T([2])([7+2.1])(drawEdgewall1(4))]);
		};

		var baseDaReplicare = STRUCT([					
			//5.3		
			T([0])([-2.3])(simpleWall(2.3)),
			T([0])([-2.3-2])(drawWindow1()),
			T([0])([-2.3-2-0.7])(simpleWall(0.7)),
			T([0])([-2.3-2-0.7])(S([0])([-1])(drawAngleStruttura())),

			//8.79/2 = 4.395
			simpleWall1(0.395),
			T([0])([0.395])(drawWindow3()),
			T([0])([2+0.395])(drawMainGate()),
			T([0])([2+0.395+4])(drawWindow3()),
			T([0])([2+0.395+4+2])(simpleWall1(0.395)),

			//5.3
			T([0])([8.79])(simpleWall(2.3)),
			T([0])([8.79+2.3])(drawWindow1()),
			T([0])([8.79+2.3+2])(simpleWall(0.7)),
			T([0])([8.79+2.3+2+0.7])(drawAngleStruttura())
		]);


		baseDaReplicare = T([0,1,2])([-9.695+5.3,	-9.695,	3])(baseDaReplicare);


			
		//Reproduction for the other sides
		var r = R([0,1])([-PI/2]);
		return STRUCT([baseDaReplicare,r,
				baseDaReplicare,r,baseDaReplicare,r,baseDaReplicare]);
	}

	DRAW(drawFacade());


	/*
	 * Columns
	 */

	var drawColumns = function(){

		var columns = [];

		var drawCapital = function(l){
			var l = l || 0.3+0.8

			var Capital = [];

			var capitalwithtrolsPoints = function(maxRadius) {
				 maxRadius = maxRadius || 1;
				 var withtrolPoints = [];
				 
				 var i = 0;
				 var Angle = PI/2;

				 for (i = 0; i < 13; i++) {
				  withtrolPoints.push( [
				  	maxRadius * ( COS(i*Angle) + i*SIN(i*Angle)  ),
				  	0,
				  	maxRadius * ( SIN(i*Angle) - i*COS(i*Angle)  )] );
				 }
				 
				 return withtrolPoints;
			};

			var rotationAngle = 2.18/3*PI;

			//Base 1
			var p0 = capitalwithtrolsPoints(0.03);
			p0 = rotatePoints(p0,rotationAngle,1);
			var k0 = makeKnots(p0,2);
			var c0 = NUBS(S0)(2)(k0)(p0);
			var p1 = capitalwithtrolsPoints(0.035);
			p1 = rotatePoints(p1,rotationAngle,1);
			var k1 = makeKnots(p1,2);
			var c1 = NUBS(S0)(2)(k1)(p1);
			var s0 = BEZIER(S1)([c0,c1]);

			//Base 11
			var p2 = capitalwithtrolsPoints(0.03);
			p2 = rotatePoints(p2,rotationAngle,1);
			p2 = movesPoints(p2,1,1.1);
			var k2 = makeKnots(p2,2);
			var c2 = NUBS(S0)(2)(k2)(p2);
			var p3 = capitalwithtrolsPoints(0.035);
			p3 = rotatePoints(p3,rotationAngle,1);
			p3 = movesPoints(p3,1,1.1);
			var k3 = makeKnots(p3,2);
			var c3 = NUBS(S0)(2)(k3)(p3);
			var s1 = BEZIER(S1)([c2,c3]);

			var b1 = BEZIER(S2)([s0,s1]);
			var base1 = MAP(b1)(domain3);
			Capital.push(base1);

			//Base 2
			var p0 = capitalwithtrolsPoints(0.03);
			p0 = rotatePoints(p0,rotationAngle,1);
			p0 = scalePoints(p0,[-1,1,1]);
			p0 = movesPoints(p0,0,-(l));
			var k0 = makeKnots(p0,2);
			var c0 = NUBS(S0)(2)(k0)(p0);
			var p1 = capitalwithtrolsPoints(0.035);
			p1 = rotatePoints(p1,rotationAngle,1);
			p1 = scalePoints(p1,[-1,1,1]);
			p1 = movesPoints(p1,0,-(l));
			var k1 = makeKnots(p1,2);
			var c1 = NUBS(S0)(2)(k1)(p1);
			var s0 = BEZIER(S1)([c0,c1]);

			//Base 22
			var p2 = capitalwithtrolsPoints(0.03);
			p2 = rotatePoints(p2,rotationAngle,1);
			p2 = scalePoints(p2,[-1,1,1]);
			p2 = movesPoints(p2,0,-(l));
			p2 = movesPoints(p2,1,1.1);
			var k2 = makeKnots(p2,2);
			var c2 = NUBS(S0)(2)(k2)(p2);
			var p3 = capitalwithtrolsPoints(0.035);
			p3 = rotatePoints(p3,rotationAngle,1);
			p3 = scalePoints(p3,[-1,1,1]);
			p3 = movesPoints(p3,0,-(l));
			p3 = movesPoints(p3,1,1.1);
			var k3 = makeKnots(p3,2);
			var c3 = NUBS(S0)(2)(k3)(p3);
			var s1 = BEZIER(S1)([c2,c3]);

			var b2 = BEZIER(S2)([s0,s1]);
			var base2 = MAP(b2)(domain3);
			Capital.push(base2);

			//CopriCapital - 1
			var p0 = capitalwithtrolsPoints(0.03);
			p0 = rotatePoints(p0,rotationAngle,1);
			var k0 = makeKnots(p0,2);
			var c0 = NUBS(S0)(2)(k0)(p0);
			var fp = BEZIER(S0)([p0[0],p0[0]]);
			var s0 = BEZIER(S1)([c0,fp]);

			var p2 = capitalwithtrolsPoints(0.03);
			p2 = rotatePoints(p2,rotationAngle,1);
			p2 = movesPoints(p2,1,1);
			var k2 = makeKnots(p2,2);
			var c2 = NUBS(S0)(2)(k2)(p2);
			fp = BEZIER(S0)([p2[0],p2[0]]);
			var s1 = BEZIER(S1)([c2,fp]);

			var b1 = BEZIER(S2)([s0,s1]);
			var base1 = MAP(b1)(domain3);
			Capital.push(T([1])([0.05])(base1));

			//CopriCapital - 2 
			var p0 = capitalwithtrolsPoints(0.03);
			p0 = rotatePoints(p0,rotationAngle,1);
			p0 = scalePoints(p0,[-1,1,1]);
			p0 = movesPoints(p0,0,-(l));
			var k0 = makeKnots(p0,2);
			var c0 = NUBS(S0)(2)(k0)(p0);
			fp = BEZIER(S0)([p0[0],p0[0]]);
			var s0 = BEZIER(S1)([c0,fp]);


			var p2 = capitalwithtrolsPoints(0.03);
			p2 = rotatePoints(p2,rotationAngle,1);
			p2 = scalePoints(p2,[-1,1,1]);
			p2 = movesPoints(p2,0,-(l));
			p2 = movesPoints(p2,1,1);
			var k2 = makeKnots(p2,2);
			var c2 = NUBS(S0)(2)(k2)(p2);
			fp = BEZIER(S0)([p2[0],p2[0]]);
			var s1 = BEZIER(S1)([c2,fp]);

			var b2 = BEZIER(S2)([s0,s1]);
			var base2 = MAP(b2)(domain3);
			Capital.push(T([1])([0.05])(base2));


			return COLOR(columnsColor)(STRUCT([
				T([0,2])([0.25+l,+0.25])(STRUCT(Capital)),
				T([0,2])([0.3,0.465])(
				SIMPLEX_GRID([[0,0.25+l-0.3],[0,1.1],[0,0.03]])),
				T([0,1,2])([0.4,0.05,0.2])(
					SIMPLEX_GRID([[0,l-0.3],[0,1],[0,0.28]]))
				]));

		}

		columns.push(
			T([2])([5.75])(
				S([0,1,2])([0.5,0.5,0.5])(
					T([0,1])([-0.8,-0.55])(
						drawCapital(1.1)))));


		//Column
		var drawColumn = function(altezza){
			var column = [];
			var h = altezza || 5.5;
		 	var d = d || 0.05;

			//Profile 1
			var p0 = [[0,0,0],[0.4,0,0],[0.4,0,0],
			[0.4,0,0.04],[0.36,0,0.06],[0.34,0,0.08],[0.34,0,0.08],
			[0.34,0,0.10],[0.34,0,0.10],[0.36,0,0.10],[0.36,0,0.10],
			[0.36,0,0.12],[0.35,0,0.14],[0.33,0,0.16],[0.32,0,0.18],
			[0.30,0,0.18]];
			var k0 = makeKnots(p0,2);
			var c0 = NUBS(S0)(2)(k0)(p0);
			var mapping = ROTATIONAL_SURFACE(c0);
			var surface = MAP(mapping)(domain2pi);
			column.push(surface);

			//Profile 2
			var p1 = [[0.30,0,0.18],
			[0.28,0,2.8/4*h],
			[0.27,0,3/4*h+0.5],
			[0.26,0,h]];
			var k1 = makeKnots(p1,2);
			var c1 = NUBS(S0)(2)(k1)(p1);
			var mapping = ROTATIONAL_SURFACE(c1);
			var surface = MAP(mapping)(domain2pi);
			column.push(surface);

			//Profile 3
			var p2 = [[0.26,0,h],[0.28,0,h],
			[0.28,0,h+0.05],[0.26,0,h+0.05],[0,0,h+0.05]
			];
			var k2 = makeKnots(p2,2);
			var c2 = NUBS(S0)(2)(k2)(p2);
			var mapping = ROTATIONAL_SURFACE(c2);
			var surface = MAP(mapping)(domain2pi);
			column.push(surface);

			return COLOR(baseColor1)(STRUCT(column));
		}
		
		columns.push(T([2])([0.1])(drawColumn(5.7)));

		//Column base
		columns.push(T([0,1])([-0.4,-0.4])(COLOR(columnsColor)(
			SIMPLEX_GRID([[0,0.8],[0,0.8],[0,0.1]]))));

		var column = T([0,1])([0.4,0.4])(STRUCT(columns));

		var baseToRotate = 
		T([0,1,2])([5.3-9.695,(-10.4+6)-9.695,3])(
			STRUCT([column,
				T([0])([1.465])(column),
				T([0])([2*1.465])(column),
				T([0])([3*1.465+0.646])(column),
				T([0])([3*1.465+0.646])(column),
				T([0])([4*1.465+0.646])(column),
				T([0])([5*1.465+0.646])(column),		
				]));
		
		//Reproduction for the other sides
		var r = R([0,1])([-PI/2]);
		return STRUCT([baseToRotate,r,baseToRotate,r,baseToRotate,r,baseToRotate]);
	}

	DRAW(drawColumns());


	/*
	 * Tympanum
	 */

	var drawTympanum = function(){
		var columns = [];


		var drawArcade = function(){

			var Arcade = [];
			
			var m =	SIMPLEX_GRID([[0,0.8],[0,3.6],[0,0.3]]);
			Arcade.push(COLOR(baseColor)(m));
			var m1 =	SIMPLEX_GRID([[0,0.8-0.07],[0,3.6-0.035],[0,0.5]]);
			Arcade.push(COLOR(baseColor)(T([0,1,2])([0.035,0.035,0.3])(m1)));
			var m2 =	SIMPLEX_GRID([[0,0.8-0.07],[0,0.9-0.035],[0,6-(0.5+0.3)]]);
			Arcade.push(COLOR(baseColor)(T([0,1,2])([0.035,0.035,0.3+0.5])(m2)));
			var m3 =	SIMPLEX_GRID([[0,0.8-0.07],[0,0.8],[0,6-(0.5+0.3)]]);
			Arcade.push(COLOR(baseColor)(T([0,1,2])([0.035,0.9+1.9,0.3+0.5])(m3)));
			var m4 =	SIMPLEX_GRID([[0,0.8],[0,0.9+0.035],[0,0.4]]);
			Arcade.push(COLOR(columnsColor)(T([2])([6-1.9-0.4])(m4)));
			var m5 =	SIMPLEX_GRID([[0,0.8],[0,0.8+0.035+0.02],[0,0.4]]);
			Arcade.push(COLOR(columnsColor)(T([1,2])([0.9+1.9-0.035,6-1.9-0.4])(m5)));

			var p0 = [[0.035,0,6],[0.035,1.9,6],[0.035,1.9,6]];
			var k0 = makeKnots(p0,2);
			var c0 = NUBS(S0)(2)(k0)(p0);
			var p1 = [[0.035,0,(6-1.9)],
				[0.035,0.475-0.3,(6-1.9)+0.8],
				[0.035,3*0.475+0.3,(6-1.9)+0.8],
				[0.035,1.9,(6-1.9)]
				];
			var k1 = makeKnots(p1,2);
			var c1 = NUBS(S0)(2)(k1)(p1);
			var surf0 = BEZIER(S1)([c0,c1]);

			var p2 = movesPoints(p0,0,0.8-0.07);
			var k2 = makeKnots(p2,2);
			var c2 = NUBS(S0)(2)(k2)(p2);
			var p3 = movesPoints(p1,0,0.8-0.07);
			var k3 = makeKnots(p3,2);
			var c3 = NUBS(S0)(2)(k3)(p3);
			var surf1 = BEZIER(S1)([c2,c3]);
			var surf2 = BEZIER(S2)([surf0,surf1]);
			surf2 = MAP(surf2)(domain3);
			Arcade.push(COLOR(baseColor)(T([1])([0.9])(surf2)));


			var p0 = [[0,0,6],[0,0.8,6],[0,0.8,6]];
			var k0 = makeKnots(p0,2);
			var c0 = NUBS(S0)(2)(k0)(p0);
			var p1 = [[0,0,6],[0,0,6],
				[0,0.15,6-(1.15)],[0,0.15,6-(1.15)],
				[0,0.8-0.15,6-(1.15)],[0,0.8-0.15,6-(1.15)],
				[0,0.8,6],[0,0.8,6]
				];
			var k1 = makeKnots(p1,1);
			var c1 = NUBS(S0)(1)(k1)(p1);
			var surf0 = BEZIER(S1)([c0,c1]);

			var p2 = movesPoints(p0,0,0.8);
			var k2 = makeKnots(p2,2);
			var c2 = NUBS(S0)(2)(k2)(p2);
			var p3 = movesPoints(p1,0,0.8);
			var k3 = makeKnots(p3,1);
			var c3 = NUBS(S0)(1)(k3)(p3);
			var surf1 = BEZIER(S1)([c2,c3]);
			var surf2 = BEZIER(S2)([surf0,surf1]);
			surf2 = MAP(surf2)(domain3);
			Arcade.push(COLOR(columnsColor)(T([1])([0.9+0.95-0.4])(surf2)));

			return STRUCT(Arcade);
		}

		columns.push(drawArcade());
		columns.push(T([0])([8.79-0.8])(drawArcade()));

		var drawEdge = function (d){

		 	var d = d || 2;

			//Surface sx
			var p0 = [[0,0,0],[0,0,0],
			[0,-0.03,0],[0,-0.03,0.06],[0,-0.06,0.06],
			[0,-0.06,0.12],[0,-0.09,0.12],[0,-0.09,0.20],
			[0,-0.13,0.22],[0,-0.09,0.24],[0,-0.09,0.26],
			[0,-0.13,0.27],[0,-0.13,0.48],[0,-0.09,0.49],[0,-0.09,0.49],
			[0,-0.09,0.5],[0,-0.09,0.5],[0,-0.13,0.5],[0,-0.13,0.5],
			[0,0,0.5],[0,0,0.5]
			];
			var k0 = makeKnots(p0,1)
			var c0 = NUBS(S0)(1)(k0)(p0);
			var p1 = [p0[0],p0[p0.length-1]];
			var c1 = BEZIER(S0)(p1);	
			var vert1 = BEZIER(S1)([c0,c1]);

			//Surface dx
			p0 = movesPoints(p0,0,d)
			k0 = makeKnots(p0,1)
			c0 = NUBS(S0)(1)(k0)(p0);
			p1 = [p0[0],p0[p0.length-1]];
			c1 = BEZIER(S0)(p1);	
			var vert2 = BEZIER(S1)([c0,c1]);

			var vert = BEZIER(S2)([vert1,vert2]);		

			return COLOR(baseColor)(STRUCT([MAP(vert)(domain3)]));
		}

		var drawAngle = function (){

			var Edge = [];

			//Surface sx
			var p0 = [[0,0,0],[0,0,0],
				[0,-0.03,0],[0,-0.03,0.06],[0,-0.06,0.06],
				[0,-0.06,0.12],[0,-0.09,0.12],[0,-0.09,0.20],
				[0,-0.13,0.22],[0,-0.09,0.24],[0,-0.09,0.26],
				[0,-0.13,0.27],[0,-0.13,0.48],[0,-0.09,0.49],[0,-0.09,0.49],
				[0,-0.09,0.5],[0,-0.09,0.5],[0,-0.13,0.5],[0,-0.13,0.5],
				[0,0,0.5],[0,0,0.5]
			];
			var p1 = p0;
			var p4 = p0;
			var k0 = makeKnots(p0,1);
			var c0 = NUBS(S0)(1)(k0)(p0);
			var p3 = [p0[0],p0[p0.length-1]];
			var c3 = BEZIER(S0)(p3);	
			var vert1 = BEZIER(S1)([c0,c3]);

			p1 = scalePoints(p1,[1,SQRT(2),1]);
			p1 = rotatePoints(p1,PI/4,2);	
			k1 = makeKnots(p1,1);
			c1 = NUBS(S0)(1)(k1)(p1);
			p2 = [p1[0],p1[p1.length-1]];
			c2 = BEZIER(S0)(p2);	
			var vert2 = BEZIER(S1)([c1,c2]);
			
			var vert = BEZIER(S2)([vert1,vert2]);
			Edge.push(MAP(vert)(domain3));

			//Surface dx
			var p4 = rotatePoints(p4,PI/2,2);
			var k4 = makeKnots(p4,1);
			var c4 = NUBS(S0)(1)(k4)(p4);
			var p5 = [p4[0],p4[p4.length-1]];
			var c5 = BEZIER(S0)(p5);	
			var vert5 = BEZIER(S1)([c4,c5]);

			var vert = BEZIER(S2)([vert5,vert2]);
			Edge.push(MAP(vert)(domain3));

			return COLOR(baseColor)(STRUCT(Edge));
		}


		var drawTympanum = function(){

			var Tympanum = [];

			//Tympanum Edge 
			var b1 = drawEdge(4.4);
			Tympanum.push(T([0])([8.79])(R([0,1])([PI/2])(b1)));
			Tympanum.push(T([1])([4.4])(R([0,1])([-PI/2])(b1)));
			var b2 = drawEdge(8.79);
			Tympanum.push(b2);
			var a1 = drawAngle();
			Tympanum.push(T([0])([8.79])(a1));
			Tympanum.push(S([0])([-1])(a1));

			Tympanum.push(T([1,2])([0.8,0.5-0.05])(COLOR(baseColor)(
				SIMPLEX_GRID([[0,8.79],[0,4.4-0.8],[0,0.05]]))));

			Tympanum.push(T([1,2])([0.8,0])(COLOR(baseColor)(
				SIMPLEX_GRID([[0,0.8-0.035],[0,4.4-0.8],[0,0.5]]))));
			Tympanum.push(T([0,1,2])([8.79-0.8+0.035,0.8,0])(COLOR(baseColor)(
				SIMPLEX_GRID([[0,0.8-0.035],[0,4.4-0.8],[0,0.5]]))));

			Tympanum.push(T([2])([0])(COLOR(baseColor)(
				SIMPLEX_GRID([[0,8.79],[0,0.8],[0,0.5]]))));


			//Tympanum Edge 1
			//Angle sx
			var p0 = [[0,0,0],[0,0,0],
			[0,-0.3,0],[0,-0.3,0.1],[0,-0.28,0.1],
			[0,-0.28,0.24],[0,-0.4,0.24],[0,-0.4,0.30],
			[0,-0.4,0.3],[0,0,0.3],[0,0,0.3]];
			var p1 = p0;
			var p2 = p0;
			p0 = scalePoints(p0,[1,SQRT(2),1]);
			p0 = rotatePoints(p0,-PI/4,2);	
			p0 = movesPoints(p0,2,0.5);
			var k0 = makeKnots(p0,1);
			var c0 = NUBS(S0)(1)(k0)(p0);
			var p00 = [p0[0],p0[p0.length-1]];
			var c00 = BEZIER(S0)(p00);	
			var vert0 = BEZIER(S1)([c0,c00]);

			p1 = movesPoints(p1,0,4.395);
			p1 = movesPoints(p1,2,2.5);
			var k1 = makeKnots(p1,1);
			var c1 = NUBS(S0)(1)(k1)(p1);
			var p11 = [p1[0],p1[p1.length-1]];
			var c11 = BEZIER(S0)(p11);	
			var vert1 = BEZIER(S1)([c1,c11]);

			p2 = scalePoints(p2,[1,SQRT(2),1]);
			p2 = rotatePoints(p2,PI/4,2);	
			p2 = movesPoints(p2,0,8.79);
			p2 = movesPoints(p2,2,0.5);
			var k2 = makeKnots(p2,1);
			var c2 = NUBS(S0)(1)(k2)(p2);
			var p22 = [p2[0],p2[p2.length-1]];
			var c22 = BEZIER(S0)(p22);	
			var vert2 = BEZIER(S1)([c2,c22]);

			var s1 = BEZIER(S2)([vert0,vert1]);
			Tympanum.push(COLOR(baseColor)(
				MAP(s1)(domain3)));
			var s2 = BEZIER(S2)([vert1,vert2]);
			Tympanum.push(COLOR(baseColor)(
				MAP(s2)(domain3)));

			//Tympanum
			var p0 = [[0,0,0.5],[0,0,0.5],
				[4.395,0,0.5+2],[4.395,0,0.5+2],
				[8.79,0,0.5],[8.79,0,0.5]
			];
			var k0 = makeKnots(p0,1);
			var c0 = NUBS(S0)(1)(k0)(p0);
			var p00 = [p0[0],p0[0]];
			var c00 = BEZIER(S0)(p00);	
			var vert0 = BEZIER(S1)([c0,c00]);
			Tympanum.push(COLOR(baseColor)(MAP(vert0)(domain2)));
			

			//Circle
			var co1 = 2.1; var co2 = 1.9; var co3 = 2.3;
			var h1 = 0.9; var h2 = 1.2;
			var p1 = [[co1,0,h1],[co2,0,h1],
				[co2,0,h2],[co3,0,h2],
				[co3,0,h1],[co1,0,h1]];
			p1 = movesPoints(p1,1,-0.001);
			p1 = movesPoints(p1,0,0.5);
			var k1 = makeKnots(p1,2);
			var c1 = NUBS(S0)(2)(k1)(p1);
			var p22 = [p1[0],p1[0]];
			var c22 = BEZIER(S0)(p22);	
			var vert0 = BEZIER(S1)([c1,c22]);
			Tympanum.push(COLOR([0,0,0])(MAP(vert0)(domain2)));

			p1 = movesPoints(p1,0,0.4+2*(4.395-co2-0.5-co3+co2));
			var k1 = makeKnots(p1,2);
			var c1 = NUBS(S0)(2)(k1)(p1);
			var p22 = [p1[0],p1[0]];
			var c22 = BEZIER(S0)(p22);	
			var vert0 = BEZIER(S1)([c1,c22]);
			Tympanum.push(COLOR([0,0,0])(MAP(vert0)(domain2)));

			//Border
			var d = -0.02
			p1 = [[co1,0,h1],[co2,0,h1],
				[co2,0,h2],[co3,0,h2],
				[co3,0,h1],[co1,0,h1]];
			p1 = movesPoints(p1,0,0.5);
			k1 = makeKnots(p1,2);
			c1 = NUBS(S0)(2)(k1)(p1);

			var p22 = [[co1,0,h1-0.05],[co2-0.05,0,h1-0.05],
				[co2-0.05,0,h2+0.05],[co3+0.05,0,h2+0.05],
				[co3+0.05,0,h1-0.05],[co1,0,h1-0.05]];
			p22 = movesPoints(p22,0,0.5);
			var k22 = makeKnots(p22,2);
			var c22 = NUBS(S0)(2)(k22)(p22);
			var vert0 = BEZIER(S1)([c1,c22]);

			var p1 = movesPoints(p1,1,d);
			c1 = NUBS(S0)(2)(k1)(p1);
			var p22 = movesPoints(p22,1,d);
			var c22 = NUBS(S0)(2)(k22)(p22);
			var vert1 = BEZIER(S1)([c1,c22]);

			var s0 = BEZIER(S2)([vert1,vert0]);
			var mapped = MAP(s0)(domain3);
			Tympanum.push(COLOR(baseColor1)(mapped));
			Tympanum.push(COLOR(baseColor1)(
				T([0])([0.4+2*(4.395-co2-0.5-co3+co2)])(mapped)));


			var d = 0.0005;

			//Roof-1
			var p0 = [[-0.4,-0.4,0.5+0.3+d],[-0.4,-0.4,0.5+0.3+d],
				[-0.4,4.4,0.5+0.3+d],[-0.4,4.4,0.5+0.3+d],
				[4.395,4.4,0.5+2+0.3+d],[4.395,4.4,0.5+2+0.3+d],
				[4.395,-0.4,0.5+2+0.3+d],[4.395,-0.4,0.5+2+0.3+d]			
			];
			var k0 = makeKnots(p0,1);
			var c0 = NUBS(S0)(1)(k0)(p0);
			var p00 = [p0[0],p0[0]];
			var c00 = BEZIER(S0)(p00);	
			var vert0 = BEZIER(S1)([c0,c00]);
			Tympanum.push(COLOR(roofColor)(MAP(vert0)(domain2)));

			//Roof-2
			var p0 = [[4.395,4.4,0.5+2+0.3+d],[4.395,4.4,0.5+2+0.3+d],
				[4.395,-0.4,0.5+2+0.3+d],[4.395,-0.4,0.5+2+0.3+d],
				[8.79+0.4,-0.4,0.5+0.3+d],[8.79+0.4,-0.4,0.5+0.3+d],
				[8.79+0.4,4.4,0.5+0.3+d],[8.79+0.4,4.4,0.5+0.3+d]			
			];
			var k0 = makeKnots(p0,1);
			var c0 = NUBS(S0)(1)(k0)(p0);
			var p00 = [p0[0],p0[0]];
			var c00 = BEZIER(S0)(p00);	
			var vert0 = BEZIER(S1)([c0,c00]);
			Tympanum.push(COLOR(roofColor)(MAP(vert0)(domain2)));

			var drawStatueBase = function(){
				var base2 = [];
				base2.push(SIMPLEX_GRID([[0,0.6],[0,0.6],[0,0.6]]));
				base2.push(T([0,1,2])([-0.1,-0.1,0.6])(
							SIMPLEX_GRID([[0,0.8],[0,0.8],[0,0.03]])));
				base2.push(T([0,1,2])([-0.05,-0.05,0.63])(
							SIMPLEX_GRID([[0,0.7],[0,0.7],[0,0.03]])));
				base2.push(T([0,1,2])([-0.1,-0.1,0.66])(
							SIMPLEX_GRID([[0,0.8],[0,0.8],[0,0.03]])));

				return COLOR(baseColor1)(STRUCT(base2));
			}

			Tympanum.push(T([0,1,2])([0.1,0.1,0.5+0.3])(drawStatueBase()));
			Tympanum.push(T([0,1,2])([4.395-0.3,0.1,0.5+0.3+1.55])(drawStatueBase()));
			Tympanum.push(T([0,1,2])([8.79-0.6,0.1,0.5+0.3])(drawStatueBase()));


			//Coat-of-arms
			var drawDecoration = function(){

			    var domain = DOMAIN([[0,1],[0,1]])([90,1]); 

			    var points1 = [[0,0.3,0.03],[-0.08,0.3,0],[-0.25,0.4,0],
			    [-0.21,0.4,0],[-0.21,0.475,0.03],[-0.25,0.59,0.05],
			      [-0.24,0.55,0.05],[-0.16,0.55,0.05],[-0.16,0.7,0.03],
			      [-0.25,0.65,0.05],[-0.21,0.75,0.03],
			      [-0.12,0.75,0.03],[-0.15,0.8,0.05],
			      [0.15,0.8,0.05],[0.12,0.75,0.05],[0.21,0.75,0.05],
			      [0.25,0.65,0.05],[0.16,0.7,0.03],[0.16,0.55,0.05],
			      [0.24,0.55,0.05],[0.25,0.59,0.05],
			      [0.21,0.475,0.03],[0.21,0.4,0],[0.25,0.4,0],
			      [0.08,0.3,0],[0,0.3,0.03]
			    ];

			    points1 = movesPoints(points1,1,-0.3);
			    points1 = rotatePoints(points1,PI/2,0);
			    points1 = scalePoints(points1,[1.5,1.5,1.5]);
			    var points2 = movesPoints(points1,1,-0.03);

			    var knots = makeKnots(points1,2);
			    var curve1 = NUBS(S0)(2)(knots)(points1);
			    var curve2 = NUBS(S0)(2)(knots)(points2);

			    var p1 = [[0,0,0.3]];
			    var p2 = [[0,0.05,0.3]]
			    var sup3 = BEZIER(S1)([curve1,curve2]);
			    sup3 = MAP(sup3)(domain);

			    var c1 = BEZIER(S0)(p1);
			    var curve3 = BEZIER(S1)([curve1,c1]);
			    var surface1 = MAP(curve3)(domain);

			    var c2 = BEZIER(S0)(p2);
			    var curve4 = BEZIER(S1)([curve2,c2]);
			    var surface2 = MAP(curve4)(domain);

			    var superfice = STRUCT([sup3, surface1, surface2]);
			    return COLOR(columnsColor)(T([0])([0])(superfice));
			}

			Tympanum.push(T([0,1,2])([4.395,-0.03,0.5+0.5])(drawDecoration()));


			var tympanumEdge1 = function(l){

				//Angle a sx
				var p0 = [[0,0,0],[0,0,0],
					[0,-0.3,0],[0,-0.3,0.1],[0,-0.28,0.1],
					[0,-0.28,0.24],[0,-0.4,0.24],[0,-0.4,0.30],
					[0,-0.4,0.3],[0,0,0.3],[0,0,0.3]
					];
				var p1 = p0;
				p0 = scalePoints(p0,[1,SQRT(2),1]);
				p0 = rotatePoints(p0,-PI/4,2);
				var k0 = makeKnots(p0,1);
				var c0 = NUBS(S0)(1)(k0)(p0);
				var p00 = [p0[0],p0[p0.length-1]];
				var c00 = BEZIER(S0)(p00);	
				var vert0 = BEZIER(S1)([c0,c00]);

				var p1 = movesPoints(p1,0,l);
				var k1 = makeKnots(p1,1);
				var c1 = NUBS(S0)(1)(k2)(p1);
				var p11 = [p1[0],p1[p1.length-1]];
				var c11 = BEZIER(S0)(p11);	
				var vert1 = BEZIER(S1)([c1,c11]);
				var s2 = BEZIER(S2)([vert0,vert1]);

				return COLOR(baseColor)(MAP(s2)(domain3));
			}

			Tympanum.push(
				T([0,2])([8.79,0.5])(
					R([0,1])([PI/2])(
						tympanumEdge1(4.4))));
			Tympanum.push(
				T([2])([0.5])(R([0,1])([-PI/2])(
						S([0])([-1])(tympanumEdge1(4.4)))));

			//Tympanum edge-2
			var tympanumEdge2 = function(l){
			
				var p0 = [[0,0,0],[0,0,0],
				[0,-0.3,0],[0,-0.3,0.03],[0,-0.28,0.03],
				[0,-0.28,0.06],[0,-0.3,0.06],[0,-0.3,0.1],
				[0,0,0.1],[0,0,0.1]];

				var k0 = makeKnots(p0,1);
				var c0 = NUBS(S0)(1)(k0)(p0);
				var p00 = [p0[0],p0[p0.length-1]];
				var c00 = BEZIER(S0)(p00);	
				var vert0 = BEZIER(S1)([c0,c00]);

				var p2 = movesPoints(p0,0,l);
				var k2 = makeKnots(p2,1);
				var c2 = NUBS(S0)(1)(k2)(p2);
				var p22 = [p2[0],p2[p2.length-1]];
				var c22 = BEZIER(S0)(p22);	
				var vert2 = BEZIER(S1)([c2,c22]);

				var s2 = BEZIER(S2)([vert0,vert2]);
				return COLOR(baseColor)(MAP(s2)(domain3));
			}


			Tympanum.push(T([0,2])([-0.25-0.04,0.5])(tympanumEdge2(9.29+0.08)));

			//Plate 
			Tympanum.push(T([0,1])([4.395-0.4,-0.13-0.05])(
				COLOR(baseColor1)(SIMPLEX_GRID([[0,0.8],[0,0.05],[0,0.4]]))));

			var drawEmbroidery = function(l,n,x,y,z,s,f){
				var cubes = [];			
				var p = l - (s + f);
				var d = (p-x*n)/(n-1);
				var i = x+d;			
				var cube = SIMPLEX_GRID([[0,x],[0,y],[0,z]]);

				cubes.push(T([0])([l-f-x])(cube));

				var j = 0;
				while (j < n-1) {
					cubes.push(T([0])([s+j*(i)])(cube));
					j += 1;
				}
				
				return COLOR(columnsColor)(STRUCT(cubes));
			}

			Tympanum.push(T([1,2])([-0.13-0.07,-0.08+0.5])(
				drawEmbroidery(8.79,40,0.07,0.07,0.08,0.05,0.05)));
			Tympanum.push(T([1,2])([-0.13-0.07,-0.08+0.5+0.1])(
				R([0,2])([-PI/7.7])(drawEmbroidery(4.7,24,0.07,0.07,0.08,0.5,0.05))));
			Tympanum.push(T([0,1,2])([8.79,-0.13-0.07,-0.08+0.5+0.1])(
				R([0,2])([+PI/7.7])(
					T([0])([-4.7])(drawEmbroidery(4.7,24,0.07,0.07,0.08,0.05,0.5)))));

			var sL = drawEmbroidery(4.4,23,0.07,0.07,0.08,0.05,0.05);
			Tympanum.push(T([1,2])([4.4,-0.08+0.5])(
				R([0,1])([-PI/2])(T([1])([-0.13-0.07])(sL))));
			Tympanum.push(T([0,2])([8.79,-0.08+0.5])(
				R([0,1])([+PI/2])(T([1])([-0.13-0.07])(sL))));


			return STRUCT(Tympanum);
		}


		columns.push(T([1,2])([-0.8,6])(drawTympanum()));
		
		var baseToRotate = T([0,1,2])(
			[+5.3-9.695,-3.6 -9.695,3])(STRUCT(columns));

		var r = R([0,1])([-PI/2]);
		return STRUCT([baseToRotate,r,baseToRotate,r,baseToRotate,r,baseToRotate]);
	}

	DRAW(drawTympanum());

	/*
	 * Roof and dome
	 */

	var drawRoof = function () {

		var roof = [];

		var m = COLOR(baseColor)(
			T([0,1,2])([-9.695,-9.695,12.7-0.02])(
				SIMPLEX_GRID([[0,19.39],[0,19.39],[0,0.02]])));
		roof.push(m);

		var p0 = [[-9.695-0.5,-9.695-0.05,12.7],[-9.695-0.5,-9.695-0.5,12.7],
			[+9.695+0.5,-9.695-0.5,12.7],[+9.695+0.5,-9.695-0.5,12.7],
			[+9.695+0.5,+9.695+0.5,12.7],[+9.695+0.5,+9.695+0.5,12.7],
			[-9.695-0.5,+9.695+0.5,12.7],[-9.695-0.5,+9.695+0.5,12.7],
			[-9.695-0.5,-9.695-0.5,12.7],[-9.695-0.5,-9.695-0.5,12.7]
		];
		var k0 = makeKnots(p0,1);
		var c0 = NUBS(S0)(1)(k0)(p0);
		var p00 = [[0,0,12.7+3],[0,0,12.7+3]];
		var c00 = BEZIER(S0)(p00);	
		var vert0 = BEZIER(S1)([c0,c00]);
		roof.push(COLOR(roofColor)(
			MAP(vert0)(domain2)));

		//Chimney
		var drawChimney = function(){
			var chimney = []; 

			chimney.push(COLOR(baseColor1)(SIMPLEX_GRID([[0,0.6],[0,0.6],[0,0.8]])));
			chimney.push(COLOR(roofColor)(T([0,1,2])([-0.05,-0.05,0.8])(
						SIMPLEX_GRID([[0,0.7],[0,0.7],[0,0.03]]))));
			var side = SIMPLEX_GRID([[0,0.15],[0,0.15],[0,0.2]]);
			chimney.push(COLOR(roofColor)(T([2])([0.8+0.03])(side)));
			chimney.push(COLOR(roofColor)(T([0,2])([0.45,0.8+0.03])(side)));
			chimney.push(COLOR(roofColor)(T([1,2])([0.45,0.8+0.03])(side)));
			chimney.push(COLOR(roofColor)(T([0,1,2])([0.45,0.45,0.8+0.03])(side)));
			chimney.push(COLOR(roofColor)(T([0,1,2])([-0.05,-0.05,0.8+0.03+0.2])(
						SIMPLEX_GRID([[0,0.7],[0,0.7],[0,0.03]]))));

			return STRUCT(chimney);
		}

		roof.push(T([0,1,2])([-9.695-0.5+5,-9.695-0.05+0.2,12.7])(drawChimney()));
		roof.push(T([0,1,2])([+9.695+0.5-5,-9.695-0.05+0.2,12.7])(drawChimney()));

		//Profile dome
		//Profile 1
		var drawClyProfile = function(h1,h2,r,z){
			var r = r || 6;
			var h1 = h1 || 1.1;
			var h2 = h2 || 0.8;
			var p1 = [[-r,0,0],[-r,0,0],
				[-r,0,h1],[-r,0,h1],
				[-r-0.08,0,h1],[-r-0.08,0,h1],
				[-r-0.08,0,h1+h2],[-r-0.08,0,h1+h2]
			];
			var k1 = makeKnots(p1,1);
			var c1 = NUBS(S0)(1)(k1)(p1);		
			var r1 = ROTATIONAL_SURFACE(c1);
			roof.push(COLOR(baseColor1)(
				T([2])([z])(MAP(r1)(domain2pi))));
		}

		//Profile 2
		var drawRoofSurface = function(r,z,h){
			var r = r || 6.25;
			var h = h || 2;
			var p1 = [
				[0,0,0],[0,0,0],
				[-r,0,0],[-r,0,0],
				[-r,0,0.05],[-r,0,0.05],
				[0,0,0.05+h],[0,0,0.05+h]
			];
			var k1 = makeKnots(p1,1);
			var c1 = NUBS(S0)(1)(k1)(p1);		
			var r1 = ROTATIONAL_SURFACE(c1);
			roof.push(COLOR(roofColor)(
				T([2])([z])(MAP(r1)(domain2pi))));
		}

		//Profile 3
		var drawPeak = function(r,z){
			var r = r || 1.5;
			var h = h || 2;
			var p1 = [[0,0,0],[0,0,0],
				[-r,0,0],[-r,0,0],
				[-r,0,0.02],[-r,0,0.02],
				[-r+0.3,0,0.1],[-r+0.3,0,0.1],
				[-0.4,0,0.6],[-0.4,0,0.6],
				[-0.4,0,0.85],[-0.4,0,0.85],
				[-0.5,0,0.85],[-0.5,0,0.85],
				[-0.5,0,0.87],[-0.5,0,0.87],
				[-0.04,0,1],[-0.04,0,1],
				[-0.04,0,1+0.05],[-0.04,0,1+0.05],
				[-0.04-0.08,0,1+0.05],[0.04-0.08,0,1+0.05],
				[-0.04-0.08,0,1.2],[-0.04-0.08,0,1.2],
				[0,0,1.2],[0,0,1.2]
			];
			var k1 = makeKnots(p1,1);
			var c1 = NUBS(S0)(1)(k1)(p1);		
			var r1 = ROTATIONAL_SURFACE(c1);
			roof.push(COLOR([220/255,220/255,220/255])(
				T([2])([z])(MAP(r1)(domain2pi))));
		}

		var h = 1.1;
		var h2 = 0.4;
		drawClyProfile(1.1,0.4,5.5,14.6-h);
		drawRoofSurface(5.75,14.6+1.9-h-h2,1.8);

		drawClyProfile(0.3,0.2,4.9,14.6+1.9+0.40-h-h2-0.1);
		drawRoofSurface(5.15,14.6+1.9+0.40+0.4-h-h2,1.5);

		drawClyProfile(0.2,0.2,4.7,14.6+1.9+0.40+0.45-h-h2);
		drawRoofSurface(4.95,14.6+1.9+0.40+0.45+0.4-h-h2,1.5);

		drawClyProfile(0.2,0.2,4.4,14.6+1.9+0.40+0.45+0.45-h-h2);
		drawRoofSurface(4.65,14.6+1.9+0.40+0.45+0.45+0.4-h-h2,1.5);

		drawClyProfile(0.2,0.2,3.4,14.6+1.9+0.40+0.45+0.45+0.70-h-h2);
		drawRoofSurface(3.65,14.6+1.9+0.40+0.45+0.45+0.70+0.4-h-h2,0.8);

		drawClyProfile(0.2,0.2,2.5,14.6+1.9+0.40+0.45+0.45+0.70+0.4-h-h2);
		drawRoofSurface(2.65,14.6+1.9+0.40+0.45+0.45+0.70+0.4+0.4-h-h2,0.5);

		drawClyProfile(0.2,0.2,2,14.6+1.9+0.40+0.45+0.45+0.70+0.4+0.3-h-h2);
		drawRoofSurface(2.15,14.6+1.9+0.40+0.45+0.45+0.70+0.4+0.4+0.3-h-h2,0.3);

		drawClyProfile(0.06,0,1.3,14.6+1.9+0.40+0.45+0.45+0.70+0.4+0.3+0.2-h-h2-0.1);
		drawPeak(1.5,14.6+1.9+0.40+0.45+0.45+0.70+0.4+0.3+0.2+0.9-0.05-h-h2-0.1);


		return STRUCT(roof);
	}

	DRAW(drawRoof());

 }());