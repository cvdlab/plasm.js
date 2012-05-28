root = exports ? this

root.INV = INV = (A) -> numeric.inv A
root.PROD = PROD = (args) -> AA(MUL)(DISTL args)	
root.VECTNORM 	= VECTNORM = (a) -> Math.sqrt SUM MUL [a,a]
root.UNITVECT 	= UNITVECT = (a) -> PROD [1.0/(VECTNORM a), a]
root.INNERPROD 	= INNERPROD = ([u, v]) -> SUM MUL [u, v]
root.MATSUM 	= MATSUM = (args) -> AA(AA(SUM)) AA(TRANS) TRANS args
root.MATPROD = MATPROD = ([A,B]) -> AA(AA(INNERPROD)) AA(DISTL) DISTR [A, TRANS B]
root.IDNT = IDNT = (n) ->  MAT(n,n) AR [REPLICA(n-1)(AL [1, REPEAT(n) 0]), 1]
root.INV = INV = (A) -> numeric.inv A
root.VECTPROD = VECTPROD = ([u,v]) ->
    w = new Array(3)
    w[0] = u[1]*v[2] - u[2]*v[1]
    w[1] = u[2]*v[0] - u[0]*v[2]
    w[2] = u[0]*v[1] - u[1]*v[0]
    w
root.S0 = S0 = (args) -> args[0]
root.S1 = S1 = (args) -> args[1]
root.S2 = S2 = (args) -> args[2]
root.S3 = S3 = (args) -> args[3]
root.S4 = S4 = (args) -> args[4]




PRINT "INV IDNT(3) =", INV IDNT(3)

PRINT "VECTPROD [[1,0,0], [0,1,0]] = ", VECTPROD [[1,0,0], [0,1,0]] 
PRINT "VECTPROD [[1,1,0], [0,1,0]] = ", VECTPROD [[1,1,0], [0,1,0]

PRINT "IDNT(1) =", IDNT(1)
PRINT "IDNT(4) =", IDNT(4)
PRINT "IDNT(6) =", IDNT(6)
PRINT "IDNT(0) =", IDNT(0)


A = [[1,2,3],[4,5,6],[7,8,9]]
B = [[1,2,3],[4,5,6],[7,8,9]]
PRINT "MATPROD [A,B] =", MATPROD [A,B]
# => [ [30, 36, 42], [66,81,96], [102,126,150] ]

C = [[1,2,3],[4,5,6]]
D = [[1,2],[4,5],[7,8]]
PRINT "MATPROD [C,D] =", MATPROD [C,D]
# => [ [30,36], [66,81] ]

#PRINT "MATPROD [A,B,D] =", INSR(MATPROD) [A,B,D]
# => [ [30,36], [66,81] ]

##
MUL [3,4]
MUL [[1,2,3],[4,5,6]]

SUM [3,4]
SUM [[1,2,3],[4,5,6]]

PROD [3,[1,2,3]]
PROD [4,[10,20,30]]

AA(SUM) [[[1,2,3],[4,5,6]]]

DISTL [2,[1,2,3]] 

TRANS [[1,2,3],[10,20,30],[100,200,300]]
TRANS [[1,2,3,4,5],[10,20,30,40,50]]
TRANS [[],[]]





a = [1,2,3]

PRINT "UNITVECT a =", UNITVECT a
PRINT "VECTNORM UNITVECT a =", VECTNORM UNITVECT a
b = [10,20,30]
PRINT "a =", a
PRINT "b =", b
PRINT "INNERPROD [a,b] =", INNERPROD [a,b]

A = [[1,2,3],[4,5,6],[7,8,9]]
B = [[10,20,30],[40,50,60],[70,80,90]]
PRINT "A =", A
PRINT "B =", B
PRINT "MATSUM [A,B] =", MATSUM [A,B]
PRINT "MATSUM [A,B,A] =", MATSUM [A,B,A]
PRINT "MATSUM [A,B,B,A] =", MATSUM [A,B,B,A]


##

a = [1,2,3]
PRINT "VECTNORM a =", VECTNORM a
PRINT "VECTNORM [10,20,30] =", VECTNORM [10,20,30]

PRINT "AA(MUL) DISTL [3,[10,20,30]] =", AA(MUL) DISTL [3,[10,20,30]]


	
PRINT "PROD [3,[10,20,30]] =", PROD [3,[10,20,30]]
PRINT "PROD [3,[10,20,30,40,50]] =", PROD [3,[10,20,30,40,50]]





a = [1,2,3]
PRINT "VECTNORM a =", VECTNORM a





a = [1,2,3]
b = [10,20,30]
PRINT " =", a
PRINT "b =", b
PRINT "INNERPROD [a,b] =", INNERPROD [a,b]




a = [1,2,3]
b = [10,20,30]
PRINT "a =", a
PRINT "b =", b
PRINT "SUM [a,b] =", SUM [a,b]

a = [1..10]
b =  (10*k for k in [1..10])
PRINT "a =", a
PRINT "b =", b
PRINT "SUM [a,b] =", SUM [a,b]

c =  (100*k for k in [1..10])
PRINT "SUM [a,b,c] =", SUM [a,b,c]


root.A = A = [[1,2,3],[4,5,6],[7,8,9]]
root.B = B = [[10,20,30],[40,50,60],[70,80,90]]

matsum = (args) -> AA(AA(SUM)) (AA(TRANS) (TRANS args))
matsum = (args) -> (COMP [AA(AA(SUM)), AA(TRANS), TRANS]) args

PRINT "A =", A
PRINT "B =", B
PRINT "matsum [A,B] =", matsum [A,B]
PRINT "matsum [A,B,A] =", matsum [A,B,A]
PRINT "matsum [A,B,B,A] =", matsum [A,B,B,A]



comb = SUM [(PROD [10,a]), (PROD [5,b])]
PRINT "a =", a
PRINT "b =", b
PRINT "SUM [(PROD [10,a]), (PROD [5,b])] =", SUM [(PROD [10,a]), (PROD [5,b])]