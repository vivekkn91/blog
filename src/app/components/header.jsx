"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Header = () => {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between w-full mb-8">
      <h1 className="text-4xl font-bold">
        <a>Welcome to My Blog</a>
      </h1>

      <button type="button" onClick={() => router.push("/login")}>
        Dashboard
      </button>
    </header>
  );
};

export default Header;
