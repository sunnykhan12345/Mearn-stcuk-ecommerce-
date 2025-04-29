import React from "react";
import { Link, Links } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          {/* <img src="/logo.png" alt="Logo" className="w-10 h-10" /> */}
          <h1 className="text-2xl font-bold text-gray-800">Ecommerce App</h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-5 flex-wrap justify-center md:justify-end">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search products..."
            className="w-52 sm:w-64 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 outline-none text-sm"
          />

          {/* Nav Items */}
          <Link
            to="/"
            className="text-gray-700 font-medium hover:text-blue-500 cursor-pointer"
          >
            Home
          </Link>

          <Link
            to="/category"
            className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-blue-500 font-medium"
          >
            Category
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-blue-500 font-medium"
          >
            Register
          </Link>
          <Link
            to="/category"
            className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-blue-500 font-medium"
          >
            Login
          </Link>
          <Link
            to="/about"
            className="text-gray-700 font-medium hover:text-blue-500 cursor-pointer"
          >
            About
          </Link>

          {/* Cart with badge */}
          <div className="relative flex items-center">
            <Link
              to="/cart"
              className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-blue-500 font-medium"
            >
              Cart
            </Link>
            <FaShoppingCart
              className="text-gray-700 hover:text-blue-500 cursor-pointer"
              size={20}
            />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              3
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
