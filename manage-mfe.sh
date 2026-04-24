#!/bin/bash

# Exit on first error
set -e

show_help() {
    echo "================================================================"
    echo " 🚀 Mphasis NextGen Enterprise Portal - MFE Manager "
    echo "================================================================"
    echo ""
    echo "Usage: ./manage-mfe.sh [command]"
    echo ""
    echo "Commands:"
    echo "  install      - Install all dependencies for the workspace"
    echo "  start        - Start all Micro-Frontends concurrently"
    echo "  start:host   - Start only the Host Shell MFE (Port 3000)"
    echo "  start:dash   - Start only the Dashboard MFE (Port 3001)"
    echo "  start:list   - Start only the List MFE (Port 3002)"
    echo "  build        - Build all MFEs for production"
    echo "  build:host   - Build only the Host Shell MFE"
    echo "  build:dash   - Build only the Dashboard MFE"
    echo "  build:list   - Build only the List MFE"
    echo "  clean        - Remove all node_modules and dist folders"
    echo "  help         - Show this help message"
    echo ""
    echo "================================================================"
}

case "$1" in
    "install")
        echo "📦 Installing workspace dependencies..."
        npm install
        ;;
    "start")
        echo "🚀 Starting all Micro-Frontends..."
        npm start
        ;;
    "start:host")
        echo "🏠 Starting Host MFE..."
        npm run start --workspace=mfe-host
        ;;
    "start:dash")
        echo "📊 Starting Dashboard MFE..."
        npm run start --workspace=mfe-dashboard
        ;;
    "start:list")
        echo "📝 Starting List MFE..."
        npm run start --workspace=mfe-list
        ;;
    "build")
        echo "🏗️  Building all Micro-Frontends..."
        npm run build
        ;;
    "build:host")
        echo "🏗️  Building Host MFE..."
        npm run build --workspace=mfe-host
        ;;
    "build:dash")
        echo "🏗️  Building Dashboard MFE..."
        npm run build --workspace=mfe-dashboard
        ;;
    "build:list")
        echo "🏗️  Building List MFE..."
        npm run build --workspace=mfe-list
        ;;
    "clean")
        echo "🧹 Cleaning workspace (removing node_modules and build artifacts)..."
        rm -rf node_modules package-lock.json mfe-*/dist
        echo "✅ Clean complete. Run './manage-mfe.sh install' to reinstall."
        ;;
    *)
        show_help
        ;;
esac
