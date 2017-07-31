#!/bin/sh

BUILD=build
PACKAGE=package
RELEASE=release
URL=`git config --get remote.origin.url`
BABEL="./node_modules/.bin/babel --presets env,react,stage-0"

mkdir -p $BUILD

# transpile
$BABEL src --ignore export -d $BUILD --copy-files && \
  $BABEL src/export -d $BUILD

# build the package
cp -r README.md yarn.lock $BUILD && \
  node scripts/filter-package.js < package.json > $BUILD/package.json && \
  TGZ=`npm pack $BUILD`

NAME=${TGZ%.tgz}
VERSION=${NAME#coact-}

# clone the repo
git clone --branch release $URL $RELEASE

# unpack the package
tar zxvf $TGZ && mv $RELEASE/.git $PACKAGE

# update and push the release repo
(cd $PACKAGE && \
  git add . && \
  git commit -m "Release $VERSION" && \
  git tag v$VERSION && \
  git push && \
  git push origin v$VERSION)

# cleanup
rm -rf $PACKAGE
rm -rf $BUILD
rm -rf $RELEASE
rm -f $TGZ

# add tag on source branch
git tag s$VERSION
git push origin s$VERSION
