#! /bin/bash

branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

if [ "$branch" == "gh-pages" ]
then 

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

  rm History.md
  rm Readme.md
  rm -rf docs
  rm index.js
  rm package.json
  rm -rf test
  rm .gitmodules

  # git add .
  # git commit -a -m "publishing gh-pages"
  # gi push -f origin gh-pages

else
  echo "You're not in 'gh-pages' branch!"
fi