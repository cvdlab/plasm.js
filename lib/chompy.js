(function() {
  var E, Facets, PI, PRECISION, PointSet, SimplicialComplex, Topology, aa, abs, acos, al, apply, ar, asin, atan, atan2, bigger, biggest, boundary, boundary_signs, butlast, cat, ceil, cell, centroid, clone, code, comp, comp2, cons, cos, d, decode, distl, distr, div, exp, explode, fcode, fixedPrecision, floor, free, id, insl, insr, invertOrientation, isNumber, k, len, list, log, mapcomp, mat, model, mul, myprint, obj, orientation, progressive_sum, remove_duplicates, repeat, replica, reverse, revert, root, rotate, round, s, sign, simplexGrid, simplexMatrix, sin, skeleton, skeltn, smaller, smallest, sqrt, string2numberList, sub, sum, t, tail, tan, trans, type, typedPrint, uncode, vect, volume;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  PI = Math.PI, E = Math.E, log = Math.log, sin = Math.sin, cos = Math.cos, tan = Math.tan, asin = Math.asin, acos = Math.acos, atan = Math.atan, atan2 = Math.atan2, ceil = Math.ceil, floor = Math.floor, sqrt = Math.sqrt, exp = Math.exp, abs = Math.abs, round = Math.round;

  apply = function(args) {
    var f, x;
    f = args[0], x = args[1];
    return f.apply(null, [x]);
  };

  comp2 = function(f, g) {
    return function(x) {
      return f(g(x));
    };
  };

  comp = function(flist) {
    return flist.reduceRight(comp2);
  };

  cons = function(flist) {
    return function(x) {
      return flist.map(function(f) {
        return f(x);
      });
    };
  };

  cat = function(a) {
    var _ref;
    return (_ref = []).concat.apply(_ref, a);
  };

  id = function(a) {
    return a;
  };

  k = function(a) {
    return function(b) {
      return a;
    };
  };

  aa = function(f) {
    return function(list) {
      return list.map(function(e) {
        return f(e);
      });
    };
  };

  distr = function(args) {
    var e, el, list, _i, _len, _results;
    list = args[0], e = args[1];
    _results = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      el = list[_i];
      _results.push([el, e]);
    }
    return _results;
  };

  distl = function(args) {
    var e, el, list, _i, _len, _results;
    e = args[0], list = args[1];
    _results = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      el = list[_i];
      _results.push([e, el]);
    }
    return _results;
  };

  insr = function(f) {
    return function(seq) {
      return seq.reduceRight(f);
    };
  };

  insl = function(f) {
    return function(seq) {
      return seq.reduce(f);
    };
  };

  bigger = function(a, b) {
    if (a > b) {
      return a;
    } else {
      return b;
    }
  };

  smaller = function(a, b) {
    if (a < b) {
      return a;
    } else {
      return b;
    }
  };

  biggest = function(args) {
    return args.reduce(bigger);
  };

  biggest = function(args) {
    return (insr(bigger))(args);
  };

  smallest = function(args) {
    return (insr(smaller))(args);
  };

  list = function(args) {
    return (cons([id]))(args);
  };

  len = function(args) {
    return args.length;
  };

  reverse = function(args) {
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

  tail = function(args) {
    if (args.length > 0) {
      return args.splice(1, args.length - 1);
    } else {
      return args;
    }
  };

  butlast = function(args) {
    if (args.length > 1) {
      return reverse(tail(reverse(args)));
    } else {
      return [];
    }
  };

  al = function(args) {
    return cat(args);
  };

  ar = function(args) {
    return cat(args);
  };

  repeat = function(n) {
    return function(args) {
      var i, _results;
      _results = [];
      for (i = 0; 0 <= n ? i < n : i > n; 0 <= n ? i++ : i--) {
        _results.push(args);
      }
      return _results;
    };
  };

  replica = function(n) {
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

  sum = function(args) {
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

  sub = function(args) {
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

  mul = function(args) {
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

  div = function(args) {
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

  trans = function(args) {
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

  vect = function(binaryop) {
    return function(args) {
      return aa(binaryop)(trans(args));
    };
  };

  myprint = function(string, params) {
    return console.log(string, params, "\n");
  };

  mat = function(m, n) {
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

  isNumber = function(n) {
    return (!isNaN(parseFloat(n))) && isFinite(n);
  };

  progressive_sum = function(args) {
    var i;
    return al([
      0, (function() {
        var _ref, _results;
        _results = [];
        for (i = 0, _ref = args.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          _results.push((insr(function(x, y) {
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
    return (aa(fixedPrecision))(point);
  };

  code = function(point) {
    return "[" + (fcode(point)) + "]";
  };

  decode = function(string) {
    return +string;
  };

  uncode = function(pointCode) {
    return (aa(decode))(pointCode.split(','));
  };

  string2numberList = function(string) {
    var regex;
    if (string === '[]') {
      return [];
    } else {
      regex = /[,|\[|\]]/;
      return (aa(Number))(butlast(tail(string.split(regex))));
    }
  };

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

  revert = function(cell) {
    len = cell.length;
    if (len > 1) {
      return cat([cell[len - 1], cell.slice(1, (len - 1)), cell[0]]);
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
      return cat([cell.slice(1, cell.length), [cell[0]]]);
    } else {
      return cell;
    }
  };

  Facets = function(cell) {
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
    return remove_duplicates(cat((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = h_cells.length; _i < _len; _i++) {
        cell = h_cells[_i];
        _results.push(Facets(cell));
      }
      return _results;
    })()));
  };

  PointSet = (function() {

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
      var h, k, _ref;
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
      var h, k, _ref;
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

    /*
    	r: (axes, angle) ->
    		@update (point) -> id([axes, angle])
    		@
    */

    return PointSet;

  })();

  PointSet;

  Topology = (function() {
    var cell_complex, homology_maps, mkCellDB;

    cell_complex = function(d_cells) {
      var cells, dim, h;
      console.log("cell_complex::d_cells ====>>", d_cells);
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
      console.log("complex ====>>", complex);
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
              _ref = Facets(simplex);
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                facet = _ref[_i];
                _results.push([skel[cell], facet[0]]);
              }
              return _results;
            })());
          }
          homology[1] = cat(homology[1]);
          _ref = dictos.slice(2, dim + 1 || 9e9);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            skel = _ref[_i];
            d += 1;
            for (cell in skel) {
              _ref2 = Facets(string2numberList(cell));
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
      console.log("topology::d_cells ===>>", d_cells);
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
      console.log("topology::d_cells remapped===>>", d_cells);
      this.dictos = mkCellDB(cell_complex(d_cells));
      console.log("topology::@dictos ===>>", this.dictos);
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

  Topology;

  simplexMatrix = function(obj) {
    return function(cell) {
      var k, out;
      return out = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = cell.length; _i < _len; _i++) {
          k = cell[_i];
          _results.push(ar([obj.vertices.verts[k], 1.0]));
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

  SimplicialComplex = (function() {

    function SimplicialComplex(points, d_cells) {
      points = points || [];
      d_cells = d_cells || [];
      console.log("points ===>>", points);
      console.log("d_cells ===>>", d_cells);
      this.vertices = new PointSet(points);
      console.log("@vertices ===>>", this.vertices);
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
      lastcoords = progressive_sum(aa(abs)(hlist));
      if (dim <= 0) {
        cells = [[], []];
        vertices = (aa(list))(lastcoords);
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

    SimplicialComplex.prototype.boundary = function() {
      var boundary_pairs, boundary_signs, d, d1_faces, d_faces, dictos, facet, facets, father, hom, incidence, k, out, pair, rn, vertices, _i, _len, _len2, _ref;
      d = this.faces.dim;
      rn = this.vertices.rn;
      console.log("d =", numeric.prettyPrint(d));
      facets = this.faces.cells[d - 1];
      console.log("facets =", numeric.prettyPrint(facets));
      if (d <= 0) return new SimplicialComplex([], []);
      vertices = this.vertices.verts;
      console.log("vertices =", numeric.prettyPrint(vertices));
      simplexMatrix = function(cell) {
        var k, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = cell.length; _i < _len; _i++) {
          k = cell[_i];
          _results.push(ar([vertices[k], 1.0]));
        }
        return _results;
      };
      volume = function(cell) {
        return numeric.det(simplexMatrix(cell));
      };
      orientation = function(d, d_cells) {
        var cell, out;
        console.log("d,d_cells >>>>", d, d_cells);
        console.log("@vertices >>>>", vertices);
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
      console.log("dictos =", numeric.prettyPrint(dictos));
      hom = this.faces.homology;
      console.log("hom =", numeric.prettyPrint(hom));
      incidence = (function() {
        var _ref, _results;
        _results = [];
        for (k = 0, _ref = facets.length; 0 <= _ref ? k < _ref : k > _ref; 0 <= _ref ? k++ : k--) {
          _results.push(0);
        }
        return _results;
      })();
      console.log("incidence =", numeric.prettyPrint(incidence));
      father = new Array(facets.length);
      console.log("father =", numeric.prettyPrint(father));
      _ref = hom[d];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pair = _ref[_i];
        incidence[pair[1]] += 1;
        father[pair[1]] = pair[0];
      }
      boundary_pairs = trans((function() {
        var _ref2, _results;
        _results = [];
        for (k = 0, _ref2 = facets.length; 0 <= _ref2 ? k < _ref2 : k > _ref2; 0 <= _ref2 ? k++ : k--) {
          if (incidence[k] === 1) _results.push([k, father[k]]);
        }
        return _results;
      })());
      console.log("boundary_pairs =", numeric.prettyPrint(boundary_pairs));
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
      console.log("d_faces =", numeric.prettyPrint(d_faces));
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
      console.log("d1_faces =", numeric.prettyPrint(d1_faces));
      boundary_signs = orientation(d, d_faces);
      console.log("boundary_signs =", numeric.prettyPrint(boundary_signs));
      for (k = 0, _len2 = d1_faces.length; k < _len2; k++) {
        facet = d1_faces[k];
        if (boundary_signs[k] > 0) {
          d1_faces[k] = invertOrientation(facet);
        } else {
          d1_faces[k] = facet;
        }
      }
      console.log("d1_faces =", d1_faces);
      out = new SimplicialComplex(vertices, d1_faces);
      console.log("out =", out);
      return out;
    };

    return SimplicialComplex;

  })();

  SimplicialComplex;

  t = function(indices, values) {
    return function(obj) {
      return (clone(obj)).t(indices, values);
    };
  };

  s = function(indices, values) {
    return function(obj) {
      return (clone(obj)).s(indices, values);
    };
  };

  centroid = function(obj) {
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
  obj = new SimplicialComplex [[0,0,0],[1,0,0],[0,1,0],[0,0,1]],[[0,1,2,3]]
  */

  simplexGrid = function(args) {
    var cells, complex, hlist, i, lastcoords, verts, _i, _len, _ref;
    hlist = args[0];
    lastcoords = progressive_sum(aa(abs)(hlist));
    verts = aa(list)(lastcoords);
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

  free = function(obj) {
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

  explode = function(args) {
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
        _ref = trans([scaledCenters, centers]);
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

  skeleton = function(dim) {
    return function(pol) {
      var faces_d, out2, verts;
      console.log(pol);
      verts = pol.vertices.verts;
      faces_d = pol.faces.cells[dim];
      console.log("verts =", verts);
      console.log("faces_d =", faces_d);
      out2 = new SimplicialComplex(verts, faces_d);
      return console.log("out2 =", out2);
    };
  };

  boundary = function(pol) {
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
    boundary_pairs = trans((function() {
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

  obj = simplexGrid([[1], [1], [1]]);

  d = obj.faces.dim;

  cell = obj.faces.cells[d][0];

  console.log("cell =", cell);

  console.log("simplexMatrix(obj)(cell) =\n", numeric.prettyPrint(simplexMatrix(obj)(cell)));

  console.log("volume(obj)(cell) =", volume(obj)(cell));

  boundary_signs = orientation(obj)(d, obj.faces.cells[d]);

  console.log("boundary_signs =", boundary_signs);

  console.log("invertOrientation [0..5]", invertOrientation([0, 1, 2, 3, 4, 5]));

  obj = simplexGrid([[1, -1, 1, 1, -1, 1], [1, -1, 1, 1, -1, 1], [1, 1]]);

  console.log(boundary(obj));

  model = viewer.draw(skeleton(0)(obj.boundary()));

  /*
  
  obj = simplexGrid ([[1],[1],[1]]) 
  console.log "typeof obj =",typeof obj
  console.log "obj =", obj
  obj1 = boundary(obj)
  console.log "typeof obj1 =",typeof obj1
  model = viewer.draw(obj1)
  
  
  obj = simplexGrid ([[1],[1],[1]])
  obj = skeleton(2)(obj) ## OK
  
  obj = skeleton(1)(obj) ## KO
  
  obj = simplexGrid ([[1],[1]])
  obj = skeleton(1)(obj) ## KO
  console.log "outverts",obj.vertices.verts
  console.log "outfaces",obj.faces.cells[obj.faces.dim]
  model = viewer.draw(obj)
  */

}).call(this);
