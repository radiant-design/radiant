#!/bin/sh

node prepare.mjs
cp README.md LICENSE build/
cd build && npm publish