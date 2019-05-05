#!/bin/bash

set -e

docker run --rm -it \
    -e NPM_TOKEN="$NPM_TOKEN" \
    -v `pwd`:/app/ \
    -w /app/ \
    node:12.1.0-alpine /bin/sh
