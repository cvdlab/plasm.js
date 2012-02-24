
####  3D example

# Execution initialization.
# The parameter `rn` is the dimension of the point space

rn = 3
# `points` to classify are randomly generated, and their cuboidal space is centered about the origin
# trough the translation method `t`.
points = randomPoints(rn, m=2000*Math.pow(2,rn), scale=8).t( [0...rn], REPEAT(rn)(-scale/2) )
# The `object` to draw is initialized to the empty array
object = []

# single-level partition
[Bucket,theMap] = spacePartition(points.verts)
for k in [1...Math.pow(2,rn+1)]
	key = d2h k
	if Bucket[key]? and Bucket[key].length > 0 
		object.push new SimplicialComplex(Bucket[key], AA(LIST)([0...Bucket[key].length]))
		#object.push POLYLINE(Bucket[key])
model = viewer.draw object
model[k].color(palette[k]) for k in [1...model.length]
