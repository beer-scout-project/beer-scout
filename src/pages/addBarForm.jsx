import { useState } from "react";
import { addBarPrice } from "../utils/useApi";
import { IoCloseCircleSharp } from "react-icons/io5";

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
  }); // State for form data on load

  const [error, setError] = useState(null); // State for error handling
  const [success, setSuccess] = useState(null); // State for success message

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

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

  const handleCloseSuccess = () => {
    setSuccess(null);
  };

  const handleCloseAlert = () => {
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error
    setSuccess(null); // Clear previous success message

    // ensure all fields are filled out
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

    // Function to get price per millilitre
    const getPricePer100Ml = (price, servingSize) => {
      // remove ml from serving size
      const millilitres = servingSize.replace("ml", "");
      const pricePer100Ml = (price * 100) / millilitres;
      return pricePer100Ml.toFixed(2);
    };

    // Function to check if the user entered an obviously incorrect price
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

    // Run price validation
    const priceValidationMessage = validatePrice();
    if (priceValidationMessage) {
      setError(priceValidationMessage);
      return;
    }

    try {
      // Send *formData* json to the backend
      const response = await addBarPrice(formData);
      console.log("Form submitted successfully:", response);

      // Show success message
      setSuccess("Bar price added successfully!");

      // Reset form after submit
      setFormData({
        bar_name: "",
        location: "",
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

  return (
    <div
      className="relative h-full bg-cover bg-center"
      style={{ backgroundImage: "url('/beerBackground.png')" }}
    >
      {/* darkening overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        {/* Success/Error messages */}
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
              {/* <IoMdCloseCircleOutline className="h-[1.2rem] w-[1.2rem]" /> */}
              <IoCloseCircleSharp className="h-[1.3rem] w-[1.3rem]" />
            </button>
          </div>
        )}

        {/* Main content */}
        <div className="mx-[10px] h-max max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg bg-base-100 p-6 shadow-lg sm:mx-4 md:mx-auto">
          <h2 className="mb-4 text-2xl font-bold text-base-content">
            Add a Beer Price
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Bar Name */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-base-content">Bar Name</span>
              </label>
              <select
                name="bar_name"
                value={formData.bar_name}
                onChange={handleChange}
                className="select select-bordered w-full bg-base-200 text-secondary-content"
                required
              >
                <option value="">Select a bar</option>
                <option value="Bannerman Brewing Co.">
                  Bannerman Brewing Co.
                </option>
                <option value="Bernard Stanley Gastropub">
                  Bernard Stanley Gastropub
                </option>
                <option value="Boston Pizza">Boston Pizza</option>
                <option value="Brewdock">Brewdock</option>
                <option value="Bridie Molloy's">Bridie Molloy&#39;s</option>
                <option value="Broderick's on George">
                  Broderick&#39;s on George
                </option>
                <option value="Bull & Barrel">Bull & Barrel</option>
                <option value="Christian's Pub">Christian&#39;s Pub</option>
                <option value="Cork'd">Cork&#39;d</option>
                <option value="Erins Pub">Erins Pub</option>
                <option value="Exile Restaurant and Lounge">
                  Exile Restaurant and Lounge
                </option>
                <option value="Green Sleeves">Green Sleeves</option>
                <option value="Jungle Jim's Eatery">
                  Jungle Jim&#39;s Eatery
                </option>
                <option value="Karaoke Kops">Karaoke Kops</option>
                <option value="Kelly's Pub">Kelly&#39;s Pub</option>
                <option value="Konfusion">Konfusion</option>
                <option value="LIV">LIV</option>
                <option value="Loose Tie">Loose Tie</option>
                <option value="Lottie's Place">Lottie&#39;s Place</option>
                <option value="Lucy's Bar">Lucy&#39;s Bar</option>
                <option value="Magnum & Steins">Magnum & Steins</option>
                <option value="No. 4 Restaurant & Bar">
                  No. 4 Restaurant & Bar
                </option>
                <option value="O’Reilly’s Irish Newfoundland Pub">
                  O&#39;Reilly&#39;s Irish Newfoundland Pub
                </option>
                <option value="Oíche">Oíche</option>
                <option value="On The Rocks">On The Rocks</option>
                <option value="papillon cocktail bar">
                  papillon cocktail bar
                </option>
                <option value="Quidi Vidi Brewery">Quidi Vidi Brewery</option>
                <option value="Rob Roy">Rob Roy</option>
                <option value="Shamrock City Pub">Shamrock City Pub</option>
                <option value="Sláinte Whisky & Wine">
                  Sláinte Whisky & Wine
                </option>
                <option value="Spirit">Spirit</option>
                <option value="Station Lounge">Station Lounge</option>
                <option value="The Adelaide Oyster House">
                  The Adelaide Oyster House
                </option>
                <option value="The Black Sheep">The Black Sheep</option>
                <option value="The Celtic Hearth">The Celtic Hearth</option>
                <option value="The Duke Of Duckworth">
                  The Duke Of Duckworth
                </option>
                <option value="The Martini Bar">The Martini Bar</option>
                <option value="The Merchant Tavern">The Merchant Tavern</option>
                <option value="The Newfoundland Embassy">
                  The Newfoundland Embassy
                </option>
                <option value="The Rock House">The Rock House</option>
                <option value="The Rose & Thistle Pub">
                  The Rose & Thistle Pub
                </option>
                <option value="The Salt House Kitchen">
                  The Salt House Kitchen
                </option>
                <option value="The Ship Pub">The Ship Pub</option>
                <option value="The Trinity">The Trinity</option>
                <option value="Three Cheers">Three Cheers</option>
                <option value="TJ's Pub">TJ&#39;s Pub</option>
                <option value="Toslow">Toslow</option>
                <option value="Trapper John's">Trapper John&#39;s</option>
                <option value="West End Club">West End Club</option>
                <option value="YellowBelly Brewery">YellowBelly Brewery</option>
              </select>
            </div>
            {/* Location */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-base-content">Location</span>
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="select select-bordered w-full bg-base-200 text-secondary-content"
                required
              >
                <option value="" disabled>
                  Select your city
                </option>
                <option value="st_johns">St. John&#39;s</option>
              </select>
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
                <option value="473ml">Pint (473ml)</option>
                <option value="568ml">Large Pint (591ml)</option>
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
            {/* Happy Hour Details */}
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
                    {/* Monday */}
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="happy_hour_day"
                        value="Monday"
                        checked={formData.happy_hour_day.includes("Monday")}
                        onChange={handleChange}
                        className="checkbox-primary checkbox bg-base-200"
                      />
                      <span className="ml-2 text-sm">Monday</span>
                    </label>
                  
                    {/* Tuesday */}
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="happy_hour_day"
                        value="Tuesday"
                        checked={formData.happy_hour_day.includes("Tuesday")}
                        onChange={handleChange}
                        className="checkbox-primary checkbox bg-base-200"
                      />
                      <span className="ml-2 text-sm">Tuesday</span>
                    </label>
                   
                    {/* Wednesday */}
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="happy_hour_day"
                        value="Wednesday"
                        checked={formData.happy_hour_day.includes("Wednesday")}
                        onChange={handleChange}
                        className="checkbox-primary checkbox bg-base-200"
                      />
                      <span className="ml-2 text-sm">Wednesday</span>
                    </label>
                    
                    {/* Thursday */}
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="happy_hour_day"
                        value="Thursday"
                        checked={formData.happy_hour_day.includes("Thursday")}
                        onChange={handleChange}
                        className="checkbox-primary checkbox bg-base-200"
                      />
                      <span className="ml-2 text-sm">Thursday</span>
                    </label>
                    
                    {/* Friday */}
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="happy_hour_day"
                        value="Friday"
                        checked={formData.happy_hour_day.includes("Friday")}
                        onChange={handleChange}
                        className="checkbox-primary checkbox bg-base-200"
                      />
                      <span className="ml-2 text-sm">Friday</span>
                    </label>
                   
                    {/* Saturday */}
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="happy_hour_day"
                        value="Saturday"
                        checked={formData.happy_hour_day.includes("Saturday")}
                        onChange={handleChange}
                        className="checkbox-primary checkbox bg-base-200"
                      />
                      <span className="ml-2 text-sm">Saturday</span>
                    </label>
                    
                    {/* Sunday */}
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="happy_hour_day"
                        value="Sunday"
                        checked={formData.happy_hour_day.includes("Sunday")}
                        onChange={handleChange}
                        className="checkbox-primary checkbox bg-base-200"
                      />
                      <span className="ml-2 text-sm">Sunday</span>
                    </label>
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
