console.log "ciao"

obj = simplexGrid ([[1],[1],[1]]) 

simplexMatrix = (obj) -> (cell) ->
	out = (ar([obj.vertices.verts[k],1.0]) for k in cell)
	
cell = obj.faces.cells[obj.faces.dim][0]
console.log "cell =", cell
console.log "simplexMatrix(obj)(cell) =\n",numeric.prettyPrint simplexMatrix(obj)(cell)

volume = (cell) ->  numeric.det simplexMatrix(obj)(cell)

console.log "volume(cell) =", volume cell


###
orientation = () ->
	if d == obj.rn:   # solid complex
		out = [volume(cell) for cell in cells[-1]]
	else:			   # embedded complex
		out = [linalg.det(linalg.qr(mat(simplex(cell)))[1][:,:-1])
			   for cell in cells[-1]]  # DEBUG (choose minor with det(minor != 0	))
	return out	  
invertOrientation = (facet) ->
	facet[0],facet[-1] = facet[-1],facet[0]
	return facet

boundary = (self) ->
	obj = copy.deepcopy(self)
	cells = obj.cells
	if obj.dim == -1:  return SimplicialComplex([], [])
	vertices = obj.vertices.points
	d = obj.dim
	dictos = obj.dictos
	h = obj.homology
	a = array(h[d])
	V = array( len(a)*[1] )
	J = a[:,0]
	I = a[:,1]
	A = sparse.coo_matrix((V,(I,J)), shape=(max(I)+1, max(J)+1)).tocsr()

	# make boundary orientation coherent  --------------------------
	boundary_indices = [i for i in range(A.shape[0]) if A[i].sum() == 1 ]		
	boundary_signs = orientation()   
	boundary_pairs = [(i,j) for (i,j) in a 
		if (j in boundary_indices)] 
	facetsdict = dict([[v,k] for k,v in dictos[d-1].items()])
	cellsdict = dict([[v,k] for k,v in dictos[d].items()])
	facets = [eval(facetsdict[k]) for k in boundary_indices]
	facets = [invertOrientation(eval(facetsdict[facet]))  
				if boundary_signs[face]<0 else eval(facetsdict[facet])
				for face,facet in boundary_pairs]
			
	# remapping section -----------------------------------------------
	if facets != []:
		oldinds = list(set(CAT(facets)))
		newverts = PointSet([eval(obj.vertices.ind[k]) for k in oldinds])
		newfacets = [[ newverts.dict[obj.vertices.ind[k]] 
						for k in facet] for facet in facets]
		return SimplicialComplex(newverts.points, newfacets)
	else: return SimplicialComplex([], [])
