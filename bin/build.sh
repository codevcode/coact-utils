#!/bin/bash

npm test

npm run babel

cp -t build/ package.json README.md

npm pack build

for f in coact-utils-*.*.*.tgz; do mv ${f} coact-utils.tgz; done

rm -rf build
