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

#### `TORUSSOLID(dims)(divs)`

#### `TORUSSURFACE(dims)(divs)`

#### `TRANSLATE(dims)(values)(model)`

#### `TRIANGLEFAN(points)`

#### `TRIANGLESTRIP(points)`
