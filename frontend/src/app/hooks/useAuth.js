"use client";

import { useState, useEffect } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by verifying the presence of a token
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

  return { isLoggedIn, login, logout };
}
