"use client";

export default function PackageTable({ packages, onEdit, onDelete }) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {packages.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.status}</td>
            <td>{item.sender}</td>
            <td>{item.receiver}</td>
            <td className="d-flex justify-content-around">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => onEdit(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
