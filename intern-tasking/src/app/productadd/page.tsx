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
}
