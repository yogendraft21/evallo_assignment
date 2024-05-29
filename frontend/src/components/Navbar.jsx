import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-bold">
        Evallo
      </Link>
      <div className="text-white">
        {user && <span>Welcome, {user.username}</span>}
        {user && (
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
