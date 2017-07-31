#!/bin/sh

BUILD=build
PACKAGE=package
RELEASE=release

TGZ=`npm pack $BUILD`

NAME=${TGZ%.tgz}
VERSION=${NAME#coact-utils-}

npm publish $BUILD

# cleanup
rm -rf $BUILD
rm -f $TGZ

# add tag on source branch
git tag v$VERSION
git push origin v$VERSION
