var E, PI, PRECISION, PointSet, SimplicialComplex, Topology, aa, abs, acos, al, apply, ar, asin, atan, atan2, bigger, biggest, butlast, cat, ceil, cell_complex, clone, code, comp, comp2, cons, coords_distribute, cos, decode, distl, distr, div, exp, facets, fcode, fixedPrecision, floor, homology_maps, id, insl, insr, k, list, log, mapcomp, mat, mkCellDB, mul, myprint, obj, progressive_sum, remove_duplicates, repeat, replica, reverse, revert, rotate, round, shift, simplexGrid, sin, skeleton, smaller, smallest, sqrt, string2numberList, sub, subcomplex, sum, tail, tan, trans, type, typedPrint, uncode;

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
    return seq.reduceLeft(f);
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

sum = function(args) {
  return (insr(function(x, y) {
    return x + y;
  }))(args);
};

sub = function(args) {
  return (insr(function(x, y) {
    return x - y;
  }))(args);
};

mul = function(args) {
  return (insr(function(x, y) {
    return x * y;
  }))(args);
};

div = function(args) {
  return (insr(function(x, y) {
    return x / y;
  }))(args);
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

/*
typedPrint [3.1415927,-3.1415927]
typedPrint code [PI,-PI]
typedPrint code [3.0000000123456,-PI]
typedPrint code [3.0000000123456,-3.0000000123456]
typedPrint code [3.000000123456,-3.000000123456]
console.log string2numberList '[1,2]'
console.log string2numberList '[1234,2000,-22]'
console.log string2numberList '[1234]'
console.log string2numberList '[]'
console.log string2numberList '[1.234, 3.1415]'
map1 = {1:10,2:20,3:30}
map2 = {10:100,20:200,30:300}
map = mapcomp map1,map2
console.log ("map1 = #{k},#{v}" for k,v of map1)
console.log ("map2 = #{k},#{v}" for k,v of map2)
console.log ("mapcomp map1,map2 = #{k},#{v}" for k,v of map)
console.log progressive_sum [1,2,3,4,5]
console.log progressive_sum [1,2]
console.log progressive_sum [1]
console.log progressive_sum []
console.log progressive_sum (aa abs) [1,1,1,3,-6,1,-10,5]
*/

revert = function(cell) {
  var len;
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

skeleton = function(h_cells) {
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

cell_complex = function(d_cells) {
  var cells, dim, h;
  dim = d_cells[0].length - 1;
  cells = new Array(dim);
  cells[dim] = d_cells;
  for (h = dim; dim <= 1 ? h <= 1 : h >= 1; dim <= 1 ? h++ : h--) {
    cells[h - 1] = skeleton(cells[h]);
  }
  return cells;
};

mkCellDB = function(complex) {
  var cell, d, dictos, k, skel, _len, _len2;
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
    homology[1] = cat(homology[1]);
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
};

/*
console.log string2numberList '[1,2]'
console.log string2numberList '[1234,2000,-22]'
console.log string2numberList '[1234]'
console.log string2numberList '[]'
console.log string2numberList '[1.234, 3.1415]'
console.log revert [1,2,3,4,5]
console.log revert [1,2]
console.log revert [[1,2,3,4,5]]
console.log revert [1]
console.log revert []
console.log code(revert [1,2,3])
console.log remove_duplicates [[1,2,3],[1,2,3],[3,2,1],[3,2,1],[4,5,6]]
console.log remove_duplicates [[1,2,3],[3,2,1]]
console.log remove_duplicates []
console.log rotate [1,2,3,4,5]
console.log rotate rotate [1,2,3,4,5]
console.log rotate rotate rotate [1,2,3,4,5]
console.log rotate [1]
console.log rotate [1,2]
console.log rotate []
console.log  facets [1]
console.log  facets [1,2]
console.log  facets [1,2,3]
console.log  facets [1,2,3,4]
console.log  facets [1,2,3,4,5]
console.log skeleton [ [ 0, 1, 2 ], [ 2, 1, 3 ] ]
console.log cell_complex [[ 0, 1, 2 ], [ 2, 1, 3 ]]
console.log mkCellDB cell_complex [[ 0, 1, 2 ], [ 2, 1, 3 ]]
console.log homology_maps mkCellDB cell_complex [[ 0, 1, 2 ], [ 2, 1, 3 ]]
*/

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

/*
console.log shift 3,[ [ 0, 1, 2, 4 ], [ 1, 2, 4, 5 ], [ 2, 4, 5, 6 ] ]
*/

PointSet = (function() {

  function PointSet(points) {
    var i, k, map1, map2, pcode, pid, point, v, _len, _len2, _ref, _ref2;
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
  }

  return PointSet;

})();

Topology = (function() {

  function Topology(vertices, d_cells) {
    var cell, dict, k;
    this.dim = d_cells[0].length - 1;
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

  function SimplicialComplex(points, d_cells) {
    if ((points != null) && (d_cells != null)) {
      this.vertices = new PointSet(points);
      console.log(this.vertices);
      this.faces = new Topology(this.vertices, d_cells);
    }
  }

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
      console.log(cells);
    }
    return new SimplicialComplex(vertices, cells);
  };

  return SimplicialComplex;

})();

/*
		# convex combination operator
		CCOMB = COMP([ SCALARVECTPROD,
		              CONS([ COMP([ DIV, CONS([K(1),LEN]) ]), VECTSUM ]) ])

		def EXPLODE (sx,sy,sz):
		    def explode0 (scene):
		        centers = [CCOMB(S1(UKPOL(obj))) for obj in scene]
		        scalings = len(centers) * [S([1,2,3])([sx,sy,sz])]
		        scaledCenters = [UK(APPLY(pair)) for pair in
		            zip(scalings, [MK(p) for p in centers])]
		        translVectors = [ VECTDIFF((p,q)) for (p,q) in zip(scaledCenters, centers) ]
		        translations = [ T([1,2,3])(v) for v in translVectors ]
		        return STRUCT([ APPLY((t,obj)) for (t,obj) in zip(translations,scene) ])
		    return explode0
*/

simplexGrid = function(args) {
  var cells, complex, hlist, i, lastcoords, verts, _i, _len, _ref, _results;
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
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    hlist = _ref[_i];
    _results.push(complex = complex.extrude(hlist));
  }
  return complex;
};

/*
obj = new SimplicialComplex([[0,0],[1,0],[0,1],[1,1]],[[0,1,2],[2,1,3]])
obj = obj.extrude([1,1,1])
console.log  obj
model = viewer.draw(obj).color([1,0,0])
*/

/*
obj = simplexGrid([[1, -1, 1], [1, -1, 1]]);
console.log(obj);
model = viewer.draw(obj);
*/

obj = simplexGrid([[1, -1, 1], [1, -1, 1], [1, -1, 1]]);
console.log(obj);
model = viewer.draw(obj);

