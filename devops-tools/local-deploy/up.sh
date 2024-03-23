#!/bin/bash

cd ..

cd ../server
yarn start &

cd ../client
yarn run dev &

echo "BE's PID:"
fuser 3000/tcp

echo "FE's PID:"
fuser 5173/tcp

echo "project's launching"