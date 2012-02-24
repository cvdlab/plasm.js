# **qhull.coffee** is a prototype quickhull implementation
# in plasm.js, 
# the *JavaScript Programming Language for Solid Modeling*
#
# Copyright (c) 2011-2012 Universit Roma Tre, CVD-lab <cvdlab@email.com>
#
# The source for [Plasm.js](https://github.com/cvd-lab/) is available on GitHub,
# and released under the MIT license.
# <HR>

# Internet RGB colors (normalized)
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

# Internet color names
palette = [MAROON, RED, LIME, BLUE, AQUA, FUCHSIA, YELLOW, WHITE, SILVER, 
			GRAY, BLACK, OLIVE, GREEN, TEAL, NAVY, PURPLE]
	
# Conversion from *decimal* (basis 10) to *hexatridecimal* (basis 36) numerals
d2h = (d) -> d.toString 36

# Inverse conversion from *hexatridecimal* to *decimal* numeral basis
h2d = (h) -> parseInt h,36

# Used to concatenate a numeral `key` with an array `keys` of numerals.
# Return an array of composite numerals.
keysConcat = (key,keys) -> ((pair.join "") for pair in DISTL([key, keys]))

# To produce a random set of points within the interval space [0, `scale`]^`rn`.
# Return a `PointSet` instance made by `m` points, each with `rn` coordinates.
randomPoints = (rn=2,m=40,scale=2) ->
	new PointSet(Math.random()*scale for k in [0...rn] for point in [0...m])

# To generate the *square matrix* of a (solid) simplex in homogeneous coordinates.
# The homogeneous coordinate (the last one) is set to one. If the input `cell`
# is not degenerate, the determinant of this matrix is non-zero.
# Return a list of lists of numbers, taken from the coordinate list `verts`.
simplexMatrix = (verts,cell) -> (AR [verts[k],1] for k in cell)

# To compute the "grade" of a point in affine coordinates.
# Return a hexatridecimal number (*d+1* bits) that gives a classification of a
# *d*-point (affine coordinates) in the proper *"tiling"* of *d*-space.
grading = (point) ->
	grade = (x) -> if x >= 0.0 then '1' else '0'
	binaryDigits = AA(grade)(point).join ""
	d2h parseInt binaryDigits,2

# The matrix of a change of coordinates is computed. The `mapping` function 
# transforms the vectors in `basis`
# into the standard orthonormal frame. The matrix inversion is done only if 
# the input `basis` vectors are linearly independent (*det basis ≠ 0*).
mapping = (basis) -> if numeric.det basis then numeric.inv basis else basis

# To compute the affine coordinates (w.r.t. a reference simplex) of an array of 
# Cartesian points. The input matrix is *d+1 x d+1*. The input `cartesianPoints` 
# have *d* coordinates; the output `affinePoints` have *d+1* coordinates.
affineMapping = (matrix) -> (cartesianPoints) ->
	homogeneousPoints = (AR [point,1] for point in cartesianPoints)
	affinePoints = numeric.dot(homogeneousPoints, matrix)

# Used to check wheter the area of the reference simplex (in Cartesian space) is too small.
closetozero = (number) -> if Math.abs(number) < 1.0E-2 then true else false

# A random `d`-simplex of area not too small is generated. The `cell` array, that contains
# *d+1* integer references to `verts` is returned`. 
randomSimplex = (verts,d) ->
	isSquare = (mat) -> if mat.length == mat[0].length then true else false
	[cell,m] = [[], verts.length]
	while cell.length <= d
		index = Math.round (Math.random() * m)
		if not (index in cell) then cell.push index
		mat = simplexMatrix(verts,cell)
		if cell.length is d+1 and isSquare(mat) and closetozero(numeric.det(mat))
			cell = []
	cell


# To extract a reference simplex from an array of `points`.
# Return a partition of the set into a dictionary with *(2^d)-1* `buckets` of `*close* points,
# i.e. of points within the same region of the partition of space.
spacePartition = (points) ->
	d = points[0].length
	m = points.length
	referenceCell = randomSimplex(points,d)
	referenceSimplex = simplexMatrix(points,referenceCell)
	matrix = mapping(referenceSimplex)
	# All points are transformed to affine coordinates and all their `tokens` are computed
	tokens = AA(grading)(affineMapping(matrix)(points))
	# All `buckets` are initialized: keys to the (hexatridecimal) token; values to the empty array.
	buckets = {}; buckets[d2h k] = [] for k in [1...Math.pow(2,d+1)]
	# All points are inserted in the right bucket in (near) linear time: *O(m log d)*, with *m >>> d*
	for k in [0...m]
		if tokens[k]? and points[k]? and buckets[tokens[k]]?
			buckets[tokens[k]].push points[k] 
	# The transformation `matrix` of `points` from Cartesian to affine coordinates 
	# is also returned, to be possibly used for computing the zetta-token of a (first) query point.  TODO
	[buckets,matrix] 


# Main preprocessing function. To compute the point `Buckets` dictionary indexed by **zettatoken** keys of any length.
# The input is an array `pointSet` of points and their dimension `d`.
# Each bucket will finally contain no more than *(`d`+1) x `pointQuantity`* points.
makeRegionDict = (pointSet, d, pointQuantity=30) ->
	# To merge two dictionaries `obj1` and `obj2` by writing in `obj1`, for each value of `key` in `obj2`, the corresponding value.
	# Finally, the updated `obj1` is returned.
	merge = (obj1,obj2) -> 
		obj1[key] = obj2[key] for key of obj2
		obj1
	# A first `spacePartition` call is executed on the input `pointSet`, and the initial `currentBuckets` are returned
	[currentBuckets,theMap] = spacePartition(pointSet) 
	tosplit = true
	while tosplit
		tosplit = false
		# In each cycle, the output variable `Buckets` is re-initialized to the empty dictionary. 
		Buckets = {}
		# For each region (i.e. `key`) of the current partition (i.e. `currentBuckets`), do
		for key of currentBuckets
			newBucket = {}
			# The region is going to be splitted if it contains too many points
			if currentBuckets[key].length > (d+1)*pointQuantity
				tosplit = true
				points = CLONE currentBuckets[key]
				[buckets,theMap] = spacePartition(points)
				# The new tokens in each `newBucket` are build
				keys = (k for k of buckets)
				newKeys = keysConcat(key,keys)
				newBucket[newKeys[k]] = buckets[keys[k]] for k in [0...keys.length]
				merge(Buckets,newBucket)
			# Add a zero symbol to the region `key` if the region is not splitted
			else 
				if currentBuckets[key].length > 0
					newKey = keysConcat(key,["0"])
					Buckets[newKey] = currentBuckets[key]
		# At the end of each cycle the current `Buckets`  is cloned into `currentBuckets`.
		currentBuckets = CLONE Buckets
	Buckets

# <HR>

#### Preview

# Used to accumulate a graphics primitive in `object` for each `points` array. The default primitive is 
# `POLYLINE`. Other possible values for `primitive` are `"TRIANGLESTRIP"` or `"POLYMARKER"`
preview  = (points, object, primitive="POLYLINE") ->
	n = points.length
	if primitive is "POLYMARKER" then object.push POLYMARKER points
	else if primitive is "TRIANGLESTRIP" and n > 2 
		object.push TRIANGLESTRIP(points)
	else if n > 1
		object.push POLYLINE(points)
	else 
		object.push new SimplicialComplex(points, AA(LIST)([0...n]))
	object
	
## Execution tests


####  3D example

# Execution initialization.
# The parameter `rn` is the dimension of the point space.
# Set `rn` to 2 for a 2D example.
rn = 3
# `points` to be classified are randomly generated, and their cuboidal space is centered about the origin
# via the translation method `.t()`
points = randomPoints(rn, m=2000*Math.pow(2,rn), scale=8).t( [0...rn], REPEAT(rn)(-scale/2) )
# The `object` to draw is initialized to the empty array
object = []

# A multi-level partition is generated here:
Bucket = makeRegionDict(points.verts, rn)
# For each  `Bucket` of points a graphics primitive (i.e. a simplicial complex) is accumulated 
# within the `object` array
for key of Bucket
	if Bucket[key]? and Bucket[key].length > 0 
		preview(Bucket[key], object, primitive="POLYMARKER")
# The `draw` method of the `viewer` is applied to the `object` array, producing a `model` array. 
model = viewer.draw object
# Each simplicial complex in the `model` array is colored with a `color` in a `palette` of 16 colors
model[k].color palette[k % 15] for k in [0...model.length]


