#! /usr/bin/bash
rm -rf build/dist
ember build --environment production --output-path build/dist
cd build
docker build -t kube-admin .
cd ..
