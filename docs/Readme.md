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

#### `STRUCT(items)`

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

#### `TRANSLATE(dims)(values)(model)`

#### `TRIANGLEFAN(points)`

#### `TRIANGLESTRIP(points)`
