module "FL-core"


test "APPLY", 2, () -> 
	expect 2

	string2Value = "#{JSON.stringify APPLY [sin, PI/2]}"
	evalExpression = "APPLY [sin, PI/2]" + " => " + string2Value
	result = "1"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify AA(APPLY) (DISTL [sin, [0, PI/6, PI/4, PI/3, PI, 2*PI]])}"
	evalExpression = "(AA APPLY) (DISTL [sin, [0, PI/6, PI/4, PI/3, PI, 2*PI]])" + " => " + string2Value
	result = "[0,0.49999999999999994,0.7071067811865475,0.8660254037844386,1.2246467991473532e-16,-2.4492935982947064e-16]"
	same string2Value, result, evalExpression



test "COMP", () -> 
	expect 2

	string2Value = "#{JSON.stringify ((COMP [asin, sin, asin, sin, asin, sin]) PI/4) * 4}"
	evalExpression = "((COMP [asin, sin, asin, sin, asin, sin]) PI/4) * 4" + " => " + string2Value
	result = "3.1415926535897927"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify COMP([asin, sin]) PI/2 }"
	evalExpression = "COMP([asin, sin]) PI/2 " + " => " + string2Value
	result = "1.5707963267948966"
	same string2Value, result, evalExpression



test "CONS", () -> 
	expect 1

	string2Value = "#{JSON.stringify (CONS [sin, cos, tan]) PI/4}"
	evalExpression = "(CONS [sin, cos, tan]) PI/4" + " => " + string2Value
	result = "[0.7071067811865475,0.7071067811865476,0.9999999999999999]"
	same string2Value, result, evalExpression



test "CAT", () -> 
	expect 6

	string2Value = "#{JSON.stringify CAT [[1,2,3],[4,5,6],[7,8,9]]}"
	evalExpression = "CAT [[1,2,3],[4,5,6],[7,8,9]]" + " => " + string2Value
	result = "[1,2,3,4,5,6,7,8,9]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify CAT [[1,2,3],[40,50],[600]]}"
	evalExpression = "CAT [[1,2,3],[40,50],[600]]" + " => " + string2Value
	result = "[1,2,3,40,50,600]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify CAT []}"
	evalExpression = "CAT []" + " => " + string2Value
	result = "[]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify CAT [[1,2,3]]}"
	evalExpression = "CAT [[1,2,3]]" + " => " + string2Value
	result = "[1,2,3]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify CAT [[1,2,3],[]]}"
	evalExpression = "CAT [[1,2,3],[]]" + " => " + string2Value
	result = "[1,2,3]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify CAT [[],[]]}"
	evalExpression = "CAT [[],[]]" + " => " + string2Value
	result = "[]"
	same string2Value, result, evalExpression



test "ID", () -> 
	expect 3

	string2Value = "#{JSON.stringify ID 1}"
	evalExpression = "ID 1" + " => " + string2Value
	result = "1"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify ID [[1],[2]]}"
	evalExpression = "ID [[1],[2]] " + " => " + string2Value
	result = "[[1],[2]]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify ID CAT [[1,2,3],[4,5,6],[7,8,9]]}"
	evalExpression = "ID CAT [[1,2,3],[4,5,6],[7,8,9]]" + " => " + string2Value
	result = "[1,2,3,4,5,6,7,8,9]"
	same string2Value, result, evalExpression




test "K", () -> 
	expect 1

	string2Value = "#{(K 1) 2}"
	evalExpression = "(K 1) 2" + " => " + string2Value
	result = "1"
	same string2Value, result, evalExpression




test "AA", () -> 
	expect 6

	string2Value = "#{JSON.stringify (AA LIST) [1,2,3,4,5]}"
	evalExpression = "(AA LIST) [1,2,3,4,5]" + " => " + string2Value
	result = "[[1],[2],[3],[4],[5]]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify (AA LIST) []}"
	evalExpression = "(AA LIST) []" + " => " + string2Value
	result = "[]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify (AA LIST) [10]}"
	evalExpression = "(AA LIST) [10]" + " => " + string2Value
	result = "[[10]]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify AA(MUL)(DISTL([100,[1,2,3,4]]))}"
	evalExpression = "AA(MUL)(DISTL([100,[1,2,3,4]]))" + " => " + string2Value
	result = "[100,200,300,400]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify (AA sin) [0, PI/6, PI/4, PI/3, PI, 2*PI]}"
	evalExpression = "(AA sin) [0, PI/6, PI/4, PI/3, PI, 2*PI]" + " => " + string2Value
	result = "[0,0.49999999999999994,0.7071067811865475,0.8660254037844386,1.2246467991473532e-16,-2.4492935982947064e-16]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify (AA APPLY) (DISTL [sin, [0, PI/6, PI/4, PI/3, PI, 2*PI]])}"
	evalExpression = "(AA APPLY) (DISTL [sin, [0, PI/6, PI/4, PI/3, PI, 2*PI]])" + " => " + string2Value
	result = "[0,0.49999999999999994,0.7071067811865475,0.8660254037844386,1.2246467991473532e-16,-2.4492935982947064e-16]"
	same string2Value, result, evalExpression



test "DISTR", () -> 
	expect 2

	string2Value = "#{JSON.stringify DISTR([CAT([[1,2,3],[4,5,6],[7,8,9]]), 100]) }"
	evalExpression = "DISTR [CAT([[1,2,3],[4,5,6],[7,8,9]]),100]" + " => " + string2Value
	result = "[[1,100],[2,100],[3,100],[4,100],[5,100],[6,100],[7,100],[8,100],[9,100]]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify DISTR([CAT([[1,2,3],[4,5,6],[7,8,9]]), []]) }"
	evalExpression = "DISTR [CAT([[1,2,3],[4,5,6],[7,8,9]]),[]] " + " => " + string2Value
	result = "[[1,[]],[2,[]],[3,[]],[4,[]],[5,[]],[6,[]],[7,[]],[8,[]],[9,[]]]"
	same string2Value, result, evalExpression



test "DISTL", () -> 
	expect 2

	string2Value = "#{JSON.stringify DISTL([100, CAT([[1,2,3],[4,5,6],[7,8,9]])]) }"
	evalExpression = "DISTL [100, CAT([[1,2,3],[4,5,6],[7,8,9]])]" + " => " + string2Value
	result = "[[100,1],[100,2],[100,3],[100,4],[100,5],[100,6],[100,7],[100,8],[100,9]]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify DISTL([[], CAT([[1,2,3],[4,5,6],[7,8,9]])]) }"
	evalExpression = "DISTL [[], CAT([[1,2,3],[4,5,6],[7,8,9]]),[]] " + " => " + string2Value
	result = "[[[],1],[[],2],[[],3],[[],4],[[],5],[[],6],[[],7],[[],8],[[],9]]"
	same string2Value, result, evalExpression




test "INSR", () -> 
	expect 2

	max = (a,b) -> if a> b then a else b
	string2Value = "#{INSR(max)([-66,7,-99,1,9,12,44,0,5,7])}"
	evalExpression = "INSR (max) ([-66,7,-99,1,9,12,44,0,5,7])" + " => " + string2Value
	result = "44"
	same string2Value, result, evalExpression

	min = (a,b) -> if a < b then a else b
	string2Value = "#{INSR(min)([-66,7,-99,1,9,12,44,0,5,7])}"
	evalExpression = "INSR (min) ([-66,7,-99,1,9,12,44,0,5,7])" + " => " + string2Value
	result = "-99"
	same string2Value, result, evalExpression




test "INSL", () -> 
	expect 2

	max = (a,b) -> if a> b then a else b
	string2Value = "#{INSL(max)([-66,7,-99,1,9,12,44,0,5,7])}"
	evalExpression = "INSL (max) ([-66,7,-99,1,9,12,44,0,5,7])" + " => " + string2Value
	result = "44"
	same string2Value, result, evalExpression

	min = (a,b) -> if a < b then a else b
	string2Value = "#{INSL(min)([-66,7,-99,1,9,12,44,0,5,7])}"
	evalExpression = "INSL (min) ([-66,7,-99,1,9,12,44,0,5,7])" + " => " + string2Value
	result = "-99"
	same string2Value, result, evalExpression




test "TREE", () -> 
	expect 2

	string2Value = "#{((TREE BIGGER) [-66,7,-99,1,9,12,44,0,5,7])}"
	evalExpression = "((TREE BIGGER) [-66,7,-99,1,9,12,44,0,5,7])" + " => " + string2Value
	result = "44"
	same string2Value, result, evalExpression

	string2Value = "#{((TREE SMALLER) [-66,7,-99,1,9,12,44,0,5,7])}"
	evalExpression = "((TREE SMALLER) [-66,7,-99,1,9,12,44,0,5,7])" + " => " + string2Value
	result = "-99"
	same string2Value, result, evalExpression




test "BIGGER & SMALLER", () -> 
	expect 4

	string2Value = "#{BIGGER [6,100]}"
	evalExpression = "BIGGER [6,100]" + " => " + string2Value
	result = "100"
	same string2Value, result, evalExpression

	string2Value = "#{BIGGER [6,-100]}"
	evalExpression = "BIGGER [6,-100]" + " => " + string2Value
	result = "6"
	same string2Value, result, evalExpression

	string2Value = "#{SMALLER [6,100]}"
	evalExpression = "SMALLER [6,100]" + " => " + string2Value
	result = "6"
	same string2Value, result, evalExpression

	string2Value = "#{SMALLER [6,-100]}"
	evalExpression = "SMALLER [6,-100]" + " => " + string2Value
	result = "-100"
	same string2Value, result, evalExpression




test "BIGGEST & SMALLEST", () -> 
	expect 2

	string2Value = "#{BIGGEST [-66,7,-99,1,9,12,44,0,5,7]}"
	evalExpression = "BIGGEST [-66,7,-99,1,9,12,44,0,5,7]" + " => " + string2Value
	result = "44"
	same string2Value, result, evalExpression

	string2Value = "#{SMALLEST [-66,7,-99,1,9,12,44,0,5,7]}"
	evalExpression = "SMALLEST [-66,7,-99,1,9,12,44,0,5,7]" + " => " + string2Value
	result = "-99"
	same string2Value, result, evalExpression





test "LIST", () -> 
	expect 4

	string2Value = "#{JSON.stringify LIST [1,2,3,4,5]}"
	evalExpression = "LIST [1,2,3,4,5]" + " => " + string2Value
	result = "[[1,2,3,4,5]]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify (AA LIST) [1,2,3,4,5]}"
	evalExpression = "(AA LIST) [1,2,3,4,5]" + " => " + string2Value
	result = "[[1],[2],[3],[4],[5]]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify (AA LIST) []}"
	evalExpression = "(AA LIST) []" + " => " + string2Value
	result = "[]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify (AA LIST) [10]}"
	evalExpression = "(AA LIST) [10]" + " => " + string2Value
	result = "[[10]]"
	same string2Value, result, evalExpression




test "LEN", () -> 
	expect 4

	string2Value = "#{JSON.stringify LEN [1,2,3,4,5]}"
	evalExpression = "LEN [1,2,3,4,5]" + " => " + string2Value
	result = "5"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify LEN []}"
	evalExpression = "LEN []" + " => " + string2Value
	result = "0"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify LEN [100]}"
	evalExpression = "LEN [100]" + " => " + string2Value
	result = "1"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify LEN [-1,-2]}"
	evalExpression = "LEN [-1,-2]" + " => " + string2Value
	result = "2"
	same string2Value, result, evalExpression




test "REVERSE", () -> 
	expect 4

	string2Value = "#{JSON.stringify  REVERSE [0..10]}"
	evalExpression = "REVERSE [0..10]" + " => " + string2Value
	result = "[10,9,8,7,6,5,4,3,2,1,0]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify  REVERSE [0..1]}"
	evalExpression = "REVERSE [0..1]" + " => " + string2Value
	result = "[1,0]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify  REVERSE [0]}"
	evalExpression = "REVERSE [0]" + " => " + string2Value
	result = "[0]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify  REVERSE []}"
	evalExpression = "REVERSE []" + " => " + string2Value
	result = "[]"
	same string2Value, result, evalExpression




test "TAIL", () -> 
	expect 4

	string2Value = "#{JSON.stringify  TAIL [10,20,30,40,50]}"
	evalExpression = "TAIL [10,20,30,40,50]" + " => " + string2Value
	result = "[20,30,40,50]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify  TAIL [10,20]}"
	evalExpression = "TAIL [10,20]" + " => " + string2Value
	result = "[20]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify  TAIL [10]}"
	evalExpression = "TAIL [10]" + " => " + string2Value
	result = "[]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify  TAIL []}"
	evalExpression = "TAIL []" + " => " + string2Value
	result = "[]"
	same string2Value, result, evalExpression




test "BUTLAST", () -> 
	expect 4

	string2Value = "#{JSON.stringify BUTLAST [10,20,30,40,50]}"
	evalExpression = "BUTLAST [10,20,30,40,50]" + " => " + string2Value
	result = "[10,20,30,40]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify BUTLAST [10,20]}"
	evalExpression = "BUTLAST [10,20]" + " => " + string2Value
	result = "[10]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify BUTLAST [10]}"
	evalExpression = "BUTLAST [10]" + " => " + string2Value
	result = "[]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify BUTLAST []}"
	evalExpression = "BUTLAST []" + " => " + string2Value
	result = "[]"
	same string2Value, result, evalExpression




test "AL", () -> 
	expect 3

	string2Value = "#{JSON.stringify AL [0,[1,2,3,4]]}"
	evalExpression = "AL [0,[1,2,3,4]]" + " => " + string2Value
	result = "[0,1,2,3,4]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify AL [0,[1]]}"
	evalExpression = "AL [0,[1]]" + " => " + string2Value
	result = "[0,1]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify AL [0,[]]}"
	evalExpression = "AL [0,[]]" + " => " + string2Value
	result = "[0]"
	same string2Value, result, evalExpression




test "AR", () -> 
	expect 3

	string2Value = "#{JSON.stringify AR [[1,2,3,4],0]}"
	evalExpression = "AR [[1,2,3,4],0]" + " => " + string2Value
	result = "[1,2,3,4,0]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify AR [[1],0]}"
	evalExpression = "AR [[1],0]" + " => " + string2Value
	result = "[1,0]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify AR [[],0]}"
	evalExpression = "AR [[],0]" + " => " + string2Value
	result = "[0]"
	same string2Value, result, evalExpression




test "REPEAT", () -> 
	expect 4

	string2Value = "#{JSON.stringify (REPEAT 3) [0,1,2]}"
	evalExpression = "(REPEAT 3) [0,1,2]" + " => " + string2Value
	result = "[[0,1,2],[0,1,2],[0,1,2]]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify (REPEAT 1) [0,1,2]}"
	evalExpression = "(REPEAT 1) [0,1,2]" + " => " + string2Value
	result = "[[0,1,2]]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify (REPEAT 0) [0,1,2]}"
	evalExpression = "(REPEAT 0) [0,1,2]" + " => " + string2Value
	result = "[]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify REPEAT(3) [1]}"
	evalExpression = "REPEAT(3) [1]" + " => " + string2Value
	result = "[[1],[1],[1]]"
	same string2Value, result, evalExpression




test "REPLICA", () -> 
	expect 4

	string2Value = "#{JSON.stringify (REPLICA 3) [0,1,2]}"
	evalExpression = "(REPLICA 3) [0,1,2]" + " => " + string2Value
	result = "[0,1,2,0,1,2,0,1,2]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify (REPLICA 1) [0,1,2]}"
	evalExpression = "(REPLICA 1) [0,1,2]" + " => " + string2Value
	result = "[0,1,2]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify (REPLICA 0) [0,1,2]}"
	evalExpression = "(REPLICA 0) [0,1,2]" + " => " + string2Value
	result = "[]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify REPLICA(2)([1,-1])}"
	evalExpression = "REPLICA(2)([1,-1])" + " => " + string2Value
	result = "[1,-1,1,-1]"
	same string2Value, result, evalExpression




test "SUM", () -> 
	expect 10

	string2Value = "#{JSON.stringify SUM [1,2,3,4]  # => 10}"
	evalExpression = "SUM [1,2,3,4]" + " => " + string2Value
	result = "10"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify SUM [[1,2,3],[10,20,30]]}"
	evalExpression = "SUM [[1,2,3],[10,20,30]]" + " => " + string2Value
	result = "[11,22,33]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify SUM [[1,2,3],[10,20,30],[100,200,300]]}"
	evalExpression = "SUM [[1,2,3],[10,20,30],[100,200,300]]" + " => " + string2Value
	result = "[111,222,333]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(SUM) [[1,2,3],[10,20,30],[100,200,300]]}"
	evalExpression = "TREE(SUM) [[1,2,3],[10,20,30],[100,200,300]]" + " => " + string2Value
	result = "666"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(SUM) [1,2,3,4,5,6]}"
	evalExpression = "TREE(SUM) [1,2,3,4,5,6]" + " => " + string2Value
	result = "21"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(SUM) [1,2,3,4,5,6,7]}"
	evalExpression = "TREE(SUM) [1,2,3,4,5,6,7]" + " => " + string2Value
	result = "28"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(SUM)([1,2])}"
	evalExpression = "TREE(SUM) [1,2]" + " => " + string2Value
	result = "3"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(SUM)([1])}"
	evalExpression = "TREE(SUM) [1]" + " => " + string2Value
	result = "1"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(SUM)([])}"
	evalExpression = "TREE(SUM) []" + " => " + string2Value
	result = "undefined"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify SUM []}"
	evalExpression = "SUM []" + " => " + string2Value
	result = "undefined"
	same string2Value, result, evalExpression




test "SUB", () -> 
	expect 10

	string2Value = "#{JSON.stringify SUB [1,2,3,4]  # => 10}"
	evalExpression = "SUB [1,2,3,4]" + " => " + string2Value
	result = "-8"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify SUB [[1,2,3],[10,20,30]]}"
	evalExpression = "SUB [[1,2,3],[10,20,30]]" + " => " + string2Value
	result = "[-9,-18,-27]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify SUB [[1,2,3],[10,20,30],[100,200,300]]}"
	evalExpression = "SUB [[1,2,3],[10,20,30],[100,200,300]]" + " => " + string2Value
	result = "[-109,-218,-327]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(SUB) [[1,2,3],[10,20,30],[100,200,300]]}"
	evalExpression = "TREE(SUB) [[1,2,3],[10,20,30],[100,200,300]]" + " => " + string2Value
	result = "636"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(SUB) [1,2,3,4,5,6]}"
	evalExpression = "TREE(SUB) [1,2,3,4,5,6]" + " => " + string2Value
	result = "-3"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(SUB) [1,2,3,4,5,6,7]}"
	evalExpression = "TREE(SUB) [1,2,3,4,5,6,7]" + " => " + string2Value
	result = "2"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(SUB)([1,2])}"
	evalExpression = "TREE(SUB) [1,2]" + " => " + string2Value
	result = "-1"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(SUB)([1])}"
	evalExpression = "TREE(SUB) [1]" + " => " + string2Value
	result = "1"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(SUB)([])}"
	evalExpression = "TREE(SUB) []" + " => " + string2Value
	result = "undefined"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify SUB []}"
	evalExpression = "SUB []" + " => " + string2Value
	result = "undefined"
	same string2Value, result, evalExpression




test "MUL", () -> 
	expect 10

	string2Value = "#{JSON.stringify MUL [1,2,3,4]  # => 10}"
	evalExpression = "MUL [1,2,3,4]" + " => " + string2Value
	result = "24"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify MUL [[1,2,3],[10,20,30]]}"
	evalExpression = "MUL [[1,2,3],[10,20,30]]" + " => " + string2Value
	result = "[10,40,90]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify MUL [[1,2,3],[10,20,30],[100,200,300]]}"
	evalExpression = "MUL [[1,2,3],[10,20,30],[100,200,300]]" + " => " + string2Value
	result = "[1000,8000,27000]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(MUL) [[1,2,3],[10,20,30],[100,200,300]]}"
	evalExpression = "TREE(MUL) [[1,2,3],[10,20,30],[100,200,300]]" + " => " + string2Value
	result = "216000000000"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(MUL) [1,2,3,4,5,6]}"
	evalExpression = "TREE(MUL) [1,2,3,4,5,6]" + " => " + string2Value
	result = "720"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(MUL) [1,2,3,4,5,6,7]}"
	evalExpression = "TREE(MUL) [1,2,3,4,5,6,7]" + " => " + string2Value
	result = "5040"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(MUL)([1,2])}"
	evalExpression = "TREE(MUL) [1,2]" + " => " + string2Value
	result = "2"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(MUL)([1])}"
	evalExpression = "TREE(MUL) [1]" + " => " + string2Value
	result = "1"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(MUL)([])}"
	evalExpression = "TREE(MUL) []" + " => " + string2Value
	result = "undefined"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify MUL []}"
	evalExpression = "MUL []" + " => " + string2Value
	result = "undefined"
	same string2Value, result, evalExpression




test "DIV", () -> 
	expect 10

	string2Value = "#{JSON.stringify DIV [1,2,3,4]  # => 10}"
	evalExpression = "DIV [1,2,3,4]" + " => " + string2Value
	result = "0.041666666666666664"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify DIV [[1,2,3],[10,20,30]]}"
	evalExpression = "DIV [[1,2,3],[10,20,30]]" + " => " + string2Value
	result = "[0.1,0.1,0.1]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify DIV [[1,2,3],[10,20,30],[100,200,300]]}"
	evalExpression = "DIV [[1,2,3],[10,20,30],[100,200,300]]" + " => " + string2Value
	result = "[0.001,0.0005,0.0003333333333333334]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(DIV) [[1,2,3],[10,20,30],[100,200,300]]}"
	evalExpression = "TREE(DIV) [[1,2,3],[10,20,30],[100,200,300]]" + " => " + string2Value
	result = "59999999.99999999"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(DIV) [1,2,3,4,5,6]}"
	evalExpression = "TREE(DIV) [1,2,3,4,5,6]" + " => " + string2Value
	result = "0.3125"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(DIV) [1,2,3,4,5,6,7]}"
	evalExpression = "TREE(DIV) [1,2,3,4,5,6,7]" + " => " + string2Value
	result = "1.607142857142857"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(DIV)([1,2])}"
	evalExpression = "TREE(DIV) [1,2]" + " => " + string2Value
	result = "0.5"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(DIV)([1])}"
	evalExpression = "TREE(DIV) [1]" + " => " + string2Value
	result = "1"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TREE(DIV)([])}"
	evalExpression = "TREE(DIV) []" + " => " + string2Value
	result = "undefined"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify DIV []}"
	evalExpression = "DIV []" + " => " + string2Value
	result = "undefined"
	same string2Value, result, evalExpression




test "TRANS", () -> 
	expect 2

	string2Value = "#{JSON.stringify TRANS [ [ 0, 0 ], [ 1, 0 ], [ 0, 1 ], [ 1, 1 ] ]}"
	evalExpression = "TRANS [ [ 0, 0 ], [ 1, 0 ], [ 0, 1 ], [ 1, 1 ] ]" + " => " + string2Value
	result = "[[0,1,0,1],[0,0,1,1]]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify TRANS [ [ 1,2,3,4,5 ], [ 10,20,30,40,50 ], [ 100,200,300,400,500 ] ]}"
	evalExpression = "TRANS [ [ 1,2,3,4,5 ], [ 10,20,30,40,50 ], [ 100,200,300,400,500 ] ]" + " => " + string2Value
	result = "[[1,10,100],[2,20,200],[3,30,300],[4,40,400],[5,50,500]]"
	same string2Value, result, evalExpression




test "MAT", () -> 
	expect 2

	string2Value = "#{JSON.stringify MAT(3,4) [1,2,3,4,5,6,7,8,9,10,11,12]}"
	evalExpression = "MAT(3,4) [1,2,3,4,5,6,7,8,9,10,11,12]" + " => " + string2Value
	result = "[[1,2,3,4],[5,6,7,8],[9,10,11,12]]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify MAT(4,3) [1,2,3,4,5,6,7,8,9,10,11,12]}"
	evalExpression = "MAT(4,3) [1,2,3,4,5,6,7,8,9,10,11,12]" + " => " + string2Value
	result = "[[1,2,3],[4,5,6],[7,8,9],[10,11,12]]"
	same string2Value, result, evalExpression




test "ISNUM", () -> 
	expect 2

	string2Value = "#{JSON.stringify ISNUM 3.0E-5}"
	evalExpression = "ISNUM 3.0E-5" + " => " + string2Value
	result = "true"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify ISNUM +3.0004}"
	evalExpression = "ISNUM +3.0004" + " => " + string2Value
	result = "true"
	same string2Value, result, evalExpression




test "ISFUN", () -> 
	expect 6

	string2Value = "#{JSON.stringify ISFUN sin}"
	evalExpression = "ISFUN sin" + " => " + string2Value
	result = "true"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify ISFUN AA sin}"
	evalExpression = "ISFUN AA sin" + " => " + string2Value
	result = "true"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify ISFUN CONS([sin,cos,tan])}"
	evalExpression = "ISFUN CONS([sin,cos,tan])" + " => " + string2Value
	result = "true"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify ISFUN COMP([sin,cos,tan])}"
	evalExpression = "ISFUN COMP([sin,cos,tan])" + " => " + string2Value
	result = "true"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify ISFUN COMP([sin,cos,tan])(1)}"
	evalExpression = "ISFUN COMP([sin,cos,tan])(1)" + " => " + string2Value
	result = "false"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify ISFUN TREE(BIGGER)}"
	evalExpression = "ISFUN TREE(BIGGER)" + " => " + string2Value
	result = "true"
	same string2Value, result, evalExpression




test "PROGRESSIVE_SUM", () -> 
	expect 5

	string2Value = "#{JSON.stringify PROGRESSIVE_SUM [1,2,3,4,5]}"
	evalExpression = "PROGRESSIVE_SUM [1,2,3,4,5]" + " => " + string2Value
	result = "[0,1,3,6,10,15]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify PROGRESSIVE_SUM [1,2]}"
	evalExpression = "PROGRESSIVE_SUM [1,2]" + " => " + string2Value
	result = "[0,1,3]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify PROGRESSIVE_SUM [1]}"
	evalExpression = "PROGRESSIVE_SUM [1]" + " => " + string2Value
	result = "[0,1]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify PROGRESSIVE_SUM []}"
	evalExpression = "PROGRESSIVE_SUM []" + " => " + string2Value
	result = "[0]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify PROGRESSIVE_SUM (AA abs) [1,1,1,3,-6,1,-10,5]}"
	evalExpression = "PROGRESSIVE_SUM (AA abs) [1,1,1,3,-6,1,-10,5]" + " => " + string2Value
	result = "[0,1,2,3,6,12,13,23,28]"
	same string2Value, result, evalExpression




test "SET", () -> 
	expect 4

	string2Value = "#{JSON.stringify SET []}"
	evalExpression = "SET []" + " => " + string2Value
	result = "[]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify SET [[],[]]}"
	evalExpression = "SET [[],[]]" + " => " + string2Value
	result = "[[]]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify SET [1,2,3,5,4,3,2,1]}"
	evalExpression = "SET [1,2,3,5,4,3,2,1]" + " => " + string2Value
	result = "[1,2,3,5,4]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify SET [[1,2],[1,2],[3,4]]}"
	evalExpression = "SET [[1,2],[1,2],[3,4]]" + " => " + string2Value
	result = "[[1,2],[3,4]]"
	same string2Value, result, evalExpression




test "CART", () -> 
	expect 2

	string2Value = "#{JSON.stringify CART2 [[1, 2, 3], [200, 300]]}"
	evalExpression = "CART2 [[1, 2, 3], [200, 300]]" + " => " + string2Value
	result = "[[1,200],[1,300],[2,200],[2,300],[3,200],[3,300]]"
	same string2Value, result, evalExpression

	string2Value = "#{JSON.stringify CART([[1, 2, 3], [200, 300], [10, 11]])}"
	evalExpression = "CART([[1, 2, 3], [200, 300], [10, 11]])" + " => " + string2Value
	result = "[[1,200,10],[1,200,11],[1,300,10],[1,300,11],[2,200,10],[2,200,11],[2,300,10],[2,300,11],[3,200,10],[3,200,11],[3,300,10],[3,300,11]]"
	same string2Value, result, evalExpression



