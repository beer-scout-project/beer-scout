import React, { useState, useEffect } from "react";
import {
  getNewBarPricesByLocation,
  approveNewBarPrice,
  declineNewBarPrice,
} from "../../utils/useApi";
import { IoCloseCircleSharp, IoShieldCheckmark } from "react-icons/io5";

const NewPrices = ({ location }) => {
  const [newBarPrices, setNewBarPrices] = useState([]);
  const [loadingNewPrices, setLoadingNewPrices] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNewBarPrices();
  }, [location]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const fetchNewBarPrices = async () => {
    setLoadingNewPrices(true);
    try {
      const prices = await getNewBarPricesByLocation(location);
      setNewBarPrices(prices);
    } catch (error) {
      console.error("Error fetching new bar prices:", error);
      setError("Failed to fetch new bar prices.");
    }
    setLoadingNewPrices(false);
  };

  const handleApprove = async (priceId) => {
    try {
      await approveNewBarPrice(priceId);
      setSuccess("Price approved successfully!");
      fetchNewBarPrices();
    } catch (error) {
      console.error("Error approving price:", error);
      setError("Failed to approve price.");
    }
  };

  const handleDecline = async (priceId) => {
    try {
      await declineNewBarPrice(priceId);
      setSuccess("Price declined successfully!");
      fetchNewBarPrices();
    } catch (error) {
      console.error("Error declining price:", error);
      setError("Failed to decline price.");
    }
  };

  return (
    <div>
      {/* Success Message */}
      {success && (
        <div
          role="alert"
          className="alert alert-success absolute right-4 top-4 z-10 flex max-w-max justify-center rounded-lg"
        >
          <IoShieldCheckmark size={26} />
          <span>{success}</span>
          <button onClick={() => setSuccess(null)}>
            <IoCloseCircleSharp className="h-[1.3rem] w-[1.3rem]" />
          </button>
        </div>
      )}

      <h2 className="mb-4 text-2xl font-bold">Newly Added Bar Prices</h2>
      {loadingNewPrices ? (
        <div className="text-center">Loading...</div>
      ) : newBarPrices.length === 0 ? (
        <div className="text-center">No new bar prices found.</div>
      ) : (
        <div className="mb-8 overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Bar Name</th>
                <th>Serving Size</th>
                <th>Price</th>
                <th>Happy Hour</th>
                <th>Happy Hour Times</th>
                <th className="text-right">Actions</th>
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
                  <td className="text-right">
                    <div className="inline-flex space-x-2">
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewPrices;
