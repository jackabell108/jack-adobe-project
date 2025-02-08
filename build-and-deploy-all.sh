#!/bin/bash

# Define image names and tags
UI_IMAGE_NAME="roman-numeral-ui"
UI_TAG="latest"
SERVER_IMAGE_NAME="roman-numeral-server"
SERVER_TAG="latest"

# Build and deploy the frontend (UI) package
echo "Building the UI (React app)..."
cd packages/roman-numeral-ui

# Ensure dependencies are installed
npm install

# Build the UI
docker build -t $UI_IMAGE_NAME:$UI_TAG .

# Run the UI container (react app)
echo "Deploying the UI..."
docker run -d -p 3000:80 $UI_IMAGE_NAME:$UI_TAG

# Go back to the root folder
cd ../..

# Build and deploy the backend (Server) package
echo "Building the backend (Node.js app)..."
cd packages/roman-numeral-server

# Ensure dependencies are installed
npm install

# Build the server
docker build -t $SERVER_IMAGE_NAME:$SERVER_TAG .

# Run the server container
echo "Deploying the backend..."
docker run -d -p 8080:8080 $SERVER_IMAGE_NAME:$SERVER_TAG

# Go back to the root folder
cd ../..

# Optional: Show running containers
echo "Verifying the containers are running..."
docker ps
