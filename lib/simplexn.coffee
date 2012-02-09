root = exports ? this

{PI, E, log, sin, cos, tan, asin, acos, atan, atan2, ceil, floor, sqrt, exp, abs, round} = Math

root.APPLY = APPLY = (args) ->  [f, x] = args; f.apply(null,[x])

root.COMP = COMP = (flist) -> 
	comp2 = (f,g) -> (x) -> f (g x)
	flist.reduce comp2

root.CONS = CONS = (flist) -> (x) -> flist.map (f) -> f x

root.CAT = CAT = (a) -> [].concat a...

root.ID = ID = (a) -> a

root.K = K = (a) -> (b) -> a

root.AA = AA = (f) -> (list) -> list.map (e) -> f e

root.DISTR = DISTR = (args) -> [list,e] = args; [el,e] for el in list

root.DISTL = DISTL = (args) -> [e,list] = args; [e,el] for el in list

root.INSR = INSR = (f) -> (seq) -> seq.reduceRight f

root.INSL = INSL = (f) -> (seq) -> seq.reduce f

root.BIGGER = BIGGER = (a,b) -> if a > b then a else b

root.SMALLER = SMALLER = (a,b) -> if a < b then a else b

root.BIGGEST = BIGGEST = (args) -> (INSR BIGGER) args 

root.SMALLEST = SMALLEST = (args) -> (INSR SMALLER) args

root.LIST = LIST = (args) -> (CONS [ID]) args

root.LEN = LEN = (args) -> args.length

root.REVERSE = REVERSE = (args) -> if args.length > 1 then (args[i] for i in [args.length-1..0]) else args

root.TAIL = TAIL = (args) -> if args.length > 0 then args.splice 1, args.length-1 else args

root.BUTLAST = BUTLAST = (args) -> if args.length > 1 then REVERSE TAIL REVERSE args else []

root.AL = AL = (args) -> CAT args

root.AR = AR = (args) -> CAT args

root.REPEAT = REPEAT = (n) -> (args) -> (args for i in [0...n])

root.REPLICA = REPLICA = (n) -> (args) -> CAT (args for i in [0...n])

root.SUM = SUM = (args) -> if typeof args[0] is 'number' then (INSL (x,y) -> x+y) args else AA(INSL (x,y) -> x+y)(TRANS args)

root.SUB = SUB = (args) -> if typeof args[0] is 'number' then (INSL (x,y) -> x-y) args else AA(INSL (x,y) -> x-y)(TRANS args)

root.MUL = MUL = (args) -> if typeof args[0] is 'number' then (INSL (x,y) -> x*y) args else AA(INSL (x,y) -> x*y)(TRANS args)

root.DIV = DIV = (args) -> if typeof args[0] is 'number' then (INSL (x,y) -> x/y) args else AA(INSL (x,y) -> x/y)(TRANS args)

root.TRANS = TRANS = (args) ->
	n = args.length; m = args[0].length; args = CAT args
	((args[j*m+i] for j in [0...n]) for i in [0...m])

root.VECT = VECT = (binaryop) -> (args) -> AA(binaryop) TRANS args

root.MYPRINT = MYPRINT = (string,params) -> console.log string, params, "\n"

root.MAT = MAT = (m,n) -> (args) -> ((args[i*n+j] for j in [0...n]) for i in [0...m]) # mat

root.ISNUM = ISNUM = (n) -> (not isNaN parseFloat n) and isFinite n

root.ISFUN = ISFUN = (value) -> if typeof value is "function" then true else false

root.PROGRESSIVE_SUM = PROGRESSIVE_SUM = (args) ->
	AL [0, (INSR (x,y) -> x+y) args[0..i] for i in [0...args.length]]

root.SET = SET = (input) ->
	dict = {}; dict[k] = k for k in input; 
	(val for key,val of dict)

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
root.CLONE = CLONE = (obj) ->
	if not obj? or typeof obj isnt 'object'
		return obj
	newInstance = new obj.constructor()
	for key of obj
		newInstance[key] = CLONE obj[key]
	newInstance

#///////////////////////////////////////////////////////////////////////////////

root.PRECISION = PRECISION = 1E11

fixedPrecision = (number) ->
	#int = (if number>0 then floor else ceil) number
	#number = (if number>0 then ceil else floor)(PRECISION * number) / PRECISION
	int = round number
	number = round(PRECISION * number) / PRECISION
	if abs(number-int) <= 1.0/PRECISION then int else number

fcode = (point) -> (AA fixedPrecision) point
root.CODE = CODE = (point) -> "[#{fcode point}]"

decode = (string) -> +string  # => a number
uncode = (pointCode) -> (AA decode) pointCode.split(',')

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
		@dict = {}; (@dict[CODE(point)] = pid for point,pid in @verts)

	embed: (n) -> 
		@rn += n
		@update (point) -> CAT([point, REPEAT(n) 0])
		@

	t: (indices,values) ->
		MYPRINT "indices", indices
		MYPRINT "values", values
		vect = (0 for k in [0...@rn])
		MYPRINT "@rn", @rn
		MYPRINT "0:vect", [vect[0],vect[1],vect[2]]
		vect[indices[h]] = values[h] for h in [0...indices.length]
		MYPRINT "1:vect", vect
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

	embed: (n) -> @vertices.embed(n); @
	t: (indices,values) -> @vertices.t(indices,values); @
	s: (indices,values) -> @vertices.s(indices,values); @
	r: (axes, angle) -> @vertices.r(axes, angle); @


root.SimplicialComplex = SimplicialComplex

#///////////////////////////////////////////////////////////////////////////////

root.EMBED = EMBED = (n) -> (obj) -> (CLONE obj).embed(n)

root.T = T = (indices,values) -> (obj) -> (CLONE obj).t(indices,values)

root.S = S = (indices,values) -> (obj) -> (CLONE obj).s(indices,values)

root.R = R = (axes,angle) -> 
	MYPRINT "axes, angle =", [axes, angle]
	(obj) -> (CLONE obj).R(axes, angle)

root.CENTROID = CENTROID = (obj) -> (face) ->
	A = (obj.vertices.verts[v]  for v in face)
	C = REPEAT(A.length)(1.0/A.length)
	point = numeric.dot(C,A)

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

root.SIMPLEXGRID = SIMPLEXGRID = (args) ->
	hlist = args[0]
	lastcoords = PROGRESSIVE_SUM AA(abs)(hlist)
	verts = AA(LIST)(lastcoords)
	cells = ([i,i+1] for i in [0...hlist.length] when hlist[i] > 0 )
	complex = new SimplicialComplex(verts,cells)
	for hlist in args[1...args.length]
		complex = EXTRUDE(hlist)(complex)
	complex

root.FREE = FREE = (obj) ->
	d = obj.faces.dim
	simplices = (obj.vertices.verts[k] for k in cell for cell in obj.faces.cells[d])
	out = []; for SIMPLEX in simplices
		outsimplex = new SimplicialComplex(SIMPLEX,[[0..d]])
		out.push outsimplex
	out

root.EXPLODE = EXPLODE = (args) -> (scene) ->
	face = () -> item.faces.cells[item.faces.dim][0]
	centers = (CENTROID(item)(face()) for item in scene)
	scaledCenters = (MUL([args,center]) for center in centers)
	translVectors = (SUB(pair) for pair in TRANS([scaledCenters, centers]))
	scene[k].t([0...v.length],v) for v,k in translVectors

root.SKELETON = SKELETON = (dim) -> (pol) ->
	verts = pol.vertices.verts
	faces_d = pol.faces.cells[dim]
	new SimplicialComplex(verts,faces_d)


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

#root.STRUCT = STRUCT = (args) ->

#///////////////////////////////////////////////////////////////////////////////


root.IDNT = IDNT = (d) -> numeric.identity(d)

root.CUBOID = CUBOID = (sides) -> SIMPLEXGRID AA(LIST)(sides)

root.CUBE = CUBE = (d) -> CUBOID(REPEAT(d) [1])

root.SIMPLEX = SIMPLEX = (d) -> 
	vertices = CAT [[(0 for k in [0...d])], IDNT(d)]
	cells = [[0..d]]
	new SimplicialComplex(vertices, cells)

root.POLYLINE = POLYLINE = (points) -> 
	cells = ([k,k+1] for k in [0...points.length-1])
	new SimplicialComplex(points,cells)

root.TRIANGLE_STRIP = TRIANGLE_STRIP = (points) ->
	cells = ((if k%2 == 0 then [k,k+1,k+2] else [k+1,k,k+2]) for k in [0...points.length-2])
	new SimplicialComplex(points,cells)

###
points = [[0,3],[1,2],[3,3],[2,2],[3,0],[2,1],[0,0],[1,1],[0,3],[1,2]]
console.log "points",points
console.log  "TRIANGLE_STRIP(points)",TRIANGLE_STRIP(points)
console.log "BOUNDARY TRIANGLE_STRIP(points)",BOUNDARY TRIANGLE_STRIP(points)
viewer.draw BOUNDARY TRIANGLE_STRIP(points)
###

root.TRIANGLEFAN = TRIANGLEFAN = (points) -> 
	edges = POLYLINE points
	center = CENTROID(edges)([0...edges.vertices.m])
	points = AR [edges.vertices.verts,[center]]
	cells = (AR [edge, [points.length-1]] for edge in edges.faces.cells[1])
	new SimplicialComplex(points,cells)

root.TRIANGLE_ARRAY = TRIANGLE_ARRAY = (m,n,points) -> 
	out = SIMPLEXGRID [REPEAT(m)(1),REPEAT(n)(1)]
	new SimplicialComplex(CAT(points),out.faces.cells[2])

root.INTERVALS = INTERVALS = (tip) -> (n) -> SIMPLEXGRID [REPEAT(n) tip/n]

root.MAP = MAP = (funs) -> (pol) ->
	points = (CONS(funs) v for v in pol.vertices.verts)
	d_cells = pol.faces.cells[pol.faces.dim]
	new SimplicialComplex(points, d_cells)

root.CIRCLE = CIRCLE = (radius,n=32) ->
	domain = SIMPLEXGRID [REPEAT(n) 2*PI/n]
	MAP([sin,cos])(domain).s([0,1],[radius,radius]) 

root.DISK = DISK = (radius=1,n=32,m=1) ->
	domain = SIMPLEXGRID [REPEAT(n)(2*PI/n), REPEAT(m)(radius/m)]
	fx = ([u,v]) -> v*sin(u)
	fy = ([u,v]) -> v*cos(u)
	MAP( [fx, fy] )(domain)

root.GRAPH = GRAPH = (domain) -> (funs) -> MAP(funs)(domain)

root.HELIX = HELIX = (radius=1,pitch=1,n=24,turns=1) -> 
	domain = INTERVALS(2*PI*turns)(n*turns)
	GRAPH( domain )( [sin, cos, ID] ).s([0,1,2],[radius,radius,pitch/(2*PI)])

root.CYLSURFACE = CYLSURFACE = (r=1, h=1, n=16, m=2) -> 
	domain = SIMPLEXGRID [REPEAT(n)(2*PI/n), REPEAT(m)(1.0/m)]
	fx = ([u,v]) -> r*cos(u)
	fy = ([u,v]) -> r*sin(u)
	fz = ([u,v]) -> h*v
	MAP( [fx, fy, fz] )( domain )

root.CYLSOLID = CYLSOLID = (R=1, r=0, h=1, n=16, m=1, p=1) -> 
	domain = SIMPLEXGRID [REPEAT(n)(2*PI/n), REPEAT(m)((R-r)/m), REPEAT(p)(h/p)]
	fx = ([u,v,w]) -> v*cos(u)
	fy = ([u,v,w]) -> v*sin(u)
	fz = ([u,v,w]) -> w
	MAP( [fx, fy, fz] )( domain.t([1],[r]) )

root.TORUSSURFACE = TORUSSURFACE = (r=1, R=3, n=12, m=8) -> 
	domain = SIMPLEXGRID [ REPEAT(n)(2*PI/n), REPEAT(m)(2*PI/m) ]
	fx = ([u,v]) -> (R + r * cos(v)) * cos(u)
	fy = ([u,v]) -> (R + r * cos(v)) * sin(u)
	fz = ([u,v]) -> r * sin(v)
	MAP( [fx, fy, fz] )( domain )

root.TORUSSOLID = TORUSSOLID = (r=1,R=3,n=8,m=16,p=1) -> 
	domain = SIMPLEXGRID [REPEAT(n)(2*PI/n), REPEAT(m)(2*PI/m), REPEAT(p)(1/p)]
	fx = ([u,v,w]) -> (R + r * w * cos(u)) * cos(v)
	fy = ([u,v,w]) -> (R + r * w * cos(u)) * sin(v)
	fz = ([u,v,w]) -> r * w * sin(u)
	MAP( [fx, fy, fz] )( domain )


###
viewer.draw CYLSURFACE(r=1, h=1, n=64, m=2)
viewer.draw BOUNDARY CYLSURFACE(r=1, h=1, n=64, m=2)


MYPRINT "CUBOID [1,1,1]", CUBOID [1,1,1]
MYPRINT "BOUNDARY CUBOID [1,1,1]", BOUNDARY CUBOID [1,1,1]
viewer.draw BOUNDARY CUBOID [1,1,1]	
###

###
points = [[0,3],[1,2],[3,3],[2,2],[3,0],[2,1],[0,0],[1,1],[0,3],[1,2]]
console.log "points",points
console.log  "TRIANGLE_STRIP(points)",TRIANGLE_STRIP(points)
viewer.draw TRIANGLE_STRIP(points)
console.log "BOUNDARY TRIANGLE_STRIP(points)",BOUNDARY TRIANGLE_STRIP(points)
viewer.draw BOUNDARY TRIANGLE_STRIP(points)
###

###
obj = TORUSSOLID(r=1,R=3,n=18,m=36,p=1)
obj = ( BOUNDARY obj ).r( [0,2],(PI/4) )
viewer.draw obj
viewer.draw SKELETON(1) obj
viewer.draw SKELETON(0) obj
MYPRINT "obj =",obj
MYPRINT "BOUNDARY obj =",obj
###

###
root.SCHLEGEL = SCHLEGEL = (pol) -> (point) -> 



def SCHLEGEL(pol):
	def project(point):
		return [coord/point[-1] for coord in point[:-1]]
	verts = [project(v) for v in pol.vertices.points]
	cells = pol.cells[-2]
	return PolytopalComplex(verts,cells)



root.POLYGON = POLYGON = (n) -> 
	points = [[cos(alpha),sin(alpha)]
			  for alpha in (scipy.linspace(0.0, 2*pi, n+1) + (pi*n)/2)]
	return TRIANGLEFAN(points)	
