import React, { createContext, useContext, useState, useEffect } from "react";
import { authUser, loginUser, logoutUser } from "./useApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticatedUser = await authUser();
        setUser(authenticatedUser);
      } catch (error) {
        console.error("Error authenticating user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const loggedInUser = await loginUser(email, password);
      setUser(loggedInUser);
      return true; // Return true on successful login
    } catch (error) {
      console.error("Login failed:", error);
      return false; // Return false if login fails
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
