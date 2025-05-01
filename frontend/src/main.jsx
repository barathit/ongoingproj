import React from "react";
import { createRoot } from "react-dom/client";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import App from "./App";
import "./styles/App.css";
import MockServiceProvider from "./mocks/mockServiceProvider.jsx";

// Create emotion cache
const cache = createCache({
  key: "css",
  prepend: true,
});

// Get the root element for rendering
const rootElement = document.getElementById("root");

// Create a root using createRoot API (React 18)
const reactRoot = createRoot(rootElement);

// Render the application explicitly
reactRoot.render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MockServiceProvider>
          <App />
        </MockServiceProvider>
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);
