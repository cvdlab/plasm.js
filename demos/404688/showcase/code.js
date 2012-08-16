var domain2 = DOMAIN([
	[0, 1],
	[0, 1]
])([15,15]);

var quarter = function(args) {
		var x = args[0] || 1;
		var y = args[1] || 0;
		var z = args[2] || 0;
		return CUBIC_HERMITE(S0)([
			[x, y, z],
			[z, y, x],
			[-3 * (x - z), 0, 0],
			[0, 0, 0]
		]);
	};

var side = function(args) {
		return CUBIC_HERMITE(S0)([
		args[0], args[1],
			[0, 0, 0],
			[0, 0, 0]
		]);
	};

var squareAngle = function(args) {
		var x = z = args[0] || 0;
		var y = args[1] || 0;

		return BEZIER(S0)([
			[x, y, 0],
			[x, y, 0],
			[0, y, 0],
			[0, y, 0],
			[0, y, 0],
			[0, y, 0],
			[0, y, 0],
			[0, y, 0],
			[0, y, 0],
			[0, y, 0],
			[0, y, 0],
			[0, y, 0],
			[0, y, 0],
			[0, y, 0],
			[0, y, 0],
			[0, y, 0],
			[0, y, 0],
			[0, y, z],
			[0, y, z]
		]);
	};

var cornerTRIANGLE = function(args) {
		var x = args[0] || 0;
		var y = args[1] || 0;
		var z = args[2] || 0;
		return SIMPLICIAL_COMPLEX([
			[x, 0, 0],
			[0, y, 0],
			[0, 0, z]
		])([
			[0, 1, 2]
		]);
	};

var cornerRECTANGLE = function(args) {
		var x = args[0] || 0;
		var y = args[1] || 0;
		var z = args[2] || 0;
		return function(dims) {
			var w = dims[0] || 1;
			var h = dims[1] || 1;
			var p = dims[2] || 1;
			return (SIMPLICIAL_COMPLEX([
				[x, y, z],
				[x + w, y, z],
				[x + w, y + h, z + p],
				[x, y + h, z + p]
			])([
				[0, 1, 2],
				[0, 2, 3]
			]));
		}
	};

var cornerPARALLELEPIPID = function(args) {
		return (SIMPLICIAL_COMPLEX([args[0], args[1], args[2], args[3]])([
			[0, 1, 2],
			[0, 2, 3]
		]));
	};

var companionCUBECorner = function(args) {
		var p1 = args[0] || [];
		var p2 = args[1] || [];
		var tmp1 = p1;
		var tmp2 = p2;
		return function(dom) {
			var c1 = quarter(p1);
			var c2 = quarter(p2);
			var a1 = squareAngle(p1);
			var a2 = squareAngle(p2);
			var t1 = cornerTRIANGLE([-p1[1], -p1[1], -p1[1]]);
			var cp1 = cornerPARALLELEPIPID([p2, p1, [p1[0], p1[1], 0],
				[p2[0], p2[1], 0]
			]);
			var cp2 = cornerPARALLELEPIPID([p2.reverse(), p1.reverse(), [0, p1[1], p1[2]],
				[0, p2[1], p2[2]]
			]);
			var tr1 = (STRUCT([cp1, cp2]));
			p2.reverse();
			p1.reverse();
			var t2 = T([0])([p2[0]])(S([0])([-1])(t1));
			var t3 = T([1])([p2[0]])(S([1])([-1])(t1));
			var t4 = T([2])([p2[0]])(S([2])([-1])(t1));
			var r1 = cornerRECTANGLE([0, -p1[1], 0])([p2[0], p1[1], -p1[1]]);
			var r2 = R([0, 2])(-PI / 2)(S([2])([-1])(r1));
			var r3 = T([0, 2])([-p1[1], -p1[1]])(R([0, 1])(PI / 2)(S([2])([-1])(r1)));
			var cornerFacet = STRUCT([
				MAP(BEZIER(S1)([a1, c1]))(dom), 
				MAP(BEZIER(S1)([a2, c2]))(dom), 
				MAP(BEZIER(S1)([c1, c2]))(dom), 
				MAP(BEZIER(S1)([a1, a2]))(dom), 
				tr1]);
			return STRUCT([
				T([1])([-p1[1]])(cornerFacet), 
				T([2])([-p1[1]])(R([0, 1])(PI / 2)(R([1, 2])(PI / 2)(cornerFacet))), 
				T([0])([-p1[1]])(R([0, 1])(PI / 2)(S([1])([-1])(cornerFacet))), 
				t1, t2, t3, t4, r1, r2, r3]);
		}
	};

var heart = function(cPoints) {
		var points = cPoints || [];
		var p1 = points[0] || [0, 0, 1];
		var p2 = points[1] || [-1, 0, 1];
		var p3 = points[2] || [0, 0, 0];
		return function(color) {
			var c1 = CUBIC_HERMITE(S0)([
			p1, p2, [0, 0, 2 * p1[2]],
				[0, 0, -2 * p1[2]]
			]);
			var c2 = CUBIC_HERMITE(S0)([
			p2, p3, [0, 0, -2 * p1[2]],
				[0, 0, -2 * p1[2]]
			]);
			var controlSegment1 = CUBIC_HERMITE(S0)([
			p1, p2, [0, 0, 0],
				[0, 0, 0]
			]);
			var controlSegment2 = CUBIC_HERMITE(S0)([
			p1, p3, [0, 0, 0],
				[0, 0, 0]
			]);
			var halfHeart = STRUCT(CONS(AA(MAP)([BEZIER(S1)([c2, controlSegment2]), BEZIER(S1)([c1, controlSegment1])]))(domain2));
			return COLOR(color)(STRUCT([halfHeart, S([0])([-1])(halfHeart)]))
		}
	};

var frontalDisk = function(radius, extDim) {
		var r = radius || 1;
		var ex = extDim || 0.2;
		return T([1])([ex / 2])(R([1, 2])(PI / 2)((EXTRUDE([ex])(DISK(r)([64, 8])))))
	};

var companionCUBEDiskOfLove = function(r, hlist) {
		var d1 = frontalDisk(r, hlist);
		return function(points) {
			return function(color) {
				var c1 = T([1, 2])([(-hlist / 2) - 0.0001, -points[0][2]])(heart(points)(color));
				var out = STRUCT([c1, d1]);
				return out;
			}
		}
	};

var putOnCubeFaces = function(m) {
		var oppositeY = STRUCT([m, (R([0, 1])(PI)(m))]);
		var oppositeX = R([0, 1])(PI / 2)(oppositeY);
		var oppositeZ = R([1, 2])(PI / 2)(oppositeY);
		return STRUCT([oppositeX, oppositeY, oppositeZ]);
	};

var companionCUBECubes = function(l) {
		var c = l / 10;
		var t = l + (c / 2);
		return function(color) {
			var color = color || [0.65, 0.65, 0.65, 1];
			return COLOR(color)(T([0, 1, 2])([-t, -t, -t])(SIMPLEX_GRID([
				[l, -c, l],
				[l, -c, l],
				[l, -c, l]
			])));
		};
	};

var companionCUBEFiller = function(l) {
		var c = l / 10;
		var t = l + (c / 2);
		return T([0, 1, 2])([-t, -t, -t])(
		STRUCT([
		SIMPLEX_GRID([
			[-c, (2 * l) - c, -c],
			[-l, c, -l],
			[-c, (2 * l) - c, -c]
		]), SIMPLEX_GRID([
			[-l, c, -l],
			[-c, (2 * l) - c, -c],
			[-c, (2 * l) - c, -c]
		]), SIMPLEX_GRID([
			[-c, (2 * l) - c, -c],
			[-c, (2 * l) - c, -c],
			[-l, c, -l]
		])]));
	};

var companionCUBEDisks = function(l) {
		var t = l + (l / 20);
		return T([1])([-l - t])(companionCUBEDiskOfLove);
	};

var companionCUBEBase = function(l) {
		return function(color) {
			return STRUCT([companionCUBECubes(l)(), COLOR(color)(companionCUBEFiller(l))]);
		};
	};

var putOnCorner = function(m) {
		var alignedCorner = STRUCT([m, R([1, 2])(PI * 1.5)(m)]);
		var faceCorner = STRUCT([alignedCorner, R([0, 1])(PI)(alignedCorner)]);
		var cubeCorner = STRUCT([faceCorner, R([0, 1])(PI / 2)(faceCorner)]);
		return cubeCorner;
	};

//Side clip
var sideClipline = function(points) {
		return BEZIER(S0)([
		points[0], points[0], points[1], points[1], points[1], points[1], points[1], points[1], points[1], points[1], points[1], points[1], points[1], points[1], points[1], points[1], points[2], points[2], points[2], points[2], points[2], points[2], points[2], points[2], points[2], points[2], points[2], points[2], points[2], points[2], points[3], points[3]]);
	};

var companionCUBESideClip = function() {
		var c1 = CUBIC_HERMITE(S0)([
			[0, 0, -0.3],
			[0, 0, 0.3],
			[0.1, 0, 1],
			[-0.1, 0, 1]
		]);
		var c2 = CUBIC_HERMITE(S0)([
			[0.1, -0.1, -0.3],
			[0.1, -0.1, 0.3],
			[0.1, 0, 1],
			[-0.1, 0, 1]
		]);

		var a11 = side([
			[0, 0, -0.3],
			[0.1, 0, -0.4]
		]);
		var a12 = side([
			[0, 0, 0.3],
			[0.1, 0, 0.4]
		]);

		var a21 = side([
			[0.1, -0.1, -0.3],
			[0.2, -0.1, -0.4]
		]);
		var a22 = side([
			[0.1, -0.1, 0.3],
			[0.2, -0.1, 0.4]
		]);

		var l1 = sideClipline([
			[0.1, 0, -0.4],
			[0.3, 0, -0.4],
			[0.3, 0, 0.4],
			[0.1, 0, 0.4]
		]);
		var l2 = sideClipline([
			[0.2, -0.1, -0.4],
			[0.3, -0.1, -0.4],
			[0.3, -0.1, 0.4],
			[0.2, -0.1, 0.4]
		]);

		var rect = cornerPARALLELEPIPID([
			[0, -0.1, 0.4],
			[0.1, 0, 0.4],
			[0.1, 0, -0.4],
			[0, -0.1, -0.4]
		]);

		var t1 = SIMPLICIAL_COMPLEX([
			[0, -0.1, 0.4],
			[0.1, 0, 0.4],
			[0, 0, 0.4]
		])([
			[0, 1, 2]
		]);
		var t2 = T([2])([-0.8])(t1);

		var edge = STRUCT([t1, t2, rect]);
		var s1 = T([0])([-0.3])(STRUCT(CONS(AA(MAP)([BEZIER(S1)([c1, c2]), BEZIER(S1)([l1, l2]), BEZIER(S1)([a11, a21]), BEZIER(S1)([a12, a22]), BEZIER(S1)([c2, l2])]))(domain2)));

		var s2 = R([0, 1])([PI / 2])(R([0, 2])(PI)(s1));

		return STRUCT([edge, s1, s2]);
	};

var putOnEdges = function(m) {
		var m1 = STRUCT([m, R([0, 1])(PI / 2)(m)]);
		var m2 = STRUCT([m1, R([0, 1])(PI)(m1)]);
		var m3 = R([0, 2])(PI / 2)(m2);
		var m4 = R([0, 1])(PI / 2)(m3);
		return STRUCT([m2, m3, m4]);
	};

var companionCUBE = function() {
		var base = companionCUBEBase(1)([0.93,0.507,0.93,1]);
		var disks = putOnCubeFaces(T([1])([-1.05])(companionCUBEDiskOfLove(0.4, 0.2)([
			[0, 0, 0.3],
			[-0.3, 0, 0.3],
			[0, 0, 0]
		])([0.93,0.507,0.93,1])));
		var corner = COLOR([1,1,1,1])(T([0, 1, 2])([-1.05, -1.05, -1.05])(companionCUBECorner([
			[0.75, 0.15, 0.4],
			[0.6, 0, 0.35]
		])(domain2)));
		var corners = putOnCorner(corner);
		var edge = T([0, 1])([1.05, -1.05])(S([0, 1, 2])([0.7, 0.7, 0.5])(companionCUBESideClip()));
		var edges = putOnEdges(edge);
		var companionCUBE01 = STRUCT([
			base,
			disks, 
			corners,
			edges
			]);
		return companionCUBE01;
	};

var scmodel = companionCUBE();