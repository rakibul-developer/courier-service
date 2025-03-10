"use client";

import Registration from "../components/Registration";
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
  const router = useRouter();
  return (
    <main className="container-fluid py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* <button onClick={handleLogout}>Logout</button> */}
          </div>
        </div>

        <div className="row">
          <div className="col-8 m-auto">
            <h3>Sign Up</h3>
            <hr />
            <Registration router={router} />
          </div>
        </div>
      </div>
    </main>
  );
}
