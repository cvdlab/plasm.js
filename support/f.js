
/*!
 * ƒ
 * JavaScript functional library
 * Copyright (c) 2012 Enrico Marino <enrico.marino@email.com> (onirame.no.de)
 * MIT License
 */

 !(function (exports) {

  /**
   * Library namespace.
   */

   var ƒ = exports.ƒ = exports.f = {};

  /**
   * Library version.
   */

  ƒ.version = '0.5.0';

  /**
   * apply 
   * apply the given function to the given value
   * 
   * @param {Function} [f = arguments[0]] function
   * @param {Mixed} [x = arguments[1]] value
   * @return the result of the application expression `f(x)`
   * @api public
   */
  
  ƒ.apply = function (args) {
    var f = args[0];
    var x = args[1];
    return f(x);
  };

  /**
   * aa
   * apply the given function to each element of the given array
   * 
   * @param {Function} f function
   * @param {Mixed} 
   */

  ƒ.aa = function (f) {
    return function (array) {
      return array.map(function (element) {
        return f(element);
      });
    };
  };

  /**
   * comp
   * returns the composition of the given functions
   * 
   * @param {Array} functions array of functions to compose
   * @return {Function} the composition of the given functions
   */

  ƒ.comp = function (functions) {
    return functions.reduce(function (f, g) {
      return function (x) {
        return f(g(x));
      };
    });
  };

  /**
   * comp2
   * returns the composition of the given functions
   * 
   * @param {Array} functions array of functions to compose
   * @param {Function} [functions[0]] f
   * @param {Function} [functions[1]] g
   * @return {Function} the composition of the given functions
   */

  ƒ.comp2 = function (functions) {
    var f = functions[0];
    var g = functions[1];
    return function (x) {
      return f(g(x));
    };
  };

  /**
   * cons
   * Apply each function of the given array `functions` to the given value `x`,
   * and return the array of application values
   *
   * @param {Array} functions
   * @return {Array} the array of application values
   */

  ƒ.cons = function (functions) {
    return function (x) {
      return functions.map(function (f) {
        return f(x);
      });
    };
  };

  /**
   * id
   * return the given `value`
   * 
   * @param value
   * @return the given `value`
   */

  ƒ.id = function (value) {
    return value;
  };
  
  /**
   * k
   * return a function that return the given `value`
   * 
   * @param value
   * @return {Function} a function that return `value`
   */

  ƒ.k = function (value) {
    return function () {
      return value;
    };
  };

  /**
   * cat
   * catenates `args`, an array of arrays, by eliminating a level of nesting
   *
   * @param {Array} arrays array of arrays
   * @return {Array} array created eliminating a level of nesting
   * @api public 
   */
  
  ƒ.cat = function (arrays) {
    var result = [];
    arrays.forEach(function (array) {
      result = result.concat(array);
    });
    return result;
  };

  /**
   * distl
   * distribute left: 
   * returns the `pair` sequence with `value` and the elements of `array` 
   * 
   * @param {Array} pair
   * @param {Array} [pair[0]] array
   * @param {Any}   [pair[1]] value
   * @return the `pair` sequence with `value` and the elements of `array`
   * @api public
   */

  ƒ.distl = function (pair) {
    var value = pair[0];
    var array = pair[1];
    return array.map(function (item) {
      return [value, item];
    });
  };

  /**
   * distr
   * distribute right: 
   * returns the `pair` sequence with the elements of `array` and `value`
   * 
   * @param {Array} pair
   * @param {Array} [pair[0]] array
   * @param {Any}   [pair[1]] value
   * @return the `pair` sequence with the elements of `array` and `value`
   * @api public
   */

  ƒ.distr = function (pair) {
    var array = pair[0];
    var value = pair[1];
    return array.map(function (item) {
      return [item, value];
    });
  };

  /**
   * insl
   * insert left operator  
   * given a binary associative `operator` 
   * returns a function that given an array 
   * returns the riduction of the array by the operator.
   * 
   * @param {Function} operator binary operator
   * @return {Function} function that apply `operator` to the given `array`
   * @api public
   */

  ƒ.insl = function (operator) {
    return function (array) {
      return array.reduce(operator);
    };
  };

  /**
   * insr
   * insert right operator  
   * given a binary associative `operator` 
   * returns a function that given an array 
   * returns the right riduction of the array by the operator.
   * 
   * @param {Function} operator binary operator
   * @return {Function} function that apply `operator` to the given `array`
   * @api public
   */

  ƒ.insr = function (operator) {
    return function (array) {
      return array.reduceRight(operator);
    };
  };
  
  /**
   * al
   * append left
   * append `item` on the left of `array`
   * 
   * @param {Array} pair
   * @param {Array} [pair[0]] array
   * @param {Any}   [pair[1]] item
   * @return {Array} `array` concatenated with `item`
   * @api public
   */

  ƒ.al = function (pair) {
    var array = pair[0];
    var item = pair[1];
    return array.concat([item]);
  };

  /**
   * ar
   * append right
   * append `item` on the right of `array`
   * 
   * @param {Array} pair
   * @param {Any}   [pair[0]] item
   * @param {Array} [pair[1]] array
   * @return {Array} `array` concatenated with `item`
   * @api public
   */

  ƒ.ar = function (pair) {
    var item = pair[0];
    var array = pair[1];
    return ([item]).concat(array);
  };

  /**
   * last
   * returns the last element of the given `array`
   *
   * @param {Array} array array
   * @return {Any} the last element of `array`
   * @api public
   */

  ƒ.last = function (array) {
    return array[array.length - 1];
  };

  /** 
   * list
   * returns an array containing `arg`. 
   *
   * @param {Array} arg
   * @return {Array} array containing `arg`
   * @api public
   */

  ƒ.list = function (arg) {
    return [arg];
  };

  /**
   * len
   * returns the length of the given `array`
   * 
   * @param {Array} array array
   * @return {Number} the length of the given `array`
   * @api public
   */

  ƒ.len = function (array) {
    return array.length;
  };

  /**
   * first
   * returns the first element of the given `array`.
   * 
   * @param {Array} array array
   * @return the first element of the given `array`.
   * @api public
   */ 

  ƒ.first = function (array) {
    return array[0];
  };

  /** 
   * reverse
   * returns the given `array` in reverse order
   *
   * @param {Array} array array
   * @return {Array} the given `array` in reverse order
   * @api public
   */

  ƒ.reverse = function (array) {
    var result = [];
    var i;
    for (i = array.length - 1; i >= 0; i--) {
      result.push(array[i]);
    }
    return result;
  };
  
  /**
   * tail
   * returns the non-empty `array` but its `first` element
   * 
   * @param {Array} array array
   * @return {Array} the tail of the given `array`
   * @api public
   */

  ƒ.tail = function (array) {
    return array.slice(1);
  };

  /**
   * butlast
   * returns the non-empty `array` but its `last` element
   * 
   * @return {Array} the non-empty `array` but its `last` element
   * @api public
   */

  ƒ.butlast = function (array) {
    return array.slice(0,-1);
  };

  /**
   * repeat
   * returns an array with `n` repetitions of `value`
   * 
   * @param {Number} n number of repetitions
   * @return {Function} a function that given `value` 
   *   returns an array with `n` repetitions of `value`
   * @api public
   */

  ƒ.repeat = function (n) {
    return function (value) {
      var result = [];
      var i;
      for (i = 0; i < n; i++) {
        result.push(value);
      }
      return result;
    };
  };

  /**
   * replica
   * repeat list and catenate.
   * 
   * @param {Number} n number of repetitions
   * @return {Function} a function that given `value` 
   *   returns an array with `n` repetitions of `value` concatenated
   * @api public
   */
  
  ƒ.replica = function (n) {
    return function (value) { 
      var result = [];
      var i;
      for (i = 0; i < n; i++) {
        result = result.concat(value);
      }
      return result;
    };
  };

  /**
   * bigger
   * binary operator that returns the greater of the given pair
   * 
   * @param {Array} pair
   * @return {Number} return the greater of the `pair`
   * @api public
   */

  ƒ.bigger = function (pair) {
    var a = pair[0];
    var b = pair[1];
    return a > b ? a : b;
  };

  /**
   * smaller
   * binary operator that returns the smaller of the given pair
   * 
   * @param {Array} pair
   * @return {Number} return the smaller of the `pair`
   * @api public
   */

  ƒ.smaller = function (pair) {
    var a = pair[0];
    var b = pair[1];
    return a < b ? a : b;
  };

  /**
   * biggest
   * returns the greatest of the given `values`
   * 
   * @param {Array} values values
   * @return {Number} return the greatest of the given `values`
   * @api public
   */

  ƒ.biggest = function (values) {
    return Math.max.apply(null, values);
  };

  /**
   * smallest
   * returns the smallest of the given `values`
   * 
   * @param {Array} values values
   * @return {Number} return the smallest of the given `values`
   * @api public
   */

  ƒ.smallest = function (values) {
    return Math.min.apply(null, values);
  };

  /**
   * sum
   * returns the sum of the given `values` (numbers or arrays)
   * 
   * @param {Array} values values
   * @return {Number} return the sum of the given `values`
   * @api public
   */

  ƒ.sum = function (values) {
    if (values[0] instanceof Array) {
      return values.reduce(function (prev, curr) {
        return prev.map(function (value, i) {
          return value + curr[i];
        });
      });
    }
      
    return values.reduce(function (prev, curr) {
      return prev + curr;
    });
  };

  /**
   * sub
   * returns the difference of the given `values` (numbers or arrays)
   * 
   * @param {Array} values values
   * @return {Number} return the difference of the given `values`
   * @api public
   */

  ƒ.sub = function (values) {
    if (values[0] instanceof Array) {
      return values.reduce(function (prev, curr) {
        return prev.map(function (value, i) {
          return value - curr[i];
        });
      });
    }
      
    return values.reduce(function (prev, curr) {
      return prev - curr;
    });
  };
  
  /**
   * mul
   * multiplicate the given `values`
   *    
   * @param {Array} values values
   * @return {Number} return the product of the given `values`
   * @api public
   */

  ƒ.mul = function (values) {
    if (values[0] instanceof Array) {
      return values.reduce(function (prev, curr) {
        return prev.map(function (value, i) {
          return value * curr[i];
        });
      });
    }
      
    return values.reduce(function (prev, curr) {
      return prev * curr;
    });
  };

  /**
   * div
   * divide the given `values`
   *    
   * @param {Array} values values
   * @return {Number} return the division of the given `values`
   * @api public
   */

  ƒ.div = function (values) {
    if (values[0] instanceof Array) {
      return values.reduce(function (prev, curr) {
        return prev.map(function (value, i) {
          return value / curr[i];
        });
      });
    }
      
    return values.reduce(function (prev, curr) {
      return prev / curr;
    });
  };
  
  /** 
   * cart
   * cartesian product
   * 
   * @param {Array} args
   * @return {Array} the cartesian product of `args`
   * @api public
   */

  ƒ.cart = function (args) {
    return args.reduce(function (a, b) {
      var ret = [];
      a.forEach(function (a) {
        b.forEach(function (b) {
          ret.push(a.concat([b]));
        });
      });
      return ret;
    }, [[]]);
  };

  /**
   * Math constant
   */

  /**
   * E
   *
   * @constant
   */

  ƒ.E = Math.E;

  /**
   * LN2
   *
   * @constant
   */

  ƒ.LN2 = Math.LN2;

  /**
   * LN10
   *
   * @constant
   */

  ƒ.LN10 = Math.LN10;

  /**
   * LOG2E
   *
   * @constant
   */

  ƒ.LOG2E = Math.LOG2E;

  /**
   * LOG10E
   *
   * @constant
   */

  ƒ.LOG10E = Math.LOG10E;

  /**
   * PI
   *
   * @constant
   */

  ƒ.PI = Math.PI;

  /**
   * SQRT1_2
   *
   * @constant
   */

  ƒ.SQRT1_2 = Math.SQRT1_2;

  /**
   * SQRT2
   *
   * @constant
   */

  ƒ.SQRT2 = Math.SQRT2;

  /**
   * abs
   * returns the absolute value of the given number
   *
   * @param {Number} number
   * @return {Number} the absolute value of the given number
   * @api public
   */

  ƒ.abs = Math.abs;

  /**
   * acos
   * returns the arc-cosine of the given number
   *
   * @param {Number} number
   * @return {Number} the arc-cosine of the given number
   * @api public
   */

  ƒ.acos = Math.acos;

  /**
   * asin
   * returns the arc-sine of the given number
   *
   * @param {Number} number
   * @return {Number} the arc-sine of the given number
   * @api public
   */

  ƒ.asin = Math.asin;

  /**
   * atan
   * returns the arc-tangent of the given number
   *
   * @param {Number} number
   * @return {Number} the arc-tangent of the given number
   * @api public
   */

  ƒ.atan = Math.atan;

  /**
   * atan2
   * returns the squared arc-tangent of the given number
   *
   * @param {Number} number
   * @return {Number} the squred arc-tangent of the given number
   * @api public
   */

  ƒ.atan2 = Math.atan2; 

  /**
   * ceil
   * returns the ceil of the given number
   *
   * @param {Number} number
   * @return {Number} the ceil of the given number
   * @api public
   */

  ƒ.ceil = Math.ceil; 

  /**
   * cos
   * returns the cosine of the given number
   *
   * @param {Number} number
   * @return {Number} the cosine of the given number
   * @api public
   */

  ƒ.cos = Math.cos; 

  /**
   * exp
   * returns the exponential of the given value (e^value)
   *
   * @param {Array} pair
   * @param {Number} [pair[0]] value
   * @param {Number} [pari[1]] n
   * @return {Number} the `n`-th power of the given number
   * @api public
   */

  ƒ.exp = Math.exp;

  /**
   * floor
   * returns the floor of the given number
   *
   * @param {Number} value
   * @return {Number} the floor of the given number
   * @api public
   */

  ƒ.floor = Math.floor;

  /**
   * log
   * returns the log of the given number
   *
   * @param {Number} value
   * @return {Number} the log of the given number
   * @api public
   */

  ƒ.log = Math.log;

  /**
   * floor
   * returns the floor of the given number
   *
   * @param {Number} value
   * @return {Number} the floor of the given number
   * @api public
   */

  ƒ.floor = Math.floor;

  /**
   * power
   * returns the n-th power of the given value (value^n)
   *
   * @param {Array} pair
   * @param {Number} [pair[0]] value
   * @param {Number} [pari[1]] n
   * @return {Number} the `n`-th power of the given number
   * @api public
   */

  ƒ.pow = function (pair) {
    return Math.exp.apply(pair);
  }; 

  /**
   * random
   * returns a random number in [0, 1) interval
   *
   * @return {Number} a random number in [0, 1) interval
   * @api public
   */

  ƒ.random = Math.random;  

  /**
   * round
   * returns the given number rounded 
   *
   * @return {Number} the given number rounded
   * @api public
   */

  ƒ.round = Math.round;  

  /**
   * sin
   * returns the sine of the given number
   *
   * @return {Number} the sin of the given number
   * @api public
   */

  ƒ.sin = Math.sin;  

  /**
   * sqrt
   * returns the squared root of the given number
   *
   * @return {Number} the squared root of the given number
   * @api public
   */

  var sqrt = 
  ƒ.sqrt = Math.sqrt; 

  /**
   * tan
   * returns the tan of the given number
   *
   * @return {Number} the tan of the given number
   * @api public
   */

  ƒ.tan = Math.tan;

  /**
   * trans
   * transpose the given matrix
   *
   * @param {Array} matrix matrix
   * @return {Array} the transpose of the given matrix
   * @api public
   */

  ƒ.trans = function (matrix) {
    var result = [];

    matrix.forEach(function (row, i) {
      row.forEach(function (value, j) {
        (result[j] = result[j] || [])[i] = value;
      });
    });

    return result;
  };

  /**
   * prod
   * product scalar by vector
   *
   * @param {Array} pair
   * @param {Number} [pair[0]] scalar
   * @param {Array} [pair[1]] vector
   * @return {Array} the given `vector` scaled by the given `scalar`
   * @api public
   */

  ƒ.prod = function (pair) {
    var scalar = pair[0];
    var vector = pair[1];
    var result = vector.map(function (value) {
      return scalar * value;
    });
    return result;
  };

  /**
   * innerprod
   * inner (or scalar) product
   *
   * @param {Array} pair
   * @param {Array} [pair[0]] v1
   * @param {Array} [pair[1]] v2
   * @return {Number} the inner producto of the given vectors
   * @api public
   */

  ƒ.innerprod = function (pair) {
    var v1 = pair[0];
    var v2 = pair[1];
    var result = 0;
    v1.forEach(function (value, i) {
      result += value * v2[i];
    });
    return result;
  };

  /**
   * vectnorm
   * returns the norm of the given `vector`
   *
   * @param {Array} vector
   * @return {Array} the the norm of the given `vector`
   * @api public
   */

  var vectnorm = 
  ƒ.vectnorm = function (vector) {
    return sqrt(vector.reduce(function (prev, current) {
      return prev + current * current;
    }, 0));
  };

  /**
   * unitvect
   * returns the unit vector of the given `vector`
   *
   * @param {Array} vector
   * @return {Array} the the unit vector of the given `vector`
   * @api public
   */

  var unitvect = 
  ƒ.unitvect = function (vector) {
    var norm = vectnorm(vector);
    var result = vector.map(function (value) {
      return value / norm;
    });
    return result;
  };

  /**
   * matsum
   * matrix sum
   *
   * @param {Array} pair
   * @param {Array} [pair[0]] m1
   * @param {Array} [pair[1]] m2
   * @return {Array} the sum of of the given matrices
   * @api public
   */

  var matsum = 
  ƒ.matsum = function (pair) {
    var m1 = pair[0];
    var m2 = pair[1];
    var result = [];
    m1.forEach(function (row, i) {
      result[i] = [];
      row.forEach(function (value, j) {
        result[i][j] = value + m2[i][j];
      });
    })
    return result;
  };

  /**
   * matprod
   * matrix product
   *
   * @param {Array} pair
   * @param {Array} [pair[0]] m1
   * @param {Array} [pair[1]] m2
   * @return {Array} the matrix product of of the given matrices
   * @api public
   */

  var matprod = 
  ƒ.matprod = function (pair) {
    var m1 = pair[0];
    var m2 = pair[1];
    var n = m1.length;
    var m = m1[0].length;
    var i;
    var j;
    var k;
    var result = [];

    for (i = 0; i < n; i += 1) {
      result[i] = [];
      for (j = 0; j < m; j += 1) {
        result[i][j] = 0;
      }
    }

    for (i = 0; i < n; i += 1) {
      for (j = 0; j < m; j += 1) {
        for (k = 0; k < m; k += 1) {
          result[i][j] += m1[i][k] * m2[k][j];
        }
      }
    }

    return result;
  };

  /**
   * identity
   * matrix identity
   *
   * @param {Number} n dim of the identity matrix
   * @return {Array} an identity n x n matrix
   * @api public
   */

  var identity = 
  ƒ.identity = function (n) {
    var result = [];
    var i;

    for (i = 0; i < n; i += 1) {
      result[i] = [];
      for (j = 0; j < n; j += 1) {
        result[i][j] = (i === j) ? 1 : 0;
      }
    }

    return result;
  };

  /**
   * vectprod
   * vector product
   *
   * @param {Array} pair
   * @param {Array} [pair[0]] u
   * @param {Array} [pair[1]] v
   * @return {Array} the vector product of the given vectors
   * @api public
   */

  var vectprod = 
  ƒ.vectprod = function (pair) {
    var u = pair[0];
    var v = pair[1];
    var result = [];

    result[0] = u[1]*v[2] - u[2]*v[1];
    result[1] = u[2]*v[0] - u[0]*v[2];
    result[2] = u[0]*v[1] - u[1]*v[0];

    return result;
  };

  /**
   * mat
   * create a nxm matrix from the given vector
   *
   * @param {Array} dims
   * @param {Array} [dims[0]] n number of rows
   * @param {Array} [pair[1]] m number of cols
   * @return {Function} 
   *   @param {Array} vector
   *   @return {Array} matrix nxm from `vector` values
   * @api public
   */

  var mat = 
  ƒ.mat = function (dims) {
    var n = dims[0];
    var m = dims[1];

    return function (vector) {
      var result = [];
      var i;

      for (i = 0; i < n; i += 1) {
        result[i] = vector.slice(i*m, i*m+m);
      }
      
      return result;
    };
  };

}(this));