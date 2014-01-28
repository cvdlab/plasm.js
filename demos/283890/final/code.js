/* Villa Almerico Capra 
	Nella modellazione della villa ho cercato di ridurre al minimo l'utilizzo di rotazioni e di struct, poichè rallentano la visualizzazione della villa in Plasm */

/* Definizione dei domini utili alla rappresentazione della villa */
var domain2 = DOMAIN([[0,1],[0,1]])([50,50]);
var domaincc = DOMAIN([[0,1],[0,2*PI]])([50,50]);


/* Rappresento un quarto delle fondamenta, con l'intezione poi di usarlo come base per modellare la restante parte delle fondamenta */

	/* Definizione del primo strato delle fondamenta */
	var basement1 = COLOR([1,0.937,0.835])(SIMPLEX_GRID([[9.89],[9.89],[0.57]]));
	var basement2 = COLOR([1,0.937,0.835])(SIMPLEX_GRID([[-9.89,0.69,-1.61,1.61],[5.75],[0.57]]));
	var basement3 = COLOR([0.827,0.827,0.827])(SIMPLEX_GRID([[-9.89,-3.91,5.75],[-4.37,1.38],[0.57]]));
	var basement4 = COLOR([1,0.937,0.835])(SIMPLEX_GRID([[5.75],[-9.89,0.69,-1.61,1.61],[0.57]]));
	var basement5 = COLOR([0.827,0.827,0.827])(SIMPLEX_GRID([[-4.37,1.38],[-9.89,-3.91,5.75],[0.57]]));
	var basement6 = COLOR([1,0.937,0.835])(SIMPLEX_GRID([[-9.89,-0.69,1.61],[5.75]]));
	var basement7 = COLOR([1,0.937,0.835])(SIMPLEX_GRID([[5.75],[-9.89,-0.69,1.61]]));
	var basement8 = COLOR([1,0.972,0.972])(SIMPLEX_GRID([[-9.89,-3.91,2.61],[4.37]]));
	var basement9 = R([0,1])(PI/2)(T([1])([-4.37])(COLOR([1,0.972,0.972])(SIMPLEX_GRID([[-9.89,-3.91,2.61],[4.37]]))));


	/* Definizione delle vie principali che portano alle scalinate */
	var street1 = COLOR([0.823,0.705,0.549])(SIMPLEX_GRID([[-19.542,5.197],[4.37]]));
	var street2 = COLOR([0.823,0.705,0.549])(SIMPLEX_GRID([[4.37],[-19.542,5.197]]));


	/* Definizione del prato che circonda la villa */
	var green1 = COLOR([0.196,0.804,0.196])(SIMPLEX_GRID([[-9.89,14.88],[-4.37,-1.38,4.14]]));
	var green2 = COLOR([0.196,0.804,0.196])(SIMPLEX_GRID([[-4.37,-1.38,4.14],[-9.89,14.88]]));
	var green3 = COLOR([0.196,0.804,0.196])(SIMPLEX_GRID([[-9.89,14.849],[-4.14,-1.61,-4.14,14.88]]));
	var green4 = COLOR([0.196,0.804,0.196])(SIMPLEX_GRID([[-19.542,5.188],[-4.37,1.848]]));
	var green5 = COLOR([0.196,0.804,0.196])(SIMPLEX_GRID([[-4.37,1.848],[-19.542,5.188]]));


	/* Definizione del secondo strato delle fondamenta */
	var basement1layer1 = COLOR([1,0.937,0.835])(SIMPLEX_GRID([[9.84],[9.84],[-0.57,0.57]]));
	var basement2layer1 = COLOR([1,0.937,0.835])(SIMPLEX_GRID([[-9.84,0.05,0.69,-1.61,1.61],[5.7],[-0.57,0.57]]));
	var basement3layer1 = COLOR([0.827,0.827,0.827])(SIMPLEX_GRID([[-9.84,-3.96,5.7],[-4.37,1.33],[-0.57,0.57]]));
	var basement4layer1 = COLOR([1,0.937,0.835])(SIMPLEX_GRID([[5.7],[-9.84,0.05,0.69,-1.61,1.61],[-0.57,0.57]]));
	var basement5layer1 = COLOR([0.827,0.827,0.827])(SIMPLEX_GRID([[-4.37,1.33],[-9.84,-3.96,5.7],[-0.57,0.57]]));


	/* Definizione del terzo strato delle fondamenta, incluse le finestre e gli spazi vuoti interni */
	var basement1layer2part1 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[6.62],[6.62],[-1.14,1.38]]));
	var basement1layer2part2 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-6.62,-0.92,2.25],[6.62],[-1.14,1.38]]));
	var basement1layer2part3 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[6.62],[-6.62,-0.92,2.25],[-1.14,1.38]]));
	var basement1layer2part4 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-7.54,2.25],[-7.54,2.25],[-1.14,1.38]]));
	var basement1layer2part2a = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-6.62,0.92],[-7.54,2.25],[-1.14,0.23]]));
	var basement1layer2part2b = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-6.62,0.92],[-7.54,2.25],[-1.14,-1.15,0.23]]));
	var basement1layer2part3a = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-7.54,2.25],[-6.62,0.92],[-1.14,0.23]]));
	var basement1layer2part3b = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-7.54,2.25],[-6.62,0.92],[-1.14,-1.15,0.23]]));
	var basement2layer2 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-9.79,0.1,0.69,-1.61,1.61],[5.65],[-1.14,1.38]]));
	var basement3layer2 = COLOR([0.92,0.92,0.92])(SIMPLEX_GRID([[-9.79,-4.01,-0.92,4.73],[-4.37,1.28],[-1.14,1.38]]));
	var basement3layer2part1 = COLOR([0.92,0.92,0.92])(SIMPLEX_GRID([[-9.79,-4.01,0.92],[-4.37,1.28],[-1.14,0.23]]));
	var basement3layer2part2 = COLOR([0.92,0.92,0.92])(SIMPLEX_GRID([[-9.79,-4.01,0.92],[-4.37,1.28],[-1.14,-1.15,0.23]]));
	var basement4layer2 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[5.65],[-9.79,0.1,0.69,-1.61,1.61],[-1.14,1.38]]));
	var basement5layer2 = COLOR([0.92,0.92,0.92])(SIMPLEX_GRID([[-4.37,1.28],[-9.79,-4.01,-0.92,4.73],[-1.14,1.38]]));
	var basement5layer2part1 = COLOR([0.92,0.92,0.92])(SIMPLEX_GRID([[-4.37,1.28],[-9.79,-4.01,0.92],[-1.14,0.23]]));
	var basement5layer2part2 = COLOR([0.92,0.92,0.92])(SIMPLEX_GRID([[-4.37,1.28],[-9.79,-4.01,0.92],[-1.14,-1.15,0.23]]));


	/* Definizione delle grate */
	var grataEastPart1 = T([0,1,2])([6.62,9.675,1.37])(COLOR([0.33,0.33,0.33])(SIMPLEX_GRID([[-0.164,0.025,-0.164,0.025,-0.164,0.025,-0.164,0.025,-0.164],[0.02],[0.92]])));
	var grataEastPart2 = T([0,1,2])([6.62,9.675,1.37])(COLOR([0.33,0.33,0.33])(SIMPLEX_GRID([[0.92],[0.02],[-0.164,0.025,-0.164,0.025,-0.164,0.025,-0.164,0.025,-0.164]])));
	var grataSouthPart1 = T([0,1,2])([9.675,6.62,1.37])(COLOR([0.33,0.33,0.33])(SIMPLEX_GRID([[0.02],[-0.164,0.025,-0.164,0.025,-0.164,0.025,-0.164,0.025,-0.164],[0.92]])));
	var grataSouthPart2 = T([0,1,2])([9.675,6.62,1.37])(COLOR([0.33,0.33,0.33])(SIMPLEX_GRID([[0.02],[0.92],[-0.164,0.025,-0.164,0.025,-0.164,0.025,-0.164,0.025,-0.164]])));
	var grataSouthStairsPart1 = T([0,1,2])([13.8,5.535,1.37])(COLOR([0.33,0.33,0.33])(SIMPLEX_GRID([[-0.164,0.025,-0.164,0.025,-0.164,0.025,-0.164,0.025,-0.164],[0.02],[0.92]])));
	var grataSouthStairsPart2 = T([0,1,2])([13.8,5.535,1.37])(COLOR([0.33,0.33,0.33])(SIMPLEX_GRID([[0.92],[0.02],[-0.164,0.025,-0.164,0.025,-0.164,0.025,-0.164,0.025,-0.164]])));
	var grataEastStairsPart1 = T([0,1,2])([5.535,13.8,1.37])(COLOR([0.33,0.33,0.33])(SIMPLEX_GRID([[0.02],[-0.164,0.025,-0.164,0.025,-0.164,0.025,-0.164,0.025,-0.164],[0.92]])));
	var grataEastStairsPart2 = T([0,1,2])([5.535,13.8,1.37])(COLOR([0.33,0.33,0.33])(SIMPLEX_GRID([[0.02],[0.92],[-0.164,0.025,-0.164,0.025,-0.164,0.025,-0.164,0.025,-0.164]])));


	/* Definizione degli archi e delle volte sei sottopassaggi delle fondamenta */
	var archMapping1 = CUBIC_HERMITE(S0)([[10.58,5.65,1.93],[12.19,5.65,1.93],[0,0,2],[0,0,-2]]);
	var archMapping2 = CUBIC_HERMITE(S0)([[10.58,0,1.93],[12.19,0,1.93],[0,0,2],[0,0,-2]]);
	var arcs = BEZIER(S1)([archMapping1,archMapping2]);
	var tunnel1 = COLOR([1,0.972,0.863])(MAP(arcs)(domain2));
	var tunnel2 = R([0,1])(PI/2)(T([1])([-5.65])(tunnel1));
	var topTunnel1 = CUBIC_HERMITE(S0)([[10.58,5.65,2.52],[12.19,5.65,2.52],[0,0,0],[0,0,0]]);
	var cover1 = BEZIER(S1)([archMapping1,topTunnel1]);
	var frontTunnel1 = COLOR([1,0.972,0.863])(MAP(cover1)(domain2));
	var frontTunnel2 = R([0,1])(PI/2)(T([1])([-11.3])(frontTunnel1));


	/* Definizione del quarto strato delle fondamenta */
	var basement1layer3 = COLOR([1,0.937,0.835])(SIMPLEX_GRID([[9.84],[9.84],[-2.52,0.46]]));
	var basement2layer3 = COLOR([1,0.937,0.835])(SIMPLEX_GRID([[-9.84,3.96],[5.7],[-2.52,0.46]]));
	var basement3layer3 = COLOR([0.827,0.827,0.827])(SIMPLEX_GRID([[-9.84,-3.96,5.7],[-4.37,1.33],[-2.52,0.46]]));
	var basement4layer3 = COLOR([1,0.937,0.835])(SIMPLEX_GRID([[5.7],[-9.84,3.96],[-2.52,0.46]]));
	var basement5layer3 = COLOR([0.827,0.827,0.827])(SIMPLEX_GRID([[-4.37,1.33],[-9.84,-3.96,5.7],[-2.52,0.46]]));


	/* Definizione delle scalinate */
	var s = [];
	s.push(SIMPLEX_GRID([[-9.66,-4.14,0.261],[4.37],[-2.71,0.135]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-0.261,0.261],[4.37],[-2.575,0.135]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-0.522,0.261],[4.37],[-2.44,0.135]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-0.783,0.261],[4.37],[-2.305,0.135]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-1.044,0.261],[4.37],[-2.17,0.135]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-1.305,0.261],[4.37],[-2.035,0.135]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-1.566,0.261],[4.37],[-1.9,0.135]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-1.827,0.261],[4.37],[-1.63,0.27]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-2.088,0.261],[4.37],[-1.09,0.675]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-2.349,0.261],[4.37],[-0.55,1.08]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-2.349,0.522],[4.37],[1.495]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-2.349,0.783],[4.37],[1.36]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-2.349,1.044],[4.37],[1.225]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-2.349,1.305],[4.37],[1.09]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-2.349,1.566],[4.37],[0.955]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-2.349,1.827],[4.37],[0.82]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-2.349,2.088],[4.37],[0.685]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-2.349,2.349],[4.37],[0.55]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-2.349,2.61],[4.37],[0.415]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-2.349,2.871],[4.37],[0.28]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-2.349,3.132],[4.37],[0.145]]));
	s.push(SIMPLEX_GRID([[-9.66,-4.14,-2.349,3.393],[4.37],[0.01]]));
	var steps = COLOR([1,0.972,0.972])(STRUCT(s));
	var steps2 = R([0,1])(PI/2)(T([1])([-4.37])(steps));


/* Vengono uniti i componenti che costituiscono 1/4 delle fondamenta */
var basementSE = STRUCT([steps, steps2, basement1,basement2, basement3, basement4, basement5, basement1layer1, basement2layer1, basement3layer1,
	basement4layer1, basement5layer1, basement1layer2part1, basement1layer2part2, basement1layer2part3, basement1layer2part4,
	basement1layer2part2a, basement1layer2part3a, basement1layer2part2b, basement1layer2part3b, basement2layer2, basement3layer2, basement4layer2, basement5layer2,
	basement1layer3,basement2layer3,basement3layer3,basement4layer3,basement5layer3,basement3layer2part1,basement3layer2part2,basement5layer2part1,
	basement5layer2part2, basement6, basement7, basement8, basement9, street1, street2, green1, green2, green3, green4, green5, tunnel1, tunnel2,
	frontTunnel1,frontTunnel2,grataEastPart1,grataEastPart2,grataSouthPart1,grataSouthPart2,grataSouthStairsPart1, grataSouthStairsPart2, grataEastStairsPart1, grataEastStairsPart2]);


/* Generazione della restante parte delle fondamenta*/
var basementSW = R([0,1])(PI/2)(basementSE);
var basementNE = R([0,1])(PI)(basementSE);
var basementNW = R([0,1])(PI/2)(basementNE);

/* Posizionamento finale delle fondamenta complete */
var basementSEtraslated = T([0,1])([9.83,9.83]) (basementSE);
var basementSWtraslated = T([0,1])([9.83,9.83]) (basementSW);
var basementNEtraslated = T([0,1])([9.83,9.83]) (basementNE);
var basementNWtraslated = T([0,1])([9.83,9.83]) (basementNW);



/* Da qua in poi lavorerò alla definizione del palazzo vero e proprio, non più in quarti */


	/* Definizione del primo strato dei muri esterni */
	var groundfloorSouthwall = COLOR([1,0.937,0.835])(SIMPLEX_GRID([[0.46,-18.76,0.46],[8.92,-1.84,8.92],[-2.98,0.46]]));
	var groundfloorEastwall = COLOR([1,0.937,0.835])(SIMPLEX_GRID([[-0.46,8.46,-1.84,8.46],[0.46,-18.76,0.46],[-2.98,0.46]]));
	var groundfloorSouthPorticwall = T([0])([-3.22])(COLOR([1,0.937,0.835])(SIMPLEX_GRID([[3.22,-19.68,3.22],[-4.14,0.46,-10.48,0.46],[-2.98,0.46]])));
	var groundfloorEastPorticwall = T([1])([-3.22])(COLOR([1,0.937,0.835])(SIMPLEX_GRID([[-4.14,0.46,-10.48,0.46],[3.22,-19.68,3.22],[-2.98,0.46]])));


	/* Definizione del secondo strato dei muri esterni */
	var groundfloorSouthwallLayer1 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,0.41,-18.76,0.41],[-0.05,8.87,-1.84,8.87],[-3.44,0.575]]));
	var groundfloorEastwallLayer1 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-0.41,8.46,-1.84,8.46],[-0.05,0.41,-18.76,0.41],[-3.44,0.575]]));
	var groundfloorSouthPorticwallLayer1 = T([0])([-3.22])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,3.22,-19.58,3.22],[-4.19,0.41,-10.48,0.41],[-3.44,0.575]])));
	var groundfloorEastPorticwallLayer1 = T([1])([-3.22])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-4.19,0.41,-10.48,0.41],[-0.05,3.22,-19.58,3.22],[-3.44,0.575]])));


	/* Definizione del terzo strato dei muri esterni */
	var groundfloorSouthwallLayer2 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,0.41,-18.76,0.41],[-0.05,2.25,-0.92,2.3,-0.92,0.92,-0.92,0.64,-1.84,0.64,-0.92, 0.92,-0.92,2.3,-0.92,2.25],[-4.015,1.84]]));
	var groundfloorEastwallLayer2 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-0.41,1.84,-0.92,2.3,-0.92,2.48,-1.84,2.48,-0.92,2.3,-0.92,1.84],[-0.05,0.41,-18.76,0.41],[-4.015,1.84]]));
	var groundfloorSouthPorticwallLayer2 = T([0])([-3.22])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,0.805,-1.61,0.805,-19.58,0.805,-1.61,0.805],[-4.19,0.41,-10.48,0.41],[-4.015,1.84]])));
	var groundfloorEastPorticwallLayer2 = T([1])([-3.22])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-4.19,0.41,-10.48,0.41],[-0.05,0.805,-1.61,0.805,-19.58,0.805,-1.61,0.805],[-4.015,1.84]])));


	/* Definizione del quarto strato dei muri esterni */
	var groundfloorSouthwallLayer3part1 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,0.41,-18.76,0.41],[-0.05,8.87,-1.84,8.87],[-5.855,1.495]]));
	var groundfloorSouthwallLayer3part2 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,0.41,-18.76,0.41],[-0.05,5.585,-0.69,1.15,-0.69,0.755,-1.84,0.755,-0.69,1.15,-0.69,5.585],[-5.855,-1.495,0.69]]));
	var groundfloorEastwallLayer3 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-0.41,8.46,-1.84,8.46],[-0.05,0.41,-18.76,0.41],[-5.855,2.185]]));
	var groundfloorSouthPorticwallLayer3 = T([0])([-3.22])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,0.805,-1.61,0.805,-19.58,0.805,-1.61,0.805],[-4.19,0.41,-10.48,0.41],[-5.855,0.46]])));
	var groundfloorSouthPorticwallLayer3a = T([0])([-3.22])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[0.9125,-1.495,0.8625,-19.58,0.8625,-1.495,0.9125],[-4.14,0.51,-10.38,0.51],[-5.855,-0.46,0.46]])));
	var groundfloorSouthPorticwallLayer3b = T([0])([-3.22])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,0.805,-1.61,0.805,-19.58,0.805,-1.61,0.805],[-4.19,0.41,-10.48,0.41],[-5.855,-0.46,-0.46,1.265]])));
	var groundfloorEastPorticwallLayer3 = T([1])([-3.22])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-4.19,0.41,-10.48,0.41],[-0.05,0.805,-1.61,0.805,-19.58,0.805,-1.61,0.805],[-5.855,0.46]])));
	var groundfloorEastPorticwallLayer3a = T([1])([-3.22])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-4.14,0.51,-10.38,0.51],[0.9125,-1.495,0.8625,-19.58,0.8625,-1.495,0.9125],[-5.855,-0.46,0.46]])));
	var groundfloorEastPorticwallLayer3b = T([1])([-3.22])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-4.19,0.41,-10.48,0.41],[-0.05,0.805,-1.61,0.805,-19.58,0.805,-1.61,0.805],[-5.855,-0.46,-0.46,1.265]])));

	/* Definizione degli archi dei portici */
	var archMapping1Portic = CUBIC_HERMITE(S0)([[0.855,4.19,6.775],[2.465,4.19,6.775],[0,0,3],[0,0,-3]]);
	var archMapping2Portic = CUBIC_HERMITE(S0)([[0.855,4.6,6.775],[2.465,4.6,6.775],[0,0,3],[0,0,-3]]);
	var arcsPortic = BEZIER(S1)([archMapping1Portic,archMapping2Portic]);
	var tunnel1Portic = T([0])([-3.22])(COLOR([1,0.972,0.863])(MAP(arcsPortic)(domain2)));
	var topTunnel1Portic = CUBIC_HERMITE(S0)([[0.855,4.19,8.04],[2.465,4.19,8.04],[0,0,0],[0,0,0]]);
	var topTunnel2Portic = CUBIC_HERMITE(S0)([[0.855,4.6,8.04],[2.465,4.6,8.04],[0,0,0],[0,0,0]]);
	var cover1Portic = BEZIER(S1)([archMapping1Portic,topTunnel1Portic]);
	var cover2Portic = BEZIER(S1)([archMapping2Portic,topTunnel2Portic]);
	var frontTunnel1Portic = T([0])([-3.22])(COLOR([1,0.972,0.863])(MAP(cover1Portic)(domain2)));
	var frontTunnel2Portic = T([0])([-3.22])(COLOR([1,0.972,0.863])(MAP(cover2Portic)(domain2)));

	var southPorticArc1 = STRUCT([tunnel1Portic,frontTunnel1Portic,frontTunnel2Portic]);
	var southPorticArc2 = T([1])([10.89])(southPorticArc1);
	var northPorticArc1 = T([0])([22.8])(southPorticArc1);
	var northPorticArc2 = T([1])([10.89])(northPorticArc1);

	var eastPorticArc1 = R([0,1])(PI/2)(T([1])([-8.79])(southPorticArc1));
	var eastPorticArc2 = T([0])([10.89])(eastPorticArc1);
	var westPorticArc1 = T([1])([22.8])(eastPorticArc1);
	var westPorticArc2 = T([0])([10.89])(westPorticArc1);


	/* Definizione muro superiore centrale */
	var groundfloorSouthPorticwallDoor = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,0.41,-18.76,0.41],[-0.05,-8.87,1.84],[-6.775,1.265]]));
	var groundfloorEastPorticwallDoor = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-8.87,1.84],[-0.05,0.41,-18.76,0.41],[-6.775,1.265]]));


	/* Definizione del quinto strato dei muri esterni */
	var groundfloorSouthwallLayer4 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,0.41,-18.76,0.41],[-0.05,19.58],[-6.775,-1.265,0.46]]));
	var groundfloorEastwallLayer4 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-0.41,18.76],[-0.05,0.41,-18.76,0.41],[-6.775,-1.265,0.46]]));
	var groundfloorSouthPorticwallLayer4 = T([0])([-3.96])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,3.96,-19.58,3.96],[-4.19,11.3],[-8.04,0.46]])));
	var groundfloorEastPorticwallLayer4 = T([1])([-3.96])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-4.19,11.3],[-0.05,3.96,-19.58,3.96],[-8.04,0.46]])));


	/* Definizione del sesto strato dei muri esterni */
	var groundfloorSouthwallLayer5 = COLOR([1,0.937,0.835])(SIMPLEX_GRID([[-0.05,0.41,-18.76,0.41],[-0.05,19.58],[-8.5,0.115]]));
	var groundfloorEastwallLayer5 = COLOR([1,0.937,0.835])(SIMPLEX_GRID([[-0.05,-0.41,18.76],[-0.05,0.41,-18.76,0.41],[-8.5,0.115]]));
	var groundfloorSouthPorticwallLayer5 = T([0])([-3.96])(COLOR([1,0.937,0.835])(SIMPLEX_GRID([[-0.05,3.96,-19.58,3.96],[-4.19,11.3],[-8.5,0.115]])));
	var groundfloorEastPorticwallLayer5 = T([1])([-3.96])(COLOR([1,0.937,0.835])(SIMPLEX_GRID([[-4.19,11.3],[-0.05,3.96,-19.58,3.96],[-8.5,0.115]])));


	/* Definizione del settimo strato dei muri esterni */
	var groundfloorSouthwallLayer6 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[0.46,-18.76,0.46],[19.68],[-8.615,0.23]]));
	var groundfloorEastwallLayer6 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.46,18.86],[0.46,-18.76,0.46],[-8.615,0.23]]));
	var groundfloorSouthPorticwallLayer6 = T([0])([-3.96])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[4.01,-19.58,4.01],[-4.14,11.4],[-8.615,0.345]])));
	var groundfloorEastPorticwallLayer6 = T([1])([-3.96])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-4.14,11.4],[4.01,-19.58,4.01],[-8.615,0.345]])));


	/* Definizione dei muri esterni del primo piano, primo strato */
	var firstfloorSouthwall = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,0.41,-18.76,0.41],[-0.05,19.58],[-8.845,0.46]]));
	var firstfloorEastwall = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-0.41,18.76],[-0.05,0.41,-18.76,0.41],[-8.845,0.46]]));
	var firstfloorSouthPorticwall = T([0])([-3.96])(COLOR([1,0.937,0.835])(SIMPLEX_GRID([[4.01,-19.58,4.01],[-4.04,11.6],[-8.845,0.345]])));
	var firstfloorEastPorticwall = T([1])([-3.96])(COLOR([1,0.937,0.835])(SIMPLEX_GRID([[-4.04,11.6],[4.01,-19.58,4.01],[-8.845,0.345]])));


	/* Definizione dei muri esterni del primo piano, secondo strato */
	var firstfloorSouthwallLayer1 = COLOR([1,0.937,0.835])(SIMPLEX_GRID([[0.46,-18.76,0.46],[19.68],[-9.305,0.115]]));
	var firstfloorEastwallLayer1 = COLOR([1,0.937,0.835])(SIMPLEX_GRID([[-0.46,18.86],[0.46,-18.76,0.46],[-9.305,0.115]]));


	/* Definizione dei muri esterni del primo piano, terzo strato */
	var firstfloorSouthwallLayer2 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,0.41,-18.76,0.41],[-0.05,19.58],[-9.42,0.46]]));
	var firstfloorEastwallLayer2 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-0.41,18.76],[-0.05,0.41,-18.76,0.41],[-9.42,0.46]]));


	/* Definizione dei muri esterni del primo piano, quarto strato */
	var firstfloorSouthwallLayer3 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,0.41,-18.76,0.41],[-0.05,2.25,-0.92,2.3,-0.92,6.8,-0.92,2.3,-0.92,2.25],[-9.88,1.15]]));
	var firstfloorEastwallLayer3 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-0.41,1.84,-0.92,2.3,-0.92,6.8,-0.92,2.3,-0.92,1.84],[-0.05,0.41,-18.76,0.41],[-9.88,1.15]]));


	/* Definizione dei muri esterni del primo piano, quinto strato */
	var firstfloorSouthwallLayer4 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,0.41,-18.76,0.41],[-0.05,19.58],[-11.03,0.23]]));
	var firstfloorEastwallLayer4 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-0.41,18.76],[-0.05,0.41,-18.76,0.41],[-11.03,0.23]]));


	/* Definizione dei muri esterni del primo piano, sesto strato */
	var firstfloorSouthwallLayer5 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.025,0.435,-18.76,0.435],[-0.025,19.63],[-11.26,0.115]]));
	var firstfloorEastwallLayer5 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.025,-0.435,18.81],[-0.025,0.435,-18.76,0.435],[-11.26,0.115]]));


	/* Definizione dei muri esterni del primo piano, settimo strato */
	var firstfloorSouthwallLayer6 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[0.46,-18.76,0.46],[19.68],[-11.375,0.115]]));
	var firstfloorEastwallLayer6 = COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.46,18.86],[0.46,-18.76,0.46],[-11.375,0.115]]));


	/* Definizione delle finestre del piano terra */

	/* Finestre a Nord e Sud */
	var windowframe1Ground = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-0.05,-0.175,0.06,-19.11,0.06],[-0.05,-2.25,0.92,-2.3,0.92,-0.92,0.92,-3.12,0.92,-0.92,0.92,-2.3,0.92],[-4.015,0.08,-0.36,0.08,-0.36,0.08,-0.36,0.08,-0.36,0.08]]));
	var windowframe2Ground = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-0.05,-0.175,0.06,-19.11,0.06],[-0.05,-2.25,0.08,-0.3,0.16,-0.3,0.08,-2.3,0.08,-0.3,0.16,-0.3,0.08,-0.92,0.08,-0.3,0.16,-0.3,0.08,-3.12,0.08,-0.3,0.16,-0.3,0.08,-0.92,0.08,-0.3,0.16,-0.3,0.08,-2.3,0.08,-0.3,0.16,-0.3,0.08],
		[-4.015,-0.08,1.68]]));
	var windowpanel1Ground = COLOR([0.88,1,1,0.3])(SIMPLEX_GRID([[-0.05,-0.175,0.06,-19.11,0.06],[-0.05,-2.25,-0.08,0.3,-0.16,0.3,-2.46,0.3,-0.16,0.3,-1.08,0.3,-0.16,0.3,-3.28,0.3,-0.16,0.3,-1.08,0.3,-0.16,0.3,-2.46,0.3,-0.16,0.3],
		[-4.095,0.36,-0.08,0.36,-0.08,0.36,-0.08,0.36]]));

	var windowframe1GroundLittle = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-0.05,-0.175,0.06,-19.11,0.06],[-0.05,-5.585,0.69,-1.15,0.69,-3.35,0.69,-1.15,0.69],[-5.855,-1.495,0.05,-0.59,0.05]]));
	var windowframe2GroundLittle = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-0.05,-0.175,0.06,-19.11,0.06],[-0.05,-5.585,0.05,-0.245,0.1,-0.245,0.05,-1.15,0.05,-0.245,0.1,-0.245,0.05,-3.35,0.05,-0.245,0.1,-0.245,0.05,-1.15,0.05,-0.245,0.1,-0.245,0.05],
		[-5.855,-1.495,-0.05,0.59]]));
	var windowpanel1GroundLittle = COLOR([0.88,1,1,0.3])(SIMPLEX_GRID([[-0.05,-0.175,0.06,-19.11,0.06],[-0.05,-5.585,-0.05,0.245,-0.1,0.245,-0.05,-1.15,-0.05,0.245,-0.1,0.245,-0.05,-3.35,-0.05,0.245,-0.1,0.245,-0.05,-1.15,-0.05,0.245,-0.1,0.245],[-5.855,-1.495,-0.05,0.59]]));

	/* Finestre ad Est ed Ovest */
	var windowframe3Ground = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-0.05,-0.41,-1.84,0.92,-2.3,0.92,-6.8,0.92,-2.3,0.92],[-0.05,-0.175,0.06,-19.11,0.06],[-4.015,0.08,-0.36,0.08,-0.36,0.08,-0.36,0.08,-0.36,0.08]]));
	var windowframe4Ground = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-0.05,-0.41,-1.84,0.08,-0.3,0.16,-0.3,0.08,-2.3,0.08,-0.3,0.16,-0.3,0.08,-6.8,0.08,-0.3,0.16,-0.3,0.08,-2.3,0.08,-0.3,0.16,-0.3,0.08],[-0.05,-0.175,0.06,-19.11,0.06],[-4.015,-0.08,1.68]]));
	var windowpanel2Ground = COLOR([0.88,1,1,0.3])(SIMPLEX_GRID([[-0.05,-0.41,-1.84,-0.08,0.3,-0.16,0.3,-2.46,0.3,-0.16,0.3,-6.96,0.3,-0.16,0.3,-2.46,0.3,-0.16,0.3],[-0.05,-0.175,0.06,-19.11,0.06],[-4.095,0.36,-0.08,0.36,-0.08,0.36,-0.08,0.36]]));


	/* Definizione delle finestre del primo piano */
	/* Finestre a Nord e Sud */
	var windowframe1First = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-0.05,-0.175,0.06,-19.11,0.06],[-0.05,-2.25,0.92,-2.3,0.92,-6.8,0.92,-2.3,0.92,-2.25],[-9.88,0.08,-0.99,0.08]]));
	var windowframe2First = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-0.05,-0.175,0.06,-19.11,0.06],[-0.05,-2.25,0.08,-0.3,0.16,-0.3,0.08,-2.3,0.08,-0.3,0.16,-0.3,0.08,-6.8,0.08,-0.3,0.16,-0.3,0.08,-2.3,0.08,-0.3,0.16,-0.3,0.08],
		[-9.88,-0.08,0.99]]));
	var windowpanel1First = COLOR([0.88,1,1,0.3])(SIMPLEX_GRID([[-0.05,-0.175,0.06,-19.11,0.06],[-0.05,-2.25,-0.08,0.3,-0.16,0.3,-2.46,0.3,-0.16,0.3,-6.96,0.3,-0.16,0.3,-2.46,0.3,-0.16,0.3],[-9.88,-0.08,0.99]]));

	/* Finestre ad Est ed Ovest */
	var windowframe3First = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-0.05,-0.41,-1.84,0.92,-2.3,0.92,-6.8,0.92,-2.3,0.92],[-0.05,-0.175,0.06,-19.11,0.06],[-9.88,0.08,-0.99,0.08]]));
	var windowframe4First = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-0.05,-0.41,-1.84,0.08,-0.3,0.16,-0.3,0.08,-2.3,0.08,-0.3,0.16,-0.3,0.08,-6.8,0.08,-0.3,0.16,-0.3,0.08,-2.3,0.08,-0.3,0.16,-0.3,0.08],[-0.05,-0.175,0.06,-19.11,0.06],[-9.88,-0.08,0.99]]));
	var windowpanel2First = COLOR([0.88,1,1,0.3])(SIMPLEX_GRID([[-0.05,-0.41,-1.84,-0.08,0.3,-0.16,0.3,-2.46,0.3,-0.16,0.3,-6.96,0.3,-0.16,0.3,-2.46,0.3,-0.16,0.3],[-0.05,-0.175,0.06,-19.11,0.06],[-9.88,-0.08,0.99]]));


	/* Definizione delle porte al piano terra */

	/* Porte chiuse Nord e Sud */
	var doorframe1SouthClose = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-0.05,-0.125,0.15,-0.125,-9.38,-9.38,-0.125,0.15],[-0.05,-0.41,-9.38,0.92],[-2.98,0.15,-1.065,0.15,-1.065,0.15,-1.065,0.15]]));
	var doorframe2SouthClose = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-0.05,-0.125,0.15,-0.125,-9.38,-9.38,-0.125,0.15],[-0.05,-0.41,-9.38,0.15,-0.62,0.15],[-2.98,-0.15,1.065,-0.15,1.065,-0.15,1.065,-0.15]]));
	var doorpanelSouthClose = COLOR([0.88,1,1,0.3])(SIMPLEX_GRID([[-0.05,-0.125,0.15,-0.125,-9.38,-9.38,-0.125,0.15],[-0.05,-0.41,-9.38,-0.15,0.62],[-2.98,-0.15,1.065,-0.15,1.065,-0.15,1.065]]));

	/* Porte aperte Nord e Sud */
	var doorframe1SouthOpen = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-0.05,-0.125,0.92,-8.745,-8.745,0.92],[-8.87,-0.05,0.15],[-2.98,0.15,-1.065,0.15,-1.065,0.15,-1.065,0.15]]));
	var doorframe2SouthOpen = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-0.05,-0.125,0.15,-0.62,0.15,-8.745,-8.745,0.15,-0.62,0.15],[-8.87,-0.05,0.15],[-2.98,-0.15,1.065,-0.15,1.065,-0.15,1.065,-0.15]]));
	var doorpanelSouthOpen = COLOR([0.88,1,1,0.3])(SIMPLEX_GRID([[-0.05,-0.125,-0.15,0.62,-0.15,-8.745,-8.745,-0.15,0.62],[-8.87,-0.05,0.15],[-2.98,-0.15,1.065,-0.15,1.065,-0.15,1.065]]));

	/* Porte chiuse ad Est ed Ovest */
	var doorframe1EastClose = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-0.05,-0.41,-9.38,0.92],[-0.05,-0.125,0.15,-0.125,-9.38,-9.38,-0.125,0.15],[-2.98,0.15,-1.065,0.15,-1.065,0.15,-1.065,0.15]]));
	var doorframe2EastClose = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-0.05,-0.41,-9.38,0.15,-0.62,0.15],[-0.05,-0.125,0.15,-0.125,-9.38,-9.38,-0.125,0.15],[-2.98,-0.15,1.065,-0.15,1.065,-0.15,1.065,-0.15]]));
	var doorpanelEastClose = COLOR([0.88,1,1,0.3])(SIMPLEX_GRID([[-0.05,-0.41,-9.38,-0.15,0.62],[-0.05,-0.125,0.15,-0.125,-9.38,-9.38,-0.125,0.15],[-2.98,-0.15,1.065,-0.15,1.065,-0.15,1.065]]));

	/* Porte aperte ad Est ed Ovest */
	var doorframe1EastOpen = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-8.87,-0.05,0.15],[-0.05,-0.125,0.92,-8.745,-8.745,0.92],[-2.98,0.15,-1.065,0.15,-1.065,0.15,-1.065,0.15]]));
	var doorframe2EastOpen = COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[-8.87,-0.05,0.15],[-0.05,-0.125,0.15,-0.62,0.15,-8.745,-8.745,0.15,-0.62,0.15],[-2.98,-0.15,1.065,-0.15,1.065,-0.15,1.065,-0.15]]));
	var doorpanelEastOpen = COLOR([0.88,1,1,0.3])(SIMPLEX_GRID([[-8.87,-0.05,0.15],[-0.05,-0.125,-0.15,0.62,-0.15,-8.745,-8.745,-0.15,0.62],[-2.98,-0.15,1.065,-0.15,1.065,-0.15,1.065]]));


	/* Definizione delle colonne */

	var basequadratacolonna = T([0,1])([-0.345,-0.345])(SIMPLEX_GRID([[0.69],[0.69],[0.15]]));

	var bc1 = BEZIER(S0)([[0.1,0,0.15],[0.45,0,0.13],[0.38,0,0.30],[0.18,0,0.30],[0.24,0,0.35]]);
	var rot1 = ROTATIONAL_SURFACE(bc1);
	var surface2 = MAP(rot1)(domaincc);

	var bc2 = CUBIC_HERMITE(S0)([[0.2,0,0.35],[0.2,0,0.46],[0.5,0,0],[-0.5,0,0]]);
	var rot2 = ROTATIONAL_SURFACE(bc2);
	var surface1 = MAP(rot2) (domaincc);


	var bc3 = CUBIC_HERMITE(S0)([[0.2,0,0.46],[0.18,0,4.945],[0.2,0,0.1],[-0.2,0,0.1]]);
	var rot3 = ROTATIONAL_SURFACE(bc3);
	var surface3 = MAP(rot3) (domaincc);

	var capitello1 = BEZIER(S0)([[0,0,0.26],[0,0,0.26],[0,0.4,0.26],[0,0.4,0.36],[0,0.45,-0.15],[0,0.21,0.05],[0,0.18,0],[0,0.18,0],[0,0.2,0.2],[0,0,0.03],[0,0,0.06]]);
	var capitello2 = BEZIER(S0)([[0,0,0.26],[0,0,0.1]]);
	var capitello3 = BEZIER(S0)([[0.69,0,0.26],[0.69,0,0.26],[0.69,0.4,0.26],[0.69,0.4,0.36],[0.69,0.45,-0.15],[0.69,0.21,0.05],[0.69,0.18,0],[0.69,0.18,0],[0.69,0.2,0.2],[0.69,0,0.03],[0.69,0,0.06]]);

	var s12 = BEZIER(S1)([capitello1,capitello2]);
	var s13 = BEZIER(S1)([capitello1,capitello3]);

	var surface12 = T([0,1,2])([-0.345,0,4.83])(MAP(s12)(domain2));
	var surface12b = T([0])([0.69])(surface12); 
	var surface13 = T([0,1,2])([-0.345,0,4.83])(MAP(s13)(domain2)); 
	var half = STRUCT([surface12,surface12b,surface13]);
	var otherhalf = R([0,1])(PI)(half);


	/* Definizione colonne lato Sud */
	var column1S = T([0,1,2])([23.25,4.48,2.98])(COLOR([1,0.972,0.89])(STRUCT([half, otherhalf, surface1, surface2, surface3, basequadratacolonna])));
	var column2S = T([1])([2.145])(column1S);
	var column3S = T([1])([2.145])(column2S);
	var column4S = T([1])([2.145])(column3S);
	var column5S = T([1])([2.145])(column4S);
	var column6S = T([1])([2.145])(column5S);


	/* Definizione colonne lato Est */
	var column1E = T([0,1])([8.96,-0.01])(R([0,1])(PI/2)(column1S));
	var column2E = T([0])([2.145])(column1E);
	var column3E = T([0])([2.145])(column2E);
	var column4E = T([0])([2.145])(column3E);
	var column5E = T([0])([2.145])(column4E);
	var column6E = T([0])([2.145])(column5E);


	/* Definizione colonne lato Nord */
	var column1N = T([0])([-26.85])(column1S);
	var column2N = T([1])([2.145])(column1N);
	var column3N = T([1])([2.145])(column2N);
	var column4N = T([1])([2.145])(column3N);
	var column5N = T([1])([2.145])(column4N);
	var column6N = T([1])([2.145])(column5N);


	/* Definizione colonne lato Ovest */
	var column1W = T([1])([-26.85])(column1E);
	var column2W = T([0])([2.145])(column1W);
	var column3W = T([0])([2.145])(column2W);
	var column4W = T([0])([2.145])(column3W);
	var column5W = T([0])([2.145])(column4W);
	var column6W = T([0])([2.145])(column5W);


	/* Definizione mura interne */ 
	var corridoioEW = (COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-8.23,0.41,-0.2,-1.88,-0.2,0.41],[-0.05,-0.41,1.84,-0.92,1.84,-9.55,1.84,-0.92,1.84],[-2.98,5.865]])));
	var corridoioNS = (COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-0.41,1.84,-0.92,1.84,-9.55,1.84,-0.92,1.84],[-0.05,-8.23,0.41,-0.2,-1.88,-0.2,0.41],[-2.98,5.865]])));
	var traviCorridoioEW = (COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-8.23,0.41,-0.2,-1.88,-0.2,0.41],[-0.05,-0.41,-1.84,0.92,-1.84,-9.55,-1.84,0.92],[-2.98,-3.2,2.665]])));
	var traviCorridoioNS = (COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-0.41,-1.84,0.92,-1.84,-9.55,-1.84,0.92],[-0.05,-8.23,0.41,-0.2,-1.88,-0.2,0.41],[-2.98,-3.2,2.665]])));
	var parallelPorticwallE = T([1])([-3.22])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-4.65,0.41,-9.55,0.41],[-0.05,-3.22,-0.41,1.84,-0.92,5.17,-2.9,5.17,-0.92,1.84],[-2.98,5.865]])));
	var parallelPorticwallS = T([0])([-3.22])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-3.22,-0.41,-1.84,-0.92,-1.84,3.22,-3.1,3.22],[-4.65,0.41,-9.55,0.41],[-2.98,5.865]])));
	var traviParallelPorticwallE = T([1])([-3.22])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-4.65,0.41,-9.55,0.41],[-0.05,-3.22,-0.41,-1.84,0.92,-5.17,-2.9,-5.17,0.92],[-2.98,-3.2,2.665]])));


	/* Definizione delle parti centrali e ricurve delle mura interne */

	/* Lato Nord-Ovest */
	var centerHermiteNWfront = CUBIC_HERMITE(S0)([[8.69,5.06,2.98],[5.06,8.69,2.98],[-4.6,0,0],[0,4.6,0]]);
	var centerHermiteNWfrontT = CUBIC_HERMITE(S0)([[8.69,5.06,11.49],[5.06,8.69,11.49],[-4.6,0,0],[0,4.6,0]]);
	var supfrontNW = BEZIER(S1)([centerHermiteNWfront,centerHermiteNWfrontT]);
	var surfaceFrontNW = COLOR([1,0.972,0.863])(MAP(supfrontNW)(domain2));
	var centerHermiteNWback = CUBIC_HERMITE(S0)([[8.28,4.65,2.98],[4.65,8.28,2.98],[-4.6,0,0],[0,4.6,0]]);
	var centerHermiteNWbackT = CUBIC_HERMITE(S0)([[8.28,4.65,11.49],[4.65,8.28,11.49],[-4.6,0,0],[0,4.6,0]]);
	var supbackNW = BEZIER(S1)([centerHermiteNWback,centerHermiteNWbackT]);
	var surfaceBackNW = COLOR([1,0.972,0.863])(MAP(supbackNW)(domain2));
	var coverNW = BEZIER(S1)([centerHermiteNWbackT,centerHermiteNWfrontT]);
	var surfaceCoverNW = COLOR([1,0.972,0.863])(MAP(coverNW)(domain2));


	/* Lato Sud-Ovest */
	var centerHermiteSWfront = CUBIC_HERMITE(S0)([[10.97,5.06,2.98],[14.61,8.69,2.98],[4.6,0,0],[0,4.6,0]]);
	var centerHermiteSWfrontT = CUBIC_HERMITE(S0)([[10.97,5.06,11.49],[14.61,8.69,11.49],[4.6,0,0],[0,4.6,0]]);
	var supfrontSW = BEZIER(S1)([centerHermiteSWfront,centerHermiteSWfrontT]);
	var surfaceFrontSW = COLOR([1,0.972,0.863])(MAP(supfrontSW)(domain2));
	var centerHermiteSWback = CUBIC_HERMITE(S0)([[11.38,4.65,2.98],[15.02,8.28,2.98],[4.6,0,0],[0,4.6,0]]);
	var centerHermiteSWbackT = CUBIC_HERMITE(S0)([[11.38,4.65,11.49],[15.02,8.28,11.49],[4.6,0,0],[0,4.6,0]]);
	var supbackSW = BEZIER(S1)([centerHermiteSWback,centerHermiteSWbackT]);
	var surfaceBackSW = COLOR([1,0.972,0.863])(MAP(supbackSW)(domain2));
	var coverSW = BEZIER(S1)([centerHermiteSWbackT,centerHermiteSWfrontT]);
	var surfaceCoverSW = COLOR([1,0.972,0.863])(MAP(coverSW)(domain2));


	/* Lato Sud-Est */
	var centerHermiteSEfront = CUBIC_HERMITE(S0)([[14.61,10.97,2.98],[10.97,14.61,2.98],[0,4.6,0],[-4.6,0,0]]);
	var centerHermiteSEfrontT = CUBIC_HERMITE(S0)([[14.61,10.97,11.49],[10.97,14.61,11.49],[0,4.6,0],[-4.6,0,0]]);
	var supfrontSE = BEZIER(S1)([centerHermiteSEfront,centerHermiteSEfrontT]);
	var surfaceFrontSE = COLOR([1,0.972,0.863])(MAP(supfrontSE)(domain2));
	var centerHermiteSEback = CUBIC_HERMITE(S0)([[15.02,11.38,2.98],[11.38,15.02,2.98],[0,4.6,0],[-4.6,0,0]]);
	var centerHermiteSEbackT = CUBIC_HERMITE(S0)([[15.02,11.38,11.49],[11.38,15.02,11.49],[0,4.6,0],[-4.6,0,0]]);
	var supbackSE = BEZIER(S1)([centerHermiteSEback,centerHermiteSEbackT]);
	var surfaceBackSE = COLOR([1,0.972,0.863])(MAP(supbackSE)(domain2));
	var coverSE = BEZIER(S1)([centerHermiteSEbackT,centerHermiteSEfrontT]);
	var surfaceCoverSE = COLOR([1,0.972,0.863])(MAP(coverSE)(domain2));


	/* Lato Nord-Est */
	var centerHermiteNEfront = CUBIC_HERMITE(S0)([[8.69,14.61,2.98],[5.06,10.97,2.98],[-4.6,0,0],[0,-4.6,0]]);
	var centerHermiteNEfrontT = CUBIC_HERMITE(S0)([[8.69,14.61,11.49],[5.06,10.97,11.49],[-4.6,0,0],[0,-4.6,0]]);
	var supfrontNE = BEZIER(S1)([centerHermiteNEfront,centerHermiteNEfrontT]);
	var surfaceFrontNE = COLOR([1,0.972,0.863])(MAP(supfrontNE)(domain2));
	var centerHermiteNEback = CUBIC_HERMITE(S0)([[8.28,15.02,2.98],[4.65,11.38,2.98],[-4.6,0,0],[0,-4.6,0]]);
	var centerHermiteNEbackT = CUBIC_HERMITE(S0)([[8.28,15.02,11.49],[4.65,11.38,11.49],[-4.6,0,0],[0,-4.6,0]]);
	var supbackNE = BEZIER(S1)([centerHermiteNEback,centerHermiteNEbackT]);
	var surfaceBackNE = COLOR([1,0.972,0.863])(MAP(supbackNE)(domain2));
	var coverNE = BEZIER(S1)([centerHermiteNEbackT,centerHermiteNEfrontT]);
	var surfaceCoverNE = COLOR([1,0.972,0.863])(MAP(coverNE)(domain2));


	/* Definizioni archi e volte delle mura interne*/
	var archMappingEC = CUBIC_HERMITE(S0)([[8.69,0.46,6.98],[10.97,0.46,6.98],[0,0,3],[0,0,-3]]);
	var archMappingECC = CUBIC_HERMITE(S0)([[8.69,5.06,6.98],[10.97,5.06,6.98],[0,0,3],[0,0,-3]]);
	var arcsEC = BEZIER(S1)([archMappingEC,archMappingECC]);
	var tunnelEC = COLOR([1,0.972,0.863])(MAP(arcsEC)(domain2));
	var tunnelWC = T([1])([14.15])(tunnelEC);
	var archMappingNC = CUBIC_HERMITE(S0)([[0.46,8.69,6.98],[0.46,10.97,6.98],[0,0,3],[0,0,-3]]);
	var archMappingNCC = CUBIC_HERMITE(S0)([[5.06,8.69,6.98],[5.06,10.97,6.98],[0,0,3],[0,0,-3]]);
	var arcsNC = BEZIER(S1)([archMappingNC,archMappingNCC]);
	var tunnelNC = COLOR([1,0.972,0.863])(MAP(arcsNC)(domain2));
	var tunnelSC = T([0])([14.15])(tunnelNC);
	var topTunnelEC = CUBIC_HERMITE(S0)([[8.69,5.06,11.49],[10.97,5.06,11.49],[0,0,0],[0,0,0]]);
	var coverTunnelEC = BEZIER(S1)([archMappingECC,topTunnelEC]);
	var topTunnelEC = COLOR([1,0.972,0.863])(MAP(coverTunnelEC)(domain2));
	var topTunnelWC = T([1])([9.55])(topTunnelEC);
	var topTunnelNC = CUBIC_HERMITE(S0)([[5.06,8.69,11.49],[5.06,10.97,11.49],[0,0,0],[0,0,0]]);
	var coverTunnelNC = BEZIER(S1)([archMappingNCC,topTunnelNC]);
	var topTunnelNC = COLOR([1,0.972,0.863])(MAP(coverTunnelNC)(domain2));
	var topTunnelSC = T([0])([9.55])(topTunnelNC);


	/* Definizione mura primo piano */
	var corridoioEWFirst = (COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-8.23,0.41,-0.2,-1.88,-0.2,0.41],[-0.05,-0.41,1.84,-0.92,1.84,-9.55,1.84,-0.92,1.84],[-8.845,2.645]])));
	var corridoioNSFirst = (COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-0.41,1.84,-0.92,1.84,-9.55,1.84,-0.92,1.84],[-0.05,-8.23,0.41,-0.2,-1.88,-0.2,0.41],[-8.845,2.645]])));
	var traviCorridoioEWFirst = (COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-8.23,0.41,-0.2,-1.88,-0.2,0.41],[-0.05,-0.41,-1.84,0.92,-1.84,-9.55,-1.84,0.92],[-8.845,-2.2,0.445]])));
	var traviCorridoioNSFirst = (COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-0.41,-1.84,0.92,-1.84,-9.55,-1.84,0.92],[-0.05,-8.23,0.41,-0.2,-1.88,-0.2,0.41],[-8.845,-2.2,0.445]])));
	var parallelPorticwallEFirst = T([1])([-3.22])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-4.65,0.41,-9.55,0.41],[-0.05,-3.22,-0.41,1.84,-0.92,5.17,-2.9,5.17,-0.92,1.84],[-8.845,2.645]])));
	var parallelPorticwallSFirst = T([0])([-3.22])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-0.05,-3.22,-0.41,-1.84,-0.92,-1.84,3.22,-3.1,3.22],[-4.65,0.41,-9.55,0.41],[-8.845,2.645]])));
	var traviParallelPorticwallEFirst = T([1])([-3.22])(COLOR([1,0.972,0.863])(SIMPLEX_GRID([[-4.65,0.41,-9.55,0.41],[-0.05,-3.22,-0.41,-1.84,0.92,-5.17,-2.9,-5.17,0.92],[-8.845,-2.2,0.445]])));


	/* Definisco una sorta di pavimento trasparente per lasciar intravedere il piano terra */
	var pavimentoCorridoioEWFirst = (COLOR([0.88,1,1,0.3])(SIMPLEX_GRID([[-0.05,-0.41,-4.65,3.17,-0.41,2.28,-0.41,3.17],[-0.05,-0.41,4.6,-9.55,4.6],[-8.6,0.245]])));
	var pavimentoCorridoioNSFirst = (COLOR([0.88,1,1,0.3])(SIMPLEX_GRID([[-0.05,-0.41,4.6,-9.55,4.6],[-0.05,-0.41,7.82,-0.41,2.28,-0.41,7.82],[-8.6,0.245]])));


	/* Definizione della cupola e della sua base */	

	/* Funzione per rappresentare una cupola con foro in cima */
	var getCupola = function (r,n,color) {
		var domain = DOMAIN([[0,((PI/2)-(PI/8))],[0,2*PI]])([n,2*n]);
		var mapping = function(p) {
			var u = p[0]+(PI/16);
			var v = p[1];
			return [r*COS(u)*COS(v),r*COS(u)*SIN(v),r*SIN(u)];
		}
		var mapped = MAP(mapping)(domain);
		return COLOR(color)(mapped);
	}

	var cupola = T([0,1,2])([9.83,9.83,12.9])(getCupola(5.55,100,[0.42,0.26,0.15]));
	var innerCupola = T([0,1,2])([9.83,9.83,12.95])(getCupola(5.04,100,[1,0.972,0.863]));


	/* Funzione per rappresentare la base della cupola */
	var getBaseCupola = function (r,h,n,m,color) {
		var piano = DOMAIN([[0,2*PI],[0,h]])([n,m]);
		var mapping = function(p) {
			var u = p[0];
			var v = p[1];
			return [r*SIN(u),r*COS(u),v];
		}
		var mapped = MAP(mapping)(piano);
		return COLOR(color)(mapped);
	}

	var baseInnerCupola = T([0,1,2])([9.83,9.83,11.49])(getBaseCupola(5.04,2.53,120,120,[1,0.972,0.863]));
	var baseCupola = T([0,1,2])([9.83,9.83,11.49])(getBaseCupola(5.55,2.53,120,120,[1,0.972,0.863]));

	var topCupola = BEZIER(S0)([[1.2,0,0],[1.2,0,0],[-1.4,0,0.85],[2.5,0,0.9],[0,0,0.4],[0,0,1.2],[0,0,1.2]]);
	var rot = ROTATIONAL_SURFACE(topCupola);
	var surfaceTopCupola = T([0,1,2])([9.83,9.83,18.35])(COLOR([0.54,0.54,0.54])(MAP(rot)(domaincc)));


	/* Funzione per rappresentare la sfera sulla cima della cupola*/
	var getSphere = function (r,n,color) {
		var domain = DOMAIN([[0,PI],[0,2*PI]])([n,2*n]);
		var mapping = function(p) {
			var u = p[0];
			var v = p[1];
			return [r*COS(u-(PI/2))*COS(v),r*COS(u-(PI/2))*SIN(v),r*SIN(u-(PI/2))];
		}
		var mapped = MAP(mapping)(domain);
		return COLOR(color)(mapped);
	}

	var sphere = T([0,1,2])([9.83,9.83,19.7])(getSphere(0.2,20,[1,1,0]));


	/* Definizione del tetto */

	/* Lato Nord */
	var centerHermiteNroof = CUBIC_HERMITE(S0)([[5.95,5.95,13.56],[5.95,13.7,13.56],[-6.4,4.8,0],[6.4,4.8,0]]);
	var marginRoofN = CUBIC_HERMITE(S0)([[0,0,11.49],[0,19.68,11.49],[0,0,0],[0,0,0]]);
	var supRoofN = BEZIER(S1)([centerHermiteNroof,marginRoofN]);
	var surfaceRoofN = COLOR([0.42,0.26,0.15])(MAP(supRoofN)(domain2));


	/* Lato Sud */
	var centerHermiteSroof = CUBIC_HERMITE(S0)([[13.7,5.95,13.56],[13.7,13.7,13.56],[6.4,4.8,0],[-6.4,4.8,0]]);
	var marginRoofS = CUBIC_HERMITE(S0)([[19.68,0,11.49],[19.68,19.68,11.49],[0,0,0],[0,0,0]]);
	var supRoofS = BEZIER(S1)([centerHermiteSroof,marginRoofS]);
	var surfaceRoofS = COLOR([0.42,0.26,0.15])(MAP(supRoofS)(domain2));


	/* Lato Ovest */
	var centerHermiteWroof = CUBIC_HERMITE(S0)([[5.95,5.95,13.56],[13.7,5.95,13.56],[4.8,-6.4,0],[4.8,6.4,0]]);
	var marginRoofW = CUBIC_HERMITE(S0)([[0,0,11.49],[19.68,0,11.49],[0,0,0],[0,0,0]]);
	var supRoofW = BEZIER(S1)([centerHermiteWroof,marginRoofW]);
	var surfaceRoofW = COLOR([0.42,0.26,0.15])(MAP(supRoofW)(domain2));


	/* Lato Est */
	var centerHermiteEroof = CUBIC_HERMITE(S0)([[5.95,13.7,13.56],[13.7,13.7,13.56],[4.8,6.4,0],[4.8,-6.4,0]]);
	var marginRoofE = CUBIC_HERMITE(S0)([[0,19.68,11.49],[19.68,19.68,11.49],[0,0,0],[0,0,0]]);
	var supRoofE = BEZIER(S1)([centerHermiteEroof,marginRoofE]);
	var surfaceRoofE = COLOR([0.42,0.26,0.15])(MAP(supRoofE)(domain2));


	/* Definizione dei bordi in cima alla base della cupola */

	/* Lato Nord */
	var centerHermiteNroofT = CUBIC_HERMITE(S0)([[5.95,5.85,14.02],[5.85,13.7,14.02],[-6.4,6.2,0],[6.4,6.2,0]]);
	var borderCupolaHermiteN = CUBIC_HERMITE(S0)([[6.36,6.36,14.02],[6.36,13.29,14.02],[-5.8,4.5,0],[5.8,4.5,0]]);
	var mappingBorderN = BEZIER(S1)([centerHermiteNroofT,borderCupolaHermiteN]);
	var borderCupolaN = COLOR([1,0.972,0.863])(MAP(mappingBorderN)(domain2));

	/* Lato Sud */
	var centerHermiteSroofT = CUBIC_HERMITE(S0)([[13.8,6.05,14.02],[13.7,13.8,14.02],[6.4,6.2,0],[-6.4,6.2,0]]);
	var borderCupolaHermiteS = CUBIC_HERMITE(S0)([[13.29,6.45,14.02],[13.34,13.34,14.02],[5.8,4.5,0],[-5.8,4.5,0]]);
	var mappingBorderS = BEZIER(S1)([centerHermiteSroofT,borderCupolaHermiteS]);
	var borderCupolaS = COLOR([1,0.972,0.863])(MAP(mappingBorderS)(domain2));

	/* Lato Ovest */
	var centerHermiteWroofT = CUBIC_HERMITE(S0)([[5.85,5.95,14.02],[13.8,6.05,14.02],[5.8,-6.8,0],[5.8,6.8,0]]);
	var borderCupolaHermiteW = CUBIC_HERMITE(S0)([[6.36,6.36,14.02],[13.29,6.45,14.02],[4.5,-5.8,0],[4.5,5.8,0]]);
	var mappingBorderW = BEZIER(S1)([centerHermiteWroofT,borderCupolaHermiteW]);
	var borderCupolaW = COLOR([1,0.972,0.863])(MAP(mappingBorderW)(domain2));

	/* Lato Est */
	var centerHermiteEroofT = CUBIC_HERMITE(S0)([[5.75,13.6,14.02],[13.75,13.75,14.02],[5.8,6.8,0],[5.8,-6.8,0]]);
	var borderCupolaHermiteE = CUBIC_HERMITE(S0)([[6.36,13.29,14.02],[13.29,13.29,14.02],[4.5,5.8,0],[4.5,-5.8,0]]);
	var mappingBorderE = BEZIER(S1)([centerHermiteEroofT,borderCupolaHermiteE]);
	var borderCupolaE = COLOR([1,0.972,0.863])(MAP(mappingBorderE)(domain2));


	/* Definizione dei frontoni */
	var frontoneS = COLOR([1,0.972,0.863])(SIMPLICIAL_COMPLEX([[23.49,4.86,9.19],[23.49,9.84,9.19],[23.49,9.84,10.8],[23.49,14.82,9.19]])([[0,1,2],[1,3,2]]));
	var frontoneN = COLOR([1,0.972,0.863])(SIMPLICIAL_COMPLEX([[-3.81,4.86,9.19],[-3.81,9.84,9.19],[-3.81,9.84,10.8],[-3.81,14.82,9.19]])([[0,1,2],[1,3,2]]));
	var frontoneE = COLOR([1,0.972,0.863])(SIMPLICIAL_COMPLEX([[4.86,23.49,9.19],[9.84,23.49,9.19],[9.84,23.49,10.8],[14.82,23.49,9.19]])([[0,1,2],[1,3,2]]));
	var frontoneW = COLOR([1,0.972,0.863])(SIMPLICIAL_COMPLEX([[4.86,-3.81,9.19],[9.84,-3.81,9.19],[9.84,-3.81,10.8],[14.82,-3.81,9.19]])([[0,1,2],[1,3,2]]));


	var tegolaSX = T([0,1,2])([-3.96,9.69,10.79])(R([1,2])([-PI/10])(COLOR([1,0.937,0.835])(SIMPLEX_GRID([[4.01],[5.54],[0.3]]))));
	var tegolaDX = T([0,1,2])([-3.96,4.65,9.07])(R([1,2])([PI/10])(COLOR([1,0.937,0.835])(SIMPLEX_GRID([[4.01],[5.54],[0.3]]))));
	var tegolaSXsup = T([0,1,2])([-3.96,9.79,11.08])(R([1,2])([-PI/10])(COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[4.01],[6.1],[0.115]]))));
	var tegolaDXsup = T([0,1,2])([-3.96,4.05,9.2])(R([1,2])([PI/10])(COLOR([0.42,0.26,0.15])(SIMPLEX_GRID([[4.01],[6.1],[0.115]]))));


	var tegoleN = STRUCT([tegolaSX,tegolaDX,tegolaSXsup,tegolaDXsup]);
	var tegoleS = T([0])([23.59])(tegoleN);
	var tegoleE = T([0])([19.68])(R([0,1])(PI/2)(tegoleN));
	var tegoleW = T([1])([23.59])(tegoleE);


	/* Definizione delle decorazioni delle mura esterne */

	/* Finestre lato Ovest */
	var decorazioniWindowsW1 = T([2])([6])(R([1,2])(PI/2)(COLOR([1,0.972,0.863])(EXTRUDE([0.05])(SIMPLICIAL_COMPLEX([[2.07,0],[2.76,0],[2.76,0.4],[3.45,0]])([[0,1,2],[1,3,2]])))));
	var decorazioniWindowsW2 = T([0])([14.16])(decorazioniWindowsW1);

	/* Finestre lato Est */
	var decorazioniWindowsE1 = T([1])([19.68])(decorazioniWindowsW1)
	var decorazioniWindowsE2 = T([0])([14.16])(decorazioniWindowsE1);

	/* Finestre lato Nord */
	var decorazioniWindowsN1 = T([2])([6])(R([0,2])(3*PI/2)(COLOR([1,0.972,0.863])(EXTRUDE([0.05])(SIMPLICIAL_COMPLEX([[0,2.07],[0,2.76],[0.4,2.76],[0,3.45]])([[0,1,2],[1,3,2]])))));
	var decorazioniWindowsN2 = T([1])([14.16])(decorazioniWindowsN1);

	/* Finestre lato Sud */
	var decorazioniWindowsS1 = T([0])([19.68])(decorazioniWindowsN1)
	var decorazioniWindowsS2 = T([1])([14.16])(decorazioniWindowsS1);

	/* Porta lato Ovest */
	var decorazioneDoorW = T([2])([7])(R([1,2])(PI/2)(COLOR([1,0.972,0.863])(EXTRUDE([0.05])(SIMPLICIAL_COMPLEX([[8.69,0],[9.84,0],[9.84,0.8],[10.99,0]])([[0,1,2],[1,3,2]])))));

	/* Porta lato Est */
	var decorazioneDoorE = T([1])([19.68])(decorazioneDoorW);

	/* Porta lato Nord */
	var decorazioneDoorN = T([2])([7])(R([0,2])(3*PI/2)(COLOR([1,0.972,0.863])(EXTRUDE([0.05])(SIMPLICIAL_COMPLEX([[0,8.69],[0,9.84],[0.8,9.84],[0,10.99]])([[0,1,2],[1,3,2]])))));

	/* Porta lato Sud */
	var decorazioneDoorS = T([0])([19.68])(decorazioneDoorN);


/* Modello che rappresenta l'intera struttura del palazzo */
var building = STRUCT([groundfloorSouthwall, groundfloorEastwall, groundfloorSouthPorticwall ,groundfloorEastPorticwall, groundfloorSouthwallLayer1 ,groundfloorEastwallLayer1, groundfloorSouthPorticwallLayer1,
	groundfloorEastPorticwallLayer1, groundfloorSouthwallLayer2, groundfloorEastwallLayer2, groundfloorSouthPorticwallLayer2, groundfloorEastPorticwallLayer2, groundfloorSouthwallLayer3part1, 
	groundfloorSouthwallLayer3part2, groundfloorEastwallLayer3, groundfloorSouthPorticwallLayer3, groundfloorSouthPorticwallLayer3a, groundfloorSouthPorticwallLayer3b, groundfloorEastPorticwallLayer3,
	groundfloorEastPorticwallLayer3a, groundfloorEastPorticwallLayer3b, groundfloorSouthwallLayer4, groundfloorEastwallLayer4, groundfloorSouthPorticwallLayer4, groundfloorEastPorticwallLayer4, 
	groundfloorSouthwallLayer5, groundfloorEastwallLayer5, groundfloorSouthPorticwallLayer5, groundfloorEastPorticwallLayer5, groundfloorSouthwallLayer6, groundfloorEastwallLayer6, groundfloorSouthPorticwallLayer6,
	groundfloorEastPorticwallLayer6, groundfloorSouthPorticwallDoor, groundfloorEastPorticwallDoor, firstfloorSouthwall, firstfloorSouthPorticwall, firstfloorEastPorticwall, firstfloorSouthwallLayer1,
	firstfloorSouthwallLayer2, firstfloorSouthwallLayer3, firstfloorSouthwallLayer4, firstfloorSouthwallLayer5, firstfloorSouthwallLayer6, firstfloorEastwall, firstfloorEastwallLayer1, firstfloorEastwallLayer2,
	firstfloorEastwallLayer3,firstfloorEastwallLayer4, firstfloorEastwallLayer5, firstfloorEastwallLayer6, windowframe1Ground, windowframe2Ground, windowpanel1Ground, windowframe1GroundLittle, 
	windowframe2GroundLittle, windowpanel1GroundLittle, windowframe3Ground, windowframe4Ground, windowpanel2Ground, windowframe1First, windowframe2First, windowpanel1First, windowframe3First, windowframe4First,
	windowpanel2First, southPorticArc1, southPorticArc2, northPorticArc1, northPorticArc2, eastPorticArc1, eastPorticArc2, westPorticArc1, westPorticArc2, doorframe1SouthClose, doorframe2SouthClose, 
	doorpanelSouthClose, doorframe1SouthOpen, doorframe2SouthOpen, doorpanelSouthOpen, doorframe1EastClose, doorframe2EastClose, doorpanelEastClose, doorframe1EastOpen, doorframe2EastOpen, doorpanelEastOpen, 
	corridoioEW, corridoioNS, traviCorridoioEW, traviCorridoioNS, parallelPorticwallE, parallelPorticwallS, traviParallelPorticwallE, surfaceFrontNW, surfaceBackNW, surfaceCoverNW, surfaceFrontSW, surfaceBackSW, 
	surfaceCoverSW, surfaceFrontSE, surfaceBackSE, surfaceCoverSE, surfaceFrontNE, surfaceBackNE, surfaceCoverNE, tunnelEC, tunnelWC, tunnelSC, tunnelNC, topTunnelEC, topTunnelWC, topTunnelNC, topTunnelSC, corridoioEWFirst, corridoioNSFirst,
	traviCorridoioEWFirst, traviCorridoioNSFirst, parallelPorticwallEFirst, parallelPorticwallSFirst, traviParallelPorticwallEFirst, pavimentoCorridoioEWFirst, pavimentoCorridoioNSFirst, cupola, innerCupola, 
	baseCupola, baseInnerCupola, surfaceTopCupola, sphere, surfaceRoofN, surfaceRoofS, surfaceRoofW, surfaceRoofE, borderCupolaN, borderCupolaS, borderCupolaW, borderCupolaE, frontoneS, frontoneN, frontoneE,
	frontoneW, tegoleN, tegoleS, tegoleE, tegoleW, decorazioniWindowsW1, decorazioniWindowsW2, decorazioniWindowsE1, decorazioniWindowsE2, decorazioniWindowsN1, decorazioniWindowsN2, decorazioniWindowsS1,
	decorazioniWindowsS2, decorazioneDoorW, decorazioneDoorE, decorazioneDoorN, decorazioneDoorS, column1S, column2S, column3S, column4S, column5S, column6S, column1N, column2N, column3N, column4N, column5N,
	column6N, column1E, column2E, column3E, column4E, column5E, column6E, column1W, column2W, column3W, column4W, column5W, column6W]);


/* Costruzione completa = fondamenta + palazzo */
var villa = STRUCT([basementSEtraslated,basementSWtraslated,basementNEtraslated, basementNWtraslated, building]);

DRAW(villa);