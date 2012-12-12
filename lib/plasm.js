
/*!
 * plasm.js
 * JavaScript Programming Language for Solid Modeling
 * Copyright (c) 2012 cvd-lab <cvdlab@email.com> (https://github.com/cvd-lab/)
 * MIT License
 */

 !(function (exports) {

  var toString = {}.toString;
  var max = Math.max;
  var min = Math.min;
  var abs = Math.abs;

  var THREE = exports.THREE;
  var Detector = exports.Detector;
  var simplexn = exports.simplexn;

  /**
   * Library namespace.
   */

  var plasm = exports.plasm = {};

  /**
   * Library version.
   */

  plasm.version = '0.2.0';

  /**
   * Module dependencies.
   */

  if (typeof module !== 'undefined' && module.exports) { // running under node.js
    THREE = require("./../support/three.js").THREE;
    THREE.EnhancedTrackballLightControls = function () {};
    simplexn = require("./../node_modules/simplexn.js/lib/simplexn.js").simplexn;
    plasm.Viewer = exports.Plasm = function () {};
  } else { // running under browser

  /*
   * @intro Create the plasm viewer.
   * @param {Element} container
   * @param {Element} inspector
   * @api public
   */

  var Plasm = exports.Plasm =
  plasm.Viewer = function (container, inspector) {
    if (!(this instanceof plasm.Viewer)) {
      return new plasm.Viewer(container);
    }
    // if (!Detector.webgl) {
    //   Detector.addGetWebGLMessage();
    // }
    if (typeof container === 'string') {
      container = document.getElementById(container);
    }
    if (typeof container === 'undefined') {
      container = window;
    }
    if (typeof inspector === 'string') {
      inspector = document.getElementById(inspector);
    }

    $container = $(container);

    var scene = this.scene = new plasm.Scene();

    var camera = this.camera = new plasm.Camera();
    scene.add(camera);

    var controls = this.controls = new plasm.Controls(camera, scene, {container: container});

    var light = this.light = new THREE.AmbientLight(0xeeeeee);
    scene.root.add(light);

    var axes = this.axes();
    axes.draw();

    var engine = Detector.webgl ? THREE.WebGLRenderer : THREE.CanvasRenderer;
    var renderer = this.renderer = new engine({ antialias: true });
    renderer.setClearColorHex(0xefefef, 1);
    resize();

    this.container = container;
    this.container.appendChild(this.renderer.domElement);

    if (inspector) {
      var stats = this.stats = new Stats();
      inspector.appendChild(stats.domElement);
    }

    function animate () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene.root, camera.optics);
      if (inspector) stats.update();
    }

    function resize () {
      var width = $container.width();
      var height = $container.height();
      if (height === 0) { height = $(window).height(); }

      camera.optics.aspect = width / height;
      camera.optics.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener('resize', resize, false);

    console.log('Plasm.js');

    animate();

  };

  /**
   * Create a scene.
   *
   * @return {plasm.Scene} scene
   * @api public
   */

  plasm.Scene = function () {
    this.root = new THREE.Scene();
  };

  /**
   * Add object to the scene.
   *
   * @param {plasm.Model}
   * @return {plasm.Scene} for chaining
   * @api public
   */

  plasm.Scene.prototype.add = function (object) {
    if (object instanceof plasm.Camera) {
      this.root.add(object.optics);
      return this;
    }
    if (object instanceof plasm.Model) {
      this.root.add(object.mesh);
      return this;
    }
    return this;
  };

  /**
   * Remove object from the scene.
   *
   * @param {plasm.Model}
   * @return {plasm.Scene} for chaining
   * @api public
   */

  plasm.Scene.prototype.remove = function (object) {
    if (object instanceof plasm.Camera) {
      this.root.remove(object.optics);
      return this;
    }
    if (object instanceof plasm.Model) {
      this.root.remove(object.mesh);
      return this;
    }
    return this;
  };

  /**
   * Return scene bounding sphere's radius.
   *
   * @return {Number} boundingRadius
   * @api public
   */

  plasm.Scene.prototype.getBoundingRadius = function () {
    var radius = 0;
    var geometry;
    var position;
    var maxPos;

    THREE.SceneUtils.traverseHierarchy(this.root, function (obj) {
      if (obj instanceof THREE.Object3D && obj.geometry && obj.geometry.vertices.length) {

        geometry = obj.geometry;
        geometry.computeBoundingSphere();
        position = obj.position;
        maxPos = max(abs(position.x), abs(position.y), abs(position.z));
        radius = max(radius, geometry.boundingSphere.radius + maxPos);
      }
    });

    return radius;
  };

  /**
   * Return centroid of the scene.
   *
   * @return {THREE.Vector3} centroid
   * @api public
   */

  plasm.Scene.prototype.getCentroid = function () {
    var centroid = new THREE.Vector3();
    var geometry;
    var position;
    var bbox;
    var p = {
        max: new THREE.Vector3()
      , min: new THREE.Vector3()
    };

    THREE.SceneUtils.traverseHierarchy(this.root, function (obj) {
      if (obj instanceof THREE.Object3D && obj.geometry && obj.geometry.vertices.length) {

        geometry = obj.geometry;
        geometry.computeBoundingBox();
        bbox = geometry.boundingBox;
        p.max.x = max(p.max.x, bbox.max.x);
        p.max.y = max(p.max.y, bbox.max.y);
        p.max.z = max(p.max.z, bbox.max.z);
        p.min.x = min(p.min.x, bbox.min.x);
        p.min.y = min(p.min.y, bbox.min.y);
        p.min.z = min(p.min.z, bbox.min.z);
      }
    });

    return centroid.add(p.max, p.min).divideScalar(2);
  };

  /**
   * Create a camera.
   *
   * @param {Object} options options
   * @param {Number} [options.fov = 60] field of view
   * @param {Number} [options.aspect = 1] aspect
   * @param {Number} [options.near = 1] near
   * @param {Number} [options.far = 10000] far
   * @return {plasm.Camera} camera
   * @api public
   */

  plasm.Camera = function (options) {
    if (!(this instanceof plasm.Camera)) {
      return new plasm.Camera(options);
    }

    var options = options || {};
    var fovy = options.fovy || 60;
    var aspect = options.aspect || window.innerWidth / window.innerHeight;
    var near = options.near || 0.1;
    var far = options.far || 10000;
    var optics;
    var controls;

    optics = new THREE.PerspectiveCamera(fovy, aspect, near, far);
    optics.fovy = fovy;
    optics.aspect = aspect;
    optics.near = near;
    optics.far = far;
    optics.position.x = 5;
    optics.position.y = 5;
    optics.position.z = 5;

    this.optics = optics;
  };

  /**
   * Create camera controls.
   *
   * @param {plasm.Camera} camera camera to control
   * @param {Object} options options
   * @param {Number} [options.rotateSpeed = 5.0] rotate speed
   * @param {Number} [options.panSpeed = 0.8] pan speed
   * @param {Boolean} [options.noZoom = false] no zoom flag
   * @param {Boolean} [options.noPan = false] no pan flag
   * @param {Boolean} [options.staticMoving = true] static moving flag
   * @param {Number} [options.dynamicDampingFactor = 0.3] dynamic damping factor
   * @param {Array} [options.keys = [65, 83, 68]] control keys
   * @return {plasm.Controls} controls
   * @api public
   */

  plasm.Controls = function (camera, scene, options) {
    if (!(this instanceof plasm.Controls)) {
      return new plasm.Controls(camera, scene, options);
    }

    var options = options || {};
    var controls;

    controls = new THREE.EnhancedTrackballLightControls(camera.optics, scene, options.container);
    controls.rotateSpeed = options.rotateSpeed || 5.0;
    controls.zoomSpeed = options.zoomSpeed || 1.2;
    controls.panSpeed = options.panSpeed || 0.8;
    controls.noZoom = options.noZoom || false;
    controls.noPan = options.noPan || false;
    controls.dynamicDampingFactor = options.dynamicDampingFactor || 0.1;

    this.controls = controls;
  };

  /**
   * Update.
   *
   * @return {plasm.Controls} for chaining
   * @api public
   */

  plasm.Controls.prototype.update = function () {
    this.controls.update();
    return this;
  };

} // end browser-only stuff

  /**
   * Materials
   */

  plasm.materials = {};

  plasm.materials.PointMaterial = function () {
    return new THREE.ParticleBasicMaterial({
      color: 0x000000,
      size: 0.2
    });
  };

  plasm.materials.LineMaterial = function () {
    return new THREE.LineBasicMaterial({
        color: 0x292929
      , opacity: 1
      , linewidth: 2
    });
  };

  plasm.materials.MeshMaterial = function () {
    return new THREE.MeshLambertMaterial({
        color: 0xD7D7D7
      , wireframe: Detector !== undefined ? !Detector.webgl : false
      , shading: THREE.FlatShading
      , vertexColors: THREE.FaceColors
    });
  };

  plasm.materials.cloneColor = function (materialFrom, materialTo) {
    var color = materialFrom.color;
    materialTo.color.setRGB(color.r, color.g, color.b);
    materialTo.opacity = materialFrom.opacity !== undefined ? materialFrom.opacity : 1;
    materialTo.transparent = materialFrom.transparent !== undefined ? materialFrom.transparent : false;
  }

  /**
   * Create the model of the given simplicial complex
   * and add it to the scene of the given viewer.
   *
   * @param {simplexn.SimplicialComplex} complex
   * @param {plasm.Viewer} viewer
   * @return {plasm.Model} model
   * @api public
   */

  /**
   * parse
   * parse a Model or Struct JSON or string data
   *
   * @param {Object|String} json
   * @param {plasm.Viewer} viewer
   * @return {plasm.Model|plasm.Struct} model
   */

  plasm.parse = function (data, viewer) {
    if (viewer === undefined) {
      throw new Error('VIEWER is mandatory to parse data');
    }

    var json = typeof data === "string" ? JSON.parse(data) : data;

    if ('models' in json && 'structs' in json) {
      return plasm.Struct.fromJSON(json, viewer);
    } else {
      return plasm.Model.fromJSON(json, viewer);
    }
  };

  exports.DRAW_SINGLE_SIDE = false;

  plasm.Model = function (complex, viewer) {
    if (!(this instanceof plasm.Model)) {
      return new plasm.Model(complex, viewer);
    }

    var complex = complex || new simplexn.SimplicialComplex();
    var pointset = complex.pointset;
    var topology = complex.topology;
    var dim = topology.dim;
    var cells, n_cells, i_cell;
    var v1, v2, v3;

    var geometry = new THREE.Geometry();
    var material;
    var mesh;

    if (dim <= 0) {
      cells = topology.cells0d();
      n_cells = cells.length;

      for (i_cell = 0; i_cell < n_cells; i_cell += 1) {
        v1 = pointset.get(cells[i_cell]);
        geometry.vertices.push(new THREE.Vertex(
          new THREE.Vector3(v1[0] || 0, v1[1] || 0, v1[2] || 0)
        ));
      }

      material = new plasm.materials.PointMaterial();
      mesh = new THREE.ParticleSystem(geometry, material);
    }

    if (dim === 1) {
      cells = topology.complexes[1];
      n_cells = cells.length;

      for (i_cell = 0; i_cell < n_cells; i_cell += 2) {
        v1 = pointset.get(cells[i_cell + 0]);
        v2 = pointset.get(cells[i_cell + 1]);
        geometry.vertices.push(new THREE.Vertex(
          new THREE.Vector3(v1[0], v1[1], v1[2])
        ));
        geometry.vertices.push(new THREE.Vertex(
          new THREE.Vector3(v2[0], v2[1], v2[2])
        ));
      }

      material = new plasm.materials.LineMaterial();
      mesh = new THREE.Line(geometry, material, THREE.LinePieces);
    }

    if (dim >= 2) {
      cells = topology.complexes[2];
      n_cells = cells.length;

      pointset.forEach(function (v) {
        geometry.vertices.push(new THREE.Vertex(
          new THREE.Vector3(v[0] || 0, v[1] || 0, v[2] || 0)
        ));
      });

      for (i_cell = 0; i_cell < n_cells; i_cell += 3) {
        geometry.faces.push(new THREE.Face3(
          cells[i_cell + 0], cells[i_cell + 1], cells[i_cell + 2]
        ));
        if (! exports.DRAW_SINGLE_SIDE) {
          geometry.faces.push(new THREE.Face3(
          cells[i_cell + 2], cells[i_cell + 1], cells[i_cell + 0]
        ));
        }
      }

      geometry.computeCentroids();
      geometry.mergeVertices();
      geometry.computeFaceNormals();

      material = new plasm.materials.MeshMaterial();
      mesh = new THREE.Mesh(geometry, material);
    }

    this.complex = complex;
    this.geometry = geometry;
    this.geometry.dynamic = true;
    this.material = material;
    this.mesh = mesh;
    this.mesh.matrixAutoUpdate = true;
    this.mesh.doubleSided = exports.DRAW_SINGLE_SIDE ? true : false;
    this.viewer = viewer;
  };

  /**
   * Clone
   *
   * @return {plasm.Clone} clone
   * @api public
   */

  plasm.Model.prototype.clone = function () {
    var model =  new plasm.Model(this.complex.clone(), this.viewer);
    plasm.materials.cloneColor(this.material, model.material);

    return model;
  };

  /**
   * toJSON
   * return a JSON of Model data
   *
   * @return {Object} model
   * @api public
   */

  plasm.Model.prototype.toJSON = function () {
    var json = {};
    var material = this.material;
    var color = material.color;

    json.complex = this.complex.toJSON();
    json.color = new Array(4);
    json.color[0] = color.r;
    json.color[1] = color.g;
    json.color[2] = color.b;
    json.color[3] = material.opacity;

    return json;
  };

  /**
   * fromJSON
   * instantiate a model from a serialized model
   *
   * @param {Object|String} json
   * @param {plasm.Viewer} viewer
   * @return {plasm.Model} model
   * @api public
   */

  plasm.Model.fromJSON = function (json, viewer) {
    var json = typeof json === "string" ? JSON.parse(json) : json;
    var complex = simplexn.SimplicialComplex.fromJSON(json.complex);
    var model = new plasm.Model(complex, viewer);

    model.color(json.color);

    return model;
  };

  /**
   * Draw.
   *
   * @return {plasm.Mode} for chaining
   * @api public
   */

  plasm.Model.prototype.draw = function () {
    if (this.mesh.parent !== this.viewer.scene) {
      this.viewer.scene.add(this);
    }

    return this;
  };

  /**
   * Remove this model from the scene.
   *
   * @api public
   */

  plasm.Model.prototype.erase = function () {
    this.viewer.scene.remove(this);
    this.complex = null;
    this.geometry = null;
    this.mesh = null;
  };

  /**
   * Show.
   *
   * @return {plasm.Mode} for chaining
   * @api public
   */

  plasm.Model.prototype.show = function () {
    this.mesh.visible = true;

    return this;
  };

  /**
   * Hide.
   *
   * @return {plasm.Mode} for chaining
   * @api public
   */

  plasm.Model.prototype.hide = function () {
    this.mesh.visible = false;

    return this;
  };

  /**
   * Cancel `this` object from graph of the scene.
   *
   * @return {plasm.Model} for chaining
   * @api public
   */

  plasm.Model.prototype.cancel = function () {
    this.mesh.parent.remove(this.mesh);
    return this;
  };

  /**
   * Translate.
   *
   * @param {Array|Uint32Array} dims
   * @param {Array|Float32Array} values
   * @return {plasm.Model} this for chaining
   * @api public
   */

  plasm.Model.prototype.translate = function (dims, values) {
    var v = [];
    this.complex.translate(dims, values);

    if (this.complex.rn <= 3) {
      dims.forEach(function (dim, i) {
        v[dim] = values[i];
      });
      this.mesh.position.addSelf({ x: v[0] || 0, y: v[1] || 0, z: v[2] || 0 });
      this.geometry.__dirtyVertices = true;
    }

    return this;
  };

  /**
   * Rotate.
   *
   * @param {Array|Uint32Array} dims
   * @param {Number|Array|Uint32Array} angle
   * @return {plasm.Model} this for chaining
   * @api public
   */

  plasm.Model.prototype.rotate = function (dims, angle) {
    var v = [];
    var axis = 3 - (dims[0] + dims[1]);
    var angle = angle[0] || angle;

    this.complex.rotate(dims, angle);

    if (this.complex.rn <= 3) {
      v[axis] = angle;
      this.mesh.rotation.addSelf({x: v[0] || 0, y: v[1] || 0, z: v[2] || 0 });
      this.geometry.__dirtyVertices = true;
    }

    return this;
  };

  /**
   * Scale.
   *
   * @param {Array|Uint32Array} dims
   * @param {Array|Float32Array} values
   * @return {plasm.Model} this for chaining
   * @api public
   */

  plasm.Model.prototype.scale = function (dims, values) {
    var v = [];
    this.complex.scale(dims, values);

    if (this.complex.rn <= 3) {
      dims.forEach(function (dim, i) {
        v[dim] = values[i];
      });
      this.mesh.scale.multiplySelf({ x: v[0] || 1, y: v[1] || 1, z: v[2] || 1 });
      this.geometry.__dirtyVertices = true;
    }

    return this;
  };

  /**
   * Map.
   *
   * Map the vertices of this model by the mapping function.
   *
   * @example
   *
   *   domain([[0,1]],[0,2*Math.PI])
   *     .map(function (v) { return [Math.sin(v[0]), Math.cos(v[1])]; })
   *     .draw();
   *
   * @example
   *
   *   domain([[0,1]],[0,2*Math.PI])
   *     .map([
   *        function (v) { return Math.sin(v[0]); },
   *        function (v) { return Math.cos(v[1]); }
   *      ])
   *     .draw();
   *
   *
   * @param {Function | Array} mapping
   * @return {plasm.Model} a new mapped model
   * @api public
   */

  plasm.Model.prototype.map = function (mapping, merge) {
    if (mapping instanceof Array) {
      return this.map(function (v) {
        return mapping.map(function (f) {
          return f(v);
        });
      }, merge);
    }

    var complex = this.complex.clone().map(mapping, merge);
    var model = new plasm.Model(complex, this.viewer);

    return model;
  };

  /**
   * Color.
   *
   * @param {Array} rgba rgba
   * @param {Number} [rgba[0] = 0] r
   * @param {Number} [rgba[1] = 0] g
   * @param {Number} [rgba[2] = 0] b
   * @param {Number} [rgba[3] = 1] a
   * @return {plasm.Object} for chaining
   * @api public
   */

  plasm.Model.prototype.color = function (rgba) {
    var a = rgba[3];

    this.material.color.setRGB(rgba[0] || 0, rgba[1] || 0, rgba[2] || 0);

    if (a < 1) {
      this.material.opacity = a;
      this.material.transparent = true;
    }

    return this;
  };

  /**
   * boundary
   *
   * @return {plasm.Model} boundary
   * @api public
   */

  plasm.Model.prototype.boundary = function () {
    var complex = this.complex.clone().boundary();
    var boundary = new plasm.Model(complex, this.viewer);
    plasm.materials.cloneColor(this.material, boundary.material);

    return boundary;
  };

  /**
   * skeleton
   *
   * @param {Number} dim
   * @return {plasm.Model} skeleton
   * @api public
   */

  plasm.Model.prototype.skeleton = function (dim) {
    var complex = this.complex.clone().skeleton(dim);
    var skeleton = new plasm.Model(complex, this.viewer);
    plasm.materials.cloneColor(this.material, skeleton.material);

    return skeleton;
  };

  /**
   * extrude
   *
   * @param {Array|Float32Array} hlist which must be made by positive numbers
   *   or by an alternation of positive and negative numbers
   * @return {plasm.Model} extrusion
   * @api private
   */

  plasm.Model.prototype.extrude = function (hlist) {
    var complex = this.complex.clone().extrude(hlist);
    var extrusion = new plasm.Model(complex, this.viewer);
    plasm.materials.cloneColor(this.material, extrusion.material);

    return extrusion;
  };

  /**
   * explode
   *
   * @param {Array|Float32Array} values
   * @return {plasm.Model} explosion
   * @api public
   */

  plasm.Model.prototype.explode = function (values) {
    var complex = this.complex.clone().explode(values);
    var explosion = new plasm.Model(complex, this.viewer);
    plasm.materials.cloneColor(this.material, explosion.material);

    return explosion;
  };

  /**
   * prod
   * At the moment it's customed and tested only for following cases:
   * - 1-rn x 1-rn
   * - 1-rn x 2-rn
   * - 2-rn x 1-rn
   *
   * @param {plasm.Model} model
   * @return {plasm.Model} result of the product operation
   * @api private
   */

  plasm.Model.prototype._prod = function (model) {
    var complex = this.complex.clone().prod(model.complex);
    var result = new plasm.Model(complex, this.viewer);
    plasm.materials.cloneColor(this.material, result.material);

    return result;
  };

  plasm.Model.prototype.prod1x1 = function (model) {
    if (this.complex.rn !== 1 || model.complex.rn !== 1) throw 'Dimesion error.';

    return this._prod(model);
  };

  plasm.Model.prototype.prod1x2 = function (model) {
    if (this.complex.rn !== 1 || model.complex.rn !== 2) throw 'Dimesion error.';

    return this._prod(model);
  };

  plasm.Model.prototype.prod2x1 = function (model) {
    if (this.complex.rn !== 2 || model.complex.rn !== 1) throw 'Dimesion error.';

    return this._prod(model);
  };

  /**
   * Struct
   *
   * @param {items} complex
   * @param {plasm.Viewer} viewer
   * @return {plasm.Struct} struct
   * @api public
   */

  plasm.Struct = function (items) {
    if (!(this instanceof plasm.Struct)) {
      return new plasm.Struct(items);
    }

    var items = items || [];
    var structs = [];
    var models = [];
    var model;

    items.forEach(function (item) {
      model = item.clone();
      if (model instanceof plasm.Model) {
        models.push(model);
      } else if (model instanceof plasm.Struct) {
        structs.push(model);
      }
    });

    this.structs = structs;
    this.models = models;
  };

  /**
   * Clone
   *
   * @return {plasm.Struct} clone
   * @api public
   */

  plasm.Struct.prototype.clone = function () {
    var cloned = new plasm.Struct();
    var models = [];
    var structs = [];

    this.models.forEach(function (model) {
      models.push(model.clone());
    });

    this.structs.forEach(function (struct) {
      structs.push(struct.clone());
    });

    cloned.models = models;
    cloned.structs = structs;

    return cloned;
  };

  /**
   * toJSON
   * return a JSON of Struct data
   *
   * @return {Object} model
   * @api public
   */

  plasm.Struct.prototype.toJSON = function () {
    var json = {};
    var models = [];
    var structs = [];

    this.models.forEach(function (model) {
      models.push(model.toJSON());
    });

    this.structs.forEach(function (struct) {
      structs.push(struct.toJSON());
    });

    json.models = models;
    json.structs = structs;

    return json;
  };

  /**
   * fromJSON
   * instantiate a struct from a Struct JSON
   *
   * @param {Object|String} json
   * @param {plasm.Viewer} viewer
   * @return {plasm.Struct} struct
   * @api public
   */

  plasm.Struct.fromJSON = function (json, viewer) {
    var json = typeof json === "string" ? JSON.parse(json) : json;
    var models = json.models;
    var structs = json.structs;
    var newStruct = new plasm.Struct();

    models.forEach(function (model) {
      newStruct.addNoClone(plasm.Model.fromJSON(model, viewer));
    });

    structs.forEach(function (struct) {
      newStruct.addNoClone(plasm.Struct.fromJSON(struct, viewer));
    });

    json.models = models;
    json.structs = structs;

    return newStruct;
  };

  /**
   * Draw.
   *
   * @return {plasm.Struct} for chaining
   * @api public
   */

  plasm.Struct.prototype.draw = function () {
    this.models.forEach(function (model) {
      model.draw();
    });

    this.structs.forEach(function (struct) {
      struct.draw();
    });

    return this;
  };

  /**
   * Cancel.
   *
   * @return {plasm.Struct} for chaining
   * @api public
   */

  plasm.Struct.prototype.cancel = function () {
    this.models.forEach(function (model) {
      model.cancel();
    });

    this.structs.forEach(function (struct) {
      struct.cancel();
    });

    return this;
  };

  /**
   * Remove this model from the scene.
   *
   * @api public
   */

  plasm.Struct.prototype.erase = function () {
    this.viewer.scene.remove(this);
    this.structs = null;
    this.models = null;
  };

  /**
   * Show.
   *
   * @return {plasm.Struct} for chaining
   * @api public
   */

  plasm.Struct.prototype.show = function () {
    this.models.forEach(function (model) {
      model.show();
    });

    this.structs.forEach(function (struct) {
      struct.show();
    });

    return this;
  };

  /**
   * Hide.
   *
   * @return {plasm.Struct} for chaining
   * @api public
   */

  plasm.Struct.prototype.hide = function () {
    this.models.forEach(function (model) {
      model.hide();
    });

    this.structs.forEach(function (struct) {
      struct.hide();
    });

    return this;
  };

  /**
   * Add `item` to this plasm.Struct.
   *
   * @param {plasm.Model|plasm.Struct} item
   * @return {plasm.Struct} for chaining
   * @api public
   */

  plasm.Struct.prototype.add = function (item) {
    if (this === item) return this;
    var model = item.clone();
    if (model instanceof plasm.Model) {
      this.models.push(model);
    } else if (model instanceof plasm.Struct) {
      this.structs.push(model);
    }

    return this;
  };

  /**
   * Add `item` to this plasm.Struct without cloning it.
   *
   * @param {plasm.Model|plasm.Struct} item
   * @return {plasm.Struct} for chaining
   * @api public
   */

  plasm.Struct.prototype.addNoClone = function (item) {
    if (this === item) return this;
    var model = item;
    if (model instanceof plasm.Model) {
      this.models.push(model);
    } else if (model instanceof plasm.Struct) {
      this.structs.push(model);
    }

    return this;
  };

  /**
   * Remove `item` from this model.
   *
   * @param {plasm.Model|plasm.Struct} item
   * @return {plasm.Struct} for chaining
   * @api public
   */

  plasm.Struct.prototype.remove = function (item) {
    if (this === item) return this;
    var index;
    var array;

    if (item instanceof plasm.Model) {
      array = this.models;
    } else if (item instanceof Struct) {
      array = this.structs;
    }
    index = array.indexOf(item);
    if (index > 0) {
      array.splice(index, 1);
      item.remove();
    }
    return this;
  };

  /**
   * Translate.
   *
   * @param {Array|Uint32Array} dims
   * @param {Array|Float32Array} values
   * @return {plasm.Struct} this for chaining
   * @api public
   */

  plasm.Struct.prototype.translate = function (dims, values) {
    this.models.forEach(function (model) {
      model.translate(dims, values);
    });

    this.structs.forEach(function (struct) {
      struct.translate(dims, values);
    });

    return this;
  };

  /**
   * Rotate.
   *
   * @param {Array|Uint32Array} dims
   * @param {Number|Array|Uint32Array} angle
   * @return {plasm.Struct} this for chaining
   * @api public
   */

  plasm.Struct.prototype.rotate = function (dims, angle) {
    this.models.forEach(function (model) {
      model.rotate(dims, angle);
    });

    this.structs.forEach(function (struct) {
      struct.rotate(dims, angle);
    });

    return this;
  };

  /**
   * Scale.
   *
   * @param {Array|Uint32Array} dims
   * @param {Array|Float32Array} values
   * @return {plasm.Struct} this for chaining
   * @api public
   */

  plasm.Struct.prototype.scale = function (dims, values) {
    this.models.forEach(function (model) {
      model.scale(dims, values);
    });

    this.structs.forEach(function (struct) {
      struct.scale(dims, values);
    });

    return this;
  };

  /**
   * Color.
   *
   * @param {Array} rgba rgba
   * @param {Number} [rgba[0] = 0] r
   * @param {Number} [rgba[1] = 0] g
   * @param {Number} [rgba[2] = 0] b
   * @param {Number} [rgba[3] = 1] a
   * @return {plasm.Struct} for chaining
   * @api public
   */

  plasm.Struct.prototype.color = function (rgba) {
    this.models.forEach(function (model) {
      model.color(rgba);
    });

    this.structs.forEach(function (struct) {
      struct.color(rgba);
    });

    return this;
  };

  /**
   * Extrude.
   *
   * @param {Array|Float32Array} hlist which must be made by positive numbers
   *   or by an alternation of positive and negative numbers
   * @return {plasm.Struct} extrusion
   * @api private
   */

  plasm.Struct.prototype.extrude = function (hlist) {
    var newStruct = new plasm.Struct();

    this.models.forEach(function (model) {
      newStruct.models.push(model.extrude(hlist));
    });

    this.structs.forEach(function (struct) {
      newStruct.structs.push(struct.extrude(hlist));
    });

    return newStruct;
  };

  /**
   * SimplicialComplex
   *
   * @param {Array|Float32Array} points
   * @param {Array|Uint32Array} complexes
   * @return {plasm.Model} simplicial complex
   * @api public
   */

  plasm.Viewer.prototype.simplicialComplex = function (points, complex) {
    var complex = new simplexn.SimplicialComplex(points, complex);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * simplex
   *
   * @param {number} d
   * @return {plasm.Model} a simplex
   * @api public
   */

  plasm.Viewer.prototype.simplex = function (d) {
    var complex = new simplexn.geometries.simplex(d);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * polyline
   *
   * @param {Array} points
   * @return {simplexn.SimplicialComplex} a polyline
   * @api public
   */

  plasm.Viewer.prototype.polyline = function (points) {
    var complex = simplexn.geometries.polyline(points);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * polypoint
   *
   * @param {Array} points
   * @return {simplexn.SimplicialComplex} a polypoint
   * @api public
   */

  plasm.Viewer.prototype.polypoint = function (points) {
    var complex = simplexn.geometries.polypoint(points);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * axes
   *
   * @param {dim} points
   * @faces {Array|Uint32Array} complexes
   * @api public
   */

  plasm.Viewer.prototype.axes = function () {
    var axeX = new simplexn.SimplicialComplex([[0,0,0],[1,0,0]],[[0,1]]);
    var axeY = new simplexn.SimplicialComplex([[0,0,0],[0,1,0]],[[0,1]]);
    var axeZ = new simplexn.SimplicialComplex([[0,0,0],[0,0,1]],[[0,1]]);
    var modelX = (new plasm.Model(axeX, this)).color([1,0,0]);
    var modelY = (new plasm.Model(axeY, this)).color([0,1,0]);
    var modelZ = (new plasm.Model(axeZ, this)).color([0,0,1]);
    var axes = new plasm.Struct([modelX,modelY,modelZ]);

    return axes;
  };

  /**
   * simplexGrid
   *
   * @param {Array} quotesList is a list of hlist made by positive numbers
   * or made by an alternation of positive and negative numbers
   * @return {plasm.Model} a grid of simplexes
   * @api public
   */

  plasm.Viewer.prototype.simplexGrid = function (quotesList) {
    var complex = new simplexn.geometries.simplexGrid(quotesList);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * cuboid
   *
   * @param {Array} sides
   * @return {plasm.Model} a cuboidal simplicial complex
   * @api public
   */

  plasm.Viewer.prototype.cuboid = function (sides) {
    var complex = new simplexn.geometries.cuboid(sides);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * intervals
   *
   * @param {Array} values
   * @return {plasm.Model} intervals
   * @api public
   */

  plasm.Viewer.prototype.intervals = function (tip, n) {
    var complex = new simplexn.geometries.intervals(tip, n);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * domain
   *
   * @param {Array} ends
   * @param {Array} ns
   * @return {plasm.Model} domain
   * @api public
   */

  plasm.Viewer.prototype.domain = function (tips, ns) {
    var domain = new simplexn.geometries.domain(tips, ns);
    var model = new plasm.Model(domain, this);
    return model;
  };

  /**
   * cube
   *
   * @param {Number} dim
   * @return {plasm.Model} a dim-dimendional cube
   * @api public
   */

  plasm.Viewer.prototype.cube = function (d) {
    var complex = new simplexn.geometries.cube(d);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * circle
   *
   * @param {Number} [radius=1]
   * @param {Number} [n=32]
   * @return {plasm.Model} a circle
   * @api public
   */

  plasm.Viewer.prototype.circle = function (radius, n) {
    var complex = new simplexn.geometries.circle(radius, n);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * disk
   *
   * @param {Number} [radius=1]
   * @param {Number} [n=32]
   * @param {Number} [m=1]
   * @return {plasm.Model} a disk
   * @api public
   */

  plasm.Viewer.prototype.disk = function (radius, n, m) {
    var complex = new simplexn.geometries.disk(radius, n, m);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * cylinderSurface
   * Produces a cylindrical surface of radius r and heigth h.
   *
   * @param {Number} [r=1]
   * @param {Number} [h=1]
   * @param {Number} [n=16]
   * @param {Number} [m=2]
   * @return {plasm.Model} a cylindrical surface
   * @api public
   */

  plasm.Viewer.prototype.cylinderSurface = function (r, h, n, m) {
    var complex = new simplexn.geometries.cylinderSurface(r, h, n, m);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * torusSurface
   *
   * produces a toroidal surface of radiuses r,R
   * approximated with n x m x 2 triangles
   *
   * @param {Number} [r_min=1] r_min
   * @param {Number} [r_max=3] r_max
   * @param {Number} [n=12] n
   * @param {Number} [m=8] m
   * @return {plasm.Model} a torus surface
   */

  plasm.Viewer.prototype.torusSurface = function (r_min, r_max, n, m) {
    var complex = new simplexn.geometries.torusSurface(r_min, r_max, n, m);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * torusSolid
   *
   * produces a toroidal surface of radiuses r,R
   * approximated with n x m x 2 triangles
   *
   * @param {Number} [r=1] r_min
   * @param {Number} [R=3] r_max
   * @param {Number} [n=12] n
   * @param {Number} [m=8] m
   * @param {Number} [p=8] p
   * @return {plasm.Model} a torus solid
   */

  plasm.Viewer.prototype.torusSolid = function (r_min, r_max, n, m, p) {
    var r_min = r_min || 1;
    var r_max = r_max || 3;
    var n = n || 12;
    var m = m || 8;
    var p = p || 8;
    var complex = new simplexn.geometries.torusSolid(r_min, r_max, n, m, p);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * triangleStrip
   *
   * @param {Array} points
   * @return {plasm.Model} triangle strip
   * @api public
   */

  plasm.Viewer.prototype.triangleStrip = function (points) {
    var complex = new simplexn.geometries.triangleStrip(points);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * triangleFan
   *
   * @param {Array} points
   * @return {plasm.Model} triangle strip
   * @api public
   */

  plasm.Viewer.prototype.triangleFan = function (points) {
    var complex = new simplexn.geometries.triangleFan(points);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * helix
   *
   * @param {Number} [r=1] r
   * @param {Number} [pitch=1] pitch
   * @param {Number} [n=24] n
   * @param {Number} [turns=1] turns
   * @return {plasm.Model} helix
   * @api public
   */

  plasm.Viewer.prototype.helix = function (r, pitch, n, turns) {
    var complex = new simplexn.geometries.helix(r, pitch, n, turns);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * triangleDomain
   *
   * @param {Number} n
   * @param {Array} points
   * @return {plasm.Model} triangleDomain
   * @api public
   */

  plasm.Viewer.prototype.triangleDomain = function (n, points) {
    var complex = new simplexn.geometries.triangleDomain(n, points);
    var model = new plasm.Model(complex, this);
    return model;
  };


}(this));
