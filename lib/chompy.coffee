root = exports ? this

{PI, E, log, sin, cos, tan, asin, acos, atan, atan2, ceil, floor, sqrt, exp, abs, round} = Math

APPLY = (args) ->  [f, x] = args; f.apply(null,[x])
COMP = (flist) -> 
	comp2 = (f,g) -> (x) -> f (g x)
	flist.reduce comp2
CONS = (flist) -> (x) -> flist.map (f) -> f x
CAT = (a) -> [].concat a...
ID = (a) -> a
K = (a) -> (b) -> a
AA = (f) -> (list) -> list.map (e) -> f e
DISTR = (args) -> [list,e] = args; [el,e] for el in list
DISTL = (args) -> [e,list] = args; [e,el] for el in list
INSR = (f) -> (seq) -> seq.reduceRight f
INSL = (f) -> (seq) -> seq.reduce f
BIGGER = (a,b) -> if a > b then a else b
SMALLER = (a,b) -> if a < b then a else b
BIGGEST = (args) -> (INSR BIGGER) args 
SMALLEST = (args) -> (INSR SMALLER) args
LIST = (args) -> (CONS [ID]) args
LEN = (args) -> args.length
REVERSE = (args) -> if args.length > 1 then (args[i] for i in [args.length-1..0]) else args
TAIL = (args) -> if args.length > 0 then args.splice 1, args.length-1 else args
BUTLAST = (args) -> if args.length > 1 then REVERSE TAIL REVERSE args else []
AL = (args) -> CAT args
AR = (args) -> CAT args
REPEAT = (n) -> (args) -> (args for i in [0...n])
REPLICA = (n) -> (args) -> CAT (args for i in [0...n])
SUM = (args) -> if typeof args[0] is 'number' then (INSL (x,y) -> x+y) args else AA(INSL (x,y) -> x+y)(TRANS args)
SUB = (args) -> if typeof args[0] is 'number' then (INSL (x,y) -> x-y) args else AA(INSL (x,y) -> x-y)(TRANS args)
MUL = (args) -> if typeof args[0] is 'number' then (INSL (x,y) -> x*y) args else AA(INSL (x,y) -> x*y)(TRANS args)
DIV = (args) -> if typeof args[0] is 'number' then (INSL (x,y) -> x/y) args else AA(INSL (x,y) -> x/y)(TRANS args)
TRANS = (args) ->
	n = args.length; m = args[0].length; args = CAT args
	((args[j*m+i] for j in [0...n]) for i in [0...m])
VECT = (binaryop) -> (args) -> AA(binaryop) TRANS args
MYPRINT = (string,params) -> console.log string, params, "\n"
MAT = (m,n) -> (args) -> ((args[i*n+j] for j in [0...n]) for i in [0...m]) # mat
ISNUM = (n) -> (not isNaN parseFloat n) and isFinite n
ISFUN = (value) -> if typeof value is "function" then true else false

MYPRINT "ISFUN ID =",ISFUN ID

PROGRESSIVE_SUM = (args) ->
	AL [0, (INSR (x,y) -> x+y) args[0..i] for i in [0...args.length]]

#///////////////////////////////////////////////////////////////////////////////

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
clone = (obj) ->
	if not obj? or typeof obj isnt 'object'
		return obj
	newInstance = new obj.constructor()
	for key of obj
		newInstance[key] = clone obj[key]
	newInstance

#///////////////////////////////////////////////////////////////////////////////

PRECISION = 1E7
fixedPrecision = (number) ->
	int = (if number>0 then floor else ceil) number
	number = (if number>0 then ceil else floor)(PRECISION * number) / PRECISION
	if abs(number-int) <= 1.0/PRECISION then int else number

fcode = (point) -> (AA fixedPrecision) point
code = (point) -> "[#{fcode point}]"

decode = (string) -> +string  # => a number
uncode = (pointCode) -> (AA decode) pointCode.split(',')

string2numberList = (string) ->
	if string is '[]' then [] else
		regex = /[,|\[|\]]/ # regex => "[" or "," or "]"
		(AA Number) BUTLAST TAIL string.split(regex)

#///////////////////////////////////////////////////////////////////////////////

class PointSet
	
	mapcomp = (map1,map2) -> map = {}; map[k] = map2[v] for k,v of map1
	
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
			@map = 0

	update: (modify) ->
		@verts[pid] = modify (uncode pcode) for pcode,pid of @dict
		@dict = {}; (@dict[code(point)] = pid for point,pid in @verts)

	t: (indices,values) ->
		vect = (0 for k in [0..@rn])
		vect[indices[h]] = values[h] for h in [0...indices.length]
		@update (point) -> SUM([point, vect])
		@

	s: (indices,values) ->
		vect = (1 for k in [0..@rn])
		vect[indices[h]] = values[h] for h in [0...indices.length]
		@update (point) -> MUL([point, vect])
		@

#	r: (axes, angle) ->
#		@update (point) -> id([axes, angle])
#		@

#///////////////////////////////////////////////////////////////////////////////

class Topology
	
	revert = (cell) ->
		len = cell.length
		if len >1 then CAT [cell[len-1], cell[1...len-1], cell[0]] else cell
	remove_duplicates = (hasDupes) ->
		dict = {}; (dict[code(item)] = item for item in hasDupes \
			when not dict[code(revert item)]? and not dict[code(item)]?)
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
			dictos[d] = {}; dictos[d][code(cell)] = k for cell,k in skel
		dictos
	homology_maps = (dictos) ->
		if dictos.length > 0
			dim = dictos.length-1; d = 1
			homology = ([] for i in [0..dim])
			if dim > 1
				skel = dictos[1]
				for cell of skel
					simplex = string2numberList cell
					homology[1].push ([skel[cell], facet[0]] for facet in facets simplex)
				homology[1] = CAT homology[1]
				for skel in dictos[2..dim]
					d += 1;
					for cell of skel
						for facet in facets string2numberList cell
							if dictos[d-1][code(facet)]?
								key = dictos[d-1][code(facet)]
							else
								key = dictos[d-1][code(revert(facet))]
							homology[d].push [skel[cell], key]
			homology
		else []
	
	constructor: (vertices,d_cells) ->
		vertices = vertices or []
		d_cells = d_cells or []
		@dim = if d_cells.length > 0 then d_cells[0].length-1 else -1
		d_cells = ((vertices.map[k] for k in cell) for cell in d_cells)
		@dictos = mkCellDB (cell_complex d_cells)
		@homology = homology_maps @dictos
		@cells = (string2numberList cell for cell of dict for dict in @dictos)

#///////////////////////////////////////////////////////////////////////////////
	
class SimplicialComplex

	###
	simplexMatrix = (obj) -> (cell) ->
		out = (AR([obj.vertices.verts[k],1.0]) for k in cell)
	volume = (obj) -> (cell) ->  numeric.det simplexMatrix(obj)(cell)
	sign = (number) -> if number > 0 then 1 else if number isnt 0 then -1
	orientation = (obj) -> (d,d_cells) ->
		if d is obj.vertices.rn		# solid complex
			out = (sign volume(obj)(cell) for cell in d_cells)
		else				# embedded complex
			out = ("numeric.det(somethingelse)" for cell in d_cells)  # DEBUG (choose minor with det(minor != 0	))
		out
	invertOrientation = (facet) ->
		newFacet = clone facet
		[newFacet[0],newFacet[1]] = [newFacet[1],newFacet[0]]
		newFacet
	###

	constructor: (points,d_cells) ->
		points = points or []
		d_cells = d_cells or []
		@vertices = new PointSet(points)
		@faces = new Topology(@vertices,d_cells)

	t: (indices,values) -> @vertices.t(indices,values); @
	s: (indices,values) -> @vertices.s(indices,values); @

	r: (axes, angle) ->
		@vertices.r(axes, angle);
		@

		###	

	extrude: (hlist) ->
		
		coords_distribute = (x) ->
			out = CAT( AA(AR)(DISTR(e)) for e in x)
		subcomplex = (d,args) ->
		    (args[i...i+d] for i in [0..args.length-d])
		shift = (n, listoflists) -> (x+n for x in seq) for seq in listoflists
		
		cells = clone @faces.cells
		dim = clone @faces.dim
		verts = clone @vertices.verts
		lastcoords = PROGRESSIVE_SUM (AA)(abs)(hlist)
		if dim <= 0
			cells = [[],[]]
			vertices = AA(list)(lastcoords)
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
		
	boundary: () ->
		
		d = @faces.dim
		rn = @vertices.rn
		facets = @faces.cells[d-1]
		if d <= 0 then return new SimplicialComplex([], [])
		vertices = @vertices.verts  # input verts

		simplexMatrix = (cell) -> (AR([vertices[k],1.0]) for k in cell)
		volume = (cell) ->  numeric.det simplexMatrix(cell)
		orientation = (d,d_cells) ->
			if d == vertices[0].length		# solid complex
				out = (sign volume(cell) for cell in d_cells)
			else				# embedded complex
				out = ("numeric.det(somethingelse)" for cell in d_cells)  # DEBUG (choose minor with det(minor != 0	))
			out

		dictos = @faces.dictos
		hom = @faces.homology
		incidence = (0 for k in [0...facets.length])
		father = new Array(facets.length)
		for pair in hom[d]
			incidence[pair[1]] += 1
			father[pair[1]] = pair[0]
		boundary_pairs = TRANS([k,father[k]] for k in [0...facets.length] when incidence[k] is 1)
		d_faces =  (@faces.cells[d][k] for k in boundary_pairs[1])
		d1_faces =  (@faces.cells[d-1][k] for k in boundary_pairs[0])
		boundary_signs = orientation(d,d_faces)   
		for facet,k in d1_faces 
			if boundary_signs[k] > 0
				d1_faces[k] = invertOrientation(facet)
			else
				d1_faces[k] = facet
		out = new SimplicialComplex(vertices, d1_faces)
		out
	###

#///////////////////////////////////////////////////////////////////////////////

T = (indices,values) -> (obj) -> (clone obj).t(indices,values)
S = (indices,values) -> (obj) -> (clone obj).s(indices,values)

#///////////////////////////////////////////////////////////////////////////////

CENTROID = (obj) -> (face) ->
	A = (obj.vertices.verts[v]  for v in face)
	C = REPEAT(A.length)(1.0/A.length)
	point = numeric.dot(C,A)

#///////////////////////////////////////////////////////////////////////////////

EXTRUDE = (hlist) -> (obj) -> 

	coords_distribute = (x) ->
		out = CAT( AA(AR)(DISTR(e)) for e in x)
	shift = (n, listoflists) -> (x+n for x in seq) for seq in listoflists
	subcomplex = (d,args) ->
		(args[i...i+d] for i in [0..args.length-d])

	cells = clone obj.faces.cells
	dim = clone obj.faces.dim
	verts = clone obj.vertices.verts
	lastcoords = PROGRESSIVE_SUM (AA)(abs)(hlist)
	if dim <= 0
		cells = [[],[]]
		vertices = AA(list)(lastcoords)
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

#///////////////////////////////////////////////////////////////////////////////

SIMPLEXGRID = (args) ->
	hlist = args[0]
	lastcoords = PROGRESSIVE_SUM AA(abs)(hlist)
	verts = AA(LIST)(lastcoords)
	cells = ([i,i+1] for i in [0...hlist.length] when hlist[i] > 0 )
	complex = new SimplicialComplex(verts,cells)
	for hlist in args[1...args.length]
		complex = EXTRUDE(hlist)(complex)
	complex

#///////////////////////////////////////////////////////////////////////////////

FREE = (obj) ->
	d = obj.faces.dim
	simplices = (obj.vertices.verts[k] for k in cell for cell in obj.faces.cells[d])
	out = []; for simplex in simplices
		outsimplex = new SimplicialComplex(simplex,[[0..d]])
		out.push outsimplex
	out

#///////////////////////////////////////////////////////////////////////////////

EXPLODE = (args) -> (scene) ->
	face = () -> item.faces.cells[item.faces.dim][0]
	centers = (CENTROID(item)(face()) for item in scene)
	scaledCenters = (MUL([args,center]) for center in centers)
	translVectors = (SUB(pair) for pair in TRANS([scaledCenters, centers]))
	scene[k].t([0...v.length],v) for v,k in translVectors

#///////////////////////////////////////////////////////////////////////////////

SKELETON = (dim) -> (pol) ->
	verts = pol.vertices.verts
	faces_d = pol.faces.cells[dim]
	out2 = new SimplicialComplex(verts,faces_d)

#///////////////////////////////////////////////////////////////////////////////

BOUNDARY = (pol) ->
	obj = clone pol
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
		newFacet = clone facet
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

###

obj = SIMPLEXGRID [[1,-1,1,1,-1,1],[1,-1,1,1,-1,1]]
model = viewer.draw EXPLODE([1.5,1.5,1.5]) FREE EXTRUDE([1,1]) SKELETON(1) BOUNDARY obj
#model = viewer.draw COMP([EXTRUDE([1,1]), SKELETON(1), BOUNDARY]) obj

#///////////////////////////////////////////////////////////////////////////////

obj = SIMPLEXGRID [[1,-1,1,1,-1,1],[1,-1,1,1,-1,1],[1,1]]
model = viewer.draw(SKELETON(3) (obj))

#///////////////////////////////////////////////////////////////////////////////


OBJ = simplexGrid ([[1],[1],[1]]) 
OBJ1 = boundary(obj)
MODEL = viewer.draw(obj1)


OBJ = simplexGrid ([[1],[1],[1]])
OBJ = skeleton(2)(obj) ## OK

OBJ = skeleton(1)(obj) ## KO

OBJ = simplexGrid ([[1],[1]])
OBJ = skeleton(1)(obj) ## KO
MODEL = viewer.draw(obj)


