THREE.EnhancedTrackballLightControls = function ( object, scene, domElement ) {

  steady = object;

  var _this = this
    , scene
    , STATE = { NONE : -1, ROTATE : 0, ZOOM : 1, PAN : 2 }
    , keys = {
        r: 82
      , c: 67
      , v: 86
      , bar: 32
      , axis: {
          x: 88
        , y: 89
        , z: 90
      }
      , arrows: {
          left: 37
        , up: 38
        , right: 39
        , down: 40
      }
    }
    , boundingRadius = 10
    , resetPosition = object.position.clone()
    , resetMatrix = object.matrix.clone()
    , resetUp = new THREE.Vector3(0,0,1)
    , light = new THREE.SpotLight(0xcccccc);
    ;

    light.position = object.position.clone();
    light.matrix = object.matrix.clone();
    scene.root.add(light);

  this.object = object;
  this.domElement = ( domElement !== undefined ) ? domElement : document;

  var input =
  this.input = document.createElement('input');
  input.setAttribute('id', 'three-trackball-input');
  input.setAttribute('type', 'text');
  input.setAttribute('autofocus', 'autofocus');
  document.body.appendChild(input);
  input.style.position = 'absolute';
  input.style.width = '0px';
  input.style.left = '-1000px';

  // API

  this.enabled = true;

  this.screen = { width: window.innerWidth, height: window.innerHeight, offsetLeft: 0, offsetTop: 0 };
  this.radius = ( this.screen.width + this.screen.height ) / 4;

  this.rotateSpeed = 1.0;
  this.zoomSpeed = 1.8;
  this.panSpeed = 0.1;

  this.noRotate = false;
  this.noZoom = false;
  this.noPan = false;

  // this.staticMoving = false;
  this.dynamicDampingFactor = 0.1;

  this.minDistance = 0;
  this.maxDistance = Infinity;

  // internals

  this.target = new THREE.Vector3( 0, 0, 0 );

  var _keyPressed = false,
  _state = STATE.NONE,

  _eye = new THREE.Vector3(),

  _rotateStart = new THREE.Vector3(),
  _rotateEnd = new THREE.Vector3(),

  _zoom = 0

  _pan = new THREE.Vector2();


  // methods

  this.handleEvent = function ( event ) {
    if ( typeof this[ event.type ] == 'function' ) {
      this[ event.type ]( event );
    }
  };

  this.getMouseOnScreen = function( clientX, clientY ) {

    return new THREE.Vector2(
      ( clientX - _this.screen.offsetLeft ) / _this.radius * 0.5,
      ( clientY - _this.screen.offsetTop ) / _this.radius * 0.5
    );
  };

  this.getMouseProjectionOnBall = function( clientX, clientY ) {
    var mouseOnBall = new THREE.Vector3(
      ( clientX - _this.screen.width * 0.5 - _this.screen.offsetLeft ) / _this.radius,
      ( _this.screen.height * 0.5 + _this.screen.offsetTop - clientY ) / _this.radius,
      0.0
    );

    var length = mouseOnBall.length();

    if ( length > 1.0 ) {
      mouseOnBall.normalize();
    } else {
      mouseOnBall.z = Math.sqrt( 1.0 - length * length );
    }
    _eye.copy( _this.object.position ).subSelf( _this.target );

    var projection = _this.object.up.clone().setLength( mouseOnBall.y );
    projection.addSelf( _this.object.up.clone().crossSelf( _eye ).setLength( mouseOnBall.x ) );
    projection.addSelf( _eye.setLength( mouseOnBall.z ) );

    return projection;

  };

  this.rotateCamera = function() {
    var angle = Math.acos( _rotateStart.dot( _rotateEnd ) / _rotateStart.length() / _rotateEnd.length() );

    if ( angle ) {
      var axis = ( new THREE.Vector3() ).cross( _rotateStart, _rotateEnd ).normalize()
        , quaternion = new THREE.Quaternion();
      angle *= _this.rotateSpeed;
      quaternion.setFromAxisAngle( axis, -angle );
      quaternion.multiplyVector3( _eye );
      quaternion.multiplyVector3( _this.object.up );
      quaternion.multiplyVector3( _rotateEnd );

      if ( _this.staticMoving ) {
        _rotateStart = _rotateEnd;
      } else {
        quaternion.setFromAxisAngle( axis, angle * ( _this.dynamicDampingFactor - 1.0 ) );
        quaternion.multiplyVector3( _rotateStart );
      }
    }
  };

  this.zoomCamera = function() {
    var factor = 1.0 + _zoom * _this.zoomSpeed;

    if ( factor !== 1.0 && factor > 0.0 ) {
      _eye.multiplyScalar( factor );
    }

    _zoom = 0;
  };

  this.panCamera = function() {
    if ( _pan.lengthSq() ) {
      _pan.multiplyScalar( _eye.length() * _this.panSpeed );

      var pan = _eye.clone().crossSelf( _this.object.up ).setLength( _pan.x );
      pan.addSelf( _this.object.up.clone().setLength( _pan.y ) );

      _this.object.position.addSelf( pan );
      _this.target.addSelf( pan );

      light.position.addSelf( pan );

      _pan = new THREE.Vector3();
    }
  };

  this.checkDistances = function() {
    if ( !_this.noZoom || !_this.noPan ) {
      if ( _this.object.position.lengthSq() > _this.maxDistance * _this.maxDistance ) {
        _this.object.position.setLength( _this.maxDistance );
      }
      if ( _eye.lengthSq() < _this.minDistance * _this.minDistance ) {
        _this.object.position.add( _this.target, _eye.setLength( _this.minDistance ) );
      }
    }
  };

  this.update = function() {
    _eye.copy( _this.object.position ).subSelf( _this.target );

    if ( !_this.noRotate ) {
      _this.rotateCamera();
    }

    if ( !_this.noZoom ) {
      _this.zoomCamera();
    }

    if ( !_this.noPan ) {
      _this.panCamera();
    }

    _this.object.position.add( _this.target, _eye );
    light.position.copy(_this.object.position);
    _this.checkDistances();
    _this.object.lookAt( _this.target );
    light.matrix.copy(_this.object.matrix);

  };

  this.resetCamera = function() {
      console.log('Resetting camera...');
      _state = STATE.NONE;
      _this.object.position = resetPosition.clone();
      light.position = resetPosition.clone();
      _this.object.up = resetUp.clone();
      _this.object.matrix = resetMatrix.clone();
      light.matrix = resetMatrix.clone();
      _this.object.rotation.setRotationFromMatrix( _this.object.matrix );
      light.rotation.setRotationFromMatrix( light.matrix );

      _this.target = new THREE.Vector3();
      _eye = new THREE.Vector3();
      _rotateStart = new THREE.Vector3();
      _rotateEnd = new THREE.Vector3();
      _zoom = 0;
      _pan = new THREE.Vector2();
  };

  this.placeCamera = function(vector, target, up) {
    console.log('Placing camera...');
    _state = STATE.NONE;
    _this.object.position = vector || _this.object.position
    light.position = _this.object.position.clone();
    _this.object.up = up || _this.object.up || new THREE.Vector3();
    target && _this.object.lookAt( target );
    target && light.lookAt( target );

    _this.target = target;
    _eye = new THREE.Vector3();
    _rotateStart = new THREE.Vector3();
    _rotateEnd = new THREE.Vector3();
    _zoom = 0;
    _pan = new THREE.Vector2();
  };

  this.useCentroid = function() {
    var centroid = scene.getCentroid();
    _this.placeCamera(undefined, centroid);
  };

  this.viewAll = function() {
    var centroid = scene.getCentroid()
      , boundingRadius = scene.getBoundingRadius()
      , vector = (new THREE.Vector3(0,0, boundingRadius)).addSelf(resetPosition)
      ;

    _this.placeCamera(vector, centroid);
  };

  // listeners

  function keydown( event ) {
    var keyCode = event.keyCode
      , shiftKey = event.shiftKey
      , bigStep = +shiftKey*boundingRadius/2+1
      ;

    if ( ! _this.enabled ) return;
    if ( _state !== STATE.NONE ) {
      return;
    }

    if ( keyCode === keys.r ) {
      _this.resetCamera();
    } else if (keyCode === keys.c) {
      _this.useCentroid();
    } else if (keyCode === keys.v) {
     _this.viewAll();
    } else if (keyCode === keys.axis.x) {
      boundingRadius = scene.getBoundingRadius();
      _this.placeCamera(new THREE.Vector3(1.8*boundingRadius, 0, 0), new THREE.Vector3(), new THREE.Vector3(0,0,1));
    } else if (keyCode === keys.axis.y) {
      boundingRadius = scene.getBoundingRadius();
      _this.placeCamera(new THREE.Vector3(0, 1.8*boundingRadius, 0), new THREE.Vector3(), new THREE.Vector3(0,0,1));
    } else if (keyCode === keys.axis.z) {
      boundingRadius = scene.getBoundingRadius();
      _this.placeCamera(new THREE.Vector3(0, 0, 1.8*boundingRadius), new THREE.Vector3(), new THREE.Vector3(0,1,0));
    } else if ( keyCode === keys.arrows.left && !_this.noPan ) {
      _state = STATE.PAN;
      _pan = new THREE.Vector3(0.1 * bigStep,0,0);
    } else if ( keyCode === keys.arrows.up && !_this.noPan ) {
      _state = STATE.PAN;
      _pan = new THREE.Vector3(0,0.1 * bigStep,0);
    } else if ( keyCode === keys.arrows.right && !_this.noPan ) {
      _state = STATE.PAN;
      _pan = new THREE.Vector3(-0.1 * bigStep,0,0);
    } else if ( keyCode === keys.arrows.down  && !_this.noPan ) {
      _state = STATE.PAN;
      _pan = new THREE.Vector3(0,-0.1 * bigStep,0);
    }
  };

  function keyup( event ) {
    if ( ! _this.enabled ) return;
    if ( _state !== STATE.NONE ) {
      _state = STATE.NONE;
    }
  };

  function mousedown( event ) {

    if ( ! _this.enabled ) return;

    event.preventDefault();
    // event.stopPropagation();

    if ( _state === STATE.NONE ) {
      _state = event.button;
      if ( _state === STATE.ROTATE && !_this.noRotate ) {
        _rotateStart = _rotateEnd = _this.getMouseProjectionOnBall( event.clientX, event.clientY );
      } else if ( _state === STATE.ZOOM && !_this.noZoom ) {
        _zoomStart = _zoomEnd = _this.getMouseOnScreen( event.clientX, event.clientY );
      } else if ( !this.noPan ) {
        _panStart = _panEnd = _this.getMouseOnScreen( event.clientX, event.clientY );
      }
    }
  };

  function mousemove( event ) {

    if ( ! _this.enabled ) return;

    if ( _keyPressed ) {
      _rotateStart = _rotateEnd = _this.getMouseProjectionOnBall( event.clientX, event.clientY );
      _zoomStart = _zoomEnd = _this.getMouseOnScreen( event.clientX, event.clientY );
      _panStart = _panEnd = _this.getMouseOnScreen( event.clientX, event.clientY );

      _keyPressed = false;
    }

    if ( _state === STATE.NONE ) {

      return;

    } else if ( _state === STATE.ROTATE && !_this.noRotate ) {
      _rotateEnd = _this.getMouseProjectionOnBall( event.clientX, event.clientY );
    } else if ( _state === STATE.ZOOM && !_this.noZoom ) {
      _zoomEnd = _this.getMouseOnScreen( event.clientX, event.clientY );
    } else if ( _state === STATE.PAN && !_this.noPan ) {
      _panEnd = _this.getMouseOnScreen( event.clientX, event.clientY );
    }

  };

  function mouseup( event ) {

    if ( ! _this.enabled ) return;

    event.preventDefault();
    // event.stopPropagation();

    _state = STATE.NONE;

  };

  function wheelZoomCamera ( event ) {
    _zoom = event.wheelDeltaY / 10000;
  }

  function preventDefault (event) {
    event.preventDefault();
  }

  function click (event) {
    input.focus();
  }

  this.domElement.addEventListener( 'contextmenu', preventDefault, false );

  this.domElement.addEventListener( 'mousemove', mousemove, false );
  this.domElement.addEventListener( 'mousedown', mousedown, false );
  this.domElement.addEventListener( 'mouseup', mouseup, false );

  this.domElement.addEventListener( 'mousewheel', wheelZoomCamera, false );
  this.domElement.addEventListener( 'click', click, false);

  input.addEventListener( 'keydown', keydown, false );
  input.addEventListener( 'keyup', keyup, false );

  this.resetCamera();

};