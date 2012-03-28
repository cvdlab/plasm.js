
/*
tetra = new Graph SIMPLEX 3
cube = new Graph CUBE 3
cubes = new Graph SIMPLEXGRID [[1,-1,1],[1,-1,1],[1,-1,1]]
#cubes.draw CAT (AL [k, cubes.upCells(k)] for k in [1, 12, 24, 36, 120, 160])
tetra.draw [0...14]
PRINT "tetra =", tetra
PRINT "tetra.firstNodePerLevel =", tetra.firstNodePerLevel
PRINT "tetra.uknode(14) =", tetra.uknode(14)
*/

(function() {
  var CELLSPERLEVEL, DOWNTRAVERSE, GETINTERSECTION, SORTED, UPTRAVERSE, g, getfathers, grouping, hccmesh, object, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  GETINTERSECTION = function(G) {
    return function(from_cells) {
      var h, k, level, node, num, reached, result, val, _i, _j, _len, _len2, _ref, _ref2, _results;
      result = [];
      num = from_cells.length;
      reached = new Object;
      for (_i = 0, _len = from_cells.length; _i < _len; _i++) {
        k = from_cells[_i];
        _ref = G.uknode(k), level = _ref[0], h = _ref[1];
        _ref2 = G.up[level][h];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          node = _ref2[_j];
          if (reached[node] != null) {
            reached[node] += 1;
          } else {
            reached[node] = 1;
          }
        }
      }
      _results = [];
      for (node in reached) {
        val = reached[node];
        if (val === num) _results.push(+node);
      }
      return _results;
    };
  };

  CELLSPERLEVEL = function(g) {
    return function(h) {
      return g.faces.dictos[h];
    };
  };

  grouping = function(tuples) {
    var LAST, first, groups, h, k, last, m, n, _ref, _ref2;
    LAST = function(array) {
      return array[String(array.length - 1)];
    };
    n = tuples.length;
    m = tuples[0].length - 1;
    groups = [[tuples[0]]];
    h = 0;
    _ref = [tuples[0][0], tuples[0][m]], first = _ref[0], last = _ref[1];
    for (k = 1; 1 <= n ? k < n : k > n; 1 <= n ? k++ : k--) {
      if ((tuples[k][0] === first) && (tuples[k][m] === last)) {
        groups[h].push(tuples[k]);
      } else {
        groups.push([tuples[k]]);
        h += 1;
        _ref2 = [tuples[k][0], tuples[k][m]], first = _ref2[0], last = _ref2[1];
      }
    }
    return groups;
  };

  SORTED = function(arrayOfArray, order) {
    if (order == null) order = true;
    return arrayOfArray.sort(order ? function(a, b) {
      return a[0] - b[0];
    } : function(a, b) {
      return b[0] - a[0];
    });
  };

  DOWNTRAVERSE = function(g, nrecursion, cell) {
    var multiTraverse;
    multiTraverse = function(g, nrecursion, cell) {
      var Down, L, ret, _i, _len, _ref;
      if (nrecursion === 0) return [[cell]];
      ret = [];
      _ref = g.downCells(cell);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        Down = _ref[_i];
        ret.push((function() {
          var _j, _len2, _ref2, _results;
          _ref2 = multiTraverse(g, nrecursion - 1, Down);
          _results = [];
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            L = _ref2[_j];
            _results.push(AL([cell, L]));
          }
          return _results;
        })());
      }
      return CAT(ret);
    };
    return grouping(SORTED(AA(REVERSE)(multiTraverse(g, nrecursion, cell))));
  };

  UPTRAVERSE = function(g1) {
    return function(subgraph, k) {
      var h, out, _ref;
      if (k === 1) {
        return CAT(subgraph);
      } else {
        out = [];
        for (h = 1, _ref = k - 1; 1 <= _ref ? h <= _ref : h >= _ref; 1 <= _ref ? h++ : h--) {
          out.push(SET((CAT(AA(getfathers(g1, h))(subgraph))).filter(Number)));
        }
        return CAT(out);
      }
    };
  };

  getfathers = function(g1, h) {
    return function(tuple) {
      var i, out, rel2abs;
      rel2abs = function(level) {
        return function(node) {
          return g1.nodes[level][node];
        };
      };
      out = (function() {
        var _ref, _results;
        _results = [];
        for (i = 0, _ref = tuple.length - 1; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          _results.push(GETINTERSECTION(g1)([tuple[i], tuple[i + 1]]));
        }
        return _results;
      })();
      out = AA(rel2abs(h))(out);
      return out;
    };
  };

  hccmesh = function(mesh) {
    var cells, d, down, face, faces, facet, facets, g, g1, gg, k_faces, model, newnode, newverts, node, pair, root, sg, subgraphs, up, vert, vertices, verts, _h, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _len6, _len7, _m, _n, _o, _p, _q, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _results;
    g = new Graph(mesh);
    d = g.object.faces.dim;
    _ref = [g.up, g.down], up = _ref[0], down = _ref[1];
    faces = (function() {
      var _i, _len, _ref2, _results;
      _ref2 = g.object.faces.cells;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        k_faces = _ref2[_i];
        _results.push((function() {
          var _j, _len2, _results2;
          _results2 = [];
          for (_j = 0, _len2 = k_faces.length; _j < _len2; _j++) {
            face = k_faces[_j];
            _results2.push(face);
          }
          return _results2;
        })());
      }
      return _results;
    })();
    newverts = CAT((function() {
      var _i, _len, _ref2, _results;
      _ref2 = g.object.faces.cells;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        k_faces = _ref2[_i];
        _results.push((function() {
          var _j, _len2, _results2;
          _results2 = [];
          for (_j = 0, _len2 = k_faces.length; _j < _len2; _j++) {
            face = k_faces[_j];
            _results2.push(CENTROID(g.object)(face));
          }
          return _results2;
        })());
      }
      return _results;
    })());
    cells = AA(LIST)((function() {
      _results = [];
      for (var _i = 0, _ref2 = newverts.length; 0 <= _ref2 ? _i < _ref2 : _i > _ref2; 0 <= _ref2 ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this));
    gg = new SimplicialComplex(newverts, cells);
    model = viewer.draw(gg);
    g1 = new Graph(gg);
    g1.firstNodePerLevel.push(g1.maxnode);
    g1.nodes.push([]);
    g1.up.push([]);
    g1.down.push([]);
    for (_k = 1; 1 <= d ? _k < d : _k > d; 1 <= d ? _k++ : _k--) {
      for (_h = _k, _ref3 = d + 1; _k <= _ref3 ? _h < _ref3 : _h > _ref3; _k <= _ref3 ? _h++ : _h--) {
        _ref4 = g.cellsPerLevel(_h);
        for (_j = 0, _len = _ref4.length; _j < _len; _j++) {
          root = _ref4[_j];
          subgraphs = DOWNTRAVERSE(g, _k, root);
          faces = (function() {
            var _l, _len2, _results2;
            _results2 = [];
            for (_l = 0, _len2 = subgraphs.length; _l < _len2; _l++) {
              sg = subgraphs[_l];
              _results2.push(UPTRAVERSE(g1)(sg, _k));
            }
            return _results2;
          })();
          for (_l = 0, _len2 = faces.length; _l < _len2; _l++) {
            face = faces[_l];
            newnode = g1.addNode(_k);
            for (_m = 0, _len3 = face.length; _m < _len3; _m++) {
              node = face[_m];
              g1.addArc(+node, newnode);
            }
          }
        }
      }
      /*
      		cells = []
      		for n in g1.cellsPerLevel(_k)
      			PRINT "_k,n,g1.uknode n", JSON.stringify [_k,n,g1.uknode n]
      			cells.push g1.cellByVerts(n)
      		cells = CAT(cells)
      		gg = new SimplicialComplex newverts,cells
      		model = viewer.draw gg
      */
      g1.firstNodePerLevel.push(g1.maxnode);
      g1.nodes.push([]);
      g1.up.push([]);
      g1.down.push([]);
    }
    _ref5 = g.cellsPerLevel(d);
    for (_n = 0, _len4 = _ref5.length; _n < _len4; _n++) {
      root = _ref5[_n];
      subgraphs = DOWNTRAVERSE(g, d, root);
      facets = (function() {
        var _len5, _o, _results2;
        _results2 = [];
        for (_o = 0, _len5 = subgraphs.length; _o < _len5; _o++) {
          sg = subgraphs[_o];
          _results2.push(UPTRAVERSE(g1)(sg, d));
        }
        return _results2;
      })();
      vertices = (function() {
        var _len5, _o, _results2;
        _results2 = [];
        for (_o = 0, _len5 = subgraphs.length; _o < _len5; _o++) {
          sg = subgraphs[_o];
          _results2.push(SET(CAT(sg)));
        }
        return _results2;
      })();
      _ref6 = TRANS([facets, vertices]);
      for (_o = 0, _len5 = _ref6.length; _o < _len5; _o++) {
        pair = _ref6[_o];
        facet = pair[0], verts = pair[1];
        newnode = g1.addNode(d);
        for (_p = 0, _len6 = facet.length; _p < _len6; _p++) {
          node = facet[_p];
          g1.addArc(node, newnode);
        }
        for (_q = 0, _len7 = verts.length; _q < _len7; _q++) {
          vert = verts[_q];
          g1.addArc(newnode, vert);
        }
      }
    }
    /*
    	cells = []
    	for n in g1.cellsPerLevel(1)
    		[k,h] = g1.uknode n
    		cells.push g1.up[k][h]
    	#cells = (g1.up[k][h];  [k,h] = g1.uknode n for n in g1.cellsPerLevel(1))
    */
    return g1;
  };

  object = SIMPLEXGRID(REPEAT(3)(REPEAT(5)(1)));

  root.g = g = hccmesh(object);

  viewer.drawGraph(g);

}).call(this);
