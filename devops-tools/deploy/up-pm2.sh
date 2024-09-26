#!/bin/bash
source source.sh

BE_PROCESS_ID_=$(pm2 status | grep $BE_PROCESS_NAME_ | awk '{print $2}')
FE_PROCESS_ID_=$(pm2 status | grep $FE_PROCESS_NAME_ | awk '{print $2}')

pm2 restart $BE_PROCESS_ID_

sleep "$BE_BUILD_COOLDOWN_"s

pm2 restart $FE_PROCESS_ID_

sleep "$FE_BUILD_COOLDOWN_"s

echo "processes were restarted by pm2"