(function() {
  var AQUA, BLACK, BLUE, Bucket, FUCHSIA, GRAY, GREEN, LIME, MAROON, NAVY, OLIVE, PURPLE, RED, SILVER, TEAL, WHITE, YELLOW, affineMapping, closetozero, d2h, grading, h2d, k, key, keysConcat, m, makeRegionDict, mapping, model, object, palette, points, preview, primitive, randomPoints, randomSimplex, rn, scale, simplexMatrix, spacePartition, _i, _ref, _results,
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

  palette = [MAROON, RED, LIME, BLUE, AQUA, FUCHSIA, YELLOW, WHITE, SILVER, GRAY, BLACK, OLIVE, GREEN, TEAL, NAVY, PURPLE];

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
    var binaryDigits, grade;
    grade = function(x) {
      if (x >= 0.0) {
        return '1';
      } else {
        return '0';
      }
    };
    binaryDigits = AA(grade)(point).join("");
    return d2h(parseInt(binaryDigits, 2));
  };

  mapping = function(basis) {
    if (numeric.det(basis)) {
      return numeric.inv(basis);
    } else {
      return basis;
    }
  };

  affineMapping = function(matrix) {
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
      return affinePoints = numeric.dot(homogeneousPoints, matrix);
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
    var buckets, d, k, m, matrix, referenceCell, referenceSimplex, tokens, _ref;
    d = points[0].length;
    m = points.length;
    referenceCell = randomSimplex(points, d);
    referenceSimplex = simplexMatrix(points, referenceCell);
    matrix = mapping(referenceSimplex);
    tokens = AA(grading)(affineMapping(matrix)(points));
    buckets = {};
    for (k = 1, _ref = Math.pow(2, d + 1); 1 <= _ref ? k < _ref : k > _ref; 1 <= _ref ? k++ : k--) {
      buckets[d2h(k)] = [];
    }
    for (k = 0; 0 <= m ? k < m : k > m; 0 <= m ? k++ : k--) {
      if ((tokens[k] != null) && (points[k] != null) && (buckets[tokens[k]] != null)) {
        buckets[tokens[k]].push(points[k]);
      }
    }
    return [buckets, matrix];
  };

  makeRegionDict = function(pointSet, d, pointQuantity) {
    var Buckets, buckets, currentBuckets, k, key, keys, merge, newBucket, newKey, newKeys, points, theMap, tosplit, _ref, _ref2, _ref3;
    if (pointQuantity == null) pointQuantity = 30;
    merge = function(obj1, obj2) {
      var key;
      for (key in obj2) {
        obj1[key] = obj2[key];
      }
      return obj1;
    };
    _ref = spacePartition(pointSet), currentBuckets = _ref[0], theMap = _ref[1];
    tosplit = true;
    while (tosplit) {
      tosplit = false;
      Buckets = {};
      for (key in currentBuckets) {
        newBucket = {};
        if (currentBuckets[key].length > (d + 1) * pointQuantity) {
          tosplit = true;
          points = CLONE(currentBuckets[key]);
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
          merge(Buckets, newBucket);
        } else {
          if (currentBuckets[key].length > 0) {
            newKey = keysConcat(key, ["0"]);
            Buckets[newKey] = currentBuckets[key];
          }
        }
      }
      currentBuckets = CLONE(Buckets);
    }
    return Buckets;
  };

  preview = function(points, object, primitive) {
    var n, _i, _results;
    if (primitive == null) primitive = "POLYLINE";
    n = points.length;
    if (primitive === "POLYMARKER") {
      object.push(POLYMARKER(points));
    } else if (primitive === "TRIANGLESTRIP" && n > 2) {
      object.push(TRIANGLESTRIP(points));
    } else if (n > 1) {
      object.push(POLYLINE(points));
    } else {
      object.push(new SimplicialComplex(points, AA(LIST)((function() {
        _results = [];
        for (var _i = 0; 0 <= n ? _i < n : _i > n; 0 <= n ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this))));
    }
    return object;
  };

  rn = 3;

  points = randomPoints(rn, m = 2000 * Math.pow(2, rn), scale = 8).t((function() {
    _results = [];
    for (var _i = 0; 0 <= rn ? _i < rn : _i > rn; 0 <= rn ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this), REPEAT(rn)(-scale / 2));

  object = [];

  Bucket = makeRegionDict(points.verts, rn);

  for (key in Bucket) {
    if ((Bucket[key] != null) && Bucket[key].length > 0) {
      preview(Bucket[key], object, primitive = "POLYMARKER");
    }
  }

  model = viewer.draw(object);

  for (k = 0, _ref = model.length; 0 <= _ref ? k < _ref : k > _ref; 0 <= _ref ? k++ : k--) {
    model[k].color(palette[k % 15]);
  }

}).call(this);
