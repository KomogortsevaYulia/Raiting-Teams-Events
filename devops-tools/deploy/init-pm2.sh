#!/bin/bash

echo "initializing processes to pm2..."

cd ../..

cd server
pm2 start yarn --name rating-teams-BE -- start

cd ../client
pm2 start yarn --name rating-teams-FE -- run dev --host

pm2 save