#!/bin/bash
source source.sh

echo "stopping processes by pm2..."

BE_PROCESS_ID_=$(pm2 status | grep $BE_PROCESS_NAME_ | awk '{print $2}')
FE_PROCESS_ID_=$(pm2 status | grep $FE_PROCESS_NAME_ | awk '{print $2}')

pm2 stop $BE_PROCESS_ID_ $FE_PROCESS_ID_

echo "processes were stopped by pm2"