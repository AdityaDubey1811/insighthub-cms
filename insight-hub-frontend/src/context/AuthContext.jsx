import { createContext, useContext, useEffect, useState } from "react";
import { getAccessToken, clearTokens } from "../utils/tokenStorage";
import { getMyProfile } from "../services/userService";
import {
  connectNotifications,
  disconnectNotifications,
} from "../services/webSocketService";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!getAccessToken()
  );

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(!!getAccessToken());
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function loadUser() {
      if (!getAccessToken()) {
        setLoadingUser(false);
        return;
      }

      try {
        const data = await getMyProfile();
        setUser(data);
      } catch (error) {
        console.error(error);
        clearTokens();
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }

    loadUser();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      return;
    }

    connectNotifications((notification) => {
      setNotifications((current) => [
        notification,
        ...current,
      ]);

      toast(notification.message);
    });

    return () => {
      disconnectNotifications();
    };
  }, [isAuthenticated, user]);

  const logout = () => {
    clearTokens();
    setIsAuthenticated(false);
    setUser(null);
    setNotifications([]);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        loadingUser,
        notifications,
        setNotifications,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}