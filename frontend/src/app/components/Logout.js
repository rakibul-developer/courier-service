"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"; // Adjust the path as needed

export default function Logout() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    router.push("/login"); // Redirect to login page after logout
  }, [logout, router]);

  return null; // No UI needed
}
