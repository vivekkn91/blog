"use client";

import { useState } from "react";
import Header from "@/app/components/header";
import baseUrl from "@/app/api-config";
const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const handleAddBlog = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      const response = await fetch(`${baseUrl}blog/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: `Title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(
          description
        )}&email=${encodeURIComponent(user.email)}`,
      });

      if (response.ok) {
        setAlert("Blog added successfully");
        router.push("/dashboard");
        // You can perform additional actions here if needed
      } else {
        const data = await response.json();
        console.error("Failed to add blog:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error during blog addition:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <div className="max-w-md mx-auto my-8">
        <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
        {alert && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4"
            role="alert"
          >
            {alert}
          </div>
        )}

        <form className="space-y-8">
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-md mt-1"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md mt-1 h-40" // Adjust the height as needed
              />
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddBlog}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddBlog;
