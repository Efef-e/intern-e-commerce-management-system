"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../../header/page";
import Footer from "../../footer/page";
import Modal from "../../modal/page";

interface Product {
  id: string;
  name: string;
  seller: string;
  stock: number;
  price: number;
  discountPrice?: number;
  imageURLs: string[];
}

const defaultImageURL = "/comingsoon.jpg";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] =
    useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] =
    useState<number>(0);

  useEffect(() => {
    if (id) {
      const storedProductsJSON =
        localStorage.getItem("products");
      if (storedProductsJSON) {
        const storedProducts: Product[] = JSON.parse(
          storedProductsJSON
        );
        const foundProduct = storedProducts.find(
          (p) => p.id === id
        );
        if (foundProduct) {
          foundProduct.price = Number(foundProduct.price);
          if (foundProduct.discountPrice) {
            foundProduct.discountPrice = Number(
              foundProduct.discountPrice
            );
          }
          setProduct(foundProduct);
        } else {
          setProduct(null);
        }
      } else {
        setProduct(null);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePrevImage = () => {
    if (product) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + product.imageURLs.length) %
          product.imageURLs.length
      );
    }
  };

  const handleNextImage = () => {
    if (product) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex + 1) % product.imageURLs.length
      );
    }
  };

  const formatPrice = (price: number | undefined) => {
    if (typeof price === "number") {
      return price.toFixed(2);
    }
    return "N/A";
  };

  const calculateDiscountPercentage = () => {
    if (product?.price && product?.discountPrice) {
      const discount =
        ((product.price - product.discountPrice) /
          product.price) *
        100;
      return Math.round(discount);
    }
    return null;
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const discountPercentage = calculateDiscountPercentage();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto p-6 flex-grow">
        <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-xl mx-auto">
          <h1 className="text-black text-2xl font-bold mb-4">
            {product.name}
          </h1>
          <div className="w-full h-auto overflow-hidden rounded-lg mb-4 cursor-pointer">
            <img
              src={product.imageURLs[0] || defaultImageURL}
              alt={product.name}
              className="w-full h-auto object-contain"
              onClick={openModal}
            />
          </div>
          <p className="text-gray-700 mb-2">
            Seller: {product.seller}
          </p>
          <p className="text-gray-700 mb-2">
            Stock: {product.stock}
          </p>
          <p
            className={`text-gray-700 mb-2 ${
              product.discountPrice ? "line-through" : ""
            }`}
          >
            Price: ${formatPrice(product.price)}
          </p>
          {product.discountPrice && (
            <p className="text-red-500 mb-2">
              Discount Price: $
              {formatPrice(product.discountPrice)}
              {discountPercentage !== null && (
                <span className="ml-2 text-sm text-green-600">
                  ({discountPercentage}% off)
                </span>
              )}
            </p>
          )}
          <div className="flex justify-center items-center">
            <button
              className={`px-4 py-2 mt-4 rounded-md hover:bg-gray-500 transition-colors duration-300 ${
                product.stock > 0
                  ? "bg-black text-white"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
              disabled={product.stock <= 0}
            >
              {product.stock > 0
                ? "Buy Now"
                : "Out of Stock"}
            </button>
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            onPrev={handlePrevImage}
            onNext={handleNextImage}
          >
            {product.imageURLs.length > 0 && (
              <img
                src={
                  product.imageURLs[currentImageIndex] ||
                  defaultImageURL
                }
                alt={product.name}
                className="w-full h-auto object-contain"
              />
            )}
          </Modal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
