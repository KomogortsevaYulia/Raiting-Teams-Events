#!/bin/bash

BE_PM2_ID=0
FE_PM2_ID=2

echo "stopping processes by pm2..."

pm2 stop $BE_PM2_ID $FE_PM2_ID

echo "scripts were stopped by pm2"