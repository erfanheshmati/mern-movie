import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

let timeoutId;

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState("");
  const [classes, setClasses] = useState("");

  const updateNotification = (type, value) => {
    if (timeoutId) clearTimeout(timeoutId);
    switch (type) {
      case "error":
        setClasses("bg-red-400");
        break;
      case "success":
        setClasses("bg-green-400");
        break;
      case "warning":
        setClasses("bg-orange-400");
        break;
      default:
        setClasses("");
        break;
    }
    setNotification(value);
    timeoutId = setTimeout(() => {
      setNotification("");
      setClasses("");
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && (
        <div className="fixed left-1/2 top-20 -translate-x-1/2">
          <div className="shadow-sm shadow-gray-400 rounded bounce-custom">
            <p className={classes + " text-white px-4 py-2 font-semibold"}>
              {notification}
            </p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
