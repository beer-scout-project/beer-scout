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
    happy_hour_day: "",
    happy_hour_start: "",
    happy_hour_end: "",
  }); // State for form data on load

  const [error, setError] = useState(null); // State for error handling
  const [success, setSuccess] = useState(null); // State for success message

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
        happy_hour_day: "",
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
              <input
                type="text"
                name="bar_name"
                value={formData.bar_name}
                onChange={handleChange}
                placeholder="Type here"
                className="input input-bordered w-full bg-base-200 text-secondary-content"
                required
              />
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
                  <select
                    name="happy_hour_day"
                    value={formData.happy_hour_day}
                    onChange={handleChange}
                    className="select select-bordered w-full bg-base-200 text-secondary-content"
                    required={formData.happy_hour}
                  >
                    <option value="">Select a day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
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
