#! /bin/bash

branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

if [ "$branch" == "gh-pages" ]
then 

  echo "You cannot run publish.sh script in gh-pages branch."
  echo "Checkout master branch"

else 

  if [ "$branch" == "master" ]
  then

    pages=$(git branch | egrep gh-pages | sed -n -e 's/^  \(.*\)/\1/p')

    if [ "$pages" == "gh-pages" ]
    then

      git branch -D gh-pages

    fi

    # update manifest file version
    version=$(grep -Eo '# version [[:digit:]]+' plasm.js.manifest | grep -Eo [[:digit:]]+)
    version=$(($version + 1))
    echo "plasm.js.manifest switched to version " $version
    sed 's/# version [[:digit:]]*/# version '$version'/g' plasm.js.manifest > version.manifest.temp
    rm plasm.js.manifest
    mv version.manifest.temp plasm.js.manifest

    git commit -a -m "update plasm.js.manifest version: ready for publish"

    # switch to branch gh-pages
    git checkout -b gh-pages

    # update index.html
    sed -i".bak" '/src=\"support\/three.js\"/d' index.html
    sed -i".bak" '/src=\"support\/three-detector.js\"/d' index.html
    sed -i".bak" '/src=\"support\/three-frame.js\"/d' index.html
    sed -i".bak" '/src=\"support\/three-stats.js\"/d' index.html
    sed -i".bak" '/src=\"support\/three-trackball.js\"/d' index.html
    sed -i".bak" '/src=\"node_modules\/simplexn.js\/lib\/simplexn.js\"/d' index.html
    sed -i".bak" '/src=\"node_modules\/f.js\/lib\/f.js\"/d' index.html
    sed -i".bak" '/src=\"lib\/plasm-fun.js\"/d' index.html

    sed -i".bak" 's/  <script src="lib\/plasm.js"><\/script>/  <script src="lib\/viewer.min.js"><\/script>\
  <script src="lib\/plasm.min.js"><\/script>/g' index.html

    # update manifest file
    sed -i".bak" '/support\/three.js/d' plasm.js.manifest
    sed -i".bak" '/support\/three-detector.js/d' plasm.js.manifest
    sed -i".bak" '/support\/three-frame.js/d' plasm.js.manifest
    sed -i".bak" '/support\/three-stats.js/d' plasm.js.manifest
    sed -i".bak" '/support\/three-trackball/d' plasm.js.manifest
    sed -i".bak" '/node_modules\/simplexn.js\/lib\/simplexn.js/d' plasm.js.manifest
    sed -i".bak" '/node_modules\/f.js\/lib\/f.js/d' plasm.js.manifest
    sed -i".bak" '/lib\/plasm-fun.js/d' plasm.js.manifest

    sed -i".bak" 's/lib\/plasm.js/lib\/viewer.min.js\
lib\/plasm.min.js/g' plasm.js.manifest

    # remove unuseful files
    rm index.html.bak
    rm plasm.js.manifest.bak
    rm History.md
    rm -rf docs
    rm index.js
    rm package.json
    rm -rf test
    rm support/three-detector.js
    rm support/three-frame.js
    rm support/three-stats.js
    rm support/three-trackball.js 
    rm support/three.js
    rm -rf lib
    rm publish.sh
    rm Makefile

    # move files in right place
    mkdir lib
    mv plasm.min.js ./lib/
    mv plasm.js ./lib/
    mv viewer.min.js ./lib/

    # add commit and push pages
    git add .
    git commit -a -m "publishing gh-pages"
    git push -f origin gh-pages

    git checkout master
    git branch -D gh-pages

  fi
fi