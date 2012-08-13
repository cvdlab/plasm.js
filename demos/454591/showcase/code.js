/* Iphone 4G */



var domain = INTERVALS(1)(30);

var domain2 = DOMAIN([[0,1],[0,1]])([30,30]);

var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([15,15,15]);

var controlPoints1 = ([[0,4,0],[4,4,0],[0,0,0],[0,0,0]]);

var controlPoints2 =  ([[0,2,0],[4,2,0],[0,0,0],[0,0,0]]);

var c1 = CUBIC_HERMITE(S0)(controlPoints1);

var c2 = CUBIC_HERMITE(S0)(controlPoints2);

var block1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);

var mblock1 = MAP(block1)(domain2);

var controlPoints3 = ([[4,4,0],[6,4,0],[0,0,0],[0,0,0]]);

var controlPoints4 =  ([[4,2,0],[6,2,0],[0,4,0],[0,-4,0]]);

var c3 = CUBIC_HERMITE(S0)(controlPoints3);

var c4 = CUBIC_HERMITE(S0)(controlPoints4);

var block2 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);

var mblock2 = MAP(block2)(domain2);

var controlPoints5 = ([[6,4,0],[10,4,0],[0,0,0],[0,0,0]]);

var controlPoints6 =  ([[6,2,0],[10,2,0],[0,0,0],[0,0,0]]);

var c5 = CUBIC_HERMITE(S0)(controlPoints5);

var c6 = CUBIC_HERMITE(S0)(controlPoints6);

var block3 = CUBIC_HERMITE(S1)([c5,c6,[0,0,0],[0,0,0]]);

var mblock3 = MAP(block3)(domain2);

var upperBlock = COLOR([0,0,0])(STRUCT([mblock1,mblock2,mblock3]));




var controlPoints7 = ([[0,2,0],[4,2,0],[0,0,0],[0,0,0]]);

var controlPoints8 =  ([[0,1,0],[4,1,0],[0,0,0],[0,0,0]]);

var c7 = CUBIC_HERMITE(S0)(controlPoints7);

var c8 = CUBIC_HERMITE(S0)(controlPoints8);

var block4 = CUBIC_HERMITE(S1)([c7,c8,[0,0,0],[0,0,0]]);

var mblock4 = MAP(block4)(domain2);

var controlPoints9 = ([[4,2,0],[6,2,0],[0,-4,0],[0,4,0]]);

var controlPoints10 =  ([[4,1,0],[6,1,0],[0,0,0],[0,0,0]]);

var c9 = CUBIC_HERMITE(S0)(controlPoints9);

var c10 = CUBIC_HERMITE(S0)(controlPoints10);

var block5 = CUBIC_HERMITE(S1)([c9,c10,[0,0,0],[0,0,0]]);

var mblock5 = MAP(block5)(domain2);

var controlPoints11 = ([[6,2,0],[10,2,0],[0,0,0],[0,0,0]]);

var controlPoints12 =  ([[6,1,0],[10,1,0],[0,0,0],[0,0,0]]);

var c11 = CUBIC_HERMITE(S0)(controlPoints11);

var c12 = CUBIC_HERMITE(S0)(controlPoints12);

var block6 = CUBIC_HERMITE(S1)([c11,c12,[0,0,0],[0,0,0]]);

var mblock6 = MAP(block6)(domain2);

var middleBlock = COLOR([0,0,0])(STRUCT([mblock4,mblock5,mblock6]));




var controlpoints13 = [[0,1,0],[5.5,1,0],[0,0,0],[0,0,0]];

var c13 = CUBIC_HERMITE(S0)(controlpoints13);

var controlpoints14 = [[1,0,0],[5.5,0,0],[0,0,0],[0,0,0]];

var c14 = CUBIC_HERMITE(S0)(controlpoints14);

var block7 = CUBIC_HERMITE(S1)([c13,c14,[0,-2,0],[2,0,0]]);

var mblock7 = MAP(block7)(domain2);

var mblock8 = R([0,2])([PI])(mblock7);

mblock8 = T([0])([10])(mblock8);

var underBlock = COLOR([0,0,0])(STRUCT([mblock7,mblock8]));




var controlpoints15 = [[0,4,0],[0,18,0],[0,0,0],[0,0,0]];

var controlpoints16 = [[0.5,4,0],[0.5,18,0],[0,0,0],[0,0,0]];

var c15 = CUBIC_HERMITE(S0)(controlpoints15);

var c16 = CUBIC_HERMITE(S0)(controlpoints16);

var line1 = CUBIC_HERMITE(S1)([c15,c16,[0,0,0],[0,0,0]]);

var mline1 = MAP(line1)(domain2);

var mline2 = T([0])([9.5])(mline1);

var line = COLOR([0,0,0])(STRUCT([mline1,mline2]));




var controlpoints17 = [[0,18,0],[3,18,0],[0,0,0],[0,0,0]];

var controlpoints18 = [[0,21,0],[3,21,0],[0,0,0],[0,0,0]];

var c17 = CUBIC_HERMITE(S0)(controlpoints17);

var c18 = CUBIC_HERMITE(S0)(controlpoints18);

var block9 = CUBIC_HERMITE(S1)([c17,c18,[0,0,0],[0,0,0]]);

var mblock9 = MAP(block9)(domain2);

var controlpoints19 = [[0,21,0],[5.5,21,0],[0,0,0],[0,0,0]];

var c19 = CUBIC_HERMITE(S0)(controlpoints19);

var controlpoints20 = [[1,22,0],[5.5,22,0],[0,0,0],[0,0,0]];

var c20 = CUBIC_HERMITE(S0)(controlpoints20);

var block10 = CUBIC_HERMITE(S1)([c19,c20,[0,2,0],[2,0,0]]);

var mblock10 = MAP(block10)(domain2);

var leftBlock = COLOR([0,0,0])(STRUCT([mblock9, mblock10]));

DRAW(leftBlock);

var mrightBlock = R([0,2])([PI])(leftBlock);

mrightBlock = T([0])([10])(mrightBlock);




var controlpoints21 = [[3,22,0],[4,22,0],[0,0,0],[0,0,0]];

var controlpoints22 = [[3,20,0],[4,20,0],[0,2,0],[0,-2,0]];

var c21 = CUBIC_HERMITE(S0)(controlpoints21);

var c22 = CUBIC_HERMITE(S0)(controlpoints22);

var block11 = CUBIC_HERMITE(S1)([c21,c22,[0,0,0],[0,0,0]]);

var mblock11 = MAP(block11)(domain2);

var controlpoints23 = [[3,18,0],[4,18,0],[0,0,0],[0,0,0]];

var controlpoints24 = [[3,20,0],[4,20,0],[0,-2,0],[0,+2,0]];

var c23 = CUBIC_HERMITE(S0)(controlpoints23);

var c24 = CUBIC_HERMITE(S0)(controlpoints24);

var block12 = CUBIC_HERMITE(S1)([c23,c24,[0,0,0],[0,0,0]]);

var mblock12 = MAP(block12)(domain2);

var center1 = COLOR([0,0,0])(STRUCT([mblock11,mblock12]));




var controlpoints25 = [[4,22,0],[7,22,0],[0,0,0],[0,0,0]];

var controlpoints26 = [[4,20.1,0],[7,20.1,0],[0,0,0],[0,0,0]];

var c25 = CUBIC_HERMITE(S0)(controlpoints25);

var c26 = CUBIC_HERMITE(S0)(controlpoints26);

var block13 = CUBIC_HERMITE(S1)([c25,c26,[0,0,0],[0,0,0]]);

var mblock13 = MAP(block13)(domain2);

var controlpoints27 = [[4,18,0],[7,18,0],[0,0,0],[0,0,0]];

var controlpoints28 = [[4,19.9,0],[7,19.9,0],[0,0,0],[0,0,0]];

var c27 = CUBIC_HERMITE(S0)(controlpoints27);

var c28 = CUBIC_HERMITE(S0)(controlpoints28);

var block14 = CUBIC_HERMITE(S1)([c27,c28,[0,0,0],[0,0,0]]);

var mblock14 = MAP(block14)(domain2);

var center2 = COLOR([0,0,0])(STRUCT([mblock13,mblock14]));




var controlpoints29 = [[1,0,0],[2,0,0],[0,0,0],[0,0,0]];

var controlpoints30 = [[1,0,-1],[2,0,-1],[0,0,0],[0,0,0]];

var c29 = CUBIC_HERMITE(S0)(controlpoints29);

var c30 = CUBIC_HERMITE(S0)(controlpoints30);

var block15 = CUBIC_HERMITE(S1)([c29,c30,[0,0,0],[0,0,0]]);

var mblock15 = MAP(block15)(domain2);


var controlpoints31 = [[2,0,0],[3,0,0],[0,0,0],[0,0,0]];

var controlpoints32 = [[2,0,-0.5],[3,0,-0.5],[0,0,1],[0,0,-1]];

var c31 = CUBIC_HERMITE(S0)(controlpoints31);

var c32 = CUBIC_HERMITE(S0)(controlpoints32);

var block16 = CUBIC_HERMITE(S1)([c31,c32,[0,0,0],[0,0,0]]);

var mblock16 = MAP(block16)(domain2);

var mblock17 = R([0,2])([PI])(mblock16);

mblock17 = T([0,2])([5,-1])(mblock17);



var controlpoints35 = [[3,0,0],[4,0,0],[0,0,0],[0,0,0]];

var controlpoints36 = [[3,0,-1],[4,0,-1],[0,0,0],[0,0,0]];

var c35 = CUBIC_HERMITE(S0)(controlpoints35);

var c36 = CUBIC_HERMITE(S0)(controlpoints36);

var block18 = CUBIC_HERMITE(S1)([c35,c36,[0,0,0],[0,0,0]]);

var mblock18 = MAP(block18)(domain2);


var controlpoints37 = [[4,0,-1],[5,0,-1],[0,0,0],[0,0,0]];

var controlpoints38 = [[4,0,-0.8],[5,0,-0.8],[0,0,0],[0,0,0]];

var c37 = CUBIC_HERMITE(S0)(controlpoints37);

var c38 = CUBIC_HERMITE(S0)(controlpoints38);

var block19 = CUBIC_HERMITE(S1)([c37,c38,[0,0,0],[0,0,0]]);

var mblock19 = MAP(block19)(domain2);


var controlpoints39 = [[4,0,0],[5,0,0],[0,0,0],[0,0,0]];

var controlpoints40 = [[4,0,-0.2],[5,0,-0.2],[0,0,0],[0,0,0]];

var c39 = CUBIC_HERMITE(S0)(controlpoints39);

var c40 = CUBIC_HERMITE(S0)(controlpoints40);

var block20 = CUBIC_HERMITE(S1)([c39,c40,[0,0,0],[0,0,0]]);

var mblock20 = MAP(block20)(domain2);


var downLeft = STRUCT([mblock15,mblock16, mblock17,mblock18, mblock19,mblock20]);




var downRight = R([0,1])([PI])(downLeft);

downRight = T([0])([10])(downRight);




var controlpoints40 = [[10,1,0],[10,21,0],[0,0,0],[0,0,0]];

var controlpoints41 = [[10,1,-1],[10,21,-1],[0,0,0],[0,0,0]];

var c40 = CUBIC_HERMITE(S0)(controlpoints40);

var c41 = CUBIC_HERMITE(S0)(controlpoints41);

var block21 = CUBIC_HERMITE(S1)([c40,c41,[0,0,0],[0,0,0]]);

var mblock21 = MAP(block21)(domain2);

var left = STRUCT([mblock21]);

var right = T([0])([-10])(left);

var sides = STRUCT([left,right]);




var controlpoints42 = [[1,22,0],[2,22,0],[0,0,0],[0,0,0]];

var controlpoints43 = [[1,22,-1],[2,22,-1],[0,0,0],[0,0,0]];

var c42 = CUBIC_HERMITE(S0)(controlpoints42);

var c43 = CUBIC_HERMITE(S0)(controlpoints43);

var block22 = CUBIC_HERMITE(S1)([c42,c43,[0,0,0],[0,0,0]]);

var mblock22 = MAP(block22)(domain2);


var controlpoints44 = [[2,22,0],[2.6,22,0],[0,0,0],[0,0,0]];

var controlpoints45 = [[2,22,-0.5],[2.6,22,-0.5],[0,0,1],[0,0,-1]];

var c44 = CUBIC_HERMITE(S0)(controlpoints44);

var c45 = CUBIC_HERMITE(S0)(controlpoints45);

var block23 = CUBIC_HERMITE(S1)([c44,c45,[0,0,0],[0,0,0]]);

var mblock23 = MAP(block23)(domain2);

var mblock24 = R([0,2])([PI])(mblock23);

mblock24 = T([0,2])([4.6,-1])(mblock24);


var controlpoints46 = [[2.6,22,0],[9,22,0],[0,0,0],[0,0,0]];

var controlpoints47 = [[2.6,22,-1],[9,22,-1],[0,0,0],[0,0,0]];

var c46 = CUBIC_HERMITE(S0)(controlpoints46);

var c47 = CUBIC_HERMITE(S0)(controlpoints47);

var block25 = CUBIC_HERMITE(S1)([c46,c47,[0,0,0],[0,0,0]]);

var mblock25 = MAP(block25)(domain2);

var up = STRUCT([mblock22,mblock23,mblock24,mblock25]);




var controlpoints48 = [[1,0,0],[1,0,-1],[0,0,0],[0,0,0]];

var c48 = CUBIC_HERMITE(S0)(controlpoints48); 

var controlpoints49 = [[0,1,0],[0,1,-1],[0,0,0],[0,0,0]];

var c49 = CUBIC_HERMITE(S0)(controlpoints49);

var block26 = CUBIC_HERMITE(S1)([c48,c49,[-2,0,0],[0,2,0]]);
  
var mblock26 = MAP(block26)(domain2);

var mblock27 =T([0])([10])( R([0,1])(PI/2)(mblock26) );

var mblock28 =T([0,1])([10,22])( R([0,1])(PI)(mblock26) );

var mblock29 =T([1])([22])( R([0,1])(PI*3/2)(mblock26) );

var angles = STRUCT([mblock26, mblock27, mblock28, mblock29]);




var controlpoints50 = [[0,1,-1],[10,1,-1],[0,0,0],[0,0,0]];

var c50 = CUBIC_HERMITE(S0)(controlpoints50);

var controlpoints51 = [[0,21,-1],[10,21,-1],[0,0,0],[0,0,0]];

var c51 = CUBIC_HERMITE(S0)(controlpoints51);

var block30 = CUBIC_HERMITE(S1)([c50,c51,[0,0,0],[0,0,0]]);

var mblock30 = MAP(block30)(domain2);
  
var controlpoints52 = [[0,1,-1],[5.5,1,-1],[0,0,0],[0,0,0]];
 
var c52 = CUBIC_HERMITE(S0)(controlpoints52); 

var controlpoints53 = [[1,0,-1],[5.5,0,-1],[0,0,0],[0,0,0]];

var c53 = CUBIC_HERMITE(S0)(controlpoints53); 
  
var block31 = CUBIC_HERMITE(S1)([c52,c53,[0,-2,0],[2,0,0]]);
  
var mblock31 = MAP(block31)(domain2);

var mblock32 = R([0,2])([PI])(mblock31);

mblock32 = T([0,2])([10,-2])(mblock32);

var curves = STRUCT([mblock31, mblock32]);

curves =T([1,2])([22,-2])( R([1,2])(PI)(curves));

var back =COLOR([0,0,0])(STRUCT([mblock30, mblock31, mblock32, curves]));





var controlpoints54 = [[0.5,4,0],[9.5,4,0],[0,0,0],[0,0,0]];

var c54 = CUBIC_HERMITE(S0)(controlpoints54); 

var controlpoints55 = [[0.5,18,0],[9.5,18,0],[0,0,0],[0,0,0]];

var c55 = CUBIC_HERMITE(S0)(controlpoints55);

var block33 = CUBIC_HERMITE(S1)([c54,c55,[0,0,0],[0,0,0]]);
  
var mblock33 = MAP(block33)(domain2);

var glass =  COLOR([0,1,1,0.6])(STRUCT([mblock33]));




var controlpoints56 = [[3,20,0],[4,20,0],[0,2,0],[0,-2,0]];

var c56 = CUBIC_HERMITE(S0)(controlpoints56); 

var controlpoints57 = [[3,20,0],[4,20,0],[0,-2,0],[0,2,0]];

var c57 = CUBIC_HERMITE(S0)(controlpoints57);

var block34 = CUBIC_HERMITE(S1)([c56,c57,[0,0,0],[0,0,0]]);
  
var mblock34 = MAP(block34)(domain2);

var camGlass =  COLOR([0,1,1,0.6])(STRUCT([mblock34]));



var backCamGlass = T([2])([-1.1])(camGlass);




var controlpoints58 = [[4,2,0],[6,2,0],[0,4,0],[0,-4,0]];

var c58 = CUBIC_HERMITE(S0)(controlpoints58); 

var controlpoints59 = [[4,2,0],[6,2,0],[0,-4,0],[0,4,0]];

var c59 = CUBIC_HERMITE(S0)(controlpoints59);

var block35 = CUBIC_HERMITE(S1)([c58,c59,[0,0,-0.5],[0,0,0.5]]);
  
var mblock35 = COLOR([0,0,0])(MAP(block35)(domain2));

var quad = COLOR([1,1,1])(POLYLINE([[4.5,1.5],[4.5,2.5],[5.5,2.5],[5.5,1.5],[4.5,1.5]]));

var botton =  STRUCT([mblock35,quad]);



var griglia = CUBOID([2,0.01,0.8]);
griglia = T([0,1,2])([1.8, 0.1, -1])(griglia);

var griglia2 = T([0])([5])(griglia);

var griglia3 = CUBOID([3.5, 1.5,0]);
griglia3 = T([0,1,2])([3.8,18.5,-0.2])(griglia3);

var griglie = STRUCT([griglia, griglia2, griglia3]);
griglie = COLOR([0.33,0.33,0.33,1])(griglie);




var controlPoint1 = [[0,0,0],[0,0.5,0],[0,0,1],[0,0,-1]];
var c1 = CUBIC_HERMITE(S0)(controlPoint1); 
var controlPoint2 = [[0,0,0],[0,0.5,0],[0,0,-1],[0,0,1]];
var c2 = CUBIC_HERMITE(S0)(controlPoint2); 
var blocco1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
var disBlocco1 = MAP(blocco1)(domain2);
var controlPoint3 = [[0.2,0,0],[0.2,0.5,0],[0,0,1],[0,0,-1]];
var c3 = CUBIC_HERMITE(S0)(controlPoint3); 
var controlPoint4 = [[0.2,0,0],[0.2,0.5,0],[0.2,0,-1],[0,0,1]];
var c4 = CUBIC_HERMITE(S0)(controlPoint4); 
var blocco2 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
var disBlocco2 = MAP(blocco2)(domain2);
var blocco3 = CUBIC_HERMITE(S1)([c1,c3,[0,0,0],[0,0,0]]);
var disBlocco3 = MAP(blocco3)(domain2);

var blocco4 = CUBIC_HERMITE(S1)([c2,c4,[0,0,0],[0,0,0]]);
var disBlocco4 = MAP(blocco4)(domain2);

var tasto = STRUCT([disBlocco1, disBlocco2, disBlocco3, disBlocco4]);

var tasto2 = T([1])([0.8])(tasto);

var tasti = STRUCT([tasto, tasto2]);

tasti = T([0,1,2])([-0.2,15,-0.5])(tasti);

var controlPoint1 = [[0,0,0],[0,1,0],[0,0,1],[0,0,-1]];
var c1 = CUBIC_HERMITE(S0)(controlPoint1); 
var controlPoint2 = [[0,0,0],[0,1,0],[0,0,-1],[0,0,1]];
var c2 = CUBIC_HERMITE(S0)(controlPoint2); 
var blocco1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
var disBlocco1 = MAP(blocco1)(domain2);
var controlPoint3 = [[0.2,0,0],[0.2,1,0],[0,0,1],[0,0,-1]];
var c3 = CUBIC_HERMITE(S0)(controlPoint3); 
var controlPoint4 = [[0.2,0,0],[0.2,1,0],[0,0,-1],[0,0,1]];
var c4 = CUBIC_HERMITE(S0)(controlPoint4); 
var blocco2 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
var disBlocco2 = MAP(blocco2)(domain2);
var blocco3 = CUBIC_HERMITE(S1)([c1,c3,[0,0,0],[0,0,0]]);
var disBlocco3 = MAP(blocco3)(domain2);

var blocco4 = CUBIC_HERMITE(S1)([c2,c4,[0,0,0],[0,0,0]]);
var disBlocco4 = MAP(blocco4)(domain2);

var tastoup = STRUCT([disBlocco1, disBlocco2, disBlocco3, disBlocco4]);


tastoup = T([0,1,2])([8,22,-0.5])( R([0,1])([PI/2])(tastoup));


var scmodel = STRUCT([upperBlock,middleBlock,underBlock,line,mrightBlock,center1,center2,downLeft,downRight,sides,up,angles,back,glass,camGlass,backCamGlass,botton,griglie,tasti,tastoup]);













