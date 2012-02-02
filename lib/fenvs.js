(function() {
  var E, INTERVALS, MAP, PI, abs, acos, asin, atan, atan2, cart2cyl2d, cart2cyl3d, ceil, circle, cos, cube, cuboid, cylsurface, exp, floor, graph, h, helix, idnt, log, m, n, polyline, r, round, s, simplex, sin, sqrt, t, tan, triangle_array, triangle_strip, trianglefan;

  PI = Math.PI, E = Math.E, log = Math.log, sin = Math.sin, cos = Math.cos, tan = Math.tan, asin = Math.asin, acos = Math.acos, atan = Math.atan, atan2 = Math.atan2, ceil = Math.ceil, floor = Math.floor, sqrt = Math.sqrt, exp = Math.exp, abs = Math.abs, round = Math.round;

  s = function(coords) {
    return function(params) {
      return function(obj) {
        return "TODO";
      };
    };
  };

  t = function(coords) {
    return function(params) {
      return function(obj) {
        return "TODO";
      };
    };
  };

  r = function(coords) {
    return function(angle) {
      return function(obj) {
        return "TODO";
      };
    };
  };

  idnt = function(d) {
    return numeric.identity(d);
  };

  cuboid = function(sides) {
    return SIMPLEXGRID(AA(LIST)(sides));
  };

  cube = function(d) {
    return cuboid(REPEAT(d)([1]));
  };

  simplex = function(d) {
    var cells, k, vertices, _i, _results;
    vertices = CAT([
      [
        (function() {
          var _results;
          _results = [];
          for (k = 0; 0 <= d ? k < d : k > d; 0 <= d ? k++ : k--) {
            _results.push(0);
          }
          return _results;
        })()
      ], idnt(d)
    ]);
    cells = [
      (function() {
        _results = [];
        for (var _i = 0; 0 <= d ? _i <= d : _i >= d; 0 <= d ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this)
    ];
    return new SimplicialComplex(vertices, cells);
  };

  polyline = function(points) {
    var cells, k;
    cells = (function() {
      var _ref, _results;
      _results = [];
      for (k = 0, _ref = points.length - 1; 0 <= _ref ? k < _ref : k > _ref; 0 <= _ref ? k++ : k--) {
        _results.push([k, k + 1]);
      }
      return _results;
    })();
    return new SimplicialComplex(points, cells);
  };

  triangle_strip = function(points) {
    var cells, k;
    cells = (function() {
      var _ref, _results;
      _results = [];
      for (k = 0, _ref = points.length - 2; 0 <= _ref ? k < _ref : k > _ref; 0 <= _ref ? k++ : k--) {
        _results.push([k, k + 1, k + 2]);
      }
      return _results;
    })();
    return new SimplicialComplex(points, cells);
  };

  trianglefan = function(points) {
    var cells, center, edge, edges, _i, _ref, _results;
    edges = polyline(points);
    center = CENTROID(edges)((function() {
      _results = [];
      for (var _i = 0, _ref = edges.vertices.m; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this));
    points = AR([edges.vertices.verts, [center]]);
    cells = (function() {
      var _j, _len, _ref2, _results2;
      _ref2 = edges.faces.cells[1];
      _results2 = [];
      for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
        edge = _ref2[_j];
        _results2.push(AR([edge, [points.length - 1]]));
      }
      return _results2;
    })();
    return new SimplicialComplex(points, cells);
  };

  triangle_array = function(m, n, points) {
    var out;
    out = SIMPLEXGRID([REPEAT(m)(1), REPEAT(n)(1)]);
    return new SimplicialComplex(CAT(points), out.faces.cells[2]);
  };

  INTERVALS = function(tip) {
    return function(n) {
      return SIMPLEXGRID([REPEAT(n)(tip / n)]);
    };
  };

  MAP = function(funs) {
    return function(pol) {
      var d_cells, points, v;
      points = (function() {
        var _i, _len, _ref, _results;
        _ref = pol.vertices.verts;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          v = _ref[_i];
          _results.push(CONS(funs)(v));
        }
        return _results;
      })();
      d_cells = pol.faces.cells[pol.faces.dim];
      return new SimplicialComplex(points, d_cells);
    };
  };

  circle = function(radius, n) {
    var domain;
    if (n == null) n = 32;
    domain = SIMPLEXGRID([REPEAT(n)(2 * PI / n)]);
    return MAP([sin, cos])(domain).s([0, 1], [radius, radius]);
  };

  graph = function(domain) {
    return function(funs) {
      return MAP(funs)(domain);
    };
  };

  helix = function(radius, pitch, n, turns) {
    var domain;
    if (radius == null) radius = 1;
    if (pitch == null) pitch = 1;
    if (n == null) n = 24;
    if (turns == null) turns = 1;
    domain = INTERVALS(2 * PI * turns)(n * turns);
    return graph(domain)([sin, cos, ID]).s([0, 1, 2], [radius, radius, pitch / (2 * PI)]);
  };

  cart2cyl2d = function() {
    var fx, fy, fz;
    fx = function(_arg) {
      var u, v;
      u = _arg[0], v = _arg[1];
      return cos(u);
    };
    fy = function(_arg) {
      var u, v;
      u = _arg[0], v = _arg[1];
      return sin(u);
    };
    fz = function(_arg) {
      var u, v;
      u = _arg[0], v = _arg[1];
      return v;
    };
    return [fx, fy, fz];
  };

  cart2cyl3d = function() {
    var fx, fy, fz;
    fx = function(_arg) {
      var u, v, w;
      u = _arg[0], v = _arg[1], w = _arg[2];
      return v * cos(u);
    };
    fy = function(_arg) {
      var u, v, w;
      u = _arg[0], v = _arg[1], w = _arg[2];
      return v * sin(u);
    };
    fz = function(_arg) {
      var u, v, w;
      u = _arg[0], v = _arg[1], w = _arg[2];
      return w;
    };
    return [fx, fy, fz];
  };

  cylsurface = function(r, h, n, m) {
    var domain;
    if (r == null) r = 1;
    if (h == null) h = 1;
    if (n == null) n = 16;
    if (m == null) m = 2;
    domain = SIMPLEXGRID([REPEAT(n)(2 * PI / n), REPEAT(m)(1.0 / m)]);
    return MAP(cart2cyl2d())(domain).s([0, 1, 2], [r, r, h]);
  };

  viewer.draw(cylsurface(r = 0.5, h = 3, n = 32, m = 12));

  /*	
  
  cart2cyl3d = (point) -> "TODO"
  
  cylsolid = (r=1,h=1,n=16,m=1,p=1) -> "TODO"
  
  cart2torus2d = (r,R) -> (point) -> "TODO"
  
  torus_surface = (r=1,R=3,n=12,m=8) -> "TODO"
  
  cart2torus3d = (r,R) -> (point) -> "TODO"
  
  torus_solid = (r=1,R=3,n=8,m=16,p=1) -> "TODO"
  
  schlegel = (pol) -> (point) -> "TODO"
  
  intervals = (tip) -> (n) -> "TODO"
  
  graph = (domain) -> (funs) -> (point) -> "TODO"
  
  circumpherence = (r,nsides=24) -> "TODO"
  
  
  polygon = (n) -> 
  	points = [[cos(alpha),sin(alpha)]
  			  for alpha in (scipy.linspace(0.0, 2*pi, n+1) + (pi*n)/2)]
  	return trianglefan(points)	
  
  circle2d = (n=32) -> polygon(n)
  */

}).call(this);
