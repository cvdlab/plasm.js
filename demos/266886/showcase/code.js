
domain = INTERVALS(1)(60)
domain2 = DOMAIN([[0,1],[0,1]])([30,30]);
var semiCuorePoint1 = [[90,174,0],[77,162,0],[63,149,0],[57,143,0],[49,135,0],[36,120,0],[25,105,0],[12,80,0],[10,46,0],[38,22,0],[57,22,0],[81,33,0],[90,44,0]];

var semiCuorePoint2 = [[90,174,10],[77,162,10],[63,149,10],[57,143,10],[49,135,10],[36,120,10],[25,105,10],[12,80,10],[10,46,10],[38,22,10],[57,22,10],[81,33,10],[90,44,10]];

var knots = [0,0,0,0,1,2,3,4,5,6,7,8,9,10,10,10,10];
var semiCuoreLine1 = NUBS(S0)(3)(knots)(semiCuorePoint1);
var semiCuoreLine2 = NUBS(S0)(3)(knots)(semiCuorePoint2);
semiArea = MAP(BEZIER(S1)([semiCuoreLine1,semiCuoreLine2]))(domain2)
semiUp = MAP(BEZIER(S1)([semiCuoreLine1,[90,90,0]]))(domain2)
semiDown = MAP(BEZIER(S1)([semiCuoreLine2,[90,90,10]]))(domain2)
semiCuore = STRUCT([semiArea,semiUp,semiDown])
cuori =COLOR([1,0,0])(STRUCT([semiCuore,T([0,2])([180,10])(R([0,2])([PI])(semiCuore))]))



var semiQuadri1 = [[269,390,0],[262,375,0],[253,361,0],[242,344,0],[214,313,0],[193,296,0],[214,278,0],[239,251,0],[250,237,0],[260,219,0],[269,201,0]];

var semiQuadri2 = [[269,390,10],[262,375,10],[253,361,10],[242,344,10],[214,313,10],[193,296,10],[214,278,10],[239,251,10],[250,237,10],[260,219,10],[269,201,10]];

var knots = [0,0,0,0,1,2,3,5,6,7,10,11,11,11,11];
var semiQuadriLine1 = NUBS(S0)(3)(knots)(semiQuadri1);
var semiQuadriLine2 = NUBS(S0)(3)(knots)(semiQuadri2);
semiAreaQuadri = MAP(BEZIER(S1)([semiQuadriLine1,semiQuadriLine2]))(domain2)
semiUpQuadri = MAP(BEZIER(S1)([semiQuadriLine1,[269,300,0]]))(domain2)
semiDownQuadri = MAP(BEZIER(S1)([semiQuadriLine2,[269,300,10]]))(domain2)
semiQuadri = STRUCT([semiAreaQuadri,semiUpQuadri,semiDownQuadri])
quadri =COLOR([1,0,0])(STRUCT([semiQuadri,T([0,2])([538,10])(R([0,2])([PI])(semiQuadri))]))


var semiPicche1 = [[90,388,0],[72,388,0],[69,388,0],[75,376,0],[81,361,0],[86,344,0],[88,355,0],[89,330,0],[90,323,0]];

var semiPicche2 = [[90,388,10],[72,388,10],[69,388,10],[75,376,10],[81,361,10],[86,344,10],[88,355,10],[89,330,10],[90,323,10]];

var knots = [0,0,0,0,1,2,3,5,6,12,12,12,12];
var semiPiccheLine1 = NUBS(S0)(3)(knots)(semiPicche1);
var semiPiccheLine2 = NUBS(S0)(3)(knots)(semiPicche2);
semiAreaPicche = MAP(BEZIER(S1)([semiPiccheLine1,semiPiccheLine2]))(domain2)
semiUpPicche = MAP(BEZIER(S1)([semiPiccheLine1,[90,350,0]]))(domain2)
semiDownPicche = MAP(BEZIER(S1)([semiPiccheLine2,[90,350,10]]))(domain2)
semiPicche = STRUCT([semiAreaPicche,semiUpPicche,semiDownPicche])
sottoPicche =COLOR([0,0,0])(STRUCT([semiPicche,T([0,2])([180,10])(R([0,2])([PI])(semiPicche))]))
picche = STRUCT([sottoPicche,COLOR([0,0,0])(T([1])([385])(R([1,2])([PI])(cuori)))])



var semiFiori1 = [[211,132,0],[205,139,0],[201,144,0],[192,152,0],[182,157,0],[170,159,0],[155,156,0],[139,142,0],[133,121,0],[137,104,0],[148,91,0],[158,86,0],[171,84,0],[193,90,0],[185,82,0],[177,68,0],[175,52,0],[181,33,0],[187,26,0],[196,20,0],[211,17,0]];

var semiFiori2 = [[211,132,10],[205,139,10],[201,144,10],[192,152,10],[182,157,10],[170,159,10],[155,156,10],[139,142,10],[133,121,10],[137,104,10],[148,91,10],[158,86,10],[171,84,10],[193,90,10],[185,82,10],[177,68,10],[175,52,10],[181,33,10],[187,26,10],[196,20,10],[211,17,10]];

var knots = [0,0,0,0,1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,20,20,20];
var semiFioriLine1 = NUBS(S0)(3)(knots)(semiFiori1);
var semiFioriLine2 = NUBS(S0)(3)(knots)(semiFiori2);
semiAreaFiori = MAP(BEZIER(S1)([semiFioriLine1,semiFioriLine2]))(domain2)
semiUpFiori = MAP(BEZIER(S1)([semiFioriLine1,[211,90,0]]))(domain2)
semiDownFiori = MAP(BEZIER(S1)([semiFioriLine2,[211,90,10]]))(domain2)
semiFiori = STRUCT([semiAreaFiori,semiUpFiori,semiDownFiori])
sottoFiori =COLOR([0,0,0])(STRUCT([semiFiori,T([0,2])([90,10])(R([0,2])([PI])(semiFiori))]))
fiori = T([0])([60])(COLOR([0,0,0])(STRUCT([T([0,1])([121,-190])(sottoPicche),semiFiori,T([0,2])([421,10])(R([0,2])([PI])(semiFiori))])))


model = T([0,1,2])([-200,-200,-15])(STRUCT([cuori,quadri,fiori,picche]))