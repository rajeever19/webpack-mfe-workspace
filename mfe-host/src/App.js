import { Container, Typography } from "@mui/material";
import React from "react";

const Dashboard = React.lazy(() => import("dashboard/App"));
const List = React.lazy(() => import("list/App"));

export default function App() {
  return (
    <Container>
      <Typography variant="h4" style={{ margin: "20px 0" }}>
        🚀 MFE Host Application
      </Typography>

      <React.Suspense fallback="Loading Micro Frontends...">
        <Dashboard />
        <List />
      </React.Suspense>
    </Container>
  );
}
