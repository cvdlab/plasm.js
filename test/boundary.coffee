###

boundary = (pol) ->
	obj = clone pol
	d = obj.faces.dim
	facets = obj.faces.cells[d-1]
	if d <= 0 then return new SimplicialComplex([], [])
	vertices = obj.vertices.verts  # input verts
	dictos = obj.faces.dictos
	hom = obj.faces.homology
	incidence = (0 for k in [0...facets.length])
	father = new Array(facets.length)
	for pair in hom[d]
		incidence[pair[1]] += 1
		father[pair[1]] = pair[0]
	boundary_pairs = trans([k,father[k]] for k in [0...facets.length] when incidence[k] is 1)
	d_faces =  (obj.faces.cells[d][k] for k in boundary_pairs[1])
	facets =  (obj.faces.cells[d-1][k] for k in boundary_pairs[0])
	boundary_signs = orientation(obj)(d,d_faces)   
	for facet,k in facets 
		if boundary_signs[k] > 0
			facets[k] = invertOrientation(facet)
		else
			facets[k] = facet
	new SimplicialComplex(vertices,facets)


obj = simplexGrid ([[1],[1],[1]]) 
d = obj.faces.dim
cell = obj.faces.cells[d][0]
console.log "cell =", cell
console.log "simplexMatrix(obj)(cell) =\n",numeric.prettyPrint simplexMatrix(obj)(cell)
console.log "volume(obj)(cell) =", volume(obj)(cell)
boundary_signs = orientation(obj)(d, obj.faces.cells[d])
console.log "boundary_signs =", boundary_signs
console.log "invertOrientation [0..5]", invertOrientation [0..5]
obj = simplexGrid ([[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1]]) 
console.log boundary(obj)
model = viewer.draw(outline(2) boundary(obj))


	# remapping section -----------------------------------------------
	if facets != []:
		oldinds = list(set(CAT(facets)))
		newverts = PointSet([eval(obj.vertices.ind[k]) for k in oldinds])
		newfacets = [[ newverts.dict[obj.vertices.ind[k]] 
						for k in facet] for facet in facets]
		return SimplicialComplex(newverts.points, newfacets)
	else: return SimplicialComplex([], [])
###