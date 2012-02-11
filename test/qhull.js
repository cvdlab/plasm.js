(function() {
  var affineMapping, blue, closetozero, colors, cyan, extremePoints, grading, green, m, magenta, mapping, obj, points, randomPoints, randomSimplex, red, rn, scale, simplexMatrix, spacePartition, white, yellow, _i, _ref, _ref2, _results,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = [[1, 0, 0], [0, 1, 0], [0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 0], [1, 1, 1]], red = _ref[0], green = _ref[1], blue = _ref[2], cyan = _ref[3], magenta = _ref[4], yellow = _ref[5], white = _ref[6];

  colors = [red, green, blue, cyan, magenta, yellow, white];

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

  extremePoints = function(points) {
    return function(coords) {
      var coordVects, k, maxCoords, point, result, _i, _j, _len, _len2;
      coordVects = TRANS(points);
      maxCoords = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = coords.length; _i < _len; _i++) {
          k = coords[_i];
          _results.push(Math.max.apply(null, coordVects[k]));
        }
        return _results;
      })();
      result = [];
      for (_i = 0, _len = coords.length; _i < _len; _i++) {
        k = coords[_i];
        for (_j = 0, _len2 = points.length; _j < _len2; _j++) {
          point = points[_j];
          if (point[k] === maxCoords[k]) result.push(point);
        }
      }
      return result;
    };
  };

  randomSimplex = function(verts, d) {
    var cell, index, m, mat, _ref2;
    _ref2 = [[], verts.length], cell = _ref2[0], m = _ref2[1];
    while (cell.length <= d) {
      index = Math.round(Math.random() * m);
      if (!(__indexOf.call(cell, index) >= 0)) cell.push(index);
      mat = simplexMatrix(verts, cell);
      if (cell.length === d + 1 && closetozero(numeric.det(mat))) cell = [];
    }
    return cell;
  };

  spacePartition = function(points) {
    var bucket, d, k, object, referenceCell, referenceSimplex, theMap, tokens, _i, _ref2, _ref3, _ref4, _ref5, _ref6, _results, _results2;
    d = points[0].length;
    referenceCell = randomSimplex(points, d);
    referenceSimplex = simplexMatrix(points, referenceCell);
    theMap = mapping(referenceSimplex);
    tokens = AA(grading)(affineMapping(theMap)(points));
    bucket = Array;
    object = Array;
    for (k = 0, _ref2 = Math.pow(2, d + 1); 0 <= _ref2 ? k < _ref2 : k > _ref2; 0 <= _ref2 ? k++ : k--) {
      bucket[k] = [];
    }
    for (k = 0, _ref3 = points.length; 0 <= _ref3 ? k < _ref3 : k > _ref3; 0 <= _ref3 ? k++ : k--) {
      bucket[tokens[k]].push(points[k]);
    }
    MYPRINT("bucket ", bucket);
    for (k = 0, _ref4 = Math.pow(2, d + 1) / 2; 0 <= _ref4 ? k < _ref4 : k > _ref4; 0 <= _ref4 ? k++ : k--) {
      if (bucket[k] !== []) {
        object[k] = new SimplicialComplex(bucket[k], AA(LIST)((function() {
          _results = [];
          for (var _i = 0, _ref5 = bucket[k].length; 0 <= _ref5 ? _i < _ref5 : _i > _ref5; 0 <= _ref5 ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this)));
      }
    }
    _results2 = [];
    for (k = 0, _ref6 = Math.pow(2, d + 1) / 2; 0 <= _ref6 ? k < _ref6 : k > _ref6; 0 <= _ref6 ? k++ : k--) {
      if (object[k] !== []) _results2.push(viewer.draw(object[k]));
    }
    return _results2;
  };

  points = randomPoints(rn = 3, m = 5000, scale = 8).t([0, 1, 2], [-4, -4, -4]);

  obj = new SimplicialComplex(points.verts, AA(LIST)((function() {
    _results = [];
    for (var _i = 0, _ref2 = points.m; 0 <= _ref2 ? _i < _ref2 : _i > _ref2; 0 <= _ref2 ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this)));

  MYPRINT("spacePartition(points) =", spacePartition(obj.vertices.verts));

}).call(this);
