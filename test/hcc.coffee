# **hcc.coffee** is a prototype polytopal-to-hypercuboidal complex conversion
# in plasm.js, the *JavaScript Programming Language for Solid Modeling*
#
# Copyright (c) 2011-2012 Universit Roma Tre, CVD-lab <cvdlab@email.com>
#
# The source for [Plasm.js](https://github.com/cvd-lab/) is available on GitHub,
# and released under the MIT license.
# <HR>

class Graph extends SimplicialComplex
	constructor: (object) -> 
		@object = object
		@nodes = mknodes object
		[@up, @down] = mkarcs  object
		@firstNodePerLevel = (@nodes[k][0] for k in [0..object.faces.dim])
		
	cellsPerLevel: (level) -> 
		@nodes[level]
	
	downCells: (node) -> 
		[k,cell] = @uknode node
		(@nodes[k-1][h] for h in @down[k][cell])
		
	upCells: (node) -> 
		[k,cell] = @uknode node
		(@nodes[k+1][h] for h in @up[k][cell])
	
	uknode: (node) -> 
		k = 0
		while @firstNodePerLevel[k] <= node
			k += 1
		[k-1, node - @firstNodePerLevel[k-1]]
		
	mknodes = (object) ->
		counter = 0
		nodes = ([[] for h in [0...object.faces.cells[k].length]] for k in [0...object.faces.cells.length])
		add1 = (n) -> n+1
		for k_cells,k in object.faces.cells
			for cells,h in k_cells
				nodes[k][h] = counter
				counter = add1 counter
		nodes
	
	mkarcs = (object) -> 
		d = object.faces.dim
		up = ([] for k in [0..d])
		down = ([] for k in [0..d])
		for k in [0..d]
			nodes = object.faces.cells[k].length
			up[k] = ([] for h in [0...nodes])
			down[k] = ([] for h in [0...nodes])
		for k in [1..d]
			for pair in object.faces.homology[k]
				up[k-1][pair[1]].push pair[0]
				down[k][pair[0]].push pair[1]
		[up,down]
	

tetra = new Graph SIMPLEX 3
cube = new Graph CUBE 3


PRINT "tetra =", tetra
PRINT "cube =", cube
PRINT "cube.firstNodePerLevel =", cube.firstNodePerLevel
PRINT "cube.nodes =", cube.nodes
PRINT "cube.up =", cube.up
PRINT "cube.down =", cube.down
PRINT "cube.cellsPerLevel(0) =", cube.cellsPerLevel(0)
PRINT "cube.cellsPerLevel(1) =", cube.cellsPerLevel(1)
PRINT "cube.cellsPerLevel(3) =", cube.cellsPerLevel(3)
PRINT "cube.upCells(0) =", cube.upCells(0)
PRINT "cube.upCells(1) =", cube.upCells(1)
PRINT "cube.upCells(2) =", cube.upCells(2)
PRINT "cube.upCells(3) =", cube.upCells(3)
PRINT "cube.upCells(7) =", cube.upCells(7)
PRINT "cube.downCells(14) =", cube.downCells(14)
PRINT "cube.downCells(7) =", cube.downCells(7)


###

CELLSPERLEVEL = (g) -> (h) ->
	g.faces.dictos[h]


DOWNCELLS = (g) -> (cell) ->
	PRINT "cell =",[typeof cell,cell]
	##
	it=g.goDw(cell);ret=[]
	while not it.end()
		ret += [it.getNode()];it.goForward()
	##
	ret

UPCELLS = (g) -> (cell) ->
	PRINT "cell =",[typeof cell,cell]
	##
	it=g.goUp(cell);ret=[]
	while not it.end()
		ret += [it.getNode()];it.goForward()
	##
	ret


grouping = (tuples) ->
	[out, n] = [[], tuples.length]
	groups = [[tuples[0]]]
	[first, last] = [FIRST tuples[0], LAST tuples[0]]
	for k in [1...tuples.length]
		if [FIRST tuples[k], LAST tuples[k]] == [first,last]
			(LAST groups).push tuples[k]
		else
			groups.push [tuples[k]]
			[first, last] = [FIRST tuples[k], LAST tuples[k]]
	groups

sorted = (list) ->
	numerically = (a,b) -> a-b
	list.sort numerically

DOWNTRAVERSE = (g, nrecursion, cell, h,up,down) ->
	PRINT "g, nrecursion, cell, h,up,down =", [g, nrecursion, cell, h,up,down]
	multiTraverse = (g, nrecursion, cell,h) ->
		if nrecursion == 0 then return [[cell]]
		PRINT "nrecursion =", nrecursion
		ret = []
		PRINT "down[h][cell] =", down[h][cell]
		for Down in down[h][cell] 
			ret.push ([cell] + L for L in multiTraverse(g, nrecursion-1, h-1, Down))
		CAT ret
	grouping sorted AA(REVERSE) multiTraverse(g, nrecursion, cell, h)


# The input SimplicialComplex is called `g`.
hccmesh = (g) ->
	
	# Get the intrinsic dimension of the input topology mesh
	d = g.faces.dim
	[up,down] = MKUPDOWN (g)
	# create the 0-layer of HCC
	faces = (face for face in k_faces for k_faces in g.faces.cells)
	verts = CAT (CENTROID(g)(face) for face in k_faces for k_faces in g.faces.cells)
	cells = AA(LIST) [0...verts.length]
	g1 = new SimplicialComplex verts,cells
	model = viewer.draw g1
	# create higher level layers of HCC
	for k in [1...d]
		# create Nk and Ak
		for h in [k...d+1]
			for root of CELLSPERLEVEL(g)(h)
				root = g.faces.dictos[h][root]
				# forward search in g for the isomorphic subgraphs
				subgraphs = DOWNTRAVERSE(g,k,root,h,up,down)
				PRINT "k,h,subgraphs =", [k,h,subgraphs]
				
				
				
				# backtrack upon g1: looking for (k-1)-faces of each newnode
				faces = [UPTRAVERSE(sg,k) for sg in subgraphs]
				# build the k-layer of HCC
				for face in faces:
					newnode = g1.addNode(k)
					for node in face:
						g1.addArch(node,newnode)							
	# create the last layer of HCC
	for root in CELLSPERLEVEL(g)(d):
		subgraphs = DOWNTRAVERSE(g,d,root)
		facets = [UPTRAVERSE(sg,d) for sg in subgraphs]
		vertices = [list(set(CAT(sg))) for sg in subgraphs]
		# build the d-layer of HCC
		for facet,verts in zip(facets,vertices):
			newnode = g1.addNode(d)
			for node in facet:
				g1.addArch(node,newnode)
			for vert in verts:
				g1.addArch(newnode,vert)																
	# return the output HCC graph
	return g1


object = SIMPLEX 3
#model = viewer.draw object
hccmesh object