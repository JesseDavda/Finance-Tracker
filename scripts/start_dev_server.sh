cd ./api

rm -rf ./nodemodules
npm install

if [ $1 = "inspect" ]
then
  echo "Running the dev server with the --inspect flag"
  source .env.bash && nodemon --inspect-brk --exec babel-node src/server.js
else 
  echo "Running the dev server without the --inspect flag"
  source .env.bash && node dist/server.js
fi
