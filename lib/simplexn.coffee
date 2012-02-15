# ///////////////////////////////////////////////////////////////////////////////
# simplexn.coffee
# a prototype geometric kernel for plasm.js
# JavaScript Programming Language for Solid Modeling
# Copyright (c) 2011-2012 cvd-lab <cvdlab@email.com> (https://github.com/cvd-lab/)
# Universitò Roma Tre
# MIT License
# ///////////////////////////////////////////////////////////////////////////////

# To make the qualified symbols visible to the root object (typically Window)
root = exports ? this

# imported symbols from Math object
{PI, E, log, sin, cos, tan, asin, acos, atan, atan2, ceil, floor, sqrt, exp, abs, round} = Math

# APPLY returns the result of the application expression f(x)
root.APPLY = APPLY = (args) ->  [f, x] = args; f.apply(null,[x])

# COMP composition. Returns the composition of the functions in the argument
root.COMP = COMP = (flist) -> 
	comp2 = (f,g) -> (x) -> f (g x)
	flist.reduce comp2

# CONS construction. Applies a function array [f_1, ..., f_n] to the x argument,
# producing the array of application values: [f_1(x), ..., f_n(x)]
root.CONS = CONS = (flist) -> (x) -> flist.map (f) -> f x

# CAT catenates an array of arrays, by eliminating a level of nesting
root.CAT = CAT = (args) -> [].concat args...

# ID returns the arg argument unchanged
root.ID = ID = (arg) -> arg

# K constant functional that always returns the first argument, for any value of the second one
root.K = K = (a) -> (b) -> a

# AA applies fun to each element of the args array
root.AA = AA = (fun) -> (array) -> array.map (e) -> fun e

# DISTR distribute right. Returns the pair sequence with the elements of array and x
root.DISTR = DISTR = (args) -> [array,x] = args; [el,x] for el in array

# DISTL distribute left. Returns the pair sequence with x and the elements of seq
root.DISTL = DISTL = (args) -> [x,array] = args; [x,el] for el in array

# INSR insert right combinator, allowing to apply a binary operator f to n arguments:
root.INSR = INSR = (f) -> (array) -> array.reduceRight f

# INSL insert left combinator, allowing to apply a binary operator f to n arguments:
root.INSL = INSL = (f) -> (array) -> array.reduce f

# Bigger is a binary operator that returns the greater of arguments
root.BIGGER = BIGGER = (a,b) -> if a > b then a else b

# Smaller binary operator that returns the smaller argument (in a proper ordering!)
root.SMALLER = SMALLER = (a,b) -> if a < b then a else b

# Biggest binary operator that returns the greatest of args values
root.BIGGEST = BIGGEST = (args) -> (INSR BIGGER) args 

# Smallest returns the smallest element of the args input sequence
root.SMALLEST = SMALLEST = (args) -> (INSR SMALLER) args

# LIST returns an array containing arg. Alias for CONS([ID])
root.LIST = LIST = (arg) -> (CONS [ID]) arg

# LEN returns the length of the array given as argument
root.LEN = LEN = (args) -> args.length

# REVERSE returns an array in reverse order
root.REVERSE = REVERSE = (args) -> if args.length > 1 then (args[i] for i in [args.length-1..0]) else args

# TAIL returns the non-empty argument array but its first element
root.TAIL = TAIL = (args) -> if args.length > 0 then args.splice 1, args.length-1 else args

# BUTLAST returns the non-empty argument array but its last element
root.BUTLAST = BUTLAST = (args) -> if args.length > 1 then REVERSE TAIL REVERSE args else []

# AL append left. appends elem on the left of array
root.AL = AL = (args) -> [array, elem] = args; CAT [array, elem]

# AR append right. appends elem on the right of seq
root.AR = AR = (args) -> CAT args

# repetition operator. Returns an array with n repetitions of arg
root.REPEAT = REPEAT = (n) -> (args) -> (args for i in [0...n])

# array repetition operator (with catenation). 
# REPLICA(n)(array) is equivalent to COMP([CAT,REPEAT])(array)
root.REPLICA = REPLICA = (n) -> (args) -> CAT (args for i in [0...n])

# Arithmetic operation (summation) between numbers or number arrays
root.SUM = SUM = (args) -> if typeof args[0] is 'number' then (INSL (x,y) -> x+y) args else AA(INSL (x,y) -> x+y)(TRANS args)

# Arithmetic operation (subtraction) between numbers or number arrays
root.SUB = SUB = (args) -> if typeof args[0] is 'number' then (INSL (x,y) -> x-y) args else AA(INSL (x,y) -> x-y)(TRANS args)

# Arithmetic operation (multiplication) between numbers or number arrays
root.MUL = MUL = (args) -> if typeof args[0] is 'number' then (INSL (x,y) -> x*y) args else AA(INSL (x,y) -> x*y)(TRANS args)

# Arithmetic operation (division) between numbers or number arrays
root.DIV = DIV = (args) -> if typeof args[0] is 'number' then (INSL (x,y) -> x/y) args else AA(INSL (x,y) -> x/y)(TRANS args)

# TRANS transposes an array of arrays of the same length. (like matrix transposition)
root.TRANS = TRANS = (args) ->
	n = args.length; m = args[0].length; args = CAT args
	((args[j*m+i] for j in [0...n]) for i in [0...m])

# VECT type casting binary operations
root.VECT = VECT = (binaryop) -> (args) -> AA(binaryop) TRANS args

# MAT transform a linear array into an array of arrays with m rows and n columns
root.MAT = MAT = (m,n) -> (args) -> ((args[i*n+j] for j in [0...n]) for i in [0...m]) # mat

# ISNUM predicate that tests if n is a number
root.ISNUM = ISNUM = (n) -> (not isNaN parseFloat n) and isFinite n

# ISFUN predicate that tests if arg is a function
root.ISFUN = ISFUN = (arg) -> if typeof arg is "function" then true else false

# PROGRESSIVE_SUM returns the incremental sum of args starting from 0
root.PROGRESSIVE_SUM = PROGRESSIVE_SUM = (args) ->
	AL [0, (INSR (x,y) -> x+y) args[0..i] for i in [0...args.length]]

# SET transforms an array with possibly repeated elements to one without repetitions
root.SET = SET = (array) ->
	dict = {}; dict[k] = k for k in array; 
	(val for key,val of dict)

# TREE recursively applies a binary function f to an array of arguments
root.TREE = TREE = (f) -> 
	uncurriedTree = (fun,array) ->
		len = array.length
		if len is 1 then return array[0]
		k = floor (len/2)
		fun( CAT [uncurriedTree(fun, array[0...k]), uncurriedTree(fun, array[k...len])] )
	(array) -> uncurriedTree(f,array)

# Cart returns the Cartesian product of two sequences
root.CART2 = CART2 = (listOfLists) -> CAT(AA(DISTL)(DISTR(listOfLists)))
F1 = (listOfLists) -> AA(AA(LIST))(listOfLists)
# CART = CART = (listOfList) -> TREE( COMP([AA(CAT), CART2]) ) ( F1(listOfList) )

#///////////////////////////////////////////////////////////////////////////////

# Some utility functions

# PRINT returns arg and prints its value to console.log. It may be used to debugging
root.PRINT = PRINT = (string,params) -> console.log string, params, "\n"

# CLONE makes a deep copy of the obj argument
root.CLONE = CLONE = (obj) ->
	if not obj? or typeof obj isnt 'object'
		return obj
	newInstance = new obj.constructor()
	for key of obj
		newInstance[key] = CLONE obj[key]
	newInstance

# 
type = (obj) ->
	if obj == undefined or obj == null
		return String obj
	classToType = new Object
	for name in "Boolean Number String Function Array Date RegExp".split(" ")
		classToType["[object " + name + "]"] = name.toLowerCase()
	myClass = Object.prototype.toString.call obj
	if myClass of classToType
		return classToType[myClass]
	return "object"
	
typedPrint = (args) ->
	console.log "#{type args}::#{args}";
	args

#///////////////////////////////////////////////////////////////////////////////

# Symbolic coding/decoding of numeric information

root.PRECISION = PRECISION = 1E9
fixedPrecision = (number) ->
	int = round number
	number = round(PRECISION * number) / PRECISION
	if abs(number-int) <= 1.0/PRECISION then int else number
fcode = (point) -> (AA fixedPrecision) point
root.CODE = CODE = (point) -> "[#{fcode point}]"
decode = (string) -> +string  # => a number
uncode = (pointCode) -> (AA decode) pointCode.replace(/[\[\]]/g, '').split(',')
string2numberList = (string) ->
	if string is '[]' then [] else
		regex = /[,|\[|\]]/ # regex => "[" or "," or "]"
		(AA Number) BUTLAST TAIL string.split(regex)

#///////////////////////////////////////////////////////////////////////////////

class PointSet
	
	mapcomp = (map1,map2) -> MAP = {}; MAP[k] = map2[v] for k,v of map1
	
	constructor: (points) ->
		points = points or []
		if points.length > 0
			@rn = points[0].length
			@dict = {}; @dict[fcode(point)] = i for point,i in points
			map1 = {}; map1[i] = decode(@dict[fcode(point)])  for point,i in points
			[map2,k] = [{},0]; for pcode,pid of @dict
				map2[decode(pid)] = k; k += 1
			@map = (v for k,v of mapcomp map1,map2)
			k = 0; for pcode of @dict
				@dict[pcode] = k; k += 1
			@verts = (uncode pcode for pcode of @dict)
			@m = @verts.length
		else
			@rn = 0
			@dict = {}
			@map = []
			@verts = []
			@m = 0

	update: (modify) ->
		@verts[pid] = modify (uncode pcode) for pcode,pid of @dict
		@dict = {}
		@dict[CODE(point)] = pid for point,pid in @verts


	embed: (n) -> 
		@rn += n
		@update (point) -> CAT([point, REPEAT(n) 0])
		@

	t: (indices,values) ->
		vect = (0 for k in [0...@rn])
		vect[indices[h]] = values[h] for h in [0...indices.length]
		@update (point) -> SUM([point, vect])

		@

	s: (indices,values) ->
		vect = (1 for k in [0...@rn])
		vect[indices[h]] = values[h] for h in [0...indices.length]
		@update (point) -> MUL([point, vect])
		@

	r: (axes, angle) ->
		mat = numeric.identity(@rn)
		c = cos angle; s = sin angle
		[i,j] = axes
		mat[i][i] = c; mat[i][j] = -s
		mat[j][i] = s; mat[j][j] = c
		@update (point) -> numeric.dot(mat, point)
		@


# 
root.PointSet = PointSet

#///////////////////////////////////////////////////////////////////////////////

class Topology
	
	revert = (cell) ->
		len = cell.length
		if len >1 then CAT [cell[len-1], cell[1...len-1], cell[0]] else cell
	remove_duplicates = (hasDupes) ->
		dict = {}; (dict[CODE(item)] = item for item in hasDupes \
			when not dict[CODE(revert item)]? and not dict[CODE(item)]?)
	rotate = (cell) ->
		if cell.length > 1 then CAT [cell[1...cell.length],[cell[0]]] else cell
	facets = (cell) -> 
		out = []; for h in [0...cell.length]
			facet = (k for k,i in cell when i isnt h)
			out.push  if h%2 is 1 then revert facet else facet
		out
	skeltn = (h_cells) -> 
		remove_duplicates CAT (facets cell for cell in h_cells)
	cell_complex = (d_cells) ->
		if d_cells.length > 0
			dim = d_cells[0].length-1
			#ASSERT  dim == 0
			if dim >= 0
				cells = new Array(dim)
				cells[dim] = d_cells
				if dim > 0 
					cells[h-1] = skeltn cells[h] for h in [dim..1]
				cells
			else
				cells = [[]]
		else
			dim = 0
			cells = [[]]
	mkCellDB = (complex) ->
		complex = complex or []
		dictos = []
		for skel,d in complex
			dictos[d] = {}; dictos[d][CODE(cell)] = k for cell,k in skel
		dictos
	homology_maps = (dictos) ->
		if dictos.length > 0
			dim = dictos.length-1; d = 1
			homology = ([] for i in [0..dim])
			if dim > 1
				skel = dictos[1]
				for cell of skel
					SIMPLEX = string2numberList cell
					homology[1].push ([skel[cell], facet[0]] for facet in facets SIMPLEX)
				homology[1] = CAT homology[1]
				for skel in dictos[2..dim]
					d += 1;
					for cell of skel
						for facet in facets string2numberList cell
							if dictos[d-1][CODE(facet)]?
								key = dictos[d-1][CODE(facet)]
							else
								key = dictos[d-1][CODE(revert(facet))]
							homology[d].push [skel[cell], key]
			homology
		else []
	
	constructor: (vertices,d_cells) ->
		vertices = vertices or []
		d_cells = d_cells or []
		@dim = if d_cells.length > 0 then d_cells[0].length-1 else -1
		d_cells = ((vertices.map[k] for k in cell) for cell in d_cells)
		d_cells = (cell for cell in d_cells when (SET cell).length is cell.length)
		@dictos = mkCellDB (cell_complex d_cells)
		@homology = homology_maps @dictos
		@cells = (string2numberList cell for cell of dict for dict in @dictos)

root.Topology = Topology

#///////////////////////////////////////////////////////////////////////////////
	
class SimplicialComplex

	vertexFilter = (points,d_cells) ->
		numbers = (a,b) -> a-b
		verts = (SET CAT d_cells).sort(numbers)
		inverts = []; inverts[i]=k for i,k in verts
		points = (point for point,k in points when inverts[k]?)
		d_cells = ((inverts[k] for k in cell) for cell in d_cells)
		[points,d_cells]

	constructor: (points,d_cells,filter=true) ->
		points = points or []
		d_cells = d_cells or []
		if filter then [points,d_cells] = vertexFilter(points,d_cells)
		@vertices = new PointSet(points)
		@faces = new Topology(@vertices,d_cells)
		@

	embed: (n) -> @vertices.embed(n); @
	t: (indices,values) -> @vertices.t(indices,values); @
	s: (indices,values) -> @vertices.s(indices,values); @
	r: (axes, angle) -> @vertices.r(axes, angle); @

root.SimplicialComplex = SimplicialComplex

#///////////////////////////////////////////////////////////////////////////////

# EMBED embeds a d-polyhedron into the subspace xd+1 = ··· = xd+n = 0 of E^d+n
root.EMBED = EMBED = (n) -> (obj) -> (CLONE obj).embed(n)

# T dim-indep. translation tensor. indices of the coordinates affected by the transformation
root.T = T = (indices,values) -> (obj) -> (CLONE obj).t(indices,values)

# S dim-indep. scaling tensor. indices of the coordinates affected by the transformation
root.S = S = (indices,values) -> (obj) -> (CLONE obj).s(indices,values)

# R dim-indep. rotation tensor. axes is the coordinate pair affected by the transformation. 
# The rotation angle is given in radians
root.R = R = (axes,angle) -> 
	PRINT "axes, angle =", [axes, angle]
	(obj) -> (CLONE obj).R(axes, angle)

# CENTROID returns a point, i.e. the barycenter of obj
root.CENTROID = CENTROID = (obj) -> (face) ->
	A = (obj.vertices.verts[v]  for v in face)
	C = REPEAT(A.length)(1.0/A.length)
	point = numeric.dot(C,A)

# EXTRUDE return a simplicial d+1-complex triangulating the d-dimensional obj. 
# hlist is a list of displacements, where negative numbers stand for empty spaces
root.EXTRUDE = EXTRUDE = (hlist) -> (obj) -> 

	coords_distribute = (x) ->
		out = CAT( AA(AR)(DISTR(e)) for e in x)
	shift = (n, listoflists) -> (x+n for x in seq) for seq in listoflists
	subcomplex = (d,args) ->
		(args[i...i+d] for i in [0..args.length-d])

	cells = CLONE obj.faces.cells
	dim = CLONE obj.faces.dim
	verts = CLONE obj.vertices.verts
	lastcoords = PROGRESSIVE_SUM (AA)(abs)(hlist)
	if dim <= 0
		cells = [[],[]]
		vertices = AA(LIST)(lastcoords)
		cells[1] = ([i,i+1] for i in [0...hlist.length+1])
	else
		simplexes = cells[dim]
		nverts = verts.length
		nsteps = lastcoords.length
		sliced_vertices = (REPLICA nsteps) [verts]
		vertices = coords_distribute(TRANS([REPEAT(nsteps)(verts), lastcoords]))
		extruded_simplices = []
		for cell in simplexes
			vertPtrs = CAT([cell, cell.map (x) -> x+nverts])
			extruded_simplices.push subcomplex(dim+2,vertPtrs)
		final_simplices = []
		for i in [0..nsteps]
			if hlist[i] > 0
				simplex_layer = shift nverts*i, CAT extruded_simplices
				final_simplices.push simplex_layer
		cells = CAT final_simplices
	new SimplicialComplex(vertices, cells)

# SIMPLEXGRID returns a d-dimensional grid of simplices
root.SIMPLEXGRID = SIMPLEXGRID = (args) ->
	hlist = args[0]
	lastcoords = PROGRESSIVE_SUM AA(abs)(hlist)
	verts = AA(LIST)(lastcoords)
	cells = ([i,i+1] for i in [0...hlist.length] when hlist[i] > 0 )
	complex = new SimplicialComplex(verts,cells)
	for hlist in args[1...args.length]
		complex = EXTRUDE(hlist)(complex)
	complex

# FREE transforms a simplicial d-complex into a list of simplicial complexes (one for d-simplex)
root.FREE = FREE = (obj) ->
	d = obj.faces.dim
	simplices = (obj.vertices.verts[k] for k in cell for cell in obj.faces.cells[d])
	out = []; for SIMPLEX in simplices
		outsimplex = new SimplicialComplex(SIMPLEX,[[0..d]])
		out.push outsimplex
	out

# EXPLODE generates an exploded copy of a simplicial complex scene
root.EXPLODE = EXPLODE = (args) -> (scene) ->
	face = () -> item.faces.cells[item.faces.dim][0]
	centers = (CENTROID(item)(face()) for item in scene)
	scaledCenters = (MUL([args,center]) for center in centers)
	translVectors = (SUB(pair) for pair in TRANS([scaledCenters, centers]))
	scene[k].t([0...v.length],v) for v,k in translVectors

# SKELETON returns the dim -dimensional skeleton of a simplicial complex obj
root.SKELETON = SKELETON = (dim) -> (obj) ->
	verts = obj.vertices.verts
	faces_d = obj.faces.cells[dim]
	new SimplicialComplex(verts,faces_d)


# BOUNDARY returns the oriented (d-1)-simplicial complex of a simplicial d-complex pol
root.BOUNDARY = BOUNDARY = (pol) ->
	obj = CLONE pol
	d = obj.faces.dim
	facets = obj.faces.cells[d-1]
	if d <= 0 then return new SimplicialComplex([], [])
	vertices = obj.vertices.verts  # input verts
	
	simplexMatrix = (cell) -> (AR([vertices[k],1.0]) for k in cell)
	sign = (number) -> if number > 0 then 1 else if number isnt 0 then -1
	volume = (cell) ->  numeric.det simplexMatrix(cell)
	orientation = (d,d_cells) ->
		if d == vertices[0].length		# solid complex
			out = (sign volume(cell) for cell in d_cells)
		else				# embedded complex
			out = ("numeric.det(somethingelse)" for cell in d_cells)  # DEBUG (choose minor with det(minor != 0	))
		out
	invertOrientation = (facet) ->
		newFacet = CLONE facet
		[newFacet[0],newFacet[1]] = [newFacet[1],newFacet[0]]
		newFacet

	dictos = obj.faces.dictos
	hom = obj.faces.homology
	incidence = (0 for k in [0...facets.length])
	father = new Array(facets.length)
	for pair in hom[d]
		incidence[pair[1]] += 1
		father[pair[1]] = pair[0]
	boundary_pairs = TRANS([k,father[k]] for k in [0...facets.length] when incidence[k] is 1)
	d_faces =  (obj.faces.cells[d][k] for k in boundary_pairs[1])
	facets =  (obj.faces.cells[d-1][k] for k in boundary_pairs[0])
	boundary_signs = orientation(d,d_faces)   
	for facet,k in facets 
		if boundary_signs[k] > 0
			facets[k] = invertOrientation(facet)
		else
			facets[k] = facet
	new SimplicialComplex(vertices,facets)

#///////////////////////////////////////////////////////////////////////////////

#root.STRUCT = STRUCT = (args) -> TODO

#///////////////////////////////////////////////////////////////////////////////

# Idnt identity matrix constructor
root.IDNT = IDNT = (d) -> numeric.identity(d)

# CUBOID dimension-independent interval generator. 
# sides is the sequence of side sizes on coordinate directions
root.CUBOID = CUBOID = (sides) -> SIMPLEXGRID AA(LIST)(sides)

# CUBE generator of the d-hexahedron of unit sides, with a vertex on the origin
root.CUBE = CUBE = (d) -> CUBOID(REPEAT(d) [1])

# SIMPLEX generator of the simplex σ^d ≡ conv({e_i} ∪ {0}) ⊂ R^d,1≤i≤d
root.SIMPLEX = SIMPLEX = (d) -> 
	vertices = CAT [[(0 for k in [0...d])], IDNT(d)]
	cells = [[0..d]]
	new SimplicialComplex(vertices, cells)

# POLYLINE generator of 1D connected complexes from the points sequence
root.POLYLINE = POLYLINE = (points) -> 
	cells = ([k,k+1] for k in [0...points.length-1])
	new SimplicialComplex(points,cells)

# TRIANGLES_TRIP  multidimensional primitive giving a complex of oriented triangles from d-points
root.TRIANGLESTRIP = TRIANGLESTRIP = (points) ->
	cells = ((if k%2 == 0 then [k,k+1,k+2] else [k+1,k,k+2]) for k in [0...points.length-2])
	new SimplicialComplex(points,cells)

# TRIANGLEFAN multidimensional primitive with the first element of verts as pivot
root.TRIANGLEFAN = TRIANGLEFAN = (points) -> 
	edges = POLYLINE points
	center = CENTROID(edges)([0...edges.vertices.m])
	points = AR [edges.vertices.verts,[center]]
	cells = (AR [edge, [points.length-1]] for edge in edges.faces.cells[1])
	new SimplicialComplex(points,cells)

# TRIANGLEARRAY generator of a mesh of triangles from a matrix of d-dimesional points
root.TRIANGLEARRAY = TRIANGLEARRAY = (m,n,points) -> 
	out = SIMPLEXGRID [REPEAT(m)(1),REPEAT(n)(1)]
	new SimplicialComplex(CAT(points),out.faces.cells[2])

# INTERVALS constructor of a uniform partition of the 1D interval [0, tip] with n segments
root.INTERVALS = INTERVALS = (tip) -> (n) -> SIMPLEXGRID [REPEAT(n) tip/n]

# MAP simplicial mapping. It maps an array of coordinate funs over a simplicial complex pol. 
root.MAP = MAP = (funs) -> (pol) ->
	points = (CONS(funs) v for v in pol.vertices.verts)
	d_cells = pol.faces.cells[pol.faces.dim]
	new SimplicialComplex(points, d_cells)

# CIRCLE returns o linear approximation of the 2D circle of given radius with n segments
root.CIRCLE = CIRCLE = (radius,n=32) ->
	domain = SIMPLEXGRID [REPEAT(n) 2*PI/n]
	MAP([sin,cos])(domain).s([0,1],[radius,radius]) 

# DISK returns on approx. with triangles of the 2D circle of given radius
root.DISK = DISK = (radius=1,n=32,m=1) ->
	domain = SIMPLEXGRID [REPEAT(n)(2*PI/n), REPEAT(m)(radius/m)]
	fx = ([u,v]) -> v*sin(u)
	fy = ([u,v]) -> v*cos(u)
	MAP( [fx, fy] )(domain)

# GRAPH returns a simplicial approximation of the map of funs over the domain
root.GRAPH = GRAPH = (domain) -> (funs) -> MAP(funs)(domain)

# HELIX returns a type of smooth space curve, i.e. a curve in three-dimensional space.
root.HELIX = HELIX = (radius=1,pitch=1,n=24,turns=1) -> 
	domain = INTERVALS(2*PI*turns)(n*turns)
	GRAPH( domain )( [sin, cos, ID] ).s([0,1,2],[radius,radius,pitch/(2*PI)])

# QUADMESH generator of a mesh of triangles from a matrix of d-dimesional points
root.QUADMESH = QUADMESH = (pointMat) -> 
	m = pointMat.length
	n = pointMat[0].length
	pairSeq = CART2 [[0...m-1],[0...n-1]]
	cells = []
	address = ([i,j]) -> n*i + j 
	for pair in pairSeq
		[i,j] = pair
		t1 = AA(address) [[i,j],[i+1,j],[i+1,j+1]]
		t2 = AA(address) [[i,j],[i+1,j+1],[i,j+1]]
		cells.push t1,t2
	verts = CAT pointMat
	new SimplicialComplex(verts,cells)

# LINSPACE1D constructor of a uniform partition of the 1D interval [0, tip] with n segments
root.LINSPACE1D = LINSPACE1D = (tip,n=1) -> SIMPLEXGRID [REPEAT(n) tip/n]

# LINSPACE2D generates a QUADMESH of points, Cartesian product of 2 intervals of size a,b
root.LINSPACE2D = LINSPACE2D = (a=1,b=1,n=1,m=1) -> 
	pointMat = AA(DISTL) DISTR AA(PROGRESSIVE_SUM) [REPEAT(n)(a/n), REPEAT(m)(b/m)]
	QUADMESH(pointMat) 

# LINSPACE3D generates a simplex 3D-grid of points, Cartesian product of 3 intervals of size a,b,c.
root.LINSPACE3D = LINSPACE3D = (a=1,b=1,c=1,n=1,m=1,p=1) ->
	domain2d = LINSPACE2D [a, b, n, m]
	hLists = PROGRESSIVE_SUM REPEAT(p)(c/p)
	EXTRUDE(hLists) domain2d

# CYLSURFACE produces a cylindrical surface of radius r and heigth h
root.CYLSURFACE = CYLSURFACE = (r=1, h=1, n=16, m=2) -> 
	domain = LINSPACE2D [2*PI, 1.0, n, m]
	# domain = SIMPLEXGRID [REPEAT(n)(2*PI/n), REPEAT(m)(1.0/m)]
	fx = ([u,v]) -> r*cos(u)
	fy = ([u,v]) -> r*sin(u)
	fz = ([u,v]) -> h*v
	MAP( [fx, fy, fz] )( domain )

# CYLSOLID produces a solid cylinder possibly with a cylindrical hole of radius r
root.CYLSOLID = CYLSOLID = (R=1, r=0, h=1, n=16, m=1, p=1) -> 
	domain = LINSPACE3D [2*PI, R-r, h, n, m, p]
	#domain = SIMPLEXGRID [REPEAT(n)(2*PI/n), REPEAT(m)((R-r)/m), REPEAT(p)(h/p)]
	fx = ([u,v,w]) -> v*cos(u)
	fy = ([u,v,w]) -> -v*sin(u)
	fz = ([u,v,w]) -> w
	MAP( [fx, fy, fz] )( domain.t([1],[r]) )
	
# TORUSSURFACE produces a toroidal surface of radiuses r,R approximated with n x m x 2 triangles
root.TORUSSURFACE = TORUSSURFACE = (r=1, R=3, n=12, m=8) -> 
	domain = LINSPACE2D [2*PI, 2*PI, n, m]
	#domain = SIMPLEXGRID [ REPEAT(n)(2*PI/n), REPEAT(m)(2*PI/m) ]
	fx = ([u,v]) -> (R + r * cos(v)) * cos(u)
	fy = ([u,v]) -> (R + r * cos(v)) * sin(u)
	fz = ([u,v]) -> r * sin(v)
	MAP( [fx, fy, fz] )( domain )

# 	TORUSSOLID produces a solid torus of radiuses r,R approximated with tetrahedra
root.TORUSSOLID = TORUSSOLID = (r=1,R=3,n=8,m=16,p=1) -> 
	domain = LINSPACE3D [2*PI, 2*PI, 1, n, m, p]
	#domain = SIMPLEXGRID [REPEAT(n)(2*PI/n), REPEAT(m)(2*PI/m), REPEAT(p)(1/p)]
	fx = ([u,v,w]) -> (R + r * w * cos(u)) * cos(v)
	fy = ([u,v,w]) -> (R + r * w * cos(u)) * -sin(v)
	fz = ([u,v,w]) -> r * w * sin(u)
	MAP( [fx, fy, fz] )( domain )


###
root.SCHLEGEL = SCHLEGEL = (pol) -> (point) -> 



def SCHLEGEL(pol):
	def project(point):
		return [coord/point[-1] for coord in point[:-1]]
	verts = [project(v) for v in pol.vertices.points]
	cells = pol.cells[-2]
	return PolytopalComplex(verts,cells)


# 
root.POLYGON = POLYGON = (n) -> 
	points = [[cos(alpha),sin(alpha)]
			  for alpha in (scipy.linspace(0.0, 2*pi, n+1) + (pi*n)/2)]
	return TRIANGLEFAN(points)	
