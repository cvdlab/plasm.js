  /**
   * @author Luca Nardini
   * 
   * Drawing Villa Foscari
   */


  /*
  ** Creates left stair and
  ** replicates it to draw the twin stairs.
  ** 
  */


  !(function(exports){
   var stairs;
   var base_step = CUBOID([3.15,0.05,0.5]);

   var base = CUBOID([3,0.2,11.2]);
   var threshold = T([0,1,2])([-0.075,0.2,-0.1])(base_step);
   var step = STRUCT([base,threshold]);

   var base = CUBOID([3,0.2,10.8]);
   base = T([1,2])([0.20001,0.4])(base);
   var threshold = T([0,1,2])([-0.075,0.4,0.3])(base_step);
   var step2 = STRUCT([base,threshold]);

   var base = CUBOID([3,0.2,10.4]);
   base = T([1,2])([0.40001,0.8])(base);
   var threshold = T([0,1,2])([-0.075,0.6,0.7])(CUBOID([3.15,0.05,2.8]));
   var step3 = STRUCT([base,threshold]);

   var base = CUBOID([3,0.2,7.7]);
   base = T([1,2])([0.60001,3.5])(base);
   var threshold = T([0,1,2])([-0.075,0.8,3.4])(base_step);
   var step4 = STRUCT([base,threshold]);


   var base = CUBOID([3,0.2,7.3]);
   base = T([1,2])([0.80001,3.9])(base);
   var threshold = T([0,1,2])([-0.075,1,3.8])(base_step);
   var step5 = STRUCT([base,threshold]);


   var base = CUBOID([3,0.2,6.9]);
   base = T([1,2])([1.0001,4.3])(base);
   var threshold = T([0,1,2])([-0.075,1.2,4.2])(base_step);
   var step6 = STRUCT([base,threshold]);


   var base = CUBOID([3,0.2,6.5]);
   base = T([1,2])([1.20001,4.7])(base);
   var threshold = T([0,1,2])([-0.075,1.4,4.6])(base_step);
   var step7 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,6.1]);
   base = T([1,2])([1.40001,5.1])(base);
   var threshold = T([0,1,2])([-0.075,1.6,5])(base_step);
   var step8 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,5.7]);
   base = T([1,2])([1.60001,5.5])(base);
   var threshold = T([0,1,2])([-0.075,1.8,5.4])(base_step);
   var step9 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,5.3]);
   base = T([1,2])([1.80001,5.9])(base);
   var threshold = T([0,1,2])([-0.075,2,5.8])(base_step);
   var step10 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,4.9]);
   base = T([1,2])([2.0001,6.3])(base);
   var threshold = T([0,1,2])([-0.075,2.2,6.2])(base_step);
   var step11 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,4.5]);
   base = T([1,2])([2.20001,6.7])(base);
   var threshold = T([0,1,2])([-0.075,2.4,6.6])(base_step);
   var step12 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,4.1]);
   base = T([1,2])([2.40001,7.1])(base);
   var threshold = T([0,1,2])([-0.075,2.6,7])(base_step);
   var step13 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,3.7]);
   base = T([1,2])([2.60001,7.5])(base);
   var threshold = T([0,1,2])([-0.075,2.8,7.4])(base_step);
   var step14 = STRUCT([base,threshold]);

     var base = CUBOID([3,0.2,3.3]);
   base = T([1,2])([2.80001,7.9])(base);
   var threshold = T([0,1,2])([-0.075,3,7.8])(base_step);
   var step15 = STRUCT([base,threshold]);

   var base = CUBOID([3,0.2,2.9]);
   base = T([1,2])([3.0001,8.3])(base);
   var threshold = T([0,1,2])([-0.075,3.2,8.2])(CUBOID([3.15,0.05,3]));
   var step16 = STRUCT([base,threshold]);

  stairs = STRUCT([step,step2,step3,step4,step5,step6,step7,step8,step9,step10,step11,step12,step13,step14,step15,step16]);

  var base = CUBOID([3,0.2,4.4]);
   base = T([1,2])([0.60001,3.5])(base);
   var threshold = T([0,1,2])([-0.075,0.8,3.4])(base_step);
   var step17 = STRUCT([base,threshold]);


   var base = CUBOID([3,0.2,4]);
   base = T([1,2])([0.80001,3.9])(base);
   var threshold = T([0,1,2])([-0.075,1,3.8])(base_step);
   var step18 = STRUCT([base,threshold]);


   var base = CUBOID([3,0.2,3.6]);
   base = T([1,2])([1.0001,4.3])(base);
   var threshold = T([0,1,2])([-0.075,1.2,4.2])(base_step);
   var step19 = STRUCT([base,threshold]);


   var base = CUBOID([3,0.2,3.2]);
   base = T([1,2])([1.20001,4.7])(base);
   var threshold = T([0,1,2])([-0.075,1.4,4.6])(base_step);
   var step20 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,2.8]); //5.9
   base = T([1,2])([1.40001,5.1])(base);
   var threshold = T([0,1,2])([-0.075,1.6,5])(base_step);
   var step21 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,2.4]); //5.5
   base = T([1,2])([1.60001,5.5])(base);
   var threshold = T([0,1,2])([-0.075,1.8,5.4])(base_step);
   var step22 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,2]);
   base = T([1,2])([1.80001,5.9])(base);
   var threshold = T([0,1,2])([-0.075,2,5.8])(base_step);
   var step23 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,1.6]);
   base = T([1,2])([2.0001,6.3])(base);
   var threshold = T([0,1,2])([-0.075,2.2,6.2])(base_step);
   var step24 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,1.2]);
   base = T([1,2])([2.20001,6.7])(base);
   var threshold = T([0,1,2])([-0.075,2.4,6.6])(base_step);
   var step25 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,0.8]);
   base = T([1,2])([2.40001,7.1])(base);
   var threshold = T([0,1,2])([-0.075,2.6,7])(base_step);
   var step26 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,0.4]);
   base = T([1,2])([2.60001,7.5])(base);
   var threshold = T([0,1,2])([-0.075,2.8,7.4])(base_step);
   var step27 = STRUCT([base,threshold]);

  var tensteps = STRUCT([step17,step18,step19,step20,step21,step22,step23,step24,step25,step26,step27]);
  tensteps= ROTATE([0,2])(-PI/2)(tensteps);
  tensteps = T([0,1,2])([3.6,2.6,8.2])(tensteps);
  var tenstepsBase = T([0,2])([-4.3,8.2])(CUBOID([4.3,3.2,3]));
  var left_stair = STRUCT([stairs, tensteps, tenstepsBase]);

  var right_stair = S([0])([-1])(left_stair);
  right_stair = T([0])([-25.7])(right_stair);
  gradino = T([0,1,2])([-13.85,-0.0000001,5])(CUBOID([2,0.25,6.3]));
  gradino_2 = T([0,1,2])([-13.85,0.2499999,5.5])(CUBOID([2,0.25,5.57]));
  gradino_3 = T([0,1,2])([-14.35,-0.0000001,32])(CUBOID([3,0.25,2.5]))
  gradino_4 = T([0,1,2])([-13.85,0.2499999,32])(CUBOID([2,0.25,2]));
  twinStairs = STRUCT([left_stair,right_stair]);

  exports.model = COLOR([250/255,235/255,215/255,1])(STRUCT([left_stair,right_stair,gradino,gradino_2,gradino_3,gradino_4]));
  }(this));


  /*
  ** Due its simmetrical nature, 
  ** here is a function which creates half - central 
  ** structure and replicates it.
  */

  !(function(exports){
  var left_central = CUBOID([1.52, 5.4, 28.95]);
  var architrave_1st_window = T([0,1])([-1.52,4.06])(CUBOID([1.52, 1.34, 28.95]));

  var base_1st_window = T([0])([-1.52])(CUBOID([1.52,2.51,28.95]));
  var middle_central = T([0])([-3.04])(CUBOID([1.52, 5.4, 28.95]));
  var architrave_2nd_window = T([0,1])([-4.56,4.06])(CUBOID([1.52, 1.34, 28.95]));//6.07
  var base_2nd_window = T([0])([-4.56])(CUBOID([1.52,2.51,28.95]));
  var right_central = T([0])([-6.08])(CUBOID([1.52, 5.4, 28.95]));
  var architrave_door= T([0,1])([-7.07,4.06])(CUBOID([0.99, 1.34, 28.95]));
  var central_sx = STRUCT([left_central,architrave_1st_window,base_1st_window,middle_central,
    architrave_2nd_window,base_2nd_window,right_central,architrave_door]);
  central_sx = T([0])([7.07])(central_sx);
  var central_dx = S([0])([-1])(central_sx);
  var central = STRUCT([central_sx,central_dx]);
  central = COLOR([250/255,235/255,215/255,1])(T([0,2])([-12.85,5.15])(central));
  exports.model = STRUCT([exports.model,central]);
  exports.model = model;
  }(this)); 

    /*
  * Drawing Villa's basement and garden
  *
  */

   !(function(exports){

    var garden = T([0,1,2])([-45,-5.99,-15])(COLOR([0,1,0,1])(CUBOID([70,6,70])));
    var p = T([0,2])([-13.85,-2.5])(CUBOID([2,0.05,8]));
    var p_back = T([2])([35])(p);
    var p1 = T([0,2])([-38,-2.5])(CUBOID([4,0.05,44]));
    var p2 = T([0,2])([10,-2.5])(CUBOID([4,0.05,44]));
    var t1 = T([0,2])([-38,-2.5])(CUBOID([50,0.05,2]))
    var t2 = T([0,2])([-38,40.5])(CUBOID([50,0.05,2]))
    
    var basement = STRUCT([garden,p,p_back,p1,p2,t1,t2]);
    exports.model = STRUCT([exports.model,basement]);
    exports.model = model;

    }(this));

  /*
  ** Draw the main-building.
  */

  !(function(exports){
  var g = 29;
  var x_z_0 = T([0,2])([-29.499999 + g,11.22])(CUBOID([2.03,20.325,1.53]));
  var z_1 = T([0,2])([-29.5000001111 + g,13.75])(CUBOID([2.03,2.955,18.38]));
  var z_2 = T([0,1,2])([-29.5000011111 + g,2.955+1.794,13.72])(CUBOID([2.03,2.48,18.38]));
  var z_3 = T([0,1,2])([-29.50000011111 + g,2.955+1.794+2.48+4.115, 13.72])(CUBOID([2.03,5.276,18.38]));
  var z_4 = T([0,1,2])([-29.5000011111 + g,2.955+1.794+2.48+4.115+5.276+3.18,13.72])(CUBOID([2.03,0.527,18.38]));

  var z_y_1 = T([0,2])([-29.49999889 + g,12.749999])(CUBOID([2.03,20.325,1]));
  var z_y_2 = T([0,2])([-29.499889898 + g,11.22+2.5+1.952])(CUBOID([2.03,20.325,5]));
  var z_y_3 = T([0,2])([-29.4989898 + g,11.22+2.5+1.952+5+1.952])(CUBOID([2.03,20.325,5]));
  var z_y_4 = T([0,2])([-29.4989898 + g,11.22+2.5+1.952+5+1.952+5+1.952])(CUBOID([2.03,20.325,2.5]));


  var x_1 = T([0,2])([-25.518 +g,11.22])(CUBOID([5.43,20.325,20.88]));
  var y_1 = T([0,2])([-27.46989898 +g,11.22])(CUBOID([1.952,2.955,20.88]));
  var y_1_2 = T([0,1,2])([-27.46989898+g,2.955+1.794,11.22])(CUBOID([1.952,2.48,20.88]));
  var y_1_3 = T([0,1,2])([-27.46989898+g,2.955+1.794+2.48+4.115,11.22])(CUBOID([1.952,5.276,20.88]));
  var y_1_4 = T([0,1,2])([-27.4699999+g,2.955+1.794+2.48+4.115+5.276+3.18,11.22])(CUBOID([1.952,0.527,20.88]));
  var y_2_2 = T([0,2])([-20.0999999+g,11.22])(CUBOID([1.952,2.955+1.794+2.48,20.87999999]));
  var y_2_3 = T([0,1,2])([-20.0999999+g,2.955+1.794+2.48+4.115,11.22])(CUBOID([1.952,5.276,20.88]));
  var y_2_4 = T([0,1,2])([-20.099998989+g,2.955+1.794+2.48+4.115+5.276+3.18,11.22])(CUBOID([1.952,0.527,20.88]));
  var x_2 = T([0,2])([-18.14799999+g,11.22])(CUBOID([2.638,20.325,20.88]));
  var y_3 = T([0,2])([-15.50999999+g,11.22])(CUBOID([2.057,5.3,20.879999998]));
  var y_3_1 = T([0,1,2])([-15.50999999+g,5.3+5.5,11.22111111])(CUBOID([2.057,9.523,20.88]));
  var main_building = STRUCT([x_z_0,x_1,y_1,y_1_2,y_1_3,y_1_4,y_2_2,y_2_3,y_2_4,x_2,y_3,y_3_1,z_1,z_2,z_3,z_4,z_y_1,z_y_2,z_y_3,z_y_4]);
  var building = S([0])([-1])(main_building);
  main_building = T([0])([-31])(main_building);
  var toppa_1 = T([0,1,2])([-20.1+g-31,2.955+1.794+2.48+4.115 +5.276,11.2188888888])(CUBOID([1.952,3.18,0.05]))
  var toppa_2 = T([0,1,2])([-10.85,2.955+1.794+2.48+4.115 +5.276,11.21888888888])(CUBOID([1.952,1.58,0.05]))


  var MAIN = COLOR([250/255,235/255,215/255,1])(T([0])([2.75])(STRUCT([main_building,building,toppa_1,toppa_2])));
  
  exports.model = STRUCT([exports.model,MAIN]);
  exports.model = model;
  }(this));


  /*
  ** Draw columnate
  */

  !(function(exports){
    var base = [];  
    var domain2 = DOMAIN([[0,1],[0,2*PI]])([10,21]);

    var r = -1.3;
    var p0 = [[5+r,0,0], [5.2+r,0,0], [5.2+r,0,0.5], [4.4+r,0,0.6]];
    var k0 = [0,0,0,1,2,2,2];
    var c0 = NUBS(S0)(2)(k0)(p0);
    var m0 = ROTATIONAL_SURFACE(c0);
    var s0 = MAP(m0)(domain2);  
    base.push(s0);

    var d1 = 0.5;
    var p1 = [[4.4+r,0,0.6],[4.7+r,0,0.6],[4.8+r,0,1],
      [4.7+r,0,1.2],[4.5+r,0,1.3],[3.3+d1+r,0,1.7],[3.25+d1+r,0,1.71],[3.25+d1+r,0,2]];
    var k1 = [0,0,0,1,2,3,4,5,6,6,6];
    var c1 = NUBS(S0)(2)(k1)(p1);
    var m1 = ROTATIONAL_SURFACE(c1);
    var s1 = MAP(m1)(domain2);  
    base.push(s1);

    var p2 = [[3.25+d1+r,0,2],[2.9+d1+r,0,2]];
    var c2 = BEZIER(S0)(p2);
    var m2 = ROTATIONAL_SURFACE(c2);
    var s2 = MAP(m2)(domain2);  
    base.push(s2);
    var column_base = STRUCT(base);

    var cyl_surface = CYL_SURFACE([2.1,40])();
    cyl_surface = T([2])([2])(cyl_surface);

    var columnsColor = [253/255,245/255,230/255];

    //Domains
    var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([30,1,1]);


    var makeKnots = function(points,grade){
      var g = grade || 2;
      var knots = [];
      knots.push(0); knots.push(0); knots.push(0);

      for (var i = 1; i < points.length-6+grade+1+1; i++) {
        knots.push(i);
      };

      knots.push(i); knots.push(i); knots.push(i);

      return knots;
    }

    var scalePoints = function(pointList, scale) {
      return pointList.map( function(pt) { 
        return [pt[0]*scale[0], 
          pt[1]*scale[1], 
          pt[2]*scale[2]]; 
      });
    };

    var rotatePoints = function(pointList, angle, axis) {
      if (axis === 0) {
        var alfa = angle;
        return pointList.map( function(pt) { 
        return [ pt[0], pt[1]*COS(alfa) + (-1)*pt[2]*SIN(alfa), pt[1]*SIN(alfa) + pt[2]*COS(alfa) ];
          });
        } else if (axis === 1) {
            var beta = angle;
            return pointList.map( function(pt) { 
            return [ pt[0]*COS(beta) + pt[2]*SIN(beta), pt[1], (-1)*pt[0]*SIN(beta) + pt[2]*COS(beta) ];
              });
          } else if (axis === 2) {
              var gamma = angle;
              return pointList.map( function(pt) { 
              return [ pt[0]*COS(gamma) + (-1)*pt[1]*SIN(gamma), pt[0]*SIN(gamma) + pt[1]*COS(gamma), pt[2] ];
                });
            }     
        return pointList;
    };

    var movesPoints = function(pointList, axis, qty) {
      if (axis === 0) {
        return pointList.map( function(pt) { 
        return [ pt[0]+qty, pt[1], pt[2] ];
          });
      } else if (axis === 1) {
          return pointList.map( function(pt) { 
          return [ pt[0], pt[1]+qty, pt[2] ];
           });
        } else if (axis === 2) {
          return pointList.map( function(pt) { 
          return [ pt[0], pt[1], pt[2]+qty ];
            });
        }
    };
    var drawCapital = function(l){
        var l = l || 0.3+0.8

        var Capital = [];

        var capitalwithtrolsPoints = function(maxRadius) {
           maxRadius = maxRadius || 1;
           var withtrolPoints = [];

           var i = 0;
           var Angle = PI/2;

           for (i = 0; i < 13; i++) {
            withtrolPoints.push( [
              maxRadius * ( COS(i*Angle) + i*SIN(i*Angle)  ),
              0,
              maxRadius * ( SIN(i*Angle) - i*COS(i*Angle)  )] );
           }

           return withtrolPoints;
        };

        var rotationAngle = 2.18/3*PI;

        //Base 1
        var p0 = capitalwithtrolsPoints(0.03);
        p0 = rotatePoints(p0,rotationAngle,1);
        var k0 = makeKnots(p0,2);
        var c0 = NUBS(S0)(2)(k0)(p0);
        var p1 = capitalwithtrolsPoints(0.035);
        p1 = rotatePoints(p1,rotationAngle,1);
        var k1 = makeKnots(p1,2);
        var c1 = NUBS(S0)(2)(k1)(p1);
        var s0 = BEZIER(S1)([c0,c1]);

        //Base 11
        var p2 = capitalwithtrolsPoints(0.03);
        p2 = rotatePoints(p2,rotationAngle,1);
        p2 = movesPoints(p2,1,1.1);
        var k2 = makeKnots(p2,2);
        var c2 = NUBS(S0)(2)(k2)(p2);
        var p3 = capitalwithtrolsPoints(0.035);
        p3 = rotatePoints(p3,rotationAngle,1);
        p3 = movesPoints(p3,1,1.1);
        var k3 = makeKnots(p3,2);
        var c3 = NUBS(S0)(2)(k3)(p3);
        var s1 = BEZIER(S1)([c2,c3]);

        var b1 = BEZIER(S2)([s0,s1]);
        var base1 = MAP(b1)(domain3);
        Capital.push(base1);

        //Base 2
        var p0 = capitalwithtrolsPoints(0.03);
        p0 = rotatePoints(p0,rotationAngle,1);
        p0 = scalePoints(p0,[-1,1,1]);
        p0 = movesPoints(p0,0,-(l));
        var k0 = makeKnots(p0,2);
        var c0 = NUBS(S0)(2)(k0)(p0);
        var p1 = capitalwithtrolsPoints(0.035);
        p1 = rotatePoints(p1,rotationAngle,1);
        p1 = scalePoints(p1,[-1,1,1]);
        p1 = movesPoints(p1,0,-(l));
        var k1 = makeKnots(p1,2);
        var c1 = NUBS(S0)(2)(k1)(p1);
        var s0 = BEZIER(S1)([c0,c1]);

        //Base 22
        var p2 = capitalwithtrolsPoints(0.03);
        p2 = rotatePoints(p2,rotationAngle,1);
        p2 = scalePoints(p2,[-1,1,1]);
        p2 = movesPoints(p2,0,-(l));
        p2 = movesPoints(p2,1,1.1);
        var k2 = makeKnots(p2,2);
        var c2 = NUBS(S0)(2)(k2)(p2);
        var p3 = capitalwithtrolsPoints(0.035);
        p3 = rotatePoints(p3,rotationAngle,1);
        p3 = scalePoints(p3,[-1,1,1]);
        p3 = movesPoints(p3,0,-(l));
        p3 = movesPoints(p3,1,1.1);
        var k3 = makeKnots(p3,2);
        var c3 = NUBS(S0)(2)(k3)(p3);
        var s1 = BEZIER(S1)([c2,c3]);

        var b2 = BEZIER(S2)([s0,s1]);
        var base2 = MAP(b2)(domain3);
        Capital.push(base2);

        //CopriCapital - 1
        var p0 = capitalwithtrolsPoints(0.03);
        p0 = rotatePoints(p0,rotationAngle,1);
        var k0 = makeKnots(p0,2);
        var c0 = NUBS(S0)(2)(k0)(p0);
        var fp = BEZIER(S0)([p0[0],p0[0]]);
        var s0 = BEZIER(S1)([c0,fp]);

        var p2 = capitalwithtrolsPoints(0.03);
        p2 = rotatePoints(p2,rotationAngle,1);
        p2 = movesPoints(p2,1,1);
        var k2 = makeKnots(p2,2);
        var c2 = NUBS(S0)(2)(k2)(p2);
        fp = BEZIER(S0)([p2[0],p2[0]]);
        var s1 = BEZIER(S1)([c2,fp]);

        var b1 = BEZIER(S2)([s0,s1]);
        var base1 = MAP(b1)(domain3);
        Capital.push(T([1])([0.05])(base1));

        //CopriCapital - 2 
        var p0 = capitalwithtrolsPoints(0.03);
        p0 = rotatePoints(p0,rotationAngle,1);
        p0 = scalePoints(p0,[-1,1,1]);
        p0 = movesPoints(p0,0,-(l));
        var k0 = makeKnots(p0,2);
        var c0 = NUBS(S0)(2)(k0)(p0);
        fp = BEZIER(S0)([p0[0],p0[0]]);
        var s0 = BEZIER(S1)([c0,fp]);


        var p2 = capitalwithtrolsPoints(0.03);
        p2 = rotatePoints(p2,rotationAngle,1);
        p2 = scalePoints(p2,[-1,1,1]);
        p2 = movesPoints(p2,0,-(l));
        p2 = movesPoints(p2,1,1);
        var k2 = makeKnots(p2,2);
        var c2 = NUBS(S0)(2)(k2)(p2);
        fp = BEZIER(S0)([p2[0],p2[0]]);
        var s1 = BEZIER(S1)([c2,fp]);

        var b2 = BEZIER(S2)([s0,s1]);
        var base2 = MAP(b2)(domain3);
        Capital.push(T([1])([0.05])(base2));


        return COLOR(columnsColor)(STRUCT([
          T([0,2])([0.25+l,+0.25])(STRUCT(Capital)),
          T([0,2])([0.3,0.465])(
          SIMPLEX_GRID([[0,0.25+l-0.3],[0,1.1],[0,0.03]])),
          T([0,1,2])([0.4,0.05,0.2])(
            SIMPLEX_GRID([[0,l-0.3],[0,1],[0,0.28]]))
          ]));

      }

    var capital = drawCapital(1.5);
    capital2 = S([0,1,2])([4,4,4])(capital);
    capital3 = T([0,1,2])([-4,-2,41])(capital2);
    var column = STRUCT([column_base,cyl_surface,capital3]);
    rotated_column =  ROTATE([1,2])(-PI/2)(column);
    scaled_column = S([0,1,2])([0.2,0.2,0.2])(rotated_column);
    scaled_column = T([0,1,2])([-5,5.4,6])(scaled_column);
    var column_2nd = T([0])([-3.04])(S([0])([1])(scaled_column));
    var column_3rd = T([0])([-6.08])(S([0])([1])(scaled_column));
    var column_4th = T([0])([-9.6])(S([0])([1])(scaled_column));
    var column_5th = T([0])([-12.64])(S([0])([1])(scaled_column));
    var column_6th = T([0])([-15.68])(S([0])([1])(scaled_column));
    var column_7th = T([2])([2.5])(S([0])([1])(scaled_column));
    var column_8th = T([2])([5])(S([0])([1])(scaled_column));
    var column_9th = T([0,2])([-15.68,2,5])(S([0])([1])(scaled_column));
    var column_10th = T([0,2])([-15.68,5])(S([0])([1])(scaled_column));


    var columnate = COLOR([250/255,235/255,215/255,1])(STRUCT([scaled_column,column_2nd,column_3rd,column_4th,column_5th,column_6th,column_7th,column_8th,column_9th,column_10th]));
    exports.model = STRUCT([exports.model,columnate]);
    exports.model = model;


  }(this));


  /*
  ** Draw the structure upon the columnate
  */
  !(function(exports){
    var base_0 = T([0,1,2])([-21.4,14.1,5.15])(CUBOID([17,0.5,1.52]));
    var base_0_A = T([0,1,2])([-5.6,14.1,5.15])(CUBOID([1.52,0.5,6]));
    var base_0_B = T([0,1,2])([-21.58,14.1,5.15])(CUBOID([1.52,0.5,6]));
    var lower_cornicione = STRUCT([base_0,base_0_A,base_0_B]);
    var base_1 = T([0,1,2])([-21.8,14.6,5])(CUBOID([18,0.05,1.67]));
    var base_1_A = T([0,1,2])([-5.55,14.6,6.67])(CUBOID([1.74,0.05,4.48]));
    var base_1_B = T([0,1,2])([-21.82,14.6,6.67])(CUBOID([1.74,0.05,4.48]));
    var soglia_cornicione = STRUCT([base_1,base_1_A,base_1_B]);
    var base_2 =   T([0,1,2])([-21.4,14.605,5.15])(CUBOID([17,0.75,1.52]));
    var base_2_A = T([0,1,2])([-5.6,14.605,5.15])(CUBOID([1.52,0.75,6]));
    var base_2_B = T([0,1,2])([-21.58,14.605,5.15])(CUBOID([1.52,0.75,6]));
     var upper_cornicione = STRUCT([base_2,base_2_A,base_2_B]);
     var cornicione = COLOR([0.803,0.409,0.323,1])(STRUCT([lower_cornicione,soglia_cornicione,upper_cornicione]));
     var domTRI33 = COLOR([250/255,235/255,215/255,1])(TRIANGLE_DOMAIN(32, [[0,3.5228,0],[-9.678,0,0],[9.678,0,0]]));
     domTRI33 = T([0,1,2])([-12.8,15.772,5.2])(domTRI33);

    k = 0.41666;
    c = 0.25;
    h = -3.75
    d = 0.15
    n = 0.2
    m = 29.85
    q  = (k + c);
    var base_triangolo = T([0,1])([-9.75,-3.5])(CUBOID([19.5,0.1,6.57]));
    var t= CUBOID([10.3,0.1,30.45]);
    var t2 = T([0])([-0.1])(ROTATE([0,1])(-PI/9)(t));
    var t3 = T([0])([0.1])(S([0])([-1])(t2));
    var t4= T([1,2])([0.1,0.1])(CUBOID([10.3,0.2,30.45]));
    var t5 = T([0])([-0.1])(ROTATE([0,1])(-PI/9)(t4));
    var t6 = T([0])([0.1])(S([0])([-1])(t5));
    var t7= T([1])([0.3])(CUBOID([10.55,0.1,30.45]));
    var t8 = T([0])([-0.1])(ROTATE([0,1])(-PI/9)(t7));
    var t9 = T([0])([0.1])(S([0])([-1])(t8));
    var square = T([1,2])([h,d])(CUBOID([0.25,0.25,0.4]));
    var square_h = T([0,1,2])([-0.1,h+3.55,d])(CUBOID([0.25,0.25,0.4]));
    var rotated_square = R([0,2])(-PI/2)(CUBOID([0.25,0.25,0.4]));
    var c1 = T([0,1,2])([q,h,d])(CUBOID([0.25,0.25,0.4]));
      var c1_h = T([0,1,2])([q,h+3.3,d])(CUBOID([0.25,0.25,0.4]));
    var c2 = T([0,1,2])([q*2,h,d])(CUBOID([0.25,0.25,0.4]));
      var c2_h = T([0,1,2])([q*2,h+3.05,d])(CUBOID([0.25,0.25,0.4]));
    var c3 = T([0,1,2])([q*3,h,d])(CUBOID([0.25,0.25,0.4]));
      var c3_h = T([0,1,2])([q*3,h+2.8,d])(CUBOID([0.25,0.25,0.4]));
    var c4 = T([0,1,2])([q*4,h,d])(CUBOID([0.25,0.25,0.4]));
      var c4_h = T([0,1,2])([q*4,h+2.55,d])(CUBOID([0.25,0.25,0.4]));
    var c5 = T([0,1,2])([q*5,h,d])(CUBOID([0.25,0.25,0.4]));
      var c5_h = T([0,1,2])([q*5,h+2.3,d])(CUBOID([0.25,0.25,0.4]));
    var c6 = T([0,1,2])([q*6,h,d])(CUBOID([0.25,0.25,0.4]));
      var c6_h = T([0,1,2])([q*6,h+2.1,d])(CUBOID([0.25,0.25,0.4]));
    var c7 = T([0,1,2])([q*7,h,d])(CUBOID([0.25,0.25,0.4]));
      var c7_h = T([0,1,2])([q*7,h+1.85,d])(CUBOID([0.25,0.25,0.4]));
    var c8 = T([0,1,2])([q*8,h,d])(CUBOID([0.25,0.25,0.4]));
      var c8_h = T([0,1,2])([q*8,h+1.6,d])(CUBOID([0.25,0.25,0.4]));
    var c9 = T([0,1,2])([q*9,h,d])(CUBOID([0.25,0.25,0.4]));
      var c9_h = T([0,1,2])([q*9,h+1.35,d])(CUBOID([0.25,0.25,0.4]));
    var c10 = T([0,1,2])([q*10,h,d])(CUBOID([0.25,0.25,0.4]));
      var c10_h = T([0,1,2])([q*10,h+1.1,d])(CUBOID([0.25,0.25,0.4]));
    var c11 = T([0,1,2])([q*11,h,d])(CUBOID([0.25,0.25,0.4]));
      var c11_h = T([0,1,2])([q*11,h+0.85,d])(CUBOID([0.25,0.25,0.4]));
    var c12 = T([0,1,2])([q*12,h,d])(CUBOID([0.25,0.25,0.4]));
      var c12_h = T([0,1,2])([q*12,h+0.6,d])(CUBOID([0.25,0.25,0.4]));
    var c13 = T([0,1,2])([q*13,h,d])(CUBOID([0.25,0.25,0.4]));
      var c13_h = T([0,1,2])([q*13,h+(n*2),d])(CUBOID([0.25,0.25,0.4]));
    var c15 = T([0,1,2])([-q*14,h,d])(CUBOID([0.25,0.25,0.4]));
    var c16 = T([0,1,2])([-q,h,d])(CUBOID([0.25,0.25,0.4]));
      var c16_h = T([0,1,2])([-q-0.1,h+3.35,d])(CUBOID([0.25,0.25,0.4]));
                var c17 = T([0,1,2])([-q*2,h,d])(CUBOID([0.25,0.25,0.4]));
                var c17_h = T([0,1,2])([-q*2,h+3.15,d])(CUBOID([0.25,0.25,0.4]));
                var c18 = T([0,1,2])([-q*3,h,d])(CUBOID([0.25,0.25,0.4]));
                var c18_h = T([0,1,2])([-q*3,h+2.9,d])(CUBOID([0.25,0.25,0.4]));
                var c19 = T([0,1,2])([-q*4,h,d])(CUBOID([0.25,0.25,0.4]));
                var c19_h = T([0,1,2])([-q*4,h+2.65,d])(CUBOID([0.25,0.25,0.4]));
                var c20 = T([0,1,2])([-q*5,h,d])(CUBOID([0.25,0.25,0.4]));
                 var c20_h = T([0,1,2])([-q*5,h+2.4,d])(CUBOID([0.25,0.25,0.4]));
                var c21 = T([0,1,2])([-q*6,h,d])(CUBOID([0.25,0.25,0.4]));
                var c21_h = T([0,1,2])([-q*6,h+2.2,d])(CUBOID([0.25,0.25,0.4]));

                var c22 = T([0,1,2])([-q*7,h,d])(CUBOID([0.25,0.25,0.4]));
                var c22_h = T([0,1,2])([-q*7,h+1.95,d])(CUBOID([0.25,0.25,0.4]));
                var c23 = T([0,1,2])([-q*8,h,d])(CUBOID([0.25,0.25,0.4]));
                var c23_h = T([0,1,2])([-q*8,h+1.7,d])(CUBOID([0.25,0.25,0.4]));
                var c24 = T([0,1,2])([-q*9,h,d])(CUBOID([0.25,0.25,0.4]));
                var c24_h = T([0,1,2])([-q*9,h+1.45,d])(CUBOID([0.25,0.25,0.4]));
                var c25 = T([0,1,2])([-q*10,h,d])(CUBOID([0.25,0.25,0.4]));
                var c25_h = T([0,1,2])([-q*10,h+1.2,d])(CUBOID([0.25,0.25,0.4]));
                var c26 = T([0,1,2])([-q*11,h,d])(CUBOID([0.25,0.25,0.4]));
                var c26_h = T([0,1,2])([-q*11,h+0.95,d])(CUBOID([0.25,0.25,0.4]));
                var c27 = T([0,1,2])([-q*12,h,d])(CUBOID([0.25,0.25,0.4]));
                var c27_h = T([0,1,2])([-q*12,h+0.7,d])(CUBOID([0.25,0.25,0.4]));
                var c28 = T([0,1,2])([-q*13,h,d])(CUBOID([0.25,0.25,0.4]))
                var c28_h = T([0,1,2])([-q*13,h+0.5,d])(CUBOID([0.25,0.25,0.4]))
                var c29 = T([0,1,2])([q*14,h,q])(rotated_square);
                var c30 = T([0,1,2])([q*14,h,q*2])(rotated_square);
                var c31 = T([0,1,2])([q*14,h,q*3])(rotated_square);
                var c32 = T([0,1,2])([q*14,h,q*4])(rotated_square);
                var c33 = T([0,1,2])([q*14,h,q*5])(rotated_square);
                var c34 = T([0,1,2])([q*14,h,q*6])(rotated_square);
                var c35 = T([0,1,2])([q*14,h,q*7])(rotated_square);
                var c36 = T([0,1,2])([q*14,h,q*8])(rotated_square);
                var c37 = T([0,1,2])([q*14,h,q*9])(rotated_square);
                var c38 = T([0,1,2])([q*14,h,q*10])(rotated_square);
                        var c39 = T([0,1,2])([-q*14,h,q])(rotated_square);
                var c40 = T([0,1,2])([-q*14,h,q*2])(rotated_square);
                var c41 = T([0,1,2])([-q*14,h,q*3])(rotated_square);
                var c42 = T([0,1,2])([-q*14,h,q*4])(rotated_square);
                var c43 = T([0,1,2])([-q*14,h,q*5])(rotated_square);
                var c44 = T([0,1,2])([-q*14,h,q*6])(rotated_square);
                var c45 = T([0,1,2])([-q*14,h,q*7])(rotated_square);
                var c46 = T([0,1,2])([-q*14,h,q*8])(rotated_square);
                var c47 = T([0,1,2])([-q*14,h,q*9])(rotated_square);
                var c48 = T([0,1,2])([-q*14,h,q*10])(rotated_square);
                //var g = T([0,1,2])([-0.125,0.125,-0.1])(CUBOID([0.25,0.25,30.7]));

                var base_triangolo_2 = T([0,1,2])([-9.75,-3.5,23.95])(CUBOID([5.75-q+0.25,0.1,6.57]));//6.57
                var base_triangolo_3 = T([0,1,2])([4,-3.5,23.95])(CUBOID([5.75,0.1,6.57]));//6.57
                var c10_d = T([0,1,2])([q*10,h,d+m])(CUBOID([0.25,0.25,0.4]));
                  var c5_d = T([0,1,2])([q*14,h,d+m])(CUBOID([0.25,0.25,0.4]));
                  var c7_d = T([0,1,2])([q*7,h,d+m])(CUBOID([0.25,0.25,0.4]));
                  var c6_d = T([0,1,2])([q*6,h,d+m])(CUBOID([0.25,0.25,0.4]));
                  var c8_d = T([0,1,2])([q*8,h,d+m])(CUBOID([0.25,0.25,0.4]));
                  var c9_d = T([0,1,2])([q*9,h,d+m])(CUBOID([0.25,0.25,0.4]));
                  var c11_d = T([0,1,2])([q*11,h,d+m])(CUBOID([0.25,0.25,0.4]));
                  var c12_d = T([0,1,2])([q*12,h,d+m])(CUBOID([0.25,0.25,0.4]));
                  var c13_d = T([0,1,2])([q*13,h,d+m])(CUBOID([0.25,0.25,0.4]));
                  var c15_d = T([0,1,2])([-q*14,h,d+m])(CUBOID([0.25,0.25,0.4]));

                     var c1_h_d = T([0,1,2])([q,h+3.3,d+m])(CUBOID([0.25,0.25,0.4]));
     var c2_h_d = T([0,1,2])([q*2,h+3.05,d+m])(CUBOID([0.25,0.25,0.4]));
       var c3_h_d = T([0,1,2])([q*3,h+2.8,d+m])(CUBOID([0.25,0.25,0.4]));
      var c4_h_d = T([0,1,2])([q*4,h+2.55,d+m])(CUBOID([0.25,0.25,0.4]));
       var c5_h_d = T([0,1,2])([q*5,h+2.3,d+m])(CUBOID([0.25,0.25,0.4]));
                
              var c6_h_d = T([0,1,2])([q*6,h+2.1,d+m])(CUBOID([0.25,0.25,0.4]));
         
         var c7_h_d = T([0,1,2])([q*7,h+1.85,d+m])(CUBOID([0.25,0.25,0.4]));
          
          var c8_h_d = T([0,1,2])([q*8,h+1.6,d+m])(CUBOID([0.25,0.25,0.4]));
           
           var c9_h_d = T([0,1,2])([q*9,h+1.35,d+m])(CUBOID([0.25,0.25,0.4]));
            
            var c10_h_d = T([0,1,2])([q*10,h+1.1,d+m])(CUBOID([0.25,0.25,0.4]));
             
             var c11_h_d = T([0,1,2])([q*11,h+0.85,d+m])(CUBOID([0.25,0.25,0.4]));
             
              var c12_h_d = T([0,1,2])([q*12,h+0.6,d+m])(CUBOID([0.25,0.25,0.4]));
              
               var c13_h_d = T([0,1,2])([q*13,h+(n*2),d+m])(CUBOID([0.25,0.25,0.4]));

               var c16_h_d = T([0,1,2])([-q-0.1,h+3.35,d+m])(CUBOID([0.25,0.25,0.4]));
               
                var c17_h_d = T([0,1,2])([-q*2,h+3.15,d+m])(CUBOID([0.25,0.25,0.4]));
               
                var c18_h_d = T([0,1,2])([-q*3,h+2.9,d+m])(CUBOID([0.25,0.25,0.4]));
               
                var c19_h_d = T([0,1,2])([-q*4,h+2.65,d+m])(CUBOID([0.25,0.25,0.4]));
                
                 var c20_h_d = T([0,1,2])([-q*5,h+2.4,d+m])(CUBOID([0.25,0.25,0.4]));
               
                var c21_h_d = T([0,1,2])([-q*6,h+2.2,d+m])(CUBOID([0.25,0.25,0.4]));


                var c22_h_d = T([0,1,2])([-q*7,h+1.95,d+m])(CUBOID([0.25,0.25,0.4]));

          
                var c23_h_d = T([0,1,2])([-q*8,h+1.7,d+m])(CUBOID([0.25,0.25,0.4]));
                
                var c24_h_d = T([0,1,2])([-q*9,h+1.45,d+m])(CUBOID([0.25,0.25,0.4]));
               
                var c25_h_d = T([0,1,2])([-q*10,h+1.2,d+m])(CUBOID([0.25,0.25,0.4]));
                
                var c26_h_d = T([0,1,2])([-q*11,h+0.95,d+m])(CUBOID([0.25,0.25,0.4]));
                
                var c27_h_d = T([0,1,2])([-q*12,h+0.7,d+m])(CUBOID([0.25,0.25,0.4]));
              
                var c28_h_d = T([0,1,2])([-q*13,h+0.5,d+m])(CUBOID([0.25,0.25,0.4]))

                var c22_d = T([0,1,2])([-q*7,h,d+m])(CUBOID([0.25,0.25,0.4]));
               
                var c23_d = T([0,1,2])([-q*8,h,d+m])(CUBOID([0.25,0.25,0.4]));
                
                var c24_d = T([0,1,2])([-q*9,h,d+m])(CUBOID([0.25,0.25,0.4]));

                var c25_d = T([0,1,2])([-q*10,h,d+m])(CUBOID([0.25,0.25,0.4]));
                
                var c26_d = T([0,1,2])([-q*11,h,d+m])(CUBOID([0.25,0.25,0.4]));
               
                var c27_d = T([0,1,2])([-q*12,h,d+m])(CUBOID([0.25,0.25,0.4]));
                
                var c28_d = T([0,1,2])([-q*13,h,d+m])(CUBOID([0.25,0.25,0.4]))
                

   //potrebbe essere sostituito tutto con    var c1 = T([0])([q])(CUBOID(square));
    var tetto = COLOR([0.803,0.409,0.323,1])(STRUCT([base_triangolo,t2,t3,t5,t6,t8,t9,square,square_h,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c15,c16,c17,c18,c19,c20,
    c21,c22,c23,c24,c25,c26,c27,c28,c29,c30,c31,c32,c33,c34,c35,c36,c37,c38,c39,c40,c41,c42,c43,c44,c45,c46,c47,c48,c27_h,c13_h,c12_h,c11_h,c10_h,
    c9_h,c28_h,c8_h,c7_h,c6_h,c5_h,c4_h,c3_h,c2_h,c1_h,c16_h,c17_h,c18_h,c19_h,c20_h,c21_h,c22_h,c23_h,c24_h,c25_h,c26_h,base_triangolo_3,
    base_triangolo_2,c10_d,c7_d,c6_d,c8_d,c9_d,c11_d,c12_d,c15_d,c13_d,c22_d,c23_d,c24_d,c25_d,c26_d,c27_d,c28_d,c5_d,c6_h_d,c7_h_d,c8_h_d,c9_h_d,
    c10_h_d,c11_h_d,c12_h_d,c13_h_d,c16_h_d,c17_h_d,c18_h_d,c19_h_d,c20_h_d,c21_h_d,c22_h_d,c23_h_d,c24_h_d,c25_h_d,c26_h_d,c27_h_d,c28_h_d,c2_h_d,c3_h_d,c4_h_d,c1_h_d,c5_h_d]));
    tetto = T([0,1,2])([-12.8,19,4.6])(tetto);
    //T([0,1,2])([-21.5,14.85,5.15])(CUBOID([17.4,0.05,6.07]))
    exports.model = STRUCT([exports.model,cornicione,tetto,domTRI33]);
    exports.model = model;
    }(this));

  /*
  ** Draw the back of the villa
  */
  !(function(exports){
  var a1 = T([0,1,2])([-5.78,5.4,32.1])(CUBOID([1.52,14.925,2]));
  var a2 = T([0,1,2])([-5.78-1.52*2,7.3,32.1])(CUBOID([1.52,12,2]));
  var a3 = T([0,1,2])([-5.78-1.52*4+0.52,7.3,32.1])(CUBOID([0.8,12,2]));
  var a4 = T([0,1,2])([-5.78-1.52*6-0.25,7.3,32.1])(CUBOID([0.8,12,2]));
  var a5 = T([0,1,2])([-5.78-1.52*8-0.5,7.3,32.1])(CUBOID([1.52,12,2]));
  var a6 = T([0,1,2])([-5.78-1.52*10-0.5,7.3,32.1])(CUBOID([1.52,12,2]));
  var a7 = T([0,1,2])([-5.78-1.52*3-0.27,15.8,32.1])(CUBOID([1.8,3.5,2]));
  var a8 = T([0,1,2])([-5.78-1.52*7-0.52,15.8,32.1])(CUBOID([1.8,3.5,2]));
  var h9 = T([0,1,2])([-5.78-1.52*6 + 0.55,17.3,32.1])(CUBOID([1.52*2-0.02,0.5,2]));
  var h10 = T([0,1,2])([-5.78-1.52*6 + 0.55,18.815,32.1])(CUBOID([1.52*2-0.02,0.485,2]));
  var h1 = T([0,1,2])([-5.78-1.52*10-0.5,19.24,32.10001111])(CUBOID([15.7,1.1,2]));
  var h2 = T([0,1,2])([-5.78-1.52*10-0.5,12.3,32.10001111])(CUBOID([15.7,1,2]));
  var h3 = T([0,1,2])([-5.78-1.52*10-0.5,11.3,32.10001111])(CUBOID([15.7,1,2]));
  var h5 = T([0,1,2])([-5.78-1.52*9-0.5,10.3,32.10111111])(CUBOID([1.58,1,2]));
  var h4 = T([0,1,2])([-5.78-1.52*10-0.5,5.3,32.10001111])(CUBOID([15.7,2,2]));
  var h6 = T([0,1,2])([-5.78-1.52,10.3,32.10111111])(CUBOID([1.58,1,2]))
  var h7 = T([0,1,2])([-5.78-1.52*9-0.5,14.7,32.10111111])(CUBOID([3.65,2.5,2]));
  var h8 = T([0,1,2])([-5.78-1.52*2-0.6,14.7,32.10111111])(CUBOID([3.65,2.6,2]));
  t4= CUBOID([3,0.2,0.1]);
  var t5 = T([0])([-0.1])(ROTATE([0,1])(-PI/9)(t4));
  var t6 = T([0])([0.1])(S([0])([-1])(t5));
  under_roof = T([0,1,2])([-12.8,18.8,34])(STRUCT([t5,t6]));

  //82.5 <=> 7.5
  q = COLOR([0, 0, 1, 0.5])(DISK(1.52*2.625)());
  c = R([0,1])([PI/24])(CUBOID([1,1.5,2]));
  c = T([0,2])([1.52*2.625,-1.6999999999])(c);
  e = R([0,1])([3*PI/24])(CUBOID([1,1.5,2]));
  e = T([0,1,2])([1.52*2.625-0.137,1.041,-1.6999999999])(e);
  f = R([0,1])([5*PI/24])(CUBOID([1,1.5,2]));
  f = T([0,1,2])([1.52*2.625-0.137-0.40,1.041+0.98,-1.6999999999])(f);
  g = R([0,1])([7*PI/24])(CUBOID([1,1.5,2]));
  g = T([0,1,2])([1.52*2.625-0.137-0.42-0.635,1.041+0.995+0.8,-1.6999999999])(g);
  h = R([0,1])([9*PI/24])(CUBOID([1,1.5,2]));
  h = T([0,1,2])([1.52*2.625-0.137-0.42-0.635-0.85,1.041+0.995+0.8+0.401+0.241,-1.6999999999])(h);
  i = R([0,1])([11*PI/24])(CUBOID([1,1.5,2]));
  i = T([0,1,2])([1.52*2.625-0.137-0.42-0.635-0.97-0.8,1.041+0.995+0.8+0.401+0.6,-1.6999999999])(i);
  c_1 = S([0])([-1])(c);
  e_1 = S([0])([-1])(e);
  f_1 = S([0])([-1])(f);
  g_1 = S([0])([-1])(g);
  h_1 = S([0])([-1])(h);
  i_1 = S([0])([-1])(i);
  specchio = COLOR([250/255,235/255,215/255,1])(STRUCT([c,e,f,g,h,i,c_1,e_1,f_1,g_1,h_1,i_1]));

  specchio = STRUCT([specchio,q]);

  q = T([0,1,2])([-5.78-1.52*5+0.4625,12.6,33.8])(specchio);
  DRAW(q);
  back = COLOR([250/255,235/255,215/255,1])(STRUCT([a1,a2,a3,a4,a5,a6,a7,a8,h1,h2,h3,h4,h5,h6,h7,h8,h9,h10,under_roof]));
    exports.model = STRUCT([exports.model,back]);
    exports.model = model;
  }(this));

  /*
  ** Draw the roof 
  */
  !(function(exports){
  var a0 = CUBOID([3,0,4]);
  var domTRI = TRIANGLE_DOMAIN(32, [[3,0,0],[0,0,0],[3,0,-5.9]]);
  var domTRI2 = TRIANGLE_DOMAIN(32, [[3,0,4],[0,0,4],[3,0,9.9]]);
  var a9 = STRUCT([a0,domTRI,domTRI2]);
  var a1 = R([0,1])([PI/8])(a9);

  var a2 = S([0])([-1])(a1);
  //a2 = T([0])([-3])(a2);
  /*var a8 = CUBOID([3,0,6]);
  var domTRI3 = TRIANGLE_DOMAIN(32, [[0,0,6],[0,0,0],[-2.8,0,0]]);
  var domTRI4 = TRIANGLE_DOMAIN(32, [[3,0,6],[3,0,0],[5.8,0,0]]);
  var a7 = STRUCT([a8,domTRI3,domTRI4]);*/
  var a7 = TRIANGLE_DOMAIN(32, [[2.9,0,-5.9],[0,0,0],[-2.9,0,-5.9]]);
  var a3 = R([1,2])([PI/15.35])(a7);

  //var upper_roof = T([0])([-3])(CUBOID([3,0,4]));

  /*var domTRI5 = TRIANGLE_DOMAIN(32, [[0,0,6],[0,0,0],[-2.8,0,0]]);
  var domTRI6 = TRIANGLE_DOMAIN(32, [[3,0,6],[3,0,0],[5.8,0,0]]);
  var a6 = STRUCT([a8,domTRI5,domTRI6]);*/
  var a6 = TRIANGLE_DOMAIN(32, [[2.9,0,9.9],[0,0,4],[-2.9,0,9.9]]);
  var a4 = R([1,2])([-PI/15.95])(a6); //35

  a3 = T([1])([0.005])(a3);
  a4 = T([1])([-0.825])(a4); //825
  var tetto = STRUCT([a1,a2,a3,a4]);
  tetto = R([0,1])(PI)(tetto);
  tetto = R([0,2])(PI/2)(tetto);
  tetto = S([0,1,2])([2.2,5,4.45])(tetto);
  tetto = T([0,1,2])([-17,26.15,21.8])(tetto);
  tetto = COLOR([0.803,0.409,0.323,1])(tetto);

  var bordo_cubo =  T([0,1,2])([-30.1,20.15,9])(CUBOID([35,0.4,25.65]));
  bordo_cubo = COLOR([0.803,0.409,0.323,1])(bordo_cubo);
  var bordo_cubo_2 =  T([0,1,2])([-29.85,20.05,9.25])(CUBOID([34.5,0.15,25.25]));
  bordo_cubo_2 = COLOR([0.803,0.409,0.323,1])(bordo_cubo_2);

  var base_triangolo = T([0,1])([-9.55,-3.5])(COLOR([0.803,0.409,0.323,1])(CUBOID([19.1,0.1,20])));//6.57
  var base_triangolo_2 = T([0,1,2])([-9.55,-3.7,0.1])(COLOR([0.803,0.409,0.323,1])(CUBOID([19.1,0.2,19.8])));//6.57
  var base_triangolo_3 = T([0,1])([-9.55,-3.8])(COLOR([0.803,0.409,0.323,1])(CUBOID([19.1,0.1,20])));//6.57
  var base_triangolo_4a = CUBOID([2.697,4.5,19.9]);//6.57
  var base_triangolo_4b = T([0,1])([2.697,4.2])(CUBOID([2.71,0.3,19.9]));//6.57
  var base_triangolo_4c = T([0])([2.697+2.71])(CUBOID([2.158,4.5,19.9]));//6.57
  var base_triangolo_4d = T([0,1])([2.697+2.7+2.158,4.2])(CUBOID([1.888,0.3,19.9]));//6.57
  var base_triangolo_5 = T([0,1,2])([-9.55,-8.4,0.1])(CUBOID([19,0.9,19.9]));//6.57
  var mezzopiano_sx = STRUCT([base_triangolo_4a,base_triangolo_4b,base_triangolo_4c,base_triangolo_4d]);
  var mezzopiano_dx = T([0])([2*(2.697+2.7+2.158+1.888)])(S([0])([-1])(mezzopiano_sx));
  var base_triangolo_4 = COLOR([250/255,235/255,215/255,1])(STRUCT([mezzopiano_sx,mezzopiano_dx]));
  //var base_triangolo_4 = T([0,1,2])([-9.55,-8.3,0.1])(CUBOID([19.1,4.5,19.9]));//6.57
  base_triangolo_4 = T([0,1,2])([-9.55,-8.3,0.1])(base_triangolo_4);//6.57
    var t= CUBOID([10.3,0.1,20]);
    var t2 = COLOR([0.803,0.409,0.323,1])(T([0])([-0.1])(ROTATE([0,1])(-PI/9)(t)));
    var t3 = COLOR([0.803,0.409,0.323,1])(T([0])([0.1])(S([0])([-1])(t2)));
      var t4= T([1,2])([0.1,0.1])(CUBOID([10.3,0.2,19.8]));
    var t5 = COLOR([0.803,0.409,0.323,1])(T([0])([-0.1])(ROTATE([0,1])(-PI/9)(t4)));
    var t6 = COLOR([0.803,0.409,0.323,1])(T([0])([0.1])(S([0])([-1])(t5)));
      var t7= T([1])([0.3])(CUBOID([10.55,0.1,20]));
    var t8 = COLOR([0.803,0.409,0.323,1])(T([0])([-0.1])(ROTATE([0,1])(-PI/9)(t7)));
    var t9 = COLOR([0.803,0.409,0.323,1])(T([0])([0.1])(S([0])([-1])(t8)));
    var domTRI34 = COLOR([250/255,235/255,215/255,1])(TRIANGLE_DOMAIN(32, [[0,3.5228,0],[-9.678,0,0],[9.678,0,0]]));
    domTRI34 = T([1,2])([-3.5228,0.4])(domTRI34);
    domTRI35 = T([2])([19.2])(domTRI34);

    var triangle = STRUCT([base_triangolo,base_triangolo_2,base_triangolo_3,base_triangolo_4,t2,t3,t5,t6,t8,t9,domTRI34,domTRI35,base_triangolo_5]);
    triangle = S([0,1])([0.4,0.6])(triangle);
    triangle = T([0,1,2])([-13,26.1,11.7])(triangle);
   exports.model = STRUCT([exports.model,tetto,triangle,bordo_cubo,bordo_cubo_2]);
    exports.model = model;
  }(this));

  /*
  ** Draw the windows, the door and the pillar upon the roof
  */
  !(function(exports){
  /*Drawing front_back_windows*/
  window_1 = T([0,1,2])([-10.33,2.51,5.3])(CUBOID([1.52,1.55,0.1]));
  window_2 = T([0,1,2])([-10.33+1.52+1.52,2.51,5.3])(CUBOID([1.52,1.55,0.1]));
  window_3 = T([0,1,2])([-10.33-1.52*4-0.48,2.51,5.3])(CUBOID([1.52,1.55,0.1]));
  window_4 = T([0,1,2])([-10.33-1.52*6-0.48,2.51,5.3])(CUBOID([1.52,1.55,0.1]));
  window_1_back = T([0,1,2])([-10.33,2.51,33.75])(CUBOID([1.52,1.55,0.1]));
  window_2_back = T([0,1,2])([-10.33+1.52+1.52,2.51,33.75])(CUBOID([1.52,1.55,0.1]));
  window_3_back = T([0,1,2])([-10.33-1.52*4-0.48,2.51,33.75])(CUBOID([1.52,1.55,0.1]));
  window_4_back = T([0,1,2])([-10.33-1.52*6-0.48,2.51,33.75])(CUBOID([1.52,1.55,0.1]));
  window_5_back = T([0,1,2])([-0.75,3,31.55])(CUBOID([2,1.8,0.1]));
  window_6_back = T([0,1,2])([-0.75,7.1,31.55])(CUBOID([2,4.55,0.1]));
  window_33_back = T([0,1,2])([-7.7,7.1,33.85])(CUBOID([2,3.55,0.1]));
  window_34_back = T([0,1,2])([-20,7.1,33.85])(CUBOID([2,3.55,0.1]));
  window_35_back = T([0,1,2])([-7.7,13.2,33.85])(CUBOID([2,1.5,0.1]));
  window_36_back = T([0,1,2])([-7.7,17.2,33.85])(CUBOID([2,3,0.1]));
  window_37_back = T([0,1,2])([-20,13.2,33.85])(CUBOID([2,1.5,0.1]));
  window_38_back = T([0,1,2])([-20,17.2,33.85])(CUBOID([2,3,0.1]));


  window_30_back = T([0,1,2])([-10.75,7.1,33.85])(CUBOID([2,4.55,0.1]));
  window_31_back = T([0,1,2])([-17,7.1,33.85])(CUBOID([2,4.55,0.1]));
  window_32_back = T([0,1,2])([-14.4,7.1,33.85])(CUBOID([3.1,4.55,0.1]));
  window_7_back = T([0,1,2])([-0.75,16.4,31.55])(CUBOID([2,3.55,0.1]));
  window_8_back = T([0,1,2])([-27,3,31.55])(CUBOID([2,1.8,0.1]));
  window_9_back = T([0,1,2])([-27,7.1,31.55])(CUBOID([2,4.55,0.1]));
  window_10_back = T([0,1,2])([-27,16.4,31.55])(CUBOID([2,3.55,0.1]));
  window_5 = T([0,1,2])([-0.75,3,11.52])(CUBOID([2,1.8,0.1]));
  window_6 = T([0,1,2])([-0.75,7.1,11.52])(CUBOID([2,4.55,0.1]));
  window_7 = T([0,1,2])([-0.75,16.4,11.52])(CUBOID([2,3.55,0.1]));
  window_8 = T([0,1,2])([-27,3,11.52])(CUBOID([2,1.8,0.1]));
  window_9 = T([0,1,2])([-27,7.1,11.52])(CUBOID([2,4.55,0.1]));
  window_10 = T([0,1,2])([-27,16.4,11.52])(CUBOID([2,3.55,0.1]));
  window_20 = T([0,1,2])([-8.03,7.1,11.52])(CUBOID([2,4.55,0.1]));
  window_21 = T([0,1,2])([-8.03,16.4,11.52])(CUBOID([2,3.55,0.1]));
  window_30 = T([0,1,2])([-14.03,21,12.05])(CUBOID([1.8,2.55,0.1]));
  window_31 = T([0,1,2])([-16.03,21,12.05])(CUBOID([1.5,2.55,0.1]));
  window_32 = T([0,1,2])([-11.5,21,12.05])(CUBOID([1.5,2.55,0.1]));
  window_40_back = T([0,1,2])([-14.03,21,31.35])(CUBOID([1.8,2.55,0.1]));
  window_41_back = T([0,1,2])([-16.03,21,31.35])(CUBOID([1.5,2.55,0.1]));
  window_42_back = T([0,1,2])([-11.5,21,31.35])(CUBOID([1.5,2.55,0.1]));
  window_22 = T([0,1,2])([-19.5,7.1,11.52])(CUBOID([2,4.55,0.1]));

  /*villa's doors*/
  window_23 = T([0,1,2])([-14.83,5.1,11.52])(CUBOID([4,8,0.1]));
  window_24 = T([0,1,2])([-13.85,0.02,6.45])(CUBOID([2,4.1,0.1]));
  window_50 = T([0,1,2])([-13.85,0.5,33])(CUBOID([2,5,0.05]));
  sbarra_30 = COLOR([0,0,0,1])(T([0,1,2])([-12.9,0.5,6.22])(CUBOID([0.03,4,0.03])));
  sbarra_30_back = T([2])([27])(sbarra_30);
  var r = 0.1;
  var divs = 16;
  var circle = T([0,1,2])([-13.2,2,6.12])(CIRCLE(r)(divs))
  var circle_2 = T([0,1,2])([-12.55,2,6.12])(CIRCLE(r)(divs));
  var circle_back = T([0,1,2])([-13.2,2,33.12])(CIRCLE(r)(divs));
  //var circle_2_back = T([0,1,2])([-12.55,2,33.12])(CIRCLE(r)(divs));
  DRAW(circle);
  DRAW(circle_2);
  DRAW(circle_back);




  /*Drawing windows on main_building sides*/
  window_11 = T([0,1,2])([-28.5,3,13.82])(CUBOID([0.1,1.8,2]));
  window_12 = T([0,1,2])([-28.5,7.1,13.82])(CUBOID([0.1,4.55,2]));
  window_13 = T([0,1,2])([-28.5,16.4,13.82])(CUBOID([0.1,3.55,2]));
  window_14 = T([0,1,2])([-28.5,3,20.72])(CUBOID([0.1,1.8,2]));
  window_15 = T([0,1,2])([-28.5,7.1,20.72])(CUBOID([0.1,4.55,2]));
  window_16 = T([0,1,2])([-28.5,16.4,20.72])(CUBOID([0.1,3.55,2]));
  window_17 = T([0,1,2])([-28.5,3,27.62])(CUBOID([0.1,1.8,2]));
  window_18 = T([0,1,2])([-28.5,7.1,27.62])(CUBOID([0.1,4.55,2]));
  window_19 = T([0,1,2])([-28.5,16.4,27.62])(CUBOID([0.1,3.55,2]));
  window_11_back = T([0,1,2])([2.7,3,13.82])(CUBOID([0.1,1.8,2]));
  window_12_back = T([0,1,2])([2.7,7.1,13.82])(CUBOID([0.1,4.55,2]));
  window_13_back = T([0,1,2])([2.7,16.4,13.82])(CUBOID([0.1,3.55,2]));
  window_14_back = T([0,1,2])([2.7,3,20.72])(CUBOID([0.1,1.8,2]));
  window_15_back = T([0,1,2])([2.7,7.1,20.72])(CUBOID([0.1,4.55,2]));
  window_16_back = T([0,1,2])([2.7,16.4,20.72])(CUBOID([0.1,3.55,2]));
  window_17_back = T([0,1,2])([2.7,3,27.62])(CUBOID([0.1,1.8,2]));
  window_18_back = T([0,1,2])([2.7,7.1,27.62])(CUBOID([0.1,4.55,2]));
  window_19_back = T([0,1,2])([2.7,16.4,27.62])(CUBOID([0.1,3.55,2]));
  //([0.184,0.309,0.184])

  /*finestra sopra specchio circolare*/


   var domTRI99 = TRIANGLE_DOMAIN(32, [[-3,0,0.1],[1.5,1.5,0.1],[6,0,0.1]]);
   finestra =  T([0,1,2])([-14.35,17.8,33.8])(domTRI99);

  /* Inferriate */

  lower_inferriata_window_1 = T([0,1,2])([-10.33,2.51,5.25])(CUBOID([1.52,0.15,0.05]));
  upper_inferriata_window_1 = T([0,1,2])([-10.33,3.91,5.25])(CUBOID([1.52,0.15,0.05]));
  left_inferriata_window_1 = T([0,1,2])([-8.95,2.51,5.25])(CUBOID([0.15,1.55,0.05]));
  right_inferriata_window_1 = T([0,1,2])([-10.35,2.51,5.25])(CUBOID([0.15,1.55,0.05]));
  middle_inferriata_window_1 = T([0,1,2])([-9.65,2.66,5.25])(CUBOID([0.15,1.4,0.05]));
  line_1 = T([0,1,2])([-8.95-0.15,2.66,5.3])(CUBOID([0.01,1.4,0.00001]));
  line_2 = T([0,1,2])([-8.95-0.15-0.244,2.66,5.3])(CUBOID([0.01,1.4,0.00001]));
  line_3 = T([0,1,2])([-8.95-0.15-0.244*3,2.66,5.3])(CUBOID([0.01,1.4,0.00001]));
  line_4 = T([0,1,2])([-8.95-0.15-0.244*4,2.66,5.3])(CUBOID([0.01,1.4,0.00001]));
  line_5 = T([0,1,2])([-10.2-0.15,2.66+0.15,5.3])(CUBOID([1.4,0.01,0.00001]));
  line_6 = T([0,1,2])([-10.2-0.15,2.66+0.15+0.31,5.3])(CUBOID([1.4,0.01,0.00001]));
  line_7 = T([0,1,2])([-10.2-0.15,2.66+0.15+0.31*2,5.3])(CUBOID([1.4,0.01,0.00001]));
  line_8 = T([0,1,2])([-10.2-0.15,2.66+0.15+0.31*3,5.3])(CUBOID([1.4,0.01,0.00001]));

  inferriata_1 = STRUCT([lower_inferriata_window_1,upper_inferriata_window_1,right_inferriata_window_1,left_inferriata_window_1,middle_inferriata_window_1,
  line_1,line_2,line_3,line_4,line_5,line_6,line_7,line_8]);

  inferriata_2 = T([0])([1.52*2])(inferriata_1);
  inferriata_3 = T([0])([-1.52*6-0.48])(inferriata_1);
  inferriata_4 = T([0])([-1.52*4-0.48])(inferriata_1);

  inferriata_1_back = T([2])([28.6])(inferriata_1);
  inferriata_2_back = T([2])([28.6])(inferriata_2);
  inferriata_3_back = T([2])([28.6])(inferriata_3);
  inferriata_4_back = T([2])([28.6])(inferriata_4);

  /*Secondo tipo di inferriata: finestre più lunghe*/

  lower_inferriata_window_2 = T([0,1,2])([-0.75,7.2,11.49])(CUBOID([2,0.15,0.05]));
  upper_inferriata_window_2 = T([0,1,2])([-0.75,11.2,11.49])(CUBOID([2,0.15,0.05]));
  left_inferriata_window_2 = T([0,1,2])([-0.75,7.35,11.49])(CUBOID([0.15,4.05,0.05]));
  right_inferriata_window_2 = T([0,1,2])([1.1,7.35,11.49])(CUBOID([0.15,4.05,0.05]));
  middle_inferriata_window_2 = T([0,1,2])([0.175,7.35,11.49])(CUBOID([0.15,4.05,0.05]));
  middle_h_inferriata_window_2 = T([0,1,2])([-0.75,9.25,11.49])(CUBOID([2,0.15,0.05]));
  line_2_1 = T([0,1,2])([-0.75,7.2+0.405,11.49])(CUBOID([2,0.01,0.00001]));
  line_2_2 = T([0,1,2])([-0.75,7.2+0.405*2,11.49])(CUBOID([2,0.01,0.00001]));
  line_2_3 = T([0,1,2])([-0.75,7.2+0.405*3,11.49])(CUBOID([2,0.01,0.00001]));
  line_2_4 = T([0,1,2])([-0.75,7.2+0.405*4,11.49])(CUBOID([2,0.01,0.00001]));
  line_2_8 = T([0,1,2])([-0.75,7.2+0.405*8,11.49])(CUBOID([2,0.01,0.00001]));
  line_2_6 = T([0,1,2])([-0.75,7.2+0.405*6,11.49])(CUBOID([2,0.01,0.00001]));
  line_2_7 = T([0,1,2])([-0.75,7.2+0.405*7,11.49])(CUBOID([2,0.01,0.00001]));
  line_2_9 = T([0,1,2])([-0.75,7.2+0.405*9,11.49])(CUBOID([2,0.01,0.00001]));
  line_2_10 = T([0,1,2])([-0.75+0.15+0.34,7.35,11.49])(CUBOID([0.01,4.05,0.00001]));
  line_2_11 = T([0,1,2])([-0.75+0.15+0.34*2,7.35,11.49])(CUBOID([0.01,4.05,0.00001]));
  line_2_12 = T([0,1,2])([-0.75+0.15+0.34*3,7.35,11.49])(CUBOID([0.01,4.05,0.00001]));
  line_2_13 = T([0,1,2])([-0.75+0.15+0.34*4,7.35,11.49])(CUBOID([0.01,4.05,0.00001]));

  inferriata_5 = STRUCT([lower_inferriata_window_2,upper_inferriata_window_2,left_inferriata_window_2,right_inferriata_window_2,middle_inferriata_window_2,middle_h_inferriata_window_2,
    line_2_1,line_2_2,line_2_3,line_2_4,line_2_6,line_2_7,line_2_8,line_2_9,line_2_10,line_2_11,line_2_12,line_2_13]);

  inferriata_5_back = T([2])([20.2])(inferriata_5)

  inferriata_97 = T([2])([2.3])(inferriata_5_back);
  inferriata97 = S([0,1])([0.8,0.75])(inferriata_97);
  inferriata97 = T([0,1])([-6.75,1.85])(inferriata97);

  inferriata96 = T([0])([-12.65])(inferriata97);
  inferriata95 = T([1])([4.45])(inferriata96)
  inferriata94 = T([1])([4.45])(inferriata97)

  inferriata93 = S([1])([0.65])(inferriata94);
  inferriata93 = T([1])([9.66])(inferriata93);

  inferriata92 = S([1])([0.65])(inferriata95);
  inferriata92 = T([1])([9.6])(inferriata92);


  inferriata_5a = STRUCT([lower_inferriata_window_2,upper_inferriata_window_2,left_inferriata_window_2,right_inferriata_window_2,middle_inferriata_window_2,
    line_2_1,line_2_2,line_2_3,line_2_4,line_2_6,line_2_7,line_2_8,line_2_9,line_2_10,line_2_11,line_2_12,line_2_13]);

  inferriata_8a = T([0])([-26])(inferriata_5a);


  inferriata_6 = T([0])([-7.4])(inferriata_5);

  inferriata_13 = S([1])([0.4])(inferriata_6);
  inferriata13 = T([0,1])([0.05,15.25])(inferriata_13)

  inferriata_7 = T([0])([-18.6])(inferriata_5);
  inferriata_8 = T([0])([-26])(inferriata_5);
  inferriata_8_back = T([2])([20.2])(inferriata_8);
  inferriata_9 = S([1])([0.8])(inferriata_5a);
  inferriata9 = T([1])([10.8])(inferriata_9);
  inferriata11 = T([2])([20.2])(inferriata9);
  inferriata_10 = S([1])([0.8])(inferriata_8a);
  inferriata10 = T([1])([10.8])(inferriata_10);
  inferriata12 = T([2])([20.2])(inferriata10);

  inferriata99 = T([1])([-4.65])(inferriata_5);
  inferriata99_back = T([2])([20.2])(inferriata99);
  inferriata98 = T([0])([-26])(inferriata99);
  inferriata98_back = T([2])([20.2])(inferriata98);

  /*inferriate on main_building sides*/

  lower = T([0,1,2])([-28.51,3,13.73])(CUBOID([0.0001,0.15,2]));
  upper = T([0,1,2])([-28.51,3+0.15+1.5,13.73])(CUBOID([0.0001,0.15,2]));
  left = T([0,1,2])([-28.51,3+0.15,13.68])(CUBOID([0.0001,1.5,0.15]));
  right = T([0,1,2])([-28.51,3+0.15,13.73+0.15+1.7])(CUBOID([0.0001,1.5,0.15]));
  middle = T([0,1,2])([-28.51,3+0.15,13.73+0.15+0.8])(CUBOID([0.0001,1.5,0.15]));
  line_3_1 = T([0,1,2])([-28.51,3+0.15+0.3,13.73])(CUBOID([0.0001,0.01,2]));
  line_3_2 = T([0,1,2])([-28.51,3+0.15+0.3*2,13.73])(CUBOID([0.0001,0.01,2]));
  line_3_3 = T([0,1,2])([-28.51,3+0.15+0.3*3,13.73])(CUBOID([0.0001,0.01,2]));
  line_3_4 = T([0,1,2])([-28.51,3+0.15+0.3*4,13.73])(CUBOID([0.0001,0.01,2]));
  line_3_5 = T([0,1,2])([-28.51,3+0.15,13.73+0.15+0.34])(CUBOID([0.0001,1.5,0.01]));
  line_3_6 = T([0,1,2])([-28.51,3+0.15,13.73+0.15+0.34*2])(CUBOID([0.0001,1.5,0.01]));
  line_3_7 = T([0,1,2])([-28.51,3+0.15,13.73+0.15+0.34*3])(CUBOID([0.0001,1.5,0.01]));
  line_3_8 = T([0,1,2])([-28.51,3+0.15,13.73+0.15+0.34*4])(CUBOID([0.0001,1.5,0.01]));

  inferriata_side = STRUCT([lower,upper,right,left,middle,line_3_2,line_3_1,line_3_3,line_3_4,line_3_5,line_3_6,line_3_7,line_3_8]);
  inferriata_side_2 = T([2])([6.95])(inferriata_side);
  inferriata_side_3 = T([2])([6.95*2])(inferriata_side);

  inferriata_side_back = T([0])([31.4])(inferriata_side);
  inferriata_side_2_back = T([0])([31.4])(inferriata_side_2);
  inferriata_side_3_back = T([0])([31.4])(inferriata_side_3);

  lower_2 = T([0,1,2])([-28.51,7.2,13.73])(CUBOID([0.0001,0.15,2]));
  upper_2 = T([0,1,2])([-28.51,7.2+0.15+3.9,13.73])(CUBOID([0.0001,0.15,2]));
  left_2 = T([0,1,2])([-28.51,7.2+0.15,13.68])(CUBOID([0.0001,3.9,0.15]));
  right_2 = T([0,1,2])([-28.51,7.2+0.15,13.73+0.15+1.7])(CUBOID([0.0001,3.9,0.15]));
  middle_2 = T([0,1,2])([-28.51,7.2+0.15,13.73+0.15+0.8])(CUBOID([0.0001,3.9,0.15]));
  middle_2_1 = T([0,1,2])([-28.51,7.2+0.15+1.95,13.73])(CUBOID([0.0001,0.15,2]));
  line_4_1 = T([0,1,2])([-28.51,7.2+0.15+0.45,13.73])(CUBOID([0.0001,0.01,2]));
  line_4_2 = T([0,1,2])([-28.51,7.2+0.15+0.45*2,13.73])(CUBOID([0.0001,0.01,2]));
  line_4_3 = T([0,1,2])([-28.51,7.2+0.15+0.45*3,13.73])(CUBOID([0.0001,0.01,2]));
  line_4_4 = T([0,1,2])([-28.51,7.2+0.15+0.45*4,13.73])(CUBOID([0.0001,0.01,2]));
  line_4_9 = T([0,1,2])([-28.51,7.2+0.15+0.45*5,13.73])(CUBOID([0.0001,0.01,2]));
  line_4_10 = T([0,1,2])([-28.51,7.2+0.15+0.45*6,13.73])(CUBOID([0.0001,0.01,2]));
  line_4_11 = T([0,1,2])([-28.51,7.2+0.15+0.45*7,13.73])(CUBOID([0.0001,0.01,2]));
  line_4_12 = T([0,1,2])([-28.51,7.2+0.15+0.45*8,13.73])(CUBOID([0.0001,0.01,2]));
  line_4_5 = T([0,1,2])([-28.51,7.2+0.15,13.73+0.15+0.34])(CUBOID([0.0001,3.9,0.01]));
  line_4_6 = T([0,1,2])([-28.51,7.2+0.15,13.73+0.15+0.34*2])(CUBOID([0.0001,3.9,0.01]));
  line_4_7 = T([0,1,2])([-28.51,7.2+0.15,13.73+0.15+0.34*3])(CUBOID([0.0001,3.9,0.01]));
  line_4_8 = T([0,1,2])([-28.51,7.2+0.15,13.73+0.15+0.34*4])(CUBOID([0.0001,3.9,0.01]));

  inferriata_side_type_2 = STRUCT([lower_2,upper_2,right_2,left_2,middle_2,middle_2_1,line_4_1,line_4_3,line_4_4,line_4_5,line_4_6,line_4_2,line_4_7,
    line_4_8,line_4_10,line_4_11,line_4_12]);

  inferriata_side_type_3 = STRUCT([lower_2,upper_2,right_2,left_2,middle_2,line_4_1,line_4_3,line_4_4,line_4_5,line_4_6,line_4_2,line_4_7,
    line_4_8,line_4_10,line_4_11,line_4_12]);

  inferriata_side_type_2_2 = T([2])([6.95])(inferriata_side_type_2);
  inferriata_side_type_2_3 = T([2])([6.95*2])(inferriata_side_type_2);

  inferriata_side_back_type2 = T([0])([31.4])(inferriata_side_type_2);
  inferriata_side_2_back_type2 = T([0])([31.4])(inferriata_side_type_2_2);
  inferriata_side_3_back_type2 = T([0])([31.4])(inferriata_side_type_2_3);


  inferriata_side_4 = S([1])([0.75])(inferriata_side_type_3);
  inferriata4 = T([1])([11.2])(inferriata_side_4);

  inferriata_side_5 = S([1])([0.75])(inferriata_side_type_3);
  inferriata5 = T([1,2])([11.2,6.95])(inferriata_side_5);

  inferriata_side_6 = S([1])([0.75])(inferriata_side_type_3);
  inferriata6 = T([1,2])([11.2,6.95*2])(inferriata_side_6);

  inferriata_side_4_back_type2 = T([0])([31.4])(inferriata4);
  inferriata_side_5_back_type2 = T([0])([31.4])(inferriata5);
  inferriata_side_6_back_type2 = T([0])([31.4])(inferriata6);

  //window_30 = T([0,1,2])([-14.03,21,11.05])(CUBOID([1.8,2.55,0.1]));

  lower_3 = T([0,1,2])([-14.03,21.4,12])(CUBOID([1.8,0.15,0.0001]));
  upper_3 = T([0,1,2])([-14.03,21.4+0.15+1.8,12])(CUBOID([1.8,0.15,0.0001]));
  left_3 = T([0,1,2])([-13.8,21.4+0.15,12])(CUBOID([0.15,2.35,0.0001]));
  right_3 = T([0,1,2])([-14.03+0.1+1.5,21.4,12])(CUBOID([0.15,2.35,0.0001]));
  middle_3 = T([0,1,2])([-13.85+0.83-0.075,21.4+0.15,12])(CUBOID([0.15,2.35,0.0001]));

  line_5_1 = T([0,1,2])([-13.8+0.32,21.4,12])(CUBOID([0.01,2.35,0.0001]));
  line_5_2 = T([0,1,2])([-13.8+0.32*2,21.4,12])(CUBOID([0.01,2.35,0.0001]));
  line_5_3 = T([0,1,2])([-13.8+0.32*3,21.4,12])(CUBOID([0.01,2.35,0.0001]));
  line_5_4 = T([0,1,2])([-13.8+0.32*4,21.4,12])(CUBOID([0.01,2.35,0.0001]));
  line_5_9 = T([0,1,2])([-14.03,21.4+0.36,12])(CUBOID([1.8,0.01,0.0001]));
  line_5_10 = T([0,1,2])([-14.03,21.4+0.36*2,12])(CUBOID([1.8,0.01,0.0001]));
  line_5_11 = T([0,1,2])([-14.03,21.4+0.36*3,12])(CUBOID([1.8,0.01,0.0001]));
  line_5_12 = T([0,1,2])([-14.03,21.4+0.36*4,12])(CUBOID([1.8,0.01,0.0001]));

  var x = 2.35
  up_inferriata = STRUCT([lower_3,upper_3,left_3,right_3,middle_3,line_5_1,line_5_3,line_5_4,line_5_2,line_5_9,line_5_10,line_5_11,line_5_12]);
  up_inferriata = T([1])([0.2])(up_inferriata);
  up_inferriata_left = T([0])([2.1])(up_inferriata);
  left_3a = T([0,1,2])([-13.8+x,21.4+0.15,12])(CUBOID([0.15,2.35,0.0001]));
  right_3a = T([0,1,2])([-13.8+x+0.95,21.4+0.15,12])(CUBOID([0.15,2.35,0.0001]));
  up_inferriata_left = STRUCT([up_inferriata_left,left_3a,right_3a]);
  up_inferriata_right =  T([0])([-4.3])(up_inferriata_left);

  up_inferriata_back = T([2])([19.5])(up_inferriata);
  up_inferriata_left_back = T([2])([19.5])(up_inferriata_left);
  up_inferriata_right_back = T([2])([19.5])(up_inferriata_right);

  /*Inferriata su specchio*/

  middle_x_center = T([0,1,2])([-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.15,3.5,0.05]));
  line_x_1a = T([0,1,2])([0.3-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.01,3.5,0.05]));
  line_x_2a= T([0,1,2])([0.3*2-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.01,3.5,0.05]));
  line_x_3a = T([0,1,2])([0.3*3-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.01,3.5,0.05]));
  line_x_4a = T([0,1,2])([0.3*4-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.01,3.5,0.05]));
  line_x_5a = T([0,1,2])([0.3*5-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.01,3.5,0.05]));
  line_x_9a = T([0,1,2])([0.3*9-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.01,3.5,0.05]));
  line_x_11a = T([0,1,2])([0.3*11-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.01,3.5,0.05]));
  line_x_12a = T([0,1,2])([0.3*12-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.01,3.5,0.05]));

  line_x_1b = T([0,1,2])([-0.3-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.01,3.5,0.05]));
  line_x_2b = T([0,1,2])([-0.3*2-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.01,3.5,0.05]));
  line_x_3b = T([0,1,2])([-0.3*3-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.01,3.5,0.05]));
  line_x_4b = T([0,1,2])([-0.3*4-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.01,3.5,0.05]));
  line_x_5b = T([0,1,2])([-0.3*5-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.01,3.5,0.05]));
  line_x_9b = T([0,1,2])([-0.3*9-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.01,3.5,0.05]));
  line_x_11b = T([0,1,2])([-0.3*11-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.01,3.5,0.05]));
  line_x_12b = T([0,1,2])([-0.3*12-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.01,3.5,0.05]));

  line_y_1 = T([0,1,2])([-3.2 -5.78-1.52*6+0.4625,13.3 +0.3,33.8])(CUBOID([10,0.01,0.05]));
  line_y_2 = T([0,1,2])([-3.2 -5.78-1.52*6+0.4625,13.3 +0.3*2,33.8])(CUBOID([10,0.01,0.05]));
  line_y_3 = T([0,1,2])([-3.2 -5.78-1.52*6+0.4625,13.3 +0.3*3,33.8])(CUBOID([10,0.01,0.05]));
  line_y_4 = T([0,1,2])([-3.2 -5.78-1.52*6+0.4625,13.3 +0.3*4,33.8])(CUBOID([10,0.01,0.05]));
  line_y_5 = T([0,1,2])([-3.2 -5.78-1.52*6+0.4625,13.3 +0.3*5,33.8])(CUBOID([10,0.01,0.05]));
  line_y_6 = T([0,1,2])([-3.2 -5.78-1.52*6+0.4625,13.3 +0.3*6,33.8])(CUBOID([10,0.01,0.05]));
  line_y_7 = T([0,1,2])([-3.2 -5.78-1.52*6+0.4625,13.3 +0.3*7,33.8])(CUBOID([10,0.01,0.05]));
  line_y_8 = T([0,1,2])([-3.2 -5.78-1.52*6+0.4625,13.3 +0.3*8,33.8])(CUBOID([10,0.01,0.05]));
  line_y_9 = T([0,1,2])([-3.2 -5.78-1.52*6+0.4625,13.3 +0.3*9,33.8])(CUBOID([10,0.01,0.05]));
  line_y_10 = T([0,1,2])([-3.2 -5.78-1.52*6+0.4625,13.3 +0.3*10,33.8])(CUBOID([10,0.01,0.05]));

  middle_x_left = T([0,1,2])([-3.1 -5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.15,3.5,0.05]));
  middle_x_right = T([0,1,2])([2.95 -5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.15,3.5,0.05]));
  middle_y = T([0,1,2])([-3.2 -5.78-1.52*5+0.4625,15.15,33.8])(CUBOID([8,0.15,0.05]));

  inferriata_specchio = STRUCT([middle_x_center,middle_x_left,middle_x_right,middle_y,line_x_1a,line_x_2a,line_x_3a,line_x_4a,
    line_x_5a,line_x_9a,line_x_11a,line_x_12a,line_x_1b,line_x_2b,line_x_3b,line_x_4b,
    line_x_5b,line_x_9b,line_x_11b,line_x_12b,line_y_1,line_y_2,line_y_3,line_y_4,line_y_5,line_y_6,line_y_7,line_y_8,line_y_9,
    line_y_10]);

  windows = COLOR([0, 0, 1, 0.5])(STRUCT([window_1,window_2,window_3,window_4,window_1_back,window_2_back,window_3_back,window_4_back,
    window_5,window_7,window_8,window_6,window_5_back,window_6_back,window_7_back,window_8,window_8_back,window_9_back,window_9,
    window_10,window_10_back,window_11,window_12,window_13,window_14,window_15,window_16,window_17,window_18,window_19,window_11_back,window_12_back,window_13_back,
    window_14_back,window_15_back,window_16_back,window_17_back,window_18_back,window_19_back,window_20,window_21,window_22,window_33_back,window_34_back,
    window_35_back,window_36_back,window_37_back,window_38_back,window_30,window_31,window_32,window_40_back,window_41_back,window_42_back,finestra
    ]));


  closed_windows = COLOR([0.545, 0.211, 0.149, 1])(STRUCT([window_30_back,window_31_back,window_32_back]));

  doors = COLOR([0.309,0.309,0.184,1])(STRUCT([window_23,window_24,window_50]));

  inferriate = COLOR([222/255,184/255,135/255,1])(STRUCT([inferriata_1,inferriata_2,inferriata_3,inferriata_4,inferriata_5,inferriata_7,inferriata_8,
    inferriata_6,inferriata9,inferriata10,inferriata_1_back,inferriata_2_back,inferriata_3_back,inferriata_4_back,inferriata_5_back,inferriata_8_back,
    inferriata_side,inferriata_side_2,inferriata_side_3,inferriata_side_back,inferriata_side_2_back,inferriata_side_3_back,inferriata_side_type_2,
    inferriata_side_type_2_2,inferriata_side_type_2_3,inferriata_side_back_type2,inferriata_side_2_back_type2,inferriata_side_3_back_type2,inferriata4,
    inferriata5,inferriata6,inferriata_side_4_back_type2,inferriata_side_5_back_type2,inferriata_side_6_back_type2,inferriata11,inferriata12,inferriata13,
    up_inferriata,up_inferriata_left,up_inferriata_right,up_inferriata_back,up_inferriata_left_back,up_inferriata_right_back,inferriata99,inferriata99_back,
    inferriata98_back,inferriata98,inferriata96,inferriata97,inferriata95,inferriata94,inferriata93,inferriata92,inferriata_specchio]));


  exports.model = STRUCT([exports.model,windows,doors,closed_windows,inferriate,sbarra_30,sbarra_30_back]);
    exports.model = model;

    }(this));

  /*
  *
  * Draw external walls
  *
  */

  !(function(exports){
    var first_wall = T([0,2])([-12,4.85])(CUBOID([8, 1, 0.3]));
    var second_wall = T([0,1,2])([-12,1,4.9])(CUBOID([8, 0.6, 0.25]));
     var third_wall = T([0,1,2])([-12,1.6,4.95])(CUBOID([8, 0.1, 0.2]));
      var fourth_wall = T([0,1,2])([-12,1.7,5])(CUBOID([8, 0.1, 0.15]));
       
      var cornice = STRUCT([first_wall,second_wall,third_wall,fourth_wall]);
      var cornice_1 = T([0])([-9.65])(cornice);


      cornice_ruotata28 = S([0,1])([1.75,0.6])(cornice);
      cornice_ruotata_28 = T([0,1,2])([10.35,6,6])(cornice_ruotata28);

      cornice_ruotata29 = S([0,1])([1.75,0.6])(cornice_1);
      cornice_ruotata_29 = T([0,1,2])([9.05,6,6])(cornice_ruotata29);



      cornice_ruotata_30 = T([0,2])([6.95,3])(cornice);


      cornice_ruotata_31 = T([0,2])([-7,3])(cornice_1);



      var cornice_ruotata = R([0,2])(PI/2)(cornice)
      cornice_ruotata_2 = T([0,2])([-26.6,1])(cornice_ruotata);
      cornice_ruotata_6 = T([0,2])([-26.6,22.2])(cornice_ruotata);
      cornice_ruotata = R([0,2])(-PI/2)(cornice)
      cornice_ruotata_3 = T([0,2])([0.95,17])(cornice_ruotata);
      cornice_ruotata_7 = T([0,2])([0.95,38.2])(cornice_ruotata);
      cornice_ruotata = R([0,2])(PI)(cornice)
      cornice_ruotata_4 = T([0,2])([-25.7,39.25])(cornice_ruotata);
      cornice_ruotata_5 = T([0])([9.85])(cornice_ruotata_4);
      cornice_ruotata_8 = T([0,2])([7.25,-2])(cornice_ruotata_5);
      cornice_ruotata_9 = T([0,2])([-7.15,-2])(cornice_ruotata_4);

      cornice_ruotata_10 = T([0,2])([-7.3,-2])(cornice_ruotata_6);
      cornice_ruotata_11 = T([0,2])([7.4,-2])(cornice_ruotata_7);

      cornice_ruotata_12 = T([2])([-13])(cornice_ruotata_10);
      cornice_ruotata_14 = T([2])([-7])(cornice_ruotata_10); // sfarfalla qua
      cornice_ruotata_13 = T([2])([-13])(cornice_ruotata_11);
      cornice_ruotata_15 = T([2])([-7])(cornice_ruotata_11); // sfarfalla qua
      
      /*bordo di mezzo*/

      cornice_ruotata16 = S([0,1])([1.1,0.6])(cornice_ruotata_4);
      cornice_ruotata_16 = T([0,1])([2.25,6])(cornice_ruotata16);

      cornice_ruotata17 = S([0,1])([1.1,0.6])(cornice_ruotata_5);
      cornice_ruotata_17 = T([0,1])([0.15,6])(cornice_ruotata17);

      cornice_ruotata18 = S([1])([0.6])(cornice_ruotata_6);
      cornice_ruotata_18 = T([1])([6])(cornice_ruotata18);

      cornice_ruotata19 = S([1])([0.6])(cornice_ruotata_7);
      cornice_ruotata_19 = T([1])([6])(cornice_ruotata19);

      cornice_ruotata20 = S([1])([0.6])(cornice_ruotata_8);
      cornice_ruotata_20 = T([1])([6])(cornice_ruotata20);

      cornice_ruotata21 = S([1])([0.6])(cornice_ruotata_9);
      cornice_ruotata_21 = T([1])([6])(cornice_ruotata21);


      cornice_ruotata22 = S([1])([0.6])(cornice_ruotata_10);
      cornice_ruotata_22 = T([1])([6])(cornice_ruotata22);


      cornice_ruotata23 = S([1])([0.6])(cornice_ruotata_11);
      cornice_ruotata_23 = T([1])([6])(cornice_ruotata23);

      cornice_ruotata24 = S([1])([0.6])(cornice_ruotata_12);
      cornice_ruotata_24 = T([1])([6])(cornice_ruotata24);

      cornice_ruotata25 = S([1])([0.6])(cornice_ruotata_13);
      cornice_ruotata_25 = T([1])([6])(cornice_ruotata25);


      cornice_ruotata26 = S([1])([0.6])(cornice_ruotata_14);
      cornice_ruotata_26 = T([1])([6])(cornice_ruotata26);


      cornice_ruotata27 = S([1])([0.6])(cornice_ruotata_15);
      cornice_ruotata_27 = T([1])([6])(cornice_ruotata27);

  // da modifcare cornice 4 e 5 rendendolo leggermente più piccoli sull'asse x.

  /*Muro esterno più alto*/

  var fifth_wall = T([0,1,2])([-5.7,14.1,11])(CUBOID([9, 0.5, 0.1]));
  var sixth_wall = T([0,1,2])([-28.9,14.1,11])(CUBOID([7.4, 0.5, 0.1]));

  var seventh_wall = T([0,1,2])([-5.7,15,11])(CUBOID([9, 0.8, 0.1]));
  var eigth_wall = T([0,1,2])([-28.9,15,11])(CUBOID([7.4, 0.8, 0.1]));

  var tenth_wall = T([0,1,2])([3.2,15,11])(CUBOID([0.1, 0.8, 21.15]));
  var eleventh_wall = T([0,1,2])([-28.9,15,11])(CUBOID([0.1, 0.8, 21.15]));

  var twelve_wall = T([0,1,2])([3.2,14.1,11])(CUBOID([0.1, 0.5, 21.15]));
  var thirteen_wall = T([0,1,2])([-28.9,14.1,11])(CUBOID([0.1, 0.5, 21.15]));


  var fifth_wall_back = T([0,1,2])([-5.7,14.1,32.1])(CUBOID([9, 0.5, 0.1]));
  var sixth_wall_back = T([0,1,2])([-28.9,14.1,32.1])(CUBOID([7.4, 0.5, 0.1]));

  var seventh_wall_back = T([0,1,2])([-5.7,15,32.1])(CUBOID([9, 0.8, 0.1]));
  var eigth_wall_back = T([0,1,2])([-28.9,15,32.1])(CUBOID([7.4, 0.8, 0.1]));

  var tenth_wall_back_a = T([0,1,2])([-4.3,15,11])(CUBOID([0.1, 0.8, 23.1]));
  var tenth_wall_back_b = T([0,1,2])([-21.55,15,11])(CUBOID([0.1, 0.8, 23.1]));

  var eleventh_wall_back_a = T([0,1,2])([-4.3,14.1,11])(CUBOID([0.1, 0.5, 23.1]));
  var eleventh_wall_back_b = T([0,1,2])([-21.55,14.1,11])(CUBOID([0.1, 0.5, 23.1]));

  var twelwe_wall_back_a = T([0,1,2])([-9,15,34.1])(CUBOID([4.8, 0.8, 0.1]));
  var twelwe_wall_back_b = T([0,1,2])([-21.55,15,34.1])(CUBOID([4.8, 0.8, 0.1]));

  var thirteen_wall_back_a = T([0,1,2])([-5.8,14.1,34.1])(CUBOID([1.6, 0.5, 0.1]));
  var thirteen_wall_back_b = T([0,1,2])([-21.55,14.1,34.1])(CUBOID([1.6, 0.5, 0.1]));

  /* ante */


  linea_anta_1 = T([1,2])([0.45,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_1_back = T([1,2])([0.45,0.11])(CUBOID([0.95,0.05,0.00001]));

  linea_anta_2 = T([1,2])([0.45*2,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_2_back = T([1,2])([0.45*2,0.11])(CUBOID([0.95,0.05,0.00001]));

  linea_anta_3 = T([1,2])([0.45*3,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_3_back = T([1,2])([0.45*3,0.11])(CUBOID([0.95,0.05,0.00001]));

  linea_anta_4 = T([1,2])([0.45*4,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_4_back = T([1,2])([0.45*4,0.11])(CUBOID([0.95,0.05,0.00001]));

  linea_anta_5 = T([1,2])([0.45*5,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_5_back = T([1,2])([0.45*5,0.11])(CUBOID([0.95,0.05,0.00001]));


  linea_anta_6 = T([1,2])([0.45*6,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_6_back = T([1,2])([0.45*6,0.11])(CUBOID([0.95,0.05,0.00001]));


  linea_anta_7 = T([1,2])([0.45*7,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_7_back = T([1,2])([0.45*7,0.11])(CUBOID([0.95,0.05,0.00001]));


  linea_anta_8 = T([1,2])([0.45*8,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_8_back = T([1,2])([0.45*8,0.11])(CUBOID([0.95,0.05,0.00001]));

  linea_anta_9 = T([1,2])([0.45*9,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_9_back = T([1,2])([0.45*9,0.11])(CUBOID([0.95,0.05,0.00001]));

  var linee = COLOR([0,0,0,1])(STRUCT([linea_anta_1,linea_anta_2,linea_anta_3,linea_anta_4,linea_anta_5,linea_anta_6,linea_anta_7,linea_anta_8,linea_anta_9,
    linea_anta_1_back,linea_anta_2_back,linea_anta_3_back,linea_anta_4_back,linea_anta_5_back,linea_anta_6_back,linea_anta_7_back,linea_anta_8_back,
    linea_anta_9_back]));

  var lineesx = R([0,2])(PI/4)(linee);
  var lineedx = R([0,2])(3*PI/4)(linee);

  var anta_base = COLOR([0.545, 0.211, 0.149, 1])(CUBOID([1,4.55,0.1]));




  anta_aperta_dx= R([0,2])(3*PI/4)(anta_base);
  anta_aperta_dx= S([1])([0.9])(anta_aperta_dx);
  anta_aperta_sx= R([0,2])(PI/4)(anta_base);
  anta_aperta_sx= S([1])([0.9])(anta_aperta_sx);


  var antadx = STRUCT([anta_aperta_dx,lineedx]);
  var antasx = STRUCT([anta_aperta_sx,lineesx]);
  var anta_piatta = STRUCT([anta_base,linee]);
  anta_piatta = S([1])([0.9])(anta_piatta);


  var anta_dx_window_6 = T([0,1,2])([-0.75,7.25,11.32])(anta_piatta);
  var anta_sx_window_6 = T([0,1,2])([1.19,7.25,11.33])(antasx);
  var anta_dx_window_99 = T([0,1,2])([-8.1,7.25,11.33])(antadx);
  var anta_sx_window_99 = T([0,1,2])([-6.2,7.25,11.33])(antasx);

  var anta_dx_window_8 = T([0,1,2])([-20.3,7.25,11.15])(anta_piatta);
  var anta_sx_window_8 = T([0,1,2])([-17.4,7.25,11.15])(anta_piatta);

  var anta_dx_window_9 = T([0,1,2])([-26.7,7.25,11.33])(antadx);
  var anta_sx_window_9 = T([0,1,2])([-24.9,7.25,11.33])(antasx);

  /* Ante Posteriore */
  var anta_dx_window_10 = T([0,1,2])([-1.75,7.25,32.25])(anta_piatta);
  var anta_sx_window_10 = T([0,1,2])([1.22,7.25,32.25])(anta_piatta);

  var anta_dx_window_11 = T([0,1,2])([-27.75,7.25,32.25])(anta_piatta);
  var anta_sx_window_11 = T([0,1,2])([-24.8,7.25,32.25])(anta_piatta);

  /*Anta su lati laterali*/

  var antadx_lato = R([0,2])(PI/2)(antadx);
  var antasx_lato = R([0,2])(PI/2)(antasx);
  var anta_piatta_lato = R([0,2])(PI/2)(anta_piatta);

  var anta_dx_window_12 = T([0,1,2])([-28.75,7.25,21.7])(anta_piatta_lato);
  var anta_sx_window_12 = T([0,1,2])([-28.75,7.25,22.7])(anta_piatta_lato);

  var anta_dx_window_13 = T([0,1,2])([-28.75,7.25,15.7])(antadx_lato);
  var anta_sx_window_13 = T([0,1,2])([-28.75,7.25,13.7])(antasx_lato);

  var anta_dx_window_14 = T([0,1,2])([-28.9,7.25,29.6])(antadx_lato);
  var anta_sx_window_14 = T([0,1,2])([-28.75,7.25,28.6])(anta_piatta_lato);

  var anta_dx_window_16 = T([0,1,2])([3.2,7.25,16.7])(anta_piatta_lato);
  var anta_sx_window_16 = T([0,1,2])([3.2,7.25,13.7])(anta_piatta_lato);

  var anta_dx_window_17 = T([0,1,2])([3.2,7.25,28.55])(anta_piatta_lato);
  var anta_sx_window_17 = T([0,1,2])([3.2,7.25,29.55])(anta_piatta_lato);

  var anta_dx_window_18 = T([0,1,2])([3.83,7.25,20.1])(antadx_lato);
  var anta_sx_window_18 = T([0,1,2])([3.78,7.25,23.3])(antasx_lato);

  /* Sbarre alle finestre inferiori*/

  sbarra_1 = T([0,1,2])([-10.33,2.51+(1.52/5),5.18])(CUBOID([1.52,0.03,0.03]));
  sbarra_2 = T([0,1,2])([-10.33,2.51+(1.52/5)*2,5.18])(CUBOID([1.52,0.03,0.03]));
  sbarra_3 = T([0,1,2])([-10.33,2.51+(1.52/5)*3,5.18])(CUBOID([1.52,0.03,0.03]));
  sbarra_4 = T([0,1,2])([-10.33,2.51+(1.52/5)*4,5.18])(CUBOID([1.52,0.03,0.03]));
  sbarra_5 = T([0,1,2])([-10.33+(1.52/5),2.51,5.18])(CUBOID([0.03,1.6,0.03]));
  sbarra_6 = T([0,1,2])([-10.33+(1.52/5)*2,2.51,5.18])(CUBOID([0.03,1.6,0.03]));
  sbarra_7 = T([0,1,2])([-10.33+(1.52/5)*3,2.51,5.18])(CUBOID([0.03,1.6,0.03]));
  sbarra_8 = T([0,1,2])([-10.33+(1.52/5)*4,2.51,5.18])(CUBOID([0.03,1.6,0.03]));

  var sbarre = COLOR(1,1,1,1)(STRUCT([sbarra_1,sbarra_2,sbarra_3,sbarra_4,sbarra_5,sbarra_6,sbarra_7,sbarra_8]));
  var sbarre_back = T([2])([28.85])(sbarre);
  var sbarre1 = T([0])([3])(sbarre);
  var sbarre1_back = T([2])([28.85])(sbarre1);
  var sbarre2 = T([0])([-6.55])(sbarre);
  var sbarre2_back = T([2])([28.85])(sbarre2);
  var sbarre3 = T([0])([-9.6])(sbarre);
  var sbarre3_back = T([2])([28.85])(sbarre3);

  var iron_bars = STRUCT([sbarre,sbarre1,sbarre2,sbarre3,sbarre_back,sbarre1_back,sbarre2_back,sbarre3_back]);


  /*Scalanature finestre chiuse sotto finestra circolare*/

  var distance = 0.4;

  linea_anta_18_back = T([0,1,2])([-18,7.6,34])(CUBOID([10,0.05,0.00001]));
  linea_anta_19_back = T([0,1,2])([-18,7.6+distance,34])(CUBOID([10,0.05,0.00001]));
  linea_anta_20_back = T([0,1,2])([-18,7.6+distance*2,34])(CUBOID([10,0.05,0.00001]));
  linea_anta_21_back = T([0,1,2])([-18,7.6+distance*3,34])(CUBOID([10,0.05,0.00001]));
  linea_anta_22_back = T([0,1,2])([-18,7.6+distance*4,34])(CUBOID([10,0.05,0.00001]));
  linea_anta_23_back = T([0,1,2])([-18,7.6+distance*5,34])(CUBOID([10,0.05,0.00001]));
  linea_anta_24_back = T([0,1,2])([-18,7.6+distance*6,34])(CUBOID([10,0.05,0.00001]));
  linea_anta_25_back = T([0,1,2])([-18,7.6+distance*7,34])(CUBOID([10,0.05,0.00001]));
  linea_anta_26_back = T([0,1,2])([-18,7.6+distance*8,34])(CUBOID([10,0.05,0.00001]));

  var back_lines = COLOR(1,1,1,1)(STRUCT([linea_anta_18_back,linea_anta_19_back,linea_anta_20_back,linea_anta_21_back,linea_anta_22_back,
    linea_anta_23_back,linea_anta_24_back,linea_anta_25_back,linea_anta_26_back]));

  var muro_anteriore = COLOR([210/255,180/255,140/255])(STRUCT([cornice,cornice_1,cornice_ruotata_2,cornice_ruotata_3,cornice_ruotata_4,cornice_ruotata_5,cornice_ruotata_6,
        cornice_ruotata_7,cornice_ruotata_8,cornice_ruotata_9, cornice_ruotata_10,cornice_ruotata_11,cornice_ruotata_12,cornice_ruotata_13,
        cornice_ruotata_14,cornice_ruotata_15,cornice_ruotata_16,cornice_ruotata_17,cornice_ruotata_18,cornice_ruotata_19,cornice_ruotata_20,
        cornice_ruotata_21,cornice_ruotata_22,cornice_ruotata_23,cornice_ruotata_24,cornice_ruotata_25,cornice_ruotata_26,cornice_ruotata_27,
        cornice_ruotata_28,cornice_ruotata_29,cornice_ruotata_30,cornice_ruotata_31,fifth_wall,sixth_wall,seventh_wall,eigth_wall,tenth_wall,eleventh_wall,
        twelve_wall,thirteen_wall,fifth_wall_back,sixth_wall_back,seventh_wall_back,eigth_wall_back,tenth_wall_back_a,tenth_wall_back_b,eleventh_wall_back_a,
        eleventh_wall_back_b,twelwe_wall_back_a,twelwe_wall_back_b,thirteen_wall_back_a,thirteen_wall_back_b]));

  var ante = STRUCT([anta_sx_window_6,anta_dx_window_6,anta_sx_window_99,anta_dx_window_99,anta_dx_window_8,anta_sx_window_8,anta_dx_window_9,anta_sx_window_9,
    anta_dx_window_10,anta_sx_window_10,anta_sx_window_11,anta_dx_window_11,anta_dx_window_12,anta_sx_window_12,anta_sx_window_13,anta_dx_window_13,anta_dx_window_14,
    anta_sx_window_14,anta_dx_window_16,anta_sx_window_16,anta_dx_window_17,anta_sx_window_17,anta_sx_window_18,anta_dx_window_18]);
    exports.model = STRUCT([exports.model,muro_anteriore,ante,back_lines,iron_bars]);
    exports.model = model;

    }(this));

  /*
  * Drawing upper-window
  * banisters.
  */


  !(function(exports){
  var sphereSurface = function (r) {  
      var domain = DOMAIN([[0,PI], [0,2*PI]])([r*25,r*25*2]);
      var mapping = function (p) {
      var u = p[0];
      var v = p[1];

      return [r * SIN(u) * COS(v), r * SIN(u) * SIN(v), r * COS(u)];
      };

      return MAP(mapping)(domain);
    };

    var ruotaPunti = function(pointList, angolo, asse) {
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

    var basicControlPoints = [];
    // Pre Base I
    basicControlPoints.push([[0,0.1,0],[2,0.1,0],[0,0,0],[0,0,0]]);
    // Pre Base II
    basicControlPoints.push([[2,0.1,0],[2.5,0,0],[0,-0.3,0],[1.7,0,0]]);
    // Base
    basicControlPoints.push([[2.5,0,0],[1.3,1,0],[0,3.8,0],[1,0,0]]);
    // Rigonfiamento sopra base I
    basicControlPoints.push([[1.3,1,0],[1.8,1.5,0],[1,0,0],[0,0.75,0]]);
    // Rigonfiamento sopra base II
    basicControlPoints.push([[1.8,1.5,0],[1.3,2,0],[0,0.75,0],[-1,0,0]]);
    // Salita su primo anello I
    basicControlPoints.push([[1.3,2,0],[0.9,2.3,0],[-1,0,0],[0,0.1,0]]);
    // Salita su primo anello II
    basicControlPoints.push([[0.9,2.3,0],[1.1,2.5,0],[0,0.1,0],[0.7,0,0]]);
    // primo anello
    basicControlPoints.push([[1.1,2.5,0],[1.1,2.6,0],[0.15,-0.05,0],[-0.15,-0.05,0]]);
    // Salita lunga I
    basicControlPoints.push([[1.1,2.6,0],[0.5,4,0],[-2,1,0],[0,0.5,0]]);
    // Salita lunga II
    basicControlPoints.push([[0.5,4,0],[1.5,5.4,0],[0,3,0],[1,0,0]]);

    var HER0 = CUBIC_HERMITE(S0); // drawHermiteS0Curve;
    // Marrone pastello 152,118,84
    var COLMP = COLOR([152/255,118/255,84/255]);
    // Risoluzione di rotazione
    var resRot = 8;

    // muoviamo punti asse X
    var puntiAsseXZ = basicControlPoints.map(function(ptlist) {return ruotaPunti(ptlist,PI/2,0);});
    AA(HER0)(puntiAsseXZ);

    // Dominio
    // var domainSurface = DOMAIN([[0,1],[0,2*PI],[0,1]])([resRot,resRot,1]);
    var domainSurface = DOMAIN([[0,1],[0,2*PI]])([resRot,resRot]);

    // Generate hermits rotational surfaces
    var generatedHermitFunctions = AA(HER0)(puntiAsseXZ);
    var generatedRotationalSurfaces = AA(ROTATIONAL_SURFACE)(generatedHermitFunctions);
    var generatedSurfaces = CONS( AA(MAP)(generatedRotationalSurfaces) )(domainSurface);


    var structSuperfici = STRUCT(generatedSurfaces);
    var structSuperfici = R([1,2])(-PI/2)(structSuperfici);
    var structSuperfici_2 = T([1])([5.45])(structSuperfici);
    var structSuperfici_3 = T([1])([-5.45])(structSuperfici);

    var structStot = STRUCT([structSuperfici,structSuperfici_2,structSuperfici_3]);
    structStot = S([0,1,2])([0.075,0.075,0.075])(structStot);
    var TstructStot_1 = T([0])([0.5])(structStot);
    var TstructStot_2 = T([0])([1])(structStot);
    var TstructStot_3 = T([0])([1.5])(structStot);
    var cornicione_ringhiera = T([0,1,2])([-0.25,0.40875*2,-0.2])(CUBOID([2.05,0.1,0.2]));

    var ringhiera_finestra = COLOR([1,1,1,1])(STRUCT([structStot,TstructStot_1,TstructStot_2,TstructStot_3,cornicione_ringhiera]));

    var T_ringhiera_finestra = T([0,1,2])([-26.5,17,11.3])(ringhiera_finestra);
    var T_ringhiera_finestra_2 = T([0,1,2])([-0.55,17,11.3])(ringhiera_finestra);
    var T_ringhiera_finestra_3 = T([0,1,2])([-26.5,17,32])(ringhiera_finestra);
    var T_ringhiera_finestra_4 = T([0,1,2])([-0.55,17,32])(ringhiera_finestra);

    /*Disegno le ringhiere sulle altre facciate della villa*/

    var ringhiera_finestra_ruotata = R([0,2])(PI/2)(ringhiera_finestra);

    var R_ringhiera_finestra = T([0,1,2])([-28.6,17,22.4])(ringhiera_finestra_ruotata);
    var R_ringhiera_finestra_2 = T([2])([7])(R_ringhiera_finestra);
    var R_ringhiera_finestra_3 = T([2])([-7])(R_ringhiera_finestra);

    var R_ringhiera_finestra_back = T([0])([31.8])(R_ringhiera_finestra);
    var R_ringhiera_finestra_2_back = T([0])([31.8])(R_ringhiera_finestra_2);
    var R_ringhiera_finestra_3_back = T([0])([31.8])(R_ringhiera_finestra_3);

    exports.model = STRUCT([exports.model,T_ringhiera_finestra,T_ringhiera_finestra_2,T_ringhiera_finestra_3,T_ringhiera_finestra_4,R_ringhiera_finestra,
      R_ringhiera_finestra_3,R_ringhiera_finestra_2,R_ringhiera_finestra_back,R_ringhiera_finestra_2_back,R_ringhiera_finestra_3_back]);
    exports.model = model;

    }(this));


  /*
  * Disegno colonne sopra al tetto
  *
  */
  !(function(exports){
  var domain = DOMAIN([[0,1],[0,2*PI]])([40,40]);
  var detailedDomain = DOMAIN([[0,1],[0,2*PI]])([50,50]);
    ctrlPoints = [[0.55,0,0],[0.55,0,1],[0.55,0,3]];
    profile = BEZIER(S0)(ctrlPoints);
    mapping = ROTATIONAL_SURFACE(profile);
    var part01 = MAP(mapping)(domain);
    ctrlPoints = [[0.55,0,3],[0.55,0,3.125],[0.55,0,3.125],[0.45,0,3.2],[0.3,0,3.2],[0.675,0,3.2],[0.5,0,3.35]];
  profile = BEZIER(S0)(ctrlPoints);
  mapping = ROTATIONAL_SURFACE(profile);
  var part02 = MAP(mapping)(domain);
  ctrlPoints = [[0.5,0,3.35],[0.8,0,3.85],[0.5,0,4.25],[0.08,0,4.25],[0.02,0,4.6],[0.08,0,4.8]]; 
  profile = BEZIER(S0)(ctrlPoints);
  mapping = ROTATIONAL_SURFACE(profile);
  var part03 = MAP(mapping)(detailedDomain);

    var sphereSurface = function (r, n) {  
      var domain = DOMAIN([[0,PI], [0,2*PI]])([n,n*2]);
      var mapping = function (p) {
        var u = p[0];
        var v = p[1];
        return [
          r * SIN(u) * COS(v),
          r * SIN(u) * SIN(v),
          r * COS(u)
        ];
      };
      return MAP(mapping)(domain);
    };

    var sphereTop = T([2])([4.9])(sphereSurface(0.2,10));

    var base = T([0,1,2])([-0.6,-0.6,-2])(CUBOID([1.2,1.2,2]));

    var colonna_tetto = STRUCT([part01,part02,part03,sphereTop,base]);
    var colonna_tetto= R([1,2])(-PI/2)(colonna_tetto);

    var ct = T([0,1,2])([-3,23,12])(colonna_tetto);
    var ct2 = T([0])([-19.5])(ct);
    var ct_back = T([2])([19])(ct);
    var ct2_back = T([2])([19])(ct2);

    /*Disegno comignoli*/


    var c_tetto = T([0,1,2])([-0.1,4.3,-0.1])(CUBOID([1.2,0.1,1.2]));
    var comi_1 = CUBOID([0.1,4.3,1]);
    var comi_2 = T([0])([0.9])(comi_1);
    var comi_3 = CUBOID([1,4,0.1]);
    var comi_4 = T([2])([0.9])(comi_3);

    var comignolo = STRUCT([c_tetto,comi_1,comi_2,comi_3,comi_4]);

    var comignoloA = T([0,1,2])([-5,20,15])(comignolo);
    var comignoloB = T([0])([-16])(comignoloA);
    var comignoloC = T([2])([12.5])(comignoloA);
    var comignoloD = T([2])([12.5])(comignoloB);
    
    var colonne_tetto = COLOR([1,1,1,1])(STRUCT([ct,ct2,ct_back,ct2_back,comignoloA,comignoloC,comignoloD,comignoloB]));
    exports.model = STRUCT([exports.model,colonne_tetto]);
    exports.model = model;

    }(this));



  DRAW(model);