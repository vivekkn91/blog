"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import baseUrl from "@/app/api-config";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    // Basic required field validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}login/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(
          password
        )}`,
      });

      if (response.ok) {
        const data = await response.json();

        // Extract user and token information from the response
        const { user, token } = data.data;

        // Store the token in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Reset state and perform any necessary actions (e.g., redirect)
        setEmail("");
        setPassword("");
        setError(null);
        console.log("Login successful");
        router.push("/");
        // Redirect to a different page after successful login
        // router.push("/dashboard"); // Adjust the path accordingly
      } else {
        const data = await response.json();
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login.");
    }
  };

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");

    if (token) {
      // Redirect to the login page if the user is not authenticated
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-4">
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
            <Link href="/register">
              <p className="text-blue-500 py-2 px-4">Register an account</p>
            </Link>
            <button
              type="button"
              onClick={handleLogin}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4"></div>
      </div>
    </div>
  );
};

export default Login;
