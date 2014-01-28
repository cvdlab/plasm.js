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
  
    var YELLOW = [1,1,0];
    var BLUE = [0,0.75,1];
    var RED = [1,0,0];
    var BLACK = [0,0,0];

    function ARC(alpha, r, R) {

      var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);

      var mapping = function (v) {
        var a = v[0];
        var r = v[1];
        return [r*COS(a), r*SIN(a)];
      }

      var model = MAP(mapping)(domain);

      return model;
    }

    function CERCHIO_PIENO(R) {

      var domain = DOMAIN([[0,2*PI],[0,R]])([72,1]);

      var mapping = function (v) {
        var a = v[0];
        var r = v[1];
        return [r*COS(a), r*SIN(a)];
      }

      var model = MAP(mapping)(domain);

      return model;
    }

    function arc (alpha, beta, r, R) {

      var domain = DOMAIN([[alpha,beta],[r,R]])([36,1]);

      var mapping = function (v) {
        var a = v[0];
        var r = v[1];
        return [r*COS(a), r*SIN(a)];
      }

      var model = MAP(mapping)(domain);

      return model;
    }


    //HEAD

    var controlPoints = [[3,0,0],[5,0,2],[4,0,0],[0,0,4]];
    var curve = CUBIC_HERMITE(S0)(controlPoints);

    var dom2D = DOMAIN([[0,1],[0,2*PI]])([72,72]);
    var angolo = MAP(ROTATIONAL_SURFACE(curve))(dom2D);
    var base = CERCHIO_PIENO(3);

    var parte_bassa = STRUCT([base, angolo]);
    var parte_alta = T([2])([8])(R([1,2])(PI)(parte_bassa));
    var parte_centro = T([2])([2])(EXTRUDE([4])(CIRCLE(5)(72)));

    var faccia = STRUCT([parte_bassa,
                 parte_alta,
                 parte_centro]);
    var collo = EXTRUDE([1])(CIRCLE(3)(72));
    var punta = EXTRUDE([1])(ARC(2*PI, 1, 2));

    //eyes
    var occhio = COLOR(BLACK)(R([1,2])([PI/2])(CERCHIO_PIENO(0.5)));
    var occhio_sx = T([0,1,2])([2,-4.6,6])(R([0,1])([0.129*PI])(occhio));
    var occhio_dx = T([0,1,2])([-2,-4.6,6])(R([0,1])([-0.129*PI])(occhio));
    var occhi = STRUCT([occhio_dx, occhio_sx]);

    //mouth
    var points0 = [[0,0,0],[4,0,0],[3,-2,1.7],[3,2,-1.7]];
    var curve0 = CUBIC_HERMITE(S0)(points0);

    var points1 = [[0,0,0],[4,0,0],[3,-3,1.7],[3,3,-1.7]];
    var curve1 = CUBIC_HERMITE(S0)(points1);

    var domain = DOMAIN([[0,1],[0,1]])([36,36]);
    var mapping = BEZIER(S1)([curve0,curve1])
    var bocca0 = COLOR(BLACK)(MAP(mapping)(domain));
    var bocca = T([0,1,2])([-2,-4.6,4])(R([1,2])([PI/2])(bocca0));

    var testa0 = COLOR(YELLOW)(STRUCT([collo,
                      T([2])([1])(faccia),
                      T([2])([9])(punta)]));

    var testa1 = STRUCT([testa0,
               occhi,
               bocca]);

    var testa = R([0,1])([PI/9])(testa1);


    //CHEST

    var sc_points = [[0,0],[2,12],[12,12],[14,0]];
    var cells = [[0,1,3],[1,2,3]];

    var busto0 = EXTRUDE([8])(SIMPLICIAL_COMPLEX(sc_points)(cells));

    busto = COLOR(BLUE)(R([1,2])([PI/2])(busto0));


    //WAIST AND LEGS

    var cinta = SIMPLEX_GRID([[13],[8],[2]]);

    var bacino = R([0,2])([PI/2])(EXTRUDE([13])(CERCHIO_PIENO(4)));

    //leg build-up
    var tibia = SIMPLEX_GRID([[6],[-2,6],[-3,9]]);
    var piede = SIMPLEX_GRID([[6],[8],[-1,2]]);
    var suola = STRUCT([SIMPLEX_GRID([[6],[2,-4,2],[1]]),
              SIMPLEX_GRID([[1,-4,1],[-2,4],[1]])]);

    var gamba = STRUCT([tibia,
              piede,
              suola]);

    var gamba_dx0 = R([1,2])([PI/6])(T([1,2])([-4,-12])(gamba));
    var gamba_dx = T([1,2])([4,12])(gamba_dx0);

    var gamba_sx0 = R([1,2])([-PI/6])(T([1,2])([-4,-12])(gamba));
    var gamba_sx = T([0,1,2])([7,4,12])(gamba_sx0);

    var gambe = STRUCT([gamba_dx,gamba_sx]);

    var corpo_inferiore = COLOR(RED)(STRUCT([gambe,
                           T([2])([14])(cinta),
                           T([1,2])([4,12])(bacino)]));


    //ARMS

    var x = 2.56
    var y = 1.6

    //shoulder
    var dom2D = DOMAIN([[0,1],[0,1]])([72,72]);
    var points = [[0,0,0],[0,2*y,0],[2*x,2*y,0],[2*x,0,0],[2*x,-2*y,0],[0,-2*y,0],[0,0,0]];
    var curve0 = BEZIER(S0)(points);

    points = [[0,0,0],[0,2*y,0],[2*x,2*y,2*x],[2*x,0,2*x],[2*x,-2*y,2*x],[0,-2*y,0],[0,0,0]];
    var curve1 = BEZIER(S0)(points);

    points = [[0,0,0],[0,2*y,0],[0,2*y,2*x],[0,0,2*x],[0,-2*y,2*x],[0,-2*y,0],[0,0,0]];
    var curve2 = BEZIER(S0)(points);

    var mp = BEZIER(S1)([curve0,curve1,curve2]);
    var spalla = COLOR(BLUE)(MAP(mp)(dom2D));

    //biceps
    points = [[0,0,0],[0,2*y,0],[2*x,2*y,0],[2*x,0,0],[2*x,-2*y,0],[0,-2*y,0],[0,0,0]];
    curve0 = BEZIER(S0)(points);

    points = [[0,0,3],[0,2*y,3],[2*x,2*y,3],[2*x,0,3],[2*x,-2*y,3],[0,-2*y,3],[0,0,3]];
    curve1 = BEZIER(S0)(points);

    mp = BEZIER(S1)([curve0,curve1]);
    var bicipite = COLOR(BLUE)(MAP(mp)(dom2D));

    //elbow
    points = [[0,0,0],[0,2*y,0],[2*x,2*y,0],[2*x,0,0],[2*x,-2*y,0],[0,-2*y,0],[0,0,0]];
    curve0 = BEZIER(S0)(points);

    points = [[0,0,0],[0,2*y,0],[2*x,2*y,-2],[2*x,0,-2],[2*x,-2*y,-2],[0,-2*y,0],[0,0,0]];
    curve1 = BEZIER(S0)(points);

    points = [[0,0,0],[0,2*y,0],[2*x*COS(PI/4),2*y,-2*x*COS(PI/4)],[2*x*COS(PI/4),0,-2*x*COS(PI/4)],[2*x*COS(PI/4),-2*y,-2*x*COS(PI/4)],[0,-2*y,0],[0,0,0]];
    curve2 = BEZIER(S0)(points);

    mp = BEZIER(S1)([curve0,curve1,curve2]);
    var gomito = COLOR(BLUE)(MAP(mp)(dom2D));

    //forearm
    points = [[0,0,0],[2*y,0,0],[2*y,2*x,0],[0,2*x,0],[-2*y,2*x,0],[-2*y,0,0],[0,0,0]];
    curve0 = BEZIER(S0)(points);

    points = [[0,0,-2],[2*y,0,-2],[2*y,2*x,-2],[0,2*x,-2],[-2*y,2*x,-2],[-2*y,0,-2],[0,0,-2]];
    curve1 = BEZIER(S0)(points);

    mp = BEZIER(S1)([curve0,curve1]);

    var polsino = arc(0,2*PI,1.3,2);
    var avambraccio = COLOR(BLUE)(STRUCT([MAP(mp)(dom2D),
                        T([1,2])([2,-2])(polsino)]));

    //hand + wrist
    var mano = EXTRUDE([4])(arc(-PI/4,5*PI/4,1.5,2))
    var polso = EXTRUDE([1.5])(CIRCLE(1.3)(36));
    var mano_e_polso = COLOR(YELLOW)(STRUCT([T([1,2])([2,-3.5])(polso),
                           T([1,2])([4,-5])(R([1,2])([PI/2])(mano))]));
    //forearm + hand + wrist
    var avam_e_mano = STRUCT([avambraccio,
                  mano_e_polso]);
    //left arm
    var braccio_sx0 = STRUCT([bicipite,
                 T([2])([3])(spalla),
                 T([0,1])([2,-2])(R([0,1])([PI/2])(gomito)),
                 T([0,1])([2,-2])(R([1,2])([-PI/4])(avam_e_mano))]);
    //right arm
    var braccio_dx0 = STRUCT([bicipite,
                 T([0,2])([4,3])(R([0,1])([PI])(spalla)),
                 T([0,1])([2,-2])(R([0,1])([PI/2])(gomito)),
                 T([0,1])([2,-2])(R([1,2])([-PI/4])(avam_e_mano))]);

    //rotation and positioning of the arms...
    var braccio_dx1 = R([1,2])([-PI/6])(T([0,2])([-4,-5])(braccio_dx0));
    var braccio_dx = R([0,2])([0.05256*PI])(T([1,2])([-4,9])(braccio_dx1));

    var braccio_sx1 = R([1,2])([PI/6])(T([2])([-5])(braccio_sx0));
    var braccio_sx = T([0])([14])(R([0,2])([-0.05256*PI])(T([1,2])([-4,9])(braccio_sx1)));

    //chest + arms
    busto_e_braccia = STRUCT([busto,
                  braccio_dx,
                  braccio_sx]);


    //PLACEMENT OF ALL THE PARTS

    var model = STRUCT([T([0])([0.5])(corpo_inferiore),
              T([1,2])([8,16])(busto_e_braccia),
              T([0,1,2])([7,4,28])(testa)]);

  return model
  })();

  exports.author = 'l4nz10';
  exports.category = 'others';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));