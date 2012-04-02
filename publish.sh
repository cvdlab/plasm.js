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

  version=$(grep -Eo '# version [[:digit:]]+' plasm.js.manifest | grep -Eo [[:digit:]]+)
  version=$(($version + 1))
  echo 'plasm.js.manifest switched to version ' $version
  sed 's/# version [[:digit:]]*/# version '$version'/g' plasm.js.manifest > version.manifest.temp
  rm plasm.js.manifest
  mv version.manifest.temp plasm.js.manifest

  git commit -a -m "update plasm.js.manifest version: ready for publish"

  git checkout -b gh-pages
  git submodule update

  cp ./support/f.js/lib/f.js ./support/f.js.temp
  cp ./support/simplexn.js/lib/simplexn.js ./support/simplexn.js.temp
  rm -rf ./support/simplexn.js
  rm -rf ./support/f.js
  mv ./support/f.js.temp ./support/f.js
  mv ./support/simplexn.js.temp ./support/simplexn.js

  sed 's/  <script src="support\/simplexn.js\/lib\/simplexn.js"><\/script>/  <script src="support\/simplexn.js"><\/script>/g' index.html > simplexn.js.temp
  rm index.html
  mv simplexn.js.temp index.html

  sed 's/  <script src="support\/f.js\/lib\/f.js"><\/script>/  <script src="support\/f.js"><\/script>/g' index.html > f.js.temp
  rm index.html
  mv f.js.temp index.html

  sed 's/support\/simplexn.js\/lib\/simplexn.js/support\/simplexn.js/g' plasm.js.manifest > simplexn.js.manifest.temp
  rm plasm.js.manifest
  mv simplexn.js.manifest.temp plasm.js.manifest

  sed 's/support\/f.js\/lib\/f.js/support\/f.js/g' plasm.js.manifest > f.js.manifest.temp
  rm plasm.js.manifest
  mv f.js.manifest.temp plasm.js.manifest

  version=$(grep -Eo '# version [[:digit:]]+' plasm.js.manifest | grep -Eo [[:digit:]]+)
  version=$(($version + 1))
  echo $version
  sed 's/# version [[:digit:]]*/# version '$version'/g' plasm.js.manifest > version.manifest.temp
  rm plasm.js.manifest
  mv version.manifest.temp plasm.js.manifest

  rm History.md
  # rm Readme.md
  rm -rf docs
  rm index.js
  rm package.json
  rm -rf test
  rm .gitmodules
  rm publish.sh

  git add .
  git commit -a -m "publishing gh-pages"
  git push -f origin gh-pages

  git checkout master
  git submodule update
  git branch -D gh-pages

  fi
fi