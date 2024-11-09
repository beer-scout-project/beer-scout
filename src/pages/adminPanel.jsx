import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authProvider";

const AdminPanel = () => {
  const { user, logout } = useAuth(); // Access user details from AuthProvider
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin-login");
  };

  //DIS DISPLAY IS TEMPORARY FOR TESTING

  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-base-100">
      <div className="card w-full max-w-md rounded-lg bg-white p-6 text-black shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Welcome to the Admin Panel</h1>
        <p className="mb-6">Manage admin-specific tasks and settings here.</p>

        {/* temp user details display for testing */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Account Details:</h2>
          <p>
            <strong>ID:</strong> {user?.id}
          </p>
          <p>
            <strong>Name:</strong> {user?.username}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>

        <button onClick={handleLogout} className="btn btn-error w-full">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
