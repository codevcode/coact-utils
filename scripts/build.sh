#!/bin/bash

npm test

npm run babel

cp -t build/ package.json README.md yarn.lock
