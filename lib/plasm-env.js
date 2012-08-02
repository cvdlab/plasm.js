$(function () {
  var docsContainer = $('#plasm-container-documentation');
  // var demoContainer = $('#plasm-container-demo');
  var aboutContainer = $('#plasm-container-about');

  var docsButton = $('#plasm-link-documentation');
  // var demoButton = $('#plasm-link-demo');
  var aboutButton = $('#plasm-link-about');

  var aboutClose = $('#plasm-about-icon-close');
  var docsClose = $('#plasm-documentation-icon-close');

  var containers = $('.plasm-container');

  var clear = function () {
    docsContainer.hide();
    // demoContainer.hide();
    aboutContainer.hide();
  };

  docsButton.on('click', function () {
    clear();
    docsContainer.show();
  });

  // demoButton.on('click', function () {
  //   clear();
  //   demoContainer.show();
  // });

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

  /** populate docs **/
  // do nothing...

  // /** populate demo **/
  // var demoTemplate = $('#template-showcase').html();
  // $('#plasm-container-demo-wrapper').append($(Mustache.to_html(demoTemplate, demoView)));

  // var demoItems = $('.plasm-sc-act');
  // demoItems.on('click', function (el) {
  //   var $this = $(this);
  //   var url = $this.data('script');
  //   // var snapshot = $this.find('.snapshot');
  //   // var loading = $this.find('.loading');

  //   // snapshot.hide();
  //   // loading.show();

  //   console.log('Starting Worker...');
  //   console.log('url: ' + url);

  //   var worker = new Worker('lib/demos-loader.js');

  //   worker.addEventListener('message', function (e) {
  //     // DRAW(e.model);
  //     console.log(e);
  //   }, false);

  //   worker.postMessage({url: url});
  // });
});