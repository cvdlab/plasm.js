/*!
 * plasm-fun.js
 * functional environment for plasm.js
 * Copyright (c) 2012 cvd-lab <cvdlab@email.com> (https://github.com/cvd-lab/)
 * MIT License
 */

 !(function (exports) {

  /**
   * Library namespace.
   */

  var fun = exports.fun = {};
  var ƒ = exports.ƒ;
  var plasm = exports.plasm;

  /**
   * Module dependencies.
   */

  if (typeof module !== 'undefined' && module.exports) { // running under node.js
    ƒ = require("./../node_modules/f.js/lib/f.js").ƒ;
    plasm = require("./plasm.js").plasm;
  }

  Object.keys(ƒ).forEach(function (key) {
    fun[key.toUpperCase()] = ƒ[key];
  });

  /**
   * Library version.
   */

  fun.version = '0.2.0';

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
   * K
   * 
   * @param {Object} an object to be stored and returned
   * @return {Function}
   *   @return {Object} the Object passed as first parameter
   * @api public
   */

  var K = 
  fun.K = function (constObject) {
    return function () {
      return constObject;
    };
  };
  
  /**
   * R
   * 
   * @param {Array|Uint32Array} dims
   * @return {Function}
   *   @param {Number|Array|Uint32Array} angle
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
   * Map.
   * 
   * Map `domain` by `mapping` function.
   *
   * @example
   *
   *   var domain = DOMAIN([[0,1]],[0,2*PI]);
   *   var mapping = function (v) { return [SIN(v[0]), COS(v[1])]; });
   *   var model = MAP(mapping)(domain);
   *   DRAW(model);
   *
   * @example
   *
   *   var domain = DOMAIN([[0,1]],[0,2*PI]);
   *   var mapping = [
   *         function (v) { return SIN(v[0]); }, 
   *         function (v) { return COS(v[1]); }
   *       ]);
   *   var model = MAP(mapping)(domain)
   *   DRAW(model);
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
   *   @param {plasm.Model|plasm.Struct} object to extrude
   *   @return {plasm.Model|plasm.Struct} extrusion
   * @api private
   */

  var EXTRUDE =
  fun.EXTRUDE = function (hlist) {
    return function (object) {
      return object.extrude(hlist);
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
   * @param {plasm.Model} model
   * @return {plasm.Model} boundary
   * @api public
   */

  var BOUNDARY = 
  fun.BOUNDARY = function (model) {
    return model.boundary();
  };

  /**
   * Color.
   *
   * @param {Array} rgb rgb
   * @param {Number} [rgb[0] = 0] r
   * @param {Number} [rgb[1] = 0] g
   * @param {Number} [rgb[2] = 0] b
   * @param {Number} [rgb[3] = 1] a
   * @return {Function}
   *   @param {plasm.Model | plasm.Struct} object
   *   @return {plasm.Model | plasm.Struct} colored object
   * @api public
   */

  var COLOR =
  fun.COLOR = function (rgba) {
    return function (object) {
      return object.clone().color(rgba);
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

  var POLYLINE = 
  fun.POLYLINE = function (points) {
    return p.polyline(points);
  };

  /**
   * POLYPOINT
   * 
   * @param {Array} points
   * @return {plasm.Model} a polypoint
   * @api public
   */

  var POLYPOINT =
  fun.POLYPOINT = function (points) {
    return p.polypoint(points);
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
   * PROD
   * cartesian products
   *
   * @param {Array} array
   * @param {plasm.Model} [array[0]] model1
   * @param {plasm.Model} [array[1]] model2
   * @return {plasm.Model} result
   */

  var PROD1x1 = 
  fun.PROD1x1 = function (array) {
    return array[0].prod1x1(array[1]);
  };

  var PROD1x2 = 
  fun.PROD1x2 = function (array) {
    return array[0].prod1x2(array[1]);
  };

  var PROD2x1 = 
  fun.PROD2x1 = function (array) {
    return array[0].prod2x1(array[1]);
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

  /**
   * CUBIC_HERMITE
   * 
   * @param {Function} sel
   * @return {Function}
   *   @param {Array} args
   *   @return {Function}
   *     @param {Array} point
   *     @return {Funciton}
   * @api public
   */

  var CUBIC_HERMIT = 
  fun.CUBIC_HERMITE = function (sel) {
    return function (args) {
      var p1Fn = args[0];
      var p2Fn = args[1];
      var s1Fn = args[2];
      var s2Fn = args[3];

      return function (point) {
        var u = sel(point);
        var u2 = u * u;
        var u3 = u2 * u;

        var p1 = p1Fn instanceof Function ? p1Fn(point) : p1Fn;
        var p2 = p2Fn instanceof Function ? p2Fn(point) : p2Fn;
        var s1 = s1Fn instanceof Function ? s1Fn(point) : s1Fn;
        var s2 = s2Fn instanceof Function ? s2Fn(point) : s2Fn;

        var rn = p1.length;
        var mapped = new Array(rn);
        var i;

        for (i = 0; i < rn; i += 1) {
          mapped[i] = (2*u3-3*u2+1)*p1[i] + (-2*u3+3*u2)*p2[i]+(u3-2*u2+u)*s1[i]+(u3-u2)*s2[i];
        }

        return mapped;
      };
    };
  };

  /**
   * BEZIER
   * 
   * @param {Function} sel
   * @return {Function}
   *   @param {Array} args
   *   @return {Function}
   *     @param {Array} point
   *     @return {Funciton}
   * @api public
   */

  var BEZIER = 
  fun.BEZIER = function (sel) {  
    return function (args) {
      var n = args.length - 1;
      var controldataFn = args;

      return function (point) {
        var t = sel(point);
        var controldata = new Array(n+1);
        var mapped;
        var rn;
        var weight;
        var crtldata;
        var i, k;

        for (i = 0; i <= n; i += 1) {
          crtldata = controldataFn[i];
          controldata[i] = crtldata instanceof Function ? crtldata(point) : crtldata;
        }

        rn = controldata[0].length;
        mapped = new Array(rn);

        for (i = 0; i < rn; i += 1) {
          mapped[i] = 0.0;
        }

        for (i = 0; i <= n; i += 1) {
          weight = CHOOSE([n,i]) * POW([1-t,n-i]) * POW([t,i]);
          for (k = 0; k < rn; k += 1) {
            mapped[k] += weight * controldata[i][k];
          }
        }
        
        return mapped;
      };
    };
  };

  /**
   * CUBIC_UBSPLINE
   * 
   * @param {Function} domain
   * @return {Function}
   *   @param {Array} args
   * @api public
   */

  var CUBIC_UBSPLINE = 
  fun.CUBIC_UBSPLINE = function (domain) {
    return function (args) {
      var q1Fn = args[0];
      var q2Fn = args[1];
      var q3Fn = args[2];
      var q4Fn = args[3];

      return MAP(function (point) {
        var u = S0(point);
        var u2 = u * u;
        var u3 = u2 * u;
        var rn;
        var mapped;
        var i;

        var q1 = q1Fn instanceof Function ? q1Fn(point) : q1Fn;
        var q2 = q2Fn instanceof Function ? q2Fn(point) : q2Fn;
        var q3 = q3Fn instanceof Function ? q3Fn(point) : q3Fn;
        var q4 = q4Fn instanceof Function ? q4Fn(point) : q4Fn;

        rn = q1.length;
        mapped = new Array(rn);

        for (i = 0; i < rn; i +=1) {
          mapped[i] = (1.0/6.0) * ( (-u3+3*u2-3*u+1)*q1[i] + (3*u3-6*u2+4)*q2[i]+ (-3*u3+3*u2+3*u+1)*q3[i] + (u3)*q4[i]);
        }

        return mapped;
      })(domain);
    };
  };

  /**
   * CUBIC_CARDINAL
   * 
   * @param {Function} domain
   * @param {Number} [h=1]
   * @return {Function}
   *   @param {Array} args
   * @api public
   */

  var CUBIC_CARDINAL =
  fun.CUBIC_CARDINAL = function (domain, h) {
    var h = h !== undefined ? h : 1;

    return function (args) {
      var q1Fn = args[0];
      var q2Fn = args[1];
      var q3Fn = args[2];
      var q4Fn = args[3];

      return MAP(function (point) {
        var u = S0(point);
        var u2 = u * u;
        var u3 = u2 * u;
        var rn;
        var mapped;
        var i;

        var q1 = q1Fn instanceof Function ? q1Fn(point) : q1Fn;
        var q2 = q2Fn instanceof Function ? q2Fn(point) : q2Fn;
        var q3 = q3Fn instanceof Function ? q3Fn(point) : q3Fn;
        var q4 = q4Fn instanceof Function ? q4Fn(point) : q4Fn;

        rn = q1.length;
        mapped = new Array(rn);

        for (i = 0; i < rn; i +=1) {
          mapped[i] = (-h*u3+2*h*u2-h*u)*q1[i] +((2-h)*u3+(h-3)*u2+1)*q2[i] + ((h-2)*u3+(3-2*h)*u2+h*u)*q3[i] + (h*u3-h*u2)*q4[i];
        }

        return mapped;
      })(domain);
    };
  };

  /**
   * SPLINE
   * 
   * @param {Function} curve
   * @return {Function}
   *   @param {Array} points
   *   @return {plasm.Struct}
   * @api public
   */

  var SPLINE =
  fun.SPLINE = function (curve) {
    return function (points) {
      var segments = [];
      var length = points.length;
      var tip = length -4 + 1;
      var slice;
      var i;

      for (i = 0; i < tip; i += 1) {
        slice = points.slice(i,i+4);
        segments.push(curve(slice));
      }
        
      return STRUCT(segments);
    };
  };

  /**
   * DE_BOORD
   * Cox and De Boord coefficients 
   *
   * @api private
   */
  var DE_BOORD = function (T, i, k, t, n) {
    var tmin = T[k-1];
    var tmax = T[n+1];
    var ret, num1, div1, num2, div2;

    // DE_BOORDi1(t)
    if (k === 1) { 
      if ((t >= T[i] && t < T[i+1]) || 
          (t === tmax && t >= T[i] && t <= T[i+1])) {
        return 1;
      } else {
        return 0;
      }
    }

    // DE_BOORDik(t)
    ret = 0;
    num1 = t-T[i];
    div1 = T[i+k-1]-T[i];
    
    if (div1 !== 0) {
      ret += (num1/div1) * DE_BOORD(T,i,k-1,t,n);
    }

    num2 = T[i+k]-t;
    div2 = T[i+k]-T[i+1];
    
    if (div2 !== 0) {
      ret += (num2/div2) * DE_BOORD(T,i+1,k-1,t,n);
    }

    return ret;
  }

  /**
   * BSPLINE
   * 
   * @param {Number} degree
   * @return {Function}
   *   @param {Array} knots
   *   @return {Function}
   *     @param {Array} controls
   *     @return {Funciton}
   * @api public
   */

  var BSPLINE =
  fun.BSPLINE = function (degree) {
    return function (knots) {
      return function (controls) {
        var n = controls.length - 1;
        var m = knots.length -1;
        var k = degree + 1;

        // see http://www.na.iac.cnr.it/~bdv/cagd/spline/B-spline/bspline-curve.html
        if (knots.length !== (n+k+1)) {
          throw "Invalid point/knots/degree for bspline!";
        }

        return function (point) {
          var t = point[0];
          var points = new Array(n);
          var rn;
          var control;
          var mapped;
          var coeff;
          var i, j;

          for (i = 0; i <= n; i += 1) {
            control = controls[i];
            points[i] = control instanceof Function ? control(point) : control;
          }

          rn = points[0].length;
          mapped = new Array(rn);

          for (i = 0; i < rn; i += 1) {
            mapped[i] = 0.0;
          }

          for (i = 0; i <= n; i += 1) {
            coeff = DE_BOORD(knots,i,k,t,n);
            for (j = 0; j < rn; j += 1) {
              mapped[j] += points[i][j] * coeff;
            }
          }

          return mapped;
        };
      };
    };
  };

  /**
   * NUBSPLINE
   * 
   * @param {Number} degree
   * @param {Number} [totpoints=80]
   * @return {Function}
   *   @param {Array} knots
   *   @return {Function}
   *     @param {Array} point
   *     @return {plasm.Model}
   * @api public
   */

  var NUBSPLINE =
  fun.NUBSPLINE = function (degree, totpoints) {
    var totpoints = totpoints !== undefined ? totpoints : 80;
    
    return function (knots) {
      return function (points) {
        var m = knots.length;
        var tmin = SMALLEST(knots);
        var tmax = BIGGEST(knots);
        var tsiz = tmax - tmin;
        var size = totpoints - 1;
        var v = new Array(size + 1);
        var domain;
        var i;

        v[0] = -tmin;
        for (i = 1; i <= size; i += 1) {
          v[i] = tsiz / size;
        }

        domain = SIMPLEX_GRID([v]);
        
        return MAP(BSPLINE(degree)(knots)(points))(domain);
      };
    };
  };

  /**
   * NUBS
   * 
   * @parm {Function} sel
   * @return {Function}
   *   @param {Number} degree
   *   @return {Function}
   *     @param {Array} knots
   *     @return {Function}
   *       @param {Array} controls
   *       @return {Funciton}
   * @api public
   */

  var NUBS =
  fun.NUBS = function (sel) {
    return function (degree) {
      return function (knots) {
        return function (controls) {
          var n = controls.length - 1;
          var knotsLength = knots.length;
          var k = degree + 1;

          // see http://www.na.iac.cnr.it/~bdv/cagd/spline/B-spline/bspline-curve.html
          if (knots.length !== (n+k+1)) {
            throw "Invalid point/knots/degree for bspline!";
          }

          return function (point) {
            var t = sel(point);
            var points = new Array(n);
            var kmin = SMALLEST(knots);
            var kmax = BIGGEST(knots);
            var ksize = kmax - kmin;
            var mappedKnots = new Array(knotsLength);
            var rn;
            var control;
            var mapped;
            var coeff;
            var i, j;

            mappedKnots = knots.map(function (knot) {
              return (knot - kmin) / ksize;
            });

            for (i = 0; i <= n; i += 1) {
              control = controls[i];
              points[i] = control instanceof Function ? control(point) : control;
            }

            rn = points[0].length;
            mapped = new Array(rn);

            for (i = 0; i < rn; i += 1) {
              mapped[i] = 0.0;
            } 

            for (i = 0; i <= n; i += 1) {
              coeff = DE_BOORD(mappedKnots,i,k,t,n);
              for (j = 0; j < rn; j += 1) {
                mapped[j] += points[i][j] * coeff;
              }
            }

            return mapped;
          };
        };
      };
    };
  };

  /**
   * RATIONAL_BSPLINE
   * 
   * @param {Number} degree
   * @return {Function}
   *   @param {Array} knots
   *   @return {Function}
   *     @param {Array} controls
   *     @return {Funciton}
   * @api public
   */

  var RATIONAL_BSPLINE =
  fun.RATIONAL_BSPLINE = function (degree) {
    return function (knots) {
      return function (controls) {
        var bspline = BSPLINE(degree)(knots)(controls);

        return function (point) {
          var mapped = bspline(point);
          var last = mapped.slice(-1)[0];

          // rationalize (== divide for the last value)
          if (last !== 0) {
            mapped = mapped.map(function (item) {
              return item / last;
            });
          }
          
          return mapped.slice(0,-1);
        };
      };
    };
  };

  /**
   * NURBSPLINE
   * 
   * @param {Number} degree
   * @param {Number} [totpoints=80]
   * @return {Function}
   *   @param {Array} knots
   *   @return {Function}
   *     @param {Array} points
   *     @return {plasm.Model}
   * @api public
   */

  var NURBSPLINE =
  fun.NURBSPLINE = function (degree, totpoints) {
    var totpoints = totpoints !== undefined ? totpoints : 80;

    return function (knots) {
      return function (points) {
        var m = knots.length;
        var tmin = SMALLEST(knots);
        var tmax = BIGGEST(knots);
        var tsiz = tmax - tmin;
        var size = totpoints - 1;
        var v = new Array(size + 1);
        var domain;
        var i;

        v[0] = -tmin;
        for (i = 1; i <= size; i += 1) {
          v[i] = tsiz / size;
        }

        domain = SIMPLEX_GRID([v]);
        
        return MAP(RATIONAL_BSPLINE(degree)(knots)(points))(domain);
      };
    };
  };

  /**
   * ROTATIONAL_SURFACE
   * 
   * @example
   *   var domain = DOMAIN([[0,1],[0,2*PI]])([20,20]);
   *   var profile = BEZIER(S0)([[0,0,0],[3,0,3],[3,0,5],[0,0,7]]);
   *   var mapping = ROTATIONAL_SURFACE(profile);
   *   var surface = MAP(mapping)(domain);
   *
   * @param {Function} profile mapping
   * @return {Function}
   *   @param {Array|Float32Array} point point to map
   *   @return {Array|Float32Array) point mapped
   * @api public
   */

  var ROTATIONAL_SURFACE =
  fun.ROTATIONAL_SURFACE = function (profile) {
    return function (point) {
      var u = point[0];
      var v = point[1];
      var p = profile(point);
      var f = p[0];
      var h = p[1];
      var g = p[2];
      var ret = [f * COS(v), f * SIN(v), g];
      return ret;
    };
  };

  /**
   * COONS_PATCH
   * 
   * @param {Function} args
   * @return {Function}
   *   @param {Array} point
   *   @return {Funciton}
   * @api public
   */

  var COONS_PATCH = 
  fun.COONS_PATCH = function (args) {
    var su0Fn = args[0];
    var su1Fn = args[1];
    var s0vFn = args[2];
    var s1vFn = args[3];

    return function (point) {
      u = point[0];
      v = point[1];

      var s00 = su0Fn([0,0]);
      var s01 = s0vFn([0,1]);
      var s10 = su0Fn([1,0]);
      var s11 = s1vFn([1,1]);

      var su0 = su0Fn(point);
      var su1 = su1Fn(point);
      var s0v = s0vFn(point);
      var s1v = s1vFn(point);
      
      var rn = su0.length;
      var mapped = new Array(rn);
      
      var i;
    
      for (i = 0; i < rn; i += 1) { mapped[i] = (1-u)*s0v[i] + u*s1v[i] + (1-v)*su0[i] + v*su1[i] - (1-u)*(1-v)*s00[i] - (1-u)*v*s01[i] - u*(1-v)*s10[i] - u*v*s11[i];} 
      
      return mapped;
    };
  };

  /**
   * PROFILEPROD_SURFACE
   * 
   * @example
   * var dom1D = INTERVALS(1)(32);
   * var Su0 = BEZIER(S0)([[0,0,0],[2,0,0],[0,0,4],[1,0,5]]);
   * var curve0 = MAP(Su0)(dom1D);
   * DRAW(COLOR([0,0,1])(curve0));
   *
   * var Su1 = BEZIER(S1)([[0,0,0],[3,-0.5,0],[3,3.5,0],[0,3,0]]);
   * var Su1Draw = BEZIER(S0)([[0,0,0],[3,-0.5,0],[3,3.5,0],[0,3,0]]);
   * var curve1 = MAP(Su1Draw)(dom1D);
   * DRAW(COLOR([1,0,1])(curve1));
   *
   * var dom2D = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]); // DOMAIN([[0,1],[0,1]])([20,20]);
   * var out = MAP(PROFILEPROD_SURFACE([Su0,Su1]))(dom2D);
   * DRAW(out); 
   *
   * @param {Array|Function} profile and section curves
   * @return {Function}
   *   @param {Array|Float32Array} point point to map
   *   @return {Array|Float32Array) point mapped
   * @api public
   */

  var PROFILEPROD_SURFACE =
  fun.PROFILEPROD_SURFACE = function (profiles) {
  var alfaProfile = profiles[0];
  var betaSection = profiles[1];
    return function (point) {
    // Profilo di ALFA
      var pAlfa = alfaProfile(point);
    // Sezione di BETA
    var sBeta = betaSection(point);
    // Punti profilo ALFA
      var xA = pAlfa[0];
      var zA = pAlfa[2];
    // Punti sezione BETA
      var xB = sBeta[0];
      var yB = sBeta[1];
    // Return
      var ret = [xA * xB, xA * yB, zA];
      return ret;
    };
  };
  
  /**
   * RULED_SURFACE
   * 
   * @example
   * var dom2D = T([0,1])([-1,-1])( PROD1x1([INTERVALS(2)(10),INTERVALS(2)(10)]) );
   * var fun1 = function(pt) { return [ pt[0], pt[0], 0 ]; };
   * var fun2 = function(pt) { return [ 1, -1, pt[0] ]; };
   * var out = MAP(RULED_SURFACE([fun1,fun2]))(dom2D);
   * DRAW(out); 
   *
   *
   * @param {Array|Function} an array of function that can map a single point
   * @return {Function}
   *   @param {Array|Float32Array} point point to map
   *   @return {Array|Float32Array) point mapped
   * @api public
   */

  var RULED_SURFACE =
  fun.RULED_SURFACE = function (arrayFuns) {
  var alfaFun = arrayFuns[0];
  var betaFun = arrayFuns[1];
    return function (point) {
    var v = point[1];
    // Generate ALFA points
      var pAlfa = alfaFun(point);
    // Generate BETA points
    var sBeta = betaFun(point);
    // Return
      var ret = [];
    pAlfa.forEach(function(item,index) { ret.push( pAlfa[index] + v*sBeta[index] ); } );
      return ret;
    };
  };

  /**
   * CONICAL_SURFACE
   * 
   * @example
   * var domain = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(6)]);
   * var apex = [0,0,1];
   * var funProfile = BEZIER(S0)([[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0]]);
   * var out = MAP(CONICAL_SURFACE(apex)(funProfile))(domain);
   * DRAW(out); 
   *
   *
   * @param {Array} the cone's vertex (apex)
   * @return {Function} 
   *    @param {Function} profile mapping
   *    @return {Array|Float32Array} point mapped
   * @api public
   */

    var CONICAL_SURFACE =
    fun.CONICAL_SURFACE = function (apex) {
        return function(profile) {
            var apexFun = K(apex);
            var profileDiff = function(apexData, profileFunction) {
                return function(point) {
                    var newPoint = [];
                    var profilePt = profileFunction(point);
                    profilePt.forEach(function(item,index) { newPoint.push( profilePt[index] - apexData[index] ); } );
                    return newPoint;
                };
            };
  
            return RULED_SURFACE([apexFun, profileDiff(apex,profile)]);
        };
    };  
  
  /**
   * CYLINDRICAL_SURFACE
   * 
   * @example
   * var domain = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(6)]);
   * var ncpVector = [0,0,1];
   * var funProfile = BEZIER(S0)([[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0]]);
   * var out = MAP(CYLINDRICAL_SURFACE(funProfile)(ncpVector))(domain);
   * DRAW(out); 
   *
   *
   * @param {Function} profile mapping
   * @return {Function} 
   *    @param {Array} non complanar vector to the curve in the profile mapping
   *    @return {Array|Float32Array} point mapped
   * @api public
   */

  var CYLINDRICAL_SURFACE = 
  fun.CYLINDRICAL_SURFACE = function (profile) {
        return function(vector) {
            return RULED_SURFACE([ profile, CONS(AA(K)(vector)) ]);
        };
    };  

  /**
   * TRIANGLE_DOMAIN
   * @param {Number} n
   * @param {Array} points
   * @return {plasm.Model} triangle domain
   * @api public
   */

  var TRIANGLE_DOMAIN = 
  fun.TRIANGLE_DOMAIN = function (n, points) {
      return p.triangleDomain(n, points);
  };

  /**
   * TRIANGULAR_COONS_PATCH
   * 
   * @param {Array|Function} three profile curves
   * @return {Function}
   *   @param {Array|Float32Array} point point to map
   *   @return {Array|Float32Array) point mapped
   * @api public
   */

  var TRIANGULAR_COONS_PATCH = 
  fun.TRIANGULAR_COONS_PATCH = function (args) {
    var ab0Fn = args[0];
    var bc1Fn = args[1];
    var ca0Fn = args[2];

    return function (point) {
      u = point[0];
      v = point[1];
      w = point[2];

      var Sab0 = ab0Fn instanceof Function ? ab0Fn(point) : ab0Fn;
      var Sbc1 = bc1Fn instanceof Function ? bc1Fn(point) : bc1Fn;
      var Sca0 = ca0Fn instanceof Function ? ca0Fn(point) : ca0Fn;

      var rn = Sab0.length;
      var mapped = new Array(rn);
      
      var i, r, s, t;
    
      if (u === 1) {ur = 0} else {ur = u * v / (v + w)};
      if (v === 1) {vs = 0} else {vs = v * w / (w + u)};
      if (w === 1) {wt = 0} else {wt = w * u / (v + u)};
      
      for (i = 0; i < rn; i += 1) {mapped[i] =  u * Sab0[i] + ur * (Sca0[i] - Sab0[i]) + v * Sca0[i] + vs * (Sbc1[i] - Sca0[i]) + w * Sbc1[i] + wt * (Sab0[i] - Sbc1[i]);};

      return mapped;

    };
  };

}(this));