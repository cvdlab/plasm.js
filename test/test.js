(function() {
  var R, g, m, n, p, r, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.g = g = new Graph(TORUSSOLID(r = 1, R = 3, n = 8, m = 16, p = 1));

  viewer.drawGraph(g);

}).call(this);
