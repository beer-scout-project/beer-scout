import { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { getBarPricesByLocation } from "../utils/useApi";
import { IoTimeOutline } from "react-icons/io5"; // Import the icon

const BarList = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [barPrices, setBarPrices] = useState([]);

  // Fetch the city from localStorage - TEMP
  useEffect(() => {
    const storedCity = localStorage.getItem("city");
    if (storedCity) {
      setCity(storedCity);
    }
    fetchBarPrices();
  }, []);

  const fetchBarPrices = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      console.log("Fetching bar prices from backend..."); // Log statement
      const data = await getBarPricesByLocation("st_johns"); //Get prices by location
      const currentData = filterPricesByHappyHour(data); //Only show prices that are currently active
      const sortedData = sortBarsByPrice(currentData); //Sort the list by price
      // highlight the bar with the lowest price
      if (sortedData.length > 0) {
        sortedData[0].isHighlighted = true;
      }
      setBarPrices(sortedData);
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
    // remove ml from serving size
    const millilitres = servingSize.replace("ml", "");
    const pricePer100Ml = (price * 100) / millilitres;
    return pricePer100Ml.toFixed(2);
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
        <div className="h-max max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg bg-base-100 p-6 shadow-lg">
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarList;
