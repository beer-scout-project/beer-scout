import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authProvider";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const success = await login(email, password);
    if (success) {
      navigate("/admin-panel");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center bg-base-100">
      <div className="card w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-black">
          Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-black">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-black">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label cursor-pointer">
              <span className="label-text text-black">Show Password</span>
              <input
                type="checkbox"
                className="checkbox-primary checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </label>
          </div>
          <button type="submit" className="btn btn-primary mb-4 w-full">
            Login
          </button>
          {error && <p className="text-center text-error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
