rm -rf ./web
rm -rf ./base-theme/web
cd app
yarn build
cd ../server
yarn build
cd ../
cp ./backend.min.cjs ./base-theme/
cp -r ./web ./base-theme
cp -r ./srcs ./base-theme
cp ./theme.json ./base-theme/
zip -r -X base-theme base-theme
open .
