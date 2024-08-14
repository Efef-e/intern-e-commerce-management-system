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
  imageURL: string;
}

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
        (prevIndex) => (prevIndex - 1 + 1) % 1
      );
    }
  };

  const handleNextImage = () => {
    if (product) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % 1
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto p-6 flex-grow">
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <h1 className="text-black text-2xl font-bold mb-4">
            {product.name}
          </h1>

          <img
            src={
              product.imageURL ||
              "/path/to/default-image.jpg"
            }
            alt={product.name}
            className="mb-4 cursor-pointer"
            onClick={openModal}
          />

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
            Price: ${product.price.toFixed(2)}
          </p>
          {product.discountPrice && (
            <p className="text-red-500 mb-2">
              Discount Price: $
              {product.discountPrice.toFixed(2)}
            </p>
          )}
          <button
            className={`px-4 py-2 mt-4 rounded-md hover:bg-gray-500 transition-colors duration-300 ${
              product.stock > 0
                ? "bg-black text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? "Buy Now" : "Out of Stock"}
          </button>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <img
              src={
                product.imageURL ||
                "/path/to/default-image.jpg"
              }
              alt={product.name}
              className="w-full h-auto"
            />
            <button
              onClick={handlePrevImage}
              className="text-black absolute left-2 top-1/2 transform -translate-y-1/2"
            >
              {"<"}
            </button>
            <button
              onClick={handleNextImage}
              className="text-black absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {">"}
            </button>
          </Modal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
