"use client";

import { useState } from "react";
import Header from "../header/page";
import Footer from "../footer/page";
import { v4 as uuidv4 } from "uuid";

interface Product {
  id: string;
  name: string;
  seller: string;
  stock: number | undefined;
  price: number | undefined;
  discountPrice?: number;
  category: string;
  imageURL: string;
}

export default function AddProduct() {
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    seller: "",
    stock: undefined,
    price: undefined,
    discountPrice: 0,
    category: "",
    imageURL: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    seller: "",
    stock: "",
    price: "",
    discountPrice: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    let errorMessage = "";

    switch (name) {
      case "name":
        if (!/^[A-Za-z]/.test(value)) {
          errorMessage =
            "Product name must start with a letter.";
        }
        break;
      case "seller":
        if (!/^[A-Za-z0-9][A-Za-z0-9.-]*$/.test(value)) {
          errorMessage =
            "Seller name must start with a letter or number and contain only letters, numbers, dots, and hyphens.";
        }
        break;
      case "stock":
        if (value !== "" && !/^\d+$/.test(value)) {
          errorMessage = "Stock must be a number.";
        }
        break;
      case "price":
      case "discountPrice":
        if (
          value !== "" &&
          !/^\d+(\.\d{1,2})?$/.test(value)
        ) {
          errorMessage =
            "Price must be a decimal number with up to two decimal places.";
        }
        break;
      case "category":
        if (!/^[A-Za-z\s]+$/.test(value)) {
          errorMessage =
            "Category must contain only letters and spaces.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]:
        name === "stock" || name === "price"
          ? value
            ? parseFloat(value)
            : undefined
          : value,
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
          stock: undefined,
          price: undefined,
          discountPrice: 0,
          category: "",
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
      (product.stock === undefined || product.stock >= 0) &&
      (product.price === undefined || product.price > 0)
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
            <div>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full px-4 py-2 border rounded text-black"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="seller"
                value={product.seller}
                onChange={handleChange}
                placeholder="Seller"
                className="w-full px-4 py-2 border rounded text-black"
              />
              {errors.seller && (
                <p className="text-red-500 text-sm">
                  {errors.seller}
                </p>
              )}
            </div>

            <div>
              <input
                type="number"
                name="stock"
                value={
                  product.stock !== undefined
                    ? product.stock
                    : ""
                }
                onChange={handleChange}
                placeholder="Stock"
                className="w-full px-4 py-2 border rounded text-black"
                min="0"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm">
                  {errors.stock}
                </p>
              )}
            </div>

            <div>
              <input
                type="number"
                step="0.01"
                name="price"
                value={
                  product.price !== undefined
                    ? product.price
                    : ""
                }
                onChange={handleChange}
                placeholder="Price"
                className="w-full px-4 py-2 border rounded text-black"
                min="0"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">
                  {errors.price}
                </p>
              )}
            </div>

            <div>
              <input
                type="number"
                step="0.01"
                name="discountPrice"
                value={product.discountPrice || ""}
                onChange={handleChange}
                placeholder="Discount Price"
                className="w-full px-4 py-2 border rounded text-black"
                min="0"
              />
              {errors.discountPrice && (
                <p className="text-red-500 text-sm">
                  {errors.discountPrice}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full px-4 py-2 border rounded text-black"
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category}
                </p>
              )}
            </div>

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
