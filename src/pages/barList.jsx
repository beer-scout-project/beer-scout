import { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

import { reportBarPrice, getBarPricesByLocation } from "../utils/useApi";

// Utility Functions
const getBeerDescriptionFromSize = (size) => {
  const descriptions = {
    "268ml": "Half Pints",
    "330ml": "Bottles",
    "355ml": "Cans",
    "473ml": "16oz Pints",
    "591ml": "20oz Pints",
    "1140ml": "Pitchers",
  };
  return descriptions[size] || size;
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const convertTo12HourTime = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return date.toLocaleTimeString("en-US", options);
};

const getPricePer100Ml = (price, servingSize) => {
  const millilitres = parseInt(servingSize.replace("ml", ""), 10);
  if (isNaN(millilitres) || millilitres === 0) return "0.00";
  const pricePer100Ml = (price * 100) / millilitres;
  return pricePer100Ml.toFixed(2);
};

const filterPricesByHappyHour = (data) => {
  const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });
  const currentTime = new Date();

  return data.filter((bar) => {
    if (!bar.happy_hour) return true;

    const [startHour, startMinute] = bar.happy_hour_start
      .split(":")
      .map(Number);
    const [endHour, endMinute] = bar.happy_hour_end.split(":").map(Number);

    const barStartTime = new Date();
    barStartTime.setHours(startHour, startMinute, 0, 0);

    const barEndTime = new Date();
    barEndTime.setHours(endHour, endMinute, 0, 0);

    return (
      bar.happy_hour_day.includes(currentDay) &&
      currentTime >= barStartTime &&
      currentTime <= barEndTime
    );
  });
};

const sortBarsByPrice = (data) => {
  return [...data].sort((a, b) => {
    const priceA = parseFloat(getPricePer100Ml(a.price, a.serving_size));
    const priceB = parseFloat(getPricePer100Ml(b.price, b.serving_size));
    return priceA - priceB;
  });
};

const BarList = () => {
  // State Variables
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [barPrices, setBarPrices] = useState([]);

  const [selectedBar, setSelectedBar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedBarPriceId, setSelectedBarPriceId] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");

  const reportReasons = [
    "Price is incorrect",
    "Happy hour time is wrong",
    "Location is incorrect",
    "Other",
  ];

  // Fetch City and Bar Prices on Mount
  useEffect(() => {
    const storedCity = localStorage.getItem("city");
    if (storedCity) {
      setCity(storedCity);
    }

    const cachedBarPrices = sessionStorage.getItem("barPrices");
    if (cachedBarPrices) {
      console.log("Loading bar prices from session storage...");
      setBarPrices(JSON.parse(cachedBarPrices));
    } else {
      fetchBarPrices();
    }
  }, []);

  // Fetch Bar Prices Function
  const fetchBarPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching bar prices from backend...");
      // dynamically get location name here front landing when we have multiple locations
      const data = await getBarPricesByLocation("st_johns");
      const filteredData = filterPricesByHappyHour(data);
      const sortedData = sortBarsByPrice(filteredData);

      if (sortedData.length > 0) {
        sortedData[0].isHighlighted = true;
      }

      setBarPrices(sortedData);
      sessionStorage.setItem("barPrices", JSON.stringify(sortedData));
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Open and Close Details Modal
  const openModal = (bar) => {
    setSelectedBar(bar);
    setIsModalOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setSelectedBar(null);
    setIsModalOpen(false);
    document.body.classList.remove("modal-open");
  };

  // Open and Close Report Modal
  const openReportModal = (barPriceId) => {
    setSelectedBarPriceId(barPriceId);
    setSelectedReason("");
    setError(null);
    setIsReportModalOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setSelectedBarPriceId(null);
    setSelectedReason("");
    setError(null);
    document.body.classList.remove("modal-open");
  };

  // Handle Report Submission
  const handleReport = async () => {
    if (!selectedReason) {
      setError("Please select a reason.");
      return;
    }

    try {
      await reportBarPrice(selectedBarPriceId, selectedReason);
      closeReportModal();
    } catch (err) {
      console.error("Error reporting bar price:", err);
      setError("Failed to submit your report. Please try again.");
    }
  };

  return (
    <div
      className="relative h-full bg-cover bg-center"
      style={{ backgroundImage: "url('/beerBackground.png')" }}
    >
      {/* Darkening Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <div className="h-max max-h-[80vh] w-full max-w-lg overflow-y-auto overflow-x-hidden rounded-lg bg-base-100 px-6 shadow-lg">
          {/* Header */}
          <div className="sticky top-0 flex justify-between bg-base-100 pt-4 opacity-95">
            <div>
              <p className="mb-2 flex items-center text-orange-600">
                <FaLocationDot className="mr-2" />
                {city || "St. John's"}
              </p>
              <h2 className="mb-4 text-2xl font-bold text-base-content">
                Cheapest Beer Now
              </h2>
            </div>
            <div
              className="tooltip tooltip-bottom"
              data-tip="Suggest a beer price"
            >
              <Link to="/add-bar" className="btn btn-circle btn-ghost">
                <FaPlus size={20} />
              </Link>
            </div>
          </div>

          {/* Bars List */}
          <div className="space-y-4">
            {loading && (
              <span className="loading loading-spinner ml-auto mr-auto text-warning"></span>
            )}

            {barPrices.map((bar) => {
              const beerDescription = getBeerDescriptionFromSize(
                bar.serving_size,
              );
              const pricePer100Ml = getPricePer100Ml(
                bar.price,
                bar.serving_size,
              );
              const isHighlighted = bar.isHighlighted;

              return (
                <div
                  key={bar.id || bar.bar_name}
                  className={`flex flex-col gap-2 rounded-lg p-4 ${
                    isHighlighted
                      ? "bg-[#D2691E] text-[#FAF9F6]"
                      : "bg-[#fcdcad]"
                  }`}
                >
                  {/* Bar Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-lg ${isHighlighted ? "font-semibold" : "font-normal text-gray-900"}`}
                      >
                        {bar.bar_name}
                      </p>
                      <p
                        className={`text-sm ${isHighlighted ? "text-orange-200" : "text-gray-500"}`}
                      >
                        Updated: {formatDate(bar.created_at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg ${isHighlighted ? "font-semibold" : "font-normal text-gray-900"}`}
                      >
                        ${bar.price} {beerDescription}
                      </p>
                      <p
                        className={`text-sm ${isHighlighted ? "text-orange-200" : "text-gray-500"}`}
                      >
                        ${pricePer100Ml}/100ml
                      </p>
                    </div>
                  </div>

                  {/* Happy Hour Info */}
                  {bar.happy_hour && (
                    <div className="flex items-center gap-2">
                      <IoTimeOutline
                        className="text-xl"
                        style={{ color: isHighlighted ? "#FFFFFF" : "#D2691E" }}
                      />
                      <p
                        className={`text-sm ${isHighlighted ? "text-orange-200" : "text-gray-500"}`}
                      >
                        Happy hour price today until{" "}
                        {convertTo12HourTime(bar.happy_hour_end)}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex">
                    <button
                      onClick={() => openModal(bar)}
                      className={`text-sm font-normal ${isHighlighted ? "text-orange-200" : "text-gray-500"}`}
                    >
                      Details
                    </button>
                    <button
                      onClick={() => openReportModal(bar.id)}
                      className={`ml-4 text-sm font-normal ${isHighlighted ? "text-orange-200" : "text-error"}`}
                    >
                      Report
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {isModalOpen && selectedBar && (
        <dialog open className="modal">
          <div className="fixed inset-0 bg-[#2f2f2f]/25 opacity-50"></div>
          <div className="modal-box bg-base-100">
            <h3 className="text-left text-lg font-bold">
              {selectedBar.bar_name}
            </h3>
            <p className="pt-4 text-left">
              {selectedBar.happy_hour ? (
                <>
                  Happy Hour! <br />
                  Day: {selectedBar.happy_hour_day.join(", ")} <br />
                  Time: {selectedBar.happy_hour_start} -{" "}
                  {selectedBar.happy_hour_end} <br />
                </>
              ) : (
                "More Information Coming Soon!"
              )}
            </p>
            <div className="modal-action">
              <button onClick={closeModal} className="btn btn-primary">
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Report Modal */}
      {isReportModalOpen && (
        <dialog open className="modal">
          <div className="fixed inset-0 bg-[#2f2f2f]/50 opacity-75"></div>
          <div className="modal-box relative bg-base-100">
            {/* Close Button */}
            <button
              className="btn btn-circle btn-error btn-sm absolute right-2 top-2 text-white"
              onClick={closeReportModal}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold">Report Bar Price</h3>
            <p className="py-4">Please select a reason for reporting:</p>

            {/* Report Reasons */}
            <div className="space-y-2">
              {reportReasons.map((reason, index) => (
                <label
                  key={index}
                  className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-primary/10"
                >
                  <input
                    type="radio"
                    name="report-reason"
                    className="radio-primary radio"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            {/* Submit Button */}
            <div className="modal-action mt-4">
              <button
                className="btn btn-primary"
                onClick={handleReport}
                disabled={!selectedReason}
              >
                Submit Report
              </button>
            </div>

            {/* Error Message */}
            {error && <p className="mt-2 text-center text-red-500">{error}</p>}
          </div>
        </dialog>
      )}
    </div>
  );
};

export default BarList;
