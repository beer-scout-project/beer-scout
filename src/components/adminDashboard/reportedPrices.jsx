import React, { useState, useEffect } from "react";
import {
  getReportedBarPrices,
  ignoreReports,
  removeBarPrice,
} from "../../utils/useApi";
import { IoCloseCircleSharp, IoShieldCheckmark } from "react-icons/io5";

const ReportedPrices = ({ location }) => {
  const [reportedBarPrices, setReportedBarPrices] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReportedBarPrices();
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

  const fetchReportedBarPrices = async () => {
    setLoadingReports(true);
    try {
      const reports = await getReportedBarPrices(location);
      setReportedBarPrices(reports);
    } catch (error) {
      console.error("Error fetching reported bar prices:", error);
      setError("Failed to fetch reported bar prices.");
    }
    setLoadingReports(false);
  };

  const handleIgnoreReports = async (barPriceId) => {
    try {
      await ignoreReports(barPriceId);
      setSuccess("Reports ignored successfully.");
      fetchReportedBarPrices();
    } catch (error) {
      console.error("Error ignoring reports:", error);
      setError("Failed to ignore reports.");
    }
  };

  const handleRemoveBarPrice = async (barPriceId) => {
    try {
      await removeBarPrice(barPriceId);
      setSuccess("Bar price removed successfully.");
      fetchReportedBarPrices();
    } catch (error) {
      console.error("Error removing bar price:", error);
      setError("Failed to remove bar price.");
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

      <h2 className="mb-4 text-2xl font-bold">Reported Bar Prices</h2>
      {loadingReports ? (
        <div className="text-center">Loading...</div>
      ) : reportedBarPrices.length === 0 ? (
        <div className="text-center">No reported bar prices.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Bar Name</th>
                <th>Serving Size</th>
                <th>Price</th>
                <th>Reports</th>
                <th>Reasons</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportedBarPrices.map((report) => (
                <tr key={report.bar_price_id}>
                  <td>{report.bar_name}</td>
                  <td>{report.serving_size}</td>
                  <td>${Number(report.price).toFixed(2)}</td>
                  <td>{report.report_count}</td>
                  <td>
                    {Object.entries(
                      report.reasons.reduce((acc, reason) => {
                        acc[reason] = (acc[reason] || 0) + 1;
                        return acc;
                      }, {}),
                    ).map(([reason, count]) => (
                      <div key={reason}>
                        {reason} ({count})
                      </div>
                    ))}
                  </td>
                  <td className="text-right">
                    <div className="inline-flex space-x-2">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleIgnoreReports(report.bar_price_id)}
                      >
                        Ignore
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() =>
                          handleRemoveBarPrice(report.bar_price_id)
                        }
                      >
                        Remove
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

export default ReportedPrices;
