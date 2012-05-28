(function() {
  var BinMat, C_1, C_2, C_3, SORTED, SparseMat, V, VERTS, ZEROS, boundary, cells, chainComplex, characteristicMaps, cmBoundary, cmFacets, cmFilter, cochainComplex, coo2mat, denormalize, doubleChain, extrude, intrinsicSigns, layers, model, next, normalize, object, orientedBoundary, perms, proj, root, signedBoundary, swapOrientation, t0, t1, triples2SparseMat, vert1, vert3, _i, _j, _results, _results2,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  Array.prototype.unique = function() {
    var key, output, value, _ref, _results;
    output = {};
    for (key = 0, _ref = this.length; 0 <= _ref ? key < _ref : key > _ref; 0 <= _ref ? key++ : key--) {
      output[this[key]] = this[key];
    }
    _results = [];
    for (key in output) {
      value = output[key];
      _results.push(value);
    }
    return _results;
  };

  root.ZEROS = ZEROS = function(m, n) {
    var i, j, _results;
    _results = [];
    for (i = 0; 0 <= m ? i < m : i > m; 0 <= m ? i++ : i--) {
      _results.push((function() {
        var _results2;
        _results2 = [];
        for (j = 0; 0 <= n ? j < n : j > n; 0 <= n ? j++ : j--) {
          _results2.push(0);
        }
        return _results2;
      })());
    }
    return _results;
  };

  root.SORTED = SORTED = function(arrayOfArray, order) {
    if (order == null) order = true;
    return arrayOfArray.sort(order ? function(a, b) {
      return a[0] - b[0];
    } : function(a, b) {
      return b[0] - a[0];
    });
  };

  root.BinMat = BinMat;

  BinMat = (function() {

    function BinMat(mat) {
      var k, row, val, _i, _len, _len2, _ref;
      this.m = mat.length;
      this.n = (Math.max.apply(Math, CAT(mat))) + 1;
      this.mat = ZEROS(this.m, this.n);
      for (k = 0, _len = mat.length; k < _len; k++) {
        row = mat[k];
        _ref = mat[k];
        for (_i = 0, _len2 = _ref.length; _i < _len2; _i++) {
          val = _ref[_i];
          this.mat[k][val] = 1;
        }
      }
    }

    return BinMat;

  })();

  root.coo2mat = coo2mat = function(sparsemat) {
    var col, m, mat, n, row, val, _i, _len, _ref, _ref2;
    PRINT("sparsemat =", sparsemat);
    m = sparsemat.m;
    n = sparsemat.n;
    mat = ZEROS(m, n);
    _ref = sparsemat.rcmat;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      _ref2 = _ref[_i], row = _ref2[0], col = _ref2[1], val = _ref2[2];
      mat[row][col] = val;
    }
    return mat;
  };

  root.triples2SparseMat = triples2SparseMat = function(triples) {
    var C, columns, triple;
    C = new SparseMat([[]]);
    C.m = LAST(triples)[0] + 1;
    columns = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = triples.length; _i < _len; _i++) {
        triple = triples[_i];
        _results.push(triple[1]);
      }
      return _results;
    })();
    C.n = Math.max.apply(Math, columns) + 1;
    C.rcmat = triples;
    return C;
  };

  root.SparseMat = SparseMat;

  SparseMat = (function() {
    var rcmatByRow;

    function SparseMat(mat) {
      var col, k, row, _i, _len, _len2;
      this.m = mat.length;
      this.n = (Math.max.apply(Math, CAT(mat))) + 1;
      this.rcmat = [];
      for (k = 0, _len = mat.length; k < _len; k++) {
        row = mat[k];
        for (_i = 0, _len2 = row.length; _i < _len2; _i++) {
          col = row[_i];
          this.rcmat.push([k, col, 1]);
        }
      }
    }

    SparseMat.prototype.sparse2mat = function() {
      var col, mat, row, val, _i, _len, _ref, _ref2;
      mat = ZEROS(this.m, this.n);
      _ref = this.rcmat;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref2 = _ref[_i], row = _ref2[0], col = _ref2[1], val = _ref2[2];
        mat[row][col] = val;
      }
      return mat;
    };

    SparseMat.prototype.T = function() {
      var C, swap, _ref;
      swap = function(_arg) {
        var a, b, c;
        a = _arg[0], b = _arg[1], c = _arg[2];
        return [b, a, c];
      };
      C = new SparseMat([[]]);
      C.rcmat = this.rcmat;
      _ref = [this.n, this.m], C.m = _ref[0], C.n = _ref[1];
      C.rcmat = SORTED(AA(swap)(C.rcmat));
      return C;
    };

    rcmatByRow = function(triples) {
      var k, out, triple, _i, _len;
      out = (function() {
        var _ref, _results;
        _results = [];
        for (k = 0, _ref = (LAST(triples))[0]; 0 <= _ref ? k <= _ref : k >= _ref; 0 <= _ref ? k++ : k--) {
          _results.push([]);
        }
        return _results;
      })();
      for (_i = 0, _len = triples.length; _i < _len; _i++) {
        triple = triples[_i];
        out[triple[0]].push(triple.slice(1, 3));
      }
      return out;
    };

    SparseMat.prototype.PROD = function(sparsemat) {
      var C, item, k, matrix, out, pair, triple, triples, _i, _len, _ref;
      matrix = rcmatByRow(sparsemat.rcmat);
      triples = (function() {
        var _i, _len, _ref, _results;
        _ref = this.rcmat;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          triple = _ref[_i];
          _results.push((function() {
            var _j, _len2, _ref2, _results2;
            _ref2 = DISTL([triple, matrix[triple[1]]]);
            _results2 = [];
            for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
              pair = _ref2[_j];
              _results2.push([pair[0][0], pair[1][0], pair[0][2] * pair[1][1]]);
            }
            return _results2;
          })());
        }
        return _results;
      }).call(this);
      triples = (CAT(triples)).sort();
      out = [];
      k = 0;
      out[0] = triples[0];
      _ref = triples.slice(1);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (out[k][0] === item[0] && out[k][1] === item[1]) {
          out[k][2] += item[2];
        } else {
          out.push(item);
          k += 1;
        }
      }
      C = new SparseMat([[]]);
      C.rcmat = out;
      C.m = this.m;
      C.n = sparsemat.n;
      return C;
    };

    return SparseMat;

  })();

  root.cells = cells = [[0, 1, 3], [1, 3, 4], [1, 2, 4], [2, 4, 5]];

  root.V = V = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]];

  root.cells = cells = [[0, 1, 2, 4], [1, 2, 3, 5], [1, 2, 4, 5], [2, 3, 5, 6], [2, 4, 5, 6], [3, 5, 6, 7]];

  root.V = V = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]];

  root.normalize = normalize = function(chain) {
    var theChain;
    theChain = CLONE(chain);
    return AA(AL)(DISTL([1, theChain]));
  };

  root.denormalize = denormalize = function(chain) {
    var theChain;
    theChain = CLONE(chain);
    return AA(TAIL)(theChain);
  };

  root.cmFacets = cmFacets = function(faces) {
    var cell, facet, h, k, storage, theRange, vert, _i, _j, _k, _len, _len2, _len3, _ref, _results;
    theRange = (function() {
      _results = [];
      for (var _i = 0, _ref = faces[0].length; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this);
    storage = [];
    for (_j = 0, _len = faces.length; _j < _len; _j++) {
      cell = faces[_j];
      for (_k = 0, _len2 = theRange.length; _k < _len2; _k++) {
        h = theRange[_k];
        facet = [];
        for (k = 0, _len3 = cell.length; k < _len3; k++) {
          vert = cell[k];
          if (k !== h) facet.push(vert);
        }
        storage.push(facet);
      }
    }
    return storage = storage.unique();
  };

  root.characteristicMaps = characteristicMaps = function(cells) {
    var d, dim, high, low, out;
    d = cells[0].length - 1;
    high = cells;
    out = [high];
    for (dim = d; dim > 0; dim += -1) {
      low = cmFacets(high);
      out.push(low);
      high = low;
    }
    return out;
  };

  root.cmFilter = cmFilter = function(In, Out) {
    return function(sparsemat) {
      var item, triples, _i, _len, _ref;
      if (In <= Out) {
        return sparsemat;
      } else {
        triples = [];
        _ref = sparsemat.rcmat;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          if (item[2] === In) triples.push([item[0], item[1], Out]);
        }
        sparsemat.rcmat = triples;
        return sparsemat;
      }
    };
  };

  root.chainComplex = chainComplex = function(cells) {
    var boundary, chains, cmat, cmats, coboundary, d, k, mat, operator, out, _len, _ref;
    d = cells[0].length - 1;
    chains = characteristicMaps(cells);
    cmats = (function() {
      var _results;
      _results = [];
      for (k = d; k >= 0; k += -1) {
        _results.push(new SparseMat(chains[k]));
      }
      return _results;
    })();
    out = [];
    _ref = cmats.slice(0, (cmats.length - 1));
    for (k = 0, _len = _ref.length; k < _len; k++) {
      cmat = _ref[k];
      boundary = cmats[d - k - 1];
      coboundary = cmats[d - k].T();
      mat = boundary.PROD(coboundary);
      operator = cmFilter(d - k, 1)(mat);
      out.push(operator);
    }
    return out;
  };

  root.cochainComplex = cochainComplex = function(cells) {
    var boundary, chains, cmat, cmats, coboundary, d, k, mat, operator, out, _len, _ref;
    d = cells[0].length - 1;
    chains = characteristicMaps(cells);
    cmats = (function() {
      var _results;
      _results = [];
      for (k = d; k >= 0; k += -1) {
        _results.push(new SparseMat(chains[k]));
      }
      return _results;
    })();
    out = [];
    _ref = cmats.slice(0, (cmats.length - 1));
    for (k = 0, _len = _ref.length; k < _len; k++) {
      cmat = _ref[k];
      boundary = cmats[k + 1];
      coboundary = cmats[k].T();
      mat = boundary.PROD(coboundary);
      operator = cmFilter(k + 1, 1)(mat);
      out.push(operator);
    }
    return out;
  };

  root.intrinsicSigns = intrinsicSigns = function(chain) {
    return function(verts) {
      var cell, h, out, simplex, simplices;
      simplices = CAT((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = chain.length; _i < _len; _i++) {
          cell = chain[_i];
          _results.push(AA(normalize)([
            (function() {
              var _j, _len2, _results2;
              _results2 = [];
              for (_j = 0, _len2 = cell.length; _j < _len2; _j++) {
                h = cell[_j];
                _results2.push(verts[h]);
              }
              return _results2;
            })()
          ]));
        }
        return _results;
      })());
      return out = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = simplices.length; _i < _len; _i++) {
          simplex = simplices[_i];
          _results.push(Math.round(numeric.det(simplex)));
        }
        return _results;
      })();
    };
  };

  root.signedBoundary = signedBoundary = function(cells) {
    return function(verts) {
      var boundary, chains, d, facets, intrinsicSign, k, missingTerm, missingTermIndex, relativeSign, signs, simplexPair, simplices, triple, x, _i, _len, _len2, _ref, _ref2;
      d = cells[0].length - 1;
      facets = cmFacets(cells);
      simplices = [cells, facets];
      chains = [new SparseMat(facets), new SparseMat(cells)];
      boundary = cmFilter(d, 1)(chains[0].PROD(chains[1].T()));
      signs = intrinsicSigns(cells)(verts);
      _ref = boundary.rcmat;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        triple = _ref[_i];
        simplexPair = [simplices[0][triple[1]], simplices[1][triple[0]]];
        _ref2 = simplexPair[0];
        for (k = 0, _len2 = _ref2.length; k < _len2; k++) {
          x = _ref2[k];
          if ((__indexOf.call(simplexPair[1], x) < 0)) {
            missingTerm = x;
            missingTermIndex = k;
          }
        }
        intrinsicSign = signs[triple[1]];
        relativeSign = missingTermIndex % 2 === 0 ? 1 : -1;
        triple[2] = intrinsicSign * relativeSign;
      }
      return boundary;
    };
  };

  root.cmBoundary = cmBoundary = function(rcmat) {
    var k, out, test, _ref;
    test = function(k) {
      var _ref;
      if ((rcmat[k - 1][0] !== (_ref = rcmat[k][0]) && _ref !== rcmat[k + 1][0])) {
        return true;
      } else {
        return false;
      }
    };
    out = [];
    if (rcmat[0][0] !== rcmat[1][0]) out.push(rcmat[0]);
    for (k = 1, _ref = rcmat.length - 1; 1 <= _ref ? k < _ref : k > _ref; 1 <= _ref ? k++ : k--) {
      if (test(k)) out.push(rcmat[k]);
    }
    if (LAST(rcmat)[0] !== LAST(out)[0]) out.push(LAST(rcmat));
    return out;
  };

  root.swapOrientation = swapOrientation = function(face) {
    return CAT([[face[1], face[0]], TAIL(TAIL(face))]);
  };

  root.orientedBoundary = orientedBoundary = function(cells) {
    return function(vert3) {
      var B, b, facets, out, _i, _len, _ref;
      facets = cmFacets(cells);
      B = signedBoundary(cells)(vert3);
      out = [];
      _ref = cmBoundary(B.rcmat);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        b = _ref[_i];
        if (b[2] > 0) {
          out.push(facets[b[0]]);
        } else {
          out.push(swapOrientation(facets[b[0]]));
        }
      }
      return out;
    };
  };

  root.next = next = function(offset) {
    return function(chain) {
      var d, k, out;
      d = chain[0].length;
      out = IDNT(d);
      for (k = 1; 1 <= d ? k < d : k > d; 1 <= d ? k++ : k--) {
        out[0][k] = offset;
      }
      return numeric.dot(chain, out);
    };
  };

  root.doubleChain = doubleChain = function(theChain, layers) {
    var chain, chains, first, k, nextChain, offset, second, _ref;
    if (layers == null) layers = [1];
    chain = CLONE(theChain);
    offset = (Math.max.apply(Math, CAT(chain))) + 1;
    first = normalize(chain);
    nextChain = next(offset);
    chains = [];
    for (k = 0, _ref = layers.length; 0 <= _ref ? k < _ref : k > _ref; 0 <= _ref ? k++ : k--) {
      second = nextChain(first);
      if (layers[k] === 1) chains.push(AA(denormalize)([first, second]));
      first = second;
    }
    return CAT(AA(AA(CAT))(AA(TRANS)(chains)));
  };

  root.perms = perms = function(d) {
    var Pi, idnt, k;
    idnt = IDNT(2 * d);
    Pi = (function() {
      var _results;
      _results = [];
      for (k = 0; 0 <= d ? k < d : k > d; 0 <= d ? k++ : k--) {
        _results.push(0);
      }
      return _results;
    })();
    Pi[0] = AL([[idnt[idnt.length - 1]], BUTLAST(idnt)]);
    for (k = 1; 1 <= d ? k < d : k > d; 1 <= d ? k++ : k--) {
      Pi[k] = numeric.dot(Pi[k - 1], Pi[0]);
    }
    return Pi;
  };

  root.proj = proj = function(d) {
    var i, idnt, j, zeros;
    idnt = IDNT(d + 1);
    zeros = (function() {
      var _ref, _results;
      _results = [];
      for (i = 0, _ref = d - 1; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (j = 0, _ref2 = d + 1; 0 <= _ref2 ? j < _ref2 : j > _ref2; 0 <= _ref2 ? j++ : j--) {
            _results2.push(0);
          }
          return _results2;
        })());
      }
      return _results;
    })();
    return CAT([idnt, zeros]);
  };

  root.extrude = extrude = function(chain, layers) {
    var P, Pi, ccomplex, d, k, out, _ref;
    if (layers == null) layers = [1];
    d = chain[0].length;
    Pi = perms(d);
    P = proj(d);
    ccomplex = doubleChain(chain, layers);
    out = [numeric.dot(ccomplex, P)];
    for (k = 0, _ref = d - 1; 0 <= _ref ? k < _ref : k > _ref; 0 <= _ref ? k++ : k--) {
      out.push(numeric.dot(ccomplex, numeric.dot(Pi[k], P)));
    }
    return CAT(out);
  };

  root.VERTS = VERTS = COMP([AA(REVERSE), CART, REVERSE]);

  C_1 = extrude([[0]], layers = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]);

  vert1 = VERTS([
    (function() {
      _results = [];
      for (_i = 0; _i < 22; _i++){ _results.push(_i); }
      return _results;
    }).apply(this)
  ]);

  object = new SimplicialComplex(vert1, C_1);

  PRINT("object =", object);

  model = viewer.draw(object);

  C_2 = extrude(C_1, [1, 1, 1, 1, 1, 1, 1, 1]);

  t0 = Date.now();

  C_3 = extrude(C_2, [1, 1, 1, 1, 1]);

  t1 = Date.now();

  PRINT("extrusion time =", t1 - t0);

  vert3 = VERTS([
    (function() {
      _results2 = [];
      for (_j = 0; _j < 22; _j++){ _results2.push(_j); }
      return _results2;
    }).apply(this), [0, 1, 2, 3, 4, 5, 6, 7, 8], [0, 1, 2, 3, 4, 5]
  ]);

  /*
  object = new SimplicialComplex vert3,C_3
  PRINT "object =", object
  model = viewer.draw object
  */

  t0 = Date.now();

  boundary = orientedBoundary(C_3)(vert3);

  t1 = Date.now();

  PRINT("boundary time =", t1 - t0);

  object = new SimplicialComplex(vert3, boundary);

  PRINT("object =", object);

  model = viewer.draw(object);

  /*
  
  ##
  C_3 = extrude [[0, 1, 2], [1, 2, 3]],layers=[1,1]
  PRINT "extrude =", JSON.stringify C_3
  vert3 = VERTS([ [0,1], [0,1], [0,1,2]])
  PRINT "vert3 =", JSON.stringify vert3
  object = new SimplicialComplex(vert3, orientedBoundary(C_3)(vert3))
  PRINT "object =", object
  #object = new SimplicialComplex vert3,C_3
  model = viewer.draw object
  
  #//////////////////////////////////////////////////////////////////////////
  # -- CLASSES of new kernel ------------------------------------------------
  #//////////////////////////////////////////////////////////////////////////
  
  
  class PointSet
  	
  	
  class Polytopes
  	
  	
  class Hcubes extends Polytopes
  	
  	
  class Simplices extends Hcubes
  	
  	
  class Document
  	
  	
  class Token
  
  
  
  # The class used to represent a *subdomain*, i.e. a compact subset of a geometric space, 
  #	a parcel of a domain subdivision, encoded as a JSON document. 
  class SubDomain
  	
  	
  mat = [[1,2,3],[2,3,4]]
  A = new BinMat(mat)
  B = new SparseMat(mat)
  A = new SparseMat(mat)
  PRINT "BinMat =", JSON.stringify A.rcmat
  PRINT "SparseMat =", JSON.stringify B
  PRINT "B =", JSON.stringify B.rcmat
  PRINT "B.T() =", JSON.stringify B.T()
  PRINT "B.PROD(A) =", JSON.stringify (coo2mat B.PROD(A.T()))
  PRINT "B.PROD(A) =", JSON.stringify triples2SparseMat (B.PROD(A.T())).rcmat
  */

}).call(this);
