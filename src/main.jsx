import React from "react";
import ReactDOM from "react-dom/client";

import "@fontsource-variable/rubik";

import { AppProvider } from "./contexts/AppContext.jsx";
import App from "./App.jsx";

import "./main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
