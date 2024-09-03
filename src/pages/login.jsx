import { useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../utils/useApi";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userValidation, setUserValidation] = useState(null);
  const { validateUser } = useApi();

  const handleLogin = (e) => {
    e.preventDefault();
    // check if user info is correct
    const isUserValid = validateUser(userEmail, userPassword);
    // if user is valid, set user validation to valid
    if (isUserValid === "valid") {
      setUserValidation("valid");
    } else if (isUserValid === "invalid") {
      setUserValidation("invalid");
    } else if (isUserValid === "user does not exist") {
      setUserValidation("user does not exist");
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-10">
      {userValidation === "valid" && (
        <div role="alert" className="alert alert-success">
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
          </svg>
          <span>You have logged in successfully!</span>
        </div>
      )}
      {userValidation === "invalid" && (
        <div role="alert" className="alert alert-warning">
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
          <span>Invalid email address or password</span>
        </div>
      )}
      {userValidation === "user does not exist" && (
        <div role="alert" className="alert alert-error">
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Please create an account first</span>
        </div>
      )}
      <div className="flex w-full max-w-[325px] flex-col gap-6">
        <form className="flex flex-col gap-4">
          <label className="block">
            <span className="block">Email</span>
            <input
              type="email"
              name="email"
              className="placeholder-slate-400focus:outline-none w-full rounded p-1 text-black shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
              onChange={(e) => setUserEmail(e.target.value)}
            ></input>
          </label>
          <label className="block">
            <span className="block">Password</span>
            <input
              type="password"
              name="password"
              className="w-full rounded p-1 text-black"
              onChange={(e) => setUserPassword(e.target.value)}
            ></input>
          </label>
          <button className="btn btn-primary mt-4 block" onClick={handleLogin}>
            Login
          </button>
        </form>
        <div className="link block cursor-default no-underline">
          <Link onClick={() => console.log("forgot password")} className="text">
            Forgot Password?
          </Link>
        </div>
      </div>
      <div className="divider">OR</div>
      <div className="flex w-full flex-col items-center gap-2">
        <p>Don't have an account?</p>
        <Link to="/signup" className="black w-full max-w-[325px]">
          <button className="btn btn-secondary w-full">Create Account</button>
        </Link>
      </div>
    </div>
  );
}
