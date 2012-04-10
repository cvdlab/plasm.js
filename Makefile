SRC = lib/plasm.js lib/plasm-fun.js
DEP_SRC = node_modules/simplexn.js/lib/simplexn.js node_modules/f.js/lib/f.js
VIEWER_TO_MIN = support/three-detector.js support/three-frame.js support/three-trackball.js
VIEWER_MIN = support/three-detector.min.js support/three-frame.min.js support/three-trackball.min.js
VIEWER = support/three.js support/three-detector.min.js support/three-frame.min.js support/three-stats.js support/three-trackball.min.js

%.min.js: %.js
	uglifyjs -nc -nm $< > $@

all: viewer.min.js plasm.min.js

viewer.min.js: $(VIEWER)
	cat $^ > $@

plasm.js: $(DEP_SRC) $(SRC)
	npm install
	cat $^ > $@

clean:
	rm -f $(VIEWER_MIN)
	rm -f viewer.min.js
	rm -f plasm{,.min}.js

gh-pages: all
	sh ./publish.sh

.PHONY: clean