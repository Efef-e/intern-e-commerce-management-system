"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>(
    []
  );
  const [products, setProducts] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] =
    useState<boolean>(false);
  const [activeIndex, setActiveIndex] =
    useState<number>(-1);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const storedProducts = JSON.parse(
      localStorage.getItem("products") ?? "[]"
    );
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = products.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setIsDropdownOpen(true);
    } else {
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  }, [searchTerm, products]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "ArrowDown") {
      setActiveIndex(
        (prevIndex) =>
          (prevIndex + 1) % searchResults.length
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex(
        (prevIndex) =>
          (prevIndex - 1 + searchResults.length) %
          searchResults.length
      );
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      window.location.href = `productdetail/${searchResults[activeIndex].productId}`;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <h1 className="text-3xl font-bold text-center md:text-left mb-4 md:mb-0">
          <Link href={"/"}>E-Commerce</Link>
        </h1>
        <div className="relative text-black w-full md:w-1/3 flex justify-center md:justify-between">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className="bg-gray-100 w-full px-4 py-2 border rounded text-black"
          />
          {isDropdownOpen && searchResults.length > 0 && (
            <ul
              ref={dropdownRef}
              className="absolute left-0 top-full bg-white border rounded mt-1 w-full max-w-lg z-50"
            >
              {searchResults.map((product, index) => (
                <li
                  key={product.productId}
                  className={`px-4 py-2 cursor-pointer ${
                    index === activeIndex
                      ? "bg-gray-200"
                      : ""
                  }`}
                >
                  <Link
                    href={`/productdetail/${product.productId}`}
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
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
