root = exports ? this

{PI, E, log, sin, cos, tan, asin, acos, atan, atan2, ceil, floor, sqrt, exp, abs, round} = Math
apply = (args) ->  [f, x] = args; f.apply(null,[x])
comp2 = (f,g) -> (x) -> f (g x)
comp = (flist) -> flist.reduceRight comp2
cons = (flist) -> (x) -> flist.map (f) -> f x
cat = (a) -> [].concat a...
id = (a) -> a
k = (a) -> (b) -> a
aa = (f) -> (list) -> list.map (e) -> f e
distr = (args) -> [list,e] = args; [el,e] for el in list
distl = (args) -> [e,list] = args; [e,el] for el in list
insr = (f) -> (seq) -> seq.reduceRight f
insl = (f) -> (seq) -> seq.reduce f
bigger = (a,b) -> if a > b then a else b
smaller = (a,b) -> if a < b then a else b
biggest = (args) -> args.reduce bigger #see below
biggest = (args) -> (insr bigger) args #see above
smallest = (args) -> (insr smaller) args
list = (args) -> (cons [id]) args
len = (args) -> args.length
reverse = (args) -> if args.length > 1 then (args[i] for i in [args.length-1..0]) else args
tail = (args) -> if args.length > 0 then args.splice 1, args.length-1 else args
butlast = (args) -> if args.length > 1 then reverse tail reverse args else []
al = (args) -> cat args
ar = (args) -> cat args
repeat = (n) -> (args) -> (args for i in [0...n])
replica = (n) -> (args) -> cat (args for i in [0...n])
sum = (args) -> if typeof args[0] is 'number' then (insl (x,y) -> x+y) args else aa(insl (x,y) -> x+y)(trans args)
sub = (args) -> if typeof args[0] is 'number' then (insl (x,y) -> x-y) args else aa(insl (x,y) -> x-y)(trans args)
mul = (args) -> if typeof args[0] is 'number' then (insl (x,y) -> x*y) args else aa(insl (x,y) -> x*y)(trans args)
div = (args) -> if typeof args[0] is 'number' then (insl (x,y) -> x/y) args else aa(insl (x,y) -> x/y)(trans args)
trans = (args) ->
	n = args.length; m = args[0].length; args = cat args
	((args[j*m+i] for j in [0...n]) for i in [0...m])
vect = (binaryop) -> (args) -> aa(binaryop) trans args
myprint = (string,params) -> console.log string, params, "\n"
mat = (m,n) -> (args) -> ((args[i*n+j] for j in [0...n]) for i in [0...m])
isNumber = (n) -> (not isNaN parseFloat n) and isFinite n

#///////////////////////////////////////////////////////////////////////////////

progressive_sum = (args) ->
	al [0, (insr (x,y) -> x+y) args[0..i] for i in [0...args.length]]

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

fcode = (point) -> (aa fixedPrecision) point
code = (point) -> "[#{fcode point}]"

decode = (string) -> +string  # => a number
uncode = (pointCode) -> (aa decode) pointCode.split(',')

string2numberList = (string) ->
	if string is '[]' then [] else
		regex = /[,|\[|\]]/ # regex => "[" or "," or "]"
		(aa Number) butlast tail string.split(regex)

mapcomp = (map1,map2) -> map = {}; map[k] = map2[v] for k,v of map1

#///////////////////////////////////////////////////////////////////////////////

revert = (cell) ->
	len = cell.length
	if len >1 then cat [cell[len-1], cell[1...len-1], cell[0]] else cell
remove_duplicates = (hasDupes) ->
	dict = {}; (dict[code(item)] = item for item in hasDupes \
		when not dict[code(revert item)]? and not dict[code(item)]?)
rotate = (cell) ->
	if cell.length > 1 then cat [cell[1...cell.length],[cell[0]]] else cell
Facets = (cell) -> 
	out = []; for h in [0...cell.length]
		facet = (k for k,i in cell when i isnt h)
		out.push  if h%2 is 1 then revert facet else facet
	out
skeltn = (h_cells) ->
	remove_duplicates cat (Facets cell for cell in h_cells)

#///////////////////////////////////////////////////////////////////////////////


#///////////////////////////////////////////////////////////////////////////////

class PointSet
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
		@update (point) -> sum([point, vect])
		@

	s: (indices,values) ->
		vect = (1 for k in [0..@rn])
		vect[indices[h]] = values[h] for h in [0...indices.length]
		@update (point) -> mul([point, vect])
		@

	###
	r: (axes, angle) ->
		@update (point) -> id([axes, angle])
		@
	###

PointSet

class Topology
	
	cell_complex = (d_cells) ->
		if d_cells.length > 0
			dim = d_cells[0].length-1 ? 0
			if dim isnt -1
				cells = new Array(dim)
				cells[dim] = d_cells
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
					homology[1].push ([skel[cell], facet[0]] for facet in Facets simplex)
				homology[1] = cat homology[1]
				for skel in dictos[2..dim]
					d += 1;
					for cell of skel
						for facet in Facets string2numberList cell
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
		@dictos = mkCellDB cell_complex d_cells
		@homology = homology_maps @dictos
		@cells = (string2numberList cell for cell of dict for dict in @dictos)

Topology


simplexMatrix = (obj) -> (cell) ->
	out = (ar([obj.vertices.verts[k],1.0]) for k in cell)
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
	

class SimplicialComplex
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

	extrude: (hlist) ->
		
		coords_distribute = (x) ->
			out = cat( aa(ar)(distr(e)) for e in x)
		subcomplex = (d,args) ->
		    (args[i...i+d] for i in [0..args.length-d])
		shift = (n, listoflists) -> (x+n for x in seq) for seq in listoflists
		
		cells = clone @faces.cells
		dim = clone @faces.dim
		verts = clone @vertices.verts
		lastcoords = progressive_sum (aa)(abs)(hlist)
		if dim <= 0
			cells = [[],[]]
			vertices = (aa list) lastcoords
			cells[1] = ([i,i+1] for i in [0...hlist.length+1])
		else
			simplexes = cells[dim]
			nverts = verts.length
			nsteps = lastcoords.length
			sliced_vertices = (replica nsteps) [verts]
			vertices = coords_distribute(trans([repeat(nsteps)(verts), lastcoords]))
			extruded_simplices = []
			for cell in simplexes
				vertPtrs = cat([cell, cell.map (x) -> x+nverts])
				extruded_simplices.push subcomplex(dim+2,vertPtrs)
			final_simplices = []
			for i in [0..nsteps]
				if hlist[i] > 0
					simplex_layer = shift nverts*i, cat extruded_simplices
					final_simplices.push simplex_layer
			cells = cat final_simplices
			#console.log  cells
		new SimplicialComplex(vertices, cells)
		
	boundary: () ->
		d = @faces.dim
		console.log "d =", numeric.prettyPrint(d)
		facets = @faces.cells[d-1]
		console.log "facets =", numeric.prettyPrint(facets)
		if d <= 0 then return new SimplicialComplex([], [])
		vertices = @vertices.verts  # input verts
		console.log "vertices =", numeric.prettyPrint(vertices)
		dictos = @faces.dictos
		console.log "dictos =", numeric.prettyPrint(dictos)
		hom = @faces.homology
		console.log "hom =", numeric.prettyPrint(hom)
		incidence = (0 for k in [0...facets.length])
		console.log "incidence =", numeric.prettyPrint(incidence)
		father = new Array(facets.length)
		console.log "father =", numeric.prettyPrint(father)
		for pair in hom[d]
			incidence[pair[1]] += 1
			father[pair[1]] = pair[0]
		boundary_pairs = trans([k,father[k]] for k in [0...facets.length] when incidence[k] is 1)
		console.log "boundary_pairs =", numeric.prettyPrint(boundary_pairs)
		d_faces =  (@faces.cells[d][k] for k in boundary_pairs[1])
		console.log "d_faces =", numeric.prettyPrint(d_faces)
		d1_faces =  (@faces.cells[d-1][k] for k in boundary_pairs[0])
		console.log "d1_faces =", numeric.prettyPrint(d1_faces)
		boundary_signs = orientation(@)(d,d_faces)   
		console.log "boundary_signs =", numeric.prettyPrint(boundary_signs)
		for facet,k in d1_faces 
			if boundary_signs[k] > 0
				d1_faces[k] = invertOrientation(facet)
			else
				d1_faces[k] = facet
		console.log "d1_faces =", numeric.prettyPrint(d1_faces)
		new SimplicialComplex(vertices, d1_faces)

SimplicialComplex
#///////////////////////////////////////////////////////////////////////////////


t = (indices,values) -> (obj) -> (clone obj).t(indices,values)
s = (indices,values) -> (obj) -> (clone obj).s(indices,values)


#///////////////////////////////////////////////////////////////////////////////


centroid = (obj) -> (face) ->
	A = (obj.vertices.verts[v]  for v in face)
	C = repeat(A.length)(1.0/A.length)
	point = numeric.dot(C,A)

###
obj = new SimplicialComplex [[0,0,0],[1,0,0],[0,1,0],[0,0,1]],[[0,1,2,3]]
###

#///////////////////////////////////////////////////////////////////////////////

simplexGrid = (args) ->
	hlist = args[0]
	lastcoords = progressive_sum aa(abs)(hlist)
	verts = aa(list)(lastcoords)
	cells = ([i,i+1] for i in [0...hlist.length] when hlist[i] > 0 )
	complex = new SimplicialComplex(verts,cells)
	for hlist in args[1...args.length]
		complex = complex.extrude(hlist)
	complex


#///////////////////////////////////////////////////////////////////////////////

free = (obj) ->
	d = obj.faces.dim
	simplices = (obj.vertices.verts[k] for k in cell for cell in obj.faces.cells[d])
	out = []; for simplex in simplices
		outsimplex = new SimplicialComplex(simplex,[[0..d]])
		out.push outsimplex
	out

#///////////////////////////////////////////////////////////////////////////////

explode = (args) -> (scene) ->
	face = () -> item.faces.cells[item.faces.dim][0]
	centers = (centroid(item)(face()) for item in scene)
	scaledCenters = (mul([args,center]) for center in centers)
	translVectors = (sub(pair) for pair in trans([scaledCenters, centers]))
	scene[k].t([0...v.length],v) for v,k in translVectors

#///////////////////////////////////////////////////////////////////////////////

skeleton = (dim) -> (pol) ->
	#console.log pol
	verts = pol.vertices.verts
	faces_d = pol.faces.cells[dim]
	#console.log "verts",verts
	#console.log "faces_d",faces_d
	new SimplicialComplex(verts,faces_d)


#///////////////////////////////////////////////////////////////////////////////

boundary = (pol) ->
	obj = clone pol
	d = obj.faces.dim
	facets = obj.faces.cells[d-1]
	if d <= 0 then return new SimplicialComplex([], [])
	vertices = obj.vertices.verts  # input verts
	dictos = obj.faces.dictos
	hom = obj.faces.homology
	incidence = (0 for k in [0...facets.length])
	father = new Array(facets.length)
	for pair in hom[d]
		incidence[pair[1]] += 1
		father[pair[1]] = pair[0]
	boundary_pairs = trans([k,father[k]] for k in [0...facets.length] when incidence[k] is 1)
	d_faces =  (obj.faces.cells[d][k] for k in boundary_pairs[1])
	facets =  (obj.faces.cells[d-1][k] for k in boundary_pairs[0])
	boundary_signs = orientation(obj)(d,d_faces)   
	for facet,k in facets 
		if boundary_signs[k] > 0
			facets[k] = invertOrientation(facet)
		else
			facets[k] = facet
	new SimplicialComplex(vertices,facets)

#///////////////////////////////////////////////////////////////////////////////

obj = simplexGrid ([[1],[1],[1]]) 
d = obj.faces.dim
cell = obj.faces.cells[d][0]
console.log "cell =", cell
console.log "simplexMatrix(obj)(cell) =\n",numeric.prettyPrint simplexMatrix(obj)(cell)
console.log "volume(obj)(cell) =", volume(obj)(cell)
boundary_signs = orientation(obj)(d, obj.faces.cells[d])
console.log "boundary_signs =", boundary_signs
console.log "invertOrientation [0..5]", invertOrientation [0..5]
obj = simplexGrid ([[1,-1,1,1,-1,1],[1,-1,1,1,-1,1],[1,1]]) 
console.log boundary(obj)
model = viewer.draw(skeleton(1) obj.boundary())


###

obj = simplexGrid ([[1],[1],[1]]) 
console.log "typeof obj =",typeof obj
console.log "obj =", obj
obj1 = boundary(obj)
console.log "typeof obj1 =",typeof obj1
model = viewer.draw(obj1)


obj = simplexGrid ([[1],[1],[1]])
obj = skeleton(2)(obj) ## OK

obj = skeleton(1)(obj) ## KO

obj = simplexGrid ([[1],[1]])
obj = skeleton(1)(obj) ## KO
console.log "outverts",obj.vertices.verts
console.log "outfaces",obj.faces.cells[obj.faces.dim]
model = viewer.draw(obj)


