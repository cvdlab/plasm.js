var demoView = {
  showcase: [
    {
      script: "https://raw.github.com/cvdlab-cg/417018/master/showcase/model.js",
      imgsrc: "https://github.com/cvdlab-cg/417018/raw/master/showcase/snapshot.jpg",
      autorLink: "https://github.com/giuseppe89",
      autorName: "Giuseppe Zappavigna"
    },
    {
      script: "https://raw.github.com/cvdlab-cg/281549/master/showcase/model.js",
      imgsrc: "https://github.com/cvdlab-cg/281549/raw/master/showcase/snapshot.jpg",
      autorLink: "https://github.com/shade87",
      autorName: "Matteo Pellegrini"
    },
    {
      script: "https://raw.github.com/cvdlab-cg/266711/master/showcase/model.js",
      imgsrc: "https://raw.github.com/cvdlab-cg/266711/master/showcase/snapshot1.jpg",
      autorLink: "https://github.com/rm86",
      autorName: "Roberto Marinai"
    },
    {
      script: "https://github.com/cvdlab-cg/453907/raw/master/showcase/model.js",
      imgsrc: "https://github.com/cvdlab-cg/453907/raw/master/showcase/snapshot.jpg",
      autorLink: "https://github.com/pmartella",
      autorName: "Piero Martella"
    },
    {
      script: "https://github.com/cvdlab-cg/404688/raw/master/showcase/model.js",
      imgsrc: "https://github.com/cvdlab-cg/404688/raw/master/showcase/snapshot.jpg",
      autorLink: "https://github.com/Rayzen",
      autorName: "Antonio Zoccoli"
    },
    // {
    //   script: "https://raw.github.com/cvdlab-cg/261921/master/showcase/model%20(scmodel).js",
    //   imgsrc: "https://github.com/cvdlab-cg/261921/raw/master/showcase/snapshot.jpg",
    //   autorLink: "https://github.com/vddp",
    //   autorName: "Valerio D. Di Paolo"
    // },
    {
      script: "https://raw.github.com/cvdlab-cg/419841/master/showcase/model.js",
      imgsrc: "https://raw.github.com/cvdlab-cg/419841/master/showcase/snapshot.jpg",
      autorLink: "https://github.com/cvdlab-cg/419841/tree/master/showcase",
      autorName: "DB Team :)"
    },
    {
      script: "https://raw.github.com/cvdlab-cg/283890/master/showcase/model.js",
      imgsrc: "https://raw.github.com/cvdlab-cg/283890/master/showcase/snapshot.jpg",
      autorLink: "https://github.com/Dani7B",
      autorName: "Daniele Morgantini"
    },
    {
      script: "https://raw.github.com/cvdlab-cg/404033/master/showcase/model.js",
      imgsrc: "https://raw.github.com/cvdlab-cg/404033/master/showcase/snapshot.jpg",
      autorLink: "https://github.com/MarcinKwiatkowski1988",
      autorName: "Marcin Kwiatkowski"
    },
    {
      script: "https://raw.github.com/cvdlab-cg/404040/master/showcase/model.js",
      imgsrc: "https://raw.github.com/cvdlab-cg/404040/master/showcase/snapshot.jpg",
      autorLink: "https://github.com/dario88",
      autorName: "Dario"
    },
    {
      script: "https://raw.github.com/cvdlab-cg/453906/master/showcase/model.js",
      imgsrc: "https://raw.github.com/cvdlab-cg/453906/master/showcase/snapshot.jpg",
      autorLink: "https://github.com/chemako",
      autorName: "Pier Luigi Balducci"
    },




    {
      script: "https://raw.github.com/cvdlab-cg/showcase/master/models/453906/aircraft/model.js",
      imgsrc: "https://github.com/cvdlab-cg/showcase/raw/master/models/453906/aircraft/snapshot.png",
      autorLink: "https://github.com/chemako",
      autorName: "Pier Luigi Balducci"
    },
    {
      script: "https://raw.github.com/cvdlab-cg/showcase/master/models/mixedup/model.js",
      imgsrc: "https://github.com/cvdlab-cg/showcase/raw/master/models/mixedup/snapshot.png",
      autorLink: "https://github.com/cvdlab-cg",
      autorName: "P.L. Balducci, P. Martella"
    }

  ]
};


$(function () {
  var docstring = $('#template-docs').html();

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
  docsContainer.append(docstring);

  /** populate demo **/
  var demoTemplate = $('#template-showcase').html();
  demoContainer.append($(Mustache.to_html(demoTemplate, demoView)));

  var demoItems = $('.plasm-sc-act');
  demoItems.on('click', function (el) {
    var $this = $(this);
    var url = $this.data('script');
    // var snapshot = $this.find('.snapshot');
    // var loading = $this.find('.loading');

    // snapshot.hide();
    // loading.show();
    console.log("Loading demo...");

    $.ajax({
      url: url,
      dataType: "script",
      success: function () {
        if (typeof scmodel !== 'undefined') {
          // CANCEL(scmodel);
          DRAW(scmodel);
          // snapshot.show();
          // loading.hide();
        }
      }
    });
  });
});