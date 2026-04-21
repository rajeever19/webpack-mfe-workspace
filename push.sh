#!/bin/bash

echo "🚀 Setting up Modern Lerna + npm Workspaces Monorepo..."

# Create monorepo folder
mkdir -p shared-monorepo
cd shared-monorepo || exit

# Init npm
npm init -y

# Install Lerna (modern)
npm install lerna --save-dev

# Create correct package.json (overwrite)
cat > package.json <<EOL
{
  "name": "shared-monorepo",
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "start": "lerna run start --parallel",
    "build": "lerna run build",
    "list": "lerna list"
  },
  "devDependencies": {
    "lerna": "^8.2.4"
  }
}
EOL

# Create lerna.json (modern config)
cat > lerna.json <<EOL
{
  "version": "independent",
  "npmClient": "npm"
}
EOL

# Create packages
mkdir -p packages/core
mkdir -p packages/ui
mkdir -p packages/utils

# Core package
cat > packages/core/package.json <<EOL
{
  "name": "@shared/core",
  "version": "1.0.0",
  "main": "index.js"
}
EOL

# UI package
cat > packages/ui/package.json <<EOL
{
  "name": "@shared/ui",
  "version": "1.0.0",
  "main": "index.js"
}
EOL

# Utils package
cat > packages/utils/package.json <<EOL
{
  "name": "@shared/utils",
  "version": "1.0.0",
  "main": "index.js"
}
EOL

# Create sample files (optional but useful)
echo "export const core = 'core package';" > packages/core/index.js
echo "export const ui = 'ui package';" > packages/ui/index.js
echo "export const util = () => 'utils package';" > packages/utils/index.js

# Install dependencies using workspaces (IMPORTANT)
npm install

echo ""
echo "✅ Monorepo setup complete!"
echo ""
echo "📦 Packages created:"
echo " - @shared/core"
echo " - @shared/ui"
echo " - @shared/utils"
echo ""
echo "👉 Test with:"
echo "npx lerna list"