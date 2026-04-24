# Mphasis NextGen Enterprise Portal - Micro Frontend Architecture

This repository contains the full Micro Frontend (MFE) architecture for the Mphasis NextGen Enterprise Portal. It uses **Webpack 5 Module Federation**, **React**, and **npm workspaces** to handle decentralized frontends within a Monorepo environment.

---

## 🏗 Architecture Overview

The system is split into three independent frontends and one shared package, all managed under a single monorepo to ensure dependency hoisting and ease of development.

1. **`mfe-host` (Port 3000)**: The Shell application. It houses the primary App layout, routing, and asynchronous boundaries. It pulls in the remote micro-frontends and renders them.
2. **`mfe-dashboard` (Port 3001)**: Remote MFE exporting an `<App />` component. Contains analytics and delivery metrics.
3. **`mfe-list` (Port 3002)**: Remote MFE exporting an `<App />` component. Displays a list of active engagements.
4. **`packages/store` (`@shared/store`)**: A local npm workspace package. It provides a Vanilla JS Event-Bus global state management solution that all MFEs import directly via `import { useGlobalState } from "@shared/store"`. Webpack is configured to share this package as a `singleton` across all apps.

---

## 🚀 Getting Started

We provide a convenient bash script (`manage-mfe.sh`) to handle everything from installation to starting and building the application.

### 1. Installation
Install all dependencies using npm workspaces (this hoists shared modules like React to the root `/node_modules`):
```bash
./manage-mfe.sh install
```

### 2. Starting the Application
Start all three MFEs (`host`, `dashboard`, `list`) concurrently:
```bash
./manage-mfe.sh start
```
After starting, open your browser and navigate to **[http://localhost:3000](http://localhost:3000)**. 

*(You can also navigate to `http://localhost:3001` or `http://localhost:3002` to see the remote MFEs running entirely standalone).*

### 3. Building for Production
Build all MFEs at once. Production-ready static assets will be output to individual `dist/` folders inside each MFE's directory:
```bash
./manage-mfe.sh build
```

---

## 🛠 Advanced Usage & Commands

The `manage-mfe.sh` script supports individual lifecycle commands for fine-grained development.

| Command | Description |
|---|---|
| `./manage-mfe.sh start:host` | Starts only the Host MFE (useful if you don't need the remotes running locally, or if they are hosted elsewhere) |
| `./manage-mfe.sh start:dash` | Starts only the Dashboard MFE |
| `./manage-mfe.sh start:list` | Starts only the List MFE |
| `./manage-mfe.sh build:host` | Compiles only the Host MFE for production |
| `./manage-mfe.sh clean` | Removes all `node_modules` and `dist` artifacts to resolve broken state |

---

## 🧩 How Webpack Module Federation Works Here

### Remote Exposure (`mfe-dashboard` & `mfe-list`)
In their `webpack.config.js`, the remote apps expose their components:
```javascript
new ModuleFederationPlugin({
  name: "dashboard",
  filename: "remoteEntry.js",
  exposes: {
    "./App": "./src/App", // Exposes the React component
  },
  // ...
})
```

### Remote Consumption (`mfe-host`)
The Host application registers the remote endpoints:
```javascript
new ModuleFederationPlugin({
  name: "host",
  remotes: {
    dashboard: "dashboard@http://localhost:3001/remoteEntry.js",
    list: "list@http://localhost:3002/remoteEntry.js",
  },
  // ...
})
```
It then consumes them dynamically via React Lazy:
```javascript
const Dashboard = React.lazy(() => import("dashboard/App"));
```

### Shared Singleton Store
To prevent the MFEs from holding multiple different copies of global state or React, they are marked as singletons in **all** `webpack.config.js` files:
```javascript
shared: {
  react: { singleton: true },
  "react-dom": { singleton: true },
  "@shared/store": { singleton: true } // The decoupled global state package
}
```
*Note: Because React is lazy by default, `import("./bootstrap")` is used at the entry point of every app to create an asynchronous boundary, allowing Webpack time to negotiate and load the shared dependencies.*
