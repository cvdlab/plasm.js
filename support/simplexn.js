
/*!
 * simplexn
 * dimension-independent geometric kernel based on simplicial complex
 * Copyright (c) 2011 cvd-lab <cvd-lab@email.com> (https://github.com/cvd-lab/)
 * MIT License
 */

!(function (exports) {

  /**
   * Variables.
   */

  var cos = Math.cos;
  var sin = Math.sin;
  var round = Math.round;
  var min = Math.min;
  var abs = Math.abs;
  var pi = Math.PI;
  var random = Math.random;
  var floor = Math.floor;

  /**
   * Library namespace.
   */

  var simplexn = exports.simplexn = {};

  /**
   * Library version.
   */

  simplexn.version = '0.0.0';

  /**
   * utils namespace
   * @api private
   */

  simplexn._utils = {};

  /**
   * _flat
   * Return a flat version of the given array of arrays.
   * 
   * @param {Array} arrays
   * @return {Array} array
   * @api private
   */

  var _flat =
  simplexn._utils._flat = function (arrays) {
    var res = [];

    arrays.forEach(function (item) {
      res = res.concat(item);
    });

    return res;
  };

  /**
   * _repeat
   * Return an array made by n times value item.
   * 
   * @param {Number|Boolean|String} value
   * @param {Number} n
   * @return {Array} array
   * @api private
   */

  var _repeat = 
  simplexn._utils._repeat = function (value, n) {
    var res = [];

    while (n--) res.push(value);

    return res;
  };

  /**
   * _swap
   * Swap i1 to i2 indexed items in array.
   * 
   * @param {Array|BufferArray} array
   * @param {Number} i1
   * @param {Number} i2
   * @api private
   */

  var _swap = 
  simplexn._utils._swap = function (array, i1, i2) {
    var tmp = array[i1];
    array[i1] = array[i2];
    array[i2] = tmp;
  };

  /**
   * _quickSort
   * Quick sort algorithm.
   *
   * @param {Array|BufferArray} array to sort
   * @api private
   */

  var _partition = 
  simplexn._utils._partition = function (array, begin, end, pivot) {
    var piv = array[pivot];
    var store = begin;
    var ix;

    _swap(array, pivot, end - 1);
    for (ix = begin; ix < end - 1; ++ix) {
      if (array[ix] <= piv) {
        _swap(array, store, ix);
        ++store;
      }
    }
    _swap(array, end - 1, store);

    return store;
  };

  var _qsort = 
  simplexn._utils._qsort = function (array, begin, end) {
    if (end - 1 > begin) {
      var pivot = begin + floor(random() * (end - begin));

      pivot = _partition(array, begin, end, pivot);

      _qsort(array, begin, pivot);
      _qsort(array, pivot + 1, end);
    }
  };

  var _quickSort = 
  simplexn._utils._quickSort = function (array) {
    _qsort(array, 0, array.length);
  };

  /**
   * _areEqual
   * 
   * @param {Array|Float32Array|Uint32Array} a1
   * @param {Array|Float32Array|Uint32Array} a2
   * @return {Boolean} true if each item of a1 is === to correspond element of a2
   * @api private
   */

  var _areEqual = 
  simplexn._utils._areEqual = function (a1, a2) {
    var a1Len = a1.length;
    var a2Len = a2.length;
    var i;

    if (a1Len !== a2Len) {
      return false;
    }

    for (i = 0; i < a1Len; i++) {
      if (a1[i] !== a2[i]) {
        return false;
      }
    }
 
    return true;
  };

  /**
   * vector operations namespace
   * @api public
   */

  simplexn.vector = {};

  /**
   * add
   * 
   * @param {Array|Float32Array|Uint32Array} v1
   * @param {Array|Float32Array|Uint32Array} v2
   * @return {Array|Float32Array|Uint32Array}
   * @api public
   */

  var vectorAdd =
  simplexn.vector.add = function (v1, v2) {
    var rn = v1.length;
    var res = new v1.constructor(rn);
    var i;

    for (var i = 0; i < rn; i += 1) {
      res[i] = v1[i] + v2[i];
    };

    return res;
  }

  /**
   * sub
   * 
   * @param {Array|Float32Array|Uint32Array} v1
   * @param {Array|Float32Array|Uint32Array} v2
   * @return {Array|Float32Array|Uint32Array}
   * @api public
   */

  var vectorSub =
  simplexn.vector.sub = function (v1, v2) {
    var rn = v1.length;
    var res = new v1.constructor(rn);
    var i;

    for (var i = 0; i < rn; i += 1) {
      res[i] = v1[i] - v2[i];
    };

    return res;
  }

  /**
   * mul
   * 
   * @param {Array|Float32Array|Uint32Array} v1
   * @param {Array|Float32Array|Uint32Array} v2
   * @return {Array|Float32Array|Uint32Array}
   * @api public
   */

  var vectorMul =
  simplexn.vector.mul = function (v1, v2) {
    var rn = v1.length;
    var res = new v1.constructor(rn);
    var i;

    for (var i = 0; i < rn; i += 1) {
      res[i] = v1[i] * (v2[i] || 1);
    };

    return res;
  }

  /**
   * scalarMul
   * 
   * @param {Number} scalar
   * @param {Array|Float32Array|Uint32Array} v
   * @return {Array|Float32Array|Uint32Array}
   * @api public
   */

  var vectorScalarMul =
  simplexn.vector.scalarMul = function (scalar, v) {
    var rn = v.length;
    var res = new v.constructor(rn);
    var i;

    for (var i = 0; i < rn; i += 1) {
      res[i] = scalar * v[i];
    };

    return res;
  }

  /**
   * scalarDiv
   * 
   * @param {Number} scalar
   * @param {Array|Float32Array|Uint32Array} v
   * @return {Array|Float32Array|Uint32Array}
   * @api public
   */

  var vectorScalarDiv =
  simplexn.vector.scalarDiv = function (scalar, v) {
    var rn = v.length;
    var res = new v.constructor(rn);
    var i;

    for (var i = 0; i < rn; i += 1) {
      res[i] = v[i] / scalar;
    };

    return res;
  }

  /**
   * average
   * 
   * @param {Array} vectors
   * @return {Array|Float32Array|Uint32Array}
   * @api public
   */

  var vectorAvg =
  simplexn.vector.avg = function (vectors) {
    var vectors = vectors || [[]];
    var length = vectors.length;
    var rn = vectors[0].length;
    var res = new vectors[0].constructor(rn);
    var i;

    for (i = 0; i < rn; i += 1) {
      res[i] = 0;
    }

    res = vectors.reduce(vectorAdd, res);
    res = vectorScalarDiv(length, res);

    return res;
  }



  /**
   * PointSet
   * 
   * @constructor
   * @param {Array|Number} points or number of point to initialize;
   * @rn {Number} [rn=points[0].length] points dimension;
   * @api public
   */

  var PointSet = 
  simplexn.PointSet = function (points, rn) {
    points = points || [[]];
    if (typeof points === 'number') {
      this.rn = rn;
      points = points * rn;
    } else {
      this.rn  = points[0].length;
      points = _flat(points);
    }
    this.points = new Float32Array(points);
  };

  /**
   * size
   * 
   * @property
   * @api public
   */

  simplexn.PointSet.prototype.__defineGetter__('size', function () {
    return this.points.length / this.rn;
  });

  /** 
   * clone
   * 
   * @return {PointSet} clone
   * @api public
   */

  simplexn.PointSet.prototype.clone = function () {
    var clone = new PointSet();
    clone.size = this.size;
    clone.rn = this.rn;
    clone.points = new Float32Array(this.points);
    return clone;
  };

  /**
   * equals 
   * 
   * @param {simplexn.PointSet} pointSet
   * @return {Boolean} true if this is equals to the given point set, false otherwise.
   * @api public
   */

  simplexn.PointSet.prototype.equals = function (other) {
    if (this.rn !== other.rn || this.size !== other.size) return false;
    for (var i = 0, l = this.points.length; i < l; i += 1) {
      if (this.points[i] !== other.points[i]) {
        return false;
      }
    }
    return true;
  };


  /**
   * get
   * 
   * @param {Number} index
   * @return {Float32Array} the indexed point
   * @api public
   */

  simplexn.PointSet.prototype.get = function (index) {
    var rn = this.rn;
    var begin = index * rn;
    var end = begin + rn;

    return this.points.subarray(begin, end);
  };

  /**
   * set
   * 
   * @param {Array|Float32Array} points
   * @param {Number} [index=0]
   * @return {simplexn.PointSet} this for chaining
   * @api public
   */

  simplexn.PointSet.prototype.set = function (point, index) {
    point = point || 0;
    this.points.set(point, index * this.rn);
    return this;
  };

  /**
   * forEach
   * 
   * @param {Function} iterator
   * @return {simplexn.PointSet} this for chaining
   * @api public
   */

  simplexn.PointSet.prototype.forEach = function (iterator) {
    var points = this.points;
    var length = points.length;
    var rn = this.rn;
    var i, j;

    for (i = j = 0; i < length; i += rn, j += 1) {
      iterator(points.subarray(i, i + rn), j);
    }

    return this;
  };

  /**
   * map
   * 
   * @param {Function} mapping
   * @return {simplexn.PointSet} a new point set
   * @api public
   */

  simplexn.PointSet.prototype.map = function (mapping) {
    var points = this.points;
    var oldRn = this.rn;
    var size = this.size;
    var mappedPoints0 = mapping(points.subarray(0,oldRn));
    var newRn = mappedPoints0.length;
    var newPoints = new Float32Array(size * newRn);
    var i, j;

    newPoints.set(mappedPoints0);

    for (i = oldRn, j = 1; j < size; i += oldRn, j += 1) {
      newPoints.set(mapping(points.subarray(i, i + oldRn), j), j * newRn);
    }

    this.points = newPoints;
    this.rn = newRn;
    return this;
  };

  /**
   * filter
   * 
   * @param {Function} iterator
   *   
   * @return {Float32Array} new filtered PointSet
   * @api public
   */

  simplexn.PointSet.prototype.filter = function (iterator) {
    var points = this.points;
    var length = points.length;
    var filtered = new Float32Array(length);
    var rn = this.rn;
    var i, j, k;
    var point;
    var pointset;

    for (i = j = k = 0; i < length; i += rn, j += 1) {
      point = points.subarray(i, i + rn);
      if (iterator(point, j)) {
        filtered.set(point, k);
        k += rn;
      }
    }

    filtered = filtered.subarray(0, k);
    pointset = new PointSet();
    pointset.points = filtered;
    pointset.rn = rn;
    pointset.size = k / rn;
    
    return pointset;
  };

  /**
   * merge
   * Filter duplicated and overlapped vertices 
   * according to precision parameter (10e-4 by default).
   * 
   * @param {Number} [precision = 10e-4] 
   * @return {Float32Array} inidices mapping changes
   * @api public
   */

  simplexn.PointSet.prototype.merge = function (precision) {
    var precision = precision || 1e-4;
    var points = this.points;
    var length = points.length;
    var rn = this.rn;
    var size = this.size;
    var indices = new Uint32Array(size);
    var merged = new Float32Array(length);
    var usedIndices = 0;
    var usedCoords = 0;
    var vertexAdded;
    var equals;
    var i, j, k;

    for (i = 0; i < length; i += rn) {
      vertexAdded = false;
      for (j = 0; j < usedCoords && !vertexAdded; j += rn) {
        equals = true;
        for (k = 0; k < rn; k += 1) {
          points[i+k] = round(points[i+k] / precision) * precision;
          equals &= points[i+k] === merged[j+k];
        }
        vertexAdded |= equals; 
      }
      indices[i/rn] = !vertexAdded ? usedIndices : j/rn-1;
      if (!vertexAdded) {
        for (k = 0; k < rn; k += 1) {
          merged[usedCoords+k] = points[i+k];
        }
        usedIndices += 1;
        usedCoords = usedIndices*rn;
      }
    }

    this.points = merged.subarray(0, usedCoords);

    return indices;
  };

  /**
   * rotate
   * 
   * @param {Array|Uint32Array} dims
   * @param {Number} angle
   * @return {simplexn.PointSet} this for chaining
   * @api public
   */

  simplexn.PointSet.prototype.rotate = function (dims, angle) {
    var points = this.points;
    var length = points.length;
    var rn = this.rn;
    var cos_a = cos(angle);
    var sin_a = sin(angle);
    var r_ii = cos_a;
    var r_ij = -sin_a;
    var r_ji = sin_a;
    var r_jj = cos_a;
    var d_i = dims[0];
    var d_j = dims[1];
    var v_i;
    var v_j;
    var i, j, k;

    for (k = 0; k < length; k += rn, i = k + d_i, j = k + d_j) {
      v_i = points[i];
      v_j = points[j];
      points[i] = v_i * r_ii + v_j * r_ij;
      points[j] = v_i * r_ji + v_j * r_jj;
    }
    
    return this;
  };

  /**
   * scale
   * 
   * @param {Array|Uint32Array} dims
   * @param {Array|Float32Array} values
   * @return {simplexn.PointSet} this for chaining
   * @api public
   */

  simplexn.PointSet.prototype.scale = function (dims, values) {
    var points = this.points 
    var length = points.length;
    var dimsLength = dims.length;
    var rn = this.rn;
    var i, j;

    for (i = 0; i < length; i += rn) {
      for (j = 0; j < dimsLength; j += 1) {
        points[i+dims[j]] *= values[j]; 
      }
    }
    return this;
  };

  /**
   * translate
   * 
   * @param {Array|Uint32Array} dims
   * @param {Array|Float32Array} values
   * @return {simplexn.PointSet} this for chaining
   * @api public
   */

  simplexn.PointSet.prototype.translate = function (dims, values) {
    var points = this.points 
    var length = points.length;
    var dimsLength = dims.length;
    var rn = this.rn;
    var i, j;

    for (i = 0; i < length; i += rn) {
      for (j = 0; j < dimsLength; j += 1) {
        points[i+dims[j]] += values[j]; 
      }
    }
    return this;
  };

  /**
   * transform
   * 
   * @param {Array|Float32Array} matrix
   * @return {simplexn.PointSet} this for chaining
   * @api public
   */

  simplexn.PointSet.prototype.transform = function (matrix) {
    // body...
    
    return this;
  };

  /**
   * embed
   * 
   * @param {Number} dim
   * @return {simplexn.PointSet} this for chaining
   * @api public
   */

  simplexn.PointSet.prototype.embed = function (dim) {
    var dim = dim || this.rn + 1
    var rn = this.rn;
    var minDim = Math.min(rn, dim);
    var oldPoints = this.points;
    var oldLength = oldPoints.length;
    var length = oldLength / rn * dim;
    var points = new Float32Array(length);
    var i, j, k;

    for (i = 0, j = 0; i < oldLength; i += rn, j += dim) {
      for (k = 0; k < minDim; k += 1) {
        points[j + k] = oldPoints[i + k];
      }
    }

    this.points = points;
    this.rn = dim;
    
    return this;
  };

  /**
   * Topology
   * 
   * @constructor
   * @param {Array|Uint32Array} complex
   * @param {Number} [dim=complex[0].length - 1]
   * @api public
   */

  var Topology = 
  simplexn.Topology = function (complex, dim) {
    this._computeTopology(complex, dim);
  }

  /**
   * Topol_computeTopologyogy
   * 
   * @param {Array|Uint32Array} complex
   * @param {Number} [dim=complex[0].length - 1]
   * @api private
   */

  simplexn.Topology.prototype._computeTopology = function (complex, dim) {
    var complex = complex || [[]];
    var dim;
    var complexes = new Array();
    var complexTemp, complexNext;
    var complexNextLength;
    var complexLength;
    var cellDim;
    var d, c, i, j, k;
    var exchange1, exchange2;

    complex = complex.length > 0 ? complex : [[]];
    dim = dim || complex[0].length - 1;
    complex = complex instanceof Array ? _flat(complex) : complex;
    if (dim >= 0) { complexes[0] = new Uint32Array(); }
    if (dim >= 1) { complexes[dim] = new Uint32Array(complex); }

    for (d = dim; d > 1; d -= 1) {
      complexNext = complexes[d];
      complexNextLength = complexNext.length;
      cellDim = d + 1;
      complexLength = complexNextLength / cellDim;
      complexTemp = new Uint32Array(cellDim * complexLength * d);
      complexes[d-1] = complexTemp;
      k = 0;
      for (c = 0; c < complexNextLength; c += cellDim) {
        for (i = 0; i < cellDim; i++) {
          for (j = 0; j < cellDim; j++) {
            if (i != j) {
              complexTemp[k] = complexNext[c+j];
              k++;
            }
          }
          if (i & 1) { // is odd
            // exchange1 = k - cellDim + 1;
            exchange1 = k - 2;
            exchange2 = k - 1;
            complexTemp[exchange1] ^= complexTemp[exchange2];
            complexTemp[exchange2] ^= complexTemp[exchange1];
            complexTemp[exchange1] ^= complexTemp[exchange2];
          }
        }
      }
    }

    this.complexes = complexes;
  };

  /**
   * dim
   * 
   * @property
   * @api public
   */

  simplexn.Topology.prototype.__defineGetter__('dim', function () {
    return this.complexes.length - 1;
  });

  /**
   * equals 
   * 
   * @param {simplexn.Topology} topology
   * @return {Boolean} true if this is equals to the given topology, false otherwise.
   * @api public
   */

  simplexn.Topology.prototype.equals = function (other) {
    var complexes1 = this.complexes;
    var complexes2 = other.complexes;
    var dim1 = this.dim;
    var dim2 = other.dim;
    var i;

    if (dim1 !== dim2) return false;
    for (i = 0; i < dim1; i += 1) {
      if (!_areEqual(complexes1[i], complexes2[i])) return false;
    }
    return true;
  };

  /**
   * remap
   *
   * Remap topology by given mapping array.
   *
   * @param {Array} mapping
   * @return {simplexn.Topology} cloned topology
   * @api public
   */

  simplexn.Topology.prototype.remap = function (mapping) {
    var length;
    var i;

    this.complexes.forEach(function (complex) {
      length = complex.length;
      for (var i = 0; i < length; i += 1) {
        complex[i] = mapping[complex[i]];
      }
    });

    return this;
  };

  /**
   * clone
   * 
   * @return {simplexn.Topology} cloned topology
   * @api public
   */

  simplexn.Topology.prototype.clone = function () {
    var clone = new Topology();
    var dim = this.dim;
    var complexes = new Array();
    var i;

    this.complexes.forEach(function (complex, i) {
      complexes[i] = new Uint32Array(complex);
    });

    clone.complexes = complexes;

    return clone;
  };

  /**
   * cells0d
   * 
   * @return {Uint32Array} 0-dimension cells
   * @api private
   */
   
  simplexn.Topology.prototype.cells0d = function () {
    var complexes = this.complexes || [[]];
    var cells1d = complexes[1] || [];
    var length = cells1d.length;
    var cells0d = new Uint32Array(length);
    var i, j;
    var k = 0;
    var found;

    for (i = 0; i < length; i += 1) {
      found = false;
      for (j = 0; j < k && !found; j += 1) {
        found |= cells1d[i] === cells0d[j];
      }
      if (!found) {
        cells0d[k++] = [cells1d[i]];
      }
    }

    return cells0d.subarray(0,k);
  }

  /**
   * skeleton
   * 
   * @param {Number} ord skeleton order
   * @return {simplexn.Topology} topology of the skeleton
   * @api public
   */

  simplexn.Topology.prototype.skeleton = function (ord) {
    var dim = this.dim
    var ord = ord === undefined ? dim - 1 : ord;
    var out = dim - ord;

    if (ord === 0) {
      this.complexes = [this.cells0d()];
    } else {
      while (out--) this.complexes.pop();
    }

    return this;
  };


  /**
   * boundary
   * 
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.Topology.prototype.boundary = function () {
    var dim = this.dim - 1;

    this.skeleton(dim);
    
    var complexes = this.complexes;
    var cellLength = dim + 1;
    var cells = complexes[dim];
    var cellsLength = cells.length;
    var cellsSize = cellsLength / cellLength;
    var sortedCells = new Uint32Array(cells);
    var notBoundaryCells = new Uint8Array(cellsSize);
    var boundary;
    var boundarySize = cellsSize;
    var cell;
    var equal;
    var i, j, b, c;

    for (i = 0; i < cellsLength; i += cellLength) {
      _quickSort(sortedCells.subarray(i, i + cellLength));
    }
    for (c = 0; c < cellsSize; c += 1) {
      cell = sortedCells.subarray(c * cellLength, c * cellLength + cellLength);
      if (!notBoundaryCells[c]) {
        for (i = c + 1; i < cellsSize; i += 1) {
          equal = true;
          for (j = 0; j < cellLength && equal; j += 1) {
            equal &= sortedCells[i*cellLength+j] === cell[j]; 
          }
          notBoundaryCells[c] |= equal;
          notBoundaryCells[i] |= equal;
        }
      }
    }
    for (c = 0; c < cellsSize; c += 1) {
      boundarySize -= notBoundaryCells[c];
    }
    boundary = new Uint32Array(boundarySize * cellLength);
    for (c = 0, b = 0; c < cellsSize; c += 1) {
      if (!notBoundaryCells[c]) {
        for (i = 0; i < cellLength; i += 1) {
          boundary[b++] = cells[c*cellLength+i];
        }
      }
    }

    this._computeTopology(boundary, dim);
    return this;
  };

  /**
   * SimplicialComplex
   * 
   * @constructor
   * @param {Array|Float32Array} points
   * @faces {Array|Uint32Array} complex
   * @api public
   */

  var SimplicialComplex =
  simplexn.SimplicialComplex = function (points, complex) {
    var points = points || [[]];
    var complex = complex || [[]];

    this.pointset = new PointSet(points);
    this.topology = new Topology(complex);
  };

  /**
   * rn
   * 
   * @property
   * @api public
   */

  simplexn.SimplicialComplex.prototype.__defineGetter__('rn', function () {
    return this.pointset.rn;
  });

  /**
   * dim
   * 
   * @property
   * @api public
   */

  simplexn.SimplicialComplex.prototype.__defineGetter__('dim', function () {
    return this.topology.dim;
  });

  /**
   * rotate
   * 
   * @param {Array|Uint32Array} dims
   * @param {Number} angle
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.rotate = function (dims, angle) {
    this.pointset.rotate(dims, angle);
    return this;
  };

  /**
   * scale
   * 
   * @param {Array|Uint32Array} dims
   * @param {Array|Float32Array} values
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.scale = function (dims, values) {
    this.pointset.scale(dims, values);
    return this;
  };

  /**
   * translate
   * 
   * @param {Array|Uint32Array} dims
   * @param {Array|Float32Array} values
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.translate = function (dims, values) {
    this.pointset.translate(dims, values);
    return this;
  };

  /**
   * transform
   * 
   * @param {Array|Float32Array} matrix
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.transform = function (matrix) {
    this.pointset.transform(matrix);
    return this;
  };

  /**
   * embed
   * 
   * @param {Number} dim
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.embed = function (dim) {
    this.pointset.embed(dim);
    return this;
  };

  /**
   * merge
   * 
   * @precision {Number} [precision=1e-4]
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.merge = function (precision) {
    var precision = precision || 1e-4;
    var mapping = this.pointset.merge(precision);
    this.topology.remap(mapping);
    return this;
  };

  /**
   * clone
   * 
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.clone = function () {
    var clone = new SimplicialComplex();
    clone.pointset = this.pointset.clone();
    clone.topology = this.topology.clone();
    return clone;
  };

  /**
   * map
   * 
   * @param {Function} mapping
   * @param {Boolean|Number} merge
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.map = function (mapping, merge) {
    var precision = typeof merge === 'boolean' ? undefined : merge;
    this.pointset.map(mapping);
    if (merge) this.merge(precision);
    return this;
  };

  /**
   * equals 
   * 
   * @param {simplexn.SimplicialComplex} simpcomp
   * @return {Boolean} true if this is equals to the given mplicial complex, false otherwise.
   * @api public
   */

  simplexn.SimplicialComplex.prototype.equals = function (simpcomp) {
    var pointset1 = this.pointset;
    var pointset2 = simpcomp.pointset;
    var topology1 = this.topology;
    var topology2 = simpcomp.topology;

    if (! pointset1.equals(pointset2)) return false;
    if (! topology1.equals(topology2)) return false;

    return true;
  };

  /**
   * extrude
   * 
   * @param {Array|Float32Array} hlist which must be made by positive numbers 
   *   or by an alternation of positive and negative numbers
   * @param {Function} orient
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api private
   */

  simplexn.SimplicialComplex.prototype.extrude = function (hlist) {
    var hlist = hlist || [1];
    var hlistLength = hlist.length;
    var hlist0 = hlist[0];
    var hlist0isNegative = hlist0 < 0;
    var positiveQuotes = hlist.filter(function (h) {return h >= 0}).length;
    
    var oldRn = this.rn;
    var newRn = oldRn + 1;
    var pointset = this.pointset;
    var pointsetSize = pointset.size;
    var oldEmbeddedPoints;
    var oldPointsLength = pointsetSize * oldRn;
    var newPointsLength = pointsetSize * newRn;
    var newPoints = new Float32Array(newPointsLength);

    var newPointsetSize = (hlistLength + 1 - (hlist0isNegative)) * pointsetSize;
    var newPointset = new PointSet(newPointsetSize, newRn);

    var oldDim = this.dim;
    var newDim = oldDim + 1; 
    var topology = this.topology;
    var cellLength = oldDim + 1;
    var complex = topology.complexes[oldDim];
    var complexLength = complex.length;
    var complexSize = complexLength / cellLength;

    var newCellLength = newDim + 1;
    var newComplexLength = positiveQuotes * complexSize * newDim * newCellLength;
    var newComplex = new Uint32Array(newComplexLength);

    var tempLength = 2 * cellLength;
    var temp = new Uint32Array(tempLength);
    var tempIndx;
    var cIndx = 0 ;
    var exchange1, exchange2;
    var end;
    var quote = 0;
    var h, v, c, i, j;

    for (i = 0; i < complexLength; i += cellLength) {
      _quickSort(complex.subarray(i, i + cellLength));
    }

    this.embed();
    oldEmbeddedPoints = this.pointset.points;
    newPoints.set(oldEmbeddedPoints);
    if (!hlist0isNegative) newPointset.set(oldEmbeddedPoints);

    for (h = 0; h < hlistLength; h += 1) {
      quote += abs(hlist[h]);

      // add new points
      for (v = newRn - 1; v < newPointsLength; v += newRn) {
        newPoints[v] = quote;
      }
      newPointset.set(newPoints, (h + 1 - (hlist0isNegative)) * pointsetSize);

      // create new cells
      if (hlist[h] >= 0) {
        for (c = 0; c < complexSize; c += 1) {
          // fill temp with selected indexes
          for (i = 0; i < cellLength; i++) {
            tempIndx = complex[c*cellLength+i] + (h - (hlist0isNegative)) * pointsetSize;
            temp[i] = tempIndx;
            temp[i+cellLength] = tempIndx + pointsetSize;
          }
          
          // pick cells from temp, cellLength by cellLength
          for (i = 0; i < cellLength; i += 1) {
            end = i + cellLength + 1;
            for (j = i; j < end; j++) {
              newComplex[cIndx++] = temp[j];
            }
            // take care of orientation
            if (((newDim & 1) * (c) + (oldDim & 1) * i) & 1) {
              exchange1 = cIndx - 1;
              exchange2 = exchange1 - 1;
              _swap(newComplex, exchange1, exchange2);
            }
          }
        }
      }
    }

    this.pointset = newPointset;
    this.topology = new Topology(newComplex, newDim);
    return this;
  };

  /**
   * centroids
   * Return a PointsSet of centroids of dim-cells.
   */

  simplexn.SimplicialComplex.prototype.getFacet = function (dim, index) {
    var topology = this.topology;
    var pointset = this.pointset;
    var cells = this.topology.complexes[dim];
    var size = dim + 1;
    var start = size*index;
    var cell = cells.subarray(start, start + size);
    var facet = [];
    var i;

    for (i = 0; i < size; i += 1) {
      facet.push(pointset.get(cell[i]));
    }

    return facet;
  };

  /**
   * centroids
   * Return a PointsSet of centroids of dim-cells.
   * 
   * @param {Number} [dim=this.dim]
   * @return {simplexn.PointSet}
   * @api public
   */

  simplexn.SimplicialComplex.prototype.centroids = function (dim) {
    var dim = dim || this.dim;
    var cellSize = dim + 1;
    var cellsSize = this.topology.complexes[dim].length / cellSize;
    var centroids = new PointSet(cellsSize, this.rn);
    var i;
    var centroid;

    for (i = 0; i < cellsSize; i += 1) {
      centroid = vectorAvg(this.getFacet(dim, i));
      centroids.set(centroid, i);
    }

    return centroids;

  };

  /**
   * explode
   *
   * @param {Array|Float32Array} values
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.explode = function (values) {
    var dim = this.dim;
    var values = values || [];
    var cell;
    var cellSize = dim + 1;
    var cells = this.topology.complexes[dim];
    var cellsSize = cells.length / cellSize;
    var newCell, newCells = [];
    var pointset = this.pointset;
    var newPointset = new PointSet(cellsSize*cellSize, this.rn);
    var centroids = this.centroids();
    var centroid;
    var translatedCentroid;
    var translationVect;
    var c, i;
    var indx = 0;

    for (c = 0; c < cellsSize; c += 1) {
      cell = cells.subarray(c*cellSize, c*cellSize + cellSize);
      newCell = [];
      centroid = centroids.get(c);
      translatedCentroid = vectorMul(centroid, values);
      translationVect = vectorSub(translatedCentroid, centroid);
      for (i = 0; i < cellSize; i += 1) {
        newCell.push(indx);
        newPointset.set(vectorAdd(pointset.get(cell[i]), translationVect), indx);
        indx++;
      }
      newCells.push(newCell);
    }

    this.pointset = newPointset;
    this.topology = new Topology(newCells);
    return this.merge();
  };

  /**
   * skeleton
   * 
   * @param {Number} dim
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.skeleton = function (dim) {
    this.topology.skeleton(dim);
    return this;
  };

  /**
   * boundary
   * 
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.boundary = function () {
    this.topology.boundary();
    return this;
  };

  /**
   * geometries
   */

  simplexn.geometries = {};

  /**
   * simplex
   * 
   * @param {number} d
   * @return {simplexn.SimplicialComplex} a simplex
   * @api public
   */

  var simplex =
  simplexn.geometries.simplex = function (d) {
    var d = d !== undefined ? d + 1 : 1;
    var dim = d;
    var points0 = [];
    var points = [];
    var cells = [];

    while (d--) {
      points0.push(0);
      cells.unshift(d);
    }

    points =  numeric.identity(dim);
    points.unshift(points0);

    return new SimplicialComplex(points, [cells]);
  }

  /**
   * polyline
   * 
   * @param {Array} points
   * @return {simplexn.SimplicialComplex} a simplex
   * @api public
   */

  var polyline =
  simplexn.geometries.polyline = function (points) {
    var points = points || [[]];
    var n = points[0].length;
    var cells = [];

    while (n--) cells.unshift([n, n+1]);

    return (new SimplicialComplex(points, cells)).merge();
  };

  /**
   * simplexGrid
   * 
   * @param {Array} quotesList is a list of hlist which must be made by positive numbers 
  *                 or by an alternation of positive and negative numbers
   * @return {simplexn.SimplicialComplex} a grid of simplexes
   * @api public
   */

  var simplexGrid = 
  simplexn.geometries.simplexGrid = function (quotesList) {
    var quotesList = quotesList ? quotesList.slice(0) : [[]];
    var quotesListHead = quotesList.shift();
    var quotesListHead0 = quotesListHead[0];
    var quotesListHead0isNeg = quotesListHead0 <= 0;
    var points = quotesListHead0isNeg ? [] : [[0]];
    var length = quotesList.length;
    var complex = [];
    var simpcomp;
    var quote = 0;
    var indx;

    quotesListHead.forEach(function (height, i) {
      quote += abs(height);
      points.push([quote]);
      if (height > 0) {
        indx = i - (quotesListHead0isNeg);
        complex.push([indx,indx+1]);
      }
    });

    simpcomp = new SimplicialComplex(points, complex);

    quotesList.forEach(function (quotes) {
      simpcomp.extrude(quotes);
    });
  
    return simpcomp;
  };

  /**
   * cuboid
   * 
   * @param {Array} sideds
   * @return {simplexn.SimplicialComplex} a cuboidal simplicial complex
   * @api public
   */

  simplexn.geometries.cuboid = function (sides) {
    sides = sides.map(function (s) { return [s]; });
    return simplexGrid(sides);
  };

  /**
   * intervals
   *
   * @param {Array} values
   * @return {simplexn.SimplicialComplex} intervals
   * @api public
   */

  var intervals = 
  simplexn.geometries.intervals = function (tip, n) {
    var values = [];
    var value = tip/n;
    
    while (n--) values.push(value);

    return simplexGrid([values]);
  };

  /**
   * cube
   * 
   * @param {Number} d
   * @return {simplexn.SimplicialComplex} a dim-dimendional cube
   * @api public
   */

  simplexn.geometries.cube = function (d) {
    var d = d || 1;
    var quotes = [];
    while (d--) quotes.push([1]);
    return simplexGrid(quotes);
  };

  /**
   * circle
   * 
   * @param {Number} [radius=1]
   * @param {Number} [n=32] 
   * @return {simplexn.SimplicialComplex} a circle
   * @api public
   */

  simplexn.geometries.circle = function (radius, n) {
    var r = radius || 1;
    var n = n || 32;
    var domain = intervals(2 * pi, n);
    
    domain.map(function (v) { 
      return [r * sin(v[0]), r * cos(v[0])]; 
    }, true);

    return domain;
  };

  /**
   * disk
   * 
   * @param {Number} [radius=1]
   * @param {Number} [n=32]
   * @param {Number} [m=1] 
   * @return {simplexn.SimplicialComplex} a disk
   * @api public
   */

  simplexn.geometries.disk = function (radius, n, m) {
    var radius = radius || 1;
    var n = n || 32;
    var m = m || 1;
    var nQuote = 2 * pi / n;
    var mQuote = radius / m;
    var nQuotes = [];
    var mQuotes = [];
    var domain;

    while (n--) nQuotes.push(nQuote);
    while (m--) mQuotes.push(mQuote);
    domain = simplexGrid([nQuotes,mQuotes]);
    domain.map(function (coords) {
      var u = coords[0];
      var v = coords[1];
      return [v*sin(u), v*cos(u)];
    }, true);

    return domain;
  };

  /**
   * cylinderSurface
   * Produces a cylindrical surface of radius r and heigth h.
   * 
   * @param {Number} [r=1]
   * @param {Number} [h=1]
   * @param {Number} [n=16]
   * @param {Number} [m=2] 
   * @return {simplexn.SimplicialComplex} a cylindrical surface
   * @api public
   */
  simplexn.geometries.cylinderSurface = function (r, h, n, m) {
    var r = r || 1;
    var h = h || 1;
    var n = n || 16;
    var m = m || 2;
    var domain = simplexGrid([_repeat(2*pi/n, n), _repeat(1./m, m)]);

    domain.map(function(v) {
      return [
        r * cos(v[0])
      , r * sin(v[0])
      , h * v[1]
      ];
    }, true);

    return domain;
  };

  /**
   * cylinderSolid
   * Produces a solid cylindrer with radius r and heigth h.
   *
   * @param {Number} [R=1] 
   * @param {Number} [r=0]
   * @param {Number} [h=1]
   * @param {Number} [n=16]
   * @param {Number} [m=1]
   * @param {Number} [p=1] 
   * @return {simplexn.SimplicialComplex} a cylinder
   * @api public
   */

  var cilinderSolid =
  simplexn.geometries.cylinderSolid = function (R, r, h, n, m, p) {
    var R = R || 1.; 
    var r = r || 0.; 
    var h = h || 1.;
    var n = n || 16;
    var m = m || 1;
    var p = p || 1; 
    var domain = simplexGrid([_repeat(2*pi/n, n), _repeat((R-r)/m, m), _repeat(h/p, p)]);
    
    domain.translate([1],[r]).map(function(v) {
      return [
        v[1] * sin(v[0])
      , v[1] * cos(v[0])
      , v[2]
      ];
    }, true);

    return domain;
  };

  /**
   * torusSurface
   *
   * produces a toroidal surface of radiuses r,R 
   * approximated with n x m x 2 triangles
   *
   * @param {Number} [r=1] r
   * @param {Number} [R=3] r
   * @param {Number} [n=12] n
   * @param {Number} [m=8] m
   * @return {simplexn.SimplicialComplex} torus surface
   * @api public
   */

  var torusSurface =
  simplexn.geometries.torusSurface = function (R, r, n, m) {
    var R = R || 1.5;
    var r = r || 0.5;
    var n = n || 12;
    var m = m || 8;
    var domain = simplexGrid([ _repeat(2*pi/n, n), _repeat(2*pi/m, m)]);

    domain.map(function (v) {
      return [
          (R + r * cos(v[1])) * cos(v[0])
        , (R + r * cos(v[1])) * sin(v[0])
        , r * sin(v[1])
      ];
    }, true);

    return domain;
  };

 /**
  * torusSolid
  *
  * produces a toroidal surface of radiuses r,R 
  * approximated with n x m x 2 triangles
  *
  * @param {Number} [r=1] r
  * @param {Number} [R=3] r
  * @param {Number} [n=12] n
  * @param {Number} [m=8] m
  * @param {Number} [p=8] p
  * @return {simplexn.SimplicialComplex} torus solid
  * @api public
  */

  var torusSolid = 
  simplexn.geometries.torusSolid = function (r, R, n, m, p) {
    var r = r || 1;
    var R = R || 3;
    var n = n || 12;
    var m = m || 8;
    var p = p || 2;
    var domain = simplexGrid([ _repeat(2*pi/n, n), _repeat(2*pi/m, m), _repeat(1/pi, p)]);

    domain.map(function (v) {
      return [
          (R + r * v[2] * cos(v[0])) * cos(v[1])
        , (R + r * v[2] * cos(v[0])) * -sin(v[1])
        , r * v[2] * sin(v[0])
      ];
    }, true);

    return domain;
  };

  /**
   * triangleStrip
   * 
   * @param {Array} points
   * @return {simplexn.SimplicialComplex} triangle strip
   * @api public
   */

  var triangleStrip = 
  simplexn.geometries.triangleStrip = function (points) {
    var n = points.length;
    var cells = [];
    var i;
    
    for (i = 2; i < n; i += 1) {
      if (cells.length & 1) {
        cells.push([i-1, i-2, i-0]);
      }
      else {
        cells.push([i-2, i-1, i-0]);
      }
    }

    return new SimplicialComplex(points, cells);
  };


  /**
   * triangleFan
   * 
   * @param {Array} points
   * @return {simplexn.SimplicialComplex} triangle strip
   * @api public
   */

  var triangleFan = 
  simplexn.geometries.triangleFan = function (points) {
    var n = points.length;
    var cells = [];
    var i;
    
    for (i = 2; i < n; i += 1) {
      cells.push([0, i-1, i]);
    }

    return new SimplicialComplex(points, cells);
  };

  /**
   * helix
   *
   * @param {Number} [r=1] r
   * @param {Number} [pitch=1] pitch
   * @param {Number} [n=24] n
   * @param {Number} [turns=1] turns
   * @return {simplexn.SimplicialComplex} helix
   * @api public
   */

  var helix = 
  simplexn.geometries.helix = function (r, pitch, n, turns) {
    var r = r || 1;
    var pitch = pitch || 1;
    var n = n || 24;
    var turns = turns || 8;
    var domain = intervals(2*pi*turns, n*turns);

    domain.map(function (v) {
      return [
          r * sin(v[0])
        , r * cos(v[0])
        , pitch / (2*pi) * v[0]
      ];
    }, true);

    return domain;
  };

}(this));