(function() {
  var affineMapping, d_simplex, grading, m, obj, points, randomPoints, randomPoints0, rn, scale, _i, _ref, _results;

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

  randomPoints0 = function(rn, m, scale) {
    var k, point;
    if (rn == null) rn = 2;
    if (m == null) m = 40;
    if (scale == null) scale = 2;
    return new PointSet((function() {
      var _results;
      _results = [];
      for (point = 0; 0 <= m ? point < m : point > m; 0 <= m ? point++ : point--) {
        _results.push(AR((function() {
          var _results2;
          _results2 = [];
          for (k = 0; 0 <= rn ? k < rn : k > rn; 0 <= rn ? k++ : k--) {
            _results2.push(Math.random() * scale);
          }
          return _results2;
        })(), 0));
      }
      return _results;
    })());
  };

  d_simplex = function(verts, cell) {
    var k, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = cell.length; _i < _len; _i++) {
      k = cell[_i];
      _results.push(AR(verts[k], 1));
    }
    return _results;
  };

  grading = function(point) {
    var grade;
    grade = function(x) {
      if (x >= 0.0) {
        return '1';
      } else {
        return '0';
      }
    };
    return AA(grade)(point).join("");
  };

  affineMapping = function(basis) {
    return function(point) {
      var affine, d, mapping;
      d = basis.length;
      mapping = numeric.inv(basis);
      return affine = numeric.dot(mapping, AR([point, 1.0]));
    };
  };

  points = randomPoints0(rn = 2, m = 40, scale = 1).t([0, 1], [-0.5, -0.5]);

  MYPRINT("0:points =", points);

  obj = new SimplicialComplex(points.verts, AA(LIST)((function() {
    _results = [];
    for (var _i = 0, _ref = points.m; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this)));

  obj.t([0, 1, 2], [0, 0, 1]);

  viewer.draw(obj);

  MYPRINT("1:obj =", obj);

  /*
  
  
  
  points = points.t([2],[1])
  MYPRINT "2:points =", points
  
  
  obj = new SimplicialComplex(points.verts, AA(LIST) [0...points.m])
  obj = EMBED(1) obj
  obj = T([0,1,2],[-0.5,-0.5,1]) obj
  MYPRINT "0:obj =", obj
  viewer.draw obj
  
  
  obj = obj.embed(1)
  MYPRINT "1:obj =", obj
  
  obj = T([0,1,2],[-0.5,-0.5,1]) obj
  MYPRINT "2:obj =", obj
  viewer.draw obj
  
  
  points = points.embed(1)
  MYPRINT "1:points =", points
  points = points.t([0,1,2],[0,0,1])
  MYPRINT "2:points =", points
  */

  /*
  
  
  
  obj = new SimplicialComplex(points.verts, AA(LIST) [0...points.m])
  viewer.draw obj
  
  theSimplex = d_simplex(obj.vertices.verts, [8,12,20])
  MYPRINT "theSimplex =", theSimplex
  viewer.draw EMBED(1) new SimplicialComplex(theSimplex, [[0,1,2]])
  
  MYPRINT "", AA(affineMapping(theSimplex))(theSimplex)
  
  
  
  closetozero = (number) -> if Math.abs(number) < 1.0E-5 then true else false
  max = (points) -> (k) ->
  	theMaxCoord = Math.max.apply(null, TRANS(points)[k])
  	result = (point for point in points when point[k] is theMaxCoord)[0]
  
  greatSimplex = (points) ->
  	# To extract a reference simplex from a list of 'points'.
  	# Return a set of d+1 affinely independent points.
  
  	randomSimplex = (verts,d) ->
  		[cell,m] = [[], verts.length]
  		while cell.length <= d
  			index = Math.round (Math.random() * m)
  			if not (index in cell) then cell.push index
  			mat = d_simplex(verts,cell)
  			MYPRINT "mat =", AA(AR)(DISTR [mat,1])
  			if cell.length == d+1 and closetozero(numeric.det(AA(AR)(DISTR [mat,1])))
  				cell = []
  		(verts[k] for k in cell)
  
  	d = points[0].length
  	reference = randomSimplex points,d
  	MYPRINT "1:points =", points
  	points = (affineMapping(reference)(AR [point,1]) for point in points)
  	MYPRINT "2:points =", points
  	obj = new SimplicialComplex(points, AA(LIST) [0...points.length])
  	viewer.draw obj
  	obj = new SimplicialComplex(points, [[0,1,2]])
  	viewer.draw obj
  	
  	out = max(points)(k) for k in [0..d]
  	MYPRINT "out =", out
  	##
  	out = TRANS(out)[1]
  	if len(out) == len(list(set(AA(code)(out)))): return out
  	else: return TRANS(points)[1][:d+1]
  	##
  
  
  
  
  #MYPRINT "grading [0.25, -22, 0.0] =", grading [0.25, -22, 0.0]
  #console.log affineMapping([[1,2,0],[3,1,0],[0,4,-1]])([1,2])
  points = randomPoints(rn=2,m=40,scale=1).t([0,1],[-0.5,-0.5])
  obj = new SimplicialComplex(points.verts, AA(LIST) [0...points.m])
  MYPRINT "obj =", obj
  viewer.draw obj
  theSimplex = d_simplex(obj.vertices.verts, [8,12,20])
  MYPRINT "theSimplex =", theSimplex
  #viewer.draw EMBED(1) new SimplicialComplex(theSimplex, [[0,1,2]])
  MYPRINT "max(points)(0) =",max([[0,30,4],[200,1000,0],[0,880,0]])(1)
  MYPRINT "greatSimplex(points) =", greatSimplex(obj.vertices.verts)
  */

}).call(this);
