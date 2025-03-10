"use client";

import Link from "next/link";
// import { useAuth } from "../hooks/useAuth";
import { useAuth } from "../context/AuthContext"; 

export default function Header() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border">
      <div className="container">
        <Link className="navbar-brand" href="/">
          COURIER
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/">
                Home
              </Link>
            </li>
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/packages">
                    Todos
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
