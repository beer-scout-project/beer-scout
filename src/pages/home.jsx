import React from "react";
import { Link } from "react-router-dom";

const home = () => {
  return (
    <div
      className="hero min-h-full"
      style={{
        backgroundImage: "url(/drinks-with-friends-1920x1080.png)",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-60"></div>
      <div className="hero-content text-center text-white">
        <div className="max-w-md">
          <img src="beer-scout-logo-18-750x750.png" alt="beer-scout-logo" />
          <h1 className="mb-5 text-5xl font-bold">Beer Scout</h1>
          <h5 className="mb-5">Find bars and cheap drinks near you!</h5>
          <div className="flex flex-col justify-center sm:flex-row">
            <Link
              to="/explore"
              className="btn btn-primary mb-4 sm:mb-0 sm:mr-4"
            >
              Explore
            </Link>
            <Link to="/login" className="btn btn-secondary sm:ml-4">
              Login / Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
