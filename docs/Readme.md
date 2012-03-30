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

### `INTERVALS(length)(n)`

> #### parameters
> - `length` (`Number`): the length of the interval.
>
> #### return 
> anonymous function.
> > #### parameters
> > - `n` (`Number`): the number of subdivisions of the interval.
>
> > #### return
> > instance of `plasm.Model`:  
> > a segment from `0` to `length` divided in `n` parts.

> #### Example
>
>```js
> i = INTERVALS(10)(5);
> DRAW(i);
>```

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

### `TORUSSOLID(dims)(divs)`

> #### parameters
> - `dims` (`Array`): a couple of dimensions `[rMin, rMax]`
>   - `rMin` (`Number`): internal radius (`0.1` by default)
>   - `rMax` (`Number`): external radius (`0.9` by default)
> #### return
> anonymous function.
> > #### parameters:
> > - divs (`Array`): a triple of approssimation values `[m, n, o]`
> >   - `m` (`Number`): (`12` by default)
> >   - `n` (`Number`): (`8` by default)
> >   - `o` (`Number`): (`8` by default)
> > ### return
> > instance of `plasm.Model`:  
> > a torus solid.

> #### Example
> 
> ```js
> torusSolid = TORUS_SOLID([0.1, 0.9])([12,8,8]);
> DRAW(torusSolid);
> ```

#### `TORUSSURFACE(dims)(divs)`

#### `TRANSLATE(dims)(values)(model)`

#### `TRIANGLEFAN(points)`

#### `TRIANGLESTRIP(points)`
