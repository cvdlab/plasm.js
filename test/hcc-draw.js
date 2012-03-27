plasm.Viewer.prototype.drawGraph = function (graph) {

  var geometry = new THREE.Geometry();
  var object = graph.object;
  var vertices = object.vertices.verts;
  var down = graph.down;
  var faces = down[2];
  var edges = down[1];

  vertices.forEach(function (v) {
    geometry.vertices.push(
      new THREE.Vertex(
        new THREE.Vector3(v[0] || 0, v[1] || 0, v[2] || 0)
    ));
  });

  faces.forEach(function (face) {
    var cell = [];
    face.forEach(function (edge) {
      edges[edge].forEach(function (vertex) {
        if (cell.indexOf(vertex) === -1) cell.push(vertex); 
      });
    });
    if (face.length === 3) {
      geometry.faces.push(new THREE.Face3(cell[0], cell[1], cell[2]));
      geometry.faces.push(new THREE.Face3(cell[1], cell[0], cell[2]));
    }
    if (face.length === 4) {
      geometry.faces.push(new THREE.Face3(cell[0], cell[1], cell[2]));
      geometry.faces.push(new THREE.Face3(cell[1], cell[0], cell[2]));
      
      geometry.faces.push(new THREE.Face3(cell[0], cell[1], cell[3]));
      geometry.faces.push(new THREE.Face3(cell[1], cell[0], cell[3]));

      geometry.faces.push(new THREE.Face3(cell[0], cell[3], cell[2]));
      geometry.faces.push(new THREE.Face3(cell[3], cell[0], cell[2]));

      geometry.faces.push(new THREE.Face3(cell[3], cell[1], cell[2]));
      geometry.faces.push(new THREE.Face3(cell[1], cell[3], cell[2]));

//      geometry.faces.push(new THREE.Face4(cell[1], cell[0], cell[2], cell[3]));
    }
  });

  geometry.computeCentroids();
  geometry.mergeVertices();
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();

  model = new plasm.Model(geometry, 2);
  model.mesh.doubleSided = false;

  this.scene.add(model);

  return model;
};