import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [selectedCity, setSelectedCity] = useState("st_johns");

  const handleSelectChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleClick = () => {
    console.log("Selected City:", selectedCity);
    localStorage.setItem("city", selectedCity);
  };

  return (
    <div
      className="hero min-h-full"
      style={{
        backgroundImage: "url(/beerBackground.png)",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-50"></div>
      <div className="hero-content text-center text-white">
        <div className="w-full">
          <h1 className="mb-5 text-5xl font-extrabold">Scouting Beer Deals?</h1>
          <h4 className="mb-5 text-xl font-light">
            Find the cheapest beer near you!
          </h4>
          <div className="flex flex-col items-center">
            {/* Dropdown with three locations */}
            <select
              className="select select-bordered w-full max-w-xs bg-base-100 text-base-content"
              onChange={handleSelectChange}
              value={selectedCity}
            >
              <option value="">Select your city</option>
              <option value="st_johns">St. John's</option>
              <option value="halifax">Halifax</option>
              <option value="corner_brook">Corner Brook</option>
            </select>
            <Link
              to="/bar-list"
              className="btn btn-primary btn-wide mt-4 text-lg sm:ml-4"
              onClick={handleClick}
              disabled={!selectedCity} // Disable button if no city selected
            >
              Cheapest beer right now!
            </Link>
            {/* <h6 className="pt-3 text-sm font-light">Beta Version 1</h6> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
