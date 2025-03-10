"use client";

import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
