(function() {
  var AA, AL, APPLY, AR, BIGGER, BIGGEST, BOUNDARY, BUTLAST, CAT, CENTROID, CIRCLE, COMP, CONS, CUBE, CUBOID, CYLSOLID, CYLSURFACE, DISK, DISTL, DISTR, DIV, E, EXPLODE, EXTRUDE, FREE, GRAPH, HELIX, ID, IDNT, INSL, INSR, INTERVALS, ISFUN, ISNUM, K, LEN, LIST, MAP, MAT, MUL, MYPRINT, PI, POLYLINE, PRECISION, PROGRESSIVE_SUM, PointSet, R, REPEAT, REPLICA, REVERSE, S, SET, SIMPLEX, SIMPLEXGRID, SKELETON, SMALLER, SMALLEST, SUB, SUM, SimplicialComplex, T, TAIL, TORUSSOLID, TORUSSURFACE, TRANS, TRIANGLEFAN, TRIANGLE_ARRAY, TRIANGLE_STRIP, Topology, VECT, abs, acos, asin, atan, atan2, ceil, clone, code, cos, decode, exp, fcode, fixedPrecision, floor, log, m, n, obj, p, r, root, round, sin, sqrt, string2numberList, tan, type, typedPrint, uncode;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  PI = Math.PI, E = Math.E, log = Math.log, sin = Math.sin, cos = Math.cos, tan = Math.tan, asin = Math.asin, acos = Math.acos, atan = Math.atan, atan2 = Math.atan2, ceil = Math.ceil, floor = Math.floor, sqrt = Math.sqrt, exp = Math.exp, abs = Math.abs, round = Math.round;

  root.APPLY = APPLY = function(args) {
    var f, x;
    f = args[0], x = args[1];
    return f.apply(null, [x]);
  };

  root.COMP = COMP = function(flist) {
    var comp2;
    comp2 = function(f, g) {
      return function(x) {
        return f(g(x));
      };
    };
    return flist.reduce(comp2);
  };

  root.CONS = CONS = function(flist) {
    return function(x) {
      return flist.map(function(f) {
        return f(x);
      });
    };
  };

  root.CAT = CAT = function(a) {
    var _ref;
    return (_ref = []).concat.apply(_ref, a);
  };

  root.ID = ID = function(a) {
    return a;
  };

  root.K = K = function(a) {
    return function(b) {
      return a;
    };
  };

  root.AA = AA = function(f) {
    return function(list) {
      return list.map(function(e) {
        return f(e);
      });
    };
  };

  root.DISTR = DISTR = function(args) {
    var e, el, list, _i, _len, _results;
    list = args[0], e = args[1];
    _results = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      el = list[_i];
      _results.push([el, e]);
    }
    return _results;
  };

  root.DISTL = DISTL = function(args) {
    var e, el, list, _i, _len, _results;
    e = args[0], list = args[1];
    _results = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      el = list[_i];
      _results.push([e, el]);
    }
    return _results;
  };

  root.INSR = INSR = function(f) {
    return function(seq) {
      return seq.reduceRight(f);
    };
  };

  root.INSL = INSL = function(f) {
    return function(seq) {
      return seq.reduce(f);
    };
  };

  root.BIGGER = BIGGER = function(a, b) {
    if (a > b) {
      return a;
    } else {
      return b;
    }
  };

  root.SMALLER = SMALLER = function(a, b) {
    if (a < b) {
      return a;
    } else {
      return b;
    }
  };

  root.BIGGEST = BIGGEST = function(args) {
    return (INSR(BIGGER))(args);
  };

  root.SMALLEST = SMALLEST = function(args) {
    return (INSR(SMALLER))(args);
  };

  root.LIST = LIST = function(args) {
    return (CONS([ID]))(args);
  };

  root.LEN = LEN = function(args) {
    return args.length;
  };

  root.REVERSE = REVERSE = function(args) {
    var i, _ref, _results;
    if (args.length > 1) {
      _results = [];
      for (i = _ref = args.length - 1; _ref <= 0 ? i <= 0 : i >= 0; _ref <= 0 ? i++ : i--) {
        _results.push(args[i]);
      }
      return _results;
    } else {
      return args;
    }
  };

  root.TAIL = TAIL = function(args) {
    if (args.length > 0) {
      return args.splice(1, args.length - 1);
    } else {
      return args;
    }
  };

  root.BUTLAST = BUTLAST = function(args) {
    if (args.length > 1) {
      return REVERSE(TAIL(REVERSE(args)));
    } else {
      return [];
    }
  };

  root.AL = AL = function(args) {
    return CAT(args);
  };

  root.AR = AR = function(args) {
    return CAT(args);
  };

  root.REPEAT = REPEAT = function(n) {
    return function(args) {
      var i, _results;
      _results = [];
      for (i = 0; 0 <= n ? i < n : i > n; 0 <= n ? i++ : i--) {
        _results.push(args);
      }
      return _results;
    };
  };

  root.REPLICA = REPLICA = function(n) {
    return function(args) {
      var i;
      return CAT((function() {
        var _results;
        _results = [];
        for (i = 0; 0 <= n ? i < n : i > n; 0 <= n ? i++ : i--) {
          _results.push(args);
        }
        return _results;
      })());
    };
  };

  root.SUM = SUM = function(args) {
    if (typeof args[0] === 'number') {
      return (INSL(function(x, y) {
        return x + y;
      }))(args);
    } else {
      return AA(INSL(function(x, y) {
        return x + y;
      }))(TRANS(args));
    }
  };

  root.SUB = SUB = function(args) {
    if (typeof args[0] === 'number') {
      return (INSL(function(x, y) {
        return x - y;
      }))(args);
    } else {
      return AA(INSL(function(x, y) {
        return x - y;
      }))(TRANS(args));
    }
  };

  root.MUL = MUL = function(args) {
    if (typeof args[0] === 'number') {
      return (INSL(function(x, y) {
        return x * y;
      }))(args);
    } else {
      return AA(INSL(function(x, y) {
        return x * y;
      }))(TRANS(args));
    }
  };

  root.DIV = DIV = function(args) {
    if (typeof args[0] === 'number') {
      return (INSL(function(x, y) {
        return x / y;
      }))(args);
    } else {
      return AA(INSL(function(x, y) {
        return x / y;
      }))(TRANS(args));
    }
  };

  root.TRANS = TRANS = function(args) {
    var i, j, m, n, _results;
    n = args.length;
    m = args[0].length;
    args = CAT(args);
    _results = [];
    for (i = 0; 0 <= m ? i < m : i > m; 0 <= m ? i++ : i--) {
      _results.push((function() {
        var _results2;
        _results2 = [];
        for (j = 0; 0 <= n ? j < n : j > n; 0 <= n ? j++ : j--) {
          _results2.push(args[j * m + i]);
        }
        return _results2;
      })());
    }
    return _results;
  };

  root.VECT = VECT = function(binaryop) {
    return function(args) {
      return AA(binaryop)(TRANS(args));
    };
  };

  root.MYPRINT = MYPRINT = function(string, params) {
    return console.log(string, params, "\n");
  };

  root.MAT = MAT = function(m, n) {
    return function(args) {
      var i, j, _results;
      _results = [];
      for (i = 0; 0 <= m ? i < m : i > m; 0 <= m ? i++ : i--) {
        _results.push((function() {
          var _results2;
          _results2 = [];
          for (j = 0; 0 <= n ? j < n : j > n; 0 <= n ? j++ : j--) {
            _results2.push(args[i * n + j]);
          }
          return _results2;
        })());
      }
      return _results;
    };
  };

  root.ISNUM = ISNUM = function(n) {
    return (!isNaN(parseFloat(n))) && isFinite(n);
  };

  root.ISFUN = ISFUN = function(value) {
    if (typeof value === "function") {
      return true;
    } else {
      return false;
    }
  };

  root.PROGRESSIVE_SUM = PROGRESSIVE_SUM = function(args) {
    var i;
    return AL([
      0, (function() {
        var _ref, _results;
        _results = [];
        for (i = 0, _ref = args.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          _results.push((INSR(function(x, y) {
            return x + y;
          }))(args.slice(0, i + 1 || 9e9)));
        }
        return _results;
      })()
    ]);
  };

  root.SET = SET = function(input) {
    var dict, k, key, val, _i, _len, _results;
    dict = {};
    for (_i = 0, _len = input.length; _i < _len; _i++) {
      k = input[_i];
      dict[k] = k;
    }
    _results = [];
    for (key in dict) {
      val = dict[key];
      _results.push(val);
    }
    return _results;
  };

  type = function(obj) {
    var classToType, myClass, name, _i, _len, _ref;
    if (obj === void 0 || obj === null) return String(obj);
    classToType = new Object;
    _ref = "Boolean Number String Function Array Date RegExp".split(" ");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      classToType["[object " + name + "]"] = name.toLowerCase();
    }
    myClass = Object.prototype.toString.call(obj);
    if (myClass in classToType) return classToType[myClass];
    return "object";
  };

  typedPrint = function(args) {
    console.log("" + (type(args)) + "::" + args);
    return args;
  };

  clone = function(obj) {
    var key, newInstance;
    if (!(obj != null) || typeof obj !== 'object') return obj;
    newInstance = new obj.constructor();
    for (key in obj) {
      newInstance[key] = clone(obj[key]);
    }
    return newInstance;
  };

  root.PRECISION = PRECISION = 1E11;

  fixedPrecision = function(number) {
    var int;
    int = round(number);
    number = round(PRECISION * number) / PRECISION;
    if (abs(number - int) <= 1.0 / PRECISION) {
      return int;
    } else {
      return number;
    }
  };

  fcode = function(point) {
    return (AA(fixedPrecision))(point);
  };

  code = function(point) {
    return "[" + (fcode(point)) + "]";
  };

  decode = function(string) {
    return +string;
  };

  uncode = function(pointCode) {
    return (AA(decode))(pointCode.split(','));
  };

  string2numberList = function(string) {
    var regex;
    if (string === '[]') {
      return [];
    } else {
      regex = /[,|\[|\]]/;
      return (AA(Number))(BUTLAST(TAIL(string.split(regex))));
    }
  };

  PointSet = (function() {
    var mapcomp;

    mapcomp = function(map1, map2) {
      var MAP, k, v, _results;
      MAP = {};
      _results = [];
      for (k in map1) {
        v = map1[k];
        _results.push(MAP[k] = map2[v]);
      }
      return _results;
    };

    function PointSet(points) {
      var i, k, map1, map2, pcode, pid, point, v, _len, _len2, _ref, _ref2;
      points = points || [];
      if (points.length > 0) {
        this.rn = points[0].length;
        this.dict = {};
        for (i = 0, _len = points.length; i < _len; i++) {
          point = points[i];
          this.dict[fcode(point)] = i;
        }
        map1 = {};
        for (i = 0, _len2 = points.length; i < _len2; i++) {
          point = points[i];
          map1[i] = decode(this.dict[fcode(point)]);
        }
        _ref = [{}, 0], map2 = _ref[0], k = _ref[1];
        _ref2 = this.dict;
        for (pcode in _ref2) {
          pid = _ref2[pcode];
          map2[decode(pid)] = k;
          k += 1;
        }
        this.map = (function() {
          var _ref3, _results;
          _ref3 = mapcomp(map1, map2);
          _results = [];
          for (k in _ref3) {
            v = _ref3[k];
            _results.push(v);
          }
          return _results;
        })();
        k = 0;
        for (pcode in this.dict) {
          this.dict[pcode] = k;
          k += 1;
        }
        this.verts = (function() {
          var _results;
          _results = [];
          for (pcode in this.dict) {
            _results.push(uncode(pcode));
          }
          return _results;
        }).call(this);
        this.m = this.verts.length;
      } else {
        this.rn = 0;
        this.dict = {};
        this.map = [];
        this.verts = [];
        this.m = 0;
      }
    }

    PointSet.prototype.update = function(modify) {
      var pcode, pid, point, _len, _ref, _ref2, _results;
      _ref = this.dict;
      for (pcode in _ref) {
        pid = _ref[pcode];
        this.verts[pid] = modify(uncode(pcode));
      }
      this.dict = {};
      _ref2 = this.verts;
      _results = [];
      for (pid = 0, _len = _ref2.length; pid < _len; pid++) {
        point = _ref2[pid];
        _results.push(this.dict[code(point)] = pid);
      }
      return _results;
    };

    PointSet.prototype.t = function(indices, values) {
      var h, k, vect, _ref;
      vect = (function() {
        var _ref, _results;
        _results = [];
        for (k = 0, _ref = this.rn; 0 <= _ref ? k <= _ref : k >= _ref; 0 <= _ref ? k++ : k--) {
          _results.push(0);
        }
        return _results;
      }).call(this);
      for (h = 0, _ref = indices.length; 0 <= _ref ? h < _ref : h > _ref; 0 <= _ref ? h++ : h--) {
        vect[indices[h]] = values[h];
      }
      this.update(function(point) {
        return SUM([point, vect]);
      });
      return this;
    };

    PointSet.prototype.s = function(indices, values) {
      var h, k, vect, _ref;
      vect = (function() {
        var _ref, _results;
        _results = [];
        for (k = 0, _ref = this.rn; 0 <= _ref ? k <= _ref : k >= _ref; 0 <= _ref ? k++ : k--) {
          _results.push(1);
        }
        return _results;
      }).call(this);
      for (h = 0, _ref = indices.length; 0 <= _ref ? h < _ref : h > _ref; 0 <= _ref ? h++ : h--) {
        vect[indices[h]] = values[h];
      }
      this.update(function(point) {
        return MUL([point, vect]);
      });
      return this;
    };

    return PointSet;

  })();

  root.PointSet = PointSet;

  Topology = (function() {
    var cell_complex, facets, homology_maps, mkCellDB, remove_duplicates, revert, rotate, skeltn;

    revert = function(cell) {
      var len;
      len = cell.length;
      if (len > 1) {
        return CAT([cell[len - 1], cell.slice(1, (len - 1)), cell[0]]);
      } else {
        return cell;
      }
    };

    remove_duplicates = function(hasDupes) {
      var dict, item, _i, _len, _results;
      dict = {};
      _results = [];
      for (_i = 0, _len = hasDupes.length; _i < _len; _i++) {
        item = hasDupes[_i];
        if (!(dict[code(revert(item))] != null) && !(dict[code(item)] != null)) {
          _results.push(dict[code(item)] = item);
        }
      }
      return _results;
    };

    rotate = function(cell) {
      if (cell.length > 1) {
        return CAT([cell.slice(1, cell.length), [cell[0]]]);
      } else {
        return cell;
      }
    };

    facets = function(cell) {
      var facet, h, i, k, out, _ref;
      out = [];
      for (h = 0, _ref = cell.length; 0 <= _ref ? h < _ref : h > _ref; 0 <= _ref ? h++ : h--) {
        facet = (function() {
          var _len, _results;
          _results = [];
          for (i = 0, _len = cell.length; i < _len; i++) {
            k = cell[i];
            if (i !== h) _results.push(k);
          }
          return _results;
        })();
        out.push(h % 2 === 1 ? revert(facet) : facet);
      }
      return out;
    };

    skeltn = function(h_cells) {
      var cell;
      return remove_duplicates(CAT((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = h_cells.length; _i < _len; _i++) {
          cell = h_cells[_i];
          _results.push(facets(cell));
        }
        return _results;
      })()));
    };

    cell_complex = function(d_cells) {
      var cells, dim, h;
      if (d_cells.length > 0) {
        dim = d_cells[0].length - 1;
        if (dim >= 0) {
          cells = new Array(dim);
          cells[dim] = d_cells;
          if (dim > 0) {
            for (h = dim; dim <= 1 ? h <= 1 : h >= 1; dim <= 1 ? h++ : h--) {
              cells[h - 1] = skeltn(cells[h]);
            }
          }
          return cells;
        } else {
          return cells = [[]];
        }
      } else {
        dim = 0;
        return cells = [[]];
      }
    };

    mkCellDB = function(complex) {
      var cell, d, dictos, k, skel, _len, _len2;
      complex = complex || [];
      dictos = [];
      for (d = 0, _len = complex.length; d < _len; d++) {
        skel = complex[d];
        dictos[d] = {};
        for (k = 0, _len2 = skel.length; k < _len2; k++) {
          cell = skel[k];
          dictos[d][code(cell)] = k;
        }
      }
      return dictos;
    };

    homology_maps = function(dictos) {
      var SIMPLEX, cell, d, dim, facet, homology, i, key, skel, _i, _j, _len, _len2, _ref, _ref2;
      if (dictos.length > 0) {
        dim = dictos.length - 1;
        d = 1;
        homology = (function() {
          var _results;
          _results = [];
          for (i = 0; 0 <= dim ? i <= dim : i >= dim; 0 <= dim ? i++ : i--) {
            _results.push([]);
          }
          return _results;
        })();
        if (dim > 1) {
          skel = dictos[1];
          for (cell in skel) {
            SIMPLEX = string2numberList(cell);
            homology[1].push((function() {
              var _i, _len, _ref, _results;
              _ref = facets(SIMPLEX);
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                facet = _ref[_i];
                _results.push([skel[cell], facet[0]]);
              }
              return _results;
            })());
          }
          homology[1] = CAT(homology[1]);
          _ref = dictos.slice(2, dim + 1 || 9e9);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            skel = _ref[_i];
            d += 1;
            for (cell in skel) {
              _ref2 = facets(string2numberList(cell));
              for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
                facet = _ref2[_j];
                if (dictos[d - 1][code(facet)] != null) {
                  key = dictos[d - 1][code(facet)];
                } else {
                  key = dictos[d - 1][code(revert(facet))];
                }
                homology[d].push([skel[cell], key]);
              }
            }
          }
        }
        return homology;
      } else {
        return [];
      }
    };

    function Topology(vertices, d_cells) {
      var cell, dict, k;
      vertices = vertices || [];
      d_cells = d_cells || [];
      this.dim = d_cells.length > 0 ? d_cells[0].length - 1 : -1;
      d_cells = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = d_cells.length; _i < _len; _i++) {
          cell = d_cells[_i];
          _results.push((function() {
            var _j, _len2, _results2;
            _results2 = [];
            for (_j = 0, _len2 = cell.length; _j < _len2; _j++) {
              k = cell[_j];
              _results2.push(vertices.map[k]);
            }
            return _results2;
          })());
        }
        return _results;
      })();
      d_cells = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = d_cells.length; _i < _len; _i++) {
          cell = d_cells[_i];
          if ((SET(cell)).length === cell.length) _results.push(cell);
        }
        return _results;
      })();
      this.dictos = mkCellDB(cell_complex(d_cells));
      this.homology = homology_maps(this.dictos);
      this.cells = (function() {
        var _i, _len, _ref, _results;
        _ref = this.dictos;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          dict = _ref[_i];
          _results.push((function() {
            var _results2;
            _results2 = [];
            for (cell in dict) {
              _results2.push(string2numberList(cell));
            }
            return _results2;
          })());
        }
        return _results;
      }).call(this);
    }

    return Topology;

  })();

  root.Topology = Topology;

  SimplicialComplex = (function() {
    var vertexFilter;

    vertexFilter = function(points, d_cells) {
      var cell, i, inverts, k, numbers, point, verts, _len;
      numbers = function(a, b) {
        return a - b;
      };
      verts = (SET(CAT(d_cells))).sort(numbers);
      inverts = [];
      for (k = 0, _len = verts.length; k < _len; k++) {
        i = verts[k];
        inverts[i] = k;
      }
      points = (function() {
        var _len2, _results;
        _results = [];
        for (k = 0, _len2 = points.length; k < _len2; k++) {
          point = points[k];
          if (inverts[k] != null) _results.push(point);
        }
        return _results;
      })();
      d_cells = (function() {
        var _i, _len2, _results;
        _results = [];
        for (_i = 0, _len2 = d_cells.length; _i < _len2; _i++) {
          cell = d_cells[_i];
          _results.push((function() {
            var _j, _len3, _results2;
            _results2 = [];
            for (_j = 0, _len3 = cell.length; _j < _len3; _j++) {
              k = cell[_j];
              _results2.push(inverts[k]);
            }
            return _results2;
          })());
        }
        return _results;
      })();
      return [points, d_cells];
    };

    function SimplicialComplex(points, d_cells, filter) {
      var _ref;
      if (filter == null) filter = true;
      points = points || [];
      d_cells = d_cells || [];
      if (filter) {
        _ref = vertexFilter(points, d_cells), points = _ref[0], d_cells = _ref[1];
      }
      this.vertices = new PointSet(points);
      this.faces = new Topology(this.vertices, d_cells);
    }

    SimplicialComplex.prototype.t = function(indices, values) {
      this.vertices.t(indices, values);
      return this;
    };

    SimplicialComplex.prototype.s = function(indices, values) {
      this.vertices.s(indices, values);
      return this;
    };

    SimplicialComplex.prototype.r = function(axes, angle) {
      this.vertices.r(axes, angle);
      return this;
    };

    return SimplicialComplex;

  })();

  root.SimplicialComplex = SimplicialComplex;

  root.T = T = function(indices, values) {
    return function(obj) {
      return (clone(obj)).t(indices, values);
    };
  };

  root.S = S = function(indices, values) {
    return function(obj) {
      return (clone(obj)).s(indices, values);
    };
  };

  root.CENTROID = CENTROID = function(obj) {
    return function(face) {
      var A, C, point, v;
      A = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = face.length; _i < _len; _i++) {
          v = face[_i];
          _results.push(obj.vertices.verts[v]);
        }
        return _results;
      })();
      C = REPEAT(A.length)(1.0 / A.length);
      return point = numeric.dot(C, A);
    };
  };

  root.EXTRUDE = EXTRUDE = function(hlist) {
    return function(obj) {
      var cell, cells, coords_distribute, dim, extruded_simplices, final_simplices, i, lastcoords, nsteps, nverts, shift, simplex_layer, simplexes, sliced_vertices, subcomplex, vertPtrs, vertices, verts, _i, _len;
      coords_distribute = function(x) {
        var e, out;
        return out = CAT((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = x.length; _i < _len; _i++) {
            e = x[_i];
            _results.push(AA(AR)(DISTR(e)));
          }
          return _results;
        })());
      };
      shift = function(n, listoflists) {
        var seq, x, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = listoflists.length; _i < _len; _i++) {
          seq = listoflists[_i];
          _results.push((function() {
            var _j, _len2, _results2;
            _results2 = [];
            for (_j = 0, _len2 = seq.length; _j < _len2; _j++) {
              x = seq[_j];
              _results2.push(x + n);
            }
            return _results2;
          })());
        }
        return _results;
      };
      subcomplex = function(d, args) {
        var i, _ref, _results;
        _results = [];
        for (i = 0, _ref = args.length - d; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
          _results.push(args.slice(i, (i + d)));
        }
        return _results;
      };
      cells = clone(obj.faces.cells);
      dim = clone(obj.faces.dim);
      verts = clone(obj.vertices.verts);
      lastcoords = PROGRESSIVE_SUM(AA(abs)(hlist));
      if (dim <= 0) {
        cells = [[], []];
        vertices = AA(LIST)(lastcoords);
        cells[1] = (function() {
          var _ref, _results;
          _results = [];
          for (i = 0, _ref = hlist.length + 1; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
            _results.push([i, i + 1]);
          }
          return _results;
        })();
      } else {
        simplexes = cells[dim];
        nverts = verts.length;
        nsteps = lastcoords.length;
        sliced_vertices = (REPLICA(nsteps))([verts]);
        vertices = coords_distribute(TRANS([REPEAT(nsteps)(verts), lastcoords]));
        extruded_simplices = [];
        for (_i = 0, _len = simplexes.length; _i < _len; _i++) {
          cell = simplexes[_i];
          vertPtrs = CAT([
            cell, cell.map(function(x) {
              return x + nverts;
            })
          ]);
          extruded_simplices.push(subcomplex(dim + 2, vertPtrs));
        }
        final_simplices = [];
        for (i = 0; 0 <= nsteps ? i <= nsteps : i >= nsteps; 0 <= nsteps ? i++ : i--) {
          if (hlist[i] > 0) {
            simplex_layer = shift(nverts * i, CAT(extruded_simplices));
            final_simplices.push(simplex_layer);
          }
        }
        cells = CAT(final_simplices);
      }
      return new SimplicialComplex(vertices, cells);
    };
  };

  root.SIMPLEXGRID = SIMPLEXGRID = function(args) {
    var cells, complex, hlist, i, lastcoords, verts, _i, _len, _ref;
    hlist = args[0];
    lastcoords = PROGRESSIVE_SUM(AA(abs)(hlist));
    verts = AA(LIST)(lastcoords);
    cells = (function() {
      var _ref, _results;
      _results = [];
      for (i = 0, _ref = hlist.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        if (hlist[i] > 0) _results.push([i, i + 1]);
      }
      return _results;
    })();
    complex = new SimplicialComplex(verts, cells);
    _ref = args.slice(1, args.length);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      hlist = _ref[_i];
      complex = EXTRUDE(hlist)(complex);
    }
    return complex;
  };

  root.FREE = FREE = function(obj) {
    var SIMPLEX, cell, d, k, out, outsimplex, simplices, _i, _j, _len, _results;
    d = obj.faces.dim;
    simplices = (function() {
      var _i, _len, _ref, _results;
      _ref = obj.faces.cells[d];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cell = _ref[_i];
        _results.push((function() {
          var _j, _len2, _results2;
          _results2 = [];
          for (_j = 0, _len2 = cell.length; _j < _len2; _j++) {
            k = cell[_j];
            _results2.push(obj.vertices.verts[k]);
          }
          return _results2;
        })());
      }
      return _results;
    })();
    out = [];
    for (_i = 0, _len = simplices.length; _i < _len; _i++) {
      SIMPLEX = simplices[_i];
      outsimplex = new SimplicialComplex(SIMPLEX, [
        (function() {
          _results = [];
          for (var _j = 0; 0 <= d ? _j <= d : _j >= d; 0 <= d ? _j++ : _j--){ _results.push(_j); }
          return _results;
        }).apply(this)
      ]);
      out.push(outsimplex);
    }
    return out;
  };

  root.EXPLODE = EXPLODE = function(args) {
    return function(scene) {
      var center, centers, face, item, k, pair, scaledCenters, translVectors, v, _i, _len, _ref, _results, _results2;
      face = function() {
        return item.faces.cells[item.faces.dim][0];
      };
      centers = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = scene.length; _i < _len; _i++) {
          item = scene[_i];
          _results.push(CENTROID(item)(face()));
        }
        return _results;
      })();
      scaledCenters = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = centers.length; _i < _len; _i++) {
          center = centers[_i];
          _results.push(MUL([args, center]));
        }
        return _results;
      })();
      translVectors = (function() {
        var _i, _len, _ref, _results;
        _ref = TRANS([scaledCenters, centers]);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          pair = _ref[_i];
          _results.push(SUB(pair));
        }
        return _results;
      })();
      _results = [];
      for (k = 0, _len = translVectors.length; k < _len; k++) {
        v = translVectors[k];
        _results.push(scene[k].t((function() {
          _results2 = [];
          for (var _i = 0, _ref = v.length; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results2.push(_i); }
          return _results2;
        }).apply(this), v));
      }
      return _results;
    };
  };

  root.SKELETON = SKELETON = function(dim) {
    return function(pol) {
      var faces_d, verts;
      verts = pol.vertices.verts;
      faces_d = pol.faces.cells[dim];
      return new SimplicialComplex(verts, faces_d);
    };
  };

  root.BOUNDARY = BOUNDARY = function(pol) {
    var boundary_pairs, boundary_signs, d, d_faces, dictos, facet, facets, father, hom, incidence, invertOrientation, k, obj, orientation, pair, sign, simplexMatrix, vertices, volume, _i, _len, _len2, _ref;
    obj = clone(pol);
    d = obj.faces.dim;
    facets = obj.faces.cells[d - 1];
    if (d <= 0) return new SimplicialComplex([], []);
    vertices = obj.vertices.verts;
    simplexMatrix = function(cell) {
      var k, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = cell.length; _i < _len; _i++) {
        k = cell[_i];
        _results.push(AR([vertices[k], 1.0]));
      }
      return _results;
    };
    sign = function(number) {
      if (number > 0) {
        return 1;
      } else if (number !== 0) {
        return -1;
      }
    };
    volume = function(cell) {
      return numeric.det(simplexMatrix(cell));
    };
    orientation = function(d, d_cells) {
      var cell, out;
      if (d === vertices[0].length) {
        out = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = d_cells.length; _i < _len; _i++) {
            cell = d_cells[_i];
            _results.push(sign(volume(cell)));
          }
          return _results;
        })();
      } else {
        out = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = d_cells.length; _i < _len; _i++) {
            cell = d_cells[_i];
            _results.push("numeric.det(somethingelse)");
          }
          return _results;
        })();
      }
      return out;
    };
    invertOrientation = function(facet) {
      var newFacet, _ref;
      newFacet = clone(facet);
      _ref = [newFacet[1], newFacet[0]], newFacet[0] = _ref[0], newFacet[1] = _ref[1];
      return newFacet;
    };
    dictos = obj.faces.dictos;
    hom = obj.faces.homology;
    incidence = (function() {
      var _ref, _results;
      _results = [];
      for (k = 0, _ref = facets.length; 0 <= _ref ? k < _ref : k > _ref; 0 <= _ref ? k++ : k--) {
        _results.push(0);
      }
      return _results;
    })();
    father = new Array(facets.length);
    _ref = hom[d];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      pair = _ref[_i];
      incidence[pair[1]] += 1;
      father[pair[1]] = pair[0];
    }
    boundary_pairs = TRANS((function() {
      var _ref2, _results;
      _results = [];
      for (k = 0, _ref2 = facets.length; 0 <= _ref2 ? k < _ref2 : k > _ref2; 0 <= _ref2 ? k++ : k--) {
        if (incidence[k] === 1) _results.push([k, father[k]]);
      }
      return _results;
    })());
    d_faces = (function() {
      var _j, _len2, _ref2, _results;
      _ref2 = boundary_pairs[1];
      _results = [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        k = _ref2[_j];
        _results.push(obj.faces.cells[d][k]);
      }
      return _results;
    })();
    facets = (function() {
      var _j, _len2, _ref2, _results;
      _ref2 = boundary_pairs[0];
      _results = [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        k = _ref2[_j];
        _results.push(obj.faces.cells[d - 1][k]);
      }
      return _results;
    })();
    boundary_signs = orientation(d, d_faces);
    for (k = 0, _len2 = facets.length; k < _len2; k++) {
      facet = facets[k];
      if (boundary_signs[k] > 0) {
        facets[k] = invertOrientation(facet);
      } else {
        facets[k] = facet;
      }
    }
    return new SimplicialComplex(vertices, facets);
  };

  root.IDNT = IDNT = function(d) {
    return numeric.identity(d);
  };

  root.CUBOID = CUBOID = function(sides) {
    return SIMPLEXGRID(AA(LIST)(sides));
  };

  root.CUBE = CUBE = function(d) {
    return CUBOID(REPEAT(d)([1]));
  };

  root.SIMPLEX = SIMPLEX = function(d) {
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
      ], IDNT(d)
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

  root.POLYLINE = POLYLINE = function(points) {
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

  root.TRIANGLE_STRIP = TRIANGLE_STRIP = function(points) {
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

  root.TRIANGLEFAN = TRIANGLEFAN = function(points) {
    var cells, center, edge, edges, _i, _ref, _results;
    edges = POLYLINE(points);
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

  root.TRIANGLE_ARRAY = TRIANGLE_ARRAY = function(m, n, points) {
    var out;
    out = SIMPLEXGRID([REPEAT(m)(1), REPEAT(n)(1)]);
    return new SimplicialComplex(CAT(points), out.faces.cells[2]);
  };

  root.INTERVALS = INTERVALS = function(tip) {
    return function(n) {
      return SIMPLEXGRID([REPEAT(n)(tip / n)]);
    };
  };

  root.MAP = MAP = function(funs) {
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

  root.CIRCLE = CIRCLE = function(radius, n) {
    var domain;
    if (n == null) n = 32;
    domain = SIMPLEXGRID([REPEAT(n)(2 * PI / n)]);
    return MAP([sin, cos])(domain).s([0, 1], [radius, radius]);
  };

  root.DISK = DISK = function(radius, n, m) {
    var domain, fx, fy;
    if (radius == null) radius = 1;
    if (n == null) n = 32;
    if (m == null) m = 1;
    domain = SIMPLEXGRID([REPEAT(n)(2 * PI / n), REPEAT(m)(radius / m)]);
    fx = function(_arg) {
      var u, v;
      u = _arg[0], v = _arg[1];
      return v * sin(u);
    };
    fy = function(_arg) {
      var u, v;
      u = _arg[0], v = _arg[1];
      return v * cos(u);
    };
    return MAP([fx, fy])(domain);
  };

  root.GRAPH = GRAPH = function(domain) {
    return function(funs) {
      return MAP(funs)(domain);
    };
  };

  root.HELIX = HELIX = function(radius, pitch, n, turns) {
    var domain;
    if (radius == null) radius = 1;
    if (pitch == null) pitch = 1;
    if (n == null) n = 24;
    if (turns == null) turns = 1;
    domain = INTERVALS(2 * PI * turns)(n * turns);
    return GRAPH(domain)([sin, cos, ID]).s([0, 1, 2], [radius, radius, pitch / (2 * PI)]);
  };

  root.CYLSURFACE = CYLSURFACE = function(r, h, n, m) {
    var domain, fx, fy, fz;
    if (r == null) r = 1;
    if (h == null) h = 1;
    if (n == null) n = 16;
    if (m == null) m = 2;
    domain = SIMPLEXGRID([REPEAT(n)(2 * PI / n), REPEAT(m)(1.0 / m)]);
    fx = function(_arg) {
      var u, v;
      u = _arg[0], v = _arg[1];
      return r * cos(u);
    };
    fy = function(_arg) {
      var u, v;
      u = _arg[0], v = _arg[1];
      return r * sin(u);
    };
    fz = function(_arg) {
      var u, v;
      u = _arg[0], v = _arg[1];
      return h * v;
    };
    return MAP([fx, fy, fz])(domain);
  };

  root.CYLSOLID = CYLSOLID = function(R, r, h, n, m, p) {
    var domain, fx, fy, fz;
    if (R == null) R = 1;
    if (r == null) r = 0;
    if (h == null) h = 1;
    if (n == null) n = 16;
    if (m == null) m = 1;
    if (p == null) p = 1;
    domain = SIMPLEXGRID([REPEAT(n)(2 * PI / n), REPEAT(m)((R - r) / m), REPEAT(p)(h / p)]);
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
    return MAP([fx, fy, fz])(domain.t([1], [r]));
  };

  root.TORUSSURFACE = TORUSSURFACE = function(r, R, n, m) {
    var domain, fx, fy, fz;
    if (r == null) r = 1;
    if (R == null) R = 3;
    if (n == null) n = 12;
    if (m == null) m = 8;
    domain = SIMPLEXGRID([REPEAT(n)(2 * PI / n), REPEAT(m)(2 * PI / m)]);
    fx = function(_arg) {
      var u, v;
      u = _arg[0], v = _arg[1];
      return (R + r * cos(v)) * cos(u);
    };
    fy = function(_arg) {
      var u, v;
      u = _arg[0], v = _arg[1];
      return (R + r * cos(v)) * sin(u);
    };
    fz = function(_arg) {
      var u, v;
      u = _arg[0], v = _arg[1];
      return r * sin(v);
    };
    return MAP([fx, fy, fz])(domain);
  };

  root.TORUSSOLID = TORUSSOLID = function(r, R, n, m, p) {
    var domain, fx, fy, fz;
    if (r == null) r = 1;
    if (R == null) R = 3;
    if (n == null) n = 8;
    if (m == null) m = 16;
    if (p == null) p = 1;
    domain = SIMPLEXGRID([REPEAT(n)(2 * PI / n), REPEAT(m)(2 * PI / m), REPEAT(p)(1 / p)]);
    fx = function(_arg) {
      var u, v, w;
      u = _arg[0], v = _arg[1], w = _arg[2];
      return (R + r * w * cos(u)) * cos(v);
    };
    fy = function(_arg) {
      var u, v, w;
      u = _arg[0], v = _arg[1], w = _arg[2];
      return (R + r * w * cos(u)) * sin(v);
    };
    fz = function(_arg) {
      var u, v, w;
      u = _arg[0], v = _arg[1], w = _arg[2];
      return r * w * sin(u);
    };
    return MAP([fx, fy, fz])(domain);
  };

  obj = TORUSSOLID(r = 1, R = 3, n = 18, m = 36, p = 1);

  viewer.draw(BOUNDARY(obj));

  viewer.draw(SKELETON(1)(BOUNDARY(obj)));

  viewer.draw(SKELETON(0)(BOUNDARY(obj)));

  MYPRINT("obj =", obj);

  MYPRINT("BOUNDARY obj =", BOUNDARY(obj));

  /*
  
  root.SCHLEGEL = SCHLEGEL = (pol) -> (point) -> 
  
  
  
  def SCHLEGEL(pol):
  	def project(point):
  		return [coord/point[-1] for coord in point[:-1]]
  	verts = [project(v) for v in pol.vertices.points]
  	cells = pol.cells[-2]
  	return PolytopalComplex(verts,cells)
  
  
  
  root.POLYGON = POLYGON = (n) -> 
  	points = [[cos(alpha),sin(alpha)]
  			  for alpha in (scipy.linspace(0.0, 2*pi, n+1) + (pi*n)/2)]
  	return TRIANGLEFAN(points)
  */

}).call(this);
