module "qhull-token"

test "Colors & palette", 4, () -> 
	string2Value = "#{JSON.stringify palette[0]}"
	evalExpression = "palette[0]" + " => " + string2Value
	result = "[0.5,0,0]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify palette[0] is MAROON}"
	evalExpression = "palette[0] is MAROON" + " => " + string2Value
	result = "true"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify palette[15]}"
	evalExpression = "palette[15]" + " => " + string2Value
	result = "[0.5,0,0.5]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify palette[15] is PURPLE}"
	evalExpression = "palette[15] is PURPLE" + " => " + string2Value
	result = "true"
	same string2Value, result, evalExpression


test "Conversion fram basis 10 to basis 36", 4, () -> 
	string2Value = "#{d2h 100}"
	evalExpression = "d2h 100" + " => " + string2Value
	result = "2s"
	same string2Value, result, evalExpression

	string2Value = "#{d2h 36}"
	evalExpression = "d2h 36" + " => " + string2Value
	result = "10"
	same string2Value, result, evalExpression

	string2Value = "#{d2h 35}"
	evalExpression = "d2h 35" + " => " + string2Value
	result = "z"
	same string2Value, result, evalExpression

	string2Value = "#{d2h(11111111111)}"
	evalExpression = "d2h 11111111111" + " => " + string2Value
	result = "53r9o7b"
	same string2Value, result, evalExpression


test "Conversion fram basis 36 to basis 10", 4, () -> 
	string2Value = "#{h2d '2s'}"
	evalExpression = "h2d 2s" + " => " + string2Value
	result = "100"
	same string2Value, result, evalExpression

	string2Value = "#{h2d '10'}"
	evalExpression = "h2d 10" + " => " + string2Value
	result = "36"
	same string2Value, result, evalExpression

	string2Value = "#{h2d 'z'}"
	evalExpression = "h2d z" + " => " + string2Value
	result = "35"
	same string2Value, result, evalExpression

	string2Value = "#{h2d '53r9o7b'}"
	evalExpression = "h2d 53r9o7b" + " => " + string2Value
	result = "11111111111"
	same string2Value, result, evalExpression


test "keysConcat", 7, () -> 
	string2Value = "#{JSON.stringify keysConcat 'a',['0b','0c','0d']}"
	evalExpression = "keysConcat 'a',['0b','0c','0d']" + " => " + string2Value
	result = '["a0b","a0c","a0d"]'
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify keysConcat 'a',['z']}"
	evalExpression = "keysConcat 'a',['z']" + " => " + string2Value
	result = '["az"]'
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify keysConcat 'a',['']}"
	evalExpression = "keysConcat 'a',['']" + " => " + string2Value
	result = '["a"]'
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify keysConcat '',['']}"
	evalExpression = "keysConcat '',['']" + " => " + string2Value
	result = '[""]'
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify keysConcat '',['w']}"
	evalExpression = "keysConcat '',['w']" + " => " + string2Value
	result = '["w"]'
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify keysConcat 'abc',['w']}"
	evalExpression = "keysConcat 'abc',['w']" + " => " + string2Value
	result = '["abcw"]'
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify keysConcat 'abc',['w0','w1','w2']}"
	evalExpression = "keysConcat 'abc',['w0','w1','w2']" + " => " + string2Value
	result = '["abcw0","abcw1","abcw2"]'
	same string2Value, result, evalExpression


test "randomPoints", 2, () -> 
	object = randomPoints rn=2,m=40,scale=2
	evalExpression = "randomPoints rn=2,m=40,scale=2" + " => " + "object"
	ok object.m is 40, evalExpression + ".m == 40"
	ok object.rn is 2, evalExpression + ".rn == 2"


test "simplexMatrix", 2, () -> 
	model = CUBE(2)
	verts = model.vertices.verts
	cell = model.faces.cells[2][0]
	object = simplexMatrix(verts,cell)
	console.log object
	evalExpression = "simplexMatrix(verts,cell) -> #{JSON.stringify simplexMatrix(verts,cell)}"
	ok object.length is 3, "simplexMatrix(verts,cell).length is 3"
	ok object[0].length is 3, "#{JSON.stringify simplexMatrix(verts,cell)}"
	
	
test "simplexMatrix", 1, () -> 
	string2Value = "#{JSON.stringify simplexMatrix [[2.5,-0.1],[-0.2,3],[-2,-3]], [0,1,2]}"
	evalExpression = "simplexMatrix [[2.5,-0.1],[-0.2,3],[-2,-3]], [0,1,2]" + " => " + string2Value
	result = "[[2.5,-0.1,1],[-0.2,3,1],[-2,-3,1]]"
	same string2Value, result, evalExpression
	
	


test "grading with affine coords (sample in 2D)", 7, () -> 
	ok grading([-1,-1,0]) is "1", 'grading([-1,-1,0])}  is "1"'
	ok grading([-1,0,-1]) is "2", 'grading([-1,0,-1])}  is "2"'
	ok grading([-1,1,0]) is "3", 'grading([-1,1,0])}  is "3"'
	ok grading([1,-1,-1]) is "4", 'grading([1,-1,-1])}  is "4"'
	ok grading([1,-1,0]) is "5", 'grading([1,-1,0])}  is "5"'
	ok grading([0,1,-1]) is "6", 'grading([0,1,-1])}  is "6"'
	ok grading([0,0,0]) is "7", 'grading([0,0,0])}  is "7"'


test "grading with affine coords (sample in 3D)", 2, () -> 
	ok grading([-1,-1,-1,0]) is "1", 'grading([-1,-1,-1,0])}  is "1"'
	ok grading([1,1,1,0]) is (d2h 15), 'grading([1,1,1,0])}  is "f"'


test "mapping a reference simplex into the standard basis", 1, () -> 
	matrix = mapping (simplexMatrix [[2.5,-0.1],[-0.2,3],[-2,-3]], [0,1,2])
	result = numeric.dot([[2.5,-0.1,1],[-0.2,3,1],[-2,-3,1]], matrix)
	same "#{JSON.stringify AA(fcode) result}", "[[1,0,0],[0,1,0],[0,0,1]]",
		"numeric.dot([[2.5,-0.1,1],[-0.2,3,1],[-2,-3,1]], matrix); 
			mapping simplexMatrix [[2.5,-0.1],[-0.2,3],[-2,-3]], [0,1,2] -> matrix"

test "affineMapping with the matrix of the reference simplex -- BUGGED ??", 2, () -> 
	matrix = mapping (simplexMatrix [[2.5,-0.1],[-0.2,3],[-2,-3]], [0,1,2])
	cartesianPoints = [[2.5,-0.1],[-0.2,3],[-2,-3]]
	beautify = (expression) -> "#{JSON.stringify expression}"
	mkHom = (point) -> AR [point, 1]
	result = affineMapping(matrix) cartesianPoints
	same "#{JSON.stringify AA(fcode) result}", "[[1,0,0],[0,1,0],[0,0,1]]", 
		"affineMapping(matrix) [[2.5,-0.1],[-0.2,3],[-2,-3]] -> [[1,0,0],[0,1,0],[0,0,1]]"
		
	centroid = DIV [SUM cartesianPoints,cartesianPoints.length]
	result = affineMapping(matrix) [centroid]
	console.log "centroid =", centroid
	console.log "result =",result
	same "#{JSON.stringify (AA(fcode) result)}", "[[0.393939394,0.292929293,0.313131313]]", 
		"affineMapping(matrix) [centroid] -> [[0.393939394,0.292929293,0.313131313]] BOH !??"


test "closetozero", 8, () -> 
	ok closetozero(0.0) is true, "closetozero(0.0) is true"
	ok closetozero(0.0001) is true, "closetozero(0.0001) is true"
	ok closetozero(0.001) is true, "closetozero(0.001) is true"
	ok closetozero(0.01) is false, "closetozero(0.01) is false"
	ok closetozero(0.1) is false, "closetozero(0.1) is false"
	ok closetozero(1.0) is false, "closetozero(1.0) is false"
	ok closetozero(0.999) is false, "closetozero(0.999) is false"
	ok closetozero(-0.999) is false, "closetozero(-0.999) is false"



test "randomSimplex", 5, () -> 
	d = rn = 2
	points = randomPoints(rn, m=20*Math.pow(2,rn), scale=8).t( [0...rn], REPEAT(rn)(-8/2) )
	ok randomSimplex(points.verts,d).length is d+1, 
		"randomSimplex(points.verts,d=2) -> #{JSON.stringify randomSimplex(points.verts,d)}"

	d = rn = 3
	points = randomPoints(rn, m=20*Math.pow(2,rn), scale=8).t( [0...rn], REPEAT(rn)(-8/2) )
	ok randomSimplex(points.verts,d).length is d+1, 
		"randomSimplex(points.verts,d=3) -> #{JSON.stringify randomSimplex(points.verts,d)}"

	d = rn = 4
	points = randomPoints(rn, m=20*Math.pow(2,rn), scale=8).t( [0...rn], REPEAT(rn)(-8/2) )
	ok randomSimplex(points.verts,d).length is d+1, 
		"randomSimplex(points.verts,d=4) -> #{JSON.stringify randomSimplex(points.verts,d)}"

	d = rn = 1
	points = randomPoints(rn, m=20*Math.pow(2,rn), scale=8).t( [0...rn], REPEAT(rn)(-8/2) )
	ok randomSimplex(points.verts,d).length is d+1, 
		"randomSimplex(points.verts,d=1) -> #{JSON.stringify randomSimplex(points.verts,d)}"

	ok d isnt 0, "The simplex dimension d cannot be zero"
	


test "spacePartition", 1, () -> 
	d = rn = 2
	points = randomPoints(rn, m=10*Math.pow(2,rn), scale=8).t( [0...rn], REPEAT(rn)(-8/2) )
	ok spacePartition(points.verts).length <= d+1, 
		"spacePartition(points.verts) -> #{JSON.stringify spacePartition(points.verts)}"
