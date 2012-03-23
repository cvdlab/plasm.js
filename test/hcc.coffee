# **hcc.coffee** is a prototype polytopal-to-hypercuboidal complex conversion
# in plasm.js, the *JavaScript Programming Language for Solid Modeling*
#
# Copyright (c) 2011-2012 Universit Roma Tre, CVD-lab <cvdlab@email.com>
#
# The source for [Plasm.js](https://github.com/cvd-lab/) is available on GitHub,
# and released under the MIT license.
# <HR>

###
tetra = new Graph SIMPLEX 3
cube = new Graph CUBE 3
cubes = new Graph SIMPLEXGRID [[1,-1,1],[1,-1,1],[1,-1,1]]
#cubes.draw CAT (AL [k, cubes.upCells(k)] for k in [1, 12, 24, 36, 120, 160])
tetra.draw [0...14]
PRINT "tetra =", tetra
PRINT "tetra.firstNodePerLevel =", tetra.firstNodePerLevel
PRINT "tetra.uknode(14) =", tetra.uknode(14)
###

root = exports ? this


GETINTERSECTION = (G) -> (from_cells) ->
	result = []
	num = from_cells.length
	reached = new Object
	for k in from_cells
		[level,h] = G.uknode(k)
		for node in G.up[level][h]
			if reached[node]?
				reached[node] += 1
			else
				reached[node] = 1
	(+node for node,val of reached when val is num)


CELLSPERLEVEL = (g) -> (h) ->
	g.faces.dictos[h]


grouping = (tuples) ->
	LAST = (array) -> array[String (array.length-1)]
	n = tuples.length
	m = tuples[0].length-1
	groups = [[tuples[0]]]
	h = 0
	[first, last] = [tuples[0][0], tuples[0][m]]
	for k in [1...n]
		if (tuples[k][0] == first) and (tuples[k][m] == last)
			(groups[h]).push tuples[k]
		else
			groups.push [tuples[k]]
			h += 1
			[first, last] = [tuples[k][0], tuples[k][m]]
	groups

SORTED = (arrayOfArray, order=true) ->
	arrayOfArray.sort if order then (a,b) -> a[0]-b[0] else (a,b) -> b[0]-a[0]
		
DOWNTRAVERSE = (g, nrecursion, cell) ->
	multiTraverse = (g, nrecursion, cell) ->
		if nrecursion == 0 then return [[cell]]
		ret = []
		for Down in g.downCells(cell)
			ret.push (AL [cell, L] for L in multiTraverse(g, nrecursion-1, Down))
		CAT ret
	grouping SORTED AA(REVERSE) multiTraverse(g, nrecursion, cell)

UPTRAVERSE = (g1) -> (subgraph,k) ->
	if k == 1
		return CAT subgraph
	else 
		#return SET CAT AA(COMP  REPLICA(k-1)([CAT, getfathers(g1)]) ) subgraph
		out = []
		for h in [1..k-1]
			out.push SET CAT AA(getfathers(g1,h)) subgraph
		CAT out

getfathers = (g1,h) -> (tuple) ->
	rel2abs = (level) -> (node) -> g1.nodes[level][node]
	out = (GETINTERSECTION(g1) [tuple[i],tuple[i+1]] for i in [0...tuple.length-1])
	out = AA(rel2abs(h)) out
	out


	
	
# The input SimplicialComplex is called `mesh`.
hccmesh = (mesh) ->
	
	# Compute the Hasse graph `g` of the input `mesh`
	g = new Graph mesh
	# Get the intrinsic dimension of the input topology mesh
	d = g.object.faces.dim
	[up, down] = [g.up, g.down]	
	# create the 0-layer of HCC
	faces = (face for face in k_faces for k_faces in g.object.faces.cells)
	newverts = CAT (CENTROID(g.object)(face) for face in k_faces for k_faces in g.object.faces.cells)
	cells = AA(LIST) [0...newverts.length]
	gg = new SimplicialComplex newverts,cells
	model = viewer.draw gg
	g1 = new Graph gg
	##
	# create higher level layers of HCC
	for k in [1...d] # for k in [1...d]
		g1.firstNodePerLevel.push g1.maxnode
		g1.nodes.push []
		g1.up.push []
		g1.down.push []
		# create Nk and Ak
		for h in [k...d+1]
			for root in g.cellsPerLevel(h)
				# forward search in g for the isomorphic subgraphs
				subgraphs = DOWNTRAVERSE(g,k,root)
				# backtrack upon g1: looking for (k-1)-faces of each newnode
				faces = (UPTRAVERSE(g1)(sg,k) for sg in subgraphs)
				# build the k-layer of HCC
				for face in faces
					newnode = g1.addNode(k)
					for node in face
						g1.addArc(+node,newnode)
		cells = CAT (g1.cellByVerts n for n in g1.cellsPerLevel(k))  
		gg = new SimplicialComplex newverts,cells
		model = viewer.draw gg
		#PRINT "gg =", gg
		#g1 = new Graph gg
	# create the last layer of HCC
	for root in g.cellsPerLevel(d)
		subgraphs = DOWNTRAVERSE(g,d,root)
		facets = (UPTRAVERSE(g1)(sg,d) for sg in subgraphs)
		vertices = (SET CAT sg for sg in subgraphs)
		# build the d-layer of HCC
		for pair in TRANS [facets,vertices]
			[facet,verts] = pair
			newnode = g1.addNode(d)
			for node in facet
				g1.addArc(node,newnode)
			for vert in verts
				g1.addArc(newnode,vert)																
	# return the output HCC graph
	PRINT "g1.cellsPerLevel(d) =", g1.cellsPerLevel(d)
	cells = []
	for n in g1.cellsPerLevel(d)
		[k,h] = g1.uknode n
		cells.push g1.up[k][h]
	verts = g1.object.vertices.verts
	gg = new SimplicialComplex verts,cells
	return g1

hccgraph2scomplex = (g) ->
	quad2verts = (quad) ->
		[k,h] = g.uknode(quad)
		SET CAT (vert for vert in g.down[1][edge] for edge in g.down[2][h])
	(quad2verts(quad) for quad in g.cellsPerLevel(2))

	

##
object = SIMPLEXGRID [[1],[1],[1]]
PRINT "object =", object

verts = object.vertices.verts
PRINT "verts =", verts
cells = object.faces.cells[3]
PRINT "cells =", cells

graph = new Graph object
PRINT "graph =", graph

###

PRINT "object =", object
#model = viewer.draw object
g = hccmesh object
PRINT "g =", g


vertices = hccgraph2scomplex(g)
PRINT "vertices =", vertices
