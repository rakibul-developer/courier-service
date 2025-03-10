"use client";

import { useState } from "react";

export default function PackageForm({ package: pkg, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: pkg?.name || "",
    description: pkg?.description || "",
    status: pkg?.status || "PENDING",
    sender: pkg?.sender || "",
    receiver: pkg?.receiver || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          className="form-control"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="PENDING">Pending</option>
          <option value="IN_TRANSIT">In Transit</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="sender" className="form-label">
          Sender Email
        </label>
        <input
          type="email"
          className="form-control"
          id="sender"
          name="sender"
          value={formData.sender}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="receiver" className="form-label">
          Receiver Email
        </label>
        <input
          type="email"
          className="form-control"
          id="receiver"
          name="receiver"
          value={formData.receiver}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
      <button
        type="button"
        className="btn btn-secondary ms-2"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
}
