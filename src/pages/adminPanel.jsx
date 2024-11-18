// Todo: Add a reported prices UI to the admin panel

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authProvider";
import {
  getNewBarPricesByLocation,
  approveNewBarPrice,
  declineNewBarPrice,
} from "../utils/useApi";

const AdminPanel = () => {
  const { user, logout } = useAuth(); // Access user details from AuthProvider
  const navigate = useNavigate();
  const [location, setLocation] = useState("st_johns"); // Default location (might want to change this when adding more locations)
  const [newBarPrices, setNewBarPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNewBarPrices();
  }, [location]);

  const fetchNewBarPrices = async () => {
    setLoading(true);
    try {
      const prices = await getNewBarPricesByLocation(location);
      setNewBarPrices(prices);
    } catch (error) {
      console.error("Error fetching new bar prices:", error);
    }
    setLoading(false);
  };

  const handleApprove = async (priceId) => {
    try {
      await approveNewBarPrice(priceId);
      alert("Price approved successfully!");
      fetchNewBarPrices();
    } catch (error) {
      console.error("Error approving price:", error);
    }
  };

  const handleDecline = async (priceId) => {
    try {
      await declineNewBarPrice(priceId);
      alert("Price declined successfully!");
      fetchNewBarPrices();
    } catch (error) {
      console.error("Error declining price:", error);
    }
  };

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
        <div className="card mx-auto w-full max-w-4xl bg-base-100 p-6 shadow-lg">
          {/* Location Selector */}
          <div className="mb-4 flex items-center justify-between">
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
          <h2 className="mb-4 text-xl font-bold">Newly Added Bar Prices</h2>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : newBarPrices.length === 0 ? (
            <div className="text-center">No new bar prices found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Bar Name</th>
                    <th>Serving Size</th>
                    <th>Price</th>
                    <th>Happy Hour</th>
                    <th>Happy Hour Times</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {newBarPrices.map((price) => (
                    <tr key={price.id}>
                      <td>{price.bar_name}</td>
                      <td>{price.serving_size}</td>
                      <td>
                        ${price.price ? Number(price.price).toFixed(2) : "N/A"}
                      </td>
                      <td>{price.happy_hour ? "Yes" : "No"}</td>
                      <td>
                        {price.happy_hour
                          ? `${price.happy_hour_day || "N/A"}: ${
                              price.happy_hour_start || "N/A"
                            } - ${price.happy_hour_end || "N/A"}`
                          : "N/A"}
                      </td>
                      <td className="flex space-x-2">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleApprove(price.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => handleDecline(price.id)}
                        >
                          Decline
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
