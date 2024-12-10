import { useState, useEffect } from "react";
import { addBarPrice, getBarsByLocation } from "../utils/useApi";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const AddBarForm = () => {
  const [formData, setFormData] = useState({
    bar_name: "",
    location: "",
    serving_size: "",
    price: "",
    happy_hour: false,
    happy_hour_day: [],
    happy_hour_start: "",
    happy_hour_end: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [filteredBars, setFilteredBars] = useState([]);
  const [allBars, setAllBars] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    // Load the user's city from localStorage
    const storedCity = localStorage.getItem("city");
    if (storedCity) {
      setCity(storedCity);
      setFormData((prev) => ({ ...prev, location: storedCity }));
    }
  }, []);

  useEffect(() => {
    if (!city) return;

    // Load or Initialize barsCache from sessionStorage
    const cachedData = sessionStorage.getItem("barsCache");
    let barsCache = cachedData ? JSON.parse(cachedData) : {};

    if (barsCache[city]) {
      console.log(`Loading bars for ${city} from cache.`);
      setAllBars(barsCache[city]);
    } else {
      fetchAndCacheBars(city, barsCache);
    }
  }, [city]);

  const fetchAndCacheBars = async (loc, barsCache) => {
    try {
      const bars = await getBarsByLocation(loc);
      setAllBars(bars);

      // Update cache
      barsCache[loc] = bars;
      sessionStorage.setItem("barsCache", JSON.stringify(barsCache));
    } catch (error) {
      console.error("Error fetching bars:", error);
      setAllBars([]);
    }
  };

  const handleFocus = () => {
    setFilteredBars(allBars);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "bar_name") {
      // Filter suggestions based on input
      if (value === "") {
        setFilteredBars([]);
      } else {
        const filtered = allBars.filter((bar) =>
          bar.name.toLowerCase().includes(value.toLowerCase()),
        );
        setFilteredBars(filtered);
      }
    }

    if (name === "happy_hour_day") {
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          happy_hour_day: [...prevData.happy_hour_day, value],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          happy_hour_day: prevData.happy_hour_day.filter(
            (day) => day !== value,
          ),
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleBarNameSelect = (barName) => {
    setFormData((prevData) => ({
      ...prevData,
      bar_name: barName,
    }));
    setFilteredBars([]);
  };

  const handleCloseSuccess = () => setSuccess(null);
  const handleCloseAlert = () => setError(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const selectedBar = allBars.find((b) => b.name === formData.bar_name);
    if (!selectedBar) {
      setError("We only accept prices for the bars listed at this time.");
      return;
    }

    if (!formData.bar_name) {
      setError("Bar name is required.");
      return;
    }
    if (!formData.location) {
      setError("Location is required.");
      return;
    }
    if (!formData.serving_size) {
      setError("Serving size is required.");
      return;
    }
    if (!formData.price || isNaN(formData.price)) {
      setError("Valid price is required.");
      return;
    }

    const getPricePer100Ml = (price, servingSize) => {
      const millilitres = servingSize.replace("ml", "");
      const pricePer100Ml = (price * 100) / millilitres;
      return pricePer100Ml.toFixed(2);
    };

    const validatePrice = () => {
      const pricePer100Ml = getPricePer100Ml(
        formData.price,
        formData.serving_size,
      );
      if (pricePer100Ml < 0.5) {
        return "This price seems too good to be true! Please check the price you entered.";
      }
      if (pricePer100Ml > 5) {
        return "That's one expensive beer! Please check the price you entered.";
      }
      return null;
    };

    const priceValidationMessage = validatePrice();
    if (priceValidationMessage) {
      setError(priceValidationMessage);
      return;
    }

    try {
      const barDataToSend = {
        ...formData,
        address: selectedBar.address,
      };

      const response = await addBarPrice(barDataToSend);
      console.log("Form submitted successfully:", response);
      setSuccess("Bar price added successfully!");

      setFormData({
        bar_name: "",
        location: formData.location,
        serving_size: "",
        price: "",
        happy_hour: false,
        happy_hour_day: [],
        happy_hour_start: "",
        happy_hour_end: "",
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to add bar price. Please try again.");
    }
  };

  const handleLocationChange = async (e) => {
    const newLocation = e.target.value;

    // Clear relevant fields
    setFormData((prevData) => ({
      ...prevData,
      location: newLocation,
      bar_name: "",
      serving_size: "",
      price: "",
      happy_hour: false,
      happy_hour_day: [],
      happy_hour_start: "",
      happy_hour_end: "",
    }));

    setCity(newLocation);
    // We do not clear barsCache globally here because we want to keep other cached locations.
    // The fetch logic will check if we have cached data for this new location or not.
  };

  return (
    <div
      className="relative h-full bg-cover bg-center"
      style={{ backgroundImage: "url('/beerBackground.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        {success && (
          <div
            role="alert"
            className="alert alert-success absolute right-4 top-4 z-10 flex max-w-max justify-center rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>{" "}
            <span>{success}</span>
            <button onClick={handleCloseSuccess}>
              <IoCloseCircleSharp className="h-[1.3rem] w-[1.3rem]" />
            </button>
          </div>
        )}
        {error && (
          <div
            role="alert"
            className="alert alert-warning absolute right-4 top-4 flex w-80 justify-center rounded-lg sm:w-[max-content]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{error}</span>
            <button onClick={handleCloseAlert}>
              <IoCloseCircleSharp className="h-[1.3rem] w-[1.3rem]" />
            </button>
          </div>
        )}
        <div className="mx-[10px] h-max max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg bg-base-100 p-6 shadow-lg sm:mx-4 md:mx-auto">
          <Link
            to="/bar-list"
            className="mb-4 inline-flex items-center text-sm text-neutral-content"
          >
            <IoMdArrowRoundBack size={20} className="mr-2" /> Back to Bar List
          </Link>
          <h2 className="mb-4 text-2xl font-bold text-base-content">
            Add a Beer Price
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Location Selector */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-base-content">Location</span>
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleLocationChange}
                className="select select-bordered w-full bg-base-200 text-secondary-content"
                required
              >
                <option value="" disabled>
                  Select your city
                </option>
                <option value="st_johns">St. John's</option>
                {/* <option value="halifax">Halifax</option> */}
                <option value="corner_brook">Corner Brook</option>
              </select>
            </div>

            <div className="form-control relative mb-4">
              <label className="label">
                <span className="label-text text-base-content">Bar Name</span>
              </label>
              <input
                type="text"
                name="bar_name"
                value={formData.bar_name}
                onChange={handleChange}
                onFocus={handleFocus}
                className="input input-bordered w-full bg-base-200 text-secondary-content"
                placeholder="Type bar name here..."
                autoComplete="off"
                required
              />
              {filteredBars.length > 0 && (
                <ul className="absolute left-0 top-full z-10 max-h-[300px] w-full overflow-y-auto rounded-lg border bg-base-300 text-secondary-content shadow-lg">
                  {filteredBars.map((bar, index) => (
                    <li
                      key={index}
                      className="cursor-pointer p-2 hover:bg-neutral-content hover:text-base-100"
                      onClick={() => handleBarNameSelect(bar.name)}
                    >
                      {bar.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Serving Size */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-base-content">
                  Serving Size
                </span>
              </label>
              <select
                name="serving_size"
                value={formData.serving_size}
                onChange={handleChange}
                className="select select-bordered w-full bg-base-200 text-secondary-content"
                required
              >
                <option value="" disabled>
                  Select serving size
                </option>
                <option value="355ml">Can (355ml)</option>
                <option value="473ml">Tall Can (473ml)</option>
                <option value="330ml">Bottle (330ml)</option>
                <option value="473ml">16oz Pint (473ml)</option>
                <option value="591ml">20oz Pint (591ml)</option>
                <option value="284ml">Half Pint (284ml)</option>
                <option value="1000ml">Pitcher (1140ml)</option>
              </select>
            </div>
            {/* Price */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-base-content">Price ($)</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="input input-bordered w-full bg-base-200 text-secondary-content"
                step="0.01"
                required
              />
            </div>
            {/* Happy Hour Checkbox */}
            <div className="form-control mb-4">
              <label className="label cursor-pointer">
                <span className="label-text text-base-content">Happy Hour</span>
                <input
                  type="checkbox"
                  name="happy_hour"
                  checked={formData.happy_hour}
                  onChange={handleChange}
                  className="checkbox-primary checkbox"
                />
              </label>
            </div>
            {formData.happy_hour && (
              <>
                {/* Happy Hour Day */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text text-base-content">
                      Happy Hour Day
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <label className="flex items-center" key={day}>
                        <input
                          type="checkbox"
                          name="happy_hour_day"
                          value={day}
                          checked={formData.happy_hour_day.includes(day)}
                          onChange={handleChange}
                          className="checkbox-primary checkbox bg-base-200"
                        />
                        <span className="ml-2 text-sm">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Happy Hour Start */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text text-base-content">
                      Happy Hour Start Time
                    </span>
                  </label>
                  <input
                    type="time"
                    name="happy_hour_start"
                    value={formData.happy_hour_start}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-base-200 text-secondary-content"
                    required={formData.happy_hour}
                  />
                </div>
                {/* Happy Hour End */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text text-base-content">
                      Happy Hour End Time
                    </span>
                  </label>
                  <input
                    type="time"
                    name="happy_hour_end"
                    value={formData.happy_hour_end}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-base-200 text-secondary-content"
                    required={formData.happy_hour}
                  />
                </div>
              </>
            )}
            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBarForm;
