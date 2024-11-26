import React, { useState, useEffect } from "react";
import {
  getReportedBarPrices,
  ignoreReports,
  removeBarPrice,
} from "../../utils/useApi";

const ReportedPrices = ({ location }) => {
  const [reportedBarPrices, setReportedBarPrices] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);

  useEffect(() => {
    fetchReportedBarPrices();
  }, [location]);

  const fetchReportedBarPrices = async () => {
    setLoadingReports(true);
    try {
      const reports = await getReportedBarPrices(location);
      setReportedBarPrices(reports);
    } catch (error) {
      console.error("Error fetching reported bar prices:", error);
    }
    setLoadingReports(false);
  };

  const handleIgnoreReports = async (barPriceId) => {
    try {
      await ignoreReports(barPriceId);
      alert("Reports ignored successfully.");
      fetchReportedBarPrices();
    } catch (error) {
      console.error("Error ignoring reports:", error);
    }
  };

  const handleRemoveBarPrice = async (barPriceId) => {
    try {
      await removeBarPrice(barPriceId);
      alert("Bar price removed successfully.");
      fetchReportedBarPrices();
    } catch (error) {
      console.error("Error removing bar price:", error);
    }
  };

  return (
    <div>
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
                <th>Actions</th>
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
                  <td className="flex space-x-2">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleIgnoreReports(report.bar_price_id)}
                    >
                      Ignore
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleRemoveBarPrice(report.bar_price_id)}
                    >
                      Remove
                    </button>
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
