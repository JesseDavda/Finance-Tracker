#!/bin/bash

# Change into API dir
cd api

# Fresh install of nodemodules
rm -rf ./node_modules
yarn install

# Run Server
yarn run serve