import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import App from "./App";

const mphasisTheme = createTheme({
  palette: {
    primary: { main: "#b71c1c" },
    secondary: { main: "#263238" },
    background: { default: "#f4f6f8" },
  },
  typography: {
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    h4: { fontWeight: 700, color: "#263238", letterSpacing: "-0.5px" },
    h5: { fontWeight: 600, color: "#263238" },
  },
  shape: { borderRadius: 8 },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={mphasisTheme}>
    <CssBaseline />
    <div style={{ padding: '20px' }}>
      <App />
    </div>
  </ThemeProvider>
);
