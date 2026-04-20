#!/bin/bash

echo "🚀 Starting all applications..."

# Kill existing ports (optional but useful)
echo "🧹 Cleaning ports..."
kill_port() {
  PORT=$1
  PID=$(lsof -ti:$PORT)
  if [ -n "$PID" ]; then
    kill -9 $PID
    echo "✅ Killed process on port $PORT"
  fi
}

kill_port 3000
kill_port 3001
kill_port 3002
kill_port 3005

echo ""
echo "📦 Starting Micro Frontends..."

# Start Dashboard (3001)
cd mfe-dashboard
npx webpack serve &
cd ..

# Start List (3002)
cd mfe-list
npx webpack serve &
cd ..

# Start Host (3000)
cd mfe-host
npx webpack serve &
cd ..

echo ""
echo "📦 Starting Monolith App (3005)..."

cd monolith-app
npx webpack serve &
cd ..

echo ""
echo "✅ All apps started!"

echo ""
echo "🌐 URLs:"
echo "Host (MFE):        http://localhost:3000"
echo "Dashboard (MFE):   http://localhost:3001"
echo "List (MFE):        http://localhost:3002"
echo "Monolith:          http://localhost:3005"

echo ""
echo "⚠️ Press CTRL+C to stop all apps"

# Wait to keep script alive
wait