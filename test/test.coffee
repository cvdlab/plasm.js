# To make the qualified symbols visible to the root object (typically Window)
root = exports ? this

#object = SIMPLEXGRID REPEAT(3) REPEAT(10)(1)
#root.g = g = hccmesh object

root.g = g = new Graph TORUSSOLID(r=1,R=3,n=8,m=16,p=1)

viewer.drawGraph(g)
