var scmodel;

$(function () {
  var docsContainer = $('#plasm-container-documentation');
  var aboutContainer = $('#plasm-container-about');

  var docsButton = $('#plasm-link-documentation');
  var aboutButton = $('#plasm-link-about');

  var aboutClose = $('#plasm-about-icon-close');
  var docsClose = $('#plasm-documentation-icon-close');

  var containers = $('.plasm-container');
  var loading = $('#loading');

  /* Setup routes */
  var matchScript = function (root, id, folder, file) {
    var endpoint = Array.prototype.slice.call(arguments).join('/');
    console.log('loading: ' + endpoint);
    
    var onSuccess = function (data) {
      console.log('executing loaded script...');
      if (scmodel !== undefined) {
        scmodel.draw();
      }
      loading.hide();
    };

    var onError = function (jqXHR, textStatus, errorThrown) {
      console.warn(textStatus);
      loading.hide();
    };

    loading.show();

    $.ajax({
      url: endpoint,
      dataType: 'script',
      success: onSuccess,
      error: onError
    });
  };

  var matchData = function (root, id, folder, file) {
    var endpoint = Array.prototype.slice.call(arguments).join('/');
    console.log('loading: ' + endpoint);

    var onSuccess = function (data) {
      console.log('Loaded model is available through <scmodel> variable');
      scmodel = plasm.parse(data, p);
      scmodel.draw();
      loading.hide();
    };

    var onError = function (jqXHR, textStatus, errorThrown) {
      console.warn(textStatus);
      loading.hide();
    };

    loading.show();

    $.ajax({
      url: endpoint,
      success: onSuccess,
      error: onError
    });
  };


  var routes = {
    '/data/:root/:id/:folder/:file': matchData,
    '/script/:root/:id/:folder/:file': matchScript
  };

  var router = Router(routes);
  
  router
    .configure({
      strict: false
    })
    .init();



  /* Setup the environment */
  var clear = function () {
    docsContainer.hide();
    aboutContainer.hide();
  };

  docsButton.on('click', function () {
    clear();
    docsContainer.show();
  });

  aboutButton.on('click', function () {
    clear();
    aboutContainer.show();
  });

  aboutClose.on('click', function () {
    aboutContainer.hide();
  });

  docsClose.on('click', function () {
    docsContainer.hide();
  });

  containers.on('mousewheel', function (event) {
    event.stopPropagation();
  });

  $(document).on('keyup', function (event) {
    if(event.keyCode == 27) {
      clear();
    }
  });

});