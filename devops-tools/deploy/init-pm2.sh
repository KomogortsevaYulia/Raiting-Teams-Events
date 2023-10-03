#!/bin/bash

echo "initializing processes to pm2..."

cd ..

cd server
pm2 start yarn --name raiting-BE -- start

cd ../client
pm2 start yarn --name raiting-FE -- run dev --port 80 --host

pm2 save

echo "pm2 was initialized, do not forget to change BE_ID and FE_ID in another scripts"