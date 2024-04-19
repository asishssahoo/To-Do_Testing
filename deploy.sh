#!/bin/bash

# Define deployment variables
NODE_ENV="production"
APP_PORT=3000
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD="Asish@112"
DB_NAME="tudolist"

# Install project dependencies
echo "Installing dependencies..."
npm install

# Set environment variables
export NODE_ENV=$NODE_ENV
export APP_PORT=$APP_PORT
export DB_HOST=$DB_HOST
export DB_USER=$DB_USER
export DB_PASSWORD=$DB_PASSWORD
export DB_NAME=$DB_NAME

# Build the project (if applicable)
echo "Building the project..."
npm run build

# Start the application
echo "Starting the application..."
npm start

echo "TodoList application deployed successfully!"
