# **convex.coffee** is
# a prototype geometric kernel, based on polytopal complexes, for plasm.js, 
# the *JavaScript Programming Language for Solid Modeling*
#
# Copyright (c) 2011-2012 Università Roma Tre, CVD-lab <cvdlab@email.com>
#
# The source for [Plasm.js](https://github.com/cvd-lab/) is available on GitHub,
# and released under the MIT license.
# <HR>

# To make the qualified symbols visible to the root object (typically Window)
root = exports ? this

Array::unique = ->
	output = {}
	output[@[key]] = @[key] for key in [0...@length]
	value for key, value of output

#////////////////////////////////////////////////////////////////////////////////
#  Compressed matrix operations -------------------------------------------------
#////////////////////////////////////////////////////////////////////////////////

root.ZEROS = ZEROS = (m,n) -> ((0 for j in [0...n]) for i in [0...m])

root.SORTED = SORTED = (arrayOfArray, order=true) ->
	arrayOfArray.sort if order then (a,b) -> a[0]-b[0] else (a,b) -> b[0]-a[0]

root.BinMat = BinMat
	
class BinMat
	# Transformation from *compressed binary matrix* to *binary matrix*.
	# Return a (m x n) *binary matrix*.
	constructor: (mat) ->
		@m = mat.length
		@n = (Math.max (CAT mat)...) + 1
		@mat = ZEROS(@m, @n)
		for row,k in mat
			for val in mat[k]
				@mat[k][val] = 1


root.coo2mat = coo2mat = (sparsemat) ->
	PRINT "sparsemat =", sparsemat
	m = sparsemat.m
	n = sparsemat.n
	mat = ZEROS(m, n)
	for [row,col,val] in sparsemat.rcmat
		mat[row][col] = val
	mat


root.triples2SparseMat = triples2SparseMat = (triples) ->
	C = new SparseMat([[]])
	C.m = LAST(triples)[0] + 1
	columns = (triple[1] for triple in triples)
	C.n = Math.max(columns...) + 1
	C.rcmat = triples
	C

root.SparseMat = SparseMat

class SparseMat
	# Transformation from *compressed binary matrix* to *row compressed matrix*.
	# Return a list of *triples* '[row,col,value]' sorted by *row*.
	constructor: (mat) ->
		@m = mat.length
		@n = (Math.max (CAT mat)...) + 1
		@rcmat = []
		for row,k in mat
			for col in row
				@rcmat.push [k,col, 1]

	sparse2mat: () ->
		mat = ZEROS(@m, @n)
		for [row,col,val] in @rcmat
			mat[row][col] = val
		mat

	T:  ->
		# Transpose a row compressed matrix (triples).
		# Return a row compressed matrix. 
		swap = ([a,b,c]) -> [b,a,c]
		C = new SparseMat([[]])
		C.rcmat = @rcmat
		[C.m, C.n] = [@n, @m]
		C.rcmat = SORTED AA(swap) C.rcmat
		C

	rcmatByRow = (triples) -> 
		out = ([] for k in [0..(LAST triples)[0]])
		for triple in triples
			out[triple[0]].push triple[1..2]
		out
		

	PROD: (sparsemat) ->			
		matrix = rcmatByRow(sparsemat.rcmat)
		triples = ([ pair[0][0], pair[1][0], pair[0][2]*pair[1][1] ] \
			for pair in DISTL([triple, matrix[triple[1]]]) for triple in @rcmat)
		triples = (CAT triples).sort()
		out = []; 
		k=0; 
		out[0] = triples[0]
		for item in triples[1..]
			if out[k][0] == item[0] and out[k][1] == item[1]
				out[k][2] += item[2]
			else
				out.push item
				k += 1
		C = new SparseMat([[]])
		C.rcmat = out
		C.m = @.m
		C.n = sparsemat.n
		C

#//////////////////////////////////////////////////////////////////////////
# -- Generation of the whole complex topology -----------------------------
#//////////////////////////////////////////////////////////////////////////


root.cells = cells = [
	[0,1,3],
	[1,3,4],
	[1,2,4],
	[2,4,5]]

root.V = V = [
	[0,0],
	[1,0],
	[2,0],
	[0,1],
	[1,1],
	[2,1]]

root.cells = cells = [
	[0,1,2,4],
	[1,2,3,5],
	[1,2,4,5],
	[2,3,5,6],
	[2,4,5,6],
	[3,5,6,7]]

root.V = V = [
	[0,0,0],
	[1,0,0],
	[0,1,0],
	[1,1,0],
	[0,0,1],
	[1,0,1],
	[0,1,1],
	[1,1,1]]

root.normalize = normalize = (chain) ->  
	theChain = CLONE chain
	AA(AL) (DISTL [1,theChain])
	
root.denormalize = denormalize = (chain) -> 
	theChain = CLONE chain
	AA(TAIL) theChain 

#PRINT "normalize V =", JSON.stringify normalize V
#PRINT "denormalize V =", JSON.stringify denormalize normalize V


root.cmFacets = cmFacets = (faces) ->
	# Generation of the (d-1)-skeleton of a d-complex.
	# Input the compressed binary matrix of the d-complex.
	# Output the compressed binary matrix of the (d-1)-skeleton.
	theRange = [0...faces[0].length]
	storage = []
	for cell in faces
		for h in theRange
			facet = []
			for vert,k in cell
				if k != h
					facet.push vert
			storage.push facet
	storage = storage.unique()

#PRINT "cmFacets =", JSON.stringify cmFacets cells


root.characteristicMaps = characteristicMaps = (cells) ->
	# Generation of all the characterstic maps of a d-complex.
	# Input the compressed binary matrix of d-cells.
	# Output the list of row compressed matrices (triples) of
	# k-skeletons (0 ≤ k ≤ d).
	d = cells[0].length - 1
	high = cells
	out = [high]
	for dim in [d...0] by -1
		low = cmFacets high
		out.push low
		high = low
	out

#PRINT "characteristicMaps =", JSON.stringify characteristicMaps cells



root.cmFilter = cmFilter = (In,Out) ->
	(sparsemat) ->
		if In <= Out 
			sparsemat
		else 
			triples = []
			for item in sparsemat.rcmat
				if item[2] == In
					triples. push [item[0],item[1],Out] 
			sparsemat.rcmat = triples
			sparsemat


root.chainComplex = chainComplex = (cells) ->
	# To compute the whole chain of k-boundary operators.
	# Input the compressed binary matrix of the d-skeleton.
	# Return a list of row compressed boundary matrices,
	# starting from k = d (down to k = 1).
	d = cells[0].length - 1
	chains = characteristicMaps(cells)
	cmats = (new SparseMat(chains[k])  for k in [d..0] by -1)
	#out = ((cmFilter(k,1) cmat[k-1].PROD(cmat[k].T()))  for k in [d...0] by -1)
	out = []
	for cmat,k in cmats[0...cmats.length-1]
		boundary = cmats[d-k-1]
		coboundary = cmats[d-k].T()
		mat = boundary.PROD(coboundary)
		operator = cmFilter(d-k,1) mat
		out.push operator
	out

#PRINT "chainComplex =", JSON.stringify chainComplex cells


root.cochainComplex = cochainComplex = (cells) ->
	# To compute the whole chain of k-coboundary operators.
	# Input the compressed binary matrix of the d-skeleton.
	# Return a list of row compressed coboundary matrices,
	# starting from k = 0 (up to k = d-1).
	d = cells[0].length - 1
	chains = characteristicMaps(cells)
	cmats = (new SparseMat(chains[k])  for k in [d..0] by -1)
	#return [cmFilter(k+1,1)(cmProd(chains[k+1],cmTrans(chains[k]))) for k in range(0,d)]
	out = []
	for cmat,k in cmats[0...cmats.length-1]
		boundary = cmats[k+1]
		coboundary = cmats[k].T()
		mat = boundary.PROD(coboundary)
		operator = cmFilter(k+1,1) mat
		out.push operator
	out

#PRINT "cochainComplex =", JSON.stringify cochainComplex cells


root.intrinsicSigns = intrinsicSigns = (chain) ->
	(verts) ->
		# To compute the intrinsic signs of the chain.
		simplices = CAT (AA(normalize) [verts[h] for h in cell] for cell in chain)
		out = (Math.round numeric.det simplex for simplex in simplices)

#PRINT "intrinsicSigns =", JSON.stringify intrinsicSigns(cells) V


root.signedBoundary = signedBoundary = (cells) ->
	(verts) ->
		#-- computation of simplicial complex in compressed binary form
		d = cells[0].length - 1
		facets = cmFacets cells
		simplices = [cells, facets]
		#-- computation of unsigned chain complex (row compressed form)
		chains = [new SparseMat(facets), new SparseMat(cells)] 
		boundary = cmFilter(d,1) chains[0].PROD(chains[1].T())

		signs = intrinsicSigns(cells)(verts)
		for triple in boundary.rcmat
			#-- foreach unit term in d-boundary compute the sign
			simplexPair = [simplices[0][triple[1]], simplices[1][triple[0]]]
			#missingTerm = SET(simplexPair[0]).difference(simplexPair[1]).pop()
			for x,k in simplexPair[0]
				if (x not in simplexPair[1])
					missingTerm = x
					missingTermIndex = k
			intrinsicSign = signs[triple[1]]
			relativeSign = if missingTermIndex % 2 == 0 then 1 else -1
			triple[2] = intrinsicSign * relativeSign
		boundary

#PRINT "signedBoundary =", JSON.stringify signedBoundary(cells) V


root.cmBoundary = cmBoundary = (rcmat) ->
	# to fully rewrite: ackward !!
	test = (k) ->
		if rcmat[k-1][0] != rcmat[k][0] != rcmat[k+1][0] then return true
		else return false
	out = []
	if rcmat[0][0] != rcmat[1][0] 
		out.push rcmat[0]
	for k in [1...rcmat.length-1]
		if test(k)
			out.push rcmat[k] 
	if LAST(rcmat)[0] != LAST(out)[0] 
		out.push LAST(rcmat)
	return out

#PRINT "cmBoundary =", JSON.stringify cmBoundary (signedBoundary(cells) V).rcmat


root.swapOrientation = swapOrientation = (face) ->
    CAT [[face[1], face[0]], TAIL TAIL face]


root.orientedBoundary = orientedBoundary = (cells) ->
	(vert3) ->
		facets = cmFacets cells        
		# row compressed signed \partial_3
		B = signedBoundary(cells) vert3
		out = []
		for b in cmBoundary(B.rcmat)
			if b[2] > 0 
				out.push facets[b[0]]
			else
				out.push swapOrientation(facets[b[0]])
		out
			
		#(facets[b[0]] if b[2] > 0 else swapOrientation(facets[b[0]]) for b in cmBoundary(B.rcmat))


#PRINT "orientedBoundary =", JSON.stringify orientedBoundary(cells) V

#object = new SimplicialComplex(V, orientedBoundary(cells) V)
#PRINT "object =", object
#model = viewer.draw object

#//////////////////////////////////////////////////////////////////////////
# -- Extrusion matrix algorithm ------------------------------------------
#//////////////////////////////////////////////////////////////////////////


root.next = next = (offset) ->
	(chain) ->
		d = chain[0].length
		out = IDNT d 
		for k in [1...d] 
			out[0][k] = offset 
		numeric.dot chain,out

#PRINT "next(6) =", JSON.stringify next(6) 
#PRINT "next =", JSON.stringify next(6) cells


root.doubleChain = doubleChain = (theChain, layers=[1]) ->
	chain = CLONE theChain
	offset = (Math.max (CAT chain)...) + 1
	first = normalize chain
	nextChain = next(offset)
	chains = []
	for k in [0...layers.length]
		second = nextChain first
		if layers[k] == 1
			chains.push AA(denormalize) [first,second]
		first = second
	return CAT( AA(AA(CAT))(AA(TRANS)(chains)) )

#PRINT "doubleChain =", JSON.stringify doubleChain cells


root.perms = perms = (d) ->
	idnt = IDNT 2*d
	Pi = (0 for k in [0...d])
	Pi[0] = AL [[idnt[idnt.length-1]], BUTLAST idnt]
	for k in [1...d]
		Pi[k] = numeric.dot Pi[k-1], Pi[0]
	Pi

#PRINT "perms =", JSON.stringify perms 2


root.proj = proj = (d) ->
	idnt = IDNT (d+1)
	zeros = ((0 for j in [0...d+1]) for i in [0...d-1]) 
	CAT [ idnt, zeros ]

#PRINT "proj =", JSON.stringify proj 3


root.extrude = extrude = (chain, layers=[1]) ->
	d = chain[0].length
	Pi = perms d
	P = proj d
	ccomplex = doubleChain chain,layers
	out = [numeric.dot ccomplex,P]
	for k in [0...d-1]
		out.push numeric.dot ccomplex,(numeric.dot Pi[k],P)
	return CAT out
	
	
root.VERTS = VERTS = COMP([AA(REVERSE),CART,REVERSE])


#//////////////////////////////////////////////////////////////////////////
# -- CExecution test of new matrix kernel ---------------------------------
#//////////////////////////////////////////////////////////////////////////


C_1 = extrude [[0]], layers=[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1]
#AR [([1,0] for k in [1..10]),1]
vert1 = VERTS [[0...22]]
object = new SimplicialComplex vert1,C_1
PRINT "object =", object
model = viewer.draw object

C_2 = extrude C_1, [1,1,1,1,1,1,1,1]

#vert2 = VERTS [[0...22], [0...9]]
#object = new SimplicialComplex vert2,C_2
#PRINT "object =", object
#model = viewer.draw object


t0 = Date.now()
C_3 = extrude(C_2, [1,1,1,1,1])
t1 = Date.now()
PRINT "extrusion time =",t1-t0


vert3 = VERTS [[0...22], [0...9], [0,1,2,3,4,5]]

###
object = new SimplicialComplex vert3,C_3
PRINT "object =", object
model = viewer.draw object
###

t0 = Date.now()
boundary = orientedBoundary(C_3)(vert3)
t1 = Date.now()
PRINT "boundary time =",t1-t0

object = new SimplicialComplex vert3,boundary
PRINT "object =", object
model = viewer.draw object

###

##
C_3 = extrude [[0, 1, 2], [1, 2, 3]],layers=[1,1]
PRINT "extrude =", JSON.stringify C_3
vert3 = VERTS([ [0,1], [0,1], [0,1,2]])
PRINT "vert3 =", JSON.stringify vert3
object = new SimplicialComplex(vert3, orientedBoundary(C_3)(vert3))
PRINT "object =", object
#object = new SimplicialComplex vert3,C_3
model = viewer.draw object

#//////////////////////////////////////////////////////////////////////////
# -- CLASSES of new kernel ------------------------------------------------
#//////////////////////////////////////////////////////////////////////////


class PointSet
	
	
class Polytopes
	
	
class Hcubes extends Polytopes
	
	
class Simplices extends Hcubes
	
	
class Document
	
	
class Token



# The class used to represent a *subdomain*, i.e. a compact subset of a geometric space, 
#	a parcel of a domain subdivision, encoded as a JSON document. 
class SubDomain
	
	
mat = [[1,2,3],[2,3,4]]
A = new BinMat(mat)
B = new SparseMat(mat)
A = new SparseMat(mat)
PRINT "BinMat =", JSON.stringify A.rcmat
PRINT "SparseMat =", JSON.stringify B
PRINT "B =", JSON.stringify B.rcmat
PRINT "B.T() =", JSON.stringify B.T()
PRINT "B.PROD(A) =", JSON.stringify (coo2mat B.PROD(A.T()))
PRINT "B.PROD(A) =", JSON.stringify triples2SparseMat (B.PROD(A.T())).rcmat
