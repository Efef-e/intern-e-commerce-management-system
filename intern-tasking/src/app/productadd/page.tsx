"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../header/page";
import Footer from "../footer/page";
import ProductDialog from "../ProductDialog/page";
import { v4 as uuidv4 } from "uuid";
import IMask from "imask";

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

  const nameInputRef = useRef<HTMLInputElement>(null);
  const sellerInputRef = useRef<HTMLInputElement>(null);
  const stockInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const discountPriceInputRef =
    useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameInputRef.current) {
      IMask(nameInputRef.current, {
        mask: /^[A-Za-z\s]+$/,
        placeholder: "Product Name",
      });
    }

    if (sellerInputRef.current) {
      IMask(sellerInputRef.current, {
        mask: /^[A-Za-z0-9\s.-]*$/,
        placeholder: "Seller",
      });
    }

    if (stockInputRef.current) {
      IMask(stockInputRef.current, {
        mask: /^[0-9]*$/,
        min: 0,
        placeholder: "Stock",
      });
    }

    if (priceInputRef.current) {
      IMask(priceInputRef.current, {
        mask: /^[0-9]*$/,
        placeholder: "Price",
      });
    }

    if (discountPriceInputRef.current) {
      IMask(discountPriceInputRef.current, {
        mask: /^[0-9]*$/,
        placeholder: "Discount Price",
      });
    }

    if (categoryInputRef.current) {
      IMask(categoryInputRef.current, {
        mask: /^[A-Za-z\s]+$/,
        placeholder: "Category",
      });
    }
  }, []);

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
          if (!/^[A-Za-z\s]+$/.test(value)) {
            errorMessage =
              "Product name must start with a letter.";
          }
          break;
        case "seller":
          if (!/^[A-Za-z0-9\s.-]*$/.test(value)) {
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

      if (
        name === "discountPrice" &&
        product.price !== undefined &&
        parseFloat(value) >= product.price
      ) {
        errorMessage =
          "Discount price must be less than the original price.";
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));

      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]:
          name === "stock" ||
          name === "price" ||
          name === "discountPrice"
            ? value
              ? parseFloat(value.replace(/,/g, ""))
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
        setDialogMessage("Product added successfully!");
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
      /^[A-Za-z\s]+$/.test(product.name) &&
      /^[A-Za-z0-9\s.-]*$/.test(product.seller) &&
      (product.stock === undefined ||
        /^\d+$/.test(String(product.stock))) &&
      (product.price === undefined ||
        /^\d+(\.\d{1,2})?$/.test(String(product.price))) &&
      (product.discountPrice === undefined ||
        (product.price !== undefined &&
          product.discountPrice < product.price &&
          /^\d+(\.\d{1,2})?$/.test(
            String(product.discountPrice)
          ))) &&
      /^[A-Za-z\s]+$/.test(product.category)
    );
  };

  const addImageUrlField = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      imageURLs: [...prevProduct.imageURLs, ""],
    }));
  };

  const resetForm = () => {
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
    setErrors({
      name: "",
      seller: "",
      stock: "",
      price: "",
      discountPrice: "",
      category: "",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200 text-white">
      <Header />

      <main className="flex-grow flex items-center justify-center">
        <div className="bg-darkBlue border border-emerald p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-emerald-500 text-2xl font-bold mb-6 text-center">
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
                ref={nameInputRef}
                value={product.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full px-4 py-2 border border-emerald rounded text-gray-900 bg-white"
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
                ref={sellerInputRef}
                value={product.seller}
                onChange={handleChange}
                placeholder="Seller"
                className="w-full px-4 py-2 border border-emerald rounded text-gray-900 bg-white"
              />
              {errors.seller && (
                <p className="text-red-500 text-sm">
                  {errors.seller}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                id="stock"
                name="stock"
                ref={stockInputRef}
                value={
                  product.stock !== undefined
                    ? product.stock
                    : ""
                }
                onChange={handleChange}
                placeholder="Stock"
                className="w-full px-4 py-2 border border-emerald rounded text-gray-900 bg-white"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm">
                  {errors.stock}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                id="price"
                name="price"
                ref={priceInputRef}
                value={
                  product.price !== undefined
                    ? product.price
                    : ""
                }
                onChange={handleChange}
                placeholder="Price"
                className="w-full px-4 py-2 border border-emerald rounded text-gray-900 bg-white"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">
                  {errors.price}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                id="discountPrice"
                name="discountPrice"
                ref={discountPriceInputRef}
                value={
                  product.discountPrice !== undefined
                    ? product.discountPrice
                    : ""
                }
                onChange={handleChange}
                placeholder="Discount Price"
                className="w-full px-4 py-2 border border-emerald rounded text-gray-900 bg-white"
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
                ref={categoryInputRef}
                value={product.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full px-4 py-2 border border-emerald rounded text-gray-900 bg-white"
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
                  className="w-full px-4 py-2 border border-emerald rounded text-gray-900 bg-white"
                />
              </div>
            ))}

            <div className="flex justify-between items-center space-x-2">
              <button
                type="button"
                onClick={addImageUrlField}
                className="bg-emerald w-full text-white py-2 rounded hover:bg-darkBlue transition-colors duration-500"
              >
                Add Image URL
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-emerald text-white px-4 py-2 rounded hover:bg-darkBlue transition-colors duration-500"
              >
                Cancel
              </button>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-emerald w-full text-white px-4 py-2 rounded hover:bg-darkBlue transition-colors duration-500"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />

      {isDialogOpen && (
        <ProductDialog
          message={dialogMessage}
          success={isSuccess === true}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
}
