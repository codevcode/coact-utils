#!/bin/bash

npm test

npm run babel

cp -t build/ package.json README.md yarn.lock

npm pack build

mv coact-utils-*.tgz coact-utils.tgz

rm -rf build
