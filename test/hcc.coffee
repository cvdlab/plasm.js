# **hcc.coffee** is a prototype polytopal-to-hypercuboidal complex conversion
# in plasm.js, the *JavaScript Programming Language for Solid Modeling*
#
# Copyright (c) 2011-2012 Universit Roma Tre, CVD-lab <cvdlab@email.com>
#
# The source for [Plasm.js](https://github.com/cvd-lab/) is available on GitHub,
# and released under the MIT license.
# <HR>
	
tetra = new Graph SIMPLEX 3
cube = new Graph CUBE 3
cubes = new Graph SIMPLEXGRID [[1,-1,1],[1,-1,1],[1,-1,1]]
cubes.draw CAT (AL [k, cubes.upCells(k)] for k in [1, 12, 24, 36, 120, 160])

PRINT "tetra =", tetra
PRINT "tetra.firstNodePerLevel =", tetra.firstNodePerLevel
PRINT "tetra.uknode(14) =", tetra.uknode(14)

###
PRINT "tetra =", tetra
PRINT "tetra.firstNodePerLevel =", tetra.firstNodePerLevel
PRINT "tetra =", tetra.tether [0,3,4,5,12,13]
cubes.draw [0..150]

PRINT "test =", uknode(tetra) 0
PRINT "test =", uknode(tetra) 3
PRINT "test =", uknode(tetra) 5
PRINT "test =", uknode(tetra) 12

PRINT "cube =", cube
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
##

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
	grouping SORTED AA(REVERSE) multiTraverse(g, nrecursion, cell, h)


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