"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <h1 className="text-3x1 font-bold text-center md:text-left mb-4 md:mb-0">
          E-Commerce
        </h1>

        <div className="relative text-black w-full md:w-1/3 flex justify-center md:justify-between">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-gray-100 w-full px-4 py-2 border rounded text-black"
          ></input>
        </div>
        <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 m:space-x-4">
          <Link
            href="/productadd"
            className="px-6 py-3 text-white rounded-lg hover:bg-gray-800 transition-colors duration-500"
          >
            Product Add
          </Link>
          <Link
            href="/productlist"
            className="px-6 py-3 text-white rounded-lg hover:bg-gray-800 transition-colors duration-500"
          >
            Product List
          </Link>
          <Link
            href="/productdetail"
            className="px-6 py-3 text-white rounded-lg hover:bg-gray-800 transition-colors duration-500"
          >
            Product Detail
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
