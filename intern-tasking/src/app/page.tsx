"use client";

import Header from "./header/page";
import Footer from "./footer/page";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";

export default function Home() {
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="bg-gray-100 flex-grow flex flex-col items-center justify-center text-center p-6">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold mb-6 text-black">
            Make Your Easier With E-Commerce Management
            System
          </h2>
          <p className="text-lg mb-8 text-gray-700">
            Easily add, manage and list your products. A
            modern and user-friendly platform that will meet
            all your e-commerce needs.
          </p>
          <div className="justify-center space-y-4 sm:space-y-0 sm:space-x-5 flex flex-col sm:flex-row">
            <Link
              href={"/productadd"}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-500"
            >
              Product Add
            </Link>
            <Link
              href={"/productlist"}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-500"
            >
              Product List
            </Link>
            <Link
              href={"/productadd"}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-500"
            >
              Product Detail
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
