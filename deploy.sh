#!/bin/bash

VERSION=$(node -p "require('./package.json').version")
REGISTRY="duyanhit"
IMAGE="ticket-box-be"

if [ -z "$VERSION" ]; then
  echo "Error: Unable to detect version from package.json."
  exit 1
fi

docker build --platform linux/amd64 -t "$IMAGE" .

docker tag "$IMAGE" "$REGISTRY/$IMAGE:$VERSION"
docker tag "$IMAGE" "$REGISTRY/$IMAGE:latest"

echo "Docker image built: $REGISTRY/$IMAGE:$VERSION and $REGISTRY/$IMAGE:latest"

docker push "$REGISTRY/$IMAGE:$VERSION"
docker push "$REGISTRY/$IMAGE:latest"

echo "Push image: $REGISTRY/$IMAGE:$VERSION and $REGISTRY/$IMAGE:latest"
