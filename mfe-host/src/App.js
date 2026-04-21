import React from "react";
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import { FaBuilding } from "react-icons/fa";

const mphasisTheme = createTheme({
  palette: {
    primary: {
      main: "#b71c1c", // Deep Corporate Red
    },
    secondary: {
      main: "#263238", // Dark Corporate Anthracite/Grey
    },
    background: {
      default: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    h4: { fontWeight: 700, color: "#263238", letterSpacing: "-0.5px" },
    h5: { fontWeight: 600, color: "#263238" },
  },
  shape: { borderRadius: 8 },
});

const Dashboard = React.lazy(() => import("dashboard/App"));
const List = React.lazy(() => import("list/App"));

export default function App() {
  return (
    <ThemeProvider theme={mphasisTheme}>
      <CssBaseline />
      <AppBar position="static" color="secondary" elevation={0} style={{ borderBottom: '4px solid #b71c1c' }}>
        <Toolbar style={{ minHeight: '72px' }}>
          <FaBuilding size={28} style={{ marginRight: 15, color: "#e53935" }} />
          <Typography variant="h5" color="inherit" noWrap style={{ fontWeight: 700, letterSpacing: 1.2 }}>
            MPHASIS NEXTGEN ENTERPRISE PORTAL
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" style={{ marginTop: 40, marginBottom: 40 }}>
        <Box mb={5}>
          <Typography variant="h4">Delivery Manager Overview</Typography>
          <Typography variant="subtitle1" color="textSecondary" style={{ marginTop: 8, fontSize: '1.1rem' }}>
            Multi-Tenant Global Delivery & Engagement Dashboard
          </Typography>
        </Box>

        <React.Suspense fallback={<Typography style={{margin: 20}}>Loading Enterprise Modules...</Typography>}>
            <Box mb={6}>
               <Dashboard />
            </Box>
            <Box>
               <List />
            </Box>
        </React.Suspense>
      </Container>
    </ThemeProvider>
  );
}
