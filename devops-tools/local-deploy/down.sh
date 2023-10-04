#!/bin/bash

# kill BE process
fuser -k 3000/tcp

# kill FE process
fuser -k 5173/tcp

echo "processes were killed"