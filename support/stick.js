/*
 * stick
 * JavaScript light MVC library
 * Copyright 2012 Enrico Marino (http://onirame.no.de)
 * MIT License
 */ 

!(function (exports) {

  /*
   * Library namespace
   */

  var stick = exports.stick = {};

  /*
   * stick.View
   * Create a view.
   * @param {Object} config configuration object
   * @return {stick.View} a view
   */

  stick.View = function (options) {
    var options = options || {};
    
    this.bind_properties({
      initialize: function () {},
      routes: {},
      elements: {},
      events: {},
    });

    this.bind_properties(options);

    if (this.root) {
      this.root = $(this.root);
      this.bind_elements();
      this.bind_events();
    }
    else {
      this.root = $(document.createElement('div'));
    }

    if (this.router) {
      this.bind_routes();
    }

    this.initialize.call(this);
  };

  stick.View.mobile = false;

  stick.View.events_mapping = {
    'tap': 'click',
    'touchstart': 'mousedown',
    'touchend': 'mouseup',
    'touchmove': 'mousemove'
  };

  stick.View.prototype.bind_properties = function (properties) {
    var key;

    for (key in properties) {
      this[key] = properties[key];
    }

    return this;
  };

  stick.View.prototype.bind_elements = function () {
    var root = this.root;
    var elements = this.elements;
    var key;
    var selector;
    var element;

    for (key in elements) {
      selector = elements[key];
      element = root.find(selector);
      elements[key] = element;
    }

    return this;
  };

  stick.View.prototype.bind_events = function () {
    var self = this;
    var root = this.root;
    var events = this.events;
    var splitter = /^(\S+)\s*(.*)$/;
    var key;
    var match;
    var event;
    var selector;
    var action;
    var handler;
    var method;
    var events_mapping = stick.View.events_mapping;

    for (key in events) {
      match = key.match(splitter);
      event = match[1]; 
      selector = match[2];
      action = events[key];
      handler = self[action];
      method = (function (handler) {
        return function () { handler.apply(self, arguments); };
      }(handler));

      if (stick.View.mobile === false) {
        if (event in events_mapping) {
          event = events_mapping[event];
        }
      }

      if (selector) {
        root.on(event, selector, method);
      }
      else {
        root.on(event, method);
      }
    }

    return this;
  };

  stick.View.prototype.bind_routes = function () {
    var self = this;
    var router = this.router;
    var routes = this.routes;
    var key;
    var action;
    var handler;
    var method;

    for (key in routes) {
      action = routes[key];
      handler = self[action];
      method = (function (handler) {
        return function () { handler.apply(self, arguments); };
      }(handler));

      router.on(key, method);
    }

    return this;
  };

  stick.View.prototype.show = function () {
    this.root.show();
    this.displayed = true;
    return this;
  };

  stick.View.prototype.hide = function () {
    this.root.hide();
    this.displayed = false;
    return this;
  };

}(this));