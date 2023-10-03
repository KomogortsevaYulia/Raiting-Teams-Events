#!/bin/bash

BE_PM2_ID=0
FE_PM2_ID=2

pm2 restart $BE_PM2_ID $FE_PM2_ID

pm2 save