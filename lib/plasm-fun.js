
/*!
 * plasm-fun.js
 * functional environment for plasm.js
 * Copyright (c) 2011 cvd-lab <cvdlab@email.com> (https://github.com/cvd-lab/)
 * MIT License
 */

 !(function (exports) {

  /**
   * Library namespace.
   */

  var fun = exports.fun = {};

  /**
   * Library version.
   */

  fun.version = '0.0.1';

  /**
   * Library init.
   */

  var plasm;

  fun.PLASM = function (viewer) {
    plasm = viewer;
  };

  /**
   * CUBE
   * 
   * @param {Number} dim
   * @return {plasm.Model} a dim-dimendional cube
   * @api public
   */

  var CUBE = 
  fun.CUBE = function (d) {
    return plasm.cube(d);
  };

  /**
   * CUBOID
   * 
   * @param {Array} sides
   * @return {plasm.Model} a cuboidal simplicial complex
   * @api public
   */

  var CUBOID =
  fun.CUBOID = function (sides) {
    return plasm.cuboid(sides);
  };

  /**
   * INTERVALS
   *
   * @param {Number} tip
   * @return {Function}
   *   @param {Number} n
   *   @return {plasm.Model} intervals
   * @api public
   */

  var INTERVALS = 
  fun.INTERVALS = function (tip) {
    return function (n) {
      return plasm.intervals(tip, n);
    };
  };

  /**
   * CIRCLE
   * 
   * @param {Number} r radius
   * @return {Function}
   *   @param {Number} n subdivisions
   *   @return {plasm.Model} a circle
   * @api public
   */

  var CIRCLE = 
  fun.CIRCLE = function (r) {
    return function (n) {
      return plasm.circle(r, n);
    };
  };

  /**
   * DISK
   * 
   * @param {Number} r radius
   * @return {Function}
   *   @param {Array} subs subdivisions
   *   @param {Number} [subs[0]] slices
   *   @param {Number} [subs[1]] stacks
   *   @return {plasm.Model} a disk
   * @api public
   */

  var DISK = 
  fun.DISK = function (r) {
    return function (divs) {
      return plasm.disk(r, divs[0], divs[1]);
    };
  };

  /**
   * CYLSURFACE
   * 
   * @param {Array} dims
   * @param {Number} [dims[0]=1] radius
   * @param {Number} [dims[1]=1] height
   * @return {Function}
   *   @param {Array} subs
   *   @param {Number} [subs[0]=16] slices
   *   @param {Number} [subs[1]=2]  stacks
   *   @return {plasm.Model} a cylindrical surface
   * @api public
   */
  
  var CYLSURFACE = 
  fun.CYLSURFACE = function (dims) {
    return function (subs) {
      return plasm.cylinderSurface(dims[0], dims[1], subs[0], subs[1]);
    };
  };
 
  /**
   * TORUSSURFACE
   * 
   * @param {Array} dims
   * @param {Number} [dims[0]=1] r min
   * @param {Number} [dims[1]=1] r max
   * @return {Function}
   *   @param {Array} subs
   *   @param {Number} [subs[0]=16] slices
   *   @param {Number} [subs[1]=2]  stacks
   *   @return {plasm.Model} a torus surface
   * @api public
   */

  var TORUSSURFACE = 
  fun.TORUSSURFACE = function (dims) {
    return function (subs) {
      return plasm.torusSurface(dims[0], dims[1], subs[0], subs[1]);
    };
  };


}(this));