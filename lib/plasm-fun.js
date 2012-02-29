
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
   * cuboid
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
   * intervals
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
   * cube
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
   * circle
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
   * disk
   * 
   * @param {Number} r radius
   * @return {Function}
   *   @param {Array} divs subdivisions
   *   @param {Number} [subs[0]] subdivisions
   *   @param {Number} [subs[1]] subdivisions
   *   @return {plasm.Model} a disk
   * @api public
   */

  var DISK = 
  fun.DISK = function (r) {
    return function (divs) {
      return plasm.disk(r, divs[0], divs[1]);
    };
  };

 
}(this));