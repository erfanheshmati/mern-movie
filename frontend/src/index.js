import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./context/ThemeProvider";
import NotificationProvider from "./context/NotificationProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </NotificationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
