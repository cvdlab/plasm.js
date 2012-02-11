[red,green,blue,cyan,magenta,yellow,white] = [[1,0,0],[0,1,0],[0,0,1],[0,1,1],[1,0,1],[1,1,0],[1,1,1]]
colors = [red,green,blue,cyan,magenta,yellow,white]


randomPoints = (rn=2,m=40,scale=2) ->
	# To produce a random PointSet in [0,scale]^rn space.
	# Return a PointSet instance with n points, each with rn coordinates.
	new PointSet(Math.random()*scale for k in [0...rn] for point in [0...m])

simplexMatrix = (verts,cell) ->
	# To generate a simplex square matrix in homogeneous coordinates.
	# Return a list of lists of numbers, taken from verts coordinate list.
	(AR [verts[k],1] for k in cell)

grading = (point) ->
	# To compute the "grade" of a point in affine coordinates.
	# Return a binary number (d+1 bits) that gives a classification of a
	# d-point in affine coordinates in the proper "tiling" of d-space.
	grade = (x) -> if x >= 0.0 then '1' else '0'
	parseInt (AA(grade)(point).join ""),2
	
mapping = (basis) -> numeric.inv(basis)

affineMapping = (mapping) -> (cartesianPoints) ->
	# To compute the affine coordinates of a Cartesian point w.r.t. a reference simplex.
	# Return the coded string of affine coordinates.
	homogeneousPoints = (AR [point,1] for point in cartesianPoints)
	affinePoints = numeric.dot(homogeneousPoints,mapping)

###
referencePoints = randomPoints(2,3,1)
MYPRINT "referencePoints =",referencePoints
referenceSimplex = simplexMatrix(referencePoints.verts,[0,1,2])
MYPRINT "referenceSimplex =",referenceSimplex
theMap = mapping(referenceSimplex)
MYPRINT "theMap =",theMap
standardBasis = affineMapping(theMap)(referencePoints.verts)
MYPRINT "standardBasis =",standardBasis
MYPRINT "basis =",AA(CODE)(standardBasis)
###


closetozero = (number) -> if Math.abs(number) < 1.0E-5 then true else false

extremePoints = (points) -> (coords) ->
	coordVects = TRANS(points)
	maxCoords = (Math.max.apply(null, coordVects[k])  for k in coords)
	result = []
	for k in coords
		for point in points
			if point[k] == maxCoords[k]
				result.push point
	result

randomSimplex = (verts,d) ->
	[cell,m] = [[], verts.length]
	while cell.length <= d
		index = Math.round (Math.random() * m)
		if not (index in cell) then cell.push index
		mat = simplexMatrix(verts,cell)
		if cell.length == d+1 and closetozero(numeric.det(mat))
			cell = []
	cell
	
spacePartition = (points) ->
	# To extract a reference simplex from a list of 'points'.
	# Return a partition of the set into d 'buckets' of 'close' points.
	d = points[0].length
	referenceCell = randomSimplex(points,d)
	referenceSimplex = simplexMatrix(points,referenceCell)
	theMap = mapping(referenceSimplex)
	tokens = AA(grading)(affineMapping(theMap)(points))
	bucket = Array
	object = Array
	bucket[k] = [] for k in [0...Math.pow(2,d+1)]
	for k in [0...points.length]
		bucket[tokens[k]].push points[k] 
	MYPRINT "bucket ",bucket
	for k in [0...Math.pow(2,d+1)/2]
		if bucket[k] isnt []
			object[k] = new SimplicialComplex(bucket[k], AA(LIST) [0...bucket[k].length])
	viewer.draw object[k] for k in [0...Math.pow(2,d+1)/2] when object[k] isnt []



points = randomPoints(rn=3,m=5000,scale=8).t([0,1,2],[-4,-4,-4])
obj = new SimplicialComplex(points.verts, AA(LIST) [0...points.m])
#model = viewer.draw obj
#model.color(red)
MYPRINT "spacePartition(points) =", spacePartition(obj.vertices.verts)


