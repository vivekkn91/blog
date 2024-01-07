"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/header";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/blog/show");
        if (response.ok) {
          const data = await response.json();
          setBlogs(data.data);
        } else {
          console.error("Failed to fetch blogs:", response.statusText);
        }
      } catch (error) {
        console.error("Error during blog fetch:", error);
      }
    };

    fetchBlogs();
  }, []);
  // Helper function to truncate text to a specified length
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    // Truncate and add ellipsis
    return text.slice(0, maxLength) + "...";
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link key={blog._id} href={`/blogs/${blog.blogID}`}>
            <div className="bg-white p-4 rounded-md shadow-md">
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2 text-gray-600">
                  {blog.Title}
                </h2>{" "}
                <p className="text-gray-500 mt-2 text-gray-800 font-bold ">
                  Author: {blog.email}
                </p>
                <p className="text-gray-600">
                  {truncateText(blog.description, 500)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>
      <footer className="mt-8 text-gray-500">
        <p>&copy; 2024 My Blog. All rights reserved.</p>
      </footer>
    </main>
  );
}
