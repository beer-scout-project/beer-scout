//import React, { useState } from "react";
import { Link } from "react-router-dom";

const home = () => {
  const selectedCity = "st_johns";

  //Code for drop down list if additional cities added
  /*const [selectedCity, setSelectedCity] = useState("");

  const handleSelectChange = (event) => {
    setSelectedCity(event.target.value);
  };*/

  // temp add to storage
  const handleClick = () => {
    console.log(selectedCity);
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
          <h5 className="mb-5 text-xl font-light">
            Find the cheapest beer in downtown St. John&#39;s!
          </h5>
          <div className="flex flex-col items-center">
            {/*Code for drop down list if additional cities added*/}
            {/*<select
              className="select select-bordered w-full max-w-xs bg-base-100 text-base-content"
              onChange={handleSelectChange}
            >
              <option disabled selected>
                Select your city
              </option>
              <option>St.Johns</option>
              <option>Halifax</option>
            </select>*/}
            <Link
              to="/bar-list"
              className="btn btn-primary btn-wide sm:ml-4"
              onClick={handleClick}
            >
              Cheapest beer right now!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
