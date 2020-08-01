#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git config user.name "camgraff" && git config user.email "graffcameron@gmail.com"
git add -A
git commit -m 'deploy'


# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:camgraff/city-seeker-frontend.git master:gh-pages

cd -

