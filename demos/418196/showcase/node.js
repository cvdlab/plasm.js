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
function TRASLAPOINTS(values){
  x = values[0]
  y = values[1]
  z = values[2]
  function TRASLAPOINTS2(points){
    p = []
    for(a in points){
      c = [0,0,0]
      c[0] = points[a][0] + x
      c[1] = points[a][1] + y
      c[2] = points[a][2] + z
      p.push(c)
    }
    return p
  }
  return TRASLAPOINTS2
}

function TORUS (R, r){
  return function (v) {
    var a = v[0]
    var b = v[1]
    var u = (r * COS(a) + R) * COS(b);
    var v = (r * COS(a) + R) * SIN(b);
    var w = (r * SIN(a));
    return [u,v,w];
  };
};

//var yellow = [1,1,0]
//var red = [1,0,0]
//var blu = [0,0,1]
//var green = [0,1,0]
//var viola = [0.63,0.12,0.94]
//var orange = [1,0.65,0]
var grey71 = [0.71,0.71,0.71]
var gold = [1,0.84,0]
var f_scala = 7.0/19
var r_tubo = 0.5/2 * f_scala
var domain = DOMAIN([[0,1]])([20])
var domain2D = DOMAIN([[0,1],[0,2*PI]])([20,20])
var pts = [[1.69, 0, 2.16], [1.7, 0, 9.05], [1.9, 0, 9.11], [2.63, 0, 9.3]]
var pts1 = TRASLAPOINTS([-1.69+r_tubo,0,-2.16])(pts)
var b1 = BEZIER(S0)(pts1)
var sur = ROTATIONAL_SURFACE(b1)
var surface = MAP(sur)(domain2D)

var torus1 = TORUS(2*f_scala,r_tubo)
var torus1_solid = MAP(torus1)(DOMAIN([[0,2*PI],[0,PI]])([20,20]))
var sur_ok = T([0])([-2*f_scala])(R([1,2])(-PI/2)(surface))
var torus_ok = R([1,2])(PI)(torus1_solid)
//var torus_ok_T = T([0,2])([-2*f_scala,r_tubo])(torus_ok)
//var torus_ok1 = T([0,2])([2*f_scala,2*0.5*f_scala])(R([0,2])(-ATAN(1.3/2*f_scala))(torus_ok_T))

var cilinder = EXTRUDE([5*f_scala])(DISK(0.8/2 * f_scala)(20))
var cil_1 = COLOR(grey71)(T([2])([5*f_scala])(EXTRUDE([0.5*f_scala])(DISK(0.2/2 * f_scala)(20))))
var cil_2 = COLOR(grey71)(T([2])([(5+0.5)*f_scala])(EXTRUDE([0.2*f_scala])(DISK(0.7/2 * f_scala)(20))))
var tasto = STRUCT([COLOR(gold)(cilinder),cil_1,cil_2])
var tasto_ok_1 = T([0,1,2])([2.8*f_scala,4.5*f_scala,r_tubo+0.8/2*f_scala])(R([0,2])([-PI/2])(tasto))
var tasto_ok_2 = T([1])([0.5])(tasto_ok_1)
var tasto_ok_3 = T([1])([0.5])(tasto_ok_2)

var cil_surface = EXTRUDE([15.4*f_scala])(CIRCLE(r_tubo)(20))
var cil_sur_ok = T([0,1,2])([-1.5*f_scala,-2*f_scala,2*r_tubo+0.8*f_scala])(R([1,2])([-PI/2])(cil_surface))

var torus2 = TORUS(1.5*f_scala,r_tubo)
var torus2_solid = MAP(torus2)(DOMAIN([[0,2*PI],[0,PI]])([20,20]))
var torus2_ok = T([1,2])([13.4*f_scala,2*r_tubo+0.8*f_scala])(torus2_solid)

var cil_surface_2 = EXTRUDE([6*f_scala])(CIRCLE(r_tubo)(20))
var cil_sur2_ok = T([0,1,2])([1.5*f_scala,7.4*f_scala,2*r_tubo+0.8*f_scala])(R([1,2])([-PI/2])(cil_surface_2))

var cil_surface_3 = EXTRUDE([4.5*f_scala])(CIRCLE(r_tubo)(20))
var cil_sur3_ok = T([0])([2.0*f_scala])(R([1,2])([-PI/2])(cil_surface_3))

var entr_uscita = STRUCT([sur_ok,torus_ok,cil_sur3_ok])
var ent_usc_ok = R([0,2])([-(ATAN((0.4*f_scala)/(2*f_scala)))])(entr_uscita)
var ent_usc_T = COLOR(gold)(T([2])([0.3*f_scala])(ent_usc_ok))

var racc = TORUS(r_tubo,r_tubo)
var racc_sol = MAP(racc)(DOMAIN([[0,2*PI],[0,PI/2]])([20,20]))
var cil1 = EXTRUDE([0.25*f_scala])(CIRCLE(r_tubo)(20))
var cilx = T([0])([r_tubo])(R([1,2])([PI/2])(cil1))
var cily = T([0,1])([-0.25*f_scala,r_tubo])(R([0,2])([PI/2])(cil1))
var raccordo = STRUCT([racc_sol,cilx,cily])

var racc1 = T([0,1,2])([1.5*f_scala,7.4*f_scala,r_tubo+0.8*f_scala])(R([0,1])(-PI/2)(R([1,2])(PI/2)(raccordo)))

var parte0 = COLOR(gold)(STRUCT([cil_sur_ok, torus2_ok, cil_sur2_ok, racc1]))

var torus3 = TORUS(1.2/2*f_scala,r_tubo)
var torus3_solid = MAP(torus3)(DOMAIN([[0,2*PI],[0,PI]])([20,20]))
var torus3_ok = T([0,1])([0.6*f_scala,5*f_scala])(torus3_solid)

var cil_surface_4 = EXTRUDE([5*f_scala])(CIRCLE(r_tubo)(20))
var cil_sur4_ok = T([0])([0])(R([1,2])([-PI/2])(cil_surface_4))
var cil_surface_5 = EXTRUDE([5*f_scala])(CIRCLE(r_tubo)(20))
var cil_sur5_ok = T([0])([1.2*f_scala])(R([1,2])([-PI/2])(cil_surface_5))

var parte1 = COLOR(gold)(STRUCT([cil_sur4_ok, cil_sur5_ok, torus3_ok]))
var parte1_ok = T([0,1,2])([1*f_scala, 7*f_scala, r_tubo+0.8/2*f_scala])(parte1)

var torus4 = TORUS(1.4/2*f_scala,r_tubo)
var torus4_solid = MAP(torus4)(DOMAIN([[0,2*PI],[0,PI]])([20,20]))
var torus4_ok = T([0])([0.7*f_scala])(R([1,2])([PI])(torus4_solid))

var cil_surface_6 = EXTRUDE([2.5*f_scala])(CIRCLE(r_tubo)(20))
var cil_sur6_ok = T([0])([0])(R([1,2])([-PI/2])(cil_surface_6))
var cil_surface_7 = EXTRUDE([2.5*f_scala])(CIRCLE(r_tubo)(20))
var cil_sur7_ok = T([0])([1.4*f_scala])(R([1,2])([-PI/2])(cil_surface_7))

var parte2 = STRUCT([torus4_ok, cil_sur6_ok, cil_sur7_ok])
var parte2_ok = T([0,1,2])([1*f_scala, 1.5*f_scala, 2*r_tubo+0.8*f_scala])(parte2)

var racc2 = T([0,1,2])([1*f_scala, 4.0*f_scala, r_tubo+0.8*f_scala])(R([0,1])([PI/2])(R([1,2])([PI/2])(raccordo)))
var racc3 = T([0,1,2])([1*f_scala+1.4*f_scala, 4.0*f_scala, r_tubo+0.8*f_scala])(R([0,1])([PI/2])(R([1,2])([PI/2])(raccordo)))

var parte2_finita = COLOR(gold)(T([1])([0.35*f_scala])(STRUCT([parte2_ok, racc2, racc3])))

var racc1 = TORUS(r_tubo,r_tubo)
var racc1_sol = MAP(racc1)(DOMAIN([[0,2*PI],[0,PI/3]])([20,20]))
var cil1_1 = EXTRUDE([0.25*f_scala])(CIRCLE(r_tubo)(20))
var cilx_1 = T([0])([r_tubo])(R([1,2])([PI/2])(cil1_1))
var cily_1 = T([0,1])([-0.25*f_scala,r_tubo])(R([0,2])([PI/2])(cil1_1))
var racc_bis = R([0,1])([PI/6])(STRUCT([cilx_1,racc1_sol]))
var raccordo1 = STRUCT([racc_bis,cily])

var torus5 = TORUS(1.2/2*f_scala,r_tubo)
var torus5_solid = MAP(torus5)(DOMAIN([[0,2*PI],[0,PI]])([20,20]))
var torus5_ok = T([0])([0.6*f_scala])(R([1,2])([PI])(torus5_solid))

var cil_surface_8 = EXTRUDE([2.0*f_scala])(CIRCLE(r_tubo)(20))
var cil_sur8_ok = T([0])([0])(R([1,2])([-PI/2])(cil_surface_8))
var cil_surface_9 = EXTRUDE([2.0*f_scala])(CIRCLE(r_tubo)(20))
var cil_sur9_ok = T([0])([1.2*f_scala])(R([1,2])([-PI/2])(cil_surface_9))

var parte3 = STRUCT([torus5_ok, cil_sur8_ok, cil_sur9_ok])

var racc4 = T([1,2])([2.0*f_scala,-r_tubo])(R([0,1])([PI/2])(R([1,2])([PI/2])(raccordo1)))
var racc5 = T([0])([1.2*f_scala])(racc4)

var parte3_ok = R([1,2])([-PI/6])(T([1,2])([-2.0*f_scala,r_tubo])(STRUCT([parte3, racc4, racc5])))
var parte3_finita = COLOR(gold)(T([0,1,2])([1*f_scala, 2*f_scala+3.7*f_scala, r_tubo+0.8*f_scala+0.25*f_scala])(parte3_ok))

var cil_small = EXTRUDE([0.7*f_scala])(CIRCLE(r_tubo/3)(20))
var cil_s_ok = R([1,2])([-PI/2])(cil_small)

var cil_medium = EXTRUDE([0.7*f_scala])(CIRCLE(r_tubo/2)(20))
var cil_m_ok = R([1,2])([-PI/2])(cil_medium)

var c_s_1 = COLOR(gold)(T([0,1,2])([-0.5*f_scala, 4.8*f_scala, r_tubo+0.4*f_scala])(cil_s_ok))
var c_s_2 = COLOR(gold)(T([0,1,2])([-0.5*f_scala, 6.2*f_scala, r_tubo+0.4*f_scala])(cil_s_ok))

var c_m_1 = COLOR(gold)(T([0,1,2])([1.5*f_scala, 4.8*f_scala, r_tubo+0.4*f_scala])(cil_m_ok))
var c_m_2 = COLOR(gold)(T([0,1,2])([1.5*f_scala, 6.2*f_scala, r_tubo+0.4*f_scala])(cil_m_ok))

var c_s_3 = COLOR(gold)(T([0,1,2])([2.5*f_scala, 4.8*f_scala, r_tubo+0.4*f_scala])(cil_s_ok))
var c_s_4 = COLOR(gold)(T([0,1,2])([2.5*f_scala, 6.2*f_scala, r_tubo+0.4*f_scala])(cil_s_ok))

var pts2 = [[3.99, 0, 9], [4.02, 0, 9.85], [4.32, 0, 9.85], [3.93, 0, 9.71]]
var pts2_T = TRASLAPOINTS([-3.99+r_tubo,0,-9])(pts2)
var b2 = BEZIER(S0)(pts2_T)
var sur2 = ROTATIONAL_SURFACE(b2)
var surface2 = MAP(sur2)(domain2D)
var bocc = R([1,2])([PI/2])(surface2)

var bocc_surf = EXTRUDE([1.6*f_scala])(CIRCLE(r_tubo)(20))
var bocc_surf_ok = R([1,2])([-PI/2])(bocc_surf)

var b_ok = T([0,1,2])([-1.5*f_scala, -3.6*f_scala, 2*r_tubo+0.8*f_scala])(COLOR(grey71)(STRUCT([bocc, bocc_surf_ok])))

var y2 = 1.
var x2 = y2*1.6

var points = [[0,0,0],[0,0,y2],[x2,0,y2],[x2,0,0],[x2,0,-y2], [0,0,-y2], [0,0,0]]
var points2 = TRASLAPOINTS([-0.6,0,0])(points)
var circle_map = BEZIER(S0)(points2)
var circle = MAP(circle_map)(domain)

var spher = ROTATIONAL_SURFACE(circle_map)
var sfera = MAP(spher)(domain2D)
var sfera_s = S([0,1,2])([1./30,1./30,1./30])(sfera)
var sal1 = T([0,1,2])([-2*f_scala,4.5*f_scala, 0.22*f_scala])(sfera_s)
var sal2 = T([1])([0.5])(sal1)
var sal3 = T([1])([0.5])(sal2)

var saldature = COLOR(gold)(STRUCT([sal1,sal2,sal3]))

var tubicino = EXTRUDE([2.5*f_scala])(CIRCLE(0.1*f_scala)(20))
var tubicino_ok = COLOR(gold)(T([0,1,2])([-1.25*f_scala,12.5*f_scala,2*r_tubo+0.8*f_scala])(R([0,2])([PI/2])(tubicino)))

var torus6 = TORUS(0.8/2*f_scala,0.05*f_scala)
var torus6_solid = MAP(torus6)(DOMAIN([[0,2*PI],[0,PI]])([20,20]))
var torus6_ok = T([0])([0.4*f_scala])(R([1,2])([PI])(torus6_solid))
var cil6 = EXTRUDE([0.2*f_scala])(DISK(0.05 * f_scala)(20))
var cil6_r = R([1,2])([-PI/2])(cil6)
var cil7 = EXTRUDE([0.4*f_scala])(DISK(0.05 * f_scala)(20))
var cil7_r = T([0])([0.8*f_scala])(R([1,2])([-PI/2])(cil7))

var app0 = STRUCT([torus6_ok, cil6_r, cil7_r])
var app0_ok = T([0])([-0.8*f_scala])(app0)
var app0_finito = COLOR(gold)(T([0,1,2])([-1.75*f_scala,8.5*f_scala,2*r_tubo+0.8*f_scala])(app0_ok))

var model = STRUCT([ent_usc_T, tasto_ok_1, tasto_ok_2, tasto_ok_3, 
  parte0, parte1_ok, parte2_finita, parte3_finita, 
  c_m_1, c_m_2, c_s_1, c_s_2, c_s_3, c_s_4, b_ok, 
  saldature, tubicino_ok, app0_finito])



  return model
  })();

  exports.author = 'leo989';
  exports.category = 'others';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));