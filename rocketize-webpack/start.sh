#!/bin/bash

clear="\e[0m"
red="\e[91m"
green="\e[92m"
yellow="\e[93m"

if [ ! -d "./node_modules" ]; then
  echo -e "Cannot find ${green}/node_modules${clear}"
  echo -e "Please run ${yellow}npm install${clear} or ${yellow}yarn${clear}"
  echo -e "\n"
  exit 1
fi

echo "Overwriting webpack configurations..."
cp ./rocketize-webpack/config/webpack.config.dev.js ./node_modules/react-scripts/config/webpack.config.dev.js
cp ./rocketize-webpack/config/webpackDevServer.config.js ./node_modules/react-scripts/config/webpackDevServer.config.js
cp ./rocketize-webpack/config/webpack.config.prod.js ./node_modules/react-scripts/config/webpack.config.prod.js
cp ./rocketize-webpack/config/paths.js ./node_modules/react-scripts/config/paths.js
cp ./rocketize-webpack/scripts/start.js ./node_modules/react-scripts/scripts/start.js
cp ./rocketize-webpack/scripts/build.js ./node_modules/react-scripts/scripts/build.js

cd ./node_modules/react-scripts
npm i happypack hard-source-webpack-plugin autodll-webpack-plugin@0.3

cd -
cp ./rocketize-webpack/happypack/lib/WebpackUtils.js ./node_modules/react-scripts/node_modules/happypack/lib/WebpackUtils.js
echo -e "Done.\n"

echo -e "Creating ${green}/public-dev${clear} from /public folder..."
rm -rf ./public-dev
cp -R ./public ./public-dev
echo -e "Done.\n"

echo -e "Injecting JS code to ${green}/public-dev/index.html${clear}..."
sed -i 's|</body>|<script type="text/javascript" src="/static/dll/vendor.dll.js"></script><script type="text/javascript" src="/static/js/bundle.js"></script></body>|g' ./public-dev/index.html
echo -e "Done.\n"

echo -e "${green}Successfully boost Webpack speed${clear}"
echo -e "Now start your dev server by ${yellow}npm start${clear} or ${yellow}yarn start${clear}"