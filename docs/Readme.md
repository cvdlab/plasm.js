# plasm.js

### JavaScript Programming Language for Solid Modeling

#### `BOUNDARY(dim)(model)`

#### `CANCEL(model)`

#### `CIRCLE(r)(divs)`

#### `COLOR(rgb)(model)`

#### `CUBE(dim)`

#### `CUBOID(dims)`

#### `CYLSURFACE(dims)(divs)`

#### `DISK(r)(divs)`

#### `DOMAIN(dims)(divs)`

#### `DRAW(model)`

#### `EXPLODE(values)(model)`

#### `EXTRUDE(values)(model)`

#### `HIDE(model)`

- - -

#### `INTERVALS(length)(n)`

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

#### `MAP(mapping)(domain)`

#### `POLYLINE(points)`

#### `ROTATE(dims)(angle)(model)`

#### `SCALE(dims)(values)(model)`

#### `SHOW(model)`

#### `SIMPLEX(dim)`

#### `SIMPLEXGRID(quotes)`

#### `SIMPLICIALCOMPLEX(points)(complex)`

#### `SKELETON(dim)(model)`

- - -

#### `STRUCT(items)`

Structure together `plasm.Model` and `plasm.Struct`.  
If a transformation is encountered in `items`,  
it is applied to all of the following items.

###I/O
> #### in
> `Array` `items`: an array of `plasm.Model` or plasm.Struct` or `Function`
>
> #### out
> instance of `plasm.Struct`: a struct.

> #### Example
> 
> ```js
> var cube1 = CUBE(3);
> var cube2 = T([0])([1.3])(cube1);
> var struct1 = STRUCT([cube1, cube2]);
> var t = T([1])([1.3]);
> var struct = STRUCT([struct1, t, struct1, t, cube1]);
> ```
- - - 

### `TORUSSOLID(dims)(divs)`

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

#### `TORUSSURFACE(dims)(divs)`

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

> #### Example
> 
> ```js
> var torusSurface = TORUS_SURFACE([0.1, 0.9])([12,8]);
> DRAW(torusSurface);
> ```

- - -

#### `TRANSLATE(dims)(values)(model)` / `T(dims)(values)(model)`

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

> #### Example
> 
> ```js
> var cube = CUBE(3);
> var translatedCube = T([1,2])([1,3])(cube);
> DRAW(translatedCube);
> ```

- - -

#### `TRIANGLEFAN(points)`

Create a tiangle fan: first point is the center of the fan,  
center point is used with next two points to form a triangle.  
Every successive point is used with center point and the previuos point to form a triangle.

####I/O
> #### in
> `Array` `points`: an array of points, represented as arrays.
>
> #### out
> instance of `plasm.Model`: a triangle fan.

> #### Example
> 
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
> `Array` `points`: an array of points, represented as arrays.
>
> #### out
> instance of `plasm.Model`: a triangle strip.

> #### Example
> 
> ```js
> var points = [[0,0,0],[0,1,0],[1,0,0],[1,1,0],[2,0,0]];
> var triStrip = TRIANGLE_STRIP(points);
> DRAW(triStrip);
> ```

- - -

## Demos

### Demo 01

```js
DRAW(STRUCT(REPLICA(10)([T([0,1])([-.5,-.5])(CUBOID([1,1,.2])),COMP([R([0,1])([Math.PI/15]),T([2])([0.2])])])));
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