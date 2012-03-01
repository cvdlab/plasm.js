(function() {
  var Graph, cube, tetra,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Graph = (function(_super) {
    var mkarcs, mknodes;

    __extends(Graph, _super);

    function Graph(object) {
      var k, _ref;
      this.object = object;
      this.nodes = mknodes(object);
      _ref = mkarcs(object), this.up = _ref[0], this.down = _ref[1];
      this.firstNodePerLevel = (function() {
        var _ref2, _results;
        _results = [];
        for (k = 0, _ref2 = object.faces.dim; 0 <= _ref2 ? k <= _ref2 : k >= _ref2; 0 <= _ref2 ? k++ : k--) {
          _results.push(this.nodes[k][0]);
        }
        return _results;
      }).call(this);
    }

    Graph.prototype.cellsPerLevel = function(level) {
      var out;
      return out = this.nodes[level];
    };

    Graph.prototype.downCells = function(node) {
      var cell, h, k, _i, _len, _ref, _ref2, _results;
      _ref = this.uknode(node), k = _ref[0], cell = _ref[1];
      _ref2 = this.down[k][cell];
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        h = _ref2[_i];
        _results.push(this.nodes[k - 1][h]);
      }
      return _results;
    };

    Graph.prototype.upCells = function(node) {
      var cell, h, k, _i, _len, _ref, _ref2, _results;
      _ref = this.uknode(node), k = _ref[0], cell = _ref[1];
      _ref2 = this.up[k][cell];
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        h = _ref2[_i];
        _results.push(this.nodes[k + 1][h]);
      }
      return _results;
    };

    Graph.prototype.uknode = function(node) {
      var k;
      k = 0;
      while (this.firstNodePerLevel[k] <= node) {
        k += 1;
      }
      return [k - 1, node - this.firstNodePerLevel[k - 1]];
    };

    mknodes = function(object) {
      var add1, cells, counter, h, k, k_cells, nodes, _len, _len2, _ref;
      counter = 0;
      nodes = (function() {
        var _ref, _results;
        _results = [];
        for (k = 0, _ref = object.faces.cells.length; 0 <= _ref ? k < _ref : k > _ref; 0 <= _ref ? k++ : k--) {
          _results.push([
            (function() {
              var _ref2, _results2;
              _results2 = [];
              for (h = 0, _ref2 = object.faces.cells[k].length; 0 <= _ref2 ? h < _ref2 : h > _ref2; 0 <= _ref2 ? h++ : h--) {
                _results2.push([]);
              }
              return _results2;
            })()
          ]);
        }
        return _results;
      })();
      add1 = function(n) {
        return n + 1;
      };
      _ref = object.faces.cells;
      for (k = 0, _len = _ref.length; k < _len; k++) {
        k_cells = _ref[k];
        for (h = 0, _len2 = k_cells.length; h < _len2; h++) {
          cells = k_cells[h];
          nodes[k][h] = counter;
          counter = add1(counter);
        }
      }
      return nodes;
    };

    mkarcs = function(object) {
      var d, down, h, k, nodes, pair, up, _i, _len, _ref;
      d = object.faces.dim;
      up = (function() {
        var _results;
        _results = [];
        for (k = 0; 0 <= d ? k <= d : k >= d; 0 <= d ? k++ : k--) {
          _results.push([]);
        }
        return _results;
      })();
      down = (function() {
        var _results;
        _results = [];
        for (k = 0; 0 <= d ? k <= d : k >= d; 0 <= d ? k++ : k--) {
          _results.push([]);
        }
        return _results;
      })();
      for (k = 0; 0 <= d ? k <= d : k >= d; 0 <= d ? k++ : k--) {
        nodes = object.faces.cells[k].length;
        up[k] = (function() {
          var _results;
          _results = [];
          for (h = 0; 0 <= nodes ? h < nodes : h > nodes; 0 <= nodes ? h++ : h--) {
            _results.push([]);
          }
          return _results;
        })();
        down[k] = (function() {
          var _results;
          _results = [];
          for (h = 0; 0 <= nodes ? h < nodes : h > nodes; 0 <= nodes ? h++ : h--) {
            _results.push([]);
          }
          return _results;
        })();
      }
      for (k = 1; 1 <= d ? k <= d : k >= d; 1 <= d ? k++ : k--) {
        _ref = object.faces.homology[k];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          pair = _ref[_i];
          up[k - 1][pair[1]].push(pair[0]);
          down[k][pair[0]].push(pair[1]);
        }
      }
      return [up, down];
    };

    return Graph;

  })(SimplicialComplex);

  tetra = new Graph(SIMPLEX(3));

  cube = new Graph(CUBE(3));

  PRINT("tetra =", tetra);

  PRINT("cube =", cube);

  PRINT("cube.firstNodePerLevel =", cube.firstNodePerLevel);

  PRINT("cube.nodes =", cube.nodes);

  PRINT("cube.up =", cube.up);

  PRINT("cube.down =", cube.down);

  PRINT("cube.cellsPerLevel(0) =", cube.cellsPerLevel(0));

  PRINT("cube.cellsPerLevel(1) =", cube.cellsPerLevel(1));

  PRINT("cube.cellsPerLevel(3) =", cube.cellsPerLevel(3));

  PRINT("cube.upCells(0) =", cube.upCells(0));

  PRINT("cube.upCells(1) =", cube.upCells(1));

  PRINT("cube.upCells(2) =", cube.upCells(2));

  PRINT("cube.upCells(3) =", cube.upCells(3));

  PRINT("cube.upCells(7) =", cube.upCells(7));

  PRINT("cube.downCells(14) =", cube.downCells(14));

  PRINT("cube.downCells(7) =", cube.downCells(7));

  /*
  
  CELLSPERLEVEL = (g) -> (h) ->
  	g.faces.dictos[h]
  
  
  DOWNCELLS = (g) -> (cell) ->
  	PRINT "cell =",[typeof cell,cell]
  	##
  	it=g.goDw(cell);ret=[]
  	while not it.end()
  		ret += [it.getNode()];it.goForward()
  	##
  	ret
  
  UPCELLS = (g) -> (cell) ->
  	PRINT "cell =",[typeof cell,cell]
  	##
  	it=g.goUp(cell);ret=[]
  	while not it.end()
  		ret += [it.getNode()];it.goForward()
  	##
  	ret
  
  
  grouping = (tuples) ->
  	[out, n] = [[], tuples.length]
  	groups = [[tuples[0]]]
  	[first, last] = [FIRST tuples[0], LAST tuples[0]]
  	for k in [1...tuples.length]
  		if [FIRST tuples[k], LAST tuples[k]] == [first,last]
  			(LAST groups).push tuples[k]
  		else
  			groups.push [tuples[k]]
  			[first, last] = [FIRST tuples[k], LAST tuples[k]]
  	groups
  
  sorted = (list) ->
  	numerically = (a,b) -> a-b
  	list.sort numerically
  
  DOWNTRAVERSE = (g, nrecursion, cell, h,up,down) ->
  	PRINT "g, nrecursion, cell, h,up,down =", [g, nrecursion, cell, h,up,down]
  	multiTraverse = (g, nrecursion, cell,h) ->
  		if nrecursion == 0 then return [[cell]]
  		PRINT "nrecursion =", nrecursion
  		ret = []
  		PRINT "down[h][cell] =", down[h][cell]
  		for Down in down[h][cell] 
  			ret.push ([cell] + L for L in multiTraverse(g, nrecursion-1, h-1, Down))
  		CAT ret
  	grouping sorted AA(REVERSE) multiTraverse(g, nrecursion, cell, h)
  
  
  # The input SimplicialComplex is called `g`.
  hccmesh = (g) ->
  	
  	# Get the intrinsic dimension of the input topology mesh
  	d = g.faces.dim
  	[up,down] = MKUPDOWN (g)
  	# create the 0-layer of HCC
  	faces = (face for face in k_faces for k_faces in g.faces.cells)
  	verts = CAT (CENTROID(g)(face) for face in k_faces for k_faces in g.faces.cells)
  	cells = AA(LIST) [0...verts.length]
  	g1 = new SimplicialComplex verts,cells
  	model = viewer.draw g1
  	# create higher level layers of HCC
  	for k in [1...d]
  		# create Nk and Ak
  		for h in [k...d+1]
  			for root of CELLSPERLEVEL(g)(h)
  				root = g.faces.dictos[h][root]
  				# forward search in g for the isomorphic subgraphs
  				subgraphs = DOWNTRAVERSE(g,k,root,h,up,down)
  				PRINT "k,h,subgraphs =", [k,h,subgraphs]
  				
  				
  				
  				# backtrack upon g1: looking for (k-1)-faces of each newnode
  				faces = [UPTRAVERSE(sg,k) for sg in subgraphs]
  				# build the k-layer of HCC
  				for face in faces:
  					newnode = g1.addNode(k)
  					for node in face:
  						g1.addArch(node,newnode)							
  	# create the last layer of HCC
  	for root in CELLSPERLEVEL(g)(d):
  		subgraphs = DOWNTRAVERSE(g,d,root)
  		facets = [UPTRAVERSE(sg,d) for sg in subgraphs]
  		vertices = [list(set(CAT(sg))) for sg in subgraphs]
  		# build the d-layer of HCC
  		for facet,verts in zip(facets,vertices):
  			newnode = g1.addNode(d)
  			for node in facet:
  				g1.addArch(node,newnode)
  			for vert in verts:
  				g1.addArch(newnode,vert)																
  	# return the output HCC graph
  	return g1
  
  
  object = SIMPLEX 3
  #model = viewer.draw object
  hccmesh object
  */

}).call(this);
