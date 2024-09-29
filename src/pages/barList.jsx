import { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { getBarPricesByLocation } from "../utils/useApi";

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
      const data = await getBarPricesByLocation("st_johns");
      const sortedData = sortBarsByPrice(data);
      setBarPrices(sortedData);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
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

  // Placeholder data for bars
  const bars = [
    {
      name: "The Hoppy",
      price: "$4.50",
      updated: "2023-10-01",
      perLiter: "$9/l",
      isHighlight: true,
    },
    {
      name: "Ale House",
      price: "$5.00",
      updated: "2023-09-28",
      perLiter: "$9/l",
      isHighlight: false,
    },
    {
      name: "Brew",
      price: "$5.25",
      updated: "2023-09-26",
      perLiter: "$9/l",
      isHighlight: false,
    },
    {
      name: "Crafty Bar",
      price: "$5.50",
      updated: "2023-09-20",
      perLiter: "$9/l",
      isHighlight: false,
    },
    {
      name: "Lager Lounge",
      price: "$6.00",
      updated: "2023-09-15",
      perLiter: "$9/l",
      isHighlight: false,
    },
    {
      name: "The Hoppy",
      price: "$4.50",
      updated: "2023-10-01",
      perLiter: "$9/l",
      isHighlight: false,
    },
    {
      name: "Ale House",
      price: "$5.00",
      updated: "2023-09-28",
      perLiter: "$9/l",
      isHighlight: false,
    },
    {
      name: "Brew",
      price: "$5.25",
      updated: "2023-09-26",
      perLiter: "$9/l",
      isHighlight: false,
    },
  ];

  return (
    <div
      className="relative h-full bg-cover bg-center"
      style={{ backgroundImage: "url('/drinks-with-friends-1920x1080.png')" }}
    >
      {/* darkening overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <div className="h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
          {/* Display city from localStorage */}
          <p className="mb-4 flex items-center text-sm text-orange-600">
            <span className="mr-2">
              <FaLocationDot />
            </span>
            St. John&#39;s
            {/*For When there are more cities
            {city ? ` ${city}` : "No location selected"}*/}
          </p>
          <h2 className="mb-4 mt-2 text-2xl font-bold text-gray-800">
            Cheapest Beer Now
          </h2>

          {/* Bars List */}
          <div className="space-y-4">
            {barPrices?.map((bar, index) => (
              <div
                key={index}
                className={`flex items-center justify-between rounded-lg p-4 ${
                  bar.isHighlight ? "bg-orange-500 text-white" : "bg-orange-100"
                }`}
              >
                <div>
                  <p
                    className={`text-lg ${bar.isHighlight ? "font-semibold" : "font-normal text-gray-900"}`}
                  >
                    {bar.bar_name}
                  </p>
                  <p
                    className={`text-sm ${bar.isHighlight ? "text-orange-200" : "text-gray-500"}`}
                  >
                    Updated: {formatDate(bar.created_at)}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-lg ${bar.isHighlight ? "font-semibold" : "font-normal text-gray-900"}`}
                  >
                    {`$${bar.price} (${bar.serving_size})`}
                  </p>
                  <p
                    className={`text-sm ${bar.isHighlight ? "text-orange-200" : "text-gray-500"}`}
                  >
                    {`$${getPricePer100Ml(bar.price, bar.serving_size)}/100ml`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarList;
