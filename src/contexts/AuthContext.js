import React, { createContext, useState, useEffect } from "react";
import api, { setAuthToken } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setAuthToken(token);
        try {
          const response = await api.get("/auth/me");
          setUser(response.data);
        } catch (error) {
          console.error("Failed to get current user:", error);
          setAuthToken(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const register = async (email, password) => {
    const response = await api.post("/auth/register", { email, password });
    setAuthToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { user, token } = response.data;
    setUser({ ...user, token }); // Store the token in the user object
    localStorage.setItem("authToken", token);
    return response.data;
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
