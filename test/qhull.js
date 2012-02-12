(function() {
  var AQUA, BLACK, BLUE, FUCHSIA, GRAY, GREEN, LIME, MAROON, NAVY, OLIVE, PURPLE, RED, SILVER, TEAL, WHITE, YELLOW, affineMapping, bucket, closetozero, colors, grading, k, m, mapping, model, object, points, randomPoints, randomSimplex, rn, scale, simplexMatrix, spacePartition, _i, _j, _ref, _ref2, _ref3, _results, _results2,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  WHITE = [1.0, 1.0, 1.0];

  SILVER = [0.8, 0.8, 0.8];

  GRAY = [0.5, 0.5, 0.5];

  BLACK = [0.0, 0.0, 0.0];

  RED = [1.0, 0.0, 0.0];

  MAROON = [0.5, 0.0, 0.0];

  YELLOW = [1.0, 1.0, 0.0];

  OLIVE = [0.5, 0.5, 0.0];

  LIME = [0.0, 1.0, 0.0];

  GREEN = [0.0, 0.5, 0.0];

  AQUA = [0.0, 1.0, 1.0];

  TEAL = [0.0, 0.5, 0.5];

  BLUE = [0.0, 0.0, 1.0];

  NAVY = [0.0, 0.0, 0.5];

  FUCHSIA = [1.0, 0.0, 1.0];

  PURPLE = [0.5, 0.0, 0.5];

  colors = [MAROON, RED, LIME, BLUE, AQUA, FUCHSIA, YELLOW, WHITE, SILVER, GRAY, BLACK, OLIVE, GREEN, TEAL, NAVY, PURPLE];

  randomPoints = function(rn, m, scale) {
    var k, point;
    if (rn == null) rn = 2;
    if (m == null) m = 40;
    if (scale == null) scale = 2;
    return new PointSet((function() {
      var _results;
      _results = [];
      for (point = 0; 0 <= m ? point < m : point > m; 0 <= m ? point++ : point--) {
        _results.push((function() {
          var _results2;
          _results2 = [];
          for (k = 0; 0 <= rn ? k < rn : k > rn; 0 <= rn ? k++ : k--) {
            _results2.push(Math.random() * scale);
          }
          return _results2;
        })());
      }
      return _results;
    })());
  };

  simplexMatrix = function(verts, cell) {
    var k, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = cell.length; _i < _len; _i++) {
      k = cell[_i];
      _results.push(AR([verts[k], 1]));
    }
    return _results;
  };

  grading = function(point) {
    var grade;
    grade = function(x) {
      if (x >= 0.0) {
        return '1';
      } else {
        return '0';
      }
    };
    return parseInt(AA(grade)(point).join(""), 2);
  };

  mapping = function(basis) {
    return numeric.inv(basis);
  };

  affineMapping = function(mapping) {
    return function(cartesianPoints) {
      var affinePoints, homogeneousPoints, point;
      homogeneousPoints = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = cartesianPoints.length; _i < _len; _i++) {
          point = cartesianPoints[_i];
          _results.push(AR([point, 1]));
        }
        return _results;
      })();
      return affinePoints = numeric.dot(homogeneousPoints, mapping);
    };
  };

  /*
  referencePoints = randomPoints(2,3,1)
  MYPRINT "referencePoints =",referencePoints
  referenceSimplex = simplexMatrix(referencePoints.verts,[0,1,2])
  MYPRINT "referenceSimplex =",referenceSimplex
  theMap = mapping(referenceSimplex)
  MYPRINT "theMap =",theMap
  standardBasis = affineMapping(theMap)(referencePoints.verts)
  MYPRINT "standardBasis =",standardBasis
  MYPRINT "basis =",AA(CODE)(standardBasis)
  */

  closetozero = function(number) {
    if (Math.abs(number) < 1.0E-5) {
      return true;
    } else {
      return false;
    }
  };

  /*
  extremePoints = (points) -> (coords) ->
  	coordVects = TRANS(points)
  	maxCoords = (Math.max.apply(null, coordVects[k])  for k in coords)
  	result = []
  	for k in coords
  		for point in points
  			if point[k] == maxCoords[k]
  				result.push point
  	result
  */

  randomSimplex = function(verts, d) {
    var cell, index, m, mat, _ref;
    _ref = [[], verts.length], cell = _ref[0], m = _ref[1];
    while (cell.length <= d) {
      index = Math.round(Math.random() * m);
      if (!(__indexOf.call(cell, index) >= 0)) cell.push(index);
      mat = simplexMatrix(verts, cell);
      if (cell.length === d + 1 && closetozero(numeric.det(mat))) cell = [];
    }
    return cell;
  };

  spacePartition = function(points) {
    var bucket, d, k, m, referenceCell, referenceSimplex, theMap, tokens, _ref;
    d = points[0].length;
    m = points.length;
    referenceCell = randomSimplex(points, d);
    referenceSimplex = simplexMatrix(points, referenceCell);
    theMap = mapping(referenceSimplex);
    tokens = AA(grading)(affineMapping(theMap)(points));
    bucket = {};
    for (k = 1, _ref = Math.pow(2, d + 1); 1 <= _ref ? k < _ref : k > _ref; 1 <= _ref ? k++ : k--) {
      bucket[k] = [];
    }
    for (k = 0; 0 <= m ? k < m : k > m; 0 <= m ? k++ : k--) {
      bucket[tokens[k]].push(points[k]);
    }
    return bucket;
  };

  /*
  makeRegionDict = (pointSet,d) ->
  	# recursive contruction of dictionaries in crowded subregions
  	regionDict = spacePartition(pointSet)
  	for key of regionDict
  		if regionDict[key].length > d+1
  			if key == (2**(d+1) - 1)
  				regionDict[key] = selectBasis(regionDict[key])
  			else
  				pointSubset = [point[1] for point in regionDict[key]]
  				regionDict[key] = makeRegionDict(PointSet(pointSubset),d)
  		else pass
  	regionDict
  */

  rn = 2;

  points = randomPoints(rn, m = 5000, scale = 8).t((function() {
    _results = [];
    for (var _i = 0; 0 <= rn ? _i < rn : _i > rn; 0 <= rn ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this), REPEAT(rn)(-scale / 2));

  object = [];

  bucket = spacePartition(points.verts);

  MYPRINT("bucket", bucket);

  for (k = 1, _ref = Math.pow(2, rn + 1); 1 <= _ref ? k < _ref : k > _ref; 1 <= _ref ? k++ : k--) {
    if ((bucket[k] != null) && bucket[k].length > 0) {
      object.push(new SimplicialComplex(bucket[k], AA(LIST)((function() {
        _results2 = [];
        for (var _j = 0, _ref2 = bucket[k].length; 0 <= _ref2 ? _j < _ref2 : _j > _ref2; 0 <= _ref2 ? _j++ : _j--){ _results2.push(_j); }
        return _results2;
      }).apply(this))));
    }
  }

  model = viewer.draw(object);

  for (k = 1, _ref3 = model.length; 1 <= _ref3 ? k < _ref3 : k > _ref3; 1 <= _ref3 ? k++ : k--) {
    model[k].color(colors[k]);
  }

}).call(this);
