import React, { useState, useEffect } from "react";
import { createBar } from "../../utils/useApi";
import { IoCloseCircleSharp, IoShieldCheckmark } from "react-icons/io5";

const AddBar = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    location: "",
  });

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

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

  const handleCloseSuccess = () => setSuccess(null);
  const handleCloseAlert = () => setError(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { name, address, location } = formData;

    if (!name || !address || !location) {
      setError("All fields are required.");
      return;
    }

    try {
      await createBar(name, address, location);
      setSuccess("Bar created successfully!");
      setFormData({ name: "", address: "", location: "" });
    } catch (err) {
      console.error("Error creating bar:", err);
      setError("Failed to create bar. Please try again.");
    }
  };

  return (
    <div className="mt-8">
      {/* Success Message */}
      {success && (
        <div
          role="alert"
          className="alert alert-success absolute right-4 top-4 z-10 flex max-w-max items-center justify-center rounded-lg"
        >
          <IoShieldCheckmark size={26} />
          <span className="ml-2">{success}</span>
          <button onClick={handleCloseSuccess} className="ml-2">
            <IoCloseCircleSharp className="h-[1.3rem] w-[1.3rem]" />
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          role="alert"
          className="alert alert-warning absolute right-4 top-4 z-10 flex max-w-max items-center justify-center rounded-lg"
        >
          <span>{error}</span>
          <button onClick={handleCloseAlert} className="ml-2">
            <IoCloseCircleSharp className="h-[1.3rem] w-[1.3rem]" />
          </button>
        </div>
      )}

      <h2 className="mb-4 text-2xl font-bold">Add a New Bar</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Bar Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter bar name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Address (ex. 123 George Street) </span>
          </label>
          <input
            type="text"
            name="address"
            placeholder="Enter street address"
            value={formData.address}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select a city</option>
            <option value="st_johns">St. John's</option>
            {/* <option value="halifax">Halifax</option> */}
            <option value="corner_brook">Corner Brook</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Add Bar
        </button>
      </form>
    </div>
  );
};

export default AddBar;
