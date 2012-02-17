(function() {
  var AQUA, BLACK, BLUE, Bucket, FUCHSIA, GRAY, GREEN, LIME, MAROON, NAVY, OLIVE, PURPLE, RED, SILVER, TEAL, WHITE, YELLOW, affineMapping, closetozero, colors, d2h, grading, h2d, k, key, keysConcat, m, makeRegionDict, mapping, model, object, points, randomPoints, randomSimplex, rn, scale, simplexMatrix, spacePartition, theMap, _i, _j, _ref, _ref2, _ref3, _ref4, _results, _results2,
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

  d2h = function(d) {
    return d.toString(36);
  };

  h2d = function(h) {
    return parseInt(h, 36);
  };

  keysConcat = function(key, keys) {
    var pair, _i, _len, _ref, _results;
    _ref = DISTL([key, keys]);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      pair = _ref[_i];
      _results.push(pair.join(""));
    }
    return _results;
  };

  /*
  PRINT "(d2h 7000237) is '461f1' =", (d2h 7000237) is "461f1"
  PRINT '(h2d "461f1") is 7000237 =', (h2d "461f1") is 7000237
  PRINT "d2h 28 =", d2h 28
  PRINT 'h2d "S" =', h2d "S"
  PRINT 'keysConcat "W",["A", "B", "0", "9", "F", "A"] =', keysConcat "W",["A", "B", "0", "9", "F", "A"]
  PRINT 'keysConcat "E06HW",["A", "B", "0", "9", "F", "A"] =', keysConcat "E06HW",["A", "B", "0", "9", "F", "A"]
  PRINT '(AA)(h2d)(["E06HWA", "E06HWB", "E06HW0", "E06HW9", "E06HWF", "E06HWA"]) =', (AA)(h2d)(["E06HWA", "E06HWB", "E06HW0", "E06HW9", "E06HWF", "E06HWA"])
  numCodes = [846829594, 846829595, 846829584, 846829593, 846829599, 846829594]
  PRINT "(d2h(code%36) for code in numCodes) =", (d2h (code % 36) for code in numCodes)
  */

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
    return d2h(parseInt(AA(grade)(point).join(""), 2));
  };

  mapping = function(basis) {
    if (numeric.det(basis)) {
      return numeric.inv(basis);
    } else {
      return basis;
    }
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

  closetozero = function(number) {
    if (Math.abs(number) < 1.0E-2) {
      return true;
    } else {
      return false;
    }
  };

  randomSimplex = function(verts, d) {
    var cell, index, isSquare, m, mat, _ref;
    isSquare = function(mat) {
      if (mat.length === mat[0].length) {
        return true;
      } else {
        return false;
      }
    };
    _ref = [[], verts.length], cell = _ref[0], m = _ref[1];
    while (cell.length <= d) {
      index = Math.round(Math.random() * m);
      if (!(__indexOf.call(cell, index) >= 0)) cell.push(index);
      mat = simplexMatrix(verts, cell);
      if (cell.length === d + 1 && isSquare(mat) && closetozero(numeric.det(mat))) {
        cell = [];
      }
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
      bucket[d2h(k)] = [];
    }
    for (k = 0; 0 <= m ? k < m : k > m; 0 <= m ? k++ : k--) {
      if ((tokens[k] != null) && (points[k] != null) && (bucket[tokens[k]] != null)) {
        bucket[tokens[k]].push(points[k]);
      }
    }
    return [bucket, theMap];
  };

  makeRegionDict = function(pointSet, d) {
    var bucket, buckets, k, key, keys, merge, newBucket, newBuckets, newKey, newKeys, points, theMap, tosplit, _ref, _ref2, _ref3;
    merge = function(obj1, obj2) {
      var key;
      for (key in obj2) {
        obj1[key] = obj2[key];
      }
      return obj1;
    };
    _ref = spacePartition(pointSet), bucket = _ref[0], theMap = _ref[1];
    tosplit = true;
    while (tosplit) {
      tosplit = false;
      newBuckets = {};
      for (key in bucket) {
        newBucket = {};
        if (bucket[key].length > (d + 1) * 30) {
          tosplit = true;
          points = CLONE(bucket[key]);
          _ref2 = spacePartition(points), buckets = _ref2[0], theMap = _ref2[1];
          keys = (function() {
            var _results;
            _results = [];
            for (k in buckets) {
              _results.push(k);
            }
            return _results;
          })();
          newKeys = keysConcat(key, keys);
          for (k = 0, _ref3 = keys.length; 0 <= _ref3 ? k < _ref3 : k > _ref3; 0 <= _ref3 ? k++ : k--) {
            newBucket[newKeys[k]] = buckets[keys[k]];
          }
          merge(newBuckets, newBucket);
        } else {
          if (bucket[key].length > 0) {
            newKey = keysConcat(key, ["0"]);
            newBuckets[newKey] = bucket[key];
          }
        }
      }
      bucket = CLONE(newBuckets);
    }
    return newBuckets;
  };

  rn = 3;

  points = randomPoints(rn, m = 2000 * Math.pow(2, rn), scale = 8).t((function() {
    _results = [];
    for (var _i = 0; 0 <= rn ? _i < rn : _i > rn; 0 <= rn ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this), REPEAT(rn)(-scale / 2));

  object = [];

  _ref = spacePartition(points.verts), Bucket = _ref[0], theMap = _ref[1];

  for (k = 1, _ref2 = Math.pow(2, rn + 1); 1 <= _ref2 ? k < _ref2 : k > _ref2; 1 <= _ref2 ? k++ : k--) {
    key = d2h(k);
    if ((Bucket[key] != null) && Bucket[key].length > 0) {
      object.push(new SimplicialComplex(Bucket[key], AA(LIST)((function() {
        _results2 = [];
        for (var _j = 0, _ref3 = Bucket[key].length; 0 <= _ref3 ? _j < _ref3 : _j > _ref3; 0 <= _ref3 ? _j++ : _j--){ _results2.push(_j); }
        return _results2;
      }).apply(this))));
    }
  }

  model = viewer.draw(object);

  for (k = 1, _ref4 = model.length; 1 <= _ref4 ? k < _ref4 : k > _ref4; 1 <= _ref4 ? k++ : k--) {
    model[k].color(colors[k]);
  }

  /*
  
  PRINT "**** points.m =", points.m
  
  Bucket = makeRegionDict(points.verts, rn)
  PRINT "**** Bucket =", Bucket
  n = 0
  for key of Bucket
  	if Bucket[key]? and Bucket[key].length > 0 
  		#object.push new SimplicialComplex(Bucket[key], AA(LIST)([0...Bucket[key].length]))
  		n += Bucket[key].length
  		if Bucket[key].length > 2
  				object.push TRIANGLESTRIP(Bucket[key])
  		else if Bucket[key].length > 1
  			object.push POLYLINE(Bucket[key])
  		else 
  			object.push new SimplicialComplex(Bucket[key], AA(LIST)([0...Bucket[key].length]))
  model = viewer.draw object
  model[k].color(colors[k%7]) for k in [0...model.length]
  
  PRINT "n =", n
  */

}).call(this);
