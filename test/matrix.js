(function() {
  var A, B, C, D, IDNT, INNERPROD, MATPROD, MATSUM, PROD, S0, S1, S2, S3, S4, UNITVECT, VECTNORM, a, b, c, comb, k, matsum, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.PROD = PROD = function(args) {
    return AA(MUL)(DISTL(args));
  };

  root.VECTNORM = VECTNORM = function(a) {
    return Math.sqrt(SUM(MUL([a, a])));
  };

  root.UNITVECT = UNITVECT = function(a) {
    return PROD([1.0 / (VECTNORM(a)), a]);
  };

  root.INNERPROD = INNERPROD = function(_arg) {
    var u, v;
    u = _arg[0], v = _arg[1];
    return SUM(MUL([u, v]));
  };

  root.MATSUM = MATSUM = function(args) {
    return AA(AA(SUM))(AA(TRANS)(TRANS(args)));
  };

  root.MATPROD = MATPROD = function(_arg) {
    var A, B;
    A = _arg[0], B = _arg[1];
    return AA(AA(INNERPROD))(AA(DISTL)(DISTR([A, TRANS(B)])));
  };

  root.IDNT = IDNT = function(n) {
    return MAT(n, n)(AR([CAT(REPEAT(n - 1)(AL([1, REPEAT(n)(0)]))), 1]));
  };

  root.IDNT = IDNT = function(n) {
    return MAT(n, n)(AR([REPLICA(n - 1)(AL([1, REPEAT(n)(0)])), 1]));
  };

  root.S0 = S0 = function(args) {
    return args[0];
  };

  root.S1 = S1 = function(args) {
    return args[1];
  };

  root.S2 = S2 = function(args) {
    return args[2];
  };

  root.S3 = S3 = function(args) {
    return args[3];
  };

  root.S4 = S4 = function(args) {
    return args[4];
  };

  PRINT("IDNT(1) =", IDNT(1));

  PRINT("IDNT(4) =", IDNT(4));

  PRINT("IDNT(6) =", IDNT(6));

  PRINT("IDNT(0) =", IDNT(0));

  A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

  B = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

  PRINT("MATPROD [A,B] =", MATPROD([A, B]));

  C = [[1, 2, 3], [4, 5, 6]];

  D = [[1, 2], [4, 5], [7, 8]];

  PRINT("MATPROD [C,D] =", MATPROD([C, D]));

  MUL([3, 4]);

  MUL([[1, 2, 3], [4, 5, 6]]);

  SUM([3, 4]);

  SUM([[1, 2, 3], [4, 5, 6]]);

  PROD([3, [1, 2, 3]]);

  PROD([4, [10, 20, 30]]);

  AA(SUM)([[[1, 2, 3], [4, 5, 6]]]);

  DISTL([2, [1, 2, 3]]);

  TRANS([[1, 2, 3], [10, 20, 30], [100, 200, 300]]);

  TRANS([[1, 2, 3, 4, 5], [10, 20, 30, 40, 50]]);

  TRANS([[], []]);

  a = [1, 2, 3];

  PRINT("UNITVECT a =", UNITVECT(a));

  PRINT("VECTNORM UNITVECT a =", VECTNORM(UNITVECT(a)));

  b = [10, 20, 30];

  PRINT("a =", a);

  PRINT("b =", b);

  PRINT("INNERPROD [a,b] =", INNERPROD([a, b]));

  A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

  B = [[10, 20, 30], [40, 50, 60], [70, 80, 90]];

  PRINT("A =", A);

  PRINT("B =", B);

  PRINT("MATSUM [A,B] =", MATSUM([A, B]));

  PRINT("MATSUM [A,B,A] =", MATSUM([A, B, A]));

  PRINT("MATSUM [A,B,B,A] =", MATSUM([A, B, B, A]));

  a = [1, 2, 3];

  PRINT("VECTNORM a =", VECTNORM(a));

  PRINT("VECTNORM [10,20,30] =", VECTNORM([10, 20, 30]));

  PRINT("AA(MUL) DISTL [3,[10,20,30]] =", AA(MUL)(DISTL([3, [10, 20, 30]])));

  PRINT("PROD [3,[10,20,30]] =", PROD([3, [10, 20, 30]]));

  PRINT("PROD [3,[10,20,30,40,50]] =", PROD([3, [10, 20, 30, 40, 50]]));

  a = [1, 2, 3];

  PRINT("VECTNORM a =", VECTNORM(a));

  a = [1, 2, 3];

  b = [10, 20, 30];

  PRINT(" =", a);

  PRINT("b =", b);

  PRINT("INNERPROD [a,b] =", INNERPROD([a, b]));

  a = [1, 2, 3];

  b = [10, 20, 30];

  PRINT("a =", a);

  PRINT("b =", b);

  PRINT("SUM [a,b] =", SUM([a, b]));

  a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  b = (function() {
    var _results;
    _results = [];
    for (k = 1; k <= 10; k++) {
      _results.push(10 * k);
    }
    return _results;
  })();

  PRINT("a =", a);

  PRINT("b =", b);

  PRINT("SUM [a,b] =", SUM([a, b]));

  c = (function() {
    var _results;
    _results = [];
    for (k = 1; k <= 10; k++) {
      _results.push(100 * k);
    }
    return _results;
  })();

  PRINT("SUM [a,b,c] =", SUM([a, b, c]));

  root.A = A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

  root.B = B = [[10, 20, 30], [40, 50, 60], [70, 80, 90]];

  matsum = function(args) {
    return AA(AA(SUM))(AA(TRANS)(TRANS(args)));
  };

  matsum = function(args) {
    return (COMP([AA(AA(SUM)), AA(TRANS), TRANS]))(args);
  };

  PRINT("A =", A);

  PRINT("B =", B);

  PRINT("matsum [A,B] =", matsum([A, B]));

  PRINT("matsum [A,B,A] =", matsum([A, B, A]));

  PRINT("matsum [A,B,B,A] =", matsum([A, B, B, A]));

  comb = SUM([PROD([10, a]), PROD([5, b])]);

  PRINT("a =", a);

  PRINT("b =", b);

  PRINT("SUM [(PROD [10,a]), (PROD [5,b])] =", SUM([PROD([10, a]), PROD([5, b])]));

}).call(this);
