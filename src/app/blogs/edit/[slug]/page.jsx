"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header";
import { useParams } from "next/navigation";

export default function EditBlog() {
  const params = useParams();
  const router = useRouter();
  const id = params;

  const [blog, setBlog] = useState({
    Title: "",
    description: "",
    // Add other properties you want to edit
  });

  useEffect(() => {
    // Fetch the blog data for editing
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/blognew/${id.slug}`);
        if (response.ok) {
          const result = await response.json();
          setBlog(result.data);
        } else {
          console.error("Failed to fetch blog:", response.statusText);
        }
      } catch (error) {
        console.error("Error during blog fetch:", error);
      }
    };

    if (id.slug) {
      fetchBlog();
    }
  }, [id.slug]);

  const handleEditBlog = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/blog/${id.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Change the Content-Type header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Title: blog.Title,
          description: blog.description,
          // Include other fields as needed
        }),
      });

      if (response.ok) {
        console.log("Blog updated successfully");
        // Redirect to the blog page after editing
        router.push(`/`);
      } else {
        const data = await response.json();
        console.error("Failed to update blog:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error during blog update:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <div className="max-w-3xl mx-auto my-8 ">
        <h1 className="text-3xl font-bold mb-4">Edit Blog</h1>
        <form className="max-w-3xl mx-auto my-8">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Title:
              <input
                type="text"
                name="Title"
                value={blog.Title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md mt-1"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Description:
              <textarea
                name="description"
                value={blog.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md mt-1"
              />
            </label>
          </div>
          {/* Add other form fields for editing other properties */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleEditBlog}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
