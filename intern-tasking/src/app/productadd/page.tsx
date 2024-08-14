"use client";

import { useState } from "react";
import Header from "../header/page";
import Footer from "../footer/page";
import { v4 as uuidv4 } from "uuid";

interface Product {
  id: string;
  name: string;
  seller: string;
  stock: number;
  price: number;
  discountPrice?: number;
  category: string;
  images: File[];
  imageURL: string;
}

export default function AddProduct() {
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    seller: "",
    stock: 0,
    price: 0,
    discountPrice: 0,
    category: "",
    images: [],
    imageURL: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    const fileArray = files ? Array.from(files) : [];
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: fileArray,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (isValidForm()) {
      try {
        const newProduct = {
          ...product,
          id: uuidv4(),
        };
        const storedProducts = JSON.parse(
          localStorage.getItem("products") ?? "[]"
        );
        storedProducts.push(newProduct);
        localStorage.setItem(
          "products",
          JSON.stringify(storedProducts)
        );
        alert("Product added successfully!");
        setProduct({
          id: "",
          name: "",
          seller: "",
          stock: 0,
          price: 0,
          discountPrice: 0,
          category: "",
          images: [],
          imageURL: "",
        });
      } catch (error) {
        console.error(
          "Error accessing localStorage:",
          error
        );
        alert(
          "There was an error saving the product. Please try again."
        );
      }
    } else {
      alert("Form is not valid!");
    }
  };

  const isValidForm = () => {
    return (
      product.name &&
      product.seller &&
      product.stock > 0 &&
      product.price > 0
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-black text-2xl font-bold mb-6 text-center">
            Add Product
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full px-4 py-2 border rounded text-black"
            />

            <input
              type="text"
              name="seller"
              value={product.seller}
              onChange={handleChange}
              placeholder="Seller"
              className="w-full px-4 py-2 border rounded text-black"
            />

            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="w-full px-4 py-2 border rounded text-black"
            />

            <input
              type="number"
              step="0.01"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full px-4 py-2 border rounded text-black"
            />

            <input
              type="number"
              step="0.01"
              name="discountPrice"
              value={product.discountPrice || ""}
              onChange={handleChange}
              placeholder="Discount Price"
              className="w-full px-4 py-2 border rounded text-black"
            />

            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full px-4 py-2 border rounded text-black"
            />

            <input
              type="file"
              name="images"
              onChange={handleImageChange}
              multiple
              className="w-full px-4 py-2 border rounded text-black"
            />

            <input
              type="text"
              name="imageURL"
              value={product.imageURL}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full px-4 py-2 border rounded text-black"
            />

            <button
              type="submit"
              className="w-full px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-500 transition-colors duration-300"
            >
              Add Product
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
