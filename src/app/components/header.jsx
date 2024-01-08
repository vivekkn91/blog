import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  // Retrieve user information from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    // Clear user information from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Redirect to the login page after logout
    router.push("/");
  };

  return (
    <>
      <header className="flex flex-col md:flex-row items-center justify-between w-full mb-8">
        <h1
          className="text-4xl font-bold mb-4 md:mb-0  cursor-pointer"
          onClick={() => router.push("/")}
        >
          Welcome to My Blog
        </h1>

        {user ? (
          // If user information is available, display the user's name with a logout button on hover
          <div className="group flex items-center">
            <button
              onClick={handleLogout}
              className="hidden group-hover:block bg-red-500 p-2 rounded-md ml-4"
            >
              Logout
            </button>
            <p className="text-lg font-semibold cursor-pointer hover:underline mr-4">
              {user.name}
            </p>
          </div>
        ) : (
          // If user information is not available, display the "Login" button
          <button type="button" onClick={() => router.push("/login")}>
            Login
          </button>
        )}
      </header>
      {user ? (
        <button
          onClick={() => router.push("/blogs")}
          className="text-lg font-semibold cursor-pointer hover:underline mt-4 ml-4 md:ml-0 bg-red-500 p-2 rounded-md"
        >
          Add New Blog
        </button>
      ) : null}
      <br />{" "}
    </>
  );
};

export default Header;
