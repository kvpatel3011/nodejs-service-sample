#!/bin/bash

# Read the current version
VERSION=$(cat VERSION)

# Increment the patch version
NEW_VERSION=$(echo $VERSION | awk -F. '{print $1 "." $2 "." $3+1}')

# Update the version file
echo $NEW_VERSION > VERSION

# Build the Docker image with the new version
docker build --build-arg IMAGE_VERSION=$NEW_VERSION -t kvpatel3011/nodejs-app:$NEW_VERSION .

#docker tag nodejs-local-build:$NEW_VERSION kvpatel3011/nodejs-app:$NEW_VERSION

docker login -u "kvpatel3011" -p "$pwd" docker.io  


docker push kvpatel3011/nodejs-app:$NEW_VERSION

