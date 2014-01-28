!(function (exports){

var fs = require('fs');

var plasm_lib = require('plasm.js');
var obj = plasm_lib.plasm;
var fun = plasm_lib.plasm_fun;
var plasm = obj.plasm;
var Plasm = obj.Plasm;

var root = this;

Object.keys(fun).forEach(function (k) { 
  root[k] = fun[k];
});

var p = new Plasm();
fun.PLASM(p);


var scmodel = (function () {
/////////////////////////////////////////////
//#################colori####################

var coloreIntonaco = [1.5,1.5,1.5]; 
var colorePavimenti = [244/255, 164/255, 96/255];
var colorePavimentiEsterni = [254/255, 254/255, 240/255];
var coloreBordini = [245/255,245/255,245/255];
var coloreBordiniScuri = [170/255,170/255,170/255];
var coloreBordiniChiari = [235/255,215/255,200/255];
var coloreColonne = [255/255,235/255,205/255];
var coloreTimpano = coloreBordini;
var coloreFregioSottoTimpano = [235/255,235/255,205/255];
var coloreTetti = [254/255,111/255,94/255];
var colorePuntale = coloreBordini;
var colorePortico = [220/255,200/255,200/255];
var coloreVetri = [168/255,245/255,245/255,0.5];
var coloreLineaPortico = coloreColonne;
var coloreGrigliaBuco = coloreBordiniScuri;
var colorePrato = [0/255, 165/255, 80/255];

//#################utilities#################

var resMapHRes = {
  "capitello" : [20,20],
  "blocco" : [12,15],
  "bloccoBase" : [8,5],
  "retroArco" : [30,3],
  "cunetta" : [15,1],
  "cunettaAlta" : [42,1],
  "cupolaPortico" : [42,20],
  "soffittoPortico" : [1,42],
  "puntale" : [25,4],
  "gradiniCircolari" : [64],
  "rosone" : [64]
};
var resMapMRes = {
  "capitello" : [20,20],
  "blocco" : [12,10],
  "bloccoBase" : [8,4],
  "retroArco" : [30,3],
  "cunetta" : [10,1],
  "cunettaAlta" : [28,1],
  "cupolaPortico" : [28,28],
  "soffittoPortico" : [1,28],
  "puntale" : [15,4],
  "gradiniCircolari" : [32],
  "rosone" : [32]
};
var resMapLRes = {
  "capitello" : [10,10],
  "blocco" : [6,3],
  "bloccoBase" : [6,3],
  "retroArco" : [10,3],
  "cunetta" : [10,1],
  "cunettaAlta" : [18,1],
  "cupolaPortico" : [18,18],
  "soffittoPortico" : [1,18],
  "puntale" : [8,4],
  "gradiniCircolari" : [8],
  "rosone" : [16]
};

var resMap = resMapHRes;


var mkSphere = function(r,n){
  var d = DOMAIN([[0,PI],[0,2*PI]])([n,2*n]);

  var map = function (p){
    var alfa = p[0]-(PI/2);
    var beta = p[1];

    var x = r*COS(alfa)*COS(beta);
    var y = r*COS(alfa)*SIN(beta);
    var z = r*SIN(alfa);

    return [x,y,z];
  }
  var m = MAP(map)(d);


  return m;
}

var mkSolidDisk = function(r,h,n){
  r = r || 1;
  h = h || 1;
  n = n || 16;

  var disk2D = DISK(r)([n,1]);
  var solidDisk = EXTRUDE([h])(disk2D);

  return solidDisk;
}

var mkKnotsG2 = function (cpoints){
  var knots = [0,0,0];

  var segNum = cpoints.length -2;

  for(var i =1; i <= segNum; i++){
    knots.push(i);

    if(i == segNum){
      knots.push(i);
      knots.push(i);
    }
  }

  return knots;
}

  //crea la parte della corona circolare di raggio interno rInt e raggio esterno rEst
  //che va da alfa1 a alfa2, campionata n volte, e estrusa di h.
var mkPartOfCoronaCircolare = function(rInt,rEst,h,alfa1,alfa2,n){
  var domain = DOMAIN([[rInt,rEst],[alfa1,alfa2],[0,1]])([1,n,1]);

  var mapping = function(p){
    var r = p[0];
    var alfa = p[1];
    var dh = p[2];
    return [r*COS(alfa),r*SIN(alfa),h*dh];
  }
  return MAP(mapping)(domain);
}

  //crea la forma che si ottiene prendendo il quadrato di lato r con vertice in basso a sinistra nell'origine,
  //e sottraendo ad esso la parte nel primo quadrante della circonferenza di raggio r centrata nell'origine.
  //poi estrude dello spessore in input (spess)
  //n e' il numero di slices della circonferenza.
var mkComplementareQuartoDiCirconferenzaSolido = function(r,spess,n){

  var points = [[r,r]];
  var alfa;
  var p;

  for (var i =0; i<=n; i++){
    alfa = (i*PI/2)/(n);

    p = [r*COS(alfa),r*SIN(alfa)];
    points.push(p);
  }

  var compl2D = TRIANGLE_FAN(points);

  var compl = EXTRUDE([spess])(compl2D);
  return compl;
}


var mkKnotsG1 = function (cpoints){
  var knots = [0,0];

  var segNum = cpoints.length -1;

  for(var i =1; i <= segNum; i++){
    knots.push(i);

    if(i == segNum){
      knots.push(i);
    }
  }

  return knots;
}

var mkNub = function(cp,grade,sel){
  sel = sel || S0;
  grade = grade || 1;

  if (grade == 1 ){
    return NUBS(sel)(1)(mkKnotsG1(cp))(cp);
  } else {
    return NUBS(sel)(2)(mkKnotsG2(cp))(cp);
  }
}

var mkNubG2 = function(cp,sel){
  sel = sel || S0;
  return NUBS(sel)(2)(mkKnotsG2(cp))(cp);
}
var mkNubG1 = function(cp,sel){
  sel = sel || S0;
  return NUBS(sel)(1)(mkKnotsG1(cp))(cp);
}
var mkBezier = function(cp,sel){
  sel = sel || S0;
  return BEZIER(sel)(cp);
};

var mkNubG1SurfaceWithCPoints = function (cps){
  var handles = cps.map(function(cp){return mkNubG1(cp,S0);});
  return mkNubG1(handles,S1);
}
var mkNubSurfaceWithCPointsAndGrades = function (cps, curvesGrade, surfGrade){
  curvesGrade = curvesGrade || 1;
  surfGrade = surfGrade || 1;

  var handles = cps.map(function(cp){return mkNub(cp,curvesGrade,S0);});
  return mkNub(handles,surfGrade,S1);
}
var mkBezSurfaceWithCPointsAndCurveGrades = function (cps, curvesGrade){
  curvesGrade = curvesGrade || 1;

  var handles = cps.map(function(cp){return mkNub(cp,curvesGrade,S0);});
  return mkBezier(handles,S1);
}

var D11 = DOMAIN([[0,1],[0,1]]);

var scorrimentoProfilo = function(cp,scorrXY,scorrXZ,manualMinMaxes){ //scorrimento X relaivo a Y, scorrimento X relativo a Z
  var sxy = scorrXY || 0;
  var sxz = scorrXZ || 0;

  var p = cp[0];
  var z;
  var y;

  var zmax = p[2];
  var zmin = p[2];
  var ymax = p[1];
  var ymin = p[1];

  for(var i in cp){
    p = cp[i];
    z = p[2];
    y = p[1];
    z>zmax ? zmax = z : zmax = zmax ;
    z<zmin ? zmin = z : zmin = zmin ;
    y>ymax ? ymax = y : ymax = ymax ;
    y<ymin ? ymin = y : ymin = ymin ;
  }

  if (manualMinMaxes == undefined){
    manualMinMaxes = [undefined,undefined,undefined,undefined];
  }
  var manualYMin = manualMinMaxes[0];
  var manualYMax = manualMinMaxes[1];
  var manualZMin = manualMinMaxes[2];
  var manualZMax = manualMinMaxes[3];

  ymin = manualYMin || ymin;
  ymax = manualYMax || ymax;
  zmin = manualZMin || zmin;
  zmax = manualZMax || zmax;

  return cp.map(function(p){return [p[0]+(sxy*((p[1]-ymin)/ymax))+(sxz*((p[2]-zmin)/zmax)),p[1],p[2]];});
}

var doubleCP = function(arr){

  var ret = [arr[0]];

  for(var i = 1; i<arr.length-1; i++){
    ret.push(arr[i]);
    ret.push(arr[i]);
  }
  ret.push(arr[arr.length-1]);

  return ret;
}

var puntoMedio = function(points){
  var x = 0;
  var y = 0;
  var z = 0;
  var l = points.length;

  for(var i = 0; i<l; i++){
    x += points[i][0];
    y += points[i][2];
    z += points[i][2];
  }

  return [x/l,y/l,z/l];
}

  //prende in input un array composto da punti in formato [x,y,z], restituisce un array con i punti traslati dei valori in input
var traslaPunti = function (arr,x,y,z){
  x = x || 0;
  y = y || 0;
  z = z || 0;

  return arr.map(function(p){return [p[0]+x,p[1]+y,p[2]+z];});
}

  //prende in input un array composto da punti in formato [x,y,z], restituisce un array con i punti scalati dei valori in input
var scalaPunti = function (arr,x,y,z){

  if(x === 0) {x = 0;}
    else {x = x || 1;}

  if(y === 0) {y = 0;}
    else {y = y || 1;}

  if(z === 0) {z = 0;}
    else {z = z || 1;}
  return arr.map(function(p){return [p[0]*x,p[1]*y,p[2]*z];});
}

var ribaltaXPunti = function(arr){
  return arr.map(function(p){return [-p[0],p[1],p[2]];});
}

var ribaltaYPunti = function(arr){
  return arr.map(function(p){return [p[0],-p[1],p[2]];});
}

  //crea il bordo inclinato per combinazione lineare (simula una proiezione), dopo cp2
  //es:     |           <-cp1
  //   cp2->        |/   <- result
var proiezioneConCombinazioneLineare = function (cp1,cp2,delta,manualMinMaxes){
  if(cp1.length != cp2.length){
    throw "arrays' length differs, cannot combine";
  }
  
  var p = cp2[0];
  var z;
  var y;
  
  if (manualMinMaxes == undefined){   
    var zmax = p[2];
    var zmin = p[2];
    var ymax = p[1];
    var ymin = p[1];


    for(var i in cp2){
      p = cp2[i];
      z = p[2];
      y = p[1];
      z>zmax ? zmax = z : zmax = zmax ;
      z<zmin ? zmin = z : zmin = zmin ;
      y>ymax ? ymax = y : ymax = ymax ;
      y<ymin ? ymin = y : ymin = ymin ;
    }
  } else {
      var ymin = manualMinMaxes[0];
      var ymax = manualMinMaxes[1];
      var zmin = manualMinMaxes[2];
      var zmax = manualMinMaxes[3];
  }
  
  // calcolo la distanza tra i due estremi
  var dx = cp2[0][0] - cp1[0][0];
  var dz = cp2[0][2] - cp1[0][2];
  var dist = Math.sqrt((dz*dz) + (dx*dx));
  
  //il massimo valore di lambda per ottenere il punto distante "delta" da cp2
  var maxLambdaOver1 = (delta/dist);

  var lambdaMin = 1;
  var lambda;
  var pret;
  var ret = [];

  var p1;
  var p2;
  for(var i = 0; i<cp1.length; i++){
    p1 = cp1[i];
    p2 = cp2[i];

    lambda = ((p2[2]-zmin)/(zmax-zmin)) * maxLambdaOver1;
    lambda += lambdaMin;

    pret = [  ((p2[0]*lambda) + (p1[0]*(1-lambda)) ),
           p2[1],//(p2[1]*lambda + p1[1]*(1-lambda) ),
          ((p2[2]*lambda) + (p1[2]*(1-lambda)) )];

    ret.push(pret);
  }

  return ret;
}

var mkProfiloConScorrimento = function(profilo,l,scorrXY,scorrXZ){

  l = l || 0;
  scorrXY = scorrXY || 0;
  scorrXZ = scorrXZ || 0;


  var prof1Obliquo = scorrimentoProfilo(profilo,-scorrXY,-scorrXZ);
  var prof1Muro = scalaPunti(prof1Obliquo,1,0,1);

  var prof2Obliquo = traslaPunti(scalaPunti(prof1Obliquo,-1,1,1),l,0,0);
  var prof2Muro = scalaPunti(prof2Obliquo,1,0,1);

  var surf = mkNubSurfaceWithCPointsAndGrades([prof1Muro,prof1Obliquo,prof2Obliquo,prof2Muro],1,1);

  return MAP(surf)(D11([profilo.length-1,3]));

}

//################################################################################# ELEMENTS #################################################################################

var mkPuntale = function(type){
      var cuboPunta = T([0,1])([-0.25,-0.25])(CUBOID([0.5,0.5,0.5]));
      var cuboPunta2 = T([0,1])([-0.2,-0.2])(CUBOID([0.4,0.4,0.6]));

      
      var parteSuperiore;

      if(type == "tondo"){

        parteSuperiore = mkSphere(0.25,resMap["puntale"][0]);
        parteSuperiore.translate([2],[0.6+0.25]);


      } else {
        var profiloParteSuperiore = [[0.05,0,0.6],[0.2,0,0.65],[0.2,0,0.8],[0.05,0,1],[0.05,0,1.2],[0.05,0,1.2],[0,0,1.2]];
        var baseParteSuperiore = [[1,1,0],[1,-1,0],[-1,-1,0],[-1,1,0],[1,1,0]];

        var superioreSurf = PROFILEPROD_SURFACE([mkNubG2(profiloParteSuperiore,S0),mkNubG1(baseParteSuperiore,S1)]);
        parteSuperiore = MAP(superioreSurf)(D11(resMap["puntale"]));
      }

      var antenna = POLYLINE([[0,0,0],[0,0,3]]);
        antenna.color([0,0,0]);

      var puntale = STRUCT([cuboPunta,cuboPunta2,parteSuperiore]);
        puntale.color(colorePuntale);
        
      return STRUCT([puntale,antenna]);
}

var mkFinestra = function (l,h,conVetro,conDavanzale,conCornicione){

  l = l || 1.7;
  h = h || 2.7
  if(conVetro === undefined){
    conVetro = true;
  }
  if(conDavanzale === undefined){
    conDavanzale = true;
  }
  if(conCornicione === undefined){
    conCornicione = true;
  }

  var distaccoMuro = 0.05;

  var spVetro = 0.05;
  var sp1 = 0.1; //interno y
  var sp2 = 0.12;
  var sp3 = 0.14;
  var sp4 = 0.2; //esterno

  var l1 = 0.04; //interno x
  var l2 = 0.06;
  var l3 = 0.07;
  var l4 = 0.03; //esterno

  var vert4 = SIMPLEX_GRID([[l4,-(l-2*l4),l4],            [-distaccoMuro,sp4-distaccoMuro],[h]]);
  var vert3 = SIMPLEX_GRID([[-l4,l3,-(l-2*(l4+l3)),l3],       [-distaccoMuro,sp3-distaccoMuro],[h]]);
  var vert2 = SIMPLEX_GRID([[-l4,-l3,l2,-(l-2*(l4+l3+l2)),l2],    [-distaccoMuro,sp2-distaccoMuro],[h]]);
  var vert1 = SIMPLEX_GRID([[-l4,-l3,-l2,l1,-(l-2*(l4+l3+l2+l1)),l1], [-distaccoMuro,sp1-distaccoMuro],[h]]);
  
  var orizz4 = SIMPLEX_GRID([[-l4,l-2*l4],[-distaccoMuro,sp4-distaccoMuro],[-(h-(l4)),l4]]);
  var orizz3 = SIMPLEX_GRID([[-(l4+l3),l-2*(l4+l3)],[-distaccoMuro,sp3-distaccoMuro],[-(h-(l4+l3)),l3]]);
  var orizz2 = SIMPLEX_GRID([[-(l4+l3+l2),l-2*(l4+l3+l2)],[-distaccoMuro,sp2-distaccoMuro],[-(h-(l4+l3+l2)),l2]]);
  var orizz1 = SIMPLEX_GRID([[-(l4+l3+l2+l1),l-2*(l4+l3+l2+l1)],[-distaccoMuro,sp1-distaccoMuro],[-(h-(l4+l3+l2+l1)),l1]]);

  var hdav = 0.2; 
  var ldav = 0.2;
  var profiloDavanzale = [[0,0,0],[0,0.5*ldav,0.5*hdav],[0,0.7*ldav,0.5*hdav],[0,0.7*ldav,0.7*hdav],[0,1*ldav,0.9*hdav],[0,1*ldav,1*hdav],[0,0,1*hdav]];

  var lcorn = 0.3;
  var hcorn = 0.5;
  //var profiloCornicione = [[0,0,0],[0,0.2*lcorn,0.1*hcorn],[0,0.35*lcorn,0.5*hcorn],[0,0.6*lcorn,0.65*hcorn],[0,0.75*lcorn,0.65*hcorn],[0,0.75*lcorn,0.8*hcorn],[0,0.85*lcorn,0.8*hcorn],[0,0.85*lcorn,0.85*hcorn],[0,1*lcorn,0.95*hcorn],[0,1*lcorn,1*hcorn],[0,0,1*hcorn]];
  var profiloCornicione = [[0,0,0],[0,0.2*lcorn,0.1*hcorn],[0,0.2*lcorn,0.2*hcorn],[0,0.1*lcorn,0.5*hcorn],[0,0.4*lcorn,0.65*hcorn],[0,0.75*lcorn,0.65*hcorn],[0,0.75*lcorn,0.8*hcorn],[0,0.85*lcorn,0.8*hcorn],[0,0.85*lcorn,0.85*hcorn],[0,1*lcorn,0.95*hcorn],[0,1*lcorn,1*hcorn],[0,0,1*hcorn]];

  var sforoDavanzale = 0.1;
  var sforoCornicione = 0.25;

  var davanzale = mkProfiloConScorrimento(profiloDavanzale,l,sforoDavanzale,0);
  var cornicione = mkProfiloConScorrimento(profiloCornicione,l,sforoCornicione,0);
    
    davanzale.translate([1,2],[0.1,-hdav]);
    cornicione.translate([1,2],[0.1,h]);

  var vetro = COLOR(coloreVetri)(T([2])([-0.01])(SIMPLEX_GRID([[l],[spVetro],[h+0.01]])));
    //vetro.color(coloreVetri);

  var davanzaleInterno = COLOR(colorePavimenti)(T([1,2])([-(0.1),-0.1])(SIMPLEX_GRID([[l],[0.2],[0.1]])));

  var compFinestraScura = [vert1,vert2,vert3,vert4,orizz1,orizz2,orizz3,orizz4];
    if(conDavanzale){
      compFinestraScura.push(davanzale);
    }

  var finestraScura = STRUCT(compFinestraScura);
    finestraScura.color(coloreBordiniScuri);

  var finestraChiara = cornicione; //STRUCT([cornicione]);
    finestraChiara.color(coloreBordini);

  var componenti = [finestraScura];
    if(conVetro){
      componenti.push(vetro);
    }
    if(conCornicione){
      componenti.push(cornicione);
    }
    if(conDavanzale){
      componenti.push(davanzaleInterno);
    }

    finestra = STRUCT(componenti).scale([1],[-1]);

  return finestra;
}

var mkFinestraAlta = function(l,h){

  h = h || 1;
  l = l || 1.3;

  var corniceInternaOrizz = SIMPLEX_GRID([[-2.5,l+0.2,-2.5],[-0.2,0.1],[-2,-0.2,-0.3,-0.7,-2.7,-3.2,0.2,-h,0.2]]);
  var corniceInternaVert = SIMPLEX_GRID([[-2.4,-0.1,0.1,-l,0.1,-0.1,-2.4],[-0.2,0.1],[-2,-0.2,-0.3,-0.7,-2.7,-3.2,-0.2,h]]);

//  var corniceEsternaOrizz = SIMPLEX_GRID([[-2.4,0.3,-1.1,0.3,-2.4],[-0.2,0.1],[-2,-0.2,-0.3,-0.7,-2.7,-3.2,-0.2,-1,-0.1,0.1]]);
  var corniceEsternaVert = SIMPLEX_GRID([[-2.4,0.1,-0.1,-l,-0.1,0.1,-2.4],[-0.2,0.1],[-2,-0.2,-0.3,-0.7,-2.7,-3.2,0.3,-(h-0.2),0.3]]);

  //spessore raffinamento
  var sr = 0.03
  //profondità raffinamento
  var pr = 0.02

  var raffCorniceEsternaOrizz = SIMPLEX_GRID([[-2.4,l+0.4,-2.4],[-(0.2-pr),pr],[-2,-0.2,-0.3,-0.7,-2.7,-3.2,sr,-(0.2-sr),-h,-(0.2-sr),sr]]);
  var raffCorniceInternaOrizz = SIMPLEX_GRID([[-2.4,0.1+sr,-(0.1-sr),-l,-(0.1-sr),0.1+sr,-2.4],[-(0.2-pr),pr],[-2,-0.2,-0.3,-0.7,-2.7,-(3.5-sr),sr,-(h-0.2),sr]]);

  var raffCorniceInternaVert = SIMPLEX_GRID([[-2.4,-0.1,sr,-(0.1-sr),-l,-(0.1-sr),sr,-0.1,-2.4],[-(0.2-pr),pr],[-2,-0.2,-0.3,-0.7,-2.7,-3.2,-0.2,-0.1,(h-0.2)]]);
  var raffCorniceEsternaVert = SIMPLEX_GRID([[-2.4,sr,-(0.1-sr),-0.1,-l,-0.1,-(0.1-sr),sr,-2.4],[-(0.2-pr),pr],[-2,-0.2,-0.3,-0.7,-2.7,-3.2,-sr,(0.2-sr),(0.1-sr),-sr,-(h-0.2),-sr,(0.2-sr),(0.1-sr)]]);
  
  var raffInternoOrizz = SIMPLEX_GRID([[-(2.6-sr),sr,l,sr,-(2.6-sr)],[-(0.2-pr),pr],[-2,-0.2,-0.3,-0.7,-2.7,-3.2,-(0.2-sr),sr,-h,sr]]);
  var raffInternoVert = SIMPLEX_GRID([[-(2.6-sr),sr,-l,sr],[-(0.2-pr),pr],[-2,-0.2,-0.3,-0.7,-2.7,-3.2,-0.2,h]]);
  
  

  var cornice = STRUCT([corniceEsternaVert,corniceInternaVert,corniceInternaOrizz]);
  cornice.color(coloreBordini);
  
  var raffinamentoCornice = STRUCT([raffCorniceInternaOrizz,raffCorniceEsternaOrizz,raffCorniceEsternaVert,raffCorniceInternaVert,raffInternoVert,raffInternoOrizz]);
  raffinamentoCornice.color(coloreBordiniScuri);

  var davanzale =  SIMPLEX_GRID([[-2.5,l+0.2,-2.5],[-0.3,0.2],[-2,-0.2,-0.3,-0.7,-2.7,-3.2,-0.1,0.1,]]);
  davanzale.color(colorePavimenti);


  var vetro = SIMPLEX_GRID([[-2.5,l+0.2],[-0.25,0.05],[-2.2,-0.3,-0.7,-2.7,-3.2,-0.2,h]]);
    vetro.color(coloreVetri);

  var finestra = STRUCT([cornice,davanzale,raffinamentoCornice,vetro]);

  return finestra;

}


var mkCustomBlocco = function (cpoints,spessore,n1,n2,durezzaCurva,grado){ //control points sul piano X,Z ! (y = 0 per ogni punto) , 0 = usa valore di default.
  if(cpoints == undefined){
    console.log("NO CONTROL POINTS FOR THIS BLOCK!")
    return undefined;
  }

  var spess = spessore || 0.2;
  var n = n1 || resMap["blocco"][0];
  var durezza = durezzaCurva || 2;
  var g = grado || 2;

  var detail = n2 || resMap["blocco"][1];

  var domain2 = D11([n,detail]);

  var base = mkNub(cpoints,g,S0);


  var csopra = cpoints.map(function(p){return [p[0],spess,p[2]]});
  var sopra = mkNub(csopra,g,S0);



  var xEnd = 0;
  var yEnd = spess;
  var zEnd = 0;

  for (var i in cpoints){
    xEnd += cpoints[i][0];
    zEnd += cpoints[i][2];
  }

  xEnd = xEnd/cpoints.length;
  zEnd = zEnd/cpoints.length;

  pEnd = [xEnd,yEnd,zEnd];


  var puntoDiChiusura = function(){return pEnd;}

  var controls = [base];
  for(var i = 0; i<durezza; i++){
    controls.push(sopra);
  }
  controls.push(puntoDiChiusura);

  var surf = BEZIER(S1)(controls);

  var dsurf = MAP(surf)(domain2);

  return dsurf;
}
var mkBloccoBase = function(cps){
  return mkCustomBlocco(cps,0.5,cps.length-1,resMap["bloccoBase"][1],4,1);
}

var mkBlocco = function(spess,l,h){

  var ll = l || 0.8;
  var hh = h || 0.35;
  var spessore = spess || 0.3;


  var cbase = [[ll/2,0,hh],[ll*0.3/2,0,hh],[0,0,hh],[0,0,hh/2],[0,0,0],[ll*0.3/2,0,0],[ll*1.7/2,0,0],[ll,0,0],[ll,0,hh/2],[ll,0,hh],[ll*1.7/2,0,hh],[ll/2,0,hh]];

  return mkCustomBlocco(cbase,spessore);

}

var mkGrigliaBuco = function(){
  var linee = [];
  var dimGriglia = 1.4;
  var distLinee = 0.2;
  var nLinee = 7;

  var dg = dimGriglia;

  for (var i = 1; i<=nLinee; i++){
    var x = i*distLinee;
    var cx = dimGriglia - x;

      linee.push(POLYLINE([[0,0,x],[x,0,0]]));
      linee.push(POLYLINE([[0,0,cx],[x,0,dg]]));
    if(i!=nLinee){
      linee.push(POLYLINE([[cx,0,0],[dg,0,x]]));
      linee.push(POLYLINE([[cx,0,dg],[dg,0,cx]]));
    }
  }

  return COLOR(coloreGrigliaBuco)(STRUCT(linee));
}

var mkBucoConPietre = function(type){

  //parte sopra : b1 , b2 , b3 , b2 , b1

  var profB1 = [[0,0,0],[0.5,0,0],[0.3,0,0.4],[0,0,0.4],[0,0,0]];
  var profB2 = [[0.5,0,0],[0.3,0,0.4],[0.7,0,0.4],[0.8,0,0],[0.5,0,0]];
  var profB3 = [[0.7,0,0.4],[0.8,0,0],[1.1,0,0],[1.2,0,0.4],[0.7,0,0.4]];

  var profB4 = [[0,0,0],[0.41,0,0],[0.41,0,0.4],[0,0,0.4],[0,0,0]];
  var profB5 = [[0.41,0,0.4],[0.1,0,0.4],[0.1,0,0.8],[0.41,0,0.8],[0.41,0,0.4]];

  //var profBBase = [[0.41,0,0],[1.49,0,0],[1.49,0,0.4],[0.41,0,0.4],[0.41,0,0]];
  var profBBase = [[0.4,0,0],[1.5,0,0],[1.5,0,0.4],[0.4,0,0.4],[0.4,0,0]];

  var b1 = T([2])([1.6-0.01])(mkBloccoBase(profB1));
  var b2 = T([2])([1.6-0.01])(mkBloccoBase(profB2));
  var b3 = T([2])([1.6-0.01])(mkBloccoBase(profB3));
  var b4 = mkBloccoBase(profB4);
  var b5 = mkBloccoBase(profB5);

  var b6 = T([2])([0.8])(b4);
  var b7 = T([2])([0.8])(b5);

  var bBase = mkBloccoBase(profBBase);

  var lato = STRUCT([b1,b2,b4,b5,b6,b7]);
  var lato2 = T([0])([1.9])(S([0])([-1])(lato));

  var pietreBuco = COLOR(coloreColonne)(T([1])([0.5])(S([1])([-1])(STRUCT([lato,lato2,b3,bBase]))));
  
  var elementi = [pietreBuco];

  if (type != "pieno"){
    var griglia = T([0,1,2])([0.4-0.15,0.15,0.4-0.1])(mkGrigliaBuco());
    var retroBuio = COLOR([0,0,0])(SIMPLEX_GRID([[1.9],[-0.5,0.1],[2]]));
    elementi.push(griglia);
    elementi.push(retroBuio);
  } else {
    var tappo = COLOR(coloreIntonaco)(SIMPLEX_GRID([[-0.4,1.1],[-0.25,0.1],[1.6]]));
    elementi.push(tappo);
  }

  return STRUCT(elementi);
}

var mkAngoloDiPietre = function(){
  var mkBloccoQuadrato = function(l,h){
    var spess = l/2;
    var b1 = mkBlocco(spess,l,h);
    var b2 = S([1])([-1])(b1);

    return T([1])([spess])(STRUCT([b1,b2]));
  }

  var trasl = T([2])([0.4]);

  var b1 = mkBloccoQuadrato(0.6,0.4);
  var b2 = mkBloccoQuadrato(0.4,0.4);

  var angolo = STRUCT([b1,trasl,b2,trasl,b1,trasl,b2,trasl,b1]);

  return angolo;
}

var mkTorre = function (){
    var muriTorreFronteA =  SIMPLEX_GRID([[-0.3,2.4,-1.7,2.4],[-0.3,0.1],[-2,-0.2,0.3,9.7]]);
    var muriTorreFronteB =  SIMPLEX_GRID([[-0.3,-2.4,1.7    ],[-0.3,0.1],[-2,-0.2,0.3,0.7,-2.7,3.5,-2.7,0.1]]);

    var muriTorreSxA =    SIMPLEX_GRID([[-0.3,0.1     ],[-0.3,-0.1,2.3,-1.7,2.4],[-2,-0.2,0.3,9.7]]);
    var muriTorreSxB =    SIMPLEX_GRID([[-0.3,0.1     ],[-0.3,-2.4,1.7],[-2,-0.2,0.3,0.7,-2.7,3.5,-2.7,0.1]]);

//    var muroTorreDxA =    SIMPLEX_GRID([[-0.3,-6.4,0.1  ],[-0.3,(6.5-1.3)/2,-1.3,(6.5-1.3)/2],[-2,-0.2,0.3,9.7]]);
//    var muroTorreDxB =    SIMPLEX_GRID([[-0.3,-6.4,0.1  ],[-0.3,-(6.5-1.3)/2,1.3,-(6.5-1.3)/2],[-2,-0.2,-2.5,7.5]]);
    var dimPortaDx = 0.9;
    var muroTorreDxA =    SIMPLEX_GRID([[-0.3,-6.4,0.1  ],[-0.3,(6.5-dimPortaDx)/2,-dimPortaDx,(6.5-dimPortaDx)/2],[-2,-0.2,0.3,9.7]]);
    var muroTorreDxB =    SIMPLEX_GRID([[-0.3,-6.4,0.1  ],[-0.3,-(6.5-dimPortaDx)/2,dimPortaDx,-(6.5-dimPortaDx)/2],[-2,-0.2,-2.3,7.8]]);
    var muroTorreRetro =  SIMPLEX_GRID([[-0.3,6.4     ],[-0.3,-6.4,0.1],[-2,-0.2,0.3,9.7]]);

    //--------------
    var muriTorre = STRUCT([muriTorreFronteA,muriTorreFronteB,muriTorreSxA,muriTorreSxB,muroTorreDxA,muroTorreDxB,muroTorreRetro]);
    muriTorre.color(coloreIntonaco);
    //--------------

    var pavimentoTorreTerra = SIMPLEX_GRID([[-0.3,6.5],[-0.3,6.5],[-2,-0.1,0.1]]);
    var pavimentoTorrePrimo = SIMPLEX_GRID([[-0.3,-0.1,6.3],[-0.3,-0.1,6.3],[-2,-0.2,-0.3,-5,0.1]]);
    var soffittoTorre =     SIMPLEX_GRID([[-0.3,6.5],[-0.3,6.5],[-2,-0.2,-0.3,-9.7,0.1]]);

    //--------------
    var pavimentoTorre = STRUCT([pavimentoTorrePrimo,pavimentoTorreTerra,soffittoTorre]);
    pavimentoTorre.color(colorePavimenti);
    //--------------

    var bordinoSoffittoFronte =    SIMPLEX_GRID([[-0.2,6.7],[-0.2,0.1,-6.5,0.1],[-2,-0.2,-0.3,-9.7,0.3]]);
    var bordinoSoffittoLato =      SIMPLEX_GRID([[-0.2,0.1,-6.5,0.1],[-0.3,6.5],[-2,-0.2,-0.3,-9.7,0.3]]);

    var bordinoFinestraSottoFronte = SIMPLEX_GRID([[-0.25,6.6],[-0.25,0.05],[-2,-0.5,-0.5,0.2]]);
    var bordinoFinestraSottoSx =   SIMPLEX_GRID([[-0.25,0.05],[-0.3,6.5],[-2,-0.5,-0.5,0.2]]);

    var bordinoBaseTorreFronte =   SIMPLEX_GRID([[-0.2,6.7],[-0.2,0.1],[-2,-0.2,0.3]]);
    var bordinoBaseTorreSx =     SIMPLEX_GRID([[-0.2,0.1],[-0.3,6.5],[-2,-0.2,0.3]]);

    var bordinoBaseTorreEsternoFronte = SIMPLEX_GRID([[6.8],[0.3],[-2,0.2]]);
    var bordinoBaseTorreEsternoSx =   SIMPLEX_GRID([[0.3],[-0.3,6.5],[-2,0.2]]);

    var xtorre = 6.5;
    var ytorre = 6.5;

    var profiloBordinoAlto = [[0,0,0],[0,0.07,0],[0,0.09,0.025],[0,0.09,0.065],[0,0.125,0.075],[0,0.125,0.1],[0,0,0.1]];
    var pbaObliquo1 = profiloBordinoAlto.map(function(p){return [p[1]+xtorre/2+0.1,p[1]+ytorre/2+0.1,p[2]]});

    var pbaObliquo2 = ribaltaXPunti(pbaObliquo1);
    var pbaObliquo3 = ribaltaYPunti(pbaObliquo1);
    var pbaObliquo4 = ribaltaYPunti(pbaObliquo2);

    var pbaCP = [pbaObliquo1,pbaObliquo2,pbaObliquo4,pbaObliquo3,pbaObliquo1];


    var bordinoAltoNub = mkNubSurfaceWithCPointsAndGrades(pbaCP,1,1);
    var bordinoAlto = MAP(bordinoAltoNub)(D11([pbaObliquo1.length-1,4]));
      bordinoAlto.translate([0,1,2],[xtorre/2 + 0.3,ytorre/2 + 0.3,2.2+10+0.3]);

    //--------------
    var bordini = STRUCT([bordinoFinestraSottoSx,bordinoFinestraSottoFronte,bordinoBaseTorreSx,bordinoBaseTorreFronte,bordinoSoffittoFronte,bordinoSoffittoLato,
                bordinoBaseTorreEsternoFronte,bordinoBaseTorreEsternoSx,bordinoAlto]);
    bordini.color(coloreBordini);
    //--------------


    var btFronte =  SIMPLEX_GRID([[-0.1,0.2,2.6,-1.3,2.6],[-0.1,0.1],[2]]);
    var btFronte2 =  SIMPLEX_GRID([[-0.1,-0.2,-2.6,1.3,-2.6],[-0.1,0.1],[-1.6,0.4]]);
    var btSx =    SIMPLEX_GRID([[-0.1,0.1],[-0.1,-0.1,0.1,2.5,-1.5,2.5],[2]]);
    var btSx2 =     SIMPLEX_GRID([[-0.1,0.1],[-0.1,-0.1,-0.1,-2.5,1.5,-2.5],[-1.6,0.4]]);

    //--------------
    var baseTorre = STRUCT([btFronte,btFronte2,btSx,btSx2]);
    baseTorre.color(coloreIntonaco);
    //--------------

    //--------------
    var bucoBaseFronte = T([0])([0.3+2.6-0.4])(mkBucoConPietre());
    //--------------

    //--------------
    var bucoBaseSx = R([0,1])([-PI/2])(S([0])([-1])(T([0])([0.3+2.6-0.4])(mkBucoConPietre("pieno"))));
    //--------------

    //--------------
    var angoloDiPietre = COLOR(coloreColonne)(mkAngoloDiPietre());
    //--------------

    var mkTettoTorre = function(){
      var xtetto = 7.1;
      var ytetto = 7.1;
      var htetto = 1.7;
      var puntaTetto = [xtetto/2,ytetto/2,htetto];

      var ftetto = function(p){
        var z = p[2];

        if (z>0){ return puntaTetto;}
        else {return p;}
        
      };

      var tetto = CUBOID([xtetto,ytetto,htetto]);
        tetto = MAP(ftetto)(tetto);
        tetto.color(coloreTetti);

      var puntale = mkPuntale();
        puntale.translate([0,1,2],[xtetto/2,ytetto/2,1.55]);
      return STRUCT([tetto,puntale]);
    }

    var finestraBassaFronte = mkFinestra();
      finestraBassaFronte.translate([0,1,2],[0.3+2.4,0.3+0.1,2.2+0.3+0.7+0.001]);

    var finestraAltaFronte = mkFinestraAlta(1.5,2.5);
      finestraAltaFronte.translate([0,2],[0.2,0.2]);

    //--------------
    var finestreFronte = STRUCT([finestraAltaFronte,finestraBassaFronte]);
    //--------------


    //--------------
    var finestreLato = T([1])([(0.3+2.4)*2+1.7])(R([0,1])([-PI/2])(finestreFronte));
    //--------------


    //--------------
    var tettoTorre = mkTettoTorre();
    //--------------
      tettoTorre.translate([0,1,2],[0,0,2.2+10+0.3+0.1]);

    var torre = STRUCT([muriTorre,pavimentoTorre,bordini,baseTorre,tettoTorre,finestreFronte,finestreLato,bucoBaseFronte,bucoBaseSx,angoloDiPietre]);

    return torre;
}


var mkElementoFacciata = function(){

  var muriFacciataFronteA =   SIMPLEX_GRID([[2.5,-1.5,0.2],[-0.3,0.1],[-2,-0.2,0.3,0.7,2.7,3.4,1,0.2,0.2]]);
  var muriFacciataFronteB =   SIMPLEX_GRID([[-2.5,1.5    ],[-0.3,0.1],[-2,-0.2,0.3,0.7,-2.7,3.3,-1.1,-0.1,0.1,0.2]]);

  var bordinoFinestraSottoFronte = SIMPLEX_GRID([[4.2],[-0.25,0.05],[-2,-0.5,-0.5,0.2]]);
  var bordinoBaseTorreFronte =   SIMPLEX_GRID([[4.2],[-0.2,0.1],[-2,-0.2,0.3]]);

  var bordinoSoffittoFronte =    SIMPLEX_GRID([[4.2],[-0.2,0.1],[-2,-0.2,-0.3,-8.2,0.3]]);

  var bordinoBaseFacciataEsternoFronte = SIMPLEX_GRID([[4.2],[0.3],[-2,0.2]]);


  var baseFacciataFronte =  SIMPLEX_GRID([[2.7,-1.1,0.4],[-0.1,0.1],[2]]);
  var baseFacciataFronte2 =  SIMPLEX_GRID([[-2.7,1.1,-0.4],[-0.1,0.1],[-1.6,0.4]]);


  var intonaco = STRUCT([muriFacciataFronteB,muriFacciataFronteA,baseFacciataFronte,baseFacciataFronte2]);
  intonaco.color(coloreIntonaco);

  var finestraAlta = mkFinestraAlta();

  var bordi = STRUCT([bordinoFinestraSottoFronte,bordinoBaseTorreFronte,bordinoSoffittoFronte,bordinoBaseFacciataEsternoFronte]);
  bordi.color(coloreBordini);

  var finestraBassa = mkFinestra();
    finestraBassa.translate([0,1,2],[2.4,0.3+0.1,2.2+0.3+0.7+0.001]);

  var buco = T([0])([2.3])(mkBucoConPietre());

  var elem = STRUCT([intonaco,bordi,finestraAlta,finestraBassa,buco]);

  return elem;
}


var mkCapitello = function(){

  var l = 0.8;
  var h = 0.35;

  lcurv = 0.4;
  hcurv = 0.8;

  var spess = 0.3;

  var cpOrizz = [[0,0,0],[spess*(1-hcurv),0,0],[spess,0,0],[spess,l*(lcurv),0],[spess,l*(1-lcurv),0],[spess,l,0],[spess*(1-hcurv),l,0],[0,l,0]];
  
  var cpVert = [[0,0,0],[1,0,0],[1,0,h*0.05],[1,0,h*0.6],[0.5,0,h*0.7],[0.5,0,h*0.75],[0.7,0,h*0.85],[0.7,0,h*0.93],[0.5,0,h*1],[0,0,h*1]];


  var ctrasl = cpOrizz.map(function(p){return [p[0],(p[1]-l/2),p[2]];});  

  var profiloVert = NUBS(S0)(2)(mkKnotsG2(cpVert))(cpVert);
  var profiloOrizz = NUBS(S1)(2)(mkKnotsG2(ctrasl))(ctrasl);

  var dom2 = D11(resMap["capitello"]);

  var capitello = MAP(PROFILEPROD_SURFACE([profiloVert,profiloOrizz]))(dom2);
  
  capitello.rotate([0,1],[PI/2]);
  capitello.translate([0],[l/2]);

  return capitello;
};


var mkColonna = function (){
  var hcapitello = 0.35;

  var bCircularDetail = 12;

  var b = mkBlocco();

  var capitello = mkCapitello();
  var capitelloAlto = S([2])([-1])(capitello);
  capitelloAlto.translate([2],[14*0.35 + 2*hcapitello]);
  b.translate([2],[hcapitello]);


  var blocks = [b];
  for(var i = 1; i<14; i++){
    b = b.clone().translate([2],[0.35]);
    blocks.push(b);
  }
  var colonna = STRUCT(blocks);

  colonna = STRUCT([colonna,capitello,capitelloAlto]);

  colonna.rotate([0,1],[PI]);
  colonna.translate([0,1],[0.8,0.4]);

  return colonna;
}


var mkArcata = function (){

    var bCircularDetail = 10;

    //var cpb0 = [[-0.2,0,0.01],[0+0.1,0,0.01],[0.3,0,0.01],[0.3,0,0.12],[0.3,0,0.23],[0.3,0,0.34],[0,0,0.34],[-0.2,0,0.34],[-0.2,0,0.01]];

    var cpb1 = doubleCP([[0,0,0],[0.31,0,0],[0.31,0,0.3],[0,0,0.35],[0,0,0]]);
    var cpb2 = doubleCP([[0.31,0,0.3],[0,0,0.35],[0,0,0.7],[0.1,0,0.7],[0.35,0,0.5],[0.31,0,0.3]]);
    var cpb3 = doubleCP([[0,0,0.7],[0.1,0,0.7],[0.35,0,0.5],[0.5,0,0.8],[0.2,0,1.05],[0,0,1.05],[0,0,0.7]]);
    var cpb4 = doubleCP([[0.5,0,0.8],[0.2,0,1.05],[0,0,1.05],[0,0,1.4],[0.2,0,1.4],[0.6,0,1.4],[0.8,0,1.05],[0.5,0,0.8]]);
    var cpb5 = doubleCP([[0.6,0,1.4],[0.8,0,1.05],[1.1,0,1.2],[0.85,0,1.75],[0.6,0,1.75],[0.6,0,1.4]]);
    var cpb6 = doubleCP([[1.1,0,1.2],[0.85,0,1.75],[1.25,0,1.75],[1.35,0,1.25],[1.1,0,1.2]]);

    var cpb8 = doubleCP([[0,0,1.4],[0.6,0,1.4],[0.6,0,1.75],[0,0,1.75],[0,0,1.4]]);

    var cpChiave = doubleCP([[1.25,0,1.75],[1.35,0,1.2],[1.4,0,1.1],[1.6,0,1.1],[1.65,0,1.2],[1.75,0,1.75],[1.25,0,1.75]]);

    //var cpRetroArcoA = [[0,0,0],[0.3,0,0],[0.3,0,0],[0.3,0,0.3],[0.35,0,0.5],[0.5,0,0.8],[0.8,0,1.05],[1.1,0,1.2],[1.35,0,1.25],[1.4,0,1.25],[1.4,0,1.25],[1.4,0,1.75],[1.4,0,1.75],[0,0,1.75],[0,0,1.75],[0,0,0]];
    var cpRetroArcoA = [[0.3,0,0],[0.3,0,0.3],[0.35,0,0.5],[0.5,0,0.8],[0.8,0,1.05],[1.1,0,1.2],[1.35,0,1.25],[1.4,0,1.25],[1.4,0,1.25],[1.4,0,1.75],[1.4,0,1.75],[0.3,0,1.75],[0.3,0,1.75],[0.3,0,0]];
    var cpRetroArcoB = traslaPunti(cpRetroArcoA,0,0.9,0);
    var pDiChiusuraA = [0.3,0,1.7];
    var pDiChiusuraB = [0.3,0.9,1.7];

    var chiusuraFronte = [pDiChiusuraA,pDiChiusuraA,pDiChiusuraA];
    var chiusuraRetro = [pDiChiusuraB,pDiChiusuraB,pDiChiusuraB];

    var b0 = mkBlocco(0.2,0.6,0.33);
      b0.translate([0,2],[-0.3,0.01]);
      b0.translate([2],[0.35]);

    var b0s = [b0];

    for(var i = 0; i<8; i++){
      b0 = b0.clone().translate([2],[0.35]);
      b0s.push(b0);
    }

    var colonnina = STRUCT(b0s);
      colonnina.scale([1],[-1]);

    var b1 = mkCustomBlocco(cpb1,0.2,bCircularDetail+2);
    var b2 = mkCustomBlocco(cpb2,0.2,bCircularDetail+4);
    var b3 = mkCustomBlocco(cpb3,0.2,bCircularDetail);
    var b4 = mkCustomBlocco(cpb4,0.2,bCircularDetail+2);
    var b5 = mkCustomBlocco(cpb5,0.2,bCircularDetail+2);
    var b6 = mkCustomBlocco(cpb6,0.2,bCircularDetail);

    var b8 = mkCustomBlocco(cpb8,0.2,bCircularDetail+2);
      
    var arco = STRUCT([b1,b2,b3,b4,b5,b6,b8]);
      arco.translate([2],[0.35 + 0.35*10]);
      arco.scale([1],[-1]);

    var blocchiSquadratiA = SIMPLEX_GRID([[0.4],[0.9+0.2],[0.35,-0.35*9,0.35]]);
    var blocchiSquadratiB = SIMPLEX_GRID([[0.4],[0.1],[0.35,-0.35*9,0.35]]);
      blocchiSquadratiA.translate([1],[-0.2]);
      blocchiSquadratiB.translate([0,1],[-0.4,0.8]);

    var blocchiSquadrati = STRUCT([blocchiSquadratiA,blocchiSquadratiB]);

    var retroArcoMapping = mkNubSurfaceWithCPointsAndGrades([chiusuraFronte,cpRetroArcoA,cpRetroArcoB,chiusuraRetro], 2, 1);
    var domRetroArco = D11(resMap["retroArco"]);
    var retroArco = MAP(retroArcoMapping)(domRetroArco);
      retroArco.translate([0,1,2],[-0.01,-0.1,0.35*11 + 0.01]);

    var arcataSx = STRUCT([colonnina,arco,blocchiSquadrati,retroArco]);
    var arcataDx = arcataSx.clone().scale([0],[-1]).translate([0],[3]);

    var chiaveDiVolta = mkCustomBlocco(cpChiave,0.25,bCircularDetail,undefined,3);
      chiaveDiVolta.translate([2],[0.35 + 0.35*10]);
      chiaveDiVolta.scale([1],[-1]);
    
    var retroChiave = mkCustomBlocco(cpChiave,0.9,bCircularDetail,undefined,4);
      retroChiave.translate([2],[0.35 + 0.35*10]);


    var arcata = STRUCT([arcataSx,arcataDx,chiaveDiVolta,retroChiave]);
      arcata.translate([1],[0.2]);
      arcata.color(coloreColonne);

    return arcata;
}


var mkTimpano = function(){
    var dom14x2 = D11([14,2]);
    var dom14x1 = D11([14,1]);
    var dom8x1 = D11([8,1]);


    var cpCornicione = [[0,0,0],[0,0.1,0],[0,0.1,0.1],[0,0.2,0.1],[0,0.2,0.2],[0,0.4,0.7],[0,0.5,0.7],[0,0.5,0.8],[0,0.6,0.8],[0,0.6,1],[0,0.7,1],[0,0.7,1.1],[0,0.8,1.1],[0,0.8,1.2],[0,0,1.2]];
      cpCornicione = traslaPunti(scalaPunti(cpCornicione,1,1,0.5),0,0,0.33);

    var cpCornicioneBasso = [[0,0,0],[0,0.55,0],[0,0.55,0.2],[0,0.6,0.2],[0,0.6,0.25],[0,0.75,0.4],[0,0.8,0.4],[0,0.8,0.5],[0,0,0.5]];


    var eccedenzaCornicioneAlto = 0.3;
    var lunghezzaTimpano = 14.6;
    var lunghezzaTimpanoAlto = lunghezzaTimpano + 2*eccedenzaCornicioneAlto;
    var altezzaPunta = 3;

    var scorrimentoTimpano = 0.5;

    var frevX = function(p){ return [-p[0], p[1],p[2]]}


    var cpPunta = traslaPunti(cpCornicione,lunghezzaTimpanoAlto/2,0,altezzaPunta);

    var cpAngoloDX = traslaPunti(cpCornicione,scorrimentoTimpano,0,0);

    var cpAngoloDXPiegato = proiezioneConCombinazioneLineare(cpPunta,cpAngoloDX,scorrimentoTimpano);

    var cpAngoloSXPiegato = traslaPunti(cpAngoloDXPiegato.map(frevX) ,lunghezzaTimpanoAlto,0,0);

    var cornTimpanoCPS = [cpAngoloSXPiegato,cpPunta,cpAngoloDXPiegato];

    var cornTimpano = mkNubG1SurfaceWithCPoints(cornTimpanoCPS);  

    var cornicioneTimpano = MAP (cornTimpano)(dom14x2);

    var pmDX = puntoMedio(cpAngoloDXPiegato);
      pmDX[1] = 0;
    var pmSX = puntoMedio(cpAngoloSXPiegato);
      pmSX[1] = 0;

    var tappoDXmap = mkNubG1SurfaceWithCPoints([cpAngoloDXPiegato,[pmDX,pmDX]]);
    var tappoSXmap = mkNubG1SurfaceWithCPoints([cpAngoloSXPiegato,[pmSX,pmSX]]);

    var tappoDX = MAP(tappoDXmap)(dom14x1);
    var tappoSX = MAP(tappoSXmap)(dom14x1);


    var cpCornicioneBassoDX = traslaPunti(cpCornicioneBasso,eccedenzaCornicioneAlto,0,0);
    var cpCornicioneBassoSX = traslaPunti(cpCornicioneBassoDX,lunghezzaTimpano,0,0);

    var cornicioneBassoMap = mkNubG1SurfaceWithCPoints([cpCornicioneBassoSX,cpCornicioneBassoDX]);
    var cornicioneBasso = MAP(cornicioneBassoMap)(dom8x1);

    var pmBassoDX = puntoMedio(cpCornicioneBassoDX);
      pmBassoDX[1] = 0;

    var tappoBassoDXMap = mkNubG1SurfaceWithCPoints([cpCornicioneBassoDX,[pmBassoDX,pmBassoDX]]);
    
    var tappoBassoDX = MAP(tappoBassoDXMap)(dom8x1);
    var tappoBassoSX = T([0])([lunghezzaTimpano])(tappoBassoDX);
    
    var timpano = STRUCT([cornicioneTimpano,tappoSX,tappoDX,cornicioneBasso,tappoBassoDX,tappoBassoSX]);
    timpano.rotate([0,1],[PI]);
    timpano.translate([0],[lunghezzaTimpano + eccedenzaCornicioneAlto]);

    return timpano;
  }

var mkFregioSottoTimpano = function(){

  var h = 1;

  var dimSlotX = 7/9;
  var dimFregioX = 3/9;

  var miniColonnaX = 1/9;
  var faccMiniColonnaX = 1/27;

  var z3 = (4-0.8)/15;
  var z2 = (4-1.2)/15;
  var z1 = (4-1.6)/15;

  var z6 = 12/15;
  var z5 = (12-0.8)/15;
  var z4 = 4/15;
  var z45 = (12-1.4)/15;


  var y1 = 0.25;
  var y2 = 0.1;
  var y3 = 0.2;

  var pezzettino = CUBOID([miniColonnaX/3,y1,z2-z1]);
    pezzettino.translate([0,2],[miniColonnaX/9,z1-(0.2/15)]);

  var pezzettino2 = T([0])([miniColonnaX/3 + miniColonnaX/9])(pezzettino);

  var sezioneMiniColonna = [[0,0],[faccMiniColonnaX,y2],[2*faccMiniColonnaX,y2],[3*faccMiniColonnaX,0],[3*faccMiniColonnaX+0.001,0]];

  var miniColonna = EXTRUDE([z45-z4])(POLYLINE(sezioneMiniColonna));
    miniColonna.translate([1,2],[0.001,z4]);

  var stecchettoBasso = SIMPLEX_GRID([[dimFregioX],[y1],[-z2,(z3-z2)]]);
  var stecchettoMedio = SIMPLEX_GRID([[dimFregioX],[y2],[-z45,(z5-z45)]]);
  var stecchettoAlto = SIMPLEX_GRID([[dimFregioX],[-0.15,y3-0.15],[-z5,(z6-z5)]]);

  var elementoFregio = STRUCT([miniColonna,pezzettino,pezzettino2]);

  var tf = T([0])([miniColonnaX]);

  var elementiFregio = STRUCT([elementoFregio,tf,elementoFregio,tf,elementoFregio]);

  var fregio = STRUCT([stecchettoBasso,stecchettoMedio,stecchettoAlto,elementiFregio]);

    fregio.scale([1],[-1]);
    fregio.color(coloreFregioSottoTimpano);

  return fregio;
}

var mkSottoTimpano = function(){

  var xPrimoFregio = 4/18;
  var distFregi = 7/9;

  var scorrimento = 0.3;
  var distacco = 0.16;
  var lportico = 14;
  var h = 1;

  var z1 = 4/15;
  var z2 = 12/15;
  var z3 = 15/15; 

  var y1 = 0;
  var y2 = 0.15;
  var y3 = 0.2;
  var y4 = 0.3;
  var y5 = 0.5;
  var y6 = 0.6;
  
  var profilo = [[0,0,0],[0,y2,0],[0,y2,h*(4/(3*15))],[0,y3,h*(4/(3*15))],[0,y3,h*(4-0.8)/15],[0,y4,h*(4-0.8)/15],[0,y4,h*z1],[0,y1,h*z1],
          [0,y1,h*(z2-(0.8/15))],[0,y2,h*(z2-(0.8/15))],[0,y2,h*(z2)],[0,y4,h*(z2)],[0,y4,h*(z2+(0.8/15))],[0,y5,h*(z2+(2.2/15))],[0,y5,h*(z2+(2.7/15))],[0,y6,h*(z3)],[0,y1,h*(z3)]];

  profilo = profilo.map(function(p){return [p[0],p[1]+distacco,p[2]];});
  
  var profiloObliquo = scorrimentoProfilo(profilo,-1*scorrimento,0,[0,y6+distacco,0,h]);
  var profiloAMuro = profiloObliquo.map(function(p){return [p[0],0,p[2]];});

  var profiloCentrale = profilo.map(function(p){return [p[0]+lportico/2,p[1],p[2]];})
  //var profilo3 = profilo.map(function(p){return [p[0]-lportico,p[1],p[2]];})


  var surf = mkNubSurfaceWithCPointsAndGrades([profiloCentrale,profiloObliquo,profiloAMuro],1,1);


  var dom2 = D11([profilo.length -1,2]);

  var mezzaBase = MAP(surf)(dom2);

  var fregio = mkFregioSottoTimpano();
    fregio.translate([0,1],[xPrimoFregio,-distacco]);

  var fregi = [fregio];
  
  for(var i = 0; i<8; i++){
    fregio = T([0])([distFregi])(fregio);
    fregi.push(fregio);
  }
    mezzaBase.scale([1],[-1]);
    mezzaBase.color(coloreTimpano);

  var mezzoSottoTimpano = STRUCT([mezzaBase,STRUCT(fregi)]);

  var secondaMeta = S([0])([-1])(mezzoSottoTimpano);
    secondaMeta.translate([0],[lportico]);

  var sottoTimpano = STRUCT([mezzoSottoTimpano,secondaMeta]);
  return sottoTimpano;
}


var mkPortico = function(){
    var profonditaCunetta = 2;
    var profonditaPorticoTeorica = 6.5;
    var profonditaColonne = 0.9;
    var profonditaPortico = profonditaPorticoTeorica-profonditaColonne;
    var lunghezzaCunetta = profonditaPorticoTeorica-2*profonditaColonne;
    var lportico = 14.6-2*profonditaCunetta;
    var hportico = 5.6;
    var hcupola = lunghezzaCunetta/2;
    var rCunetta = lunghezzaCunetta/2;
    var lportone = 2;
    var hportone = 3;
    var sforoSoffitto = 0.5;

    var mkCunetta = function () {
        var r = rCunetta;
        var hporta = 2.5;
        var lporta = 1.3;
        var hmuri = hportico;

        var domBassoA = DOMAIN([[0,r-(lporta/2)],[0,hporta]])(resMap["cunetta"]);
        var domBassoB = DOMAIN([[r+(lporta/2),2*r],[0,hporta]])(resMap["cunetta"]);

        var domAlto = DOMAIN([[0,2*r],[hporta,hmuri]])(resMap["cunettaAlta"]);

        var domCupola = DOMAIN([[0,2*r],[0,hcupola]])(resMap["cupolaPortico"]);

        var mappingMuro = function(p){
          var x = p[0];
                          //equazione della circonferenza nel piano, ricavo y rispetto a x e il raggio.
          return [x,(profonditaCunetta/r)*Math.sqrt(r*r - ((x-r)*(x-r)) ),p[1]];
        };

        var mappingCupola = function(p){
          var x = p[0];
          var z = p[1];
                    //calcolo la "componente" y a partire dalla z, come se fossero seno e coseno di un angolo, con la formula sin^2 + cos^2 = 1
            var yCupola = Math.sqrt(1 - (z/hcupola)*(z/hcupola) );

                    //equazione della circonferenza nel piano, calcolo la curvatura della y rispetto a x
            var yCunetta = (profonditaCunetta/r)*Math.sqrt(r*r - ((x-r)*(x-r)) );

                    //calcolo la curvatura della z rispetto a x
            var zCunetta = Math.sqrt(r*r - ((x-r)*(x-r)) )/r;

                //moltiplico i contributi di x e z sulla y, e scalo la z per la curvatura rispetto a x, ottengo una cupola senza aver utilizzato seni e coseni
          return [x,yCupola*yCunetta,z*zCunetta];
        }

        var arcoSottoA = MAP(mappingMuro)(domBassoA);
        var arcoSottoB = MAP(mappingMuro)(domBassoB);
        var arcoSopra = MAP(mappingMuro)(domAlto);
        var cupola = MAP(mappingCupola)(domCupola);
          cupola.translate([2],[hmuri]);

        var porta = mkFinestra(1.3,2.5,false,false,true);
          porta.translate([0,1],[rCunetta-lporta/2,profonditaCunetta+0.05]);

        var cunetta = STRUCT([arcoSopra,arcoSottoA,arcoSottoB,cupola,porta]);
        return cunetta;
    }


    var cunettaA = mkCunetta();
      cunettaA.rotate([0,1],[PI/2]);
      cunettaA.translate([0,1],[0.01,profonditaColonne]);

    var cunettaB = S([0])([-1])(cunettaA);
      cunettaB.translate([0],[lportico]);

    var domSoffitto = DOMAIN([[0,lportico+2*sforoSoffitto],[0,2*rCunetta]])(resMap["soffittoPortico"]);
    var soffittoMapping = function(p){
      var x = p[0];
      var y = p[1];

      return [x,y,(hcupola/rCunetta)*Math.sqrt(rCunetta*rCunetta - ((y - rCunetta)*(y - rCunetta)) )];
    }
    var soffitto = MAP(soffittoMapping)(domSoffitto);
      soffitto.translate([0,1,2],[-sforoSoffitto,profonditaColonne,hportico-0.01]);


    var muroPorticoA = SIMPLEX_GRID([[(lportico-lportone)/2,-lportone,(lportico-lportone)/2],[-profonditaPortico,0.1],[hportico]]);
    var muroPorticoB = SIMPLEX_GRID([[-(lportico-lportone)/2,lportone             ],[-profonditaPortico,0.1],[-hportone,hportico-hportone]]);

    var distRilievi = 3.8;
    var spessRilievo = 0.8;

    var rilieviA = SIMPLEX_GRID([[-(lportico-distRilievi-spessRilievo)/2,spessRilievo,-distRilievi+spessRilievo,spessRilievo],[-profonditaPortico+0.2,0.2],[hportico+1]]);
    var rilieviB = SIMPLEX_GRID([[-(lportico-distRilievi-2*spessRilievo)/2,2*spessRilievo,-distRilievi+2*spessRilievo,2*spessRilievo],[-profonditaPortico+0.1,0.1],[hportico+1]]);

    var portico = STRUCT([cunettaA,cunettaB,muroPorticoA,muroPorticoB,soffitto,rilieviA,rilieviB]);
      portico.translate([0],[profonditaCunetta-intermezzoTorreColonne]);
      portico.color(colorePortico);

    var muroDietroColonne = SIMPLEX_GRID([[0.8,0.1,0.8,0.3,-2.4,0.3,0.8,0.3,-2.4,0.3,0.8,0.3,-2.4,0.3,0.8,0.1,0.8],[profonditaColonne],[hportico]]);
      muroDietroColonne.color(coloreColonne);

    var spessCopriRilievo = spessRilievo*2+0.2;
    var spLinea = 0.3;
    var distPortaLinea = 0.1;
    var lineaPorticoA = SIMPLEX_GRID([[(profonditaCunetta-intermezzoTorreColonne),-(lportico-distRilievi-spessCopriRilievo)/2,spessCopriRilievo,-distRilievi+spessCopriRilievo,spessCopriRilievo,-(lportico-distRilievi-spessCopriRilievo)/2,profonditaCunetta-intermezzoTorreColonne],[-profonditaPortico+0.19,0.09],[-hportone,-distPortaLinea,spLinea]]);
    var lineaPorticoB = SIMPLEX_GRID([[profonditaCunetta-intermezzoTorreColonne,lportico,profonditaCunetta-intermezzoTorreColonne],[-profonditaPortico+0.1,0.1],[-hportone,-distPortaLinea,spLinea]]);
    var linea = STRUCT([lineaPorticoA,lineaPorticoB]);
      linea.color(coloreLineaPortico);

    var pavimento = SIMPLEX_GRID([[lportico+2*profonditaCunetta],[profonditaPortico+0.1],[0.1]]);
      pavimento.translate([0,1,2],[-intermezzoTorreColonne,-0.1,-0.1]);
      pavimento.color(colorePavimentiEsterni);

    var portone = mkFinestra(lportone,hportone,false,false,false);
      portone.translate([0,1],[lportone+(lportico-lportone)/2-intermezzoTorreColonne,profonditaPortico+0.1]);

      portico = STRUCT([portico,muroDietroColonne,pavimento,portone,linea]);

    return portico;
  }


var mkColonnina = function(){

  var baseColonninaCP = [[1,1,0],[-1,1,0],[-1,-1,0],[1,-1,0],[1,1,0]];
  var colonninaCP = [[0,0,0.1],[0.065,0,0.1],[0.065,0,0.2],[0.035,0,0.23],[0.035,0,0.26],[0.065,0,0.3],[0.065,0,0.37],[0.035,0,0.53],[0.035,0,0.58],[0.045,0,0.63],[0.05,0,0.63],[0.05,0,0.65],[0,0,0.65]];



  var colonninaNub = mkNubG1(colonninaCP);
  var baseColonninaNub = mkNubG1(baseColonninaCP,S1);


  var dom12x4 = D11([colonninaCP.length-1,baseColonninaCP.length-1]);

  var profProd = PROFILEPROD_SURFACE([colonninaNub,baseColonninaNub]);

  var colonnina =  MAP(profProd)(dom12x4);

  return colonnina;
}

var mkMiniColonnato = function(){

  var lbloccoCentrale = 0.2;
  var lmancorrente = 1.2;
  var lcln = 0.13;
  var lspaz = 0.05;
  var lprimoSpazio = 0.15;
  var hcolonnina = 0.65;

  var cln = mkColonnina();
  cln.translate([0],[lcln/2 + lprimoSpazio]);

  var arrColonnine = [cln];

  for(i=0;i<5;i++){
    cln = T([0])([lcln+lspaz])(cln);
    arrColonnine.push(cln);
  }

  var colonnine = STRUCT(arrColonnine);

  var mancorrenteCP2D = [[0,0],[0,0.07],[0.025,0.09],[0.065,0.09],[0.075,0.125],[0.1,0.125],[0.1,0]];

  var mancorrente = EXTRUDE([lmancorrente])(POLYLINE(mancorrenteCP2D));
    mancorrente = STRUCT([mancorrente, S([1])([-1])(mancorrente)]);

    mancorrente.rotate([0,2],[-PI/2]);
    mancorrente.translate([0,2],[lmancorrente,hcolonnina]);

  var bloccoCentrale = SIMPLEX_GRID([[-(lmancorrente-0.1),lbloccoCentrale/2],[0.132],[-0.1,0.55]]);
    bloccoCentrale.translate([1],[-0.066]);

  var bloccoSotto = SIMPLEX_GRID([[1.2],[0.2],[0.1]]);
    bloccoSotto.translate([1],[-0.1]);

  var mezzoColonnato = STRUCT([colonnine,mancorrente,bloccoCentrale,bloccoSotto]);

  var secondoMezzoColonnato = S([0])([-1])(mezzoColonnato);
    secondoMezzoColonnato.translate([0],[lmancorrente*2]);

  var colonnato = STRUCT([mezzoColonnato,secondoMezzoColonnato]);
    colonnato.translate([1],[-0.125]);

  return colonnato;
}

var mkTettoVilla = function (){

  var eccedenzaTettoX = 0.7;
  var eccedenzaTettoY = 0.4;
  var dimFacY = 4.2;

  var xtettoA = 27.6+2*eccedenzaTettoX;
  var ytettoA = dimFacY*3 + 2*eccedenzaTettoY;
  var htettoA = 3.1;

  var xtettoB = 14.6;
  var ytettoB = 6.4;

  //calcolo l'altezza della parte B del tetto in modo che l'inclinazione sia la stessa della parte A
  //(quindi faccio in modo che il tetto B e metà del tetto A siano triangoli simili).
  var htettoB = (2*htettoA*ytettoB)/ytettoA;


  var xtettoC = xtettoB;
  var ytettoC = ytettoB;
  var htettoC = htettoB+0.7;
  var offsetYTettoC = 0.3;
  var offsetZTettoC = 0.15;

  var distPunteA = 15;

  var puntaA1 = [xtettoA/2 -distPunteA/2,ytettoA/2,htettoA];
  var puntaA2 = [xtettoA/2 +distPunteA/2,ytettoA/2,htettoA];
  var A1 = [0,ytettoA,0];
  var A2 = [0,0,0];
  var A3 = [xtettoA,0,0];
  var A4 = [xtettoA,ytettoA,0];

  var puntaB1 = [0,ytettoB,htettoB];
  var puntaB2 = [xtettoB,ytettoB,htettoB];
  var puntaC1 = [xtettoC/2,offsetYTettoC,htettoC];
  var puntaC2 = [xtettoC/2,ytettoC+1.7,htettoC];

  var tettoA = TRIANGLE_STRIP([A1,A2,puntaA1,A3,puntaA2,A4,puntaA1,A1]);

  var tettoB = TRIANGLE_STRIP([[0,0,0],[xtettoB,0,0],puntaB1,puntaB2]);

  var tettoC = TRIANGLE_STRIP([[0,offsetYTettoC,offsetZTettoC],puntaC2,puntaC1,[xtettoC,offsetYTettoC,offsetZTettoC]]);

    tettoA.translate([1,2],[ytettoB,htettoB]);
    tettoA.color(coloreTetti);

    tettoB.translate([0],[xtettoA/2 - xtettoB/2]);
    tettoB.color(coloreTetti);

    tettoC.translate([0],[xtettoA/2 - xtettoC/2]);
    tettoC.color(coloreTetti);

  var puntale1 = mkPuntale("tondo");
    puntale1.translate([0,1,2],[puntaA1[0],puntaA1[1]+ytettoB,puntaA1[2]+htettoB-0.1]);
  var puntale2 = T([0])([distPunteA])(puntale1);


  return STRUCT([tettoA,tettoB,tettoC,puntale1,puntale2]);

}

var mkCornicione = function(){

  var lvilla = 27.6;
  var hprof = 0.86;
  var lprof = 0.6;
  var profilo = [[0,(0)*lprof,(0)*hprof],[0,(0.35)*lprof,(0)*hprof],[0,(0.35)*lprof,(0.35)*hprof],[0,(0.45)*lprof,(0.5)*hprof],[0,(0.45)*lprof,(0.75)*hprof],[0,(0.8)*lprof,(0.75)*hprof],[0,(0.8)*lprof,(0.85)*hprof],[0,lprof,hprof],[0,0,hprof]];
  var profiloSchiacciato = profilo.map(function(p){return [p[0],p[1]/6,p[2]];});
  var profiloObliquoSchiacciato = scorrimentoProfilo(profiloSchiacciato,-lprof);

  var profiloObliquo1 = scorrimentoProfilo(profilo,-lprof);
  var profiloObliquo2 = traslaPunti(scalaPunti(profiloObliquo1,1,-1,1),0,-4.2*3-0.1-0.1,0);
  var profilo3 = traslaPunti(scalaPunti(profilo,1,-1,1),lvilla/2,-4.2*3-0.1-0.1,0);

  var cps = [profiloSchiacciato,profiloObliquoSchiacciato,profiloObliquo2,profilo3];

  var surf = mkNubSurfaceWithCPointsAndGrades(cps,1,1);

  var mezzoCornicione = MAP(surf)(D11([profilo.length-1,3]));
    mezzoCornicione.translate([0],[-lvilla/2]);

    mezzoCornicione.scale([1],[-1]);

  return mezzoCornicione;
}

var mkFillerAngolo = function(){

  var fillerMuro = SIMPLEX_GRID([[-0.3,0.1],[-0.3,0.1],[-2.2,8.5]]).color(coloreIntonaco);
  var fillerBase = SIMPLEX_GRID([[-0.1,0.3],[-0.1,0.3],[2]]).color(coloreIntonaco);
  var fillerBordinoBasso = SIMPLEX_GRID([[0.4],[0.4],[-2,0.2]]).color(coloreBordini);
  var fillerBordinoMedio = SIMPLEX_GRID([[-0.2,0.2],[-0.2,0.2],[-2.2,0.3]]).color(coloreBordini);
  var fillerBordinoAlto = SIMPLEX_GRID([[-0.25,0.2],[-0.25,0.3],[-2.2,-0.8,0.2]]).color(coloreBordini);
  var fillerBordinoCornicione = SIMPLEX_GRID([[-0.2,0.2],[-0.2,0.2],[-2.2,-8.5,0.3]]).color(coloreBordini);

  var filler = STRUCT([fillerMuro,fillerBase,fillerBordinoBasso,fillerBordinoMedio,fillerBordinoAlto,fillerBordinoCornicione]);

  return filler;
}

var mkFillerFacciataFrontale = function(dimTorre,intermezzoTorreColonne){

  var itc = intermezzoTorreColonne;
  var hfiller = 8.5;
  var hBordiniFiller = 0.03;
  var distBordiniFiller = 0.2;

  var muri = SIMPLEX_GRID([[-dimTorre,itc],[-0.5,0.1],[-2.2,hfiller-hBordiniFiller]]);


  var bordiniSopra = SIMPLEX_GRID([[-dimTorre,itc],[-0.45,0.2],[-2.2,-hfiller+(2*hBordiniFiller+distBordiniFiller),hBordiniFiller,-distBordiniFiller,hBordiniFiller]]);
  var bordinoBasso = SIMPLEX_GRID([[-dimTorre,0.1],[-0.3,0.2],[-2.2,0.3]]);
  var bordinoBasso2 = SIMPLEX_GRID([[-dimTorre,0.05],[-0.3,0.2],[-2.2,-0.3,-0.5,0.2]]);

  var spbst = 0.1; //spessore bordino sopra timpano
  var rialzoSpbst = 2.9;
  var bordinoSopraTimpano = SIMPLEX_GRID([[-dimTorre,-(itc-0.1),0.1,0.3,6.5,0.2],[-0.3,0.4],[-2.2,-(hfiller-spbst-0.1),spbst]]);

  var fbst = function(p){
    var x = p[0];
    var y = p[1];
    var z = p[2];

    if (z > (2.2+hfiller-spbst-0.2) && x > (dimTorre+itc+0.3+3)){
      return [x,y,z+rialzoSpbst];
    }
    return p;
  }
  
  var bordinoSopraTimpano = MAP(fbst)(bordinoSopraTimpano);
  var hmuroDT = 1.5;
  var muroDietroTimpano = MAP(fbst)(SIMPLEX_GRID([[-dimTorre,-(itc-0.1),-0.1,0.3,6.5,0.2],[-0.5,0.1],[-2.2,-(hfiller-hmuroDT-0.15),hmuroDT]]));

  var sprilievo = 1;
  var rilievo1 = SIMPLEX_GRID([[-dimTorre,-(itc-0.1),-0.03,0.4-0.03*2],[-0.4,0.1],[-2.2,-(hfiller-spbst-0.1-sprilievo),sprilievo]]);
  var rilievo2 = SIMPLEX_GRID([[-dimTorre,-(itc-0.1),-0.1,-0.3,-6.5,-0.03,0.2-0.03],[-0.4,0.1],[-2.2,-(hfiller-spbst-0.1-sprilievo+rialzoSpbst),sprilievo]]);

  var bordini = STRUCT([bordiniSopra,bordinoBasso,bordinoBasso2,bordinoSopraTimpano]);
    bordini.color(coloreBordini);

    muri = STRUCT([muri,muroDietroTimpano,rilievo1,rilievo2]);
    muri.color(coloreIntonaco);

  return STRUCT([muri,bordini]);
}
var mkBaseFrontale = function(){

  var lfronte = 14.6;

  var rGradinoAlto = 1.5;
  var rGradinoBasso = 2.8;
  var nGradini = 6;
  var hGradinata = 1;

  var hGradino = hGradinata/nGradini;
  var lGradino = (rGradinoBasso - rGradinoAlto)/nGradini;

  var bordino = SIMPLEX_GRID([[lfronte],[0.2],[-2,0.2]]).color(coloreBordini);
  var fronte = SIMPLEX_GRID([[lfronte],[-0.05,0.3],[2]]).color(coloreColonne);

  var gradini = [];
  var gradino;
  var r;
  var z;
  var n = resMap["gradiniCircolari"][0];

  for(i=0;i<nGradini;i++){
    z = i*hGradino;
    r = rGradinoBasso - i*lGradino;
    gradino = mkSolidDisk(r,hGradino,n);
    gradino.translate([2],[z]);

    gradini.push(gradino);
  }

  var gradinata = STRUCT(gradini);
    gradinata.translate([0,2],[lfronte/2,2.2 -hGradinata -0.01]);
    gradinata.color(coloreBordini);

  var baseFrontale = STRUCT([gradinata,bordino,fronte]);

  return baseFrontale;

}

var mkParteSimmetricaRetro = function(){

  var dimRetro = 5.3;
  var hfinestre  = 2.7;
  var distFinestreRosone = 1.6;
  var lporta = 1.7;
  var hporta = 2.7;

  var hRosone = 2.2 + 1 + hfinestre + distFinestreRosone;
  var rRosone = lporta/2 + lporta +0.25;
  var r = rRosone;
  var spVetro = 0.05;
  var spRos = 0.4;
  var spSbarra = 0.4;
  var yRos = 0.3;
  var distSbarre = 2*r/3;

  var muroGrande = SIMPLEX_GRID([[2.5],[-0.3,0.1],[-2.2,8.5]]);
  var muroFinestre = SIMPLEX_GRID([[-2.5,lporta],[-0.3,0.1],[-2.2,0.3+0.7,-hfinestre,distFinestreRosone]]);
  var muroSottile = SIMPLEX_GRID([[-2.5,-lporta,0.25],[-0.3,0.1],[-2.2,0.3+0.7+hfinestre+distFinestreRosone]]);
  var muroPorta = SIMPLEX_GRID([[-2.5,-lporta,-0.25,lporta],[-0.3,0.1],[-2.2,-hporta,0.3+0.7+distFinestreRosone]]);
  var muroRosone = T([0,1,2])([2.5+rRosone,0.3+0.1,hRosone+spRos])(S([0])([-1])(R([1,2])([PI/2])(mkComplementareQuartoDiCirconferenzaSolido(rRosone,0.1,Math.floor(resMap["rosone"][0]/2)))));

  var muroBase = SIMPLEX_GRID([[dimRetro],[-0.1,0.1],[2]]);
  var bordinoBasso = SIMPLEX_GRID([[dimRetro],[0.3],[-2,0.2]]);
  var bordinoMedio = SIMPLEX_GRID([[dimRetro-lporta/2],[-0.2,0.1],[-2.2,0.3]]);
  var bordinoAlto = SIMPLEX_GRID([[dimRetro-lporta/2-0.151],[-0.25,0.05],[-2.2,-0.3,-0.5,0.2]]);
  var bordinoSoffitto = SIMPLEX_GRID([[dimRetro],[-0.2,0.1],[-2.2,-8.5,0.3]]);

  var muri = COLOR(coloreIntonaco)(STRUCT([muroGrande,muroFinestre,muroSottile,muroBase,muroPorta,muroRosone]));
  var bordi = COLOR(coloreBordini)(STRUCT([bordinoBasso,bordinoMedio,bordinoAlto,bordinoSoffitto]));

  var finestra = T([0,1,2])([2.5,0.3+0.1,2.2+1+0.001])(mkFinestra());
  var angolo = COLOR(coloreColonne)(T([0])([-8.8])(mkAngoloDiPietre()));

  return STRUCT([muri,bordi,finestra,angolo]);
}

var mkParteCentraleRetro = function(){
  var dimRetro = 5.3;
  var hfinestre  = 2.7;
  var distFinestreRosone = 1.6;
  var lporta = 1.7;
  var hporta = 2.7;

  var hRosone = 2.2 + 1 + hfinestre + distFinestreRosone;
  var rRosone = lporta/2 + lporta +0.25;
  var r = rRosone;
  var spVetro = 0.01;
  var spRos = 0.4;
  var spSbarra = 0.4;
  var yRos = 0.3;
  var distSbarre = 2*r/3;

  var baseRosone = SIMPLEX_GRID([[2*r],[yRos],[spRos]]);
  var sbarraRosone = SIMPLEX_GRID([[-(2*r-distSbarre-spSbarra)/2,spSbarra,-(distSbarre-spSbarra),spSbarra],[-0.01,yRos-0.01],[-spRos,r-spRos]]);
  
  var cerchioRosone = T([0,1,2])([r,yRos,spRos])(R([1,2])([PI/2])(mkPartOfCoronaCircolare(r-spRos,r,yRos,0,PI,resMap["rosone"][0])));
  var rosone = COLOR(coloreBordiniChiari)(T([0,1,2])([dimRetro-r,0.3-0.01,hRosone])(STRUCT([baseRosone,sbarraRosone,cerchioRosone])));

  var vetroRosone = COLOR(coloreVetri)(T([0,1,2])([dimRetro-r,0.3,hRosone])(SIMPLEX_GRID([[2*r],[-(yRos-spVetro-0.21),spVetro],[-spRos,r]])));

  var porta = T([0,1,2])([dimRetro-lporta/2,0.3+0.1,2.2])(mkFinestra(0,0,false,false,true));

  var centroRetro = STRUCT([porta,rosone,vetroRosone]);

  return centroRetro;
}

var mkPavimenti = function(){

  var pavimentoBasement =  COLOR(coloreBordini)(T([2])([-0.1])(SIMPLEX_GRID([[-0.1,0.2,dimXVilla,0.2],[-0.1,0.2,6.5,4.2*3,0.3+0.1],[0.1]])));
  var pavimentoBase =  SIMPLEX_GRID([[-0.3-0.1,dimXVilla-0.2],[-0.3-6.5,4.2*3+0.1],[-1.9,0.3]]);
  var pavimentoPrimo = SIMPLEX_GRID([[-0.3-0.1,dimXVilla-0.2],[-0.3-6.5,4.2*3],[-2-0.2-0.3-5,0.1]]);
  var soffitto =     SIMPLEX_GRID([[-0.3-0.1,dimXVilla-0.2],[-0.3-6.5,4.2*3],[-2-0.2-0.3-8.2,0.1]]);

  var fill = 0.9;
  var lportico = 14.6;
  var lporta = 2;

  var muro1 = COLOR(coloreIntonaco)(SIMPLEX_GRID([[-dimTorre,(lportico-lporta)/2,-lporta,(lportico-lporta)/2],[-0.3-6.5+fill,-0.1,0.1],[-2-0.2,0.3+5,4]]));
  var muro2 = COLOR(coloreIntonaco)(SIMPLEX_GRID([[-dimTorre,-(lportico-lporta)/2,lporta],[-0.3-6.5+fill,-0.1,0.1],[-2-0.2,-3,0.3+2,4]]));
  var fillpavimentoBase =  SIMPLEX_GRID([[-dimTorre,lportico],[-0.3-6.5+fill,fill],[-1.9,0.3]]);
  var fillpavimentoPrimo = SIMPLEX_GRID([[-dimTorre,lportico],[-0.3-6.5+fill-0.1,fill-0.1],[-2-0.2-0.3-5,0.1]]);
  var fillsoffitto =     SIMPLEX_GRID([[-dimTorre,lportico],[-0.3-6.5+fill,fill],[-2-0.2-0.3-8.2,0.1]]);

  var pavimenti = COLOR(colorePavimenti)(STRUCT([pavimentoBase,pavimentoPrimo,soffitto,fillpavimentoPrimo,fillpavimentoBase,fillsoffitto]));
  

  return STRUCT([pavimenti,pavimentoBasement,muro1,muro2]);
}

var mkScaleRetro = function(){
  var xScalini = 5.6;
  var zScalini = 0.15;
  var lScalinata = 5;
  var nScalini = 14;
  var yScalini = lScalinata/nScalini;
  var distaccoScalini = 2;
  var rialzoBordo = 0.3;
  var spBordo = 0.7;

  var mkScalino = function(l,h){
    return COLOR(coloreBordiniChiari)(SIMPLEX_GRID([[xScalini],[-distaccoScalini,l],[-h,zScalini]]));
  }

  var scalini = [];
  for (var i=0; i<nScalini;i++){
    scalini.push(mkScalino(lScalinata-i*yScalini,i*zScalini));
  }

  var mappingBordo = function(p){
    var x = p[0];
    var y = p[1];
    var z = p[2];

    if(z>0 && y<distaccoScalini+lScalinata/2){
      return [x,y,z+nScalini*zScalini];
    } else {
      return p;
    }
  }

  var bordoDx = COLOR(coloreBordiniScuri)(T([0])([-spBordo])(MAP(mappingBordo)(SIMPLEX_GRID([[spBordo],[distaccoScalini,lScalinata,yScalini*2],[rialzoBordo]]))));
  var bordoSx = COLOR(coloreBordiniScuri)(T([0])([spBordo+xScalini])(bordoDx));
  var tappo = COLOR(coloreBordiniChiari)(SIMPLEX_GRID([[xScalini],[distaccoScalini],[-zScalini*(nScalini-1),zScalini]]));

  scalini.push(bordoDx);
  scalini.push(bordoSx);
  scalini.push(tappo);

  return T([0])([-xScalini/2])(STRUCT(scalini));

}

var mkPrato = function () {
  var lprato = 100;

  var pbase = COLOR(colorePrato)(T([0,1,2])([-(lprato- (dimXVilla+0.6))/2,-(lprato-(dimYVilla+0.6))/2,-0.07])(SIMPLEX_GRID([[lprato],[lprato],[0.1]])));

  var x = dimXVilla+0.6;  
  var distPoli = 14.6;
  var z = 1.3;
  var y = -15;
  var k = 2;
  var j = 1.2;

  var cp1 = [[0,0,0],[(x-distPoli)/2,0,0],[(x-distPoli)/2,0,z],[(x+distPoli)/2,0,z],[(x+distPoli)/2,0,0],[x,0,0]];
  var cp2 = [[0,y/k,0],[(x-distPoli)/2,y/k,0],[(x-distPoli)/2,y/k,z*j],[(x+distPoli)/2,y/k,z*j],[(x+distPoli)/2,y/k,0],[x,y/k,0]];
  var cp3 = [[0,y/k,0],[(x-distPoli)/2,y/k,0],[(x-distPoli)/2,y/k,0],[(x+distPoli)/2,y/k,0],[(x+distPoli)/2,y/k,0],[x,y/k,0]];
  var cp4 = [[0,y,0],[(x-distPoli)/2,y,0],[(x-distPoli)/2,y,0],[(x+distPoli)/2,y,0],[(x+distPoli)/2,y,0],[x,y,0]];

  var pCurvoMap = mkBezSurfaceWithCPointsAndCurveGrades([cp1,cp2,cp3,cp4],2);
  var pCurvo = COLOR(colorePrato)(MAP(pCurvoMap)(D11([20,10])));

  return STRUCT([pbase,pCurvo]);
}

//######################################################################## BUILD ##########################################################################

//------------------------------------
var torre = mkTorre();
//------------------------------------


var dimElFac = 4.2;
var dimTorre = 6.5+0.3;
var dimColonna = 0.8;
var intermezzoColonnaColonna = 0.1;
var altezzaBecchiSottoTetto = 0.5;
var dimXVilla = 27.6;
var dimYVilla = dimElFac*3 + dimTorre +0.1 - 0.3;
var dimParteCentraleRetro = 10.6;
var hbase = 2.2;


var elFac = mkElementoFacciata();
var traslFac = T([0])([dimElFac]);

//------------------------------------
var facciata = STRUCT([elFac,traslFac,elFac,traslFac,elFac]);
//------------------------------------

var intermezzoTorreFacciata = 0;
var intermezzoTorreColonne = 0.3;
var intermezzoColonneTimpano = 1;

facciata.rotate([0,1],[-PI/2]);
facciata.translate([1],[dimElFac*3+dimTorre+intermezzoTorreFacciata]);


var elFacRetro = T([0,1])([0.3+0.1,0.3+dimElFac*3 + dimTorre+0.1])(S([1])([-1])(elFac));

var tRetro = T([0])([dimElFac]);

var parteSimmetricaFacRetro =   T([0,1])([0.3+dimElFac*2+0.1,0.3+dimTorre+dimElFac*3+0.1])(S([1])([-1])(mkParteSimmetricaRetro()));
var centroFacRetro =      T([0,1])([0.3+dimElFac*2+0.1,0.3+dimTorre+dimElFac*3+0.1])(S([1])([-1])(mkParteCentraleRetro()));

//------------------------------------
var facciataRetro = STRUCT([parteSimmetricaFacRetro,elFacRetro,tRetro,elFacRetro]);
//------------------------------------


var colonna = mkColonna();
  colonna.translate([0,2],[dimTorre+intermezzoTorreColonne,2.2]);

  var tCol1 = T([0])([dimColonna + intermezzoColonnaColonna]);
  var tCol2 = T([0])([3 + dimColonna]);

  var colonna2 = tCol1(colonna);
  var colonna3 = tCol2(colonna2);
  var colonna4 = tCol2(colonna3);
  var colonna5 = tCol2(colonna4);
  var colonna6 = tCol1(colonna5);

//------------------------------------
var colonne = STRUCT([colonna,colonna2,colonna3,colonna4,colonna5,colonna6]);
//------------------------------------

// la seguente STRUCT portava allo stesso risultato in modo molto più sintetico, ma meno efficiente:
//var colonne = STRUCT([colonna,tCol1,colonna,tCol2,colonna,tCol2,colonna,tCol2,colonna,tCol1,colonna]);

colonne.color(coloreColonne);

var arcata = mkArcata();
  arcata.translate([0,1,2],[dimTorre+intermezzoTorreColonne+dimColonna*2 +intermezzoColonnaColonna,0.2,2.2]);

var arcata2 = arcata.clone().translate([0],[3+dimColonna]);
var arcata3 = arcata2.clone().translate([0],[3+dimColonna]);

//------------------------------------
var arcate = STRUCT([arcata,arcata2,arcata3]);
//------------------------------------

//------------------------------------
var miniColonnato = mkMiniColonnato();
//------------------------------------
  miniColonnato.translate([0,1,2],[dimTorre+intermezzoTorreColonne+2*dimColonna+intermezzoColonnaColonna+0.3,0.3+0.25,2.2]);
  miniColonnato = STRUCT([miniColonnato,T([0])([2*3 + 2*dimColonna])(miniColonnato)]);
  miniColonnato.color(coloreColonne);

//------------------------------------
var timpano = mkTimpano();
//------------------------------------
var sottoTimpano = mkSottoTimpano();
  sottoTimpano.translate([0,1],[0.3,0.3]);

  timpano.translate([1,2],[0.2,intermezzoColonneTimpano]);
  timpano.color(coloreTimpano);

  timpano = STRUCT([timpano,sottoTimpano]);

  timpano.translate([0,1,2],[0.3+6.5,0.3,2.2+0.35*16]);

//------------------------------------
var portico = mkPortico();
//------------------------------------
  portico.translate([0,1,2],[dimTorre+intermezzoTorreColonne,0.3,2.2]);

//------------------------------------
var tetto = mkTettoVilla();
//------------------------------------
var ztetto = 2.2+0.35*16+1+0.1;
var offsetYTetto = 0.3;
var offsetXTetto = -0.4;
  tetto.translate([0,1,2],[offsetXTetto,offsetYTetto,ztetto]);

var cornicione = mkCornicione();
  cornicione.translate([0,1,2],[0.3+dimXVilla/2,6.5+0.3,2.2+8+0.8]);

var fillerAngoloRetro = mkFillerAngolo();
    fillerAngoloRetro.rotate([0,1],[-PI/2]);
    fillerAngoloRetro.translate([1],[dimTorre+dimElFac*3+0.3+0.1]);

var baseFrontale = mkBaseFrontale();
  baseFrontale.translate([0],[dimTorre]);

var fillerFrontale = mkFillerFacciataFrontale(dimTorre,intermezzoTorreColonne);

var pavimenti = mkPavimenti();

var scaleRetro = T([0,1])([0.3+dimXVilla/2,dimTorre+dimElFac*3+0.3])(mkScaleRetro());

var prato = mkPrato();


var parteDestraVilla = STRUCT([torre,facciata,cornicione,facciataRetro,fillerAngoloRetro,fillerFrontale]);
var parteSinistraVilla = T([0])([dimXVilla+2*0.3])(S([0])([-1])(parteDestraVilla));


var scmodel = STRUCT([parteDestraVilla,parteSinistraVilla,colonne,arcate,timpano,portico,miniColonnato,tetto,baseFrontale,centroFacRetro,pavimenti,scaleRetro,prato]);

/////////////////////////////////////////////
return scmodel;
})();

exports.author = 'Pronte';
exports.category = 'villas';
exports.scmodel = scmodel;

if (!module.parent) {
  fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
}

}(this));