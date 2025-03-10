import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Registration({ router }) {
  const { isLoggedIn, login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    tc: false,
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    const newErrors = {};
    if (formData.password !== formData.password2) {
      newErrors.password2 = "Passwords do not match";
      setIsSubmitting(false);
    }
    if (!formData.tc) {
      newErrors.tc = "You must agree to the terms and conditions";
      setIsSubmitting(false);
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post("/api/user/register/", formData);
      console.log("Registration Successful:", response.data);
      router.push("/login");
    } catch (error) {
      console.log(
        "Registration Failed:",
        error.response?.data || error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
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
      </div>
      <div className="mb-3">
        <label htmlFor="password2" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password2"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          required
        />
        {errors.password2 && (
          <div className="text-danger">{errors.password2}</div>
        )}
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="tc"
          name="tc"
          checked={formData.tc}
          onChange={handleChange}
          required
        />
        <label htmlFor="tc" className="form-check-label">
          I agree to the terms and conditions
        </label>
        {errors.tc && <div className="text-danger">{errors.tc}</div>}
      </div>
      <Link href="/login">Already have an account</Link>
      <hr />
      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
