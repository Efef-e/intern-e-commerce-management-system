"use client";

import { useState } from "react";
import Header from "../header/page";
import Footer from "../footer/page";
import ProductDialog from "../ProductDialog/page";
import { v4 as uuidv4 } from "uuid";
import { InputMask } from "@react-input/mask";

interface Product {
  id: string;
  name: string;
  seller: string;
  stock: number | undefined;
  price: number | undefined;
  discountPrice: number | undefined;
  category: string;
  imageURLs: string[];
}

export default function AddProduct() {
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    seller: "",
    stock: undefined,
    price: undefined,
    discountPrice: undefined,
    category: "",
    imageURLs: [""],
  });

  const [errors, setErrors] = useState({
    name: "",
    seller: "",
    stock: "",
    price: "",
    discountPrice: "",
    category: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState<
    boolean | null
  >(null);
  const [dialogMessage, setDialogMessage] =
    useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (index !== undefined) {
      const newImageURLs = [...product.imageURLs];
      newImageURLs[index] = value;
      setProduct({ ...product, imageURLs: newImageURLs });
    } else {
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
    }
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

        setIsSuccess(true);
        setDialogMessage("");
        setIsDialogOpen(true);

        setProduct({
          id: "",
          name: "",
          seller: "",
          stock: undefined,
          price: undefined,
          discountPrice: undefined,
          category: "",
          imageURLs: [""],
        });
      } catch (error) {
        console.error(
          "Error accessing localStorage:",
          error
        );

        setIsSuccess(false);
        setDialogMessage(
          "There was an error adding the product. Please try again."
        );
        setIsDialogOpen(true);
      }
    } else {
      setIsSuccess(false);
      setDialogMessage(
        "Form is not valid! Please check the fields and try again."
      );
      setIsDialogOpen(true);
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

  const addImageUrlField = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      imageURLs: [...prevProduct.imageURLs, ""],
    }));
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
                name="price"
                value={
                  product.price !== undefined
                    ? product.price
                    : ""
                }
                onChange={handleChange}
                placeholder="Price"
                className="w-full px-4 py-2 border rounded text-black"
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
                name="discountPrice"
                value={
                  product.discountPrice !== undefined
                    ? product.discountPrice
                    : ""
                }
                onChange={handleChange}
                placeholder="Discount Price"
                className="w-full px-4 py-2 border rounded text-black"
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

            {product.imageURLs.map((url, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => handleChange(e, index)}
                  placeholder={`Image URL ${index + 1}`}
                  className="w-full px-4 py-2 border rounded text-black"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addImageUrlField}
              className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-500 transition-colors duration-300"
            >
              Add Another Image URL
            </button>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-500 transition-colors duration-300"
            >
              Add Product
            </button>
          </form>
        </div>
      </main>

      <Footer />

      <ProductDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        success={isSuccess === true}
        errorMessage={dialogMessage}
      />
    </div>
  );
}
