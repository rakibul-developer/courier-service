"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext"; // Adjust the path as needed

export default function Login() {
  const router = useRouter();
  const { isLoggedIn, login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await axios.post("/api/user/login/", formData);

      // Save tokens and update authentication state
      const { tokens } = response.data;
      login(tokens);

      console.log("Login Successful:", response.data);
      router.push("/"); // Redirect to dashboard or home page
    } catch (error) {
      console.log("Login Failed:", error.response?.data || error.message);
      setErrors(error.response?.data?.errors || {});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h3>Login</h3>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <div className="text-danger">{errors.password}</div>
          )}
        </div>
        {errors.non_field_errors && (
          <div className="text-danger">{errors.non_field_errors}</div>
        )}
        <Link href="/registration">Create a new account</Link>
        <br />
        <Link href="/forgetPassword">Forgot password?</Link>
        <hr />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Submit"}
        </button>
      </form>
    </>
  );
}
