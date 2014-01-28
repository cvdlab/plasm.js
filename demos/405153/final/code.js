var H = function(points){
	return CUBIC_HERMITE(S0)(points);
}

var B = function(points){
	return BEZIER(S0)(points);
}


var dd = PROD1x1([INTERVALS(1)(10),INTERVALS(1)(10)]);
var dom = INTERVALS(1)(10);


var nucleolo = function(){
	var r= 2.5;
	var n = 20;

	var sphereDomain = DOMAIN([[0,PI],[0,2*PI]])([n,n]);
	var sphere = MAP(function(p){
		var u = p[0]-PI/2;
		var v = p[1]-PI;
		return [r*Math.cos(u)*Math.sin(v),r*Math.cos(u)*Math.cos(v),r*Math.sin(u)];
	})(sphereDomain);

	var nucleoColorato = COLOR([0,0,0])(sphere);//COLOR([92/255,51/255,23/255])(sphere);
	
	return nucleoColorato;
}


var nucleo = function(){

	h = 0;
	n = 5;

	var c1 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c2 = H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c3 = H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c4 = H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 5;
	var c5 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c6 = H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c7 = H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c8 = H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = -5;
	var c9 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c10= H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c11= H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c12= H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);


	

	var p0  = B([[0,0,0]]);
	var p1  = B([[0,0,5]]);
	var p2  = B([[0,0,-5]]);


	var d1 = COLOR([139/255,69/255,19/255])(MAP(BEZIER(S1)([c1,p0]))(dd));
	var d2 = COLOR([139/255,69/255,19/255])(MAP(BEZIER(S1)([c2,p0]))(dd));
	var d3 = COLOR([139/255,69/255,19/255])(MAP(BEZIER(S1)([c3,p0]))(dd));
	var d4 = COLOR([139/255,69/255,19/255])(MAP(BEZIER(S1)([c4,p0]))(dd));


	var d5 = COLOR([139/255,69/255,19/255])(MAP(BEZIER(S1)([c1,c5,p1]))(dd));
	var d6 = COLOR([139/255,69/255,19/255,0.5])(MAP(BEZIER(S1)([c2,c6,p1]))(dd));
	var d7 = COLOR([139/255,69/255,19/255])(MAP(BEZIER(S1)([c3,c7,p1]))(dd));
	var d8 = COLOR([139/255,69/255,19/255])(MAP(BEZIER(S1)([c4,c8,p1]))(dd));


	var d9 = COLOR([139/255,69/255,19/255])(MAP(BEZIER(S1)([c1,c9,p2]))(dd));
	var d10= COLOR([139/255,69/255,19/255])(MAP(BEZIER(S1)([c2,c10,p2]))(dd));
	var d11= COLOR([139/255,69/255,19/255])(MAP(BEZIER(S1)([c3,c11,p2]))(dd));
	var d12= COLOR([139/255,69/255,19/255])(MAP(BEZIER(S1)([c4,c12,p2]))(dd));



	var sphere = STRUCT([d5,d6,d7,d8]);
	var sphere1 = STRUCT([d9,d10,d11,d12]);
	var disk = STRUCT([d1,d2,d3,d4]);

	var quarterdisk1 = B([[0,-5,0],[0,-5,5],[0,0,5]]);
	var d13= COLOR([1,165/255,79/255])(MAP(BEZIER(S1)([quarterdisk1,p0]))(dd));
	var quarterdisk2   = B([[0,5,0],[0,5,5],[0,0,5]]);
	var d14= COLOR([1,165/255,79/255])(MAP(BEZIER(S1)([quarterdisk2,p0]))(dd));

	var facciaFrontale = STRUCT([d13,d14]);

	var model = STRUCT([sphere,sphere1,disk,facciaFrontale]);
	
	return model;




}


var cellula = function(){
	h = 0.01;
	n = 10;

	var c1 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c2 = H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c3 = H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c4 = H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 10;
	n = 10;
	var c5 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c6 = H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c7 = H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c8 = H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = -10;
	n = 10;
	var c9 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c10= H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c11= H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c12= H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	var p0  = B([[0,0,0.01]]);
	var p1  = B([[0,0,10.01]]);
	var p2  = B([[0,0,-9.99]]);

	var c = [1,165/255,79/255];

	var d1 = COLOR(c)(MAP(BEZIER(S1)([c1,p0]))(dd));
	var d2 = COLOR(c)(MAP(BEZIER(S1)([c2,p0]))(dd));
	var d3 = COLOR(c)(MAP(BEZIER(S1)([c3,p0]))(dd));
	var d4 = COLOR(c)(MAP(BEZIER(S1)([c4,p0]))(dd));


	var d5 = COLOR(c)(MAP(BEZIER(S1)([c1,c5,p1]))(dd));
	var d6 = COLOR([139/255,69/255,19/255,0.1])(MAP(BEZIER(S1)([c2,c6,p1]))(dd));
	var d7 = COLOR([139/255,69/255,19/255,0.1])(MAP(BEZIER(S1)([c3,c7,p1]))(dd));
	var d8 = COLOR(c)(MAP(BEZIER(S1)([c4,c8,p1]))(dd));


	var d9 = COLOR(c)(MAP(BEZIER(S1)([c1,c9,p2]))(dd));
	var d10= COLOR(c)(MAP(BEZIER(S1)([c2,c10,p2]))(dd));
	var d11= COLOR(c)(MAP(BEZIER(S1)([c3,c11,p2]))(dd));
	var d12= COLOR(c)(MAP(BEZIER(S1)([c4,c12,p2]))(dd));



	var sphere = STRUCT([d5,d6,d7,d8]);
	var sphere1 = STRUCT([d9,d10,d11,d12]);
	var facciaBase = STRUCT([d1,d2,d3,d4]);

	

	var mezzodisco1   = B([[-10,0,0],[-10,0,10],[0,0,10]]);
	var mezzodisco2   = B([[10,0,0],[10,0,10],[0,0,10]]);
	var d13= COLOR(c)(MAP(BEZIER(S1)([mezzodisco1,p0]))(dd));
	var d14= COLOR(c)(MAP(BEZIER(S1)([mezzodisco2,p0]))(dd));

	var facciaFrontale = STRUCT([d13,d14]);


	var model = STRUCT([sphere,sphere1,facciaBase,facciaFrontale]);
	
	
	return model;




}

var dendrite = function(){

	h = 0.0;
	n = 1.5;

	var c1 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c2 = H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c3 = H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c4 = H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 5;
	n = 1.5;

	var c5 = H([[1,n,h],[n+1,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c6 = H([[n+1,0,h],[0+1,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c7 = H([[0+1,-n,h],[-n+1,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c8 = H([[-n+1,0,h],[0+1,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 10.0;
	n = 1;

	var c9 = H([[0-1,n,h],[n-1,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c10= H([[n-1,0,h],[0-1,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c11= H([[0-1,-n,h],[-n-1,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c12= H([[-n-1,0,h],[0-1,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 15.0;
	n = 0.5;

	var c13 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c14= H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c15= H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c16= H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 22.0;
	n = 0.2;

	var c17 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c18= H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c19= H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c20= H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	var p0  = B([[0,0,30]]);


	h = 30.0;
	n = 0.2;

	var c21 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c22= H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c23= H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c24= H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	var c = [1,165/255,79/255];
	var d1 = COLOR(c)(MAP(BEZIER(S1)([c1,c5,c9,c13,c17,c21]))(dd));
	var d2 = COLOR(c)(MAP(BEZIER(S1)([c2,c6,c10,c14,c18,c22]))(dd));
	var d3 = COLOR(c)(MAP(BEZIER(S1)([c3,c7,c11,c15,c19,c23]))(dd));
	var d4 = COLOR(c)(MAP(BEZIER(S1)([c4,c8,c12,c16,c20,c24]))(dd));

	var model = STRUCT([d1,d2,d3,d4]);
	
	return model;

}


var dendrite2 = function(){

	h = 0.0;
	n = 1.5;

	var c1 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c2 = H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c3 = H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c4 = H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 2.5;
	n = 1.5;

	var c5 = H([[0+5,n,h],[n+5,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c6 = H([[n+5,0,h],[0+5,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c7 = H([[0+5,-n,h],[-n+5,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c8 = H([[-n+5,0,h],[0+5,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 5.0;
	n = 1.5;

	var c9 = H([[0-5,n,h],[n-5,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c10= H([[n-5,0,h],[0-5,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c11= H([[0-5,-n,h],[-n-5,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c12= H([[-n-5,0,h],[0-5,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 7.5;
	n = 1.5;

	var c13= H([[0+5,n,h],[n+5,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c14= H([[n+5,0,h],[0+5,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c15= H([[0+5,-n,h],[-n+5,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c16= H([[-n+5,0,h],[0+5,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 12.0;
	n = 1;

	var c17 = H([[0-5,n,h],[n-5,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c18= H([[n-5,0,h],[0-5,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c19= H([[0-5,-n,h],[-n-5,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c20= H([[-n-5,0,h],[0-5,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 22.0;
	n = 0.2;

	var c21= H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c22= H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c23= H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c24= H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	var p0  = B([[0+5,0,30]]);

	var c = [1,165/255,79/255];
	var d1 = COLOR(c)(MAP(BEZIER(S1)([c1,c5,c9,c13,c17,c21]))(dd));
	var d2 = COLOR(c)(MAP(BEZIER(S1)([c2,c6,c10,c14,c18,c22]))(dd));
	var d3 = COLOR(c)(MAP(BEZIER(S1)([c3,c7,c11,c15,c19,c23]))(dd));
	var d4 = COLOR(c)(MAP(BEZIER(S1)([c4,c8,c12,c16,c20,c24]))(dd));

	var model = STRUCT([d1,d2,d3,d4]);
	
	return model;

}


var dendrite1 = function(){

	h = 0.0;
	n = 1.5;

	var c1 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c2 = H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c3 = H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c4 = H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 5;
	n = 1.5;

	var c5 = H([[2,n,h],[n+2,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c6 = H([[n+2,0,h],[0+2,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c7 = H([[0+2,-n,h],[-n+2,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c8 = H([[-n+2,0,h],[0+2,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 10.0;
	n = 1;

	var c9 = H([[0-2,n,h],[n-2,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c10= H([[n-2,0,h],[0-2,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c11= H([[0-2,-n,h],[-n-2,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c12= H([[-n-2,0,h],[0-2,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 15.0;
	n = 0.5;

	var c13 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c14= H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c15= H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c16= H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 22.0;
	n = 0.2;

	var c17 = H([[0+0.5,n,h],[n+0.5,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c18= H([[n+0.5,0,h],[0+0.5,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c19= H([[0+0.5,-n,h],[-n+0.5,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c20= H([[-n+0.5,0,h],[0+0.5,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 30.0;
	n = 0.2;

	var c21 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c22= H([[n,0,h],[0,-n,h],[0,-n*1.6568,0],[-n*1.6568,0,0]]);
	var c23= H([[0,-n,h],[-n,0,h],[-n*1.6568,0,0],[0,n*1.6568,0]]);
	var c24= H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	var p0  = B([[3,0,30]]);

	var c = [1,165/255,79/255];
	var d1 = COLOR(c)(MAP(BEZIER(S1)([c1,c5,c9,c13,c17,c21]))(dd));
	var d2 = COLOR(c)(MAP(BEZIER(S1)([c2,c6,c10,c14,c18,c22]))(dd));
	var d3 = COLOR(c)(MAP(BEZIER(S1)([c3,c7,c11,c15,c19,c23]))(dd));
	var d4 = COLOR(c)(MAP(BEZIER(S1)([c4,c8,c12,c16,c20,c24]))(dd));

	var model = STRUCT([d1,d2,d3,d4]);
	
	
	return model;

}


var assone = function(){

	h = 0.0;
	n = 1.5;

	var c1 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c4 = H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	var p0  = B([[-n,0,0],[]]);

	h = 5;
	n = 1.5;

	var c5 = H([[0+2,n,h],[n+2,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c8 = H([[-n+2,0,h],[0+2,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	

	h = 10.0;
	n = 1;

	var c9 = H([[0-2,n,h],[n-2,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c12= H([[-n-2,0,h],[0-2,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 15.0;
	n = 0.5;

	var c13 = H([[0,n,h],[n,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c16= H([[-n,0,h],[0,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	h = 22.0;
	n = 0.2;

	var c17 = H([[0+0.5,n,h],[n+0.5,0,h],[n*1.6568,0,0],[0,-n*1.6568,0]]);
	var c20= H([[-n+0.5,0,h],[0+0.5,n,h],[0,n*1.6568,0],[n*1.6568,0,0]]);

	var p0  = B([[3,0,30]]);

	var c = [1,165/255,79/255];
	var d1 = COLOR(c)(MAP(BEZIER(S1)([c1,c5,c9,c13,c17,p0]))(dd));
	var d4 = COLOR(c)(MAP(BEZIER(S1)([c4,c8,c12,c16,c20,p0]))(dd));


	var cc1  = B([[1.5,0,0],[1.5+2,0,5],[-1,0,10],[0.5,0,15],[0.7,0,22],[3,0,30]]);
	var cc2  = B([[-1.5,0,0],[-1.5+2,0,5],[-3,0,10],[-0.5,0,15],[0.3,0,22],[3,0,30]]);


	var d2 = COLOR(c)(MAP(BEZIER(S1)([cc1,cc2]))(dd));

	var model = (STRUCT([d1,d4,d2]));
	return model;
	
	
	
	

}

var dendriteCompleto = function(){
	var d1 = dendrite();
	var dd1 = dendrite1();
	var ddd1 = dendrite2();

	var d2 = S([0,1,2])([1/4,1/4,1/4])(d1);
	d2 = R([1,2])(PI/2)(d2);
	d2 = T([2])([2])(d2);

	var d3 = S([0,1,2])([1/2,1/2,1/2])(dd1);
	d3 = R([1,2])(PI/4)(d3);
	d3 = R([0,1])(PI/3)(d3);
	d3 = T([2])([6])(d3);

	var d4 = S([0,1,2])([1/3,1/3,1/3])(dd1);
	d4 = R([1,2])(PI/4)(d4);
	d4 = R([0,1])(-PI/6)(d4);
	d4 = T([2])([3])(d4);

	var d5 = S([0,1,2])([1/3,1/3,1/3])(ddd1);
	d5 = R([1,2])(PI/4)(d5);
	d5 = R([0,1])(-PI/2)(d5);
	d5 = T([2])([2])(d5);

	var d6 = S([0,1,2])([1/2,1/2,1/2])(ddd1);
	d6 = R([1,2])(PI/3)(d6);
	d6 = R([0,1])(-PI)(d6);
	d6 = T([2])([8])(d6);

	var d7 = S([0,1,2])([1/5,1/5,1/5])(dd1);
	d7 = R([1,2])(PI/4)(d7);
	d7 = R([0,1])(PI)(d7);
	d7 = T([2])([14])(d7);

	var d8 = S([0,1,2])([1/5,1/5,1/5])(d1);
	d8 = R([1,2])(PI/5)(d8);
	d8 = R([0,1])(2*PI)(d8);
	d8 = T([2])([15])(d8);

	var d9 = S([0,1,2])([1/5,1/5,1/2])(ddd1);
	d9 = R([1,2])(PI/3.5)(d9);
	d9 = R([0,1])(PI/2)(d9);
	d9 = T([2])([14.5])(d9);

	var model = STRUCT([d1,d2,d3,d4,d5,d6,d7,d8,d9]);
	return model;
}


var dendriteCompleto1 = function(){
	var d1 = dendrite2();
	var dd1 = dendrite1();
	var ddd1 = dendrite();

	var d2 = S([0,1,2])([1/4,1/4,1/4])(d1);
	d2 = R([1,2])(PI/2)(d2);
	d2 = T([2])([2])(d2);

	var d3 = S([0,1,2])([1/2,1/2,1/2])(dd1);
	d3 = R([1,2])(PI/4)(d3);
	d3 = R([0,1])(PI/3)(d3);
	d3 = T([2])([6])(d3);

	var d4 = S([0,1,2])([1/3,1/3,1/3])(dd1);
	d4 = R([1,2])(PI/4)(d4);
	d4 = R([0,1])(-PI/6)(d4);
	d4 = T([2])([3])(d4);

	var d5 = S([0,1,2])([1/3,1/3,1/3])(ddd1);
	d5 = R([1,2])(PI/4)(d5);
	d5 = R([0,1])(-PI/2)(d5);
	d5 = T([2])([2])(d5);

	var d6 = S([0,1,2])([1/2,1/2,1/2])(ddd1);
	d6 = R([1,2])(PI/3)(d6);
	d6 = R([0,1])(-PI)(d6);
	d6 = T([2])([8])(d6);

	var d7 = S([0,1,2])([1/5,1/5,1/5])(dd1);
	d7 = R([1,2])(PI/4)(d7);
	d7 = R([0,1])(PI)(d7);
	d7 = T([2])([14])(d7);

	var d8 = S([0,1,2])([1/5,1/5,1/5])(d1);
	d8 = R([1,2])(PI/5)(d8);
	d8 = R([0,1])(2*PI)(d8);
	d8 = T([2])([15])(d8);

	var d9 = S([0,1,2])([1/5,1/5,1/2])(ddd1);
	d9 = R([1,2])(PI/3.5)(d9);
	d9 = R([0,1])(PI/2)(d9);
	d9 = T([2])([14.5])(d9);

	var model = STRUCT([d1,d2,d3,d4,d5,d6,d7,d8,d9]);
	return model;
}


var dendriti = function(){
	var d1 = dendriteCompleto1();
	var d2 = dendriteCompleto();
	var d3 = dendriteCompleto();
	var d4 = dendriteCompleto1();

	var d5 = dendriteCompleto1();

	var d6 = dendriteCompleto();
	var d7 = dendriteCompleto1();

	d1 = S([0,1,2])([1,1,1.5])(d1);
	d1 = R([1,2])(-PI/5)(d1)
	d1 = R([0,1])(PI/2)(d1)
	d1 = T([0,1,2])([-5,2,8])(d1)

	d2 = S([0,1,2])([1,1,1/2])(d2);
	d2 = R([1,2])(-PI/4)(d2)
	d2 = R([0,1])(-PI/4)(d2)
	d2 = T([0,1,2])([5,3,7])(d2)


	d3 = S([0,1,2])([1,1,0.8])(d3);
	d3 = R([1,2])(PI/2+PI/5)(d3)
	d3 = R([0,1])(PI/5)(d3)
	d3 = T([0,1,2])([5,-2,-8])(d3)

	d4 = S([0,1,2])([1,1,1])(d4);
	d4 = R([1,2])(PI/2-PI/5)(d4)
	d4 = R([0,1])(PI/2)(d4)
	d4 = T([0,1,2])([5,2,8])(d4)

	d5 = S([0,1,2])([1.5,1.5,1])(d5);
	d5 = R([1,2])(-PI/2 - PI/9)(d5)
	d5 = R([0,1])(PI/2)(d5)
	d5 = T([0,1,2])([-7,-1,-5.5])(d5)

	d6 = S([0,1,2])([1.2,1.2,1.5])(d6);
	d6 = R([1,2])(-PI/2)(d6)
	d6 = R([0,1])(PI/9)(d6)
	d6 = T([0,1,2])([0,8,0])(d6)

	d7 = S([0,1,2])([1.2,1.2,0.8])(d7);
	d7 = R([1,2])(-PI/2)(d7)
	d7 = R([0,1])(-PI/9)(d7)
	d7 = T([0,1,2])([0,8,0])(d7)

	/*var d8 = dendrite1();
	d8 = S([0,1,2])([3,3,3])(d8);
	d8 = R([1,2])(-PI/2)(d8)
	d8 = R([0,1])(-PI/3)(d8)
	d8 = R([0,2])(PI/9)(d8)
	d8 = T([0,1,2])([7.5,3.5,-3])(d8)*/

	d8 = assone();
	d8 = S([0,1,2])([3,3,3])(d8);
	d8 = R([1,2])(-PI/2)(d8)
	d8 = R([0,1])(-PI/2)(d8)
	d8 = T([0])([7.5])(d8);




	var model = STRUCT([d1,d2,d3,d4,d5,d6,d7,d8]);
	return model;
}


var complessoGolgi = function(){
	var quotes = [[1.5],[0.5],[0.2]];
	var golgi = SIMPLEX_GRID(quotes);
	golgi = T([0])([-0.75])(golgi);

	quotes = [[2],[0.5],[0.2]];
	var golgi1 = SIMPLEX_GRID(quotes);
	golgi1 = T([0,2])([-1,0.3])(golgi1);

	quotes = [[2.5],[0.5],[0.2]];
	var golgi2 = SIMPLEX_GRID(quotes);
	golgi2 = T([0,2])([-1.25,0.6])(golgi2);

	quotes = [[3],[0.5],[0.2]];
	var golgi3 = SIMPLEX_GRID(quotes);
	golgi3 = T([0,2])([-1.5,0.9])(golgi3);

	quotes = [[3.02],[0.5],[0.2]];
	var golgi4 = SIMPLEX_GRID(quotes);
	golgi4 = T([0,2])([-1.56,1.2])(golgi4);

	quotes = [[2.5],[0.5],[0.2]];
	var golgi5 = SIMPLEX_GRID(quotes);
	golgi5 = T([0,2])([-1.25,1.5])(golgi5);
	
	var s = STRUCT([golgi,golgi1,golgi2,golgi3,golgi4,golgi5])
	s = R([0,2])(PI/4)(s);
	s = T([0,1,2])([5,-0.25,5])(s);
	
	var apparatoGolgi = COLOR([153/255,50/255,205/255])(s);
	return apparatoGolgi;
}

var mitocondrio = function(){

	var r = 0.4;
	var n = 20;

	var sphereDomain = DOMAIN([[0,PI],[0,2*PI]])([n,n]);
	var sphere = MAP(function(p){
		var u = p[0]-PI/2;
		var v = p[1]-PI;
		return [r*Math.cos(u)*Math.sin(v),r*Math.cos(u)*Math.cos(v),r*Math.sin(u)];
	})(sphereDomain);

	var mitocondrio = COLOR([115/255,0,0])(sphere);
	mitocondrio = S([0])([1.5])(mitocondrio);
	return mitocondrio;

}

var mitocondri = function(){
	var mito1 = mitocondrio();
	mito1 = R([0,2])(-PI/6)(mito1);
	mito1 = T([0,2])([-2,6.5])(mito1);

	var mito2 = mitocondrio();
	mito2 = R([0,2])(-PI/4)(mito2);
	mito2 = T([0,2])([-4.5,8])(mito2);

	var mito3 = mitocondrio();
	mito3 = R([0,2])(-PI/3)(mito3);
	mito3 = T([0,2])([-8,2.5])(mito3);

	var mito4 = mitocondrio();
	mito4 = R([0,2])(-PI/2)(mito4);
	mito4 = T([0,2])([6.5,3])(mito4);

	var mito5 = mitocondrio();
	mito5 = R([0,1])(-PI/4)(mito5);
	mito5 = T([0,1])([-5.5,-5.5])(mito5);

	var mito6 = mitocondrio();
	mito6 = R([0,1])(-PI/3)(mito6);
	mito6 = T([0,1])([7.5,-2.5])(mito6);

	var mito7 = mitocondrio();
	mito7 = R([0,1])(-PI/2)(mito7);
	mito7 = T([0,1])([9.5,-1.5])(mito7);

	var mito8 = mitocondrio();
	mito8 = R([0,1])(-PI/4)(mito8);
	mito8 = T([0,1])([11.5,-2.3])(mito8);

	var mito9 = mitocondrio();
	mito9 = R([0,1])(-PI/5)(mito9);
	mito9 = T([0,1])([20.5,-1.3])(mito9);


	var model = STRUCT([mito1,mito2,mito3,mito4,mito5,mito6,mito7,mito8,mito9]);
	return model;
}


var lisosoma = function(){

	var r = 0.2;
	var n = 20;

	var sphereDomain = DOMAIN([[0,PI],[0,2*PI]])([n,n]);
	var sphere = MAP(function(p){
		var u = p[0]-PI/2;
		var v = p[1]-PI;
		return [r*Math.cos(u)*Math.sin(v),r*Math.cos(u)*Math.cos(v),r*Math.sin(u)];
	})(sphereDomain);

	var lisosoma = COLOR([238/255,173/255,14/255])(sphere);
	lisosoma = S([0])([1.5])(lisosoma);
	return lisosoma;

}

var lisosomi = function(){
	var liso1 = lisosoma();
	liso1 = R([0,2])(-PI/6)(liso1);
	liso1 = T([0,2])([-5.5,6.5])(liso1);

	var liso2 = lisosoma();
	liso2 = R([0,2])(-PI/3)(liso2);
	liso2 = T([0,2])([1,8])(liso2);

	var liso3 = lisosoma();
	liso3 = R([0,1])(PI/2)(liso3);
	liso3 = T([0,1])([-3,-7])(liso3);


	var liso4 = lisosoma();
	liso4 = R([0,1])(PI/3)(liso4);
	liso4 = T([0,1])([15,-1.5])(liso4);


	var model = STRUCT([liso1,liso2,liso3,liso4]);
	return model;
}

var ribosoma = function(){

	var r = 0.1;
	var n = 20;

	var sphereDomain = DOMAIN([[0,PI],[0,2*PI]])([n,n]);
	var sphere = MAP(function(p){
		var u = p[0]-PI/2;
		var v = p[1]-PI;
		return [r*Math.cos(u)*Math.sin(v),r*Math.cos(u)*Math.cos(v),r*Math.sin(u)];
	})(sphereDomain);

	var ribosoma = COLOR([0,0,0])(sphere);
	return ribosoma;

}

var ribosomi = function(){

	var ribo1 = ribosoma();
	ribo1 = T([0,2])([-2.5,8.5])(ribo1);

	var ribo2 = ribosoma();
	ribo2 = T([0,2])([-7.5,6.5])(ribo2);

	var ribo3 = ribosoma();
	ribo3 = T([0,2])([-5.5,4.5])(ribo3);

	var ribo4 = ribosoma();
	ribo4 = T([0,2])([2.5,6.5])(ribo4);

	var ribo5 = ribosoma();
	ribo5 = T([0,1])([-7.5,-2])(ribo5);

	var ribo6 = ribosoma();
	ribo6 = T([0,1])([14,2])(ribo6);

	var ribo7 = ribosoma();
	ribo7 = T([0,1])([14.5,-1])(ribo7);


	var model = STRUCT([ribo1,ribo2,ribo3,ribo4,ribo5,ribo6,ribo7]);
	return model;
}

var reticoloLiscio = function(){
	var quotes = [[0.5,-0.5,0.5,-0.5,0.5,-0.5,0.5,-0.5,0.5,-0.5,0.5,-0.5,0.5,-0.5],[0.5,-0.5,0.5],[0.5]];
	var reticolo = SIMPLEX_GRID(quotes);
	reticolo = R([0,1])(PI/6)(reticolo);
	reticolo = T([1,2])([-9.5,-0.25])(reticolo);
	

	quotes = [[0.5],[0.5],[0.5]];
	var cubo1 = SIMPLEX_GRID(quotes);
	cubo1 = T([1,2])([-7,-0.25])(cubo1);

	var cubo2 = SIMPLEX_GRID(quotes);
	cubo2 = T([0,1,2])([-2,-8,-0.25])(cubo2);

	var cubo3 = SIMPLEX_GRID(quotes);
	cubo3 = T([0,1,2])([-1.5,-9.5,-0.25])(cubo3);

	var model = STRUCT([cubo1,reticolo,cubo2,cubo3]);
	model = COLOR([0,34/255,102/255])(model);
	return model;
}

var reticoloRuvido = function(){

//da fare
	var c1 = H([[0,0,5.5],[5.5,0,0],[5.5*1.6568,0,0],[0,0,-5.5*1.6568]]);
	var c2 = H([[0,0,6],[6,0,0],[6*1.6568,0,0],[0,0,-6*1.6568]]);
	var c3 = H([[0,0.5,5.5],[5.5,0.5,0],[5.5*1.6568,0,0],[0,0,-5.5*1.6568]]);
	var c4 = H([[0,0.5,6],[6,0.5,0],[6*1.6568,0,0],[0,0,-6*1.6568]]);


	var c = [71/255,60/255,139/255];

	var d1 = COLOR(c)(MAP(BEZIER(S1)([c1,c2]))(dd));
	var d2 = COLOR(c)(MAP(BEZIER(S1)([c3,c4]))(dd));
	var d3 = COLOR(c)(MAP(BEZIER(S1)([c1,c3]))(dd));
	var d4 = COLOR(c)(MAP(BEZIER(S1)([c2,c4]))(dd));

	var reticolodx = STRUCT([d1,d2,d3,d4]);
	reticolodx = T([0,1,2])([0.25,-0.25,0.25])(reticolodx);


	var c5 = H([[0,0,5.5],[-5.5,0,0],[-5.5*1.6568,0,0],[0,0,-5.5*1.6568]]);
	var c6 = H([[0,0,6],[-6,0,0],[-6*1.6568,0,0],[0,0,-6*1.6568]]);
	var c7 = H([[0,0.5,5.5],[-5.5,0.5,0],[-5.5*1.6568,0,0],[0,0,-5.5*1.6568]]);
	var c8 = H([[0,0.5,6],[-6,0.5,0],[-6*1.6568,0,0],[0,0,-6*1.6568]]);


	

	var d5 = COLOR(c)(MAP(BEZIER(S1)([c5,c6]))(dd));
	var d6 = COLOR(c)(MAP(BEZIER(S1)([c7,c8]))(dd));
	var d7 = COLOR(c)(MAP(BEZIER(S1)([c5,c7]))(dd));
	var d8 = COLOR(c)(MAP(BEZIER(S1)([c6,c8]))(dd));

	var reticolosx = STRUCT([d5,d6,d7,d8]);
	reticolosx = T([0,1,2])([-0.25,-0.25,0.25])(reticolosx);

	var reticolosx1 = R([1,2])(PI/2)(reticolosx);
	var reticolodx1 = R([1,2])(PI/2)(reticolodx);

	var model = STRUCT([reticolodx,reticolosx,reticolosx1,reticolodx1]);
	return (model);

}

var nucleo = nucleo();
var nucleolo = nucleolo();
var cellula = cellula();
var golgi = complessoGolgi();
var mitocondri = mitocondri();
var dendriti = dendriti();
var lisosomi = lisosomi();
var ribosomi = ribosomi();
var reticololiscio = reticoloLiscio();
var reticoloruvido = reticoloRuvido();

var neurone = STRUCT([nucleo,cellula,nucleolo,dendriti,golgi,mitocondri,lisosomi,ribosomi,reticololiscio,reticoloruvido]);



DRAW(neurone);
