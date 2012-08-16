//Domini
var domain = INTERVALS(1)(10);
var domain1 = DOMAIN([[0,1],[0,1]])([10,10]);
var r_domain = DOMAIN([[0,1],[0,2*PI]])([30,30]);

//Colori della villa
var marrone_tetto = [0.54,0.21,0.15];
var vetro_finestre = [0,1,1,0.3];
var beige_mura = [0.992,0.96,0.901];
var grigio_granito = [0.803,0.752,0.690];
var grigio_colonna = [0.960,0.960,0.960];
var verde_prato = [0,0.392,0];

//funzione per calcolare i knots della NUBS
function knots (points) {
  var m = points.length;
  var k = 2; //grado della curva, per ora pari a 2 (sempre)
  var n = (m + k + 1);
  var l = n - 3; //numeo da cui si parte per terminare la sequenza
  var j = 1; // primo elemento della sequenza
  var knots = [];
  for (var i = 0; i < 3; i++) {
    knots[i] = 0;
  };
  for (var i = 3; i < l; i++, j++) {
    knots[i] = j;
  };
  for (var i = l; i < n; i++) {
    knots[i] = j;
  };
 return knots;
};

//funzione che prepara la nubs a partire dai punti di controllo, per poi usarla in s1
function nubs_s0_NOmapped (controlpoints) {
  var knots_curva = knots(controlpoints);
  var curva_spline = NUBS(S0)(2)(knots_curva)(controlpoints);
  return curva_spline;
}
 
//Funzione che, date due nubs s0 , le adopera come argomento di una hermite s1
function hermite_s1_mapped (nubs1, nubs2, tan1, tan2) {
  var points_surf = [nubs1, nubs2, tan1, tan2];
  var surf = CUBIC_HERMITE(S1)(points_surf);
  var surface = MAP(surf)(domain1);
  return surface;
}

//Colonna
function colonna (x,y,z) {
  var base = T([0,1,2])([-0.52,-0.52,-0.14])(CUBOID([1.04,1.04,0.15]));

  var p_profile = [[0,0,0],[0.30,0,0],[0.42,0,0],[0.47,0,0.01],[0.49,0,0.03],[0.5,0,0.05],[0.49,0,0.07],
                  [0.47,0,0.09],[0.42,0,0.10],[0.42,0,0.11],[0.42,0,0.12],[0.41,0,0.12],
                  [0.4,0,0.12],[0.395,0,0.13],[0.39,0,0.14],[0.395,0,0.15],[0.4,0,0.16],
                  [0.4,0,0.17],[0.4,0,0.18],[0.41,0,0.19],[0.42,0,0.21],[0.41,0,0.23],
                  [0.4,0,0.24],[0.405,0,0.245],[0.41,0,0.255],[0.405,0,0.265],[0.4,0,0.27],
                  [0.395,0,0.27],[0.39,0,0.27],[0.39,0,0.28],[0.39,0,0.29],[0.39,0,6.40],
                  [0.40,0,6.41],[0.41,0,6.41],[0.41,0,6.42],[0.41,0,6.43],
                  [0.42,0,6.43],[0.47,0,6.44],[0.49,0,6.46],[0.5,0,6.48],[0.49,0,6.50],
                  [0.47,0,6.52],[0.42,0,6.53],[0.42,0,6.53],[0.52,0,6.55],[0.59,0,6.60],
                  [0.62,0,6.63],[0.59,0,6.66],[0.52,0,6.71],[0.42,0,6.73],[0.30,0,6.73],[0,0,6.73]];
  var c_profile = nubs_s0_NOmapped(p_profile);
  var r_surf = ROTATIONAL_SURFACE(c_profile);
  var corpo = MAP(r_surf)(r_domain);

  var pfregio = [[0,0,0],[0.10,0,0],[0.18,0,0],[0.18,0,0.01],[0.18,0,0.02],[0.17,0,0.03],[0.15,0,0.06],[0.12,0,0.11],
                [0.10,0,0.20],[0.10,0,0.30],[0.10,0,0.50],[0.10,0,0.70],[0.10,0,0.90],[0.12,0,0.99],
                [0.15,0,1.04],[0.17,0,1.07],[0.18,0,1.08],[0.18,0,1.09],[0.18,0,1.1],[0.10,0,1.1],[0,0,1.1]];
  var f_profile = nubs_s0_NOmapped(pfregio);
  var f_r_surf = ROTATIONAL_SURFACE(f_profile);
  var f_surface = MAP(f_r_surf)(r_domain);
  
  var fregio_sx = f_surface;
  var fregio_dx = T([1])([1.2])(f_surface);

  var fregio = T([0,1,2])([-0.55,-0.6,6.58])(R([0,2])([PI/2])(STRUCT([fregio_sx, fregio_dx])));
  
  var supporto_front = T([0,1,2])([-0.545,-0.65,6.705])(CUBOID([[0.02],[1.3],[0.05]]));
  var supporto_back = T([0,1,2])([0.53,-0.65,6.705])(CUBOID([[0.02],[1.3],[0.05]]));

  var sostegno = T([0,1,2])([-0.52,-0.52,6.725])(CUBOID([1.04,1.04,0.12]));

  var col = STRUCT([corpo,base, fregio, supporto_front, supporto_back, sostegno]);
  var colonna = COLOR(grigio_colonna)(T([0,1,2])([x,y,z])(col));
  return colonna
}

//gradinata 
function gradinata (x,y,z,alpha) {
  var domain_gradinata = DOMAIN([[0,1],[0,1]])([60,60]);

  var pgradino0 = [[0,0,0],[0,0,0.01],[0,0,0.145],[0,0,0.155],[0.01,0,0.155],[0.34,0,0.155]];

  var pgradino1 = pgradino0.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino2 = pgradino1.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino3 = pgradino2.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino4 = pgradino3.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino5 = pgradino4.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino6 = pgradino5.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino7 = pgradino6.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino8 = pgradino7.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino9 = pgradino8.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino10 = pgradino9.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino11 = pgradino10.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino12 = pgradino11.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino13 = pgradino12.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino14 = pgradino13.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino15 = pgradino14.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino16 = pgradino15.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino17 = pgradino16.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino18 = pgradino17.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});
  var pgradino19 = pgradino18.map(function (p){ return [p[0]+0.35,p[1],p[2]+0.155]});

  var p_profilo_gradini1a = pgradino0.concat(pgradino1,pgradino2,pgradino3,pgradino4,pgradino5,
                             pgradino6,pgradino7,pgradino8,pgradino9,pgradino10);
  var p_profilo_gradini1b = pgradino11.concat(pgradino12,pgradino13,pgradino14,pgradino15, 
                              pgradino16,pgradino17,pgradino18,pgradino19);

  var p_profilo_gradini2a = p_profilo_gradini1a.map(function (p){ return [p[0],p[1]+10.39,p[2]]});
  var p_profilo_gradini2b = p_profilo_gradini1b.map(function (p){ return [p[0],p[1]+10.39,p[2]]});

  var curva_gradini1a = nubs_s0_NOmapped(p_profilo_gradini1a);
  var curva_gradini2a = nubs_s0_NOmapped(p_profilo_gradini2a);

  var curva_gradini1b = nubs_s0_NOmapped(p_profilo_gradini1b);
  var curva_gradini2b = nubs_s0_NOmapped(p_profilo_gradini2b);

  var curva_gradinata_a = CUBIC_HERMITE(S1)([curva_gradini1a, curva_gradini2a, [0,0,0], [0,0,0]])
  var curva_gradinata_b = CUBIC_HERMITE(S1)([curva_gradini1b, curva_gradini2b, [0,0,0], [0,0,0]])

  var gradinata_a = MAP(curva_gradinata_a)(domain_gradinata);
  var gradinata_b = MAP(curva_gradinata_b)(domain_gradinata);

  var gradinata = COLOR(grigio_granito)(T([0,1,2])([x,y,z])(R([0,1])([alpha])(STRUCT([gradinata_a, gradinata_b]))));

  return gradinata;
}

//basamento, uno a sx ed uno a dx della gradinata
function basamento (x,y,z) {
  var basamento1 = CUBOID([7.26,1.72,0.70])
  var basamento2 = T([0,1,2])([0,0.15,0.6999])(CUBOID([7.11,1.42,0.50]));
  var basamento4 = T([0,1,2])([0,0.20,2.79999])(CUBOID([7.07,1.32,0.30]));

  var parte_centro1 = T([0,1,2])([0,0.30,1.19999])(CUBOID([0.50,1.12,1.6]));
  var parte_centro2 = T([0,1,2])([0.50,0.30,1.19999])(CUBOID([1.80,1.12,0.30]));
  var parte_centro3 = T([0,1,2])([0.50,0.30,2.49999])(CUBOID([1.80,1.12,0.30]));
  var parte_centro4 = T([0,1,2])([1.80,0.30,1.19999])(CUBOID([0.50,1.12,1.6]));
  var parte_centro5 = T([0,1,2])([2.30,0.30,1.19999])(CUBOID([4.66,1.12,1.6]));
  var blocco_centrale = STRUCT([parte_centro1,parte_centro2, parte_centro3, parte_centro4, parte_centro5]);

  var p_base_statua = [[0,0,0],[0.54,0,0],[0.55,0,0],[0.55,0,0.01],[0.55,0,0.25],[0.55,0,0.26],[0.54,0,0.26],[0,0,0.26]]
  var b_profile = nubs_s0_NOmapped(p_base_statua);
  var b_r_surf = ROTATIONAL_SURFACE(b_profile);
  var b_surface = T([0,1,2])([6.4,0.85,3.099999])(MAP(b_r_surf)(r_domain));

  var basamento= COLOR(grigio_granito)(T([0,1,2])([x,y,z])(STRUCT([basamento1, basamento2, basamento4, blocco_centrale, b_surface])));

  return basamento  
}

//mura che definiscono il sottoscala
function pilastri_sottoscala (x,y,z) {

  function arco (x,y,z) {
      var p_arco_ext = [[0,0,0],[1.19,0,0.40],[2.38,0,0]];
      var p_arco_int = p_arco_ext.map(function (p){ return [p[0],p[1]+1.12,p[2]]});
  
      var c_arco_ext = nubs_s0_NOmapped(p_arco_ext);
      var c_arco_int = nubs_s0_NOmapped(p_arco_int);
  
      var p_arco_alto_ext = [[0,0,1.03],[1.3,0,1.03],[2.38,0,1.03]]
      var p_arco_alto_int = p_arco_alto_ext.map(function (p){ return [p[0],p[1]+1.12,p[2]]});
      
      var c_arco_alto_ext = nubs_s0_NOmapped(p_arco_alto_ext);
      var c_arco_alto_int = nubs_s0_NOmapped(p_arco_alto_int);
  
      var arco = hermite_s1_mapped(c_arco_int, c_arco_ext, [0,0,0], [0,0,0]);
      var arco_alto = hermite_s1_mapped(c_arco_alto_ext, c_arco_alto_int, [0,0,0], [0,0,0]);
      var arco_fronte = hermite_s1_mapped(c_arco_ext, c_arco_alto_ext, [0,0,0],[0,0,0]);
      var arco_retro = hermite_s1_mapped(c_arco_int, c_arco_alto_int, [0,0,0],[0,0,0]);
  
      var arco_porta = T([0,1,2])([x,y,z])(STRUCT([arco,arco_alto,arco_fronte,arco_retro]));
      return arco_porta;
  }

  var blocco1 = CUBOID([1.79,1.72,0.70]);
  var blocco2 = T([0,1,2])([0,0.15,0.6999])(CUBOID([1.79,1.42,0.50]));
  var blocco3 = T([0,1,2])([0,0.30,1.19999])(CUBOID([1.79,1.12,1.90]));

  var parete_sottoscala_dx = STRUCT([blocco1, blocco2, blocco3]);
  var parete_sottoscala_sx = T([0])([-2.38-1.79])(parete_sottoscala_dx);

  var arco_centrale = arco(-2.38,0.30,2.07);

  var mura_arco_sottoscala = COLOR(beige_mura)(T([0,1,2])([x,y,z])(STRUCT([parete_sottoscala_dx, parete_sottoscala_sx, arco_centrale])));

  return mura_arco_sottoscala;
}

//Arco laterale sx con basamento
function arco_laterale_sx (x,y,z) {

  var basamento1 = CUBOID([4,1,0.28]);
  var basamento_sottoarco = T([0,1,2])([0,0.07,0.279999])(CUBOID([3.93,0.73,0.76]));
  var pilastro_arco1 = T([0,1,2])([3.18,0.07,1.039999])(CUBOID([0.75,0.73,3.44]));
  var pilastro_arco2 = T([0,1,2])([0,0.07,1.039999])(CUBOID([0.75,0.73,3.44]));
  var anello1 = T([0,1,2])([3.08,-0.03,4.479999])(CUBOID([0.93,0.91,0.26]));
  var anello2 = T([0,1,2])([-0.10,-0.03,4.479999])(CUBOID([0.93,0.91,0.26]));

  function arco (x,y,z) {
    var p_arco_ext = [[0,0,0],[0.74,0,0],[0.75,0,0],[0.9525,0,1],[1.42875,0,1.8],[2.025,0,2],[2.50125,0,1.8],[2.9775,0,1],[3.18,0,0],[3.07,0,0],[3.93,0,0]];
    var p_arco_int = p_arco_ext.map(function (p){ return [p[0],p[1]+0.73,p[2]]});

    var c_arco_ext = nubs_s0_NOmapped(p_arco_ext);
    var c_arco_int = nubs_s0_NOmapped(p_arco_int);

    var p_arco_lato_sx_ext = [[0,0,0],[0,0,2],[0,0,2.29]]
    var p_arco_lato_dx_ext = p_arco_lato_sx_ext.map(function (p){ return [p[0]+3.93,p[1],p[2]]});
    
    var p_arco_lato_sx_int = p_arco_lato_sx_ext.map(function (p){ return [p[0],p[1]+0.73,p[2]]});
    var p_arco_lato_dx_int = p_arco_lato_sx_ext.map(function (p){ return [p[0]+3.93,p[1]+0.73,p[2]]});

    var c_arco_lato_sx_ext = nubs_s0_NOmapped(p_arco_lato_sx_ext);
    var c_arco_lato_dx_ext = nubs_s0_NOmapped(p_arco_lato_dx_ext);
    var c_arco_lato_sx_int = nubs_s0_NOmapped(p_arco_lato_sx_int);
    var c_arco_lato_dx_int = nubs_s0_NOmapped(p_arco_lato_dx_int);

    var p_arco_chiusura_ext = [[0,0,2.29],[2,0,2.29],[3.93,0,2.29]];
    var p_arco_chiusura_int = p_arco_chiusura_ext.map(function (p){ return [p[0],p[1]+0.73,p[2]]});

    var c_arco_chiusura_ext = nubs_s0_NOmapped(p_arco_chiusura_ext);
    var c_arco_chiusura_int = nubs_s0_NOmapped(p_arco_chiusura_int);

    var chiusura_ext = hermite_s1_mapped(c_arco_chiusura_ext,c_arco_ext, [0,0,0], [0,0,0]);
    var chiusura_int = hermite_s1_mapped(c_arco_chiusura_int, c_arco_int, [0,0,0], [0,0,0]);
    var chiusura_sup = hermite_s1_mapped(c_arco_chiusura_ext,c_arco_chiusura_int, [0,0,0], [0,0,0])
    var bordo_arco_sx = hermite_s1_mapped(c_arco_lato_sx_ext,c_arco_lato_sx_int, [0,0,0], [0,0,0]);
    var bordo_arco_dx = hermite_s1_mapped(c_arco_lato_dx_ext,c_arco_lato_dx_int, [0,0,0], [0,0,0]);
    var arco_semicirc = hermite_s1_mapped(c_arco_int, c_arco_ext, [0,0,0], [0,0,0]);
    
    var arco = T([0,1,2])([x,y,z])(STRUCT([bordo_arco_sx,bordo_arco_dx,arco_semicirc,chiusura_ext,chiusura_int,chiusura_sup]));
    return arco;
  }

  var arco = arco(0,0.07,4.74)
  var arco_completo = COLOR(beige_mura)(T([0,1,2])([x,y,z])(STRUCT([basamento1, basamento_sottoarco, pilastro_arco1, pilastro_arco2, anello1, anello2, arco])));
  return arco_completo
}

//Arco laterale destro con basamento
function arco_laterale_dx (x,y,z) {

  var basamento1 = CUBOID([4,1,0.28]);
  var basamento_sottoarco = T([0,1,2])([0,0.2,0.279999])(CUBOID([3.93,0.73,0.76]));
  var pilastro_arco1 = T([0,1,2])([3.18,0.2,1.039999])(CUBOID([0.75,0.73,3.44]));
  var pilastro_arco2 = T([0,1,2])([0,0.2,1.039999])(CUBOID([0.75,0.73,3.44]));
  var anello1 = T([0,1,2])([3.08,0.1,4.479999])(CUBOID([0.93,0.91,0.26]));
  var anello2 = T([0,1,2])([-0.10,0.1,4.479999])(CUBOID([0.93,0.91,0.26]));

  function arco (x,y,z) {
    var p_arco_ext = [[0,0,0],[0.74,0,0],[0.75,0,0],[0.9525,0,1],[1.42875,0,1.8],[2.025,0,2],[2.50125,0,1.8],[2.9775,0,1],[3.18,0,0],[3.07,0,0],[3.93,0,0]];
    var p_arco_int = p_arco_ext.map(function (p){ return [p[0],p[1]+0.73,p[2]]});

    var c_arco_ext = nubs_s0_NOmapped(p_arco_ext);
    var c_arco_int = nubs_s0_NOmapped(p_arco_int);

    var p_arco_lato_sx_ext = [[0,0,0],[0,0,2],[0,0,2.29]]
    var p_arco_lato_dx_ext = p_arco_lato_sx_ext.map(function (p){ return [p[0]+3.93,p[1],p[2]]});
    
    var p_arco_lato_sx_int = p_arco_lato_sx_ext.map(function (p){ return [p[0],p[1]+0.73,p[2]]});
    var p_arco_lato_dx_int = p_arco_lato_sx_ext.map(function (p){ return [p[0]+3.93,p[1]+0.73,p[2]]});

    var c_arco_lato_sx_ext = nubs_s0_NOmapped(p_arco_lato_sx_ext);
    var c_arco_lato_dx_ext = nubs_s0_NOmapped(p_arco_lato_dx_ext);
    var c_arco_lato_sx_int = nubs_s0_NOmapped(p_arco_lato_sx_int);
    var c_arco_lato_dx_int = nubs_s0_NOmapped(p_arco_lato_dx_int);

    var p_arco_chiusura_ext = [[0,0,2.29],[2,0,2.29],[3.93,0,2.29]];
    var p_arco_chiusura_int = p_arco_chiusura_ext.map(function (p){ return [p[0],p[1]+0.73,p[2]]});

    var c_arco_chiusura_ext = nubs_s0_NOmapped(p_arco_chiusura_ext);
    var c_arco_chiusura_int = nubs_s0_NOmapped(p_arco_chiusura_int);

    var chiusura_ext = hermite_s1_mapped(c_arco_chiusura_ext,c_arco_ext, [0,0,0], [0,0,0]);
    var chiusura_int = hermite_s1_mapped(c_arco_chiusura_int, c_arco_int, [0,0,0], [0,0,0]);
    var chiusura_sup = hermite_s1_mapped(c_arco_chiusura_ext,c_arco_chiusura_int, [0,0,0], [0,0,0])
    var bordo_arco_sx = hermite_s1_mapped(c_arco_lato_sx_ext,c_arco_lato_sx_int, [0,0,0], [0,0,0]);
    var bordo_arco_dx = hermite_s1_mapped(c_arco_lato_dx_ext,c_arco_lato_dx_int, [0,0,0], [0,0,0]);
    var arco_semicirc = hermite_s1_mapped(c_arco_int, c_arco_ext, [0,0,0], [0,0,0]);
    
    var arco = T([0,1,2])([x,y,z])(STRUCT([bordo_arco_sx,bordo_arco_dx,arco_semicirc,chiusura_ext,chiusura_int,chiusura_sup]));
    return arco;
  }

  var arco = arco(0,0.2,4.74)
  var arco_completo = COLOR(beige_mura)(T([0,1,2])([x,y,z])(STRUCT([basamento1, basamento_sottoarco, pilastro_arco1, pilastro_arco2, anello1, anello2, arco])));
  return arco_completo
}

//Pavimento ingresso
function pavimento (x,y,z) {
  var pavimento = COLOR(beige_mura)(T([0,1,2])([x,y,z])(CUBOID([5.9,10.43,0.2])))
  return pavimento;
}

//parete interna sottoscala
function muro_sottoscala (x,y,z) {
  var muro_sx = CUBOID([0.3,5,2.9]);
  var muro_dx = T([1])([6])(CUBOID([0.3,5,2.9]));

  var p_arco_sottoscala_ext = [[0,0,2],[0,0.5,2.6],[0,1,2]];
  var p_arco_sottoscala_int = p_arco_sottoscala_ext.map(function (p){ return [p[0]+0.3,p[1],p[2]]});

  var p_tetto_arco_sottoscala_ext = [[0,0,2.9],[0,0.5,2.9],[0,1,2.9]];
  var p_tetto_arco_sottoscala_int = p_tetto_arco_sottoscala_ext.map(function (p){ return [p[0]+0.3,p[1],p[2]]});

  var c_arco_sottoscala_ext = nubs_s0_NOmapped(p_arco_sottoscala_ext);
  var c_tetto_arco_sottoscala_ext = nubs_s0_NOmapped(p_tetto_arco_sottoscala_ext);
  var c_arco_sottoscala_int = nubs_s0_NOmapped(p_arco_sottoscala_int);
  var c_tetto_arco_sottoscala_int = nubs_s0_NOmapped(p_tetto_arco_sottoscala_int);

  var arco_sottoscala_ext = hermite_s1_mapped(c_arco_sottoscala_ext, c_tetto_arco_sottoscala_ext, [0,0,0], [0,0,0]);
  var arco_sottoscala_int = hermite_s1_mapped(c_arco_sottoscala_int, c_tetto_arco_sottoscala_int, [0,0,0], [0,0,0]);
  var chiusura_inf_arco = hermite_s1_mapped(c_arco_sottoscala_ext, c_arco_sottoscala_int,  [0,0,0], [0,0,0]);
  var arco = STRUCT([arco_sottoscala_ext, arco_sottoscala_int, chiusura_inf_arco]);
  var porta = T([1])([5])(arco);

  var muro_sottoscala = COLOR(beige_mura)(T([0,1,2])([x,y,z])(STRUCT([porta, muro_sx, muro_dx])));
  return muro_sottoscala;
}

//solaio 
function solaio (x,y,z) {
  var sostegno_sx = T([1])([0.01])(CUBOID([5,0.72,0.9]));
  var sostegno_centro = T([0])([3.99])(CUBOID([1,12.49,0.9]));
  var sostegno_dx = T([1])([11.76])(CUBOID([5,0.72,0.9]));

  var p_profilo_solaio_1 =[[0,0,0],[0,0,0.40],[0,0,0.55],[0,-0.185,0.725],[0,0,0.90]]
  var p_profilo_solaio_2 = p_profilo_solaio_1.map(function (p){ return [p[0]+5,p[1],p[2]]});

  var p_profilo_solaio_3 = [[0,0,0],[0,0,0.40],[0,0,0.55],[0.185,0,0.725],[0,0,0.90]]
  var p_profilo_solaio_3t = p_profilo_solaio_3.map(function (p){ return [p[0]+5,p[1],p[2]]});

  var p_profilo_solaio_4 = p_profilo_solaio_3t.map(function (p){ return [p[0],p[1]+12.49,p[2]]});

  var p_profilo_solaio_5 =[[0,0,0],[0,0,0.40],[0,0,0.55],[0,0.185,0.725],[0,0,0.90]]
  var p_profilo_solaio_5t = p_profilo_solaio_5.map(function (p){ return [p[0]+5,p[1]+12.49,p[2]]});
  var p_profilo_solaio_6 = p_profilo_solaio_5.map(function (p){ return [p[0],p[1]+12.49,p[2]]});

  var c_profilo_solaio_1 = nubs_s0_NOmapped(p_profilo_solaio_1);
  var c_profilo_solaio_2 = nubs_s0_NOmapped(p_profilo_solaio_2);
  var c_profilo_solaio_3t = nubs_s0_NOmapped(p_profilo_solaio_3t);
  var c_profilo_solaio_4 = nubs_s0_NOmapped(p_profilo_solaio_4);
  var c_profilo_solaio_5t = nubs_s0_NOmapped(p_profilo_solaio_5t);
  var c_profilo_solaio_6 = nubs_s0_NOmapped(p_profilo_solaio_6);

  var profilo_solaio_sx = hermite_s1_mapped(c_profilo_solaio_1, c_profilo_solaio_2, [0,0,0], [0,0,0]);
  var curva_chiusura_bordo_sx = hermite_s1_mapped(c_profilo_solaio_2, c_profilo_solaio_3t, [0,0,0],[0,0,0]);
  var profilo_solaio_fronte = hermite_s1_mapped(c_profilo_solaio_3t, c_profilo_solaio_4, [0,0,0], [0,0,0]);
  var curva_chiusura_bordo_dx = hermite_s1_mapped(c_profilo_solaio_4, c_profilo_solaio_5t, [0,0,0],[0,0,0]);
  var profilo_solaio_dx = hermite_s1_mapped(c_profilo_solaio_5t, c_profilo_solaio_6, [0,0,0], [0,0,0]);

  var solaio = COLOR(beige_mura)(T([0,1,2])([x,y,z])(STRUCT([sostegno_dx, sostegno_sx, sostegno_centro, profilo_solaio_sx, curva_chiusura_bordo_sx, profilo_solaio_fronte, curva_chiusura_bordo_dx,profilo_solaio_dx])));
  return solaio;
}

//Sottotetto con dettaglio
function sottotetto (x,y,z) {

  var sottotetto1 = COLOR(beige_mura)(CUBOID([4.95, 12.5, 0.21]));

  var sostegni_fronte = [];
  var sostegni_sx = [];
  var sostegni_dx = [];
  var sostegni_sx_incl = [];

  for (var i = 0; i <= 33; i++) {
      sostegni_fronte[i] = T([0,1,2])([4.95,i*0.3742,0.06])(CUBOID([0.23,0.15,0.15]));
        };

  for (var i = 0; i <= 12; i++) {
        sostegni_sx[i] = T([0,1,2])([4.8-i*(0.15+0.2242),-0.23,0.06])(CUBOID([0.15,0.23,0.15]));
        };

  for (var i = 0; i <= 12; i++) {
        sostegni_dx[i] = T([0,1,2])([4.8-i*(0.15+0.2242),12.5,0.06])(CUBOID([0.15,0.23,0.15]));
        };

  for (var i = 0; i <= 17; i++) {
      sostegni_sx_incl[i] = T([0,1,2])([5.1,0.03+i*(0.20+0.15),0.37+i*(0.2)])(R([1,2])([PI/6])(CUBOID([0.23,0.15,0.15])));
        };

  var sostegni_dx_incl = T([0,1,2])([0,12.8,0.61])(R([1,2])([5*PI/6])(R([1,2])([-PI/6])(STRUCT(sostegni_sx_incl))));

  var sostegno_centrale = COLOR(beige_mura)(T([0,1,2])([5.1,6.15,3.95])(CUBOID([0.23,0.15,0.15])));

  var sottotetto2 = COLOR(beige_mura)(T([1,2])([-0.43,0.21])(CUBOID([5.38,13.36,0.15])));

  var tetto_sx = COLOR(marrone_tetto)(R([1,2])([PI/6])(T([1,2])([-0.25,0.41])(CUBOID([5.38,7.8,0.42]))));
  var tetto_dx = COLOR(marrone_tetto)(R([1,2])([-PI/6])(T([1,2])([3.27,6.64])(CUBOID([5.38,7.8,0.42]))));
  
  var p_profilo_chiusura = [[0,0,0],[0.12,0,0],[0.20,0,0],[0.20,0,2],[0.20,0,5.38],[0.12,0,5.38],[0,0,5.38]];
  var c_profilo_chiusura = nubs_s0_NOmapped(p_profilo_chiusura);
  var r_surf_chiusura = ROTATIONAL_SURFACE(c_profilo_chiusura);
  var corpo = MAP(r_surf_chiusura)(r_domain);
  var chiusura_tetto = COLOR(marrone_tetto)(T([0,1,2])([0,6.24,4.39])(R([0,2])([PI/2])(STRUCT([corpo])))); 

  var sostegni = COLOR(grigio_granito)(STRUCT([STRUCT(sostegni_fronte),STRUCT(sostegni_sx),STRUCT(sostegni_dx),STRUCT(sostegni_sx_incl),sostegni_dx_incl]));

  var sottotetto_completo = T([0,1,2])([x,y,z])(STRUCT([sostegni,tetto_dx,tetto_sx, sottotetto1, 
                                                                         sottotetto2, sostegno_centrale, chiusura_tetto]));
  return sottotetto_completo;
}

//frontone con finestre ellittiche, in coordinate locali traslabile in x,y,z
function frontone (x,y,z) {
  
  //parte bassa finestra sinistra
  var pdownw = [[0,3.6,0.8],[0,3.7,0.7],[0,4,0.6],[0,4.3,0.7],[0,4.4,0.8]];
  var pdownb = [[0,3.6,0],[0,4,0],[0,4.4,0]];
  var cdown1 = nubs_s0_NOmapped(pdownw);
  var cdown2 = nubs_s0_NOmapped(pdownb);
  var piece1 = hermite_s1_mapped(cdown1, cdown2, [0,0,0], [0,0,0]);

  //parte alta finestra sinistra
  var phighw = [[0,3.6,0.8],[0,3.7,0.7+0.2],[0,4,0.6+0.4],[0,4.3,0.7+0.2],[0,4.4,0.8]];
  var phighb = [[0,3.6,1.5],[0,4.1,1.7],[0,4.4,1.81]];
  var chigh1 = nubs_s0_NOmapped(phighw);
  var chigh2 = nubs_s0_NOmapped(phighb);
  var piece2 = hermite_s1_mapped(chigh1, chigh2, [0,0,0], [0,0,0]);

  //parte sinistra a scendere
  var psidel1 = [[0,3.6,1.5],[0,2.4,1],[0,0,0]];
  var psidel2 = [[0,3.6,0],[0,2.4,0],[0,0,0]];
  var csidel1 = nubs_s0_NOmapped(psidel1);
  var csidel2 = nubs_s0_NOmapped(psidel2);
  var piece3 = hermite_s1_mapped(csidel1, csidel2, [0,0,0], [0,0,0]);

  //parte destra, che va verso in centro di simmetria
  var psider1 = [[0,4.4,1.81],[0,5.3,2.2],[0,6,2.5]];
  var psider2 = [[0,4.4,0],[0,5,0],[0,6,0]];
  var csider1 = nubs_s0_NOmapped(psider1);
  var csider2 = nubs_s0_NOmapped(psider2);
  var piece4 = hermite_s1_mapped(csider1, csider2, [0,0,0], [0,0,0]);

  //struttura lato sinistro
  var frontl = STRUCT([piece1, piece2, piece3,piece4]);
  //struttura lato destro
  var frontr = T([1])([12])(R([0,1])([PI])(frontl));
  //frontone in coordinate locali
  var front = S([0,1,2])([1.05,1.11,1.60])(STRUCT([frontl, frontr]));

  var finestra_l = T([0,1,2])([-0.001,4.45,1.3])(R([0,2])([PI/2])(S([1])([2])(TORUS_SURFACE([0.06, 0.25])([40,10]))));
  var finestra_r = T([0,1,2])([-0.001,8.9,1.3])(R([0,2])([PI/2])(S([1])([2])(TORUS_SURFACE([0.06, 0.25])([40,10]))));

  var finestre = STRUCT([finestra_l, finestra_r]);

  var frontone = COLOR(beige_mura)(T([0,1,2])([x,y,z])(STRUCT([front, finestre])));
  return(frontone)
}


//Corpo della villa

//frontali facciata, sinistro e destro
function pareti_facciata_a_due (x,y,z) {
  var blocco_base1_sx = CUBOID([1.70,5.70,0.70]);
  var blocco_base2_sx = T([0,1,2])([0,0.15,0.6999])(CUBOID([1.55,5.70,0.50]));
  var blocco_sottofinestra_sx = T([0,1,2])([0,0.30,1.19999])(CUBOID([1.40,5.70,0.21]));
  var blocco_sinistro_alto_sx = T([0,1,2])([0,0.30,1.40999])(CUBOID([1.40,2.70,13.20]));
  var blocco_centro_finestre_sx = T([0,1,2])([0,3,2.58999])(CUBOID([1.40,1.28,1.58]));
  var blocco_destro_alto_sx = T([0,1,2])([0,4.27,1.40999])(CUBOID([1.40,1.73,13.20]));
  var blocco_centro_finestre_alto_sx = T([0,1,2])([0,3,6.81999])(CUBOID([1.40,1.28,6.48]));
  var blocco_chiusura_alto_sx = T([0,1,2])([0,0.30,14.60999])(CUBOID([1.40,5.70,0.13]));

  var parete_facciata_sx = STRUCT([blocco_base1_sx, blocco_base2_sx, blocco_sottofinestra_sx, blocco_sinistro_alto_sx, blocco_destro_alto_sx, blocco_centro_finestre_sx,blocco_centro_finestre_alto_sx, blocco_chiusura_alto_sx]);
  
  var blocco_base1_dx = CUBOID([1.70,5.70,0.70]);
  var blocco_base2_dx = T([0,1,2])([0,-0.15,0.6999])(CUBOID([1.55,5.70,0.50]));
  var blocco_sottofinestra_dx = T([0,1,2])([0,-0.30,1.19999])(CUBOID([1.40,5.70,0.21]));
  var blocco_sinistro_alto_dx = T([0,1,2])([0,-0.30,1.40999])(CUBOID([1.40,2.70,13.20]));
  var blocco_centro_finestre_dx = T([0,1,2])([0,2.4,2.58999])(CUBOID([1.40,1.28,1.58]));
  var blocco_destro_alto_dx = T([0,1,2])([0,3.67,1.40999])(CUBOID([1.40,1.73,13.20]));
  var blocco_centro_finestre_alto_dx = T([0,1,2])([0,2.4,6.81999])(CUBOID([1.40,1.28,6.48]));
  var blocco_chiusura_alto_dx = T([0,1,2])([0,-0.30,14.60999])(CUBOID([1.40,5.70,0.13]));

  var parete_facciata_dx = T([0,1,2])([0,18,0])(STRUCT([blocco_base1_dx, blocco_base2_dx, blocco_sottofinestra_dx, blocco_sinistro_alto_dx, blocco_destro_alto_dx, blocco_centro_finestre_dx,blocco_centro_finestre_alto_dx, blocco_chiusura_alto_dx]));

  function muro_sottoscala_corpo (x,y,z) {
    var muro_sx = CUBOID([1.40,6.1,2.9]); //controllare
    var muro_dx = T([1])([7.1])(CUBOID([1.40,6.1,2.9]));

    var p_arco_sottoscala_ext = [[0,0,2],[0,0.5,2.9],[0,1,2]];
    var p_arco_sottoscala_int = p_arco_sottoscala_ext.map(function (p){ return [p[0]+1.40,p[1],p[2]]});

    var p_tetto_arco_sottoscala_ext = [[0,0,2.9],[0,0.5,2.9],[0,1,2.9]];
    var p_tetto_arco_sottoscala_int = p_tetto_arco_sottoscala_ext.map(function (p){ return [p[0]+1.40,p[1],p[2]]});

    var c_arco_sottoscala_ext = nubs_s0_NOmapped(p_arco_sottoscala_ext);
    var c_tetto_arco_sottoscala_ext = nubs_s0_NOmapped(p_tetto_arco_sottoscala_ext);
    var c_arco_sottoscala_int = nubs_s0_NOmapped(p_arco_sottoscala_int);
    var c_tetto_arco_sottoscala_int = nubs_s0_NOmapped(p_tetto_arco_sottoscala_int);

    var arco_sottoscala_ext = hermite_s1_mapped(c_arco_sottoscala_ext, c_tetto_arco_sottoscala_ext, [0,0,0], [0,0,0]);
    var arco_sottoscala_int = hermite_s1_mapped(c_arco_sottoscala_int, c_tetto_arco_sottoscala_int, [0,0,0], [0,0,0]);
    var chiusura_sup_arco = hermite_s1_mapped(c_tetto_arco_sottoscala_ext, c_tetto_arco_sottoscala_int, [0,0,0], [0,0,0]);
    var chiusura_inf_arco = hermite_s1_mapped(c_arco_sottoscala_ext, c_arco_sottoscala_int,  [0,0,0], [0,0,0]);

    var arco = STRUCT([arco_sottoscala_ext, arco_sottoscala_int, chiusura_inf_arco, chiusura_sup_arco]);
    var porta = T([1])([6.1])(arco);

    var muro_sottoscala_corpo = T([0,1,2])([x,y,z])(STRUCT([porta, muro_sx, muro_dx]));
    return muro_sottoscala_corpo;
  }

  var muro_sottoscala_corpo = muro_sottoscala_corpo(0,5.7,0)


  var base_centro_portone_sx = T([0,1,2])([0,5.7,2.8999])(CUBOID([1.40,5.60,0.95]));
  var base_centro_portone_dx = T([0,1,2])([0,13.3,2.8999])(CUBOID([1.40,5.60,0.95]));
  var muro_alto_finestra_centro_sx = T([0,1,2])([0,5.7,3.84999])(CUBOID([1.40,1.25,10.90]));
  var muro_alto_finestra_centro_dx = T([0,1,2])([0,17.65,3.84999])(CUBOID([1.40,1.25,10.90]));
  var muro_alto_portone_sx = T([0,1,2])([0,8.2,3.84999])(CUBOID([1.40,3.1,10.90]));
  var muro_alto_portone_dx = T([0,1,2])([0,13.3,3.84999])(CUBOID([1.40,3.1,10.90]));
  var muro_tra_finestre_sx_basso = T([0,1,2])([0,6.45,6.06])(CUBOID([1.40,1.75,2.81]));
  var muro_tra_finestre_sx_alto = T([0,1,2])([0,6.45,9.95])(CUBOID([1.40,1.75,3.6]));
  var chiusura_alto_centro_sx = T([0,1,2])([0,6.45,14.61])(CUBOID([1.40,1.75,0.13]));
  var muro_tra_finestre_dx_basso = T([0,1,2])([0,16.4,6.06])(CUBOID([1.40,1.25,2.81]));
  var muro_tra_finestre_dx_alto = T([0,1,2])([0,16.4,9.95])(CUBOID([1.40,1.25,3.6]));
  var chiusura_alto_centro_dx = T([0,1,2])([0,16.4,14.61])(CUBOID([1.40,1.25,0.13]));
  var muro_sopra_portone = T([0,1,2])([0,11.3,7.56])(CUBOID([1.40,2,7.2]));

  var p_cornicione1 =[[0,0,0],[0,0,0.40],[0,0,0.55],[0.185,0,0.725],[0,0,0.90],[0,0,0.92],[0.25,0,1.46],[0.1,0,1.46],[0,0,1.46]];
  var p_cornicione2 = p_cornicione1.map(function (p){ return [p[0],p[1]+23.1,p[2]]});
  
  var p_cornicione_inv_sx = [[0,0,0],[0,0,0.40],[0,0,0.55],[0,-0.185,0.725],[0,0,0.90],[0,0,0.92],[0,-0.25,1.46],[0,-0.1,1.46],[0,0,1.46]];
  
  var p_cornicione_inv_dx = [[0,0,0],[0,0,0.40],[0,0,0.55],[0,0.185,0.725],[0,0,0.90],[0,0,0.92],[0,0.25,1.46],[0,0.1,1.46],[0,0,1.46]];
  var p_cornicione_inv_dx_t = p_cornicione_inv_dx.map(function (p){ return [p[0],p[1]+23.1,p[2]]});

  var c_cornicione1 = nubs_s0_NOmapped(p_cornicione1);
  var c_cornicione2 = nubs_s0_NOmapped(p_cornicione2);
  var c_cornicione_inv_sx = nubs_s0_NOmapped(p_cornicione_inv_sx)
  var c_cornicione_inv_dx = nubs_s0_NOmapped(p_cornicione_inv_dx_t)

  var cornicione_fronte = hermite_s1_mapped(c_cornicione1,c_cornicione2,[0,0,0],[0,0,0]);
  var bordo_cornicione_sx = hermite_s1_mapped(c_cornicione1,c_cornicione_inv_sx,[0,0,0],[0,0,0]);
  var bordo_cornicione_dx = hermite_s1_mapped(c_cornicione2,c_cornicione_inv_dx,[0,0,0],[0,0,0]);

  var cornicione = T([0,1,2])([1.41,0.3,10.08])(STRUCT([cornicione_fronte,bordo_cornicione_sx,bordo_cornicione_dx]));

    var p_sottotetto_1 = [[0,0,0],[0.10,0,0.30],[0.15,0,0.30],[0.35,0,0.30],[0.45,0,0.90],[0.55,0,0.90]];
  var p_sottotetto_2 = p_sottotetto_1.map(function (p){ return [p[0],p[1]+23.1,p[2]]});

  var p_sottotetto_color_1 = [[0.55,0,0.90],[0.70,0,0.90],[0.75,0,1]];
  var p_sottotetto_color_2 = p_sottotetto_color_1.map(function (p){ return [p[0],p[1]+23.1,p[2]]});

  var p_sottotetto_inv_sx = [[0,0,0],[0,-0.10,0.30],[0,-0.15,0.30],[0,-0.35,0.30],[0,-0.45,0.90],[0,-0.55,0.90]];
  var p_sottotetto_color_inv_sx = [[0,-0.55,0.90],[0,-0.70,0.90],[0,-0.75,1]];

  var p_sottotetto_inv_dx = [[0,0,0],[0,0.10,0.30],[0,0.15,0.30],[0,0.35,0.30],[0,0.45,0.90],[0,0.55,0.90]];
  var p_sottotetto_inv_dx_t = p_sottotetto_inv_dx.map(function (p){ return [p[0],p[1]+23.1,p[2]]});

  var p_sottotetto_color_inv_dx = [[0,0.55,0.90],[0,0.70,0.90],[0,0.75,1]];
  var p_sottotetto_color_inv_dx_t = p_sottotetto_color_inv_dx.map(function (p){ return [p[0],p[1]+23.1,p[2]]});

  var c_sottotetto_1 = nubs_s0_NOmapped(p_sottotetto_1);
  var c_sottotetto_2 = nubs_s0_NOmapped(p_sottotetto_2);
  var c_sottotetto_color_1 = nubs_s0_NOmapped(p_sottotetto_color_1);
  var c_sottotetto_color_2 = nubs_s0_NOmapped(p_sottotetto_color_2);
  var c_sottotetto_inv_sx = nubs_s0_NOmapped(p_sottotetto_inv_sx);
  var c_sottotetto_color_inv_sx = nubs_s0_NOmapped(p_sottotetto_color_inv_sx);
  var c_sottotetto_inv_dx = nubs_s0_NOmapped(p_sottotetto_inv_dx_t);
  var c_sottotetto_color_inv_dx = nubs_s0_NOmapped(p_sottotetto_color_inv_dx_t);

  var sottotetto_fronte = hermite_s1_mapped(c_sottotetto_1, c_sottotetto_2, [0,0,0], [0,0,0]);
  var sottotetto_fronte_color = hermite_s1_mapped(c_sottotetto_color_1, c_sottotetto_color_2, [0,0,0], [0,0,0]);
  var bordo_sottotetto_sx = hermite_s1_mapped(c_sottotetto_1, c_sottotetto_inv_sx, [0,0,0], [0,0,0]);
  var bordo_sottotetto_sx_color = hermite_s1_mapped(c_sottotetto_color_1, c_sottotetto_color_inv_sx, [0,0,0], [0,0,0]);
  var bordo_sottotetto_dx = hermite_s1_mapped(c_sottotetto_2, c_sottotetto_inv_dx, [0,0,0], [0,0,0]);
  var bordo_sottotetto_dx_color = hermite_s1_mapped(c_sottotetto_color_2, c_sottotetto_color_inv_dx, [0,0,0], [0,0,0]);

  var sottotetto_basso = STRUCT([sottotetto_fronte,bordo_sottotetto_sx,bordo_sottotetto_dx]);
  var sottotetto_alto_color = COLOR(marrone_tetto)(STRUCT([sottotetto_fronte_color,bordo_sottotetto_sx_color,bordo_sottotetto_dx_color])); 

  var sottotetto_completo = T([0,1,2])([1.4,0.3,14.72])(STRUCT([sottotetto_basso,sottotetto_alto_color]));

  var p_tetto_base = [[0,0,0],[0,15,0],[0,24.6,0]]
  var p_tetto_vertice = [[0,12.29,15],[0,12.30,15],[0,12.31,15]]

  var c_tetto_base = nubs_s0_NOmapped(p_tetto_base);
  var c_tetto_vertice = nubs_s0_NOmapped(p_tetto_vertice);

  var tettoia = T([1])([-0.75])(hermite_s1_mapped(c_tetto_base,c_tetto_vertice,[0,0,0],[0,0,0]));

  var p_profilo_chiusura = [[0,0,0],[0.12,0,0],[0.20,0,0],[0.20,0,2],[0.20,0,18],[0.12,0,18],[0,0,18]];
  var c_profilo_chiusura = nubs_s0_NOmapped(p_profilo_chiusura);
  var r_surf_chiusura = ROTATIONAL_SURFACE(c_profilo_chiusura);
  var corpo = MAP(r_surf_chiusura)(r_domain);

  var chiusura_tetto_1 = T([0,1,2])([0,-0.75,0])((R([1,2])([-39.5*(PI/180)])(STRUCT([corpo]))));
  var chiusura_tetto_2 = T([0,1,2])([0,23.85,0])((R([1,2])([39.5*(PI/180)])(STRUCT([corpo]))));  

  var tetto = COLOR(marrone_tetto)(T([0,1,2])([2.15,0.4,15.72])(R([0,2])([-55*(PI/180)])(STRUCT([tettoia, chiusura_tetto_1, chiusura_tetto_2]))));

  var lastra_finestre = COLOR(vetro_finestre)(T([0,1,2])([-0.2,0.4,0])(CUBOID([0.2,22.5,15])));

  var comignolo1 = COLOR(grigio_colonna)(T([0,1,2])([-0.05,5,17])(CUBOID([0.59,0.59,1.16])));
  var comignolo2 = COLOR(grigio_colonna)(T([0,1,2])([-0.05,19,17])(CUBOID([0.59,0.59,1.16])));

  var sost_statua1_a = CUBOID([0.77,0.77,0.55]);
  var sost_statua1_b = T([0,1,2])([-0.07,-0.07,0.55])(CUBOID([0.91,0.91,0.05]));
  var sost_statua = STRUCT([sost_statua1_a, sost_statua1_b])

  var sost_statua_sx = COLOR(grigio_colonna)(T([0,1,2])([4,5.9,11.9])(sost_statua));
  var sost_statua_centro = COLOR(grigio_colonna)(T([0,1,2])([4,11.9,15.1])(sost_statua));
  var sost_statua_dx = COLOR(grigio_colonna)(T([0,1,2])([4,17.9,11.9])(sost_statua));

  var pareti_facciata = COLOR(beige_mura)(STRUCT([sottotetto_completo,cornicione,parete_facciata_sx, parete_facciata_dx,muro_sottoscala_corpo,base_centro_portone_sx,base_centro_portone_dx,
                                                     muro_alto_finestra_centro_sx,muro_alto_finestra_centro_dx,muro_alto_portone_sx, muro_alto_portone_dx, muro_tra_finestre_sx_basso,
                                                     muro_tra_finestre_sx_alto, chiusura_alto_centro_sx,muro_tra_finestre_dx_basso, muro_tra_finestre_dx_alto, chiusura_alto_centro_dx, muro_sopra_portone]))

  var facciate = T([0,1,2])([x,y,z])(STRUCT([tetto,lastra_finestre,pareti_facciata, comignolo1, comignolo2, sost_statua_sx, sost_statua_centro, sost_statua_dx]))
  return facciate;
}

function pareti_facciata_a_quattro (x,y,z,a) {

  var blocco_base1_sx = SIMPLEX_GRID([[1.70],[5.70],[0.70]])
  var blocco_base2_sx = SIMPLEX_GRID([[1.55],[-0.15,5.70],[-0.6999,0.5]])
  var blocco_sottofinestra_sx = SIMPLEX_GRID([[1.4],[-0.30,5.70],[-1.19999,0.21]])
  var blocco_sinistro_alto_sx = SIMPLEX_GRID([[1.4],[-0.30,2.70],[-1.40999,13.20]])
  var blocco_centro_finestre_sx = SIMPLEX_GRID([[1.4],[-3,1.28],[-2.58999,1.58]])
  var blocco_destro_alto_sx = SIMPLEX_GRID([[1.4],[-4.27,1.73],[-1.40999,13.20]])
  var blocco_centro_finestre_alto_sx = SIMPLEX_GRID([[1.4],[-3,1.28],[-6.81999,6.48]])
  var blocco_chiusura_alto_sx = SIMPLEX_GRID([[1.4],[-0.30,5.70],[-14.60999,0.13]])
  
  var parete_facciata_sx = STRUCT([blocco_base1_sx, blocco_base2_sx, blocco_sottofinestra_sx, blocco_sinistro_alto_sx, blocco_destro_alto_sx, blocco_centro_finestre_sx,blocco_centro_finestre_alto_sx, blocco_chiusura_alto_sx]);
  
  var blocco_base1_dx = SIMPLEX_GRID([[1.70],[5.70],[0.70]])
  var blocco_base2_dx = SIMPLEX_GRID([[1.55],[5.55],[-0.6999,0.5]])
  var blocco_sottofinestra_dx = SIMPLEX_GRID([[1.4],[5.4],[-1.19999,0.21]])
  var blocco_sinistro_alto_dx = SIMPLEX_GRID([[1.4],[2.4],[-1.40999,13.20]])
  var blocco_centro_finestre_dx = SIMPLEX_GRID([[1.4],[-2.4,1.28],[-2.58999,1.58]])
  var blocco_destro_alto_dx = SIMPLEX_GRID([[1.4],[-3.67,1.73],[-1.40999,13.20]])
  var blocco_centro_finestre_alto_dx = SIMPLEX_GRID([[1.4],[-2.4,1.28],[-6.81999,6.48]])
  var blocco_chiusura_alto_dx = SIMPLEX_GRID([[1.4],[5.4],[-14.60999,0.13]])


  var parete_facciata_dx = T([0,1,2])([0,18,0])(STRUCT([blocco_base1_dx, blocco_base2_dx, blocco_sottofinestra_dx, blocco_sinistro_alto_dx, blocco_destro_alto_dx, blocco_centro_finestre_dx,blocco_centro_finestre_alto_dx, blocco_chiusura_alto_dx]));

  function muro_sottoscala_corpo (x,y,z) {

    var muro_sx = SIMPLEX_GRID([[1.4],[6.1],[2.9]]);
    var muro_dx = SIMPLEX_GRID([[1.4],[-7.1,6.1],[2.9]]);

    var p_arco_sottoscala_ext = [[0,0,2],[0,0.5,2.9],[0,1,2]];
    var p_arco_sottoscala_int = p_arco_sottoscala_ext.map(function (p){ return [p[0]+1.40,p[1],p[2]]});

    var p_tetto_arco_sottoscala_ext = [[0,0,2.9],[0,0.5,2.9],[0,1,2.9]];
    var p_tetto_arco_sottoscala_int = p_tetto_arco_sottoscala_ext.map(function (p){ return [p[0]+1.40,p[1],p[2]]});

    var c_arco_sottoscala_ext = nubs_s0_NOmapped(p_arco_sottoscala_ext);
    var c_tetto_arco_sottoscala_ext = nubs_s0_NOmapped(p_tetto_arco_sottoscala_ext);
    var c_arco_sottoscala_int = nubs_s0_NOmapped(p_arco_sottoscala_int);
    var c_tetto_arco_sottoscala_int = nubs_s0_NOmapped(p_tetto_arco_sottoscala_int);

    var arco_sottoscala_ext = hermite_s1_mapped(c_arco_sottoscala_ext, c_tetto_arco_sottoscala_ext, [0,0,0], [0,0,0]);
    var arco_sottoscala_int = hermite_s1_mapped(c_arco_sottoscala_int, c_tetto_arco_sottoscala_int, [0,0,0], [0,0,0]);
    var chiusura_sup_arco = hermite_s1_mapped(c_tetto_arco_sottoscala_ext, c_tetto_arco_sottoscala_int, [0,0,0], [0,0,0]);
    var chiusura_inf_arco = hermite_s1_mapped(c_arco_sottoscala_ext, c_arco_sottoscala_int,  [0,0,0], [0,0,0]);

    var arco = STRUCT([arco_sottoscala_ext, arco_sottoscala_int, chiusura_inf_arco, chiusura_sup_arco]);
    var porta = T([1])([6.1])(arco);

    var muro_sottoscala_corpo = T([0,1,2])([x,y,z])(STRUCT([porta, muro_sx, muro_dx]));
    return muro_sottoscala_corpo;
  }

  var muro_sottoscala_corpo = muro_sottoscala_corpo(0,5.7,0)


  var base_centro_portone_sx = SIMPLEX_GRID([[1.4],[-5.7,5.60],[-2.8999,0.95]]);
  var base_centro_portone_dx = SIMPLEX_GRID([[1.4],[-13.3,5.60],[-2.8999,0.95]]);

  var muro_alto_finestra_centro_sx = SIMPLEX_GRID([[1.4],[-5.7,1.25],[-3.84999,10.90]]);
  var muro_alto_finestra_centro_dx = SIMPLEX_GRID([[1.4],[-17.65,1.25],[-3.84999,10.90]]);

  var muro_alto_portone_sx1 = SIMPLEX_GRID([[1.4],[-8.2,0.9],[-3.84999,10.90]]);
  var muro_alto_portone_sx2 = SIMPLEX_GRID([[1.4],[-10.4,0.9],[-3.84999,10.90]]);

  var muro_alto_portone_dx1 = SIMPLEX_GRID([[1.4],[-13.3,0.9],[-3.84999,10.90]]);
  var muro_alto_portone_dx2 = SIMPLEX_GRID([[1.4],[-15.5,0.9],[-3.84999,10.90]]);

  var muro_tra_finestre_sx_basso1 = SIMPLEX_GRID([[1.4],[-6.45,1.75],[-6.06,2.81]]);
  var muro_tra_finestre_sx_basso2 = SIMPLEX_GRID([[1.4],[-9.1,1.75],[-6.06,2.81]]);

  var muro_tra_finestre_sx_alto1 = SIMPLEX_GRID([[1.4],[-6.45,1.75],[-9.95,3.6]]);
  var muro_tra_finestre_sx_alto2 = SIMPLEX_GRID([[1.4],[-9.1,1.75],[-9.95,3.6]]);

  var chiusura_alto_centro_sx1 = SIMPLEX_GRID([[1.4],[-6.45,1.75],[-14.61,0.13]]);
  var chiusura_alto_centro_sx2 = SIMPLEX_GRID([[1.4],[-9.1,1.75],[-14.61,0.13]]);

  var muro_tra_finestre_dx_basso1 = SIMPLEX_GRID([[1.4],[-16.4,1.35],[-6.06,2.81]]);
  var muro_tra_finestre_dx_basso2 = SIMPLEX_GRID([[1.4],[-14.2,1.35],[-6.06,2.81]]);

  var muro_tra_finestre_dx_alto1 = SIMPLEX_GRID([[1.4],[-16.4,1.35],[-9.95,3.6]]);
  var muro_tra_finestre_dx_alto2 = SIMPLEX_GRID([[1.4],[-14.2,1.35],[-9.95,3.6]]);

  var chiusura_alto_centro_dx1 = SIMPLEX_GRID([[1.4],[-16.4,1.25],[-14.61,0.13]]);
  var chiusura_alto_centro_dx2 = SIMPLEX_GRID([[1.4],[-14.2,1.25],[-14.61,0.13]]);

  var muro_sopra_portone = SIMPLEX_GRID([[1.4],[-11.3,2],[-7.56,7.2]]);

  var p_cornicione1 =[[0,0,0],[0,0,0.40],[0,0,0.55],[0.185,0,0.725],[0,0,0.90],[0.25,0,1.46],[0.1,0,1.46],[0,0,1.46]];
  var p_cornicione2 = p_cornicione1.map(function (p){ return [p[0],p[1]+23.1,p[2]]});
  
  var p_cornicione_inv_sx = [[0,0,0],[0,0,0.40],[0,0,0.55],[0,-0.185,0.725],[0,0,0.90],[0,-0.25,1.46],[0,-0.1,1.46],[0,0,1.46]];
  
  var p_cornicione_inv_dx = [[0,0,0],[0,0,0.40],[0,0,0.55],[0,0.185,0.725],[0,0,0.90],[0,0.25,1.46],[0,0.1,1.46],[0,0,1.46]];
  var p_cornicione_inv_dx_t = p_cornicione_inv_dx.map(function (p){ return [p[0],p[1]+23.1,p[2]]});

  var c_cornicione1 = nubs_s0_NOmapped(p_cornicione1);
  var c_cornicione2 = nubs_s0_NOmapped(p_cornicione2);
  var c_cornicione_inv_sx = nubs_s0_NOmapped(p_cornicione_inv_sx)
  var c_cornicione_inv_dx = nubs_s0_NOmapped(p_cornicione_inv_dx_t)

  var cornicione_fronte = hermite_s1_mapped(c_cornicione1,c_cornicione2,[0,0,0],[0,0,0]);
  var bordo_cornicione_sx = hermite_s1_mapped(c_cornicione1,c_cornicione_inv_sx,[0,0,0],[0,0,0]);
  var bordo_cornicione_dx = hermite_s1_mapped(c_cornicione2,c_cornicione_inv_dx,[0,0,0],[0,0,0]);

  var cornicione = T([0,1,2])([1.41,0.3,10.08])(STRUCT([cornicione_fronte,bordo_cornicione_sx,bordo_cornicione_dx]));


  var p_sottotetto_1 = [[0,0,0],[0.10,0,0.30],[0.15,0,0.30],[0.35,0,0.30],[0.45,0,0.90],[0.55,0,0.90]];
  var p_sottotetto_2 = p_sottotetto_1.map(function (p){ return [p[0],p[1]+23.1,p[2]]});

  var p_sottotetto_color_1 = [[0.55,0,0.90],[0.70,0,0.90],[0.75,0,1]];
  var p_sottotetto_color_2 = p_sottotetto_color_1.map(function (p){ return [p[0],p[1]+23.1,p[2]]});

  var p_sottotetto_inv_sx = [[0,0,0],[0,-0.10,0.30],[0,-0.15,0.30],[0,-0.35,0.30],[0,-0.45,0.90],[0,-0.55,0.90]];
  var p_sottotetto_color_inv_sx = [[0,-0.55,0.90],[0,-0.70,0.90],[0,-0.75,1]];

  var p_sottotetto_inv_dx = [[0,0,0],[0,0.10,0.30],[0,0.15,0.30],[0,0.35,0.30],[0,0.45,0.90],[0,0.55,0.90]];
  var p_sottotetto_inv_dx_t = p_sottotetto_inv_dx.map(function (p){ return [p[0],p[1]+23.1,p[2]]});

  var p_sottotetto_color_inv_dx = [[0,0.55,0.90],[0,0.70,0.90],[0,0.75,1]];
  var p_sottotetto_color_inv_dx_t = p_sottotetto_color_inv_dx.map(function (p){ return [p[0],p[1]+23.1,p[2]]});

  var c_sottotetto_1 = nubs_s0_NOmapped(p_sottotetto_1);
  var c_sottotetto_2 = nubs_s0_NOmapped(p_sottotetto_2);
  var c_sottotetto_color_1 = nubs_s0_NOmapped(p_sottotetto_color_1);
  var c_sottotetto_color_2 = nubs_s0_NOmapped(p_sottotetto_color_2);
  var c_sottotetto_inv_sx = nubs_s0_NOmapped(p_sottotetto_inv_sx);
  var c_sottotetto_color_inv_sx = nubs_s0_NOmapped(p_sottotetto_color_inv_sx);
  var c_sottotetto_inv_dx = nubs_s0_NOmapped(p_sottotetto_inv_dx_t);
  var c_sottotetto_color_inv_dx = nubs_s0_NOmapped(p_sottotetto_color_inv_dx_t);

  var sottotetto_fronte = hermite_s1_mapped(c_sottotetto_1, c_sottotetto_2, [0,0,0], [0,0,0]);
  var sottotetto_fronte_color = hermite_s1_mapped(c_sottotetto_color_1, c_sottotetto_color_2, [0,0,0], [0,0,0]);
  var bordo_sottotetto_sx = hermite_s1_mapped(c_sottotetto_1, c_sottotetto_inv_sx, [0,0,0], [0,0,0]);
  var bordo_sottotetto_sx_color = hermite_s1_mapped(c_sottotetto_color_1, c_sottotetto_color_inv_sx, [0,0,0], [0,0,0]);
  var bordo_sottotetto_dx = hermite_s1_mapped(c_sottotetto_2, c_sottotetto_inv_dx, [0,0,0], [0,0,0]);
  var bordo_sottotetto_dx_color = hermite_s1_mapped(c_sottotetto_color_2, c_sottotetto_color_inv_dx, [0,0,0], [0,0,0]);

  var sottotetto_basso = STRUCT([sottotetto_fronte,bordo_sottotetto_sx,bordo_sottotetto_dx]);
  var sottotetto_alto_color = COLOR(marrone_tetto)(STRUCT([sottotetto_fronte_color,bordo_sottotetto_sx_color,bordo_sottotetto_dx_color])); 

  var sottotetto_completo = T([0,1,2])([1.4,0.3,14.72])(STRUCT([sottotetto_basso,sottotetto_alto_color]));

  var p_tetto_base = [[0,0,0],[0,15,0],[0,25.1,0]]
  var p_tetto_vertice = [[0,12.54,15],[0,12.55,15],[0,12.56,15]]

  var c_tetto_base = nubs_s0_NOmapped(p_tetto_base);
  var c_tetto_vertice = nubs_s0_NOmapped(p_tetto_vertice);
  var tettoia = hermite_s1_mapped(c_tetto_base,c_tetto_vertice,[0,0,0],[0,0,0]);

  var tetto = COLOR(marrone_tetto)(T([0,1,2])([2.15,-0.6,15.72])(R([0,2])([-55*(PI/180)])(tettoia)));

  var lastra_finestre = COLOR(vetro_finestre)(T([0,1,2])([-0.2,0.4,0])(CUBOID([0.2,22.5,15])));

  var comignolo1 = COLOR(grigio_colonna)(T([0,1,2])([-0.05,5,17])(CUBOID([0.59,0.59,1.16])));

  var sost_statua1_a = CUBOID([0.77,0.77,0.55]);
  var sost_statua1_b = T([0,1,2])([-0.07,-0.07,0.55])(CUBOID([0.91,0.91,0.05]));
  var sost_statua = STRUCT([sost_statua1_a, sost_statua1_b])

  var sost_statua_sx = COLOR(grigio_colonna)(T([0,1,2])([4,5.9,11.9])(sost_statua));
  var sost_statua_centro = COLOR(grigio_colonna)(T([0,1,2])([4,11.9,15.1])(sost_statua));
  var sost_statua_dx = COLOR(grigio_colonna)(T([0,1,2])([4,17.9,11.9])(sost_statua));

  var pareti_facciata = COLOR(beige_mura)(STRUCT([sottotetto_completo,cornicione,parete_facciata_sx, parete_facciata_dx,muro_sottoscala_corpo,base_centro_portone_sx,base_centro_portone_dx,
                                                     muro_alto_finestra_centro_sx,muro_alto_finestra_centro_dx,muro_alto_portone_sx1,muro_alto_portone_sx2, muro_alto_portone_dx1,muro_alto_portone_dx2, muro_tra_finestre_sx_basso1,
                                                     muro_tra_finestre_sx_basso2, muro_tra_finestre_sx_alto1, muro_tra_finestre_sx_alto2, chiusura_alto_centro_sx1,chiusura_alto_centro_sx2,muro_tra_finestre_dx_basso1, muro_tra_finestre_dx_basso2,
                                                     muro_tra_finestre_dx_alto1,muro_tra_finestre_dx_alto2, chiusura_alto_centro_dx1, chiusura_alto_centro_dx2, muro_sopra_portone]));
  
  var pareti_facciate = T([0,1,2])([x,y,z])(STRUCT([tetto,lastra_finestre,pareti_facciata, comignolo1, sost_statua_sx, sost_statua_centro, sost_statua_dx]))
  return pareti_facciate;
}

//Cupola della villa
function cupola (x,y,z) {
  
  var p_profilo_cupola_1 = [[5.5,0,0],[5.5,0,1],[5.5,0,1.7]]
  var c_profile_1 = nubs_s0_NOmapped(p_profilo_cupola_1);
  var c_r_surf_1 = ROTATIONAL_SURFACE(c_profile_1);
  var c_surface_1 = MAP(c_r_surf_1)(r_domain);

  var p_profilo_cupola_2 = [[5.5,0,1.7],[5,0,1.85],[4.5,0,2]]
  var c_profile_2 = nubs_s0_NOmapped(p_profilo_cupola_2);
  var c_r_surf_2 = ROTATIONAL_SURFACE(c_profile_2);
  var c_surface_2 = MAP(c_r_surf_2)(r_domain);

  var p_profilo_cupola_3 = [[4.5,0,2],[4.5,0,2.12],[4.5,0,2.24]]
  var c_profile_3 = nubs_s0_NOmapped(p_profilo_cupola_3);
  var c_r_surf_3 = ROTATIONAL_SURFACE(c_profile_3);
  var c_surface_3 = MAP(c_r_surf_3)(r_domain);

  var p_profilo_cupola_4 = [[4.5,0,2.24],[4.32,0,2.34],[4.14,0,2.44]]
  var c_profile_4 = nubs_s0_NOmapped(p_profilo_cupola_4);
  var c_r_surf_4 = ROTATIONAL_SURFACE(c_profile_4);
  var c_surface_4 = MAP(c_r_surf_4)(r_domain);

  var p_profilo_cupola_5 = [[4.14,0,2.44],[4.14,0,2.56],[4.14,0,2.68]]
  var c_profile_5 = nubs_s0_NOmapped(p_profilo_cupola_5);
  var c_r_surf_5 = ROTATIONAL_SURFACE(c_profile_5);
  var c_surface_5 = MAP(c_r_surf_5)(r_domain);

  var p_profilo_cupola_6 = [[4.14,0,2.68],[3.96,0,2.78],[3.78,0,2.88]]
  var c_profile_6 = nubs_s0_NOmapped(p_profilo_cupola_6);
  var c_r_surf_6 = ROTATIONAL_SURFACE(c_profile_6);
  var c_surface_6 = MAP(c_r_surf_6)(r_domain);

  var p_profilo_cupola_7 = [[3.78,0,2.88],[3.78,0,3.03],[3.78,0,3.18]]
  var c_profile_7 = nubs_s0_NOmapped(p_profilo_cupola_7);
  var c_r_surf_7 = ROTATIONAL_SURFACE(c_profile_7);
  var c_surface_7 = MAP(c_r_surf_7)(r_domain);

  var p_profilo_cupola_8 = [[3.78,0,3.18],[3.38,0,3.43],[2.98,0,3.68]]
  var c_profile_8 = nubs_s0_NOmapped(p_profilo_cupola_8);
  var c_r_surf_8 = ROTATIONAL_SURFACE(c_profile_8);
  var c_surface_8 = MAP(c_r_surf_8)(r_domain);

  var p_profilo_cupola_9 = [[2.98,0,3.68],[2.98,0,3.8],[2.98,0,3.92]]
  var c_profile_9 = nubs_s0_NOmapped(p_profilo_cupola_9);
  var c_r_surf_9 = ROTATIONAL_SURFACE(c_profile_9);
  var c_surface_9 = MAP(c_r_surf_9)(r_domain);

  var p_profilo_cupola_10 = [[2.98,0,3.92],[2.63,0,4.12],[2.28,0,4.32]]
  var c_profile_10 = nubs_s0_NOmapped(p_profilo_cupola_10);
  var c_r_surf_10 = ROTATIONAL_SURFACE(c_profile_10);
  var c_surface_10 = MAP(c_r_surf_10)(r_domain);

  var p_profilo_cupola_11 = [[2.28,0,4.32],[2.28,0,4.40],[2.28,0,4.48]]
  var c_profile_11 = nubs_s0_NOmapped(p_profilo_cupola_11);
  var c_r_surf_11 = ROTATIONAL_SURFACE(c_profile_11);
  var c_surface_11 = MAP(c_r_surf_11)(r_domain);

  var p_profilo_cupola_12 = [[2.28,0,4.48],[1.93,0,4.68],[1.58,0,4.88]]
  var c_profile_12 = nubs_s0_NOmapped(p_profilo_cupola_12);
  var c_r_surf_12 = ROTATIONAL_SURFACE(c_profile_12);
  var c_surface_12 = MAP(c_r_surf_12)(r_domain);

  var p_profilo_cupola_13 = [[1.58,0,4.88],[1.58,0,4.93],[1.58,0,4.98]]
  var c_profile_13 = nubs_s0_NOmapped(p_profilo_cupola_13);
  var c_r_surf_13 = ROTATIONAL_SURFACE(c_profile_13);
  var c_surface_13 = MAP(c_r_surf_13)(r_domain);

  var p_profilo_cupola_14 = [[1.58,0,4.98],[1.23,0,5.18],[0.88,0,5.38]]
  var c_profile_14 = nubs_s0_NOmapped(p_profilo_cupola_14);
  var c_r_surf_14 = ROTATIONAL_SURFACE(c_profile_14);
  var c_surface_14 = MAP(c_r_surf_14)(r_domain);

  var p_profilo_cupola_15 = [[0.88,0,5.38],[0.88,0,5.53],[0.88,0,5.68]]
  var c_profile_15 = nubs_s0_NOmapped(p_profilo_cupola_15);
  var c_r_surf_15 = ROTATIONAL_SURFACE(c_profile_15);
  var c_surface_15 = MAP(c_r_surf_15)(r_domain);

  var p_profilo_cupola_16 = [[0.88,0,5.68],[0.90,0,5.68],[0.92,0,5.68],[0.92,0,5.70],[0.92,0,5.72],[0.90,0,5.72],[0.88,0,5.72],
                            [0.78,0,5.82],[0.68,0,5.92],[0.48,0,6.09],[0.28,0,6.22],[0.28,0,6.34],[0.38,0,6.44],[0.48,0,6.54],[0.48,0,6.59],
                            [0.48,0,6.64],[0.20,0,6.74],[0.15,0,6.79],[0.14,0,6.84],[0.1,0,6.94],[0.05,0,6.98],[0,0,7]];
  var c_profile_16 = nubs_s0_NOmapped(p_profilo_cupola_16);
  var c_r_surf_16 = ROTATIONAL_SURFACE(c_profile_16);
  var c_surface_16 = MAP(c_r_surf_16)(r_domain);

  var giri = COLOR(beige_mura)(STRUCT([c_surface_1,c_surface_3,c_surface_5,c_surface_7,c_surface_9,c_surface_11,c_surface_13,c_surface_15]))

  var mattonato = COLOR(marrone_tetto)(STRUCT([c_surface_2,c_surface_4,c_surface_6,c_surface_8,c_surface_10,
                                 c_surface_12, c_surface_14, c_surface_16]));

  var cupola = T([0,1,2])([x,y,z])(STRUCT([giri, mattonato]))
return cupola
}

//giardino che circonda la villa
  var giardino_pietra = COLOR(verde_prato)(T([0,1,2])([-41.6,-18.5,-0.01])(CUBOID([50,50,0.05])));

//Costruzione villa dai pezzi precedenti
//Contruzione della parte frontale di ogni facciata, uguale per tutti e quattro i lati
  var pavimento_ingresso = pavimento(-5.9,1.4,2.9);

  var basamento_fronte_sx = basamento(0,0,0);
  var gradinata_fronte = gradinata(6.99,1.12+10.39+0.3,0,PI)
  var basamento_fronte_dx = basamento(0,1.12+10.39,0)
  var scalinata_fronte = STRUCT([basamento_fronte_sx,gradinata_fronte,basamento_fronte_dx])

  var colonna1 = colonna(-0.53,0.89,3.25);
  var colonna2 = colonna(-0.53,0.89+2.3,3.25); 
  var colonna3 = colonna(-0.53,0.89+2.3+2.3,3.25); 
  var colonna4 = colonna(-0.53,0.89+2.3+2.3+2.3,3.25); 
  var colonna5 = colonna(-0.53,0.89+2.3+2.3+2.3+2.33,3.25); 
  var colonna6 = colonna(-0.53,12.36,3.25); 
  var colonnato = STRUCT([colonna1,colonna2,colonna3,colonna4,colonna5,colonna6]);

  var sottoscala_sx = pilastri_sottoscala(-1.79,0,0);
  var sottoscala_dx = pilastri_sottoscala(-1.79,1.12+10.39,0);
  var sottoscala_porta = muro_sottoscala(-1,1,0);
  var sottoscala = STRUCT([sottoscala_sx,sottoscala_dx, sottoscala_porta]);

  var arco_laterale_s = arco_laterale_sx(-5.04,0.3,3.10);
  var arco_laterale_d = arco_laterale_dx(-5.04,10.39+1.54,3.10);

  var solaio = solaio(-5.04,0.37,10.09);
  var sottotetto = sottotetto(-4.99, 0.365, 10.99);

  var frontone = frontone(0.1,-0.05,11.2)

  var fronte = STRUCT([colonnato, frontone, sottotetto,solaio,pavimento_ingresso, scalinata_fronte, sottoscala, arco_laterale_s,arco_laterale_d]);


  //Posizionamento di ogni parte

  var pareti_facciata_nord_ovest = pareti_facciata_a_due(-6.35,-5.71,0);
  var fronte_nord_ovest = fronte
  var vista_nord_ovest = STRUCT([pareti_facciata_nord_ovest, fronte_nord_ovest]);

  var pareti_facciata_sud_ovest = pareti_facciata_a_quattro(-6.35,-5.71,0);
  var fronte_sud_ovest = fronte
  var vista_sud_ovest = T([0,1,2])([-10.35,22.64,0])(R([0,1])([PI/2])(STRUCT([pareti_facciata_sud_ovest, fronte_nord_ovest])));


  var sud_nord_ovest = STRUCT([vista_nord_ovest,vista_sud_ovest])
  var sud_nord_est = T([0,1,2])([-32.98,12.3,0])(R([0,1])([PI])(sud_nord_ovest));
  var cupola = cupola(-16.5,6.3,20.5)


  var villa = STRUCT([sud_nord_ovest,sud_nord_est,cupola,giardino_pietra])
  DRAW(villa)

