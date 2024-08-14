"use client";

import { useState, useEffect } from "react";
import Header from "../../header/page";
import Footer from "../../footer/page";

interface Product {
  id: string;
  name: string;
  seller: string;
  stock: number;
  price: number;
  discountPrice?: number;
  imageURL: string;
}

const ProductDetail = ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedProductsJSON =
      localStorage.getItem("products");
    if (storedProductsJSON) {
      const storedProducts: Product[] = JSON.parse(
        storedProductsJSON
      );
      const foundProduct = storedProducts.find(
        (p) => p.id === id
      );
      setProduct(foundProduct || null);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const price = product.price; // Price'ı bir değişkene atıyoruz
  const formattedPrice =
    typeof price === "number" ? price.toFixed(2) : "N/A";
  const formattedDiscountPrice = product.discountPrice
    ? typeof product.discountPrice === "number"
      ? product.discountPrice.toFixed(2)
      : "N/A"
    : undefined;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto p-6 flex-grow">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">
            {product.name}
          </h1>
          <img
            src={product.imageURL}
            alt={product.name}
            className="mb-4 w-full"
          />
          <p className="text-gray-700 mb-2">
            Seller: {product.seller}
          </p>
          <p className="text-gray-700 mb-2">
            Stock: {product.stock}
          </p>
          <p className="text-gray-700 mb-2">
            Price: ${formattedPrice}
          </p>
          {formattedDiscountPrice && (
            <p className="text-gray-700 mb-2">
              Discount Price: ${formattedDiscountPrice}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
