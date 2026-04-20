import React, { Suspense } from "react";

const Dashboard = React.lazy(() => import("dashboard/App"));
const List = React.lazy(() => import("list/App"));

export default function App() {
  return (
    <div>
      <h1>Host App</h1>
      <Suspense fallback="Loading...">
        <Dashboard />
        <List />
      </Suspense>
    </div>
  );
}
