"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ForgetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/send-reset-password-email/",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        console.log(response.data);
        const { uid, token } = response.data;
        router.push(`/reset-password/${uid}/${token}/`);
        setSuccess("Password reset link sent. Please check your email.");
      }
    } catch (error) {
      setError(
        error.response?.data?.msg || "Failed to send reset password email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Forget Password</h3>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </>
  );
}
