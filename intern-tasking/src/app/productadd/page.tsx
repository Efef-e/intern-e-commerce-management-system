"use client";

import { useState } from "react";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    seller: "",
    stock: "",
    price: "",
    discountPrice: "",
    category: "",
    images: [] as File[],
    productId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
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
        const storedProducts = JSON.parse(
          localStorage.getItem("products") ?? "[]"
        );
        storedProducts.push(product);
        localStorage.setItem(
          "products",
          JSON.stringify(storedProducts)
        );
        alert("Product added successcully!");
      } catch (error) {
        console.error(
          "Error accessing localStorage:",
          error
        );
        alert(
          "There was an error saving the product.Please try again."
        );
      }
    } else {
      alert("Form is not valid!");
    }
  };

  const isValidForm = () => {
    return true;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-black text-2x1 font-bold mb-6 text-center">
          Add Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            value={product.discountPrice}
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
            name="productId"
            value={product.productId}
            onChange={handleChange}
            placeholder="Product ID"
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
    </div>
  );
}
