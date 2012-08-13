$(function () {

var views = {};

/* categories */
views.categories = new stick.View({
  root: '#categories > ul',

  current: {
    name: '',
    el: undefined
  },

  elements: {},
  
  initialize: function () {

    return this;
  },

  init: function () {
    var self = this;
    var root = this.root;
    var elements = this.elements;
    var routes = {};


    $.each(demos.categories, function (name, category) {
      var element = $('<li>');
      element.text(name);
      element.attr('data-name', name);
      root.append(element);
      elements[name] = element;
      (function (cat) {
        routes['/category/:' + name] = function (cat) {
          self.select(cat);
          self.render();
        };
      }(name));
    });

  router.mount(routes);

    return this;
  },

  render: function () {
    views.detail.hide();
    this.show();

    return this;
  },

  show: function () {
    this.root.parent().show();
  },

  hide: function () {
    this.root.parent().hide();
  },

  select: function (name, target) {
    var root = this.root;
    var target = target || root.find("[data-name='" + name + "']");
    var previous = this.current.el || root.find('li:nth(1)');

    previous.removeClass('selected');
    target.addClass('selected');
    this.current.name = name;
    this.current.el = target;
    views.showcase.render(name);

    return this;
  },
  
  events: {
    'mouseenter li': 'on_mouseenter',
    'mouseleave li': 'on_mouseleave',
    'click li': 'on_click'
  },

  on_mouseenter: function (event) {
    var target = $(event.currentTarget);
    target.addClass('over');
  },

  on_mouseleave: function (event) {
    var target = $(event.currentTarget);
    target.removeClass('over');
  },

  on_click: function (event) {
    var target = $(event.currentTarget);
    var name = target.attr('data-name');
    router.setRoute('/category/' + name);
  }
});

/* showcase */
views.showcase = new stick.View({
  root: '#showcase-panel',

  elements: {},
  
  initialize: function () {

    return this;
  },

  render: function (category) {
    var root = this.root;
    var elements = this.elements;
    var container = this.elements.container = $('<div>');
    var name = category;
    var category = demos.categories[name];

    container.attr('data-category', name);
    root.empty();

    category.forEach(function (demo, indx) {
        var element = $('<div>');
        element
          .attr('data-indx', indx)
          .appendTo(container)
          .addClass('scimage')
          .css('background-image', 'url(demos/' + demo.image + ')');
    });

    root.append(container);
    this.show();
    this.resize();

    return this;
  },

  resize: function () {
    if (this.displayed) {
      var root = this.root;
      var rootWidth = root.width();
      var n_images = root.find('.scimage').length;
      var n = Math.min(Math.floor((rootWidth) / 204), n_images);
      var width = n * 204; //204 = width: 200px; + margin: 2px;
      this.elements.container.width(width);
    }
  },
  
  events: {
    'mouseenter div.scimage': 'on_mouseenter',
    'mouseleave div.scimage': 'on_mouseleave',
    'click div.scimage': 'on_click',
  },

  on_mouseenter: function (event) {
    var target = $(event.currentTarget);
    target.addClass('over');
  },

  on_mouseleave: function (event) {
    var target = $(event.currentTarget);
    target.removeClass('over');
  },

  on_click: function (event) {
    var target = $(event.currentTarget);
    var category = target.parent().attr('data-category');
    var indx = target.attr('data-indx');
    router.setRoute('/detail/' + demos.categories[category][indx].endpoint);
  },

  on_resize: function (event) {
    this.resize();
  }
});

/* detail */
views.detail = new stick.View({
  root: '#detail-panel',

  template: $('#template-detail').html(),

  elements: {},
  
  initialize: function () {

    return this;
  },

  render: function (demo) {
    var self = this;
    var root = this.root;
    var elements = this.elements;
    var template = this.template;
    var params = $.extend({}, demo);
    var folder = 'demos/';
    var code;
    var container;

    params.author_name = demos.users[params.author].name;
    params.author_page = demos.users[params.author].page;
    params.endpoint = params.endpoint ? folder + params.endpoint : undefined;
    params.image = params.image ? folder + params.image : undefined;
    params.data = params.data ? folder + params.data : undefined;
    params.code = params.code ? folder + params.code : undefined;
    params.node = params.node ? folder + params.node : undefined;
    params.compute = 'index.html#/script/' + params.code;
    params.show = 'index.html#/data/' + params.data;

    $.ajax({
      url: params.code,
      dataType: 'text',
      success: function (data) {
        params.code = data;
        container = elements.container = $(Mustache.to_html(template, params));

        views.categories.hide();
        views.showcase.hide();
        root.empty();
        root.append(container);

        SyntaxHighlighter.highlight();

        self.show();
        self.resize();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.warn(textStatus);
      }
    });


    return this;
  },
  
  resize: function () {
    if (this.displayed) {
      var container = $('.detail-code');
      var pageHeaderHeight = $('#header').height();
      var detailHeaderHeight = $('.detail-header').height();
      container.height(document.height - pageHeaderHeight - detailHeaderHeight - 20);
      container.width(document.width);
    }
  },

  events: {
    'click #button_back': 'on_back'
  },

  on_back: function (event) {
    history.back();
  }

});

/* app */
  // get demos.json
  var router;
  var route;
  var demos;
  var all_demos = {};

  var onSuccess = function (data) {
    demos = data;

    $.each(demos.categories, function (name, category) {
      category.forEach(function (demo, indx) {
        all_demos[demo.endpoint] = demo;
      });
    });

    /* routes */
    var routes = {
      '/detail/:id/:folder/': function (id, folder) {
        var endpoint = id + '/' + folder;
        console.log('render detail: ' + endpoint);
        views.detail.render(all_demos[endpoint]);
      }
    };

    router = Router(routes).init();

    views.categories.init();

    route = router.getRoute();
    if (route[0] === '') {
      router.setRoute('/category/villas');
    } else if (route[0] === 'category') {
      router.dispatch('on', '/' + route.join('/'));
    }
  };

  var onError = function (jqXHR, textStatus, errorThrown) {
    console.warn(textStatus);
  };

  $.ajax({
    url: 'demos/demos.json',
    dataType: 'json',
    success: onSuccess,
    error: onError
  });

  $(window).on('resize', function () {
    views.showcase.resize();
    views.detail.resize(); 
  });
});