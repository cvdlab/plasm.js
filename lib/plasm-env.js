var demoView = {
  showcase: [
    {
      script: "https://raw.github.com/cvdlab-cg/220279/master/showcase/model.js",
      imgsrc: "https://github.com/cvdlab-cg/220279/raw/master/showcase/snapshot.jpg",
      autorLink: "https://github.com/furio",
      autorName: "Francesco Furiani"
    },
    {
      script: "https://raw.github.com/cvdlab-cg/418839/master/showcase/model.js",
      imgsrc: "https://github.com/cvdlab-cg/418839/raw/master/showcase/snapshot.jpg",
      autorLink: "https://github.com/Andreaplus",
      autorName: "Andrea Somma"
    },
    {
      script: "https://raw.github.com/cvdlab-cg/417021/master/showcase/model.js",
      imgsrc: "https://github.com/cvdlab-cg/417021/raw/master/showcase/snapshot.png",
      autorLink: "https://github.com/AlessioDeAngelis",
      autorName: "Alessio De Angelis"
    }
  ]
};


$(function () {
  var docsContainer = $('#plasm-container-documentation');
  var demoContainer = $('#plasm-container-demo');
  var aboutContainer = $('#plasm-container-about');

  var docsButton = $('#plasm-link-documentation');
  var demoButton = $('#plasm-link-demo');
  var aboutButton = $('#plasm-link-about');

  var containers = $('.plasm-container');

  var clear = function () {
    docsContainer.hide();
    demoContainer.hide();
    aboutContainer.hide();
  };

  docsButton.on('click', function () {
    clear();
    docsContainer.show();
  });

  demoButton.on('click', function () {
    clear();
    demoContainer.show();
  });

  aboutButton.on('click', function () {
    clear();
    aboutContainer.show();
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
  docsContainer.append($(docstring));

  /** populate demo **/
  var demoTemplate = $('#template-showcase').html();
  demoContainer.append($(Mustache.to_html(demoTemplate, demoView)));

  var demoItems = $('.plasm-sc-act');
  demoItems.on('click', function () {
    var url = $(this).data('script');
    $.ajax({
      url: url,
      dataType: "script",
      success: function () {
        console.log("Loading demo...");
        if (typeof scmodel !== 'undefined') {
          CANCEL(scmodel);
          DRAW(scmodel);
        }
      }
    });
  });
});