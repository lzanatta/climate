#!/bin/bash

set -e

docker run --rm -t \
  -v `pwd`:/app/ \
  -w /app/ \
    node:12.1.0-alpine /bin/sh -c "npm install && npm run test"
