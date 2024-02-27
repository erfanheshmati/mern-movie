import { useContext } from "react";
import { ThemeContext } from "../context/themeContext.js";
import { NotificationContext } from "../context/notificationContext.js";
import { AuthContext } from "../context/authContext.js";

export const useTheme = () => useContext(ThemeContext);
export const useNotification = () => useContext(NotificationContext);
export const useAuth = () => useContext(AuthContext);
