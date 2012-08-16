/**
 * @author Andrea Somma
 * 
 * Villa Badoer
 */

var model;

function drawVilla() {
  //-------------------------------------------DOMINI--------------------------------------------
  var domain = DOMAIN([[0,1],[0,1]])([30,1]);
  var domain2 = INTERVALS(1)(1);
  var domainPI = DOMAIN([[0,1],[0,2*PI]])([35,15]);

  //-------------------------------------------COLORI--------------------------------------------
  function white(model){
    return COLOR([0.999999999999999999,
      0.999999999999999999,
      0.999999999999999999,
      1])(model);
  }

   function wall(model){
    return COLOR([255/255,248/255,220/255,1])(model);
  }

  function green(model){
    return COLOR([105/255,139/255,105/255,1])(model);
  }

  function mosaico(model){
    return COLOR([222/255,184/255,135/255,1])(model);
  }

  function brown(model){
    return COLOR([92/255,51/255,23/255,1])(model);
  }

  function redBase(model){
    return COLOR([139/255,54/255,38/255,1])(model);
  }

  function tan3(model){
    return COLOR([205/255,133/255,63/255,1])(model);
  }

  function black(model){
    return COLOR([0,0,0,1])(model);
  }

  function grey(model){
    return COLOR([84/255,84/255,84/255,1])(model);
  }

  function blue(model){
    return COLOR([135/255,206/255,250/255,0.7])(model);
  }

  function greenErba(model){
    return COLOR([0/255,139/255,0/255,1])(model);
  }

  function glass(model){
    return COLOR([0/255,191/255,255/255,0.5])(model);
  }

  function lightGrey(model){
    return COLOR([153/255,153/255,153/255,1])(model);
  }

  function earth(model){
    return COLOR([139/255,69/255,19/255,1])(model);
  }

  //-------------------------------------------GRATE PICCOLE--------------------------------------------
  function creaStrutturaConGrata() {
    var cube1 = CUBOID([1,0.05,0.1]);
    var cube2 = T([1])([0.45])(cube1);
    var cube3 = T([1])([0.05])(CUBOID([0.05,0.4,0.1]));
    var cube4 = T([0])([0.95])(cube3);
    var vetro = BOUNDARY(CUBOID([0.9,0.4,0.05]));
    vetro = T([0,1,2])([0.05, 0.05, 0.025])(vetro);
    var cilindro1 = CYL_SURFACE([0.01,0.5])();
    cilindro1 = R([1,2])(-PI/2)(cilindro1);
    cilindro1 = T([0])([0.125])(cilindro1);
    var cilindro2 = T([0])([0.125])(cilindro1);
    var cilindro3 = T([0])([0.25])(cilindro1);
    var cilindro4 = T([0])([0.375])(cilindro1);
    var cilindro5 = T([0])([0.5])(cilindro1);
    var cilindro6 = T([0])([0.625])(cilindro1);
    var cilindro7 = T([0])([0.75])(cilindro1);
    var cilindro8 = CYL_SURFACE([0.01,1])();
    cilindro8 = R([0,2])(-PI/2)(cilindro8);
    cilindro8 = T([0,1])([1, 0.125])(cilindro8);
    var cilindro9 = T([1])([0.125])(cilindro8);
    var cilindro10 = T([1])([0.25])(cilindro8); 
    var struct = STRUCT([cube1, cube2, cube3, cube4]);
    var grata = STRUCT([cilindro1, cilindro2, cilindro3, cilindro4, cilindro5, 
      cilindro6, cilindro7, cilindro8, cilindro9, cilindro10
    ]);
    grata = T([2])([0.11])(grata);
    struct = STRUCT([brown(struct), glass(vetro), grey(grata)]);
    return struct;
  }

  //-------------------------------------------CILINDRO PIENO--------------------------------------------
  function drawCylinderPieno(r,h,n) {
    r = r || 1;
    h = h || 2;
    n = n || 40;
    m = 1;
    p = 1;
    var dominioSolido = SIMPLEX_GRID([ REPEAT(n)(2*PI/n), REPEAT(m)((r)/m), REPEAT(p)(h/p) ]);
    var mappingSolido = function(pt) {
      return [pt[1]*SIN(pt[0]), pt[1]*COS(pt[0]), pt[2]];
    };
    dominioSolido = MAP(mappingSolido)(dominioSolido);
    return dominioSolido;
  };

  //-------------------------------------------PARTE FRONTALE--------------------------------------------
  function drawFacciaFrontale() {
    
    // Parte sinistra larga 3.75
    var muro1 = SIMPLEX_GRID([[1.5],[5.5],[0.2]]);

    var muro2_1 = SIMPLEX_GRID([[-1.5, 1.0],[0.5],[0.2]]);

    var muro2_2 = SIMPLEX_GRID([[-1.5, 1.0],[-1, 0.7],[0.2]]);

    var muro2_3 = SIMPLEX_GRID([[-1.5, 1.0],[-3.2, 1.6],[0.2]]);

    var muro2_4 = SIMPLEX_GRID([[-1.5, 1.0],[-5.4, 0.1],[0.2]]);

    var muro3 = SIMPLEX_GRID([[-2.5, 1.25],[5.5],[0.2]]);

    // Parte destra
    //muro13 = muro3
    var muro13 = SIMPLEX_GRID([[-(3.75+7.5), 1.25],[5.5],[0.2]]);
    //muro14_1 = muro2_4
    var muro14_1 = SIMPLEX_GRID([[-(3.75+7.5+1.25), 1.0],[-5.4, 0.1],[0.2]]);
    //muro14_2 = muro2_3
    var muro14_2 = SIMPLEX_GRID([[-(3.75+7.5+1.25), 1.0],[-3.2, 1.6],[0.2]]);
    //muro14_3 = muro2_2
    var muro14_3 = SIMPLEX_GRID([[-(3.75+7.5+1.25), 1.0],[-1, 0.7],[0.2]]);
    //muro14_4 = muro2_1
    var muro14_4 = SIMPLEX_GRID([[-(3.75+7.5+1.25), 1.0],[0.5],[0.2]]);
    //muro15 = muro1
    var muro15 = SIMPLEX_GRID([[-(3.75+7.5+1.25+1), 1.5],[5.5],[0.2]]);

    //var muro16 = CUBOID([1, 0.1, 0.05]);
    //muro16 = T([0,1,2])([])(muro16);

    var base1 = T([0,1,2])([3.55,0.8,-2.7])(SIMPLEX_GRID([[7.9],[0.2],[2.7]]));

    //parte sopra le colonne
    var muro16 = CUBOID([7.5, 0.2, 0.6]);
    muro16 = T([0,1,2])([3.75,5,-0.2])(muro16);
    var muro17 = CUBOID([7.5, 0.1, 0.6]);
    muro17 = T([0,1,2])([3.75,5.2,-0.2])(muro17);
    var muro18 = CUBOID([7.6, 0.1, 0.65]);
    muro18 = T([0,1,2])([3.7,5.2,-0.2])(muro18);
    var muro19 = CUBOID([7.5, 0.2, 0.6]);
    muro19 = T([0,1,2])([3.75,5.3,-0.2])(muro19);

    var facciata = STRUCT([muro1, muro2_1, muro2_2, muro2_3, muro2_4, muro3, 
      //muro4, muro5, muro6, muro7, muro8, muro9, muro10, muro11, muro12, 
      muro13, muro14_1, muro14_2, muro14_3, muro14_4, muro15, base1, 
      muro16, muro17, muro18, muro19]
    );
    return wall(facciata);
  }

  function drawMosaicoInterno() {
    // Parte interna profonda 2.7 e larga 7.5  (3.55 = 3.75 - spessore 0.2)
    var muro4 = T([0,1,2])([3.55,1,-1])(SIMPLEX_GRID([[0.2],[4.5],[1.0]]));

    var muro5 = T([0,1,2])([3.55,2.4,-1.7])(SIMPLEX_GRID([[0.2],[3.1],[0.7]]));

    var muro6 = T([0,1,2])([3.55,1,-2.7])(SIMPLEX_GRID([[0.2],[4.5],[1.0]]));

    var muro7_1 = T([0,1,2])([3.75,1,-2.7])(SIMPLEX_GRID([[0.5],[4.5],[0.2]]));

    var muro7_2 = T([0,1,2])([3.75+0.5,1,-2.7])(SIMPLEX_GRID([[1],[1.2],[0.2]]));

    var muro7_3 = T([0,1,2])([3.75+0.5,1+2.7,-2.7])(SIMPLEX_GRID([[1],[1.8],[0.2]]));

    var muro7_4 = T([0,1,2])([3.75+1.5,1,-2.7])(SIMPLEX_GRID([[1.55],[4.5],[0.2]]));

    var muro8 = T([0,1,2])([3.75+3.05,1+2.7,-2.7])(SIMPLEX_GRID([[1.4],[1.8],[0.2]]));
    //muro 7 = muro9
    var muro9_1 = T([0,1,2])([3.75+3.05+1.4,1,-2.7])(SIMPLEX_GRID([[1.55],[4.5],[0.2]]));
    
    var muro9_2 = T([0,1,2])([3.75+3.05+1.4+1.55,1,-2.7])(SIMPLEX_GRID([[1],[1.2],[0.2]]));

    var muro9_3 = T([0,1,2])([3.75+3.05+1.4+1.55,1+2.7,-2.7])(SIMPLEX_GRID([[1],[1.8],[0.2]]));

    var muro9_4 = T([0,1,2])([3.75+3.05+1.4+2.55,1,-2.7])(SIMPLEX_GRID([[0.5],[4.5],[0.2]]));
    //muro 6 = muro10
    var muro10 = T([0,1,2])([3.75+3.05+1.4+3.05,1,-2.7])(SIMPLEX_GRID([[0.2],[4.5],[1.0]]));
    //muro 5 = muro11
    var muro11 = T([0,1,2])([3.75+3.05+1.4+3.05,2.4,-1.7])(SIMPLEX_GRID([[0.2],[3.1],[0.7]]));
    //muro4 = muro12
    var muro12 = T([0,1,2])([3.75+3.05+1.4+3.05,1,-1])(SIMPLEX_GRID([[0.2],[4.5],[1.0]]));

    var facciata = STRUCT([muro4, muro5, muro6, muro7_1, muro7_2, muro7_3, muro7_4, muro8, 
      muro9_1, muro9_2, muro9_3, muro9_4, muro10, muro11, muro12,]);
    return mosaico(facciata);
  }

  function creaScalinoFrontale(larghezza) {
    var domain = DOMAIN([[0,1],[0,1]])([20,1]);
    var knots = [0,0,0,1,2,3,3,3];
    var points1 = [[0,0,0],[0,0,0.38],[0,-0.05,0.38],[0,-0.05,0.3],[0,-0.1,0.3]];
    var points2 = [[larghezza,0,0],[larghezza,0,0.38],[larghezza,-0.05,0.38],[larghezza,-0.05,0.3],[larghezza,-0.1,0.3]];

    var curve1 = NUBS(S0)(2)(knots)(points1);
    var curve2 = NUBS(S0)(2)(knots)(points2);
    var sup = BEZIER(S1)([curve1,curve2]);
    sup = MAP(sup)(domain);
    return sup;
  }

  function drawScalinata(scalini, larghezzaScalino) {
    var scalino = creaScalinoFrontale(larghezzaScalino);
    var scalinata = [];
    scalino = T([0,1])([3.75+0.2,1])(scalino);
    scalinata.push(scalino);
    for(i=1; i<scalini; i++){
      var scalino_i = T([1,2])([-i*0.1,0.2*i])(scalino);
      scalinata.push(scalino_i);
    }
    return STRUCT(scalinata);
  }

  function creaPuntiBaseScala(y,z) {
    var points = [[0.02,-0.1+y,0+z],[0.02,0.08+y,0+z],[0,0.08+y,0+z],[0,0.1+y,0+z],[0.02,0.1+y,0+z],
      [0.2,0.1+y,0+z],[0.22,0.1+y,0+z],[0.22,0.08+y,0+z],[0.2,0.08+y,0+z],[0.2,-0.1+y,0+z]
    ];
    return points;
  }

  function creaColonnina() {
    var knots = [0,0,0,1,2,3,4,5,6,7,8,9,9,9];
    var points = [[0,0,0],[-0.05,0,0],[-0.05,0,0.02],[-0.08,0,0.1],[-0.03,0,0.25],[-0.035,0,0.3],[-0.045,0,0.3],
      [-0.045,0,0.32],[-0.035,0,0.32],[-0.035,0,0.45],[0,0,0.45]
    ];
    var profile = NUBS(S0)(2)(knots)(points);
    var mapping = ROTATIONAL_SURFACE(profile);
    var surface = MAP(mapping)(domainPI);
    var cube = CUBOID([0.16,0.15,0.16]);
    surface = R([1,2])(-PI/2)(surface);
    surface = T([0,1,2])([0.08,0.15,0.08])(surface)
    var struct = STRUCT([surface,cube]);
    return struct;
  }

  function putColOnBase(colonne) {
    var col = creaColonnina();
    var cols = [];
    cols.push(T([0,2])([0.03,0.03])(col));
    for(i=1; i<colonne; i++) {
      var col_i = T([0,1,2])([0.03,-0.1*i,0.22*i])(col);
      cols.push(col_i);
    }
    return STRUCT(cols);
  }

  function putColOnFlatBase(colonne) {
    var col = creaColonnina();
    var cols = [];
    cols.push(T([0,2])([0.03,0.03])(col));
    for(i=1; i<colonne; i++) {
      var col_i = T([0,2])([0.03,0.22*i])(col);
      cols.push(col_i);
    }
    return STRUCT(cols);
  }

  function drawBaseScala() {    //base lunga e in discesa
    var knots = [0,0,0,1,2,3,4,5,6,7,8,8,8];

    var points1 = creaPuntiBaseScala(0,0.2);
    var points2 = creaPuntiBaseScala(-0.9,2);

    var curve1 = NUBS(S0)(2)(knots)(points1);
    var curve2 = NUBS(S0)(2)(knots)(points2);

    var sup = BEZIER(S1)([curve1,curve2]);
    sup = MAP(sup)(domain);

    var controlpoints = [[0.02,-0.1,0.2],[0.2,-0.1,0.2]];
    var curveMapping = BEZIER(S0)(controlpoints);

    var controlpoints2 = [[0.02,-1,2],[0.2,-1,2]];
    var curveMapping2 = BEZIER(S0)(controlpoints2);
    var s12 = BEZIER(S1)([curveMapping,curveMapping2]);
    var sup2 = MAP(s12)(domain);

    var cube = CUBOID([0.22,0.2,0.2]);
    cube = T([1])([-0.1])(cube);
    var cube1 = T([1,2])([-0.9,1.98])(cube);

    var colonnine = putColOnBase(10);
    var base = STRUCT([sup,sup2,cube,cube1]);
    var baseSup = T([1])([0.6])(base);

    var cube2 = CUBOID([0.16,0.5,0.16]);
    cube2 = T([0,1,2])([0.03, 0.01, 0.02])(cube2);
    var cube3 = T([1,2])([-0.9,1.96])(cube2);
    var struct = STRUCT([base, baseSup, colonnine, cube2, cube3]);
    return struct;
  }

  function assemblaScala1() {
    var scalinataFrontale = drawScalinata(10, 7.1);
    var baseScala = drawBaseScala();
    baseScala = T([0,1])([3.75,1])(baseScala);
    var baseScala2 = T([0])([7.3])(baseScala);
    var points = [[3.77,0,0.2],[3.77,0,2],[3.77,0.9,0.2]];
    var triStrip = TRIANGLE_STRIP(points);
    var points1 = [[3.75+7.5,0,0.2],[3.75+7.5,0,2],[3.75+7.5,0.9,0.2]];
    var triStrip1 = TRIANGLE_STRIP(points1);
    var struct = STRUCT([scalinataFrontale, baseScala, baseScala2, triStrip, triStrip1]);
    return white(struct);
  }

  function drawBaseScala2() {   //base corta e in discesa
    var knots = [0,0,0,1,2,3,4,5,6,7,8,8,8];

    var points1 = creaPuntiBaseScala(0,0.2);
    var points2 = creaPuntiBaseScala(-0.5,1.1);

    var curve1 = NUBS(S0)(2)(knots)(points1);
    var curve2 = NUBS(S0)(2)(knots)(points2);

    var sup = BEZIER(S1)([curve1,curve2]);
    sup = MAP(sup)(domain);

    var controlpoints = [[0.02,-0.1,0.2],[0.2,-0.1,0.2]];
    var curveMapping = BEZIER(S0)(controlpoints);

    var controlpoints2 = [[0.02,-0.6,1.1],[0.2,-0.6,1.1]];
    var curveMapping2 = BEZIER(S0)(controlpoints2);
    var s12 = BEZIER(S1)([curveMapping,curveMapping2]);
    var sup2 = MAP(s12)(domain);

    var cube = CUBOID([0.22,0.2,0.2]);
    var cube1 = T([1])([-0.1])(cube);
    cube = CUBOID([0.22,0.2,0.01]);
    var cube2 = T([1,2])([-0.6,1.1])(cube);

    var colonnine = putColOnBase(5);
    var base = STRUCT([sup,sup2,cube1,cube2]);
    var baseSup = T([1])([0.6])(base);
    var struct = STRUCT([base, baseSup, colonnine]);
    return struct;
  }

  function assemblaScala2() {
    var scalinataFrontale = drawScalinata(5, 7.1);
    var baseScala = drawBaseScala2();
    baseScala = T([0,1])([3.75,1])(baseScala);
    var baseScala2 = T([0])([7.3])(baseScala);
    var points = [[3.77,0.4,0.2],[3.77,0.4,1.2],[3.77,0.9,0.2]];
    var triStrip = TRIANGLE_STRIP(points);
    var points1 = [[3.75+7.5,0.4,0.2],[3.75+7.5,0.4,1.2],[3.75+7.5,0.9,0.2]];
    var triStrip1 = TRIANGLE_STRIP(points1);
    var struct = STRUCT([scalinataFrontale, baseScala, baseScala2, triStrip, triStrip1]);
    struct = T([1,2])([-1,5.18])(struct);
    return white(struct);
  }

  function creaCorrimano1() {
    var knots = [0,0,0,1,2,3,4,5,6,7,8,8,8];

    var points1 = creaPuntiBaseScala(0,0);
    var points2 = creaPuntiBaseScala(0,1.25);

    var curve1 = NUBS(S0)(2)(knots)(points1);
    var curve2 = NUBS(S0)(2)(knots)(points2);

    var sup = BEZIER(S1)([curve1,curve2]);
    sup = MAP(sup)(domain);

    var controlpoints = [[0.02,-0.1,0],[0.2,-0.1,0]];
    var curveMapping = BEZIER(S0)(controlpoints);

    var controlpoints2 = [[0.02,-0.1,1.25],[0.2,-0.1,1.25]];
    var curveMapping2 = BEZIER(S0)(controlpoints2);
    var s12 = BEZIER(S1)([curveMapping,curveMapping2]);
    var sup2 = MAP(s12)(domain);

    var cube = CUBOID([0.2,0.2,0.2]);
    var cube1 = T([1])([-0.1])(cube);
    var cube2 = T([1,2])([-0.1,1.1])(CUBOID([0.2,0.8,0.2]));

    var colonnine = putColOnFlatBase(5);
    var base = STRUCT([sup,sup2,cube1]);
    var baseSup = T([1])([0.6])(base);
    var struct = STRUCT([base, baseSup, colonnine, cube2]);
    struct = R([0,2])(-PI/2)(struct);
    return white(struct);
  }

  function drawCorrimani1() {
    var corrimanoSX = creaCorrimano1();
    corrimanoSX = T([0,2])([3.75, 5.18])(corrimanoSX);
    var corrimanoDX = R([0,2])(PI)(creaCorrimano1());
    corrimanoDX = T([0,2])([3.75+7.5, 5.38])(corrimanoDX);
    var corrimanoSX1 = T([0,2])([-1.05, -1.52])(corrimanoSX)
    var corrimanoDX1 = T([0,2])([1.05, -1.52])(corrimanoDX)
    var corrimanoSX2 = R([0,2])(-PI/2)(creaCorrimano1());
    corrimanoSX2 = T([0,2])([2.7, 5.18])(corrimanoSX2);
    var corrimanoDX2 = T([0])([9.8])(corrimanoSX2);
    var corrimanoSX3 = T([0,1,2])([1.26, -0.5, 2.42])(corrimanoSX2);
    var corrimanoDX3 = T([0])([7.3])(corrimanoSX3);
    var corrimanoSXL = drawCorrimanoLungo();
    corrimanoSXL = R([0,2])(-PI/2)(corrimanoSXL);
    var corrimanoDXL = S([0])([-1])(corrimanoSXL);
    corrimanoSXL = T([0,1,2])([1.5,0.1,1.98])(corrimanoSXL);
    corrimanoDXL = T([0,1,2])([13.5,0.1,1.98])(corrimanoDXL);
    var struct = STRUCT([corrimanoSX, corrimanoDX, corrimanoSX1, corrimanoDX1, 
      corrimanoSX2, corrimanoDX2, corrimanoSX3, corrimanoDX3, corrimanoSXL, corrimanoDXL
    ]);
    return struct;
  }

  function drawBaseScalaLat() {    //base lunga e in discesa
    var knots = [0,0,0,1,2,3,4,5,6,7,8,8,8];

    var points1 = creaPuntiBaseScala(0,0.2);
    var points2 = creaPuntiBaseScala(-1.3,2.82);

    var curve1 = NUBS(S0)(2)(knots)(points1);
    var curve2 = NUBS(S0)(2)(knots)(points2);

    var sup = BEZIER(S1)([curve1,curve2]);
    sup = MAP(sup)(domain);

    var controlpoints = [[0.02,-0.1,0.2],[0.2,-0.1,0.2]];
    var curveMapping = BEZIER(S0)(controlpoints);

    var controlpoints2 = [[0.02,-1.4,2.82],[0.2,-1.4,2.82]];
    var curveMapping2 = BEZIER(S0)(controlpoints2);
    var s12 = BEZIER(S1)([curveMapping,curveMapping2]);
    var sup2 = MAP(s12)(domain);

    var cube = CUBOID([0.22,0.2,0.2]);
    cube = T([1])([-0.1])(cube);
    var cube1 = T([1,2])([-1.3,2.8])(cube);

    var colonnine = putColOnBase(13);
    var base = STRUCT([sup,sup2,cube,cube1]);
    var baseSup = T([1])([0.6])(base);

    var cube2 = CUBOID([0.16,0.5,0.16]);
    cube2 = T([0,1,2])([0.03, 0.01, 0.02])(cube2);
    var cube3 = T([1,2])([-1.3,2.8])(cube2);
    var cube4 = CUBOID([0.18,0.6,0.17]);
    cube4 = T([0,1,2])([0.02,-0.4,0.89])(cube4);
    var cube5 = T([1,2])([-0.4,0.865])(cube4);
    var struct = STRUCT([base, baseSup, colonnine, cube2, cube3, cube4, cube5]);
    return struct;
  }

  function drawCorrimanoLungo() {
    var knots = [0,0,0,1,2,3,4,5,6,7,8,8,8];

    var points1 = creaPuntiBaseScala(0,0.2);
    var points2 = creaPuntiBaseScala(0,2.82);

    var curve1 = NUBS(S0)(2)(knots)(points1);
    var curve2 = NUBS(S0)(2)(knots)(points2);

    var sup = BEZIER(S1)([curve1,curve2]);
    sup = MAP(sup)(domain);

    var controlpoints = [[0.02,-0.1,0.2],[0.2,-0.1,0.2]];
    var curveMapping = BEZIER(S0)(controlpoints);

    var controlpoints2 = [[0.02,-0.1,2.82],[0.2,-0.1,2.82]];
    var curveMapping2 = BEZIER(S0)(controlpoints2);
    var s12 = BEZIER(S1)([curveMapping,curveMapping2]);
    var sup2 = MAP(s12)(domain);

    var cube = CUBOID([0.22,0.2,0.2]);
    cube = T([1])([-0.1])(cube);
    var cube1 = T([2])([2.8])(cube);

    var colonnine = putColOnFlatBase(13);
    var base = STRUCT([sup,sup2,cube,cube1]);
    var baseSup = T([1])([0.6])(base);

    var cube2 = CUBOID([0.16,0.5,0.16]);
    cube2 = T([0,1,2])([0.03, 0.01, 0.02])(cube2);
    var cube3 = T([2])([2.8])(cube2);
    var cube4 = CUBOID([0.18,0.6,0.17]);
    cube4 = T([0,2])([0.02,0.89])(cube4);
    var cube5 = T([2])([0.865])(cube4);
    var struct = STRUCT([base, baseSup, colonnine, cube2, cube3, cube4, cube5]);
    return struct;
  }

  function assemblaScalaLaterale() {
    var scalinataFrontale = drawScalinata(14, 1.5);
    var baseScala = drawBaseScalaLat();
    var 
    baseScala = T([0,1])([3.75+1.7,1])(baseScala);
    var points = [[5.65,-0.4,0.2],[5.65,-0.4,2.82],[5.65,0.9,0.2]];
    var strip = TRIANGLE_STRIP(points);
    var struct = STRUCT([scalinataFrontale, baseScala, strip]);
    struct = R([0,2])(-PI/2)(struct);
    struct = T([0,1,2])([1.5,-1,-1.8])(struct);
    return white(struct);
  }

  function creaPavimenti() {
    var base1 = CUBOID([12,0.2,1.5]);
    base1 = T([0,1,2])([1.5,-0.2,2.18])(base1);
    var base2 = CUBOID([9.6,0.2,1.5]);
    base2 = T([0,1,2])([2.7,-0.2,2.18+1.5])(base2);
    var base3 = CUBOID([7.1,0.2,1.4]);
    base3 = T([0,1,2])([3.95, -0.7, 2.18+1.5+2.6])(base3);
    var base4 = CUBOID([18,0.2,2.18]);
    base4 = T([0,1])([-1.5,-0.2])(base4);
    var struct = STRUCT([base1,base2, base3, base4]);
    return white(struct);
  }

  function creaMuriFrontali() {
    var muro1 = CUBOID([18,1.2,0.2]);
    muro1 = T([0,1,2])([-1.5,-1.4,1.98])(muro1);
    var muro2 = CUBOID([0.2,0.9,2.42]);
    muro2 = T([0,1,2])([3.77,-1.5,2.18+3.2])(muro2);
    var muro3 = T([0])([7.28])(muro2);
    var muro4_1 = CUBOID([0.55,1.4,0.2]);
    muro4_1 = T([0,1,2])([2.48,-1.5,5.18])(muro4_1);
    var muro4_2 = CUBOID([0.2,0.65,0.2]);
    muro4_2 = T([0,1,2])([2.48+0.55,-1.5,5.18])(muro4_2);
    var muro4_3 = CUBOID([0.2,0.45,0.2]);
    muro4_3 = T([0,1,2])([2.48+0.55,-1.5+0.95,5.18])(muro4_3);
    var muro4_4 = CUBOID([0.55,1.4,0.2]);
    muro4_4 = T([0,1,2])([2.48+0.55+0.2,-1.5,5.18])(muro4_4);
    var muro4 = STRUCT([muro4_1, muro4_2, muro4_3, muro4_4]);
    var muro5 = T([0])([8.74])(muro4);
    var muro6 = CUBOID([0.2,1.4,1.3]);
    muro6 = T([0,1,2])([2.48,-1.5,5.18-1.3])(muro6);
    var muro7 = CUBOID([0.2,1.4,1.3]);
    muro7 = T([0,1,2])([2.48+8.74+1.1,-1.5,5.18-1.3])(muro7);
    var muro8 = CUBOID([0.2,1.2,1.98]);
    muro8 = T([0,1])([-1.5,-1.4])(muro8);
    var muro9 = CUBOID([0.2,1.2,1.98]);
    muro9 = T([0,1])([16.3,-1.4])(muro9);
    var struct = STRUCT([muro1, muro2, muro3, muro4, muro5, muro6, muro7, muro8, muro9]);
    return white(struct);
  }

  function creaGrataFrontale() {
    var cube1 = CUBOID([0.2,1.3,1]);
    cube1 = T([0,2])([-0.2,-0.9])(cube1);
    var cube2 = T([0])([1.4])(cube1);
    var cube3 = CUBOID([0.02,1.3,0.02]);
    var cube4 = T([0])([0.58])(cube3);
    var cube5 = CUBOID([0.56,0.02,0.02]);
    cube5 = T([0])([0.02])(cube5);
    var cube6 = T([1])([1.28])(cube5);

    var cilindro1 = CYL_SURFACE([0.01,1.26])();
    cilindro1 = R([1,2])(-PI/2)(cilindro1);
    cilindro1 = T([0,1])([0.14,0.02])(cilindro1);
    var cilindro2 = T([0])([0.14])(cilindro1);
    var cilindro3 = T([0])([0.28])(cilindro1);
    
    var cilindro4 = CYL_SURFACE([0.01,0.56])();
    cilindro4 = R([0,2])(PI/2)(cilindro4);
    cilindro4 = T([0,1])([0.02, 0.15])(cilindro4);
    var cilindro5 = T([1])([0.425])(cilindro4);
    var cilindro6 = T([1])([0.575])(cilindro4); 
    var cilindro7 = T([1])([1])(cilindro4); 

    var struct = STRUCT([cube3, cube4, cube5, cube6]);
    var grata = STRUCT([cilindro1, cilindro2, cilindro3, cilindro4, cilindro5, cilindro6, cilindro7]);
    grata = T([2])([0.01])(grata);
    var grata1 = STRUCT([grey(struct), grey(grata)]);
    var grata2 = R([0,2])(-3*PI/5)(grata1);
    grata2 = T([0])([1.2])(grata2);
    var struct = STRUCT([white(cube1), white(cube2), grata1, grata2]);
    return struct;
  }

  function creaGrataInterna() {
    var cilindro1 = drawCylinderPieno(0.01,1.7,10);
    cilindro1 = R([1,2])(-PI/2)(cilindro1);
    var cilindro2 = drawCylinderPieno(0.01,0.1,10);
    cilindro2 = T([1,2])([0.01,-0.1])(cilindro2);
    var cilindro3 = T([1])([1.68])(cilindro2);
    var verticale = STRUCT([cilindro1, cilindro2, cilindro3]);

    var cilindro4 = drawCylinderPieno(0.01,1.2,10);
    cilindro4 = R([0,2])(-PI/2)(cilindro4);
    var cilindro5 = drawCylinderPieno(0.01,0.1,10);
    cilindro5 = T([0,2])([-0.01,-0.1])(cilindro5);
    var cilindro6 = T([0])([-1.18])(cilindro5);
    var orizzontale = STRUCT([cilindro4, cilindro5, cilindro6]);
    orizzontale = T([0,1])([1.1,0.1])(orizzontale);
    var verticali = [];
    var orizzontali = [];
    for(i=0;i<7;i++) {
      verticali.push(T([0])([0.165*i])(verticale));
    }
    for(i=0;i<13;i++) {
      orizzontali.push(T([1])([0.125*i])(orizzontale));
    }
    verticali = STRUCT(verticali);
    orizzontali = STRUCT(orizzontali);

    var struct = STRUCT([orizzontali, verticali]);
    return black(struct);
  }

  function drawGrataPiccola() {
    var cilindro1 = CYL_SURFACE([0.01,0.4])();
    cilindro1 = R([1,2])(-PI/2)(cilindro1);
    var cilindro2 = CYL_SURFACE([0.01,0.3])();
    cilindro2 = R([0,2])(PI/2)(cilindro2);
    cilindro2 = T([0,1])([-0.1,0.15])(cilindro2);
    var struct = STRUCT([cilindro1, cilindro2]);
    struct = T([0,1,2])([3.125,-0.85,5.3])(struct);
    var struct2 = T([0])([8.75])(struct);
    struct = STRUCT([struct, struct2]);
    return grey(struct);
  }

  function creaFinestraGrande() {
    var cubo = CUBOID([0.5,1.5,0.1]);
    var cilindro = CYL_SURFACE([0.025,0.05])();
    cilindro = R([1,2])(-PI/2)(cilindro);
    cilindro = T([1,2])([0.09,0.05])(cilindro);
    var cilindro1 = T([1])([0.65])(cilindro);
    var cilindro2 = T([1])([0.65])(cilindro1);
    var struct = STRUCT([cubo, cilindro, cilindro1, cilindro2]);
    return green(struct);
  }

  function creaFinestraPiccola() {
    var cubo = CUBOID([0.5,0.6,0.1]);
    var cilindro = CYL_SURFACE([0.025,0.05])();
    cilindro = R([1,2])(-PI/2)(cilindro);
    cilindro = T([1,2])([0.09,0.05])(cilindro);
    var cilindro1 = T([1])([0.3])(cilindro);
    var struct = STRUCT([cubo, cilindro, cilindro1]);
    return green(struct);
  }

  function posizionaFinestreFrontali() {
    var finestraG1_1 = creaFinestraGrande();
    var finestraG1_2 = creaFinestraGrande();
    finestraG1_1 = R([0,2])(-4*PI/5)(finestraG1_1);
    finestraG1_1 = T([0,1,2])([1.5,1.7,0.25])(finestraG1_1);
    finestraG1_2 = R([0,2])(-3*PI/5)(finestraG1_2);
    finestraG1_2 = T([0,1,2])([2.6,1.7,0.25])(finestraG1_2);
    var finestraG1 = STRUCT([finestraG1_1,finestraG1_2]);

    var finestraG2_1 = creaFinestraGrande();
    var finestraG2_2 = creaFinestraGrande();
    finestraG2_1 = R([0,2])(-PI)(finestraG2_1);
    finestraG2_1 = T([0,1,2])([12.5,1.7,0.3])(finestraG2_1);
    finestraG2_2 = R([0,2])(-1*PI/5)(finestraG2_2);
    finestraG2_2 = T([0,1,2])([13.5,1.7,0.2])(finestraG2_2);
    var finestraG2 = STRUCT([finestraG2_1,finestraG2_2]);

    var finestraP1_1 = creaFinestraPiccola();
    var finestraP1_2 = creaFinestraPiccola();
    finestraP1_1 = T([0,1,2])([1.5,4.8,0.15])(finestraP1_1);
    finestraP1_2 = R([0,2])(PI)(finestraP1_2);
    finestraP1_2 = T([0,1,2])([2.5,4.8,0.25])(finestraP1_2);
    var finestraP1 = STRUCT([finestraP1_1,finestraP1_2]);
    var finestraP2 = T([0])([11])(finestraP1);

    var struct = STRUCT([finestraG1, finestraG2, finestraP1, finestraP2]);
    return struct;
  }

  function drawStrutturaFinestre() {
    var verticaleGrande = CUBOID([0.05, 1.4, 0.1]);
    verticaleGrande = T([1])([0.05])(verticaleGrande);
    var verticaleGrande1 = T([0])([0.45])(verticaleGrande);
    var verticaleGrande2 = T([0])([0.5])(verticaleGrande);
    var verticaleGrande3 = T([0])([0.95])(verticaleGrande);
    var orizzontaleGrande = CUBOID([1, 0.05, 0.1]);
    var orizzontaleGrande1 = T([1])([1.45])(orizzontaleGrande);
    var orizzontale1 = CUBOID([0.4, 0.05, 0.1]);
    orizzontale1 = T([0,1])([0.05, 1.05])(orizzontale1);
    var orizzontale2 = T([0])([0.5])(orizzontale1);
    var grande = STRUCT([verticaleGrande, verticaleGrande1, verticaleGrande2, verticaleGrande3, 
      orizzontaleGrande, orizzontaleGrande1, orizzontale1, orizzontale2]
    );
    var vetroGrande = BOUNDARY(CUBOID([1, 1.5, 0.05]));
    vetroGrande = T([2])([-0.05])(vetroGrande);
    var finestraGrande = STRUCT([brown(grande), glass(vetroGrande)]);
    finestraGrande = T([0,1,2])([1.5, 1.7, 0.1])(finestraGrande);
    var finestraGrande2 = T([0])([11])(finestraGrande);
    var finestraGrande3 = T([0,1,2])([2.25+0.5,0.5,-2.75])(finestraGrande);
    var finestraGrande4 = T([0,1,2])([2.25+3.05+1.4+1.55,0.5,-2.75])(finestraGrande);
    var struct = STRUCT([finestraGrande, finestraGrande2, finestraGrande3, finestraGrande4]);
    return struct;
  }

  //QUì C'è ANCHE IL SOFFITTO DI LEGNO
  function drawPorteFrontali() {
    var portaLaterale = CUBOID([0.1, 1.4, 0.7]);
    var cornice1 = CUBOID([0.02, 0.1, 0.7]);
    cornice1 = T([0])([0.1])(cornice1);
    var cornice2 = T([1])([1.3])(cornice1);
    var cornice3 = CUBOID([0.02, 1.2, 0.1]);
    cornice3 = T([0,1])([0.1,0.1])(cornice3);
    var cornice4 = T([2])([0.6])(cornice3);
    var cornice5 = T([2])([0.25])(cornice3);
    var cornice6 = T([2])([0.35])(cornice3);
    var maniglia = CUBOID([0.01, 0.1, 0.05]);
    maniglia = T([0,1,2])([0.12,0.65,0.3])(maniglia);
    var portaLaterale = brown(STRUCT([portaLaterale, cornice1, cornice2, cornice3, cornice4, cornice5, cornice6]));
    portaLaterale = STRUCT([portaLaterale, black(maniglia)]);
    var portaLaterale2 = R([0,2])(PI)(portaLaterale);
    portaLaterale = T([0,1,2])([3.6,1,-1.7])(portaLaterale);
    var soffitto = T([0,1,2])([3.75,5.3,-2.5])(SIMPLEX_GRID([[7.5],[0.2],[2.5]]));
    soffitto = brown(soffitto);
    portaLaterale2 = T([0,1,2])([3.6+7.8,1,-1])(portaLaterale2);
    var portaFrontale = CUBOID([1.4, 2.7, 0.1]);
    portaFrontale = T([2])([-0.1])(portaFrontale);
    var pezzoVerticale = CUBOID([0.1,2.7,0.05]);
    var pezzoVerticale1 = T([0])([1.3])(pezzoVerticale);
    var pezzoVerticale2 = T([0])([0.6])(pezzoVerticale);
    var pezzoVerticale3 = T([0])([0.7])(pezzoVerticale);
    var pezzoOrizzontaleSX = CUBOID([0.5, 0.1, 0.05]);
    pezzoOrizzontaleSX = T([0])([0.1])(pezzoOrizzontaleSX);
    var pezzoOrizzontaleDX = T([0])([0.7])(pezzoOrizzontaleSX);
    var pezzoOrizzontaleSX_1 = T([1])([2.6])(pezzoOrizzontaleSX);
    var pezzoOrizzontaleSX_2 = T([1])([0.85])(pezzoOrizzontaleSX);
    var pezzoOrizzontaleSX_3 = T([1])([1.7])(pezzoOrizzontaleSX);
    var pezzoOrizzontaleDX_1 = T([1])([2.6])(pezzoOrizzontaleDX);
    var pezzoOrizzontaleDX_2 = T([1])([0.85])(pezzoOrizzontaleDX);
    var pezzoOrizzontaleDX_3 = T([1])([1.7])(pezzoOrizzontaleDX);
    var portaFrontale = STRUCT([portaFrontale, pezzoVerticale, pezzoVerticale1, pezzoVerticale2, pezzoVerticale3,
      pezzoOrizzontaleSX, pezzoOrizzontaleSX_1, pezzoOrizzontaleSX_2, pezzoOrizzontaleSX_3,
      pezzoOrizzontaleDX, pezzoOrizzontaleDX_1, pezzoOrizzontaleDX_2, pezzoOrizzontaleDX_3]
    );
    var portaFrontale = T([0,1,2])([6.8, 1, -2.6])(portaFrontale);
    portaFrontale = brown(portaFrontale);
    var cube1 = CUBOID([0.2, 2.7, 0.1]);
    cube1 = T([0,1,2])([6.6, 1, -2.5])(cube1);
    var cube2 = T([0])([1.6])(cube1);
    var cube3 = CUBOID([1.8, 0.2, 0.1]);
    cube3 = T([0,1,2])([6.6, 3.7, -2.5])(cube3);

    var domain = DOMAIN([[0,1],[0,1]])([50,1]); 
    var knots = [0,0,0,1,2,3,4,5,6,7,8,9,9,9];
    var points1 = [[0,0,0],[-0.05,0,0.15],[-0.05,0,0.2],[-0.05,0.15,0.2],[0,0.15,0.15],[-0.1,0.4,0.2],[-0.15,0.35,0.3],[-0.2,0.65,0.4],[-0.2,0.6,0],[-0.15,0.55,0],[0,0,0]];
    var points2 = [[1.8,0,0],[1.8+0.05,0,0.15],[1.8+0.05,0,0.2],[1.8+0.05,0.15,0.2],[1.8,0.15,0.15],[1.8+0.1,0.4,0.2],[1.8+0.15,0.35,0.3],[1.8+0.2,0.65,0.4],[1.8+0.2,0.6,0],[1.8+0.15,0.55,0],[1.8,0,0]];

    var curve1 = NUBS(S0)(2)(knots)(points1);
    var curve2 = NUBS(S0)(2)(knots)(points2);
    var p1 = [[-0.1,0.35,0]];
    var p2 = [[1.8+0.1,0.35,0]];
    var sup3 = BEZIER(S1)([curve1,curve2]);
    sup3 = MAP(sup3)(domain);

    var c1 = BEZIER(S0)(p1);
    var curve3 = BEZIER(S1)([curve1,c1]);
    var surface1 = MAP(curve3)(domain);

    var c2 = BEZIER(S0)(p2);
    var curve4 = BEZIER(S1)([curve2,c2]);
    var surface2 = MAP(curve4)(domain);

    var superfice = STRUCT([sup3, surface1, surface2]);
    superfice = T([0,1,2])([6.6, 3.9, -2.5])(superfice);
    var cornice = STRUCT([cube1, cube2, cube3, superfice]);
    var struct = STRUCT([portaLaterale, soffitto, portaLaterale2, portaFrontale, white(cornice)]);
    return struct;
  }

  function creaPilastri() {
    var knots = [0,0,0,1,2,3,4,5,6,7,8,9,10,10,10];
    var points = [[0,0,0],[-0.21,0,0],[-0.25,0,0],[-0.25,0,0.04],[-0.21,0,0.04],[-0.21,0,0.08],
      [-0.23,0,0.08],[-0.23,0,0.12],[-0.19,0,0.12],[-0.19,0,3.8],[-0.17,0,3.8],[0,0,3.8]
    ];
    var profile = NUBS(S0)(2)(knots)(points);
    var mapping = ROTATIONAL_SURFACE(profile);
    var surface = MAP(mapping)(domainPI);
    var cube = CUBOID([0.5,0.1,0.5]);
    surface = R([1,2])(-PI/2)(surface);
    surface = T([0,1,2])([0.25,0.1,0.25])(surface)

    var domain = DOMAIN([[0,1],[0,1]])([30,10]); 
    var knots = [0,0,0,1,2,3,4,5,6,7,8,9,10,10,10];
    var points1 = [[0,0,0],[-0.15,0,0],[-0.15,-0.1,0],[-0.3,-0.1,0],[-0.3,0.05,0],[-0.2,0.1,0],[0.2,0.1,0],[0.3,0.05,0],[0.3,-0.1,0],[0.15,-0.1,0],[0.15,0,0],[0,0,0]];
    var points2 = [[0,0,0.5],[-0.15,0,0.5],[-0.15,-0.1,0.5],[-0.3,-0.1,0.5],[-0.3,0.05,0.5],[-0.2,0.1,0.5],[0.2,0.1,0.5],[0.3,0.05,0.5],[0.3,-0.1,0.5],[0.15,-0.1,0.5],[0.15,0,0.5],[0,0,0.5]];
    var points3 = [[0,0,0.25],[-0.05,0,0.25],[-0.05,-0.05,0.25],[-0.2,-0.05,0.25],[-0.2,0.05,0.25],[-0.1,0.1,0.25],[0.1,0.1,0.25],[0.2,0.05,0.25],[0.2,-0.05,0.25],[0.05,-0.05,0.25],[0.05,0,0.25],[0,0,0.25]];

    var curve1 = NUBS(S0)(2)(knots)(points1);
    var curve2 = NUBS(S0)(2)(knots)(points2);
    var curve5 = NUBS(S0)(2)(knots)(points3);
    var p1 = [[0,0.1,0]];
    var p2 = [[0,0.1,0.5]];
    var sup3 = BEZIER(S1)([curve1,curve5,curve2]);
    sup3 = MAP(sup3)(domain);

    var c1 = BEZIER(S0)(p1);
    var curve3 = BEZIER(S1)([curve1,c1]);
    var surface1 = MAP(curve3)(domain);
    var c2 = BEZIER(S0)(p2);
    var curve4 = BEZIER(S1)([curve2,c2]);
    var surface2 = MAP(curve4)(domain);
    var cubeSup = CUBOID([0.54,0.05,0.54]);
    cubeSup = T([0,1,2])([-0.27,0.08,-0.02])(cubeSup);
    var capitello = STRUCT([sup3,surface1, surface2, cubeSup]);
    capitello = T([0,1])([0.25,3.87])(capitello);
    var struct = STRUCT([wall(surface),white(cube),white(capitello)]);
    return struct;
  }

  function drawPilastri() {
    var pilastro1 = creaPilastri();
    pilastro1 = T([0,1,2])([4,1,-0.2])(pilastro1);
    var pilastro2 = creaPilastri();
    pilastro2 = T([0,1,2])([4+1.3,1,-0.2])(pilastro2);
    var pilastro3 = creaPilastri();
    pilastro3 = T([0,1,2])([4+2.6,1,-0.2])(pilastro3);
    var pilastro4 = creaPilastri();
    pilastro4 = T([0,1,2])([4+3.9,1,-0.2])(pilastro4);
    var pilastro5 = creaPilastri();
    pilastro5 = T([0,1,2])([4+5.2,1,-0.2])(pilastro5);
    var pilastro6 = creaPilastri();
    pilastro6 = T([0,1,2])([4+6.5,1,-0.2])(pilastro6);
    var struct = STRUCT([pilastro1, pilastro2, pilastro3, pilastro4, pilastro5, pilastro6]);
    return struct;
  }

  function assemblaGrate() {
    var grata1 = creaStrutturaConGrata();
    grata1 = T([0,1,2])([1.5,0.5,0])(grata1);
    var grata2 = T([0])([11])(grata1);
    var struct = STRUCT([grata1, grata2]);
    return struct;
  }

  var front = drawFacciaFrontale();
  var mosaico = drawMosaicoInterno();
  var scala1 = assemblaScala1();
  var scala2 = assemblaScala2();
  var scala3 = T([1,2])([-1.5,7.6])(assemblaScala1());
  var scala4 = assemblaScalaLaterale();
  var scala5 = T([0])([15])(S([0])([-1])(assemblaScalaLaterale()));
  var pavimenti = creaPavimenti();
  var finestreFrontali = posizionaFinestreFrontali();
  var strutturaFinestre = drawStrutturaFinestre();
  var porte = drawPorteFrontali();
  var corrimano1 = drawCorrimani1();
  var muri = creaMuriFrontali();
  var pilastri = drawPilastri();
  var grata1 = creaGrataFrontale();
  grata1 = T([0,1,2])([1.3,-1.4,3.749])(grata1);
  var grata2 = T([0])([11.2])(grata1);
  var gratePiccole = drawGrataPiccola();
  var grateFinestre = assemblaGrate();
  var grataInterna1 = creaGrataInterna();
  grataInterna1 = T([0,1,2])([3.75+0.5,2.11,-2.4])(grataInterna1);
  var grataInterna2 = T([0])([3+1.4+1.1])(grataInterna1);

  //ASSEMBLAGGIO FRONTALE
  var frontal = STRUCT([front, mosaico, scala1, scala2, scala3, scala4, scala5, 
    pavimenti, finestreFrontali, porte, strutturaFinestre, corrimano1, muri, 
    pilastri, grata1, grata2, gratePiccole, grateFinestre, grataInterna1, grataInterna2
  ]); 

  //-------------------------------------------PARTE LATERALE--------------------------------------------
  function drawFacciaLaterale() {
    var muro1 = SIMPLEX_GRID([[0.2], [5.5], [1.5]]);
    var muro2_1 = SIMPLEX_GRID([[0.2],[0.4],[-1.5, 1]]);
    var muro2_2 = SIMPLEX_GRID([[0.2],[-1, 0.7],[-1.5, 1]]);
    var muro2_3 = SIMPLEX_GRID([[0.2],[-3.2, 1.6],[-1.5, 1]]);
    var muro2_4 = SIMPLEX_GRID([[0.2],[-5.4, 0.1],[-1.5, 1]]);
    var muro3 = SIMPLEX_GRID([[0.2],[5.5],[-2.5, 2]]);
    var muro4_1 = SIMPLEX_GRID([[0.2],[0.5],[-4.5, 1]]);
    var muro4_2 = SIMPLEX_GRID([[0.2],[-1, 0.7],[-4.5, 1]]);
    var muro4_3 = SIMPLEX_GRID([[0.2],[-3.2, 1.6],[-4.5, 1]]);
    var muro4_4 = SIMPLEX_GRID([[0.2],[-5.4, 0.1],[-4.5, 1]]);
    var muro5 = SIMPLEX_GRID([[0.2],[5.5],[-5.5, 2.5]]);
    var muro6_1 = SIMPLEX_GRID([[0.2],[0.5],[-8, 1]]);
    var muro6_2 = SIMPLEX_GRID([[0.2],[-1, 0.7],[-8, 1]]);
    var muro6_3 = SIMPLEX_GRID([[0.2],[-3.2, 1.6],[-8, 1]]);
    var muro6_4 = SIMPLEX_GRID([[0.2],[-5.4, 0.1],[-8, 1]]);
    var muro7 = SIMPLEX_GRID([[0.2],[5.5],[-9, 0.8]]);

    var struct = STRUCT([muro1, muro2_1, muro2_2, muro2_3, muro2_4, muro3, muro4_1, muro4_2, muro4_3, muro4_4,
      muro5, muro6_1, muro6_2, muro6_3, muro6_4, muro7]);
    struct = T([2])([-9.8])(struct);
    return wall(struct);
  }

  function posizionaFinestreSX() {
    var finestraG1 = R([0,2])(-PI/2)(creaFinestraGrande());
    var finestraG2 = R([0,2])(PI/2)(creaFinestraGrande());
    finestraG2 = T([0,2])([-0.1,1])(finestraG2);
    var finestraGrande1 = STRUCT([finestraG1, finestraG2]);
    finestraGrande1 = T([0,1,2])([0.05,1.7,-1.8])(finestraGrande1);
    var finestraP1 = R([0,2])(-PI/2)(creaFinestraPiccola());
    var finestraP2 = R([0,2])(PI/2)(creaFinestraPiccola());
    finestraP2 = T([0,2])([-0.1,1])(finestraP2);
    var finestraPiccola1 = STRUCT([finestraP1, finestraP2]);
    finestraPiccola1 = T([0,1,2])([0.05,4.8,-1.8])(finestraPiccola1);
    var finestraPiccola2 = T([2])([-3.5])(finestraPiccola1);
    var finestraGrande2 = T([2])([-3.5])(finestraGrande1);
    var finestraPiccola3 = T([2])([-6.5])(finestraPiccola1);
    var finestraGrande3 = T([2])([-6.5])(finestraGrande1);
    var struct = STRUCT([finestraGrande1, finestraPiccola1, finestraGrande2, finestraPiccola2,
      finestraGrande3, finestraPiccola3
    ]);
    return green(struct);
  }

  function drawComignoloGrande() {
    var controlpoints = [[0,2.4,-2.9],[-0.6,2.4,-2.9]];
    var curveMapping = BEZIER(S0)(controlpoints);
    var controlpoints2 = [[0,1.6,-2.5],[-0.6,1.6,-2.5]];
    var curveMapping2 = BEZIER(S0)(controlpoints2);
    var s12 = BEZIER(S1)([curveMapping,curveMapping2]);
    var sup = MAP(s12)(domain);

    controlpoints = [[0,2.4,-3.5],[-0.6,2.4,-3.5]];
    curveMapping = BEZIER(S0)(controlpoints);
    controlpoints2 = [[0,1.6,-4],[-0.6,1.6,-4]];
    curveMapping2 = BEZIER(S0)(controlpoints2);
    s12 = BEZIER(S1)([curveMapping,curveMapping2]);
    var sup2 = MAP(s12)(domain);

    var points = [[-0.6,1.6,-2.9],[-0.6,1.6,-2.5],[-0.6,2.4,-2.9]];
    var strip = TRIANGLE_STRIP(points);

    points = [[-0.6,1.6,-3.5],[-0.6,1.6,-4],[-0.6,2.4,-3.5]];
    var strip2 = TRIANGLE_STRIP(points);

    var cube1 = CUBOID([0.6, 1.6, 0.4]);
    cube1 = T([0,2])([-0.6,-2.9])(cube1);
    var cube2 = CUBOID([0.6, 1.6, 0.5]);
    cube2 = T([0,2])([-0.6,-4])(cube2);
    var cube3 = CUBOID([0.6, 6.5, 0.6]);
    
    var cube4 = CUBOID([0.64, 0.1, 0.64]);
    cube4 = T([0,2])([-0.02,-0.02])(cube4);
    cube5 = CUBOID([0.6, 0.2, 0.05]);
    cube5 = T([1])([0.1])(cube5);
    var cube6 = T([2])([0.55])(cube5);

    var cube7 = CUBOID([0.03, 0.2, 0.03]);
    cube7 = T([2])([0.075])(cube7);
    var cube8 = T([2])([0.06])(cube7);
    var cube9 = T([2])([0.12])(cube7);
    var cube10 = T([2])([0.18])(cube7);
    var cube11 = T([2])([0.24])(cube7);
    var cube12 = T([2])([0.3])(cube7);
    var cube13 = T([2])([0.36])(cube7);
    var cube14 = T([2])([0.42])(cube7);
    cube7 = STRUCT([cube7, cube8, cube9, cube10, cube11, cube12, cube13, cube14]);
    cube7 = T([1])([0.1])(cube7);
    var cube15 = T([0])([0.57])(cube7);

    var knots = [0,0,0,1,2,3,4,5,6,7,8,8,8];
    var points1 = [[0,0,0],[0,0,-0.3],[0,0,-0.32],[0,0.2,-0.32],[0,0.4,-0.15],[0,0.4,0.15],[0,0.2,0.32],[0,0,0.32],[0,0,0.3],[0,0,0]];
    var points2 = [[0.64,0,0],[0.64,0,-0.3],[0.64,0,-0.32],[0.64,0.2,-0.32],[0.64,0.4,-0.15],[0.64,0.4,0.15],[0.64,0.2,0.32],[0.64,0,0.32],[0.64,0,0.3],[0.64,0,0]];
    var curve1 = NUBS(S0)(2)(knots)(points1);
    var curve2 = NUBS(S0)(2)(knots)(points2);
    var p1 = [[0,0,0]];
    var p2 = [[0.64,0,0]];
    var sup3 = BEZIER(S1)([curve1,curve2]);
    sup3 = MAP(sup3)(domain);
    var c1 = BEZIER(S0)(p1);
    var curve3 = BEZIER(S1)([curve1,c1]);
    var surface1 = MAP(curve3)(domain);
    var c2 = BEZIER(S0)(p2);
    var curve4 = BEZIER(S1)([curve2,c2]);
    var surface2 = MAP(curve4)(domain);
    var mezzoCilindro = STRUCT([sup3, surface1, surface2]);
    mezzoCilindro = T([0,1,2])([-0.02,0.3,0.3])(mezzoCilindro);

    cube4 = STRUCT([cube4, cube5, cube6, cube7, cube15, mezzoCilindro]);
    cube4 = T([1])([6.5])(cube4);
    cube3 = STRUCT([cube3, cube4]);
    cube3 = T([0,2])([-0.6,-3.5])(cube3);

    var struct = STRUCT([sup, sup2, strip, strip2, cube1, cube2, cube3]);
    struct = T([2])([0.2])(struct);
    return wall(struct);
  }

  function drawComignoloPiccolo() {
    var controlpoints = [[0,1.7,-6.7],[-0.5,1.7,-6.7]];
    var curveMapping = BEZIER(S0)(controlpoints);
    var controlpoints2 = [[0,1.3,-6.5],[-0.5,1.3,-6.5]];
    var curveMapping2 = BEZIER(S0)(controlpoints2);
    var s12 = BEZIER(S1)([curveMapping,curveMapping2]);
    var sup = MAP(s12)(domain);

    controlpoints = [[0,1.7,-7.2],[-0.5,1.7,-7.2]];
    curveMapping = BEZIER(S0)(controlpoints);
    controlpoints2 = [[0,1.3,-7.5],[-0.5,1.3,-7.5]];
    curveMapping2 = BEZIER(S0)(controlpoints2);
    s12 = BEZIER(S1)([curveMapping,curveMapping2]);
    var sup2 = MAP(s12)(domain);

    var points = [[-0.5,1.3,-6.7],[-0.5,1.3,-6.5],[-0.5,1.7,-6.7]];
    var strip = TRIANGLE_STRIP(points);

    points = [[-0.5,1.3,-7.2],[-0.5,1.7,-7.2],[-0.5,1.3,-7.5]];
    var strip2 = TRIANGLE_STRIP(points);

    var cube1 = CUBOID([0.5, 1.3, 0.2]);
    cube1 = T([0,2])([-0.5,-6.7])(cube1);
    var cube2 = CUBOID([0.5, 1.3, 0.3]);
    cube2 = T([0,2])([-0.5,-7.5])(cube2);
    var cube3 = CUBOID([0.5, 6.5, 0.5]);

    var cube4 = CUBOID([0.54, 0.1, 0.54]);
    cube4 = T([0,2])([-0.02,-0.02])(cube4);
    cube5 = CUBOID([0.5, 0.2, 0.05]);
    cube5 = T([1])([0.1])(cube5);
    var cube6 = T([2])([0.45])(cube5);

    var cube7 = CUBOID([0.045, 0.2, 0.045]);
    cube7 = T([2])([0.09])(cube7);
    var cube8 = T([2])([0.09])(cube7);
    var cube9 = T([2])([0.18])(cube7);
    var cube10 = T([2])([0.27])(cube7);
    cube7 = STRUCT([cube7, cube8, cube9, cube10]);
    cube7 = T([1])([0.1])(cube7);
    var cube11 = T([0])([0.455])(cube7); 

    var knots = [0,0,0,1,2,3,4,5,6,7,8,8,8];
    var points1 = [[0,0,0],[0,0,-0.25],[0,0,-0.27],[0,0.2,-0.27],[0,0.35,-0.13],[0,0.35,0.13],[0,0.2,0.27],[0,0,0.27],[0,0,0.25],[0,0,0]];
    var points2 = [[0.54,0,0],[0.54,0,-0.25],[0.54,0,-0.27],[0.54,0.2,-0.27],[0.54,0.35,-0.13],[0.54,0.35,0.13],[0.54,0.2,0.27],[0.54,0,0.27],[0.54,0,0.25],[0.54,0,0]];
    var curve1 = NUBS(S0)(2)(knots)(points1);
    var curve2 = NUBS(S0)(2)(knots)(points2);
    var p1 = [[0,0,0]];
    var p2 = [[0.54,0,0]];
    var sup3 = BEZIER(S1)([curve1,curve2]);
    sup3 = MAP(sup3)(domain);
    var c1 = BEZIER(S0)(p1);
    var curve3 = BEZIER(S1)([curve1,c1]);
    var surface1 = MAP(curve3)(domain);
    var c2 = BEZIER(S0)(p2);
    var curve4 = BEZIER(S1)([curve2,c2]);
    var surface2 = MAP(curve4)(domain);
    var mezzoCilindro = STRUCT([sup3, surface1, surface2]);
    mezzoCilindro = T([0,1,2])([-0.02,0.3,0.25])(mezzoCilindro);

    cube4 = STRUCT([cube4, cube5, cube6, cube7, cube11, mezzoCilindro]);
    cube4 = T([1])([6.5])(cube4);
    cube3 = STRUCT([cube3, cube4]);
    cube3 = T([0,2])([-0.5,-7.2])(cube3);

    var struct = STRUCT([sup, sup2, strip, strip2, cube1, cube2, cube3]);
    struct = T([2])([0.2])(struct);
    return wall(struct);
  }

  function assemblaGrateLateral() {
    var grata1 = creaStrutturaConGrata();
    grata1 = R([0,2])(-PI/2)(grata1);
    grata1 = T([0,1,2])([0.2,0.5,-1.8])(grata1);
    var grata2 = T([2])([-3.5])(grata1);
    var grata3 = T([2])([-6.5])(grata1);
    grata3 = S([1])([1.2])(grata3);
    grata3 = T([1])([-0.2])(grata3);
    var struct = STRUCT([grata1, grata2, grata3]);
    return struct;
  }

  var lateral = drawFacciaLaterale();
  var finestre = posizionaFinestreSX();
  var comignoloGrande = drawComignoloGrande();
  var comignoloPiccolo = drawComignoloPiccolo();
  var grate = assemblaGrateLateral();

  //ASSEMBLAGGIO SINISTRO E DESTRO
  var left = STRUCT([lateral, finestre, grate]);
  var right = S([0])([-1])(left);
  left = STRUCT([left, comignoloGrande, comignoloPiccolo]);
  right = T([0])([15])(right);
  comignoloPiccolo = S([0])([-1])(comignoloPiccolo);
  comignoloPiccolo = T([0,2])([15,4])(comignoloPiccolo);
  right = STRUCT([right, comignoloPiccolo]);

  //-------------------------------------------BASE--------------------------------------------
  function drawBase() {
    var cube1 = CUBOID([18, 0.6, 11]);
    cube1 = T([0,1,2])([-1.5,-0.6,-11])(cube1);
    var cube2_1 = CUBOID([0.2, 0.6, 1]);
    cube2_1 = T([0,1,2])([-1.5,-0.6,-12])(cube2_1);
    var cube2_2 = CUBOID([15.6, 0.6, 1]);
    cube2_2 = T([0,1,2])([-0.3,-0.6,-12])(cube2_2);
    var cube2_3 = CUBOID([0.2, 0.6, 1]);
    cube2_3 = T([0,1,2])([16.3,-0.6,-12])(cube2_3);

    cube3 = CUBOID([21, 0.8, 12]);
    cube3 = T([0,1,2])([-3,-1.4,-12])(cube3);
    var cube4_1 = CUBOID([1.7, 0.8, 1]);
    cube4_1 = T([0,1,2])([-3,-1.4,-13])(cube4_1);
    var cube4_2 = CUBOID([15.6, 0.8, 1]);
    cube4_2 = T([0,1,2])([-0.3,-1.4,-13])(cube4_2);
    var cube4_3 = CUBOID([1.7, 0.8, 1]);
    cube4_3 = T([0,1,2])([16.3,-1.4,-13])(cube4_3);

    var scalino1 = CUBOID([1, 0.12, 0.2]);
    var scalino2 = T([1,2])([-0.12,-0.2])(CUBOID([1, 0.12, 0.4]));
    var scalino3 = T([1,2])([-0.24,-0.4])(CUBOID([1, 0.12, 0.6]));
    var scalino4 = T([1,2])([-0.36,-0.6])(CUBOID([1, 0.12, 0.8]));
    
    var scalinata1SX = STRUCT([scalino1, scalino2, scalino3, scalino4]);
    scalinata1SX = T([0,1,2])([-1.3,-0.24, -11.2])(scalinata1SX);
    var scalinata1DX = T([0])([16.6])(scalinata1SX);

    var scalino5 = CUBOID([1, 0.1, 0.25]);
    var scalino6 = T([1,2])([-0.1,-0.125])(CUBOID([1, 0.1, 0.375]));
    var scalino7 = T([1,2])([-0.2,-0.25])(CUBOID([1, 0.1, 0.5]));
    var scalino8 = T([1,2])([-0.3,-0.375])(CUBOID([1, 0.1, 0.625]));
    var scalino9 = T([1,2])([-0.4,-0.5])(CUBOID([1, 0.1, 0.75]));
    var scalino10 = T([1,2])([-0.5,-0.625])(CUBOID([1, 0.1, 0.875]));
    var scalino11 = T([1,2])([-0.6,-0.75])(CUBOID([1, 0.1, 1]));

    var scalinata2SX = STRUCT([scalino5, scalino6, scalino7, scalino8, scalino9, scalino10, scalino11]);
    scalinata2SX = T([0,1,2])([-1.3,-0.8, -12.25])(scalinata2SX);
    var scalinata2DX = T([0])([16.6])(scalinata2SX);

    var struct = STRUCT([cube1, cube2_1, cube2_2, cube2_3, cube3, cube4_1, cube4_2, cube4_3, 
      scalinata1SX, scalinata1DX, scalinata2SX, scalinata2DX
    ]);
    return redBase(struct);
  }

  function drawPavimenti() {
    var pavimento1 = CUBOID([14.6, 0.05, 9.6]);
    pavimento1 = T([0,2])([0.2,-9.6])(pavimento1);
    var pavimento2 = CUBOID([14.6, 0.005, 9.6]);
    pavimento2 = T([0,1,2])([0.2,0.99,-9.6])(pavimento2);
    var base1 = T([0,1,2])([3.55,0,-2.7])(CUBOID([7.9,0.8,2.7]));
    var pavimenti = STRUCT([pavimento1, pavimento2, base1]);
    return tan3(pavimenti);
  }

  function drawPrati() {
    var prato1 = CUBOID([24, 0.3, 17.18]);
    prato1 = T([0,1,2])([-4.5,-1.7,-15])(prato1);
    var prato2 = CUBOID([10.5, 0.25, 4]);
    prato2 = T([0,1,2])([-4.5,-1.7,12])(prato2);
    var prato3 = CUBOID([10.5, 0.25, 4]);
    prato3 = T([0,1,2])([-4.5+10.5+3,-1.7,12])(prato3);
    var prato4 = CUBOID([5.5, 0.25, 4]);
    prato4 = T([0,1,2])([-3.5,-1.7,2.18+1.7+2])(prato4);
    var prato5 = CUBOID([5.5, 0.25, 4]);
    prato5 = T([0,1,2])([-3.5+5.5+11,-1.7,2.18+1.7+2])(prato5);
    var prati = STRUCT([prato1, prato2, prato3, prato4, prato5]);
    return greenErba(prati);
  }
  
  function drawStrade() {
    var strada1 = CUBOID([24, 0.3, 1.7]);
    strada1 = T([0,1,2])([-4.5,-1.7,2.18])(strada1);
    var strada2 = CUBOID([24, 0.2, 2]);
    strada2 = T([0,1,2])([-4.5,-1.7,2.18+1.7])(strada2);
    var strada3 = CUBOID([24, 0.2, 2.12]);
    strada3 = T([0,1,2])([-4.5,-1.7,2.18+1.7+6])(strada3);
    var strada4 = CUBOID([3, 0.2, 4]);
    strada4 = T([0,1,2])([-4.5+10.5,-1.7,12])(strada4);
    var strada5 = CUBOID([1, 0.2, 4]);
    strada5 = T([0,1,2])([-4.5,-1.7,2.18+1.7+2])(strada5);
    var strada6 = CUBOID([1, 0.2, 4]);
    strada6 = T([0,1,2])([18.5,-1.7,2.18+1.7+2])(strada6);
    var strada7 = CUBOID([11, 0.2, 4]);
    strada7 = T([0,1,2])([2,-1.7,2.18+1.7+2])(strada7);
    var strade = STRUCT([strada1, strada2, strada3, strada4, strada5, strada6, strada7]);
    return lightGrey(strade);
  }

  var base = drawBase();
  var pavimenti = drawPavimenti();
  var prati = drawPrati();
  var strade = drawStrade();
  var terra = CUBOID([24, 0.5, 15+16]);
  terra = T([0,1,2])([-4.5,-2.2,-15])(terra);
  terra = earth(terra);
  //ASSEMBLAGGIO BASE
  var baseStruct = STRUCT([base, pavimenti, prati, strade, terra]);

  //-------------------------------------------PARTE POSTERIORE--------------------------------------------
  function drawBack() {
    var muro1 = SIMPLEX_GRID([[-0.2, 1.3], [5.5],[0.2]]);
    var muro2_1 = SIMPLEX_GRID([[-1.5, 1],[0.4],[0.2]]);
    var muro2_2 = SIMPLEX_GRID([[-1.5, 1],[-1, 0.7],[0.2]]);
    var muro2_3 = SIMPLEX_GRID([[-1.5, 1],[-3.2, 1.6],[0.2]]);
    var muro2_4 = SIMPLEX_GRID([[-1.5, 1],[-5.4, 0.1],[0.2]]);
    var muro3 = SIMPLEX_GRID([[-2.5, 1.5],[5.5],[0.2]]);
    var muro4_1 = SIMPLEX_GRID([[-4, 1],[0.5],[0.2]]);
    var muro4_2 = SIMPLEX_GRID([[-4, 1],[-1, 0.7],[0.2]]);
    var muro4_3 = SIMPLEX_GRID([[-4, 1],[-3.2, 1.6],[0.2]]);
    var muro4_4 = SIMPLEX_GRID([[-4, 1],[-5.4, 0.1],[0.2]]);
    var muro5 = SIMPLEX_GRID([[-5, 0.5],[5.5],[0.2]]);
    var muro6_1 = SIMPLEX_GRID([[-5.5, 1],[0.5],[0.2]]);
    var muro6_2 = SIMPLEX_GRID([[-5.5, 1],[-1, 0.7],[0.2]]);
    var muro6_3 = SIMPLEX_GRID([[-5.5, 1],[-2.9, 1.9],[0.2]]);
    var muro6_4 = SIMPLEX_GRID([[-5.5, 1],[-5.4, 0.1],[0.2]]);
    var muro7 = SIMPLEX_GRID([[-6.5, 0.5],[5.5],[0.2]]);
    var muro8_1 = SIMPLEX_GRID([[-7, 1],[1.25],[0.2]]);
    var muro8_2 = SIMPLEX_GRID([[-7, 1],[-2.75, 2.75],[0.2]]);
    var muro9 = SIMPLEX_GRID([[-8, 0.5],[5.5],[0.2]]);
    var muro10_1 = SIMPLEX_GRID([[-8.5, 1],[0.5],[0.2]]);
    var muro10_2 = SIMPLEX_GRID([[-8.5, 1],[-1, 0.7],[0.2]]);
    var muro10_3 = SIMPLEX_GRID([[-8.5, 1],[-2.9, 1.9],[0.2]]);
    var muro10_4 = SIMPLEX_GRID([[-8.5, 1],[-5.4, 0.1],[0.2]]);
    var muro11 = SIMPLEX_GRID([[-9.5, 0.5],[5.5],[0.2]]);
    var muro12_1 = SIMPLEX_GRID([[-10, 1],[0.5],[0.2]]);
    var muro12_2 = SIMPLEX_GRID([[-10, 1],[-1, 0.7],[0.2]]);
    var muro12_3 = SIMPLEX_GRID([[-10, 1],[-3.2, 1.6],[0.2]]);
    var muro12_4 = SIMPLEX_GRID([[-10, 1],[-5.4, 0.1],[0.2]]);
    var muro13 = SIMPLEX_GRID([[-11, 1.5],[5.5],[0.2]]);
    var muro14_1 = SIMPLEX_GRID([[-12.5, 1],[0.5],[0.2]]);
    var muro14_2 = SIMPLEX_GRID([[-12.5, 1],[-1, 0.7],[0.2]]);
    var muro14_3 = SIMPLEX_GRID([[-12.5, 1],[-3.2, 1.6],[0.2]]);
    var muro14_4 = SIMPLEX_GRID([[-12.5, 1],[-5.4, 0.1],[0.2]]);
    var muro15 = SIMPLEX_GRID([[-13.5, 1.3], [5.5],[0.2]]);

    var struct = STRUCT([muro1, muro2_1, muro2_2, muro2_3, muro2_4, muro3, muro4_1, muro4_2, muro4_3, muro4_4,
      muro5, muro6_1, muro6_2, muro6_3, muro6_4, muro7, muro8_1, muro8_2, muro9, muro10_1, muro10_2, muro10_3, muro10_4,
      muro11, muro12_1, muro12_2, muro12_3, muro12_4, muro13, muro14_1, muro14_2, muro14_3, muro14_4, muro15
    ]);
    struct = T([2])([-9.8])(struct);
    return wall(struct);
  }

  function creaFinestraMedia() {
    var cubo = CUBOID([0.5,1.2,0.1]);
    var cilindro = CYL_SURFACE([0.025,0.05])();
    cilindro = R([1,2])(-PI/2)(cilindro);
    cilindro = T([1,2])([0.09,0.05])(cilindro);
    var cilindro1 = T([1])([0.5])(cilindro);
    var cilindro2 = T([1])([0.5])(cilindro1);
    var struct = STRUCT([cubo, cilindro, cilindro1, cilindro2]);
    return green(struct);
  }

  function assemblaFinestreBack() {
    var finestraP1_1 = creaFinestraPiccola();
    var finestraP1_2 = creaFinestraPiccola();
    finestraP1_1 = T([0,1,2])([1.5,4.8,-10+0.15])(finestraP1_1);
    finestraP1_2 = R([0,2])(PI)(finestraP1_2);
    finestraP1_2 = T([0,1,2])([2.5,4.8,-10+0.25])(finestraP1_2);
    var finestraP1 = STRUCT([finestraP1_1,finestraP1_2]);
    var finestraP2 = T([0])([2.5])(finestraP1);
    var finestraP3 = T([0])([4])(finestraP1);
    var finestraP4 = T([0])([7])(finestraP1);
    var finestraP5 = T([0])([8.5])(finestraP1);
    var finestraP6 = T([0])([11])(finestraP1);

    var finestraG1_1 = creaFinestraGrande();
    var finestraG1_2 = creaFinestraGrande();
    finestraG1_1 = T([0,1,2])([1.5,1.7,-10+0.15])(finestraG1_1);
    finestraG1_2 = R([0,2])(PI)(finestraG1_2);
    finestraG1_2 = T([0,1,2])([2.5,1.7,-10+0.25])(finestraG1_2);
    var finestraG1 = STRUCT([finestraG1_1,finestraG1_2]);
    var finestraG2 = T([0])([2.5])(finestraG1);
    var finestraG3_1 = creaFinestraMedia();
    var finestraG3_2 = creaFinestraMedia();
    finestraG3_1 = R([0,2])(3*PI/5)(finestraG3_1);
    finestraG3_2 = R([0,2])(2*PI/5)(finestraG3_2);
    finestraG3_2 = T([0,2])([1.1,-0.05])(finestraG3_2);
    var finestraG3 = STRUCT([finestraG3_1,finestraG3_2]);
    finestraG3 = T([0,1,2])([5.4,1.7,-9.8])(finestraG3);
    var finestraG4_1 = creaFinestraGrande();
    var finestraG4_2 = creaFinestraGrande();
    finestraG4_1 = R([0,2])(3*PI/5)(finestraG4_1);
    finestraG4_2 = R([0,2])(2*PI/5)(finestraG4_2);
    finestraG4_2 = T([0,2])([1.1,-0.05])(finestraG4_2);
    var finestraG4 = STRUCT([finestraG4_1,finestraG4_2]);
    finestraG4 = T([0,1,2])([6.9,1.25,-9.8])(finestraG4);
    var finestraG5 = T([0])([3.05])(finestraG3);
    var finestraG6 = T([0])([8.5])(finestraG1);
    var finestraG7 = T([0])([11])(finestraG1);
    var finestre = STRUCT([finestraP1, finestraP2, finestraP3, finestraP4, finestraP5, finestraP6,
      finestraG1, finestraG2, finestraG3, finestraG4, finestraG5, finestraG6, finestraG7
    ]);
    return green(finestre);
  }

  function creaStrutturaFinestreBack() {
    var cube1 = CUBOID([0.5,0.05,0.1]);
    var cube2 = T([1])([1.15])(cube1);
    var cube3 = T([1])([0.05])(CUBOID([0.05,1.1,0.1]));
    var cube4 = T([0])([0.45])(cube3);
    var vetro = BOUNDARY(CUBOID([0.4,1.1,0.05]));
    vetro = T([0,1,2])([0.05, 0.05, 0.025])(vetro);
    var struct = STRUCT([cube1, cube2, cube3, cube4]);
    struct = STRUCT([brown(struct), glass(vetro)]);
    return struct;
  }

  function creaStrutturaPiccola() {
    var cube1 = CUBOID([1,0.05,0.1]);
    var cube2 = T([1])([0.25])(cube1);
    var cube3 = T([1])([0.05])(CUBOID([0.05,0.2,0.1]));
    var cube4 = T([0])([0.95])(cube3);
    var vetro = BOUNDARY(CUBOID([0.9,0.2,0.05]));
    vetro = T([0,1,2])([0.05, 0.05, 0.025])(vetro);
    var struct = STRUCT([cube1, cube2, cube3, cube4]);
    struct = STRUCT([brown(struct), glass(vetro)]);
    return struct;
  }

  function assemblaStrutturaFinestreBack() {
    var struttura1_1 = creaStrutturaFinestreBack();
    struttura1_1 = R([0,2])(PI/2)(struttura1_1);
    var struttura1_2 = T([0])([0.9])(struttura1_1);
    var struttura1 = STRUCT([struttura1_1, struttura1_2]);
    struttura1 = T([0,1,2])([5.5,1.7,-9.2])(struttura1);
    var struttura2 = T([0])([1.5])(struttura1);
    var struttura3 = T([0])([3])(struttura1);
    struttura2 = T([1])([-0.15])(struttura2);
    var struttura4 = creaStrutturaPiccola();
    struttura4 = T([0,1,2])([7,1.25,-9.75])(struttura4);
    var struct = STRUCT([struttura1, struttura2, struttura3, struttura4]);
    return struct;
  }

  function assemblaGrateBack() {
    var grata1 = creaStrutturaConGrata();
    grata1 = R([0,2])(PI)(grata1);
    grata1 = T([0,1,2])([2.5,0.5,-9.6])(grata1);
    var grata2 = T([0])([2.5])(grata1);
    var grata3 = T([0])([4])(grata1);
    var grata4 = T([0])([7])(grata1);
    var grata5 = T([0])([8.5])(grata1);
    var grata6 = T([0])([11])(grata1);
    grata1 = S([1])([1.2])(grata1);
    grata1 = T([1])([-0.2])(grata1);
    var struct = STRUCT([grata1, grata2, grata3, grata4, grata5, grata6]);
    return struct;
  }

  var muro = drawBack();
  var finestre = assemblaFinestreBack();
  var struttureFinestre = assemblaStrutturaFinestreBack();
  var grate = assemblaGrateBack();
  //ASSEMBLAGGIO POSTERIORE
  var back = STRUCT([muro, finestre, struttureFinestre, grate]);

  //-------------------------------------------PARTE SUPERIORE--------------------------------------------

  function creaMattonatoX() {
    var cube1 = CUBOID([0.1,0.1,0.2]);
    var cubi = [];
    for(i=0; i<=15.4; i=i+0.25){
      cubi.push(T([0])([i])(cube1));
    }
    var struct = STRUCT(cubi);
    struct = T([0,1,2])([-0.2,5.6,0.4])(struct);
    return struct;
  }

  function creaMattonatoZ() {
    var cube1 = CUBOID([0.2,0.1,0.1]);
    var cubi = [];
    for(i=0; i<=10.4; i=i+0.25){
      cubi.push(T([2])([i])(cube1));
    }
    var struct = STRUCT(cubi);
    struct = T([0,1,2])([-0.4,5.6,-9.98])(struct);
    return struct;
  }

  function drawSoffitto() {
    var cube1 = CUBOID([15.4,0.2,10.4]);
    cube1 = T([0,1,2])([-0.2,5.5,-10])(cube1);
    var cube2 = CUBOID([15.8,0.1,10.8]);
    cube2 = T([0,1,2])([-0.4,5.7,-10.2])(cube2);
    var cube3 = CUBOID([15.9,0.05,10.9]);
    cube3 = T([0,1,2])([-0.45,5.8,-10.25])(cube3);
    var mattonatoX1 = creaMattonatoX();
    var mattonatoX2 = T([2])([-10.6])(mattonatoX1)
    var mattonatoZ1 = creaMattonatoZ();
    var mattonatoZ2 = T([0])([15.6])(mattonatoZ1)
    var struct = STRUCT([cube1, cube2, cube3, mattonatoX1, mattonatoZ1, mattonatoX2, mattonatoZ2]);
    return wall(struct);
  }

  function drawTetto() {
    var points = [[0,0,0],[0,0,10.9],[5.3,2,5.45],[7.95,0,10.9],[10.6,2,5.45],[15.9,0,10.9],[15.9,0,0],[10.6,2,5.45],[7.95,0,0],[5.3,2,5.45],[0,0,0]];
    var triStrip = TRIANGLE_STRIP(points);
    var cube = CUBOID([15.9,0.05,10.9]);
    cube = T([1])([-0.05])(cube);
    var struct = STRUCT([triStrip, cube]);
    struct = T([0,1,2])([-0.45,5.9,-10.25])(struct);
    return redBase(struct);
  }

  function drawFinestra() {
    var cube1 = CUBOID([1,0.2,4.1]);
    var cube2 = CUBOID([1.2,0.2,4.1]);
    cube2 = R([0,1])([PI/2])(cube2);
    var rossi = STRUCT([cube2, cube1]);  //rossi fin quì
    rossi = R([0,1])([-3*PI/4])(rossi);
    rossi = T([0,1,2])([-0.141,-0.141,-1.1])(rossi);
    rossi = T([1])([-0.1])(rossi);
    var cube3 = CUBOID([1,0.2,2.9]);
    cube3 = T([0,1])([-0.5,-0.8])(cube3);
    var cube4 = CUBOID([0.56,0.2,2.9]);
    cube4 = T([0,1])([-0.28,-0.6])(cube4);
    var cube5 = CUBOID([0.16,0.2,2.9]);
    cube5 = T([0,1])([-0.08,-0.4])(cube5);  
    var cube6 = T([1])([-1])(cube3);
    var cube7 = CUBOID([0.05,0.8,2.9]);
    cube7 = T([0,1])([-0.5,-1.6])(cube7);
    var cube8 = T([0])([0.95])(cube7);  //bianchi fin quì
    cube3 = CUBOID([0.9,0.2,2.9]);
    cube3 = T([0,1])([-0.45,-0.8])(cube3);
    var bianchi = STRUCT([cube3, cube4, cube5, cube6, cube7, cube8]);
    var cube9 = CUBOID([0.9,0.05,0.05]);
    cube9 = T([0,1,2])([-0.45,-0.85,2.85])(cube9);
    var cube10 = T([1])([-0.75])(cube9);
    var cube11 = T([1])([-0.375])(cube9);
    var cube12 = CUBOID([0.05,0.325,0.05]);
    cube12 = T([0,1,2])([-0.45,-1.175,2.85])(cube12);
    var cube13 = T([1])([-0.375])(cube12);
    var cube1213 = STRUCT([cube12, cube13]);
    var cube14 = T([0])([0.425])(cube1213);
    var cube15 = T([0])([0.85])(cube1213);  //legno fin quì
    var legno = STRUCT([cube9, cube10, cube11, cube1213, cube14, cube15]);
    var cube16 = CUBOID([0.9,0.8,0.05]);
    cube16 = T([0,1,2])([-0.45,-1.6,2.8])(cube16);
    var struct = STRUCT([redBase(rossi), wall(bianchi), brown(legno), blue(cube16)]);
    struct = R([0,2])(-PI/2)(struct);
    struct = T([0,1,2])([3.2,7.8,-4.3])(struct);
    return struct;
  }

  function drawFrontal() {
    var base1 = CUBOID([7.5,0.2,1]);
    var base2 = CUBOID([7.8,0.1,1.2]);
    base2 = T([0,1,2])([3.6,5.7,-0.1])(base2);

    function creaMattonatoX(inizio, fine) {
      var cube1 = CUBOID([0.1,0.1,0.2]);
      var cubi = [];
      for(i=inizio; i<fine; i=i+0.25){
        cubi.push(T([0])([i])(cube1));
      }
      var struct = STRUCT(cubi);
      return struct;
    }
    var cuboExtra = CUBOID([0.1,0.1,0.2]);
    cuboExtra = R([0,1])([PI/4])(cuboExtra);
    cuboExtra = T([0,1,2])([7.5,7.65,0.855])(cuboExtra);
    var cube1 = CUBOID([4.3,0.1,1]);
    var cube2 = CUBOID([4.3,0.1,1]);
    var matt1 = creaMattonatoX(0,4);
    matt1 = T([1,2])([0.1,0.8])(matt1);
    cube1 = STRUCT([cube1, matt1]);
    var matt2 = creaMattonatoX(0,4);
    matt2 = T([1,2])([-0.1,0.8])(matt2);
    cube2 = STRUCT([cube2, matt2]);
    cube2 = R([0,1])([0.35*PI])(cube2);
    cube1 = T([1])([-0.1])(cube1);
    cube1 = R([0,1])([-0.35*PI])(cube1);
    var cubi = STRUCT([cube1, cube2]);  //rossi fin quì
    cubi = R([0,1])([-PI/2])(cubi);

    var matt = creaMattonatoX(0.1,7.5);
    matt = T([1,2])([0.1,1])(matt);
    var base1 = STRUCT([base1,matt]);
    base1 = T([0,1,2])([3.75,5.5,-0.1])(base1);
    cubi = T([0,1,2])([7.5,7.65,0.05])(cubi);

    var red1 = CUBOID([4.5,0.1,5.5]);
    var red2 = CUBOID([4.5,0.1,5.5]);
    red2 = R([0,1])([0.35*PI])(red2);
    red1 = T([1])([-0.1])(red1);
    red1 = R([0,1])([-0.35*PI])(red1);
    var reds = STRUCT([red2, red1]);  //rossi fin quì
    reds = R([0,1])([-PI/2])(reds);
    reds = T([1])([-0.05])(reds);

    var cilindro = drawCylinderPieno(0.08,5.6,10);
    cilindro = T([2])([-0.05])(cilindro);
    var rossi = STRUCT([reds,cilindro]);
    rossi = T([0,1,2])([7.5,7.75,-4.35])(rossi);

    var points = [[3.7,5.7,0.85],[7.5,7.7,0.85],[11.3,5.7,0.85]];
    var triStrip = TRIANGLE_STRIP(points);

    var struct = STRUCT([wall(base1), wall(base2), wall(cubi), wall(cuboExtra), redBase(rossi), wall(triStrip)]);
    return struct;
  }

  function drawTuboSuperiore() {

    function creaTuboVerticale(){

      var domain2 = DOMAIN([[0,1],[0,1]])([15,3]); 
      var knots2 = [0,0,0,1,2,2,2];
      var points1_1 = [[0,0,0],[-0.05,0,0],[-0.05,0,0.1],[0,0,0.1]];
      var points2_1 = [[0,-0.1,0],[-0.05,-0.1,0],[-0.05,-0.1,0.1],[0,-0.1,0.1]];
      var points3_1 = [[0+0.7,-0.2,0],[-0.05+0.7,-0.2,0],[-0.05+0.7,-0.2,0.1],[0+0.7,-0.2,0.1]];
      var points4_1 = [[0+0.4,-5.81,0],[-0.05+0.4,-5.81,0],[-0.05+0.4,-5.81,0.1],[0+0.4,-5.81,0.1]];

      var curve1_1 = NUBS(S0)(2)(knots2)(points1_1);
      var curve2_1 = NUBS(S0)(2)(knots2)(points2_1);
      var curve3_1 = NUBS(S0)(2)(knots2)(points3_1);
      var curve4_1 = NUBS(S0)(2)(knots2)(points4_1);
      var sup3_1 = BEZIER(S1)([curve1_1,curve2_1,curve3_1,curve4_1]);
      sup3_1 = MAP(sup3_1)(domain2);

      var points1_2 = [[0,0,0],[0.05,0,0],[0.05,0,0.1],[0,0,0.1]];
      var points2_2 = [[0,-0.1,0],[0.05,-0.1,0],[0.05,-0.1,0.1],[0,-0.1,0.1]];
      var points3_2 = [[0+0.7,-0.2,0],[0.05+0.7,-0.2,0],[0.05+0.7,-0.2,0.1],[0+0.7,-0.2,0.1]];
      var points4_2 = [[0+0.4,-5.81,0],[0.05+0.4,-5.81,0],[0.05+0.4,-5.81,0.1],[0+0.4,-5.81,0.1]];

      var curve1_2 = NUBS(S0)(2)(knots2)(points1_2);
      var curve2_2 = NUBS(S0)(2)(knots2)(points2_2);
      var curve3_2 = NUBS(S0)(2)(knots2)(points3_2);
      var curve4_2 = NUBS(S0)(2)(knots2)(points4_2);
      var sup3_2 = BEZIER(S1)([curve1_2,curve2_2,curve3_2,curve4_2]);
      sup3_2 = MAP(sup3_2)(domain2);

      var tubo = STRUCT([sup3_1, sup3_2]);
      tubo = T([0,1])([-0.05,-0.04])(tubo);
      return tubo;
    }
    var tubo1 = creaTuboVerticale();
    var tubo2 = T([2])([4.2])(tubo1);
    var tubo3 = T([2])([10])(tubo1);
    tubo1 = T([2])([1])(tubo1);
    var domain = DOMAIN([[0,1],[0,1]])([20,1]); 
    var knots = [0,0,0,1,2,2,2];
    var points1 = [[0,0,0],[0,-0.1,0],[-0.1,-0.1,0.1],[-0.1,0,0.1]];
    var points2 = [[10.94,0,0],[10.94,-0.1,0],[11.04,-0.1,0.1],[11.04,0,0.1]];
    var points3 = [[15.94,0,0],[15.94,-0.1,0],[16.04,-0.1,0.1],[16.04,0,0.1]];

    var curve1 = NUBS(S0)(2)(knots)(points1);
    var curve2 = NUBS(S0)(2)(knots)(points2);
    var curve3 = NUBS(S0)(2)(knots)(points3);
    var sup = BEZIER(S1)([curve1,curve2]);
    sup = MAP(sup)(domain);
    var sup3 = BEZIER(S1)([curve1,curve3]);
    sup3 = MAP(sup3)(domain);
    var sup3_1 = R([0,2])(-PI/2)(sup3);
    var tubo4 = T([2])([3.3])(creaTuboVerticale());
    var tubo5 = T([2])([5.65])(creaTuboVerticale());
    var tubo6 = T([2])([10.2])(creaTuboVerticale());
    var tubo7 = T([2])([12.5])(creaTuboVerticale());
    sup3_1 = STRUCT([sup3_1, tubo4, tubo5, tubo6, tubo7]);
    sup3_1 = R([0,2])(PI/2)(sup3_1);

    sup = R([0,2])(-PI/2)(sup);
    sup = STRUCT([sup, tubo1, tubo2, tubo3]);
    var sup2 = S([0])([-1])(sup);
    var sup4 = S([2])([-1])(sup3_1);

    sup = T([0,1,2])([-0.47,5.85,-10.27])(sup);
    sup2 = T([0,1,2])([15.47,5.85,-10.27])(sup2);
    sup3 = T([0,1,2])([-0.47,5.85,0.67])(sup3);
    sup4 = T([0,1,2])([-0.47,5.85,-10.27])(sup4);

    var struct = STRUCT([sup, sup2, sup3, sup4]);
    return black(struct);
  }

  function drawOrnamento() {
    var domain = DOMAIN([[0,1],[0,1]])([90,1]); 
    var knots = [0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,24,24];
    var points1 = [[0,0,0],[-0.08,0.03,0],[-0.25,0.4,0],[-0.21,0.4,0],[-0.21,0.475,0.1],[-0.25,0.59,0.15],
      [-0.24,0.55,0.15],[-0.12,0.55,0.15],[-0.12,0.7,0.2],[-0.25,0.65,0.15],[-0.21,0.75,0.2],
      [-0.12,0.75,0.2],[-0.08,0.7,0.15],[0.08,0.7,0.15],[0.12,0.75,0.2],[0.21,0.75,0.2],
      [0.25,0.65,0.15],[0.12,0.7,0.2],[0.12,0.55,0.15],[0.24,0.55,0.15],[0.25,0.59,0.15],
      [0.21,0.475,0.1],[0.21,0.4,0],[0.25,0.4,0],[0.08,0.03,0],[0,0,0]
    ];
    var points2 = [[0,0,0+0.05],[-0.08,0.03,0],[-0.25,0.4,0+0.05],[-0.21,0.4,0+0.05],[-0.21,0.475,0.1+0.05],[-0.25,0.59,0.15+0.05],
      [-0.24,0.55,0.15+0.05],[-0.12,0.55,0.15+0.05],[-0.12,0.7,0.2+0.05],[-0.25,0.65,0.15+0.05],[-0.21,0.75,0.2+0.05],
      [-0.12,0.75,0.2+0.05],[-0.08,0.7,0.15+0.05],[0.08,0.7,0.15+0.05],[0.12,0.75,0.2+0.05],[0.21,0.75,0.2+0.05],
      [0.25,0.65,0.15+0.05],[0.12,0.7,0.2+0.05],[0.12,0.55,0.15+0.05],[0.24,0.55,0.15+0.05],[0.25,0.59,0.15+0.05],
      [0.21,0.475,0.1+0.05],[0.21,0.4,0+0.05],[0.25,0.4,0+0.05],[0.08,0.03,0],[0,0,0+0.05]
    ];

    var curve1 = NUBS(S0)(2)(knots)(points1);
    var curve2 = NUBS(S0)(2)(knots)(points2);
    var p1 = [[0,0.6,0]];
    var p2 = [[0,0.6,0.05]];
    var sup3 = BEZIER(S1)([curve1,curve2]);
    sup3 = MAP(sup3)(domain);

    var c1 = BEZIER(S0)(p1);
    var curve3 = BEZIER(S1)([curve1,c1]);
    var surface1 = MAP(curve3)(domain);

    var c2 = BEZIER(S0)(p2);
    var curve4 = BEZIER(S1)([curve2,c2]);
    var surface2 = MAP(curve4)(domain);

    var superfice = STRUCT([sup3, surface1, surface2]);
    superfice = T([0,1,2])([7.5,6.2,0.85])(superfice);
    return white(superfice);
  }

  var soffitto = drawSoffitto();
  var tetto = drawTetto();
  var finestra = drawFinestra();
  var fronte = drawFrontal();
  var tubo = drawTuboSuperiore();
  var ornamento = drawOrnamento();
  //ASSEMBLAGGIO SUPERIORE
  var up = STRUCT([soffitto, tetto, finestra, fronte, tubo, ornamento]);

  //-------------------------------------------CONTORNI--------------------------------------------
  function drawContorni(){
    var sinistro1 = CUBOID([0.05,0.15,10.1]);
    sinistro1 = T([0,1,2])([-0.05, 1.1, -9.85])(sinistro1);
    var destro1 = T([0])([15.05])(sinistro1);
    var posteriore1 = CUBOID([15,0.15,0.05]);
    posteriore1 = T([1,2])([1.1, -9.85])(posteriore1);
    var frontale1_1 = CUBOID([3.75,0.15,0.05]);
    frontale1_1 = T([1,2])([1.1, 0.2])(frontale1_1);
    var frontale1_2 = CUBOID([3.75,0.15,0.05]);
    frontale1_2 = T([0,1,2])([11.25, 1.1, 0.2])(frontale1_2);
    var com1_1 = CUBOID([0.05,0.15,1.6]);
    com1_1 = T([0,1,2])([-0.65, 1.1, -3.85])(com1_1);
    var com1_2 = CUBOID([0.55,0.15,0.05]);
    com1_2 = T([0,1,2])([-0.6, 1.1, -2.3])(com1_2);
    var com1_3 = CUBOID([0.55,0.15,0.05]);
    com1_3 = T([0,1,2])([-0.6, 1.1, -3.85])(com1_3);

    var sinistro2 = CUBOID([0.05,0.4,10.1]);
    sinistro2 = T([0,2])([-0.05, -9.85])(sinistro2);
    var destro2 = T([0])([15.05])(sinistro2);
    var posteriore2 = CUBOID([15,0.4,0.05]);
    posteriore2 = T([2])([-9.85])(posteriore2);
    var frontale2_1 = CUBOID([3.75,0.4,0.05]);
    frontale2_1 = T([2])([0.2])(frontale2_1);
    var frontale2_2 = CUBOID([3.75,0.4,0.05]);
    frontale2_2 = T([0,2])([11.25, 0.2])(frontale2_2);
    var com2_1 = CUBOID([0.05,0.4,1.6]);
    com2_1 = T([0,2])([-0.65, -3.85])(com2_1);
    var com2_2 = CUBOID([0.55,0.4,0.05]);
    com2_2 = T([0,2])([-0.6, -2.3])(com2_2);
    var com2_3 = CUBOID([0.55,0.4,0.05]);
    com2_3 = T([0,2])([-0.6, -3.85])(com2_3);

    var sinistro3 = CUBOID([0.05,0.1,10.2]);
    sinistro3 = T([0,2])([-0.1, -9.9])(sinistro3);
    var destro3 = T([0])([15.15])(sinistro3);
    var posteriore3 = CUBOID([15.1,0.1,0.05]);
    posteriore3 = T([0,2])([-0.05,-9.9])(posteriore3);
    var frontale3_1 = CUBOID([3.8,0.1,0.05]);
    frontale3_1 = T([0,2])([-0.05,0.25])(frontale3_1);
    var frontale3_2 = CUBOID([3.8,0.1,0.05]);
    frontale3_2 = T([0,2])([11.25, 0.25])(frontale3_2);
    var com3_1 = CUBOID([0.05,0.1,1.7]);
    com3_1 = T([0,2])([-0.7, -3.9])(com3_1);
    var com3_2 = CUBOID([0.6,0.1,0.05]);
    com3_2 = T([0,2])([-0.65, -2.25])(com3_2);
    var com3_3 = CUBOID([0.6,0.1,0.05]);
    com3_3 = T([0,2])([-0.65, -3.9])(com3_3);

    var struct = STRUCT([sinistro1, destro1, posteriore1, frontale1_1, frontale1_2, 
      com1_1, com1_2, com1_3, sinistro2, destro2, posteriore2, frontale2_1, frontale2_2, 
      com2_1, com2_2, com2_3, sinistro3, destro3, posteriore3, frontale3_1, frontale3_2, 
      com3_1, com3_2, com3_3
    ]);
    return wall(struct);
  }
  var contorni = drawContorni();

  //==========================================ASSEMBLAGGIO FINALE=========================================
  var struct = STRUCT([frontal, left, right, baseStruct, back, up, contorni]);
  return struct;
}
model = drawVilla();

DRAW(model);