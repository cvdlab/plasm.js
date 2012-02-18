###
console.log trans [ [ 0, 0 ], [ 1, 0 ], [ 0, 1 ], [ 1, 1 ] ]
console.log trans [ [ 1,2,3,4,5 ], [ 10,20,30,40,50 ], [ 100,200,300,400,500 ] ]
console.log trans [ [ cos,sin ], [ id,k ] ]
console.log trans [ [ cos,sin ], [ "id","k" ] ]
console.log (repeat 3) [0,1,2]
console.log (repeat 1) [0,1,2]
console.log (repeat 0) [0,1,2]
console.log (replica 3) [0,1,2]
console.log (replica 1) [0,1,2]
console.log (replica 0) [0,1,2]
console.log sum [1,2,3,4]  # => 10
console.log sub [1,2,3,4]  # => -8
console.log mul [1,2,3,4]  # => 24
console.log div [1,2,3,4]  # => 0.041666666666666664 == 1/mul 1,2,3,4
console.log al [0,[1,2,3,4]]
console.log al [0,[1]]
console.log al [0,[]]
console.log ar [[1,2,3,4],0]
console.log ar [[1],0]
console.log ar [[],0]
console.log butlast [10,20,30,40,50]
console.log butlast [10,20]
console.log butlast [10]
console.log butlast []
console.log tail [10,20,30,40,50]
console.log tail [10,20]
console.log tail [10]
console.log tail []
console.log reverse [0..10]
console.log reverse [0..1]
console.log reverse [0]
console.log reverse []
console.log list [1,2,3,4,5]
console.log (aa list) [1,2,3,4,5]
console.log (aa list) []
console.log (aa list) [10]
console.log "numeric.precision = 4; #{numeric.precision = 4}"
console.log "a=[[1,2,3],[40,50],[600]]; numeric.prettyPrint cat a => #{a=[[1,2,3],[40,50],[600]]; numeric.prettyPrint cat a}\n"
console.log "apply [sin, PI/2] => #{apply [sin, PI/2]}\n"
console.log "(comp2 asin, sin) PI/2  => #{(comp2 asin, sin) PI/2 }\n"
console.log "((comp [asin, sin, asin, sin, asin, sin]) PI/4) * 4 => #{((comp [asin, sin, asin, sin, asin, sin]) PI/4) * 4}\n"
console.log "(cons [sin, cos, tan]) PI/4 => #{(cons [sin, cos, tan]) PI/4}\n"
console.log "cat [[1,2,3],[4,5,6],[7,8,9]] => #{cat [[1,2,3],[4,5,6],[7,8,9]]}\n"
console.log "cat [[1,2,3],[40,50],[600]] => #{cat [[1,2,3],[40,50],[600]]}\n"
console.log "cat [] => #{cat []}\n"
console.log "cat [[1,2,3]] => #{cat [[1,2,3]]}\n"
console.log "cat [[1,2,3],[]] => #{cat [[1,2,3],[]]}\n"
console.log "cat [[],[]] => #{cat [[],[]]}\n"
console.log "id 1 => #{id 1}\n"
console.log "id cat  => #{id cat }\n"
console.log "id cat [[1,2,3],[4,5,6],[7,8,9]] => #{id cat [[1,2,3],[4,5,6],[7,8,9]]}\n"
console.log "k 1 => #{k 1}\n"
console.log "(k 1) 2 => #{(k 1) 2}\n"
console.log "(k sin) 2 => #{(k sin) 2}\n"
console.log "(aa sin) [0, PI/6, PI/4, PI/3, PI, 2*PI] => #{(aa sin) [0, PI/6, PI/4, PI/3, PI, 2*PI]}\n"
console.log "distr [cat [[1,2,3],[4,5,6],[7,8,9]], 100]  # !!!!  KO !!!! => #{distr [cat [[1,2,3],[4,5,6],[7,8,9]], 100]  # !!!!  KO !!!!}\n"
console.log "distr [cat [[1,2,3],[4,5,6],[7,8,9]], []]  # !!!!  KO !!!! => #{distr [cat [[1,2,3],[4,5,6],[7,8,9]], []]  # !!!!  KO !!!!}\n"
console.log "distl [sin, [0, PI/6, PI/4, PI/3, PI, 2*PI]] => #{distl [sin, [0, PI/6, PI/4, PI/3, PI, 2*PI]]}\n"
console.log "(aa apply) (distl [sin, [0, PI/6, PI/4, PI/3, PI, 2*PI]]) => #{(aa apply) (distl [sin, [0, PI/6, PI/4, PI/3, PI, 2*PI]])}\n"
console.log "bigger 6,100 => #{bigger 6,100}\n"
console.log "((insr bigger) [-66,7,-99,1,9,12,44,0,5,7]) => #{((insr bigger) [-66,7,-99,1,9,12,44,0,5,7])}\n"
console.log "biggest [-66,7,-99,1,9,12,44,0,5,7] => #{biggest [-66,7,-99,1,9,12,44,0,5,7]}\n"
###

###
A = [[1,2,3],[4,5,6],[7,1,9]]
Ainv = numeric.inv A
console.log  "A = \n#{numeric.prettyPrint A}"
console.log  "Ainv = \n#{numeric.prettyPrint Ainv}"
###

###
console.log "isNumber 3 =", isNumber 3.0E-5
console.log "isNumber 3 =", isNumber +3.0004
console.log "sum [[1,2,3],[10,20,30]] =>",sum [[1,2,3],[10,20,30]] 
console.log "sum [10,20,30] =>",sum [10,20,30]
###

###
typedPrint [3.1415927,-3.1415927]
typedPrint code [PI,-PI]
typedPrint code [3.0000000123456,-PI]
typedPrint code [3.0000000123456,-3.0000000123456]
typedPrint code [3.000000123456,-3.000000123456]
console.log string2numberList '[1,2]'
console.log string2numberList '[1234,2000,-22]'
console.log string2numberList '[1234]'
console.log string2numberList '[]'
console.log string2numberList '[1.234, 3.1415]'
map1 = {1:10,2:20,3:30}
map2 = {10:100,20:200,30:300}
map = mapcomp map1,map2
console.log ("map1 = #{k},#{v}" for k,v of map1)
console.log ("map2 = #{k},#{v}" for k,v of map2)
console.log ("mapcomp map1,map2 = #{k},#{v}" for k,v of map)
console.log progressive_sum [1,2,3,4,5]
console.log progressive_sum [1,2]
console.log progressive_sum [1]
console.log progressive_sum []
console.log progressive_sum (aa abs) [1,1,1,3,-6,1,-10,5]
console.log aa(mul)(distl([100,[1,2,3,4]]))
###

###
console.log string2numberList '[1,2]'
console.log string2numberList '[1234,2000,-22]'
console.log string2numberList '[1234]'
console.log string2numberList '[]'
console.log string2numberList '[1.234, 3.1415]'
console.log revert [1,2,3,4,5]
console.log revert [1,2]
console.log revert [[1,2,3,4,5]]
console.log revert [1]
console.log revert []
console.log code(revert [1,2,3])
console.log remove_duplicates [[1,2,3],[1,2,3],[3,2,1],[3,2,1],[4,5,6]]
console.log remove_duplicates [[1,2,3],[3,2,1]]
console.log remove_duplicates []
console.log rotate [1,2,3,4,5]
console.log rotate rotate [1,2,3,4,5]
console.log rotate rotate rotate [1,2,3,4,5]
console.log rotate [1]
console.log rotate [1,2]
console.log rotate []
console.log  facets [1]	
console.log  facets [1,2]	
console.log  facets [1,2,3]	
console.log  facets [1,2,3,4]	
console.log  facets [1,2,3,4,5]	
console.log skeleton [ [ 0, 1, 2 ], [ 2, 1, 3 ] ] 
console.log cell_complex [[ 0, 1, 2 ], [ 2, 1, 3 ]]
console.log mkCellDB cell_complex [[ 0, 1, 2 ], [ 2, 1, 3 ]]
console.log homology_maps mkCellDB cell_complex [[ 0, 1, 2 ], [ 2, 1, 3 ]]
###

###
console.log shift 3,[ [ 0, 1, 2, 4 ], [ 1, 2, 4, 5 ], [ 2, 4, 5, 6 ] ]
console.log "centroid(obj)([0,1,2,3]) =", centroid(obj)([0,1,2,3])
###

###

obj = new SimplicialComplex([[0,0],[1,0],[0,1],[1,1]],[[0,1,2],[2,1,3]])
obj = obj.extrude([1,1,1])
console.log  obj
model = viewer.draw(obj).color([1,0,0])

obj = simplexGrid [[1,-1,1],[1,-1,1]]
console.log  obj
#model = viewer.draw(obj).color([1,0,0])

obj = (simplexGrid repeat(2)(replica(2)([1,-1]))).extrude replica(2)([0.2,-0.2])

obj = simplexGrid [[1],[1],[1]]
#model = viewer.draw(obj)

#obj = s([0,1,2],[0.5,0.5,0.5])(obj)
#obj = t([0],[0.5])(obj)

obj = obj.t([0],[0.5]).s([0,1,2],[0.5,0.5,0.5])

model = viewer.draw(obj)
#model = model.color([1,0,0])


obj1 = new SimplicialComplex([[0, 0], [1, 0], [0, 1]], [[0, 1, 2]]);
obj2 = new SimplicialComplex([[0, 1], [1, 0], [1, 1]], [[0, 1, 2]]);

model1 = viewer.draw(obj1);
model2 = viewer.draw(obj2);

model1.color([1,0,0]).translate([1,0,0]).rotate([-PI/3, 0, 0]).add(model2)
model2.color([0,0,1]).translate([0,1,0]).rotate([0,0,PI/3])

#viewer.draw torus_solid()
#viewer.draw torus_solid(r=1,R=3,n=8,m=16,p=1)
viewer.draw BOUNDARY torus_solid(r=1,R=3,n=4,m=4,p=1)
viewer.draw SKELETON(1) BOUNDARY torus_solid(r=1,R=3,n=4,m=4,p=1)
viewer.draw SKELETON(0) BOUNDARY torus_solid(r=1,R=3,n=4,m=4,p=1)
#viewer.draw BOUNDARY torus_solid(r=1,R=3,n=8,m=16,p=1)
#viewer.draw SKELETON(1) BOUNDARY torus_solid(r=1,R=3,n=8,m=16,p=1)
#viewer.draw SKELETON(0) BOUNDARY torus_solid(r=1,R=3,n=8,m=16,p=1)
#viewer.draw torus_surface()
#viewer.draw torus_surface(r=1, R=3, n=36, m=24)
#MYPRINT "cylsolid(R=1.25,r=1,h=1,n=16,m=1,p=1)  =",cylsolid(R=1.25,r=1,h=1,n=16,m=1,p=1) 
#viewer.draw SKELETON(1) cylsolid(R=1.25,r=1,h=1,n=16,m=1,p=1) 
#MYPRINT "cylsolid(R=1.25,r=0,h=1,n=16,m=1,p=1)  =",cylsolid(R=1.25,r=0,h=1,n=16,m=1,p=1) 
#viewer.draw SKELETON(1) cylsolid(R=1.25,r=0,h=1,n=16,m=1,p=1) 
#MYPRINT "cylsolid(R=1.25,r=1,h=1,n=16,m=1,p=1)  =",cylsolid(R=1.25,r=1,h=1,n=16,m=1,p=1) 
#viewer.draw BOUNDARY cylsolid(R=1.25,r=1,h=1,n=32,m=1,p=1) 
#MYPRINT "cylsurface(r=0.5, h=3, n=32, m=6) =", cylsurface(r=0.5, h=3, n=32, m=6)
#viewer.draw cylsurface(1,1,16,2)
#viewer.draw cylsurface()
#viewer.draw cylsurface(r=0.5, h=3, n=32, m=12)
#viewer.draw helix()
#viewer.draw helix(radius=0.5,pitch=1.0/4,n=32,turns=6)
#domain = SIMPLEXGRID [REPEAT(40) 4*PI/40]
#MYPRINT "domain",domain
#viewer.draw  graph(domain)([sin,cos,ID])
#MYPRINT "disk(1,4,1) =", disk(1,4,1)
#viewer.draw disk(1,4,1)
#viewer.draw disk(2)
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
###
###
points = [ 
    [[0,0,0.1],[1,0,-0.1],[2,0,0.0],[3,0,0.2]], 
    [[0,1,-0.4],[1,1,0.1],[2,1,-0.1],[3,1,0.1]], 
    [[0,2,0.1],[1,2,0.0],[2,2,0.1],[3,2,0.1]], 
    [[0,3,-0.2],[1,3,0.1],[2,3,-0.3],[3,3,0.1]]
]
console.log "TRIANGLEARRAY(3,3,points)", TRIANGLEARRAY(3,3,points)
viewer.draw TRIANGLEARRAY(3,3,points)
console.log "BOUNDARY TRIANGLEARRAY(3,3,points)", BOUNDARY TRIANGLEARRAY(3,3,points)
viewer.draw BOUNDARY TRIANGLEARRAY(3,3,points)
###
###
#points = ([cos(alpha),sin(alpha)] for alpha in numeric.linspace(0.0,2*Math.PI,7))
#console.log "points =",points
#points = AA(SUM) DISTR([points, [2.0,1.0]])
#console.log "translated points =",points
#console.log "trianglefan points", trianglefan points
#viewer.draw trianglefan points
#console.log "BOUNDARY trianglefan points", BOUNDARY trianglefan points
#viewer.draw BOUNDARY trianglefan points
#console.log "triangle_strip [[0,0,0],[0,0,1],[1,0,0],[0,1,0],[0,0,0],[0,0,1]]",
#triangle_strip [[0,0,0],[0,0,1],[1,0,0],[0,1,0],[0,0,0],[0,0,1]]
###
###
points = [[0,3],[1,2],[3,3],[2,2],[3,0],[2,1],[0,0],[1,1],[0,3],[1,2]]
console.log "points",points
console.log  "TRIANGLESTRIP(points)",TRIANGLESTRIP(points)
viewer.draw TRIANGLESTRIP(points)
console.log "BOUNDARY TRIANGLESTRIP(points)",BOUNDARY TRIANGLESTRIP(points)
viewer.draw BOUNDARY TRIANGLESTRIP(points)
console.log "EXTRUDE([1]) TRIANGLESTRIP(points)",  EXTRUDE([1]) TRIANGLESTRIP(points)
viewer.draw EXTRUDE([1]) TRIANGLESTRIP(points)
console.log "BOUNDARY EXTRUDE([1]) TRIANGLESTRIP(points)", BOUNDARY EXTRUDE([1]) TRIANGLESTRIP(points)
viewer.draw BOUNDARY EXTRUDE([1]) TRIANGLESTRIP(points)
console.log "BOUNDARY EXTRUDE([1,-1,1]) TRIANGLESTRIP(points)", BOUNDARY EXTRUDE([1,-1,1]) TRIANGLESTRIP(points)
viewer.draw BOUNDARY EXTRUDE([1,-1,1]) TRIANGLESTRIP(points)
###
#console.log "polyline [[0,0],[1,0],[0,1],[1,1],[0,0,0]]",
#polyline [[0,0,0],[1,0,0],[0,1,1],[1,1,1],[0,0,0]]
#console.log "CAT [[(0 for k in [0...3])], idnt(3)] =", CAT [[(0 for k in [0...3])], idnt(3)]
#console.log "cells = [[0..3]] =", cells = [[0..3]]
#console.log "BOUNDARY simplex(3)", BOUNDARY simplex(3)
#console.log "REPEAT(3) [1] =", REPEAT(3) [1]
#console.log "BOUNDARY cube(3)", BOUNDARY cube(3)
#console.log "AA(LIST)([1,2,3]) =", AA(LIST)([1,2,3])
#console.log "BOUNDARY cuboid([1,2,3])", BOUNDARY cuboid([1,2,3])
#MYPRINT "idnt(3) =", idnt(3)
#MYPRINT "idnt(4) =", idnt(4)
#MYPRINT "idnt(1) =", idnt(1)

###
sum = ([a,b]) -> a+b
MYPRINT "TREE(sum) [1,2,3,4,5,6] =", TREE(sum)([1,2,3,4,5,6])
MYPRINT "TREE(sum) [1,2,3,4,5,6,7] =", TREE(sum)([1,2,3,4,5,6,7])
MYPRINT "TREE(sum) [1,2] =", TREE(sum)([1,2])
MYPRINT "TREE(sum) [1] =", TREE(sum)([1])
###
###
MYPRINT "AA(AA(LIST))([[1, 2, 3], ['a', 'b']])",AA(AA(LIST))([[1, 2, 3], ['a', 'b']])
MYPRINT "CART2 [[1, 2, 3], ['a', 'b']] =", CART2 [[1, 2, 3], ['a', 'b']] 
MYPRINT "F1([[1, 2, 3], ['a', 'b']])", F1([[1, 2, 3], ['a', 'b']])
# MYPRINT "CART([[1, 2, 3], ['a', 'b'],[10,11]]) =", CART([[1, 2, 3], ['a', 'b'],[10,11]]) # => KO
###
###
points = [[0,3],[1,2],[3,3],[2,2],[3,0],[2,1],[0,0],[1,1],[0,3],[1,2]]
console.log "points",points
console.log  "TRIANGLESTRIP(points)",TRIANGLESTRIP(points)
console.log "BOUNDARY TRIANGLESTRIP(points)",BOUNDARY TRIANGLESTRIP(points)
viewer.draw BOUNDARY TRIANGLESTRIP(points)
###
###
MYPRINT "LINSPACE2D() =", LINSPACE2D() 
viewer.draw CYLSURFACE(r=1, h=8, n=32, m=4)
MYPRINT "LINSPACE3D([1,1,1,1,1,1]) =", LINSPACE3D() 
viewer.draw LINSPACE3D()
###
###
viewer.draw BOUNDARY CYLSOLID()
viewer.draw TORUSSURFACE()
viewer.draw BOUNDARY TORUSSOLID()
viewer.draw SKELETON(0) BOUNDARY TORUSSOLID()
viewer.draw SKELETON(1) BOUNDARY TORUSSOLID()
###
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
console.log  "TRIANGLESTRIP(points)",TRIANGLESTRIP(points)
viewer.draw TRIANGLESTRIP(points)
console.log "BOUNDARY TRIANGLESTRIP(points)",BOUNDARY TRIANGLESTRIP(points)
viewer.draw BOUNDARY TRIANGLESTRIP(points)
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
PRINT "(d2h 7000237) is '461f1' =", (d2h 7000237) is "461f1"
PRINT '(h2d "461f1") is 7000237 =', (h2d "461f1") is 7000237
PRINT "d2h 28 =", d2h 28
PRINT 'h2d "S" =', h2d "S"
PRINT 'keysConcat "W",["A", "B", "0", "9", "F", "A"] =', keysConcat "W",["A", "B", "0", "9", "F", "A"]
PRINT 'keysConcat "E06HW",["A", "B", "0", "9", "F", "A"] =', keysConcat "E06HW",["A", "B", "0", "9", "F", "A"]
PRINT '(AA)(h2d)(["E06HWA", "E06HWB", "E06HW0", "E06HW9", "E06HWF", "E06HWA"]) =', (AA)(h2d)(["E06HWA", "E06HWB", "E06HW0", "E06HW9", "E06HWF", "E06HWA"])
numCodes = [846829594, 846829595, 846829584, 846829593, 846829599, 846829594]
PRINT "(d2h(code%36) for code in numCodes) =", (d2h (code % 36) for code in numCodes)
###
