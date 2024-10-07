import { useState } from "react";
import { addBarPrice } from "../utils/useApi";

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
      // create price range validation function
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
        {/* Main content */}
        <div className="mx-[10px] h-max max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lg sm:mx-4 md:mx-auto">
          <h2 className="mb-4 text-2xl font-bold text-black">
            Add a Beer Price
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Bar Name */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-black">Bar Name</span>
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
                <span className="label-text text-black">Location</span>
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
                <span className="label-text text-black">Serving Size</span>
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
                <option value="355ml">Can (355 ml)</option>
                <option value="473ml">Tall Can (473 ml)</option>
                <option value="330ml">Bottle (330 ml)</option>
                <option value="473ml">Pint (473 ml)</option>
                <option value="568ml">Large Pint (568 ml)</option>
                <option value="284ml">Half Pint (284 ml)</option>
                <option value="1000ml">Pitcher (1000 ml)</option>
              </select>
            </div>
            {/* Price */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-black">Price ($)</span>
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
                <span className="label-text text-black">Happy Hour</span>
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
                    <span className="label-text text-black">
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
                    <span className="label-text text-black">
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
                    <span className="label-text text-black">
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
            {/* Success/Error messages */}
            {success && <p className="mt-4 text-green-500">{success}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBarForm;
