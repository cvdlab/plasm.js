SRC = lib/plasm.js lib/plasm-fun.js
DEP_SRC = node_modules/f.js/lib/f.js node_modules/simplexn.js/lib/simplexn.js
DEP_3D_ENGINE = support/three.js support/three-detector.js support/three-frame.js support/three-stats.js support/three-trackball.js

all: plasm.js plasm.min.js

plasm.js:  $(DEP_3D_ENGINE) $(DEP_SRC) $(SRC)
	npm install
	cat $^ > $@

plasm.min.js: plasm.js
	uglifyjs -nc $< > $@

clean:
	rm -f plasm{,.min}.js

publish:
	echo "publishing..."


.PHONY: clean