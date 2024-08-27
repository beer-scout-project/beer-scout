import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const login = () => {
  return (
    <div className="flex flex-col items-center gap-8 p-10">
      <LoginForm />
      <div className="divider">OR</div>
      <div className="flex w-full flex-col items-center gap-2">
        <button className="btn btn-secondary block w-full max-w-[325px]">
          <Link to="/signup">Create Account</Link>
        </button>
      </div>
    </div>
  );
};

export default login;
