import React from "react";
import NotificationProvider from "./notificationContext";
import ThemeProvider from "./themeContext";
import AuthProvider from "./authContext";

export default function ContextProviders({ children }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
