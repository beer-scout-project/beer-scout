import { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

import { reportBarPrice, getBarPricesByLocation } from "../utils/useApi";

const BarList = () => {
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

  // Fetch the city from localStorage - TEMP
  useEffect(() => {
    const storedCity = localStorage.getItem("city");
    if (storedCity) {
      setCity(storedCity);
    }
    // Check sessionStorage for cached bar prices
    const cachedBarPrices = sessionStorage.getItem("barPrices");
    if (cachedBarPrices) {
      console.log("Loading bar prices from session storage...");
      setBarPrices(JSON.parse(cachedBarPrices));
    } else {
      fetchBarPrices();
    }
  }, []);

  const fetchBarPrices = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      console.log("Fetching bar prices from backend..."); // Log statement
      const data = await getBarPricesByLocation("st_johns"); // Get prices by location
      const currentData = filterPricesByHappyHour(data); // Only show prices that are currently active
      const sortedData = sortBarsByPrice(currentData); // Sort the list by price
      // Highlight the bar with the lowest price
      if (sortedData.length > 0) {
        sortedData[0].isHighlighted = true;
      }
      setBarPrices(sortedData);
      // Store the fetched data in sessionStorage
      sessionStorage.setItem("barPrices", JSON.stringify(sortedData));
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  // Filter bars to show only current prices
  const filterPricesByHappyHour = (data) => {
    const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });
    const currentTime = new Date();

    return data.filter((bar) => {
      if (!bar.happy_hour) {
        return true;
      }

      const barStartTime = new Date();
      const [startHour, startMinute] = bar.happy_hour_start.split(":");
      barStartTime.setHours(startHour, startMinute);

      const barEndTime = new Date();
      const [endHour, endMinute] = bar.happy_hour_end.split(":");
      barEndTime.setHours(endHour, endMinute);

      return (
        bar.happy_hour_day.includes(currentDay) &&
        currentTime >= barStartTime &&
        currentTime <= barEndTime
      );
    });
  };

  // Function to get the description based on the size
  const getBeerDescriptionFromSize = (size) => {
    switch (size) {
      case "268ml":
        return "Half Pints";
      case "330ml":
        return "Bottles";
      case "355ml":
        return "Cans";
      case "473ml":
        return "16oz Pints";
      case "591ml":
        return "20oz Pints";
      case "1140ml":
        return "Pitchers";
      default:
        return size;
    }
  };

  // Function to format the date from the db to display to the user
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const convertTo12HourTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleTimeString("en-US", options);
  };

  // Function to sort bars by price per 100ml
  const sortBarsByPrice = (data) => {
    const sortedBars = structuredClone(data);
    sortedBars.sort((a, b) => {
      const pricePer100MlA = getPricePer100Ml(a.price, a.serving_size);
      const pricePer100MlB = getPricePer100Ml(b.price, b.serving_size);
      return pricePer100MlA - pricePer100MlB;
    });
    return sortedBars;
  };

  // Function to get price per millilitre
  const getPricePer100Ml = (price, servingSize) => {
    // Remove ml from serving size
    const millilitres = servingSize.replace("ml", "");
    const pricePer100Ml = (price * 100) / millilitres;
    return pricePer100Ml.toFixed(2);
  };

  // Functions to open and close the bar details modal
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

  // Function to handle report submission
  const handleReport = async () => {
    if (!selectedReason) {
      alert("Please select a reason.");
      return;
    }

    try {
      await reportBarPrice(selectedBarPriceId, selectedReason);
      alert("Thank you for your report.");
      setIsReportModalOpen(false);
      setSelectedReason("");
      document.body.classList.remove("modal-open");
    } catch (error) {
      console.error("Error reporting bar price:", error);
    }
  };

  return (
    <div
      className="relative h-full bg-cover bg-center"
      style={{ backgroundImage: "url('/beerBackground.png')" }}
    >
      {/* darkening overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <div className="h-max max-h-[80vh] w-full max-w-lg overflow-y-auto overflow-x-hidden rounded-lg bg-base-100 px-6 shadow-lg">
          <div className="sticky top-0 flex justify-between bg-base-100 pt-4 opacity-95">
            <div>
              {/* Display city from localStorage */}
              <p className="mb-2 flex items-center text-orange-600">
                <span className="mr-2">
                  <FaLocationDot />
                </span>
                St. John&#39;s
                {/*For When there are more cities
                {city ? ` ${city}` : "No location selected"}*/}
              </p>
              <h2 className="mb-4 text-2xl font-bold text-base-content">
                Cheapest Beer Now
              </h2>
            </div>
            <div
              className="tooltip tooltip-bottom h-max"
              data-tip="Suggest a beer price"
            >
              <Link to="/add-bar" className="btn btn-circle btn-ghost">
                <FaPlus size={20} />
              </Link>
            </div>
          </div>

          {/* Bars List */}
          <div className="space-y-4">
            {/* Display loading icon */}
            {loading && (
              <span className="loading loading-spinner ml-[49%] text-warning"></span>
            )}

            {barPrices?.map((bar, index) => {
              let beerDescription = getBeerDescriptionFromSize(
                bar.serving_size,
              );
              return (
                <div
                  key={index}
                  className={`flex flex-col gap-2 rounded-lg p-4 ${
                    bar.isHighlighted
                      ? "bg-[#D2691E] text-[#FAF9F6]"
                      : "bg-[#fcdcad]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-lg ${
                          bar.isHighlighted
                            ? "font-semibold"
                            : "font-normal text-gray-900"
                        }`}
                      >
                        {bar.bar_name}
                      </p>
                      <p
                        className={`text-sm ${
                          bar.isHighlighted
                            ? "text-orange-200"
                            : "text-gray-500"
                        }`}
                      >
                        Updated: {formatDate(bar.created_at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-lg ${
                            bar.isHighlighted
                              ? "font-semibold"
                              : "font-normal text-gray-900"
                          }`}
                        >
                          {`$${bar.price} ${beerDescription}`}
                        </p>
                      </div>
                      <p
                        className={`text-sm ${
                          bar.isHighlighted
                            ? "text-orange-200"
                            : "text-gray-500"
                        }`}
                      >
                        {`$${getPricePer100Ml(bar.price, bar.serving_size)}/100ml`}
                      </p>
                    </div>
                  </div>
                  {bar.happy_hour && (
                    <div className="align-center flex gap-2">
                      <IoTimeOutline
                        className="text-xl"
                        style={{
                          color: bar.isHighlighted ? "#FFFFFF" : "#D2691E",
                        }}
                      />
                      <p
                        className={`text-sm ${
                          bar.isHighlighted
                            ? "text-orange-200"
                            : "text-gray-500"
                        }`}
                      >
                        Happy hour price today until{" "}
                        {convertTo12HourTime(bar.happy_hour_end)}
                      </p>
                    </div>
                  )}
                  <div>
                    <button
                      onClick={() => openModal(bar)}
                      className={`text-sm font-normal ${
                        bar.isHighlighted ? "text-orange-200" : "text-gray-500"
                      }`}
                    >
                      Details
                    </button>
                    {/* Report Button */}
                    <button
                      onClick={() => {
                        setSelectedBarPriceId(bar.id);
                        setIsReportModalOpen(true);
                        document.body.classList.add("modal-open");
                      }}
                      className={`ml-4 text-sm font-normal ${
                        bar.isHighlighted ? "text-orange-200" : "text-error"
                      }`}
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
          {/* Darkening Overlay */}
          <div className="fixed inset-0 bg-[#2f2f2f]/25 opacity-50" />
          <div className="modal-box bg-base-100">
            <h3 className="text-left text-lg font-bold">
              {selectedBar.bar_name}
            </h3>
            <p className="pt-4 text-left">
              {selectedBar.happy_hour ? (
                <>
                  Happy Hour! <br />
                  Day: {selectedBar.happy_hour_day} <br />
                  Time: {selectedBar.happy_hour_start} -{" "}
                  {selectedBar.happy_hour_end} <br />
                </>
              ) : (
                <>More Information Coming Soon!</>
              )}
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button onClick={closeModal} className="btn btn-primary">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}

      {/* Report Modal */}
      {isReportModalOpen && (
        <dialog open className="modal">
          {/* Darkening Overlay */}
          <div className="fixed inset-0 bg-[#2f2f2f]/50 opacity-75" />
          <div className="modal-box relative bg-base-100">
            {/* Close Button */}
            <button
              className="btn btn-circle btn-error btn-sm absolute right-2 top-2 text-white"
              onClick={() => {
                setIsReportModalOpen(false);
                document.body.classList.remove("modal-open");
              }}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold">Report Bar Price</h3>
            <p className="py-4">Please select a reason for reporting:</p>
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
            <div className="modal-action mt-4">
              <button className="btn btn-primary" onClick={handleReport}>
                Submit Report
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default BarList;
