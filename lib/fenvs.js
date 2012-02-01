(function() {
  var E, PI, abs, acos, alpha, asin, atan, atan2, ceil, cells, cos, cube, cuboid, exp, floor, idnt, k, log, points, polyline, r, round, s, simplex, sin, sqrt, t, tan, triangle_strip, trianglefan;

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

  MYPRINT("idnt(3) =", idnt(3));

  cuboid = function(sides) {
    return SIMPLEXGRID(AA(LIST)(sides));
  };

  console.log("AA(LIST)([1,2,3]) =", AA(LIST)([1, 2, 3]));

  console.log("BOUNDARY cuboid([1,2,3])", BOUNDARY(cuboid([1, 2, 3])));

  cube = function(d) {
    return cuboid(REPEAT(d)([1]));
  };

  console.log("REPEAT(3) [1] =", REPEAT(3)([1]));

  console.log("BOUNDARY cube(3)", BOUNDARY(cube(3)));

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

  console.log("CAT [[(0 for k in [0...3])], idnt(3)] =", CAT([
    [
      (function() {
        var _results;
        _results = [];
        for (k = 0; k < 3; k++) {
          _results.push(0);
        }
        return _results;
      })()
    ], idnt(3)
  ]));

  console.log("cells = [[0..3]] =", cells = [[0, 1, 2, 3]]);

  console.log("BOUNDARY simplex(3)", BOUNDARY(simplex(3)));

  polyline = function(points) {
    var k;
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

  console.log("polyline [[0,0],[1,0],[0,1],[1,1],[0,0,0]]", polyline([[0, 0, 0], [1, 0, 0], [0, 1, 1], [1, 1, 1], [0, 0, 0]]));

  triangle_strip = function(points) {
    var k;
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

  console.log("triangle_strip [[0,0,0],[0,0,1],[1,0,0],[0,1,0],[0,0,0],[0,0,1]]", triangle_strip([[0, 0, 0], [0, 0, 1], [1, 0, 0], [0, 1, 0], [0, 0, 0], [0, 0, 1]]));

  points = [[0, 3], [1, 2], [3, 3], [2, 2], [3, 0], [2, 1], [0, 0], [1, 1], [0, 3], [1, 2]];

  console.log("points", points);

  console.log("triangle_strip(points)", triangle_strip(points));

  console.log("BOUNDARY triangle_strip(points)", BOUNDARY(triangle_strip(points)));

  console.log("EXTRUDE([1]) triangle_strip(points)", EXTRUDE([1])(triangle_strip(points)));

  console.log("BOUNDARY EXTRUDE([1]) triangle_strip(points)", BOUNDARY(EXTRUDE([1])(triangle_strip(points))));

  console.log("BOUNDARY EXTRUDE([1,-1,1]) triangle_strip(points)", BOUNDARY(EXTRUDE([1, -1, 1])(triangle_strip(points))));

  trianglefan = function(points) {
    var center, edge, edges, _i, _ref, _results;
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

  points = (function() {
    var _i, _len, _ref, _results;
    _ref = numeric.linspace(0.0, 2 * Math.PI, 7);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      alpha = _ref[_i];
      _results.push([cos(alpha), sin(alpha)]);
    }
    return _results;
  })();

  console.log("points =", points);

  points = AA(SUM)(DISTR([points, [2.0, 1.0]]));

  console.log("translated points =", points);

  console.log("trianglefan points", trianglefan(points));

  console.log("BOUNDARY trianglefan points", BOUNDARY(trianglefan(points)));

  viewer.draw(BOUNDARY(trianglefan(points)));

  /*
  
  triangle_array = (m,n,points) -> "TODO"
  
  cart2cyl2d = (point) -> "TODO"
  
  cylsurface = (r=1,h=1,n=16,m=2) -> "TODO"
  
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
  
  helix = (radius=1,pitch=1,n=24,turns=1) -> "TODO"
  
  polygon = (n) -> 
  	points = [[cos(alpha),sin(alpha)]
  			  for alpha in (scipy.linspace(0.0, 2*pi, n+1) + (pi*n)/2)]
  	return trianglefan(points)	
  
  circle2d = (n=32) -> polygon(n)
  */

}).call(this);
