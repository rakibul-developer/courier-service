"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/api"; // Use the api instance
import PackageTable from "./PackageTable";
import PackageForm from "./PackageForm";
import { useAuth } from "../context/AuthContext";

export default function Packages() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/packages");

      const fetchPackages = async () => {
        try {
          const response = await api.get("/packages/"); // Use the api instance
          setPackages(response.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPackages();
    } else {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  const handleCreate = async (newPackage) => {
    try {
      const response = await api.post("/packages/", newPackage); // Use the api instance
      setPackages([...packages, response.data]);
      router.back();
      router.forward("/packages");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async (id, updatedPackage) => {
    try {
      const response = await api.put(`/packages/${id}/`, updatedPackage); // Use the api instance
      setPackages(
        packages.map((item) => (item.id === id ? response.data : item))
      );
      setIsEditing(false);
      router.back();
      router.forward("/packages");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/packages/${id}/`); // Use the api instance
      setPackages(packages.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentPackage(item);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentPackage(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="container-fluid py-5">
      <div className="container">
        {isEditing || currentPackage ? (
          <PackageForm
            package={currentPackage}
            onSubmit={(data) =>
              isEditing
                ? handleUpdate(currentPackage.id, data)
                : handleCreate(data)
            }
            onCancel={handleCancel}
          />
        ) : (
          <>
            <button
              className="btn btn-primary mb-3"
              onClick={() => {
                setIsEditing(false); // Set isEditing to false for a new package
                setCurrentPackage({
                  name: "",
                  description: "",
                  status: "PENDING",
                  sender: "",
                  receiver: "",
                });
              }}
            >
              Add Package
            </button>
            <PackageTable
              packages={packages}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </main>
  );
}
