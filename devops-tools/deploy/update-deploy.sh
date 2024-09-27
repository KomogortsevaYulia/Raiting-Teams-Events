#!/bin/bash

./stop-pm2.sh
./update-project.sh
./up-pm2.sh

echo "WARN: don't forget to check tags"