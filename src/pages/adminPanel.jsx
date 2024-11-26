import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authProvider";
import NewPrices from "../components/adminDashboard/newPrices";
import ReportedPrices from "../components/adminDashboard/reportedPrices";

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [location, setLocation] = useState("st_johns"); // Default location (eventually we should remove this hardcoding)

  const handleLogout = async () => {
    await logout();
    navigate("/admin-login");
  };

  return (
    <div className="flex min-h-full flex-col bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-base-100 px-6 py-4 shadow-md">
        <div>
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <button onClick={handleLogout} className="btn btn-error">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6">
        <div className="card mx-auto w-full max-w-6xl bg-base-100 p-6 shadow-lg">
          {/* Location Selector */}
          <div className="mb-6 flex items-center justify-between">
            <label htmlFor="location" className="text-lg font-semibold">
              Select Location:
            </label>
            <select
              id="location"
              className="select select-bordered"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="st_johns">St. John's</option>
              {/* Testing location */}
              <option value="corner_brook">Corner Brook</option>
              {/* Add more locations here as needed */}
            </select>
          </div>

          {/* New Bar Prices */}
          <NewPrices location={location} />

          {/* Reported Bar Prices */}
          <ReportedPrices location={location} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
