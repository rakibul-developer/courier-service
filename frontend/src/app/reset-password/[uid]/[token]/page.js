"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function ResetPassword() {
  const { uid, token } = useParams(); // Correct way to get params in App Router
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
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
        `http://127.0.0.1:8000/api/user/reset-password/${uid}/${token}/`,
        { password, password2 },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        setSuccess("Password reset successfully. Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (error) {
      setError(
        error.response?.data?.msg || "Failed to reset password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-fluid py-5">
      <div className="container">
        <div className="row">
          <div className="col-8 m-auto">
            <h3>Reset Password</h3>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
