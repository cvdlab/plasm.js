# plasm.js

### JavaScript Programming Language for Solid Modeling

- - -

### `BOUNDARY(d)(model)`

Get the `d`-boundary of the `model`.

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

#### `CANCEL(model)`

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

#### `CIRCLE(r)(divs)`

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

#### `COLOR(rgb)(model)`

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

#### `CUBE(dim)`

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

#### `CUBOID(dims)`

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

#### `CYLSURFACE(dims)(divs)`

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

#### `DISK(r)(divs)`

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

#### `DOMAIN(dims)(divs)`

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

#### `DRAW(model)`

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

#### `POLYLINE(points)`

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

#### `ROTATE(dims)(angle)(model)`

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

#### `SCALE(dims)(values)(model)`

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

#### `SHOW(model)`

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

#### `SIMPLEX(dim)`

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

#### `SIMPLEXGRID(quotes)`

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

#### `SIMPLICIALCOMPLEX(points)(complex)`

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

#### `SKELETON(dim)(model)`

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

#### `STRUCT(items)`

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

### `TORUSSOLID(dims)(divs)`

Create a torus solid.

#### I/O
> #### in
> `Array` `dims`: size of the rays `[rMin, rMax]`
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
> > `plasm.Model`: a torus solid.

#### Example
> ```js
> torusSolid = TORUS_SOLID([0.1, 0.9])([12,8,8]);
> DRAW(torusSolid);
> ```

- - -

#### `TORUSSURFACE(dims)(divs)`

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

#### `TRANSLATE(dims)(values)(model)`

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

#### `TRIANGLEFAN(points)`

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

#### `TRIANGLESTRIP(points)`

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
