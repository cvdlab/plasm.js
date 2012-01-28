(function() {
  var E, PI, PRECISION, PointSet, SimplicialComplex, Topology, aa, abs, acos, al, apply, ar, asin, atan, atan2, bigger, biggest, butlast, cat, ceil, cell_complex, centroid, clone, code, comp, comp2, cons, coords_distribute, cos, decode, distl, distr, div, exp, explode, facets, fcode, fixedPrecision, floor, free, homology_maps, id, insl, insr, isNumber, k, len, list, log, mapcomp, mat, mkCellDB, mul, myprint, outline, progressive_sum, remove_duplicates, repeat, replica, reverse, revert, root, rotate, round, s, shift, simplexGrid, sin, skeleton, smaller, smallest, sqrt, string2numberList, sub, subcomplex, sum, t, tail, tan, trans, type, typedPrint, uncode, vect, _ref;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  _ref = (PI = Math.PI, E = Math.E, log = Math.log, sin = Math.sin, cos = Math.cos, tan = Math.tan, asin = Math.asin, acos = Math.acos, atan = Math.atan, atan2 = Math.atan2, ceil = Math.ceil, floor = Math.floor, sqrt = Math.sqrt, exp = Math.exp, abs = Math.abs, round = Math.round, Math), PI = _ref.PI, E = _ref.E, log = _ref.log, sin = _ref.sin, cos = _ref.cos, tan = _ref.tan, asin = _ref.asin, acos = _ref.acos, atan = _ref.atan, atan2 = _ref.atan2, ceil = _ref.ceil, floor = _ref.floor, sqrt = _ref.sqrt, exp = _ref.exp, abs = _ref.abs, round = _ref.round;

  root.apply = root.apply = apply = function(args) {
    var f, x;
    f = args[0], x = args[1];
    return f.apply(null, [x]);
  };

  root.comp2 = root.comp2 = comp2 = function(f, g) {
    return function(x) {
      return f(g(x));
    };
  };

  root.comp = comp = function(flist) {
    return flist.reduceRight(comp2);
  };

  root.cons = cons = function(flist) {
    return function(x) {
      return flist.map(function(f) {
        return f(x);
      });
    };
  };

  root.cat = cat = function(a) {
    var _ref2;
    return (_ref2 = []).concat.apply(_ref2, a);
  };

  root.id = id = function(a) {
    return a;
  };

  root.k = k = function(a) {
    return function(b) {
      return a;
    };
  };

  root.aa = aa = function(f) {
    return function(list) {
      return list.map(function(e) {
        return f(e);
      });
    };
  };

  root.distr = distr = function(args) {
    var e, el, list, _i, _len, _results;
    list = args[0], e = args[1];
    _results = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      el = list[_i];
      _results.push([el, e]);
    }
    return _results;
  };

  root.distl = distl = function(args) {
    var e, el, list, _i, _len, _results;
    e = args[0], list = args[1];
    _results = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      el = list[_i];
      _results.push([e, el]);
    }
    return _results;
  };

  root.insr = insr = function(f) {
    return function(seq) {
      return seq.reduceRight(f);
    };
  };

  root.insl = insl = function(f) {
    return function(seq) {
      return seq.reduce(f);
    };
  };

  root.bigger = bigger = function(a, b) {
    if (a > b) {
      return a;
    } else {
      return b;
    }
  };

  root.smaller = smaller = function(a, b) {
    if (a < b) {
      return a;
    } else {
      return b;
    }
  };

  root.biggest = biggest = function(args) {
    return args.reduce(bigger);
  };

  root.biggest = biggest = function(args) {
    return (insr(bigger))(args);
  };

  root.smallest = smallest = function(args) {
    return (insr(smaller))(args);
  };

  root.list = list = function(args) {
    return (cons([id]))(args);
  };

  root.len = len = function(args) {
    return args.length;
  };

  root.reverse = reverse = function(args) {
    var i, _ref2, _results;
    if (args.length > 1) {
      _results = [];
      for (i = _ref2 = args.length - 1; _ref2 <= 0 ? i <= 0 : i >= 0; _ref2 <= 0 ? i++ : i--) {
        _results.push(args[i]);
      }
      return _results;
    } else {
      return args;
    }
  };

  root.tail = tail = function(args) {
    if (args.length > 0) {
      return args.splice(1, args.length - 1);
    } else {
      return args;
    }
  };

  root.butlast = butlast = function(args) {
    if (args.length > 1) {
      return reverse(tail(reverse(args)));
    } else {
      return [];
    }
  };

  root.al = al = function(args) {
    return cat(args);
  };

  root.ar = ar = function(args) {
    return cat(args);
  };

  root.repeat = repeat = function(n) {
    return function(args) {
      var i, _results;
      _results = [];
      for (i = 0; 0 <= n ? i < n : i > n; 0 <= n ? i++ : i--) {
        _results.push(args);
      }
      return _results;
    };
  };

  root.replica = replica = function(n) {
    return function(args) {
      var i;
      return cat((function() {
        var _results;
        _results = [];
        for (i = 0; 0 <= n ? i < n : i > n; 0 <= n ? i++ : i--) {
          _results.push(args);
        }
        return _results;
      })());
    };
  };

  root.sum = sum = function(args) {
    if (typeof args[0] === 'number') {
      return (insl(function(x, y) {
        return x + y;
      }))(args);
    } else {
      return aa(insl(function(x, y) {
        return x + y;
      }))(trans(args));
    }
  };

  root.sub = sub = function(args) {
    if (typeof args[0] === 'number') {
      return (insl(function(x, y) {
        return x - y;
      }))(args);
    } else {
      return aa(insl(function(x, y) {
        return x - y;
      }))(trans(args));
    }
  };

  root.mul = mul = function(args) {
    if (typeof args[0] === 'number') {
      return (insl(function(x, y) {
        return x * y;
      }))(args);
    } else {
      return aa(insl(function(x, y) {
        return x * y;
      }))(trans(args));
    }
  };

  root.div = div = function(args) {
    if (typeof args[0] === 'number') {
      return (insl(function(x, y) {
        return x / y;
      }))(args);
    } else {
      return aa(insl(function(x, y) {
        return x / y;
      }))(trans(args));
    }
  };

  root.trans = trans = function(args) {
    var i, j, m, n, _results;
    n = args.length;
    m = args[0].length;
    args = cat(args);
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

  root.vect = vect = function(binaryop) {
    return function(args) {
      return aa(binaryop)(trans(args));
    };
  };

  root.myprint = myprint = function(string, params) {
    return console.log(string, params, "\n");
  };

  root.mat = mat = function(m, n) {
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

  root.isNumber = isNumber = function(n) {
    return (!isNaN(parseFloat(n))) && isFinite(n);
  };

  root.progressive_sum = progressive_sum = function(args) {
    var i;
    return al([
      0, (function() {
        var _ref2, _results;
        _results = [];
        for (i = 0, _ref2 = args.length; 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
          _results.push((insr(function(x, y) {
            return x + y;
          }))(args.slice(0, i + 1 || 9e9)));
        }
        return _results;
      })()
    ]);
  };

  root.type = type = function(obj) {
    var classToType, myClass, name, _i, _len, _ref2;
    if (obj === void 0 || obj === null) return String(obj);
    classToType = new Object;
    _ref2 = "Boolean Number String Function Array Date RegExp".split(" ");
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      name = _ref2[_i];
      classToType["[object " + name + "]"] = name.toLowerCase();
    }
    myClass = Object.prototype.toString.call(obj);
    if (myClass in classToType) return classToType[myClass];
    return "object";
  };

  root.typedPrint = typedPrint = function(args) {
    console.log("" + (type(args)) + "::" + args);
    return args;
  };

  root.clone = clone = function(obj) {
    var key, newInstance;
    if (!(obj != null) || typeof obj !== 'object') return obj;
    newInstance = new obj.constructor();
    for (key in obj) {
      newInstance[key] = clone(obj[key]);
    }
    return newInstance;
  };

  root.PRECISION = PRECISION = 1E7;

  root.fixedPrecision = fixedPrecision = function(number) {
    var int;
    int = (number > 0 ? floor : ceil)(number);
    number = (number > 0 ? ceil : floor)(PRECISION * number) / PRECISION;
    if (abs(number - int) <= 1.0 / PRECISION) {
      return int;
    } else {
      return number;
    }
  };

  root.fcode = fcode = function(point) {
    return (aa(fixedPrecision))(point);
  };

  root.code = code = function(point) {
    return "[" + (fcode(point)) + "]";
  };

  root.decode = decode = function(string) {
    return +string;
  };

  root.uncode = uncode = function(pointCode) {
    return (aa(decode))(pointCode.split(','));
  };

  root.string2numberList = string2numberList = function(string) {
    var regex;
    if (string === '[]') {
      return [];
    } else {
      regex = /[,|\[|\]]/;
      return (aa(Number))(butlast(tail(string.split(regex))));
    }
  };

  root.mapcomp = mapcomp = function(map1, map2) {
    var k, map, v, _results;
    map = {};
    _results = [];
    for (k in map1) {
      v = map1[k];
      _results.push(map[k] = map2[v]);
    }
    return _results;
  };

  root.revert = revert = function(cell) {
    len = cell.length;
    if (len > 1) {
      return cat([cell[len - 1], cell.slice(1, (len - 1)), cell[0]]);
    } else {
      return cell;
    }
  };

  root.remove_duplicates = remove_duplicates = function(hasDupes) {
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

  root.rotate = rotate = function(cell) {
    if (cell.length > 1) {
      return cat([cell.slice(1, cell.length), [cell[0]]]);
    } else {
      return cell;
    }
  };

  root.facets = facets = function(cell) {
    var facet, h, i, k, out, _ref2;
    out = [];
    for (h = 0, _ref2 = cell.length; 0 <= _ref2 ? h < _ref2 : h > _ref2; 0 <= _ref2 ? h++ : h--) {
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

  root.skeleton = skeleton = function(h_cells) {
    var cell;
    return remove_duplicates(cat((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = h_cells.length; _i < _len; _i++) {
        cell = h_cells[_i];
        _results.push(facets(cell));
      }
      return _results;
    })()));
  };

  root.cell_complex = cell_complex = function(d_cells) {
    var cells, dim, h;
    if (d_cells.length > 0) {
      dim = d_cells[0].length - 1;
      cells = new Array(dim);
      cells[dim] = d_cells;
      for (h = dim; dim <= 1 ? h <= 1 : h >= 1; dim <= 1 ? h++ : h--) {
        cells[h - 1] = skeleton(cells[h]);
      }
      return cells;
    } else {
      dim = -1;
      return cells = [];
    }
  };

  root.mkCellDB = mkCellDB = function(complex) {
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

  root.homology_maps = homology_maps = function(dictos) {
    var cell, d, dim, facet, homology, i, key, simplex, skel, _i, _j, _len, _len2, _ref2, _ref3;
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
            var _i, _len, _ref2, _results;
            _ref2 = facets(simplex);
            _results = [];
            for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
              facet = _ref2[_i];
              _results.push([skel[cell], facet[0]]);
            }
            return _results;
          })());
        }
        homology[1] = cat(homology[1]);
        _ref2 = dictos.slice(2, dim + 1 || 9e9);
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          skel = _ref2[_i];
          d += 1;
          for (cell in skel) {
            _ref3 = facets(string2numberList(cell));
            for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
              facet = _ref3[_j];
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

  root.coords_distribute = coords_distribute = function(x) {
    var e, out;
    return out = cat((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = x.length; _i < _len; _i++) {
        e = x[_i];
        _results.push(aa(ar)(distr(e)));
      }
      return _results;
    })());
  };

  root.subcomplex = subcomplex = function(d, args) {
    var i, _ref2, _results;
    _results = [];
    for (i = 0, _ref2 = args.length - d; 0 <= _ref2 ? i <= _ref2 : i >= _ref2; 0 <= _ref2 ? i++ : i--) {
      _results.push(args.slice(i, (i + d)));
    }
    return _results;
  };

  root.shift = shift = function(n, listoflists) {
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

  PointSet = (function() {

    function PointSet(points) {
      var i, k, map1, map2, pcode, pid, point, v, _len, _len2, _ref2, _ref3;
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
        _ref2 = [{}, 0], map2 = _ref2[0], k = _ref2[1];
        _ref3 = this.dict;
        for (pcode in _ref3) {
          pid = _ref3[pcode];
          map2[decode(pid)] = k;
          k += 1;
        }
        this.map = (function() {
          var _ref4, _results;
          _ref4 = mapcomp(map1, map2);
          _results = [];
          for (k in _ref4) {
            v = _ref4[k];
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
      var pcode, pid, point, _len, _ref2, _ref3, _results;
      _ref2 = this.dict;
      for (pcode in _ref2) {
        pid = _ref2[pcode];
        this.verts[pid] = modify(uncode(pcode));
      }
      this.dict = {};
      _ref3 = this.verts;
      _results = [];
      for (pid = 0, _len = _ref3.length; pid < _len; pid++) {
        point = _ref3[pid];
        _results.push(this.dict[code(point)] = pid);
      }
      return _results;
    };

    PointSet.prototype.t = function(indices, values) {
      var h, k, _ref2;
      vect = (function() {
        var _ref2, _results;
        _results = [];
        for (k = 0, _ref2 = this.rn; 0 <= _ref2 ? k <= _ref2 : k >= _ref2; 0 <= _ref2 ? k++ : k--) {
          _results.push(0);
        }
        return _results;
      }).call(this);
      for (h = 0, _ref2 = indices.length; 0 <= _ref2 ? h < _ref2 : h > _ref2; 0 <= _ref2 ? h++ : h--) {
        vect[indices[h]] = values[h];
      }
      this.update(function(point) {
        return sum([point, vect]);
      });
      return this;
    };

    PointSet.prototype.s = function(indices, values) {
      var h, k, _ref2;
      vect = (function() {
        var _ref2, _results;
        _results = [];
        for (k = 0, _ref2 = this.rn; 0 <= _ref2 ? k <= _ref2 : k >= _ref2; 0 <= _ref2 ? k++ : k--) {
          _results.push(1);
        }
        return _results;
      }).call(this);
      for (h = 0, _ref2 = indices.length; 0 <= _ref2 ? h < _ref2 : h > _ref2; 0 <= _ref2 ? h++ : h--) {
        vect[indices[h]] = values[h];
      }
      this.update(function(point) {
        return mul([point, vect]);
      });
      return this;
    };

    /*
    	r: (axes, angle) ->
    		@update (point) -> id([axes, angle])
    		@
    */

    return PointSet;

  })();

  root.PointSet = PointSet;

  Topology = (function() {

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
        var _i, _len, _ref2, _results;
        _ref2 = this.dictos;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          dict = _ref2[_i];
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
      var cell, cells, dim, extruded_simplices, final_simplices, i, lastcoords, nsteps, nverts, simplex_layer, simplexes, sliced_vertices, vertPtrs, vertices, verts, _i, _len;
      cells = clone(this.faces.cells);
      dim = clone(this.faces.dim);
      verts = clone(this.vertices.verts);
      lastcoords = progressive_sum(aa(abs)(hlist));
      if (dim === 0) {
        cells = [[], []];
        vertices = (aa(list))(lastcoords);
        cells[1] = (function() {
          var _ref2, _results;
          _results = [];
          for (i = 0, _ref2 = hlist.length + 1; 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
            _results.push([i, i + 1]);
          }
          return _results;
        })();
      } else {
        simplexes = cells[dim];
        nverts = verts.length;
        nsteps = lastcoords.length;
        sliced_vertices = (replica(nsteps))([verts]);
        vertices = coords_distribute(trans([repeat(nsteps)(verts), lastcoords]));
        extruded_simplices = [];
        for (_i = 0, _len = simplexes.length; _i < _len; _i++) {
          cell = simplexes[_i];
          vertPtrs = cat([
            cell, cell.map(function(x) {
              return x + nverts;
            })
          ]);
          extruded_simplices.push(subcomplex(dim + 2, vertPtrs));
        }
        final_simplices = [];
        for (i = 0; 0 <= nsteps ? i <= nsteps : i >= nsteps; 0 <= nsteps ? i++ : i--) {
          if (hlist[i] > 0) {
            simplex_layer = shift(nverts * i, cat(extruded_simplices));
            final_simplices.push(simplex_layer);
          }
        }
        cells = cat(final_simplices);
      }
      return new SimplicialComplex(vertices, cells);
    };

    return SimplicialComplex;

  })();

  root.SimplicialComplex = SimplicialComplex;

  root.t = t = function(indices, values) {
    return function(obj) {
      return (clone(obj)).t(indices, values);
    };
  };

  root.s = s = function(indices, values) {
    return function(obj) {
      return (clone(obj)).s(indices, values);
    };
  };

  root.centroid = centroid = function(obj) {
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
      C = repeat(A.length)(1.0 / A.length);
      return point = numeric.dot(C, A);
    };
  };

  /*
  root.obj = obj = new SimplicialComplex [[0,0,0],[1,0,0],[0,1,0],[0,0,1]],[[0,1,2,3]]
  */

  root.simplexGrid = simplexGrid = function(args) {
    var cells, complex, hlist, i, lastcoords, verts, _i, _len, _ref2;
    hlist = args[0];
    lastcoords = progressive_sum(aa(abs)(hlist));
    verts = aa(list)(lastcoords);
    cells = (function() {
      var _ref2, _results;
      _results = [];
      for (i = 0, _ref2 = hlist.length; 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
        if (hlist[i] > 0) _results.push([i, i + 1]);
      }
      return _results;
    })();
    complex = new SimplicialComplex(verts, cells);
    _ref2 = args.slice(1, args.length);
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      hlist = _ref2[_i];
      complex = complex.extrude(hlist);
    }
    return complex;
  };

  root.free = free = function(obj) {
    var cell, d, k, out, outsimplex, simplex, simplices, _i, _j, _len, _results;
    d = obj.faces.dim;
    simplices = (function() {
      var _i, _len, _ref2, _results;
      _ref2 = obj.faces.cells[d];
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        cell = _ref2[_i];
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

  root.explode = explode = function(args) {
    return function(scene) {
      var center, centers, face, item, k, pair, scaledCenters, translVectors, v, _i, _len, _ref2, _results, _results2;
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
        var _i, _len, _ref2, _results;
        _ref2 = trans([scaledCenters, centers]);
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          pair = _ref2[_i];
          _results.push(sub(pair));
        }
        return _results;
      })();
      _results = [];
      for (k = 0, _len = translVectors.length; k < _len; k++) {
        v = translVectors[k];
        _results.push(scene[k].t((function() {
          _results2 = [];
          for (var _i = 0, _ref2 = v.length; 0 <= _ref2 ? _i < _ref2 : _i > _ref2; 0 <= _ref2 ? _i++ : _i--){ _results2.push(_i); }
          return _results2;
        }).apply(this), v));
      }
      return _results;
    };
  };

  root.outline = outline = function(dim) {
    return function(pol) {
      var faces_d, verts;
      verts = pol.vertices.verts;
      faces_d = pol.faces.cells[dim];
      return new SimplicialComplex(verts, faces_d);
    };
  };

  /*
  obj = simplexGrid ([[1],[1],[1]])
  obj = outline(2)(obj) ## OK

  obj = outline(1)(obj) ## KO

  obj = simplexGrid ([[1],[1]])
  obj = outline(1)(obj) ## KO
  console.log "outverts",obj.vertices.verts
  console.log "outfaces",obj.faces.cells[obj.faces.dim]
  model = viewer.draw(obj)
  */

  l = [1, -1, 1, -1, 1, -1, 1];
  obj = simplexGrid([l, l, l]);
  eobj = explode([1.8,1.8,1.8])(free(obj));
  model = viewer.draw(eobj);

}).call(this);
