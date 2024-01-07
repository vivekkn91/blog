"use client";
import React, { useState } from "react";
import Link from "next/link";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = async () => {
    // Basic required field validation
    if (!name || !email || !password) {
      setError("Name, email, and password are required.");
      return;
    }

    // Call the registration API
    try {
      const response = await fetch("/user/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`,
      });

      if (response.ok) {
        // Registration successful
        setRegistrationSuccess(true);
        setError(null); // Clear any previous error
        // You can redirect or perform other actions here
      } else {
        // Registration failed
        const data = await response.json();
        setRegistrationSuccess(false);
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegistrationSuccess(false);
      setError("An error occurred during registration.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {registrationSuccess && (
          <p className="text-green-500 mb-4">Registration successful!</p>
        )}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md mt-1"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Email:
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          <div className="flex justify-evenly">
            <Link href="/login">
              <p className="text-blue-500 py-2 px-4">login</p>
            </Link>
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

export default Register;
