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

MYPRINT "ISFUN ID =",ISFUN ID

root.PROGRESSIVE_SUM = PROGRESSIVE_SUM = (args) ->
	AL [0, (INSR (x,y) -> x+y) args[0..i] for i in [0...args.length]]
root.SET = SET = (input) ->
	dict = {}; dict[k] = k for k in input; 
	(val for key,val of dict)

MYPRINT "SET [1,1,1,2,2,2,3,1,2,3] =",(SET [1,1,1,2,2,2,3,1,2,3]).length


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

root.PRECISION = PRECISION = 1E3
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

root.PointSet = PointSet

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
		d_cells = (cell for cell in d_cells when (SET cell).length is cell.length)
		d_cells = ((vertices.map[k] for k in cell) for cell in d_cells)
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

	t: (indices,values) -> @vertices.t(indices,values); @
	s: (indices,values) -> @vertices.s(indices,values); @

	r: (axes, angle) ->
		@vertices.r(axes, angle);
		@

root.SimplicialComplex = SimplicialComplex

#///////////////////////////////////////////////////////////////////////////////

root.T = T = (indices,values) -> (obj) -> (clone obj).t(indices,values)
root.S = S = (indices,values) -> (obj) -> (clone obj).s(indices,values)

#///////////////////////////////////////////////////////////////////////////////

root.CENTROID = CENTROID = (obj) -> (face) ->
	A = (obj.vertices.verts[v]  for v in face)
	C = REPEAT(A.length)(1.0/A.length)
	point = numeric.dot(C,A)

#///////////////////////////////////////////////////////////////////////////////

root.EXTRUDE = EXTRUDE = (hlist) -> (obj) -> 

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

root.SIMPLEXGRID = SIMPLEXGRID = (args) ->
	hlist = args[0]
	lastcoords = PROGRESSIVE_SUM AA(abs)(hlist)
	verts = AA(LIST)(lastcoords)
	cells = ([i,i+1] for i in [0...hlist.length] when hlist[i] > 0 )
	complex = new SimplicialComplex(verts,cells)
	for hlist in args[1...args.length]
		complex = EXTRUDE(hlist)(complex)
	complex

#///////////////////////////////////////////////////////////////////////////////

root.FREE = FREE = (obj) ->
	d = obj.faces.dim
	simplices = (obj.vertices.verts[k] for k in cell for cell in obj.faces.cells[d])
	out = []; for simplex in simplices
		outsimplex = new SimplicialComplex(simplex,[[0..d]])
		out.push outsimplex
	out

#///////////////////////////////////////////////////////////////////////////////

root.EXPLODE = EXPLODE = (args) -> (scene) ->
	face = () -> item.faces.cells[item.faces.dim][0]
	centers = (CENTROID(item)(face()) for item in scene)
	scaledCenters = (MUL([args,center]) for center in centers)
	translVectors = (SUB(pair) for pair in TRANS([scaledCenters, centers]))
	scene[k].t([0...v.length],v) for v,k in translVectors

#///////////////////////////////////////////////////////////////////////////////

root.SKELETON = SKELETON = (dim) -> (pol) ->
	verts = pol.vertices.verts
	faces_d = pol.faces.cells[dim]
	new SimplicialComplex(verts,faces_d)

#///////////////////////////////////////////////////////////////////////////////

root.BOUNDARY = BOUNDARY = (pol) ->
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

#root.STRUCT = STRUCT = (args) ->

#///////////////////////////////////////////////////////////////////////////////

{PI, E, log, sin, cos, tan, asin, acos, atan, atan2, ceil, floor, sqrt, exp, abs, round} = Math

s = (coords) -> (params) -> (obj) -> "TODO"
t = (coords) -> (params) -> (obj) -> "TODO"
r = (coords) -> (angle) -> (obj) -> "TODO"


idnt = (d) -> numeric.identity(d)
#MYPRINT "idnt(3) =", idnt(3)
#MYPRINT "idnt(4) =", idnt(4)
#MYPRINT "idnt(1) =", idnt(1)


cuboid = (sides) -> SIMPLEXGRID AA(LIST)(sides)
#console.log "AA(LIST)([1,2,3]) =", AA(LIST)([1,2,3])
#console.log "BOUNDARY cuboid([1,2,3])", BOUNDARY cuboid([1,2,3])


cube = (d) -> cuboid(REPEAT(d) [1])
#console.log "REPEAT(3) [1] =", REPEAT(3) [1]
#console.log "BOUNDARY cube(3)", BOUNDARY cube(3)


simplex = (d) -> 
	vertices = CAT [[(0 for k in [0...d])], idnt(d)]
	cells = [[0..d]]
	new SimplicialComplex(vertices, cells)
#console.log "CAT [[(0 for k in [0...3])], idnt(3)] =", CAT [[(0 for k in [0...3])], idnt(3)]
#console.log "cells = [[0..3]] =", cells = [[0..3]]
#console.log "BOUNDARY simplex(3)", BOUNDARY simplex(3)


polyline = (points) -> 
	cells = ([k,k+1] for k in [0...points.length-1])
	new SimplicialComplex(points,cells)
#console.log "polyline [[0,0],[1,0],[0,1],[1,1],[0,0,0]]",
#polyline [[0,0,0],[1,0,0],[0,1,1],[1,1,1],[0,0,0]]


triangle_strip = (points) ->
	cells = ([k,k+1,k+2] for k in [0...points.length-2])
	new SimplicialComplex(points,cells)
#console.log "triangle_strip [[0,0,0],[0,0,1],[1,0,0],[0,1,0],[0,0,0],[0,0,1]]",
#triangle_strip [[0,0,0],[0,0,1],[1,0,0],[0,1,0],[0,0,0],[0,0,1]]
#points = [[0,3],[1,2],[3,3],[2,2],[3,0],[2,1],[0,0],[1,1],[0,3],[1,2]]
#console.log "points",points
#console.log  "triangle_strip(points)",triangle_strip(points)
#viewer.draw triangle_strip(points)
#console.log "BOUNDARY triangle_strip(points)",BOUNDARY triangle_strip(points)
#viewer.draw BOUNDARY triangle_strip(points)
#console.log "EXTRUDE([1]) triangle_strip(points)",  EXTRUDE([1]) triangle_strip(points)
#viewer.draw EXTRUDE([1]) triangle_strip(points)
#console.log "BOUNDARY EXTRUDE([1]) triangle_strip(points)", BOUNDARY EXTRUDE([1]) triangle_strip(points)
#viewer.draw BOUNDARY EXTRUDE([1]) triangle_strip(points)
#console.log "BOUNDARY EXTRUDE([1,-1,1]) triangle_strip(points)", BOUNDARY EXTRUDE([1,-1,1]) triangle_strip(points)
#viewer.draw BOUNDARY EXTRUDE([1,-1,1]) triangle_strip(points)


trianglefan  = (points) -> 
	edges = polyline points
	center = CENTROID(edges)([0...edges.vertices.m])
	points = AR [edges.vertices.verts,[center]]
	cells = (AR [edge, [points.length-1]] for edge in edges.faces.cells[1])
	new SimplicialComplex(points,cells)
#points = ([cos(alpha),sin(alpha)] for alpha in numeric.linspace(0.0,2*Math.PI,7))
#console.log "points =",points
#points = AA(SUM) DISTR([points, [2.0,1.0]])
#console.log "translated points =",points
#console.log "trianglefan points", trianglefan points
#viewer.draw trianglefan points
#console.log "BOUNDARY trianglefan points", BOUNDARY trianglefan points
#viewer.draw BOUNDARY trianglefan points



triangle_array = (m,n,points) -> 
	out = SIMPLEXGRID [REPEAT(m)(1),REPEAT(n)(1)]
	new SimplicialComplex(CAT(points),out.faces.cells[2])

#points = [ 
#    [[0,0,0.1],[1,0,-0.1],[2,0,0.0],[3,0,0.2]], 
#    [[0,1,-0.4],[1,1,0.1],[2,1,-0.1],[3,1,0.1]], 
#    [[0,2,0.1],[1,2,0.0],[2,2,0.1],[3,2,0.1]], 
#    [[0,3,-0.2],[1,3,0.1],[2,3,-0.3],[3,3,0.1]]
#]
#console.log "triangle_array(3,3,points)", triangle_array(3,3,points)
#viewer.draw triangle_array(3,3,points)
#console.log "BOUNDARY triangle_array(3,3,points)", BOUNDARY triangle_array(3,3,points)
#viewer.draw BOUNDARY triangle_array(3,3,points)

INTERVALS = (tip) -> (n) -> SIMPLEXGRID [REPEAT(n) tip/n]

MAP = (funs) -> (pol) ->
	points = (CONS(funs) v for v in pol.vertices.verts)
	d_cells = pol.faces.cells[pol.faces.dim]
	new SimplicialComplex(points, d_cells)


circle = (radius,n=32) ->
	domain = SIMPLEXGRID [REPEAT(n) 2*PI/n]
	MAP([sin,cos])(domain).s([0,1],[radius,radius]) 
#viewer.draw circle(0.5)
#viewer.draw circle(0.5,n=4)
#MYPRINT "[REPEAT(32) 2*Math.PI/32] =",[REPEAT(32) 2*Math.PI/32]
#domain = SIMPLEXGRID [REPEAT(32) 2*PI/32]
#MYPRINT "domain", domain
#MYPRINT "MAP([sin,cos])(domain)", MAP([sin,cos])(domain)
#viewer.draw  MAP([sin,cos])(domain)
#points = AA(LIST) numeric.linspace(0,2*PI,32)
#viewer.draw  MAP([ID,cos])(polyline points)
#console.log "MAP([sin,cos])(polyline points) =", MAP([sin,cos])(polyline points)
#viewer.draw  MAP([sin,cos])(polyline points)


disk = (radius=1,n=32,m=1) ->
	domain = SIMPLEXGRID [REPEAT(n)(2*PI/n), REPEAT(m)(radius/m)]
	fx = ([u,v]) -> v*sin(u)
	fy = ([u,v]) -> v*cos(u)
	MAP( [fx, fy] )(domain)

#MYPRINT "disk(1,4,1) =", disk(1,4,1)
#viewer.draw disk(1,4,1)
#viewer.draw disk(2)

graph = (domain) -> (funs) -> MAP(funs)(domain)
#domain = SIMPLEXGRID [REPEAT(40) 4*PI/40]
#MYPRINT "domain",domain
#viewer.draw  graph(domain)([sin,cos,ID])


helix = (radius=1,pitch=1,n=24,turns=1) -> 
	domain = INTERVALS(2*PI*turns)(n*turns)
	graph( domain )( [sin, cos, ID] ).s([0,1,2],[radius,radius,pitch/(2*PI)])
#viewer.draw helix()
#viewer.draw helix(radius=0.5,pitch=1.0/4,n=32,turns=6)


	

cylsurface = (r=1, h=1, n=16, m=2) -> 
	domain = SIMPLEXGRID [REPEAT(n)(2*PI/n), REPEAT(m)(1.0/m)]
	fx = ([u,v]) -> r*cos(u)
	fy = ([u,v]) -> r*sin(u)
	fz = ([u,v]) -> h*v
	MAP( [fx, fy, fz] )( domain )

#MYPRINT "cylsurface(r=0.5, h=3, n=32, m=6) =", cylsurface(r=0.5, h=3, n=32, m=6)
#viewer.draw cylsurface(1,1,16,2)
#viewer.draw cylsurface()
#viewer.draw cylsurface(r=0.5, h=3, n=32, m=12)



cylsolid = (R=1, r=0, h=1, n=16, m=1, p=1) -> 
	domain = SIMPLEXGRID [REPEAT(n)(2*PI/n), REPEAT(m)((R-r)/m), REPEAT(p)(h/p)]
	fx = ([u,v,w]) -> v*cos(u)
	fy = ([u,v,w]) -> v*sin(u)
	fz = ([u,v,w]) -> w
	MAP( [fx, fy, fz] )( domain.t([1],[r]) )

#MYPRINT "cylsolid(R=1.25,r=1,h=1,n=16,m=1,p=1)  =",cylsolid(R=1.25,r=1,h=1,n=16,m=1,p=1) 
#viewer.draw SKELETON(1) cylsolid(R=1.25,r=1,h=1,n=16,m=1,p=1) 
#MYPRINT "cylsolid(R=1.25,r=0,h=1,n=16,m=1,p=1)  =",cylsolid(R=1.25,r=0,h=1,n=16,m=1,p=1) 
#viewer.draw SKELETON(1) cylsolid(R=1.25,r=0,h=1,n=16,m=1,p=1) 
#MYPRINT "cylsolid(R=1.25,r=1,h=1,n=16,m=1,p=1)  =",cylsolid(R=1.25,r=1,h=1,n=16,m=1,p=1) 
#viewer.draw BOUNDARY cylsolid(R=1.25,r=1,h=1,n=32,m=1,p=1) 


torus_surface = (r=1, R=3, n=12, m=8) -> 
	domain = SIMPLEXGRID [ REPEAT(n)(2*PI/n), REPEAT(m)(2*PI/m) ]
	fx = ([u,v]) -> (R + r * cos(v)) * cos(u)
	fy = ([u,v]) -> (R + r * cos(v)) * sin(u)
	fz = ([u,v]) -> r * sin(v)
	MAP( [fx, fy, fz] )( domain )

#viewer.draw torus_surface()
#viewer.draw torus_surface(r=1, R=3, n=36, m=24)



cart2torus3d = (r,R) -> (point) -> "TODO"

torus_solid = (r=1,R=3,n=8,m=16,p=1) -> 
	domain = SIMPLEXGRID [REPEAT(n)(2*PI/n), REPEAT(m)(2*PI/m), REPEAT(p)(1/p)]
	fx = ([u,v,w]) -> (R + r * w * cos(u)) * cos(v)
	fy = ([u,v,w]) -> (R + r * w * cos(u)) * sin(v)
	fz = ([u,v,w]) -> r * w * sin(u)
	MAP( [fx, fy, fz] )( domain )

#viewer.draw torus_solid()
#viewer.draw torus_solid(r=1,R=3,n=8,m=16,p=1)
viewer.draw BOUNDARY torus_solid(r=1,R=3,n=4,m=4,p=1)
viewer.draw SKELETON(1) BOUNDARY torus_solid(r=1,R=3,n=4,m=4,p=1)
viewer.draw SKELETON(0) BOUNDARY torus_solid(r=1,R=3,n=4,m=4,p=1)
#viewer.draw BOUNDARY torus_solid(r=1,R=3,n=8,m=16,p=1)
#viewer.draw SKELETON(1) BOUNDARY torus_solid(r=1,R=3,n=8,m=16,p=1)
#viewer.draw SKELETON(0) BOUNDARY torus_solid(r=1,R=3,n=8,m=16,p=1)


###
schlegel = (pol) -> (point) -> 



def schlegel(pol):
	def project(point):
		return [coord/point[-1] for coord in point[:-1]]
	verts = [project(v) for v in pol.vertices.points]
	cells = pol.cells[-2]
	return PolytopalComplex(verts,cells)



polygon = (n) -> 
	points = [[cos(alpha),sin(alpha)]
			  for alpha in (scipy.linspace(0.0, 2*pi, n+1) + (pi*n)/2)]
	return trianglefan(points)	
