
/*!
 * plasm.js
 * JavaScript Programming Language for Solid Modeling
 * Copyright (c) 2011 cvd-lab <cvdlab@email.com> (https://github.com/cvd-lab/)
 * MIT License
 */

 !(function (exports) {

  var toString = {}.toString;
  var max = Math.max;
  var min = Math.min;
  var abs = Math.abs;

  /**
   * Library namespace.
   */

  var plasm = exports.plasm = {};

  /**
   * Library version.
   */

  plasm.version = '0.0.7';

  /**
   * Create the plasm viewer.
   *
   * @param {Element} container
   * @param {Element} inspector
   * @api public
   */

  plasm.Viewer = function (container, inspector) {
    if (!(this instanceof plasm.Viewer)) {
      return new plasm.Viewer(container);
    }
    if (!Detector.webgl) {
      Detector.addGetWebGLMessage();
    }

    var scene = this.scene = new plasm.Scene();

    var camera = this.camera = new plasm.Camera();
    scene.add(camera);

    var controls = this.controls = new plasm.Controls(camera, scene);

    var light = this.light = new THREE.AmbientLight(0xeeeeee);
    scene.root.add(light);

    var renderer = this.renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColorHex(0xefefef, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);

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
      camera.optics.aspect = window.innerWidth / window.innerHeight;
      camera.optics.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', resize, false);

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
      if (obj instanceof THREE.Object3D 
          && obj.geometry 
          && obj.geometry.vertices.length) {
        
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
    var centroid = new THREE.Vector3()
    var geometry;
    var position;
    var bbox;
    var p = { 
        max: new THREE.Vector3()
      , min: new THREE.Vector3() 
    };
    
    THREE.SceneUtils.traverseHierarchy(this.root, function (obj) {
      if (obj instanceof THREE.Object3D 
          && obj.geometry 
          && obj.geometry.vertices.length) {

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
    var near = options.near || 1;
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

    controls = new THREE.EnhancedTrackballLightControls(camera.optics, scene);
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

  /**
   * Materials
   */

  plasm.materials = {};

  plasm.materials.PointMaterial = function () {
    return new THREE.ParticleBasicMaterial({ 
        color: 0xD7D7D7
      , size: 0.075 
    });
  };

  plasm.materials.LineMaterial = function () {
    return new new THREE.LineBasicMaterial({
        color: 0xD7D7D7
      , opacity: 0.8
      , linewidth: 1
    });
  };

  plasm.materials.MeshMaterial = function () {
    return new THREE.MeshLambertMaterial({
        color: 0xD7D7D7
      , wireframe: false
      , shading: THREE.FlatShading
      , vertexColors: THREE.FaceColors
    });
  };

  /**
   * Create the model of the given simplicial complex 
   * and add it to the scene of the given viewer.
   *
   * @param {simplexn.SimplicialComplex} complex
   * @param {plasm.Viewer} viewer
   * @return {plasm.Model} model
   * @api public
   */

  plasm.Model = function (complex, viewer) {
    if (!(this instanceof plasm.Model)) {
      return new plasm.Model(complex, viewer);
    }

    var pointset = complex.pointset;
    var topology = complex.topology;
    var dim = topology.dim;
    var cells, n_cells, i_cell;
    var v1, v2, v3; 

    var geometry = new THREE.Geometry();
    var material;
    var mesh;

    if (dim === 0) {
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
    this.mesh.doubleSided = true;
    this.viewer = viewer;
    this.viewer.scene.add(this.mesh);
  };

  /**
   * Translate.
   *
   * @param {Array} v translation vector
   * @param {Number} [v[0] = 0] translation x
   * @param {Number} [v[1] = 0] translation y
   * @param {Number} [v[2] = 0] translation z
   * @return {plasm.Model} for chaining
   * @api public
   */

  plasm.Model.prototype.translate = function (v) {
    this.mesh.position.addSelf({ x: v[0] || 0, y: v[1] || 0, z: v[2] || 0 });
    this.geometry.__dirtyVertices = true;
    return this;
  };

  /**
   * Rotate.
   *
   * @param {Array} v rotation vector
   * @param {Number} [v[0] = 0] rotation x in radiant
   * @param {Number} [v[1] = 0] rotation y in radiant
   * @param {Number} [V[2] = 0] rotation z in radiant
   * @return {plasm.Model} for chaining
   * @api public
   */

  plasm.Model.prototype.rotate = function (v) {
    this.mesh.rotation.addSelf({x: v[0] || 0, y: v[1] || 0, z: v[2] || 0 });
    this.geometry.__dirtyVertices = true;
    return this;
  };

  /**
   * Scale.
   *
   * @param {Array} v scale vector
   * @param {Number} [v[0] = 1] scale x
   * @param {Number} [v[1] = 1] scale y
   * @param {Number} [v[2] = 1] scale z
   * @return {plasm.Model} for chaining
   * @api public
   */

  plasm.Model.prototype.scale = function (v) {
    this.mesh.scale.multiplySelf({ x: v[0] || 1, y: v[1] || 1, z: v[2] || 1 });
    this.geometry.__dirtyVertices = true;
    return this;
  };

  /**
   * Draw.
   *
   * @return {plasm.Mode} for chaining
   * @api public
   */

  plasm.Model.prototype.draw = function () {
    if (parent !== this.viewer.scene) {
      this.viewer.scene.add(this.mesh);
    }
    this.mesh.visible = true;
    return this;
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
   * Add `model` to this model.
   *
   * @return {plasm.Model} for chaining
   * @api public
   */

  plasm.Model.prototype.add = function (model) {
    this.mesh.add(model.mesh);
    return this;
  };

  /**
   * Remove `model` from this model.
   *
   * @return {plasm.Model} for chaining
   * @api public
   */

  plasm.Model.prototype.remove = function (model) {
    this.mesh.remove(model.mesh);
    return this;
  };

  /**
   * Remove this model from the scene.
   *
   * @api public
   */

  plasm.Model.prototype.destroy = function () {
    this.viewer.scene.remove(this.mesh);
  };

  /**
   * Color.
   *
   * @param {Array} rgb rgb
   * @param {Number} [rgb[0] = 0] r
   * @param {Number} [rgb[1] = 0] g
   * @param {Number} [rgb[2] = 0] b
   * @return {plasm.Object} for chaining
   * @api public
   */

  plasm.Model.prototype.color = function (rgb) {
     this.mesh.material.color.setRGB(rgb[0] || 0, rgb[1] || 0, rgb[2] || 0);
     return this;
  };

  /**
   * SimplicialComplex
   * 
   * @param {Array|Float32Array} points
   * @faces {Array|Uint32Array} complexes
   * @api public
   */
  
  plasm.Viewer.prototype.simplicialComplex = function (points, complexes) {
    var complex = new simplexn.SimplicialComplex(points, complexes);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * simplexGrid
   * 
   * @param {Array} quotesList is a list of hlist made by positive numbers 
   * or made by an alternation of positive and negative numbers
   * @return {simplexn.SimplicialComplex} a grid of simplexes
   * @api public
   */

  plasm.Viewer.prototype.simplexGrid = function (quotesList) {
    var complex = new simplexn.geometries.simplecGrid(quitesList);
    var model = new plasm.Model(complex, this);
    return model;
  };

}(this));