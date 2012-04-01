
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

  fun.version = '0.1.0';

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
   * @param {plasm.Model|plasm.Struct} object
   * @return {plasm.Model|plasm.Struct} object
   * @api public
   */

  fun.DRAW = function (object) {
    if (!(object instanceof plasm.Model) &&
        !(object instanceof plasm.Struct)) {
      return;
    }

    return object.draw();
  };

    /**
   * CANCEL
   * 
   * @param {plasm.Model|plasm.Struct} object
   * @return {plasm.Model|plasm.Struct} object
   * @api public
   */

  fun.CANCEL = function (object) {
    if (!(object instanceof plasm.Model) &&
        !(object instanceof plasm.Struct)) {
      return;
    }

    return object.cancel();
  };

  /**
   * R
   * 
   * @param {Array|Uint32Array} dims
   * @return {Function}
   *   @param {Number} angle
   *   @return {Function}
   *      @param {plasm.Model|plasm.Struct} object
   *      @return {plasm.Model|plasm.Struct} rotated clone of object
   * @api public
   */

  var R = 
  fun.R = 
  fun.ROTATE = function (dims) {
    return function (angle) {
      return function (object) {
        return object.clone().rotate(dims, angle);
      };
    };
  };

  /**
   * S
   * 
   * @param {Array|Uint32Array} dims
   * @return {Function}
   *   @param {Number} values
   *   @return {Function}
   *      @param {plasm.Model|plasm.Struct} object
   *      @return {plasm.Model|plasm.Struct} scaled clone of object
   * @api public
   */

  var S = 
  fun.S = 
  fun.SCALE = function (dims) {
    return function (values) {
      return function (object) {
        return object.clone().scale(dims, values);
      };
    };
  };

  /**
   * T
   * 
   * @param {Array|Uint32Array} dims
   * @return {Function}
   *   @param {Number} values
   *   @return {Function}
   *      @param {plasm.Model|plasm.Struct} model
   *      @return {plasm.Model|plasm.Struct} translated clone of object
   * @api public
   */

  var T =
  fun.T =
  fun.TRANSLATE = function (dims) {
    return function (values) {
      return function (object) {
       return object.clone().translate(dims, values);
      };
    };
  };

  /**
   * STRUCT
   * 
   * @param {Array} items
   * @return {plasm.Model}
   * @api public
   */

  fun.STRUCT = function (items) {
    var transformations = function (o) {return o;};
    var objects = [];

    temp = [];

    items.forEach(function (item) {
      if (!(item instanceof plasm.Model) && 
          !(item instanceof plasm.Struct)) {
        transformations = COMP2([transformations, item]);
      } else {
        temp.push(APPLY([transformations, item]).clone());
        objects.push(APPLY([transformations, item]));
      }
    });

    return new plasm.Struct(objects, p);
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
   * extrude
   * 
   * @param {Array|Float32Array} hlist a list of positive numbers 
   *   or an alternation of positive and negative numbers
   * @return {Function}
   *   @param {plasm.Model} model to extrude
   *   @return {plasm.Model} extrusion
   * @api private
   */

  var EXTRUDE =
  fun.EXTRUDE = function (values) {
    return function (model) {
      return model.extrude(values);
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
   * SKELETON
   * 
   * @param {Number} dim
   * @return {Function}
   *   @param {plasm.Model} model
   *   @return {plasm.Model} skeleton
   * @api public
   */

  var SKELETON = 
  fun.SKELETON = function (dim) {
    return function (model) {
      return model.skeleton(dim);
    };
  };

  /**
   * BOUNDARY
   * 
   * @param {Number} dim
   * @return {Function}
   *   @param {plasm.Model} model
   *   @return {plasm.Model} boundary
   * @api public
   */

  var BOUNDARY = 
  fun.BOUNDARY = function (dim) {
    return function (model) {
      return model.boundary(dim);
    };
  };

  /**
   * Color.
   *
   * @param {Array} rgb rgb
   * @param {Number} [rgb[0] = 0] r
   * @param {Number} [rgb[1] = 0] g
   * @param {Number} [rgb[2] = 0] b
   * @return {Function}
   *   @param {plasm.Model | plasm.Struct} object
   *   @return {plasm.Model | plasm.Struct} colored object
   * @api public
   */

  var COLOR =
  fun.COLOR = function (rgb) {
    return function (object) {
      return object.color(rgb);
    };
  };

  /**
   * SHOW
   *
   * @param {plasm.Model | plasm.Struct} model to show
   * @return {plasm.Model | plasm.Struct} model
   * @api public
   */

  var SHOW = 
  fun.SHOW = function (object) {
    object.show();
  };

  /**
   * HIDE
   *
   * @return {plasm.Model | plasm.Struct} for chaining
   * @api public
   */

  var HIDE = 
  fun.HIDE = function (object) {
    object.hide();
  };

  /**
   * SIMPLICIAL_COMPLEX
   * 
   * @param {Array|Float32Array} points
   * @return {Function}
   *   @param {Array|Uint32Array} cells
   *   @return {plasm.Model} simplicial cells
   * @api public
   */
  
  var SIMPLICIAL_COMPLEX = 
  fun.SIMPLICIAL_COMPLEX = function (points) {
    return function (cells) {
      return p.simplicialComplex(points, cells);
    };
  };

  /**
   * SIMPLEX
   * 
   * @param {number} d
   * @return {plasm.Model} a simplex
   * @api public
   */

  var SIMPLEX =
  fun.SIMPLEX = function (d) {
    return p.simplex(d);
  };

  /**
   * POLYLINE
   * 
   * @param {Array} points
   * @return {plasm.Model} a polyline
   * @api public
   */

  var POLYLINE 
  fun.POLYLINE = function (points) {
    return p.polyline(points);
  };

  /**
   * SIMPLEX_GRID
   * 
   * @param {Array} quotesList is a list of hlist made by positive numbers 
   * or made by an alternation of positive and negative numbers
   * @return {plasm.Model} a grid of simplexes
   * @api public
   */

  var SIMPLEX_GRID = 
  fun.SIMPLEX_GRID = function (quotes) {
    return p.simplexGrid(quotes);
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
   * DOMAIN
   *
   * @param {Array} ends
   * @return {Function}
   *   @param {Number} ns
   *   @return {plasm.Model} domain
   * @return {plasm.Model} domain
   * @api public
   */

  var DOMAIN = 
  fun.DOMAIN = function (ends) {
    return function (ns) {
      return p.domain(ends, ns);
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
   *   @param {Array} divs subdivisions
   *   @param {Number} [divs[0]] slices
   *   @param {Number} [divs[1]] stacks
   *   @return {plasm.Model} a disk
   * @api public
   */

  var DISK = 
  fun.DISK = function (r) {
    var r = r || 1;
    return function (divs) {
      var divs = divs || [];
      var slices = divs[0] || 24;
      var stacks = divs[1] || 3;
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
   *   @param {Array} divs
   *   @param {Number} [divs[0]=16] slices
   *   @param {Number} [divs[1]=2]  stacks
   *   @return {plasm.Model} a cylindrical surface
   * @api public
   */
  
  var CYL_SURFACE = 
  fun.CYL_SURFACE = function (dims) {
    var dims = dims || [];
    var r = dims[0] || 1;
    var h = dims[1] || 1;
    return function (divs) {
      var divs = divs || [];
      var slices = divs[0] || 12;
      var stacks = divs[1] || 8;
      return p.cylinderSurface(r, h, slices, stacks);
    };
  };
 
  /**
   * TORUS_SURFACE
   * 
   * @param {Array} dims
   * @param {Number} [dims[0]=0.1] r min
   * @param {Number} [dims[1]=0.9] r max
   * @return {Function}
   *   @param {Array} divs
   *   @param {Number} [divs[0]=12] slices
   *   @param {Number} [divs[1]=8]  stacks
   *   @return {plasm.Model} a torus surface
   * @api public
   */

  var TORUS_SURFACE = 
  fun.TORUS_SURFACE = function (dims) {
    var dims = dims || [];
    var r_min = dims[0] || 1.0;
    var r_max = dims[1] || 1.9;
    return function (divs) {
      var divs = divs || [];
      var n = divs[0] || 12;
      var m = divs[1] || 12;
      return p.torusSurface(r_min, r_max, n, m);
    };
  };

  /**
   * TORUS_SOLID
   * 
   * @param {Array} dims
   * @param {Number} [dims[0]=0.1] r min
   * @param {Number} [dims[1]=0.9] r max
   * @return {Function}
   *   @param {Array} divs
   *   @param {Number} [divs[0]=12] n
   *   @param {Number} [divs[1]=8]  m
   *   @param {Number} [divs[1]=8]  p
   *   @return {plasm.Model} a torus surface
   * @api public
   */

  var TORUS_SOLID = 
  fun.TORUS_SOLID = function (dims) {
    var dims = dims || [];
    var r_min = dims[0] || 0.1;
    var r_max = dims[1] || 0.9;
    return function (divs) {
      var divs = divs || [];
      var n = divs[0] || 12;
      var m = divs[1] || 8;
      var q = divs[2] || 8;
      return p.torusSolid(r_min, r_max, n, m, q);
    };
  };

  /**
   * TRIANGLE_STRIP
   * 
   * @param {Array} points
   * @return {plasm.Model} triangle strip
   * @api public
   */

  var TRIANGLE_STRIP = 
  fun.TRIANGLE_STRIP = function (points) {
    return p.triangleStrip(points);
  };

  /**
   * TRIANGLEFAN
   * 
   * @param {Array} points
   * @return {plasm.Model} triangle strip
   * @api public
   */

  var TRIANGLE_FAN = 
  fun.TRIANGLE_FAN = function (points) {
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