# plasm.js

### JavaScript Programming Language for Solid Modeling

- - -

### `BEZIER(sel)(controlpoints)`
Transfinite mapping function of genric degree Bezier curve.

#### I/O

> #### in
> `Function` `selector`: domain coordinate selector function.
>
> > #### in
> > `Array` `v`: point of the `domain`.
> >
> > #### out
> > `Number`: the selected coordinate. 
> 
> #### out
> `Function`: an anonymous function.
> 
> > #### in
> > `Array` `controlpoints`: an array of points and curve mapping functions describing curve control points.
> >
> > #### out
> > `Function`: an anonymous mapping function.

#### Example

> ```js
> var domain = INTERVALS(1)(32);
> var controlpoints = [[-0,0],[1,0],[1,1],[2,1],[3,1]];
> var curveMapping = BEZIER(S0)(controlpoints);
> var curve = MAP(curveMapping)(domain);
> DRAW(curve);
> ```

> ```js
> var domain = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);
> var c0 = BEZIER(S0)([[0,0,0],[10,0,0]]);
> var c1 = BEZIER(S0)([[0,2,0],[8,3,0],[9,2,0]]);
> var c2 = BEZIER(S0)([[0,4,1],[7,5,-1],[8,5,1],[12,4,0]]);
> var c3 = BEZIER(S0)([[0,6,0],[9,6,3],[10,6,-1]]);
> var out = MAP(BEZIER(S1)([c0,c1,c2,c3]))(domain);
> DRAW(out);
>```

- - -

### `BOUNDARY(d)(model)`

Get the `d`-boundary of the `model`.

#### I/O

> #### in
> `Number` `d`: space dimension.
> 
> #### out
> `plasm.Model`: the `d`-boundary of the `model`.

#### Example

> ```js
> var d = 1;
> var model = TORUS_SURFACE()();
> var boundary = BOUNDARY(d)(model);
> DRAW(boundary);
> ```

- - -

### `CANCEL(object)`

Remove the `object` from the scene graph.

#### I/O

> #### in
> `plasm.Model` or `plasm.Struct` `object`: the object to cancel.
> 
> #### out
> `plasm.Model` or `plasm.Struct` `object`: the cancelled object.

#### Example

> ```js
> var model = TORUS_SURFACE()();
> DRAW(model);
> CANCEL(model);
> ```

- - -

### `CIRCLE(r)(divs)`

Create a circle with radius `r`, approximated by `divs` segments.

#### I/O

> #### in
> `Number` `r`: the radius of the circle.
> 
> #### out
> `Function`: an anonymous function.
> 
> > #### in
> > `Number` `divs`: the number of segments that approximate the circle.
> > 
> > #### out
> > `plasm.Model`: the circle with radius `r`, approximated by `divs` segments.

#### Example

> ```js
> var r = 1.5;
> var divs = 32;
> var circle = CIRCLE(r)(divs);
> DRAW(circle);
> ```

- - -

### `COLOR(color)(object)`

Clone `object` and color cloned object with `color`.

#### I/O

> #### in
> `Array` `color`: rgba color components (from `0` to `1`).
> 
> - `Number` `r`: red component (from `0` to `1`, `0` by default).
> - `Number` `g`: green component (from `0` to `1`, `0` by default).
> - `Number` `b`: blue component (from `0` to `1`, `0` by default).
> - `Number` `a`: alpha component (from `0` to `1`, `1` by default).
> 
> #### out
> `Function`: an anonymous function.
>
> > #### in
> > `plasm.Model` or `plasm.Struct` `object`: the object to color.
> > 
> > #### out
> > `plasm.Model` or `plasm.Struct`: the cloned colored object. 

#### Example

> ```js
> var color = [0.8, 0.4, 0.2, 0.7];
> var model = TORUS_SURFACE()();
> var coloredModel = COLOR(color)(model);
> DRAW(coloredModel);
> ```

- - -

### `CUBE(dim)`

Create a `dim`-dimensional cube.

#### I/O

> #### in
> `Number` `dim`: dimension of the cube.
> 
> #### out
> `plasm.Model`: a cube with `dim` dimension.

#### Example

> ```js
> var dim = 2;
> var cube = CUBE(dim);
> DRAW(cube);
> ```

- - -

### `CUBIC_CARDINAL(domain)`
Tranfinite Cubic cardinal splines curve generator function on `domain`.

#### I/O

> #### in
> `plasm.Model` `domain`: domain of the generator function.
>
> #### out
> `Function`: an anonymous function.
>
> > #### in
> > `Array` `controlpoints`: an array of points and curve mapping functions describing curve control points.
> >
> > #### out
> > `plasm.Model`: a spline segment.

#### Example

> ```js
> var domain = INTERVALS(1)(20);
> var controlpoints = [[-3,6],[-4,2],[-3,-1],[-1,1],[1.5,1.5],[3,4],[5,5],[7,2],[6,-2],[2,-3]];
> var splineCardinal = SPLINE(CUBIC_CARDINAL(domain))(controlpoints);
> DRAW(splineCardinal);
>```

- - -

### `CUBIC_HERMITE(selector)(controlpoints)`
Transfinite mapping function of cubic Hermite curve.

#### I/O

> #### in
> `Function` `selector`: domain coordinate selector function.
>
> > #### in
> > `Array` `v`: point of the `domain`.
> >
> > #### out
> > `Number`: the selected coordinate. 
> 
> #### out
> `Function`: an anonymous function.
> 
> > #### in
> > `Array` `controlpoints`: an array of points and curve mapping functions describing curve control points.
> >
> > #### out
> > `Function`: an anonymous mapping function.

#### Example

> ```js
> var domain = INTERVALS(1)(20);
> var controlpoints = [[1,0],[1,1],[ -1, 1],[ 1,0]];
> var curveMapping = CUBIC_HERMITE(S0)(controlpoints);
> var curve = MAP(curveMapping)(domain);
> DRAW(curve);
> ```

> ```js
> var domain = PROD1x1([INTERVALS(1)(14),INTERVALS(1)(14)]);
> var c1 = CUBIC_HERMITE(S0)([[1,0,0],[0,1,0],[0,3,0],[-3,0,0]]);
> var c2 = CUBIC_HERMITE(S0)([[0.5,0,0],[0,0.5,0],[0,1,0],[-1,0,0]]);
> var sur3 = CUBIC_HERMITE(S1)([c1,c2,[1,1,1],[-1,-1,-1]]);
> var out = MAP(sur3)(domain);
> DRAW(out);
>```

- - -

### `CUBIC_UBSPLINE(domain)`
Tranfinite cubic uniform B-splines curve generator function on `domain`.

#### I/O

> #### in
> `plasm.Model` `domain`: domain of the generator function.
>
> #### out
> `Function`: an anonymous function.
>
> > #### in
> > `Array` `controlpoints`: an array of points and curve mapping functions describing curve control points.
> >
> > #### out
> > `plasm.Model`: a spline segment.

#### Example

> ```js
> var domain = INTERVALS(1)(20);
> var controlpoints = [[-3,6],[-4,2],[-3,-1],[-1,1],[1.5,1.5],[3,4],[5,5],[7,2],[6,-2],[2,-3]];
> var splineCubic = SPLINE(CUBIC_UBSPLINE(domain))(controlpoints);
> DRAW(splineCubic);
>```

- - -

### `CUBOID(dims)`

Create a cuboidal simplicial complex with dimensions `[dx, dy, dz, ...]`.

#### I/O

> #### in
> `Array` `dims`: sides length for each dimension of the simplicial complex.
> 
> - `Number` `dx`: dimension along x axe
> - `Number` `dy`: dimension along y axe
> - `Number` `dz`: dimension along z axe
> - ...
> 
> #### out
> `plasm.Model`: a cuboidal simplicial complex with dimensions `[dx, dy, dz, ...]`.

#### Example

> ```js
> var dx = 1;
> var dy = 2;
> var dz = 3;
> 
> var cuboid1 = CUBOID([dx]);
> DRAW(cuboid1);
> ```
> ```js
> var cuboid2 = CUBOID([dx, dy]);
> DRAW(cuboid2);
> ```
> ```js
> var cuboid3 = CUBOID([dx, dy, dz]);
> DRAW(cuboid3);
> ```

- - -

### `CYL_SURFACE(dims)(divs)`

Create a cylindrical surface.

#### I/O

> #### in
> `Array` `dims`: dimensions `[r, h]`.
> 
> - `Number` `r`: the radius (`1` by default).
> - `Number` `h`: the height (`1` by default).
> 
> #### out
> `Function`: an anonymous function.
> 
> > #### in
> > `Array` `divs`: divisions `[slices, stacks]`.
> > 
> > - `Number` `slices`: slices (`16` by default).
> > - `Number` `stacks`: stacks (`2` by default).
> > 
> > #### out
> > `plasm.Model`: a cylindrical surface with radius `r` and height `h`, divided in `slices` and `stacks`. 

#### Example

> ```js
> var model = CYLSURFACE()();
> DRAW(model);
> ```

- - -

### `DISK(r)(divs)`

Create a disk surface with radius `r`.

#### I/O

> #### in
> `Number` `r`: the radius (`1` by default).
> 
> #### out
> `Function`: an anonymous function.
> 
> > #### in
> > `Array` `divs`: divisions `[slices, stacks]`.
> > 
> > - `Number` `slices`: slices (`16` by default).
> > - `Number` `stacks`: stacks (`2` by default).
> > 
> > #### out
> > `plasm.Model`: a disk with radius `r`, divided in `slices` and `stacks`. 

#### Example

> ```js
> var model = DISK()();
> DRAW(model);
> ```

- - -

### `DOMAIN(dims)(divs)`

Create a domain.

#### I/O

> #### in
> `Array` `dims`: dimensions `[dx, dy, dz, ...]`.
> 
> - `Array` `dx`: intervals `[start_x, end_x]`
>   - `Number` `start_x`: x min
>   - `Number` `end_x`: x max
> - `Array` `dy`: intervals `[start_y, end_y]`
>   - `Number` `start_y`: y min
>   - `Number` `end_y`: y max
> - `Array` `dz`: intervals `[start_z, end_z]`
>   - `Number` `start_z`: z min
>   - `Number` `end_z`: z max
> - ...
> 
> #### out
> `Function`: an anonymous function.
> 
> > #### in
> > `Array` `divs`: divisions `[nx, ny, nz, ...]`.
> > 
> > - `Number` `nx`: division along x axes.
> > - `Number` `ny`: division along y axes.
> > - `Number` `nz`: division along z axes.
> > - ...
> > 
> > #### out
> > `plasm.Model`: a domain. 

#### Example

> ```js
> var domain1 = DOMAIN([[0,PI])([32]);
> DRAW(domain1);
> ```
> ```js
> var domain2 = DOMAIN([[0,PI], [0,1]])([32, 2]);
> DRAW(domain2);
> ```
> ```js
> var domain3 = DOMAIN([[0,PI], [0,1], [0,0.5]])([32, 2, 5]);
> DRAW(domain3);
> ```

- - -

### `DRAW(object)`

Draw an object of 3 or less dimensions.

#### I/O

> #### in
> `plasm.Model` or `plasm.Struct` `object`: the object to draw.
> 
> #### out
> `plasm.Model` or `plasm.Struct` `object`: the object drawn.

- - -

#### `EXPLODE(values)(model)`

Explode a `model`.

#### I/O
> #### in
> `Array` `values`: `[dx, dy, dz, ...]`
> 
> - `Number` `dx`: explosion factor along x axe
> - `Number` `dy`: explosion factor along y axe
> - `Number` `dx`: explosion factor along z axe
> - ...
> 
> #### out 
> `Function`: an anonimous function. 
>   
> > #### in
> > `plasm.Model` `model`: the model to explode.
> >  
> > #### out
> > `plasm.Model`: the model exploded.

#### Example
> ```js
> var model = TORUS_SURFACE()();
> var exploded = EXLODE([2,2,2])(model);
> DRAW(exploded);
>```

- - -

#### `EXTRUDE(hlist)(object)`

Extrude an `object`.

#### I/O
> #### in
> `Array` `hlist`
> 
> #### out 
> `Function`: an anonimous function. 
>   
> > #### in
> > `plasm.Model` or `plasm.Struct` `objetc`: the object to extrude.
> >  
> > #### out
> > `plasm.Model` or `plasm.Struct` `objetc`: the extruded object.

#### Example
> ```js
> var model = SIMPLEX(1);
> var extruded = EXTRUDE([1])(model);
> DRAW(extruded);
>```

- - -

#### `HIDE(object)`

Hide the `object`.

#### I/O

> #### in
> `plasm.Model` or `plasm.Struct` `objetc`: the object to hide.
> 
> #### out
> `plasm.Model` or `plasm.Struct`: the hidden model.

#### Example

> ```js
> var model = TORUS_SURFACE()();
> DRAW(model);
> HIDE(model);
> ```

- - -

### `INTERVALS(length)(n)`

Create a segment from `0` to `length` divided in `n` parts.

#### I/O
> #### in
> `Number` `length`: the length of the interval.
> 
> #### out 
> `Function`: an anonimous function. 
>   
> > #### in
> > `Number` `n`: the number of divisions.
> >  
> > #### out
> > `plasm.Model`: a segment from `0` to `length` divided in `n` parts.

#### Example
> ```js
> var intervals = INTERVALS(10)(5);
> DRAW(intervals);
>```

- - -

### `MAP(mapping)(domain)`

Map a `domain` by a `mapping` function.

#### I/O

> #### in
> `Function` `mapping`: the mapping function.
>
> > #### in
> > `Array` `v`: point of the `domain`.
> >
> > #### out
> > `Array`: the mapped point. 
> 
> #### out
> `Function`: an anonymous function.
> 
> > #### in
> > `plasm.Model` `domain`: the domain to map.
> >
> > #### out
> > `plasm.Model`: the mapped domain.

#### Example

> ```js
> var mapping = function (v) { return [v[0] + 1, v[1], v[2]];
> var model = TORUS_SURFACE()();
> var mapped = MAP(mapping)(model);
> DRAW(mapped);
> ```

- - -

### `POLYLINE(points)`

Create a polyline made by `points`.

#### I/O

> #### in
> `Array` `points`: an array of points (`[p0, p1, ...]`):
>
> - `Array` `points[i]` `point`: `i`-th point
>   - `Number` `point[k]`: `k`-th coord of `point`
> 
> #### out
> `plasm.Model`: a polyline made by `points`.

#### Example

> ```js
> var points = [[0,0], [1,1], [2,0]];
> var polyline = POLYLINE(points);
> DRAW(polyline);
> ```

- - -

### `PROD1x1(array)`

Return cartesian product of the two models in `array`.  
Each model must have Rn equals to 1.

#### I/O

> #### in
> `Array` `array`: an array of the two operand models (`[model1, model2]`):
>
> - `Array` `array[0]` `model1`: the first operand model
> - `Array` `array[1]` `model2`: the second operand model
> 
> #### out
> `plasm.Model`: result of the product of the two models

#### Example

> ```js
> var a = POLYLINE([[1],[3],[4]]);
> var b = POLYLINE([[2.2],[3.5],[7.8],[9.0]]);
> var axb = PROD1x1([a,b]);
> DRAW(STRUCT([axb, SKELETON(1)(axb)]));
> ```

- - -

### `PROD1x2(array)`

Return cartesian product of the two models in `array`.  
The first model must have Rn equals to 1.  
The second model must have Rn equals to 2.  

#### I/O

> #### in
> `Array` `array`: an array of the two operand models (`[model1, model2]`):
>
> - `Array` `array[0]` `model1`: the first operand model
> - `Array` `array[1]` `model2`: the second operand model
> 
> #### out
> `plasm.Model`: result of the product of the two models

#### Example

> ```js
> var a = POLYLINE([[1],[3],[4]]);
> var b = POLYLINE([[0,2],[1,1],[2,1],[3,0]]);
> var axb = PROD1x2([a,b]);
> DRAW(STRUCT([axb, SKELETON(1)(axb)]));
> ```

- - -

### `PROD2x1(array)`

Return cartesian product of the two models in `array`.  
The first model must have Rn equals to 2.  
The second model must have Rn equals to 1.  

#### I/O

> #### in
> `Array` `array`: an array of the two operand models (`[model1, model2]`):
>
> - `Array` `array[0]` `model1`: the first operand model
> - `Array` `array[1]` `model2`: the second operand model
> 
> #### out
> `plasm.Model`: result of the product of the two models

#### Example

> ```js
> var a = POLYLINE([[1],[3],[4]]);
> var b = POLYLINE([[0,2],[1,1],[2,1],[3,0]]);
> var bxa = PROD2x1([b,a]);
> DRAW(STRUCT([bxa, SKELETON(1)(bxa)]));
> ```

- - -

### `ROTATE(dims)(angle)(object)` / `R(dims)(angle)(object)`

Rotate `object` by `angle` on the rotational plane described by `dims`.

#### I/O

> #### in
> `Array` `dims`: an array of `Number` specifying dimensions forming the rotational plane on which rotate the object.
>
> - `Array` `dims[0]` `dims1`: the first dimension of the rotational plane.
> - `Array` `dims[1]` `dims2`: the second dimension of the rotational plane.
> 
> #### out
> `Funciton`: an anonymous function.
>
> > #### in
> > `Number` `angle`: rotational angle (in radiant, from `0` to `2π`).
> > 
> > #### out
> > `Function`: an anonymous function.
> > 
> > > #### in
> > > `plasm.Model` or `plasm.Struct` `object`: the object to rotate.
> > > 
> > > #### out
> > > `plasm.Model` or `plasm.Struct`: the rotated object.

#### Example

> ```js
> var model = TORUS_SURFACE()();
> var rotated = ROTATE([0,1])(PI/3)(model);
> DRAW(rotated);
> ```

- - -

### `SCALE(axis)(values)(object)` / `S(axis)(values)(object)`

Scale `model` by `values` along `axis`.

#### I/O

> #### in
> `Array` `axis`: axis to scale along.
> 
> #### out
> `Funciton`: an anonymous function.
>
> > #### in
> > `Array` `values`: scaling factors.
> > 
> > #### out
> > `Function`: an anonymous function.
> > 
> > > #### in
> > > `plasm.Model` or `plasm.Struct` `object`: the object to scale.
> > > 
> > > #### out
> > > `plasm.Model` or `plasm.Struct`: the scaled object.

#### Example

> ```js
> var model = TORUS_SURFACE()();
> var scaled = SCALE([1,2])([2,0.5])(model);
> DRAW(scaled);
> ```

- - -

### `SHOW(object)`

Show a hidden `object`.

#### I/O

> #### in

> `plasm.Model` or `plasm.Struct` `object`: the object to show.
> 
> #### out
> `plasm.Model` or `plasm.Struct`: the shown model.

#### Example

> ```js
> var model = TORUS_SURFACE()();
> DRAW(model);
> HIDE(model);
> SHOW(model);
> ```

- - -

### `SIMPLEX(dim)`

Create a `dim`-dimensional simplex with sides length equal to 1.

#### I/O

> #### in
> `Number` `dim`: simplex dimension.
> 
> #### out
> `plasm.Model`: a simplex of dim `dim`.

#### Example

> ```js
> var simplex = SIMPLEX(3);
> DRAW(simplex);
> ```

- - -

### `SIMPLEX_GRID(quotes)`

Create a grid simplicial complex.

#### I/O

> #### in
> `Array` `quotes`: an array of array of quotes for each dimension of the grid, starting from dimension 0.  
> Quotes may be both positive and negative: 
> 
> - positive ones are actually generated, 
> - negative ones are considered as a positive spacing.
> 
> #### out
> `plasm.Model`: a grid simplicial complex.

#### Example

> ```js
> var model = SIMPLEX_GRID([1,-1,1]);
> DRAW(model);
> ```

- - -

### `SIMPLICIAL_COMPLEX(points)(cells)`

Create a simplicial complex.

#### I/O

> #### in
> `Array` `points`: an array of points, represented as arrays of coordinates.
> 
> #### out
> `Function`: anonymous function.
> 
> > #### in
> > `Array` `cells`: complex's highest order cells represented as arrays of indices of `points`.
> >
> > #### out
> > `plasm.Model`: a simplicial complex.

> ```js
> var points = [[0,0],[1,0],[0,1],[1,1],[0.5,1.5]];
> var cells = [[0,1,2],[1,3,2],[2,3,4]];
> var simplicialComplex = SIMPLICIAL_COMPLEX(points)(cells);
> DRAW(simplicialComplex);
> ```

- - -

### `SKELETON(dim)(model)`

Extract the `dim`-skeleton of the `model`.

#### I/O

> #### in
> `Number` `dim`: dimension of the skeleton.
> 
> #### out
> `Function`: anonymous function.
> 
> > #### in
> > `plasm.Model` `model`: model to which extract skeleton. 
> >
> > #### out
> > `plasm.Model`: `dim`-skeleton of the `model`.

#### Example

> ```js
> var cuboid = CUBOID([1,2,3]);
> var skeleton1 = SKELETON(1)(cuboid);
> DRAW(skeleton1);
> ```

- - -

### `SPLINE(curve)(controlpoints)`
Create spline curve.

#### I/O

> #### in
> `Function` `curve`: spline curve generator function, such as the result of application of `CUBIC_UBSPLINE` or `CUBIC_CARDINAL` to a domain.
>
> #### out
> `Function`: an anonymous function.
> 
> > #### in
> > `Array` `controlpoints`: an array of points and curve mapping functions describing curve control points.
> >
> > #### out
> > `plasm.Struct`: the spline.

#### Example

>```js
> var domain = INTERVALS(1)(20);
> var controlpoints = [[-3,6],[-4,2],[-3,-1],[-1,1],[1.5,1.5],[3,4],[5,5],[7,2],[6,-2],[2,-3]];
> var splineCardinal = COLOR([1,0,0])(SPLINE(CUBIC_CARDINAL(domain))(controlpoints));
> var splineCubic = COLOR([0,1,0])(SPLINE(CUBIC_UBSPLINE(domain))(controlpoints));
> var points = SIMPLICIAL_COMPLEX(controlpoints)([[0],[1],[2],[3],[4],[5],[6],[7],[8],[9]]);
> var out = STRUCT([splineCardinal,splineCubic,points]);
> DRAW(out);
>```

- - -

### `STRUCT(items)`

Structure together `plasm.Model` and `plasm.Struct`.  
If a transformation is encountered in `items`,  
it is applied to all of the following items.

#### I/O

> #### in
> `Array` `items`: an array of `plasm.Model` or `plasm.Struct` or `Function`
>
> #### out
> instance of `plasm.Struct`: a struct.

#### Example

> ```js
> var cube1 = CUBE(3);
> var cube2 = T([0])([1.3])(cube1);
> var struct1 = STRUCT([cube1, cube2]);
> var t = T([1])([1.3]);
> var struct = STRUCT([struct1, t, struct1, t, cube1]);
> ```

- - - 

### `TORUS_SOLID(dims)(divs)`

Create a torus solid.

#### I/O
> #### in
> `Array` `dims`: size of the radii `[rMin, rMax]`
> 
> - `Number` `rMin`: internal radius (`0.1` by default)
> - `Number` `rMax`: external radius (`0.9` by default)
> 
> #### out
> `Function`: anonymous function.
> 
> > #### in
> > `Array` `divs`: a triple of approssimation values `[m, n, o]`
> > 
> > - `Number` `m`: (`12` by default)
> > - `Number` `n`: (`8` by default)
> > - `Number` `o`: (`8` by default)
> > 
> > #### out
> > `plasm.Model`: a solid torus.

#### Example

> ```js
> torusSolid = TORUS_SOLID([0.1, 0.9])([12,8,8]);
> DRAW(torusSolid);
> ```

- - -

### `TORUS_SURFACE(dims)(divs)`

Create a toroidal surface.

#### I/O

> #### in
> `Array` `dims`: size of the radii `[rMin, rMax]`
> 
> - `Number` `rMin`: internal radius (`0.1` by default)
> - `Number` `rMax`: external radius (`0.9` by default)
> 
> #### out
> `Function`: anonymous function.
> 
> > #### in
> > `Array` `divs`: a couple of approssimation values `[m, n, o]`
> > 
> > - `Number` `m`: slices (`12` by default)
> > - `Number` `n`: stacks (`8` by default)
> > 
> > #### out 
> > `plasm.Model`: a toroidal surface.

#### Example

> ```js
> var torusSurface = TORUS_SURFACE([0.1, 0.9])([12,8]);
> DRAW(torusSurface);
> ```

- - -

### `TRANSLATE(dims)(values)(object)` / `T(dims)(values)(object)`

Clone `model` and translate cloned model by `values` on dimensions `dims`.

#### I/O

> #### in
> `Array` `dims`: an array of `Number` specifying which dimensions translate (first dim has index 0).
>
> #### out
> `Function`: anonymous function.
> 
> > #### in
> > `Array` `values`: an array of `Number` specifying translation quantity for every dimension in `dims`.
> > 
> > #### out
> > `Function`: anonymous function.
> > 
> > > #### in
> > > `plasm.Model` or `plasm.Struct` `object`: the object to translate.
> > > 
> > > #### out
> > > `plasm.Model` or `plasm.Struct`: the translated object.

#### Example

> ```js
> var cube = CUBE(3);
> var translatedCube = T([1,2])([1,3])(cube);
> DRAW(translatedCube);
> ```

- - -

### `TRIANGLE_FAN(points)`

Create a tiangle fan: first point is the center of the fan,  
center point is used with next two points to form a triangle.  
Every successive point is used with center point and the previuos point to form a triangle.

#### I/O

> #### in
> `Array` `points`: an array of points, represented as arrays of coordinates.
>
> #### out
> instance of `plasm.Model`: a triangle fan.

#### Example

> ```js
> var points = [[0,0,0],[0,1,0],[1,0,0],[0,-1,0],[-1,0,0]];
> var triStrip = TRIANGLE_FAN(points);
> DRAW(triStrip);
> ```

- - -

### `TRIANGLE_STRIP(points)`

Create a tiangle strip: first three points made a triangle,  
every other point is used with next two points to form a triangle.

#### I/O

> #### in
> `Array` `points`: an array of points, represented as arrays of coordinates.
>
> #### out
> instance of `plasm.Model`: a triangle strip.

#### Example

> ```js
> var points = [[0,0,0],[0,1,0],[1,0,0],[1,1,0],[2,0,0]];
> var triStrip = TRIANGLE_STRIP(points);
> DRAW(triStrip);
> ```

- - -

## Demos

### Demo 01

```js
var cuboid = APPLY([T([0,1])([-.5,-.5]), CUBOID([1,1,.2])]);
var rototranslation = COMP([R([0,1])([Math.PI/15]),T([2])([0.2])]);
DRAW(STRUCT(REPLICA(10)([cuboid, rototranslation])));
```

- - -

### Demo 02

```js
var r = 6;
var tx = T([0])([1.5]);
var c1 = CUBE(3);
var rx = REPLICA(r)([c1,tx]);
var s1 = STRUCT(rx);
var ty = T([1])([1.5]);
var ry = REPLICA(r)([s1,ty]);
var s2 = STRUCT(ry);
var tz = T([2])([1.5]);
var rz = REPLICA(r)([s2,tz]);
var s3 = STRUCT(rz);
DRAW(s3);
```
