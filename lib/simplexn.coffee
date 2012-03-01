# **simplexn.coffee** is
# a prototype geometric kernel for plasm.js, 
# the *JavaScript Programming Language for Solid Modeling*
#
# Copyright (c) 2011-2012 Universit Roma Tre, CVD-lab <cvdlab@email.com>
#
# The source for [Plasm.js](https://github.com/cvd-lab/) is available on GitHub,
# and released under the MIT license.
# <HR>

# To make the qualified symbols visible to the root object (typically Window)
root = exports ? this

# Imported symbols from Math object
{PI, E, log, sin, cos, tan, asin, acos, atan, atan2, ceil, floor, sqrt, exp, abs, round} = Math

# <HR>

#### Operators for [FL-style](http://en.wikipedia.org/wiki/FL_(programming_language&#41;) [programming](http://en.wikipedia.org/wiki/Function-level_programming)

#
# **APPLY** returns the result of the application expression `f(x)`
root.APPLY = APPLY = (args) ->  [f, x] = args; f.apply(null,[x])

# **COMP** composition. Returns the composition of the `funs` array in the argument
root.COMP = COMP = (funs) -> 
	comp2 = (f,g) -> (x) -> f (g x)
	funs.reduce comp2

# **CONS** construction. Applies a function array `[f_1, ..., f_n]` to the `x` argument,
# producing the array of application values: `[f_1(x), ..., f_n(x)]`
root.CONS = CONS = (flist) -> (x) -> flist.map (f) -> f x

# **CAT** catenates `args`, an array of arrays, by eliminating a level of nesting
root.CAT = CAT = (args) -> [].concat args...  ## REMARK ... always apply by parentheses   BUG !!!!

# **ID** returns the `arg` argument unchanged
root.ID = ID = (arg) -> arg

# **K** constant functional that always returns the first argument (`a`), for any value of the second one (`b`)
root.K = K = (a) -> (b) -> a

# **AA** applies `fun` to each element of `array`
root.AA = AA = (fun) -> (array) -> array.map (e) -> fun e

# **DISTR** distribute right. Returns the `pair` sequence with the elements of `array` and `x`
root.DISTR = DISTR = (pair) -> [array, x] = pair; ([el,x] for el in array)

# **DISTL** distribute left. Returns the `pair` sequence with `x` and the elements of `array`
root.DISTL = DISTL = (pair) -> [x,array] = pair; [x,el] for el in array

# **INSR** insert right combinator, allowing to apply a binary operator `op` to an `array` of n arguments
root.INSR = INSR = (op) -> (array) -> array.reduceRight op

# **INSL** insert left combinator, allowing to apply a binary operator `op` to an `array` of n arguments
root.INSL = INSL = (op) -> (array) -> array.reduce op

# **TREE**  applies a binary operator `op` to an `array` of n arguments
root.TREE = TREE = (op) -> 
	tree = (fun,array) ->
		len = array.length
		if len <=1 then return array[0]
		k = floor (len/2)
		fun( CAT [tree(fun, array[0...k]), tree(fun, array[k...len])] )
	(array) -> tree(op,array)

# **BIGGER** is a binary operator that returns the greater of arguments
root.BIGGER = BIGGER = (args) -> [a,b] = args; if a > b then a else b

# **SMALLER** binary operator that returns the smaller argument (in a proper ordering!)
root.SMALLER = SMALLER = (args) -> [a,b] = args; if a < b then a else b

# **BIGGEST** binary operator that returns the greatest of `args` values
root.BIGGEST = BIGGEST = (args) -> TREE(BIGGER) args 

# **SMALLEST** returns the smallest element of the `args` input sequence
root.SMALLEST = SMALLEST = (args) -> TREE(SMALLER) args

# **LIST** returns an array containing `arg`. Alias for`CONS([ID])`
root.LIST = LIST = (arg) -> (CONS [ID]) arg

# **FIRST** returns the first element of the `arg` array. 
root.FIRST = FIRST = (arg) -> arg[0]

# **LAST** returns the last element of the `arg` array. 
root.LAST = LAST = (arg) -> arg[arg.length - 1]

# **LEN** returns the length of the array `args`
root.LEN = LEN = (args) -> args.length

# **REVERSE** returns the `args` array in reverse order
root.REVERSE = REVERSE = (args) -> if args.length > 1 then (args[i] for i in [args.length-1..0]) else args

# **TAIL** returns the non-empty `args` array but its *first* element
root.TAIL = TAIL = (args) -> if args.length > 0 then args.splice 1, args.length-1 else args

# **BUTLAST** returns the non-empty `args` array but its *last* element
root.BUTLAST = BUTLAST = (args) -> if args.length > 1 then REVERSE TAIL REVERSE args else []

# **AL** append left. appends `elem` on the left of `array`
root.AL = AL = (args) -> [array, elem] = args; CAT [array, elem]

# **AR** append right. appends `elem` on the right of `seq`
root.AR = AR = (args) -> [elem, array] = args;  CAT [elem, array]

# **REPEAT** repetition operator. Returns an array with `n` repetitions of `arg`
root.REPEAT = REPEAT = (n) -> 
	(args) -> 
		(args for i in [0...n])
		(args for i in [0...n])

# **REPLICA** array repetition operator (with catenation). 
# `REPLICA(n)(array)` is equivalent to `COMP([CAT,REPEAT(n)])(array)`
root.REPLICA = REPLICA = (n) -> (args) -> CAT (args for i in [0...n])

arithmeticOp = (op) ->  (args) -> if typeof args[0] is 'number' then op args else AA(op)(TRANS args)

# **SUM** arithmetic operation between numbers or number arrays
root.SUM = SUM = (args) -> if args and args[0]? then arithmeticOp(INSL (x,y) -> x+y) args else undefined

# **SUB** arithmetic operation between numbers or number arrays
root.SUB = SUB = (args) -> if args and args[0]? then arithmeticOp(INSL (x,y) -> x-y) args else undefined
#root.SUB = SUB = (args) -> if typeof args[0] is 'number' then (INSL (x,y) -> x-y) args else AA(INSL (x,y) -> x-y)(TRANS args)

# **MUL** arithmetic operation between numbers or number arrays
root.MUL = MUL = (args) -> if args and args[0]? then arithmeticOp(INSL (x,y) -> x*y) args else undefined
#root.MUL = MUL = (args) -> if typeof args[0] is 'number' then (INSL (x,y) -> x*y) args else AA(INSL (x,y) -> x*y)(TRANS args)

# **DIV** arithmetic operation between numbers or number arrays
root.DIV = DIV = (args) -> if args and args[0]? then arithmeticOp(INSL (x,y) -> x/y) args else undefined
#root.DIV = DIV = (args) -> if typeof args[0] is 'number' then (INSL (x,y) -> x/y) args else AA(INSL (x,y) -> x/y)(TRANS args)

# **TRANS** transposes `args` (an array of arrays of the same length), like *matrix* transposition
root.TRANS = TRANS = (args) ->
	n = args.length; m = args[0].length; args = CAT args
	((args[j*m+i] for j in [0...n]) for i in [0...m])

# **MAT** transforms a linear array `args` into an array of arrays with `m` rows and `n` columns
root.MAT = MAT = (m,n) -> (args) -> ((args[i*n+j] for j in [0...n]) for i in [0...m]) 

# **ISNUM** predicate to test if `n` is a number
root.ISNUM = ISNUM = (n) -> (not isNaN parseFloat n) and isFinite n

# **ISFUN** predicate to test if `arg` is a function
root.ISFUN = ISFUN = (arg) -> if typeof arg is "function" then true else false

# **PROGRESSIVE_SUM** returns the incremental sum of `args` starting from 0
root.PROGRESSIVE_SUM = PROGRESSIVE_SUM = (args) ->
	AL [0, (INSR (x,y) -> x+y) args[0..i] for i in [0...args.length]]

# **SET** transforms an `array` with possibly repeated elements to one without repetitions
root.SET = SET = (array) -> 
	dict = {}; dict[k.toString()] = k for k in array; 
	(val for key,val of dict)

# **CART2** returns the Cartesian product of two sequences
CART2 = (listOfLists) -> CAT(AA(DISTL)(DISTR(listOfLists)))
F1 = (listOfLists) -> AA(AA(LIST))(listOfLists)

# **CART** returns the Cartesian product of any number of sequences
`var CART = function (args) {
  return args.reduce(function(a, b) {
    var ret = [];
    a.forEach(function(a) {
      b.forEach(function(b) {
        ret.push(a.concat([b]));
      });
    });
    return ret;
  }, [[]]);
};`
root.CART = CART



# <HR> 

#### Some utility functions

# **PRINT** returns arg and prints its value to `console.log`. It may be used for debugging
root.PRINT = PRINT = (string,params) -> console.log string, params, "\n"

# **CLONE** makes a deep copy of the `obj` argument. A CoffeeScript `type` function from 
# [CoffeeScript Cookbook](http://coffeescriptcookbook.com/chapters/classes_and_objects/cloning)
root.CLONE = CLONE = (obj) ->
	if not obj? or typeof obj isnt 'object'
		return obj
	newInstance = new obj.constructor()
	for key of obj
		newInstance[key] = CLONE obj[key]
	newInstance

# Another `type` function from 
# [CoffeeScript Cookbook](http://coffeescriptcookbook.com/chapters/classes_and_objects/type-function)
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

# <HR> 
#### Symbolic from/to numeric


# number of decimal digits of stored data
digits = 9

# Scaling factor to be used for numeric to symbolic conversions
root.PRECISION = PRECISION = +"1E#{digits}"

# To transform a floating-point `number` nto a fixed-precision value
fixedPrecision = (number) ->
	int = round number
	number = round(PRECISION * number) / PRECISION
	if abs(number-int) <= 1.0/PRECISION then int else number

# The coordinate representation of a `point` is transformed to fixed-precision
fcode = (point) -> (AA fixedPrecision) point

# **CODE** is a function transforming a `point` representation into a symbolic format
root.CODE = CODE = (point) -> "[#{fcode point}]"

# Numeric decoding of the `string` representation of a number
decode = (string) -> +string  # => a number

# Numeric decoding of `pointCode`, the *string* representation of a *d-dimensional* point
uncode = (pointCode) -> (AA decode) pointCode.replace(/[\[\]]/g, '').split(',')

# Transformation from the `string` representation of a number list to a standard array of numbers
string2numberList = (string) ->
	if string is '[]' then [] else
		regex = /[,|\[|\]]/ # regex => "[" or "," or "]"
		(AA Number) BUTLAST TAIL string.split(regex)

# <HR> 
#### PointSet class

# The class used to represent a *set of points*, providing numeric to symbolic conversion, 
#	storage and fast retrieval.
class PointSet
	
	# binary composition of maps, i.e. of dictionaries ...
	mapcomp = (map1,map2) -> MAP = {}; MAP[k] = map2[v] for k,v of map1
	
	# Intance constructor. The input parameter `point` is an array of arrays of numbers 
	# (i.e. the coordinate matrix) of the class instance in [row-major order](http://en.wikipedia.org/wiki/Row-major_order).
	# The constructor defines:
	constructor: (points) ->
		# *	the dimension `@rn` of the space points, *i.e.* their number of coordinates;
		# *	a dictionary `@dict` of distinct points, mapping the symbolic representation of a point into the integer *point index*;
		# *	a `@map` translating from input indexes of points (possibly repeated)  to internal point ids (without repetitions):
		#  	-	mainly useful to *automatically* glue the discrtete representation of closed manifolds along the boundary of their topological maps
		# *	the array `@verts` containing the numeric representation (in fixed-precision) of the class instance;
		# *	the number `@m` of distinct points in the class instance
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

	# Method used to update the coordinates in all points of a `Pointset` instance.
	# The input parameter `modify` is a function.
	update: (modify) ->
		@verts[pid] = modify (uncode pcode) for pcode,pid of @dict
		@dict = {}
		@dict[CODE(point)] = pid for point,pid in @verts

	# Method used to embed the `Pointset` instance in the subspace *x_{rn} = x_{rn+1} = ... = x_{rn+n-1} = 0*
	# of the Euclidean space *E^{rn+n}*, i.e. to add *n* zero coordinates to all points
	embed: (n) -> 
		@rn += n
		@update (point) -> CAT([point, REPEAT(n) 0])
		@

	# Method used to translate the `Pointset` instance.
	# The coordinates specified by `indices` are affected by the transformation `parameters`
	t: (indices, parameters) ->
		vect = (0 for k in [0...@rn])
		vect[indices[h]] = parameters[h] for h in [0...indices.length]
		@update (point) -> SUM([point, vect])
		@

	# Method used to scale the `Pointset` instance.
	# The coordinates specified by `indices` are affected by the transformation `parameters`
	s: (indices, parameters) ->
		vect = (1 for k in [0...@rn])
		vect[indices[h]] = parameters[h] for h in [0...indices.length]
		@update (point) -> MUL([point, vect])
		@

	# Method used to rotate the `Pointset` instance.
	# The *two* coordinates specified by `axes` are rotated by `angle` about the origin.
	r: (axes, angle) ->
		mat = numeric.identity(@rn)
		c = cos angle; s = sin angle
		[i,j] = axes
		mat[i][i] = c; mat[i][j] = -s
		mat[j][i] = s; mat[j][j] = c
		@update (point) -> numeric.dot(mat, point)
		@

# Make `PointSet` globally visible
root.PointSet = PointSet


# <HR> 
#### Topology class

# The class is used to store the topological relations between the *d*-cells of a simplicial complex, 
# for all values of *d* between 0 and the intrinsic dimension of the complex
class Topology
	
	# Intance constructor. The input parameters `vertices` and cells respectively denote a PointSet instance and
	# an array of arrays of vertex ids specifying the complex cells of highest dimension
	# The constructor defines:
	constructor: (vertices, d_cells) ->
		# *	the dimension `@dim` of the simplicial complex (also denoted *d* in the following);
		# *	an array `@dictos` of *d+1* dictionaries specifyng the maps between symbolic keys and vertex arrays of each *k*-skeleton *(0 ≤ k ≤ d)*;
		# *	the array `@homology` contain *d+1* lists of row-column pairs *(i,j)* of the incidence matrix of the *k*-th coboundary operator *(0 ≤ k ≤ d)* of the simplicial complex;
		# *	the array `@cells` contains *d+1* lists, giving the standard representation of *k*-cells as (ordered) vertex lists.
		vertices = vertices or []
		d_cells = d_cells or []
		@dim = if d_cells.length > 0 then d_cells[0].length-1 else -1
		d_cells = ((vertices.map[k] for k in cell) for cell in d_cells)
		d_cells = (cell for cell in d_cells when (SET cell).length is cell.length)
		@dictos = mkCellDB (cell_complex d_cells)
		@homology = homology_maps @dictos
		@cells = (string2numberList cell for cell of dict for dict in @dictos)

	# The standard orientaion of a cell (vertex ids sorted in encreasing order) 
	# is reverted by exchanging the first and the last elements, according to the
	# rule that one exchange reverts the permutation class (and the sign) of a simplex
	revert = (cell) ->
		len = cell.length
		if len >1 then CAT [cell[len-1], cell[1...len-1], cell[0]] else cell
		
	# Duplicates cells are removed using dictionaries
	remove_duplicates = (hasDupes) ->
		dict = {}; (dict[CODE(item)] = item for item in hasDupes \
			when not dict[CODE(revert item)]? and not dict[CODE(item)]?)
	
	# A cell is rotated by a unit rotation of its permutation
	rotate = (cell) ->
		if cell.length > 1 then CAT [cell[1...cell.length],[cell[0]]] else cell
	
	# The *(d-1)*-faces (facets) of a *d*-cell are returned
	facets = (cell) -> 
		out = []; for h in [0...cell.length]
			facet = (k for k,i in cell when i isnt h)
			out.push  if h%2 is 1 then revert facet else facet
		out
	# Computes the *(h-1)*-skeleton of the array `h_cells` 
	skeltn = (h_cells) -> 
		remove_duplicates CAT (facets cell for cell in h_cells)
	
	# To compute all the skeletons of a simplicial *d*-complex starting from the 
	# array `d_cells` of higest dimensional cells. It is used by the instance constructor
	cell_complex = (d_cells) ->
		if d_cells.length > 0
			dim = d_cells[0].length-1
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
			
	# This function builds the cell data base (i.e. `dictos`) of the simplicial `complex`
	mkCellDB = (complex) ->
		complex = complex or []
		dictos = []
		for skel,d in complex
			dictos[d] = {}; dictos[d][CODE(cell)] = k for cell,k in skel
		dictos
	
	# Used to compute the chain complex generated by the simplicial complex
	# The input parameter `dictos` is and array of dictionaries of *k*-cells *(0 ≤ k ≤ d)*. 
	# The oputput parameter `homology` is an array of *d+1* arrays of pairs of incident cell ids.
	# homology codifies the (sparse) incidence matrices of the coboundary operators.
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
	
# Make `Topology` globally visible
root.Topology = Topology


# <HR> 
#### SimplicialComplex class

# The class is used to represent a simplicial complex of whatever intrinsic dimension
# embedded in any dimensional affine space. 
class SimplicialComplex
	# Instance constructor. The input parameters `points`, `d_cells` and `filter` respectively denote a `PointSet` instance,
	# the highest dimensional `d_cells`, and a Boolean `filter` specifying if  redundant vertices 
	# (i.e. the ones not used by the cells), must be either filtered out or not.
	# The constructor defines:
	constructor: (points, d_cells, filter=true) ->
		points = points or []
		d_cells = d_cells or []
		if filter then [points,d_cells] = vertexFilter(points,d_cells)
		# *	a PointSet instance `@vertices` 
		# *	a Topology instance `@faces` 
		@vertices = new PointSet(points)
		@faces = new Topology(@vertices,d_cells)
		@

	# Used to filter out the redundant vertices. This may be required, e.g. to produce a class instance that
	# is the boundary or one of the skeleton of another complex, as a totally new simplicial complex,
	# i.e. with a new (non-redundant) numbering of vertices.
	vertexFilter = (points, d_cells) ->
		numbers = (a,b) -> a-b
		verts = (SET CAT d_cells).sort(numbers)
		inverts = []; inverts[i]=k for i,k in verts
		points = (point for point,k in points when inverts[k]?)
		d_cells = ((inverts[k] for k in cell) for cell in d_cells)
		[points,d_cells]

	# Method used to embed the `SimplicialComplex` instance in the subspace *x_{rn} = x_{rn+1} = ... = x_{rn+n-1} = 0*
	# by embedding the PointSet instance of its vertices.
	embed: (n) -> @vertices.embed(n); @

	# Method used to translate the `SimplicialComplex` instance
	# by traslating the PointSet instance of its vertices.
	t: (indices, parameters) -> @vertices.t(indices, parameters); @

	# Method used to scale the `SimplicialComplex` instance
	# by scaling the PointSet instance of its vertices.
	s: (indices, parameters) -> @vertices.s(indices, parameters); @

	# Method used to rotate the `SimplicialComplex` instance 
	# by rotating the PointSet instance of its vertices.
	# The *two* coordinates specified by `axes` are rotated by `angle` about the origin.
	r: (axes, angle) -> @vertices.r(axes, angle); @


# Make `SimplicialComplex` globally visible 
root.SimplicialComplex = SimplicialComplex




# <HR> 

#### Geometric computing functions


# **EMBED** embeds a *d*-polyhedron into the subspace *x_{d+1} =  = x_{d+n} = 0* of *E^{d+n}*
root.EMBED = EMBED = (n) -> (obj) -> (CLONE obj).embed(n)

# **T** dimension-independent translation tensor. Return a translated deep copy of the input `obj`.
root.T = T = (indices,values) -> (obj) -> (CLONE obj).t(indices,values)

# **S** dimension-independent scaling tensor. Return a scaled deep copy of the input `obj`.
root.S = S = (indices,values) -> (obj) -> (CLONE obj).s(indices,values)

# **R** dimension-independent rotation tensor. Return a rotated deep copy of the input `obj`.
# The rotation angle is given in radians
root.R = R = (axes,angle) -> (obj) -> (CLONE obj).R(axes, angle)

# **CENTROID** returns a point, i.e. the barycenter of the `obj`'s `face`, where the last one is given
# as an array of vertex ids.
root.CENTROID = CENTROID = (obj) -> (face) ->
	A = (obj.vertices.verts[v]  for v in face)
	C = REPEAT(A.length)(1.0/A.length)
	point = numeric.dot(C,A)

# **EXTRUDE** returns a simplicial *(d+1)*-complex triangulating the *d*-dimensional `obj`. 
# `hlist` is a list of displacements along the new coordinate direction, 
# where negative numbers stand for empty spaces
root.EXTRUDE = EXTRUDE = (hlist) -> (obj) -> 

	# algorithm initialization
	cells = CLONE obj.faces.cells
	dim = CLONE obj.faces.dim
	verts = CLONE obj.vertices.verts
	lastcoords = PROGRESSIVE_SUM (AA)(abs)(hlist)

	# Used to append a new coordinate to all elements of an array of points.
	coords_distribute = (pairs) ->
		out = CAT( AA(AR)(DISTR(pair)) for pair in pairs)

	# To make a numeric shift by adding an offset to all numbers of an array of arrays
	shift = (offset, arrays) -> (x+offset for x in array) for array in arrays

	# To generate the extruded *(d+1)*-cells of a *d*-simplex
	subcomplex = (d,array) ->
		(array[i...i+d] for i in [0..array.length-d])
	
	# exotic cases
	if dim <= 0
		cells = [[],[]]
		vertices = AA(LIST)(lastcoords)
		cells[1] = ([i,i+1] for i in [0...hlist.length+1])
		
	# algorithm bulk	
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

# **SIMPLEXGRID** returns a *d*-dimensional grid of simplices, i.e. a `SimplicialComplex`
# instance triangulating the *d*-dimensional cuboid space produced by the Cartesian product
# of 1D segments with lengths specified by `args`.
root.SIMPLEXGRID = SIMPLEXGRID = (args) ->
	hlist = args[0]
	lastcoords = PROGRESSIVE_SUM AA(abs)(hlist)
	verts = AA(LIST)(lastcoords)
	cells = ([i,i+1] for i in [0...hlist.length] when hlist[i] > 0 )
	complex = new SimplicialComplex(verts,cells)
	for hlist in args[1..args.length] # args[1...args.length] !!
		complex = EXTRUDE(hlist)(complex)
	complex

# **FREE** transforms a simplicial *d*-complex `obj` into a list of simplicial complexes (one for *d*-simplex)
root.FREE = FREE = (obj) ->
	d = obj.faces.dim
	simplices = (obj.vertices.verts[k] for k in cell for cell in obj.faces.cells[d])
	out = []; for SIMPLEX in simplices
		outsimplex = new SimplicialComplex(SIMPLEX,[[0..d]])
		out.push outsimplex
	out

# **EXPLODE** generates an *exploded copy* of a *d*-simplicial `scene`, depending on the explosion scaling `args`,
# that is an array of *d* numbers.
root.EXPLODE = EXPLODE = (args) -> (scene) ->
	face = () -> item.faces.cells[item.faces.dim][0]
	centers = (CENTROID(item)(face()) for item in scene)
	scaledCenters = (MUL([args,center]) for center in centers)
	translVectors = (SUB(pair) for pair in TRANS([scaledCenters, centers]))
	scene[k].t([0...v.length],v) for v,k in translVectors

# **SKELETON** returns the `k`-dimensional skeleton *(0 ≤ k ≤ d)* of a simplicial *d*-complex `obj`
root.SKELETON = SKELETON = (k) -> (obj) ->
	verts = obj.vertices.verts
	faces_k = obj.faces.cells[k]
	new SimplicialComplex(verts,faces_k)


# **BOUNDARY** returns the oriented *(d-1)*-simplicial complex boundary of a simplicial *d*-complex `pol`
root.BOUNDARY = BOUNDARY = (pol) ->

	# Return the *homogeneous* matrix (in row-major order) of the input`cell`.
	simplexMatrix = (cell) -> (AR([vertices[k], 1.0]) for k in cell)

	# Compute the sign of the input parameter, assumed non-zero
	sign = (number) -> if number > 0 then 1 else if number isnt 0 then -1

	# Compute a quantity proportional to the volume of a `cell` (given as array of vertex ids)
	volume = (cell) ->  numeric.det simplexMatrix(cell)

	# Return the orientations of the `cells` of dimension `d`:
		# 	-	solid complex: the intrinsic dimension of *d*-cells equates the embedding dimension;
		# 	-	embedded complex. TODO
	orientation = (d, cells) ->
		if d == vertices[0].length
			out = (sign volume(cell) for cell in cells)
		else
			out = ("numeric.det(somethingelse)" for cell in cells)  # DEBUG (choose minor with det(minor != 0	))
		out

	# Invert the orientation of a copy of the input `facet`.
	invertOrientation = (facet) ->
		newFacet = CLONE facet
		[newFacet[0],newFacet[1]] = [newFacet[1],newFacet[0]]
		newFacet

	# Algorithm's initialization
	obj = CLONE pol
	d = obj.faces.dim
	facets = obj.faces.cells[d-1]
	if d <= 0 then return new SimplicialComplex([], [])
	vertices = obj.vertices.verts  # input verts
	dictos = obj.faces.dictos
	hom = obj.faces.homology
	# Compute the incidence numbers of the *(d-1)*-faces.
	# `hom[d]` contains the incidence pairs of the relation
	# between *d*-faces and *(d-1)*-faces. `boundary_pairs` filters out the
	# only pairs with single incidence
	incidence = (0 for k in [0...facets.length])
	father = new Array(facets.length)
	for pair in hom[d]
		incidence[pair[1]] += 1
		father[pair[1]] = pair[0]
	boundary_pairs = TRANS([k,father[k]] for k in [0...facets.length] when incidence[k] is 1)
	# Algorithm finalization
	d_faces =  (obj.faces.cells[d][k] for k in boundary_pairs[1])
	facets =  (obj.faces.cells[d-1][k] for k in boundary_pairs[0])
	boundary_signs = orientation(d,d_faces)   
	for facet,k in facets 
		if boundary_signs[k] > 0
			facets[k] = invertOrientation(facet)
		else
			facets[k] = facet
	# The output complex is finally generated
	new SimplicialComplex(vertices,facets)




# <HR> 

#### Geometric computing primitives


# root.STRUCT = STRUCT = (args) -> TODO

# **IDNT** identity matrix constructor
root.IDNT = IDNT = (d) -> numeric.identity(d)

# **CUBOID** dimension-independent interval generator. 
# sides is the sequence of side sizes on coordinate directions
root.CUBOID = CUBOID = (sides) -> SIMPLEXGRID AA(LIST)(sides)

# **CUBE** generator of the d-hexahedron of unit sides, with a vertex on the origin
root.CUBE = CUBE = (d) -> CUBOID(REPLICA(d) [1])  # REPEAT !!!

# **SIMPLEX** generator of the simplex ^d  conv({e_i}  {0})  R^d,1id
root.SIMPLEX = SIMPLEX = (d) -> 
	vertices = CAT [[(0 for k in [0...d])], IDNT(d)]
	cells = [[0..d]]
	new SimplicialComplex(vertices, cells)

# **POLYMARKER** generator of 0D complexes from the `points` sequence
root.POLYMARKER = POLYMARKER = (points) -> 
	cells = ([k] for k in [0...points.length])
	new SimplicialComplex(points,cells)

# **POLYLINE** generator of 1D connected complexes from the `points` sequence
root.POLYLINE = POLYLINE = (points) -> 
	cells = ([k,k+1] for k in [0...points.length-1])
	new SimplicialComplex(points,cells)

# **TRIANGLESTRIP**  multidimensional primitive giving a complex of oriented triangles from d-points
root.TRIANGLESTRIP = TRIANGLESTRIP = (points) ->
	cells = ((if k%2 == 0 then [k,k+1,k+2] else [k+1,k,k+2]) for k in [0...points.length-2])
	new SimplicialComplex(points,cells)

# **TRIANGLEFAN** multidimensional primitive with the first element of verts as pivot
root.TRIANGLEFAN = TRIANGLEFAN = (points) -> 
	edges = POLYLINE points
	center = CENTROID(edges)([0...edges.vertices.m])
	points = AR [edges.vertices.verts,[center]]
	cells = (AR [edge, [points.length-1]] for edge in edges.faces.cells[1])
	new SimplicialComplex(points,cells)

# **TRIANGLEARRAY** generator of a mesh of triangles from a matrix of d-dimesional points
root.TRIANGLEARRAY = TRIANGLEARRAY = (m,n,points) -> 
	out = SIMPLEXGRID [REPEAT(m)(1),REPEAT(n)(1)]
	new SimplicialComplex(CAT(points),out.faces.cells[2])

# **INTERVALS** constructor of a uniform partition of the 1D interval [0, tip] with n segments
root.INTERVALS = INTERVALS = (tip) -> (n) -> SIMPLEXGRID [REPEAT(n) tip/n]

# **MAP** simplicial mapping. It maps an array of coordinate funs over a simplicial complex pol. 
root.MAP = MAP = (funs) -> (pol) ->
	points = (CONS(funs) v for v in pol.vertices.verts)
	d_cells = pol.faces.cells[pol.faces.dim]
	new SimplicialComplex(points, d_cells)

# **CIRCLE** returns o linear approximation of the 2D circle of given radius with n segments
root.CIRCLE = CIRCLE = (radius,n=32) ->
	domain = SIMPLEXGRID [REPEAT(n) 2*PI/n]
	MAP([sin,cos])(domain).s([0,1],[radius,radius]) 

# **DISK** returns on approx. with triangles of the 2D circle of given radius
root.DISK = DISK = (radius=1,n=32,m=1) ->
	domain = SIMPLEXGRID [REPEAT(n)(2*PI/n), REPEAT(m)(radius/m)]
	fx = ([u,v]) -> v*sin(u)
	fy = ([u,v]) -> v*cos(u)
	MAP( [fx, fy] )(domain)

# **GRAPH** returns a simplicial approximation of the map of funs over the domain
root.GRAPH = GRAPH = (domain) -> (funs) -> MAP(funs)(domain)

# **HELIX** returns a type of smooth space curve, i.e. a curve in three-dimensional space.
root.HELIX = HELIX = (radius=1,pitch=1,n=24,turns=1) -> 
	domain = INTERVALS(2*PI*turns)(n*turns)
	GRAPH( domain )( [sin, cos, ID] ).s([0,1,2],[radius,radius,pitch/(2*PI)])

# **QUADMESH** generator of a mesh of triangles from a matrix of d-dimesional points
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

# **LINSPACE1D** constructor of a uniform partition of the 1D interval [0, tip] with n segments
root.LINSPACE1D = LINSPACE1D = (tip,n=1) -> SIMPLEXGRID [REPEAT(n) tip/n]

# **LINSPACE2D** generates a QUADMESH of points, Cartesian product of 2 intervals of size a,b
root.LINSPACE2D = LINSPACE2D = (a=1,b=1,n=1,m=1) -> 
	pointMat = AA(DISTL) DISTR AA(PROGRESSIVE_SUM) [REPEAT(n)(a/n), REPEAT(m)(b/m)]
	QUADMESH(pointMat) 

# **LINSPACE3D** generates a simplex 3D-grid of points, Cartesian product of 3 intervals of size a,b,c.
root.LINSPACE3D = LINSPACE3D = (a=1,b=1,c=1,n=1,m=1,p=1) ->
	domain2d = LINSPACE2D [a, b, n, m]
	hLists = PROGRESSIVE_SUM REPEAT(p)(c/p)
	EXTRUDE(hLists) domain2d

# **CYLSURFACE** produces a cylindrical surface of radius r and heigth h
root.CYLSURFACE = CYLSURFACE = (r=1, h=1, n=16, m=2) -> 
	domain = LINSPACE2D [2*PI, 1.0, n, m]
	# domain = SIMPLEXGRID [REPEAT(n)(2*PI/n), REPEAT(m)(1.0/m)]
	fx = ([u,v]) -> r*cos(u)
	fy = ([u,v]) -> r*sin(u)
	fz = ([u,v]) -> h*v
	MAP( [fx, fy, fz] )( domain )

# **CYLSOLID** produces a solid cylinder possibly with a cylindrical hole of radius r
root.CYLSOLID = CYLSOLID = (R=1, r=0, h=1, n=16, m=1, p=1) -> 
	domain = LINSPACE3D [2*PI, R-r, h, n, m, p]
	#domain = SIMPLEXGRID [REPEAT(n)(2*PI/n), REPEAT(m)((R-r)/m), REPEAT(p)(h/p)]
	fx = ([u,v,w]) -> v*cos(u)
	fy = ([u,v,w]) -> -v*sin(u)
	fz = ([u,v,w]) -> w
	MAP( [fx, fy, fz] )( domain.t([1],[r]) )
	
# **TORUSSURFACE** produces a toroidal surface of radiuses r,R approximated with n x m x 2 triangles
root.TORUSSURFACE = TORUSSURFACE = (r=1, R=3, n=12, m=8) -> 
	domain = LINSPACE2D [2*PI, 2*PI, n, m]
	#domain = SIMPLEXGRID [ REPEAT(n)(2*PI/n), REPEAT(m)(2*PI/m) ]
	fx = ([u,v]) -> (R + r * cos(v)) * cos(u)
	fy = ([u,v]) -> (R + r * cos(v)) * sin(u)
	fz = ([u,v]) -> r * sin(v)
	MAP( [fx, fy, fz] )( domain )

# **TORUSSOLID** produces a solid torus of radiuses r,R approximated with tetrahedra
root.TORUSSOLID = TORUSSOLID = (r=1,R=3,n=8,m=16,p=1) -> 
	domain = LINSPACE3D [2*PI, 2*PI, 1, n, m, p]
	#domain = SIMPLEXGRID [REPEAT(n)(2*PI/n), REPEAT(m)(2*PI/m), REPEAT(p)(1/p)]
	fx = ([u,v,w]) -> (R + r * w * cos(u)) * cos(v)
	fy = ([u,v,w]) -> (R + r * w * cos(u)) * -sin(v)
	fz = ([u,v,w]) -> r * w * sin(u)
	MAP( [fx, fy, fz] )( domain )

