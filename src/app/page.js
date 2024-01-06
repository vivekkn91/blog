import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Sample Blog Post 1 */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <Image
            src="/blog-post-1.jpg" // Replace with your actual image path
            alt="Blog Post 1"
            width={600}
            height={400}
            className="rounded-md mb-4"
          />
          <h2 className="text-xl font-bold mb-2">Blog Post 1 Title</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Sample Blog Post 2 */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <Image
            src="/blog-post-2.jpg" // Replace with your actual image path
            alt="Blog Post 2"
            width={600}
            height={400}
            className="rounded-md mb-4"
          />
          <h2 className="text-xl font-bold mb-2">Blog Post 2 Title</h2>
          <p className="text-gray-600">
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Add more blog posts as needed */}
      </section>
      <footer className="mt-8 text-gray-500">
        <p>&copy; 2024 My Blog. All rights reserved.</p>
      </footer>{" "}
    </main>
  );
}
