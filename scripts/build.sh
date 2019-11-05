# Build the client
cd client
# Removes any old build files
rm -rf ./build
npm run build

# Build the API
cd ../api
# Removes any old build files
rm -rf ./dist
npm run build

# Back to root
cd ..