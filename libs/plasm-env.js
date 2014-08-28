var scmodel;

$(function () {
  var btn_fullscreen = $('#btn-fullscreen');
  var btn_clear = $('#btn-clear');
  var btn_play = $('#btn-play');
  var code = $('#code');
  var loading = $('#loading');

  /* Setup routes */
  var matchScript = function (root, id, folder, file) {
    var endpoint = Array.prototype.slice.call(arguments).join('/');
    console.log('loading: ' + endpoint);
    
    var onSuccess = function (data) {
      console.log('executing loaded script...');
      if (scmodel !== undefined) {
        scmodel.draw();
      } else if (model !== undefined) {
        model.draw();
      }
      loading.hide();
      editor.setValue(data);
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
      code.addClass('hidden');
      window.onresize();
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


  btn_play.on('click', function (event) {
    play();
  });

  btn_clear.on('click', function (event) {
    clear();
  });

  btn_fullscreen.on('click', function (event) {
    code.toggleClass('hidden');
    window.onresize();
  });

  $(document).on('keyup', function (event) {
    if(event.keyCode == 16 && event.altKey) {
      play();
    }
  });

});


function play () {
  destroy_plasm();
  create_plasm();
  eval(editor.getValue());
};

function clear () {
  destroy_plasm();
  create_plasm();
  editor.setValue('// Put your Plasm.js code here');
};
