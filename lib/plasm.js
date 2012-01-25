
/*!
 * plasm.js
 * JavaScript Programming Language for Solid Modeling
 * Copyright (c) 2011 cvd-lab <cvdlab@email.com> (https://github.com/cvd-lab/)
 * MIT License
 */

 !(function (exports) {

  var undefined
    , toString = {}.toString
    ;

  /**
   * Library namespace.
   */

  var plasm = exports.plasm = {};

  /**
   * Library version.
   */

  plasm.version = '0.0.1';

  /**
   * Create application.
   *
   * @api public
   */

  plasm.Viewer = function (container) {
    if (!(this instanceof plasm.Viewer)) {
      return new plasm.Viewer(container);
    }
    if (!Detector.webgl) {
      Detector.addGetWebGLMessage();
    }

    var camera = this.camera = new plasm.Camera();

    var scene = this.scene = new plasm.Scene();
    scene.add(camera);

    var controls = this.controls = new plasm.Controls(camera, scene);

    var light = new THREE.PointLight(0x999999);
    light.position.set(100, 100, 100);
    scene.root.add(light);

    light = new THREE.PointLight(0xffffff);
    light.position.set(-100, -100, -100);
    scene.root.add(light);

    light = new THREE.DirectionalLight(0xaaaaaa);
    light.position.set(50, 100, -200);
    scene.root.add(light);

    light = new THREE.AmbientLight(0xeeeeee);
    scene.root.add(light);

    var axes = new plasm.Axes();
    scene.add(axes);

    var renderer = this.renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColorHex(0x778899, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var container = this.container = document.createElement('div');
    container.setAttribute('id', 'plasm');
    container.style.position = 'absolute';
    container.style.top = '0px';
    container.style.left = '0px';
    container.style.width = '100%';
    container.style.height = '100%';
    document.body.appendChild(container);
    container.appendChild(this.renderer.domElement);

    var stats = this.stats = new Stats()
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    document.body.appendChild(stats.domElement);

    function animate () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene.root, camera.optics);
      stats.update();
    }

    animate();
  };

  /**
   * Create a model and add it to the scene.
   *
   * @return {plasm.Model} model
   * @api public
   */

  plasm.Viewer.prototype.draw = function (obj) {
    var self = this;

    if ('[object Array]' === toString.call(obj)) {
      var result = [];

      obj.forEach(function (obj) {
        var model = self.draw(obj);
        result.push(model);
      });

      return result;
    }

    var geometry = new THREE.Geometry()
      , faces = obj.faces
      , dim = faces.dim
      , material
      , mesh
      , vertices = obj.vertices.verts
      , cells
      , model
      ;

    if (dim === 0) {
      vertices.forEach(function (v) {
        geometry.vertices.push(
        new THREE.Vertex(
          new THREE.Vector3(v[0] || 0, v[1] || 0, v[2] || 0)
        ));
      });
      model = new plasm.Model(geometry, 0);
    }
    if (dim === 1) {
      cells = faces.cells[1];
      cells.forEach(function (cell) {
        var v1 = vertices[cell[0]]
          , v2 = vertices[cell[1]]
          ;

        geometry.vertices.push(new THREE.Vertex(
          new THREE.Vector3(v1[0], v1[1], v1[2])
        ));
        geometry.vertices.push(new THREE.Vertex(
          new THREE.Vector3(v2[0], v2[1], v2[2])
        ));
      });
      model = new plasm.Model(geometry, 1);
    }
    if (dim >= 2) {
      vertices.forEach(function (v) {
        geometry.vertices.push(
          new THREE.Vertex(
            new THREE.Vector3(v[0] || 0, v[1] || 0, v[2] || 0)
        ));
      });
      cells = faces.cells[2];
      cells.forEach(function (cell) {
        geometry.faces.push(new THREE.Face3(cell[0], cell[1], cell[2]));
      });
      model = new plasm.Model(geometry, 2);
    }

    geometry.computeCentroids();
    geometry.mergeVertices();
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    this.scene.add(model);

    return model;
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
    var max = Math.max
      , abs = Math.abs
      , radius = 0
      , geometry
      , position
      ;

    THREE.SceneUtils.traverseHierarchy(this.root, function (obj) {
      if (obj instanceof THREE.Object3D && obj.geometry) {
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
    var max = Math.max
      , min = Math.min
      , maxPos = new THREE.Vector3()
      , minPos = new THREE.Vector3()
      , centroid = new THREE.Vector3()
      , geometry
      , position
      ;

    THREE.SceneUtils.traverseHierarchy(this.root, function (obj) {
      if (obj instanceof THREE.Object3D && obj.geometry && obj.geometry.vertices.length) {
        // console.log(obj);
        geometry = obj.geometry;
        geometry.computeBoundingBox();
        maxPos.x = max(maxPos.x, geometry.boundingBox.max.x);
        maxPos.y = max(maxPos.y, geometry.boundingBox.max.y);
        maxPos.z = max(maxPos.z, geometry.boundingBox.max.z);

        minPos.x = min(minPos.x, geometry.boundingBox.min.x);
        minPos.y = min(minPos.y, geometry.boundingBox.min.y);
        minPos.z = min(minPos.z, geometry.boundingBox.min.z);
      }
    });

    return centroid.add(maxPos, minPos).divideScalar(2);
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

    var options = options || {}
      , fovy = options.fovy || 60
      , aspect = options.aspect || window.innerWidth / window.innerHeight
      , near = options.near || 1
      , far = options.far || 10000
      , optics
      , controls
      ;

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

    var options = options || {}
      , controls
      ;

    controls = new THREE.EnhancedTrackballControls(camera.optics, scene);
    controls.rotateSpeed = options.rotateSpeed || 5.0;
    controls.zoomSpeed = options.zoomSpeed || 1.2;
    controls.panSpeed = options.panSpeed || 0.8;
    controls.noZoom = options.noZoom || false;
    controls.noPan = options.noPan || false;
    controls.dynamicDampingFactor = options.dynamicDampingFactor || 0.3;

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
   * Create a model.
   *
   * @param {THREE.Geometry} geometry geometry
   * @param {Number} dimension space dimension
   * @param {THREE.Material} material material
   * @return {plasm.Model} model
   * @api public
   */

  plasm.Model = function (geometry, dimension, material) {
    if (!(this instanceof plasm.Model)) {
      return new plasm.Model(geometry, dimension, material);
    }
    this.geometry = geometry;
    this.geometry.dynamic = true;

    if (dimension === 0) {
      this.material = material || new THREE.ParticleBasicMaterial({
          color: 0xD7D7D7
        , size: 0.075
      });
      this.mesh = new THREE.ParticleSystem(this.geometry, this.material);
    }
    else if (dimension === 1) {
      this.material = material || new THREE.LineBasicMaterial({
          color: 0xD7D7D7
        , opacity: 0.8
        , linewidth: 1
      });
      this.mesh = new THREE.Line(this.geometry, this.material, THREE.LinePieces);
    }
    else {
      this.material = material || new THREE.MeshLambertMaterial({
          color: 0xD7D7D7
      });
      this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    this.mesh.matrixAutoUpdate = true;
    this.mesh.doubleSided = true;
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
    this.mesh.position.addSelf({
        x: v[0] || 0
      , y: v[1] || 0
      , z: v[2] || 0
    });
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
    this.mesh.rotation.addSelf({
        x: v[0] || 0
      , y: v[1] || 0
      , z: v[2] || 0
    });
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
    this.mesh.scale.multiplySelf({
        x: v[0] || 1
      , y: v[1] || 1
      , z: v[2] || 1
    });
    this.geometry.__dirtyVertices = true;
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
   * Add model.
   *
   * @return {plasm.Model} for chaining
   * @api public
   */

  plasm.Model.prototype.add = function (model) {
    this.mesh.add(model.mesh);
    return this;
  };

  /**
   * Remove model.
   *
   * @return {plasm.Model} for chaining
   * @api public
   */

  plasm.Model.prototype.remove = function (model) {
    this.mesh.remove(model.mesh);
    return this;
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
   * Create a line.
   *
   * @param {Array} points points
   * @param {Array} [points[0]] start point
   * @param {Array} [points[0]] end point
   * @return {plasm.Line} line
   * @api public
   */

  plasm.Line = function (points) {
    if (!(this instanceof plasm.Line)) {
      return new plasm.Line(points);
    }

    var geometry = new THREE.Geometry()
      , model
      ;

    points.forEach(function (point) {
      geometry.vertices.push(
        new THREE.Vertex(
          new THREE.Vector3(point[0] || 0, point[1] || 0, point[2] || 0)));
    });

    model = new plasm.Model(geometry, 1);

    return model;
  };

  plasm.Points = function (points) {
    if (!(this instanceof plasm.Points)) {
      return new plasm.Points(points);
    }

    var geometry = new THREE.Geometry()
      , model
      ;

    points.forEach(function (point) {
      geometry.vertices.push(
        new THREE.Vertex(
          new THREE.Vector3(point[0] || 0, point[1] || 0, point[2] || 0)));
    });

    model = new plasm.Model(geometry, 0);

    return model;
  };

  plasm.Axes = function () {
    if (!(this instanceof plasm.Axes)) {
      return new plasm.Axes();
    }

    var model = plasm.Model(new THREE.Geometry());

    model
      .add(plasm.Line([[0,0,0],[1,0,0]]).color([1,0,0]))
      .add(plasm.Line([[0,0,0],[0,1,0]]).color([0,1,0]))
      .add(plasm.Line([[0,0,0],[0,0,1]]).color([0,0,1]));

    return model;
  }

  /**
   * Create a cube.
   *
   * @param {Number} dimension dimension
   * @param {Number} segments segments
   * @return {plasm.Object} cube
   * @api public
   */

  plasm.Cube = function (dimension, segments) {
    var model
      , d = dimension || 1
      , s = segments || 1
      , geometry = new THREE.CubeGeometry(d, d, d, s, s, s);

    model = new plasm.Model(geometry);

    return model;
  };

 }(this));