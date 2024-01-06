"use client";
import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic
    console.log("Logging in with:", username, password);
  };

  const handleRegister = () => {
    // Handle registration logic
    console.log("Registering with:", username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login/Register Page</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded-md mt-1"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md mt-1"
              />
            </label>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleLogin}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
