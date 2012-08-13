/*
*	Valerio Domenico Di Paolo - matr. 261921
*	CG final-project
*	Villa Chiericati (Vancimuglio, Vicenza, Italy) - Andrea Palladio
*/


//DOMAINS
var domain1 = INTERVALS(1)(12);
var domain2 = DOMAIN([[0,1],[0,1]])([12,12]);
var domain2Roof = DOMAIN([[0,1],[0,1]])([6,6]);
var domain3X = DOMAIN([[0,1],[0,1],[0,1]])([1,12,12]);
var domain3Y = DOMAIN([[0,1],[0,1],[0,1]])([12,1,12]);
var domain3Z = DOMAIN([[0,1],[0,1],[0,1]])([12,12,1]);
var domain3Block = DOMAIN([[0,1],[0,1],[0,1]])([1,1,1]);

//COLORS
var ground_color = 	[0,0.93,0,0.4];
var base_color = 	[0.54,0.51,0.47];
var antiqueWhite = 	[1,0.94,0.86];
var antiqueWhite_darker = 	[0.95,0.89,0.81];
var white1 = [0.93,0.87,0.67];//navajoWhite
var ceiling_color = [0.96,0.87,0.7];//wheat
var floor_color = 	[0.96,0.87,0.7];
var stairs_color = 	[0.99,0.96,0.9];//OldLace
var corrimano_color = [0.99,0.96,0.9];
var roof_color = 	[0.8,0.51,0.4];
var pianiCamino_color = [0.25,0.16,0.13];
var cornice_color = [0.80,0.72,0.58];//wheat3
var vetro_color = [0.11,0.56,1,0.6];//DodgerBlue





//GROUND - piano semi-trasparente che fa da basamento per la struttura, utilizzato per riferimento visuale
var ground = T([0,2])([-10,-0.2])(BOUNDARY(SIMPLEX_GRID ([[20],[28],[0.2]])));
var ground_section = T([2])([-0.2])(BOUNDARY(SIMPLEX_GRID ([[10],[28],[0.2]])));
var ground_colored = COLOR(ground_color)(ground);
var ground_section_colored = COLOR(ground_color)(ground_section);


//BASEMENT
var offset = 11.5; //offset di posizionamento per il corpo squadrato della villa
var basementDepth = 0.4;
var basamentWidthX = 8.4-basementDepth;
var basementLengthX = 0.4;
var basementLengthY = 12;
var basementHeight = 2;

var basementX = SIMPLEX_GRID ([[basamentWidthX],[-offset,basementLengthX,-4,basementLengthX,-6.8,basementLengthX],[basementHeight]]);
var basementY = SIMPLEX_GRID ([[-basamentWidthX,basementDepth],[-offset,basementLengthY],[basementHeight]]);
var column = T([0,1])([5.5,offset+9])(CYL_SURFACE ([basementDepth,basementHeight])());
var basement = STRUCT ([basementX,basementY,column]);
var basement_colored = COLOR(base_color)(basement);


//FLOOR
var floorWidth = 8.4;
var floorLength = 12;
var floorHeight = 0.2;
var atrioLength = 4.2;
var atrioWidth = 4;
var firtsStepLength = 1.4;

var floor1 = SIMPLEX_GRID ([[floorWidth],[-offset,floorLength],[-basementHeight, floorHeight]]);
var balcony = SIMPLEX_GRID ([[1.1],[-offset,-floorLength,0.8],[-basementHeight, floorHeight]]);
var floorAtrio = SIMPLEX_GRID ([[4],[-(offset-atrioLength),atrioLength],[-basementHeight, floorHeight]]);

var floor = STRUCT ([floor1,balcony,floorAtrio,firstStep]);
var floor_colored = COLOR(floor_color)(floor);


//STAIRS
var stairsLength = 5.6;
var stepWidth = 1.2;
var stepHeight = (basementHeight/14); //14 è il numero di gradini
var stepLenght = (stairsLength/14);
var tStepY = T([1])([-stepLenght]);
var tStepZ = T([2])([-stepHeight]);
var firstStep = SIMPLEX_GRID ([[1.2],[-(offset-atrioLength-firtsStepLength),firtsStepLength],[-basementHeight, floorHeight]]);
var step = SIMPLEX_GRID ([[stepWidth],[-(offset-atrioLength-firtsStepLength-stepLenght),stepLenght],[-(basementHeight-stepHeight), stepHeight]]);
var step2 = tStepY(step); var step3 = tStepY(step2); var step4 = tStepY(step3); var step5 = tStepY(step4); 
var step6 = tStepY(step5); var step7 = tStepY(step6); var step8 = tStepY(step7); var step9 = tStepY(step8); 
var step10 = tStepY(step9); var step11 = tStepY(step10); var step12 = tStepY(step11); var step13 = tStepY(step12); 
var step14 = tStepY(step13);
//Struct per la costruzione dei gradini della scala
var steps = STRUCT([	step,tStepZ,step2,tStepZ,step3,tStepZ,step4,tStepZ,step5,tStepZ,step6,tStepZ,step7,
						tStepZ,step8,tStepZ,step9,tStepZ,step10,tStepZ,step11,tStepZ,step12,tStepZ,step13,tStepZ,step14]);
//Struct per la costruzione della scala
var stairs = STRUCT([firstStep,steps]);
var stairs_colored = COLOR (stairs_color)(stairs);

var corrimanoPiano = SIMPLEX_GRID ([[-1.2,0.1],[-(offset-atrioLength-firtsStepLength),firtsStepLength],[basementHeight+floorHeight+0.6]]);
var corrimano1 = [[1.2,0.3,0.6],[1.2,5.9,2.8]];
var corrimano2 = corrimano1.map(function (p) {return [p[0]+0.1,p[1],p[2]] });
var corrimano3 = [[1.2,0.3,0],[1.2,5.9,0]];
var corrimano4 = corrimano3.map(function (p) {return [p[0]+0.1,p[1],p[2]] });
var corrimanoSurf1 = BEZIER(S1)([BEZIER(S0)(corrimano1),BEZIER(S0)(corrimano2)]);
var corrimanoSurf2 = BEZIER(S1)([BEZIER(S0)(corrimano3),BEZIER(S0)(corrimano4)]);
var corrimanoSolid = MAP(BEZIER(S2)([corrimanoSurf1,corrimanoSurf2]))(domain3Block);
//Struct per la costruzione del corrimano
var corrimano = STRUCT([corrimanoPiano,corrimanoSolid]);
var corrimano_colored = COLOR(corrimano_color)(corrimano);


//STOREY - 1st Floor WALLS
var wallsDepth = 0.4;
var wallsTier1Height = 0.4;
var storeyLength = 12;
var storeyHeight = 6.8;
var windowOffset = 2.4;
var winWidth = 0.8;
var upperWindow = 0.5;
var wallDistance = storeyLength-(wallsDepth*2);
var wallHeightOffset =  basementHeight+floorHeight;
var frontWall1 = SIMPLEX_GRID ([[-1,7],[-offset,wallsDepth,-wallDistance,wallsDepth],[-wallHeightOffset, wallsTier1Height]]);
var frontWall2 = SIMPLEX_GRID ([[-1,1],[-offset,wallsDepth,-wallDistance,wallsDepth],[-wallHeightOffset, storeyHeight]]);
var frontWall5 = SIMPLEX_GRID ([[-2,0.8],[-offset,wallsDepth,-wallDistance,wallsDepth],[-(wallHeightOffset+windowOffset), storeyHeight-windowOffset]]);
var frontWall3 = SIMPLEX_GRID ([[-2.8,4],[-offset,wallsDepth,-wallDistance,wallsDepth],[-wallHeightOffset, storeyHeight]]);
var frontWall6 = SIMPLEX_GRID ([[-6.8,0.8],[-offset,wallsDepth,-wallDistance,wallsDepth],[-(wallHeightOffset+windowOffset), 3.5,-upperWindow,0.4]]);
var frontWall4 = SIMPLEX_GRID ([[-7.6,wallsDepth],[-offset,wallsDepth,-wallDistance,wallsDepth],[-wallHeightOffset, storeyHeight]]);
var externalWall1 = SIMPLEX_GRID ([[-8,wallsDepth],[-offset,2,-winWidth,2.2,-winWidth,1.8,-winWidth,1.4,-winWidth,1.4],[-wallHeightOffset, storeyHeight]]);
var externalWall2 = SIMPLEX_GRID ([[-8,wallsDepth],[-offset,-2,winWidth,-2.2,winWidth,-1.8,winWidth],[-wallHeightOffset,wallsTier1Height,-(windowOffset-0.4), 3.5,-upperWindow,0.4]]);
var externalWall3 = SIMPLEX_GRID ([[-8,wallsDepth],[-offset,-9.8,winWidth],[-wallHeightOffset,windowOffset, 3.5,-upperWindow,0.4]]);
var doorHeigth = 3.4;
var panel = SIMPLEX_GRID ([[1],[-offset,wallsDepth,-wallDistance,wallsDepth],[-wallHeightOffset,-doorHeigth,storeyHeight-(doorHeigth)]]);
//Struct per i muri perimetrali della struttura squadrata centrale
var Walls = STRUCT([frontWall1,frontWall2,frontWall3,frontWall4,frontWall5,frontWall6,externalWall1,externalWall2,externalWall3,panel]);
var Walls_colored = COLOR(antiqueWhite)(Walls);


//CEILING - il soffitto ha una sporgenza di 0.1 rispetto le pareti che lo sostengono
var ceilingHeight = 0.2;
var ceilingMain = SIMPLEX_GRID ([[8.5],[-(offset-0.1),storeyLength+0.2],[-wallHeightOffset,-storeyHeight,ceilingHeight]]);
var ceilingAtrio = SIMPLEX_GRID ([[4],[-(offset-atrioLength),atrioLength-0.1],[-(basementHeight+floorHeight+storeyHeight),ceilingHeight]]);
var ceiling = STRUCT ([ceilingMain, ceilingAtrio]);
var ceiling_colored = COLOR(ceiling_color)(ceiling);

//CEILING BLOCK - Blocco contro soffitto sopra le colonne
var ceilingBlockHeight = 0.8;
var ceilingBlock = SIMPLEX_GRID ([[4],[-(offset-atrioLength),atrioLength],[-(basementHeight+floorHeight),-(storeyHeight-ceilingBlockHeight),ceilingBlockHeight]]);
var ceilingBlock_colored = COLOR(antiqueWhite)(ceilingBlock);


//BASEMENT ARCH - Arco basement
var baseArchsupport = SIMPLEX_GRID([[1.8,-1.2,1],[-7.3,1],[basementHeight]]);
var basementArch1 = [[0,8.3,0],[0,8.3,basementHeight],[0,9.9,basementHeight],[0,11.5,basementHeight],[0,11.5,0]];
var basementArch2 = [[0,8.3,basementHeight],[0,11.5,basementHeight]];
var basementArch3 = basementArch1.map(function (p) {return [p[0]+1.8,p[1],p[2]] });
var basementArch4 = basementArch2.map(function (p) {return [p[0]+1.8,p[1],p[2]] });
var baseArchSurf1 = BEZIER(S1)([BEZIER(S0)(basementArch1), BEZIER(S0)(basementArch2)]);
var baseArchSurf2 = BEZIER(S1)([BEZIER(S0)(basementArch3), BEZIER(S0)(basementArch4)]);
var baseArchSolid = MAP(BEZIER(S2)([baseArchSurf1, baseArchSurf2]))(domain3Y);
var basementArch5 = basementArch3.map(function (p) {return [p[0]+1.2,p[1],p[2]] });
var basementArch6 = basementArch4.map(function (p) {return [p[0]+1.2,p[1],p[2]] });
var basementArch7 = basementArch5.map(function (p) {return [p[0]+1,p[1],p[2]] });
var basementArch8 = basementArch6.map(function (p) {return [p[0]+1,p[1],p[2]] });
var baseArchSurf3 = BEZIER(S1)([BEZIER(S0)(basementArch5), BEZIER(S0)(basementArch6)]);
var baseArchSurf4 = BEZIER(S1)([BEZIER(S0)(basementArch7), BEZIER(S0)(basementArch8)]);
var baseArchSolid2 = MAP(BEZIER(S2)([baseArchSurf3, baseArchSurf4]))(domain3Y);
var basementArch9 = [[1.8,7.3,0],[1.8,7.3,basementHeight],[2.4,7.3,basementHeight],[3,7.3,basementHeight],[3,7.3,0]];
var basementArch10 = [[1.8,7.3,basementHeight],[3,7.3,basementHeight]];
var basementArch11 = basementArch9.map(function (p) {return [p[0],p[1]+1,p[2]] });
var basementArch12 = basementArch10.map(function (p) {return [p[0],p[1]+1,p[2]] });
var baseArchSurf5 = BEZIER(S1)([BEZIER(S0)(basementArch9), BEZIER(S0)(basementArch10)]);
var baseArchSurf6 = BEZIER(S1)([BEZIER(S0)(basementArch11), BEZIER(S0)(basementArch12)]);
var baseArchSolid3 = MAP(BEZIER(S2)([baseArchSurf5, baseArchSurf6]))(domain3Y);

var baseArchsupport_colored = COLOR(stairs_color)(baseArchsupport);
var baseArchSolid_colored = COLOR(stairs_color)(baseArchSolid);
var baseArchSolid2_colored = COLOR(stairs_color)(baseArchSolid2);
var baseArchSolid3_colored = COLOR(stairs_color)(baseArchSolid3);

var baseArch_colored = STRUCT([baseArchsupport_colored,baseArchSolid_colored,baseArchSolid2_colored,baseArchSolid3_colored]);


//ATRIUM ARCH
var hallArchHeight = storeyHeight-ceilingBlockHeight;
var hallUpperFillerHeight = 1.5;
var hallCurveHeight = wallHeightOffset+(hallArchHeight-hallUpperFillerHeight);
var hallFiller = SIMPLEX_GRID ([[-(atrioWidth - wallsDepth),wallsDepth],[-8.3,0.8,-1.6,0.8],[-wallHeightOffset,hallArchHeight]]);
var hallUpperFiller = SIMPLEX_GRID ([[-(atrioWidth - wallsDepth),wallsDepth],[-9.1,1.6],[-wallHeightOffset,-(hallArchHeight-hallUpperFillerHeight),hallUpperFillerHeight]]);

var hallArch1 = [[3.6,9.1,wallHeightOffset],[3.6,9.1,hallCurveHeight],[3.6,9.1,hallCurveHeight],[3.6,9.9,hallCurveHeight],[3.6,10.7,hallCurveHeight],[3.6,10.7,hallCurveHeight],[3.6,10.7,wallHeightOffset]];
var hallArch2 = [[3.6,9.1,hallCurveHeight],[3.6,10.7,hallCurveHeight]];
var hallArch3 = hallArch1.map(function (p) {return [p[0] + wallsDepth,p[1],p[2]] });
var hallArch4 = hallArch2.map(function (p) {return [p[0] + wallsDepth,p[1],p[2]] });
var hallArchSurf1 = BEZIER(S1)([BEZIER(S0)(hallArch1), BEZIER(S0)(hallArch2)]);
var hallArchSurf2 = BEZIER(S1)([BEZIER(S0)(hallArch3), BEZIER(S0)(hallArch4)]);
var hallArchSolid = MAP(BEZIER(S2)([hallArchSurf1, hallArchSurf2]))(domain3Y);

var hallArch = STRUCT([hallFiller,hallUpperFiller,hallArchSolid]);
var hallArch_colored = COLOR(antiqueWhite)(hallArch);


//ROOF 1 - tetto lungo l'asse della villa
var roof1_Offset = offset-atrioLength-0.15;
var roof1_OffsetEnd = offset + storeyLength+0.25;
var simaOffset = offset-atrioLength;
var simaOffsetEnd = offset + storeyLength;
var roof1_Height = 2;
var roof1_LowAltitude = wallHeightOffset+storeyHeight+ceilingHeight;
var roof1_HighAltitude = roof1_LowAltitude+roof1_Height;
//Superficie del tetto
var roof1Controls1 = [[0,roof1_Offset,roof1_HighAltitude],[atrioWidth,roof1_Offset,roof1_LowAltitude]];
var roof1Controls2 = [[0,roof1_OffsetEnd,roof1_HighAltitude],[atrioWidth,roof1_OffsetEnd,roof1_LowAltitude]];
var roof1Surface = MAP(BEZIER(S1)([BEZIER(S0)(roof1Controls1), BEZIER(S0)(roof1Controls2)]))(domain2Roof);
var roof1Surface_colored = COLOR(roof_color)(roof1Surface);
//Superficie del timpano
var simaControls1 = [[0,simaOffset,roof1_HighAltitude],[atrioWidth,simaOffset,roof1_LowAltitude]];
var simaControls2 = [[0,simaOffset,roof1_LowAltitude]];
var simaSurface = MAP(BEZIER(S1)([BEZIER(S0)(simaControls1), BEZIER(S0)(simaControls2)]))(domain2Roof);
var simaSurfaceBack = T([1])([atrioLength+storeyLength])(simaSurface);
var simaSurface_colored = COLOR(antiqueWhite)(simaSurface);
var simaSurfaceBack_colored = COLOR(antiqueWhite)(simaSurfaceBack);
//Struct per la superficie del tetto e la copertura del timpano
var roof1_colored = STRUCT([roof1Surface_colored,simaSurface_colored,simaSurfaceBack_colored]);


//ROOF 2 - tetto lungo l'asse del blocco centrale, più alto
var roof2_Offset = offset-0.1;
var roof2_OffsetMiddle = offset + 6;
var roof2_OffsetEnd = offset + storeyLength + 0.1;
var roof2_Height = 2.5;
var roof2_Steep = 2.5;
var roof2_LowAltitude = wallHeightOffset+storeyHeight+ceilingHeight;
var roof2_HighAltitude = roof2_LowAltitude + roof2_Height;
var roof2_middlePoint = [roof2_Steep,roof2_OffsetMiddle,roof2_HighAltitude];
var roof2Controls1 = [[0,roof2_Offset,roof2_LowAltitude], [0,roof2_OffsetMiddle,roof2_HighAltitude]];
var roof2Controls2 = roof2Controls1.map(function (p) {return [p[0] + roof2_Steep,p[1],p[2]] });
var roof2Controls3 = [[8.5,roof2_Offset,roof2_LowAltitude], roof2_middlePoint];
var roof2Controls4 = [[8.5,roof2_OffsetEnd,roof2_LowAltitude], roof2_middlePoint];
var roof2Controls6 = [[0,roof2_OffsetEnd,roof2_LowAltitude], [0,roof2_OffsetMiddle,roof2_HighAltitude]];
var roof2Controls5 = roof2Controls6.map(function (p) {return [p[0] + roof2_Steep,p[1],p[2]] });
var roof2SurfaceA = MAP(BEZIER(S1)([BEZIER(S0)(roof2Controls1), BEZIER(S0)(roof2Controls2)]))(domain2Roof);
var roof2SurfaceB = MAP(BEZIER(S1)([BEZIER(S0)(roof2Controls2), BEZIER(S0)(roof2Controls3)]))(domain2Roof);
var roof2SurfaceC = MAP(BEZIER(S1)([BEZIER(S0)(roof2Controls3), BEZIER(S0)(roof2Controls4)]))(domain2Roof);
var roof2SurfaceD = MAP(BEZIER(S1)([BEZIER(S0)(roof2Controls4), BEZIER(S0)(roof2Controls5)]))(domain2Roof);
var roof2SurfaceE = MAP(BEZIER(S1)([BEZIER(S0)(roof2Controls5), BEZIER(S0)(roof2Controls6)]))(domain2Roof);

//Struct per la superficie del tetto e la copertura del timpano
var roof2 = STRUCT([roof2SurfaceA, roof2SurfaceB, roof2SurfaceC, roof2SurfaceD, roof2SurfaceE]);
var roof2_colored = COLOR (roof_color)(roof2);



//ELEMENTI ORNAMENTALI
//Tutti gli elementi di struttura sono stati generati nello stesso sistema di riferimento, con coordinate assolute.
//Gli elementi ornamentali vengono invece generati da funzioni e posizionati mediante opportuna traslazione


var getCorniceTimpano = function(){
var altezza = 0.2;
var fill = 0.1;
var stop = 0.1;
var profondità = 0.1;
var cornice = T([1])([-profondità])(SIMPLEX_GRID([[-(stop/2),fill,-stop,fill,-stop,fill,-stop,fill,-stop,fill,-stop,
	fill,-stop,fill,-stop,fill,-stop,fill,-stop,fill,-stop,fill,-stop,fill,-stop,fill,-stop,fill,-stop,
	fill,-stop,fill,-stop,fill,-stop,fill,-stop,fill,-stop,fill],[profondità],[altezza]]));
var corcice_colored = COLOR(cornice_color)(cornice);
var cornice_placed = T([1,2])([offset-atrioLength,wallHeightOffset+storeyHeight])(corcice_colored);
return cornice_placed;
};


var getColonne = function(){
var domainColumn1 = INTERVALS(1)(12);
var domainColumn2 = DOMAIN([[0,1],[0,1]])([12,12]);

var altezzaColonna = 5.5;
var raggioColonna = 0.3;
var fustoColonna = T([2])([0.2])(CYL_SURFACE([raggioColonna,altezzaColonna])([32,2]));
var baseColonna = T([0,1])([-0.5,-0.5])(SIMPLEX_GRID([[1],[1],[0.2]]));
//Sbalzo inferiore
var c1 = CUBIC_HERMITE(S0)([[0.5,0,0],[-0.5,0,0],[0,2,0],[0,-2,0]]);
var c2 = CUBIC_HERMITE(S0)([[0.3,0,0.1],[-0.3,0,0.1],[0,1.2,0],[0,-1.2,0]]);
var lowRing12 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.5],[0,0,0]]);
var lowRing12_s1 = T([2])([0.2])(MAP(lowRing12)(domainColumn2));
var lowRing12_s2 = S([1])([-1])(lowRing12_s1);
//Sbalzo superiore
var c3 = CUBIC_HERMITE(S0)([[0.3,0,0],[-0.3,0,0],[0,1.2,0],[0,-1.2,0]]);
var c4 = CUBIC_HERMITE(S0)([[0.4,0,0.1],[-0.4,0,0.1],[0,1.6,0],[0,-1.6,0]]);
var highRing34 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0.3]]);
var highRing34_s1 = MAP(highRing34)(domainColumn2);
var highRing34_s2 = S([1])([-1])(highRing34_s1);
var highRing34_s3 = T([2])([0.2])(S([2])([-1])(highRing34_s1));
var highRing34_s4 = S([1])([-1])(highRing34_s3);
var highRing = T([2])([0.3])(STRUCT([highRing34_s1,highRing34_s2,highRing34_s3,highRing34_s4]));
//Capitello
var p1 = CUBIC_HERMITE(S0)([[0,0,0.3],[0,0,-0.3],[1.2,0,0],[-1.2,0,0]]);	
var p2 = CUBIC_HERMITE(S0)([[0,0.6,0.3],[0,0.6,-0.3],[1.2,0,0],[-1.2,0,0]]);
var m1 = BEZIER(S0)([[0,0,0]]);
var m2 = BEZIER(S0)([[0,0.6,0]]);
var cap_supEst_R = MAP(BEZIER(S1)([p1,p2]))(domainColumn2);
var cap_supFront_R = MAP(BEZIER(S1)([p1,m1]))(domainColumn2);
var cap_supRear_R = MAP(BEZIER(S1)([p2,m2]))(domainColumn2);
var cap_supEst_L = T([2])([-0.15])(S([0,2])([-1/2,-1/2])(cap_supEst_R));
var cap_supFront_L = T([2])([-0.15])(S([0,2])([-1/2,-1/2])(cap_supFront_R));
var cap_supRear_L = T([2])([-0.15])(S([0,2])([-1/2,-1/2])(cap_supRear_R));
var cap_Right_union = STRUCT([cap_supEst_R,cap_supFront_R,cap_supRear_R,cap_supEst_L,cap_supFront_L,cap_supRear_L]);
var cap_Right = T([0,1,2])([0.3,-0.3,5.7])(cap_Right_union);
var cap_Left = S([0])([-1])(cap_Right);
//Sostegno superiore
var sostegno = T([0,1,2])([-0.3,-0.3,5.7])(SIMPLEX_GRID([[0.6],[0.6],[0.3]]));

var fustoColonna_c = COLOR(antiqueWhite_darker)(fustoColonna);
var baseColonna_c = COLOR(corrimano_color)(baseColonna);
var lowRing12_s1_c = COLOR(ceiling_color)(lowRing12_s1);
var lowRing12_s2_c = COLOR(ceiling_color)(lowRing12_s2);
var highRing_c = COLOR(ceiling_color)(highRing);
var sostegno_c = COLOR(ceiling_color)(sostegno);
var cap_Right_c = COLOR(ceiling_color)(cap_Right);
var cap_Left_c = COLOR(ceiling_color)(cap_Left);

var colonna = STRUCT ([fustoColonna_c,baseColonna_c,lowRing12_s1_c,lowRing12_s2_c,highRing_c,sostegno_c,cap_Right_c,cap_Left_c]);
var colonna_placed = T([0,1,2])([0.8+0.5,offset-atrioLength+0.5,wallHeightOffset]) (colonna);
var distanziamento = T([0])([2.2])(colonna_placed);
var colonne = STRUCT([colonna_placed,distanziamento,colonna_placed]);
return colonne;
};


var getCamini = function(){
var altezza = 1.2;
var larghezza = 0.7;
var profondità = 0.3;
var base = SIMPLEX_GRID([[larghezza],[profondità],[altezza]]);
var base_colored = COLOR(antiqueWhite)(base);
var piani = T([0,1])([-0.05,-0.05])(SIMPLEX_GRID([[larghezza+0.1],[profondità+0.1],[-altezza,0.05,-0.15,0.05]]));
var piani_colored = COLOR(pianiCamino_color)(piani);
var supporti = SIMPLEX_GRID([[0.1,-0.2,0.1,-0.2,0.1],[0.1,-0.1,0.1],[-altezza,-0.05,0.15]]);
var supporti_colored = COLOR (corrimano_color)(supporti);
var camino = STRUCT([base_colored,piani_colored,supporti_colored]);
var camino1_placed = T([0,1,2])([4.6,offset+0.2,(basementHeight+floorHeight+storeyHeight+ceilingHeight)])(camino);
var camino2_r = T([0])([0.3])(R([0,1])([PI/2])(camino));
var camino2_placed = T([0,1,2])([8,offset+6,(basementHeight+floorHeight+storeyHeight+ceilingHeight)])(camino2_r);
var camini = STRUCT([camino1_placed, camino2_placed]);
return camini;
};


var getRinghiera = function(){
var supporto = SIMPLEX_GRID([[-1,0.1],[-offset,-floorLength,-0.7,0.1],[-wallHeightOffset,0.55]]);
var bordoA = SIMPLEX_GRID([[1],[-offset,-floorLength,-0.7,0.1],[-wallHeightOffset,-0.55,0.05]]);
var bordoB = SIMPLEX_GRID([[-1,0.1],[-offset,-floorLength,0.8],[-wallHeightOffset,-0.55,0.05]]);
var supporto_colored = COLOR(corrimano_color)(supporto);
var bordoA_colored = COLOR(antiqueWhite)(bordoA); 
var bordoB_colored = COLOR(antiqueWhite)(bordoB);
var ringhiera = STRUCT([supporto_colored,bordoA_colored,bordoB_colored]);
return ringhiera;
};


var getDecorazioneWin = function(){
var border1 = T([0])([0.1])(SIMPLEX_GRID([[0.8],[0.05],[0.1]]));			//bordo sopra la finestra
var border1_l = T([2])([-2.1])(SIMPLEX_GRID([[0.1],[0.05],[2.2]]));			//bordo sx finestra
var border1_r = T([0,2])([0.9,-2.1])(SIMPLEX_GRID([[0.1],[0.05],[2.2]]));	//bordo dx finestra
var border1_u = T([0,2])([0.1,-2.1])(SIMPLEX_GRID([[0.8],[0.05],[0.1]]));	//bordo inferiore finestra
var border2 = T([0])([0.1])(SIMPLEX_GRID([[0.8],[0.08],[-0.4,0.08]])); //bordo superiore
var border3 = SIMPLEX_GRID([[1],[0.1],[-0.4,-0.08,0.02]]);			   //bordo superiore sottile	
//Prima curva sotto il ripiano squadrato
var c1 = CUBIC_HERMITE(S0)([[0+0.1,0,0.3],[0+0.1,0.08,0.4],[0,0.1,0],[0,0,0]]);
var c2 = CUBIC_HERMITE(S0)([[0.8+0.1,0,0.3],[0.8+0.1,0.08,0.4],[0,0.1,0],[0,0,0]]);
var l1 = BEZIER(S0)([[0+0.1,0,0.4]]);
var l2 = BEZIER(S0)([[0.8+0.1,0,0.4]]);
var curvatura1 = MAP(BEZIER(S1)([c1,c2]))(domain2);
var closing_1a = MAP(BEZIER(S1)([c1,l1]))(domain2);
var closing_1b = MAP(BEZIER(S1)([c2,l2]))(domain2);
//Seconda curva sotto il ripiano squadrato
var c3 = CUBIC_HERMITE(S0)([[0+0.1,0,0.1],[0+0.1,0.08,0.2],[0,0.25,0],[0,0,0]]);
var c4 = CUBIC_HERMITE(S0)([[0.8+0.1,0,0.1],[0.8+0.1,0.08,0.2],[0,0.25,0],[0,0,0]]);
var c5 = CUBIC_HERMITE(S0)([[0+0.1,0,0.3],[0+0.1,0.08,0.2],[0,0.25,0],[0,0,0]]);
var c6 = CUBIC_HERMITE(S0)([[0.8+0.1,0,0.3],[0.8+0.1,0.08,0.2],[0,0.25,0],[0,0,0]]);
var d1 = BEZIER(S0)([[0+0.1-0.04,0,0.2]]);
var d2 = BEZIER(S0)([[0.8+0.1+0.04,0,0.2]]);
var curvatura2 = MAP(BEZIER(S1)([c3,c4]))(domain2);
var curvatura3 = MAP(BEZIER(S1)([c5,c6]))(domain2);
var closing_2a = MAP(BEZIER(S1)([c3,d1]))(domain2);
var closing_3a = MAP(BEZIER(S1)([c5,d1]))(domain2);
var closing_2b = MAP(BEZIER(S1)([c4,d2]))(domain2);
var closing_3b = MAP(BEZIER(S1)([c6,d2]))(domain2);

var border1_c = COLOR(cornice_color)(border1);		//cornice sopra la finestra
var border1_l_c = COLOR(cornice_color)(border1_l);	//cornice sinistra della finestra
var border1_r_c = COLOR(cornice_color)(border1_r);	//cornice destra della finestra
var border1_u_c = COLOR(cornice_color)(border1_u);	//cornice sotto la finestra
var border2_c = COLOR(cornice_color)(border2);	//bordo superiore spesso
var border3_c = COLOR(ceiling_color)(border3);	//bordo superiore sottile
var curvatura1_c = COLOR(cornice_color)(curvatura1);	//curvatura superiore verso border2
var closing_1a_c = COLOR(cornice_color)(closing_1a);
var closing_1b_c = COLOR(cornice_color)(closing_1b);
var curvatura2_c = COLOR(ceiling_color)(curvatura2); 	//curva mediana
var curvatura3_c = COLOR(ceiling_color)(curvatura3);	//curva mediana
var closing_2a_c = COLOR(ceiling_color)(closing_2a);
var closing_3a_c = COLOR(ceiling_color)(closing_3a);
var closing_2b_c = COLOR(ceiling_color)(closing_2b);
var closing_3b_c = COLOR(ceiling_color)(closing_3b);

var decorazione = STRUCT([border1_c,border1_l_c,border1_r_c,border1_u_c,
				border2_c,border3_c,curvatura1_c,closing_1a_c,closing_1b_c,
				curvatura2_c,curvatura3_c,closing_2a_c,closing_3a_c,closing_2b_c,closing_3b_c]);
return decorazione;
};

var getDecorazioniWin = function(){
var posizionamentoZ = wallHeightOffset + windowOffset;
var decorazioneFront = S([1])([-1])(getDecorazioneWin());
var decorazioneSide = R([0,1])(PI/2)(decorazioneFront);
var decRear1_placed = T([0,1,2])([2-0.1,offset+floorLength,posizionamentoZ])(getDecorazioneWin());
var decRear2_placed = T([0])([4.8])(decRear1_placed);
var decFront1_placed = T([0,1,2])([2-0.1,offset,posizionamentoZ])(decorazioneFront);
var decFront2_placed = T([0])([4.8])(decFront1_placed);
var decSide1_placed = T([0,1,2])([8.4,offset+2-0.1,posizionamentoZ])(decorazioneSide);
var decSide2_placed = T([1])([3])(decSide1_placed);
var decSide3_placed = T([1])([2.6])(decSide2_placed);
var decorazioni = STRUCT([decRear1_placed,decRear2_placed,decFront1_placed,decFront2_placed,
						decSide1_placed,decSide2_placed,decSide3_placed]);
return decorazioni;
};


var getSeparatori = function(){
var posizionamentoZUp = wallHeightOffset + windowOffset + 3.5 -0.1;
var larghezza = 0.04;
var altezza = 0.04;
var distanza = 0.7

var separatore1 = T([1])([-larghezza])(SIMPLEX_GRID ([[8.4],[larghezza,-storeyLength,larghezza],[altezza,-distanza,altezza]]));
var separatore1_placed = T([1,2])([offset,posizionamentoZUp])(separatore1);
var separatore2 = SIMPLEX_GRID ([[-8.4,larghezza],[storeyLength+(larghezza*2)],[altezza,-distanza,altezza]]);
var separatore2_placed = T([1,2])([offset-larghezza,posizionamentoZUp])(separatore2);

var separatore = STRUCT([separatore1_placed,separatore2_placed]);
var separatore_colored = COLOR (cornice_color)(separatore);
return separatore_colored;
};


var getAtticWindow = function(){
var altezza =1.2;
var larghezza = 0.8;
var profondità = 0.04;
var apertura = 0.4-(profondità*2);
var alt_copertura = 0.2;
var larg_copertura = 1.2;

var control1 = [[0,-0.1,altezza],[0,0.2,altezza+alt_copertura]];
var control2 = control1.map(function (p) {return [p[0] + larg_copertura,p[1],p[2]] });
var control3 = [[0,0.5,altezza],[0,0.2,altezza+alt_copertura]];
var control4 = control3.map(function (p) {return [p[0] + larg_copertura,p[1],p[2]] });
var control5 = [[0,-0.1,altezza],[0+larg_copertura,-0.1,altezza]];
var control6 = control5.map(function (p) {return [p[0],p[1]+0.6,p[2]] });
var c1 = BEZIER(S0)(control1);
var c2 = BEZIER(S0)(control2);
var c3 = BEZIER(S0)(control3);
var c4 = BEZIER(S0)(control4);
var m1 = BEZIER(S0)([[0,0.2,altezza]]);
var m2 = BEZIER(S0)([[0+larg_copertura,0.2,altezza]]);
var u1 = BEZIER(S0)(control5);
var u2 = BEZIER(S0)(control6);

var copertura12 = MAP(BEZIER(S1)([c1,c2]))(domain2Roof);
var chiusura11 = MAP(BEZIER(S1)([c1,m1]))(domain2Roof);
var chiusura22 = MAP(BEZIER(S1)([c2,m2]))(domain2Roof);
var copertura34 = MAP(BEZIER(S1)([c3,c4]))(domain2Roof);
var chiusura31 = MAP(BEZIER(S1)([c3,m1]))(domain2Roof);
var chiusura42 = MAP(BEZIER(S1)([c4,m2]))(domain2Roof);
var fondo = MAP(BEZIER(S1)([u1,u2]))(domain2Roof);
var corpo = SIMPLEX_GRID ([[larghezza],[profondità,-apertura,profondità],[altezza]]);
var vetro = BOUNDARY(SIMPLEX_GRID ([[-(larghezza-0.1),0.1],[-profondità,apertura,-profondità],[altezza]]));
var retro = SIMPLEX_GRID ([[0.1],[-profondità,apertura,-profondità],[altezza]]);

var corpo_c = COLOR(antiqueWhite)(corpo);
var retro_c = COLOR(antiqueWhite)(retro);
var vetro_c = COLOR(vetro_color)(vetro);
var copertura12_c = COLOR(roof_color)(copertura12);
var chiusura11_c = COLOR(roof_color)(chiusura11);
var chiusura22_c = COLOR(roof_color)(chiusura22);
var copertura34_c = COLOR(roof_color)(copertura34);
var chiusura31_c = COLOR(roof_color)(chiusura31);
var chiusura42_c = COLOR(roof_color)(chiusura42);
var fondo_c = COLOR(roof_color)(fondo);

var atticWindow = STRUCT([corpo_c,retro_c,vetro_c,
	copertura12_c,chiusura11_c,chiusura22_c,copertura34_c,chiusura31_c,chiusura42_c,fondo_c]);
var atticWindow_placed = T([0,1,2])([1.4,offset-atrioLength+2,(wallHeightOffset+storeyHeight+ceilingHeight)])(atticWindow);
return atticWindow_placed;
};


var getDecorazioneDoor = function(){
//bordo1 la cornice subito sopra la porta
var border1 = T([0])([0.1])(SIMPLEX_GRID([[0.8],[0.05],[0.1]]));
var border2 = T([0])([0.1])(SIMPLEX_GRID([[0.8],[0.08],[-0.4,0.08]])); //bordo superiore
var border3 = SIMPLEX_GRID([[1],[0.1],[-0.4,-0.08,0.02]]);			   //bordo superiore sottile	
//Prima curva sotto il ripiano squadrato
var c1 = CUBIC_HERMITE(S0)([[0+0.1,0,0.3],[0+0.1,0.08,0.4],[0,0.1,0],[0,0,0]]);
var c2 = CUBIC_HERMITE(S0)([[0.8+0.1,0,0.3],[0.8+0.1,0.08,0.4],[0,0.1,0],[0,0,0]]);
var l1 = BEZIER(S0)([[0+0.1,0,0.4]]);
var l2 = BEZIER(S0)([[0.8+0.1,0,0.4]]);
var curvatura1 = MAP(BEZIER(S1)([c1,c2]))(domain2);
var closing_1a = MAP(BEZIER(S1)([c1,l1]))(domain2);
var closing_1b = MAP(BEZIER(S1)([c2,l2]))(domain2);
//Seconda curva sotto il ripiano squadrato
var c3 = CUBIC_HERMITE(S0)([[0+0.1,0,0.1],[0+0.1,0.08,0.2],[0,0.25,0],[0,0,0]]);
var c4 = CUBIC_HERMITE(S0)([[0.8+0.1,0,0.1],[0.8+0.1,0.08,0.2],[0,0.25,0],[0,0,0]]);
var c5 = CUBIC_HERMITE(S0)([[0+0.1,0,0.3],[0+0.1,0.08,0.2],[0,0.25,0],[0,0,0]]);
var c6 = CUBIC_HERMITE(S0)([[0.8+0.1,0,0.3],[0.8+0.1,0.08,0.2],[0,0.25,0],[0,0,0]]);
var d1 = BEZIER(S0)([[0+0.1-0.04,0,0.2]]);
var d2 = BEZIER(S0)([[0.8+0.1+0.04,0,0.2]]);
var curvatura2 = MAP(BEZIER(S1)([c3,c4]))(domain2);
var curvatura3 = MAP(BEZIER(S1)([c5,c6]))(domain2);
var closing_2a = MAP(BEZIER(S1)([c3,d1]))(domain2);
var closing_3a = MAP(BEZIER(S1)([c5,d1]))(domain2);
var closing_2b = MAP(BEZIER(S1)([c4,d2]))(domain2);
var closing_3b = MAP(BEZIER(S1)([c6,d2]))(domain2);

var border1_c = COLOR(cornice_color)(border1);	//cornice sopra la finestra
var border2_c = COLOR(cornice_color)(border2);	//bordo superiore spesso
var border3_c = COLOR(ceiling_color)(border3);	//bordo superiore sottile
var curvatura1_c = COLOR(cornice_color)(curvatura1);	//curvatura superiore verso border2
var closing_1a_c = COLOR(cornice_color)(closing_1a);
var closing_1b_c = COLOR(cornice_color)(closing_1b);
var curvatura2_c = COLOR(ceiling_color)(curvatura2); 	//curva mediana
var curvatura3_c = COLOR(ceiling_color)(curvatura3);	//curva mediana
var closing_2a_c = COLOR(ceiling_color)(closing_2a);
var closing_3a_c = COLOR(ceiling_color)(closing_3a);
var closing_2b_c = COLOR(ceiling_color)(closing_2b);
var closing_3b_c = COLOR(ceiling_color)(closing_3b);

var decorazione = STRUCT([border1_c,border2_c,border3_c,curvatura1_c,closing_1a_c,closing_1b_c,
				curvatura2_c,curvatura3_c,closing_2a_c,closing_3a_c,closing_2b_c,closing_3b_c]);
var decorazione_scaled = S([0,1,2])([2.5,2.5,2.5])(decorazione);
return decorazione_scaled;
};

var getDecorazioniDoor = function(){
var posizionamentoZ = wallHeightOffset + doorHeigth;
var decorazioneFront = S([1])([-1])(getDecorazioneDoor());
var decRear1_placed = T([0,1,2])([-1.25,offset+floorLength,posizionamentoZ])(getDecorazioneDoor());
var decFront1_placed = T([0,1,2])([-1.25,offset,posizionamentoZ])(decorazioneFront);
var decorazioni = STRUCT([decRear1_placed,decFront1_placed]);
return decorazioni;
};



//MODEL - DISEGNO DEL MODELLO 3D
/*
//Varie Struct con sottoinsiemi di rightPart, raccolgono elementi delle varie fasi di costruzione
//Parte di codice contenente i livelli strutturali della villa, vista in sezione per snapshots
var rightPart_lv1 = STRUCT([basement_colored, baseArch_colored, floor_colored, stairs_colored, corrimano_colored]);
var rightPart_lv2 = STRUCT([basement_colored, baseArch_colored, floor_colored, stairs_colored, corrimano_colored,
							Walls_colored, ceiling_colored, ceilingBlock_colored]);
var rightPart_lv3 = STRUCT([basement_colored, baseArch_colored, floor_colored, stairs_colored, corrimano_colored,
							Walls_colored, ceiling_colored, ceilingBlock_colored,
							hallArch_colored, roof1_colored, roof2_colored]);
DRAW(rightPart_lv3);
DRAW(ground_section_colored);
*/




//Struct per la costruzione della parte destra del modello (visibile in sezione)
var rightPart = STRUCT([basement_colored, baseArch_colored, floor_colored, stairs_colored, corrimano_colored,
				Walls_colored, ceiling_colored, ceilingBlock_colored,
				hallArch_colored, roof1_colored, roof2_colored,
				getColonne(),getCamini(),getCorniceTimpano(),getRinghiera(),getDecorazioniWin(),getSeparatori()]);

var leftPart = S([0])([-1])(rightPart);


//MODELLO COMPLETO COMPRENDENTE ANCHE LE PARTI NON SIMMETRICHE
var model = STRUCT([rightPart,leftPart, getAtticWindow(),getDecorazioniDoor()]);
DRAW(model);

//DISEGNO DEL PIANO DI RIFERIMENTO
DRAW(ground_colored);