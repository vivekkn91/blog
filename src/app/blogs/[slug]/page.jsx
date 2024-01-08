"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import baseUrl from "@/app/api-config";
import Header from "@/app/components/header";
export default function Post() {
  const params = useParams();
  const router = useRouter();
  const id = params;

  const [blog, setBlog] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${baseUrl}blognew/${id.slug}`);
        if (response.ok) {
          const result = await response.json();
          setBlog(result.data); // Access the data property
        } else {
          console.error("Failed to fetch blog:", response.statusText);
        }
      } catch (error) {
        console.error("Error during blog fetch:", error);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (!blog) {
    return <p className="text-center text-gray-600 mt-8">Loading...</p>;
  }
  const canEdit = user && user.email === blog.email;

  const handleEditClick = () => {
    console.log("wprking");
    // Redirect to the edit page
    router.push(`/blogs/edit/${id.slug}`);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />

      <div className=" mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">{blog.Title}</h1>
        <p className="">Author: {blog.email}</p>
        <p className=" mt-4">{blog.description}</p>
        {canEdit && (
          <button
            onClick={handleEditClick}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Edit Blog
          </button>
        )}
      </div>
    </main>
  );
}
