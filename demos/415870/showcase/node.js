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
    ///////////////////////////////////////////
        function trasla (points,dx,dy,dz){
          return points.map
              (function(item){
                return [item[0]+dx,item[1]+dy,item[2]+dz];
              });
        }

        function scala (points, d){
          return points.map
            (function(item){
              return [item[0]*d, item[1]*d, item[2]*d];
            });
        }

        var getSemiSfera = function (r,n,color) {
            var domain = DOMAIN([[0,PI],[0,2*PI]])([n,2*n]);
            var mapping = function(p) {
                var u = p[0]//+ (PI/16);
                var v = p[1];
                return [r*COS(u)*COS(v),r*COS(u)*SIN(v),r*SIN(u)];
            }
            var cupola = MAP(mapping)(domain);
            return COLOR(color)(cupola);
        }

        var getSfera = function (r,n,color) {
            var domain = DOMAIN([[0,2*PI],[0,2*PI]])([n,2*n]);
            var mapping = function(p) {
                var u = p[0]//+ (PI/16);
                var v = p[1];
                return [r*COS(u)*COS(v),r*COS(u)*SIN(v),r*SIN(u)];
            }
            var sfera = MAP(mapping)(domain);
            return COLOR(color)(sfera);
        }

        potato = [205.0/255, 102.0/255, 29.0/255];
        pink = [1, 110.0/255, 180.0/255];
        brown = [92.0/255, 64.0/255, 51.0/255];
        orange = [1, 55.0/255, 0];
        black = [0,0,0];
        azzurro = [51.0/255, 153.0/255, 204.0/255];

        //===================================   CORPO DI MR POTATO   =====================================================================
        var domainPI = DOMAIN([[0,1],[0,2*PI]])([20,50]);
        var profile_points = [[0.65, 0, 0],[0.92, 0, 0.79], [1.89, 0, 2.98], [0, 0, 3.23]];
        var profile = BEZIER(S0)(profile_points);
        var mapping = ROTATIONAL_SURFACE(profile);
        var body = MAP(mapping)(domainPI);
        body = COLOR(potato)(body);

        //=======================================   ORECCHIE DI MR POTATO   ===============================================================
        //ORECCHIO DESTRO DI MR POTATO
        //profilo destro superiore
        var domain1D = INTERVALS(1)(20);
        var domain2D = DOMAIN([[0,1],[0,1]])([40,40]);
        var domain3D = DOMAIN([[0,1],[0,1],[0,1]])([20,10,1]);

        var profile_external_ear = BEZIER(S0)([[0.86, 0, 0.36], [1.48, 0, -0.33], [2.05, 0, 1.32], [1.02, 0, 1.12]]);
        var curva = MAP(profile_external_ear)(domain1D);

        var profile_internal_ear = BEZIER(S0)([[0.90, 0, 0.50],[1.39, 0, 0.14], [1.64, 0, 1.19], [1.00, 0, 0.95]]);
        var curva = MAP(profile_internal_ear)(domain1D);

        var profile_intermediate_ear_above = BEZIER(S0)([[0.87, 0.2, 0.40],[1.45, 0.2, -0.10], [1.89, 0.2, 1.16], [1.02, 0.2, 1.07]])
        var curva = MAP(profile_intermediate_ear_above)(domain1D);

        var profile_intermediate_ear_below = BEZIER(S0)([[0.87, -0.1, 0.40],[1.45, -0.1, -0.10], [1.89, -0.1, 1.16], [1.02, -0.1, 1.07]])
        var curva = MAP(profile_intermediate_ear_below)(domain1D);

        var mapping_ear_above = BEZIER(S1)([profile_external_ear,profile_intermediate_ear_above,profile_internal_ear])
        var ear_edge_1 = MAP(mapping_ear_above)(domain2D);

        var mapping_ear_below = BEZIER(S1)([profile_external_ear,profile_intermediate_ear_below,profile_internal_ear])
        var ear_edge_2 = MAP(mapping_ear_below)(domain2D);

        var mapping_edge_ear = BEZIER(S0)([[0.90,0,0.50],[1.00,0,0.95]])
        var intermediate_surface_above = BEZIER(S0)([[1, 0, 0.45], [1.05, -0.5, 0.8], [1.1, 0, 1.00]])
        var ear_surface_above = BEZIER(S1)([mapping_edge_ear,intermediate_surface_above,profile_internal_ear])
        var surface_ear = MAP(ear_surface_above)(domain2D);

        //in ordine, il primo è la base, quello dopo è quello intermedio ecc RICORDA DI AUMENTARE IL VALORE DI Y IN MODO GRADUALE 0.01
        var b1 = BEZIER(S0)([[0.93, 0, 0.66], [1.12, 0, 0.56], [1.27, 0, 0.89], [0.97, 0, 0.86]]);
        var b2 = BEZIER(S0)([[0.93, 0.04, 0.69], [1.09, 0.04, 0.59], [1.21, 0.04, 0.84], [0.96, 0.04, 0.82]]);
        var b3 = BEZIER(S0)([[0.94, 0.04, 0.73], [1.04, 0.04, 0.66], [1.12, 0.04, 0.83], [0.96, 0.04, 0.80]]);
        var b4 = BEZIER(S0)([[0.95, 0.05, 0.75], [1.03, 0.05, 0.72], [1.06, 0.05, 0.79], [0.96, 0.05, 0.80]]);

        var tragus_surface = BEZIER(S1)([b1,b2,b4,b4,b4, [0.96,0.051,0.78]]);
        var tragus_surface = MAP(tragus_surface)(domain2D);

        var ear_dx = STRUCT([surface_ear, ear_edge_1, ear_edge_2, tragus_surface]);

        //ORECCHIO SINISTRO DI MR POTATO
        var profile_external_ear = BEZIER(S0)([[-0.86, 0, 0.36], [-1.48, 0, -0.33], [-2.05, 0, 1.32], [-1.02, 0, 1.12]]);
        var curva = MAP(profile_external_ear)(domain1D);

        var profile_internal_ear = BEZIER(S0)([[-0.90, 0, 0.50],[-1.39, 0, 0.14], [-1.64, 0, 1.19], [-1.00, 0, 0.95]]);
        var curva = MAP(profile_internal_ear)(domain1D);

        var profile_intermediate_ear_above = BEZIER(S0)([[-0.87, 0.2, 0.40],[-1.45, 0.2, -0.10], [-1.89, 0.2, 1.16], [-1.02, 0.2, 1.07]])
        var curva = MAP(profile_intermediate_ear_above)(domain1D);

        var profile_intermediate_ear_below = BEZIER(S0)([[-0.87, -0.1, 0.40],[-1.45, -0.1, -0.10], [-1.89, -0.1, 1.16], [-1.02, -0.1, 1.07]])
        var curva = MAP(profile_intermediate_ear_below)(domain1D);

        var mapping_ear_above = BEZIER(S1)([profile_external_ear,profile_intermediate_ear_above,profile_internal_ear])
        var ear_edge_1 = MAP(mapping_ear_above)(domain2D);

        var mapping_ear_below = BEZIER(S1)([profile_external_ear,profile_intermediate_ear_below,profile_internal_ear])
        var ear_edge_2 = MAP(mapping_ear_below)(domain2D);

        var mapping_edge_ear = BEZIER(S0)([[-0.90,0,0.50],[-1.00,0,0.95]])
        var intermediate_surface_above = BEZIER(S0)([[-1, 0, 0.45], [-1.05, -0.5, 0.8], [-1.1, 0, 1.00]])
        var ear_surface_above = BEZIER(S1)([mapping_edge_ear,intermediate_surface_above,profile_internal_ear])
        var surface_ear = MAP(ear_surface_above)(domain2D);

        var b1 = BEZIER(S0)([[-0.93, 0, 0.66], [-1.12, 0, 0.56], [-1.27, 0, 0.89], [-0.97, 0, 0.86]]);
        var b2 = BEZIER(S0)([[-0.93, 0.04, 0.69], [-1.09, 0.04, 0.59], [-1.21, 0.04, 0.84], [-0.96, 0.04, 0.82]]);
        var b4 = BEZIER(S0)([[-0.95, 0.05, 0.75], [-1.03, 0.05, 0.72], [-1.06, 0.05, 0.79], [-0.96, 0.05, 0.80]]);

        var tragus_surface = BEZIER(S1)([b1,b2,b4,b4,b4, [-0.96,0.051,0.78]]);
        var tragus_surface = MAP(tragus_surface)(domain2D);

        var ear_sx = STRUCT([surface_ear, ear_edge_1, ear_edge_2, tragus_surface]);

        //raccordi patata-orecchie
        var r = EXTRUDE([0.1])(DISK(0.05)([16,2]));
        r = R([0,2])([PI/2])(r);
        var r1 = T([0,1,2])([0.9,0,0.78])(r);
        var r2 = T([0,1,2])([-0.9 -0.1,0,0.78])(r);

        var ears = STRUCT([ear_dx, ear_sx, r1, r2]);
        ears = COLOR(pink)(ears);
        //=========================================================================================================

        //========================== CAPPELLO DI MR POTATO ========================================================
        var profile_hat = BEZIER(S0)([[0, 0, -0.75] ,[0.49, 0, -0.77], [0.72, 0, -0.45], [0.71, 0, 0]]);
        var mapping = ROTATIONAL_SURFACE(profile_hat);
        var hat_body = MAP(mapping)(domainPI);

        var profile_edge_hat = BEZIER(S0)([[0.71, 0, 0], [0.93, 0, -0.03], [0.94, 0, -0.33], [0.74, 0, -0.32]]);
        var mapping = ROTATIONAL_SURFACE(profile_edge_hat);
        var hat_edge = MAP(mapping)(domainPI);

        var hat = STRUCT([hat_body, hat_edge]);
        hat = COLOR(black)(hat);

        //================== SCARPE DI MR POTATO =================================================================
        var profile_shoe_behind = BEZIER(S0)([[0, 0, 3.5], [0.3, -0.3, 3.5], [0.6, 0, 3.5]]);
        var profile_shoe_front = BEZIER(S0)([[0, 0, 3.5], [0, 0.8, 3.5], [0.3, 1, 3.5], [0.6, 0.8, 3.5], [0.6, 0, 3.5]]);
        var profile_shoe_behind_top = BEZIER(S0)([[0, 0, 3.1], [0.3, -0.3, 3.1], [0.6, 0, 3.1]]);
        var profile_shoe_front_top = BEZIER(S0)([[0, 0, 3.1], [0, 0.6, 3.4], [0.3, 1.2, 3.5], [0.6, 0.6, 3.4], [0.6, 0, 3.1]]);
        var profile_shoe_curve = BEZIER(S0)([[0, 0, 3.1], [0, 0.4, 3.2], [0.3, 0.8, 3], [0.6, 0.4, 3.2], [0.6, 0, 3.1]]);

        var shoe_surface_1 = MAP(BEZIER(S1)([profile_shoe_behind, profile_shoe_behind_top]))(domain2D);
        var shoe_surface_2 = MAP(BEZIER(S1)([profile_shoe_front, profile_shoe_front_top, profile_shoe_front_top, profile_shoe_front_top]))(domain2D);
        var shoe_surface_3 = MAP(BEZIER(S1)([profile_shoe_behind, profile_shoe_front]))(domain2D);
        var shoe_surface_4 = MAP(BEZIER(S1)([profile_shoe_behind_top, profile_shoe_curve, profile_shoe_front_top]))(domain2D);
        var shoe_dx = STRUCT([shoe_surface_1, shoe_surface_2, shoe_surface_3, shoe_surface_4]);
        shoe_dx = T([0])([-0.3])(shoe_dx);
        shoe_dx = R([0,1])(-PI/12)(shoe_dx);

        var shoe_sx = R([0,1])(PI/6)(shoe_dx);
        shoe_sx = T([0])([-0.3])(shoe_sx);
        shoe_dx = T([0])([0.3])(shoe_dx);
        shoe_dx = COLOR(azzurro)(shoe_dx);
        shoe_sx = COLOR(azzurro)(shoe_sx);

        //laccio della scarpa
        var profile_lace_1 = BEZIER(S0)([[-0.20, 0, 3.15], [-0.24, 0, 3.04], [0.13, 0, 3.04], [0.20, 0, 3.15]]);
        var profile_lace_2 = BEZIER(S0)([[-0.20, 0.05, 3.20], [-0.24, 0.05, 3.04], [0.13, 0.05, 3.04], [0.20, 0.05, 3.20]]);
        var surface_lace_1 = BEZIER(S1)([profile_lace_1, profile_lace_2]);
        surface_lace_1 = MAP(surface_lace_1)(domain2D);

        //lacci scarpa sinistra
        var surface_sx_lace_1 = R([0,1])(-PI/16)(surface_lace_1);
        surface_sx_lace_1 = T([0,1,2])([-0.4, 0.25, 0.0125])(surface_sx_lace_1);
        var traslation = T([0,1,2])([0, 0.1, 0.05])
        var models_laces_sx = REPLICA(3)([surface_sx_lace_1, traslation])
        var laces_sx = STRUCT(models_laces_sx);
        laces_sx = COLOR([0,0,1])(laces_sx);
        shoe_sx = STRUCT([shoe_sx, laces_sx]);

        //lacci scarpa destra
        surface_dx_lace_1 = R([0,1])(PI/16)(surface_lace_1);
        surface_dx_lace_1 = T([0,1,2])([0.4, 0.25, 0.0125])(surface_dx_lace_1);
        var models_laces_dx = REPLICA(3)([surface_dx_lace_1, traslation])
        var laces_dx = STRUCT(models_laces_dx);
        laces_dx = COLOR([0,0,1])(laces_dx);
        shoe_dx = STRUCT([shoe_dx, laces_dx]);

        var shoes = STRUCT([shoe_dx, shoe_sx]);

        //============================  BAFFI DI MR POTATO  ======================================================
        var profile_inferior_mustache = BEZIER(S0)([[0, 1.15, 2.05], [0.53, 1.2, 2.34], [0.87, 1.2, 1.95], [0.81, 1.2, 1.86]]);

        var profile_superior_mustache = BEZIER(S0)([[0, 1.2, 1.65], [0.28, 1.2, 1.59], [0.75, 1.2, 1.55], [0.81, 1.2, 1.86]]);

        var profile_intermediate_mustache = BEZIER(S0)([[0, 1.15, 1.95], [0.81, 1.2, 1.95]]);
        var profile_intermediate_mustache_up_1 = BEZIER(S0)([[0, 1.3, 1.9], [0.4, 1.8, 1.9], [0.81, 1.2, 1.9], [0.81, 1.2, 1.9]]);
        var profile_intermediate_mustache_up_2 = BEZIER(S0)([[0, 1, 1.9], [0.4, 0.6, 1.9], [0.81, 1.2, 1.9], [0.81, 1.2, 1.9]]);

        var mustache_base = BEZIER(S1)([profile_inferior_mustache, profile_intermediate_mustache, profile_superior_mustache]);
        mustache_base = MAP(mustache_base)(domain2D);

        var mustache_surface_1 = BEZIER(S1)([profile_inferior_mustache, profile_intermediate_mustache_up_1, profile_superior_mustache]);
        mustache_surface_1 = MAP(mustache_surface_1)(domain2D);

        var mustache_surface_2 = BEZIER(S1)([profile_inferior_mustache, profile_intermediate_mustache_up_2, profile_superior_mustache]);
        mustache_surface_2 = MAP(mustache_surface_2)(domain2D);

        var mustache_dx = STRUCT([mustache_base, mustache_surface_1, mustache_surface_2]);
        var mustache_sx = S([0,1,2])([1,-1,1])(R([0,1])(PI)(mustache_dx));

        var moustaches = STRUCT([mustache_dx, mustache_sx]);
        moustaches = COLOR(brown)(moustaches);
        //==========================================================================================================

        //============================== DENTI DI MR POTATO ========================================================
        //denti di sopra
        var profile_tooth_above = BEZIER(S0)([[0.20, 1.2, 2.05], [0.2, 1.2, 2.42], [0, 1.2, 2.42], [0, 1.2, 2], [0, 1.2, 2.42], [-0.2, 1.2, 2.42], [-0.2, 1.2, 2.05]]);
        var profile_tooth_above_interm = BEZIER(S0)([[0, 1.2, 1.95], [0, 1.2, 2.275]]);
        var profile_tooth_above_edge = BEZIER(S0)([[0.20, 1.2, 2.05], [0, 1.2, 1.95], [-0.2, 1.2, 2.05]]);
        var tooth_above_1 = BEZIER(S1)([profile_tooth_above, profile_tooth_above_edge]);
        //-------
        var profile_tooth_above_2 = BEZIER(S0)([[0.20, 1.15, 2.05], [0.2, 1.15, 2.42], [0, 1.15, 2.42], [0, 1.15, 2], [0, 1.15, 2.42], [-0.2, 1.15, 2.42], [-0.2, 1.15, 2.05]]);
        var profile_tooth_above_edge_2 = BEZIER(S0)([[0.20, 1.15, 2.05], [0, 1.15, 1.95], [-0.2, 1.15, 2.05]]);
        var tooth_above_2 = BEZIER(S1)([profile_tooth_above_2, profile_tooth_above_edge_2]);

        var teeth_above = BEZIER(S2)([tooth_above_1, tooth_above_2]);
        teeth_above = MAP(teeth_above)(domain3D);

        //denti di sotto
        var profile_tooth_below = BEZIER(S0)([[0.45, 1.15, 2.10], [0.35, 1.15, 2.60], [-0.35, 1.15, 2.60], [-0.45, 1.15, 2.10]]);
        var profile_tooth_below_2 = BEZIER(S0)([[0.45, 1.1, 2.10], [0.35, 1.1, 2.60], [-0.35, 1.1, 2.60], [-0.45, 1.1, 2.10]]);

        var profile_tooth_below_edge = BEZIER(S0)([[0.45, 1.15, 2.10], [-0.45, 1.15, 2.10]]);
        var profile_tooth_below_edge_2 = BEZIER(S0)([[0.45, 1.1, 2.10], [-0.45, 1.1, 2.10]]);

        var teeth_below_surface_1 = BEZIER(S1)([profile_tooth_below, profile_tooth_below_edge]);
        var teeth_below_surface_2 = BEZIER(S1)([profile_tooth_below_2, teeth_below_surface_2]);

        var teeth_below = BEZIER(S2)([teeth_below_surface_1, profile_tooth_below_2]);
        var teeth_below = MAP(teeth_below)(domain3D);

        var all_teeth = STRUCT([teeth_above, teeth_below]);

        //profili singoli denti di sotto
        var profile_tooth_below_interm = BEZIER(S0)([[0, 1.15, 2.10], [0, 1.15, 2.475]]);

        var profile_tooth_below_1 = BEZIER(S0)([[0.225, 1.15, 2.10], [0.225, 1.15, 2.30], [0.195, 1.15, 2.435]]);

        var profile_tooth_below_2 = BEZIER(S0)([[-0.225, 1.15, 2.05], [-0.225, 1.15, 2.30], [-0.195, 1.15, 2.435]]);

        var profiles_single_teeth = STRUCT([MAP(profile_tooth_below_2)(domain1D), MAP(profile_tooth_below_1)(domain1D), 
            MAP(profile_tooth_below_interm)(domain1D), MAP(profile_tooth_below_2)(domain1D), MAP(profile_tooth_below)(domain1D),
            MAP(profile_tooth_above_2)(domain1D), MAP(profile_tooth_above_interm)(domain1D), MAP(profile_tooth_above)(domain1D)])
        //============================================================================================================================
        //==========================  LABBRA DI MR POTATO ============================================================================
        var profile_lips = BEZIER(S0)([[0.5, 1.1, 2.10], [0.45, 1.1, 2.65], [-0.45, 1.1, 2.65], [-0.5, 1.1, 2.10]]);
        var profile_lips_up = BEZIER(S0)([[0.475, 1.2, 2.10], [0.40, 1.2, 2.625], [-0.40, 1.2, 2.625], [-0.475, 1.2, 2.10]]);
        var profile_lips_down = BEZIER(S0)([[0.45, 1.1, 2.10], [0.35, 1.1, 2.60], [-0.35, 1.1, 2.60], [-0.45, 1.1, 2.10]]);
        var mapp_lips = BEZIER(S1)([profile_lips, profile_lips_up, profile_lips_down])
        var lips = MAP(mapp_lips)(domain2D);
        lips = COLOR([1,0,0])(lips);

        //===================== NASO DI MR POTATO ===================================================================================
        var profile_nose = BEZIER(S0)([[0, 1.1, 0.82] , [0.33, 1.1, 1.08], [-0.07, 1.1, 1.25], [0.55, 1.1, 1.30], [0.37, 1.1, 1.6]]);
        var mapping_nose = ROTATIONAL_SURFACE(profile_nose);
        var nose = MAP(mapping_nose)(domainPI);
        nose = T([1])([1])(nose);
        nose = COLOR(orange)(nose);

        //================================== OCCHI DI MR POTATO =====================================================================
        //occhio destro
        var profile_eye_dx = BEZIER(S0)([[0, 1, 0.78], [0.64, 0.9, 1.37], [0.68, 0.7, -0.45], [0, 0.8, 0.32]]);
        var profile_eye_dx_edge =  BEZIER(S0)([[0, 1, 0.78], [0, 0.8, 0.32]]);
        var eye_dx_base = BEZIER(S1)([profile_eye_dx, profile_eye_dx_edge]);

        var profile_eye_dx_top = BEZIER(S0)([[0, 1, 0.67], [0.04, 1.1, 0.67], [0.50, 1, 1.02], [0.50, 0.8, 0.07], [0.06, 1, 0.42], [0, 0.9, 0.42]]);
        var profile_eye_dx_top_edge =  BEZIER(S0)([[0, 1, 0.67],  [0, 0.9, 0.42]]);
        var eye_dx_base_top = BEZIER(S1)([profile_eye_dx_top, profile_eye_dx_top_edge]);

        var profile_eye_dx_top2 = BEZIER(S0)([[0.06, 0.98, 0.63], [0.24, 1, 0.75], [0.27, 1, 0.42], [0.06, 0.98, 0.54]]);
        var profile_eye_dx_top2_edge =  BEZIER(S0)([[0.06, 0.98, 0.63], [0.06, 0.98, 0.54]]);
        var eye_dx_base_top2 = BEZIER(S1)([profile_eye_dx_top2, profile_eye_dx_top2_edge]);

        var eye_dx_mapping = BEZIER(S2)([eye_dx_base, eye_dx_base, eye_dx_base_top, eye_dx_base_top, eye_dx_base_top2]);
        var eye_dx = MAP(eye_dx_mapping)(domain3D)

        //occhio sinistro
        var profile_eye_sx = BEZIER(S0)([[0, 1, 0.78], [-0.64, 0.9, 1.37], [-0.68, 0.7, -0.45], [0, 0.8, 0.32]]);
        var profile_eye_sx_edge =  BEZIER(S0)([[0, 1, 0.78], [0, 0.8, 0.32]]);
        var eye_sx_base = BEZIER(S1)([profile_eye_sx, profile_eye_sx_edge]);

        var profile_eye_sx_top = BEZIER(S0)([[0, 1, 0.67], [-0.04, 1.1, 0.67], [-0.50, 1, 1.02], [-0.50, 0.8, 0.07], [-0.06, 1, 0.42], [0, 0.9, 0.42]]);
        var profile_eye_sx_top_edge =  BEZIER(S0)([[0, 1, 0.67],  [0, 0.9, 0.42]]);
        var eye_sx_base_top = BEZIER(S1)([profile_eye_sx_top, profile_eye_sx_top_edge]);

        var profile_eye_sx_top2 = BEZIER(S0)([[-0.06, 0.98, 0.63], [-0.24, 1, 0.75], [-0.27, 1, 0.42], [-0.06, 0.98, 0.54]]);
        var profile_eye_sx_top2_edge =  BEZIER(S0)([[-0.06, 0.98, 0.63], [-0.06, 0.98, 0.54]]);
        var eye_sx_base_top2 = BEZIER(S1)([profile_eye_sx_top2, profile_eye_sx_top2_edge]);

        var eye_sx_mapping = BEZIER(S2)([eye_sx_base, eye_sx_base, eye_sx_base_top, eye_sx_base_top, eye_sx_base_top2]);
        var eye_sx = MAP(eye_sx_mapping)(domain3D)

        //pupille
        var pupil = getSemiSfera(0.15,20, black);
        pupil = R([1,2])(-PI/2)(pupil);
        var pupil_dx = T([0,1,2])([0.15, 0.95, 0.56])(pupil);
        var pupil_sx = T([0,1,2])([-0.15, 0.95, 0.56])(pupil);
        var pupils = STRUCT([pupil_dx, pupil_sx]);

        var all_eyes = STRUCT([eye_dx, eye_sx, pupils])
        //=====================================================================================================================================================

        //==========================================  BRACCIA DI MR POTATO  ===================================================================================
        //braccio destro
        var profile_arm_dx_1 = BEZIER(S0)([[1.02, 0, 1.20], [1.65, 0, 1.43], [1.67, 0, 1.19], [2.11, 0, 2.05]]);
        var profile_arm_dx_2 = BEZIER(S0)([[1.10, 0, 1.53], [1.39, 0, 1.47], [1.55, 0, 1.44], [1.84, 0, 2.03]]);
        var profile_arm_dx_12_up = BEZIER(S0)([[1.07, 0.2, 1.33], [1.51, 0.2, 1.41], [1.72, 0.2, 1.46], [1.93, 0.2, 1.96]]);
        var profile_arm_dx_12_down = BEZIER(S0)([[1.07, -0.2, 1.33], [1.51, -0.2, 1.41], [1.72, -0.2, 1.46], [1.93, -0.2, 1.96]]);

        var arm_dx_surface_1 = MAP(BEZIER(S1)([profile_arm_dx_1, profile_arm_dx_12_up, profile_arm_dx_2]))(domain2D);
        var arm_dx_surface_2 = MAP(BEZIER(S1)([profile_arm_dx_1, profile_arm_dx_12_down, profile_arm_dx_2]))(domain2D);
        var arm_dx_surface = STRUCT([arm_dx_surface_1, arm_dx_surface_2]);

        //braccio sinistro
        var profile_arm_sx_1 = BEZIER(S0)([[-1.00, 0, 1.14], [-1.29, 0, 1.16], [-1.62, 0.3, 1.07], [-1.71, 1, 0.73]])
        var profile_arm_sx_2 = BEZIER(S0)([[-1.10, 0, 1.53], [-1.37, 0, 1.19], [-1.92, 0.3, 1.25], [-1.93, 1, 0.81]]);
        //var profile_arm_sx_12_up = BEZIER(S0)([[-1.09, 0.2, 1.29], [-1.38, 0.4, 1.16], [-1.81, 0.7, 1.14], [-1.82, 1.4, 0.76]]);
        var profile_arm_sx_12_up = BEZIER(S0)([[-1.09, 0.2, 1.29], [-1.38, 0.2, 1.16], [-1.70, 0.7, 1.19], [-1.74, 1.2, 0.93]]);
        //var profile_arm_sx_12_down = BEZIER(S0)([[-1.09, -0.2, 1.29], [-1.38, -0.4, 1.16], [-1.81, -0.1, 1.14], [-1.82, 0.6, 0.76]]);
        var profile_arm_sx_12_down = BEZIER(S0)([[-1.09, -0.2, 1.29], [-1.38, -0.2, 1.16], [-1.81, -0.1, 1.14], [-1.91, 0.8, 0.59]]);

        var arm_sx_surface_1 = MAP(BEZIER(S1)([profile_arm_sx_1, profile_arm_sx_12_up, profile_arm_sx_2]))(domain2D);
        var arm_sx_surface_2 = MAP(BEZIER(S1)([profile_arm_sx_1, profile_arm_sx_12_down, profile_arm_sx_2]))(domain2D);
        var arm_sx_surface = STRUCT([arm_sx_surface_1, arm_sx_surface_2]);

        //raccordi braccio mano
        var raccordo = getSfera(0.15, 30, [1,1,1]);

        //palmo della mano
        var profile_hand_palm = BEZIER(S0)([[0.11, 0, 0.94], [0.58, 0, 0.32], [-0.58, 0, 0.32], [-0.11, 0, 0.94]]);
        var profile_hand_edge = BEZIER(S0)([[0.11, 0, 0.94], [0, 0, 1], [-0.11, 0, 0.94]]);
        var profile_hand_palm_top = BEZIER(S0)([[0.11, 0.3, 0.94], [0.58, 0.15, 0.32], [-0.58, 0.15, 0.32], [-0.11, 0.3, 0.94]]);
        var profile_hand_edge_top = BEZIER(S0)([[0.11, 0.3, 0.94], [0, 0.3, 1], [-0.11, 0.3, 0.94]]);

        var surface_palm_hand_1 = BEZIER(S1)([profile_hand_palm, profile_hand_edge]);
        var surface_palm_hand_2 = BEZIER(S1)([profile_hand_palm_top, profile_hand_edge_top]);
        var volume_palm_hand = BEZIER(S2)([surface_palm_hand_1, surface_palm_hand_2]);
        volume_palm_hand = MAP(volume_palm_hand)(domain3D);
        volume_palm_hand = T([0,1,2])([0, -0.15, -1])(volume_palm_hand);

        //pollice
        var profile_thumb = BEZIER(S0)([[0, 0, 0.40], [0, 0.06, 0.40], [0.15, 0, 0.40], [0.14, 0, 0.16], [0.1, 0, 0]]);
        var mapping_thumb = ROTATIONAL_SURFACE(profile_thumb);
        var thumb = MAP(mapping_thumb)(domainPI);
        thumb = R([0,1])([PI/2])(thumb);
        thumb = T([0,1,2])([0,0,0.1])(thumb);
        thumb = R([0,2])([-PI/2 -PI/8])(thumb);
        thumb = T([0,1,2])([0,0,-0.1])(thumb);

        //altre dita
        var profile_finger = BEZIER(S0)([[0, 0, 0.50], [0.1, 0, 0.5], [0.1, 0, 0.16], [0.05, 0, 0]]);
        var mapping_finger = ROTATIONAL_SURFACE(profile_finger);
        var finger = MAP(mapping_finger)(domainPI);
        finger = R([1,2])([PI])(finger);
        var finger1 = T([0,1,2])([0, -0.05, -0.3])(finger);
        var finger2 = T([0,1,2])([0.15, 0, 0])(finger1);
        var finger3 = T([0,1,2])([-0.15, 0, 0])(finger1);
        var fingers = STRUCT([finger1, finger2, finger3]);

        //unisco il palmo della mano con le dita e il raccordo
        volume_palm_hand = STRUCT ([volume_palm_hand, thumb, fingers]);
        raccordo = STRUCT([raccordo, volume_palm_hand]);

        //raccordi specifici: dx
        var raccordo_dx = R([0,2])([-PI/2])(raccordo);
        raccordo_dx = R([0,1])([PI/2])(raccordo_dx);
        raccordo_dx = R([1,2])([PI/2])(raccordo_dx);
        raccordo_dx = T([0,1,2])([1.96, 0, 2.03])(raccordo_dx);
        //raccordi specifici: sx
        var raccordo_sx = R([0,1])([PI])(raccordo);
        raccordo_sx = R([1,2])([PI/8])(raccordo_sx);
        raccordo_sx = T([0,1,2])([-1.8, 1, 0.78])(raccordo_sx);

        var arms = STRUCT([arm_dx_surface, arm_sx_surface, raccordo_dx, raccordo_sx]);
        //=====================================================================================================================================================
        var model = STRUCT([body, ears, hat, moustaches, all_teeth, profiles_single_teeth, lips, nose, all_eyes, shoes, arms]);
        model = R([0,1])([PI])(model)
        model = R([1,2])([PI])(model)
    ////////////////////////////////////////
  return model
  })();

  exports.author = 'octawizard';
  exports.category = 'others';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));