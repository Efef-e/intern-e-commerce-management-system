"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Product {
  name: string;
  seller: string;
  stock: number;
  price: number;
  discountPrice?: number;
  images: string[];
}

const ProductDetail = () => {
  const [product, setProduct] = useState<Product | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] =
    useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok)
          throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1
        ? 0
        : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0
        ? product.images.length - 1
        : prevIndex - 1
    );
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        {product.images && product.images.length > 0 ? (
          product.images.map((imageURL, index) => (
            <img
              key={index}
              src={imageURL}
              alt={product.name}
              className="cursor-pointer w-full h-64 object-cover mb-4"
              onClick={() => handleImageClick(index)}
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>

      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-3xl font-bold mb-4">
          {product.name}
        </h1>
        <p className="text-gray-700 mb-2">
          Seller: {product.seller}
        </p>
        {product.discountPrice ? (
          <p className="text-red-500 text-2xl font-semibold mb-2">
            ${product.discountPrice}{" "}
            <span className="line-through text-gray-500">
              ${product.price}
            </span>
          </p>
        ) : (
          <p className="text-2xl font-semibold mb-2">
            ${product.price}
          </p>
        )}
        <p className="text-gray-700 mb-4">
          Stock: {product.stock}
        </p>
        <button
          className={`px-6 py-2 text-white rounded-lg transition-colors duration-300 ${
            product.stock === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
          disabled={product.stock === 0}
        >
          Buy Now
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full max-w-3xl"
            />
            <button
              onClick={handlePreviousImage}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-black p-2 rounded-full"
            >
              &#8249;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white text-black p-2 rounded-full"
            >
              &#8250;
            </button>
            <button
              onClick={handleModalClose}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
            >
              &#10005;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
