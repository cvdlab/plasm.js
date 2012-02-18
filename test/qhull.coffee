# ///////////////////////////////////////////////////////////////////////////////
# qhull.coffee
#
# a prototype geometric kernel for plasm.js
# JavaScript Programming Language for Solid Modeling
# Copyright (c) 2011-2012 cvd-lab <cvdlab@email.com> (https://github.com/cvd-lab/)
# Universitò Roma Tre
# MIT License
# ///////////////////////////////////////////////////////////////////////////////

# Internet colors and color names

WHITE	= [ 1.0 , 1.0 , 1.0 ]
SILVER 	= [ 0.8 , 0.8 , 0.8 ]
GRAY 	= [ 0.5 , 0.5 , 0.5 ]
BLACK 	= [ 0.0 , 0.0 , 0.0 ]
RED 	= [ 1.0 , 0.0 , 0.0 ]
MAROON 	= [ 0.5 , 0.0 , 0.0 ]
YELLOW 	= [ 1.0 , 1.0 , 0.0 ]
OLIVE 	= [ 0.5 , 0.5 , 0.0 ]
LIME 	= [ 0.0 , 1.0 , 0.0 ]
GREEN 	= [ 0.0 , 0.5 , 0.0 ]
AQUA 	= [ 0.0 , 1.0 , 1.0 ]
TEAL 	= [ 0.0 , 0.5 , 0.5 ]
BLUE 	= [ 0.0 , 0.0 , 1.0 ]
NAVY 	= [ 0.0 , 0.0 , 0.5 ]
FUCHSIA	= [ 1.0 , 0.0 , 1.0 ]
PURPLE 	= [ 0.5 , 0.0 , 0.5 ]

colors 	= [MAROON, RED, LIME, BLUE, AQUA, FUCHSIA, YELLOW, WHITE, SILVER, 
			GRAY, BLACK, OLIVE, GREEN, TEAL, NAVY, PURPLE]

d2h = (d) -> d.toString 36
h2d = (h) -> parseInt h,36
keysConcat = (key,keys) -> ((pair.join "") for pair in DISTL([key, keys]))

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
	d2h (parseInt (AA(grade)(point).join ""),2)
	
mapping = (basis) -> if numeric.det(basis) then numeric.inv(basis) else basis

affineMapping = (mapping) -> (cartesianPoints) ->
	# To compute the affine coordinates of a Cartesian point w.r.t. a reference simplex.
	# Return the coded string of affine coordinates.
	homogeneousPoints = (AR [point,1] for point in cartesianPoints)
	affinePoints = numeric.dot(homogeneousPoints,mapping)

closetozero = (number) -> if Math.abs(number) < 1.0E-2 then true else false

randomSimplex = (verts,d) ->
	isSquare = (mat) -> if mat.length == mat[0].length then true else false
	[cell,m] = [[], verts.length]
	while cell.length <= d
		index = Math.round (Math.random() * m)
		if not (index in cell) then cell.push index
		mat = simplexMatrix(verts,cell)
		if cell.length == d+1 and isSquare(mat) and closetozero(numeric.det(mat))
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
	bucket = {}; bucket[d2h k] = [] for k in [1...Math.pow(2,d+1)]
	for k in [0...m]
		if tokens[k]? and points[k]? and bucket[tokens[k]]?
			bucket[tokens[k]].push points[k] 
	[bucket,theMap] 


makeRegionDict = (pointSet,d) ->
	merge = (obj1,obj2) -> obj1[key] = obj2[key] for key of obj2; obj1
	[bucket,theMap] = spacePartition(pointSet) # first buckets
	tosplit = true
	while tosplit
		tosplit = false
		newBuckets = {}
		for key of bucket
			newBucket = {}
			if bucket[key].length > (d+1)*30
				tosplit = true
				points = CLONE bucket[key]
				[buckets,theMap] = spacePartition(points)
				keys = (k for k of buckets)
				newKeys = keysConcat(key,keys)
				newBucket[newKeys[k]] = buckets[keys[k]] for k in [0...keys.length]
				merge(newBuckets,newBucket)
			else # add a zero to the key
				if bucket[key].length > 0
					newKey = keysConcat(key,["0"])
					newBuckets[newKey] = bucket[key]
		bucket = CLONE newBuckets
	newBuckets


##
rn = 3
points = randomPoints(rn, m=2000*Math.pow(2,rn), scale=8).t( [0...rn], REPEAT(rn)(-scale/2) )
object = []

##
[Bucket,theMap] = spacePartition(points.verts)
for k in [1...Math.pow(2,rn+1)]
	key = d2h k
	if Bucket[key]? and Bucket[key].length > 0 
		object.push new SimplicialComplex(Bucket[key], AA(LIST)([0...Bucket[key].length]))
		#object.push POLYLINE(Bucket[key])
model = viewer.draw object
model[k].color(colors[k]) for k in [1...model.length]
###

PRINT "**** points.m =", points.m

Bucket = makeRegionDict(points.verts, rn)
PRINT "**** Bucket =", Bucket
n = 0
for key of Bucket
	if Bucket[key]? and Bucket[key].length > 0 
		#object.push new SimplicialComplex(Bucket[key], AA(LIST)([0...Bucket[key].length]))
		n += Bucket[key].length
		if Bucket[key].length > 2
				object.push TRIANGLESTRIP(Bucket[key])
		else if Bucket[key].length > 1
			object.push POLYLINE(Bucket[key])
		else 
			object.push new SimplicialComplex(Bucket[key], AA(LIST)([0...Bucket[key].length]))
model = viewer.draw object
model[k].color(colors[k%7]) for k in [0...model.length]

PRINT "n =", n
###


