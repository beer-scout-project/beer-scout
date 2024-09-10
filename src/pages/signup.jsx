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

    const form = e.target.closest("form");

    // Check the form validity
    if (form.checkValidity()) {
      // If valid, create a new user
      createNewUser(firstName, lastName, username, email, password);
    } else {
      // If not valid, add custom class to highlight invalid fields
      const requiredFields = form.querySelectorAll("[required]");
      requiredFields.forEach((field) => {
        if (!field.validity.valid) {
          field.classList.add("border-red-500");
        } else {
          field.classList.remove("border-red-500");
        }
      });
      form.reportValidity(); // This triggers the native validation UI
    }
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
              id="first-name"
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
              id="last-name"
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
              id="display-name"
              type="text"
              name="display-name"
              className="w-full rounded p-1 text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="email" className="block">
              Email*
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full rounded p-1 text-black placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="password" className="block">
              Password*
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="w-full rounded p-1 text-black required:border-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="confirm-password" className="block">
              Confirm Password*
            </label>
            <input
              id="confirm-password"
              type="password"
              name="confirm-password"
              className="w-full rounded p-1 text-black required:border-red-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
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
        <Link to="/temp-signup" className="w-full">
          <button className="btn btn-secondary w-full">Temp Signup 👽</button>
        </Link>
      </div>
    </div>
  );
}
