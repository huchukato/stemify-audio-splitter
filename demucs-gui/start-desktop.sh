#!/bin/bash

echo "🚀 Starting Stemify Desktop App..."

# Start backend
echo "🐍 Starting backend..."
cd ../demucs-backend
uv run python app.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "⚛️ Starting frontend..."
cd ../demucs-gui
npm run dev &
FRONTEND_PID=$!

# Wait for frontend to be ready
echo "⏳ Waiting for frontend..."
sleep 5

# Start Electron
echo "🖥️ Starting Electron..."
npx electron .

# Cleanup
kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
