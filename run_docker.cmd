@echo off

docker run --rm -it ^
    -v %cd%:/app ^
    -w /app ^
    node:12.1.0-alpine sh
