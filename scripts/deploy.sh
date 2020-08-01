#!/usr/bin/env sh

# abort on errors
set -e

git config user.name "camgraff" && git config user.email "graffcameron@gmail.com"
git checkout --orphan gh-pages
# build
npm run build
git --work-tree dist add --all
git --work-tree dist commit -m "Deploy"
git push origin HEAD:gh-pages --force
rm -r dist
git checkout -f master
git branch -D gh-pages

#git init
#git config user.name "camgraff" && git config user.email "graffcameron@gmail.com"
#git add -A
#git commit -m 'deploy'


## if you are deploying to https://<USERNAME>.github.io/<REPO>
#git push -f https://github.com/camgraff/city-seeker-frontend.git master:gh-pages

#cd -

