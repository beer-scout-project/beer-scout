import React from "react";
import { Link } from "react-router-dom";
import CreateAccountForm from "../components/CreateAccountForm";

export default function SignUp() {
  return (
    <div className="flex flex-col items-center gap-8 p-10">
      <CreateAccountForm />
      <div className="divider">OR</div>
      <div className="flex w-full max-w-[325px] flex-col items-center gap-2">
        <p>Already have an account?</p>
        <Link to="/login" className="w-full">
          <button className="btn btn-secondary w-full">Login</button>
        </Link>
      </div>
    </div>
  );
}
