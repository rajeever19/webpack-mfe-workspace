#!/bin/bash

echo "🚀 Setting up Lerna Monorepo..."

# Step 1: Create shared monorepo
mkdir shared-monorepo
cd shared-monorepo

npm init -y
npm install lerna --save-dev

npx lerna init

# Step 2: Update lerna.json
cat > lerna.json <<EOL
{
  "version": "independent",
  "npmClient": "npm",
  "useWorkspaces": true
}
EOL

# Step 3: Update root package.json
cat > package.json <<EOL
{
  "name": "shared-monorepo",
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "build": "lerna run build",
    "start": "lerna run start --parallel"
  },
  "devDependencies": {
    "lerna": "^8.0.0"
  }
}
EOL

# Step 4: Create packages
mkdir -p packages/core
mkdir -p packages/ui
mkdir -p packages/utils
mkdir -p packages/config

# Step 5: Core package
cat > packages/core/package.json <<EOL
{
  "name": "@shared/core",
  "version": "1.0.0",
  "main": "index.js",
  "peerDependencies": {
    "react": "^18",
    "react-dom": "^18"
  }
}
EOL

# Step 6: UI package
cat > packages/ui/package.json <<EOL
{
  "name": "@shared/ui",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "@mui/material": "^5.0.0"
  }
}
EOL

# Step 7: Utils package
cat > packages/utils/package.json <<EOL
{
  "name": "@shared/utils",
  "version": "1.0.0",
  "main": "index.js"
}
EOL

# Step 8: Install shared dependencies
npm install react react-dom @mui/material @emotion/react @emotion/styled

# Step 9: Bootstrap
npx lerna bootstrap

echo "✅ Monorepo setup complete!"