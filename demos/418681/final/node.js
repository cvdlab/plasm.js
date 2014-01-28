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
 //DO LO RES - Ron Arad
//**********************************************************************************************************************
//

var blunotte = [25/255, 25/255, 112/255, 1]
var bordeaux = [95/255, 2/255, 31/255, 1]
var rossosangria = [146/255, 0, 10/255, 1]
var blugrigio = [0, 104/255, 139/255, 1]
var rosso = [1,0,0,1]
var arancione = [1, 36/255, 0, 1]
var salmone = [250/255, 128/255, 114/255, 1]

var fpiecegeneretor = function(npiece, hpiece, color) {
  
  if(npiece===0) return undefined;

  var domain = PROD1x1([INTERVALS(1)(15),INTERVALS(1)(15)]);
  var domain2 = DOMAIN([[0,1],[0,1]])([15,15]);
  var pieceincrease = 0.25
  var baseincrease = 0.1;
  
  var cbase1 = BEZIER(S0)([[0, 0, baseincrease], [0, 1, 0], [0, 2, 0], [0, 3, baseincrease]]);
  var cbase2 = BEZIER(S0)([[0.5, 0, 0], [0.5, 0.5, -baseincrease], [0.5, 2.5, -baseincrease], [0.5, 3, 0]]);
  var cbase3 = BEZIER(S0)([[2.5, 0, 0], [2.5, 0.5, -baseincrease], [2.5, 2.5, -baseincrease], [2.5, 3, 0]]);
  var cbase4 = BEZIER(S0)([[3, 0, baseincrease], [3, 1, 0], [3, 2, 0], [3, 3, baseincrease]]);
  var basesurface = MAP(BEZIER(S1)([cbase1,cbase2,cbase3,cbase4]))(domain);
  
  var ctop1 = BEZIER(S0)([[0, 0, hpiece-pieceincrease], [0, 1, hpiece], [0, 2, hpiece], [0, 3, hpiece-pieceincrease]]);
  var ctop2 = BEZIER(S0)([[0.5, 0, hpiece], [0.5, 0.5, hpiece+pieceincrease], [0.5, 2.5, hpiece+pieceincrease], [0.5, 3, hpiece]]);
  var ctop3 = BEZIER(S0)([[2.5, 0, hpiece], [2.5, 0.5, hpiece+pieceincrease], [2.5, 2.5, hpiece+pieceincrease], [2.5, 3, hpiece]]);
  var ctop4 = BEZIER(S0)([[3, 0, hpiece-pieceincrease], [3, 1, hpiece], [3, 2, hpiece], [3, 3, hpiece-pieceincrease]]);
  var topsurface = MAP(BEZIER(S1)([ctop1,ctop2,ctop3,ctop4]))(domain);

  var l1base = BEZIER(S0)([[0, 0, baseincrease], [0.5, 0, 0], [2.5, 0, 0], [3, 0, baseincrease]]);
  var l1top = BEZIER(S0)([[0, 0, hpiece-pieceincrease], [0.5, 0, hpiece], [2.5, 0, hpiece],[3, 0, hpiece-pieceincrease]]);
  
  var l2base = BEZIER(S0)([[0, 3, baseincrease], [0.5, 3, 0], [2.5, 3, 0], [3, 3, baseincrease]]);  
  var l2top = BEZIER(S0)([[0, 3, hpiece-pieceincrease], [0.5, 3, hpiece], [2.5, 3, hpiece],[3, 3, hpiece-pieceincrease]]);

  var lateral1 = BEZIER(S1)([cbase1,ctop1]);
  var lateral2 = BEZIER(S1)([cbase4,ctop4]);
  var lateral3 = BEZIER(S1)([l1base,l1top]);
  var lateral4 = BEZIER(S1)([l2base,l2top]);
  
  var fuse1 = MAP(lateral1)(domain2); 
  var fuse2 = MAP(lateral2)(domain2); 
  var fuse3 = MAP(lateral3)(domain2); 
  var fuse4 = MAP(lateral4)(domain2); 
  
  var piece = STRUCT([basesurface, topsurface, fuse1, fuse2, fuse3, fuse4]);
  
  var pieces = [piece];
  
  for(var i=0; i<npiece; i++) {
    pieces.push(T([0])([(3)+(1/10)])(piece));
    piece = pieces[i+1];
  };
  
  pieces.pop();
      
  return COLOR(color)(STRUCT(pieces));
};


var baseincrease = 0.1;
var tpieces = 3 + baseincrease;
var hseat = 5

var linepieces1 = fpiecegeneretor(1, hseat, bordeaux);
var linepieces2 = T([0])([tpieces])(fpiecegeneretor(1, hseat, rossosangria));
var linepieces3 = T([0])([tpieces*2])(fpiecegeneretor(1, hseat, bordeaux));
var linepieces4 = T([0])([-tpieces])(fpiecegeneretor(1, 7, blugrigio));
var linepieces5 = T([0,1])([-tpieces,tpieces])(fpiecegeneretor(1, 8, bordeaux));
var linepieces6 = T([0,1])([-tpieces,tpieces*2])(fpiecegeneretor(1, 9, blunotte));
var linepieces7 = T([1])([tpieces*2])(linepieces5);
var linepieces8 = T([1])([tpieces*3])(fpiecegeneretor(1, 10, blunotte));
var linepieces9 = T([0,1])([tpieces,tpieces*3])(fpiecegeneretor(1, 11, blugrigio));
var linepieces10 = T([0,1])([tpieces*2,tpieces*3])(fpiecegeneretor(1, 12, blunotte));
var linepieces11 = T([0,1])([tpieces*4,tpieces*3])(fpiecegeneretor(1, 13, bordeaux));
var linepieces13 = T([0])([tpieces])(linepieces11);
var linepieces15 = T([0,1])([tpieces*3,tpieces*3])(fpiecegeneretor(1, 13, bordeaux));
var linepieces16 = T([0])([tpieces*5])(T([0,1])([tpieces*3,tpieces*3])(fpiecegeneretor(1, 13, rossosangria)));
var linepieces12 = T([0])([tpieces*3])(T([0,1])([tpieces,tpieces*3])(fpiecegeneretor(1, 11, salmone)));
var linepieces14 = T([0])([tpieces*5])(T([0,1])([tpieces,tpieces*3])(fpiecegeneretor(1, 11, arancione)));
var linepieces17 = T([0])([tpieces*6])(T([0,1])([tpieces,tpieces*3])(fpiecegeneretor(1, 11.5, salmone)));
var linepieces18 = T([0])([tpieces*8])(T([0,1])([tpieces,tpieces*3])(fpiecegeneretor(1, 11.5, bordeaux)));
var linepieces19 = T([0])([tpieces*9])(T([0,1])([tpieces,tpieces*3])(fpiecegeneretor(1, 11, salmone)));
var linepieces20 = T([0,1])([tpieces*12,tpieces*2])(T([0,1])([-tpieces,tpieces])(fpiecegeneretor(1, 8, arancione)));
var linepieces21 = T([0])([tpieces*12])(T([0,1])([-tpieces,tpieces*2])(fpiecegeneretor(1, 9, rossosangria)));
var linepieces22 = T([0])([tpieces*12])(T([0,1])([-tpieces,tpieces])(fpiecegeneretor(1, 8, bordeaux)));
var linepieces23 = T([0])([tpieces*11])(fpiecegeneretor(1, 9, salmone));
var linepieces24 = T([0,1])([tpieces*11,-tpieces])(fpiecegeneretor(1, 10, rossosangria));
var linepieces25 = T([0,1])([tpieces*11,-tpieces*2])(fpiecegeneretor(1, 11, bordeaux));
var linepieces26 = T([0,1])([tpieces*10,-tpieces*2])(fpiecegeneretor(1, hseat, bordeaux));
var linepieces27 = T([0,1])([tpieces*9,-tpieces*2])(fpiecegeneretor(1, hseat, salmone));
var linepieces28 = T([0,1])([tpieces*8,-tpieces*2])(fpiecegeneretor(1, hseat, rossosangria));
var linepieces29 = T([0,1])([tpieces*10,-tpieces])(fpiecegeneretor(1, hseat, arancione));
var linepieces30 = T([0,1])([tpieces*9,-tpieces])(fpiecegeneretor(1, hseat, arancione));
var linepieces31 = T([0,1])([tpieces*8,-tpieces])(fpiecegeneretor(1, hseat, salmone));
var linepieces32 = T([0])([tpieces*10])(fpiecegeneretor(1, hseat, arancione));
var linepieces33 = T([0])([tpieces*9])(fpiecegeneretor(1, hseat, arancione));
var linepieces34 = T([0])([tpieces*8])(fpiecegeneretor(1, hseat, salmone));
var linepieces35 = T([0,1])([tpieces*10,tpieces])(fpiecegeneretor(1, hseat, rossosangria));
var linepieces36 = T([0,1])([tpieces*9,tpieces])(fpiecegeneretor(1, hseat, arancione));
var linepieces37 = T([0,1])([tpieces*8,tpieces])(fpiecegeneretor(1, hseat, bordeaux));
var linepieces38 = T([0,1])([tpieces*10,tpieces*2])(fpiecegeneretor(1, hseat, salmone));
var linepieces39 = T([0,1])([tpieces*9,tpieces*2])(fpiecegeneretor(1, hseat, blunotte));
var linepieces40 = T([0,1])([tpieces*8,tpieces*2])(fpiecegeneretor(1, hseat, arancione));
var linepieces41 = T([0])([tpieces*3])(fpiecegeneretor(1, hseat, salmone));
var linepieces42 = T([0])([tpieces*4])(fpiecegeneretor(1, hseat, rossosangria));
var linepieces43 = T([0])([tpieces*5])(fpiecegeneretor(2, hseat, bordeaux));
var linepieces44 = T([0])([tpieces*7])(fpiecegeneretor(1, hseat, salmone));
var linepieces45 = T([1])([tpieces])(fpiecegeneretor(1, hseat, rossosangria));
var linepieces46 = T([0,1])([tpieces,tpieces])(fpiecegeneretor(3, hseat, salmone));
var linepieces47 = T([0,1])([tpieces*4,tpieces])(fpiecegeneretor(3, hseat, rossosangria));
var linepieces48 = T([0,1])([tpieces*7,tpieces])(fpiecegeneretor(1, hseat, bordeaux));
var linepieces49 = T([1])([tpieces*2])(fpiecegeneretor(2, hseat, blunotte));
var linepieces50 = T([0,1])([tpieces*2,tpieces*2])(fpiecegeneretor(1, hseat, salmone));
var linepieces51 = T([0,1])([tpieces*3,tpieces*2])(fpiecegeneretor(4, hseat, bordeaux));
var linepieces52 = T([0,1])([tpieces*7,tpieces*2])(fpiecegeneretor(1, hseat, rossosangria));

//**********************************************************************************************************************
//base
var foot = EXTRUDE([0.4])(DISK(1)(30));
var foot1 = T([0,1,2])([-1.5, 1.5, -0.4])(EXTRUDE([0.5])(DISK(0.5)(30)));
var foot2 = T([1])([9])(foot1);
var foot3 = T([0])([37])(foot2);
var foot4 = T([1])([-15])(foot3);
var foot5 = T([0])([-9])(foot4);
var feet = STRUCT([foot1,foot2,foot3,foot4,foot5]);

var base1 = T([0])([-3])(CUBOID([27.8, 12.3, 0.1]));
var base2 = T([0,1])([24.8,-6.2])(CUBOID([12.3, 18.5, 0.1]));

var base = COLOR([0.5,0.5,0.5,1])(T([2])([-0.2])(STRUCT([base1, base2, feet])));

//**********************************************************************************************************************
//

var model = STRUCT([linepieces1,linepieces2,linepieces3,linepieces4,linepieces5,linepieces6,linepieces7, linepieces8, 
      linepieces9,linepieces10, linepieces12, linepieces13, linepieces14, linepieces15, linepieces16,
      linepieces17, linepieces18, linepieces19, linepieces20, linepieces21, linepieces22, linepieces23,
       linepieces24,  linepieces25, linepieces26, linepieces27, linepieces28, linepieces29, linepieces30,
       linepieces31, linepieces32, linepieces33, linepieces34, linepieces35, linepieces36, linepieces37,
       linepieces38, linepieces39, linepieces40, linepieces41, linepieces42, linepieces43, linepieces44,
       linepieces45,linepieces46,linepieces47,linepieces48, linepieces49, linepieces50, linepieces51, 
       linepieces52, base]);


  return model
  })();

  exports.author = 'AlessandroGiacomini';
  exports.category = 'furnitures';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));