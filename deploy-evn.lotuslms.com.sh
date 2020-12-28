#!/bin/bash

npm run build
tar cfvz build.tar.gz build
scp build.tar.gz root@evn.lotuslms.com

# deploy at the server
ssh root@evn.lotuslms.com '/root/deploy.sh'

