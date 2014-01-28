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
  /*PASTE YOUR CODE HERE*/

function beziera_2D(f){ return BEZIER(S1)(f)}
function beziera_1D(controlp){ return BEZIER(S0)(controlp)}
var dom1D = INTERVALS(1)(32)
var dom2D = DOMAIN([[0,1],[0,1]])([30,30])

function b_Dom1D(controlpoints){
	return MAP(BEZIER(S0)(controlpoints))(dom1D)
}

function b_Dom2D(functions){
	return MAP(BEZIER(S1)(functions))(dom2D) 
}
 
function T1(dims) {
return function (values) {
return function (object) {
return object.translate(dims, values);
};
};
}

function S(dims) {
return function (values) {
return function (object) {
return object.scale(dims, values);
};
};
}

function R1(dims) {
return function (values) {
return function (object) {
return object.rotate(dims, values);
};
};
}

function cerc(r,z){
var points = [[1,0,z],[1,1,z],[0,1.62,z],[-1.22,1.22,z],[-2,0,z],[-1.22,-1.22,z],[0,-1.63,z],[1,-1,z],[1,0,z]];
var c = points.map(function(point){return [point[0]*r,point[1]*r,point[2]]})
var cerchio = beziera_1D(c);
return cerchio;
}


 
function ovale(r,z){
var points = [[1,0,z],[1,1,z],[0,2,z],[-1.22,1.22,z],[-2,0,z],[-1.22,-1.22,z],[0,-2.01,z],[1,-1,z],[1,0,z]];
var c = points.map(function(point){return [point[0]*r,point[1]*r,point[2]]})
var cerchio = beziera_1D(c);
return cerchio;
}




 var INTERP_P2C = function(sel){
    return function(args){
        var P1 = args[0]
        var C1 = args[1]

        return function(point){
            v=sel(point);
            var C1u= C1(point);

        var mapped = new Array(3);
        var i;
        for(i=0;i<3;i+=1){
            mapped[i] = P1[i] + v*(C1u[i] - P1[i]);}
            return mapped;
        };
    };
};




var c = cerc(3,0)

var ct = cerc(3,0.2)

var uv = DOMAIN([[0,1],[0,1]])([50,32])

var cct =b_Dom2D([c,ct]);



var interno = cerc(2.4,0)
var internoz = cerc(2.4,0.2)
var ci =b_Dom2D([c,interno]);

var izi = b_Dom2D([internoz,interno]);


var izct = b_Dom2D([internoz,ct]);


var C = b_Dom2D([cerc(2.99,0.2),cerc(2.98,0.36),cerc(2.42,0.36),cerc(2.41,0.2)])


var fuori = STRUCT([ci,izi,izct,cct])


var b = beziera_1D([[5.99, -0.23,0], [5.76, 0.41,0], [5.62, 1.02,0], [5.68, 1.65,0]])
var b1 = beziera_1D([[5.99, -0.23,1.2], [5.76, 0.41,1.2], [5.62, 1.02,1.2], [5.68, 1.65,1.2]])

var bs3 = beziera_1D([[5.99+0.08, -0.23,0], [5.76+0.08, 0.41,0], [5.62+0.08, 1.02,0], [5.68+0.08, 1.65,0]])
var b1s3 = beziera_1D([[5.99+0.08, -0.23,1.2], [5.76+0.08, 0.41,1.2], [5.62+0.08, 1.02,1.2], [5.68+0.08, 1.65,1.2]])


var bs = beziera_1D([[5.99+0.08, -0.23,0.02], [5.76+0.08, 0.41,0.02], [5.62+0.08, 1.02,0.02], [5.68+0.08, 1.65,0.02]])
var b1s = beziera_1D([[5.99+0.08, -0.23,1.2-0.02], [5.76+0.08, 0.41,1.2-0.02], [5.62+0.08, 1.02,1.2-0.02], [5.68+0.08, 1.65,1.2-0.02]])
var dr = beziera_1D([[6.11+0.1, -0.14,0], [5.89+0.2, 0.52,0], [5.78+0.2, 1.05,0], [5.82+0.2, 1.68,0]])
var dra = beziera_1D([[6.11+0.1, -0.14,1.2], [5.89+0.2, 0.52,1.2], [5.78+0.2, 1.05,1.2], [5.82+0.2, 1.68,1.2]])
var dd = b_Dom2D([bs,dr,dra,b1s])



var vs = b_Dom2D([bs3,b1s3])
var v = b_Dom2D([b,b1])
var vvs = b_Dom2D([bs3,b])
var vv = b_Dom2D([b1s3,b1])

var VVV = STRUCT([v,vs,vvs,vv]);


var pezzoSopra = beziera_1D([[5.68, 1.72,0], [5.77, 3.41,0], [7.14, 4.34,0], [8.44, 4.33,0]])
var pezzoSopra1 = beziera_1D([[5.68, 1.72,1.2], [5.77, 3.41,1.2], [7.14, 4.34,1.2], [8.44, 4.33,1.2]])

var pez = b_Dom2D([pezzoSopra,pezzoSopra1])

var pezzoSopraX3 = beziera_1D([[5.75, 1.72,0], [5.87, 3.32,0], [7.2, 4.33,0], [8.45, 4.24,0]])
var pezzoSopra1X3 = beziera_1D([[5.75, 1.72,1.2], [5.87, 3.32,1.2], [7.2, 4.33,1.2], [8.45, 4.24,1.2]])

var pezX = b_Dom2D([pezzoSopraX3,pezzoSopra1X3])

var pezz = b_Dom2D([pezzoSopra,pezzoSopraX3])
var pezzx = b_Dom2D([pezzoSopra1,pezzoSopra1X3])

var VVVx = STRUCT([pez,pezX,pezz,pezzx]);

//Inmezzo
var k = beziera_1D([[6.11, 2.9,0.02],[6.14, 3.03,0.02],[6.11, 2.92,0.02],[6.29, 3.19,0.02]])
var k1 = beziera_1D([[6.11, 2.9,1.2-0.02],[6.14, 3.03,1.2-0.02],[6.11, 2.92,1.2-0.02],[6.29, 3.19,1.2-0.02]])

var k2 = beziera_1D([[6.18+0.19, 2.8,0], [6.25+0.19, 2.98,0], [6.29+0.2, 3.02,0], [6.38+0.2, 3.11,0]])
var k3 = beziera_1D([[6.18+0.19, 2.8,1.2], [6.25+0.19, 2.98,1.2], [6.29+0.2, 3.02,1.2], [6.38+0.2, 3.11,1.2]])


var K = b_Dom2D([k,k2,k3,k1])

//sotto
var m = beziera_1D([[6.11, 2.9,0.02], [5.94, 2.7,0.02], [5.78, 2.14,0.02], [5.75, 1.73,0.02]])
var o = beziera_1D([[6.18+0.2, 2.8,0], [6.02+0.2, 2.66,0], [5.82+0.2, 2.14,0], [5.81+0.2, 1.73,0]])
var p = beziera_1D([[6.18+0.2, 2.8,1.2], [6.02+0.2, 2.66,1.2], [5.82+0.2, 2.14,1.2], [5.81+0.2, 1.73,1.2]])
var n = beziera_1D([[6.11, 2.9,1.2-0.02], [5.94, 2.7,1.2-0.02], [5.78, 2.14,1.2-0.02], [5.75, 1.73,1.2-0.02]])

var uo = b_Dom2D([m,o,p,n])


var coperchioSopra = beziera_1D([[5.75, 1.73,0.02],[5.81+0.2, 1.73,0],[5.81+0.2, 1.73,1.2],[5.75, 1.73,1.2-0.02]])
var cS = beziera_1D([[5.75, 1.73,0.02],[5.75, 1.73,1.2-0.02]])
var coperch = b_Dom2D([coperchioSopra,cS])

var coperchioSotto = beziera_1D([[5.68+0.08, 1.65,0.02],[5.82+0.2, 1.68,0],[5.82+0.2, 1.68,1.2],[5.68+0.08, 1.65,1.2-0.02]])
var cSot = beziera_1D([[5.68+0.08, 1.65,0.02],[5.68+0.08, 1.65,1.2-0.02]])
var coperch1 = b_Dom2D([coperchioSotto,cSot])

var cSS = beziera_1D([[5.77, 1.73,0.02],[5.77, 1.73,1.2-0.02]])

var al = b_Dom2D([cSot,cSS]) //

var cS1 = beziera_1D([[5.83, 1.73,0.06],[5.83, 1.73,1.2-0.06]])
var cSot1 = beziera_1D([[5.74+0.08, 1.65,0.06],[5.74+0.08, 1.65,1.2-0.06]])

var al1 = b_Dom2D([cSot1,cS1]) //

var chius = beziera_1D([[5.75, 1.73,0.02],[5.83, 1.73,0.06]])
var chius1 = beziera_1D([[5.68+0.08, 1.65,0.02],[5.74+0.08, 1.65,0.06]])
var ch = b_Dom2D([chius,chius1]) //

var chiu = beziera_1D([[5.77, 1.73,1.2-0.02],[5.83, 1.73,1.2-0.06]])
var chiu1 = beziera_1D([[5.68+0.08, 1.65,1.2-0.02],[5.74+0.08, 1.65,1.2-0.06]])
var chi = b_Dom2D([chiu,chiu1]) //




//sopra
var ff = beziera_1D([[6.29, 3.19,0.02], [6.33, 3.36,0.02], [7.2, 4.33,0.02], [8.45, 4.24,0.02]])
var ee = beziera_1D([[6.38+0.2, 3.13,0], [6.82+0.2, 3.68,0], [7.65+0.2, 4.06,0], [8.47+0.2, 4.08,0]])
var mm  = beziera_1D([[6.49, 3.07,0.6], [7.27, 3.66,0.6], [7.71, 3.81,0.6], [8.5, 3.84,0.6]])
var ee1 = beziera_1D([[6.38+0.2, 3.13,1.2], [6.82+0.2, 3.68,1.2], [7.65+0.2, 4.06,1.2], [8.47+0.2, 4.08,1.2]])
var ff1 = beziera_1D([[6.29, 3.19,1.2-0.02], [6.33, 3.36,1.2-0.02], [7.2, 4.33,1.2-0.02], [8.45, 4.24,1.2-0.02]])

var h = b_Dom2D([ff,ee,mm,ee1,ff1])

var attacco = beziera_1D([[7.8, -5.2,0], [8.13, -4.87,0], [8.15, -4.53,0], [8.19, -4.3,0]])
var attacco1 = beziera_1D([[9.66, -5.2,0], [9.33, -4.87,0], [9.35, -4.53,0], [9.32, -4.3,0]])

var at = b_Dom2D([attacco,attacco1])

var attacco2 = beziera_1D([[7.8, -5.2,0.08], [8.13, -4.87,0.08], [8.15, -4.53,0.08], [8.19, -4.3,0.08]])
var attacco3 = beziera_1D([[9.66, -5.2,0.08], [9.33, -4.87,0.08], [9.35, -4.53,0.08], [9.32, -4.3,0.08]])

var at1 = b_Dom2D([attacco2,attacco3])

var att = b_Dom2D([attacco,attacco2])
var att1 = b_Dom2D([attacco1,attacco3])


var AT1 = STRUCT([at,at1,att,att1]);


//imbott
var x = -0.2
var attaccoI= beziera_1D([[7.7+x, -5.18,0.07], [8.13+x, -4.87,0.07], [8.15+x, -4.53,0.07], [8.19+x, -4.2,0.07]])
var attaccoF = beziera_1D([[9.74-x, -5.18,0.07], [9.33-x, -4.87,0.07], [9.35-x, -4.53,0.07], [9.32-x, -4.2,0.07]])

var attaccoM = beziera_1D([[7.8, -5.18,0.3], [8.13, -4.87,0.3], [8.15, -4.53,0.3], [8.19-0.25, -4.3,0.24]])
var lineamezzo = beziera_1D([[8.73,-5.18,-0.2],[8.74,-4.8,0],[8.755,-4.3,0.12]])
var attaccoN = beziera_1D([[9.66, -5.18,0.28], [9.33, -4.87,0.3], [9.35, -4.53,0.3], [9.3+0.25, -4.3,0.24]])

var imbo = b_Dom2D([attaccoI,attaccoM,lineamezzo,attaccoN,attaccoF])


var o = T1([0,1])([-3,4])(imbo)

var oo = R1([0,2])([PI/2])(o)

var ooo = R1([0,1])([0.36])(oo)

var oooo  =T1([0,2,1])([5.8835,6.32,0.06])(ooo)

var o5 = S([2])([0.6])(oooo)

var O5 = COLOR([47/255,47/255,47/255])(T1([0,1,2])([-1,-1,0.138])(o5))

var tra = T1([0,1])([-3,4])(AT1)

var ruo = R1([0,2])([PI/2])(tra)

var rr = R1([0,1])([0.36])(ruo)

var ttt  =T1([0,2,1])([5.8835,6.32,0.05])(rr)

var scal = S([2])([1.062])(ttt)


var iii = cerc(2.3,0)
var ii= cerc(1.2,0)

var i5 = b_Dom2D([iii,ii]);


var iiiz = cerc(2.3,0.2)

var i6z = b_Dom2D([iii,iiiz]);


var iiz = cerc(1.2,0.2)

var i4z = b_Dom2D([ii,iiz]);


var i5z = b_Dom2D([iiiz,iiz]);


var tt = cerc(2.2,0.2+0.3)
var tt1 = cerc(2.2,0.2)
var t2 = b_Dom2D([tt,tt1]);


var y = ovale(2.9,0.2+0.3)
var yy = ovale(3.4,0.2+0.3+0.4)
var y2 = b_Dom2D([y,yy])


var y3 = b_Dom2D([y,tt])


var yyy = ovale(3.4,0.2+0.3+0.5)
var y4 = b_Dom2D([yyy,yy])


var punto = [0,0,0.2+0.3+0.5]
var Sa1 = INTERP_P2C(S1)([punto,yyy])
var ss = MAP(Sa1)(uv)
var viola = COLOR([75/255,0,130/255])(STRUCT([t2,y2,y3,y4,ss,i5,fuori,i6z,i5z,i4z]))

var dr = [0,0,0]
var DD = INTERP_P2C(S1)([dr,cerc(1.2,0)])
var centro = MAP(DD)(uv)

//logo
var x= -9
var y = 6.5


var drz = beziera_1D([[8.63+x, -5.86+y,0.001], [8.7+x, -6.31+y,0.001], [8.52+x, -6.75+y,0.001], [9.03+x, -6.81+y,0.001]])
var dr1z = beziera_1D([[8.78+x, -5.83+y,0.001], [8.82+x, -6.33+y,0.001], [8.72+x, -6.65+y,0.001], [9.04+x, -6.69+y,0.001]])
var drDrez = b_Dom2D([drz,dr1z])


var drez= beziera_1D([[8.77+x, -6.42+y,0.001], [9.16+x, -5.99+y,0.001], [9.5+x, -6.58+y,0.001], [9.04+x, -6.69+y,0.001]])
var dre1z = beziera_1D([[8.79+x, -6.21+y,0.001], [9.41+x, -5.89+y,0.001], [9.67+x, -6.76+y,0.001], [9.03+x, -6.81+y,0.001]])
var drDre1z = b_Dom2D([drez,dre1z])


var DrDre=STRUCT([drDrez,drDre1z])


var drDreT = S([0,1])([1.3,1.76])(DrDre)

var drDreR = R1([0,2])(PI)(drDreT)

//rosso

var rr = ovale(3.38,0.2+0.3+0.5)
var rrr= ovale(3.38,0.2+0.3+0.58)
var r1 = COLOR([1,0,0])(b_Dom2D([rrr,rr]))

//grigio
var gg = ovale(3.38,0.2+0.3+0.58)
var ggg= ovale(3.38,0.2+0.3+0.66)
var g1 = COLOR([64/255,64/255,64/255])(b_Dom2D([ggg,gg]))

//nero 
var nn = ovale(3.38,0.2+0.3+0.66)
var nm = ovale(3.42,0.2+0.3+0.70)
var nnn = ovale(3.38,0.2+0.3+0.74)
var n1 = COLOR([0,0,0])(b_Dom2D([nn,nm,nnn]))

//cuffia nera

var cc = ovale(3.38,0.2+0.3+0.74)
var ccc = ovale(3.7,0.2+0.3+1.5)
var cc1 = ovale(3.3,0.2+0.3+1.7)
var cc2 = ovale(1.8,0.2+0.3+1.7)
var cc3 = ovale(1.4,0.2+0.3+1.5)
var cc5 = ovale(1.3,0.2+0.3+0.5)
var cn1 = COLOR([47/255,47/255,47/255])(b_Dom2D([cc,ccc,cc1,cc2,cc3,cc5]))



//dentro
var cc54 = ovale(1.3,0.2+0.3+0.55)
var punto1 = [0,0,0.2+0.3+0.55]
var Sa1 = INTERP_P2C(S1)([punto1,cc54])
var dentro = COLOR([64/255,64/255,64/255])(MAP(Sa1)(uv))

//cilindretti
var ll = cerc(0.1,0)
var ll1 = cerc(0.1,0.15)
var l = b_Dom2D([ll,ll1])

var lr = R1([0,2])([PI/2])(l)

var lt1 = T([0,2])([2.3,0.1])(lr)
var lt2 = T([0,2])([-2.4,0.1])(lr)


var cuffia = STRUCT([viola,r1,g1,n1,cn1,lt1,lt2,dentro,COLOR([47/255,47/255,47/255])(C),centro,COLOR([75/255,0,130/255])(drDreR)])


var f = S([0,1,2])([0.43,0.43,0.43])(cuffia) 
var f1= R1([0,2])([PI/2])(f)
var f2  = T1([0,1,2])([6,-3,1])(f1)
var f3 = R1([0,1])([0.36])(f2)
var f4 = T1([0,1])([-1,-2])(f3)

var f5 = T1([0,1,2])([-0.01,-0.34,-0.48])(f4)
//DRAW(f5)

var grigieArco = COLOR([47/255,47/255,47/255])(STRUCT([uo,h,dd,coperch,coperch1,al,al1,ch,chi]))
var violaArco = COLOR([75/255,0,130/255])(STRUCT([VVVx,VVV,scal]))


var arco = STRUCT([grigieArco,violaArco,K])

var arcoScal = S([2])([0.8])(arco)

var arcoFinale = T1([0,1])([-1,-1])(arcoScal)
//DRAW(arcoFinale)

var half = STRUCT([O5,f5,arcoFinale])

var halfModel = T1([0])([-7.4])(half)
//DRAW(halfModel)

var copia = R([0,2])(PI)(halfModel)
var halfCopy = T1([2])([0.96])(copia)

var model = STRUCT([halfModel,halfCopy])







  return model
  })();

  exports.author = 'eleonoracappelli';
  exports.category = 'others';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));
