"use client";

import Header from "./header/page";
import Footer from "./footer/page";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="bg-gray-200 flex-grow flex flex-col items-center justify-center text-center p-6">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold mb-6 text-darkBlue">
            Make Your Easier With E-Commerce Management
            System
          </h2>
          <p className="text-lg mb-8 text-darkBlue">
            Easily add, manage and list your products. A
            modern and user-friendly platform that will meet
            all your e-commerce needs.
          </p>
          <div className="justify-center space-y-4 sm:space-y-0 sm:space-x-5 flex flex-col sm:flex-row">
            <Link
              href={"/productadd"}
              className="px-6 py-3 bg-emerald text-white rounded-lg hover:bg-darkBlue transition-colors duration-500"
            >
              Add Product
            </Link>
            <Link
              href={"/productlist"}
              className="px-6 py-3 bg-emerald text-white rounded-lg hover:bg-darkBlue transition-colors duration-500"
            >
              Product List
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
