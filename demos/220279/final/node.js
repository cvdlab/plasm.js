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


var scmodel = (function() {
// Magic vars controlling project display complexity

var PROJECT_NOCOLUMNS = false;
var PROJECT_ONECOLUMN = false;
var PROJECT_3DCOLUMN = false;
var PROJECT_NOBALCONCINI = false;
var PROJECT_ONLYHALFWALL = false;
var PROJECT_NOROOF = false;
var PROJECT_NOGABLE = false;
var PROJECT_NOPLATFORM = false;
// override capital 3D
var PROJECT_NEWCAPITAL_ROTATION = true;
var PROJECT_NEWCAPITAL = true;
// color connections with red
var PROJECT_DEBUGWALLCONNECTION = false;
// Don't use T/R/S in critical slow point but directly Model.x functions (decrease memory usage)
var PROJECT_NOFUNCTIONALTRS = true;
// Warning this may crash Three.js and/or Plasm
var PROJECT_HIGHRESOLUTION = false;

var CommonDomains = function() {}

CommonDomains.DIM1_DOMAIN = null;
CommonDomains.DIM2_DOMAIN = null;
CommonDomains.DIM2_DOMAIN_LOWRES = null;
CommonDomains.DIM2RP_DOMAIN = null;
CommonDomains.DIM2R_DOMAIN = null;
CommonDomains.DIM3_DOMAIN = null;
CommonDomains.DIM2RPP_DOMAIN = null;

if (PROJECT_HIGHRESOLUTION == false) {
  CommonDomains.DIM1_DOMAIN = INTERVALS(1)(35);
  CommonDomains.DIM2_DOMAIN = DOMAIN([[0,1],[0,1]])([35,1]);
  CommonDomains.DIM2_DOMAIN_LOWRES = DOMAIN([[0,1],[0,1]])([15,1]);
  CommonDomains.DIM2RP_DOMAIN = DOMAIN([[0,1],[0,1]])([20,15]);
  CommonDomains.DIM2R_DOMAIN = DOMAIN([[0,1],[0,2*PI]])([1,20]);
  if ( PROJECT_3DCOLUMN == true ) {
    CommonDomains.DIM3_DOMAIN = DOMAIN([[0,1],[0,1],[0,1]])([35,1,1]);
  }

  if ( PROJECT_NEWCAPITAL == true ) {
    CommonDomains.DIM2RPP_DOMAIN = DOMAIN([[0,1],[0,1]])([35,3]); 
  }
} else {
  // Overrides 3D column settings
  PROJECT_3DCOLUMN = !PROJECT_NEWCAPITAL;
  // Domains
  CommonDomains.DIM1_DOMAIN = INTERVALS(1)(100);
  CommonDomains.DIM2_DOMAIN = DOMAIN([[0,1],[0,1]])([100,1]);
  CommonDomains.DIM2_DOMAIN_LOWRES = CommonDomains.DIM2_DOMAIN; // No lowres xD
  CommonDomains.DIM2RP_DOMAIN = DOMAIN([[0,1],[0,1]])([30,30]);
  CommonDomains.DIM2R_DOMAIN = DOMAIN([[0,1],[0,2*PI]])([1,60]);
  if ( PROJECT_3DCOLUMN == true ) {
    CommonDomains.DIM3_DOMAIN = DOMAIN([[0,1],[0,1],[0,1]])([100,1,1]);
  }
  if ( PROJECT_NEWCAPITAL == true ) {
    CommonDomains.DIM2RPP_DOMAIN = DOMAIN([[0,1],[0,1]])([100,3]);  
  } 
}

// =================================================================================

var ColoriProgetto = function() {};
// ColoriProgetto.INTONACO_BASE = [247/255, 247/255, 247/255];
ColoriProgetto.INTONACO_BASE = [253/255, 253/255, 253/255];
ColoriProgetto.INTONACO_SCURO = [210/255, 210/255, 210/255];
ColoriProgetto.INTONACO_BORDI = [215/255, 215/255, 215/255];

ColoriProgetto.INFERRIATE_LEGGERE = [147/255,147/255,147/255];
ColoriProgetto.INFERRIATE_PESANTI = [128/255, 128/255, 128/255];

ColoriProgetto.VETRO = [164/255, 211/255, 238/255, 0.8];
ColoriProgetto.INFISSO_FINESTRA = [152/255, 118/255, 84/255];

ColoriProgetto.INFISSO_PORTA = [65/255, 32/255, 0/255];
ColoriProgetto.LEGNO_PORTA = [152/255, 118/255, 84/255];

// Rosso Pompeiano (cit.)
ColoriProgetto.TETTO = [210/255, 31/255, 27/255];
ColoriProgetto.ERBA = [34/255, 139/255, 34/255];

ColoriProgetto.DEBUG = [255/255, 0/255, 0/255];

// =================================================================================

var PointUtils = function() {};

PointUtils.ruotaPunti = function(pointList, angolo, asse) {
    if (asse === 0) {
      var alfa = angolo;
      return pointList.map( function(pt) { 
    return [ pt[0], pt[1]*COS(alfa) + (-1)*pt[2]*SIN(alfa), pt[1]*SIN(alfa) + pt[2]*COS(alfa) ];
      });
    } else if (asse === 1) {
      var beta = angolo;
      return pointList.map( function(pt) { 
    return [ pt[0]*COS(beta) + pt[2]*SIN(beta), pt[1], (-1)*pt[0]*SIN(beta) + pt[2]*COS(beta) ];
      });
    } else if (asse === 2) {
      var gamma = angolo;
      return pointList.map( function(pt) { 
    return [ pt[0]*COS(gamma) + (-1)*pt[1]*SIN(gamma), pt[0]*SIN(gamma) + pt[1]*COS(gamma), pt[2] ];
      });
    }
      
    return pointList;
};
  
PointUtils.ribaltaPunti = function(pointList, asse) {
    if (asse === 0) {
      return pointList.map( function(pt) { 
    return [ -pt[0], pt[1], pt[2] ];
      });
    } else if (asse === 1) {
      return pointList.map( function(pt) { 
    return [ pt[0], -pt[1], pt[2] ];
      });
    } else if (asse === 2) {
      return pointList.map( function(pt) { 
    return [ pt[0], pt[1], -pt[2] ];
      });
    }
};

PointUtils.traslaPunti = function(pointList, asse, qty) {
    if (asse === 0) {
      return pointList.map( function(pt) { 
    return [ pt[0]+qty, pt[1], pt[2] ];
      });
    } else if (asse === 1) {
      return pointList.map( function(pt) { 
    return [ pt[0], pt[1]+qty, pt[2] ];
      });
    } else if (asse === 2) {
      return pointList.map( function(pt) { 
    return [ pt[0], pt[1], pt[2]+qty ];
      });
    }
};

PointUtils.scalaPunti = function(pointList, scalamento, asse) {
    return pointList.map( function(pt) { 
    return [ pt[0] * scalamento, pt[1]*scalamento, pt[2]*scalamento ];
    });
};

PointUtils.scalaPuntiAsse = function(pointList, scalamento, asse) {
    if (asse === 0) {
      return pointList.map( function(pt) { 
      return [ pt[0] * scalamento, pt[1], pt[2] ];
      });
    } else if (asse === 1) {
      return pointList.map( function(pt) { 
      return [ pt[0], pt[1]*scalamento, pt[2] ];
      });
    } else if (asse === 2) {
      return pointList.map( function(pt) { 
      return [ pt[0], pt[1], pt[2]*scalamento ];
      });
    }
};

// =================================================================================
// =================================================================================

var CurveUtils = function() {};

CurveUtils.drawCurveDebug = function(mapping, controlPoints) {
  // punti di controllo
  var listaDfacce = [];
  controlPoints.forEach( function(v,i) { listaDfacce.push([i]); } );
  DRAW( COLOR([0.1,0.6,0.2])( SIMPLICIAL_COMPLEX(controlPoints)(listaDfacce) ) );

  // curva
  var curve = MAP(mapping)(CommonDomains.DIM1_DOMAIN);
  DRAW( COLOR([0,0.5,0.5])( curve ) );
};

CurveUtils.createS0NUBS = function(degree, cPoints, debug) {
  debug = debug || false;
  var nubMap = NUBS(S0)(degree)(CurveUtils.generateS0Knots(cPoints.length, degree))(cPoints);
    
  if ( debug == true ) {
    CurveUtils.drawCurveDebug(nubMap, cPoints);
  }
    
  return nubMap;
};

CurveUtils.createBezier = function(selector, cPoints, debug) {
  debug = debug || false;
  var nubMap = BEZIER(selector)(cPoints);
    
  if (( debug == true ) && (selector == S0)) {
    CurveUtils.drawCurveDebug(nubMap, cPoints);
  }
    
  return nubMap;
};

CurveUtils.createHermite = function(selector, cPoints, debug) {
  debug = debug || false;
  var nubMap = CUBIC_HERMITE(selector)(cPoints);
    
  if (( debug == true ) && (selector == S0)) {
    CurveUtils.drawCurveDebug(nubMap, cPoints);
  }
    
  return nubMap;
};

CurveUtils.generateS0Knots = function(cardP, gradoC) {
  var knotsC = cardP + gradoC + 1;
  var knots = [0,0,0];
  for(var i = 0; i < (knotsC - 3 - 3); i++) {
    knots.push(i+1);
  }
  
  knots.push(i+1);
  knots.push(i+1);
  knots.push(i+1);
  
  return knots;
};

// =================================================================================
// =================================================================================
// 
// =================================================================================
// =================================================================================

function Colonna() {
  this.baseColonna = 10;
  this.baseColonnaSpessore = 0.5;
  this.altezzaColonnaNoCap = 34;
  //
  this.scalaCapitelloX = 0.22; 
  this.scalaCapitelloY = 0.18; 
  this.scalaCapitelloZ = 0.45;
  this.altezzaCapitello = 0.2;
}

Colonna.prototype.curvaCapitello_Controls = function(raggioMax) {
  raggioMax = raggioMax || 1;
  var controlPoints = [];
  
  var i = 0;
  var angolo = PI/2;
  if ( PROJECT_NEWCAPITAL_ROTATION == true ) {
    angolo = PI/3;
  }

  for (i = 0; i < 13; i++) {
    controlPoints.push( [raggioMax * ( COS(i*angolo) + i*SIN(i*angolo)  ), raggioMax * ( SIN(i*angolo) - i*COS(i*angolo)  ), 0] );
  }
  
  return controlPoints;
};

Colonna.prototype.curvaCapitello_NubsPoints = function(raggioMax, scaleFactor, traslaQty, traslaAsse) {
  raggioMax = raggioMax || 1;
  scaleFactor = scaleFactor || 1;
  raggioMax = raggioMax || 1;
  traslaQty = traslaQty || 0;

  //
  var controlPoints = this.curvaCapitello_Controls(raggioMax);
  // Ruoto
  controlPoints = PointUtils.ruotaPunti(controlPoints, PI/4, 2);
  // Ribalto
  controlPoints = PointUtils.ribaltaPunti(controlPoints, 1);
  
  if ( scaleFactor !== 1) { 
    controlPoints = PointUtils.scalaPunti(controlPoints, scaleFactor);
  }
  
  if (traslaQty !== 0) {
    controlPoints = PointUtils.traslaPunti(controlPoints, traslaAsse, traslaQty);
  }
  
  return controlPoints
};

Colonna.prototype.curvaCapitello = function(raggioMax, scaleFactor, traslaQty, traslaAsse) {
  raggioMax = raggioMax || 1;
  scaleFactor = scaleFactor || 1;
  raggioMax = raggioMax || 1;
  traslaQty = traslaQty || 0;
  
  var controlPoints = this.curvaCapitello_NubsPoints(raggioMax, scaleFactor, traslaQty, traslaAsse);
  
  return CurveUtils.createS0NUBS(2, controlPoints, false);
};

Colonna.prototype.creaCapitello_TappoSpirale = function(zTappo, scalaSpirale) {
  /*
  var spiraleGenerica = this.curvaCapitello_Controls();
  // Perchè ???? Mi sono dimenticato
  // spiraleGenerica.push(spiraleGenerica[10]);

  spiraleGenerica = PointUtils.ruotaPunti(spiraleGenerica, PI/4, 2);
  spiraleGenerica = PointUtils.scalaPunti(spiraleGenerica, scalaSpirale);
  spiraleGenerica = PointUtils.ribaltaPunti(spiraleGenerica, 1);
  spiraleGenerica = PointUtils.traslaPunti(spiraleGenerica, 2, zTappo);
  */

  var spiraleGenerica = this.curvaCapitello_NubsPoints(1, scalaSpirale, zTappo, 2);

  var curvaTappo = CurveUtils.createS0NUBS(2, spiraleGenerica);
  var curvaFakePoint = CurveUtils.createBezier(S0, [spiraleGenerica[12]]);
  
  return CurveUtils.createBezier(S1, [curvaTappo, curvaFakePoint]);
};

Colonna.prototype.creaCapitello_TappoCentrale = function(zInizio, zTappo, lunghTappo, scaleSpiralBig, scaleSpirallittle) {
  var spiraleGenerica = this.curvaCapitello_NubsPoints(); /* this.curvaCapitello_Controls();
  spiraleGenerica = PointUtils.ruotaPunti(spiraleGenerica, PI/4, 2);
  spiraleGenerica = PointUtils.ribaltaPunti(spiraleGenerica, 1); */

  var puntoFinaleGenerico = spiraleGenerica[spiraleGenerica.length - 1];
  var puntoBig = puntoFinaleGenerico.map(function(item) { return item*scaleSpiralBig; });
  var puntoLittle = puntoFinaleGenerico.map(function(item) { return item*scaleSpirallittle; });
  // La Z buona
  var xDiff = puntoBig[0] - puntoLittle[0];
  puntoBig[2] = zInizio;
  puntoLittle[2] = zInizio;

  var stanghettaVerticale = [puntoBig,  
                [puntoBig[0] + lunghTappo, puntoBig[1], puntoLittle[2]], 
                [puntoBig[0] + lunghTappo, puntoLittle[1], puntoBig[2] ],
                puntoLittle,
                puntoBig ];   
  
  var tappoProfondita = [ [puntoLittle[0], puntoLittle[1], puntoLittle[2] + zTappo],
              [puntoLittle[0] + lunghTappo + xDiff, puntoLittle[1], puntoLittle[2] + zTappo],
              [puntoLittle[0] + lunghTappo + xDiff, 0, puntoLittle[2] + zTappo],
              [0, 0, puntoLittle[2] + zTappo],
              [puntoLittle[0], puntoLittle[1], puntoLittle[2] + zTappo]
               ];              

  var modelTappi = STRUCT([  
      SIMPLICIAL_COMPLEX(stanghettaVerticale)([[0,1,2],[2,3,4]]),
      SIMPLICIAL_COMPLEX(tappoProfondita)([[0,1,2],[2,3,4]]),
    ]);

  return modelTappi;
};

Colonna.prototype.creaCapitello_TappoCentraleSuperiore = function(zInizio, zFine, zRil, lunghTappo, scaleSpiralBig, scaleSpirallittle) {
  var spiraleGenerica = this.curvaCapitello_NubsPoints(); /* this.curvaCapitello_Controls();
  spiraleGenerica = PointUtils.ruotaPunti(spiraleGenerica, PI/4, 2);
  spiraleGenerica = PointUtils.ribaltaPunti(spiraleGenerica, 1); */

  var puntoFinaleGenerico = spiraleGenerica[spiraleGenerica.length - 1];
  var puntoBig = puntoFinaleGenerico.map(function(item) { return item*scaleSpiralBig; });
  var puntoLittle = puntoFinaleGenerico.map(function(item) { return item*scaleSpirallittle; });
  // La Z buona
  var xDiff = puntoBig[0] - puntoLittle[0];
  puntoBig[2] = zInizio;
  puntoLittle[2] = zInizio;

  var rettangoloSuperiore = [puntoBig, 
                [puntoBig[0] + lunghTappo, puntoBig[1], puntoBig[2]], 
                [puntoBig[0] + lunghTappo, puntoBig[1], puntoBig[2] + zFine],
                [puntoBig[0], puntoBig[1], puntoBig[2] + zFine ],
                puntoBig ];   
  
  var rettangoloInferiore = [puntoLittle, 
                [puntoLittle[0] + lunghTappo + xDiff, puntoLittle[1], puntoLittle[2]], 
                [puntoLittle[0] + lunghTappo + xDiff, puntoLittle[1], puntoLittle[2] + zFine],
                [puntoLittle[0], puntoLittle[1], puntoLittle[2] + zFine ],
                puntoLittle ];

  var rettangoloIncastroColonna = [ [puntoLittle[0] + lunghTappo + xDiff, 0, zInizio - zRil],
                    [puntoLittle[0] + lunghTappo + xDiff, 0, zFine + zRil],
                    [0, 0, zFine + zRil],
                    [0, 0, zInizio - zRil],
                    [puntoLittle[0] + lunghTappo + xDiff, 0, zInizio - zRil] ];

  var modelTappi = STRUCT([  
      SIMPLICIAL_COMPLEX(rettangoloSuperiore)([[0,1,2],[2,3,4]]),
      SIMPLICIAL_COMPLEX(rettangoloInferiore)([[0,1,2],[2,3,4]]),
      SIMPLICIAL_COMPLEX(rettangoloIncastroColonna)([[0,1,2],[2,3,4]]),
    ]);

  return modelTappi;
};

Colonna.prototype.creaCapitello_TappoSpiraliLowRes = function(lunghTappo, scaleSpiralBig, scaleSpiralLittle) {
  var curvaExt = this.curvaCapitello_NubsPoints(1, scaleSpiralBig);
  var curvaInt = this.curvaCapitello_NubsPoints(1, scaleSpiralLittle);

  var curvaExtBack = this.curvaCapitello_NubsPoints(1, scaleSpiralBig, lunghTappo, 2);
  var curvaIntBack = this.curvaCapitello_NubsPoints(1, scaleSpiralLittle, lunghTappo, 2);

  var rettangoloTappo = [curvaExt[0],
              curvaInt[0],curvaIntBack[0],curvaExtBack[0],
               curvaExt[0] ];

  var modelTappi = SIMPLICIAL_COMPLEX(rettangoloTappo)([[0,1,2],[2,3,4]]);

  return modelTappi;
};

Colonna.prototype.creaHalfCapitello = function() {
  var usaDominio3D = PROJECT_3DCOLUMN;
  //
  var zCapitello = -10;
  var scalaSpiraleGrossa = 1.05;
  var scalaSpiralePiccola = 0.9-0.05;
  var rilievoTappo = -1;
  var lunMedianaCap = 10;

  // Genera tappi
  var tappoAnteriore = this.creaCapitello_TappoSpirale(rilievoTappo, scalaSpiralePiccola);
  var tappoPosteriore = this.creaCapitello_TappoSpirale(zCapitello-(rilievoTappo), scalaSpiralePiccola);
  var tappoCentraleAnteriore = this.creaCapitello_TappoCentrale(0, rilievoTappo, lunMedianaCap, scalaSpiraleGrossa, scalaSpiralePiccola);
  var tappoCentralePosteriore = this.creaCapitello_TappoCentrale(zCapitello, -rilievoTappo, lunMedianaCap, scalaSpiraleGrossa, scalaSpiralePiccola);
  var tappoCentraleSupInf = this.creaCapitello_TappoCentraleSuperiore(0, zCapitello, -rilievoTappo, lunMedianaCap, scalaSpiraleGrossa, scalaSpiralePiccola);
  // ------------
  
  var curvaExt = this.curvaCapitello(1, scalaSpiraleGrossa);
  var curvaInt = this.curvaCapitello(1, scalaSpiralePiccola);

  var curvaExtBack = this.curvaCapitello(1, scalaSpiraleGrossa, zCapitello, 2);
  var curvaIntBack = this.curvaCapitello(1, scalaSpiralePiccola, zCapitello, 2);
  
  var supAnteriore = CurveUtils.createBezier(S1, [curvaInt,curvaExt]);
  var supPosteriore = CurveUtils.createBezier(S1, [curvaIntBack,curvaExtBack]);

  var profonditaCapitelloSolido;
  usaDominio3D = false;
  if ( usaDominio3D == true ) {
    profonditaCapitelloSolido = MAP( CurveUtils.createBezier(S2, [supAnteriore,supPosteriore]) )( CommonDomains.DIM3_DOMAIN );
   } else {
    if (PROJECT_NEWCAPITAL == true) {
      var profonditaCapitelloSolidoExt = CYLINDRICAL_SURFACE(curvaExt)([0,0,rilievoTappo]);
      var profonditaCapitelloSolidoInt = CYLINDRICAL_SURFACE(curvaInt)([0,0,rilievoTappo]);
      var profonditaCapitelloSolidoExtB = CYLINDRICAL_SURFACE(curvaExtBack)([0,0,-rilievoTappo]);
      var profonditaCapitelloSolidoIntB = CYLINDRICAL_SURFACE(curvaIntBack)([0,0,-rilievoTappo]);
      //
      var curvaExtFront_rilievo = this.curvaCapitello(1, scalaSpiraleGrossa, rilievoTappo, 2);
      var curvaExtBack_rilievo = this.curvaCapitello(1, scalaSpiraleGrossa, zCapitello-rilievoTappo, 2);
      var curvaIntCentrale_scale = 0.92;

      var curvaIntFront_rilievo = this.curvaCapitello(1, scalaSpiralePiccola, rilievoTappo*5/3, 2);
      var curvaIntBack_rilievo = this.curvaCapitello(1, scalaSpiralePiccola, zCapitello-(5/3*rilievoTappo), 2);
      var curvaIntCentrale = this.curvaCapitello(1, scalaSpiralePiccola*curvaIntCentrale_scale, zCapitello/2, 2);
      //
      var bezierFB_cp = REPEAT(2)(curvaIntFront_rilievo);
      bezierFB_cp[0] = curvaExtFront_rilievo; bezierFB_cp.push(curvaIntCentrale);
      var bezierFB = CurveUtils.createBezier(S1, bezierFB_cp);
      //
      var bezierBF_cp = REPEAT(2)(curvaIntBack_rilievo);
      bezierBF_cp[0] = curvaExtBack_rilievo; bezierBF_cp.push(curvaIntCentrale);      
      var bezierBF = CurveUtils.createBezier(S1, bezierBF_cp);
      // tappo Strano
      var tappoTriangolareStrano = function(currObj, scaleInterno) {
        var ptFront = currObj.curvaCapitello_NubsPoints(1, scalaSpiraleGrossa, rilievoTappo, 2);
        var ptBack = currObj.curvaCapitello_NubsPoints(1, scalaSpiraleGrossa, zCapitello-rilievoTappo, 2);
        var ptMiddle = currObj.curvaCapitello_NubsPoints(1, scalaSpiralePiccola*scaleInterno*0.5, zCapitello/2, 2); 

        var curvaChiusura = CurveUtils.createS0NUBS(2, [ptFront[ptFront.length-1], ptMiddle[ptMiddle.length-1], ptBack[ptBack.length-1]], false);
        var curvaChiusura2 = CurveUtils.createS0NUBS(1, [ptFront[ptFront.length-1], ptFront[ptFront.length-1], ptBack[ptBack.length-1], ptBack[ptBack.length-1]], false);
        var tappoChiusura = NUBS(S1)(1)([0,0,3,3])([curvaChiusura,curvaChiusura2]);
        // var tappoChiusura = CONICAL_SURFACE(ptMiddle[ptMiddle.length-1])(curvaChiusura);
        return MAP(tappoChiusura)(CommonDomains.DIM2_DOMAIN);
        // return SIMPLICIAL_COMPLEX([ptFront[ptFront.length-1], ptBack[ptBack.length-1], ptMiddle[ptMiddle.length-1]])([[0,1,2]]);       
      };


      // Tappo a cylindrical surface
      var chiusuraSpirali = this.creaCapitello_TappoSpiraliLowRes(zCapitello, scalaSpiraleGrossa, scalaSpiralePiccola);
      // Genera il tutto
      profonditaCapitelloSolido = STRUCT([ MAP( profonditaCapitelloSolidoExt )( CommonDomains.DIM2_DOMAIN ),
                         MAP( profonditaCapitelloSolidoInt )( CommonDomains.DIM2_DOMAIN ),
                         MAP( profonditaCapitelloSolidoExtB )( CommonDomains.DIM2_DOMAIN ),
                         MAP( profonditaCapitelloSolidoIntB )( CommonDomains.DIM2_DOMAIN ), 
                         //
                         MAP( bezierFB )( CommonDomains.DIM2RPP_DOMAIN ), 
                         MAP( bezierBF )( CommonDomains.DIM2RPP_DOMAIN ),
                         // tappi
                         tappoTriangolareStrano(this, curvaIntCentrale_scale),
                         chiusuraSpirali
                         ]);   
    } else {
      var profonditaCapitelloSolidoExt = CYLINDRICAL_SURFACE(curvaExt)([0,0,zCapitello]);
      var profonditaCapitelloSolidoInt = CYLINDRICAL_SURFACE(curvaInt)([0,0,zCapitello]);
      // Tappo a cylindrical surface
      var chiusuraSpirali = this.creaCapitello_TappoSpiraliLowRes(zCapitello, scalaSpiraleGrossa, scalaSpiralePiccola);
      // Genera il tutto
      profonditaCapitelloSolido = STRUCT([ MAP( profonditaCapitelloSolidoExt )( CommonDomains.DIM2_DOMAIN ),
                         MAP( profonditaCapitelloSolidoInt )( CommonDomains.DIM2_DOMAIN ),
                         chiusuraSpirali
                         ]);      
    }


  }

  // Fregio
  var cuboFregio = CUBOID([7,4,-zCapitello]);
  var fregioTrans = T([0,1,2])([7,1,zCapitello]);
  var fregioRepeat = T([0])([4.5]);

  
  var modello = STRUCT([
      // tappi
      MAP( tappoAnteriore )( CommonDomains.DIM2_DOMAIN ),
      MAP( tappoPosteriore )( CommonDomains.DIM2_DOMAIN ),
      tappoCentraleAnteriore,
      tappoCentralePosteriore,
      tappoCentraleSupInf,
      // spirali
      MAP( supAnteriore )( CommonDomains.DIM2_DOMAIN ),
      MAP( supPosteriore )( CommonDomains.DIM2_DOMAIN ),
      // spirali 3d
      profonditaCapitelloSolido,
      // Fregio
      fregioTrans, cuboFregio
  ]);
  

  return modello;
};

Colonna.prototype.creaCapitello = function() {
  var halfLeft = this.creaHalfCapitello();
  var halfRight = S([0])([-1])(this.creaHalfCapitello());

  var finalModel = [];
  if ( PROJECT_NOFUNCTIONALTRS == true ) {
    finalModel.push( this.creaHalfCapitello() );
    finalModel.push( (this.creaHalfCapitello().scale([0],[-1])).translate([0],[29]) );
  } else {
    finalModel.push( this.creaHalfCapitello() );
    finalModel.push( T([0])([29]) );
    finalModel.push( S([0])([-1])(this.creaHalfCapitello()) );
  }

  return STRUCT(finalModel);
};

Colonna.prototype.creaColonna = function() {

  var basicControlPoints = [];
  // Inizio base
  basicControlPoints.push([[5,0,0],[4,0.2,0],[0,1,0],[-0.3,0,0]]);
  // Piatto sopra base
  basicControlPoints.push([[4,0.2,0],[3,0.8,0],[-0.3,0,0],[0.3,0,0]]);
  // Pancia sale
  basicControlPoints.push([[3,0.8,0],[3.6,1.4,0],[0.6,0,0],[0,0.6,0]]);
  // Pancia piatta
  basicControlPoints.push([[3.6,1.4,0],[3.6,1.6,0],[0,0,0],[0,0,0]]);
  // Pancia rientra
  basicControlPoints.push([[3.6,1.6,0],[3,2.4,0],[0,0.6,0],[-0.6,0,0]]);
  // La colonna
  basicControlPoints.push([[3,2.4,0],[1.8,this.altezzaColonnaNoCap,0],[0,14,0],[-1,0,0]]);
  
  // Test
  // basicControlPoints.push([[3,2.4,0],[1.8,this.altezzaColonnaNoCap-0.5,0],[0,14,0],[-1,0,0]]);
  // basicControlPoints.push([[1.8,this.altezzaColonnaNoCap-0.5,0],[2.5,this.altezzaColonnaNoCap-0.2,0],[0,1,0],[-1,0,0]]);
  // basicControlPoints.push([[2.5,this.altezzaColonnaNoCap-0.2,0],[1.8,this.altezzaColonnaNoCap,0],[0,-1,0],[1,0,0]]);

  // Tappo superiore
  basicControlPoints.push([[1.8,this.altezzaColonnaNoCap,0],[0,this.altezzaColonnaNoCap,0],[0,0,0],[0,0,0]]);

  // muoviamo punti asse X
  var puntiAsseXZ = basicControlPoints.map(function(cpoints) { return PointUtils.ruotaPunti(cpoints, PI/2, 0); });
  // Crea curve
  var curveColonna = puntiAsseXZ.map(function(cpoints) { return CurveUtils.createHermite(S0, cpoints); } );
  var colonnaRotational = AA(ROTATIONAL_SURFACE)(curveColonna);
  var colonnaSurfaces = CONS( AA(MAP)(colonnaRotational) )(CommonDomains.DIM2R_DOMAIN);
  

  var modReturn = null;
  var deltaZ = 0.1;

  if (PROJECT_NOFUNCTIONALTRS == true) {
    // Genera superfici senza clone()
    var structSuperfici = STRUCT(colonnaSurfaces).translate([2], [this.baseColonnaSpessore]);
    var baseQuadrata = CUBOID([this.baseColonna,this.baseColonna,this.baseColonnaSpessore]).translate([0,1],[-(this.baseColonna/2),-(this.baseColonna/2)]);
    var capitelloTop = ((this.creaCapitello().scale([0,1,2], [this.scalaCapitelloX,this.scalaCapitelloY,this.scalaCapitelloZ])).rotate([1,2], PI/2)).translate([0,1,2], [-3.2,-2.3,this.altezzaColonnaNoCap+this.altezzaCapitello+deltaZ])
    // Modello finale orientato sulle x
    modReturn = STRUCT([
            COLOR(ColoriProgetto.INTONACO_BASE)(structSuperfici),
            COLOR(ColoriProgetto.INTONACO_SCURO)(baseQuadrata),
            COLOR(ColoriProgetto.INTONACO_BASE)(capitelloTop)
            ]).rotate([0,1], PI);
  } else {
    // Genera superfici
    var structSuperfici = T([2])([this.baseColonnaSpessore])( STRUCT(colonnaSurfaces) );
    var baseQuadrata = T([0,1])([-(this.baseColonna/2),-(this.baseColonna/2)])(CUBOID([this.baseColonna,this.baseColonna,this.baseColonnaSpessore]));
    var capitelloTop = T([0,1,2])([-3.2,-2.3,this.altezzaColonnaNoCap+this.altezzaCapitello+deltaZ])( R([1,2])(PI/2)( S([0,1,2])([this.scalaCapitelloX,this.scalaCapitelloY,this.scalaCapitelloZ])(this.creaCapitello()) ) );
    // Modello finale orientato sulle x
    var rotazioneOrientante = R([0,1])(PI);
    modReturn = rotazioneOrientante( STRUCT([
            COLOR(ColoriProgetto.INTONACO_BASE)(structSuperfici),
            COLOR(ColoriProgetto.INTONACO_SCURO)(baseQuadrata),
            COLOR(ColoriProgetto.INTONACO_BASE)(capitelloTop)
            ]) );   
  }

  return modReturn;
};

// --------------------------

var CommonParetiMeasure = function() {};
CommonParetiMeasure.spessoreParete = 1;
CommonParetiMeasure.spessoreBordo = 0.3;
CommonParetiMeasure.larghezzaParete = 21;
CommonParetiMeasure.larghezzaPareteLunga = 13;
CommonParetiMeasure.altezzaParete = 40.7;
CommonParetiMeasure.altezzaPareteLunga = 53.5;
//
CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio = 4/3;
CommonParetiMeasure.cornicioneSuperiore_AltezzaRatio = 4/3;
//
CommonParetiMeasure.torretta = {"pareteSenzaFinestra": 7, "profonditaLaterale": 4};

// --------------------------

function ParetiColonnato() {
  this.spessoreParete = CommonParetiMeasure.spessoreParete;
  this.spessoreBordo = CommonParetiMeasure.spessoreBordo;
  this.larghezzaParete = CommonParetiMeasure.larghezzaParete;
  this.altezzaParete = CommonParetiMeasure.altezzaParete;
  this.centroParetiX = (this.larghezzaParete * 5) / 2;
}

ParetiColonnato.prototype.creaParetePorta = function() {
  var spessoreParete = this.spessoreParete;
  var spessoreBordo = this.spessoreBordo;
  var larghezzaParete = this.larghezzaParete;
  var altezzaParete = this.altezzaParete;
  //
  var deltaBordo = 0.5;
  //
  var frameInternoH = 9;
  var frameInternoV = 19;
  var frameEsternoH = 11;
  var frameEsternoV = 21 - deltaBordo;
  //
  var bordoH = 2 - deltaBordo;
  var bordoV = bordoH;

  //
  var finalModel = [];
  //

  var modelloParete = STRUCT([ SIMPLEX_GRID( [[(larghezzaParete-frameInternoH)/2,-frameInternoH,(larghezzaParete-frameInternoH)/2],[spessoreParete],[altezzaParete]] ),
                   SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreParete],[-frameInternoV,altezzaParete-frameInternoV]] )
            ]);
  finalModel.push( COLOR(ColoriProgetto.INTONACO_BASE)(modelloParete) );

  var bordoPorta = STRUCT([ SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH-(bordoH*2))/2),bordoH,-frameInternoH,bordoH,-((larghezzaParete-frameInternoH-(bordoH*2))/2)],[spessoreBordo],[frameEsternoV,-(altezzaParete-frameEsternoV)]] ),
                SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreBordo],[-frameInternoV,bordoV,-(altezzaParete-frameInternoV-bordoV)]] )
            ]);
  
  var portaLegno = this.creaPorta(frameInternoH, frameInternoV);

  if ( PROJECT_NOFUNCTIONALTRS == true ) {
    finalModel.push( COLOR(ColoriProgetto.INTONACO_BORDI)( bordoPorta.translate([1], [-spessoreBordo]) ) );
    finalModel.push( portaLegno.translate([0,1], [(larghezzaParete-frameInternoH)/2,spessoreParete/2]) );
  } else {
    finalModel.push( COLOR(ColoriProgetto.INTONACO_BORDI)( T([1])([-spessoreBordo])(bordoPorta) ) );
    finalModel.push( T([0,1])([(larghezzaParete-frameInternoH)/2,spessoreParete/2])( portaLegno ) );
  }

  return STRUCT(finalModel);
};

ParetiColonnato.prototype.creaPorta = function(frameInternoH, frameInternoV) {
  var spessoreParete = this.spessoreParete;
  var spessoreBordo = this.spessoreBordo;
  var larghezzaParete = this.larghezzaParete;
  var altezzaParete = this.altezzaParete;
  //
  var profBande = spessoreBordo;
  var spessBandaH = 0.6;
  var spessBandaV = spessBandaH;
  var spessPannello = profBande/3;

  //
    var sbarraVerticale = COLOR(ColoriProgetto.INFISSO_PORTA)(
                SIMPLEX_GRID([[spessBandaV],[profBande],[frameInternoV]])
                );

    var sbarraOrizzontale = COLOR(ColoriProgetto.INFISSO_PORTA)(
                 SIMPLEX_GRID([[frameInternoH],[profBande],[spessBandaH]])
                );

  var pannello = COLOR(ColoriProgetto.LEGNO_PORTA)(
          BOUNDARY(
              SIMPLEX_GRID([[frameInternoH],[spessPannello],[frameInternoV]])
            )
          );

    var bandeLateraliH = COLOR(ColoriProgetto.INFISSO_PORTA)(
            SIMPLEX_GRID([[frameInternoH],[profBande],[spessBandaH/2]])
          );

    var bandeLateraliV = COLOR(ColoriProgetto.INFISSO_PORTA)(
            SIMPLEX_GRID([[spessBandaV/2],[profBande],[frameInternoV]])
          );

    var finModel = [];
  finModel.push( T([1])([spessPannello])(pannello) );
  finModel.push( bandeLateraliV );
  finModel.push( T([0])([frameInternoH-(spessBandaV/2)])(bandeLateraliV) );
  finModel.push( T([0])([(frameInternoH-spessBandaV)/2])(sbarraVerticale) );
  finModel.push( sbarraOrizzontale );
  finModel.push( T([2])([frameInternoV-spessBandaH])(sbarraOrizzontale) );

  finModel.push( T([2])([(1/3)*frameInternoV])(bandeLateraliH) );
  finModel.push( T([2])([(2/3)*frameInternoV])(bandeLateraliH) );

  return STRUCT(finModel);
};

ParetiColonnato.prototype.creaPareteFinestra = function() {
  var spessoreParete = this.spessoreParete;
  var spessoreBordo = this.spessoreBordo;
  var larghezzaParete = this.larghezzaParete;
  var altezzaParete = this.altezzaParete;
  //
  var deltaBordo = 0.5;
  //
  var frameInternoH = 6.5;
  var frameInternoV = 13.5;
  var frameEsternoH = 8.5 - deltaBordo;
  var frameEsternoV = 15.5 - deltaBordo;
  var frameEsternoTV = 3;
  var conInferriata = true;
  //
  var bordoH = 2 - deltaBordo;
  var bordoV = bordoH;

  //
  var finalModel = [];
  //  

  var modelloParete = STRUCT([ SIMPLEX_GRID( [[(larghezzaParete-frameInternoH)/2,-frameInternoH,(larghezzaParete-frameInternoH)/2],[spessoreParete],[altezzaParete]] ),
                   SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreParete],[frameEsternoTV+bordoV,-frameInternoV,(altezzaParete-frameInternoV-frameEsternoTV-bordoV)]] )
            ]);

  finalModel.push( COLOR(ColoriProgetto.INTONACO_BASE)(modelloParete) );

  var bordoFinestra = STRUCT([ SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH-(bordoH*2))/2),bordoH,-frameInternoH,bordoH,-((larghezzaParete-frameInternoH-(bordoH*2))/2)],[spessoreBordo],[-frameEsternoTV,frameEsternoV+bordoV,-(altezzaParete-frameEsternoTV-frameEsternoV-bordoV)]] ),
                SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreBordo],[-frameEsternoTV,bordoV,-frameInternoV,bordoV,-(altezzaParete-frameEsternoTV-(bordoV*2)-frameInternoV)]] )
            ]);

  var finestraVetri = this.creaFinestra(frameInternoH, frameInternoV, conInferriata);

  if ( PROJECT_NOFUNCTIONALTRS == true ) {
    finalModel.push( COLOR(ColoriProgetto.INTONACO_BORDI)( bordoFinestra.translate([1], [-spessoreBordo]) ) );
    finalModel.push( finestraVetri.translate([0,1,2], [(larghezzaParete-frameInternoH)/2,spessoreParete/2,frameEsternoTV+bordoV]) );
  } else {
    finalModel.push( COLOR(ColoriProgetto.INTONACO_BORDI)( T([1])([-spessoreBordo])(bordoFinestra) ) );
    finalModel.push( T([0,1,2])([(larghezzaParete-frameInternoH)/2,spessoreParete/2,frameEsternoTV+bordoV])( finestraVetri ) );
  }

  return STRUCT(finalModel);
};

ParetiColonnato.prototype.creaFinestra = function(frameInternoH, frameInternoV, conInferriata) {
  conInferriata = conInferriata || false;
  //
  var spessoreParete = this.spessoreParete;
  var spessoreBordo = this.spessoreBordo;
  var larghezzaParete = this.larghezzaParete;
  var altezzaParete = this.altezzaParete;
  //
  var spessBandaH = 0.3;
  var spessBandaV = spessBandaH;
  var spessVetro = spessBandaH/3;

  //
    var sbarraVerticale = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
                SIMPLEX_GRID([[spessBandaV],[spessoreBordo],[(2/3)*frameInternoV]])
                );
    var sbarraOrizzontale = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
                 SIMPLEX_GRID([[frameInternoH],[spessoreBordo],[spessBandaH]])
                );
  var vetro = COLOR(ColoriProgetto.VETRO)(
          BOUNDARY(
              SIMPLEX_GRID([[frameInternoH],[spessVetro],[frameInternoV]])
            )
          );
    var bandeLaterali = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
            SIMPLEX_GRID([[spessBandaV],[spessBandaV],[frameInternoV]])
          );

    var finModel = [];
  finModel.push(T([1])([spessVetro])(vetro));
  finModel.push(bandeLaterali);
  finModel.push(T([0])([(frameInternoH-spessBandaV)])(bandeLaterali));
  finModel.push(T([0])([(frameInternoH-spessBandaV)/2])(sbarraVerticale));
  finModel.push(T([0])([spessBandaV])(sbarraOrizzontale));
  finModel.push(T([0,2])([spessBandaV,frameInternoV-spessBandaH])(sbarraOrizzontale));
  finModel.push(T([0,2])([spessBandaV,(2/3)*frameInternoV])(sbarraOrizzontale));
  if ( conInferriata == true ) {
    finModel.push(T([1])([-(spessBandaV/2)])(this.creaFinestra_Inferriata(frameInternoH, frameInternoV)));
  }

  return STRUCT(finModel);
};

ParetiColonnato.prototype.creaFinestra_Inferriata = function(frameInternoH, frameInternoV) {
  var endLinea = frameInternoH >= frameInternoV ? frameInternoH : frameInternoV;
  var intervalloGrate = 2.5;

  var polyStruct = [];
  for (var i = 0; i <= endLinea; i += intervalloGrate) {
    polyStruct.push( POLYLINE([[0,0,i],[i,0,0]]) );
  }

  var quarterModel = T([0,2])([-(frameInternoH/2),-(frameInternoV/2)])( STRUCT(polyStruct) );
  var fullModel = STRUCT([
            quarterModel,
            S([2])([-1]), quarterModel,
            S([0])([-1]), quarterModel,
            S([2])([-1]), quarterModel
          ]);

  return COLOR(ColoriProgetto.INFERRIATE_LEGGERE)( T([0,2])([(frameInternoH/2),(frameInternoV/2)])( fullModel ) );
};

ParetiColonnato.prototype.creaPareteLateralePorta = function() {
  var spessoreParete = this.spessoreParete;
  var spessoreBordo = this.spessoreBordo;
  var larghezzaParete = this.larghezzaParete + 2 + (spessoreParete*2);
  var altezzaParete = this.altezzaParete;
  //
  var deltaBordo = 0.5;
  //
  var frameInternoH = 9;
  var frameInternoV = 17;
  var frameEsternoH = 11;
  var frameEsternoV = 19 - deltaBordo;
  //
  var bordoH = 2 - deltaBordo;
  var bordoV = bordoH;

  //
  var finalModel = [];
  //  

  var modelloParete = STRUCT([ SIMPLEX_GRID( [[(larghezzaParete-frameInternoH)/2,-frameInternoH,(larghezzaParete-frameInternoH)/2],[spessoreParete],[altezzaParete]] ),
                   SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreParete],[-frameInternoV,altezzaParete-frameInternoV]] )
            ]);

  finalModel.push( COLOR(ColoriProgetto.INTONACO_BASE)(modelloParete) );

  var bordoPorta = STRUCT([ SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH-(bordoH*2))/2),bordoH,-frameInternoH,bordoH,-((larghezzaParete-frameInternoH-(bordoH*2))/2)],[spessoreBordo],[frameEsternoV,-(altezzaParete-frameEsternoV)]] ),
                SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreBordo],[-frameInternoV,bordoV,-(altezzaParete-frameInternoV-bordoV)]] )
            ]);

  var portaLegno = this.creaPorta(frameInternoH, frameInternoV);

  if ( PROJECT_NOFUNCTIONALTRS == true ) {
    finalModel.push( COLOR(ColoriProgetto.INTONACO_BORDI)( bordoPorta.translate([1], [-spessoreBordo]) ) );
    finalModel.push( portaLegno.translate([0,1], [(larghezzaParete-frameInternoH)/2,spessoreParete/2]) );

    finalModel = STRUCT(finalModel).translate([0], [-larghezzaParete+spessoreParete]);
  } else {
    finalModel.push( COLOR(ColoriProgetto.INTONACO_BORDI)( T([1])([-spessoreBordo])(bordoPorta) ) );
    finalModel.push( T([0,1])([(larghezzaParete-frameInternoH)/2,spessoreParete/2])( portaLegno ) );

    finalModel = T([0])([-larghezzaParete+spessoreParete])( STRUCT(finalModel) );
  }

  return finalModel;
};

ParetiColonnato.prototype.creaParetePatio = function() {
  var transRipeti = T([0])([this.larghezzaParete]);
  var pareteLateraleL = R([0,1])(PI/2)( this.creaPareteLateralePorta() );
  var pareteLateraleR = S([0])([-1])( pareteLateraleL );

  var modelloFinale = STRUCT([
              pareteLateraleL,
              this.creaPareteFinestra(), transRipeti,
              this.creaPareteFinestra(), transRipeti,
              this.creaParetePorta(), transRipeti,
              this.creaPareteFinestra(), transRipeti,
              this.creaPareteFinestra(), transRipeti,
              pareteLateraleR
          ]);

  return modelloFinale;
};

// --------------------------

function CornicionePatio() {
  this.larghezzaMax = 2;
  this.altezzaMax = 2.14;
};

CornicionePatio.prototype.getControlPoints = function() {
  // Punti controllo NUBS colonna
  var ctPoints = [
            // Superficie fondo
            [0,0,0],[0,0,0],
            // A,B,C
            [1,0,0],[1,0.5,0],[1.2,0.5,0],
            // D,E,F
            [1.2,1,0],[1.6,1,0],[1.6,1.5,0],
            // G
            [this.larghezzaMax,this.altezzaMax,0],
            // Superficie top
            [0,this.altezzaMax,0],[0,this.altezzaMax,0]
          ];

  return ctPoints.map(function(item){ return item; });
};

CornicionePatio.prototype.creaCornicioneRetto = function(length) {
  var ctPoints = this.getControlPoints();

  // Metti punti in XZ
  ctPoints = PointUtils.ruotaPunti(ctPoints, PI/2, 0);
  var prof1 = CurveUtils.createS0NUBS(1, ctPoints);

  // CYLINDRICAL_SURFACE
  var mapProfileCornicione = CYLINDRICAL_SURFACE(prof1)([0,length,0]);

  // Tappo sul retro
  var tappoRetro = SIMPLICIAL_COMPLEX([ ctPoints[0], ctPoints[ctPoints.length-1], 
    [ ctPoints[ctPoints.length-1][0], ctPoints[ctPoints.length-1][1] + length, ctPoints[ctPoints.length-1][2] ], 
    [ ctPoints[0][0], ctPoints[0][1] + length, ctPoints[0][2] ],
    ctPoints[0]  ])([[0,1,2],[2,3,4]]);

  return STRUCT([
          MAP(mapProfileCornicione)(CommonDomains.DIM2_DOMAIN_LOWRES),
          tappoRetro
        ]);
};

CornicionePatio.prototype.creaCornicioneAngolo = function() {
  var ctPoints = this.getControlPoints();

  // Metti punti in XZ
  ctPoints = PointUtils.ruotaPunti(ctPoints, PI/2, 0);
  var prof1 = CurveUtils.createS0NUBS(1, ctPoints);

  // Profilo ruotato
  var ctPointsRR = PointUtils.scalaPuntiAsse(this.getControlPoints(), SQRT(2), 0);
  ctPointsRR = PointUtils.ruotaPunti(ctPointsRR, PI/2, 0);
  ctPointsRR = PointUtils.ruotaPunti(ctPointsRR, PI/4, 2);
  var prof2 = CurveUtils.createS0NUBS(1, ctPointsRR);

  // Superficie
  var mapProfileCornicione = NUBS(S1)(1)([0,0,3,3])([prof1,prof2]);

  return MAP(mapProfileCornicione)(CommonDomains.DIM2_DOMAIN_LOWRES); 
};

CornicionePatio.prototype.creaCornicione = function(length, leftAngle, rightAngle) {
  length = length || 1;
  leftAngle = leftAngle || false;
  rightAngle = rightAngle || false;
  //

  var resultModel = [];
  resultModel.push( this.creaCornicioneRetto(length) );
  if ( leftAngle == true ) {
    if ( PROJECT_NOFUNCTIONALTRS == true ) {
      resultModel.push( this.creaCornicioneAngolo().scale([1],[-1]) );
    } else {
      resultModel.push( S([1])([-1])( this.creaCornicioneAngolo() ) );
    }
  }
  if ( rightAngle == true ) {
    if ( PROJECT_NOFUNCTIONALTRS == true ) {
      resultModel.push( this.creaCornicioneAngolo().translate([1],[length]) );
    } else {
      resultModel.push( T([1])([length])( this.creaCornicioneAngolo() ) );
    }
  }

  if ( PROJECT_NOFUNCTIONALTRS == true ) {
    resultModel = STRUCT(resultModel).rotate([0,1], -PI/2);
  } else {
    resultModel = R([0,1])(-PI/2)( STRUCT(resultModel) );
  }

  return resultModel;
};

// --------------------------

function ModuliPareti() {
  this.spessoreParete = CommonParetiMeasure.spessoreParete;
  this.spessoreBordo = CommonParetiMeasure.spessoreBordo;
  this.larghezzaParete = CommonParetiMeasure.larghezzaPareteLunga;
  this.altezzaParete = CommonParetiMeasure.altezzaPareteLunga;
  //
  this.deltaBordo = 0.5;
  this.bordoS = 2;
  this.bordoH = this.bordoS - this.deltaBordo;
  this.bordoV = this.bordoH;
  // deltaPatio
  this.deltaCornicione = 0.174;
  //
  this.altezzaBordoInferiore = (4/3)*this.bordoV;
  this.deltaBordoInferiore = 1.4;
};

ModuliPareti.prototype.getCornicioneCubico = function(posCornicioneAlto) {
  // -x,-y

  var spessoreParete = this.spessoreParete;
  var spessoreBordo = this.spessoreBordo;
  // var larghezzaParete = larghezza;
  var altezzaParete = this.altezzaParete;
  //
  var deltaBordo = this.deltaBordo;
  //
  var frameInternoH = 5;
  var frameInternoV = 10;
  var frameEsternoH = 7 - deltaBordo;
  var frameEsternoV = 12 - deltaBordo;
  var frameEsternoTV1 = 3 + deltaBordo;
  var frameEsternoTV2 = 37.5 + deltaBordo;
  //
  var bordoH = this.bordoH;
  var bordoV = this.bordoV;
  //
  posCornicioneAlto = posCornicioneAlto || (frameEsternoTV2 + frameEsternoV + bordoV + 3*deltaBordo - this.deltaCornicione);
  //
  /*
  var angoloDx = STRUCT([
      SIMPLICIAL_COMPLEX([[0,0,0],[1,0,0],[0,1,0]])([[0,1,2]]),
      SIMPLICIAL_COMPLEX([[0,0,0],[0,0,1],[1,0,1],[1,0,0]])([[0,1,2],[2,3,0]]),
      SIMPLICIAL_COMPLEX([[0,0,0],[0,0,1],[0,1,1],[0,1,0]])([[0,1,2],[2,3,0]]),
      SIMPLICIAL_COMPLEX([[0,1,0],[0,1,1],[1,0,1],[1,0,0]])([[0,1,2],[2,3,0]]),
      SIMPLICIAL_COMPLEX([[0,0,1],[1,0,1],[0,1,1]])([[0,1,2]])
    ]);
  */

  return COLOR(ColoriProgetto.INTONACO_BORDI)(
              STRUCT([ 
                T([1])([-spessoreBordo]),
                T([0,1,2])([-(2/3)*spessoreBordo,-(2/3)*spessoreBordo,-this.altezzaBordoInferiore])( SIMPLEX_GRID( [[this.deltaBordoInferiore * CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio * spessoreBordo],[this.deltaBordoInferiore * CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio * spessoreBordo],[this.altezzaBordoInferiore]] ) ),
                SIMPLEX_GRID( [[spessoreBordo],[spessoreBordo],[(4/3)*bordoV]] ),
                SIMPLEX_GRID( [[spessoreBordo],[spessoreBordo],[-posCornicioneAlto,altezzaParete-posCornicioneAlto]] ),
                T([0,1])([-(1/3)*spessoreBordo,-(1/3)*spessoreBordo]),
                SIMPLEX_GRID( [[CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio * spessoreBordo],[CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio * spessoreBordo],[-altezzaParete,CommonParetiMeasure.cornicioneSuperiore_AltezzaRatio * bordoV]] )
              ])
            );  
};

ModuliPareti.prototype.getCornicioni = function(larghezza, posCornicioneAlto) {
  var spessoreParete = this.spessoreParete;
  var spessoreBordo = this.spessoreBordo;
  var larghezzaParete = larghezza;
  var altezzaParete = this.altezzaParete;
  //
  var deltaBordo = this.deltaBordo;
  //
  var frameInternoH = 5;
  var frameInternoV = 10;
  var frameEsternoH = 7 - deltaBordo;
  var frameEsternoV = 12 - deltaBordo;
  var frameEsternoTV1 = 3 + deltaBordo;
  var frameEsternoTV2 = 37.5 + deltaBordo;
  //
  var bordoH = this.bordoH;
  var bordoV = this.bordoV;
  //
  posCornicioneAlto = posCornicioneAlto || (frameEsternoTV2 + frameEsternoV + bordoV + 3*deltaBordo - this.deltaCornicione);
  //

  return COLOR(ColoriProgetto.INTONACO_BORDI)(
              STRUCT([ 
                T([1])([-spessoreBordo]),
                T([1,2])([-(2/3)*spessoreBordo,-this.altezzaBordoInferiore])( SIMPLEX_GRID( [[larghezzaParete],[this.deltaBordoInferiore * CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio * spessoreBordo],[this.altezzaBordoInferiore]] ) ),
                SIMPLEX_GRID( [[larghezzaParete],[spessoreBordo],[(4/3)*bordoV]] ),
                SIMPLEX_GRID( [[larghezzaParete],[spessoreBordo],[-posCornicioneAlto,altezzaParete-posCornicioneAlto]] ),
                T([1])([-(1/3)*spessoreBordo]),
                SIMPLEX_GRID( [[larghezzaParete],[CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio * spessoreBordo],[-altezzaParete,CommonParetiMeasure.cornicioneSuperiore_AltezzaRatio * bordoV]] )
              ])
            );  
}

ModuliPareti.prototype.pareteAlta = function(larghezza) {
  var spessoreParete = this.spessoreParete;
  var spessoreBordo = this.spessoreBordo;
  var larghezzaParete = larghezza;
  var altezzaParete = this.altezzaParete;

  var pareteAlta = COLOR(ColoriProgetto.INTONACO_BASE)(
        SIMPLEX_GRID([[larghezzaParete],[spessoreParete],[altezzaParete]])
      );

  var cornicioni = this.getCornicioni(larghezza);

  return STRUCT([pareteAlta, cornicioni]);
};

ModuliPareti.prototype.pareteAltaFinestraPiccola = function() {
  var spessoreParete = this.spessoreParete;
  var spessoreBordo = this.spessoreBordo;
  var larghezzaParete = this.larghezzaParete;
  var altezzaParete = this.altezzaParete;
  //
  var deltaBordo = this.deltaBordo;
  //
  var frameInternoH = 5;
  var frameInternoV = 10;
  var frameEsternoH = 7 - deltaBordo;
  var frameEsternoV = 12 - deltaBordo;
  var frameEsternoTV1 = 3 + deltaBordo;
  var frameEsternoTV2 = 37.5 + deltaBordo;
  //
  var bordoH = this.bordoH;
  var bordoV = this.bordoV;
  //

  var modelloParete = COLOR(ColoriProgetto.INTONACO_BASE)(
              STRUCT([ SIMPLEX_GRID( [[(larghezzaParete-frameInternoH)/2,-frameInternoH,(larghezzaParete-frameInternoH)/2],[spessoreParete],[altezzaParete]] ),
                     SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreParete],
                      [frameEsternoTV1+bordoV,-frameInternoV,frameEsternoTV2-frameEsternoTV1-frameInternoV,-frameInternoV,altezzaParete-frameInternoV-frameEsternoTV2-bordoV]] )
              ])
            );

  var bordoFinestra = COLOR(ColoriProgetto.INTONACO_BORDI)(
              STRUCT([ SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH-(bordoH*2))/2),bordoH,-frameInternoH,bordoH,-((larghezzaParete-frameInternoH-(bordoH*2))/2)],[spessoreBordo],[-frameEsternoTV1,frameEsternoV+bordoV,-(altezzaParete-frameEsternoTV1-frameEsternoV-bordoV)]] ),
                SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreBordo],[-frameEsternoTV1,bordoV,-frameInternoV,bordoV,-(altezzaParete-frameEsternoTV1-(bordoV*2)-frameInternoV)]] )
              ])
            );

  var posCornicioneAlto = frameEsternoTV2 + frameEsternoV + bordoV + 3*deltaBordo - this.deltaCornicione;
  var cornicioni = this.getCornicioni(larghezzaParete, posCornicioneAlto);

  var posBordoFinestra = T([1])([-spessoreBordo])(bordoFinestra);

  var finestraVetriInf = T([0,1,2])([(larghezzaParete-frameInternoH)/2,spessoreParete/2,frameEsternoTV1+bordoV])( this.creaFinestraPiccola(frameInternoH, frameInternoV, true) );
  var finestraVetriSup = T([0,1,2])([(larghezzaParete-frameInternoH)/2,spessoreParete/2,frameEsternoTV1+bordoV])( this.creaFinestraPiccola(frameInternoH, frameInternoV) );

  // finalModel
  var finalModel = [];
  finalModel.push( modelloParete );
  finalModel.push( cornicioni );
  finalModel.push( posBordoFinestra );
  finalModel.push( finestraVetriInf );
  finalModel.push( T([2])([frameEsternoTV2-frameEsternoTV1]) );
  finalModel.push( posBordoFinestra );
  finalModel.push( finestraVetriSup );

  return  STRUCT(finalModel);
};

ModuliPareti.prototype.pareteAltaFinestraGrossa = function() {
  var spessoreParete = this.spessoreParete;
  var spessoreBordo = this.spessoreBordo;
  var larghezzaParete = this.larghezzaParete;
  var altezzaParete = this.altezzaParete;
  //
  var deltaBordo = this.deltaBordo;
  //
  var frameInternoH = 5;
  var frameInternoV = 10;
  var frameEsternoH = 7 - deltaBordo;
  var frameEsternoV = 12 - deltaBordo;  
  var frameInternoHB = 6.5;
  var frameInternoVB = 13.5;
  var frameEsternoHB = 8.5 - deltaBordo;
  var frameEsternoVB = 15.5 - deltaBordo;
  var frameEsternoTV1 = 3 + deltaBordo;
  var frameEsternoTV2 = 37.5 + deltaBordo;
  //
  var bordoH = this.bordoH;
  var bordoV = this.bordoV;
  //

  var modelloParete = COLOR(ColoriProgetto.INTONACO_BASE)(
              STRUCT([ 
                  // Grosso
                  SIMPLEX_GRID( [[(larghezzaParete-frameInternoHB)/2,-frameInternoHB,(larghezzaParete-frameInternoHB)/2],[spessoreParete],[frameEsternoTV2]] ),
                    SIMPLEX_GRID( [[-((larghezzaParete-frameInternoHB)/2),frameInternoHB,-((larghezzaParete-frameInternoHB)/2)],[spessoreParete],
                      [frameEsternoTV1+bordoV,-frameInternoVB,frameEsternoTV2-frameEsternoTV1-frameInternoVB]] ) ,
                    // Piccolo
                    SIMPLEX_GRID( [[(larghezzaParete-frameInternoH)/2,-frameInternoH,(larghezzaParete-frameInternoH)/2],[spessoreParete],[-frameEsternoTV2, altezzaParete-frameEsternoTV2]] ),
                    SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreParete],
                      [-frameEsternoTV2,bordoV,-frameInternoV,altezzaParete-frameInternoV-frameEsternoTV2-bordoV]] )
              ])
            );

  var bordoFinestra = COLOR(ColoriProgetto.INTONACO_BORDI)(
              STRUCT([  
                // Grosso
                SIMPLEX_GRID( [[-((larghezzaParete-frameInternoHB-(bordoH*2))/2),bordoH,-frameInternoHB,bordoH,-((larghezzaParete-frameInternoHB-(bordoH*2))/2)],[spessoreBordo],[-frameEsternoTV1,frameEsternoVB+bordoV]] ),
                SIMPLEX_GRID( [[-((larghezzaParete-frameInternoHB)/2),frameInternoHB,-((larghezzaParete-frameInternoHB)/2)],[spessoreBordo],[-frameEsternoTV1,bordoV,-frameInternoVB,bordoV]] ),
                // Piccolo
                SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH-(bordoH*2))/2),bordoH,-frameInternoH,bordoH,-((larghezzaParete-frameInternoH-(bordoH*2))/2)],[spessoreBordo],[-frameEsternoTV2,frameEsternoV+bordoV,-(altezzaParete-frameEsternoTV2-frameEsternoV-bordoV)]] ),
                SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreBordo],[-frameEsternoTV2,bordoV,-frameInternoV,bordoV,-(altezzaParete-frameEsternoTV2-(bordoV*2)-frameInternoV)]] )
              ])
            );

  var posCornicioneAlto = frameEsternoTV2 + frameEsternoV + bordoV + 3*deltaBordo - this.deltaCornicione;
  var cornicioni = this.getCornicioni(larghezzaParete, posCornicioneAlto);

  var posBordoFinestra = T([1])([-spessoreBordo])(bordoFinestra);

  var finestraVetriInf = T([0,1,2])([(larghezzaParete-frameInternoHB)/2,spessoreParete/2,frameEsternoTV1+bordoV])( this.creaFinestraGrossa(frameInternoHB, frameInternoVB, true) );
  var finestraVetriSup = T([0,1,2])([(larghezzaParete-frameInternoH)/2,spessoreParete/2,frameEsternoTV1+bordoV])( this.creaFinestraPiccola(frameInternoH, frameInternoV) );

  // finalModel
  var finalModel = [];
  finalModel.push( modelloParete );
  finalModel.push( cornicioni );
  finalModel.push( posBordoFinestra );
  finalModel.push( finestraVetriInf );
  finalModel.push( T([2])([frameEsternoTV2-frameEsternoTV1]) );
  // finalModel.push( posBordoFinestra );
  finalModel.push( finestraVetriSup );

  return  STRUCT(finalModel);
};

ModuliPareti.prototype.creaFinestraPiccola = function(frameInternoH, frameInternoV, conInferriata) {
  conInferriata = conInferriata || false;
  //
  var spessoreParete = this.spessoreParete;
  var spessoreBordo = this.spessoreBordo;
  var larghezzaParete = this.larghezzaParete;
  var altezzaParete = this.altezzaParete;
  //
  var spessBandaH = 0.3;
  var spessBandaV = spessBandaH;
  var spessVetro = spessBandaH/3;

  //
    var sbarraVerticale = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
                SIMPLEX_GRID([[spessBandaV],[spessoreBordo],[frameInternoV]])
                );
    var sbarraOrizzontale = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
                 SIMPLEX_GRID([[frameInternoH],[spessoreBordo],[spessBandaH]])
                );
  var vetro = COLOR(ColoriProgetto.VETRO)(
          BOUNDARY(
              SIMPLEX_GRID([[frameInternoH],[spessVetro],[frameInternoV]])
            )
          );
    var bandeLaterali = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
            SIMPLEX_GRID([[spessBandaV],[spessBandaV],[frameInternoV]])
          );

    var finModel = [];
  finModel.push(T([1])([spessVetro])(vetro));
  finModel.push(bandeLaterali);
  finModel.push(T([0])([(frameInternoH-spessBandaV)])(bandeLaterali));
  finModel.push(T([0])([(frameInternoH-spessBandaV)/2])(sbarraVerticale));
  finModel.push(T([0])([spessBandaV])(sbarraOrizzontale));
  finModel.push(T([0,2])([spessBandaV,frameInternoV-spessBandaH])(sbarraOrizzontale));
  if ( conInferriata == true ) {
    finModel.push(T([1])([-(spessBandaV/2)])(this.creaFinestra_InferriataQuadrata(frameInternoH, frameInternoV)));
  } 

  return STRUCT(finModel);
};

ModuliPareti.prototype.creaFinestraGrossa = function(frameInternoH, frameInternoV, conInferriata) {
  conInferriata = conInferriata || false;
  //
  var spessoreParete = this.spessoreParete;
  var spessoreBordo = this.spessoreBordo;
  var larghezzaParete = this.larghezzaParete;
  var altezzaParete = this.altezzaParete;
  //
  var spessBandaH = 0.3;
  var spessBandaV = spessBandaH;
  var spessVetro = spessBandaH/3;


  //
    var sbarraVerticale = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
                SIMPLEX_GRID([[spessBandaV],[spessoreBordo],[(2/3)*frameInternoV]])
                );
    var sbarraOrizzontale = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
                 SIMPLEX_GRID([[frameInternoH],[spessoreBordo],[spessBandaH]])
                );
  var vetro = COLOR(ColoriProgetto.VETRO)(
          BOUNDARY(
              SIMPLEX_GRID([[frameInternoH],[spessVetro],[frameInternoV]])
            )
          );
    var bandeLaterali = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
            SIMPLEX_GRID([[spessBandaV],[spessBandaV],[frameInternoV]])
          );

    var finModel = [];
  finModel.push(T([1])([spessVetro])(vetro));
  finModel.push(bandeLaterali);
  finModel.push(T([0])([(frameInternoH-spessBandaV)])(bandeLaterali));
  finModel.push(T([0])([(frameInternoH-spessBandaV)/2])(sbarraVerticale));
  finModel.push(T([0])([spessBandaV])(sbarraOrizzontale));
  finModel.push(T([0,2])([spessBandaV,frameInternoV-spessBandaH])(sbarraOrizzontale));
  finModel.push(T([0,2])([spessBandaV,(2/3)*frameInternoV])(sbarraOrizzontale));
  if ( conInferriata == true ) {
    finModel.push(T([1])([-(spessBandaV/2)])(this.creaFinestra_InferriataDiagonale(frameInternoH, frameInternoV)));
  } 

  return STRUCT(finModel);
};

ModuliPareti.prototype.creaFinestra_InferriataQuadrata = function(frameInternoH, frameInternoV) {
  var intervalloGrate = 1.5;

  var polyStruct = [];
  for (var i = 0; i <= frameInternoH; i += intervalloGrate) {
    polyStruct.push( POLYLINE([[i,0,0],[i,0,frameInternoV]]) );
  }
  for (var i = 0; i <= frameInternoV; i += intervalloGrate) {
    polyStruct.push( POLYLINE([[0,0,i],[frameInternoH,0,i]]) );
  }

  return COLOR(ColoriProgetto.INFERRIATE_PESANTI)( STRUCT( polyStruct ) );
};

ModuliPareti.prototype.creaFinestra_InferriataDiagonale = ParetiColonnato.prototype.creaFinestra_Inferriata;

// -----------------------------

function Patio(refModuloPareti) {
  this.refColonna = new Colonna();
  this.refParetiColonnato = new ParetiColonnato();
  this.refCornicionePatio = new CornicionePatio();
  this.refPareti = refModuloPareti;
  // References
  this.startPatio = this.refColonna.baseColonna * (2/3);
  this.profonditaPatio = this.startPatio + 25;
  this.centroPatioX = this.refParetiColonnato.centroParetiX;
  this.centroPatioY = (this.profonditaPatio + this.startPatio) / 2;
  // Patio sopra colonne
  this.lunghezzaPatioX = 105;
  this.lunghezzaPatioY = 7;
  // Altezza cornicione
  this.altezzaCornicione = this.refColonna.altezzaColonnaNoCap - this.refColonna.altezzaCapitello - 0.25 + this.refCornicionePatio.altezzaMax;
  // Altezza supCornicione
  this.altezzaSupCornicione = this.altezzaCornicione + this.refCornicionePatio.altezzaMax;
};

Patio.prototype.creaColonnato = function(fullColonnato) {
  fullColonnato = fullColonnato || false;

  var colonnaStandard = this.refColonna.creaColonna();

  if ( PROJECT_NOFUNCTIONALTRS == true ) {
    colonnaStandard = colonnaStandard.translate([1],[1]);
  } else {
    colonnaStandard = T([1])([1])( colonnaStandard );
  }
  
  var modelloColonnato = colonnaStandard;
  if ( fullColonnato != false ) {
    if ( PROJECT_NOFUNCTIONALTRS == true ) {
      modelloColonnato = STRUCT([
                colonnaStandard,
                colonnaStandard.clone().translate([0],[this.refParetiColonnato.larghezzaParete * 1]),
                colonnaStandard.clone().translate([0],[this.refParetiColonnato.larghezzaParete * 2]),
                colonnaStandard.clone().translate([0],[this.refParetiColonnato.larghezzaParete * 3]),
                colonnaStandard.clone().translate([0],[this.refParetiColonnato.larghezzaParete * 4]),
                colonnaStandard.clone().translate([0],[this.refParetiColonnato.larghezzaParete * 5])
              ]);
    } else {
      var standardTrans = T([0])([this.refParetiColonnato.larghezzaParete]);

      modelloColonnato = STRUCT([
                colonnaStandard, standardTrans,
                colonnaStandard, standardTrans,
                colonnaStandard, standardTrans,
                colonnaStandard, standardTrans,
                colonnaStandard, standardTrans,
                colonnaStandard
              ]);
    };
  }

  return modelloColonnato;
};

Patio.prototype.creaFullCornicione = function() {
  var lunghezzaPatioX = this.lunghezzaPatioX;
  var lunghezzaPatioY = this.lunghezzaPatioY;
  //
  var rotatedModel = R([0,1])(PI/2)( this.refCornicionePatio.creaCornicione(lunghezzaPatioY,true,false) );
  //
  var finalModel = [];
  //
  finalModel.push( this.refCornicionePatio.creaCornicione(lunghezzaPatioX,true,true) );
  finalModel.push( T([0])([lunghezzaPatioX])( rotatedModel ) );
  finalModel.push( S([0])([-1])( rotatedModel ) );

  return COLOR(ColoriProgetto.INTONACO_BASE)( STRUCT(finalModel) );
};

Patio.prototype.creaSoffitto = function() {
  var lunghezzaPatioX = this.lunghezzaPatioX;
  var lunghezzaPatioY = this.lunghezzaPatioY;
  //
  var finalModel = [];
  if ( PROJECT_NOFUNCTIONALTRS == true ) {
    finalModel.push( CUBOID([this.lunghezzaPatioX, this.profonditaPatio, 0.5]).translate([2], [this.altezzaSupCornicione - this.altezzaCornicione]) );
  } else {
    finalModel.push( T([2])([this.altezzaSupCornicione - this.altezzaCornicione])( CUBOID([this.lunghezzaPatioX, this.profonditaPatio, 0.5]) ) ); 
  }
  
  finalModel.push( CUBOID([this.lunghezzaPatioX, this.lunghezzaPatioY, this.refCornicionePatio.altezzaMax]) );
  //
  return COLOR(ColoriProgetto.INTONACO_BASE)( STRUCT(finalModel) );
};

Patio.prototype.creaPavimento = function() {
  var lunghezzaPatioX = this.lunghezzaPatioX;
  var lunghezzaPatioY = this.lunghezzaPatioY;
  var spessorePatio = this.refPareti.altezzaBordoInferiore;
  //
  var finalModel = [];
  if ( PROJECT_NOFUNCTIONALTRS == true ) {
    finalModel.push( 
            CUBOID([this.lunghezzaPatioX + this.refColonna.baseColonna, this.profonditaPatio + this.refColonna.baseColonna, spessorePatio]).translate(
              [0,1,2], [-this.refColonna.baseColonna/2, -this.refColonna.baseColonna/2, -spessorePatio]) 
          );
    finalModel.push( 
            CUBOID([this.lunghezzaPatioX + this.refColonna.baseColonna, spessorePatio, (2/3)*spessorePatio]).translate(
              [0,1,2], [-this.refColonna.baseColonna/2, -((this.refColonna.baseColonna/2)+spessorePatio), -spessorePatio]) 
          );
    finalModel.push( 
            CUBOID([this.lunghezzaPatioX + this.refColonna.baseColonna, spessorePatio, (1/3)*spessorePatio]).translate(
              [0,1,2], [-this.refColonna.baseColonna/2, -((this.refColonna.baseColonna/2)+(2*spessorePatio)), -spessorePatio]) 
          );        
  } else {
    finalModel.push( T([0,1,2])([-this.refColonna.baseColonna/2, -this.refColonna.baseColonna/2, -spessorePatio])(
            CUBOID([this.lunghezzaPatioX + this.refColonna.baseColonna, this.profonditaPatio + this.refColonna.baseColonna, spessorePatio])
          ) 
        );
    finalModel.push( T([0,1,2])([-this.refColonna.baseColonna/2, -((this.refColonna.baseColonna/2)+spessorePatio), -spessorePatio])(
            CUBOID([this.lunghezzaPatioX + this.refColonna.baseColonna, spessorePatio, (2/3)*spessorePatio])
          ) 
        );
    finalModel.push( T([0,1,2])([-this.refColonna.baseColonna/2, -((this.refColonna.baseColonna/2)+(2*spessorePatio)), -spessorePatio])(
            CUBOID([this.lunghezzaPatioX + this.refColonna.baseColonna, spessorePatio, (1/3)*spessorePatio])
          ) 
        );      
  }
  //
  return COLOR(ColoriProgetto.INTONACO_SCURO)( STRUCT(finalModel) );
};

Patio.prototype.creaPatio = function(fullColonnato) {
  var modelloFinale = [];

  if ( PROJECT_NOFUNCTIONALTRS == true ) {
    // modelloParetiPatio
    modelloFinale.push( this.refParetiColonnato.creaParetePatio().translate([1], [this.profonditaPatio]) );
    // modelloColonnato
    if ( PROJECT_NOCOLUMNS != true ) {
      modelloFinale.push( this.creaColonnato(fullColonnato) );
    }
    // modelloCornicione
    modelloFinale.push( this.creaFullCornicione().translate([2],[this.altezzaCornicione]) );
    // modelloSoffitto
    modelloFinale.push( this.creaSoffitto().translate([2], [this.altezzaCornicione]) );
    // modelloPavimento
    modelloFinale.push( this.creaPavimento() );
    //
    modelloFinale = STRUCT(modelloFinale).translate([0], [-this.centroPatioX]);
  } else {
    // modelloParetiPatio
    modelloFinale.push( T([1])([this.profonditaPatio])( this.refParetiColonnato.creaParetePatio() ) );
    // modelloColonnato
    if ( PROJECT_NOCOLUMNS != true ) {
      modelloFinale.push( this.creaColonnato(fullColonnato) );
    }
    // modelloCornicione
    modelloFinale.push( T([2])([this.altezzaCornicione])( this.creaFullCornicione() ) );
    // modelloSoffitto
    modelloFinale.push( T([2])([this.altezzaCornicione])( this.creaSoffitto() ) );
    // modelloPavimento
    modelloFinale.push( this.creaPavimento() );
    //
    modelloFinale = T([0])([-this.centroPatioX])( STRUCT(modelloFinale) );
  }

  return modelloFinale;
};

// --------------------------

function ColonnaBalconcino() {
  this.fattoreScalaBase = 0.5;
  this.hMaxColonna = 4.2;
};

ColonnaBalconcino.prototype.getColumnPoints = function() {
  // Punti controllo NUBS colonna
  var ctPoints = [
            // Superficie fondo
            [0,0,0],[0,0,0],
            // A,B,C
            [1,0,0],[1,1,0],[0.3,1.2,0],
            // D,E,F
            [0.3,1.3,0],[1,1.7,0],[1,1.8,0],
            // G,H,I
            [0.3,1.8,0],[0.3,2,0],[1,2.2,0],
            // L,M,N
            [1,2.6,0],[0.3,2.8,0],[0.3,3,0],
            // O,P,Q
            [0.5,3.25,0],[0.5,3.35,0],[0.3,3.6,0],
            // R,S,T
            [0.3,3.8,0],[0.5,3.8,0],[0.5,4,0],
            // U,V
            [0.7,4,0],[0.7,this.hMaxColonna,0],
            // Superficie sopra
            [0,this.hMaxColonna,0],[0,this.hMaxColonna,0]
          ];

  return ctPoints.map(function(item){ return item; });
};

ColonnaBalconcino.prototype.creaColonna = function(scaleFactorV, scaleFactorH) {
  scaleFactorV = scaleFactorV || 1;
  scaleFactorH = scaleFactorH || 1;

  // Punti controllo NUBS colonna
  var ctPoints = this.getColumnPoints();

  // Scala se necessario
  if ( scaleFactorV != 1 ) {
    ctPoints = PointUtils.scalaPunti(ctPoints, scaleFactorV);
  }

  // Metti punti in XZ
  ctPoints = PointUtils.ruotaPunti(ctPoints, PI/2, 0);
  var prof1 = CurveUtils.createS0NUBS(1, ctPoints, false);
  
  // Quadrato scala in XY
  var ctPointsQuadrato = [ [1,1,0],[1,1,0],[-1,1,0],[-1,-1,0],[1,-1,0],[1,1,0],[1,1,0] ];
  ctPointsQuadrato = PointUtils.scalaPunti(ctPointsQuadrato, this.fattoreScalaBase * scaleFactorH);
  var prof2 = NUBS(S1)(1)(CurveUtils.generateS0Knots(ctPointsQuadrato.length, 1))(ctPointsQuadrato);

  // Produttoria tra profili
  var mapProfileColonna = PROFILEPROD_SURFACE([prof1,prof2]);

  return MAP(mapProfileColonna)(CommonDomains.DIM2RP_DOMAIN);
};

// --------------------------

function PareteBalconcino(refToPatio) {
  this.refColonnaBalconcino = new ColonnaBalconcino();
  //
  this.spessoreParete = CommonParetiMeasure.spessoreParete;
  this.spessoreBordo = CommonParetiMeasure.spessoreBordo;
  this.larghezzaParete = CommonParetiMeasure.larghezzaParete;
  this.altezzaParete = 15.675;
  //
  this.centroParetiX = (this.larghezzaParete * 5) / 2;
  //
  this.refPatio = refToPatio;
  //
  this.deltaBordo = 0.5;
  this.bordoS = 2;
  this.bordoH = this.bordoS - this.deltaBordo;
  this.bordoV = this.bordoH;
  //
  this.scaleColumnVertical = 0.8;
  this.scaleColumnHorizzontal = 0.7;
  //
  this.larghezzaPareteLaterale = this.spessoreParete + this.refPatio.lunghezzaPatioY
};

PareteBalconcino.prototype.creafinestraBalconcino = ModuliPareti.prototype.creaFinestraPiccola;

PareteBalconcino.prototype.creaBalconcino = function() {
  var spessoreParete = CommonParetiMeasure.spessoreParete;
  var spessoreBordo = CommonParetiMeasure.spessoreBordo;
  var larghezzaParete = CommonParetiMeasure.larghezzaParete;
  var altezzaParete = this.altezzaParete;
  var spessBalconcino = spessoreBordo*2;
  //
  var deltaBordo = this.deltaBordo;
  //
  var frameInternoH = 5;
  var frameInternoV = 10;
  var frameEsternoH = 7 - deltaBordo;
  var frameEsternoV = 12 - deltaBordo;
  var frameEsternoTV = 0;
  //
  var bordoH = this.bordoH;
  var bordoV = this.bordoV;
  //
  frameEsternoTV = bordoH;
  //
  var col_scalaV = this.scaleColumnVertical;
  var col_scalaH = this.scaleColumnHorizzontal;
  //

  var bordoFinestra = [];

  bordoFinestra.push( T([0,1])([larghezzaParete/2, -spessBalconcino]) );
  bordoFinestra.push( T([0])([-(frameEsternoH+2*bordoH)/2])( CUBOID([frameEsternoH+2*bordoH,spessBalconcino,(2/3)*frameEsternoTV]) ) );
  bordoFinestra.push( T([2])([(2/3)*frameEsternoTV]) );
  bordoFinestra.push( T([0])([-(frameEsternoH+(4/3)*bordoH)/2])( CUBOID([frameEsternoH+(4/3)*bordoH,spessBalconcino,(1/3)*frameEsternoTV]) ) );
  bordoFinestra.push( T([2])([(1/3)*frameEsternoTV]) );

  if ( PROJECT_NOBALCONCINI != true ) {
    var colonnaScalata = this.refColonnaBalconcino.creaColonna(col_scalaV,col_scalaH);
    var traslazioneColonna = T([0])([1]);

    var insiemeColonne = STRUCT([
                  colonnaScalata, traslazioneColonna,
                  colonnaScalata, traslazioneColonna,
                  colonnaScalata, traslazioneColonna,
                  colonnaScalata, traslazioneColonna,
                  colonnaScalata, traslazioneColonna,
                  colonnaScalata
                ]);

    bordoFinestra.push( T([0,1])([-frameInternoH/2,spessBalconcino])( insiemeColonne ) );
  }

  bordoFinestra.push( T([2])([col_scalaV*this.refColonnaBalconcino.hMaxColonna]) );
  bordoFinestra.push( T([0])([-(frameEsternoH+(4/3)*bordoH)/2])( CUBOID([frameEsternoH+(4/3)*bordoH,spessBalconcino+0.1,(1/3)*frameEsternoTV]) ) );

  return STRUCT( bordoFinestra );
};

PareteBalconcino.prototype.creaPareteFinestraBalconcino = function() {
  var spessoreParete = CommonParetiMeasure.spessoreParete;
  var spessoreBordo = CommonParetiMeasure.spessoreBordo;
  var larghezzaParete = CommonParetiMeasure.larghezzaParete;
  var altezzaParete = this.altezzaParete;
  //
  var deltaBordo = this.deltaBordo;
  //
  var frameInternoH = 5;
  var frameInternoV = 10;
  var frameEsternoH = 7 - deltaBordo;
  var frameEsternoV = 12 - deltaBordo;
  var frameEsternoTV = 0;
  //
  var bordoH = this.bordoH;
  var bordoV = this.bordoV;
  //
  frameEsternoTV = bordoH;

  var modelloParete = STRUCT([ SIMPLEX_GRID( [[(larghezzaParete-frameInternoH)/2,-frameInternoH,(larghezzaParete-frameInternoH)/2],[spessoreParete],[altezzaParete]] ),
                   SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreParete],[frameEsternoTV,-(frameInternoV+bordoV),(altezzaParete-frameInternoV-frameEsternoTV-bordoV)]] )
            ]);
  var bordoFinestra = STRUCT([ SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH-(bordoH*2))/2),bordoH,-frameInternoH,bordoH,-((larghezzaParete-frameInternoH-(bordoH*2))/2)],[spessoreBordo],[-frameEsternoTV,frameEsternoV+bordoV,-(altezzaParete-frameEsternoTV-frameEsternoV-bordoV)]] ),
                 SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreBordo],[-frameEsternoTV,-bordoV,-frameInternoV,bordoV,-(altezzaParete-frameEsternoTV-(bordoV*2)-frameInternoV)]] ),
                 SIMPLEX_GRID( [[larghezzaParete],[spessoreBordo],[-(frameEsternoV+2*bordoV),altezzaParete-frameEsternoV-2*bordoV]] )
            ]);

  var posBordoFinestra = T([1])([-spessoreBordo])(bordoFinestra);
  //
  var balconcino = this.creaBalconcino();

  var finestraVetri = T([0,1,2])([(larghezzaParete-frameInternoH)/2,spessoreParete/2,frameEsternoTV])( 
              this.creafinestraBalconcino(frameInternoH, frameInternoV+bordoV) 
            );

  //
  var finalModel = [];
  finalModel.push( COLOR(ColoriProgetto.INTONACO_BASE)(modelloParete) );
  finalModel.push( COLOR(ColoriProgetto.INTONACO_BORDI)(posBordoFinestra) );
  finalModel.push( COLOR(ColoriProgetto.INTONACO_BORDI)(balconcino) );
  finalModel.push( finestraVetri );

  return STRUCT( finalModel );
};

PareteBalconcino.prototype.creaPareteLateraleBalconcino = function() {
  var spessoreParete = this.spessoreParete;
  var spessoreBordo = this.spessoreBordo;
  var larghezzaParete = this.larghezzaPareteLaterale;
  var altezzaParete = this.altezzaParete;
  //
  var frameEsternoV = 12 - this.deltaBordo;
  var bordoV = this.bordoV;
  //

  var finalModel = [];

  var cornicioneLungo = COLOR(ColoriProgetto.INTONACO_BORDI)( 
              SIMPLEX_GRID( [[larghezzaParete],[spessoreBordo],[-(frameEsternoV+2*bordoV),altezzaParete-frameEsternoV-2*bordoV]] )
              );
  var cornicioneLungoSuperiore = COLOR(ColoriProgetto.INTONACO_BORDI)( 
              SIMPLEX_GRID( [[larghezzaParete],[CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio*spessoreBordo],[-altezzaParete,CommonParetiMeasure.cornicioneSuperiore_AltezzaRatio * bordoV]] )
              );
  var cornicioneCorto = COLOR(ColoriProgetto.INTONACO_BORDI)( 
              SIMPLEX_GRID( [[spessoreBordo],[spessoreParete + 2*spessoreBordo],[-(frameEsternoV+2*bordoV),altezzaParete-frameEsternoV-2*bordoV]] )
              );
  var cornicioneCortoSuperiore = COLOR(ColoriProgetto.INTONACO_BORDI)( 
              // 
              SIMPLEX_GRID( [[CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio*spessoreBordo],[-(spessoreParete + CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio*spessoreBordo), CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio*spessoreBordo],[-altezzaParete,CommonParetiMeasure.cornicioneSuperiore_AltezzaRatio * bordoV]] )
              );

  // Minicornicione
  finalModel.push( T([1])([spessoreParete])( cornicioneLungo ) );
  finalModel.push( T([1])([spessoreParete])( cornicioneLungoSuperiore ) );
  finalModel.push( T([0,1])([-spessoreBordo,-spessoreBordo])( cornicioneCorto ) );
  finalModel.push( T([0,1])([-CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio*spessoreBordo,-CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio*spessoreBordo])( cornicioneCortoSuperiore ) );

  // modelloParete
  finalModel.push( COLOR(ColoriProgetto.INTONACO_BASE)( 
            SIMPLEX_GRID( [[larghezzaParete],[spessoreParete],[altezzaParete]] )
           ) );

  return STRUCT(finalModel);
};

PareteBalconcino.prototype.creaParete = function() {
  var transRipeti = T([0])([this.larghezzaParete]);
  var pareteLateraleL = R([0,1])(PI/2)( this.creaPareteLateraleBalconcino() );
  var pareteLateraleR = S([0])([-1])( pareteLateraleL );

  var modelloFinale = STRUCT([
              pareteLateraleL,
              this.creaPareteFinestraBalconcino(), transRipeti,
              this.creaPareteFinestraBalconcino(), transRipeti,
              this.creaPareteFinestraBalconcino(), transRipeti,
              this.creaPareteFinestraBalconcino(), transRipeti,
              this.creaPareteFinestraBalconcino(), transRipeti,
              pareteLateraleR
          ]);

  return T([0,1])([-this.centroParetiX,-this.spessoreParete])( modelloFinale );
};

// --------------------------

function TimpanoFacciata() {
  this.hMaxPointsSotto = 3;
  this.angoloDefault = 25.9445;
  // Errori approssimazione
  this.altezzaDelta = 0.11;
  this.angoloDelta = 4; 
};

TimpanoFacciata.prototype.getCPointsSotto = function() {
  var ctPoints = [
            // A
            [0,0,0],[0,0,0],
            // B,C,D
            [1,0,0],[1,2,0],[2,2,0],
            // E,F,G
            [2,2.5,0],[2.5,2.5,0],[2.5,this.hMaxPointsSotto,0],
            // H
            [0,this.hMaxPointsSotto,0],[0,this.hMaxPointsSotto,0]
          ];

  return ctPoints.map(function(item){ return item; });
};

TimpanoFacciata.prototype.getCPointsLaterale = function() {
  var ctPoints = [
            // A
            [0,0,0],[0,0,0],
            // B,C,D
            [0.5,0,0],[0.5,2,0],[1,2,0],
            // E,F,G
            [1,3,0],[2,3,0],[1.7,4,0],
            // H,I
            [1.4,4,0],[1.4,5,0],
            // L
            [0,5,0],[0,5,0]
          ];

  return ctPoints.map(function(item){ return item; });
};

TimpanoFacciata.prototype.creaTappoLaterale = function(ctPoints) {
  var curvaTappo = CurveUtils.createS0NUBS(1, ctPoints);
  var curvaFakePoint = CurveUtils.createBezier(S0, [ctPoints[ctPoints.length-1]]);
  
  return CurveUtils.createBezier(S1, [curvaTappo, curvaFakePoint]);
};

TimpanoFacciata.prototype.creaCornicioneRetto = function(lengthCorn) {
  var ctPoints = this.getCPointsSotto();

  // Metti punti in XZ
  ctPoints = PointUtils.ruotaPunti(ctPoints, PI/2, 0);
  var prof1 = CurveUtils.createS0NUBS(1, ctPoints);

  // CYLINDRICAL_SURFACE
  var mapProfileCornicione = CYLINDRICAL_SURFACE(prof1)([0,lengthCorn,0]);

  // Tappo sul retro
  /*
  var tappoRetro = SIMPLICIAL_COMPLEX([ ctPoints[0], ctPoints[ctPoints.length-1], 
    [ ctPoints[ctPoints.length-1][0], ctPoints[ctPoints.length-1][1] + lengthCorn, ctPoints[ctPoints.length-1][2] ], 
    [ ctPoints[0][0], ctPoints[0][1] + lengthCorn, ctPoints[0][2] ],
    ctPoints[0]  ])([[0,1,2],[2,3,4]]);
  */

  // Tappi laterali
  var tappiLaterali = [];
  tappiLaterali.push( this.creaTappoLaterale(ctPoints) );
  tappiLaterali.push( this.creaTappoLaterale(PointUtils.traslaPunti(ctPoints, 1, lengthCorn)) );

  var finalModel = STRUCT([
            this.creaFregio(lengthCorn, 1),
            STRUCT( CONS( AA(MAP)(tappiLaterali) )( CommonDomains.DIM2_DOMAIN_LOWRES ) ),
            // tappoRetro,
            MAP(mapProfileCornicione)(CommonDomains.DIM2_DOMAIN_LOWRES)
          ]);

  return COLOR( ColoriProgetto.INTONACO_BORDI )( finalModel );
};

TimpanoFacciata.prototype.creaCornicioneAngolato = function(lengthCorn, angoloGradi) {
  angoloGradi = angoloGradi || this.angoloDefault;
  //
  var ctPoints = this.getCPointsSotto();
  //
  var angoloRadianti = angoloGradi * PI / 180;
  var componenteY = lengthCorn*COS(angoloRadianti);
  var componenteZ = lengthCorn*SIN(angoloRadianti);

  // Metti punti in XZ
  ctPoints = PointUtils.ruotaPunti(ctPoints, PI/2, 0);
  ctPoints = PointUtils.ruotaPunti(ctPoints, angoloRadianti, 0);
  ctPoints = PointUtils.traslaPunti(ctPoints, 1, (this.hMaxPointsSotto-1.5)*SIN(angoloRadianti));
  var prof1 = CurveUtils.createS0NUBS(1, ctPoints);

  // CYLINDRICAL_SURFACE
  var mapProfileCornicione = CYLINDRICAL_SURFACE(prof1)([0,componenteY,componenteZ]);

  // Tappi laterali
  var tappiLaterali = [];
  tappiLaterali.push( this.creaTappoLaterale(ctPoints) );
  // tappiLaterali.push( this.creaTappoLaterale( PointUtils.traslaPunti( PointUtils.traslaPunti(ctPoints, 1, componenteY), 2, componenteZ ) ) );

  // Tappo sul retro
  /*
  var tappoRetro = SIMPLICIAL_COMPLEX([ ctPoints[0], ctPoints[ctPoints.length-1], 
    [ ctPoints[ctPoints.length-1][0], ctPoints[ctPoints.length-1][1] + componenteY, ctPoints[ctPoints.length-1][2] + componenteZ ], 
    [ ctPoints[0][0], ctPoints[0][1] + componenteY, ctPoints[0][2] + componenteZ ],
    ctPoints[0]  ])([[0,1,2],[2,3,4]]);
  */

  var finalModel = STRUCT([
            R([1,2])(angoloRadianti)( this.creaFregio(lengthCorn, 2, -1) ),
            STRUCT( CONS( AA(MAP)(tappiLaterali) )( CommonDomains.DIM2_DOMAIN_LOWRES ) ),
            // tappoRetro,
            MAP(mapProfileCornicione)(CommonDomains.DIM2_DOMAIN_LOWRES)
          ]);

  return COLOR( ColoriProgetto.INTONACO_BORDI )( finalModel );
};

TimpanoFacciata.prototype.creaCornicioneRaccordo = function(angoloGradi) {
  angoloGradi = angoloGradi || this.angoloDefault;
  //
  var ctPoints = this.getCPointsSotto();
  //
  var angoloRadianti = angoloGradi * PI / 180;

  // Metti punti in XZ
  ctPoints = PointUtils.ruotaPunti(ctPoints, PI/2, 0);
  // Punti controllo sinistro e destro
  var sinPoints = PointUtils.ruotaPunti(ctPoints, angoloRadianti, 0);
  var desPoints = PointUtils.ruotaPunti(ctPoints, PI*2 - angoloRadianti, 0);

  // Profilo centrale
  var profC = CurveUtils.createS0NUBS(1, ctPoints);
  // Profilo sinistro
  var profS = CurveUtils.createS0NUBS(1, sinPoints);
  // Profilo destro
  var profD = CurveUtils.createS0NUBS(1, desPoints);

  var mapProfili = [];
  mapProfili.push( NUBS(S1)(1)([0,0,3,3])([profS,profC]) );
  mapProfili.push( NUBS(S1)(1)([0,0,3,3])([profC,profD]) );

  var finalModel = STRUCT( CONS( AA(MAP)(mapProfili) )( CommonDomains.DIM2_DOMAIN_LOWRES ) );

  return COLOR( ColoriProgetto.INTONACO_BORDI )( finalModel );
};

TimpanoFacciata.prototype.creaFregio = function(lengthCorn, startFregio, endFregio) {
  startFregio = startFregio || 1;
  endFregio = endFregio || startFregio;
  

  // Mini cuboids
  var cubiArray = [];
  cubiArray.push( T([0,1,2])([1,startFregio,1]) );

  var cubeSingleDim = {"x": 0.6, "y": 1, "z": 1};
  var cubeSingle = CUBOID([cubeSingleDim.x,cubeSingleDim.y,cubeSingleDim.z]);
  var transCubo = T([1])([cubeSingleDim.y*(5/2)]);

  var spazioCubi = Math.floor( ( lengthCorn + cubeSingleDim.y*(5/2) - (startFregio + endFregio) ) / ((5/2)*cubeSingleDim.y) );

  for(var qtyCubi = spazioCubi;  qtyCubi > 0; qtyCubi--) {
    cubiArray.push(cubeSingle);
    cubiArray.push(transCubo);
  }

  return STRUCT(cubiArray);
};

TimpanoFacciata.prototype.creaTappoTriangolare = function(base, ipotenusa, altezza) {
  var finalModel = [];

  var tappoDelta = 10;

  finalModel.push( COLOR( ColoriProgetto.INTONACO_BASE )( SIMPLICIAL_COMPLEX([[0,0,0],[0,base/2,altezza],[0,base,0]])([[0,1,2]]) ) );
  finalModel.push( COLOR( ColoriProgetto.INTONACO_BORDI )( T([1,2])([tappoDelta/2,this.hMaxPointsSotto])( CUBOID([0.99,base-(tappoDelta),2]) ) ) );

  return STRUCT(finalModel);
};

// 105 , 57.8, 25.36
TimpanoFacciata.prototype.creaTimpano = function(base, ipotenusa, altezza) {
  var halfBase = base / 2;
  var angoloGradi = Math.asin(altezza/ipotenusa) *  180 / PI;
  // Errori approssimazione
  var altezzaDelta = this.altezzaDelta;
  var angoloDelta = this.angoloDelta;
  // altezza = Math.abs( ipotenusa*SIN(angoloGradi) );

  var resultModel = [];
  resultModel.push(this.creaCornicioneRetto(base));
  resultModel.push(this.creaCornicioneAngolato(ipotenusa, angoloGradi));
  resultModel.push(T([1])([base])( S([1])([-1])( this.creaCornicioneAngolato(ipotenusa, angoloGradi) ) ) );
  resultModel.push( T([1,2])([halfBase,altezza - altezzaDelta])( this.creaCornicioneRaccordo(angoloGradi - angoloDelta) ) );
  resultModel.push( this.creaTappoTriangolare(base, ipotenusa, altezza) );

  if ( PROJECT_NOFUNCTIONALTRS == true ) {
    resultModel = (STRUCT(resultModel).translate([1],[-halfBase])).rotate([0,1],-PI/2);
  } else {
    resultModel = R([0,1])(-PI/2)( T([1])([-halfBase])( STRUCT(resultModel) ) );
  }

  return resultModel;
};

// --------------------------

function TimpanoFull() {
  this.refTimpanoFacciata = new TimpanoFacciata();
  //
  // Original Meausurements: 103.43, 57.06, 24.96,
  // Normalized Measurement are: 105, 57.8, 25.36
  // Ratio = 1 0.56 0.26
  this.lunghezzaTimpano = CommonParetiMeasure.larghezzaParete*5 + CommonParetiMeasure.spessoreParete*2;
  this.hypTimpano = 0.56 * this.lunghezzaTimpano;
  this.altezzaTimpano = 0.26 * this.lunghezzaTimpano;
};

TimpanoFull.prototype.creaTimpano = function() {
  var finalModel = [];

  // centered Timpano
  finalModel.push( this.refTimpanoFacciata.creaTimpano(this.lunghezzaTimpano, this.hypTimpano, this.altezzaTimpano) );

  return STRUCT(finalModel);
};

// --------------------------

function FacciataCentrata() {
  this.refPareti = new ModuliPareti();
  this.refPatio = new Patio(this.refPareti); // centroPatioX
  this.refBalconcino = new PareteBalconcino(this.refPatio);
  this.refFullTimpano = new TimpanoFull();
  //
  this.fullColonnato = !PROJECT_ONECOLUMN;
  this.halfLength = 0;
};

FacciataCentrata.prototype.getHalfLengthNoDelta = function() {
  return this.halfLength;
};

FacciataCentrata.prototype.getHalfLength = function() {
  return this.getHalfLengthNoDelta() - 3*this.refPareti.spessoreParete;
};

FacciataCentrata.prototype.creaFacciataDestra = function() {
  var larghezzaPareteFrontale = CommonParetiMeasure.torretta.pareteSenzaFinestra;
  var profonditaLaterale = CommonParetiMeasure.torretta.profonditaLaterale;
  var pareteLateraleRModel = [];

  pareteLateraleRModel.push( T([0,1])([this.refPatio.centroPatioX, this.refPatio.startPatio]) ); 
  this.halfLength += this.refPatio.centroPatioX - this.refPareti.spessoreParete;

  pareteLateraleRModel.push( this.refPareti.pareteAltaFinestraPiccola()  );
  pareteLateraleRModel.push( T([0])([this.refPareti.larghezzaParete]) );
  this.halfLength += this.refPareti.larghezzaParete;

  pareteLateraleRModel.push( R([0,1])(-PI/2)( this.refPareti.pareteAlta(this.refBalconcino.larghezzaPareteLaterale) ) );
  pareteLateraleRModel.push( T([1])([-this.refBalconcino.larghezzaPareteLaterale]) );
  pareteLateraleRModel.push( T([0])([-this.refPareti.spessoreBordo])( this.refPareti.getCornicioneCubico() ) );
  pareteLateraleRModel.push( this.refPareti.getCornicioni(this.refPareti.spessoreParete) );
  pareteLateraleRModel.push( T([0])([this.refPareti.spessoreParete]) );
  this.halfLength += this.refPareti.spessoreParete;

  pareteLateraleRModel.push( this.refPareti.pareteAlta(larghezzaPareteFrontale) );
  pareteLateraleRModel.push( T([0])([larghezzaPareteFrontale]) );
  this.halfLength += larghezzaPareteFrontale;

  pareteLateraleRModel.push( this.refPareti.pareteAltaFinestraPiccola()  );
  pareteLateraleRModel.push( T([0])([this.refPareti.larghezzaParete]) );
  this.halfLength += this.refPareti.larghezzaParete;

  pareteLateraleRModel.push( this.refPareti.pareteAlta(larghezzaPareteFrontale) );
  this.halfLength += larghezzaPareteFrontale;

  return STRUCT(pareteLateraleRModel);
};

FacciataCentrata.prototype.creaFacciata = function() {
  var finalModel = [];

  var pareteLateraleR = this.creaFacciataDestra();
  var pareteLateraleL = S([0])([-1])( pareteLateraleR );

  finalModel.push( this.refPatio.creaPatio(this.fullColonnato) );
  finalModel.push( pareteLateraleR );
  finalModel.push( pareteLateraleL );

  if ( PROJECT_NOFUNCTIONALTRS == true ) {
    finalModel.push( this.refBalconcino.creaParete().translate([2],[this.refPatio.altezzaSupCornicione]) );
    if ( PROJECT_NOGABLE != true ) {
      finalModel.push( this.refFullTimpano.creaTimpano().translate([1,2], [-CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio*CommonParetiMeasure.spessoreBordo, this.refBalconcino.altezzaParete + this.refPatio.altezzaSupCornicione]) );
    }
  } else {
    finalModel.push( T([2])([this.refPatio.altezzaSupCornicione])( this.refBalconcino.creaParete() ) );
    if ( PROJECT_NOGABLE != true ) {
      finalModel.push( T([1,2])([-CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio*CommonParetiMeasure.spessoreBordo, this.refBalconcino.altezzaParete + this.refPatio.altezzaSupCornicione])( this.refFullTimpano.creaTimpano() ) );
    }
  }
  

  return STRUCT(finalModel);
};

// --------------------------

function FacciataLaterale() {
  this.refPareti = new ModuliPareti();
  //
  this.halfLength = 0;
};

FacciataLaterale.prototype.getHalfLengthNoDelta = function() {
  return this.halfLength;
};

FacciataLaterale.prototype.getHalfLength = function() {
  var approximationDelta = 0.035;
  return this.getHalfLengthNoDelta() - this.refPareti.spessoreParete - CommonParetiMeasure.spessoreBordo - approximationDelta;
};

FacciataLaterale.prototype.creaFacciataDestra = function() {
  var larghezzaPareteFrontale = CommonParetiMeasure.torretta.pareteSenzaFinestra;
  var profonditaLaterale = CommonParetiMeasure.torretta.profonditaLaterale;
  var allineamentoPatio = 1;
  //
  var pareteLateraleRModel = [];

  pareteLateraleRModel.push( this.refPareti.pareteAlta(larghezzaPareteFrontale) );
  pareteLateraleRModel.push( T([0])([larghezzaPareteFrontale]) );
  this.halfLength += larghezzaPareteFrontale;

  pareteLateraleRModel.push( this.refPareti.pareteAltaFinestraGrossa()  );
  pareteLateraleRModel.push( T([0])([this.refPareti.larghezzaParete]) );
  this.halfLength += this.refPareti.larghezzaParete;

  pareteLateraleRModel.push( this.refPareti.pareteAlta(larghezzaPareteFrontale) );
  pareteLateraleRModel.push( T([0])([larghezzaPareteFrontale]) );
  this.halfLength += larghezzaPareteFrontale;

  pareteLateraleRModel.push( R([0,1])(-PI/2)( this.refPareti.pareteAlta(profonditaLaterale) ) );
  pareteLateraleRModel.push( T([1])([-profonditaLaterale]) );
  pareteLateraleRModel.push( T([0])([-this.refPareti.spessoreBordo])( this.refPareti.getCornicioneCubico() ) );
  pareteLateraleRModel.push( this.refPareti.getCornicioni(this.refPareti.spessoreParete) );
  pareteLateraleRModel.push( T([0])([this.refPareti.spessoreParete]) );
  this.halfLength += this.refPareti.spessoreParete;

  pareteLateraleRModel.push( this.refPareti.pareteAlta(larghezzaPareteFrontale+allineamentoPatio) );  
  pareteLateraleRModel.push( T([0])([larghezzaPareteFrontale+allineamentoPatio]) );
  this.halfLength += larghezzaPareteFrontale+allineamentoPatio;

  pareteLateraleRModel.push( this.refPareti.pareteAltaFinestraPiccola()  );
  pareteLateraleRModel.push( T([0])([this.refPareti.larghezzaParete]) );
  this.halfLength += this.refPareti.larghezzaParete;

  pareteLateraleRModel.push( this.refPareti.pareteAlta(larghezzaPareteFrontale+allineamentoPatio) );
  pareteLateraleRModel.push( T([0])([larghezzaPareteFrontale+allineamentoPatio]) );
  pareteLateraleRModel.push( T([0])([ CommonParetiMeasure.spessoreBordo ]) );
  this.halfLength += larghezzaPareteFrontale+allineamentoPatio; // + CommonParetiMeasure.spessoreBordo;

  if ( PROJECT_DEBUGWALLCONNECTION == true ) {
    pareteLateraleRModel.push( COLOR(ColoriProgetto.DEBUG)( S([0])([-1])( this.refPareti.getCornicioneCubico() ) ) );
  } else {
    pareteLateraleRModel.push( S([0])([-1])( this.refPareti.getCornicioneCubico() ) );  
  }

  return STRUCT(pareteLateraleRModel);
};

FacciataLaterale.prototype.creaFacciata = function() {
  var finalModel = [];

  var pareteLateraleR = this.creaFacciataDestra();
  var pareteLateraleL = S([0])([-1])( pareteLateraleR );

  finalModel.push( pareteLateraleR );
  finalModel.push( pareteLateraleL );

  return STRUCT(finalModel);
};

// --------------------------

function HalfWalls () {
  this.refFacciata = new FacciataCentrata();
  this.refLaterale = new FacciataLaterale();
}

HalfWalls.prototype.creaFacciate = function() {
  var finalModel = [];

  var pareteFrontale = this.refFacciata.creaFacciata();
  var pareteLaterale = this.refLaterale.creaFacciata();

  finalModel.push( pareteFrontale );
  if ( PROJECT_NOFUNCTIONALTRS == true ) {
    finalModel.push( (pareteLaterale.translate([0,1], [this.refLaterale.getHalfLength(), -this.refFacciata.getHalfLength()])).rotate([0,1],PI/2) );

    finalModel = STRUCT(finalModel).translate([1], [-this.refLaterale.getHalfLength()]);
  } else {
    finalModel.push( R([0,1])(PI/2) );
    finalModel.push( T([0,1])([this.refLaterale.getHalfLength(), -this.refFacciata.getHalfLength()]) );
    finalModel.push( pareteLaterale );    

    finalModel = T([1])([-this.refLaterale.getHalfLength()])( STRUCT(finalModel) );
  }

  return finalModel;
};

// --------------------------

function Roof() {
  this.spessoreTimpano = 0;
  this.deltaLatoTimpano = CommonParetiMeasure.spessoreBordo * 11; // 3.3
  this.spessoreTappoTimpano = CommonParetiMeasure.spessoreBordo * 6; // 1.8
};

Roof.prototype.creaComignolo = function() {
  var baseMeasure = {"x": 3.6, "y": 3.6, "z": 3.6};
  var baseSupMeasure = {"x": 3.6, "y": 3.6, "z": 2};
  var coronaSpessore = 0.2;
  var larghezzaSup = 5;
  var altezzaTri = 2.14;
  //

  //
  var finalModel = [];

  var modelloCubo = COLOR( ColoriProgetto.INTONACO_BASE )( CUBOID([baseSupMeasure.x, baseSupMeasure.y, baseSupMeasure.z]) );
  var modelloBase = COLOR( ColoriProgetto.INTONACO_BASE )( CUBOID([baseMeasure.x, baseMeasure.y, baseMeasure.z * 2]) );
  var modelloCorona = COLOR(ColoriProgetto.INTONACO_BORDI)(
              STRUCT([
                SIMPLEX_GRID([[coronaSpessore + baseMeasure.x + coronaSpessore],[coronaSpessore, -baseMeasure.y, coronaSpessore],[-(2*baseMeasure.z - coronaSpessore), coronaSpessore]]),
                SIMPLEX_GRID([[coronaSpessore, -baseMeasure.x, coronaSpessore],[-coronaSpessore, baseMeasure.y, -coronaSpessore],[-(2*baseMeasure.z - coronaSpessore), coronaSpessore]])
              ])
            );
  //
  var spuntoneTrap = (larghezzaSup - baseMeasure.z)/2;
  var trapezioSin = COLOR( ColoriProgetto.INTONACO_BASE )( STRUCT([
                SIMPLICIAL_COMPLEX([[0,0,0],[0,0,baseSupMeasure.z],[-spuntoneTrap,0,baseSupMeasure.z]])([[0,1,2]]),
                SIMPLICIAL_COMPLEX([[0,baseSupMeasure.y,0],[0,baseSupMeasure.y,baseSupMeasure.z],[-spuntoneTrap,baseSupMeasure.y,baseSupMeasure.z]])([[0,1,2]]),
                SIMPLICIAL_COMPLEX([[0,baseSupMeasure.y,baseSupMeasure.z],[-spuntoneTrap,baseSupMeasure.y,baseSupMeasure.z],[-spuntoneTrap,0,baseSupMeasure.z],[0,0,baseSupMeasure.z]])([[0,1,2],[2,3,0]]),
                SIMPLICIAL_COMPLEX([[0,0,0],[0,baseSupMeasure.y,0],[-spuntoneTrap,baseSupMeasure.y,baseSupMeasure.z],[-spuntoneTrap,0,baseSupMeasure.z]])([[0,1,2],[2,3,0]])
              ]) );
  var trapezioDes = T([0])([baseMeasure.x])(S([0])([-1])(trapezioSin));
  //
  var triFrontale = COLOR( ColoriProgetto.INTONACO_BASE )(
              SIMPLICIAL_COMPLEX([[-spuntoneTrap,0,0],[baseMeasure.x/2,0,altezzaTri],[spuntoneTrap+baseMeasure.x,0,0]])([[0,1,2]])
            );
  var triDietro = COLOR( ColoriProgetto.INTONACO_BASE )(
              SIMPLICIAL_COMPLEX([[-spuntoneTrap,baseSupMeasure.y,0],[baseMeasure.x/2,baseSupMeasure.y,altezzaTri],[spuntoneTrap+baseMeasure.x,baseSupMeasure.y,0]])([[0,1,2]])
            );
  //
  var tettoSinistra = COLOR(ColoriProgetto.TETTO)(
              SIMPLICIAL_COMPLEX([[-spuntoneTrap,baseSupMeasure.y+coronaSpessore,0],[baseMeasure.x/2,baseSupMeasure.y+coronaSpessore,altezzaTri],[baseMeasure.x/2,-coronaSpessore,altezzaTri],[-spuntoneTrap,-coronaSpessore,0]])([[0,1,2],[2,3,0]])
            );
  var tettoDestra = COLOR(ColoriProgetto.TETTO)(
              SIMPLICIAL_COMPLEX([[spuntoneTrap+baseMeasure.x,baseSupMeasure.y+coronaSpessore,0],[baseMeasure.x/2,baseSupMeasure.y+coronaSpessore,altezzaTri],[baseMeasure.x/2,-coronaSpessore,altezzaTri],[spuntoneTrap+baseMeasure.x,-coronaSpessore,0]])([[0,1,2],[2,3,0]])
            );  

  finalModel.push( T([0,1,2])([-(baseMeasure.x/2), -(baseMeasure.y/2), (7/4)*baseMeasure.z]) );
  finalModel.push( modelloBase );
  finalModel.push( T([0,1])([-coronaSpessore,-coronaSpessore])( modelloCorona ) );
  finalModel.push( T([2])([baseMeasure.z * 2]) );
  finalModel.push( modelloCubo );
  finalModel.push( trapezioSin );
  finalModel.push( trapezioDes );
  finalModel.push( T([2])([baseSupMeasure.z]) );
  finalModel.push( triFrontale );
  finalModel.push( triDietro );
  finalModel.push( tettoSinistra );
  finalModel.push( tettoDestra );

  return STRUCT(finalModel);
};

Roof.prototype.creaHalfTetto = function(halfX, halfY, halfPatioX, altezzaTetto, altezzaTimpano) {
  var finalModel = [];

  finalModel.push( T([0])([-halfX]) );

  var sottoTetto = SIMPLICIAL_COMPLEX([[0,0,0], [halfX,0,0], [halfX,2*halfY,0], [0,2*halfY,0]])([[0,1,2],[2,3,0]]);
  finalModel.push( COLOR(ColoriProgetto.INTONACO_BORDI)(sottoTetto) ); 

  var salitaSinistra = SIMPLICIAL_COMPLEX([[0,0,0],[halfX-halfPatioX,halfY,altezzaTetto],[0,2*halfY,0]])([[0,1,2]]);
  finalModel.push( COLOR(ColoriProgetto.TETTO)(salitaSinistra) );

  var salitaSottoSinistra = SIMPLICIAL_COMPLEX([[0,0,0],[halfX-halfPatioX,halfY,altezzaTetto],[halfX,halfY,altezzaTetto],[halfX,0,0]])([[0,1,2],[2,3,0]]);
  finalModel.push( COLOR(ColoriProgetto.TETTO)(salitaSottoSinistra) );

  var salitaSopraSinistra = SIMPLICIAL_COMPLEX([[0,2*halfY,0],[halfX-halfPatioX,halfY,altezzaTetto],[halfX,halfY,altezzaTetto],[halfX,2*halfY,0]])([[0,1,2],[2,3,0]]);
  finalModel.push( COLOR(ColoriProgetto.TETTO)(salitaSopraSinistra) );

  
  var salitaTimpanoDavanti = SIMPLICIAL_COMPLEX([[halfX-halfPatioX-this.deltaLatoTimpano,this.spessoreTimpano,0],
                          [halfX,this.spessoreTimpano,altezzaTimpano],
                        [halfX,halfY,altezzaTimpano],[halfX-halfPatioX,halfY,0]])([[0,1,2],[2,3,0]]);
  finalModel.push( COLOR(ColoriProgetto.TETTO)(salitaTimpanoDavanti) );

  var tapposalitaTimpanoDavanti = SIMPLICIAL_COMPLEX([[halfX-halfPatioX-this.deltaLatoTimpano,this.spessoreTappoTimpano,0],
                          [halfX,this.spessoreTappoTimpano,altezzaTimpano],
                          [halfX,this.spessoreTappoTimpano,0]])([[0,1,2]]);
  finalModel.push( COLOR(ColoriProgetto.INTONACO_BORDI)(tapposalitaTimpanoDavanti) ); 

  var salitaTimpanoDietro = SIMPLICIAL_COMPLEX([[halfX-halfPatioX-this.deltaLatoTimpano,2*halfY-this.spessoreTimpano,0],
                        [halfX,2*halfY-this.spessoreTimpano,altezzaTimpano],
                        [halfX,halfY,altezzaTimpano],[halfX-halfPatioX,halfY,0]])([[0,1,2],[2,3,0]]);
  finalModel.push( COLOR(ColoriProgetto.TETTO)(salitaTimpanoDietro) );

  var tapposalitaTimpanoDietro = SIMPLICIAL_COMPLEX([[halfX-halfPatioX-this.deltaLatoTimpano,2*halfY-this.spessoreTappoTimpano,0],
                          [halfX,2*halfY-this.spessoreTappoTimpano,altezzaTimpano],
                          [halfX,2*halfY-this.spessoreTappoTimpano,0]])([[0,1,2]]);
  finalModel.push( COLOR(ColoriProgetto.INTONACO_BORDI)(tapposalitaTimpanoDietro) ); 

  // Comignolo
  var comignolo = this.creaComignolo();
  var comignoloPos = {"x": (halfX-halfPatioX)*(2/3), "y": halfY*(2/3), "z": Math.sin( Math.atan2(altezzaTetto,halfX) ) * ((halfX-halfPatioX)*(2/3)) };
  if ( PROJECT_NOFUNCTIONALTRS == true ) {
    finalModel.push( comignolo.translate([0,1,2], [comignoloPos.x, comignoloPos.y, comignoloPos.z]) );
  } else {
    finalModel.push( T([0,1,2])([comignoloPos.x, comignoloPos.y , comignoloPos.z])(comignolo) );
  } 

  return STRUCT(finalModel);
};

Roof.prototype.creaFullTetto = function(halfX, halfY, halfPatioX, altezzaTetto, altezzaTimpano) {
  altezzaTimpano = altezzaTimpano || altezzaTetto;

  var finalModel = [];
  var halfTetto = this.creaHalfTetto(halfX, halfY, halfPatioX, altezzaTetto, altezzaTimpano);

  finalModel.push( halfTetto );
  finalModel.push( S([0])([-1])( halfTetto ) );

  if ( PROJECT_NOFUNCTIONALTRS == true ) {
    finalModel = STRUCT(finalModel).translate([1],[-halfY]);
  } else {
    finalModel = T([1])([-halfY])( STRUCT(finalModel) );
  }

  return finalModel;
};

// --------------------------

function Progetto() {
  this.refhalfBase = new HalfWalls();
  this.refTetto = new Roof();
  //
  // Helpful references
  this.refFacciata = this.refhalfBase.refFacciata;
  this.refLaterale = this.refhalfBase.refLaterale;
};

Progetto.prototype.fullWalls = function() {
  var finalModel = [];

  var halfWall = this.refhalfBase.creaFacciate();

  finalModel.push( halfWall );
  if ( PROJECT_ONLYHALFWALL != true ) {
    finalModel.push( R([0,1])(PI) );
    finalModel.push( halfWall );    
  }

  return STRUCT(finalModel);
};

Progetto.prototype.fullRoof = function() {
  var finalModel = [];

  // Altezza
  var deltaZ = CommonParetiMeasure.cornicioneSuperiore_AltezzaRatio * this.refhalfBase.refLaterale.refPareti.bordoV;
  // Larghezza
  var deltaX = CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio * 5*this.refhalfBase.refLaterale.refPareti.spessoreBordo;
  // Lunghezza
  var deltaY = CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio * 2*this.refhalfBase.refLaterale.refPareti.spessoreBordo;
  // Altezza tetto
  var deltaAltezza = 1.3;

  var tettoModel = this.refTetto.creaFullTetto(this.refhalfBase.refFacciata.getHalfLengthNoDelta() + deltaX, 
                         this.refhalfBase.refLaterale.getHalfLengthNoDelta() + deltaY, 
                        this.refhalfBase.refFacciata.refPatio.centroPatioX, 
                        this.refhalfBase.refFacciata.refFullTimpano.altezzaTimpano + deltaAltezza );

  if ( PROJECT_NOFUNCTIONALTRS == true ) {
    finalModel.push( tettoModel.translate([2], [CommonParetiMeasure.altezzaPareteLunga + deltaZ]) );
  } else {
    finalModel.push( T([2])([CommonParetiMeasure.altezzaPareteLunga + deltaZ]) );
    finalModel.push( tettoModel );
  }

  return STRUCT(finalModel);
};

Progetto.prototype.creaPiattaforme = function() {
  var spessorePiattaforma = 0.1;
  var fattoreScala = 1.2;
  var pX = this.refhalfBase.refFacciata.getHalfLength() * 2 * fattoreScala;
  var pY = this.refhalfBase.refLaterale.getHalfLength() * 2 * fattoreScala;
  var tZ = this.refFacciata.refPareti.altezzaBordoInferiore;
  //
  var peX = this.refhalfBase.refFacciata.getHalfLength() * 2 * fattoreScala * 1.1;
  var peY = this.refhalfBase.refLaterale.getHalfLength() * 2 * fattoreScala * 1.1;
  var teZ = spessorePiattaforma * 10; 
  //
  // 
  var modelloPiattaforma = CUBOID([pX, pY, spessorePiattaforma]);
  var modelloErba = CUBOID([peX, peY, teZ]);

  if ( PROJECT_NOFUNCTIONALTRS == true ) {
    modelloPiattaforma = modelloPiattaforma.translate([0,1,2],[-(pX/2),-(pY/2),-tZ]);
    modelloErba = modelloErba.translate([0,1,2],[-(peX/2),-(peY/2),-(tZ+teZ)]);
  } else {
    modelloPiattaforma = T([0,1,2])([-(pX/2),-(pY/2),-tZ])(modelloPiattaforma);
    modelloErba = T([0,1,2])([-(peX/2),-(peY/2),-(tZ+teZ)])(modelloErba);
  }

  return STRUCT([
          COLOR(ColoriProgetto.INTONACO_BORDI)(modelloPiattaforma),
          COLOR(ColoriProgetto.ERBA)(modelloErba),
        ]);
};

Progetto.prototype.disegnaModello = function() {
  var finalModel = [];

  finalModel.push( this.fullWalls() );

  if ( PROJECT_NOPLATFORM != true ) {
    finalModel.push( this.creaPiattaforme() )
  }

  if (PROJECT_NOROOF != true) {
    finalModel.push( this.fullRoof() );
  }

  return STRUCT(finalModel);
};

var runProject = function() {
  var p = new Progetto();
  return p.disegnaModello();
};

return runProject();
})();

exports.author = 'furio';
exports.category = 'villas';
exports.scmodel = scmodel;

if (!module.parent) {
  fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
}

}(this));
