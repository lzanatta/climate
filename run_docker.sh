#!/bin/bash

set -e

docker run --rm -it \
  -p 8088:8088 \
  -e NODE_ENV="development" \
  -e NPM_TOKEN="$NPM_TOKEN" \
  -v `pwd`:/app/ \
  -w /app/ \
    node:11.6-alpine /bin/sh
