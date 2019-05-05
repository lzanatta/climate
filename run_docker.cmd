@echo off

docker run --rm -it ^
  -e NPM_TOKEN="%NPM_TOKEN%" ^
  -v %cd%:/app ^
  -w /app ^
    node:12.1.0-alpine sh
