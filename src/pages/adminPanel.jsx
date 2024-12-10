import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authProvider";
import NewPrices from "../components/adminDashboard/newPrices";
import ReportedPrices from "../components/adminDashboard/reportedPrices";
import AddBar from "../components/adminDashboard/addBar";

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [location, setLocation] = useState("st_johns");

  const handleLogout = async () => {
    await logout();
    navigate("/admin-login");
  };

  // Double check for auth (we do this in protected route but just in case)
  if (!user) {
    navigate("/admin-login");
    return null;
  }

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500">
      {/* Header */}
      <div className="flex flex-shrink-0 items-center justify-between bg-base-100 px-6 py-4 shadow-md">
        <div>
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <button onClick={handleLogout} className="btn btn-error">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-hidden p-6">
        <div className="card mx-auto h-full w-full max-w-6xl overflow-y-auto bg-base-100 p-6 shadow-lg">
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
              {/* <option value="halifax">Halifax</option> */}
              <option value="corner_brook">Corner Brook</option>
              {/* Add more locations as needed */}
            </select>
          </div>

          {/* New Bar Prices */}
          <NewPrices location={location} />

          <div className="divider"></div>

          {/* Reported Bar Prices */}
          <ReportedPrices location={location} />

          <div className="divider"></div>

          {/* Add a New Bar */}
          <AddBar />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
