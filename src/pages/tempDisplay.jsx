import { useState } from "react";
import { getBarPricesByLocation } from "../utils/useApi";
import { IoTimeOutline } from "react-icons/io5"; // Import the icon

const TempDisplay = () => {
  const [barPrices, setBarPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // handle fetch bar prices (this is locked to st_johns manually but we should take location from dropdown when handle submit/fetch bar prices for that location which will obviously be st johns but still)
  const fetchBarPrices = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const data = await getBarPricesByLocation("st_johns");
      setBarPrices(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  // Function to format the date of save to db
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4">
      {/* button for search this is locked to st_johns manually but we should take location from dropdown when handle submit/fetch bar prices for that location */}
      <button onClick={fetchBarPrices} className="btn btn-primary">
        Search for St. John&#39;s
      </button>

      {/* loading state - this also looks like shit please make it nicer for production */}
      {loading && (
        <p className="mt-4 text-gray-600">
          <span className="loading loading-ball loading-lg"></span>
        </p>
      )}

      {/* error state - just for dev purposes remove this or handle it nicer for production */}
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}

      {/* display bar prices example - use the boxes but update them like this */}
      <div className="mt-4">
        <ul className="space-y-2">
          {barPrices.map((bar, index) => (
            <li
              key={index}
              className="relative rounded-lg border bg-base-100 p-4 shadow"
            >
              {/* Conditionally render the IoTimeOutline icon if happy_hour is true */}
              {bar.happy_hour && (
                <IoTimeOutline className="absolute right-2 top-2 text-3xl text-primary" />
              )}

              <p className="text-lg font-bold">{bar.bar_name}</p>
              <p>Location: St. John&#39;s</p>
              <p>Serving Size: {bar.serving_size}</p>

              {/* ensure price is a number and handle null/undefined values */}
              <p>
                Price: $
                {bar.price !== null && !isNaN(bar.price)
                  ? parseFloat(bar.price).toFixed(2)
                  : "N/A"}
              </p>

              {/* Happy Hour Details */}
              {bar.happy_hour && (
                <div>
                  <p>Happy Hour Day: {bar.happy_hour_day}</p>
                  <p>
                    Time: {bar.happy_hour_start} - {bar.happy_hour_end}
                  </p>
                </div>
              )}

              {/* Display created_at in a readable format using formatDate function */}
              <p>Updated At: {formatDate(bar.created_at)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TempDisplay;
