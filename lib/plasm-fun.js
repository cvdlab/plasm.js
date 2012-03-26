
/*!
 * plasm-fun.js
 * functional environment for plasm.js
 * Copyright (c) 2011 cvd-lab <cvdlab@email.com> (https://github.com/cvd-lab/)
 * MIT License
 */

 !(function (exports) {

  /**
   * Library namespace.
   */

  var fun = exports.fun = {};

  /**
   * Module dependencies.
   */

  Object.keys(ƒ).forEach(function (key) {
    fun[key.toUpperCase()] = ƒ[key];
  });

  /**
   * Library version.
   */

  fun.version = '0.0.1';

  /**
   * Library init.
   */

  var p;

  fun.PLASM = function (viewer) {
    p = viewer;
    fun.globalize();
  };

  /**
   * Library globalization
   */

  fun.globalize = function () {
    fun.globalize = function () {};
    Object.keys(fun).forEach(function (key) {
      exports[key] = fun[key];
    });
  };

  /**
   * DRAW
   * 
   * @param {plasm.Model} model model
   * @return {plasm.Model} model model
   * @api public
   */

  fun.DRAW = function (model) {
    if (!(model instanceof plasm.Model)) {
      return;
    }

    return model.draw();
  };

  /**
   * R
   * 
   * @param {Array|Uint32Array} dims
   * @return {Function}
   *   @param {Number} angle
   *   @return {Function}
   *      @param {plasm.Model} model
   *      @return {plasm.Model} rotated clone of model
   * @api public
   */

  fun.R = function (dims) {
    return function (angle) {
      return function (model) {
        return model.clone().rotate(dims, angle);
      }
    }
  };

  /**
   * S
   * 
   * @param {Array|Uint32Array} dims
   * @return {Function}
   *   @param {Number} values
   *   @return {Function}
   *      @param {plasm.Model} model
   *      @return {plasm.Model} scaled clone of model
   * @api public
   */

  fun.S = function (dims) {
    return function (values) {
      return function (model) {
        return model.clone().scale(dims, values);
      }
    }
  };

  /**
   * T
   * 
   * @param {Array|Uint32Array} dims
   * @return {Function}
   *   @param {Number} values
   *   @return {Function}
   *      @param {plasm.Model} model
   *      @return {plasm.Model} translated clone of model
   * @api public
   */

  fun.T = function (dims) {
    return function (values) {
      return function (model) {
       return model.clone().translate(dims, values);
      }
    }
  };

  /**
   * STRUCT
   * 
   * @param {Array} items
   * @return {plasm.Model}
   * @api public
   */

  fun.STRUCT = function (items) {
    return p.struct(items);
  };

  /**
   * MAP
   * 
   * @param {Function} mapping
   * @return {Function}
   *   @param {plasm.Model} domain
   *   @return {plasm.Model}
   * @api public
   */

  fun.MAP = function (mapping) {
    return function (domain) {
      return domain.map(mapping);
    };
  };

  /**
   * EXPLODE
   *
   * @param {Array|Float32Array} values
   * @return {Function}
   *    @param {plasm.Model} model
   *    @return {plasm.Model} exploded clone of model
   * @api public
   */

  var EXPLODE =
  fun.EXPLODE = function (values) {
    return function (model) {
      return model.explode(values);
    };
  };

  /**
   * CUBE
   * 
   * @param {Number} dim
   * @return {plasm.Model} a dim-dimendional cube
   * @api public
   */

  var CUBE = 
  fun.CUBE = function (d) {
    return p.cube(d);
  };

  /**
   * CUBOID
   * 
   * @param {Array} sides
   * @return {plasm.Model} a cuboidal simplicial complex
   * @api public
   */

  var CUBOID =
  fun.CUBOID = function (sides) {
    return p.cuboid(sides);
  };

  /**
   * INTERVALS
   *
   * @param {Number} tip
   * @return {Function}
   *   @param {Number} n
   *   @return {plasm.Model} intervals
   * @api public
   */

  var INTERVALS = 
  fun.INTERVALS = function (tip) {
    return function (n) {
      return p.intervals(tip, n);
    };
  };

  /**
   * CIRCLE
   * 
   * @param {Number} r radius
   * @return {Function}
   *   @param {Number} n subdivisions
   *   @return {plasm.Model} a circle
   * @api public
   */

  var CIRCLE = 
  fun.CIRCLE = function (r) {
    var r = r || 1;
    return function (n) {
      return p.circle(r, n);
    };
  };

  /**
   * DISK
   * 
   * @param {Number} r radius
   * @return {Function}
   *   @param {Array} subs subdivisions
   *   @param {Number} [subs[0]] slices
   *   @param {Number} [subs[1]] stacks
   *   @return {plasm.Model} a disk
   * @api public
   */

  var DISK = 
  fun.DISK = function (r) {
    var r = r || 1;
    return function (subs) {
      var subs = subs || [];
      var slices = subs[0] || 24;
      var stacks = subs[1] || 3;
      return p.disk(r, slices, stacks);
    };
  };

  /**
   * CYLSURFACE
   * 
   * @param {Array} dims
   * @param {Number} [dims[0]=1] radius
   * @param {Number} [dims[1]=1] height
   * @return {Function}
   *   @param {Array} subs
   *   @param {Number} [subs[0]=16] slices
   *   @param {Number} [subs[1]=2]  stacks
   *   @return {plasm.Model} a cylindrical surface
   * @api public
   */
  
  var CYLSURFACE = 
  fun.CYLSURFACE = function (dims) {
    var r = dims[0] || 1;
    var h = dims[1] || 1;
    return function (subs) {
      var subs = subs || [];
      var slices = subs[0] || 12;
      var stacks = subs[1] || 8;
      return p.cylinderSurface(r, h, slices, stacks);
    };
  };
 
  /**
   * TORUSSURFACE
   * 
   * @param {Array} dims
   * @param {Number} [dims[0]=0.1] r min
   * @param {Number} [dims[1]=0.9] r max
   * @return {Function}
   *   @param {Array} subs
   *   @param {Number} [subs[0]=12] slices
   *   @param {Number} [subs[1]=8]  stacks
   *   @return {plasm.Model} a torus surface
   * @api public
   */

  var TORUSSURFACE = 
  fun.TORUSSURFACE = function (dims) {
    var dims = dims || [];
    var r_min = dims[0] || 0.1;
    var r_max = dims[1] || 0.9;
    return function (subs) {
      var subs = subs || [];
      var n = subs[0] || 12;
      var m = subs[1] || 8;
      return p.torusSurface(r_min, r_max, n, m);
    };
  };

  /**
   * TORUSSOLID
   * 
   * @param {Array} dims
   * @param {Number} [dims[0]=0.1] r min
   * @param {Number} [dims[1]=0.9] r max
   * @return {Function}
   *   @param {Array} subs
   *   @param {Number} [subs[0]=12] n
   *   @param {Number} [subs[1]=8]  m
   *   @param {Number} [subs[1]=8]  p
   *   @return {plasm.Model} a torus surface
   * @api public
   */

  var TORUSSOLID = 
  fun.TORUSSOLID = function (dims) {
    var dims = dims || [];
    var r_min = dims[0] || 0.1;
    var r_max = dims[1] || 0.9;
    return function (subs) {
      var subs = subs || [];
      var n = subs[0] || 12;
      var m = subs[1] || 8;
      var q = subs[2] || 8;
      return p.torusSolid(r_min, r_max, n, m, q);
    };
  };

  /**
   * TRIANGLESTRIP
   * 
   * @param {Array} points
   * @return {plasm.Model} triangle strip
   * @api public
   */

  var TRIANGLESTRIP = 
  fun.TRIANGLESTRIP = function (points) {
    return p.triangleStrip(points);
  };

  /**
   * TRIANGLEFAN
   * 
   * @param {Array} points
   * @return {plasm.Model} triangle strip
   * @api public
   */

  var TRIANGLEFAN = 
  fun.TRIANGLEFAN = function (points) {
    return p.triangleFan(points);
  };

  /**
   * HELIX
   * 
   * @param {Number} [r=1] r
   * @param {Number} [pitch=1] pitch
   * @param {Number} [n=24] n
   * @param {Number} [turns=1] turns
   * @return {plasm.Model} helix
   * @api public   
   */

  var HELIX = 
  fun.HELIX = function (r, pitch, n, turns) {
    return p.helix(r, pitch, n, turns);
  };



}(this));