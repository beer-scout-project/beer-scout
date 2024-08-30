import { Link } from "react-router-dom";
import useApi from "../utils/useApi";
import { useState } from "react";

export default function SignUp() {
  const { createNewUser } = useApi();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    createNewUser(firstName, lastName, username, email, password);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-10">
      <div className="flex w-full max-w-[325px] flex-col gap-6">
        <h2>Create your account</h2>
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="first-name" className="block">
              First Name
            </label>
            <input
              className="w-full rounded p-1 text-black"
              type="text"
              name="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="last-name" className="block">
              Last Name
            </label>
            <input
              type="text"
              name="last-name"
              className="w-full rounded p-1 text-black"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="display-name" className="block">
              Username/Display Name*
            </label>
            <input
              type="text"
              name="display-name"
              className="w-full rounded p-1 text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="email" className="block">
              Email*
            </label>
            <input
              type="email"
              name="email"
              className="laceholder-slate-400focus:outline-none w-full rounded p-1 text-black shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="password" className="block">
              Password*
            </label>
            <input
              type="password"
              name="password"
              className="w-full rounded p-1 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="confirm-password" className="block">
              Confirm Password*
            </label>
            <input
              type="password"
              name="confirm-password"
              className="w-full rounded p-1 text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
          <button
            className="btn btn-primary mt-4 block"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
      </div>
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
