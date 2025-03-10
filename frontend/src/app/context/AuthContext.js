"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Export AuthProvider as a named export
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

  const login = (tokens) => {
    localStorage.setItem("accessToken", tokens.access);
    localStorage.setItem("refreshToken", tokens.refresh);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Export useAuth as a named export
export function useAuth() {
  return useContext(AuthContext);
}
