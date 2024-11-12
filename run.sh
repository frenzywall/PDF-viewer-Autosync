#!/bin/bash
echo "Starting the application..."
npm install
echo "Installing backend dependencies..."
cd backend
npm install

echo "Installing frontend dependencies..."
cd ../frontend
npm install

echo "Starting frontend server..."
npm start &

cd ../backend
echo "Starting backend server..."
npm run dev
