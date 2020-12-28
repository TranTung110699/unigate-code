#!/bin/bash
# ./build.sh evn 
# will build evn.tar.gz 

# ./build.sh evn -t
# will build evn.$date.tar.gz

#./build.sh evn Dec02 
# will build Dec02.tar.gz

if [ $# -lt 1 ]
then
    echo "Provide an enviroment to build"
    echo "USAGE: ./build.sh evn [-t|SOMEVERSION]"
    exit 1
fi


cp .envs/$1 .env

npm run build

#echo $2
if [ "$2" == "-t" ]; then 
   file="$1.$(date +'%Y-%m-%d')"
elif [ $# == 2 ]; then 
   file=$2
else 
   file=$1
fi


echo "tarring $file"
tar cfvz $file.tar.gz build > /dev/null

echo "scopy-ing to vietd.net"
scp $file.tar.gz root@vieted.net:/var/www/lms/vlms/public
echo "file copied to server"
echo "https://lms-api.vieted.net/$file.tar.gz"

echo "copying folder to vlms/"
rm $build/build -rf
cp $build/r/readmin/build $build/ -r
cp $build/r/readmin/build $v/ -r

