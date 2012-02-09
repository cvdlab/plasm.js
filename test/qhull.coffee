randomPoints = (rn=2,m=40,scale=2) ->
	# To produce a random PointSet in [0,scale]^rn space.
	# Return a PointSet instance with n points, each with rn coordinates.
	new PointSet(Math.random()*scale for k in [0...rn] for point in [0...m])

d_simplex = (verts,cell) ->
	# To generate a simplex square matrix in homogeneous coordinates.
	# Return a list of lists of numbers, taken from verts coordinate list.
	(AR verts[k],1 for k in cell)

grading = (point) ->
	# To compute the "grade" of a point in affine coordinates.
	# Return a binary number (d+1 bits) that gives a classification of a
	# d-point in affine coordinates in the proper "tiling" of d-space.
	grade = (x) -> if x >= 0.0 then '1' else '0'
	AA(grade)(point).join ""

affineMapping = (basis) -> (point) ->
	# To compute the affine coordinates of a Cartesian point w.r.t. a reference simplex.
	# Return the coded string of affine coordinates.
	d = basis.length
	mapping = numeric.inv(basis)
	affine = numeric.dot(mapping, AR [point,1.0])






points = randomPoints(rn=2,m=40,scale=1)
points.t([0,1],[-0.5,-0.5])
# MYPRINT "0:points =", points
obj = new SimplicialComplex(points.verts, AA(LIST) [0...points.m])
obj.embed(1)
obj.t([0,1,2],[0,0,1])
#points = points
#MYPRINT "1:points =", points
#obj = new SimplicialComplex(points.verts, AA(LIST) [0...points.m])

viewer.draw obj
#MYPRINT "0:obj =", obj

#obj.t([0,1,2],[0,0,1])
#viewer.draw obj
#MYPRINT "1:obj =", obj
#.t([2],[1])
###



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
###

###



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
