"use client";

import { useState, useEffect } from "react";
import Header from "../header/page";
import Footer from "../footer/page";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  seller: string;
  stock: number;
  price: number;
  discountPrice?: number;
  imageURLs: string[];
  category: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: Infinity,
    inStock: true,
    seller: "",
    category: "",
  });

  const defaultImageURL = "/comingsoon.jpg";

  useEffect(() => {
    const storedProductsJSON =
      localStorage.getItem("products");
    const storedProducts = storedProductsJSON
      ? JSON.parse(storedProductsJSON)
      : [];

    const formattedProducts = storedProducts.map(
      (item: any) => ({
        ...item,
        price: parseFloat(item.price),
        discountPrice: item.discountPrice
          ? parseFloat(item.discountPrice)
          : undefined,
      })
    );

    setProducts(formattedProducts);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleFilterChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [target.name]:
        target.type === "checkbox"
          ? (target as HTMLInputElement).checked
          : target.value,
    }));
  };

  const applyFilters = () => {
    const storedProducts: Product[] = JSON.parse(
      localStorage.getItem("products") || "[]"
    );
    const filteredProducts = storedProducts.filter(
      (product: Product) => {
        const inPriceRange =
          product.price >= filters.minPrice &&
          product.price <= filters.maxPrice;
        const inInStock = filters.inStock
          ? product.stock > 0
          : true;
        const matchesSeller = filters.seller
          ? product.seller
              .toLowerCase()
              .includes(filters.seller.toLowerCase())
          : true;
        const matchesCategory = filters.category
          ? product.category.toLowerCase() ===
            filters.category.toLowerCase()
          : true;

        return (
          inPriceRange &&
          inInStock &&
          matchesSeller &&
          matchesCategory
        );
      }
    );
    setProducts(filteredProducts);
  };

  const getImageURL = (urls: string[], index: number) => {
    return urls[index] || defaultImageURL;
  };

  const formatPrice = (price: number | undefined) => {
    if (typeof price === "number") {
      return price.toFixed(2);
    }
    return "N/A";
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        <div className="flex flex-col md:flex-row mb-6">
          <div className="md:w-1/4">
            <div className="p-4 bg-darkBlue border border-emerald rounded-lg shadow-lg">
              <h2 className="text-xl text-white font-semibold mb-4">
                Filter
              </h2>
              <div className="mb-4">
                <label className="block text-white">
                  Min Price:
                </label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="text-black w-full p-2 border border-emerald rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">
                  Max Price:
                </label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="text-black w-full p-2 border border-emerald rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">
                  Seller:
                </label>
                <input
                  type="text"
                  name="seller"
                  value={filters.seller}
                  onChange={handleFilterChange}
                  className="text-black w-full p-2 border border-emerald rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">
                  Category:
                </label>
                <input
                  type="text"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="text-black w-full p-2 border border-emerald rounded-md"
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={filters.inStock}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                <label className="text-white">
                  In Stock
                </label>
              </div>
              <button
                onClick={applyFilters}
                className="bg-emerald text-white p-2 rounded-md hover:bg-darkBlue transition-colors duration-500"
              >
                Apply Filter
              </button>
              <div className="mt-6 text-center text-white">
                <span className="text-md font-semibold">
                  Showing {products.length} product
                  {products.length !== 1 && "s"}
                </span>
              </div>
            </div>
          </div>
          <div className="md:w-3/4 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  href={`/productdetail/${product.id}`}
                  key={product.id}
                >
                  <div className="bg-darkBlue border border-emerald rounded-lg shadow-md p-4 cursor-pointer flex flex-col relative">
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <img
                        src={getImageURL(
                          product.imageURLs,
                          0
                        )}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover grayscale-[0.5] blur-sm scale-105"
                      />
                      <img
                        src={getImageURL(
                          product.imageURLs,
                          0
                        )}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-emerald text-lg font-semibold mb-2 text-center mt-4">
                      {product.name}
                    </h3>
                    <p className="text-white text-center">
                      Seller: {product.seller}
                    </p>
                    <p className="text-white text-center">
                      Stock: {product.stock}
                    </p>
                    <p className="text-white text-center">
                      Price: ${formatPrice(product.price)}
                    </p>
                    {product.discountPrice != null && (
                      <p className="text-white text-center">
                        Discount Price: $
                        {formatPrice(product.discountPrice)}
                      </p>
                    )}
                    <p className="text-white text-center">
                      Category: {product.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
