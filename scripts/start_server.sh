#!/bin/bash

# Change into API dir
cd ./api

# Fresh install of nodemodules
rm -rf ./node_modules
npm install

# Run Server
npm run serve