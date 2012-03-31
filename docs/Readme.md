# plasm.js

### JavaScript Programming Language for Solid Modeling

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
> var model = TORUSSURFACE()();
> var boundary = BOUNDARY(d)(model);
> DRAW(boundary);
> ```

- - -

### `CANCEL(model)`

Remove the `model` from the scene graph.

#### I/O

> #### in
> `plasm.Model` `model`: the model to cancel.
> 
> #### out
> `plasm.Model` `model`: the model cancelled.

#### Example

> ```js
> var model = TORUSSURFACE()();
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

### `COLOR(color)(model)`

Color the `model` with `color`.

#### I/O

> #### in
> `Array` `color`: rgb color components (from `0` to `1`).
> 
> - `Number` `r`: red component (from `0` to `1`, `0` by default).
> - `Number` `g`: green component (from `0` to `1`, `0` by default).
> - `Number` `b`: blue component (from `0` to `1`, `0` by default).
> 
> #### out
> `Function`: an anonymous function.
>
> > #### in
> > `plasm.Model` `model`: the model to color.
> > 
> > #### out
> > `plasm.Model`: the model `colored` with `color`. 

#### Example

> ```js
> var color = [0.8, 0.4, 0.2];
> var model = TORUSSURFACE()();
> COLOR(color)(model);
> DRAW(model);
> ```

- - -

### `CUBE(dim)`

Create a cube with `dim` dimension.

#### I/O

> #### in
> `Number` `dim`: dimension of the cube.
> 
> #### out
> `plasm.Model`: a cube with `dim` dimension.

#### Example

> ```js
> var dim = 2.5;
> var cube = CUBE(dim);
> DRAW(cube);
> ```

- - -

### `CUBOID(dims)`

Create a cuboidal simplicial complex with dimensions `[dx, dy, dz]`.

#### I/O

> #### in
> `Array` `dims`: dimensions of the simplicial complex.
> 
> - `Number` `dx`: dimension along x axe
> - `Number` `dy`: dimension along y axe
> - `Number` `dz`: dimension along z axe
> 
> #### out
> `plasm.Model`: a cuboidal simplicial complex with dimensions `[dx, dy, dz]`.

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

### `CYLSURFACE(dims)(divs)`

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

Descr.

#### I/O

> #### in
> `type` `name`: descr.
> 
> #### out
> `type` `name`: descr.

#### Example

> ```js
> var x = ;
> DRAW(x);
> ```

- - -

### `DOMAIN(dims)(divs)`

Descr.

#### I/O

> #### in
> `type` `name`: descr.
> 
> #### out
> `type` `name`: descr.

#### Example

> ```js
> var x = ;
> DRAW(x);
> ```

- - -

### `DRAW(model)`

Draw a model.

#### I/O

> #### in
> `plasm.Model` or `plasm.Struct` `model`: the model to draw.
> 
> #### out
> `plasm.Model` or `plasm.Struct` `model`: the model drawn.

- - -

#### `EXPLODE(values)(model)`

#### `EXTRUDE(values)(model)`

#### `HIDE(model)`

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
> i = INTERVALS(10)(5);
> DRAW(i);
>```

- - -

### `MAP(mapping)(domain)`

Descr.

#### I/O

> #### in
> `type` `name`: descr.
> 
> #### out
> `type` `name`: descr.

#### Example

> ```js
> var x = ;
> DRAW(x);
> ```

- - -

### `POLYLINE(points)`

Descr.

#### I/O

> #### in
> `type` `name`: descr.
> 
> #### out
> `type` `name`: descr.

#### Example

> ```js
> var x = ;
> DRAW(x);
> ```

- - -

### `ROTATE(dims)(angle)(model)` / `R(dims)(angle)(model)`

Descr.

#### I/O

> #### in
> `type` `name`: descr.
> 
> #### out
> `type` `name`: descr.

#### Example

> ```js
> var x = ;
> DRAW(x);
> ```

- - -

### `SCALE(dims)(values)(model)` / `S(dims)(values)(model)`

Descr.

#### I/O

> #### in
> `type` `name`: descr.
> 
> #### out
> `type` `name`: descr.

#### Example

> ```js
> var x = ;
> DRAW(x);
> ```

- - -

### `SHOW(model)`

Show a `plasm.Model` drawn and then hidden.

#### I/O

> #### in
> `plasm.Model` `model`: model to be shown.
> 
> #### out
> `plasm.Model`: shown model.

#### Example

> ```js
> var cube = CUBE(3);
> DRAW(cube);
> HIDE(cube);
> SHOW(cube);
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
>   - positive ones are actually generated, 
>   - negative ones are considered as a positive spacing.
> 
> #### out
> `plasm.Model`: a grid simplicial complex.

#### Example

> ```js
> var x = ;
> DRAW(x);
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
> var cells = [[0,1,2],[2,3,4],[4,5,6]];
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

### `STRUCT(items)`

Structure together `plasm.Model` and `plasm.Struct`.  
If a transformation is encountered in `items`,  
it is applied to all of the following items.

###I/O
> #### in
> `Array` `items`: an array of `plasm.Model` or plasm.Struct` or `Function`
>
> #### out
> instance of `plasm.Struct`: a struct.

#### Example

```js
var cube1 = CUBE(3);
var cube2 = T([0])([1.3])(cube1);
var struct1 = STRUCT([cube1, cube2]);
var t = T([1])([1.3]);
var struct = STRUCT([struct1, t, struct1, t, cube1]);
```
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

```js
torusSolid = TORUS_SOLID([0.1, 0.9])([12,8,8]);
DRAW(torusSolid);
```

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

```js
var torusSurface = TORUS_SURFACE([0.1, 0.9])([12,8]);
DRAW(torusSurface);
```

- - -

### `TRANSLATE(dims)(values)(model)` / `T(dims)(values)(model)`

Clone `model` and translate cloned model by `values` on dimensions `dims`.

####I/O
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
> > > `plasm.Model` `model`: the model to translate.
> > > 
> > > #### out:
> > > instance of `plasm.Model`: a translated clone of `model`.

#### Example

```js
var cube = CUBE(3);
>var translatedCube = T([1,2])([1,3])(cube);
DRAW(translatedCube);
```

- - -

### `TRIANGLE_FAN(points)`

Create a tiangle fan: first point is the center of the fan,  
center point is used with next two points to form a triangle.  
Every successive point is used with center point and the previuos point to form a triangle.

####I/O
> #### in
> `Array` `points`: an array of points, represented as arrays of coordinates.
>
> #### out
> instance of `plasm.Model`: a triangle fan.

#### Example

```js
var points = [[0,0,0],[0,1,0],[1,0,0],[0,-1,0],[-1,0,0]];
var triStrip = TRIANGLE_FAN(points);
DRAW(triStrip);
```

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

```js
var points = [[0,0,0],[0,1,0],[1,0,0],[1,1,0],[2,0,0]];
var triStrip = TRIANGLE_STRIP(points);
DRAW(triStrip);
```

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