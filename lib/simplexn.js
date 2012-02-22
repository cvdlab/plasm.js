
/*!
 * simplexn
 * dimension-independent geometric kernel based on simplicial complex
 * Copyright (c) 2011 cvd-lab <cvd-lab@email.com> (https://github.com/cvd-lab/)
 * MIT License
 */

!(function (exports) {

  /**
   * Variables.
   */

  var undefined
    , cos = Math.cos
    , sin = Math.sin
    ;


  /**
   * Library namespace.
   */

  var simplexn = exports.simplexn = {};

  /**
   * Library version.
   */

  simplexn.version = '0.0.0';

  /**
   * flat
   * Return a flat version of the given array of arrays.
   * 
   * @param {Array} arrays
   * @return {Array} array
   * @api private
   */

  simplexn._flat = function (arrays) {
    var res = [];

    arrays.forEach(function (item) {
      res = res.concat(item);
    });

    return res;
  };

  /**
   * PointSet
   * 
   * @constructor
   * @param {Array|Float32Array} vertices
   * @param {Number} dim
   * @api public
   */

  simplexn.PointSet = function (vertices, dim) {
    var vertices = vertices || [[]]
      , dim = dim || vertices[0].length
      ;

    vertices = vertices instanceof Array ? simplexn._flat(vertices) : vertices;
    this.vertices = new Float32Array(vertices);
    this.dim = dim;
  };

  /** 
   * clone
   * 
   * @return {PointSet} clone
   * @api public
   */

  simplexn.PointSet.prototype.clone = function () {
    var clone = new simplexn.PointSet(this.vertices, this.dim);
    return clone;
  };

  /**
   * equals 
   * 
   * @param {simplexn.PointSet} pointSet
   * @return {Boolean} true if this is equals to the given point set, false otherwise.
   * @api public
   */

  simplexn.PointSet.prototype.equals = function (pointSet) {
    var vertices1 = this.vertices
      , vertices2 = pointSet.vertices
      , dim1 = this.dim
      , dim2 = pointSet.dim
      , length1 = vertices1.length
      , length2 = vertices2.length
      ;

    if (dim1 !== dim2) return false;
    if (length1 !== length2) return false;
    
    while (--length1) {
      if (vertices1[length1] !== vertices2[length1]) return false;
    }

    return true;
  };


  /**
   * get
   * 
   * @param {Number} index
   * @return {Float32Array} the indexed vertex
   * @api public
   */

  simplexn.PointSet.prototype.get = function (index) {
    return this.vertices.subarray(index, index + this.dim);
  };

  /**
   * set
   * 
   * @param {Number} index
   * @param {Array|Float32Array} vertex
   * @return {simplexn.PointSet} this for chaining
   * @api public
   */

  simplexn.PointSet.prototype.set = function (index, vertex) {
    this.vertices.set(vertex, index);
    return this;
  };

  /**
   * forEach
   * 
   * @param {Function} iterator
   * @return {simplexn.PointSet} this for chaining
   * @api public
   */

  simplexn.PointSet.prototype.forEach = function (iterator) {
    var vertices = this.vertices
      , length = vertices.length
      , dim = this.dim
      , i = 0
      , p
      ;

    while (i < length) {
      p = new Float32Array(vertices.subarray(i, i += dim));
      iterator(p);
    }

    return this;
  };

  /**
   * map
   * 
   * @param {Function} iterator
   * @return {simplexn.PointSet} a new point set
   * @api public
   */

  simplexn.PointSet.prototype.map = function (iterator) {
    var vertices = this.vertices
      , length = vertices.length
      , dim = this.dim
      , i
      ;

    for (i = 0; i < length; i += dim) {
      vertices.set(iterator(vertices.subarray(i, i + dim)), i);
    } 
    
    return this;
  };

  /**
   * filter
   * 
   * @param {Function} iterator
   *   
   * @return {Float32Array} new filtered PointSet
   * @api public
   */

  simplexn.PointSet.prototype.filter = function (iterator) {
    var vertices = this.vertices
      , length = vertices.length
      , newVertices = new Float32Array(length)
      , dim = this.dim
      , i = 0
      , j = 0
      , point
      , pointset
      ;

    for (i = 0; i < length; i += dim) {
      point = new Float32Array(vertices.subarray(i, i + dim));
      if (iterator(point)) {
        newVertices.set(point, j);
        j += dim;
      }
    }

    pointset = new simplexn.PointSet(newVertices.subarray(0, j), dim);
    
    return pointset;
  };

  /**
   * merge
   * Filter duplicated and overlapped vertices 
   * according to precision parameter (10e-7 by default).
   * 
   * @param {Number} [precision = 10e-4] 
   * @return {Float32Array} inidices mapping changes
   * @api public
   */

  simplexn.PointSet.prototype.merge = function (precision) {
    var precision = precision || 1e-4
      , vertices = this.vertices
      , length = vertices.length
      , dim = this.dim
      , indices = new Uint32Array(length/dim)
      , newVertices = new Float32Array(length)
      , usedIndices = 0
      , usedCoords = 0
      , vertexAdded
      , equals
      , i
      , j
      , k
      ;

    for (i = 0; i < length; i += dim) {
      vertexAdded = false;
      for (j = 0; j < usedCoords && !vertexAdded; j += dim) {
        equals = true;
        for (k = 0; k < dim; k += 1) {
          vertices[i+k] = Math.round(vertices[i+k]/precision)*precision;
          equals &= vertices[i+k] === newVertices[j+k];
        }
        vertexAdded |= equals; 
      }
      indices[i/dim] = !vertexAdded ? usedIndices : j/dim-1;
      if (!vertexAdded) {
        for (k = 0; k < dim; k += 1) {
          newVertices[usedCoords+k] = vertices[i+k];
        }
        usedIndices += 1;
        usedCoords = usedIndices*dim;
      }
    }

    this.vertices = newVertices.subarray(0, usedCoords);

    return indices;
  };

  /**
   * rotate
   * 
   * @param {Array|Uint32Array} dims
   * @param {Number} angle
   * @return {simplexn.PointSet} this for chaining
   * @api public
   */

  simplexn.PointSet.prototype.rotate = function (dims, angle) {
    var vertices = this.vertices
      , length = vertices.length
      , dim = this.dim
      , cos_a = cos(angle)
      , sin_a = sin(angle)
      , r_ii = cos_a
      , r_ij = -sin_a
      , r_ji = sin_a
      , r_jj = cos_a
      , d_i = dims[0]
      , d_j = dims[1]
      , v_i
      , v_j
      , i
      , j
      , k
      ;

    for (k = 0; k < length; k += dim, i = k + d_i, j = k + d_j) {
      v_i = vertices[i];
      v_j = vertices[j];
      vertices[i] = v_i * r_ii + v_j * r_ij;
      vertices[j] = v_i * r_ji + v_j * r_jj;
    }
    
    return this;
  };

  /**
   * scale
   * 
   * @param {Array|Uint32Array} dims
   * @param {Array|Float32Array} values
   * @return {simplexn.PointSet} this for chaining
   * @api public
   */

  simplexn.PointSet.prototype.scale = function (dims, values) {
    var vertices = this.vertices 
      , length = vertices.length
      , dim = this.dim
      , i
      , j
      ;

    for (i = 0; i < length; i += dim) {
      for (j = 0; j < dims; j += 1) {
        vertices[i+dims[j]] *= values[j]; 
      }
    }
    return this;
  };

  /**
   * translate
   * 
   * @param {Array|Uint32Array} dims
   * @param {Array|Float32Array} values
   * @return {simplexn.PointSet} this for chaining
   * @api public
   */

  simplexn.PointSet.prototype.translate = function (dims, values) {
    var vertices = this.vertices 
      , length = vertices.length
      , dim = this.dim
      , i
      , j
      ;

    for (i = 0; i < length; i += dim) {
      for (j = 0; j < dims; j += 1) {
        vertices[i+dims[j]] += values[j]; 
      }
    }
    return this;
  };

  /**
   * transform
   * 
   * @param {Array|Float32Array} matrix
   * @return {simplexn.PointSet} this for chaining
   * @api public
   */

  simplexn.PointSet.prototype.transform = function (matrix) {
    // body...
    
    return this;
  };

  /**
   * embed
   * 
   * @param {Number} dim
   * @return {simplexn.PointSet} this for chaining
   * @api public
   */

  simplexn.PointSet.prototype.embed = function (dim) {
    var dim = dim || this.dim + 1
      , old_dim = this.dim
      , min_dim = Math.min(old_dim, dim)
      , old_vertices = this.vertices
      , old_length = old_vertices.length
      , length = old_length / old_dim * dim
      , vertices = new Float32Array(length)
      , i
      , j
      , k
      ;

    for (i = 0, j = 0; i < old_length; i += old_dim, j += dim) {
      for (k = 0; k < min_dim; k += 1) {
        vertices[j + k] = old_vertices[i + k];
      }
    }

    this.vertices = vertices;
    this.dim = dim;
    
    return this;
  };

  /**
   * _computeTopology
   * 
   * @param {Array} arrays
   * @return {Array[Uint32Array]} topology
   * @api private
   */

  simplexn._computeTopology = function (faces, dim) {
    var dim = dim || faces[0].length - 1
      , res = new Array(dim)
      , nFacesMaxDim
      , facesMaxDim
      , sup
      , temp
      , len
      , nFaces
      , lenFace
      , d
      , f
      , i
      , j
      , k
      , is1
      , is2
      ;

    res[0] = new Uint32Array();

    if (typeof faces[0] === "number") {
      nFacesMaxDim = faces.length / dim;
      facesMaxDim = faces;
    } else {
      nFacesMaxDim = faces.length
      facesMaxDim = simplexn._flat(faces);
    }

    res[dim] = new Uint32Array(facesMaxDim);

    for (d = dim; d > 1; d--) {
      sup = res[d];
      len = sup.length;
      lenFace = d + 1;
      nFaces = len / lenFace;
      temp = new Uint32Array(lenFace * nFaces * d);
      res[d-1] = temp;
      k = 0;
      for (f = 0; f < len; f += lenFace) {
        for (i = 0; i < lenFace; i++) {
          for (j = 0; j < lenFace; j++) {
            if (i != j) {
              temp[k] = sup[f+j];
              k++;
            }
          }
          if (i & 1) { // is odd
            is1 = k-lenFace+1;
            is2 = k-1;
            temp[is1] ^= temp[is2];
            temp[is2] ^= temp[is1];
            temp[is1] ^= temp[is2];
          }
        }
      }
    }

    return res;
  };

  /**
   * SimplicialComplex
   * 
   * @constructor
   * @param {Array|Float32Array} vertices
   * @faces {Array|Uint32Array} faces
   * @param {Number} [dim]
   * @api public
   */

  simplexn.SimplicialComplex = function (vertices, faces, dim) {
    var vertices = vertices || [[]];
    var faces = faces || [[]];
    var dim = dim || vertices[0].length;

    this.dim = dim;
    this.vertices = new simplexn.PointSet(vertices, dim);
    this.topology = simplexn._computeTopology(faces, dim);
    this.faces = this.topology[dim];
  };

  /**
   * rotate
   * 
   * @param {Array|Uint32Array} dims
   * @param {Number} angle
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.rotate = function (dims, angle) {
    this.vertices.rotate(dims, angle);
    return this;
  };

  /**
   * scale
   * 
   * @param {Array|Uint32Array} dims
   * @param {Array|Float32Array} values
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.scale = function (dims, values) {
    this.vertices.scale(dims, values);
    return this;
  };

  /**
   * translate
   * 
   * @param {Array|Uint32Array} dims
   * @param {Array|Float32Array} values
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.translate = function (dims, values) {
    this.vertices.translate(dims, values);
    return this;
  };

  /**
   * transform
   * 
   * @param {Array|Float32Array} matrix
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.transform = function (matrix) {
    this.vertices.transform(matrix);
    return this;
  };

  /**
   * embed
   * 
   * @param {Number} dim
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.embed = function (dim) {
    this.vertices.embed(dim);
    return this;
  };

  /**
   * clone
   * 
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.clone = function () {
    var simplicialcomplex = new simplexn.SimplicialComplex();
    simplicialcomplex.vertices = this.vertices.clone();
    return this;
  };

  /**
   * map
   * 
   * @param {Function} mapping
   * @param {Boolean} merge
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.map = function (mapping, merge) {
    this.vertices.map(mapping);
    if (merge) this.vertice.merge();
    return this;
  };

  /**
   * extrude
   * 
   * @param {Array|Float32Array} hlist
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.extrude = function (hlist) {};

  /**
   * explode
   * 
   * @param {Array|Uint32Array} dims
   * @param {Array|Float32Array} values
   * @return {simplexn.PointSet} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.getFacet = function (dim, index) {
    var topology = this.topology;
    var pointset = this.vertices;
    var facets = this.topology[dim];
    var facet = facets.subarray(dim*index, dim*index + dim);
    var vertices = new Array(dim);

    for (var i = 0; i < dim; i += 1) {
      vertices[i] = pointset.get(facet[i]);
    }

    return vertices;
  };

  simplexn.SimplicialComplex.prototype.explode = function (dims, values) {
    var exploded = this.clone().scale(dims, values);
    var dim = this.topology.length - 1;
    var cells = this.topology[dim];
    var exploded_cells = exploded.topology[dim];

    for (var i = 0; i < cells.length; i += dim) {
      // TODO: waiting for refactoring...
    }

    return this;
  };

  /**
   * skeleton
   * 
   * @param {Number} dim
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.skeleton = function (dim) {
    var skeleton = this.clone()
      , topology = skeleton.topology
      , out = topology.length - dim
      ;

    while (--out) topology.pop();

    return skeleton;
  };

  /**
   * boundary
   * 
   * @param {Number} dim
   * @return {simplexn.SimplicialComplex} this for chaining
   * @api public
   */

  simplexn.SimplicialComplex.prototype.removeFacet = function (dim, index) {
    var topology = this.topology
      , facets
      , i
      ;

    for (i = 1; i < dim; i += 1) {
      facets = topology[i];
      topology[i] = new Uint32Array(facets.length - dim);
      topology[i].set(
        facets.subarray(index*dim, index*dim + dim),
        facets.subarray(index*dim + dim));
    }
  };

  simplexn.SimplicialComplex.prototype.boundary = function (dim) {
    var boundary = this.skeleton()
      , topology = boundary.topology
      , facet_i
      , facet_j
      , i
      , j
      , d
      , k_i
      , k_j
      , diff = false;
      ;

    for (i = 0; i < topology[dim].length; i += diff ? 0 : dim) {
      facet_i = topology[dim].subarray(i, i + dim);
      for (j = i + dim; j < facets.length; j += dim) {
        facet_j = topology[dim].subarray(j, j + dim);
        
        diff = false;
        for (k_i = 0; k_i < dim && !diff; k_i += 1) {
          for (k_j = 0; k_j < dim && !diff; k_j += 1) {
            diff = diff || facet_i[k_i] !== facet_j[k_j];
          }
        }
        
        if (!diff) {
          this.removeFacet(dim, j / dim);
        }
      }
    }

    return boundary;
  };

}(this));