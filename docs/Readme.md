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
> `Array` `dims`: dimensions `[dx, dy, dz]`.
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
> 
> #### out
> `Function`: an anonymous function.
> 
> > #### in
> > `Array` `divs`: divisions `[nx, ny, nz]`.
> > 
> > - `Number` `nx`: division along x axes.
> > - `Number` `ny`: division along y axes.
> > - `Number` `nz`: division along z axes.
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

Explode a `model`.

#### I/O
> #### in
> `Array` `values`: `[dx, dy, dz]`
> 
> - `Number` `dx`: explosion factor along x axe
> - `Number` `dy`: explosion factor along y axe
> - `Number` `dx`: explosion factor along z axe
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
> var model = TORUSSURFACE()();
> var exploded = EXLODE([2,2,2])(model);
> DRAW(exploded);
>```

- - -

#### `EXTRUDE(values)(model)`

Extrude a `model`.

#### I/O
> #### in
> `Array` `values`
> 
> #### out 
> `Function`: an anonimous function. 
>   
> > #### in
> > `plasm.Model` `model`: the model to extrude.
> >  
> > #### out
> > `plasm.Model`: the model extruded.

#### Example
> ```js
> var model = SIMPLEX([1]);
> var extruded = EXTRUDE([1])(simplex);
> DRAW(extruded);
>```

- - -

#### `HIDE(model)`

Hide the `model`.

#### I/O

> #### in
> `plasm.Model` `model`: the model to hide.
> 
> #### out
> `plasm.Model`: the hidden model.

#### Example

> ```js
> var model = TORUSSURFACE()();
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
> i = INTERVALS(10)(5);
> DRAW(i);
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

### `SIMPLEX(dim)`

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

### `SIMPLEXGRID(quotes)`

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

### `SIMPLICIALCOMPLEX(points)(complex)`

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
var translatedCube = T([1,2])([1,3])(cube);
DRAW(translatedCube);
```

- - -

### `TRIANGLE_FAN(points)`

Create a tiangle fan: first point is the center of the fan,  
center point is used with next two points to form a triangle.  
Every successive point is used with center point and the previuos point to form a triangle.

####I/O
> #### in
> `Array` `points`: an array of points, represented as arrays.
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
> `Array` `points`: an array of points, represented as arrays.
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