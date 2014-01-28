var domain1=INTERVALS(1)([30]);
var domain2=DOMAIN([[0,1],[0,1]])([20,40]);
var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([7,1,1]);

/********************************3D MODEL OF VILLA SARACENO****************************************************/
/*********************************AUTHOR:GIANLUCA DI VILIO*****************************************************/



/*************************************************MAP***************************************************/
var a=POLYLINE([[0,0],[0,5.7],[17.4,5.7]]);
var b=POLYLINE([[17.4,5.7],[17.4,4.5],[23.4,4.5]]);
var c=POLYLINE([[23.4,4.5],[23.4,2],[20.4,2]]);
var d=POLYLINE([[20,2],[20,1],[17.2,1,]]);
var e=POLYLINE([[17.2,1],[17.2,3.3],[8.6,3.3]]);
var f=POLYLINE([[8.6,3.3],[8.6,0],[0,0]]);

var pianta=STRUCT([a,b,c,d,e,f]);
DRAW(pianta);

/********************************************MAIN HOUSE*************************************************************/
//The most important part of Villa Saraceno


/*************************************FRONT FACADE*****************************************/

/************Low walls************/ 

//First Low Wall
var m1=SIMPLEX_GRID([[2.8,-3.2,2.7],[0.4],[0.3]]); 
var m2=T([0,1])([2.3,-1.6])(SIMPLEX_GRID([[0.5],[1.6],[0.3]]));
var m3=T([0])([3.7])(m2);
var m4=T([0,1])([2.35,-1.5])(SIMPLEX_GRID([[0.4],[1.5],[-0.3,0.5]]))
var m5=T([0])([3.7])(m4)
var frontLowWall1=STRUCT([m1,m2,m3,m4,m5]);

// Second Low Wall 
var m11=SIMPLEX_GRID([[2.8,-3.2,2.7],[0.4],[-0.8,0.2]]); 
var m22=T([0,1])([2.3,-1.6])(SIMPLEX_GRID([[0.5],[1.6],[-0.8,0.2]]));
var m33=T([0])([3.7])(m22);
var frontLowWall2=STRUCT([m11,m22,m33]);

// Third Low Wall 
var m111=SIMPLEX_GRID([[0.9,-0.6,1],[-0.1,0.1],[-0.3,0.5]]);
var m222=T([0])([6.2])(m111);
var frontLowWall3=STRUCT([m111,m222]);

//Fourth Low Wall
var m1111=SIMPLEX_GRID([[-0.9,0.6,-5.4,0.8],[-0.1,0.1],[-0.3,0.1]]);
var m2222=T([2])([0.4])(m1111);
var frontLowWall4=STRUCT([m1111,m2222]);


var frontLowWall=STRUCT([frontLowWall1,frontLowWall2,frontLowWall3,frontLowWall4]); 

/********************Intermediate walls****************/

var medium1=SIMPLEX_GRID([[0.8,-0.8,1.1,-3.5,0.8,-0.8,0.9],[-0.1,0.1],[-1,0.2]]);
var medium2=SIMPLEX_GRID([[-0.8,0.8,-5.4,0.8,-1.8],[-0.05,0.15],[-1,0.2]]);
var medium3=SIMPLEX_GRID([[0.8,-0.8,1.1,-3.6,0.7,-0.8,0.8],[-0.2,0.1],[-1.2,0.3]]); 
var medium4=SIMPLEX_GRID([[-0.8,0.8,-5.4,0.8,-1.8],[-0.1,0.1],[-1.2,0.3]]);
var medium5=SIMPLEX_GRID([[2.6,-3.6,2.5],[-0.15,0.3],[-1.5,0.1]]);
var medium6=T([2])([2.5])(medium5);
var medium7=SIMPLEX_GRID([[0.8,-0.8,0.75,-4.1,0.6,-0.7,0.85],[-0.2,0.25],[-1.6,2.5]]);//finestre
var medium8=SIMPLEX_GRID([[-2.3,4.2,-2.15],[-0.05,0.3],[-4,0.1]]);

var p1=BEZIER(S0)([[3.1,-0.1,4],[3.15,-0.1,3.69]])
var r1=BEZIER(S0)([[3.35,-0.1,4],[3.3,-0.1,3.69]])
var p2=BEZIER(S0)([[3.1,0.1,4],[3.15,0.1,3.69]])
var r2=BEZIER(S0)([[3.35,0.1,4],[3.3,0.1,3.69]])
var p1p2=BEZIER(S1)([p1,p2])
var r1r2=BEZIER(S1)([r1,r2])
var pr=BEZIER(S2)([p1p2,r1r2])
var shape1=MAP(pr)(domain3)
var shape2=T([0])([1.2])(shape1)
var shape3=T([0])([2.4])(shape1)
var shapes=T([1])([0.15])(STRUCT([shape1,shape2,shape3]))

var frontIntermediateWall=STRUCT([medium1,medium2,medium3,medium4,medium5,medium6,medium7,medium8,shapes]);

/*********************Top Walls********************/

var top1=SIMPLEX_GRID([[0.8,-0.8,0.75,-4.1,0.6,-0.7,0.85],[-0.2,0.25],[-4.1,1]]);
var top2=SIMPLEX_GRID([[-2.35,4.1,-2.15],[-0.1,0.4],[-4.1,1]]);
var top3=SIMPLEX_GRID([[-0.8,0.8,-5.45,0.7],[-0.15,0.3],[-4.1,0.25]]);
var top4=SIMPLEX_GRID([[-0.8,0.8,-5.45,0.7],[-0.15,0.3],[-4.85,0.25]]);
var top5=SIMPLEX_GRID([[-0.7,0.2],[-0.15,0.3],[-4.1,1]]);
var top6=SIMPLEX_GRID([[-1.35,0.25],[-0.15,0.3],[-4.1,1]]);
var top7=T([0])([6.25])(top5);
var top8=T([0])([6.25])(top6);

var frontTopWall=STRUCT([top1,top2,top3,top4,top4,top5,top6,top7,top8]);

/*************Square Front Columns**************/

var lowPart=T([0,2])([2.3,1])(SIMPLEX_GRID([[0.5],[0.5],[0.2]]));
var body=T([0,1,2])([2.35,0.1,1.2])(SIMPLEX_GRID([[0.4],[0.3],[2]]))
var topPart=T([2])([2])(lowPart);
var squareColumn1=STRUCT([lowPart,topPart,body]);
var squareColumn2=T([0])([1.3])(squareColumn1);
var squareColumn3=T([0])([2.5])(squareColumn1);
var squareColumn4=T([0])([3.7])(squareColumn1);
var squareFrontColumns=STRUCT([squareColumn1,squareColumn2,squareColumn3,squareColumn4]);


/************Front Steps************************/

var internalPartSteps1=T([0,1,2])([2.35,-1.45,0.3])(SIMPLEX_GRID([[0.4],[1.7],[0.5]]));
var internalPartSteps2=T([0])([3.7])(internalPartSteps1);

var step1=T([0,1])([2.75,-1.5])(SIMPLEX_GRID([[3.7],[1.9],[0.09]]));
var step2=T([0,1,2])([2.75,-1.4,0.1])(SIMPLEX_GRID([[3.7],[1.8],[0.09]]));
var step3=T([0,1,2])([2.75,-1.3,0.19])(SIMPLEX_GRID([[3.7],[1.7],[0.09]]));
var step4=T([0,1,2])([2.75,-1.2,0.28])(SIMPLEX_GRID([[3.7],[1.6],[0.09]]));
var step5=T([0,1,2])([2.75,-1.1,0.37])(SIMPLEX_GRID([[3.7],[1.5],[0.09]]));
var step6=T([0,1,2])([2.75,-1,0.46])(SIMPLEX_GRID([[3.7],[1.4],[0.09]]));
var step7=T([0,1,2])([2.75,-0.9,0.55])(SIMPLEX_GRID([[3.7],[1.3],[0.09]]));
var step8=T([0,1,2])([2.75,-0.8,0.64])(SIMPLEX_GRID([[3.7],[1.2],[0.09]]));
var step9=T([0,1,2])([2.75,-0.7,0.73])(SIMPLEX_GRID([[3.7],[1.1],[0.09]]));
var step10=T([0,1,2])([2.75,-0.6,0.82])(SIMPLEX_GRID([[3.7],[1],[0.09]]));
var step11=T([0,1,2])([2.75,-0.5,0.91])(SIMPLEX_GRID([[3.7],[0.9],[0.09]]));
var steps=STRUCT(([step1,step2,step3,step4,step5,step6,step7,step8,step9,step10,step11]));
var frontSteps=STRUCT([steps]);


var frontFacade=STRUCT([frontLowWall,frontTopWall,frontIntermediateWall,squareFrontColumns,frontSteps]);
//DRAW(frontFacade)


/***************************************LATERAL FACADE***********************************************/

/******************Lateral Low Wall********************/
var ml1=T([0])([-0.3])(SIMPLEX_GRID([[0.3],[5.95],[0.3]]));
var ml2=T([0])([-0.2])(SIMPLEX_GRID([[0.3],[-0.1,5.8],[-0.3,0.5]]));
var ml3=T([0])([-0.3])(SIMPLEX_GRID([[0.3],[5.75],[-0.8,0.2]]));
var ml4=T([0])([-0.2])(SIMPLEX_GRID([[0.3],[-0.1,0.8,-0.5,1.2,-0.5,1.2,-0.5,0.95],[-1,0.2]]));
var ml5=T([0])([-0.25])(SIMPLEX_GRID([[0.3],[-0.7,0.8,-0.9,0.8,-0.9,0.8],[-1,0.2]]));  //protrusion1
var ml6=T([0])([-0.1])(SIMPLEX_GRID([[0.3],[-0.2,0.7,-0.5,1.2,-0.5,1.2,-0.5,0.9],[-1.2,0.3]]));
var ml7=T([0])([-0.15])(SIMPLEX_GRID([[0.3],[-0.7,0.8,-0.9,0.8,-0.9,0.8],[-1.2,0.3]])); //protrusion2
var ml8=T([0])([-0.05])(SIMPLEX_GRID([[0.3],[-0.15,5.6],[-1.5,0.1]]));
var ml9=SIMPLEX_GRID([[0.3],[-0.2,0.5,-0.8,0.9,-0.8,0.9,-0.8,0.8],[-1.6,2.4]]); //central part
var ml10=T([0])([-0.05])(SIMPLEX_GRID([[0.35],[-0.15,5.7],[-4,0.1]]));
var lateralWall=STRUCT([ml1,ml2,ml3,ml4,ml5,ml6,ml7,ml8,ml9,ml10]);


var lateralWindows1=SIMPLEX_GRID([[0.3],[-0.3,0.6,-0.5,1.2,-0.5,1.2,-0.5,0.9],[-4.1,1]]);
var lateralWindows2=T([0])([-0.05])(SIMPLEX_GRID([[0.35],[-0.7,0.8,-0.9,0.8,-0.9,0.8],[-4.1,0.25]])); //horizontal low part
var lateralWindows3=T([0])([-0.05])(SIMPLEX_GRID([[0.35],[-0.7,0.8,-0.9,0.8,-0.9,0.8],[-4.85,0.25]])); //horizontal top part
var lateralWindows4=T([0])([-0.05])(SIMPLEX_GRID([[0.35],[-0.7,0.2,-0.4,0.2,-0.9,0.2,-0.4,0.2,-0.9,0.2,-0.4,0.2],[-4.1,1]])); //vertical part
var lateralWindows=STRUCT([lateralWindows1,lateralWindows2,lateralWindows3,lateralWindows4]);

var lateralFacade=STRUCT([lateralWall,lateralWindows]);
//DRAW(lateralFacade);


/**********************************************BACK FACADE**************************************************/

/**************Back wall without central part*****************************/
var mr1=T([1])([5.5])(SIMPLEX_GRID([[8.7],[0.45],[0.3]]));
var mr2=T([1])([5.5])(SIMPLEX_GRID([[7.1,-0.6,1],[0.4],[-0.3,0.5]]));
var mr2a=T([1])([5.5])(SIMPLEX_GRID([[-7.1,0.6],[0.4],[-0.3,0.1]]));
var mr2b=T([1])([5.5])(SIMPLEX_GRID([[-7.1,0.6],[0.4],[-0.7,0.1]]));
var mr3a=T([0,1])([-0.3,5.5])(SIMPLEX_GRID([[3.1,-3.2,2.7],[0.5],[-0.8,0.2]])); 
var mr3b=T([0,1])([-0.3,5.5])(SIMPLEX_GRID([[-2.8,3.5,-2.6],[0.6],[-0.8,0.2]]));   //irregular central part   
var mr4a=T([0,1])([-0.2,5.5])(SIMPLEX_GRID([[0.9,-0.85,0.95,-3.5,0.95,-0.6,1.15],[0.4],[-1,0.2]])); 
var mr4b=T([0,1])([-0.1,5.5])(SIMPLEX_GRID([[0.8,-0.85,0.95,-3.5,0.95,-0.6,1.15],[0.3],[-1.2,0.3]]));
var mr4c=T([0,1])([-0.2,5.5])(SIMPLEX_GRID([[-0.9,0.85,-0.95,-4.2,-0.25,0.85,-0.9],[0.45],[-1,0.2]])); 
var mr4d=T([0,1])([-0.1,5.5])(SIMPLEX_GRID([[-0.8,0.85,-0.95,-4.2,-0.25,0.85,-0.9],[0.35],[-1.2,0.3]]));
var mr5a=T([0,1])([-0.05,5.5])(SIMPLEX_GRID([[2.55,-3.5,2.7],[0.25],[-1.5,0.1]]));
var mr5b=T([1])([5.5])(SIMPLEX_GRID([[0.7,-0.85,0.95,-3.5,0.95,-0.85,0.9],[0.2],[-1.6,2.4]])); //windows
var mr6a=T([1])([5.25])(top1);
var backWall1=STRUCT([mr1,mr2,mr2a,mr2b,mr3a,mr3b,mr4a,mr4b,mr4c,mr4d,mr5a,mr5b,mr6a]);

var mr6b=T([1])([5.4])(top3);
var mr6c=T([1])([5.4])(top4);
var mr6d=T([1])([5.4])(top5);
var mr6e=T([1])([5.4])(top6);
var mr6f=T([1])([5.4])(top7);
var mr6g=T([1])([5.4])(top8);
var backTopWindows=STRUCT([mr6b,mr6c,mr6d,mr6e,mr6f,mr6g]);


var mr6g2=T([0,1,2])([2.3,5.45,4.1])(SIMPLEX_GRID([[0.2,-3.5,0.45],[0.25],[1]])); //top part patch 
var mr6h=T([1])([5.45])(SIMPLEX_GRID([[2.5,-3.5,2.7],[0.4],[-4,0.1]]));
var backPatch=STRUCT([mr6g2,mr6h])

/****************Back central part*********************/

var frameWin1=SIMPLEX_GRID([[0.8,-1.5,0.8],[0.4],[0.3]]); 
var frameWin2=SIMPLEX_GRID([[0.2,-0.4,0.2,-1.5,0.2,-0.4,0.2],[0.4],[0.8]]);
var frameWin3=SIMPLEX_GRID([[0.8,-1.5,0.8],[0.4],[-0.75,0.25]]);
var backTopCentralWindows=T([0,1,2])([2.7,5.5,4.1])(STRUCT([frameWin1,frameWin2,frameWin3]));

var backCentralPartBetweenWin=T([0,1,2])([2.5,5.5,4.1])(SIMPLEX_GRID([[0.4,-0.4,0.6,0.3,0.4,0.4,-0.6,0.4],[0.3],[1]]));
var backCentralPartUnderWin=T([0,1,2])([2.5,5.5,4])(SIMPLEX_GRID([[3.5],[0.4],[0.1]]));
var backCentralPart=T([0,1,2])([2.5,5.5,1])(SIMPLEX_GRID([[0.2,-0.8,0.2,-1.1,0.2,-0.8,0.2],[0.3],[3]])); 
var backLowPart1=T([0,1,2])([2.5,5.5,1])(SIMPLEX_GRID([[1.2,-1.1,1.2],[0.45],[0.1]])); 
var backLowPart2=T([0,1,2])([2.5,5.5,1])(SIMPLEX_GRID([[-1.2,1.1,-1.2],[0.65],[0.1]])); 

var backWall=STRUCT([backWall1,backTopWindows,backPatch,backTopCentralWindows,
	backCentralPartBetweenWin,backCentralPartUnderWin,backCentralPart,backLowPart1,backLowPart2]);

/********************Back steps*************************/
var step11=T([0,1])([2.4,5.7])(SIMPLEX_GRID([[3.6],[1],[0.09]]));
var step22=T([0,1,2])([2.5,5.7,0.1])(SIMPLEX_GRID([[3.4],[1],[0.09]]));
var step33=T([0,1,2])([2.6,5.7,0.19])(SIMPLEX_GRID([[3.2],[1],[0.09]]));
var step44=T([0,1,2])([2.7,5.7,0.28])(SIMPLEX_GRID([[3],[1],[0.09]]));
var step55=T([0,1,2])([2.8,5.7,0.37])(SIMPLEX_GRID([[2.8],[1],[0.09]]));
var step66=T([0,1,2])([2.9,5.7,0.46])(SIMPLEX_GRID([[2.6],[1],[0.09]]));
var step77=T([0,1,2])([3,5.7,0.55])(SIMPLEX_GRID([[2.4],[1],[0.09]]));
var step88=T([0,1,2])([3.1,5.7,0.64])(SIMPLEX_GRID([[2.2],[1],[0.09]]));
var step99=T([0,1,2])([3.2,5.7,0.73])(SIMPLEX_GRID([[2],[1],[0.09]]));
var step1010=T([0,1,2])([3.3,5.7,0.82])(SIMPLEX_GRID([[1.8],[1],[0.09]]));
var step1111=T([0,1,2])([3.4,5.7,0.91])(SIMPLEX_GRID([[1.6],[1],[0.09]]));
var step1212=T([0,1,2])([3.5,5.7,1])(SIMPLEX_GRID([[1.4],[1],[0.09]]));

var backSteps=T([1])([0.2])(STRUCT([step11,step22,step33,step44,step55,step66,step77,
	step88,step99,step1010,step1111,step1212]));

var backFacade=STRUCT([backWall,backSteps]);
//DRAW(backFacade);

/***********************************************FIRST DEPENDANCE*************************************************************/
//The complex immediately near the main house 

var Dep1mur1=T([0,1])([8.6,5.3])(SIMPLEX_GRID([[7,-1,0.6],[0.3],[0.3]]));
var Dep1mur2=T([0,1])([8.6,5.3])(SIMPLEX_GRID([[7,-1,0.6],[0.3],[-0.7,0.2]]));
var Dep1mur3=T([0,1])([8.6,5.3])(SIMPLEX_GRID([[0.75,-0.6,5.65,-1,0.6],[0.3],[-0.5,0.3]]));
var Dep1mur3a=T([0,1])([8.6,5.3])(SIMPLEX_GRID([[0.75,-0.6,5.65,-1,0.6],[0.3],[-0.3,0.2]]));
var Dep1mur4=T([0,1])([8.6,5.3])(SIMPLEX_GRID([[7,-1,0.6],[0.3],[-0.9,1]]));
var Dep1mur5=T([0,1])([8.6,5.3])(SIMPLEX_GRID([[0.2,-0.5,0.9,-0.5,2,-0.5,1,-0.5,2.5],[0.3],[-1.6,1.2]]));
var Dep1mur6=T([0,1])([8.6,5.3])(SIMPLEX_GRID([[8.6],[0.3],[-2.8,0.6]]));
var Dep1mur7=T([0,1])([8.6,5.3])(SIMPLEX_GRID([[0.7,-0.5,1.1,-0.5,1.1,-0.5,0.9,-0.5,1.4,-0.5,0.9],[0.3],[-3.4,0.6]]));
var Dep1mur8=T([0,1])([8.6,5.3])(SIMPLEX_GRID([[-0.7,0.5,-1.1,0.5,-1.1,0.5,-0.9,0.5,-1.4,0.5,-1.1],[0.3],[-3.8,0.2]]));

/***Link wall between first and second dependance***/
var Dep1Dep2link=T([0,1])([17.1,4]) (SIMPLEX_GRID([[0.1],[1.5],[4]]));

var firstDependance=STRUCT([Dep1mur1,Dep1mur2,Dep1mur3,Dep1mur3a,Dep1mur4,Dep1mur5,Dep1mur6,Dep1mur7,Dep1mur8,Dep1Dep2link]);
//DRAW(firstDependance);

/************************************************SECOND DEPENDANCE***********************************************************/

/******************BACK FACADE******************/
var Dep2mur1=T([0,1])([17.2,4.2])(SIMPLEX_GRID([[0.95,-0.5,1.4,-0.5,1.4,-0.5,1.15],[0.3],[4.8]])); 
var Dep2mur2=T([0,1])([17.2,4.2])(SIMPLEX_GRID([[6.4],[0.3],[1.1,-0.5,0.85,-0.5,0.85,-0.5,0.5]]));
var Dep2mur3=T([0,1])([20,1.9])(SIMPLEX_GRID([[0.6,-0.6,0.6,-0.6,1],[0.3],[4.8]]));
var Dep2mur4=T([0,1])([20,1.9])(SIMPLEX_GRID([[3],[0.3],[1.4,-0.5,0.7,-0.5,0.7,-0.5,0.5]]));
var Dep2mur5=T([0,1])([17.2,1])(SIMPLEX_GRID([[0.56,-0.6,0.58,-0.6,0.46],[0.3],[4.8]]));
var Dep2mur6=T([0,1])([17.2,1])(SIMPLEX_GRID([[1.35],[0.3],[1.4,-0.5,0.7,-0.5,0.7,-0.5,0.5]]));
var Dep2mur7=T([0,1])([18.65,1])(SIMPLEX_GRID([[1.35],[0.3],[-1.9,0.7,-0.5,0.7,-0.5,0.5]]));
var Dep2mur8=T([0,1])([19.8,1])(SIMPLEX_GRID([[0.2],[1.5],[4.8]])); 


/****************LATERAL FACADE******************/

/***Lateral wall near the second dependance***/
var lateralWallDep2=T([0,1])([23.4,1.9])(SIMPLEX_GRID([[0.2],[2.5],[4.8]]));


/***************FRONT FACADE************************/

/***Wall near the colonnade***/
var colonnadeWall=T([0,1])([17.2,1])(SIMPLEX_GRID([[0.1],[3.3],[4.8]]));

/***Internal wall***/
var Dep2InternalWall1=T([0,1])([8.7,3.3])(SIMPLEX_GRID([[8.6],[0.1],[-2.6,1.4]]));
var Dep2InternalWall2=T([0,1])([8.7,3.3])(SIMPLEX_GRID([[0.65,-0.5,1.2,-0.5,1.2,-0.5,1.2,-0.5,1.2,-0.5,0.65],[0.1],[-2.1,0.5]]))
var Dep2InternalWall3=T([0,1])([8.7,3.3])(SIMPLEX_GRID([[8.6],[0.1],[-1.9,0.2]]));
var Dep2InternalWall4=T([0,1])([8.7,3.3])(SIMPLEX_GRID([[0.45,-0.9,0.8,-0.9,0.8,-0.9,0.8,-0.9,0.8,-0.9,0.45],[0.1],[1.9]]));
var Dep2InternalWall=STRUCT([Dep2InternalWall1,Dep2InternalWall2,Dep2InternalWall3,Dep2InternalWall4]);

var secondDependance=STRUCT([Dep2mur1,Dep2mur2,Dep2mur3,Dep2mur4,Dep2mur5,Dep2mur6,Dep2mur7,Dep2mur8,lateralWallDep2,colonnadeWall,Dep2InternalWall]);
//DRAW(secondDependance);


/***************************************************Lateral Colonnade****************************************************/

/***Round part of the capital***/
var a1=CUBIC_HERMITE(S0)([[-0.2,0,0],[0.2,0,0],[0,0.8,0],[0,-0.8,0]]);
var b1=CUBIC_HERMITE(S0)([[-0.2,0,0.1],[0.2,0,0.1],[0,0.8,0.05],[0,-0.8,0.05]]);
var a1b1=CUBIC_HERMITE(S1)([a1,b1,[0,0.1,0.15],[0,0,0]]);

var a2=CUBIC_HERMITE(S0)([[-0.2,0,0],[0.2,0,0],[0,-0.8,0],[0,0.8,0]]);
var b2=CUBIC_HERMITE(S0)([[-0.2,0,0.1],[0.2,0,0.1],[0,-0.8,0.05],[0,0.8,0.05]]);
var a2b2=CUBIC_HERMITE(S1)([a2,b2,[0,-0.1,0.15],[0,0,0]]);

var a1b1a2b2=BEZIER(S2)([a1b1,a2b2]);



/****************************Round column**********************************/

/***Low Capital***/
var union1=T([2])([0.1])(MAP(a1b1a2b2)(domain3));
var square1=T([0,1])([-0.25,-0.25])(SIMPLEX_GRID([[0.5],[0.5],[0.1]]));
var lowCapital=STRUCT([union1,square1]);

/***Body***/
var f1=CUBIC_HERMITE(S0)([[-0.15,0,0],[0.15,0,0],[0,0.6,0],[0,-0.6,0]]);
var g1=CUBIC_HERMITE(S0)([[-0.15,0,2.6],[0.15,0,2.6],[0,0.6,0.05],[0,-0.6,0.05]]);
var f1g1=CUBIC_HERMITE(S1)([f1,g1,[0,0.1,0.15],[0,0,0]]);

var f2=CUBIC_HERMITE(S0)([[-0.15,0,0],[0.15,0,0],[0,-0.6,0],[0,0.6,0]]);
var g2=CUBIC_HERMITE(S0)([[-0.15,0,2.6],[0.15,0,2.6],[0,-0.6,0.05],[0,0.6,0.05]]);
var f2g2=CUBIC_HERMITE(S1)([f2,g2,[0,-0.1,0.15],[0,0,0]]);

var f1g1f2g2=BEZIER(S2)([f1g1,f2g2]);
var bodyBIS=T([2])([0.2])(MAP(f1g1f2g2)(domain3));

/***Top Capital***/
var union2=(MAP(a1b1a2b2)(domain3));
var square2=T([0,1,2])([-0.25,-0.25,0.1])(SIMPLEX_GRID([[0.5],[0.5],[0.1]]));
var topCapital=T([2])([2.8])(STRUCT([union2,square2]));

var roundColumn=STRUCT([lowCapital,bodyBIS,topCapital]);


/***********************Columns*****************************************/

var lateralColumn1=T([0,1])([10.35,1])(roundColumn);
var lateralColumn2=T([0,1])([12.05,1])(roundColumn);
var lateralColumn3=T([0,1])([13.75,1])(roundColumn);
var lateralColumn4=T([0,1])([15.45,1])(roundColumn);
var lateralColumn5=T([0,1])([8.85,1])(roundColumn);

/***Square column in the lateral colonnade***/
var lowPartSecondTime=T([0,2])([2.3,1])(SIMPLEX_GRID([[0.5],[0.5],[0.2]]));
var bodySeconTime=T([0,1,2])([2.35,0.1,1.2])(SIMPLEX_GRID([[0.4],[0.4],[2.8]]))
var topPartSecondTime=T([2])([2.8])(lowPartSecondTime);
var squareColumn1BIS=STRUCT([lowPartSecondTime,bodySeconTime,topPartSecondTime])
var lateralColumn6=T([0,1,2])([14.6,0.6,-1])(squareColumn1BIS)


var lateralColonnade=T([1])([0.2])(STRUCT([lateralColumn1,lateralColumn2,lateralColumn3,lateralColumn4,lateralColumn5,lateralColumn6]));
//DRAW(lateralColonnade);


/******************************************************TOP CORNICE MAIN HOUSE**********************************************/

var a1=CUBIC_HERMITE(S0)([[-0.1,0,0],[0.7,0,0],[0,0,2],[0,0,-2]]);
var b1=CUBIC_HERMITE(S0)([[1.2,0,0],[1.9,0,0],[0,0,2],[0,0,-2]]);
var c1=CUBIC_HERMITE(S0)([[2.4,0,0],[3.1,0,0],[0,0,2],[0,0,-2]]);

var a2=CUBIC_HERMITE(S0)([[-0.1,0.4,0],[0.7,0.4,0],[0,0,2],[0,0,-2]]);
var b2=CUBIC_HERMITE(S0)([[1.2,0.4,0],[1.9,0.4,0],[0,0,2],[0,0,-2]]);
var c2=CUBIC_HERMITE(S0)([[2.4,0.4,0],[3.1,0.4,0],[0,0,2],[0,0,-2]]);


/***Simple connection without arc***/

var connection1a=BEZIER(S0)([[-0.6,0,0],[-0.1,0,0]]);
var connection11a=BEZIER(S0)([[-0.6,0,0.8],[-0.1,0,0.8]]);

var connection2a=BEZIER(S0)([[0.7,0,0],[1.2,0,0]]);
var connection22a=BEZIER(S0)([[0.7,0,0.8],[1.2,0,0.8]]);

var connection3a=BEZIER(S0)([[1.9,0,0],[2.4,0,0]]);
var connection33a=BEZIER(S0)([[1.9,0,0.8],[2.4,0,0.8]]);

var connection4a=BEZIER(S0)([[3.1,0,0],[3.6,0,0]]);
var connection44a=BEZIER(S0)([[3.1,0,0.8],[3.6,0,0.8]]);


var connection1b=BEZIER(S0)([[-0.6,0.4,0],[-0.1,0.4,0]]);
var connection11b=BEZIER(S0)([[-0.6,0.4,0.8],[-0.1,0.4,0.8]]);

var connection2b=BEZIER(S0)([[0.7,0.4,0],[1.2,0.4,0]]);
var connection22b=BEZIER(S0)([[0.7,0.4,0.8],[1.2,0.4,0.8]]);

var connection3b=BEZIER(S0)([[1.9,0.4,0],[2.4,0.4,0]]);
var connection33b=BEZIER(S0)([[1.9,0.4,0.8],[2.4,0.4,0.8]]);

var connection4b=BEZIER(S0)([[3.1,0.4,0],[3.6,0.4,0]]);
var connection44b=BEZIER(S0)([[3.1,0.4,0.8],[3.6,0.4,0.8]]);

/***Connection with arcs***/

var connectionArc1a=BEZIER(S0)([[-0.1,0,0.8],[0.7,0,0.8]]);
var connectionArc1b=BEZIER(S0)([[-0.1,0.4,0.8],[0.7,0.4,0.8]]);

var connectionArc2a=BEZIER(S0)([[1.2,0,0.8],[1.9,0,0.8]]);
var connectionArc2b=BEZIER(S0)([[1.2,0.4,0.8],[1.9,0.4,0.8]]);

var connectionArc3a=BEZIER(S0)([[2.4,0,0.8],[3.1,0,0.8]]);
var connectionArc3b=BEZIER(S0)([[2.4,0.4,0.8],[3.1,0.4,0.8]]);

var surface1a=BEZIER(S1)([a1,connectionArc1a]);
var surface2a=BEZIER(S1)([b1,connectionArc2a]);
var surface3a=BEZIER(S1)([c1,connectionArc3a]);
var surface4a=BEZIER(S1)([connection1a,connection11a]);
var surface5a=BEZIER(S1)([connection2a,connection22a]);
var surface6a=BEZIER(S1)([connection3a,connection33a]);
var surface7a=BEZIER(S1)([connection4a,connection44a]);

var surface1b=BEZIER(S1)([a2,connectionArc1b]);
var surface2b=BEZIER(S1)([b2,connectionArc2b]);
var surface3b=BEZIER(S1)([c2,connectionArc3b]);
var surface4b=BEZIER(S1)([connection1b,connection11b]);
var surface5b=BEZIER(S1)([connection2b,connection22b]);
var surface6b=BEZIER(S1)([connection3b,connection33b]);
var surface7b=BEZIER(S1)([connection4b,connection44b]);

var solid1=BEZIER(S2)([surface1a,surface1b]);
var solid2=BEZIER(S2)([surface2a,surface2b]);
var solid3=BEZIER(S2)([surface3a,surface3b]);
var solid4=BEZIER(S2)([surface4a,surface4b]);
var solid5=BEZIER(S2)([surface5a,surface5b]);
var solid6=BEZIER(S2)([surface6a,surface6b]);
var solid7=BEZIER(S2)([surface7a,surface7b]);

var cornice1=MAP(solid1)(domain3);
var cornice2=MAP(solid2)(domain3);
var cornice3=MAP(solid3)(domain3);
var cornice4=MAP(solid4)(domain3);
var cornice5=MAP(solid5)(domain3);
var cornice6=MAP(solid6)(domain3);
var cornice7=MAP(solid7)(domain3);
var upColumnsCornice=T([0,1,2])([2.9,0.1,3.2])(STRUCT([cornice1,cornice2,cornice3,cornice4,cornice5,cornice6,cornice7]));

//DRAW(upColumnsCornice)


/**************Top wall up the colonnade*****************/

var topWallColonnade1=T([0,1,2])([8.7,1,3])(SIMPLEX_GRID([[0.65,-0.5,1.2,-0.5,1.2,-0.5,1.2,-0.5,1.2,-0.5,0.65],[0.1],[1]]));
var topWallColonnade2=T([0,1,2])([8.7,1,3])(SIMPLEX_GRID([[8.6],[0.1],[0.5,-0.4,0.1]]));
var protrusionTopWallColonnade=T([0,1,2])([8.7,0.95,3.15])(SIMPLEX_GRID([[8.5],[0.05],[0.1]]))
var topWallColonnade=STRUCT([topWallColonnade1,topWallColonnade2]);

//DRAW(topWallColonnade);
DRAW(COLOR([0.823,0.69,0.4156,1])(protrusionTopWallColonnade));





/********************************************LINK BETWEEN VILLA AND FIRST DEPENDANCE**************************************************/
var lateralWallNearDep2a=T([0,1])([8.6,0.2])(SIMPLEX_GRID([[0.1],[5.5],[5.1]]));
var wallExtension1=T([0])([8.6])(SIMPLEX_GRID([[0.25],[5.5],[0.3]]));
var wallExtension2=T([0])([8.6])(SIMPLEX_GRID([[0.25],[5.5],[-0.8,0.2]]));
var wallExtension3=T([0,1])([8.6,0.1])(SIMPLEX_GRID([[0.2],[5.4],[-1,0.2]]));
var wallExtension4=T([0,1])([8.6,0.15])(SIMPLEX_GRID([[0.15],[5.4],[-1.5,0.1]]));
var wallExtension5=T([0,1])([8.6,0.15])(SIMPLEX_GRID([[0.15],[5.55],[-4,0.1]]));
var completionBetweenWalls=T([0,1])([8.65,0.1])(SIMPLEX_GRID([[0.15],[5.3],[-0.3,0.5]]));

var lateralWallNearDep2=STRUCT([lateralWallNearDep2a,wallExtension1,wallExtension2,wallExtension3,wallExtension4,wallExtension5,completionBetweenWalls]);
//DRAW(lateralWallNearDep2);




/****************************************************WINDOWS CORNICES****************************************************/

var frontWinCornice1=SIMPLEX_GRID([[-0.8,0.1,0.6,0.1,-0.75,-4.1,-0.6,0.1,0.5,0.1],[-0.1,0.35],[-1.6,0.1]]);          //horizontal part 1
var frontWinCornice2=SIMPLEX_GRID([[-0.8,0.1,0.6,0.1,-0.75,-4.1,-0.6,0.1,0.5,0.1],[-0.1,0.35],[-2.9,0.1]]);          //horizontal part 2
var frontWinCornice3=SIMPLEX_GRID([[-0.8,0.1,-0.6,0.1,-0.75,-4.1,-0.6,0.1,-0.5,0.1],[-0.1,0.35],[-1.6,1.3]]);        //vertical part
var frontWinCompletion=SIMPLEX_GRID([[-0.8,0.8,-0.75,-4.1,-0.6,0.7],[-0.2,0.25],[-3,1.1]]);
var frontCross1=SIMPLEX_GRID([[-0.8,0.8,-0.75,-4.1,-0.6,0.7],[-0.1,0.35],[-2.4,0.1]])
var frontCross2=SIMPLEX_GRID([[-0.8,-0.35,0.1,-0.35,-0.75,-4.1,-0.6,-0.3,0.1,-0.3],[-0.1,0.35],[-1.6,1.3]])

var frontWinCornice=STRUCT([frontWinCornice1,frontWinCornice2,frontWinCornice3,frontCross1,frontCross2]);


var lateralWinCornice1=SIMPLEX_GRID([[0.4],[-0.2,-0.5,0.1,0.6,0.1,-0.9,0.1,0.6,0.1,-0.9,0.1,0.6,0.1,-0.8],[-1.6,0.1]]);
var lateralWinCornice2=SIMPLEX_GRID([[0.4],[-0.2,-0.5,0.1,0.6,0.1,-0.9,0.1,0.6,0.1,-0.9,0.1,0.6,0.1,-0.8],[-2.9,0.1]]);
var lateralWinCornice3=SIMPLEX_GRID([[0.4],[-0.2,-0.5,0.1,-0.6,0.1,-0.9,0.1,-0.6,0.1,-0.9,0.1,-0.6,0.1,-0.8],[-1.6,1.3]]);
var lateralWinCompletion=SIMPLEX_GRID([[0.3],[-0.2,-0.5,0.8,-0.9,0.8,-0.9,0.8,-0.8],[-3,1.1]]);
var lateralWinCross1=SIMPLEX_GRID([[0.4],[-0.2,-0.5,0.1,0.6,0.1,-0.9,0.1,0.6,0.1,-0.9,0.1,0.6,0.1,-0.8],[-2.4,0.1]]);
var lateralWinCross2=SIMPLEX_GRID([[0.4],[-0.2,-0.5,-0.35,0.1,-0.35,-0.9,-0.35,0.1,-0.35,-0.9,-0.35,0.1,-0.35,-0.8],[-1.6,1.3]]);
var lateralWinCornice=T([0])([-0.1])(STRUCT([lateralWinCornice1,lateralWinCornice2,lateralWinCornice3,lateralWinCross1,lateralWinCross2]));


var externalBackWinCornice1a=SIMPLEX_GRID([[-0.7,0.1,0.65,0.1,-0.95,-3.5,-0.95,0.1,0.65,0.1],[0.2],[-1.6,0.1]]);
var extrenalBackWinCornice2a=SIMPLEX_GRID([[-0.7,0.1,0.65,0.1,-0.95,-3.5,-0.95,0.1,0.65,0.1],[0.2],[-2.9,0.1]]);
var externalBackWinCornice3a=SIMPLEX_GRID([[-0.7,0.1,-0.65,0.1,-0.95,-3.5,-0.95,0.1,-0.65,0.1],[0.2],[-1.6,1.3]]);
var externalBackWinCompletion=T([1])([5.5])(SIMPLEX_GRID([[-0.7,0.1,0.65,0.1,-0.95,-3.5,-0.95,0.1,0.65,0.1],[0.2],[-3,1.1]]));
var externalBackWinCross1=SIMPLEX_GRID([[-0.7,0.1,0.65,0.1,-0.95,-3.5,-0.95,0.1,0.65,0.1],[0.2],[-2.4,0.1]]);
var externalBackWinCross2=SIMPLEX_GRID([[-0.7,-0.375,0.1,-0.375,-0.95,-3.5,-0.95,-0.375,0.1,-0.375],[0.2],[-1.6,1.3]]);
var externalBackWinCornice=T([1])([5.6])(STRUCT([externalBackWinCornice1a,extrenalBackWinCornice2a,externalBackWinCornice3a,
	externalBackWinCross1,externalBackWinCross2]));

var internalBackWinCornice1b=SIMPLEX_GRID([[-2.7,0.1,0.65,0.1,-1.4,0.1,0.75,0.1,-2.6],[0.3],[-1.6,0.1]]);
var internalBackWinCornice2b=SIMPLEX_GRID([[-2.7,0.1,0.65,0.1,-1.4,0.1,0.75,0.1,-2.6],[0.3],[-2.9,0.1]]);
var internalBackWinCornice3b=SIMPLEX_GRID([[-2.7,0.1,-0.65,0.1,-1.4,0.1,-0.75,0.1,-2.6],[0.3],[-1.6,1.3]]);
var internalBackWinCompletion1=T([1])([5.6])(SIMPLEX_GRID([[-2.7,0.1,0.65,0.1,-1.4,0.1,0.75,0.1,-2.6],[0.2],[-3,1.1]]));
var internalBackWinCompletion2=T([1])([5.6])(SIMPLEX_GRID([[-2.7,0.1,0.65,0.1,-1.4,0.1,0.75,0.1,-2.6],[0.2],[-1,0.6]]));
var internalBackWinCross1=SIMPLEX_GRID([[-2.7,0.1,0.65,0.1,-1.4,0.1,0.75,0.1,-2.6],[0.3],[-2.4,0.1]]);
var internalBackWinCross2=SIMPLEX_GRID([[-2.7,-0.375,0.1,-0.375,-1.4,-0.425,0.1,-0.425,-2.6],[0.3],[-1.6,1.3]]);
var internalBackWinCornice=T([1])([5.6])(STRUCT([internalBackWinCornice1b,internalBackWinCornice2b,internalBackWinCornice3b,
	internalBackWinCross1,internalBackWinCross2]));


var windowsCornices=STRUCT([frontWinCornice,lateralWinCornice,internalBackWinCornice,externalBackWinCornice]);
DRAW(COLOR([0.823,0.69,0.4156,1])(windowsCornices));

/*********Triangular cornices***********/

var baseA= BEZIER(S0)([[0,0,0],[0.8,0,0]]);
var baseAA= BEZIER(S0)([[0,0.4,0],[0.8,0.4,0]]);
var sup1=BEZIER(S1)([baseA,baseAA]);
var side1A=BEZIER(S0)([[0,0,0],[0.4,0,0.3]]);
var side1AA=BEZIER(S0)([[0,0.4,0],[0.4,0.4,0.3]]);
var sup2=BEZIER(S1)([side1A,side1AA]);
var side2A=BEZIER(S0)([[0.8,0,0],[0.4,0,0.3]]);
var side2AA=BEZIER(S0)([[0.8,0.4,0],[0.4,0.4,0.3]]);
var sup3=BEZIER(S1)([side2A,side2AA]);
 ///
var baseB=BEZIER(S0)([[0.1,0,0.05],[0.7,0,0.05]]);
var baseBB=BEZIER(S0)([[0.1,0.4,0.05],[0.7,0.4,0.05]]);
var sup4=BEZIER(S1)([baseB,baseBB]);
var side1B=BEZIER(S0)([[0.1,0,0.05],[0.4,0,0.25]]);
var side1BB=BEZIER(S0)([[0.1,0.4,0.05],[0.4,0.4,0.25]]);
var sup5=BEZIER(S1)([side1B,side1BB]);
var side2B=BEZIER(S0)([[0.7,0,0.05],[0.4,0,0.25]]);
var side2BB=BEZIER(S0)([[0.7,0.4,0.05],[0.4,0.4,0.25]]);
var sup6=BEZIER(S1)([side2B,side2BB]);

var solidCornice1=BEZIER(S2)([sup1,sup4]);
var solidCornice2=BEZIER(S2)([sup2,sup5]);
var solidCornice3=BEZIER(S2)([sup3,sup6]);

var triUpWin1=MAP(solidCornice1)(domain3);
var triUpWin2=MAP(solidCornice2)(domain3);
var triUpWin3=MAP(solidCornice3)(domain3);

var triUpWin=STRUCT([triUpWin1,triUpWin2,triUpWin3]);

var firstTriangularCornice=T([0,1,2])([0.8,0.1,3.05])(triUpWin);
var secondTriangularCornice=T([0,1,2])([7,0.1,3.05])(triUpWin);

var triangularCornices=STRUCT([firstTriangularCornice,secondTriangularCornice]);


DRAW(COLOR([0.823,0.69,0.4156,1])(triangularCornices)); 



/********Protrusion above the windows**********/

var lateralWinProtusion=T([0])([-0.1])(SIMPLEX_GRID([[0.3],[-0.65,0.9,-0.8,0.9,-0.8,0.9],[-3.1,0.1]]))
var backWinProtrusion1= SIMPLEX_GRID([[-0.65,0.95,-5.3,0.95],[-5.7,0.1],[-3.1,0.1]])
var backWinProtrusion2= SIMPLEX_GRID([[-2.65,0.95,-1.3,1.05],[-5.8,0.1],[-3.1,0.1]])

var upWindowsProtrusion=STRUCT([lateralWinProtusion,backWinProtrusion1,backWinProtrusion2]);
DRAW(COLOR([0.823,0.69,0.4156,1])(upWindowsProtrusion));





/**********************************************WINDOWS AND DOORS*******************************************************/

/*******House******/
var topFrontHouse=SIMPLEX_GRID([[-0.9,0.45,-5.8,0.45],[-0.2,0.25],[-4.35,0.5]]);
var mediumFrontHouse=SIMPLEX_GRID([[-0.9,0.6,-5.65,0.5],[-0.2,0.25],[-1.7,1.2]]);
var lowFrontHouse=SIMPLEX_GRID([[-0.9,0.6,-5.6,0.6],[-0.2,0.15],[-0.4,0.3]]);
var topLateralHouse=T([0])([-0.05])(SIMPLEX_GRID([[-0.1,0.25],[-0.9,0.4,-1.3,0.4,-1.3,0.4],[-4.35,0.5]]))
var mediumLateralHouse=SIMPLEX_GRID([[0.3],[-0.8,0.6,-1.1,0.6,-1.1,0.6],[-1.7,1.2]]);
var topBackHouse1=T([1])([5.3])(SIMPLEX_GRID([[-0.9,0.45,-5.8,0.45],[-0.25,0.25],[-4.35,0.5]]));
var topBackHouse2=T([1])([5.4])(SIMPLEX_GRID([[-2.9,0.4,-1.9,0.4],[-0.1,0.35],[-4.4,0.45]]));
var mediumBackHouse1=T([1])([5.6])(SIMPLEX_GRID([[-2.8,0.65,-1.6,0.75],[0.2],[-1.7,1.2]]));
var mediumBackHouse2=T([1])([5.5])(SIMPLEX_GRID([[-0.8,0.65,-5.5,-0.1,0.65],[0.2],[-1.7,1.2]]));
var lowBackHouse=T([1])([5.4])(SIMPLEX_GRID([[-7.1,0.6],[0.4],[-0.4,0.3]]));

var houseWindows1=STRUCT([mediumFrontHouse,mediumLateralHouse,
	mediumBackHouse1,mediumBackHouse2]);
DRAW(COLOR([0,0.5,0.6,0.6])(houseWindows1))

var houseWindows2=STRUCT([topFrontHouse,lowFrontHouse,topLateralHouse,topBackHouse1,topBackHouse2,lowBackHouse])
DRAW(COLOR([0,0.5,0.6,0.6])(houseWindows2)); //top and low windows


var doorContour1=SIMPLEX_GRID([[-3.7,1.1,],[0.4],[-2.9,0.1]]); //horizontal part
var doorContour2=SIMPLEX_GRID([[-3.7,0.1,-0.9,0.1],[0.4],[-1,1.9]]);//vertical part
var doorTopCompletion=T([1])([-0.1])(SIMPLEX_GRID([[-3.55,1.4],[0.35],[-3,1.1]]));;
var doorCentralCompletion=T([1])([5.6])(SIMPLEX_GRID([[-3.8,0.9],[0.25],[-1,1.9]])) 
var centralDoorTop=T([1])([5.55])(STRUCT([doorTopCompletion]));
var doorContour=T([1])([5.55])(STRUCT([doorContour1,doorContour2]));
DRAW(COLOR([0.588,0.294,0,1])(doorCentralCompletion)); //the central door of the main hous back facade
DRAW(COLOR([0.823,0.69,0.4156,1])(doorContour)) //the contour of the central door
/*************************/


/*******First Dependance*******/
var topBackDep1=T([0,1])([8.6,5.2])(SIMPLEX_GRID([[-0.7,0.5,-1.1,0.5,-1.1,0.5,-0.9,0.5,-1.4,0.5],[0.3],[-3.4,0.4]]));
var mediumBackDep1=T([0,1])([8.6,5.2])(SIMPLEX_GRID([[-0.2,0.5,-0.9,0.5,-2,0.5,-1,0.5],[0.3],[-1.9,0.9]]));
var lowBackDep1a=T([0,1])([8.6,5.2])(SIMPLEX_GRID([[-0.75,0.6],[0.3],[-0.3,0.2]]));
var lowBackDep1b=T([0,1])([8.6,5.2])(SIMPLEX_GRID([[-7,1],[0.3],[0.3]]));
var lowBackDep1c=T([0,1])([8.6,5.2])(SIMPLEX_GRID([[-7,1],[0.3],[-0.7,0.2]]));
var lowBackDep1d=T([0,1])([8.6,5.2])(SIMPLEX_GRID([[-0.75,0.6],[0.3],[-0.5,0.2]]));
var lowBackDep1e=T([0,1])([8.6,5.2])(SIMPLEX_GRID([[-7,1],[0.3],[-0.9,0.7]]));
var lowBackDep1f=T([0,1])([8.6,5.2])(SIMPLEX_GRID([[-7,1],[0.3],[1.6]]));
var internalTopFrontDep1=T([0,1])([8.7,3.4])(SIMPLEX_GRID([[-0.65,0.5,-1.2,0.5,-1.2,0.5,-1.2,0.5,-1.2,0.5,-0.65],[0.1],[-2.1,0.5]]))
var internalMediumFrontDep1=T([0,1])([8.7,3.4])(SIMPLEX_GRID([[-0.45,0.9,-0.8,0.9,-0.8,0.9,-0.8,0.9,-0.8,0.9,-0.45],[0.1],[1.9]]));
var topFrontDep1=T([0,1,2])([8.7,1.1,3])(SIMPLEX_GRID([[-0.65,0.5,-1.2,0.5,-1.2,0.5,-1.2,0.5,-1.2,0.5,-0.65],[0.1],[-0.5,0.4,-0.1]]));

var dep1Windows1=STRUCT([topBackDep1,mediumBackDep1,topFrontDep1,internalTopFrontDep1,lowBackDep1a,lowBackDep1d])
var dep1Doors2=STRUCT([lowBackDep1b,lowBackDep1c,lowBackDep1e,lowBackDep1f
	,internalMediumFrontDep1]) //low doors

DRAW(COLOR([0,0.5,0.6,0.6])(dep1Windows1))
DRAW(COLOR([0.588,0.294,0,1])(dep1Doors2))
/*************************/


/********Second Dependance*****/
var backDep2=T([0,1])([17.2,4.1])(SIMPLEX_GRID([[-0.95,0.5,-1.4,0.5,-1.4,0.5,-1.15],[0.3],[-1.1,0.5,-0.85,0.5,-0.85,0.5,-0.5]]));
var front1aDep2=T([0,1])([17.2,1.1])(SIMPLEX_GRID([[-0.56,0.6,-0.58,0.6,-0.46],[0.3],[-1.4,-0.5,-0.7,0.5,-0.7,0.5,-0.5]]));
var front1bDep2=T([0,1])([17.2,1.1])(SIMPLEX_GRID([[-0.56,0.6],[0.3],[-1.4,0.5]]));
var front2Dep2=T([0,1])([20,2])(SIMPLEX_GRID([[-0.6,0.6,-0.6,0.6,-1],[0.3],[-1.4,0.5,-0.7,0.5,-0.7,0.5,-0.5]]));
var dep2Door=T([0,1])([17.2,1.1])(SIMPLEX_GRID([[-0.56,-0.6,-0.58,0.6,-0.46],[0.3],[1.9]]));
var dep2Windows=STRUCT([backDep2,front1aDep2,front1bDep2,front2Dep2]);

DRAW(COLOR([0,0.5,0.6,0.6])(dep2Windows))
DRAW(COLOR([0.588,0.294,0,1])(dep2Door)) //the single door of the second dependance
/*************************/




/****************************************************ROOFS*******************************************/


/***********Main roof*******************/
var domain1 = INTERVALS(1)([30]);
var domain2 = DOMAIN([[0,1],[0,1]])([30,15]);
var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([5,5,5]);

var sideBIS1=BEZIER(S0)([[0,0,5.2],[0,5.8,5.2]]);
var sideBIS2=BEZIER(S0)([[8.7,0,5.2],[8.7,5.8,5.2]]);
var perimeter1=BEZIER(S1)([sideBIS1,sideBIS2]);

var sideBIS3=BEZIER(S0)([[0.1,0.1,5.1],[0.1,5.7,5.1]]);
var sideBIS4=BEZIER(S0)([[8.6,0.1,5.1],[8.6,5.7,5.1]]);
var perimeter2=BEZIER(S1)([sideBIS3,sideBIS4]);

var base=BEZIER(S2)([perimeter1,perimeter2]);
var b=MAP(base)(domain3);
DRAW(T([2])([0.1])(COLOR([1.8,1.5,1.2,1])(b)));




/***Central triangle form on the main roof***/
var cat1front=BEZIER(S0)([[2.3,0,5.2],[4.4,0,6.2]]);
var cat1back=BEZIER(S0)([[2.3,5.8,5.2],[4.4,5.8,6.2]]);

var tri1=BEZIER(S1)([cat1front,cat1back]);
var s1a=MAP(tri1)(domain3);

var cat2front=BEZIER(S0)([[6.5,0,5.2],[4.4,0,6.2]]);
var cat2back=BEZIER(S0)([[6.5,5.8,5.2],[4.4,5.8,6.2]]);
var tri2=BEZIER(S1)([cat2front,cat2back]);
var s1b=MAP(tri2)(domain3);




/***Lateral triangle form on the main roof***/
var cat3a=BEZIER(S0)([[0,0,5.2],[2.3,1.7,6.2]]);
var cat3b=BEZIER(S0)([[8.7,0,5.2],[6.4,1.7,6.2]]);
var tri3=BEZIER(S1)([cat3a,cat3b]);

var cat4a=BEZIER(S0)([[0,5.8,5.2],[2.3,5,6.2]]);
var cat4b=BEZIER(S0)([[8.7,5.8,5.2],[6.4,5,6.2]]);
var tri4=BEZIER(S1)([cat4a,cat4b]);

var solidBIS1=BEZIER(S2)([tri3,tri4]);
var sB1=MAP(solidBIS1)(domain3);

var cat3acat4b=BEZIER(S1)([cat3a,cat4b]);
var cat3bcat4a=BEZIER(S1)([cat3b,cat4a]);
var solidBIS2=BEZIER(S2)([cat3acat4b,cat3bcat4a]);
var sB2=MAP(solidBIS2)(domain3)



var mainRoof=T([2])([0.1])(STRUCT([s1a,s1b,sB1,sB2]));


var squareRoof1=T([2])([5.1])(SIMPLEX_GRID([REPLICA(22)([0.2,-0.2]),[0.2],[0.1]]))
var squareRoof2=T([1,2])([5.6,5.1])(SIMPLEX_GRID([REPLICA(22)([0.2,-0.2]),[0.2],[0.1]]))
var squareRoof3=T([2])([5.1])(SIMPLEX_GRID([[0.2],REPLICA(15)([0.2,-0.2]),[0.1]]))
var squareRoof4=T([0,2])([8.5,5.1])(SIMPLEX_GRID([[0.2],REPLICA(15)([0.2,-0.2]),[0.1]]))
var rotatedSquareRoof1 = T([0,1])([1.7,-0.1])(ROTATE([0,2])(-PI/7.55)(T([0,2])([2.9,4.5])(SIMPLEX_GRID([REPLICA(6)([0.2,-0.15]),[0.2],[0.1]]))));
var rotatedSquareRoof2= T([0,2])([1.9,11.45])(R([1,2])([PI])(rotatedSquareRoof1));
var rotatedFront=STRUCT([rotatedSquareRoof1,rotatedSquareRoof2]);
var rotatedBack=T([0,1])([0.05,5.8])(rotatedFront);

var squareRoof=STRUCT([squareRoof1,squareRoof2,squareRoof3,squareRoof4,rotatedFront,rotatedBack]);

DRAW(COLOR([1.8,1.5,1.2,1])(squareRoof));
DRAW(COLOR([0.588,0.294,0,1])(mainRoof));

var cat1frontTRIS=BEZIER(S0)([[2.3,0,5.3],[4.4,0,6.3]]);
var cat1backTRIS=BEZIER(S0)([[2.3,5.8,5.3],[4.4,5.8,6.3]]);
var cat2frontTRIS=BEZIER(S0)([[6.5,0,5.3],[4.4,0,6.3]]);
var cat2backTRIS=BEZIER(S0)([[6.5,5.8,5.3],[4.4,5.8,6.3]]);

var surfaceTriangle1=BEZIER(S1)([cat1frontTRIS,cat2frontTRIS]);
var surfaceTriangle2=BEZIER(S1)([cat1backTRIS,cat2backTRIS]);
var st1=MAP(surfaceTriangle1)(domain2);
var st2=MAP(surfaceTriangle2)(domain2);
DRAW(COLOR([1.8,1.5,1.2,1])(st1));
DRAW(COLOR([1.8,1.5,1.2,1])(st2));



/**************************************FIRST DEPENDANCE ROOF****************************************/


var sideDep1a=BEZIER(S0)([[8.7,0.9,4.1],[17.2,0.9,4.1]]);
var sideDep1b=BEZIER(S0)([[8.7,5.8,4.1],[17.2,5.8,4.1]]);
var perimeterDep1a=BEZIER(S1)([sideDep1a,sideDep1b]);
//var p1=MAP(perimetro1)(domain2);

var sideDep1c=BEZIER(S0)([[8.7,1,4],[17.1,1,4]]);
var sideDep1d=BEZIER(S0)([[8.7,5.8,4],[17.1,5.7,4]]);
var perimeterDep1b=BEZIER(S1)([sideDep1c,sideDep1d]);
//var p2=MAP(perimetro2)(domain2);

var baseDep1=BEZIER(S2)([perimeterDep1a,perimeterDep1b]);
var bpd=MAP(baseDep1)(domain3);
DRAW(COLOR([0.823,0.69,0.4156,1])(bpd));


//roof form
var catDep1a=BEZIER(S0)([[8.7,0.9,4.1],[8.7,3.35,5.2]]);
var catDep1b=BEZIER(S0)([[17.2,0.9,4.1],[17.2,3.35,5.2]]);

var tri12=BEZIER(S1)([catDep1a,catDep1b]);
var s2a=MAP(tri12)(domain3);

var catDep1c=BEZIER(S0)([[8.7,5.8,4.1],[8.7,3.35,5.2]]);
var catDep1d=BEZIER(S0)([[17.2,5.8,4.1],[17.2,3.35,5.2]]);
var tri34=BEZIER(S1)([catDep1c,catDep1d]);
var s2b=MAP(tri34)(domain3);

var Dep1roof=STRUCT([s2a,s2b]);
DRAW(COLOR([0.588,0.294,0,1])(Dep1roof));


var surfaceTriangleDep1a=BEZIER(S1)([catDep1a,catDep1c]);
var surfaceTriangleDep1b=BEZIER(S1)([catDep1b,catDep1d]);
var stPD1=MAP(surfaceTriangleDep1a)(domain2);
var stPD2=MAP(surfaceTriangleDep1b)(domain2);
DRAW(COLOR([1.8,1.5,1.2,1])(stPD1));
DRAW(COLOR([1.8,1.5,1.2,1])(stPD2));



/************************************SECOND DEPENDANCE ROOF****************************************/
//first part
var sideDep2a=BEZIER(S0)([[17.2,4.6,4.9],[20,4.6,4.9]]);
var sideDep2b=BEZIER(S0)([[17.2,0.9,4.9],[20,0.9,4.9]]);
var perimeterDep2a=BEZIER(S1)([sideDep2a,sideDep2b]);

var sideDep2c=BEZIER(S0)([[17.2,4.5,4.8],[20,4.5,4.8]]);
var sideDep2d=BEZIER(S0)([[17.2,1,4.8],[20,1,4.8]]);
var perimeterDep2b=BEZIER(S1)([sideDep2c,sideDep2d]);

var baseSecDepA=BEZIER(S2)([perimeterDep2a,perimeterDep2b]);
var bsdA=MAP(baseSecDepA)(domain3);
DRAW(COLOR([1.8,1.5,1.2,1])(bsdA));


//roof form
var catDep2a=BEZIER(S0)([[17.2,0.9,4.9],[17.2,2.75,5.9]]);
var catDep2b=BEZIER(S0)([[20,0.9,4.9],[20,2.75,5.9]]);
var tri1a2a=BEZIER(S1)([catDep2a,catDep2b]);
var s1aa=MAP(tri1a2a)(domain2);

var catDep2c=BEZIER(S0)([[17.2,4.6,4.9],[17.2,2.75,5.9]]);
var catDep2d=BEZIER(S0)([[20,4.6,4.9],[20,2.75,5.9]]);
var tri3a4a=BEZIER(S1)([catDep2c,catDep2d]);
var s2aa=MAP(tri3a4a)(domain2)

var Dep2roofA=STRUCT([s1aa,s2aa]);
DRAW(COLOR([0.588,0.294,0,1])(Dep2roofA));

var surfaceTriangleDep2Part1a=BEZIER(S1)([catDep2a,catDep2c]);
var surfaceTriangleDep2Part1b=BEZIER(S1)([catDep2b,catDep2d]);
var stSDP1a=MAP(surfaceTriangleDep2Part1a)(domain2);
var stSDP1b=MAP(surfaceTriangleDep2Part1b)(domain2);
DRAW(COLOR([1.8,1.5,1.2,1])(stSDP1a));
DRAW(COLOR([1.8,1.5,1.2,1])(stSDP1b));




//Second part
var sideDep2e=BEZIER(S0)([[20,1.8,4.9],[23.7,1.8,4.9]]);
var sideDep2f=BEZIER(S0)([[20,4.6,4.9],[23.7,4.6,4.9]]);
var perimeterDep2c=BEZIER(S1)([sideDep2e,sideDep2f]);

var sideDep2g=BEZIER(S0)([[20,1.9,4.8],[23.7,1.9,4.8]]);
var sideDep2h=BEZIER(S0)([[20,4.5,4.8],[23.7,4.5,4.8]]);
var perimeterDep2d=BEZIER(S1)([sideDep2g,sideDep2h]);

var baseSecDepB=BEZIER(S2)([perimeterDep2c,perimeterDep2d]);
var bsdB=MAP(baseSecDepB)(domain3);
DRAW(COLOR([1.8,1.5,1.2,1])(bsdB));


//forma del tetto
var catDep2e=BEZIER(S0)([[20,1.8,4.9],[20,3.25,5.9]]);
var catDep2f=BEZIER(S0)([[23.7,1.8,4.9],[23.7,3.25,5.9]]);
var tri1b2b=BEZIER(S1)([catDep2e,catDep2f]);
var s1bb=MAP(tri1b2b)(domain2)

var catDep2g=BEZIER(S0)([[20,4.6,4.9],[20,3.25,5.9]]);
var catDep2h=BEZIER(S0)([[23.7,4.6,4.9],[23.7,3.25,5.9]]);
var tri3b4b=BEZIER(S1)([catDep2g,catDep2h]);
var s2bb=MAP(tri3b4b)(domain2)

var Dep2roofB=STRUCT([s1bb,s2bb]);
DRAW(COLOR([0.588,0.294,0,1])(Dep2roofB));

var surfaceTriangleDep2Part2a=BEZIER(S1)([catDep2e,catDep2g]);
var surfaceTriangleDep2Part2b=BEZIER(S1)([catDep2f,catDep2h]);
var stSDP2a=MAP(surfaceTriangleDep2Part2a)(domain2);
var stSDP2b=MAP(surfaceTriangleDep2Part2b)(domain2);
DRAW(COLOR([1.8,1.5,1.2,1])(stSDP2a));
DRAW(COLOR([1.8,1.5,1.2,1])(stSDP2b));




/*******************************************************CHIMNEYS***************************************************/
var chimney1=SIMPLEX_GRID([[0.5],[0.5],[1]]);
var chimney2=T([0,1,2])([-0.15,-0.15,1.2])(SIMPLEX_GRID([[0.8],[0.8],[0.1]]))
var chimney3=SIMPLEX_GRID([[0.1],[0.1,-0.3,0.1],[-1,0.2]]);
var chimney4=SIMPLEX_GRID([[0.1,-0.3,0.1],[0.1],[-1,0.2]]);
var chimney5=SIMPLEX_GRID([[-0.4,0.1],[0.1,-0.3,0.1],[-1,0.2]]);
var chimney6=SIMPLEX_GRID([[0.1,-0.3,0.1],[-0.4,0.1],[-1,0.2]]);


var opening1=COLOR([0,0,0,1])(SIMPLEX_GRID([[-0.1,0.3],[0.1],[-1,0.2]]))
var opening2=COLOR([0,0,0,1])(SIMPLEX_GRID([[0.1],[-0.1,0.3],[-1,0.2]]))
var opening3=COLOR([0,0,0,1])(SIMPLEX_GRID([[-0.1,0.3],[-0.3,0.1],[-1,0.2]]))
var opening4=COLOR([0,0,0,1])(SIMPLEX_GRID([[-0.3,0.1],[-0.1,0.3],[-1,0.2]]))
var openings=STRUCT([opening1,opening2,opening3,opening4])

var chimney=COLOR([0.588,0.294,0,1])(STRUCT([chimney1,chimney2,chimney3,chimney4,chimney5,chimney6]));
var completeChimney=STRUCT([chimney,openings])

var completeChimney1=T([0,1,2])([1,4.7,5.3])(completeChimney);
var completeChimney2=T([0,1,2])([7.6,4.7,5.3])(completeChimney);
var completeChimney3=T([0,1,2])([22.8,3.8,5.1])(completeChimney);
var completeChimney4=T([0,1,2])([18.3,1.3,4.9])(completeChimney);
var chimneys=STRUCT([completeChimney1,completeChimney2,completeChimney3,completeChimney4]);

DRAW(chimneys);

/*************************************************BASE OF THE FARM**************************/

var mainHouseBase=T([0,1])([0.1,0.3])(SIMPLEX_GRID([[8.4],[5.3],[1]]));


var dependancesBases1=T([0,1])([17.2,1])(SIMPLEX_GRID([[2.8],[3.5]]));
var dependancesBases2=T([0,1])([20,2])(SIMPLEX_GRID([[3.5],[2.5]]));
var dependancesBases3=T([0,1])([8.6,3.3])(SIMPLEX_GRID([[8.6],[2.3]]));
var dependancesBases=STRUCT([dependancesBases1,dependancesBases2,dependancesBases3]);


/*****************************************************GREEN LAWN AND WHITE ALLYWAY************************************************************/
var lawn=T([0,1,2])([-10,-10,-2])(SIMPLEX_GRID([[40],[30],[1.995]]));
DRAW(COLOR([0,1,0,1])(lawn));


var allyway1=BEZIER(S0)([[0,0,0],[0,8,0]]);
var allyway2=CUBIC_HERMITE(S0)([[0,8,0],[-1,9,0],[-1,9,0],[-1,9,0]])
var allyway12=BEZIER(S0)([allyway1,allyway2])


var allyway3=BEZIER(S0)([[1.5,0,0],[1.5,8,0]]);
var allyway4=CUBIC_HERMITE(S0)([[1.5,8,0],[3,9,0],[3,9,0],[3,9,0]])
var allyway34=BEZIER(S0)([allyway3,allyway4])

var entrance=BEZIER(S1)([allyway12,allyway34]);
var whiteEntrance=MAP(entrance)(domain2);

DRAW (COLOR([1.8,1.8,1.8,1])(T([0,1])([3.5,-10])(whiteEntrance)));

var otherAllyway1=T([0,1])([6.1,-1.9])(SIMPLEX_GRID([[11.05],[5.4],[0.003]]));
DRAW(COLOR([1.8,1.8,1.8,1])(otherAllyway1));
var otherAllyway2=T([0,1])([17.06,-1.9])(SIMPLEX_GRID([[2.9],[3],[0.003]]));
DRAW(COLOR([1.8,1.8,1.8,1])(otherAllyway2));


/**************************INTERIOR WALLS*********************************/

var interiorWall1=SIMPLEX_GRID([[-2.54,0.1],[-0.5,3.8,-0.5,0.9],[-1,4]]); //Main house
var interiorWall2=SIMPLEX_GRID([[-6.15,0.1],[-0.5,3.8,-0.5,0.8],[-1,4]]); //Main house
var interiorWall3=SIMPLEX_GRID([[-0.1,0.9,-0.5,1,1.2,-1.3,1.2],[-2.3,0.1],[-1,4]]); //Main house

var interiorWall4=SIMPLEX_GRID([[-10.7,0.1],[-3.3,0.9,-0.5,0.6],[3.95]]); //First Dependance
var interiorWall5=SIMPLEX_GRID([[-13.64,0.1],[-3.3,2],[3.95]]); //First Dependance

var interiorWall6=SIMPLEX_GRID([[-17.35,2.05],[-2.4,0.1],[4.9]]); //Second Dependance
var interiorWall7=SIMPLEX_GRID([[-19.8,0.2],[-2.97,1.3],[4.9]]); //Second Dependance

var interiorWalls=STRUCT([interiorWall1,interiorWall2,interiorWall3,interiorWall4,interiorWall5,interiorWall6,interiorWall7]);


/****************************************************VILLA FINALE************************************************************/
var villa=COLOR([1.8,1.5,1.2,1])(STRUCT([frontFacade,lateralFacade,backFacade,lateralWallNearDep2,
	firstDependance,secondDependance,lateralColonnade,upColumnsCornice,topWallColonnade
	,centralDoorTop,dependancesBases,mainHouseBase,frontWinCompletion,lateralWinCompletion,externalBackWinCompletion,
	internalBackWinCompletion1,internalBackWinCompletion2,,interiorWalls]));

DRAW(villa);


