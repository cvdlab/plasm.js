{PI, E, log, sin, cos, tan, asin, acos, atan, atan2, ceil, floor, sqrt, exp, abs, round} = Math

s = (coords) -> (params) -> (obj) -> "TODO"

t = (coords) -> (params) -> (obj) -> "TODO"

r = (coords) -> (angle) -> (obj) -> "TODO"

idnt = (d) -> numeric.identity(d)

MYPRINT "idnt(3) =", idnt(3)


cuboid = (sides) -> SIMPLEXGRID AA(LIST)(sides)

console.log "AA(LIST)([1,2,3]) =", AA(LIST)([1,2,3])
console.log "BOUNDARY cuboid([1,2,3])", BOUNDARY cuboid([1,2,3])

cube = (d) -> cuboid(REPEAT(d) [1])

console.log "REPEAT(3) [1] =", REPEAT(3) [1]
console.log "BOUNDARY cube(3)", BOUNDARY cube(3)

simplex = (d) -> 
	vertices = CAT [[(0 for k in [0...d])], idnt(d)]
	cells = [[0..d]]
	new SimplicialComplex(vertices, cells)

console.log "CAT [[(0 for k in [0...3])], idnt(3)] =", CAT [[(0 for k in [0...3])], idnt(3)]
console.log "cells = [[0..3]] =", cells = [[0..3]]
console.log "BOUNDARY simplex(3)", BOUNDARY simplex(3)

polyline = (points) -> 
	cells = ([k,k+1] for k in [0...points.length-1])
	new SimplicialComplex(points,cells)

console.log "polyline [[0,0],[1,0],[0,1],[1,1],[0,0,0]]",
polyline [[0,0,0],[1,0,0],[0,1,1],[1,1,1],[0,0,0]]


triangle_strip = (points) ->
	cells = ([k,k+1,k+2] for k in [0...points.length-2])
	new SimplicialComplex(points,cells)

console.log "triangle_strip [[0,0,0],[0,0,1],[1,0,0],[0,1,0],[0,0,0],[0,0,1]]",
triangle_strip [[0,0,0],[0,0,1],[1,0,0],[0,1,0],[0,0,0],[0,0,1]]

points = [[0,3],[1,2],[3,3],[2,2],[3,0],[2,1],[0,0],[1,1],[0,3],[1,2]]
console.log "points",points
console.log  "triangle_strip(points)",triangle_strip(points)
#viewer.draw triangle_strip(points)
console.log "BOUNDARY triangle_strip(points)",BOUNDARY triangle_strip(points)
#viewer.draw BOUNDARY triangle_strip(points)
console.log "EXTRUDE([1]) triangle_strip(points)",  EXTRUDE([1]) triangle_strip(points)
#viewer.draw EXTRUDE([1]) triangle_strip(points)
console.log "BOUNDARY EXTRUDE([1]) triangle_strip(points)", BOUNDARY EXTRUDE([1]) triangle_strip(points)
#viewer.draw BOUNDARY EXTRUDE([1]) triangle_strip(points)
console.log "BOUNDARY EXTRUDE([1,-1,1]) triangle_strip(points)", BOUNDARY EXTRUDE([1,-1,1]) triangle_strip(points)
#viewer.draw BOUNDARY EXTRUDE([1,-1,1]) triangle_strip(points)


trianglefan  = (points) -> 
	edges = polyline points
	center = CENTROID(edges)([0...edges.vertices.m])
	points = AR [edges.vertices.verts,[center]]
	cells = (AR [edge, [points.length-1]] for edge in edges.faces.cells[1])
	new SimplicialComplex(points,cells)


points = ([cos(alpha),sin(alpha)] for alpha in numeric.linspace(0.0,2*Math.PI,7))
console.log "points =",points
points = AA(SUM) DISTR([points, [2.0,1.0]])
console.log "translated points =",points
console.log "trianglefan points", trianglefan points
#viewer.draw trianglefan points
console.log "BOUNDARY trianglefan points", BOUNDARY trianglefan points
viewer.draw BOUNDARY trianglefan points


triangle_array = (m,n,points) -> "TODO"

###

cart2cyl2d = (point) -> "TODO"

cylsurface = (r=1,h=1,n=16,m=2) -> "TODO"

cart2cyl3d = (point) -> "TODO"

cylsolid = (r=1,h=1,n=16,m=1,p=1) -> "TODO"

cart2torus2d = (r,R) -> (point) -> "TODO"

torus_surface = (r=1,R=3,n=12,m=8) -> "TODO"

cart2torus3d = (r,R) -> (point) -> "TODO"

torus_solid = (r=1,R=3,n=8,m=16,p=1) -> "TODO"

schlegel = (pol) -> (point) -> "TODO"

intervals = (tip) -> (n) -> "TODO"

graph = (domain) -> (funs) -> (point) -> "TODO"

circumpherence = (r,nsides=24) -> "TODO"

helix = (radius=1,pitch=1,n=24,turns=1) -> "TODO"

polygon = (n) -> 
	points = [[cos(alpha),sin(alpha)]
			  for alpha in (scipy.linspace(0.0, 2*pi, n+1) + (pi*n)/2)]
	return trianglefan(points)	

circle2d = (n=32) -> polygon(n)
