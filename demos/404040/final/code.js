/****************************************************************************
*                                                                           *
* Modello 3D di Villa Foscari detta La Malcontenta, di Andrea Palladio      *
* Autore: Dario D'agostino                                                  *
*                                                                           *
*****************************************************************************/


var avorioMuro = [1,1,0.941];	//avorio: FFFFF0
var oroCornice = [0.855,0.647,0.125];	//oro vivo: DAA520
var azzurroTrasparente = [0,1,1,0.4];	//ciano: 00FFFF
var azzurroMenoTrasparente = [0,1,1,0.7];	//ciano: 00FFFF
var marroneCornicePortone = [0.753,0.251,0];	//mogano: C04000
var grigioPortone = [0.576,0.576,0.576];	//grigio 40%: 8F8F8F
var grigioPorta = [0.184,0.184,0.184];	//grigio 80%: 2F2F2F
var marroneCornicione = [0.804,0.521,0.247];	//marrone chiaro: CD853F
var bianco = [1.2,1.2,1.2];	//bianco
var marronePietra = [0.596,0.463,0.329];	//marrone pastello: 987654
var rosaColonne = [1,0.6,0.4]	//rosa arancio: FF9966
var marroneAnta = [0.3,0.2,0.1];
var rossoTetti = [0.823,0.121,0.106]	//rosso pompeiano: D21F1B
var verdeErba = [0.01,0.753,0.235]	//verde pastello scuro: 03C03C
var grigioViale = [1,0.8,0.6]	//pesca-arancio: FFCC99

var domain2 = DOMAIN([[0,1],[0,1]])([10,25]);
var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([1,1,1]);



/****************************FACCIATA FRONTALE****************************/

//ritorna una finestra di dimensioni 0.7x0.9, ad altezza 1.6 da terra
var getFinestraFrontale_07x09 = function(){
	var cornice = STRUCT([	SIMPLEX_GRID([[0.7],[0.5],[-1.6,0.08,-0.74,0.08]]),	//cornice orizzontale
							SIMPLEX_GRID([[0.08,-0.23,0.08,-0.23,0.08],[0.5],[-1.68,0.74]]),	//cornice verticale
							]);
	var vetro = SIMPLEX_GRID([[-0.08,0.23,-0.08,0.23],[-0.25,0.01],[-1.68,0.74]]);
	var finestra = STRUCT([COLOR(oroCornice)(cornice), COLOR(azzurroTrasparente)(vetro)]);
	return finestra;
};

//ritorna una finestra di dimensioni 0.6x0.6, ad altezza 1.6 da terra
var getFinestraFrontale_06x06 = function(){
	var cornice = STRUCT([	SIMPLEX_GRID([[0.6],[0.3],[-1.6,0.08,-0.44,0.08]]),	//cornice orizzontale
							SIMPLEX_GRID([[0.08,-0.18,0.08,-0.18,0.08],[0.3],[-1.68,0.44]]),	//cornice verticale
							]);
	var vetro = SIMPLEX_GRID([[-0.08,0.18,-0.08,0.18],[-0.15,0.01],[-1.68,0.44]]);
	var finestra = STRUCT([COLOR(oroCornice)(cornice), COLOR(azzurroTrasparente)(vetro)]);
	return finestra;
};

//ritorna una finestra di dimensioni 0.9x0.6, ad altezza 0 da terra
var getFinestraFrontale_09x06 = function(){
	var cornice = STRUCT([	SIMPLEX_GRID([[0.9],[0.3],[0.1,-0.4,0.1]]),	//cornice orizzontale
							SIMPLEX_GRID([[0.1,-0.3,0.1,-0.3,0.1],[0.3],[-0.1,0.4]]),	//cornice verticale
							]);
	var vetro = SIMPLEX_GRID([[-0.1,0.3,-0.1,0.3],[-0.15,0.01],[-0.1,0.4]]);
	var finestra = STRUCT([COLOR(oroCornice)(cornice), COLOR(azzurroTrasparente)(vetro)]);
	return finestra;
};

//ritorna una finestra (con le ante) di dimensioni 0.9x2.1, ad altezza 3.95 da terra
var getFinestraFrontale_09x21 = function(){
	var cornice = STRUCT([	SIMPLEX_GRID([[0.9],[0.3],[-3.95,0.05,-0.95,0.1,-0.95,0.05]]),	//cornice orizzontale
							SIMPLEX_GRID([[0.1,-0.3,0.1,-0.3,0.1],[0.3],[-4,0.95,-0.1,0.95]]),	//cornice verticale
							]);
	var vetro = SIMPLEX_GRID([[-0.1,0.3,-0.1,0.3],[-0.15,0.01],[-4,0.95,-0.1,0.95]]);
	var ante = T([1])([-0.45])(SIMPLEX_GRID([[0.05,-0.8,0.05],[0.45],[-3.95,2.1]]));
	var finestra = STRUCT([COLOR(oroCornice)(cornice), COLOR(azzurroTrasparente)(vetro), COLOR(marroneAnta)(ante)]);
	return finestra;
};

//ritorna una finestra di dimensioni 0.9x1.4, ad altezza 8.71 da terra
var getFinestraFrontale_09x14 = function(){
	var cornice = STRUCT([	SIMPLEX_GRID([[0.9],[0.25],[-8.71,0.1,-1.2,0.1]]),	//cornice orizzontale
							SIMPLEX_GRID([[0.1,-0.3,0.1,-0.3,0.1],[0.25],[-8.81,1.2]]),	//cornice verticale
							]);
	var vetro = SIMPLEX_GRID([[-0.1,0.3,-0.1,0.3],[-0.175,0.01],[-8.81,1.2]]);
	var finestra = STRUCT([COLOR(oroCornice)(cornice), COLOR(azzurroTrasparente)(vetro)]);
	return finestra;
};


/*******************************************************************************************
*	Ritorna il cornicione frontale che sta alla base, alto 0.35+0.5+0.4+0.1=1.35 da terra,
*	il cui spigolo in basso a destra (quello più grande) ha coordinate:  x=8.45, y=0, z=0.
*	Ritorna anche gli scalini della porta.
********************************************************************************************/
var getCornicioneFrontale_AllaBase = function(){
	var scaliniPortaAlfa = STRUCT([	SIMPLEX_GRID([[0.45],[0.1],[0.15]]),
									SIMPLEX_GRID([[0.45],[-0.1,0.1],[0.3]]),
									SIMPLEX_GRID([[0.45],[-0.2,0.1],[0.45]])
									]);
	var scaliniPorta = COLOR(bianco)(STRUCT([scaliniPortaAlfa, S([0])([-1])(scaliniPortaAlfa)]));


	var parteDritta = STRUCT([	SIMPLEX_GRID([[-0.45,4.2],[0.2],[0.35]]),
								SIMPLEX_GRID([[-0.45,4.15],[-0.05,0.15],[-0.35,0.5]]),
								SIMPLEX_GRID([[-0.45,4.1],[-0.1,0.1],[-0.85,0.4]]),

								SIMPLEX_GRID([[-4.45,0.2],[-0.2,2.2],[0.35]]),
								SIMPLEX_GRID([[-4.45,0.15],[-0.2,2.2],[-0.35,0.5]]),
								SIMPLEX_GRID([[-4.45,0.1],[-0.2,2.2],[-0.85,0.4]]),

								SIMPLEX_GRID([[-4.65,1.8],[-2.2,0.2],[0.35]]),
								SIMPLEX_GRID([[-4.6,1.85],[-2.25,0.15],[-0.35,0.5]]),
								SIMPLEX_GRID([[-4.55,1.9],[-2.3,0.1],[-0.85,0.4]]),

								SIMPLEX_GRID([[-7.95,0.5],[-3.7,0.2],[0.35]]),
								SIMPLEX_GRID([[-7.95,0.45],[-3.75,0.15],[-0.35,0.5]]),
								SIMPLEX_GRID([[-7.95,0.4],[-3.8,0.1],[-0.85,0.4]]),

								SIMPLEX_GRID([[-8.25,0.2],[-3.9,0.5],[0.35]]),
								SIMPLEX_GRID([[-8.25,0.15],[-3.9,0.5],[-0.35,0.5]]),
								SIMPLEX_GRID([[-8.25,0.1],[-3.9,0.5],[-0.85,0.4]])
								]);

	//parte spigolosa
	var c1 = BEZIER(S0)([[0.45,0.1,1.25],[0.45,0.2,1.35]]);
	var ps = BEZIER(S0)([[0.45,0.2,1.25]]);
	var c1ps = BEZIER(S1)([c1,ps]);
	
	var c2 = BEZIER(S0)([[4.55,0.1,1.25],[4.45,0.2,1.35]]);
	var c1c2 = BEZIER(S1)([c1,c2]);

	var c3 = BEZIER(S0)([[4.55,2.3,1.25],[4.45,2.4,1.35]]);
	var c2c3 = BEZIER(S1)([c2,c3]);

	var c4 = BEZIER(S0)([[6.45,2.3,1.25],[6.45,2.4,1.35]]);
	var c3c4 = BEZIER(S1)([c3,c4]);

	var c5 = BEZIER(S0)([[7.95,3.8,1.25],[7.95,3.9,1.35]]);
	var c6 = BEZIER(S0)([[8.35,3.8,1.25],[8.25,3.9,1.35]]);
	var c5c6 = BEZIER(S1)([c5,c6]);

	var c7 = BEZIER(S0)([[8.35,4.4,1.25],[8.25,4.4,1.35]]);
	var c6c7 = BEZIER(S1)([c6,c7]);
	
	var parteSpigolosa = STRUCT([	MAP(c1ps)(domain2),
									MAP(c1c2)(domain2),
									MAP(c2c3)(domain2),
									MAP(c3c4)(domain2),
									MAP(c5c6)(domain2),
									MAP(c6c7)(domain2)
									]);

	var cornicioneAlfa = STRUCT([parteDritta,parteSpigolosa]);
	var cornicioneBeta = COLOR(marronePietra)(STRUCT([cornicioneAlfa, S([0])([-1])(cornicioneAlfa)]));
	var cornicione = STRUCT([scaliniPorta,cornicioneBeta]);
	return cornicione;		
};



/***********************************************************************************************
*	Ritorna la scalinata (comprese anche le piccole finestre), con lo spigolo in basso a destra
*	di coordinate x=7.95, y=0, z=0;
*	Ritorna anche il muro dietro la scalinata (comprese le finestre).
************************************************************************************************/
var getScalinata = function(){
	var scalinataAlfa = STRUCT([SIMPLEX_GRID([[-6.45,1.5],[0.2],[0.125]]),
								SIMPLEX_GRID([[-6.45,1.5],[-0.2,0.2],[0.25]]),
								SIMPLEX_GRID([[-6.45,1.5],[-0.4,1.5],[0.375]]),
								SIMPLEX_GRID([[-6.45,1.5],[-1.9,0.2],[0.5]]),
								SIMPLEX_GRID([[-6.45,1.5],[-2.1,0.2],[0.625]]),
								SIMPLEX_GRID([[-6.45,1.5],[-2.3,0.2],[0.75]]),
								SIMPLEX_GRID([[-6.45,1.5],[-2.5,0.2],[0.875]]),
								SIMPLEX_GRID([[-6.45,1.5],[-2.7,0.2],[1]]),
								SIMPLEX_GRID([[-6.45,1.5],[-2.9,0.2],[1.125]]),
								SIMPLEX_GRID([[-6.45,1.5],[-3.1,0.2],[1.25]]),
								SIMPLEX_GRID([[-6.45,1.5],[-3.3,0.2],[1.375]]),
								SIMPLEX_GRID([[-6.45,1.5],[-3.5,0.2],[1.5]]),
								SIMPLEX_GRID([[-6.45,1.5],[-3.7,0.2],[1.625]]),
								SIMPLEX_GRID([[-6.45,1.5],[-3.9,0.2],[1.75]]),
								SIMPLEX_GRID([[-6.45,1.5],[-4.1,0.2],[1.875]]),
								SIMPLEX_GRID([[-6.45,1.5],[-4.3,1.5],[2]]),
								SIMPLEX_GRID([[-6.25,0.2],[-4.3,1.5],[2.125]]),
								SIMPLEX_GRID([[-6.05,0.2],[-4.3,1.5],[2.25]]),
								SIMPLEX_GRID([[-5.85,0.2],[-4.3,1.5],[2.375]]),
								SIMPLEX_GRID([[-5.65,0.2],[-4.3,1.5],[2.5]]),
								SIMPLEX_GRID([[-5.45,0.2],[-4.3,1.5],[2.625]]),						
								SIMPLEX_GRID([[-5.25,0.2],[-4.3,1.5],[1.6,-0.6,0.55]]),
								SIMPLEX_GRID([[-5.05,0.2],[-4.3,1.5],[1.6,-0.6,0.675]]),
								SIMPLEX_GRID([[-4.85,0.2],[-4.3,1.5],[1.6,-0.6,0.8]]),
								SIMPLEX_GRID([[-4.65,0.2],[-4.3,1.5],[3.125]]),
								SIMPLEX_GRID([[-4.45,0.2],[-4.3,1.55],[3.25]]),
								SIMPLEX_GRID([[4.45],[-4.3,1.55],[-3.125,0.125]]) //unione scalinate
								]);
	var scalinata = COLOR(bianco)(STRUCT([scalinataAlfa, S([0])([-1])(scalinataAlfa)]));

	//finestre dentro le scale
	var finestraDentro = T([1])([4.4])(getFinestraFrontale_06x06());
	var finestreDentro = STRUCT([T([0])([4.85])(finestraDentro),T([0])([-5.45])(finestraDentro)]);

	//muro
	var muroAlfa = STRUCT([ SIMPLEX_GRID([[6.45,-0.9,0.9],[-5.8,0.5],[3]]),
							SIMPLEX_GRID([[-6.45,0.9],[-5.8,0.5],[2,-0.6,0.4]])
							]);
	var muro = COLOR(bianco)(STRUCT([muroAlfa, S([0])([-1])(muroAlfa)]));

	//finestre dietro le scale
	var finestraDietro = T([1,2])([5.9,2])(getFinestraFrontale_09x06());
	var finestreDietro = STRUCT([T([0])([6.45])(finestraDietro),T([0])([-7.35])(finestraDietro)]);

	var scalinateConFinestre = STRUCT([scalinata,finestreDentro,muro,finestreDietro]);
	return scalinateConFinestre;
};



/*****************************************************************************************
*	Ritorna il portico (portico + muro sotto + porta + finestre), con lo spigolo in alto a
*	destra del muro che ha coordinate x=4.45, y=0, z=0.
******************************************************************************************/
var getPortico = function(){
	var muroAlfa = STRUCT([	SIMPLEX_GRID([[0.55],[0.6],[-2.5,1]]),
							SIMPLEX_GRID([[-0.55,0.8,-0.7,0.8,-0.7,0.9],[0.6],[3.5]]),
							SIMPLEX_GRID([[-1.35,0.7,-0.8,0.7],[0.6],[1.6,-0.9,1]]),
							SIMPLEX_GRID([[-3.85,0.6],[-0.6,0.15,-0.7,0.75],[3.5]]),
							SIMPLEX_GRID([[-3.85,0.6],[-0.75,0.7],[1.6,-0.9,1]]),
							SIMPLEX_GRID([[3.85],[-0.6,1.6],[-3.125,0.125]])	//pianerottolo
							]);
	var muro = COLOR(bianco)(STRUCT([muroAlfa, S([0])([-1])(muroAlfa)]));

	//porta
	var portaAlfa = SIMPLEX_GRID([[0.55],[-0.1,0.5],[2.5]]);
	var porta = COLOR(grigioPortone)(STRUCT([portaAlfa, S([0])([-1])(portaAlfa)]));
	
	//finestre frontali
	var finestraFrontale = T([1])([0.1])(getFinestraFrontale_07x09());
	var finestreFrontali = STRUCT([	T([0])([1.35])(finestraFrontale),
									T([0])([2.85])(finestraFrontale),
									T([0])([-2.05])(finestraFrontale),
									T([0])([-3.55])(finestraFrontale)
									]);

	//finestre laterali
	var finestraLateraleDestra = R([0,1])([PI/2])(finestraFrontale);
	var finestraLateraleSinistra = R([0,1])([-PI/2])(finestraFrontale);

	var finestreLaterali = STRUCT([	T([0,1])([4.45,0.75])(finestraLateraleDestra),
									T([0,1])([-4.45,1.45])(finestraLateraleSinistra)
									]);

	var portico = STRUCT([muro,porta,finestreFrontali,finestreLaterali]);
	return portico;
};



/*************************************************************************************************************
*	Ritorna il muro frontale centrale, con lo spigolo in basso a destra di coordinate x=8.15, y=0, z=3.85;
*	Il portone (la cornice) ha lo spigolo in basso a destra di coordinate x=1, y=0, z=3.2 (cioè è più basso
*	di 0.65 rispetto al muro);
*	Il tetto del portone sporge sull'asse delle y negative di 0.3
*************************************************************************************************************/
var getMuroFrontale_Centrale = function(){
	var muroAlfa = STRUCT([	SIMPLEX_GRID([[-1,1.8,-0.9,2.75,-0.9,0.8],[0.4],[-3.85,3.95]]),
							SIMPLEX_GRID([[-2.8,0.9,-2.75,0.9],[0.4],[-3.85,0.1,-2.1,1.75]]),
							SIMPLEX_GRID([[1],[0.4],[-6.7,1.1]])
							]);
	var muro = COLOR(avorioMuro)(STRUCT([muroAlfa, S([0])([-1])(muroAlfa)]));

	var finestra = T([1])([0.1])(getFinestraFrontale_09x21());
	var finestre = STRUCT([	T([0])([2.8])(finestra),
							T([0])([6.45])(finestra),
							T([0])([-3.7])(finestra),
							T([0])([-7.35])(finestra)
							]);

	var portaPortoneAlfa = SIMPLEX_GRID([[0.8],[-0.1,0.3],[-3.2,3.3]]);
	var portaPortone = COLOR(grigioPortone)(STRUCT([portaPortoneAlfa, S([0])([-1])(portaPortoneAlfa)]));
	var cornicePortoneAlfa = STRUCT([	SIMPLEX_GRID([[1],[0.4],[-6.5,0.2]]),		//corniceOrizzontale
										SIMPLEX_GRID([[-0.8,0.2],[0.4],[-3.2,3.3]])	//corniceVerticale
										]);
	var cornicePortone = COLOR(marroneCornicePortone)(STRUCT([cornicePortoneAlfa, S([0])([-1])(cornicePortoneAlfa)]));

	var c1 = CUBIC_HERMITE(S0)([[0,-0.2,6.7],[1.2,0,6.7],[4.1,0,0],[0,1,0]]);	//curva sotto
	var c2 = CUBIC_HERMITE(S0)([[0,-0.3,7.15],[1.4,0,7.15],[4.3,0,0],[0,1,0]]);	//curva sopra
	
	var c1c2 = BEZIER(S1)([c1,c2]);
	
	var d1 = BEZIER(S0)([[0,0,6.7],[1.2,0,6.7]]);
	var d2 = BEZIER(S0)([[0,0,7.15],[1.4,0,7.15]]);
	var c1d1 = BEZIER(S1)([c1,d1]);
	var c2d2 = BEZIER(S1)([c2,d2]);	
	
	var tettoPortoneAlfa = STRUCT([	MAP(c1c2)(domain2),									
									MAP(c1d1)(domain2),
									MAP(c2d2)(domain2)
									]);

	var c3 = BEZIER(S0)([[1,0,5.7],[1,-0.25,5.75],[1,0.3,6.1],[1,-0.5,6.2],[1,-0.6,6.5],[1,-0.2,6.7]]);
	var c4 = BEZIER(S0)([[1.2,0,5.7],[1.2,-0.25,5.75],[1.2,0.3,6.1],[1.2,-0.5,6.2],[1.2,-0.6,6.5],[1.2,-0.2,6.7]]);
	var c3c4 = BEZIER(S1)([c3,c4]);

	var d3 = BEZIER(S0)([[1,0,5.7],[1,0,6.7]]);
	var d4 = BEZIER(S0)([[1.2,0,5.7],[1.2,0,6.7]]);
	var c3d3 = BEZIER(S1)([c3,d3]);
	var c4d4 = BEZIER(S1)([c4,d4]);

	var tettoPortoneBeta = STRUCT([	tettoPortoneAlfa,									
									MAP(c3c4)(domain2),
									MAP(c3d3)(domain2),
									MAP(c4d4)(domain2)
									]);

	var tettoPortone = COLOR(marroneCornicePortone)(STRUCT([tettoPortoneBeta, S([0])([-1])(tettoPortoneBeta)]));

	var portone = STRUCT([portaPortone,cornicePortone,tettoPortone]);

	var muroCentrale = STRUCT([muro,finestre,portone]);
	return muroCentrale;
};



/**********************************************************************************
*	Ritorna il cornicione frontale inferiore, alto 3 da terra, il cui spigolo in
*	basso a destra (quello più grande) ha coordinate:  x=8.3, y=0, z=3
***********************************************************************************/
var getCornicioneFrontale_Inferiore = function(){
	var parteDrittaAlfa = STRUCT([	SIMPLEX_GRID([[-4.65,3.65],[0.55],[-3,0.25]]),
									SIMPLEX_GRID([[-1,2.85,-0.6,3.8],[-0.05,0.5],[-3.25,0.25]]),
									SIMPLEX_GRID([[-1,2.85,-0.6,3.75],[-0.1,0.45],[-3.5,0.25]]),
									SIMPLEX_GRID([[-3.85,0.6],[-0.15,0.4],[-3.25,0.6]]),
									SIMPLEX_GRID([[-1,3.65],[-0.15,0.4],[-3.2,0.05]]),
									]);
	var parteDritta = COLOR(marronePietra)(STRUCT([parteDrittaAlfa, S([0])([-1])(parteDrittaAlfa)]));

	var pezzettoAlfa = SIMPLEX_GRID([[4.65],[-0.05,0.5],[-3,0.2]]);	//pezzetto sotto la porta
	var pezzetto = COLOR(avorioMuro)(STRUCT([pezzettoAlfa,S([0])([-1])(pezzettoAlfa)]));

	var partiDritte = STRUCT([parteDritta,pezzetto]);	

	//parte spigolosa
	var c1 = BEZIER(S0)([[1,0.1,3.75],[1,0.15,3.75],[1,0.15,3.85]]);			//curva diagonale vicino porta
	var c2 = BEZIER(S0)([[3.85,0.1,3.75],[3.85,0.15,3.75],[3.85,0.15,3.85]]);	//curva a sinistra della colonna
	var c3 = BEZIER(S0)([[4.45,0.1,3.75],[4.45,0.15,3.75],[4.45,0.15,3.85]]);	//curva a destra della colonna
	var c4 = BEZIER(S0)([[8.2,0.1,3.75],[8.15,0.15,3.75],[8.15,0.15,3.85]]);	//curva diagonale a destra
	var c5 = BEZIER(S0)([[8.2,0.55,3.75],[8.15,0.55,3.75],[8.15,0.55,3.85]]);	//curva laterale a destra

	var ps1 = BEZIER(S0)([[3.85,0.15,3.75]]);
	var ps2 = BEZIER(S0)([[4.45,0.15,3.75]]);
	
	var c1c2 = BEZIER(S1)([c1,c2]);
	var c3c4 = BEZIER(S1)([c3,c4]);
	var c4c5 = BEZIER(S1)([c4,c5]);
	var c2ps1 = BEZIER(S1)([c2,ps1]);
	var c3ps2 = BEZIER(S1)([c3,ps2]);
	
	var parteSpigolosaAlfa = STRUCT([MAP(c1c2)(domain2), MAP(c3c4)(domain2), MAP(c4c5)(domain2), MAP(c2ps1)(domain2), MAP(c3ps2)(domain2)]);
	var parteSpigolosa = COLOR(marronePietra)(STRUCT([parteSpigolosaAlfa, S([0])([-1])(parteSpigolosaAlfa)]));

	var cornicioneInferiore = STRUCT([partiDritte,parteSpigolosa]);
	return cornicioneInferiore;
};



/******************************************************************************
*	Ritorna il colonnato, con lo spigolo della colonna in basso a destra di
*	coordinate x=4.45, y=0, z=3.5
*******************************************************************************/
var getColonnato = function(){
	//base della colonna
	var baseCiambella = SIMPLEX_GRID([[-3.85,0.6],[0.6],[0.1]]);
	var baseMezzaCiambella = T([2])([-0.3])(SIMPLEX_GRID([[-3.85,0.6],[0.3],[0.4]]));

	var c1 = CUBIC_HERMITE(S0)([[0.3,0,0],[-0.3,0,0],[0,1.2,0],[0,-1.2,0]]);		//semi-curva diametro 0.6
	var c2 = CUBIC_HERMITE(S0)([[0.2,0,0.05],[-0.2,0,0.05],[0,0.8,0],[0,-0.8,0]]);	//semi-curva diametro 0.4
	var c1c2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.2], [0,0,0]]);
	var surfacec1c2 = MAP(c1c2)(domain2);
	var ciambellaEsternaAlfa = STRUCT([surfacec1c2, S([2])([-1])(surfacec1c2)]);
	var ciambellaEsternaBeta = STRUCT([ciambellaEsternaAlfa, S([1])([-1])(ciambellaEsternaAlfa)]);
	var ciambellaEsterna = T([0,1,2])([4.15,0.3,0.25])(ciambellaEsternaBeta);

	var mezzaCiambellaEsternaAlfa = S([1])([-1])(ciambellaEsternaAlfa);
	var mezzaCiambellaEsterna = T([0,1,2])([4.15,0.3,0.25])(mezzaCiambellaEsternaAlfa);

	var c3 = CUBIC_HERMITE(S0)([[0.2,0,0.1],[-0.2,0,0.1],[0,0.8,0],[0,-0.8,0]]);	//semi-curva diametro 0.4
	var c1c3 = CUBIC_HERMITE(S1)([c1,c3,[0,-0.2,0], [0,0,0.1]]);
	var surfacec1c3 = MAP(c1c3)(domain2);
	var ciambellaInternaAlfa = STRUCT([surfacec1c3, S([1])([-1])(surfacec1c3)]);
	var ciambellaInterna = T([0,1,2])([4.15,0.3,0.1])(ciambellaInternaAlfa);

	var mezzaCiambellaInternaAlfa = S([1])([-1])(surfacec1c3);
	var mezzaCiambellaInterna = T([0,1,2])([4.15,0.3,0.1])(mezzaCiambellaInternaAlfa);

	var baseColonnaAlfa = STRUCT([baseCiambella,ciambellaEsterna,ciambellaInterna]);
	var baseColonnaBeta = T([2])([3.5])(baseColonnaAlfa);
	var baseMezzaColonnaAlfa = STRUCT([baseMezzaCiambella,mezzaCiambellaEsterna,mezzaCiambellaInterna]);
	var baseMezzaColonnaBeta = T([2])([3.5])(baseMezzaColonnaAlfa);
	var baseColonnaGamma = STRUCT([	baseColonnaBeta,
									T([0])([-1.6])(baseColonnaBeta),
									T([0])([-3.2])(baseColonnaBeta),
									T([1])([1.6])(baseColonnaBeta),
									T([1])([3.5])(baseMezzaColonnaBeta)//da rivedere il 3.5
									]);
	var basiColonne = COLOR(avorioMuro)(STRUCT([baseColonnaGamma, S([0])([-1])(baseColonnaGamma)]));

	//colonna
	var domain = DOMAIN([[0,1],[0,2*PI]])([15,15]);
	var profiloColonna = BEZIER(S0)([[0.25,0,3.8],[0.2,0,7.65]]);
	var mapping = ROTATIONAL_SURFACE(profiloColonna);
	var colonnaAlfa = MAP(mapping)(domain);
	var colonnaBeta = T([0,1])([4.15,0.3])(colonnaAlfa);

	var domainMezza = DOMAIN([[0,1],[0,PI]])([15,15]);
	var profiloMezzaColonna = BEZIER(S0)([[0.25,0,3.8],[0.2,0,7.65]]);
	var mappingMezza = ROTATIONAL_SURFACE(profiloMezzaColonna);
	var mezzaColonnaAlfa = MAP(mappingMezza)(domainMezza);
	var mezzaColonnaBeta = R([0,1])([-PI])(mezzaColonnaAlfa);

	var colonnaGamma = STRUCT([	colonnaBeta,
								T([0])([-1.6])(colonnaBeta),
								T([0])([-3.2])(colonnaBeta),
								T([1])([1.6])(colonnaBeta),
								T([0,1])([4.15,3.8])(mezzaColonnaBeta)	//da rivedere il 3.8
								]);
	var colonne = COLOR(rosaColonne)(STRUCT([colonnaGamma, S([0])([-1])(colonnaGamma)]));

	//capitello della colonna
	var baseCapitello = SIMPLEX_GRID([[0.6],[0.6],[-0.1,0.15]]);
	var baseMezzoCapitello = SIMPLEX_GRID([[0.3],[0.6],[-0.1,0.15]]);

	var g1 = CUBIC_HERMITE(S0)([[0.1,0,0],[-0.1,0,0],[0,0,0.4],[0,0,-0.4]]);		//semi-curva diametro 0.2
	var g2 = CUBIC_HERMITE(S0)([[0.1,0.6,0],[-0.1,0.6,0],[0,0,0.4],[0,0,-0.4]]);	//semi-curva parallela diametro 0.2
	var g1g2 = BEZIER(S1)([g1,g2]);
	
	var ps1 = BEZIER(S0)([[0,0,0]]);	//punto speciale (al centro) per raccordare g1
	var ps2 = BEZIER(S0)([[0,0.6,0]]);	//punto speciale (al centro) per raccordare g2
	var g1ps1 = BEZIER(S1)([g1,ps1]);
	var g2ps2 = BEZIER(S1)([g2,ps2]);

	var mezzoCilindro = STRUCT([MAP(g1g2)(domain2),
								MAP(g1ps1)(domain2),
								MAP(g2ps2)(domain2)									
								]);
	var cilindro = STRUCT([mezzoCilindro, S([2])([-1])(mezzoCilindro)]);
	var cilindri = STRUCT([cilindro, T([0])([0.6])(cilindro)]);

	//collegamento cilindri con base sopra
	var f1 = CUBIC_HERMITE(S0)([[-0.1,0,0],[0,0,0.1],[0,0,0.1],[0.1,0,0]]);		//mezza semi-curva diametro 0.2
	var f2 = CUBIC_HERMITE(S0)([[-0.1,0.6,0],[0,0.6,0.1],[0,0,0.1],[0.1,0,0]]);	//mezza semi-curva parallela diametro 0.2

	var f3 = CUBIC_HERMITE(S0)([[0,0,-0.1],[0,0,0.2],[-0.6,0,0],[0.4,0,0]]);		//semi-curva x collegare cilindro e base
	var f4 = CUBIC_HERMITE(S0)([[0,0.6,-0.1],[0,0.6,0.2],[-0.6,0,0],[0.4,0,0]]);	//semi-curva parallela x collegare cilindro e base
	var f1f3 = BEZIER(S1)([f1,f3]);
	var f2f4 = BEZIER(S1)([f2,f4]);
	var f3f4 = BEZIER(S1)([f3,f4]);

	var collegamentoCilindroBase1 = STRUCT([	MAP(f1f3)(domain2),
												MAP(f2f4)(domain2),
												MAP(f3f4)(domain2)									
												]);
	var collegamentoCilindroBase2 = S([0])([-1])(collegamentoCilindroBase1);
	var collegamentiCilindroBase = STRUCT([collegamentoCilindroBase1, T([0])([0.6])(collegamentoCilindroBase2)]);

	var capitelloAlfa = STRUCT([baseCapitello, cilindri, collegamentiCilindroBase]);

	var mezzoCapitelloAlfa = STRUCT([baseMezzoCapitello,cilindro,collegamentoCilindroBase1]);
	var mezzoCapitelloBeta = R([0,1])([PI/2])(mezzoCapitelloAlfa);

	var capitelloAlfaRuotato = R([0,1])([-PI/2])(capitelloAlfa);
	var capitelloBeta = T([0,2])([3.85,7.55])(capitelloAlfa);
	var capitelloGamma = STRUCT([	capitelloBeta,
									T([0])([-1.6])(capitelloBeta),
									T([0])([-3.2])(capitelloBeta),
									T([0,1,2])([3.85,2.2,7.55])(capitelloAlfaRuotato),
									T([0,1,2])([4.45,3.5,7.55])(mezzoCapitelloBeta)
									]);
	var capitelli = COLOR(avorioMuro)(STRUCT([capitelloGamma, S([0])([-1])(capitelloGamma)]));

	var colonnato = STRUCT([basiColonne,colonne,capitelli]);
	return colonnato;
};



/***********************************************************************************************
*	Ritorna il tetto sopra il colonnato, lungo 4, largo 10.2 (la sommità), alto 0.9+1.75=2.65
*	e il cui spigolo in basso a destra ha coordinate x=4.45, y=0.2, z=7.8.	
***********************************************************************************************/
var getTettoSopraColonnato = function(){
	var parteDritta1Alfa = STRUCT([	SIMPLEX_GRID([[4.45],[-0.2,0.6],[-7.8,0.25]]),
									SIMPLEX_GRID([[-3.85,0.6],[-0.8,3.2],[-7.8,0.25]])
									]);
	var parteDritta1 = COLOR(marroneCornicione)(STRUCT([parteDritta1Alfa, S([0])([-1])(parteDritta1Alfa)]));

	var parteDritta2Alfa = STRUCT([	SIMPLEX_GRID([[4.35],[-0.3,0.6],[-8.15,0.2]]),
									SIMPLEX_GRID([[-3.85,0.5],[-0.8,3.2],[-8.15,0.2]])
									]);
	var parteDritta2 = COLOR(avorioMuro)(STRUCT([parteDritta2Alfa, S([0])([-1])(parteDritta2Alfa)]));

	var parteDritta3Alfa = STRUCT([	SIMPLEX_GRID([[4.45],[-0.2,0.6],[-8.35,0.25]]),
									SIMPLEX_GRID([[-3.85,0.6],[-0.8,3.2],[-8.35,0.25]])
									]);
	var parteDritta3 = COLOR(marroneCornicione)(STRUCT([parteDritta3Alfa, S([0])([-1])(parteDritta3Alfa)]));
	
	var parteDritta = STRUCT([parteDritta1,parteDritta2,parteDritta3]);

	
	//parte spigolosa inferiore laterale
	var c1 = BEZIER(S0)([[4.45,3.95,8.05],[4.5,3.9,8.05],[4.5,3.9,8.15]]);	//curva diagonale a destra vicino muro
	var c2 = BEZIER(S0)([[4.45,0.2,8.05],[4.5,0.15,8.05],[4.5,0.15,8.15]]);//curva diagonale a destra
	var c1c2 = BEZIER(S1)([c1,c2]);
	//parte spigolosa inferiore laterale: striscia di chiusura sopra
	var d1 = BEZIER(S0)([[4.5,3.9,8.15],[4.5,0.15,8.15]]);
	var d2 = BEZIER(S0)([[4.35,4.1,8.15],[4.35,0.3,8.15]]);
	var d1d2 = BEZIER(S1)([d1,d2]);
	//parte spigolosa inferiore centrale
	var c3 = BEZIER(S0)([[0,0.2,8.05],[0,0.15,8.05],[0,0.15,8.15]]);	//curva (no diagonale) centrale
	var c2c3 = BEZIER(S1)([c2,c3]);
	//parte spigolosa inferiore centrale: striscia di chiusura sopra
	var d3 = BEZIER(S0)([[0,0.15,8.15],[4.5,0.15,8.15]]);
	var d4 = BEZIER(S0)([[0,0.3,8.15],[4.45,0.3,8.15]]);
	var d3d4 = BEZIER(S1)([d3,d4]);
	
	var parteSpigolosaInferioreAlfa = STRUCT([	MAP(c1c2)(domain2),
												MAP(d1d2)(domain2),
												MAP(c2c3)(domain2),
												MAP(d3d4)(domain2)
											]);
	var parteSpigolosaInferiore = COLOR(marroneCornicione)(STRUCT([	parteSpigolosaInferioreAlfa,
																	S([0])([-1])(parteSpigolosaInferioreAlfa)
																	]));

	var baseTettoAlfa = SIMPLEX_GRID([[4.65],[4],[-8.6,0.1]]);
	var mattonciniSottoBaseTetto = SIMPLEX_GRID([[-0.15,0.2,-0.3,0.2,-0.3,0.2,-0.3,0.2,-0.3,0.2,-0.3,0.2,-0.3,0.2,-0.3,0.2,-0.3,0.2],[0.2],[-8.45,0.15]]);
	var mattonciniSottoBaseTettoLaterali = SIMPLEX_GRID([[-4.45,0.2],[-0.4,0.2,-0.3,0.2,-0.3,0.2,-0.3,0.2,-0.3,0.2,-0.3,0.2,-0.3,0.2],[-8.45,0.15]]);
	var baseTettoBeta = STRUCT([baseTettoAlfa,mattonciniSottoBaseTetto,mattonciniSottoBaseTettoLaterali]);
	var baseTetto = COLOR(marroneCornicione)(STRUCT([baseTettoBeta, S([0])([-1])(baseTettoBeta)]));


	//pezzo inclinato parte sotto
	var parteInclinataTettoAlfa = SIMPLEX_GRID([[4.9],[4],[-8.6,0.15]]);
	var mattonciniSottoparteInclinataTettoAlfa = SIMPLEX_GRID([[0.1,-0.3,0.2,-0.3,0.2,-0.3,0.2,-0.3,0.2,-0.3,0.2,-0.3,0.2,-0.3,0.2,-0.3,0.2],[0.2],[-8.45,0.15]]);
	//riempimento trinagolino vuoto sopra
	var c1 = BEZIER(S0)([[0,0,8.75],[0,4,8.75]]);
	var c2 = BEZIER(S0)([[-0.057,0,8.75],[-0.057,4,8.75]]);
	var c1c2 = BEZIER(S1)([c1,c2]);

	var c3 = BEZIER(S0)([[0,0,8.6],[0,4,8.6]]);
	var c4 = BEZIER(S0)([[-0.0575,0,8.6],[-0.0575,4,8.6]]);
	var c3c4 = BEZIER(S1)([c3,c4]);

	var sol_c1c2c3c4 = BEZIER(S2)([c1c2,c3c4]);

	var c5 = BEZIER(S0)([[0,0,8.6],[-0.01,0,8.6]]);
	var c6 = BEZIER(S0)([[0,0,8.57]]);
	var c5c6 = BEZIER(S1)([c5,c6]);

	var riempimento = STRUCT([MAP(sol_c1c2c3c4)(domain3), MAP(c5c6)(domain2)]);

	var parteInclinataTettoBeta = STRUCT([parteInclinataTettoAlfa,mattonciniSottoparteInclinataTettoAlfa,riempimento]);
	var parteInclinataTettoGamma = R([0,2])([PI/10])(parteInclinataTettoBeta);
	var parteInclinataTetto = T([0,2])([-2.65,2])(parteInclinataTettoGamma);
	var tettoParteSotto = COLOR(marroneCornicione)(STRUCT([parteInclinataTetto, S([0])([-1])(parteInclinataTetto)]));
	

	//pezzo inclinato parte sopra
	var g1 = BEZIER(S0)([[0,0,10.34],[0,4,10.34]]);
	var g2 = BEZIER(S0)([[0,0,10.45],[0,4,10.45]]);
	var g1g2 = BEZIER(S1)([g1,g2]);

	var g3 = BEZIER(S0)([[4.8,0,8.78],[4.8,4,8.78]]);
	var g4 = BEZIER(S0)([[4.9,0,8.87],[4.9,4,8.87]]);
	var g3g4 = BEZIER(S1)([g3,g4]);

	var g1g2g3g4 = BEZIER(S2)([g1g2,g3g4]);
	var tettoParteSopraAlfa = MAP(g1g2g3g4)(domain3);
	var tettoParteSopra = COLOR(rossoTetti)(STRUCT([tettoParteSopraAlfa, S([0])([-1])(tettoParteSopraAlfa)]));

	//triangolo interno
	var t1 = BEZIER(S0)([[0,0.6,10.3],[4.65,0.6,8.7]]);
	var ps = BEZIER(S0)([[0,0.6,8.7]]);
	var t1ps = BEZIER(S1)([t1,ps]);

	var triangoloAlfa = MAP(t1ps)(domain2);
	var triangolo = COLOR(bianco)(STRUCT([triangoloAlfa, S([0])([-1])(triangoloAlfa)]));
	
	var tetto = STRUCT([parteDritta,parteSpigolosaInferiore,baseTetto,tettoParteSotto,tettoParteSopra,triangolo]);
	return tetto;
};



/**********************************************************************************
*	Ritorna il cornicione frontale centrale, alto 7.8 da terra, il cui spigolo in
*	alto a destra (quello più grande) ha coordinate: x=8.3, y=0, z=8.7
***********************************************************************************/
var getCornicioneFrontale_Centrale = function(){
	var parteDritta1 = SIMPLEX_GRID([[-4.45,3.75],[-0.1,0.45],[-7.8,0.25]]);
	var parteDritta2 = SIMPLEX_GRID([[-4.45,3.7],[-0.15,0.4],[-8.15,0.2]]);
	var parteDritta3 = SIMPLEX_GRID([[-4.45,3.8],[-0.05,0.5],[-8.35,0.25]]);
	var parteDritta4 = SIMPLEX_GRID([[4.45],[-0.15,0.4],[-7.8,0.9]]);

	var parteDritta11 = STRUCT([parteDritta1, S([0])([-1])(parteDritta1)]);
	var parteDritta22 = STRUCT([parteDritta2, S([0])([-1])(parteDritta2)]);
	var parteDritta33 = STRUCT([parteDritta3, S([0])([-1])(parteDritta3)]);
	var parteDritta44 = STRUCT([parteDritta4, S([0])([-1])(parteDritta4)]);

	var parteDritta = (STRUCT([	COLOR(marroneCornicione)(parteDritta11),
								COLOR(avorioMuro)(parteDritta22),
								COLOR(marroneCornicione)(parteDritta33),
								COLOR(avorioMuro)(parteDritta44)
								]));

	
	//parte spigolosa inferiore
	var c1 = BEZIER(S0)([[8.2,0.1,8.05],[8.25,0.05,8.05],[8.25,0.05,8.15]]);	//curva diagonale a destra
	var c2 = BEZIER(S0)([[4.45,0.1,8.05],[4.5,0.05,8.05],[4.5,0.05,8.15]]);	//curva diagonale vicino colonne
	var c1c2 = BEZIER(S1)([c1,c2]);
	//parte spigolosa inferiore: striscia di chiusura sopra
	var d1 = BEZIER(S0)([[4.5,0.05,8.15],[8.25,0.05,8.15]]);
	var d2 = BEZIER(S0)([[4.35,0.15,8.15],[8.2,0.15,8.15]]);
	var d1d2 = BEZIER(S1)([d1,d2]);
	//parte spigolosa inferiore parte laterale destra
	var c3 = BEZIER(S0)([[8.2,0.55,8.05],[8.25,0.55,8.05],[8.25,0.55,8.15]]);	//curva laterale a destra
	var c1c3 = BEZIER(S1)([c1,c3]);
	//parte spigolosa inferiore parte laterale destra: striscia di chiusura sopra
	var d3 = BEZIER(S0)([[8.25,0.05,8.15],[8.25,0.55,8.15]]);
	var d4 = BEZIER(S0)([[8.15,0.1,8.15],[8.15,0.55,8.15]]);
	var d3d4 = BEZIER(S1)([d3,d4]);
	
	var parteSpigolosaInferioreAlfa = STRUCT([	MAP(c1c2)(domain2),
												MAP(d1d2)(domain2),
												MAP(c1c3)(domain2),
												MAP(d3d4)(domain2)
											]);
	var parteSpigolosaInferiore = COLOR(marroneCornicione)(STRUCT([	parteSpigolosaInferioreAlfa,
																	S([0])([-1])(parteSpigolosaInferioreAlfa)
																]));

	
	//parte spigolosa superiore
	var f1 = BEZIER(S0)([[8.25,0.05,8.6],[8.3,0,8.6],[8.3,0,8.7]]);	//curva diagonale a destra
	var f2 = BEZIER(S0)([[4.65,0.05,8.6],[4.65,0,8.6],[4.65,0,8.7]]);	//curva (no diagonale) vicino colonne
	var f1f2 = BEZIER(S1)([f1,f2]);
	//parte spigolosa superiore: striscia di chiusura sopra
	var g1 = BEZIER(S0)([[4.65,0,8.7],[8.3,0,8.7]]);
	var g2 = BEZIER(S0)([[4.65,0.15,8.7],[8.25,0.15,8.7]]);
	var g1g2 = BEZIER(S1)([g1,g2]);
	//parte spigolosa superiore parte laterale destra
	var f3 = BEZIER(S0)([[8.25,0.55,8.6],[8.3,0.55,8.6],[8.3,0.55,8.7]]);	//curva laterale a destra
	var f1f3 = BEZIER(S1)([f1,f3]);
	//parte spigolosa superiore parte laterale destra: striscia di chiusura sopra
	var g3 = BEZIER(S0)([[8.3,0,8.7],[8.3,0.55,8.7]]);
	var g4 = BEZIER(S0)([[8.15,0.15,8.7],[8.15,0.55,8.7]]);
	var g3g4 = BEZIER(S1)([g3,g4]);

	var parteSpigolosaSuperioreAlfa = STRUCT([	MAP(f1f2)(domain2),
												MAP(g1g2)(domain2),
												MAP(f1f3)(domain2),
												MAP(g3g4)(domain2)
											]);
	var parteSpigolosaSuperiore = COLOR(marroneCornicione)(STRUCT([	parteSpigolosaSuperioreAlfa,
																	S([0])([-1])(parteSpigolosaSuperioreAlfa)
																]));	
	
	var cornicione = STRUCT([parteDritta,parteSpigolosaInferiore,parteSpigolosaSuperiore]);
	return cornicione;
};



/*********************************************************************************************************
*	Ritorna il muro frontale superiore, con lo spigolo in basso a destra di coordinate x=8.15, y=0, z=8.7
**********************************************************************************************************/
var getMuroFrontale_Superiore = function(){
	var muroAlfa = STRUCT([	SIMPLEX_GRID([[3.3,-0.9,2.25,-0.9,0.8],[0.4],[-8.7,1.75]]),
							SIMPLEX_GRID([[-3.3,0.9],[0.4],[-8.7,0.81,-0.6,0.34]]),
							SIMPLEX_GRID([[-6.45,0.9],[0.4],[-8.7,0.01,-1.4,0.34]])
							]);
	var muro = COLOR(avorioMuro)(STRUCT([muroAlfa, S([0])([-1])(muroAlfa)]));

	//finestre piccole
	var finestraPiccola = T([1,2])([0.1,9.51])(getFinestraFrontale_09x06());
	var finestrePiccole = STRUCT([	T([0])([3.3])(finestraPiccola),
									T([0])([-4.2])(finestraPiccola)
									]);
	
	//finestre grandi
	var finestraGrande = T([1])([0.15])(getFinestraFrontale_09x14());
	var finestreGrandi = STRUCT([	T([0])([6.45])(finestraGrande),
									T([0])([-7.35])(finestraGrande)
									]);

	//ringhiere
	var domain = DOMAIN([[0,1],[0,2*PI]])([15,15]);
	var profiloColonnina = BEZIER(S0)([[-0.055,0,8.71],[0.045,0,8.71],[-0.215,0,8.76],[-0.005,0,8.88],[-0.015,0,8.91]]);
	var mapping = ROTATIONAL_SURFACE(profiloColonnina);
	var mezzaColonnina1 = MAP(mapping)(domain);
	var mezzaColonnina2 = T([2])([17.82])(R([0,2])([PI])(mezzaColonnina1));
	var colonnina = STRUCT([mezzaColonnina1,mezzaColonnina2]);
	var ringhiera = STRUCT([T([0,1])([6.585,0.06])(colonnina),
							T([0,1])([6.795,0.06])(colonnina),
							T([0,1])([7.005,0.06])(colonnina),
							T([0,1])([7.215,0.06])(colonnina),
							T([1])([-0.1])(SIMPLEX_GRID([[-6.45,0.9],[0.25],[-9.11,0.08]]))
							]);
	var ringhiere = COLOR(bianco)(STRUCT([ringhiera, S([0])([-1])(ringhiera)]));

	var muroSuperiore = STRUCT([muro,finestrePiccole,finestreGrandi,ringhiere]);
	return muroSuperiore;
};



/************************************************************************************
*	Ritorna il cornicione superiore frontale, alto 10.45 da terra, il cui spigolo in
*	alto a destra (quello più grande) ha coordinate: x=8.35, y=0, z=10.75
*************************************************************************************/
var getCornicioneFrontale_Superiore = function(){
	var parteDrittaAlfa = SIMPLEX_GRID([[8.15],[-0.2,0.4],[-10.45,0.1]]);
	var parteDritta = STRUCT([parteDrittaAlfa, S([0])([-1])(parteDrittaAlfa)]);

	//parte spigolosa inferiore
	var c1 = BEZIER(S0)([[0,0.2,10.55],[0,0.1,10.55],[0,0.1,10.65]]);			//curva (no diagonale) vicino colonne
	var c2 = BEZIER(S0)([[8.15,0.2,10.55],[8.25,0.1,10.55],[8.25,0.1,10.65]]);	//curva diagonale a destra
	var c1c2 = BEZIER(S1)([c1,c2]);
	//parte spigolosa inferiore parte laterale destra
	var c3 = BEZIER(S0)([[8.15,0.6,10.55],[8.25,0.6,10.55],[8.25,0.6,10.65]]);	//curva laterale a destra
	var c2c3 = BEZIER(S1)([c2,c3]);
	
	var parteSpigolosaInferioreAlfa = STRUCT([MAP(c1c2)(domain2),MAP(c2c3)(domain2)]);
	var parteSpigolosaInferiore = STRUCT([parteSpigolosaInferioreAlfa, S([0])([-1])(parteSpigolosaInferioreAlfa)]);

	
	//parte spigolosa superiore
	var f1 = BEZIER(S0)([[0,0.1,10.65],[0,0,10.65],[0,0,10.75]]);			//curva (no diagonale) vicino colonne
	var f2 = BEZIER(S0)([[8.25,0.1,10.65],[8.35,0,10.65],[8.35,0,10.75]]);	//curva diagonale a destra
	var f1f2 = BEZIER(S1)([f1,f2]);
	//parte spigolosa superiore parte laterale destra
	var f3 = BEZIER(S0)([[8.25,0.6,10.65],[8.35,0.6,10.65],[8.35,0.6,10.75]]);	//curva laterale a destra
	var f2f3 = BEZIER(S1)([f2,f3]);

	//parte spigolosa superiore: striscia di chiusura sopra (tramite il punto speciale)
	var d1 = BEZIER(S0)([[0,0,10.75],[8.35,0,10.75]]);
	//parte spigolosa superiore parte laterale destra: striscia di chiusura sopra (tramite il punto speciale)
	var d2 = BEZIER(S0)([[8.35,0,10.75],[8.35,0.6,10.75]]);
	var ps = BEZIER(S0)([[0,0.6,10.75]]);	//punto speciale
	var d1ps = BEZIER(S1)([d1,ps]);
	var d2ps = BEZIER(S1)([d2,ps]);
	
	var parteSpigolosaSuperioreAlfa = STRUCT([	MAP(f1f2)(domain2),
												MAP(f2f3)(domain2),
												MAP(d1ps)(domain2),
												MAP(d2ps)(domain2)
												]);
	var parteSpigolosaSuperiore = STRUCT([parteSpigolosaSuperioreAlfa, S([0])([-1])(parteSpigolosaSuperioreAlfa)]);	
	
	var cornicione = COLOR(marroneCornicione)(STRUCT([parteDritta,parteSpigolosaInferiore,parteSpigolosaSuperiore]));
	return cornicione;
};



/****************************************************************************************************
*	Ritorna la facciata frontale;																	*
*	Il muro centrale è largo 8.15 e lungo 0.4, ed è traslato in avanti sulle y di 0.1;				*
*	Il muro inferiore è largo 8.25 e lungo 0.5, ed è  attaccato all'asse x, cioè è traslato di y=0;	*
*	Il muro superiore è largo 8.15 e lungo 0.4, ed è traslato in avanti sulle y di 0.1;				*
*	Il cornicione alla base è largo 8.45 e lungo 0.7;												*
*	Il cornicione inferiore è largo 8.3 e lungo 0.55;												*
*	Il cornicione centrale è largo 8.3 e lungo 0.55;												*
*	Il cornicione superiore è largo 8.35 e lungo 0.6;												*
*****************************************************************************************************
*	Tutta la facciata quindi è lunga 16.3 (se si considera il muro centrale), oppure 16.5 (se si	*
*	considera il muro inferiore), oppure 16.9 (se si considera il cornicione alla base).			*
*	La y postiva dell'intera facciata vale 0.5														*
*****************************************************************************************************/
var getFacciataFrontale = function(){
	var facciataFrontale = STRUCT([	T([1])([-3.9])(getCornicioneFrontale_AllaBase()),
									T([1])([-5.8])(getScalinata()),									
									T([1])([-3.7])(getPortico()),
									T([1])([-0.05])(getCornicioneFrontale_Inferiore()),
									T([1])([0.1])(getMuroFrontale_Centrale()),
									T([1])([-0.05])(getCornicioneFrontale_Centrale()),
									T([1])([0.1])(getMuroFrontale_Superiore()),
									T([1])([-0.1])(getCornicioneFrontale_Superiore()),
									T([1])([-3.7])(getColonnato()),
									T([1])([-3.9])(getTettoSopraColonnato())
									]);
	return facciataFrontale;
};





/****************************FACCIATE LATERALI****************************/

/*************************************************************************************
*	Ritorna il muro laterale inferiore, alto 3, largo 0.5, con lo spigolo in basso a
*	destra di coordinate x=8.25, y=0, z=0
**************************************************************************************/
var getMuroLaterale_Inferiore = function(){
	var muroAlfa = STRUCT([	SIMPLEX_GRID([[-7.75,0.5],[0.75,-0.9,3,-0.9,3,-0.9,0.75],[3]]),
							SIMPLEX_GRID([[-7.75,0.5],[-0.75,0.9],[-2.8,0.2]]),
							SIMPLEX_GRID([[-7.75,0.5],[-4.65,0.9,-3,0.9],[1.55,-1.25,0.2]])
							]);
	var muro = COLOR(bianco)(STRUCT([muroAlfa, S([0])([-1])(muroAlfa)]));

	//finestre
	var corniceAlfa = STRUCT([	SIMPLEX_GRID([[-7.75,0.4],[-4.65,0.9,-3,0.9],[-1.55,0.075,-1.1,0.075]]),	//corniceOrizzontale
								SIMPLEX_GRID([[-7.75,0.4],[-4.65,0.075,-0.3,0.15,-0.3,0.075,-3,0.075,-0.3,0.15,-0.3,0.075],[-1.625,1.1]])	//corniceVerticale
								]);
	var cornice = COLOR(oroCornice)(STRUCT([corniceAlfa, S([0])([-1])(corniceAlfa)]));
	var vetroAlfa = SIMPLEX_GRID([[-7.75,0.3],[-4.725,0.3,-0.15,0.3,-3.15,0.3,-0.15,0.3],[-1.625,1.1]]);
	var vetro = COLOR(azzurroTrasparente)(STRUCT([vetroAlfa, S([0])([-1])(vetroAlfa)]));
	var finestre = STRUCT([cornice,vetro]);

	//porta
	var portaAlfa = SIMPLEX_GRID([[-7.75,0.4],[-0.75,0.9],[2.8]]);
	var porta = COLOR(grigioPorta)(STRUCT([portaAlfa, S([0])([-1])(portaAlfa)]));
		
	var muroInferiore = STRUCT([muro,finestre,porta]);
	return muroInferiore;
};



/*******************************************************************************************
*	Ritorna il cornicione laterale che sta alla base, alto 0.35+0.5+0.4+0.1=1.35 da terra,
*	il cui spigolo in basso a destra (quello più grande) ha coordinate:  x=8.45, y=0, z=0.
*	Ritorna anche gli scalini della porta.
********************************************************************************************/
var getCornicioneLaterale_AllaBase = function(){
	var scaliniPortaAlfa = STRUCT([	SIMPLEX_GRID([[-8.15,0.1],[-0.75,0.9],[0.45]]),
									SIMPLEX_GRID([[-8.25,0.1],[-0.75,0.9],[0.3]]),
									SIMPLEX_GRID([[-8.35,0.1],[-0.75,0.9],[0.15]])
									]);
	var scaliniPorta = COLOR(bianco)(STRUCT([scaliniPortaAlfa, S([0])([-1])(scaliniPortaAlfa)]));


	var parteDritta = STRUCT([	SIMPLEX_GRID([[-8.25,0.2],[0.75,-0.9,8.55],[0.35]]),
								SIMPLEX_GRID([[-8.25,0.15],[0.75,-0.9,8.55],[-0.35,0.5]]),
								SIMPLEX_GRID([[-8.25,0.1],[0.75,-0.9,8.55],[-0.85,0.4]])
								]);
	//parte spigolosa
	var c1 = BEZIER(S0)([[8.35,0,1.25],[8.25,0,1.35]]);
	var c2 = BEZIER(S0)([[8.35,0.75,1.25],[8.25,0.75,1.35]]);
	var c1c2 = BEZIER(S1)([c1,c2]);
	var c3 = BEZIER(S0)([[8.35,0.75,1.25],[8.25,0.75,1.25]]);	//parte per chiusura vicino porta
	var c2c3 = BEZIER(S1)([c2,c3]);

	var c4 = BEZIER(S0)([[8.35,1.65,1.25],[8.25,1.65,1.35]]);
	var c5 = BEZIER(S0)([[8.35,10.2,1.25],[8.25,10.2,1.35]]);
	var c4c5 = BEZIER(S1)([c4,c5]);
	var c6 = BEZIER(S0)([[8.35,1.65,1.25],[8.25,1.65,1.25]]);	//parte per chiusura vicino porta
	var c4c6 = BEZIER(S1)([c4,c6]);
	
	var parteSpigolosa = STRUCT([	MAP(c1c2)(domain2),
									MAP(c2c3)(domain2),
									MAP(c4c5)(domain2),
									MAP(c4c6)(domain2)
								]);

	var cornicioneAlfa = STRUCT([parteDritta,parteSpigolosa]);
	var cornicioneBeta = COLOR(marronePietra)(STRUCT([cornicioneAlfa, S([0])([-1])(cornicioneAlfa)]));
	var cornicione = STRUCT([scaliniPorta,cornicioneBeta]);
	return cornicione;		
};



/**************************************************************************************************
*	Ritorna il cornicione laterale inferiore, alto 3 da terra, largo 0.4+0.15=0.55, il cui spigolo
*	in basso a destra (quello più grande) ha coordinate:  x=8.3, y=0, z=3
**************************************************************************************************/
var getCornicioneLaterale_Inferiore = function(){
	var parteDritta = STRUCT([	SIMPLEX_GRID([[-7.75,0.55],[10.2],[-3,0.25]]),
								SIMPLEX_GRID([[-7.75,0.5],[10.2],[-3.25,0.25]]),
								SIMPLEX_GRID([[-7.75,0.45],[10.2],[-3.5,0.25]])
								]);
	//parte spigolosa	
	var c1 = BEZIER(S0)([[8.2,0,3.75],[8.15,0,3.75],[8.15,0,3.85]]);
	var c2 = BEZIER(S0)([[8.2,10.2,3.75],[8.15,10.2,3.75],[8.15,10.2,3.85]]);
	var c1c2 = BEZIER(S1)([c1,c2]);
	var parteSpigolosa = MAP(c1c2)(domain2);

	var cornicioneInferioreAlfa = STRUCT([parteDritta,parteSpigolosa]);
	var cornicioneInferiore = COLOR(marronePietra)(STRUCT([cornicioneInferioreAlfa, S([0])([-1])(cornicioneInferioreAlfa)]));
	return cornicioneInferiore;
};



/*********************************************************************************************************
*	Ritorna il muro laterale centrale, con lo spigolo in basso a destra di coordinate x=8.15, y=0, z=3.85
**********************************************************************************************************/
var getMuroLaterale_Centrale = function(){
	var muroAlfa = STRUCT([	SIMPLEX_GRID([[-7.75,0.4],[0.75,-0.9,3,-0.9,3,-0.9,0.75],[-3.85,3.95]]),
							SIMPLEX_GRID([[-7.75,0.4],[-0.75,0.9,-3,0.9],[-3.85,0.1,-2.1,1.75]]),
							SIMPLEX_GRID([[-7.75,0.4],[-8.55,0.9],[-3.85,0.1,-2.1,0.9,-0.6,0.25]])
							]);
	var muro = COLOR(avorioMuro)(STRUCT([muroAlfa, S([0])([-1])(muroAlfa)]));

	//finestre grandi
	var corniceGrandeAlfa = STRUCT([SIMPLEX_GRID([[-7.75,0.3],[-0.75,0.9,-3,0.9,-3,0.9],[-3.95,0.05,-0.95,0.1,-0.95,0.05]]),	//corniceOrizzontale
									SIMPLEX_GRID([[-7.75,0.3],[-0.75,0.1,-0.3,0.1,-0.3,0.1,-3,0.1,-0.3,0.1,-0.3,0.1,-3,0.1,-0.3,0.1,-0.3,0.1],[-4,0.95,-0.1,0.95]])	//corniceVerticale
									]);
	var corniceGrande = COLOR(oroCornice)(STRUCT([corniceGrandeAlfa, S([0])([-1])(corniceGrandeAlfa)]));
	var vetroGrandeAlfa = SIMPLEX_GRID([[-7.75,0.2],[-0.85,0.3,-0.1,0.3,-3.2,0.3,-0.1,0.3,-3.2,0.3,-0.1,0.3],[-4,0.95,-0.1,0.95]]);
	var vetroGrande = COLOR(azzurroTrasparente)(STRUCT([vetroGrandeAlfa, S([0])([-1])(vetroGrandeAlfa)]));
	var antaGrandeAlfa = SIMPLEX_GRID([[-8.05,0.45],[-0.75,0.05,-0.8,0.05,-3,0.05,-0.8,0.05,-3,0.05,-0.8,0.05],[-3.95,2.1]]);
	var antaGrande = COLOR(marroneAnta)(STRUCT([antaGrandeAlfa, S([0])([-1])(antaGrandeAlfa)]));
	var finestreGrandi = STRUCT([corniceGrande,vetroGrande,antaGrande]);

	//finestra piccola
	var cornicePiccolaAlfa = STRUCT([	SIMPLEX_GRID([[-7.75,0.3],[-8.55,0.9],[-6.95,0.05,-0.5,0.05]]),	//corniceOrizzontale
										SIMPLEX_GRID([[-7.75,0.3],[-8.55,0.1,-0.3,0.1,-0.3,0.1],[-7,0.5]])	//corniceVerticale
										]);
	var cornicePiccola = COLOR(oroCornice)(STRUCT([cornicePiccolaAlfa, S([0])([-1])(cornicePiccolaAlfa)]));
	var vetroPiccoloAlfa = SIMPLEX_GRID([[-7.75,0.2],[-8.65,0.3,-0.1,0.3],[-7,0.5]]);
	var vetroPiccolo = COLOR(azzurroTrasparente)(STRUCT([vetroPiccoloAlfa, S([0])([-1])(vetroPiccoloAlfa)]));
	var antaPiccolaAlfa = SIMPLEX_GRID([[-8.05,0.45],[-8.55,0.05,-0.8,0.05],[-6.95,0.6]]);
	var antaPiccola = COLOR(marroneAnta)(antaPiccolaAlfa, S([0])([-1])(antaPiccolaAlfa));
	var finestraPiccola = STRUCT([cornicePiccola,vetroPiccolo,antaPiccola]);

	var muroInferiore = STRUCT([muro,finestreGrandi,finestraPiccola]);
	return muroInferiore; 
};



/**********************************************************************************
*	Ritorna il cornicione laterale centrale, alto 7.8 da terra, il cui spigolo in
*	alto a destra (quello più grande) ha coordinate: x=8.45, y=0, z=8.7
***********************************************************************************/
var getCornicioneLaterale_Centrale = function(){
	var parteDritta1 = SIMPLEX_GRID([[-7.75,0.45],[10.2],[-7.8,0.25]]);
	var parteDritta2 = SIMPLEX_GRID([[-7.75,0.4],[10.2],[-8.15,0.2]]);
	var parteDritta3 = SIMPLEX_GRID([[-7.75,0.5],[10.2],[-8.35,0.25]]);
	
	var parteDritta11 = STRUCT([parteDritta1, S([0])([-1])(parteDritta1)]);
	var parteDritta22 = STRUCT([parteDritta2, S([0])([-1])(parteDritta2)]);
	var parteDritta33 = STRUCT([parteDritta3, S([0])([-1])(parteDritta3)]);
	
	var parteDritta = (STRUCT([	COLOR(marroneCornicione)(parteDritta11),
								COLOR(avorioMuro)(parteDritta22),
								COLOR(marroneCornicione)(parteDritta33)
							]));
	
	//parte spigolosa inferiore
	var c1 = BEZIER(S0)([[8.2,0,8.05],[8.25,0,8.05],[8.25,0,8.15]]);
	var c2 = BEZIER(S0)([[8.2,10.2,8.05],[8.25,10.2,8.05],[8.25,10.2,8.15]]);
	var c1c2 = BEZIER(S1)([c1,c2]);
	//parte spigolosa inferiore: striscia di chiusura sopra
	var d1 = BEZIER(S0)([[8.25,0,8.15],[8.25,10.2,8.15]]);
	var d2 = BEZIER(S0)([[8.15,0,8.15],[8.15,10.2,8.15]]);
	var d1d2 = BEZIER(S1)([d1,d2]);
	
	var parteSpigolosaInferiore = STRUCT([MAP(c1c2)(domain2),MAP(d1d2)(domain2)]);
		
	//parte spigolosa superiore
	var f1 = BEZIER(S0)([[8.25,0,8.6],[8.3,0,8.6],[8.3,0,8.7]]);
	var f2 = BEZIER(S0)([[8.25,10.2,8.6],[8.3,10.2,8.6],[8.3,10.2,8.7]]);
	var f1f2 = BEZIER(S1)([f1,f2]);
	//parte spigolosa superiore: striscia di chiusura sopra
	var g1 = BEZIER(S0)([[8.3,0,8.7],[8.3,10.2,8.7]]);
	var g2 = BEZIER(S0)([[8.15,0,8.7],[8.15,10.2,8.7]]);
	var g1g2 = BEZIER(S1)([g1,g2]);

	var parteSpigolosaSuperiore = STRUCT([MAP(f1f2)(domain2),MAP(g1g2)(domain2)]);

	var parteSpigolosaAlfa = STRUCT([parteSpigolosaInferiore,parteSpigolosaSuperiore]);
	var parteSpigolosa = COLOR(marroneCornicione)(STRUCT([parteSpigolosaAlfa, S([0])([-1])(parteSpigolosaAlfa)]));													
	
	var cornicione = STRUCT([parteDritta,parteSpigolosa]);
	return cornicione;
};



/*********************************************************************************************************
*	Ritorna il muro laterale superiore, con lo spigolo in basso a destra di coordinate x=8.15, y=0, z=8.7
**********************************************************************************************************/
var getMuroLaterale_Superiore = function(){
	var muroAlfa = STRUCT([	SIMPLEX_GRID([[-7.75,0.4],[0.75,-0.9,3,-0.9,3,-0.9,0.75],[-8.7,1.75]]),
							SIMPLEX_GRID([[-7.75,0.4],[-0.75,0.9,-3,0.9,-3,0.9],[-8.7,0.01,-1.4,0.34]])							
							]);
	var muro = COLOR(avorioMuro)(STRUCT([muroAlfa, S([0])([-1])(muroAlfa)]));

	//finestre
	var corniceAlfa = STRUCT([	SIMPLEX_GRID([[-7.75,0.25],[-0.75,0.9,-3,0.9,-3,0.9],[-8.71,0.1,-1.2,0.1]]),	//corniceOrizzontale
								SIMPLEX_GRID([[-7.75,0.25],[-0.75,0.1,-0.3,0.1,-0.3,0.1,-3,0.1,-0.3,0.1,-0.3,0.1,-3,0.1,-0.3,0.1,-0.3,0.1],[-8.81,1.2]])	//corniceVerticale
								]);
	var cornice = COLOR(oroCornice)(STRUCT([corniceAlfa, S([0])([-1])(corniceAlfa)]));
	var vetroAlfa = SIMPLEX_GRID([[-7.75,0.15],[-0.85,0.3,-0.1,0.3,-3.2,0.3,-0.1,0.3,-3.2,0.3,-0.1,0.3],[-8.81,1.2]]);
	var vetro = COLOR(azzurroTrasparente)(STRUCT([vetroAlfa, S([0])([-1])(vetroAlfa)]));
	var finestre = STRUCT([cornice,vetro]);

	//ringhiere
	var domain = DOMAIN([[0,1],[0,2*PI]])([15,15]);
	var profiloColonnina = BEZIER(S0)([[-0.055,0,8.71],[0.045,0,8.71],[-0.215,0,8.76],[-0.005,0,8.88],[-0.015,0,8.91]]);
	var mapping = ROTATIONAL_SURFACE(profiloColonnina);
	var mezzaColonnina1 = MAP(mapping)(domain);
	var mezzaColonnina2 = T([2])([17.82])(R([0,2])([PI])(mezzaColonnina1));
	var colonnina = STRUCT([mezzaColonnina1,mezzaColonnina2]);
	var ringhieraAlfa = STRUCT([T([0,1])([8.09,0.885])(colonnina),
								T([0,1])([8.09,1.095])(colonnina),
								T([0,1])([8.09,1.305])(colonnina),
								T([0,1])([8.09,1.515])(colonnina),
								SIMPLEX_GRID([[-8,0.25],[-0.75,0.9],[-9.11,0.08]])
								]);
	var ringhieraBeta = STRUCT([ringhieraAlfa,
								T([1])([3.9])(ringhieraAlfa),
								T([1])([7.8])(ringhieraAlfa)
								]);
	var ringhiere = COLOR(bianco)(STRUCT([ringhieraBeta, S([0])([-1])(ringhieraBeta)]));

	var muroSuperiore = STRUCT([muro,finestre,ringhiere]);
	return muroSuperiore;
};



/************************************************************************************
*	Ritorna il cornicione superiore laterale, alto 10.45 da terra, il cui spigolo in
*	alto a destra (quello più grande) ha coordinate: x=8.35, y=0, z=10.75
*************************************************************************************/
var getCornicioneLaterale_Superiore = function(){
	var parteDrittaAlfa = SIMPLEX_GRID([[-7.75,0.4],[10.2],[-10.45,0.1]]);
	var parteDritta = STRUCT([parteDrittaAlfa, S([0])([-1])(parteDrittaAlfa)]);

	//parte spigolosa inferiore
	var c1 = BEZIER(S0)([[8.15,0,10.55],[8.25,0,10.55],[8.25,0,10.65]]);			//curva (no diagonale) sinistra
	var c2 = BEZIER(S0)([[8.15,10.2,10.55],[8.25,10.2,10.55],[8.25,10.2,10.65]]);	//curva (no diagonale) destra
	var c1c2 = BEZIER(S1)([c1,c2]);	
	var parteSpigolosaInferioreAlfa = MAP(c1c2)(domain2);
	var parteSpigolosaInferiore = STRUCT([parteSpigolosaInferioreAlfa, S([0])([-1])(parteSpigolosaInferioreAlfa)]);

	//parte spigolosa superiore
	var f1 = BEZIER(S0)([[8.25,0,10.65],[8.35,0,10.65],[8.35,0,10.75]]);			//curva (no diagonale) sinistra
	var f2 = BEZIER(S0)([[8.25,10.2,10.65],[8.35,10.2,10.65],[8.35,10.2,10.75]]);	//curva (no diagonale) destra
	var f1f2 = BEZIER(S1)([f1,f2]);	
	//parte spigolosa superiore: striscia di chiusura sopra
	var g1 = BEZIER(S0)([[8.35,0,10.75],[8.35,10.2,10.75]]);
	var g2 = BEZIER(S0)([[7.75,0,10.75],[7.75,10.2,10.75]]);
	var g1g2 = BEZIER(S1)([g1,g2]);	
	var parteSpigolosaSuperioreAlfa = STRUCT([MAP(f1f2)(domain2),MAP(g1g2)(domain2)]);
	var parteSpigolosaSuperiore = STRUCT([parteSpigolosaSuperioreAlfa, S([0])([-1])(parteSpigolosaSuperioreAlfa)]);	
	
	var cornicione = COLOR(marroneCornicione)(STRUCT([parteDritta,parteSpigolosaInferiore,parteSpigolosaSuperiore]));
	return cornicione;
};



/****************************************************************************************************
*	Ritorna entrambe le facciate laterali;															*
*	Il muro centrale è largo 0.4 e lungo 10.2;		-->		la x positiva vale 8.15;				*
*	Il muro inferiore è largo 0.5 e lungo 10.2;  	-->		la x positiva vale 8.25;				*
*	Il muro superiore è largo 0.4 e lungo 10.2;		-->		la x positiva vale 8.15;				*
*	Il cornicione alla base è largo 0.7 e lungo 10.2;	-->	la x positiva vale 8.45;				*
*	Il cornicione inferiore è largo 0.55 e lungo 10.2;	-->	la x positiva vale 8.3;					*
*	Il cornicione centrale è largo 0.55 e lungo 10.2;	-->	la x positiva vale 8.3;					*
*	Il cornicione superiore è largo 0.6 e lungo 10.2;	-->	la x positiva vale 8.35					*
*****************************************************************************************************
*	Tutta la facciata quindi è lunga 10.2.															*
*	In realtà, combinata alla facciata frontale e posteriore, la facciata laterale è lunga in		*
*	tutto 11 (se si considera il muro centrale), oppure 11.2 (se si considera il muro inferiore), 	*
*	oppure 11.6 (se si considera il cornicione alla base).											*
*****************************************************************************************************/
var getFacciateLaterali = function(){
	var facciateLateraliAlfa = STRUCT([	getCornicioneLaterale_AllaBase(),
										getMuroLaterale_Inferiore(),
										getCornicioneLaterale_Inferiore(),
										getMuroLaterale_Centrale(),
										getCornicioneLaterale_Centrale(),
										getMuroLaterale_Superiore(),
										getCornicioneLaterale_Superiore()
										]);
	var facciateLaterali = T([1])([0.5])(facciateLateraliAlfa);
	return facciateLaterali;
};




/****************************FACCIATE LATERALI****************************/

//ritorna una finestra di dimensioni 0.9x1.15, ad altezza 1.6 da terra
var getFinestraPosteriore_09x115 = function(){
	var cornice = STRUCT([	SIMPLEX_GRID([[0.9],[0.3],[-1.6,0.1,-0.95,0.1]]),	//cornice orizzontale
							SIMPLEX_GRID([[0.1,-0.3,0.1,-0.3,0.1],[0.3],[-1.7,0.95]]),	//cornice verticale
							]);
	var vetro = SIMPLEX_GRID([[-0.1,0.3,-0.1,0.3],[-0.14,0.01],[-1.7,0.95]]);
	var finestra = STRUCT([COLOR(oroCornice)(cornice), COLOR(azzurroTrasparente)(vetro)]);
	return finestra;
};

//ritorna una finestra (senza le ante) di dimensioni 0.9x2.1, ad altezza 3.95 da terra
var getFinestraPosteriore_09x21_senzaAnte = function(){
	var cornice = STRUCT([	SIMPLEX_GRID([[0.9],[0.3],[-3.95,0.1,-1,0.1,-0.8,0.1]]),	//cornice orizzontale
							SIMPLEX_GRID([[0.1,-0.3,0.1,-0.3,0.1],[0.3],[-4.05,1,-0.1,0.8]]),	//cornice verticale
							]);
	var vetro = SIMPLEX_GRID([[-0.1,0.3,-0.1,0.3],[-0.14,0.01],[-4.05,1,-0.1,0.8]]);
	var finestra = STRUCT([COLOR(oroCornice)(cornice), COLOR(azzurroTrasparente)(vetro)]);
	return finestra;
};

//ritorna una finestra (con le ante) di dimensioni 0.9x2.1, ad altezza 3.95 da terra
var getFinestraPosteriore_09x21_conAnte = function(){
	var cornice = STRUCT([	SIMPLEX_GRID([[0.9],[0.3],[-3.95,0.1,-1,0.1,-0.8,0.1]]),	//cornice orizzontale
							SIMPLEX_GRID([[0.1,-0.3,0.1,-0.3,0.1],[0.3],[-4.05,1,-0.1,0.8]]),	//cornice verticale
							]);
	var vetro = SIMPLEX_GRID([[-0.1,0.3,-0.1,0.3],[-0.14,0.01],[-4.05,1,-0.1,0.8]]);
	var ante = SIMPLEX_GRID([[0.05,-0.8,0.05],[-0.3,0.45],[-3.95,2.1]]);
	var finestra = STRUCT([COLOR(oroCornice)(cornice), COLOR(azzurroTrasparente)(vetro), COLOR(marroneAnta)(ante)]);
	return finestra;
};

//ritorna una finestra di dimensioni 0.9x1.5, ad altezza 3.95 da terra
var getFinestraPosteriore_09x15 = function(){
	var cornice = STRUCT([	SIMPLEX_GRID([[0.9],[0.3],[-3.95,0.1,-1,0.1,-0.2,0.1]]),	//cornice orizzontale
							SIMPLEX_GRID([[0.1,-0.3,0.1,-0.3,0.1],[0.3],[-4.05,1,-0.1,0.2]]),	//cornice verticale
							]);
	var vetro = SIMPLEX_GRID([[-0.1,0.3,-0.1,0.3],[-0.14,0.01],[-4.05,1,-0.1,0.2]]);
	var finestra = STRUCT([COLOR(oroCornice)(cornice), COLOR(azzurroTrasparente)(vetro)]);
	return finestra;
};

//ritorna una finestra di dimensioni 1.1x2.1, ad altezza 3.95 da terra
var getFinestraPosteriore_11x21 = function(){
	var cornice = STRUCT([	SIMPLEX_GRID([[1.1],[0.3],[-3.95,0.1,-1,0.1,-0.8,0.1]]),	//cornice orizzontale
							SIMPLEX_GRID([[0.1,-0.4,0.1,-0.4,0.1],[0.3],[-4.05,1,-0.1,0.8]]),	//cornice verticale
							]);
	var vetro = SIMPLEX_GRID([[-0.1,0.4,-0.1,0.4],[-0.14,0.01],[-4.05,1,-0.1,0.8]]);
	var finestra = STRUCT([COLOR(oroCornice)(cornice), COLOR(azzurroTrasparente)(vetro)]);
	return finestra;
};

//ritorna una finestra di dimensioni 0.9x0.6, ad altezza 6.95 da terra
var getFinestraPosteriore_09x06_senzaAnte = function(){
	var cornice = STRUCT([	SIMPLEX_GRID([[0.9],[0.3],[-6.95,0.1,-0.4,0.1]]),	//cornice orizzontale
							SIMPLEX_GRID([[0.1,-0.3,0.1,-0.3,0.1],[0.3],[-7.05,0.4]]),	//cornice verticale
							]);
	var vetro = SIMPLEX_GRID([[-0.1,0.3,-0.1,0.3],[-0.14,0.01],[-7.05,0.4]]);
	var finestra = STRUCT([COLOR(oroCornice)(cornice), COLOR(azzurroTrasparente)(vetro)]);
	return finestra;
};

//ritorna una finestra di dimensioni 0.9x0.6, ad altezza 6.95 da terra
var getFinestraPosteriore_09x06_conAnte = function(){
	var cornice = STRUCT([	SIMPLEX_GRID([[0.9],[0.3],[-6.95,0.1,-0.4,0.1]]),	//cornice orizzontale
							SIMPLEX_GRID([[0.1,-0.3,0.1,-0.3,0.1],[0.3],[-7.05,0.4]]),	//cornice verticale
							]);
	var vetro = SIMPLEX_GRID([[-0.1,0.3,-0.1,0.3],[-0.14,0.01],[-7.05,0.4]]);
	var ante = SIMPLEX_GRID([[0.05,-0.8,0.05],[-0.3,0.45],[-6.95,0.6]]);
	var finestra = STRUCT([COLOR(oroCornice)(cornice), COLOR(azzurroTrasparente)(vetro), COLOR(marroneAnta)(ante)]);
	return finestra;
};

//ritorna una finestra di dimensioni 0.9x1.1, ad altezza 9.01 da terra
var getFinestraPosteriore_09x11 = function(){
	var cornice = STRUCT([	SIMPLEX_GRID([[0.9],[0.3],[-9.01,0.1,-0.9,0.1]]),	//cornice orizzontale
							SIMPLEX_GRID([[0.1,-0.3,0.1,-0.3,0.1],[0.3],[-9.11,0.9]]),	//cornice verticale
							]);
	var vetro = SIMPLEX_GRID([[-0.1,0.3,-0.1,0.3],[-0.14,0.01],[-9.11,0.9]]);
	var finestra = STRUCT([COLOR(oroCornice)(cornice), COLOR(azzurroTrasparente)(vetro)]);
	return finestra;
};

//ritorna una finestra di dimensioni 0.9x1.4, ad altezza 8.71 da terra
var getFinestraPosteriore_09x14 = function(){
	var cornice = STRUCT([	SIMPLEX_GRID([[0.9],[0.25],[-8.71,0.1,-1.2,0.1]]),	//cornice orizzontale
							SIMPLEX_GRID([[0.1,-0.3,0.1,-0.3,0.1],[0.25],[-8.81,1.2]]),	//cornice verticale
							]);
	var vetro = SIMPLEX_GRID([[-0.1,0.3,-0.1,0.3],[-0.14,0.01],[-8.81,1.2]]);
	var finestra = STRUCT([COLOR(oroCornice)(cornice), COLOR(azzurroTrasparente)(vetro)]);
	return finestra;
};



/*******************************************************************************************
*	Ritorna il cornicione posteriore che sta alla base, alto 0.35+0.5+0.4+0.1=1.35 da terra,
*	il cui spigolo in basso a destra (quello più grande) ha coordinate:  x=8.45, y=0, z=0.
*	Ritorna anche gli scalini della porta.
********************************************************************************************/
var getCornicionePosteriore_AllaBase = function(){
	var scaliniPortaAlfa = STRUCT([	SIMPLEX_GRID([[0.55],[-0.9,0.3],[0.3]]),
									SIMPLEX_GRID([[0.75],[-1.2,0.3],[0.15]])									
									]);
	var scaliniPorta = COLOR(bianco)(STRUCT([scaliniPortaAlfa, S([0])([-1])(scaliniPortaAlfa)]));


	var parteDritta = STRUCT([	SIMPLEX_GRID([[-0.55,3.9],[-1,0.2],[0.35]]),
								SIMPLEX_GRID([[-0.55,3.9],[-1,0.15],[-0.35,0.5]]),
								SIMPLEX_GRID([[-0.55,3.9],[-1,0.1],[-0.85,0.4]]),

								SIMPLEX_GRID([[-4.45,0.2],[-0.7,0.5],[0.35]]),
								SIMPLEX_GRID([[-4.45,0.15],[-0.65,0.5],[-0.35,0.5]]),
								SIMPLEX_GRID([[-4.45,0.1],[-0.6,0.5],[-0.85,0.4]]),

								SIMPLEX_GRID([[-4.45,4],[-0.5,0.2],[0.35]]),
								SIMPLEX_GRID([[-4.45,3.95],[-0.5,0.15],[-0.35,0.5]]),
								SIMPLEX_GRID([[-4.45,3.9],[-0.5,0.1],[-0.85,0.4]]),

								SIMPLEX_GRID([[-8.25,0.2],[0.5],[0.35]]),
								SIMPLEX_GRID([[-8.25,0.15],[0.5],[-0.35,0.5]]),
								SIMPLEX_GRID([[-8.25,0.1],[0.5],[-0.85,0.4]])
								]);

	//parte spigolosa
	var c1 = BEZIER(S0)([[0.55,1.1,1.25],[0.55,1,1.35]]);	//curva vicino porta
	var ps = BEZIER(S0)([[0.55,1,1]]);						//punto speciale
	var c1ps = BEZIER(S1)([c1,ps]);
	
	var c2 = BEZIER(S0)([[4.55,1.1,1.25],[4.45,1,1.35]]);
	var c1c2 = BEZIER(S1)([c1,c2]);

	var c3 = BEZIER(S0)([[4.55,0.6,1.25],[4.45,0.5,1.35]]);
	var c2c3 = BEZIER(S1)([c2,c3]);

	var c4 = BEZIER(S0)([[8.35,0.6,1.25],[8.25,0.5,1.35]]);
	var c3c4 = BEZIER(S1)([c3,c4]);

	var c5 = BEZIER(S0)([[8.35,0,1.25],[8.25,0,1.35]]);
	var c4c5 = BEZIER(S1)([c4,c5]);
	
	var parteSpigolosa = STRUCT([	MAP(c1ps)(domain2),
									MAP(c1c2)(domain2),
									MAP(c2c3)(domain2),
									MAP(c3c4)(domain2),
									MAP(c4c5)(domain2)
									]);

	var cornicioneAlfa = STRUCT([parteDritta,parteSpigolosa]);
	var cornicioneBeta = COLOR(marronePietra)(STRUCT([cornicioneAlfa, S([0])([-1])(cornicioneAlfa)]));
	var cornicione = STRUCT([scaliniPorta,cornicioneBeta]);
	return cornicione;		
};



/*****************************************************************************************************
*	Ritorna il muro posteriore inferiore, alto 3, lungo 0.5+0.5=1, e con lo spigolo in basso a destra
*	di coordinate x=8.25, y=0, z=0;
******************************************************************************************************/
var getMuroPosteriore_Inferiore = function(){
	var muroDietro = STRUCT([	SIMPLEX_GRID([[0.85,-0.9,0.85,-0.9,2.6,-0.9,1.25],[0.5],[3]]),
								SIMPLEX_GRID([[0.55,-0.3,0.9,-0.85,0.9,-2.6,0.9],[0.5],[1.6,-1.15,0.25]])
								]);
	var muroaAvanti = STRUCT([	SIMPLEX_GRID([[-0.55,0.3,-0.9,0.85,-0.9,0.95],[-0.5,0.5],[3]]),
								SIMPLEX_GRID([[-0.85,0.9,-0.85,0.9],[-0.5,0.5],[1.6,-1.15,0.25]]),
								SIMPLEX_GRID([[0.55],[-0.5,0.5],[-2.75,0.25]])
								]);
	var muroAlfa = STRUCT([muroDietro,muroaAvanti]);
	var muro = COLOR(bianco)(STRUCT([muroAlfa, S([0])([-1])(muroAlfa)]));

	var portaAlfa = SIMPLEX_GRID([[0.55],[-0.5,0.4],[2.75]]);
	var porta = COLOR(grigioPorta)(STRUCT([portaAlfa, S([0])([-1])(portaAlfa)]));

	//finestre avanti
	var finestra = getFinestraPosteriore_09x115();
	var finestreAvanti = STRUCT([	T([0,1])([0.85,0.6])(finestra),
									T([0,1])([2.6,0.6])(finestra),
									T([0,1])([-1.75,0.6])(finestra),
									T([0,1])([-3.5,0.6])(finestra)
									]);

	//finestre dietro
	var finestreDietro = STRUCT([	T([0,1])([6.1,0.1])(finestra),
									T([0,1])([-7,0.1])(finestra)
									]);

	var muroInferiore = STRUCT([muro,porta,finestreAvanti,finestreDietro]);
	return muroInferiore;
};



/**********************************************************************************
*	Ritorna il cornicione posteriore inferiore, alto 3 da terra, il cui spigolo in
*	basso a destra (quello più grande) ha coordinate:  x=8.3, y=0, z=3
***********************************************************************************/
var getCornicionePosteriore_Inferiore = function(){
	var parteDritta = STRUCT([	SIMPLEX_GRID([[4.35],[-0.9,0.15],[-3,0.25]]),
								SIMPLEX_GRID([[4.35],[-0.9,0.1],[-3.25,0.25]]),
								SIMPLEX_GRID([[4.35],[-0.9,0.05],[-3.5,0.25]]),

								SIMPLEX_GRID([[-4.35,0.15],[-0.55,0.5],[-3,0.25]]),
								SIMPLEX_GRID([[-4.35,0.1],[-0.5,0.5],[-3.25,0.25]]),
								SIMPLEX_GRID([[-4.35,0.05],[-0.45,0.5],[-3.5,0.25]]),

								SIMPLEX_GRID([[-4.35,3.95],[-0.4,0.15],[-3,0.25]]),
								SIMPLEX_GRID([[-4.35,3.9],[-0.4,0.1],[-3.25,0.25]]),
								SIMPLEX_GRID([[-4.35,3.85],[-0.4,0.05],[-3.5,0.25]]),

								SIMPLEX_GRID([[-8.15,0.15],[0.4],[-3,0.25]]),
								SIMPLEX_GRID([[-8.15,0.1],[0.4],[-3.25,0.25]]),
								SIMPLEX_GRID([[-8.15,0.05],[0.4],[-3.5,0.25]])
								]);

	//parte spigolosa
	var c1 = BEZIER(S0)([[0,0.95,3.75],[0,0.8,3.85]]);
	var c2 = BEZIER(S0)([[4.4,0.95,3.75],[4.35,0.8,3.85]]);
	var c1c2 = BEZIER(S1)([c1,c2]);

	var c3 = BEZIER(S0)([[4.4,0.45,3.75],[4.35,0.4,3.85]]);
	var c2c3 = BEZIER(S1)([c2,c3]);

	var c4 = BEZIER(S0)([[8.2,0.45,3.75],[8.15,0.4,3.85]]);
	var c3c4 = BEZIER(S1)([c3,c4]);

	var c5 = BEZIER(S0)([[8.2,0,3.75],[8.15,0,3.85]]);
	var c4c5 = BEZIER(S1)([c4,c5]);
	
	var parteSpigolosa = STRUCT([	MAP(c1c2)(domain2),
									MAP(c2c3)(domain2),
									MAP(c3c4)(domain2),
									MAP(c4c5)(domain2)
									]);

	var cornicioneInferioreAlfa = STRUCT([parteDritta,parteSpigolosa]);
	var cornicioneInferiore = COLOR(marronePietra)(STRUCT([cornicioneInferioreAlfa, S([0])([-1])(cornicioneInferioreAlfa)]));
	return cornicioneInferiore;		
};



/*************************************************************************************************************
*	Ritorna il muro posteriore centrale, con lo spigolo in basso a destra di coordinate x=8.15, y=0, z=3.85;
*************************************************************************************************************/
var getMuroPosteriore_Centrale = function(){
	// parte avanti
	var muroAvantiAlfa = STRUCT([	SIMPLEX_GRID([[-0.55,0.3,-0.9,0.85,-0.9,0.85],[0.8],[-3.85,3.95]]),
									SIMPLEX_GRID([[-0.55,0.3],[0.8],[-7.8,0.9]]),
									SIMPLEX_GRID([[0.55,-0.3,0.9],[0.8],[-3.85,0.1,-2.1,0.9]]),
									SIMPLEX_GRID([[-2.6,0.9],[0.8],[-3.85,0.1,-1.5,1.5,-0.6,0.25]])
									]);
	var muroAvanti = COLOR(avorioMuro)(STRUCT([muroAvantiAlfa, S([0])([-1])(muroAvantiAlfa)]));

	var finestra11x21 = T([0,1])([-0.55,0.4])(getFinestraPosteriore_11x21());

	var finestra09x21senzaAnte = T([1])([0.4])(getFinestraPosteriore_09x21_senzaAnte());
	var finestre09x21senzaAnte = STRUCT([	T([0])([0.85])(finestra09x21senzaAnte),
											T([0])([-1.75])(finestra09x21senzaAnte)
											]);

	var finestra09x15 = T([1])([0.4])(getFinestraPosteriore_09x15());
	var finestre09x15 = STRUCT([T([0])([2.6])(finestra09x15),
								T([0])([-3.5])(finestra09x15)
								]);

	var finestra09x06senzaAnte = T([1])([0.4])(getFinestraPosteriore_09x06_senzaAnte());
	var finestre09x06senzaAnte = STRUCT([	T([0])([2.6])(finestra09x06senzaAnte),
											T([0])([-3.5])(finestra09x06senzaAnte)
											]);

	var mezzaCornice = STRUCT([	SIMPLEX_GRID([[1.1],[-0.4,0.3],[-6.95,0.1,-1,0.1]]),
								SIMPLEX_GRID([[0.1,-0.4,0.1,-0.4,0.1],[-0.4,0.3],[-7.05,1]])									
								]);
	var mezzoVetro = SIMPLEX_GRID([[-0.1,0.4,-0.1,0.4],[-0.59,0.01],[-7.05,1]]);
	var mezzaFinestraAlfa = STRUCT([COLOR(oroCornice)(mezzaCornice), COLOR(azzurroTrasparente)(mezzoVetro)]);
	var mezzaFinestra = T([0])([-0.55])(mezzaFinestraAlfa);

	var unQuartoCornice = STRUCT([	SIMPLEX_GRID([[-0.1,0.8,-1.7,0.8],[-0.4,0.3],[-6.95,0.1]]),
									SIMPLEX_GRID([[-0.4,0.5,-1.7,0.5],[-0.4,0.3],[-8.05,0.1]]),
									SIMPLEX_GRID([[-0.4,0.1,-0.3,0.1,-1.7,0.1,-0.3,0.1],[-0.4,0.3],[-7.05,1]])									
									]);
	var unQuartoVetro = SIMPLEX_GRID([[-0.5,0.3,-1.9,0.3],[-0.59,0.01],[-7.05,1]]);
	var unQuartoFinestraAlfa = STRUCT([COLOR(oroCornice)(unQuartoCornice), COLOR(azzurroTrasparente)(unQuartoVetro)]);
	var unQuartoFinestra = T([0])([-1.75])(unQuartoFinestraAlfa);

	var finestreAvanti = STRUCT([finestra11x21,finestre09x21senzaAnte,finestre09x15,finestre09x06senzaAnte,mezzaFinestra,unQuartoFinestra]);
	
	
	//parte dietro
	var muroDietroAlfa = STRUCT([	SIMPLEX_GRID([[-4.35,1.75,-0.9,1.15],[0.4],[-3.85,3.95]]),
									SIMPLEX_GRID([[-6.1,0.9],[0.4],[-3.85,0.1,-2.1,0.9,-0.6,0.25]])									
									]);
	var muroDietro = COLOR(avorioMuro)(STRUCT([muroDietroAlfa, S([0])([-1])(muroDietroAlfa)]));

	var finestra09x21conAnte = getFinestraPosteriore_09x21_conAnte();
	var finestre09x21conAnte = STRUCT([	T([0])([6.1])(finestra09x21conAnte),
										T([0])([-7])(finestra09x21conAnte)
										]);

	var finestra09x06conAnte = getFinestraPosteriore_09x06_conAnte();
	var finestre09x06conAnte = STRUCT([	T([0])([6.1])(finestra09x06conAnte),
										T([0])([-7])(finestra09x06conAnte)
										]);

	var finestreDietro = STRUCT([finestre09x21conAnte,finestre09x06conAnte]);

	

	var muroCentrale = STRUCT([muroAvanti,muroDietro,finestreAvanti,finestreDietro]);
	return muroCentrale;
};



var getFinestreCentraliCurve = function(){
	var dominio3 = DOMAIN([[0,1],[0,1],[0,1]])([10,1,1]);

	//cornice centrale curva
	var c1a = CUBIC_HERMITE(S0)([[0,0,1.75],[0.55,0,1.67],[1,0,0],[0,0,0]]);
	var c2a = CUBIC_HERMITE(S0)([[0,0,1.65],[0.45,0,1.5925],[0.8,0,0],[0,0,0]]);
	var c1c2a = BEZIER(S1)([c1a,c2a]);

	var c1b = CUBIC_HERMITE(S0)([[0,0.3,1.75],[0.55,0.3,1.67],[1,0,0],[0,0,0]]);
	var c2b = CUBIC_HERMITE(S0)([[0,0.3,1.65],[0.45,0.3,1.5925],[0.8,0,0],[0,0,0]]);
	var c1c2b = BEZIER(S1)([c1b,c2b]);

	var c1c2a_c1c2b = BEZIER(S2)([c1c2a,c1c2b]);
	var sol_c1c2a_c1c2b = MAP(c1c2a_c1c2b)(dominio3);

	var c3a = BEZIER(S0)([[0,0,1.2],[0,0,1.65]]);
	var c4a = BEZIER(S0)([[0.05,0,1.2],[0.05,0,1.65]]);
	var c3c4a = BEZIER(S1)([c3a,c4a]);

	var c3b = BEZIER(S0)([[0,0.3,1.2],[0,0.3,1.65]]);
	var c4b = BEZIER(S0)([[0.05,0.3,1.2],[0.05,0.3,1.65]]);
	var c3c4b = BEZIER(S1)([c3b,c4b]);

	var c3c4a_c3c4b = BEZIER(S2)([c3c4a,c3c4b]);
	var sol_c3c4a_c3c4b = MAP(c3c4a_c3c4b)(dominio3);


	var c5a = BEZIER(S0)([[0.45,0,1.2],[0.45,0,1.5925]]);
	var c6a = BEZIER(S0)([[0.55,0,1.2],[0.55,0,1.67]]);
	var c5c6a = BEZIER(S1)([c5a,c6a]);

	var c5b = BEZIER(S0)([[0.45,0.3,1.2],[0.45,0.3,1.5925]]);
	var c6b = BEZIER(S0)([[0.55,0.3,1.2],[0.55,0.3,1.67]]);
	var c5c6b = BEZIER(S1)([c5b,c6b]);

	var c5c6a_c5c6b = BEZIER(S2)([c5c6a,c5c6b]);
	var sol_c5c6a_c5c6b = MAP(c5c6a_c5c6b)(dominio3);

	var corniceCentraleAlfa = STRUCT([sol_c1c2a_c1c2b,sol_c3c4a_c3c4b,sol_c5c6a_c5c6b]);
	var corniceCentrale = COLOR(oroCornice)(STRUCT([corniceCentraleAlfa, S([0])([-1])(corniceCentraleAlfa)]));

	//vetro centrale curvo
	var c7 = CUBIC_HERMITE(S0)([[0.05,0.15,1.65],[0.45,0.15,1.5925],[0.6,0,0],[0,0,0]]);
	var c8 = BEZIER(S0)([[0.05,0.15,1.2],[0.45,0.15,1.2]]);
	var c7c8 = BEZIER(S1)([c7,c8]);
	var vetroCentraleAlfa = MAP(c7c8)(domain2);
	var vetroCentrale = COLOR(azzurroMenoTrasparente)(STRUCT([vetroCentraleAlfa, S([0])([-1])(vetroCentraleAlfa)]));

	//muro centrale curvo
	var c9a = c1a;
	var c10a = CUBIC_HERMITE(S0)([[0,0.4,1.75],[0.55,0.4,1.67],[1,0,0],[0,0,0]]);
	var c9c10a = BEZIER(S1)([c9a,c10a]);

	var c9b = BEZIER(S0)([[0,0,1.75],[0.55,0,1.75]]);
	var c10b = BEZIER(S0)([[0,0.4,1.75],[0.55,0.4,1.75]]);
	var c9c10b = BEZIER(S1)([c9b,c10b]);

	var c9c10a_c9c10b = BEZIER(S2)([c9c10a,c9c10b]);
	var sol_c9c10a_c9c10b = MAP(c9c10a_c9c10b)(dominio3);
	var muroCentrale = COLOR(avorioMuro)(STRUCT([sol_c9c10a_c9c10b, S([0])([-1])(sol_c9c10a_c9c10b)]));

	//finestra centrale
	var finestraCentrale = STRUCT([corniceCentrale,vetroCentrale,muroCentrale]);

	
	//cornice laterale curva
	var d1a = CUBIC_HERMITE(S0)([[1.75,0,0],[0.85,0,1.55],[0,0,3.5],[0,0,0]]);
	var d2a = CUBIC_HERMITE(S0)([[1.75,0.3,0],[0.85,0.3,1.55],[0,0,3.5],[0,0,0]]);
	var d1d2a = BEZIER(S1)([d1a,d2a]);

	var d1b = CUBIC_HERMITE(S0)([[1.65,0,0],[0.85,0,1.435],[0,0,3.25],[0,0,0]]);
	var d2b = CUBIC_HERMITE(S0)([[1.65,0.3,0],[0.85,0.3,1.435],[0,0,3.25],[0,0,0]]);
	var d1d2b = BEZIER(S1)([d1b,d2b]);

	var d1d2a_d1d2b = BEZIER(S2)([d1d2a,d1d2b]);
	var sol_d1d2a_d1d2b = MAP(d1d2a_d1d2b)(dominio3);

	var d3a = BEZIER(S0)([[0.85,0,1.2],[0.95,0,1.2]]);
	var d4a = BEZIER(S0)([[0.85,0,1.45],[0.95,0,1.38]]);
	var d3d4a = BEZIER(S1)([d3a,d4a]);

	var d3b = BEZIER(S0)([[0.85,0.3,1.2],[0.95,0.3,1.2]]);
	var d4b = BEZIER(S0)([[0.85,0.3,1.45],[0.95,0.3,1.38]]);
	var d3d4b = BEZIER(S1)([d3b,d4b]);

	var d3d4a_d3d4b = BEZIER(S2)([d3d4a,d3d4b]);
	var sol_d3d4a_d3d4b = MAP(d3d4a_d3d4b)(dominio3);

	var corniceLateraleAlfa = STRUCT([sol_d1d2a_d1d2b,sol_d3d4a_d3d4b]);
	var corniceLaterale = COLOR(oroCornice)(STRUCT([corniceLateraleAlfa, S([0])([-1])(corniceLateraleAlfa)]));

	//vetro laterale curvo
	var d5 = CUBIC_HERMITE(S0)([[1.175,0.15,1.2],[0.95,0.15,1.375],[0,0,0.025],[-0.1,0,0]]);
	var d6 = BEZIER(S0)([[0.95,0.15,1.2]]);
	var d5d6 = BEZIER(S1)([d5,d6]);

	var d7 = CUBIC_HERMITE(S0)([[1.65,0.15,0.1],[1.27,0.15,1.1],[0,0,1.7],[0,0,0]]);
	var d8 = BEZIER(S0)([[1.27,0.15,0.1]]);
	var d7d8 = BEZIER(S1)([d7,d8]);

	var vetroLateraleAlfa = STRUCT([MAP(d5d6)(domain2), MAP(d7d8)(domain2)]);
	var vetroLaterale = COLOR(azzurroMenoTrasparente)(STRUCT([vetroLateraleAlfa, S([0])([-1])(vetroLateraleAlfa)]));

	//muro laterale curvo
	var d9a = d1a;
	var d10a = CUBIC_HERMITE(S0)([[1.75,0.4,0],[0.85,0.4,1.55],[0,0,3.5],[0,0,0]]);
	var d9d10a = BEZIER(S1)([d9a,d10a]);

	var d9b = BEZIER(S0)([[1.75,0,1.75],[0.85,0,1.75]]);
	var d10b = BEZIER(S0)([[1.75,0.4,1.75],[0.85,0.4,1.75]]);
	var d9d10b = BEZIER(S1)([d9b,d10b]);

	var d9d10a_d9d10b = BEZIER(S2)([d9d10a,d9d10b]);
	var sol_d9d10a_d9d10b = MAP(d9d10a_d9d10b)(dominio3);
	var muroLaterale = COLOR(avorioMuro)(STRUCT([sol_d9d10a_d9d10b, S([0])([-1])(sol_d9d10a_d9d10b)]));

	//finestra centrale
	var finestraLaterale = STRUCT([corniceLaterale,vetroLaterale,muroLaterale]);

	var finestreCentraliCurve = STRUCT([finestraCentrale,finestraLaterale]);
	return T([1,2])([0.4,6.95])(finestreCentraliCurve);
};



var getTettoPosteriore = function(){
	var pezzoDritto = SIMPLEX_GRID([[-1.55,3],[-0.81,0.3],[-8.6,0.1]]);
	var coperturaDietropezzoDritto = SIMPLEX_GRID([[-1.75,2.6],[0.81],[-8.35,0.25]]);
	var mattonciniSottoPezzoDritto = SIMPLEX_GRID([[-1.75,0.15,-0.3,0.15,-0.3,0.15,-0.3,0.15,-0.3,0.15,-0.3,0.15],[-0.81,0.3],[-8.5,0.1]]);
	var tettoPezzoDritto = STRUCT([pezzoDritto,coperturaDietropezzoDritto,mattonciniSottoPezzoDritto]);


	var pezzoInclinato = SIMPLEX_GRID([[4.7],[-0.8,0.31],[-8.7,0.2]]);
	var coperturaDietropezzoInclinato1 = SIMPLEX_GRID([[-0.04,4.45],[-0.8,0.01],[-8.45,0.25]]);
	var coperturaDietropezzoInclinato2 = SIMPLEX_GRID([[-4.49,0.21],[-0.8,0.01],[-8.6,0.1]]);
	var mattonciniSottoPezzoInclinato = SIMPLEX_GRID([[0.075,-0.3,0.15,-0.3,0.15,-0.3,0.15,-0.3,0.15,-0.3,0.15,-0.3,0.15,-0.3,0.15,-0.3,0.15,-0.3,0.15],[-0.81,0.3],[-8.6,0.1]]);
	var tettoPezzoInclinatoAlfa = STRUCT([pezzoInclinato,coperturaDietropezzoInclinato1,coperturaDietropezzoInclinato2,mattonciniSottoPezzoInclinato]);

	var c1 = BEZIER(S0)([[-0.03,0.81,8.7],[0.04,0.81,8.7]]);
	var c2 = BEZIER(S0)([[0.04,0.81,8.45]]);
	var coperturaDietropezzoInclinato3 = MAP(BEZIER(S1)([c1,c2]))(domain2);

	var c3 = BEZIER(S0)([[0,0.8,8.9],[0,1.11,8.9]]);
	var c4 = BEZIER(S0)([[-0.087,0.8,8.9],[-0.087,1.11,8.9]]);
	var c3c4 = BEZIER(S1)([c3,c4]);

	var c5 = BEZIER(S0)([[0,0.8,8.6],[0,1.11,8.6]]);
	var sol_c3c4c5 = BEZIER(S2)([c3c4,c5]);
	var coperturaDietropezzoInclinato4 = MAP(sol_c3c4c5)(domain3);

	var tettoPezzoInclinatoBeta = STRUCT([tettoPezzoInclinatoAlfa,coperturaDietropezzoInclinato3,coperturaDietropezzoInclinato4]);

	var tettoPezzoInclinatoGamma = R([0,2])([PI/11])(tettoPezzoInclinatoBeta);
	var tettoPezzoInclinato = T([0,2])([-2.425,1.675])(tettoPezzoInclinatoGamma);

	var tettoAlfa = STRUCT([tettoPezzoDritto,tettoPezzoInclinato]);
	var tetto = COLOR(marroneCornicione)(STRUCT([tettoAlfa, S([0])([-1])(tettoAlfa)]));
	return tetto;
}



/**********************************************************************************
*	Ritorna il cornicione posteriore centrale, alto 7.8 da terra, il cui spigolo in
*	alto a destra (quello più grande) ha coordinate: x=8.3, y=0, z=8.7
***********************************************************************************/
var getCornicionePosteriore_Centrale = function(){
	var parteDritta = STRUCT([	SIMPLEX_GRID([[-1.85,2.5],[-0.8,0.05],[-7.8,0.25]]),
																
								SIMPLEX_GRID([[-4.35,0.05],[-0.45,0.4],[-7.8,0.25]]),
								SIMPLEX_GRID([[-4.35,0.1],[-0.5,0.31],[-8.35,0.25]]),
								
								SIMPLEX_GRID([[-4.35,3.85],[-0.4,0.05],[-7.8,0.25]]),
								SIMPLEX_GRID([[-4.35,3.9],[-0.4,0.1],[-8.35,0.25]]),								

								SIMPLEX_GRID([[-8.15,0.05],[0.4],[-7.8,0.25]]),
								SIMPLEX_GRID([[-8.15,0.1],[0.4],[-8.35,0.25]])								
								]);

	//parte spigolosa inferiore
	var c1 = BEZIER(S0)([[1.75,0.85,8.05],[1.75,0.9,8.05],[1.75,0.9,8.15]]);
	var c2 = BEZIER(S0)([[4.4,0.85,8.05],[4.45,0.9,8.05],[4.45,0.9,8.15]]);
	var c1c2 = BEZIER(S1)([c1,c2]);

	var c3 = BEZIER(S0)([[4.4,0.45,8.05],[4.45,0.5,8.05],[4.45,0.5,8.15]]);
	var c2c3 = BEZIER(S1)([c2,c3]);

	var c4 = BEZIER(S0)([[8.2,0.45,8.05],[8.25,0.5,8.05],[8.25,0.5,8.15]]);
	var c3c4 = BEZIER(S1)([c3,c4]);

	var c5 = BEZIER(S0)([[8.2,0,8.05],[8.25,0,8.05],[8.25,0,8.15]]);
	var c4c5 = BEZIER(S1)([c4,c5]);

	//parte spigolosa inferiore: strisce di chiusura sopra
	var d1 = BEZIER(S0)([[1.75,0.9,8.15],[4.45,0.9,8.15]]);
	var d2 = BEZIER(S0)([[1.75,0.8,8.15],[4.35,0.8,8.15]]);
	var d1d2 = BEZIER(S1)([d1,d2]);

	var d3 = BEZIER(S0)([[4.45,0.9,8.15],[4.45,0.5,8.15]]);
	var d4 = BEZIER(S0)([[4.35,0.8,8.15],[4.35,0.4,8.15]]);
	var d3d4 = BEZIER(S1)([d3,d4]);

	var d5 = BEZIER(S0)([[4.45,0.5,8.15],[8.25,0.5,8.15]]);
	var d6 = BEZIER(S0)([[4.35,0.4,8.15],[8.15,0.4,8.15]]);
	var d5d6 = BEZIER(S1)([d5,d6]);

	var d7 = BEZIER(S0)([[8.25,0.5,8.15],[8.25,0,8.15]]);
	var d8 = BEZIER(S0)([[8.15,0.4,8.15],[8.15,0,8.15]]);
	var d7d8 = BEZIER(S1)([d7,d8]);

	var d9 = BEZIER(S0)([[1.75,0.8,8.05],[1.75,0.8,8.15]]);
	var c1d9 = BEZIER(S1)([c1,d9]);
	
	var parteSpigolosaInferiore = STRUCT([	MAP(c1c2)(domain2),
											MAP(c2c3)(domain2),
											MAP(c3c4)(domain2),
											MAP(c4c5)(domain2),
											MAP(d1d2)(domain2),
											MAP(d3d4)(domain2),
											MAP(d5d6)(domain2),
											MAP(d7d8)(domain2),
											MAP(c1d9)(domain2)
											]);

	//parte spigolosa superiore
	var f1 = BEZIER(S0)([[4.45,0.8,8.6],[4.5,0.8,8.6],[4.5,0.8,8.7]]);
	var f2 = BEZIER(S0)([[4.45,0.5,8.6],[4.5,0.55,8.6],[4.5,0.55,8.7]]);
	var f1f2 = BEZIER(S1)([f1,f2]);

	var f3 = BEZIER(S0)([[8.25,0.5,8.6],[8.3,0.55,8.6],[8.3,0.55,8.7]]);
	var f2f3 = BEZIER(S1)([f2,f3]);

	var f4 = BEZIER(S0)([[8.25,0,8.6],[8.3,0,8.6],[8.3,0,8.7]]);
	var f3f4 = BEZIER(S1)([f3,f4]);

	//parte spigolosa superiore: strisce di chiusura sopra
	var g1 = BEZIER(S0)([[4.5,0.8,8.7],[4.5,0.55,8.7]]);
	var g2 = BEZIER(S0)([[4.35,0.8,8.7],[4.35,0.4,8.7]]);
	var g1g2 = BEZIER(S1)([g1,g2]);

	var g3 = BEZIER(S0)([[4.45,0.55,8.7],[8.3,0.55,8.7]]);
	var g4 = BEZIER(S0)([[4.35,0.4,8.7],[8.15,0.4,8.7]]);
	var g3g4 = BEZIER(S1)([g3,g4]);

	var g5 = BEZIER(S0)([[8.3,0.55,8.7],[8.3,0,8.7]]);
	var g6 = BEZIER(S0)([[8.15,0.4,8.7],[8.15,0,8.7]]);
	var g5g6 = BEZIER(S1)([g5,g6]);

	var g7 = BEZIER(S0)([[4.35,0.8,8.6],[4.35,0.8,8.7]]);
	var f1g7 = BEZIER(S1)([f1,g7]);
	
	var parteSpigolosaSuperiore = STRUCT([	MAP(f1f2)(domain2),
											MAP(f2f3)(domain2),
											MAP(f3f4)(domain2),
											MAP(g1g2)(domain2),
											MAP(g3g4)(domain2),
											MAP(g5g6)(domain2),
											MAP(f1g7)(domain2)
											]);

	var cornicioneCentraleAlfa = STRUCT([parteDritta,parteSpigolosaInferiore,parteSpigolosaSuperiore]);
	var cornicioneCentraleBeta = COLOR(marroneCornicione)(STRUCT([cornicioneCentraleAlfa, S([0])([-1])(cornicioneCentraleAlfa)]));

	var pezzoDrittoMuroAlfa = STRUCT([	SIMPLEX_GRID([[-1.75,2.6],[-0.4,0.4],[-8.15,0.2]]),
										SIMPLEX_GRID([[-1.75,6.4],[0.4],[-8.15,0.2]]),
										SIMPLEX_GRID([[-1.75,0.1],[-0.4,0.4],[-7.8,0.25]])
										]);
	var pezzoDrittoMuro = COLOR(avorioMuro)(STRUCT([pezzoDrittoMuroAlfa,S([0])([-1])(pezzoDrittoMuroAlfa)]));

	var cornicioneCentrale = STRUCT([cornicioneCentraleBeta,pezzoDrittoMuro]);
	return cornicioneCentrale;	
};



/*********************************************************************************************************
*	Ritorna il muro posteriore superiore, con lo spigolo in basso a destra di coordinate x=8.15, y=0, z=8.7
**********************************************************************************************************/
var getMuroPosteriore_Superiore = function(){
	// parte avanti
	var muroAvantiAlfa = STRUCT([	SIMPLEX_GRID([[-0.55,2.05,-0.9,0.85],[0.8],[-8.7,1.75]]),
									SIMPLEX_GRID([[-2.6,0.9],[0.8],[-8.7,0.31,-1.1,0.34]]),
									SIMPLEX_GRID([[0.55],[0.8],[-8.7,0.31,-0.6,0.84]])
									]);

	var finestra09x11 = T([1])([0.4])(getFinestraPosteriore_09x11());
	var finestre09x11 = STRUCT([T([0])([2.6])(finestra09x11),
								T([0])([-3.5])(finestra09x11),
								]);

	//pezzo muro inclinato
	var m1 = BEZIER(S0)([[0.55,0.4,9.4],[0.55,0.8,9.4]]);
	var m2 = BEZIER(S0)([[0,0.4,9.61],[0,0.8,9.61]]);
	var m1m2 = BEZIER(S1)([m1,m2]);

	var m3 = BEZIER(S0)([[0.55,0.4,9.61],[0.55,0.8,9.61]]);
	var m1m2m3 = BEZIER(S2)([m1m2,m3]);

	var pezzoMuroInclinato = MAP(m1m2m3)(domain3);
	var muroAvantiBeta = STRUCT([muroAvantiAlfa,pezzoMuroInclinato]);
	var muroAvanti = COLOR(avorioMuro)(STRUCT([muroAvantiBeta, S([0])([-1])(muroAvantiBeta)]));

	var corniceCentraleAlfa = STRUCT([	SIMPLEX_GRID([[0.55],[-0.4,0.3],[-9.01,0.1]]),				//corniceOrizzontale
										SIMPLEX_GRID([[0.05,-0.4,0.1],[-0.4,0.3],[-9.11,0.29]])		//corniceVerticale
										]);

	//pezzo cornice inclinata
	var c1 = BEZIER(S0)([[0.55,0.4,9.4],[0.55,0.7,9.4]]);
	var c2 = BEZIER(S0)([[0,0.4,9.61],[0,0.7,9.61]]);
	var c1c2 = BEZIER(S1)([c1,c2]);

	var c3 = BEZIER(S0)([[0.45,0.4,9.4],[0.45,0.7,9.4]]);
	var c4 = BEZIER(S0)([[0,0.4,9.56],[0,0.7,9.56]]);
	var c3c4 = BEZIER(S1)([c3,c4]);
	
	var c1c2c3c4 = BEZIER(S2)([c1c2,c3c4]);

	var c5 = BEZIER(S0)([[0.45,0.4,9.35],[0.45,0.7,9.35]]);
	var c6 = BEZIER(S0)([[0,0.4,9.51],[0,0.7,9.51]]);
	var c5c6 = BEZIER(S1)([c5,c6]);
	var c3c4c5c6 = BEZIER(S2)([c3c4,c5c6]);

	var pezzoCorniceInclinata = STRUCT([MAP(c1c2c3c4)(domain3), MAP(c3c4c5c6)(domain3)]);

	//pezzo cornice dritta
	var c7 = BEZIER(S0)([[0,0.4,9.4],[0,0.7,9.4]]);
	var c6c7 = BEZIER(S1)([c6,c7]);

	var c8 = BEZIER(S0)([[0.05,0.4,9.4922],[0.05,0.7,9.4925]]);
	var c9 = BEZIER(S0)([[0.05,0.4,9.4],[0.05,0.7,9.4]]);
	var c8c9 = BEZIER(S1)([c8,c9]);

	var c6c7c8c9 = BEZIER(S2)([c6c7,c8c9]);
	pezzoCorniceDritta = MAP(c6c7c8c9)(domain3);

	var corniceCentraleBeta = STRUCT([corniceCentraleAlfa,pezzoCorniceInclinata,pezzoCorniceDritta]);
	var corniceCentrale = COLOR(oroCornice)(STRUCT([corniceCentraleBeta, S([0])([-1])(corniceCentraleBeta)]));

	//pezzo vetro centrale
	var d1 = BEZIER(S0)([[0.45,0.6,9.06],[0.45,0.6,9.35]]);
	var d2 = BEZIER(S0)([[0.05,0.6,9.06],[0.05,0.6,9.4922]]);
	var d1d2 = BEZIER(S1)([d1,d2]);

	var vetroCentraleAlfa = MAP(d1d2)(domain2);
	var vetroCentrale = COLOR(azzurroMenoTrasparente)(STRUCT([vetroCentraleAlfa, S([0])([-1])(vetroCentraleAlfa)]));

	var finestreAvanti = STRUCT([finestre09x11,corniceCentrale,vetroCentrale]);
	

	//parte dietro
	var muroDietroAlfa = STRUCT([	SIMPLEX_GRID([[-4.35,1.75,-0.9,1.15],[0.4],[-8.7,1.75]]),
									SIMPLEX_GRID([[-6.1,0.9],[0.4],[-8.7,0.01,-1.4,0.34]])
									]);
	var muroDietro = COLOR(avorioMuro)(STRUCT([muroDietroAlfa, S([0])([-1])(muroDietroAlfa)]));


	var finestra09x14 = getFinestraPosteriore_09x14();
	var finestre09x14 = STRUCT([T([0])([6.1])(finestra09x14),
								T([0])([-7])(finestra09x14),
								]);
	//ringhiere
	var domain = DOMAIN([[0,1],[0,2*PI]])([15,15]);
	var profiloColonnina = BEZIER(S0)([[-0.055,0,8.71],[0.045,0,8.71],[-0.215,0,8.76],[-0.005,0,8.88],[-0.015,0,8.91]]);
	var mapping = ROTATIONAL_SURFACE(profiloColonnina);
	var mezzaColonnina1 = MAP(mapping)(domain);
	var mezzaColonnina2 = T([2])([17.82])(R([0,2])([PI])(mezzaColonnina1));
	var colonnina = STRUCT([mezzaColonnina1,mezzaColonnina2]);
	var ringhiera = STRUCT([T([0,1])([6.235,0.34])(colonnina),
							T([0,1])([6.445,0.34])(colonnina),
							T([0,1])([6.655,0.34])(colonnina),
							T([0,1])([6.865,0.34])(colonnina),
							SIMPLEX_GRID([[-6.1,0.9],[-0.25,0.25],[-9.11,0.08]])
							]);
	var ringhiere = COLOR(bianco)(STRUCT([ringhiera, S([0])([-1])(ringhiera)]));

	var finestreDietro = STRUCT([finestre09x14,ringhiere]);

	var muroSuperiore = STRUCT([muroAvanti,muroDietro,finestreAvanti,finestreDietro]);
	return muroSuperiore;
};



/************************************************************************************
*	Ritorna il cornicione posteriore superiore, alto 10.45 da terra, il cui spigolo in
*	alto a destra (quello più grande) ha coordinate: x=8.35, y=0, z=10.75
*************************************************************************************/
var getCornicionePosteriore_Superiore = function(){
	var parteDrittaAlfa = STRUCT([	SIMPLEX_GRID([[4.35],[-0.4,0.4],[-10.45,0.1]]),
									SIMPLEX_GRID([[8.15],[0.4],[-10.45,0.1]])
									]);
	var parteDritta = STRUCT([parteDrittaAlfa, S([0])([-1])(parteDrittaAlfa)]);

	//parte spigolosa inferiore
	var c1 = BEZIER(S0)([[0,0.8,10.55],[0,0.9,10.55],[0,0.9,10.65]]);
	var c2 = BEZIER(S0)([[4.35,0.8,10.55],[4.45,0.9,10.55],[4.45,0.9,10.65]]);
	var c1c2 = BEZIER(S1)([c1,c2]);

	var c3 = BEZIER(S0)([[4.35,0.4,10.55],[4.45,0.5,10.55],[4.45,0.5,10.65]]);
	var c2c3 = BEZIER(S1)([c2,c3]);

	var c4 = BEZIER(S0)([[8.15,0.4,10.55],[8.25,0.5,10.55],[8.25,0.5,10.65]]);
	var c3c4 = BEZIER(S1)([c3,c4]);

	var c5 = BEZIER(S0)([[8.15,0,10.55],[8.25,0,10.55],[8.25,0,10.65]]);
	var c4c5 = BEZIER(S1)([c4,c5]);
	
	var parteSpigolosaInferiore = STRUCT([	MAP(c1c2)(domain2),
											MAP(c2c3)(domain2),
											MAP(c3c4)(domain2),
											MAP(c4c5)(domain2)											
											]);

	//parte spigolosa superiore
	var f1 = BEZIER(S0)([[0,0.9,10.65],[0,1,10.65],[0,1,10.75]]);
	var f2 = BEZIER(S0)([[4.45,0.9,10.65],[4.55,1,10.65],[4.55,1,10.75]]);
	var f1f2 = BEZIER(S1)([f1,f2]);

	var f3 = BEZIER(S0)([[4.45,0.5,10.65],[4.55,0.6,10.65],[4.55,0.6,10.75]]);
	var f2f3 = BEZIER(S1)([f2,f3]);

	var f4 = BEZIER(S0)([[8.25,0.5,10.65],[8.35,0.6,10.65],[8.35,0.6,10.75]]);
	var f3f4 = BEZIER(S1)([f3,f4]);

	var f5 = BEZIER(S0)([[8.25,0,10.65],[8.35,0,10.65],[8.35,0,10.75]]);
	var f4f5 = BEZIER(S1)([f4,f5]);

	//parte spigolosa superiore: strisce di chiusura sopra
	var ps = BEZIER(S0)([[0,0,10.75]]);

	var g1 = BEZIER(S0)([[0,1,10.75],[4.55,1,10.75]]);
	var g1ps = BEZIER(S1)([g1,ps]);

	var g2 = BEZIER(S0)([[4.55,1,10.75],[4.55,0.6,10.75]]);
	var g2ps = BEZIER(S1)([g2,ps]);

	var g3 = BEZIER(S0)([[4.55,0.6,10.75],[8.35,0.6,10.75]]);
	var g3ps = BEZIER(S1)([g3,ps]);

	var g4 = BEZIER(S0)([[8.35,0.6,10.75],[8.35,0,10.75]]);
	var g4ps = BEZIER(S1)([g4,ps]);

	var parteSpigolosaSuperiore = STRUCT([	MAP(f1f2)(domain2),
											MAP(f2f3)(domain2),
											MAP(f3f4)(domain2),
											MAP(f4f5)(domain2),
											MAP(g1ps)(domain2),
											MAP(g2ps)(domain2),
											MAP(g3ps)(domain2),
											MAP(g4ps)(domain2)
											]);	
	
	var cornicioneAlfa = STRUCT([parteDritta,parteSpigolosaInferiore,parteSpigolosaSuperiore]);
	var cornicione = COLOR(marroneCornicione)(STRUCT([cornicioneAlfa, S([0])([-1])(cornicioneAlfa)]));
	return cornicione;
};



/****************************************************************************************************
*	Ritorna la facciata posteriore;																	*
*	Il muro centrale è largo 8.15 e lungo 0.4;														*
*	Il muro inferiore è largo 8.25 e lungo 0.5;														*
*	Il muro superiore è largo 8.15 e lungo 0.4;														*
*	Il cornicione alla base è largo 8.45 e lungo 0.7;												*
*	Il cornicione inferiore è largo 8.3 e lungo 0.55;												*
*	Il cornicione centrale è largo 8.3 e lungo 0.55;												*
*	Il cornicione superiore è largo 8.35 e lungo 0.6;												*
*****************************************************************************************************
*	Tutta la facciata quindi è lunga 16.3 (se si considera il muro centrale), oppure 16.5 (se si	*
*	considera il muro inferiore), oppure 16.9 (se si considera il cornicione alla base).			*
*****************************************************************************************************/
var getFacciataPosteriore = function(){
	var facciataPosteriore = STRUCT([	getCornicionePosteriore_AllaBase(),
										getMuroPosteriore_Inferiore(),
										getCornicionePosteriore_Inferiore(),
										getMuroPosteriore_Centrale(),
										getFinestreCentraliCurve(),
										getCornicionePosteriore_Centrale(),
										getMuroPosteriore_Superiore(),
										getTettoPosteriore(),
										getCornicionePosteriore_Superiore()
										]);
	return T([1])([10.7])(facciataPosteriore);
};



/**************************** TETTO ****************************/

/************************************************************************************
*	Ritorna la copertura superiore, comprese le mansarde (ma senza camini);			*
*************************************************************************************/
var getCopertura = function(){
	//muri
	var muroFrontAlfa = STRUCT([SIMPLEX_GRID([[-1.85,0.75],[-0.1,4.4],[-11,1.2]]),
								SIMPLEX_GRID([[-0.55,0.4],[-0.1,0.4],[-11,1.2]]),
								SIMPLEX_GRID([[0.55,-0.4,0.9],[-0.1,0.4],[-11,0.01,-1.1,0.09]]),
								SIMPLEX_GRID([[1.85],[-4.1,0.4],[-11,1.2]]),
								]);
	var muroFront = COLOR(bianco)(STRUCT([muroFrontAlfa, S([0])([-1])(muroFrontAlfa)]));


	var muroBackAlfa = STRUCT([	SIMPLEX_GRID([[-1.85,0.75],[-0.1,4.4],[-10.85,1.35]]),
								SIMPLEX_GRID([[-0.55,0.4],[-0.1,0.4],[-10.85,1.35]]),
								SIMPLEX_GRID([[0.55,-0.4,0.9],[-0.1,0.4],[-10.85,0.06,-1.1,0.19]]),
								SIMPLEX_GRID([[1.85],[-4.1,0.4],[-10.85,1.35]]),
								]);
	var muroBackBeta = STRUCT([muroBackAlfa, S([0])([-1])(muroBackAlfa)]);
	var muroBack = COLOR(bianco)(S([1])([-1])(muroBackBeta));

	//cornici
	var corniceFrontAlfa = STRUCT([	SIMPLEX_GRID([[0.55,-0.4,0.9],[-0.2,0.3],[-11.01,0.1,-0.9,0.1]]),
									SIMPLEX_GRID([[0.05,-0.4,0.1,-0.4,0.1,-0.3,0.1,-0.3,0.1],[-0.2,0.3],[-11.11,0.9]])
									]);
	var corniceFront = COLOR(oroCornice)(STRUCT([corniceFrontAlfa, S([0])([-1])(corniceFrontAlfa)]));

	var corniceBackAlfa = STRUCT([	SIMPLEX_GRID([[0.55,-0.4,0.9],[-0.2,0.3],[-10.91,0.1,-0.9,0.1]]),
									SIMPLEX_GRID([[0.05,-0.4,0.1,-0.4,0.1,-0.3,0.1,-0.3,0.1],[-0.2,0.3],[-11.01,0.9]])
									]);
	var corniceBackBeta = STRUCT([corniceBackAlfa, S([0])([-1])(corniceBackAlfa)]);
	var corniceBack = COLOR(oroCornice)(S([1])([-1])(corniceBackBeta));

	//vetri
	var vetroFrontAlfa = SIMPLEX_GRID([[-0.05,0.4,-0.6,0.3,-0.1,0.3],[-0.35,0.01],[-11.1,0.9]]);
	var vetroFront = COLOR(azzurroTrasparente)(STRUCT([vetroFrontAlfa, S([0])([-1])(vetroFrontAlfa)]));

	var vetroBackAlfa = SIMPLEX_GRID([[-0.05,0.4,-0.6,0.3,-0.1,0.3],[-0.35,0.01],[-11.01,0.9]]);
	var vetroBackBeta = STRUCT([vetroBackAlfa, S([0])([-1])(vetroBackAlfa)]);
	var vetroBack = COLOR(azzurroTrasparente)(S([1])([-1])(vetroBackBeta));

	//pezzi dritti base tetto
	var pezzoDrittoFrontAlfa1 = SIMPLEX_GRID([[2.6],[-0.1,4.4],[-12.2,0.3]]);
	var pezzoDrittoFrontAlfa2 = SIMPLEX_GRID([[2.6],[4.5],[-12.5,0.1]]);
	var pezzoDrittoFrontAlfa = STRUCT([pezzoDrittoFrontAlfa1,pezzoDrittoFrontAlfa2]);
	var pezzoDrittoFront = COLOR(marroneCornicione)(STRUCT([pezzoDrittoFrontAlfa, S([0])([-1])(pezzoDrittoFrontAlfa)]));

	var pezzoDrittoBack = COLOR(marroneCornicione)(S([1])([-1])(pezzoDrittoFront));


	//pezzi inclinati tetto
	var t1 = BEZIER(S0)([[0,0,13.35],[2.6,0,12.6]]);
	var t2 = BEZIER(S0)([[0,0,13.65],[2.65,0,12.9]]);
	var t1t2 = BEZIER(S1)([t1,t2]);

	var t3 = BEZIER(S0)([[0,4.5,13.35],[2.6,4.5,12.6]]);
	var t4 = BEZIER(S0)([[0,4.5,13.65],[2.65,4.5,12.9]]);
	var t3t4 = BEZIER(S1)([t3,t4]);

	var t1t2t3t4 = BEZIER(S2)([t1t2,t3t4]);
	var sol_t1t2t3t4Alfa = MAP(t1t2t3t4)(domain3);
	var sol_t1t2t3t4Front = COLOR(marroneCornicione)(STRUCT([sol_t1t2t3t4Alfa, S([0])([-1])(sol_t1t2t3t4Alfa)]));

	var sol_t1t2t3t4Back = COLOR(marroneCornicione)(S([1])([-1])(sol_t1t2t3t4Front));

	//triangolo bianco dentro
	var d1 = BEZIER(S0)([[0,0.5,12.6],[2.6,0.5,12.6]]);
	var d2 = BEZIER(S0)([[0,0.5,13.35]]);
	var d1d2 = BEZIER(S1)([d1,d2]);
	var triangoloAlfa = MAP(d1d2)(domain2);
	var triangoloFront = COLOR(bianco)(STRUCT([triangoloAlfa, S([0])([-1])(triangoloAlfa)]));

	var triangoloBack = COLOR(bianco)(S([1])([-1])(triangoloFront));


	var t5 = BEZIER(S0)([[0,0,13.65],[2.65,0,12.9]]);
	var t6 = BEZIER(S0)([[0,0,13.75],[2.7,0,12.95]]);
	var t5t6 = BEZIER(S1)([t5,t6]);

	var t7 = BEZIER(S0)([[0,5.5,13.65],[2.65,3.9,12.9]]);
	var t8 = BEZIER(S0)([[0,5.6,13.75],[2.7,4,12.95]]);
	var t7t8 = BEZIER(S1)([t7,t8]);

	var t5t6t7t8 = BEZIER(S2)([t5t6,t7t8]);
	var sol_t5t6t7t8Alfa = MAP(t5t6t7t8)(domain3);
	var sol_t5t6t7t8Front = COLOR(rossoTetti)(STRUCT([sol_t5t6t7t8Alfa, S([0])([-1])(sol_t5t6t7t8Alfa)]));

	var pezzoInclinatoFront = STRUCT([sol_t1t2t3t4Front, sol_t5t6t7t8Front, triangoloFront]);

	var pezzoInclinatoBack = STRUCT([sol_t1t2t3t4Back, triangoloBack]);


	//mansarda frontale
	var mansardaFront = STRUCT([muroFront,corniceFront,vetroFront,pezzoDrittoFront,pezzoInclinatoFront]);

	//mansarda posteriore
	var mansardaBackAlfa = T([1])([11.5])(STRUCT([muroBack,corniceBack,vetroBack,pezzoDrittoBack,pezzoInclinatoBack]));

	var t9 = BEZIER(S0)([[0,11.5,13.65],[2.65,11.5,12.9]]);
	var t10 = BEZIER(S0)([[0,11.5,13.75],[2.7,11.5,12.95]]);
	var t9t10 = BEZIER(S1)([t9,t10]);

	var t11 = BEZIER(S0)([[0,5.7,13.65],[2.65,7.3,12.9]]);
	var t12 = BEZIER(S0)([[0,5.6,13.75],[2.7,7.2,12.95]]);
	var t11t12 = BEZIER(S1)([t11,t12]);

	var t9t10t11t12 = BEZIER(S2)([t9t10,t11t12]);
	var sol_t9t10t11t12Alfa = MAP(t9t10t11t12)(domain3);
	var sol_t9t10t11t12Back = COLOR(rossoTetti)(STRUCT([sol_t9t10t11t12Alfa, S([0])([-1])(sol_t9t10t11t12Alfa)]));

	var mansardaBack = STRUCT([mansardaBackAlfa, sol_t9t10t11t12Back]);



	//tetto frontale
	var c1 = BEZIER(S0)([[2.6,-0.2,10.85],[8.45,-0.2,10.85]]);
	var c2 = BEZIER(S0)([[2.6,5.6,13.75],[3,5.6,13.75]]);
	var c1c2 = BEZIER(S1)([c1,c2]);

	var c3 = BEZIER(S0)([[0,-0.2,10.85],[2.6,-0.2,10.85]]);
	var c4 = BEZIER(S0)([[0,0.1,11],[2.6,0.1,11]]);
	var c3c4 = BEZIER(S1)([c3,c4]);

	var c5 = BEZIER(S0)([[0,5.6,13.75],[2.7,4,12.95]]);
	var c6 = BEZIER(S0)([[0,5.6,13.75],[2.6,5.6,13.75]]);
	var c5c6 = BEZIER(S1)([c5,c6]);

	var tettoFrontAlfa = STRUCT([	MAP(c1c2)(domain2),
									MAP(c3c4)(domain2),
									MAP(c5c6)(domain2)
									]);
	var tettoFront = COLOR(rossoTetti)(STRUCT([tettoFrontAlfa, S([0])([-1])(tettoFrontAlfa)]));


	//tetto laterale
	var c7 = BEZIER(S0)([[8.45,-0.2,10.85],[8.45,11.4,10.85]]);
	var c8 = BEZIER(S0)([[3,5.6,13.75]]);
	var c7c8 = BEZIER(S1)([c7,c8]);

	var tettoLatAlfa = MAP(c7c8)(domain2);
	var tettoLat = COLOR(rossoTetti)(STRUCT([tettoLatAlfa, S([0])([-1])(tettoLatAlfa)]));


	//tetto posteriore
	var c9 = BEZIER(S0)([[2.6,11.4,10.85],[8.45,11.4,10.85]]);
	var c10 = BEZIER(S0)([[2.6,5.6,13.75],[3,5.6,13.75]]);
	var c9c10 = BEZIER(S1)([c9,c10]);

	var c11 = BEZIER(S0)([[0,11.8,10.85],[4.65,11.8,10.85]]);
	var c12 = BEZIER(S0)([[0,11.4,10.85],[4.65,11.4,10.85]]);
	var c11c12 = BEZIER(S1)([c11,c12]);

	var c13 = BEZIER(S0)([[0,5.6,13.75],[2.7,7.2,12.95]]);
	var c14 = BEZIER(S0)([[0,5.6,13.75],[2.6,5.6,13.75]]);
	var c13c14 = BEZIER(S1)([c13,c14]);

	var tettoPosterioreAlfa = STRUCT([	MAP(c9c10)(domain2),
										MAP(c11c12)(domain2),
										MAP(c13c14)(domain2)
										]);
	var tettoPosteriore = COLOR(rossoTetti)(STRUCT([tettoPosterioreAlfa, S([0])([-1])(tettoPosterioreAlfa)]));




	//chiusure tetto frontale sotto
	var f1 = BEZIER(S0)([[0,-0.2,10.85],[8.45,-0.2,10.85]]);
	var f2 = BEZIER(S0)([[0,-0.1,10.75],[8.35,-0.1,10.75]]);
	var f1f2 = BEZIER(S1)([f1,f2]);

	//chiusure tetto laterale sotto
	var f3 = BEZIER(S0)([[8.45,-0.2,10.85],[8.45,11.4,10.85]]);
	var f4 = BEZIER(S0)([[8.35,-0.1,10.75],[8.35,11.3,10.75]]);
	var f3f4 = BEZIER(S1)([f3,f4]);

	//chiusure tetto posteriore sotto
	var f5 = BEZIER(S0)([[0,11.8,10.85],[4.65,11.8,10.85]]);
	var f6 = BEZIER(S0)([[0,11.7,10.75],[4.55,11.7,10.75]]);
	var f5f6 = BEZIER(S1)([f5,f6]);

	var f7 = BEZIER(S0)([[4.65,11.8,10.85],[4.65,11.4,10.85]]);
	var f8 = BEZIER(S0)([[4.55,11.7,10.75],[4.55,11.3,10.75]]);
	var f7f8 = BEZIER(S1)([f7,f8]);

	var f9 = BEZIER(S0)([[4.65,11.4,10.85],[8.45,11.4,10.85]]);
	var f10 = BEZIER(S0)([[4.55,11.3,10.75],[8.35,11.3,10.75]]);
	var f9f10 = BEZIER(S1)([f9,f10]);


	var chiusureSottoAlfa = STRUCT([MAP(f1f2)(domain2),
									MAP(f3f4)(domain2),
									MAP(f5f6)(domain2),
									MAP(f7f8)(domain2),
									MAP(f9f10)(domain2)
									]);
	var chiusureSotto = COLOR(rossoTetti)(STRUCT([chiusureSottoAlfa, S([0])([-1])(chiusureSottoAlfa)]));


	var tetto = STRUCT([tettoFront,mansardaFront, tettoLat, tettoPosteriore,mansardaBack, chiusureSotto]);
	return tetto;
};



/********************************************************************************
*	Ritorna gli otto camini presenti sul tetto									*
*********************************************************************************/
var getCamini = function(){
	//camino grande
	var piedistalloAlfa = STRUCT([	SIMPLEX_GRID([[-0.05,0.8],[-0.05,0.8],[-11.505,0.695]]),
									SIMPLEX_GRID([[0.9],[0.9],[-12.2,0.1]])
									]);
	var piedistallo = T([0,1])([-0.45,-0.45])(piedistalloAlfa);

	var domain = DOMAIN([[0,1],[0,2*PI]])([15,15]);
	var profiloAnelloSotto = BEZIER(S0)([[0.45,0,12.3],[0.45,0,12.4]]);
	var mapping1 = ROTATIONAL_SURFACE(profiloAnelloSotto);
	var anelloSotto = MAP(mapping1)(domain);

	var profiloColonna = BEZIER(S0)([[0.45,0,12.4],[0.45,0,14.4]]);
	var mapping2 = ROTATIONAL_SURFACE(profiloColonna);
	var colonna = MAP(mapping2)(domain);

	var profiloAnelloCentrale1 = BEZIER(S0)([[0.45,0,14.4],[0.45,0,14.5],[0.55,0,14.5]]);
	var mapping31 = ROTATIONAL_SURFACE(profiloAnelloCentrale1);
	var anelloCentrale1 = MAP(mapping31)(domain);

	var profiloAnelloCentrale2 = BEZIER(S0)([[0.45,0,14.5],[0.55,0,14.5]]);
	var mapping32 = ROTATIONAL_SURFACE(profiloAnelloCentrale2);
	var anelloCentrale2 = MAP(mapping32)(domain);

	var anelloCentrale = STRUCT([anelloCentrale1,anelloCentrale2]);

	var m1 = BEZIER(S0)([[0.53,-0.05,14.5],[0.53,-0.05,14.7],[0.73,-0.05,14.7],[0.73,-0.05,14.9],[0.63,-0.05,14.9]]);
	var m2 = BEZIER(S0)([[0.53,0.05,14.5],[0.53,0.05,14.7],[0.73,0.05,14.7],[0.73,0.05,14.9],[0.63,0.05,14.9]]);
	
	var m1m2 = BEZIER(S1)([m1,m2]);
	
	var m3 = BEZIER(S0)([[0.44,-0.05,14.5],[0.44,-0.05,14.7],[0.64,-0.05,14.7],[0.64,-0.05,14.9],[0.54,-0.05,14.9]]);
	var m4 = BEZIER(S0)([[0.44,0.05,14.5],[0.44,0.05,14.7],[0.64,0.05,14.7],[0.64,0.05,14.9],[0.54,0.05,14.9]]);
	var m3m4 = BEZIER(S1)([m3,m4]);

	var m1m3 = BEZIER(S1)([m1,m3]);
	var m2m4 = BEZIER(S1)([m2,m4]);
	var sol_m1m2m3m4 = STRUCT([MAP(m1m2)(domain2), MAP(m3m4)(domain2), MAP(m1m3)(domain2), MAP(m2m4)(domain2)]);

	var mattonciniAlfa = STRUCT([	sol_m1m2m3m4,
									R([0,1])([PI/6])(sol_m1m2m3m4),								
									R([0,1])([PI/3])(sol_m1m2m3m4),									
									R([0,1])([-PI/6])(sol_m1m2m3m4),									
									R([0,1])([-PI/3])(sol_m1m2m3m4)
									]);
	var mattoncini = STRUCT([	mattonciniAlfa,
								S([0])([-1])(mattonciniAlfa),
								R([0,1])([PI/2])(sol_m1m2m3m4),
								R([0,1])([-PI/2])(sol_m1m2m3m4)
								]);

	var profiloAnelloSopra1 = BEZIER(S0)([[0.55,0,14.9],[0.65,0,14.9]]);
	var mapping41 = ROTATIONAL_SURFACE(profiloAnelloSopra1);
	var anelloSopra1 = MAP(mapping41)(domain);

	var profiloAnelloSopra2 = BEZIER(S0)([[0.65,0,14.9],[0.65,0,15.1],[0.85,0,15.1]]);
	var mapping42 = ROTATIONAL_SURFACE(profiloAnelloSopra2);
	var anelloSopra2 = MAP(mapping42)(domain);

	var profiloAnelloSopra3 = BEZIER(S0)([[0.65,0,15.1],[0.85,0,15.1]]);
	var mapping43 = ROTATIONAL_SURFACE(profiloAnelloSopra3);
	var anelloSopra3 = MAP(mapping43)(domain);

	var anelloSopra = STRUCT([anelloSopra1,anelloSopra2,anelloSopra3]);

	var profiloPallaGrande = BEZIER(S0)([[0.7,0,15.1],[0.85,0,15.1],[0.85,0,16.7],[0.45,0,16],[-0.1,0,16.3],[0.025,0,16.5]]);
	var mapping5 = ROTATIONAL_SURFACE(profiloPallaGrande);
	var pallaGrande = MAP(mapping5)(domain);

	var profiloPallaPiccola = BEZIER(S0)([[0,0,16.49],[0.2,0,16.49],[0.2,0,16.79],[0,0,16.79]]);
	var mapping6 = ROTATIONAL_SURFACE(profiloPallaPiccola);
	var pallaPiccola = MAP(mapping6)(domain);

	var partiBianche = COLOR(bianco)(STRUCT([piedistallo,colonna,pallaGrande,pallaPiccola]));
	var partiMarroni = COLOR(marroneCornicione)(STRUCT([anelloSotto,anelloCentrale,mattoncini,anelloSopra]));
	var caminoAlfa = STRUCT([partiBianche,partiMarroni]);

	var caminiGrandiAlfa = STRUCT([	T([0,1])([5.35,0.6])(caminoAlfa),
									T([0,1])([-5.35,0.6])(caminoAlfa),
									T([0,1])([5.35,10.6])(caminoAlfa),
									T([0,1])([-5.35,10.6])(caminoAlfa)
									]);

	//basi camini grandi sul tetto
	var b1 = BEZIER(S0)([[4.85,0.1,11.01],[5.85,0.1,11.01]]);
	var b2 = BEZIER(S0)([[4.85,1.1,11.505],[5.85,1.1,11.505]]);
	var b1b2 = BEZIER(S1)([b1,b2]);

	var b3 = BEZIER(S0)([[4.85,0.1,11.505],[5.85,0.1,11.505]]);
	var b4 = BEZIER(S0)([[4.85,1.1,11.505],[5.85,1.1,11.505]]);
	var b3b4 = BEZIER(S1)([b3,b4]);

	var b1b2b3b4 = BEZIER(S2)([b1b2,b3b4]);
	var baseCaminoGrandeAlfa = MAP(b1b2b3b4)(domain3);
	var baseCaminoGrandeBeta1 = STRUCT([baseCaminoGrandeAlfa, S([0])([-1])(baseCaminoGrandeAlfa)]);
	var baseCaminoGrandeBeta2 = S([1])([-1])(baseCaminoGrandeBeta1);
	var baseCaminoGrande = COLOR(bianco)(STRUCT([baseCaminoGrandeBeta1, T([1])([11.2])(baseCaminoGrandeBeta2)]));

	var caminiGrandi = STRUCT([caminiGrandiAlfa,baseCaminoGrande]); 



	//camino piccolo
	var troncoPiccoloAlfa = STRUCT([SIMPLEX_GRID([[-4.15,0.7],[-2.5,0.7],[-12.56,1,-0.2,0.05]]),
									SIMPLEX_GRID([[-4.25,0.1,-0.1,0.1,-0.1,0.1],[-2.5,0.1,-0.5,0.1],[-13.56,0.2]]),
									SIMPLEX_GRID([[-4.15,0.1,-0.5,0.1],[-2.6,0.1,-0.1,0.1,-0.1,0.1],[-13.56,0.2]])
									]);
	var troncoPiccoloBeta1 = STRUCT([troncoPiccoloAlfa, S([0])([-1])(troncoPiccoloAlfa)]);
	var troncoPiccoloBeta2 = S([1])([-1])(troncoPiccoloBeta1);
	var troncoPiccolo = STRUCT([troncoPiccoloBeta1, T([1])([11.2])(troncoPiccoloBeta2)]);

	//base camino piccolo sul tetto
	var b5 = BEZIER(S0)([[4.15,2.5,12.21],[4.85,2.5,12.21]]);
	var b6 = BEZIER(S0)([[4.15,3.2,12.56],[4.85,3.2,12.56]]);
	var b5b6 = BEZIER(S1)([b5,b6]);

	var b7 = BEZIER(S0)([[4.15,2.5,12.56],[4.85,2.5,12.56]]);
	var b8 = BEZIER(S0)([[4.15,3.2,12.56],[4.85,3.2,12.56]]);
	var b7b8 = BEZIER(S1)([b7,b8]);

	var b5b6b7b8 = BEZIER(S2)([b5b6,b7b8]);
	var baseCaminoPiccoloAlfa = MAP(b5b6b7b8)(domain3);
	var baseCaminoPiccoloBeta1 = STRUCT([baseCaminoPiccoloAlfa, S([0])([-1])(baseCaminoPiccoloAlfa)]);
	var baseCaminoPiccoloBeta2 = S([1])([-1])(baseCaminoPiccoloBeta1);
	var baseCaminoPiccolo = STRUCT([baseCaminoPiccoloBeta1, T([1])([11.2])(baseCaminoPiccoloBeta2)]);

	var caminiPiccoli = COLOR(bianco)(STRUCT([troncoPiccolo,baseCaminoPiccolo]));

	var camini = STRUCT([caminiGrandi,caminiPiccoli]);
	return camini;
};



/*******************************************************************é************************
*	Ritorna tutto il tetto, compresi tetto, mansarde e camini;								*
*	Sopra è larga 8.45 e lungo 11.6+0.4, ed è alta da 10.85 a 13.75;						*
*	Sotto è larga 8.25 e lungo 11.4+0.4, ed è alta da 10.75 a 13.65;						*
*	Tutta la copertura è traslata sulle y negative di -0.2 									*
********************************************************************************************/
var getTetto = function(){
	var tetto = STRUCT([getCopertura(), getCamini()]);
	return tetto;
};




/****************************INTERNO E GIARDINI****************************/

var getInterno = function(){
	var pavimenti = SIMPLEX_GRID([[7.75],[-0.5,10.2],[0.1,-2.9,0.85,-3.95,0.9,-1.95,0.1]]);	
	var muriOrizzontali = STRUCT([	SIMPLEX_GRID([[-2.1,4.35,-0.9,0.4],[-4,0.4,-3.5,0.4],[-0.1,2.9,-0.85,3.95,-0.9,1.95]]),
									SIMPLEX_GRID([[-6.45,0.9],[-4,0.4,-3.5,0.4],[-1.6,1.4,-2.35,2.45,-2.6,0.25]])						
									]);
	var muriVerticaliali = STRUCT([	SIMPLEX_GRID([[-2.1,0.4],[-0.5,1.3,-0.9,1.3,-4.3,0.75,-0.9,0.75],[-0.1,2.9,-0.85,3.95,-0.9,1.95]]),
									SIMPLEX_GRID([[-2.1,0.4],[-1.8,0.9,-6.35,0.9],[-1.6,1.4,-2.35,2.45,-2.6,0.25]]),
									SIMPLEX_GRID([[-3.85,0.4],[-4.4,1.3,-0.9,1.3,-0.4,0.75,-0.9,0.75],[-0.1,2.9,-0.85,3.95,-0.9,1.95]]),
									SIMPLEX_GRID([[-3.85,0.4],[-5.7,0.9,-2.45,0.9],[-1.6,1.4,-2.35,2.45,-2.6,0.25]]),
									]);
	var interniAlfa = STRUCT([pavimenti,muriOrizzontali,muriVerticaliali]);
	var interno = COLOR(avorioMuro)(STRUCT([interniAlfa, S([0])([-1])(interniAlfa)]));
	return interno;
};



var getGiardini = function(){	
	var vialeAlfa = STRUCT([SIMPLEX_GRID([[10.45],[-2,1],[-0.1,0.1]]),
							SIMPLEX_GRID([[0.45,-7.5,2.5],[-3,5.8],[-0.1,0.1]]),

							SIMPLEX_GRID([[10.45],[-23.8,1],[-0.1,0.1]]),
							SIMPLEX_GRID([[1.35,-7.1,2],[-8.8,15],[-0.1,0.1]]),																				
							]);
	var viale = COLOR(grigioViale)(STRUCT([vialeAlfa, S([0])([-1])(vialeAlfa)]));

	var erbaAlfa = STRUCT([	SIMPLEX_GRID([[12.45],[2],[-0.1,0.1]]),
							SIMPLEX_GRID([[-0.45,7.5,-2.5,2],[-3,5.8],[-0.1,0.1]]),
							SIMPLEX_GRID([[-10.45,2],[-2,1],[-0.1,0.1]]),

							SIMPLEX_GRID([[12.45],[-24.8,2],[-0.1,0.1]]),
							SIMPLEX_GRID([[-1.35,7.1,-2,2],[-8.8,15],[-0.1,0.1]]),
							SIMPLEX_GRID([[-10.45,2],[-23.8,1],[-0.1,0.1]]),

							SIMPLEX_GRID([[12.45],[26.8],[0.1]])
							]);
	var erba = COLOR(verdeErba)(STRUCT([erbaAlfa, S([0])([-1])(erbaAlfa)]));

	var giardiniAlfa = STRUCT([viale,erba]);
	var giardini = T([1,2])([-8.8,-0.2])(giardiniAlfa);
	return giardini;
};



/***********************************************************************/
/**************************** VILLA FOSCARI ****************************/
/***********************************************************************/
var getVillaFoscari = function(){
	var facciataFrontale = getFacciataFrontale();
	var facciateLaterali = getFacciateLaterali();
	var facciataPosteriore = getFacciataPosteriore();
	var tetto = getTetto();
	var interno = getInterno();
	var giardini = getGiardini();
	var villaFoscari = STRUCT([facciataFrontale,facciateLaterali,facciataPosteriore,tetto,interno,giardini]);
	return villaFoscari;
};

var villaFoscari = getVillaFoscari();
DRAW(villaFoscari);

/*
	Per evitare che ci metta tanto a caricare, è preferibile dare i seguenti comandi uno alla volta:
	DRAW(getFacciataFrontale());
	DRAW(getFacciateLaterali());
	DRAW(getFacciataPosteriore());
	DRAW(getTetto());
	DRAW(getInterno());
	DRAW(getGiardini());
*/