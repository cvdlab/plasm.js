(function() {
  var AA, AL, APPLY, AR, BIGGER, BIGGEST, BOUNDARY, BUTLAST, CAT, CENTROID, COMP, COMP2, CONS, DISTL, DISTR, DIV, E, EXPLODE, FREE, ID, INSL, INSR, ISNUMBER, K, LEN, LIST, MAT, MUL, MYPRINT, PI, PRECISION, PROGRESSIVE_SUM, PointSet, REPEAT, REPLICA, REVERSE, S, SIMPLEXGRID, SKELETON, SMALLER, SMALLEST, SUB, SUM, SimplicialComplex, T, TAIL, TRANS, Topology, VECT, abs, acos, asin, atan, atan2, ceil, clone, code, cos, decode, exp, fcode, fixedPrecision, floor, log, model, obj, root, round, sin, sqrt, string2numberList, tan, type, typedPrint, uncode;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  PI = Math.PI, E = Math.E, log = Math.log, sin = Math.sin, cos = Math.cos, tan = Math.tan, asin = Math.asin, acos = Math.acos, atan = Math.atan, atan2 = Math.atan2, ceil = Math.ceil, floor = Math.floor, sqrt = Math.sqrt, exp = Math.exp, abs = Math.abs, round = Math.round;

  APPLY = function(args) {
    var f, x;
    f = args[0], x = args[1];
    return f.apply(null, [x]);
  };

  COMP2 = function(f, g) {
    return function(x) {
      return f(g(x));
    };
  };

  COMP = function(flist) {
    return flist.reduceRight(comp2);
  };

  CONS = function(flist) {
    return function(x) {
      return flist.map(function(f) {
        return f(x);
      });
    };
  };

  CAT = function(a) {
    var _ref;
    return (_ref = []).concat.apply(_ref, a);
  };

  ID = function(a) {
    return a;
  };

  K = function(a) {
    return function(b) {
      return a;
    };
  };

  AA = function(f) {
    return function(list) {
      return list.map(function(e) {
        return f(e);
      });
    };
  };

  DISTR = function(args) {
    var e, el, list, _i, _len, _results;
    list = args[0], e = args[1];
    _results = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      el = list[_i];
      _results.push([el, e]);
    }
    return _results;
  };

  DISTL = function(args) {
    var e, el, list, _i, _len, _results;
    e = args[0], list = args[1];
    _results = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      el = list[_i];
      _results.push([e, el]);
    }
    return _results;
  };

  INSR = function(f) {
    return function(seq) {
      return seq.reduceRight(f);
    };
  };

  INSL = function(f) {
    return function(seq) {
      return seq.reduce(f);
    };
  };

  BIGGER = function(a, b) {
    if (a > b) {
      return a;
    } else {
      return b;
    }
  };

  SMALLER = function(a, b) {
    if (a < b) {
      return a;
    } else {
      return b;
    }
  };

  BIGGEST = function(args) {
    return (INSR(BIGGER))(args);
  };

  SMALLEST = function(args) {
    return (INSR(SMALLER))(args);
  };

  LIST = function(args) {
    return (CONS([ID]))(args);
  };

  LEN = function(args) {
    return args.length;
  };

  REVERSE = function(args) {
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

  TAIL = function(args) {
    if (args.length > 0) {
      return args.splice(1, args.length - 1);
    } else {
      return args;
    }
  };

  BUTLAST = function(args) {
    if (args.length > 1) {
      return REVERSE(TAIL(REVERSE(args)));
    } else {
      return [];
    }
  };

  AL = function(args) {
    return CAT(args);
  };

  AR = function(args) {
    return CAT(args);
  };

  REPEAT = function(n) {
    return function(args) {
      var i, _results;
      _results = [];
      for (i = 0; 0 <= n ? i < n : i > n; 0 <= n ? i++ : i--) {
        _results.push(args);
      }
      return _results;
    };
  };

  REPLICA = function(n) {
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

  SUM = function(args) {
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

  SUB = function(args) {
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

  MUL = function(args) {
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

  DIV = function(args) {
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

  TRANS = function(args) {
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

  VECT = function(binaryop) {
    return function(args) {
      return AA(binaryop)(TRANS(args));
    };
  };

  MYPRINT = function(string, params) {
    return console.log(string, params, "\n");
  };

  MAT = function(m, n) {
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

  ISNUMBER = function(n) {
    return (!isNaN(parseFloat(n))) && isFinite(n);
  };

  PROGRESSIVE_SUM = function(args) {
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

  PRECISION = 1E7;

  fixedPrecision = function(number) {
    var int;
    int = (number > 0 ? floor : ceil)(number);
    number = (number > 0 ? ceil : floor)(PRECISION * number) / PRECISION;
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
      var k, map, v, _results;
      map = {};
      _results = [];
      for (k in map1) {
        v = map1[k];
        _results.push(map[k] = map2[v]);
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
        this.map = 0;
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
        return sum([point, vect]);
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
        return mul([point, vect]);
      });
      return this;
    };

    return PointSet;

  })();

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
      var cell, d, dim, facet, homology, i, key, simplex, skel, _i, _j, _len, _len2, _ref, _ref2;
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
            simplex = string2numberList(cell);
            homology[1].push((function() {
              var _i, _len, _ref, _results;
              _ref = facets(simplex);
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

  SimplicialComplex = (function() {
    var invertOrientation, orientation, sign, simplexMatrix, volume;

    simplexMatrix = function(obj) {
      return function(cell) {
        var k, out;
        return out = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = cell.length; _i < _len; _i++) {
            k = cell[_i];
            _results.push(AR([obj.vertices.verts[k], 1.0]));
          }
          return _results;
        })();
      };
    };

    volume = function(obj) {
      return function(cell) {
        return numeric.det(simplexMatrix(obj)(cell));
      };
    };

    sign = function(number) {
      if (number > 0) {
        return 1;
      } else if (number !== 0) {
        return -1;
      }
    };

    orientation = function(obj) {
      return function(d, d_cells) {
        var cell, out;
        if (d === obj.vertices.rn) {
          out = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = d_cells.length; _i < _len; _i++) {
              cell = d_cells[_i];
              _results.push(sign(volume(obj)(cell)));
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
    };

    invertOrientation = function(facet) {
      var newFacet, _ref;
      newFacet = clone(facet);
      _ref = [newFacet[1], newFacet[0]], newFacet[0] = _ref[0], newFacet[1] = _ref[1];
      return newFacet;
    };

    function SimplicialComplex(points, d_cells) {
      points = points || [];
      d_cells = d_cells || [];
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

    SimplicialComplex.prototype.extrude = function(hlist) {
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
      subcomplex = function(d, args) {
        var i, _ref, _results;
        _results = [];
        for (i = 0, _ref = args.length - d; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
          _results.push(args.slice(i, (i + d)));
        }
        return _results;
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
      cells = clone(this.faces.cells);
      dim = clone(this.faces.dim);
      verts = clone(this.vertices.verts);
      lastcoords = PROGRESSIVE_SUM(AA(abs)(hlist));
      if (dim <= 0) {
        cells = [[], []];
        vertices = AA(list)(lastcoords);
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

    SimplicialComplex.prototype.boundary = function() {
      var boundary_pairs, boundary_signs, d, d1_faces, d_faces, dictos, facet, facets, father, hom, incidence, k, out, pair, rn, vertices, _i, _len, _len2, _ref;
      d = this.faces.dim;
      rn = this.vertices.rn;
      facets = this.faces.cells[d - 1];
      if (d <= 0) return new SimplicialComplex([], []);
      vertices = this.vertices.verts;
      simplexMatrix = function(cell) {
        var k, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = cell.length; _i < _len; _i++) {
          k = cell[_i];
          _results.push(AR([vertices[k], 1.0]));
        }
        return _results;
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
      dictos = this.faces.dictos;
      hom = this.faces.homology;
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
          _results.push(this.faces.cells[d][k]);
        }
        return _results;
      }).call(this);
      d1_faces = (function() {
        var _j, _len2, _ref2, _results;
        _ref2 = boundary_pairs[0];
        _results = [];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          k = _ref2[_j];
          _results.push(this.faces.cells[d - 1][k]);
        }
        return _results;
      }).call(this);
      boundary_signs = orientation(d, d_faces);
      for (k = 0, _len2 = d1_faces.length; k < _len2; k++) {
        facet = d1_faces[k];
        if (boundary_signs[k] > 0) {
          d1_faces[k] = invertOrientation(facet);
        } else {
          d1_faces[k] = facet;
        }
      }
      out = new SimplicialComplex(vertices, d1_faces);
      return out;
    };

    return SimplicialComplex;

  })();

  T = function(indices, values) {
    return function(obj) {
      return (clone(obj)).t(indices, values);
    };
  };

  S = function(indices, values) {
    return function(obj) {
      return (clone(obj)).s(indices, values);
    };
  };

  CENTROID = function(obj) {
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

  SIMPLEXGRID = function(args) {
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
      complex = complex.extrude(hlist);
    }
    return complex;
  };

  FREE = function(obj) {
    var cell, d, k, out, outsimplex, simplex, simplices, _i, _j, _len, _results;
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
      simplex = simplices[_i];
      outsimplex = new SimplicialComplex(simplex, [
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

  EXPLODE = function(args) {
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
          _results.push(centroid(item)(face()));
        }
        return _results;
      })();
      scaledCenters = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = centers.length; _i < _len; _i++) {
          center = centers[_i];
          _results.push(mul([args, center]));
        }
        return _results;
      })();
      translVectors = (function() {
        var _i, _len, _ref, _results;
        _ref = TRANS([scaledCenters, centers]);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          pair = _ref[_i];
          _results.push(sub(pair));
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

  SKELETON = function(dim) {
    return function(pol) {
      var faces_d, out2, verts;
      verts = pol.vertices.verts;
      faces_d = pol.faces.cells[dim];
      return out2 = new SimplicialComplex(verts, faces_d);
    };
  };

  BOUNDARY = function(pol) {
    var boundary_pairs, boundary_signs, d, d_faces, dictos, facet, facets, father, hom, incidence, k, obj, pair, vertices, _i, _len, _len2, _ref;
    obj = clone(pol);
    d = obj.faces.dim;
    facets = obj.faces.cells[d - 1];
    if (d <= 0) return new SimplicialComplex([], []);
    vertices = obj.vertices.verts;
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
    boundary_signs = orientation(obj)(d, d_faces);
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

  obj = SIMPLEXGRID([[1, -1, 1, 1, -1, 1], [1, -1, 1, 1, -1, 1], [1, 1]]);

  model = viewer.draw(SKELETON(1)(BOUNDARY(obj)));

  /*
  
  OBJ = simplexGrid ([[1],[1],[1]]) 
  OBJ1 = boundary(obj)
  MODEL = viewer.draw(obj1)
  
  
  OBJ = simplexGrid ([[1],[1],[1]])
  OBJ = skeleton(2)(obj) ## OK
  
  OBJ = skeleton(1)(obj) ## KO
  
  OBJ = simplexGrid ([[1],[1]])
  OBJ = skeleton(1)(obj) ## KO
  MODEL = viewer.draw(obj)
  */

}).call(this);
