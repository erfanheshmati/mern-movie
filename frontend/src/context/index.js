import React from "react";
import NotificationProvider from "./notificationContext";
import ThemeProvider from "./themeContext";
import AuthProvider from "./authContext";

export default function ContextProviders({ children }) {
  return (
    <NotificationProvider>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}
