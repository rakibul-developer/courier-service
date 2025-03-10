import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="container-fluid">
        <div className="row bg-light py-5 text-center">
          <h4>Let's explore Courier Service</h4>
          <p>
            <Link href="/packages" className="btn btn-dark mt-3">
              Get Started
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
