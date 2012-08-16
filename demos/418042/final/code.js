/*
    ======================
    
    Villa Badoer
    is a villa in Fratta Polesine in the Veneto region;
    it was designed in 1556 by Andrea Palladio for the Venetian noble Francesco Badoer.
    
    ======================

    The villa is decomposed in 4 main parts: the main structure, the porches, the two barchessa and the garden.
    See http://git.prdjs.com/418042/final-project/gitpages... for more information
*/


/*
    Drawer object responsable to draw villa's parts.
*/
function Drawer(){
	this.foundation = undefined;
	this.steps = undefined;
	this.baseComponents = undefined;
	this.buildingWall = undefined;
	this.ledge = undefined;
	this.tympanum = undefined;
	this.colums = undefined;
	this.guttae = undefined;
	this.buildingRoof = undefined;
	this.buildingComponents = undefined;
}


Drawer.prototype.addFoundation = function(foundation){
    this.foundation = foundation;
}

Drawer.prototype.drawFoundation = function(){
	if (this.foundation === undefined){
		return alert("Create the model \"foundation\" before draw it!");
	}
	return DRAW(this.foundation);
}

Drawer.prototype.addSteps = function(steps){
    this.steps = steps;
}

Drawer.prototype.drawSteps = function(){
	if (this.steps === undefined){
		return alert("Create the model \"steps\" before draw it!");
	}
	return DRAW(this.steps);
}

Drawer.prototype.addBaseComponents = function(baseComponents){
    this.baseComponents = baseComponents;
}

Drawer.prototype.drawBaseComponents = function(){
	if (this.baseComponents === undefined){
		return alert("Create the model \"baseComponents\" before draw it!");
	}
	return DRAW(this.baseComponents);
}

Drawer.prototype.addBuildingWall = function(buildingWall){
    this.buildingWall = buildingWall;
}

Drawer.prototype.drawBuildingWall = function(){
	if (this.buildingWall === undefined){
		return alert("Create the model \"buildingWall\" before draw it!");
	}
	return DRAW(this.buildingWall);
}

Drawer.prototype.addLedge = function(ledge){
    this.ledge = ledge;
}

Drawer.prototype.drawLedge = function(){
	if (this.ledge === undefined){
		return alert("Create the model \"ledge\" before draw it!");
	}
	return DRAW(this.ledge);
}


Drawer.prototype.addTympanum = function(tympanum){
    this.tympanum = tympanum;
}

Drawer.prototype.drawTympanum = function(){
	if (this.tympanum === undefined){
		return alert("Create the model \"tympanum\" before draw it!");
	}
	return DRAW(this.tympanum);
}

Drawer.prototype.addColums = function(colums){
    this.colums = colums;
}

Drawer.prototype.drawColums = function(){
	if (this.colums === undefined){
		return alert("Create the model \"colums\" before draw it!");
	}
	return DRAW(this.colums);
}

Drawer.prototype.addGuttae = function(guttae){
    this.guttae = guttae;
}

Drawer.prototype.drawGuttae = function(){
	if (this.guttae === undefined){
		return alert("Create the model \"guttae\" before draw it!");
	}
	return DRAW(this.guttae);
}

Drawer.prototype.addBuildingRoof = function(buildingRoof){
    this.buildingRoof = buildingRoof;
}

Drawer.prototype.drawBuildingRoof = function(){
    if (this.buildingRoof === undefined){
            return alert("Create the model \"buildingRoof\" before draw it!");
    }
    return DRAW(this.buildingRoof);
}

Drawer.prototype.addBuildingComponents = function(buildingComponents){
    this.buildingComponents = buildingComponents;
}

Drawer.prototype.drawBuildingComponents = function(){
	if (this.buildingComponents === undefined){
		return alert("Create the model \"buildingComponents\" before draw it!");
	}
	return DRAW(this.buildingComponents);
}



/*
    Object stateless used to set proportion
*/

function Scale(){};

var scale = new Scale();

scale.proportion = 10;


/*
	Object stateless used to collect all colors
*/

function Colors(){};

var colors = new Colors();

colors.foundation 	= 	[83/255,59/255,44/255];
colors.hue 			= 	[1,1,0.9];
colors.baseFrontLedge = [185/255,185/255,168/255];
colors.roof 		=	[114/255,78/255,61/255];
colors.black 		=	[0,0,0];
colors.white 		=	[1,1,1];
colors.windows		=	[0.64,0.83,0.93,0.6];
colors.grass 		= 	[34/255,139/255,34/255];



/*
	Object stateless used to collect all domains
*/

function Domains(){};

var domains = new Domains();

domains.stepDomain 		= 	DOMAIN([[0,1],[0,1]])([10,1]); //10
domains.railTopDomain 	= 	DOMAIN([[0,1],[0,1]])([25,1]); // 20
domains.railBaseDomain 	= 	DOMAIN([[0,1],[0,1]])([10,1]); // 10, 1
domains.mullionDomain 	= 	DOMAIN([[0,1],[0,2*PI]])([30,20]); // 10,10 - 20,10
domains.ledgeDomain 	= 	DOMAIN([[0,1],[0,1]])([50,1]);
domains.columnDomain 	= 	DOMAIN([[0,1],[0,2*PI]])([60,60]); // 60,60
domains.spiralDomain 	= 	DOMAIN([[0,1],[0,1]])([50,50]); //
domains.depthCapitalDomain = DOMAIN([[0,1],[0,1]])([50,10]);
domains.spiralCenterDomain = DOMAIN([[0,1],[0,2*PI]])([10,50]);
domains.centerCapitalDomain = DOMAIN([[0,1],[0,1]])([20,20]);



/*
    Function that generates villa's foundation
*/

function foundation(){

	// Get proportion
	var p = scale.proportion || 1;

	// define height foundation
	var h1 = 0.16;
	var h2 = 0.08885;

	return STRUCT([
			(SIMPLEX_GRID([[2.24*p],[3.46*p],[h1*p]])).color(colors.foundation), // A
			(SIMPLEX_GRID([[-0.18*p,1.92*p],[-0.18*p,3.1*p],[-h1*p,h2*p]])).color(colors.foundation), // B
			(SIMPLEX_GRID([[-2.24*p,0.14*p],[3.46*p],[h1*p]])).color(colors.hue), // A'
			(SIMPLEX_GRID([[-2.1*p,0.28*p],[-0.18*p,3.1*p],[-h1*p,h2*p]])).color(colors.hue), // B'
			(SIMPLEX_GRID([[-2.38*p,0.32*p],[-0.86*p,1.74*p],[(h1+h2)*p]])).color(colors.hue), // C
			(SIMPLEX_GRID([[-2.7*p,0.22*p],[-0.86*p,1.74*p],[(h1+h2)*p]])).color(colors.hue), // D
			(SIMPLEX_GRID([[-3.07*p,0.27*p],[-1.05*p,1.36*p],[h1*p]])).color(colors.hue)
 		]);

}



/*
	Function that generate all the steps in the villa
*/

function steps(){

	// Get proportion
	var p = scale.proportion || 1;

	// define useful measure
	// 'hs' (height-step) is the height of a single step
    var hs = 0.01777;
	var h1 = 0.16;
	var h2 = 0.08885;

	// Control point of the profile of a single step
	var controlsStep = [
			[0*p,0*p,hs*p],
			[0.04*p,0*p,hs*p],[0.04*p,0*p,hs*p],[0.04*p,0*p,hs*p],
			[0.04*p,0*p,(hs-0.005)*p],[0.04*p,0*p,(hs-0.005)*p],
			[0.035*p,0*p,(hs-0.005)*p],[0.035*p,0*p,(hs-0.005)*p],[0.035*p,0*p,(hs-0.005)*p],[0.035*p,0*p,(hs-0.005)*p],
			[0.035*p,0*p,0*p]];

    // a single step profile
    var stepProfile = BEZIER(S0)(controlsStep);

    // Defines steps with different width
    var frontStep = MAP(CYLINDRICAL_SURFACE(stepProfile)([0,1.28*p,0]))(domains.stepDomain);
    var lateralStep = MAP(CYLINDRICAL_SURFACE(stepProfile)([0,0.28*p,0]))(domains.stepDomain);

    // Translate and repeat steps whit function t, t2, t3
    frontStep = T([0,1])([3.59*p,1.09*p])(frontStep);
    var t = T([0,2])([-0.035*p,hs*p]);
    var t2 = T([0,2])([-0.275*p,hs*p]);
    var t3 = T([0,2])([-0.41*p,hs*p]);
    // To not istance many variables, 'frontStep' now will contains many steps
    frontStep = STRUCT([
    			frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep,
                t2, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep,
                t3, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep]);

    // generate lateral right stairs
    lateralStep = R([0,1])(PI/2)(lateralStep);
    lateralStep = T([0,1])([(2.38+0.28)*p,3.17*p])(lateralStep);

    t = T([1,2])([-0.035*p,hs*p]);
    // same as 'frontStep' variable now 'lateralStep' contains all steps
    lateralStep = STRUCT([
    				lateralStep, t, lateralStep, t, lateralStep, t, lateralStep, t, lateralStep, t,
                    lateralStep, t, lateralStep, t, lateralStep, t, lateralStep, t, lateralStep, t,
                    lateralStep, t, lateralStep, t, lateralStep, t, lateralStep]);
    
    // lateral left staris
    var lateralStepRight = T([0,1])([-(2.38*2+0.28)*p,-(2.74+0.265+0.455)*p])(lateralStep);
    lateralStepRight = R([0,1])(PI)(lateralStepRight);
    
    return COLOR(colors.hue)(STRUCT([frontStep,lateralStep,lateralStepRight]));

}



/*
	Function that generates all other pieces componing foundations
*/

function baseComponents(){

	// An empty struct that will be filled and returned
	var modelList = STRUCT([]);

	// Get proportion
	var p = scale.proportion || 1;

	// height foundation steps
    var h1 = 0.16;
    var h2 = 0.08885;
    var hs = 0.01777;

    /*
		Function that generate the BASE of a rail with length 'lenBase' skewed so as to reach height 'h'.
		Parametes 'p' and 'hs' are needed to maintain proportion with other models
		Besides 'offset' is a little measure used to correct approssimation error derived from inclination
    */

	function getRailBase(p,hs,lenBase,h,offset){

		var lenBase = lenBase - 0.005;
		var hs = hs;
		var h = h;

		// hs**p

		var corner1 = BEZIER(S0)([[0.0025*p,0.0025*p,(hs+offset)*p],
								 [-0.0025*p,-0.0025*p,(0.0025+hs)*p],
								 [0.0025*p,0.0025*p,(0.005+hs+offset)*p]]);
		var corner2 = BEZIER(S0)([[0.0025*p,(lenBase+0.0025)*p,(hs+h-offset)*p],
								 [-0.0025*p,(lenBase+0.0075)*p,(0.0025+hs+h)*p],
								 [0.0025*p,(lenBase+0.0025)*p,(0.005+hs+h-offset)*p]]);
		var corner3 = BEZIER(S0)([[0.0375*p,0.0025*p,(hs+offset)*p],
								 [(0.0075+0.035)*p,-0.0025*p,(0.0025+hs)*p],
								 [0.0375*p,0.0025*p,(0.005+hs+offset)*p]]);
		var corner4 = BEZIER(S0)([[0.0375*p,(lenBase+0.0025)*p,(hs+h-offset)*p],
								 [(0.0075+0.035)*p,(lenBase+0.0075)*p,(0.0025+hs+h)*p],
								 [0.0375*p,(lenBase+0.0025)*p,(0.005+hs+h-offset)*p]]);


		return STRUCT([
				MAP(BEZIER(S1)([corner1,corner2]))(domains.railBaseDomain),
				MAP(BEZIER(S1)([corner3,corner1]))(domains.railBaseDomain),
				MAP(BEZIER(S1)([corner3,corner4]))(domains.railBaseDomain),
				MAP(BEZIER(S1)([corner2,corner4]))(domains.railBaseDomain),

				TRIANGLE_DOMAIN(1,[[0,0,(hs)*p],[0.04*p,0,(hs)*p],[0.04*p,(lenBase+0.005)*p,(hs+h)*p]]), //copertura sotto
				TRIANGLE_DOMAIN(1,[[0,0,(hs)*p],[0,(lenBase+0.005)*p,(hs+h)*p],[0.04*p,(lenBase+0.005)*p,(hs+h)*p]]),
				TRIANGLE_DOMAIN(1,[[0.0025*p,0.0025*p,(0.005+hs+offset)*p],[0.0025*p,(lenBase+0.0025)*p,(0.005+hs+h-offset)*p],
									[0.0375*p,(lenBase+0.0025)*p,(0.005+hs+h-offset)*p]]), //copertura sopra
				TRIANGLE_DOMAIN(1,[[0.0025*p,0.0025*p,(0.005+hs+offset)*p],[0.0375*p,0.0025*p,(0.005+hs+offset)*p],
									[0.0375*p,(lenBase+0.0025)*p,(0.005+hs+h-offset)*p]]),
				// bordo
				TRIANGLE_DOMAIN(1,[[0,0,0],[0,0,hs*p],[0.04*p,0,0]]), //A
				TRIANGLE_DOMAIN(1,[[0.04*p,0,hs*p],[0,0,hs*p],[0.04*p,0,0]]),
				TRIANGLE_DOMAIN(1,[[0.04*p,0,hs*p],[0.04*p,(lenBase+0.005)*p,(hs+h)*p],[0.04*p,0,0]]), //B
				TRIANGLE_DOMAIN(1,[[0.04*p,0,0],[0.04*p,(lenBase+0.005)*p,h*p],[0.04*p,(lenBase+0.005)*p,(hs+h)*p]]),
				TRIANGLE_DOMAIN(1,[[0,(lenBase+0.005)*p,h*p],[0,(lenBase+0.005)*p,(hs+h)*p],[0.04*p,(lenBase+0.005)*p,h*p]]), //C
				TRIANGLE_DOMAIN(1,[[0.04*p,(lenBase+0.005)*p,(hs+h)*p],[0,(lenBase+0.005)*p,(hs+h)*p],[0.04*p,(lenBase+0.005)*p,h*p]]),
				TRIANGLE_DOMAIN(1,[[0,0,hs*p],[0,(lenBase+0.005)*p,(hs+h)*p],[0,0,0]]), //D
				TRIANGLE_DOMAIN(1,[[0,0,0],[0,(lenBase+0.005)*p,h*p],[0,(lenBase+0.005)*p,(hs+h)*p]]),
		]);

    }


    /*
		Function that generate the TOP of a rail with length 'lenBase' and width 'widBase',
		skewed so as to reach height 'height'.
		Parametes 'p' and 'hs' are needed to maintain proportion with other models
		Besides 'offset' is a little measure used to correct approssimation error derived from inclination
    */

    function getRailTop(p, hs, lenBase, widBase, height, offset){

		var lenBase = lenBase - 0.005*2;
		var widBase = widBase - 0.005*2;

		var h = hs+hs*0.5;

		var corner1 = BEZIER(S0)([[0.005*p,0.005*p,offset*p],
							 [0,0,0.0025*p],[0,0,0.0025*p],
							 [0.0075*p,0.0075*p,h/4*p],[0.0075*p,0.0075*p,h/4*p],
							 [0.005*p,0.005*p,(h/2+offset)*p],[0.005*p,0.005*p,(h/2+offset)*p],
							 [0.0025*p,0.0025*p,h/2*p], [0.0025*p,0.0025*p,h/2*p], [0.0025*p,0.0025*p,h/2*p], [0.0025*p,0.0025*p,h/2*p], [0.0025*p,0.0025*p,h/2*p],
							 	[0.0025*p,0.0025*p,h/2*p], [0.0025*p,0.0025*p,h/2*p], [0.0025*p,0.0025*p,h/2*p], [0.0025*p,0.0025*p,h/2*p], [0.0025*p,0.0025*p,h/2*p],
							 [0.0025*p,0.0025*p,(h-0.005)*p], [0.0025*p,0.0025*p,(h-0.005)*p], [0.0025*p,0.0025*p,(h-0.005)*p],
							 	[0.0025*p,0.0025*p,(h-0.005)*p], [0.0025*p,0.0025*p,(h-0.005)*p], [0.0025*p,0.0025*p,(h-0.005)*p],
							 [0,0,(h-0.0025)*p], [0,0,(h-0.0025)*p], [0,0,(h-0.0025)*p], [0,0,(h-0.0025)*p],
							 [0,0,h*p],[0,0,h*p],
							 [0.005*p,0.005*p,(h+offset)*p]]);

		var corner2 = BEZIER(S0)([[0.005*p,(0.005+lenBase)*p,(height-offset)*p],
							 [0,(lenBase+2*0.005)*p,(0.0025+height)*p],	[0,(lenBase+2*0.005)*p,(0.0025+height)*p],
							 [0.0075*p,(lenBase-0.005+0.0075)*p,(height+h/4)*p], [0.0075*p,(lenBase-0.005+0.0075)*p,(height+h/4)*p],
							 [0.005*p,(0.005+lenBase)*p,(height+h/2-offset)*p],	[0.005*p,(0.005+lenBase)*p,(height+h/2-offset)*p],
							 [0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p], [0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p], [0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 [0.0025*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p], [0.0025*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p],
							 	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p], [0.0025*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p],
							 	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p],	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p],
							 [0,(lenBase+2*0.005)*p,(height+h-0.0025)*p], [0,(lenBase+2*0.005)*p,(height+h-0.0025)*p],
							 	[0,(lenBase+2*0.005)*p,(height+h-0.0025)*p], [0,(lenBase+2*0.005)*p,(height+h-0.0025)*p],
							 [0,(lenBase+2*0.005)*p,(height+h)*p], [0,(lenBase+2*0.005)*p,(height+h)*p],
							 [0.005*p,(0.005+lenBase)*p,(height+h-offset)*p]]);


		var corner3 = BEZIER(S0)([[(0.005+widBase)*p,0.005*p,offset*p],
							 [(0.005*2+widBase)*p,0,0.0025*p],[(0.005*2+widBase)*p,0,0.0025*p],
							 [(0.0075+widBase-0.005)*p,0.0075*p,h/4*p],[(0.0075+widBase-0.005)*p,0.0075*p,h/4*p],
							 [(0.005+widBase)*p,0.005*p,(h/2+offset)*p],[(0.005+widBase)*p,0.005*p,(h/2+offset)*p],
							 [(0.005+widBase+0.0025)*p,0.0025*p,h/2*p],[(0.005+widBase+0.0025)*p,0.0025*p,h/2*p],[(0.005+widBase+0.0025)*p,0.0025*p,h/2*p],
							 	[(0.005+widBase+0.0025)*p,0.0025*p,h/2*p], [(0.005+widBase+0.0025)*p,0.0025*p,h/2*p], [(0.005+widBase+0.0025)*p,0.0025*p,h/2*p],
							 	[(0.005+widBase+0.0025)*p,0.0025*p,h/2*p], [(0.005+widBase+0.0025)*p,0.0025*p,h/2*p], [(0.005+widBase+0.0025)*p,0.0025*p,h/2*p],
							 	[(0.005+widBase+0.0025)*p,0.0025*p,h/2*p],
							 [(0.005+widBase+0.0025)*p,0.0025*p,(h-0.005)*p], [(0.005+widBase+0.0025)*p,0.0025*p,(h-0.005)*p], [(0.005+widBase+0.0025)*p,0.0025*p,(h-0.005)*p],
							 	[(0.005+widBase+0.0025)*p,0.0025*p,(h-0.005)*p], [(0.005+widBase+0.0025)*p,0.0025*p,(h-0.005)*p], [(0.005+widBase+0.0025)*p,0.0025*p,(h-0.005)*p],
							 [(0.005*2+widBase)*p,0,(h-0.0025)*p],[(0.005*2+widBase)*p,0,(h-0.0025)*p],[(0.005*2+widBase)*p,0,(h-0.0025)*p],[(0.005*2+widBase)*p,0,(h-0.0025)*p],
							 [(0.005*2+widBase)*p,0,h*p],[(0.005*2+widBase)*p,0,h*p],
							 [(0.005+widBase)*p,0.005*p,(h+offset)*p]]);

		var corner4 = BEZIER(S0)([[(0.005+widBase)*p,(0.005+lenBase)*p,(height-offset)*p],
							 [(0.005*2+widBase)*p,(lenBase+2*0.005)*p,(0.0025+height)*p], [(0.005*2+widBase)*p,(lenBase+2*0.005)*p,(0.0025+height)*p],
							 [(0.0075+widBase-0.005)*p,(lenBase-0.005+0.0075)*p,(height+h/4)*p], [(0.0075+widBase-0.005)*p,(lenBase-0.005+0.0075)*p,(height+h/4)*p],
							 [(0.005+widBase)*p,(0.005+lenBase)*p,(height+h/2-offset)*p], [(0.005+widBase)*p,(0.005+lenBase)*p,(height+h/2-offset)*p],
							 [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p], [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 	[(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p], [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 	[(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p], [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 	[(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p], [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 	[(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p], [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p], [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p],
							 	[(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p], [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p],
							 	[(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p], [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p],
							 [(0.005*2+widBase)*p,(lenBase+2*0.005)*p,(height+h-0.0025)*p], [(0.005*2+widBase)*p,(lenBase+2*0.005)*p,(height+h-0.0025)*p],
							 	[(0.005*2+widBase)*p,(lenBase+2*0.005)*p,(height+h-0.0025)*p], [(0.005*2+widBase)*p,(lenBase+2*0.005)*p,(height+h-0.0025)*p],
							 [(0.005*2+widBase)*p,(lenBase+2*0.005)*p,(height+h)*p], [(0.005*2+widBase)*p,(lenBase+2*0.005)*p,(height+h)*p],
							 [(0.005+widBase)*p,(0.005+lenBase)*p,(height+h-offset)*p]]);



		return STRUCT([
						MAP(BEZIER(S1)([corner1,corner2]))(domains.railTopDomain),
						MAP(BEZIER(S1)([corner3,corner1]))(domains.railTopDomain),
						MAP(BEZIER(S1)([corner3,corner4]))(domains.railTopDomain),
						MAP(BEZIER(S1)([corner2,corner4]))(domains.railTopDomain),
						TRIANGLE_DOMAIN(1,[[0.005*p,0.005*p,offset*p],[(0.005+widBase)*p,0.005*p,offset*p],[(0.005+widBase)*p,(0.005+lenBase)*p,(height-offset)*p]]),
						TRIANGLE_DOMAIN(1,[[0.005*p,0.005*p,offset*p],[0.005*p,(0.005+lenBase)*p,(height-offset)*p],[(0.005+widBase)*p,(0.005+lenBase)*p,(height-offset)*p]]),
						TRIANGLE_DOMAIN(1,[[0.005*p,0.005*p,(h+offset)*p],[(0.005+widBase)*p,0.005*p,(h+offset)*p],[(0.005+widBase)*p,(0.005+lenBase)*p,(height+h-offset)*p]]),
						TRIANGLE_DOMAIN(1,[[0.005*p,0.005*p,(h+offset)*p],[0.005*p,(0.005+lenBase)*p,(height+h-offset)*p],[(0.005+widBase)*p,(0.005+lenBase)*p,(height+h-offset)*p]]),
						]);

	}


	/*
		Function that generate a single mullion with setted height
		calcolated since hs
	*/

	function getMullion(p, hs){

		var h = 7.05*hs;

		var hz = 0.035;

		var cube = CUBOID([0.0325*p,0.0325*p,(hz)*p]);

		var profile = BEZIER(S0)([ [0.016*p,0,(hz)*p], [0.016*p,0,(hz+0.008)*p], [0,0,(hz)*p],
			[0,0,(hz+0.008)*p],	[0,0,(hz+0.008)*p],	[0,0,(hz+0.008)*p], [0.0363*p,0,(hz+h/2-0.025)*p], [0.0361*p,0,(hz+h/2-0.018)*p],
			[0,0,(hz+h/2-0.035)*p],	[0.005*p,0,(hz+h-h/7.3)*p],	[0,0,(hz+h-h/7.3)*p], [0,0,(hz+h-h/7.3)*p],
			[0.0112*p,0,(hz+h-h/5.4)*p], [0.0112*p,0,(hz+h-h/5.4)*p], [0.0112*p,0,(hz+h-h/5.4)*p], [0.0112*p,0,(hz+h)*p]
			]);

	 	var profile = ROTATIONAL_SURFACE(profile);
		var surface = MAP(profile)(domains.mullionDomain);

		return STRUCT([T([0,1])([0.016*p,0.016*p])(surface),cube]);

	}

	//
	// RAILS
	//

	// Rail left divided in parts, from the bottom till the top one (look at the plant)
	var railLeft1 = getRailBase(p,hs,0.29,h1,0.0015);
	var railLeftTop1 = getRailTop(p,hs,0.29,0.04,h1,0.0027);
	railLeft1 = T([0,1])([3.63*p,1.05*p])(R([0,1])(PI/2)(railLeft1));
	railLeftTop1 = T([0,1,2])([3.62*p,1.05*p,(8*hs+0.005)*p])(R([0,1])(PI/2)(railLeftTop1));

	var railLeft2 = getRailBase(p,hs,0.27,0,0);
	var railLeftTop2 = getRailTop(p,hs,0.26,0.04,0,0);
	railLeft2 = T([0,1,2])([3.34*p,1.05*p,h1*p])(R([0,1])(PI/2)(railLeft2));
	railLeftTop2 = T([0,1,2])([3.34*p,1.05*p,(h1+8*hs+0.005)*p])(R([0,1])(PI/2)(railLeftTop2));

	var railLeft3 = getRailBase(p,hs,0.15,h2,0.0015);
	var railLeftTop3 = getRailTop(p,hs,0.155,0.04,h2,0.0027);
	railLeft3 = T([0,1,2])([3.07*p,1.05*p,h1*p])(R([0,1])(PI/2)(railLeft3));
	railLeftTop3 = T([0,1,2])([3.0725*p,1.05*p,(h1+8*hs+0.005)*p])(R([0,1])(PI/2)(railLeftTop3));

	var railLeft4 = getRailBase(p,hs,0.23,0,0);
	var railLeftTop4 = getRailTop(p,hs,0.23,0.04,0,0);
	railLeft4 = T([0,1,2])([2.88*p,0.86*p,(h2+h1)*p])(railLeft4);
	railLeftTop4 = T([0,1,2])([2.88*p,0.86*p,(h1+h2+8*hs+0.005)*p])(railLeftTop4);

	var railLeft5 = getRailBase(p,hs,0.26,0,0);
	var railLeftTop5 = getRailTop(p,hs,0.225,0.04,0,0);
	railLeft5 = T([0,1,2])([2.92*p,0.86*p,(h2+h1)*p])(R([0,1])(PI/2)(railLeft5));
	railLeftTop5 = T([0,1,2])([2.92*p,0.86*p,(h1+h2+8*hs+0.005)*p])(R([0,1])(PI/2)(railLeftTop5));

	var railLeft6 = getRailBase(p,hs,0.18,0,0);
	var railLeftTop6 = getRailTop(p,hs,0.18,0.04,0,0);
	railLeft6 = T([0,1,2])([2.66*p,0.72*p,(h2+h1)*p])(railLeft6);
	railLeftTop6 = T([0,1,2])([2.66*p,0.72*p,(h1+h2+8*hs+0.005)*p])(railLeftTop6);

	var railLeft7 = getRailBase(p,hs,0.448,(h1+h2+0.001),0.0015); // 48  + hs
	var railLeftTop7 = getRailTop(p,hs,0.455,0.04,(h1+h2),0.0027);
	railLeft7 = T([0,1])([2.66*p,0.25*p])(railLeft7);
	railLeftTop7 = T([0,1,2])([2.66*p,0.25*p,(8*hs+0.005)*p])(railLeftTop7);

	var railLeft8 = getRailBase(p,hs,0.32,10*hs,0.0015);
	var railLeftTop8 = getRailTop(p,hs,0.27,0.04,9*hs,0.0027);
	railLeft8 = T([0,1,2])([2.52*p,1.05*p,(h1+h2)*p])(R([0,1])(PI/2)(railLeft8));
	railLeftTop8 = T([0,1,2])([2.51*p,1.05*p,(h1+h2+8*hs+0.005)*p])(R([0,1])(PI/2)(railLeftTop8));

	var railLeft9 = getRailBase(p,hs,0.52,0,0);
	var railLeftTop9 = getRailTop(p,hs,0.52,0.04,0,0);
	railLeft9 = T([0,1,2])([2.34*p,0.18*p,(h1+h2)*p])(railLeft9);
	railLeftTop9 = T([0,1,2])([2.34*p,0.18*p,(h1+h2+8*hs+0.005)*p])(railLeftTop9);


	// Generate rail's struct to generate right side
	var modelRailsLeft = STRUCT([
				railLeft1,railLeftTop1, railLeft2,railLeftTop2, railLeft3,railLeftTop3, railLeft4,railLeftTop4, railLeft5,railLeftTop5, 
				railLeft6,railLeftTop6, railLeft7,railLeftTop7, railLeft8,railLeftTop8, railLeft9,railLeftTop9]);

	var modelRailsRight = T([1])([3.46*p])(S([1])([-1])(modelRailsLeft));

    modelList = STRUCT([modelRailsLeft,modelRailsRight]);


    //
    // PILLARS
    //

    // A single pillar
    var pillar = SIMPLEX_GRID([[0.04*p],[0.04*p],[((8*hs+0.005)+0.04)*p]]);
	pillar = T([0,1])([3.59*p,1.05*p])(pillar);
	var pillarBaseFrieze = getRailBase(p,hs,0.04,0,0);
	var pillarEnv = T([0,1])([3.595*p,1.055*p])(SIMPLEX_GRID([[0.03*p],[0.03*p],[((8*hs+0.005)+0.04)*p]]));
	pillarBaseFrieze = S([0,1])([1.25,1.25])(pillarBaseFrieze);
	pillarBaseFrieze = T([0,1,2])([3.585*p,1.045*p,hs*p])(pillarBaseFrieze);
	var pillarBase = SIMPLEX_GRID([[0.05*p],[0.05*p],[hs*p]]);
	pillarBase = T([0,1])([3.585*p,1.045*p])(pillarBase);
	var pillarTop = getRailTop(p,hs,0.05,0.05,0,0);
	pillarTop = T([0,1,2])([3.585*p,1.045*p,((9*hs+0.005))*p])(pillarTop);
	var pillarStructStair = STRUCT([pillar,pillarTop,pillarBaseFrieze]);
	var pillarStruct = STRUCT([pillarStructStair,pillarBase]);

	// all pillars in a struct
	var modelPillarsLeft = STRUCT([pillarStruct,
				 T([0,2])([-0.30*p,(h1-hs)*p])(pillarStructStair), T([0,2])([-0.29*p,(h1-hs)*p])(pillarEnv), T([0,2])([-0.31*p,(h1-hs)*p])(pillarEnv),
				 T([0,2])([-0.52*p,(h1-hs)*p])(pillarStructStair), T([0,2])([-0.51*p,(h1-hs)*p])(pillarEnv), T([0,2])([-0.53*p,(h1-hs)*p])(pillarEnv),
				 T([0,2])([-0.71*p,(h1+h2-hs)*p])(pillarStructStair), T([0,1,2])([-0.71*p,-0.19*p,(h1+h2-hs)*p])(pillarStructStair), 
				 T([0,1,2])([-0.93*p,-0.19*p,(h1+h2-hs)*p])(pillarStructStair), T([0,1,2])([-0.93*p,-0.35*p,(h1+h2-hs)*p])(pillarStructStair),
				 T([0,1,2])([-0.93*p,-0.81*p,0])(pillarStruct),
				 T([0,2])([-1.39 *p,(h1+h2+8*hs)*p])(pillarStruct), T([0,2])([-1.11*p,(h1+h2)*p])(pillarStruct),
				 T([0,1,2])([-1.25*p,-0.37*p,(h1+h2-hs)*p])(pillarStruct), T([0,1,2])([-1.25*p,-0.87*p,(h1+h2-hs)*p])(pillarStructStair) ]);

	var modelPillarsRight = T([1])([3.46*p])(S([1])([-1])(modelPillarsLeft));

	// Adding pillar to the general struct
	modelList = STRUCT([modelList,modelPillarsLeft,modelPillarsRight]);

	//
	// MULLIONS
	//

	var mullion = getMullion(p,hs);

	var simplePillar = SIMPLEX_GRID([[0.03*p],[0.03*p],[((9*hs+0.005))*p]]);

	// There are all mullions from the frontal stairs till the farest one
	var modelMullionsLeft= STRUCT([
		T([0,1,2])([3.545*p,1.055*p,(hs+1.4*hs/2)*p])(mullion),
		T([0,1,2])([3.505*p,1.055*p,(hs+4*hs/2)*p])(mullion),
		T([0,1,2])([3.465*p,1.055*p,(hs+6.6*hs/2)*p])(mullion),
		T([0,1,2])([3.425*p,1.055*p,(hs+9.2*hs/2)*p])(mullion),
		T([0,1,2])([3.385*p,1.055*p,(hs+12*hs/2)*p])(mullion),
		T([0,1,2])([3.345*p,1.055*p,(hs+14.4*hs/2)*p])(mullion),
		//h1 : middle
		T([0,1,2])([3.245*p,1.055*p,(h1+hs/2.8)*p])(mullion),
		T([0,1,2])([3.203*p,1.055*p,(h1+hs/2.8)*p])(mullion),
		T([0,1,2])([3.1625*p,1.055*p,(h1+hs/2.8)*p])(mullion),
		T([0,1,2])([3.12*p,1.055*p,(h1+hs/2.8)*p])(mullion),
		//h2
		T([0,1,2])([3.025*p,1.055*p,(h1+hs)*p])(mullion),
		T([0,1,2])([2.98*p,1.055*p,(h1+5*hs/2)*p])(mullion),
		T([0,1,2])([2.935*p,1.055*p,(h1+8*hs/2)*p])(mullion),
		// h1+h2
		T([0,1,2])([2.8825*p,1.0025*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.8825*p,0.9575*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.8825*p,0.913*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.84*p,0.8635*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.7975*p,0.8635*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.7525*p,0.8635*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.71*p,0.8635*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.663*p,0.82*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.663*p,0.7825*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.663*p,0.745*p,(h1+h2+hs/2.8)*p])(mullion),
		// lateral stairs
		T([0,1,2])([2.663*p,0.65*p,(12.8*hs)*p])(mullion),
		T([0,1,2])([2.663*p,0.605*p,(11.3*hs)*p])(mullion),
		T([0,1,2])([2.665*p,0.56*p,(10*hs)*p])(simplePillar),
		T([0,1,2])([2.663*p,0.515*p,(8.6*hs)*p])(mullion),
		T([0,1,2])([2.663*p,0.470*p,(7.1*hs)*p])(mullion),
		T([0,1,2])([2.663*p,0.425*p,(6*hs)*p])(mullion),
		T([0,1,2])([2.665*p,0.380*p,(4.5*hs)*p])(simplePillar),
		T([0,1,2])([2.663*p,0.335*p,(3*hs)*p])(mullion),
		T([0,1,2])([2.663*p,0.290*p,(1.5*hs)*p])(mullion),
		// lateral above stairs
		T([0,1,2])([2.3425*p,0.6375*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.3425*p,0.5925*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.3425*p,0.5475*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.3449*p,0.5025*p,(h1+h2+hs/2.8)*p])(simplePillar),
		T([0,1,2])([2.3425*p,0.4575*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.3425*p,0.4125*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.3449*p,0.3675*p,(h1+h2+hs/2.8)*p])(simplePillar),
		T([0,1,2])([2.3425*p,0.3225*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.3425*p,0.2775*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.3425*p,0.2325*p,(h1+h2+hs/2.8)*p])(mullion),
		// lodge stairs
		T([0,1,2])([2.4445*p,1.055*p,(h1+h2+4*hs/2)*p])(mullion),
		T([0,1,2])([2.4045*p,1.055*p,(h1+h2+6.5*hs/2)*p])(mullion),
		T([0,1,2])([2.3645*p,1.055*p,(h1+h2+9*hs/2)*p])(mullion),
		T([0,1,2])([2.3245*p,1.055*p,(h1+h2+11*hs/2)*p])(mullion),
		T([0,1,2])([2.2845*p,1.055*p,(h1+h2+13.5*hs/2)*p])(mullion),
		T([0,1,2])([2.2445*p,1.055*p,(h1+h2+16*hs/2)*p])(mullion),
		]);


	var modelMullionsRight = T([1])([3.46*p])(S([1])([-1])(modelMullionsLeft));

	// WALLS

    var wallsLeft = STRUCT([
    					TRIANGLE_DOMAIN(1,[[2.7*p,0.24*p,0],[2.7*p,0.70*p,0],[2.7*p,0.70*p,(h1+h2+0.002)*p]]), //lateral stairs
    					TRIANGLE_DOMAIN(1,[[2.66*p,0.86*p,(h1+h2)*p],[2.66*p,0.72*p,(h1+h2)*p],[2.38*p,0.72*p,(h1+h2)*p]]), // cover up lateral stairs
						TRIANGLE_DOMAIN(1,[[2.66*p,0.86*p,(h1+h2)*p],[2.38*p,0.86*p,(h1+h2)*p],[2.38*p,0.72*p,(h1+h2)*p]]), // cover up lateral stairs
    					TRIANGLE_DOMAIN(1,[[3.63*p,1.05*p,0],[3.34*p,1.05*p,0],[3.34*p,1.05*p,(h1)*p]]), // lateral
    					TRIANGLE_DOMAIN(1,[[3.07*p,1.05*p,0],[2.92*p,1.05*p,0],[2.92*p,1.05*p,(h1+h2)*p]]), // lateral
    					TRIANGLE_DOMAIN(1,[[3.07*p,1.05*p,0],[3.07*p,1.05*p,h1*p],[2.92*p,1.05*p,(h1+h2)*p]]), // stairs
    					TRIANGLE_DOMAIN(1,[[2.52*p,1.05*p,(h1+h2)*p],[2.195*p,1.05*p,(h1+h2+10.2*hs)*p],[2.195*p,1.05*p,(h1+h2)*p]]), //lodge stairs
    					TRIANGLE_DOMAIN(1,[[2.52*p,1.09*p,(h1+h2)*p],[2.195*p,1.09*p,(h1+h2+10.2*hs)*p],[2.195*p,1.09*p,(h1+h2)*p]])
    					]);

	var wallsRight = T([1])([3.46*p])(S([1])([-1])(wallsLeft));

	return (STRUCT([modelList, modelMullionsLeft, modelMullionsRight, wallsLeft, wallsRight])).color(colors.hue);


}


function buildingWall(){

	function getWall(p,controlPoints){
		return COLOR(colors.hue)(
				STRUCT([
					TRIANGLE_DOMAIN(1,[PROD([p,controlPoints[0]]),PROD([p,controlPoints[1]]),PROD([p,controlPoints[3]])]),
					TRIANGLE_DOMAIN(1,[PROD([p,controlPoints[1]]),PROD([p,controlPoints[3]]),PROD([p,controlPoints[2]])])
					]));
	}

	// Get proportion
	var p = scale.proportion || 1;

	// height foundation steps
	var h1 = 0.16;
	var h2 = 0.08885;
	var hs = 0.01777;

	// height building
	var hb = 0.795+h1+h2;
	var hc = 0.745;

	// building floors and basements
	var floor = SIMPLEX_GRID([[-0.41*p,1.74*p],[-0.41*p,2.64*p],[-(h1+h2+10*hs-1.5*hs)*p,1.5*hs*p]]);
	var basement = SIMPLEX_GRID([[-0.41*p,1.74*p],[-0.41*p,2.64*p],[-(h1+h2)*p,2*hs*p]]);
	var topProjection = SIMPLEX_GRID([[-0.415*p,1.73*p],[-0.415*p,2.63*p],[-(h1+h2+hb-(hb-hc-10*hs))*p,(hb-hc-10*hs)*p]]);
	var lodgeFloor = SIMPLEX_GRID([[-2.14*p, 0.055*p],[-1.05*p,1.36*p],[-(h1+h2)*p,10*hs*p]]);

	// wall inferior part
	var infWallPart01 = getWall(p,[[0.42,0.42,h1+h2+2*hs],[2.14,0.42,h1+h2+2*hs],[2.14,0.42,h1+h2+3.5*hs],[0.42,0.42,h1+h2+3.5*hs]]); // lateral parts left
	var infWallPart02 = getWall(p,[[0.42,0.42,h1+h2+7.5*hs],[2.14,0.42,h1+h2+7.5*hs],[2.14,0.42,h1+h2+8.5*hs],[0.42,0.42,h1+h2+8.5*hs]]);
	var infWallPart03 = getWall(p,[[2.14,0.42,h1+h2+7.5*hs],[2.14,1.05,h1+h2+7.5*hs],[2.14,1.05,h1+h2+8.5*hs],[2.14,0.42,h1+h2+8.5*hs]]); // front parts left
	var infWallPart04 = getWall(p,[[2.14,0.42,h1+h2+2*hs],[2.14,1.05,h1+h2+2*hs],[2.14,1.05,h1+h2+3.5*hs],[2.14,0.42,h1+h2+3.5*hs]]);
	var infWallPart05 = getWall(p,[[0.42,0.42,h1+h2+7.5*hs],[0.42,3.04,h1+h2+7.5*hs],[0.42,3.04,h1+h2+8.5*hs],[0.42,0.42,h1+h2+8.5*hs]]); // back parts
	var infWallPart06 = getWall(p,[[0.42,0.42,h1+h2+2*hs],[0.42,3.04,h1+h2+2*hs],[0.42,3.04,h1+h2+3.5*hs],[0.42,0.42,h1+h2+3.5*hs]]);

	var infWallPart07 = getWall(p,[[0.42,0.42,h1+h2+3.5*hs],[0.692,0.42,h1+h2+3.5*hs],[0.692,0.42,h1+h2+7.5*hs],[0.42,0.42,h1+h2+7.5*hs]]); // windows borders lateral
	var infWallPart08 = getWall(p,[[0.84,0.42,h1+h2+3.5*hs],[1.22,0.42,h1+h2+3.5*hs],[1.22,0.42,h1+h2+7.5*hs],[0.84,0.42,h1+h2+7.5*hs]]); 
	var infWallPart09 = getWall(p,[[1.368,0.42,h1+h2+3.5*hs],[1.822,0.42,h1+h2+3.5*hs],[1.822,0.42,h1+h2+7.5*hs],[1.368,0.42,h1+h2+7.5*hs]]); 
	var infWallPart10 = getWall(p,[[1.97,0.42,h1+h2+3.5*hs],[2.14,0.42,h1+h2+3.5*hs],[2.14,0.42,h1+h2+7.5*hs],[1.97,0.42,h1+h2+7.5*hs]]); 

	var infWallPart11 = getWall(p,[[2.14,0.42,h1+h2+3.5*hs],[2.14,0.67,h1+h2+3.5*hs],[2.14,0.67,h1+h2+7.5*hs],[2.14,0.42,h1+h2+7.5*hs]]); // windows borders front
	var infWallPart12 = getWall(p,[[2.14,0.818,h1+h2+3.5*hs],[2.14,1.05,h1+h2+3.5*hs],[2.14,1.05,h1+h2+7.5*hs],[2.14,0.818,h1+h2+7.5*hs]]);

	var infWallPart13 = getWall(p,[[0.42,0.42,h1+h2+3.5*hs],[0.42,0.7,h1+h2+3.5*hs],[0.42,0.7,h1+h2+7.5*hs],[0.42,0.42,h1+h2+7.5*hs]]); // windows borders back
	var infWallPart14 = getWall(p,[[0.42,0.848,h1+h2+3.5*hs],[0.42,1.168,h1+h2+3.5*hs],[0.42,1.168,h1+h2+7.5*hs],[0.42,0.848,h1+h2+7.5*hs]]);
	var infWallPart15 = getWall(p,[[0.42,1.316,h1+h2+3.5*hs],[0.42,1.436,h1+h2+3.5*hs],[0.42,1.436,h1+h2+7.5*hs],[0.42,1.316,h1+h2+7.5*hs]]);
	var infWallPart16 = getWall(p,[[0.42,1.536,h1+h2+3.5*hs],[0.42,1.73,h1+h2+3.5*hs],[0.42,1.73,h1+h2+7.5*hs],[0.42,1.536,h1+h2+7.5*hs]]);


	var frontWallPart = getWall(p,[[2.14,0.42,h1+h2+10*hs],[2.14,1.09,h1+h2+10*hs],[2.14,1.09,hb+10*hs],[2.14,0.42,hb+10*hs]]); // front wall left
	var backWall = getWall(p,[[0.42,0.42,h1+h2+10*hs],[0.42,3.04,h1+h2+10*hs],[0.42,3.04,hb+10*hs],[0.42,0.42,hb+10*hs]]); // back wall
	var lateralWall = getWall(p,[[0.42,0.42,h1+h2+10*hs],[2.14,0.42,h1+h2+10*hs],[2.14,0.42,hb+10*hs],[0.42,0.42,hb+10*hs]]); // lateral left wall


	// lodge walls
	var lodgeLeftWall01 = getWall(p,[[2.14,1.09,h1+h2+10*hs],[1.97,1.09,h1+h2+10*hs],[1.97,1.09,h1+h2+10*hs+hc],[2.14,1.09,h1+h2+10*hs+hc]]);
	var lodgeLeftWall02 = getWall(p,[[1.97,1.09,h1+h2+10*hs+0.23],[1.87,1.09,h1+h2+10*hs+0.23],[1.87,1.09,h1+h2+10*hs+hc],[1.97,1.09,h1+h2+10*hs+hc]]);
	var lodgeLeftWall03 = getWall(p,[[1.87,1.09,h1+h2+10*hs],[1.7,1.09,h1+h2+10*hs],[1.7,1.09,h1+h2+10*hs+hc],[1.87,1.09,h1+h2+10*hs+hc]]);
	var lodgeWallPart01 = getWall(p,[[1.7,1.09,h1+h2+10*hs],[1.7,1.15,h1+h2+10*hs],[1.7,1.15,h1+h2+10*hs+hc],[1.7,1.09,h1+h2+10*hs+hc]]);
	var lodgeWallPart02 = getWall(p,[[1.7,1.15,h1+h2+10*hs],[1.7,1.25,h1+h2+10*hs],[1.7,1.25,h1+h2+10*hs+0.23],[1.7,1.15,h1+h2+10*hs+0.23]]);
	var lodgeWallPart03 = getWall(p,[[1.7,1.15,h1+h2+10*hs+2/3*hc],[1.7,1.25,h1+h2+10*hs+2/3*hc],[1.7,1.25,h1+h2+10*hs+hc],[1.7,1.15,h1+h2+10*hs+hc]]);
	var lodgeWallPart04 = getWall(p,[[1.7,1.25,h1+h2+10*hs],[1.7,1.637,h1+h2+10*hs],[1.7,1.637,h1+h2+10*hs+hc],[1.7,1.25,h1+h2+10*hs+hc]]);
	var lodgeWallPart05 = getWall(p,[[1.7,1.637,h1+h2+10*hs+2/3*hc],[1.7,1.823,h1+h2+10*hs+2/3*hc],[1.7,1.823,h1+h2+10*hs+hc],[1.7,1.637,h1+h2+10*hs+hc]]);
	var lodgeWallPart06 = getWall(p,[[1.7,1.823,h1+h2+10*hs],[1.7,2.210,h1+h2+10*hs],[1.7,2.210,h1+h2+10*hs+hc],[1.7,1.823,h1+h2+10*hs+hc]]);
	var lodgeWallPart07 = getWall(p,[[1.7,2.210,h1+h2+10*hs],[1.7,2.310,h1+h2+10*hs],[1.7,2.310,h1+h2+10*hs+0.23],[1.7,2.210,h1+h2+10*hs+0.23]]);
	var lodgeWallPart08 = getWall(p,[[1.7,2.210,h1+h2+10*hs+2/3*hc],[1.7,2.310,h1+h2+10*hs+2/3*hc],[1.7,2.310,h1+h2+10*hs+hc],[1.7,2.210,h1+h2+10*hs+hc]]);
	var lodgeWallPart09 = getWall(p,[[1.7,2.310,h1+h2+10*hs],[1.7,2.370,h1+h2+10*hs],[1.7,2.370,h1+h2+10*hs+hc],[1.7,2.310,h1+h2+10*hs+hc]]);


	// struct wall
	var walls = STRUCT([infWallPart01, T([1])([3.46*p])(S([1])([-1])(infWallPart01)),
						infWallPart02, T([1])([3.46*p])(S([1])([-1])(infWallPart02)),
						infWallPart03, T([1])([3.46*p])(S([1])([-1])(infWallPart03)),
						infWallPart04, T([1])([3.46*p])(S([1])([-1])(infWallPart04)),
						infWallPart05, infWallPart06,
						infWallPart07, T([1])([3.46*p])(S([1])([-1])(infWallPart07)),
						infWallPart08, T([1])([3.46*p])(S([1])([-1])(infWallPart08)),
						infWallPart09, T([1])([3.46*p])(S([1])([-1])(infWallPart09)),
						infWallPart10, T([1])([3.46*p])(S([1])([-1])(infWallPart10)),
						infWallPart11, T([1])([3.46*p])(S([1])([-1])(infWallPart11)),
						infWallPart12, T([1])([3.46*p])(S([1])([-1])(infWallPart12)),

						infWallPart13, T([1])([3.46*p])(S([1])([-1])(infWallPart13)),
						infWallPart14, T([1])([3.46*p])(S([1])([-1])(infWallPart14)),
						infWallPart15, T([1])([3.46*p])(S([1])([-1])(infWallPart15)),
						infWallPart16, T([1])([3.46*p])(S([1])([-1])(infWallPart16)),
						frontWallPart, T([1])([3.46*p])(S([1])([-1])(frontWallPart)),

						lodgeLeftWall01, T([1])([3.46*p])(S([1])([-1])(lodgeLeftWall01)),
						lodgeLeftWall02, T([1])([3.46*p])(S([1])([-1])(lodgeLeftWall02)),
						lodgeLeftWall03, T([1])([3.46*p])(S([1])([-1])(lodgeLeftWall03)),
						lodgeWallPart01,
						lodgeWallPart02,
						lodgeWallPart03,
						lodgeWallPart04,
						lodgeWallPart05,
						lodgeWallPart06,
						lodgeWallPart07,
						lodgeWallPart08, lodgeWallPart09,

						backWall,
						lateralWall, T([1])([3.46*p])(S([1])([-1])(lateralWall)),
						]);

	return (STRUCT([floor,lodgeFloor,basement,topProjection,walls])).color(colors.hue); // TODO stringere porta

}


/*
	Function that generate the ledge
*/
function ledge(){

	// Get proportion
	var p = scale.proportion || 1;

	// height foundation steps
	var h1 = 0.16;
	var h2 = 0.08885;
	var hs = 0.01777;

	// height building
	var hb = 0.795+h1+h2;
	var hc = 0.745;

	// height ledge hl*2
	var hl = (hb-hc-10*hs)/2;
	var prof = 0.08;

	var frontBaseLedgeLeft = NUBS(S0)(1)([0,0,0,1,2,3,4,5,6,6,6])(
						[[0.012*p,0,hl*p],[0.012*p,0,hl*p],
						[0.007*p,0.005*p,(hl-1/4*hl)*p],
						[0.006*p,0.006*p,(hl-2/4*hl)*p],
						[0.004*p,0.008*p,(hl-2/4*hl)*p],
						[0.003*p,0.009*p,(hl-3/4*hl)*p],
						[0.001*p,0.011*p,(hl-3/4*hl)*p],
						[0,0.012*p,0],[0,0.012*p,0]
						]);

	var frontBaseLedgeLeftBack = NUBS(S0)(1)([0,0,0,1,2,3,4,5,6,6,6])(
						[[(0.012-prof)*p,0,hl*p],[(0.012-prof)*p,0,hl*p],
						[(0.007-prof)*p,0.005*p,(hl-1/4*hl)*p],
						[(0.006-prof)*p,0.006*p,(hl-2/4*hl)*p],
						[(0.004-prof)*p,0.008*p,(hl-2/4*hl)*p],
						[(0.003-prof)*p,0.009*p,(hl-3/4*hl)*p],
						[(0.001-prof)*p,0.011*p,(hl-3/4*hl)*p],
						[-prof*p,0.012*p,0],[-prof*p,0.012*p,0]
						]);

	var frontBaseLedgeRight = NUBS(S0)(1)([0,0,0,1,2,3,4,5,6,6,6])(
						[[0.012*p,1.36*p,hl*p],[0.012*p,1.36*p,hl*p],
						[0.007*p,(1.36-0.005)*p,(hl-1/4*hl)*p],
						[0.006*p,(1.36-0.006)*p,(hl-2/4*hl)*p],
						[0.004*p,(1.36-0.008)*p,(hl-2/4*hl)*p],
						[0.003*p,(1.36-0.009)*p,(hl-3/4*hl)*p],
						[0.001*p,(1.36-0.011)*p,(hl-3/4*hl)*p],
						[0,(1.36-0.012)*p,0],[0,(1.36-0.012)*p,0]
						]);

	var frontBaseLedgeRightBack = NUBS(S0)(1)([0,0,0,1,2,3,4,5,6,6,6])(
						[[(0.012-prof)*p,1.36*p,hl*p],[(0.012-prof)*p,1.36*p,hl*p],
						[(0.007-prof)*p,(1.36-0.005)*p,(hl-1/4*hl)*p],
						[(0.006-prof)*p,(1.36-0.006)*p,(hl-2/4*hl)*p],
						[(0.004-prof)*p,(1.36-0.008)*p,(hl-2/4*hl)*p],
						[(0.003-prof)*p,(1.36-0.009)*p,(hl-3/4*hl)*p],
						[(0.001-prof)*p,(1.36-0.011)*p,(hl-3/4*hl)*p],
						[-prof*p,(1.36-0.012)*p,0],[-prof*p,(1.36-0.012)*p,0]
						]);


	var frontTopLedgeLeft = NUBS(S0)(2)([0,0,0,1,2,3,4,4,4])(
						[[0.012*p,0,hl*p],
						[0.016*p,-0.004*p,(hl+hl/8)*p],
						[0.012*p,0,(hl+hl/4)*p],[0.012*p,0,(hl+hl/4)*p],
						[0.013*p,-0.001*p,(hl+2/3*hl)*p],
						[0,0.012*p,2*hl*p]
						]);

	var frontTopLedgeLeftBack = NUBS(S0)(2)([0,0,0,1,2,3,4,4,4])(
						[[(0.012-prof)*p,0,hl*p],
						[(0.016-prof)*p,-0.004*p,(hl+hl/8)*p],
						[(0.012-prof)*p,0,(hl+hl/4)*p],[(0.012-prof)*p,0,(hl+hl/4)*p],
						[(0.013-prof)*p,-0.001*p,(hl+2/3*hl)*p],
						[-prof*p,0.012*p,2*hl*p]
						]);

	var frontTopLedgeRight = NUBS(S0)(2)([0,0,0,1,2,3,4,4,4])(
						[[0.012*p,1.36*p,hl*p],
						[0.016*p,(1.36+0.004)*p,(hl+hl/8)*p],
						[0.012*p,1.36*p,(hl+hl/4)*p],[0.012*p,1.36*p,(hl+hl/4)*p],
						[0.013*p,(1.36+0.001)*p,(hl+2/3*hl)*p],
						[0,(1.36-0.012)*p,2*hl*p]
						]);

	var frontTopLedgeRightBack = NUBS(S0)(2)([0,0,0,1,2,3,4,4,4])(
						[[(0.012-prof)*p,1.36*p,hl*p],
						[(0.016-prof)*p,(1.36+0.004)*p,(hl+hl/8)*p],
						[(0.012-prof)*p,1.36*p,(hl+hl/4)*p],[(0.012-prof)*p,1.36*p,(hl+hl/4)*p],
						[(0.013-prof)*p,(1.36+0.001)*p,(hl+2/3*hl)*p],
						[-prof*p,(1.36-0.012)*p,2*hl*p]
						]);

	var frontLedge = STRUCT([
				COLOR(colors.baseFrontLedge)(MAP(BEZIER(S1)([frontBaseLedgeLeft,frontBaseLedgeRight]))(domains.railTopDomain)),
				COLOR(colors.baseFrontLedge)(MAP(BEZIER(S1)([frontBaseLedgeLeft,frontBaseLedgeLeftBack]))(domains.railTopDomain)),
				COLOR(colors.baseFrontLedge)(MAP(BEZIER(S1)([frontBaseLedgeRight,frontBaseLedgeRightBack]))(domains.railTopDomain)),
				COLOR(colors.hue)(MAP(BEZIER(S1)([frontTopLedgeLeft,frontTopLedgeRight]))(domains.railTopDomain)),
				COLOR(colors.hue)(MAP(BEZIER(S1)([frontTopLedgeLeft,frontTopLedgeLeftBack]))(domains.railTopDomain)),
				COLOR(colors.hue)(MAP(BEZIER(S1)([frontTopLedgeRight,frontTopLedgeRightBack]))(domains.railTopDomain)),
				COLOR(colors.hue)(TRIANGLE_DOMAIN(1,[[0,0.012*p,0],[0,(1.36-0.012)*p,0],[-prof*p,0.012*p,0]])),
				COLOR(colors.hue)(TRIANGLE_DOMAIN(1,[[0,(1.36-0.012)*p,0],[-prof*p,0.012*p,0],[-prof*p,(1.36-0.012)*p,0]])),
			]);

	frontLedge = T([0,1,2])([2.19*p,1.05*p,(hb+2*hl+0.0065)*p])(frontLedge);

	//
	// Ledge
	//

	var ledgeProfileLeft = NUBS(S0)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17, //20
									 18,19,20,21,22,23,24,25,26,27,28,28,28])(
						[[0,0.060*p,0],
						[0.001*p,0.059*p,0],[0.001*p,0.059*p,0],
						[0.001*p,0.059*p,0.003*p],
						[0.005*p,0.055*p,0.005*p],
						[0.005*p,0.055*p,0.008*p],[0.005*p,0.055*p,0.008*p],
						[0.006*p,0.054*p,0.008*p],[0.006*p,0.054*p,0.008*p],
						[0.006*p,0.054*p,0.015*p],
						[0.014*p,0.046*p,0.018*p],
						[0.014*p,0.046*p,0.023*p],[0.014*p,0.046*p,0.023*p],
						[0.015*p,0.045*p,0.023*p],[0.015*p,0.045*p,0.023*p],
						[0.015*p,0.045*p,0.046*p],[0.015*p,0.045*p,0.046*p],
						[0.019*p,0.041*p,0.046*p],[0.019*p,0.041*p,0.046*p],
						[0.019*p,0.041*p,0.050*p],[0.019*p,0.041*p,0.050*p], // a
						[0.045*p,0.015*p,0.050*p],[0.045*p,0.015*p,0.050*p],
						[0.045*p,0.015*p,0.062*p],[0.045*p,0.015*p,0.062*p],
						[0.053*p,0.007*p,0.062*p],
						[0.053*p,0.007*p,0.082*p],
						[0.060*p,0,0.082*p],[0.060*p,0,0.082*p], 
						[0.060*p,0,0.084*p], //33
						]);

	var len = 2.75; //50

	var ledgeProfileRigth = NUBS(S0)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17, //20
									 18,19,20,21,22,23,24,25,26,27,28,28,28])(
						[[0,(len-0.060)*p,0],
						[0.001*p,(len-0.059)*p,0],[0.001*p,(len-0.059)*p,0],
						[0.001*p,(len-0.059)*p,0.003*p],
						[0.005*p,(len-0.055)*p,0.005*p],
						[0.005*p,(len-0.055)*p,0.008*p],[0.005*p,(len-0.055)*p,0.008*p],
						[0.006*p,(len-0.054)*p,0.008*p],[0.006*p,(len-0.054)*p,0.008*p],
						[0.006*p,(len-0.054)*p,0.015*p],
						[0.014*p,(len-0.046)*p,0.018*p],
						[0.014*p,(len-0.046)*p,0.023*p],[0.014*p,(len-0.046)*p,0.023*p],
						[0.015*p,(len-0.045)*p,0.023*p],[0.015*p,(len-0.045)*p,0.023*p],
						[0.015*p,(len-0.045)*p,0.046*p],[0.015*p,(len-0.045)*p,0.046*p],
						[0.019*p,(len-0.041)*p,0.046*p],[0.019*p,(len-0.041)*p,0.046*p],
						[0.019*p,(len-0.041)*p,0.050*p],[0.019*p,(len-0.041)*p,0.050*p], // a
						[0.045*p,(len-0.015)*p,0.050*p],[0.045*p,(len-0.015)*p,0.050*p],
						[0.045*p,(len-0.015)*p,0.062*p],[0.045*p,(len-0.015)*p,0.062*p],
						[0.053*p,(len-0.007)*p,0.062*p],
						[0.053*p,(len-0.007)*p,0.082*p],
						[0.060*p,len*p,0.082*p],[0.060*p,len*p,0.082*p], 
						[0.060*p,len*p,0.084*p], //33
						]);
	
	var ledgeLong = MAP(BEZIER(S1)([ledgeProfileLeft,ledgeProfileRigth]))(domains.ledgeDomain);

	// the left part of the frontal ledge

	len = 0.64;

	var ledgeFrontProfileLeft = NUBS(S0)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17, //20
									 18,19,20,21,22,23,24,25,26,27,28,28,28])(
						[[0,(len+0.060)*p,0],
						[0.001*p,(len+0.059)*p,0],[0.001*p,(len+0.059)*p,0],
						[0.001*p,(len+0.059)*p,0.003*p],
						[0.005*p,(len+0.055)*p,0.005*p],
						[0.005*p,(len+0.055)*p,0.008*p],[0.005*p,(len+0.055)*p,0.008*p],
						[0.006*p,(len+0.054)*p,0.008*p],[0.006*p,(len+0.054)*p,0.008*p],
						[0.006*p,(len+0.054)*p,0.015*p],
						[0.014*p,(len+0.046)*p,0.018*p],
						[0.014*p,(len+0.046)*p,0.023*p],[0.014*p,(len+0.046)*p,0.023*p],
						[0.015*p,(len+0.045)*p,0.023*p],[0.015*p,(len+0.045)*p,0.023*p],
						[0.015*p,(len+0.045)*p,0.046*p],[0.015*p,(len+0.045)*p,0.046*p],
						[0.019*p,(len+0.041)*p,0.046*p],[0.019*p,(len+0.041)*p,0.046*p],
						[0.019*p,(len+0.041)*p,0.050*p],[0.019*p,(len+0.041)*p,0.050*p], // a
						[0.045*p,(len+0.015)*p,0.050*p],[0.045*p,(len+0.015)*p,0.050*p],
						[0.045*p,(len+0.015)*p,0.062*p],[0.045*p,(len+0.015)*p,0.062*p],
						[0.053*p,(len+0.007)*p,0.062*p],
						[0.053*p,(len+0.007)*p,0.082*p],
						[0.060*p,len*p,0.082*p],[0.060*p,len*p,0.082*p], 
						[0.060*p,len*p,0.084*p], //33
						]);

	var ledgeFrontLeftShort = MAP(BEZIER(S1)([ledgeProfileLeft,ledgeFrontProfileLeft]))(domains.ledgeDomain);

	// the right part of the frontal ledge

	len = 2.75-0.64;

	var ledgeFrontProfileRight = NUBS(S0)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17, //20
									 18,19,20,21,22,23,24,25,26,27,28,28,28])(
						[[0,(len-0.060)*p,0],
						[0.001*p,(len-0.059)*p,0],[0.001*p,(len-0.059)*p,0],
						[0.001*p,(len-0.059)*p,0.003*p],
						[0.005*p,(len-0.055)*p,0.005*p],
						[0.005*p,(len-0.055)*p,0.008*p],[0.005*p,(len-0.055)*p,0.008*p],
						[0.006*p,(len-0.054)*p,0.008*p],[0.006*p,(len-0.054)*p,0.008*p],
						[0.006*p,(len-0.054)*p,0.015*p],
						[0.014*p,(len-0.046)*p,0.018*p],
						[0.014*p,(len-0.046)*p,0.023*p],[0.014*p,(len-0.046)*p,0.023*p],
						[0.015*p,(len-0.045)*p,0.023*p],[0.015*p,(len-0.045)*p,0.023*p],
						[0.015*p,(len-0.045)*p,0.046*p],[0.015*p,(len-0.045)*p,0.046*p],
						[0.019*p,(len-0.041)*p,0.046*p],[0.019*p,(len-0.041)*p,0.046*p],
						[0.019*p,(len-0.041)*p,0.050*p],[0.019*p,(len-0.041)*p,0.050*p], // a
						[0.045*p,(len-0.015)*p,0.050*p],[0.045*p,(len-0.015)*p,0.050*p],
						[0.045*p,(len-0.015)*p,0.062*p],[0.045*p,(len-0.015)*p,0.062*p],
						[0.053*p,(len-0.007)*p,0.062*p],
						[0.053*p,(len-0.007)*p,0.082*p],
						[0.060*p,len*p,0.082*p],[0.060*p,len*p,0.082*p], 
						[0.060*p,len*p,0.084*p], //33
						]);

	var ledgeFrontRightShort = MAP(BEZIER(S1)([ledgeProfileRigth,ledgeFrontProfileRight]))(domains.ledgeDomain);

	// the lateral part of the ledge	

	len = 1.85;

	var ledgeProfileRigth = NUBS(S0)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17, //20
									 18,19,20,21,22,23,24,25,26,27,28,28,28])(
						[[0,(len-0.060)*p,0],
						[0.001*p,(len-0.059)*p,0],[0.001*p,(len-0.059)*p,0],
						[0.001*p,(len-0.059)*p,0.003*p],
						[0.005*p,(len-0.055)*p,0.005*p],
						[0.005*p,(len-0.055)*p,0.008*p],[0.005*p,(len-0.055)*p,0.008*p],
						[0.006*p,(len-0.054)*p,0.008*p],[0.006*p,(len-0.054)*p,0.008*p],
						[0.006*p,(len-0.054)*p,0.015*p],
						[0.014*p,(len-0.046)*p,0.018*p],
						[0.014*p,(len-0.046)*p,0.023*p],[0.014*p,(len-0.046)*p,0.023*p],
						[0.015*p,(len-0.045)*p,0.023*p],[0.015*p,(len-0.045)*p,0.023*p],
						[0.015*p,(len-0.045)*p,0.046*p],[0.015*p,(len-0.045)*p,0.046*p],
						[0.019*p,(len-0.041)*p,0.046*p],[0.019*p,(len-0.041)*p,0.046*p],
						[0.019*p,(len-0.041)*p,0.050*p],[0.019*p,(len-0.041)*p,0.050*p], // a
						[0.045*p,(len-0.015)*p,0.050*p],[0.045*p,(len-0.015)*p,0.050*p],
						[0.045*p,(len-0.015)*p,0.062*p],[0.045*p,(len-0.015)*p,0.062*p],
						[0.053*p,(len-0.007)*p,0.062*p],
						[0.053*p,(len-0.007)*p,0.082*p],
						[0.060*p,len*p,0.082*p],[0.060*p,len*p,0.082*p], 
						[0.060*p,len*p,0.084*p], //33
						]);

	var ledgeShort = MAP(BEZIER(S1)([ledgeProfileLeft,ledgeProfileRigth]))(domains.ledgeDomain);


	return STRUCT([
				frontLedge,
				(T([0,1,2])([2.145*p,0.355*p,(hb+10*hs+hl+0.0105)*p])(ledgeFrontLeftShort)).color(colors.hue),
				(T([0,1,2])([2.145*p,0.355*p,(hb+10*hs+hl+0.0105)*p])(ledgeFrontRightShort)).color(colors.hue),
				(T([0,1,2])([0.355*p,0.415*p,(hb+10*hs+hl+0.0105)*p])(R([0,1])(-PI/2)(ledgeShort))).color(colors.hue),
				(T([0,1,2])([2.205*p,3.045*p,(hb+10*hs+hl+0.0105)*p])(R([0,1])(PI/2)(ledgeShort))).color(colors.hue),
				(T([0,1,2])([0.415*p,0.355*p,(hb+10*hs+hl+0.0105)*p])(S([0])([-1])(ledgeLong))).color(colors.hue),
			]);

}



function tympanum(){

	// Get proportion
	var p = scale.proportion || 1;

	// height foundation steps
	var h1 = 0.16;
	var h2 = 0.08885;
	var hs = 0.01777;

	// height building
	var hb = 0.795+h1+h2;
	var hc = 0.745;

	// height ledge hl*2
	var hl = (hb-hc-10*hs)/2;
	var prof = 0.08;

	var len = 1.48;
	var prof = 0.1

	var bottomProfileLeft = NUBS(S0)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17, //20
									 18,19,20,21,22,23,24,25,26,27,27,27])(
						[[0,0.060*p,0],
						[0.001*p,0.059*p,0],[0.001*p,0.059*p,0],
						[0.001*p,0.059*p,0.003*p],
						[0.005*p,0.055*p,0.005*p],
						[0.005*p,0.055*p,0.008*p],[0.005*p,0.055*p,0.008*p],
						[0.006*p,0.054*p,0.008*p],[0.006*p,0.054*p,0.008*p],
						[0.006*p,0.054*p,0.015*p],
						[0.014*p,0.046*p,0.018*p],
						[0.014*p,0.046*p,0.023*p],[0.014*p,0.046*p,0.023*p],
						[0.015*p,0.045*p,0.023*p],[0.015*p,0.045*p,0.023*p],
						[0.015*p,0.045*p,0.046*p],[0.015*p,0.045*p,0.046*p],
						[0.019*p,0.041*p,0.046*p],[0.019*p,0.041*p,0.046*p],
						[0.019*p,0.041*p,0.050*p],[0.019*p,0.041*p,0.050*p], // a
						[0.045*p,0.015*p,0.050*p],[0.045*p,0.015*p,0.050*p],
						[0.045*p,0.015*p,0.058*p],[0.045*p,0.015*p,0.058*p], //
						[0.049*p,0.011*p,0.058*p],[0.049*p,0.011*p,0.058*p],
						[0.049*p,0.011*p,0.062*p],[0.049*p,0.011*p,0.062*p],
						]);

	var bottomProfileRight = NUBS(S0)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17, //20
									 18,19,20,21,22,23,24,25,26,27,27,27])(
						[[0,(len-0.060)*p,0],
						[0.001*p,(len-0.059)*p,0],[0.001*p,(len-0.059)*p,0],
						[0.001*p,(len-0.059)*p,0.003*p],
						[0.005*p,(len-0.055)*p,0.005*p],
						[0.005*p,(len-0.055)*p,0.008*p],[0.005*p,(len-0.055)*p,0.008*p],
						[0.006*p,(len-0.054)*p,0.008*p],[0.006*p,(len-0.054)*p,0.008*p],
						[0.006*p,(len-0.054)*p,0.015*p],
						[0.014*p,(len-0.046)*p,0.018*p],
						[0.014*p,(len-0.046)*p,0.023*p],[0.014*p,(len-0.046)*p,0.023*p],
						[0.015*p,(len-0.045)*p,0.023*p],[0.015*p,(len-0.045)*p,0.023*p],
						[0.015*p,(len-0.045)*p,0.046*p],[0.015*p,(len-0.045)*p,0.046*p],
						[0.019*p,(len-0.041)*p,0.046*p],[0.019*p,(len-0.041)*p,0.046*p],
						[0.019*p,(len-0.041)*p,0.050*p],[0.019*p,(len-0.041)*p,0.050*p], // a
						[0.045*p,(len-0.015)*p,0.050*p],[0.045*p,(len-0.015)*p,0.050*p],
						[0.045*p,(len-0.015)*p,0.058*p],[0.045*p,(len-0.015)*p,0.058*p], //
						[0.049*p,(len-0.011)*p,0.058*p],[0.049*p,(len-0.011)*p,0.058*p],
						[0.049*p,(len-0.011)*p,0.062*p],[0.049*p,(len-0.011)*p,0.062*p],
						]);

	var bottomProfileLeftBack = NUBS(S0)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17, //20
									 18,19,20,21,22,23,24,25,26,27,27,27])(
						[[-prof*p,0.060*p,0],
						[(0.001-prof)*p,0.059*p,0],[(0.001-prof)*p,0.059*p,0],
						[(0.001-prof)*p,0.059*p,0.003*p],
						[(0.005-prof)*p,0.055*p,0.005*p],
						[(0.005-prof)*p,0.055*p,0.008*p],[(0.005-prof)*p,0.055*p,0.008*p],
						[(0.006-prof)*p,0.054*p,0.008*p],[(0.006-prof)*p,0.054*p,0.008*p],
						[(0.006-prof)*p,0.054*p,0.015*p],
						[(0.014-prof)*p,0.046*p,0.018*p],
						[(0.014-prof)*p,0.046*p,0.023*p],[(0.014-prof)*p,0.046*p,0.023*p],
						[(0.015-prof)*p,0.045*p,0.023*p],[(0.015-prof)*p,0.045*p,0.023*p],
						[(0.015-prof)*p,0.045*p,0.046*p],[(0.015-prof)*p,0.045*p,0.046*p],
						[(0.019-prof)*p,0.041*p,0.046*p],[(0.019-prof)*p,0.041*p,0.046*p],
						[(0.019-prof)*p,0.041*p,0.050*p],[(0.019-prof)*p,0.041*p,0.050*p], // a
						[(0.045-prof)*p,0.015*p,0.050*p],[(0.045-prof)*p,0.015*p,0.050*p],
						[(0.045-prof)*p,0.015*p,0.058*p],[(0.045-prof)*p,0.015*p,0.058*p], //
						[(0.049-prof)*p,0.011*p,0.058*p],[(0.049-prof)*p,0.011*p,0.058*p],
						[(0.049-prof)*p,0.011*p,0.062*p],[(0.049-prof)*p,0.011*p,0.062*p],
						]);

	var bottomProfileRightBack = NUBS(S0)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17, //20
									 18,19,20,21,22,23,24,25,26,27,27,27])(
						[[-prof*p,(len-0.060)*p,0],
						[(0.001-prof)*p,(len-0.059)*p,0],[(0.001-prof)*p,(len-0.059)*p,0],
						[(0.001-prof)*p,(len-0.059)*p,0.003*p],
						[(0.005-prof)*p,(len-0.055)*p,0.005*p],
						[(0.005-prof)*p,(len-0.055)*p,0.008*p],[(0.005-prof)*p,(len-0.055)*p,0.008*p],
						[(0.006-prof)*p,(len-0.054)*p,0.008*p],[(0.006-prof)*p,(len-0.054)*p,0.008*p],
						[(0.006-prof)*p,(len-0.054)*p,0.015*p],
						[(0.014-prof)*p,(len-0.046)*p,0.018*p],
						[(0.014-prof)*p,(len-0.046)*p,0.023*p],[(0.014-prof)*p,(len-0.046)*p,0.023*p],
						[(0.015-prof)*p,(len-0.045)*p,0.023*p],[(0.015-prof)*p,(len-0.045)*p,0.023*p],
						[(0.015-prof)*p,(len-0.045)*p,0.046*p],[(0.015-prof)*p,(len-0.045)*p,0.046*p],
						[(0.019-prof)*p,(len-0.041)*p,0.046*p],[(0.019-prof)*p,(len-0.041)*p,0.046*p],
						[(0.019-prof)*p,(len-0.041)*p,0.050*p],[(0.019-prof)*p,(len-0.041)*p,0.050*p], // a
						[(0.045-prof)*p,(len-0.015)*p,0.050*p],[(0.045-prof)*p,(len-0.015)*p,0.050*p],
						[(0.045-prof)*p,(len-0.015)*p,0.058*p],[(0.045-prof)*p,(len-0.015)*p,0.058*p], //
						[(0.049-prof)*p,(len-0.011)*p,0.058*p],[(0.049-prof)*p,(len-0.011)*p,0.058*p],
						[(0.049-prof)*p,(len-0.011)*p,0.062*p],[(0.049-prof)*p,(len-0.011)*p,0.062*p],
						]);

	var bottom = STRUCT([
					MAP(BEZIER(S1)([bottomProfileLeft,bottomProfileRight]))(domains.ledgeDomain),
					MAP(BEZIER(S1)([bottomProfileLeft,bottomProfileLeftBack]))(domains.ledgeDomain),
					MAP(BEZIER(S1)([bottomProfileRight,bottomProfileRightBack]))(domains.ledgeDomain)
				]);

	bottom = T([0,1,2])([2.19*p,0.99*p,(hb+4*hl+0.0065)*p])(bottom);


	// triangle lodge

	var topProfileLeft = NUBS(S0)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17, //20
									 18,19,20,21,22,23,24,25,26,27,28,28,28])(
						[[0,0.060*p,0],
						[0.001*p,0.059*p,0],[0.001*p,0.059*p,0],
						[0.001*p,0.059*p,0.003*p],
						[0.005*p,0.055*p,0.005*p],
						[0.005*p,0.055*p,0.008*p],[0.005*p,0.055*p,0.008*p],
						[0.006*p,0.054*p,0.008*p],[0.006*p,0.054*p,0.008*p],
						[0.006*p,0.054*p,0.015*p],
						[0.014*p,0.046*p,0.018*p],
						[0.014*p,0.046*p,0.023*p],[0.014*p,0.046*p,0.023*p],
						[0.015*p,0.045*p,0.023*p],[0.015*p,0.045*p,0.023*p],
						[0.015*p,0.016*p,0.046*p],[0.015*p,0.016*p,0.046*p],
						[0.019*p,0.016*p,0.046*p],[0.019*p,0.016*p,0.046*p],
						[0.019*p,0.016*p,0.050*p],[0.019*p,0.016*p,0.050*p], // a
						[0.045*p,0.015*p,0.050*p],[0.045*p,0.015*p,0.050*p],
						[0.045*p,0.015*p,0.062*p],[0.045*p,0.015*p,0.062*p],
						[0.053*p,0.007*p,0.062*p],
						[0.053*p,0.007*p,0.082*p],
						[0.060*p,0,0.082*p],[0.060*p,0,0.082*p], 
						[0.060*p,0,0.084*p], //33
						]);

	len = 0.8785;

	var topProfileRigth = NUBS(S0)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17, //20
									 18,19,20,21,22,23,24,25,26,27,28,28,28])(
						[[0,(len)*p,0],
						[0.001*p,(len)*p,0],[0.001*p,(len)*p,0],
						[0.001*p,(len)*p,0.003*p],
						[0.005*p,(len)*p,0.005*p],
						[0.005*p,(len)*p,0.008*p],[0.005*p,(len)*p,0.008*p],
						[0.006*p,(len)*p,0.008*p],[0.006*p,(len)*p,0.008*p],
						[0.006*p,(len)*p,0.015*p],
						[0.014*p,(len)*p,0.018*p],
						[0.014*p,(len)*p,0.023*p],[0.014*p,(len)*p,0.023*p],
						[0.015*p,(len)*p,0.023*p],[0.015*p,(len)*p,0.023*p],
						[0.015*p,(len)*p,0.046*p],[0.015*p,(len)*p,0.046*p],
						[0.019*p,(len)*p,0.046*p],[0.019*p,(len)*p,0.046*p],
						[0.019*p,(len)*p,0.050*p],[0.019*p,(len)*p,0.050*p], // a
						[0.045*p,(len)*p,0.050*p],[0.045*p,(len)*p,0.050*p],
						[0.045*p,(len)*p,0.062*p],[0.045*p,(len)*p,0.062*p],
						[0.053*p,(len)*p,0.062*p],
						[0.053*p,(len)*p,0.082*p],
						[0.060*p,len*p,0.082*p],[0.060*p,len*p,0.082*p], 
						[0.060*p,len*p,0.084*p], //33
						]);

	var topProfileLeftBack = NUBS(S0)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17, //20
									 18,19,20,21,22,23,24,25,26,27,28,28,28])(
						[[-prof*p,0.060*p,0],
						[(0.001-prof)*p,0.059*p,0],[(0.001-prof)*p,0.059*p,0],
						[(0.001-prof)*p,0.059*p,0.003*p],
						[(0.005-prof)*p,0.055*p,0.005*p],
						[(0.005-prof)*p,0.055*p,0.008*p],[(0.005-prof)*p,0.055*p,0.008*p],
						[(0.006-prof)*p,0.054*p,0.008*p],[(0.006-prof)*p,0.054*p,0.008*p],
						[(0.006-prof)*p,0.054*p,0.015*p],
						[(0.014-prof)*p,0.046*p,0.018*p],
						[(0.014-prof)*p,0.046*p,0.023*p],[(0.014-prof)*p,0.046*p,0.023*p],
						[(0.015-prof)*p,0.045*p,0.023*p],[(0.015-prof)*p,0.045*p,0.023*p],
						[(0.015-prof)*p,0.045*p,0.046*p],[(0.015-prof)*p,0.045*p,0.046*p],
						[(0.019-prof)*p,0.041*p,0.046*p],[(0.019-prof)*p,0.041*p,0.046*p],
						[(0.019-prof)*p,0.041*p,0.050*p],[(0.019-prof)*p,0.041*p,0.050*p], // a
						[(0.045-prof)*p,0.015*p,0.050*p],[(0.045-prof)*p,0.015*p,0.050*p],
						[(0.045-prof)*p,0.015*p,0.062*p],[(0.045-prof)*p,0.015*p,0.062*p],
						[(0.053-prof)*p,0.007*p,0.062*p],
						[(0.053-prof)*p,0.007*p,0.082*p],
						[(0.060-prof)*p,0,0.082*p],[(0.060-prof)*p,0,0.082*p], 
						[(0.060-prof)*p,0,0.084*p], //33
						]);

	var topProfileRigthBack = NUBS(S0)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17, //20
									 18,19,20,21,22,23,24,25,26,27,28,28,28])(
						[[-prof*p,(len-0.060)*p,0],
						[(0.001-prof)*p,(len-0.059)*p,0],[(0.001-prof)*p,(len-0.059)*p,0],
						[(0.001-prof)*p,(len-0.059)*p,0.003*p],
						[(0.005-prof)*p,(len-0.055)*p,0.005*p],
						[(0.005-prof)*p,(len-0.055)*p,0.008*p],[(0.005-prof)*p,(len-0.055)*p,0.008*p],
						[(0.006-prof)*p,(len-0.054)*p,0.008*p],[(0.006-prof)*p,(len-0.054)*p,0.008*p],
						[(0.006-prof)*p,(len-0.054)*p,0.015*p],
						[(0.014-prof)*p,(len-0.046)*p,0.018*p],
						[(0.014-prof)*p,(len-0.046)*p,0.023*p],[(0.014-prof)*p,(len-0.046)*p,0.023*p],
						[(0.015-prof)*p,(len-0.045)*p,0.023*p],[(0.015-prof)*p,(len-0.045)*p,0.023*p],
						[(0.015-prof)*p,(len-0.045)*p,0.046*p],[(0.015-prof)*p,(len-0.045)*p,0.046*p],
						[(0.019-prof)*p,(len-0.041)*p,0.046*p],[(0.019-prof)*p,(len-0.041)*p,0.046*p],
						[(0.019-prof)*p,(len-0.041)*p,0.050*p],[(0.019-prof)*p,(len-0.041)*p,0.050*p], // a
						[(0.045-prof)*p,(len-0.015)*p,0.050*p],[(0.045-prof)*p,(len-0.015)*p,0.050*p],
						[(0.045-prof)*p,(len-0.015)*p,0.062*p],[(0.045-prof)*p,(len-0.015)*p,0.062*p],
						[(0.053-prof)*p,(len-0.007)*p,0.062*p],
						[(0.053-prof)*p,(len-0.007)*p,0.082*p],
						[(0.060-prof)*p,len*p,0.082*p],[(0.060-prof)*p,len*p,0.082*p], 
						[(0.060-prof)*p,len*p,0.084*p], //33
						]);

	var top = STRUCT([
				MAP(BEZIER(S1)([topProfileLeft,topProfileRigth]))(domains.ledgeDomain),
				MAP(BEZIER(S1)([topProfileLeft,topProfileLeftBack]))(domains.ledgeDomain),
				MAP(BEZIER(S1)([topProfileRigth,topProfileRigthBack]))(domains.ledgeDomain)
			]);

	top = R([1,2])(PI/5.9)(top);
	top = T([0,1,2])([2.19*p,1.016*p,(hb+4*hl+0.0065+0.011)*p])(top);
	
	var cover = STRUCT([
			TRIANGLE_DOMAIN(1,[[2.239*p,1.001*p,(hb+4*hl+0.0685)*p],[2.239*p,2.459*p,(hb+4*hl+0.0685)*p],[2*p,1.001*p,(hb+4*hl+0.0685)*p]]),
			TRIANGLE_DOMAIN(1,[[2.239*p,2.459*p,(hb+4*hl+0.0685)*p],[2*p,1.001*p,(hb+4*hl+0.0685)*p],[2*p,2.459*p,(hb+4*hl+0.0685)*p]]),
			TRIANGLE_DOMAIN(1,[[2.190*p,1.001*p,(hb+4*hl+0.0685)*p],[2.190*p,2.459*p,(hb+4*hl+0.0685)*p],[2.190*p,1.73*p,(hb+0.7)*p]]),

			TRIANGLE_DOMAIN(1,[[2.190*p,1.048*p,(hb+4*hl+0.0065)*p],[2.190*p,2.410*p,(hb+4*hl+0.0065)*p],[2*p,1.048*p,(hb+4*hl+0.0065)*p]]),
			TRIANGLE_DOMAIN(1,[[2.190*p,2.410*p,(hb+4*hl+0.0065)*p],[2*p,1.048*p,(hb+4*hl+0.0065)*p],[2*p,2.410*p,(hb+4*hl+0.0065)*p]]),
		
		]);


	return (STRUCT([
				bottom,
				cover,
				top,
				T([1])([3.460*p])(S([1])([-1])(top)),
				])
		).color(colors.hue);

}


function colums(){

	// Get proportion
	var p = scale.proportion || 1;

	// height foundation steps
	var h1 = 0.16;
	var h2 = 0.08885;
	var hs = 0.01777;

	// height building
	var hb = 0.795+h1+h2;
	var hc = 0.745;

	var base = CUBOID([0.11*p,0.11*p,(hs-0.2*hs)*p]);

	var top = SIMPLEX_GRID([[-0.008*p,0.096*p],[-0.008*p,0.096*p],[-(hc-0.003)*p,0.003*p]]);

	var profile = NUBS(S0)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,27,27])(
						[[(0.055-0.002)*p,	0,	(hs-0.2*hs)*p],
						[		0.055*p,	0,	(hs-0.2*hs+0.005)*p],
						[ (0.055-0.005)*p,	0,	(hs-0.2*hs+0.010)*p], [ (0.055-0.005)*p,	0,	(hs-0.2*hs+0.010)*p],
						[ (0.055-0.005)*p,	0,	(hs-0.2*hs+0.012)*p], [ (0.055-0.005)*p,	0,	(hs-0.2*hs+0.012)*p],
						[ (0.055-0.009)*p,	0,	(hs-0.2*hs+0.017)*p],
						[ (0.055-0.006)*p,	0,	(hs-0.2*hs+0.022)*p], [ (0.055-0.006)*p,	0,	(hs-0.2*hs+0.022)*p],
						[ (0.055-0.006)*p,	0,	(hs-0.2*hs+0.024)*p], [ (0.055-0.006)*p,	0,	(hs-0.2*hs+0.024)*p],
						[ (0.055-0.005)*p,	0,	(hs-0.2*hs+0.029)*p],
						[ (0.055-0.009)*p,	0,	(hs-0.2*hs+0.034)*p], [ (0.055-0.009)*p,	0,	(hs-0.2*hs+0.034)*p],
						[ (0.055-0.009)*p,	0,	(hs-0.2*hs+0.036)*p], [ (0.055-0.009)*p,	0,	(hs-0.2*hs+0.036)*p],
						[ (0.055-0.012)*p,	0,	(hs-0.2*hs+0.036)*p],
						[ (0.055-0.014)*p,	0,	(hc/1.7)*p], //18
						[ (0.055-0.018-0.004)*p,	0,	(hc-0.022)*p], //18
						[ (0.055-0.018-0.004)*p,	0,	(hc-0.017)*p],
						[ (0.055-0.014-0.004)*p,	0,	(hc-0.017)*p], [ (0.055-0.014-0.004)*p,	0,	(hc-0.017)*p],
						[ (0.055-0.014-0.004)*p,	0,	(hc-0.015)*p], [ (0.055-0.014-0.004)*p,	0,	(hc-0.015)*p],
						[ (0.055-0.006-0.004)*p,	0,	(hc-0.015)*p],						
						[ (0.055-0.006-0.004)*p,	0,	(hc-0.008)*p], [ (0.055-0.006-0.004)*p,	0,	(hc-0.008)*p],
						[ 		(0.055-0.004)*p,	0,	(hc-0.004)*p],
						[ (0.055-0.004-0.004)*p,	0,	(hc)*p]
						]);


	var profile = ROTATIONAL_SURFACE(profile);
	var surface = MAP(profile)(domains.columnDomain);

	surface.translate([0,1],[0.055*p,0.055*p]);


	//
	// Capital
	//


	var capitalControls = function(raggioMax) { 
		raggioMax = raggioMax || 0.8;
		var controlPoints = [];

		var i = 0;
		var angolo = PI/4;

		for (i = 0; i < 24; i++) {
			controlPoints.push( [raggioMax * ( COS(i*angolo) + i*SIN(i*angolo)  ), raggioMax * ( SIN(i*angolo) - i*COS(i*angolo)  ), 0] );
		}

		return controlPoints;
	};
	

	var generateS0Knots = function(cardP, gradoC) {
		var knotsC = cardP + gradoC + 1;
		var knots = [0,0,0];
		for(var i = 0; i < (knotsC - 3 - 3); i++) {
			knots.push(i+1);
		}

		knots.push(i+1);
		knots.push(i+1);
		knots.push(i+1);

		return knots;
	};


	var prof1 = NUBS(S1)(2)(generateS0Knots(24,2))(capitalControls());

	var prof2 = NUBS(S0)(2)(generateS0Knots(8,2))([[0.015,0,0],[0.01,0,0.001],[0,0,0.15],
		[0.015,0,0.29],
		[0.02,0,0.3],[0.025,0,0.29],[0.03,0,0.001],[0.025,0,0]]);

	var spiral = MAP(PROFILEPROD_SURFACE([prof2,prof1]))(domains.spiralDomain);

	// center
	var spiralCenter = NUBS(S0)(2)(generateS0Knots(4,2))([[-0.015*p,0,0],[-0.005*p,0,0.015*p],[-0.005*p,0,0.03*p],[0,0,0.03*p]]);
	spiralCenter = MAP(ROTATIONAL_SURFACE(spiralCenter))(domains.spiralCenterDomain); 

	// tail
	var lengthCapital1 = NUBS(S0)(2)(generateS0Knots(24,2))(
			AA(function (elem) { return [elem[0]*0.025,elem[1]*0.025,elem[2]*0.025];})(capitalControls())
		);
	var lengthCapital2 = NUBS(S0)(2)(generateS0Knots(24,2))( 
			AA(function (elem) { return [elem[0]*0.021,elem[1]*0.021,elem[2]*0.021-0.01];})(capitalControls())
		);
	var lengthCapital3 = NUBS(S0)(2)(generateS0Knots(24,2))( 
			AA(function (elem) { return [elem[0]*0.020,elem[1]*0.020,elem[2]*0.020-0.6];})(capitalControls())
		);

	var lengthCapital = BEZIER(S1)([lengthCapital1,lengthCapital2,lengthCapital3]);
	lengthCapital = MAP(lengthCapital)(domains.depthCapitalDomain); 


	// center piece

	prof1 = NUBS(S0)(2)(generateS0Knots(4,2))([
			[0,0,0],[0.0105*p,0,-0.002*p],[0.0095*p,0,0.0115*p],[0,0,0.01*p]
		]);

	prof2 = NUBS(S0)(2)(generateS0Knots(4,2))([
			[0,0.05*p,0],[0.0105*p,0.06*p,-0.002*p],[0.0095*p,0.06*p,0.0115*p],[0,0.06*p,0.01*p]
		]);

	var centerCapital = MAP(BEZIER(S1)([prof2,prof1]))(domains.centerCapitalDomain);

	centerCapital.translate([0,1,2],[0.090*p,0.025*p,(hc-0.018)*p]);


	var capital = STRUCT([
			spiral,
			spiralCenter.translate([0,1],[-0.009,0.015]),
			lengthCapital,
		]);

	capital.rotate([0,2],[PI/2]);
	capital.rotate([1,2],[-PI/12]);
	capital.scale([0,1,2],[0.5,0.5,0.5]);
	var capital2 = S([0])([-1])(capital);
	capital.translate([0,1,2],[0.085*p,0.090*p,(hc-0.028)*p]);
	capital2.translate([0,1,2],[0.025*p,0.090*p,(hc-0.028)*p]);
	var capital3 = S([1])([-1])(capital2);
	capital3.translate([1],[0.11*p]);
	var capital4 = S([1])([-1])(capital);
	capital4.translate([1],[0.11*p]);

	var singleColumn = STRUCT([
			base,
			top,
			surface,
			capital,
			capital2,
			capital3,
			capital4,
			centerCapital,
			(S([0])([-1])(centerCapital)).translate([0],[0.11*p]),
		]);

	return (STRUCT([
				singleColumn.translate([0,1,2],[2.085*p,1.05*p,(h1+h2+10*hs)*p]),
				T([1])([0.243*p])(singleColumn),
				T([1])([0.486*p])(singleColumn),
				T([1])([0.764*p])(singleColumn),
				T([1])([1.007*p])(singleColumn),
				T([1])([1.25*p])(singleColumn)
			])).color(colors.hue);

}


function guttae(){

	// Get proportion
	var p = scale.proportion || 1;

	// height foundation steps
	var h1 = 0.16;
	var h2 = 0.08885;
	var hs = 0.01777;

	// height building
	var hb = 0.795+h1+h2;
	var hc = 0.745;

	// height ledge hl*2
	var hl = (hb-hc-10*hs)/2;

	// Guttae

	var gutta = STRUCT([
			SIMPLEX_GRID([[0.029*p],[0.022*p],[-0.018*p, 0.004*p]]),
			SIMPLEX_GRID([[0.028*p], [-0.001*p,0.020*p], [0.018*p]])
		]);

	var guttaBack = S([0])([-1])(gutta);

	var guttaLateral = R([0,1])(-PI/2)(gutta);

	var guttaeTympanum = STRUCT([
			// oblique tympanum drops
			T([0,1,2])([2.205*p,1.052*p,(hb+4*hl+0.0715)*p])(R([1,2])(PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.103*p,(hb+4*hl+0.1015)*p])(R([1,2])(PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.154*p,(hb+4*hl+0.1315)*p])(R([1,2])(PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.205*p,(hb+4*hl+0.1615)*p])(R([1,2])(PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.256*p,(hb+4*hl+0.1915)*p])(R([1,2])(PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.307*p,(hb+4*hl+0.2215)*p])(R([1,2])(PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.358*p,(hb+4*hl+0.2515)*p])(R([1,2])(PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.409*p,(hb+4*hl+0.2815)*p])(R([1,2])(PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.460*p,(hb+4*hl+0.3115)*p])(R([1,2])(PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.511*p,(hb+4*hl+0.3415)*p])(R([1,2])(PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.562*p,(hb+4*hl+0.3715)*p])(R([1,2])(PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.613*p,(hb+4*hl+0.4015)*p])(R([1,2])(PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.664*p,(hb+4*hl+0.4315)*p])(R([1,2])(PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.715*p,(hb+4*hl+0.462)*p])(R([1,2])(PI/5.9)(gutta)),

			T([0,1,2])([2.205*p,1.721*p,(hb+4*hl+0.4655)*p])(R([1,2])(PI/5.9)(gutta)), // center
			T([0,1,2])([2.205*p,1.72075*p,(hb+4*hl+0.474)*p])(gutta), // center
			T([0,1,2])([2.205*p,1.7205*p,(hb+4*hl+0.4764)*p])(R([1,2])(-PI/5.9)(gutta)), // center

			T([0,1,2])([2.205*p,1.7265*p,(hb+4*hl+0.473)*p])(R([1,2])(-PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.777*p,(hb+4*hl+0.443)*p])(R([1,2])(-PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.828*p,(hb+4*hl+0.413)*p])(R([1,2])(-PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.879*p,(hb+4*hl+0.383)*p])(R([1,2])(-PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.930*p,(hb+4*hl+0.353)*p])(R([1,2])(-PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,1.981*p,(hb+4*hl+0.323)*p])(R([1,2])(-PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,2.032*p,(hb+4*hl+0.293)*p])(R([1,2])(-PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,2.083*p,(hb+4*hl+0.263)*p])(R([1,2])(-PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,2.134*p,(hb+4*hl+0.233)*p])(R([1,2])(-PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,2.185*p,(hb+4*hl+0.203)*p])(R([1,2])(-PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,2.236*p,(hb+4*hl+0.173)*p])(R([1,2])(-PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,2.287*p,(hb+4*hl+0.143)*p])(R([1,2])(-PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,2.338*p,(hb+4*hl+0.113)*p])(R([1,2])(-PI/5.9)(gutta)),
			T([0,1,2])([2.205*p,2.389*p,(hb+4*hl+0.083)*p])(R([1,2])(-PI/5.9)(gutta)),


			// orizontal tympanum drops
			T([0,1,2])([2.205*p,1.052*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.102*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.152*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.202*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.252*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.302*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.352*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.402*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.452*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.502*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.552*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.602*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.652*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.702*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.752*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.802*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.852*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.902*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,1.952*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,2.002*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,2.052*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,2.102*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,2.152*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,2.202*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,2.252*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,2.302*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,2.352*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.205*p,2.402*p,(hb+4*hl+0.0345)*p])(gutta),
		]);

	var guttaeLateralLeft = STRUCT([
			T([0,1,2])([0.405*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([0.455*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([0.505*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([0.555*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([0.605*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([0.655*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([0.705*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([0.755*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([0.805*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([0.855*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([0.905*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([0.955*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.005*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.055*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.105*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.155*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.205*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.255*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.305*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.355*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.405*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.455*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.505*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.555*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.605*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.655*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.705*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.755*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.805*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.855*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.905*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([1.955*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([2.005*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([2.055*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([2.105*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
			T([0,1,2])([2.155*p,0.400*p,(hb+4*hl+0.0345)*p])(guttaLateral),
		]);

	var guttaeOrizontal = STRUCT([

			// front left
			T([0,1,2])([2.16*p,0.405*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,0.455*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,0.505*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,0.555*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,0.605*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,0.655*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,0.705*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,0.755*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,0.805*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,0.855*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,0.905*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,0.955*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,1.005*p,(hb+4*hl+0.0345)*p])(gutta),

			// front right
			T([0,1,2])([2.16*p,(0.405+2.03)*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,(0.455+2.03)*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,(0.505+2.03)*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,(0.555+2.03)*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,(0.605+2.03)*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,(0.655+2.03)*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,(0.705+2.03)*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,(0.755+2.03)*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,(0.805+2.03)*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,(0.855+2.03)*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,(0.905+2.03)*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,(0.955+2.03)*p,(hb+4*hl+0.0345)*p])(gutta),
			T([0,1,2])([2.16*p,(1.005+2.03)*p,(hb+4*hl+0.0345)*p])(gutta),

			// back
			T([0,1,2])([0.401*p,0.405*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,0.455*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,0.505*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,0.555*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,0.605*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,0.655*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,0.705*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,0.755*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,0.805*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,0.855*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,0.905*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,0.955*p,(hb+4*hl+0.0345)*p])(guttaBack),

			T([0,1,2])([0.401*p,1.005*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.055*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.105*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.155*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.205*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.255*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.305*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.355*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.405*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.455*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.505*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.555*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.605*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.655*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.705*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.755*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.805*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.855*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.905*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,1.955*p,(hb+4*hl+0.0345)*p])(guttaBack),

			T([0,1,2])([0.401*p,2.005*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.055*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.105*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.155*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.205*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.255*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.305*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.355*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.405*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.455*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.505*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.555*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.605*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.655*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.705*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.755*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.805*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.855*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.905*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,2.955*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,3.005*p,(hb+4*hl+0.0345)*p])(guttaBack),
			T([0,1,2])([0.401*p,3.055*p,(hb+4*hl+0.0345)*p])(guttaBack),

		]);

	return (STRUCT([
			guttaeTympanum,
			guttaeLateralLeft,
			T([1])([3.46*p])(S([1])([-1])(guttaeLateralLeft)),
			guttaeOrizontal
		])).color(colors.hue);
	
}


function buildingRoof(){

	// Get proportion
	var p = scale.proportion || 1;

	// height foundation steps
	var h1 = 0.16;
	var h2 = 0.08885;
	var hs = 0.01777;

	// height building
	var hb = 0.795+h1+h2;
	var hc = 0.745;

	// height ledge hl*2
	var hl = (hb-hc-10*hs)/2;

	function getRoof(p,controlPoints){
		return STRUCT([
					TRIANGLE_DOMAIN(1,[PROD([p,controlPoints[0]]),PROD([p,controlPoints[1]]),PROD([p,controlPoints[3]])]),
					TRIANGLE_DOMAIN(1,[PROD([p,controlPoints[1]]),PROD([p,controlPoints[3]]),PROD([p,controlPoints[2]])])
				]);
	}

	return (STRUCT([
				getRoof(p,[[2.25,0.973,hb+4*hl+0.0897],[2.25,1.73,hb+4*hl+0.5357], [1.28,1.73,hb+4*hl+0.5357], [1.28,0.973,hb+4*hl+0.0897]]),
				getRoof(p,[[2.25,1.73,hb+4*hl+0.5357], [2.25,2.486,hb+4*hl+0.0897], [1.28,2.486,hb+4*hl+0.0897],[1.28,1.73,hb+4*hl+0.5357]]),
				getRoof(p,[[2.205,0.355,hb+4*hl+0.0897], [2.205,0.973,hb+4*hl+0.0897], [1.28,1.73,hb+4*hl+0.5357], [1.28,1.05,hb+4*hl+0.5357]]),
				getRoof(p,[[2.205,2.486,hb+4*hl+0.0897],[2.205,3.105,hb+4*hl+0.0897], [1.28,2.41,hb+4*hl+0.5357],[1.28,1.73,hb+4*hl+0.5357]]),
				TRIANGLE_DOMAIN(1,[[2.205*p,0.355*p,(hb+4*hl+0.0897)*p],[1.28*p,1.05*p,(hb+4*hl+0.5357)*p],[0.355*p,0.355*p,(hb+4*hl+0.0897)*p]]),
				TRIANGLE_DOMAIN(1,[[2.205*p,3.105*p,(hb+4*hl+0.0897)*p],[1.28*p,2.41*p,(hb+4*hl+0.5357)*p],[0.355*p,3.105*p,(hb+4*hl+0.0897)*p]]),
				getRoof(p,[[0.355,0.355,hb+4*hl+0.0897], [0.355,3.105,hb+4*hl+0.0897], [1.28,2.41,hb+4*hl+0.5357], [1.28,1.05,hb+4*hl+0.5357]]),
			])
		).color(colors.roof);

}


// finestre porte
function buildingComponents(){

	// Get proportion
	var p = scale.proportion || 1;

	// height foundation steps
	var h1 = 0.16;
	var h2 = 0.08885;
	var hs = 0.01777;
	// height building
	var hb = 0.795+h1+h2;
	var hc = 0.745;


	// Control points door frame
	var controlPoints = [[0,0,0],
				[0.04*p,0,0],[0.04*p,0,0],
				[0.04*p,0,0.010*p],
				[0.045*p,0,0.010*p],[0.045*p,0,0.010*p],
				[0.045*p,0,0.020*p],
				[0.050*p,0,0.020*p],[0.050*p,0,0.020*p],
				[0.0555*p,0,0.020*p],
				[0.0555*p,0,0.030*p],[0.0555*p,0,0.030*p],
				[0,0,0.030*p]];

	var doorFrameLeftProfile = NUBS(S0)(2)([0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11])(controlPoints);

	var doorFrameMiddleProfile = NUBS(S0)(2)([0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11])(
			AA(function (elem) { return [elem[0], elem[1]+0.123*p, elem[2]];})(controlPoints)
		);

	// top orizontal frame
	var doorFrameTop = BEZIER(S1)([doorFrameLeftProfile,doorFrameMiddleProfile]);
	doorFrameTop = MAP(doorFrameTop)(domains.depthCapitalDomain); // TODO
	doorFrameTop.translate([2],[(2/3*hc)*p]);

	// lateral vertical frame
	doorFrameMiddleProfile = NUBS(S0)(2)([0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11])(
			AA(function (elem) { return [elem[0], elem[1]+(2/3*hc+0.03)*p, elem[2]];})(controlPoints)
		);

	var doorFrameLateralProfile = BEZIER(S1)([doorFrameLeftProfile,doorFrameMiddleProfile]);
	doorFrameLateralProfile = MAP(doorFrameLateralProfile)(domains.depthCapitalDomain); // TODO

	var doorFrameLateral = R([1,2])(PI/2)(doorFrameLateralProfile);
	doorFrameLateral.translate([1],[0.03*p]);


	// Top frieze
	var controlPoints = [[0,0,0],
				[0.060*p,0,0],[0.060*p,0,0],
				[0.065*p,0,0.005*p],
				[0.060*p,0,0.010*p],[0.060*p,0,0.010*p],
				[0.065*p,0,0.020*p],[0.065*p,0,0.020*p],
				[0.070*p,0,0.020*p],[0.070*p,0,0.020*p],
				[0.075*p,0,0.030*p],[0.075*p,0,0.030*p],
				[0,0,0.030*p]]; //13

	var doorTopMiddleProfile = NUBS(S0)(2)([0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11])(
			AA(function (elem) { return [elem[0], elem[1]+0.150*p, elem[2]];})(controlPoints)
		);

	var doorTopLeftProfile = NUBS(S0)(2)([0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11])(
			AA(function (elem) { return [elem[0], 0.055*p-elem[0], elem[2]];})(controlPoints)
		);

	var doorFriezeTop = BEZIER(S1)([doorTopLeftProfile,doorTopMiddleProfile]);
	doorFriezeTop = MAP(doorFriezeTop)(domains.depthCapitalDomain); // TODO
	doorFriezeTop.translate([1,2],[-0.04,(2/3*hc+0.03)*p]);

	//angle top frieze
	var doorTopAngleProfile = NUBS(S0)(2)([0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11])(
			AA(function (elem) { return [elem[0]-0.1*p, 0.055*p-elem[0], elem[2]];})(controlPoints)
		);

	var doorAngleTop = BEZIER(S1)([doorTopLeftProfile,doorTopAngleProfile]);
	doorAngleTop = MAP(doorAngleTop)(domains.depthCapitalDomain); // TODO
	doorAngleTop.translate([1,2],[-0.05,(2/3*hc+0.03)*p]);

	// central lodge's door
	var doorFrame = STRUCT([
			doorFrameTop,
			doorFrameLateral,
			doorFriezeTop, doorAngleTop,
			COLOR(colors.roof)(SIMPLEX_GRID([[0.0186*p],[-0.03*p,0.0186*p],[2/3*hc*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.0100*p],[-0.0486*p,0.1084*p],[2/3*hc*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.0186*p],[-0.0486*p,0.1084*p],[-(2/3*hc-0.0186)*p,0.0186*p]])),

			COLOR(colors.roof)(SIMPLEX_GRID([[0.0186*p],[-0.0486*p,0.1084*p],[-(2/12*hc-0.0186)*p,0.0186*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.0186*p],[-0.0486*p,0.1084*p],[-(2/4*hc-0.0186)*p,0.0186*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.0186*p],[-0.0486*p,0.1084*p],[-(2/6*hc-0.0186)*p,0.0186*p]])),

			COLOR(colors.roof)(SIMPLEX_GRID([[0.0186*p],[-0.0486*p,0.1084*p],[0.0186*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.0186*p],[-0.1084*p,0.0146*p],[2/3*hc*p]])),
		]);

	doorFrame.translate([0,1,2],[1.68*p,1.607*p,(h1+h2+10*hs)*p]);

	// lateral door lodge
	var lateralLodgeDoor = STRUCT([
			COLOR(colors.roof)(SIMPLEX_GRID([[0.1*p],[0.0186*p],[(0.23)*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.0186*p],[0.0235*p],[(0.23)*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[-0.0814*p, 0.0186*p],[0.0235*p],[(0.23)*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[-0.0186*p, 0.0628*p],[0.0235*p],[-(0.23-0.0186)*p,0.0186*p]])),
		]);

	lateralLodgeDoor.translate([0,1,2],[1.87*p,1.07*p,(h1+h2+10*hs)*p]);


	// lateral lodge windows
	var lodgeWindow = STRUCT([

			COLOR(colors.white)(SIMPLEX_GRID([[0.002*p],[0.100*p],[(2/3*hc-0.23)*p]])),
			COLOR(colors.windows)(SIMPLEX_GRID([[-0.004*p,0.002*p],[0.100*p],[(2/3*hc-0.23)*p]])),

			COLOR(colors.roof)(SIMPLEX_GRID([[0.008*p],[0.008*p],[(2/3*hc-0.23)*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.008*p],[-0.05*p,0.008*p],[(2/3*hc-0.23)*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.008*p],[0.100*p],[(0.008)*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.008*p],[-0.092*p,0.008*p],[(2/3*hc-0.23)*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.008*p],[0.100*p],[-(2/3*hc-0.23-0.008)*p,0.008*p]])),

			COLOR(colors.hue)(SIMPLEX_GRID([[0.012*p],[0.100*p],[0]])),
			COLOR(colors.hue)(SIMPLEX_GRID([[0.012*p],[(2/3*hc-0.23)*p],[0]]).rotate([1,2],[PI/2])),
			COLOR(colors.hue)(SIMPLEX_GRID([[0.012*p],[0.100*p],[0]]).translate([2],[(2/3*hc-0.23)*p])),
			COLOR(colors.hue)(SIMPLEX_GRID([[0.012*p],[(2/3*hc-0.23)*p],[0]]).rotate([1,2],[PI/2]).translate([1],[0.100*p])),

			POLYLINE([[0,-0.010*p,0],[0.020*p,-0.010*p,0],[0.020*p,0.110*p,0],[0,0.110*p,0]]),
			POLYLINE([[0,-0.010*p,0.015*p],[0.020*p,-0.010*p,0.015*p],[0.020*p,0.110*p,0.015*p],[0,0.110*p,0.015*p]]),
			POLYLINE([[0,-0.010*p,0.030*p],[0.020*p,-0.010*p,0.030*p],[0.020*p,0.110*p,0.030*p],[0,0.110*p,0.030*p]]),
			POLYLINE([[0,-0.010*p,0.045*p],[0.020*p,-0.010*p,0.045*p],[0.020*p,0.110*p,0.045*p],[0,0.110*p,0.045*p]]),
			POLYLINE([[0,-0.010*p,0.060*p],[0.020*p,-0.010*p,0.060*p],[0.020*p,0.110*p,0.060*p],[0,0.110*p,0.060*p]]),
			POLYLINE([[0,-0.010*p,0.075*p],[0.020*p,-0.010*p,0.075*p],[0.020*p,0.110*p,0.075*p],[0,0.110*p,0.075*p]]),
			POLYLINE([[0,-0.010*p,0.090*p],[0.020*p,-0.010*p,0.090*p],[0.020*p,0.110*p,0.090*p],[0,0.110*p,0.090*p]]),
			POLYLINE([[0,-0.010*p,0.105*p],[0.020*p,-0.010*p,0.105*p],[0.020*p,0.110*p,0.105*p],[0,0.110*p,0.105*p]]),
			POLYLINE([[0,-0.010*p,0.120*p],[0.020*p,-0.010*p,0.120*p],[0.020*p,0.110*p,0.120*p],[0,0.110*p,0.120*p]]),
			POLYLINE([[0,-0.010*p,0.135*p],[0.020*p,-0.010*p,0.135*p],[0.020*p,0.110*p,0.135*p],[0,0.110*p,0.135*p]]),
			POLYLINE([[0,-0.010*p,0.150*p],[0.020*p,-0.010*p,0.150*p],[0.020*p,0.110*p,0.150*p],[0,0.110*p,0.150*p]]),
			POLYLINE([[0,-0.010*p,0.165*p],[0.020*p,-0.010*p,0.165*p],[0.020*p,0.110*p,0.165*p],[0,0.110*p,0.160*p]]),
			POLYLINE([[0,-0.010*p,0.180*p],[0.020*p,-0.010*p,0.180*p],[0.020*p,0.110*p,0.180*p],[0,0.110*p,0.180*p]]),
			POLYLINE([[0,-0.010*p,0.195*p],[0.020*p,-0.010*p,0.195*p],[0.020*p,0.110*p,0.195*p],[0,0.110*p,0.190*p]]),
			POLYLINE([[0,-0.010*p,0.210*p],[0.020*p,-0.010*p,0.210*p],[0.020*p,0.110*p,0.210*p],[0,0.110*p,0.210*p]]),
			POLYLINE([[0,-0.010*p,0.225*p],[0.020*p,-0.010*p,0.225*p],[0.020*p,0.110*p,0.225*p],[0,0.110*p,0.225*p]]),
			POLYLINE([[0,-0.010*p,0.240*p],[0.020*p,-0.010*p,0.240*p],[0.020*p,0.110*p,0.240*p],[0,0.110*p,0.240*p]]),
			POLYLINE([[0,-0.010*p,0.255*p],[0.020*p,-0.010*p,0.255*p],[0.020*p,0.110*p,0.255*p],[0,0.110*p,0.255*p]]),
			POLYLINE([[0,-0.010*p,0.270*p],[0.020*p,-0.010*p,0.270*p],[0.020*p,0.110*p,0.270*p],[0,0.110*p,0.270*p]]),

			POLYLINE([[0,0,0.280*p],[0.020*p,0,0.280*p],[0.020*p,0,-0.010*p],[0,0,-0.010*p]]),
			POLYLINE([[0,0.015*p,0.280*p],[0.020*p,0.015*p,0.280*p],[0.020*p,0.015*p,-0.010*p],[0,0.015*p,-0.010*p]]),
			POLYLINE([[0,0.030*p,0.280*p],[0.020*p,0.030*p,0.280*p],[0.020*p,0.030*p,-0.010*p],[0,0.030*p,-0.010*p]]),
			POLYLINE([[0,0.045*p,0.280*p],[0.020*p,0.045*p,0.280*p],[0.020*p,0.045*p,-0.010*p],[0,0.045*p,-0.010*p]]),
			POLYLINE([[0,0.060*p,0.280*p],[0.020*p,0.060*p,0.280*p],[0.020*p,0.060*p,-0.010*p],[0,0.060*p,-0.010*p]]),
			POLYLINE([[0,0.075*p,0.280*p],[0.020*p,0.075*p,0.280*p],[0.020*p,0.075*p,-0.010*p],[0,0.075*p,-0.010*p]]),
			POLYLINE([[0,0.090*p,0.280*p],[0.020*p,0.090*p,0.280*p],[0.020*p,0.090*p,-0.010*p],[0,0.090*p,-0.010*p]]),
			POLYLINE([[0,0.105*p,0.280*p],[0.020*p,0.105*p,0.280*p],[0.020*p,0.105*p,-0.010*p],[0,0.105*p,-0.010*p]]),


		]);

	lodgeWindow.translate([0,1,2],[(1.7-0.012)*p,1.15*p,(h1+h2+10*hs+0.23)*p]);

	// superior 
	var singleWindow = STRUCT([
			COLOR(colors.roof)(SIMPLEX_GRID([[-0.005*p,0.0025*p],[-0.010*p, 0.148*p],[-(0.010)*p,(hb-hc-10*hs-0.01)*p]])),
			COLOR(colors.black)(SIMPLEX_GRID([[-0.005*p,0.00265*p],[-0.084*p, 0.001*p],[-(0.010)*p,(hb-hc-10*hs-0.01)*p]])),
			COLOR(colors.black)(SIMPLEX_GRID([[-0.005*p,0.00265*p],[-0.035*p, 0.0005*p],[-(0.010)*p,(hb-hc-10*hs-0.01)*p]])),
			COLOR(colors.black)(SIMPLEX_GRID([[-0.005*p,0.00265*p],[-0.060*p, 0.0005*p],[-(0.010)*p,(hb-hc-10*hs-0.01)*p]])),
			COLOR(colors.black)(SIMPLEX_GRID([[-0.005*p,0.00265*p],[-0.109*p, 0.0005*p],[-(0.010)*p,(hb-hc-10*hs-0.01)*p]])),
			COLOR(colors.black)(SIMPLEX_GRID([[-0.005*p,0.00265*p],[-0.134*p, 0.0005*p],[-(0.010)*p,(hb-hc-10*hs-0.01)*p]])),

			COLOR(colors.roof)(SIMPLEX_GRID([[-0.005*p,0.005*p],[-0.0075*p, 0.035*p],[-(0.010+hb-hc-10*hs-0.105)*p, 0.005*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[-0.005*p,0.005*p],[-0.0075*p, 0.035*p],[-(0.010+hb-hc-10*hs-0.035)*p, 0.005*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[-0.005*p,0.005*p],[-0.125*p, 0.035*p],[-(0.010+hb-hc-10*hs-0.105)*p, 0.005*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[-0.005*p,0.005*p],[-0.125*p, 0.035*p],[-(0.010+hb-hc-10*hs-0.035)*p, 0.005*p]])),
			COLOR(colors.hue)(SIMPLEX_GRID([[0.005*p],[0.168*p],[(0.010)*p]])),
		]);

	singleWindow.translate([1],[-0.01*p]);

	// middle windows
	var middleWindow = STRUCT([
			COLOR(colors.roof)(SIMPLEX_GRID([[0.0025*p],[-0.0025*p, 0.148*p],[(hc/2-0.040)*p]])),
			COLOR(colors.black)(SIMPLEX_GRID([[0.00265*p],[-0.0763*p, 0.001*p],[(hc/2-0.040)*p]])),
			COLOR(colors.black)(SIMPLEX_GRID([[0.00265*p],[-0.0271*p, 0.0005*p],[(hc/2-0.040)*p]])),
			COLOR(colors.black)(SIMPLEX_GRID([[0.00265*p],[-0.0517*p, 0.0005*p],[(hc/2-0.040)*p]])),
			COLOR(colors.black)(SIMPLEX_GRID([[0.00265*p],[-0.1009*p, 0.0005*p],[(hc/2-0.040)*p]])),
			COLOR(colors.black)(SIMPLEX_GRID([[0.00265*p],[-0.1255*p, 0.0005*p],[(hc/2-0.040)*p]])),

			COLOR(colors.roof)(SIMPLEX_GRID([[0.005*p],[0.035*p],			[-0.020*p,0.005*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.005*p],[0.035*p],			[-0.135*p,0.005*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.005*p],[0.035*p],			[-0.310*p,0.005*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.005*p],[-0.118*p, 0.035*p],	[-0.020*p,0.005*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.005*p],[-0.118*p, 0.035*p],	[-0.135*p,0.005*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.005*p],[-0.118*p, 0.035*p],	[-0.310*p,0.005*p]])),

		]);

	middleWindow.translate([1],[-0.0025*p]);


	// little window below
	var littleWindow = STRUCT([

			COLOR(colors.white)(SIMPLEX_GRID([[0.002*p],[0.148*p],[4*hs*p]])),
			COLOR(colors.windows)(SIMPLEX_GRID([[-0.004*p,0.002*p],[0.148*p],[4*hs*p]])),

			COLOR(colors.roof)(SIMPLEX_GRID([[0.008*p],[0.008*p],[(4*hs)*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.008*p],[-0.07*p,0.008*p],[(4*hs)*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.008*p],[0.148*p],[(0.008)*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.008*p],[-0.140*p,0.008*p],[(4*hs)*p]])),
			COLOR(colors.roof)(SIMPLEX_GRID([[0.008*p],[0.148*p],[-(4*hs-0.008)*p,0.008*p]])),

			COLOR(colors.hue)(SIMPLEX_GRID([[0.012*p],[0.148*p],[0]])),
			COLOR(colors.hue)(SIMPLEX_GRID([[0.012*p],[4*hs*p],[0]]).rotate([1,2],[PI/2])),
			COLOR(colors.hue)(SIMPLEX_GRID([[0.012*p],[0.148*p],[0]]).translate([2],[4*hs*p])),
			COLOR(colors.hue)(SIMPLEX_GRID([[0.012*p],[4*hs*p],[0]]).rotate([1,2],[PI/2]).translate([1],[0.148*p])),

			POLYLINE([[0.010*p,0,4*hs/2*p],[0.010*p,0.148*p,4*hs/2*p]]),
			POLYLINE([[0.010*p,0,4*hs/4*p],[0.010*p,0.148*p,4*hs/4*p]]),
			POLYLINE([[0.010*p,0,4*hs/4*3*p],[0.010*p,0.148*p,4*hs/4*3*p]]),

			POLYLINE([[0.010*p,0.025*p,0],[0.010*p,0.025*p,4*hs*p]]),
			POLYLINE([[0.010*p,0.050*p,0],[0.010*p,0.050*p,4*hs*p]]),
			POLYLINE([[0.010*p,0.075*p,0],[0.010*p,0.075*p,4*hs*p]]),
			POLYLINE([[0.010*p,0.100*p,0],[0.010*p,0.100*p,4*hs*p]]),
			POLYLINE([[0.010*p,0.125*p,0],[0.010*p,0.125*p,4*hs*p]]),	
		]);

	littleWindow.translate([0],[-0.012*p]);


	var height = 12*hs;

	// door under stairs
	var doorUnderStair = STRUCT([


			COLOR(colors.black)(SIMPLEX_GRID([[0.002*p],[0.160*p],[height*p]])),
			COLOR(colors.windows)(SIMPLEX_GRID([[-0.004*p,0.002*p],[0.160*p],[height*p]]).boundary()), // TODO

			COLOR(colors.black)(SIMPLEX_GRID([[0.008*p],[0.008*p],[(height)*p]])),
			COLOR(colors.black)(SIMPLEX_GRID([[0.008*p],[0.160*p],[(0.008)*p]])),
			COLOR(colors.black)(SIMPLEX_GRID([[0.008*p],[-0.152*p,0.008*p],[(height)*p]])),
			COLOR(colors.black)(SIMPLEX_GRID([[0.008*p],[0.160*p],[-(height-0.008)*p,0.008*p]])),

			COLOR(colors.hue)(SIMPLEX_GRID([[0.020*p],[height*p],[0]]).rotate([1,2],[PI/2])),
			COLOR(colors.hue)(SIMPLEX_GRID([[0.020*p],[0.160*p],[0]]).translate([2],[height*p])),
			COLOR(colors.hue)(SIMPLEX_GRID([[0.020*p],[height*p],[0]]).rotate([1,2],[PI/2]).translate([1],[0.160*p])),
			COLOR(colors.hue)(SIMPLEX_GRID([[0.036*p],[0.160*p],[0]]).rotate([0,2],[-PI/2]).translate([0,2],[0.02*p,height*p])),

			POLYLINE([[0.007*p,0,height/2*p],[0.007*p,0.160*p,height/2*p]]),
			POLYLINE([[0.007*p,0,height/8*p],[0.007*p,0.160*p,height/8*p]]),
			POLYLINE([[0.007*p,0,height*7/8*p],[0.007*p,0.160*p,height*7/8*p]]),

			POLYLINE([[0.007*p,0,height*p],[0.007*p,0,0]]),
			POLYLINE([[0.007*p,0.020*p,height*p],[0.007*p,0.020*p,0]]),
			POLYLINE([[0.007*p,0.040*p,height*p],[0.007*p,0.040*p,0]]),
			POLYLINE([[0.007*p,0.060*p,height*p],[0.007*p,0.060*p,0]]),
			COLOR(colors.black)(SIMPLEX_GRID([[0.007*p],[-0.078*p,0.004*p],[(height)*p]])),
			COLOR(colors.black)(SIMPLEX_GRID([[0.007*p],[-0.078*p,0.020*p],[-(height/2-0.020)*p,(0.020)*p]])),			
			POLYLINE([[0.007*p,0.100*p,height*p],[0.007*p,0.100*p,0]]),
			POLYLINE([[0.007*p,0.120*p,height*p],[0.007*p,0.120*p,0]]),
			POLYLINE([[0.007*p,0.140*p,height*p],[0.007*p,0.140*p,0]]),

		]);

	doorUnderStair.translate([0,1],[2.68*p,0.70*p]);


	// struct with all left components
	var leftComponents = STRUCT([
			doorFrame,
			lateralLodgeDoor,
			lodgeWindow,
			doorUnderStair,

			// front windows
			T([0,1,2])([2.14*p,0.67*p,(h1+h2+hb-(hb-hc-10*hs+0.010))*p])(singleWindow),
			T([0,1,2])([2.14*p,0.67*p,(h1+h2+15*hs)*p])(middleWindow),
			T([0,1,2])([2.14*p,0.67*p,(h1+h2+3.5*hs)*p])(littleWindow),

			// lateral windowsx
			T([0,1,2])([0.692*p,0.42*p,(h1+h2+hb-(hb-hc-10*hs+0.010))*p])(R([0,1])(-PI/2)(singleWindow)),
			T([0,1,2])([0.692*p,0.42*p,(h1+h2+15*hs)*p])(R([0,1])(-PI/2)(middleWindow)),
			T([0,1,2])([0.692*p,0.42*p,(h1+h2+3.5*hs)*p])(R([0,1])(-PI/2)(littleWindow)),


			T([0,1,2])([1.22*p,0.42*p,(h1+h2+hb-(hb-hc-10*hs+0.010))*p])(R([0,1])(-PI/2)(singleWindow)),
			T([0,1,2])([1.22*p,0.42*p,(h1+h2+15*hs)*p])(R([0,1])(-PI/2)(middleWindow)),
			T([0,1,2])([1.22*p,0.42*p,(h1+h2+3.5*hs)*p])(R([0,1])(-PI/2)(littleWindow)),

			T([0,1,2])([1.822*p,0.42*p,(h1+h2+hb-(hb-hc-10*hs+0.010))*p])(R([0,1])(-PI/2)(singleWindow)),
			T([0,1,2])([1.822*p,0.42*p,(h1+h2+15*hs)*p])(R([0,1])(-PI/2)(middleWindow)),
			T([0,1,2])([1.822*p,0.42*p,(h1+h2+3.5*hs)*p])(R([0,1])(-PI/2)(littleWindow)),

			// back windows
			T([0,1,2])([0.42*p,0.7*p,(h1+h2+hb-(hb-hc-10*hs+0.010))*p])(S([0])([-1])(singleWindow)),
			T([0,1,2])([0.42*p,0.7*p,(h1+h2+15*hs)*p])(S([0])([-1])(middleWindow)),
			T([0,1,2])([0.42*p,0.7*p,(h1+h2+3.5*hs)*p])(S([0])([-1])(littleWindow)),

			T([0,1,2])([0.42*p,1.168*p,(h1+h2+hb-(hb-hc-10*hs+0.010))*p])(S([0])([-1])(singleWindow)),
			T([0,1,2])([0.42*p,1.168*p,(h1+h2+15*hs)*p])(S([0])([-1])(middleWindow)),
			T([0,1,2])([0.42*p,1.168*p,(h1+h2+3.5*hs)*p])(S([0])([-1])(littleWindow)),

			T([0,1,2])([0.42*p,1.436*p,(h1+h2+hb-(hb-hc-10*hs+0.010))*p])(S([0,1])([-1,0.9])(singleWindow)),
			T([0,1,2])([0.42*p,1.436*p,(h1+h2+15*hs)*p])(S([0,1,2])([-1,0.9,0.8])(middleWindow)),
			T([0,1,2])([0.42*p,1.436*p,(h1+h2+3.5*hs)*p])(S([0,1])([-1,0.67])(littleWindow)),


		]);

	

	// chimneys
	height= 1.22;

	function getCover(p,controlPoints){
		return STRUCT([
					TRIANGLE_DOMAIN(1,[PROD([p,controlPoints[0]]),PROD([p,controlPoints[1]]),PROD([p,controlPoints[3]])]),
					TRIANGLE_DOMAIN(1,[PROD([p,controlPoints[1]]),PROD([p,controlPoints[3]]),PROD([p,controlPoints[2]])])
				]);

	}

	var chimneyProfile1 = NUBS(S0)(2)([0, 0, 0, 1, 2,2,2])([[0.09*p,0.02*p,(height+0.05)*p],[0.09*p,0.02*p,(height+0.1)*p],[0.21*p,0.02*p,(height+0.1)*p],[0.21*p,0.02*p,(height+0.05)*p]]);
	var chimneyProfile2 = NUBS(S0)(2)([0, 0, 0, 1, 2,2,2])([[0.09*p,0.1*p,(height+0.05)*p],[0.09*p,0.1*p,(height+0.1)*p],[0.21*p,0.1*p,(height+0.1)*p],[0.21*p,0.1*p,(height+0.05)*p]]);

	var coverChimney = BEZIER(S1)([chimneyProfile1,chimneyProfile2]);
	coverChimney = MAP(coverChimney)(domains.depthCapitalDomain);

	var fakePoint = BEZIER(S0)([[0.195*p,0.02*p,(height+0.05)*p]]);
	var cover1 = BEZIER(S1)([chimneyProfile1,fakePoint]);
	cover1 = MAP(cover1)(domains.depthCapitalDomain);

	fakePoint = BEZIER(S0)([[0.195*p,0.1*p,(height+0.05)*p]]);
	var cover2 = BEZIER(S1)([chimneyProfile2,fakePoint]);
	cover2 = MAP(cover2)(domains.depthCapitalDomain);

	var bigChimney = STRUCT([
			(SIMPLEX_GRID([[0.26*p],[0.06*p],[(11*hs)*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.09*p,0.12*p],[-0.02*p,0.08*p],[(height+0.02)*p]])).color(colors.hue),
			(getCover(p,[[0,0,11*hs],[0.26,0,(11*hs)],[0.21,0.02,21*hs],[0.09,0.02,21*hs]])).color(colors.hue),
			(getCover(p,[[0.26,0,(11*hs)],[0.26,0.06,11*hs],[0.21,0.06,21*hs],[0.21,0.02,21*hs]])).color(colors.hue),
			(getCover(p,[[0,0,11*hs],[0.09,0.02,(21*hs)],[0.09,0.06,21*hs],[0,0.06,11*hs]])).color(colors.hue),

			(SIMPLEX_GRID([[-0.09*p,0.0075*p],[-0.02*p,0.08*p],[-(height)*p,0.045*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.1025*p, 0.005*p],[-0.02*p,0.08*p],[-(height)*p,0.045*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.1125*p, 0.005*p],[-0.02*p,0.08*p],[-(height)*p,0.045*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.1225*p, 0.005*p],[-0.02*p,0.08*p],[-(height)*p,0.045*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.1325*p, 0.005*p],[-0.02*p,0.08*p],[-(height)*p,0.045*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.1425*p, 0.005*p],[-0.02*p,0.08*p],[-(height)*p,0.045*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.1525*p, 0.005*p],[-0.02*p,0.08*p],[-(height)*p,0.045*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.1625*p, 0.005*p],[-0.02*p,0.08*p],[-(height)*p,0.045*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.1725*p, 0.005*p],[-0.02*p,0.08*p],[-(height)*p,0.045*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.1825*p, 0.005*p],[-0.02*p,0.08*p],[-(height)*p,0.045*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.1925*p, 0.005*p],[-0.02*p,0.08*p],[-(height)*p,0.045*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.2025*p,0.0075*p],[-0.02*p,0.08*p],[-(height)*p,0.045*p]])).color(colors.hue),

			(SIMPLEX_GRID([[-0.09*p,0.12*p],[-0.02*p,0.08*p],[-(height+0.045)*p,0.005*p]])).color(colors.hue),
			coverChimney.color(colors.hue),
			cover1.color(colors.hue),
			cover2.color(colors.hue),
		]);

	bigChimney.translate([0,1,2],[1.46*p,0.36*p,(h1+h2)*p]);

	chimneyProfile1 = NUBS(S0)(2)([0, 0, 0, 1, 2,2,2])([[0.07*p,0.03*p,(height+0.025)*p],[0.07*p,0.03*p,(height+0.06)*p],[0.14*p,0.03*p,(height+0.06)*p],[0.14*p,0.03*p,(height+0.025)*p]]);
	chimneyProfile2 = NUBS(S0)(2)([0, 0, 0, 1, 2,2,2])([[0.07*p,0.09*p,(height+0.025)*p],[0.07*p,0.09*p,(height+0.06)*p],[0.14*p,0.09*p,(height+0.06)*p],[0.14*p,0.09*p,(height+0.025)*p]]);

	coverChimney = BEZIER(S1)([chimneyProfile1,chimneyProfile2]);
	coverChimney = MAP(coverChimney)(domains.depthCapitalDomain);

	fakePoint = BEZIER(S0)([[0.105*p,0.03*p,(height+0.025)*p]]);
	cover1 = BEZIER(S1)([chimneyProfile1,fakePoint]);
	cover1 = MAP(cover1)(domains.depthCapitalDomain);

	fakePoint = BEZIER(S0)([[0.105*p,0.09*p,(height+0.025)*p]]);
	cover2 = BEZIER(S1)([chimneyProfile2,fakePoint]);
	cover2 = MAP(cover2)(domains.depthCapitalDomain);

	var littleChimney = STRUCT([
			(SIMPLEX_GRID([[0.16*p],[-0.02*p,0.04*p],[(11*hs)*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.07*p,0.07*p],[-0.03*p,0.06*p],[(height)*p]])).color(colors.hue),
			(getCover(p,[[0,0.02,11*hs],[0.07,0.03,(21*hs)],[0.07,0.06,21*hs],[0,0.06,11*hs]])).color(colors.hue),
			(getCover(p,[[0,0.02,11*hs],[0.16,0.02,11*hs],[0.14,0.03,21*hs],[0.07,0.03,21*hs]])).color(colors.hue),
			(getCover(p,[[0.16,0.02,11*hs],[0.16,0.06,11*hs],[0.14,0.06,21*hs],[0.14,0.03,21*hs]])).color(colors.hue),

			(SIMPLEX_GRID([[-0.07*p,0.0075*p],[-0.03*p,0.06*p],[-(height)*p,0.02*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.0825*p, 0.005*p],[-0.03*p,0.06*p],[-(height)*p,0.02*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.0925*p, 0.005*p],[-0.03*p,0.06*p],[-(height)*p,0.02*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.1025*p, 0.005*p],[-0.03*p,0.06*p],[-(height)*p,0.02*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.1125*p, 0.005*p],[-0.03*p,0.06*p],[-(height)*p,0.02*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.1225*p, 0.005*p],[-0.03*p,0.06*p],[-(height)*p,0.02*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.1325*p,0.0075*p],[-0.03*p,0.06*p],[-(height)*p,0.02*p]])).color(colors.hue),
			(SIMPLEX_GRID([[-0.07*p,0.07*p],[-0.03*p,0.06*p],[-(height+0.02)*p,0.005*p]])).color(colors.hue),
			coverChimney.color(colors.hue),
			cover1.color(colors.hue),
			cover2.color(colors.hue),

		]);

	littleChimney.translate([0,1,2],[0.86*p,0.36*p,(h1+h2)*p]);

	var grass = (SIMPLEX_GRID([[4.02*p],[3.82*p],[0.005*p]])).color(colors.grass);
	grass.translate([0,1,2],[-0.2*p,-0.2*p,-0.0025*p]);

	var pavement = (SIMPLEX_GRID([[3.08*p],[3.46*p],[0.005*p]])).color(colors.hue);
	var pavementfront = (SIMPLEX_GRID([[-3.08*p,0.68*p],[-0.83*p,1.74*p],[0.005*p]])).color(colors.hue);


	return STRUCT([
			T([0,1,2])([0.42*p,1.656*p,(h1+h2+10*hs)*p])(S([0])([-1])(middleWindow)), // central back door
			leftComponents,
			littleChimney,
			bigChimney,
			grass, pavement, pavementfront,
			T([1])([3.46*p])(S([1])([-1])(leftComponents))
		]);

}

    

/*
	Function charged to create an object Drawer and draw the villa
*/
function drawVilla(){

	var drawer = new Drawer();

	drawer.addFoundation(foundation());
	drawer.drawFoundation();
	drawer.addSteps(steps());
	drawer.drawSteps();
	drawer.addBaseComponents(baseComponents());
	drawer.drawBaseComponents();
	drawer.addBuildingWall(buildingWall());
	drawer.drawBuildingWall();

	drawer.addLedge(ledge());
	drawer.drawLedge();

	drawer.addColums(colums());
	drawer.drawColums();

	drawer.addTympanum(tympanum());
	drawer.drawTympanum();

	drawer.addGuttae(guttae());
	drawer.drawGuttae();

	drawer.addBuildingRoof(buildingRoof());
	drawer.drawBuildingRoof();
	
	drawer.addBuildingComponents(buildingComponents());
	drawer.drawBuildingComponents();

}

drawVilla();

