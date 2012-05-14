var docstring = "<h3><code>BEZIER(sel)(controlpoints)</code></h3>\
\
<p>Transfinite mapping function of genric degree Bezier curve.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Function</code> <code>selector</code>: domain coordinate selector function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>v</code>: point of the <code>domain</code>.</p>\
\
<h4>out</h4>\
\
<p><code>Number</code>: the selected coordinate. </p>\
</blockquote>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>controlpoints</code>: an array of points and curve mapping functions describing curve control points.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous mapping function.</p>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var domain = INTERVALS(1)(32);\
var controlpoints = [[-0,0],[1,0],[1,1],[2,1],[3,1]];\
var curveMapping = BEZIER(S0)(controlpoints);\
var curve = MAP(curveMapping)(domain);\
DRAW(curve);\
</code></p>\
\
<p><code>js\
var domain = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);\
var c0 = BEZIER(S0)([[0,0,0],[10,0,0]]);\
var c1 = BEZIER(S0)([[0,2,0],[8,3,0],[9,2,0]]);\
var c2 = BEZIER(S0)([[0,4,1],[7,5,-1],[8,5,1],[12,4,0]]);\
var c3 = BEZIER(S0)([[0,6,0],[9,6,3],[10,6,-1]]);\
var out = MAP(BEZIER(S1)([c0,c1,c2,c3]))(domain);\
DRAW(out);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>BOUNDARY(d)(model)</code></h3>\
\
<p>Get the <code>d</code>-boundary of the <code>model</code>.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Number</code> <code>d</code>: space dimension.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: the <code>d</code>-boundary of the <code>model</code>.</p>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var d = 1;\
var model = TORUS_SURFACE()();\
var boundary = BOUNDARY(d)(model);\
DRAW(boundary);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>CANCEL(object)</code></h3>\
\
<p>Remove the <code>object</code> from the scene graph.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code> <code>object</code>: the object to cancel.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code> <code>object</code>: the cancelled object.</p>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var model = TORUS_SURFACE()();\
DRAW(model);\
CANCEL(model);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>CIRCLE(r)(divs)</code></h3>\
\
<p>Create a circle with radius <code>r</code>, approximated by <code>divs</code> segments.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Number</code> <code>r</code>: the radius of the circle.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Number</code> <code>divs</code>: the number of segments that approximate the circle.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: the circle with radius <code>r</code>, approximated by <code>divs</code> segments.</p>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var r = 1.5;\
var divs = 32;\
var circle = CIRCLE(r)(divs);\
DRAW(circle);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>COLOR(color)(object)</code></h3>\
\
<p>Clone <code>object</code> and color cloned object with <code>color</code>.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>color</code>: rgba color components (from <code>0</code> to <code>1</code>).</p>\
\
<ul>\
<li><code>Number</code> <code>r</code>: red component (from <code>0</code> to <code>1</code>, <code>0</code> by default).</li>\
<li><code>Number</code> <code>g</code>: green component (from <code>0</code> to <code>1</code>, <code>0</code> by default).</li>\
<li><code>Number</code> <code>b</code>: blue component (from <code>0</code> to <code>1</code>, <code>0</code> by default).</li>\
<li><code>Number</code> <code>a</code>: alpha component (from <code>0</code> to <code>1</code>, <code>1</code> by default).</li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code> <code>object</code>: the object to color.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code>: the cloned colored object. </p>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var color = [0.8, 0.4, 0.2, 0.7];\
var model = TORUS_SURFACE()();\
var coloredModel = COLOR(color)(model);\
DRAW(coloredModel);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>CUBE(dim)</code></h3>\
\
<p>Create a <code>dim</code>-dimensional cube.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Number</code> <code>dim</code>: dimension of the cube.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: a cube with <code>dim</code> dimension.</p>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var dim = 2;\
var cube = CUBE(dim);\
DRAW(cube);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>CUBIC_CARDINAL(domain)</code></h3>\
\
<p>Tranfinite Cubic cardinal splines curve generator function on <code>domain</code>.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>plasm.Model</code> <code>domain</code>: domain of the generator function.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>controlpoints</code>: an array of points and curve mapping functions describing curve control points.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: a spline segment.</p>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var domain = INTERVALS(1)(20);\
var controlpoints = [[-3,6],[-4,2],[-3,-1],[-1,1],[1.5,1.5],[3,4],[5,5],[7,2],[6,-2],[2,-3]];\
var splineCardinal = SPLINE(CUBIC_CARDINAL(domain))(controlpoints);\
DRAW(splineCardinal);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>CUBIC_HERMITE(selector)(controlpoints)</code></h3>\
\
<p>Transfinite mapping function of cubic Hermite curve.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Function</code> <code>selector</code>: domain coordinate selector function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>v</code>: point of the <code>domain</code>.</p>\
\
<h4>out</h4>\
\
<p><code>Number</code>: the selected coordinate. </p>\
</blockquote>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>controlpoints</code>: an array of points and curve mapping functions describing curve control points.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous mapping function.</p>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var domain = INTERVALS(1)(20);\
var controlpoints = [[1,0],[1,1],[ -1, 1],[ 1,0]];\
var curveMapping = CUBIC_HERMITE(S0)(controlpoints);\
var curve = MAP(curveMapping)(domain);\
DRAW(curve);\
</code></p>\
\
<p><code>js\
var domain = PROD1x1([INTERVALS(1)(14),INTERVALS(1)(14)]);\
var c1 = CUBIC_HERMITE(S0)([[1,0,0],[0,1,0],[0,3,0],[-3,0,0]]);\
var c2 = CUBIC_HERMITE(S0)([[0.5,0,0],[0,0.5,0],[0,1,0],[-1,0,0]]);\
var sur3 = CUBIC_HERMITE(S1)([c1,c2,[1,1,1],[-1,-1,-1]]);\
var out = MAP(sur3)(domain);\
DRAW(out);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>CUBIC_UBSPLINE(domain)</code></h3>\
\
<p>Tranfinite cubic uniform B-splines curve generator function on <code>domain</code>.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>plasm.Model</code> <code>domain</code>: domain of the generator function.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>controlpoints</code>: an array of points and curve mapping functions describing curve control points.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: a spline segment.</p>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var domain = INTERVALS(1)(20);\
var controlpoints = [[-3,6],[-4,2],[-3,-1],[-1,1],[1.5,1.5],[3,4],[5,5],[7,2],[6,-2],[2,-3]];\
var splineCubic = SPLINE(CUBIC_UBSPLINE(domain))(controlpoints);\
DRAW(splineCubic);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>CUBOID(dims)</code></h3>\
\
<p>Create a cuboidal simplicial complex with dimensions <code>[dx, dy, dz, ...]</code>.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>dims</code>: sides length for each dimension of the simplicial complex.</p>\
\
<ul>\
<li><code>Number</code> <code>dx</code>: dimension along x axe</li>\
<li><code>Number</code> <code>dy</code>: dimension along y axe</li>\
<li><code>Number</code> <code>dz</code>: dimension along z axe</li>\
<li>...</li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: a cuboidal simplicial complex with dimensions <code>[dx, dy, dz, ...]</code>.</p>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p>```js\
var dx = 1;\
var dy = 2;\
var dz = 3;</p>\
\
<p>var cuboid1 = CUBOID([dx]);\
DRAW(cuboid1);\
<code>\
</code>js\
var cuboid2 = CUBOID([dx, dy]);\
DRAW(cuboid2);\
<code>\
</code>js\
var cuboid3 = CUBOID([dx, dy, dz]);\
DRAW(cuboid3);\
```</p>\
</blockquote>\
\
<hr />\
\
<h3><code>CYL_SURFACE(dims)(divs)</code></h3>\
\
<p>Create a cylindrical surface.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>dims</code>: dimensions <code>[r, h]</code>.</p>\
\
<ul>\
<li><code>Number</code> <code>r</code>: the radius (<code>1</code> by default).</li>\
<li><code>Number</code> <code>h</code>: the height (<code>1</code> by default).</li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>divs</code>: divisions <code>[slices, stacks]</code>.</p>\
\
<ul>\
<li><code>Number</code> <code>slices</code>: slices (<code>16</code> by default).</li>\
<li><code>Number</code> <code>stacks</code>: stacks (<code>2</code> by default).</li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: a cylindrical surface with radius <code>r</code> and height <code>h</code>, divided in <code>slices</code> and <code>stacks</code>. </p>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var model = CYLSURFACE()();\
DRAW(model);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>DISK(r)(divs)</code></h3>\
\
<p>Create a disk surface with radius <code>r</code>.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Number</code> <code>r</code>: the radius (<code>1</code> by default).</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>divs</code>: divisions <code>[slices, stacks]</code>.</p>\
\
<ul>\
<li><code>Number</code> <code>slices</code>: slices (<code>16</code> by default).</li>\
<li><code>Number</code> <code>stacks</code>: stacks (<code>2</code> by default).</li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: a disk with radius <code>r</code>, divided in <code>slices</code> and <code>stacks</code>. </p>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var model = DISK()();\
DRAW(model);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>DOMAIN(dims)(divs)</code></h3>\
\
<p>Create a domain.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>dims</code>: dimensions <code>[dx, dy, dz, ...]</code>.</p>\
\
<ul>\
<li><code>Array</code> <code>dx</code>: intervals <code>[start_x, end_x]</code>\
<ul><li><code>Number</code> <code>start_x</code>: x min</li>\
<li><code>Number</code> <code>end_x</code>: x max</li></ul></li>\
<li><code>Array</code> <code>dy</code>: intervals <code>[start_y, end_y]</code>\
<ul><li><code>Number</code> <code>start_y</code>: y min</li>\
<li><code>Number</code> <code>end_y</code>: y max</li></ul></li>\
<li><code>Array</code> <code>dz</code>: intervals <code>[start_z, end_z]</code>\
<ul><li><code>Number</code> <code>start_z</code>: z min</li>\
<li><code>Number</code> <code>end_z</code>: z max</li></ul></li>\
<li>...</li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>divs</code>: divisions <code>[nx, ny, nz, ...]</code>.</p>\
\
<ul>\
<li><code>Number</code> <code>nx</code>: division along x axes.</li>\
<li><code>Number</code> <code>ny</code>: division along y axes.</li>\
<li><code>Number</code> <code>nz</code>: division along z axes.</li>\
<li>...</li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: a domain. </p>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var domain1 = DOMAIN([[0,PI])([32]);\
DRAW(domain1);\
</code>\
<code>js\
var domain2 = DOMAIN([[0,PI], [0,1]])([32, 2]);\
DRAW(domain2);\
</code>\
<code>js\
var domain3 = DOMAIN([[0,PI], [0,1], [0,0.5]])([32, 2, 5]);\
DRAW(domain3);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>DRAW(object)</code></h3>\
\
<p>Draw an object of 3 or less dimensions.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code> <code>object</code>: the object to draw.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code> <code>object</code>: the object drawn.</p>\
</blockquote>\
\
<hr />\
\
<h4><code>EXPLODE(values)(model)</code></h4>\
\
<p>Explode a <code>model</code>.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>values</code>: <code>[dx, dy, dz, ...]</code></p>\
\
<ul>\
<li><code>Number</code> <code>dx</code>: explosion factor along x axe</li>\
<li><code>Number</code> <code>dy</code>: explosion factor along y axe</li>\
<li><code>Number</code> <code>dx</code>: explosion factor along z axe</li>\
<li>...</li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonimous function. </p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>plasm.Model</code> <code>model</code>: the model to explode.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: the model exploded.</p>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var model = TORUS_SURFACE()();\
var exploded = EXLODE([2,2,2])(model);\
DRAW(exploded);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h4><code>EXTRUDE(hlist)(object)</code></h4>\
\
<p>Extrude an <code>object</code>.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>hlist</code></p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonimous function. </p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code> <code>objetc</code>: the object to extrude.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code> <code>objetc</code>: the extruded object.</p>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var model = SIMPLEX(1);\
var extruded = EXTRUDE([1])(model);\
DRAW(extruded);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h4><code>HIDE(object)</code></h4>\
\
<p>Hide the <code>object</code>.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code> <code>objetc</code>: the object to hide.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code>: the hidden model.</p>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var model = TORUS_SURFACE()();\
DRAW(model);\
HIDE(model);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>INTERVALS(length)(n)</code></h3>\
\
<p>Create a segment from <code>0</code> to <code>length</code> divided in <code>n</code> parts.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Number</code> <code>length</code>: the length of the interval.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonimous function. </p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Number</code> <code>n</code>: the number of divisions.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: a segment from <code>0</code> to <code>length</code> divided in <code>n</code> parts.</p>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var intervals = INTERVALS(10)(5);\
DRAW(intervals);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>MAP(mapping)(domain)</code></h3>\
\
<p>Map a <code>domain</code> by a <code>mapping</code> function.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Function|Array</code> <code>mapping</code>: the mapping function (or array of function)</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>v</code>: point of the <code>domain</code>.</p>\
\
<h4>out</h4>\
\
<p><code>Array</code>: the mapped point. </p>\
</blockquote>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>plasm.Model</code> <code>domain</code>: the domain to map.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: the mapped domain.</p>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var mapping = function (v) { return [v[0] + 1, v[1], v[2]];\
var model = TORUS_SURFACE()();\
var mapped = MAP(mapping)(model);\
DRAW(mapped);\
</code></p>\
\
<p><code>js\
var domain = DOMAIN([[0,1]],[0,2*PI]);\
var mapping = function (v) { return [SIN(v[0]), COS(v[1])]; });\
var model = MAP(mapping)(domain);\
DRAW(model);\
</code></p>\
\
<p><code>js\
var domain = DOMAIN([[0,1]],[0,2*PI]);\
var mapping = [\
  function (v) { return SIN(v[0]); }, \
  function (v) { return COS(v[1]); }\
]);\
var model = MAP(mapping)(domain)\
DRAW(model);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>NUBSLINE(degree)(knots)(controls)</code></h3>\
\
<p>Non-uniform B-Spline.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Number</code> <code>degree</code>: spline degree.\
<code>Number</code> <code>[totpoints=80]</code>: total number of spline's points.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>knots</code>: Array of integer describing spline's knots.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>controls</code>: Array of integer describing spline's control points.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: non uniform spline.</p>\
</blockquote>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var controls = [[0,0],[-1,2],[1,4],[2,3],[1,1],[1,2],[2.5,1],[2.5,3],[4,4],[5,0]];\
var knots = [0,0,0,0,1,2,3,4,5,6,7,7,7,7];\
var nubspline = NUBSPLINE(3)(knots)(controls);\
DRAW(nubspline);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>NUBS(sel)(degree)(knots)(controls)</code></h3>\
\
<p>Transfinite Non-uniform B-Spline.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Function</code> <code>sel</code>: selctor function.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Number</code> <code>degree</code>: spline degree.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>knots</code>: Array of integer describing spline's knots.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>controls</code>: Array of integer describing spline's control points.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: non uniform spline.</p>\
</blockquote>\
</blockquote>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var domain = INTERVALS(1)(20);\
var controls = [[0,0],[-1,2],[1,4],[2,3],[1,1],[1,2],[2.5,1],[2.5,3],[4,4],[5,0]];\
var nubs = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,7,7,7,7])(controls);\
var model = MAP(nubs)(domain);\
DRAW(model);\
</code></p>\
\
<p><code>js\
var domain = DOMAIN([[0,1],[0,1]])([30,30]);\
var b0 = BEZIER(S0)([[0,0,0],[5,-10,0],[10,0,0]]);\
var b1 = BEZIER(S0)([[0,2,0],[8,3,0],[9,2,0]]);\
var b2 = BEZIER(S0)([[0,4,1],[7,5,-1],[8,5,1],[12,4,0]]);\
var b3 = BEZIER(S0)([[0,6,0],[9,6,3],[10,6,-1]]);\
var controls = [b0,b1,b2,b3];\
var nubs = NUBS(S1)(3)([0,0,0,0,7,7,7,7])(controls);\
var model = MAP(nubs)(domain);\
DRAW(model);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>NURBSLINE(degree)(knots)(controls)</code></h3>\
\
<p>Non-uniform Rational B-Spline.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Number</code> <code>degree</code>: spline degree.\
<code>Number</code> <code>[totpoints=80]</code>: total number of spline's points.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>knots</code>: Array of integer describing spline's knots.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>controls</code>: Array of integer describing spline's control points.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: non uniform rational spline.</p>\
</blockquote>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var _p = Math.sqrt(2)/2.0;\
var controls = [[-1,0,1], [-_p,_p,_p], [0,1,1], [_p,_p,_p],[1,0,1], [_p,-_p,_p], [0,-1,1], [-_p,-_p,_p], [-1,0,1]];\
var knots = [0,0,0,1,1,2,2,3,3,4,4,4];\
var nurbs = NURBSPLINE(2)(knots)(controls);\
DRAW(nurbs);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>POLYLINE(points)</code></h3>\
\
<p>Create a polyline made by <code>points</code>.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>points</code>: an array of points (<code>[p0, p1, ...]</code>):</p>\
\
<ul>\
<li><code>Array</code> <code>points[i]</code> <code>point</code>: <code>i</code>-th point\
<ul><li><code>Number</code> <code>point[k]</code>: <code>k</code>-th coord of <code>point</code></li></ul></li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: a polyline made by <code>points</code>.</p>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var points = [[0,0], [1,1], [2,0]];\
var polyline = POLYLINE(points);\
DRAW(polyline);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>POLYPOINT(points)</code></h3>\
\
<p>Create a 0D complex.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>points</code>: an array of points (<code>[p0, p1, ...]</code>):</p>\
\
<ul>\
<li><code>Array</code> <code>points[i]</code> <code>point</code>: <code>i</code>-th point\
<ul><li><code>Number</code> <code>point[k]</code>: <code>k</code>-th coord of <code>point</code></li></ul></li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: a polypoint made by <code>points</code>.</p>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var points = [[0,0], [1,1], [2,0]];\
var polypoint = POLYPOINT(points);\
DRAW(polypoint);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>PROD1x1(array)</code></h3>\
\
<p>Return cartesian product of the two models in <code>array</code>. <br />\
Each model must have Rn equals to 1.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>array</code>: an array of the two operand models (<code>[model1, model2]</code>):</p>\
\
<ul>\
<li><code>Array</code> <code>array[0]</code> <code>model1</code>: the first operand model</li>\
<li><code>Array</code> <code>array[1]</code> <code>model2</code>: the second operand model</li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: result of the product of the two models</p>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var a = POLYLINE([[1],[3],[4]]);\
var b = POLYLINE([[2.2],[3.5],[7.8],[9.0]]);\
var axb = PROD1x1([a,b]);\
DRAW(STRUCT([axb, SKELETON(1)(axb)]));\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>PROD1x2(array)</code></h3>\
\
<p>Return cartesian product of the two models in <code>array</code>. <br />\
The first model must have Rn equals to 1. <br />\
The second model must have Rn equals to 2.  </p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>array</code>: an array of the two operand models (<code>[model1, model2]</code>):</p>\
\
<ul>\
<li><code>Array</code> <code>array[0]</code> <code>model1</code>: the first operand model</li>\
<li><code>Array</code> <code>array[1]</code> <code>model2</code>: the second operand model</li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: result of the product of the two models</p>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var a = POLYLINE([[1],[3],[4]]);\
var b = POLYLINE([[0,2],[1,1],[2,1],[3,0]]);\
var axb = PROD1x2([a,b]);\
DRAW(STRUCT([axb, SKELETON(1)(axb)]));\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>PROD2x1(array)</code></h3>\
\
<p>Return cartesian product of the two models in <code>array</code>. <br />\
The first model must have Rn equals to 2. <br />\
The second model must have Rn equals to 1.  </p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>array</code>: an array of the two operand models (<code>[model1, model2]</code>):</p>\
\
<ul>\
<li><code>Array</code> <code>array[0]</code> <code>model1</code>: the first operand model</li>\
<li><code>Array</code> <code>array[1]</code> <code>model2</code>: the second operand model</li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: result of the product of the two models</p>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var a = POLYLINE([[1],[3],[4]]);\
var b = POLYLINE([[0,2],[1,1],[2,1],[3,0]]);\
var bxa = PROD2x1([b,a]);\
DRAW(STRUCT([bxa, SKELETON(1)(bxa)]));\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>ROTATE(dims)(angle)(object)</code> / <code>R(dims)(angle)(object)</code></h3>\
\
<p>Rotate <code>object</code> by <code>angle</code> on the rotational plane described by <code>dims</code>.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>dims</code>: an array of <code>Number</code> specifying dimensions forming the rotational plane on which rotate the object.</p>\
\
<ul>\
<li><code>Array</code> <code>dims[0]</code> <code>dims1</code>: the first dimension of the rotational plane.</li>\
<li><code>Array</code> <code>dims[1]</code> <code>dims2</code>: the second dimension of the rotational plane.</li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>Funciton</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Number</code> <code>angle</code>: rotational angle (in radiant, from <code>0</code> to <code>2π</code>).</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code> <code>object</code>: the object to rotate.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code>: the rotated object.</p>\
</blockquote>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var model = TORUS_SURFACE()();\
var rotated = ROTATE([0,1])(PI/3)(model);\
DRAW(rotated);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>ROTATIONAL_SURFACE(profile)</code></h3>\
\
<p>Create a rotational surface mapping given the mapping of the profile to rotate.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Function</code> <code>profile</code>: mapping of the profile to rotate.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: mapping of the rotational surface</p>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var domain = DOMAIN([[0,1],[0,2*PI]])([20,20]);\
var profile = BEZIER(S0)([[0,0,0],[3,0,3],[3,0,5],[0,0,7]]);\
var mapping = ROTATIONAL_SURFACE(profile);\
var surface = MAP(mapping)(domain);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>SCALE(axis)(values)(object)</code> / <code>S(axis)(values)(object)</code></h3>\
\
<p>Scale <code>model</code> by <code>values</code> along <code>axis</code>.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>axis</code>: axis to scale along.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>values</code>: scaling factors.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code> <code>object</code>: the object to scale.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code>: the scaled object.</p>\
</blockquote>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var model = TORUS_SURFACE()();\
var scaled = SCALE([1,2])([2,0.5])(model);\
DRAW(scaled);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>SHOW(object)</code></h3>\
\
<p>Show a hidden <code>object</code>.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code> <code>object</code>: the object to show.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code>: the shown model.</p>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var model = TORUS_SURFACE()();\
DRAW(model);\
HIDE(model);\
SHOW(model);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>SIMPLEX(dim)</code></h3>\
\
<p>Create a <code>dim</code>-dimensional simplex with sides length equal to 1.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Number</code> <code>dim</code>: simplex dimension.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: a simplex of dim <code>dim</code>.</p>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var simplex = SIMPLEX(3);\
DRAW(simplex);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>SIMPLEX_GRID(quotes)</code></h3>\
\
<p>Create a grid simplicial complex.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>quotes</code>: an array of array of quotes for each dimension of the grid, starting from dimension 0. <br />\
Quotes may be both positive and negative: </p>\
\
<ul>\
<li>positive ones are actually generated, </li>\
<li>negative ones are considered as a positive spacing.</li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: a grid simplicial complex.</p>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var model = SIMPLEX_GRID([1,-1,1]);\
DRAW(model);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>SIMPLICIAL_COMPLEX(points)(cells)</code></h3>\
\
<p>Create a simplicial complex.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>points</code>: an array of points, represented as arrays of coordinates.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>cells</code>: complex's highest order cells represented as arrays of indices of <code>points</code>.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: a simplicial complex.</p>\
</blockquote>\
\
<p><code>js\
var points = [[0,0],[1,0],[0,1],[1,1],[0.5,1.5]];\
var cells = [[0,1,2],[1,3,2],[2,3,4]];\
var simplicialComplex = SIMPLICIAL_COMPLEX(points)(cells);\
DRAW(simplicialComplex);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>SKELETON(dim)(model)</code></h3>\
\
<p>Extract the <code>dim</code>-skeleton of the <code>model</code>.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Number</code> <code>dim</code>: dimension of the skeleton.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>plasm.Model</code> <code>model</code>: model to which extract skeleton. </p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: <code>dim</code>-skeleton of the <code>model</code>.</p>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var cuboid = CUBOID([1,2,3]);\
var skeleton1 = SKELETON(1)(cuboid);\
DRAW(skeleton1);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>SPLINE(curve)(controlpoints)</code></h3>\
\
<p>Create spline curve.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Function</code> <code>curve</code>: spline curve generator function, such as the result of application of <code>CUBIC_UBSPLINE</code> or <code>CUBIC_CARDINAL</code> to a domain.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: an anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>controlpoints</code>: an array of points and curve mapping functions describing curve control points.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Struct</code>: the spline.</p>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var domain = INTERVALS(1)(20);\
var controlpoints = [[-3,6],[-4,2],[-3,-1],[-1,1],[1.5,1.5],[3,4],[5,5],[7,2],[6,-2],[2,-3]];\
var splineCardinal = COLOR([1,0,0])(SPLINE(CUBIC_CARDINAL(domain))(controlpoints));\
var splineCubic = COLOR([0,1,0])(SPLINE(CUBIC_UBSPLINE(domain))(controlpoints));\
var points = SIMPLICIAL_COMPLEX(controlpoints)([[0],[1],[2],[3],[4],[5],[6],[7],[8],[9]]);\
var out = STRUCT([splineCardinal,splineCubic,points]);\
DRAW(out);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>STRUCT(items)</code></h3>\
\
<p>Structure together <code>plasm.Model</code> and <code>plasm.Struct</code>. <br />\
If a transformation is encountered in <code>items</code>, <br />\
it is applied to all of the following items.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>items</code>: an array of <code>plasm.Model</code> or <code>plasm.Struct</code> or <code>Function</code></p>\
\
<h4>out</h4>\
\
<p>instance of <code>plasm.Struct</code>: a struct.</p>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var cube1 = CUBE(3);\
var cube2 = T([0])([1.3])(cube1);\
var struct1 = STRUCT([cube1, cube2]);\
var t = T([1])([1.3]);\
var struct = STRUCT([struct1, t, struct1, t, cube1]);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>TORUS_SOLID(dims)(divs)</code></h3>\
\
<p>Create a torus solid.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>dims</code>: size of the radii <code>[rMin, rMax]</code></p>\
\
<ul>\
<li><code>Number</code> <code>rMin</code>: internal radius (<code>0.1</code> by default)</li>\
<li><code>Number</code> <code>rMax</code>: external radius (<code>0.9</code> by default)</li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>Function</code>: anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>divs</code>: a triple of approssimation values <code>[m, n, o]</code></p>\
\
<ul>\
<li><code>Number</code> <code>m</code>: (<code>12</code> by default)</li>\
<li><code>Number</code> <code>n</code>: (<code>8</code> by default)</li>\
<li><code>Number</code> <code>o</code>: (<code>8</code> by default)</li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: a solid torus.</p>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
torusSolid = TORUS_SOLID([0.1, 0.9])([12,8,8]);\
DRAW(torusSolid);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>TORUS_SURFACE(dims)(divs)</code></h3>\
\
<p>Create a toroidal surface.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>dims</code>: size of the radii <code>[rMin, rMax]</code></p>\
\
<ul>\
<li><code>Number</code> <code>rMin</code>: internal radius (<code>0.1</code> by default)</li>\
<li><code>Number</code> <code>rMax</code>: external radius (<code>0.9</code> by default)</li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>Function</code>: anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>divs</code>: a couple of approssimation values <code>[m, n, o]</code></p>\
\
<ul>\
<li><code>Number</code> <code>m</code>: slices (<code>12</code> by default)</li>\
<li><code>Number</code> <code>n</code>: stacks (<code>8</code> by default)</li>\
</ul>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code>: a toroidal surface.</p>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var torusSurface = TORUS_SURFACE([0.1, 0.9])([12,8]);\
DRAW(torusSurface);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>TRANSLATE(dims)(values)(object)</code> / <code>T(dims)(values)(object)</code></h3>\
\
<p>Clone <code>model</code> and translate cloned model by <code>values</code> on dimensions <code>dims</code>.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>dims</code>: an array of <code>Number</code> specifying which dimensions translate (first dim has index 0).</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>values</code>: an array of <code>Number</code> specifying translation quantity for every dimension in <code>dims</code>.</p>\
\
<h4>out</h4>\
\
<p><code>Function</code>: anonymous function.</p>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code> <code>object</code>: the object to translate.</p>\
\
<h4>out</h4>\
\
<p><code>plasm.Model</code> or <code>plasm.Struct</code>: the translated object.</p>\
</blockquote>\
</blockquote>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var cube = CUBE(3);\
var translatedCube = T([1,2])([1,3])(cube);\
DRAW(translatedCube);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>TRIANGLE_FAN(points)</code></h3>\
\
<p>Create a tiangle fan: first point is the center of the fan, <br />\
center point is used with next two points to form a triangle. <br />\
Every successive point is used with center point and the previuos point to form a triangle.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>points</code>: an array of points, represented as arrays of coordinates.</p>\
\
<h4>out</h4>\
\
<p>instance of <code>plasm.Model</code>: a triangle fan.</p>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var points = [[0,0,0],[0,1,0],[1,0,0],[0,-1,0],[-1,0,0]];\
var triStrip = TRIANGLE_FAN(points);\
DRAW(triStrip);\
</code></p>\
</blockquote>\
\
<hr />\
\
<h3><code>TRIANGLE_STRIP(points)</code></h3>\
\
<p>Create a tiangle strip: first three points made a triangle, <br />\
every other point is used with next two points to form a triangle.</p>\
\
<h4>I/O</h4>\
\
<blockquote>\
  <h4>in</h4>\
\
<p><code>Array</code> <code>points</code>: an array of points, represented as arrays of coordinates.</p>\
\
<h4>out</h4>\
\
<p>instance of <code>plasm.Model</code>: a triangle strip.</p>\
</blockquote>\
\
<h4>Example</h4>\
\
<blockquote>\
  <p><code>js\
var points = [[0,0,0],[0,1,0],[1,0,0],[1,1,0],[2,0,0]];\
var triStrip = TRIANGLE_STRIP(points);\
DRAW(triStrip);\
</code></p>\
</blockquote>\
";