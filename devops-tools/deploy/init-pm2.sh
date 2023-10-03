#!/bin/bash

cd ..

cd server
pm2 start yarn --name raiting-BE -- start

cd ../client
pm2 start yarn --name raiting-FE -- run dev --port 80 --host

pm2 save