
/*!
 * plasm-fun.js
 * functional environment for plasm.js
 * Copyright (c) 2011 cvd-lab <cvdlab@email.com> (https://github.com/cvd-lab/)
 * MIT License
 */

 !(function (exports) {

  var fenv = exports.fenv = {};

  /**
   * Library version.
   */

  fenv.version = '0.0.1';

  var PLASM = 
  fenv.PLASM = function (viewer) {
    fenv.viewer = viewer;
  };

  /**
   * cuboid
   * 
   * @param {Array} sides
   * @return {plasm.Model} a cuboidal simplicial complex
   * @api public
   */

  var CUBOID =
  fenv.CUBOID = function (sides) {
    return fenv.viewer.cuboid(sides);
  };

  /**
   * intervals
   *
   * @param {Number} tip
   * @return {plasm.Model} intervals
   * @api public
   */

  var INTERVALS = 
  fenv.INTERVALS = function (tip) {
    return function (n) {
      return fenv.viewer.intervals(tip, n);
    };
  };

}(this));