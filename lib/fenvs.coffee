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
	fx = ([u,v]) -> cos(u)
	fy = ([u,v]) -> sin(u)
	fz = ([u,v]) -> v
	MAP( [fx, fy, fz] )( domain ).s([0,1,2],[r,r,h])

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
