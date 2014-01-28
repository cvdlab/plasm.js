//Valerio Domenico Di Paolo - matr. 261921
//Flying V Model

//PARAMETRI PER LA VARIAZIONE RAPIDA DEL MODELLO
//Suddivisione intervalli dominio e colori utilizzati

//BODY DOMAIN
var domainBody2 = DOMAIN([[0,1],[0,1]])([10,10]);
var domainBody3 = DOMAIN([[0,1],[0,1],[0,1]])([10,10,1]);
//COMPONENTS DOMAIN
var domain1 = INTERVALS(1)(12);
var domain2 = DOMAIN([[0,1],[0,1]])([12,12]);

//BODY COLORS
var body_color = [0.2,0.2,0.2];
var brown = [0.54,0.27,0.07];
//COMPONENTS COLORS
var black = [0,0,0];
var chrome = [0.8,0.8,0.8];
var transparent = [0.8,0.8,0.8,0.3];
var innerKnob = [0.3,0.3,0.3,1];
var chrome_l = [0.9,0.9,0.9];
var body_color = [0.2,0.2,0.2];
var white = [1,1,1];


//---COMPONENTS PART

//PickUP
var pickBorderDepth = 0.1;
var pickBorderHeight = 0.1;
var pickUpHeight = 1;
var pickUpDepth = 0.3;

var pickBorderDown = SIMPLEX_GRID ([[1],[pickBorderHeight],[pickBorderDepth]]);
var pickBorderUp = SIMPLEX_GRID ([[1],[-pickBorderHeight,-pickUpHeight,pickBorderHeight],[pickBorderDepth]]);
var picBorderRight = SIMPLEX_GRID ([[-0.7,0.3],[-pickBorderHeight,pickUpHeight],[pickBorderDepth]]);
var pickBorderRight = STRUCT([pickBorderDown,pickBorderUp,picBorderRight]);
var pickBorderLeft = S([0])([-1])(pickBorderRight);
var pickBorder = STRUCT([pickBorderRight,pickBorderLeft]);
var pickBorder_colored = COLOR (black)(pickBorder);

var pickUpRight = SIMPLEX_GRID ([[0.7],[-pickBorderHeight,pickUpHeight],[pickUpDepth]]);
var pickUpLeft = S([0])([-1])(pickUpRight);
var pickUp = STRUCT([pickUpRight,pickUpLeft]);
var pickUp_colored = COLOR (chrome)(pickUp)

var pickUpBridge = STRUCT([pickBorder_colored,pickUp_colored]);
var pickUpNeck = T([1])([1.9])(pickUpBridge);
var pickUps = STRUCT([pickUpBridge,pickUpNeck]);
var pickUps_placed = T([1])([8])(pickUps);

//KNOB
var knobControls1 = [[0,0,0],[0.3,0,0],[0.3,0.3,0],[0.3,0.3,0],[0.3,0.3,0],[0.3,0.6,0],[0,0.6,0]];
var knobControls2 = knobControls1.map(function (p) {return [p[0],p[1],p[2]+0.3] });
var knobControls3 = [[0,0,0+0.3],[0,0.3,0+0.3],[0,0.6,0+0.3]];

var knobControls4 = [[0,0,0],[0.3,0,0],[0.3,0.3,0],[0.3,0.3,0],[0.3,0.3,0],[0.3,0.6,0],[0,0.6,0]];
var knobControls5 = [[0,0.2,0.2],[0.1,0.2,0.2],[0.1,0.3,0.2],[0.1,0.3,0.2],[0.1,0.3,0.2],[0.1,0.4,0.2],[0,0.4,0.2]];
var knobControls6 = [[0,0.2,0.2],[0,0.4,0.2]];

var knobc1 = BEZIER(S0)(knobControls1);
var knobc2 = BEZIER(S0)(knobControls2);
var knobc3 = BEZIER(S0)(knobControls3);
var knobc4 = BEZIER(S0)(knobControls4);
var knobc5 = BEZIER(S0)(knobControls5);
var knobc6 = BEZIER(S0)(knobControls6);

var knobSideF = BEZIER(S1)([knobc1,knobc2]);
var knobSideL = MAP(knobSideF)(domain2);
var knobSideR = S([0])([-1])(knobSideL);
var knobSide = STRUCT ([knobSideL,knobSideR]);

var KnobUpF = BEZIER(S1)([knobc2,knobc3]);
var knobUpL = MAP(KnobUpF)(domain2);
var KnobUpR = S([0])([-1])(knobUpL);
var knobUp = STRUCT ([knobUpL,KnobUpR]);

var knobInnerSideF = BEZIER(S1)([knobc4,knobc5]);
var knobInnerSideL = MAP(knobInnerSideF)(domain2);
var knobInnerSideR = S([0])([-1])(knobInnerSideL);
var knobInnerSide = STRUCT ([knobInnerSideL,knobInnerSideR]);

var KnobInnerUpF = BEZIER(S1)([knobc5,knobc6]);
var knobInnerUpL = MAP(KnobInnerUpF)(domain2);
var KnobInnerUpR = S([0])([-1])(knobInnerUpL);
var knobInnerUp = STRUCT ([knobInnerUpL,KnobInnerUpR]);

var knobSurface = STRUCT ([knobSide,knobUp]);
var knobSurface_colored = COLOR(transparent)(knobSurface);
var knobInnerSurface = STRUCT ([knobInnerSide,knobInnerUp]);
var knobInnerSurface_colored = COLOR(innerKnob)(knobInnerSurface);

var knobVolume = STRUCT ([knobSurface_colored,knobInnerSurface_colored]);
var knobVolume_placed = T([0,1])([2.5,5])(knobVolume);
var knobTone1 = T([0,1])([-1,0.3])(knobVolume_placed);
var knobTone2 = T([0,1])([-0.5,1.1])(knobVolume_placed);
var knobs_placed = STRUCT ([knobVolume_placed,knobTone1,knobTone2]);


//SWITCH (3-way-switch)
var switchDepth = 0.7;
var switchControl2 = [[0,0,0],[0.2,0,(switchDepth/2)],[0.2,0,switchDepth],[0,0,switchDepth]];
var switchControl1 = [[0,0,0],[0,0.2,(switchDepth/2)],[0,0.2,switchDepth],[0,0,switchDepth]];
var switchControl3 = [[0,0,0],[0,-0.2,(switchDepth/2)],[0,-0.2,switchDepth],[0,0,switchDepth]];
var switch_c1 = BEZIER(S0)(switchControl1);
var switch_c2 = BEZIER(S0)(switchControl2);
var switch_c3 = BEZIER(S0)(switchControl3);
var switchF = BEZIER(S1)([switch_c1,switch_c2,switch_c3]);
var switchL = MAP(switchF)(domain2);
var switchR = S([0])([-1])(switchL);
var switchPickups = STRUCT([switchL,switchR]);
var switchPickups_colored = COLOR(chrome_l)(switchPickups);
var switchPickups_placed = T([0,1])([2,4.5])(switchPickups_colored);


//JACKPLATE
var jackBorderControls1 = [[0,-0.3,0.01],[0.3,-0.3,0.01],[0.3,0,0.01],[0.3,0,0.01],[0.3,0,0.01],[0.3,0.3,0.01],[0,0.3,0.01]];
var jackBorderControls2 = [[0,-0.3,0.01],[0,0,0.01],[0,0.3,0.01]];
var jackBorderc1 = BEZIER(S0)(jackBorderControls1);
var jackBorderc2 = BEZIER(S0)(jackBorderControls2);
var jackBorderUpF = BEZIER(S1)([jackBorderc1,jackBorderc2]);
var jackBorderUpL = MAP(jackBorderUpF)(domain2);
var jackBorderUpR = S([0])([-1])(jackBorderUpL);
var jackBorder = STRUCT ([jackBorderUpL,jackBorderUpR]);
var jackBorder_colored = COLOR(black)(jackBorder);
var jackBolt = CYL_SURFACE([0.2,0.2])([6]);
var jackBolt_colored = COLOR(chrome)(jackBolt);
var jack = STRUCT ([jackBorder_colored, jackBolt_colored]);
var jack_placed = T([0,1])([3,4.2])(jack);

//BRIDGE
var bridgeHeight = 0.4;
var bridgeDepth = 0.8;
var bridgeLength = 0.6;
var bridgeScrew = 0.4;
var bridgeControls1 = [[0,0,0],[0,0,bridgeDepth],[0,0,bridgeDepth],[0,bridgeHeight,bridgeDepth],[0,bridgeHeight,bridgeDepth],[0,bridgeHeight,0]];
var bridgeControls2 = bridgeControls1.map(function (p) {return [p[0]+bridgeLength,p[1],p[2]] });
var bridgeControls3 = [[bridgeLength,0,0],[bridgeLength,bridgeHeight,0]];
var bridgeControls4 = [[bridgeLength,0,0],[bridgeLength+bridgeScrew,0,0],[bridgeLength+bridgeScrew,bridgeHeight,0],[bridgeLength,bridgeHeight,0],];
var bridgeControls5 = bridgeControls4.map(function (p) {return [p[0],p[1],p[2]+(bridgeDepth/2)] });
var bridgeControls6 = [[bridgeLength,0,(bridgeDepth/3)],[bridgeLength,bridgeHeight,(bridgeDepth/3)]];

var bridgeC1 = BEZIER(S0)(bridgeControls1);
var bridgeC2 = BEZIER(S0)(bridgeControls2);
var bridgeC3 = BEZIER(S0)(bridgeControls3);
var bridgeC4 = BEZIER(S0)(bridgeControls4);
var bridgeC5 = BEZIER(S0)(bridgeControls5);
var bridgeC6 = BEZIER(S0)(bridgeControls6);

var bridgeTopF = BEZIER(S1)([bridgeC1,bridgeC2]);
var bridgeTopL = MAP(bridgeTopF)(domain2);
var bridgeTopR = S([0])([-1])(bridgeTopL);
var bridgeTop = STRUCT ([bridgeTopL,bridgeTopR]);
var bridgeSideF = BEZIER(S1)([bridgeC2,bridgeC3]);
var bridgeSideL = MAP(bridgeSideF)(domain2);
var bridgeSideR = S([0])([-1])(bridgeSideL);
var bridgeSide = STRUCT ([bridgeSideL,bridgeSideR]);
var bridgeScrewSideF = BEZIER(S1)([bridgeC4,bridgeC5]);
var bridgeScrewSideL = MAP(bridgeScrewSideF)(domain2);
var bridgeScrewSideR = S([0])([-1])(bridgeScrewSideL);
var bridgeScrewTopF = BEZIER(S1)([bridgeC5,bridgeC6]);
var bridgeScrewTopL = MAP(bridgeScrewTopF)(domain2);
var bridgeScrewTopR = S([0])([-1])(bridgeScrewTopL);
var bridgeScrew = STRUCT([bridgeScrewSideL,bridgeScrewSideR,bridgeScrewTopL,bridgeScrewTopR]);
var bridge = STRUCT ([bridgeTop,bridgeSide,bridgeScrew]);
var bridge_colored = COLOR(chrome)(bridge);
var bridge_placed = T([1])([6.2])(bridge_colored);


//COMPONENTS MODEL
var components = STRUCT ([pickUps_placed,knobs_placed,jack_placed,switchPickups_placed,bridge_placed]);
//DRAW(components);


//---BODY PART

//BODY MAIN PART
var bodyDepth = 1.4;
var c1 = [[0,5,0],
    [0.5,5,0],[0.5,5,0],[0.5,5,0],
    [4,1,0],
    [4.5,0,0],[4.5,0,0],[4.5,0,0],[4.5,0,0],[4.5,0,0],
    [5,1,0],[5,1,0],[5,1,0],[5,1,0],[5,1,0],
    [1.5,12.5,0]];
var c2 = [[0,12.5,0],[1.5,12.5,0]];
var cm = [[0,5,0],[0,12.5,0]];    

var c1_b = c1.map(function (p) {return [p[0],p[1],p[2]-bodyDepth] });
var c2_b = c2.map(function (p) {return [p[0],p[1],p[2]-bodyDepth] });
var cm_b = cm.map(function (p) {return [p[0],p[1],p[2]-bodyDepth] });

var bodyC1 = BEZIER(S0)(c1);
var bodyC2 = BEZIER(S0)(c2);
var bodyCm = BEZIER(S0)(cm);

var bodyC1_b = BEZIER(S0)(c1_b);
var bodyC2_b = BEZIER(S0)(c2_b);
var bodyCm_b = BEZIER(S0)(cm_b);

var bodyF = BEZIER(S1)([bodyC1,bodyC2,bodyCm]);
var bodyDownF = BEZIER(S1)([bodyC1_b,bodyC2_b,bodyCm_b]);

var bodyMainF = BEZIER(S2)([bodyF,bodyDownF]);
var bodyMainL = MAP(bodyMainF)(domainBody3);
var bodyMainR = S([0])([-1])(bodyMainL);
var bodyMain = STRUCT ([bodyMainL,bodyMainR]);
var bodyMain_colored = COLOR(body_color)(bodyMain);

//NECK PART
var neck1 = [[0,0,0],[0.6,0,0],[0.6,0,0.5],[0.6,0,1]];
var neck2 = neck1.map(function (p) {return [p[0],p[1]+2,p[2]]});

var neck3 = [[0,3,0.5],[0.6,3,0.6],[0.6,3,0.8],[0.6,3,1]];
var neck4 = neck3.map(function (p) {return [p[0],p[1]+8.5,p[2]]});

var neck5 = [[0,0,1],[0.6,0,1]];
var neck6 = [[0,11.5,1],[0.6,11.5,1]];

var neckC1 = BEZIER(S0)(neck1);
var neckC2 = BEZIER(S0)(neck2);
var neckC3 = BEZIER(S0)(neck3);
var neckC4 = BEZIER(S0)(neck4);
var neckC5 = BEZIER(S0)(neck5);
var neckC6 = BEZIER(S0)(neck6);

var neckFirstPartF = BEZIER(S1)([neckC1,neckC2]);
var neckFirstPart = MAP(neckFirstPartF)(domainBody2);
var neckSecondPartF = BEZIER(S1)([neckC2,neckC3]);
var neckSecondPart = MAP(neckSecondPartF)(domainBody2);
var neckLongF = BEZIER(S1)([neckC3,neckC4]);
var neckLong = MAP(neckLongF)(domainBody2);
var fretsF = BEZIER(S1)([neckC5,neckC6]);
var frets = MAP(fretsF)(domainBody2);
var insertionF = BEZIER(S1)([neckC1,neckC5]);
var insertion = MAP(insertionF)(domainBody2);

var neckL = STRUCT ([insertion,neckFirstPart,neckSecondPart,neckLong,frets]);
var neckR = S([0])([-1])(neckL);
var neck = STRUCT([neckL,neckR]);
var neck_placed = T([1,2])([11.7,-0.7])(neck);
var neck_colored = COLOR(brown)(neck_placed);

//SHOULDER PART
var shoulder1 = [[1.5,12.5,0],[1,12.5,0],[0,13,0]];
var shoulder2 = shoulder1.map(function (p) {return [p[0],p[1],p[2]-bodyDepth]});
var shoulder3 = [[0,12.5,0],[0,13,0]];
var shoulderC1 = BEZIER(S0)(shoulder1);
var shoulderC2 = BEZIER(S0)(shoulder2);
var shoulderC3 = BEZIER(S0)(shoulder3);
var ShoulderSideF = BEZIER(S1)([shoulderC1,shoulderC2]);
var ShoulderUpF = BEZIER (S1)([shoulderC1,shoulderC3]);
var ShoulderSide = MAP(ShoulderSideF)(domainBody3);
var ShoulderUp = MAP(ShoulderUpF)(domainBody3);
var ShoulderDown = T([2])([-bodyDepth])(ShoulderUp);
var ShoulderL = STRUCT ([ShoulderSide,ShoulderUp,ShoulderDown]);
var ShoulderR = S([0])([-1])(ShoulderL);
var shoulder = STRUCT([ShoulderL,ShoulderR]);
var shoulder_colored = COLOR(body_color)(shoulder);


//HEADSTOCK PART
var headstockDepth = 0.5;
//var head1 = [[0,0,0],[0.6,0,0]];
var head2 = [[0.6,0,0],[0.6,0.6,0],[1.2,1.2,0]];
var head3 = [[1.2,1.2,0],[0.6,4,0]];
var head4 = [[0.6,4,0],[0.6,4.5,0],[0,4.5,0]];
var headm = [[0,0,0],[0,4.5,0]];

var head2_b = head2.map(function (p) {return [p[0],p[1],p[2]-headstockDepth] });
var head3_b = head3.map(function (p) {return [p[0],p[1],p[2]-headstockDepth] });
var head4_b = head4.map(function (p) {return [p[0],p[1],p[2]-headstockDepth] });
var headm_b = headm.map(function (p) {return [p[0],p[1],p[2]-headstockDepth] });

//var headC1 = BEZIER(S0)(head1);
var headC2 = BEZIER(S0)(head2);
var headC3 = BEZIER(S0)(head3);
var headC4 = BEZIER(S0)(head4);
var headCm = BEZIER(S0)(headm);

var headC2_b = BEZIER(S0)(head2_b);
var headC3_b = BEZIER(S0)(head3_b);
var headC4_b = BEZIER(S0)(head4_b);
var headCm_b = BEZIER(S0)(headm_b);

var HeadTop1F = BEZIER(S1)([headC2,headCm]);
var HeadTop2F = BEZIER(S1)([headC4,headCm]);
var HeadTop3F = BEZIER(S1)([headC3,headCm]);

var HeadDown1F = BEZIER(S1)([headC2_b,headCm_b]);
var HeadDown2F = BEZIER(S1)([headC4_b,headCm_b]);
var HeadDown3F = BEZIER(S1)([headC3_b,headCm_b]);

var headMain1F = BEZIER(S2)([HeadTop1F,HeadDown1F]);
var headMain1L = MAP(headMain1F)(domainBody3);

var headMain2F = BEZIER(S2)([HeadTop2F,HeadDown2F]);
var headMain2L = MAP(headMain2F)(domainBody3);

var headMain3F = BEZIER(S2)([HeadTop3F,HeadDown3F]);
var headMain3L = MAP(headMain3F)(domainBody3);

var headMainL = STRUCT([headMain1L,headMain2L,headMain3L]);
var headMainR = S([0])([-1])(headMainL);
var headMain = STRUCT ([headMainL,headMainR]);

var headMain_placed = T([1,2])([11.7+11.5,0.3])(headMain);
var headMain_colored = COLOR(body_color)(headMain_placed);

//NUT PART
var nutHeight = 0.2;
var nutDepth = 0.25;
var nutLength = 0.6;
var nutControls1 = [[0,0,0],[0,0,nutDepth],[0,0,nutDepth],[0,nutHeight,nutDepth],[0,nutHeight,nutDepth],[0,nutHeight,0]];
var nutControls2 = nutControls1.map(function (p) {return [p[0]+nutLength,p[1],p[2]] });
var nutControls3 = [[nutLength,0,0],[nutLength,nutHeight,0]];

var nutC1 = BEZIER(S0)(nutControls1);
var nutC2 = BEZIER(S0)(nutControls2);
var nutC3 = BEZIER(S0)(nutControls3);
var nutTopF = BEZIER(S1)([nutC1,nutC2]);
var nutTopL = MAP(nutTopF)(domain2);
var nutTopR = S([0])([-1])(nutTopL);
var nutTop = STRUCT ([nutTopL,nutTopR]);
var nutSideF = BEZIER(S1)([nutC2,nutC3]);
var nutSideL = MAP(nutSideF)(domain2);
var nutSideR = S([0])([-1])(nutSideL);
var nutSide = STRUCT ([nutSideL,nutSideR]);
var nut = STRUCT ([nutTop,nutSide]);
var nut_placed = T([1,2])([23.2,0.3])(nut);
var nut_colored = COLOR(white)(nut_placed);

//STRINGS
var stringDepth = (bridgeDepth-0.3);
var stringSpacing = 0.17;
var stringEpoints = [[((stringSpacing*-2)-(stringSpacing/2)),6.5,stringDepth],
					[((stringSpacing*-2)-(stringSpacing/2)),23.3,stringDepth]];
var stringE = POLYLINE(stringEpoints);
var stingE_c = COLOR(chrome_l)(stringE);
var stringSpacer = T([0])([stringSpacing]);
var strings_colored = STRUCT([stingE_c,stringSpacer,stingE_c,stringSpacer,stingE_c,stringSpacer,
						stingE_c,stringSpacer,stingE_c,stringSpacer,stingE_c]);

//BODY ELEMENTS MODEL
var bodyElements = STRUCT([bodyMain_colored, neck_colored, headMain_colored, strings_colored, nut_colored, shoulder_colored]);
//DRAW(bodyElements);

//SCMODEL
var scmodel = STRUCT([bodyElements,components]);
