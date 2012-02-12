# Internet colors and color names
WHITE = [ 1.0 , 1.0 , 1.0 ]
SILVER = [ 0.8 , 0.8 , 0.8 ]
GRAY = [ 0.5 , 0.5 , 0.5 ]
BLACK = [ 0.0 , 0.0 , 0.0 ]
RED = [ 1.0 , 0.0 , 0.0 ]
MAROON = [ 0.5 , 0.0 , 0.0 ]
YELLOW = [ 1.0 , 1.0 , 0.0 ]
OLIVE = [ 0.5 , 0.5 , 0.0 ]
LIME = [ 0.0 , 1.0 , 0.0 ]
GREEN = [ 0.0 , 0.5 , 0.0 ]
AQUA = [ 0.0 , 1.0 , 1.0 ]
TEAL = [ 0.0 , 0.5 , 0.5 ]
BLUE = [ 0.0 , 0.0 , 1.0 ]
NAVY = [ 0.0 , 0.0 , 0.5 ]
FUCHSIA = [ 1.0 , 0.0 , 1.0 ]
PURPLE = [ 0.5 , 0.0 , 0.5 ]
colors = [MAROON, RED, LIME, BLUE, AQUA, FUCHSIA, YELLOW, WHITE, SILVER, GRAY, BLACK, 
OLIVE, GREEN, TEAL, NAVY, PURPLE]

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

###
extremePoints = (points) -> (coords) ->
	coordVects = TRANS(points)
	maxCoords = (Math.max.apply(null, coordVects[k])  for k in coords)
	result = []
	for k in coords
		for point in points
			if point[k] == maxCoords[k]
				result.push point
	result
###

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
	# Return a partition of the set into d 'bucket' of 'close' points.
	d = points[0].length
	m = points.length
	referenceCell = randomSimplex(points,d)
	referenceSimplex = simplexMatrix(points,referenceCell)
	theMap = mapping(referenceSimplex)
	tokens = AA(grading)(affineMapping(theMap)(points))
	bucket = {}; bucket[k] = [] for k in [1...Math.pow(2,d+1)]
	bucket[tokens[k]].push points[k] for k in [0...m]
	bucket 


makeRegionDict = (pointSet,d) ->
	# recursive contruction of dictionaries in crowded subregions
	regionDict = spacePartition(pointSet)
	# change the keys -- here?
	for key of regionDict
		if regionDict[key].length > d+1
			pointSubset = regionDict[key]
			regionDict[key] = makeRegionDict(pointSubset,d)
		else # add a zero to the key
	regionDict

###
makeRegionDict = (pointSet,d) ->
	# recursive contruction of dictionaries in crowded subregions
	regionDict = spacePartition(pointSet)
	for key of regionDict
		if regionDict[key].length > d+1
			if key == (Math.pow(2,d+1))
				regionDict[key] = selectBasis(regionDict[key])
			else
				pointSubset = [point[1] for point in regionDict[key]]
				regionDict[key] = makeRegionDict(PointSet(pointSubset),d)
		else pass
	regionDict
###


rn = 2
points = randomPoints(rn,m=5000,scale=8).t( [0...rn], REPEAT(rn)(-scale/2) )
object = []
bucket = spacePartition(points.verts)
MYPRINT "bucket",bucket
for k in [1...Math.pow(2,rn+1)]
	if bucket[k]? and bucket[k].length > 0 
		object.push new SimplicialComplex(bucket[k], AA(LIST)([0...bucket[k].length]))
model = viewer.draw object
model[k].color(colors[k]) for k in [1...model.length]



