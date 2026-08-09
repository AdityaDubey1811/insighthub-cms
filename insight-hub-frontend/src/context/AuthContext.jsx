import { createContext, useContext, useEffect, useState } from "react";
import { getAccessToken, clearTokens } from "../utils/tokenStorage";
import { getMyProfile } from "../services/userService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!getAccessToken()
  );

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(!!getAccessToken());

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

  const logout = () => {
    clearTokens();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        loadingUser,
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