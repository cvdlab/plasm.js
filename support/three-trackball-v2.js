/**
 * @author Eberhard Graether / http://egraether.com/
 */

THREE.TrackballControls = function ( object, scene, elements) {

  var _this = this;
  var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM: 4, TOUCH_PAN: 5 };
  var keys = {
    r: 82,
    c: 67,
    v: 86,
    bar: 32,
    axis: {
      x: 88,
      y: 89,
      z: 90
    },
    arrows: {
      left: 37,
      up: 38,
      right: 39,
      down: 40
    }
  };

  this.object = object;
  this.light = new THREE.PointLight(0xaaaaaa);
  this.light.position = object.position.clone();
  scene.root.add(this.light);
  this.light.position = object.position.clone();
  this.light.rotation = object.rotation.clone();
  this.light.scale = object.scale.clone();
  this.light.updateMatrix();

  this.domElement = ( elements.container !== undefined ) ? elements.container : document;

  this.enabled = true;

  this.screen = { left: 0, top: 0, width: 0, height: 0 };

  this.rotateSpeed = 1.0;
  this.zoomSpeed = 1.2;
  this.panSpeed = 0.3;

  this.noRotate = false;
  this.noZoom = false;
  this.noPan = false;
  this.noRoll = false;

  this.staticMoving = false;
  this.dynamicDampingFactor = 0.2;

  this.minDistance = 0;
  this.maxDistance = Infinity;

  this.keys = [ 65 /*A*/, 83 /*S*/, 68 /*D*/ ];

  // internals

  this.target = new THREE.Vector3();

  var lastPosition = new THREE.Vector3();

  var _state = STATE.NONE,
  _prevState = STATE.NONE,

  _eye = new THREE.Vector3(),

  _rotateStart = new THREE.Vector3(),
  _rotateEnd = new THREE.Vector3(),

  _zoomStart = new THREE.Vector2(),
  _zoomEnd = new THREE.Vector2(),

  _touchZoomDistanceStart = 0,
  _touchZoomDistanceEnd = 0,

  _panStart = new THREE.Vector2(),
  _panEnd = new THREE.Vector2(),
  _pan = new THREE.Vector3();

  // for reset

  this.target0 = this.target.clone();
  this.position0 = this.object.position.clone();
  this.up0 = this.object.up.clone();

  // events

  var changeEvent = { type: 'change' };
  var startEvent = { type: 'start'};
  var endEvent = { type: 'end'};

  // methods

  this.handleResize = function () {

    if ( this.domElement === document ) {

      this.screen.left = 0;
      this.screen.top = 0;
      this.screen.width = window.innerWidth;
      this.screen.height = window.innerHeight;

    } else {

      this.screen = this.domElement.getBoundingClientRect();

    }

  };

  this.handleEvent = function ( event ) {

    if ( typeof this[ event.type ] == 'function' ) {

      this[ event.type ]( event );

    }

  };

  this.getMouseOnScreen = function ( clientX, clientY ) {

    return new THREE.Vector2(
      ( clientX - _this.screen.left ) / _this.screen.width,
      ( clientY - _this.screen.top ) / _this.screen.height
    );

  };

  this.getMouseProjectionOnBall = function ( clientX, clientY ) {

    var mouseOnBall = new THREE.Vector3(
      ( clientX - _this.screen.width * 0.5 - _this.screen.left ) / (_this.screen.width*.5),
      ( _this.screen.height * 0.5 + _this.screen.top - clientY ) / (_this.screen.height*.5),
      0.0
    );

    var length = mouseOnBall.length();

    if ( _this.noRoll ) {

      if ( length < Math.SQRT1_2 ) {

        mouseOnBall.z = Math.sqrt( 1.0 - length*length );

      } else {

        mouseOnBall.z = .5 / length;
        
      }

    } else if ( length > 1.0 ) {

      mouseOnBall.normalize();

    } else {

      mouseOnBall.z = Math.sqrt( 1.0 - length * length );

    }

    _eye.copy( _this.object.position ).sub( _this.target );

    var projection = _this.object.up.clone().setLength( mouseOnBall.y );
    projection.add( _this.object.up.clone().cross( _eye ).setLength( mouseOnBall.x ) );
    projection.add( _eye.setLength( mouseOnBall.z ) );

    return projection;

  };

  this.rotateCamera = function () {

    var angle = Math.acos( _rotateStart.dot( _rotateEnd ) / _rotateStart.length() / _rotateEnd.length() );

    if ( angle ) {

      var axis = ( new THREE.Vector3() ).crossVectors( _rotateStart, _rotateEnd ).normalize(),
        quaternion = new THREE.Quaternion();

      angle *= _this.rotateSpeed;

      quaternion.setFromAxisAngle( axis, -angle );

      _eye.applyQuaternion( quaternion );
      _this.object.up.applyQuaternion( quaternion );
      // light
      _this.light.up.applyQuaternion( quaternion );

      _rotateEnd.applyQuaternion( quaternion );

      if ( _this.staticMoving ) {

        _rotateStart.copy( _rotateEnd );

      } else {

        quaternion.setFromAxisAngle( axis, angle * ( _this.dynamicDampingFactor - 1.0 ) );
        _rotateStart.applyQuaternion( quaternion );

      }

    }

  };

  this.zoomCamera = function () {

    if ( _state === STATE.TOUCH_ZOOM ) {

      var factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
      _touchZoomDistanceStart = _touchZoomDistanceEnd;
      _eye.multiplyScalar( factor );

    } else {

      var factor = 1.0 + ( _zoomEnd.y - _zoomStart.y ) * _this.zoomSpeed;

      if ( factor !== 1.0 && factor > 0.0 ) {

        _eye.multiplyScalar( factor );

        if ( _this.staticMoving ) {

          _zoomStart.copy( _zoomEnd );

        } else {

          _zoomStart.y += ( _zoomEnd.y - _zoomStart.y ) * this.dynamicDampingFactor;

        }

      }

    }

  };

  this.panCamera = function () {

    var mouseChange = _panEnd.clone().sub( _panStart );

    if ( mouseChange.lengthSq() ) {

      mouseChange.multiplyScalar( _eye.length() * _this.panSpeed );

      var pan = _eye.clone().cross( _this.object.up ).setLength( mouseChange.x );
      pan.add( _this.object.up.clone().setLength( mouseChange.y ) );

      _this.object.position.add( pan );
      // light
      _this.light.position.add( pan );
      _this.target.add( pan );

      if ( _this.staticMoving ) {

        _panStart = _panEnd;

      } else {

        _panStart.add( mouseChange.subVectors( _panEnd, _panStart ).multiplyScalar( _this.dynamicDampingFactor ) );

      }

    }

  };

  this.panCameraByButton = function() {
    if ( _pan.lengthSq() ) {
      _pan.multiplyScalar( _eye.length() * _this.panSpeed );

      var pan = _eye.clone().cross( _this.object.up ).setLength( _pan.x );
      pan.add( _this.object.up.clone().setLength( _pan.y ) );

      _this.object.position.add( pan );
      _this.target.add( pan );

      _this.light.position.add( pan );

      _pan = new THREE.Vector3();
    }
  };

  this.checkDistances = function () {

    if ( !_this.noZoom || !_this.noPan ) {

      if ( _eye.lengthSq() > _this.maxDistance * _this.maxDistance ) {

        _this.object.position.addVectors( _this.target, _eye.setLength( _this.maxDistance ) );
        // light
        _this.light.position.addVectors( _this.target, _eye.setLength( _this.maxDistance ) );

      }

      if ( _eye.lengthSq() < _this.minDistance * _this.minDistance ) {

        _this.object.position.addVectors( _this.target, _eye.setLength( _this.minDistance ) );
        // light
        _this.light.position.addVectors( _this.target, _eye.setLength( _this.minDistance ) );

      }

    }

  };

  this.update = function () {

    _eye.subVectors( _this.object.position, _this.target );

    if ( !_this.noRotate ) {

      _this.rotateCamera();

    }

    if ( !_this.noZoom ) {

      _this.zoomCamera();

    }

    if ( !_this.noPan ) {

      _this.panCamera();

    }

    _this.object.position.addVectors( _this.target, _eye );
    // light
    _this.light.position.addVectors( _this.target, _eye );

    _this.checkDistances();

    _this.object.lookAt( _this.target );
    //light
    _this.light.lookAt( _this.target );

    if ( lastPosition.distanceToSquared( _this.object.position ) > 0 ) {

      _this.dispatchEvent( changeEvent );

      lastPosition.copy( _this.object.position );

    }

  };

  this.placeCamera = function (position, target, up) {
    position = position || _this.object.position;
    target = target || _this.target;
    up = up || _this.object.up;

    _this.target.copy( target );
    _this.object.position.copy( position );
    // light
    _this.light.position.copy( position );

    _this.object.up.copy( up );
    // light
    _this.light.up.copy( up );

    _eye.subVectors( position, target );

    _this.object.lookAt( target );
    // light
    _this.light.lookAt( target );

    _this.dispatchEvent( changeEvent );

    lastPosition.copy( position );
  };

  this.reset = function () {

    _state = STATE.NONE;
    _prevState = STATE.NONE;

    _this.placeCamera( _this.position0, _this.target0, _this.up0 );
  };


  this.centroid = function() {
    var centroid = scene.getCentroid();

    _state = STATE.NONE;
    _prevState = STATE.NONE;

    _this.placeCamera( null , centroid, null );
  };

  this.all = function() {
    var boundingSphere = scene.getBoundingSphere();
    var target = boundingSphere.center;
    var boundingRadius = boundingSphere.radius;
    var position = new THREE.Vector3(0,0, boundingRadius + 1.5 * boundingRadius);

    _state = STATE.NONE;
    _prevState = STATE.NONE;

    _this.placeCamera( position, target, null );
  };

  this.alongX = function () {
    var boundingSphere = scene.getBoundingSphere();
    var radius = 2 * boundingSphere.radius;
    _this.placeCamera(new THREE.Vector3(radius, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0,0,1));
  };

  this.alongY = function () {
    var boundingSphere = scene.getBoundingSphere();
    var radius = 2 * boundingSphere.radius;
    _this.placeCamera(new THREE.Vector3(0, radius, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0,0,1));
  };

  this.alongZ = function () {
    var boundingSphere = scene.getBoundingSphere();
    var radius = 2 * boundingSphere.radius;
    _this.placeCamera(new THREE.Vector3(0, 0, radius), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0,1,0));
  };

  // listeners

  function keydown( event ) {
    var keyCode = event.keyCode;
    var shiftKey = event.shiftKey;
    var bigStep = (+shiftKey) * 4 + 1;
    var pan;

    if ( _this.enabled === false ) return;

    window.removeEventListener( 'keydown', keydown );

    _prevState = _state;

    if ( _state !== STATE.NONE ) {

      return;

    } else if ( keyCode === _this.keys[ STATE.ROTATE ] && !_this.noRotate ) {

      _state = STATE.ROTATE;

    } else if ( keyCode === _this.keys[ STATE.ZOOM ] && !_this.noZoom ) {

      _state = STATE.ZOOM;

    } else if ( keyCode === _this.keys[ STATE.PAN ] && !_this.noPan ) {

      _state = STATE.PAN;

    } else if ( keyCode === keys.r ) {
      _this.reset();
    } else if ( keyCode === keys.c) {
      _this.centroid();
    } else if ( keyCode === keys.v ) {
     _this.all();
   } else if ( keyCode === keys.axis.x ) {
      _this.alongX();
    } else if ( keyCode === keys.axis.y ) {
      _this.alongY();
    } else if ( keyCode === keys.axis.z ) {
      _this.alongZ();
    } else if ( keyCode === keys.arrows.left && !_this.noPan ) {
      _pan = new THREE.Vector3(0.1 * bigStep, 0, 0);
      _this.panCameraByButton();
    } else if ( keyCode === keys.arrows.up && !_this.noPan ) {
      _pan = new THREE.Vector3(0, 0.1 * bigStep, 0);
      _this.panCameraByButton();
    } else if ( keyCode === keys.arrows.right && !_this.noPan ) {
      _pan = new THREE.Vector3(-0.1 * bigStep, 0, 0);
      _this.panCameraByButton();
    } else if ( keyCode === keys.arrows.down  && !_this.noPan ) {
      _pan = new THREE.Vector3(0, -0.1 * bigStep, 0);
      _this.panCameraByButton();
    }
  }

  function keyup( event ) {

    if ( _this.enabled === false ) return;

    _state = _prevState;

    window.addEventListener( 'keydown', keydown, false );

  }

  function mousedown( event ) {

    if ( _this.enabled === false ) return;

    event.preventDefault();
    event.stopPropagation();

    if ( _state === STATE.NONE ) {

      _state = event.button;

    }

    if ( _state === STATE.ROTATE && !_this.noRotate ) {

      _rotateStart = _this.getMouseProjectionOnBall( event.clientX, event.clientY );
      _rotateEnd.copy(_rotateStart)

    } else if ( _state === STATE.ZOOM && !_this.noZoom ) {

      _zoomStart = _this.getMouseOnScreen( event.clientX, event.clientY );
      _zoomEnd.copy(_zoomStart);

    } else if ( _state === STATE.PAN && !_this.noPan ) {

      _panStart = _this.getMouseOnScreen( event.clientX, event.clientY );
      _panEnd.copy(_panStart)

    }

    document.addEventListener( 'mousemove', mousemove, false );
    document.addEventListener( 'mouseup', mouseup, false );
    _this.dispatchEvent( startEvent );


  }

  function mousemove( event ) {

    if ( _this.enabled === false ) return;

    event.preventDefault();
    event.stopPropagation();

    if ( _state === STATE.ROTATE && !_this.noRotate ) {

      _rotateEnd = _this.getMouseProjectionOnBall( event.clientX, event.clientY );

    } else if ( _state === STATE.ZOOM && !_this.noZoom ) {

      _zoomEnd = _this.getMouseOnScreen( event.clientX, event.clientY );

    } else if ( _state === STATE.PAN && !_this.noPan ) {

      _panEnd = _this.getMouseOnScreen( event.clientX, event.clientY );

    }

  }

  function mouseup( event ) {

    if ( _this.enabled === false ) return;

    event.preventDefault();
    event.stopPropagation();

    _state = STATE.NONE;

    document.removeEventListener( 'mousemove', mousemove );
    document.removeEventListener( 'mouseup', mouseup );
    _this.dispatchEvent( endEvent );

  }

  function mousewheel( event ) {

    if ( _this.enabled === false ) return;

    event.preventDefault();
    event.stopPropagation();

    var delta = 0;

    if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9

      delta = event.wheelDelta / 40;

    } else if ( event.detail ) { // Firefox

      delta = - event.detail / 3;

    }

    _zoomStart.y += delta * 0.01;
    _this.dispatchEvent( startEvent );
    _this.dispatchEvent( endEvent );

  }

  function touchstart( event ) {

    if ( _this.enabled === false ) return;

    switch ( event.touches.length ) {

      case 1:
        _state = STATE.TOUCH_ROTATE;
        _rotateStart = _rotateEnd = _this.getMouseProjectionOnBall( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;

      case 2:
        _state = STATE.TOUCH_ZOOM;
        var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
        var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
        _touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt( dx * dx + dy * dy );
        break;

      case 3:
        _state = STATE.TOUCH_PAN;
        _panStart = _panEnd = _this.getMouseOnScreen( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;

      default:
        _state = STATE.NONE;

    }
    _this.dispatchEvent( startEvent );


  }

  function touchmove( event ) {

    if ( _this.enabled === false ) return;

    event.preventDefault();
    event.stopPropagation();

    switch ( event.touches.length ) {

      case 1:
        _rotateEnd = _this.getMouseProjectionOnBall( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;

      case 2:
        var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
        var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
        _touchZoomDistanceEnd = Math.sqrt( dx * dx + dy * dy )
        break;

      case 3:
        _panEnd = _this.getMouseOnScreen( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;

      default:
        _state = STATE.NONE;

    }

  }

  function touchend( event ) {

    if ( _this.enabled === false ) return;

    switch ( event.touches.length ) {

      case 1:
        _rotateStart = _rotateEnd = _this.getMouseProjectionOnBall( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;

      case 2:
        _touchZoomDistanceStart = _touchZoomDistanceEnd = 0;
        break;

      case 3:
        _panStart = _panEnd = _this.getMouseOnScreen( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;

    }

    _state = STATE.NONE;
    _this.dispatchEvent( endEvent );

  }

  this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

  this.domElement.addEventListener( 'mousedown', mousedown, false );

  this.domElement.addEventListener( 'mousewheel', mousewheel, false );
  this.domElement.addEventListener( 'DOMMouseScroll', mousewheel, false ); // firefox

  this.domElement.addEventListener( 'touchstart', touchstart, false );
  this.domElement.addEventListener( 'touchend', touchend, false );
  this.domElement.addEventListener( 'touchmove', touchmove, false );

  window.addEventListener( 'keydown', keydown, false );
  window.addEventListener( 'keyup', keyup, false );

  this.handleResize();

};

THREE.TrackballControls.prototype = Object.create( THREE.EventDispatcher.prototype );
