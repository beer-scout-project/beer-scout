import { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { getBarPricesByLocation } from "../utils/useApi";
import { IoTimeOutline } from "react-icons/io5"; // Import the icon

const BarList = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [barPrices, setBarPrices] = useState([]);
  //const [selectedBar, setSelectedBar] = useState(null);
  //const [isModalOpen, setIsModalOpen] = useState(false);

  //starting sort by if happy hour is current
  const currentDate = new Date();
  const day = currentDate.getDate();
  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentTime = `${currentHour}:${currentMinutes < 10 ? "0" : ""}${currentMinutes}`;

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

  /* const openModal = (bar) => {
    setSelectedBar(bar);
    setIsModalOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setSelectedBar(null);
    setIsModalOpen(false);
    document.body.classList.remove("modal-open");
  };*/

  return (
    <div
      className="relative h-full bg-cover bg-center"
      style={{ backgroundImage: "url('/drinks-with-friends-1920x1080.png')" }}
    >
      {/* darkening overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <div className="h-max max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg bg-[#FAF9F6] p-6 shadow-lg">
          {/* Display city from localStorage */}
          <p className="mb-4 flex items-center text-sm text-orange-600">
            <span className="mr-2">
              <FaLocationDot />
            </span>
            St. John&#39;s
            {/*For When there are more cities
            {city ? ` ${city}` : "No location selected"}*/}
          </p>
          <h2 className="mb-4 mt-2 text-2xl font-bold text-[#2f2f2f]">
            Cheapest Beer Now
          </h2>

          {/* Bars List */}
          <div className="space-y-4">
            {barPrices?.map((bar, index) => (
              <div
                key={index}
                className={`flex items-center justify-between rounded-lg p-4 ${
                  bar.isHighlighted
                    ? "bg-[#D2691E] text-[#FAF9F6]"
                    : "bg-[#FDEBD0]"
                }`}
              >
                <div>
                  <p
                    className={`text-lg ${bar.isHighlighted ? "font-semibold" : "font-normal text-gray-900"}`}
                  >
                    {bar.bar_name}
                  </p>
                  <p
                    className={`text-sm ${bar.isHighlighted ? "text-orange-200" : "text-gray-500"}`}
                  >
                    Updated: {formatDate(bar.created_at)}
                  </p>
                  {bar.happy_hour && (
                    <p
                      className={`text-sm ${bar.isHighlighted ? "text-orange-200" : "text-gray-500"}`}
                    >
                      {/*Need to format so icon is on same row as happy hour time, maybe centred in middle of bottom row */}
                      <IoTimeOutline className="color-[#2f2f2f] text-2xl text-[#D2691E] hover:text-[#2f2f2f] active:text-center active:text-xl" />
                      Happy hour price until:{" "}
                      {convertTo12HourTime(bar.happy_hour_end)}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-lg ${bar.isHighlighted ? "font-semibold" : "font-normal text-gray-900"}`}
                    >
                      {`$${bar.price} (${bar.serving_size})`}
                    </p>
                  </div>
                  <p
                    className={`text-sm ${bar.isHighlighted ? "text-orange-200" : "text-gray-500"}`}
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

/*  //Happy Hour Modal 
  {isModalOpen && selectedBar && (
    <dialog open className="modal">
       //Darkening Overlay 
      <div className="fixed inset-0 bg-[#2f2f2f]/25 opacity-50" />
      <div className="modal-box bg-[#FDEBD0] text-[#2f2f2f]">
        <h3 className="text-left text-lg font-bold">
          {selectedBar.bar_name} Happy Hour
        </h3>
        <p className="pt-4 text-left">
          Day: {selectedBar.happy_hour_day} <br />
          Time:{" "}
          {convertTo12HourTime(
            selectedBar.happy_hour_start,
          )}{" "}
          - {convertTo12HourTime(selectedBar.happy_hour_end)}
        </p>
        <div className="modal-action m-0">
          <form method="dialog">
            // if there is a button in form, it will close the modal 
            <button
              onClick={closeModal}
              className="btn btn-primary border-none bg-[#D2691E] text-[#FAF9F6]"
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )}{" "}*/
