/*********************************************************

***********  MacBook Pro 13" model for showcase **********

	author: Roberto Marinai

	project stored in a local variable "scmodel"   

*********************************************************/

var getLogo = function(domain){

	var p0 = [[0,6,0],[2,8.3,0],[3,3.5,0],[4,8.3,0],[6,6,0]];
	var c0 = BEZIER(S0)(p0);

	var p1 = [[0,6,0],[-1.5,4,0],[1,1,0]];
	var c1 = BEZIER(S0)(p1);

	var p2 = [[1,1,0],[2,0,0],[3,3,0],[4,0,0],[5,1,0]];
	var c2 = BEZIER(S0)(p2);

	var p3 = [[6,6,0],[4.3,4.7,0],[6.1,3.3,0]];
	var c3 = BEZIER(S0)(p3);

	var p4 = [[6.1,3.3,0],[5.8,1.95,0],[5,1,0]];
	var c4 = BEZIER(S0)(p4);

	var p5 = [[3,7,0],[3.5,8.5,0],[5,8.5,0]];
	var c5 = BEZIER(S0)(p5);

	var p6 = [[3,7,0],[4.5,7,0],[5,8.5,0]];
	var c6 = BEZIER(S0)(p6);

	var pNull = [[3,3,0]];
	var cNull = BEZIER(S0)(pNull);

	var s0 = MAP(BEZIER(S1)([c0,cNull]))(domain);
	var s1 = MAP(BEZIER(S1)([c1,cNull]))(domain);
	var s2 = MAP(BEZIER(S1)([c2,cNull]))(domain);
	var s3 = MAP(BEZIER(S1)([c3,cNull]))(domain);
	var s4 = MAP(BEZIER(S1)([c4,cNull]))(domain);
	var s5 = MAP(BEZIER(S1)([c5,c6]))(domain);

	var appleLogo = T([0,1])([-3,-4])(STRUCT([s0,s1,s2,s3,s4,s5]));

	return appleLogo;
};

var getUpperPart = function(domain){

	var controls1 = [[-16,9,0],[-14,11,0],[0,4,0],[4,0,0]];
	var c1 = CUBIC_HERMITE(S0)(controls1);

	var controls2 = [[-14,11,0],[0,11,0],[0,0,0],[0,0,0]];
	var c2 = CUBIC_HERMITE(S0)(controls2);

	var controls3 = [[-16,9,0],[-16,0,0],[0,0,0],[0,0,0]];
	var c3 = CUBIC_HERMITE(S0)(controls3);

	var controls4 = [[-15,9,0.35],[-14,10,0.35],[0,2,0],[2,0,0]];
	var c4 = CUBIC_HERMITE(S0)(controls4);

	var controls5 = [[-14,10,0.35],[0,10,0.35],[0,0,0],[0,0,0]];
	var c5 = CUBIC_HERMITE(S0)(controls5);

	var controls6 = [[-15,9,0.35],[-15,0,0.35],[0,0,0],[0,0,0]];
	var c6 = CUBIC_HERMITE(S0)(controls6);

	var controlsNull1 = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
	var cNull1 = CUBIC_HERMITE(S0)(controlsNull1);
	var controlsNull2 = [[0,0,0.35],[0,0,0.35],[0,0,0],[0,0,0]];
	var cNull2 = CUBIC_HERMITE(S0)(controlsNull2);

	var controls7 = [[-16,9,-0.2],[-14,11,-0.2],[0,4,0],[4,0,0]];
	var c7 = CUBIC_HERMITE(S0)(controls7);

	var controls8 = [[-14,11,-0.2],[0,11,-0.2],[0,0,0],[0,0,0]];
	var c8 = CUBIC_HERMITE(S0)(controls8);

	var controls9 = [[-16,9,-0.2],[-16,0,-0.2],[0,0,0],[0,0,0]];
	var c9 = CUBIC_HERMITE(S0)(controls9);

	var controlsNull3 = [[0,0,-0.2],[0,0,-0.2],[0,0,0],[0,0,0]];
	var cNull3 = CUBIC_HERMITE(S0)(controlsNull3);

	var controls10 = [[-15.8,8.8,-0.21],[-13.8,10.8,-0.21],[0,4,0],[4,0,0]];
	var c10 = CUBIC_HERMITE(S0)(controls10);

	var controls11 = [[-13.8,10.8,-0.21],[0,10.8,-0.21],[0,0,0],[0,0,0]];
	var c11 = CUBIC_HERMITE(S0)(controls11);

	var controls12 = [[-15.8,8.8,-0.21],[-15.8,0,-0.21],[0,0,0],[0,0,0]];
	var c12 = CUBIC_HERMITE(S0)(controls12);

	var controlsNull4 = [[0,0,-0.21],[0,0,-0.21],[0,0,0],[0,0,0]];
	var cNull4 = CUBIC_HERMITE(S0)(controlsNull4);

	var s1 = MAP(CUBIC_HERMITE(S1)([c1,c4,[0,0,0.5],[0,0,0]]))(domain);
	var s2 = MAP(CUBIC_HERMITE(S1)([c2,c5,[0,0,0.5],[0,0,0]]))(domain);
	var s3 = MAP(CUBIC_HERMITE(S1)([c3,c6,[0,0,0.5],[0,0,0]]))(domain);

	var s4 = MAP(CUBIC_HERMITE(S1)([c1,cNull1,[0,0,0],[0,0,0]]))(domain);
	var s5 = MAP(CUBIC_HERMITE(S1)([c2,cNull1,[0,0,0],[0,0,0]]))(domain);
	var s6 = MAP(CUBIC_HERMITE(S1)([c3,cNull1,[0,0,0],[0,0,0]]))(domain);

	var s7 = MAP(CUBIC_HERMITE(S1)([c4,cNull2,[0,0,0],[0,0,0]]))(domain);
	var s8 = MAP(CUBIC_HERMITE(S1)([c5,cNull2,[0,0,0],[0,0,0]]))(domain);
	var s9 = MAP(CUBIC_HERMITE(S1)([c6,cNull2,[0,0,0],[0,0,0]]))(domain);

	var s10 = MAP(CUBIC_HERMITE(S1)([c1,c7,[0,0,0],[0,0,0]]))(domain);
	var s11 = MAP(CUBIC_HERMITE(S1)([c2,c8,[0,0,0],[0,0,0]]))(domain);
	var s12 = MAP(CUBIC_HERMITE(S1)([c3,c9,[0,0,0],[0,0,0]]))(domain);

	var s13 = MAP(CUBIC_HERMITE(S1)([c7,cNull3,[0,0,0],[0,0,0]]))(domain);
	var s14 = MAP(CUBIC_HERMITE(S1)([c8,cNull3,[0,0,0],[0,0,0]]))(domain);
	var s15 = MAP(CUBIC_HERMITE(S1)([c9,cNull3,[0,0,0],[0,0,0]]))(domain);

	var s16 = MAP(CUBIC_HERMITE(S1)([c10,cNull4,[0,0,0],[0,0,0]]))(domain);
	var s17 = MAP(CUBIC_HERMITE(S1)([c11,cNull4,[0,0,0],[0,0,0]]))(domain);
	var s18 = MAP(CUBIC_HERMITE(S1)([c12,cNull4,[0,0,0],[0,0,0]]))(domain);

	var screen = COLOR([0,0,0])(T([2])([-0.02])(STRUCT([s16,s17,s18])));
	var surfacePart1 = STRUCT([s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,screen]);
	var surfacePart2 = R([0,1])(PI)(surfacePart1);
	var surfacePart3 = S([0])([-1])(surfacePart1);
	var surfacePart4 = S([0])([-1])(surfacePart2);

	var logo = COLOR([10,10,10])(S([0,1])([0.75,0.75])(T([1,2])([1.5,0.36])(getLogo(domain))));

	var surface = STRUCT([surfacePart1,surfacePart2,surfacePart3,surfacePart4,logo]);

	return surface;

	};

var getFoot = function(domain){

	var controls1 = [[-0.8,0,0],[0,0.8,0],[0,1.4,0],[1.4,0,0]];
	var c1 = CUBIC_HERMITE(S0)(controls1);

	var controlsNull1 = [[0,0,0.1],[0,0,0.1],[0,0,0],[0,0,0]];
	var cNull1 = CUBIC_HERMITE(S0)(controlsNull1);

	var s1 = MAP(CUBIC_HERMITE(S1)([c1,cNull1,[0,0,0.5],[0,0,0]]))(domain);
	var s2 = R([0,1])(PI)(s1);
	var s3 = S([0])([-1])(s1);
	var s4 = S([0])([-1])(s2);

	var surface = STRUCT([s1,s2,s3,s4]);
	
	return COLOR([0,0,0])(surface);
};

var getBottompart = function(domain){

	var controls1 = [[-16,9,0],[-14,11,0],[0,4,0],[4,0,0]];
	var c1 = CUBIC_HERMITE(S0)(controls1);

	var controls2 = [[-14,11,0],[0,11,0],[0,0,0],[0,0,0]];
	var c2 = CUBIC_HERMITE(S0)(controls2);

	var controls3 = [[-16,9,0],[-16,0,0],[0,0,0],[0,0,0]];
	var c3 = CUBIC_HERMITE(S0)(controls3);

	var controls4 = [[-15,9,0.35],[-14,10,0.35],[0,2,0],[2,0,0]];
	var c4 = CUBIC_HERMITE(S0)(controls4);

	var controls5 = [[-14,10,0.35],[0,10,0.35],[0,0,0],[0,0,0]];
	var c5 = CUBIC_HERMITE(S0)(controls5);

	var controls6 = [[-15,9,0.35],[-15,0,0.35],[0,0,0],[0,0,0]];
	var c6 = CUBIC_HERMITE(S0)(controls6);

	var controlsNull1 = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
	var cNull1 = CUBIC_HERMITE(S0)(controlsNull1);
	var controlsNull2 = [[0,0,0.35],[0,0,0.35],[0,0,0],[0,0,0]];
	var cNull2 = CUBIC_HERMITE(S0)(controlsNull2);

	var controls7 = [[-16,9,-1],[-14,11,-1],[0,4,0],[4,0,0]];
	var c7 = CUBIC_HERMITE(S0)(controls7);

	var controls8 = [[-14,11,-1],[0,11,-1],[0,0,0],[0,0,0]];
	var c8 = CUBIC_HERMITE(S0)(controls8);

	var controls9 = [[-16,9,-1],[-16,0,-1],[0,0,0],[0,0,0]];
	var c9 = CUBIC_HERMITE(S0)(controls9);

	var controlsNull3 = [[0,0,-0.95],[0,0,-0.95],[0,0,0],[0,0,0]];
	var cNull3 = CUBIC_HERMITE(S0)(controlsNull3);

	var controls23 = [[-14,9,-1],[-13.5,9.5,-1],[0,1,0],[1,0,0]];
	var c23 = CUBIC_HERMITE(S0)(controls23);

	var controls24 = [[-13.5,9.5,-1],[0,9.5,-1],[0,0,0],[0,0,0]];
	var c24 = CUBIC_HERMITE(S0)(controls24);

	var controls25 = [[-14,9,-1],[-14,0,-1],[0,0,0],[0,0,0]];
	var c25 = CUBIC_HERMITE(S0)(controls25);

	var controls29 = [[-13.5,8.5,-0.95],[-13,9,-0.95],[0,1,0],[1,0,0]];
	var c29 = CUBIC_HERMITE(S0)(controls29);

	var controls30 = [[-13,9,-0.95],[0,9,-0.95],[0,0,0],[0,0,0]];
	var c30 = CUBIC_HERMITE(S0)(controls30);

	var controls31 = [[-13.5,8.5,-0.95],[-13.5,0,-0.95],[0,0,0],[0,0,0]];
	var c31 = CUBIC_HERMITE(S0)(controls31);

	var s1 = MAP(CUBIC_HERMITE(S1)([c1,c4,[0,0,0.5],[0,0,0]]))(domain);
	var s2 = MAP(CUBIC_HERMITE(S1)([c2,c5,[0,0,0.5],[0,0,0]]))(domain);
	var s3 = MAP(CUBIC_HERMITE(S1)([c3,c6,[0,0,0.5],[0,0,0]]))(domain);

	var s4 = MAP(CUBIC_HERMITE(S1)([c1,cNull1,[0,0,0],[0,0,0]]))(domain);
	var s5 = MAP(CUBIC_HERMITE(S1)([c2,cNull1,[0,0,0],[0,0,0]]))(domain);
	var s6 = MAP(CUBIC_HERMITE(S1)([c3,cNull1,[0,0,0],[0,0,0]]))(domain);

	var s7 = MAP(CUBIC_HERMITE(S1)([c4,cNull2,[0,0,0],[0,0,0]]))(domain);
	var s8 = MAP(CUBIC_HERMITE(S1)([c5,cNull2,[0,0,0],[0,0,0]]))(domain);
	var s9 = MAP(CUBIC_HERMITE(S1)([c6,cNull2,[0,0,0],[0,0,0]]))(domain);

	var s10 = MAP(CUBIC_HERMITE(S1)([c1,c7,[0,0,0],[0,0,0]]))(domain);
	var s11 = MAP(CUBIC_HERMITE(S1)([c2,c8,[0,0,0],[0,0,0]]))(domain);
	var s12 = MAP(CUBIC_HERMITE(S1)([c3,c9,[0,0,0],[0,0,0]]))(domain);

	var s13 = MAP(CUBIC_HERMITE(S1)([c7,c23,[0,0,0],[0,0,0]]))(domain);
	var s14 = MAP(CUBIC_HERMITE(S1)([c8,c24,[0,0,0],[0,0,0]]))(domain);
	var s15 = MAP(CUBIC_HERMITE(S1)([c9,c25,[0,0,0],[0,0,0]]))(domain);

	var s34 = MAP(CUBIC_HERMITE(S1)([c23,c29,[0,0,0.1],[0,0,0]]))(domain);
	var s35 = MAP(CUBIC_HERMITE(S1)([c24,c30,[0,0,0.1],[0,0,0]]))(domain);
	var s36 = MAP(CUBIC_HERMITE(S1)([c25,c31,[0,0,0.1],[0,0,0]]))(domain);

	var s40 = MAP(CUBIC_HERMITE(S1)([c29,cNull3,[0,0,0],[0,0,0]]))(domain);
	var s41 = MAP(CUBIC_HERMITE(S1)([c30,cNull3,[0,0,0],[0,0,0]]))(domain);
	var s42 = MAP(CUBIC_HERMITE(S1)([c31,cNull3,[0,0,0],[0,0,0]]))(domain);	


	var controls10 = [[-16,9,0],[-14,11,0],[0,4,0],[4,0,0]];
	var c10 = CUBIC_HERMITE(S0)(controls10);

	var controls11 = [[-14,11,0],[0,11,0],[0,0,0],[0,0,0]];
	var c11 = CUBIC_HERMITE(S0)(controls11);

	var controls11_1 = [[-14,11,0],[-2.5,11,0],[0,0,0],[0,0,0]];
	var c11_1 = CUBIC_HERMITE(S0)(controls11_1);

	var controls11_2 = [[-2.5,11,0],[0,11,0],[0,0,0],[0,0,0]];
	var c11_2 = CUBIC_HERMITE(S0)(controls11_2);

	var controls12 = [[-16,9,0],[-16,0,0],[0,0,0],[0,0,0]];
	var c12 = CUBIC_HERMITE(S0)(controls12);

	var controls13 = [[-15,9,0.35],[-14,10,0.35],[0,2,0],[2,0,0]];
	var c13 = CUBIC_HERMITE(S0)(controls13);

	var controls14 = [[-14,10,0.35],[0,10,0.35],[0,0,0],[0,0,0]];
	var c14 = CUBIC_HERMITE(S0)(controls14);

	var controls15 = [[-15,9,0.35],[-15,0,0.35],[0,0,0],[0,0,0]];
	var c15 = CUBIC_HERMITE(S0)(controls15);

	var controlsNull10 = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
	var cNull10 = CUBIC_HERMITE(S0)(controlsNull10);
	var controlsNull20 = [[0,0,0.35],[0,0,0.35],[0,0,0],[0,0,0]];
	var cNull20 = CUBIC_HERMITE(S0)(controlsNull20);

	var controls16 = [[-16,9,-1],[-14,11,-1],[0,4,0],[4,0,0]];
	var c16 = CUBIC_HERMITE(S0)(controls16);

	var controls17 = [[-14,11,-1],[-2.5,11,-1],[0,0,0],[0,0,0]];
	var c17 = CUBIC_HERMITE(S0)(controls17);
	var controls17_1 = [[-2.5,11,-1],[-2.5,11,-1],[0,0,0],[0,0,0]];
	var c17_1 = CUBIC_HERMITE(S0)(controls17_1);

	var controls18 = [[-16,9,-1],[-16,0,-1],[0,0,0],[0,0,0]];
	var c18 = CUBIC_HERMITE(S0)(controls18);

	var controls26 = [[-14,2,-1],[-13.5,2.5,-1],[0,1,0],[1,0,0]];
	var c26 = CUBIC_HERMITE(S0)(controls26);

	var controls27 = [[-13.5,2.5,-1],[0,2.5,-1],[0,0,0],[0,0,0]];
	var c27 = CUBIC_HERMITE(S0)(controls27);

	var controls28 = [[-14,2,-1],[-14,0,-1],[0,0,0],[0,0,0]];
	var c28 = CUBIC_HERMITE(S0)(controls28);

	var controls32 = [[-13.5,1.5,-0.95],[-13,2,-0.95],[0,1,0],[1,0,0]];
	var c32 = CUBIC_HERMITE(S0)(controls32);

	var controls33 = [[-13,2,-0.95],[0,2,-0.95],[0,0,0],[0,0,0]];
	var c33 = CUBIC_HERMITE(S0)(controls33);

	var controls34 = [[-13.5,1.5,-0.95],[-13.5,0,-0.95],[0,0,0],[0,0,0]];
	var c34 = CUBIC_HERMITE(S0)(controls34);

	var controlsNull30 = [[0,0,-0.95],[0,0,-0.95],[0,0,0],[0,0,0]];
	var cNull30 = CUBIC_HERMITE(S0)(controlsNull30);
	var controlsNull31 = [[-3,2.5,-1],[0,2.5,-1],[0,0,0],[0,0,0]];
	var cNull31 = CUBIC_HERMITE(S0)(controlsNull31);
	var controlsNull32 = [[-3,0,-1],[-3,0,-1],[0,0,0],[0,0,0]];
	var cNull32 = CUBIC_HERMITE(S0)(controlsNull32);

	var controls19 = [[-2.5,10.8,-1],[-2.5,11,-0.8],[0,0,0.4],[0,0.4,0]];
	var c19 = CUBIC_HERMITE(S0)(controls19);

	var controls20 = [[0,10.8,-1],[0,11,-0.8],[0,0,0.4],[0,0.4,0]];
	var c20 = CUBIC_HERMITE(S0)(controls20);

	var controls21 = [[-2.5,10.8,-1],[0,10.8,-1],[0,0,0],[0,0,0]];
	var c21 = CUBIC_HERMITE(S0)(controls21);

	var controls22 = [[-2.5,11,-0.8],[0,11,-0.8],[0,0,0],[0,0,0]];
	var c22 = CUBIC_HERMITE(S0)(controls22);


	var s16 = MAP(CUBIC_HERMITE(S1)([c10,c13,[0,0,0.5],[0,0,0]]))(domain);
	var s17 = MAP(CUBIC_HERMITE(S1)([c11,c14,[0,0,0.5],[0,0,0]]))(domain);
	var s18 = MAP(CUBIC_HERMITE(S1)([c12,c15,[0,0,0.5],[0,0,0]]))(domain);

	var s19 = MAP(CUBIC_HERMITE(S1)([c10,cNull10,[0,0,0],[0,0,0]]))(domain);
	var s20 = MAP(CUBIC_HERMITE(S1)([c11,cNull10,[0,0,0],[0,0,0]]))(domain);
	var s20_1 = MAP(CUBIC_HERMITE(S1)([c11_1,cNull10,[0,0,0],[0,0,0]]))(domain);
	var s20_2 = MAP(CUBIC_HERMITE(S1)([c11_2,cNull10,[0,0,0],[0,0,0]]))(domain);
	var s21 = MAP(CUBIC_HERMITE(S1)([c12,cNull10,[0,0,0],[0,0,0]]))(domain);

	var s22 = MAP(CUBIC_HERMITE(S1)([c13,cNull20,[0,0,0],[0,0,0]]))(domain);
	var s23 = MAP(CUBIC_HERMITE(S1)([c14,cNull20,[0,0,0],[0,0,0]]))(domain);
	var s24 = MAP(CUBIC_HERMITE(S1)([c15,cNull20,[0,0,0],[0,0,0]]))(domain);

	var s25 = MAP(CUBIC_HERMITE(S1)([c10,c16,[0,0,0],[0,0,0]]))(domain);
	var s26_1 = MAP(CUBIC_HERMITE(S1)([c11_1,c17,[0,0,0],[0,0,0]]))(domain);
	var s26_2 = MAP(CUBIC_HERMITE(S1)([c11_2,c22,[0,0,0],[0,0,0]]))(domain);
	var s27 = MAP(CUBIC_HERMITE(S1)([c12,c18,[0,0,0],[0,0,0]]))(domain);

	var s28 = MAP(CUBIC_HERMITE(S1)([c16,c26,[0,0,0],[0,0,0]]))(domain);
	var s29 = MAP(CUBIC_HERMITE(S1)([c17,c27,[0,0,0],[0,0,0]]))(domain);
	var s30 = MAP(CUBIC_HERMITE(S1)([c18,c28,[0,0,0],[0,0,0]]))(domain);
	var s31 = MAP(CUBIC_HERMITE(S1)([c19,c20,[0,0,0],[0,0,0]]))(domain);
	var s32 = MAP(CUBIC_HERMITE(S1)([c21,cNull31,[0,0,0],[0,0,0]]))(domain);
	var s33 = MAP(CUBIC_HERMITE(S1)([c17_1,c19,[0,0,0],[0,0,0]]))(domain);

	var s37 = MAP(CUBIC_HERMITE(S1)([c26,c32,[0,0,0.1],[0,0,0]]))(domain);
	var s38 = MAP(CUBIC_HERMITE(S1)([c27,c33,[0,0,0.1],[0,0,0]]))(domain);
	var s39 = MAP(CUBIC_HERMITE(S1)([c28,c34,[0,0,0.1],[0,0,0]]))(domain);

	var s43 = MAP(CUBIC_HERMITE(S1)([c32,cNull30,[0,0,0],[0,0,0]]))(domain);
	var s44 = MAP(CUBIC_HERMITE(S1)([c33,cNull30,[0,0,0],[0,0,0]]))(domain);
	var s45 = MAP(CUBIC_HERMITE(S1)([c34,cNull30,[0,0,0],[0,0,0]]))(domain);

	var foot = T([0,1,2])([-13.5,8.5,0.36])(getFoot(domain));
	var surfacePart1 = STRUCT([s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,s34,s35,s36,s40,s41,s42,foot]);
	var surfacePart2 = R([0,1])(PI)(STRUCT([s16,s17,s18,s19,s20,s20_1,s20_2,s21,s22,s23,s24,s25,s26_1,s26_2,s27,s28,s29,s30,s31,s32,s33,s37,s38,s39,s43,s44,s45,foot]));
	var surfacePart3 = S([0])([-1])(surfacePart1);
	var surfacePart4 = S([0])([-1])(surfacePart2);
	var additionalPart1 = COLOR([0,0,0])(T([0,1,2])([-12.5,11.01,-1])(SIMPLEX_GRID([[23],[0.15],[1]])));
	var additionalPart2 = COLOR([0,0,0])(T([0,1,2])([-12.5,10,-1.01])(SIMPLEX_GRID([[23],[1.1],[0.015]])));

	var surface = STRUCT([surfacePart1,surfacePart2,surfacePart3,surfacePart4,additionalPart1,additionalPart2]);

	return surface;
};

var getKeyboard = function(){

	var functionKey = SIMPLEX_GRID([[1.743],[0.85],[0.1]]);
	var genericKey = SIMPLEX_GRID([[1.675],[1.675],[0.1]]);
	var backSpaceKey = SIMPLEX_GRID([[2.625],[1.675],[0.1]]);
	var enterKey = STRUCT([T([0])([0.4])(SIMPLEX_GRID([[1.275],[1.875],[0.1]])),T([1])([1.875])(genericKey)]);
	var capsLockKey = SIMPLEX_GRID([[3.015],[1.675],[0.1]]);
	var leftShiftKey = SIMPLEX_GRID([[2.175],[1.675],[0.1]]);
	var rightShiftKey = SIMPLEX_GRID([[4],[1.675],[0.1]]);
	var genericBotkey = SIMPLEX_GRID([[1.675],[1.7],[0.1]]);
	var spaceBarKey = SIMPLEX_GRID([[9.921],[1.7],[0.1]]);

	var arrow1 = functionKey;
	var arrow2 = T([0])([1.943])(arrow1);
	var arrow3 = T([1])([0.85])(arrow2);
	var arrow4 = T([0])([1.943])(arrow2);
	var arrows = STRUCT([arrow1,arrow2,arrow3,arrow4]);

	var t0 = T([0])([1.943]);
	var t1 = T([0])([1.875]);

	var firstLine = STRUCT(REPLICA(14)([functionKey,t0]));

	var secondLinePart1 = STRUCT(REPLICA(13)([genericKey,t1]));
	var secondLinePart2 = T([0])([24.375])(backSpaceKey);
	var secondLine = T([1])([-1.875])(STRUCT([secondLinePart1,secondLinePart2]));

	var thirdLinePart1 = T([0])([2.825])(STRUCT(REPLICA(12)([genericKey,t1])));
	var thirdLine = T([1])([-3.75])(STRUCT([backSpaceKey,thirdLinePart1])); 

	var fourthLinePart1 = T([0])([3.215])(STRUCT(REPLICA(12)([genericKey,t1])));
	var fourthLine = T([1])([-5.625])(STRUCT([capsLockKey,fourthLinePart1,T([0])([25.325])(enterKey)]));

	var fifthLinePart1 = T([0])([2.375])(STRUCT(REPLICA(11)([genericKey,t1])));
	var fifthLine = T([1])([-7.5])(STRUCT([leftShiftKey,fifthLinePart1,T([0])([23])(rightShiftKey)]));

	var sixthLinePart1 = STRUCT(REPLICA(4)([genericBotkey,t1]));
	var sixthLinePart2 = T([0])([17.621])(STRUCT(REPLICA(2)([genericBotkey,t1])));
	var sixthLine = T([1])([-9.4])(STRUCT([sixthLinePart1,T([0])([7.5])(spaceBarKey),sixthLinePart2,T([0])([21.371])(arrows)]));

	var keyboard = COLOR([0,0,0])(STRUCT([firstLine,secondLine,thirdLine,fourthLine,fifthLine,sixthLine]));

	return keyboard;
};

var getTouchPad = function(domain){

	var controls1 = [[-5,2.75,0],[-4.5,3.25,0],[0,1,0],[1,0,0]];
	var c1 = CUBIC_HERMITE(S0)(controls1);

	var controls2 = [[-4.5,3.25,0],[0,3.25,0],[0,0,0],[0,0,0]];
	var c2 = CUBIC_HERMITE(S0)(controls2);

	var controls3 = [[-5,2.75,0],[-5,0,0],[0,0,0],[0,0,0]];
	var c3 = CUBIC_HERMITE(S0)(controls3);

	var controlsNull1 = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
	var cNull1 = CUBIC_HERMITE(S0)(controlsNull1);

	var s1 = MAP(CUBIC_HERMITE(S1)([c1,cNull1,[0,0,0],[0,0,0]]))(domain);
	var s2 = MAP(CUBIC_HERMITE(S1)([c2,cNull1,[0,0,0],[0,0,0]]))(domain);
	var s3 = MAP(CUBIC_HERMITE(S1)([c3,cNull1,[0,0,0],[0,0,0]]))(domain);


	var surfacePart1 = STRUCT([s1,s2,s3]);
	var surfacePart2 = R([0,1])(PI)(surfacePart1);
	var surfacePart3 = S([0])([-1])(surfacePart1);
	var surfacePart4 = S([0])([-1])(surfacePart2);

	var surface = STRUCT([surfacePart1,surfacePart2,surfacePart3,surfacePart4]);

	return COLOR([0.9,0.9,0.9])(surface);
};

var getStartButton = function(domain){

	var domain1 = INTERVALS(1)(30);

	var controls1 = [[-0.2,0,0],[0,-0.2,0],[0,-0.36,0],[0.36,0,0]];
	var c1 = CUBIC_HERMITE(S0)(controls1);

	var controls2 = [[0.2,0,0],[0,-0.2,0],[0,-0.36,0],[-0.36,0,0]];
	var c2 = CUBIC_HERMITE(S0)(controls2);

	var controls3 = [[0.2,0,0],[0.1,0.15,0],[0,0.2,0],[-0.12,0,0]];
	var c3 = CUBIC_HERMITE(S0)(controls3);

	var controls4 = [[-0.2,0,0],[-0.1,0.15,0],[0,0.2,0],[0.12,0,0]];
	var c4 = CUBIC_HERMITE(S0)(controls4);

	var controls5 = [[0,0.05,0],[0,0.3,0],[0,0,0],[0,0,0]];
	var c5 = CUBIC_HERMITE(S0)(controls5);

	var s1 = MAP(c1)(domain1);
	var s2 = MAP(c2)(domain1);
	var s3 = MAP(c3)(domain1);
	var s4 = MAP(c4)(domain1);
	var s5 = MAP(c5)(domain1);

	var controls10 = [[-0.5,0,0],[0,-0.5,0],[0,-0.8,0],[0.8,0,0]];
	var c10 = CUBIC_HERMITE(S0)(controls10);

	var controlsNull = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
	var cNull = CUBIC_HERMITE(S0)(controlsNull);
	
	var s10 = MAP(CUBIC_HERMITE(S1)([c10,cNull,[0,0,0],[0,0,0]]))(domain);
	var s11 = R([0,1])(PI)(s10);
	var s12 = S([0])([-1])(s10);
	var s13 = S([0])([-1])(s11);
	var surfacePart1 = COLOR([0.9,0.9,0.9])(STRUCT([s10,s11,s12,s13]));

	var surface = S([0,1,2])([0.95,0.95,0.95])(R([0,1])(PI)(STRUCT([surfacePart1,s1,s2,s3,s4,s5])));

	return surface;
};

var getAdditionals = function(domain){

	var additional1Part1 = SIMPLEX_GRID([[0.015],[12.5],[0.2]]);
	var additional1Part2 = T([1])([0.4+12.5])(SIMPLEX_GRID([[0.015],[0.7],[0.2]]));

	var additional1 = T([1])([-1])(STRUCT([additional1Part1,additional1Part2]));

	var additional2Part1 = T([2])([-0.25])(SIMPLEX_GRID([[0.015],[1.2],[0.5]]));
	var additional2Part2 = T([1,2])([0.3+1.2,-0.4])(SIMPLEX_GRID([[0.015],[1.1],[0.8]]));
	var additional2Part3 = T([1,2])([1.6+0.2+1.1,-0.35])(SIMPLEX_GRID([[0.015],[0.8],[0.7]]));
	var additional2Part4 = T([1,2])([1.7+0.2+1.1+0.3+0.8,-0.2])(SIMPLEX_GRID([[0.015],[0.5],[0.4]]));
	var additional2Part5 = T([1,2])([1.8+0.2+1.1+0.3+0.8+0.3+0.5,-0.2])(SIMPLEX_GRID([[0.015],[1.3],[0.4]]));
	var additional2Part6 = T([1,2])([1.9+0.2+1.1+0.3+0.8+0.3+0.5+0.3+1.3,-0.2])(SIMPLEX_GRID([[0.015],[1.3],[0.4]]));
	var additional2Part7 = T([1,2])([2+0.2+1.1+0.3+0.8+0.3+0.5+0.6+2.6,-0.1])(SIMPLEX_GRID([[0.015],[2.6],[0.2]]));

	var controls = [[-0.2,0,0],[0,-0.2,0],[0,-0.3,0],[0.3,0,0]];
	var c = CUBIC_HERMITE(S0)(controls);

	var controlsNull = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
	var cNull = CUBIC_HERMITE(S0)(controlsNull);
		
	var s1 = MAP(CUBIC_HERMITE(S1)([c,cNull,[0,0,0],[0,0,0]]))(domain);
	var s2 = R([0,1])(PI)(s1);
	var s3 = S([0])([-1])(s1);
	var s4 = S([0])([-1])(s2);
	var additional2Part8 = T([1])([2.1+0.2+1.1+0.3+0.8+0.3+0.5+0.6+2.6+0.4+2.6])(R([0,2])(PI/2)(STRUCT([s1,s2,s3,s4])));

	var additional2 = T([0,1])([-32,-1.6])(STRUCT([additional2Part1,additional2Part2,additional2Part3,additional2Part4,additional2Part5,additional2Part6,additional2Part7,additional2Part8]));

	var additional3 = R([0,1])(PI/2)(T([0,1])([18.5,3])(SIMPLEX_GRID([[0.015],[1.1],[0.1]])));

	var additional = COLOR([0,0,0])(STRUCT([additional1,additional2,additional3]));

	return additional;
};

var getM = function(){	
	var domain = DOMAIN([[0,1],[0,1]])([15,30]);
	var domain1 = INTERVALS(1)(30);

	var controls1 = [[0,0,0],[0.5,0,0],[0,0,0],[0,0,0]];
	var c1 = CUBIC_HERMITE(S0)(controls1);
	var controls1_1 = [[0.55,6,0],[1.05,6,0],[0,0,0],[0,0,0]];
	var c1_1 = CUBIC_HERMITE(S0)(controls1_1);
	var s1 = MAP(CUBIC_HERMITE(S1)([c1,c1_1,[0,0,0],[0,0,0]]))(domain);

	var controls2 = [[0.85,6,0],[1.35,6,0],[0,0,0],[0,0,0]];
	var c2 = CUBIC_HERMITE(S0)(controls2);
	var controls2_1 = [[2.15,0,0],[2.6,0,0],[0,0,0],[0,0,0]];
	var c2_1 = CUBIC_HERMITE(S0)(controls2_1);
	var s2 = MAP(CUBIC_HERMITE(S1)([c2,c2_1,[0,0,0],[0,0,0]]))(domain);

	var controls3 = [[2.4,0,0],[2.85,0,0],[0,0,0],[0,0,0]];
	var c3 = CUBIC_HERMITE(S0)(controls3);
	var controls3_1 = [[3.65,6,0],[4.15,6,0],[0,0,0],[0,0,0]];
	var c3_1 = CUBIC_HERMITE(S0)(controls3_1);
	var s3 = MAP(CUBIC_HERMITE(S1)([c3,c3_1,[0,0,0],[0,0,0]]))(domain);

	var controls4 = [[3.95,6,0],[4.45,6,0],[0,0,0],[0,0,0]];
	var c4 = CUBIC_HERMITE(S0)(controls4);
	var controls4_1 = [[4.5,0,0],[5,0,0],[0,0,0],[0,0,0]];
	var c4_1 = CUBIC_HERMITE(S0)(controls4_1);
	var s4 = MAP(CUBIC_HERMITE(S1)([c4,c4_1,[0,0,0],[0,0,0]]))(domain);

	var surface = S([0])([1.2])(STRUCT([s1,s2,s3,s4]));

	return surface;
};

var getA = function(){

	var domain = DOMAIN([[0,1],[0,1]])([15,30]);
	var domain1 = INTERVALS(1)(30);

	var controls1 = [[2.5,0,0],[2.5,3.5,0],[0,0,0],[0,0,0]];
	var c1 = CUBIC_HERMITE(S0)(controls1);
	var controls1_1 = [[3,0,0],[3,3.5,0],[0,0,0],[0,0,0]];
	var c1_1 = CUBIC_HERMITE(S0)(controls1_1);
	var s1 = MAP(CUBIC_HERMITE(S1)([c1,c1_1,[0,0,0],[0,0,0]]))(domain);

	var controls2 = [[2.5,3,0],[0.25,3,0],[1.2,2.5,0],[0,-1.8,0]];
	var c2 = CUBIC_HERMITE(S0)(controls2);
	var controls2_1 = [[3,3.5,0],[0.25,3.5,0],[0,2.1,0],[0,-2.1,0]];
	var c2_1 = CUBIC_HERMITE(S0)(controls2_1);
	var s2 = MAP(CUBIC_HERMITE(S1)([c2,c2_1,[0,0,0],[0,0,0]]))(domain);

	var controls3 = [[3,1,0],[0,1,0],[0.5,-2.3,0],[0,5.8,0]];
	var c3 = CUBIC_HERMITE(S0)(controls3);
	var controls3_1 = [[3,1.5,0],[0.5,1,0],[0.5,-2,0],[0,3.6,0]];
	var c3_1 = CUBIC_HERMITE(S0)(controls3_1);
	var s3 = MAP(CUBIC_HERMITE(S1)([c3,c3_1,[0,0,0],[0,0,0]]))(domain);

	var controls4 = [[3,2.5,0],[0,1,0],[0,1.36,0],[0,-5.515,0]];
	var c4 = CUBIC_HERMITE(S0)(controls4);
	var controls4_1 = [[3,2,0],[0.5,1,0],[0,1.2,0],[0,-3.6,0]];
	var c4_1 = CUBIC_HERMITE(S0)(controls4_1);
	var s4 = MAP(CUBIC_HERMITE(S1)([c4,c4_1,[0,0,0],[0,0,0]]))(domain);

	var surface = STRUCT([s1,s2,s3,s4]);

	return surface;
};

var getC = function(){

	var domain = DOMAIN([[0,1],[0,1]])([15,30]);
	var domain1 = INTERVALS(1)(30);


	var controls1 = [[3,0.5,0],[0,2,0],[-2,-2.5,0],[0,6,0]];
	var c1 = CUBIC_HERMITE(S0)(controls1);
	var controls1_1 = [[3,1,0],[0.5,2,0],[-0.8,-2,0],[0,5.75,0]];
	var c1_1 = CUBIC_HERMITE(S0)(controls1_1);
	var s1 = MAP(CUBIC_HERMITE(S1)([c1,c1_1,[0,0,0],[0,0,0]]))(domain);
	var s2 = T([1])([4])(R([1,2])([PI])(s1));

	var surface = STRUCT([s1,s2]);

	return surface;
};

var getB = function(){

	var domain = DOMAIN([[0,1],[0,1]])([15,30]);
	var domain1 = INTERVALS(1)(30);


	var controls1 = [[3,0,0],[0,2,0],[0,0,0],[0,6,0]];
	var c1 = CUBIC_HERMITE(S0)(controls1);
	var controls1_1 = [[3,0.5,0],[0.5,2,0],[0,0,0],[0,4.5,0]];
	var c1_1 = CUBIC_HERMITE(S0)(controls1_1);
	var s1 = MAP(CUBIC_HERMITE(S1)([c1,c1_1,[0,0,0],[0,0,0]]))(domain);
	var s2 = T([1])([4])(R([1,2])([PI])(s1));

	var part1 = STRUCT([s1,s2]);
	var part2 = T([1])([3.5])(part1);
	var part3 = T([0,1])([2.5,0.25])(SIMPLEX_GRID([[0.5],[6.75],[0]]));

	var surface = S([1])([0.8])(T([0])([3])(R([0,2])(PI)(STRUCT([part1,part2,part3]))));

	return surface;
};

var getO = function(){

	var domain = DOMAIN([[0,1],[0,1]])([15,30]);
	var domain1 = INTERVALS(1)(30);


	var controls1 = [[1.5,0,0],[0,2,0],[0,0,0],[0,6.3,0]];
	var c1 = CUBIC_HERMITE(S0)(controls1);
	var controls1_1 = [[1.5,0.5,0],[0.5,2,0],[0,0,0],[0,4.7,0]];
	var c1_1 = CUBIC_HERMITE(S0)(controls1_1);
	var s1 = MAP(CUBIC_HERMITE(S1)([c1,c1_1,[0,0,0],[0,0,0]]))(domain);
	var s2 = T([1])([4])(R([1,2])(PI)(s1));

	var part1 = STRUCT([s1,s2]);
	var part2 = T([0])([3])(R([0,2])(PI)(part1));

	var surface = STRUCT([part1,part2]);

	return surface;
};

var getK = function(){

	var domain = DOMAIN([[0,1],[0,1]])([15,30]);
	var domain1 = INTERVALS(1)(30);

	var part1 = SIMPLEX_GRID([[0.5],[6],[0]]);

	var controls1 = [[0.5,2.5,0],[2.5,0.25,0],[0,0,0],[0,0,0]];
	var c1 = CUBIC_HERMITE(S0)(controls1);
	var controls1_1 = [[0.5,3,0],[3,0.25,0],[0,0,0],[0,0,0]];
	var c1_1 = CUBIC_HERMITE(S0)(controls1_1);
	var s1 = MAP(CUBIC_HERMITE(S1)([c1,c1_1,[0,0,0],[0,0,0]]))(domain);

	var controls2 = [[0.5,2.5,0],[3,4.25,0],[0,0,0],[0,0,0]];
	var c2 = CUBIC_HERMITE(S0)(controls2);
	var controls2_1 = [[0.5,3,0],[2.5,4.25,0],[0,0,0],[0,0,0]];
	var c2_1 = CUBIC_HERMITE(S0)(controls2_1);
	var s2 = MAP(CUBIC_HERMITE(S1)([c2,c2_1,[0,0,0],[0,0,0]]))(domain);

	var surface = STRUCT([part1,s1,s2]);
	
	return surface;
};

var getP = function(){

	var domain = DOMAIN([[0,1],[0,1]])([15,30]);
	var domain1 = INTERVALS(1)(30);


	var controls1 = [[3,0,0],[0,2,0],[0,0,0],[0,6,0]];
	var c1 = CUBIC_HERMITE(S0)(controls1);
	var controls1_1 = [[3,0.5,0],[0.5,2,0],[0,0,0],[0,4.5,0]];
	var c1_1 = CUBIC_HERMITE(S0)(controls1_1);
	var s1 = MAP(CUBIC_HERMITE(S1)([c1,c1_1,[0,0,0],[0,0,0]]))(domain);
	var s2 = T([1])([4])(R([1,2])([PI])(s1));

	var part1 = STRUCT([s1,s2]);
	var part2 = T([1])([3.5])(part1);
	var part3 = T([0])([2.5])(SIMPLEX_GRID([[0.5],[7],[0]]));

	var surface = S([1])([0.8])(T([0])([3])(R([0,2])(PI)(STRUCT([part2,part3]))));

	return surface;
};

var getR = function(){

	var domain = DOMAIN([[0,1],[0,1]])([15,30]);
	var domain1 = INTERVALS(1)(30);


	var controls1 = [[1.5,0,0],[0,2,0],[0,0,0],[0,6.3,0]];
	var c1 = CUBIC_HERMITE(S0)(controls1);
	var controls1_1 = [[1.5,0.5,0],[0.5,2,0],[0,0,0],[0,4.7,0]];
	var c1_1 = CUBIC_HERMITE(S0)(controls1_1);
	var s1 = R([1,2])(PI)(MAP(CUBIC_HERMITE(S1)([c1,c1_1,[0,0,0],[0,0,0]]))(domain));

	var part1 = T([1])([4])(s1);
	var part2 = SIMPLEX_GRID([[0.5],[4],[0]]);

	var surface = STRUCT([part1,part2]);

	return surface;
};

var getName = function(){

	var m = getM();
	var a = getA();
	var c = getC();
	var b = getB();
	var o = getO();
	var k = getK();
	var p = getP();
	var r = getR();

	var d = 3.3;

	a = T([0])([3+d])(a);
	c = T([0])([3+2*d])(c);
	b = T([0])([3+3*d])(b);
	o1 = T([0])([3+4*d])(o);
	o2 = T([0])([3+5*d])(o);
	k = T([0])([3+6*d])(k);
	p = T([0])([3+7*d+1.5])(p);
	r = T([0])([3+8*d+1.5])(r);
	o3 = T([0])([3+8*d+1.5+1/2*d])(o);

	var name = T([0])([-16.5])(STRUCT([m,a,c,b,o1,o2,k,p,r,o3]));
	var macBookPro = R([0,1])(PI)(R([1,2])(PI-PI/1.6)(name));

	return macBookPro;
};


var domain = DOMAIN([[0,1],[0,1]])([15,30]);

var additionals = T([0,1,2])([-15.99,-7.5,0.5])(R([0,2])(PI)(getAdditionals(domain)));
var startButton = T([0,1,2])([-14.75,-9.75,1.02])(getStartButton(domain));
var touchPad = T([1,2])([6.8,1.05])(getTouchPad(domain));
var keyboard = T([0,1,2])([13.5,-7.8,0.95])(R([0,1])([PI])(getKeyboard()));
var upperPart = T([1,2])([-15.5,10])(R([1,2])(PI/1.6)(getUpperPart(domain)));
var bottomPart = R([1,2])(PI)(getBottompart(domain));
var macName = T([1,2])([-11.6,1.25])(S([0,1,2])([0.15,0.15,0.15])(getName()));

/* variable containing MacBook Pro 13" model */
var scmodel = STRUCT([bottomPart,keyboard,upperPart,touchPad,startButton,additionals,macName]);



